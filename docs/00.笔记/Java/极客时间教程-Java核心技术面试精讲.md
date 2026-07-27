---
title: 《极客时间教程 - Java 核心技术面试精讲》笔记
date: 2024-09-22 18:33:35
categories:
  - 笔记
  - Java
tags:
  - Java
  - 面试
permalink: /pages/594c44fb/
---

# 《极客时间教程 - Java 核心技术面试精讲》笔记

## 开篇词 以面试题为切入点，有效提升你的 Java 内功

略

## 谈谈你对 Java 平台的理解？

Java 最显著的特性：

- “**书写一次，到处运行**”（Write once, run anywhere）——跨平台
- **垃圾收集**（GC, Garbage Collection）——回收、分配内存

Java 既是解释型语言，又是编译型语言。

## Exception 和 Error 有什么区别？

Exception 和 Error 都继承 `Throwable`，只有 `Throwable` 实例可被抛出或捕获。

Exception 是程序正常运行中，可以预料的意外情况，可能并且应该被捕获，进行相应处理。

Error 指正常情况下不大可能出现的情况（如 `OutOfMemoryError`），不便于也不需要捕获。

Exception 分为：
- **checked 异常**：必须显式捕获处理（编译期检查）
- **unchecked 异常**：运行时异常（如 `NullPointerException`）

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/3cee3bfba34448179b03f33919450756.png)

**理解 Throwable、Exception、Error 的设计分类**。了解 `try/catch/finally`、`try-with-resource`、`throw/throws` 等机制。

实践要点：
- 尽量不要捕获 `Exception`/`Throwable`/`Error`
- 不要生吞异常
- 不要使用 `e.printStackTrace()`（输出到标准错误流，难以追踪）

## 谈谈 final、finally、finalize 有什么不同？

- **final**：修饰类（不可继承）、方法（不可重写）、变量（不可重新赋值）
- **finally**：保证重点代码一定被执行的机制（如关闭 JDBC 连接、unlock 锁）
- **finalize**：`Object` 类方法，设计目的是垃圾收集前回收资源。**已不推荐**，JDK 9 标记 deprecated，可能导致对象经过多个 GC 周期才能回收

**final 不等于 Immutable！**

```java
 final List<String> strList = new ArrayList<>();
 strList.add("Hello");
 strList.add("world");
 List<String> unmodifiableStrList = List.of("hello", "world");
 unmodifiableStrList.add("again");
```

final 只能约束 strList 这个引用不可以被赋值，但是 strList 对象行为不被 final 影响，添加元素等操作是完全正常的。

要实现 Immutable，需要将类和类中的所有成员变量都定义为 final，并且只允许存在只读方法。

## 强引用、软引用、弱引用、幻象引用有什么区别？

不同引用类型体现**对象不同的可达性状态和对 GC 的影响**：

- **强引用（Strong Reference）** - 被强引用关联的对象不会被垃圾收集器回收。
- **软引用（Soft Reference）** - 被软引用关联的对象，只有在内存不够的情况下才会被回收。
- **弱引用（Weak Reference）** - 被弱引用关联的对象一定会被垃圾收集器回收，也就是说它只能存活到下一次垃圾收集发生之前。
- **虚引用（Phantom Reference）** - 又称为幻象引用或幽灵引用。为一个对象设置虚引用关联的唯一目的就是能在这个对象被收集器回收时收到一个系统通知。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用取得一个对象实例。

## String、StringBuffer、StringBuilder 有什么区别？

- **String**：Immutable 类，`final class`，拼接等操作会产生新对象
- **StringBuffer**：线程安全的 String 工具类
- **StringBuilder**：与 StringBuffer 功能近似，去掉了 `synchronized` 锁，开销更小

**字符串拼接“+”的实现原理**：
- JDK 8：编译为 `StringBuilder.append()` 调用
- JDK 9：改为 `makeConcatWithConstants()` 动态方法，减少部分临时对象
- **循环中拼接仍应使用 `StringBuilder`**，编译器不会复用

```java
public class StringConcat {
     public static String concat(String str) {
       return str + “aa” + “bb”;
     }
}
```

先编译再反编译，比如使用不同版本的 JDK：

```java
${JAVA_HOME}/bin/javac StringConcat.java
${JAVA_HOME}/bin/javap -v StringConcat.class
```

JDK 8 的输出片段是：

```java
         0: new           #2                  // class java/lang/StringBuilder
         3: dup
         4: invokespecial #3                  // Method java/lang/StringBuilder."<init>":()V
         7: aload_0
         8: invokevirtual #4                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        11: ldc           #5                  // String aa
        13: invokevirtual #4                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        16: ldc           #6                  // String bb
        18: invokevirtual #4                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
        21: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
```

而在 JDK 9 中，反编译的结果就会有点特别了，片段是：

```java
         // concat method
         1: invokedynamic #2,  0              // InvokeDynamic #0:makeConcatWithConstants:(Ljava/lang/String;)Ljava/lang/String;

         // ...
         // 实际是利用了 MethodHandle, 统一了入口
         0: #15 REF_invokeStatic java/lang/invoke/StringConcatFactory.makeConcatWithConstants:(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/invoke/CallSite;
```

字符串对象通过“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

不过，在循环内使用“+”进行字符串的拼接的话，存在比较明显的缺陷：**编译器不会创建单个 `StringBuilder` 以复用，会导致创建过多的 `StringBuilder` 对象**。

在 JDK 9 中，字符串相加“+”改为用动态方法 `makeConcatWithConstants()` 来实现，通过提前分配空间从而减少了部分临时对象的创建。然而这种优化主要针对简单的字符串拼接，如： `a+b+c` 。对于循环中的大量拼接操作，仍然会逐个动态分配内存（类似于两个两个 append 的概念），并不如手动使用 StringBuilder 来进行拼接效率高。

**String 内部存储从 `char[]` 改为 `byte[]`**（JDK 9 Compact Strings）：拉丁语系字符只需 1 字节，引入 `coder` 标识编码，**更小的内存占用、更快的操作速度**。

## 动态代理是基于什么原理？

通过反射可以直接操作类或对象（获取属性、方法、调用方法、构造对象等）。

反射工具类：`Class`、`Field`、`Method`、`Constructor` 等（`java.lang.reflect` 包）。

`AccessibleObject.setAccessible(boolean)` 可在运行时修改成员访问限制。

**动态代理**：运行时动态构建代理、处理代理方法调用的机制。应用：RPC 调用、AOP 等。

实现方式：JDK 动态代理、ASM、cglib、Javassist。

## int 和 Integer 有什么区别？

**自动装箱/拆箱**是语法糖：装箱 → `Integer.valueOf()`，拆箱 → `Integer.intValue()`。应尽量避免，尤其性能敏感场景。

```java
Integer integer = 1;
int unboxing = integer++;
```

反编译输出：

```java
1: invokestatic  #2                  // Method
java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
8: invokevirtual #3                  // Method
java/lang/Integer.intValue:()I
```

应尽量避免自动装箱、拆箱行为，尤其是性能敏感的场景。

**包装类缓存机制**（享元模式）：
- `Byte`/`Short`/`Integer`/`Long`：缓存 `[-128, 127]`
- `Character`：缓存 `[0, 127]`
- `Boolean`：直接返回 `TRUE`/`FALSE`

Long 缓存源码：

```java
public static Long valueOf(long l) {
    final int offset = 128;
    if (l >= -128 && l <= 127) { // will cache
        return LongCache.cache[(int)l + offset];
    }
    return new Long(l);
}

private static class LongCache {
    private LongCache(){}

    static final Long cache[] = new Long[-(-128) + 127 + 1];

    static {
        for(int i = 0; i < cache.length; i++)
            cache[i] = new Long(i - 128);
    }
}
```

Java 对于自动装箱和拆箱的设计，依赖于一种叫做享元模式的设计模式。

## 对比 Vector、ArrayList、LinkedList 有何区别？

- **Vector**：线程安全的动态数组，同步有额外开销，扩容时容量翻倍
- **ArrayList**：应用最广的动态数组，非线程安全，扩容时增加 50%
- **LinkedList**：双向链表，非线程安全，无需调整容量

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/136bb4a67cab4f5baaea48112065a410.png)

## 对比 Hashtable、HashMap、TreeMap 有什么不同？

- **Hashtable**：同步的哈希表，不支持 null 键/值，已很少推荐
- **HashMap**：非同步，支持 null 键/值，`put`/`get` 达到常数时间性能，**是键值对存取的首选**
- **TreeMap**：基于红黑树，顺序访问，`O(logN)` 复杂度
- **LinkedHashMap**：维护双向链表，遍历顺序符合插入顺序

**HashMap `hashCode`/`equals` 约定**：
- `equals` 相等 → `hashCode` 必须相等
- 重写 `hashCode` 必须重写 `equals`
- `hashCode` 需保持一致性

HashMap 源码关键点：**容量（capacity）**、**负载系数（load factor）**、**树化**。

## 如何保证集合是线程安全的 ConcurrentHashMap 如何实现高效地线程安全？

### ConcurrentHashMap JDK7 实现

基于**分离锁（Segment）**：内部为 `HashEntry` 数组，哈希相同以链表存放。`HashEntry` 的 `value` 为 `volatile`，用 `Unsafe` 直接完成部分操作优化性能。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/07cc5a8554b84331abe13957c9b2ddc6.png)

```java
public V get(Object key) {
        Segment<K,V> s; // manually integrate access methods to reduce overhead
        HashEntry<K,V>[] tab;
        int h = hash(key.hashCode());
       //利用位操作替换普通数学运算
       long u = (((h >>> segmentShift) & segmentMask) << SSHIFT) + SBASE;
        // 以 Segment 为单位，进行定位
        // 利用 Unsafe 直接进行 volatile access
        if ((s = (Segment<K,V>)UNSAFE.getObjectVolatile(segments, u)) != null &&
            (tab = s.table) != null) {
           //省略
          }
        return null;
    }
```

而对于 put 操作，首先是通过二次哈希避免哈希冲突，然后以 Unsafe 调用方式，直接获取相应的 Segment，然后进行线程安全的 put 操作：

```java
 public V put(K key, V value) {
        Segment<K,V> s;
        if (value == null)
            throw new NullPointerException();
        // 二次哈希，以保证数据的分散性，避免哈希冲突
        int hash = hash(key.hashCode());
        int j = (hash >>> segmentShift) & segmentMask;
        if ((s = (Segment<K,V>)UNSAFE.getObject          // nonvolatile; recheck
             (segments, (j << SSHIFT) + SBASE)) == null) //  in ensureSegment
            s = ensureSegment(j);
        return s.put(key, hash, value, false);
    }
```

其核心逻辑实现在下面的内部方法中：

```java
final V put(K key, int hash, V value, boolean onlyIfAbsent) {
            // scanAndLockForPut 会去查找是否有 key 相同 Node
            // 无论如何，确保获取锁
            HashEntry<K,V> node = tryLock() ? null :
                scanAndLockForPut(key, hash, value);
            V oldValue;
            try {
                HashEntry<K,V>[] tab = table;
                int index = (tab.length - 1) & hash;
                HashEntry<K,V> first = entryAt(tab, index);
                for (HashEntry<K,V> e = first;;) {
                    if (e != null) {
                        K k;
                        // 更新已有 value...
                    }
                    else {
                        // 放置 HashEntry 到特定位置，如果超过阈值，进行 rehash
                        // ...
                    }
                }
            } finally {
                unlock();
            }
            return oldValue;
        }
```

并发写操作要点：
- 获取 `ReentrantLock`（Segment 基于其扩展实现）
- 重复扫描、检测冲突是常见技巧
- 扩容仅对单个 Segment 进行

### ConcurrentHashMap JDK8 实现

关键变化：
- Segment 仅保留用于序列化兼容，不再作为结构组件
- 初始化改为 **lazy-load**，避免初始开销
- 数据存储利用 `volatile` 保证可见性
- 使用 **CAS** 无锁并发操作
- 使用 `Unsafe`、`LongAdder` 等底层优化

```java
 static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        volatile V val;
        volatile Node<K,V> next;
        // …
    }
```

并发的 `put` 实现：bin 为空时 CAS 插入，`MOVED` 时帮助转移，`synchronized` 细粒度同步修改，超过阈值时树化：

```java
final V putVal(K key, V value, boolean onlyIfAbsent) { if (key == null || value == null) throw new NullPointerException();
    int hash = spread(key.hashCode());
    int binCount = 0;
    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh; K fk; V fv;
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            // 利用 CAS 去进行无锁线程安全操作，如果 bin 是空的
            if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value)))
                break;
        }
        else if ((fh = f.hash) == MOVED)
            tab = helpTransfer(tab, f);
        else if (onlyIfAbsent // 不加锁，进行检查
                 && fh == hash
                 && ((fk = f.key) == key || (fk != null && key.equals(fk)))
                 && (fv = f.val) != null)
            return fv;
        else {
            V oldVal = null;
            synchronized (f) {
                   // 细粒度的同步修改操作。..
                }
            }
            // Bin 超过阈值，进行树化
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD)
                    treeifyBin(tab, i);
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    addCount(1L, binCount);
    return null;
}
```

`initTable`：典型 CAS 场景，利用 `volatile` 的 `sizeCtl` 互斥，竞争时 spin 等待：

```java
private final Node<K,V>[] initTable() {
    Node<K,V>[] tab; int sc;
    while ((tab = table) == null || tab.length == 0) {
        // 如果发现冲突，进行 spin 等待
        if ((sc = sizeCtl) < 0)
            Thread.yield();
        // CAS 成功返回 true，则进入真正的初始化逻辑
        else if (U.compareAndSetInt(this, SIZECTL, sc, -1)) {
            try {
                if ((tab = table) == null || tab.length == 0) {
                    int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                    @SuppressWarnings("unchecked")
                    Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                    table = tab = nt;
                    sc = n - (n >>> 2);
                }
            } finally {
                sizeCtl = sc;
            }
            break;
        }
    }
    return tab;
}
```

## Java 提供了哪些 IO 方式？ NIO 如何实现多路复用？

- **BIO**（`java.io`）：同步阻塞流模型，`InputStream`/`OutputStream`、`Reader`/`Writer`
- **NIO**（JDK 1.4，`java.nio`）：同步非阻塞，核心组件：
  - `Buffer`：高效数据容器
  - `Channel`：文件描述符抽象，支持批量 IO
  - `Selector`：多路复用基础，单线程管理多 Channel（Linux 依赖 `epoll`，Windows AIO 依赖 `iocp`）
- **NIO2/AIO**（JDK 7）：异步非阻塞，基于事件和回调机制

## Java 有几种文件拷贝方式？哪一种最高效？

字节流方式：

```java
public static void copyFileByStream(File source, File dest) throws
        IOException {
    try (InputStream is = new FileInputStream(source);
         OutputStream os = new FileOutputStream(dest);){
        byte[] buffer = new byte[1024];
        int length;
        while ((length = is.read(buffer)) > 0) {
            os.write(buffer, 0, length);
        }
    }
 }
```

NIO 方式：

```java
public static void copyFileByChannel(File source, File dest) throws
        IOException {
    try (FileChannel sourceChannel = new FileInputStream(source)
            .getChannel();
         FileChannel targetChannel = new FileOutputStream(dest).getChannel
                 ();){
        for (long count = sourceChannel.size() ;count>0 ;) {
            long transferred = sourceChannel.transferTo(
                    sourceChannel.position(), count, targetChannel);            sourceChannel.position(sourceChannel.position() + transferred);
            count -= transferred;
        }
    }
 }
```

**考点**：不同 copy 方式底层机制区别、零拷贝原理、Buffer 分类、`Direct Buffer` 对 GC 的影响。

**零拷贝（zero-copy）**：基于 NIO `transferTo`，在 Linux/Unix 上数据传输不需要用户态参与，省去上下文切换和不必要的内存拷贝。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/bc9ed06c2cab4a22896ecc3ce741aff4.png)

基于 NIO transferTo 的实现方式，在 Linux 和 Unix 上，则会使用到零拷贝技术，数据传输并不需要用户态参与，省去了上下文切换的开销和不必要的内存拷贝，进而可能提高应用拷贝性能。注意，transferTo 不仅仅是可以用在文件拷贝中，与其类似的，例如读取磁盘文件，然后进行 Socket 发送，同样可以享受这种机制带来的性能和扩展性提高。

transferTo 的传输过程是：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/b16b09e5cd29479ca8709cea08bd2dac.png)

## 谈谈接口和抽象类有什么区别？

- **接口**：行为抽象，不能实例化，成员均为 `public static final`，Java 8+ 支持 `default method`
- **抽象类**：`abstract` 修饰，不可实例化，主要用于代码重用
- Java **不支持多继承**，但可通过接口实现多实现
- **functional interface**：只有一个抽象方法的接口（如 `Runnable`、`Callable`）

面向对象设计：

- **封装**的目的是隐藏事务内部的实现细节，以便提高安全性和简化编程。封装提供了合理的边界，避免外部调用者接触到内部的细节。
- **继承**是代码复用的基础机制，但要注意，继承可以看作是非常紧耦合的一种关系，父类代码修改，子类行为也会变动。在实践中，过度滥用继承，可能会起到反效果。
- **多态**，你可能立即会想到重写（override）和重载（overload）、向上转型。简单说，重写是父子类中相同名字和参数的方法，不同的实现；重载则是相同名字的方法，但是不同的参数。

**面向对象设计原则（SOLID）**：
- **单一职责**：类/对象只有单一职责
- **开闭原则**：对扩展开放，对修改关闭
- **里氏替换**：子类可替换父类
- **接口分离**：避免定义过多方法的接口
- **依赖反转**：依赖抽象而非实现

## 谈谈你知道的设计模式？

- **创建型**：Factory、Abstract Factory、Singleton、Builder、ProtoType
- **结构型**：Bridge、Adapter、Decorator、Proxy、Composite、Facade、Flyweight
- **行为型**：Strategy、Interpreter、Command、Observer、Iterator、Template Method、Visitor

## synchronized 和 ReentrantLock 有什么区别呢？

语义基本相同，差异：

| 特性 | `synchronized` | `ReentrantLock` |
|------|----------------|------------------|
| 获取/释放锁 | JVM 自动控制 | 需手动 `lock()`/`unlock()` |
| 响应中断 | 不支持 | 支持 |
| 超时机制 | 无 | 支持 `tryLock(timeout)` |
| 公平锁 | 仅非公平 | 支持公平/非公平 |
| 共享 | 独享 | 可基于 `Condition` 灵活控制 |

## synchronized 底层如何实现？什么是锁的升级、降级？

`synchronized` 代码块由 `monitorenter`/`monitorexit` 指令实现。JDK6 后大量优化，性能与 `ReentrantLock` 基本持平。

**Mark Word** 记录对象和锁信息，64 位 JVM 存储结构：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/a2dc15c84410441883de9c6ccf8d57ae.png)

锁升级依赖 Mark Word 中的锁标志位。`synchronized` 四个状态：

- **无锁状态** → **偏向锁**（CAS 设置线程 ID，无竞争开销） → **轻量级锁**（CAS 操作 Mark Word，失败则升级） → **重量级锁**

## 一个线程两次调用 start() 方法会出现什么情况？

**不允许**，第二次调用必然抛出 `IllegalThreadStateException`。

线程是系统调度最小单元，有自己的栈、寄存器、本地存储，与同进程线程共享文件描述符、虚拟地址空间等。

JDK 线程实现是一对一映射到内核线程（JNI 调用本地代码），Java 也在 [Loom](http://openjdk.java.net/projects/loom/) 项目中开发轻量级用户线程（Fiber）。

### 线程生命周期

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/08/bbb471da0cb743b088dc9fe58ec57993.png)

`Thread.State` 定义 **6 种**状态：

| 状态 | 含义 | 进入/退出 |
|------|------|----------|
| **NEW** | 未调用 `start()` | 调用 `start()` |
| **RUNNABLE** | 已准备好，等待 CPU 时间片 | - |
| **BLOCKED** | 等待 `synchronized` 隐式锁 | 获得锁时恢复 |
| **WAITING** | 无限期等待 | `wait()`/`join()`/`park()` → `notify()`/`unpark()` |
| **TIMED_WAITING** | 等待指定时间 | `sleep(ms)`/`wait(ms)`/`join(ms)`/`parkNanos()` |
| **TERMINATED** | `run()` 执行完毕或异常退出 | 不可复生 |

## 什么情况下 Java 程序会产生死锁？如何定位、修复？

### 什么是死锁

**死锁**：一组互相竞争资源的线程因互相等待，导致“永久”阻塞。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/6798886d8aeb40f192444cbd16c7a16d.png)

### 如何检测死锁

1. `jps` 或 `ps` 确定进程 ID
2. `jstack <pid>` 获取线程栈
3. 找 `BLOCKED` 状态线程，按等待的锁 ID 查找

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/8ebbc0b9b0634e4eb0073b73a5583c37.png)

最后，结合代码分析线程栈信息。上面这个输出非常明显，找到处于 BLOCKED 状态的线程，按照试图获取（waiting）的锁 ID（请看我标记为相同颜色的数字）查找，很快就定位问题。 jstack 本身也会把类似的简单死锁抽取出来，直接打印出来。

识别死锁：**区分线程状态 → 查看等待目标 → 对比 Monitor 持有状态**

### 如何避免死锁

死锁四个必要条件（破坏任一即可避免）：

1. **互斥**：无法破坏
2. **占有且等待**：一次性申请所有资源
3. **不可抢占**：申请不到则主动释放
4. **循环等待**：按序申请资源

## Java 并发包提供了哪些并发工具类？

J.U.C 提供：
- **同步结构**：`CountDownLatch`、`CyclicBarrier`、`Semaphore` 等
- **线程安全容器**：`ConcurrentHashMap`、`ConcurrentSkipListMap`、`CopyOnWriteArrayList`
- **并发队列**：`ArrayBlockingQueue`、`SynchronousQueue`、`PriorityBlockingQueue`
- **Executor 框架**：线程池、任务调度

## 并发包中的 ConcurrentLinkedQueue 和 LinkedBlockingQueue 有什么区别？

- **Concurrent** 类型：基于 lock-free，高吞吐
- **LinkedBlockingQueue**：基于锁，提供 `BlockingQueue` 等待方法

三类线程安全容器对比：
- **Concurrent\***：较轻的修改开销，但弱一致性（迭代器不抛 `ConcurrentModificationException`，`size()` 不精确）
- **CopyOnWrite**：较重的修改开销，强一致性
- **Blocking\***：基于锁实现

下面这张图是 Java 并发类库提供的各种各样的**线程安全**队列实现，注意，图中并未将非线程安全部分包含进来。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/6cd6c830873d4303bd935859c9db5060.png)

我们可以从不同的角度进行分类，从基本的数据结构的角度分析，有两个特别的 [Deque](https://docs.oracle.com/javase/9/docs/api/java/util/Deque.html) 实现，ConcurrentLinkedDeque 和 LinkedBlockingDeque。Deque 的侧重点是支持对队列头尾都进行插入和删除，所以提供了特定的方法，如：

- 尾部插入时需要的 [addLast(e)](https://docs.oracle.com/javase/9/docs/api/java/util/Deque.html#addLast-E-)、[offerLast(e)](https://docs.oracle.com/javase/9/docs/api/java/util/Deque.html#offerLast-E-)。
- 尾部删除所需要的 [removeLast()](https://docs.oracle.com/javase/9/docs/api/java/util/Deque.html#removeLast--)、[pollLast()](https://docs.oracle.com/javase/9/docs/api/java/util/Deque.html#pollLast--)。

有界/无界队列：
- **ArrayBlockingQueue**：有界，需指定容量
- **LinkedBlockingQueue**：默认无界（`Integer.MAX_VALUE`）
- **SynchronousQueue**：容量为 0，每个删除等待插入，反之亦然
- **PriorityBlockingQueue**：无界优先队列
- **DelayedQueue**、**LinkedTransferQueue**：无界

如果我们分析不同队列的底层实现，BlockingQueue 基本都是基于锁实现。

## Java 并发类库提供的线程池有哪几种？ 分别有什么特点？

`Executors` 提供 5 种线程池：

| 类型 | 特点 |
|------|------|
| **CachedThreadPool** | 缓存线程并重用，空闲 60s 终止，使用 `SynchronousQueue` |
| **FixedThreadPool** | 固定数目线程，使用无界队列 |
| **SingleThreadExecutor** | 单线程，保证顺序执行 |
| **ScheduledThreadPool** | 定时/周期性调度 |
| **WorkStealingPool** (JDK 8+) | `ForkJoinPool`，Work-Stealing 并行处理 |

Executor 框架核心组件：
- `Executor`：任务提交与执行解耦
- `ExecutorService`：管理服务（shutdown）+ 提交任务返回 `Future`
- 工作队列（`BlockingQueue`）+ 线程池（`HashSet<Worker>`）+ `ThreadFactory` + 拒绝策略

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/16b1d777a7704a07b5b1adabf49d18dd.png)

## AtomicInteger 底层实现原理是什么？如何在自己的产品代码中应用 CAS 操作？

原子类基于 **CAS**（compare-and-swap）技术，依赖 `Unsafe` 底层能力。

CAS 问题：
- 并发冲突频繁时反复自旋重试，消耗 CPU
- **ABA 问题**：通过 `AtomicStampedReference` 解决（增加版本号）

AQS 核心：
- `volatile int state`：状态量
- FIFO 等待队列：多线程竞争和等待
- CAS 基础操作 + `acquire`/`release` 方法

`ReentrantLock` 通过扩展 AQS 的 `Sync` 实现 `lock()`/`unlock()`：

## 请介绍类加载过程，什么是双亲委派模型？

类加载过程：
1. **加载**：读取字节码，映射为 Class 对象
2. **链接**：验证 → 准备（初始化静态变量） → 解析（符号引用→直接引用）
3. **初始化**：执行静态字段赋值和静态初始化块

**双亲委派模型**：
- **Bootstrap**：加载 `/jre/lib`
- **Ext**：加载 `/jre/lib/ext`
- **App**：加载 classpath

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/106a18ac60c04b6b842919122e12f2fa.png)

三个基本特征：
1. **双亲委派**（例外：JNDI/JDBC 等用上下文加载器）
2. **可见性**：子可访问父，反之不可
3. **单一性**：父加载过的类型子不重复加载（但“邻居”间可重复）

**JDK 9 模块化变化**：
- 引入 JPMS，`-Xbootclasspath` 不可用，用 `--patch-module` 替代
- 扩展类加载器重命名为**平台类加载器**，extension 机制移除
- `rt.jar`、`tools.jar` 移除，用 jimage + JRT 文件系统
- 增加 **Layer** 抽象，支持容器式逻辑隔离

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/0b33a67fc0164eae809398da176d105a.png)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/79ca95e2e2924810bc39be9750dbeb0e.png)

## 有哪些方法可以在运行时动态生成一个 Java 类？

利用字节码操纵工具：[ASM](https://asm.ow2.io/)、[Javassist](http://www.javassist.org/)、cglib 等。

类从字节码到 Class 对象的转换通过 `defineClass` 方法（本地实现）。

```java
protected final Class<?> defineClass(String name, byte[] b, int off, int len,
                                   ProtectionDomain protectionDomain)
protected final Class<?> defineClass(String name, java.nio.ByteBuffer b,
                                   ProtectionDomain protectionDomain)
```

JDK 提供的 defineClass 方法，最终都是本地代码实现的。

```java
static native Class<?> defineClass1(ClassLoader loader, String name, byte[] b, int off, int len,
                                  ProtectionDomain pd, String source);

static native Class<?> defineClass2(ClassLoader loader, String name, java.nio.ByteBuffer b,
                                  int off, int len, ProtectionDomain pd,
                                  String source);
```

## 谈谈 JVM 内存区域的划分，哪些区域可能发生 OutOfMemoryError

| 区域 | 说明 | 共享 |
|------|------|------|
| **程序计数器** | 存储当前方法的 JVM 指令地址 | 线程私有 |
| **虚拟机栈** | 栈帧对应方法调用，含局部变量表、操作数栈等 | 线程私有 |
| **堆** | Java 对象实例，GC 核心区域（新生代/老年代） | 共享 |
| **方法区** | 元数据、运行时常量池（JDK 8+ 为 Metaspace） | 共享 |
| **本地方法栈** | 支持本地方法调用 | 线程私有 |

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/320ac2d1591247e398905c54334abcfd.png)

**OOM 场景**：
- **Java heap space**：堆空间溢出
- **GC overhead limit exceeded**：98% 时间做 GC 回收不到 2% 堆内存
- **PermGen/Metaspace space**：加载过多类
- **Unable to create new native thread**：线程数达上限
- **直接内存溢出**：Heap Dump 文件很小，程序使用了 `DirectMemory`

## 如何监控和诊断 JVM 堆内和堆外内存使用？

常用工具：`jps`（查看 JVM 进程）、`jstat`（统计信息）、`jmap`（堆快照）、`jhat`（分析 dump）、`jstack`（线程快照）、`jinfo`（运行参数）、`JConsole`/`VisualVM`（可视化）、`MAT`（内存分析）、`JMC`（JMX + JFR）

堆结构示意图。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/642503fd93674890b7648563f12a72f1.png)

### 年轻代

大部分对象创建和销毁的区域。内部分为：
- **Eden**：对象初始分配区域
- **Survivor**（from/to）：放置 Minor GC 中存活对象

**TLAB**（Thread Local Allocation Buffer）：每个线程的私有缓存区域，避免多线程分配内存时的加锁开销。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/3298c6093e2245059c160962837453d8.png)

### 老年代

放置长生命周期对象。对象太大无法在新生代找到连续空间时，JVM 直接分配到老年代。

### 永久代

早期 Hotspot JVM 的方法区实现，JDK 8 后改为 Metaspace。

### JVM 参数

- `-Xmx`：最大堆体积
- `-Xms`：初始最小堆体积
- `-XX:NewRatio`：老年代:新生代比例（默认 2，即新生代占 1/3）
- `-XX:NewSize`：直接指定新生代大小
- `-XX:SurvivorRatio`：Eden:Survivor 比例（默认 8，Survivor 占新生代 1/10）

## Java 常见的垃圾收集器有哪些？

### 垃圾收集器

| 收集器 | 特点 |
|--------|------|
| **Serial GC** | 单线程，Stop-The-World，Client 模式默认 |
| **ParNew GC** | Serial 的多线程版，配合 CMS |
| **CMS** | 标记-清除算法，低停顿，有内存碎片 |
| **Parallel GC** | 吞吐量优先，JDK 8 Server 默认 |
| **G1 GC** | 兼顾吞吐量和停顿，JDK 9+ 默认 |

### 对象回收算法

- **引用计数法**：循环引用无法处理
- **可达性分析法**：以 GC Roots 为起点，不可达则可回收

### 垃圾收集算法

- **标记-复制**：内存分两块，存活对象复制到另一块（利用 CoW）
- **标记-清除**：标记后清除，产生碎片
- **标记-整理**：存活对象向一端移动，清理边界外内存

### 垃圾收集过程

1. Eden 达阈值触发 **Minor GC**，存活对象复制到 Survivor

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/4bb48732229c4ab4b5aa7e05827e4af4.png)

2. 再次 Minor GC，存活对象从 Eden+from 复制到 to，年龄 +1

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/1dc071d638a2419480412be20d3d027b.png)

3. 多次 Minor GC 后，年龄达阈值触发**晋升（Promotion）**到老年代（`-XX:MaxTenuringThreshold=<N>`）

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/f57a3e07b4b54da4849c1e325ec22eb0.png)

4. 老年代 GC（**Major GC**），标记-整理防止碎片化

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/b2706611416c4c10825599eb9b28f3f7.png)

通常我们把老年代 GC 叫作 Major GC，将对整个堆进行的清理叫作 Full GC，但是这个也没有那么绝对，因为不同的老年代 GC 算法其实表现差异很大，例如 CMS，“concurrent”就体现在清理工作是与工作线程一起并发运行的。

## 谈谈你的 GC 调优思路

**GC 调优思路**（关注内存占用/延时/吞吐量）：
1. 确定调优目标（如 GC 暂停 < 200ms）
2. 通过 `jstat`、GC 日志等定位问题
3. 评估 GC 类型是否匹配应用特征
4. 调整参数或配置
5. 验证是否达标

### G1 GC 机制

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/663c6a9886f445e795916b9f35de340a.png)

G1 将堆划分为大小相等的 **region**（1M~32M，约 2048 个）：
- **Eden region**、**Survivor region**、**Old region**
- **Humongous**：超过 region 50% 的大对象，逻辑上属于老年代

G1 算法：新生代用并行复制（仍会 STW），老年代主要并发标记，整理随新生代 GC 捎带进行。

## Java 内存模型中的 happen-before 是什么？

**Happens-Before**：JMM 定义的偏序关系，**前面操作的结果对后续操作可见**。

规则：
1. **程序顺序规则**：同线程内前面操作 HB 后续
2. **锁定规则**：`unlock` HB 后续同锁的 `lock`
3. **volatile 规则**：写 HB 后续读
4. **线程启动规则**：`start()` HB 线程每个动作
5. **线程终止规则**：所有操作 HB 终止检测
6. **线程中断规则**：`interrupt()` HB 中断检测
7. **对象终结规则**：初始化 HB `finalize()`
8. **传递性**：A HB B，B HB C → A HB C

## Java 程序运行在 Docker 等容器环境有哪些新问题？

Docker 是轻量级**隔离**技术（非完全虚拟化），通过 namespace 隔离，CGroup 管理资源。

虽然看起来 Docker 之类容器和虚拟机非常相似，都是提供一个独立隔离的运行环境，但是 Docker 并不是一种完全的虚拟化技术，而更是一种轻量级的隔离技术。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/0bdf5a8b40594a61afdc1e72eb1084ed.png)

问题：JVM 检测到的内存/CPU 可能基于宿主机而非容器，导致默认参数不当（堆过大、GC 线程过多）。

解决：**升级 JDK 10+**（自适应容器资源限制），或 JDK 8u131+ 使用实验性参数。

## 你了解 Java 应用开发中的注入攻击吗？

注入攻击特征：攻击者将不可信动态内容注入程序并执行，改变执行过程。

类型：**SQL 注入**、**系统命令注入**、**XML 注入**

## 如何写出安全的 Java 代码？

略

## 后台服务出现明显"变慢"，谈谈你的诊断思路？

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/daed1ac83df741adbfadfdcde6c9f3ee.png)

## 有人说“Lambda 能让 Java 程序慢 30 倍”，你怎么看？

Lambda/Stream 版本比传统 for-each 慢，**主要开销源于自动装箱/拆箱**，而非 Lambda 本身。

额外开销：**初始化开销**——首次调用需构建 `CallSite` 实例，影响启动速度。

```java
// 一个大的 ArrayList，内部是随机的整形数据
volatile List<Integer> integers = …

// 基准测试 1
public int forEachLoopMaxInteger() {
   int max = Integer.MIN_VALUE;
   for (Integer n : integers) {
    max = Integer.max(max, n);
   }
   return max;
}

// 基准测试 2
public int lambdaMaxInteger() {
   return integers.stream().reduce(Integer.MIN_VALUE, (a, b) -> Integer.max(a, b));
}
```

以上代码片段更多的开销是源于自动装箱、拆箱（auto-boxing/unboxing），而不是源自 Lambda 和 Stream。

一般来说，可以认为 Lambda/Stream 提供了与传统方式接近对等的性能，但是如果对于性能非常敏感，就不能完全忽视它在特定场景的性能差异了，例如：**初始化的开销**。 Lambda 并不算是语法糖，而是一种新的工作机制，在首次调用时，JVM 需要为其构建 [CallSite](https://docs.oracle.com/javase/8/docs/api/java/lang/invoke/CallSite.html) 实例。这意味着，如果 Java 应用启动过程引入了很多 Lambda 语句，会导致启动过程变慢。其实现特点决定了 JVM 对它的优化可能与传统方式存在差异。

## JVM 优化 Java 代码时都做了什么？

略

## 谈谈 MySQL 支持的事务隔离级别，以及悲观锁和乐观锁的原理和应用场景？

MySQL InnoDB 基于 MVCC + 锁，四级隔离：

| 级别 | 特点 |
|------|------|
| **读未提交** | 最低隔离，允许脏读 |
| **读已提交** | 不可脏读，允许不可重复读和幻读 |
| **可重复读** | InnoDB 默认，基本不出现幻读 |
| **串行化** | 最高隔离，共享读锁 + 排他写锁 + GAP 锁 |

- **悲观锁**：`SELECT … FOR UPDATE` 加锁
- **乐观锁**：CAS 机制，对比版本号/时间戳

## 谈谈 Spring Bean 的生命周期和作用域？

### Spring 创建 Bean

1. 实例化 Bean
2. 设置属性
3. Aware 接口注入（BeanNameAware、BeanFactoryAware、ApplicationContextAware）
4. `BeanPostProcessor.postProcessBeforeInitialization()`
5. `InitializingBean.afterPropertiesSet()`
6. 自定义 `init` 方法
7. `BeanPostProcessor.postProcessAfterInitialization()`

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/3a53e9cc2e014e5ba7787be4082b35de.png)

### Spring 销毁 Bean

依次调用 `DisposableBean.destroy()` 和自定义 `destroy` 方法。

**作用域**：
- **Singleton**（默认）：每个容器一个实例
- **Prototype**：每次 `getBean` 创建新实例
- Web 容器：`Request`、`Session`、`GlobalSession`

## 对比 Java 标准 NIO 类库，你知道 Netty 是如何实现更高性能的吗？

Netty 优势：多路复用、零拷贝、高层次封装。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/754b161b64af48dfa1537bc8193eea5c.png)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/349baff359a84fa89f3cde4fb130a31e.png)

核心组件：
- **ServerBootstrap/Bootstrap**：服务端/客户端入口，Fluent API
- **Channel**：NIO 扩展抽象
- **EventLoop/EventLoopGroup**：事件处理核心机制
- **ChannelFuture**：异步 IO 基础
- **ChannelHandler**：业务逻辑放置处
- **ChannelPipeline**：Handler 链条容器

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/bc072bae65e74dafb730e0f128443b12.png)

对比 Java 标准 NIO 的代码，Netty 提供的相对高层次的封装，减少了对 Selector 等细节的操纵，而 EventLoop、Pipeline 等机制则简化了编程模型，开发者不用担心并发等问题，在一定程度上简化了应用代码的开发。

## 谈谈常用的分布式 ID 的设计方案？Snowflake 是否受冬令时切换影响？

分布式 ID 要求：**全局唯一** + **有序递增**。

方案：UUID、数据库自增序列、**雪花算法（Snowflake）**（时间戳 + 机器ID + 序列号）：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/0183ff111bb0498d89a8d61aed054075.png)

## 周末福利 一份 Java 工程师必读书单

- 《Java 编程思想》

- 《Java 核心技术》

- 《Effective Java》

- 《Head First 设计模式》

- 《Java 并发编程实战》

- 《深入理解 Java 虚拟机》

- 《Java 性能优化权威指南》

- 《Spring 实战》

- 《Netty 实战》

- 《大型分布式网站架构设计与实践》

- 《深入分布式缓存：从原理到实践》

## 周末福利 谈谈我对 Java 学习和面试的看法

略

## 结束语 技术没有终点

## 参考资料

- [极客时间教程 - Java 核心技术面试精讲](https://time.geekbang.org/column/intro/82) - 极客时间教程——从面试官视角梳理如何解答常见 Java 面试问题
