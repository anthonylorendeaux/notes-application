---
title: Thread - Java - Task Management
category: Backend
tags: [Fiche]
---

## Gestion des Tâches

### ExecutorService

**Principe** : Gérer un pool de threads pour exécuter des tâches.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);
executor.submit(() -> System.out.println("Executing task"));
executor.shutdown();
```

### ScheduledExecutorService

**Principe** : Planifier des tâches récurrentes ou différées.

```java
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(() -> System.out.println("Scheduled task"), 0, 1, TimeUnit.SECONDS);
scheduler.schedule(() -> scheduler.shutdown(), 10, TimeUnit.SECONDS);
```

### CompletionService

**Principe** : Gérer et récupérer les résultats des tâches asynchrones dans l'ordre de leur achèvement.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);
CompletionService<String> completionService = new ExecutorCompletionService<>(executor);
completionService.submit(() -> "Task completed");
Future<String> result = completionService.take();
System.out.println(result.get());
executor.shutdown();
```

## Exemple Complet - Recherche de Nombres Premiers

Voici un exemple complet pour rechercher des nombres premiers dans un intervalle donné en utilisant `ForkJoinPool` :

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

class PrimeSearchTask extends RecursiveTask<List<Integer>> {
    private final int start;
    private final int end;
    private static final int THRESHOLD = 1000;

    public PrimeSearchTask(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    protected List<Integer> compute() {
        List<Integer> primes = new ArrayList<>();
        if ((end - start) <= THRESHOLD) {
            for (int i = start; i <= end; i++) {
                if (isPrime(i)) {
                    primes.add(i);
                }
            }
        } else {
            int mid = (start + end) / 2;
            PrimeSearchTask leftTask = new PrimeSearchTask(start, mid);
            PrimeSearchTask rightTask = new PrimeSearchTask(mid + 1, end);
            leftTask.fork();
            rightTask.fork();
            primes.addAll(leftTask.join());
            primes.addAll(rightTask.join());
        }
        return primes;
    }

    private boolean isPrime(int number) {
        if (number <= 1) return false;
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) return false;
        }
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool();
        PrimeSearchTask task = new PrimeSearchTask(1, 10000);
        List<Integer> primes;

        try {
            primes = pool.invoke(task);
            System.out.println("Nombres premiers: " + primes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Explications des Points Clés

- **Classe `RecursiveTask`** : Encapsule la logique de recherche de nombres premiers.
- **Méthode `compute`** : Divise la tâche en deux sous-tâches si la plage de recherche dépasse un certain seuil.
- **Méthodes `fork` et `join`** : Les sous-tâches sont lancées en parallèle avec `fork()`, et les résultats sont combinés avec `join()`.
- **Méthode `invoke`** : Lance la tâche principale en utilisant `invoke` sur une instance de `ForkJoinPool`.