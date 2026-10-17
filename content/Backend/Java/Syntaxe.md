---
title: Syntaxe
category: Backend
tags: [Fiche]
---

## Annotations

L'annotation `@Override` est utilisée pour indiquer qu'une méthode remplace une méthode héritée d'une classe parente.

```java
public class Animal {
    public void makeSound() {
        System.out.println("Je fais du bruit");
    }
}

public class Chien extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

Il y a aussi d'autres exemples :

- `@Deprecated` : qui indique qu'une classe ou méthode est obsolète et devrait être remplacé
- `@SuppressWarnings` : permet de suppressor certains avertissements du compilateur.

Il existe aussi la `Javadoc` pour annoter des fonctions ou classes:

```java
/**
 * Explication sur ma méthode
 * <strong> Obsolète </strong>
 * @deprecated Obsolète
 * @param monparam
 * @return valeur retourné
 */
public int maFunction(param) {
    return param*2;
}
```

## Exceptions

La gestion des erreurs en Java passe par des exceptions qui permettent de signaler des situations anormales pendant l'exécution du programme.

```java
/**
 * Constructeur pour un article
 *
 * @param nom Nom de l'article
 * @param prix Prix de l'article
 */
public Article(String nom, double prix) {
    if (nom == null) {
        throw new NullPointerException("Le nom ne doit pas être nul");
    }
    if (nom.length() < 2) {
        throw new IllegalArgumentException("Le nom de l'article doit faire plus de deux caractères");
    }
    if (prix <= 0) {
        throw new IllegalArgumentException("Le prix doit être strictement positif");
    }
}
```

On peut distinguer trois exceptions said standards qui reviennent souvent en Java :

- `NullPointerException` : à utiliser quand la variable est nulle.
- `IllegalArgumentException` : quand la valeur est anormale.
- `IllegalStateException` : quand un cas said de `bug` est détecté.

### Exceptions personnalisée

En Java, une exception personnalisée est une classe que vous définissez pour représenter un type d'erreur spécifique à votre application. Elle hérite de la classe `Exception` ou de l'une de ses sous-classes comme `RuntimeException`.

**Pourquoi créer des exceptions personnalisées ?**
- **Améliorer la lisibilité du code:** Elles permettent de donner des noms explicites aux erreurs, ce qui facilite la compréhension du problème.
- **Simplifier la gestion des erreurs:** Vous pouvez regrouper les traitements spécifiques à chaque type d'erreur dans la classe d'exception correspondante.
- **Faciliter la maintenance du code:** Le code devient plus modulaire et les erreurs plus fáciles à identifier et à corriger.

**Exemple d'exception personnalisée :**

```java
public class SoldeInsuffisantException extends RuntimeException {
    public SoldeInsuffisantException() {
        super("Le solde du compte est insuffisant pour cette transaction.");
    }
    public SoldeInsuffisantException(String message) {
        super(message);
    }
}
```

**Utilisation de l'exception personnalisée :**
Avec cette classe il est donc possible de lever l'exception `SoldeInsuffisantException` lorsque le solde est insuffisant :

```java
public void effectuerTransaction(double montant) {
    if (compte.getSolde() < montant) {
        throw new SoldeInsuffisantException("Le solde est insuffisant pour effectuer la transaction.");
    }
    // ... code pour effectuer la transaction
}
```

**Gestion de l'exception :**
Enfin, il est possible de gérer l'exception `SoldeInsuffisantException` dans un bloc `catch` :

```java
try {
    compte.effectuerTransaction(montant);
} catch (SoldeInsuffisantException e) {
    // Afficher un message d'erreur à l'utilisateur
    System.out.println("Erreur : " + e.getMessage());
} catch (IllegalArgumentException e) {
    System.out.println("Bug non géré.");
} finally {
    System.out.println("Fin du try");
}
```

Ici on peut gérer aussi d'autres exception qui seraient levées pendant l'exécution. De plus nous avons ajouté un bloc `finally` qui peut être utilisé pour libérer des ressources par exemple ou finaliser un traitement.

**Avantages des exceptions personnalisées :**
- **Meilleure communication des erreurs:** Elles permettent de fournir des messages d'erreur plus précis et plus contextuels.
- **Code plus robuste:** Le code devient plus fiable en gérant les erreurs de manière prévisible.
- **Meilleure maintenabilité:** Le code est plus facile à comprendre et à déboguer.

### Types génériques

Les types génériques en Java permettent de créer des classes, interfaces et des méthodes qui peuvent être utilisées avec différents types de données.

### `ArrayList<T>`

Nous pouvons prendre l'exemple des ArrayList, qui peut être paramétré avec différents types pour stocker des listes. On stocke donc des valeurs, récupérable par leurs index.

```java
// Déclaration d'une ArrayList pour stocker des articles
ArrayList<Article> catalogue = new ArrayList<>();
// Ajout d'un nouvel article au catalogue
catalogue.add(new Article("LG14", "Luge", 45.00));
// Tri du catalogue par nom
Collections.sort(catalogue, (a1, a2) -> a1.nom().compareTo(a2.nom()));
// Affichage du nom et du prix de chaque article
for (Article article : catalogue) {
    System.out.printf("%s : %.2f euros HT\n", article.nom(), article.prixHt());
}
```

### `HashMap<T>`

Les HashMap font aussi partie de la famille des types génériques, mais permettent de stocker les valeurs sous la forme d'une table de hashage pour mapper une référence à une valeur. Il est donc plus facile de rechercher une valeur.

```java
// Déclaration d'une HashMap pour stocker des articles par référence
HashMap<String, Article> articlesParRef = new HashMap<>();
// Ajout d'un article à la HashMap
articlesParRef.put("LG14", new Article("LG14", "Luge", 45.00));
// Recherche d'un article par sa référence
String rechercheRef = "LG14";
Article articleRecherche = articlesParRef.get(rechercheRef);
if (articleRecherche != null) {
    System.out.printf("Article %s trouvé : %s\n", rechercheRef, articleRecherche);
} else {
    System.out.println("Article " + rechercheRef + " non trouvé.");
}
// Suppression d'un article de la HashMap
articlesParRef.remove(rechercheRef);
```

### Créer ses propres classes génériques

Il est possible de créer ses propres classes génériques. Nous allons prendre ici l'exemple d'une **classe générique `Intervalle`** paramétrée par le type `Double` pour représenter un intervalle de prix. Cette classe permet de vérifier si un prix est dans un intervalle donné.

```java
// Déclaration d'un intervalle de prix
Intervalle<Double> filtrePrix = new Intervalle<>(15.00, 40.00);
// Affichage des articles dont le prix TTC est dans l'intervalle
for (Article article : catalogue) {
    if (filtrePrix.contient(article.prixTTC(tva))) {
        System.out.printf("%s : %.2f euros TTC\n", article.nom(), article.prixTTC(tva));
    }
}
```

Maintenant nous pouvons aussi donner comme type un `Instant` pour non plus comparer des prix mais des dates sans avoir une deuxième classe.

```java
// Déclaration d'un intervalle de dates
Instant dateDebut = Instant.parse("2023-09-01T00:00:00Z");
Instant dateFin = Instant.parse("2023-09-30T23:59:59Z");
Intervalle<Instant> filtreDate = new Intervalle<>(dateDebut, dateFin);
// Affichage des articles dont la date d'abandon est dans l'intervalle
for (Article article : catalogue) {
    if (filtreDate.contient(article.abandonne())) {
        System.out.printf("%s : %s\n", article.nom(), article.abandonne());
    }
}
```