---
title: ZooKeeper
date: 2020-09-09 17:53:08
categories:
  - 分布式
  - 分布式协同
  - ZooKeeper
tags:
  - 分布式
  - 分布式协同
permalink: /pages/1b41b6/
hidden: true
index: false
---

# ZooKeeper

> ZooKeeper 是 Apache 的顶级项目。**ZooKeeper 为分布式应用提供了高效且可靠的分布式协调服务，提供了诸如统一命名服务、配置管理和分布式锁等分布式的基础服务。在解决分布式数据一致性方面，ZooKeeper 并没有直接采用 Paxos 算法，而是采用了名为 ZAB 的一致性协议**。
>
> ZooKeeper 主要用来解决分布式集群中应用系统的一致性问题，它能提供基于类似于文件系统的目录节点树方式的数据存储。但是 ZooKeeper 并不是用来专门存储数据的，它的作用主要是用来**维护和监控存储数据的状态变化。通过监控这些数据状态的变化，从而可以达到基于数据的集群管理**。
>
> 很多大名鼎鼎的框架都基于 ZooKeeper 来实现分布式高可用，如：Dubbo、Kafka 等。
>
> ZooKeeper 官方支持 Java 和 C 的 Client API。ZooKeeper 社区为大多数语言（.NET，python 等）提供非官方 API。

## 📖 内容

### [ZooKeeper 原理](01.ZooKeeper原理.md)

### [ZooKeeper Java Api](02.ZooKeeperJavaApi.md)

### [ZooKeeper 命令](03.ZooKeeper命令.md)

### [ZooKeeper 运维](04.ZooKeeper运维.md)

### [ZooKeeper Acl](05.ZooKeeperAcl.md)

## 📚 资料

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

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾