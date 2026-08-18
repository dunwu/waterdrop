---
title: Java 基础面试一
cover: https://raw.githubusercontent.com/dunwu/images/master/archive/2025/03/020ab2bf4af8401590e0291a34f873f8.jpg
date: 2024-06-18 22:46:20
order: 1
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
permalink: /pages/6ca01ab7/
---

# Java 基础面试一

## Java 常识

### 【简单】Java 语言有什么优势？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 常识 / 语言特性

#### 💎 关键结论

Java 的核心优势是**跨平台**与**自动内存管理**：源码编译为字节码，由各平台 JVM 执行，实现"一次编写，到处运行"；GC 自动回收内存，规避手动管理内存的泄漏与悬垂指针问题。再叠加成熟的面向对象体系、JIT 高性能优化与 Spring 等庞大生态，使其成为企业级后端首选。

#### ⚡记忆卡片

- **口诀**：跨平台、GC 香，面向对象生态强，JIT 快、类型稳，健壮安全好担当
- **关键词**：JVM 字节码 ／ 自动 GC ／ JIT 编译 ／ Spring 生态 ／ 强类型
- **链路**：源码 → javac 编译字节码 → JVM 解释/JIT 执行 → 跨平台一致运行

#### 📖 核心知识

- **跨平台**：【**一次编写，到处执行（Write Once, Run Anywhere）**】——JVM 执行字节码，字节码平台无关，JVM 按平台提供不同实现。
- **自动垃圾回收**：垃圾回收（GC）自动管理内存，减少内存泄漏风险。
- **面向对象**：支持封装、继承、多态，代码结构清晰易维护。
- **高性能**：JIT 编译对热点代码做运行时优化，多线程支持高并发。
- **健壮安全 + 强大生态**：强类型检查、异常处理、JVM 安全机制；Spring、Hadoop、Android 等生态广泛支持。

#### 🔬 扩展知识

::: details

- 【L3】Java 的"跨平台"是有边界的：平台无关的是字节码而非 JVM 本身，每个操作系统需要对应的 JVM 实现；且涉及 JNI 本地库、文件系统/网络行为差异时仍需适配。JIT 还会依据运行时 Profile 做热点优化，这是纯 AOT 语言不具备的。
- 【L4】横向对比：C# 同样依赖 CLR 虚拟机层实现跨平台；Go/Rust 直接编译为机器码，靠交叉编译分发各平台产物；GraalVM Native Image 为 Java 提供 AOT 能力，以牺牲运行时优化换取毫秒级启动与更低内存，是云原生场景的新方向。

:::

#### 🔀 发散问题

- **Q：Java 为什么采用"解释 + JIT"混合执行而非纯 AOT？** → 纯解释慢、纯 AOT 失去跨平台与运行时优化能力；JIT 能基于运行时热点探测做针对性优化（如内联、逃逸分析），长期运行的服务端代码性能可逼近原生。
- **Q：自动 GC 带来什么代价？** → STW 停顿与调优成本。低延迟场景需选择 ZGC/Shenandoah 等并发收集器，见本文档「Java 里程碑版本中的核心特性有哪些？」。

### 【简单】Oracle JDK 和 Open JDK 有什么区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 常识 / JDK 发行版

#### 💎 关键结论

Java 11 之后两者**功能基本一致**，差异主要在**协议与商业模式**：OpenJDK 完全开源免费（GPL v2），每 3 个月发版、无 LTS；Oracle JDK 闭源（BCL/OTN 协议），JDK 8u221 后商用受限，每 6 个月发版、约 3 年一个 LTS。生产环境一般选用 OpenJDK 及其社区发行版。

#### ⚡记忆卡片

- **口诀**：功能同、看协议；开源免费 OpenJDK，闭源商用找 Oracle
- **关键词**：GPL v2 ／ BCL/OTN ／ LTS ／ 3 个月 vs 6 个月发版
- **链路**：OpenJDK 开源基线 → Oracle 附加商业支持与 LTS → 协议差异决定选型

#### 📖 核心知识

|          | OpenJDK                                           | Oracle JDK                                             |
| -------- | ------------------------------------------------- | ------------------------------------------------------ |
| 是否开源 | 完全开源                                          | 闭源                                                   |
| 是否免费 | 完全免费                                          | JDK8u221 之后存在限制                                  |
| 更新频率 | 一般每 3 个月发布一个版本；不提供 LTS 服务        | 一般每 6 个月发布一个版本；大概每三年推出一个 LTS 版本 |
| 功能性   | Java 11 之后，OracleJDK 和 OpenJDK 的功能基本一致 |                                                        |
| 协议     | GPL v2                                            | BCL/OTN                                                |

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/04/d1f144f5b1bd4d46a526fb4f2a889e26.png)

### 【简单】Java SE 和 Java EE 有什么区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 常识 / 平台版本

#### 💎 关键结论

Java SE 是**标准版**，提供语言核心 API（基本类型、集合、IO、网络等）与 JVM、开发工具，是一切 Java 程序的基座；Java EE 构建在 SE 之上，是**企业版**，定义 Servlet、JSP、EJB、JPA 等企业级开发规范。一句话：SE 管"语言本身"，EE 管"企业开发标准"。

#### ⚡记忆卡片

- **口诀**：SE 打底、EE 盖楼，规范叠在平台上
- **关键词**：标准版 ／ 企业版 ／ Servlet、JSP、EJB ／ Jakarta EE
- **链路**：Java SE 核心 API + JVM → Java EE 叠加企业规范 → 应用服务器落地

#### 📖 核心知识

Java 技术既是一种编程语言，又是一种平台。Java 编程语言是一种具有特定语法和风格的高级面向对象语言；Java 平台是 Java 编程语言应用程序运行的特定环境。

- **Java SE**（Java Platform, Standard Edition）- **Java 平台标准版**。Java SE 的 API 提供了 Java 编程语言的核心功能，定义了从基本类型和对象到网络、安全、数据库访问、GUI 开发和 XML 解析的高级类的所有内容。除核心 API 外，还包括虚拟机、开发工具、部署技术以及常用类库和工具包。
- **Java EE**（Java Platform, Enterprise Edition）- **Java 平台企业版**。Java EE 构建在 Java SE 基础之上，定义了企业级应用程序开发和部署的标准和规范，如：Servlet、JSP、EJB、JDBC、JPA、JTA、JavaMail、JMS。

#### 🔬 扩展知识

::: details

> 📚 延伸阅读：[Your First Cup](https://docs.oracle.com/javaee/6/firstcup/doc/gkhoy.html)

:::

### 【简单】JDK、JRE、JVM 之间有什么关系？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 常识 / 运行体系

#### 💎 关键结论

三者是层层包含关系：**JDK > JRE > JVM**。JVM 负责执行字节码；JRE = JVM + 类库，负责"运行"程序；JDK = JRE + 编译器与调试工具，负责"开发"程序。只运行装 JRE 即可，要开发必须装 JDK。

#### ⚡记忆卡片

- **口诀**：JVM 跑字节码，JRE 管运行，JDK 管开发
- **关键词**：字节码 ／ 类库 ／ javac ／ Write Once, Run Anywhere
- **链路**：javac 编译 → 字节码 → JVM 加载执行 → 跨平台一致结果

#### 📖 核心知识

- **JVM** - Java Virtual Machine，即 Java 虚拟机，是运行 Java 字节码的虚拟机。JVM 不理解 Java 源代码，这就是为什么要将 `*.java` 文件编译为 `*.class` 字节码。JVM 针对不同系统（Windows、Linux、MacOS）有不同实现，目的在于用相同的字节码执行同样的结果，这正是"**Write Once, Run Anywhere**"口号的核心。
- **JRE** - Java Runtime Environment，即 Java 运行时环境。是运行已编译 Java 程序所需的一切：JVM、Java 类库、Java 命令和其他基础结构，但不能用于创建新程序。
- **JDK** - Java Development Kit，即 Java SDK。包含 JRE 的全部功能，外加编译器（javac）和工具（javadoc、jdb 等），能够创建和编译程序。

三者关系总结：**JDK > JRE > JVM**

```
JDK = JRE + 开发/调试工具
JRE = JVM + Java 类库 + Java 运行库
JVM = 类加载系统 + 运行时内存区域 + 执行引擎
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/04/1713e34f9ed8477a8faf3feeb2d00335.png)

#### 🔬 扩展知识

::: details

- 【L3】自 JDK 9 起，官方不再单独发布 JRE：`jlink` 工具可按模块定制最小运行时镜像，JRE 的概念逐渐被"定制运行时"取代。

> 📚 延伸阅读：[stackoverflow 高票问题 - What is the difference between JDK and JRE?](https://stackoverflow.com/questions/1906445/what-is-the-difference-between-jdk-and-jre)

:::

### 【中等】Java 如何调用外部可执行程序或系统命令？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 常识 / 系统交互

#### 💎 关键结论

两种方式：`Runtime.exec()` 与 `ProcessBuilder`，二者都能启动子进程并返回 `Process` 对象。推荐用 `ProcessBuilder`——它可配置工作目录、环境变量、重定向错误流，API 更清晰；`Runtime.exec()` 是早期入口，能力更受限。

#### ⚡记忆卡片

- **口诀**：exec 起步、Builder 增强，流不读完就堵墙
- **关键词**：ProcessBuilder ／ Runtime.exec ／ Process ／ 流阻塞
- **链路**：构造命令 → 启动子进程 → 消费 stdout/stderr → waitFor 等待退出

#### 📖 核心知识

Java 提供两种调用外部可执行程序或系统命令的方式：

- **`Runtime.exec()`**：早期 API，一行启动进程，返回 `Process`；重载形式多样，但难以配置运行环境。
- **`ProcessBuilder`**（Java 5 引入，推荐）：可设置命令、工作目录（`directory()`）、环境变量（`environment()`）、错误流合并（`redirectErrorStream(true)`）与 IO 重定向，功能更完整。

::: details 调用示例

```java
// ProcessBuilder 方式（推荐）
ProcessBuilder pb = new ProcessBuilder("ping", "-n", "1", "127.0.0.1");
pb.redirectErrorStream(true); // 合并错误流，避免 stderr 缓冲区写满阻塞
Process process = pb.start();
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(process.getInputStream()))) {
    reader.lines().forEach(System.out::println);
}
int exitCode = process.waitFor(); // 等待子进程结束
```

:::

#### 🔬 扩展知识

::: details

- 【L3】**流阻塞是最常见的坑**：子进程的 stdout/stderr 缓冲区写满后会阻塞子进程，Java 侧若不持续读取输出流，`waitFor()` 可能永久挂起。解法是消费流、`redirectErrorStream(true)` 或 `inheritIO()`。
- 【L3】**命令注入风险**：命令参数若来自用户输入且拼接为单字符串，可能被注入恶意命令；应使用参数数组形式并严格校验输入。

> 📚 延伸阅读：[Java 调用外部程序实战](https://blog.csdn.net/m0_46487331/article/details/128827908)

:::

#### 🔀 发散问题

- **Q：`Process.waitFor()` 为什么会一直卡住？** → 多半是子进程输出流未被消费，缓冲区写满导致子进程阻塞。消费输出流或合并错误流即可解决。
- **Q：如何拿到子进程的退出码与超时控制？** → `process.waitFor()` 返回退出码；Java 8+ 可用 `waitFor(timeout, unit)` 限时等待，超时后 `destroyForcibly()` 强杀。

### 【中等】Java 和 C++、Go 语言的区别，各自的优缺点？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 常识 / 语言对比

#### 💎 关键结论

三者定位不同：**Java** 跨平台好、生态完善、GC 托管内存，适合企业级业务系统；**C++** 性能最高、手动管理内存、贴近硬件，适合系统级与高性能场景；**Go** 语法简洁、goroutine 并发模型轻量、编译部署简单，适合云原生基础设施。选型看场景：业务选 Java，极致性能选 C++，云原生基建选 Go。

#### ⚡记忆卡片

- **口诀**：Java 稳、C++ 快、Go 并发轻又快
- **关键词**：JVM 跨平台 ／ 手动内存 vs GC ／ goroutine ／ 生态
- **链路**：业务复杂度 → 选型权衡（性能 vs 效率 vs 生态） → 落地语言

#### 📖 核心知识

- **Java**：跨平台支持好（JVM 字节码）、生态完善（Spring 等企业级框架）、支持 GC 自动内存管理；缺点是运行依赖 JVM，启动与内存开销相对较大。
- **C++**：性能高、贴近硬件、手动创建释放内存，灵活度最高；缺点是语言复杂、内存管理易出错、跨平台编译成本高。
- **Go**：并发能力强（goroutine 轻量级线程，M:N 调度）、语法简洁、静态编译单二进制易部署；缺点是泛型与抽象能力较晚引入（Go 1.18 引入泛型）、生态偏基础设施。

#### 🔬 扩展知识

::: details

- 【L3】并发模型对比：Go 的 goroutine 由运行时以 M:N 模型调度到 OS 线程，栈初始仅约 2KB 可动态增长；Java 在 21 引入虚拟线程（JEP 444）后同样具备 M:N 轻量调度能力，二者在"海量轻量并发"上已趋同。
- 【L4】资源清理哲学对比：C++ 靠 RAII 析构函数确定性释放；Java 无析构函数，靠 `try-with-resources` + GC；Go 靠 `defer` 语句显式延迟释放，介于两者之间。

:::

#### 🔀 发散问题

- **Q：Java 21 虚拟线程出现后，Java 的并发能力是否追平 Go？** → 模型上已接近：都是 M:N 调度的轻量线程。差异在语言原生度——goroutine 与 channel 是语言一等公民，虚拟线程构建在既有 Thread API 之上，迁移成本低但抽象不如 Go 彻底。见本文档「Java 里程碑版本中的核心特性有哪些？」。
- **Q：为什么高性能计算领域少见 Java？** → JIT 预热、GC 停顿与对象内存开销对纳秒级延迟敏感场景不友好；但低延迟优化（对象池、堆外内存、ZGC）后 Java 在交易系统等领域也有落地。

### 【中等】Java 里程碑版本中的核心特性有哪些？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Java 常识 / 版本演进

#### 💎 关键结论

抓住一条主线：**Java 8 函数式化**（Lambda、Stream），**Java 9~11 平台化**（模块化、新 GC），**Java 17~21 现代化**（模式匹配、Record、虚拟线程）。面试重点答 8、11、17、21 四个 LTS 版本即可，版本号与特性要能对得上。

#### ⚡记忆卡片

- **口诀**：8 函数式、11 模块化、17 模式匹配、21 虚拟线程
- **关键词**：Lambda ／ Stream ／ JPMS ／ ZGC ／ Record ／ 虚拟线程
- **链路**：语法简化（8）→ 平台治理（9/11）→ 类型表达力（14/17）→ 并发革新（21）

#### 📖 核心知识

- **Java 8（2014）**
  - **Lambda 表达式**：函数式编程支持（`(a, b) -> a + b`）
  - **Stream API**：链式数据流操作（`filter/map/reduce`）
  - **默认方法**：接口支持默认实现（`default void foo() {}`）
  - **新的日期时间 API**：`java.time`（`LocalDate`、`ZonedDateTime`）
  - **Optional**：优雅处理 `null`（`Optional.ofNullable(x)`）
- **Java 9（2017）**
  - **JPMS 模块化系统**：通过 `module-info.java` 声明模块依赖，实现类库级别的封装；**G1 从本版本起成为默认 GC**
  - **Reactive Streams**：`java.util.concurrent.Flow` 定义响应式编程标准接口
  - **接口私有方法**：接口中可定义 `private` 方法，复用默认方法中的逻辑
  - **集合工厂方法**：`List.of()`、`Map.of()` 快速创建不可变集合
- **Java 10（2018）**
  - **局部变量类型推断**：`var list = new ArrayList<String>()`
- **Java 11（2018，LTS）**
  - **HTTP Client API**：标准化的异步 HTTP 客户端（`HttpClient`）
  - **字符串 API 增强**：`isBlank()`、`lines()`、`repeat()`；lambda 参数支持 `var`
  - **新垃圾收集器**：**ZGC** 作为实验性特性引入（JDK 15 起生产可用）；**Shenandoah** 自 JDK 12 进入 OpenJDK
- **Java 14（2020）**
  - **switch 表达式增强（正式版）**：支持 `->` 箭头语法和 `yield` 返回值
  - **Record（预览）**：不可变数据载体类（`record Point(int x, int y) {}`），Java 16 转正
  - **Helpful NullPointerExceptions**：NPE 信息精确到具体变量（`Cannot invoke "String.length()" because "s" is null`）
  - **instanceof 模式匹配（预览）**：`if (obj instanceof String s)` 直接绑定变量
- **Java 17（2021，LTS）**
  - **密封类（Sealed Classes）**：限制类继承（`permits` 子类）
  - **instanceof 模式匹配（正式版）**：类型检查与转换合二为一
  - **文本块（正式版）**：多行字符串（`"""..."""`），Java 15 转正
  - **Record（正式版）**：不可变数据类
  - **switch 模式匹配（预览）**：`case Point p -> ...`
  - **移除实验性 AOT/JIT**：删除 **GraalVM** 相关实验性特性
- **Java 21（2023，LTS）**
  - **虚拟线程（Virtual Threads）**：轻量级线程（`Thread.startVirtualThread()`），M:N 调度模型
  - **结构化并发（预览）**：简化多线程任务管理（`StructuredTaskScope`）
  - **记录模式（Record Patterns）**：解构记录类（`if (obj instanceof Point(int x, int y))`）
  - **switch 模式匹配（正式版）**：`switch` 中支持类型模式、守卫条件、`null` 分支
  - **序列集合（Sequenced Collections）**：新增 `SequencedCollection`/`SequencedSet`/`SequencedMap` 接口，统一有序集合的首尾访问
  - **未命名变量和模式（预览）**：用 `_` 表示不使用的变量（`var _ = compute();`）
  - **字符串模板（预览）**：`STR."Hello \{name}"` 安全高效的字符串插值（该特性后续被撤回，JDK 23 移除）
  - **作用域值 Scoped Values（预览）**：比 `ThreadLocal` 更安全高效的线程上下文传递方案，专为虚拟线程设计
  - **分代 ZGC**：针对年轻代优化的 ZGC，大幅降低 GC 开销
  - **弃用 Windows 32-bit**：正式放弃对 32 位 Windows 的支持

#### 🔬 扩展知识

::: details

- 【L3】为什么 8、11、17、21 被反复强调？它们是 **LTS（长期支持）版本**，商业发行版只对 LTS 提供长期补丁，企业升级基本沿 LTS 路线走。
- 【L4】发布节奏演进：Java 9 之前按特性打包、动辄数年一版；Java 10 起改为**每 6 个月固定发布**（JEP 322 Time-Based Release），特性以预览（Preview）→ 孵化（Incubator）→ 转正的方式渐进落地，这也是很多特性跨多个版本出现的原因。

:::

#### 🔀 发散问题

- **Q：为什么很多公司至今仍停留在 Java 8？** → 升级成本集中在模块化（JPMS）破坏性变更、依赖库兼容性与 GC 调优经验迁移；从 8 直升 17/21 需处理被移除 API（如 `javax.xml.bind`）与反射限制（强封装）。
- **Q：虚拟线程适合替代传统线程池吗？** → 适合 IO 密集型场景，虚拟线程不再需要池化（用完即弃）；CPU 密集型任务仍受物理核心限制，不宜盲目替换。

## Java 基础语法

### 【简单】Java 有几种注释形式？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 基础语法 / 注释

#### 💎 关键结论

三种：**单行注释** `//`、**多行注释** `/* */`、**文档注释** `/** */`。前两种仅供人阅读，编译器直接忽略；文档注释可被 javadoc 工具提取，自动生成 API 文档。

#### ⚡记忆卡片

- **口诀**：单行双斜杠，块注释斜杠星，文档注释星开头
- **关键词**：`//` ／ `/* */` ／ `/** */` ／ javadoc
- **链路**：源码注释 → 编译器忽略 → javadoc 提取 → API 文档

#### 📖 核心知识

注释用于在源代码中解释代码的作用，可以增强程序的可读性、可维护性。空白行或注释的内容都会被 Java 编译器忽略掉。Java 注释主要有三种类型：单行注释、多行注释、文档注释（JavaDoc）。

::: details 三种注释示例

```java
public class HelloWorld {
    /**
     * 文档注释
     */
    public static void main(String[] args) {
        // 单行注释
        /*
        多行注释
        */
        System.out.println("Hello World");
    }

}
```

:::

### 【简单】Java 有哪些标识符命名规则？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 基础语法 / 命名规范

#### 💎 关键结论

标识符由字母、数字、`$`、`_` 组成，**不能以数字开头**、不能用关键字、大小写敏感。惯例上遵循驼峰命名：类名大驼峰、方法/变量小驼峰、常量全大写蛇形。

#### ⚡记忆卡片

- **口诀**：字母数字下划线，数字不能打头前；类大驼、方小驼，常量全大写加线
- **关键词**：首字符限制 ／ 关键字禁用 ／ 大小写敏感 ／ 驼峰命名
- **链路**：语法规则（合法）→ 命名规范（可读）→ 团队协作统一

#### 📖 核心知识

Java 所有的组成部分都需要名字，类名、变量名以及方法名都被称为标识符。

**标识符基本规则**：

- **允许字符**：可包含字母、数字、`$`、`_`
- **首字符要求**：不能以数字开头
- **禁止关键字**：如 `class`、`public` 等保留字不可作为标识符
- **大小写敏感**：`age` 和 `Age` 被视为不同标识符

**命名规范**：标识符通常遵循[驼峰命名法](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)。

| **类型**        | **命名法**                | **示例**                      |
| :-------------- | :------------------------ | :---------------------------- |
| **类/接口名**   | 大驼峰（Upper CamelCase） | `StudentInfo`、`UserService`  |
| **方法/变量名** | 小驼峰（Lower CamelCase） | `getUserName()`、`studentAge` |
| **常量名**      | 全大写蛇形（SNAKE_CASE）  | `MAX_SIZE`、`DEFAULT_TIMEOUT` |

**注意事项**：

- **避免使用 `$`**：虽然合法，但通常用于编译器生成代码
- **无长度限制**：但应保持简洁且语义明确（如用 `count` 而非 `c`）
- **Unicode 支持**：可使用中文等字符（但不推荐）

### 【简单】Java 中有哪些关键字？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 基础语法 / 关键字

#### 💎 关键结论

Java 关键字按用途分为访问修饰符、类/方法修饰符、流程控制、异常处理、包管理、基本类型、引用几大类，保留字不能用作标识符。注意：`null`、`true`、`false` **不是关键字**，而是字面常量。

#### ⚡记忆卡片

- **口诀**：修饰、控制、异常、包，类型引用跑不了；null 不是关键字，字面常量要记牢
- **关键词**：public/private ／ class/interface ／ if/for/return ／ try/catch ／ this/super
- **链路**：关键字定义语法 → 编译器保留 → 标识符禁用

#### 📖 核心知识

下面列出了 Java 保留字，这些保留字不能用于常量、变量和任何标识符的名称。

| 分类                 | 关键字                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 访问级别修饰符       | private、protected、public、default                                                                                            |
| 类，方法和变量修饰符 | abstract、class、extends、final、implements、interface、native、new、static、strictfp、synchronized、transient、volatile、enum |
| 程序控制语句         | break、continue、return、do、while、if、else、for、instanceof、switch、case                                                    |
| 错误处理             | assert、try、catch、throw、throws、finally                                                                                     |
| 包相关               | import、package                                                                                                                |
| 数据类型             | boolean、byte、char、short、int、long、float、double、enum                                                                     |
| 变量引用             | super、this、void                                                                                                              |
| 其他保留字           | goto、const                                                                                                                    |

> 注意：Java 的 `null` 不是关键字，类似于 `true` 和 `false`，它是一个字面常量，不允许作为标识符使用。**官方文档**：https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html

### 【简单】Java 中 `static` 关键字有什么用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 基础语法 / 关键字

#### 💎 关键结论

`static` 声明**类级别成员**，不属于任何实例，类加载时初始化、所有实例共享。四种用法：静态变量、静态方法、静态代码块、静态内部类。核心记住两点：静态成员随类而非对象存在；静态方法无实例上下文，不能访问实例成员。

#### ⚡记忆卡片

- **口诀**：静态属类不属象，加载初始化一次，四用法：变量方法块内类
- **关键词**：类级别 ／ `<clinit>` ／ 类名调用 ／ 隐藏非重写
- **链路**：类加载 → `<clinit>` 按声明顺序初始化 → 静态成员全局共享

#### 📖 核心知识

**四种用法**：

| **修饰目标**   | **特点**                             | **示例**                                 |
| -------------- | ------------------------------------ | ---------------------------------------- |
| **静态变量**   | 类共享，所有实例访问同一份           | `static int count = 0;`                  |
| **静态方法**   | 可直接通过类名调用，不能访问实例成员 | `static int add(int a, int b)`           |
| **静态代码块** | 类加载时执行一次，用于初始化         | `static { init(); }`                     |
| **静态内部类** | 不依赖外部实例，可独立创建           | `Outer.Inner inner = new Outer.Inner();` |

**关键细节**：

- **初始化时机**：静态变量和静态代码块按**声明顺序**执行，在类加载的 `<clinit>` 阶段。
- **静态方法限制**：
  - 不能使用 `this`/`super`（无实例上下文）。
  - 只能直接访问静态成员，访问实例成员需先创建对象。
  - 不能被 `@Override`（重写属于实例方法的多态机制），但能被**隐藏（hide）**。
- **静态导入**（Java 5+）：`import static java.lang.Math.*;` 可直接使用 `sqrt(2)`。

::: details 静态成员使用示例

```java
public class Counter {
    private static int count = 0;  // 静态变量

    static {  // 静态代码块，类加载时执行一次
        System.out.println("Counter 类已加载");
    }

    public Counter() {
        count++;
    }

    public static int getCount() {  // 静态方法
        return count;
    }
}
```

:::

#### 🔀 发散问题

- **Q：父子类都有静态代码块，执行顺序如何？** → 先父后子：类加载时先执行父类 `<clinit>` 再执行子类，同类内部按声明顺序。静态成员初始化与构造器无关，首次主动使用类时触发。
- **Q：静态方法能被重写吗？** → 不能，重写是运行时多态，依赖实例；子类同名静态方法只是**隐藏**父类方法，调用由声明类型决定。

### 【中等】`transient` 关键字有什么用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 基础语法 / 序列化

#### 💎 关键结论

`transient` 修饰的字段**不参与 JDK 序列化**：序列化时被跳过，反序列化后恢复为类型默认值（`int` → 0，对象 → `null`）。典型用途是保护密码等敏感数据、排除可派生的临时字段。注意它只对 `Serializable` 的默认序列化生效，对静态字段和 `Externalizable` 无效。

#### ⚡记忆卡片

- **口诀**：transient 一标，序列化绕道；反序列化回来，默认值报到
- **关键词**：跳过持久化 ／ 默认值恢复 ／ Serializable ／ 静态字段无效
- **链路**：字段标记 transient → 序列化跳过 → 反序列化赋默认值

#### 📖 核心知识

- **核心作用**：序列化对象时，被 `transient` 修饰的字段不会被持久化；反序列化时，该字段恢复为类型默认值。常用于敏感数据或可派生的字段。
- **仅适用于 `Serializable` 接口的默认序列化**，对 `Externalizable` 无效（需手动实现 `writeExternal`/`readExternal`）。
- **静态字段**默认不被序列化（无论是否加 `transient`），因为序列化针对的是对象状态而非类状态。
- **`ArrayList` 中的巧妙用法**：`ArrayList` 用 `transient Object[] elementData` 修饰底层数组，自定义 `writeObject`/`readObject` 仅序列化有效元素，避免序列化 `null` 浪费空间。

::: details 典型场景示例

```java
public class User implements Serializable {
    private String username;
    private transient String password;  // 密码不参与序列化
    private transient int age;          // 临时字段不持久化

    // 反序列化后，password=null, age=0
}
```

:::

#### 🔬 扩展知识

::: details

- 【L3】`ArrayList` 的 `elementData` 加了 `transient` 却能正常序列化，看似矛盾，实则因为它重写了 `writeObject`：手动遍历 `[0, size)` 区间逐个写出元素，`transient` 只是阻止默认机制把整个数组（含大量 null 容量）写出去。
- 【L4】`transient` 是 JDK 原生序列化专属；JSON 序列化框架（Jackson、Fastjson 等）不识别它，需要各自的注解（如 Jackson 的 `@JsonIgnore`）。

:::

#### 🔀 发散问题

- **Q：静态字段会被序列化吗？** → 不会，序列化保存的是对象状态，静态字段属于类；反序列化后读到的是当前 JVM 中该类的静态字段值。
- **Q：`serialVersionUID` 有什么作用？** → 反序列化时校验类版本一致性，不匹配抛 `InvalidClassException`；不显式声明则由编译器根据类结构自动生成，类结构变动会导致兼容性问题。

### 【简单】`native` 关键字有什么用？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 基础语法 / 关键字

#### 💎 关键结论

`native` 修饰的方法叫**本地方法**，由非 Java 语言（如 C/C++）实现，通过 JNI 调用。它只有声明没有方法体，是 Java 调用操作系统 API 与底层库的桥梁，但上下文切换有性能开销，不宜频繁调用。

#### ⚡记忆卡片

- **口诀**：native 无体借外力，JNI 桥接通底层
- **关键词**：本地方法 ／ JNI ／ 无方法体 ／ 上下文切换
- **链路**：Java 声明 native → JVM 经 JNI 调用本地库 → 操作系统/硬件能力

#### 📖 核心知识

**特点**：

- **无方法体**：只有声明，如 `public native int hashCode();`。
- **跨平台桥梁**：用于调用操作系统 API 或底层库（如 `System.arraycopy` 底层是 `native`）。
- **性能考量**：调用涉及 Java 到本地的上下文切换，频繁调用有性能开销。

**典型应用**：

- `Object.hashCode()`：与 JVM 内存布局相关，由 native 实现。
- `Thread.start0()`：调用操作系统线程创建 API。
- `System.currentTimeMillis()`：调用系统时间 API。
- `Unsafe` 类：直接内存操作、CAS 等。

### 【中等】移位操作中 `<<`、`>>`、`>>>` 有什么区别？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 基础语法 / 位运算

#### 💎 关键结论

三个运算符的差别在**补位方式**：`<<` 左移低位补 0；`>>` 算术右移高位补符号位；`>>>` 无符号右移高位补 0。另外 Java 对移位位数隐式取模：`int` 按 32 取模、`long` 按 64 取模，所以 `x << 32` 等效不移位。

#### ⚡记忆卡片

- **口诀**：左移补零快乘二，右移补符保符号，三箭头无符零填头；位数超界取模走
- **关键词**：低位补 0 ／ 符号位填充 ／ 无符号右移 ／ %32、%64
- **链路**：移位运算 → 位数取模 → CPU 取低 5/6 位 → 结果确定

#### 📖 核心知识

**三个运算符的语义**：

| **操作符** | **示例**   | **等效操作**        | **说明**                       |
| :--------- | :--------- | :------------------ | :----------------------------- |
| `<<`       | `x << 35`  | `x << 3` (35%32=3)  | 左移，低位补 0                 |
| `>>`       | `x >> 35`  | `x >> 3` (35%32=3)  | 右移，高位补符号位（算术右移） |
| `>>>`      | `x >>> 35` | `x >>> 3` (35%32=3) | 无符号右移，高位补 0           |

**移位位数处理机制**：Java 对移位位数超限的处理采用**隐式取模运算**：

- **`int` 类型（32 位）**：实际移位位数 = `指定位数 % 32`，例如 `x << 42` → 实际左移 `42 % 32 = 10` 位
- **`long` 类型（64 位）**：实际移位位数 = `指定位数 % 64`，例如 `x << 100` → 实际左移 `100 % 64 = 36` 位

**特殊情况**：

- **移位 0 位**：任何 `x << 32` 或 `x >> 64` 等效不移位（因 `32%32=0`，`64%64=0`）。
- **负数移位**：移位位数可为负数，但会通过取模转为正数（如 `x << -6` → `x << 26`，因 `-6 % 32 = 26`）。

::: details 移位示例

```java
int i = -1; // 二进制全 1（32 个 1）
System.out.println(i << 10);  // 左移 10 位，输出 -1024
System.out.println(i << 42);  // 等效左移 10 位（42%32=10），同样输出 -1024

long l = -1L;
System.out.println(l << 70);  // 等效左移 6 位（70%64=6），输出 -64
```

:::

#### 🔬 扩展知识

::: details

- 【L3】**为什么这样设计？** ① 硬件对齐：CPU 执行移位指令时实际只使用指定位数的低 5 位（int）或低 6 位（long），Java 的取模规则与硬件行为一致，直接映射到 CPU 指令无需额外检查；② 与 C/C++ 移位行为兼容；③ 保证结果确定，避免无效大位数移位（如 `x << 1000`）产生未定义行为。
- 【L4】**位运算的典型应用**：`HashMap` 的 hash 扰动函数 `(h = key.hashCode()) ^ (h >>> 16)` 用无符号右移把高位信息混入低位；容量计算用 `n << 1` 代替乘 2。注意：对负数 `x >> 1` 并不总等于 `x / 2`（如 `-3 >> 1 = -2` 而 `-3 / 2 = -1`），因为右移是向下取整、除法是向零取整。

:::

#### 🔀 发散问题

- **Q：为什么 `1 << 31` 是负数？** → 左移后最高位（符号位）为 1，按补码解释即 -2147483648，这是整型溢出的静默回绕，见本文档「Java 是如何处理整数溢出的？」。
- **Q：用位移代替乘除法性能更好吗？** → 对 2 的幂常数，JIT 编译器会自动把乘除优化为移位指令，手写位移收益微乎其微，应优先可读性。

## Java 数据类型

### 【简单】Java 是否只支持值传递？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 数据类型 / 参数传递

#### 💎 关键结论

**Java 只支持值传递**：方法参数传的是实参的副本。基本类型传值的副本，改形参不影响实参；对象传的是**引用地址的副本**，可以通过副本修改对象内容，但重新赋值形参不会影响实参——这正是它常被误认为引用传递的原因。

#### ⚡记忆卡片

- **口诀**：基本传值拷一份，对象传址也拷一份；改内容可以，换对象不行
- **关键词**：值传递 ／ 实参副本 ／ 引用地址副本 ／ swap 失败
- **链路**：实参 → 拷贝副本给形参 → 形参局部修改 → 实参不受影响

#### 📖 核心知识

- **值传递**：方法参数传递的是实参的副本，形参变化不影响实参。
- **引用传递**：方法参数传递的是实参的地址，修改形参会同步影响实参——Java 不具备这种语义。

::: details 两个经典验证案例

```java
// 案例 1：交换失败——形参是引用副本，重新赋值不影响实参
public static void swap(Integer a, Integer b) {
    Integer temp = a;
    a = b;  // 只改了副本指向
    b = temp;
}
Integer x = 1, y = 2;
swap(x, y);  // x、y 仍是 1、2

// 案例 2：修改对象内容生效——通过副本地址操作同一对象
public static void addAge(User user) {
    user.setAge(user.getAge() + 1);  // 改的是堆上同一个对象
}
```

:::

#### 🔬 扩展知识

::: details

- 【L3】"对象传引用"的错觉来源：Java 把引用（堆对象地址）也当作"值"来拷贝传递，两个引用指向同一对象，所以"改内容"两边可见；但"换指向"只改副本，实参不变。判断标准：形参重新赋值能否影响实参——不能，就是值传递。
- 【L4】横向对比：C++ 的引用参数（`void f(int &x)`）是真正的引用传递；C# 提供 `ref`/`out` 关键字显式实现类似语义；Java 若需"输出参数"效果，通常用返回值、容器（数组/AtomicReference）或可变对象包装。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "Java 中对象作为参数是引用传递" → 传递的是引用地址的副本，形参重新赋值不影响实参，不符合引用传递定义。
- ❌ "方法里改了对象，说明是引用传递" → 能改内容是因为两个副本指向同一堆对象，这是值传递（传的值恰好是地址）的正常表现。

:::

#### 🔀 发散问题

- **Q：为什么 Java 不提供引用传递？** → 简化语义与安全性：值传递让方法无法意外替换调用方的引用，线程安全和代码可读性更好；需要多返回值时用对象/记录类封装返回即可。
- **Q：基本类型包装后传参还是值传递吗？** → 是，传的是对象引用的副本；且包装类不可变（如 `Integer`），连"改内容"都做不到，只能重新指向。

### 【简单】Java 有哪些值类型？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 数据类型 / 基本类型

#### 💎 关键结论

Java 数据类型分两类：**值类型**（8 种基本类型）与**引用类型**（其余全部，含 `String`、数组）。8 种基本类型分四族：布尔、字符、整数（byte/short/int/long）、浮点（float/double），各占 8~64 bit，都有对应包装类。

#### ⚡记忆卡片

- **口诀**：一布一符四整型，两浮点共八种；大小默认值要背，包装类一一对应
- **关键词**：8 种基本类型 ／ 4 类 ／ 默认值 ／ 包装类
- **链路**：基本类型栈上存值 → 需要对象能力 → 装箱为包装类

#### 📖 核心知识

Java 中的数据类型有两类：

- **值类型**（又叫内置数据类型、基本数据类型）
- **引用类型**（除值类型以外都是引用类型，包括 `String`、数组等）

Java 语言提供了 **8** 种基本类型，大致分为 **4** 类：布尔型、字符型、整数型、浮点型。

| 基本数据类型 | 分类       | 大小   | 默认值     | 取值范围                | 包装类    | 说明                                          |
| ------------ | ---------- | ------ | ---------- | ----------------------- | --------- | --------------------------------------------- |
| `boolean`    | **布尔型** | -      | `false`    | `false, true`           | Boolean   | `boolean` 的大小，是由具体的 JVM 实现来决定的 |
| `char`       | **字符型** | 16 bit | `'\u0000'` | `[0, 2^16 - 1]`         | Character | 存储 Unicode 码，用单引号赋值                 |
| `byte`       | **整数型** | 8 bit  | `0`        | `[-2^7, 2^7 - 1]`       | Byte      |                                               |
| `short`      | **整数型** | 16 bit | `0`        | `[-2^15, 2^15 - 1]`     | Short     |                                               |
| `int`        | **整数型** | 32 bit | `0`        | `[-2^31, 2^31 - 1]`     | Integer   |                                               |
| `long`       | **整数型** | 64 bit | `0L`       | `[-2^63, 2^63 - 1]`     | Long      | 赋值时一般在数字后加上 `l` 或 `L`             |
| `float`      | **浮点型** | 32 bit | `0.0f`     | `[2^-149, 2^128 - 1]`   | Float     | 赋值时必须在数字后加上 `f` 或 `F`             |
| `double`     | **浮点型** | 64 bit | `0.0d`     | `[2^-1074, 2^1024 - 1]` | Double    | 赋值时一般在数字后加 `d` 或 `D`               |

#### 🔬 扩展知识

::: details

> 📚 延伸阅读：[菜鸟教程 - Java 基本数据类型](https://www.runoob.com/java/java-basic-datatypes.html)

:::

### 【简单】什么是装箱、拆箱？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 数据类型 / 包装类

#### 💎 关键结论

装箱是基本类型转包装类，由编译器自动调用 `valueOf` 实现；拆箱是包装类转基本类型，调用 `xxxValue` 实现。Java 为 8 种基本类型都提供了对应包装类，目的就是让基本类型与引用类型可以互相转换，字节码可直接验证这两条结论。

#### ⚡记忆卡片

- **口诀**：装箱 valueOf，拆箱 xxxValue；编译器自动调，字节码里找得到
- **关键词**：包装类 ／ valueOf ／ intValue ／ 自动装箱
- **链路**：基本类型 → 装箱（valueOf）→ 堆上包装对象 → 拆箱（xxxValue）→ 基本类型

#### 📖 核心知识

Java 中为每一种基本数据类型提供了相应的包装类：

```java
Byte <-> byte
Short <-> short
Integer <-> int
Long <-> long
Float <-> float
Double <-> double
Character <-> char
Boolean <-> boolean
```

**引入包装类的目的**：提供一种机制，使得**基本数据类型可以与引用类型互相转换**（如加入泛型集合、支持 `null` 语义）。

- **装箱（boxing）是将值类型转换为引用类型**（如 `int` 转 `Integer`），通过调用包装类的 `valueOf` 方法实现。
- **拆箱（unboxing）是将引用类型转换为值类型**（如 `Integer` 转 `int`），通过调用包装类的 `xxxValue` 方法实现（xxx 代表对应的基本数据类型）。

因此：`Integer a = 10` 等价于 `Integer a = Integer.valueOf(10)`；`int b = a` 等价于 `int b = a.intValue()`。

::: details 自动装箱拆箱的字节码验证

```java
Integer a = 10;  //装箱
int b = a;   //拆箱
```

上面这两行代码对应的字节码为：

```java
   L1

    LINENUMBER 8 L1

    ALOAD 0

    BIPUSH 10

    INVOKESTATIC java/lang/Integer.valueOf (I)Ljava/lang/Integer;

    PUTFIELD AutoBoxTest.i : Ljava/lang/Integer;

   L2

    LINENUMBER 9 L2

    ALOAD 0

    ALOAD 0

    GETFIELD AutoBoxTest.i : Ljava/lang/Integer;

    INVOKEVIRTUAL java/lang/Integer.intValue ()I

    PUTFIELD AutoBoxTest.n : I

    RETURN
```

通过字节码不难发现：装箱其实就是调用了包装类的 `valueOf()` 方法；拆箱其实就是调用了 `xxxValue()` 方法。

:::

#### 🔬 扩展知识

::: details

- 【L3】装箱不等于 new 对象：`valueOf` 会先查缓存，`Integer` 等包装类对 -128~127 区间的值复用缓存对象，这直接影响 `==` 比较结果，见本文档「包装类型的缓存机制了解么？」。
- 【L4】性能视角：每次装箱都在堆上分配（或复用缓存）对象，包装对象比基本类型多 12~16 字节对象头开销；高频计算路径上应优先基本类型，避免隐式装箱引发 GC 压力。

> 📚 延伸阅读：[深入剖析 Java 中的装箱和拆箱](https://www.cnblogs.com/dolphin0520/p/3780005.html)

:::

#### 🔀 发散问题

- **Q：`Integer a = 10; int b = a;` 会创建几个对象？** → 最多 1 个：装箱可能命中缓存（不新建），拆箱只取值不建对象；超出缓存范围时装箱新建 1 个。
- **Q：泛型集合为什么不能放基本类型？** → 泛型参数必须是引用类型，`List<int>` 非法，只能 `List<Integer>`，这是装箱的主要来源之一；Valhalla 项目正探索原生类型泛型以消除这一开销。

### 【中等】包装类型的缓存机制了解么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Java 数据类型 / 包装类

#### 💎 关键结论

多数包装类会缓存常用值：`Byte`/`Short`/`Integer`/`Long` 缓存 [-128,127]，`Character` 缓存 [0,127]，`Boolean` 缓存 TRUE/FALSE，`Float`/`Double` 无缓存。`valueOf` 命中范围时复用缓存对象、超出则 `new` 新对象，这导致 `==` 结果随数值区间"时真时假"——比较值必须用 `equals`。`Integer` 缓存上限可通过 `-XX:AutoBoxCacheMax` 调整。

#### ⚡记忆卡片

- **口诀**：整型缓存负一二八到一二七，命中复用超界 new；比值要用 equals，别拿双等碰运气
- **关键词**：[-128,127] ／ valueOf ／ AutoBoxCacheMax ／ 享元模式
- **链路**：装箱调 valueOf → 命中缓存返回复用对象 → 超范围 new 新对象 → == 结果不确定

#### 📖 核心知识

Java 基本数据类型的包装类大部分都用到了缓存机制来提升性能：

- `Byte`、`Short`、`Integer`、`Long` 默认缓存数值 **[-128，127]** 的对应对象；`Character` 缓存 **[0, 127]**；`Boolean` 直接返回 `TRUE`/`FALSE`；`Float` 和 `Double` 没有缓存。超出范围仍会创建新对象，缓存范围大小是性能与资源之间的权衡。

::: tabs

@tab **`Integer` 缓存**

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static {
        // high value may be configured by property
        int h = 127;
    }
}
```

@tab **`Character` 缓存**

```java
public static Character valueOf(char c) {
    if (c <= 127) { // must cache
      return CharacterCache.cache[(int)c];
    }
    return new Character(c);
}

private static class CharacterCache {
    private CharacterCache(){}
    static final Character cache[] = new Character[127 + 1];
    static {
        for (int i = 0; i < cache.length; i++)
            cache[i] = new Character((char)i);
    }

}
```

@tab **`Boolean` 缓存**

```java
public static Boolean valueOf(boolean b) {
    return (b ? TRUE : FALSE);
}
```

@tab `Float` 和 `Double` 无缓存

两种浮点数类型的包装类 `Float`、`Double` 并没有实现缓存机制。

```java
Integer i1 = 33;
Integer i2 = 33;
System.out.println(i1 == i2);// 输出 true

Float i11 = 333f;
Float i22 = 333f;
System.out.println(i11 == i22);// 输出 false

Double i3 = 1.2;
Double i4 = 1.2;
System.out.println(i3 == i4);// 输出 false
```

:::

**经典问题**：下面代码输出 `true` 还是 `false`？

```java
Integer i1 = 40;
Integer i2 = new Integer(40);
System.out.println(i1==i2);
```

`Integer i1=40` 会发生装箱，等价于 `Integer.valueOf(40)`，直接复用缓存中的对象；而 `new Integer(40)` 总是创建新对象。答案是 `false`。

包装类通过缓存一定范围的常用数值、避免重复创建对象来减少内存消耗，这正是**享元模式**（设计模式之一）的应用。记住：**所有整型包装类对象之间值的比较，全部使用 equals 方法比较**。

#### 🔬 扩展知识

::: details

- 【L3】**Integer 缓存上限可调**：`Integer` 的缓存上限可通过 JVM 参数 `-XX:AutoBoxCacheMax=<size>` 调整，该参数在 `IntegerCache` 静态初始化时读取：

```java
// Integer.IntegerCache 源码（JDK 8+）
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];
    static {
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            int i = parseInt(integerCacheHighPropValue);
            i = Math.max(i, 127);
            h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
        }
        high = h;
        cache = new Integer[(high - low) + 1];
        // 初始化 cache[] 数组...
    }
}
```

关键细节：参数名是 `-XX:AutoBoxCacheMax`，但实际读取的系统属性是 `java.lang.Integer.IntegerCache.high`；且仅影响 `Integer`，`Long`/`Short`/`Byte` 的上限**固定为 127 不可调**。

- 【L3】**缓存的堆内结构**：缓存是一个静态 final 数组，在类加载的 `<clinit>` 阶段一次性分配。以默认 `IntegerCache` 为例：high=127、low=-128 → 分配 256 个 `Integer` 对象；开启指针压缩时每个约 16 字节对象头 + 4 字节数据 ≈ 20 字节，合计约 5 KB，对堆几乎无感知。

:::

#### 🏭 实战场景

::: details

频繁装箱在高并发路径上会产生大量临时对象，引发 GC 压力。定量估算：

```
假设 QPS = 10,000，每次装箱 Long 对象（24 字节对象头 + 8 字节数据 = 32 字节）：
- 每秒产生 10,000 × 32 = 320 KB 临时对象
- 每分钟 = 19.2 MB，每小时 ≈ 1.15 GB 对象分配
- 若未命中缓存（Long 缓存仅 -128~127），所有装箱都是 new Long()
- 年轻代频繁 Minor GC → 晋升老年代 → 可能触发 Full GC
```

**优化策略**：高并发路径上避免装箱、优先用基本类型；若必须用包装类型，确保数值在缓存范围内；必要时用 `-XX:AutoBoxCacheMax=4096` 扩大 Integer 缓存（注意堆内存开销）。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "`Integer i1 = 40; i1 == i2` 为 true，说明 == 可以比较包装类的值" → 只是命中了缓存、两个引用指向同一对象；换个数值（如 400）结果就变 false，`==` 比较的始终是引用。
- ❌ "`-XX:AutoBoxCacheMax` 能调大所有包装类的缓存" → 只对 `Integer` 生效，`Long`/`Short`/`Byte` 上限固定 127。

:::

#### 🔀 发散问题

- **Q：为什么 `Float`/`Double` 不实现缓存？** → 浮点数在任意区间内密度极高（几乎不可能命中），缓存收益趋近于零，设计上直接放弃。
- **Q：默认缓存范围为什么是 -128~127？** → 小数值在循环计数、索引等场景使用频率最高，缓存这段是性能与内存的平衡点；范围过大反而浪费常驻内存。
- **Q：`new Integer(40)` 和 `Integer.valueOf(40)` 有什么差别？** → 前者无条件新建堆对象；后者先查缓存，命中则复用。Java 9 起 `new Integer()` 构造器已被标记废弃，应始终用 `valueOf`。

### 【简单】比较包装类型为什么不能用 ==？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 数据类型 / 包装类

#### 💎 关键结论

`==` 比较的是**对象引用**而非值。由于包装类会缓存常用数值（如 `Integer`/`Long` 缓存 [-128,127]），装箱命中缓存时返回同一对象，`==` 恰好为 true；超出范围则新建对象，结果为 false。结果随数值区间变化、不可依赖，所以比较值一律用 `equals`。

#### ⚡记忆卡片

- **口诀**：双等比引用，命中是巧合；比值用 equals，不用碰运气
- **关键词**：引用比较 ／ 缓存区间 ／ equals ／ Long.valueOf
- **链路**：装箱调 valueOf → 命中缓存同一对象（== true）→ 超范围 new（== false）

#### 📖 核心知识

Java 值类型的包装类大部分都使用了缓存机制来提升性能：

- `Byte`、`Short`、`Integer`、`Long` 这 4 种包装类，默认都缓存数值在 **[-128，127]** 范围的对象；`Character` 缓存 **[0,127]**；`Boolean` 直接返回 `TRUE`/`FALSE`。
- 试图装箱的数值如果超出缓存范围，则会创建新的对象，导致 `==` 结果不一致（缓存机制详见本文档「包装类型的缓存机制了解么？」）。

::: details Long.valueOf 源码验证

```java
public static Long valueOf(long l) {
    final int offset = 128;
    if (l >= -128 && l <= 127) { // will cache
        return LongCache.cache[(int)l + offset];
    }
    return new Long(l);
}
```

:::

#### 🔬 扩展知识

::: details

- 【L3】两种正确的比较姿势：① `a.equals(b)`（`Integer.equals` 先 instanceof 判型再比较内部 int 值）；② 先拆箱再比较基本类型 `a.intValue() == b.intValue()`，但需先判空，否则 NPE。
- 【L4】同类陷阱：`String` 的 `==` 同样比较引用——字面量进字符串常量池会复用，`"a" == "a"` 为 true，但 `new String("a") == new String("a")` 为 false，本质与包装类缓存是同一种"池化复用"设计。

:::

#### 🔀 发散问题

- **Q：`Integer a = 128; Integer b = 128;` 时 `a == b` 结果是什么？换成 127 呢？** → 128 超出缓存范围为 false；127 命中缓存、指向同一对象为 true。
- **Q：`Long` 的缓存范围和 `Integer` 一样吗？** → 一样，都是 [-128,127]，且 `Long` 上限不可通过参数调整，见本文档「包装类型的缓存机制了解么？」。

### 【中等】为什么浮点数运算的时候会有精度丢失的风险？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Java 数据类型 / 浮点数

#### 💎 关键结论

根本原因是 **IEEE 754 用有限二进制位表示实数**：很多十进制小数（如 0.1）转成二进制是无限循环小数，尾数位装不下只能舍入，精度在**存储时就已丢失**，不是运算的锅。典型后果：小数减法不相等、大数吃小数、累加误差放大；金额场景必须用 `BigDecimal` 或放大整数。

#### ⚡记忆卡片

- **口诀**：0.1 化二进制循环无尽头，尾数装不下舍入丢精度；大数吃小数，累加误差滚雪球
- **关键词**：IEEE 754 ／ 尾数舍入 ／ 大数吃小数 ／ 累加误差
- **链路**：十进制小数 → 二进制无限循环 → 尾数截断舍入 → 存储即不精确 → 运算误差显现

#### 📖 核心知识

**（1）IEEE 754 浮点数结构**

Java 的 `float`（32 位）和 `double`（64 位）遵循 IEEE 754 标准：

```
float (32位):  | 符号 S (1bit) | 指数 E (8bit) | 尾数 M (23bit) |
double (64位): | 符号 S (1bit) | 指数 E (11bit) | 尾数 M (52bit) |

数值 = (-1)^S × (1.M) × 2^(E - bias)
- float 的 bias = 127，double 的 bias = 1023
- 尾数隐含 1，实际精度为 24bit (float) / 53bit (double)
```

以 0.1 为例，它无法用二进制精确表示，是一个无限循环小数（乘 2 取整法）：

```
0.1 × 2 = 0.2 → 0；0.2 × 2 = 0.4 → 0；0.4 × 2 = 0.8 → 0
0.8 × 2 = 1.6 → 1；0.6 × 2 = 1.2 → 1；0.2 × 2 = 0.4 → 0（开始循环）
0.1₁₀ = 0.0001100110011...₂（无限循环）
```

尾数位数有限（float 23bit，double 52bit），超出部分被**舍入（rounding）**，造成精度损失。

**（2）精度丢失的三种典型场景**

::: details 场景一：十进制小数无法精确表示

```java
float a = 2.0f - 1.9f;
float b = 1.8f - 1.7f;
System.out.println(a);      // 0.100000024（非 0.1）
System.out.println(b);      // 0.099999905（非 0.1）
System.out.println(a == b); // false
```

:::

::: details 场景二：大数吃小数

数量级差距过大时，加法可能被忽略：

```java
double big = 1.0e16;
double small = 1.0;
System.out.println(big + small == big);  // true！small 被"吃掉"
// 原因：big 和 small 数量级差 10^16，small 的尾数在对阶时全部移出，变成 0
```

:::

::: details 场景三：累加误差放大

大量浮点数累加时误差逐步累积：

```java
double sum = 0.0;
for (int i = 0; i < 100000; i++) {
    sum += 0.1;  // 每次加 0.1 都有微小误差
}
System.out.println(sum);  // 10000.000000018848（非精确 10000.0）
```

:::

**（3）为什么这个问题在 Java 中无法避免？**

- Java 没有内置的 decimal 类型（MySQL 有 DECIMAL，C# 有 decimal），`float`/`double` 就是 IEEE 754 二进制浮点数。
- `BigDecimal` 是类库方案，语言层面不做特殊处理。
- JVM 字节码 `fadd`/`dadd` 直接映射到 CPU 浮点指令，CPU 本身就是按 IEEE 754 运算的。

#### 🔬 扩展知识

::: details

- 【L3】**有效数字定量估算**：float 尾数 24bit（含隐含位）≈ 十进制 7 位有效数字；double 53bit ≈ 15~16 位。超过有效位数的小数部分必然被舍入——这是判断"会不会丢"的实用尺子。
- 【L4】**横向对比**：C# 内置 `decimal`（128 位十进制浮点）专为金融设计；MySQL 提供 `DECIMAL` 精确类型；Java 选择不在语言层内置 decimal，由 `BigDecimal` 类库承担，代价是对象分配与运算开销（慢 100-300 倍）。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "精度丢失是运算时才发生的" → 存储阶段就已舍入，`float a = 0.1f` 此刻 a 就不是精确的 0.1。
- ❌ "用 double 代替 float 就不会丢精度" → 只是有效位数更多（约 15 位 vs 7 位），0.1 依然无法精确表示，金融场景同样不能用 double。

:::

#### 🔀 发散问题

- **Q：两个浮点数如何判断"相等"？** → 不用 `==`，改用误差范围比较（`Math.abs(a-b) < epsilon`），或改用 `BigDecimal.compareTo`。
- **Q：金额计算到底该选什么？** → 见本文档「如何解决浮点数运算的精度丢失问题？」：低吞吐用 `BigDecimal`，高并发固定精度用 `long` 存"分"。

### 【简单】如何解决浮点数运算的精度丢失问题？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 数据类型 / 精度

#### 💎 关键结论

两条路线：**`BigDecimal`**（金融计算首选）用整数运算模拟十进制，精确但有性能代价；**放大整数运算**（如金额存"分"）性能最好且无精度问题。用 `BigDecimal` 记三条铁律：构造必用字符串或整数、运算用 add/subtract/multiply/divide、除法必须指定精度与舍入模式。

#### ⚡记忆卡片

- **口诀**：构造用字符串，除法定舍入，比值 compareTo，高并发 long 存分
- **关键词**：BigDecimal ／ 字符串构造 ／ RoundingMode ／ long 放大单位
- **链路**：浮点丢精度 → 整数化十进制运算（BigDecimal）→ 三铁律保正确 → 高并发换 long 放大

#### 📖 核心知识

**方案一：`BigDecimal`（推荐，金融计算首选）**

`BigDecimal` 内部结构是一个 `BigInteger`（无精度损失的整数）加上一个 `scale`（小数位数），本质是用整数运算替代浮点运算：

```java
// BigDecimal 内部表示：unscaledValue × 10^(-scale)
// new BigDecimal("0.1") → unscaledValue=1, scale=1
// new BigDecimal("1.5")  → unscaledValue=15, scale=1
```

**三条铁律**：

- 构造必用字符串或整数：`new BigDecimal("0.1")` 而非 `new BigDecimal(0.1)`（后者先转 double，误差已产生）。
- 运算用 `add/subtract/multiply/divide` 方法。
- 除法必须指定精度和舍入模式（`RoundingMode`），否则遇除不尽抛 `ArithmeticException`。

::: details BigDecimal 使用示例

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("0.9");
BigDecimal c = new BigDecimal("0.8");

BigDecimal x = a.subtract(b);   // 0.1（精确）
BigDecimal y = b.subtract(c);   // 0.1（精确）
x.compareTo(y) == 0;             // true（精确比较，用 compareTo 不用 equals）

// 除法必须指定精度和舍入模式
BigDecimal d = new BigDecimal("1");
BigDecimal e = new BigDecimal("3");
d.divide(e, 4, RoundingMode.HALF_UP);  // 0.3333
```

:::

**常用舍入模式**：

| 模式        | 规则                   |      示例 (保留 2 位)      |
| ----------- | ---------------------- | :------------------------: |
| `HALF_UP`   | 四舍五入               |        2.345 → 2.35        |
| `HALF_EVEN` | 银行家舍入（统计更准） | 2.345 → 2.34, 2.355 → 2.36 |
| `CEILING`   | 向正无穷取整           |        2.341 → 2.35        |
| `FLOOR`     | 向负无穷取整           |        2.349 → 2.34        |

**方案二：放大整数运算（高并发 + 精度敏感场景）**

```java
// 金融场景：金额用 long 表示"分"，避免浮点和 BigDecimal 开销
long price1 = 199;  // 1.99 元
long price2 = 299;  // 2.99 元
long total = price1 + price2;  // 498 分 = 4.98 元，精确不丢精度
```

**方案选择决策树**：

- 科学计算 / 允许微小误差 → `double`（性能最好）
- 金融 / 需要精确小数 → `BigDecimal`（精度最高）
- 高并发 + 固定精度（如金额）→ `long` 放大单位（性能最好 + 精度不丢）

#### 🔬 扩展知识

::: details

- 【L3】**性能代价定量**：`BigDecimal` 运算比基本类型 `double` 慢约 **100-300 倍**（对象分配 + 高精度运算）；高并发场景避免大量创建，考虑用 `long` 放大单位。比较时用 `compareTo()` 不用 `equals()`：`equals()` 同时比较值和 scale（`2.0` ≠ `2.00`），`compareTo()` 只比较值。
- 【L4】**从 double 构造的正确姿势**：`BigDecimal.valueOf(0.1)` 内部经由 `Double.toString` 转换，得到的是精确的 0.1；而 `new BigDecimal(0.1)` 直接用 double 的二进制近似值构造，结果略大于 0.1。两者差异正是"误差在构造前还是构造时引入"的分界。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "`new BigDecimal(0.1)` 和字符串构造一样精确" → double 的 0.1 本身是近似值，误差在传入前已存在；应使用字符串构造或 `BigDecimal.valueOf`。
- ❌ "`equals` 可以比较 BigDecimal 大小" → `equals` 连带 scale 比较，`2.0` 与 `2.00` 判不等；数值比较用 `compareTo`。

:::

#### 🔀 发散问题

- **Q：`divide` 为什么会抛 `ArithmeticException`？** → 除不尽时结果是无限小数（如 1÷3），无默认精度只能报错；必须显式指定 scale 与 `RoundingMode`。
- **Q：金额场景 `BigDecimal` 和 `long` 存分怎么选？** → 看吞吐与小数位需求：高并发、固定两位小数用 `long`；需要多币种、多小数位或复杂计算用 `BigDecimal`，对照上文决策树。

### 【简单】超过 long 整型的数据应该如何表示？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 数据类型 / 大数

#### 💎 关键结论

用 `BigInteger`。`long` 是 Java 最大的整型（64 位），超出范围会静默溢出回绕；`BigInteger` 内部用 `int[]` 存储任意精度整数，不受位数限制，但运算是软件模拟的，效率明显低于原生整型。

#### ⚡记忆卡片

- **口诀**：long 到头会回绕，大数要找 BigInteger，数组装数位，精确但慢
- **关键词**：Long.MAX_VALUE ／ 溢出回绕 ／ int[] 数组 ／ 任意精度
- **链路**：数值超 long 范围 → 溢出风险 → BigInteger 任意精度 → 软件模拟运算（慢）

#### 📖 核心知识

基本数值类型都有一个表达范围，如果超过这个范围就会有数值溢出的风险。在 Java 中，64 位 `long` 整型是最大的整数类型：

```java
long l = Long.MAX_VALUE;
System.out.println(l + 1); // -9223372036854775808
System.out.println(l + 1 == Long.MIN_VALUE); // true
```

**`BigInteger` 内部使用 `int[]` 数组来存储任意大小的整形数据**。相对于常规整数类型的运算来说，`BigInteger` 运算的效率会相对较低。

### 【中等】自动装箱拆箱有哪些陷阱？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 数据类型 / 装箱

#### 💎 关键结论

五大陷阱：① 缓存范围导致 `==` 结果不一致；② `null` 拆箱抛 NPE；③ 循环中频繁装箱损耗性能；④ 三元运算符隐式拆箱；⑤ 方法重载选择歧义。一句话：包装类当对象对待——比较用 `equals`、拆箱前判空、热路径用基本类型。

#### ⚡记忆卡片

- **口诀**：双等不可靠，判空再拆箱；循环用原形，三元防拆箱，重载选精确
- **关键词**：缓存范围 ／ NPE ／ 循环装箱 ／ 三元运算符 ／ 重载歧义
- **链路**：包装类参与算术运算 → 隐式拆箱 → null 触发 NPE ／ 频繁建对象

#### 📖 核心知识

自动装箱/拆箱看似优雅，实则隐藏多个易踩的坑：

**陷阱一：Integer 缓存范围导致 `==` 结果不一致**

```java
Integer a = 100;  // 装箱，命中缓存 [-128, 127]
Integer b = 100;
System.out.println(a == b);  // true

Integer c = 200;  // 装箱，超出缓存范围，new 新对象
Integer d = 200;
System.out.println(c == d);  // false（不同对象）
```

**核心结论**：整型包装类对象比较**必须用 `equals()`**，禁止用 `==`。

**陷阱二：自动拆箱导致 `NullPointerException`**

```java
Integer count = null;
int sum = count + 1;  // 拆箱时 NPE！count.intValue() 抛出
```

**陷阱三：循环中频繁装箱的性能损耗**

```java
Integer sum = 0;
for (int i = 0; i < 10000; i++) {
    sum += i;  // 每次循环：拆箱 sum → 相加 → 装箱新 Integer
}
// 应改为：int sum = 0;
```

**陷阱四：三元运算符的类型提升**

```java
Integer a = 1;
Integer b = 2;
Integer c = null;
Integer result = true ? a : c;       // 安全，result = 1
int r2 = false ? b : c;              // NPE！c 被拆箱
```

**陷阱五：方法重载选择歧义**

```java
void test(Integer i) { System.out.println("Integer"); }
void test(int i)     { System.out.println("int"); }

test(1);      // 输出 "int"（更精确匹配，优先选基本类型）
test(null);   // 编译错误：null 无法匹配 int，但匹配 Integer（需显式指定类型）
```

#### 🔬 扩展知识

::: details

- 【L3】**三元运算符为什么会拆箱**：当三元表达式两个分支分别是包装类型和基本类型时，按 JLS 条件表达式类型推导规则，整个表达式类型被定为基本类型，包装类型分支会被强制拆箱——分支值为 `null` 时就 NPE。规避：两个分支保持同类型（都用包装类）。
- 【L4】**现代规避手段**：Java 8 起用 `Optional` 显式表达"可能为空"，避免 `null` 包装类参与算术；Kotlin 的可空类型在编译期阻止此类误用；Project Valhalla 的特化泛型计划从根本上消除集合场景的装箱开销。

:::

#### 🔀 发散问题

- **Q：`Integer sum = 0; sum += i;` 循环一万次会创建多少对象？** → 约 1 万个：每轮拆箱、相加、再装箱成新对象（超出缓存范围时全部新建），GC 压力随之而来，见本文档「包装类型的缓存机制了解么？」中的定量分析。
- **Q：为什么 `test(1)` 选了 `int` 重载？** → 重载解析分三阶段，不装箱/不拆箱的精确匹配优先级最高，其次才是装箱匹配。

### 【中等】Java 是如何处理整数溢出的？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 数据类型 / 溢出

#### 💎 关键结论

Java **不自动检测整数溢出**：溢出后按补码**静默回绕**，不抛异常（`MAX_VALUE + 1` 直接变 `MIN_VALUE`）。需要防溢出时，用 Java 8+ 的 `Math.addExact` 等 `xxxExact` 方法（溢出抛 `ArithmeticException`）；大数运算用 `BigInteger`。

#### ⚡记忆卡片

- **口诀**：溢出不报警，回绕静悄悄；Exact 来兜底，大数 BigInteger
- **关键词**：静默回绕 ／ Math.addExact ／ ArithmeticException ／ BigInteger
- **链路**：固定位宽运算 → 补码截断回绕 → 静默错误 → Exact 方法/BigInteger 防护

#### 📖 核心知识

**溢出示例**：

```java
int max = Integer.MAX_VALUE;  // 2147483647
System.out.println(max + 1);  // -2147483648（回绕到 MIN_VALUE）

int min = Integer.MIN_VALUE;  // -2147483648
System.out.println(min - 1);  // 2147483647（回绕到 MAX_VALUE）
```

**安全的算术运算方法（Java 8+ `Math` 类）**：

| **方法**                   | **行为**             | **溢出时**               |
| -------------------------- | -------------------- | ------------------------ |
| `Math.addExact(a, b)`      | 加法                 | 抛 `ArithmeticException` |
| `Math.subtractExact(a, b)` | 减法                 | 抛 `ArithmeticException` |
| `Math.multiplyExact(a, b)` | 乘法                 | 抛 `ArithmeticException` |
| `Math.toIntExact(long)`    | long 转 int          | 抛 `ArithmeticException` |
| `Math.floorDiv(a, b)`      | 除法（向负无穷取整） | 不抛异常                 |

::: details 溢出检测示例

```java
try {
    int result = Math.addExact(Integer.MAX_VALUE, 1);  // 抛异常
} catch (ArithmeticException e) {
    System.out.println("溢出: " + e.getMessage());
}
```

:::

**最佳实践**：

- 涉及大数运算用 `BigInteger`。
- 关键路径用 `Math.xxxExact()` 方法显式检查。
- 单元测试覆盖边界值（`MIN_VALUE`/`MAX_VALUE`）。

#### 🔬 扩展知识

::: details

- 【L3】**为什么 Java 不检测溢出**：固定位宽补码运算直接映射 CPU 整数指令，回绕是位宽截断的自然结果、零额外开销；若每次运算都检测溢出需额外比较与跳转指令，代价过高。这是性能优先的设计取舍（与 C 语义一致）。
- 【L4】**横向对比**：Rust debug 模式下溢出默认 panic，并提供 `checked_add`/`wrapping_add` 显式选择；Swift 用 `&+` 显式允许溢出；C/C++ 中有符号整数溢出属于未定义行为。Java 的"静默回绕"行为确定但需开发者自行防护。

:::

#### 🔀 发散问题

- **Q：乘法前如何预判会不会溢出？** → 用 `Math.multiplyExact` 直接试算；或先除后判：`a != 0 && b > Integer.MAX_VALUE / a` 则必溢出。
- **Q：超过 long 范围怎么办？** → 用 `BigInteger` 任意精度整数，见本文档「超过 long 整型的数据应该如何表示？」。

## Java 变量

### 【简单】静态变量、成员变量、局部变量的区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 变量 / 生命周期

#### 💎 关键结论

三者差异在四个维度：**所属**（类/对象/方法）、**生命周期**（类加载到退出/对象存活期/方法执行期）、**存储位置**（元空间与堆/堆/栈）、**默认值**（前两者有，局部变量无、必须手动初始化）。一句话：静态全局唯一，成员实例独立，局部临时使用。

#### ⚡记忆卡片

- **口诀**：静态属类、成员属象、局部在方法；静态成员有默认，局部必须先赋值
- **关键词**：类共享 ／ 实例独立 ／ 栈帧 ／ 默认值差异
- **链路**：声明位置 → 归属（类/对象/栈帧）→ 生命周期与存储位置

#### 📖 核心知识

| **特性**     | **静态变量（static）**         | **成员变量（非 static）**      | **局部变量**               |
| ------------ | ------------------------------ | ------------------------------ | -------------------------- |
| **所属**     | 类（所有实例共享）             | 对象（每个实例独立）           | 方法/代码块内              |
| **生命周期** | 类加载时创建，程序结束时销毁   | 对象创建时存在，垃圾回收时销毁 | 方法调用时创建，执行完销毁 |
| **存储位置** | 方法区（JDK8+在元空间/堆）     | 堆（对象内部）                 | 栈（方法栈帧）             |
| **默认值**   | 有（如`int`默认为 0）          | 有（同静态变量）               | **无**（必须手动初始化）   |
| **访问方式** | `类名.变量名` 或 `对象.变量名` | `对象.变量名`                  | 只能在声明的方法/块内使用  |

**一句话总结**：

- **静态变量**：全局唯一，类共享。
- **成员变量**：对象私有，每个实例独立。
- **局部变量**：临时使用，方法内有效。

#### 🔀 发散问题

- **Q：局部变量存在哪里？** → 方法栈帧的局部变量表中，基本类型直接存值，引用类型存对象地址（对象本体在堆）。
- **Q：静态变量在 JDK 8 之后存在哪里？** → 类的元数据在元空间（本地内存），但静态变量引用的对象实例仍存储在堆中。

### 【简单】为什么成员变量有默认值？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 变量 / 初始化

#### 💎 关键结论

核心原因是**防止随机值风险**：JVM 在分配内存时自动赋默认值（`int`→0、`boolean`→false），避免未初始化变量读到内存中的随机数据。成员变量可能经反射、构造器动态赋值，编译器无法静态检测，故统一兜底；局部变量作用域小、可严格检查，故强制手动初始化。

#### ⚡记忆卡片

- **口诀**：成员默认值防随机，局部严检逼赋值
- **关键词**：默认值 ／ 随机值风险 ／ 确定性赋值检查 ／ 作用域
- **链路**：内存分配 → 成员自动赋 0/false → 局部变量由编译器强制检查

#### 📖 核心知识

**成员变量有默认值的核心原因是：防止随机值风险**。

- **内存安全**：未初始化的变量会指向内存中的随机值，可能导致程序行为异常或崩溃。
- **稳定运行**：自动赋默认值（如 `int`→`0`，`boolean`→`false`）确保程序逻辑可预测。

**编译器设计的权衡**：

- **成员变量**：**自动赋默认值是内存安全与灵活性的平衡**。运行时可能通过反射、构造器等动态赋值，编译器无法完全静态检测；为避免误报错误，统一自动赋默认值。
- **局部变量**：**严格编译检查确保代码可靠性**。作用域限于方法内，编译器可严格检查是否赋值；强制手动初始化以规避潜在风险。

### 【简单】字符型常量和字符串常量的区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 基础语法 / 常量

#### 💎 关键结论

字符常量是单引号括起的**单个字符**，类型 `char`（基本类型，2 字节），不可为空；字符串常量是双引号括起的**字符序列**，类型 `String`（引用类型），可为空串，`+` 被重载为拼接。

#### ⚡记忆卡片

- **口诀**：单引号装一字符，双引号串一串；char 基本两字节，String 引用对象身
- **关键词**：单引号 ／ 双引号 ／ char ／ String ／ `+` 拼接
- **链路**：字面量形式 → 类型差异（基本 vs 引用）→ 内存与运算行为差异

#### 📖 核心知识

| **场景**     | **字符常量**                              | **字符串常量**                      |
| :----------- | :---------------------------------------- | :---------------------------------- |
| **表示形式** | 单引号括起的**单个字符**（`'A'`）         | 双引号括起的**字符序列**（`"ABC"`） |
| **数据类型** | `char`（基本类型）                        | `String`（引用类型）                |
| **内存占用** | 2 字节（Unicode 字符，如 `'中'`、`'\n'`） | 对象开销+字符数据（可变长度）       |
| **转义字符** | 支持（`'\t'`、`'\\'`）                    | 同样支持（`"\t"`、`"\\"`）          |
| **空值表示** | 不可为空（至少 1 字符）                   | 可为空（`""`）                      |
| **运算行为** | 按 Unicode 值运算                         | 重载`+`为拼接                       |

## Java 方法

### 【简单】Java 方法有哪些类型？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 方法 / 分类

#### 💎 关键结论

Java 方法可从多维度分类：**按从属**分实例、静态、构造方法；**按能否重写**分普通、final、抽象、默认方法；还可按参数与返回值、以及 native/synchronized/泛型等特殊形态划分。选型口诀：操作状态用实例方法，工具类用静态，强制子类实现用抽象。

#### ⚡记忆卡片

- **口诀**：实例静态构造三兄弟，抽象默认加 final；参数返回再细分，native 同步泛型全
- **关键词**：实例/静态/构造 ／ abstract ／ default ／ native
- **链路**：分类维度（从属/重写/参数）→ 选型 → 语义清晰

#### 📖 核心知识

Java 方法的类型可以从不同维度分类。

::: tabs

@tab **按从属划分**

| **类型**     | **关键字** | **调用方式**       | **特点**                     | **示例**              |
| ------------ | ---------- | ------------------ | ---------------------------- | --------------------- |
| **实例方法** | 无         | `对象名.方法名 ()` | 依赖对象实例，可访问实例成员 | `list.add("item")`    |
| **静态方法** | `static`   | `类名.方法名 ()`   | 不依赖实例，只能访问静态成员 | `Math.abs(-1)`        |
| **构造方法** | 无         | `new 类名 ()`      | 用于对象初始化，无返回值类型 | `new String("hello")` |

@tab **按能否 `override` 划分**

| **类型**       | **关键字** | **特点**                    | **示例**                   |
| -------------- | ---------- | --------------------------- | -------------------------- |
| **普通方法**   | 无         | 可被重写（除非`final`修饰） | `public void show()`       |
| **final 方法** | `final`    | 禁止子类重写                | `public final void lock()` |
| **抽象方法**   | `abstract` | 无实现，需子类重写          | `abstract void draw();`    |
| **默认方法**   | `default`  | Java 8 接口中的默认实现     | `default void log()`       |

@tab **按参数与返回值划分**

| **类型**         | **特点**                  | **示例**                     |
| ---------------- | ------------------------- | ---------------------------- |
| **无参方法**     | 不需要参数                | `String getName()`           |
| **有参方法**     | 可接受基本类型/对象参数   | `void setAge(int age)`       |
| **可变参方法**   | 参数数量可变（`...`语法） | `void print(String... strs)` |
| **无返回值方法** | 返回类型为`void`          | `void shutdown()`            |
| **有返回值方法** | 必须返回指定类型值        | `int calculate()`            |

@tab **特殊方法**

| **类型**              | **特点**                       | **示例**                          |
| --------------------- | ------------------------------ | --------------------------------- |
| **native 方法**       | 用`native`声明，由本地代码实现 | `public native void start()`      |
| **synchronized 方法** | 用`synchronized`修饰，线程安全 | `public synchronized void save()` |
| **递归方法**          | 方法内部调用自身               | `int factorial(int n)`            |
| **泛型方法**          | 声明类型参数                   | `<T> T getData()`                 |

@tab **接口中的方法**

| **类型**     | **关键字** | **特点**                      |
| ------------ | ---------- | ----------------------------- |
| **抽象方法** | 无         | 默认`public abstract`         |
| **默认方法** | `default`  | Java 8 引入，提供默认实现     |
| **静态方法** | `static`   | Java 8 引入，接口直接调用     |
| **私有方法** | `private`  | Java 9 引入，仅供接口内部使用 |

:::

::: details 代码示例

```java
// 实例方法 vs 静态方法
class Calculator {
    // 实例方法
    public int add(int a, int b) { return a + b; }

    // 静态方法
    public static int staticAdd(int a, int b) { return a + b; }
}

// 抽象方法
abstract class Shape {
    abstract void draw(); // 必须由子类实现
}

// 默认方法
interface Logger {
    default void log(String msg) { System.out.println(msg); }
}

// 泛型方法
class Box {
    public <T> T wrap(T item) { return item; }
}
```

:::

::: details 如何选择方法类型？

- **需要操作对象状态** → 实例方法（如`user.getName()`）
- **工具类操作** → 静态方法（如`Collections.sort()`）
- **强制子类实现** → 抽象方法（如`Animal.eat()`）
- **接口功能扩展** → 默认方法（Java 8+）
- **线程安全控制** → `synchronized`方法

:::

### 【简单】静态方法和实例方法有何不同？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 方法 / 静态与实例

#### 💎 关键结论

核心差异三点：**归属**（类 vs 对象）、**调用方式**（类名调用 vs 对象调用）、**访问权限**——静态方法不能直接访问实例成员、不能用 this/super，因为它属于类、无实例上下文；实例方法两者皆可。生命周期上，静态方法随类加载存在，实例方法随对象存活。

#### ⚡记忆卡片

- **口诀**：静态属类无实例，访问成员受限制；实例属象有 this，两者通吃随便用
- **关键词**：类名调用 ／ 无实例上下文 ／ this/super ／ 生命周期
- **链路**：static 修饰 → 归属类、类加载时就绪 → 无实例上下文 → 访问受限

#### 📖 核心知识

**主要区别**：

| **维度**     | **静态方法 (Static Method)**                    | **实例方法 (Instance Method)**       |
| ------------ | ----------------------------------------------- | ------------------------------------ |
| **归属**     | 属于类                                          | 属于对象实例                         |
| **关键字**   | 使用 `static` 修饰                              | 无 `static` 修饰                     |
| **调用方式** | `类名.方法名 ()`                                | `对象名.方法名 ()`                   |
| **内存分配** | 类加载时分配，永久代（JDK8 前）/元空间（JDK8+） | 对象实例化时分配，堆内存             |
| **生命周期** | 与类相同（从类加载到 JVM 退出）                 | 与对象相同（从对象创建到被 GC 回收） |

**访问权限对比**：

| **维度**         | **静态方法**                    | **实例方法**  |
| ---------------- | ------------------------------- | ------------- |
| **访问静态成员** | ✔️ 可直接访问                   | ✔️ 可直接访问 |
| **访问实例成员** | ❌ 不能直接访问（需先创建对象） | ✔️ 可直接访问 |
| **this/super**   | ❌ 不可使用                     | ✔️ 可使用     |

::: details 代码示例

```java
class Calculator {
    // 静态方法
    public static int add(int a, int b) {
        return a + b;  // 不依赖对象状态
    }

    // 实例方法
    private int base;
    public void setBase(int base) {
        this.base = base;  // 依赖对象状态
    }
    public int calculate(int x) {
        return base + x;  // 访问实例变量
    }
}

// 调用示例
public class Main {
    public static void main(String[] args) {
        // 静态方法调用
        int sum = Calculator.add(3, 5);  // 无需创建对象

        // 实例方法调用
        Calculator calc = new Calculator();
        calc.setBase(10);
        int result = calc.calculate(5);  // 需要对象实例
    }
}
```

:::

#### 🔀 发散问题

- **Q：静态方法能调用实例方法吗？** → 能，但必须先创建对象再通过实例调用；静态方法体内没有隐含的实例可用。
- **Q：为什么静态方法不能用 this？** → `this` 指向当前实例，而静态方法属于类、可能在任何实例创建之前被调用，不存在实例上下文。

### 【简单】重载和重写有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 方法 / 多态

#### 💎 关键结论

**重载**是同一类中方法名相同、参数不同，编译时静态绑定；**重写**是子类重新实现父类方法，运行时动态绑定。记重写三条约束：签名必须相同、异常范围 ≤ 父类、访问权限 ≥ 父类；重载只要求参数列表不同，返回值可自由。一句话：重载横向扩展，重写纵向覆盖。

#### ⚡记忆卡片

- **口诀**：重载同类参数异，编译定；重写父子签名同，运行绑；异常只能小，权限只能大
- **关键词**：参数列表 ／ 方法签名 ／ 静态绑定 ／ 动态绑定 ／ 协变返回
- **链路**：重载（编译期按参数选型）／ 重写（运行期按实际类型分派）→ 多态两种形态

#### 📖 核心知识

| **特性**     | **重载（Overload）**               | **重写（Override）**                                    |
| ------------ | ---------------------------------- | ------------------------------------------------------- |
| **定义**     | 同一类中方法名相同但参数不同       | 子类重新实现父类的方法                                  |
| **目的**     | 处理不同类型/数量的参数            | 修改或扩展父类方法的行为                                |
| **多态类型** | 编译时多态（静态绑定）             | 运行时多态（动态绑定）                                  |
| **作用范围** | 同一类中（或父子类间）             | 子类与父类之间                                          |
| **方法签名** | **必须不同参数**（类型/数量/顺序） | **必须完全相同**（方法名+参数）                         |
| **返回值**   | 可自由修改                         | 基本类型/void：必须相同；引用类型：可协变（子类更具体） |
| **异常**     | 可自由声明                         | 子类异常 ≤ 父类异常范围                                 |
| **访问权限** | 可自由修改                         | 子类权限 ≥ 父类（不能更严格）                           |
| **限制方法** | 无                                 | 不能重写 `private`/`final`/`static` 方法                |

::: code-tabs#重载和重写的示例

@tab 重载示例

```java
class Calculator {
    // 参数类型不同
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }

    // 参数数量不同
    int add(int a, int b, int c) { return a + b + c; }
}
```

@tab 重写示例

```java
class Animal {
    protected String sound() { return "Unknown sound"; }
}

class Cat extends Animal {
    @Override
    public String sound() {  // 访问权限扩大，返回值相同
        return "Meow";
    }
}
```

:::

::: details 关键区别总结

- **绑定时机**
  - 重载：编译时根据参数决定调用的方法（`Calculator.add(int)` vs `Calculator.add(double)`）
  - 重写：运行时根据对象实际类型决定方法（`Animal.sound()` 实际调用 `Cat.sound()`）
- **设计目的**
  - 重载：**横向扩展**（同一功能的不同参数版本）
  - 重写：**纵向覆盖**（子类定制父类行为）
- **验证阶段**
  - 重载：编译器检查参数差异
  - 重写：编译器检查方法签名 + JVM 运行时验证

:::

#### 🔬 扩展知识

::: details

- 【L3】**字节码层面的分界**：重载的各版本在 class 中是不同的方法描述符（参数列表不同），编译期按实参静态类型确定目标，属静态分派；重写通过 `invokevirtual` 指令在运行时查对象的虚方法表（vtable）按实际类型分派，属动态分派。
- 【L4】**横向对比 C++**：C++ 中父子类同名不同参的方法构成"隐藏"而非重载（子类作用域遮蔽父类同名方法），需 `using` 声明才能找回；Java 的重载可以跨父子类存在，语义更宽松。

:::

#### 🔀 发散问题

- **Q：方法名、参数相同但返回值不同，能构成重载吗？** → 不能，调用时无法根据返回值区分目标方法，编译器拒绝；尽管字节码层方法签名含返回值，源码层面不认可这种重载。
- **Q：静态方法能被重写吗？** → 不能，只能被同名静态方法**隐藏**，调用由声明类型而非实际类型决定，见本文档「Java 中 `static` 关键字有什么用？」。

### 【简单】什么是可变长参数？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 方法 / 可变参数

#### 💎 关键结论

Java 5 起支持可变长参数（`String... args`），允许传入 0 到多个同类型参数，且**只能作为最后一个参数**。与固定参数重载时优先匹配固定参数版本；编译后本质转换为数组。

#### ⚡记忆卡片

- **口诀**：三点参数排最后，零个多个随便传；重载固定优先配，编译之后是数组
- **关键词**：`...` 语法 ／ 最后一个参数 ／ 固定参数优先 ／ 数组本质
- **链路**：`T... args` 声明 → 调用传任意个参数 → 编译器打包为数组

#### 📖 核心知识

从 Java 5 开始，Java 支持定义可变长参数，允许在调用方法时传入不定长度的参数（0 个或多个）：

```java
public static void method1(String... args) {
   //......
}
```

可变参数只能作为函数的最后一个参数，但其前面可以有也可以没有任何其他参数：

```java
public static void method2(String arg1, String... args) {
   //......
}
```

**重载时优先匹配固定参数**：固定参数的方法匹配度更高，优先选择。

::: details 重载优先级与编译后形态示例

```java
public class VariableLengthArgument {

    public static void printVariable(String... args) {
        for (String s : args) {
            System.out.println(s);
        }
    }

    public static void printVariable(String arg1, String arg2) {
        System.out.println(arg1 + arg2);
    }

    public static void main(String[] args) {
        printVariable("a", "b");
        printVariable("a", "b", "c", "d");
    }
}
```

输出：

```
ab
a
b
c
d
```

Java 的可变参数编译后实际会被转换成一个数组，看编译后生成的 `class` 文件即可验证：

```java
public class VariableLengthArgument {

    public static void printVariable(String... args) {
        String[] var1 = args;
        int var2 = args.length;

        for(int var3 = 0; var3 < var2; ++var3) {
            String s = var1[var3];
            System.out.println(s);
        }

    }
    // ......
}
```

:::

#### 🔀 发散问题

- **Q：可变参数能直接传数组吗？** → 能，`T... args` 编译后就是 `T[] args`，传 `new String[]{"a","b"}` 与逐个传参等效。
- **Q：`method(String... args)` 和 `method(String[] args)` 能同时存在吗？** → 不能，二者编译后签名相同，构成重复定义。

## Java 异常

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/04/211503dd66164d2d94ba14bd5ed56c26.webp)

### 【简单】Exception 和 Error 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Java 异常 / 体系结构

#### 💎 关键结论

二者都继承自 `Throwable`：**`Exception`** 是程序可处理的异常，可 catch 恢复，又分受检与非受检；**`Error`** 是 JVM 层面的严重错误（OOM、StackOverflow 等），程序不应也无法处理，发生时一般终止线程。设计边界一句话：Exception 防业务异常，Error 报系统崩溃。

#### ⚡记忆卡片

- **口诀**：异常能接住，错误接不住；受检编译逼你管，非受检运行才现身
- **关键词**：Throwable ／ Error ／ Exception ／ checked/unchecked
- **链路**：Throwable 分两支 → Exception 可捕获处理 → Error 只能预防（内存/栈容量）

#### 📖 核心知识

在 Java 中，所有的异常都有一个共同的祖先 `java.lang` 包中的 `Throwable` 类，它有两个重要的子类：

- **`Exception`** - 程序本身可以处理的异常，可以通过 `catch` 捕获。又分为**检查**（checked）异常和**非检查**（unchecked）异常；检查异常在源代码里必须显式捕获处理，这是编译期检查的一部分。
- **`Error`** - 属于程序无法处理的错误。例如 Java 虚拟机运行错误（`VirtualMachineError`）、虚拟机内存不够错误（`OutOfMemoryError`）、类定义错误（`NoClassDefFoundError`）等。这些异常发生时，Java 虚拟机（JVM）一般会选择线程终止。

::: details Throwable 异常体系全景

```
Throwable
├── Error（程序无法处理，不应 catch）
│   ├── VirtualMachineError
│   │   ├── OutOfMemoryError（堆/元空间/直接内存耗尽）
│   │   └── StackOverflowError（递归过深或栈空间不足）
│   ├── NoClassDefFoundError（运行时找不到类定义）
│   └── AssertionError（断言失败）
└── Exception（程序可处理）
    ├── RuntimeException（非检查异常，编译期不强制处理）
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── IndexOutOfBoundsException
    │   └── ConcurrentModificationException
    └── 其他 Exception（检查异常，编译期强制处理）
        ├── IOException
        ├── SQLException
        └── InterruptedException
```

:::

#### 🔬 扩展知识

::: details

- 【L3】**JVM 层：异常表（Exception Table）**。每个方法的字节码都包含异常表，记录 `try-catch` 块的范围映射：`try { a = 1; } catch (Exception e) { a = 2; }` 对应 `from 0 to 4 target 7 type Exception`（字节码偏移 0~3 抛出 Exception 则跳转到 7）。这体现 JVM 的"零成本异常"哲学：无异常时无额外开销；但一旦抛出，`Throwable.fillInStackTrace()` 需遍历调用栈构建 `StackTraceElement[]`，单次抛异常约 50-100 μs，比正常流程（约 0.001 μs）慢 5 万~10 万倍。**优化策略**：不用异常做流程控制；高频异常可重写 `fillInStackTrace()` 为空实现或复用静态异常实例（代价是栈信息错乱）。
- 【L3】**异常风暴 → Full GC 因果链**：高频异常 → 大量 `StackTraceElement[]` 分配 → 年轻代快速填满 → 晋升老年代 → 触发 Full GC。生产案例：某系统日志框架 Bug 导致每秒 10 万次 NPE，每次 `fillInStackTrace()` 分配约 2KB，每秒 200MB 对象分配，3 秒一次 Full GC，CPU 打满。
- 【L3】**JEP 358 Helpful NPE（JDK 14 引入）**：NPE message 中嵌入具体变量名，如 `Cannot invoke "X.c" because "a.b" is null`；JVM 通过字节码分析定位 null 变量（默认开启，`-XX:+ShowCodeDetailsInExceptionMessages`），无需改代码。
- 【L4】**横向对比**：checked exception 是 Java 独有的编译期强制机制，C#/C++/Kotlin 均无受检异常；争议在于它强迫调用链层层声明 throws，现代 Java 实践中业务层多用非受检异常 + 全局异常处理器。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "catch 住 Error 就能恢复" → OOM、StackOverflow 发生时 JVM 状态已不可靠，捕获后继续运行风险极高，正确做法是预防为主（容量规划、限制递归深度）。
- ❌ "用异常做流程控制很优雅" → 抛异常成本比正常分支高 5 万倍以上，且混淆真实错误信号；未找到等场景应用返回值或 `Optional`。

:::

#### 🔀 发散问题

- **Q：OOM 应该被捕获吗？** → 一般不。堆 OOM 时进程状态已不可靠，应通过 `-Xmx` 容量规划、dump 分析（`-XX:+HeapDumpOnOutOfMemoryError`）定位泄漏，而非 catch 后继续跑。
- **Q：`StackOverflowError` 最常见的原因？** → 无终止条件的递归；也可能是递归深度合理但 `-Xss` 栈空间过小，需区分排查。

### 【简单】Checked Exception 和 Unchecked Exception 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 异常 / 受检与非受检

#### 💎 关键结论

**Checked Exception** 编译期强制处理（catch/throws 否则编译失败），继承自 `Exception` 的非 `RuntimeException` 分支，用于**可预见、可恢复**的外部情况（文件不存在、网络断开）；**Unchecked Exception** 继承自 `RuntimeException`，编译不强制，表示**程序逻辑错误**（空指针、越界）。

#### ⚡记忆卡片

- **口诀**：受检编译逼处理，可恢复的外界事；非受检运行才现，逻辑错误自己担
- **关键词**：编译检查 ／ RuntimeException ／ 可恢复 ／ 逻辑错误
- **链路**：异常分类 → 受检与否 → 编译强制或运行时暴露 → 选型

#### 📖 核心知识

**差异对比**：

| **特性**     | **Checked Exception**                              | **Unchecked Exception**          |
| ------------ | -------------------------------------------------- | -------------------------------- |
| **编译检查** | 必须显式处理（`catch`/`throws`），否则编译失败     | 不强制处理，编译可通过           |
| **继承体系** | 继承自 `Exception`（非 `RuntimeException` 分支）   | 继承自 `RuntimeException`        |
| **设计目的** | 处理**可预见的、可恢复的**异常情况（如文件不存在） | 处理**程序逻辑错误**（如空指针） |

::: tabs#Checked Exception 和 Unchecked Exception 示例对比

@tab **Checked Exception 示例**

```java
// 必须处理 IOException（受检异常）
try {
    Files.readAllBytes(Paths.get("file.txt"));
} catch (IOException e) {  // 或声明 throws IOException
    System.err.println("文件读取失败：" + e.getMessage());
}
```

@tab **Unchecked Exception 示例**

```java
// 可不处理 NullPointerException（非受检异常）
String str = null;
System.out.println(str.length());  // 运行时抛出 NullPointerException
```

:::

**常见异常类型**：

| **Checked Exception**    | **Unchecked Exception**          |
| ------------------------ | -------------------------------- |
| `IOException`            | `NullPointerException`           |
| `SQLException`           | `IllegalArgumentException`       |
| `ClassNotFoundException` | `ArrayIndexOutOfBoundsException` |
| `InterruptedException`   | `ClassCastException`             |

**选择原则**：

- **用 Checked Exception**：调用方**必须处理**该异常（如文件不存在、网络断开）；异常是业务逻辑的**合法流程**（如用户输入校验）。
- **用 Unchecked Exception**：表示**程序错误**（如参数为 null、数组越界）；调用方**无法合理恢复**（如内存溢出）。

#### 🔀 发散问题

- **Q：为什么 Spring 把 `SQLException` 转成非受检异常？** → JDBC 的受检异常强迫每个调用点处理，而多数场景无法恢复；Spring 用 `DataAccessException` 体系转为非受检，由全局异常处理器统一接管，这也是现代 Java 的主流实践。
- **Q：`InterruptedException` 为什么是受检异常？** → 线程中断是可恢复的协作信号，编译器强制调用方表态：要么恢复中断状态（`Thread.currentThread().interrupt()`），要么向上抛。

### 【简单】Throwable 类常用方法有哪些？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 异常 / API

#### 💎 关键结论

四个高频方法：`getMessage()` 拿异常简要描述，`toString()` 拿详细信息，`getLocalizedMessage()` 拿本地化信息，`printStackTrace()` 打印完整堆栈。排查异常链时配合 `getCause()` 追根因。

#### ⚡记忆卡片

- **口诀**：message 描述、toString 详细，print 堆栈定位忙，本地化找 localized
- **关键词**：getMessage ／ toString ／ printStackTrace ／ getCause
- **链路**：异常对象 → message/cause → 堆栈信息 → 问题定位

#### 📖 核心知识

- `String getMessage()`: 返回异常发生时的简要描述
- `String toString()`: 返回异常发生时的详细信息
- `String getLocalizedMessage()`: 返回异常对象的本地化信息。使用 `Throwable` 的子类覆盖这个方法，可以生成本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与 `getMessage()` 返回的结果相同
- `void printStackTrace()`: 在控制台上打印 `Throwable` 对象封装的异常信息
- 补充：`getCause()` 返回异常链的根因异常，`getStackTrace()` 返回 `StackTraceElement[]` 供程序化分析。

#### 🔀 发散问题

- **Q：生产环境该用 `printStackTrace()` 吗？** → 不建议，它直接写 stderr、无级别无上下文；应交给日志框架（SLF4J + Logback）记录，便于采集与告警。

### 【简单】try-catch-finally 如何使用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 异常 / 异常处理语法

#### 💎 关键结论

`try` 捕获、`catch` 处理、`finally` 无论如何都会执行（遇 return 也在方法返回前执行）。铁律：**不要在 finally 中 return**——try 的返回值会先暂存到局部变量，finally 的 return 会将其覆盖，导致返回值被吞噬。

#### ⚡记忆卡片

- **口诀**：try 捕、catch 接、finally 必执行；finally 里别 return，吞噬原值悔已晚
- **关键词**：try ／ catch ／ finally ／ return 覆盖
- **链路**：try 抛异常 → 异常表匹配 catch → return 前执行 finally → 方法返回

#### 📖 核心知识

- `try`块：用于捕获异常。其后可接零个或多个 `catch` 块，如果没有 `catch` 块，则必须跟一个 `finally` 块。
- `catch`块：用于处理 try 捕获到的异常。
- `finally` 块：无论是否捕获或处理异常，`finally` 块里的语句都会被执行。当在 `try` 块或 `catch` 块中遇到 `return` 语句时，`finally` 语句块将在方法返回之前被执行。

::: details 基本用法示例

```java
try {
    System.out.println("Try to do something");
    throw new RuntimeException("RuntimeException");
} catch (Exception e) {
    System.out.println("Catch Exception -> " + e.getMessage());
} finally {
    System.out.println("Finally");
}
```

输出：

```
Try to do something
Catch Exception -> RuntimeException
Finally
```

:::

**注意：不要在 finally 语句块中使用 return！** 当 try 语句和 finally 语句中都有 return 语句时，try 语句块中的 return 会被忽略：try 的返回值先被暂存在局部变量中，执行到 finally 的 return 后就以 finally 的返回值为准。

[jvm 官方文档](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.10.2.5) 中有明确提到：

> If the `try` clause executes a _return_, the compiled code does the following:
>
> 1. Saves the return value (if any) in a local variable.
> 2. Executes a _jsr_ to the code for the `finally` clause.
> 3. Upon return from the `finally` clause, returns the value saved in the local variable.

::: details finally 中 return 覆盖返回值示例

```java
public static void main(String[] args) {
    System.out.println(f(2));
}

public static int f(int value) {
    try {
        return value * value;
    } finally {
        if (value == 2) {
            return 0;
        }
    }
}
```

输出：

```
0
```

:::

#### 🔬 扩展知识

::: details

- 【L3】**字节码实现演进**：早期 javac 按官方文档描述用 `jsr` 指令跳转执行 finally；现代 javac 不再生成 `jsr`，而是将 finally 块字节码**复制**到每个正常/异常出口，效果等价：返回值先暂存、finally 执行后再恢复。这也解释了 finally 中修改局部变量不影响已暂存的返回值（除非直接 return）。

:::

#### 🔀 发散问题

- **Q：try 里有 return，finally 还会执行吗？** → 会，且在方法真正返回前执行；但 finally 中修改基本类型局部变量不会影响已暂存的返回值（引用类型改对象内容除外）。
- **Q：finally 一定执行吗？** → 不一定，`System.exit()`、线程死亡等场景会跳过，见本文档「finally 中的代码一定会执行吗？」。

### 【简单】finally 中的代码一定会执行吗？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 异常 / finally

#### 💎 关键结论

不一定。只要 JVM 在执行到 `finally` 之前被终止（如 `System.exit()`），finally 就不会执行；此外线程死亡、关闭 CPU 等极端情况也会跳过。面试先答"正常情况必执行"，再补例外，层次感更好。

#### ⚡记忆卡片

- **口诀**：finally 几乎必执行，三情况外：exit 终止、线程死、断电
- **关键词**：System.exit ／ JVM 终止 ／ 线程死亡
- **链路**：try/catch 执行 → JVM 被终止 → finally 被跳过

#### 📖 核心知识

不一定！在某些情况下，finally 中的代码不会被执行。就比如说 finally 之前虚拟机被终止运行的话，finally 中的代码就不会被执行。

::: details System.exit 跳过 finally 示例

```java
try {
    System.out.println("Try to do something");
    throw new RuntimeException("RuntimeException");
} catch (Exception e) {
    System.out.println("Catch Exception -> " + e.getMessage());
    // 终止当前正在运行的 Java 虚拟机
    System.exit(1);
} finally {
    System.out.println("Finally");
}
```

输出：

```
Try to do something
Catch Exception -> RuntimeException
```

:::

另外，在以下 2 种特殊情况下，`finally` 块的代码也不会被执行：

1. 程序所在的线程死亡。
2. 关闭 CPU。

#### 🔀 发散问题

- **Q：资源释放能完全依赖 finally 吗？** → 不能赌它必执行，且 finally 写法容易吞异常；优先用 `try-with-resources`，见本文档「如何使用 `try-with-resources` 代替`try-catch-finally`？」。

### 【简单】如何使用 `try-with-resources` 代替`try-catch-finally`？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 异常 / 资源管理

#### 💎 关键结论

凡是实现 `AutoCloseable`/`Closeable` 的资源，都应优先用 Java 7 的 `try-with-resources`：资源在括号内声明，结束后自动 `close()`，且关闭动作先于 `catch`/`finally` 执行。相比手写 finally，代码更简短，且异常不会被吞（ suppressed 机制）。

#### ⚡记忆卡片

- **口诀**：资源写进小括号，close 自动调；关闭先于 catch、finally，压制异常不丢失
- **关键词**：AutoCloseable ／ Java 7 ／ 关闭顺序 ／ addSuppressed
- **链路**：声明资源 → try 体执行 → 自动 close → 再走 catch/finally

#### 📖 核心知识

1. **适用范围（资源的定义）：** 任何实现 `java.lang.AutoCloseable`或者 `java.io.Closeable` 的对象
2. **关闭资源和 finally 块的执行顺序：** 在 `try-with-resources` 语句中，任何 `catch` 或 `finally` 块在声明的资源关闭后运行

> 《Effective Java》中明确指出：
>
> 面对必须要关闭的资源，我们总是应该优先使用 `try-with-resources` 而不是`try-finally`。随之产生的代码更简短，更清晰，产生的异常对我们也更有用。`try-with-resources`语句让我们更容易编写必须要关闭的资源的代码，若采用`try-finally`则几乎做不到这点。

Java 中类似于`InputStream`、`OutputStream`、`Scanner`、`PrintWriter`等的资源都需要我们调用`close()`方法来手动关闭，一般情况下我们都是通过`try-catch-finally`语句来实现这个需求：

::: details 老写法：try-catch-finally 手动关闭

```java
//读取文本文件的内容
Scanner scanner = null;
try {
    scanner = new Scanner(new File("D://read.txt"));
    while (scanner.hasNext()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
} finally {
    if (scanner != null) {
        scanner.close();
    }
}
```

:::

使用 Java 7 之后的 `try-with-resources` 语句改造上面的代码：

```java
try (Scanner scanner = new Scanner(new File("test.txt"))) {
    while (scanner.hasNext()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException fnfe) {
    fnfe.printStackTrace();
}
```

多个资源需要关闭时，用分号分隔即可；若仍用`try-catch-finally`手写，很容易引入异常吞没问题：

```java
try (BufferedInputStream bin = new BufferedInputStream(new FileInputStream(new File("test.txt")));
     BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(new File("out.txt")))) {
    int b;
    while ((b = bin.read()) != -1) {
        bout.write(b);
    }
}
catch (IOException e) {
    e.printStackTrace();
}
```

#### 🔬 扩展知识

::: details

- 【L3】**编译后原理与异常压制**：编译器生成等价于"finally 调 close"的代码；关键改进是当 try 体与 `close()` 都抛异常时，`close` 的异常通过 `addSuppressed()` 挂载到主异常上，用 `getSuppressed()` 可取回——而老写法中 finally 的异常会直接覆盖原异常，丢失根因。
- 【L4】**版本演进**：Java 7 引入 try-with-resources；Java 9 起允许直接使用已声明的 effectively final 变量，无需在括号内重复声明。

:::

#### 🔀 发散问题

- **Q：close 和业务代码同时抛异常，最终抛出的是哪个？** → 业务异常为主异常，close 异常被压制（suppressed），两者都不丢，`e.getSuppressed()` 可查。
- **Q：哪些资源需要关闭？** → 实现 `AutoCloseable` 的对象：IO 流、JDBC 的 Connection/Statement/ResultSet、`Lock` 等；纯内存对象无需关闭。

### 【简单】NoClassDefFoundError 和 ClassNotFoundException 有什么区别⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 异常 / 类加载

#### 💎 关键结论

一句话区分：`ClassNotFoundException` 是 **Exception**，动态加载（`Class.forName` 等）找不到类时抛出，可捕获可恢复；`NoClassDefFoundError` 是 **Error**，类"编译时存在、运行时找不到定义"（依赖缺失、初始化失败），属 JVM 链接失败，不应捕获。

#### ⚡记忆卡片

- **口诀**：CNFE 是异常，动态加载找不到；NCDFE 是错误，编译有它运行没
- **关键词**：Class.forName ／ 动态加载 ／ 编译存在运行缺失 ／ Exception vs Error
- **链路**：显式动态加载失败 → ClassNotFoundException；JVM 链接期找不到定义 → NoClassDefFoundError

#### 📖 核心知识

`NoClassDefFoundError`是一个 Error，而 `ClassNotFoundException` 是一个 Exception。

**`ClassNotFoundException` 产生的原因**：

- 使用 `Class.forName`、`ClassLoader.loadClass`、`ClassLOader.findSystemClass` 方法动态加载类，如果这个类没有被找到，那么就会在运行时抛出 `ClassNotFoundException` 异常；
- 当一个类已经被某个类加载器加载到内存中了，此时另一个类加载器又尝试着动态地从同一个包中加载这个类。

**`NoClassDefFoundError` 产生的原因**：当 JVM 或 `ClassLoader` 试图加载类，却找不到类的定义时（编译时存在，运行时找不到），抛出异常。

#### 🔀 发散问题

- **Q：`NoClassDefFoundError` 的常见诱因有哪些？** → 依赖 jar 缺失或版本冲突、classpath 配置错误；还有隐蔽的一种：类静态初始化首次失败抛 `ExceptionInInitializerError`，之后再次使用该类就会得到 `NoClassDefFoundError`。
- **Q：两者的排查方向有什么不同？** → CNFE 看动态加载的类名来源与插件/反射配置；NCDFE 看构建产物与依赖树（`mvn dependency:tree` 查冲突）及静态初始化日志。

### 【简单】异常使用有哪些需要注意的地方？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 异常 / 最佳实践

#### 💎 关键结论

四点核心：每次抛异常都 **new 新对象**（静态实例会让栈信息错乱）；异常信息要有意义；抛**尽可能具体**的异常类型；捕获处已记录日志则不要重复记录，避免日志膨胀掩盖根因。

#### ⚡记忆卡片

- **口诀**：异常每次 new，信息要有意义；抛具体不抛父，日志只记一次
- **关键词**：静态实例禁忌 ／ 有意义 message ／ 具体异常 ／ 避免重复日志
- **链路**：异常设计（具体、可定位）→ 抛出（new 新对象）→ 记录（一次到位）

#### 📖 核心知识

- 不要把异常定义为静态变量，因为这样会导致异常栈信息错乱。每次手动抛出异常，我们都需要手动 new 一个异常对象抛出。
- 抛出的异常信息一定要有意义。
- 建议抛出更加具体的异常，比如字符串转换为数字格式错误的时候应该抛出`NumberFormatException`而不是其父类`IllegalArgumentException`。
- 避免重复记录日志：如果在捕获异常的地方已经记录了足够的信息（包括异常类型、错误信息和堆栈跟踪等），那么在业务代码中再次抛出这个异常时，就不应该再次记录相同的错误信息。重复记录日志会使得日志文件膨胀，并且可能会掩盖问题的实际原因，使得问题更难以追踪和解决。

### 【中等】Java 中 final、finally 和 finalize 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Java 常识 / 易混淆概念

#### 💎 关键结论

三者只有名字相似，维度完全不同：`final` 是**关键字**，声明不可变性（常量/不可重写/不可继承）；`finally` 是**异常处理代码块**，保证必执行、用于资源释放；`finalize` 是 **Object 的方法**，对象回收前的清理回调，因诸多缺陷已被废弃。一句话：final 管不变性，finally 管必执行，finalize 是过时的清理机制。

#### ⚡记忆卡片

- **口诀**：final 不变，finally 必执行，finalize 已过时；同名不同命，别混为一谈
- **关键词**：关键字 ／ 代码块 ／ Object 方法 ／ @Deprecated ／ Cleaner
- **链路**：final（编译期约束）／ finally（运行时保障）／ finalize（GC 回调，废弃）→ 替代方案 Cleaner

#### 📖 核心知识

| 特性         | final                                                | finally                                          | finalize                   |
| :----------- | :--------------------------------------------------- | :----------------------------------------------- | :------------------------- |
| **类型**     | 关键字                                               | 代码块                                           | 方法                       |
| **作用域**   | 变量/方法/类                                         | 异常处理块                                       | Object 类方法              |
| **作用**     | 声明不可变性                                         | 即使有异常也必然执行，确保资源释放               | 对象回收前的清理（已废弃） |
| **特点**     | 可修饰变量（常量）、方法（不可重写）、类（不可继承） | 与`try-catch`搭配，**必然执行**（除非 JVM 退出） | 不推荐用，执行时机不可控   |
| **使用场景** | 定义常量/限制继承                                    | 资源清理                                         | 历史遗留的清理逻辑         |

**一句话总结**：`final`管**不变性**，`finally`管**必执行**，`finalize`是**过时的清理机制**。

`finalize()` 的废弃时间线：JDK 9 标记 `@Deprecated`，JDK 18 标记为 `@Deprecated(forRemoval=true)`。新代码不应再使用，清理需求交给 `try-with-resources` 与 `Cleaner`。

#### 🔬 扩展知识

::: details

- 【L3】**finalize 为什么被废弃？** ① 执行时机不可控：对象从"可回收"到 `finalize()` 实际执行可能间隔数秒甚至更久；② 性能代价巨大：覆盖了 `finalize()` 的对象需要两次 GC 才能回收（先进 `Finalizer` 队列）；③ 可能导致 OOM：Finalizer 线程优先级低，队列积压时未回收对象持续占内存；④ 安全风险：`finalize()` 中可能"复活"对象（重新赋值给静态变量）。
- 【L3】**替代方案：Cleaner API（JDK 9+）**，基于 `PhantomReference`，清理逻辑不持有 this 引用、避免复活：

```java
// 旧方案：覆盖 finalize()
class LegacyResource {
    @Override
    protected void finalize() { /* 清理 */ }
}

// 新方案：Cleaner + PhantomReference
class ModernResource implements AutoCloseable {
    private static final Cleaner cleaner = Cleaner.create();
    private final Cleaner.Cleanable cleanable;

    public ModernResource() {
        this.cleanable = cleaner.register(this, () -> {
            // 清理逻辑（不持有 this 引用，避免复活）
            System.out.println("资源已清理");
        });
    }

    @Override
    public void close() {
        cleanable.clean();  // 显式清理
    }
}
```

- 【L4】**实际开发建议**：永远不要重写 `finalize()`；资源清理用 `try-with-resources`（实现 `AutoCloseable`）+ 显式 `close()`；堆外内存清理用 `Cleaner` + `PhantomReference`（如 Netty 的 `ByteBuf`）；维护老代码遇到 `finalize()` 逐步迁移到 `Cleaner`。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "finalize 是 Java 的析构函数" → Java 没有析构函数：析构要求确定性时机，而 `finalize` 由 GC 触发、时机不可控；C++ 的 RAII 确定性释放在 Java 中对应的是 try-with-resources。
- ❌ "三个词长得像，应该有关系" → 纯巧合：分别是关键字、语句块、方法，分属语法、异常处理、GC 三个毫不相关的领域。

:::

#### 🔀 发散问题

- **Q：需要清理的资源应该怎么设计？** → 实现 `AutoCloseable`，配合 `try-with-resources` 显式关闭；堆外资源再加 `Cleaner` 兜底，见本文档「如何使用 `try-with-resources` 代替`try-catch-finally`？」。
- **Q：`final` 修饰的变量真的不可变吗？** → 引用不可改指向，但对象内部状态仍可修改；真正的不可变需要类本身设计为 immutable（如 `String`）。

### 【简单】`instanceof` 关键字的作用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Java 基础语法 / 类型检查

#### 💎 关键结论

`instanceof` 做**运行时类型检查**，判断对象是否是某个类、子类或接口的实例，返回 boolean。核心规则：`null` 永远返回 `false`；检查的是实际运行时类型。Java 16+ 支持模式匹配，判断与强转一步完成。

#### ⚡记忆卡片

- **口诀**：instanceof 查运行类型，null 一律是 false；十六之后模式匹配，判断强转一行成
- **关键词**：运行时类型 ／ null 返 false ／ 模式匹配 ／ Java 16
- **链路**：obj instanceof Type → boolean → 16+ 通过后自动绑定变量

#### 📖 核心知识

**基本语法**：

```java
obj instanceof Type  // 返回 boolean
```

**核心规则**：

- **`null` 永远返回 `false`**：`null instanceof Object` → `false`。
- **检查的是实际运行时类型**，不受声明类型影响。
- **接口/抽象类也能用**：`"abc" instanceof CharSequence` → `true`。
- **数组类型检查**：`new int[0] instanceof Object` → `true`（数组本质是 Object）。

::: details Java 16+ 模式匹配增强

```java
// 旧写法：先判断再强制转换（冗长）
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 16+：模式匹配，自动绑定变量
if (obj instanceof String s) {
    System.out.println(s.length());  // s 已自动声明
}

// 结合流式判断
if (obj instanceof String s && s.length() > 5) {
    System.out.println("长字符串: " + s);
}
```

:::

**性能说明**：

- `instanceof` 比 `getClass() == X.class` 更宽松（前者考虑继承关系，后者要求精确匹配）。
- 现代 JVM 已优化 `instanceof` 性能，无需过度担心开销。

#### 🔀 发散问题

- **Q：`instanceof` 和 `getClass() == X.class` 怎么选？** → 需要包含子类/实现类用 `instanceof`；要求精确类型（如 equals 对称性场景）用 `getClass()` 比较。
- **Q：模式匹配绑定的变量作用域到哪？** → 仅在"判断必为 true"的分支内有效：`if (obj instanceof String s)` 的 if 体内可用，否定分支不可用。
