---
created: 2026-01-01T23:28:00
category: Bases
tags: [Fiche]
---

# MongoDB

## Connexion à la Base de Données

### Se Connecter à MongoDB en Utilisant la Ligne de Commande

```bash
mongo
```

### Se Connecter à une Base de Données Spécifique

```bash
use ma_base_de_donnees
```

### Afficher la Liste des Bases de Données

```bash
show dbs
```

## Requêtes de Base

### Afficher Toutes les Collections dans la Base de Données

```bash
show collections
```

### Afficher Tous les Documents d'une Collection

```bash
db.ma_collection.find()
```

### Afficher les Documents avec un Filtre

```bash
db.ma_collection.find({ champ: "valeur" })
```

### Limiter le Nombre de Résultats

```bash
db.ma_collection.find().limit(10)
```

### Trier les Résultats

```bash
db.ma_collection.find().sort({ champ: 1 })  # Tri ascendant
db.ma_collection.find().sort({ champ: -1 }) # Tri descendant
```

### Compter le Nombre de Documents dans une Collection

```bash
db.ma_collection.count()
```

## Opérations de Mise à Jour

### Insérer un Document

```bash
db.ma_collection.insert({ champ1: "valeur1", champ2: "valeur2" })
```

### Mettre à Jour un Document Existant

```bash
db.ma_collection.update({ champ: "valeur" }, { $set: { champ_a_mettre_a_jour: "nouvelle_valeur" } })
```

### Supprimer un Document

```bash
db.ma_collection.remove({ champ: "valeur" })
```

## Opérations Avancées

### Agrégation de Données

```bash
db.ma_collection.aggregate([
  { $group: { _id: "$champ", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])
```

### Indexation des Champs

```bash
db.ma_collection.createIndex({ champ: 1 })
```

## Quitter MongoDB

```bash
quit()
```

N'oubliez pas de remplacer "ma_base_de_donnees" et "ma_collection" par les noms de votre base de données et de votre collection. Cette "cheat sheet" vous aidera à effectuer les opérations de base dans MongoDB.