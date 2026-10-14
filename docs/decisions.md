# Décisions — mes-notes

Une ligne par décision importante : quoi, pourquoi, et ce qui la remettrait en cause.

## Décisions actives

**D1 — Partir du template Starter de Nuxt UI + `@nuxt/content`, sans Docus** (2026-10-12, remplace la version du 2026-10-08 qui partait du template Docs)
Surface exposée nulle au départ : rien à retirer ni à neutraliser (pas de llms.txt, de serveur MCP ni de contenu d'exemple). Tout le code appartient au projet et la mise en page est construite directement pour des notes, avec les composants Content de Nuxt UI.
*À revoir si* la mise en page demande plus de deux jalons de travail.

**D2 — Édition via le module Nuxt Studio** (2026-10-08)
Open source, gère la publication par commit GitHub et la détection de conflits. Évite d'écrire une couche API GitHub pour la v1.
*À revoir si* l'édition mobile est inconfortable ou si le Markdown est reformaté.

**D3 — Notes dans le dossier de contenu du repo de l'app, repo privé** (2026-10-08)
Un seul repo, le plus simple pour Nuxt Content et Studio.

**D4 — Accès limité par OAuth GitHub + liste d'IDs numériques** (2026-10-08)
`nuxt-auth-utils`, variable `ALLOWED_GITHUB_IDS`, vérification côté serveur sur toutes les routes. IDs numériques plutôt que pseudos (un pseudo peut changer).
*Suspendue par D16 (2026-10-12).*

**D5 — Aucun contenu lisible sans session** (2026-10-08)
Inclut les pages pré-générées (servies par Vercel sans passer par le middleware) et les endpoints qui exposent le contenu. Le pré-rendu est désactivé ou le contenu protégé autrement.
Ajout du 2026-10-12 : aucune vraie note dans le repo tant que M4 n'est pas validé en production. Jusque-là, uniquement des notes de test, et un contrôle en fenêtre privée à chaque jalon. Raison : le premier merge sur `main` publie le site sur le domaine de production, que la protection Vercel ne couvre pas.
*Suspendue par D16 (2026-10-12).*

**D6 — Hébergement Vercel Hobby** (2026-10-08)
Suffisant pour un usage personnel non commercial.
Ajout du 2026-10-12 : projet Vercel créé dès M0, avec Vercel Authentication en Standard Protection. Cela protège les previews et les URL de déploiement générées, mais pas le domaine de production : ce dernier n'est protégé que par M4.
*À revoir si* usage commercial ou ouverture large.

**D7 — Outillage Claude Code minimal** (2026-10-08)
CLAUDE.md court, `.claude/settings.json` (modèle + permissions), serveurs MCP officiels Nuxt et Nuxt UI dans `.mcp.json`. Pas de skills, plugins ni agents pour l'instant : un outil s'ajoute seulement quand un problème réel le justifie.

**D8 — Workflow** (2026-10-08)
Une issue GitHub par jalon, mode plan d'abord, une branche et une PR par jalon, vérification sur la prévisualisation Vercel (mobile compris), `/clear` entre deux jalons. Relecture sécurité de M4 dans une session séparée.

**D9 — Pilotage** (2026-10-08)
Projet Claude (claude.ai) pour réfléchir et relire les plans ; Claude Code pour exécuter. Le repo fait foi : les docs du projet Claude sont des copies à recharger quand elles changent.

**D10 — IA et RAG après la v1** (2026-10-08)
D'abord un assistant simple, puis un RAG maison (embeddings au build, JSON puis pgvector). Envoyer des notes à un fournisseur d'IA reste un choix explicite.

**D11 — pnpm 12 imposé par le template** (2026-10-12)
On garde le `packageManager: pnpm@12.11.2` du Starter plutôt que de le rabaisser, pour suivre le template et que Vercel utilise la même version.
*À revoir si* Vercel ne supporte pas cette version.

**D12 — Connecteur SQLite natif pour Nuxt Content** (2026-10-12)
`experimental.sqliteConnector: 'native'` (`node:sqlite`) plutôt que `better-sqlite3`, pour éviter une dépendance native à compiler.
*À revoir si* Vercel ou Nuxt Content cassent ce mode expérimental.

**D13 — Titres standard de Nuxt Content, sans hook** (2026-10-14, remplace la version du 2026-10-12)
Plus de hook `content:file:afterParse` : rien n'est muté au parse. Le titre vient du frontmatter, sinon du nom de fichier en pascalCase (« Ted talk » → « Ted Talk ») ; le H1 de tête reste dans le corps ; pas de description automatique.
*À revoir si* un besoin réel de titre « nom de fichier tel quel » apparaît.

**D14 — Recherche via `UContentSearch`, sections chargées côté client uniquement** (2026-10-12)
Pas de nouvelle route : la recherche passe par le même endpoint `query` que le reste du contenu, protégé en M4. Bouton « Modifier » présent mais désactivé jusqu'à Studio (M6).
*À revoir si* le nombre de notes rend le chargement des sections trop lourd sur mobile.

**D15 — Studio (M6) avant l'authentification (M4)** (2026-10-12)
Les notes de test ne sont pas sensibles : on avance l'édition. Le site de production reste public jusqu'à M4, donc toute modification via Studio ne porte que sur des notes de test. Studio configuré avec le repo explicite (branche `main`), en français, IA désactivée (aucune clé fournie).
*À revoir* dès qu'une vraie note doit entrer dans le repo : M4 passe alors avant. Voir D16.

**D16 — M4 reporté : notes publiques en lecture** (2026-10-12)
L'édition est déjà réservée par Studio (`STUDIO_GITHUB_MODERATORS` + droit d'écriture sur le repo). La lecture est publique sur le domaine de production : pages, `sql_dump.txt` et endpoint `query` de Nuxt Content. Les previews restent protégées par Vercel. Aucune note privée ou sensible dans le repo.
*À revoir si* une note privée doit entrer dans le repo, ou avant la bêta ou l'assistant IA.

**D17 — Liens entre notes en Markdown standard** (2026-10-12)
Liens absolus vers le chemin de la page (`[Nom](/dossier/nom)`), sans syntaxe Obsidian ni composant. Renommer ou déplacer une note casse les liens vers elle.
*À revoir si* les renommages de notes cassent trop souvent les liens.

## Pistes écartées
- **Docus** : dépendance à une couche, fonctions IA et endpoints publics à neutraliser.
- **Template Docs de Nuxt UI** (écarté le 2026-10-12) : embarque `nuxt-llms` (llms.txt et llms-full.txt pré-rendus avec tout le contenu), un serveur MCP sur `/mcp` et une mise en page de documentation, à retirer ou à protéger.
- **Templates Dashboard + Editor + Chat de Nuxt UI** : plus adaptés au multi-repo, mais demandent d'écrire la couche GitHub dès la v1. À reconsidérer au moment de la bêta.
- **Nuxt Content pour le multi-repo** : configuration du repo figée au build, inadaptée à un repo par utilisateur.
