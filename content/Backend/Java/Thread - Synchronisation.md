---
title: Thread - Java - Synchronisation
category: Backend
tags: [Fiche]
---

## Gérer la Concurrence

Lors de la programmation concurrente, il est crucial de protéger les ressources partagées contre les accès simultanés qui peuvent entraîner des incohérences. Pour cela, plusieurs techniques de synchronisation peuvent être utilisées.

### Techniques de Synchronisation

### 1. Protection contre l'Écriture avec un Boolean

**Principe** : Utiliser un boolean pour indiquer si une ressource est en cours d'utilisation et faire patienter les autres threads.

```java
class Resource {
    private boolean inUse = false;

    public synchronized void accessResource() throws InterruptedException {
        while (inUse) {
            wait();
        }
        inUse = true;

        // Traitement de la ressource

        inUse = false;
        notifyAll();
    }
}
```

### 2. Utilisation de Méthodes de Synchronisation (`wait`, `notify`)

```java
class SharedResource {
    private boolean available = false;

    public synchronized void produce() throws InterruptedException {
        while (available) {
            wait();
        }
        // Produire la ressource
        available = true;
        notifyAll();
    }

    public synchronized void consume() throws InterruptedException {
        while (!available) {
            wait();
        }
        // Consommer la ressource
        available = false;
        notifyAll();
    }
}
```

### 3. Utiliser `synchronized` pour Rendre la Méthode Atomique

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}
```

### 4. Faire une Copie pour les Accès Concurrents sur un Objet

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

class ThreadSafeMap {
    private Map<String, String> map = Collections.synchronizedMap(new HashMap<>());

    public void put(String key, String value) {
        map.put(key, value);
    }

    public String get(String key) {
        return map.get(key);
    }
}
```

### 5. Gestion des Exceptions dans les Blocs Synchronisés

```java
class SafeResource {
    private boolean inUse = false;

    public synchronized void accessResource() {
        try {
            while (inUse) {
                wait();
            }
            inUse = true;
            // Traitement de la ressource
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            inUse = false;
            notifyAll();
        }
    }
}
```

## Objets de Synchronisation

### Verrous (`Lock`)

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // Accès à la ressource partagée
} finally {
    lock.unlock();
}
```

### Conditions (`Condition`)

```java
Lock lock = new ReentrantLock();
Condition condition = lock.newCondition();
lock.lock();
try {
    while (conditionNotMet) {
        condition.await();
    }
    // Traiter la ressource
    condition.signal();
} finally {
    lock.unlock();
}
```

### Barrières Cyclique (`CyclicBarrier`)

```java
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("All threads reached the barrier"));
new Thread(() -> {
    barrier.await();
}).start();
```

### Sémaphores (`Semaphore`)

```java
Semaphore semaphore = new Semaphore(3);
semaphore.acquire();
try {
    // Accès à la ressource partagée
} finally {
    semaphore.release();
}
```