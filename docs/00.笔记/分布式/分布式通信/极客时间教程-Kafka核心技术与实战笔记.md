---
title: 《Kafka 核心技术与实战》笔记
date: 2025-02-14 17:08:28
categories:
  - 笔记
  - 分布式
  - 分布式通信
tags:
  - 分布式
  - 通信
  - MQ
  - Kafka
permalink: /pages/10813811/
---

# 《Kafka 核心技术与实战》笔记

## 开篇词 为什么要学习 Kafka？

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/a41a5d7cd551446d9f3f9172f2ea7e3e.jpeg)

## 消息引擎系统 ABC

设计消息引擎的关键点：

- **序列化**：CSV、XML、JSON、Protocol Buffer、Thrift。Kafka 默认使用纯二进制字节序列
- **传输模型**：同时支持**点对点模型**和**发布/订阅模型**

消息引擎作用：**异步处理、削峰填谷、系统解耦、系统间通信、数据缓冲、最终一致性**。

## 一篇文章带你快速搞定 Kafka 术语

核心术语：

- **消息（Record）**：Kafka 处理的对象
- **主题（Topic）**：消息的逻辑容器
- **分区（Partition）**：有序不变的消息序列
- **消息位移（Offset）**：分区中消息位置，单调递增
- **副本（Replica）**：领导者副本 + 追随者副本
- **生产者（Producer）** / **消费者（Consumer）**
- **消费者位移（Consumer Offset）**：消费进度
- **消费者组（Consumer Group）**：多实例共同消费
- **分区再均衡（Rebalance）**：自动重新分配分区

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/0942072759304e95a55263255c65f074.jpeg)

三层消息架构：主题层（M 分区 × N 副本）→ 分区层（1 领导者 + N-1 追随者）→ 消息层（位移从 0 递增）。

## Kafka 只是消息引擎系统吗？

Kafka 三大设计目标：生产者/消费者 API、低网络/磁盘开销、高伸缩性架构。

作为流处理平台优势：端到端精确一次处理语义、定位为客户端库而非完整系统。

## 我应该选择哪种 Kafka？

- **Apache Kafka**（社区版）：迭代快、把控度高，缺高级特性
- **Confluent Kafka**：高级特性多，原班人马打造
- **CDH/HDP Kafka**：运维简单，演进慢

## 聊聊 Kafka 的版本号

关键版本：0.7（基础消息队列）→ 0.8（副本机制）→ 0.9（安全认证、Kafka Connect）→ 0.10（Kafka Streams）→ 0.11（幂等 Producer、事务）→ 1.0/2.0（Streams 改进）

## Kafka 线上集群部署方案怎么做？

- **系统**：Linux（零拷贝技术）
- **磁盘**：机械磁盘即可胜任
- **磁盘容量**：需考虑新增消息数 × 消息留存时间 × 平均消息大小 × 备份数 × 压缩比
- **带宽**：单台 Kafka 服务器通常使用 70% 带宽资源，需额外预留 2/3

## 最最最重要的集群参数配置（上）

### 存储参数

- `log.dirs`：**必须设置**，配置多个路径（CSV 格式），挂载到不同物理磁盘
  - 提升读写性能（多磁盘并行）
  - 支持故障转移（Kafka 1.1+，坏磁盘数据自动转移）

### ZooKeeper 参数

`zookeeper.connect`：CSV 格式。多 Kafka 集群共用 ZK 时通过 chroot 区分（加在最后）。

### Broker 连接参数

- `listeners`：监听器，指定协议、主机名和端口
- `advertised.listeners`：对外发布的监听器地址

### Topic 管理参数

- `auto.create.topics.enable`：是否自动创建
- `unclean.leader.election.enable`：是否允许 Unclean 选举
- `auto.leader.rebalance.enable`：是否定期选举 Leader

### 数据留存参数

- `log.retention.{hours|minutes|ms}`：消息保存时长（ms 优先级最高）
- `log.retention.bytes`：消息保存总磁盘容量
- `message.max.bytes`：最大消息大小

## 最最最重要的集群参数配置（下）

Topic 级别参数：`retention.ms`（保存时长，默认 7 天）、`retention.bytes`（预留空间）。

JVM 参数：`KAFKA_HEAP_OPTS`（堆大小）、`KAFKA_JVM_PERFORMANCE_OPTS`（GC 参数）。

操作系统参数：文件描述符限制（`ulimit -n 1000000`）、文件系统用 XFS、Swappiness 设为 1。

## 生产者消息分区机制原理剖析

三级结构：主题 → 分区 → 消息。**分区是实现负载均衡和高吞吐的关键**。

## 生产者压缩算法面面观

压缩 = CPU 时间换磁盘空间/网络 I/O。流程：**Producer 端压缩 → Broker 端保持 → Consumer 端解压**。

性能对比：

- 吞吐量：`LZ4 > Snappy > zstd ≈ GZIP`
- 压缩比：`zstd > LZ4 > GZIP > Snappy`

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/733cabffcfe5487fa77b8d2831b3b09c.png)

## 无消息丢失配置怎么实现？

**Kafka 只对"已提交"消息做有限度持久化保证**。

- **生产阶段**：使用 `producer.send(msg, callback)`（带回调）；设置 `retries` 为较大值
- **存储阶段**：
  - `acks = all`（所有副本接收才算提交）
  - `unclean.leader.election.enable = false`
  - `replication.factor >= 3`
  - `min.insync.replicas > 1`
  - `replication.factor > min.insync.replicas`（推荐 +1）
- **消费阶段**：`enable.auto.commit = false`，手动提交位移

## 客户端都有哪些不常见但是很高级的功能？

**拦截器**：允许在不修改逻辑的情况下动态插入事件处理逻辑。分为生产者拦截器和消费者拦截器。

## Java 生产者是如何管理 TCP 连接的？

1. 创建 KafkaProducer 时连接 `bootstrap.servers`（配置 3~4 台即可）
2. 首次更新元数据后创建与所有 Broker 的连接
3. 发送消息时发现无连接则立即创建
4. `connections.max.idle.ms > 0` 时自动关闭连接；`=-1` 则成为"僵尸"连接

## 幂等生产者和事务生产者是一回事吗？

- **最多一次**（at most once）：可能丢失，不重复
- **至少一次**（at least once）：不丢失，可能重复
- **精确一次**（exactly once）：不丢失，不重复

幂等性 Producer：仅保证**单分区、单会话**幂等。事务型 Producer：跨分区原子写入。

## 消费者组到底是什么？

**Consumer Group** 是 Kafka 提供的可扩展且容错性的消费者机制。

- 同一 Group 下，每个分区只能分配给一个实例
- 所有实例同一 Group → **消息队列模型**；不同 Group → **发布/订阅模型**
- **理想实例数 = 订阅主题的分区总数**

Rebalance 触发条件：组成员数变更、订阅主题数变更、分区数变更。**Rebalance 期间所有 Consumer 停止消费**。

## 揭开神秘的"位移主题"面纱

**consumer_offsets**（位移主题）：保存 Consumer 的位移信息。

- 老版本依赖 ZooKeeper（不适合高频写操作）
- 新版本将位移作为普通 Kafka 消息提交到 consumer_offsets
- 使用 **Compact 策略** 删除过期消息

## 消费者组重平衡能避免吗？

两类非必要 Rebalance：

1. **心跳超时**：设置 `session.timeout.ms = 6s`、`heartbeat.interval.ms = 2s`
2. **消费超时**：`max.poll.interval.ms` 要大于下游最大处理时间

## Kafka 中位移提交那些事儿

位移提交在分区粒度上进行。分为自动提交和手动提交（同步/异步）。

## CommitFailedException 异常怎么处理？

最常见场景：消息处理时间超过 `max.poll.interval.ms`。

## 多线程开发消费者实例

方案一：每个线程维护专属 KafkaConsumer 实例

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/29baaca5d66b4e5682c92b197cdd9ebf.jpeg)

方案二：消息获取与处理解耦，处理交由线程池

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/f05308fe7023436e8408c04ed8f789a4.jpeg)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/0dca57a1241945eab0968f9d7ffa3359.jpeg)

## Java 消费者是如何管理 TCP 连接的

构建 KafkaConsumer 时**不创建 TCP 连接**。连接在 `poll()` 方法内部创建：发起 FindCoordinator 请求时、连接协调者时、消费数据时。

## 消费者组消费进度监控都怎么实现？

三种监控方法：kafka-consumer-groups 脚本、Java Consumer API、JMX 监控指标。

## Kafka 副本机制详解

### 副本

好处：数据冗余、高伸缩性、改善数据局部性。**副本本质是一个只能追加写的提交日志**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/e1bbf10fc5e94c89bc7e5bb96ba76889.jpeg)

基于领导者的副本机制：领导者副本（Leader Replica）+ 追随者副本（Follower Replica）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/e6fc2490f20e4e388499f658811096dd.jpeg)

### ISR

**ISR 包括 Leader 副本 + 同步的 Follower 副本**。`replica.lag.time.max.ms`（默认 10s）控制 Follower 最大落后时间。

### Unclean 领导者选举

`unclean.leader.election.enable` 控制是否允许非 ISR 副本成为 Leader。开启 → 高可用但可能丢数据；关闭 → 数据一致但可能不可用。

## 请求是怎么被处理的？

Kafka 采用类 **Reactor 架构**：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/dbbec8fafa3f44dc858d9886b205eae9.jpeg)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/613b911849694e9382b3aa2721cd2f5f.jpeg)

Acceptor 轮询分配请求到网络线程 → 放入共享队列 → IO 线程池处理。**Purgatory** 缓存延时请求（如 acks=all 的 PRODUCE 请求）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/97e89db3a67e4373a8e0fbd85c3914a0.jpeg)

## 消费者组重平衡全流程解析

1. 选择群主（第一个加入的消费者）
2. 群主从 Coordinator 获取成员列表并分配分区
3. 分配策略：**Range**（连续分区）或 **RoundRobin**（轮询）
4. 每个 Consumer 只能看到自己的分配信息

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/6f39e1092bed4282afe8b10fca12c052.png)

## 你一定不能错过的 Kafka 控制器

**Controller** 是 Kafka 核心组件，在 ZooKeeper 帮助下管理协调整个集群。第一个成功创建 `/controller` 节点的 Broker 成为 Controller。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/09a8c48a033e412d82b418158100939a.jpeg)

控制器职责：主题管理、分区重分配、Leader 选举、集群成员管理、数据服务。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/4f04bb1c1d2b4d5e81cdfbd5ab26e64c.jpeg)

控制器故障转移：自动 Failover，备用控制器替代。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/54a418e5deba4c6280e163efc99e72cb.jpeg)

## 关于高水位和 Leader Epoch 的讨论

### 高水位的作用

1. **定义消息可见性**：高水位以下 = 已提交（可消费），以上 = 未提交
2. **帮助副本同步**：高水位值不大于 LEO；分区高水位 = Leader 副本高水位

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/56751ec192eb4f39a3fe1b50e2f770df.jpeg)

### 高水位更新机制

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/ad4f73180fbe4020bd61a5d6f03ff636.jpeg)

**远程副本**（Leader 端保存的 Follower 副本信息）帮助 Leader 确定分区高水位。

### 副本同步机制解析

初始状态（全 0）→ Leader 写入消息（LEO=1）→ Follower 拉取（LEO=1）→ 下一轮拉取时高水位更新为 1。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/2fbf3ca681394afab294372644a1eb51.jpeg)
![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/7ed9cf3f28eb442697e3a3a7c0c0d55d.jpeg)
![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/41a36fa614824a0c843c3e0b8c2fe2f1.jpeg)
![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/c852b22e94db4638af708383b84af9b8.jpeg)

### Leader Epoch

由 **Epoch**（单调递增版本号）+ **起始位移** 组成。每次领导权变更 Epoch 递增，过期 Leader 不能再行使权力。

## 主题管理知多少

特殊主题：`consumer_offsets`、`transaction_state`。

## Kafka 动态配置了解下？

略

## 怎么重设消费者组位移？

略

## 常见工具脚本大汇总

略

## KafkaAdminClient：Kafka 的运维利器

略

## Kafka 认证机制用哪家？

略

## 云环境下的授权该怎么做？

略

## 跨集群备份解决方案 MirrorMaker

略

## 你应该怎么监控 Kafka？

略

## 主流的 Kafka 监控框架

略

## 调优 Kafka，你做到了吗？

略

## 从 0 搭建基于 Kafka 的企业级实时日志流处理平台

略

## Kafka Streams 与其他流处理平台的差异在哪里？

略

## Kafka Streams DSL 开发实例

略

## Kafka Streams 在金融领域的应用

略

## 参考资料

- [**极客时间教程 - Kafka 核心技术与实战**](https://time.geekbang.org/column/intro/100029201)
