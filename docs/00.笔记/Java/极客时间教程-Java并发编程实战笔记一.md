---
title: 《极客时间教程 - Java 并发编程实战》笔记一
date: 2024-08-26 14:36:05
categories:
  - 笔记
  - Java
tags:
  - Java
  - 并发
permalink: /pages/ed3f0c85/
---

# 《极客时间教程 - Java 并发编程实战》笔记一

## 学习攻略 如何才能学好并发编程？

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/8a2ebe85df1d43c49126f1972c13bdf8.png)

## 开篇词 你为什么需要学习并发编程？

**并发编程可以总结为三个核心问题：分工、同步、互斥。**

- **分工**指的是如何高效地拆解任务并分配给线程。
- **同步**指的是线程之间如何协作。
- **互斥**则是保证同一时刻只允许一个线程访问共享资源。

## 可见性、原子性和有序性问题：并发编程 Bug 的源头

CPU、内存、I/O 设备三者的速度存在很大差异。为了合理利用 CPU 的高性能，平衡这三者的速度差异，计算机体系结构、操作系统、编译程序都做出了贡献，主要体现为：

1. CPU 增加了缓存，以均衡与内存的速度差异；
2. 操作系统增加了进程、线程，以分时复用 CPU，进而均衡 CPU 与 I/O 设备的速度差异；
3. 编译程序优化指令执行次序，使得缓存能够得到更加合理地利用。

**缓存**导致的可见性问题，**线程切换**带来的原子性问题，**编译优化**带来的有序性问题。

### 缓存导致的可见性问题

一个线程对共享变量的修改，另外一个线程能够立刻看到，我们称为**可见性**。

对于**单核**，所有的线程都是在一个 CPU 上执行，操作同一个 CPU 的缓存；一个线程对缓存的写，对另外一个线程来说一定是可见的。

例如在下面的图中，线程 A 和线程 B 都是操作同一个 CPU 里面的缓存，所以线程 A 更新了变量 V 的值，那么线程 B 之后再访问变量 V，得到的一定是 V 的最新值（线程 A 写过的值）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/730d6af712c347298f67cd9e99622ec8.png)

对于**多核**，当多个线程在不同的 CPU 上执行时，这些线程操作的是不同的 CPU 缓存。这时两个线程对于变量的操作就不具备可见性了。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/1e69175b321848e48b3b325657558a24.png)

【示例】计数器的并发安全问题示例

```java
public class Test {
  private long count = 0;
  private void add10K() {
    int idx = 0;
    while(idx++ < 10000) {
      count += 1;
    }
  }
  public static long calc() {
    final Test test = new Test();
    // 创建两个线程，执行 add() 操作
    Thread th1 = new Thread(()->{
      test.add10K();
    });
    Thread th2 = new Thread(()->{
      test.add10K();
    });
    // 启动两个线程
    th1.start();
    th2.start();
    // 等待两个线程执行结束
    th1.join();
    th2.join();
    return count;
  }
}
```

这段代码的目的是将 count 累加到 10000，两个线程执行后应累加到 20000，但实际结果总是小于 20000。

### 线程切换带来的原子性问题

操作系统允许进程执行一小段时间（如 50ms），过后重新选择进程执行，这段时间称为“**时间片**”。现代操作系统基于更轻量的**线程**调度，下文“任务切换”均指线程切换。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/681b590828ed41a3af84bff62303cb79.png)

Java 的并发也是基于任务切换。Java 中，即使是一条语句，也可能需要执行多条 CPU 指令。**一个或者多个操作在 CPU 执行的过程中不被中断的特性称为原子性**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/8736467ba93f4ad7aeff928ae09fc4a9.png)

### 编译优化带来的有序性问题

有序性指的是程序按照代码的先后顺序执行。编译器为了优化性能，有时候会改变程序中语句的先后顺序。

【示例】双重检查创建单例对象

```java
public class Singleton {
  static Singleton instance;
  static Singleton getInstance(){
    if (instance == null) {
      synchronized(Singleton.class) {
        if (instance == null)
          instance = new Singleton();
        }
    }
    return instance;
  }
}
```

我们以为的 new 操作应该是：

1. 分配一块内存 M；
2. 在内存 M 上初始化 Singleton 对象；
3. 然后 M 的地址赋值给 instance 变量。

但实际优化后的执行路径可能是：

1. 分配一块内存 M；
2. 将 M 的地址赋值给 instance 变量；
3. 最后在内存 M 上初始化 Singleton 对象。

优化后的问题：线程 A 执行完第 2 步时发生线程切换，线程 B 执行第一个判断发现 `instance != null`，直接返回未初始化的 instance，访问其成员变量可能触发**空指针异常**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/8c3b002320a24895849dbd9149c19ccf.png)

## Java 内存模型：看 Java 如何解决可见性和有序性问题

导致可见性的原因是缓存，导致有序性的原因是编译优化，那解决可见性、有序性最直接的办法就是**禁用缓存和编译优化**，但这种方案性能堪忧。

合理的方案应该是**按需禁用缓存以及编译优化**。Java 内存模型规范了 JVM 如何提供按需禁用缓存和编译优化的方法。具体来说，这些方法包括 **volatile**、**synchronized** 和 **final** 三个关键字，以及六项 **Happens-Before 规则**。

### Happens-Before 规则

- **程序次序规则** - 在一个线程中，按照程序顺序，前面的操作 Happens-Before 于后续的任意操作。
- **锁定规则** - 一个 `unLock` 操作 Happens-Before 于后面对同一个锁的 `lock` 操作。
- **volatile 变量规则** - 对一个 `volatile` 变量的写操作 Happens-Before 于后面对这个变量的读操作。
- **线程启动规则** - `Thread` 对象的 `start()` 方法 Happens-Before 于此线程的每个一个动作。
- **线程终止规则** - 线程中所有的操作都 Happens-Before 于线程的终止检测，我们可以通过 `Thread.join()` 方法是否结束、`Thread.isAlive()` 的返回值手段检测到线程已经终止执行。
- **线程中断规则** - 对线程 `interrupt()` 方法的调用 Happens-Before 于被中断线程的代码检测到中断事件的发生，可以通过 `Thread.interrupted()` 方法检测到是否有中断发生。
- **对象终结规则** - 一个对象的初始化完成 Happens-Before 于它的 `finalize()` 方法的开始。
- **传递性** - 如果 A Happens-Before B，且 B Happens-Before C，那么 A Happens-Before C。

## 互斥锁（上）：解决原子性问题

并发原子性问题的源头是**线程切换**。

解决原子性问题的直接方法是禁止线程切换。禁止 CPU 中断可禁止单核上的切换，但不适用于多核场景。

举例来说，long 型变量是 64 位，在 32 位 CPU 上执行写操作会被拆分成两次写操作（写高 32 位和写低 32 位，如下图所示）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/7d94ecc28af04e51bb5212c0fc6b447a.png)

多核场景下，禁止 CPU 中断只能保证单个 CPU 上线程连续执行，不能保证同一时刻只有一个线程执行。若两个线程同时写 long 型变量高 32 位，就会出现原子性 Bug。

“**同一时刻只有一个线程执行**”称之为**互斥**。如果能够保证对共享变量的修改是互斥的，那么，无论是单核 CPU 还是多核 CPU，就都能保证原子性了。

### 简易锁模型

一段需要互斥执行的代码称为**临界区**。线程进入临界区前尝试加锁 `lock()`，成功则持有锁进入临界区，否则等待；执行完后解锁 `unlock()`。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/7a89e2585de64852993ac524d189c38b.png)

### 改进后的锁模型

改进锁模型：明确临界区内的**受保护资源 R**，为 R 创建对应的**锁 LR**，进出临界区时执行加锁/解锁操作。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/d6ee6fae6e2440088c191acd2a1045b3.png)

### Java 语言提供的锁技术：synchronized

Java 中，synchronized 是一种锁的实现方式。

【示例】synchronized 使用示例

```java
class X {
  // 修饰非静态方法
  synchronized void foo() {
    // 临界区
  }
  // 修饰静态方法
  synchronized static void bar() {
    // 临界区
  }
  // 修饰代码块
  Object obj = new Object();
  void baz() {
    synchronized(obj) {
      // 临界区
    }
  }
}
```

**可以用一把锁保护多个资源，但不能用多把锁保护一个资源**。

### 用 synchronized 解决 count+=1 问题

【示例】synchronized 实现并发安全的计数器

```java
class SafeCalc {
  long value = 0L;
  synchronized long get() {
    return value;
  }
  synchronized void addOne() {
    value += 1;
  }
}
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/615fa48f45d94efc99f760ce1101dd8c.png)

### 锁和受保护资源的关系

**受保护资源和锁之间的关联关系是 N:1 的关系**。

【示例】synchronized 实现并发安全的计数器错误示例

```java
class SafeCalc {
  static long value = 0L;
  synchronized long get() {
    return value;
  }
  synchronized static void addOne() {
    value += 1;
  }
}
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/a124365b348e48459bd3e4aa4fbc32a6.png)

【示例】synchronized 实现并发安全的计数器错误示例

```java
class SafeCalc {
  long value = 0L;
  long get() {
    synchronized (new Object()) {
      return value;
    }
  }
  void addOne() {
    synchronized (new Object()) {
      value += 1;
    }
  }
}
```

加锁本质是在锁对象的对象头中写入当前线程 id，`new Object()` 每次都是新对象，因此加锁无效。

## 互斥锁（下）：如何用一把锁保护多个资源？

### 保护没有关联关系的多个资源

**用不同锁对受保护资源进行精细化管理，能提升性能**，这种锁称为**细粒度锁**。

【示例】账户余额和密码分别用独立锁保护，各自管理各自的操作。

```java
class Account {
  // 锁：保护账户余额
  private final Object balLock
    = new Object();
  // 账户余额
  private Integer balance;
  // 锁：保护账户密码
  private final Object pwLock
    = new Object();
  // 账户密码
  private String password;

  // 取款
  void withdraw(Integer amt) {
    synchronized(balLock) {
      if (this.balance > amt){
        this.balance -= amt;
      }
    }
  }
  // 查看余额
  Integer getBalance() {
    synchronized(balLock) {
      return balance;
    }
  }

  // 更改密码
  void updatePassword(String pw){
    synchronized(pwLock) {
      this.password = pw;
    }
  }
  // 查看密码
  String getPassword() {
    synchronized(pwLock) {
      return password;
    }
  }
}
```

> 思考：如果用 `this.balance` 和 `this.password` 作为互斥锁是否可以？
>
> 答：不可以，**不能用可变对象做锁**。

### 保护有关联关系的多个资源

【示例】保护临界区多个资源的错误示例

```java
class Account {
  private int balance;
  // 转账
  synchronized void transfer(
      Account target, int amt){
    if (this.balance > amt) {
      this.balance -= amt;
      target.balance += amt;
    }
  }
}
```

`synchronized` 只能保护 `this` 对象持有的资源，不能保护 `target` 对象持有的资源。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/d15aaa05fed54a8ebc8669baacce5bdb.png)

### 使用锁的正确姿势

思路：创建 Account 时传入同一个 lock 对象，所有实例共享同一把锁。

```java
class Account {
  private Object lock;
  private int balance;
  private Account();
  // 创建 Account 时传入同一个 lock 对象
  public Account(Object lock) {
    this.lock = lock;
  }
  // 转账
  void transfer(Account target, int amt){
    // 此处检查所有对象共享的锁
    synchronized(lock) {
      if (this.balance > amt) {
        this.balance -= amt;
        target.balance += amt;
      }
    }
  }
}
```

思路正确，但如果传入的 lock 不是同一对象就会失效。优化方案：使用 `Account.class` 作为共享锁，它是 JVM 加载类时创建的唯一对象。

```java
class Account {
  private int balance;
  // 转账
  void transfer(Account target, int amt){
    synchronized(Account.class) {
      if (this.balance > amt) {
        this.balance -= amt;
        target.balance += amt;
      }
    }
  }
}
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/6aae2001fefa41768f0ab05a62031593.png)

## 一不小心就死锁了，怎么办？

**死锁**：**一组互相竞争资源的线程因互相等待，导致“永久”阻塞的现象**。

【示例】存在死锁的示例

```java
class Account {
  private int balance;
  // 转账
  void transfer(Account target, int amt){
    // 锁定转出账户
    synchronized(this) {
      // 锁定转入账户
      synchronized(target) {
        if (this.balance > amt) {
          this.balance -= amt;
          target.balance += amt;
        }
      }
    }
  }
}
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/9832934fc044414a9b998632a9f41d32.png)

### 如何预防死锁

只有以下这四个条件都发生时才会出现死锁：

- **互斥**，共享资源 X 和 Y 只能被一个线程占用；
- **占有且等待**，线程 T1 已经取得共享资源 X，在等待共享资源 Y 的时候，不释放共享资源 X；
- **不可抢占**，其他线程不能强行抢占线程 T1 占有的资源；
- **循环等待**，线程 T1 等待线程 T2 占有的资源，线程 T2 等待线程 T1 占有的资源，就是循环等待。

**也就是说只要我们破坏其中一个，就可以成功避免死锁的发生**。

**互斥**无法破坏（因为用锁就是为了互斥），其他三个条件的破坏方法：

1. 对于“**占用且等待**”，可以一次性申请所有的资源，这样就不存在等待了。
2. 对于“**不可抢占**”，占用部分资源的线程进一步申请其他资源时，如果申请不到，可以主动释放它占有的资源，这样不可抢占这个条件就破坏掉了。
3. 对于“**循环等待**”，可以靠按序申请资源来预防。所谓按序申请，是指资源是有线性顺序的，申请的时候可以先申请资源序号小的，再申请资源序号大的，这样线性化后自然就不存在循环了。

#### 破坏占用且等待条件

通过 **Allocator** 管理临界区：转账前同时申请转出和转入账户资源，成功后再锁定；执行完后释放锁并通知 Allocator 释放资源。

```java
class Allocator {
  private List<Object> als =
    new ArrayList<>();
  // 一次性申请所有资源
  synchronized boolean apply(
    Object from, Object to){
    if(als.contains(from) ||
         als.contains(to)){
      return false;
    } else {
      als.add(from);
      als.add(to);
    }
    return true;
  }
  // 归还资源
  synchronized void free(
    Object from, Object to){
    als.remove(from);
    als.remove(to);
  }
}

class Account {
  // actr 应该为单例
  private Allocator actr;
  private int balance;
  // 转账
  void transfer(Account target, int amt){
    // 一次性申请转出账户和转入账户，直到成功
    while(!actr.apply(this, target))
      ；
    try{
      // 锁定转出账户
      synchronized(this){
        // 锁定转入账户
        synchronized(target){
          if (this.balance > amt){
            this.balance -= amt;
            target.balance += amt;
          }
        }
      }
    } finally {
      actr.free(this, target)
    }
  }
}
```

上面方案的核心是忙等待：

```java
// 一次性申请转出账户和转入账户，直到成功
while(!actr.apply(this, target))
  ；
```

如果 `apply()` 耗时短且并发冲突小，此方案可行；但耗时长或并发冲突大时，忙等待会大量消耗 CPU。

更优方案：条件不满足时线程**阻塞等待**，条件满足后**通知**等待线程重新执行，避免循环等待消耗 CPU。

#### 破坏不可抢占条件

核心：占用部分资源的线程进一步申请其他资源时，若申请不到则**主动释放**已占有资源。`synchronized` 无法做到，可通过 **Lock** 接口解决。

#### 破坏循环等待条件

对资源排序后按序申请。以账户 id 为排序字段，先锁定序号小的账户，再锁定序号大的，消除循环等待。

```java
class Account {
  private int id;
  private int balance;
  // 转账
  void transfer(Account target, int amt){
    Account left = this        ①
    Account right = target;    ②
    if (this.id > target.id) { ③
      left = target;           ④
      right = this;            ⑤
    }                          ⑥
    // 锁定序号小的账户
    synchronized(left){
      // 锁定序号大的账户
      synchronized(right){
        if (this.balance > amt){
          this.balance -= amt;
          target.balance += amt;
        }
      }
    }
  }
}
```

## 用“等待-通知”机制优化循环等待

### 用 synchronized 实现等待-通知机制

Java 中等待-通知机制可通过 `synchronized` 配合 `wait()`、`notify()`、`notifyAll()` 实现。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/0aedca99c182428bba9b6b87ff2a5ced.png)

`wait()`/`notify()`/`notifyAll()` 操作的是互斥锁的等待队列，必须与 `synchronized` 锁定同一对象（如锁定 `this` 则调用 `this.wait()`），且必须在 `synchronized{}` 内部调用。否则 JVM 抛出 `java.lang.IllegalMonitorStateException`。

### 小试牛刀：一个更好地资源分配器

等待-通知机制需要考虑四个要素：

1. 互斥锁：可以用 this 作为互斥锁。
2. 线程要求的条件：转出账户和转入账户都没有被分配过。
3. 何时等待：线程要求的条件不满足就等待。
4. 何时通知：当有线程释放账户时就通知。

```java
class Allocator {
  private List<Object> als;
  // 一次性申请所有资源
  synchronized void apply(Object from, Object to){
    // 经典写法
    while(als.contains(from) ||
         als.contains(to)){
      try{
        wait();
      }catch(Exception e){
      }
    }
    als.add(from);
    als.add(to);
  }
  // 归还资源
  synchronized void free(Object from, Object to){
    als.remove(from);
    als.remove(to);
    notifyAll();
  }
}
```

### 尽量使用 notifyAll()

**`notify()` 随机通知等待队列中一个线程，`notifyAll()` 通知所有线程**。`notify()` 存在风险：可能导致某些线程永远不会被通知到，因此**尽量使用 `notifyAll()`**。

## 安全性、活跃性以及性能问题

并发编程中，需要注意三类问题：**安全性问题、活跃性问题和性能问题**。

### 安全性问题

并发安全（线程安全）的本质是**正确性**，即程序按预期执行。问题源头：**原子性、可见性、有序性**，本质是多线程同时读写共享变量。

非共享变量（`ThreadLocal`）或常量（`final`）不存在并发安全问题。共享变量在并发环境下存在**竞态条件**：

- **竞态条件（Race Condition）**：程序执行结果依赖多线程执行顺序
- **临界区（Critical Sections）**：导致竞态条件发生的代码区

解决方案：**互斥（锁）**。

### 活跃性问题

活跃性问题主要分为：

- **死锁**
- **活锁**：线程未阻塞但仍无法执行下去。解决方案：等待随机时间
- **饥饿**：线程因无法访问所需资源而无法执行。解决方案：① 保证资源充足；② 公平分配资源；③ 避免持锁线程长时间执行

### 性能问题

三个核心性能指标：

1. **吞吐量**：单位时间内处理的请求数量
2. **延迟**：发出请求到收到响应的时间
3. **并发量**：同时处理的请求数量（延迟通常基于并发量来说）

由互斥产生的阻塞影响性能，提升思路：

- **无锁化**：`ThreadLocal`、Copy-on-write、乐观锁、原子类、Disruptor
- **减少锁持有时间**：细粒度锁（如 `ConcurrentHashMap` 分段锁）、读写锁

## 管程：并发编程的万能钥匙

### 什么是管程

`synchronized` 及 `wait()`/`notify()`/`notifyAll()` 是管程的组成部分。**管程和信号量等价**，但管程更易用，Java 选择了管程。

**管程（Monitor）**：管理共享变量及其操作过程，使其支持并发。即管理类的成员变量和方法，使类是线程安全的。

### MESA 模型

Java 参考了 **MESA 模型**，内置管程对其精简：MESA 可有多个条件变量，Java 管程只有一个。

管程可解决并发领域两大核心问题：

一个是**互斥**，即同一时刻只允许一个线程访问共享资源；

一个是**同步**，即线程之间如何通信、协作。

**解决互斥**：将共享变量及其操作统一封装。线程只能通过管程提供的方法访问共享变量，管程保证互斥性。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/064d0729db5a407e80d588f32149c697.png)

**解决同步**：管程入口有**入口等待队列**，多个线程同时尝试进入时只允许一个进入，其余等待。管程内引入**条件变量**，**每个条件变量对应一个等待队列**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/98f980ca00954813bb288ab9a991ab3a.png)

## Java 线程（上）：Java 线程的生命周期

### 通用的线程生命周期

通用的线程生命周期：**初始状态、可运行状态、运行状态、休眠状态**和**终止状态**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/0925452aead94f1ba6d4e0eef210b729.png)

### Java 中线程的生命周期

Java 中线程共有六种状态：

1. NEW（初始化状态）
2. RUNNABLE（可运行 / 运行状态）
3. BLOCKED（阻塞状态）
4. WAITING（无时限等待）
5. TIMED_WAITING（有时限等待）
6. TERMINATED（终止状态）

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/d57e12e28c934036bd8c593511c545f8.png)

## Java 线程（中）：创建多少线程才是合适的？

### 为什么要使用多线程？

度量性能的核心指标：

- **延迟**：发出请求到收到响应的时间，越短性能越好
- **吞吐量**：单位时间内处理的请求数量，越大性能越好

### 多线程的应用场景

**降低延迟、提高吞吐量**有两个方向：**优化算法**和**将硬件性能发挥到极致**。

**并发编程提升性能的本质是提升 I/O 和 CPU 的利用率**。

### 创建多少线程合适？

取决于应用场景：

- **CPU 密集型**：理论上线程数 = CPU 核数，工程上一般设为 **CPU 核数 + 1**（额外线程保证阻塞时 CPU 利用率）
- **I/O 密集型**：最佳线程数与 CPU 计算和 I/O 操作的耗时比相关：

> 最佳线程数 = CPU 核数 × [ 1 + (I/O 耗时 / CPU 耗时) ]

## Java 线程（下）：为什么局部变量是线程安全的？

### 方法是如何被执行的

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/723a39fae7854d69aee28e0440d60a63.png)

CPU 通过**堆栈寄存器**找到方法参数和返回地址。这个栈与方法调用相关，称为**调用栈**。

每个方法在调用栈中有独立空间（**栈帧**），包含参数和返回地址。方法调用时创建新栈帧压入调用栈，方法返回时栈帧弹出。**栈帧和方法同生共死**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/04da5269c8de49708cd349b67c80a4b3.png)

### 局部变量存哪里？

局部变量作用域在方法内部，与方法同生共死，因此**局部变量存放在调用栈的栈帧中**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/ba943afdb47b41e388b7e86a26fce8a6.png)

### 调用栈与线程

**每个线程都有自己独立的调用栈**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/e023266be34041fa9440fe953cb25ef1.png)

每个线程有自己的调用栈，局部变量保存在各自调用栈中，不共享，自然无并发问题。**没有共享，就没有伤害**。

### 线程封闭

局部变量不与其他线程共享，因此无并发问题。这个思路在并发编程中称为**线程封闭**：**仅在单线程内访问数据**，不存在共享则无需同步。典型案例：数据库连接池中的 `Connection`。

## 如何用面向对象思想写好并发程序？

### 一、封装共享变量

**将共享变量作为对象属性封装在内部，对所有公共方法制定并发访问策略**。不变的共享变量建议用 `final` 修饰。

### 二、识别共享变量间的约束条件

**约束条件决定了并发访问策略**。约束条件反映在代码中通常有 `if` 语句，需特别注意竞态条件。

### 三、制定并发访问策略

1. **避免共享**：线程本地存储、为每个任务分配独立线程
2. **不变模式**：Actor 模式、CSP 模式、函数式编程的基础
3. **管程及同步工具**：管程是通用方案；特定场景可用读写锁、并发容器等

## 理论基础总结

核心矛盾：**CPU 与内存、I/O 的速度差异**。系统软件在解决此矛盾时引入了**可见性、原子性、有序性**问题。

- **Java 内存模型**：应对可见性和有序性问题
- **互斥锁**：应对原子性问题（可能带来死锁）
- **管程**：并发编程的万能钥匙，解决互斥和同步两大核心问题

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/92dfec54fa6b4735b8f15ae463c96d3f.png)

## 参考资料

- [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901)
