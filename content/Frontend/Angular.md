---
title: Angular
created: 2026-01-01T23:28:00
category: Frontend
tags: [Fiche]
---

## Lazy Loading

### **Introduction**

Le **Lazy Loading** est une technique utilisée dans les applications Angular pour charger des modules uniquement lorsqu'ils sont nécessaires, plutôt que de tout charger au démarrage de l'application. Cela permet d'améliorer les performances en réduisant le temps de chargement initial et en optimisant l'utilisation des ressources.

### **Pourquoi utiliser le Lazy Loading ?**

- **Performances améliorées** : Réduit le temps de chargement initial de l'application.
- **Optimisation des ressources** : Charge uniquement les modules nécessaires, économisant ainsi la bande passante et les ressources du navigateur.
- **Meilleure expérience utilisateur** : Les utilisateurs peuvent interagir plus rapidement avec l'application.

### **Comment implémenter le Lazy Loading ?**

#### **Étape 1 : Créer un module Angular**

Créez un module Angular que vous souhaitez charger de manière paresseuse. Par exemple, un module **`FeatureModule`**.

```bash
ng generate module feature --route feature --module app.module
```

#### **Étape 2 : Configurer les routes**

Dans votre fichier **`app-routing.module.ts`**, configurez les routes pour charger le module de manière paresseuse.

```tsx
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

#### **Étape 3 : Définir les routes du module**

Dans le fichier **`feature-routing.module.ts`**, définissez les routes spécifiques au module.

```tsx
const routes: Routes = [
  {
    path: '',
    component: FeatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
```

#### **Étape 4 : Utiliser le module**

Maintenant, lorsque vous naviguez vers **`/feature`**, Angular chargera le **`FeatureModule`** de manière paresseuse.

### **Avantages du Lazy Loading**

- **Réduction de la taille initiale du bundle** : Seuls les modules nécessaires sont chargés au démarrage.
- **Amélioration de la vitesse de chargement** : Les utilisateurs accèdent plus rapidement aux fonctionnalités principales.
- **Modularité accrue** : Facilite la gestion et la maintenance des modules indépendants.

### **Conclusion**

Le Lazy Loading est une technique essentielle pour optimiser les performances des applications Angular. En chargeant les modules uniquement lorsqu'ils sont nécessaires, vous pouvez offrir une meilleure expérience utilisateur et améliorer l'efficacité de votre application.

---

[Angular](https://angular.dev/guide/routing/common-router-tasks#lazy-loading)

## **Guards dans Angular**

Les **guards** dans Angular sont des services qui permettent de contrôler l'accès aux routes de ton application. Ils sont utilisés pour implémenter des logiques de protection ou de redirection avant qu'une route ne soit activée. Voici un aperçu des types de guards et de leur utilisation :

#### **Types de Guards**

1. **CanActivate** :
    - Utilisé pour déterminer si une route peut être activée.
    - Exemple : Vérifier si un utilisateur est authentifié avant d'accéder à une page protégée.
    
    ```tsx
    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {
      constructor(private router: Router) {}
    
      canActivate(): boolean {
        if (this.isAuthenticated()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    
      isAuthenticated(): boolean {
        // Logique pour vérifier l'authentification
        return true;
      }
    }
    ```
    
2. **CanActivateChild** :
    - Similaire à **`CanActivate`**, mais appliqué aux routes enfants.
    - Permet de protéger l'accès aux sous-routes.
3. **CanDeactivate** :
    - Utilisé pour déterminer si une route peut être désactivée.
    - Utile pour empêcher la navigation si des modifications non sauvegardées sont présentes.
4. **Resolve** :
    - Permet de récupérer des données avant qu'une route ne soit activée.
    - Utile pour précharger des données nécessaires à l'affichage d'une page.
5. **CanLoad** :
    - Utilisé pour empêcher le chargement asynchrone d'un module de route.
    - Permet de protéger l'accès à des modules lazy-loaded.

#### **Utilisation des Guards**

Pour utiliser un guard, tu dois l'ajouter à la configuration de tes routes dans le fichier **`app-routing.module.ts`** :

```tsx
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // Autres routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

#### **Conclusion**

Les guards sont des outils puissants pour gérer l'accès et le flux de navigation dans une application Angular. Ils permettent de centraliser la logique de protection et de redirection, rendant ton code plus propre et maintenable.

---

[Angular](https://angular.dev/api/router/CanActivate)

## **Opérateurs RxJS**

**RxJS** (Reactive Extensions for JavaScript) est une bibliothèque pour la programmation réactive utilisant des observables, permettant de composer des opérations asynchrones et basées sur des événements. Les **opérateurs RxJS** sont des fonctions pures qui permettent de transformer, combiner, et gérer les flux de données émis par les observables. Voici un aperçu des principaux types d'opérateurs et de leur utilisation :

#### **Types d'Opérateurs**

1. **Opérateurs de Création** :
    - Utilisés pour créer de nouveaux observables.
    - Exemples : **`of`**, **`from`**, **`interval`**, **`timer`**.
    
    ```tsx
    import { of } from 'rxjs';
    
    const source$ = of(1, 2, 3);
    source$.subscribe(value => console.log(value)); // Affiche 1, 2, 3
    ```
    
2. **Opérateurs de Transformation** :
    - Transforment les valeurs émises par un observable.
    - Exemples : **`map`**, **`filter`**, **`switchMap`**.
    
    ```tsx
    import { from } from 'rxjs';
    import { map, filter } from 'rxjs/operators';
    
    from([1, 2, 3, 4, 5])
      .pipe(
        filter(x => x % 2 === 0),
        map(x => x * 2)
      )
      .subscribe(value => console.log(value)); // Affiche 4, 8
    ```
    
3. **Opérateurs de Combinaison** :
    - Combinent plusieurs observables pour produire un seul flux de données.
    - Exemples : **`merge`**, **`concat`**, **`combineLatest`**, **`forkJoin`**.
    
    ```tsx
    import { merge } from 'rxjs';
    import { interval } from 'rxjs';
    
    const timerOne$ = interval(1000);
    const timerTwo$ = interval(2000);
    
    const merged$ = merge(timerOne$, timerTwo$);
    merged$.subscribe(value => console.log(value)); // Affiche les valeurs des deux timers
    ```
    
4. **Opérateurs de Filtrage** :
    - Filtrer les émissions d'un observable.
    - Exemples : **`filter`**, **`take`**, **`skip`**, **`distinct`**.
    
    ```tsx
    import { from } from 'rxjs';
    import { filter, take } from 'rxjs/operators';
    
    from([1, 2, 3, 4, 5])
      .pipe(
        filter(x => x > 2),
        take(2)
      )
      .subscribe(value => console.log(value)); // Affiche 3, 4
    ```
    
5. **Opérateurs de Gestion d'Erreurs** :
    - Gérer les erreurs dans les flux de données.
    - Exemples : **`catchError`**, **`retry`**.
    
    ```tsx
    import { throwError, of } from 'rxjs';
    import { catchError } from 'rxjs/operators';
    
    const source$ = throwError('Erreur !');
    source$
      .pipe(
        catchError(error => of(`Erreur capturée : ${error}`))
      )
      .subscribe(value => console.log(value)); // Affiche "Erreur capturée : Erreur !"
    ```
    

#### **Utilisation des Opérateurs**

Les opérateurs sont généralement utilisés avec le **`pipe`** pour chaîner plusieurs transformations sur un observable :

```tsx
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5)
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x * 10)
  )
  .subscribe(value => console.log(value)); // Affiche 20, 40
```

#### **Conclusion**

Les opérateurs RxJS sont essentiels pour manipuler les flux de données de manière déclarative et réactive. Ils permettent de créer des applications robustes et maintenables en gérant efficacement les opérations asynchrones et basées sur des événements.

---

[RxMarbles: Interactive diagrams of Rx Observables](https://rxmarbles.com/#mergeMap)

## **NgRx : Gestion d'État pour Angular**

**NgRx** est une bibliothèque de gestion d'état pour les applications Angular, inspirée par Redux. Elle permet de gérer l'état de manière prévisible et centralisée, facilitant ainsi le développement d'applications complexes. Voici un aperçu des concepts clés et de l'utilisation de NgRx :

#### **Concepts Clés**

1. **Store** :
    - Le store est un conteneur centralisé pour l'état de l'application.
    - Il détient l'état global et permet de le lire de manière réactive.
    
    ```tsx
    import { Store } from '@ngrx/store';
    
    constructor(private store: Store<{ count: number }>) {}
    ```
    
2. **Actions** :
    - Les actions sont des objets qui décrivent un changement unique dans l'état de l'application.
    - Elles sont dispatchées vers le store pour déclencher des modifications.
    
    ```tsx
    import { createAction } from '@ngrx/store';
    
    export const increment = createAction('[Counter] Increment');
    ```
    
3. **Reducers** :
    - Les reducers sont des fonctions pures qui prennent l'état actuel et une action, et retornent un nouvel état.
    - Ils définissent comment l'état change en réponse aux actions.
    
    ```tsx
    import { createReducer, on } from '@ngrx/store';
    import { increment } from './counter.actions';
    
    export const initialState = 0;
    
    const _counterReducer = createReducer(
      initialState,
      on(increment, state => state + 1)
    );
    
    export function counterReducer(state: any, action: any) {
      return _counterReducer(state, action);
    }
    ```
    
4. **Selectors** :
    - Les selectors permettent d'extraire des morceaux spécifiques de l'état du store.
    - Ils sont utilisés pour accéder à l'état de manière efficace et réactive.
    
    ```tsx
    import { createSelector } from '@ngrx/store';
    
    export const selectCount = (state: any) => state.count;
    ```
    
5. **Effects** :
    - Les effects permettent de gérer les effets de bord, comme les appels API ou les interactions avec des services externes.
    - Ils écoutent les actions et peuvent dispatcher de nouvelles actions en réponse.
    
    ```tsx
    import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { of } from 'rxjs';
    import { map, switchMap } from 'rxjs/operators';
    import { increment } from './counter.actions';
    
    constructor(private actions$: Actions) {}
    
    loadData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(increment),
        switchMap(() =>
          of({ type: 'DATA LOADED' })
        )
      )
    );
    ```
    

#### **Utilisation de NgRx**

Pour utiliser NgRx dans une application Angular, tu dois configurer le store, les reducers, et les effects dans ton module principal :

```tsx
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './counter.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ count: counterReducer }),
    EffectsModule.forRoot([CounterEffects])
  ]
})
export class AppModule {}
```

#### **Conclusion**

NgRx offre une solution robuste pour la gestion d'état dans les applications Angular, en fournissant une architecture claire et prévisible. Elle est particulièrement utile pour les applications de grande envergure où la gestion de l'état peut devenir complexe.

---

[NgRx Docs](https://ngrx.io/docs)

### Reactive forms

Les formulaires réactifs dans Angular offrent une approche pilotée par modèle pour gérer les entrées de formulaire dont les valeurs changent au fil du temps. Cette approche est idéale pour les formulaires complexes où vous devez gérer l'état des contrôles de formulaire de manière programmatique.

### **Concepts Clés**

#### **FormControl**

- **Description** : Représente un contrôle de formulaire individuel.
- **Utilisation** : Utilisez **`FormControl`** pour créer et gérer l'état d'une entrée de formulaire unique.
- **Exemple** :
    
    ```tsx
    import { FormControl } from '@angular/forms';
    const username = new FormControl('');
    ```
    

#### **FormGroup**

- **Description** : Suit l'état de validité et la valeur d'un groupe d'instances **`FormControl`**.
- **Utilisation** : Utilisez **`FormGroup`** pour gérer plusieurs contrôles de formulaire comme une seule unité.
- **Exemple** :
    
    ```tsx
    import { FormGroup, FormControl } from '@angular/forms';
    const profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
    ```
    

#### **FormArray**

- **Description** : Suit un tableau d'instances **`FormControl`**, **`FormGroup`** ou **`FormArray`**.
- **Utilisation** : Utilisez **`FormArray`** pour gérer une liste de contrôles ou de groupes de formulaires.
- **Exemple** :
    
    ```tsx
    import { FormArray, FormControl } from '@angular/forms';
    const addresses = new FormArray([
      new FormControl(''),
      new FormControl(''),
    ]);
    ```
    

#### **FormBuilder**

- **Description** : Fournit un moyen pratique de créer des instances de **`FormControl`**, **`FormGroup`** et **`FormArray`**.
- **Utilisation** : Utilisez **`FormBuilder`** pour simplifier la création de contrôles et de groupes de formulaires.
- **Exemple** :
    
    ```tsx
    import { FormBuilder, FormGroup } from '@angular/forms';
    constructor(private fb: FormBuilder) {
      this.profileForm = this.fb.group({
        firstName: [''],
        lastName: [''],
      });
    }
    ```
    

### **Validation**

- **Validateurs intégrés** : Angular fournit des validateurs intégrés comme **`required`**, **`minlength`**, **`maxlength`**, etc.
- **Validateurs personnalisés** : Créez des validateurs personnalisés pour une logique de validation spécifique.
- **Exemple** :
    
    ```tsx
    import { Validators } from '@angular/forms';
    const username = new FormControl('', Validators.required);
    ```
    

### **Gestion de la soumission du formulaire**

- **Soumission du formulaire** : Utilisez la valeur du formulaire pour gérer la soumission du formulaire.
- **Exemple** :
    
    ```tsx
    onSubmit() {
      if (this.profileForm.valid) {
        console.log(this.profileForm.value);
      }
    }
    ```
    

### **Avantages**

- **Gestion explicite** : Fournit une gestion explicite de l'état et de la validation du formulaire.
- **Évolutivité** : Adapté aux grands formulaires complexes.
- **Testabilité** : Plus facile à tester grâce à la séparation de la logique du formulaire du modèle.

### **Cas d'utilisation**

- **Formulaires complexes** : Idéal pour les formulaires avec validation complexe et champs dynamiques.
- **Gestion de l'état** : Lorsque vous devez gérer l'état du formulaire de manière programmatique.

---

[Angular](https://angular.dev/guide/forms/reactive-forms#)

## Les Signaux

Les Signals dans Angular fournissent un moyen de gérer l'état réactif et le flux de données dans vos applications. Ils permettent de créer des variables réactives qui mettent automatiquement à jour l'interface utilisateur lorsque leurs valeurs changent.

### **Concepts Clés**

#### **Signal**

- **Description** : Représente une variable réactive qui contient une valeur et peut notifier les abonnés lorsque cette valeur change.
- **Utilisation** : Utilisez **`Signal`** pour créer des variables d'état réactives dans vos composants.
- **Exemple** :
    
    ```tsx
    import { Signal } from '@angular/core';
    const count = new Signal(0);
    ```
    

#### **Effect**

- **Description** : Un effect est une fonction qui s'exécute en réponse aux changements d'un signal.
- **Utilisation** : Utilisez **`Effect`** pour effectuer des effets secondaires, comme la mise à jour du DOM ou les appels API, lorsqu'un signal change.
- **Exemple** :
    
    ```tsx
    import { Effect } from '@angular/core';
    Effect(() => {
      console.log('Count changed:', count.value);
    });
    ```
    

#### **Computed**

- **Description** : Un signal calculé est un signal dont la valeur est dérivée d'autres signaux.
- **Utilisation** : Utilisez **`Computed`** pour créer des signaux qui dépendent d'autres signaux.
- **Exemple** :
    
    ```tsx
    import { Computed } from '@angular/core';
    const doubleCount = Computed(() => count.value * 2);
    ```
    

### **Création et Utilisation des Signals**

- **Initialisation** : Initialisez les signaux dans votre composant ou service.
- **Exemple** :
    
    ```tsx
    import { Component } from '@angular/core';
    import { Signal } from '@angular/core';
    
    @Component({
      selector: 'app-counter',
      template: `<div>{{ count.value }}</div>`
    })
    export class CounterComponent {
      count = new Signal(0);
    
      increment() {
        this.count.set(this.count.value + 1);
      }
    }
    ```
    

### **Avantages**

- **Réactivité** : Met automatiquement à jour l'interface utilisateur lorsque la valeur du signal change.
- **Simplicité** : Simplifie la gestion de l'état en réduisant le code boilerplate.
- **Performance** : Optimise les performances en minimisant les rendus inutiles.

### **Cas d'Utilisation**

- **Gestion de l'État** : Idéal pour gérer l'état au niveau des composants.
- **Gestion des Formulaires** : Utilisez les signaux pour gérer l'état et la validation des formulaires.
- **Interface Utilisateur Dynamique** : Mettez à jour les éléments de l'interface utilisateur dynamiquement en fonction des changements de signaux.

---

[Angular](https://angular.dev/guide/signals)
