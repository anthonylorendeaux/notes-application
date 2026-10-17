---
title: Notes S1000D
category: Archive
tags: []
created: 2026-01-01
---

Requirements

- Media Library : cgm, xls xslx, pdf, wrl
- Module Library
- Read-only : previous data module releases
- Declare new fleet with the s1000d
- Filtres
- Sync entre CIR et Manuels (manuels doivent être notifié si changement)

## Notes

### Problèmes

- Vue de l'application en 80% - 100% sur écran de PC

## Modèle de données

```json
_id: ObjectId;key: String;revNumber: Number;operatorCode: String;fileId: String;filename: String;type: String;metadata : {    label: String;    creationDate: Date;    updatedAt: Date;}
```

## Format de la donnée

```json
<!ENTITY C.CO22 "<PARA> text </PARA>"><!ENTITY C.CO22 "<PARA><REVST><REVEND></PARA>"><!ENTITY C.CO22 "<PARA><UNLIST><UNITEM><UNITEM></UNLIST></PARA>">
```

## Maquette

Maquette d'interface CIL.

```mermaid
gantt
dateFormat  YYYY-MM-DD
title Common Information Library - Planification du projet

section Spécification
Définition des spécifications   :done, 2022-12-31, 10d
Réalisation des maquettes       :done, 2023-01-15, 10d
Rédaction des spécifications    :done, 2023-01-31, 10d
Validation des spécifications   :done, 2023-02-13, 5d
Validation des clients          :done, 2023-02-28, 5d

section 1ère itération (sprint)
Librairie Vue principale     :done, 2023-02-13, 10d
    Vue détaillée      :done, 2023-02-28, 10d
    Edition, Suppression  :done, 2023-03-10, 5d
    Recherche et filtrage  :done, 2023-03-20, 5d
    Edition avec FontoXML :done, 2023-03-30, 5d
    Edition avec Arbortext :done, 2023-04-09, 5d

Editor Vue principale     :done, 2023-04-09, 10d
    Duplication de contenu :done, 2023-04-19, 5d
    Insertion de contenu    :done, 2023-04-29, 5d

section 2ème itération
Merger Résolution de contenu :done, 2023-04-29, 10d
    Application automatique des modifications :done, 2023-05-14, 5d

section 3ème itération
Test de la solution :done, 2023-05-14, 10d

Implémentation de la solution Mise en place sur nightly           :done, 2023-05-28, 5d
    Mise en place sur les environnements de tests  :done, 2023-06-07, 5d
    Mise en place sur l'environnement Release     :done, 2023-06-21, 5d

section 4ème itération
Finalisation du projet Revue de projet  :done, 2023-07-01, 5d
    Documentation    :done, 2023-07-12, 10d
    Formation        :done, 2023-07-26, 5d
```