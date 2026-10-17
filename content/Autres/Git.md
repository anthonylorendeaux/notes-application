---
title: Git
category: Autres
tags: [Fiche]
---

## Commandes

### Pour commencer

`git init`

ou

`git clone url`

### Configuration

```bash
git config --global color.ui true
git config --global push.default current
git config --global core.editor vim
git config --global user.name "John Doe"
git config --global user.email foo@citrix.com
git config --global diff.tool meld
```

### Travailler avec une branche locale

### Création de branches

```bash
# Voir la liste de toutes les branches locales
git branch
# Passer à une branche locale existante
git checkout nom_de_branche
# Passer à une nouvelle branche à partir de la branche actuelle, nommée nouveau-nom-de-branche
git checkout -b nouveau-nom-de-branche
# Fusionner la branche nom-de-branche dans la branche actuelle
git merge nom_de_branche
# Fusionner une branche sans avancement rapide. C'est ce que font les demandes de tirage.
# Cela permet de conserver l'historique des modifications par rapport à cette branche.
# C'est une fonctionnalité avancée, mais essayez-la avec une interface graphique pour voir la différence
# entre la fusion régulière et la fusion--no-ff
git merge --no-ff nom_de_branche
# Supprimer en douceur une branche, affiche un avertissement si la branche n'est pas fusionnée
git branch -d nom_de_branche
# Supprimer définitivement une branche, sans avertissement. Comme rm -rf en bash
git branch -D nom_de_branche
```

### Mise à jour de la branche actuelle

**Flux standard**

```bash
# Voir tous les commits
git log
# Vue des commits détaillée, personnalisable à volonté.
# Il suffit de rechercher sur internet :)
git log --pretty=format:"%h %s" --graph
# Voir ce sur quoi vous avez travaillé la semaine dernière
git log --author='Alex' --after={1.week.ago} --pretty=oneline --abbrev-commit
# Voir uniquement les modifications apportées à cette branche (en supposant qu'elle a été créée à partir de la branche principale)
git log --no-merges master..
# Voir l'état de votre branche git actuelle.
# Souvent, cela donnera des conseils sur la commande à exécuter
git status
# Vue abrégée de l'état. Utile pour voir les choses en un coup d'œil
git status -s
# Ajouter un fichier modifié pour le valider (c'est-à-dire mettre en scène le fichier)
git add nom_de_fichier
# Ajouter tous les fichiers modifiés pour les valider (c'est-à-dire mettre en scène tous les fichiers)
git add .
# Ajouter uniquement les fichiers texte, etc.
git add '*.txt'
# Indiquer à git de ne plus suivre un fichier
git rm nom_de_fichier
# Enregistrer les modifications dans git. L'éditeur par défaut s'ouvrira pour le message de validation.
# (Visible via git log)
# Une fois les fichiers validés, ils font partie de l'historique.
git commit
# Une façon courte de valider les fichiers et d'écrire un message de validation en une seule commande
git commit -m 'Un message de validation quelconque'
# Modifier l'historique :) Si vous souhaitez modifier votre validation précédente,
# vous pouvez le faire tant que vous ne l'avez pas encore poussée vers un dépôt distant.
# Il suffit d'apporter de nouvelles modifications, de les ajouter via git add, puis d'exécuter la commande suivante.
# La validation précédente sera modifiée.
git commit --amend
```

**Avancé**

```bash
# Annuler les modifications en attente, les modifications resteront sur le système de fichiers
git reset
# Annuler les modifications en attente et réinitialiser les fichiers à l'état précédant la validation.
git reset --hard HEAD
# Revenir à un moment précis de l'historique, sur la branche actuelle
git reset balise
git reset <identifiant-du-commit>
# Enregistrer les modifications actuelles sans avoir à les valider dans le référentiel
git stash
# Et plus tard, réappliquer ces modifications
git stash pop
# Revenir à la version précédente d'un fichier, s'il n'a pas encore été mis en scène.
# Sinon, utilisez
git reset nom_de_fichier ou git reset --hard nom_de_fichier
git checkout nom_de_fichier
```

**Comparaison des modifications**

```bash
# Voir les modifications en attente, qui n'ont pas encore été mises en scène.
# Bonne chose à vérifier avant d'exécuter
git diff
# Voir les modifications en attente, qui n'ont pas encore été validées (y compris les modifications en attente)
git diff HEAD
# Comparer la branche actuelle à une autre branche
git diff nom_de_branche
# Identique à diff, mais ouvre les modifications via l'outil de différenciation que vous avez configuré
# -d indique de l'ouvrir en mode répertoire, au lieu d'ouvrir
# chaque fichier un par un.
git difftool -d
# Voir uniquement les modifications apportées à la branche actuelle (comparées à la branche principale)
# Utile lorsque vous travaillez sur une branche autonome pendant un certain temps
git difftool -d master..
# Voir uniquement les noms de fichiers modifiés dans la branche actuelle
git diff --no-commit-id --name-only --no-merges origin/master...
# Semblable à ce qui précède, mais affiche des statistiques sur les fichiers modifiés et comment ils l'ont été
git diff --stat
```

### Travailler avec une branche distante

```bash
# Voir la liste des dépôts distants disponibles. Si vous avez effectué un git clone,
# vous en aurez au moins un nommé "origin"
git remote
# Vue détaillée des dépôts distants, avec leurs URL git
git remote -v
# Ajouter un nouveau dépôt distant. Par exemple, origin s'il n'est pas encore configuré
git remote add origin <https://une-url-de-dépôt-git>
# Pousser la branche actuelle vers une branche distante (généralement avec le même nom)
# appelée branche en amont
git push
# Si une branche distante n'est pas configurée comme en amont, vous pouvez le faire
# Le -u dit à Git de se souvenir des paramètres
git push -u origin master
# Sinon, vous pouvez spécifier manuellement le dépôt distant et la branche à utiliser à chaque fois
git push origin nom_de_branche
# Tout comme la poussée, vous pouvez obtenir les dernières mises à jour depuis un dépôt distant.
# Par défaut, Git tentera de tirer depuis "origin" et la branche en amont
git pull
# Ou vous pouvez dire à git de tirer une branche spécifique
git pull origin nom_de_branche
# Git pull est en réalité un raccourci pour deux commandes.
# Demander à git d'abord de récupérer les modifications d'une branche distante
# puis de les fusionner dans la branche actuelle
git fetch && git merge origin/nom-de-branche-distant
# Si vous souhaitez mettre à jour l'historique des branches distantes, vous pouvez les récupérer et les purger
git fetch -p
# Pour voir la liste des branches distantes
# -a signifie toutes
git branch -a
```
