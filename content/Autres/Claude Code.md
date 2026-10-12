---
title: Claude Code
category: Autres
tags: Fiche
created: 2026-03-24T20:14:00.000Z
---

# Claude Code

**Claude Code** est un outil CLI (Command Line Interface) d'Anthropic qui permet d'utiliser l'IA Claude directement dans le terminal pour automatiser des tâches de développement. Il agit comme un agent de codage autonome capable de lire, modifier, créer des fichiers, exécuter des commandes et interagir avec ton projet.

---

# Installation

## Prérequis

- Node.js **18+**
- npm ou npx disponible
- Un compte Anthropic avec accès à Claude Code

## Installation globale

```bash
npm install -g @anthropic-ai/claude-code
```

## Lancement sans installation (npx)

```bash
npx @anthropic-ai/claude-code
```

## Authentification

Au premier lancement, Claude Code ouvre un navigateur pour s'authentifier via [**claude.ai**](http://claude.ai). Aucune clé API n'est nécessaire manuellement.

---

# Utilisation de base

## Démarrer une session interactive

```bash
claude
```

Cela ouvre un REPL dans le terminal où tu peux donner des instructions en langage naturel.

## Exécuter une commande directe (mode one-shot)

```bash
claude -p "Explique ce que fait ce fichier" src/app.ts
```

## Passer du contexte via stdin

```bash
cat fichier.ts | claude -p "Refactorise ce code"
```

---

# Capacités principales

## Ce que Claude Code peut faire

- **Lire et modifier** des fichiers du projet
- **Créer** de nouveaux fichiers et composants
- **Exécuter** des commandes shell (npm, git, etc.)
- **Naviguer** dans l'arborescence du projet
- **Déboguer** en lisant les logs d'erreur
- **Écrire des tests** et les exécuter
- **Faire des recherches** dans la codebase avec grep/find

## Ce qu'il ne fait pas automatiquement

- Il demande confirmation avant des actions destructives
- Il ne commit pas sans ton accord
- Il ne pousse pas sur des remotes sans permission explicite

---

# Commandes utiles dans la session interactive

| Commande | Description |
| --- | --- |
| `/help` | Affiche l'aide |
| `/clear` | Efface le contexte de la conversation |
| `/compact` | Compresse l'historique pour économiser des tokens |
| `/memory` | Affiche ou modifie la mémoire persistante |
| `/cost` | Affiche le coût estimé de la session |
| `/exit` ou `Ctrl+C` | Quitter |

---

# Fichier CLAUDE.md

Le fichier `CLAUDE.md` à la racine du projet est **automatiquement lu** par Claude Code à chaque session. Il permet de donner du contexte persistant.

## Exemple de CLAUDE.md

```markdown
# Contexte du projet

Application Angular avec une API NestJS.

## Stack
- Frontend : Angular 17, Tailwind CSS
- Backend : NestJS, MongoDB
- Tests : Jest

## Conventions
- Utiliser des composants standalone
- Préférer les signaux Angular aux observables quand possible
- Nommer les branches : feat/, fix/, chore/

## Commandes importantes
- `npm run dev` : démarrer en développement
- `npm run test` : lancer les tests
```

---

# Intégration MCP (Model Context Protocol)

Claude Code supporte les **serveurs MCP** pour étendre ses capacités avec des outils externes.

## Configuration dans ~/.claude/config.json

```json
{
  "mcpServers": {
    "nom-du-serveur": {
      "command": "npx",
      "args": ["-y", "@nom/mcp-server"]
    }
  }
}
```

## Exemples de serveurs MCP utiles

- **@modelcontextprotocol/server-filesystem** : accès fichiers étendu
- **@modelcontextprotocol/server-github** : interaction GitHub
- **@modelcontextprotocol/server-postgres** : requêtes SQL directes

---

# Bonnes pratiques

## Donner un contexte précis

Plutôt que : *"Fixe le bug"*

Préférer : *"Le composant UserList plante au chargement avec l'erreur NG0100, voici le code concerné"*

## Travailler par étapes

Décomposer les grandes tâches en sous-tâches pour garder le contrôle :

```
1. "Crée la structure du module Auth"
2. "Ajoute le service AuthService avec les méthodes login/logout"
3. "Écris les tests unitaires pour AuthService"
```

## Vérifier avant de valider

Claude Code proponera les modifications. Toujours relire avant d'accepter, surtout pour les suppressions.

## Utiliser /compact régulièrement

Sur des sessions longues, `/compact` réduit l'usage de tokens tout en gardant le contexte essentiel.

---

# Raccourcis clavier

| Raccourci | Action |
| --- | --- |
| `Ctrl+C` | Annuler l'action en cours / Quitter |
| `Ctrl+L` | Effacer l'affichage |
| `Flèche haut` | Naviguer dans l'historique |
| `Tab` | Autocomplétion des chemins de fichiers |

---

# Cas d'usage concrets

## Générer un composant Angular complet

```
claude -p "Crée un composant Angular standalone 'user-card' avec un @Input() user: User, un design avec Tailwind, et son fichier de test Jest"
```

## Déboguer une erreur

```
cat error.log | claude -p "Analyse cette erreur et propose un fix"
```

## Refactoriser un fichier

```
claude -p "Refactorise src/services/auth.service.ts pour utiliser les signaux Angular au lieu des BehaviorSubject"
```

## Générer des tests

```
claude -p "Écris les tests Jest pour tous les services dans src/app/services/"
```

---

[Documentation officielle Claude Code](https://docs.anthropic.com/en/docs/claude-code)

---

# CLAUDE.md — Programmer le comportement de l'agent

Le fichier `CLAUDE.md` est **automatiquement lu à chaque session** par Claude Code. Il te permet de briefer l'agent une fois pour toutes — contexte projet, conventions, et règles de comportement.

## Emplacement

```
mon-projet/
├── CLAUDE.md          ← lu automatiquement
├── src/
└── package.json
```

Tu peux aussi créer `~/.claude/CLAUDE.md` pour une config **globale** à tous tes projets.

---

# Working Principles

Le niveau **agent engineering** : tu programmes le comportement de l'agent, pas seulement son contexte.

```markdown
## Working Principles

### Planning
- Toute tâche ≥ 3 étapes → plan d'abord, attends mon OK.
- Si blocage → stop et replanifie.

### Code Quality
- Changements les plus petits possibles (minimal blast radius).
- Pas de workaround temporaire — trouve la vraie cause racine.

### Verification
- Jamais "c'est fait" sans avoir lancé build + lint et lu l'output.
- Montre la différence attendu vs obtenu.

### Debugging
- Bug → fix autonome, zéro aller-retour.
- Lis les logs, trace, résous, prouve que c'est vert.
```

| Principe | Sans | Avec |
| --- | --- | --- |
| Planning | Fonce directement | Plan + attente de ton OK |
| Minimal blast radius | Peut modifier 10 fichiers | Change le strict minimum |
| Verification | "C'est fait !" | Lance `npm run build` et montre l'output |
| Debugging | Te pose des questions | Lit les logs et résout seul |

---

# Skills

Un **skill** est un fichier Markdown décrivant une procédure précise. Tu le références depuis `CLAUDE.md` avec `@`.

```markdown
## Skills
- Nouveau composant Angular → @docs/skills/angular-component.md
- Nouvelle route API → @docs/skills/api-endpoint.md
- Migration DB → @docs/skills/db-migration.md
```

Exemple de `docs/skills/angular-component.md` :

```markdown
# Skill : Créer un composant Angular

1. Créer les fichiers .ts, .html, .scss dans le bon dossier
2. Le composant doit être standalone (pas de NgModule)
3. Ajouter les imports dans le parent si nécessaire
4. Créer le fichier .spec.ts avec au minimum 3 tests
5. Vérifier que le build passe après la création
```

---

# Sous-agents

Claude Code supporte le **multi-agent** : un orchestrateur peut lancer des sous-agents en parallèle.

```markdown
## Agent Strategy

For large features, spawn sub-agents:
- Agent A : backend (models + controllers)
- Agent B : frontend (components + services)
- Agent C : tests
Merge and reconcile at the end.
```

En pratique :

```
Tu : "Implémente le module de paiement Stripe"

Claude (orchestrateur) :
  → Sub-agent 1 : "Crée le StripeService côté NestJS"
  → Sub-agent 2 : "Crée le composant CheckoutForm Angular"
  → Sub-agent 3 : "Écris les tests e2e du flow de paiement"
  → Intègre les 3 résultats.
```

---

# CLAUDE.md complet de référence

```markdown
# CLAUDE.md

## Projet
Stack Angular 17 + NestJS + PostgreSQL.
Monorepo : /apps/frontend, /apps/backend, /libs/shared.

## Commandes
- `npm run dev` — tout démarrer
- `npm run test` — jest
- `npm run build` — build prod

## Working Principles

### Planning
- Toute tâche ≥ 3 étapes → plan d'abord, attends mon OK.
- Si blocage → stop et replanifie.

### Code Quality
- Minimal blast radius.
- Pas de any TypeScript.

### Verification
- Jamais "c'est fait" sans build + lint.

### Debugging
- Fix autonome, zéro aller-retour.

## Skills
- Nouveau composant Angular → @docs/skills/angular-component.md
- Nouvelle route API → @docs/skills/api-endpoint.md

## Conventions
- Commits : feat:, fix:, chore:, refactor:
- Tout service doit avoir son interface
```