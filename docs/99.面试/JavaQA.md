---
title: Java QA
date: 2025-09-13 23:04:28
categories:
  - 面试
tags:
  - QA
  - Java
permalink: /pages/66cfdbd4/
---

## JVM

### 什么是字节码？采用字节码的最大好处是什么？

字节码是可以在任何 JVM 平台上执行的，无关环境的中间代码。

采用字节码最大的好处是，Write Once, Running Anywhere

### 在什么情况下 Java 类会被加载？

- `new` 一个对象
- 访问某个类或接口的静态变量、静态方法
- 子类被初始化时，会先初始化父类
- 反射（Class.forName("xxx.Class")）

### JVM 的哪些内存区域可能会导致 OutOfMemoryError？

Java 虚拟机栈、本地方法栈 内存不足时，StackOverFlowError，一般由于类加载过多、方法嵌套、递归层级过深、过大容量数组。

堆：大对象、内存泄漏

Java7 永久代：方法区

Java8 元空间：直接内存

### Java 中的内存泄漏通常发生在哪些场景？

未释放的监听器

static 容器

本地缓存（ConcurrentHashMap、Guava、ThreadLocal）

各种连接池

未关闭的资源

### 请你介绍下 JVM 内存模型，分为哪些区域？各区域的作用是什么？

线程私有：程序计数器、虚拟机栈、本地方法栈

线程共享：堆（字符串常量池）、方法区（运行时常量池，JAVA7）

本地内存：元空间（运行时常量池，JAVA8）、直接内存

### 常见的垃圾回收算法有几种类型？他们对应的优缺点是什么？

标记-清除

标记-整理

复制

分代收集

## Java 基础

### JDK 和 JRE 和 JVM 分别是什么，有什么区别？

- JVM 是 Java 虚拟机
- JRE 是 Java 运行环境
- JDK 是 Java 开发工具包

```
JVM = ClassLoader + 运行时数据区 + 执行引擎（GC + 解释器 + JIT）
JRE = JVM + JavaLib
JDK = JRE + Java 开发、调试工具
```

### Java 和 C++、Go 语言的区别，各自的优缺点？

- Java 跨平台支持好、生态完善、支持 GC
- C++ 性能高、手动创建释放内存
- Go 并发能力强（轻量级线程）

### Java 中 final 关键字有什么用？

- 修饰类：不能被继承
- 修饰方法：不能被子类覆写
- 修饰变量：只能被赋值一次

### Java 中 hashCode 和 equals 方法是什么？它们与 == 操作符有什么区别？

- hashCode 方法返回对象的哈希值，常用于存储结构中快速比较对象是否相同。
- equals 方法比较对象内容是否相同，需自行实现逻辑。
- == 对于值类型比较的是字面值；对于引用类型，比较的是它们是否指向同一个对象（相同的内存地址）

Java 规定，**两个对象 `equals` 比较是相等的，则它们的 `hashCode` 比较也应该是相等的，反之则不一定**。

### 什么是反射机制？说说反射机制的优缺点、应用场景？

反射机制是指：在运行时动态的访问类、方法、字段信息，并支持动态操作它们。

反射常被用于动态代理、依赖注入、ORM

### String 和 StringBuffer、StringBuilder 的区别是什么？

String 和 StringBuffer、StringBuilder 是 Java 处理字符串的两类不同方式：String 不可变；StringBuffer、StringBuilder 可变。

StringBuilder 非并发安全；StringBuffer 是并发安全的，但性能也会差一些。

### 为什么 Java 中的 String 类被设计为 final？

String 为 final，字符串常量池才可以实现。

- **安全**：并发安全，类加载安全
- **性能**：作为 Map 的 key，String 为 final，才可以保证 hashcode 不变。所以 HashMap 才会将 hashcode 缓存，不需要重新计算。
- **避免混淆**：避免子类覆写父类方法，导致意想不到的结果

### Java 中的值传递是什么意思？

**Java 只支持值传递**。

- **值传递**：方法参数传递的是实参的副本
- **引用传递**：方法参数传递的是实参的地址；因此，修改形参会同步影响实参

### 什么是 Java 的反射机制？

反射是指在运行时能够动态地获取类的完整信息（如方法、字段、构造器等）并操作类对象（如创建实例、调用方法、访问字段） 的机制。

### 什么是 Java 的语法糖？如何提高开发效率？

语法糖并不提供新功能，而是通过语法支持更加简洁、高效的编程模式。如： Lambda、for-each、装箱、拆箱、try-with-resources

### Java 动态代理的原理是什么？

Java 动态代理的核心是 `InnvocationHandler` 和 `Proxy`。

其大概步骤是：

- 创建类实现 `InnvocationHandler`，在该类的 `invoke` 方法中定义逻辑。
- 通过 `Proxy.newProxyInstance` 动态创建代理对象。

### 你是否了解过新版本的 Java 特性？对 Java 未来的发展有什么看法？

### 什么是 BIO、NIO、AIO？

- BIO（阻塞式 IO）：InputStream、OutputStream；Reader、Writer；Socket、ServerSocket
- NIO（非阻塞式 IO）：Selector、Channel、Buffer——结合多路复用技术 select、poll、epoll
- AIO（异步 IO）

## Java 面向对象

### Java 访问修饰符 public、private、protected，以及无修饰符（默认）的区别

- `private` 只允许当前类可以访问。
- 无修饰只允许同一个包中的类访问。
- `protected` 只允许当前类、子类和同一个包中的类访问。
- `public` 允许任意类和对象访问。

### 什么是 Java 内部类？ 内部类的分类有哪些 ？内部类有哪些优点和应用场景？

内部类的分类：成员内部类、静态内部类、局部内部类、匿名内部类，它们的差异在于作用域不同。

内部类可以直接访问外部类的私有成员和方法（static 内部类只能访问 static 成员和方法）。

内部类的主要作用是：隐藏处理细节，方便的操作外部类的私有成员和方法，间接实现多重继承。

### Java 中的多态性是什么？如何理解？

- 编译时多态（静态多态）：方法重载（`Overload`）
- 运行时多态（动态多态）：方法覆写（`Override`）、向上转型

## Java 并发

### synchronized 关键字是什么，有什么作用？

### Java 中的乐观锁与悲观锁的区别和应用场景是什么？

乐观锁：适用于对响应时间敏感，并发冲突不激烈的场景

悲观锁：适用于并发冲突激烈的场景

### 什么是 Java 的线程池？如何提高并发性能？

### 什么是 Java 的 Hashtable、HashMap 和 TreeMap？它们有什么区别？

Hashtable synchronized 容器

HashMap 无序

TreeMap 字典序

### 你真的理解 AQS 原理了吗？

volatile int state，不同场景含义不一样，保证并发可见性和禁指定重排序，CAS setState

双链表 Node，thread 包装等待线程，未获取到锁的线程 CAS 插入队列

模板方法模式

- acquire -> tryAcquire -> 失败将线程包装为 Node，再 CAS 插入队列 -> LockSupport.park 阻塞线程
- release -> tryRelease -> LockSupport.unpark 唤醒线程
- acquireShared -> tryAcquireShared
- releaseShared -> tryReleaseShared

### 如何使用 Java 的 CompletableFuture 实现异步编排？

runAsync

supplyAsync

### Java 中 synchronized 的底层实现和锁的升降级机制是什么？

### Java 中 AtomicInteger 的实现原理是什么？如何使用 CAS？

volatile 修饰存储数值变量，保证并发可见性，禁指定重排

CAS 语义：if 现实值 == 预期值 then 将值设为更新值

CAS -> Unsafe.compareAndSwap -> CPU 原子指令

### 你了解哪些网关技术？请详细说明。

## MySQL

### 什么是 MySQL 回表？

回表：二级索引中的字段不能覆盖查询所需的所有字段，需要根据查询条件确定有哪些主键后，根据主键去聚簇索引获取所需数据的过程。

### 什么样的字段适合加索引？索引失效了解吗？

**适合加索引**：常出现于 `where`、`join`、`group by`、`order by` 的字段，应该酌情加索引。

**不适合加索引**：小表（1000行左右）、特大的表、频繁更新的列、低选择性的字段

**索引失效**：

- 函数、表达式、隐式类型转换
- 采用 or 条件且存在未设索引的条件字段
- 违反最左匹配原则

### 什么是数据库事务？讲一下事务的 ACID 特性？

事务保证一组操作要么都成功，要么都失败。

ACID

- Atomicity（原子性）
- Consistency（一致性）
- Isolation（隔离性）
- Durability（持久性）

### MySQL 中的日志类型有哪些？binlog、redo log 和 undo log 的作用和区别是什么？

日志类型：error log、slow query log、general query log、binlog、redo log、undo log

- binlog 是 MySQL 服务层的逻辑日志，采用追加写入。
- redo log 是 InnoDB 引擎的物理日志，采用循环写入。它是 MySQL 的 WAL 实现。
- binlog 和 redo log 的写入采用 2PC 方式，以保证可靠的持久化。
- undo log 是用于事务回滚的日志，它通过链式串联同一行记录的不同版本快照，使得同一行记录可以追溯历史版本。


### 什么是数据库的索引？索引的作用是什么？索引适用于哪些场景？

索引用于加速查询，类似于书本的目录。

索引适用于：

常出现于 where、join、order by、group by ，且选择性高的字段

### 如何在 MySQL 中进行数据备份？如何恢复半个月前的数据？

- 使用 mysqldump 工具备份，生成 SQL 脚本
- 使用 mysql 命令导入 SQL 脚本以恢复数据

### MySQL 事务的隔离级别有哪些？每个隔离级别的特点是什么？MySQL 默认的隔离级别是什么？

事务隔离级别：

- **读未提交**——存在脏读、不可重复读、幻读问题。
- **读已提交**——存在不可重复读、幻读问题。
- **可重复读**——存在幻读问题。
- **串行化**——无并发问题，但性能低下。

其他数据库默认的隔离级别通常是读已提交读；MySQL 默认的隔离级别是可重复读。

MySQL 默认的隔离级别是可重复读，是为了兼容 MySQL binlog statement 模式下，如果非可重复读级别，可能会丢数据。

### MySQL 中的意向锁是什么？作用是什么？它是表级锁还是行级锁？

简单而言，**意向锁的目的是为了快速判断表里是否有记录被加锁**。


InnoDB 支持不同粒度的锁定，允许行锁和表锁共存。**存在表级锁和行级锁时，必须先申请意向锁，再获取行级锁**。意向锁是表级锁，表示事务稍后需要对表中的行使用哪种类型的锁（共享或独享）。**意向锁是 InnoDB 自动添加的，不需要用户干预**。

意向锁有两种类型：

- **意向共享锁（`IS`）** - 表示事务有意向对表中的行设置共享锁（`S`）。

- **意向独享锁（`IX`）** - 表示事务有意向对表中的行设置独享锁（`X`）。

比如 `SELECT ... FOR SHARE` 设置 `IS` 锁， `SELECT ... FOR UPDATE` 设置 `IX` 锁。

意向锁的规则如下：

- 一个事务在获得某个数据行的共享锁（`S`）之前，必须先获得表的意向共享锁（`IS`）或者更强的锁；
- 一个事务在获得某个数据行的独享锁（`X`）之前，必须先获得表的意向独享锁（`IX`）。

也就是，当执行插入、更新、删除操作，需要先对表加上 `IX` 锁，然后对该记录加 `X` 锁。而快照读（普通的 `SELECT`）是不会加行级锁的，快照读是利用 MVCC 实现一致性读，是无锁的。

不过，`SELECT` 也是可以对记录加共享锁和独享锁的，具体方式如下：

```sql
-- 先在表上加上 IS 锁，然后对读取的记录加 S 锁
select ... lock in share mode;

-- 先在表上加上 IX 锁，然后对读取的记录加 X 锁
select ... for update;
```

**IX/IS 是表级锁，不会和行级的 X/S 发生冲突，而且意向锁之间也不会发生冲突，只会和共享表锁（`lock tables ... read`）和独享表锁（`lock tables ... write`）发生冲突**。

如果申请的锁与现有锁兼容，则锁申请成功；反之，则锁申请失败。锁申请失败的情况下，申请锁的事务会一直等待，直到存在冲突的锁被释放。如果存在与申请的锁相冲突的锁，并且该锁迟迟得不到释放，就会导致死锁。

### MySQL 中的覆盖索引和联合索引是什么？索引的最左前缀匹配原则是什么？

覆盖索引：二级索引的存储字段覆盖了查询所需返回的全部字段，因而无需回表。

联合索引：多个字段组合的索引。

最左前缀匹配原则：组合索引从最左列字段开始，逐一匹配索引字段，遇到范围查询的字段，则后续匹配不再适用索引。

MySQL 针对组合索引部分命中的情况，支持了一种叫索引下推的技术优化：将部分命中条件下推到引擎层，以减少扫描行数。

### 什么是 MySQL 的执行计划？如何获取执行计划并对其进行分析？

执行计划是 MySQL 基于表结构和数据状况，选择其认为的最优解查询方式。

其语法为：`explain select ...`

执行计划关键信息：

- type：类型。按照执行效率，依次为：`system > const > eq_ref > ref > range > index > ALL`
- possible_keys：可选的索引
- key：选择的索引
- rows：预估扫描行数
- extra：扩展信息：using index（使用索引排序）、using filesort（需要排序）、using temporay（使用临时表）

一般会根据执行计划关键信息，具体分析，针对性着手优化。

### MySQL 支持哪些存储引擎？默认使用哪个？MyISAM 和 InnoDB 引擎有什么区别，如何选择？

支持的引擎：

- InnoDB（默认引擎）：支持事务、行级锁、外键
- MyISAM：不支持事务、行级锁、外键；表维护了计数器
- Memory
- CSV
- Archieve
- Cluster NDB

## Redis

### Redis 中的三种高效缓存读写策略是什么？

- Cache Aside：读（命中返回，不命中回源 DB）；写（先更新 DB，再删除 Cache）
- Read/Write Through: 依赖代理中间件控制缓存同步
- Write Behind：应用先写缓存，延迟落盘到 DB

### Redis 的五种基本数据类型及其优化技巧是什么？

- String: sds
- List: ziplist/listpack、linkedlist
- Hash：ziplist/listpack、hashtable
- Set：intset、hashtable
- ZSet：ziplist/listpack、skiplist + hashtable

### Redis 中的跳表是什么？你了解多少？

底层是双链表存储全量数据，在其之上设置多层随机索引。所谓随机，是指，数值插入时，随机判断在对应索引层级是否创建索引。

其查询效率、写入效率均为 O log N

### Redis 是什么？Redis 的特点和常见应用场景有哪些？

Redis 是分布式 KV 数据库

常见应用场景：

- String：缓存、分布式ID、分布式锁、分布式Session、计数器
- Hash：购物车、字典
- List：输入自动补全、简易队列
- Set：简单聚合、去重集合、点赞、共同好友
- Zset：排行榜

### Redis 的单线程模型是什么？IO 多路复用是什么？

实际上是 DB 读写为单线程，IO 操作采用多路复用。

Redis 6.0 后 IO 改为多线程。

### Redis 基础类型中的 String 底层实现是什么？

String 底层采用 SDS。

SDS 是 Redis 自实现的简单动态字符串，其优化点为：

- 动态扩真、申请内存
- 维护字符串长度计数器
- 自动处理 C 字符串 ‘\0’ 字符

### 如何使用 Redis 实现一个排行榜？

使用 zset 数据类型

zadd key member score 添加榜单数据

zscore 查分值

zrangebyscore 从小到大排序

zrevrangebyscore 从大到小排序

### Redis 的持久化机制有哪些？它们的优缺点和应用场景是什么？

RDB：生成数据快照文件。三种生成触发方式：

- SAVE：阻塞执行
- BGSAVE：fork 子进程后台执行
- save 900 1（可配置多个，自动触发 BGSAVE）

AOF：追加写入写命令到日志文件。

AOF 原理：Redis 将写命令先写入 AOF 缓冲区，然后根据 appendfsync 配置的刷盘策略（no：由系统控制；everysec：每秒刷新，默认；always：每次刷新），将缓冲区数据写入 AOF。

AOF rewrite 机制：为防止日志持续膨胀，支持 rewrite 压缩日志机制。其原理为采用 CoW 机制，基于数据库数据，生成对应 AOF 命令，写入新文件；完成后，将过程中的增量写命令补写入新文件；最后，完成新旧 AOF 文件替换。

### 如何用 Redis 实现分布式 Session？

用户登录后，将用户认证、身份信息，统一维护在 Redis String 或 Hash 类型中。

不同服务节点，不同服务连接相同 Redis，对 Session 进行读写。

### Redis 的内存淘汰机制是什么？有哪些内存淘汰策略？

- noeviction
- volatile-random
- volatile-lru
- volatile-lfu
- allkeys-random
- allkeys-lru
- allkeys-lfu

### Redis 中有哪些数据类型？基础数据结构有几种？有哪些高级数据结构？

- string：sds
- hash：ziplist/listpack、hashtable
- list：ziplist/listpack、linkedlist
- set：intset、hashtable
- zset：ziplist/listpack、skiplist+hashtable
- bitmap
- heperloglog
- geo

### 如何使用 Redis 实现分布式锁？

set nx ex

nx保证不存在才写入

ex设置超时时间，防死锁

一条命令实现，保证是原子操作

### 如何使用 Redis 的 HyperLogLog 统计页面 UV？

## Java 框架 - Spring

### 什么是 Spring 的 IOC 和 AOP？

IoC 即依赖倒置，其目标是延迟对象初始化，由 Spring 容器控制 Bean 的创建、销毁，以及 Bean 注入。其目标是实现对象依赖关系的解耦。

AOIP 即面向切面编程，通过预设切点，拦截访问切点的事件或请求，对其进行事前、事后的织入操作。

AOP 基于动态代理实现：动态代理有 JDK 动态代理（反射）、CGLIB 动态代理（字节码增强）两种模式。

### 什么是 Spring 的事务管理？

Spring 支持声明式、编程式、注解式定义事务。

Spring 事务定义的属性有：

- **隔离级别**：`DEFAULT`（使用数据库默认），`READ_COMMITTED`，`REPEATABLE_READ` 等
- **传播行为**：`REQUIRED`（默认），`REQUIRES_NEW`，`NESTED`，`SUPPORTS` 等
- **回滚规则**：指定哪些异常触发回滚
- **是否只读**
- **事务超时**

### Spring 框架是什么？使用 Spring 框架有哪些好处？

Java 企业级应用开发框架

Spring 框架提供 IoC 和 AOP 特性，并集成各种主流技术，降低接入门槛。

### Spring 的两大核心概念是什么？简单讲一下你对它们的理解

IoC，控制反转

AOP，面向切面编程

### 什么是 IOC，简单讲一下 Spring IOC 的实现机制？

BeanFactory，ApplicationContext 是 Spring IoC 的具体实现。

由 Spring 容器控制 Bean 的生命周期

### 什么是 Spring 的依赖注入，依赖注入的基本原则以及好处？

### 什么是 AOP？有哪些实现 AOP 的方式？Spring AOP 和 AspectJ AOP 有什么区别？

### Spring 框架中都用到了哪些设计模式？

- 创建型
  - 单例模式：创建 scope 为单例的 Bean。
  - 工厂方法模式：BeanFatory
- 行为型
  - 职责链模式：Inceptor 拦截器
  - 适配器模式：HandleAdapter
  - 模板方法模式：各种 XXXTemplate

### Spring、SpringMVC、SpringBoot 三者之间是什么关系？

Spring 是一个应用级框架。

Spring MVC 是 Spring 一个子模块，主要支持 Web 领域的开发。

Spring Boot 是基于 Spring 框架，支持各种自动化默认配置，节省接入成本。其设计理念是：约定由于配置。

### 有哪些注解可以注入 Bean？@Autowired 和 @Resource 的区别？

- `@Autowired` 根据类型注入
- `@Resource` 根据 Bean 名称注入
- `@Inject`
- `@Value`：注入值

### Spring 中的 BeanFactory 和 ApplicationContext 有什么区别和联系？

ApplicationContext 是 BeanFactory 的扩展，支持 AOP、国际化等能力。

### 讲一讲 Spring 框架中 Bean 的生命周期？

### Spring 支持哪几种事务管理类型，Spring 的事务实现方式和实现原理是？

- 声明式事务
- 编程式事务
- 注解式事务

## 操作系统

### 什么是进程和线程？它们有哪些区别和联系？

进程是正在运行的程序，其占用系统资源是独立的。

线程是系统调度的最小单位，其使用系统资源是共享的。

### 死锁是什么？如何预防和避免死锁？

互斥

占有并等待

不可强占

循环依赖

### 线程间有哪些通信方式？

共享内存

MQ

RPC

锁

管程（synchronized）

信号量

### 什么是零拷贝？说一说你对零拷贝的理解？

零拷贝的关键在于**让操作系统内核直接完成数据的传输工作，绕过应用程序的缓冲区**，避免了数据在**内核空间（Kernel Space）** 和 **用户空间（User Space）** 之间来回拷贝的巨大开销。

### 并发和并行有什么区别？同步和异步有什么区别？

- 并行是同时处理多项任务；并发是同一时段处理多项任务。并行和并发的例子：正在吃饭，电话来了，一边吃饭，一边电话，这是并行；正在吃饭，电话来了，先接电话，再吃饭，这是并发。
- 同步、阻塞的例子：发完短消息，啥也不干，等着对方回复。
- 异步、非阻塞的例子：发完短消息，去做其他事，收到消息提醒，再查看回复。

## 分布式

### 什么是分布式？为什么需要分布式？

分布式顾名思义，将系统拆分成多个节点甚至是不同模块、系统，分别独立部署，一起协同工作。

### 什么是网关，网关有哪些作用？

认证、授权、审计、风控

流控、负载均衡、服务路由

流量清洗、封禁 IP、黑白名单

### 什么是分布式的 CAP 理论？

一致性、可用性、分区容错性三者不可兼得。

### 什么是分布式的 BASE 理论，它与 CAP 理论有什么联系？

Basic Availability（基本可用）

Soft State（软状态）

Eventually Consistency（最终一致性）

### 什么是消息队列？消息队列有哪些应用场景？

MQ 是一种异步通信机制。

MQ 应用场景：

- 异步通信
- 系统解耦
- 削峰填谷
- 数据采集

### 有哪些主流的消息队列，它们分别有什么优缺点、各自的适用场景是什么？

- Kafka

- RocketMQ

- RabbitMQ


### 有哪些常见的消息队列模型？分别适用于什么场景？

P2P

发布订阅模型

广播明星

## 微服务

### Dubbo 是什么？是否了解过它的架构设计？

Dubbo 是一个 RPC 框架。

其核心架构是 provider/consuemr/registry/monitor

其采用封层架构，并使用可插拔设计，通过 SPI 计数，使得每个关键组件都可以进行外部定制替换

### 什么是云原生？它有哪些优缺点？

### 什么是 RPC？目前有哪些常见的 RPC 框架？实现 RPC 框架的核心原理是什么？

远程过程调用

常见 RPC 框架：Dubbo、Thrift、gRPC、Eureka

核心原理：序列化、协议、通信、反射+动态代理、压缩

服务注册发现、负载均衡、服务路由、重试容错、健康检查、流量控制

SPI、时间轮、线程模型、优雅启停、流量回放

### 什么是注册中心？如何实现一个注册中心？

注册中心是 RPC Provider 和 Consumer 的中介。

实现注册中心至少需要实现以下 API：

服务注册

服务订阅

拉取服务提供者地址

服务变更通知

服务心跳

## DevOps

### Nginx 是什么？它有哪些应用场景？

Nginx 是一种高性能的服务器、反向代理服务器。

用于反向代理、负载均衡、网关。

### 什么是正向代理和反向代理，如何使用 Nginx 做反向代理？

配置 domain、upstream

domain 配置将域名请求，根据 context 映射到不同 upstream

在 upstream 中配置反向映射的 IP+端口，并设置负载均衡、重试规则

### 如何用 Nginx 做限流，有几种限流算法，分别如何实现？

### 什么是 Git 的 fork 命令？它和 clone 命令有什么区别？

创建一个新的工程空间

### 什么是 Git 的 cherry-pick？

单独将某一次提交合入其他分支

### Linux 中的硬链接和软连接是什么，二者有什么区别？

### CC 攻击是什么？什么叫 DDOS 攻击？什么是网站数据库注入？

### 如何在 Linux 中查看系统资源使用情况？比如内存、CPU、网络端口。

- top 查资源占用排名

- free 查内存占用

- df 查磁盘占用

- iostat 查 IO

- netstat 查网络

- ping、traceroute 查网络链路


## 设计

### 设计模式是什么？为什么要学习和使用设计模式？

工程最佳实践，编程范式。

### 什么是单例模式？使用单例模式有什么好处？有哪些常用的单例模式实现方式？各自的应用场景是什么？

- **饿汉式**
- **懒汉式**

- **双重锁**

### 设计模式可以分为哪几类？一共有多少种主流的设计模式？

一共有 23 种主流设计模式

- **创建型**：单例模式、原型模式、工厂方法模式、抽象工厂模式、建造者模式
- **结构型**：适配器模式、组合模式、状态模式、桥接模式、外观模式、迭代器模式、装饰器模式、享元模式
- **行为型**：职责链模式、策略模式、命令模式、模板方法模式、观察者模式、访问者模式、代理模式、中介模式、备忘录模式、解释器模式

### 什么是工厂模式？使用工厂模式有什么好处？工厂模式有哪些分类？各自的应用场景是什么？

工厂模式可以延迟初始化

### 如何设计一个点赞系统？

使用 redis set，支持去重

### 如何在 10 亿个数据中找到最大的 1 万个？

构建容量大小为 1 万的堆，每次从 10 亿数据中读 1 万条数据，写入最小堆，循环直至读完所有数据。最终，还留存在最小堆中的数据就是 TOP 10000

### 有几台机器存储着几亿的淘宝搜索日志，假设你只有一台 2g 的电脑，如何选出搜索热度最高的十个关键词？

## 网络

### TCP 的三次握手和四次挥手

三次握手

```
Client -> Server: SYN, seq=x
Client <- Server: SYN, ACK, seq=y, ack=x+1
Client -> Server: ACK, ack=y+1
```

四次挥手

```
Client -> Server: FIN, seq=x
Client <- Server: ACK, ack=x+1
Client <- Server: FIN, seq=y
Client -> Server: ACK, ack=y+1
```

### HTTPS 的加密过程了解吗？

网络协议中最后字符是 S 的协议表示其是加密协议。

加密协议一般采用 SSL/TLS 协议。SSL/TLS 的核心是非对称加密。

- 公钥：加密、认证
- 私钥：解密、签名

SSL/TLS 的原理：

Client 从站点下载证书，并从中获取公钥

发送请求时，用公钥对内容进行数字签名

服务端根据公钥匹配的撕咬进行数字签名验证，以判断请求是原报文，未被篡改

### 面试官：TCP 的半包和粘包了解多少？详细介绍下。。

### 面试官：常见的网络攻击手段有哪些？解决方案了解吗？

泛洪攻击：网关流量清洗、黑白名单、封禁 IP

XSS：输入转义处理

SQL 注入：参数

CSRF：Http ReadOnly

### 简述计算机网络七层模型和各自的作用？

- 应用层
- 表示层
- 会话层
- 传输层

- 网络层

- 数据链路层

- 物理层


### HTTP 是哪一层的协议？简述它的作用？

HTTP 是应用层协议，主要用于 Web 数据传输。

### TCP 和 UDP 协议有什么区别，分别适用于什么场景？

TCP 是面向连接的协议，保证可靠传输。通过三次握手、四次挥手，建立可靠双向链路。

UDP 是无连接的协议，只尽力传输，不保证可靠。允许一定程度的丢包，适合实时性高，传输量的场景。如视频直播、在线聊天等。

### HTTP 协议中 GET 和 POST 有什么区别？分别适用于什么场景？

GET 一般将请求参数以键值对方式拼接在 URL 后；GET 请求的 URL 有长度限制。

POST 将请求参数放在 body 消息体中传输。

### 简述 TCP 三次握手、四次挥手的流程？为什么需要三次握手？为什么需要四次挥手？

## 参考资料

- [面试鸭 Java 后端面试题](https://www.mianshiya.com/bank/1776477775448772610?current=1&pageSize=20)
- [后端经典面试题合集](https://www.mianshiya.com/bank/1772565012490067970?current=1&pageSize=20&mark=3)