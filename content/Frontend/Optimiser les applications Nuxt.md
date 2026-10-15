---
title: Optimiser les applications Nuxt pour les Core Web Vitals
category: Frontend
tags: [fiche]
created: 2025-09-11
---

Tags: Fiche
Created Date: September 11, 2025

## Introduction

Les Core Web Vitals (CWV) de Google mesurent l'expérience utilisateur réelle et impactent le référencement et les conversions. Nuxt offre des outils puissants pour optimiser ces métriques : Largest Contentful Paint (LCP), Interaction to Next Paint (INP) et Cumulative Layout Shift (CLS).

---

## 1. Qu'est-ce que les Core Web Vitals ?

- **LCP** : Temps de chargement du contenu principal (cible : < 2,5 s).
- **INP** : Temps de réponse aux interactions (cible : < 200 ms).
- **CLS** : Stabilité visuelle (cible : < 0,1).

---

## 2. Bonnes pratiques pour Nuxt

### Optimisation des images

- Utiliser [`@nuxt/image`](https://image.nuxtjs.org/) pour la compression automatique, le format WebP/AVIF, le lazy loading et la définition des dimensions (`width`, `height`) pour éviter le CLS.
- Exemple :
    
    ```html
    <NuxtImg src="/hero.jpg" format="webp" loading="lazy" fetchpriority="high"/>
    ```

### Génération de site statique (SSG)

- Pour les pages marketing, activer la génération statique :
    
    ```jsx
    export default defineNuxtConfig({
      nitro: { preset: 'vercel' },
      ssr: true,
      target: 'static',
    })
    ```

### Chargement paresseux et hydratation intelligente

- Charger les composants lourds de manière asynchrone :
    
    ```jsx
    const LazyChart = defineAsyncComponent(() => import('@/components/Chart.vue'))
    ```
- Stratégies d'hydratation : `hydrate-on-visible`, `hydrate-on-idle`, etc.

### Prévention du CLS

- Toujours définir `width` et `height` pour les images.
- Utiliser Tailwind pour les ratios d'aspect.

### Optimisation des polices

- Utiliser [`@nuxt/fonts`](https://github.com/nuxt/fonts) pour auto-héberger et précharger les polices.

### Gestion des scripts tiers

- Charger les scripts tiers de manière asynchrone ou différée avec [`@nuxt/scripts`](https://github.com/nuxt/scripts).
- Exemple :
    
    ```jsx
    scripts: {
      defer: [{ src: 'https://example.com/analytics.js' }]
    }
    ```

### Réduction du JavaScript

- Analyser le bundle avec `nuxt build --analyze`.
- Importer uniquement les dépendances nécessaires.

### Prefetch et Preconnect

- Pré-charger les liens et ressources critiques :
    
    ```html
    <NuxtLink to="/about" prefetch>À propos</NuxtLink>
    ```

---

## 3. Mesure et itération

- Utiliser Lighthouse, PageSpeed Insights et WebPageTest pour suivre les performances.

---

## 4. Ressources supplémentaires

- [VueSchool](https://vueschool.io/courses?friend=baroshem)
- [Certificates.dev](http://certificates.dev/)

---

#Nuxt #CoreWebVitals #Performance #Optimisation