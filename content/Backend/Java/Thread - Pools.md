---
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Thread - Java - Pools

## Pools de Threads en Java

Java fournit des pools de threads pour organiser et gérer efficacement les threads. Ces pools peuvent être configurés avec différentes stratégies, telles que le cache, les ordonnanceurs ou un nombre fixe de threads.

### Types de Pools de Threads

- **Cached Thread Pool** : Crée de nouveaux threads si nécessaire et les réutilise lorsqu'ils sont disponibles.
- **Scheduled Thread Pool** : Permet de planifier des tâches à exécuter après un certain délai ou de manière répétée.
- **Fixed Thread Pool** : Dispose d'un nombre fixe de threads, limitant le nombre de threads pouvant s'exécuter en parallèle.

### Utilisation de `submit` pour Ajouter des Tâches à une Pool

La méthode `submit` permet de soumettre des tâches à un pool de threads.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3); // Pool avec 3 threads
        for (int i = 0; i < 5; i++) {
            executor.submit(() -> {
                System.out.println("Thread en cours d'exécution.");
            });
        }
        executor.shutdown(); // Arrête les threads une fois les tâches terminées
    }
}
```

### Utilisation de `shutdown` pour Arrêter les Threads

La méthode `shutdown` permet d'arrêter proprement les threads d'un pool une fois que toutes les tâches soumises sont terminées.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 5; i++) {
            executor.submit(() -> {
                System.out.println("Thread en cours d'exécution.");
            });
        }
        executor.shutdown();
    }
}
```

### Limiter le Nombre de Threads avec une Pool Fixe

Avec une pool de threads fixe, vous pouvez contrôler le nombre de threads qui travaillent en même temps, évitant ainsi une surcharge du système.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2); // Limite à 2 threads simultanés
        for (int i = 0; i < 5; i++) {
            executor.submit(() -> {
                System.out.println("Thread en cours d'exécution.");
                try {
                    Thread.sleep(1000); // Simule une tâche longue
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        executor.shutdown();
    }
}
```

### `Runnable` vs `Callable`

- **Runnable** : Ne peut pas retourner de résultat ni lever d'exception vérifiée.
- **Callable** : Peut retourner un résultat et lever des exceptions vérifiées, permettant une gestion plus fine des tâches.

### Utilisation de `Callable` et Consultation des Résultats

Pour consulter le résultat d'une tâche soumise avec `Callable`, utilisez la méthode `get` sur l'objet `Future` retourné par `submit`. Cette méthode peut lancer une `ExecutionException` si la tâche lève une exception.

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        Callable<Integer> task = () -> {
            System.out.println("Thread en cours d'exécution.");
            return 123; // Retourne un résultat
        };

        Future<Integer> future = executor.submit(task);

        try {
            Integer result = future.get(); // Récupère le résultat
            System.out.println("Résultat: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executor.shutdown();
    }
}
```

## Organiser l'exécution

### Contexte

Pour rechercher des nombres premiers, nous pouvons utiliser le modulo (`n % i == 0`) pour vérifier si un nombre `n` est divisible par `i`. Une approche efficace pour paralléliser cette recherche est d'utiliser `ForkJoinPool`, qui permet de diviser la tâche en sous-tâches exécutées en parallèle.

### ForkJoinPool

`ForkJoinPool` est une implémentation de pool de threads conçue pour le traitement parallèle des tâches qui peuvent être décomposées en sous-tâches plus petites. Pour l'utiliser, nous devons transformer notre tâche en une sous-classe de `RecursiveTask`.

### Étapes pour Utiliser ForkJoinPool

1. **Transformer la Classe en `RecursiveTask`** : Créez une classe qui étend `RecursiveTask`.
2. **Définir la Méthode `compute`** : Implémentez la méthode `compute` pour définir la logique de division et de conquête.
3. **Utiliser `fork()` et `join()`** : Divisez la tâche en deux sous-tâches, lancez-les en parallèle avec `fork()` et combinez les résultats avec `join()`.
4. **Utiliser `invoke`** : Lancez la tâche principale en utilisant `invoke` sur une instance de `ForkJoinPool`.