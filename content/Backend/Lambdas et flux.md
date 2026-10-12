---
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Lambdas et flux

## Lambdas

**Les expressions lambda** (ou simplement les lambdas) sont une fonctionnalité introduite dans Java 8 qui permet d'écrire des blocs de code concis et anonymes. Elles sont souvent utilisées en conjonction avec les interfaces fonctionnelles, qui sont des interfaces avec une seule méthode abstraite.

```java
// Interface fonctionnelle
interface IOperation {
    int operation(int a, int b);
}

// Expression lambda
IOperation addition = (a, b) -> a + b;

// Utilisation de l'expression lambda
int resultat = addition.operation(2, 3);
System.out.println("Résultat : " + resultat); // Affiche 5
```

**Points importants à retenir:**
- Les expressions lambda ne peuvent pas être utilisées pour des blocs de code complexes.
- Elles ne peuvent pas accéder aux variables locales de la méthode dans laquelle elles sont définies.
- Elles doivent être typées, soit explicitement, soit par inférence du type de la variable à laquelle elles sont affectées.

**Voici quelques exemples d'utilisation des expressions lambda en Java:**

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> nombresPairs = nombres.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());
System.out.println(nombresPairs); // Affiche [2, 4]
```

- **Trier une collection:**

```java
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie");
noms.sort((a, b) -> a.compareTo(b));
System.out.println(noms); // Affiche [Alice, Bob, Charlie]
```

- **Parcourir une collection:**

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5);
nombres.forEach(n -> System.out.println(n));
// Affiche:
// 1
// 2
// 3
// 4
// 5
```

## Flux(Stream)

Les Streams en Java 8 ont révolutionné le traitement des collections de données, en offrant une approche élégante et puissante pour les parcourir, les filtrer, les transformer et les agréger. Ils constituent un élément essentiel de la programmation fonctionnelle en Java et permettent d'écrire un code plus concis, lisible et efficace.

**Concepts**
- **Source:** Un Stream est créé à partir d'une source de données, comme une liste, un tableau ou un ensemble.
- **Opérations Intermédiaires:** Les opérations intermédiaires transforment un Stream en un autre Stream. Elles permettent de filtrer, trier, mapper, etc. les éléments du Stream.
- **Opération Terminale:** Une opération terminale produit un résultat ou effectue une action finale sur le Stream. Elle ne peut être appliquée qu'une fois après les opérations intermédiaires.
- **Pipeline de Streams:** Les opérations intermédiaires et terminales sont enchaînées pour former un pipeline de Streams. Chaque opération traite le résultat de l'opération précédente.

### 1. Filtrer et Afficher les Articles Non Abandonnés

```java
// Création du catalogue
var catalogue = new ArrayList<Article>();
catalogue.add(new Article("SK02", "Skateboard", 39.90));
catalogue.add(new Article("CS43", "Casque", 19.50));
catalogue.add(new Article("GP98", "Grip", 7.95));

// Filtrer et afficher les articles non abandonnés
catalogue.stream().filter(a -> !a.estAbandonne()).forEach(System.out::println);
```

- `filter(a -> !a.estAbandonne())` sélectionne uniquement les articles dont la propriété `estAbandonne` est `false`.
- `forEach(System.out::println)` affiche chaque article non abandonné à la console.

### 2. Trier et Afficher les Articles par Nom

```java
// Création du catalogue
var catalogue = new ArrayList<Article>();
catalogue.add(new Article("SK02", "Skateboard", 39.90));
catalogue.add(new Article("CS43", "Casque", 19.50));
catalogue.add(new Article("GP98", "Grip", 7.95));

// Trier et afficher les articles par nom
catalogue.stream().sorted((a, b) -> a.nom().compareTo(b.nom())).forEach(System.out::println);
```

- `sorted((a, b) -> a.nom().compareTo(b.nom()))` trie les articles par ordre alphabétique croissant de leur nom.
- `forEach(System.out::println)` affiche chaque article trié à la console.

### 3. Formater et Afficher les Références et Noms des Articles

```java
// Création du catalogue
var catalogue = new ArrayList<Article>();
catalogue.add(new Article("SK02", "Skateboard", 39.90));
catalogue.add(new Article("CS43", "Casque", 19.50));
catalogue.add(new Article("GP98", "Grip", 7.95));

// Formater et afficher les références et noms des articles
catalogue.stream().map(a -> String.format("[%s] %s", a.ref(), a.nom())).forEach(System.out::println);
```

- `map(a -> String.format("[%s] %s", a.ref(), a.nom()))` transforme chaque article en une chaîne formatée contenant la référence et le nom.
- `forEach(System.out::println)` affiche chaque chaîne formatée à la console.

### 4. Rechercher par Référence et Afficher les Détails d'un Article

```java
// Création du catalogue
var catalogue = new ArrayList<Article>();
catalogue.add(new Article("SK02", "Skateboard", 39.90));
catalogue.add(new Article("CS43", "Casque", 19.50));
catalogue.add(new Article("GP98", "Grip", 7.95));

// Recherche par référence CS43
var rechercheRef = "CS43";
catalogue.stream().filter(a -> a.ref().equals(rechercheRef)).findFirst().ifPresent(article -> {
    System.out.println("Article trouvé : " + article.nom());
    System.out.println("Prix HT : " + article.prixHt() + " €");
});
```

- `filter(a -> a.ref().equals(rechercheRef))` sélectionne l'article avec la référence `rechercheRef`.
- `findFirst()` renvoie l'article correspondant, ou `null` s'il n'est pas trouvé.
- `ifPresent(article -> {...})` effectue les actions si un article est trouvé.