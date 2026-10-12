---
title: Robot Framework - Best Practices
category: Test
tags: [fiche]
created: 2026-01-01
---

# Bonnes pratiques

Voir [RobotFramework-Architecture](/test/robotframework-architecture) pour l'architecture complete.

## Naming

- **Keywords** : Pas de termes techniques dans les noms (pas de selenium, HTTP, scroll, wait)
- **Variables** : `${SCREAMING_SNAKE_CASE}` pour constantes, `${camelCase}` pour donnees dynamiques
- **Test cases** : Langage metier (`Create Valid User`, pas `Call API Post`)

## Couche Test

- Test cases lisibles par un non-developpeur
- Un seul keyword intermediaire par test case (recommande)
- Variables uniquement dans `*** Variables ***`
- Pas de logique technique (boucles, conditions)
- Pas d'appels directs aux libraries
- Pas de manipulation de JSON ou URLs bruts

## Couche Intermediaire

- Reception des parametres via `[Arguments]`
- Orchestration des keywords Base
- Logique de sequencement (etape 1 vers etape 2 vers verification)
- Pas d'appels directs aux libraries
- Pas de credentials en dur
- Pas de locators

## Couche Base

- Appels directs aux libraries
- Operations techniques atomiques
- Retour de valeurs brutes via `[Return]`
- Pas de logique de sequencement metier
- Pas de connaissance du scenario (couche inferieure)

## Variables

- `Set Suite Variable` - donnees partagees entre tests (`${product_id}`, `${TOKEN}`)
- `Set Test Variable` - donnees locales au test
- `Set Global Variable` - a eviter, sauf configuration globale

## CI/CD

```bash
robot --exclude wip tests/
robot --tag critical tests/
robot --outputdir ./results tests/
robot --variable USER:admin tests/    # surchargeable
```

## Conseils

- **DRY** : si bloc duplique 2 fois, creer un keyword
- **Documentation** : `[Documentation]` sur chaque keyword
- **Arguments nommes** : preferer `${product_id}    ${options}` plutot que 10 arguments positionnels
- **Surcharge** : variables en CLI pour CI/CD (`robot --variable ENV:prod`)
- **1 contexte par resource** : `api_users.resource`, pas `mixed.resource`
- **Timeouts** : utiliser des timeouts raisonnables dans les keywords Selenium/Requests
- **Wait strategies** : preferer les attentes explicites aux `Sleep`
- **Isolation des tests** : nettoyer les etats entre les tests (cookies, sessions, donnees de test)
- **Tags strategiques** : utiliser les tags pour categoriser (regression, smoke, wip, kritikal) et faciliter l'execution selecive

## Pour aller plus loin

- [RobotFramework](/test/robotframework) - Syntaxe et installation
- [RobotFramework-Architecture](/test/robotframework-architecture) - Architecture en couches
