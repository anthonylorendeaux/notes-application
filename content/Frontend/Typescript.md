---
title: TypeScript
created: 2026-01-01T23:28:00
category: Frontend
tags: [Fiche]
---

## Introduction

TypeScript est un langage de programmation open-source développé par Microsoft. Il s'agit d'une surcouche de typage statique pour JavaScript, ce qui signifie qu'il ajoute des fonctionnalités de typage avancées au JavaScript traditionnel. TypeScript vise à améliorer le développement d'applications JavaScript en ajoutant des vérifications de type statique lors de la compilation, ce qui permet de détecter et de prévenir les erreurs potentielles avant même d'exécuter le code.

Voici quelques concepts clés et caractéristiques de TypeScript :

1. **Typage statique :** TypeScript introduit des types statiques pour les variables, les fonctions, les classes et autres structures de données. Cela permet de spécifier explicitement les types attendus pour les valeurs, ce qui facilite la détection précoce d'erreurs de type lors de la compilation.
2. **Inference de type :** TypeScript peut souvent déduire automatiquement les types des variables en fonction des valeurs qui leur sont assignées. Cela réduit la nécessité de spécifier les types de manière explicite.
3. **Meilleure documentation :** L'utilisation de types explicites dans le code TypeScript agit comme une forme de documentation en décrivant les intentions du développeur concernant les données et leur utilisation.
4. **Évolution des fonctionnalités d'ECMAScript :** TypeScript suit de près les normes ECMAScript (le standard sur lequel JavaScript est basé) et ajoute des fonctionnalités avant qu'elles ne soient officiellement supportées dans les navigateurs.
5. **Utilisation des classes et interfaces :** TypeScript facilite la création et l'utilisation de classes et d'interfaces, ce qui peut rendre le code plus structuré et modulaire.
6. **Refactoring en toute confiance :** Grâce à la vérification statique des types, vous pouvez effectuer des opérations de refactoring (modification de la structure du code) en toute confiance, en sachant que si un type d'erreur se produit, le compilateur vous en avertira.
7. **Intégration aux outils de développement :** TypeScript est bien pris en charge par de nombreux éditeurs de code, offrant des fonctionnalités telles que la complétion automatique, la vérification des erreurs en temps réel et la navigation dans le code.

En résumé, TypeScript est une extension du langage JavaScript qui ajoute des fonctionnalités de typage statique et d'autres améliorations au développement d'applications web et d'autres types de logiciels. Cela permet de détecter les erreurs plus tôt dans le processus de développement, d'améliorer la documentation du code et de faciliter la maintenance à long terme.

## Cheatsheet

### Basic types

```tsx
any
void
boolean
number
string
null
undefined
bigint
symbol
string[]          /* or Array<string> */
[string, number]  /* tuple */
string | null | undefined   /* union */
never  /* unreachable */
unknown
```

```tsx
enum Color {
  Red,
  Green,
  Blue = 4
};
let c: Color = Color.Green
```

### Declarations

```tsx
let isDone: boolean
let isDone: boolean = false
```

```tsx
function add (a: number, b: number): number {
  return a + b
}
// Return type is optional
function add (a: number, b: number) { ... }
```

### Type assertions

#### Variables

```tsx
let len: number = (input as string).length
let len: number = (<string>input).length  /* not allowed in JSX */
```

#### Functions

```tsx
function object(this: {a: number, b: number}, a: number, b: number) {
  this.a = a;
  this.b = b;
  return this;
}
// this is used only for type declaration
let a = object(1,2);
// a has type {a: number, b: number}
```

### Interfaces

#### Inline

```tsx
function printLabel (options: { label: string }) {
  console.log(options.label)
}
// Note the semicolon
function getUser (): { name: string; age?: number } {
}
```

#### Explicit

```tsx
interface LabelOptions {
  label: string
}
function printLabel(options: LabelOptions) { ... }
```

#### Optional properties

```tsx
interface User {
  name: string;
  age?: number;
}
```

#### Read only

```tsx
interface User {
  readonly name: string
}
```

#### Dynamic keys

```tsx
interface MyInterface {
  [key: string]: Object[]
}
```

### Type aliases

#### Type aliases

```tsx
type Name = string | string[]
```

#### Intersection

```tsx
interface Colorful { ... }
interface Circle { ... }
type ColorfulCircle = Colorful & Circle;
```

### Function types

```tsx
interface User { ... }
function getUser(callback: (user: User) => any) { callback({...}) }
getUser(function (user: User) { ... })
```

### Classes

```tsx
class Point {
  x: number
  y: number
  static instances = 0
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
```

#### Inheritance

```tsx
class Point {...}
class Point3D extends Point {...}
interface Colored {...}
class Pixel extends Point implements Colored {...}
```

#### Short fields initialisation

```tsx
class Point {
  static instances = 0;
  constructor(
    public x: number,
    public y: number,
  ){}
}
```

#### Fields which do not require initialisation

```tsx
class Point {
  public someUselessValue!: number;
  ...
}
```

### Generics

```tsx
class Greeter<T> {
  greeting: T
  constructor(message: T) {
    this.greeting = message
  }
}
let greeter = new Greeter<string>('Hello, world')
```

### Modules

```tsx
export interface User { ... }
```

### Type extraction

```tsx
interface Building {
  room: {
    door: string;
    walls: string[];
  };
}
type Walls = Building['room']['walls']; // string[]
```

### Keyof Type Operator

```tsx
type Point = { x: number; y: number };
type P = keyof Point; // x | y
```

### Conditional Types

```tsx
// SomeType extends OtherType ? TrueType : FalseType;
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
```

#### Inferring

```tsx
type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;
type Num = GetReturnType<() => number>; // number
```

```tsx
type First<T extends Array<any>> = T extends [infer F, ...infer Rest] ? F : never;
type Str = First<['hello', 1, false]>; // 'hello'
```

### Literal Type

```tsx
const point = { x: 4, y: 2 }; // { x: number, y: number }
const literalPoint = { x: 4, y: 2 } as const; // { readonly x: 4, readonly y: 2 };
```

### Template Literal Types

```tsx
type SpaceChar = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${SpaceChar}${infer Rest}` ? TrimLeft<Rest> : S;
type Str = TrimLeft<'    hello'>; // 'hello'
```

## Méthodes utiles

### Array

#### Array.prototype.filter()

En TypeScript (et en JavaScript), la méthode `filter` est utilisée pour créer un nouveau tableau contenant tous les éléments d'un tableau d'origine qui satisfont à une condition donnée. Elle ne modifie pas le tableau d'origine, mais retourne un nouveau tableau contenant uniquement les éléments qui passent le test spécifié.

La syntaxe générale de la méthode `filter` est la suivante :

```tsx
const newArray = originalArray.filter((element) => {
  // Condition de filtrage basée sur l'élément
  // Retourne true si l'élément doit être inclus dans le nouveau tableau, sinon false
});
```

L'utilité principale de la méthode `filter` en TypeScript est de simplifier le processus de filtrage des éléments d'un tableau en utilisant une approche déclarative. Plutôt que d'utiliser des boucles `for` traditionnelles pour parcourir le tableau et filtrer manuellement les éléments, vous pouvez utiliser `filter` pour obtenir un nouveau tableau contenant les éléments désirés.

Cela améliore la lisibilité du code, le rend plus concis et moins sujet aux erreurs. De plus, grâce à l'inférence de type dans TypeScript, vous pouvez bénéficier d'une validation de type lors de l'utilisation de `filter`, ce qui contribue à la robustesse de votre code.

En résumé, la méthode `filter` en TypeScript est utilisée pour filtrer les éléments d'un tableau en fonction d'une condition donnée, en retournant un nouveau tableau contenant uniquement les éléments qui satisfont cette condition. Cela simplifie le processus de filtrage et améliore la qualité du code en profitant des fonctionnalités de typage de TypeScript.

[Array.prototype.filter()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## Liens utiles

[TypeScript Playground](https://www.typescriptlang.org/play/)

[TypeScript Cheat Sheets](https://www.typescriptlang.org/fr/cheatsheets)
