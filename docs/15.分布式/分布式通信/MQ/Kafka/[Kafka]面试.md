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

### 【简单】Kafka 是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 基本概念

#### 💎 关键结论

一句话：Kafka 是一个开源的分布式事件流平台，核心是「分区」这个有序不可变的日志单元。它快的根本原因是把消息系统做成了追加写的分布式日志，天然适合高吞吐场景。

#### ⚡ 记忆卡片

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

#### ⚡ 记忆卡片

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

#### 🔀 发散问题

- **Q：KRaft 模式替代 ZooKeeper 后，Controller 的角色和元数据管理方式发生了哪些本质变化？**

  → KRaft 模式下 Controller 不再依赖外部 ZooKeeper，而是由 Broker 内部通过 Raft 协议选举产生，元数据直接以内部 Topic（`__cluster_metadata`）的形式存储在 Kafka 集群自身中。这消除了 ZooKeeper 作为外部依赖的运维复杂度和跨系统一致性开销，元数据变更通过 Raft 日志复制到多数节点即可确认，延迟更低且支持更大规模的分区数。

- **Q：如果集群中某个 Broker 宕机，Consumer 和 Producer 分别会受到什么影响？Leader 选举过程需要多长时间？**

  → Producer 发送到该 Broker 上 Leader 分区的请求会暂时失败并重试，直到新 Leader 选出；Consumer 所在消费组会触发 Rebalance，将宕机 Broker 上的分区重新分配给存活的消费者。Leader 选举由 Controller 从 ISR 列表中选取（通常是第一个存活副本），一般秒级内完成；若 ISR 为空，默认配置（`unclean.leader.election.enable=false`）下分区会持续不可用、等待原 ISR 成员恢复，只有开启 unclean 选举才允许非 ISR 副本当选，代价是可能丢数据。

### 【简单】Kafka 有哪些应用场景？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kafka / 应用场景

#### 💎 关键结论

Kafka 的主场是「高吞吐 + 可回放」的数据管道：日志采集、流计算对接、指标监控、事件溯源。选型理由很简单：能写得多、存得住、还能重新读一遍。

#### ⚡ 记忆卡片

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

#### 🔀 发散问题

- **Q：Kafka 用于日志采集时，与 Fluentd/Logstash 直接写入 Elasticsearch 相比，引入 Kafka 做中间层的优势和额外成本分别是什么？**

  → Kafka 作为中间层提供了解耦和削峰能力：上游日志产生速率波动不会直接冲击下游 ES，且多个下游系统（ES、HDFS、告警）可以各自独立消费同一份日志。额外成本是需要多维护一套 Kafka 集群及其依赖（如 ZooKeeper 或 KRaft），同时日志从产生到可查询的端到端延迟也会增加。

- **Q：事件溯源（Event Sourcing）和 CQRS 模式如何配合使用？Kafka 在这个架构中承担什么角色？**

  → 事件溯源将状态变更以不可变事件流的形式持久化，CQRS 将读写分离为命令端（写事件）和查询端（读投影），两者配合时事件流既是写端的存储也是读端投影的数据源。Kafka 天然适合作为事件溯源的存储和传输 backbone：其 Topic 提供持久化的有序事件日志，Consumer Group 支持多个投影服务独立消费和回放。

## Kafka 存储

### 【中等】Kafka 如何清理数据？日志删除与压缩如何工作？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 日志保留 / 日志压缩

#### 💎 关键结论

Kafka 用删除保留近期流水，用压缩保留各键的最新状态。两者都由后台异步清理，不是消息一过期就消失；同时启用时，最新值也可能随过期日志段被删除。

#### ⚡ 记忆卡片

- **口诀**：流水删旧段，状态按键留，墓碑空值不空键
- **关键词**：cleanup.policy ／ retention ／ Cleaner ／ value=null ／ offset 空洞
- **链路**：消息正常追加 → delete 按时间或大小删段／compact 按 Key 去旧 → 后台异步回收 → 消费回溯受保留范围约束

#### 📖 核心知识

1. **两种策略服务不同语义**：Topic 用 `cleanup.policy`，Broker 默认策略用 `log.cleanup.policy`。`delete` 适合日志流水；`compact` 保留同一分区内每个 Key 的最新状态，适合 CDC、设备状态、配置管理与会话持久化；`compact,delete` 同时受两种策略约束，不保证先压缩后删除。
2. **日志删除按段、按条件执行**：时间保留用 Topic 的 `retention.ms`，或 Broker 的 `log.retention.ms/minutes/hours`（优先级依次降低）；超过保留时间的旧段可被删除。空间保留用 `retention.bytes`／`log.retention.bytes`，限制的是**每个分区**，超限从最旧段回收；时间、大小任一条件都可触发。`segment.bytes`／`log.segment.bytes` 控制段大小，段滚动也影响清理粒度。
3. **压缩不改变追加写路径**：重复 Key 先照常写入；启用 `log.cleaner.enabled` 后，Broker 的清理管理组件调度 `log.cleaner.threads` 个 Cleaner，建立 Key 到最新 offset 的映射，重写并替换可清理段。干净段是已清理区域，污浊段是之后新增、尚未清理的区域；新写入可使干净段中的旧值再次过时，并非干净段永远不必重扫。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/2d62fa2e6dea413eb1c427fdd51ecab3.png)

清理会丢弃被较新记录覆盖的旧版本，但保留记录的 offset 不变：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/30430106919943c885b0c56e74111161.png)

4. **删除键用墓碑，读取须容忍空洞**：墓碑是**非空 Key、`value=null`**，表示删除该键；`key=null` 不是墓碑，compact 主题要求记录带 Key。压缩后 offset 仍有序但可能不连续；消费者请求已被压掉的 offset，会读到后续仍存在的记录，不应将 offset 差当成精确消息条数。
5. **所有清理都有延迟和成本**：`log.retention.check.interval.ms` 控制删除检查周期；压缩取决于可清理比例、段滚动、滞后限制和 Cleaner 资源，活跃段不参与压缩。段替换、延迟文件删除也需要时间，因此既不承诺逐条到期立即删除，也不能把保留大小当成实时磁盘硬上限。

#### 🔬 扩展知识

::: details

- 【L3】**Cleaner 的可清理范围**：`min.cleanable.dirty.ratio` 衡量是否值得清理，`min.compaction.lag.ms` 限制过早清理，`max.compaction.lag.ms` 限制等待进入可清理状态的时间；后者不保证在资源不足时按时完成物理清除。Cleaner 利用污浊区域建立的最新 offset 映射，也会重写相关干净段以淘汰旧值，而不只清理边界之后的数据。以 Kafka 3.9 为例，默认脏数据比例阈值为 0.5；Broker 的 `log.retention.hours=168`（7 天）、`log.retention.check.interval.ms=300000`（5 分钟）、`log.segment.bytes=1073741824`（1 GiB），实际以 Topic 覆盖和部署配置为准，不能据此承诺准点回收。
- 【L3】**墓碑保留窗口**：`delete.retention.ms` 给重建状态的消费者留下看到墓碑的机会（Kafka 3.9 默认 86400000 毫秒，即 24 小时）；墓碑满足淘汰条件后仍要等后续清理，不能理解为从写入起定时精准删除。全量扫描若慢于有效保留窗口，可能漏掉删除事件；已经维护状态的消费者尤其要监控落后时间。
- 【L3】**可观测与资源权衡**：压缩消耗 CPU、磁盘读写、去重映射内存及临时文件空间。结合键更新频率调整 Cleaner，关注 `kafka.log:type=LogCleanerManager` 等指标、清理积压、耗时、消费 lag 和磁盘余量；清理速度低于写入速度时，仅缩短保留时间未必能及时止损。
- 【L4】**内部状态日志**：`__consumer_offsets`、`__transaction_state` 使用 compact，Kafka Connect 偏移存储、Kafka Streams changelog 也广泛依赖压缩。它们需要从保留状态恢复，而非重放所有中间事件；仅 compact 且没有墓碑时最新值才不会因时间自动淘汰，混用 delete 后不再保证永久可读。
- 【L4】**管理操作与恢复边界**：需要删除整个主题时使用 `kafka-topics.sh --bootstrap-server <broker> --delete --topic <topic_name>`，并确认 `delete.topic.enable` 和权限；截断旧数据用受支持的 DeleteRecords 管理接口。不要把直接删除 `log.dirs` 下文件当作常规清理。`offsets.retention.minutes` 管的是消费组位移保留，不能恢复已被删除的业务日志；回溯窗口要调整业务 Topic 的 retention。

> 📚 延伸阅读：[Kafka 官方文档 - Log Compaction](https://kafka.apache.org/documentation/#compaction)

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “压缩就是消息体压缩，或者写入时按 Key 覆盖” → Compaction 是后台去掉键的旧版本，与 Gzip/Snappy 编码压缩不同；消费者仍可能读到多个版本。
- ❌ “墓碑是 key=null，保留时间一到便立即清除” → 墓碑必须有 Key 且 value 为 null；可清理条件与实际清理完成之间存在异步延迟。
- ❌ “活跃段永不删除，compact 一定优先于 delete” → 活跃段不参加压缩，但日志可以滚动后回收；两种策略独立生效，不存在上述固定先后保证。

:::

#### 🔀 发散问题

- **Q：compact 主题能替代普通流水队列吗？**

  → 不适合要求每条事件都被处理的业务，慢消费者可能错过已压掉的中间版本。它适合恢复最终状态，完整审计流水应另存 delete 主题或归档。

- **Q：删除旧段后还能从任意 offset 回放吗？**

  → 只能在仍保留的日志范围内读取，落在日志起点之前需要按业务策略重置或从归档恢复。范围内的压缩空洞会向后读取，检索过程见本文档『Kafka 如何通过分段与索引检索数据？』。

### 【中等】Kafka 如何通过分段与索引检索数据？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 分段检索 / 稀疏索引

#### 💎 关键结论

Kafka 先按起始偏移量找日志段，再用稀疏索引定位段内位置，最后顺序扫到目标。这样既少维护索引，又适合顺序消费；按时间回放还会先借助时间戳索引。

#### ⚡ 记忆卡片

- **口诀**：起点找段，索引找位，顺扫取数，日志重建
- **关键词**：baseOffset ／ .index ／ .timeindex ／ 二分查找 ／ MMAP
- **链路**：目标 offset → 按段起点定位 → 稀疏索引二分取不大于目标的条目 → 从 position 顺序扫描 → 返回可用记录

#### 📖 核心知识

1. **第一层寻址：定位 Segment**。每个分区由多段组成，每段的 `.log`、`.index`、`.timeindex` 共享起始 offset 文件名前缀，如 `00000000000000368769.index`。按有序的段起始 offset 找到不大于目标的最近段，避免扫描整个分区；消费者可选择有效保留范围内的消费起点。
2. **第二层寻址：索引定位到段内字节位置**。`.index` 存储相对段起点的 offset 与 `.log` 内的 position，采用固定长度条目。`index.interval.bytes` 控制稀疏程度，而非每条消息建索引；二分找到不大于目标的最近条目后，再扫描数据批次定位记录。
3. **按时间查找要多走时间索引**。先根据段的时间信息选候选段，查 `.timeindex` 得到时间戳对应的近似 offset，再用 `.index` 得到 position，最后检查 `.log` 中实际记录时间，寻找满足条件的记录。它支持按时间回溯起点，不是通用任意字段查询索引。
4. **小索引与内存映射换取综合效率**。分段让每份索引规模可控；MMAP 将索引映射到虚拟内存，物理页面由操作系统按需加载并缓存，重启无需把所有索引复制到 JVM 堆。收益是降低存储和维护成本，兼顾顺序拉取与偶发定位，不是保证所有索引永驻内存。
5. **日志是事实源，索引可以再生**。缺失或被恢复检查判为损坏的索引可从 `.log` 扫描重建；日志删除时相关索引一并回收，压缩重写段时重新生成索引。自愈不等于可以在线随意删除索引，也不能弥补日志本身丢失。

下图保留段文件名、offset 索引和日志记录之间的两级映射：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/845493d743af480b85cb3c81fa9233e0.png)

#### 🔬 扩展知识

::: details

- 【L3】**紧凑布局与稀疏间隔**：offset 索引项由 4 字节相对 offset 和 4 字节 position 构成；时间索引项为 8 字节时间戳加 4 字节相对 offset。例如设置 `index.interval.bytes=4096`，大致每累积 4 KiB 数据增加索引项，实际插入受记录批次边界影响。间隔越小，定位后的扫描通常越短，但索引大小和维护成本越高。
- 【L3】**查找成本须算扫描**：设段数为 S、段内索引项数为 I、需扫描记录量为 K，offset 定位可概括为 O(log S + log I + K)。压缩造成的 offset 空洞要跳到下一条存活记录；时间戳乱序、跨段查找也可能扩大扫描范围，不能承诺所有时间查询都是固定的“两次二分”。
- 【L3】**恢复检查的边界**：索引不像消息记录那样逐条带 CRC，恢复依赖结构、范围等检查及日志扫描重建；并非任意位损坏都必然被立即识别。修复应在受控停机或恢复流程中操作，保留原始日志并考虑重建带来的启动 IO。
- 【L4】**不是全量索引，也不是只打开活跃段**：Kafka 的典型消费是顺序拉取，不应简单归为“写多读少”；给每条消息建稠密索引会增加空间和写路径工作，但不必然与数据同量级。MMAP 的按需缺页加载不等于只为活跃段建立映射，冷段回放仍可能产生磁盘 IO。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “二分索引能直接返回每一条消息，复杂度总是 O(1)” → 稀疏索引只给扫描起点，还需读日志并定位记录；总成本包括顺序扫描和 IO。
- ❌ “索引坏了随时删，数据肯定安全” → 索引可再生的前提是日志完整并进入合适的恢复流程；不要在线操作正在映射的文件。
- ❌ “.timeindex 直接保存时间戳到物理位置的映射” → 时间索引先映射到相对 offset，再结合 offset 索引和日志扫描完成精确定位。

:::

#### 🔀 发散问题

- **Q：为什么不使用数据库式的全字段索引？**

  → Kafka 优先服务追加写与顺序消费，稀疏索引已能支撑回放起点定位。复杂过滤和检索应交给下游流计算或搜索存储，避免扩大写路径成本。

- **Q：压缩会重新编号 offset 吗？**

  → 不会，保留记录的 offset 不变，只留下空洞，已保存的位点不会因为压缩整体平移。清理语义见本文档『Kafka 如何清理数据？日志删除与压缩如何工作？』。

## Kafka 生产消费

### 【中等】Kafka 发送消息的工作流程是怎样的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 生产者

#### 💎 关键结论

发送四步走：序列化 → 选分区 → 攒批次 → 异步发送并处理响应。关键点：消息不是逐条发的，而是同主题同分区的消息攒成一批由 Sender 线程统一发出，这是高吞吐的关键之一。

#### ⚡ 记忆卡片

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

#### ⚡ 记忆卡片

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
- 成员频繁上下线会反复触发 rebalance（全组停消费）；可通过 `group.instance.id` 静态成员、调大 `session.timeout.ms` 缓解，详见本文档『Kafka 分区再均衡如何工作？如何减少触发与影响？』。

:::

#### 🔀 发散问题

**Q1：消费者数多于分区数会怎样？**
A：多出来的消费者完全闲置，收不到任何消息。扩容消费能力的前提是先扩分区，而分区数只能增不能减，需提前规划。

**Q2：同一 Topic 想既分摊又广播怎么办？**
A：建两个消费组：分摊组内多消费者分摊分区；广播需求则由另一个单成员组（或多个下游各建一组）全量消费，两组进度互不干扰。

### 【中等】Kafka 消费消息的工作流程是怎样的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 消费者

#### 💎 关键结论

消费三步：组订阅 → poll 拉批 → 处理后提交 offset。Kafka 用 pull 模式，消费者自己控制拉取节奏， Broker 端靠“等数据攒够再返回”减少空轮询；poll 还兼职发心跳维持组成员关系。

#### ⚡ 记忆卡片

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

### 【中等】Kafka 如何实现分区机制？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 分区

#### 💎 关键结论

分区是 Kafka 高性能、高可用、易扩展的基石：它把 Topic 切成多个有序不可变的日志分片，实现并行处理与分布式存储。理解了分区，就理解了 Kafka 一半的设计。

#### ⚡ 记忆卡片

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

**Q3：消息按什么规则进入具体分区？**
A：由生产端分区策略（指定/Key 哈希/轮询/粘性/自定义）决定路由，消费端再按分配策略（Range/RoundRobin/Sticky）把分区分给组内成员，详见本文档『Kafka 支持哪些分区策略？』。

### 【中等】Kafka 支持哪些分区策略？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 分区策略

#### 💎 关键结论

分区策略分两端：生产端决定消息进哪个分区（指定/哈希/轮询/粘性/自定义），消费端决定分区分给谁（Range/RoundRobin/Sticky）。核心权衡只有一条：顺序性靠同 Key 同分区，均衡性靠散列。

#### ⚡ 记忆卡片

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

**Q3：分区策略作用的底层对象是什么？**
A：策略只是路由规则，落地对象是分区本身——每个分区是一份有序不可变的 append-only 日志、散布在多 Broker 上并带多副本冗余，详见本文档『Kafka 如何实现分区机制？』。

### 【困难】Kafka 分区再均衡如何工作？如何减少触发与影响？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：18 min ｜ 🏷 标签：Kafka / 经典消费者协议 / 再均衡治理

#### 💎 关键结论

经典消费者协议通过协调器组织入组、客户端群主计算分配，完成分区交接。治理要少触发、少迁移并安全交接位点：稳定成员、区分两类超时，再用增量再均衡缩小影响。

#### ⚡ 记忆卡片

- **口诀**：协调入组群主分，心跳处理两条线，少撤分区稳位点
- **关键词**：JoinGroup ／ SyncGroup ／ Coordinator ／ Cooperative ／ 静态成员
- **链路**：成员或订阅变化 → JoinGroup 协商并选群主 → 群主计算分配 → SyncGroup 分发 → 安全交接分区与位点

#### 📖 核心知识

以下流程限定为 **classic 经典消费者组协议**，适用于使用 `subscribe` 自动分配的消费组；不要套用到新的 `consumer` 组协议，也不要与分区副本重分配混淆。

1. **何时触发、代价是什么**：成员加入、退出或失效，订阅集合变化，以及订阅主题的分区数变化，都可能引发再均衡。它提供消费组高可用和伸缩能力，代价包括消费暂停、分配计算、分区迁移及状态重建；重复处理会进一步放大积压。
2. **先找到 Group Coordinator**：Broker 都有协调器组件，但一个组由 `__consumer_offsets` 中对应分区的 Leader Broker 服务。分区映射为 `partitionId = Utils.abs(groupId.hashCode()) % offsetsTopicPartitionCount`，其中 `Utils.abs` 是 Kafka 的非负哈希处理，不应随意替换为另一种取模公式。客户端通过 `FindCoordinator` 发现它；入组、心跳、位移提交都由该协调器管理。
3. **JoinGroup → 分配 → SyncGroup**：Coordinator 收集成员的订阅与支持策略，选出组 Leader Consumer 并协商分配策略；群主取得成员信息，用 `ConsumerPartitionAssignor` 计算分配，再通过 `SyncGroup` 交给 Coordinator。Coordinator 向各成员返回各自的分配，群主掌握全组分配视图；群主是客户端角色，不是集群 Controller，也不保证每次都是最先入组者。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/6f39e1092bed4282afe8b10fca12c052.png)

4. **分清分配算法和撤销协议**：Range 按主题分配，跨主题可能不均；RoundRobin 在订阅兼容时更均匀；Sticky 尽量保持原分配。Eager 在交接时先撤销全组分区，造成全组暂停；Kafka 2.4 引入的 Cooperative 可分多轮仅撤销需迁移的分区，其余分区不必撤销。`StickyAssignor` 仍是 Eager，`CooperativeStickyAssignor` 才支持增量交接；粘性减少迁移量，不消除成员变化触发。
5. **少触发与降影响并举**：按吞吐规划消费者数和分区数，超过可分配分区数的实例会闲置；稳定成员、错峰滚动发布、避免频繁改订阅。分区只支持增加，不能原地缩减，预留容量、低峰扩容比反复小步调整更少触发。再配合静态身份、合理超时和 Cooperative，不能靠禁止再均衡掩盖真实故障。

#### 🔬 扩展知识

::: details

- 【L3】**存活与处理进度是两条线**：经典 Java 消费者自 0.10.1 起用后台线程发送心跳；`heartbeat.interval.ms`（Kafka 3.9 经典协议默认 3000 毫秒）应明显小于 `session.timeout.ms`，为重试留余量。单纯调大心跳间隔反而减少重试机会；会话超时可按网络抖动、GC 和 Broker 允许范围适度放宽，但会延迟故障接管。`max.poll.interval.ms` 限制处理循环的 poll 间隔，即使心跳正常也可能超时；普通动态成员需重新入组，静态成员的最终分区释放还受会话超时约束。
- 【L3】**阻断慢处理循环并交接位点**：处理慢 → poll 超时 → 再均衡 → 已处理未提交的数据重拉 → 处理更慢。应减小 `max.poll.records`、优化下游，必要时按实测批次耗时放宽 `max.poll.interval.ms`；异步处理须限制在途任务并保序，不能跨过未完成记录提交。`onPartitionsRevoked` 中对撤销分区提交已连续处理完成的下一 offset，必要时同步提交；所有权已丢失的 `onPartitionsLost` 不应再假定能安全提交，失败要记录并靠幂等承接重放。
- 【L3】**静态成员的前提**：Kafka 2.3 引入 `group.instance.id`，需绑定稳定且唯一的部署身份。只有原身份在会话过期前回来、订阅与组状态兼容等条件成立时，短暂重启才可能保留分配；45 秒不是万能超时。重复身份会触发 fencing（经典协议可见 `FENCED_INSTANCE_ID`），不是部署两个同名实例来抢占旧实例。
- 【L4】**协议升级不能偷换概念**：经典组启用 Cooperative 要确认客户端支持，通过 `partition.assignment.strategy` 按兼容策略进行滚动迁移；仅改一个成员的配置不保证全组立即切换。新 `consumer` 协议采用不同的成员协调和服务端分配机制，不能套用本题的客户端群主、JoinGroup/SyncGroup 或经典心跳参数结论，须按目标版本单独评估。
- 【L4】**提交失败不等于数据丢失**：未提交成功的已处理记录通常会重放，造成重复；先提交后处理，或异步处理时跳过未完成记录提交，才可能让后续消费者跳过业务处理。提交成功的位点持久化仍依赖 `__consumer_offsets` 的副本可靠性；再均衡本身不是删除日志的操作。

:::

#### 🏭 实战场景

::: details

**容量推演，非生产实测**：8 个实例消费 64 分区，假设均匀流量共 2.5 万条/秒。Eager 一轮全组暂停 10～20 秒，将增加约 25～50 万条 lag；若恢复后的净追赶能力只有 556 条/秒，50 万条约需 15 分钟追平。频繁重启会叠加暂停，不能只盯单轮耗时。

**处置与验算**：迁移到 Cooperative，假设同样暂停 20 秒但只影响 8 个分区，则增量积压约为 `25000 × 20 × 8/64 = 62500` 条；实际结果取决于分区倾斜和交接耗时，不承诺必然“秒级恢复、万级以内”。使用稳定 `group.instance.id`，只有重启与重入组耗时的高分位加余量小于会话窗口时，才考虑例如 `session.timeout.ms=45000` 的测试配置；超时越大，真正故障时这些分区闲置越久。错峰重启并限制发布并发，先修复慢处理再扩容。

**验证指标**：联合观察客户端 rebalance 次数、`rebalance-latency-avg/max`、`failed-rebalance-total`（名称以客户端版本为准）、poll 间隔、提交失败、分区撤销量和 lag；经典组反复在 `Stable/PreparingRebalance` 间切换要排查原因。比较变更前后单轮暂停、迁移分区数和追平时间，不能用“没报错”代替验证。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “再均衡永远全组停，Sticky 就是增量协议” → 全组撤销是 Eager 行为；Sticky 只保持分配黏性，Cooperative 才缩小撤销范围，但也不能承诺所有调用都完全无暂停。
- ❌ “调大心跳间隔就能降低误判，心跳正常就不会离组” → 必须分别评估会话失活与 poll 超时，调大心跳间隔本身不是降低误判的方法。
- ❌ “offset 提交失败会自动丢消息，撤销时随便提交一次即可” → 常见后果是重放；提交必须停在连续完成边界，不能越过未完成消息，也不能在失去所有权后盲目重试旧提交。
- ❌ “静态成员配 45 秒即可彻底避免再均衡” → 还取决于稳定身份、重启耗时、订阅变化和成员状态；真正失效必须允许再均衡恢复服务。

:::

#### 🔀 发散问题

- **Q：Coordinator 宕机后谁接管？**

  → `__consumer_offsets` 对应分区选出新 Leader 后，该 Broker 加载组状态并接管协调。客户端可能遇到协调器不可用类错误，随后重新发现和重连；不是选出新的客户端群主就能替代 Coordinator。

- **Q：为什么普通成员只收到自己的分配？**

  → 它只需管理自身分区的拉取与提交，减少维护全局视图的负担。全组分配计算由客户端群主承担，但这不是可依赖的安全或隐私隔离机制。

- **Q：能只靠加消费者解决慢处理吗？**

  → 不一定，消费者数超过分区数不会增加该组并行度，下游瓶颈或热点分区也可能保持不变。分区与路由背景见本文档『Kafka 支持哪些分区策略？』。

### 【困难】Kafka 的 ISR 在什么场景下收缩？ISR 收缩有什么影响？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / ISR

#### 💎 关键结论

ISR 是动态集合：Follower 落后 Leader 超过阈值就被踢出，追上又回来。频繁收缩是集群健康的早期警报：它直接削弱 `acks=all` 的保护，甚至让写入被拒。把它当故障信号处理，别当正常抖动。

#### ⚡ 记忆卡片

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

**【L4】LEO 与 HW：ISR 收缩为什么会牵动数据可见性与丢失**

::: details

- 每个副本各自维护 **LEO（Log End Offset，下一条待写消息的 offset）**；**HW（High Watermark）取 ISR 中最小的 LEO**，消费者只能读到 HW 之前的消息，Leader 收到 Fetch 请求时据此推进 HW。ISR 收缩会改变「最小 LEO」的参与者集合，直接影响消息可见时点。
- 早期版本（0.11 之前）Follower 重启后会按 HW 截断（truncate）本地日志再同步，存在著名的**竞态丢数据窗口**：刚当选的 Leader 与截断后的 Follower 可能永久丢掉已提交消息。0.11 引入 **Leader Epoch（KIP-101）**后，Follower 重启不再盲目按 HW 截断，而是向 Leader 查询该 epoch 的结束位点再决定截断位置，修复了这类丢失。
- 这也解释了「为什么 HW 之前的消息才算已提交」：acks=all 的提交语义 = 消息进入 ISR 全体副本日志且 HW 越过它；一旦允许 unclean 选举，新 Leader 的日志可能不含这些「已提交」消息，HW 语义被破坏，即表现为丢数据。

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

### 【困难】在 Kafka 中，如何实现多集群的数据同步？跨集群复制的实现原理是什么？⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 跨集群复制

#### 💎 关键结论

跨集群复制的官方答案是 MirrorMaker：本质就是「消费者 + 生产者」的搬运工，从源集群消费、往目标集群重写。MM2 解决了 MM1 配置难、无偏移映射的痛点，是当前推荐方案。

#### ⚡ 记忆卡片

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

### 【困难】Kafka Controller 如何工作并完成故障恢复？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kafka / Controller / 控制面故障恢复

#### 💎 关键结论

Controller 负责元数据和分区选主，不转发业务消息。故障恢复要先选出新控制器、隔离旧任期，再恢复状态；ZooKeeper 模式靠临时节点，KRaft 靠元数据多数派选举。

#### ⚡ 记忆卡片

- **口诀**：控制选主不搬消息，新主换届先恢复，旧主命令要隔离
- **关键词**：Controller ／ 事件队列 ／ controller epoch ／ 全量状态重建 ／ KRaft
- **链路**：感知故障 → 选出新 Controller → 新 epoch 隔离旧主 → 恢复元数据状态 → 处理分区选举并传播变更

#### 📖 核心知识

1. **控制面职责与数据面边界**：Controller 管理 Topic 创建删除、分区及副本分配、Broker 上下线、分区 Leader 选举和相关 ISR 元数据，协调副本重分配并同步集群状态。业务消息读写和复制由 Broker 承担，Group Coordinator 的消费组管理不是 Controller 的工作。

下图展示 **ZooKeeper 模式**下由一个 Broker 兼任活动 Controller 的结构，不代表 KRaft 必须合并部署：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/3ff8312cefef44b6a95ac3405215f172.png)

2. **日常处理是状态机驱动**：ZK 模式通过 watch 感知节点变化，Controller 将事件放入队列，串行处理 Broker 下线、建 Topic、扩分区等变更，避免并发改写内存状态；再通过控制请求向 Broker 下发 Leader/ISR 及元数据。ISR 的实际变化还依赖分区 Leader 的复制进度判断，不能理解成 Controller 逐条参与副本同步。
3. **ZK 故障转移：重新选主并 fencing**：Broker 竞争创建 `/controller` 临时节点，创建成功者成为 Controller，其他 Broker 监听其变化。原 Controller 会话关闭或**过期**使节点消失，存活 Broker 再竞争；新主条件递增 `/controller_epoch`，在控制请求中携带更大 epoch，Broker 拒绝过期控制命令，避免旧主恢复后继续发号施令。短暂断连不等于会话立即过期。

下图保留 ZK 临时节点竞争、监听与控制器换届流程：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/0d86e292214d441986cdc9ea979d4446.png)

4. **当选后必须重建并核对状态**：新 ZK Controller 注册监听，从 ZooKeeper 读取存活 Broker、Topic、分区副本分配、Leader 和 ISR 等全量元数据，重建内存上下文及状态机，随后处理待办事件。故障 Broker 上的 Leader 分区通常从存活 ISR 中按选举策略选新主，并非对所有 Broker 轮询选主；没有合适副本时按安全策略保持不可用，而不是无条件保证恢复。
5. **KRaft 用已复制元数据接管**：Controller Quorum 通过 Raft 选举一个活动 Controller，变更写入 `__cluster_metadata` 元数据日志并经多数派提交；备用 Controller 持续复制、回放日志以维护状态，Broker 拉取元数据变更。故障接管基于新任期和已提交状态，不再争抢 ZK 节点；冷启动仍可能需要快照加日志回放，而不是每次切换都从头扫描全量元数据。

#### 🔬 扩展知识

::: details

- 【L3】**epoch 是 fencing 令牌，不是数据副本位点**：ZK 的 controller epoch 由 `/controller_epoch` 维护，控制请求的新旧由接收端校验；不存在用于此目的的普通内部 Topic `__controller_epoch`。分区 leader epoch、控制器任期与消费 offset 各司其职，`__consumer_offsets` 也不是 Controller 恢复的元数据仓库。
- 【L3】**恢复耗时拆解**：故障检测、Controller 选举、状态恢复、事件队列排队、分区选举及 Broker/客户端感知都会贡献耗时。ZK 全量加载受元数据规模影响，KRaft 热备能减少重复重建，但备用节点落后、磁盘慢或队列阻塞仍会拖慢切换；应监控活动 Controller 数、离线分区、事件队列等待和元数据复制进度。
- 【L3】**重新选 Leader 不等于重建副本**：Controller 按既有副本分配恢复分区服务，也执行显式提交的副本迁移任务；Broker 宕机不会自动在任意空闲 Broker 上补足副本数或完成全局负载均衡。需要修复故障 Broker，或由管理操作、外部运维系统发起重分配并等待复制追平。
- 【L4】**控制面失效不是数据面绝对无感**：若仅控制器角色短暂缺失，健康存量分区通常仍能读写；创建 Topic、分区 Leader 重选等操作会阻塞。ZK 兼任 Controller 的 Broker 整机宕机时，其承载的业务分区也会故障；KRaft 长期失去多数派后也无法持续完成控制面推进，不能外推成无限期正常服务。
- 【L4】**角色与版本**：KRaft 在 2.8 预览、3.3 生产可用，4.0 移除 ZK 模式；Controller 可以 combined 或 separated 部署，生产通常分离以隔离数据 IO 和故障域。Raft 元数据共识不是把普通业务分区复制统一改成 Raft，也不提供固定“亚秒级恢复”承诺。

:::

#### 🏭 实战场景

::: details

**故障演练推演，非生产实测**：ZK 集群有 3 台 Broker、某 Topic 共 60 分区且 3 副本，假设 Leader 均匀分布，兼任 Controller 的 Broker 宕机，约 20 个 Leader 分区需要选主，其余 40 个通常可继续工作。先等待 ZK 会话失效和新 Controller 恢复，再验证这 20 个分区是否有存活 ISR 可接管；不能把整段中断归结为 Controller 选举，也不能把选主完成当成副本数恢复。

**KRaft 对照**：独立部署 3 个 Controller，失去 1 个仍有 2 个构成多数派，失去 2 个则无法提交元数据变更。演练分别记录检测耗时、当选到状态就绪耗时、离线分区恢复耗时以及客户端重试量；若发现副本欠冗余，修复 Broker 或执行受控重分配，不预设恢复必然少于 1 秒。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Controller 是永远独立部署的进程，宕机也绝不影响消息” → ZK 模式由 Broker 兼任，整机故障会同时影响该机的数据分区；KRaft 也可配置合并角色。
- ❌ “一断开 ZK 连接，临时节点就立即删除” → 临时节点绑定会话，要区分短暂断连与会话关闭、过期，错误等同会低估故障检测时间。
- ❌ “新 Controller 随机挑 Broker 当分区主，再自动补满副本” → 安全选举依赖已有副本与 ISR，副本重分配是另一项受控操作。
- ❌ “KRaft 不用恢复状态，切换一定亚秒级” → 热备减少重建成本，但仍受日志追赶、选举、IO 和控制事件处理影响。

:::

#### 🔀 发散问题

- **Q：ZK 模式为何靠创建节点而非 Broker 自己投票？**

  → ZooKeeper 已提供共识支持的原子创建，同一路径只有一个创建者成功，Kafka 借此选出唯一活动 Controller。再用 epoch 拒绝旧主命令，互斥选主与隔离旧主缺一不可。

- **Q：为什么分区 Leader 由 Controller 统一选？**

  → Controller 持有集群元数据和 ISR 视图，可形成一致的选举决策并传播新状态。分区 leader epoch 等机制帮助区分旧任期，但消息复制仍由分区 Broker 完成。

- **Q：KRaft 能否随时回退到 ZK？**

  → 不能，只有受支持的迁移过渡阶段且满足双写、版本等前提时才有回退路径。具体边界见本文档『Kafka 为什么弃用 ZooKeeper？KRaft 如何工作与迁移？』。

### 【困难】Kafka 如何实现高可用？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 高可用

#### 💎 关键结论

Kafka 高可用 = 数据冗余（多副本） + 自动容灾（Leader 自动切换） + 灵活一致性（ACK + ISR 按需权衡）。单 Broker 挂了，分区 Leader 从 ISR 里自动换人，业务基本无感。

#### ⚡ 记忆卡片

- **口诀**：多副本打底，ISR 选主，Controller 调度，ACK 定可靠
- **关键词**：多副本 ／ Leader 选举 ／ ISR ／ Controller ／ acks
- **链路**：故障检测（ZK/KRaft） → Controller 感知 Broker 下线 → 从 ISR 选新 Leader → 分区继续读写 → 元数据同步全集群

#### 📖 核心知识

- **数据冗余**：多副本存储，防止单点数据丢失。
- **自动容灾**：Leader 自动切换（从 ISR 中重新选主），减少人工干预。
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

- **故障检测**：ZooKeeper 发现 Broker 宕机（KRaft 模式由 Controller Quorum 心跳感知）。
- **Leader 选举**：从 ISR（同步副本集）中选出新 Leader。
- **副本分配不变**：宕机 Broker 上的分区只是重新选主，副本分配本身不会自动改变，副本数不会自动补足——需修复故障 Broker 或人工执行 `kafka-reassign-partitions` 重分配。

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

**场景（推演）**：某集群 5 台 Broker、核心 Topic 3 副本，某台 Broker 宕机：Controller 在秒级内感知（ZK 临时节点失效/KRaft 心跳超时），将其上约 200 个 Leader 分区在其余 Broker 的 ISR 中重新选主，生产端短暂报 `NOT_LEADER_OR_FOLLOWER` 后自动刷新元数据重连，业务中断约 10~30s；副本分配不会自动改变，宕机 Broker 上的 Follower 副本不会被自动补建到其他 Broker，需修复该 Broker，或人工执行 `kafka-reassign-partitions` 重分配并等待复制追平。

**关键点**：选主只从 ISR 出，数据零丢失；若同时挂两台且某分区 ISR 不足 min.insync.replicas，该分区拒写但不丢数据。（数据为推演示例，非真实生产数据）

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Kafka 多副本是同步复制，所以强一致” → 错。Follower 是异步拉取复制，Kafka 用 ISR + HW 界定“已提交”，而非强同步；同步程度由 acks 与 min.insync.replicas 配置决定。
- ❌ “Broker 宕机后副本数自动恢复原样” → 错。Controller 只按既有副本分配重新选主，不会自动在其他 Broker 上补建副本；期间该分区容错能力下降，需尽快修复故障 Broker，或人工执行 `kafka-reassign-partitions` 并等待复制追平。

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

#### ⚡ 记忆卡片

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
- 这正是 KRaft 的动机：元数据变成 Kafka 自己的追加日志 + Raft 复制，支持百万级分区，详见本文档『Kafka 为什么弃用 ZooKeeper？KRaft 如何工作与迁移？』。

:::

> 📚 延伸阅读：[ZooKeeper 原理](https://github.com/dunwu/bigdata-tutorial/blob/master/docs/zookeeper/ZooKeeper原理.md)

#### 🔀 发散问题

**Q1：ZooKeeper 挂了，Kafka 还能收发消息吗？**
A：短时间内可以：存量分区的 Leader 不变，数据读写不依赖 ZK；但无法完成 Controller 选举、新 Topic 创建、Leader 切换，故障时间一长可用性受损。

**Q2：为什么消费者位移从 ZK 搬到内部主题？**
A：0.9 新 Consumer API 后位移提交频率高、量大，写 ZK 成为瓶颈且语义受限；改存 `__consumer_offsets` 后位移本身就是 Kafka 数据，享受分区并行与副本可靠性。

### 【中等】Kafka 为什么弃用 ZooKeeper？KRaft 如何工作与迁移？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / KRaft / 元数据迁移

#### 💎 关键结论

KRaft 把元数据改成多数派提交的日志，减少外部依赖并改善同步和恢复效率。迁移不只是换配置：先完成元数据迁移与双写，再切 Broker，最终定稿后不能回退 ZooKeeper。

#### ⚡ 记忆卡片

- **口诀**：元数据成日志，多数派定提交，双写留退路，定稿不回头
- **关键词**：Controller Quorum ／ Raft ／ \_\_cluster_metadata ／ 增量拉取 ／ 迁移定稿
- **链路**：Controller 处理元数据变更 → 追加日志并多数派提交 → Controller/Broker 回放更新状态 → 迁移双写验证 → 定稿移除 ZK

#### 📖 核心知识

1. **动机不是换掉一个“单点”**：ZK 本身也可组成高可用集群，但 Kafka 需要额外维护它，并处理 ZNode、watch 与 Controller 本地状态之间的协调。规模增长会放大元数据加载、传播和恢复成本；KRaft 将控制面收敛到 Kafka 内部，减少外部依赖与运维对象，而非消除所有故障风险。
2. **Controller Quorum 负责元数据共识**：多个 Controller 通过 Raft 选举活动 Leader，将 Topic、分区、副本、Broker 注册等变更追加到 `__cluster_metadata` 元数据日志，复制到多数派后提交并应用。通常用 3 或 5 个投票节点，分别容忍 1 或 2 个故障；奇数是成本与容错的常见选择，不是 Raft 只能接受奇数节点。
3. **传播由状态通知转为日志追赶**：ZK 模式由 Controller 监听 ZNode 变化，再向 Broker 发送元数据控制请求；并非所有 Broker 靠 watch 接收全部分区元数据。KRaft 的备用 Controller 复制日志，Broker 主动拉取并应用已提交变更，支持批量、增量传播；首次加载或落后过多时使用快照加后续日志恢复。
4. **收益来自机制，不是无条件性能承诺**：有序追加、批量复制、增量同步和热备状态减少重复加载及传播成本，有利于扩展分区规模和缩短恢复。元数据写入仍由活动 Controller 排序、多数派确认，并非多个 Controller 并行无序写，更不是靠把元数据日志分片获得无限扩展；“百万分区、亚秒切换”都需特定规模与压测条件。
5. **运维取舍仍然存在**：`process.roles` 可配置 combined（同进程兼任 Broker/Controller）或 separated（角色分离）；测试和小规模可合并，生产通常分离以隔离数据 IO、资源争抢与故障域。省掉 ZK 后仍要保障 Controller 多数派、磁盘、网络、安全、快照和监控；业务消息的 ISR 复制机制并未统一改为 Raft。

#### 🔬 扩展知识

::: details

- 【L3】**元数据日志不是普通业务 Topic**：`__cluster_metadata` 由 KRaft 专用控制面维护，不能当成可由 Producer 随意写入的业务主题。日志提供有序的状态变更记录，回放可重建状态、辅助诊断；快照和日志保留意味着它也不是无限期业务审计仓库。
- 【L3】**热备缩短恢复，但不与规模完全解耦**：备用 Controller 持续跟进已提交记录，接管时通常不必像 ZK Controller 那样重新全量读树；冷启动、落后追赶及大快照加载仍有成本。元数据多数派不可用会阻止新变更提交，即使已有分区暂时还能读写，也必须尽快恢复控制面。
- 【L4】**版本与迁移前置条件**：Kafka 2.8 引入 KRaft 预览，3.3 的生产可用针对 KRaft 模式本身；3.4 初期提供 ZK→KRaft 迁移能力，不能据此认定所有 3.4+ 版本都适合生产迁移；3.5 废弃 ZK 模式，4.0 移除其支持。存量集群可选 **3.9 最新维护版本作为迁移桥接版本**，先升级并按该版本要求统一 Broker 协议与 `metadata.version`，在同等规模环境演练，再考虑升级 4.x；不能把仍运行 ZK 的集群直接升级到 4.0。
- 【L4】**迁移流程与工具链**：以 3.9 的静态 quorum 迁移路径为例，先备份 ZK 元数据和配置、确认集群健康；部署独立 Controller，使用原 `cluster.id` 初始化其新元数据目录，配置唯一 `node.id`、`controller.quorum.voters`、监听器及安全参数，启用 `zookeeper.metadata.migration.enable=true` 并连接原 ZK。再让 ZK Broker 按迁移要求滚动重启、交接控制权，完成全量元数据导入并进入双写；随后逐台把 Broker 转为 KRaft，保留原 Broker 身份与业务日志目录。用 `kafka-storage.sh` 初始化**新 Controller** 存储，不能借迁移重格式化已有 Broker 数据；用 `kafka-metadata-quorum.sh` 检查 quorum、复制位点与 lag，配合迁移状态指标及 `kafka-metadata-shell.sh` 排查快照，并把旧 ZK 监控/脚本改为支持 KRaft 的管理工具。
- 【L4】**回滚的不可逆边界**：过渡期活动 Controller 将元数据变更同步写回 ZK，以保留回退路径。回退前必须尚未 finalization、ZK 与双写状态完好、目标版本与特性兼容、原配置及数据可用，并遵循该版本规定的停止/恢复顺序；不是随时切回旧配置。确认所有 Broker 已迁移且观察验证通过后，才在 Controller 上关闭迁移并完成定稿；**定稿后不再支持回退 ZK**，也不能通过随意降低 `metadata.version` 补救。最终退役 ZK 前，应完成 ACL、认证、运维工具、故障演练和回滚预案验收。

> 📚 延伸阅读：[Kafka 官方文档 - KRaft](https://kafka.apache.org/documentation/#kraft)；[Confluent 迁移指南（发行版版本与工具须区分）](https://docs.confluent.io/platform/current/installation/migrate-zk-kraft.html)

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “ZooKeeper 最多 7 个节点，所以 Kafka 规模被固定上限卡死” → 这是把常见部署建议误当算法或分区硬上限；真正要评估元数据处理、传播、内存与故障恢复成本。
- ❌ “KRaft 靠并行日志写入，天然保证百万分区与亚秒恢复” → 仍有单个活动 Controller 对变更排序，多数派复制也消耗资源；性能须用实际拓扑、负载和恢复路径验证。
- ❌ “用了 KRaft 客户端才不用连接 ZK” → 现代 Producer/Consumer 在 ZK 模式下也直接连接 Broker；迁移通常对这些客户端透明，但遗留依赖 ZK 的消费者和工具必须单独检查。
- ❌ “完成迁移后还能随时回滚，删掉 ZK 配置就行” → 只有受支持的未定稿过渡阶段、且双写与版本等条件满足时才有回退路径；定稿是不可逆边界。

:::

#### 🔀 发散问题

- **Q：为什么不继续优化 ZooKeeper？**

  → 不是 ZAB 本身不可靠，而是通用协调服务的树与 watch 模型增加了 Kafka 元数据生命周期的协调成本。专用日志共识更适合批量传播和状态回放，也少维护一套外部服务。

- **Q：KRaft 还有 Controller 吗，故障时如何接管？**

  → 有，quorum 中一个活动 Controller 处理元数据变更，其余复制状态并在故障时参与选举。工作与故障边界见本文档『Kafka Controller 如何工作并完成故障恢复？』。

- **Q：生产为什么倾向 separated mode？**

  → Broker 数据读写高峰可能挤占合并进程的 CPU、磁盘和网络，拖慢元数据共识。分离便于独立容量规划、维护和隔离故障，代价是额外节点与独立运维保障。

## Kafka 可靠传输

### 【中等】在 Kafka 中，如何通过 Acks 配置提高数据可靠性？Acks 的值如何影响性能？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 可靠性

#### 💎 关键结论

acks 是生产者的“可靠性总开关”：0 不等确认最快但可能丢，1 等 Leader 写入居中，all 等 ISR 全部写入最稳但最慢。记住一句：业务消息 acks=all，但必须配套 min.insync.replicas≥2，否则是伪安全。

#### ⚡ 记忆卡片

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

### 【困难】在 Kafka 中，如何实现幂等性 Producer？它对消息处理的意义是什么？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 可靠传输

#### 💎 关键结论

Kafka 0.11+ 只要开启 `enable.idempotence=true`，就能用 PID + Sequence Number 在 Broker 端自动去重生产者的重试消息，顺带保住单分区顺序。理由：它把“重试导致重复”这个最常见的生产端问题在协议层解决，代价仅轻微吞吐下降。

#### ⚡ 记忆卡片

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
- Kafka 3.0 起 `enable.idempotence` 默认为 `true`：默认配置即为「幂等 + acks=all」，但 PID 仍只在单会话内有效，不改变下面的边界。
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

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 快的本质不是“绕过磁盘”，而是把磁盘用成了内存：顺序追加写 + 页缓存让写入接近内存速度，零拷贝 + 批处理 + 分区并行撑高吞吐。理由：顺序 I/O 下磁盘带宽与内存同一数量级，剩下的开销全被设计消除。

#### ⚡ 记忆卡片

- **口诀**：顺序写、页缓存、零拷贝、批压缩、分区并行
- **关键词**：顺序 I/O ／ PageCache ／ sendfile ／ 批处理 ／ 分区
- **链路**：追加写限制为顺序 I/O → 写入先落页缓存由 OS 异步刷盘 → 消费用 sendfile 零拷贝直传网卡 → 批处理摊薄网络开销 → 分区并行水平扩展吞吐

#### 📖 核心知识

Kafka 的数据存储在磁盘上，为什么还能这么快？说 Kafka 很快时，通常指的是它高效移动大量数据的能力。Kafka 为了提高传输效率，做了很多精妙的设计。

**（1）顺序 I/O（追加写入）**

磁盘读写有两种方式：顺序读写或者随机读写。在顺序读写的情况下，磁盘的顺序读写速度和内存接近。因为磁盘是机械结构，每次读写都会寻址写入，其中寻址是一个“机械动作”。Kafka 利用了一种分段式的、只追加（Append-Only）的日志，基本上把自身的读写操作限制为**顺序 I/O**，也就使得它在各种存储介质上能有很快的速度。

**（2）零拷贝**

Kafka 的写入路径是「网络 → 页缓存 → 磁盘」，消费读取路径是「磁盘（页缓存）→ 网络」。消除读路径上多余的拷贝是提高效率的关键：**零拷贝只作用于读取（消费/Follower 拉取）路径**——写入仍走普通 `write` 系统调用（经历用户态拷贝），其高效靠的是顺序追加与页缓存；而消费时 Kafka 用 `sendfile` 消除内核态 ↔ 用户态之间的多余复制。

如果不采用零拷贝，Kafka 将数据同步给消费者的大致流程是：

1. 从磁盘加载数据到 os buffer
2. 拷贝数据到 app buffer
3. 再拷贝数据到 socket buffer
4. 接下来，将数据拷贝到网卡 buffer
5. 最后，通过网络传输，将数据发送到消费者

采用零拷贝技术，Kafka 使用 `sendfile()` 系统方法，将数据从 os buffer 直接复制到网卡 buffer。这个过程中，唯一一次复制数据是从 os buffer 到网卡 buffer。这个复制过程是通过 DMA（Direct Memory Access，直接内存访问）完成的。使用 DMA 时，CPU 不参与，这使得它非常高效。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/9b5da2cfd99e47f4aebadeedb0bad066.webp)

**（3）其他性能设计**

- **页缓存**：Kafka 的数据并不是实时写入磁盘，它充分利用了现代操作系统分页存储来利用内存提高 I/O 效率：把磁盘中的数据缓存到内存中，把对磁盘的访问变为对内存的访问，读写都走页缓存、由 OS 异步刷盘。注意分工：消息数据写入用普通 `write` 系统调用写入页缓存（不是 mmap）；mmap 只用于索引文件（`.index`/`.timeindex`）的内存映射。
- **稀疏索引**：每个 Segment 配套 `.index` 稀疏索引（offset → 物理位置，`index.interval.bytes` 控制密度），二分查找定位后顺序扫描；索引小到可常驻页缓存，检索几乎不产生额外磁盘 IO，详见本文档『Kafka 如何通过分段与索引检索数据？』。
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
A：`sendfile` 的能力是「页缓存 → 网卡」直传，只适用于“读盘发网”的路径；写入路径是「网卡 → socket buffer → 用户态（JVM）→ 页缓存」，天然经历用户态拷贝，不是零拷贝，其高效靠顺序追加 + 页缓存 + 批量。因此零拷贝的收益集中在消费与 Follower 拉取同步这类读取路径上。

**Q3：batch.size 和 linger.ms 应如何配套调优？**
A：两者谁先触发谁生效：只调大 batch.size 而 linger.ms=0，低流量时批次永远攒不满；只调大 linger.ms 而 batch.size 太小，批次很快装满提前发送。高吞吐推荐 `batch.size=1MB` + `linger.ms=50~100ms` 配套，并同步调大 `buffer.memory`（默认 32MB）防阻塞。

### 【困难】Kafka 如何实现流量控制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 没有传统意义的“限流器”，流量控制靠两端参数摄流 + 缓冲区天然背压：生产端用 buffer.memory 和 max.in.flight 控发送速率，消费端用 fetch 参数控拉取节奏。理由：拉模型下消费者自己决定拉多快，背压是内建的。

#### ⚡ 记忆卡片

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
  - 消费者单批条数由 `max.poll.records`（默认 500）控制；已拉取未处理的数据块受 `queued.max.message.chunks` 约束，处理不过来时不再发起新的 fetch，形成消费端背压。

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
A：有。Kafka 自 0.9 起内置 **Quota 配额机制**，可按 user / client-id 维度限制 produce / fetch 速率与请求处理百分比（`client.quota.callback.class` 可自定义），超限的请求会被 Broker 延迟响应（throttle）。但 quota 粒度较粗，工程上通常还要叠加生产者 buffer 背压 + 网关层限速 + 按 Topic/集群拆分隔离流量。

**Q2：buffer.memory 满了会发生什么？**
A：`send()` 会阻塞直到超时（`max.block.ms`，默认 60s）后抛异常，这就是生产端背压的物理边界；积压场景应调大 buffer 或加速发送，而不是无限堆内存。

### 【困难】Kafka 如何处理数据倾斜问题？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

数据倾斜的根因几乎都在分区键：低基数键（如城市、固定枚举值）会让流量集中到少数分区。解法是换高基数键或二次哈希打散，而不是简单加分区。理由：分区数不变时换键才能重新分布，加分区只会稀释不会消峰。

#### ⚡ 记忆卡片

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

- **副本不能分散消费读压力**：Kafka 消费者默认只从 Leader 副本读取（Follower Fetching 需显式配置 `replica.selector.class`，且主要面向跨机架/跨 AZ 省带宽场景），增加副本只提升容错能力，热点分区的读压力仍集中在其 Leader 上；治理倾斜必须从写入侧的分区键重新分布入手。
- **动态监控调整**：实时监控各分区写入速率与 Leader 分布，Leader 集中到少数 Broker 时用优先副本选举（preferred replica election）拉回均衡；副本层面的迁移用 `kafka-reassign-partitions` 受控执行。

**流控与限流**

- **生产者限流**：控制 `producer` 速率（如 `max.in.flight.requests`）。
- **消费者限流**：调整 `fetch.max.bytes` 或使用背压机制，匹配消费能力。

#### 🔬 扩展知识

::: details

- 【L3】**Lag 的计算与倾斜的联动**：消费 lag = 分区的高水位（HW）− 消费组已提交 offset，用 `kafka-consumer-groups.sh --describe` 可看分区级 lag。热点分区倾斜时，即便总吞吐够，单个热点分区的 lag 也会持续增长——而分区是消费并行度的最小单位，**加消费者无法摊薄单分区内的积压**。
- 【L3】**热点分区积压的 Kafka 特有处置**：临时扩消费者受「消费者数 ≤ 分区数」上限约束，对单分区热点无效；紧急时可将流量转发到**分区数更多的临时 Topic** 扩并行度追赶（追赶完再切回），或对非核心消息按 offset 跳过、降低单条处理成本（批量落库/异步化）。长期治理靠分区键重新设计（高基数键/加盐），注意加盐会牺牲同键全局有序，需下游归并。通用积压处置矩阵见《MQ面试》『如何处理 MQ 消息积压？』。

:::

#### 🔀 发散问题

**Q1：必须保序（同 key 同分区）但又想打散热点键，怎么办？**
A：在原 key 后拼接有限的随机后缀（如 key + "-" + rand(0~N)），把单键拆成 N 份并行，同一业务键的范围仍局部有序；下游聚合时再按原 key 归并。注意 N 固定后扩分区同样会打乱分布。

**Q2：如何发现分区倾斜？**
A：监控各分区的写入字节率与消费 lag 分布，若单分区流量/积压显著高于均值（如 3 倍以上）即可判定倾斜；也可用 kafka-consumer-groups 的分区级 lag 报告快速定位。

### 【困难】Kafka 处理请求的全流程？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Broker 内部是典型的 Reactor 模型：1 个 Acceptor 接连接，N 个 Processor（NIO）读写报文，再通过 RequestChannel 分发给 IO 线程池处理业务。理由：网络 I/O 与业务逻辑解耦，两层线程池各自按负载扩容。

#### ⚡ 记忆卡片

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
- **队列衔接**：请求经 `RequestChannel` 的阻塞队列（`BlockingReceive`）交接，空闲 Handler 阻塞等待、来请求即唤醒；每个 Processor 的响应队列用 `ConcurrentLinkedQueue`，多 Handler 回写同一 Processor 时竞争小。
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

### 【中等】Kafka 中如何实现时间轮？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：Kafka / 架构

#### 💎 关键结论

Kafka 用多层次时间轮管理海量定时任务（如延迟操作超时、Producer 请求超时）：插入/删除都是 O(1)，长延迟任务放高层轮，临近触发时逐级降级到低层轮。理由：优先堆在百万级定时任务下开销太大，时间轮用固定槽数换来稳定的内存与性能。

#### ⚡ 记忆卡片

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

## Kafka 优化

### 【中等】Kafka 各组件如何进行优化？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 优化

#### 💎 关键结论

调优三板斧：**三端参数调优**（Producer 攒批 + 压缩、Consumer 分区并行 + 手动提交、Broker 顺序写 + 副本）、**分区规划**（分区数定并发、副本数定可靠）、**吞吐与延迟取舍**（`linger.ms` 和 `acks` 按业务容忍度定）。理由：瓶颈在哪端就调哪端的参数，不要一刀切。

#### ⚡ 记忆卡片

- **口诀**：生产攒批压缩，消费分区并行，Broker 顺序写，分区定并发，取舍看容忍度
- **关键词**：linger.ms ／ compression.type ／ max.poll.records ／ replication.factor ／ 分区数 ／ acks
- **链路**：按并发定分区数、按可靠性定副本数 → Producer 攒批压缩减请求 → Broker 顺序写 + 副本保可靠 → Consumer 分区并行拉取 + 手动提交 offset → 按延迟容忍度微调 linger.ms/acks

#### 📖 核心知识

**Producer 优化**

- 批量发送（`linger.ms` + `batch.size`）。
- 压缩算法（`compression.type`：高吞吐首选 LZ4，压缩比优先选 Zstd，Snappy 折中；Gzip 压缩比高但 CPU 开销大，CPU 受限场景慎用）。
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

| 场景           | 推荐配置                             | 说明                  |
| -------------- | ------------------------------------ | --------------------- |
| 高吞吐场景     | `compression.type=snappy`            | 压缩率与 CPU 开销平衡 |
| 数据持久化要求 | `log.retention.hours=168`（7 天）    | 根据存储容量调整      |
| 低延迟场景     | `num.io.threads=16`（默认 8 的翻倍） | 提升磁盘 IO 并行度    |

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

### 【简单】Kafka 如何处理大消息？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kafka / 消息处理

#### 💎 关键结论

Kafka 默认单条消息上限 1MB（`message.max.bytes`），超过需调大 Broker / Topic / Producer 三端配置。但大消息会降低吞吐（磁盘 IO 放大、网络拥塞、GC 压力），更好的方案是「消息体只存引用（如 OSS 路径），实际数据外置」——这是业界处理大消息的标准做法。

#### ⚡ 记忆卡片

- **口诀**：三端配置要同步，大消息最好外置引用
- **关键词**：message.max.bytes ／ max.request.size ／ fetch.max.bytes ／ 消息外置 ／ OSS 引用
- **链路**：Producer 端 max.request.size → Broker 端 message.max.bytes → Consumer 端 fetch.max.bytes → 三端同步（副本同步另受 replica.fetch.max.bytes 约束）

#### 📖 核心知识

**大消息的三端配置**

Kafka 消息大小涉及三个配置，必须同步调整：

| 端       | 配置项                                                     | 默认值    | 说明                             |
| -------- | ---------------------------------------------------------- | --------- | -------------------------------- |
| Producer | `max.request.size`                                         | 1MB       | 单次请求最大字节数（含多条消息） |
| Broker   | `message.max.bytes`（Topic 级）/ `replica.fetch.max.bytes` | 1MB / 1MB | 单条消息上限 / 副本同步拉取上限  |
| Consumer | `fetch.max.bytes`                                          | 50MB      | 单次拉取最大字节数               |

**大消息的问题**

- **磁盘 IO**：Kafka 用 PageCache 优化读写，大消息会频繁触发脏页刷盘，影响其他 Topic；
- **网络**：单条消息占满网络带宽，阻塞其他请求；
- **GC**：Consumer 端反序列化大消息会产生大对象，触发 Full GC，导致消费暂停。

**推荐方案：消息体外置**

```
Producer → 将大数据写入 OSS/S3 → 消息体只存 {bucket, key, size} → Kafka
Consumer → 从消息体解析 OSS 路径 → 下载实际数据 → 处理
```

优势：

- Kafka 只存元数据（< 1KB），不影响吞吐和副本同步；
- 大文件走 OSS 的并行下载，不阻塞消费线程；
- OSS 有独立的生命周期管理（自动过期、归档），不占 Kafka 磁盘。

#### 🔬 扩展知识

::: details

- 【L3】Kafka 压缩（Compression）：如果大消息是文本/JSON，可在 Producer 端开启 Snappy/LZ4/Zstd 压缩（`compression.type`），Broker 端不解压直接存储，Consumer 端解压。压缩比通常 3~10x，但 CPU 开销增加。
- 【L4】`max.request.size` 与 `batch.size` 的关系：`max.request.size` 是单次请求上限（含多条消息的 batch），`batch.size` 是单个分区的批大小。如果单条消息 > `batch.size`，该消息会独占一个 batch；如果 > `max.request.size`，直接报 `RecordTooLargeException`。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "只改 Producer 的 max.request.size 就行" → Broker 和 Consumer 端也必须同步调整，否则 Broker 拒绝写入或 Consumer 拉取失败。
- ❌ "大消息压缩就能解决" → 压缩能减小体积但不解决根本问题（GC、IO 放大），超过 1MB 的消息建议直接外置。

:::

#### 🔀 发散问题

- **Q：Kafka 的性能为什么高？**

  → 大消息是性能杀手，理解 Kafka 的顺序写、零拷贝、PageCache 优化有助于避免性能陷阱，见本文档「Kafka 为什么性能高？」。

- **Q：MQ 消息积压如何处理？**

  → 大消息消费慢是积压的常见原因之一，见《MQ 面试》『如何处理 MQ 消息积压？』。

## Kafka 事务

### 【中等】Kafka 事务的核心机制是什么？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kafka / 事务

#### 💎 关键结论

Kafka 事务通过两阶段提交（2PC）实现跨分区、跨会话的 Exactly-Once 语义。核心组件：事务协调器（Transaction Coordinator）管理事务生命周期，Producer ID + Epoch 标识唯一生产者，Consumer 端 `isolation.level=read_committed` 只读已提交消息。Flink / Spark Streaming 依赖此机制实现端到端 Exactly-Once。

#### ⚡ 记忆卡片

- **口诀**：事务协调器管生命周期，PID+Epoch 标识，read_committed 才一致
- **关键词**：Transaction Coordinator ／ Producer ID ／ Epoch ／ 2PC ／ read_committed ／ ABORT 标记
- **链路**：beginTransaction → 写数据到多分区 → initCommit(Prepare) → 全部分区写入完成 → commit/abort → Consumer 按 isolation.level 过滤

#### 📖 核心知识

**事务型 Producer 使用方式**

```java
Properties props = new Properties();
props.put("transactional.id", "order-tx-001");  // 唯一标识，跨重启恢复
props.put("enable.idempotence", "true");         // 事务必须开启幂等

KafkaProducer<String, String> producer = new KafkaProducer<>(props);
producer.initTransactions();  // 注册事务协调器

try {
    producer.beginTransaction();
    producer.send(new ProducerRecord<>("topic-a", "key", "value1"));
    producer.send(new ProducerRecord<>("topic-b", "key", "value2"));
    producer.commitTransaction();
} catch (Exception e) {
    producer.abortTransaction();
}
```

**事务生命周期**

| 阶段                 | 动作                                                   | 协调器状态                     |
| -------------------- | ------------------------------------------------------ | ------------------------------ |
| initTransactions     | Producer 用 `transactional.id` 注册，获取 PID + Epoch  | Empty                          |
| beginTransaction     | 客户端标记新事务开始（无网络请求）                     | Empty                          |
| send（首次到新分区） | AddPartitionsToTxn 把分区登记进 `__transaction_state`  | Ongoing                        |
| commitTransaction    | 先写 PrepareCommit，再向所有涉及分区写 COMMIT 控制标记 | PrepareCommit → CompleteCommit |
| abortTransaction     | 先写 PrepareAbort，再向所有涉及分区写 ABORT 控制标记   | PrepareAbort → CompleteAbort   |

**Consumer 端隔离级别**

| isolation.level            | 行为                               | 适用场景          |
| -------------------------- | ---------------------------------- | ----------------- |
| `read_uncommitted`（默认） | 读取所有消息，包括未提交和已中止   | 不要求一致性      |
| `read_committed`           | 只读已提交消息，跳过未提交和已中止 | Exactly-Once 消费 |

`read_committed` 的实现：消费者只能读到 **LSO（Last Stable Offset）**之前的消息——LSO 是所有进行中事务里最早开始的那个事务的起始位置，LSO 之后的消息（含未决事务的写入）对 `read_committed` 消费者暂不可见；事务的 COMMIT/ABORT 标记落定后 LSO 才前移。因此大事务会拖住 LSO，放大 `read_committed` 消费延迟。

::: details 事务与幂等的关系

- **幂等**（`enable.idempotence=true`）：解决**单分区单会话**的去重——同一 Producer 在同一分区的重复发送被 Broker 识别并去重（基于 PID + Sequence Number）；
- **事务**：在幂等基础上扩展到**跨分区跨会话**——`transactional.id` 使 Producer 重启后能恢复未完成的事务，跨分区写入要么全成功要么全失败。

:::

#### 🔬 扩展知识

::: details

- 【L3】事务协调器的故障恢复：Producer 重启后，用相同的 `transactional.id` 重新注册，协调器检查是否有未完成事务——有则强制 abort（因为 Producer 可能丢失了部分发送上下文），Producer 重新 beginTransaction。
- 【L3】Epoch 的作用：防止「僵尸 Producer」——旧 Producer 假死未 abort 事务，新 Producer 用相同 `transactional.id` 注册后 Epoch 递增，旧 Producer 的后续写操作被 Broker 拒绝（Epoch 不匹配）。
- 【L4】事务的性能开销：每次 commit/abort 需协调器向所有涉及分区写入控制消息（commit/abort marker），分区数越多开销越大。生产建议：① 单个事务涉及的分区数控制在 100 以内；② `transaction.timeout.ms` 设合理值（默认 60s），超时自动 abort。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "开了事务就不用幂等" → 事务依赖幂等，`transactional.id` 隐含 `enable.idempotence=true`，两者不是替代关系。
- ❌ "read_committed 完全没有延迟" → `read_committed` 需等待事务的 COMMIT 标记写入后才能投递，大事务（跨多分区、写入量大）会导致消费延迟增加。
- ❌ "事务保证端到端 Exactly-Once" → Kafka 事务只保证 Broker 侧的 Exactly-Once；端到端还需 Consumer 处理幂等（如数据库 upsert）和 Flink Checkpoint 配合。

:::

#### 🔀 发散问题

- **Q：Flink 与 Kafka 的 Exactly-Once 如何实现？**

  → 依赖 Kafka 事务 + Flink Checkpoint 两阶段提交，见本文档「Kafka 与 Flink 的集成是如何实现的？」。

## Kafka Stream

### 【困难】Kafka 与 Flink 的集成是如何实现的？如何优化 Flink 与 Kafka 之间的数据流动？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kafka / Stream

#### 💎 关键结论

Flink 通过官方 Kafka Connector 把 Kafka 当 Source/Sink，一致性靠 Flink Checkpoint + Kafka 事务的两阶段提交实现 Exactly-Once。理由：checkpoint 把算子状态与 Kafka 事务提交绑定，失败回滚重试才能不重不漏。

#### ⚡ 记忆卡片

- **口诀**：连接器接入，checkpoint 保一致，事务提位点
- **关键词**：flink-connector-kafka ／ FlinkKafkaConsumer ／ Checkpoint ／ 事务 ／ 并行度
- **链路**：Connector 订阅 Topic 拉数据 → Flink 算子处理 → checkpoint 成功才 commit Kafka 事务 → 失败回滚重放

#### 📖 核心知识

目标是实现 **高吞吐、低延迟、强一致性** 的流式数据处理管道。

**基础集成步骤**

- **添加依赖**：引入 `flink-connector-kafka`（匹配 Kafka 版本）。
- **配置 Source**：新版 Flink 用统一 Source API 的 `KafkaSource`（`FlinkKafkaConsumer` 属旧 API，已废弃）。
- **配置 Sink**：新版用 `KafkaSink`（`FlinkKafkaProducer` 已废弃；Exactly-Once 需 `DeliveryGuarantee.EXACTLY_ONCE` + 事务前缀）。
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

注：上例为旧版 API 写法（`FlinkKafkaConsumer`/`FlinkKafkaProducer`，已废弃）；新版 Flink 请改用 `KafkaSource`/`KafkaSink`，语义与调优思路一致。

:::

**高级特性**

- **动态发现分区**：`setStartFromLatest()`/`setStartFromEarliest()`。
- **水位线生成**：结合 `assignTimestampsAndWatermarks` 处理事件时间。
- **Exactly-Once 保障**：启用 Kafka 事务（需配置 `transaction.timeout.ms`）。

#### 🔬 扩展知识

**【L3】Exactly-Once 链路的实现细节**

::: details

- Flink Sink 用两阶段提交：checkpoint 开始时预提交（pre-commit）事务，checkpoint 成功后才 commit；失败则 abort 并从上个 checkpoint 重放。
- 必须保证 `transaction.timeout.ms` 大于 checkpoint 间隔 + 最大重启延迟，否则悬挂事务被 Broker 主动 abort、已预提交数据丢失；同时它不能超过 Broker 端上限 `transaction.max.timeout.ms`（默认 15 分钟；Producer 侧 `transaction.timeout.ms` 默认仅 1 分钟，Flink 精确一次场景通常需显式调大）。
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

#### ⚡ 记忆卡片

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

#### ⚡ 记忆卡片

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

## 参考资料

- [聊聊 Kafka： Kafka 为啥这么快？](https://xie.infoq.cn/article/49bc80d683c373db93d017a99)
