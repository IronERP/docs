# Model CRUD API

IronERP automatically generates CRUD API controllers for all loaded 
implementations of `IModel`. This is an overview of those generated API
endpoints.

When calling these endpoints:

 - substitute `<ModelName>` with the model name. E.g. `Demo`;
 - substitute `<EntityId>` with the entity database ID. E.g. `6718d911eb1d5383fc8f1bce`.

## Configuration

### Get a list of Models

`GET /api/v1/Configuration/Models`

This endpoint returns a list of all available models.

### Get a Model Schema

`GET /api/v1/<ModelName>/_schema`

Returns a model's schema.

**Returns:**

 - 200 OK -> ([JsonSchema](https://github.com/IronERP/IronERP/blob/main/support/json_schema/model_schema.json))
   ```json
   {
     "Name": "name",
     "Namespace": "namespace",
     "Fields": [
       {
         "Name": "field",
         "Label": "Label",
         "Type": "int",
         "Required": false,
         "Secret": false,
         "Redacted": false,
         "Searchable": true
       }
     ]
   }
   ```
 - 404 Not Found -> No such model found.

## Data

### Get a list of Entities for a Model

`GET /api/v1/<ModelName>`

This endpoint returns a list of all entities under the specified model.

*TODO: Pagination*

### Search Entities

This endpoint will perform a full-text search across all fields marked as 
Searchable [^2]

:::info

This endpoint performs search over marked fields of a specific model. To
perform a simplified search over **all** database entities, use the
[Meilisearch Endpoints](/docs/engine/API/meilisearch) instead!

:::

`GET /api/v1/<ModelName>/_search?query=<search query>`

**Params:**

 - `query` -> Your full-text search query

**Returns:**

 - 200 OK -> A list of found entities in JSON format.
 - 404 Not Found -> The search yielded no results.


### Get a specific Entity

`GET /api/v1/<ModelName>/<EntityId>`

This endpoint returns a specific entity from the database, identified by its ID.

**Returns:**

 - 200 OK -> The entity in JSON format
 - 404 Not Found -> The entity was not found (no content)

### Insert an Entity

`POST /api/v1/<ModelName>`

This endpoint creates a new entity.

**Body:**

The entity in JSON format.

**Returns:**

 - 201 Created -> The entity was created. Response body is the ID
 - 400 Bad Request -> Validation failed. Response body is validation details.

### Update an Entity

`PUT /api/v1/<ModelName>`

This endpoint updated an existing entity, identified by its ID.

**Body:**

The entity in JSON format. Must include a valid ID field.

**Returns:**

 - 200 OK -> Entity updated. Details in body.
 - 400 Bad Request -> Validation failed. Details in body.
 - 404 Not Found -> Tried to update a non-existent entity. No Content.[^1]

### Delete an Entity

`DELETE /api/v1/<ModelName>/<EntityId>`

This endpoint deletes an entity.

**Returns:**

 - 200 OK -> The entity has been deleted
 - 404 Not Found -> An entity with that ID does not exist and therefore cannot
   be deleted.

[^1]: It is up to the client implementation what to do with this information,
      you could either inform the user that the update failed or transparently
      perform an insert instead.
[^2]: Fields can be marked as searchable using the `[Search]` attribute.