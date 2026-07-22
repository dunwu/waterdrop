---
title: Java 并发
date: 2020-06-04 13:51:01
categories:
  - Java
  - JavaCore
  - 并发
tags:
  - Java
  - JavaCore
  - 并发
permalink: /pages/b9a35e69/
hidden: true
index: false
dir:
  order: 5
  link: true
---

# Java 并发

> Java 并发总结、整理 Java 并发编程相关知识点。
>
> 并发编程并非 Java 语言所独有，而是一种成熟的编程范式，Java 只是用自己的方式实现了并发工作模型。学习 Java 并发编程，应该先熟悉并发的基本概念，然后进一步了解并发的特性以及其特性所面临的问题。掌握了这些，当学习 Java 并发工具时，才会明白它们各自是为了解决什么问题，为什么要这样设计。通过这样由点到面的学习方式，更容易融会贯通，将并发知识形成体系化。

## 📖 内容

- [Java 并发简介]([JavaCore][并发]简介.md) - 关键词：`并发`、`线程`、`原子性`、`可见性`、`有序性`、`死锁`、`上下文切换`、`J.U.C`、`管程`、`非阻塞同步`
- [Java 并发之内存模型]([JavaCore][并发]内存模型.md) - 关键词：`JMM`、`Happens-Before`、`内存屏障`、`指令重排序`、`volatile`、`synchronized`、`锁升级`、`偏向锁`、`轻量级锁`、`重量级锁`
- [Java 并发之线程]([JavaCore][并发]线程.md) - 关键词：`Thread`、`Runnable`、`Callable`、`Future`、`线程生命周期`、`start`、`interrupt`、`join`、`sleep`、`守护线程`
- [Java 并发之锁]([JavaCore][并发]锁.md) - 关键词：`Lock`、`ReentrantLock`、`ReentrantReadWriteLock`、`公平锁`、`可重入锁`、`悲观锁`、`乐观锁`、`独占锁`、`CAS`、`AQS`
- [Java 并发之无锁]([JavaCore][并发]无锁.md) - 关键词：`CAS`、`ABA 问题`、`原子类`、`AtomicInteger`、`LongAdder`、`ThreadLocal`、`ThreadLocalMap`、`内存泄漏`、`Immutability`、`Copy-on-Write`
- [Java 并发之 AQS]([JavaCore][并发]AQS.md) - 关键词：`AQS`、`CLH 队列`、`state`、`独占锁`、`共享锁`、`acquire`、`release`、`模板方法`、`Condition`、`ReentrantLock`
- [Java 并发之容器]([JavaCore][并发]容器.md) - 关键词：`同步容器`、`并发容器`、`ConcurrentHashMap`、`分段锁`、`CAS`、`CopyOnWriteArrayList`、`BlockingQueue`、`ArrayBlockingQueue`、`LinkedBlockingQueue`、`ConcurrentModificationException`
- [Java 并发之线程池]([JavaCore][并发]线程池.md) - 关键词：`ThreadPoolExecutor`、`Executors`、`corePoolSize`、`maximumPoolSize`、`workQueue`、`拒绝策略`、`FixedThreadPool`、`CachedThreadPool`、`ScheduledThreadPool`、`Future`
- [Java 并发之同步工具]([JavaCore][并发]同步工具.md) - 关键词：`Semaphore`、`CountDownLatch`、`CyclicBarrier`、`信号量`、`限流`、`acquire`、`await`、`countDown`、`AQS`、`可重用`
- [Java 并发之分工工具]([JavaCore][并发]分工工具.md) - 关键词：`FutureTask`、`CompletableFuture`、`CompletionService`、`ForkJoinPool`、`分治`、`工作窃取`、`异步编排`、`supplyAsync`、`thenApply`、`allOf`

## 📚 资料

- [《Java 并发编程实战》](https://book.douban.com/subject/10484692/)
- [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
- [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/)
- [《Effective Java》](https://book.douban.com/subject/30412517/)
- [极客时间教程 - Java 核心技术面试精讲](https://time.geekbang.org/column/intro/82)
- [极客时间教程 - Java 性能调优实战](https://time.geekbang.org/column/intro/100028001)
- [极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701)
- [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901)

## 🚪 传送

◾ 🏠 [JAVACORE 首页](https://github.com/dunwu/javacore/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/waterdrop/) ◾
