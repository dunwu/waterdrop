---
title: Java 教程
date: 2022-04-27 18:23:47
categories:
  - Java
tags:
  - Java
permalink: /pages/0d2474/
hidden: true
index: false
---

<p align="center">
    <a href="https://dunwu.github.io/java-tutorial/" target="_blank" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/dunwu/images/dev/common/dunwu-logo.png" alt="logo" width="150px"/>
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

### JavaSE

#### [Java 基础特性](01.JavaSE/01.基础特性)

- [Java 开发环境](01.JavaSE/01.基础特性/00.Java开发环境.md)
- [Java 基础语法特性](01.JavaSE/01.基础特性/01.Java基础语法.md)
- [Java 基本数据类型](01.JavaSE/01.基础特性/02.Java基本数据类型.md)
- [Java 面向对象](01.JavaSE/01.基础特性/03.Java面向对象.md)
- [Java 方法](01.JavaSE/01.基础特性/04.Java方法.md)
- [Java 数组](01.JavaSE/01.基础特性/05.Java数组.md)
- [Java 枚举](01.JavaSE/01.基础特性/06.Java枚举.md)
- [Java 控制语句](01.JavaSE/01.基础特性/07.Java控制语句.md)
- [Java 异常](01.JavaSE/01.基础特性/08.Java异常.md)
- [Java 泛型](01.JavaSE/01.基础特性/09.Java泛型.md)
- [Java 反射](01.JavaSE/01.基础特性/10.Java反射.md)
- [Java 注解](01.JavaSE/01.基础特性/11.Java注解.md)
- [Java String 类型](01.JavaSE/01.基础特性/42.JavaString类型.md)

#### [Java 高级特性](01.JavaSE/02.高级特性)

- [Java 正则从入门到精通](01.JavaSE/02.高级特性/01.Java正则.md) - 关键词：`Pattern`、`Matcher`、`捕获与非捕获`、`反向引用`、`零宽断言`、`贪婪与懒惰`、`元字符`、`DFA`、`NFA`
- [Java 编码和加密](01.JavaSE/02.高级特性/02.Java编码和加密.md) - 关键词：`Base64`、`消息摘要`、`数字签名`、`对称加密`、`非对称加密`、`MD5`、`SHA`、`HMAC`、`AES`、`DES`、`DESede`、`RSA`
- [Java 国际化](01.JavaSE/02.高级特性/03.Java国际化.md) - 关键词：`Locale`、`ResourceBundle`、`NumberFormat`、`DateFormat`、`MessageFormat`
- [Java JDK8](01.JavaSE/02.高级特性/04.JDK8.md) - 关键词：`Stream`、`lambda`、`Optional`、`@FunctionalInterface`
- [Java SPI](01.JavaSE/02.高级特性/05.JavaSPI.md) - 关键词：`SPI`、`ClassLoader`

#### [Java 容器](01.JavaSE/03.容器)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200221175550.png)

- [Java 容器简介](01.JavaSE/03.容器/01.Java容器简介.md) - 关键词：`Collection`、`泛型`、`Iterable`、`Iterator`、`Comparable`、`Comparator`、`Cloneable`、`fail-fast`
- [Java 容器之 List](01.JavaSE/03.容器/02.Java容器之List.md) - 关键词：`List`、`ArrayList`、`LinkedList`
- [Java 容器之 Map](01.JavaSE/03.容器/03.Java容器之Map.md) - 关键词：`Map`、`HashMap`、`TreeMap`、`LinkedHashMap`、`WeakHashMap`
- [Java 容器之 Set](01.JavaSE/03.容器/04.Java容器之Set.md) - 关键词：`Set`、`HashSet`、`TreeSet`、`LinkedHashSet`、`EmumSet`
- [Java 容器之 Queue](01.JavaSE/03.容器/05.Java容器之Queue.md) - 关键词：`Queue`、`Deque`、`ArrayDeque`、`LinkedList`、`PriorityQueue`
- [Java 容器之 Stream](01.JavaSE/03.容器/06.Java容器之Stream.md)

#### [Java IO](01.JavaSE/04.IO)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200630205329.png)

- [Java IO 模型](01.JavaSE/04.IO/01.JavaIO模型.md) - 关键词：`InputStream`、`OutputStream`、`Reader`、`Writer`、`阻塞`
- [Java NIO](01.JavaSE/04.IO/02.JavaNIO.md) - 关键词：`Channel`、`Buffer`、`Selector`、`非阻塞`、`多路复用`
- [Java 序列化](01.JavaSE/04.IO/03.Java序列化.md) - 关键词：`Serializable`、`serialVersionUID`、`transient`、`Externalizable`、`writeObject`、`readObject`
- [Java 网络编程](01.JavaSE/04.IO/04.Java网络编程.md) - 关键词：`Socket`、`ServerSocket`、`DatagramPacket`、`DatagramSocket`
- [Java IO 工具类](01.JavaSE/04.IO/05.JavaIO工具类.md) - 关键词：`File`、`RandomAccessFile`、`System`、`Scanner`

#### [Java 并发](01.JavaSE/05.并发)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200221175827.png)

- [Java 并发简介](01.JavaSE/05.并发/01.Java并发简介.md) - 关键词：`进程`、`线程`、`安全性`、`活跃性`、`性能`、`死锁`、`饥饿`、`上下文切换`
- [Java 线程基础](01.JavaSE/05.并发/02.Java线程基础.md) - 关键词：`Thread`、`Runnable`、`Callable`、`Future`、`wait`、`notify`、`notifyAll`、`join`、`sleep`、`yeild`、`线程状态`、`线程通信`
- [Java 并发核心机制](01.JavaSE/05.并发/03.Java并发核心机制.md) - 关键词：`synchronized`、`volatile`、`CAS`、`ThreadLocal`
- [Java 并发锁](01.JavaSE/05.并发/04.Java锁.md) - 关键词：`AQS`、`ReentrantLock`、`ReentrantReadWriteLock`、`Condition`
- [Java 原子类](01.JavaSE/05.并发/05.Java原子类.md) - 关键词：`CAS`、`Atomic`
- [Java 并发容器](01.JavaSE/05.并发/06.Java并发和容器.md) - 关键词：`ConcurrentHashMap`、`CopyOnWriteArrayList`
- [Java 线程池](01.JavaSE/05.并发/07.Java线程池.md) - 关键词：`Executor`、`ExecutorService`、`ThreadPoolExecutor`、`Executors`
- [Java 并发工具类](01.JavaSE/05.并发/08.Java并发工具类.md) - 关键词：`CountDownLatch`、`CyclicBarrier`、`Semaphore`
- [Java 内存模型](01.JavaSE/05.并发/09.Java内存模型.md) - 关键词：`JMM`、`volatile`、`synchronized`、`final`、`Happens-Before`、`内存屏障`
- [ForkJoin 框架](01.JavaSE/05.并发/10.ForkJoin框架.md)

#### [Java 虚拟机](01.JavaSE/06.JVM)

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200628154803.png)

- [JVM 体系结构](01.JavaSE/06.JVM/01.JVM体系结构.md)
- [JVM 内存区域](01.JavaSE/06.JVM/02.JVM内存区域.md) - 关键词：`程序计数器`、`虚拟机栈`、`本地方法栈`、`堆`、`方法区`、`运行时常量池`、`直接内存`、`OutOfMemoryError`、`StackOverflowError`
- [JVM 垃圾收集](01.JavaSE/06.JVM/03.JVM垃圾收集.md) - 关键词：`GC Roots`、`Serial`、`Parallel`、`CMS`、`G1`、`Minor GC`、`Full GC`
- [JVM 类加载](01.JavaSE/06.JVM/04.JVM类加载.md) - 关键词：`ClassLoader`、`双亲委派`
- [JVM 字节码](01.JavaSE/06.JVM/05.JVM字节码.md) - 关键词：`bytecode`、`asm`、`javassist`
- [JVM 命令行工具](01.JavaSE/06.JVM/11.JVM命令行工具.md) - 关键词：`jps`、`jstat`、`jmap` 、`jstack`、`jhat`、`jinfo`
- [JVM GUI 工具](01.JavaSE/06.JVM/12.JVM_GUI工具.md) - 关键词：`jconsole`、`jvisualvm`、`MAT`、`JProfile`、`Arthas`
- [JVM 实战](01.JavaSE/06.JVM/21.JVM实战.md) - 关键词：`配置`、`调优`
- [Java 故障诊断](01.JavaSE/06.JVM/22.Java故障诊断.md) - 关键词：`CPU`、`内存`、`磁盘`、`网络`、`GC`

### JavaEE

#### JavaWeb

- [JavaWeb 面经](02.JavaEE/01.JavaWeb/99.JavaWeb面经.md)
- [JavaWeb 之 Servlet 指南](02.JavaEE/01.JavaWeb/01.JavaWeb之Servlet指南.md)
- [JavaWeb 之 Jsp 指南](02.JavaEE/01.JavaWeb/02.JavaWeb之Jsp指南.md)
- [JavaWeb 之 Filter 和 Listener](02.JavaEE/01.JavaWeb/03.JavaWeb之Filter和Listener.md)
- [JavaWeb 之 Cookie 和 Session](02.JavaEE/01.JavaWeb/04.JavaWeb之Cookie和Session.md)

#### Java 服务器

> Tomcat 和 Jetty 都是 Java 比较流行的轻量级服务器。
>
> Nginx 是目前最流行的反向代理服务器，也常用于负载均衡。

- [Tomcat 快速入门](02.JavaEE/02.服务器/01.Tomcat/01.Tomcat快速入门.md)
- [Tomcat 连接器](02.JavaEE/02.服务器/01.Tomcat/02.Tomcat连接器.md)
- [Tomcat 容器](02.JavaEE/02.服务器/01.Tomcat/03.Tomcat容器.md)
- [Tomcat 优化](02.JavaEE/02.服务器/01.Tomcat/04.Tomcat优化.md)
- [Tomcat 和 Jetty](02.JavaEE/02.服务器/01.Tomcat/05.Tomcat和Jetty.md)
- [Jetty](02.JavaEE/02.服务器/02.Jetty.md)

### Java 软件

#### Java 构建

> Java 项目需要通过 [**构建工具**](11.软件/01.构建) 来管理项目依赖，完成编译、打包、发布、生成 JavaDoc 等任务。
>
> - 目前最主流的构建工具是 Maven，它的功能非常强大。
> - Gradle 号称是要替代 Maven 等构件工具，它的版本管理确实简洁，但是需要学习 Groovy，学习成本比 Maven 高。
> - Ant 功能比 Maven 和 Gradle 要弱，现代 Java 项目基本不用了，但也有一些传统的 Java 项目还在使用。

- [Maven](11.软件/01.构建/01.Maven) 📚
  - [Maven 快速入门](11.软件/01.构建/01.Maven/01.Maven快速入门.md)
  - [Maven 教程之 pom.xml 详解](11.软件/01.构建/01.Maven/02.Maven教程之pom.xml详解.md)
  - [Maven 教程之 settings.xml 详解](11.软件/01.构建/01.Maven/03.Maven教程之settings.xml详解.md)
  - [Maven 实战问题和最佳实践](11.软件/01.构建/01.Maven/04.Maven实战问题和最佳实践.md)
  - [Maven 教程之发布 jar 到私服或中央仓库](11.软件/01.构建/01.Maven/05.Maven教程之发布jar到私服或中央仓库.md)
  - [Maven 插件之代码检查](11.软件/01.构建/01.Maven/06.Maven插件之代码检查.md)
- [Ant 简易教程](11.软件/01.构建/02.Ant.md)

#### Java IDE

> 自从有了 [**IDE**](11.软件/02.IDE)，写代码从此就告别了刀耕火种的蛮荒时代。
>
> - [Eclipse](11.软件/02.IDE/02.Eclipse.md) 是久负盛名的开源 Java IDE，我的学生时代一直使用它写 Java。
> - 曾经抗拒从转 [Intellij Idea](11.软件/02.IDE/01.Intellij.md) ，但后来发现真香，不得不说，确实是目前最优秀的 Java IDE。
> - 你可以在 [vscode](11.软件/02.IDE/03.VsCode.md) 中写各种语言，只要安装相应插件即可。如果你的项目中使用了很多种编程语言，又懒得在多个 IDE 之间切换，那么就用 vscode 来一网打尽吧。

- [Intellij Idea](11.软件/02.IDE/01.Intellij.md)
- [Eclipse](11.软件/02.IDE/02.Eclipse.md)
- [vscode](11.软件/02.IDE/03.VsCode.md)

#### Java 监控诊断

> [监控/诊断](11.软件/03.监控诊断) 工具主要用于 Java 应用的运维。通过采集、分析、存储、可视化应用的有效数据，帮助开发者、使用者快速定位问题，找到性能瓶颈。

- [监控工具对比](11.软件/03.监控诊断/01.监控工具对比.md)
- [CAT](11.软件/03.监控诊断/02.CAT.md)
- [Zipkin](11.软件/03.监控诊断/03.Zipkin.md)
- [SkyWalking](11.软件/03.监控诊断/04.Skywalking.md)
- [Arthas](11.软件/03.监控诊断/05.Arthas.md)

### Java 工具

#### Java IO

- [JSON 序列化](12.工具/01.IO/01.JSON序列化.md) - [fastjson](https://github.com/alibaba/fastjson)、[Jackson](https://github.com/FasterXML/jackson)、[Gson](https://github.com/google/gson)
- [二进制序列化](12.工具/01.IO/02.二进制序列化.md) - [Protobuf](https://developers.google.com/protocol-buffers)、[Thrift](https://thrift.apache.org/)、[Hessian](http://hessian.caucho.com/)、[Kryo](https://github.com/EsotericSoftware/kryo)、[FST](https://github.com/RuedigerMoeller/fast-serialization)

#### JavaBean 工具

- [Lombok](12.工具/02.JavaBean/01.Lombok.md)
- [Dozer](12.工具/02.JavaBean/02.Dozer.md)

#### Java 模板引擎

- [Freemark](12.工具/03.模板引擎/01.Freemark.md)
- [Velocity](12.工具/03.模板引擎/02.Thymeleaf.md)
- [Thymeleaf](12.工具/03.模板引擎/03.Velocity.md)

#### Java 测试工具

- [Junit](12.工具/04.测试/01.Junit.md)
- [Mockito](12.工具/04.测试/02.Mockito.md)
- [Jmeter](12.工具/04.测试/03.Jmeter.md)
- [JMH](12.工具/04.测试/04.JMH.md)

#### 其他

- [Java 日志](12.工具/99.其他/01.Java日志.md)
- [Java 工具包](12.工具/99.其他/02.Java工具包.md)
- [Reflections](12.工具/99.其他/03.Reflections.md)
- [JavaMail](12.工具/99.其他/04.JavaMail.md)
- [Jsoup](12.工具/99.其他/05.Jsoup.md)
- [Thumbnailator](12.工具/99.其他/06.Thumbnailator.md)
- [Zxing](12.工具/99.其他/07.Zxing.md)

### Java 框架

#### Spring

##### 综合

- [Spring 概述](13.框架/01.Spring/00.Spring综合/01.Spring概述.md)
- [SpringBoot 知识图谱](13.框架/01.Spring/00.Spring综合/21.SpringBoot知识图谱.md)
- [SpringBoot 基本原理](13.框架/01.Spring/00.Spring综合/22.SpringBoot基本原理.md)
- [Spring 面试](13.框架/01.Spring/00.Spring综合/99.Spring面试.md)

##### 核心

- [Spring Bean](13.框架/01.Spring/01.Spring核心/01.SpringBean.md)
- [Spring IoC](13.框架/01.Spring/01.Spring核心/02.SpringIoC.md)
- [Spring 依赖查找](13.框架/01.Spring/01.Spring核心/03.Spring依赖查找.md)
- [Spring 依赖注入](13.框架/01.Spring/01.Spring核心/04.Spring依赖注入.md)
- [Spring IoC 依赖来源](13.框架/01.Spring/01.Spring核心/05.SpringIoC依赖来源.md)
- [Spring Bean 作用域](13.框架/01.Spring/01.Spring核心/06.SpringBean作用域.md)
- [Spring Bean 生命周期](13.框架/01.Spring/01.Spring核心/07.SpringBean生命周期.md)
- [Spring 配置元数据](13.框架/01.Spring/01.Spring核心/08.Spring配置元数据.md)
- [Spring AOP](13.框架/01.Spring/01.Spring核心/10.SpringAop.md)
- [Spring 资源管理](13.框架/01.Spring/01.Spring核心/20.Spring资源管理.md)
- [Spring 校验](13.框架/01.Spring/01.Spring核心/21.Spring校验.md)
- [Spring 数据绑定](13.框架/01.Spring/01.Spring核心/22.Spring数据绑定.md)
- [Spring 类型转换](13.框架/01.Spring/01.Spring核心/23.Spring类型转换.md)
- [Spring EL 表达式](13.框架/01.Spring/01.Spring核心/24.SpringEL.md)
- [Spring 事件](13.框架/01.Spring/01.Spring核心/25.Spring事件.md)
- [Spring 国际化](13.框架/01.Spring/01.Spring核心/26.Spring国际化.md)
- [Spring 泛型处理](13.框架/01.Spring/01.Spring核心/27.Spring泛型处理.md)
- [Spring 注解](13.框架/01.Spring/01.Spring核心/28.Spring注解.md)
- [Spring Environment 抽象](13.框架/01.Spring/01.Spring核心/29.SpringEnvironment抽象.md)
- [SpringBoot 教程之快速入门](13.框架/01.Spring/01.Spring核心/31.SpringBoot之快速入门.md)
- [SpringBoot 之属性加载](13.框架/01.Spring/01.Spring核心/32.SpringBoot之属性加载.md)
- [SpringBoot 之 Profile](13.框架/01.Spring/01.Spring核心/33.SpringBoot之Profile.md)

##### 数据

- [Spring 之数据源](13.框架/01.Spring/02.Spring数据/01.Spring之数据源.md)
- [Spring 之 JDBC](13.框架/01.Spring/02.Spring数据/02.Spring之JDBC.md)
- [Spring 之事务](13.框架/01.Spring/02.Spring数据/03.Spring之事务.md)
- [Spring 之 JPA](13.框架/01.Spring/02.Spring数据/04.Spring之JPA.md)
- [Spring 集成 Mybatis](13.框架/01.Spring/02.Spring数据/10.Spring集成Mybatis.md)
- [Spring 访问 Redis](13.框架/01.Spring/02.Spring数据/21.Spring访问Redis.md)
- [Spring 访问 MongoDB](13.框架/01.Spring/02.Spring数据/22.Spring访问MongoDB.md)
- [Spring 访问 Elasticsearch](13.框架/01.Spring/02.Spring数据/23.Spring访问Elasticsearch.md)

##### Web

- [Spring WebMvc](13.框架/01.Spring/03.SpringWeb/01.SpringWebMvc.md)
- [SpringBoot 之应用 EasyUI](13.框架/01.Spring/03.SpringWeb/21.SpringBoot之应用EasyUI.md)

##### IO

- [SpringBoot 之异步请求](13.框架/01.Spring/04.SpringIO/01.SpringBoot之异步请求.md)
- [SpringBoot 之 Json](13.框架/01.Spring/04.SpringIO/02.SpringBoot之Json.md)
- [SpringBoot 之邮件](13.框架/01.Spring/04.SpringIO/03.SpringBoot之邮件.md)

##### 集成

- [Spring 集成缓存中间件](13.框架/01.Spring/05.Spring集成/01.Spring集成缓存.md)
- [Spring 集成定时任务中间件](13.框架/01.Spring/05.Spring集成/02.Spring集成调度器.md)
- [Spring 集成 Dubbo](13.框架/01.Spring/05.Spring集成/03.Spring集成Dubbo.md)

##### 其他

- [Spring4 升级](13.框架/01.Spring/99.Spring其他/01.Spring4升级.md)
- [SpringBoot 之 banner](13.框架/01.Spring/99.Spring其他/21.SpringBoot之banner.md)
- [SpringBoot 之 Actuator](13.框架/01.Spring/99.Spring其他/22.SpringBoot之Actuator.md)

#### ORM

- [Mybatis 快速入门](13.框架/11.ORM/01.Mybatis快速入门.md)
- [Mybatis 原理](13.框架/11.ORM/02.Mybatis原理.md)

#### 安全

> Java 领域比较流行的安全框架就是 shiro 和 spring-security。
>
> shiro 更为简单、轻便，容易理解，能满足大多数基本安全场景下的需要。
>
> spring-security 功能更丰富，也比 shiro 更复杂。值得一提的是由于 spring-security 是 spring 团队开发，所以集成 spring 和 spring-boot 框架更容易。

- [Shiro](13.框架/12.安全/01.Shiro.md)
- [SpringSecurity](13.框架/12.安全/02.SpringSecurity.md)

#### IO

- [Shiro](13.框架/13.IO/01.Netty.md)

### Java 中间件

#### 缓存

> 缓存可以说是优化系统性能的第一手段，在各种技术中都会有缓存的应用。
>
> 如果想深入学习缓存，建议先了解一下 [缓存基本原理](https://dunwu.github.io/design/distributed/分布式缓存.html)，有助于理解缓存的特性、原理，使用缓存常见的问题及解决方案。

- [缓存面试题](14.中间件/02.缓存/01.缓存面试题.md)
- [Java 缓存中间件](14.中间件/02.缓存/02.Java缓存中间件.md)
- [Memcached 快速入门](14.中间件/02.缓存/03.Memcached.md)
- [Ehcache 快速入门](14.中间件/02.缓存/04.Ehcache.md)
- [Java 进程内缓存](14.中间件/02.缓存/05.Java进程内缓存.md)
- [Http 缓存](14.中间件/02.缓存/06.Http缓存.md)

#### 流量控制

- [Hystrix](14.中间件/03.流量控制/01.Hystrix.md)

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

- Java 经典书籍
  - [《Effective Java 中文版》](https://item.jd.com/12507084.html) - 本书介绍了在 Java 编程中 78 条极具实用价值的经验规则，这些经验规则涵盖了大多数开发人员每天所面临的问题的解决方案。同推荐《重构 : 改善既有代码的设计》、《代码整洁之道》、《代码大全》，有一定的内容重叠。
  - [《Java 并发编程实战》](https://item.jd.com/10922250.html) - 本书深入浅出地介绍了 Java 线程和并发，是一本完美的 Java 并发参考手册。
  - [《深入理解 Java 虚拟机》](https://item.jd.com/11252778.html) - 不去了解 JVM 的工程师，和咸鱼有什么区
  - [《Maven 实战》](https://item.jd.com/10476794.html) - 国内最权威的 Maven 专家的力作，唯一一本哦！
- 其他领域书籍
  - [《Redis 设计与实现》](https://item.jd.com/11486101.html) - 系统而全面地描述了 Redis 内部运行机制。图示丰富，描述清晰，并给出大量参考信息，是 NoSQL 数据库开发人员案头必备。
  - [《鸟哥的 Linux 私房菜 （基础学习篇）》](https://item.jd.com/12443890.html) - 本书是最具知名度的 Linux 入门书《鸟哥的 Linux 私房菜基础学习篇》的最新版，全面而详细地介绍了 Linux 操作系统。内容非常全面，建议挑选和自己实际工作相关度较高的，其他部分有需要再阅读。
  - [《Head First 设计模式》](https://item.jd.com/10100236.html) - 《Head First 设计模式》(中文版)共有 14 章，每章都介绍了几个设计模式，完整地涵盖了四人组版本全部 23 个设计模式。
  - [《HTTP 权威指南》](https://item.jd.com/11056556.html) - 本书尝试着将 HTTP 中一些互相关联且常被误解的规则梳理清楚，并编写了一系列基于各种主题的章节，对 HTTP 各方面的特性进行了介绍。纵观全书，对 HTTP“为什么”这样做进行了详细的解释，而不仅仅停留在它是“怎么做”的。
  - [《TCP/IP 详解 系列》](https://item.jd.com/11966296.html) - 完整而详细的 TCP/IP 协议指南。针对任何希望理解 TCP/IP 协议是如何实现的读者设计。
  - [《剑指 Offer：名企面试官精讲典型编程题》](https://item.jd.com/12163054.html) - 剖析了 80 个典型的编程面试题，系统整理基础知识、代码质量、解题思路、优化效率和综合能力这 5 个面试要点。

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾