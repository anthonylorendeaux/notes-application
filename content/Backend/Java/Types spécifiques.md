---
title: Types spécifiques
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

## Date

### Déclarations

```java
var horloge = Clock.systemUTC();
// Dates
var aujourdhui = LocalDate.now();
var apresDemain = aujourdhui.plusDays(2);
var noel = LocalDate.of(2023, Month.DECEMBER, 25);
System.out.println(aujourdhui);
System.out.println(apresDemain);
// Heures
var maintenant = LocalTime.now(horloge);
System.out.println(maintenant.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT)));
System.out.println(maintenant.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.MEDIUM)));
System.out.println(maintenant.format(DateTimeFormatter.ISO_TIME));
// Dates + heures / fuseaux
var nouvelAn = LocalDateTime.of(2024, 1, 1, 0, 0, 0, 0);
var nouvelAnParis = ZonedDateTime.of(nouvelAn, ZoneId.of("Europe/Paris"));
var nouvelAnGreenwich = OffsetDateTime.of(nouvelAn, ZoneOffset.ofHours(0));
```

### Formatage

```java
System.out.println(noel.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)));
System.out.println(noel.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)));
System.out.println(noel.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)));
System.out.println(noel.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
```

### Lecture

```java
var printemps = LocalDate.parse("20/03/2024", DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT).withLocale(Locale.FRANCE));
System.out.println(printemps.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).withLocale(Locale.FRANCE)));
```

## Texte

### **Déclaration de variable**

```java
var fruits = "Citron, Clémentine, Kiwi, Mandarine, Orange, Noix, Poires, Pommes, Châtaignes, Dattes, Fraises, Framboises, Melons, Mirabelles, Mûres, Myrtilles, Pêches, Prunes, Raisins, Coings, Feijoas, Kakis, Abricots, Amandes, Cerises, Brugnons, Cassis, Groseilles, Pastèques";
```

La variable `fruits` est déclarée et initialisée avec une chaîne de caractères contenant une liste de noms de fruits.

### Méthode split()

```java
var liste = fruits.split(", ");
```

La méthode `split()` est utilisée pour diviser la chaîne `fruits` en une liste (`liste`) de noms de fruits en utilisant la virgule et l'espace comme séparateurs.

### Boucle for et conversion en majuscules

```java
for (var f : liste) {
    System.out.println(f.toUpperCase());
}
```

La boucle `for` parcourt la liste `liste` et affiche chaque élément (`f`) après l'avoir converti en majuscules à l'aide de la méthode `toUpperCase()`.

### Construction d'une nouvelle chaîne

```java
var tri = new StringBuilder();
var sep = "";
for(var f : liste) {
    tri.append(sep);
    tri.append(f);
    sep = ", ";
}
System.out.println(tri.toString());
```

Un objet `StringBuilder` est utilisé pour construire une nouvelle chaîne (`tri`) à partir de la liste `liste`. La boucle `for` parcourt la liste et ajoute chaque élément à `tri` en utilisant `append()`. La variable `sep` est utilisée pour ajouter un séparateur après chaque élément, sauf le premier.

### Points clés

- Le code utilise des chaînes de caractères pour stocker des données et les afficher.
- Des méthodes et des classes spécifiques sont utilisées pour manipuler les chaînes de caractères (split, toUpperCase, StringBuilder).
- La construction de chaînes de caractères peut être effectuée de manière dynamique en utilisant des boucles et des variables.

En plus de ce code, voici quelques fonctionnalités de traitement de chaînes de caractères utiles en Java:

- Recherche et remplacement: `indexOf()`, `lastIndexOf()`, `replace()`
- Extraction de sous-chaînes: `substring()`, `matches()`
- Conversion de format: `format()`, `parse()`
- Concaténation: `+` opérateur, `concat()` méthode

## Regex

> **Voir aussi :** Pour une référence complète des regex, consulter [Regex](/autres/regex) dans le dossier Autres.

### Déclaration de variables

```java
var texte = "\"Il y a 2 sortes d'amour : l'amour insatisfait, qui vous rend odieux, l'amour satisfait, qui vous rend idiot.\" Colette (1873-1954)";
```

- La variable `texte` est déclarée et initialisée avec une chaîne de caractères contenant une citation de Colette.

### Validation d'une citation

```java
// Citation : "[A-Z].*\." \w+ \([-0-9]+\)/* Valider*/
var citation = Pattern.compile("\"[A-Z].*\\.\" \\w+ \\([-0-9]+\\)");
if(citation.matcher(texte).matches()) {
    System.out.println("C'est une citation.");
} else {
    System.out.println("Ce texte ne semble pas être une citation.");
}
```

- L'expression régulière `"[A-Z].*\."" \w+ \([-0-9]+\\)` est compilée dans un objet `Pattern` nommé `citation`.
- La méthode `matcher()` est utilisée pour créer un objet `Matcher` qui correspond à l'expression régulière sur la chaîne `texte`.
- La méthode `matches()` est appelée sur l'objet `Matcher` pour vérifier si la chaîne entière correspond au motif de l'expression régulière.
- Si la validation est réussie, le message "C'est une citation." est affiché. Sinon, le message "Ce texte ne semble pas être une citation." est affiché.

### Compter le nombre de nombres

```java
/* Trouver*/
var nombre = Pattern.compile("\\d+");
var occurenceNombre = nombre.matcher(texte);
var compteur = 0;
while(occurenceNombre.find()) {
    compteur++;
}
System.out.printf("%d nombres ont été trouvés.\n", compteur);
```

- L'expression régulière `\d+` est compilée dans un objet `Pattern` nommé `nombre`.
- La méthode `matcher()` est utilisée pour créer un objet `Matcher` qui correspond à l'expression régulière sur la chaîne `texte`.
- La boucle `while` parcourt toutes les occurrences du motif dans la chaîne `texte` en utilisant la méthode `find()`.
- Le compteur `compteur` est incrémenté à chaque occurrence d'un nombre.
- Le nombre de nombres trouvés est affiché à la fin.

### Extraire des informations

```java
/* Extraire*/
var construction = Pattern.compile("l'amour (\\w+), qui vous rend (\\w+)");
var occurence = construction.matcher(texte);
while(occurence.find()) {
    System.out.printf(
        "%s : %s/%s.\n",
        occurence.group(0),
        occurence.group(1),
        occurence.group(2)
    );
}
```

- L'expression régulière `l'amour (\w+), qui vous rend (\w+)` est compilée dans un objet `Pattern` nommé `construction`.
- La méthode `matcher()` est utilisée pour créer un objet `Matcher` qui correspond à l'expression régulière sur la chaîne `texte`.
- La boucle `while` parcourt toutes les occurrences du motif dans la chaîne `texte` en utilisant la méthode `find()`.
- Pour chaque occurrence, les groupes de capture 1 et 2 sont utilisés pour extraire le type d'amour et son effet.
- Les informations extraites sont affichées pour chaque occurrence.

## Énumérations

### Définition

Une énumération en Java est un type de données spécial qui permet de définir un ensemble de valeurs constantes et nommées. C'est un moyen pratique de regrouper des valeurs liées et d'améliorer la lisibilité et la maintenabilité du code.

**Exemple**

```java
public enum Saison {
    HIVER,
    PRINTEMPS,
    ETE,
    AUTOMNE
}
```

Cet exemple définit une énumération nommée `Saison` avec quatre valeurs possibles : `HIVER`, `PRINTEMPS`, `ETE` et `AUTOMNE`.

### Avantages

- **Lisibilité:** Les noms des valeurs d'une énumération sont plus explicites que les valeurs numériques brutes.
- **Sécurité du typage:** Le compilateur Java peut détecter les erreurs de type lors de l'utilisation d'une énumération.
- **Facilité d'utilisation:** Les énumérations peuvent être utilisées dans des switch-case, des boucles for-each et d'autres structures de contrôle.
- **Extensibilité:** Les énumérations peuvent avoir des méthodes et des attributs comme les classes.

### Utilisation

**Déclaration de variables**

```java
Saison saisonActuelle = Saison.ETE;
```

**Comparaison de valeurs**

```java
if (saisonActuelle == Saison.HIVER) {
    // ...
}
```

**Parcours des valeurs**

```java
for (Saison saison : Saison.values()) {
    System.out.println(saison);
}
```

**Points importants**

- Les valeurs d'une énumération sont implicites finales et statiques.
- Une énumération est une classe Java en elle-même.
- Vous pouvez définir des constructeurs, des méthodes et des attributs pour une énumération.
- Java 16 introduit les énumérations locales, limitées à la portée d'une méthode.

### Records

### Définition

Un record en Java est un nouveau type de classe introduit dans Java 16. Il permet de déclarer des classes immuables avec une syntaxe concise et facile à utiliser.

**Exemple**

```java
record Point(int x, int y) {}
```

Cet exemple définit un record nommé `Point` avec deux champs : `x` et `y`.

**Avantages**

- **Simplicité:** La syntaxe est plus simple que celle des classes traditionnelles.
- **Immuabilité:** Les instances d'un record sont immuables une fois créées.
- **Concision:** Le code est plus concis et plus facile à lire.
- **Performances:** Les records peuvent être compilés de manière plus efficace que les classes traditionnelles.

### Utilisation

- **Déclaration de variables**

```java
Point point1 = new Point(10, 20);
```

- **Accès aux champs**

```java
int x = point1.x();
int y = point1.y();
```

- **Comparaison d'instances:**

```java
if (point1.equals(point2)) {
    // ...
}
```

**Points importants**

- Les records sont des classes finales et immuables.
- Un record possède automatiquement un constructeur, des accesseurs en lecture pour ses champs, et les méthodes `equals()`, `hashCode()` et `toString()`.
- Vous pouvez ajouter des méthodes et des attributs supplémentaires à un record.
- Java 17 introduit les records scellés, qui limitent les classes qui peuvent hériter d'un record.
