---
title: 大数据教程
date: 2023-02-10 14:52:25
categories:
  - 大数据
tags:
  - 大数据
permalink: /pages/fc832f/
hidden: true
---

<p align="center">

  <a href="https://github.com/dunwu/bigdata-tutorial">
      <img alt="star" class="no-zoom" src="https://img.shields.io/github/stars/dunwu/bigdata-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/bigdata-tutorial">
      <img alt="fork" class="no-zoom" src="https://img.shields.io/github/forks/dunwu/bigdata-tutorial?style=for-the-badge">
  </a>

  <a href="https://github.com/dunwu/bigdata-tutorial/commits/master">
      <img alt="build" class="no-zoom" src="https://img.shields.io/github/actions/workflow/status/dunwu/bigdata-tutorial/deploy.yml?style=for-the-badge">
  </a>

  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
      <img alt="code style" class="no-zoom" src="https://img.shields.io/github/license/dunwu/bigdata-tutorial?style=for-the-badge">
  </a>

</p>

> ☕ **bigdata-tutorial** 是一个大数据教程。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/bigdata-tutorial/) | [Gitee](https://gitee.com/turnon/bigdata-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/bigdata-tutorial/) | [Gitee Pages](http://turnon.gitee.io/bigdata-tutorial/)

## 📖 内容

### [综合](00.综合)

- [大数据简介](00.综合/01.大数据简介.md)
- [大数据学习](00.综合/02.大数据学习.md)

### [Hadoop](01.hadoop)

#### [HDFS](01.hadoop/01.hdfs)

- [HDFS 入门](01.hadoop/01.hdfs/01.HDFS入门.md)
- [HDFS 运维](01.hadoop/01.hdfs/02.HDFS运维.md)
- [HDFS Java API](01.hadoop/01.hdfs/03.HDFSJavaApi.md)

### [HIVE](02.hive)

- [Hive 入门](02.hive/01.Hive入门.md)
- [Hive 表](02.hive/02.Hive表.md)
- [Hive 视图和索引](02.hive/03.Hive视图和索引.md)
- [Hive 查询](02.hive/04.Hive查询.md)
- [Hive DDL](02.hive/05.HiveDDL.md)
- [Hive DML](02.hive/06.HiveDML.md)
- [Hive 运维](02.hive/07.Hive运维.md)

### [HBASE](03.hbase)

- [HBase 原理](03.hbase/01.HBase原理.md)
- [HBase 命令](03.hbase/02.HBase命令.md)
- [HBase 运维](03.hbase/03.HBase运维.md)

### [ZooKeeper](04.zookeeper)

> ZooKeeper 是 Apache 的顶级项目。**ZooKeeper 为分布式应用提供了高效且可靠的分布式协调服务，提供了诸如统一命名服务、配置管理和分布式锁等分布式的基础服务。在解决分布式数据一致性方面，ZooKeeper 并没有直接采用 Paxos 算法，而是采用了名为 ZAB 的一致性协议**。
>
> ZooKeeper 主要用来解决分布式集群中应用系统的一致性问题，它能提供基于类似于文件系统的目录节点树方式的数据存储。但是 ZooKeeper 并不是用来专门存储数据的，它的作用主要是用来**维护和监控存储数据的状态变化。通过监控这些数据状态的变化，从而可以达到基于数据的集群管理**。
>
> 很多大名鼎鼎的框架都基于 ZooKeeper 来实现分布式高可用，如：Dubbo、Kafka 等。

- [ZooKeeper 原理](04.zookeeper/01.ZooKeeper原理.md)
- [ZooKeeper 命令](04.zookeeper/02.ZooKeeper命令.md)
- [ZooKeeper 运维](04.zookeeper/03.ZooKeeper运维.md)
- [ZooKeeper Java API](04.zookeeper/04.ZooKeeperJavaApi.md)
- [ZooKeeper ACL](04.zookeeper/05.ZooKeeperAcl.md)

### Kafka

> **[Kafka](https://dunwu.github.io/blog/pages/328f1c/) 是一个分布式流处理平台，此外，它也被广泛应用于消息队列**。

- [Kafka 快速入门](https://dunwu.github.io/blog/pages/a697a6/)
- [Kafka 生产者](https://dunwu.github.io/blog/pages/141b2e/)
- [Kafka 消费者](https://dunwu.github.io/blog/pages/41a171/)
- [Kafka 集群](https://dunwu.github.io/blog/pages/fc8f54/)
- [Kafka 可靠传输](https://dunwu.github.io/blog/pages/481bdd/)
- [Kafka 存储](https://dunwu.github.io/blog/pages/8de948/)
- [Kafka 流式处理](https://dunwu.github.io/blog/pages/55f66f/)
- [Kafka 运维](https://dunwu.github.io/blog/pages/21011e/)

## 📚 资料

- **综合**
  - **教程**
    - [从 0 开始学大数据](https://time.geekbang.org/column/intro/100020201)
    - [BigData-Notes](https://github.com/heibaiying/BigData-Notes)
  - **论文**
    - [The Google File System](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/gfs-sosp2003.pdf) - Google 大数据三驾马车之一
    - [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/bigtable-osdi06.pdf) - Google 大数据三驾马车之一
    - [MapReduce: Simplified Data Processing on Large Clusters](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/mapreduce-osdi04.pdf) - Google 大数据三驾马车之一
- **Hadoop**
  - [《Hadoop 权威指南（第四版）》](https://item.jd.com/12109713.html)
  - [《HBase 权威指南》](https://book.douban.com/subject/10748460/)
  - [《Hive 编程指南》](https://book.douban.com/subject/25791255/)
- **Spark**
  - [《Spark 技术内幕 深入解析 Spark 内核架构设计与实现原理》](https://book.douban.com/subject/26649141/)
  - [《Spark.The.Definitive.Guide》](https://book.douban.com/subject/27035127/)
- **ZooKeeper**
  - **官方**
    - [ZooKeeper 官网](http://zookeeper.apache.org/)
    - [ZooKeeper 官方文档](https://cwiki.apache.org/confluence/display/ZOOKEEPER)
    - [ZooKeeper Github](https://github.com/apache/zookeeper)
    - [Apache Curator 官网](http://curator.apache.org/)
  - **书籍**
    - [《Hadoop 权威指南（第四版）》](https://item.jd.com/12109713.html)
    - [《从 Paxos 到 Zookeeper 分布式一致性原理与实践》](https://item.jd.com/11622772.html)
  - **文章**
    - [分布式服务框架 ZooKeeper -- 管理分布式环境中的数据](https://www.ibm.com/developerworks/cn/opensource/os-cn-zookeeper/index.html)
    - [ZooKeeper 的功能以及工作原理](https://www.cnblogs.com/felixzh/p/5869212.html)
    - [ZooKeeper 简介及核心概念](https://github.com/heibaiying/BigData-Notes/blob/master/notes/ZooKeeper%E7%AE%80%E4%BB%8B%E5%8F%8A%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.md)
    - [详解分布式协调服务 ZooKeeper](https://draveness.me/zookeeper-chubby)
    - [深入浅出 Zookeeper（一） Zookeeper 架构及 FastLeaderElection 机制](http://www.jasongj.com/zookeeper/fastleaderelection/)
    - [Introduction to Apache ZooKeeper](https://www.slideshare.net/sauravhaloi/introduction-to-apache-zookeeper)
    - [Zookeeper 的优缺点](https://blog.csdn.net/wwwsq/article/details/7644445)
- **Kafka**
  - **官方**
    - [Kafka 官网](http://kafka.apache.org/)
    - [Kafka Github](https://github.com/apache/kafka)
    - [Kafka 官方文档](https://kafka.apache.org/documentation/)
    - [Kafka Confluent 官网](http://kafka.apache.org/)
    - [Kafka Jira](https://issues.apache.org/jira/projects/KAFKA?selectedItem=com.atlassian.jira.jira-projects-plugin:components-page)
  - **书籍**
    - [《Kafka 权威指南》](https://item.jd.com/12270295.html)
    - [《深入理解 Kafka：核心设计与实践原理》](https://item.jd.com/12489649.html)
    - [《Kafka 技术内幕》](https://item.jd.com/12234113.html)
  - **教程**
    - [Kafka 中文文档](https://github.com/apachecn/kafka-doc-zh)
    - [Kafka 核心技术与实战](https://time.geekbang.org/column/intro/100029201)
    - [消息队列高手课](https://time.geekbang.org/column/intro/100032301)
  - **文章**
    - [Introduction and Overview of Apache Kafka](https://www.slideshare.net/mumrah/kafka-talk-tri-hug)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾
