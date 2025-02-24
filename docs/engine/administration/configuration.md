---
sidebar_position: 2
sidebar_label: Configuration
id: configuration
---

# Configuration

There are two basic ways to configure IronERP. There is the file or environment based application
settings, and the database stored "runtime" settings.

The application settings are used to configure things like Database connection, logging, etc.

The runtime settings mainly configure the frontent behavior.

## Application Configuration

There are multiple ways to set the application configuration. The backend will load files

 - `appsettings.json`
 - `appsettings.<Environment>.json` where `Environment` is `Development`, `Production`, etc.
 - `appsettings.Local.json` (useful for development, this file is included in `.gitignore` by default)

The files will be loaded in this order and values set multiple times will be overridden in this order.
E.g. if a config key is set in `appsettings.json` and `appsettings.Local.json`, the value from `appsettings.Local.json`
will be used.

Any value can also be overridden from Environment Variables. The variable should be the "path of sections"
leading to the desired config key, separated by double underscore (`__`). For example, to override
`Logging:LogLevel:Default` from this `application.json`:

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information"
        }
    }
}
```

You would set a variable `Logging__LogLevel__Default="Debug"`.

### Configuration Reference

| Section            | Key                      | Description                                                                    | Default Value               |
|--------------------|--------------------------|--------------------------------------------------------------------------------|-----------------------------|
| `Logging:LogLevel` | `Default`                | Applies to any namespaces that are not configured explicitly                   | `Information`               |
|                    | `Microsoft.AspNetCore`   | ASPNetCore Framework Logs                                                      | `Warning`                   |
|                    | `IronERP`                | Logs from all IronERP core                                                     | `Information`               |
|                    | `<namespace> `           | Overrides the log level for the given `namecpace`                              |                             |
| *`<root>`*         | `AllowedHosts`           | Sets which hosts the backend will accept connections under                     | `*`                         |
| `MongoDB`          | `Host`                   | The MongoDB connection string                                                  | `mongodb://localhost:27017` |
|                    | `Database`               | The name of your MongoDB database                                              | `IronERP`                   |
| `Search.Backend`   | `MeilisearchHost`        | URL of your Meilisearch instance                                               | `http://localhost:7700`     |
|                    | `SearchKey`              | Meilisearch "Search" API key                                                   | `""`                        |
|                    | `WriteKey`               | Meilisearch API key with `Write` permissions for indexing                      | `""`                        |
| `Search.Indexing`  | `Strategy`               | Indexing strategy (options: `full`, `none`)                                    | `full`                      |
| `Jwt`              | `Secret`                 | A 32-character secret key for JWT signing                                      | `""`                        |
|                    | `Issuer`                 | JWT Issuer                                                                     | `IronERP`                   |
|                    | `Audience`               | JWT Audience                                                                   | `IronERP_Users`             |
|                    | `TokenExpirationMinutes` | How long until the token expires (in minutes)                                  | `60`                        |
| `EntraID`          | `Enabled`                | Enable Entra ID (formerly Azure ID) authentication                             | `false`                     |
|                    | `ClientId`               | Entra Client ID                                                                | `""`                        |
|                    | `TenantId`               | Entra Tenant ID                                                                | `""`                        |
|                    | `Issuer`                 | Entra Issuer (`https://login.microsoftonline.com/{your-entra-tenant-id}/v2.0`) | `""`                        |