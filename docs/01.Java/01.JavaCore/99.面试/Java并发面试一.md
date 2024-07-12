---
title: Java 并发面试一
date: 2020-06-04 13:51:00
categories:
  - Java
  - JavaSE
  - 面试
tags:
  - Java
  - JavaSE
  - 面试
  - 并发
permalink: /pages/34836712/
---

# Java 并发面试一

## 并发简介

### 并发和并行

并发和并行是最容易让新手费解的概念，那么如何理解二者呢？其最关键的差异在于：是否是**同时**发生：

- **并发**：是指具备处理多个任务的能力，但不一定要同时。
- **并行**：是指具备同时处理多个任务的能力。

下面是我见过最生动的说明，摘自 [并发与并行的区别是什么？——知乎的高票答案](https://www.zhihu.com/question/33515481/answer/58849148)：

- 你吃饭吃到一半，电话来了，你一直到吃完了以后才去接，这就说明你不支持并发也不支持并行。
- 你吃饭吃到一半，电话来了，你停了下来接了电话，接完后继续吃饭，这说明你支持并发。
- 你吃饭吃到一半，电话来了，你一边打电话一边吃饭，这说明你支持并行。

### 同步和异步

- **同步**：是指在发出一个调用时，在没有得到结果之前，该调用就不返回。但是一旦调用返回，就得到返回值了。
- **异步**：则是相反，调用在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立刻得到结果。而是在调用发出后，被调用者通过状态、通知来通知调用者，或通过回调函数处理这个调用。

举例来说明：

- 同步就像是打电话：不挂电话，通话不会结束。
- 异步就像是发短信：发完短信后，就可以做其他事；当收到回复短信时，手机会通过铃声或振动来提醒。

### 阻塞和非阻塞

阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态：

- **阻塞**：是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。
- **非阻塞**：是指在不能立刻得到结果之前，该调用不会阻塞当前线程。

举例来说明：

- 阻塞调用就像是打电话，通话不结束，不能放下。
- 非阻塞调用就像是发短信，发完短信后，就可以做其他事，短信来了，手机会提醒。

### 进程和线程

- **进程**：进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动。进程是操作系统进行资源分配的基本单位。进程可视为一个正在运行的程序。
- **线程**：线程是操作系统进行调度的基本单位。

进程和线程的差异：

- 一个程序至少有一个进程，一个进程至少有一个线程。
- 线程比进程划分更细，所以执行开销更小，并发性更高
- 进程是一个实体，拥有独立的资源；而同一个进程中的多个线程共享进程的资源。

<p align="center">
  <img src="https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/concurrent/processes-vs-threads.jpg">
</p>
JVM 在单个进程中运行，JVM 中的线程共享属于该进程的堆。这就是为什么几个线程可以访问同一个对象。线程共享堆并拥有自己的堆栈空间。这是一个线程如何调用一个方法以及它的局部变量是如何保持线程安全的。但是堆不是线程安全的并且为了线程安全必须进行同步。

**总结：** **线程是进程划分成的更小的运行单位。线程和进程最大的不同在于基本上各进程是独立的，而各线程则不一定，因为同一进程中的线程极有可能会相互影响。线程执行开销小，但不利于资源的管理和保护；而进程正相反。**

下面是该知识点的扩展内容！

下面来思考这样一个问题：为什么**程序计数器**、**虚拟机栈**和**本地方法栈**是线程私有的呢？为什么堆和方法区是线程共享的呢？

#### 程序计数器为什么是私有的？

程序计数器主要有下面两个作用：

1. 字节码解释器通过改变程序计数器来依次读取指令，从而实现代码的流程控制，如：顺序执行、选择、循环、异常处理。
2. 在多线程的情况下，程序计数器用于记录当前线程执行的位置，从而当线程被切换回来的时候能够知道该线程上次运行到哪儿了。

需要注意的是，如果执行的是 native 方法，那么程序计数器记录的是 undefined 地址，只有执行的是 Java 代码时程序计数器记录的才是下一条指令的地址。

所以，程序计数器私有主要是为了**线程切换后能恢复到正确的执行位置**。

#### 虚拟机栈和本地方法栈为什么是私有的？

- **虚拟机栈：** 每个 Java 方法在执行之前会创建一个栈帧用于存储局部变量表、操作数栈、常量池引用等信息。从方法调用直至执行完成的过程，就对应着一个栈帧在 Java 虚拟机栈中入栈和出栈的过程。
- **本地方法栈：** 和虚拟机栈所发挥的作用非常相似，区别是：**虚拟机栈为虚拟机执行 Java 方法 （也就是字节码）服务，而本地方法栈则为虚拟机使用到的 Native 方法服务。** 在 HotSpot 虚拟机中和 Java 虚拟机栈合二为一。

所以，为了**保证线程中的局部变量不被别的线程访问到**，虚拟机栈和本地方法栈是线程私有的。

#### 一句话简单了解堆和方法区

堆和方法区是所有线程共享的资源，其中堆是进程中最大的一块内存，主要用于存放新创建的对象 （几乎所有对象都在这里分配内存），方法区主要用于存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。

### Java 线程和操作系统的线程有啥区别？

JDK 1.2 之前，Java 线程是基于绿色线程（Green Threads）实现的，这是一种用户级线程（用户线程），也就是说 JVM 自己模拟了多线程的运行，而不依赖于操作系统。由于绿色线程和原生线程比起来在使用时有一些限制（比如绿色线程不能直接使用操作系统提供的功能如异步 I/O、只能在一个内核线程上运行无法利用多核），在 JDK 1.2 及以后，Java 线程改为基于原生线程（Native Threads）实现，也就是说 JVM 直接使用操作系统原生的内核级线程（内核线程）来实现 Java 线程，由操作系统内核进行线程的调度和管理。

我们上面提到了用户线程和内核线程，考虑到很多读者不太了解二者的区别，这里简单介绍一下：

- 用户线程：由用户空间程序管理和调度的线程，运行在用户空间（专门给应用程序使用）。
- 内核线程：由操作系统内核管理和调度的线程，运行在内核空间（只有内核程序可以访问）。

顺便简单总结一下用户线程和内核线程的区别和特点：用户线程创建和切换成本低，但不可以利用多核。内核态线程，创建和切换成本高，可以利用多核。

一句话概括 Java 线程和操作系统线程的关系：**现在的 Java 线程的本质其实就是操作系统的线程**。

线程模型是用户线程和内核线程之间的关联方式，常见的线程模型有这三种：

1. 一对一（一个用户线程对应一个内核线程）
2. 多对一（多个用户线程映射到一个内核线程）
3. 多对多（多个用户线程映射到多个内核线程）

在 Windows 和 Linux 等主流操作系统中，Java 线程采用的是一对一的线程模型，也就是一个 Java 线程对应一个系统内核线程。Solaris 系统是一个特例（Solaris 系统本身就支持多对多的线程模型），HotSpot VM 在 Solaris 上支持多对多和一对一。具体可以参考 R 大的回答：[JVM 中的线程模型是用户级的么？](https://www.zhihu.com/question/23096638/answer/29617153)。

虚拟线程在 JDK 21 顺利转正，关于虚拟线程、平台线程（也就是我们上面提到的 Java 线程）和内核线程三者的关系可以阅读我写的这篇文章：[Java 20 新特性概览](https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/new-features/java20.md)。

### 并发（多线程）编程的好处是什么？

- 更有效率的利用多处理器核心
- 更快的响应时间
- 更好的编程模型

### 单核 CPU 支持 Java 多线程吗？

单核 CPU 是支持 Java 多线程的。操作系统通过时间片轮转的方式，将 CPU 的时间分配给不同的线程。尽管单核 CPU 一次只能执行一个任务，但通过快速在多个线程之间切换，可以让用户感觉多个任务是同时进行的。

这里顺带提一下 Java 使用的线程调度方式。

操作系统主要通过两种线程调度方式来管理多线程的执行：

- **抢占式调度（Preemptive Scheduling）**：操作系统决定何时暂停当前正在运行的线程，并切换到另一个线程执行。这种切换通常是由系统时钟中断（时间片轮转）或其他高优先级事件（如 I/O 操作完成）触发的。这种方式存在上下文切换开销，但公平性和 CPU 资源利用率较好，不易阻塞。
- **协同式调度（Cooperative Scheduling）**：线程执行完毕后，主动通知系统切换到另一个线程。这种方式可以减少上下文切换带来的性能开销，但公平性较差，容易阻塞。

Java 使用的线程调度是抢占式的。也就是说，JVM 本身不负责线程的调度，而是将线程的调度委托给操作系统。操作系统通常会基于线程优先级和时间片来调度线程的执行，高优先级的线程通常获得 CPU 时间片的机会更多。

### 并发一定比串行更快吗？

答：否。

要点：**创建线程和线程上下文切换有一定开销**。

说明：即使是单核处理器也支持多线程。CPU 通过给每个线程分配时间切片的算法来循环执行任务，当前任务执行一个时间片后会切换到下一个任务。但是，在切换前会保持上一个任务的状态，以便下次切换回这个任务时，可以再加载这个任务的状态。所以**任务从保存到再加载的过程就是一次上下文切换**。

引申

- 如何减少上下文切换？
  - 尽量少用锁
  - CAS 算法
  - 线程数要合理
  - 协程：在单线程中实现多任务调度，并在单线程中维持多个任务的切换

### 如何让正在运行的线程暂停一段时间？

我们可以使用 `Thread` 类的 Sleep() 方法让线程暂停一段时间。

需要注意的是，这并不会让线程终止，一旦从休眠中唤醒线程，线程的状态将会被改变为 Runnable，并且根据线程调度，它将得到执行。

### 什么是线程调度器 (Thread Scheduler) 和时间分片 (Time Slicing)？

线程调度器是一个操作系统服务，它负责为 `Runnable` 状态的线程分配 CPU 时间。一旦我们创建一个线程并启动它，它的执行便依赖于线程调度器的实现。

时间分片是指将可用的 CPU 时间分配给可用的 `Runnable` 线程的过程。

分配 CPU 时间可以基于线程优先级或者线程等待的时间。线程调度并不受到 Java 虚拟机控制，所以由应用程序来控制它是更好的选择（也就是说不要让你的程序依赖于线程的优先级）。

### 在多线程中，什么是上下文切换 (context-switching)？

上下文切换是存储和恢复 CPU 状态的过程，它使得线程执行能够从中断点恢复执行。上下文切换是多任务操作系统和多线程环境的基本特征。

### 如何确保线程安全？

- 原子类 (atomic concurrent classes)
- 锁
- `volatile` 关键字
- 不变类和线程安全类

### 什么是死锁 (Deadlock)？

死锁是指两个以上的线程永远相互阻塞的情况，这种情况产生至少需要两个以上的线程和两个以上的资源。

产生死锁的四个必要条件：

1. 互斥条件：该资源任意一个时刻只由一个线程占用。
2. 请求与保持条件：一个线程因请求资源而阻塞时，对已获得的资源保持不放。
3. 不剥夺条件：线程已获得的资源在未使用完之前不能被其他线程强行剥夺，只有自己使用完毕后才释放资源。
4. 循环等待条件：若干线程之间形成一种头尾相接的循环等待资源关系。

### 如何预防和避免线程死锁？

**如何预防死锁？** 破坏死锁的产生的必要条件即可：

1. **破坏请求与保持条件**：一次性申请所有的资源。
2. **破坏不剥夺条件**：占用部分资源的线程进一步申请其他资源时，如果申请不到，可以主动释放它占有的资源。
3. **破坏循环等待条件**：靠按序申请资源来预防。按某一顺序申请资源，释放资源则反序释放。破坏循环等待条件。

**如何避免死锁？**

避免死锁就是在资源分配时，借助于算法（比如银行家算法）对资源分配进行计算评估，使其进入安全状态。

> **安全状态** 指的是系统能够按照某种线程推进顺序（P1、P2、P3……Pn）来为每个线程分配所需资源，直到满足每个线程对资源的最大需求，使每个线程都可顺利完成。称 `<P1、P2、P3.....Pn>` 序列为安全序列。

## 线程基础

### 线程生命周期

**典型问题**

Java 线程生命周期中有哪些状态？各状态之间如何切换？

**知识点**

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202407120818668.png)

`java.lang.Thread.State` 中定义了 **6** 种不同的线程状态，在给定的一个时刻，线程只能处于其中的一个状态。

以下是各状态的说明，以及状态间的联系：

- **开始（NEW）** - 还没有调用 `start()` 方法的线程处于此状态。
- **可运行（RUNNABLE）** - 已经调用了 `start()` 方法的线程状态。此状态意味着，线程已经准备好了，一旦被线程调度器分配了 CPU 时间片，就可以运行线程。
  - 在操作系统层面，线程有 READY 和 RUNNING 状态；而在 JVM 层面，只能看到 RUNNABLE 状态，所以 Java 系统一般将这两个状态统称为 RUNNABLE（运行中） 状态 。
- **阻塞（BLOCKED）** - 阻塞状态。线程阻塞的线程状态等待监视器锁定。处于阻塞状态的线程正在等待监视器锁定，以便在调用 `Object.wait()` 之后输入同步块/方法或重新输入同步块/方法。
- **等待（WAITING）** - 等待状态。一个线程处于等待状态，是由于执行了 3 个方法中的任意方法：
  - `Object.wait()`
  - `Thread.join()`
  - `LockSupport.park()`
- **定时等待（TIMED_WAITING）** - 等待指定时间的状态。一个线程处于定时等待状态，是由于执行了以下方法中的任意方法：
  - `Thread.sleep(long)`
  - `Object.wait(long)`
  - `Thread.join(long)`
  - `LockSupport.parkNanos(long)`
  - `LockSupport.parkUntil(long)`
- **终止 (TERMINATED)** - 线程 `run()` 方法执行结束，或者因异常退出了 `run()` 方法，则该线程结束生命周期。死亡的线程不可再次复生。

> 👉 扩展阅读：
>
> - [Java Thread Methods and Thread States](https://www.w3resource.com/java-tutorial/java-threadclass-methods-and-threadstates.php)
> - [Java 线程的 5 种状态及切换（透彻讲解）](https://blog.csdn.net/pange1991/article/details/53860651)
> - [Java 线程运行怎么有第六种状态？ - Dawell 的回答](https://www.zhihu.com/question/56494969/answer/154053599)

### 线程创建

**典型问题**

- Java 中，如何创建线程？
- Java 中，创建线程有几种方式？

**知识点**

一般来说，创建线程有很多种方式，例如继承 `Thread` 类、实现 `Runnable` 接口、实现 `Callable` 接口、使用线程池、使用 `CompletableFuture` 类等等。

不过，这些方式其实并没有真正创建出线程。准确点来说，这些都属于是在 Java 代码中使用多线程的方法。

严格来说，Java 就只有一种方式可以创建线程，那就是通过 `new Thread().start() `创建。不管是哪种方式，最终还是依赖于 `new Thread().start()`。

> 👉 扩展阅读：[大家都说 Java 有三种创建线程的方式！并发编程中的惊天骗局！](https://mp.weixin.qq.com/s/NspUsyhEmKnJ-4OprRFp9g)。
>

### 线程启动

**典型问题**

（1）`Thread.start()` 和 `Thread.run()` 有什么区别？

（2）可以直接调用 `Thread.run()` 方法么？

（3）一个线程两次调用 `Thread.start()` 方法会怎样

**知识点**

（1）`Thread.start()` 和 `Thread.run()` 的区别：

- `run()` 方法是线程的执行体。
- `start()` 方法负责启动线程，然后 JVM 会让这个线程去执行 `run()` 方法。

（2）可以直接调用 `Thread.run()` 方法，但是它的行为和普通方法一样，不会启动新线程去执行。**调用 `start()` 方法方可启动线程并使线程进入就绪状态，直接执行 `run()` 方法的话不会以多线程的方式执行。**

（3）Java 的线程是不允许启动两次的，第二次调用必然会抛出 `IllegalThreadStateException`。

### 线程等待

**典型问题**

（1）`Thread.sleep()`、`Thread.yield()`、`Thread.join()`、`Object.wait()` 方法有什么区别？

（2）为什么 `Thread.sleep()`、`Thread.yield()` 设计为静态方法？

**知识点**

（1）`Thread.sleep()`、`Thread.yield()`、`Thread.join()` 方法的区别：

- `Thread.sleep()`
  - `Thread.sleep()` 方法需要指定等待的时间，它可以让当前正在执行的线程在指定的时间内暂停执行，进入 **Blocked** 状态。
  - 该方法既可以让其他同优先级或者高优先级的线程得到执行的机会，也可以让低优先级的线程得到执行机会。
  - 但是，`Thread.sleep()` 方法不会释放“锁标志”，也就是说如果有 `synchronized` 同步块，其他线程仍然不能访问共享数据。
- `Thread.yield()`
  - `Thread.yield()` 方法可以让当前正在执行的线程暂停，但它不会阻塞该线程，它只是将该线程从 **Running** 状态转入 **Runnable** 状态。
  - 当某个线程调用了 `Thread.yield()` 方法暂停之后，只有优先级大于等于当前线程的处于就绪状态的线程才会获得执行的机会。
- `Thread.join()`
  - `Thread.join()` 方法会使当前线程转入 **Blocked** 状态，等待调用 `Thread.join()` 方法的线程结束后才能继续执行。
- `Object.wait()`
  - `Object.wait()` 用于使当前线程等待，直到其他线程调用相同对象的 `Object.notify()` 或 `Object.notifyAll()` 方法唤醒它。
  - 调用 `Object.wait()` 时，线程会释放对象锁，并进入等待状态。

（2）为什么 `Thread.sleep()`、`Thread.yield()` 设计为静态方法？

 `Thread.sleep()`、`Thread.yield()` 针对的是 **Running** 状态的线程，也就是说在非 **Running** 状态的线程上执行这两个方法没有意义。这就是为什么这两个方法被设计为静态的。它们只针对正在 **Running** 状态的线程工作，避免程序员错误的认为可以在其他非 **Running** 状态线程上调用。

> 👉 扩展阅读：[Java 线程中 yield 与 join 方法的区别](http://www.importnew.com/14958.html)
> 👉 扩展阅读：[sleep()，wait()，yield() 和 join() 方法的区别](https://blog.csdn.net/xiangwanpeng/article/details/54972952)

### 线程通信

线程间通信是线程间共享资源的一种方式。`Object.wait()`, `Object.notify()` 和 `Object.notifyAll()` 是用于线程之间协作和通信的方法，它们通常与`synchronized` 关键字一起使用来实现线程的同步。

**典型问题**

（1）为什么线程通信的方法 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 被定义在 `Object` 类里？

（2）为什么 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 必须在 `synchronized` 方法/块中被调用？

**知识点**

（1）为什么线程通信的方法 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 被定义在 `Object` 类里？

- `Object.wait()`
  - `Object.wait()`方法用于使当前线程进入等待状态，直到其他线程调用相同对象的`notify()`或`notifyAll()`方法唤醒它。
  - 在调用`wait()`方法时，线程会释放对象的锁，并进入等待状态。通常在使用`wait()`方法时需要放在一个循环中，以避免虚假唤醒（spurious wakeups）。
- `Object.notify()`
  - `Object.notify()`方法用于唤醒正在等待该对象的锁的一个线程。
  - 被唤醒的线程将会尝试重新获取对象的锁，一旦获取到锁，它将继续执行。
- `Object.notifyAll()`
  - `Object.notifyAll()`方法用于唤醒正在等待该对象的锁的所有线程。
  - 所有被唤醒的线程将会竞争对象的锁，一旦获取到锁，它们将继续执行。

Java 的每个对象中都有一个对象锁 (monitor），并且 `wait()`、`notify()` 等方法用于等待对象的锁或者通知其他线程对象的监视器可用。在 Java 的线程中并没有可供任何对象使用的锁和同步器。这就是为什么这些方法是 `Object` 类的一部分，这样 Java 的每一个类都有用于线程间通信的基本方法

（2）为什么 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 必须在 `synchronized` 方法/块中被调用？

当一个线程需要调用对象的 `wait()` 方法的时候，这个线程必须拥有该对象的锁，接着它就会释放这个对象锁并进入等待状态直到其他线程调用这个对象上的 `notify()` 方法。同样的，当一个线程需要调用对象的 `notify()` 方法时，它会释放这个对象的锁，以便其他在等待的线程就可以得到这个对象锁。

由于所有的这些方法都需要线程持有对象的锁，这样就只能通过 `synchronized` 来实现，所以他们只能在 `synchronized` 方法/块中被调用。

> 👉 扩展阅读：[Java 并发编程：线程间协作的两种方式：wait、notify、notifyAll 和 Condition](http://www.cnblogs.com/dolphin0520/p/3920385.html)

### 线程优先级

**典型问题**

（1）Java 的线程优先级如何控制？

（2）高优先级的 Java 线程一定先执行吗？

**知识点**

（1）Java 中的线程优先级的范围是 `[1,10]`，一般来说，高优先级的线程在运行时会具有优先权。可以通过 `thread.setPriority(Thread.MAX_PRIORITY)` 的方式设置，默认优先级为 `5`。

（1）即使设置了线程的优先级，也**无法保证高优先级的线程一定先执行**。

这是因为 **Java 线程优先级依赖于操作系统的支持**，然而，不同的操作系统支持的线程优先级并不相同，不能很好的和 Java 中线程优先级一一对应。因此，Java 线程优先级控制并不可靠。

### 守护线程

**典型问题**

（1）什么是守护线程？

（2）如何创建守护线程？

**知识点**

（1）什么是守护线程？

守护线程（Daemon Thread）是在后台执行并且不会阻止 JVM 终止的线程。与守护线程（Daemon Thread）相反的，叫用户线程（User Thread），也就是非守护线程。

守护线程的优先级比较低，一般用于为系统中的其它对象和线程提供服务。典型的应用就是垃圾回收器。

（2）创建守护线程的方式：

- 使用 `thread.setDaemon(true)` 可以设置 thread 线程为守护线程。
- 正在运行的用户线程无法设置为守护线程，所以 `thread.setDaemon(true)` 必须在 `thread.start()` 之前设置，否则会抛出 `llegalThreadStateException` 异常；
- 一个守护线程创建的子线程依然是守护线程。
- 不要认为所有的应用都可以分配给守护线程来进行服务，比如读写操作或者计算逻辑。

> 👉 扩展阅读：[Java 中守护线程的总结](https://blog.csdn.net/shimiso/article/details/8964414)

## volatile

被 `volatile` 关键字修饰的变量有两层含义：

- **保证变量的可见性**
- **防止 JVM 的指令重排序**

### volatile 保证线程可见性

**经典问题**

- `volatile` 有什么作用？
- Java 中，如何保证变量的可见性？

**知识点**

**在 Java 并发场景中，`volatile` 可以保证线程可见性**。保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个共享变量，另外一个线程能读到这个修改的值。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210102230327.png)

`volatile` 关键字其实并非是 Java 语言特有的，在 C 语言里也有，它最原始的意义就是禁用 CPU 缓存。如果我们将一个变量使用 `volatile` 修饰，这就指示 编译器，这个变量是共享且不稳定的，每次使用它都到主存中进行读取。

`volatile` 关键字能保证数据的可见性，但不能保证数据的原子性。`synchronized` 关键字两者都能保证。

### volatile 防止 JVM 的指令重排序

**经典问题**

- `volatile` 有什么作用？
- Java 中，如何防止 JVM 的指令重排序？

**知识点**

观察加入 `volatile` 关键字和没有加入 `volatile` 关键字时所生成的汇编代码发现，**加入 `volatile` 关键字时，会多出一个 `lock` 前缀指令**。

**`lock` 前缀指令实际上相当于一个内存屏障**（也成内存栅栏），内存屏障会提供 3 个功能：

- 它确保指令重排序时不会把其后面的指令排到内存屏障之前的位置，也不会把前面的指令排到内存屏障的后面；即在执行到内存屏障这句指令时，在它前面的操作已经全部完成；
- 它会强制将对缓存的修改操作立即写入主存；
- 如果是写操作，它会导致其他 CPU 中对应的缓存行无效。

在 Java 中，`Unsafe` 类提供了三个开箱即用的内存屏障相关的方法，屏蔽了操作系统底层的差异：

```java
public native void loadFence();
public native void storeFence();
public native void fullFence();
```

理论上来说，你通过这个三个方法也可以实现和 `volatile` 禁止重排序一样的效果，只是会麻烦一些。

下面我以一个常见的面试题为例讲解一下 `volatile` 关键字禁止指令重排序的效果。

面试中面试官经常会说：“单例模式了解吗？来给我手写一下！给我解释一下双重检验锁方式实现单例模式的原理呗！”

**双重校验锁实现对象单例（线程安全）**：

```java
public class Singleton {

    private volatile static Singleton uniqueInstance;

    private Singleton() {
    }

    public  static Singleton getUniqueInstance() {
       // 先判断对象是否已经实例过，没有实例化过才进入加锁代码
        if (uniqueInstance == null) {
            // 类对象加锁
            synchronized (Singleton.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

`uniqueInstance` 采用 `volatile` 关键字修饰也是很有必要的， `uniqueInstance = new Singleton();` 这段代码其实是分为三步执行：

1. 为 `uniqueInstance` 分配内存空间
2. 初始化 `uniqueInstance`
3. 将 `uniqueInstance` 指向分配的内存地址

但是由于 JVM 具有指令重排的特性，执行顺序有可能变成 1->3->2。指令重排在单线程环境下不会出现问题，但是在多线程环境下会导致一个线程获得还没有初始化的实例。例如，线程 T1 执行了 1 和 3，此时 T2 调用 `getUniqueInstance`() 后发现 `uniqueInstance` 不为空，因此返回 `uniqueInstance`，但此时 `uniqueInstance` 还未被初始化。

### volatile 不保证原子性

**问题点**

- volatile 能保证原子性吗？
- volatile 能完全保证并发安全吗？

**知识点**

线程安全需要具备：可见性、原子性、顺序性。**`volatile` 不保证原子性，所以决定了它不能彻底地保证线程安全**。

我们通过下面的代码即可证明：

```java
public class VolatileAtomicityDemo {
    public volatile static int inc = 0;

    public void increase() {
        inc++;
    }

    public static void main(String[] args) throws InterruptedException {
        ExecutorService threadPool = Executors.newFixedThreadPool(5);
        VolatileAtomicityDemo volatileAtomicityDemo = new VolatileAtomicityDemo();
        for (int i = 0; i < 5; i++) {
            threadPool.execute(() -> {
                for (int j = 0; j < 500; j++) {
                    volatileAtomicityDemo.increase();
                }
            });
        }
        // 等待 1.5 秒，保证上面程序执行完成
        Thread.sleep(1500);
        System.out.println(inc);
        threadPool.shutdown();
    }
}
```

正常情况下，运行上面的代码理应输出 `2500`。但你真正运行了上面的代码之后，你会发现每次输出结果都小于 `2500`。

为什么会出现这种情况呢？不是说好了，`volatile` 可以保证变量的可见性嘛！

也就是说，如果 `volatile` 能保证 `inc++` 操作的原子性的话。每个线程中对 `inc` 变量自增完之后，其他线程可以立即看到修改后的值。5 个线程分别进行了 500 次操作，那么最终 inc 的值应该是 5\*500=2500。

很多人会误认为自增操作 `inc++` 是原子性的，实际上，`inc++` 其实是一个复合操作，包括三步：

1. 读取 inc 的值。
2. 对 inc 加 1。
3. 将 inc 的值写回内存。

`volatile` 是无法保证这三个操作是具有原子性的，有可能导致下面这种情况出现：

1. 线程 1 对 `inc` 进行读取操作之后，还未对其进行修改。线程 2 又读取了 `inc` 的值并对其进行修改（+1），再将 `inc` 的值写回内存。
2. 线程 2 操作完毕后，线程 1 对 `inc` 的值进行修改（+1），再将 `inc` 的值写回内存。

这也就导致两个线程分别对 `inc` 进行了一次自增操作后，`inc` 实际上只增加了 1。

其实，如果想要保证上面的代码运行正确也非常简单，利用 `synchronized`、`Lock` 或者 `AtomicInteger` 都可以。

使用 `synchronized` 改进：

```java
public synchronized void increase() {
    inc++;
}
```

使用 `AtomicInteger` 改进：

```java
public AtomicInteger inc = new AtomicInteger();

public void increase() {
    inc.getAndIncrement();
}
```

使用 `ReentrantLock` 改进：

```java
Lock lock = new ReentrantLock();
public void increase() {
    lock.lock();
    try {
        inc++;
    } finally {
        lock.unlock();
    }
}
```

### volatile 和 synchronized

**经典问题**

`volatile` 和 `synchronized` 有什么区别？`volatile` 能替代 `synchronized` ？

**知识点**

**`volatile` 无法替代 `synchronized` ，因为 `volatile` 无法保证操作的原子性**。

- `volatile` 本质是在告诉 jvm 当前变量在寄存器（工作内存）中的值是不确定的，需要从主存中读取；`synchronized` 则是锁定当前变量，只有当前线程可以访问该变量，其他线程被阻塞住。
- `volatile` 仅能修饰变量；`synchronized` 可以修饰方法和代码块。
- `volatile` 仅能实现变量的修改可见性，不能保证原子性；而 `synchronized` 则可以保证变量的修改可见性和原子性
- `volatile` 不会造成线程的阻塞；`synchronized` 可能会造成线程的阻塞。
- `volatile` 标记的变量不会被编译器优化；`synchronized` 标记的变量可以被编译器优化。

## synchronized

> `synchronized` 有什么作用？
>
> `synchronized` 的原理是什么？
>
> 同步方法和同步块，哪个更好？
>
> JDK1.6 对`synchronized` 做了哪些优化？
>
> 使用 `synchronized` 修饰静态方法和非静态方法有什么区别？

synchronized 作用

**`synchronized` 可以保证在同一个时刻，只有一个线程可以执行某个方法或者某个代码块**。

`synchronized` 有 3 种应用方式：

- **同步实例方法** - 对于普通同步方法，锁是当前实例对象
- **同步静态方法** - 对于静态同步方法，锁是当前类的 `Class` 对象
- **同步代码块** - 对于同步方法块，锁是 `synchonized` 括号里配置的对象

**原理**

`synchronized` 经过编译后，会在同步块的前后分别形成 `monitorenter` 和 `monitorexit` 这两个字节码指令，这两个字节码指令都需要一个引用类型的参数来指明要锁定和解锁的对象。如果 `synchronized` 明确制定了对象参数，那就是这个对象的引用；如果没有明确指定，那就根据 `synchronized` 修饰的是实例方法还是静态方法，去对对应的对象实例或 `Class` 对象来作为锁对象。

`synchronized` 同步块对同一线程来说是可重入的，不会出现锁死问题。

`synchronized` 同步块是互斥的，即已进入的线程执行完成前，会阻塞其他试图进入的线程。

**优化**

Java 1.6 以后，`synchronized` 做了大量的优化，其性能已经与 `Lock` 、`ReadWriteLock` 基本上持平。

`synchronized` 的优化是将锁粒度分为不同级别，`synchronized` 会根据运行状态动态的由低到高调整锁级别（**偏向锁** -> **轻量级锁** -> **重量级锁**），以减少阻塞。

**同步方法 or 同步块？**

- 同步块是更好的选择。
- 因为它不会锁住整个对象（当然你也可以让它锁住整个对象）。同步方法会锁住整个对象，哪怕这个类中有多个不相关联的同步块，这通常会导致他们停止执行并需要等待获得这个对象上的锁。

## CAS

> 什么是 CAS？
>
> CAS 有什么作用？
>
> CAS 的原理是什么？
>
> CAS 的三大问题？

**作用**

**CAS（Compare and Swap）**，字面意思为**比较并交换**。CAS 有 3 个操作数，分别是：内存值 V，旧的预期值 A，要修改的新值 B。当且仅当预期值 A 和内存值 V 相同时，将内存值 V 修改为 B，否则什么都不做。

**原理**

Java 主要利用 `Unsafe` 这个类提供的 CAS 操作。`Unsafe` 的 CAS 依赖的是 JV M 针对不同的操作系统实现的 `Atomic::cmpxchg` 指令。

**三大问题**

1. **ABA 问题**：因为 CAS 需要在操作值的时候检查下值有没有发生变化，如果没有发生变化则更新，但是如果一个值原来是 A，变成了 B，又变成了 A，那么使用 CAS 进行检查时会发现它的值没有发生变化，但是实际上却变化了。ABA 问题的解决思路就是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加一，那么 A－B－A 就会变成 1A-2B－3A。
2. **循环时间长开销大**。自旋 CAS 如果长时间不成功，会给 CPU 带来非常大的执行开销。如果 JVM 能支持处理器提供的 pause 指令那么效率会有一定的提升，pause 指令有两个作用，第一它可以延迟流水线执行指令（de-pipeline）, 使 CPU 不会消耗过多的执行资源，延迟的时间取决于具体实现的版本，在一些处理器上延迟时间是零。第二它可以避免在退出循环的时候因内存顺序冲突（memory order violation）而引起 CPU 流水线被清空（CPU pipeline flush），从而提高 CPU 的执行效率。
3. **只能保证一个共享变量的原子操作**。当对一个共享变量执行操作时，我们可以使用循环 CAS 的方式来保证原子操作，但是对多个共享变量操作时，循环 CAS 就无法保证操作的原子性，这个时候就可以用锁，或者有一个取巧的办法，就是把多个共享变量合并成一个共享变量来操作。比如有两个共享变量 i ＝ 2,j=a，合并一下 ij=2a，然后用 CAS 来操作 ij。从 Java1.5 开始 JDK 提供了 AtomicReference 类来保证引用对象之间的原子性，你可以把多个变量放在一个对象里来进行 CAS 操作。

## ThreadLocal

> `ThreadLocal` 有什么作用？
>
> `ThreadLocal` 的原理是什么？
>
> 如何解决 `ThreadLocal` 内存泄漏问题？

**作用**

**`ThreadLocal` 是一个存储线程本地副本的工具类**。

**原理**

`Thread` 类中维护着一个 `ThreadLocal.ThreadLocalMap` 类型的成员 `threadLocals`。这个成员就是用来存储当前线程独占的变量副本。

`ThreadLocalMap` 是 `ThreadLocal` 的内部类，它维护着一个 `Entry` 数组， `Entry` 用于保存键值对，其 key 是 `ThreadLocal` 对象，value 是传递进来的对象（变量副本）。 `Entry` 继承了 `WeakReference` ，所以是弱引用。

**内存泄漏问题**

ThreadLocalMap 的 `Entry` 继承了 `WeakReference`，所以它的 key （`ThreadLocal` 对象）是弱引用，而 value （变量副本）是强引用。

- 如果 `ThreadLocal` 对象没有外部强引用来引用它，那么 `ThreadLocal` 对象会在下次 GC 时被回收。
- 此时，`Entry` 中的 key 已经被回收，但是 value 由于是强引用不会被垃圾收集器回收。如果创建 `ThreadLocal` 的线程一直持续运行，那么 value 就会一直得不到回收，产生内存泄露。

那么如何避免内存泄漏呢？方法就是：**使用 `ThreadLocal` 的 `set` 方法后，显示的调用 `remove` 方法** 。

## 内存模型

### 什么是 Java 内存模型

- Java 内存模型即 Java Memory Model，简称 JMM。JMM 定义了 JVM 在计算机内存 (RAM) 中的工作方式。JMM 是隶属于 JVM 的。
- 并发编程领域两个关键问题：线程间通信和线程间同步
- 线程间通信机制
  - 共享内存 - 线程间通过写-读内存中的公共状态来隐式进行通信。
  - 消息传递 - java 中典型的消息传递方式就是 wait() 和 notify()。
- 线程间同步机制
  - 在共享内存模型中，必须显示指定某个方法或某段代码在线程间互斥地执行。
  - 在消息传递模型中，由于发送消息必须在接收消息之前，因此同步是隐式进行的。
- Java 的并发采用的是共享内存模型
- JMM 决定一个线程对共享变量的写入何时对另一个线程可见。
- 线程之间的共享变量存储在主内存（main memory）中，每个线程都有一个私有的本地内存（local memory），本地内存中存储了该线程以读/写共享变量的副本。
- JMM 把内存分成了两部分：线程栈区和堆区
  - 线程栈
    - JVM 中运行的每个线程都拥有自己的线程栈，线程栈包含了当前线程执行的方法调用相关信息，我们也把它称作调用栈。随着代码的不断执行，调用栈会不断变化。
    - 线程栈还包含了当前方法的所有本地变量信息。线程中的本地变量对其它线程是不可见的。
  - 堆区
    - 堆区包含了 Java 应用创建的所有对象信息，不管对象是哪个线程创建的，其中的对象包括原始类型的封装类（如 Byte、Integer、Long 等等）。不管对象是属于一个成员变量还是方法中的本地变量，它都会被存储在堆区。
  - 一个本地变量如果是原始类型，那么它会被完全存储到栈区。
  - 一个本地变量也有可能是一个对象的引用，这种情况下，这个本地引用会被存储到栈中，但是对象本身仍然存储在堆区。
  - 对于一个对象的成员方法，这些方法中包含本地变量，仍需要存储在栈区，即使它们所属的对象在堆区。
  - 对于一个对象的成员变量，不管它是原始类型还是包装类型，都会被存储到堆区。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/concurrent/java-memory-model_3.png)

> 👉 扩展阅读：[全面理解 Java 内存模型](https://blog.csdn.net/suifeng3051/article/details/52611310)

## 同步容器和并发容器

> 👉 扩展阅读：[Java 并发容器](https://dunwu.github.io/waterdrop/pages/6fd8d836/)

### ⭐ 同步容器

> 什么是同步容器？
>
> 有哪些常见同步容器？
>
> 它们是如何实现线程安全的？
>
> 同步容器真的线程安全吗？

**类型**

`Vector`、`Stack`、`Hashtable`

**作用/原理**

同步容器的同步原理就是在方法上用 `synchronized` 修饰。 **`synchronized` 可以保证在同一个时刻，只有一个线程可以执行某个方法或者某个代码块**。

`synchronized` 的互斥同步会产生阻塞和唤醒线程的开销。显然，这种方式比没有使用 `synchronized` 的容器性能要差。

**线程安全**

同步容器真的绝对安全吗？

其实也未必。在做复合操作（非原子操作）时，仍然需要加锁来保护。常见复合操作如下：

- **迭代**：反复访问元素，直到遍历完全部元素；
- **跳转**：根据指定顺序寻找当前元素的下一个（下 n 个）元素；
- **条件运算**：例如若没有则添加等；

### ⭐⭐⭐ ConcurrentHashMap

> 请描述 ConcurrentHashMap 的实现原理？
>
> ConcurrentHashMap 为什么放弃了分段锁？

基础数据结构原理和 `HashMap` 一样，JDK 1.7 采用 数组＋单链表；JDK 1.8 采用数组＋单链表＋红黑树。

并发安全特性的实现：

JDK 1.7：

- 使用分段锁，设计思路是缩小锁粒度，提高并发吞吐。也就是将内部进行分段（Segment），里面则是 HashEntry 的数组，和 HashMap 类似，哈希相同的条目也是以链表形式存放。
- 写数据时，会使用可重入锁去锁住分段（segment）：HashEntry 内部使用 volatile 的 value 字段来保证可见性，也利用了不可变对象的机制以改进利用 Unsafe 提供的底层能力，比如 volatile access，去直接完成部分操作，以最优化性能，毕竟 Unsafe 中的很多操作都是 JVM intrinsic 优化过的。

JDK 1.8：

- 取消分段锁，直接采用 `transient volatile HashEntry<K,V>[] table` 保存数据，采用 table 数组元素作为锁，从而实现了对每一行数据进行加锁，进一步减少并发冲突的概率。
- 写数据时，使用是 CAS + `synchronized`。
  - 根据 key 计算出 hashcode 。
  - 判断是否需要进行初始化。
  - `f` 即为当前 key 定位出的 Node，如果为空表示当前位置可以写入数据，利用 CAS 尝试写入，失败则自旋保证成功。
  - 如果当前位置的 `hashcode == MOVED == -1`, 则需要进行扩容。
  - 如果都不满足，则利用 synchronized 锁写入数据。
  - 如果数量大于 `TREEIFY_THRESHOLD` 则要转换为红黑树。

## 并发简介

线程什么是线程和进程？
Java 线程和操作系统的线程有啥区别？
请简要描述线程与进程的关系，区别及优缺点？
如何创建线程？
说说线程的生命周期和状态？
什么是线程上下文切换？
Thread#sleep() 方法和 Object#wait() 方法对比为什么 wait() 方法不定义在 Thread 中？
可以直接调用 Thread 类的 run 方法吗？
多线程并发与并行的区别同步和异步的区别为什么要使用多线程？
使用多线程可能带来什么问题？
如何理解线程安全和不安全？
单核 CPU 上运行多个线程效率一定会高吗？

## 死锁

死锁什么是线程死锁？
如何检测死锁？
如何预防和避免线程死锁？

## volatile

volatile 关键字如何保证变量的可见性？
如何禁止指令重排序？
volatile 可以保证原子性么？

## synchronized

synchronized 关键字 synchronized 是什么？
有什么用？
如何使用 synchronized？
构造方法可以用 synchronized 修饰么？
synchronized 底层原理了解吗？
JDK1.6 之后的 synchronized 底层做了哪些优化？
锁升级原理了解吗？
synchronized 和 volatile 有什么区别？

## ThreadLocal

ThreadLocal 有什么用？
如何使用 ThreadLocal？
ThreadLocal 原理了解吗？
ThreadLocal 内存泄露问题是怎么导致的？

## 锁

乐观锁和悲观锁什么是悲观锁？
什么是乐观锁？
如何实现乐观锁？
CAS 算法存在哪些问题？
ReentrantLockReentrantLock 是什么？
公平锁和非公平锁有什么区别？
synchronized 和 ReentrantLock 有什么区别？
可中断锁和不可中断锁有什么区别？
ReentrantReadWriteLockReentrantReadWriteLock 是什么？
ReentrantReadWriteLock 适合什么场景？
共享锁和独占锁有什么区别？
线程持有读锁还能获取写锁吗？
读锁为什么不能升级为写锁？
StampedLockStampedLock 是什么？
StampedLock 的性能为什么更好？
StampedLock 适合什么场景？
StampedLock 的底层原理了解吗？

## 线程池

线程池什么是线程池？为什么要用线程池？
如何创建线程池？
为什么不推荐使用内置线程池？
线程池常见参数有哪些？
如何解释？
线程池的拒绝策略有哪些？
如果不允许丢弃任务任务，应该选择哪个拒绝策略？
CallerRunsPolicy 拒绝策略有什么风险？
如何解决？
线程池常用的阻塞队列有哪些？
线程池处理任务的流程了解吗？
线程池中线程异常后，销毁还是复用？
如何给线程池命名？
如何设定线程池的大小？
如何动态修改线程池的参数？
如何设计一个能够根据任务的优先级来执行的线程池？

## Future

Future 类有什么用？
Callable 和 Future 有什么关系？
CompletableFuture 类有什么用？

## AQS

AQS 是什么？
AQS 的原理是什么？

## 并发工具

Semaphore 有什么用？
Semaphore 的原理是什么？
CountDownLatch 有什么用？
CountDownLatch 的原理是什么？
用过 CountDownLatch 么？
什么场景下用的？
CyclicBarrier 有什么用？
CyclicBarrier 的原理是什么？
