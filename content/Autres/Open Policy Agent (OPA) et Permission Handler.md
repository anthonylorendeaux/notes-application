---
title: Open Policy Agent (OPA) et Permission Handler
category: Autres
tags: Fiche
created: 2026-01-01T23:28:00.000Z
---

# Open Policy Agent (OPA) et Permission Handler

## Fonctionnement général

OPA est une solution de gestion des politiques centralisée qui sépare la logique d'autorisation du code de l'application. Cela garantit une gestion des permissions cohérente et centralisée.

### Étapes principales

1. **Application Client** :
   - Envoie une requête à OPA avec le contexte (utilisateur, action, ressource, etc.).
2. **OPA (moteur de décision)** :
   - Analyse la requête selon les règles définies en **Rego**.
   - Retourne une décision (ex. : autorisé/refusé).
3. **Permission Handler** :
   - Interprète la décision d'OPA dans l'application.
   - Détermine si l'action doit être exécutée ou refusée.
4. **Application Backend** :
   - Exécute l'action autorisée ou retourne une erreur.

---

## Schéma d'intégration

```mermaid
graph TD
    A[Utilisateur] -->|Envoie une requête| B[Application Client]
    B -->|Contexte de requête : Utilisateur, action, ressource| C[OPA moteur de décision]
    C -->|Évalue la requête avec les règles Rego| D{Retourne une décision}
    D -->|Autorisé| E[Permission Handler dans l'API ou Service Backend]
    D -->|Refusé| H[Retourne une erreur]
    E -->|Interprète la réponse d'OPA| F{Décide de l'action}
    F -->|Action autorisée| G[Application Backend]
    G -->|Exécute l'opération| I[Résultat final]
```

---

## Exemple concret

### 1. Requête utilisateur

Alice veut supprimer un document.

### 2. Contexte envoyé à OPA

```json
{
  "user": "Alice",
  "action": "delete",
  "resource": "document123"
}
```

### 3. Règle Rego

```
allow {
    input.user == "Alice"
    input.action == "delete"
    input.resource.startswith("document")
}
```

### 4. Decision d'OPA

```json
{
  "allow": true
}
```

### 5. Permission Handler

- Interprète la décision et permet à l'API de procéder.

### 6. Backend

- Supprime le document si l'autorisation est accordée.

---

## Points forts d'OPA

- Centralisation des politiques d'autorisation.
- Séparation claire entre le code applicatif et les règles.
- Gestion simplifiée des permissions dans des environnements complexes.