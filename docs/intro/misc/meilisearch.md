# Running Meilisearch in Docker

To quickly spin up a testing instance of Meilisearch, you can run the
following command.

```shell
docker run \
    --name meilisearch \
    -p "7700:7700" \
    -e MEILI_MASTER_KEY=ironerp \
    getmeili/meilisearch:v1.10
```