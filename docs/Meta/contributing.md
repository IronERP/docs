# Contributing to IronERP

## Contributing Code

:::info

For information about contributing to IronERP Code, please see
[Contributing Code](/Engine/contributing.md)

:::

## Contributing Documentation

We have adopted the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct)
for the IronERP project. Please follow this code of conduct when interacting with the
IronERP community in any way.

### MkDocs

The IronERP documentation website is generated using the MkDocs tool. Here is a super-quick
getting started guide. For more technical information, please see the [MkDocs](https://www.mkdocs.org)
and [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) documentation sites.

#### Super-Quick-Start

**Requirements:**

 - Python 3+
 - Text Editor
 - Web Browser

**Setup:**

```shell
# Clone the IronERP repository
$> git clone https://github.com/UTF-8x/IronERP.git

# Change into the IronERP docs directory and create a virtual env
$> cd IronERP/docs && python -m venv venv

# Activate the virtual env on Linux/macOS
$> source ./venv/bin/activate

# Activate the virtualenv on Windows (PowerShell)
$> & ".\venv\Scripts\Activate.ps1"

# Install Python Dependencies
$> pip3 install -r requirements.txt

# Run the preview serevr
$> mkdocs serve
```

You can now edit the markdown files in `docs/` and preview your changes at
[http://localhost:8000](http://localhost:8000).

### Content Guidelines

#### Placeholders

Sometimes, a placeholder value might be required in the documentation, such as an argument
in a command, an IP address or hostname, etc. This list is by no means exhaustive so please
use common sense when deciding what kind of placeholder to use but if your use-case is
outline here, please follow this guide.

***Hostnames and IP Addresses***

For **IPv4 addresses**, please follow [RFC5737](https://www.rfc-editor.org/rfc/rfc5737). In essence,
the following IPv4 blocks are reserved for documentation purposes and should therefore be used
in documentation.

The reserved blocks are `192.0.2.0/24`, `198.51.100.0/24` and `203.0.113.0/24`.

You may also use private network blocks from [RFC1918](https://www.rfc-editor.org/rfc/rfc1918)
in appropriate contexts, for example when explaining how to connect to an external service that
would be hosted within the user's private network alongside IronERP.

---

Conversely, for **IPv6 addresses**, please use the prefix from [RFC3849](https://www.rfc-editor.org/rfc/rfc3849).

The IPv6 prefix reserved for documentation purposes is `2001:DB8::/32`. You can use any address
with this prefix in the documentation.

---

For **hostnames**, you may use reserved DNS names from [RFC2606](https://www.rfc-editor.org/rfc/rfc2606).

The reserved DNS names are:

Top Level:

  - `*.test`
  - `*.example`
  - `*.invalid`
  - `*.localhost`

Second Level:

  - `example.com`
  - `example.net`
  - `example.org`

---

For **special cases**, please try to use common sense or take inspiration from other software
documentations.

For services that might reasonably be expected to run on the developer's machine alongside IronERP,
you can use `127.0.0.1` or `localhost`.

In the context of Docker and Docker Compose, try to use Docker-like names. For example, in an
IronERP Docker Compose file, the Meilisearch component would most likely be available under the
hostname `meilisearch`.

In contexts specific to Kubernetes, try to use internal Kubernetes hostnames in the form of
`<service_name>.<namespace>.svc.cluster.local`

---

***Textual Placeholders***

Sometimes, you might need a textual placeholder for things like configuration files and
command arguments. In general, you should choose such a format that complements the context
and/or relevant programming/configuration language.

**Required** arguments should ideally be marked with angled brackets, e.g.  `command -r <required_argument>`.

**Optional** arguments should be in square brackets, e.g. `command -o [optional_argument]`.

In some contexts, such as configuration files, a templating-language-like placeholder might
be visually more appropriate. E.g.

```yaml
services:
  name: "{{ service_name }}"
  image: "{{ image }}:{{ tag }}"
```

*Please take care to not use this form in contexts where template parsing might be expected
as this would unnecessarily confuse the user.* 