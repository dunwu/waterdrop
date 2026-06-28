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

- [Java 并发简介](Java_并发_简介.md) - 关键词：并发、线程、安全性、活跃性、性能、死锁、活锁
- [Java 并发之内存模型](Java_并发_内存模型.md) - 关键词：JMM、Happens-Before、内存屏障、volatile、synchronized、final、指令重排序
- [Java 并发之线程](Java_并发_线程.md) - 关键词：Thread、Runnable、Callable、Future、FutureTask、线程生命周期
- [Java 并发之锁](Java_并发_锁.md) - 关键词：锁、Lock、Condition、ReentrantLock、ReentrantReadWriteLock、StampedLock
- [Java 并发之无锁](Java_并发_无锁.md) - 关键词：CAS、ThreadLocal、Immutability、Copy-on-Write
- [Java 并发之 AQS](Java_并发_AQS.md) - 关键词：AQS、独占锁、共享锁
- [Java 并发之容器](Java_并发_容器.md) - 关键词：ConcurrentHashMap、CopyOnWriteArrayList
- [Java 并发之线程池](Java_并发_线程池.md) - 关键词：Executor、ExecutorService、ThreadPoolExecutor、Executors
- [Java 并发之同步工具](Java_并发_同步工具.md) - 关键词：Semaphore、CountDownLatch、CyclicBarrier
- [Java 并发之分工工具](Java_并发_分工工具.md) - 关键词：FutureTask、CompletableFuture、CompletionStage、CompletionService、ForkJoinPool

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
