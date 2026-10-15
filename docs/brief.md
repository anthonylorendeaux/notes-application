# Brief — mes-notes

## Objectif
Une application web simple de prise de notes en Markdown, dont les notes sont stockées dans un repo GitHub (fonctionnement proche d'Obsidian), utilisable autant sur téléphone que sur ordinateur.

Principe directeur : **rester simple et facile à maintenir**. Pas d'usine à gaz : on n'ajoute un outil, une dépendance ou une couche que lorsqu'un besoin réel apparaît.

## Utilisateurs
- **Aujourd'hui** : moi seul.
- **Plus tard (envisagé)** : une bêta sur invitation (connexion GitHub, liste de comptes autorisés), puis éventuellement chaque utilisateur avec son propre repo.

## Stack
- Nuxt 4 + Nuxt UI, à partir du template officiel **Starter de Nuxt UI**, auquel on ajoute **Nuxt Content**. Mise en page construite avec les composants Content de Nuxt UI. Pas de Docus.
- Édition via le module **Nuxt Studio** (open source), qui commit directement sur GitHub.
- Authentification : `nuxt-auth-utils` + OAuth App GitHub (reportée, D16).
- Hébergement : Vercel (plan Hobby, usage personnel non commercial).
- Notes : fichiers Markdown dans le dossier de contenu du repo de l'app (repo privé).

## Périmètre de la v1
| Jalon | Contenu | Fini quand |
|---|---|---|
| M0 | Socle : init du template Starter, repo privé, docs (brief, décisions), CLAUDE.md, `.claude/settings.json`, `.mcp.json`, projet Vercel avec Standard Protection | Une preview Vercel est inaccessible depuis une fenêtre privée |
| M1 | Ajout de Nuxt Content, mise en page minimale (navigation entre notes, affichage d'une note), identité (titre, description, liens) | Une note de test s'affiche avec la navigation, sur ordinateur et sur téléphone |
| M2 | Structure des notes, support des notes sans frontmatter | Une note sans frontmatter s'affiche avec un titre correct |
| M3 | Interface orientée notes, confort mobile, accès à l'édition | Lire une note sur téléphone est agréable |
| M4 | Reporté (D16). Verrouillage de l'accès (OAuth GitHub, liste d'IDs, middleware serveur, pré-rendu et endpoints protégés) | Depuis une fenêtre privée, rien n'est lisible sans connexion ; un autre compte GitHub est refusé |
| M5 | Validation de la production (le projet Vercel existe dès M0), variables d'environnement côté Vercel (dont `STUDIO_GITHUB_MODERATORS`) | En production, un autre compte GitHub ne peut pas ouvrir Studio |
| M6 | Édition avec Nuxt Studio | Une modification depuis le téléphone crée un commit propre (diff limité au changement) et le site est à jour quelques minutes après |

## Hors périmètre de la v1
- Recherche avancée, liens entre notes (`[[...]]`), syntaxe spécifique Obsidian
- Assistant IA et RAG
- Multi-utilisateurs, un repo par utilisateur
- Base de données
- Tests end-to-end, i18n, design system maison

## Après la v1 (roadmap indicative)
1. **Assistant IA simple** : interroger les notes avec un modèle via Vercel AI SDK (recherche + LLM), derrière la même authentification.
2. **RAG** : découpage des notes par titres, embeddings calculés au build, recherche par similarité, réponse avec citation des notes. Stockage en fichier JSON au départ, Postgres + pgvector si le volume grandit.
3. **Bêta sur invitation** : élargir la liste d'IDs GitHub autorisés.
4. **Un repo par utilisateur** : nécessitera une couche maison (GitHub App + routes serveur vers l'API GitHub), car Nuxt Content et Studio sont pensés pour un seul repo fixé au build.

## Contraintes
- Usage autant mobile que desktop : chaque jalon se vérifie sur téléphone.
- Vercel Hobby : usage personnel, non commercial.
- Lecture publique (D16) : aucune note privée ou sensible dans le repo tant que M4 n'est pas fait.
- Envoyer des notes à un fournisseur d'IA est un choix explicite, jamais un effet de bord.

## Points à vérifier tôt
- Nuxt Content accepte-t-il des notes sans frontmatter, et quel titre leur donne-t-il ? (M2) → Oui. Par défaut : titre du frontmatter, sinon nom de fichier en pascalCase (« Ted talk » → « Ted Talk »), le H1 de tête restant dans le corps. Le hook de `nuxt.config.ts` a été retiré le 2026-10-14 : comportement standard conservé (D13 révisée). Contenu normalisé le 2026-10-15 : chaque note porte `title` dans son frontmatter, H1 de tête retiré quand il dupliquait le titre.
- Quelles pages sont pré-générées au build, et comment les protéger sur Vercel ? (M4)
- Quelles routes Nuxt Content et Studio ajoutent-ils (API, téléchargement de la base de contenu, `/_studio`), et comment les protéger sans casser Studio ? (M4)
- Nuxt Content pré-rend `/__nuxt_content/<collection>/sql_dump.txt` (toute la base, servie en statique par Vercel sans passer par le middleware) et expose `POST /__nuxt_content/<collection>/query`. Le module force `prerender: true` sur le dump (option `private` interne, non utilisable) : désactiver ce pré-rendu via un hook et protéger `/__nuxt_content/**` côté serveur (401 sans session valide). Vérifier en fenêtre privée en production. (M4)
- La recherche (M3, `UContentSearch`) n'ajoute pas de route : ses sections sont chargées côté client via le même `POST /__nuxt_content/notes/query`. Le protéger en M4 couvre donc aussi la recherche.
- L'éditeur de Studio est-il confortable sur mobile ? Reformate-t-il le Markdown ? (M6)
- Routes ajoutées par Nuxt Studio (1.7.0) : `/_studio`, `/__nuxt_studio/**` (auth, session, meta, médias, ipx, IA) et `/sw.js`. À protéger en M4 sans casser la connexion de Studio. Accès à l'éditeur limité par `STUDIO_GITHUB_MODERATORS` (e-mails GitHub principaux) ; sans elle, tout compte GitHub peut ouvrir l'éditeur. Publier exige de toute façon le droit d'écriture sur le repo. L'IA de Studio reste désactivée tant qu'aucune clé (`AI_GATEWAY_API_KEY`) n'est fournie.
