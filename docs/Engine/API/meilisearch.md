# Meilisearch API

IronERP indexes simplified information about all database entities in 
Meilisearch. The Meilisearch instance can then be used for very fast site-wide
search across the entire database.

:::info

For optimal performance, Meilisearch recommends calling the Meilisearch API
directly from the end-user frontend. That is exactly what we are doing.

This document describes how to call the Meilisearch API correctly. IronERP
does not expose any intermediary endpoints.

For more details, please refer to the 
[Meilisearch Docs](https://www.meilisearch.com/docs)

For more info about how IronERP interacts with Meilisearch, please see the
[IronERP Search Docs](/docs/engine/components/search).

:::

## Indexed Fields

IronERP automatically indexes all database contents in Meilisearch. This is only
meant for simplified but very fast sitewide search and therefore only very
limited information is available.

For every entity, the following information is indexed:

 - name of the Model
 - ID of the Entity
 - name of the Entity

## The Meilisearch API

### Perform a site-wide search

`GET <MeilisearchEndpoint>/indexes/GlobalEntitySearchIndex/search`

**Request body:**

```json
{
    "q": "<search query>"
}
```

**Returns:**

 - 200 OK -> 
   ```json
   {
     "hits": [
       {
         "Id": "6718d911eb1d5383fc8f1bce",
         "Name": "Demo",
         "Type": "Demo"
        },
     ],
     "offset": 0,
     "limit": 20,
     "estimatedTotalHits": 976,
     "processingTimeMs": 35,
     "query": "demo"
   }
   ```

This endpoint searches the `Name` fields of every entity in the database.