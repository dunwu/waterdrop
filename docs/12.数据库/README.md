---
title: 数据库
date: 2022-02-22 21:01:01
categories:
  - 数据库
tags:
  - 数据库
permalink: /pages/23fe4586/
hidden: true
index: false
---

<p align="center">
    <a href="https://dunwu.github.io/db-tutorial/" target="_blank" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/dunwu/images/master/common/dunwu-logo.png" alt="logo" width="150px"/>
    </a>
</p>

<p align="center">

  <a href="https://github.com/dunwu/db-tutorial">
      <img alt="star" class="no-zoom" src="https://img.shields.io/github/stars/dunwu/db-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/db-tutorial">
      <img alt="fork" class="no-zoom" src="https://img.shields.io/github/forks/dunwu/db-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/db-tutorial/commits/master">
      <img alt="build" class="no-zoom" src="https://img.shields.io/github/actions/workflow/status/dunwu/db-tutorial/deploy.yml?style=for-the-badge">
  </a>

  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
      <img alt="code style" class="no-zoom" src="https://img.shields.io/github/license/dunwu/db-tutorial?style=for-the-badge">
  </a>

</p>

<h1 align="center">DB-TUTORIAL</h1>

> 💾 **db-tutorial** 是一个数据库教程。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/db-tutorial/) | [Gitee](https://gitee.com/turnon/db-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/db-tutorial/) | [Gitee Pages](https://turnon.gitee.io/db-tutorial/)

## 目录

### 数据库综合

- [Nosql 技术选型](数据库综合/Nosql技术选型.md) - 关键词：`NoSQL`、`列式数据库`、`K-V数据库`、`文档数据库`、`图数据库`、`全文搜索引擎`、`ACID`、`技术选型`
- [数据结构与数据库索引](数据库综合/数据结构与数据库索引.md) - 关键词：`B+树`、`LSM树`、`倒排索引`、`哈希索引`、`聚簇索引`、`数组`、`链表`、`磁盘I/O`

### 数据库中间件

- [ShardingSphere](数据库中间件/ShardingSphere.md) - 关键词：`ShardingSphere`、`分库分表`、`数据分片`、`读写分离`、`分布式事务`、`SQL解析`、`Sharding-JDBC`、`Sharding-Proxy`
- [Flyway](数据库中间件/Flyway.md) - 关键词：`Flyway`、`数据迁移`、`Migration`、`版本管理`、`Schema`、`DDL`、`CI/CD`、`Callbacks`

### 关系型数据库

> [关系型数据库](关系型数据库) 整理主流关系型数据库知识点。

- [关系数据库简介](关系型数据库/关系数据库简介.md) - 关键词：`关系型数据库`、`SQL`、`范式`、`ER图`、`函数依赖`、`数据模型`、`主键`、`反范式`
- [SQL](关系型数据库/SQL.md) - 关键词：`SQL`、`CRUD`、`JOIN`、`事务`、`索引`、`存储过程`、`触发器`、`DDL`
- [PostgreSQL](关系型数据库/PostgreSQL.md) - 关键词：`PostgreSQL`、`psql`、`RDBMS`、`数据库安装`、`SQL`、`备份恢复`、`用户管理`
- [H2](关系型数据库/H2.md) - 关键词：`H2`、`嵌入式数据库`、`内存模式`、`JDBC`、`兼容模式`、`Spring`、`集群`、`单元测试`
- [SqLite](关系型数据库/SqLite.md) - 关键词：`SQLite`、`嵌入式`、`轻量级`、`无服务器`、`动态类型`、`ACID`、`亲和类型`、`跨平台`

#### [MySQL](关系型数据库/MySQL)

- [MySQL 概述](关系型数据库/MySQL/[MySQL]概述.md) - 关键词：`MySQL`、`关系型数据库`、`RDBMS`、`InnoDB`、`存储引擎`、`OLTP`、`OLAP`、`DBMS`
- [MySQL 建模](关系型数据库/MySQL/[MySQL]建模.md) - 关键词：`数据类型`、`VARCHAR`、`CHAR`、`DECIMAL`、`BIGINT`、`DATETIME`、`TIMESTAMP`、`utf8mb4`
- [MySQL CRUD](关系型数据库/MySQL/[MySQL]CRUD.md) - 关键词：`CRUD`、`DDL`、`INSERT`、`SELECT`、`UPDATE`、`DELETE`、`约束`、`索引管理`
- [MySQL 存储](关系型数据库/MySQL/[MySQL]存储.md) - 关键词：`InnoDB`、`MyISAM`、`存储引擎`、`Buffer Pool`、`聚簇索引`、`Change Buffer`、`表空间`、`redo log`
- [MySQL 索引](关系型数据库/MySQL/[MySQL]索引.md) - 关键词：`B+Tree索引`、`聚簇索引`、`覆盖索引`、`最左匹配`、`Hash索引`、`前缀索引`、`联合索引`、`索引失效`
- [MySQL 事务](关系型数据库/MySQL/[MySQL]事务.md) - 关键词：`ACID`、`MVCC`、`事务隔离级别`、`可重复读`、`ReadView`、`UndoLog`、`幻读`、`分布式事务`
- [MySQL 锁](关系型数据库/MySQL/[MySQL]锁.md) - 关键词：`行锁`、`间隙锁`、`Next-Key Lock`、`死锁`、`悲观锁`、`乐观锁`、`共享锁`、`独享锁`
- [MySQL 复制](关系型数据库/MySQL/[MySQL]复制.md) - 关键词：`主从复制`、`binlog`、`读写分离`、`relay log`、`主备配置`、`数据同步`、`高可用`、`slave`
- [MySQL 架构](关系型数据库/MySQL/[MySQL]架构.md) - 关键词：`Server层`、`存储引擎`、`redo log`、`binlog`、`WAL`、`两阶段提交`、`优化器`、`执行器`
- [MySQL 优化](关系型数据库/MySQL/[MySQL]优化.md) - 关键词：`EXPLAIN`、`慢查询`、`索引优化`、`SQL优化`、`覆盖索引`、`分页优化`、`JOIN优化`、`执行计划`
- [MySQL 运维](关系型数据库/MySQL/[MySQL]运维.md) - 关键词：`mysqldump`、`用户管理`、`主从部署`、`my.cnf`、`慢查询`、`max_connections`、`Buffer Pool`、`备份恢复`
- [MySQL 面试](关系型数据库/MySQL/[MySQL]面试.md) 💯
- [MySQL 面试之索引篇](关系型数据库/MySQL/[MySQL]面试之索引篇.md) 💯
- [MySQL 面试之事务和锁篇](关系型数据库/MySQL/[MySQL]面试之事务和锁篇.md) 💯

### 文档数据库

#### MongoDB

> MongoDB 是一个基于文档的分布式数据库，由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。
>
> MongoDB 是一个介于关系型数据库和非关系型数据库之间的产品。它是非关系数据库当中功能最丰富，最像关系数据库的。它支持的数据结构非常松散，是类似 json 的 bson 格式，因此可以存储比较复杂的数据类型。
>
> MongoDB 最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

- [MongoDB 概述](文档数据库/MongoDB/[MongoDB]概述.md) - 关键词：`BSON`、`文档模型`、`NoSQL`、`面向文档`、`集合`、`副本集`、`分片`、`无模式`
- [MongoDB CRUD](文档数据库/MongoDB/[MongoDB]CRUD.md) - 关键词：`insertOne`、`find`、`updateOne`、`deleteOne`、`bulkWrite`、`upsert`、`原子性`、`ObjectId`
- [MongoDB 聚合](文档数据库/MongoDB/[MongoDB]聚合.md) - 关键词：`聚合管道`、`$match`、`$group`、`$project`、`Map-Reduce`、`$lookup`、`管道优化`、`$sort`
- [MongoDB 索引](文档数据库/MongoDB/[MongoDB]索引.md) - 关键词：`B-tree`、`复合索引`、`多键索引`、`文本索引`、`地理空间索引`、`ESR规则`、`createIndex`、`查询性能`
- [MongoDB 事务](文档数据库/MongoDB/[MongoDB]事务.md) - 关键词：`ACID事务`、`多文档事务`、`读关注`、`写关注`、`分布式事务`、`快照隔离`、`majority`、`ClientSession`
- [MongoDB 建模](文档数据库/MongoDB/[MongoDB]建模.md) - 关键词：`嵌入式文档`、`引用式`、`一对多关系`、`树形结构`、`实体化路径`、`子集模式`、`反规范化`、`文档大小`
- [MongoDB 复制](文档数据库/MongoDB/[MongoDB]复制.md) - 关键词：`副本集`、`主节点`、`从节点`、`oplog`、`故障转移`、`读取偏好`、`仲裁节点`、`复制延迟`
- [MongoDB 分片](文档数据库/MongoDB/[MongoDB]分片.md) - 关键词：`分片键`、`mongos`、`配置服务器`、`哈希分片`、`范围分片`、`负载均衡`、`chunk`、`区域`
- [MongoDB 运维](文档数据库/MongoDB/[MongoDB]运维.md) - 关键词：`mongodump`、`mongorestore`、`mongoimport`、`mongoexport`、`WiredTiger`、`认证`、`profiling`、`mongod`
- [MongoDB 面试](文档数据库/MongoDB/[MongoDB]面试.md) 💯

### KV 数据库

#### [Redis](KV数据库/Redis)

- [Redis 基本数据类型](KV数据库/Redis/[Redis]数据类型.md) - 关键词：`String`、`Hash`、`List`、`Set`、`Zset`
- [Redis 高级数据类型](KV数据库/Redis/[Redis]数据类型二.md) - 关键词：`BitMap`、`HyperLogLog`、`Geo`、`Stream`
- [Redis 数据结构](KV数据库/Redis/[Redis]数据结构.md) - 关键词：`对象`、`SDS`、`链表`、`字典`、`跳表`、`整数集合`、`压缩列表`
- [Redis 内存管理](KV数据库/Redis/[Redis]内存管理.md) - 关键词：`定时删除`、`惰性删除`、`定期删除`、`LRU`、`LFU`
- [Redis 持久化](KV数据库/Redis/[Redis]持久化.md) - 关键词：`RDB`、`AOF`、`SAVE`、`BGSAVE`、`appendfsync`
- [Redis 事件](KV数据库/Redis/[Redis]事件.md) - 关键词：`文件事件`、`时间事件`
- [Redis 复制](KV数据库/Redis/[Redis]复制.md) - 关键词：`SLAVEOF`、`SYNC`、`PSYNC`、`命令传播`、`心跳`
- [Redis 哨兵](KV数据库/Redis/[Redis]哨兵.md) - 关键词：`高可用`、`监控`、`选主`、`故障转移`、`Raft`
- [Redis 集群](KV数据库/Redis/[Redis]集群.md) - 关键词：`高可用`、`监控`、`选主`、`故障转移`、`分区`、`Raft`、`Gossip`
- [Redis 订阅](KV数据库/Redis/[Redis]订阅.md) - 关键词：`订阅`、`SUBSCRIBE`、`PSUBSCRIBE`、`PUBLISH`、`观察者模式`
- [Redis 独立功能](KV数据库/Redis/[Redis]事务.md) - 关键词：`事务`、`ACID`、`MULTI`、`EXEC`、`DISCARD`、`WATCH`
- [Redis 管道](KV数据库/Redis/[Redis]管道.md) - 关键词：`Pipeline`
- [Redis 脚本](KV数据库/Redis/[Redis]脚本.md) - 关键词：`Lua`
- [Redis 运维](KV数据库/Redis/[Redis]运维.md) - 关键词：`安装`、`配置`、`命令`、`集群`、`客户端`
- [Redis 实战](KV数据库/Redis/[Redis]实战.md) - 关键词：`缓存`、`分布式锁`、`布隆过滤器`
- [Redis 面试](KV数据库/Redis/[Redis]面试.md) 💯
- [Redis 面试之应用篇](KV数据库/Redis/[Redis]面试之应用篇.md) 💯

#### [Memcached](KV数据库/Memcached.md)

### 列式数据库

#### HBase

- [HBase 快速入门](列式数据库/HBase/[HBase]快速入门.md) - 关键词：`HDFS`、`列式数据库`、`Row Key`、`Column Family`、`Cell`、`随机访问`、`Bigtable`、`Hadoop`
- [HBase 数据模型](列式数据库/HBase/[HBase]数据模型.md) - 关键词：`Row Key`、`Column Family`、`Column Qualifier`、`Region`、`Timestamp`、`多版本`、`字典序`、`稀疏性`
- [HBase Schema 设计](列式数据库/HBase/[HBase]Schema.md) - 关键词：`Row Key设计`、`热点问题`、`加盐`、`哈希`、`反转`、`Column Family`、`TTL`、`Version`
- [HBase 架构](列式数据库/HBase/[HBase]架构.md) - 关键词：`Region`、`RegionServer`、`Master`、`WAL`、`MemStore`、`HFile`、`ZooKeeper`、`Compaction`
- [HBase Java API 基础特性](列式数据库/HBase/[HBase]API基础特性.md) - 关键词：`HBaseClient`、`Connection`、`Table`、`Put`、`Get`、`Scan`、`Delete`、`ResultScanner`
- [HBase Java API 高级特性](列式数据库/HBase/[HBase]API高级特性.md) - 关键词：`计数器`、`incr`、`CAS`、`原子操作`、`BulkLoad`、`Coprocessor`、`RegionServer`、`RPC`
- [HBase Java API 高级特性之过滤器](列式数据库/HBase/[HBase]API高级特性之过滤器.md) - 关键词：`Filter`、`CompareFilter`、`RowFilter`、`ValueFilter`、`SingleColumnValueFilter`、`FilterList`、`谓词下推`、`PageFilter`
- [HBase Java API 高级特性之协处理器](列式数据库/HBase/[HBase]API高级特性之协处理器.md) - 关键词：`Coprocessor`、`Observer`、`Endpoint`、`二级索引`、`RegionServer`、`服务端计算`、`权限控制`、`数据聚合`
- [HBase 运维](列式数据库/HBase/[HBase]运维.md) - 关键词：`hbase-site.xml`、`RegionServer`、`分布式部署`、`ZooKeeper`、`HDFS`、`Compaction`、`MemStore`、`集群配置`
- [HBase 命令](列式数据库/HBase/[HBase]命令.md) - 关键词：`HBase Shell`、`create`、`put`、`scan`、`get`、`delete`、`disable`、`drop`
- [HBase 面试](列式数据库/HBase/[HBase]面试.md) 💯

### 搜索引擎数据库

#### Elasticsearch

> Elasticsearch 是一个基于 Lucene 的搜索和数据分析工具，它提供了一个分布式服务。Elasticsearch 是遵从 Apache 开源条款的一款开源产品，是当前主流的企业级搜索引擎。

- [Elasticsearch 概述](搜索引擎数据库/Elasticsearch/[Elasticsearch]概述.md) - 关键词：`Lucene`、`倒排索引`、`分布式`、`全文搜索`、`Elastic Stack`、`Logstash`、`Kibana`、`近实时`
- [Elasticsearch 建模](搜索引擎数据库/Elasticsearch/[Elasticsearch]建模.md) - 关键词：`Mapping`、`动态映射`、`静态映射`、`数据类型`、`动态模板`、`运行时字段`、`嵌套类型`、`元数据字段`
- [Elasticsearch CRUD](搜索引擎数据库/Elasticsearch/[Elasticsearch]CRUD.md) - 关键词：`Index API`、`Bulk API`、`Update API`、`Delete API`、`Multi Get`、`文档版本控制`、`批量操作`、`Refresh策略`
- [Elasticsearch 存储](搜索引擎数据库/Elasticsearch/[Elasticsearch]存储.md) - 关键词：`倒排索引`、`正排索引`、`Shard`、`Segment`、`Index Setting`、`分词器`、`doc_values`、`逻辑存储`
- [Elasticsearch 检索（上）](搜索引擎数据库/Elasticsearch/[Elasticsearch]检索上.md) - 关键词：`_search API`、`分页`、`排序`、`深分页`、`search_after`、`高亮`、`filter`、`相关性评分`
- [Elasticsearch 检索（下）](搜索引擎数据库/Elasticsearch/[Elasticsearch]检索下.md) - 关键词：`Query DSL`、`全文查询`、`词项查询`、`bool查询`、`function_score`、`Suggester`、`多字段查询`、`模糊匹配`
- [Elasticsearch 聚合](搜索引擎数据库/Elasticsearch/[Elasticsearch]聚合.md) - 关键词：`Bucket聚合`、`Metric聚合`、`Pipeline聚合`、`terms聚合`、`date_histogram`、`子聚合`、`cardinality`、`聚合精度`
- [Elasticsearch 分析](搜索引擎数据库/Elasticsearch/[Elasticsearch]分析.md) - 关键词：`Analyzer`、`Tokenizer`、`Token Filter`、`Character Filter`、`中文分词`、`IK分词器`、`同义词`、`停用词`
- [Elasticsearch 集群](搜索引擎数据库/Elasticsearch/[Elasticsearch]集群.md) - 关键词：`集群健康`、`主分片`、`副本分片`、`水平扩容`、`故障转移`、`段合并`、`Refresh`、`Translog`
- [Elasticsearch 架构](搜索引擎数据库/Elasticsearch/[Elasticsearch]架构.md) - 关键词：`协调节点`、`数据路由`、`Query阶段`、`Fetch阶段`、`深度分页`、`Refresh`、`Translog`、`Merge`
- [Elasticsearch 优化](搜索引擎数据库/Elasticsearch/[Elasticsearch]优化.md) - 关键词：`JVM内存`、`分片策略`、`Bulk提交`、`refresh_interval`、`SSD`、`Filter优化`、`Hot-Warm架构`、`节点角色分离`
- [Elasticsearch 运维](搜索引擎数据库/Elasticsearch/[Elasticsearch]运维.md) - 关键词：`集群规划`、`elasticsearch.yml`、`vm.max_map_count`、`内存锁定`、`节点发现`、`JVM配置`、`分片分配`、`集群部署`
- [Elasticsearch API](搜索引擎数据库/Elasticsearch/[Elasticsearch]API.md) - 关键词：`REST API`、`URI Search`、`Request Body`、`Bulk API`、`索引别名`、`cat API`、`集群健康`、`msearch`
- [ElasticSearch API 之 High Level REST Client](搜索引擎数据库/Elasticsearch/[Elasticsearch]API之HighLevelRestClient.md) - 关键词：`RestHighLevelClient`、`Java REST Client`、`索引API`、`文档CRUD`、`SearchRequest`、`BulkRequest`、`RequestOptions`、`XContentType`
- [Elasticsearch 面试](搜索引擎数据库/Elasticsearch/[Elasticsearch]面试.md) 💯

#### Elastic

- [Elastic](搜索引擎数据库/Elastic/Elastic.md) - 关键词：`Elastic Stack`、`ELK`、`Elasticsearch`、`Logstash`、`Kibana`、`Beats`、`日志采集`、`分布式架构`
- [Kibana](搜索引擎数据库/Elastic/Kibana.md) - 关键词：`Discover`、`Visualize`、`Dashboard`、`Index Pattern`、`查询语法`、`数据可视化`、`Kibana配置`、`搜索栏`
- [Logstash](搜索引擎数据库/Elastic/Logstash.md) - 关键词：`数据处理管道`、`Input插件`、`Filter插件`、`Output插件`、`Grok`、`事件处理`、`logstash.yml`、`pipeline配置`
- [Filebeat](搜索引擎数据库/Elastic/Filebeat.md) - 关键词：`Beats`、`轻量级采集器`、`日志采集`、`filebeat.yml`、`Prospector`、`多行日志`、`背压机制`、`断点续传`

## 资料 📚

### 数据库综合资料

- [DB-Engines](https://db-engines.com/en/ranking) - 数据库流行度排名
- **书籍**
  - [《数据密集型应用系统设计》](https://book.douban.com/subject/30329536/) - 这可能是目前最好的分布式存储书籍，强力推荐【进阶】
- **教程**
  - [CMU 15445 数据库基础课程](https://15445.courses.cs.cmu.edu/fall2019/schedule.md)
  - [CMU 15721 数据库高级课程](https://15721.courses.cs.cmu.edu/spring2020/schedule.md)
  - [检索技术核心 20 讲](https://time.geekbang.org/column/intro/100048401) - 极客教程【进阶】
  - [后端存储实战课](https://time.geekbang.org/column/intro/100046801) - 极客教程【入门】：讲解存储在电商领域的种种应用和一些基本特性
- **论文**
  - [Efficiency in the Columbia Database Query Optimizer](https://15721.courses.cs.cmu.edu/spring2018/papers/15-optimizer1/xu-columbia-thesis1998.pdf)
  - [How Good Are Query Optimizers, Really?](http://www.vldb.org/pvldb/vol9/p204-leis.pdf)
  - [Architecture of a Database System](https://dsf.berkeley.edu/papers/fntdb07-architecture.pdf)
  - [Data Structures for Databases](https://www.cise.ufl.edu/~mschneid/Research/papers/HS05BoCh.pdf)
- **文章**
  - [Data Structures and Algorithms for Big Databases](https://people.csail.mit.edu/bradley/BenderKuszmaul-tutorial-xldb12.pdf)

### 关系型数据库资料

- **综合资料**
  - [《数据库的索引设计与优化》](https://book.douban.com/subject/26419771/)
  - [《SQL 必知必会》](https://book.douban.com/subject/35167240/) - SQL 的基本概念和语法【入门】
- **Oracle 资料**
  - [《Oracle Database 9i/10g/11g 编程艺术》](https://book.douban.com/subject/5402711/)

#### MySQL 资料

- **官方**
  - [MySQL 官网](https://www.mysql.com/)
  - [MySQL 官方文档](https://dev.mysql.com/doc/)
  - **官方 PPT**
    - [How to Analyze and Tune MySQL Queries for Better Performance](https://www.mysql.com/cn/why-mysql/presentations/tune-mysql-queries-performance/)
    - [MySQL Performance Tuning 101](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-tuning101/)
    - [MySQL Performance Schema & Sys Schema](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-sys-schema/)
    - [MySQL Performance: Demystified Tuning & Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-tuning-best-practices/)
    - [MySQL Security Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-security-best-practices/)
    - [MySQL Cluster Deployment Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-cluster-deployment-best-practices/)
    - [MySQL High Availability with InnoDB Cluster](https://www.mysql.com/cn/why-mysql/presentations/mysql-high-availability-innodb-cluster/)
- **书籍**
  - [《高性能 MySQL》](https://book.douban.com/subject/23008813/) - 经典，适合 DBA 或作为开发者的参考手册【进阶】
  - [《MySQL 技术内幕：InnoDB 存储引擎》](https://book.douban.com/subject/24708143/)
  - [《MySQL 必知必会》](https://book.douban.com/subject/3354490/) - MySQL 的基本概念和语法【入门】
- **教程**
  - [MySQL 实战 45 讲](https://time.geekbang.org/column/intro/139)
  - [runoob.com MySQL 教程](http://www.runoob.com/mysql/mysql-tutorial.md) - 入门级 SQL 教程
  - [mysql-tutorial](https://github.com/jaywcjlove/mysql-tutorial)
- **文章**
  - [MySQL 索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.md)
  - [Some study on database storage internals](https://medium.com/@kousiknath/data-structures-database-storage-internals-1f5ed3619d43)
  - [Sharding Pinterest: How we scaled our MySQL fleet](https://medium.com/@Pinterest_Engineering/sharding-pinterest-how-we-scaled-our-mysql-fleet-3f341e96ca6f)
  - [Guide to MySQL High Availability](https://www.mysql.com/cn/why-mysql/white-papers/mysql-guide-to-high-availability-solutions/)
  - [Choosing MySQL High Availability Solutions](https://dzone.com/articles/choosing-mysql-high-availability-solutions)
  - [High availability with MariaDB TX: The definitive guide](https://mariadb.com/sites/default/files/content/Whitepaper_High_availability_with_MariaDB-TX.pdf)
  - MySQL 相关经验
    - [Booking.com: Evolution of MySQL System Design](https://www.percona.com/live/mysql-conference-2015/sessions/bookingcom-evolution-mysql-system-design) ，Booking.com 的 MySQL 数据库使用的演化，其中有很多不错的经验分享，我相信也是很多公司会遇到的的问题。
    - [Tracking the Money - Scaling Financial Reporting at Airbnb](https://medium.com/airbnb-engineering/tracking-the-money-scaling-financial-reporting-at-airbnb-6d742b80f040) ，Airbnb 的数据库扩展的经验分享。
    - [Why Uber Engineering Switched from Postgres to MySQL](https://eng.uber.com/mysql-migration/) ，无意比较两个数据库谁好谁不好，推荐这篇 Uber 的长文，主要是想让你从中学习到一些经验和技术细节，这是一篇很不错的文章。
  - MySQL 集群复制
    - [Monitoring Delayed Replication, With A Focus On MySQL](https://engineering.imvu.com/2013/01/09/monitoring-delayed-replication-with-a-focus-on-mysql/)
    - [Mitigating replication lag and reducing read load with freno](https://githubengineering.com/mitigating-replication-lag-and-reducing-read-load-with-freno/)
    - [Better Parallel Replication for MySQL](https://medium.com/booking-com-infrastructure/better-parallel-replication-for-mysql-14e2d7857813)
    - [Evaluating MySQL Parallel Replication Part 2: Slave Group Commit](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-2-slave-group-commit-459026a141d2)
    - [Evaluating MySQL Parallel Replication Part 3: Benchmarks in Production](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-3-benchmarks-in-production-db5811058d74)
    - [Evaluating MySQL Parallel Replication Part 4: More Benchmarks in Production](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-4-more-benchmarks-in-production-49ee255043ab)
    - [Evaluating MySQL Parallel Replication Part 4, Annex: Under the Hood](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-4-annex-under-the-hood-eb456cf8b2fb)
  - MySQL 数据分区
    - [StackOverflow: MySQL sharding approaches?](https://stackoverflow.com/questions/5541421/mysql-sharding-approaches)
    - [Why you don’t want to shard](https://www.percona.com/blog/2009/08/06/why-you-dont-want-to-shard/)
    - [How to Scale Big Data Applications](https://www.percona.com/sites/default/files/presentations/How to Scale Big Data Applications.pdf)
    - [MySQL Sharding with ProxySQL](https://www.percona.com/blog/2016/08/30/mysql-sharding-with-proxysql/)
  - 各公司的 MySQL 数据分区经验分享
    - [MailChimp: Using Shards to Accommodate Millions of Users](https://devs.mailchimp.com/blog/using-shards-to-accommodate-millions-of-users/)
    - [Uber: Code Migration in Production: Rewriting the Sharding Layer of Uber’s Schemaless Datastore](https://eng.uber.com/schemaless-rewrite/)
    - [Sharding & IDs at Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
    - [Airbnb: How We Partitioned Airbnb’s Main Database in Two Weeks](https://medium.com/airbnb-engineering/how-we-partitioned-airbnb-s-main-database-in-two-weeks-55f7e006ff21)
- **更多资源**
  - [awesome-mysql](https://github.com/jobbole/awesome-mysql-cn) - MySQL 的资源列表

### Nosql 数据库综合

- Martin Fowler 在 YouTube 上分享的 NoSQL 介绍 [Introduction To NoSQL](https://youtu.be/qI_g07C_Q5I)， 以及他参与编写的 [NoSQL Distilled - NoSQL 精粹](https://book.douban.com/subject/25662138/)，这本书才 100 多页，是本难得的关于 NoSQL 的书，很不错，非常易读。
- [NoSQL Databases: a Survey and Decision Guidance](https://medium.com/baqend-blog/nosql-databases-a-survey-and-decision-guidance-ea7823a822d#.nhzop4d23)，这篇文章可以带你自上而下地从 CAP 原理到开始了解 NoSQL 的种种技术，是一篇非常不错的文章。
- [Distribution, Data, Deployment: Software Architecture Convergence in Big Data Systems](https://resources.sei.cmu.edu/asset_files/WhitePaper/2014_019_001_90915.pdf)，这是卡内基·梅隆大学的一篇讲分布式大数据系统的论文。其中主要讨论了在大数据时代下的软件工程中的一些关键点，也说到了 NoSQL 数据库。
- [No Relation: The Mixed Blessings of Non-Relational Databases](http://ianvarley.com/UT/MR/Varley_MastersReport_Full_2009-08-07.pdf)，这篇论文虽然有点年代久远。但这篇论文是 HBase 的基础，你花上一点时间来读读，就可以了解到，对各种非关系型数据存储优缺点的一个很好的比较。
- [NoSQL Data Modeling Techniques](https://highlyscalable.wordpress.com/2012/03/01/nosql-data-modeling-techniques/) ，NoSQL 建模技术。这篇文章我曾经翻译在了 CoolShell 上，标题为 [NoSQL 数据建模技术](https://coolshell.cn/articles/7270.htm)，供你参考。
  - [MongoDB - Data Modeling Introduction](https://docs.mongodb.com/manual/core/data-modeling-introduction/) ，虽然这是 MongoDB 的数据建模介绍，但是其很多观点可以用于其它的 NoSQL 数据库。
  - [Firebase - Structure Your Database](https://firebase.google.com/docs/database/android/structure-data) ，Google 的 Firebase 数据库使用 JSON 建模的一些最佳实践。
- 因为 CAP 原理，所以当你需要选择一个 NoSQL 数据库的时候，你应该看看这篇文档 [Visual Guide to NoSQL Systems](http://blog.nahurst.com/visual-guide-to-nosql-systems)。

选 SQL 还是 NoSQL，这里有两篇文章，值得你看看。

- [SQL vs. NoSQL Databases: What’s the Difference?](https://www.upwork.com/hiring/data/sql-vs-nosql-databases-whats-the-difference/)
- [Salesforce: SQL or NoSQL](https://engineering.salesforce.com/sql-or-nosql-9eaf1d92545b)

### 列式数据库资料

#### Cassandra 资料

- 沃尔玛实验室有两篇文章值得一读。
  - [Avoid Pitfalls in Scaling Cassandra Cluster at Walmart](https://medium.com/walmartlabs/avoid-pitfalls-in-scaling-your-cassandra-cluster-lessons-and-remedies-a71ca01f8c04)
  - [Storing Images in Cassandra at Walmart](https://medium.com/walmartlabs/building-object-store-storing-images-in-cassandra-walmart-scale-a6b9c02af593)
- [Yelp: How We Scaled Our Ad Analytics with Apache Cassandra](https://engineeringblog.yelp.com/2016/08/how-we-scaled-our-ad-analytics-with-cassandra.md) ，Yelp 的这篇博客也有一些相关的经验和教训。
- [Discord: How Discord Stores Billions of Messages](https://blog.discordapp.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7) ，Discord 公司分享的一个如何存储十亿级消息的技术文章。
- [Cassandra at Instagram](https://www.slideshare.net/DataStax/cassandra-at-instagram-2016) ，Instagram 的一个 PPT，其中介绍了 Instagram 中是怎么使用 Cassandra 的。
- [Netflix: Benchmarking Cassandra Scalability on AWS - Over a million writes per second](https://medium.com/netflix-techblog/benchmarking-cassandra-scalability-on-aws-over-a-million-writes-per-second-39f45f066c9e) ，Netflix 公司在 AWS 上给 Cassandra 做的一个 Benchmark。

#### HBase 资料

- [Imgur Notification: From MySQL to HBASE](https://medium.com/imgur-engineering/imgur-notifications-from-mysql-to-hbase-9dba6fc44183)
- [Pinterest: Improving HBase Backup Efficiency](https://medium.com/@Pinterest_Engineering/improving-hbase-backup-efficiency-at-pinterest-86159da4b954)
- [IBM : Tuning HBase performance](https://www.ibm.com/support/knowledgecenter/en/SSPT3X_2.1.2/com.ibm.swg.im.infosphere.biginsights.analyze.doc/doc/bigsql_TuneHbase.md)
- [HBase File Locality in HDFS](http://www.larsgeorge.com/2010/05/hbase-file-locality-in-hdfs.md)
- [Apache Hadoop Goes Realtime at Facebook](http://borthakur.com/ftp/RealtimeHadoopSigmod2011.pdf)
- [Storage Infrastructure Behind Facebook Messages: Using HBase at Scale](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.294.8459&rep=rep1&type=pdf)
- [GitHub: Awesome HBase](https://github.com/rayokota/awesome-hbase)

针对于 HBase 有两本书你可以考虑一下。

- 首先，先推荐两本书，一本是偏实践的《[HBase 实战](https://book.douban.com/subject/25706541/)》，另一本是偏大而全的手册型的《[HBase 权威指南](https://book.douban.com/subject/10748460/)》。
- 当然，你也可以看看官方的 [The Apache HBase™ Reference Guide](http://hbase.apache.org/0.94/book/book.md)
- 另外两个列数据库：
  - [ClickHouse - Open Source Distributed Column Database at Yandex](https://clickhouse.yandex/)
  - [Scaling Redshift without Scaling Costs at GIPHY](https://engineering.giphy.com/scaling-redshift-without-scaling-costs/)

### KV 数据库资料

#### Redis 资料

- **官网**
  - [Redis 官网](https://redis.io/)
  - [Redis github](https://github.com/antirez/redis)
  - [Redis 官方文档中文版](http://redis.cn/)
  - [Redis 命令参考](http://redisdoc.com/)
- **书籍**
  - [《Redis 实战》](https://item.jd.com/11791607.md)
  - [《Redis 设计与实现》](https://item.jd.com/11486101.md)
- **源码**
  - [《Redis 实战》配套 Python 源码](https://github.com/josiahcarlson/redis-in-action)
- **资源汇总**
  - [awesome-redis](https://github.com/JamzyWang/awesome-redis)
- **Redis Client**
  - [spring-data-redis 官方文档](https://docs.spring.io/spring-data/redis/docs/1.8.13.RELEASE/reference/html/)
  - [redisson 官方文档(中文,略有滞后)](https://github.com/redisson/redisson/wiki/%E7%9B%AE%E5%BD%95)
  - [redisson 官方文档(英文)](https://github.com/redisson/redisson/wiki/Table-of-Content)
  - [CRUG | Redisson PRO vs. Jedis: Which Is Faster? 翻译](https://www.jianshu.com/p/82f0d5abb002)
  - [redis 分布锁 Redisson 性能测试](https://blog.csdn.net/everlasting_188/article/details/51073505)
- **文章**
  - [Learn Redis the hard way (in production) at Trivago](http://tech.trivago.com/2017/01/25/learn-redis-the-hard-way-in-production/)
  - [Twitter: How Twitter Uses Redis To Scale - 105TB RAM, 39MM QPS, 10,000+ Instances](http://highscalability.com/blog/2014/9/8/how-twitter-uses-redis-to-scale-105tb-ram-39mm-qps-10000-ins.md)
  - [Slack: Scaling Slack’s Job Queue - Robustly Handling Billions of Tasks in Milliseconds Using Kafka and Redis](https://slack.engineering/scaling-slacks-job-queue-687222e9d100)
  - [GitHub: Moving persistent data out of Redis at GitHub](https://githubengineering.com/moving-persistent-data-out-of-redis/)
  - [Instagram: Storing Hundreds of Millions of Simple Key-Value Pairs in Redis](https://engineering.instagram.com/storing-hundreds-of-millions-of-simple-key-value-pairs-in-redis-1091ae80f74c)
  - [Redis in Chat Architecture of Twitch (from 27:22)](https://www.infoq.com/presentations/twitch-pokemon)
  - [Deliveroo: Optimizing Session Key Storage in Redis](https://deliveroo.engineering/2016/10/07/optimising-session-key-storage.md)
  - [Deliveroo: Optimizing Redis Storage](https://deliveroo.engineering/2017/01/19/optimising-membership-queries.md)
  - [GitHub: Awesome Redis](https://github.com/JamzyWang/awesome-redis)

### 文档数据库资料

- [Couchbase Ecosystem at LinkedIn](https://engineering.linkedin.com/blog/2017/12/couchbase-ecosystem-at-linkedin)
- [SimpleDB at Zendesk](https://medium.com/zendesk-engineering/resurrecting-amazon-simpledb-9404034ec506)
- [Data Points - What the Heck Are Document Databases?](https://msdn.microsoft.com/en-us/magazine/hh547103.aspx)

#### MongoDB 资料

- **官方**
  - [MongoDB 官网](https://www.mongodb.com/)
  - [MongoDB Github](https://github.com/mongodb/mongo)
  - [MongoDB 官方免费教程](https://learn.mongodb.com/)
- **书籍**
  - [《MongoDB 权威指南》](https://book.douban.com/subject/35688800/)
- **教程**
  - [MongoDB 教程](https://www.runoob.com/mongodb/mongodb-tutorial.md)
  - [极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001)
- **数据**
  - [mongodb-json-files](https://github.com/ozlerhakan/mongodb-json-files)
- **文章**
  - [Introduction to MongoDB](https://www.slideshare.net/mdirolf/introduction-to-mongodb)
  - [eBay: Building Mission-Critical Multi-Data Center Applications with MongoDB](https://www.mongodb.com/blog/post/ebay-building-mission-critical-multi-data-center-applications-with-mongodb)
  - [The AWS and MongoDB Infrastructure of Parse: Lessons Learned](https://medium.baqend.com/parse-is-gone-a-few-secrets-about-their-infrastructure-91b3ab2fcf71)
  - [Migrating Mountains of Mongo Data](https://medium.com/build-addepar/migrating-mountains-of-mongo-data-63e530539952)
- **更多资源**
  - [Github: Awesome MongoDB](https://github.com/ramnes/awesome-mongodb)

### 搜索引擎数据库资料

#### ElasticSearch

- **官方**
  - [Elasticsearch 官网](https://www.elastic.co/cn/products/elasticsearch)
  - [Elasticsearch Github](https://github.com/elastic/elasticsearch)
  - [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.md)
  - [Elasticsearch: The Definitive Guide](https://www.elastic.co/guide/en/elasticsearch/guide/master/index.md) - ElasticSearch 官方学习资料
- **书籍**
  - [《Elasticsearch 实战》](https://book.douban.com/subject/30380439/)
- **教程**
  - [ELK Stack 权威指南](https://github.com/chenryn/logstash-best-practice-cn)
  - [Elasticsearch 教程](https://www.knowledgedict.com/tutorial/elasticsearch-intro.md)
- **文章**
  - [Elasticsearch+Logstash+Kibana 教程](https://www.cnblogs.com/xing901022/p/4704319.md)
  - [ELK（Elasticsearch、Logstash、Kibana）安装和配置](https://github.com/judasn/Linux-Tutorial/blob/master/ELK-Install-And-Settings.md)
  - **性能调优相关**的工程实践
    - [Elasticsearch Performance Tuning Practice at eBay](https://www.ebayinc.com/stories/blogs/tech/elasticsearch-performance-tuning-practice-at-ebay/)
    - [Elasticsearch at Kickstarter](https://kickstarter.engineering/elasticsearch-at-kickstarter-db3c487887fc)
    - [9 tips on ElasticSearch configuration for high performance](https://www.loggly.com/blog/nine-tips-configuring-elasticsearch-for-high-performance/)
    - [Elasticsearch In Production - Deployment Best Practices](https://medium.com/@abhidrona/elasticsearch-deployment-best-practices-d6c1323b25d7)
- **更多资源**
  - [GitHub: Awesome ElasticSearch](https://github.com/dzharii/awesome-elasticsearch)

### 图数据库

- 首先是 IBM Devloperworks 上的两个简介性的 PPT。
  - [Intro to graph databases, Part 1, Graph databases and the CRUD operations](https://www.ibm.com/developerworks/library/cl-graph-database-1/cl-graph-database-1-pdf.pdf)
  - [Intro to graph databases, Part 2, Building a recommendation engine with a graph database](https://www.ibm.com/developerworks/library/cl-graph-database-2/cl-graph-database-2-pdf.pdf)
- 然后是一本免费的电子书《[Graph Database](http://graphdatabases.com)》。
- 接下来是一些图数据库的介绍文章。
  - [Handling Billions of Edges in a Graph Database](https://www.infoq.com/presentations/graph-database-scalability)
  - [Neo4j case studies with Walmart, eBay, AirBnB, NASA, etc](https://neo4j.com/customers/)
  - [FlockDB: Distributed Graph Database for Storing Adjacency Lists at Twitter](https://blog.twitter.com/engineering/en_us/a/2010/introducing-flockdb.md)
  - [JanusGraph: Scalable Graph Database backed by Google, IBM and Hortonworks](https://architecht.io/google-ibm-back-new-open-source-graph-database-project-janusgraph-1d74fb78db6b)
  - [Amazon Neptune](https://aws.amazon.com/neptune/)

### 时序数据库

- [What is Time-Series Data & Why We Need a Time-Series Database](https://blog.timescale.com/what-the-heck-is-time-series-data-and-why-do-i-need-a-time-series-database-dcf3b1b18563)
- [Time Series Data: Why and How to Use a Relational Database instead of NoSQL](https://blog.timescale.com/time-series-data-why-and-how-to-use-a-relational-database-instead-of-nosql-d0cd6975e87c)
- [Beringei: High-performance Time Series Storage Engine @Facebook](https://code.facebook.com/posts/952820474848503/beringei-a-high-performance-time-series-storage-engine/)
- [Introducing Atlas: Netflix’s Primary Telemetry Platform @Netflix](https://medium.com/netflix-techblog/introducing-atlas-netflixs-primary-telemetry-platform-bd31f4d8ed9a)
- [Building a Scalable Time Series Database on PostgreSQL](https://blog.timescale.com/when-boring-is-awesome-building-a-scalable-time-series-database-on-postgresql-2900ea453ee2)
- [Scaling Time Series Data Storage - Part I @Netflix](https://medium.com/netflix-techblog/scaling-time-series-data-storage-part-i-ec2b6d44ba39)
- [Design of a Cost Efficient Time Series Store for Big Data](https://medium.com/@leventov/design-of-a-cost-efficient-time-series-store-for-big-data-88c5dc41af8e)
- [GitHub: Awesome Time-Series Database](https://github.com/xephonhq/awesome-time-series-database)

## 传送 🚪

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
