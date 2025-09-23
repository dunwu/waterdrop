---
title: Java 教程
date: 2022-04-27 18:23:47
categories:
  - Java
tags:
  - Java
permalink: /pages/cbf6db8d/
hidden: true
index: false
---

<p align="center">
    <a href="https://dunwu.github.io/java-tutorial/" target="_blank" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/dunwu/images/master/common/dunwu-logo.png" alt="logo" width="150px"/>
    </a>
</p>

<p align="center">

  <a href="https://github.com/dunwu/java-tutorial">
      <img alt="star" class="no-zoom" src="https://img.shields.io/github/stars/dunwu/java-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/java-tutorial">
      <img alt="fork" class="no-zoom" src="https://img.shields.io/github/forks/dunwu/java-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/java-tutorial/commits/master">
      <img alt="build" class="no-zoom" src="https://img.shields.io/github/actions/workflow/status/dunwu/java-tutorial/deploy.yml?style=for-the-badge">
  </a>

  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
      <img alt="code style" class="no-zoom" src="https://img.shields.io/github/license/dunwu/java-tutorial?style=for-the-badge">
  </a>

</p>

<h1 align="center">JavaTutorial</h1>

> ☕ **java-tutorial** 是一个 Java 教程，汇集一个老司机在 Java 领域的十年积累。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/java-tutorial/) | [Gitee](https://gitee.com/turnon/java-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/java-tutorial/) | [Gitee Pages](https://turnon.gitee.io/java-tutorial/)
>
> 说明：
>
> - 下面的内容清单中，凡是有 📚 标记的技术，都已整理成详细的教程。
> - 部分技术因为可以应用于不同领域，所以可能会同时出现在不同的类别下。

## 📖 内容

### JavaCore

#### [Java 基础特性](JavaCore/基础特性)

- [Java 基础语法特性](JavaCore/基础特性/Java_基础语法.md)
- [Java 基本数据类型](JavaCore/基础特性/Java_数据类型.md)
- [Java 面向对象](JavaCore/基础特性/Java_面向对象.md)
- [Java 方法](JavaCore/基础特性/Java_方法.md)
- [Java 数组](JavaCore/基础特性/Java_数组.md)
- [Java 枚举](JavaCore/基础特性/Java_枚举.md)
- [Java 控制语句](JavaCore/基础特性/Java_控制语句.md)
- [Java 异常](JavaCore/基础特性/Java_异常.md)
- [Java 泛型](JavaCore/基础特性/Java_泛型.md)
- [Java 反射](JavaCore/基础特性/Java_反射.md)
- [Java 注解](JavaCore/基础特性/Java_注解.md)
- [Java String 类型](JavaCore/基础特性/Java_String.md)

#### [Java 高级特性](JavaCore/高级特性)

- [Java 正则](JavaCore/高级特性/Java_正则.md) - 关键词：Pattern、Matcher、捕获与非捕获、反向引用、零宽断言、贪婪与懒惰、元字符、DFA、NFA
- [Java 编码和加密](JavaCore/高级特性/Java_编码和加密.md) - 关键词：Base64、消息摘要、数字签名、对称加密、非对称加密、MD5、SHA、HMAC、AES、DES、DESede、RSA
- [Java 国际化](JavaCore/高级特性/Java_国际化.md) - 关键词：Locale、ResourceBundle、NumberFormat、DateFormat、MessageFormat
- [Java JDK8](JavaCore/高级特性/Java_JDK8.md) - 关键词：Stream、lambda、Optional、@FunctionalInterface
- [Java SPI](JavaCore/高级特性/Java_SPI.md) - 关键词：SPI、ClassLoader
- [JavaAgent](JavaCore/高级特性/Java_Agent.md)

#### [Java 容器](JavaCore/容器)

- [Java 容器简介](JavaCore/容器/Java_容器_简介.md) - 关键词：泛型、Iterable、Iterator、Comparable、Comparator、Cloneable、fail-fast
- [Java 容器之 List](JavaCore/容器/Java_容器_List.md) - 关键词：List、ArrayList、LinkedList
- [Java 容器之 Map](JavaCore/容器/Java_容器_Map.md) - 关键词：Map、HashMap、TreeMap、LinkedHashMap、WeakHashMap
- [Java 容器之 Set](JavaCore/容器/Java_容器_Set.md) - 关键词：Set、HashSet、TreeSet、LinkedHashSet、EnumSet
- [Java 容器之 Queue](JavaCore/容器/Java_容器_Queue.md) - 关键词：Queue、Deque、ArrayDeque、LinkedList、PriorityQueue
- [Java 容器之 Stream](JavaCore/容器/Java_容器_Stream.md)

#### [Java IO](JavaCore/IO)

- [Java IO 之 简介](JavaCore/IO/Java_IO_简介.md) - 关键词：BIO、NIO、AIO
- [Java IO 之 BIO](JavaCore/IO/Java_IO_BIO.md) - 关键词：BIO、InputStream、OutputStream、Reader、Writer、File、Socket、ServerSocket
- [Java IO 之 NIO](JavaCore/IO/Java_IO_NIO.md) - 关键词：NIO、Channel、Buffer、Selector、多路复用
- [Java IO 之序列化](JavaCore/IO/Java_IO_序列化.md) - 关键词：Serializable、serialVersionUID、transient、Externalizable

#### [Java 并发](JavaCore/并发)

- [Java 并发简介](JavaCore/并发/Java_并发_简介.md) - 关键词：并发、线程、安全性、活跃性、性能、死锁、活锁
- [Java 并发之内存模型](JavaCore/并发/Java_并发_内存模型.md) - 关键词：JMM、Happens-Before、内存屏障、volatile、synchronized、final、指令重排序
- [Java 并发之线程](JavaCore/并发/Java_并发_线程.md) - 关键词：Thread、Runnable、Callable、Future、FutureTask、线程生命周期
- [Java 并发之锁](JavaCore/并发/Java_并发_锁.md) - 关键词：锁、Lock、Condition、ReentrantLock、ReentrantReadWriteLock、StampedLock
- [Java 并发之无锁](JavaCore/并发/Java_并发_无锁.md) - 关键词：CAS、ThreadLocal、Immutability、Copy-on-Write
- [Java 并发之 AQS](JavaCore/并发/Java_并发_AQS.md) - 关键词：AQS、独占锁、共享锁
- [Java 并发之容器](JavaCore/并发/Java_并发_容器.md) - 关键词：ConcurrentHashMap、CopyOnWriteArrayList
- [Java 并发之线程池](JavaCore/并发/Java_并发_线程池.md) - 关键词：Executor、ExecutorService、ThreadPoolExecutor、Executors
- [Java 并发之同步工具](JavaCore/并发/Java_并发_同步工具.md) - 关键词：Semaphore、CountDownLatch、CyclicBarrier
- [Java 并发之分工工具](JavaCore/并发/Java_并发_分工工具.md) - 关键词：CompletableFuture、CompletionStage、ForkJoinPool

#### [Java 虚拟机](JavaCore/JVM)

- [Java 虚拟机简介](JavaCore/JVM/Java_虚拟机_简介.md)
- [Java 虚拟机之内存区域](JavaCore/JVM/Java_虚拟机_内存区域.md) - 关键词：`程序计数器`、`虚拟机栈`、`本地方法栈`、`堆`、`方法区`、`运行时常量池`、`直接内存`、`OutOfMemoryError`、`StackOverflowError`
- [Java 虚拟机之垃圾收集](JavaCore/JVM/Java_虚拟机_垃圾收集.md) - 关键词：`GC Roots`、`Serial`、`Parallel`、`CMS`、`G1`、`Minor GC`、`Full GC`
- [Java 虚拟机之字节码](JavaCore/JVM/Java_虚拟机_字节码.md) - 关键词：`bytecode`、`asm`、`javassist`
- [Java 虚拟机之类加载](JavaCore/JVM/Java_虚拟机_类加载.md) - 关键词：`ClassLoader`、`双亲委派`
- [Java 虚拟机之工具](JavaCore/JVM/Java_虚拟机_工具.md) - 关键词：`jps`、`jstat`、`jmap` 、`jstack`、`jhat`、`jinfo`、`jconsole`、`jvisualvm`、`MAT`、`JProfile`、`Arthas`
- [Java 虚拟机之故障处理](JavaCore/JVM/Java_虚拟机_故障处理.md) - 关键词：`CPU`、`内存`、`磁盘`、`网络`、`GC`
- [Java 虚拟机之调优](JavaCore/JVM/Java_虚拟机_调优.md) - 关键词：`配置`、`调优`

### JavaEE

#### JavaWeb

- [JavaWeb 面经](JavaWeb/JavaWeb_面经.md)
- [JavaWeb 之 Servlet 指南](JavaWeb/JavaWeb_Servlet.md)
- [JavaWeb 之 Jsp 指南](JavaWeb/JavaWeb_JSP.md)
- [JavaWeb 之 Filter 和 Listener](JavaWeb/JavaWeb_Filter_Listener.md)
- [JavaWeb 之 Cookie 和 Session](JavaWeb/JavaWeb_Cookie_Session.md)

#### Java 服务器

> Tomcat 和 Jetty 都是 Java 比较流行的轻量级服务器。
>
> Nginx 是目前最流行的反向代理服务器，也常用于负载均衡。

- [Tomcat 快速入门](服务器/Tomcat/Tomcat_快速入门.md)
- [Tomcat 连接器](服务器/Tomcat/Tomcat_连接器.md)
- [Tomcat 容器](服务器/Tomcat/Tomcat_容器.md)
- [Tomcat 优化](服务器/Tomcat/Tomcat_优化.md)
- [Tomcat 和 Jetty](服务器/Tomcat/Tomcat_Jetty.md)
- [Jetty](服务器/Jetty.md)

### Java 软件

#### Java 构建

> Java 项目需要通过 [**构建工具**](软件/构建) 来管理项目依赖，完成编译、打包、发布、生成 JavaDoc 等任务。
>
> - 目前最主流的构建工具是 Maven，它的功能非常强大。
> - Gradle 号称是要替代 Maven 等构件工具，它的版本管理确实简洁，但是需要学习 Groovy，学习成本比 Maven 高。
> - Ant 功能比 Maven 和 Gradle 要弱，现代 Java 项目基本不用了，但也有一些传统的 Java 项目还在使用。

- [Maven](软件/构建/Maven) 📚
  - [Maven 快速入门](软件/构建/Maven/Maven_快速入门.md)
  - [Maven 教程之 pom.xml 详解](软件/构建/Maven/Maven_pom_详解.md)
  - [Maven 教程之 settings.xml 详解](软件/构建/Maven/Maven_settings_详解.md)
  - [Maven 实战问题和最佳实践](软件/构建/Maven/Maven_最佳实践.md)
  - [Maven 教程之发布 jar 到私服或中央仓库](软件/构建/Maven/Maven_发布.md)
  - [Maven 插件之代码检查](软件/构建/Maven/Maven_插件_代码检查.md)
- [Ant 简易教程](软件/构建/Ant.md)

#### Java IDE

> 自从有了 [**IDE**](软件/IDE)，写代码从此就告别了刀耕火种的蛮荒时代。
>
> - [Eclipse](软件/IDE/Eclipse.md) 是久负盛名的开源 Java IDE，我的学生时代一直使用它写 Java。
> - 曾经抗拒从转 [Intellij Idea](软件/IDE/Intellij.md) ，但后来发现真香，不得不说，确实是目前最优秀的 Java IDE。
> - 你可以在 [vscode](软件/IDE/VsCode.md) 中写各种语言，只要安装相应插件即可。如果你的项目中使用了很多种编程语言，又懒得在多个 IDE 之间切换，那么就用 vscode 来一网打尽吧。

- [Intellij Idea](软件/IDE/Intellij.md)
- [Eclipse](软件/IDE/Eclipse.md)
- [vscode](软件/IDE/VsCode.md)

#### Java 监控诊断

> [监控/诊断](软件/监控诊断) 工具主要用于 Java 应用的运维。通过采集、分析、存储、可视化应用的有效数据，帮助开发者、使用者快速定位问题，找到性能瓶颈。

- [监控工具对比](软件/监控诊断/监控工具.md)
- [CAT](软件/监控诊断/CAT.md)
- [Zipkin](软件/监控诊断/Zipkin.md)
- [SkyWalking](软件/监控诊断/Skywalking.md)
- [Arthas](软件/监控诊断/Arthas.md)

### Java 工具

#### Java IO

- [JSON 序列化](工具/IO/JSON序列化.md) - [fastjson](https://github.com/alibaba/fastjson)、[Jackson](https://github.com/FasterXML/jackson)、[Gson](https://github.com/google/gson)
- [二进制序列化](工具/IO/二进制序列化.md) - [Protobuf](https://developers.google.com/protocol-buffers)、[Thrift](https://thrift.apache.org/)、[Hessian](http://hessian.caucho.com/)、[Kryo](https://github.com/EsotericSoftware/kryo)、[FST](https://github.com/RuedigerMoeller/fast-serialization)

#### JavaBean 工具

- [Lombok](工具/JavaBean/Lombok.md)
- [Dozer](工具/JavaBean/Dozer.md)

#### Java 模板引擎

- [Freemark](工具/模板引擎/Freemark.md)
- [Velocity](工具/模板引擎/Thymeleaf.md)
- [Thymeleaf](工具/模板引擎/Velocity.md)

#### Java 测试工具

- [Junit](工具/测试/Junit.md)
- [Mockito](工具/测试/Mockito.md)
- [Jmeter](工具/测试/Jmeter.md)
- [JMH](工具/测试/JMH.md)

#### 其他

- [Java 日志](工具/其他/Java日志.md)
- [Java 工具包](工具/其他/Java工具包.md)
- [Reflections](工具/其他/Reflections.md)
- [JavaMail](工具/其他/JavaMail.md)
- [Jsoup](工具/其他/Jsoup.md)
- [Thumbnailator](工具/其他/Thumbnailator.md)
- [Zxing](工具/其他/Zxing.md)

### Java 框架

#### Spring

##### 综合

- [Spring 概述](框架/Spring/Spring综合/Spring概述.md)
- [SpringBoot 知识图谱](框架/Spring/Spring综合/SpringBoot知识图谱.md)
- [SpringBoot 基本原理](框架/Spring/Spring综合/SpringBoot基本原理.md)
- [Spring 面试](框架/Spring/Spring面试.md)

##### 核心

- [Spring Bean](框架/Spring/Spring核心/SpringBean.md)
- [Spring IoC](框架/Spring/Spring核心/SpringIoC.md)
- [Spring 依赖查找](框架/Spring/Spring核心/Spring依赖查找.md)
- [Spring 依赖注入](框架/Spring/Spring核心/Spring依赖注入.md)
- [Spring IoC 依赖来源](框架/Spring/Spring核心/SpringIoC依赖来源.md)
- [Spring Bean 作用域](框架/Spring/Spring核心/SpringBean作用域.md)
- [Spring Bean 生命周期](框架/Spring/Spring核心/SpringBean生命周期.md)
- [Spring 配置元数据](框架/Spring/Spring核心/Spring配置元数据.md)
- [Spring AOP](框架/Spring/Spring核心/SpringAop.md)
- [Spring 资源管理](框架/Spring/Spring核心/Spring资源管理.md)
- [Spring 校验](框架/Spring/Spring核心/Spring校验.md)
- [Spring 数据绑定](框架/Spring/Spring核心/Spring数据绑定.md)
- [Spring 类型转换](框架/Spring/Spring核心/Spring类型转换.md)
- [Spring EL 表达式](框架/Spring/Spring核心/SpringEL.md)
- [Spring 事件](框架/Spring/Spring核心/Spring事件.md)
- [Spring 国际化](框架/Spring/Spring核心/Spring国际化.md)
- [Spring 泛型处理](框架/Spring/Spring核心/Spring泛型处理.md)
- [Spring 注解](框架/Spring/Spring核心/Spring注解.md)
- [Spring Environment 抽象](框架/Spring/Spring核心/SpringEnvironment抽象.md)
- [SpringBoot 教程之快速入门](框架/Spring/Spring核心/SpringBoot之快速入门.md)
- [SpringBoot 之属性加载](框架/Spring/Spring核心/SpringBoot之属性加载.md)
- [SpringBoot 之 Profile](框架/Spring/Spring核心/SpringBoot之Profile.md)

##### 数据

- [Spring 之数据源](框架/Spring/Spring数据/Spring之数据源.md)
- [Spring 之 JDBC](框架/Spring/Spring数据/Spring之JDBC.md)
- [Spring 之事务](框架/Spring/Spring数据/Spring之事务.md)
- [Spring 之 JPA](框架/Spring/Spring数据/Spring之JPA.md)
- [Spring 集成 Mybatis](框架/Spring/Spring数据/Spring集成Mybatis.md)
- [Spring 访问 Redis](框架/Spring/Spring数据/Spring访问Redis.md)
- [Spring 访问 MongoDB](框架/Spring/Spring数据/Spring访问MongoDB.md)
- [Spring 访问 Elasticsearch](框架/Spring/Spring数据/Spring访问Elasticsearch.md)

##### Web

- [SpringWeb 综述](框架/Spring/SpringWeb/SpringWeb综述.md)
- [SpringWeb 应用](框架/Spring/SpringWeb/SpringWeb应用.md)
- [DispatcherServlet](框架/Spring/SpringWeb/DispatcherServlet.md)
- [Spring 过滤器](框架/Spring/SpringWeb/Spring过滤器.md)
- [Spring 跨域](框架/Spring/SpringWeb/Spring跨域.md)
- [Spring 视图](框架/Spring/SpringWeb/Spring视图.md)
- [SpringBoot 之应用 EasyUI](框架/Spring/SpringWeb/SpringBoot之应用EasyUI.md)

##### IO

- [SpringBoot 之异步请求](框架/Spring/SpringIO/SpringBoot之异步请求.md)
- [SpringBoot 之 Json](框架/Spring/SpringIO/SpringBoot之Json.md)
- [SpringBoot 之邮件](框架/Spring/SpringIO/SpringBoot之邮件.md)

##### 集成

- [Spring 集成缓存中间件](框架/Spring/Spring集成/Spring集成缓存.md)
- [Spring 集成定时任务中间件](框架/Spring/Spring集成/Spring集成调度器.md)
- [Spring 集成 Dubbo](框架/Spring/Spring集成/Spring集成Dubbo.md)

##### 其他

- [Spring4 升级](框架/Spring/Spring其他/Spring4升级.md)
- [SpringBoot 之 banner](框架/Spring/Spring其他/SpringBoot之banner.md)
- [SpringBoot 之 Actuator](框架/Spring/Spring其他/SpringBoot之Actuator.md)

#### ORM

- [MyBatis 快速入门](框架/ORM/MyBatis快速入门.md)
- [MyBatis 原理](框架/ORM/MyBatis原理.md)
- [MyBatis 原理](框架/ORM/MyBatis面试.md)

#### 安全

> Java 领域比较流行的安全框架就是 shiro 和 spring-security。
>
> shiro 更为简单、轻便，容易理解，能满足大多数基本安全场景下的需要。
>
> spring-security 功能更丰富，也比 shiro 更复杂。值得一提的是由于 spring-security 是 spring 团队开发，所以集成 spring 和 spring-boot 框架更容易。

- [Shiro](框架/安全/Shiro.md)
- [SpringSecurity](框架/安全/SpringSecurity.md)

#### IO

- [Netty](框架/IO/Netty.md)

### Java 中间件

#### 缓存

> 缓存可以说是优化系统性能的第一手段，在各种技术中都会有缓存的应用。
>
> 如果想深入学习缓存，建议先了解一下 [缓存基本原理](https://dunwu.github.io/design/distributed/分布式缓存.html)，有助于理解缓存的特性、原理，使用缓存常见的问题及解决方案。

- [Java 缓存中间件](中间件/缓存/Java_缓存.md)
- [Ehcache 快速入门](中间件/缓存/Ehcache.md)
- [Java 进程内缓存](中间件/缓存/Java_进程内缓存.md)
- [Http 缓存](中间件/缓存/Http_缓存.md)

#### 流量控制

- [Hystrix](中间件/流量控制/Hystrix.md)

### [大数据](https://dunwu.github.io/bigdata-tutorial)

> 大数据技术点以归档在：[bigdata-tutorial](https://dunwu.github.io/bigdata-tutorial)

- [Hdfs](https://dunwu.github.io/bigdata-tutorial/hdfs) 📚
- [Hbase](https://dunwu.github.io/bigdata-tutorial/hbase) 📚
- [Hive](https://dunwu.github.io/bigdata-tutorial/hive) 📚
- [MapReduce](https://dunwu.github.io/bigdata-tutorial/mapreduce)
- [Yarn](https://dunwu.github.io/bigdata-tutorial/yarn)
- [ZooKeeper](https://dunwu.github.io/bigdata-tutorial/zookeeper) 📚
- [Kafka](https://dunwu.github.io/bigdata-tutorial/kafka) 📚
- Spark
- Storm
- [Flink](https://dunwu.github.io/bigdata-tutorial/tree/master/docs/flink)

## 📚 资料

- **书籍**
  - Java 基础
    - [《Java 编程思想》](https://book.douban.com/subject/2130190/) - Thinking in java，典中典！由于成书较早，部分内容已经多少有点过时
    - [《Java 核心技术 卷 I 开发基础》](https://book.douban.com/subject/35920145/) - 第 12 版，涵盖 Java 17 的新特性
    - [《Java 核心技术 卷 II 高级特性》](https://book.douban.com/subject/36337685/) - 第 12 版，涵盖 Java 17 的新特性
    - [《Effective Java》](https://book.douban.com/subject/36818907/) - 第 3 版，涵盖 Java 9 的新特性
    - [《Head First Java》](https://book.douban.com/subject/2000732/) - 图文并茂，对新手非常友好的入门级教程
    - [《疯狂 Java 讲义》](https://book.douban.com/subject/3246499/) - 入门级教程
  - Java 并发
    - [《Java 并发编程实战》](https://book.douban.com/subject/10484692/) - 深入浅出地介绍 Java 线程和并发
    - [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
  - Java 虚拟机
    - [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/) - 第 3 版，国内最好的 JVM 书籍
  - Java IO
    - [《Netty 实战》](https://book.douban.com/subject/27038538/)
  - 其他
    - [《Head First 设计模式》](https://book.douban.com/subject/2243615/)
    - [《Java 网络编程》](https://book.douban.com/subject/1438754/)
    - [《Java 加密与解密的艺术》](https://book.douban.com/subject/25861566/)
    - [《阿里巴巴 Java 开发手册》](https://book.douban.com/subject/27605355/)
- **教程、社区**
  - [Runoob Java 教程](https://www.runoob.com/java/java-tutorial.html)
  - [极客时间教程 - Java 核心技术面试精讲](https://time.geekbang.org/column/intro/82) - 极客时间教程——从面试官视角梳理如何解答常见 Java 面试问题
  - [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901) - 极客时间教程——图文并茂，系统性讲解并发编程知识
  - [拉勾教育教程 - Java 并发编程 78 讲](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=16) - 拉勾教育教程——针对并发场景问题，讲解的通俗易懂
  - [极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701) - 极客时间教程——基于 Java 生产环境的真实案例，讲解“避坑”的手段，很硬核
  - [极客时间教程 - Java 性能调优实战](https://time.geekbang.org/column/intro/100028001) - 极客时间教程——覆盖 80% 以上 Java 应用调优场景
  - [极客时间教程 - 深入拆解 Java 虚拟机](https://time.geekbang.org/column/intro/100010301) - 极客时间教程
  - [CS-Notes](https://github.com/CyC2018/CS-Notes) - Github 上的 Java 基础级面试教程，行文清晰简洁
  - [JavaGuide](https://github.com/Snailclimb/JavaGuide) - Github 上的 Java 面试教程，Java 基础部分讲解较为细致
  - [advanced-java](https://github.com/doocs/advanced-java) - Github 上的 Java 面试教程，分布式部分从面试官视角讲解核心考察点
  - [java-design-patterns](https://github.com/iluwatar/java-design-patterns) - Github 上的 Java 版设计模式教程
  - [Java](https://github.com/TheAlgorithms/Java) - Github 上的 Java 算法教程

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾