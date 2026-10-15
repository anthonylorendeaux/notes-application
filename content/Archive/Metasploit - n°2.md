---
title: Metasploit - n°2
category: Archive
tags: cyber
created: 2026-01-01T23:23:00.000Z
---

# Scan

## NVT: vsftpd Compromised Source Packages Backdoor Vulnerability

### Explication de la faille

La vulnérabilité "vsftpd Compromised Source Packages Backdoor Vulnerability" concerne une backdoor qui a été découverte dans les paquets sources de vsftpd (Very Secure FTP Daemon), un serveur FTP (File Transfer Protocol) populaire. Cette porte dérobée a été introduite dans les paquets sources par un tiers malveillant, ce qui signifie que tous les utilisateurs qui ont téléchargé et installé ces paquets source compromis ont été affectés par cette vulnérabilité.

Une porte dérobée est un mécanisme qui permet à une personne non autorisée d'accéder à un système ou à un réseau sans être détectée. Dans le cas de cette vulnérabilité, la porte dérobée permettait à un attaquant de se connecter au serveur FTP en utilisant un nom d'utilisateur et un mot de passe spécifiques, ce qui leur permettait de prendre le contrôle du serveur et de l'utiliser à des fins malveillantes.

### Exploit


### Correction

Il est important de noter que cette vulnérabilité a été rapidement corrigée une fois qu'elle a été découverte, et que les utilisateurs qui ont mis à jour leur installation de vsftpd avec les paquets source corrigés n'ont pas été affectés. Si vous utilisez vsftpd, il est recommandé de vous assurer que vous avez téléchargé et installé les dernières versions corrigées pour éviter d'être affecté par cette vulnérabilité.

## NVT: Telnet Unencrypted Cleartext Login

### Explication

Telnet est un protocole de réseau qui permet à un utilisateur de se connecter à un serveur distant et d'exécuter des commandes à距离. Telnet utilise le protocole de transmission de données en clair, ce qui signifie que les informations transmises, y compris les noms d'utilisateur et les mots de passe, ne sont pas chiffrées et peuvent être lues en clair par toute personne qui peut accéder au trafic réseau.

La vulnérabilité "Telnet Unencrypted Cleartext Login" concerne le fait que Telnet utilise le protocole de transmission de données en clair pour transmettre les informations de connexion, y compris les noms d'utilisateur et les mots de passe. Cela signifie qu'un attaquant qui a accès au trafic réseau peut facilement intercepter ces informations et utiliser ces informations pour accéder au serveur distant sans autorisation.

### Scan


### Exploit

Avec ce scan, nous avons pu avoir un login et un mot de passe qui nous permettent d'accéder à la machine avec un accès root.


### Correction

Il est important de noter que Telnet est maintenant considéré comme un protocole obsolète et non sécurisé, et il est fortement recommandé de ne pas l'utiliser pour accéder à des serveurs distants. Des protocoles plus sécurisés, tels que SSH (Secure Shell), doivent être utilisés à la place.

## NVT: Samba MS-RPC Remote Shell Command Execution Vulnerability - Active Check

### Scan


### Explication

La vulnérabilité "NVT: Samba MS-RPC Remote Shell Command Execution Vulnerability" concerne une faille de sécurité dans Samba, un logiciel qui permet à un système d'exploitation de se connecter à un réseau de fichiers et d'imprimantes Windows. Cette vulnérabilité a permis à un attaquant distant de prendre le contrôle d'un système en exécutant des commandes à distance sur le système via le protocole MS-RPC (Microsoft Remote Procedure Call).

"Active Check" signifie que cette vulnérabilité peut être vérifiée de manière active, c'est-à-dire que le système peut être testé de manière proactive pour vérifier s'il est vulnérable. Il existe différentes façons de tester activement un système pour vérifier s'il est vulnérable, telles que l'utilisation d'outils de test de pénétration ou la création d'un test de vulnérabilité personnalisé.

### Exploit


### Correction

Il est important de noter que cette vulnérabilité a été corrigée dans les versions ultérieures de Samba. Si vous utilisez Samba, il est recommandé de vous assurer que vous avez téléchargé et installé la dernière version corrigée pour éviter d'être affecté par cette vulnérabilité.

## Port 1099 java-RMI

### Scan


### Explication

Le port 1099 est un port de communication réseau utilisé par le protocole RMI (Remote Method Invocation) de Java. RMI est un mécanisme de programmation Java qui permet à un programme Java d'appeler des méthodes dans un autre programme Java qui est exécuté sur un autre ordinateur. Le port 1099 est utilisé pour acheminer les communications RMI entre les programmes Java.

Il est important de noter que, comme tout port de communication réseau, le port 1099 peut être ciblé par des attaques de hackers ou de malware. Par conséquent, il est recommandé de configurer votre pare-feu de manière à bloquer l'accès non autorisé au port 1099, à moins que vous n'ayez explicitement besoin d'y accéder pour une raison précise. Si vous utilisez RMI dans votre code Java, vous devriez également suivre les bonnes pratiques de sécurité pour protéger votre système contre les attaques ciblant RMI.

### Exploit


### Correction

Pour corriger cette faille, il y a plusieurs solutions possibles. L'utilisation d'un parefeu, de mots de passe forts ou la mise à jour du logiciel par exemple.

## NVT: UnrealIRCd Backdoor

### Explication

La vulnérabilité "NVT: UnrealIRCd Backdoor" concerne une porte dérobée qui a été découverte dans UnrealIRCd, un serveur de chat Internet populaire. Cette porte dérobée a été introduite dans le code source d'UnrealIRCd par un tiers malveillant, ce qui signifie que tous les utilisateurs qui ont téléchargé et installé cette version compromise d'UnrealIRCd ont été affectés par cette vulnérabilité.

Une porte dérobée est un mécanisme qui permet à une personne non autorisée d'accéder à un système ou à un réseau sans être détectée. Dans le cas de cette vulnérabilité, la porte dérobée permettait à un attaquant de se connecter au serveur de chat en utilisant un mot de passe spécifique, ce qui leur permettait de prendre le contrôle du serveur et de l'utiliser à des fins malveillantes.

### Exploit


### Correction

Il est important de noter que cette vulnérabilité a été rapidement corrigée une fois qu'elle a été découverte, et que les utilisateurs qui ont mis à jour leur installation d'UnrealIRCd avec la version corrigée n'ont pas été affectés. Si vous utilisez UnrealIRCd, il est recommandé de vous assurer que vous avez téléchargé et installé la dernière version corrigée pour éviter d'être affecté par cette vulnérabilité.