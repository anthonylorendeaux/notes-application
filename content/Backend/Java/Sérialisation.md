---
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Sérialisation

La sérialisation est le processus de conversion d'un objet Java en un format binaire (flux d'octets) qui peut être stocké ou transmis. Ce processus permet de conserver l'état d'un objet et de le reconstituer ultérieurement. La désérialisation est l'opération inverse qui consiste à convertir un flux d'octets en un objet Java.

## Pourquoi utiliser la sérialisation dans les communications RESTful ?

La sérialisation joue un rôle crucial dans les communications RESTful car elle permet de transférer des données entre différentes applications de manière efficace et standardisée. Les API RESTful échangent généralement des données au format JSON ou XML, et la sérialisation est utilisée pour convertir des objets Java en ces formats de données textuelles.

## Utilisation de la sérialisation

Java fournit des mécanismes intégrés pour la sérialisation et la désérialisation d'objets. La classe `ObjectOutputStream` est utilisée pour sérialiser un objet en un flux d'octets, tandis que la classe `ObjectInputStream` est utilisée pour désérialiser un flux d'octets en un objet.

Voici un exemple de sérialisation d'un objet Java en format JSON à l'aide de la bibliothèque Jackson :

```java
import com.fasterxml.jackson.databind.ObjectMapper;
// Créer un objet Java
Personne personne = new Personne("Dupont", "Jean");
// Créer un mapper Jackson
ObjectMapper mapper = new ObjectMapper();
// Sérialiser l'objet en JSON
String json = mapper.writeValueAsString(personne);
// Afficher le JSON sérialisé
System.out.println(json);
```

Et un exemple de désérialisation d'un objet :

```java
import com.fasterxml.jackson.databind.ObjectMapper;
// Créer un mapper Jackson
ObjectMapper mapper = new ObjectMapper();
// Définir le type d'objet cible
Class<Personne> typePersonne = Personnel.class;
// Désérialiser le JSON en objet Java
Personne personne = mapper.readValue(json, typePersonne);
// Accéder aux propriétés de l'objet désérialisé
System.out.println("Nom : " + personne.getNom());
System.out.println("Prénom : " + personne.getPrenom());
```

## Alternatives à la sérialisation Java native

Outre la sérialisation Java native, d'autres bibliothèques populaires peuvent être utilisées pour la sérialisation d'objets dans les communications RESTful, telles que :

- **Google Gson:** Une bibliothèque légère et efficace pour la sérialisation et la désérialisation JSON.
- **Protobuf:** Un format de données binaire optimisé pour l'efficacité et la taille des messages.

**Points importants à considérer**
- La sérialisation Java native est simple à utiliser mais peut être moins performante que d'autres alternatives.
- Le choix de la bibliothèque de sérialisation dépend des besoins spécifiques de l'application, tels que les performances, la taille des messages et la compatibilité avec d'autres plateformes.
- Il est important de s'assurer que les classes sérialisées sont marquées comme `Serializable` pour que le processus de sérialisation fonctionne correctement.

## Utilisation dans le cadre d'API RESTful

Communiquer avec une API RESTful en Java vous permet d'interagir avec des ressources web de manière structurée et efficace. Maîtriser les concepts clés et les exemples de code vous permettra de développer des applications puissantes et connectées.

> **Voir aussi :** Pour plus de détails sur les API RESTful, consulter [API](/backend/api).

### Réaliser des requêtes (exemple avec Apache HttpClient)

```java
import org.apache.http.client.methods.*;
import org.apache.http.impl.client.*;
import org.apache.http.util.*;

public class RestExample {
    public static void main(String[] args) throws Exception {
        // URL de l'API (ex: https://api.exemple.com/produits)
        String apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
        // Créer un client HTTP
        CloseableHttpClient httpClient = HttpClients.createDefault();

        // --- Requête GET (obtenir un produit) ---
        // Créer une requête GET
        HttpGet getRequest = new HttpGet(apiUrl);
        // Envoyer la requête et obtenir la réponse
        HttpResponse getResponse = httpClient.execute(getRequest);
        // Gérer la réponse
        if (getResponse.getStatusLine().getStatusCode() == 200) {
            // Lire le corps de la réponse (format JSON)
            String responseBody = EntityUtils.toString(getResponse.getEntity());
            System.out.println("Réponse GET: " + responseBody);
        } else {
            System.out.println("Erreur GET: " + getResponse.getStatusLine().getStatusCode());
        }

        // --- Requête POST (créer un produit) ---
        // Créer une requête POST
        HttpPost postRequest = new HttpPost("https://api.exemple.com/produits");
        // Sérialiser l'objet produit en JSON (ex: nom, prix) et l'ajouter au corps de la requête
        String jsonData = mapper.writeValueAsString(produit);
        postRequest.setEntity(new StringEntity(jsonData));
        // Envoyer la requête et obtenir la réponse
        HttpResponse postResponse = httpClient.execute(postRequest);
        // Gérer la réponse
        if (postResponse.getStatusLine().getStatusCode() == 201) {
            System.out.println("Produit créé avec succès");
        } else {
            System.out.println("Erreur de création: " + postResponse.getStatusLine().getStatusCode());
        }

        httpClient.close();
    }
}
```

### Points importants

- Sérialiser les objets Java en JSON/XML pour les envoyer (ex: `mapper.writeValueAsString(produit)`).
- Désérialiser les réponses JSON/XML en objets Java (ex: `mapper.readValue(responseBody, Produit.class)`).
- Gérer les erreurs et les exceptions (ex: `catch (Exception e)`).
- Respecter les bonnes pratiques REST (ex: codes de statut HTTP, authentification).