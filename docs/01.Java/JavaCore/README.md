---
title: JavaCore
date: 2022-05-06 09:19:33
categories:
  - Java
  - JavaCore
tags:
  - Java
  - JavaCore
permalink: /pages/9d112a4f/
hidden: true
index: false
---

# JavaCore

> JavaCore 专题总结、整理 Java 核心技术知识，涵盖 Java 基础特性、高级特性、容器、IO、并发编程、JVM 虚拟机等内容。
>
> Java 核心知识是 Java 工程师的内功修养，深入理解这些内容有助于在日常开发、问题排查、性能优化中游刃有余。

## 📖 内容

### [Java 基础特性](基础特性)

> Java 基础篇总结 Java 的一些基础特性。

- [Java 基础语法特性](基础特性/[JavaCore]基础语法.md) - 关键词：`强类型`、`注释`、`变量`、`常量`、`操作符`、`访问修饰符`、`final`、`序列化`
- [Java 基本数据类型](基础特性/[JavaCore]数据类型.md) - 关键词：`值类型`、`引用类型`、`装箱`、`拆箱`、`包装类`、`缓存机制`、`equals`、`BigDecimal`、`精度丢失`
- [Java 面向对象](基础特性/[JavaCore]面向对象.md) - 关键词：`封装`、`继承`、`多态`、`类`、`接口`、`抽象类`、`访问权限`、`extends`、`implements`
- [Java 方法](基础特性/[JavaCore]方法.md) - 关键词：`方法定义`、`值传递`、`修饰符`、`static`、`final`、`构造方法`、`重载`、`覆写`、`可变参数`
- [Java 数组](基础特性/[JavaCore]数组.md) - 关键词：`引用类型`、`数组维度`、`多维数组`、`Arrays`、`下标`、`长度固定`
- [Java 枚举](基础特性/[JavaCore]枚举.md) - 关键词：`enum`、`Enum`、`枚举本质`、`EnumSet`、`EnumMap`、`单例模式`、`switch`、`状态机`
- [Java 控制语句](基础特性/[JavaCore]控制语句.md) - 关键词：`if`、`switch`、`while`、`for`、`foreach`、`break`、`continue`、`return`、`流程控制`
- [Java 异常](基础特性/[JavaCore]异常.md) - 关键词：`Throwable`、`Error`、`Exception`、`RuntimeException`、`try-catch-finally`、`throw`、`throws`、`异常链`、`Checked Exception`
- [Java 泛型](基础特性/[JavaCore]泛型.md) - 关键词：`泛型类`、`泛型方法`、`类型擦除`、`类型边界`、`通配符`、`PECS`、`extends`、`super`
- [Java 反射](基础特性/[JavaCore]反射.md) - 关键词：`Class`、`Field`、`Method`、`Constructor`、`invoke`、`动态代理`、`JDK 动态代理`、`CGLIB`、`InvocationHandler`
- [Java 注解](基础特性/[JavaCore]注解.md) - 关键词：`@interface`、`元注解`、`@Retention`、`@Target`、`@Override`、`反射解析`、`内置注解`、`自定义注解`
- [Java String 类型](基础特性/[JavaCore]String.md) - 关键词：`不可变`、`final`、`字符串常量池`、`intern`、`StringBuilder`、`StringBuffer`、`equals`、`hashCode`

### [Java 高级特性](高级特性)

> Java 高级特性篇总结 Java 的一些高级特性。

- [Java 正则](高级特性/[JavaCore]正则.md) - 关键词：`Pattern`、`Matcher`、`捕获与非捕获`、`反向引用`、`零宽断言`、`贪婪与懒惰`、`元字符`、`DFA`、`NFA`
- [Java 编码和加密](高级特性/[JavaCore]编码和加密.md) - 关键词：`Base64`、`消息摘要`、`数字签名`、`对称加密`、`非对称加密`、`MD5`、`SHA`、`HMAC`、`AES`、`RSA`
- [Java 国际化](高级特性/[JavaCore]国际化.md) - 关键词：`Locale`、`ResourceBundle`、`NumberFormat`、`DateFormat`、`MessageFormat`
- [Java SPI](高级特性/[JavaCore]SPI.md) - 关键词：`SPI`、`ClassLoader`、`ServiceLoader`、`扩展点`
- [JavaAgent](高级特性/[JavaCore]Agent.md) - 关键词：`Instrumentation`、`premain`、`agentmain`、`ClassFileTransformer`、`字节码增强`、`Attach`、`JVMTI`、`javassist`、`MANIFEST.MF`
- [Java JDK8](高级特性/[JavaCore]JDK8.md) - 关键词：`Stream`、`lambda`、`Optional`、`@FunctionalInterface`

### [Java 容器](容器)

> Java 容器涉及许多数据结构知识点，所以设立专题进行总结。

- [Java 容器简介](容器/[JavaCore][容器]简介.md) - 关键词：`Collection`、`Map`、`泛型`、`Iterable`、`Iterator`、`Comparable`、`Comparator`、`Cloneable`、`fail-fast`、`fail-safe`
- [Java 容器之 List](容器/[JavaCore][容器]List.md) - 关键词：`ArrayList`、`LinkedList`、`Vector`、`Stack`、`RandomAccess`、`动态扩容`、`Arrays.asList`、`subList`
- [Java 容器之 Map](容器/[JavaCore][容器]Map.md) - 关键词：`HashMap`、`LinkedHashMap`、`TreeMap`、`WeakHashMap`、`Hashtable`、`红黑树`、`负载因子`、`扩容`、`哈希冲突`
- [Java 容器之 Set](容器/[JavaCore][容器]Set.md) - 关键词：`HashSet`、`LinkedHashSet`、`TreeSet`、`EnumSet`、`去重`、`NavigableSet`、`HashMap`
- [Java 容器之 Queue](容器/[JavaCore][容器]Queue.md) - 关键词：`Queue`、`Deque`、`ArrayDeque`、`PriorityQueue`、`LinkedList`、`BlockingQueue`、`FIFO`、`二叉堆`
- [Java 容器之 Stream](容器/[JavaCore][容器]Stream.md) - 关键词：`Stream`、`parallelStream`、`中间操作`、`终结操作`、`惰性求值`、`filter`、`map`、`flatMap`、`collect`、`Collector`

### [Java IO](IO)

> Java IO 篇总结 Java 输入输出相关知识，涵盖 BIO、NIO、序列化等内容。

- [Java IO 之 简介](IO/[JavaCore][IO]简介.md) - 关键词：`BIO`、`NIO`、`AIO`、`UNIX I/O 模型`、`同步阻塞`、`同步非阻塞`、`I/O 多路复用`、`信号驱动 I/O`、`异步非阻塞`、`Reactor`
- [Java IO 之 BIO](IO/[JavaCore][IO]BIO.md) - 关键词：`BIO`、`字节流`、`字符流`、`InputStream`、`OutputStream`、`Reader`、`Writer`、`RandomAccessFile`、`Socket`、`ServerSocket`
- [Java IO 之 NIO](IO/[JavaCore][IO]NIO.md) - 关键词：`NIO`、`Channel`、`Buffer`、`Selector`、`SelectionKey`、`多路复用`、`DirectBuffer`、`FileChannel`、`MappedByteBuffer`、`零拷贝`
- [Java IO 之序列化](IO/[JavaCore][IO]序列化.md) - 关键词：`Serializable`、`serialVersionUID`、`transient`、`Externalizable`、`readResolve`、`ObjectOutputStream`、`Protobuf`、`Hessian`、`Kryo`、`JSON`

### [Java 并发](并发)

> Java 并发篇总结、整理 Java 并发编程相关知识点。
>
> 并发编程并非 Java 语言所独有，而是一种成熟的编程范式，Java 只是用自己的方式实现了并发工作模型。学习 Java 并发编程，应该先熟悉并发的基本概念，然后进一步了解并发的特性以及其特性所面临的问题。

- [Java 并发简介](并发/[JavaCore][并发]简介.md) - 关键词：`并发`、`线程`、`原子性`、`可见性`、`有序性`、`死锁`、`上下文切换`、`J.U.C`、`管程`、`非阻塞同步`
- [Java 并发之内存模型](并发/[JavaCore][并发]内存模型.md) - 关键词：`JMM`、`Happens-Before`、`内存屏障`、`指令重排序`、`volatile`、`synchronized`、`锁升级`、`偏向锁`、`轻量级锁`、`重量级锁`
- [Java 并发之线程](并发/[JavaCore][并发]线程.md) - 关键词：`Thread`、`Runnable`、`Callable`、`Future`、`线程生命周期`、`start`、`interrupt`、`join`、`sleep`、`守护线程`
- [Java 并发之锁](并发/[JavaCore][并发]锁.md) - 关键词：`Lock`、`ReentrantLock`、`ReentrantReadWriteLock`、`公平锁`、`可重入锁`、`悲观锁`、`乐观锁`、`独占锁`、`CAS`、`AQS`
- [Java 并发之无锁](并发/[JavaCore][并发]无锁.md) - 关键词：`CAS`、`ABA 问题`、`原子类`、`AtomicInteger`、`LongAdder`、`ThreadLocal`、`ThreadLocalMap`、`内存泄漏`、`Immutability`、`Copy-on-Write`
- [Java 并发之 AQS](并发/[JavaCore][并发]AQS.md) - 关键词：`AQS`、`CLH 队列`、`state`、`独占锁`、`共享锁`、`acquire`、`release`、`模板方法`、`Condition`、`ReentrantLock`
- [Java 并发之容器](并发/[JavaCore][并发]容器.md) - 关键词：`同步容器`、`并发容器`、`ConcurrentHashMap`、`分段锁`、`CAS`、`CopyOnWriteArrayList`、`BlockingQueue`、`ArrayBlockingQueue`、`LinkedBlockingQueue`、`ConcurrentModificationException`
- [Java 并发之线程池](并发/[JavaCore][并发]线程池.md) - 关键词：`ThreadPoolExecutor`、`Executors`、`corePoolSize`、`maximumPoolSize`、`workQueue`、`拒绝策略`、`FixedThreadPool`、`CachedThreadPool`、`ScheduledThreadPool`、`Future`
- [Java 并发之同步工具](并发/[JavaCore][并发]同步工具.md) - 关键词：`Semaphore`、`CountDownLatch`、`CyclicBarrier`、`信号量`、`限流`、`acquire`、`await`、`countDown`、`AQS`、`可重用`
- [Java 并发之分工工具](并发/[JavaCore][并发]分工工具.md) - 关键词：`FutureTask`、`CompletableFuture`、`CompletionService`、`ForkJoinPool`、`分治`、`工作窃取`、`异步编排`、`supplyAsync`、`thenApply`、`allOf`

### [Java 虚拟机](JVM)

> 【Java 虚拟机】总结、整理了个人对于 JVM 的学习、应用心得。

- [Java 虚拟机简介](JVM/[JavaCore][JVM]简介.md) - 关键词：`JVM`、`Hotspot`、`体系结构`、`类加载器`、`运行时数据区`、`执行引擎`、`JIT`、`跨平台`、`停顿时间`、`吞吐量`
- [Java 虚拟机之内存区域](JVM/[JavaCore][JVM]内存区域.md) - 关键词：`程序计数器`、`虚拟机栈`、`本地方法栈`、`堆`、`方法区`、`元空间`、`栈帧`、`对象内存布局`、`OutOfMemoryError`、`StackOverflowError`
- [Java 虚拟机之垃圾收集](JVM/[JavaCore][JVM]垃圾收集.md) - 关键词：`GC Roots`、`可达性分析`、`强引用`、`分代收集`、`标记-清除`、`复制算法`、`CMS`、`G1`、`Minor GC`、`Full GC`
- [Java 虚拟机之字节码](JVM/[JavaCore][JVM]字节码.md) - 关键词：`字节码`、`魔数`、`常量池`、`字段表`、`方法表`、`属性表`、`字节码指令`、`ASM`、`javassist`、`ByteBuddy`
- [Java 虚拟机之类加载](JVM/[JavaCore][JVM]类加载.md) - 关键词：`类加载机制`、`ClassLoader`、`双亲委派`、`Class.forName`、`loadClass`、`初始化`、`<clinit>`、`Bootstrap ClassLoader`、`SPI`、`热部署`
- [Java 虚拟机之工具](JVM/[JavaCore][JVM]工具.md) - 关键词：`jstat`、`jmap`、`jstack`、`VisualVM`、`MAT`、`JProfiler`、`Arthas`、`JMX`、`heapdump`、`threaddump`
- [Java 虚拟机之故障处理](JVM/[JavaCore][JVM]故障处理.md) - 关键词：`CPU 飙升`、`内存泄漏`、`OOM`、`GC 频繁`、`死锁`、`top`、`jstack`、`jmap`、`jstat`、`netstat`
- [Java 虚拟机之调优](JVM/[JavaCore][JVM]调优.md) - 关键词：`吞吐量`、`停顿时间`、`-Xms`、`-Xmx`、`-Xmn`、`-XX:NewRatio`、`-XX:SurvivorRatio`、`GC 日志`、`GC 类型选择`、`调优原则`

### [Java 面试](面试)

> Java 面试篇收录 Java 核心技术各专题的面试题整理，涵盖基础、容器、并发、虚拟机等方向。

- [Java 基础面试一](面试/[JavaCore][面试]基础（一）.md) - 关键词：`值传递`、`装箱`、`拆箱`、`缓存机制`、`BigDecimal`、`异常体系`、`try-with-resources`、`final`、`finally`、`finalize`
- [Java 基础面试二](面试/[JavaCore][面试]基础（二）.md) - 关键词：`接口 vs 抽象类`、`深拷贝`、`浅拷贝`、`equals`、`hashCode`、`String 不可变`、`StringBuilder`、`StringBuffer`、`字符串常量池`、`intern`
- [Java 基础面试三](面试/[JavaCore][面试]基础（三）.md) - 关键词：`泛型`、`类型擦除`、`PECS`、`反射`、`动态代理`、`CGLIB`、`SPI`、`序列化`、`NIO`、`Lambda`
- [Java 容器面试一](面试/[JavaCore][面试]容器（一）.md) - 关键词：`集合体系`、`fail-fast`、`ArrayList`、`扩容`、`LinkedList`、`CopyOnWriteArrayList`、`HashSet`、`PriorityQueue`、`BlockingQueue`、`ConcurrentModificationException`
- [Java 容器面试二](面试/[JavaCore][面试]容器（二）.md) - 关键词：`Hash 碰撞`、`HashMap`、`红黑树`、`负载因子`、`线程不安全`、`ConcurrentHashMap`、`分段锁`、`CAS`、`复合操作原子性`、`JDK8 改动`
- [Java 容器面试三](面试/[JavaCore][面试]容器（三）.md) - 关键词：`Collections`、`Collectors.toMap`、`NPE`、`Arrays.asList`、`UnsupportedOperationException`、`List.subList`、`视图`、`fail-fast`、`同步控制`、`Set 去重`
- [Java 并发面试一](面试/[JavaCore][面试]并发（一）.md) - 关键词：`并发`、`并行`、`原子性`、`可见性`、`有序性`、`JMM`、`Happens-Before`、`volatile`、`synchronized`、`死锁`
- [Java 并发面试二](面试/[JavaCore][面试]并发（二）.md) - 关键词：`公平锁`、`悲观锁`、`乐观锁`、`可重入锁`、`AQS`、`ReentrantLock`、`CAS`、`ABA 问题`、`ThreadLocal`、`内存泄漏`
- [Java 并发面试三](面试/[JavaCore][面试]并发（三）.md) - 关键词：`线程池`、`ThreadPoolExecutor`、`corePoolSize`、`maximumPoolSize`、`拒绝策略`、`CountDownLatch`、`CyclicBarrier`、`Semaphore`、`ForkJoinPool`、`CompletableFuture`
- [Java 虚拟机面试一](面试/[JavaCore][面试]虚拟机（一）.md) - 关键词：`类加载`、`双亲委派`、`内存区域`、`堆`、`方法区`、`元空间`、`对象头`、`Mark Word`、`JIT`、`逃逸分析`
- [Java 虚拟机面试二](面试/[JavaCore][面试]虚拟机（二）.md) - 关键词：`可达性分析`、`GC Roots`、`强引用`、`弱引用`、`分代收集`、`CMS`、`G1`、`ZGC`、`Full GC`、`GC 调优`

## 📚 资料

- Java 综合
  - [极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701) - 极客时间教程——基于 Java 生产环境的真实案例，讲解"避坑"的手段，很硬核
  - [极客时间教程 - Java 性能调优实战](https://time.geekbang.org/column/intro/100028001) - 极客时间教程——覆盖 80% 以上 Java 应用调优场景
  - [极客时间教程 - Java 核心技术面试精讲](https://time.geekbang.org/column/intro/82) - 极客时间教程——从面试官视角梳理如何解答常见 Java 面试问题
  - [CS-Notes](https://github.com/CyC2018/CS-Notes) - Github 上的 Java 基础级面试教程，行文清晰简洁
  - [JavaGuide](https://github.com/Snailclimb/JavaGuide) - Github 上的 Java 面试教程，Java 基础部分讲解较为细致
  - [advanced-java](https://github.com/doocs/advanced-java) - Github 上的 Java 面试教程，分布式部分从面试官视角讲解核心考察点
- Java 基础
  - [《Java 编程思想》](https://book.douban.com/subject/2130190/) - Thinking in java，典中典！由于成书较早，部分内容已经多少有点过时
  - [《Java 核心技术 卷 I 开发基础》](https://book.douban.com/subject/35920145/) - 第 12 版，涵盖 Java 17 的新特性
  - [《Java 核心技术 卷 II 高级特性》](https://book.douban.com/subject/36337685/) - 第 12 版，涵盖 Java 17 的新特性
  - [《Head First Java》](https://book.douban.com/subject/2000732/) - 图文并茂，对新手非常友好的入门级教程
  - [《疯狂 Java 讲义》](https://book.douban.com/subject/3246499/) - 入门级教程
  - [Runoob Java 教程](https://www.runoob.com/java/java-tutorial.html) - 入门级在线教程
- Java 并发
  - [《Java 并发编程实战》](https://book.douban.com/subject/10484692/) - 深入浅出地介绍 Java 线程和并发
  - [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
  - [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901) - 极客时间教程——图文并茂，系统性讲解并发编程知识
  - [拉勾教育教程 - Java 并发编程 78 讲](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=16) - 拉勾教育教程——针对并发场景问题，讲解的通俗易懂
- Java 虚拟机
  - [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/) - 第 3 版，国内最好的 JVM 书籍
  - [极客时间教程 - 深入拆解 Java 虚拟机](https://time.geekbang.org/column/intro/100010301) - 极客时间教程
  - [从表到里学习 JVM 实现](https://www.douban.com/doulist/2545443/)
- Java IO
  - [《Netty 实战》](https://book.douban.com/subject/27038538/)
  - [《Java 网络编程》](https://book.douban.com/subject/1438754/)
- Java 编程规范
  - [《Effective Java》](https://book.douban.com/subject/36818907/) - 第 3 版，涵盖 Java 9 的新特性
  - [《阿里巴巴 Java 开发手册》](https://github.com/alibaba/p3c/blob/master/阿里巴巴Java开发手册（详尽版）.pdf)
  - [Google Java 编程指南](https://google.github.io/styleguide/javaguide.html)
- 其他
  - [《Head First 设计模式》](https://book.douban.com/subject/2243615/)
  - [《Java 加密与解密的艺术》](https://book.douban.com/subject/25861566/)
  - [java-design-patterns](https://github.com/iluwatar/java-design-patterns) - Github 上的 Java 版设计模式教程
  - [Java](https://github.com/TheAlgorithms/Java) - Github 上的 Java 算法教程

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🏠 [JAVACORE 首页](https://github.com/dunwu/javacore) ◾
