---
created: 2026-01-01T23:28:00
category: Bases
tags: [Fiche]
---

# Elasticsearch

## Définition de Elasticsearch

Elasticsearch est un moteur de recherche open source basé sur Apache Lucene. Il fournit une technologie de recherche distribuée et hautement scalable pour répondre à des besoins analytiques spécifiques. Il est principalement utilisé pour indexer et analyser des données à grande échelle, ainsi que pour effectuer des recherches en temps réel.

## Aperçu de ses fonctionnalité

Les principales fonctionnalités d'Elasticsearch sont :

- Indexation et recherche de documents – Elasticsearch indexe et recherche des documents structurés et non structurés à l'aide de ses algorithmes de recherche intégrés.
- Analyse des données – Elasticsearch fournit un outil d'analyse intégré, permettant aux utilisateurs d'analyser les données indexées pour des résultats plus précis.
- Intégration avec des technologies tierces – Elasticsearch peut être intégré à des technologies tierces pour fournir des résultats plus précis et plus rapides.
- Prise en charge des clusters – Elasticsearch prend en charge la mise en cluster des serveurs, ce qui permet une scalabilité et une fiabilité accrues.
- Architecture RESTful – Elasticsearch utilise une architecture RESTful, ce qui signifie qu'il peut être intégré à toute application qui supporte la même architecture.

# Explication de l'utilisation d'Elasticsearch

## Indexation et recherche

L'indexation consiste à mettre les données dans un format spécifique qui permet de les rechercher plus rapidement. Avec Elasticsearch, cela signifie que vous pouvez indexer des données à partir de sources telles que des bases de données, des fichiers CSV, des documents JSON ou même du texte brut.

Une fois que vos données sont indexées, vous pouvez effectuer des recherches à l'aide de requêtes complexes sur vos données. Par exemple, vous pouvez rechercher des documents qui contiennent un certain mot ou une phrase, ou qui sont dans une certaine plage de dates. Vous pouvez également effectuer des recherches plus complexes en utilisant des requêtes booléennes et des filtres.

Voici un exemple de code Java qui montre comment indexer un document JSON dans Elasticsearch:

```java
// Créer un objet JSON avec les données à indexer
JSONObject jsonObject = new JSONObject();
jsonObject.put("title", "Elasticsearch Tutorial");
jsonObject.put("description", "A helpful guide to getting started with Elasticsearch");
```

```java
// Créer un client Elasticsearch
RestHighLevelClient client = new RestHighLevelClient(
    RestClient.builder(new HttpHost("localhost", 9200, "http"))
);
```

```java
// Créer une requête qui définit le document à indexer
IndexRequest indexRequest = new IndexRequest("tutorials")
    .id("1")
    .source(jsonObject.toString(), XContentType.JSON);
```

```java
// Envoyer la requête à Elasticsearch
IndexResponse indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
```

## Analyse et agrégation

L'analyse et les aggrégations sont des fonctionnalités clés d'Elasticsearch qui permettent d'analyser et d'agréger des données à partir des documents indexés. Ces fonctionnalités sont très puissantes et peuvent être utilisées pour effectuer des recherches avancées, des statistiques et des agrégations.

L'analyse consiste à prendre les documents indexés et à les découper en unités plus petites et plus significatives appelées tokens. Ces tokens peuvent être des mots, des phrases ou des groupes de mots. Une fois que les documents ont été découpés en tokens, ils peuvent être analysés pour extraire des informations supplémentaires.

Par exemple, les tokens peuvent être analysés pour déterminer leur forme grammaticale, leurs racines et leurs synonymes. Cela permet d'effectuer des recherches plus précises et plus riches en contexte.

Les aggrégations permettent d'effectuer des calculs sur les données indexées. Elles peuvent être utilisées pour calculer des statistiques simples, telles que la moyenne, la somme et le nombre de documents correspondants à un terme.

Par exemple, si vous souhaitez compter le nombre de documents qui contiennent le mot "voiture", vous pouvez utiliser une agrégation pour obtenir un résultat. De même, si vous souhaitez calculer la moyenne des prix des voitures listées dans un index, vous pouvez utiliser une agrégation pour obtenir un résultat.

Voici un exemple de code Java qui montre comment utiliser l'API REST d'Elasticsearch pour effectuer une recherche analysée et une agrégation:

```java
// Définir un objet de requête
SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
```

```java
// Définir la requête analysée
searchSourceBuilder.query(QueryBuilders.matchQuery("title", "voiture"));
```

```java
// Définir l'agrégation
searchSourceBuilder.aggregation(AggregationBuilders.terms("count_by_category").field("category"));
```

```java
// Exécuter la requête
SearchResponse searchResponse = client.search(searchRequest);
```

```java
// Traiter le résultat
Terms termsAgg = searchResponse.getAggregations().get("count_by_category");
for (Terms.Bucket bucket : termsAgg.getBuckets()) {
    System.out.println(bucket.getKey() + ": " + bucket.getDocCount());
}
```

## Stockage et gestion des données

Elasticsearch stocke et gère les données à l'aide de documents JSON qui sont indexés et stockés dans des index. Un index est une collection de documents qui partagent un certain schéma et qui sont accessibles en utilisant une API RESTful.

Par exemple, vous pouvez créer un index nommé "utilisateurs" qui stocke des documents JSON contenant les informations des utilisateurs. Vous pouvez ensuite utiliser la API RESTful pour ajouter, modifier, supprimer et rechercher des documents dans l'index "utilisateurs".

Exemple en Java:

```java
// Créer un nouvel index
Client client = new PreBuiltTransportClient(Settings.EMPTY)
    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300));
CreateIndexRequest request = new CreateIndexRequest("utilisateurs");
CreateIndexResponse response = client.indices().create(request);
```

```java
// Ajouter un document à l'index
Map<String, Object> userDoc = new HashMap<>();
userDoc.put("nom", "John Doe");
userDoc.put("age", 27);
IndexRequest indexRequest = new IndexRequest("utilisateurs").id("1").source(userDoc);
IndexResponse indexResponse = client.index(indexRequest);
```

```java
// Récupérer le document
GetRequest getRequest = new GetRequest("utilisateurs", "1");
GetResponse getResponse = client.get(getRequest);
```

```java
// Modifier le document
Map<String, Object> updatedUserDoc = new HashMap<>();
updatedUserDoc.put("nom", "John Smith");
updatedUserDoc.put("age", 28);
UpdateRequest updateRequest = new UpdateRequest("utilisateurs", "1").doc(updatedUserDoc);
UpdateResponse updateResponse = client.update(updateRequest);
```

```java
// Supprimer le document
DeleteRequest deleteRequest = new DeleteRequest("utilisateurs", "1");
DeleteResponse deleteResponse = client.delete(deleteRequest);
```

# Exemples d'utilisation avec Java

## Afficher des données indexées

```java
// Créez un client ElasticSearch
Client client = new PreBuiltTransportClient(Settings.EMPTY)
    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300));
SearchResponse response = client.prepareSearch("index")
    .setTypes("type")
    .setQuery(QueryBuilders.matchAllQuery())
    .execute()
    .actionGet();
for (SearchHit hit : response.getHits().getHits()) {
    System.out.println(hit.getSourceAsString());
}
```

## Utiliser des requêtes pour effectuer des recherches

```java
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.QueryBuilders;

TransportClient client = new PreBuiltTransportClient(Settings.EMPTY)
    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300));
SearchResponse response = client.prepareSearch("index_name")
    .setTypes("type_name")
    .setQuery(QueryBuilders.termQuery("field_name", "field_value"))
    .execute()
    .actionGet();
```

## Effectuer des opération d'agrégation

```bash
// Créer une nouvelle requête
SearchRequest searchRequest = new SearchRequest();

// Créer un contexte d'aggrégation
AggregationBuilder aggregation = AggregationBuilders
    .terms("agg")
    .field("field");

// Ajouter l'aggrégation à la requête
searchRequest.source().aggregation(aggregation);

// Exécuter la requête
SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

// Récupérer les résultats
Terms terms = searchResponse.getAggregations().get("agg");
```

# Conclusion

Elasticsearch est un moteur de recherche open source performant et évolutif qui offre une excellente connectivité avec les applications et les systèmes de bases de données. Il permet aux utilisateurs de rechercher rapidement des informations à partir de données structurées ou non structurées. Il est facile à installer et à configurer, et offre des fonctionnalités puissantes et des méthodes d'indexation et d'interrogation flexibles. Sa grande scalabilité et ses performances élevées en font une solution de recherche idéale pour les entreprises de toutes tailles.