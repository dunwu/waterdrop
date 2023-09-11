---
title: JavaSE
date: 2022-05-06 09:19:33
categories:
  - Java
  - JavaSE
tags:
  - Java
  - JavaSE
permalink: /pages/69d2f8/
hidden: true
index: false
---

# JavaSE

## 📖 内容

> [Java 面试总结](99.Java面试.md) 💯

### [Java 基础特性](01.基础特性)

- [Java 开发环境](01.基础特性/00.Java开发环境.md)
- [Java 基础语法特性](01.基础特性/01.Java基础语法.md)
- [Java 基本数据类型](01.基础特性/02.Java基本数据类型.md)
- [Java 面向对象](01.基础特性/03.Java面向对象.md)
- [Java 方法](01.基础特性/04.Java方法.md)
- [Java 数组](01.基础特性/05.Java数组.md)
- [Java 枚举](01.基础特性/06.Java枚举.md)
- [Java 控制语句](01.基础特性/07.Java控制语句.md)
- [Java 异常](01.基础特性/08.Java异常.md)
- [Java 泛型](01.基础特性/09.Java泛型.md)
- [Java 反射](01.基础特性/10.Java反射.md)
- [Java 注解](01.基础特性/11.Java注解.md)
- [Java String 类型](01.基础特性/42.JavaString类型.md)

### [Java 高级特性](02.高级特性)

- [Java 正则从入门到精通](02.高级特性/01.Java正则.md) - 关键词：`Pattern`、`Matcher`、`捕获与非捕获`、`反向引用`、`零宽断言`、`贪婪与懒惰`、`元字符`、`DFA`、`NFA`
- [Java 编码和加密](02.高级特性/02.Java编码和加密.md) - 关键词：`Base64`、`消息摘要`、`数字签名`、`对称加密`、`非对称加密`、`MD5`、`SHA`、`HMAC`、`AES`、`DES`、`DESede`、`RSA`
- [Java 国际化](02.高级特性/03.Java国际化.md) - 关键词：`Locale`、`ResourceBundle`、`NumberFormat`、`DateFormat`、`MessageFormat`
- [Java JDK8](02.高级特性/04.JDK8.md) - 关键词：`Stream`、`lambda`、`Optional`、`@FunctionalInterface`
- [Java SPI](02.高级特性/05.JavaSPI.md) - 关键词：`SPI`、`ClassLoader`

### [Java 容器](03.容器)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200221175550.png)

- [Java 容器简介](03.容器/01.Java容器简介.md) - 关键词：`Collection`、`泛型`、`Iterable`、`Iterator`、`Comparable`、`Comparator`、`Cloneable`、`fail-fast`
- [Java 容器之 List](03.容器/02.Java容器之List.md) - 关键词：`List`、`ArrayList`、`LinkedList`
- [Java 容器之 Map](03.容器/03.Java容器之Map.md) - 关键词：`Map`、`HashMap`、`TreeMap`、`LinkedHashMap`、`WeakHashMap`
- [Java 容器之 Set](03.容器/04.Java容器之Set.md) - 关键词：`Set`、`HashSet`、`TreeSet`、`LinkedHashSet`、`EmumSet`
- [Java 容器之 Queue](03.容器/05.Java容器之Queue.md) - 关键词：`Queue`、`Deque`、`ArrayDeque`、`LinkedList`、`PriorityQueue`
- [Java 容器之 Stream](03.容器/06.Java容器之Stream.md)

### [Java IO](04.IO)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200630205329.png)

- [Java IO 模型](04.IO/01.JavaIO模型.md) - 关键词：`InputStream`、`OutputStream`、`Reader`、`Writer`、`阻塞`
- [Java NIO](04.IO/02.JavaNIO.md) - 关键词：`Channel`、`Buffer`、`Selector`、`非阻塞`、`多路复用`
- [Java 序列化](04.IO/03.Java序列化.md) - 关键词：`Serializable`、`serialVersionUID`、`transient`、`Externalizable`、`writeObject`、`readObject`
- [Java 网络编程](04.IO/04.Java网络编程.md) - 关键词：`Socket`、`ServerSocket`、`DatagramPacket`、`DatagramSocket`
- [Java IO 工具类](04.IO/05.JavaIO工具类.md) - 关键词：`File`、`RandomAccessFile`、`System`、`Scanner`

### [Java 并发](05.并发)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200221175827.png)

- [Java 并发简介](05.并发/01.Java并发简介.md) - 关键词：`进程`、`线程`、`安全性`、`活跃性`、`性能`、`死锁`、`饥饿`、`上下文切换`
- [Java 线程基础](05.并发/02.Java线程基础.md) - 关键词：`Thread`、`Runnable`、`Callable`、`Future`、`wait`、`notify`、`notifyAll`、`join`、`sleep`、`yeild`、`线程状态`、`线程通信`
- [Java 并发核心机制](05.并发/03.Java并发核心机制.md) - 关键词：`synchronized`、`volatile`、`CAS`、`ThreadLocal`
- [Java 并发锁](05.并发/04.Java锁.md) - 关键词：`AQS`、`ReentrantLock`、`ReentrantReadWriteLock`、`Condition`
- [Java 原子类](05.并发/05.Java原子类.md) - 关键词：`CAS`、`Atomic`
- [Java 并发容器](05.并发/06.Java并发和容器.md) - 关键词：`ConcurrentHashMap`、`CopyOnWriteArrayList`
- [Java 线程池](05.并发/07.Java线程池.md) - 关键词：`Executor`、`ExecutorService`、`ThreadPoolExecutor`、`Executors`
- [Java 并发工具类](05.并发/08.Java并发工具类.md) - 关键词：`CountDownLatch`、`CyclicBarrier`、`Semaphore`
- [Java 内存模型](05.并发/09.Java内存模型.md) - 关键词：`JMM`、`volatile`、`synchronized`、`final`、`Happens-Before`、`内存屏障`
- [ForkJoin 框架](05.并发/10.ForkJoin框架.md)

### [Java 虚拟机](06.JVM)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200628154803.png)

- [JVM 体系结构](06.JVM/01.JVM体系结构.md)
- [JVM 内存区域](06.JVM/02.JVM内存区域.md) - 关键词：`程序计数器`、`虚拟机栈`、`本地方法栈`、`堆`、`方法区`、`运行时常量池`、`直接内存`、`OutOfMemoryError`、`StackOverflowError`
- [JVM 垃圾收集](06.JVM/03.JVM垃圾收集.md) - 关键词：`GC Roots`、`Serial`、`Parallel`、`CMS`、`G1`、`Minor GC`、`Full GC`
- [JVM 类加载](06.JVM/04.JVM类加载.md) - 关键词：`ClassLoader`、`双亲委派`
- [JVM 字节码](06.JVM/05.JVM字节码.md) - 关键词：`bytecode`、`asm`、`javassist`
- [JVM 命令行工具](06.JVM/11.JVM命令行工具.md) - 关键词：`jps`、`jstat`、`jmap` 、`jstack`、`jhat`、`jinfo`
- [JVM GUI 工具](06.JVM/12.JVM_GUI工具.md) - 关键词：`jconsole`、`jvisualvm`、`MAT`、`JProfile`、`Arthas`
- [JVM 实战](06.JVM/21.JVM实战.md) - 关键词：`配置`、`调优`
- [Java 故障诊断](06.JVM/22.Java故障诊断.md) - 关键词：`CPU`、`内存`、`磁盘`、`网络`、`GC`

## 📚 资料

- **书籍**
  - Java 四大名著
    - [《Java 编程思想（Thinking in java）》](https://book.douban.com/subject/2130190/)
    - [《Java 核心技术 卷 I 基础知识》](https://book.douban.com/subject/26880667/)
    - [《Java 核心技术 卷 II 高级特性》](https://book.douban.com/subject/27165931/)
    - [《Effective Java》](https://book.douban.com/subject/30412517/)
  - Java 并发
    - [《Java 并发编程实战》](https://book.douban.com/subject/10484692/)
    - [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
  - Java 虚拟机
    - [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/)
  - Java 入门
    - [《O'Reilly：Head First Java》](https://book.douban.com/subject/2000732/)
    - [《疯狂 Java 讲义》](https://book.douban.com/subject/3246499/)
  - 其他
    - [《Head First 设计模式》](https://book.douban.com/subject/2243615/)
    - [《Java 网络编程》](https://book.douban.com/subject/1438754/)
    - [《Java 加密与解密的艺术》](https://book.douban.com/subject/25861566/)
    - [《阿里巴巴 Java 开发手册》](https://book.douban.com/subject/27605355/)
- **教程、社区**
  - [Runoob Java 教程](https://www.runoob.com/java/java-tutorial.html)
  - [java-design-patterns](https://github.com/iluwatar/java-design-patterns)
  - [Java](https://github.com/TheAlgorithms/Java)
  - [《Java 核心技术面试精讲》](https://time.geekbang.org/column/intro/82)
  - [《Java 性能调优实战》](https://time.geekbang.org/column/intro/100028001)
  - [《Java 业务开发常见错误 100 例》](https://time.geekbang.org/column/intro/100047701)
  - [深入拆解 Java 虚拟机](https://time.geekbang.org/column/intro/100010301)
  - [《Java 并发编程实战》](https://time.geekbang.org/column/intro/100023901)
- **面试**
  - [CS-Notes](https://github.com/CyC2018/CS-Notes)
  - [JavaGuide](https://github.com/Snailclimb/JavaGuide)
  - [advanced-java](https://github.com/doocs/advanced-java)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾