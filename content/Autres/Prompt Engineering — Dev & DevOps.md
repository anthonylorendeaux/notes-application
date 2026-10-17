---
title: Prompt Engineering — Dev & DevOps
category: Autres
tags: Fiche
created: 2026-03-24
---

## Introduction

Le **prompt engineering** pour les devs et DevOps, c'est l'art de formuler ses demandes à un LLM (Claude, GPT-4, etc.) pour obtenir du code, des configs, des diagnostics ou des automatisations de qualité **production** — pas juste des exemples qui marchent dans le vide.

Un bon prompt en contexte technique = **rôle + contexte + contraintes + format attendu**.

---

## 1. La structure de base — le framework RCCF

```
R — Rôle     : Qui est Claude dans ce contexte ?
C — Contexte : Stack, version, contraintes du projet
C — Contraintes : Ce qu'il ne faut PAS faire
F — Format   : Quel type de sortie tu attends
```

### Exemple sans RCCF (mauvais prompt)

```
Fais moi un Dockerfile
```

### Exemple avec RCCF (bon prompt)

```
Tu es un DevOps senior spécialisé en conteneurisation.

Contexte :
- App NestJS 10, Node 20
- Build en production (pas de dev dependencies)
- Déployé sur un VPS avec peu de RAM (512MB)

Contraintes :
- Image finale < 200MB
- Utiliser multi-stage build
- Ne pas lancer en root

Génère le Dockerfile optimisé avec des commentaires sur chaque étape.
```

---

## 2. Donner le rôle — System Prompt / Persona

Donner un rôle à Claude change radicalement la qualité des réponses techniques.

### Rôles utiles par domaine

| Domaine | Rôle à donner |
| --- | --- |
| Frontend | `Tu es un dev Angular senior, expert en performance et accessibilité` |
| Backend | `Tu es un architecte NestJS avec 10 ans d'expérience en APIs REST et microservices` |
| DevOps | `Tu es un ingénieur DevOps spécialisé en CI/CD GitHub Actions et Kubernetes` |
| Sécurité | `Tu es un expert en sécurité applicative (OWASP), tu cherches des failles avant tout` |
| Code Review | `Tu es un lead dev exigeant. Tu ne valides rien sans avoir vérifié les edge cases` |
| Debug | `Tu es un debugger expert. Tu traces chaque erreur depuis les logs jusqu'à la cause racine` |

---

## 3. Techniques avancées

### 3.1 Chain of Thought — forcer le raisonnement étape par étape

Ajoute **"Raisonne étape par étape"** ou **"Think step by step"** pour les problèmes complexes.

```
Mon pipeline CI GitHub Actions échoue avec cette erreur :
[coller l'erreur]

Raisonne étape par étape :
1. Identifie la cause probable
2. Vérifie les hypothèses alternatives
3. Propose le fix avec explication
```

> Particulièrement efficace pour le debugging et les décisions d'architecture.

### 3.2 Few-Shot — donner des exemples pour calibrer le style

Montre un exemple de ce que tu veux AVANT de poser ta question.

```
Voici comment je nome mes tests dans ce projet :

✅ Bon exemple :
it('should return 404 when user does not exist', ...)
it('should throw UnauthorizedException when token is expired', ...)

Maintenant génère les tests pour ce service en respectant exactement
ce format de nommage :
[coller le service]
```

### 3.3 Contraintes négatives — dire ce qu'on ne veut PAS

Extrêmement efficace pour éviter les mauvaises pratiques.

```
Refactorise ce composant Angular.

Ne pas :
- Utiliser des NgModule (on est en standalone)
- Introduire de nouvelles dépendances npm
- Modifier l'interface publique du composant
- Utiliser `any` TypeScript

[coller le composant]
```

### 3.4 Demander plusieurs options — forcer le trade-off

```
Propose 3 approches pour gérer le cache dans cette API NestJS.
Pour chaque approche :
- Décris la solution en 2 lignes
- Avantages
- Inconvénients
- Dans quel cas tu la recommandes

Ensuite recommande celle qui convient le mieux à notre contexte :
[décrire le contexte]
```

### 3.5 Itération par contrainte — affiner progressivement

Ne pas tout demander d'un coup. Construire par couches.

```
// Étape 1 — structure
"Génère le squelette du service AuthService sans implémentation"

// Étape 2 — implémentation
"Implémente maintenant la méthode login() avec JWT"

// Étape 3 — edge cases
"Ajoute la gestion : token expiré, utilisateur inexistant, mauvais mot de passe"

// Étape 4 — tests
"Génère les tests Jest pour les 3 cas d'erreur qu'on vient d'ajouter"
```

---

## 4. Prompts spécifiques Dev

### Générer du code avec contraintes de qualité

```
Tu es un dev Angular senior.

Crée un composant DataTableComponent :
- Standalone, TypeScript strict
- @Input() data: T[], columns: ColumnDef[]
- Tri côté client sur chaque colonne
- Pagination (10 éléments par page)
- Accessible (ARIA labels)

Exigences de qualité :
- Aucun `any`
- Pas de logique dans le template
- Destructor pour les subscriptions
```

### Debug d'une erreur

```
Voici l'erreur que j'obtiens :
[stack trace complet]

Voici le fichier concerné :
[code]

Voici ce que j'ai déjà essayé :
[tentatives précédentes]

Identifie la cause racine (pas juste les symptômes)
et propose le fix minimal.
```

### Revue de code ciblée

```
Fais une revue de ce code en tant que lead dev senior.

Focalise-toi sur :
1. Bugs potentiels et edge cases non gérés
2. Problèmes de performance
3. Violations des bonnes pratiques Angular/NestJS

Ne commente PAS le style ou le formatage (c'est géré par le linter).

[coller le code]
```

### Architecture — demander une décision

```
Contexte : API NestJS avec 50k requêtes/jour, PostgreSQL.

Problème : les requêtes sur /products/search sont lentes (800ms).

Solution envisagée : ajouter Redis comme cache.

Questions :
1. Est-ce la bonne approche pour ce volume ?
2. Quelles alternatives ?
3. Si Redis, quelle stratégie d'invalidation pour les données produit ?

Réponds en mode architecte, pas en mode tutorial.
```

---

## 5. Prompts spécifiques DevOps

### Générer une config CI/CD

```
Tu es un ingénieur DevOps senior.

Génère un workflow GitHub Actions pour :
- App Angular + NestJS dans un monorepo (nx)
- Jobs : lint → test → build → deploy
- Deploy sur VPS via SSH uniquement si la branche est main
- Cache des node_modules entre les jobs
- Notification Slack en cas d'échec

Contraintes :
- Pas de secrets en clair
- Jobs parallèles quand c'est possible
- Timeout de 10 min max par job
```

### Analyser des logs en prod

```
Voici les logs Nginx des dernières 24h lors de l'incident :
[coller les logs]

Analyse :
1. Quelle est la cause probable de la dégradation ?
2. Y a-t-il des patterns suspects (DDoS, bug applicatif, saturation) ?
3. Quelles métriques surveiller pour détecter ça plus tôt ?
```

### Hardening sécurité

```
Tu es un expert sécurité DevSecOps.

Audit ce docker-compose.yml en chercher :
- Exposition de ports inutiles
- Volumes trop permissifs
- Variables d'environnement sensibles mal gérées
- Services tournant en root
- Images non épinglées (tag :latest)

[coller le fichier]

Pour chaque problème trouvé : niveau de criticité + fix concret.
```

### Optimisation d'une requête SQL

```
Cette requête PostgreSQL prend 3 secondes sur 2M de lignes :
[coller la requête]

Voici le EXPLAIN ANALYZE :
[coller le plan d'exécution]

Propose les optimisations par ordre de priorité :
- Index manquants
- Réécriture de la requête
- Partitioning si pertinent
```

---

## 6. Anti-patterns à éviter

| ❌ Anti-pattern | ✅ �� faire à la place |
| --- | --- |
| `"Fais un service Angular"` | Spécifier le nom, les méthodes, les dépendances |
| `"Corrige ce bug"` sans contexte | Donner le stack trace + le code + ce qu'on a déjà tenté |
| `"C'est quoi le meilleur outil ?"` | Donner le contexte et demander un comparatif structuré |
| Demander trop en une fois | Décomposer en étapes itératives |
| Accepter la première réponse | Itérer : `"Et si on devait gérer 10x plus de charge ?"` |
| `"Explique-moi Kubernetes"` | `"Explique Kubernetes à un dev backend qui n'a jamais fait de DevOps"` |

---

## 7. Template universel — Dev/DevOps

Copier-coller et adapter pour n'importe quelle tâche :

```
## Rôle
Tu es [rôle précis + niveau d'expertise].

## Contexte
- Projet : [description courte]
- Stack : [technologies + versions]
- Contrainte principale : [perf / sécurité / maintenabilité / délai]

## Tâche
[Description précise de ce que tu veux]

## Contraintes
- Ne pas : [liste des choses à éviter]
- Doit respecter : [conventions, patterns imposés]

## Format attendu
[Code seul / Code + explication / Options comparées / Décision argumentée]
```

---

## Résumé — règles d'or

- **Plus tu donnes de contexte, meilleur est le résultat** — la stack, les versions, les contraintes
- **Donne un rôle** — un "expert sécurité" ne répond pas comme un "dev junior"
- **Dis ce que tu ne veux PAS** — les contraintes négatives sont souvent plus efficaces que les positives
- **Itère** — commence simple, affine à chaque tour
- **Demande du raisonnement** — `"Explique ton choix"` ou `"Quelles alternatives as-tu écartées ?"` révèle les failles
- **Challenge la réponse** — `"Et si cette approche ne scale pas ?"` ou `"Y a-t-il un edge case que tu n'as pas traité ?"`
