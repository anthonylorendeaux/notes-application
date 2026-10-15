---
title: Sort - MongoDB
created: 2026-01-01T23:28:00
category: Bases
tags: [Fiche]
---

### Le principe de `sort` et `collation` avec la `strength` dans MongoDB

MongoDB offre des fonctionnalités avancées pour trier (`sort`) des documents, particulièrement pour gérer les langues et les règles de comparaison spécifiques via les **collations**. La collation permet de contrôler comment les caractères sont comparés et triés dans une base de données, notamment en prenant en compte la casse, les accents, ou encore les sensibilités linguistiques.

---

### 1. **Qu'est-ce qu'une `collation` ?**

Une collation définit les règles pour :

- **Trier** les chaînes de caractères (ordre alphabétique).
- **Comparer** les chaînes pour l'égalité.

Elle est utile lorsqu'on travaille avec différentes langues ou qu'on souhaite personnaliser les règles de tri. Par exemple :

- Faire la distinction entre majuscules et minuscules.
- Ignorer les accents.

---

### 2. **Le rôle de `strength`**

Le paramètre `strength` dans une collation contrôle le **niveau de sensibilité** pour les comparaisons et les tris. Il existe 5 niveaux de sensibilité (`strength` de 1 à 5) :

| Niveau | Description | Exemples |
| --- | --- | --- |
| **1** | Insensible à la casse et aux accents. | `a`, `A`, `á` sont considérés égaux. |
| **2** | Sensible aux accents, mais pas à la casse. | `a` et `á` sont différents, mais `a` et `A` sont égaux. |
| **3** | Sensible à la casse et aux accents. | `a`, `A` et `á` sont tous différents. |
| **4** | Sensible aux variations (comme les symboles ou la ponctuation). | Les caractères avec des symboles ou diacritiques supplémentaires diffèrent. |
| **5** | Sensible aux différences de code (comparaison stricte). | Chaque caractère est évalué selon son code Unicode. |

---

### 3. **Utilisation avec `sort`**

Lorsqu'on utilise `sort` dans une requête MongoDB, la collation avec un paramètre `strength` peut être appliquée pour définir l'ordre des résultats.

### Exemple : Tri insensible à la casse

```jsx
db.collection.find().sort({ name: 1 }).collation({
    locale: "fr", // Langue : Français
    strength: 1   // Insensible à la casse et aux accents
});
```

Résultat :

- `a`, `A`, `á`, `À` seront considérés comme équivalents et triés ensemble.

### **Pourquoi utiliser `strength` ?**

- **Optimisation des recherches** : Pour ignorer des aspects non pertinents comme les accents ou la casse.
- **Tri linguistique** : Certains alphabets ou langues ont des règles spécifiques.
- **Personnalisation** : Les applications peuvent nécessiter des tris adaptés à des besoins spécifiques (e.g., annuaires, moteurs de recherche).

### **Exemple pratique**

Imaginons une collection `users` avec les documents suivants :

```jsx
[
  { "name": "Émilie" },
  { "name": "Emilie" },
  { "name": "émilie" },
  { "name": "emilie" }
]
```

### Tri insensible à la casse et aux accents :

```jsx
db.users.find().sort({ name: 1 }).collation({
    locale: "fr",
    strength: 1
});
```

Résultat :

```jsx
[ { "name": "Emilie" }, { "name": "Émilie" }, { "name": "emilie" }, { "name": "émilie" } ]
```