# mes-notes
App perso de notes Markdown. Nuxt 4 + Nuxt UI (template Starter) + Nuxt Content + Nuxt Studio.
Notes dans le dossier de contenu, éditées via Studio (commit sur GitHub). Déployée sur Vercel.

## Commandes
- pnpm dev / pnpm build / pnpm lint / pnpm typecheck

## Règles critiques
- IMPORTANT : aucune page ni route ne doit être lisible sans session valide,
  y compris les pages pré-générées, les routes internes de Nuxt Content et celles de Studio.
- IMPORTANT : aucun secret dans le code, les logs ou les réponses.
- IMPORTANT : uniquement des notes de test dans le dossier de contenu tant que M4 n'est pas validé en production.
- Accès limité aux IDs GitHub de ALLOWED_GITHUB_IDS, vérifié côté serveur.
- Pas de nouvelle dépendance sans accord.
- Rester simple : pas d'abstraction ni de configuration non demandée.
- Interface en français, code en anglais.

## Workflow
- Mode plan d'abord, une étape par branche et par PR.
- Lint + typecheck avant de conclure.
- En fin d'étape, proposer une ligne pour docs/decisions.md si un choix a été fait.

## Quand lire quoi
- Objectif, périmètre, jalons : docs/brief.md
- Choix déjà faits : docs/decisions.md
- Doc Nuxt et Nuxt UI : serveurs MCP nuxt et nuxt-ui
