---
title: ShardingSphere
date: 2020-10-08 20:30:30
categories:
  - 数据库
  - 数据库中间件
tags:
  - 数据库
  - 中间件
  - 分库分表
  - shardingsphere
permalink: /pages/b854a36a/
---

# ShardingSphere 简介

## 简介

shardingsphere-jdbc 定位为轻量级 Java 框架，在 Java 的 JDBC 层提供的额外服务。 它使用客户端直连数据库，以 jar 包形式提供服务，无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

- 适用于任何基于 JDBC 的 ORM 框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template 或直接使用 JDBC。
- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP 等。
- 支持任意实现 JDBC 规范的数据库，目前支持 MySQL，Oracle，SQLServer，PostgreSQL 以及任何遵循 SQL92 标准的数据库。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151213.png)

### ShardingSphere 组件

ShardingSphere 是一套开源的分布式数据库中间件解决方案组成的生态圈，它由 Sharding-JDBC、Sharding-Proxy 和 Sharding-Sidecar（计划中）这 3 款相互独立的产品组成。 他们均提供标准化的数据分片、分布式事务和数据库治理功能，可适用于如 Java 同构、异构语言、云原生等各种多样化的应用场景。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151613.png)

#### ShardingSphere-JDBC

定位为轻量级 Java 框架，在 Java 的 JDBC 层提供的额外服务。 它使用客户端直连数据库，以 jar 包形式提供服务，无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

- 适用于任何基于 JDBC 的 ORM 框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template 或直接使用 JDBC。
- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP 等。
- 支持任意实现 JDBC 规范的数据库，目前支持 MySQL，Oracle，SQLServer，PostgreSQL 以及任何遵循 SQL92 标准的数据库。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151213.png)

#### Sharding-Proxy

定位为透明化的数据库代理端，提供封装了数据库二进制协议的服务端版本，用于完成对异构语言的支持。 目前提供 MySQL 和 PostgreSQL 版本，它可以使用任何兼容 MySQL/PostgreSQL 协议的访问客户端(如：MySQL Command Client, MySQL Workbench, Navicat 等)操作数据，对 DBA 更加友好。

- 向应用程序完全透明，可直接当做 MySQL/PostgreSQL 使用。
- 适用于任何兼容 MySQL/PostgreSQL 协议的的客户端。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151434.png)

#### Sharding-Sidecar（TODO）

定位为 Kubernetes 的云原生数据库代理，以 Sidecar 的形式代理所有对数据库的访问。 通过无中心、零侵入的方案提供与数据库交互的的啮合层，即 `Database Mesh`，又可称数据库网格。

Database Mesh 的关注重点在于如何将分布式的数据访问应用与数据库有机串联起来，它更加关注的是交互，是将杂乱无章的应用与数据库之间的交互进行有效地梳理。 使用 Database Mesh，访问数据库的应用和数据库终将形成一个巨大的网格体系，应用和数据库只需在网格体系中对号入座即可，它们都是被啮合层所治理的对象。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151557.png)

| _Sharding-JDBC_ | _Sharding-Proxy_ | _Sharding-Sidecar_ |        |
| :-------------- | :--------------- | :----------------- | ------ |
| 数据库          | 任意             | MySQL              | MySQL  |
| 连接消耗数      | 高               | 低                 | 高     |
| 异构语言        | 仅 Java          | 任意               | 任意   |
| 性能            | 损耗低           | 损耗略高           | 损耗低 |
| 无中心化        | 是               | 否                 | 是     |
| 静态入口        | 无               | 有                 | 无     |

#### 混合架构

ShardingSphere-JDBC 采用无中心化架构，适用于 Java 开发的高性能的轻量级 OLTP 应用；ShardingSphere-Proxy 提供静态入口以及异构语言的支持，适用于 OLAP 应用以及对分片数据库进行管理和运维的场景。

Apache ShardingSphere 是多接入端共同组成的生态圈。 通过混合使用 ShardingSphere-JDBC 和 ShardingSphere-Proxy，并采用同一注册中心统一配置分片策略，能够灵活的搭建适用于各种场景的应用系统，使得架构师更加自由地调整适合与当前业务的最佳系统架构。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008151658.png)

### 功能列表

#### 数据分片

- 分库 & 分表
- 读写分离
- 分片策略定制化
- 无中心化分布式主键

#### 分布式事务

- 标准化事务接口
- XA 强一致事务
- 柔性事务

#### 数据库治理

- 分布式治理
- 弹性伸缩
- 可视化链路追踪
- 数据加密

## 快速入门

### 引入 maven 依赖

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc-core</artifactId>
    <version>${latest.release.version}</version>
</dependency>
```

注意：请将 `${latest.release.version}` 更改为实际的版本号。

### 规则配置

ShardingSphere-JDBC 可以通过 `Java`，`YAML`，`Spring 命名空间`和 `Spring Boot Starter` 这 4 种方式进行配置，开发者可根据场景选择适合的配置方式。 详情请参见[配置手册](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-jdbc/configuration/)。

### 创建数据源

通过 `ShardingSphereDataSourceFactory` 工厂和规则配置对象获取 `ShardingSphereDataSource`。 该对象实现自 JDBC 的标准 DataSource 接口，可用于原生 JDBC 开发，或使用 JPA, MyBatis 等 ORM 类库。

```java
DataSource dataSource = ShardingSphereDataSourceFactory.createDataSource(dataSourceMap, configurations, properties);
```

## 概念和功能

单一数据节点难于满足互联网的海量数据场景。

从性能方面来说，由于关系型数据库大多采用 B+ 树类型的索引，在数据量超过阈值的情况下，索引深度的增加也将使得磁盘访问的 IO 次数增加，进而导致查询性能的下降；同时，高并发访问请求也使得集中式数据库成为系统的最大瓶颈。

在传统的关系型数据库无法满足互联网场景需要的情况下，将数据存储至原生支持分布式的 NoSQL 的尝试越来越多。 但 NoSQL 对 SQL 的不兼容性以及生态圈的不完善，使得它们在与关系型数据库的博弈中始终无法完成致命一击，而关系型数据库的地位却依然不可撼动。

**数据分片**指**按照某个维度**将存放在单一数据库中的**数据分散地存放至多个数据库或表中**以达到提升性能瓶颈以及可用性的效果。数据分片的有效手段是对关系型数据库进行分库和分表。分库和分表均可以有效的避免由数据量超过可承受阈值而产生的查询瓶颈。 除此之外，分库还能够用于有效的分散对数据库单点的访问量；分表虽然无法缓解数据库压力，但却能够提供尽量将分布式事务转化为本地事务的可能，一旦涉及到跨库的更新操作，分布式事务往往会使问题变得复杂。 使用多主多从的分片方式，可以有效的避免数据单点，从而提升数据架构的可用性。

通过分库和分表进行数据的拆分来使得各个表的数据量保持在阈值以下，以及对流量进行疏导应对高访问量，是应对高并发和海量数据系统的有效手段。 数据分片的拆分方式又分为垂直分片和水平分片。

### 垂直分片

按照业务拆分的方式称为垂直分片，又称为纵向拆分，它的核心理念是专库专用。 在拆分之前，一个数据库由多个数据表构成，每个表对应着不同的业务。而拆分之后，则是按照业务将表进行归类，分布到不同的数据库中，从而将压力分散至不同的数据库。 下图展示了根据业务需要，将用户表和订单表垂直分片到不同的数据库的方案。

[![垂直分片](https://shardingsphere.apache.org/document/current/img/sharding/vertical_sharding.png)](https://shardingsphere.apache.org/document/current/img/sharding/vertical_sharding.png)

垂直分片往往需要对架构和设计进行调整。通常来讲，是来不及应对互联网业务需求快速变化的；而且，它也并无法真正的解决单点瓶颈。 垂直拆分可以缓解数据量和访问量带来的问题，但无法根治。如果垂直拆分之后，表中的数据量依然超过单节点所能承载的阈值，则需要水平分片来进一步处理。

### 水平分片

水平分片又称为横向拆分。 相对于垂直分片，它不再将数据根据业务逻辑分类，而是通过某个字段（或某几个字段），根据某种规则将数据分散至多个库或表中，每个分片仅包含数据的一部分。 例如：根据主键分片，偶数主键的记录放入 0 库（或表），奇数主键的记录放入 1 库（或表），如下图所示。

[![水平分片](https://shardingsphere.apache.org/document/current/img/sharding/horizontal_sharding.png)](https://shardingsphere.apache.org/document/current/img/sharding/horizontal_sharding.png)

水平分片从理论上突破了单机数据量处理的瓶颈，并且扩展相对自由，是分库分表的标准解决方案。

### 数据分片带来的问题

- **数据路由**：需要知道数据需要从哪个具体的数据库的分表中获取。
- **SQL 不兼容**：分表导致表名称的修改，或者分页、排序、聚合、分组等操作的不正确处理。
- **跨库事务**：合理采用分表，可以在降低单表数据量的情况下，尽量使用本地事务，善于使用同库不同表可有效避免分布式事务带来的麻烦。 在不能避免跨库事务的场景，有些业务仍然需要保持事务的一致性。 而基于 XA 的分布式事务由于在并发度高的场景中性能无法满足需要，并未被互联网巨头大规模使用，他们大多采用最终一致性的柔性事务代替强一致事务。

## ShardingSphere 内核剖析

ShardingSphere 的 3 个产品的数据分片主要流程是完全一致的。 核心由 `SQL 解析 => 执行器优化 => SQL 路由 => SQL 改写 => SQL 执行 => 结果归并`的流程组成。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20201008153551.png)

- QL 解析：分为词法解析和语法解析。 先通过词法解析器将 SQL 拆分为一个个不可再分的单词。再使用语法解析器对 SQL 进行理解，并最终提炼出解析上下文。 解析上下文包括表、选择项、排序项、分组项、聚合函数、分页信息、查询条件以及可能需要修改的占位符的标记。
- 执行器优化：合并和优化分片条件，如 OR 等。
- SQL 路由：根据解析上下文匹配用户配置的分片策略，并生成路由路径。目前支持分片路由和广播路由。
- SQL 改写：将 SQL 改写为在真实数据库中可以正确执行的语句。SQL 改写分为正确性改写和优化改写。
- SQL 执行：通过多线程执行器异步执行。
- 结果归并：将多个执行结果集归并以便于通过统一的 JDBC 接口输出。结果归并包括流式归并、内存归并和使用装饰模式的追加归并这几种方式。

### 解析引擎

#### 抽象语法树

解析过程分为**词法解析**和**语法解析**。 词法解析器用于将 SQL 拆解为不可再分的原子符号，称为 Token。并根据不同数据库方言所提供的字典，将其归类为关键字，表达式，字面量和操作符。 再使用语法解析器将 SQL 转换为抽象语法树。

例如，以下 SQL：

```sql
SELECT id, name FROM t_user WHERE status = 'ACTIVE' AND age > 18
```

解析之后的为抽象语法树见下图。

[![SQL抽象语法树](https://shardingsphere.apache.org/document/current/img/sharding/sql_ast.png)](https://shardingsphere.apache.org/document/current/img/sharding/sql_ast.png)

为了便于理解，抽象语法树中的关键字的 Token 用绿色表示，变量的 Token 用红色表示，灰色表示需要进一步拆分。

最后，通过对抽象语法树的遍历去提炼分片所需的上下文，并标记有可能需要改写的位置。 供分片使用的解析上下文包含查询选择项（Select Items）、表信息（Table）、分片条件（Sharding Condition）、自增主键信息（Auto increment Primary Key）、排序信息（Order By）、分组信息（Group By）以及分页信息（Limit、Rownum、Top）。 SQL 的一次解析过程是不可逆的，一个个 Token 按 SQL 原本的顺序依次进行解析，性能很高。 考虑到各种数据库 SQL 方言的异同，在解析模块提供了各类数据库的 SQL 方言字典。

#### SQL 解析引擎

SQL 解析作为分库分表类产品的核心，其性能和兼容性是最重要的衡量指标。 ShardingSphere 的 SQL 解析器经历了 3 代产品的更新迭代。

第一代 SQL 解析器为了追求性能与快速实现，在 1.4.x 之前的版本使用 Druid 作为 SQL 解析器。经实际测试，它的性能远超其它解析器。

第二代 SQL 解析器从 1.5.x 版本开始，ShardingSphere 采用完全自研的 SQL 解析引擎。 由于目的不同，ShardingSphere 并不需要将 SQL 转为一颗完全的抽象语法树，也无需通过访问器模式进行二次遍历。它采用对 SQL `半理解`的方式，仅提炼数据分片需要关注的上下文，因此 SQL 解析的性能和兼容性得到了进一步的提高。

第三代 SQL 解析器则从 3.0.x 版本开始，ShardingSphere 尝试使用 ANTLR 作为 SQL 解析的引擎，并计划根据 `DDL -> TCL -> DAL –> DCL -> DML –>DQL` 这个顺序，依次替换原有的解析引擎，目前仍处于替换迭代中。 使用 ANTLR 的原因是希望 ShardingSphere 的解析引擎能够更好的对 SQL 进行兼容。对于复杂的表达式、递归、子查询等语句，虽然 ShardingSphere 的分片核心并不关注，但是会影响对于 SQL 理解的友好度。 经过实例测试，ANTLR 解析 SQL 的性能比自研的 SQL 解析引擎慢 3-10 倍左右。为了弥补这一差距，ShardingSphere 将使用 `PreparedStatement` 的 SQL 解析的语法树放入缓存。 因此建议采用 `PreparedStatement` 这种 SQL 预编译的方式提升性能。

第三代 SQL 解析引擎的整体结构划分如下图所示。

[![解析引擎结构](https://shardingsphere.apache.org/document/current/img/sharding/parsing_architecture_cn.png)](https://shardingsphere.apache.org/document/current/img/sharding/parsing_architecture_cn.png)

###

## 参考资料

- [shardingsphere Github](https://github.com/apache/incubator-shardingsphere)
- [shardingsphere 官方文档](https://shardingsphere.apache.org/document/current/cn/overview/)
