---
sidebar_position: 2
---

# Contributing to IronERP Docs

:::info

For information about contributing to IronERP Code, please see
[Contributing Code](/docs/Engine/contributing)

:::

# Code of Conduct

We have adopted the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct)
for the IronERP project. Please follow this code of conduct when interacting with the
IronERP community in any way.

## Docusaurus

:::warning

We've recently migrated to Docusaurus from MkDocs. Everything should be migrated
over at this point but if you find something that's missing from the new version,
please look for the missing content in the `old` branch and add it.

:::

The IronERP documentation website is built with [Docusaurus](https://docusaurus.io/).
This is a super-quick getting started guide that will walk you through the process
of cloning the docs repo, making changes, verifying them locally and submitting
them for a review.

For more technical details, please see the [Docusaurus Docs](https://docusaurus.io/docs).

## Super-Quick-Start

### Requirements

 - NodeJS 18
 - Yarn 3
 - Text Editor
 - Web Browser

:::warning

Please make sure you're using NodeJS 18 and Yarn 3. Any other version combinations
will generate an incompatible `yarn.lock` that will then break deployments of
the site.

:::

### Setup

First, please fork the IronERP docs repository and clone your fork. You will
then use your fork to submit a pull request. Only trusted contributors can
submit code directly.

`// TODO: Add a fork link`

```shell
# Clone your fork
$> git clone https://github.com/<username>/ironerp_docs.git

# Make sure you're using the right tool versions
$> node --version
    >>> v18.17.1

$> yarn --version
    >>> 3.6.3

# Change into the IronERP docs directory and create a new branch.
# Please try to make the branch name descriptive of your changes
$> cd ironerp_docs && git checkout -b feature/add-some-docs

# Install dependencies
$> yarn

# Start the development server
$> yarn start
```

You can now edit the markdown files in `docs/` and preview your changes at
[http://localhost:3000](http://localhost:3000).

### Structure

All documentation pages are organised as Markdown `.md` files in the `docs/`
directory. The documentation is split into sections. These section hold 
documents related to various "components" of the IronERP project.

These sections are:
  - **Intro:** The quick-start guide and related documents
  - **Engine:** Documentation for the core IronERP Engine
  - **CLI:** Documentation for the (now deprecated) CLI
  - **Meta:** Organizational information

If you're adding a completely new document, please make sure it's in a section
where it fits the most. If unsure, ask in Slack.

If you feel like your addition warrants creating a completely new section, please
consult this idea in the 
<a href="https://ironerpcommunity.slack.com/archives/C07UUQP8LMP" class="slack-channel">documentation</a>
Slack channel first.

### Making Changes

Pick a file and make your edits. The files are formatted with 
[Markdown](https://www.markdownguide.org/basic-syntax/).

There are no set rules for file names and structure. If you need to add a new file,
simply try to follow whatever conventions seem to be in use around the file's
siblings.

### Submitting your Changes

Add and commit your changes and push them to your fork. Then create a pull request
from the GitHub UI. Always target the `main` branch in your pull requests. If
your PR contains multiple commits, please check the option to squash them.

:::warning

Don't forget to **sign off your commits**. By signing off a commit, you express
your agreement to the terms of the 
[Developer Certificate of Origin](https://developercertificate.org/). We cannot
accept commits that are not signed off!

To sign off a commit, use `--signoff` or `-s`.

:::

```shell
$> git add --all
$> git commit -ams "feat: added some docs"
$> git push origin feature/add-some-docs
```

## Content Guidelines

### Placeholders

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
within this prefix in the documentation.

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

In the context of Docker and Docker Compose, try to use Docker-like hostnames. For example, in an
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