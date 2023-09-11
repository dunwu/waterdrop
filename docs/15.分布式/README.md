---
title: 分布式
date: 2019-03-08 13:16:53
categories:
  - 分布式
tags:
  - 分布式
permalink: /pages/f21e8c/
hidden: true
index: false
---

# 分布式

> 大型软件为了应对海量数据、高并发，一般都会被设计为分布式系统。
>
> 分布式系统需要解决很多不同领域的问题。

## 📖 内容

### 分布式综合

- [分布式面试总结](00.分布式综合/99.分布式面试.md)

### 分布式理论

- **理论**
  - [分布式基础理论](01.分布式理论/01.分布式基础理论.md) - 关键词：`拜占庭将军`、`CAP`、`BASE`、`错误的分布式假设`
- **算法**
  - [分布式算法 Paxos](01.分布式理论/11.Paxos算法.md) - 关键词：`共识性算法`
  - [分布式算法 Raft](01.分布式理论/12.Raft算法.md) - 关键词：`共识性算法`
  - [分布式算法 Gossip](01.分布式理论/13.Gossip算法.md) - 关键词：`数据传播`

### 分布式协同

- **分布式协同综合**
  - 集群
  - [分布式复制](11.分布式协同/01.分布式协同综合/02.分布式复制.md)
  - 分区
  - 选主
  - [分布式事务](11.分布式协同/01.分布式协同综合/05.分布式事务.md) - 关键词：`2PC`、`3PC`、`TCC`、`本地消息表`、`MQ 消息`、`SAGA`
  - [分布式锁](11.分布式协同/01.分布式协同综合/06.分布式锁.md) - 关键词：`数据库`、`Redis`、`ZooKeeper`、`互斥`、`可重入`、`死锁`、`容错`、`自旋尝试`
- **ZooKeeper**
  - [ZooKeeper 原理](11.分布式协同/02.ZooKeeper/01.ZooKeeper原理.md)
  - [ZooKeeper Java Api](11.分布式协同/02.ZooKeeper/02.ZooKeeperJavaApi.md)
  - [ZooKeeper 命令](11.分布式协同/02.ZooKeeper/03.ZooKeeper命令.md)
  - [ZooKeeper 运维](11.分布式协同/02.ZooKeeper/04.ZooKeeper运维.md)
  - [ZooKeeper Acl](11.分布式协同/02.ZooKeeper/05.ZooKeeperAcl.md)

### 分布式调度

- [服务路由](12.分布式调度/01.服务路由.md) - 关键词：`路由`、`条件路由`、`脚本路由`、`标签路由`
- [负载均衡](12.分布式调度/02.负载均衡.md) - 关键词：`轮询`、`随机`、`最少连接`、`源地址哈希`、`一致性哈希`、`虚拟 hash 槽`
- [流量控制](12.分布式调度/03.流量控制.md) - 关键词：`限流`、`熔断`、`降级`、`计数器法`、`时间窗口法`、`令牌桶法`、`漏桶法`
- [分布式会话](12.分布式调度/10.分布式会话.md) - 关键词：`粘性 Session`、`Session 复制共享`、`基于缓存的 session 共享`
- [分布式 ID](12.分布式调度/04.分布式ID.md) - 关键词：`UUID`、`自增序列`、`雪花算法`、`Leaf`

### 分布式高可用

- [服务容错](13.分布式高可用/02.服务容错.md)

### 分布式通信

### RPC

#### RPC 综合

- [RPC 基础](21.分布式通信/01.RPC/00.RPC综合/01.RPC基础.md)
- [RPC 进阶](21.分布式通信/01.RPC/00.RPC综合/02.RPC进阶.md)
- [RPC 高级](21.分布式通信/01.RPC/00.RPC综合/03.RPC高级.md)
- [服务注册和发现](21.分布式通信/01.RPC/00.RPC综合/11.服务注册和发现.md)

### MQ

#### MQ 综合

- [消息队列面试](21.分布式通信/02.MQ/00.MQ综合/01.消息队列面试.md)
- [消息队列基本原理](21.分布式通信/02.MQ/00.MQ综合/02.消息队列基本原理.md)

#### Kafka

- [Kafka 快速入门](21.分布式通信/02.MQ/01.Kafka/01.Kafka快速入门.md)
- [Kafka 生产者](21.分布式通信/02.MQ/01.Kafka/02.Kafka生产者.md)
- [Kafka 消费者](21.分布式通信/02.MQ/01.Kafka/03.Kafka消费者.md)
- [Kafka 集群](21.分布式通信/02.MQ/01.Kafka/04.Kafka集群.md)
- [Kafka 可靠传输](21.分布式通信/02.MQ/01.Kafka/05.Kafka可靠传输.md)
- [Kafka 存储](21.分布式通信/02.MQ/01.Kafka/06.Kafka存储.md)
- [Kafka 流式处理](21.分布式通信/02.MQ/01.Kafka/07.Kafka流式处理.md)
- [Kafka 运维](21.分布式通信/02.MQ/01.Kafka/08.Kafka运维.md)

#### RocketMQ

- [RocketMQ 快速入门](21.分布式通信/02.MQ/02.RocketMQ/01.RocketMQ快速入门.md)
- [RocketMQ 基本原理](21.分布式通信/02.MQ/02.RocketMQ/02.RocketMQ基本原理.md)
- [RocketMQ Faq](21.分布式通信/02.MQ/02.RocketMQ/99.RocketMQFaq.md)

#### 其他 MQ

- [ActiveMQ](21.分布式通信/02.MQ/99.其他MQ/01.ActiveMQ.md)

### 分布式存储

- [数据缓存](22.分布式存储/01.数据缓存.md) - 关键词：`进程内缓存`、`分布式缓存`、`缓存雪崩`、`缓存穿透`、`缓存击穿`、`缓存更新`、`缓存预热`、`缓存降级`
- [读写分离](22.分布式存储/02.读写分离.md)
- [分库分表](22.分布式存储/03.分库分表.md) - 关键词：`分片`、`路由`、`迁移`、`扩容`、`双写`、`聚合`

## 📚 资料

### 分布式理论资料

#### 分布式理论综合资料

- **教程**
  - [分布式技术原理与算法解析](https://time.geekbang.org/column/intro/100036401) - 极客时间教程
  - [分布式协议与算法实战](https://time.geekbang.org/column/intro/100046101) - 极客时间教程
  - [Distributed Systems for fun and profit](http://book.mixu.net/distsys/single-page.html)：分为五章，讲述了扩展性、可用性、性能和容错等基础知识，FLP 不可能性和 CAP 定理，探讨了大量的一致性模型；讨论了时间和顺序，及时钟的各种用法。随后，探讨了复制问题，如何防止差异，以及如何接受差异。此外，每章末尾都给出了针对本章内容的扩展阅读资源列表，这些资料是对本书内容的很好补充。
- **书籍**
  - [分布式系统原理与范型](https://book.douban.com/subject/11691266/)：书原名 Distributed Systems Principles and Paradigms。经典分布式教程，介绍了分布式系统的七大核心原理，并给出了大量的例子；系统讲述了分布式系统的概念和技术，包括通信、进程、命名、同步化、一致性和复制、容错以及安全等。
- **文章**
  - [The Google File System](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)：Google 三大经典论文之一
  - [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf)：Google 三大经典论文之一
  - [MapReduce: Simplifed Data Processing on Large Clusters](https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf)：Google 三大经典论文之一
  - [Time, Clocks, and the Ordering of Events in a Distributed System](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)
  - [The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)
  - [Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf) - CAP 论文
  - CAP Twelve Years Later: How the “Rules” Have Changed
  - BASE: An Acid Alternative
  - A Simple Totally Ordered Broadcast Protocol
  - Virtual Time and Global States of Distributed Systems
  - [The fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)

#### 分布式一致性算法

- **教程**
  - [Raft: Understandable Distributed Consensus](http://thesecretlivesofdata.com/raft) - 一个动画教程
  - [The Raft Consensus Algorithm](https://raft.github.io/) - 一个交互式动画教程
- **视频**
  - [Raft 作者讲解 Paxos 视频](https://www.bilibili.com/video/av36556594)
  - [Paxos 算法讲解视频](https://www.youtube.com/watch?v=d7nAGI_NZPk)
  - [Raft 作者讲解视频](https://www.youtube.com/watch?v=YbZ3zDzDnrw&feature=youtu.be)
  - [Raft 作者讲解视频对应的 PPT](http://www2.cs.uh.edu/~paris/6360/PowerPoint/Raft.ppt)
- 文章

  - [Part-time Parliament 论文](https://research.microsoft.com/en-us/um/people/lamport/pubs/lamport-paxos.pdf)
  - [Paxos Made Simple 论文](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
  - Paxos Made Practical
  - Paxos Made Live: An Engineering Perspective
  - Using Paxos to Build a Scalable, Consistent, and Highly Available Datastore
    Impossibility of Distributed Consensus With One Faulty Process
  - [Paxos 算法详解](https://zhuanlan.zhihu.com/p/31780743)
  - [一致性算法（Paxos、Raft、Zab）](https://www.bilibili.com/video/BV1TW411M7Fx?from=search&seid=11524608198747599965)
  - [分布式协议与算法实战](https://time.geekbang.org/column/intro/100046101)

  - [Raft: In Search of an Understandable Consensus Algorithm](https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf)
  - [Raft 算法论文译文](https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md)
  - [分布式系统的 Raft 算法](https://www.jdon.com/artichect/raft.html)
  - [Raft 算法详解](https://zhuanlan.zhihu.com/p/32052223)
  - A Brief History of Consensus, 2PC and Transaction Commit
  - Consensus in the Presence of Partial Synchrony

- 工具
  - [sofa-jraft](https://github.com/sofastack/sofa-jraft) - 蚂蚁金服的 Raft 算法实现库（Java 版）

#### Goosip 资料

- [Epidemic Algorithms for Replicated Database Maintenance](http://bitsavers.trailing-edge.com/pdf/xerox/parc/techReports/CSL-89-1_Epidemic_Algorithms_for_Replicated_Database_Maintenance.pdf)
- [P2P 网络核心技术：Gossip 协议](https://zhuanlan.zhihu.com/p/41228196)
- [INTRODUCTION TO GOSSIP](https://managementfromscratch.wordpress.com/2016/04/01/introduction-to-gossip/)
- [Goosip 协议仿真动画](https://flopezluis.github.io/gossip-simulator/)

### 分布式架构资料

- [An introduction to distributed systems](https://github.com/aphyr/distsys-class) - 这是一份分布式系统的提纲挈领的介绍，几乎涵盖了所有知识点，并辅以简洁并切中要害的说明文字，适合初学者了解知识全貌，快速与现有知识结合，形成知识体系。

### 分布式通信资料

#### RPC 资料

- [RPC 实战与核心原理](https://time.geekbang.org/column/intro/100046201) - 极客时间教程

#### MQ 资料

- **教程**
  - [消息队列高手课](https://time.geekbang.org/column/intro/100032301)
  - [Kafka 中文文档](https://github.com/apachecn/kafka-doc-zh)
  - [Kafka 核心技术与实战](https://time.geekbang.org/column/intro/100029201)
  - [Kafka 核心源码解读](https://time.geekbang.org/column/intro/304)
- **文章**

  - [The Log: What every software engineer should know about real-time data’s unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
  - [《日志：每个软件工程师都应该知道的有关实时数据的统一抽象》](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) - 上面文章的译文
  - [Introduction and Overview of Apache Kafka](https://www.slideshare.net/mumrah/kafka-talk-tri-hug)

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

### 分布式存储资料

- **书籍**
  - [《数据密集型应用系统设计》](https://book.douban.com/subject/30329536/) - 这可能是目前最好的分布式存储书籍，强力推荐【进阶】
- **文章**
  - Chord: A Scalable Peer-to-Peer Lookup Service for Internet Applications
  - Pastry: Scalable, Distributed Object Location, and Routing for Large-Scale Peerto-Peer Systems
  - Kademlia: A Peer-to-Peer Information System Based on the XOR Metric
  - A Scalable Content-Addressable Network
  - Ceph: A Scalable, High-Performance Distributed File System
  - [The Log-Structured-Merge-Tree](chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.cs.umb.edu/~poneil/lsmtree.pdf)
  - [HBase: A NoSQL Database](https://www.researchgate.net/publication/317399857_HBase_A_NoSQL_Database)
  - Tango: Distributed Data Structure over a Shared Log

### 分布式系统实战

- The Google File System
- BigTable: A Distributed Storage System for Structured Data
- The Chubby Lock Service for Loosely-Coupled Distributed Systems
- Finding a Needle in Haystack: Facebook’s Photo Storage
- Windows Azure Storage: A Highly Available Cloud Storage Service with Strong Consistency
- Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing
- Scaling Distributed Machine Learning with the Parameter Server
- Dremel: Interactive Analysis of Web-Scale Datasets
- Pregel: A System for Large-Scale Graph Processing
- Spanner: Google’s Globally-Distributed Database
- Dynamo: Amazon’s Highly Available Key-value Store
- S4: Distributed Stream Computing Platform
- Storm @Twitter
- Large-scale Cluster Management at Google with Borg
- F1 - The Fault-Tolerant Distributed RDBMS Supporting Google’s Ad Business
- Cassandra: A Decentralized Structured Storage System
- MegaStore: Providing Scalable, Highly Available Storage for Interactive Services
- Dapper, a Large-Scale Distributed Systems Tracing Infrastructure
- Kafka: A distributed Messaging System for Log Processing
- Amazon Aurora: Design Considerations for High Throughput Cloud-Native Relational Databases

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾