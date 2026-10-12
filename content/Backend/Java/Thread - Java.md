---
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Thread - Java

Cette note est un index vers les sujets spécifiques de threading en Java.

## Sous-concepts

- [Thread - Creation](/backend/java/thread-creation) - Création et démarrage de threads (Thread.sleep, Runnable, Lambda, join)
- [Thread - Pools](/backend/java/thread-pools) - Pools de threads (ExecutorService, ForkJoinPool)
- [Thread - Synchronisation](/backend/java/thread-synchronisation) - Synchronisation (synchronized, Lock, Condition, Semaphore)
- [Thread - Task Management](/backend/java/thread-task-management) - Gestion de tâches (Callable, Future, ScheduledExecutor)

## Concepts Clés

### Thread

Un **thread** en Java est un chemin d'exécution distinct dans un programme, permettant d'exécuter des tâches de manière concurrente. Chaque thread a son propre flux d'exécution mais partage les ressources avec les autres threads du même programme.

### Création

Pour créer un thread, vous pouvez :
- Étendre la classe `Thread` et redéfinir la méthode `run()`
- Implémenter l'interface `Runnable`
- Utiliser des expressions lambda (Java 8+)

### Pool de Threads

Java fournit des pools de threads pour organiser et gérer efficacement les threads :
- **Cached Thread Pool** : Crée de nouveaux threads si nécessaire
- **Scheduled Thread Pool** : Permet de planifier des tâches
- **Fixed Thread Pool** : Dispose d'un nombre fixe de threads

### Synchronisation

Pour protéger les ressources partagées :
- **synchronized** : Rend les méthodes atomiques
- **Lock** et **Condition** : Synchronisation flexible
- **Semaphore** : Contrôle d'accès à des ressources limitées