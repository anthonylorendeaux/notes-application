---
title: Metasploit - n°1
category: Archive
tags: cyber
created: 2026-01-01T23:23:00.000Z
---

# Metasploit - n°1

# Scan


# Exploits

## NVT: Microsoft Windows SMB Server Multiple Vulnerabilities-Remote

### Explication de la faille

La faille NVT: Microsoft Windows SMB Server Multiple Vulnerabilities-Remote concerne les versions de Microsoft Windows qui utilisent le protocole SMB (Server Message Block). Cette faille permet à un attaquant de prendre le contrôle à distance d'un ordinateur exécutant une version vulnérable de Windows.

Plus précisément, il y a plusieurs vulnérabilités dans le protocole SMB qui peuvent être exploitées par un attaquant. L'une d'elles concerne un problème de gestion de mémoire qui peut être utilisé pour exécuter du code à distance sur un ordinateur cible. Une autre vulnérabilité concerne la façon dont le protocole SMB traite certains paquets de données, ce qui peut être exploité pour déclencher une fuite de mémoire et exécuter du code à distance.

### Scan


### Exploit


### Correction

Pour éviter d'être exposé à cette faille, il est recommandé de mettre à jour Windows avec les correctifs de sécurité publiés par Microsoft. Il est également recommandé de suivre les bonnes pratiques de sécurité, telles que l'utilisation de pare-feu et de logiciels antivirus à jour, et de ne pas exécuter de logiciels de sources douteuses.

## NVT: FTP Brute Force Logins Reporting

### Explication de la faille

La faille NVT: FTP Brute Force Logins Reporting concerne le protocole FTP (File Transfer Protocol). FTP est un protocole de transfert de fichiers couramment utilisé pour transférer des fichiers entre ordinateurs sur un réseau.

La faille en question concerne la possibilité pour un attaquant de réaliser une attaque de brute force sur un serveur FTP en essayant de deviner les identifiants de connexion (nom d'utilisateur et mot de passe) en utilisant une série de combinaisons possibles. Cette attaque peut être réalisée en envoyant un grand nombre de requêtes de connexion au serveur FTP avec des combinaisons différentes de noms d'utilisateur et de mots de passe.

### Exploit


### Correction

Pour éviter d'être exposé à cette faille, il est recommandé de configurer le serveur FTP de manière à limiter le nombre de tentatives de connexion autorisées à partir d'une adresse IP donnée. Il est également recommandé d'utiliser des mots de passe forts et de changer régulièrement les mots de passe des comptes d'administration. Enfin, il est conseillers de mettre en place un pare-feu et de configurer les règles de filtrage pour bloquer les connexions non autorisées au serveur FTP.

## NVT: Java JMX Insecure Configuration Vulnerability

### Explication de la faille

La faille NVT: Java JMX Insecure Configuration Vulnerability concernant le protocole JMX (Java Management Extensions) utilisé dans les applications Java. JMX est un protocole de gestion de l'infrastructure utilisé pour gérer et surveiller les applications Java.

La faille en question concerne la possibilité pour un attaquant de se connecter à une application Java via JMX en utilisant des paramètres de configuration non sécurisés. Si les paramètres de configuration JMX de l'application sont mal configurés, un attaquant peut se connecter à l'application et exécuter du code à distance, ce qui peut entraî ner la compromission de l'application ou du système hôte.

### Exploit


### Correction

Pour éviter d'être exposé à cette faille, il est recommandé de configurer les paramètres de configuration JMX de manière à limiter l'accès à l'application uniquement aux utilisateurs autorisés. Il est également recommandé de mettre en place des mesures de sécurité supplémentaires, telles que l'authentification forte et l'utilisation de pare-feu, pour protéger l'accès à l'application. Enfin, il est conseiller de mettre à jour régulièrement l'application Java et de suivre les bonnes pratiques de sécurité recommandées par le développeur de l'application.

## NVT: Elasticsearch < 1.6.1 Multiple Vulnerabilities

### Explication de la faille

La faille de code d'exécution Elastic Search vous permet d'exécuter du code sur un serveur Elastic Search vulnérable en envoyant une requête malicieuse à l'API REST d'Elastic Search. Cette faille a été découverte en 2014 et a été corrigée dans la version 1.3 de Elastic Search. Pour être vulnérable, un serveur Elastic Search doit avoir le script de langage de pain d'épice (Groovy) activé et doit être accessible à partir d'internet. Si ces conditions sont remplies, il est possible d'envoyer une requête contiennent du code Groovy dans un paramètre de script et d'exécuter ce code à distance sur le serveur Elastic Search.

### Exploit


### Correction

Il est recommandé de mettre à jour Elastic Search vers la dernière version pour éviter d'être vulnérable à cette faille. Si vous n'avez pas besoin du script de langage de pain d'épice (Groovy) sur votre serveur Elastic Search, il est également recommandé de le désactiver pour réduire les risques de compromission de votre serveur.

## NVT: MS15-034 HTTP.sys Remote Code Execution Vulnerability

### Explication

IIS (Internet Information Services) est un logiciel serveur web développé par Microsoft qui est souvent utilisé pour héberger des sites et des applications web. Une attaque par déni de service (DoS) est une tentative de rendre un site web ou une application web indisponible en le submergeant de trafic provenant de sources multiples. Cela peut se faire par différents moyens, comme l'envoi d'un grand nombre de requêtes au serveur dans un court laps de temps, ou l'envoi de requêtes mal formées ou invalides que le serveur n'est pas en mesure de traiter.

Dans le cas d'un serveur IIS, une ataque DoS peut potentiellement provoquer une panne du serveur ou le rendre inactif, ce qui l'empêche de répondre aux demandes des utilisateurs légitimes. Les attaques DoS sont généralement menées à des fins malveillantes, comme une forme de vandalisme ou pour perturber le fonctionnement d'une entreprise.

### Exploit


### Correction

Pour se protéger contre les attaques DoS, il est important de mettre en place des mesures de sécurité solides, telles que des pare-feu, des systèmes de détection des intrusions et un équilibrage de la charge. Il est également important de maintenir le logiciel IIS et tout autre logiciel fonctionnant sur le serveur à jour avec les derniers correctifs de sécurité.