---
sidebar_position: 1
---

# Quick Start

This quickstart installation guide will walk you through the steps required
to deploy a local, non-production instance of IronERP for testing, evaluation
and development.

:::warning

This deployment method is **not suitable** for production!

For production deployments, please see the [Docker](/docs/intro/installing/docker),
[Docker Compose](/docs/intro/installing/docker-compose) and
[Kubernetes](/docs/intro/installing/kubernetes) sections.

:::

## Run instantly with Docker

IronERP comes with an evaluation Docker image that already contains everything
that's needed to run it. You can simply `docker run` this image and have a
working IronERP instance in seconds.

This method is only suitable for initial evaluation.

```shell
docker run \
    --name ironerp \
    -e IRONERP_USER=Admin \
    -e IRONERP_PASS=Admin \
    -p 3000:3000 \
    ghcr.io/ironerp/quickstart:latest
```

After the container starts, you can access your IronERP instance at
[http://localhost:3000](http://localhost:3000).

## Run Manually

While this process is more involved, it gives you more flexibility. This way
of running IronERP is recommended for local development.

### Prerequisites

 - .NET 8 SDK
 - NodeJS 20+
 - MongoDB
 - [Meilisearch](/docs/intro/misc/meilisearch)

:::warning

This guide assumes you already have MongoDB and Meilisearch running. For guides
on how to set up external dependencies, please look in 
[Miscellaneous Guides](/docs/intro/misc).

:::

### Getting the Code

Either fork the IronERP repo and clone your fork, or clone the IronERP repo
directly.

```shell
git clone https://github.com/IronERP/IronERP
```

### Running the Backend

 1. Switch into the backend directory: `cd IronERP.Web`
 2. Restore NuGet deps: `nuget restore`
 3. Edit `appsettings.Local.json` with your MongoDB and Meilisearch connection
    details
 4. Run the backend with `ASPNETCORE_ENVIRONMENT=Development dotnet run`

The IronERP API should now be available at [http://localhost:5057](http://localhost:5057).

You can verify that the Backend is running with cURL:

```shell
> curl http://localhost:5057
IronERP Backend v1.0.0
```

### Running the Frontend

 1. Switch into the Frontend directory: `cd Frontend/ironerp-frontend`
 2. Install yarn dependencies: `yarn`
 3. Run the development server: `yarn dev`

The frontend should now be running at [http://localhost:3000](http://localhost:3000).