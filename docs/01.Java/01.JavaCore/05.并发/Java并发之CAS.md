---
title: Java 并发之 CAS
date: 2019-12-25 22:19:09
categories:
  - Java
  - JavaCore
  - 并发
tags:
  - Java
  - JavaCore
  - 并发
  - CAS
  - 自旋锁
permalink: /pages/56a038ac/
---

# Java 并发之 CAS

## CAS 的要点

**CAS（Compare and Swap），字面意思为比较并交换。**

CAS 涉及三个操作数：

- V：要更新的变量值
- E：预期值
- N：拟写入的新值

**当且仅当 V 的值等于 E 时，通过原子方式用新值 N 来更新 V 的值，否则什么都不做**。

互斥同步是最常见的并发安全性保障手段，**互斥同步最主要的问题是线程阻塞和唤醒所带来的性能问题**。因此，互斥同步也被称为阻塞同步。互斥同步属于一种悲观的并发策略，总是认为只要不去做正确的同步措施，那就肯定会出现问题。无论共享数据是否真的会出现竞争，它都要进行加锁（这里讨论的是概念模型，实际上虚拟机会优化掉很大一部分不必要的加锁）、用户态核心态转换、维护锁计数器和检查是否有被阻塞的线程需要唤醒等操作。

随着硬件指令集的发展，我们可以使用基于冲突检测的乐观并发策略：先进行操作，如果没有其它线程争用共享数据，那操作就成功了，否则采取补偿措施（不断地重试，直到成功为止）。这种乐观的并发策略的许多实现都不需要将线程阻塞，因此这种同步操作称为非阻塞同步。

为什么说乐观锁需要 **硬件指令集的发展** 才能进行？因为需要操作和冲突检测这两个步骤具备原子性。而这点是由硬件来完成，如果再使用互斥同步来保证就失去意义了。硬件支持的原子性操作最典型的是：CAS。

## CAS 的应用

**CAS 只适用于线程冲突较少的情况**。

CAS 的典型应用场景是：

- 原子类
- 自旋锁

### 原子类

> 原子类是 CAS 在 Java 中最典型的应用。

我们先来看一个常见的代码片段。

```Java
if(a==b) {
    a++;
}
```

如果 `a++` 执行前， a 的值被修改了怎么办？还能得到预期值吗？出现该问题的原因是在并发环境下，以上代码片段不是原子操作，随时可能被其他线程所篡改。

解决这种问题的最经典方式是应用原子类的 `incrementAndGet` 方法。

```Java
public class AtomicIntegerDemo {

    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        final AtomicInteger count = new AtomicInteger(0);
        for (int i = 0; i < 10; i++) {
            executorService.execute(new Runnable() {
                @Override
                public void run() {
                    count.incrementAndGet();
                }
            });
        }

        executorService.shutdown();
        executorService.awaitTermination(3, TimeUnit.SECONDS);
        System.out.println("Final Count is : " + count.get());
    }

}
```

J.U.C 包中提供了 `AtomicBoolean`、`AtomicInteger`、`AtomicLong` 分别针对 `Boolean`、`Integer`、`Long` 执行原子操作，操作和上面的示例大体相似，不做赘述。

### 自旋锁

利用原子类（本质上是 CAS），可以实现自旋锁。

所谓自旋锁，是指线程反复检查锁变量是否可用，直到成功为止。由于线程在这一过程中保持执行，因此是一种忙等待。一旦获取了自旋锁，线程会一直保持该锁，直至显式释放自旋锁。

示例：非线程安全示例

```java
public class AtomicReferenceDemo {

    private static int ticket = 10;

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 5; i++) {
            executorService.execute(new MyThread());
        }
        executorService.shutdown();
    }

    static class MyThread implements Runnable {

        @Override
        public void run() {
            while (ticket > 0) {
                System.out.println(Thread.currentThread().getName() + " 卖出了第 " + ticket + " 张票");
                ticket--;
            }
        }

    }

}
```

输出结果：

```
pool-1-thread-2 卖出了第 10 张票
pool-1-thread-1 卖出了第 10 张票
pool-1-thread-3 卖出了第 10 张票
pool-1-thread-1 卖出了第 8 张票
pool-1-thread-2 卖出了第 9 张票
pool-1-thread-1 卖出了第 6 张票
pool-1-thread-3 卖出了第 7 张票
pool-1-thread-1 卖出了第 4 张票
pool-1-thread-2 卖出了第 5 张票
pool-1-thread-1 卖出了第 2 张票
pool-1-thread-3 卖出了第 3 张票
pool-1-thread-2 卖出了第 1 张票
```

很明显，出现了重复售票的情况。

【示例】使用自旋锁来保证线程安全

可以通过自旋锁这种非阻塞同步来保证线程安全，下面使用 `AtomicReference` 来实现一个自旋锁。

```java
public class AtomicReferenceDemo2 {

    private static int ticket = 10;

    public static void main(String[] args) {
        threadSafeDemo();
    }

    private static void threadSafeDemo() {
        SpinLock lock = new SpinLock();
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 5; i++) {
            executorService.execute(new MyThread(lock));
        }
        executorService.shutdown();
    }

    static class SpinLock {

        private AtomicReference<Thread> atomicReference = new AtomicReference<>();

        public void lock() {
            Thread current = Thread.currentThread();
            while (!atomicReference.compareAndSet(null, current)) {}
        }

        public void unlock() {
            Thread current = Thread.currentThread();
            atomicReference.compareAndSet(current, null);
        }

    }

    static class MyThread implements Runnable {

        private SpinLock lock;

        public MyThread(SpinLock lock) {
            this.lock = lock;
        }

        @Override
        public void run() {
            while (ticket > 0) {
                lock.lock();
                if (ticket > 0) {
                    System.out.println(Thread.currentThread().getName() + " 卖出了第 " + ticket + " 张票");
                    ticket--;
                }
                lock.unlock();
            }
        }

    }

}
```

输出结果：

```
pool-1-thread-2 卖出了第 10 张票
pool-1-thread-1 卖出了第 9 张票
pool-1-thread-3 卖出了第 8 张票
pool-1-thread-2 卖出了第 7 张票
pool-1-thread-3 卖出了第 6 张票
pool-1-thread-1 卖出了第 5 张票
pool-1-thread-2 卖出了第 4 张票
pool-1-thread-1 卖出了第 3 张票
pool-1-thread-3 卖出了第 2 张票
pool-1-thread-1 卖出了第 1 张票
```

## CAS 的原理

**在 Java 中，主要利用 `Unsafe` 这个类实现 CAS**。

`Unsafe` 类位于 `sun.misc` 包下，是一个提供低级别、不安全操作的类。由于其强大的功能和潜在的危险性，它通常用于 JVM 内部或一些需要极高性能和底层访问的库中，而不推荐普通开发者在应用程序中使用。

`Unsafe` 类提供了 `compareAndSwapObject`、`compareAndSwapInt`、`compareAndSwapLong`方法来实现的对 `Object`、`int`、`long ` 类型的 CAS 操作：

```java
/**
 * 以原子方式更新对象字段的值。
 */
boolean compareAndSwapObject(Object o, long offset, Object expected, Object x);

/**
 * 以原子方式更新 int 类型的对象字段的值。
 */
boolean compareAndSwapInt(Object o, long offset, int expected, int x);

/**
 * 以原子方式更新 long 类型的对象字段的值。
 */
boolean compareAndSwapLong(Object o, long offset, long expected, long x);
```

`Unsafe` 类中的 CAS 方法是 `native` 方法。`native `关键字表明这些方法是用本地代码（通常是 C 或 C++）实现的，而不是用 Java 实现的。这些方法直接调用底层的、具有原子性的 CPU 指令来实现。

由于 CAS 操作可能会因为并发冲突而失败，因此通常会与`while`循环搭配使用，在失败后不断重试，直到操作成功。这就是 **自旋锁机制** 。

`Unsafe#getAndAddInt` 源码：

```java
// 原子地获取并增加整数值
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        // 以 volatile 方式获取对象 o 在内存偏移量 offset 处的整数值
        v = getIntVolatile(o, offset);
    } while (!compareAndSwapInt(o, offset, v, v + delta));
    // 返回旧值
    return v;
}
```

## CAS 的问题

一般情况下，**CAS 比锁性能更高**。因为 CAS 是一种非阻塞算法，所以其避免了线程阻塞和唤醒的等待时间。但是，事物总会有利有弊，CAS 也存在三大问题：

- **ABA 问题**
- **循环时间长开销大**
- **只能保证一个共享变量的原子性**

### ABA 问题

如果一个变量初次读取的时候是 A 值，它的值被改成了 B，后来又被改回为 A，那 CAS 操作就会误认为它从来没有被改变过，这就是 **ABA 问题**。

ABA 问题的解决思路是在变量前面追加上**版本号或者时间戳**。J.U.C 包提供了一个带有标记的**原子引用类 `AtomicStampedReference` 来解决这个问题**，它可以通过控制变量值的版本来保证 CAS 的正确性。大部分情况下 ABA 问题不会影响程序并发的正确性，如果需要解决 ABA 问题，改用**传统的互斥同步可能会比原子类更高效**。

### 循环时间长开销大

**自旋 CAS （不断尝试，直到成功为止）如果长时间不成功，会给 CPU 带来非常大的执行开销**。

如果 JVM 能支持处理器提供的 `pause` 指令那么效率会有一定的提升，`pause` 指令有两个作用：

- 它可以延迟流水线执行指令（de-pipeline）,使 CPU 不会消耗过多的执行资源，延迟的时间取决于具体实现的版本，在一些处理器上延迟时间是零。
- 它可以避免在退出循环的时候因内存顺序冲突（memory order violation）而引起 CPU 流水线被清空（CPU pipeline flush），从而提高 CPU 的执行效率。

比较花费 CPU 资源，即使没有任何用也会做一些无用功。

### 只能保证一个共享变量的原子性

当对一个共享变量执行操作时，我们可以使用循环 CAS 的方式来保证原子操作，但是对多个共享变量操作时，循环 CAS 就无法保证操作的原子性，这个时候就可以用锁。

或者有一个取巧的办法，就是把多个共享变量合并成一个共享变量来操作。比如有两个共享变量 `i ＝ 2, j = a`，合并一下 `ij=2a`，然后用 CAS 来操作 `ij`。从 Java 1.5 开始 JDK 提供了 `AtomicReference` 类来保证引用对象之间的原子性，你可以把多个变量放在一个对象里来进行 CAS 操作。

## 参考资料

- [《Java 并发编程实战》](https://book.douban.com/subject/10484692/)
- [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
- [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/)
- [极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701)
- [Java CAS 完全解读](https://www.jianshu.com/p/473e14d5ab2d)
- [Java 中 CAS 详解](https://blog.csdn.net/ls5718/article/details/52563959)
- [Non-blocking Algorithms](http://tutorials.jenkov.com/java-concurrency/non-blocking-algorithms.html)