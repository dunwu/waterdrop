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
  - JVM
permalink: /pages/46c1e340/
---

# Java 虚拟机面试一

## JVM 简介

### 【中等】JVM 由哪些部分组成？

**类加载→内存分配→执行引擎运行→GC 回收内存**，通过 JNI 与外部交互。

JVM（Java 虚拟机）主要由以下核心部分组成：

- **类加载子系统**：负责加载、验证、准备、解析和初始化类文件（.class）。
- **运行时数据区**：
  - **方法区**：存储类元数据、常量池等。
  - **堆**：存放对象实例（主 GC 区域）。
  - **虚拟机栈**：存储方法调用的栈帧（局部变量、操作数栈等）。
  - **本地方法栈**：为 Native 方法服务。
  - **程序计数器**：记录当前线程执行的字节码位置。
- **执行引擎**：解释或编译字节码为机器码执行（含 JIT 编译器）。
- **本地方法接口（JNI）**：调用 C/C++实现的 Native 方法。
- **垃圾回收器（GC）**：自动管理堆内存的回收。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/jvm/jvm-hotspot-architecture.png)

### 【中等】JVM 的 TLAB（Thread-Local Allocation Buffer）是什么？

### 【中等】Java 是如何实现跨平台的？

### 【中等】什么是 Java 的 PLAB？

### 【中等】编译执行与解释执行的区别是什么？JVM 使用哪种方式？

### 【中等】什么是 Java 中的 logging write barrier？

### 【中等】说说 Java 的执行流程？

## JVM 内存管理

### 【中等】JVM 的内存区域是如何划分的？

JDK7 和 JDK8 的 JVM 的内存区域划分有所不同，如下图所示：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202408130820873.png)

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202408130821056.png)

**线程私有区域**

- **程序计数器**
  - 记录当前线程执行的字节码指令地址（Native 方法时为`undefined`）。
  - **唯一无 OOM 的区域**。
- **虚拟机栈**
  - 存储方法调用的**栈帧**（局部变量表、操作数栈、动态链接、返回地址）。
  - 异常：`StackOverflowError`（栈深度超限）、`OOM`（扩展失败）。
- **本地方法栈**
  - 为 Native 方法服务，类似虚拟机栈。

**线程共享区域**

- **堆（Heap）**
  - 存放**所有对象实例和数组**，是 GC 主战场。
  - 分区：新生代（Eden+Survivor）、老年代。
  - 异常：`OOM`（对象过多或内存泄漏）。
- **方法区（JDK 8+：元空间）**
  - 存储类元信息、运行时常量池、静态变量（JDK 7 后移至堆）。
  - **JDK 8 用元空间（本地内存）替代永久代**，默认无上限。
  - 异常：`OOM`（加载过多类）。
- **运行时常量池**
  - 属于方法区，存字面量和符号引用。

**直接内存（非 JVM 规范）**

- 通过 NIO 的`DirectByteBuffer`分配，避免堆内外拷贝。
- 异常：`OOM`（本地内存不足）。

### 【中等】JVM 产生 OOM 有哪几种情况？

JVM 发生 **OutOfMemoryError（OOM）** 的原因多种多样，主要与内存区域划分和对象分配机制相关。以下是所有可能的 OOM 类型及其触发条件、典型案例和排查方法：

#### java.lang.OutOfMemoryError: Java heap space

- **触发条件**：**堆内存不足**，无法分配新对象。
- **常见原因**：

  - 内存泄漏（如静态容器持续增长、未关闭的资源）。
  - 堆内存设置过小（`-Xmx` 值不合理）。
  - 大对象（如一次性加载超大文件到内存）。

- **案例代码**：
  ```java
  List<byte[]> list = new ArrayList<>();
  while (true) {
      list.add(new byte[1024 * 1024]); // 持续分配 1MB 数组
  }
  ```
- **解决方向**：
  - 检查 `-Xmx` 和 `-Xms` 参数是否合理。
  - 使用 `jmap -histo:live <pid>` 或 **MAT（Memory Analyzer Tool）** 分析堆转储（`-XX:+HeapDumpOnOutOfMemoryError`）。

#### java.lang.OutOfMemoryError: Metaspace

- **触发条件**：**元空间（Metaspace）不足**，无法加载新的类信息。
- **常见原因**：
  - 动态生成大量类（如反射、CGLIB、动态代理）。
  - 未设置元空间上限（默认依赖本地内存，可能耗尽）。
- **案例代码**：
  ```java
  for (int i = 0; i < 1000000; i++) {
      Enhancer enhancer = new Enhancer(); // CGLIB 动态生成类
      enhancer.setSuperclass(OOM.class);
      enhancer.create();
  }
  ```
- **解决方向**：

  - 调整元空间大小：`-XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M`。
  - 检查类加载器泄漏（如热部署未清理旧类）。

#### java.lang.OutOfMemoryError: PermGen space（仅 JDK 7 及之前）

- **类似 Metaspace**，但发生在永久代（PermGen），JDK 8 后被元空间取代。
- **常见原因**：大量字符串常量或类加载未卸载。

#### java.lang.OutOfMemoryError: Unable to create new native thread

- **触发条件**：**线程数超过系统限制**（非堆内存问题）。
- **常见原因**：
  - 线程池配置不合理（如无界线程池）。
  - 系统级限制（`ulimit -u` 查看用户最大线程数）。
- **案例代码**：
  ```java
  while (true) {
      new Thread(() -> {
          try { Thread.sleep(100000); } catch (Exception e) {}
      }).start();
  }
  ```
- **解决方向**：
  - 改用线程池（如 `ThreadPoolExecutor`）。
  - 调整系统限制（Linux 下修改 `/etc/security/limits.conf`）。

#### java.lang.OutOfMemoryError: Requested array size exceeds VM limit

- **触发条件**：尝试分配超过 JVM 限制的数组（如 `Integer.MAX_VALUE - 2`）。
- **案例代码**：
  ```java
  int[] arr = new int[Integer.MAX_VALUE]; // 直接崩溃
  ```
- **解决方向**：检查代码中不合理的数组分配逻辑。

#### java.lang.OutOfMemoryError: Direct buffer memory

- **触发条件**：**直接内存（堆外内存）耗尽**。
- **常见原因**：
  - NIO 的 `ByteBuffer.allocateDirect()` 未释放。
  - 直接内存上限过小（`-XX:MaxDirectMemorySize`）。
- **案例代码**：
  ```java
  List<ByteBuffer> buffers = new ArrayList<>();
  while (true) {
      buffers.add(ByteBuffer.allocateDirect(1024 * 1024)); // 1MB 直接内存
  }
  ```
- **解决方向**：

  - 显式调用 `((DirectBuffer) buffer).cleaner().clean()` 或复用缓冲区。
  - 增加 `-XX:MaxDirectMemorySize=1G`。

#### java.lang.OutOfMemoryError: GC overhead limit exceeded

- **触发条件**：GC 耗时超过 98% 且回收内存不足 2%（JVM 自我保护）。
- **本质原因**：堆内存几乎耗尽，GC 无效循环。
- **解决方向**：
  - 同 `heap space` 排查内存泄漏。
  - 关闭保护机制（不推荐）：`-XX:-UseGCOverheadLimit`。

#### java.lang.OutOfMemoryError: CodeCache is full（JIT 编译代码缓存满）

- **触发条件**：JIT 编译的本地代码超出缓存区（`-XX:ReservedCodeCacheSize`）。
- **常见原因**：动态生成大量方法（如频繁调用反射）。
- **解决方向**：
  - 增加缓存：`-XX:ReservedCodeCacheSize=256M`。
  - 关闭分层编译：`-XX:-TieredCompilation`。

#### OOM 类型速查表

| OOM 类型                          | 关联内存区域  | 典型原因            |
| --------------------------------- | ------------- | ------------------- |
| `Java heap space`                 | 堆            | 内存泄漏/堆太小     |
| `Metaspace` / `PermGen space`     | 元空间/永久代 | 类加载爆炸          |
| `Unable to create native thread`  | 系统线程数    | 线程池失控/系统限制 |
| `Direct buffer memory`            | 堆外内存      | NIO Buffer 未释放   |
| `GC overhead limit exceeded`      | 堆            | GC 无效循环         |
| `CodeCache is full`               | JIT 代码缓存  | 动态方法过多        |
| `Requested array size exceeds VM` | 堆            | 超大数组分配        |

### 【简单】JVM 方法区是否会出现内存溢出？

是的，**JVM 方法区（Method Area）确实会发生内存溢出（OOM）**，具体表现为 `java.lang.OutOfMemoryError: Metaspace`（JDK 8+）或 `java.lang.OutOfMemoryError: PermGen space`（JDK 7 及之前）。以下是详细分析：

**方法区的内存溢出原因**

**（1）JDK 8 之前：永久代（PermGen）溢出**

- **错误信息**：
  ```java
  java.lang.OutOfMemoryError: PermGen space
  ```
- **触发条件**：
  - 加载过多的类（如动态生成类、反射、CGLIB 代理）。
  - 大量字符串常量（尤其是 `String.intern()` 方法滥用）。
  - 未卸载的类加载器（如热部署场景，旧类未清理）。

**（2）JDK 8 及之后：元空间（Metaspace）溢出**

- **错误信息**：
  ```java
  java.lang.OutOfMemoryError: Metaspace
  ```
- **触发条件**：
  - 动态生成大量类（如 Spring AOP 的 CGLIB 代理、JSP 编译）。
  - 未合理设置元空间大小（默认依赖系统内存，可能耗尽）。
  - 类加载器泄漏（如 OSGi、Tomcat 热部署未清理旧类）。

**典型案例**

**（1）动态类生成**

```java
// 使用 CGLIB 持续生成代理类
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(MyService.class);
for (int i = 0; i < 1_000_000; i++) {
    enhancer.create(); // 最终触发 Metaspace OOM
}
```

**（2）类加载器泄漏**

```java
// 模拟热部署场景：每次重新加载类但未卸载旧类
while (true) {
    URLClassLoader loader = new URLClassLoader(new URL[]{new File("/path/to/classes").toURI().toURL()});
    loader.loadClass("com.example.MyClass");
}
```

**预防措施**

- **限制动态代理类生成**：缓存代理对象，避免重复生成。
- **合理配置元空间**：生产环境务必设置 `MaxMetaspaceSize`（如 `-XX:MaxMetaspaceSize=512M`）。
- **避免类加载器泄漏**：确保热部署框架（如 Tomcat、Spring Boot DevTools）正确清理旧类加载器。
- **减少字符串常量池滥用**：谨慎使用 `String.intern()`，尤其是处理大量动态字符串时。

**永久代（PermGen）与元空间（Metaspace）对比**

| 特性         | 永久代（JDK 7）                    | 元空间（JDK 8+）                             |
| ------------ | ---------------------------------- | -------------------------------------------- |
| **存储位置** | JVM 堆内                           | 本地内存（Native Memory）                    |
| **溢出错误** | `OOM: PermGen space`               | `OOM: Metaspace`                             |
| **默认上限** | 固定大小（64M~82M）                | 无上限（受系统内存限制）                     |
| **调优参数** | `-XX:PermSize` / `-XX:MaxPermSize` | `-XX:MetaspaceSize` / `-XX:MaxMetaspaceSize` |

**总结**

- **方法区会溢出**：无论是永久代还是元空间，都可能因类加载过多或配置不当触发 OOM。
- **JDK 8+ 更灵活**：元空间使用本地内存，但需显式设置 `MaxMetaspaceSize` 避免失控。
- **关键排查点**：动态类生成、类加载器泄漏、字符串常量池滥用。
- **解决方案**：合理配置内存参数 + 代码优化 + 监控工具。

### 【中等】Java 中堆和栈的区别是什么？

**Java 中堆（Heap）和栈（Stack）的核心区别**：

| **特性**     | **堆（Heap）**                    | **栈（Stack）**                      |
| ------------ | --------------------------------- | ------------------------------------ |
| **存储内容** | 对象实例、数组（所有`new`的对象） | 基本数据类型、局部变量、方法调用栈帧 |
| **线程共享** | 线程共享（需考虑线程安全）        | 线程私有（每个线程独立栈）           |
| **内存分配** | 动态分配，大小由`-Xmx`/`-Xms`控制 | 固定分配，大小由`-Xss`设定           |
| **访问速度** | 较慢（需指针寻址）                | 极快（直接操作栈指针）               |
| **内存溢出** | `OOM: Java heap space`            | `StackOverflowError`（递归过深）     |
| **垃圾回收** | 由 GC 管理（分代回收算法）        | 无需 GC，方法结束立即释放            |
| **典型问题** | 内存泄漏、GC 频繁                 | 栈帧过多（如无限递归）               |

**总结**

- **堆**：存对象，线程共享，GC 管理，可能 OOM。
- **栈**：存局部变量和方法调用，线程私有，自动释放，可能栈溢出。

**关键区别**：堆是动态的、共享的、GC 管理的；栈是快速的、私有的、自动释放的。

### 【困难】什么是 Java 中的直接内存（堆外内存）？

**直接内存（Direct Memory）** 是 **JVM 堆外的本地内存（Native Memory）**，由 Java 代码通过 `ByteBuffer.allocateDirect()` 或 `Unsafe` 类直接分配，不受 JVM 堆大小限制（但受系统总内存限制）。直接内存**读写快、无 GC 开销**，但需手动管理，适合高频 I/O 或大数据传输场景。

**特点**

| **特性**     | **直接内存**                             | **JVM 堆内存**             |
| ------------ | ---------------------------------------- | -------------------------- |
| **分配位置** | 操作系统管理的本地内存（Off-Heap）       | JVM 堆内（由 `-Xmx` 控制） |
| **分配方式** | `ByteBuffer.allocateDirect()`            | `new` 关键字               |
| **性能**     | 读写更快（减少堆与本地内存数据拷贝）     | 受 GC 影响，可能停顿       |
| **内存管理** | 手动释放（或依赖 `Cleaner` 机制）        | 自动垃圾回收（GC）         |
| **OOM 错误** | `OutOfMemoryError: Direct buffer memory` | `OOM: Java heap space`     |
| **适用场景** | 高频 I/O（如 NIO、Netty、MMAP）          | 常规对象存储               |

**优势**

- **减少拷贝**：避免 JVM 堆与本地内存间的数据复制（如文件读写、网络传输）。
- **降低 GC 压力**：大数据量场景下避免频繁 GC 停顿。

**注意**

- **内存泄漏**：忘记释放会导致本地内存耗尽（需显式调用 `((DirectBuffer) buffer).cleaner().clean()`）。
- **手动管理**：需谨慎控制分配和释放，推荐使用 **池化技术**（如 Netty 的 `PooledByteBufAllocator`）。
- **大小限制**：通过 `-XX:MaxDirectMemorySize` 设置上限（默认与 `-Xmx` 一致）。

**应用**

- **NIO**：`FileChannel` 文件映射（`MappedByteBuffer`）。
- **高性能框架**：Netty、Kafka、RocketMQ 的零拷贝技术。
- **大数据**：避免大文件加载到堆内引发 OOM。

### 【中等】什么是 Java 中的常量池？

**常量池（Constant Pool）** 是 **JVM 方法区（元空间）的一部分**，用于存储 **编译期生成的字面量（Literal）和符号引用（Symbolic References）**，如字符串、类/方法名、常量值等。

**分类**

| **类型**             | **存储位置**             | **内容**                            | **示例**              |
| -------------------- | ------------------------ | ----------------------------------- | --------------------- |
| **Class 文件常量池** | `.class` 文件内          | 编译期确定的字面量和符号引用        | `String s = "Java";`  |
| **运行时常量池**     | 方法区（JDK8+ 在元空间） | 类加载后从 Class 文件常量池映射而来 | 动态解析的类/方法引用 |
| **字符串常量池**     | 堆（JDK7+）              | 显式调用 `String.intern()` 的字符串 | `"Java".intern()`     |

**特点**

- **字面量存储**：如字符串、`final` 常量、基本类型值（如 `int a = 100`）。
- **符号引用**：类全限定名、方法名、字段名等（类加载时解析为直接引用）。
- **动态性**：运行时常量池支持动态添加（如 `String.intern()`）。

**字符串常量池**

- **JDK6 及之前**：位于永久代（`PermGen`），易引发 `OOM: PermGen space`。
- **JDK7+**：移至堆中，由 GC 管理，减少永久代压力。
- **`intern()` 方法**：
  - 若字符串不在池中，将其添加到池并返回引用；否则直接返回池中引用。
  - **慎用**：滥用可能导致内存浪费。

**问题**

- **内存泄漏**：大量调用 `String.intern()` 导致字符串常量池膨胀（JDK7+ 在堆中，可通过 GC 回收）。
- **性能优化**：
  - 避免重复创建相同字符串（如用 `intern()` 缓存高频字符串）。
  - 编译期常量折叠（如 `String s = "a" + "b"` 会优化为 `"ab"`）。

**示例代码**

```java
String s1 = "Java";              // 字面量，存入字符串常量池
String s2 = new String("Java");  // 堆中新对象，不自动入池
s2.intern();                     // 将 s2 的值加入字符串常量池（若不存在）
```

### 【中等】程序计数器为什么是私有的？

程序计数器主要有下面两个作用：

1. 字节码解释器通过改变程序计数器来依次读取指令，从而实现代码的流程控制，如：顺序执行、选择、循环、异常处理。
2. 在多线程的情况下，程序计数器用于记录当前线程执行的位置，从而当线程被切换回来的时候能够知道该线程上次运行到哪儿了。

需要注意的是，如果执行的是 native 方法，那么程序计数器记录的是 undefined 地址，只有执行的是 Java 代码时程序计数器记录的才是下一条指令的地址。

所以，程序计数器私有主要是为了**线程切换后能恢复到正确的执行位置**。

### 【中等】虚拟机栈和本地方法栈为什么是私有的？

- **虚拟机栈：** 每个 Java 方法在执行之前会创建一个栈帧用于存储局部变量表、操作数栈、常量池引用等信息。从方法调用直至执行完成的过程，就对应着一个栈帧在 Java 虚拟机栈中入栈和出栈的过程。
- **本地方法栈：** 和虚拟机栈所发挥的作用非常相似，区别是：**虚拟机栈为虚拟机执行 Java 方法 （也就是字节码）服务，而本地方法栈则为虚拟机使用到的 Native 方法服务。** 在 HotSpot 虚拟机中和 Java 虚拟机栈合二为一。

所以，为了**保证线程中的局部变量不被别的线程访问到**，虚拟机栈和本地方法栈是线程私有的。

## 字节码

### 【中等】什么是 Java 字节码？它与机器码有什么区别？

- 字节码是 JVM 的中间表示，需要 JVM 解释或编译执行
- 机器码是直接由 CPU 执行的二进制指令

### 【中等】.class 文件的结构包含哪些主要部分？

- 魔数 (Magic Number)
- 版本信息
- 常量池 (Constant Pool)
- 访问标志
- 类索引、父类索引和接口索引
- 字段表
- 方法表
- 属性表

### 【中等】如何查看 Java 字节码？常用工具有哪些？

- javap (JDK 自带）
- ASM
- Bytecode Viewer
- JBE (Java Bytecode Editor)

### 【中等】Java 字节码有哪些典型应用场景？

- **性能优化**：JIT 编译、方法内联、热点代码分析
- **AOP 与动态代理**：Spring AOP、CGLIB、JDK 动态代理
- **ORM 与懒加载**：Hibernate 字节码增强实现延迟加载
- **代码分析与安全**：静态分析（FindBugs）、漏洞检测、代码混淆
- **热部署与热修复**：JRebel、阿里 Sophix（运行时替换字节码）
- **动态语言支持**：Groovy、Kotlin 等 JVM 语言编译成字节码
- **Mock 测试**：Mockito 动态生成 Mock 类字节码
- **序列化优化**：Jackson、FastJSON 使用字节码加速反射
- **调试与监控**：Arthas、JProfiler 插桩分析执行情况
- **JVM 研究与学习**：理解 Java 语法底层实现（如`try-with-resources`、`lambda`）

**核心作用**：

- **运行时增强**（AOP、代理）
- **性能优化**（JIT、减少反射开销）
- **动态能力**（热修复、Mock 测试）
- **跨语言支持**（JVM 生态多语言）

## 故障处理

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

### 【中等】你常用哪些工具来分析 JVM 性能？

### 【中等】如何在 Java 中进行内存泄漏分析？

### 【中等】常用的 JVM 配置参数有哪些？

## 类加载

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

### 【中等】Java 中的强引用、软引用、弱引用和虚引用分别是什么？

### 【中等】Java 里的对象在虚拟机里面是怎么存储的？

### 【中等】什么是 Java 中的 JIT（Just-In-Time）?

### 【中等】JIT 编译后的代码存在哪？

### 【中等】什么是 Java 的 AOT（Ahead-Of-Time）？

### 【困难】你了解 Java 的逃逸分析吗？

### 【困难】你了解 Java 的类加载器吗？

## 调优

### 【中等】JVM 垃圾回收调优的主要目标是什么？

### 【中等】如何对 Java 的垃圾回收进行调优？
