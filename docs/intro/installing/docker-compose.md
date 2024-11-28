---
id: docker-compose
sidebar_position: 3
---

# Docker Compose

:::info

**Pro Tip:** If you’re already familiar with Docker Compose and need a quick 
start, you can use the production-ready `compose.yaml` file in the `examples`
directory of the IronERP repository.

:::

This guide will walk you through creating a custom Docker Compose file for 
IronERP, giving you a deeper understanding of how to set up a production-ready 
deployment.

## Preparing

To complete this guide, make sure you have:

- A recent version of Docker with Compose included (tested with version 20.0.3)
- A text editor
- Access to a terminal

In this guide, we’ll be using prebuilt IronERP images rather than building from 
source. Start by creating an empty working directory, and within it, an empty 
`compose.yaml` file.

## Infrastructure

To set up IronERP, we’ll need to create a few volumes and a network. Volumes 
provide semi-persistent or fully persistent storage for Docker containers, 
ensuring data remains accessible even if the containers are restarted or 
recreated. Networks allow containers to communicate with each other over 
isolated virtual networks, avoiding the need to open additional ports on 
the host machine.

### Volumes

:::info

This guide uses Docker Volumes for data persistence. If you prefer using local
filesystem mounts, you can skip this section for now.

:::

First, let's define our volumes. We'll need three in total - one for Mongo, one
for Meilisearch and one for the Backend.

```yaml
volumes:
    mongo:
    meilisearch:
    backend:
```

This tells Docker Compose to create three volumes named `mongo`, `meilisearch`,
and `backend` with the default configuration.

### Networks

Now let’s create a network. Putting all of our containers in the same network 
will ensure that they can communicate with each other without cluttering the 
host system’s network with unnecessary open ports.

```yaml
networks:
    ironerp:
        driver: bridge
```

This will create a network named `ironerp` in `bridge` mode. In this mode, all 
containers within the network can communicate with each other, but they can’t 
directly access the host. For security reasons, it’s recommended to use bridge 
networking unless there’s a specific need for processes in the containers to 
communicate directly with the host.

## Configuration

It's important to always store your secrets securely. There are many ways to 
do this, but for the purposes of this guide, we'll be using an `.env` file.

The `.env` file is a special file that contains variable declarations, which 
can later be referenced in the compose file. Docker Compose will load this 
file automatically for us.

If you plan to store your compose file in Git, make sure to add the `.env` 
file to your `.gitignore` to avoid accidentally leaking any secrets.

Create a new file called `.env` and put some secrets in it.

```
MEILISEARCH_MASTER_KEY="ironerp"

IRONERP_DEFAULT_USER="Admin"
IRONERP_DEFAULT_PASS="Admin123!"
```

## Services

### MongoDB

Now that we have all the necessary infrastructure in place, we can start 
creating containers! Let’s begin with MongoDB. Add a new `services` section 
to your Compose file and configure it like this:

```yaml
services:
    mongo:
        image: mongodb/mongodb-community-server:latest
        networks:
            - ironerp
        volumes:
            - "mongo:/data/db"
```

In this configuration, we specify that we want to run a container named `mongo`, 
using the `mongodb/mongodb-community-server:latest` image. This container will 
be connected to the `ironerp` network, and we’re mapping the mongo volume to 
the path `/data/db` inside the container.

### Meilisearch

The section for Meilisearch will be very similar with one addition, we'll be
defining an environment variable and assigning its value from the `.env` file!

```yaml
services:
    #mongo:...

    meiliearch:
        image: getmeili/meilisearch:v1.10
        networks:
            - ironerp
        volumes:
            - "meilisearch:/meili_data"
        environment:
            MEILI_MASTER_KEY: ${MEILISEARCH_MASTER_KEY}
```

### The Backend

Now onto the most "complicated" part of our Compose file (but don’t worry, 
it’s still quite simple) — the IronERP Backend. In this section, we will not 
only assign networks, volumes, and environment variables, but we’ll also be 
exposing some ports!

```yaml
services:
    #mongo:
    #meilisearch:

    backend:
        image: ghcr.io/ironerp/backend:latest
        networks:
            - ironerp
        volumes:
            - "backend:/opt/ironerp/storage"
        environment:
            MongoDB__Host: "mongodb://mongo:27017"
            Search__Backend__MeilisearchHost: "http://meilisearch:7700"
            Search__Backend__SearchKey: "${MEILISEARCH_MASTER_KEY}"
            Search__Backend__WriteKey: "${MEILISEARCH_MASTER_KEY}"
            Auth__Defaults__Username: "${IRONERP_DEFAULT_USER}"
            Auth__Defaults__Password: "${IRONERP_DEFAULT_PASS}"
        ports:
            - "5057:5057"
```

This configuration will run the Backend container, connect it to both MongoDB 
and Meilisearch, and expose port `5057` to the host. This setup allows you to 
access the backend API at `localhost:5057` rather than using the container’s 
IP address.

### The Frontend

Now we just need to run the Frontend container, expose its port, and configure 
it to connect to the backend.

```yaml
services:
    #mongo:
    #meilisearch:
    #backend:
    frontend:
        image: ghcr.io/ironerp/frontend:latest
        environment:
            IRONERP_BACKEND_HOST: localhost:5057
        ports:
            - "3000:3000"
```

You might have noticed we’re not connecting the frontend to the network, 
unlike the other containers. This is because the frontend container simply 
serves a static single-page application that communicates directly with the 
backend. This is also why we needed to expose the backend port.

If you did everything right, you should now have a fully functional IronERP 
instance. Try opening [http://localhost:3000](http://localhost:3000) in your 
browser!

If something went wrong, check the complete example below to ensure nothing 
was missed, and review the documentation. If you still can’t figure it out, 
come say "Hi" in the 
<a href="https://ironerpcommunity.slack.com/archives/C07UUQP8LMP" class="slack-channel">help</a> 
Slack channel. The community will be more than happy to assist.

## Complete Example

```yaml
services:
    mongo:
        image: mongodb/mongodb-community-server:latest
        networks:
            - ironerp
        volumes:
            - "mongo:/data/db"

    meiliearch:
        image: getmeili/meilisearch:v1.10
        networks:
            - ironerp
        volumes:
            - "meilisearch:/meili_data"
        environment:
            MEILI_MASTER_KEY: ${MEILISEARCH_MASTER_KEY}
    
    backend:
        image: ghcr.io/ironerp/backend:latest
        networks:
            - ironerp
        volumes:
            - "backend:/opt/ironerp/storage"
        environment:
            MongoDB__Host: "mongodb://mongo:27017"
            Search__Backend__MeilisearchHost: "http://meilisearch:7700"
            Search__Backend__SearchKey: "${MEILISEARCH_MASTER_KEY}"
            Search__Backend__WriteKey: "${MEILISEARCH_MASTER_KEY}"
            Auth__Defaults__Username: "${IRONERP_DEFAULT_USER}"
            Auth__Defaults__Password: "${IRONERP_DEFAULT_PASS}"
        ports:
            - "5057:5057"

    frontend:
        image: ghcr.io/ironerp/frontend:latest
        environment:
            IRONERP_BACKEND_HOST: localhost:5057
        ports:
            - "3000:3000"

volumes:
    mongo:
    meilisearch:
    backend:

networks:
    ironerp:
        driver: bridge
```