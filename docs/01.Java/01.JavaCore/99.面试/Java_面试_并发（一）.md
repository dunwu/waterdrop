---
title: Java 并发面试一
date: 2020-06-04 13:51:00
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
  - 并发
permalink: /pages/bbf8a81d/
---

# Java 并发面试一

## 并发简介

### 【简单】并发和并行有什么区别？

> - 什么是并发？
> - 什么是并行？
> - 并发和并行有什么区别？

并发和并行是最容易让新手费解的概念，那么如何理解二者呢？其最关键的差异在于：是否是**同时**发生：

- **并发**：是指具备处理多个任务的能力，但不一定要同时。
- **并行**：是指具备同时处理多个任务的能力。

下面是我见过最生动的说明，摘自 [并发与并行的区别是什么？——知乎的高票答案](https://www.zhihu.com/question/33515481/answer/58849148)

- 你吃饭吃到一半，电话来了，你一直到吃完了以后才去接，这就说明你不支持并发也不支持并行。
- 你吃饭吃到一半，电话来了，你停了下来接了电话，接完后继续吃饭，这说明你支持并发。
- 你吃饭吃到一半，电话来了，你一边打电话一边吃饭，这说明你支持并行。

### 【简单】同步和异步有什么区别？

> - 什么是同步？
> - 什么是异步？
> - 同步和异步有什么区别？

- **同步**：是指在发出一个调用时，在没有得到结果之前，该调用就不返回。但是一旦调用返回，就得到返回值了。
- **异步**：则是相反，调用在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立刻得到结果。而是在调用发出后，被调用者通过状态、通知来通知调用者，或通过回调函数处理这个调用。

举例来说明：

- 同步就像是打电话：不挂电话，通话不会结束。
- 异步就像是发短信：发完短信后，就可以做其他事；当收到回复短信时，手机会通过铃声或振动来提醒。

### 【简单】阻塞和非阻塞有什么区别？

> - 什么是阻塞？
> - 阻塞和非阻塞有什么区别？

阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态：

- **阻塞**：是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。
- **非阻塞**：是指在不能立刻得到结果之前，该调用不会阻塞当前线程。

举例来说明：

- 阻塞调用就像是打电话，通话不结束，不能放下。
- 非阻塞调用就像是发短信，发完短信后，就可以做其他事，短信来了，手机会提醒。

### 【中等】进程、线程、协程、管程有什么区别？

> - 什么是进程？
> - 什么是线程？
> - 什么是协程？
> - 什么是管程？
> - 进程、线程、协程、管程有什么区别？

- **进程（Process）** - 进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动。进程是操作系统进行资源分配的基本单位。**进程可视为一个正在运行的程序**。
- **线程（Thread）** - **线程是操作系统进行调度的基本单位**。
- **管程（Monitor）** - **管程是指管理共享变量以及对共享变量的操作过程，让他们支持并发**。
  - Java 通过 `synchronized` 关键字及 `wait()`、`notify()`、`notifyAll()` 这三个方法来实现管程技术。
  - **管程和信号量是等价的，所谓等价指的是用管程能够实现信号量，也能用信号量实现管程**。
- **协程（Coroutine）** - **协程可以理解为一种轻量级的线程**。
  - 从操作系统的角度来看，线程是在内核态中调度的，而协程是在用户态调度的，所以相对于线程来说，协程切换的成本更低。
  - 协程虽然也有自己的栈，但是相比线程栈要小得多，典型的线程栈大小差不多有 1M，而协程栈的大小往往只有几 K 或者几十 K。所以，无论是从时间维度还是空间维度来看，协程都比线程轻量得多。
  - Go、Python、Lua、Kotlin 等语言都支持协程；Java OpenSDK 中的 Loom 项目目标就是支持协程。

进程和线程的差异：

- 一个程序至少有一个进程，一个进程至少有一个线程。
- 线程比进程划分更细，所以执行开销更小，并发性更高
- 进程是一个实体，拥有独立的资源；而同一个进程中的多个线程共享进程的资源。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/concurrent/processes-vs-threads.jpg)

JVM 在单个进程中运行，JVM 中的线程共享属于该进程的堆。这就是为什么几个线程可以访问同一个对象。线程共享堆并拥有自己的堆栈空间。这是一个线程如何调用一个方法以及它的局部变量是如何保持线程安全的。但是堆不是线程安全的并且为了线程安全必须进行同步。

### 【中等】Java 线程和操作系统的线程有什么区别？

以下是 Java 线程与操作系统线程的区别对比表：

| **对比维度**      | **Java 线程**                                       | **操作系统线程**                               |
| ----------------- | --------------------------------------------------- | ---------------------------------------------- |
| **抽象层级**      | JVM 层面的用户态抽象（现代 JVM 1:1 映射到 OS 线程） | 内核直接管理的原生线程（内核态）               |
| **调度机制**      | 依赖 OS 调度，但可通过协程（如虚拟线程）优化        | 完全由内核抢占式调度                           |
| **创建/切换开销** | 高（需系统调用），但线程池可优化                    | 高（上下文切换涉及用户态-内核态切换）          |
| **并发模型**      | 支持 1:1（默认）和 M:N（虚拟线程）                  | 仅 1:1，并发数受内核限制                       |
| **平台依赖性**    | 跨平台（JVM 统一行为，底层实现因 OS 而异）          | 直接依赖 OS 和硬件特性（如线程优先级实现不同） |
| **同步机制**      | 高级抽象（如`synchronized`，映射为 OS 原语）        | 底层原语（如`pthread_mutex`）                  |
| **栈内存占用**    | 默认 1MB（可调），虚拟线程仅 KB 级                  | Linux 默认 8MB（不可跨线程共享）               |
| **典型应用场景**  | 通用并发编程，高并发推荐虚拟线程                    | 直接系统编程，需精细控制线程行为的场景         |

**补充说明**：

1. **现代 JVM**：HotSpot 等主流 JVM 默认将 Java 线程与 OS 线程** 1:1 绑定**，但虚拟线程（Project Loom）实现** M:N 映射**，显著提升并发能力。
2. **性能关键点**：
   - Java 线程的阻塞操作（如 I/O）会阻塞 OS 线程，而虚拟线程通过挂起避免资源浪费。
   - OS 线程数量过多会导致内存和调度开销激增，Java 线程池或虚拟线程可缓解。

### 【中等】单核 CPU 支持 Java 多线程吗？

**单核 CPU 可以支持 Java 多线程**，但多个线程**无法真正并行执行**，而是通过**时间片轮转（分时调度）**在单个 CPU 核心上交替运行，实现**并发（Concurrency）**而非**并行（Parallelism）**。

这里顺带提一下 Java 使用的线程调度方式。

操作系统主要通过两种线程调度方式来管理多线程的执行：

- **抢占式调度（Preemptive Scheduling）**：操作系统决定何时暂停当前正在运行的线程，并切换到另一个线程执行。这种切换通常是由系统时钟中断（时间片轮转）或其他高优先级事件（如 I/O 操作完成）触发的。这种方式存在上下文切换开销，但公平性和 CPU 资源利用率较好，不易阻塞。
- **协同式调度（Cooperative Scheduling）**：线程执行完毕后，主动通知系统切换到另一个线程。这种方式可以减少上下文切换带来的性能开销，但公平性较差，容易阻塞。

Java 使用的线程调度是抢占式的。也就是说，JVM 本身不负责线程的调度，而是将线程的调度委托给操作系统。操作系统通常会基于线程优先级和时间片来调度线程的执行，高优先级的线程通常获得 CPU 时间片的机会更多。

### 【简单】并发一定比串行更快吗？

**并发不一定比串行更快**！关键看场景：

**并发更快的情况**

- 📶 **I/O 密集型**：网络/磁盘操作时，CPU 可切换做其他事
- ⚡ **多核 CPU**：真正并行执行计算任务

**串行更快的情况**

- 🔢 **单核 CPU 计算**：线程切换反而增加开销
- 🔒 **高竞争场景**：锁争用导致线程空等
- 🎯 **简单任务**：并发管理开销超过收益

**黄金法则**

- I/O 多用并发，计算多用多核
- 避免无脑加线程，合理控制并发度

### 【简单】什么是并发安全？有哪些线程不安全的情况？

::: info 什么是并发安全？
:::

并发最重要的问题是并发安全问题。所谓**并发安全**，是指保证程序的正确性，使得并发处理结果符合预期。

并发安全需要保证几个基本特性：

- **可见性** - 是一个线程修改了某个共享变量，其状态能够立即被其他线程知晓，通常被解释为将线程本地状态反映到主内存上，`volatile` 就是负责保证可见性的。
- **原子性** - 简单说就是相关操作不会中途被其他线程干扰，一般通过同步机制（加锁：`sychronized`、`Lock`）实现。
- **有序性** - 是保证线程内串行语义，避免指令重排等。

::: info 有哪些线程不安全的情况？
:::

- **竞态条件**：多线程同时修改共享变量（如 `count++`）
- **非原子操作**：多步骤操作被中断（如 `if(x==null) x=new Object()`）
- **可见性问题**：线程 A 的修改对线程 B 不可见
- **死锁**：多个线程互相持有对方需要的锁
- **资源泄漏**：线程未释放资源（如连接、文件）

::: info 线程不安全有哪些解决办法？
:::

- 同步：`synchronized`、`Lock`
- 原子类：`AtomicInteger`
- 不可变对象：`final`
- 并发容器：`ConcurrentHashMap`

> 核心：减少共享数据，合理加锁

### 【中等】为什么会有并发安全问题？

**（1）缓存导致的可见性问题**

一个线程对共享变量的修改，另外一个线程能够立刻看到，称为 **可见性**。

在单核时代，所有的线程都是在一颗 CPU 上执行，CPU 缓存与内存的数据一致性容易解决。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409042331169.png)

多核时代，每颗 CPU 都有自己的缓存，这时 CPU 缓存与内存的数据一致性就没那么容易解决了，当多个线程在不同的 CPU 上执行时，这些线程操作的是不同的 CPU 缓存。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409042332517.png)

**（2）线程切换带来的原子性问题**

Java 的并发也是基于任务切换。Java 中，即使是一条语句，也可能需要执行多条 CPU 指令。**一个或者多个操作在 CPU 执行的过程中不被中断的特性称为原子性**。

CPU 能保证的原子操作是 CPU 指令级别的，而不是高级语言的操作符。违背直觉的是，高级语言里一条语句往往需要多条 CPU 指令完成，例如上面代码中的`count += 1`，至少需要三条 CPU 指令。

- 指令 1：首先，需要把变量 count 从内存加载到 CPU 的寄存器；
- 指令 2：之后，在寄存器中执行+1 操作；
- 指令 3：最后，将结果写入内存（缓存机制导致可能写入的是 CPU 缓存而不是内存）。

因此，执行 `count += 1` 不是原子操作。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409042334004.png)

**（3）编译优化带来的有序性问题**

有序性指的是程序按照代码的先后顺序执行。编译器为了优化性能，有时候会改变程序中语句的先后顺序，例如程序中：`a=6; b=7;` 编译器优化后可能变成 `b=7; a=6;`，在这个例子中，编译器调整了语句的顺序，但是不影响程序的最终结果。不过有时候编译器及解释器的优化可能导致意想不到的 Bug。

### 【中等】哪些场景需要额外注意线程安全问题？

- **访问共享变量或资源** - 典型的场景有访问共享对象的属性，访问 static 静态变量，访问共享的缓存，等等。因为这些信息不仅会被一个线程访问到，还有可能被多个线程同时访问，那么就有可能在并发读写的情况下发生线程安全问题。
- **依赖时序的操作** - 如果我们操作的正确性是依赖时序的，而在多线程的情况下又不能保障执行的顺序和我们预想的一致，这个时候就会发生线程安全问题。
- **不同数据之间存在绑定关系** - 有时候，不同数据之间是成组出现的，存在着相互对应或绑定的关系，最典型的就是 IP 和端口号。有时候我们更换了 IP，往往需要同时更换端口号，如果没有把这两个操作绑定在一起，就有可能出现单独更换了 IP 或端口号的情况，而此时信息如果已经对外发布，信息获取方就有可能获取一个错误的 IP 与端口绑定情况，这时就发生了线程安全问题。
- **对方没有声明自己是线程安全的** - 在我们使用其他类时，如果对方没有声明自己是线程安全的，那么这种情况下对其他类进行多线程的并发操作，就有可能会发生线程安全问题。举个例子，比如说我们定义了 ArrayList，它本身并不是线程安全的，如果此时多个线程同时对 ArrayList 进行并发读/写，那么就有可能会产生线程安全问题，造成数据出错，而这个责任并不在 ArrayList，因为它本身并不是并发安全的。

### 【困难】什么是死锁？如何发现死锁？如何避免死锁？

::: info 什么是死锁？
:::

**死锁**：**一组互相竞争资源的线程因互相等待，导致“永久”阻塞的现象**。

产生死锁的四个必要条件：

- **互斥**：该资源任意一个时刻只由一个线程占用。
- **占有并等待**：一个线程因请求资源而阻塞时，对已获得的资源保持不放。
- **不可抢占**：线程已获得的资源在未使用完之前不能被其他线程强行剥夺，只有自己使用完毕后才释放资源。
- **循环等待**：若干线程之间形成一种头尾相接的循环等待资源关系。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409050712813.png)

::: info 如何发现死锁？
:::

（1）使用 `jstack` 工具

- 运行程序后，执行命令：

  ```shell
  jstack <PID>  # PID 是 Java 进程 ID
  ```

- 如果存在死锁，输出会显示 `Found one Java-level deadlock`，并列出死锁的线程和资源。

（2）使用 `ThreadMXBean` 检测（代码方式）

```java
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;

public class DeadlockDetector {
    public static void main(String[] args) {
        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        long[] deadlockedThreads = threadMXBean.findDeadlockedThreads(); // 检测死锁线程
        if (deadlockedThreads != null) {
            System.out.println("发现死锁！涉及线程：");
            for (long threadId : deadlockedThreads) {
                System.out.println(threadId);
            }
        } else {
            System.out.println("无死锁。");
        }
    }
}
```

输出示例：

```
发现死锁！涉及线程：
12345
67890
```

（3）使用 VisualVM 或 JConsole（可视化工具）

连接 Java 进程后，查看**线程**选项卡，死锁会被明确标记。

::: info 如何避免死锁？
:::

**如何预防死锁？** 破坏死锁的产生的必要条件即可：

- **互斥**：难以避免
- **占有并等待**：一次性申请所有资源
- **不可抢占**：超时释放锁
- **循环等待**：按序申请资源

**如何避免死锁？**

避免死锁就是在资源分配时，借助于算法（比如银行家算法）对资源分配进行计算评估，使其进入安全状态。

**安全状态** 指的是系统能够按照某种线程推进顺序（P1、P2、P3……Pn）来为每个线程分配所需资源，直到满足每个线程对资源的最大需求，使每个线程都可顺利完成。称 `<P1、P2、P3.....Pn>` 序列为安全序列。

### 【中等】什么是活锁？如何避免活锁？

::: info 什么是活锁？
:::

活锁是一个递归的情况，两个或更多的线程会不断重复一个特定的代码逻辑。预期的逻辑通常为其他线程提供机会继续支持'this'线程。

想象这样一个例子：两个人在狭窄的走廊里相遇，二者都很礼貌，试图移到旁边让对方先通过。但是他们最终在没有取得任何进展的情况下左右摇摆，因为他们都在同一时间向相同的方向移动。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409050740102.png)

如图所示：两个线程想要通过一个 Worker 对象访问共享公共资源的情况，但是当他们看到另一个 Worker（在另一个线程上调用）也是“活动的”时，它们会尝试将该资源交给其他工作者并等待为它完成。如果最初我们让两名工作人员都活跃起来，他们将会面临活锁问题。

::: info 如何避免活锁？
:::

解决“**活锁**”的方案很简单，谦让时，尝试等待一个随机的时间就可以了。由于等待的时间是随机的，所以同时相撞后再次相撞的概率就很低了。“等待一个随机时间”的方案虽然很简单，却非常有效，Raft 这样知名的分布式一致性算法中也用到了它。

### 【中等】什么是饥饿问题？如何避免饥饿？

::: info 什么是饥饿问题？
:::

**定义**：某些线程由于**长期无法获取所需资源**（如 CPU 时间、锁、I/O 等），导致**任务无法执行或执行缓慢**。

**与死锁/活锁的区别**：

- **死锁**：所有相关线程都被阻塞，无法继续。
- **活锁**：线程在运行，但无法取得进展。
- **饥饿**：部分线程能正常运行，但某些线程长期得不到资源。

**饥饿的常见原因**

| **原因**             | **示例**                                               |
| -------------------- | ------------------------------------------------------ |
| **线程优先级不合理** | 高优先级线程总是抢占 CPU，低优先级线程长期得不到执行。 |
| **锁竞争不公平**     | 某些线程总是抢不到锁（如`synchronized`是非公平锁）。   |
| **资源分配不均**     | 线程池任务调度不合理，某些任务被长时间搁置。           |
| **I/O 或网络阻塞**   | 某些线程因 I/O 操作被阻塞，而其他线程持续占用 CPU。    |

::: info 如何避免饥饿？
:::

**（1）使用公平锁（Fair Lock）**

- **`ReentrantLock` 支持公平策略**，避免某些线程长期抢不到锁。

  ```java
  ReentrantLock fairLock = new ReentrantLock(true); // true 表示公平锁
  ```

- **`synchronized` 是非公平的**，无法直接设置公平性。

**（2）合理设置线程优先级**

- 避免滥用高优先级，尽量让所有线程有机会执行。
- Java 线程优先级（1~10，默认 5）：
  ```java
  thread.setPriority(Thread.NORM_PRIORITY); // 5
  ```

**（3）避免长时间占用资源**

- 减少锁的持有时间，尽量只在必要时加锁。
- 使用 `tryLock()` 设置超时，防止无限等待：
  ```java
  if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {
      try { /* 临界区 */ }
      finally { lock.unlock(); }
  }
  ```

**（4）优化线程池任务调度**

- 使用 `newFixedThreadPool` 或 `newCachedThreadPool` 时，结合 `BlockingQueue` 避免任务堆积。
- 可改用 `ForkJoinPool` 进行任务拆分，提高公平性。

**（5）监控与调整**

- 使用 **VisualVM、JConsole** 等工具观察线程状态，发现长期阻塞的线程。
- 结合日志分析，优化资源分配策略。

### 【简单】简单介绍一下 Java 并发编程？

并发编程可以抽象成三个核心问题：分工、同步、互斥。

- **分工** - 是指如何高效地拆解任务并分配给线程。
- **同步** - 是指线程之间如何协作。
- **互斥** - 是指保证同一时刻只允许一个线程访问共享资源。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202409042338029.png)

Java 的 `java.util.concurrent` 包（简称 J.U.C）中提供了大量并发工具类，是 Java 并发能力的主要体现（注意，不是全部，有部分并发能力的支持在其他包中）。从功能上，大致可以分为：

- **原子类** - 如：`AtomicInteger`、`AtomicIntegerArray`、`AtomicReference`、`AtomicStampedReference` 等。
- **锁** - 如：`ReentrantLock`、`ReentrantReadWriteLock` 等。
- **并发容器** - 如：`ConcurrentHashMap`、`CopyOnWriteArrayList`、`CopyOnWriteArraySet` 等。
- **阻塞队列** - 如：`ArrayBlockingQueue`、`LinkedBlockingQueue` 等。
- **非阻塞队列** - 如： `ConcurrentLinkedQueue` 、`LinkedTransferQueue` 等。
- **线程池** - 如：`ThreadPoolExecutor`、`Executors` 等。

J.U.C 包中的工具类是基于 `synchronized`、`volatile`、`CAS`、`ThreadLocal` 这样的并发核心机制打造的。所以，要想深入理解 J.U.C 工具类的特性、为什么具有这样那样的特性，就必须先理解这些核心机制。

## Java 线程基础

### 【中等】Java 线程生命周期有哪些状态？状态之间如何切换？

`java.lang.Thread.State` 中定义了 **6** 种不同的线程状态，在给定的一个时刻，线程只能处于其中的一个状态。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202408290809602.png)

以下是各状态的说明，以及状态间的联系：

- **开始（NEW）** - 尚未调用 `start` 方法的线程处于此状态。此状态意味着：**创建的线程尚未启动**。
- **可运行（RUNNABLE）** - 已经调用了 `start` 方法的线程处于此状态。此状态意味着，**线程已经准备好了**，一旦被线程调度器分配了 CPU 时间片，就可以运行线程。
  - 在操作系统层面，线程有 READY 和 RUNNING 状态；而在 JVM 层面，只能看到 RUNNABLE 状态，所以 Java 系统一般将这两个状态统称为 RUNNABLE（运行中） 状态 。
- **阻塞（BLOCKED）** - 此状态意味着：**线程处于被阻塞状态**。表示线程在等待 `synchronized` 的隐式锁（Monitor lock）。`synchronized` 修饰的方法、代码块同一时刻只允许一个线程执行，其他线程只能等待，即处于阻塞状态。当占用 `synchronized` 隐式锁的线程释放锁，并且等待的线程获得 `synchronized` 隐式锁时，就又会从 `BLOCKED` 转换到 `RUNNABLE` 状态。
- **等待（WAITING）** - 此状态意味着：**线程无限期等待，直到被其他线程显式地唤醒**。 阻塞和等待的区别在于，阻塞是被动的，它是在等待获取 `synchronized` 的隐式锁。而等待是主动的，通过调用 `Object.wait` 等方法进入。
  - 进入：`Object.wait()`；退出：`Object.notify` / `Object.notifyAll`
  - 进入：`Thread.join()`；退出：被调用的线程执行完毕
  - 进入：`LockSupport.park()`；退出：`LockSupport.unpark`
- **定时等待（TIMED_WAITING）** - 等待指定时间的状态。一个线程处于定时等待状态，是由于执行了以下方法中的任意方法：
  - 进入：`Thread.sleep(long)`；退出：时间结束
  - 进入：`Object.wait(long)`；退出：时间结束 / `Object.notify` / `Object.notifyAll`
  - 进入：`Thread.join(long)`；退出：时间结束 / 被调用的线程执行完毕
  - 进入：`LockSupport.parkNanos(long)`；退出：`LockSupport.unpark`
  - 进入：`LockSupport.parkUntil(long)`；退出：`LockSupport.unpark`
- **终止 (TERMINATED)** - 线程 `run()` 方法执行结束，或者因异常退出了 `run()` 方法，则该线程结束生命周期。死亡的线程不可再次复生。

> 👉 扩展阅读：
>
> - [Java Thread Methods and Thread States](https://www.w3resource.com/java-tutorial/java-threadclass-methods-and-threadstates.php)
> - [Java 线程的 5 种状态及切换（透彻讲解）](https://blog.csdn.net/pange1991/article/details/53860651)
> - [Java 线程运行怎么有第六种状态？ - Dawell 的回答](https://www.zhihu.com/question/56494969/answer/154053599)

### 【中级】Java 中，创建线程有几种方式？

一般来说，创建线程有很多种方式，例如：

- 实现 `Runnable` 接口（推荐）
- 继承 `Thread` 类（不推荐，因为不灵活，Java 不支持多继承）
- 实现 `Callable` 接口 + `FutureTask`，支持返回值
- 通过线程池（生产环境推荐）
- 使用 `CompletableFuture`
- ...

虽然，看似有多种多样的创建线程方式。但是，**从本质上来说，Java 就只有一种方式可以创建线程，那就是通过 `new Thread().start() ` 创建。不管是哪种方式，最终还是依赖于 `new Thread().start()`**。

> 👉 扩展阅读：[大家都说 Java 有三种创建线程的方式！并发编程中的惊天骗局！](https://mp.weixin.qq.com/s/NspUsyhEmKnJ-4OprRFp9g)。

### 【简单】可以直接调用 `Thread.run()` 方法么？

可以直接调用 `Thread.run()` 方法，但是它的行为和普通方法一样，不会启动新线程去执行。**调用 `start()` 方法方可启动线程并使线程进入就绪状态，直接执行 `run()` 方法的话不会以多线程的方式执行。**

- **`run()` 方法是线程的执行体**。
- **`start()` 方法负责启动线程，然后 JVM 会让这个线程去执行 `run()` 方法**。

### 【简单】一个线程两次调用 `Thread.start()` 方法会怎样？

Java 的线程是不允许启动两次的，**第二次调用 `Thread.start()` 会抛出 `IllegalThreadStateException`**。

### 【简单】`Thread.sleep()`、`Thread.yield()`、`Thread.join()`、`Object.wait()` 有什么区别？

| 方法                        | 所属类   | 作用                                                     | 是否释放锁  | 使用场景                                   |
| --------------------------- | -------- | -------------------------------------------------------- | ----------- | ------------------------------------------ |
| **`Thread.sleep(long ms)`** | `Thread` | **让当前线程暂停执行指定时间**（不释放 CPU 资源）        | ❌ 不释放锁 | 模拟耗时操作、定时任务                     |
| **`Thread.yield()`**        | `Thread` | **提示调度器让出 CPU，但可能立即重新竞争**（不保证让出） | ❌ 不释放锁 | 优化线程调度，减少竞争（极少使用）         |
| **`Thread.join()`**         | `Thread` | **等待目标线程执行完毕**（阻塞当前线程）                 | ❌ 不释放锁 | 线程顺序执行，如主线程等待子线程结束       |
| **`Object.wait()`**         | `Object` | **释放锁并进入等待，直到 `notify()`/`notifyAll()` 唤醒** | ✅ 释放锁   | 线程间通信（需在 `synchronized` 块中使用） |

**锁的释放**

- `wait()` 会释放锁，其他方法不会。
- `sleep()` 和 `yield()` 仅影响线程调度，不涉及锁。

**唤醒机制**

- `wait()` 需依赖 `notify()`/`notifyAll()` 或超时唤醒。
- `sleep()` 和 `join()` 超时后自动恢复。
- `yield()` 立刻重新参与竞争。

**用途**

- `sleep()`：固定时间暂停（如定时任务）。
- `yield()`：礼貌让出 CPU（实际开发很少用）。
- `join()`：线程依赖（如主线程等待子线程）。
- `wait()`：线程间协作（生产者-消费者模型）。

> 👉 扩展阅读：[Java 并发编程：线程间协作的两种方式：wait、notify、notifyAll 和 Condition](http://www.cnblogs.com/dolphin0520/p/3920385.html)

### 【中等】为什么 `Thread.sleep()`、`Thread.yield()` 设计为静态方法？

`Thread.sleep()`、`Thread.yield()` 针对的是 **Running** 状态的线程，也就是说在非 **Running** 状态的线程上执行这两个方法没有意义。这就是为什么这两个方法被设计为静态的。它们只针对正在 **Running** 状态的线程工作，避免程序员错误的认为可以在其他非 **Running** 状态线程上调用。

> 👉 扩展阅读：[Java 线程中 yield 与 join 方法的区别](http://www.importnew.com/14958.html)
> 👉 扩展阅读：[sleep()，wait()，yield() 和 join() 方法的区别](https://blog.csdn.net/xiangwanpeng/article/details/54972952)

### 【中等】为什么 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 被定义在 `Object` 类里？

**因为锁是对象的，`wait()`/`notify()` 是锁的行为，所以必须定义在 `Object` 中**。

- **锁基于对象**：Java 的锁（`synchronized`）是 **对象级别** 的，每个对象关联一个监视器（Monitor），`wait()`/`notify()` 是监视器的核心操作，必须属于 `Object`。

- **任何对象都可作为锁**：不仅 `Thread` 能作为锁，**所有对象** 都能作为锁，因此这些方法需定义在 `Object` 以保证通用性。

- **等待队列绑定对象**：调用 `wait()` 的线程会进入 **该对象的等待队列**，`notify()` 唤醒的也是同一对象队列中的线程，与对象强绑定。

- **与 `Thread` 类职责分离**：`Thread` 类管理线程生命周期（如 `sleep()`、`join()`），而 `wait()`/`notify()` 是 **线程间协作机制**，属于锁（对象）的行为。

- **设计一致性与历史原因**：遵循 **Monitor 模式**（操作系统同步原语），保持 `Thread` 简洁，避免功能混淆（如 `wait()` 和 `sleep()` 的误用）。

### 【中等】为什么 `Object.wait()`、`Object.notify()` 和 `Object.notifyAll()` 必须在 `synchronized` 方法/块中被调用？

当一个线程需要调用对象的 `wait()` 方法的时候，这个线程必须拥有该对象的锁，接着它就会释放这个对象锁并进入等待状态直到其他线程调用这个对象上的 `notify()` 方法。同样的，当一个线程需要调用对象的 `notify()` 方法时，它会释放这个对象的锁，以便其他在等待的线程就可以得到这个对象锁。

由于所有的这些方法都需要线程持有对象的锁，这样就只能通过 `synchronized` 来实现，所以他们只能在 `synchronized` 方法/块中被调用。

### 【中等】如何正确停止 Java 线程？

**对于 Java 而言，最正确的停止线程的方式是：通过 `Thread.interrupt` 和 `Thread.isInterrupted` 配合来控制线程终止**。

- `Thread.interrupt()`：设置线程的中断标志位（不会直接停止线程）。
- `Thread.isInterrupted()`：检查中断状态。

【示例】正确停止线程的方式——`Thread.interrupt`

```java
public class ThreadStopDemo {

    public static void main(String[] args) throws Exception {
        Thread thread = new Thread(new MyTask(), "MyTask");
        thread.start();
        TimeUnit.MILLISECONDS.sleep(10);
        thread.interrupt();
    }

    private static class MyTask implements Runnable {

        private long count = 0L;

        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName() + " 线程启动");
            // 通过 Thread.interrupted 和 interrupt 配合来控制线程终止
            while (!Thread.currentThread().isInterrupted() && count < 10000) {
                System.out.println("count = " + count++);
            }
            System.out.println(Thread.currentThread().getName() + " 线程终止");
        }

    }

}
// 输出（count 未到 10000，线程就主动结束）：
// MyTask 线程启动
// count = 0
// count = 1
// ...
// count = 840
// count = 841
// count = 842
// MyTask 线程终止
```

### 【中等】可以使用 `Thread.stop`，`Thread.suspend` 和 `Thread.resume` 停止线程吗？为什么？

`Thread.stop`，`Thread.suspend` 和 `Thread.resume` 方法已经被 Java 标记为 `@Deprecated`。为什么废弃呢？

- **`Thread.stop` 会直接把线程停止，这样就没有给线程足够的时间来处理想要在停止前保存数据的逻辑，任务戛然而止，会导致出现数据完整性等问题**。
- 而对于`Thread.suspend` 和 `Thread.resume` 而言，它们的问题在于：**如果线程调用 `Thread.suspend`，它并不会释放锁，就开始进入休眠，但此时有可能仍持有锁，这样就容易导致死锁问题**。因为这把锁在线程被 `Thread.resume` 之前，是不会被释放的。假设线程 A 调用了 `Thread.suspend` 方法让线程 B 挂起，线程 B 进入休眠，而线程 B 又刚好持有一把锁，此时假设线程 A 想访问线程 B 持有的锁，但由于线程 B 并没有释放锁就进入休眠了，所以对于线程 A 而言，此时拿不到锁，也会陷入阻塞，那么线程 A 和线程 B 就都无法继续向下执行。

【示例】`Thread.stop` 终止线程，导致线程任务戛然而止

```java
public class ThreadStopErrorDemo {

    public static void main(String[] args) {
        MyTask thread = new MyTask();
        thread.start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 终止线程
        thread.stop();
        // 确保线程终止后，才执行下面的代码
        while (thread.isAlive()) { }
        // 输出两个计数器的最终状态
        thread.print();
    }

    /**
     * 持有两个计数器，run 方法中每次执行都会使计数器自增
     */
    private static class MyTask extends Thread {

        private int i = 0;

        private int j = 0;

        @Override
        public void run() {
            synchronized (this) {
                ++i;
                try {
                    // 模拟耗时操作
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                ++j;
            }
        }

        public void print() {
            System.out.println("i=" + i + " j=" + j);
        }

    }

}
```

### 【中等】使用 `volatile` 标记方式停止线程正确吗？

使用 `volatile` 标记方式仅适用于简单场景（无阻塞、无锁竞争）。**推荐 `Thread.interrupt` 和 `Thread.isInterrupted` 方式停止线程**：更通用，可处理阻塞操作，是 Java 线程停止的标准方式。

**`volatile` 标记停止线程适用场景（正确使用）**

- ✅ **非阻塞循环**
  - 线程在 `while (!stopped)` 循环中运行，且 **无阻塞操作**（如 `sleep()`、`wait()`、I/O）。
  - `volatile` 保证标志位 (`stopped`) 的修改对所有线程 **立即可见**。
- ✅ **短周期任务**：适用于 **纯计算型任务** 或 **高频检查标志位** 的场景。

**`volatile` 标记停止线程不适用场景（可能失效）**

- ❌ **线程被阻塞**（如 `sleep()`、`wait()`、I/O）：阻塞期间无法检测 `volatile` 标志位，必须等阻塞结束才能退出。
- ❌ **依赖外部资源**（如锁竞争、网络请求）：即使 `stopped=true`，线程可能因锁或 I/O 阻塞无法立即退出。

当我们使用 `volatile` 变量来控制线程的停止，通常是通过设置一个 `volatile` 标志位来告诉线程停止执行。例如：

```java
public class MyTask extends Thread {
    private volatile boolean canceled = false;

    public void run() {
        while (!canceled) {
            // 执行任务
        }
    }

    public void stopTask() {
        canceled = true;
    }
}
```

在上述例子中，`canceled` 是一个 `volatile` 变量，用来控制线程的停止。虽然这种方式在某些情况下可以工作，但它并不是一个可靠的停止线程的方式，因为**在多线程环境中，其他线程修改 `canceled` 的值时，可能会出现竞态条件，导致线程无法正确停止**。

### 【中等】Java 线程之间如何进行通信？

在 Java 中，线程间通信（Inter-Thread Communication, ITC）是指多个线程之间协调工作、共享数据或传递消息的机制。常见的线程通信方式包括以下几种：

| 通信方式                | 核心机制                  | 适用场景         | 特点           |
| ----------------------- | ------------------------- | ---------------- | -------------- |
| **共享变量**            | `volatile`/`synchronized` | 简单状态标记     | 需处理竞态条件 |
| **`wait()`/`notify()`** | 对象监视器                | 生产者-消费者    | 需手动同步     |
| **`BlockingQueue`**     | 内置锁和条件队列          | 生产者-消费者    | 无需手动同步   |
| **`CountDownLatch`**    | 计数器                    | 主线程等待子线程 | 一次性         |
| **`CyclicBarrier`**     | 屏障                      | 多线程同步       | 可重复使用     |
| **`Semaphore`**         | 许可证                    | 限流/资源池      | 控制并发数     |
| **管道流**              | 字节流                    | 线程间数据传输   | 效率较低       |

**推荐选择**：

- 需要高效数据交换 → **`BlockingQueue`**
- 线程协作 → **`wait()`/`notify()` 或 `CountDownLatch`**
- 资源控制 → **`Semaphore`**
- 避免重复造轮子，优先使用 JUC（`java.util.concurrent`）工具类！

### 【简单】高优先级的 Java 线程一定先执行吗？

Java 中的线程优先级的范围是 `[1,10]`，一般来说，高优先级的线程在运行时会具有优先权。可以通过 `thread.setPriority(Thread.MAX_PRIORITY)` 的方式设置，默认优先级为 `5`。

即使设置了线程的优先级，也**无法保证高优先级的线程一定先执行**。这是因为 **Java 线程优先级依赖于操作系统的支持**，然而，不同的操作系统支持的线程优先级并不相同，不能很好的和 Java 中线程优先级一一对应。因此，Java 线程优先级控制并不可靠。

## volatile

被 `volatile` 关键字修饰的变量有两层含义：

- **保证变量的可见性**
- **防止 JVM 的指令重排序**

### volatile 保证线程可见性

**典型问题**

- `volatile` 有什么作用？
- Java 中，如何保证变量的可见性？

**知识点**

**在 Java 并发场景中，`volatile` 可以保证线程可见性**。保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个共享变量，另外一个线程能读到这个修改的值。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210102230327.png)

`volatile` 关键字其实并非是 Java 语言特有的，在 C 语言里也有，它最原始的意义就是禁用 CPU 缓存。如果我们将一个变量使用 `volatile` 修饰，这就指示 编译器，这个变量是共享且不稳定的，每次使用它都到主存中进行读取。

`volatile` 关键字能保证数据的可见性，但不能保证数据的原子性。`synchronized` 关键字两者都能保证。

### volatile 防止 JVM 的指令重排序

**典型问题**

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

**典型问题**

`volatile` 和 `synchronized` 有什么区别？`volatile` 能替代 `synchronized` ？

**知识点**

**`volatile` 无法替代 `synchronized` ，因为 `volatile` 无法保证操作的原子性**。

- `volatile` 本质是在告诉 jvm 当前变量在寄存器（工作内存）中的值是不确定的，需要从主存中读取；`synchronized` 则是锁定当前变量，只有当前线程可以访问该变量，其他线程被阻塞住。
- `volatile` 仅能修饰变量；`synchronized` 可以修饰方法和代码块。
- `volatile` 仅能实现变量的修改可见性，不能保证原子性；而 `synchronized` 则可以保证变量的修改可见性和原子性
- `volatile` 不会造成线程的阻塞；`synchronized` 可能会造成线程的阻塞。
- `volatile` 标记的变量不会被编译器优化；`synchronized` 标记的变量可以被编译器优化。

## synchronized

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

### synchronized 作用

**典型问题**

`synchronized` 有什么作用？

**知识点**

**`synchronized` 可以保证在同一个时刻，只有一个线程可以执行某个方法或者某个代码块**。

`synchronized` 同步块对同一线程来说是可重入的，不会出现锁死问题。

`synchronized` 同步块是互斥的，即已进入的线程执行完成前，会阻塞其他试图进入的线程。

在 Java 早期版本中，`synchronized` 属于 **重量级锁**，效率低下。这是因为监视器锁（monitor）是依赖于底层的操作系统的 `Mutex Lock` 来实现的，Java 的线程是映射到操作系统的原生线程之上的。如果要挂起或者唤醒一个线程，都需要操作系统帮忙完成，而操作系统实现线程之间的切换时需要从用户态转换到内核态，这个状态之间的转换需要相对比较长的时间，时间成本相对较高。

不过，在 Java 6 之后， `synchronized` 引入了大量的优化如自旋锁、适应性自旋锁、锁消除、锁粗化、偏向锁、轻量级锁等技术来减少锁操作的开销，这些优化让 `synchronized` 锁的效率提升了很多。因此， `synchronized` 还是可以在实际项目中使用的，像 JDK 源码、很多开源框架都大量使用了 `synchronized` 。

关于偏向锁多补充一点：由于偏向锁增加了 JVM 的复杂性，同时也并没有为所有应用都带来性能提升。因此，在 JDK15 中，偏向锁被默认关闭（仍然可以使用 `-XX:+UseBiasedLocking` 启用偏向锁），在 JDK18 中，偏向锁已经被彻底废弃（无法通过命令行打开）。

### synchronized 用法

**典型问题**

- synchronized 可以用在哪些场景？
- synchronized 如何使用？

**知识点**

`synchronized` 关键字的使用方式主要有下面 3 种：

1. 修饰实例方法
2. 修饰静态方法
3. 修饰代码块

**1、修饰实例方法** （锁当前对象实例）

给当前对象实例加锁，进入同步代码前要获得 **当前对象实例的锁** 。

```
synchronized void method() {
    // 业务代码
}
```

**2、修饰静态方法** （锁当前类）

给当前类加锁，会作用于类的所有对象实例 ，进入同步代码前要获得 **当前 class 的锁**。

这是因为静态成员不属于任何一个实例对象，归整个类所有，不依赖于类的特定实例，被类的所有实例共享。

```
synchronized static void method() {
    // 业务代码
}
```

静态 `synchronized` 方法和非静态 `synchronized` 方法之间的调用互斥么？不互斥！如果一个线程 A 调用一个实例对象的非静态 `synchronized` 方法，而线程 B 需要调用这个实例对象所属类的静态 `synchronized` 方法，是允许的，不会发生互斥现象，因为访问静态 `synchronized` 方法占用的锁是当前类的锁，而访问非静态 `synchronized` 方法占用的锁是当前实例对象锁。

**3、修饰代码块** （锁指定对象 / 类）

对括号里指定的对象 / 类加锁：

- `synchronized(object)` 表示进入同步代码库前要获得 **给定对象的锁**。
- `synchronized（类。class)` 表示进入同步代码前要获得 **给定 Class 的锁**

```
synchronized(this) {
    // 业务代码
}
```

**总结：**

- `synchronized` 关键字加到 `static` 静态方法和 `synchronized(class)` 代码块上都是是给 Class 类上锁；
- `synchronized` 关键字加到实例方法上是给对象实例上锁；
- 尽量不要使用 `synchronized(String a)` 因为 JVM 中，字符串常量池具有缓存功能。

### 构造方法可以用 synchronized 修饰么？

构造方法不能使用 synchronized 关键字修饰。不过，可以在构造方法内部使用 synchronized 代码块。

另外，构造方法本身是线程安全的，但如果在构造方法中涉及到共享资源的操作，就需要采取适当的同步措施来保证整个构造过程的线程安全。

### synchronized 底层原理了解吗？

`synchronized` 经过编译后，会在同步块的前后分别形成 `monitorenter` 和 `monitorexit` 这两个字节码指令，这两个字节码指令都需要一个引用类型的参数来指明要锁定和解锁的对象。如果 `synchronized` 明确制定了对象参数，那就是这个对象的引用；如果没有明确指定，那就根据 `synchronized` 修饰的是实例方法还是静态方法，去对对应的对象实例或 `Class` 对象来作为锁对象。

synchronized 关键字底层原理属于 JVM 层面的东西。

#### synchronized 同步语句块的情况

```
public class SynchronizedDemo {
    public void method() {
        synchronized (this) {
            System.out.println("synchronized 代码块");
        }
    }
}
```

通过 JDK 自带的 `javap` 命令查看 `SynchronizedDemo` 类的相关字节码信息：首先切换到类的对应目录执行 `javac SynchronizedDemo.java` 命令生成编译后的 .class 文件，然后执行 `javap -c -s -v -l SynchronizedDemo.class`。

[![synchronized 关键字原理](https://camo.githubusercontent.com/669b67b48f1e58c37ac12eb80239cc5df7df55d7d75f9187e1622ee401a0c230/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d7072696e6369706c652e706e67)](https://camo.githubusercontent.com/669b67b48f1e58c37ac12eb80239cc5df7df55d7d75f9187e1622ee401a0c230/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d7072696e6369706c652e706e67)

从上面我们可以看出：**`synchronized` 同步语句块的实现使用的是 `monitorenter` 和 `monitorexit` 指令，其中 `monitorenter` 指令指向同步代码块的开始位置，`monitorexit` 指令则指明同步代码块的结束位置。**

上面的字节码中包含一个 `monitorenter` 指令以及两个 `monitorexit` 指令，这是为了保证锁在同步代码块代码正常执行以及出现异常的这两种情况下都能被正确释放。

当执行 `monitorenter` 指令时，线程试图获取锁也就是获取 **对象监视器 `monitor`** 的持有权。

> 在 Java 虚拟机 (HotSpot) 中，Monitor 是基于 C++ 实现的，由 [ObjectMonitor](https://github.com/openjdk-mirror/jdk7u-hotspot/blob/50bdefc3afe944ca74c3093e7448d6b889cd20d1/src/share/vm/runtime/objectMonitor.cpp) 实现的。每个对象中都内置了一个 `ObjectMonitor` 对象。
>
> 另外，`wait/notify` 等方法也依赖于 `monitor` 对象，这就是为什么只有在同步的块或者方法中才能调用 `wait/notify` 等方法，否则会抛出 `java.lang.IllegalMonitorStateException` 的异常的原因。

在执行 `monitorenter` 时，会尝试获取对象的锁，如果锁的计数器为 0 则表示锁可以被获取，获取后将锁计数器设为 1 也就是加 1。

[![ 执行 monitorenter 获取锁](https://camo.githubusercontent.com/9b5986778b36cc58ea99abe6df0a892dc46acae65bbb73fba6b6dcfc4834da6b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d6765742d6c6f636b2d636f64652d626c6f636b2e706e67)](https://camo.githubusercontent.com/9b5986778b36cc58ea99abe6df0a892dc46acae65bbb73fba6b6dcfc4834da6b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d6765742d6c6f636b2d636f64652d626c6f636b2e706e67)

对象锁的的拥有者线程才可以执行 `monitorexit` 指令来释放锁。在执行 `monitorexit` 指令后，将锁计数器设为 0，表明锁被释放，其他线程可以尝试获取锁。

[![ 执行 monitorexit 释放锁](https://camo.githubusercontent.com/ff0fb002626c445b1adc69507f430bc0ffd1202c9e0decfc58749f71c8183587/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d72656c656173652d6c6f636b2d626c6f636b2e706e67)](https://camo.githubusercontent.com/ff0fb002626c445b1adc69507f430bc0ffd1202c9e0decfc58749f71c8183587/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f73796e6368726f6e697a65642d72656c656173652d6c6f636b2d626c6f636b2e706e67)

如果获取对象锁失败，那当前线程就要阻塞等待，直到锁被另外一个线程释放为止。

#### synchronized 修饰方法的的情况

```
public class SynchronizedDemo2 {
    public synchronized void method() {
        System.out.println("synchronized 方法");
    }
}
```

[![synchronized 关键字原理](https://camo.githubusercontent.com/0ac6ee1ed5d3ca201bd9243767f5a3d239419b6381c9053c7ccfba00890bd4b7/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f73796e6368726f6e697a6564254535253835254233254539253934254145254535254144253937254535253845253946254537253930253836322e706e67)](https://camo.githubusercontent.com/0ac6ee1ed5d3ca201bd9243767f5a3d239419b6381c9053c7ccfba00890bd4b7/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f73796e6368726f6e697a6564254535253835254233254539253934254145254535254144253937254535253845253946254537253930253836322e706e67)

`synchronized` 修饰的方法并没有 `monitorenter` 指令和 `monitorexit` 指令，取得代之的确实是 `ACC_SYNCHRONIZED` 标识，该标识指明了该方法是一个同步方法。JVM 通过该 `ACC_SYNCHRONIZED` 访问标志来辨别一个方法是否声明为同步方法，从而执行相应的同步调用。

如果是实例方法，JVM 会尝试获取实例对象的锁。如果是静态方法，JVM 会尝试获取当前 class 的锁。

#### 总结

`synchronized` 同步语句块的实现使用的是 `monitorenter` 和 `monitorexit` 指令，其中 `monitorenter` 指令指向同步代码块的开始位置，`monitorexit` 指令则指明同步代码块的结束位置。

`synchronized` 修饰的方法并没有 `monitorenter` 指令和 `monitorexit` 指令，取得代之的确实是 `ACC_SYNCHRONIZED` 标识，该标识指明了该方法是一个同步方法。

**不过两者的本质都是对对象监视器 monitor 的获取。**

相关推荐：[Java 锁与线程的那些事 - 有赞技术团队](https://tech.youzan.com/javasuo-yu-xian-cheng-de-na-xie-shi/) 。

🧗🏻 进阶一下：学有余力的小伙伴可以抽时间详细研究一下对象监视器 `monitor`。

### JDK1.6 之后的 synchronized 底层做了哪些优化？锁升级原理了解吗？

在 Java 6 之后， `synchronized` 引入了大量的优化如自旋锁、适应性自旋锁、锁消除、锁粗化、偏向锁、轻量级锁等技术来减少锁操作的开销，这些优化让 `synchronized` 锁的效率提升了很多（JDK18 中，偏向锁已经被彻底废弃，前面已经提到过了）。

锁主要存在四种状态，依次是：无锁状态、偏向锁状态、轻量级锁状态、重量级锁状态，他们会随着竞争的激烈而逐渐升级。注意锁可以升级不可降级，这种策略是为了提高获得锁和释放锁的效率。

`synchronized` 锁升级是一个比较复杂的过程，面试也很少问到，如果你想要详细了解的话，可以看看这篇文章：[浅析 synchronized 锁升级的原理与实现](https://www.cnblogs.com/star95/p/17542850.html)。

### synchronized 和 volatile 有什么区别？

`synchronized` 关键字和 `volatile` 关键字是两个互补的存在，而不是对立的存在！

- `volatile` 关键字是线程同步的轻量级实现，所以 `volatile` 性能肯定比 `synchronized` 关键字要好 。但是 `volatile` 关键字只能用于变量而 `synchronized` 关键字可以修饰方法以及代码块 。
- `volatile` 关键字能保证数据的可见性，但不能保证数据的原子性。`synchronized` 关键字两者都能保证。
- `volatile` 关键字主要用于解决变量在多个线程之间的可见性，而 `synchronized` 关键字解决的是多个线程之间访问资源的同步性。

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

## Java 内存模型

### 【中等】什么是 Java 内存模型？

Java 内存模型（Java Memory Model），简称 **JMM**。Java 内存模型的目标是为了解决由可见性和有序性导致的并发安全问题。Java 内存模型通过 **屏蔽各种硬件和操作系统的内存访问差异，以实现让 Java 程序在各种平台下都能达到一致的内存访问效果**。

::: info 物理内存模型存在的问题

:::

**CPU、内存、I/O 设备存在很大的速度差异** - CPU 远快于内存，内存远快于 I/O 设备。

为了合理利用 CPU 的高性能，平衡这三者的速度差异，计算机体系机构、操作系统、编译程序都做出了贡献，主要体现为：

- **CPU 增加了缓存**，以均衡与 CPU 内存的速度差异；
- **编译程序优化指令执行次序**，使得缓存能够得到更加合理地利用。
- **操作系统增加了进程、线程**，以分时复用 CPU，进而均衡 CPU 与 I/O 的速度差异；

**缓存**导致的可见性问题，**编译优化**带来的有序性问题，**线程切换**带来的原子性问题。

为了解决缓存一致性问题，**需要各个处理器访问缓存时都遵循一些协议，在读写时要根据协议来进行操作**。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202408290755550.png)

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
