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

### 【简单】Kafka 是什么？⭐

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

### 【简单】Kafka 有哪些核心组件？⭐

Kafka 有以下核心组件：

| 组件          | 核心功能                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| **Producer**  | 发布数据到 Topic，支持轮询/键值/自定义分区策略，采用批量压缩提升吞吐      |
| **Consumer**  | 通过消费组实现负载均衡，单分区仅限组内一个消费者，通过 offset 确保顺序    |
| **Broker**    | 集群节点，管理分区副本，故障时自动切换 Leader，保障高可用                 |
| **Zookeeper** | 协调集群元数据与 Leader 选举（注：新版本逐步用 KRaft 协议替代 Zookeeper） |

### 【简单】Kafka 有哪些应用场景？⭐

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/05/8388f56d9edc4bfbb6a57dc6a593b008.webp)

- **消息队列**：用作高吞吐量的消息系统，将消息从一个系统传递到另一个系统
- **日志采集分析**：集中收集日志数据，然后通过 Kafka 传递到实时监控系统或存储系统
- **流计算**：处理实时数据流，将数据传递给实时计算系统，如 Apache Storm 或 Apache Flink，这些实时计算可用于推荐、系统监控
- **指标收集和监控**：收集来自不同服务的监控指标，统一存储和处理
- **事件溯源**：记录事件发生的历史，以便稍后进行数据回溯或重新处理

## Kafka 存储

### 【中等】Kafka 如何存储数据？⭐⭐

::: important 要点

**逻辑存储**：Topic -> Partition -> Record

**物理存储**：Log（对应 Partition） -> LogSegment

- Segment 文件分类
  - 索引文件
    - 偏移量索引文件（ `<offset>.index` ）
    - 时间戳索引文件（ `<offset>.timeindex` ）
    - 已终止事务的索引文件（`<offset>.txnindex`）
  - 日志数据文件（`<offset>.log`）
- 默认，每个 Segment 大小不超过 1G，且只包含 7 天的数据

:::

::: info Kafka 逻辑存储

:::

Kafka 的数据结构采用三级结构，即：主题（Topic）、分区（Partition）、消息（Record）。

Kafka 的三层消息架构：

- 第一层是主题层，每个主题可以配置 M 个分区，而每个分区又可以配置 N 个副本。
- 第二层是分区层，每个分区的 N 个副本中只能有一个充当领导者角色，对外提供服务；其他 N-1 个副本是追随者副本，只是提供数据冗余之用。
- 第三层是消息层，分区中包含若干条消息，每条消息的位移从 0 开始，依次递增。
- 最后，客户端程序只能与分区的领导者副本进行交互。

在 Kafka 中，任意一个 Topic 维护了一组 Partition 日志，如下所示：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/053ea3816769483ea373ee63d446b917.png)

请注意：这里的主题只是一个逻辑上的抽象概念，实际上，**Kafka 的基本存储单元是 Partition**。Partition 无法在多个 Broker 间进行再细分，也无法在同一个 Broker 的多个磁盘上进行再细分。所以，分区的大小受到单个挂载点可用空间的限制。

Partiton 命名规则为 Topic 名称 + 有序序号，第一个 Partiton 序号从 0 开始，序号最大值为 Partition 数量减 1。

::: info Kafka 物理存储

:::

`Log` 是 Kafka 用于表示日志文件的组件。**每个 Partiton 对应一个 `Log` 对象**，在物理磁盘上则对应一个目录。如：创建一个双分区的主题 `test`，那么，Kafka 会在磁盘上创建两个子目录：`test-0` 和 `test-1`；而在服务器端，这就对应两个 `Log` 对象。

因为在一个大文件中查找和删除消息是非常耗时且容易出错的。所以，Kafka 将每个 Partition 切割成若干个片段，即日志段（Log Segment）。**默认，每个 Segment 大小不超过 1G，且只包含 7 天的数据**。如果 Segment 的消息量达到 1G，那么该 Segment 会关闭，同时打开一个新的 Segment 进行写入。

Broker 会为 Partition 里的每个 Segment 打开一个文件句柄（包括不活跃的 Segment），因此打开的文件句柄数通常会比较多，这个需要适度调整系统的进程文件句柄参数。**正在写入的分片称为活跃片段（active segment），活跃片段永远不会被删除**。

Segment 文件命名规则：Partition 全局的第一个 segment 从 0 开始，后续每个 segment 文件名为上一个 segment 文件最后一条消息的 offset 值。数值最大为 64 位 long 大小，19 位数字字符长度，没有数字用 0 填充。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/04f8792fd52d4cd8840046f22f8869ab.png)

Segment 文件可以分为两类：

- **索引文件**
  - **偏移量索引文件（ `<offset>.index` ）**
  - **时间戳索引文件（ `<offset>.timeindex` ）**
  - **已终止事务的索引文件（`<offset>.txnindex`）**：如果没有使用 Kafka 事务，则不会创建该文件
- **日志数据文件（`<offset>.log`）**

### 【中等】Kafka 如何持久化？⭐⭐

::: important 要点

Kafka 持久化关键机制：**顺序 I/O + 零拷贝 + PageCache**

:::

Kafka 持久化有以下核心机制：

- **顺序 I/O**：**Kafka 数据以日志形式存储于磁盘**。采用**追加写入，不可修改**，以此避免在磁盘上随机写入性能不高的问题。
- **零拷贝**：数据从磁盘直接发送到网卡，**绕过应用程序**，极大提升网络传输效率，降低 CPU 开销。
- **刷盘机制**：数据先写入**页缓存**，再在合适时机写入磁盘。
- **日志清理**：基于时间或空间的**保留策略**自动清理旧数据，防止磁盘耗尽。
- **多索引**：为日志段建立“位移->物理位置”的**部分索引**，实现 **快速定位 + 顺序扫描** 的高效读取。
- **分段存储**：日志被切分为多个**日志段文件**，便于管理和清理。

### 【困难】Kafka 如何清理数据？⭐

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

### 【困难】Kafka 如何检索数据？⭐

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

### 【中等】Kafka 如何实现日志压缩？⭐⭐

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

## Kafka 生产消费

### 【中等】Kafka 发送消息的工作流程是怎样的？⭐⭐

::: important 要点

1. **序列化**
2. **选择分区**
3. **暂存缓冲区**
4. **批次传输**

:::

Kafka 生产者用一个 `ProducerRecord` 对象来抽象一条要发送的消息， `ProducerRecord` 对象需要包含目标主题和要发送的内容，还可以指定键或分区。其发送消息流程如下：

（1）**序列化** - 生产者要先把键和值序列化成字节数组，这样它们才能够在网络中传输。

（2）**分区** - 数据被传给分区器。如果在 `ProducerRecord` 中已经指定了分区，那么分区器什么也不会做；否则，分区器会根据 `ProducerRecord` 的键来选择一个分区。选定分区后，生产者就知道该把消息发送给哪个主题的哪个分区。

（3）**批次传输** - 接着，这条记录会被添加到一个记录批次中。这个批次中的所有消息都会被发送到相同的主题和分区上。有一个独立的线程负责将这些记录批次发送到相应 Broker 上。

- **批次，就是一组消息，这些消息属于同一个主题和分区**。
- 发送时，会把消息分成批次传输，如果每次只发送一个消息，会占用大量的网路开销。

（4）**响应** - 服务器收到消息会返回一个响应。

- 如果**成功**，则返回一个 `RecordMetaData` 对象，它包含了主题、分区、偏移量；
- 如果**失败**，则返回一个错误。生产者在收到错误后，可以进行重试，重试次数可以在配置中指定。失败一定次数后，就返回错误消息。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/05/b89455640aa248e9bfeb1f4000652fe1.png)

生产者向 Broker 发送消息时是怎么确定向哪一个 Broker 发送消息？

- 生产者会向任意 broker 发送一个元数据请求（`MetadataRequest`），获取到每一个分区对应的 Leader 信息，并缓存到本地。
- 生产者在发送消息时，会指定 Partition 或者通过 key 得到到一个 Partition，然后根据 Partition 从缓存中获取相应的 Leader 信息。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/3f7ed5e9c2e24c5da6553fd54189516a.png)

### 【简单】Kafka 为什么要支持消费者群组？⭐⭐⭐

::: important 要点

- 消费者群组，以组为维度订阅 Topic，并分摊分区，以均衡负载。
- 一个分区只能分配给消费者群组中的一个实例。
- 消费者数量发生变化，或主题分区数发生变化时，会触发分区再均衡。

:::

::: info 消费者

:::

每个 Consumer 的唯一元数据是该 Consumer 在日志中消费的位置。这个偏移量是由 Consumer 控制的：Consumer 通常会在读取记录时线性的增加其偏移量。但实际上，由于位置由 Consumer 控制，所以 Consumer 可以采用任何顺序来消费记录。

**一条消息只有被提交，才会被消费者获取到**。如下图，只能消费 Message0、Message1、Message2：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/7306e918c2ae4fbfb8d8d14b2b625913.png)

::: info 消费者群组

:::

**Consumer Group 是 Kafka 提供的可扩展且具有容错性的消费者机制**。

Kafka 的写入数据量很庞大，如果只有一个消费者，消费消息速度很慢，时间长了，就会造成数据积压。为了减少数据积压，Kafka 支持消费者群组，可以让多个消费者并发消费消息，对数据进行分流。

Kafka 消费者从属于消费者群组，**一个群组里的 Consumer 订阅同一个 Topic，一个主题有多个 Partition，每一个 Partition 只能隶属于消费者群组中的一个 Consumer**。

如果超过主题的分区数量，那么有一部分消费者就会被闲置，不会接收到任何消息。

同一时刻，**一条消息只能被同一消费者组中的一个消费者实例消费**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/29b36f29666e4111b1482440c5eb23e0.png)

**不同消费者群组之间互不影响**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/c47a58d33e82429e857fd7f890f07239.png)

### 【中等】Kafka 消费消息的工作流程是怎样的？⭐⭐

::: important 要点

- 消费者群组订阅 Topic
- 消费者轮批次拉取消息
- 处理完消息后，提交偏移量（Offset）

:::

Kafka 消费者通过 `pull` 模式来获取消息，但是获取消息时并不是立刻返回结果，需要考虑两个因素：

- 消费者通过 `customer.poll(time)` 中设置等待时间
- Broker 会等待累计一定量数据，然后发送给消费者。这样可以减少网络开销。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/f3d0c34e18fb4f168a486ec90cfb580c.png)

`pull` 除了获取消息外，还有其他作用：

- **发送心跳信息**。消费者通过向被指派为群组协调器的 Broker 发送心跳来维护他和群组的从属关系，当机器宕掉后，群组协调器触发再均衡。

## Kafka 集群

### 【中等】Kafka 如何实现分区机制？⭐⭐

::: important 要点

**分区是 Kafka 高性能（吞吐量）、高可用和易扩展的基石。它通过数据分片实现了并行处理，是 Kafka 性能的关键。**

:::

Kafka 的数据结构采用三级结构，即：主题（Topic）、分区（Partition）、消息（Record）。其中，分区是 Kafka 中最小的并行处理单元。

每个分区本质上是一个**有序的、不可变的消息日志文件**，消息被追加到分区尾部（类似 append-only 日志），并通过偏移量（Offset）唯一标识每条消息在分区内的位置。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-log-anatomy.png)

分区会被**分布式存储在不同的 Broker 节点**上，实现数据的分布式存储和负载均衡。

每个分区可以设置多个**副本（Replica）**，其中一个为**领导者副本（Leader）**，负责处理读写请求；其他为**追随者副本（Follower）**，通过复制 Leader 的数据实现高可用（当 Leader 故障时，Follower 会被选举为新 Leader）。

### 【中等】Kafka 支持哪些分区策略？⭐⭐

Kafka 通过分区实现生产、消费的负载均衡。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/10/dd62c39370804af5aacb40e6208c9682.png)

::: info 生产者分区策略

:::

- **指定分区**：直接指定分区号，手动控制消息流向。
- **哈希（Hash）**：有 key 时，对 Key 哈希后取模分区数，保证同 Key 消息入同一分区（单分区顺序性）。
- **轮询（RoundRobin）**：旧版默认。无 Key 时，依次均匀分配到各分区。
- **粘性（Sticky）**：2.4 + 默认。优先向同一分区发送，满后切换，减少切换开销，兼顾均衡。
- **自定义**：实现 `Partitioner` 接口，按业务逻辑（如地域、时间）分配。

::: info 消费者组分区策略

:::

- **范围（Range）**：分区排序后平均分配，前几个消费者可能多分配 1 个（简单但可能不均）。
- **轮询（RoundRobin）**：分区和消费者排序后轮询分配，跨主题订阅时更均匀。
- **粘性（Sticky）**：保持现有分配，仅最小范围调整，减少重平衡开销。

### 【困难】Kafka 如何实现分区再均衡？⭐⭐⭐

**分区再均衡（Rebalance）**是消费者组内因消费者成员增减而**重新分配分区**的过程。

**分区再均衡实现了消费者群组的高可用性和伸缩性**。

**分区再均衡的触发时机**有三种：

- **消费者群组成员数变化**
- **订阅主题数变化**
- **订阅主题的分区数变化**

::: info 分区再均衡的过程
:::

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

::: info 选择协调者
:::

所有 Broker 在启动时，都会创建和开启相应的 Coordinator 组件。也就是说，**所有 Broker 都有各自的 Coordinator 组件**。那么，Consumer Group 如何确定为它服务的 Coordinator 在哪台 Broker 上呢？答案就在我们之前说过的 Kafka 内部位移主题 `__consumer_offsets` 身上。

目前，Kafka 为某个 Consumer Group 确定 Coordinator 所在的 Broker 的算法有 2 个步骤。

1. 第 1 步：确定由位移主题的哪个分区来保存该 Group 数据：`partitionId=Math.abs(groupId.hashCode() % offsetsTopicPartitionCount)`。

2. 第 2 步：找出该分区 Leader 副本所在的 Broker，该 Broker 即为对应的 Coordinator。

### 【困难】分区再均衡存在什么问题？如何避免分区再均衡？⭐⭐

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

### 【中等】Kafka 如何实现副本机制？⭐⭐⭐

副本机制是分布式系统实现高可用的不二法门，Kafka 也不例外。

副本机制有哪些好处？

1. **提供可用性**：有句俗语叫：鸡蛋不要放在一个篮子里。副本机制也是一个道理——当部分节点宕机时，系统仍然可以依靠其他正常运转的节点，从整体上对外继续提供服务。
2. **提供伸缩性**：通过增加、减少机器可以控制系统整体的吞吐量。
3. **改善数据局部性**：允许将数据放入与用户地理位置相近的地方，从而降低系统延时。

但是，Kafka 只实现了第一个好处，原因后面会阐述。

- 每个 Partition 都有一个 Leader，零个或多个 Follower。
- Leader 处理一切对 Partition （分区）的读写请求；而 Follower 只需被动的同步 Leader 上的数据。
- 同一个 Topic 的不同 Partition 会分布在多个 Broker 上，而且一个 Partition 还会在其他的 Broker 上面进行备份。

::: info 副本角色
:::

Kafka 使用 Topic 来组织数据，每个 Topic 被分为若干个 Partition，每个 Partition 有多个副本。每个 Broker 可以保存成百上千个属于不同 Topic 和 Partition 的副本。**Kafka 副本的本质是一个只能追加写入的提交日志**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/e617de480b874a119b2828eb6585d51d.png)

Kafka 副本有两种角色：

- **Leader 副本（主）**：每个 Partition 都有且仅有一个 Leader 副本。为了保证数据一致性，**Leader 处理一切对 Partition （分区）的读写请求**；
- **Follower 副本（从）**：Leader 副本以外的副本都是 Follower 副本。**Follower 唯一的任务就是从 Leader 那里复制消息，保持与 Leader 一致的状态**。
- 如果 Leader 宕机，其中一个 Follower 会被选举为新的 Leader。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/c3666e28d96d493e849abbfd22a1b686.png)

为了与 Leader 保持同步，Follower 向 Leader 发起获取数据的请求，这种请求与消费者为了读取消息而发送的请求是一样的。请求消息里包含了 Follower 想要获取消息的偏移量，而这些偏移量总是有序的。

Leader 另一个任务是搞清楚哪个 Follower 的状态与自己是一致的。通过查看每个 Follower 请求的最新偏移量，Leader 就会知道每个 Follower 复制的进度。如果跟随者在 10s 内没有请求任何消息，或者虽然在请求消息，但是在 10s 内没有请求最新的数据，那么它就会被认为是**不同步**的。**如果一个副本是不同步的，在 Leader 失效时，就不可能成为新的 Leader**——毕竟它没有包含全部的消息。

除了当前首领之外，每个分区都有一个首选首领——创建 Topic 时选定的首领就是分区的首选首领。之所以叫首选 Leader，是因为在创建分区时，需要在 Broker 之间均衡 Leader。

::: info ISR
:::

ISR 即 In-sync Replicas，表示同步副本。Follower 副本不提供服务，只是定期地异步拉取领导者副本中的数据而已。既然是异步的，说明和 Leader 并非数据强一致性的。

**判断 Follower 是否与 Leader 同步的标准**：

Kafka Broker 端参数 `replica.lag.time.max.ms` 参数，指定了 Follower 副本能够落后 Leader 副本的最长时间间隔，默认为 10s。这意味着：只要一个 Follower 副本落后 Leader 副本的时间不连续超过 10 秒，那么 Kafka 就认为该 Follower 副本与 Leader 是**同步**的，即使此时 Follower 副本中保存的消息明显少于 Leader 副本中的消息。

ISR 是一个动态调整的集合，会不断将同步副本加入集合，将不同步副本移除集合。Leader 副本天然就在 ISR 中。

::: info Unclean 领导者选举
:::

因为 Leader 副本天然就在 ISR 中，如果 ISR 为空了，就说明 Leader 副本也“挂掉”了，Kafka 需要重新选举一个新的 Leader。

**Kafka 把所有不在 ISR 中的存活副本都称为非同步副本**。通常来说，非同步副本落后 Leader 太多，因此，如果选择这些副本作为新 Leader，就可能出现数据的丢失。毕竟，这些副本中保存的消息远远落后于老 Leader 中的消息。在 Kafka 中，选举这种副本的过程称为 Unclean 领导者选举。**Broker 端参数 `unclean.leader.election.enable` 控制是否允许 Unclean 领导者选举**。

**开启 Unclean 领导者选举可能会造成数据丢失**，但好处是：它使得 Partition Leader 副本一直存在，不至于停止对外提供服务，因此提升了高可用性。反之，禁止 Unclean 领导者选举的好处在于维护了数据的一致性，避免了消息丢失，但牺牲了高可用性。

:::: info LEO 与 HW 机制
::::

**LEO（Log End Offset）和 HW（High Watermark）是 Kafka 副本同步与一致性保证的两个核心概念**，理解它们对于掌握 Kafka 的高可用与数据一致性至关重要。

**基本概念**

- **LEO（Log End Offset）**：每个副本的**下一条待写入消息的 offset**，即日志末端位移。每个副本（包括 Leader 和 Follower）都有自己的 LEO。
- **HW（High Watermark，高水位）**：**所有 ISR 副本中最小的 LEO**，即同一消息被所有 ISR 副本都接收并写入后的位移。**消费者只能读取 HW 之前的消息**，HW 之后的消息对消费者不可见（未提交）。
- **Leader Epoch**：新版 Kafka 引入的概念，用于替代旧版基于 HW 的恢复机制，解决"数据截断导致的数据不一致/丢数据"问题。

**HW 更新机制**

1. **Follower 拉取**：Follower 向 Leader 发送 Fetch 请求，携带自己当前的 LEO。
2. **Leader 更新远程 LEO**：Leader 根据Fetch请求中的LEO，更新自己保存的该Follower的远程LEO。
3. **Leader 更新 HW**：Leader 尝试更新集群 HW = `min(所有 ISR 副本的 LEO)`。
4. **Follower 更新 HW**：Leader 在Fetch响应中携带当前HW返回给Follower，Follower更新本地HW = `min(自身LEO, Leader返回的HW)`。

**HW 更新的延迟特性**

- **HW 默认需要额外一轮 Fetch 才能更新**：Follower 拉取数据后LEO更新，但Leader的HW要等**下一次Fetch请求**才能反映该更新。这意味着 HW 的更新存在一个轮次的延迟。
- 这也是为什么 Kafka 0.11 引入 **Leader Epoch** 机制来解决因 HW 更新延迟导致的"数据丢失"和"数据不一致"问题。

**Leader Epoch 机制（解决 HW 的缺陷）**

| 对比维度         | 旧版 HW 机制                   | Leader Epoch 机制          |
| ---------------- | ------------------------------ | -------------------------- |
| **恢复策略**     | 基于 HW 截断日志               | 基于 Leader Epoch 日志截断 |
| **数据丢失风险** | 有（重启时可能截断已提交消息） | 无                         |
| **数据不一致**   | 有（脑裂场景下可能出现）       | 无                         |
| **引入版本**     | 0.11 之前                      | Kafka 0.11+                |

**Leader Epoch 工作原理**

- 每个分区维护一个 `leader-epoch-checkpoint` 文件，记录 `<epoch, startOffset>` 对。
- Follower 重启后不再直接截断到HW，而是向Leader发送`OffsetsForLeaderEpoch`请求询问该epoch对应的合法offset。
- Leader返回该epoch的LEO，Follower据此截断，避免误删已提交消息。

### 【困难】Kafka 的 ISR 在什么场景下收缩？ISR 收缩有什么影响？⭐⭐⭐

ISR 是一个动态集合：Follower 落后 Leader 超过 `replica.lag.time.max.ms`（默认 10s）未追上即被踢出 ISR，追上后又重新加入。**ISR 频繁收缩（Under Replicated）是生产环境的典型告警信号**。

#### 常见收缩场景

1. **Follower 机器性能问题**：磁盘 IO 打满、CPU 高负载、长时间 GC，导致拉取不及时。
2. **网络问题**：Broker 间带宽打满或网络抖动。
3. **Leader 写入流量过大**：写入速率远超 Follower 复制速率。
4. **Broker 上副本过多**：单 Broker 承载过多分区副本，Fetch 线程/带宽竞争。
5. **Follower JVM 堆不足**：Fetch 请求排队，拉取延迟增大。

#### ISR 收缩的影响

- **可靠性下降**：`acks=all` 时消息提交依赖 ISR 全部副本写入，ISR 收缩意味着数据保障副本变少；若 `min.insync.replicas` 条件不满足，**生产者会收到 NotEnoughReplicas 错误，写入被拒绝**。
- **可用性与丢数据的两难**：ISR 为空时 Leader 宕机，允许 Unclean 选举则丢数据，禁止则分区不可用。
- **频繁 Leader 切换**：ISR 频繁变动叠加 Leader 再均衡，可能引发分区抖动。

#### 应对措施

- 监控 `UnderReplicatedPartitions` 指标，持续大于 0 立即告警。
- 合理设置参数：`min.insync.replicas` = 副本数 - 1；适当调大 `replica.lag.time.max.ms` 可减少误判，但会削弱敏感度。
- 治本之道：大流量 Topic 磁盘隔离、扩容带宽、避免同 Broker 承载过多副本。

> **一句话总结**：ISR 频繁收缩是集群健康的早期警报，UnderReplicated 分区告警应和错误告警同等对待。

### 【困难】在 Kafka 中，如何实现多集群的数据同步？跨集群复制的实现原理是什么？⭐

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

### 【困难】Kafka 的 Controller Failover 是如何设计的？在 Controller 宕机时如何进行故障恢复？⭐⭐

Kafka 的 Controller 是集群中负责管理各种元数据（如主题创建、分区分配、副本分配等）以及协调领导者选举的关键组件。Controller Failover 是 Kafka 保证高可用性的重要机制。具体来讲，当 Controller 宕机时，Kafka 会通过 Zookeeper 选举出一个新的 Controller，以确保集群可以继续正常运行。

以下是 Kafka Controller Failover 的主要设计和流程：

1. Zookeeper 作为协调者：每个 Kafka Broker 启动时都会尝试在 Zookeeper 中创建一个特殊的节点（`/controller`）。因为这个节点使用的是 Ephemeral（临时）节点类型，当创建该节点的 Broker 宕机时，这个节点会自动删除。
2. 竞争成为 Controller：一旦当前的 Controller 宕机，所有活着的 Broker 都会尝试在 Zookeeper 中创建 `/controller` 节点。第一个成功创建这个节点的 Broker 会成为新的 Controller，剩下的则会收到失败通知。
3. 通知机制：新的 Controller 会在 Zookeeper 中写入它的选举结果，并通过监听机制通知所有 Broker。这些 Broker 会更新它们本地的 Controller 缓存，从而指向新的 Controller。
4. 恢复任务：新当选的 Controller 需要快速完成集群状态的接管，包括重新分配分区副本、添加主题、调整副本同步等等。这些操作通过监听 Zookeeper 节点和操作 Kafka 内部 Topic（如、\_\_consumer_offsets）完成。

### 【困难】Kafka 中的 Controller 工作原理是什么？⭐⭐

Kafka 中的 Controller 是整个集群的协调者，它是专门负责监控和管理 Kafka 集群中分区（partition）和副本（replica）状态的节点。在整个 Kafka 集群中，Controller 的角色是至关重要的，它帮助集群维持稳定，确保分区和副本的可用性和一致性。

::: info Controller 作用

:::

**控制器（Controller）**，是 Apache Kafka 的核心组件。它的**主要作用是基于 ZooKeeper 管理和协调整个 Kafka 集群**。控制器其实就是一个 Broker，只不过它除了具有一般 Broker 的功能以外，还负责 Leader 的选举。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/3ff8312cefef44b6a95ac3405215f172.png)

Controller 在集群中的主要作用包括：

- **分区 Leader 选举**：确定哪个副本成为分区的 Leader 来处理读写请求。
- **元数据管理**：管理所有 Topic、Partition 的创建、删除和副本分配方案。
- **状态维护**：维护 Partition 的 ISR（同步副本）列表，处理副本的加入与移除。
- **分区迁移**：如果某个 broker 出现故障，Controller 负责重新分配其上的分区到其他可用 Broker 上。
- **集群协调**：感知 Broker 的上下线，并触发相应的元数据更新和负载均衡。
- **信息同步**：向所有 Broker 同步最新的集群元数据。

::: info Controller 原理

:::

**基于 ZooKeeper 的模式：**

- **选举**：所有 Broker 争抢在 ZooKeeper 创建 **`/controller` 临时节点**，创建成功者即为 Controller。
- **故障转移**：若 Controller 宕机，其临时节点自动删除，其他 Broker 监听到此变化后立即触发新一轮选举。
- **状态感知**：Controller 通过监听 ZooKeeper 上其他节点的变化来感知集群状态（如 Broker 下线），并执行相应操作。

**基于 KRaft 的模式（新一代）：**

- **去 ZooKeeper 依赖**：Kafka 使用内置的 **Raft 共识算法** 来管理元数据。
- **角色分离**：有专门的 Controller 节点（构成 Quorum）进行元数据管理，与负责数据存取的 Broker 节点分离。
- **共识保障**：通过 Raft 算法在 Controller 节点间自动完成 Leader 选举和元数据同步，更高效、可扩展性更强。

::: info 如何选举控制器

:::

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

### 【困难】Kafka 如何实现高可用？⭐⭐⭐

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

### 【困难】ZooKeeper 在 Kafka 中的作用是什么？⭐⭐

ZooKeeper 在 Kafka 中扮演着**核心的协调者角色**，主要负责集群的元数据管理、Broker 协调和状态维护。

Zookeeper 仍是 Kafka 2.8 之前版本的"大脑"，承担关键协调职能。KRaft 模式将成为标准架构，2023 年后新版本将默认启用。

**Zookeeper 的核心作用**

| **功能**               | **说明**                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| **管理 Broker 元数据** | 维护 Broker 注册信息（在线/离线状态）；Broker 的 ID、主机名、端口等元数据；Topic/Partition 元数据 |
| **Controller 选举**    | 通过临时节点（Ephemeral ZNode）选举集群唯一 Controller，负责分区 Leader 选举                      |
| **故障恢复**           | 监测节点故障并触发分区 Leader 重选举                                                              |
| **消费者组 Offset**    | 旧版本（≤0.8）将消费者 Offset 存储在 Zookeeper，新版本改用内部 主题 `_consumer_offsets`。         |
| **配置中心**           | 存储 Kafka 配置和拓扑信息                                                                         |

::: info Kafka 在 ZooKeeper 的关键存储信息
:::

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

::: info ZooKeeper 特性
:::

ZooKeeper 两个重要特性：

- 客户端会话结束时，ZooKeeper 就会删除临时节点。
- 客户端注册监听它关心的节点，当节点状态发生变化（数据变化、子节点增减变化）时，ZooKeeper 服务会通知客户端。

详细内容可以参考：[ZooKeeper 原理](https://github.com/dunwu/bigdata-tutorial/blob/master/docs/zookeeper/ZooKeeper原理.md)

### 【中等】Kafka 为什么要弃用 Zookeeper？⭐⭐

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

- Kafka 2.8+ 开始实验性支持 KRaft 模式，3.0+ 逐步稳定，但仍兼容 ZooKeeper 模式。
- 完全移除 ZooKeeper 需确保 KRaft 在生产环境中的成熟度（如故障恢复、监控工具链完善）。

## Kafka 可靠传输

### 【中等】在 Kafka 中，如何通过 Acks 配置提高数据可靠性？Acks 的值如何影响性能？⭐⭐

**选择原则**：根据业务对数据丢失的容忍度进行权衡配置。

**参数选项**

| 配置值   | 可靠性 | 性能 | 适用场景          |
| -------- | ------ | ---- | ----------------- |
| `0`      | 最低   | 最高 | 实时监控/日志收集 |
| `1`      | 中等   | 中等 | 普通业务场景      |
| `all/-1` | 最高   | 最低 | 金融交易/关键数据 |

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

### 【困难】如何保证 Kafka 消息不丢失？⭐⭐⭐

如何保证消息的可靠性传输，或者说，如何保证消息不丢失？这对于任何 MQ 都是核心问题。

一条消息从生产到消费，可以划分三个阶段：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/34a58a9972694faaafb421296f7d5bd7.png)

- **生产阶段**：Producer 创建消息，并通过网络发送给 Broker。
- **存储阶段**：Broker 收到消息并存储，如果是集群，还要同步副本给其他 Broker。
- **消费阶段**：Consumer 向 Broker 请求消息，Broker 通过网络传输给 Consumer。

这三个阶段都可能丢失数据，所以要保证消息丢失，就需要任意一环都保证可靠。通过 **ACK+副本+幂等+手动提交 Offset** 的组合策略，可系统性解决消息丢失问题。根据业务对可靠性和性能的需求调整配置。

- **生产者端**
  - **ACK 机制**：设置 `acks=all`，确保所有副本持久化后才确认发送成功。
  - **幂等生产者**：启用 `enable.idempotence=true`，避免网络重试导致消息重复或丢失。
  - **事务支持**：跨分区的原子性写入（`producer.initTransactions()`）。
- **Broker 端**
  - **多副本机制**：设置 `replication.factor≥3`，保证高可用。
  - **最小同步副本**：配置 `min.insync.replicas≥2`，防止单点故障导致数据丢失。
- **消费者端**
  - **手动提交 Offset**：关闭 `enable.auto.commit=false`，处理完消息后手动提交偏移量。
  - **持久化 Offset**：将 Offset 存储到 Kafka（而非 Zookeeper），避免分区再均衡时丢失。

关键配置：

```properties
# 生产者
acks=all
enable.idempotence=true
# Broker
replication.factor=3
min.insync.replicas=2
# 消费者
enable.auto.commit=false
```

::: info 存储阶段不丢消息
:::

存储阶段指的是 Kafka Server，也就是 Broker 如何保证消息不丢失。

一句话概括，**Kafka 只对“已提交”的消息（committed message）做有限度的持久化保证**。

上面的话可以解读为：

- **已提交**：**只有当消息被写入分区的若干同步副本时，才被认为是已提交的**。为什么是若干个 Broker 呢？这取决于你对“已提交”的定义。你可以选择只要 Leader 成功保存该消息就算是已提交，也可以是令所有 Broker 都成功保存该消息才算是已提交。
- **持久化**：Kafka 的数据存储在磁盘上，所以只要写入成功，天然就是持久化的。
- **只要还有一个副本是存活的，那么已提交的消息就不会丢失**。
- **消费者只能读取已提交的消息**。

**Kafka 的副本机制是 kafka 可靠性保证的核心**。

Kafka 的主题被分为多个分区，分区是基本的数据块。每个分区可以有多个副本，有一个是 Leader（主副本），其他是 Follower（从副本）。所有数据都直接发送给 Leader，或者直接从 Leader 读取事件。Follower 只需要与 Leader 保持同步，并及时复制最新的数据。当 Leader 宕机时，从 Follower 中选举一个成为新的 Leader。

Broker 有 3 个配置参数会影响 Kafka 消息存储的可靠性。

- **副本数** - **`replication.factor` 的作用是设置每个分区的副本数**。`replication.factor` 是主题级别配置； `default.replication.factor` 是 broker 级别配置。副本数越多，数据可靠性越高；但由于副本数增多，也会增加同步副本的开销，可能会降低集群的可用性。一般，建议设为 3，这也是 Kafka 的默认值。
- **不完全的选主** - `unclean.leader.election.enable` 用于控制是否支持不同步的副本参与选举 Leader。`unclean.leader.election.enable` 是 broker 级别（实际上是集群范围内）配置，默认值为 true。
  - 如果设为 true，代表着**允许不同步的副本成为主副本**（即不完全的选举），那么将**面临丢失消息的风险**；
  - 如果设为 false，就要**等待原先的主副本重新上线**，从而降低了可用性。
- **最少同步副本** - **`min.insync.replicas` 控制的是消息至少要被写入到多少个副本才算是“已提交”**。`min.insync.replicas` 是主题级别和 broker 级别配置。尽管可以为一个主题配置 3 个副本，但还是可能会出现只有一个同步副本的情况。如果这个同步副本变为不可用，则必须在可用性和数据一致性之间做出选择。Kafka 中，消息只有被写入到所有的同步副本之后才被认为是已提交的。但如果只有一个同步副本，那么在这个副本不可用时，则数据就会丢失。
  - 如果要确保已经提交的数据被已写入不止一个副本，就需要把最小同步副本的设置为大一点的值。
  - 注意：要确保 `replication.factor` > `min.insync.replicas`。如果两者相等，那么只要有一个副本挂机，整个分区就无法正常工作了。我们不仅要改善消息的持久性，防止数据丢失，还要在不降低可用性的基础上完成。推荐设置成 `replication.factor = min.insync.replicas + 1`。

::: info 生产阶段不丢消息
:::

在生产消息阶段，消息队列一般通过请求确认机制，来保证消息的可靠传递，Kafka 也不例外。

Kafka 有三种发送方式：同步、异步、异步回调。同步方式能保证消息不丢失，但性能太差；异步方式发送消息，通常会立即返回，但消息可能丢失。

解决生产者丢失消息的方案：

生产者使用异步回调方式 `producer.send(msg, callback)` 发送消息。callback（回调）能准确地告诉你消息是否真的提交成功了。一旦出现消息提交失败的情况，你就可以有针对性地进行处理。

- 如果是因为那些瞬时错误，那么仅仅让 Producer 重试就可以了；
- 如果是消息不合格造成的，那么可以调整消息格式后再次发送。

然后，需要基于以下几点来保证 Kafka 生产者的可靠性：

- **ACK** - 生产者可选的确认模式有三种：`acks=0`、`acks=1`、`acks=all`。
  - `acks=0`、`acks=1` 都有丢失数据的风险。
  - `acks=all` 意味着会等待所有同步副本都收到消息。再结合 `min.insync.replicas` ，就可以决定在得到确认响应前，至少有多少副本能够收到消息。这是最保险的做法，但也会降低吞吐量。
- **重试** - 如果 broker 返回的错误可以通过**重试**来解决，生产者会自动处理这些错误。需要注意的是：有时可能因为网络问题导致没有收到确认，但实际上消息已经写入成功。生产者会认为出现临时故障，重试发送消息，这样就会出现重复记录。所以，尽可能在业务上保证幂等性。设置 `retries` 为一个较大的值。这里的 `retries` 同样是 Producer 的参数，对应前面提到的 Producer 自动重试。当出现网络的瞬时抖动时，消息发送可能会失败，此时配置了 retries > 0 的 Producer 能够自动重试消息发送，避免消息丢失。
  - **可重试错误**，如：`LEADER_NOT_AVAILABLE`，主副本不可用，可能过一段时间，集群就会选举出新的主副本，重试可以解决问题。
  - **不可重试错误**，如：`INVALID_CONFIG`，即使重试，也无法改变配置选项，重试没有意义。
- **错误处理** - 开发者需要自行处理的错误：
  - 不可重试的 broker 错误，如消息大小错误、认证错误等；
  - 消息发送前发生的错误，如序列化错误；
  - 生产者达到重试次数上限或消息占用的内存达到上限时发生的错误。

::: info 消费阶段不丢消息
:::

前文已经提到，**消费者只能读取已提交的消息**。这就保证了消费者接收到消息时已经具备了数据一致性。

消费者唯一要做的是确保哪些消息是已经读取过的，哪些是没有读取过的（通过提交偏移量给 Broker 来确认）。如果消费者提交了偏移量却未能处理完消息，那么就有可能造成消息丢失，这也是消费者丢失消息的主要原因。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/07/f265b495ad7c411face607063ca699e8.png)

消费者的可靠性配置：

- `group.id` - 如果希望消费者可以看到主题的所有消息，那么需要为它们设置唯一的 `group.id`。
- `auto.offset.reset` - 有两个选项：
  - `earliest` - 消费者会从分区的开始位置读取数据
  - `latest` - 消费者会从分区末尾位置读取数据
- `enable.auto.commit` - 消费者自动提交偏移量。如果设为 true，处理流程更简单，但无法保证重复处理消息。
- `auto.commit.interval.ms` - 自动提交的频率，默认为每 5 秒提交一次。

如果 `enable.auto.commit` 设为 true，即自动提交，就无需考虑提交偏移量的问题。

如果选择显示提交偏移量，需要考虑以下问题：

- 必须在处理完消息后再发送确认（提交偏移量），不要收到消息立即确认。
- 提交频率是性能和重复消息数之间的权衡
- 分区再均衡
- 消费可能需要重试机制
- 超时处理
- 消费者可能需要维护消费状态，如：处理完消息后，记录在数据库中。
- 幂等性设计
  - 写数据库：根据主键判断记录是否存在
  - 写 Redis：set 操作天然具有幂等性
  - 复杂的逻辑处理，则可以在消息中加入全局 ID

::: info Kafka 专属可靠性：参数组合与失效边界

:::

通用的“三端保障模型”（生产端确认 + 服务端持久化 + 消费端手动 ACK）见 MQ 面试一文的通用题，此处聚焦 Kafka 的参数组合、失效边界与真实代价。

（1）**可靠性三参数的组合权衡**

| 组合                                                                                                   | 语义                                   | 代价                         | 结论                                         |
| :----------------------------------------------------------------------------------------------------- | :------------------------------------- | :--------------------------- | :------------------------------------------- |
| `acks=1` + `min.insync.replicas=1` + `unclean.leader.election.enable=true`                             | Leader 写入即确认                      | 吞吐最高（基准）             | 日志类可接受，业务消息禁用                   |
| `acks=all` + `min.insync.replicas=1`                                                                   | 看似严格，实际等同 `acks=1`            | 无额外保护                   | **陷阱配置**：ISR 收缩到只剩 Leader 时照样丢 |
| `acks=all` + `replication.factor=3` + `min.insync.replicas=2` + `unclean.leader.election.enable=false` | 至少 2 副本写入才确认，且只从 ISR 选主 | 吞吐下降约 30%~50%，延迟上升 | 业务消息的标准答案                           |

关键约束：必须满足 `replication.factor = min.insync.replicas + 1`（如 3 副本配 2），两者相等时任一副本挂掉即整分区不可写，可用性归零。

（2）**失效场景：acks=all 也会丢消息的三种真实路径**

- **ISR 收缩到 1**：两台 Follower 同时宕机或同步超时（`replica.lag.time.max.ms` 默认 10s）被踢出 ISR，此时 `min.insync.replicas=1` 的默认值使 `acks=all` 退化为写单副本，Leader 宕机即丢。
- **页缓存未刷盘 + 整机损毁**：Kafka 依赖 OS 页缓存，`acks=all` 只保证写入多副本的页缓存；同机架整机柜断电仍可能丢失未 fsync 数据，需跨机架部署（`broker.rack`）兜底。
- **HW 截断风险（旧版本）**：基于 HW 的日志截断在“Leader 宕机 + Follower 重启”组合下可能截掉已提交消息；Kafka 0.11+ 的 Leader Epoch 机制已解决，升级版本是正解。

（3）**消费端：先提交后消费 vs 先消费后提交**

| 提交策略                                   | 丢失路径                               | 重复路径                                               |
| :----------------------------------------- | :------------------------------------- | :----------------------------------------------------- |
| 先提交 offset 后处理                       | 处理中宕机，消息永久跳过（**丢消息**） | 无                                                     |
| 先处理后提交（`enable.auto.commit=false`） | 无                                     | 处理成功但提交前宕机，重启后重消费（**重复**，需幂等） |
| 自动提交（默认 5s 间隔）                   | 提交后处理中宕机，丢失窗口 ≤ 5s        | 处理完未提交即宕机，重复窗口 ≤ 5s                      |

结论：业务消息一律选“先消费后提交”，把丢失风险转化为可用幂等兜底的重复风险；配合 `session.timeout.ms=45s`、`max.poll.interval.ms=300s` 避免慢处理误触发 rebalance。

（4）**踩坑案例：一次 ISR 收缩引发的万笔订单消息丢失**

- **现象**：促销期间订单服务告警，约 1 万笔订单状态消息未被下游消费，且生产端无任何报错（发送全部返回成功）。
- **排查**：生产端回调全部成功说明 Broker 已确认；查集群监控发现事故期间某台 Broker 发生长时间 Full GC（STW 超过 30s），其上所有 Follower 被踢出 ISR，ISR 长期只剩 Leader；随后 Leader 所在磁盘故障宕机，因 `unclean.leader.election.enable=true`，落后数万条消息的 Follower 上位，未同步消息被截断。
- **根因**：三重叠加——`min.insync.replicas=1`（默认）使 `acks=all` 失效、GC 导致 ISR 收缩、非清洁选举截断数据。
- **修复**：`min.insync.replicas=2` + `unclean.leader.election.enable=false`；对 Broker 堆内存与 GC 建立专项监控（GC 停顿 > 5s 告警）；损失消息通过订单库全量比对补发，次日追平。

（5）**量化数据**

- `acks=all` + 3 副本相比 `acks=1`，端到端延迟从约 5ms 升至约 15~30ms，吞吐下降约 30%~50%。
- ISR 判定阈值 `replica.lag.time.max.ms` 默认 10s（新版本 30s），Follower 落后超过该值即被踢出。
- 自动提交默认间隔 `auto.commit.interval.ms=5000`，即自动提交模式下丢失/重复窗口最大 5s。

#### 拓展追问

1. **为什么 `acks=all` 必须与 `min.insync.replicas` 配套？单设 `acks=all` 的保护上限是什么？**
   `acks=all` 的“all”指的是当时 ISR 中的全部副本，而 ISR 是动态集合。若 ISR 收缩到只剩 Leader，`acks=all` 等价于 `acks=1`，保护退化为单点。`min.insync.replicas=2` 的作用是设定下限：ISR 不足 2 个时直接拒绝写入（抛 `NotEnoughReplicas`），宁可暂不可写也不降级写入，把“静默丢”变成“显式失败”。
2. **禁用 unclean 选主后，最坏情况会发生什么？如何做工程决策？**
   最坏情况：ISR 全灭（如整个机架断电），分区因无合法 Leader 而不可读写，牺牲可用性保数据。决策依据是业务能否容忍短暂不可用：交易类选“不可用但不丢”（false），日志类选“可用但可能丢”（true）。配合跨机架部署可把该概率压到极低。
3. **消费者“处理成功但提交 offset 失败”时，Kafka 侧会发生什么？如何把丢失风险彻底转为重复风险？**
   提交失败后位点不前进，rebalance 或重启后从旧位点重拉，产生重复而非丢失。要彻底转换，需保证：关闭自动提交、处理与提交串行、`max.poll.interval.ms` 大于最慢一批的处理耗时避免“处理中被踢”，重复由下游幂等消化。

#### 场景题

**场景**：交易系统上线“强可靠”配置（`acks=all` + `replication.factor=3`）后，监控显示发送延迟 P99 从 8ms 恶化到 200ms，且偶发 `NotEnoughReplicas` 异常。你如何排查和修复？

**应急处理**：先确认是否真实丢数据（大概率没有，`NotEnoughReplicas` 是拒绝写入而非丢数据），对失败消息走重试队列兜底；必要时临时扩容 Broker 缓解 ISR 不足。

**根因分析**：`NotEnoughReplicas` 说明 ISR 频繁收缩到 2 以下。查各 Broker 的 ISR 收缩日志与磁盘/网络监控，常见根因是：某台 Broker 磁盘 IO 打满或跨机房网络抖动，Follower 同步超 `replica.lag.time.max.ms` 被反复踢出；延迟恶化则是 `acks=all` 必须等最慢的 Follower 确认。

**长期方案**：定位慢节点（磁盘老化、同机混部）并隔离；开启 `broker.rack` 让副本跨机架分布；对慢盘 Broker 调大 `replica.lag.time.max.ms` 到 30s 减少抖动踢出；核心 Topic 与普通 Topic 分集群部署，避免 IO 争抢。

**权衡**：强可靠配置的代价（P99 延迟 × 10、吞吐下降 30%~50%）只对交易 Topic 支付，日志类 Topic 保持 `acks=1`；按 Topic 分级承担性能代价，而不是全集群一刀切。

### 【困难】如何保证 Kafka 消息不重复？⭐⭐⭐

在 MQTT 协议中，给出了三种传递消息时能够提供的服务质量标准，这三种服务质量从低到高依次是：

- **At most once**：至多一次。消息在传递时，最多会被送达一次。换一个说法就是，没什么消息可靠性保证，允许丢消息。一般都是一些对消息可靠性要求不太高的监控场景使用，比如每分钟上报一次机房温度数据，可以接受数据少量丢失。
- **At least once**: 至少一次。消息在传递时，至少会被送达一次。也就是说，不允许丢消息，但是允许有少量重复消息出现。
- **Exactly once**：恰好一次。消息在传递时，只会被送达一次，不允许丢失也不允许重复，这个是最高的等级。

绝大部分消息队列提供的服务质量都是 At least once，包括 RocketMQ、RabbitMQ 和 Kafka 都是这样。也就是说，消息队列很难保证消息不重复。

一般解决重复消息的办法是，在消费端，**保证消费消息的操作具备幂等性**。

**幂等**（idempotent、idempotence）是一个数学与计算机学概念，指的是：**一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。**

常用的实现幂等操作的方法：

- **消费者幂等处理**
  - 存储已处理消息 ID（如 offset/业务 ID）到 DB/Redis，处理前校验去重。
  - _优点_：实现简单；_缺点_：依赖外部存储性能。
- **Kafka 幂等性与事务**
  - **生产者**：启用`enable.idempotence=true`，避免网络重试导致重复。
  - **消费者**：配合事务提交 Offset，确保"精确一次"处理。
  - _要求_：需 Kafka 0.11+版本支持。
- **业务逻辑去重**
  - 设计天然幂等操作（如订单状态更新："SET status=paid"）。
  - _优势_：高性能；_挑战_：需深度理解业务。

::: info Kafka 专属去重：幂等生产者与事务

:::

通用幂等设计（唯一键 + 去重表）见 MQ 面试一文的通用题，此处深挖 Kafka 的两层原生去重机制及其边界。

（1）**方案权衡：幂等生产者 vs 事务**

| 机制                                    | 去重范围                  | 原理                                                                                                                      | 代价                               | 适用边界                                        |
| :-------------------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------- | :---------------------------------------------- |
| 幂等生产者（`enable.idempotence=true`） | 单分区、单会话            | Producer ID（PID）+ Sequence Number，Broker 按 `<PID, 分区, SeqNum>` 去重                                                 | 吞吐下降约 5%~10%，强制 `acks=all` | 单分区写入的重试去重（推荐默认开启）            |
| 事务（`transactional.id`）              | 跨分区、跨会话、含 offset | 两阶段提交：`initTransactions` → `beginTransaction` → `send`/`sendOffsetsToTransaction` → `commitTransaction`；两阶段提交 | 吞吐下降约 20%~30%                 | consume-transform-produce 的端到端 exactly-once |

关键边界：**幂等只解决“生产者重试导致的重复”，不解决消费端重复**；事务的 exactly-once 也仅限“Kafka→Kafka”链路（如 Flink/Kafka Streams），一旦下游是外部 DB，仍需业务幂等。

（2）**失效场景**

- **幂等失效：PID 换新**——Producer 重启后获得新 PID，Broker 无法跨会话去重，重启前后的重发仍会重复。
- **`transactional.id` 配置错误**——多实例共用同一 `transactional.id` 会互相 fence（`ProducerFencedException`），或每次重启都 fence 旧事务导致悬挂事务清理开销。
- **消费端自动提交 + 幂等生产者的错觉**——很多人以为开了幂等就端到端不重复，实际上消费端 rebalance 后的重投照旧，消费端幂等不可省。
- **事务超时**——`transaction.timeout.ms`（默认 15 分钟）内未提交的事务被 Broker 主动 abort，若业务实际已成功则产生“消息丢失”假象。

（3）**踩坑案例：幂等生产者开启后仍出现重复计费**

- **现象**：计费系统偶发重复计费，开发坚称已开启 `enable.idempotence=true`。
- **排查**：重复消息的 PID 不同但业务内容相同；进一步发现重复均发生在生产者滚动发布前后几秒。
- **根因**：幂等去重依赖 `<PID, 分区, SeqNum>`，进程重启后 PID 变化，旧进程“已写入但回调未收到”的消息被新进程以新 PID 重发，Broker 视为新消息。
- **修复**：在消息体中携带业务唯一键（计费流水号），计费接口以该键做唯一约束幂等；同时明确团队认知：**Kafka 幂等只防“同会话重试”，不防“跨进程重发”**。

（4）**量化数据**

- 幂等生产者开销：每条消息额外 12 字节头部（PID 8B + SeqNum 4B），吞吐下降约 5%~10%；自动强制 `acks=all`、`retries=Integer.MAX_VALUE`、`max.in.flight.requests.per.connection≤5`。
- 事务开销：两阶段提交使端到端延迟增加约 1 个 RTT，吞吐下降约 20%~30%。
- 消费端重复窗口：自动提交模式下 ≈ `auto.commit.interval.ms`（默认 5s），即每次重启重复消息量 ≈ 5 秒内的消费量。

#### 拓展追问

1. **幂等生产者的 PID + Sequence Number 去重为什么只对单分区有效？**
   SeqNum 是“每个分区独立编号”的单调递增序列，Broker 的去重表按 `<PID, 分区, SeqNum>` 维度存储：若某分区收到的 SeqNum ≤ 已见最大值即判重丢弃。跨分区没有全局序号，因此幂等无法覆盖多分区写入，这正是需要事务（跨分区原子写 + 全局事务 ID）的原因。
2. **Kafka 事务的两阶段提交具体指什么？消费者如何隔离未提交事务消息？**
   生产者 `beginTransaction` 后写入的消息带事务标记，`commitTransaction` 时 Broker 写入 `COMMIT` 标记并更新 `__transaction_state`；消费者设置 `isolation.level=read_committed` 后只能读到已提交事务的消息，并通过 LSO（Log Stable Offset）与 aborted 事务索引（`.txnindex`）过滤已回滚数据。代价是 read_committed 消费存在轻微延迟（等待事务落定）。
3. **为什么“Kafka 到外部系统”的 exactly-once 靠 Kafka 自身无法实现？**
   Kafka 事务只能原子化“写 Kafka 分区 + 提交消费位点”这两类 Kafka 内部动作。向 MySQL 等外部系统的写入不在事务协调范围内，一旦“写外部成功、提交事务失败”，只能靠重试 + 外部系统幂等收口。Flink 的 TwoPhaseCommitSinkFunction 就是把外部写入也纳入 checkpoint 的通用解法。

#### 场景题

**场景**：风控团队用 Kafka 事务实现“读黑名单消息 → 写风控结果 Topic → 提交 offset”的 exactly-once 链路，升级客户端后出现大量 `ProducerFencedException`，且结果 Topic 出现部分事务长时间悬挂。你如何排查和修复？

**应急处理**：悬挂事务超过 `transaction.timeout.ms`（默认 15 分钟）会被 Broker 自动 abort，先确认无数据丢失；对报错实例重启并观察是否持续 fence。

**根因分析**：`ProducerFencedException` 的触发条件是“同一 `transactional.id` 被新实例 initTransactions 抢占”。检查发现升级后多实例误配了同一个 `transactional.id`（应为每实例唯一，如 `risk-tx-{instanceId}`），实例间互相 fence；悬挂事务则来自旧实例被 fence 后遗留的未决事务。

**长期方案**：`transactional.id` 改为实例级唯一且稳定（绑定实例编号而非随机生成）；消费者统一 `isolation.level=read_committed` 防读到回滚数据；监控 `__transaction_state` 中悬挂事务数与 abort 率，异常时告警。

**权衡**：事务链路吞吐比纯幂等低约 20%~30%，但风控结果要求“不重不漏”的原子性，且峰值 TPS 在容量范围内；用可接受的吞吐代价换取链路原子性，优于事后对账补偿。

### 【困难】如何保证 Kafka 消息有序？⭐⭐⭐

**对消息有序有要求的场景**

| **场景** | **顺序性要求示例**                                  |
| :------- | :-------------------------------------------------- |
| 金融交易 | 转账指令必须按 `开户→存款→转账` 顺序执行            |
| 日志聚合 | 错误日志需按时间顺序排列：`启动→运行→异常→终止`     |
| 库存管理 | 操作顺序必须为 `入库→出库→盘点`，否则库存数据不一致 |
| 流媒体   | 视频帧需按 `I 帧→P 帧→B 帧` 顺序传输，否则解码失败  |

Kafka 提供了**有限度的顺序性保证**，具体来说：

- 在同一个分区内，消息是有序的。
- 靠消息键将相关消息分配到同一分区，可以保证这些消息在同一分区内依然有序。

**如何保证消息的严格顺序性**

- **分区**：确保生产者将同一类型的消息发送到特定分区。Kafka 保证一个分区内的消息是按顺序存储和消费的。
- **消息键**：使用消息键（Key）来控制消息的分区。相同的 Key 总是被路由到同一个分区，从而保证了具有相同 Key 的消息顺序。
- **单生产者线程**：确保生产者是单线程的或使用有序的发送机制，这样就不会因多线程的并发发送而打乱顺序。
- **生产者中的分区器**：Kafka 的自定义分区器可以确保相同 Key 的消息始终发送到同一个分区。

**高并发场景下如何优化顺序消费**

- **并行处理**：在消费端，可以通过拆分步骤来并行处理部分无顺序依赖的逻辑，从而提高整体吞吐量。
- **异步处理**：利用异步处理机制处理消息，但需要确保消息的核心逻辑是顺序执行的，从而保证顺序。
- **多线程消费**：在不同消费组中根据分区并行消费，但仍需每个分区内的消费线程按照顺序处理消息。

**关键机制**

- **分区机制**：在 Kafka 中，每个 Topic 都可以配置为多个分区，每个分区都是一个有序的、不可变的消息日志。生产者在发送消息时，可以指定消息的键（Key），Kafka 根据这个键来进行哈希运算，将消息写入相应的分区。同一键的消息总会被写入到同一个分区，这样就保证了同一键的消息在同一个分区内是有序的。
- **消息键和分区策略**：当生产者发送消息时，可以通过配置分区策略（Partitioner）决定消息去哪个分区。默认的分区策略是基于消息键的哈希值，比如 `hash(key) mod partitionNum` 。通过这种策略，可以确保相同键的消息被发送到同一个分区，从而保证它们的顺序性。
- **消费端的顺序保证**：消费者在消费消息时，同一个消费者线程只能同时消费一个分区的消息，这样可以保证消费端在处理某个分区内的消息时是按顺序的。如果 Kafka 集群中没有足够的消费者线程，某个消费者线程可能需要同时消费多个分区的消息，但这些分区之间的顺序是无法保证的。
- **顺序性在高可用环境下的挑战**：当 Kafka 分区的 Leader 发生切换时，可能会有短时间的数据不一致。如果处理不当，可能会影响顺序性保证。Kafka 通过保持分区副本（Replica）的一致性，并在重新选举 Leader 时确保新 Leader 从最新的数据点开始处理，尽量减少顺序性的损失。

最佳实践

- **生产者优化**
  - 批量发送：在保证顺序的前提下，尽量使用批量发送来提高吞吐量。
  - 幂等性（Idempotence）：Kafka 生产者支持幂等性，确保消息不会因为重试而导致重复。开启幂等性可以进一步保证消息顺序的一致性。
- **消费者优化**
  - 手工提交消费位移：可以选择在消费每一批消息后，手工提交消费位移，这样可以对某些消息进行重试处理，确保按序消费。
  - 事务性消费：使用 Kafka 的事务性支持，消费者可以确保一组消息要么全部处理成功，要么全部回滚，这在处理批量消息时保证顺序性非常有效。
  - 偏移量管理：合理管理和提交偏移量（Offset），确保在出现错误或重启时能继续保持顺序消费。
- **Kafka 配置调优**
  - min.insync.replicas：确保最小同步副本数，以提高消息的可靠性和顺序性保障。
  - acks 设置：生产者的 acks 设置为 'all'（或 -1），确保所有副本已接收到消息再进行确认，保障消息顺序和持久性。

::: info Kafka 专属保序：max.in.flight 与保序的深层关系

:::

通用的“同键同分片 + 单线程消费”分区策略见 MQ 面试一文的通用题，此处聚焦 Kafka 生产端保序的参数机制与失效路径。

（1）**方案权衡：`max.in.flight.requests.per.connection` 的三种配置**

| 配置                                      | 保序能力     | 吞吐                       | 适用边界                    |
| :---------------------------------------- | :----------- | :------------------------- | :-------------------------- |
| `=1`（配合任意 acks）                     | 严格保序     | 最低，降约 50%（无流水线） | 旧版本客户端 + 严格顺序场景 |
| `≤5` + `enable.idempotence=true`（0.11+） | 保序且高吞吐 | 接近默认水平               | **推荐默认**                |
| `>1` 且未开幂等                           | 不保序       | 最高                       | 无序场景                    |

原理：该参数控制单连接上未确认请求的并发数。多请求在飞时，若先发批次失败重试、后发批次先落盘，日志顺序即被打乱。幂等生产者通过 `<PID, 分区, SeqNum>` 让 Broker 拒收乱序批次（`OutOfOrderSequenceException` 并断连），从而在 ≤5 个在飞请求下仍保序。

（2）**失效场景：Kafka 分区内有序也会被击穿**

- **未开幂等 + 多在飞请求 + 重试**：批次 1 超时重试，批次 2 先写入，重试成功的批次 1 排在批次 2 之后 → 分区内乱序。
- **分区数扩容**：哈希取模结果变化，同 key 新老消息分流到不同分区；扩分区必须在低峰期配合双写或停止写入窗口。
- **Leader 切换 + unclean 选举**：非同步副本上位后，旧 Leader 尾部消息丢失，后续新消息衔接处出现“逻辑乱序/缺失”。
- **消费端单分区多线程**：Kafka 保证“一个分区只给组内一个消费者”，但消费者内部把 poll 到的批次丢线程池处理，顺序照样破坏。

（3）**踩坑案例：批次重试乱序引发的账户余额错乱**

- **现象**：账户余额流水偶发与交易流水不一致，某账户“先扣后加”被执行为“先加后扣”，余额偏差。
- **排查**：对比消息中的业务时间戳与分区内 offset 顺序，发现少量消息的 offset 顺序与业务时间戳顺序相反；事故均伴随生产者 `Request timed out` 日志。
- **根因**：生产者未开幂等，`max.in.flight.requests.per.connection=5`（默认），超时批次重试时与后续批次交叉写入，造成分区内乱序。
- **修复**：开启 `enable.idempotence=true`（允许 5 个在飞请求仍保序）；消费端流水处理增加版本号校验，旧版本直接拒绝；存量偏差账户按交易流水重算订正。

（4）**量化数据**

- `max.in.flight.requests.per.connection=1` 相比 5，发送吞吐约下降 50%（失去流水线效应）；开幂等后可用 5 个在飞请求保序，吞吐损失收敛到 5%~10%。
- 全局有序上限：单分区串行写入约 10MB/s 或 1000~5000 TPS（消息大小相关），扩容只能靠增分区 + 拆业务键。
- 扩分区乱序比例：N → 2N 分区时约 50% 的 key 会更换分区，双写过渡期需覆盖全部存量 key 的切换窗口。

#### 拓展追问

1. **为什么 Kafka 只承诺分区内有序？全局有序的唯一实现方式及其代价是什么？**
   并行度与全局有序互斥：全局有序要求写入与消费都单点串行，吞吐永远无法水平扩展。唯一实现是 Topic 只建 1 个分区 + 单生产者 + 单消费者，吞吐上限约 1000~5000 TPS，仅适合 Binlog 单库同步这类场景；一旦需要扩展，就必须按业务键拆分为“局部有序”。
2. **开启幂等后为什么 `max.in.flight.requests.per.connection` 上限是 5？**
   Broker 为每个 `<PID, 分区>` 维护的去重/排序窗口容量有限，只能容忍有限的“在飞批次”乱序到达：超过 5 个在飞请求时，最早批次可能在窗口外无法正确判重，因此客户端硬编码限制 ≤5。这是“保序窗口大小”与“流水线深度”的工程折中。
3. **消费端如何在“单分区串行”的前提下提升吞吐？写出具体结构。**
   结构：poll 线程拉取批次 → 按消息 key 哈希到 N 个内存队列（`LinkedBlockingQueue`）→ 每队列配 1 个处理线程串行消费 → 处理线程回调通知 poll 线程提交 offset。要点：同 key 必落同队列保序；队列满时 poll 线程阻塞形成背压；提交 offset 需等整批处理完成（用计数器追踪），崩溃后靠幂等消化重复。

#### 场景题

**场景**：日志采集链路要求同一用户的行为日志严格有序（用于行为回放），近期发现部分用户的日志序列中出现“时间倒流”。你如何排查和修复？

**应急处理**：对已受影响的回放任务标记数据不可信，暂停依赖严格序的下游分析；采集端无业务资损，优先定位乱序来源。

**根因分析**：先验证“同用户是否同分区”（检查是否以 userId 为 key），若路由正确则乱序只能发生在分区内：核对生产者配置，发现未开幂等且 `max.in.flight.requests.per.connection=5`，结合事故时段网络超时日志，确认是批次重试乱序；再排除消费端（单分区单线程则不引入乱序）。

**长期方案**：生产者开启 `enable.idempotence=true`；采集端在消息内携带客户端时间戳与序号，消费端回放时按序号校验，发现逆序告警；网络抖动严重时适当调大 `request.timeout.ms`（如 30s）减少无谓重试。

**权衡**：幂等 + `acks=all` 使采集链路吞吐下降约 10%~20%，但日志量在容量内；若后续采集量翻倍，备选方案是接受乱序，在下游回放时用序号重排（把保序成本从生产端转移到消费端）。

### 【困难】如何应对 Kafka 消息积压？⭐⭐⭐

- **紧急处理**
  - 增加消费者实例（不超过分区数）
  - 调整参数：增大 max.poll.records
  - 选择性跳过：重置 offset（仅限非关键数据）
- **性能优化**
  - 采用异步处理：分离消息拉取和处理逻辑
  - 优先处理：确保关键业务消息优先消费
- **监控预防**
  - 实时监控 Lag 指标
  - 配置自动扩缩容机制
- **极端情况处理**
  - 拆分 Topic：分散积压消息
  - 离线处理：导出到 HDFS 批量消费

**方案对比**

| 方法        | 见效速度 | 影响         | 适用场景     |
| ----------- | -------- | ------------ | ------------ |
| 增加消费者  | 立即     | 无           | 分区有余量时 |
| 调整参数    | 立即     | 可能内存压力 | 资源充足时   |
| 重置 offset | 立即     | 数据丢失     | 非关键消息   |

**处理原则**

- 先扩容消费者
- 再优化消费逻辑
- 确保核心业务
- 建立预防机制

::: info Kafka 专属积压治理：分区硬约束与临时 Topic 方案

:::

通用的积压应急方法论（扩容/降级/限流）见 MQ 面试一文的通用题，此处聚焦 Kafka 的分区硬约束、临时 Topic 方案与量化估算。

（1）**方案权衡：Kafka 场景下的积压处置路径**

| 方案                                | 见效速度 | 关键约束                                                | 适用边界                       |
| :---------------------------------- | :------- | :------------------------------------------------------ | :----------------------------- |
| 扩消费者实例至分区数                | 分钟级   | 消费者数 ≤ 分区数，超出即空转                           | lag 中等、分区有余量（首选）   |
| 新建临时 Topic（分区 ×N）+ 转发程序 | 半小时级 | 转发程序需批量拉取（`fetch.max.bytes` 调大）+ 批量写入  | 分区不足、积压千万级以上       |
| 调大 `max.poll.records` + 批处理    | 立即     | 需消费逻辑支持批量，且单批耗时 < `max.poll.interval.ms` | 消费逻辑存在批量优化空间       |
| `seek()` 跳过存量 + 只消费增量      | 立即     | 存量丢失                                                | 仅适用于可弃数据（监控指标等） |

（2）**失效场景**

- **分区数是硬上限**：Kafka 一个分区同一时刻只能被组内一个消费者线程消费，扩实例超过分区数纯浪费；且**分区数只能增不能减**，临时加分区还需 rebalance，救不了急。
- **积压消费触发 offset 过期**：消费者长期追不上时，若 `offsets.retention.minutes`（默认 7 天）到期且消费组无活跃成员，位点被清理，恢复后从 `auto.offset.reset` 位置重新消费，可能漏掉存量。
- **积压期间消息被保留策略清理**：`log.retention.ms` 小于积压消化时长时，存量未消费即被删除——积压治理必须先核对保留期。
- **盲目扩消费者打挂下游**：消费速率突增 N 倍，下游 DB/接口先于积压清零而崩溃。

（3）**踩坑案例：一次 3000 万级 lag 的大促事故**

- **现象**：大促开闸后 15 分钟，订单履约 Topic 的 lag 突破 3000 万，实时看板延迟 40 分钟。
- **排查**：消费端已扩到等于分区数（64），继续扩实例无效；链路追踪发现消费逻辑中同步调用的库存服务 P99 从 20ms 恶化到 1.5s。
- **根因**：库存服务热点行锁导致下游变慢，而分区数限制了消费并发上限，消化速率（约 4000 TPS）远低于生产速率（约 2 万 TPS）。
- **修复**：新建 640 分区的临时 Topic，原消费组改为“只拉不处理、批量转发”（吞吐 10 万 TPS 级），临时消费组 640 并发消化；同时库存接口改批量（单批 200 条），3 小时追平；事后回收临时 Topic，并按峰值重新规划分区数。

（4）**量化数据：积压恢复估算公式**

```
恢复时长 = lag / (消化 TPS - 生产 TPS)
```

- 例：lag 3000 万，消化 2.4 万 TPS，生产 4000 TPS → 30000000 / 20000 ≈ 1500s ≈ 25 分钟。
- 关键参数参考：`max.poll.records` 默认 500，积压期可调到 1000~2000；`fetch.max.bytes` 默认 50MB，转发场景可保持或调大；`max.poll.interval.ms` 默认 5 分钟，批处理调大后必须同步调大该值防被踢。
- 告警阈值：lag > “正常消费 TPS × 10 分钟”即告警；消化期间每 5 分钟重估一次清零时间。

#### 拓展追问

1. **为什么 Kafka 的分区数只能增不能减？这对积压治理的容量规划意味着什么？**
   分区是 offset 独立编号的物理日志，合并分区需要跨日志重排 offset 与重分布副本，Kafka 不提供该能力。因此分区数必须按“未来 1~2 年峰值消费并发 × 1.5”一次性规划到位；事后补救只能走临时 Topic 方案，成本远高于提前规划。
2. **临时 Topic 转发方案中，转发程序自身如何保证不成为新瓶颈？**
   三个要点：转发逻辑只做“拉取→写入”，不做业务处理；拉取端调大 `fetch.max.bytes`/`max.poll.records` 批量拉，写入端用回调异步 + 攒批；转发实例数等于原 Topic 分区数以拉满并行。实测转发吞吐可达正常消费的 10 倍以上，因为它消除了业务逻辑耗时。
3. **积压期间消费者被 `max.poll.interval.ms` 踢出引发反复 rebalance，如何处置？**
   这是恶性循环：批处理变慢 → 超过 `max.poll.interval.ms`（默认 5 分钟）被踢 → rebalance → 重复消费更慢。处置：临时调大 `max.poll.interval.ms` 到 30 分钟，或减小 `max.poll.records` 使单批处理时间回到阈值内；积压期也可临时关闭非必要消费者的订阅，集中资源保核心链路。

#### 场景题

**场景**：凌晨发现某核心 Topic 的 lag 以每小时 1000 万的速度增长，当前积压 5000 万，该 Topic 只有 32 个分区且不可减少，消费者已满配。生产速率 8000 TPS，单消费者吞吐 500 TPS。你会如何决策？

**应急处理**：先算账：当前消化能力 32 × 500 = 1.6 万 TPS，净消化 8000 TPS，自然追平需 50000000 / 8000 ≈ 104 分钟，且前提是消费逻辑不再恶化；若业务可接受 2 小时延迟则扩消费者+优化批处理硬扛，否则必须启动临时 Topic 方案。

**根因分析**：确认瓶颈位置（下游慢 or 并发不足）后再选路径；本案消费者满配说明受限于分区数，优化单条耗时的收益有限。

**长期方案**：新建 320 分区的临时 Topic，转发 + 消化速率可到 10 万 TPS 级，净消化 9.2 万 TPS，约 9 分钟追平；事后把原 Topic 分区数按峰值规划提到 128（Kafka 分区数只能增不能减，一步到位），并建立 lag 增速告警（增速 > 消费速率即电话告警）。

**权衡**：临时 Topic 方案需半小时工程准备 + 事后回收，但能把 104 分钟的延迟压缩到 10 分钟内；对履约链路这类时效敏感业务，工程准备成本远低于业务损失，且该预案应提前演练而非现场首写。

### 【困难】在 Kafka 中，如何实现幂等性 Producer？它对消息处理的意义是什么？⭐⭐

**最佳实践**：幂等性+事务+合理重试配置，构建高可靠消息系统

**核心配置**

```java
Properties props = new Properties();
props.put("enable.idempotence", "true");  // 启用幂等性
props.put("acks", "all");                 // 确保所有副本确认
props.put("retries", Integer.MAX_VALUE);  // 无限重试
```

**关键特性**

| 特性     | 说明             | 优势           |
| -------- | ---------------- | -------------- |
| 消息去重 | 自动过滤重复消息 | 避免数据重复   |
| 顺序保证 | 单分区内消息有序 | 维护数据一致性 |
| 自动重试 | 内置安全重试机制 | 提升可靠性     |

**高级应用**

- **事务支持**

```java
props.put("transactional.id", "txn-1");
producer.initTransactions();  // 初始化事务
```

- **Exactly-Once 语义**
  - 结合幂等性和事务
  - 确保端到端一次性处理

**使用建议**

- **适用场景**：金融交易、订单处理等关键业务
- **性能影响**：轻微吞吐量下降，换取数据可靠性
- **版本要求**：Kafka 0.11+

## Kafka 架构

### 【困难】Kafka 为什么性能高？⭐⭐

Kafka 的数据存储在磁盘上，为什么还能这么快？

说 Kafka 很快时，他们通常指的是 Kafka 高效移动大量数据的能力。Kafka 为了提高传输效率，做了很多精妙的设计。

::: info 顺序 I/O（追加写入）

:::

磁盘读写有两种方式：顺序读写或者随机读写。在顺序读写的情况下，磁盘的顺序读写速度和内存接近。因为磁盘是机械结构，每次读写都会寻址写入，其中寻址是一个“机械动作”。Kafka 利用了一种分段式的、只追加 (Append-Only) 的日志，基本上把自身的读写操作限制为**顺序 I/O**，也就使得它在各种存储介质上能有很快的速度。

::: info 零拷贝

:::

Kafka 数据传输是一个从网络到磁盘，再由磁盘到网络的过程。在网络和磁盘之间传输数据时，消除多余的复制是提高效率的关键。**Kafka 利用零拷贝技术来消除传输过程中的多余复制**。

如果不采用零拷贝，Kafka 将数据同步给消费者的大致流程是：

1. 从磁盘加载数据到 os buffer
2. 拷贝数据到 app buffer
3. 再拷贝数据到 socket buffer
4. 接下来，将数据拷贝到网卡 buffer
5. 最后，通过网络传输，将数据发送到消费者

采用零拷贝技术，Kafka 使用 `sendfile()` 系统方法，将数据从 os buffer 直接复制到网卡 buffer。这个过程中，唯一一次复制数据是从 os buffer 到网卡 buffer。这个复制过程是通过 DMA（Direct Memory Access，直接内存访问） 完成的。使用 DMA 时，CPU 不参与，这使得它非常高效。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/9b5da2cfd99e47f4aebadeedb0bad066.webp)

::: info 其他性能设计

:::

- **页缓存** - Kafka 的数据并不是实时的写入磁盘，它充分利用了现代操作系统分页存储来利用内存提高 I/O 效率。具体来说，就是把磁盘中的数据缓存到内存中，把对磁盘的访问变为对内存的访问。Kafka 接收来自 socket buffer 的网络数据，应用进程不需要中间处理、直接进行持久化时。可以使用 mmap 内存文件映射。
- **压缩** - Kafka 内置了几种压缩算法，并允许定制化压缩算法。通过压缩算法，可以有效减少传输数据的大小，从而提升传输效率。
- **批处理** - Kafka 的 Clients 和 Brokers 会把多条读写的日志记录合并成一个批次，然后才通过网络发送出去。日志记录的批处理通过使用更大的包以及提高带宽效率来摊薄网络往返的开销。
- **分区** - Kafka 将 Topic 分区，每个分区对应一个名为的 Log 的磁盘目录，而 Log 又根据大小，可以分为多个 Log Segment 文件。这种分而治之的策略，使得 Kafka 可以**并发**读，以支撑非常高的吞吐量。此外，Kafka 支持负载均衡机制，将数据分区近似均匀地分配给消费者群组的各个消费者。

::: info 量化视角：每个设计到底贡献了多少性能

:::

（1）**方案权衡：高吞吐配置 vs 低延迟配置**

| 场景                  | 关键参数                                | 典型值                                           | 效果与代价                                   |
| :-------------------- | :-------------------------------------- | :----------------------------------------------- | :------------------------------------------- |
| 高吞吐（日志/大数据） | `batch.size` + `linger.ms`              | `batch.size=64KB~1MB`、`linger.ms=50~100ms`      | 吞吐提升 3~5 倍，代价是单条延迟增加 50~100ms |
| 低延迟（业务消息）    | `linger.ms` + `acks`                    | `linger.ms=0~5ms`、`acks=1`                      | 延迟毫秒级，吞吐比攒批模式低 3~5 倍          |
| 消费端高吞吐          | `fetch.min.bytes` + `fetch.max.wait.ms` | `fetch.min.bytes=1MB`、`fetch.max.wait.ms=500ms` | 单次拉取更大批次，减少请求次数               |

（2）**各机制的量化贡献（经验值）**

- **顺序写**：磁盘顺序写带宽可达数百 MB/s，与内存同一数量级；随机写受寻址限制仅数 MB/s，差距达百倍。
- **页缓存**：写入先落 PageCache（内存速度，亚毫秒级），由 OS 异步刷盘；若强制 `flush.messages=1` 每条 fsync，吞吐从百万级跌至万级。
- **零拷贝**：消费路径从 4 次拷贝 + 4 次上下文切换降为 1 次 DMA 拷贝 + 2 次切换，CPU 占用下降约 50% 以上。
- **批量 + 压缩**：`batch.size` 从默认 16KB 调到 1MB、`linger.ms=100ms`，吞吐可提升 3~5 倍；LZ4 压缩进一步节省约 50% 带宽。
- **分区并行**：吞吐随分区数近似线性扩展，单机 100 分区量级可达百万条/秒；但分区过多（单机数千）会使选主、元数据、文件句柄开销显著上升。

（3）**失效场景：Kafka 什么时候会变慢**

- **消费“冷数据”击穿页缓存**：消费者回溯数天前的数据时，读请求全部命中磁盘随机读，零拷贝优势消失，吞吐可能跌至热数据的 1/10。
- **分区数与消费者数失衡**：单消费者订阅过多分区，poll 循环串行处理，拉取延迟叠加。
- **压缩算法选择不当**：Gzip 压缩比高但 CPU 开销大，CPU 受限机器上换 LZ4/Zstd 吞吐可提升数倍。
- **磁盘 IO 争抢**：副本同步、日志压缩（compaction）、消费读三者共享磁盘带宽，高峰期互相踩踏。

（4）**踩坑案例：一次“磁盘正常但 Kafka 变慢 10 倍”的排查**

- **现象**：集群写入 TPS 从 30 万跌至 3 万，Producer 端报 `Request timed out`，但磁盘 util 只有 40%。
- **排查**：Broker 指标显示 PageCache 命中率从 95% 跌至 20%；同期上线了一个新消费组在回溯 3 天前的存量数据。
- **根因**：回溯消费把冷数据批量载入页缓存，挤掉了写入链路的热点缓存，写入从内存速度退化为磁盘速度——典型的“读写互相踩踏”。
- **修复**：回溯任务迁到独立集群（或错峰低限速运行）；主集群按“实时写入 vs 离线回溯”职责拆分；建立 PageCache 命中率与生产延迟的联动告警。

#### 拓展追问

1. **为什么 Kafka 不主动频繁 fsync，却仍敢宣称“不丢数据”？**
   这是“单机持久性”与“副本持久性”的分工：单副本确实可能丢页缓存中未刷盘的数据，但 `acks=all` + `min.insync.replicas=2` 保证同一消息在多台机器的页缓存中同时存在，整机柜同时损毁的概率极低；用副本冗余替代昂贵的同步刷盘，是 Kafka“快且可靠”的核心设计。
2. **零拷贝为什么只优化消费路径，生产路径用不上 sendfile？**
   `sendfile` 的能力是“磁盘→网卡”的直传；而生产路径是“网卡→页缓存”（写入），由 OS 的 DMA 直接完成，本来就不经过用户态拷贝。因此零拷贝的收益集中在消费/Follower 同步这类“读盘发网”的路径上。
3. **batch.size 和 linger.ms 应如何配套调优？为什么不能只调其中一个？**
   `batch.size` 是批次字节上限，`linger.ms` 是攒批等待上限，两者谁先触发谁生效：只调大 batch.size 而 linger.ms=0，低流量时批次永远攒不满即发出，形同虚设；只调大 linger.ms 而 batch.size 太小，批次很快装满提前发送，白等。高吞吐推荐 `batch.size=1MB` + `linger.ms=50~100ms` 配套，同时预留 `buffer.memory`（默认 32MB，建议翻倍）防阻塞。

#### 场景题

**场景**：日志采集链路要求单机写入从 20 万 TPS 提升到 80 万 TPS，预算不允许加机器。你会从哪些维度榨取性能？

**应急处理**：先确认当前瓶颈：Producer 端看 `record-send-rate` 与请求排队（`buffer.memory` 是否满）、Broker 端看磁盘 util 与 PageCache 命中率、网络带宽是否打满，避免盲目调参。

**根因分析**：日志场景单条小（约 200B）、容忍秒级延迟，典型的“攒批收益最大”场景；若当前 `linger.ms=0`、`batch.size=16KB`（默认），则请求次数是吞吐的直接上限。

**长期方案**：按收益排序逐项落地：① `linger.ms=100ms` + `batch.size=1MB`，减少请求次数（预期吞吐 ×3~5）；② 端到端 LZ4 压缩，带宽降约 50%；③ 分区数从 32 提到 128 并同步扩消费者，释放并行度；④ 确认 `acks=1`（日志可接受），避免副本同步延迟叠加；⑤ 磁盘换 NVMe 或多盘 `log.dirs` 分散 IO。每步上线后压测验证，避免一次性全改无法归因。

**权衡**：攒批引入约 100ms 的额外延迟，日志链路完全可接受；若同样的配置用在交易消息上则不可接受——性能调优的第一步永远是确认业务的延迟容忍度，而不是背参数。

### 【困难】Kafka 如何实现流量控制？⭐

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
  - 手动提交偏移量（`enable.auto.commit=false`）
  - 通过处理进度反馈调节消费速率
- **系统级缓冲**
  - 生产者缓冲区（`buffer.memory`，默认 32MB）
  - 消费者 fetch 队列（`queued.max.messages`，默认 500）

**高级控制策略**

- **动态限流**：基于监控指标（如 CPU/网络负载）自动调整生产/消费速率
- **异步批处理**：流处理框架（Flink/Spark）的微批处理优化吞吐量

**配置建议**

| **场景**   | **优化方向**                 | **典型值**               |
| ---------- | ---------------------------- | ------------------------ |
| 高吞吐场景 | 增大`linger.ms`+`batch.size` | `linger.ms=50-100ms`     |
| 低延迟场景 | 减小`fetch.max.wait.ms`      | `fetch.max.wait.ms=10ms` |
| 稳定性优先 | 降低`max.in.flight.requests` | 设为 1（确保顺序性）     |

### 【困难】Kafka 如何处理数据倾斜问题？⭐

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

### 【困难】Kafka 处理请求的全流程？⭐⭐

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

### 【中等】Kafka 中如何实现时间轮？⭐

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

- **Netty**：`HashedWheelTimer`（单层+轮次）。
- **Kafka**：多层次时间轮+降级。
- **Caffeine Cache**：本地缓存的任务调度。

### 【中等】Kafka 的索引设计有什么亮点？⭐

Kafka 的索引设计通过**稀疏索引 + 二分查找 + 分段存储**，在**查询效率、存储成本、扩展性**之间取得平衡，适合高吞吐、低延迟的消息系统需求。

Kafka 的索引设计（主要涉及**偏移量索引（.index）和时间戳索引（.timeindex）**）具有以下核心优势：

**高效查询（O(1) ~ O(logN) 复杂度）**

- **稀疏索引**：不存储每条消息的索引，而是按一定间隔（如每 4KB 数据）建立索引项，大幅减少索引文件大小。
- **二分查找**：通过索引快速定位消息所在的**物理位置（磁盘文件+偏移量）**，减少全量扫描。

**低存储开销**

- **紧凑结构**：索引文件仅存储**偏移量 + 物理位置**（固定 8 字节/项），占用空间极小。
- **分段存储**：每个日志段（Segment）独立维护索引，避免单一大文件索引的性能瓶颈。

**快速故障恢复**

- **内存映射（MMAP）**：索引文件通过内存映射加速读取，重启时无需全量加载。
- **懒加载**：仅加载活跃分片的索引，减少启动时间。

**支持时间范围查询**：**时间戳索引（.timeindex）**允许按时间戳快速定位消息，适用于日志回溯、监控等场景。

**索引自动更新**：日志压缩（Compaction）或删除（Retention）时，索引同步清理，避免无效查询。

## Kafka 优化

### 【中等】Kafka 各组件如何进行优化？⭐⭐

- **Producer 优化**
  - 批量发送（`linger.ms`+`batch.size`）
  - 压缩算法（Snappy/Gzip 降低带宽占用）
  - 异步发送（`acks=1/all`平衡性能与可靠性）
- **Consumer 优化**
  - 动态分区分配（`range/round-robin`策略）
  - 手动提交 Offset（`enable.auto.commit=false`避免重复/丢失）
  - 并行消费（分区数≥消费者数，避免闲置）
- **Broker 优化**
  - 副本机制（`replication.factor≥2`保障容错）
  - ISR 列表（同步副本快速选举新 Leader）
  - 磁盘顺序写（高吞吐设计，避免随机 IO）

**关键配置建议**

| 场景           | 推荐配置                          | 说明                  |
| -------------- | --------------------------------- | --------------------- |
| 高吞吐场景     | `compression.type=snappy`         | 压缩率与 CPU 开销平衡 |
| 数据持久化要求 | `log.retention.hours=168`（7 天） | 根据存储容量调整      |
| 低延迟场景     | `num.io.threads=8`（默认值翻倍）  | 提升磁盘 IO 并行度    |

**版本演进注意**

- **KRaft 模式**：Kafka 3.0+版本内置元数据管理，逐步淘汰 Zookeeper 依赖
- **性能取舍**：分区数并非越多越好（建议单 Broker≤2000 分区，避免元数据膨胀）

### 【困难】Kafka 在高吞吐量场景下如何保持低延迟？有哪些性能调优的策略？⭐⭐

通过 **并行化、批处理、硬件加速** 实现高吞吐，同时控制分区/副本数量及网络参数以降低延迟。

**分区与副本优化**

- **分区数**：增加分区提升并行度，但避免过多（管理开销）。
- **副本数**：通常设 **2-3**，平衡可靠性与性能。

**生产端调优**

- **acks=1**：确保至少 1 个副本写入，兼顾性能与可靠性。
- **batch.size ↑** + **linger.ms ↓**：减少网络请求，降低延迟。
- **压缩**：选用 **lz4**（高效压缩/解压），节省带宽。

**消费端调优**

- **fetch.min.bytes** + **fetch.max.wait.ms**：平衡吞吐与延迟。

**硬件优化**

- **磁盘**：SSD（显著提升 I/O 性能）。
- **内存/CPU**：增大内存缓存数据，多核处理并行任务。
- **网络**：确保高带宽，减少传输延迟。

**Broker 配置**

- **log.retention ↑**：减少日志频繁清理开销。
- **socket 缓冲区 ↑**：提升网络传输效率。

### 【困难】在 Kafka 中，如何优化分区的读写性能？有哪些常见的调优策略？⭐⭐

在 Kafka 中，优化分区的读写性能主要可以通过以下几种常见的调优策略实现：

1. 合理设置分区数（partitions）：根据生产者和消费者的能力，以及集群的规模，设置合适的分区数可以在提高写入和读取性能方面产生显著效果。
2. 增加副本数（replication factor）：副本数的增加可以提升数据的可靠性和读取性能，不过需要在性能和数据冗余之间找到平衡点。
3. 调整 broker 配置参数：通过调优 Kafka broker 的相关配置，如调整 `log.retention.hours`、`log.segment.bytes`、`log.flush.interval.messages` 等参数，可以显著提升读写性能。
4. 调优生产者和消费者的配置：例如调整生产者的批量发送大小（`batch.size`）、压缩类型（`compression.type`）、消费者的最大拉取记录数（`max.poll.records`）等。
5. 硬件配置优化：选择高 IOPS 的磁盘、足够的内存和计算资源来支撑 Kafka 的高并发读写请求。
6. 分区和副本分布优化：确保不同主题的分区和副本分布在不同的 broker 上，以避免潜在的读写瓶颈。

## Kafka 事务

### 【中等】Kafka 是否支持事务？如何支持事务？⭐

Kafka 自 0.11 版本开始提供了对事务的支持，目前主要是在 read committed 隔离级别上做事情。它能**保证多条消息原子性地写入到目标分区，同时也能保证 Consumer 只能看到事务成功提交的消息**。

:::info exactly once

:::

Kafka 事务非严格意义的事务，其主要目标是为了**实现 exactly once 语义**的，确保消息在生产、传输和消费过程中不被重复处理或丢失。

消息可靠性保障，由低到高为：

- **最多一次（at most once）**：消息可能会丢失，但绝不会被重复发送。
- **至少一次（at least once）**：消息不会丢失，但有可能被重复发送。
- **精确一次（exactly once）**：消息不会丢失，也不会被重复发送。

:::info Kafka 事务实现机制

:::

- **事务协调器**
  - 负责管理事务的整个生命周期（启动、提交、中止）。
  - 将事务状态持久化到内部主题 `__transaction_state` 中。
- **幂等生产者**
  - 通过唯一的 `Producer ID (PID)` 和 `Sequence Number` 来标识和区分消息。
  - 确保同一生产者发送的同一消息**只会被 Broker 写入一次**，避免因重试导致的消息重复。
- **事务性消费**
  - 消费者可配置 `isolation.level` 参数。
  - 设置为 `read_committed` 时，消费者**只会读取已提交事务**的消息，过滤掉未提交（中止）的消息，保证最终一致性。

:::info Kafka 事务工作流程

:::

- **Prepare**: 生产者向事务协调器发起事务，获取事务 ID。生产者在事务内发送消息，消息携带 PID 和序列号以保证幂等性。
- **Commit/Abort**: 生产者结束事务，向协调器发送提交或中止请求。
- **Consume**: 配置为 `read_committed` 的消费者只消费已提交的消息，实现端到端的一致性。

**总结**：Kafka 通过**事务协调器、幂等生产者和事务性消费**三者协同，在消息系统内部实现了生产端的精确一次发送和消费端的事务隔离，从而达成了 Exactly-Once 语义。

### 【困难】Kafka 如何实现 Exactly Once 语义？⭐⭐

Kafka 通过`幂等生产`+`事务`+`精准 offset 控制`，在分布式环境下实现**端到端 Exactly Once**，适用于金融、计费等强一致性场景。

**核心机制**

- **幂等生产者**
  - 通过唯一`Producer ID`和消息`序列号`实现去重
  - 确保单条消息**不重复**（网络重试场景）
- **事务生产者**
  - 提供跨分区的原子操作（`commitTransaction`/`abortTransaction`）
  - 保证一组消息**全成功或全失败**
- **消费端去重**
  - 基于`offset`管理 + 消费者组机制
  - 避免消息被重复处理

**异常处理**

| **方法** | **作用**                           | **场景示例**             |
| -------- | ---------------------------------- | ------------------------ |
| 事务回滚 | 撤销未完成的操作，保持原子性       | 生产者写入部分分区失败时 |
| 自动重试 | 应对临时性故障（如网络抖动）       | Broker 短暂不可用        |
| 幂等消费 | 通过业务 ID 或状态记录避免重复处理 | 消费者重启后重复拉取消息 |

**关键扩展**

- **CAP 权衡**：Kafka 优先保证**高可用**和**分区容错**（AP），通过事务补充一致性
- **Kafka Streams**：利用状态存储和检查点机制实现流处理 Exactly Once
- **消费者组**：`enable.auto.commit=false`时需手动提交 offset 以精准控制消费

## Kafka 对比

### 【困难】Kafka、RocketMQ、RabbitMQ 有什么区别？如何选型？⭐⭐⭐

这三款主流消息队列各有定位和适用场景，**没有绝对优劣，只有是否适合业务场景**。

**核心对比表**

| 对比维度          | **Kafka**                                  | **RocketMQ**                                   | **RabbitMQ**                                  |
| ----------------- | ------------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| **开发语言**      | Scala/Java                                 | Java                                           | Erlang                                        |
| **出身**          | LinkedIn（Apache 顶级项目）                | 阿里巴巴（Apache 顶级项目）                    | RabbitMQ Technologies（VMware）               |
| **吞吐量**        | **极高**（百万级 TPS）                     | **高**（十万级 TPS）                           | **中等**（万级 TPS）                          |
| **延迟**          | 毫秒级                                     | 毫秒级                                         | **微秒级**（最低）                            |
| **消息可靠性**    | 高（ISR + 副本）                           | 高（同步刷盘 + 主从复制）                      | **极高**（多种确认机制 + 持久化）             |
| **消息有序**      | 分区内有序                                 | 队列内有序（支持严格顺序消息）                 | 队列内有序                                    |
| **事务消息**      | 支持（0.11+，跨分区原子性）                | **原生支持**（半消息 + 事务回查）              | 不支持（需AMQP事务，性能差）                  |
| **定时/延迟消息** | 不支持（需业务实现）                       | **原生支持**（18个延迟级别，5.0+支持任意时间） | 插件支持（rabbitmq_delayed_message_exchange） |
| **消息回溯**      | 支持（按offset）                           | 支持（按时间）                                 | 不支持                                        |
| **消息堆积**      | **极强**（磁盘顺序写，亿级）               | **极强**（设计支持亿级堆积）                   | **弱**（堆积后性能急剧下降）                  |
| **协议**          | 自研协议                                   | 自研协议                                       | **AMQP/STOMP/MQTT**（标准协议）               |
| **路由**          | Topic/Partition                            | Topic/Tag/MessageQueue                         | **灵活**（Exchange + Routing Key）            |
| **管理界面**      | 第三方（Kafka Manager等）                  | 自带Dashboard                                  | 自带Web管理界面                               |
| **元数据管理**    | ZooKeeper/KRaft                            | NameServer                                     | Mnesia数据库                                  |
| **生态**          | 大数据生态（Kafka Connect/Streams/ksqlDB） | 阿里云生态                                     | Spring AMQP生态                               |

**选型建议**

- **选 Kafka**：

  - 大数据场景（日志收集、用户行为追踪、流计算）
  - 超高吞吐量需求（日志、监控、埋点）
  - 与 Hadoop/Spark/Flink 等大数据组件集成
  - 消息回溯需求

- **选 RocketMQ**：

  - 金融级业务（订单、交易、支付）
  - 需要事务消息、定时消息、顺序消息等高级特性
  - 国内技术栈（社区活跃、中文文档完善）
  - 消息堆积能力强但需要业务级可靠性保证

- **选 RabbitMQ**：
  - 复杂路由需求（路由键、主题匹配）
  - 低延迟、高可靠场景（<1万TPS但要求极高可靠性）
  - 需要标准协议（AMQP）
  - 小规模系统、微服务异步通信

**架构差异本质**

- **Kafka**：以**吞吐量**为核心，存储采用 Partition 独立日志，适合**流式数据**
- **RocketMQ**：以**业务可靠性**为核心，存储采用 CommitLog 统一日志 + ConsumeQueue 索引，融合了 Kafka 的高吞吐和 RabbitMQ 的业务特性
- **RabbitMQ**：以**灵活路由和协议兼容**为核心，基于 Erlang 的 Actor 模型，适合**业务消息**

## Kafka Stream

### 【困难】Kafka 与 Flink 的集成是如何实现的？如何优化 Flink 与 Kafka 之间的数据流动？⭐⭐

实现 **高吞吐、低延迟、强一致性** 的流式数据处理管道。

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

**高级特性**

- **动态发现分区**：`setStartFromLatest()`/`setStartFromEarliest()`。
- **水位线生成**：结合 `assignTimestampsAndWatermarks` 处理事件时间。
- **Exactly-Once 保障**：启用 Kafka 事务（需配置 `transaction.timeout.ms`）。

### 【困难】Kafka 的 Stream 和 Table 是如何相互转换的？它们在 Kafka Streams 中的应用场景是什么？⭐⭐

通过 **流表转换 + 状态管理**，实现实时计算与状态维护的统一处理。

**核心概念对比**

| **抽象类型** | **特点**                           | **适用场景**                             |
| ------------ | ---------------------------------- | ---------------------------------------- |
| **Stream**   | 无界、有序的键值记录流（事件日志） | 实时分析、事件监控（如点击流、交易记录） |
| **Table**    | 有状态的键值快照（当前数据视图）   | 状态维护（如用户配置、库存数量）         |

**相互转换操作**

**(1) Stream → Table**

通过 **聚合操作** 将动态流转换为状态表：

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

**(2) Table → Stream**

通过 **toStream()** 将表变更作为流输出：

```java
KTable<String, Long> table = builder.table("input-topic");
KStream<String, Long> stream = table.toStream();  // 输出表的更新事件
```

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

### 【中等】什么是 ksqlDB？它与 Kafka Streams 有什么区别？⭐

**ksqlDB** 是一个建立在 Kafka 之上的**流式 SQL 数据库**，允许开发者使用 SQL 语句对 Kafka 中的实时数据流进行查询、过滤、聚合、连接等操作，无需编写 Java/Scala 代码。

**核心特性**

- **SQL 接口**：使用类 SQL 语法操作 Kafka 数据流，降低流处理门槛
- **持久化查询**：查询持续运行，结果实时输出到新 Topic
- **物化视图**：通过 `CREATE TABLE AS SELECT` 创建物化视图，实时维护状态
- **流表连接**：支持 Stream-Stream、Stream-Table、Table-Table 的 JOIN 操作
- **Exactly-Once 语义**：底层基于 Kafka 事务保证

**ksqlDB vs Kafka Streams 对比**

| 对比维度     | **ksqlDB**                  | **Kafka Streams**              |
| ------------ | --------------------------- | ------------------------------ |
| **接口**     | SQL                         | Java/Scala API                 |
| **学习门槛** | **低**（会 SQL 即可）       | **高**（需理解流处理编程模型） |
| **灵活性**   | 中（SQL 表达能力有限）      | **高**（任意复杂业务逻辑）     |
| **部署**     | 独立服务（ksqlDB Server）   | 嵌入应用（客户端库）           |
| **运维**     | 集中管理查询                | 分散在各应用                   |
| **UDF/UDAF** | 支持（Java/Python）         | 原生支持                       |
| **适用场景** | 快速原型、简单ETL、运维分析 | 复杂业务逻辑、定制化流处理     |

**典型 SQL 示例**

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

**选型建议**

- **选 ksqlDB**：希望快速验证流处理方案、团队 SQL 技能强、业务逻辑相对简单
- **选 Kafka Streams**：业务逻辑复杂、需要精细控制状态、对性能要求极致

### 【中等】Kafka KRaft 模式的工作原理是什么？相比 ZooKeeper 有何优势？⭐

**KRaft（Kafka Raft Metadata mode）** 是 Kafka 2.8 引入、3.3 生产可用、3.5 默认推荐的**去 ZooKeeper 化**架构，使用内置的 Raft 共识协议管理元数据。

**KRaft 架构核心**

- **Controller Quorum（控制器仲裁队列）**：由奇数个（通常3或5个）Controller 节点组成，通过 Raft 协议选举 Leader Controller
- **元数据日志（Metadata Log）**：元数据以日志形式记录在内部 Topic `__cluster_metadata` 中，通过 Raft 协议复制到所有 Controller
- **Broker 角色**：普通 Broker 节点从 Controller 拉取元数据日志变更

**节点角色组合**

| 模式               | 说明                                              |
| ------------------ | ------------------------------------------------- |
| **combined mode**  | 同一进程既是 Controller 又是 Broker（小集群适用） |
| **separated mode** | Controller 和 Broker 分离部署（生产推荐）         |

**KRaft vs ZooKeeper 对比**

| 维度           | **ZooKeeper 模式**                   | **KRaft 模式**                           |
| -------------- | ------------------------------------ | ---------------------------------------- |
| **元数据存储** | ZooKeeper ZNode（树形结构）          | Kafka 内部 Topic（追加日志）             |
| **一致性协议** | ZAB 协议                             | Raft 协议                                |
| **元数据规模** | 受限（数十万分区性能下降）           | **支持百万级分区**                       |
| **故障恢复**   | Controller 选举依赖 ZK临时节点，秒级 | Raft Leader选举，**亚秒级**              |
| **运维复杂度** | 需独立部署和维护 ZooKeeper 集群      | **无外部依赖**，运维简化                 |
| **元数据传播** | watch 机制（推送）                   | **拉取式**（Broker主动拉取metadata log） |
| **写性能**     | ZK 写需Quorum确认，串行              | Raft 日志复制，可批量                    |
| **版本支持**   | Kafka 3.x 之前默认                   | Kafka 3.3+ 生产可用，3.5+推荐            |

**KRaft 的核心优势**

1. **架构简化**：去除外部 ZK 依赖，Kafka 成为自包含系统
2. **元数据性能**：支持超大规模集群（百万级分区），元数据传播更快
3. **故障恢复更快**：Raft 选举比 ZK临时节点机制更高效
4. **一致性模型统一**：元数据管理复用 Kafka 自身的日志复制机制

**KRaft 迁移注意**

- Kafka 3.4+ 提供 ZK 到 KRaft 的**在线迁移工具**
- 迁移过程需要谨慎验证，建议先在测试环境演练
- 生产环境建议等 KRaft 在同等规模下充分验证后再迁移

## 参考资料

- [聊聊 Kafka： Kafka 为啥这么快？](https://xie.infoq.cn/article/49bc80d683c373db93d017a99)
