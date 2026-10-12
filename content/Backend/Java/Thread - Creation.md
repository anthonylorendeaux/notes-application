---
created: 2026-01-01T23:28:00
category: Backend
tags: [Fiche]
---

# Thread - Java - Création

## Création de Threads en Java

### Utilisation de `Thread.sleep`

La méthode `Thread.sleep` suspend l'exécution d'un thread pour une durée spécifiée en millisecondes. Elle lance une exception `InterruptedException` qui doit être gérée.

```java
try {
    Thread.sleep(1000); // Suspend le thread pendant 1 seconde
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

### Créer et Lancer un Thread

Pour créer un thread, vous pouvez étendre la classe `Thread` et redéfinir la méthode `run()`. Utilisez `.start()` pour lancer le thread.

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Le thread est en cours d'exécution.");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // Lance le thread
    }
}
```

### Exécution de Tâches Parallèles

Pour exécuter deux tâches en parallèle, créez deux threads distincts et lancez-les avec `.start()`.

```java
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Tâche 1 - Compteur: " + i);
    }
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Tâche 2 - Compteur: " + i);
    }
});
t1.start();
t2.start();
```

### Utilisation de `Runnable`

L'interface `Runnable` peut également être utilisée pour créer des threads. Il suffit d'implémenter `Runnable` et de passer une instance de celle-ci à un objet `Thread`.

```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Le thread est en cours d'exécution.");
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start(); // Lance le thread
    }
}
```

### Utilisation de Lambda pour les Threads

En Java 8 et versions ultérieures, vous pouvez utiliser des expressions lambda pour créer des threads de manière concise.

```java
public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Le thread est en cours d'exécution.");
        });
        thread.start();
    }
}
```

### Utilisation de la Méthode `join`

La méthode `join` permet de s'assurer qu'un thread principal attend la fin de l'exécution d'un thread secondaire avant de continuer.

```java
public class Main {
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1 - Compteur: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 2 - Compteur: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t1.start();
        t2.start();
        try {
            t1.join(); // Attendre la fin de t1
            t2.join(); // Attendre la fin de t2
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Tous les threads ont terminé.");
    }
}
```