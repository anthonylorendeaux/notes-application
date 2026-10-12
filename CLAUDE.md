# mes-notes
App perso de notes Markdown. Nuxt 4 + Nuxt UI (template Starter) + Nuxt Content + Nuxt Studio.
Notes dans le dossier de contenu, éditées via Studio (commit sur GitHub). Déployée sur Vercel.

## Commandes
- pnpm dev / pnpm build / pnpm lint / pnpm typecheck

## Règles critiques
- IMPORTANT : le site est public en lecture (D16) : aucune note privée ou sensible dans le dossier de contenu.
- IMPORTANT : aucun secret dans le code, les logs ou les réponses.
- Édition limitée par STUDIO_GITHUB_MODERATORS (Studio) et le droit d'écriture sur le repo.
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
