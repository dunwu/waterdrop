---
icon: simple-icons:apacherocketmq
title: RocketMQ 面试
date: 2022-07-12 07:49:48
order: 99
categories:
  - 分布式
  - 分布式通信
  - MQ
  - RocketMQ
tags:
  - 分布式
  - 通信
  - MQ
  - RocketMQ
  - 面试
permalink: /pages/e162d7d1/
---

# RocketMQ 面试

## RocketMQ 简介

### 【简单】RocketMQ 是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 基础概念

#### 💎 关键结论

RocketMQ 是源于阿里巴巴、后捐赠给 Apache 成为顶级项目的开源分布式消息中间件，由 NameServer、Broker、Producer、Consumer 四大组件组成，原生支持事务消息、顺序消息、延迟消息等金融级特性。因为它诞生于阿里交易场景，相比 Kafka 更强调可靠性和业务消息能力。

#### ⚡ 记忆卡片

- **口诀**：NameServer 管路由，Broker 管存储，Producer 发消息，Consumer 收消息
- **关键词**：NameServer ／ Broker ／ Producer ／ Consumer ／ Topic ／ MessageQueue
- **链路**：Producer 从 NameServer 获取路由 → 轮询选择 MessageQueue → 发送到 Broker 写入 CommitLog → 异步构建 ConsumeQueue 索引 → Consumer 按位点拉取消费

#### 📖 核心知识

**RocketMQ 是一个开源分布式消息中间件**。最初由阿里巴巴开发，现在是 Apache 顶级项目。

**核心组件**

- **生产者（Producer）**：从 NameServer 获取路由信息后，将消息发送到 Broker。
- **消费者（Consumer）**：从 NameServer 获取路由信息后，从 Broker 拉取并消费消息。
- **代理（Broker）**：负责消息的存储、投递和查询。采用主从结构保证高可用。
- **命名服务（NameServer）**：管理所有 Broker 的地址列表。无状态，简单高效。

**逻辑存储**

- **主题（Topic）**：消息的一级分类，生产者和消费者操作的逻辑对象。
- **标签（Tag）**：Topic 下的二级分类，用于对消息进行过滤。
- **消息（Message）**：包含 Body（消息体）、Topic、Tags（标签）、Keys（唯一键）等属性。
- **消息队列（Message Queue）**：Topic 在物理上的分区，是负载均衡和并行处理的最小单位。

**物理存储**

- **提交日志（CommitLog）**：**所有 Topic 的消息混写**到同一组文件中**顺序追加**，默认单文件 **1GB**（`mappedFileSizeCommitLog`），写满切换下一个文件。这是实现高吞吐写入的关键。
- **消费队列（ConsumeQueue）**：CommitLog 的**逻辑消费索引**，每个 MessageQueue 对应一个。条目**定长 20 字节：8 字节 CommitLog 物理偏移 + 4 字节消息长度 + 8 字节 Tag 哈希码**，定长设计使第 N 条消息可按偏移直接定位。
- **索引文件（IndexFile）**：按 **Message Key** 或时间范围查询消息的**哈希索引**（key 哈希定位槽位、槽内链表串联），**哈希冲突时需遍历链表**，因此只适合点查、不适合精确去重判重。

**读取路径**：消费时先读 ConsumeQueue 条目拿到物理偏移，再回 CommitLog 读消息体——**两次跳转，本质是随机读**，主要靠 PageCache（热数据仍在内存）与预读缓解。

#### 🔬 扩展知识

::: details

- 【L3】RocketMQ 与 Kafka 的定位差异

  RocketMQ 面向金融级业务消息（事务消息、延迟消息、消息轨迹、死信队列均内置），Kafka 面向大数据高吞吐管道场景。

- **存储流派对比（P8 区分度最高的追问）**：RocketMQ 是「所有 Topic 混写一个 CommitLog + ConsumeQueue 逻辑索引」，**写入永远顺序，Topic/队列数增加不劣化写性能**，
  代价是读取多一次跳转；Kafka 是「每 Partition 独立目录 + Segment 分段」，**读取按 Partition 直接定位**，但 Topic/Partition 数量大时多文件并发追加使写入退化为随机 IO。

  两者是「写优化 vs 读优化」的取舍，不是谁绝对更好。

- RocketMQ 5.0 起定位从"消息队列"升级为"消息 + 事件 + 流"一体化数据平台。

- 【L4】RocketMQ 的技术血统

  早期版本借鉴 Kafka 的日志存储思想（顺序写 + Page Cache），但为支持事务消息、按 Key 查询等电商需求，自研了 ConsumeQueue/IndexFile 二级索引体系。

:::

#### 🔀 发散问题

**Q：RocketMQ 的四大组件如何协作？**
A：见本文档『RocketMQ 有哪些核心组件？』。一句话：Broker 向 NameServer 注册路由，Producer/Consumer 通过路由发现 Broker 并直连收发。

**Q：RocketMQ 的存储为什么能支撑海量消息堆积？**
A：见《MQ面试》『Kafka、RocketMQ、RabbitMQ 如何存储数据与持久化？』。核心是单 CommitLog 顺序写 + 异步构建 ConsumeQueue/IndexFile 多索引，写入性能不受 Topic 数量影响。

### 【简单】RocketMQ 有哪些核心组件？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 架构组件

#### 💎 关键结论

RocketMQ 由 NameServer（路由中心）、Broker（存储与中转核心）、Producer、Consumer 四个组件组成，四者通过"注册-发现"机制解耦。因为 NameServer 无状态、Broker 独立存储，整个架构可以水平扩展。

#### ⚡ 记忆卡片

- **口诀**：NameServer 管路由，Broker 管存储，Producer 发消息，Consumer 收消息
- **关键词**：NameServer ／ Broker ／ Producer ／ Consumer ／ 路由注册 ／ 服务发现
- **链路**：Broker 启动注册到 NameServer → Producer/Consumer 拉取路由 → Producer 按路由直连 Broker 发送 → Broker 持久化 → Consumer 按路由直连 Broker 拉取

#### 📖 核心知识

**组件职责**

| 组件           | 核心角色           | 关键职责                                                      | 特点                                     |
| :------------- | :----------------- | :------------------------------------------------------------ | :--------------------------------------- |
| **NameServer** | **路由中心**       | 服务发现与路由管理。Broker 注册，Producer/Consumer 获取路由。 | **无状态、轻量级**，实现组件解耦。       |
| **Broker**     | **存储与中转核心** | 消息的接收、存储、投递和查询。                                | **主从架构**，保证高可用与数据持久化。   |
| **Producer**   | **消息生产者**     | 创建并发送消息到指定 Topic 的 Broker。                        | 支持**同步、异步、单向**发送，内置重试。 |
| **Consumer**   | **消息消费者**     | 从 Broker 拉取消息并提交给业务应用处理。                      | 以**消费者组**为单位进行负载均衡消费。   |

**协作流程**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/09/8484db878a9448d1bdfb612db641cc60.png)

1. **Broker** 启动后向 **NameServer** 注册。
2. **Producer/Consumer** 启动时从 **NameServer** 获取路由信息（Topic 在哪些 Broker 上）。
3. **Producer** 根据路由信息将消息发送给对应的 **Broker**。
4. **Broker** 将消息持久化存储。
5. **Consumer** 根据路由信息从 **Broker** 拉取消息进行消费。

#### 🔀 发散问题

**Q：为什么 RocketMQ 用自研 NameServer 而不用 ZooKeeper？**
A：见本文档『NameServer 如何实现服务发现？为什么不用 ZooKeeper？』。路由发现是 AP 场景，NameServer 无状态、节点互不通信，比 CP 的 ZooKeeper 更轻量可用。

**Q：NameServer 挂了消息还能收发吗？**
A：短时间内可以。客户端本地缓存了路由信息，NameServer 全部宕机只影响路由更新和新 Broker 注册，已建立的连接仍可继续收发。

## RocketMQ 存储

### 【困难】RocketMQ 如何实现内存映射机制？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 存储设计 / mmap

#### 💎 关键结论

RocketMQ 用 `MappedByteBuffer`（mmap）把 CommitLog 文件直接映射到进程虚拟内存，写入本质是写 Page Cache、读取如同访问数组，从而实现高吞吐低延迟。因为绕过了用户态缓冲区和频繁系统调用，mmap 是 RocketMQ 存储性能的核心基石。

#### ⚡ 记忆卡片

- **口诀**：mmap 映射文件，写内存即写缓存，读数据如读数组
- **关键词**：MappedByteBuffer ／ mmap ／ Page Cache ／ 零拷贝 ／ 堆外内存
- **链路**：mmap 建立文件与虚拟内存映射 → 写消息即写 Page Cache → OS 择机刷盘 → 读取直接按内存地址访问 → 热数据免磁盘 IO

#### 📖 核心知识

**内存映射**使用 `MappedByteBuffer`，将磁盘文件**直接映射到进程虚拟内存空间**，以实现**高吞吐、低延迟**的读写性能。

**工作原理**

- **写入**：消息直接**追加**到 `MappedByteBuffer`，本质是写入**内存**和 **OS Page Cache**，而非直接写磁盘。
- **读取**：通过 `MappedByteBuffer` **直接定位内存地址**读取数据，如同访问数组，无需磁盘 I/O。

**性能优势**

- **极高写入性能**：将磁盘随机 I/O 转换为顺序内存写入，避免频繁系统调用。
- **极高读取性能**：将磁盘随机 I/O 转换为内存访问，利用 Page Cache 实现"**零拷贝**"读取。
- **高效内存管理**：主动调用 `force()` 刷盘，并通过堆外内存池管理，避免传统 `DirectByteBuffer` 依赖 GC 回收的问题。

**潜在问题**

- **内存压力**：受 OS 虚拟内存空间限制，大量映射文件占用地址空间。
- **数据丢失风险**：**异步刷盘**模式下，写入 Page Cache 后即返回，宕机可能导致数据丢失。
- **文件释放**：`MappedByteBuffer` 占用的堆外内存不易被 JVM 及时回收。

#### 🔬 扩展知识

::: details

- 【L3】RocketMQ 在 Broker 启动时会对 CommitLog 做预热（`warmMapedFileEnable`）

  提前分配并逐页写入 0 值触发缺页中断，避免运行期首次写入某个映射文件时出现延迟毛刺。

- 对比传统 `read/write` 系统调用：mmap 省去用户态缓冲拷贝，写路径只剩一次内存拷贝；配合 `mlock` 可防止映射页被换出。

- 【L4】mmap 的释放依赖 `unmap`（Java 需反射调用 `Cleaner`），因此 RocketMQ 按 1G 固定大小滚动文件并延迟释放旧映射；`vm.max_map_count` 内核参数不足会导致映射失败，
  是部署时常见坑。

:::

#### 🔀 发散问题

**Q：mmap 模式下为什么异步刷盘可能丢消息？**
A：写入只到达 Page Cache 就返回成功，若整机断电，未刷盘的缓存数据丢失。丢失量约等于刷盘间隔内的写入量，见《MQ面试》『如何保证 MQ 消息不丢失？』。

**Q：Kafka 和 RocketMQ 都用了零拷贝，用法一样吗？**
A：思路相同但侧重不同：RocketMQ 写路径重度依赖 mmap；Kafka 读路径更多用 `sendfile` 直接从 Page Cache 到网卡。两者都靠 Page Cache 抹平磁盘速度。

## RocketMQ 生产消费

### 【中等】RocketMQ 的发送流程是什么？如何选择发送方式？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 生产端 / 发送方式

#### 💎 关键结论

先查路由、选队列，再直连 Broker 发送。同步等待结果，异步用回调，单向不等确认；前两者配合重试与补偿提高可靠性，单向只用于允许丢失的业务。

#### ⚡ 记忆卡片

- **口诀**：查路由、选队列；同步等、异步回、单向不等回
- **关键词**：路由缓存 ／ MessageQueue ／ SendResult ／ SendCallback ／ 重试与补偿
- **链路**：拉取并缓存路由 → 轮询选队列 → 直连写入 Broker → 同步结果或异步回调 → 失败重试与补偿；单向发送 → 不等待确认

#### 📖 核心知识

**1. 发现路由，直连发送**

Producer 启动后从 NameServer 获取 Topic 所在 Broker、MessageQueue 等路由并缓存，通常轮询选择可写队列，再直连该队列的 Master/Leader。**NameServer 不转发消息**；Broker 写入后按刷盘、复制配置返回结果，客户端按周期刷新路由，路由缺失时也会尝试更新。

**2. 按等待方式与业务要求选择 API**

以下以经典 Java Remoting 客户端 `DefaultMQProducer` 为例，其他 SDK 的接口与执行线程模型需分别核对。

| 发送方式 | 结果与线程行为                                                                 | 适用场景与代价                                                                 |
| :------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **同步** | `send(message)` 阻塞等待 `SendResult`，其中含消息 ID、队列、发送状态           | 订单通知等需要当前调用获知结果的链路；占用调用线程，但不等于数据库与 MQ 强一致 |
| **异步** | `send(message, callback)` 不同步等待 Broker 响应，通过 `SendCallback` 处理结果 | 对响应敏感、高吞吐场景；须处理回调、并发上限与失败补偿，可靠性并不天然低于同步 |
| **单向** | `sendOneway(message)` 不等待 Broker 确认，无结果回调                           | 可丢失的日志、指标；省去等待确认的开销，但无法确认消息是否落入 Broker          |

::: details 三种发送 API 与异步补偿示例

```java
// 同步：除捕获调用异常外，还应检查返回的发送状态
SendResult result = producer.send(message);
if (result.getSendStatus() != SendStatus.SEND_OK) {
    compensation.record(message, result.getSendStatus().name());
}

// 异步：compensation 代表业务持久化补偿接口，按业务键去重
try {
    producer.send(message, new SendCallback() {
        @Override
        public void onSuccess(SendResult result) {
            if (result.getSendStatus() != SendStatus.SEND_OK) {
                compensation.record(message, result.getSendStatus().name());
            }
        }

        @Override
        public void onException(Throwable e) {
            compensation.record(message, e.getMessage());
        }
    });
} catch (Exception e) {
    // 提交异步请求本身也可能失败，不能只处理回调异常
    compensation.record(message, e.getMessage());
}

// 单向：作为独立选项使用，不确认 Broker 是否写入成功
producer.sendOneway(message);
```

以上是三种独立用法，不应把同一业务消息依次发送三遍。补偿记录需可靠落库或写入可恢复日志，交由定时任务重发并监控失败；仅打印日志不能保证可恢复，进程在回调前崩溃也需要持久化发送意图或业务对账兜底。

:::

**3. 有确认的发送才谈确认失败重试**

经典客户端同步 `retryTimesWhenSendFailed`、异步 `retryTimesWhenSendAsyncFailed` 默认均为 **2 次重试**，不是总共发送 2 次；实际尝试受异常类型、发送超时预算等约束。同步重试通常尽量避开上次失败的 Broker，但并非所有重载、异步路径都保证换 Broker；没有其他可用节点时也无法故障转移。单向发送虽可能发现本地连接/写出异常，却没有基于 Broker 确认的自动重试。

**4. 超时不等于没写入**

Broker 已写入但响应丢失时，重试或补偿会产生重复。发送端应使用稳定业务键，消费端幂等；同步、异步都不能只凭“API 没抛异常”推导永久不丢消息，仍须检查发送状态与存储可靠性配置。

#### 🔬 扩展知识

::: details

- 【L3】`sendLatencyFaultEnable` 在经典客户端默认关闭；开启后根据 Broker 发送延迟、故障记录进行一段时间的规避。应压测后配置，节点少或剩余容量不足时，规避会把流量压向少数 Broker，可能加剧热点，
  不能替代扩容。

- 【L3】异步的“不等待响应”不代表调用过程绝不阻塞

  路由获取、资源申请、发送任务提交等仍可能耗时，具体取决于 SDK 版本。慢回调或无界并发会耗尽线程/在途请求资源，应设超时、背压并监控补偿积压。

- 【L4】顺序消息不能在失败后随意换队列重发。应固定同一业务键的队列，并在前一条结果不确定时阻止后续越过；是否关闭 SDK 重试取决于所用发送接口与重试路径，关闭重试本身既不保序也不保可靠。

:::

#### ⚠️ 常见误区

::: details

- ❌ "同步最可靠，异步只能发非关键消息" → 两者都有结果反馈，可靠性取决于存储确认、异常处理及补偿是否完整；区别主要在等待方式。
- ❌ "所有发送方式失败都会默认重试两次" → 默认值有 SDK 与接口边界，单向没有 Broker 确认重试，顺序选择器路径也不能直接套普通发送结论。
- ❌ "异步回调失败时打印日志就不会丢" → 日志未必可恢复，回调前崩溃更无法记录失败；关键链路需持久化补偿、事务消息或对账。

:::

#### 🏭 实战场景

::: details

生产案例：支付通知系统最初对所有消息统一使用异步发送（async send），认为异步有回调就能保证可靠性。某次数据库主从切换期间（持续约 45 秒），Broker 端写入延迟飙升，
异步发送回调超时无效但未被正确处理——回调函数中仅打印了 error 日志而未做持久化补偿，导致约 2000 条支付成功通知静默丢失，用户付款后收不到到账通知，客诉在 2 小时内累积超过 300 单。

排查发现异步发送的 SendCallback 中 onException 分支只做了 log.warn，消息体未落库也无法重发。根因是关键业务消息不应使用异步发送，异步适用于允许丢失或可补偿的场景。

修复方案：支付事件消息改为同步发送（sync send），设置 sendMsgTimeout=3000ms、retryTimesWhenSendFailed=3，确保发送失败时 Broker 侧有明确异常抛出并触发重试；
非关键的运营日志消息保留异步发送以维持吞吐量。改造后消息丢失率从 0.1% 降至 0，同步发送带来的延迟增加（约 5ms）在支付场景完全可接受。

:::

#### 🔀 发散问题

**Q：发送超时重试为什么会重复？**
A：超时只说明未及时收到结果，不证明 Broker 未写入。消费端应按业务唯一键去重，见《MQ面试》『如何保证 MQ 消息不重复？』。

**Q：有顺序要求时可以自动换 Broker 吗？**
A：随意换 Broker/队列会破坏同一业务键的顺序，需要固定队列并处理前序结果不确定的情况。完整条件见《MQ面试》『如何保证 MQ 消息的顺序性？』。

### 【中等】RocketMQ 的消费流程、消费模式与负载均衡如何工作？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：RocketMQ / 消费端 / Rebalance

#### 💎 关键结论

传统集群消费先组内分队列，再拉取、处理并保存位点；广播则各实例消费全量。实例变化会重分配并可能重复；5.x 新 SDK 的 Pop 是消息粒度分担，不能套用队列独占与位点确认模型。

#### ⚡ 记忆卡片

- **口诀**：集群分队列，广播各一份；交接看位点，Pop 看确认
- **关键词**：消费者组 ／ 长轮询 ／ Rebalance ／ Offset ／ 广播 ／ Pop
- **链路**：获取路由与组成员 → 按模式分配队列 → 拉取并交给监听器 → 更新位点或失败重试 → 实例增减触发 Rebalance；Pop → 不可见窗口 → ACK 或重投

#### 📖 核心知识

**1. 先划清客户端与消费模型**

下述队列分配、广播、本地位点与默认重试数，主要指 **4.x 经典 Java Remoting 客户端**，以及它连接 5.x Broker 时仍使用的传统 Pull 消费路径。`DefaultMQPushConsumer` 用长轮询拉取封装业务监听器，不是 Broker 无请求主动推送；显式 Pull API 则由应用控制拉取、处理与位点提交。

**2. 集群与广播决定谁消费、谁保存进度**

| 维度     | 集群模式 `CLUSTERING`（默认）                       | 广播模式 `BROADCASTING`                         |
| :------- | :-------------------------------------------------- | :---------------------------------------------- |
| 消息分担 | 稳定分配时同组一个队列归一个实例，不同组互不影响    | 每个实例独立订阅全量队列                        |
| 位点     | 客户端维护进度，定期持久化到 Broker，按组和队列记录 | 各实例维护并持久化到本地                        |
| 失败处理 | 经典 Push 支持消费重试，超限进入死信                | 不自动进入 `%RETRY%` 重试队列，业务自行处理失败 |
| 场景     | 订单、日志等分摊负载，水平扩展                      | 本地缓存刷新、配置通知等全员处理                |

“一条消息分给一个实例”不等于恰好处理一次，广播也不是每个节点必达的强保证。同一应用若要同时集群和广播消费一个 Topic，应使用不同消费组。

**3. 发现、拉取、处理、推进位点**

Consumer 从 NameServer 获取 Topic 路由，并从 Broker 获取组成员信息，计算自己负责的队列；从 Broker 拉取后交给线程池中的 `MessageListener`。传统 Push 监听器返回成功时，客户端据已完成的消费进度推进 Offset，再周期性持久化，**不是每成功一条就发一个网络 ACK**；显式 Pull API 需应用自行完成这些管理。

经典集群并发消费失败通常送到 `%RETRY%<group>`，默认最多重试 16 次，耗尽进入 `%DLQ%<group>`；此数值不直接适用于广播、顺序消费或所有 5.x SDK。至少一次投递路径可能重复，业务必须幂等。

**4. Rebalance 决定队列归属与实例上限**

同组实例订阅及分配策略应一致。默认平均分配，实例加入、退出、队列数或路由变化时重新计算；传统客户端有默认约 **20s** 的周期检查，也可因成员变化通知而唤醒，并非必须等完整周期。旧实例释放队列、保存位点，新实例从已持久化进度接管。

队列是**实例间分配的最小单位**：假设同组订阅范围内有 8 个可分配队列，扩到 12 个实例会有 4 个分不到队列，但一个实例内部仍可用多个线程并发处理消息。队列均分不等于流量均分，热点队列仍可能积压。

**5. 生产端负载均衡不是消费端 Rebalance**

Producer 通常轮询选择 MessageQueue，把消息分散到不同 Broker，不参与消费者组的队列分配。顺序消息需按业务键选定队列，不能无条件轮询；消费扩容前也应先确认队列数与热点，而不是只加实例。

#### 🔬 扩展知识

::: details

- 【L3】传统 Push 的 Broker 长轮询挂起时间常见默认为 **15s**（`brokerSuspendMaxTimeMillis`），有消息可提前返回，以减少空轮询且兼顾实时性——
  这就是 `DefaultMQPushConsumer`「名为 Push 实为长轮询 Pull」的真相。经典客户端默认约 **5s** 持久化一次消费位点，但调度延迟、提交失败、慢消息和队列交接都会扩大重复窗口，
  不能承诺“最多只重复 5 秒的消息”。

- 【L3】分配策略包括 `AllocateMessageQueueAveragely`（默认平均）、`AllocateMessageQueueAveragelyByCircle`（环形）、机房就近、一致性哈希等。

  Rebalance 时旧实例已处理但未保存的进度可能被新实例重放；队列归属变化也会引起短暂消费停顿，位点不能替代业务幂等。

- 【L4】5.x 新 gRPC SDK 的 PushConsumer/SimpleConsumer 经 Proxy 通常走 Broker **Pop 消息粒度负载均衡**

  服务端维护在途消息，消费者无需固定独占整条队列，
  适合弹性与 Serverless。消息取出后在 `invisible time` 内暂不可见，成功需 ACK，未确认则到期可重投；业务执行超出窗口要按接口能力续期或调大时间并保持幂等。它不是传统 Pull 的 Offset 提交，
  也不是长轮询的 15s 等待时间；仅升级 Broker、继续使用传统客户端不会自动切换消费模型。

:::

#### ⚠️ 常见误区

::: details

- ❌ "队列只能被一个线程消费，消费者永远不能多于队列数" → 队列独占限制的是传统集群的实例分配，非实例内部并发线程数；Pop 模型也不能照搬该限制。
- ❌ "返回消费成功就是逐消息 ACK，广播失败也自动重试" → 传统 Pull 路径按位点推进，广播保存本地位点且无自动重试，不能与 Pop 的 ACK 混用。
- ❌ "有 Offset 就不会重复，Rebalance 会按实时流量均摊" → 位点提交有延迟，重分配会重放；通常按队列而非实时消息量分配，热点仍需治理。

:::

#### 🔀 发散问题

**Q：消费扩容没效果，先查什么？**
A：先区分传统队列分配还是 Pop，再看队列数、热点、消费线程及下游瓶颈。传统模式必要时规划扩队列或迁移到更多队列的 Topic，见《MQ面试》『如何处理 MQ 消息积压？』。

**Q：重试耗尽后如何处理？**
A：经典集群并发消费进入死信队列后，应告警、定位原因并受控补偿，而非让消息无人管理。见《MQ面试》『什么是死信队列？各 MQ 如何实现死信处理机制？』。

**Q：并发消费和顺序消费改变的是哪个环节？**
A：主要改变监听器执行方式及失败后的处理策略，不是把集群模式变成广播模式。具体配置见本文档『RocketMQ 中如何配置并发消费和顺序消费？』。

### 【简单】RocketMQ 如何实现批量消息？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 生产端

#### 💎 关键结论

批量消息通过 `MessageBatch` 把多条消息打包成一次网络请求发送，用网络往返次数换吞吐。但批量包有大小上限，超限要自行分批，否则发送直接失败。

#### ⚡ 记忆卡片

- **口诀**：多条打包、一次网络、超限分批
- **关键词**：MessageBatch ／ 批量发送 ／ 网络往返 ／ 分批
- **链路**：业务攒批 → MessageBatch.generateFromList 打包 → 单次网络调用发送 → Broker 整批写入

#### 📖 核心知识

批量消息通过 `MessageBatch` 类实现，该类将多条消息封装成一个对象，再通过单次网络调用统一发送：

```java
List<Message> messages = new ArrayList<>();
messages.add(new Message("Topic", "Tag", "Key", "Message Body".getBytes()));
// 省略添加更多消息
MessageBatch messageBatch = MessageBatch.generateFromList(messages);
// producer.send(messageBatch);
```

**使用约束**：

- 同一批消息必须属于**同一 Topic**，且不能是延迟消息、事务消息、重试消息。
- 批量包总大小不宜过大：官方示例按 **1MB** 分批，超过 Broker 接收上限（默认 4MB，`maxMessageSize`）会直接发送失败。

#### 🔬 扩展知识

【L3】批量发送的收益主要在降低网络往返与系统调用次数；Broker 侧仍是整批顺序写入 CommitLog，批量内消息不保证同队列、同顺序。

#### 🔀 发散问题

**Q：批量发送失败会部分成功吗？**
A：批量消息在 Broker 侧作为整体写入，要么整批成功要么整批失败；重试也是整批重发，消费端需按业务键幂等。

**Q：消费端怎么攒批提速？**
A：与发送端攒批对应，消费端用预取攒够一批后统一处理、统一确认，见《RabbitMQ面试》『RabbitMQ 如何实现消息的批量消费？』。

## RocketMQ 集群

### 【中等】RocketMQ 如何部署集群并实现高可用？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：RocketMQ / 集群部署 / 高可用

#### 💎 关键结论

部署先选主从拓扑与复制策略，再补齐路由多活和客户端容错。传统主从不能自动切写主，需选用 DLedger 或 Controller；同步复制也不等于同步刷盘，不能笼统承诺零丢失。

#### ⚡ 记忆卡片

- **口诀**：拓扑定底座，三层做容错；复制非刷盘，切主看模式
- **关键词**：多 Master ／ 主从复制 ／ NameServer 多活 ／ 故障规避 ／ DLedger ／ Controller
- **链路**：部署路由节点与 Broker 复制组 → 注册 Topic 路由 → 客户端直连收发 → 失败重试及重分配 → 自动切主模式选出新主 → 路由更新后恢复写入

#### 📖 核心知识

**1. 四种传统部署方式是选型入口**

| 部署方式                           | 能力与故障边界                                                                           | 典型取舍                                            |
| :--------------------------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| **单 Master**                      | 宕机即该集群不可用，无副本接管                                                           | 简单、成本低，适合开发测试                          |
| **多 Master**                      | 独立 Master 分担流量，但彼此不是副本；一个宕机，其上未消费消息暂不可用，磁盘损坏可能丢失 | 吞吐可扩展，但不构成完整存储容错                    |
| **多 Master 多 Slave（异步复制）** | 每组主从异步同步，Master 故障后可在条件允许时从 Slave 继续读；未复制部分可能丢失         | 延迟较低，需接受复制滞后；传统 Slave 不自动接管写入 |
| **多 Master 多 Slave（同步复制）** | 写入需等待副本确认，降低单主故障的数据丢失窗口                                           | 增加等待开销，副本不足时写入受限；仍不自带自动切主  |

生产环境应结合故障域、RPO/RTO 与预算选择多复制组、跨故障域副本；金融等低 RPO 链路重点核对同步复制和持久化确认，不把四种方式简单排成固定“性能最高/可靠性绝对最高”。传统模式通过 `brokerRole` 配置复制策略（`SYNC_MASTER` 同步复制 / `ASYNC_MASTER` 异步复制 / `SLAVE`），与刷盘策略 `flushDiskType`（`SYNC_FLUSH` / `ASYNC_FLUSH`）组合成四种可靠性-性能档位：同步刷盘 + 同步复制最可靠但吞吐最低（同步刷盘比异步刷盘低一到两个数量级），异步刷盘 + 异步复制吞吐最高但宕机丢失窗口 = 未刷盘且未复制的数据。自动切主模式需按对应版本单独部署配置。

**2. 路由、存储、客户端三层都要容错**

- **路由层**：至少配置多个 NameServer；常见为 2 个以上，3～4 个可作为跨故障域部署选择，并非多数派要求。节点独立维护路由，Broker 向所有节点注册，客户端配置多个地址以便切换。
- **存储层**：副本复制负责数据冗余，是否能自动恢复写入取决于切主机制；有副本不等于有自动故障转移。
- **客户端层**：生产端重试、故障规避与持久化补偿，消费端组内 Rebalance、重试、死信处理及幂等。广播模式没有自动消费重试，不能沿用集群模式的故障兜底假设。

**3. 部署后先注册路由，再直连收发**

NameServer 启动监听，Broker 建立连接并注册自身及 Topic 元数据；创建 Topic 时规划其所在 Broker 和队列，自动创建仅在相关配置允许时生效，生产环境宜显式管理。Producer/Consumer 查询并缓存对应 Topic 路由后直连 Broker，发送端通常轮询选队列，消费端按消费模型分担。

经典配置常见为 Broker 约 30s 注册、NameServer 约 10s 扫描并按 120s 无心跳判过期、客户端约 30s 刷新路由；它们不是固定故障恢复时限，详见本文档『NameServer 如何实现服务发现？为什么不用 ZooKeeper？』。

**4. 把复制、刷盘、切主分开判断**

| 机制                            | 解决的问题                                   | 不能据此推导的结论                                   |
| :------------------------------ | :------------------------------------------- | :--------------------------------------------------- |
| 异步/同步复制                   | 数据何时到达其他副本，发送确认是否等待副本   | 同步复制不代表所有副本已经落盘，也不决定切主快慢     |
| `ASYNC_FLUSH` / `SYNC_FLUSH`    | 本机写入何时从内存缓存刷到磁盘、确认是否等待 | 单机同步刷盘无法替代异机冗余                         |
| 人工切主 / DLedger / Controller | 失效后由谁裁决新写主以及可选副本             | 自动切主不意味着任意网络分区、全部副本故障下都零丢失 |

实际持久性需结合确认成功的副本数、刷盘条件、超时返回状态、选主策略及故障范围评估；异步复制滞后时也不能保证 Slave 读到 Master 上全部消息。

**5. 客户端配置必须与业务失败处理配套**

::: details 经典 Java 客户端容错配置示例

以下数值是示例配置，不是默认值；省略业务依赖初始化，`business.consumeIdempotently` 表示按业务键幂等处理。

```java
DefaultMQProducer producer = new DefaultMQProducer("ProducerGroup");
producer.setNamesrvAddr("ns1:9876;ns2:9876");
producer.setRetryTimesWhenSendFailed(3);
producer.setSendLatencyFaultEnable(true);
producer.setSendMsgTimeout(5000);
producer.start();

try {
    SendResult result = producer.send(msg);
    if (result.getSendStatus() != SendStatus.SEND_OK) {
        compensation.record(msg, result.getSendStatus().name());
    }
} catch (Exception e) {
    compensation.record(msg, e.getMessage());
}

DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
consumer.setNamesrvAddr("ns1:9876;ns2:9876");
consumer.subscribe("YourTopic", "*");
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        try {
            for (MessageExt msg : msgs) {
                business.consumeIdempotently(msg);
            }
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        } catch (Exception e) {
            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
        }
    }
});
consumer.start();
```

重试受超时预算与可用 Broker 限制，并不保证尝试全部成功。经典集群并发消费默认最多重试 16 次，耗尽转死信；若一批消息部分已成功再整批重试，成功部分也必须支持去重。

:::

#### 🔬 扩展知识

::: details

- 【L3】**DLedger 模式（4.5+）**把 DLedger 嵌入 Broker，Producer 写 Leader，由 Raft 复制到 Followers，并由复制组自动选举。通常按 3 副本等奇数节点部署，需多数派可用；
  不是必须另建一套独立 DLedger 数据服务。存储布局与传统 CommitLog 模式不同，迁移需评估兼容性、日志复制开销与回滚方案；切换时间依赖选举及路由收敛，不应硬性承诺秒级完成。

- 【L3】**Controller 模式（5.x）**由 Controller 集群管理 Broker 角色、任期和同步副本集合 `SyncStateSet`，Broker 之间仍走其 HA 数据复制。Controller 可独立部署，
  也有嵌入 NameServer 进程的部署形态；它的共识选举职责与 NameServer 路由职责是分离的。Master 故障后按同步集合及配置选新主，Broker 更新角色并重新注册路由，客户端再刷新；
  Controller 不承载业务消息数据流。

- 【L4】三种方案对比：

| 方案       | 自动切写主                   | 存储与运维取舍                                           | 可靠性边界                                   |
| :--------- | :--------------------------- | :------------------------------------------------------- | :------------------------------------------- |
| 传统主从   | 否，需人工/外部运维流程      | 原生 CommitLog，运维自行处理恢复写入                     | 取决于复制、刷盘和人工选择副本               |
| DLedger    | 是，依赖 Raft 多数派         | 需评估存储迁移、复制开销                                 | 不绕过多数派提交和持久化条件                 |
| Controller | 是，依赖控制面共识及合格副本 | 保留原生 CommitLog，降低存储格式迁移成本，但升级仍需演练 | 同步集合外不安全选主等配置会改变数据丢失风险 |

已有传统集群升级可优先评估 Controller，但要核对具体 5.x 小版本支持、配置与兼容性，不能把存储格式兼容等同于无需验证的平滑升级。

- 【L3】**磁盘容量与清理水位**：CommitLog 默认保留 **72 小时**（`fileReservedTime`），到期在凌晨低峰清理；
  磁盘使用率超过 `diskMaxUsedSpaceRatio`（默认 **75%**）会提前触发清理，达到告警水位（默认约 **90%**）时 Broker **拒绝写入**保护磁盘。容量规划 = 峰值写入量 × 保留时长 × 副本数，
  再预留清理水位空间；消息积压超保留期时会被物理删除，「堆积能力」不等于「无限保留」。

- 【L3】**Topic 与队列数规划**：读队列数按「目标吞吐 ÷ 单队列吞吐」估算，同时它是消费端实例并行度的**上限**（超出的消费者分不到队列只能空转），扩容消费者前必须先确认队列数；
  队列数后续调减涉及读写队列两步收缩（先扩读后缩写），规划时应一次到位并留余量。

:::

#### ⚠️ 常见误区

::: details

- ❌ "部署多 Master 就有备份，Slave 在主宕机后自然能写" → 独立 Master 不是互为副本，传统 Slave 不自动升级为写主。
- ❌ "NameServer 负责主从切换，和它一起部署 Controller 就是同一机制" → 一个提供路由，一个作选举裁决，职责与一致性要求不同。
- ❌ "同步双写等于同步刷盘，启用自动切主就绝对零丢失" → 复制、刷盘及选主是独立维度，须明确确认条件与故障假设。

:::

#### 🔀 发散问题

**Q：NameServer 全挂了是否立即不能收发？**
A：不一定，已有有效缓存且 Broker 可达时可以继续；新 Topic 发现和路由变更会受阻。恢复要同时检查路由层与存储层，不能只看连接仍存活。

**Q：自动切主为什么不能随便选一个存活 Slave？**
A：存活不代表已同步全部已确认数据，选落后副本会丢消息。Controller 的同步集合、DLedger 的多数派日志规则都是为约束候选者，而非只看进程是否在线。

### 【中等】NameServer 如何实现服务发现？为什么不用 ZooKeeper？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：RocketMQ / 服务发现 / 架构选型 / CAP

#### 💎 关键结论

NameServer 用独立多活节点保存路由，Broker 分别注册，客户端拉取并缓存。路由容忍短暂不一致，因而不必引入 ZooKeeper 的共识与运维成本；这不代表 Broker 复制也可放弃一致性。

#### ⚡ 记忆卡片

- **口诀**：节点无主不互通，Broker 全员报，客户端缓存用
- **关键词**：全量路由 ／ 独立多活 ／ 心跳剔除 ／ 路由缓存 ／ 最终一致 ／ AP 取舍
- **链路**：Broker 向所有 NameServer 注册 → 各节点维护内存路由 → 客户端按 Topic 查询并缓存 → 直连 Broker → 心跳过期剔除与客户端刷新收敛

#### 📖 核心知识

**1. 只做路由注册与发现，不转发业务消息**

NameServer 管理 Broker 地址、Topic 与队列的映射，为 Producer/Consumer 提供服务发现。每个节点设计上维护完整集群路由，客户端通常查询**所需 Topic** 的路由，而非每次拉取全集群所有 Topic。

**2. 无主、不互通，路由由 Broker 重新构建**

各 NameServer 实例平等，节点之间不复制数据或选主；Broker 向全部配置的 NameServer 注册，各自更新内存路由。所谓“无状态”指**路由无需持久化、可重建**，不是内存里没有状态；重启后等待 Broker 重新注册，路由逐步恢复，不保证刚启动就有完整数据。

**3. 心跳、扫描、客户端刷新共同决定收敛**

经典 4.x 默认行为如下，实际值及快速摘除机制需按版本、配置核对：

| 环节             | 常见默认值 | 作用                                                              |
| :--------------- | :--------- | :---------------------------------------------------------------- |
| Broker 注册/心跳 | 约 30s     | 向所有 NameServer 报告 Broker 信息，并按注册协议更新 Topic 元数据 |
| NameServer 扫描  | 约 10s     | 检查 Broker 最后更新时间，清理失效路由                            |
| Broker 过期阈值  | 约 120s    | 长时间无心跳时按失活剔除；连接关闭等事件也可能提前清理            |
| 客户端路由刷新   | 约 30s     | 更新本地缓存，再按路由直连 Broker 收发                            |

多活节点单个故障时，Broker 继续向其他节点注册，客户端可切换访问其他已注册路由的节点。故障检测、扫描及客户端刷新是不同阶段，不能把 120s 当端到端恢复上限。

**4. 不用 ZooKeeper 是需求取舍，不是能力不足**

| 对比       | NameServer 路由服务                                    | ZooKeeper                                                  |
| :--------- | :----------------------------------------------------- | :--------------------------------------------------------- |
| 一致性目标 | 独立接收注册，容忍暂时不同，以周期更新收敛             | 写入经 Leader 与多数派协议提交，提供有序、一致的协调能力   |
| 故障条件   | 一个可达且有有效路由的节点即可提供查询，无节点间选举   | 选举及失去多数派会影响正常写入服务，不能仅靠任一节点继续写 |
| 成本       | 无路由日志复制与共识；部署维护简单，业务负责接受旧路由 | 提供持久化、会话、监听与协调能力，带来相应运维和协议成本   |
| 适用职责   | 可缓存、可重试的服务发现                               | 需要一致协调的元数据、选主、锁等                           |

因此 RocketMQ 的路由层偏 AP 取舍，不承担强一致选主。不能以“毫秒级 Broker 心跳”或“ZooKeeper 只能支持 100 个业务节点”解释选型，也不能脱离负载断言 NameServer 在所有场景性能更好。

#### 🔬 扩展知识

::: details

- 【L3】节点间路由一致依赖 Broker 分别注册，而非 NameServer 互相同步。网络恢复且注册、拉取成功后才能收敛；分区持续、节点重启或元数据更新延迟时，不一致窗口并不严格等于 30s，重启恢复也不是硬性的“最多 30s”。

- 【L3】所有 NameServer 不可用时，已有客户端可在缓存路由仍有效、Broker 可达的条件下继续收发；新客户端、未缓存的 Topic、路由变更及新 Broker 发现会受影响。旧路由可能造成多次失败或延迟，重试用尽仍会失败，
  不能承诺“最多重试一次且不丢”。

- 【L4】**路由最终一致与 Broker 数据复制是两层问题**

  NameServer 不决定哪份副本可切主，也不保证消息持久性；DLedger/Controller 等模式另行处理复制与选举。

  注册中心中 ZooKeeper/etcd 偏重一致协调，Eureka 等偏可用发现，Nacos 还需区分部署与实例模式，不能只贴一个 CAP 标签。

- 【L4】Kafka 从 ZooKeeper 演进到 KRaft 是减少外部依赖、改进元数据管理，不是放弃一致性；KRaft 本身仍以 Raft 管理元数据。不能把它当作“MQ 都应该使用 AP 注册中心”的证明。

:::

#### ⚠️ 常见误区

::: details

- ❌ "NameServer 无状态，所以任意新节点立即拥有全量路由" → 路由在内存中逐步注册形成，节点刚重启或注册不完整时可能缺失。
- ❌ "注册中心挂了立即全局瘫痪，心跳过期又能保证按时完全恢复" → 缓存可以延续部分服务，真正恢复取决于故障检测、路由刷新和 Broker 可用性。
- ❌ "NameServer 是 AP，因此负责 Broker 自动切主也无需一致性" → 路由发现不负责复制组的选主裁决，两层的一致性需求不同。

:::

#### 🔀 发散问题

**Q：已有 ZooKeeper，能直接替换 NameServer 吗？**
A：官方标准部署没有直接替换 NameServer 的开关，客户端与 Broker 使用专门的路由协议。单独部署轻量 NameServer 通常比自行维护适配更合适。

**Q：过期路由期间靠什么继续发送？**
A：客户端结合重试、故障规避及路由更新尝试可用 Broker，但不能突破超时预算或集群全部不可用的限制。见本文档『RocketMQ 的发送流程是什么？如何选择发送方式？』。

**Q：自动切主由谁负责？**
A：取决于部署模式，传统主从不自动切写主，DLedger 或 Controller 承担对应选举职责。见本文档『RocketMQ 如何部署集群并实现高可用？』。

### 【中等】RocketMQ 5.0 有哪些新特性？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 5.0 / 架构演进

#### 💎 关键结论

RocketMQ 5.0 从"消息队列"升级为"消息 + 事件 + 流"一体化数据平台，三大核心变化：Proxy 无状态接入层（gRPC 多语言）、Controller 自动切主、Pop 无状态消费。因为计算存储分离，所以能支撑 Serverless 弹性与云原生运维。

#### ⚡ 记忆卡片

- **口诀**：接入加 Proxy，切主靠 Controller，消费用 Pop，延迟任意定
- **关键词**：Proxy ／ gRPC ／ Controller ／ Pop 消费 ／ 任意延迟消息 ／ LMQ
- **链路**：客户端 gRPC 连 Proxy → Proxy 转发 Broker → Controller 基于 Raft 管理主从切换 → Pop 消费无队列绑定弹性伸缩

#### 📖 核心知识

RocketMQ 5.0 的定位从"消息队列"升级为 **"消息 + 事件 + 流"一体化的数据平台**，架构和能力都有重大变化。

**架构层面**

1. **Proxy 接入层**：新增无状态接入层（支持与 Broker 合并部署的 Local 模式，也支持独立部署的 Cluster 模式），统一多语言 gRPC 接入，为 Serverless 弹性打基础。
2. **Controller 模式**：Broker 支持基于 Controller（DLedger/Raft）的**主从自动切换**，解决了传统主从模式无法自动故障转移的痛点。
3. **轻量级消息队列（LMQ，Light Message Queue）**：支持百万级轻量队列，适配 MQTT/IoT 和海量 Topic 场景。

**功能层面**

1. **任意时刻延迟消息**：突破 4.x 固定 18 个延迟等级的限制，基于时间轮 + RocksDB 定时索引，支持秒级精度的定时消息。
2. **Pop 消费**：无状态消费模式，无需 Queue 再均衡，天然支持消费者弹性扩缩容和跨集群负载迁移。
3. **Serverless**：计算存储分离，按需伸缩、按量计费。
4. **EventBridge 事件网格**：对接 Eventing 生态，支持事件源与事件目标的桥接。

**升级影响**

- 5.0 客户端向下兼容 4.x Broker；任意延迟、Pop 消费等新特性需启用 Proxy。
- 迁移建议按 Broker → Proxy → 客户端的顺序升级，先在测试环境验证。

> **一句话总结**：RocketMQ 5.0 的核心是"Proxy 接入层 + Controller 高可用 + Pop 消费"，从消息中间件走向云原生事件平台。

#### 🔬 扩展知识

::: details

- 【L3】Pop 消费的本质

  把"队列归属实例"改为"请求级抢占"，每条（批）消息有不可见时间窗口，处理失败超时可被其他实例重新 Pop，因此不再需要 Rebalance，这是消费者能无状态弹性的根源。

- 【L3】延迟消息的版本差异与 4.x 实现机制

  4.x 只支持 **18 个固定延迟级别**（`1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h`），
  实现是把消息改投内部 Topic `SCHEDULE_TOPIC_XXXX`（每个级别对应一个队列），定时任务扫描到期后转投真实 Topic。**为什么只有固定级别**——定时扫描需要按到期时间先后处理，
  「同级别同队列」使每个队列内消息天然按到期时间有序，无需额外排序结构；任意精度定时则必须引入排序索引，5.x 用**时间轮定位 + RocksDB 存储定时索引**解决后才支持。若答案说"RocketMQ 支持任意延迟"而不区分版本，
  属事实错误。

- 5.0 客户端协议基于 gRPC + Protobuf，天然支持多语言与流式语义，4.x 的 Remoting 协议客户端仍可正常工作（向下兼容）。

- 【L4】5.0 的分级存储（Tiered Storage）方向

  冷数据可下沉到对象存储，突破本地磁盘容量对消息保留时长的限制，适配长周期回溯场景。

:::

#### 🔀 发散问题

**Q：4.x 集群升级到 5.0 会不会破坏主从架构？**
A：不会。Controller 模式兼容原生 CommitLog 格式，老集群可平滑升级，见本文档『RocketMQ 如何部署集群并实现高可用？』。

**Q：5.0 的任意延迟消息和 4.x 的 18 级延迟能共存吗？**
A：能。4.x 的 delayTimeLevel 语义保留，5.0 新增按时间戳的定时消息（需 5.0+ Broker），两者可并存使用。

## RocketMQ 可靠传输

### 【中等】RocketMQ 中如何配置并发消费和顺序消费？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 消费端 / 配置

#### 💎 关键结论

并发消费与顺序消费的区别只在注册的监听器：`MessageListenerConcurrently` 线程池并发处理吞吐高不保序，`MessageListenerOrderly` 对每个队列加锁单线程串行保序。两者的重试机制也不同：并发送重试 Topic，顺序原地挂起。

#### ⚡ 记忆卡片

- **口诀**：并发注册 Concurrently，顺序注册 Orderly
- **关键词**：MessageListenerConcurrently ／ MessageListenerOrderly ／ 重试 Topic ／ 原地挂起
- **链路**：注册并发监听器 → 线程池并发处理 → 失败进重试 Topic；注册顺序监听器 → 队列加锁单线程 → 失败暂停队列本地重试

#### 📖 核心知识

RocketMQ 中配置并发消费和顺序消费的主要区别在于**消费者注册的消息监听器**：

| 消费方式     | 监听器接口                    | 核心特性                                                           |
| :----------- | :---------------------------- | :----------------------------------------------------------------- |
| **并发消费** | `MessageListenerConcurrently` | 消费者内部使用线程池**并发处理**消息，最大化吞吐量，**不保证顺序** |
| **顺序消费** | `MessageListenerOrderly`      | 对**每个消息队列**加锁，**顺序地、单线程地**处理该队列中的消息     |

**对比**

| 特性维度       | **并发消费**                               | **顺序消费**                                                      |
| :------------- | :----------------------------------------- | :---------------------------------------------------------------- |
| **特点**       | **吞吐量高**，**延迟低**                   | **消息有序**，**吞吐量低**，**延迟高**                            |
| **监听器接口** | `MessageListenerConcurrently`              | `MessageListenerOrderly`                                          |
| **处理方式**   | 使用线程池**并发处理**消息                 | 对**每个消息队列 (Queue) 加锁**，单线程顺序处理                   |
| **消息顺序**   | **不保证**顺序性                           | 保证**单个 Queue 内**的消息顺序                                   |
| **重试机制**   | 失败消息发送到**重试主题**，延迟后再次消费 | **暂停当前 Queue**，在本地进行重试，不进入重试主题                |
| **适用场景**   | 日志处理、通知短信等**无顺序要求**的场景   | 订单状态流转、库存扣减等**有严格顺序要求**的场景                  |
| **前提条件**   | 无                                         | **生产者**必须将同一组消息（如相同订单 ID）发送到**同一个 Queue** |

::: tabs#并发消费和顺序消费示例

@tab 并发消费配置

这是**默认**和**最常用**的方式。

```java
// 1. 创建消费者实例（集群模式示例）
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("YourConsumerGroupName");
consumer.setNamesrvAddr("localhost:9876"); // 设置 NameServer 地址

// 2. 订阅主题和 Tag
consumer.subscribe("YourTopic", "*"); // 订阅所有 Tag 的消息

// 3. 【关键配置】注册并发消息监听器
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
            List<MessageExt> msgs, // 消息列表，默认一次拉取一条
            ConsumeConcurrentlyContext context) {

        // 业务处理逻辑
        for (MessageExt msg : msgs) {
            try {
                String messageBody = new String(msg.getBody(), StandardCharsets.UTF_8);
                System.out.println("收到消息：" + messageBody);
                // 模拟业务处理...
            } catch (Exception e) {
                // 处理失败，稍后重试（重试次数小于 16 次）
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        // 处理成功
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
});

// 4. 启动消费者
consumer.start();
```

@tab 顺序消费配置

适用于需要严格保证处理顺序的场景。

```java
// 1. 创建消费者实例
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("YourOrderlyConsumerGroup");
consumer.setNamesrvAddr("localhost:9876");

// 2. 订阅主题和 Tag
consumer.subscribe("OrderTopic", "CreateOrder || PayOrder");

// 3. 【关键配置】注册顺序消息监听器
consumer.registerMessageListener(new MessageListenerOrderly() {
    @Override
    public ConsumeOrderlyStatus consumeMessage(
            List<MessageExt> msgs,
            ConsumeOrderlyContext context) {
        // 设置自动提交偏移量（推荐）
        context.setAutoCommit(true);

        for (MessageExt msg : msgs) {
            // 【关键】对于顺序消息，通常需要根据某个关键标识（如订单 ID）将消息路由到同一个 Queue。
            // 这里假设消息的 keys 就是订单 ID
            String orderId = msg.getKeys();

            try {
                String messageBody = new String(msg.getBody(), StandardCharsets.UTF_8);
                System.out.println("订单 ID: " + orderId + ", 处理消息：" + messageBody);
                // 处理业务逻辑...

            } catch (Exception e) {
                // *** 顺序消费的重试机制很特殊 ***
                // 处理失败返回 SUSPEND_CURRENT_QUEUE_A_MOMENT：暂停当前队列、原地延迟重试，
                // 不投递到重试主题，后续消息被阻塞。
                // 注意：顺序消费的 maxReconsumeTimes 默认为 Integer.MAX_VALUE，即默认无限本地重试、
                // 队列一直阻塞；只有显式设置了最大重试次数，超限后才会发回 Broker 进入死信队列。
                // 生产上必须设置最大重试次数并接入告警与人工干预。
                System.err.println("处理失败，进行顺序重试：" + msg.getMsgId());
                return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
            }
        }
        // 处理成功，继续处理下一条
        return ConsumeOrderlyStatus.SUCCESS;
    }
});

// 4. 启动消费者
consumer.start();
```

:::

#### 🔬 扩展知识

::: details

- 【L3】**顺序消费的锁机制**

  `MessageListenerOrderly` 的保序依赖两层锁——① **Broker 端分布式队列锁**：

  Rebalance 后消费者向 Broker 申请锁定分到的 MessageQueue（`lockBatchMQ`），确保同一队列同一时刻只被一个实例消费，客户端默认约 **20s** 续期一次，
  Broker 端锁最长存活约 **30s**（`rebalanceLockMaxLiveTime`）；② **消费者本地锁**：实例内对每个 MessageQueue 加对象锁，保证单线程串行消费。

  网络抖动或 Broker 主从切换导致续期失败时，锁过期可能被其他实例抢走，出现短暂的**顺序性破坏窗口**——这是「加了锁也不等于绝对有序」的原因。

- 【L3】**全局顺序 vs 分区顺序**

  全局顺序要求 Topic 只有 1 个 MessageQueue，完全失去并行度与扩展性，仅适合极低吞吐场景；生产上几乎都用**分区顺序**——
  发送端通过 `MessageQueueSelector` 按业务 key（如订单 ID）哈希选队列，保证同一业务实体的消息进入同一队列，队列内有序即可。

- 【L3】**顺序消费失败阻塞是固有风险**

  并发消费失败进重试 Topic 不阻塞别人，顺序消费失败原地重试会**阻塞整个队列**，一条毒消息可造成该队列全量积压。

  必须显式设置 `maxReconsumeTimes`（超限发回 Broker 进 `%DLQ%`）+ 积压告警 + 毒消息旁路预案，不能依赖默认的无限重试。

:::

#### 🔀 发散问题

**Q：同一消费组能一部分实例用并发、一部分用顺序吗？**
A：不能。同一消费组内监听器类型必须一致，否则消费行为未定义；需要两种方式时应拆分消费组。

**Q：顺序消费的完整保序条件有哪些？**
A：生产端同键同队列 + 同步发送、消费端 Orderly 监听器、队列数固定，见《MQ面试》『如何保证 MQ 消息的顺序性？』。

## RocketMQ 架构

### 【简单】RocketMQ 如何实现消息过滤？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 消息过滤

#### 💎 关键结论

RocketMQ 有 Tag 和 SQL92 两种过滤方式：Tag 过滤在 Broker 端按哈希码粗筛、Consumer 端再精确比对（哈希会冲突），简单高效；SQL92 在 Broker 端对属性求值（需开启 `enablePropertyFilter`），灵活但耗 Broker CPU。绝大多数场景优先用 Tag，只有多属性复杂条件才用 SQL92。

#### ⚡ 记忆卡片

- **口诀**：简单用 Tag，复杂用 SQL，过滤在 Broker
- **关键词**：Tag ／ SQL92 ／ Broker 端过滤 ／ 订阅表达式
- **链路**：生产者打标签或设属性 → 消费者订阅时声明过滤条件 → Broker 拉取时即过滤 → 只投递匹配消息

#### 📖 核心知识

| 方式           | 实现原理                                                        | 特点                                                     | 适用场景                                                       |
| :------------- | :-------------------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------- |
| **Tag 过滤**   | 生产者给消息打上**标签**，消费者按**标签匹配**订阅。            | **简单高效**，但信息量有限，灵活性低。                   | 简单的消息分类，如按业务类型（"ORDER"、"PAYMENT"）过滤。       |
| **SQL92 过滤** | 生产者给消息设置**自定义属性**，消费者使用 **SQL 表达式**订阅。 | **灵活强大**，支持复杂规则，但**消耗更多 Broker 资源**。 | 需要复杂业务逻辑过滤，如 `amount > 100 AND type = 'PAYMENT'`。 |

**执行位置**：Tag 过滤是**两级过滤**——Broker 端按 ConsumeQueue 条目里预存的 **Tag 哈希码**粗筛（避免每条消息回读 CommitLog 正文），命中的消息投递给消费者后，**Consumer 端再做一次 Tag 字符串精确比对**。原因：ConsumeQueue 只存哈希码，**不同 Tag 字符串可能哈希冲突**，Broker 无法在索引层区分，必须靠消费端二次过滤兜底——这就是「为什么 Broker 过滤后 Consumer 还要再过滤一次」的答案。SQL92 过滤需 Broker 开启 `enablePropertyFilter=true`，表达式在 **Broker 端**对消息属性求值，灵活但代价是 Broker CPU。

**选择建议**

- 绝大多数场景下，优先使用 **Tag 过滤**，因其性能开销最小。
- **Tag 的局限**：一条消息只能有一个 Tag，无法多维度过滤；需要按多个属性组合筛选时用 SQL92，或按维度拆分 Topic。
- 只有当过滤逻辑需要基于消息内容或多个属性进行复杂判断时，才使用 **SQL92 过滤**。

#### 🔀 发散问题

**Q：为什么过滤要在 Broker 端而不是客户端做？**
A：客户端过滤会把大量无关消息拉过来浪费带宽与反序列化开销；Broker 端过滤利用 ConsumeQueue 中预存的 Tag 哈希码快速预筛，代价最小。

**Q：Tag 过滤是怎么快速匹配的？**
A：ConsumeQueue 条目中预存了 Tag 哈希码，Broker 用哈希码粗筛、免去逐条回读 CommitLog 正文；但哈希会冲突，精确的 Tag 字符串比对由 Consumer 端完成，Broker 不做原文匹配。

### 【中等】RocketMQ 的消息轨迹如何启用？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 可观测性

#### 💎 关键结论

消息轨迹把消息的生产、存储、消费全链路事件以消息形式写入内部 Trace Topic，实现端到端追踪。启用只需 Broker 开启配置 + 客户端 `setUseTracing(true)`，是排查丢消息/重复/消费慢的第一工具。

#### ⚡ 记忆卡片

- **口诀**：Broker 开开关，客户端开 tracing，控制台看轨迹
- **关键词**：traceTopicEnable ／ setUseTracing ／ RMQ_SYS_TRACE_TOPIC ／ 消息轨迹
- **链路**：Broker 配 traceTopicEnable=true → Producer/Consumer 设 setUseTracing(true) → 轨迹数据写入 RMQ_SYS_TRACE_TOPIC → 控制台按 msgId/Key 查轨迹图

#### 📖 核心知识

- **作用**：跟踪消息的完整生命周期（生产、存储、消费）。
- **实现方式**：轨迹数据本身作为消息存储在内部 Topic（默认 `RMQ_SYS_TRACE_TOPIC`）。

**启用步骤**

**Broker 端**

- **修改配置**：在 `broker.conf` 中添加 `traceTopicEnable=true`。
- **重启生效**：修改后必须重启 Broker。

**生产者端**

```java
DefaultMQProducer producer = new DefaultMQProducer("group_name");
// 关键配置：启用轨迹
producer.setUseTracing(true);
// producer.setTraceTopic("Your_Trace_Topic"); // 可选：自定义轨迹 Topic
```

**消费者端**

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("group_name");
// 关键配置：启用轨迹
consumer.setUseTracing(true);
```

**验证方法**

1. **查看轨迹 Topic**：在控制台确认 `RMQ_SYS_TRACE_TOPIC` 存在。
2. **查询具体消息**：在控制台 Message 页面输入 Message ID/Key 搜索，点击 **Trace** 按钮查看详细轨迹图。

**注意事项**

- **性能开销**：会带来额外的 CPU/网络消耗和存储占用。
- **存储成本**：轨迹数据占用磁盘空间，需监控清理。
- **生产建议**：推荐开启，便于问题排查（消息丢失、重复、消费慢等）。

#### 🔀 发散问题

**Q：轨迹数据本身会丢吗？**
A：轨迹也是普通消息，走异步发送与正常存储，极端情况下可能丢；因此轨迹是排查工具而非审计凭证，关键业务仍需对账。

## RocketMQ 事务

### 【困难】RocketMQ 事务消息如何工作？回查接口如何设计？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：RocketMQ / 事务消息 / 回查 / 最终一致性

#### 💎 关键结论

先发半消息，再执行本地事务；提交或回滚依据持久化最终态，确认丢失由 Broker 回查。暂时查不到或查询异常应返回未知，不能猜结果；回查有上限，仍需对账，消费端也要幂等。

#### ⚡ 记忆卡片

- **口诀**：半消息先行，终态同事务；不明等回查，超限靠对账
- **关键词**：半消息 ／ Op Topic ／ 同库同事务 ／ 业务唯一键 ／ UNKNOW ／ 回查上限
- **链路**：半消息确认 → 业务与终态同事务提交 → Commit 重写原 Topic 或 Rollback → 二次确认缺失时回查共享存储 → 未知继续等待 → 超限异常处置与对账

#### 📖 核心知识

**1. 半消息把“是否投递”的决定延后到本地事务之后**

RocketMQ 自 4.3 起提供这类事务消息，用于协调**消息生产与本地业务事务的最终一致性**，不是覆盖所有下游操作的分布式原子事务。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/09/ee5fa22853b045119e12f9a96d41aec7.png)

- Producer 先发送半消息；Broker 按存储确认条件接收成功后返回确认，此时原 Topic 的消费者不可见。
- 半消息发送成功后才执行本地事务，并与业务变更一起持久化可回查的最终状态。
- 本地事务明确提交则二次确认 Commit，明确终止则 Rollback；状态不确定返回 Unknown。半消息发送前先提交业务，会重新引入“业务成功而消息未发送”的窗口。
- 二次确认因网络、宕机、重启等丢失，或状态为 Unknown 时，Broker 后续向**同一 Producer Group 的可用实例**回查；实例根据持久化结果再次决定 Commit/Rollback，仍不确定则等待。

**2. 半消息、提交重写与 Op 标记都在消息存储体系内**

经典 Broker 实现会保留真实 Topic/Queue 属性，把半消息路由改为 `RMQ_SYS_TRANS_HALF_TOPIC`，仍写入 **CommitLog**，并非使用一套脱离 CommitLog 的独立事务数据库。

Commit 时恢复真实 Topic/Queue，**重新写一份业务消息**，产生新 Offset，并在 `RMQ_SYS_TRANS_OP_HALF_TOPIC` 记录该半消息已处理；不是移动文件或原地修改可见性。Rollback 同样通过 Op 记录使半消息不再投递，它不会替业务数据库执行回滚，也不等于立即物理删除半消息。

**3. 回查扫描间隔不等于事务超时**

以经典 4.x Broker 实现为例，5.x 与托管服务应核对对应版本限制：

| 参数/机制                  | 常见默认值 | 含义                                                                         |
| :------------------------- | :--------- | :--------------------------------------------------------------------------- |
| `transactionCheckInterval` | 60s        | `TransactionalMessageCheckService` 的扫描周期，不是每条消息固定在 60s 后回查 |
| `transactionTimeout`       | 6s         | 半消息进入可回查判断的事务超时阈值，还受消息检查保护时间等条件影响           |
| `transactionCheckMax`      | 15 次      | 回查次数限制，不代表无限保留或永久重试                                       |

实际回查受扫描进度、消息年龄、保护时间、负载及 Producer 可用性影响，不能承诺延迟最多 60s。超过次数或保留期限会进入**丢弃/异常处理路径**，默认不会继续正常投递；它不证明本地业务已经回滚，也不一定存在一条可当作业务 Rollback 凭证的 Op 记录。必须采集相关日志/指标、告警并对账。

**4. 回查接口只读持久化事实，不猜、不重新执行业务**

| 原则       | 设计要求                                                                                                                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| 业务唯一键 | 消息 Keys 或属性携带稳定的订单/事务业务键；同一订单多次业务事件要能区分，不能把每次重发生成的消息 ID 当唯一业务标识               |
| 同库同事务 | 业务变更与成功状态一起提交；明确业务拒绝可记录不可逆的终止状态；状态写入失败必须使同一事务回滚                                    |
| 跨实例共享 | 同组实例查询同一可信数据库/事务流水，不查实例本地缓存，不把延迟副本的“查不到”当回滚                                               |
| 精确返回   | 已持久化成功返回 `COMMIT_MESSAGE`，已持久化终止返回 `ROLLBACK_MESSAGE`；未完成、暂时查不到、提交结果不确定或查询异常返回 `UNKNOW` |
| 幂等与快速 | 回查可以重复，只做有索引的短查询，设查询超时、限流与监控，不重跑支付、下单等有副作用操作                                          |

::: details TransactionListener 与同事务状态持久化示例

以下为经典 Java API 的最小业务骨架，`UNKNOW` 是该 API 的实际枚举拼写。`orders` 与 `states` 使用同一数据源和事务管理器；状态表对 `orderId` 有唯一约束，终态不可覆盖，订单写入也按业务键幂等。示例只创建订单，不包含外部支付等无法由本地数据库回滚的操作。

示例假设回调没有外层数据库事务，`tx` 独立开启并完成本地事务；不能加入尚未提交的外层事务后就向 Broker 返回 Commit。消息业务键应在发送半消息前完成校验。

```java
public class OrderTransactionListener implements TransactionListener {
    enum TxState { COMMITTED, ABORTED }

    private final TransactionTemplate tx;
    private final OrderRepository orders;
    private final TxStateRepository states;

    public OrderTransactionListener(TransactionTemplate tx,
            OrderRepository orders, TxStateRepository states) {
        this.tx = tx;
        this.orders = orders;
        this.states = states;
    }

    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        String orderId = msg.getKeys(); // 此示例中一次订单创建对应唯一业务事件
        try {
            TxState result = tx.execute(status -> {
                TxState existing = states.findFinalOnPrimary(orderId);
                if (existing != null) {
                    return existing; // 不重做已成功或已终止的业务
                }
                if (orders.isBusinessRejected(orderId)) {
                    // 明确业务拒绝：不创建订单，在事务内落终止状态
                    states.insert(orderId, TxState.ABORTED);
                    return TxState.ABORTED;
                }
                orders.create(orderId);
                states.insert(orderId, TxState.COMMITTED);
                // 任一步失败抛异常，订单和状态必须一起回滚
                return TxState.COMMITTED;
            });
            // TransactionTemplate 正常返回时，数据库事务已完成提交
            return toMqState(result);
        } catch (Exception e) {
            // 包含提交结果不确定、并发唯一键冲突等，交由后续查库判定
            return LocalTransactionState.UNKNOW;
        }
    }

    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        try {
            return toMqState(states.findFinalOnPrimary(msg.getKeys()));
        } catch (Exception e) {
            // 生产实现应记录业务键并监控异常；查询失败不能猜 COMMIT/ROLLBACK
            return LocalTransactionState.UNKNOW;
        }
    }

    private LocalTransactionState toMqState(TxState state) {
        if (state == TxState.COMMITTED) {
            return LocalTransactionState.COMMIT_MESSAGE;
        }
        if (state == TxState.ABORTED) {
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
        return LocalTransactionState.UNKNOW; // 暂未查到，不代表失败终态
    }
}
```

事务异常导致订单和状态均回滚时，查不到记录依然返回未知；后续业务恢复流程需确认不再允许该业务提交，持久化终止状态后才能返回 Rollback。超时本身不是回滚证据：终止与迟到执行必须通过唯一键、锁或状态条件更新互斥，不能一边宣告终止、一边允许旧事务继续提交。事务状态保留期应覆盖回查及业务恢复窗口。

:::

**5. 从待提交到清理，消费仍有自己的确认语义**

![事务消息](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/cd8991ae5f4a4bfcb059a80f8f9526c7.png)

生命周期是：初始化 → 半消息待提交 → 明确 Rollback 后不投递，或 Commit 后进入原 Topic 待消费 → 消费中 → 消费完成 → 按保留期/磁盘清理策略滚动删除。传统 Pull 消费保存位点，Pop 消费使用 ACK 与不可见窗口，不能把“未响应超时重投”套到所有 SDK；消费成功也不立即删除物理消息，在保留期内仍可回溯重消费。

#### 🔬 扩展知识

::: details

- 【L3】**写放大与可观测性**：成功事务通常至少写半消息、正式消息两份正文，再加 Op 记录；约两倍正文写入只是基线，反复回查重写等会进一步放大存储与 IO。容量规划计入半消息存储，监控待决积压、消息年龄、回查量、
  Unknown 比例、丢弃日志及查询耗时；Op 的“已处理”标记本身不能直接区分业务成功和业务回滚。

- 【L3】**回查风暴**：粗略稳态估算为待查量 ÷ 扫描周期，实际可能成批突发，不能视作硬性 QPS 公式。慢查询会占用 Producer 回查线程/连接池并增加 Broker 未决积压；应以业务键索引、查询超时、回查并发控制、
  限流及异常告警保护数据库，必要时临时调大扫描间隔，同时权衡更长的一致性延迟和消息保留限制。

- 【L4】**本地消息表与事务消息的选型**：

  | 维度         | 本地消息表（Outbox）                      | RocketMQ 事务消息                             |
  | :----------- | :---------------------------------------- | :-------------------------------------------- |
  | 核心机制     | 业务与待发记录同一 DB 事务，任务/CDC 发送 | 半消息、二次确认与 Broker 回查                |
  | 应用工作     | 写消息表、维护发送重试与清理              | 实现本地事务监听器、持久化状态与回查          |
  | 复杂度落点   | 发送调度主要由应用维护                    | Broker 接管未决消息管理，业务仍承担状态与对账 |
  | 性能代价     | DB 额外写入及扫表/CDC 开销                | 半消息写放大、状态写入及回查查询，不天然更快  |
  | 耦合与通用性 | 依赖数据库事务，但可适配不同 MQ           | 依赖 RocketMQ 的事务接口与语义                |

  多 MQ、追求通用性可选本地消息表；已采用 RocketMQ、希望少维护发送调度可选事务消息。后者不是“业务完全解耦”，回查正确性仍是业务职责。

- 【L4】**跨 MQ 事务与同步双写窗口**：

| MQ       | 事务能力边界                                                                                                         |
| :------- | :------------------------------------------------------------------------------------------------------------------- |
| RocketMQ | 回查本地业务最终态，决定半消息是否投递                                                                               |
| Kafka    | 事务性多分区写入、消费位点原子提交，服务 Kafka 链路的 exactly-once；不自动纳入外部业务数据库，也不是简单“失败抛异常” |
| RabbitMQ | 事务/发布确认处理 Broker 内发送结果，不提供 RocketMQ 式本地事务回查                                                  |
| Pulsar   | 支持事务性发布与确认，但不等同于回查业务数据库的半消息模式                                                           |

其他 MQ 可结合本地消息表等协调业务，**仅 publisher confirm + 重试不等价于数据库与消息原子绑定**。同步双写（业务事务提交前同步发送，发送失败则业务回滚）实现简单却耦合可用性，而且消息已发成功、
随后 DB 提交失败时无法撤回消息；反过来先提交 DB 再发，也有漏发窗口。

- 【L4】**一致性边界**：这是有前提的生产侧最终一致方案，不是 XA/2PC，也不自动回滚下游。错误的回查、存储故障、回查耗尽或保留期限都可能导致漏发/误发；消费端仍须重试、死信治理与幂等，关键业务靠对账收敛，不能许诺永久可靠投递。

> 📚 延伸阅读：[RocketMQ 官方参数限制说明](https://rocketmq.apache.org/zh/docs/introduction/03limits)

:::

#### 🏭 实战场景

::: details

以下均为**故障推演**，数字用于容量与处置分析，不代表真实生产统计。

**回查风暴：状态记录写入遗漏**

- 假设发布缺陷漏写事务状态，积压 **12 万条**待查半消息，按 60s 扫描周期粗估约 **2000 次/秒**查询；若每条尝试 15 次，累计可能达到 **180 万次**查询，突发峰值还可能更高。

- 回查查不到时返回 Unknown 是正确保守行为，根因是状态持久化缺失；不能靠“查不到就 Commit/Rollback”掩盖。扫描压力又使业务事务变慢，会形成恶性循环。

- 应暂停问题版本的新事务、修复同库同事务写入，依据权威业务流水恢复缺失终态；同时限流、监控数据库，必要时调整扫描周期。无法确认的记录进入对账，不能因超时武断地构造最终态。

**支付已成功，积分仍未到账**

- 假设 **100 笔支付**有持久化成功流水，但二次确认丢失，回查又误用消息 ID 而非支付业务键，返回 Unknown；此时资金已支付与消息待决并不矛盾，问题是状态查询链路错误。

- 核对半消息业务键、权威支付流水与回查所连数据库，排查状态与业务分开写入、查错键、不同实例使用不同库/缓存等原因。在回查耗尽前修复查询，让**真实持久化成功态**返回 Commit；已丢弃的消息通过受控补发及积分对账恢复，
  补发沿用业务键防重。

- 若状态表缺记录，先依据可靠流水核验并修复状态，不能只因“下游支持幂等”就强行 Commit；幂等只能防重复，不能纠正一次错误的支付成功事件。

**滚动发布：本地缓存不能跨实例回查**

- 假设 **3 个 Producer 实例**滚动发布，旧实例被终止导致 **30 笔**已提交业务的二次确认丢失；新实例只查本地缓存，持续 Unknown 直至半消息被丢弃，可能到 **T+1 对账**才发现下游清结算缺记录。

- 修复为读取共享数据库事务流水，接入回查异常/丢弃告警并持久化待处置清单，按业务键补偿、对账。发布采用优雅停机：先停新事务、等存量本地事务与确认处理完成再下线，但仍需共享状态应对异常退出。

:::

#### ⚠️ 常见误区

::: details

- ❌ "半消息提交就是移动到正式 Topic" → Commit 是恢复真实路由后重写消息并记录 Op，产生额外写入，不是移动。
- ❌ "60s 是事务超时，也是回查最长延迟" → 扫描间隔与事务超时是不同参数，实际回查还有保护时间、扫描积压与可用性约束。
- ❌ "查不到默认 Rollback，查询异常就 Commit 保底" → 两者都缺乏持久化终态证据，应返回 `UNKNOW` 等待恢复并告警，不能猜结果。
- ❌ "下游幂等，所以未知状态也可以随意 Commit" → 幂等只防重复执行，不能把本地已回滚的业务事件变成正确事件。
- ❌ "超过 15 次就是业务已回滚，消息以后还会可靠送达" → 这是消息丢弃/异常处置边界，不是业务回滚证明，也没有永久投递承诺，必须对账补偿。
- ❌ "事务消息保证全链路恰好一次，Kafka 事务可直接替换" → 两类事务边界不同，外部 DB 与消费副作用均需专门协调，消费幂等不可省略。

:::

#### 🔀 发散问题

**Q：Unknown 能一直返回吗？**
A：状态确实未知时应返回，但 Broker 回查有次数和保留期限限制。要监控待决年龄，在耗尽前恢复可信状态；耗尽后靠异常处置与业务对账，不能把 Unknown 当永久队列。

**Q：超过业务最大耗时就能判 Rollback 吗？**
A：仅超时不能证明旧事务不会迟到提交，需业务恢复流程持久化终止决定，并用唯一键或并发控制阻止后续成功。回查只读取这个最终态，不在查询回调里猜测或重新执行业务。

**Q：消费者最终失败怎么办？**
A：事务 Commit 只使消息进入正常投递链路，不保证下游副作用完成。消费端仍需重试、幂等与死信治理，见《MQ面试》『什么是死信队列？各 MQ 如何实现死信处理机制？』。

## RocketMQ 优化

### 【中等】RocketMQ 如何优化性能？有哪些调优策略？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 性能调优

#### 💎 关键结论

RocketMQ 调优分四层：生产者批量异步降网络开销，Broker 刷盘/线程/内存参数挖吞吐，消费者提并发与批量，操作系统层 SSD 与内核参数兑底。原则是先压测定瓶颈再调参，避免盲目修改默认值。

#### ⚡ 记忆卡片

- **口诀**：生产批量异步，Broker 异步刷盘，消费加线程，系统上 SSD
- **关键词**：MessageBatch ／ ASYNC_FLUSH ／ consumeThreadMax ／ SSD ／ Page Cache
- **链路**：压测定位瓶颈 → 生产端批量/异步降 RT → Broker 刷盘与线程池调优 → 消费端提并发批量 → OS 层磁盘与内核参数兑底

#### 📖 核心知识

RocketMQ 性能优化可从**生产者、Broker、消费者、操作系统**四个层面入手。

**生产者优化**

- **批量发送**：使用 `MessageBatch` 合并多条消息，减少网络往返。
- **异步发送**：非关键链路使用异步发送 + 回调，提升吞吐。
- **合理设置 `sendMsgTimeout`**：默认 3s，高延迟网络需调大。
- **压缩**：对大消息启用压缩（`Message.setBody` 前压缩）。

**Broker 优化**

| 优化项                | 参数/方法                            | 说明                                                                                  |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| **刷盘策略**          | `flushDiskType=ASYNC_FLUSH`          | 异步刷盘，吞吐高（有丢消息风险）                                                      |
| **内存映射**          | `transientStorePoolEnable=true`      | 启用堆外内存池，减少 GC                                                               |
| **ConsumeQueue 刷盘** | `flushConsumeQueueConcurrently=true` | ConsumeQueue 并发刷盘                                                                 |
| **消息索引**          | `maxIndexNum=20000000`               | 增大索引文件容量                                                                      |
| **线程数**            | `sendMessageThreadPoolNums`          | 根据 CPU 核数调整发送线程池                                                           |
| **预分配映射文件**    | `mappedFileSizeCommitLog=1G`         | 单个 CommitLog 文件大小，默认即 1GB；调大会拉长故障恢复时的日志扫描时间，不宜盲目增大 |

**消费者优化**

- **提高并发度**：`consumeThreadMin` / `consumeThreadMax` 调整消费线程数。
- **批量消费**：`pullBatchSize` 控制单次拉取消息数。
- **并发消费**：无顺序要求时使用 `MessageListenerConcurrently`。
- **异步处理**：将耗时操作（如 IO）异步化，避免阻塞消费线程。

**操作系统优化**

- **磁盘**：使用高性能 SSD，RAID 10。
- **文件系统**：ext4 或 xfs，挂载选项 `noatime`。
- **内核参数**：`vm.swappiness=1`（减少 swap）、`vm.max_map_count`（增大映射文件数）。
- **JVM**：堆内存不宜过大（4-8G），使用 G1 GC，增大堆外内存。

#### 🔀 发散问题

**Q：调优的第一步应该做什么？**
A：先压测定位瓶颈（CPU/IO/网络/线程池）再调参；没有基线数据的调优是盲调，可能引入可靠性风险（如异步刷盘）。

**Q：哪些优化会以可靠性为代价？**
A：异步刷盘、transientStorePoolEnable、单向发送都是以丢消息窗口换吞吐，核心链路慎用，见《MQ面试》『如何保证 MQ 消息不丢失？』。

## 参考资料

- [面试鸭 - RocketMQ 面试](https://www.mianshiya.com/bank/1850081899830079490)
