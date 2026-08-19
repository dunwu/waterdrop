---
icon: logos:kafka-icon
title: Kafka 面试
cover: https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-event-system.png
date: 2025-02-03 11:15:43
categories:
  - 分布式
  - 分布式通信
  - MQ
  - Kafka
tags:
  - 分布式
  - 分布式通信
  - MQ
  - Kafka
  - 面试
permalink: /pages/d8357cc5/
---

# Kafka 面试

## Kafka 简介

### 【简单】Kafka 是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 基本概念

#### 💎 关键结论

一句话：Kafka 是一个开源的分布式事件流平台，核心是「分区」这个有序不可变的日志单元。它快的根本原因是把消息系统做成了追加写的分布式日志，天然适合高吞吐场景。

#### ⚡记忆卡片

- **口诀**：平台靠分区，分区是日志，日志追加写，组来摊消费
- **关键词**：事件流平台 ／ Topic ／ Partition ／ Offset ／ 消费者组
- **链路**：Producer 发消息 → 按分区追加写入日志 → 副本同步保可靠 → Consumer 组按 Offset 分摊消费

#### 📖 核心知识

**Kafka 是一个开源分布式事件流平台**。最初由 LinkedIn 开发，现在是 Apache 顶级项目。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/e27c76e0a2b44cce807b5cf1b4bd1a75.gif)

**Kafka 的核心概念**

- **消息（Message）**：Kafka 的基本数据单元。
- **主题（Topic）**：消息的逻辑分类容器，按业务划分。
- **分区（Partition）**：主题的物理分片，每个分区是**有序不可变**的消息序列。**这是实现高并发和扩展性的核心**。
- **消息偏移量（Offset）**：消息在分区中的唯一、递增的 ID。
- **副本（Replica）**：分区的备份，提供故障转移。
  - **领导者副本**：处理所有读写请求。
  - **追随者副本**：异步复制领导者数据，作为备份。
- **生产者（Producer）**：向主题的特定分区发布消息。
- **消费者（Consumer）**：从分区订阅并消费消息。
- **消费者组（Consumer Group）**：由多个消费者组成，**一个分区只能被组内一个消费者消费**，从而实现横向扩展和负载均衡。
- **消费者偏移量（Consumer Offset）**：消费者组对每个分区的消费进度记录。
- **分区再均衡（Rebalance）**：当消费者组内成员变化时，自动重新分配分区所有权的流程，**是保证消费端高可用的核心机制**。

#### 🔬 扩展知识

**【L3】Kafka 的版本演进关键节点**

::: details

- 0.9 版本引入全新 Consumer API，位移改存内部主题 `__consumer_offsets`，取代旧版基于 ZooKeeper 的存储。
- 0.11 版本引入幂等 Producer 与事务机制，为 Exactly-Once 语义打下基础。
- 2.8 版本预览 KRaft 模式（去 ZooKeeper），3.3 生产可用，4.0 彻底移除 ZooKeeper 支持。
- 定位演进：从「发布订阅消息队列」演进为「事件流平台」（消息 + 存储 + 流计算一体化）。

:::

**【L4】事件流平台的三层能力**

::: details

- **发布/订阅**：Producer/Consumer API，支持回放（按 Offset 重读历史数据，这是与传统 MQ 的关键差异）。
- **存储**：分区日志 + 副本，数据可长期保留而非消费即弃。
- **处理**：Kafka Streams / ksqlDB 提供流处理能力，Connect 提供与外部系统的数据集成。

:::

> 📚 延伸阅读：[Kafka 官方文档](https://kafka.apache.org/documentation/)

#### 🔀 发散问题

**Q1：Kafka 和传统消息队列（如 RabbitMQ）最大的区别是什么？**
A：Kafka 是「分布式日志」模型，消息消费后仍保留、可按 Offset 回放，靠分区实现水平扩展；RabbitMQ 是「队列」模型，消息确认后即删除，靠灵活路由取胜。前者偏吞吐与数据管道，后者偏业务消息路由。

**Q2：为什么一个分区只能被组内一个消费者消费？**
A：分区内消息按 Offset 有序，若多个消费者并发读同一分区，消费顺序与进度管理都会失控。Kafka 用「分区独占」换取了分区内顺序保证与简单的进度管理，并行度则通过增加分区来提升。

### 【简单】Kafka 有哪些核心组件？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kafka / 核心组件

#### 💎 关键结论

Kafka 四大件：Producer 发消息、Consumer 拉消息、Broker 存消息、协调器管元数据。记住一个关系：Broker 组成集群，分区副本散在 Broker 上，元数据早期交给 ZooKeeper（新版换成 KRaft）。

#### ⚡记忆卡片

- **口诀**：生产发、消费拉、Broker 存、协调管
- **关键词**：Producer ／ Consumer ／ Broker ／ ZooKeeper（KRaft）
- **链路**：Producer → Broker 集群（分区 + 副本） → Consumer，元数据由 ZooKeeper/KRaft 协调

#### 📖 核心知识

Kafka 有以下核心组件：

| 组件          | 核心功能                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| **Producer**  | 发布数据到 Topic，支持轮询/键值/自定义分区策略，采用批量压缩提升吞吐      |
| **Consumer**  | 通过消费组实现负载均衡，单分区仅限组内一个消费者，通过 offset 确保顺序    |
| **Broker**    | 集群节点，管理分区副本，故障时自动切换 Leader，保障高可用                 |
| **Zookeeper** | 协调集群元数据与 Leader 选举（注：新版本逐步用 KRaft 协议替代 Zookeeper） |

补充：集群中还有一个特殊角色 **Controller（控制器）**，由某个 Broker 兼任，负责分区 Leader 选举与元数据变更协调。

### 【简单】Kafka 有哪些应用场景？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kafka / 应用场景

#### 💎 关键结论

Kafka 的主场是「高吞吐 + 可回放」的数据管道：日志采集、流计算对接、指标监控、事件溯源。选型理由很简单：能写得多、存得住、还能重新读一遍。

#### ⚡记忆卡片

- **口诀**：消息队列打底，日志流计两翼，指标溯源兼修
- **关键词**：消息队列 ／ 日志采集 ／ 流计算 ／ 指标监控 ／ 事件溯源
- **链路**：业务/日志产生数据 → Kafka 高吞吐缓冲 → 下游分发到 Flink/存储/监控系统

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/05/8388f56d9edc4bfbb6a57dc6a593b008.webp)

- **消息队列**：用作高吞吐量的消息系统，将消息从一个系统传递到另一个系统
- **日志采集分析**：集中收集日志数据，然后通过 Kafka 传递到实时监控系统或存储系统
- **流计算**：处理实时数据流，将数据传递给实时计算系统，如 Apache Storm 或 Apache Flink，这些实时计算可用于推荐、系统监控
- **指标收集和监控**：收集来自不同服务的监控指标，统一存储和处理
- **事件溯源**：记录事件发生的历史，以便稍后进行数据回溯或重新处理

## Kafka 存储

### 【中等】Kafka 如何清理数据？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 数据清理

#### 💎 关键结论

Kafka 清理两条路线：按时间/空间直接删旧段（delete），或按 Key 只留最新值（compact）。前者适合流水数据，后者适合状态类数据，两者还能共存。

#### ⚡记忆卡片

- **口诀**：删旧靠保留，去重靠压缩，活跃段不动
- **关键词**：log.retention ／ cleanup.policy ／ compaction ／ 干净段／污浊段
- **链路**：写入新消息 → 保留策略按时间/空间删旧段，或 Cleaner 线程按 Key 压缩 → 活跃段永不删除

#### 📖 核心知识

**日志分段结构**

- **干净段**：这部分消息之前已经被清理过，每个键只存在一个值。
- **污浊段**：在上一次清理后写入的新消息。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/2d62fa2e6dea413eb1c427fdd51ecab3.png)

如果 Kafka 启用了清理功能（通过 `log.cleaner.enabled` 配置），每个 Broker 启动清理管理线程 + N 个清理线程（按分区分配）

对于一个段，清理前后的效果如下：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/30430106919943c885b0c56e74111161.png)

Apache Kafka 清理数据主要通过 **日志保留策略（Log Retention）** 和 **压缩策略（Compaction）** 实现，以下是核心要点概括：

**基于时间的清理**

- **配置参数**：`log.retention.hours`（默认 168 小时/7 天）、`log.retention.minutes`、`log.retention.ms`。
- **机制**：删除超过指定时间的旧日志段（log segments）。
- **触发条件**：由 broker 后台线程定期扫描（默认 5 分钟检查一次，通过`log.retention.check.interval.ms`调整）。

**基于空间的清理**

- **配置参数**：`log.retention.bytes`（整个分区的最大字节数）、`log.segment.bytes`（单个日志段大小，默认 1GB）。
- **机制**：当分区总大小超过限制时，删除最旧的日志段。

**日志压缩**

- **适用场景**：保留每个 key 的最新值（适用于 key-value 数据，如数据库变更日志）。
- **配置参数**：
  - `cleanup.policy=compact`（启用压缩）。
  - `min.cleanable.dirty.ratio`（控制压缩触发时机，默认 0.5）。
- **机制**：
  1. 保留每个 key 的最后一条有效记录，删除旧版本。
  2. 周期性合并日志段（由`log.cleaner`线程执行）。

**手动清理**

- **删除 Topic**：`kafka-topics.sh --delete --topic <topic_name>`（需配置`delete.topic.enable=true`）。
- **删除数据文件**：直接删除日志目录（`log.dirs`）中的分区文件（需谨慎，可能导致数据不一致）。

**关键注意事项**

- **清理延迟**：实际清理可能因检查间隔或资源竞争延迟。
- **磁盘空间监控**：依赖清理可能不足，需监控磁盘使用率。
- **压缩与保留策略冲突**：若同时设置`cleanup.policy=compact,delete`，压缩优先于时间/大小删除。
- **消费者偏移量影响**：删除旧数据可能导致消费者无法回溯（需调整`offsets.retention.minutes`）。

### 【中等】Kafka 如何检索数据？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 数据检索

#### 💎 关键结论

Kafka 检索不靠全量扫描，靠「两步定位」：先用文件名定位段，再用稀疏索引二分定位段内位置，最后短距离顺序扫描。索引坏了不怕，删掉会自动重建。

#### ⚡记忆卡片

- **口诀**：文件名找段，索引找位，顺序扫到点
- **关键词**：稀疏索引 ／ offset→position ／ index.interval.bytes ／ 索引自愈
- **链路**：目标 offset → 按段起始 offset 定位段 → 稀疏索引二分找最近条目 → 从物理位置顺序扫描到目标消息

#### 📖 核心知识

- **动态消费起点**
  - 支持从任意有效偏移量开始消费
- **稀疏索引设计**
  - 索引文件（`.index`）存储 offset→position 映射
  - 采用**间隔存储**（可配置`index.interval.bytes`）
  - 每个条目包含：
    - 消息偏移量（offset）
    - 物理位置（position）
- **索引自愈能力**
  - 索引无校验和，损坏后自动重建
  - 删除索引文件安全（Kafka 自动重新生成）
- **文件对应关系**
  - 每个日志分段（Segment）对应：
  - 数据文件（`.log`）
  - 索引文件（`.index`）
  - 按起始偏移量命名（如 `00000000000000368769.index`）

下面是 Kafka 中分段的日志数据文件和偏移量索引文件的对应映射关系图（其中也说明了如何按照起始偏移量来定位到日志数据文件中的具体消息）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/845493d743af480b85cb3c81fa9233e0.png)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Kafka 给每条消息都建索引，所以查得快” → 错。Kafka 是稀疏索引，默认每写入约 4KB（`index.interval.bytes=4096`）才记一条，靠二分 + 短顺序扫描补足，省空间且索引可常驻内存。
- ❌ “按任意 offset 检索都是全分区扫描” → 错。先按段文件名定位段，再走稀疏索引，复杂度是 O(log 段数 + log 段内条目数)。

:::

### 【中等】Kafka 如何实现日志压缩？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 日志压缩

#### 💎 关键结论

日志压缩（compact）就是「同 Key 只留最新」：写入照常全量写，后台 Cleaner 线程慢慢把旧版本清掉。它是最终一致的，适合 CDC、状态存储这类“只关心最新值”的场景。

#### ⚡记忆卡片

- **口诀**：全量写、按 Key 留新、后台慢清
- **关键词**：cleanup.policy=compact ／ Cleaner 线程 ／ 最新值保留 ／ null Key 墓碑
- **链路**：消息全量写入 → Cleaner 扫描脏段 → 同 Key 只保留 offset 最大记录 → 旧记录物理清除

#### 📖 核心知识

日志压缩通过 Key-Level 去重优化存储效率，适用于状态跟踪类场景，需权衡实时性与资源开销。配置时建议结合业务数据更新频率调整`log.cleaner`相关参数。

**基本概念**

- **功能本质**：保留每个键（Key）的最新消息，删除历史重复值
- **触发条件**：需配置`log.cleanup.policy=compact`
- **执行主体**：后台 Cleaner 线程周期性扫描压缩

**工作机制**

| 环节         | 说明                                                      |
| ------------ | --------------------------------------------------------- |
| **写入阶段** | 所有消息（含重复 Key）正常写入日志                        |
| **压缩阶段** | Cleaner 线程扫描日志，对同一 Key 只保留 offset 最大的记录 |
| **清理阶段** | 被标记删除的消息最终被物理清除                            |

**典型应用场景**

- **数据库变更日志**（CDC）：仅保留数据表的最终状态
- **设备状态监控**：存储物联网设备最新上报数据
- **配置管理中心**：记录配置项最新版本
- **会话持久化**：保存用户会话最新信息

**与其他机制的对比**

| **特性**     | **日志压缩**         | **日志删除**（按时间/大小） |
| ------------ | -------------------- | --------------------------- |
| **保留策略** | 按 Key 保留最新值    | 按时间/文件大小删除旧数据   |
| **适用场景** | 需要 Key 级状态追溯  | 只需保留近期数据            |
| **可共存性** | 可与删除策略同时配置 | -                           |

**注意事项**

- **延迟性**：压缩非实时，存在数据最终一致性
- **资源消耗**：压缩过程占用 CPU/IO 资源
- **特殊键处理**：`null`键消息不会被压缩保留
- **监控指标**：关注`kafka.log:type=LogCleanerManager`相关指标

#### 🔬 扩展知识

**【L3】压缩的触发条件与墓碑消息**

::: details

- 压缩只发生在“干净段 + 污浊段”的边界之后，`min.cleanable.dirty.ratio`（默认 0.5）控制脏数据占比达到多少才值得压，避免频繁压缩浪费 CPU/IO。
- value 为 null 的消息是“墓碑（tombstone）”，语义是删除该 Key；它会在 `delete.retention.ms`（默认 24 小时）后被彻底清除，消费端读到墓碑即知该 Key 已删除。

:::

**【L4】压缩主题的读取语义与典型使用者**

::: details

- 压缩主题的 offset 不连续（旧记录被删），不能假设 offset 连续递增；但每个 Key 的最新值始终可读。
- Kafka 自己的内部主题 `__consumer_offsets`、`__transaction_state` 都是 compact 主题；Kafka Connect 的偏移存储、Kafka Streams 的 changelog 也大量使用压缩主题。

:::

> 📚 延伸阅读：[Kafka 官方文档 - Log Compaction](https://kafka.apache.org/documentation/#compaction)

#### 🔀 发散问题

**Q1：compact 主题能当普通消息队列用吗？**
A：不建议。压缩会异步删除旧记录，消费者慢了可能永远读不到中间状态；它适合“状态快照”语义，流水类消息应使用 delete 策略。

**Q2：compact 和 delete 能同时开吗？**
A：可以，配置 `cleanup.policy=compact,delete`：先按 Key 压缩，超过保留时间/空间的段照样删除，兼顾“最新值可查”与“磁盘不爆”。详见本文档『Kafka 如何清理数据？』。

## Kafka 生产消费

### 【中等】Kafka 发送消息的工作流程是怎样的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 生产者

#### 💎 关键结论

发送四步走：序列化 → 选分区 → 攒批次 → 异步发送并处理响应。关键点：消息不是逐条发的，而是同主题同分区的消息攒成一批由 Sender 线程统一发出，这是高吞吐的关键之一。

#### ⚡记忆卡片

- **口诀**：序列化、定分区、攒批次、等响应
- **关键词**：ProducerRecord ／ 分区器 ／ RecordAccumulator ／ Sender 线程 ／ RecordMetaData
- **链路**：ProducerRecord → 序列化器 → 分区器选分区 → 写入按分区分组的批次缓冲 → Sender 线程批量发到分区 Leader → 成功回元数据/失败重试

#### 📖 核心知识

Kafka 生产者用一个 `ProducerRecord` 对象来抽象一条要发送的消息， `ProducerRecord` 对象需要包含目标主题和要发送的内容，还可以指定键或分区。其发送消息流程四步：**序列化 → 选择分区 → 暂存缓冲区攒批 → 批次传输**。

（1）**序列化** - 生产者要先把键和值序列化成字节数组，这样它们才能够在网络中传输。

（2）**分区** - 数据被传给分区器。如果在 `ProducerRecord` 中已经指定了分区，那么分区器什么也不会做；否则，分区器会根据 `ProducerRecord` 的键来选择一个分区。选定分区后，生产者就知道该把消息发送给哪个主题的哪个分区。

（3）**批次传输** - 接着，这条记录会被添加到一个记录批次中。这个批次中的所有消息都会被发送到相同的主题和分区上。有一个独立的线程负责将这些记录批次发送到相应 Broker 上。

- **批次，就是一组消息，这些消息属于同一个主题和分区**。
- 发送时，会把消息分成批次传输，如果每次只发送一个消息，会占用大量的网路开销。

（4）**响应** - 服务器收到消息会返回一个响应。

- 如果**成功**，则返回一个 `RecordMetaData` 对象，它包含了主题、分区、偏移量；
- 如果**失败**，则返回一个错误。生产者在收到错误后，可以进行重试，重试次数可以在配置中指定。失败一定次数后，就返回错误消息。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/05/b89455640aa248e9bfeb1f4000652fe1.png)

**如何确定发给哪个 Broker？**

- 生产者会向任意 broker 发送一个元数据请求（`MetadataRequest`），获取到每一个分区对应的 Leader 信息，并缓存到本地。
- 生产者在发送消息时，会指定 Partition 或者通过 key 得到到一个 Partition，然后根据 Partition 从缓存中获取相应的 Leader 信息。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/3f7ed5e9c2e24c5da6553fd54189516a.png)

#### 🔬 扩展知识

**【L3】缓冲区结构与阻塞行为**

::: details

- 批次缓冲由 `RecordAccumulator` 管理，按「分区」分组攒批，总内存受 `buffer.memory`（默认 32MB）限制；缓冲区满时 `send()` 会阻塞，超过 `max.block.ms` 抛异常，这是生产端限流的天然背压点。
- 批次触发发送有两个条件：批大小达到 `batch.size`（默认 16KB）或等待超过 `linger.ms`（默认 0），高吞吐场景常配套调大两者。

:::

**【L4】元数据缓存的失效与更新**

::: details

- 当发送遇到 `NOT_LEADER_OR_FOLLOWER` 等错误时，Producer 会刷新元数据重新定位分区 Leader，而不是盲目重试旧地址；`metadata.max.age.ms`（默认 5 分钟）控制元数据的定期刷新。
- 这也是为什么 `bootstrap.servers` 只是初始入口：Producer 最终会与分区 Leader 所在 Broker 直连，集群扩缩容对客户端基本透明。

:::

> 📚 延伸阅读：[Kafka 官方文档 - Producer 配置](https://kafka.apache.org/documentation/#producerconfigs)

#### 🔀 发散问题

**Q1：同步 send 和异步 send 的区别？**
A：`send()` 本身是异步的，返回 Future；调 `get()` 即变同步阻塞。可靠性上两者等价（都走同一套重试/回调），区别在于吞吐与是否阻塞业务线程；生产推荐异步 + callback 处理失败。

**Q2：为什么批次内消息必须同主题同分区？**
A：Broker 端写入是按分区日志追加的，一个 Produce 请求可携带多个分区的批次但每批内部必须同分区；这样既保证分区内顺序，又能让 Broker 一次请求完成多分区写入。

### 【简单】Kafka 为什么要支持消费者群组？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 消费者组

#### 💎 关键结论

消费者群组是 Kafka 的“可扩展 + 容错”消费机制：组内多个消费者分摊分区并发消费，防积压；成员挂了自动再均衡接管分区，防单点。一个分区只能归组内一个消费者，是这套机制的基石。

#### ⚡记忆卡片

- **口诀**：组订阅、区分摊、一归属一客、变了就再均衡
- **关键词**：Consumer Group ／ 分区分配 ／ 消费者偏移量 ／ 再均衡 ／ 订阅发布
- **链路**：写入量大单消费者追不上 → 多消费者组内分摊分区并发消费 → 成员/分区变化触发再均衡 → 每分区仍只归一个消费者保顺序

#### 📖 核心知识

要点：**消费者群组以组为维度订阅 Topic，并分摊分区以均衡负载；一个分区只能分配给组内一个实例；消费者数量或分区数变化时触发分区再均衡。**

**消费者**

每个 Consumer 的唯一元数据是该 Consumer 在日志中消费的位置。这个偏移量是由 Consumer 控制的：Consumer 通常会在读取记录时线性的增加其偏移量。但实际上，由于位置由 Consumer 控制，所以 Consumer 可以采用任何顺序来消费记录。

**一条消息只有被提交，才会被消费者获取到**。如下图，只能消费 Message0、Message1、Message2：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/7306e918c2ae4fbfb8d8d14b2b625913.png)

**消费者群组**

**Consumer Group 是 Kafka 提供的可扩展且具有容错性的消费者机制**。

Kafka 的写入数据量很庞大，如果只有一个消费者，消费消息速度很慢，时间长了，就会造成数据积压。为了减少数据积压，Kafka 支持消费者群组，可以让多个消费者并发消费消息，对数据进行分流。

Kafka 消费者从属于消费者群组，**一个群组里的 Consumer 订阅同一个 Topic，一个主题有多个 Partition，每一个 Partition 只能隶属于消费者群组中的一个 Consumer**。

如果超过主题的分区数量，那么有一部分消费者就会被闲置，不会接收到任何消息。

同一时刻，**一条消息只能被同一消费者组中的一个消费者实例消费**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/29b36f29666e4111b1482440c5eb23e0.png)

**不同消费者群组之间互不影响**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/c47a58d33e82429e857fd7f890f07239.png)

#### 🔬 扩展知识

**【L3】点对点与发布订阅的统一**

::: details

- 传统 MQ 里点对点（队列）和发布订阅（广播）是两种模型；Kafka 用消费者组把两者统一：一个组内多消费者是点对点分摊，多个组各自消费全量消息就是广播。
- 每个组独立维护自己的消费进度（存在内部主题 `__consumer_offsets`），组间互不影响，新增下游系统只需新建一个组从头/从尾消费，不改生产端。

:::

**【L4】静态成员与再均衡代价**

::: details

- 0.9 新 Consumer API 后位移不再存 ZooKeeper，而是存 `__consumer_offsets`，提交位移成为消费者端可靠性设计的核心动作。
- 成员频繁上下线会反复触发 rebalance（全组停消费）；可通过 `group.instance.id` 静态成员、调大 `session.timeout.ms` 缓解，详见本文档『分区再均衡存在什么问题？如何避免分区再均衡？』。

:::

#### 🔀 发散问题

**Q1：消费者数多于分区数会怎样？**
A：多出来的消费者完全闲置，收不到任何消息。扩容消费能力的前提是先扩分区，而分区数只能增不能减，需提前规划。

**Q2：同一 Topic 想既分摊又广播怎么办？**
A：建两个消费组：分摊组内多消费者分摊分区；广播需求则由另一个单成员组（或多个下游各建一组）全量消费，两组进度互不干扰。

### 【中等】Kafka 消费消息的工作流程是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 消费者

#### 💎 关键结论

消费三步：组订阅 → poll 拉批 → 处理后提交 offset。Kafka 用 pull 模式，消费者自己控制拉取节奏， Broker 端靠“等数据攒够再返回”减少空轮询；poll 还兼职发心跳维持组成员关系。

#### ⚡记忆卡片

- **口诀**：订阅、拉批、处理、提交，poll 兼职发心跳
- **关键词**：pull 模式 ／ poll ／ fetch.min.bytes ／ offset 提交 ／ 心跳
- **链路**：消费者组订阅 Topic → poll 拉取批次（Broker 攒够数据再返回） → 处理消息 → 提交 offset 确认进度

#### 📖 核心知识

流程要点：**消费者群组订阅 Topic → 消费者轮批次拉取消息 → 处理完消息后提交偏移量（Offset）**。

Kafka 消费者通过 `pull` 模式来获取消息，但是获取消息时并不是立刻返回结果，需要考虑两个因素：

- 消费者通过 `customer.poll(time)` 中设置等待时间
- Broker 会等待累计一定量数据，然后发送给消费者。这样可以减少网络开销。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/f3d0c34e18fb4f168a486ec90cfb580c.png)

`pull` 除了获取消息外，还有其他作用：

- **发送心跳信息**。消费者通过向被指派为群组协调器的 Broker 发送心跳来维护他和群组的从属关系，当机器宕掉后，群组协调器触发再均衡。

#### 🔬 扩展知识

**【L3】为什么选 pull 而不是 push？**

::: details

- push 模式下 Broker 无法感知消费者处理能力，推快了会把消费者打爆（堆积/崩溃）；pull 让消费者按自身能力控制拉取速率，天然背压，也便于回溯（把 offset 往回拨即可重读）。
- 代价是空轮询与延迟：Broker 用 `fetch.min.bytes`（默认 1B）+ `fetch.max.wait.ms`（默认 500ms）折中“攒够再返回”，消费端用 `max.poll.records`（默认 500）控制单批条数。

:::

**【L4】心跳与 poll 的分离**

::: details

- 0.10.1 起心跳从 poll 中拆出，由独立后台线程发送；`session.timeout.ms` 控制心跳超时，而 `max.poll.interval.ms`（默认 5 分钟）控制两次 poll 的最大间隔，处理太慢同样会被踢出组触发 rebalance。
- 这两个超时参数是消费端稳定性调优的核心：前者防网络/短暂故障误判，后者防慢处理连环踢出。

:::

#### 🔀 发散问题

**Q1：自动提交和手动提交 offset 怎么选？**
A：自动提交（默认开启，间隔 5s）简单但存在丢失/重复窗口；业务消息建议关自动提交，处理成功后手动提交，把丢失风险转成可用幂等消化的重复风险。详见《MQ面试》『如何保证 MQ 消息不丢失？』。

**Q2：poll 一次拉多少合适？**
A：由 `max.poll.records` × 单条处理耗时决定，原则是单批处理时间远低于 `max.poll.interval.ms`；积压期可调大批量换吞吐，同时同步调大 `max.poll.interval.ms` 防被踢。

## Kafka 集群

### 【中等】Kafka 如何实现分区机制？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 分区

#### 💎 关键结论

分区是 Kafka 高性能、高可用、易扩展的基石：它把 Topic 切成多个有序不可变的日志分片，实现并行处理与分布式存储。理解了分区，就理解了 Kafka 一半的设计。

#### ⚡记忆卡片

- **口诀**：一分区一日志，只追加不修改，Leader 读写 Follower 备份
- **关键词**：Partition ／ append-only ／ Offset ／ Leader ／ Follower
- **链路**：Topic 拆成多分区 → 每分区是有序不可变日志，尾部追加写入 → 分区散布多 Broker 且多副本冗余 → Leader 宕机时 Follower 顶上保高可用

#### 📖 核心知识

**分区是 Kafka 高性能（吞吐量）、高可用和易扩展的基石。它通过数据分片实现了并行处理，是 Kafka 性能的关键。**

Kafka 的数据结构采用三级结构，即：主题（Topic）、分区（Partition）、消息（Record）。其中，分区是 Kafka 中最小的并行处理单元。

每个分区本质上是一个**有序的、不可变的消息日志文件**，消息被追加到分区尾部（类似 append-only 日志），并通过偏移量（Offset）唯一标识每条消息在分区内的位置。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-log-anatomy.png)

分区会被**分布式存储在不同的 Broker 节点**上，实现数据的分布式存储和负载均衡。

每个分区可以设置多个**副本（Replica）**，其中一个为**领导者副本（Leader）**，负责处理读写请求；其他为**追随者副本（Follower）**，通过复制 Leader 的数据实现高可用（当 Leader 故障时，Follower 会被选举为新 Leader）。

#### 🔬 扩展知识

**【L3】分区数的双重约束**

::: details

- 分区数决定消费端最大并行度（组内消费者数上限），也决定生产端批量写入的并行度；但分区不是越多越好，每个分区占用文件句柄、内存与 Leader 选举开销，单 Broker 建议控制在数千分区量级以内。
- 分区数只能增不能减：缩分区需要跨日志重排 offset 与重分布副本，Kafka 不提供该能力，所以建 Topic 时应按未来 1~2 年峰值一次性规划。

:::

**【L4】分区与顺序、热点的关系**

::: details

- Kafka 只保证分区内有序；需要局部有序时用 Key 哈希把相关消息路到同一分区。开幂等后 `max.in.flight.requests.per.connection≤5` 仍保序，详见《MQ面试》『如何保证 MQ 消息的顺序性？』。
- 分区键选低基数字段（如地区码）会造成热点分区；选高基数字段（user_id、order_id）才能分散，详见本文档『Kafka 如何处理数据倾斜问题？』。

:::

#### 🔀 发散问题

**Q1：为什么 Kafka 不直接用一个全局有序队列？**
A：全局有序意味着写入与消费都单点串行，吞吐无法水平扩展；Kafka 用“分区内有序 + 分区间并行”换取了可扩展性，需要全局序时只能单分区，代价是吞吐封顶。

**Q2：分区和副本是什么关系？**
A：副本是分区在 Broker 维度的冗余：一个分区有 N 个副本分布在最多 N 台 Broker 上，一个 Leader 对外服务，其余 Follower 纯复制；分区是并行单元，副本是可用性单元。

### 【中等】Kafka 支持哪些分区策略？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 分区策略

#### 💎 关键结论

分区策略分两端：生产端决定消息进哪个分区（指定/哈希/轮询/粘性/自定义），消费端决定分区分给谁（Range/RoundRobin/Sticky）。核心权衡只有一条：顺序性靠同 Key 同分区，均衡性靠散列。

#### ⚡记忆卡片

- **口诀**：生产定哈希轮粘，消费范轮粘，顺序靠同 Key，均衡靠散列
- **关键词**：Hash ／ Sticky ／ RoundRobin ／ Range ／ Partitioner
- **链路**：生产者按策略把消息路由到分区（均衡写入） → 消费者组按分配策略把分区分给成员（均衡消费）

#### 📖 核心知识

Kafka 通过分区实现生产、消费的负载均衡。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/10/dd62c39370804af5aacb40e6208c9682.png)

**生产者分区策略**

- **指定分区**：直接指定分区号，手动控制消息流向。
- **哈希（Hash）**：有 key 时，对 Key 哈希后取模分区数，保证同 Key 消息入同一分区（单分区顺序性）。
- **轮询（RoundRobin）**：旧版默认。无 Key 时，依次均匀分配到各分区。
- **粘性（Sticky）**：2.4 + 默认。优先向同一分区发送，满后切换，减少切换开销，兼顾均衡。
- **自定义**：实现 `Partitioner` 接口，按业务逻辑（如地域、时间）分配。

**消费者组分区策略**

- **范围（Range）**：分区排序后平均分配，前几个消费者可能多分配 1 个（简单但可能不均）。
- **轮询（RoundRobin）**：分区和消费者排序后轮询分配，跨主题订阅时更均匀。
- **粘性（Sticky）**：保持现有分配，仅最小范围调整，减少重平衡开销。

#### 🔬 扩展知识

**【L3】粘性分区器为什么成为无 Key 消息的默认**

::: details

- 纯轮询每条消息换分区，批次永远攒不大；粘性分区器（2.4+ 默认）把一个批次尽量塞进同一分区直到 `batch.size` 填满再切换，既保均衡又提高攒批效率，减少 Broker 端请求次数。
- 注意：粘性只影响无 Key 消息；有 Key 消息仍走哈希，同 Key 同分区的顺序语义不变。

:::

**【L4】消费端策略的选择陷阱**

::: details

- Range 按主题独立分配，订阅多主题时前几个消费者会系统性多拿分区，造成热点；跨主题订阅场景应改用 RoundRobin 或 Sticky。
- Sticky/CooperativeSticky 在 rebalance 时尽量保留旧分配，显著减少分区迁移带来的重复消费与状态重建开销，生产推荐 Co-operative 粘性策略（增量再均衡）。

:::

#### 🔀 发散问题

**Q1：指定分区和指定 Key 哈希有什么区别？**
A：指定分区是硬编码路由，分区扩容后不会自动分散；Key 哈希随分区数变化重新取模，扩容时同 Key 会换分区（需双写过渡）。要顺序性选 Key 哈希，要绝对控制才用指定分区。

**Q2：自定义分区器要注意什么？**
A：一是均匀性，避免业务键分布不均造成热点；二是幂等性，同一 Key 必须始终路由到同一分区，否则顺序与去重都会被破坏。

### 【困难】Kafka 如何实现分区再均衡？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kafka / 分区再均衡

#### 💎 关键结论

再均衡就是「重新分蛋糕」：成员或分区变化时，由“群主”消费者算出新分配方案，经 Coordinator 下发给全组。它保了消费端高可用，但过程全组停消费，所以要尽量少触发。

#### ⚡记忆卡片

- **口诀**：群主算账，协调员下发，心跳续命，变了就均衡
- **关键词**：JoinGroup ／ 群主（Leader Consumer） ／ Coordinator ／ 心跳 ／ 分配策略
- **链路**：成员变化触发 JoinGroup → 首个成员当群主 → 群主按策略算分配 → 结果交给 Coordinator → Coordinator 下发各消费者（各自只见自己）

#### 📖 核心知识

**分区再均衡（Rebalance）**是消费者组内因消费者成员增减而**重新分配分区**的过程。**分区再均衡实现了消费者群组的高可用性和伸缩性**。

**分区再均衡的触发时机**有三种：

- **消费者群组成员数变化**
- **订阅主题数变化**
- **订阅主题的分区数变化**

**再均衡的过程**

**Rebalance 是通过消费者群组中的称为“群主”消费者客户端进行的**。

（1）**选择群主**

当消费者要加入群组时，会向群组协调器（Coordinator）发送一个 JoinGroup 请求。第一个加入群组的消费者将成为“群主”。**群主从 Coordinator 那里获取群组的活跃成员列表，并负责给每一个消费者分配分区**。

> 群组协调器（Coordinator），专门为 Consumer Group 服务，负责为 Group 执行 Rebalance 以及提供位移管理和组成员管理等。具体来讲，Consumer 端应用程序在提交位移时，其实是向 Coordinator 所在的 Broker 提交位移。同样地，当 Consumer 应用启动时，也是向 Coordinator 所在的 Broker 发送各种请求，然后由 Coordinator 负责执行消费者组的注册、成员管理记录等元数据管理操作。

（2）**心跳续活**

消费者通过向 Coordinator 定期发送心跳来维持它们和群组的从属关系以及它们对分区的所有权。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/6f39e1092bed4282afe8b10fca12c052.png)

（3）**分区策略**：群主从 Coordinator 获取群组成员列表，然后给每一个消费者进行分配分区 Partition。分区策略根据消费者群组预设的负载均衡策略而定：

- **范围（Range）**：分区排序后平均分配，前几个消费者可能多分配 1 个（简单但可能不均）。
- **轮询（RoundRobin）**：分区和消费者排序后轮询分配，跨主题订阅时更均匀。
- **粘性（Sticky）**：保持现有分配，仅最小范围调整，减少重平衡开销。

（4）群主分配完成之后，把**分区分配情况发送给 Coordinator**。

（5）Coordinator 再把这些信息发送给消费者。**每个消费者只能看到自己的分配信息，只有群主知道所有消费者的分配信息**。

**如何确定 Coordinator 在哪台 Broker？**

所有 Broker 在启动时，都会创建和开启相应的 Coordinator 组件。也就是说，**所有 Broker 都有各自的 Coordinator 组件**。那么，Consumer Group 如何确定为它服务的 Coordinator 在哪台 Broker 上呢？答案就在我们之前说过的 Kafka 内部位移主题 `__consumer_offsets` 身上。

目前，Kafka 为某个 Consumer Group 确定 Coordinator 所在的 Broker 的算法有 2 个步骤。

1. 第 1 步：确定由位移主题的哪个分区来保存该 Group 数据：`partitionId=Math.abs(groupId.hashCode() % offsetsTopicPartitionCount)`。

2. 第 2 步：找出该分区 Leader 副本所在的 Broker，该 Broker 即为对应的 Coordinator。

#### 🔬 扩展知识

**【L3】再均衡协议的演进：Eager → Cooperative**

::: details

- 经典（Eager）协议再均衡时全组先 revoke 所有分区再重新分配，期间全组停消费；0.10.2 引入 ConsumerInterceptor 之后逐步演进，2.4 引入 **Co-operative Rebalance（增量再均衡）**，只迁移受影响的分区，未受影响的继续消费。
- 开启方式：消费端把 `partition.assignment.strategy` 设为 `CooperativeStickyAssignor`，Broker 与客户端版本需匹配；这是减少再均衡影响面的第一选择。

:::

**【L4】群主机制的工程含义**

::: details

- “群主”只是客户端角色而非服务端组件：分配计算在群主客户端完成，Coordinator 只中转，这让分配策略可由客户端自定义（实现 `ConsumerPartitionAssignor`）。
- 群主宕机会在下次 rebalance 时重新选出（第一个 JoinGroup 的存活成员）；心跳超时判定由 Coordinator 负责，0.10.1 后心跳已独立于 poll 由后台线程发送。

:::

#### 🏭 实战场景

::: details

**场景（推演）**：某订单消费组 8 个实例、订阅 64 分区，滚动发布期间每个实例重启都触发一次 Eager 再均衡，单轮全组停消费约 10~20s，叠加发布期流量增长，lag 从近 0 涨到约 50 万条，追平耗时约 15 分钟。

**处置**：① 升级客户端改用 `CooperativeStickyAssignor`，发布期仅迁移受影响分区，停消费窗口缩短到秒级；② 配置 `group.instance.id` + `session.timeout.ms=45s`，实例滚动重启在会话超时前回来即可保留原分配，不触发再均衡；③ 发布窗口错峰并限速重启。事后发布期 lag 峰值控制在万级以内。（数据为推演示例，非真实生产数据）

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “再均衡时只有被迁移的分区停消费” → 错（经典 Eager 协议）。默认协议下全组所有分区先撤销再重分，期间全部停消费；只有 Co-operative 协议才是增量迁移。
- ❌ “心跳停了就是 poll 没调” → 错。0.10.1 起心跳由独立线程发；被踢更常见的原因是两次 poll 间隔超过 `max.poll.interval.ms`（处理太慢），与心跳无关。

:::

#### 🔀 发散问题

**Q1：Coordinator 宕机会影响再均衡吗？**
A：Coordinator 只是某 Broker 上的角色，其所在 Broker 宕机后，`__consumer_offsets` 对应分区会选出新 Leader，新 Broker 接管 Coordinator；消费者会短暂报 `GROUP_COORDINATOR_NOT_AVAILABLE` 后自动重连。

**Q2：为什么每个消费者只能看到自己的分配？**
A：这是为了简化客户端状态与隐私边界：消费者只需管好自己分区的拉取与提交；全局视图集中在群主，减少元数据广播开销。

**Q3：如何减少再均衡的负面影响？**
A：见本文档『分区再均衡存在什么问题？如何避免分区再均衡？』。

### 【困难】分区再均衡存在什么问题？如何避免分区再均衡？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 分区再均衡

#### 💎 关键结论

再均衡三大代价：全组停消费、集群开销增加、可能引发重复/丢失。避免思路不是“禁止”，而是“少触发 + 降影响”：稳住成员、调好超时、用粘性/增量分配。

#### ⚡记忆卡片

- **口诀**：停消费、增开销、生重复，稳成员、调超时、用粘性
- **关键词**：消费中断 ／ heartbeat.interval.ms ／ session.timeout.ms ／ StickyAssignor ／ 静态成员
- **链路**：成员/分区变动 → 触发再均衡 → 全组停消费 + 状态重建 → 重复消费/提交失败风险 → 用稳定成员与增量分配降影响

#### 📖 核心知识

分区再均衡存在以下问题：

- **消费中断**：分区再均衡过程中，所有消费者会停止消费。
- **性能开销**：涉及状态更新、选举、分配计算等操作，频繁触发会增加集群负载，降低吞吐量。
- **数据风险**：通信或处理异常可能导致消息重复消费（未提交偏移量被重拉）或丢失（偏移量提交失败）。

避免分区再均衡的思路：

- **合理设置消费者组和消费者数量**
  - **稳定消费者组规模**：避免频繁地添加或移除消费者，保持消费者组内成员的相对稳定性。在规划业务时，根据预计的消息流量和处理能力，提前确定合适的消费者数量，并在系统运行过程中尽量减少不必要的消费者增减操作。
  - **匹配消费者与分区数量**：确保消费者数量与主题的分区数量相匹配，避免消费者数量远大于或远小于分区数量的情况。一般来说，建议消费者数量等于或略小于分区数量，以充分利用分区的并行处理能力，同时避免因消费者数量过多导致频繁的再均衡。
- **优化消费者心跳和会话超时参数**
  - **调整心跳间隔**：通过适当增加 `heartbeat.interval.ms` 参数的值（默认值为 3000 毫秒），减少消费者向协调器发送心跳的频率，降低因网络波动等原因导致的虚假心跳超时情况，从而减少因消费者被误判为故障而触发的再均衡。但需要注意，该值不能设置过大，否则可能会延长协调器检测到消费者真正故障的时间。
  - **延长会话超时时间**：增大 `session.timeout.ms` 参数的值（默认范围是 10000 - 30000 毫秒），可以增加消费者会话的有效时间，降低消费者因短暂的网络延迟或其他异常情况导致会话超时，进而触发再均衡的概率 。不过，设置过长的会话超时时间可能会导致故障消费者长时间占用分区资源，影响消息的及时处理。
- **避免主题分区数量频繁变动**
  - **合理规划主题分区**：在创建主题时，根据业务的发展趋势和预计的消息流量，准确评估所需的分区数量，并尽量一次性设置到位，避免在系统运行过程中频繁地增加或减少分区 。如果确实需要调整分区数量，建议在业务低峰期进行，并提前做好充分的测试和预案。
  - **采用分区预分配策略**：对于一些可预测的业务增长情况，可以提前为主题分配足够的分区，避免因临时增加分区而触发再均衡。同时，在进行分区调整时，可以采用逐步调整的方式，例如每次只增加少量分区，分阶段完成分区的扩展，以减少对系统的冲击。
- **使用粘性分区分配策略**：Kafka 的 Sticky 分区分配策略会尽量保持上一次的分区分配结果，在动态环境中（如消费者的加入或离开），仅对必要的分区进行重新分配，减少再均衡的范围和频率 。通过将 `partition.assignment.strategy` 参数设置为 `org.apache.kafka.clients.consumer.StickyAssignor`，可以启用该策略，降低再均衡对系统造成的影响。

#### 🔬 扩展知识

**【L3】静态成员（Static Membership）避免发布期再均衡**

::: details

- 配置 `group.instance.id` 后，实例短暂离开（在 `session.timeout.ms` 内回来）不会触发 rebalance，分区保留给原身份；滚动发布重启通常几十秒，配 45s 会话超时即可完全躲开再均衡。
- 注意：同一 `group.instance.id` 同时出现两个活跃成员会被 Coordinator 拒绝（`DUPLICATE_INSTANCE_ID`），所以实例身份必须与部署单元绑定。

:::

**【L4】增量再均衡与 `max.poll.interval.ms` 的联动**

::: details

- 2.4+ 的 Co-operative 再均衡（`CooperativeStickyAssignor`）分多轮完成：先撤需要迁移的分区，其余继续消费，把“全组停”变成“局部停”。
- 慢处理导致的连环再均衡（处理慢 → 超 `max.poll.interval.ms` 被踢 → rebalance → 重复消费更慢）是典型死循环，处置：临时调大 `max.poll.interval.ms` 或减小 `max.poll.records`，让单批处理时间回到阈值内。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “调大心跳间隔能避免所有再均衡” → 错。心跳只影响“成员存活判定”这一类触发；分区数变化、订阅变化、慢处理被 `max.poll.interval.ms` 踢出都与心跳无关。
- ❌ “消费者越多越好，反正会自动均衡” → 错。超过分区数的消费者纯闲置，频繁扩缩容反而制造更多再均衡；消费者数应等于或略小于分区数。

:::

#### 🔀 发散问题

**Q1：再均衡期间提交的 offset 会丢吗？**
A：已提交到 `__consumer_offsets` 的不会丢；风险在于“已处理未提交”的消息在分区易主后被新主人重拉，产生重复；所以再均衡前可在 `ConsumerRebalanceListener.onPartitionsRevoked` 里同步提交一次。

**Q2：如何监控再均衡频率？**
A：客户端关注 rebalance 日志与 `rebalance-latency`、`failed-rebalance-total` 指标；服务端看 group 状态在 `Stable/PreparingRebalance` 间反复切换；频繁再均衡应视为故障而非正常现象。

### 【困难】Kafka 的 ISR 在什么场景下收缩？ISR 收缩有什么影响？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / ISR

#### 💎 关键结论

ISR 是动态集合：Follower 落后 Leader 超过阈值就被踢出，追上又回来。频繁收缩是集群健康的早期警报：它直接削弱 `acks=all` 的保护，甚至让写入被拒。把它当故障信号处理，别当正常抖动。

#### ⚡记忆卡片

- **口诀**：落后踢出、追上回队、缩到单点、acks 失效
- **关键词**：replica.lag.time.max.ms ／ UnderReplicatedPartitions ／ min.insync.replicas ／ NotEnoughReplicas
- **链路**：Follower 慢（磁盘/网络/GC） → 落后超阈值被踢出 ISR → 可靠性下降，写入可能被拒 → 追上后又回 ISR

#### 📖 核心知识

ISR 是一个动态集合：Follower 落后 Leader 超过 `replica.lag.time.max.ms`（默认 10s，新版本默认 30s）未追上即被踢出 ISR，追上后又重新加入。**ISR 频繁收缩（Under Replicated）是生产环境的典型告警信号**。

**常见收缩场景**

1. **Follower 机器性能问题**：磁盘 IO 打满、CPU 高负载、长时间 GC，导致拉取不及时。
2. **网络问题**：Broker 间带宽打满或网络抖动。
3. **Leader 写入流量过大**：写入速率远超 Follower 复制速率。
4. **Broker 上副本过多**：单 Broker 承载过多分区副本，Fetch 线程/带宽竞争。
5. **Follower JVM 堆不足**：Fetch 请求排队，拉取延迟增大。

**ISR 收缩的影响**

- **可靠性下降**：`acks=all` 时消息提交依赖 ISR 全部副本写入，ISR 收缩意味着数据保障副本变少；若 `min.insync.replicas` 条件不满足，**生产者会收到 NotEnoughReplicas 错误，写入被拒绝**。
- **可用性与丢数据的两难**：ISR 为空时 Leader 宕机，允许 Unclean 选举则丢数据，禁止则分区不可用。
- **频繁 Leader 切换**：ISR 频繁变动叠加 Leader 再均衡，可能引发分区抖动。

**应对措施**

- 监控 `UnderReplicatedPartitions` 指标，持续大于 0 立即告警。
- 合理设置参数：`min.insync.replicas` = 副本数 - 1；适当调大 `replica.lag.time.max.ms` 可减少误判，但会削弱敏感度。
- 治本之道：大流量 Topic 磁盘隔离、扩容带宽、避免同 Broker 承载过多副本。

> **一句话总结**：ISR 频繁收缩是集群健康的早期警报，UnderReplicated 分区告警应和错误告警同等对待。

#### 🔬 扩展知识

**【L3】ISR 收缩与 acks=all 的联动失效**

::: details

- `acks=all` 的“all”指当时 ISR 全部副本；若 `min.insync.replicas=1`（默认）且 ISR 收缩到只剩 Leader，acks=all 退化为写单副本，Leader 宕机即丢。所以 acks=all 必须与 `min.insync.replicas≥2` 配套，详见《MQ面试》『如何保证 MQ 消息不丢失？』。
- ISR 收缩还可能触发 Producer 端重试风暴：写入被拒后重试叠加元数据刷新，进一步压垮集群，形成恶性循环。

:::

**【L4】定位 ISR 抖动的排查顺序**

::: details

- 先看范围：单 Broker 上的分区集体收缩 → 该 Broker 自身问题（磁盘/GC/网卡）；跨 Broker 零散收缩 → 网络或流量突增。
- 再看指标：Follower 的 `ReplicaFetcherManager` 拉取延迟、磁盘 util、GC 日志、`replica.lag.time.max.ms` 命中次数；最后看 Leader 端写入速率是否突增导致复制追不上。

:::

#### 🏭 实战场景

::: details

**场景（推演）**：某集群 3 副本、`min.insync.replicas=2`，某台 Broker 磁盘老化，写入延迟 P99 从 5ms 恶化到 80ms，其上数百个 Follower 持续落后超 30s 被踢出 ISR，`UnderReplicatedPartitions` 持续 > 200；期间若叠加另一台 Broker 重启，部分分区 ISR 仅剩 1，Producer 报 `NotEnoughReplicas`，写入被拒约 2 分钟。

**处置**：① 短期调大该慢盘 Broker 的 `replica.lag.time.max.ms` 到 60s 减少抖动踢出；② 用 `kafka-reassign-partitions` 把热点分区副本迁到健康盘；③ 建立磁盘延迟与 UnderReplicated 联动告警，磁盘 P99 > 50ms 即预警。（数据为推演示例，非真实生产数据）

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “ISR 收缩只是告警，不影响业务” → 错。它直接降低 `acks=all` 的保障副本数，叠加 `min.insync.replicas` 不满足时写入直接被拒，且 Leader 宕机时可选新主变少。
- ❌ “把 `replica.lag.time.max.ms` 调到很大就能根治” → 错。只是把“踢出”推迟了，真正落后太多的副本依然选不得主；治本要解决磁盘/网络/GC 瓶颈。

:::

#### 🔀 发散问题

**Q1：Follower 被踢出后重新加入的条件是什么？**
A：追上 Leader 且连续落后不超过 `replica.lag.time.max.ms`；注意是“时间”而非“偏移量差”，所以追赶中的 Follower 即使还差很多消息，只要能持续拉取最新数据就算同步。

**Q2：为什么 min.insync.replicas 设成副本数会怎样？**
A：设成等于副本数时，任一副本挂掉即无法满足写入条件，整分区不可写；推荐 `replication.factor = min.insync.replicas + 1`，兼顾可靠与可用。

### 【困难】在 Kafka 中，如何实现多集群的数据同步？跨集群复制的实现原理是什么？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 跨集群复制

#### 💎 关键结论

跨集群复制的官方答案是 MirrorMaker：本质就是「消费者 + 生产者」的搬运工，从源集群消费、往目标集群重写。MM2 解决了 MM1 配置难、无偏移映射的痛点，是当前推荐方案。

#### ⚡记忆卡片

- **口诀**：消费源、写目标，MM2 推荐，盯 lag 和吞吐
- **关键词**：MirrorMaker ／ MirrorMaker 2 ／ consumer-lag ／ 断点续传 ／ 复制延迟
- **链路**：Consumer 从源集群拉取 → Producer 写入目标集群 → 目标集群生成新 offset → 监控 lag 与吞吐保同步

#### 📖 核心知识

**MirrorMaker 是 Kafka 官方的跨集群复制方案**。

- **功能**：Kafka 官方的跨集群数据复制工具，实现**源集群 → 目标集群**的数据同步。
- **原理**：基于**消费者-生产者模型**。
  - **Consumer**：从源集群拉取数据。
  - **Producer**：向目标集群推送数据。
- **版本**
  - **MirrorMaker 1.0**：基础复制，配置复杂，单线程有性能瓶颈。
  - **MirrorMaker 2.0 (推荐)**：支持双向同步、自动同步 Topic 配置、偏移量同步等高级特性。
- **要点**
  - **数据一致性**：保证**消息顺序**，但存在**复制延迟**（受网络和负载影响）。
  - **容错性**：通过消费者组机制，故障恢复后可**断点续传**。
  - **性能瓶颈**：MM 1.0 为单线程，高吞吐场景需部署**多个实例**进行横向扩展。
  - **核心监控**：重点关注 **consumer-lag**（消费延迟）和 **producer-throughput**（生产吞吐量）。

**替代工具**

- **Confluent Replicator**：企业级商业工具，功能全面（如 Schema 同步）。
- **uReplicator**：开源方案，针对高可用和低延迟优化。

#### 🔬 扩展知识

**【L3】MirrorMaker 2 的关键改进**

::: details

- MM2（2.4 起内置）基于 Kafka Connect 框架重写：自动同步 Topic 与配置、支持 Active-Active 双向复制（Topic 名加源集群前缀防循环复制）、提供 offset 转换工具（把源集群位点映射到目标集群，切换消费组时不重消费/不漏消费）。
- 跨机房容灾切换时，用 MM2 的 `__consumer_offsets` 内部主题映射能力尽量接近“无缝切流”，但仍需接受秒级~分钟级复制延迟带来的少量重复或延迟窗口。

:::

**【L4】复制链路的顺序与幂等边界**

::: details

- MM 保证同分区内顺序（源分区 → 目标分区内有序），但目标集群的 offset 与源集群不一致，跨集群对账不能直接用 offset。
- 故障恢复后 MM 从自身位点继续（断点续传），但极端情况下可能重复复制，下游消费仍需幂等。

:::

> 📚 延伸阅读：[Kafka 官方文档 - Geo-Replication（MirrorMaker 2）](https://kafka.apache.org/documentation/#georeplication)

#### 🔀 发散问题

**Q1：容灾切换后消费位点怎么办？**
A：目标集群 offset 与源集群不同，切换时用 MM2 的 offset translate 工具把源位点换算到目标集群对应位置，或保守起见从更早位点重消费配合下游幂等去重。

**Q2：为什么不直接用多副本跨集群？**
A：副本同步是强耦合的写路径，跨机房网络延迟会直接拖慢生产端 acks；MirrorMaker 是异步解耦复制，容许延迟但不影响源集群写入性能。

### 【困难】Kafka 的 Controller Failover 是如何设计的？在 Controller 宕机时如何进行故障恢复？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / Controller

#### 💎 关键结论

Controller Failover 靠 ZooKeeper 的临时节点：谁先创建 `/controller` 谁当 Controller，宕机会话断连节点自动删除，其他 Broker 闻风争抢。新 Controller 用更大的 epoch 接管，避免脑裂。

#### ⚡记忆卡片

- **口诀**：临时节点抢当家，宕机节点自动删，新主 epoch 大一岁，接管元数据再继续
- **关键词**：`/controller` 临时节点 ／ watch ／ controller epoch ／ 故障转移
- **链路**：Controller 宕机 → ZK 会话断开临时节点删除 → 存活 Broker 争抢创建 /controller → 新 Controller 获更大 epoch → 重建状态接管集群

#### 📖 核心知识

Kafka 的 Controller 是集群中负责管理各种元数据（如主题创建、分区分配、副本分配等）以及协调领导者选举的关键组件。Controller Failover 是 Kafka 保证高可用性的重要机制。具体来讲，当 Controller 宕机时，Kafka 会通过 Zookeeper 选举出一个新的 Controller，以确保集群可以继续正常运行。

以下是 Kafka Controller Failover 的主要设计和流程：

1. Zookeeper 作为协调者：每个 Kafka Broker 启动时都会尝试在 Zookeeper 中创建一个特殊的节点（`/controller`）。因为这个节点使用的是 Ephemeral（临时）节点类型，当创建该节点的 Broker 宕机时，这个节点会自动删除。
2. 竞争成为 Controller：一旦当前的 Controller 宕机，所有活着的 Broker 都会尝试在 Zookeeper 中创建 `/controller` 节点。第一个成功创建这个节点的 Broker 会成为新的 Controller，剩下的则会收到失败通知。
3. 通知机制：新的 Controller 会在 Zookeeper 中写入它的选举结果，并通过监听机制通知所有 Broker。这些 Broker 会更新它们本地的 Controller 缓存，从而指向新的 Controller。
4. 恢复任务：新当选的 Controller 需要快速完成集群状态的接管，包括重新分配分区副本、添加主题、调整副本同步等等。这些操作通过监听 Zookeeper 节点和操作 Kafka 内部 Topic（如 `__controller_epoch`、`__consumer_offsets` 等）完成。

#### 🔬 扩展知识

**【L3】epoch 防脑裂的具体作用**

::: details

- 新 Controller 通过 ZooKeeper 的条件递增操作获得一个更大的 controller epoch，并把它携带在发往各 Broker 的命令中；旧 Controller（若因网络分区“诈尸”）发出的消息 epoch 更小，会被 Broker 直接忽略，避免双主同时发号施令。
- “脑裂”指两个节点同时认为自己是当前控制器；epoch 单调递增是分布式系统解决此类问题的经典手段。

:::

**【L4】KRaft 模式下的 Failover 差异**

::: details

- KRaft（2.8 预览、3.3 生产可用、4.0 移除 ZK）中 Controller 组成独立 Quorum，用 Raft 协议选举 Leader Controller：不再依赖 ZK 临时节点与 watch，故障恢复从秒级缩短到亚秒级，且元数据通过日志复制同步而非 watch 推送。
- 迁移注意：KRaft 模式下 Controller 角色可与 Broker 合并部署（combined）或分离部署（separated），生产推荐分离。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Controller 宕机会导致消息读写中断” → 错。Controller 只管元数据与选举，数据读写走分区 Leader；Controller 短暂缺失只影响新 Topic 创建、Leader 重选等管控面操作。
- ❌ “Controller 是独立部署的特殊进程” → 错（ZK 模式下）。Controller 就是普通 Broker 之一，通过抢临时节点当选；KRaft 模式下才有专职 Controller 节点。

:::

#### 🔀 发散问题

**Q1：新 Controller 接管后第一件事做什么？**
A：从 ZooKeeper（或 KRaft 元数据日志）读取全量集群元数据重建内存状态，包括存活 Broker、所有分区的副本分配与 ISR，然后才能处理后续的 Leader 选举等事件。

**Q2：为什么用“第一个成功创建节点”而不是投票选举？**
A：ZooKeeper 的创建操作本身是线性化的（同一时刻只有一个能成功），天然提供了互斥性，无需再实现一套投票协议，简单可靠。

### 【困难】Kafka 中的 Controller 工作原理是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / Controller

#### 💎 关键结论

Controller 是集群的“大管家”：一个 Broker 兼任，负责分区 Leader 选举、元数据管理与状态同步。ZK 模式下靠临时节点选主，KRaft 模式下变成 Raft 共识的专职 Controller 节点。

#### ⚡记忆卡片

- **口诀**：一 Broker 当管家，选主分元管状态，epoch 防脑裂
- **关键词**：Controller ／ Leader 选举 ／ 元数据管理 ／ controller epoch ／ KRaft
- **链路**：Broker 争抢当选 Controller → 监听 Broker/分区状态变化 → 触发分区 Leader 选举与元数据更新 → 向全集群同步元数据

#### 📖 核心知识

Kafka 中的 Controller 是整个集群的协调者，它是专门负责监控和管理 Kafka 集群中分区（partition）和副本（replica）状态的节点。在整个 Kafka 集群中，Controller 的角色是至关重要的，它帮助集群维持稳定，确保分区和副本的可用性和一致性。

**Controller 的作用**

**控制器（Controller）**，是 Apache Kafka 的核心组件。它的**主要作用是基于 ZooKeeper 管理和协调整个 Kafka 集群**。控制器其实就是一个 Broker，只不过它除了具有一般 Broker 的功能以外，还负责 Leader 的选举。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/3ff8312cefef44b6a95ac3405215f172.png)

Controller 在集群中的主要作用包括：

- **分区 Leader 选举**：确定哪个副本成为分区的 Leader 来处理读写请求。
- **元数据管理**：管理所有 Topic、Partition 的创建、删除和副本分配方案。
- **状态维护**：维护 Partition 的 ISR（同步副本）列表，处理副本的加入与移除。
- **分区迁移**：如果某个 broker 出现故障，Controller 负责重新分配其上的分区到其他可用 Broker 上。
- **集群协调**：感知 Broker 的上下线，并触发相应的元数据更新和负载均衡。
- **信息同步**：向所有 Broker 同步最新的集群元数据。

**如何选举控制器**

集群中任意一台 Broker 都能充当控制器的角色，但是，在运行过程中，只能有一个 Broker 成为控制器，行使其管理和协调的职责。实际上，Broker 在启动时，会尝试去 ZooKeeper 中创建 `/controller` 节点。Kafka 当前选举控制器的规则是：**第一个在 ZooKeeper 成功创建 `/controller` 临时节点的 Broker 会被指定为控制器**。

选举控制器的详细流程：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/0d86e292214d441986cdc9ea979d4446.png)

1. 第一个在 ZooKeeper 中成功创建 `/controller` 临时节点的 Broker 会被指定为控制器。
2. 其他 Broker 在控制器节点上创建 Zookeeper watch 对象。
3. 如果控制器被关闭或者与 Zookeeper 断开连接，Zookeeper 临时节点就会消失。集群中的其他 Broker 通过 watch 对象得到状态变化的通知，它们会尝试让自己成为新的控制器。
4. 第一个在 Zookeeper 里创建一个临时节点 `/controller` 的 Broker 成为新控制器。其他 Broker 在新控制器节点上创建 Zookeeper watch 对象。
5. 每个新选出的控制器通过 Zookeeper 的条件递增操作获得一个全新的、数值更大的 controller epoch。其他节点会忽略旧的 epoch 的消息。
6. 当控制器发现一个 Broker 已离开集群，并且这个 Broker 是某些 Partition 的 Leader。此时，控制器会遍历这些 Partition，并用轮询方式确定谁应该成为新 Leader，随后，新 Leader 开始处理生产者和消费者的请求，而 Follower 开始从 Leader 那里复制消息。

简而言之，**Kafka 使用 Zookeeper 的临时节点来选举控制器，并在节点加入集群或退出集群时通知控制器。控制器负责在节点加入或离开集群时进行 Partition Leader 选举。控制器使用 epoch 来避免“脑裂”，“脑裂”是指两个节点同时被认为自己是当前的控制器**。

#### 🔬 扩展知识

**【L3】Controller 的状态感知与事件处理**

::: details

- ZK 模式下 Controller 通过监听 ZooKeeper 上其他节点的变化来感知集群状态（如 Broker 下线），并执行相应操作；所有 Broker 启动时都会创建和开启 Coordinator/Controller 相关组件，但 Controller 角色全集群唯一。
- Controller 内部用事件队列串行处理元数据变更（创建 Topic、扩分区、Broker 下线等），避免并发修改元数据产生不一致。

:::

**【L4】KRaft 模式下的 Controller 架构**

::: details

- **去 ZooKeeper 依赖**：Kafka 使用内置的 **Raft 共识算法** 来管理元数据。
- **角色分离**：有专门的 Controller 节点（构成 Quorum）进行元数据管理，与负责数据存取的 Broker 节点分离。
- **共识保障**：通过 Raft 算法在 Controller 节点间自动完成 Leader 选举和元数据同步，更高效、可扩展性更强；元数据存于内部主题 `__cluster_metadata`，Broker 通过拉取日志获取变更。

:::

#### 🔀 发散问题

**Q1：Controller 和普通 Broker 的分工边界在哪？**
A：数据面（消息读写、副本同步）全由普通 Broker 处理，Controller 只管控制面（元数据、选举、分配）；所以 Controller 切换不影响存量分区的读写。

**Q2：为什么分区 Leader 选举由 Controller 统一做？**
A：集中式选举避免各 Broker 各自为战导致同一分区选出多个 Leader（脑裂）；Controller 掌握全局 ISR 视图，能做出一致的选主决策，并用 epoch 保证命令的新旧可辨。

### 【困难】Kafka 如何实现高可用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 高可用

#### 💎 关键结论

Kafka 高可用 = 数据冗余（多副本） + 自动容灾（Leader 自动切换） + 灵活一致性（ACK + ISR 按需权衡）。单 Broker 挂了，分区 Leader 从 ISR 里自动换人，业务基本无感。

#### ⚡记忆卡片

- **口诀**：多副本打底，ISR 选主，Controller 调度，ACK 定可靠
- **关键词**：多副本 ／ Leader 选举 ／ ISR ／ Controller ／ acks
- **链路**：故障检测（ZK/KRaft） → Controller 感知 Broker 下线 → 从 ISR 选新 Leader → 分区继续读写 → 元数据同步全集群

#### 📖 核心知识

- **数据冗余**：多副本存储，防止单点数据丢失。
- **自动容灾**：Leader 自动切换 + 分区再均衡，减少人工干预。
- **灵活一致性**：通过 ACK 和 ISR 机制适配不同业务场景（如高吞吐或强一致性）。

**核心机制**

- **多副本机制**
  - 每个分区（Partition）有多个副本，分布在不同的 Broker 上，确保数据冗余。
  - 副本分为 **Leader**（处理读写请求）和 **Follower**（同步数据）。
- **主从架构**
  - 生产者和消费者仅与 Leader 副本交互。
  - 当 Leader 宕机时，从 Follower 副本中选举新 Leader，保证服务连续性。
- **ZooKeeper 协调**
  - 管理集群元数据（如 Broker 状态、分区 Leader 信息）。
  - 检测 Broker 故障并触发 Leader 选举。

**故障恢复流程**

- **故障检测**：ZooKeeper 发现 Broker 宕机。
- **Leader 选举**：从 ISR（同步副本集）中选出新 Leader。
- **分区再均衡**：将宕机 Broker 的分区重新分配到其他可用 Broker。

**支撑技术**

- **ISR（In-Sync Replicas）**：仅与 Leader 保持同步的副本可参与 Leader 选举，确保数据一致性。
- **ACK 确认机制**：生产者可配置不同级别的确认（如 `0`、`1`、`all`），平衡吞吐量与数据可靠性。
- **控制器（Controller）**：集群中一个 Broker 担任控制器，负责分区 Leader 选举和状态管理。控制器故障时，ZooKeeper 重新选举新控制器。
- **惰性故障检测**：避免短暂故障导致的频繁 Leader 切换，通过延迟判断减少集群波动。

#### 🔬 扩展知识

**【L3】高可用配置的“铁三角”**

::: details

- `replication.factor=3` + `min.insync.replicas=2` + `unclean.leader.election.enable=false`（0.11+ 默认）是业务 Topic 的标准答案：容忍单副本故障不丢数据，且只从 ISR 选主。
- 跨机架部署（`broker.rack`）把故障域从机器提升到机柜：单机架断电时仍能凑齐 min.insync.replicas。

:::

**【L4】消费端与生产端的高可用盲区**

::: details

- 服务端高可用不等于端到端高可用：生产端不开 acks=all/重试会丢，消费端自动提交会丢/重，两端配置需配套，详见《MQ面试》『如何保证 MQ 消息不丢失？』。
- KRaft 模式（3.3 生产可用）进一步消除了 ZK 集群这个外部单点：元数据由 Controller Quorum 的 Raft 多数派保障，整套系统自包含。

:::

#### 🏭 实战场景

::: details

**场景（推演）**：某集群 5 台 Broker、核心 Topic 3 副本，某台 Broker 宕机：Controller 在秒级内感知（ZK 临时节点失效/KRaft 心跳超时），将其上约 200 个 Leader 分区在其余 Broker 的 ISR 中重新选主，生产端短暂报 `NOT_LEADER_OR_FOLLOWER` 后自动刷新元数据重连，业务中断约 10~30s；宕机 Broker 上的 Follower 副本由 Controller 在其他存活 Broker 上补建新副本，逐步回到 3 副本。

**关键点**：选主只从 ISR 出，数据零丢失；若同时挂两台且某分区 ISR 不足 min.insync.replicas，该分区拒写但不丢数据。（数据为推演示例，非真实生产数据）

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Kafka 多副本是同步复制，所以强一致” → 错。Follower 是异步拉取复制，Kafka 用 ISR + HW 界定“已提交”，而非强同步；同步程度由 acks 与 min.insync.replicas 配置决定。
- ❌ “Broker 宕机后副本数自动恢复原样” → 半对。Controller 会在其他 Broker 上补建副本，但需要时间重新同步数据；期间该分区容错能力下降，需尽快修复或扩容。

:::

#### 🔀 发散问题

**Q1：Kafka 高可用和 RocketMQ 主从有何区别？**
A：Kafka 副本可自动切换 Leader（ISR 选主），主从角色动态；RocketMQ 4.x 及之前从节点不可写、主挂了不自动切换（5.0 引入 Controller 支持自动切换）。

**Q2：整个集群过半 Broker 宕机会怎样？**
A：取决于分区副本分布：某分区 ISR 全灭且禁 unclean 时该分区不可用（保数据）；开启 unclean 则可能丢数据换可用。所以容量规划要保证任意可容忍故障下 ISR 仍满足 min.insync.replicas。

### 【中等】ZooKeeper 在 Kafka 中的作用是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / ZooKeeper

#### 💎 关键结论

ZooKeeper 是 Kafka 2.8 之前版本的“大脑”：存元数据、选 Controller、感知 Broker 故障。注意它是“管控面”依赖——ZK 短暂抖动不直接影响存量消息读写，但无法选主和变更元数据。

#### ⚡记忆卡片

- **口诀**：存元数据、选控制器、盯 Broker、记配置
- **关键词**：临时节点 ／ /broker/ids ／ Controller 选举 ／ watch ／ \_\_consumer_offsets
- **链路**：Broker 启动注册临时节点 → ZK 用 watch 通知变更 → Controller 选举与故障感知 → 元数据变更下发集群

#### 📖 核心知识

ZooKeeper 在 Kafka 中扮演着**核心的协调者角色**，主要负责集群的元数据管理、Broker 协调和状态维护。Zookeeper 是 Kafka 2.8 之前版本的“大脑”，承担关键协调职能；2.8 起 KRaft 模式逐步取代 ZooKeeper，3.3 生产可用，4.0 彻底移除 ZooKeeper 支持。

**Zookeeper 的核心作用**

| **功能**               | **说明**                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| **管理 Broker 元数据** | 维护 Broker 注册信息（在线/离线状态）；Broker 的 ID、主机名、端口等元数据；Topic/Partition 元数据 |
| **Controller 选举**    | 通过临时节点（Ephemeral ZNode）选举集群唯一 Controller，负责分区 Leader 选举                      |
| **故障恢复**           | 监测节点故障并触发分区 Leader 重选举                                                              |
| **消费者组 Offset**    | 旧版本（≤0.8）将消费者 Offset 存储在 Zookeeper，新版本改用内部主题 `__consumer_offsets`。         |
| **配置中心**           | 存储 Kafka 配置和拓扑信息                                                                         |

**Kafka 在 ZooKeeper 的关键存储信息**

**Kafka 使用 Zookeeper 来维护集群成员的信息**。每个 Broker 都有一个唯一标识符，这个标识符可以在配置文件里指定，也可以自动生成。在 Broker 启动的时候，它通过创建**临时节点**把自己的 ID 注册到 Zookeeper。Kafka 组件订阅 Zookeeper 的 `/broker/ids` 路径，当有 Broker 加入集群或退出集群时，这些组件就可以获得通知。

如果要启动另一个具有相同 ID 的 Broker，会得到一个错误——新 Broker 会试着进行注册，但不会成功，因为 ZooKeeper 中已经有一个具有相同 ID 的 Broker。

在 Broker 停机、出现网络分区或长时间垃圾回收停顿时，Broker 会与 ZooKeeper 断开连接，此时 Broker 在启动时创建的临时节点会自动被 ZooKeeper 移除。监听 Broker 列表的 Kafka 组件会被告知 Broker 已移除。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/134313cedc064cbb934291b9af2226c8.png)

- `admin`：存储管理信息。主要为删除主题事件，分区迁移事件，优先副本选举，信息 (一般为临时节点)
- `brokers`：存储 Broker 相关信息。broker 节点以及节点上的主题相关信息
- `cluster`：存储 kafka 集群信息
- `config`：存储 broker，client，topic，user 以及 changer 相关的配置信息
- `consumers`：存储消费者相关信息
- `controller`：存储控制器节点信息
- `controller_epoch`：存储控制器节点当前的年龄（说明控制器节点变更次数）

#### 🔬 扩展知识

**【L3】ZooKeeper 两个关键特性为什么被 Kafka 看中**

::: details

- 客户端会话结束时，ZooKeeper 就会删除临时节点——这提供了“故障即感知”的能力，Broker 宕机无需心跳探测框架，临时节点自动消失即是信号。
- 客户端注册监听它关心的节点，当节点状态发生变化（数据变化、子节点增减变化）时，ZooKeeper 服务会通知客户端——Controller 与各 Broker 靠 watch 实现元数据变更的推送。

:::

**【L4】ZK 模式的扩展性天花板**

::: details

- ZK 写路径需要 Quorum 确认且串行，分区数到数十万级时元数据操作（扩分区、Leader 切换）明显变慢；watch 数量与节点数也制约集群规模。
- 这正是 KRaft 的动机：元数据变成 Kafka 自己的追加日志 + Raft 复制，支持百万级分区，详见本文档『Kafka KRaft 模式的工作原理是什么？相比 ZooKeeper 有何优势？』。

:::

> 📚 延伸阅读：[ZooKeeper 原理](https://github.com/dunwu/bigdata-tutorial/blob/master/docs/zookeeper/ZooKeeper原理.md)

#### 🔀 发散问题

**Q1：ZooKeeper 挂了，Kafka 还能收发消息吗？**
A：短时间内可以：存量分区的 Leader 不变，数据读写不依赖 ZK；但无法完成 Controller 选举、新 Topic 创建、Leader 切换，故障时间一长可用性受损。

**Q2：为什么消费者位移从 ZK 搬到内部主题？**
A：0.9 新 Consumer API 后位移提交频率高、量大，写 ZK 成为瓶颈且语义受限；改存 `__consumer_offsets` 后位移本身就是 Kafka 数据，享受分区并行与副本可靠性。

### 【中等】Kafka 为什么要弃用 Zookeeper？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / KRaft

#### 💎 关键结论

弃用 ZooKeeper 一句话：把“大脑”装回自己体内。收益是架构自包含、元数据性能与扩展性大幅提升、运维少一套系统；代价是得等 KRaft 成熟（2.8 预览 → 3.3 生产可用 → 4.0 移除 ZK）。

#### ⚡记忆卡片

- **口诀**：去依赖、提性能、统协议、扩规模
- **关键词**：KRaft ／ Raft ／ 元数据日志 ／ 少一套运维 ／ 百万分区
- **链路**：ZK 是外部依赖且写串行成瓶颈 → KRaft 用 Raft 把元数据变成内部日志 → 架构自包含、元数据更快 → 支持更大规模集群

#### 📖 核心知识

Kafka 弃用 ZooKeeper 主要是为了**简化架构、提升性能、降低运维复杂度**。

**减少外部依赖**

- **架构简化**：ZooKeeper 是独立的外部系统，需额外部署和维护。移除后，Kafka 成为完全自包含的系统，降低部署和运维成本。
- **避免单点风险**：ZooKeeper 本身需要集群化，若出现故障会影响 Kafka 的元数据管理，内嵌治理逻辑可减少此类风险。

**提升扩展性与性能**

- **元数据效率**：ZooKeeper 的写操作（如 Leader 选举）是串行的，可能成为瓶颈。Kafka 内置的 **KRaft 协议**（基于 Raft）支持并行日志写入，显著提升元数据处理速度（如分区扩容、Leader 切换）。
- **降低延迟**：省去与 ZooKeeper 的网络通信，元数据操作（如 Broker 注册、Topic 变更）延迟更低。

**统一元数据管理**

- **一致性模型统一**：ZooKeeper 使用 ZAB 协议，而 Kafka 使用自身的日志复制机制，两者不一致可能导致协调问题。KRaft 模式通过单一协议（Raft）管理所有元数据，逻辑更清晰。
- **简化客户端访问**：旧版客户端需同时连接 Kafka 和 ZooKeeper，新版只需直连 Kafka Broker。

**支持更大规模集群**

**ZooKeeper 的局限性**：ZooKeeper 对节点数量（通常≤7）和 Watcher 数量有限制，影响 Kafka 集群的扩展性。KRaft 模式通过分片和流式元数据传递，支持超大规模集群（如数十万分区）。

**补充说明**

- Kafka 2.8+ 开始实验性支持 KRaft 模式，3.3 生产可用，4.0 彻底移除 ZooKeeper 支持。
- 完全移除 ZooKeeper 需确保 KRaft 在生产环境中的成熟度（如故障恢复、监控工具链完善）。

#### 🔬 扩展知识

**【L3】KRaft 元数据模型的实质变化**

::: details

- ZK 模式：元数据是 ZNode 树，快照式读取 + watch 推送；KRaft 模式：元数据是内部主题 `__cluster_metadata` 的追加日志，事件式回放 + Broker 主动拉取，天然支持增量同步与审计。
- Controller 故障恢复从“重新抢临时节点 + 全量重建状态”变为 Raft 选举 + 日志回放，恢复时间与元数据规模解耦。

:::

**【L4】迁移的实务考量**

::: details

- 3.4+ 提供 ZK 到 KRaft 的在线迁移工具，但迁移涉及元数据转换与回滚预案，应在测试环境充分演练后再上生产。
- 存量客户端基本无感（协议兼容），但依赖 ZooKeeper 工具链（如旧版监控/脚本）的运维体系需同步改造。

:::

> 📚 延伸阅读：[Kafka 官方文档 - KRaft](https://kafka.apache.org/documentation/#kraft)

#### 🔀 发散问题

**Q1：KRaft 模式下还有 Controller 吗？**
A：有，而且更专职：多个 Controller 节点组成 Quorum，用 Raft 选 Leader Controller 管理元数据，与存数据的 Broker 角色分离（也可合并部署）。详见本文档『Kafka 中的 Controller 工作原理是什么？』。

**Q2：为什么不继续优化 ZooKeeper 而要走 KRaft？**
A：ZK 的 ZAB 协议与 watch 模型是通用协调服务的设计，与 Kafka “日志式元数据”的需求不匹配；与其在外部系统上打补丁，不如用 Kafka 自己最擅长的追加日志 + 共识协议重写，还能减少一个运维对象。

## Kafka 可靠传输

### 【中等】在 Kafka 中，如何通过 Acks 配置提高数据可靠性？Acks 的值如何影响性能？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 可靠性

#### 💎 关键结论

acks 是生产者的“可靠性总开关”：0 不等确认最快但可能丢，1 等 Leader 写入居中，all 等 ISR 全部写入最稳但最慢。记住一句：业务消息 acks=all，但必须配套 min.insync.replicas≥2，否则是伪安全。

#### ⚡记忆卡片

- **口诀**：0 不等、1 等主、all 等全队，all 不配 min 是白给
- **关键词**：acks ／ ISR ／ min.insync.replicas ／ NotEnoughReplicas ／ 吞吐延迟权衡
- **链路**：Producer 发消息 → 按 acks 决定等多久确认 → acks=all 需 ISR 全写 + min.insync.replicas 达标 → 不达标拒写（显式失败而非静默丢）

#### 📖 核心知识

**选择原则**：根据业务对数据丢失的容忍度进行权衡配置。

**参数选项**

| 配置值   | 可靠性 | 性能 | 适用场景          |
| -------- | ------ | ---- | ----------------- |
| `0`      | 最低   | 最高 | 实时监控/日志收集 |
| `1`      | 中等   | 中等 | 普通业务场景      |
| `all/-1` | 最高   | 最低 | 金融交易/关键数据 |

- `acks=0`：生产者不等待任何确认，发完就当成功；Broker 未收到也无感知，丢消息风险最高。
- `acks=1`：Leader 写入即确认；若 Leader 写入后、Follower 同步前宕机且新主未含该消息，则丢失。
- `acks=all`：等待 ISR 中所有副本写入后确认；配合 `min.insync.replicas` 决定“至少几个副本写入才算成功”。

**优化建议**

- **可靠性优先**：
  - 设置`acks=all`
  - 配合`min.insync.replicas=2`
  - 禁用`unclean.leader.election.enable=false`
- **性能优先**：
  - 选择`acks=0`或`1`
  - 适当降低`replication.factor`（如 2）

**注意事项**

- 副本数`replication.factor`建议≥3
- 高`acks`值会增加网络和存储压力
- 新版 Kafka 优化了高可靠性配置的性能表现

#### 🔬 扩展知识

**【L3】acks=all 的性能代价到底在哪**

::: details

- acks=all 的确认时间取决于 ISR 中最慢的 Follower：端到端延迟从 acks=1 的约 5ms 级升到约 15~30ms 级（经验值，与网络/磁盘相关），吞吐下降约 30%~50%。
- 代价换的是“多副本页缓存同时存在”的持久性；若某 Broker 磁盘/网络变慢，会直接拖慢所有 acks=all 的写入，需按 Topic 分级承担代价而非全集群一刀切。

:::

**【L4】acks 与幂等、在飞请求的联动**

::: details

- 开启 `enable.idempotence=true` 会强制 `acks=all`、`retries=Integer.MAX_VALUE`，且 `max.in.flight.requests.per.connection≤5` 仍保序——幂等把“可靠 + 保序 + 重试去重”打包了。
- `acks=0/1` 下多在飞请求 + 重试可能乱序；顺序敏感场景要么开幂等，要么把 `max.in.flight.requests.per.connection` 降到 1（吞吐约降 50%）。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “acks=all 就绝对不丢” → 错。ISR 收缩到只剩 Leader 且 min.insync.replicas=1 时，acks=all 退化为写单副本；必须配套 `min.insync.replicas≥2` 与禁 unclean 选主。
- ❌ “acks=1 和 acks=all 只是等得久一点” → 错。两者丢数据的失效路径不同：acks=1 在 Leader 切换窗口丢，acks=all 的退化丢发生在 ISR 收缩时，防护配置也不同。

:::

#### 🔀 发散问题

**Q1：min.insync.replicas 不满足时会怎样？**
A：Producer 收到 `NotEnoughReplicas` 错误，写入被拒——这是把“静默丢”变成“显式失败”，业务应配重试队列兜底而非忽略异常。

**Q2：日志类 Topic 用 acks=1 可以吗？**
A：可以。监控/埋点类数据能容忍少量丢失，用 acks=1 或 0 换吞吐与低延迟；但交易/订单类一律 acks=all 配套。按 Topic 分级配置是正解。

### 【困难】在 Kafka 中，如何实现幂等性 Producer？它对消息处理的意义是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 可靠传输

#### 💎 关键结论

Kafka 0.11+ 只要开启 `enable.idempotence=true`，就能用 PID + Sequence Number 在 Broker 端自动去重生产者的重试消息，顺带保住单分区顺序。理由：它把“重试导致重复”这个最常见的生产端问题在协议层解决，代价仅轻微吞吐下降。

#### ⚡记忆卡片

- **口诀**：开幂等，全确认，无限重试不乱序
- **关键词**：enable.idempotence ／ PID ／ Sequence Number ／ acks=all ／ 0.11+
- **链路**：开启幂等 → 自动强制 acks=all 与无限重试 → Broker 按 <PID, 分区, SeqNum> 去重 → 重试不重复且保序

#### 📖 核心知识

**最佳实践**：幂等性 + 事务 + 合理重试配置，构建高可靠消息系统。

**核心配置**（需 Kafka 0.11+）：

::: details 幂等 Producer 配置示例

```java
Properties props = new Properties();
props.put("enable.idempotence", "true");  // 启用幂等性
props.put("acks", "all");                 // 确保所有副本确认
props.put("retries", Integer.MAX_VALUE);  // 无限重试
```

:::

**关键特性**

| 特性     | 说明             | 优势           |
| -------- | ---------------- | -------------- |
| 消息去重 | 自动过滤重复消息 | 避免数据重复   |
| 顺序保证 | 单分区内消息有序 | 维护数据一致性 |
| 自动重试 | 内置安全重试机制 | 提升可靠性     |

**高级应用：事务支持（配合 Exactly-Once 语义）**

::: details 事务配置示例

```java
props.put("transactional.id", "txn-1");
producer.initTransactions();  // 初始化事务
```

结合幂等性和事务，可确保端到端一次性处理（限于 Kafka→Kafka 链路）。

:::

**使用建议**

- **适用场景**：金融交易、订单处理等关键业务。
- **性能影响**：轻微吞吐量下降，换取数据可靠性。
- **版本要求**：Kafka 0.11+。

#### 🔬 扩展知识

**【L3】幂等的去重原理与边界**

::: details

- 原理：Broker 为每个 Producer 会话分配 PID，每条消息带分区级递增 SeqNum，按 `<PID, 分区, SeqNum>` 判重，重复批次直接丢弃。
- 开启幂等后自动强制 `acks=all`、`retries=Integer.MAX_VALUE`、`max.in.flight.requests.per.connection≤5`，因此在飞重试也不会乱序。
- 边界：只防同一会话内的重试重复；Producer 重启后 PID 变化，跨进程重发仍会重复，需业务唯一键兜底。

:::

> 📚 延伸阅读：[Kafka 官方文档](https://kafka.apache.org/documentation/)

#### 🔀 发散问题

**Q1：幂等 Producer 和事务的关系是什么？**
A：事务依赖幂等：开启 `transactional.id` 会自动启用幂等；幂等只解决单分区重试去重，事务在其上叠加跨分区原子写与位点提交，才能做到 consume-transform-produce 链路的 Exactly-Once。

**Q2：幂等能解决消费端的重复吗？**
A：不能。幂等只作用于生产端写入去重；消费端 rebalance 后的重投仍会重复，需消费端自己用唯一键/去重表做幂等。见《MQ面试》『如何保证 MQ 消息不重复？』。

## Kafka 架构

### 【困难】Kafka 为什么性能高？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 快的本质不是“绕过磁盘”，而是把磁盘用成了内存：顺序追加写 + 页缓存让写入接近内存速度，零拷贝 + 批处理 + 分区并行撑高吞吐。理由：顺序 I/O 下磁盘带宽与内存同一数量级，剩下的开销全被设计消除。

#### ⚡记忆卡片

- **口诀**：顺序写、页缓存、零拷贝、批压缩、分区并行
- **关键词**：顺序 I/O ／ PageCache ／ sendfile ／ 批处理 ／ 分区
- **链路**：追加写限制为顺序 I/O → 写入先落页缓存由 OS 异步刷盘 → 消费用 sendfile 零拷贝直传网卡 → 批处理摊薄网络开销 → 分区并行水平扩展吞吐

#### 📖 核心知识

Kafka 的数据存储在磁盘上，为什么还能这么快？说 Kafka 很快时，通常指的是它高效移动大量数据的能力。Kafka 为了提高传输效率，做了很多精妙的设计。

**（1）顺序 I/O（追加写入）**

磁盘读写有两种方式：顺序读写或者随机读写。在顺序读写的情况下，磁盘的顺序读写速度和内存接近。因为磁盘是机械结构，每次读写都会寻址写入，其中寻址是一个“机械动作”。Kafka 利用了一种分段式的、只追加（Append-Only）的日志，基本上把自身的读写操作限制为**顺序 I/O**，也就使得它在各种存储介质上能有很快的速度。

**（2）零拷贝**

Kafka 数据传输是一个从网络到磁盘，再由磁盘到网络的过程。在网络和磁盘之间传输数据时，消除多余的复制是提高效率的关键。**Kafka 利用零拷贝技术来消除传输过程中的多余复制**。

如果不采用零拷贝，Kafka 将数据同步给消费者的大致流程是：

1. 从磁盘加载数据到 os buffer
2. 拷贝数据到 app buffer
3. 再拷贝数据到 socket buffer
4. 接下来，将数据拷贝到网卡 buffer
5. 最后，通过网络传输，将数据发送到消费者

采用零拷贝技术，Kafka 使用 `sendfile()` 系统方法，将数据从 os buffer 直接复制到网卡 buffer。这个过程中，唯一一次复制数据是从 os buffer 到网卡 buffer。这个复制过程是通过 DMA（Direct Memory Access，直接内存访问）完成的。使用 DMA 时，CPU 不参与，这使得它非常高效。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/9b5da2cfd99e47f4aebadeedb0bad066.webp)

**（3）其他性能设计**

- **页缓存**：Kafka 的数据并不是实时写入磁盘，它充分利用了现代操作系统分页存储来利用内存提高 I/O 效率：把磁盘中的数据缓存到内存中，把对磁盘的访问变为对内存的访问。Kafka 接收来自 socket buffer 的网络数据，应用进程不需要中间处理、直接进行持久化时，可以使用 mmap 内存文件映射。
- **压缩**：Kafka 内置了几种压缩算法，并允许定制化压缩算法。通过压缩算法，可以有效减少传输数据的大小，从而提升传输效率。
- **批处理**：Kafka 的 Clients 和 Brokers 会把多条读写的日志记录合并成一个批次，然后才通过网络发送出去。日志记录的批处理通过使用更大的包以及提高带宽效率来摊薄网络往返的开销。
- **分区**：Kafka 将 Topic 分区，每个分区对应一个名为 Log 的磁盘目录，而 Log 又根据大小分为多个 Log Segment 文件。这种分而治之的策略，使得 Kafka 可以**并发**读，以支撑非常高的吞吐量。此外，Kafka 支持负载均衡机制，将数据分区近似均匀地分配给消费者群组的各个消费者。

#### 🔬 扩展知识

**【L3】量化视角：每个设计到底贡献了多少性能**

::: details

**方案权衡：高吞吐配置 vs 低延迟配置**

| 场景                  | 关键参数                                | 典型值                                           | 效果与代价                                   |
| :-------------------- | :-------------------------------------- | :----------------------------------------------- | :------------------------------------------- |
| 高吞吐（日志/大数据） | `batch.size` + `linger.ms`              | `batch.size=64KB~1MB`、`linger.ms=50~100ms`      | 吞吐提升 3~5 倍，代价是单条延迟增加 50~100ms |
| 低延迟（业务消息）    | `linger.ms` + `acks`                    | `linger.ms=0~5ms`、`acks=1`                      | 延迟毫秒级，吞吐比攒批模式低 3~5 倍          |
| 消费端高吞吐          | `fetch.min.bytes` + `fetch.max.wait.ms` | `fetch.min.bytes=1MB`、`fetch.max.wait.ms=500ms` | 单次拉取更大批次，减少请求次数               |

**各机制的量化贡献（经验值，推演参考）**

- **顺序写**：磁盘顺序写带宽可达数百 MB/s，与内存同一数量级；随机写受寻址限制仅数 MB/s，差距达百倍。
- **页缓存**：写入先落 PageCache（内存速度，亚毫秒级），由 OS 异步刷盘；若强制 `flush.messages=1` 每条 fsync，吞吐从百万级跌至万级。
- **零拷贝**：消费路径从 4 次拷贝 + 4 次上下文切换降为 1 次 DMA 拷贝 + 2 次切换，CPU 占用下降约 50% 以上。
- **批量 + 压缩**：`batch.size` 从默认 16KB 调到 1MB、`linger.ms=100ms`，吞吐可提升 3~5 倍；LZ4 压缩进一步节省约 50% 带宽。
- **分区并行**：吞吐随分区数近似线性扩展，单机 100 分区量级可达百万条/秒；但分区过多（单机数千）会使选主、元数据、文件句柄开销显著上升。

**失效场景：Kafka 什么时候会变慢**

- **消费“冷数据”击穿页缓存**：消费者回溯数天前的数据时，读请求全部命中磁盘随机读，零拷贝优势消失，吞吐可能跌至热数据的 1/10。
- **分区数与消费者数失衡**：单消费者订阅过多分区，poll 循环串行处理，拉取延迟叠加。
- **压缩算法选择不当**：Gzip 压缩比高但 CPU 开销大，CPU 受限机器上换 LZ4/Zstd 吞吐可提升数倍。
- **磁盘 IO 争抢**：副本同步、日志压缩（compaction）、消费读三者共享磁盘带宽，高峰期互相踩踏。

:::

**【L4】batch 参数配套调优的深层逻辑**

::: details

`batch.size` 是批次字节上限，`linger.ms` 是攒批等待上限，两者谁先触发谁生效：只调大 batch.size 而 linger.ms=0，低流量时批次永远攒不满即发出，形同虚设；只调大 linger.ms 而 batch.size 太小，批次很快装满提前发送，白等。高吞吐推荐 `batch.size=1MB` + `linger.ms=50~100ms` 配套，同时预留 `buffer.memory`（默认 32MB，建议翻倍）防阻塞。

:::

> 📚 延伸阅读：[聊聊 Kafka：Kafka 为啥这么快？](https://xie.infoq.cn/article/49bc80d683c373db93d017a99)、[Kafka 官方文档](https://kafka.apache.org/documentation/)

#### 🏭 实战场景

::: details

**踩坑案例：一次“磁盘正常但 Kafka 变慢 10 倍”的排查**（案例为推演示例，用于说明失效链路）

- **现象**：集群写入 TPS 从 30 万跌至 3 万，Producer 端报 `Request timed out`，但磁盘 util 只有 40%。
- **排查**：Broker 指标显示 PageCache 命中率从 95% 跌至 20%；同期上线了一个新消费组在回溯 3 天前的存量数据。
- **根因**：回溯消费把冷数据批量载入页缓存，挤掉了写入链路的热点缓存，写入从内存速度退化为磁盘速度——典型的“读写互相踩踏”。
- **修复**：回溯任务迁到独立集群（或错峰低限速运行）；主集群按“实时写入 vs 离线回溯”职责拆分；建立 PageCache 命中率与生产延迟的联动告警。

**场景题：不加机器把单机写入从 20 万 TPS 提到 80 万**

**场景**：日志采集链路要求单机写入从 20 万 TPS 提升到 80 万 TPS，预算不允许加机器。从哪些维度榨取性能？

- **应急处理**：先确认当前瓶颈：Producer 端看 `record-send-rate` 与请求排队（`buffer.memory` 是否满）、Broker 端看磁盘 util 与 PageCache 命中率、网络带宽是否打满，避免盲目调参。
- **根因分析**：日志场景单条小（约 200B）、容忍秒级延迟，典型的“攒批收益最大”场景；若当前 `linger.ms=0`、`batch.size=16KB`（默认），则请求次数是吞吐的直接上限。
- **长期方案**：按收益排序逐项落地：① `linger.ms=100ms` + `batch.size=1MB`，减少请求次数（预期吞吐 ×3~5）；② 端到端 LZ4 压缩，带宽降约 50%；③ 分区数从 32 提到 128 并同步扩消费者，释放并行度；④ 确认 `acks=1`（日志可接受），避免副本同步延迟叠加；⑤ 磁盘换 NVMe 或多盘 `log.dirs` 分散 IO。每步上线后压测验证，避免一次性全改无法归因。
- **权衡**：攒批引入约 100ms 的额外延迟，日志链路完全可接受；若同样的配置用在交易消息上则不可接受——性能调优的第一步永远是确认业务的延迟容忍度，而不是背参数。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Kafka 快是因为数据不落盘，都在内存里” → 数据最终一定落盘，快的原因是顺序写 + 页缓存让落盘动作被 OS 异步化，而不是不持久化。
- ❌ “为了安全应该每条消息都 fsync” → 强制 `flush.messages=1` 会把吞吐从百万级拉到万级；Kafka 用 `acks=all` 多副本冗余替代昂贵的同步刷盘，单机页缓存丢失风险靠多机对冲。
- ❌ “分区越多吞吐越高，往死里加” → 吞吐随分区数近似线性扩展有前提，单机数千分区会使选主、元数据、文件句柄开销显著上升，反而变慢。

:::

#### 🔀 发散问题

**Q1：为什么 Kafka 不主动频繁 fsync，却仍敢宣称“不丢数据”？**
A：这是“单机持久性”与“副本持久性”的分工：单副本确实可能丢页缓存中未刷盘的数据，但 `acks=all` + `min.insync.replicas=2` 保证同一消息在多台机器的页缓存中同时存在，整机柜同时损毁的概率极低；用副本冗余替代昂贵的同步刷盘，是 Kafka“快且可靠”的核心设计。

**Q2：零拷贝为什么只优化消费路径，生产路径用不上 sendfile？**
A：`sendfile` 的能力是“磁盘→网卡”的直传；而生产路径是“网卡→页缓存”（写入），由 OS 的 DMA 直接完成，本来就不经过用户态拷贝。因此零拷贝的收益集中在消费/Follower 同步这类“读盘发网”的路径上。

**Q3：batch.size 和 linger.ms 应如何配套调优？**
A：两者谁先触发谁生效：只调大 batch.size 而 linger.ms=0，低流量时批次永远攒不满；只调大 linger.ms 而 batch.size 太小，批次很快装满提前发送。高吞吐推荐 `batch.size=1MB` + `linger.ms=50~100ms` 配套，并同步调大 `buffer.memory`（默认 32MB）防阻塞。

### 【困难】Kafka 如何实现流量控制？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 没有传统意义的“限流器”，流量控制靠两端参数摄流 + 缓冲区天然背压：生产端用 buffer.memory 和 max.in.flight 控发送速率，消费端用 fetch 参数控拉取节奏。理由：拉模型下消费者自己决定拉多快，背压是内建的。

#### ⚡记忆卡片

- **口诀**：生产靠缓冲，消费靠 fetch，背压天然成
- **关键词**：buffer.memory ／ max.in.flight ／ fetch.min.bytes ／ fetch.max.wait.ms ／ 背压
- **链路**：生产过快 → buffer.memory 写满阻塞 send → 消费按 fetch 参数控速拉取 → 处理慢则不 poll 形成背压

#### 📖 核心知识

Kafka 通过参数化限速和自适应背压实现多层级流量控制，需根据业务特点（吞吐/延迟/可靠性需求）组合配置。生产环境建议配合监控系统实现动态调节。

**限速控制（Rate Limiting）**

| **组件**   | **关键参数**                            | **控制效果**                       |
| ---------- | --------------------------------------- | ---------------------------------- |
| **生产者** | `max.in.flight.requests.per.connection` | 限制单连接未确认请求数（默认 5）   |
|            | `linger.ms`                             | 批量发送等待时间（0-5000ms）       |
| **消费者** | `fetch.min.bytes`                       | 单次拉取最小数据量（默认 1B）      |
|            | `fetch.max.wait.ms`                     | 拉取请求最长等待时间（默认 500ms） |

**背压机制（Backpressure）**

- **消费者控制**
  - 手动提交偏移量（`enable.auto.commit=false`）。
  - 通过处理进度反馈调节消费速率。
- **系统级缓冲**
  - 生产者缓冲区（`buffer.memory`，默认 32MB），写满后 `send()` 阻塞或抛异常，天然形成生产端背压。
  - 消费者 fetch 队列（`queued.max.messages`，默认 500）。

**高级控制策略**

- **动态限流**：基于监控指标（如 CPU/网络负载）自动调整生产/消费速率。
- **异步批处理**：流处理框架（Flink/Spark）的微批处理优化吞吐量。

**配置建议**

| **场景**   | **优化方向**                  | **典型值**               |
| ---------- | ----------------------------- | ------------------------ |
| 高吞吐场景 | 增大 `linger.ms`+`batch.size` | `linger.ms=50-100ms`     |
| 低延迟场景 | 减小 `fetch.max.wait.ms`      | `fetch.max.wait.ms=10ms` |
| 稳定性优先 | 降低 `max.in.flight.requests` | 设为 1（确保顺序性）     |

#### 🔀 发散问题

**Q1：Broker 端有没有限流手段？**
A：Kafka Broker 本身没有面向客户端的原生限流器（旧版曾有 quota 机制做客户端配额），实际工程多靠生产者 buffer 背压 + 网关层限速 + 按 Topic 拆分隔离流量。

**Q2：buffer.memory 满了会发生什么？**
A：`send()` 会阻塞直到超时（`max.block.ms`，默认 60s）后抛异常，这就是生产端背压的物理边界；积压场景应调大 buffer 或加速发送，而不是无限堆内存。

### 【困难】Kafka 如何处理数据倾斜问题？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

数据倾斜的根因几乎都在分区键：低基数键（如城市、固定枚举值）会让流量集中到少数分区。解法是换高基数键或二次哈希打散，而不是简单加分区。理由：分区数不变时换键才能重新分布，加分区只会稀释不会消峰。

#### ⚡记忆卡片

- **口诀**：高基做键，热点打散，监控分区负载
- **关键词**：分区键 ／ 高基数 ／ 自定义分区器 ／ 副本分散读 ／ rebalance
- **链路**：低基数键导致热点分区 → 换高基数字段或键上加盐打散 → 副本分散读压力 → 监控分区负载持续验证

#### 📖 核心知识

通过 **分区策略优化 + 动态资源分配 + 流量控制**，实现数据均匀分布与稳定吞吐。

**均衡数据分布**

- **合理设计分区键**：选择高基数字段（如 `user_id`、`order_id`），避免热点。
- **增加分区数**：分散数据压力，但避免过多分区导致管理负担。
- **自定义分区器**：按业务逻辑重写分配策略（如轮询、哈希优化）。

**动态调整与冗余**

- **调整副本因子**：适当增加副本（如 `replication-factor=3`）分散读压力，平衡资源开销。
- **动态监控调整**：实时监控分区负载，必要时触发 `rebalance` 或迁移数据。

**流控与限流**

- **生产者限流**：控制 `producer` 速率（如 `max.in.flight.requests`）。
- **消费者限流**：调整 `fetch.max.bytes` 或使用背压机制，匹配消费能力。

#### 🔀 发散问题

**Q1：必须保序（同 key 同分区）但又想打散热点键，怎么办？**
A：在原 key 后拼接有限的随机后缀（如 key + "-" + rand(0~N)），把单键拆成 N 份并行，同一业务键的范围仍局部有序；下游聚合时再按原 key 归并。注意 N 固定后扩分区同样会打乱分布。

**Q2：如何发现分区倾斜？**
A：监控各分区的写入字节率与消费 lag 分布，若单分区流量/积压显著高于均值（如 3 倍以上）即可判定倾斜；也可用 kafka-consumer-groups 的分区级 lag 报告快速定位。

### 【困难】Kafka 处理请求的全流程？⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Broker 内部是典型的 Reactor 模型：1 个 Acceptor 接连接，N 个 Processor（NIO）读写报文，再通过 RequestChannel 分发给 IO 线程池处理业务。理由：网络 I/O 与业务逻辑解耦，两层线程池各自按负载扩容。

#### ⚡记忆卡片

- **口诀**：接、读、派、处、回
- **关键词**：Acceptor ／ Processor ／ RequestChannel ／ KafkaRequestHandlerPool ／ NIO
- **链路**：Acceptor 接连接轮询给 Processor → Processor 用 Selector 读请求入 RequestChannel → IO 线程池取请求调 API 层处理 → 结果入 ResponseQueue 由 Processor 写回

#### 📖 核心知识

Kafka 采用 **多线程池 + 事件驱动** 模型，核心线程组分工如下：

**网络通信层（1 个 Acceptor + N 个 Processor）**

- **Acceptor 线程**（1 个）：监听 `ServerSocket`，接收客户端连接，轮询分发给 `Processor` 线程。
- **Processor 线程**（默认 3 个，可配置）：每个 `Processor` 维护一个 `Selector`（NIO），负责：
  - **读请求**：解析请求数据，放入**共享请求队列**（`RequestChannel`）。
  - **写响应**：从 `ResponseQueue` 获取结果，通过 `Socket` 返回客户端。

**请求处理层（KafkaRequestHandlerPool）**

**IO 线程池**（默认 8 个，可配置）从 `RequestChannel` 拉取请求，根据类型调用对应 `API 层` 处理（如 `handleProduceRequest`）。

关键操作：

- **生产请求**：写入 Leader 副本的 `LogSegment`（内存→PageCache→磁盘）。
- **消费请求**：从 `PageCache` 或磁盘读取数据（零拷贝优化）。

**后台线程**

- **Log Cleaner**：日志压缩（Compaction）和删除（Retention）。
- **Replica Manager**：副本同步（ISR）、Leader 选举。
- **Delayed Operation**：处理延迟操作（如 `Produce` 的 ACK 等待）。

![kafka broker internals](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/73c9cc1a2465449caefe9d0eb5952bec.png)

**核心设计优势**

- **解耦网络 I/O 与业务处理**：`Processor` 仅负责通信，`Handler` 专注逻辑。
- **无锁队列**：`RequestChannel` 使用 `ConcurrentLinkedQueue`，减少竞争。
- **动态扩展**：可调整 `Processor` 和 `Handler` 线程数适配负载。

#### 🔬 扩展知识

**【L3】请求全流程中的关键调优参数**

::: details

- `num.network.threads`（Processor 数，默认 3）：网络 IO 密集时可调大，一般不超过 CPU 核数。
- `num.io.threads`（Handler 数，默认 8）：磁盘 IO 密集时调大，低延迟场景可翻倍。
- `queued.max.requests`：RequestChannel 队列上限，满了 Processor 会背压暂停读请求，是 Broker 端的天然限流点。

:::

#### 🔀 发散问题

**Q1：为什么 Kafka 不用一个线程包揽读写和处理？**
A：网络 I/O 与磁盘/业务逻辑的速度和阻塞特征不同，单线程模型下慢请求会阻塞整个事件循环；Reactor 分层后，慢 Handler 只占住自己的线程，不影响 Processor 继续收发。

**Q2：生产请求从 Handler 到落盘的完整路径是什么？**
A：Handler 校验后写入 Leader 分区的活跃 LogSegment（先入 PageCache），同时触发 Follower 拉取同步；若 `acks=all`，请求挂入 DelayedProduce 等待 ISR 全部确认或超时，然后才写响应。

### 【中等】Kafka 中如何实现时间轮？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 用多层次时间轮管理海量定时任务（如延迟操作超时、Producer 请求超时）：插入/删除都是 O(1)，长延迟任务放高层轮，临近触发时逐级降级到低层轮。理由：优先堆在百万级定时任务下开销太大，时间轮用固定槽数换来稳定的内存与性能。

#### ⚡记忆卡片

- **口诀**：环形槽、O1 插、高层降、到点发
- **关键词**：环形数组 ／ 槽（slot） ／ 多层次时间轮 ／ 降级 ／ DelayedOperation
- **链路**：任务按延迟算槽 O(1) 插入 → 长延迟放高层轮 → 指针推进时高层任务降级到底层 → 到期槽批量触发

#### 📖 核心知识

时间轮是用于高效管理和调度大量定时任务的**环形数据结构**，通过时间分片（槽）管理任务，优化调度效率。

**数据结构**

- **环形数组**：每个槽代表一个时间片（如 1 秒），存储双向链表管理的任务。
- **指针移动**：以固定时间步长推进，触发当前槽的任务执行。

**工作原理**

- **任务插入**：根据延迟时间计算槽位（如 `延迟 % 槽数`），插入链表尾部（`O(1)` 复杂度）。
- **任务触发**：指针每移动一格，执行对应槽中所有任务。

**处理长延迟任务**

- **方案 1：轮次（Netty）**：计算轮数（如 `（延迟-1)/槽数`），轮数归零时触发。
- **方案 2：多层次时间轮（Kafka）**
  - **层级递进**：高层槽覆盖更大时间范围（如秒→分→时）。
  - **降级机制**：任务随时间推移从高层移至底层，保证精度。

**优点**

- **高效性**：插入/删除任务 O(1) 复杂度。
- **低内存开销**：固定槽数，内存占用稳定。

**应用场景**

- 高并发定时任务（如 Netty 的超时检测）。
- 网络服务器（连接/请求超时管理）。
- 分布式系统（节点间任务协调）。

**实际应用**

- **Netty**：`HashedWheelTimer`（单层 + 轮次）。
- **Kafka**：多层次时间轮 + 降级。
- **Caffeine Cache**：本地缓存的任务调度。

#### 🔀 发散问题

**Q1：Kafka 里哪些功能依赖时间轮？**
A：DelayedOperation 体系：如 Produce/Fetch 请求的 ACK 等待超时（`acks=all` 等 ISR 确认）、Producer 请求超时、事务标记清理、GroupCoordinator 的延迟心跳等，都挂在时间轮上到期触发。

**Q2：时间轮相比优先堆（JDK Timer/DelayQueue）的优势在哪？**
A：优先堆插入/弹出是 O(logN)，且每次触发都要堆调整；时间轮插入删除 O(1)、触发按槽批量执行，在百万级定时任务下 CPU 与内存抖动都小得多，代价是定时精度受槽粒度限制。

### 【中等】Kafka 的索引设计有什么亮点？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / 存储

#### 💎 关键结论

Kafka 索引用“稀疏索引 + 二分查找 + 分段存储”换取写性能与查询效率的平衡：不逐条建索引，每隔一段记一项，查找时二分定位后短距离顺序扫。理由：消息系统写多读少，索引越小写入越快，而二分查找让读也足够快。

#### ⚡记忆卡片

- **口诀**：稀疏记、二分找、段内扫、映射读
- **关键词**：稀疏索引 ／ .index ／ .timeindex ／ 二分查找 ／ MMAP
- **链路**：写入时按间隔记稀疏索引项 → 查找先二分定位索引项 → 再段内短距离顺序扫到目标 → MMAP 加速索引读取

#### 📖 核心知识

Kafka 的索引设计通过**稀疏索引 + 二分查找 + 分段存储**，在**查询效率、存储成本、扩展性**之间取得平衡，适合高吞吐、低延迟的消息系统需求。

Kafka 的索引设计（主要涉及**偏移量索引（.index）和时间戳索引（.timeindex）**）具有以下核心优势：

**高效查询（O(1) ~ O(logN) 复杂度）**

- **稀疏索引**：不存储每条消息的索引，而是按一定间隔（默认每写入 4KB 数据记一项，`index.interval.bytes=4096`）建立索引项，大幅减少索引文件大小。
- **二分查找**：通过索引快速定位消息所在的**物理位置（磁盘文件 + 偏移量）**，减少全量扫描。

**低存储开销**

- **紧凑结构**：索引文件仅存储**偏移量 + 物理位置**（固定字节项），占用空间极小。
- **分段存储**：每个日志段（Segment）独立维护索引，避免单一大文件索引的性能瓶颈。

**快速故障恢复**

- **内存映射（MMAP）**：索引文件通过内存映射加速读取，重启时无需全量加载。
- **懒加载**：仅加载活跃分片的索引，减少启动时间。

**支持时间范围查询**：时间戳索引（`.timeindex`）允许按时间戳快速定位消息，适用于日志回溯、监控等场景。

**索引自动更新**：日志压缩（Compaction）或删除（Retention）时，索引同步清理，避免无效查询。

#### 🔀 发散问题

**Q1：为什么 Kafka 不做全量索引？**
A：每条消息都建索引会让索引文件与数据同量级，写入时多一次索引维护开销，而消息系统的消费多是顺序拉取、极少随机点查；稀疏索引把索引压到数据的千分之几，二分 + 短距离顺序扫已足够快。

**Q2：按时间戳查消息的流程是什么？**
A：先查 `.timeindex` 二分找到时间戳对应的近似 offset 与段，再到 `.index` 定位物理位置，最后在 `.log` 中短距离顺序扫描精确匹配，整体仍是两次二分加短扫描。

## Kafka 优化

### 【中等】Kafka 各组件如何进行优化？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 优化

#### 💎 关键结论

调优三板斧：**三端参数调优**（Producer 攒批 + 压缩、Consumer 分区并行 + 手动提交、Broker 顺序写 + 副本）、**分区规划**（分区数定并发、副本数定可靠）、**吞吐与延迟取舍**（`linger.ms` 和 `acks` 按业务容忍度定）。理由：瓶颈在哪端就调哪端的参数，不要一刀切。

#### ⚡记忆卡片

- **口诀**：生产攒批压缩，消费分区并行，Broker 顺序写，分区定并发，取舍看容忍度
- **关键词**：linger.ms ／ compression.type ／ max.poll.records ／ replication.factor ／ 分区数 ／ acks
- **链路**：按并发定分区数、按可靠性定副本数 → Producer 攒批压缩减请求 → Broker 顺序写 + 副本保可靠 → Consumer 分区并行拉取 + 手动提交 offset → 按延迟容忍度微调 linger.ms/acks

#### 📖 核心知识

**Producer 优化**

- 批量发送（`linger.ms` + `batch.size`）。
- 压缩算法（Snappy/Gzip 降低带宽占用）。
- 异步发送（`acks=1/all` 平衡性能与可靠性）。

**Consumer 优化**

- 动态分区分配（`range/round-robin` 策略）。
- 手动提交 Offset（`enable.auto.commit=false` 避免重复/丢失）。
- 并行消费（分区数 ≥ 消费者数，避免闲置；`max.poll.records` 控制单批拉取量）。

**Broker 优化**

- 副本机制（`replication.factor≥2` 保障容错，通常 2-3 平衡可靠性与性能）。
- ISR 列表（同步副本快速选举新 Leader）。
- 磁盘顺序写（高吞吐设计，避免随机 IO）。
- 分区与副本分布在不同 Broker 上，避免读写热点。

**分区规划**

- 分区是 Kafka 并行度的基本单位，其他调优都建立在合理的分区规划上。
- 经验公式：分区数 ≥ max（目标生产吞吐 / 单分区写入吞吐，消费者数）；分区数只能增不能减，建议按未来 1~2 年峰值 × 1.5 一次规划到位。
- 分区数并非越多越好（建议单 Broker ≤2000 分区，避免元数据膨胀）。

**关键配置建议**

| 场景           | 推荐配置                          | 说明                  |
| -------------- | --------------------------------- | --------------------- |
| 高吞吐场景     | `compression.type=snappy`         | 压缩率与 CPU 开销平衡 |
| 数据持久化要求 | `log.retention.hours=168`（7 天） | 根据存储容量调整      |
| 低延迟场景     | `num.io.threads=8`（默认值翻倍）  | 提升磁盘 IO 并行度    |

**版本演进注意**

- **KRaft 模式**：Kafka 2.8 版本引入 KRaft 预览，3.3 生产可用，4.0 移除 ZooKeeper 支持，逐步淘汰 Zookeeper 依赖。

#### 🔬 扩展知识

**【L3】吞吐、延迟与可靠的参数对照**

::: details

吞吐和延迟是一对矛盾：攒批本质是“用等待换合并”，等待时间就是延迟；不攒批则请求次数多、协议开销大，吞吐上不去。只能在业务容忍度内选一个偏向，或按 Topic 分级不同配置。

| 目标   | 参数方向                                                | 代价                                  |
| :----- | :------------------------------------------------------ | :------------------------------------ |
| 高吞吐 | `linger.ms=50~100ms` + `batch.size=1MB` + 压缩          | 单条延迟增加 50~100ms                 |
| 低延迟 | `linger.ms=0~5ms` + `acks=1` + `fetch.max.wait.ms` 调小 | 吞吐比攒批模式低 3~5 倍               |
| 强可靠 | `acks=all` + `min.insync.replicas=2`                    | 延迟升到 15~30ms 量级，吞吐降 30%~50% |

消费端配套：`fetch.min.bytes` + `fetch.max.wait.ms` 平衡拉取吞吐与延迟。

:::

**【L3】硬件优化的性价比**

::: details

- **磁盘**：SSD/NVMe 显著提升 I/O；多盘 `log.dirs` 分散 IO。
- **内存**：扩大 PageCache 命中热数据，多数场景下性价比最高。
- **网络**：确保高带宽，网络打满时才需要升带宽。
- **Broker 配套**：`log.retention` 适当调大减少日志频繁清理开销；socket 缓冲区调大提升网络传输效率。

:::

#### 🔀 发散问题

**Q1：三端优化的优先级怎么排？**
A：先定位瓶颈：Producer 端看 buffer 排队与请求延迟，Broker 端看磁盘 util 与 PageCache 命中率，Consumer 端看 lag 与单批耗时；哪端的指标先恶化就先调哪端，避免盲调。

**Q2：为什么压缩算法选 Snappy 而不是压缩比更高的 Gzip？**
A：Snappy 压缩比略低但 CPU 开销小得多，高吞吐场景下 CPU 常是瓶颈；CPU 宽裕且带宽紧张时才换 Gzip/Zstd。见本文档『Kafka 为什么性能高？』。

**Q3：分区数到底怎么定？**
A：经验公式：分区数 ≥ max（目标生产吞吐 / 单分区写入吞吐，消费者数）；注意分区数只能增不能减，建议按未来 1~2 年峰值 × 1.5 一次规划到位。见《MQ面试》『如何处理 MQ 消息积压？』。

**Q4：`log.flush.interval.messages` 该不该设？**
A：默认不设（交给 OS 异步刷盘）。强制按条数/间隔 fsync 会把吞吐从百万级拉到万级，可靠性应该靠多副本而不是同步刷盘。见本文档『Kafka 为什么性能高？』。

## Kafka 事务

## Kafka 对比

## Kafka Stream

### 【困难】Kafka 与 Flink 的集成是如何实现的？如何优化 Flink 与 Kafka 之间的数据流动？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / Stream

#### 💎 关键结论

Flink 通过官方 Kafka Connector 把 Kafka 当 Source/Sink，一致性靠 Flink Checkpoint + Kafka 事务的两阶段提交实现 Exactly-Once。理由：checkpoint 把算子状态与 Kafka 事务提交绑定，失败回滚重试才能不重不漏。

#### ⚡记忆卡片

- **口诀**：连接器接入，checkpoint 保一致，事务提位点
- **关键词**：flink-connector-kafka ／ FlinkKafkaConsumer ／ Checkpoint ／ 事务 ／ 并行度
- **链路**：Connector 订阅 Topic 拉数据 → Flink 算子处理 → checkpoint 成功才 commit Kafka 事务 → 失败回滚重放

#### 📖 核心知识

目标是实现 **高吞吐、低延迟、强一致性** 的流式数据处理管道。

**基础集成步骤**

- **添加依赖**：引入 `flink-connector-kafka`（匹配 Kafka 版本）。
- **配置 Source**：通过 `FlinkKafkaConsumer` 订阅 Kafka Topic。
- **配置 Sink**：通过 `FlinkKafkaProducer` 写入结果到 Kafka。
- **设计作业**：在 Flink 中实现数据处理逻辑（过滤/转换/聚合）。

**性能优化方向**

| **优化项**   | **关键措施**                                                                |
| ------------ | --------------------------------------------------------------------------- |
| **参数调优** | - 调整 `batch.size`/`linger.ms`（生产者）<br>- 设置合理并行度（Flink 任务） |
| **资源分配** | - 平衡 Flink TaskManager 的 CPU/内存<br>- 确保 Kafka Broker 带宽充足        |
| **容错机制** | - 启用 Flink Checkpointing（精确一次语义）<br>- 配置 Kafka 幂等性/事务      |
| **数据压缩** | 选用高效压缩算法（如 `lz4`/`snappy`），减少网络传输压力                     |

**关键代码示例**

::: details Flink Kafka Source/Sink 示例

```java
// Kafka Source
Properties props = new Properties();
props.setProperty("bootstrap.servers", "kafka:9092");
props.setProperty("group.id", "flink-group");

FlinkKafkaConsumer<String> source = new FlinkKafkaConsumer<>(
    "input-topic",
    new SimpleStringSchema(),
    props
);

// Kafka Sink
FlinkKafkaProducer<String> sink = new FlinkKafkaProducer<>(
    "output-topic",
    new SimpleStringSchema(),
    props
);

// 作业流程
env.addSource(source)
   .map(...)  // 数据处理
   .addSink(sink);
```

:::

**高级特性**

- **动态发现分区**：`setStartFromLatest()`/`setStartFromEarliest()`。
- **水位线生成**：结合 `assignTimestampsAndWatermarks` 处理事件时间。
- **Exactly-Once 保障**：启用 Kafka 事务（需配置 `transaction.timeout.ms`）。

#### 🔬 扩展知识

**【L3】Exactly-Once 链路的实现细节**

::: details

- Flink Sink 用两阶段提交：checkpoint 开始时预提交（pre-commit）事务，checkpoint 成功后才 commit；失败则 abort 并从上个 checkpoint 重放。
- 必须保证 `transaction.timeout.ms`（默认 15 分钟）大于 checkpoint 间隔，否则悬挂事务被 Broker 主动 abort 导致数据丢失假象。
- 消费端配合 `isolation.level=read_committed` 才能避免下游读到未提交事务的数据。

:::

#### 🔀 发散问题

**Q1：Flink 并行度与 Kafka 分区数怎么匹配？**
A：Flink Source 的并行度上限是 Topic 分区数，超过则多余算子空转；通常设为分区数或其约数，需要更高并行度时先扩分区。

**Q2：为什么 checkpoint 间隔不能太短也不能太长？**
A：太短则事务频繁提交、同步开销大且易触碰 `transaction.timeout.ms`；太长则故障恢复时重放数据量大、延迟高，一般按秒级~分钟级根据业务容忍度调。

### 【困难】Kafka 的 Stream 和 Table 是如何相互转换的？它们在 Kafka Streams 中的应用场景是什么？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / Stream

#### 💎 关键结论

Stream 和 Table 是同一数据的两种视角：Stream 是 Table 的变更日志，Table 是 Stream 的物化视图，靠聚合（Stream→Table）和 toStream（Table→Stream）互转。理由：流表二元性是 Kafka Streams 用一份数据同时支撑“事件处理”与“状态维护”的理论基础。

#### ⚡记忆卡片

- **口诀**：流是表的变更日志，表是流的物化视图
- **关键词**：KStream ／ KTable ／ 聚合 ／ toStream ／ RocksDB
- **链路**：事件写入 KStream → groupByKey + aggregate 物化成 KTable → toStream 把表变更再当流输出

#### 📖 核心知识

通过 **流表转换 + 状态管理**，实现实时计算与状态维护的统一处理。

**核心概念对比**

| **抽象类型** | **特点**                           | **适用场景**                             |
| ------------ | ---------------------------------- | ---------------------------------------- |
| **Stream**   | 无界、有序的键值记录流（事件日志） | 实时分析、事件监控（如点击流、交易记录） |
| **Table**    | 有状态的键值快照（当前数据视图）   | 状态维护（如用户配置、库存数量）         |

**相互转换操作**

**(1) Stream → Table**：通过**聚合操作**将动态流转换为状态表：

::: details 聚合示例

```java
KStream<String, Long> stream = builder.stream("input-topic");

// 按 Key 分组并累加值
KTable<String, Long> table = stream
    .groupByKey()
    .aggregate(
        () -> 0L,  // 初始值
        (key, newValue, agg) -> agg + newValue,  // 累加逻辑
        Materialized.as("count-store")  // 状态存储
    );
```

:::

**(2) Table → Stream**：通过 **toStream()** 将表变更作为流输出：

::: details toStream 示例

```java
KTable<String, Long> table = builder.table("input-topic");
KStream<String, Long> stream = table.toStream();  // 输出表的更新事件
```

:::

**典型应用场景**

- **电商实时统计**
  - **Stream**：处理用户订单事件（如 `order-created`）。
  - **Table**：维护用户总订单数（`user_id → total_orders`）。
- **视频播放分析**
  - **Stream**：接收视频点击事件（`video_id, timestamp`）。
  - **Table**：存储当前视频播放量（`video_id → play_count`）。

**关键设计思想**

- **流表二元性**：
  - Stream 是 Table 的变更日志（Changelog）。
  - Table 是 Stream 的物化视图（Materialized View）。
- **状态管理**：Table 依赖 **RocksDB 状态存储**，支持容错与高效查询。

#### 🔀 发散问题

**Q1：KTable 的状态存在哪里，故障后怎么恢复？**
A：存在本地 RocksDB 状态存储，同时以 changelog Topic 形式备份到 Kafka；实例故障后新实例从 changelog 重放恢复状态，checkpoint 保证一致性。

**Q2：什么场景必须用 toStream 把表转回流？**
A：当表的更新结果需要继续参与下游流式处理（如告警、二次聚合）或写回其他 Topic 时；表本身只能被查询或被其他流 join，不能直接输出。

### 【中等】什么是 ksqlDB？它与 Kafka Streams 有什么区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / Stream

#### 💎 关键结论

ksqlDB 是架在 Kafka 之上的流式 SQL 数据库，用 SQL 就能做查询、聚合、连接，底层还是 Kafka Streams；区别在于 ksqlDB 降门槛、Kafka Streams 保灵活。理由：SQL 表达能力有限，复杂业务逻辑还是要回到 API。

#### ⚡记忆卡片

- **口诀**：SQL 写流，持久查询，表即视图
- **关键词**：流式 SQL ／ 持久化查询 ／ 物化视图 ／ 流表 JOIN ／ Kafka Streams
- **链路**：CREATE STREAM 接入 Topic → 持久化 SQL 查询持续运行 → 结果写入新 Topic / 物化视图实时维护

#### 📖 核心知识

**ksqlDB** 是一个建立在 Kafka 之上的**流式 SQL 数据库**，允许开发者使用 SQL 语句对 Kafka 中的实时数据流进行查询、过滤、聚合、连接等操作，无需编写 Java/Scala 代码。

**核心特性**

- **SQL 接口**：使用类 SQL 语法操作 Kafka 数据流，降低流处理门槛。
- **持久化查询**：查询持续运行，结果实时输出到新 Topic。
- **物化视图**：通过 `CREATE TABLE AS SELECT` 创建物化视图，实时维护状态。
- **流表连接**：支持 Stream-Stream、Stream-Table、Table-Table 的 JOIN 操作。
- **Exactly-Once 语义**：底层基于 Kafka 事务保证。

**ksqlDB vs Kafka Streams 对比**

| 对比维度     | **ksqlDB**                   | **Kafka Streams**              |
| ------------ | ---------------------------- | ------------------------------ |
| **接口**     | SQL                          | Java/Scala API                 |
| **学习门槛** | **低**（会 SQL 即可）        | **高**（需理解流处理编程模型） |
| **灵活性**   | 中（SQL 表达能力有限）       | **高**（任意复杂业务逻辑）     |
| **部署**     | 独立服务（ksqlDB Server）    | 嵌入应用（客户端库）           |
| **运维**     | 集中管理查询                 | 分散在各应用                   |
| **UDF/UDAF** | 支持（Java/Python）          | 原生支持                       |
| **适用场景** | 快速原型、简单 ETL、运维分析 | 复杂业务逻辑、定制化流处理     |

**典型 SQL 示例**

::: details ksqlDB 建流与物化视图

```sql
-- 创建流
CREATE STREAM clickstream (user_id VARCHAR, url VARCHAR, timestamp BIGINT)
WITH (KAFKA_TOPIC='clickstream', VALUE_FORMAT='JSON');

-- 创建物化视图：实时统计每个用户的点击数
CREATE TABLE user_clicks AS
SELECT user_id, COUNT(*) AS click_count
FROM clickstream WINDOW TUMBLING (SIZE 5 MINUTES)
GROUP BY user_id;
```

:::

**选型建议**

- **选 ksqlDB**：希望快速验证流处理方案、团队 SQL 技能强、业务逻辑相对简单。
- **选 Kafka Streams**：业务逻辑复杂、需要精细控制状态、对性能要求极致。

#### 🔀 发散问题

**Q1：ksqlDB 和 Kafka Streams 是两套引擎吗？**
A：不是，ksqlDB 底层就是 Kafka Streams，它把 SQL 编译成 Streams 拓扑执行；所以 ksqlDB 的能力上限就是 Kafka Streams 的能力，只是多了一层 SQL 抽象与集中式服务化部署。

**Q2：物化视图和直接写结果 Topic 有什么区别？**
A：物化视图在 ksqlDB Server 本地维护可交互查询的状态（pull 查询最新值）；结果 Topic 是变更日志流，适合下游继续消费。两者可以同时存在（CTAS 既写 changelog Topic 也维护本地状态）。

### 【中等】Kafka KRaft 模式的工作原理是什么？相比 ZooKeeper 有何优势？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 集群

#### 💎 关键结论

KRaft 用内置 Raft 共识协议把元数据存成 Kafka 自己的日志（`__cluster_metadata`），彻底去掉 ZooKeeper。理由：元数据变成追加日志后可支撑百万级分区，故障恢复从秒级降到亚秒级，还少运维一个外部组件。

#### ⚡记忆卡片

- **口诀**：Raft 选主，日志存元数据，去 ZK 一身轻
- **关键词**：KRaft ／ Controller Quorum ／ \_\_cluster_metadata ／ Raft ／ 去 ZooKeeper
- **链路**：奇数 Controller 用 Raft 选 Leader → 元数据变更写入 \_\_cluster_metadata 日志并复制 → Broker 拉取日志变更 → 无 ZK 依赖

#### 📖 核心知识

**KRaft（Kafka Raft Metadata mode）** 是 Kafka 2.8 引入、3.3 生产可用、3.5 默认推荐的**去 ZooKeeper 化**架构，使用内置的 Raft 共识协议管理元数据。

**KRaft 架构核心**

- **Controller Quorum（控制器仲裁队列）**：由奇数个（通常 3 或 5 个）Controller 节点组成，通过 Raft 协议选举 Leader Controller。
- **元数据日志（Metadata Log）**：元数据以日志形式记录在内部 Topic `__cluster_metadata` 中，通过 Raft 协议复制到所有 Controller。
- **Broker 角色**：普通 Broker 节点从 Controller 拉取元数据日志变更。

**节点角色组合**

| 模式               | 说明                                              |
| ------------------ | ------------------------------------------------- |
| **combined mode**  | 同一进程既是 Controller 又是 Broker（小集群适用） |
| **separated mode** | Controller 和 Broker 分离部署（生产推荐）         |

**KRaft vs ZooKeeper 对比**

| 维度           | **ZooKeeper 模式**                    | **KRaft 模式**                              |
| -------------- | ------------------------------------- | ------------------------------------------- |
| **元数据存储** | ZooKeeper ZNode（树形结构）           | Kafka 内部 Topic（追加日志）                |
| **一致性协议** | ZAB 协议                              | Raft 协议                                   |
| **元数据规模** | 受限（数十万分区性能下降）            | **支持百万级分区**                          |
| **故障恢复**   | Controller 选举依赖 ZK 临时节点，秒级 | Raft Leader 选举，**亚秒级**                |
| **运维复杂度** | 需独立部署和维护 ZooKeeper 集群       | **无外部依赖**，运维简化                    |
| **元数据传播** | watch 机制（推送）                    | **拉取式**（Broker 主动拉取 metadata log）  |
| **写性能**     | ZK 写需 Quorum 确认，串行             | Raft 日志复制，可批量                       |
| **版本支持**   | Kafka 3.x 之前默认                    | Kafka 3.3+ 生产可用，3.5+ 推荐，4.0 移除 ZK |

**KRaft 的核心优势**

1. **架构简化**：去除外部 ZK 依赖，Kafka 成为自包含系统。
2. **元数据性能**：支持超大规模集群（百万级分区），元数据传播更快。
3. **故障恢复更快**：Raft 选举比 ZK 临时节点机制更高效。
4. **一致性模型统一**：元数据管理复用 Kafka 自身的日志复制机制。

**KRaft 迁移注意**

- Kafka 3.4+ 提供 ZK 到 KRaft 的**在线迁移工具**。
- 迁移过程需要谨慎验证，建议先在测试环境演练。
- 生产环境建议等 KRaft 在同等规模下充分验证后再迁移。

#### 🔀 发散问题

**Q1：KRaft 为什么能支持百万级分区而 ZK 模式不行？**
A：ZK 模式下每个分区的元数据是独立 ZNode，分区元数据变更靠 watch 推送，规模大时 watch 风暴与内存占用先崩；KRaft 把元数据变成批量复制的追加日志，变更可合并传播，规模瓶颈被消除。

**Q2：combined mode 和 separated mode 怎么选？**
A：小集群/测试环境用 combined 省资源；生产集群用 separated，避免 Controller 的 Raft 日志写入与 Broker 数据读写争抢资源，故障域也更清晰。见本文档『Kafka 为什么要弃用 Zookeeper？』。

## 参考资料

- [聊聊 Kafka： Kafka 为啥这么快？](https://xie.infoq.cn/article/49bc80d683c373db93d017a99)
