---
title: Java 虚拟机面试一
date: 2024-07-03 07:44:02
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
  - 并发
permalink: /pages/46c1e340/
---

# Java 虚拟机面试一

## 引用类型

### Java 支持哪些引用类型？分别用于什么场景？

无论是通过引用计算算法判断对象的引用数量，还是通过可达性分析算法判断对象的引用链是否可达，判定对象是否可被回收都与引用有关。

Java 具有四种强度不同的引用类型：

- 强引用（Strong Reference）
- 软引用（Soft Reference）
- 弱引用（Weak Reference）
- 虚引用

**（1）强引用**

**被强引用（Strong Reference）关联的对象不会被垃圾收集器回收。**

使用 `new` 一个新对象的方式来创建强引用。

```java
Object obj = new Object();
```

**（2）软引用**

**被软引用（Soft Reference）关联的对象，只有在 JVM 内存不够的情况下才会被回收。**JVM 会确保在抛出 `OutOfMemoryError` 之前，清理软引用指向的对象。软引用通常用来实现内存敏感的缓存，如果还有空闲内存，就可以暂时保留缓存，当内存不足时清理掉，这样就保证了使用缓存的同时，不会耗尽内存。

使用 `SoftReference` 类来创建软引用。

```java
Object obj = new Object();
SoftReference<Object> sf = new SoftReference<Object>(obj);
obj = null; // 使对象只被软引用关联
```

**（3）弱引用**

**被弱引用（Weak Reference）关联的对象一定会被垃圾收集器回收，也就是说它只能存活到下一次垃圾收集发生之前。**

使用 `WeakReference` 类来实现弱引用。

```java
Object obj = new Object();
WeakReference<Object> wf = new WeakReference<Object>(obj);
obj = null;
```

`WeakHashMap` 的 `Entry` 继承自 `WeakReference`，主要用来实现缓存。

```java
private static class Entry<K,V> extends WeakReference<Object> implements Map.Entry<K,V>
```

Tomcat 中的 `ConcurrentCache` 就使用了 `WeakHashMap` 来实现缓存功能。`ConcurrentCache` 采取的是分代缓存，经常使用的对象放入 eden 中，而不常用的对象放入 longterm。eden 使用 `ConcurrentHashMap` 实现，longterm 使用 `WeakHashMap`，保证了不常使用的对象容易被回收。

```java
public final class ConcurrentCache<K, V> {

    private final int size;

    private final Map<K, V> eden;

    private final Map<K, V> longterm;

    public ConcurrentCache(int size) {
        this.size = size;
        this.eden = new ConcurrentHashMap<>(size);
        this.longterm = new WeakHashMap<>(size);
    }

    public V get(K k) {
        V v = this.eden.get(k);
        if (v == null) {
            v = this.longterm.get(k);
            if (v != null)
                this.eden.put(k, v);
        }
        return v;
    }

    public void put(K k, V v) {
        if (this.eden.size() >= size) {
            this.longterm.putAll(this.eden);
            this.eden.clear();
        }
        this.eden.put(k, v);
    }
}
```

**（4）虚引用**

又称为幽灵引用或者幻影引用。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用取得一个对象实例。

**为一个对象设置虚引用关联的唯一目的就是能在这个对象被收集器回收时收到一个系统通知。**

使用 `PhantomReference` 来实现虚引用。

```java
Object obj = new Object();
PhantomReference<Object> pf = new PhantomReference<Object>(obj);
obj = null;
```

## 工具

### 【简单】JDK 内置了哪些工具？

::: details 要点

**基础开发工具**

- **`javac`** – Java 编译器（`.java` → `.class`）
- **`java`** – 运行 Java 程序（启动 JVM）
- **`javadoc`** – 生成 API 文档（基于源码注释）
- **`jar`** – 打包 `.class` 文件为 JAR
- **`jdb`** – 命令行调试工具（断点、变量查看）

**性能监控与分析工具**

- **`jps`** – 查看 Java 进程
- **`jstack`** – 线程堆栈分析（排查死锁、线程阻塞）
- **`jmap`** – 内存快照（生成 Heap Dump）
- **`jhat`** – 分析 Heap Dump（内存泄漏排查）
- **`jstat`** – JVM 统计（GC、内存、类加载监控）
- **`jconsole`** – 图形化 JVM 监控（内存、线程、类）
- **`jvisualvm`** – 综合性能分析（CPU、内存、GC）

**诊断工具**

- **`jinfo`** – 查看/修改 JVM 运行参数
- **`jstatd`** – 远程 JVM 监控（分布式支持）

:::

## 内存模型

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
