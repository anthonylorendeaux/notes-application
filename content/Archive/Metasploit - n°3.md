---
title: Metasploit - n°3
category: Archive
tags: cyber
created: 2026-01-01T23:24:00.000Z
---

## Scan

### Openvas

### nmap


### Port 80 : Test HTTP dangerous methods

Cette faille correspond à des serveurs web mal configurés permettant à des clients distants d'exécuter des méthodes HTTP dangereuses telles que PUT et DELETE.

Nous pouvons donc uploader les fichiers via la méthode PUT sur ce serveur web mais aussi supprimer des fichiers avec la méthode DELETE et ce via le port 80 et le protocole HTTP.

Maintenant que l'on sait que l'on peut uploader dans ce répertoire ci-dessous grâce au report de GreenBound :

`http://10.0.2.6/uploads/puttest465458032.html`

Nous allons uploader un script reverse shell PHP Meterpreter au serveur web et l'exécuter.

Pour commencer créons notre payload avec msfvenom :


On sait qu'avec Metasploit on peut utiliser le module auxiliaire HTTP PUT pour uploader un fichier dans le répertoire web uploads. Dans les étapes suivantes, nous allons télécharger le script reverse shell PHP Meterpreter que nous avons créé plus tôt et intercepter le reverse shell Meterpreter avec le module multi handler.


La commande show options ci-dessus, nous permet de voir chaque paramètres et leurs valeurs assignées.

La suite de la méthode et le lancer l'exploit et d'uploader le fichier. Le fichier est uploadé mais lorsque nous vérifions le répertoire des téléchargements sur le serveur, nous pouvons voir que le téléchargement du fichier a bien eu lieu :


La suite de la méthode et le lancer l'exploit et d'uploader le fichier. Le fichier est uploadé mais lorsque nous vérifions le répertoire des téléchargements sur le serveur, nous pouvons voir que le téléchargement du fichier a bien eu lieu :

Ensuite on va setup un listener dans metasploit pour qu'il intercepte le reverse shell.


En lançant le script du côté du webserver, on obtient l'accès au shell du serveur et par la suite obtenir des infos sur le serveur metasploitable3.

### Port 22 : SSH Brute Force Login With Default Credentials

Dans cette faille, l'outil Hydra sera utilisé pour une attaque par force brute afin d'exploiter le service d'authentification à distance SSH. Une liste de mots sera utilisée pour le nom d'utilisateur et le mot de passe séparément.

Le pirate peut profiter de plusieurs comptes d'utilisateurs qui ont des mots de passe faibles, et s'ils sont craqués par Brute Force, l'utilisateur malveillant ou le pirate peut exécuter un code à distance en utilisant SSH.

1. Tout d'abord, une liste de mots est choisie. Dans cette recette, la wordlistTest.txt sera utilisée. Mais les listes de mots ne contiennent pas le nom d'utilisateur de l'administrateur qui utilise SSH sur le port 22. La wordlist username.txt contient le username du compte.
2. Ensuite, la commande :


1. Le Brute Force peut prendre longtemps mais grâce au paramètre -f, il s'arrête lorsqu'il a match les credentials.


Le mot de passe du compte Administrateur est obtenu, et en obtenant ce mot de passe, n'importe quelle personne mal intentionnée peut faire n'importe quoi sur le système. Une personne mal intentionnée peut faire n'importe quoi sur le système.

### Port 23 : ProFTPD 1.3.5 "mod_copy"

ProFTPD est sujet à une vulnérabilité de copies de fichiers non authentifiée. La cible s'est avérée être vulnérable.

Dans certaines circonstances, cela pourrait entraîner une exécution de code à distance.


En regardant les exploits disponibles, l'exploit mod_copy est toujours valable. La proftpd_113_c_backdoor est une vulnérabilité qui existe dans les versions du logiciel serveur FTP ProFTPD antérieures à 1.3.5c. Elle permet à un attaquant d'exécuter du code arbitraire à distance sur un système vulnérable en envoyant une commande FTP spécialement conçue.


Après configuration des options, on lance l'exploit :


On s'aperçoit que l'exploit a bien fonctionné puisque cela a permis d'obtenir un accès distant en tant qu'utilisateur www-data.

Pour conclure, il est important de mettre à jour vers une version de ProFTPD qui n'est pas affectée par cette vulnérabilité afin de sécuriser votre système.

### Exploit SQL Injection et Brute Force (payroll_app)

On peut voir grâce au scan openvas que l'application `payroll_app` pourrait être susceptible de subir une injection SQL donc nous avons testé d'ajouter la chaîne `' OR 1=1#` pour consulter la liste des utilisateurs.


Comme nous pouvons le voir si-dessous, l'injection a marché et nous pouvons consulter la liste des utilisateurs.


Malgré la consultation de la liste des utilisateurs, on peut se rendre compte que l'injection n'est pas forcément la plus adapté si nous voulons prendre le contrôle de la machine. Pour cela nous pouvons essayer de brute force phpmyadmin, pour avoir un accès complet à la db.


Nous nous rendons compte que le mot de passe est sploitme, ce qui nous permet de consulter la base de donnée et de consulter les comptes utilisateurs.


Avec les comptes de ces utilisateurs nous pouvons tester les accès à la machine avec des utilisateurs et mot de passes.


Come nous pouvons le voir ici, le compte leia_organa peut accéder à une console en ssh.