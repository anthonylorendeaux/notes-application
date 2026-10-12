---
title: TD - Semaine 2
category: Archive
tags: cyber
created: 2026-01-01T23:24:00.000Z
---

# TD - Semaine 2

# Sommaire

# 1. Contexte

A présent, nous avons à notre disposition trois machines virtuelles, un Windows Server 2016, une Windows 10, et enfin un kali linux.

La première héberge un annuaire Active Directory avec un contrôleur de domaine et la seconde joue le rôle d'un pc utilisateur connecté à cette AD. Enfin, la dernière machine virtuelle est l'ordinateur qui nous servira de support à la compromission des deux autres.

Le but final est d'arriver à prendre le contrôle du profil administrateur de l'Active Directory sur la machine Windows Serveur 2016. Néanmoins pour arriver à ce résultat il faudra d'abord arriver à compromettre physiquement la machine utilisateur à l'aide d'un ISO contenant un programme malveillant sur clé USB.

# 2. Introduction

Au fil de ce document il vous sera exposé l'ensemble de nos pistes de réflexions et de nos actions nous ayant permis d'accéder au profil administrateur de l'Active Directory hébergé sur la machine virtuelle Windows Server 2016.

Nous étudierons comment nous avons compromis physiquement la machine virtuelle utilisateur Windows 10. Puis à partir de cela, sera détaillé l'ensemble du cheminement de pensées et d'actions menant à la composition de l'Active Directory.

Voir le document complet : [Livrable - Red Team PenTest](/archive/livrable-red-team-pentest)