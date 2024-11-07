---
sidebar_position: 2
---

# Docker

:::warning

Deploying with Docker directly is only recommended for local development or
complex manual deployments.

Most production deployments should use [Docker Compose](/docs/intro/installing/docker-compose)
or [Kubernetes](/docs/intro/installing/kubernetes)!

:::

## Run IronERP with Docker

### Create a network

```shell
docker network create -d bridge ironerp
```

### Run MongoDB

```shell
docker run \
    --name mongo \
    --network ironerp \
    -p 27017:27017 \
    -d mongodb/mongodb-community-server:latest
```

### Run Meilisearch

```shell
docker run \
    --name meilisearch \
    --network ironerp \
    -p "7700:7700" \
    -e MEILI_MASTER_KEY=ironerp \
    getmeili/meilisearch:v1.10
```

### Run the Backend

```shell
docker run \
    --name ironerp_backend \
    --network ironerp \
    -p 5057:5057 \
    -e MongoDB__Host="mongodb://mongo:27017" \
    -e Search__Backend__MeilisearchHost="http://meilisearch:7700" \
    -e Search__Backend__SearchKey="ironerp" \
    -e Search__Backend__WriteKey="ironerp" \
    ghcr.io/ironerp/ironerp
```

### Run the Frontend

```shell
docker run \
    --name ironerp_frontend \
    --network ironerp \
    -e BACKEND_HOST=http://localhost:5057 \
    -p 3000:3000 \
    ghcr.io/ironerp/frontend
```

If all containers started successfuly, you should now be able to access the
IronERP Frontend at [http://localhost:3000](http://localhost:3000).