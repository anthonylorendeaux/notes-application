---
title: Robot Framework
category: Test
tags: [fiche]
created: 2026-01-01
---

# Robot Framework

Framework d'automatisation de tests open source base sur Python.

## Installation

```bash
pip install robotframework
pip install robotframework-requests
```

## Architecture en 3 couches

Voir [RobotFramework-Architecture](/test/robotframework-architecture) pour le detail.

| Couche | Fichier | Role |
|--------|---------|------|
| Test | `.robot` | Scenarios lisibles metier : uniquement des mots-cles intermediaires, variables declarees en `*** Variables ***` et injectees via `[Arguments]`. |
| Intermediaire | `workflows.resource` | Orchestration des mots-cles de base : reception des parametres via `[Arguments]`, sequencement metier, aucun appel direct aux librairies. |
| Base | `api.resource` / `ui.resource` / `db.resource` | Implementation technique atomique : appels directs aux librairies, retour de valeurs brutes via `[Return]`. |

**Flux** : Test -> Intermediaire -> Base -> Librairies (interdiction de sauter une couche).

## Execution

```bash
robot tests/
robot --variable BASE_URL:prod tests/
robot --exclude smoke tests/
```

## Pour aller plus loin

- [RobotFramework-Architecture](/test/robotframework-architecture) - Details de l'architecture
- [RobotFramework-BestPractices](/test/robotframework-bestpractices) - Bonnes pratiques
