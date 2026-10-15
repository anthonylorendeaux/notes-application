---
title: API
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Introduction

Les API RESTful (Representational State Transfer) sont un type d'architecture d'API qui suit un ensemble de principes et de contraintes pour faciliter la communication entre applications. L'objectif est de créer des interfaces cohérentes et faciles à utiliser, permettant aux applications clientes d'interagir avec des serveurs web de manière efficace.

# Fonctionnement des API RESTful

Les API RESTful fonctionnent selon un modèle client-serveur, où les applications clientes envoient des requêtes à un serveur web et reçoivent des réponses. Chaque requête est indépendante et ne doit pas stocker d'état sur le serveur. Cela permet une meilleure évolutivité et une meilleure répartition de la charge.

## Identification des ressources

Chaque ressource dans une API RESTful est identifiée par un URI (Uniform Resource Identifier) unique. Cet URI permet aux clients de localiser et de manipuler la ressource. Les ressources sont représentées dans des formats standardisés comme JSON ou XML, facilitant l'échange de données entre applications hétérogènes.

## Opérations sur les ressources

Les API RESTful utilisent des méthodes HTTP standard pour effectuer des opérations sur les ressources. Les méthodes HTTP les plus courantes sont :
- **GET:** Récupère une représentation d'une ressource.
- **POST:** Crée une nouvelle ressource.
- **PUT:** Met à jour une ressource existante.
- **DELETE:** Supprime une ressource.

## Liaison hypertexte

Les réponses de l'API peuvent inclure des liens hypertexte (aussi appelé hateoas) vers d'autres ressources, permettant aux clients de découvrir et de naviguer dans l'API.

# Avantages des API RESTful

- **Simplicité:** Les API RESTful sont faciles à comprendre et à utiliser, ce qui facilite leur intégration dans les applications.
- **Flexibilité:** Elles permettent de manipuler une grande variété de données et de prendre en charge différents cas d'utilisation.
- **Evolutivité:** Elles sont conçues pour être évolutives et peuvent gérer un grand nombre de requêtes simultanées.
- **Portabilité:** Elles sont indépendantes du langage de programmation ou de la plateforme, permettant une interopérabilité entre différents systèmes.
- **Maintenance facile:** Leur architecture simple facilite la maintenance et la mise à jour des API.

# Cas d'utilisation des API RESTful

Les API RESTful sont particulièrement adaptées aux scénarios suivants :
- **Exposition de données:** Lorsqu'une application a besoin de partager ses données avec d'autres applications ou systèmes externes.
- **Consommation de données:** Lorsqu'une application a besoin de récupérer des données à partir d'une source externe.
- **Création d'applications web modernes:** Les API RESTful sont souvent utilisées comme base pour les API web modernes, fournissant une interface cohérente et facile à utiliser pour les applications clientes.
- **Intégration de systèmes disparates:** Elles permettent de connecter différents systèmes et applications, même s'ils utilisent des technologies différentes.

## Exemple d'utilisation

Imaginons une API RESTful pour gérer une collection de livres. Voici un exemple d'URL et de requête Python pour obtenir la liste de tous les livres:

**URL:** `/api/livres`

**Requête Python:**

```python
import requests

url = "https://exemple.com/api/livres"
response = requests.get(url)

if response.status_code == 200:
    # La requête a réussi
    données = response.json()
    print(données)
else:
    # La requête a échoué
    print("Erreur:", response.status_code)
```

Cet exemple utilise la bibliothèque `requests` pour envoyer une requ��te GET à l'URL spécifiée. Si la requête réussit, la réponse JSON est analysée et imprimée. Sinon, un message d'erreur est affiché.