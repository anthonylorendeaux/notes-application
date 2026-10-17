---
title: DVWA
category: Archive
tags: cyber
---

## 1. Brute Force

Le Brut Force est une forme de craquage de mot de passe qui tente de craquer le mot de passe en comparant toutes les combinaisons et permutations possibles de caractères disponibles jusqu'à ce qu'il trouve une correspondance pour le mot de passe. Il est extrêmement lent car il utilise toutes les combinaisons de caractères imaginables. On utilise habituellement des grands dictionnaires de mots pour attaquer.

Pour savoir si quelqu'un réalise un attaque brute, il faut faire attention aux tentatives de connexion au site. Dès que l'on remarque que, dans un court laps de temps, quelqu'un a tenté sans succès de se connecter au site plusieurs fois en peu de temps, c'est déjà un signal. Si une IP inconnue a essayé d'entrer sur le site plusieurs fois à partir du même compte, que quelqu'un a essayé d'entrer sur le site depuis un nouvel endroit ou bien l'IP de quelqu'un d'autre a essayé d'entrer sur le site plusieurs fois à partir de différents comptes.

Il faut identifier la requête, ici c'est une requête GET qui va nous donner les logins.

Ensuite, on utilise d'hydra ainsi qu'une d'une word-list afin de trouver les combinaisons.

`hydra -l admin -P /usr/share/dict/wordlist-probable.txt 127.0.0.1http-get-form "/vulnerabilities/brute/index.php:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect."`

Le risque étant que les comptes de nos utilisateurs soient exposés mais aussi que l'on se fasse inonder notre site à cause d'un gros trafic. Pour éviter ce genre d'attaques, c'est de bloquer les comptes après un trop nombre de tentatives de mot de passe. On peut aussi bloquer l'adresse IP après plusieurs essais qui ont raté. Ou bien enfin c'est de faire en sorte que notre site web n'utilise pas de raisonnement prédictible pour l'échec de mot de passe.

## 2. Command Injection

L'injection de commande est une attaque qui vise à injecter et à exécuter des commandes sur le système d'exploitation. Elle ne doit pas être confondue avec l'injection de code. L'attaque a des effets potentiellement dévastateurs car si un hacker peut exécuter des commandes sur le système d'exploitation, nous pouvons contrôler l'application web elle-même. Les attaques par injection de commandes sont possibles lorsqu'une application transmite des données dangereuses fournies par l'utilisateur (formulaires, cookies, en-têtes HTTP, etc.) à un shell système.

Il existe de nombreuses façons de détecter les attaques par injection de commandes. On peut examiner les paramètres de la requête et voir s'il y a des chaînes de caractères suspectes. Une autre méthode consiste à examiner le corps de la réponse et à voir s'il y a des résultats inattendus.

Si on constate que certains des paramètres de l'application ont été modifiés, cela peut signifier que quelqu'un a effectué une attaque par injection de commande.

Après avoir entré l'ip, le serveur va effectuer la commande : "ping" il est donc possible d'ajouter un "&" pour effectuer une autre commande ici un "ls".

Il faut éviter autant que possible l'utilisation des fonctions d'exécution des commandes du shell. Utilisez une API fiable pour les entrées utilisateur dans l'application, en particulier lors de l'exécution de commandes système telles que execFile(). Une vulnérabilité d'injection de commande existe lorsque l'entrée fournie par l'utilisateur n'est pas validée correctement par l'application web.

## 3. CSRF

CSRF (Cross Site Request Forgery) est une attaque qui peut être utilisée pour forcer l'utilisateur à exécuter une action non désirée. Si un utilisateur ouvre une page malveillante A, qui vise à exploiter une page B, une requête au nom d'un utilisateur peut être exécutée vers le site B.

Sans protection contre cette attaque, la falsification de requêtes peut exposer et compromettre la confidentialité et l'intégrité des données utilisateur de l'application.

Ex : Un utilisateur ouvre une URL envoyée par un attaquant, qui exploite une vulnérabilité CSRF sur le site d'une banque à laquelle l'utilisateur est connecté, et de l'argent est envoyé du compte bancaire au compte d'un criminel.

Par exemple, supposons qu'une application contient une fonction permettant à l'utilisateur de modifier l'adresse électronique de son compte. Lorsqu'un utilisateur exécute cette action, il effectue une requête HTTP comme la suivante :

```json
POST /email/change HTTP/1.1Host: vulnerable-website.comContent-Type: application/x-www-form-urlencodedContent-Length: 30Cookie: session=yvthwsztyeQkAPzeQ5gHgTvlyxHfsAfEemail=wiener@normal-user.com
```

Cela répond aux conditions requises pour le CSRF :

L'action consistant à modifier l'adresse électronique sur le compte d'un utilisateur présente un intérêt pour un attaquant. Après ça, l'attaquant sera généralement en mesure de déclencher une réinitialisation du mot de passe et de prendre le contrôle total du compte de l'utilisateur. L'application utilise un cookie de session pour identifier l'utilisateur qui a émis la demande. Il n'y a pas d'autres tokens ou cookies en place pour suivre les sessions des utilisateurs. L'attaquant peut facilement déterminer les valeurs des paramètres de la requête qui sont nécessaires pour exécuter l'action.

Pour se défendre on peut :

Utiliser un token CSRF, qui est une valeur unique, secrète et imprévisible qui est générée par l'application côté serveur et partagée avec le client. Lorsqu'il tente d'effectuer une action sensible, comme l'envoi d'un formulaire, le client doit inclure le jeton CSRF correct dans la requête. Il est ainsi très difficile pour un attaquant de construire une requête valide au nom de la victime.

Utiliser Cookies SameSite, qui est un mécanisme de sécurité du navigateur qui détermine quand les cookies d'un site web sont inclus dans des demandes provenant d'autres sites web.

## 4. File Inclusion

L'inclusion de fichiers à distance (RFI) et l'inclusion de fichiers locaux (LFI) sont des vulnérabilités que l'on trouve souvent dans des applications web mal écrites. Ces vulnérabilités se produisent lorsqu'une application web permet à l'utilisateur de soumettre des données dans des fichiers ou de télécharger des fichiers vers le serveur.

Les vulnérabilités LFI permettent à un attaquant de lire (et parfois d'exécuter) des fichiers sur la machine de la victime. Cela peut être très dangereux car si le serveur web est mal configuré et fonctionne avec des privilèges élevés, l'attaquant peut avoir accès à des informations sensibles. Si l'attaquant parvient à placer du code sur le serveur web par d'autres moyens, il peut alors être en mesure d'exécuter des commandes arbitraires.

Les vulnérabilités RFI sont plus facile à exploiter mais moins courantes. Au lieu d'accéder à un fichier sur la machine locale, l'attaquant est en mesure d'exécuter du code hébergé sur sa propre machine.

Les vulnérabilités LFI sont généralement facile à identifier et à exploiter. Tout script qui inclut un fichier provenant d'un serveur web est un bon candidat pour des tests LFI supplémentaires, par exemple :

`/script.php?page=index.html`

Ou pourrait tenter d'exploiter cette vulnérabilité en manipulant le paramètre d'emplacement du fichier, par exemple :

`/script.php?page=../../../../../../../../etc/passwd`

Ce qui précède est pour afficher le contenu du fichier `/etc/passwd` sur UNIX / Linux.

Dans le cas d'une RFI, vous pouvez charger un script ou une page externe.

## 5. File Upload

La vuln��rabilité file upload intervient lorsqu'un serveur web permet aux utilisateurs de télécharger des fichiers vers son système de fichiers sans valider suffisamment des éléments tels que leur nom, leur type, leur contenu ou leur taille. Si les restrictions ne sont pas correctement appliquées, même une simple fonction de téléchargement d'images peut être utilisée pour télécharger des fichiers. Il peut même s'agir de fichiers script côté serveur qui permettent l'exécution de code à distance.

Dans certains cas, le fait de télécharger un fichier suffit à causer des dommages. D'autres attaques peuvent impliquer une demande HTTP de suivi pour le fichier, généralement pour déclencher son exécution par le serveur.

Pour identifier un file upload cela dépend généralement de quel aspect du fichier, le site web ne parvient pas à valider correctement, qu'il s'agisse de sa taille, de son type, de son contenu, etc mais aussi les restrictions imposées au fichier une fois qu'il a été téléchargé avec succès. Dans le pire des cas, le type de fichier n'est pas validé correctement et la configuration du serveur permet à certains types de fichiers (tels que .php et .jsp) d'être exécutés en tant que code.

Dans l'exemple low de DVWA, n'importe quel fichier est accepté. Il faut donc :

- Générer un agent.
- Télécharger l'agent généré vers DVWA.
- Accéder au fichier téléchargé pour qu'il s'exécute.
- Se connecter au serveur avec un shell web.

Par défaut, Kali Linux est livré avec un reverse shell appelé weevely. La première étape consiste à générer un agent, ce qui peut être fait à partir de la ligne de commande : *weevely generate your-password legitfile.php*

Il faut maintenant accéder au fichier. On essaie d'établir une session avec le DVWA : `_weevely http://YOUR-DVWA-IP/hackable/uploads/legitfile.php your-password_`

Si tout fonctionne, on a accès.

En général, le moyen le plus efficace de protéger les sites Web contre ces vulnérabilités est de vérifier l'extension du fichier par rapport à une liste blanche d'extensions autorisées plutôt qu'une liste noire d'extensions interdites. Il est beaucoup plus facile de deviner les extensions. Il faut s'assurer que le fichier ne contient aucune sous-chaîne pouvant être interprétée comme un répertoire ou une séquence de traversal (../). Essayer de renommer les fichiers téléchargés afin d'éviter les collisions qui pourraient entraîner l'écrasement de fichiers existants mais aussi de ne pas télécharger de fichiers vers le système de fichiers permanent du serveur avant qu'ils n'aient été entièrement validés.

## 6. Insecure CAPTCHA

Le Captcha est un mécanisme de sécurité contre les bots automatisés. Afin d'empêcher les actions automatiques, les utilisateurs doivent résoudre une tâche simple. Cette tâche ne peut être résolue que par un humain et constitue généralement une excellente contre-mesure contre les Robots. Les bots ont tendance à travailler automatiquement via un programme dans lequel ils cliquent sur des boutons particuliers sans bouger la souris, contrairement à ce que font les vrais humains. Le fait de pouvoir contourner ces mécanismes de sécurité permet de réaliser des attaques automatisées.

Si le système de CAPTCHA est non sécurisé, cela permet l'utilisation d'outils de reconnaissance optique pour le passer automatiquement.

Pour vérifier si le CAPTCHA peut-être bypass, on va regarder le code source et vérifier comment l'utilisateur y accède. Dans le cas où le CAPTCHA est divisé en plusieurs étapes, cela consiste à utiliser le CAPTCHA pour vérifier si les utilisateurs remplissent les informations d'identification correctes et passent le CAPTCHA. Si c'est le cas, il leur est demandé de cliquer sur le bouton de modification, puis le serveur termine l'opération.

Ce niveau peut être facilement manipulé car le serveur ne vérifie que le bouton "Changer" et le paramètre "étape". On peut donc facilement changer la valeur du paramètre "étape" de 1 à 2 afin qu'après avoir soumis le mot de passe, les utilisateurs puissent aller directement à la deuxième page sans avoir à passer le système CAPTCHA.

C'est pour cela qu'il faut s'assurer que la réponse aux CAPTCHA se trouve au niveau des serveurs (et non pas exécuté côté client) et n'est pas exposée dans le code des pages web HTML.

## 7. SQL Injection (et bind)

L'injection SQL (SQLi) est une vulnérabilité de sécurité web qui permet à un attaquant d'interférer avec les requêtes qu'une application effectue dans sa base de données. Elle permet généralement à un attaquant de visualiser des données qu'il n'est normalement pas en mesure de récupérer. Il peut s'agir de données appartenant à d'autres utilisateurs, ou de toute autre donnée à laquelle l'application elle-même peut accéder. Dans de nombreux cas, un attaquant peut modifier ou supprimer ces données, ce qui entraîne des changements persistants dans le contenu ou le comportement de l'application.

Dans certaines situations, un attaquant peut intensifier une attaque par injection SQL afin de compromettre le serveur sous-jacent ou une autre infrastructure dorsale, ou encore réaliser une attaque par déni de service. Une attaque par injection SQL réussie peut entraîner un accès non autorisé à des données sensibles, telles que des mots de passe, des données de cartes de crédit ou des informations personnelles sur les utilisateurs.

Il existe une grande variété de vulnérabilités, d'attaques et de techniques d'injection SQL, qui se présentent dans différentes situations. On peut récupérer des données cachées, où l'on peut modifier une requête SQL pour renvoyer des résultats supplémentaires. Attaques par UNION, où l'on peut récupérer des données de différentes tables de la base de données. L'examen de la base de données, qui permet d'extraire des informations sur la version et la structure de la base de données.

L'injection SQL aveugle, qui consiste à ne pas renvoyer les résultats d'une requête que vous contrôlez dans les réponses de l'application. On peut modifier la logique de la requête pour déclencher une différence détectable dans la réponse de l'application en fonction de la véracité d'une seule condition.

Comme la tâche de la vulnérabilité par injection SQL de DVWA est d'obtenir les mots de passe des utilisateurs, cette requête retourne les mots de passe des utilisateurs existants.

`1' UNION SELECT user, password FROM users#`

La majorité des vulnérabilités d'injection SQL peuvent être trouvées rapidement et de manière fiable en utilisant le scanner de vulnérabilité web de Burp Suite. L'injection SQL peut être détectée manuellement en utilisant un ensemble systématique de tests contre chaque point d'entrée dans l'application. Le caractère ' permet la recherche d'erreurs ou d'autres anomalies par exemple.

La plupart des cas d'injection SQL peuvent être évités en utilisant des requêtes paramétrées ("prepared statements'') au lieu de concaténer des chaînes de caractères dans la requête.

## 8. Weak Session IDs

Des identifiants de session faibles peuvent exposer vos utilisateurs au détournement de leur session. Si vos identifiants de session sont choisis dans un petit éventail de valeurs, il suffit à un attaquant de sonder des identifiants de session choisis au hasard jusqu'à ce qu'il trouve une correspondance.

Vous devez vous assurer que vos identifiants de session sont impossibles à deviner, sinon votre système d'authentification peut être contourné par des scripts relativement simples. La plupart des frameworks modernes mettent en œuvre des algorithmes de génération d'identifiants de session sécurisés, ce qui constitue un bon argument pour ne pas inventer votre propre framework.

Les identifiants de session doivent être choisis dans un grand espace d'adressage (c'est-à-dire suffisamment grand pour rendre une simple énumération impossible) et être imprévisibles. Si l'algorithme de génération n'est pas aléatoire de manière sécurisée, l'attaquant peut réduire la gamme de valeurs nécessaires à une attaque par énumération.

L'attaque par prédiction de session se concentre sur la prédiction des valeurs d'ID de session qui permettent à un attaquant de contourner le schéma d'authentification d'une application. En analysant et en compréhension le processus de génération de l'ID de session, un attaquant peut prédire une valeur d'ID de session valide et obtenir l'accès à l'application.

Dans un premier temps, l'attaquant doit collecter quelques valeurs d'ID de session valides qui sont utilisées pour identifier les utilisateurs authentifiés. Ensuite, il doit comprendre la structure de l'ID de session, les informations utilisées pour le créer et l'algorithme de cryptage ou de hachage utilisé par l'application pour le protéger. Certaines mauvaises implémentations utilisent des ID de session composés du nom d'utilisateur ou d'autres informations prévisibles, comme l'horodatage ou l'adresse IP du client

En outre, l'attaquant peut mettre en œuvre une technique de force brute pour générer et tester différentes valeurs d'identifiant de session jusqu'à ce qu'il parvienne à accéder à l'application.

Les informations d'identification de session pour une certaine application sont normalement composées d'une chaîne de largeur fixe. Le caractère aléatoire est très important pour éviter sa prédiction.

Prenons un exemple, la variable ID de session est représentée par JSESSIONID et sa valeur est "user01", qui correspond au nom d'utilisateur. En essayant de lui donner de nouvelles valeurs, comme "user02", il pourrait être possible de pénétrer dans l'application sans authentification préalable.

Pour éviter ce genre d'attaques, les frameworks modernes (Built-In Session Management) mettent en œuvre des identifiants de session sûrs et indiscutables. Pour protéger vos cookies, des frameworks comme Rails et Django permettent de signer les cookies. Cela signifie que le serveur sera capable de dire si le cookie a été manipulé depuis qu'il a été envoyé au navigateur avec l'en-tête Set-Cookie. Toute indication de manipulation des données entraîne l'invalidation de la session.

## 9. XSS

Le cross-site scripting (également connu sous le nom de XSS) est une vulnérabilité de la sécurité web qui permet à un attaquant de compromettre les interactions des utilisateurs avec une application vulnérable. Les vulnérabilités de type "cross-site scripting" permettent normalement à un attaquant de se faire passer pour un utilisateur victime, d'effectuer toutes les actions que l'utilisateur est en mesure d'effectuer et d'accéder à toutes les données de l'utilisateur mais aussi que le code malveillant s'exécute dans le navigateur d'une victime, l'attaquant peut compromettre totalement son interaction avec l'application. Si l'utilisateur victime dispose d'un accès privilégié à l'application, l'attaquant peut être en mesure de prendre le contrôle total de toutes les fonctionnalités et données de l'application.

Il existe trois principaux types d'attaques XSS. Ce sont :

- XSS Reflected, où le script malveillant provient de la requête HTTP en cours.
- XSS Stored, où le script malveillant provient de la base de données du site Web.
- XSS DOM-based , où la vulnérabilité existe dans le code côté client plutôt que dans le code côté serveur.

### Cross-site scripting Reflected

Le XSS Reflected est la forme la plus simple de cross-site scripting. Il se produit lorsqu'une application reçoit des données dans une requête HTTP et les inclut dans la réponse immédiate d'une manière non sécurisée.

Voici un exemple simple de vulnérabilité XSS reflected:

`https://insecure-website.com/status?message=All+is+well.`

`<p>Status: All is well.</p>`

L'application n'effectue aucun autre traitement des données, de sorte qu'un attaquant peut facilement construire une attaque de ce type :

`https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>`

`<p>Status: <script>/* Bad stuff here... */</script></p>`

Si l'utilisateur visite l'URL construite par l'attaquant, le script de ce dernier s'exécute dans le navigateur de l'utilisateur, dans le contexte de la session de cet utilisateur avec l'application. À ce stade, le script peut effectuer toute action et récupérer toute donnée à laquelle l'utilisateur a accès.

### Cross-site scripting Stored

Le XSS Stored se produit lorsqu'une application reçoit des données d'une source non fiable et les inclut dans ses réponses HTTP ultérieures d'une manière non sûre.

Les données en question peuvent être soumises à l'application via des requêtes HTTP ; par exemple, des commentaires sur un article de blog, des pseudonymes d'utilisateurs dans un salon de discussion ou des coordonnées sur une commande client. Dans d'autres cas, les données peuvent provenir d'autres sources non fiables ; par exemple, une application de messagerie Web affichant des messages reçus par SMTP, une application de marketing affichant des messages sur les médias sociaux ou une application de surveillance du réseau affichant des données par paquets du trafic réseau.

Voici un exemple simple de vulnérabilité XSS Stored. Une application de messagerie permet aux utilisateurs de soumettre des messages, qui sont affichés aux autres utilisateurs :

`<p>Hello, this is my message!</p>`

L'application n'effectue aucun autre traitement des données, de sorte qu'un attaquant peut facilement envoyer un message qui attaque les autres utilisateurs :

`<p><script>/* Bad stuff here... */</script></p>`

L'application n'effectue aucun autre traitement des données, de sorte qu'un attaquant peut facilement envoyer un message qui attaque les autres utilisateurs.

### Cross-Site Scripting DOM-based

Le XSS DOM-based se produit lorsqu'une application contient du JavaScript côté client qui traite des données provenant d'une source non fiable d'une manière non sûre, généralement en écrivant les données dans le DOM.

Dans l'exemple suivant, une application utilise du JavaScript pour lire la valeur d'un champ de saisie et l'écrire dans un élément du HTML :

```jsx
var search = document.getElementById('search').value;
var results = document.getElementById('results');
results.innerHTML = 'You searched for: ' + search;
```

Si l'attaquant peut contrôler la valeur du champ de saisie, il peut facilement construire une valeur malveillante qui entraîne l'exécution de son propre script :

`You searched for: <img src=1 onerror='/* Bad stuff here... */'>`

Dans un cas typique, le champ de saisie serait rempli à partir d'une partie de la requête HTTP, comme un paramètre de chaîne de requête d'URL, permettant à l'attaquant de délivrer une attaque en utilisant une URL malveillante, de la même manière que le XSS réfléchi.

Un attaquant qui exploite une vulnérabilité de type cross-site scripting est généralement capable de de faire passer pour l'utilisateur victime ou se faire passer pour lui, d'effectuer toute action que l'utilisateur est capable d'exécuter ou bien injecter une fonctionnalité de cheval de Troie dans le site web.

L'impact réel d'une attaque XSS dépend généralement de la nature de l'application, de ses fonctionnalités et de ses données, ainsi que du statut de l'utilisateur compromis. Par exemple, dans une application de type brochure, où tous les utilisateurs sont anonymes et où toutes les informations sont publiques, l'impact sera souvent minime.

Dans une application contenant des données sensibles, telles que des transactions bancaires, des e-mails ou des dossiers médicaux, l'impact sera généralement grave.

Si l'utilisateur compromis dispose de privilèges élevés dans l'application, l'impact sera généralement critique, permettant à l'attaquant de prendre le contrôle total de l'application vulnérable et de compromettre tous les utilisateurs et leurs données.

En général, la prévention efficace des vulnérabilités XSS implique probablement une combinaison des mesures suivantes :

- **Filtrer les entrées à l'arrivée** :
  - Au point où l'entrée de l'utilisateur est reçue, filtrez aussi strictement que possible en fonction de ce qui est attendu ou d'une entrée valide.
- **Coder les données à la sortie** :
  - Au moment où les données contrôlables par l'utilisateur sont émises dans les réponses HTTP, coder la sortie pour éviter qu'elle soit interprétée comme un contenu actif. Selon le contexte de la sortie, il peut être nécessaire d'appliquer des combinaisons de codage HTML, URL, JavaScript et CSS.
- **Utiliser des en-têtes de réponse appropriés** :
  - Pour éviter le XSS dans les réponses HTTP qui ne sont pas censées contenir du HTML ou du JavaScript, vous pouvez utiliser les en-têtes Content-Type et X-Content-Type-Options pour vous assurer que les navigateurs interprètent les réponses comme vous le souhaitez.
- **Content Security Policy** :
  - Utiliser la politique de sécurité du contenu (CSP) pour réduire la gravité des vulnérabilités XSS qui se produisent encore.