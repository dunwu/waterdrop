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

### 【简单】RocketMQ 是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 基础概念

#### 💎 关键结论

RocketMQ 是源于阿里巴巴、后捐赠给 Apache 成为顶级项目的开源分布式消息中间件，由 NameServer、Broker、Producer、Consumer 四大组件组成，原生支持事务消息、顺序消息、延迟消息等金融级特性。因为它诞生于阿里交易场景，相比 Kafka 更强调可靠性和业务消息能力。

#### ⚡记忆卡片

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

- **提交日志（CommitLog）**：所有 Topic 的消息都**顺序追加**到这一个文件中。这是实现高吞吐写入的关键。
- **消费队列（ConsumeQueue）**：作为 CommitLog 的**索引文件**。每个 Queue 对应一个，记录消息在 CommitLog 中的位置，实现高效的读取。
- **索引文件（IndexFile）**：提供按 **Message Key** 或时间范围查询消息的能力。

#### 🔬 扩展知识

【L3】RocketMQ 与 Kafka 的定位差异：RocketMQ 面向金融级业务消息（事务消息、延迟消息、消息轨迹、死信队列均内置），Kafka 面向大数据高吞吐管道场景。

::: details

- RocketMQ 所有消息写入同一 CommitLog，万级 Topic 下仍能保持顺序写；Kafka 每个 Partition 独立日志，Partition 过多时写退化为随机 IO。
- RocketMQ 5.0 起定位从"消息队列"升级为"消息 + 事件 + 流"一体化数据平台。

:::

【L4】RocketMQ 的技术血统：早期版本借鉴 Kafka 的日志存储思想（顺序写 + Page Cache），但为支持事务消息、按 Key 查询等电商需求，自研了 ConsumeQueue/IndexFile 二级索引体系。

#### 🔀 发散问题

**Q：RocketMQ 的四大组件如何协作？**
A：见本文档『RocketMQ 有哪些核心组件？』。一句话：Broker 向 NameServer 注册路由，Producer/Consumer 通过路由发现 Broker 并直连收发。

**Q：RocketMQ 的存储为什么能支撑海量消息堆积？**
A：见《MQ面试》『Kafka、RocketMQ、RabbitMQ 如何存储数据与持久化？』。核心是单 CommitLog 顺序写 + 异步构建 ConsumeQueue/IndexFile 多索引，写入性能不受 Topic 数量影响。

### 【简单】RocketMQ 有哪些核心组件？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 架构组件

#### 💎 关键结论

RocketMQ 由 NameServer（路由中心）、Broker（存储与中转核心）、Producer、Consumer 四个组件组成，四者通过"注册-发现"机制解耦。因为 NameServer 无状态、Broker 独立存储，整个架构可以水平扩展。

#### ⚡记忆卡片

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
A：见本文档『为什么 RocketMQ 不用 ZooKeeper，而是自己开发 NameServer？』。路由发现是 AP 场景，NameServer 无状态、节点互不通信，比 CP 的 ZooKeeper 更轻量可用。

**Q：NameServer 挂了消息还能收发吗？**
A：短时间内可以。客户端本地缓存了路由信息，NameServer 全部宕机只影响路由更新和新 Broker 注册，已建立的连接仍可继续收发。

## RocketMQ 存储

### 【困难】RocketMQ 如何实现内存映射机制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 存储设计 / mmap

#### 💎 关键结论

RocketMQ 用 `MappedByteBuffer`（mmap）把 CommitLog 文件直接映射到进程虚拟内存，写入本质是写 Page Cache、读取如同访问数组，从而实现高吞吐低延迟。因为绕过了用户态缓冲区和频繁系统调用，mmap 是 RocketMQ 存储性能的核心基石。

#### ⚡记忆卡片

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

【L3】RocketMQ 在 Broker 启动时会对 CommitLog 做预热（`warmMapedFileEnable`）：提前分配并逐页写入 0 值触发缺页中断，避免运行期首次写入某个映射文件时出现延迟毛刺。

::: details

- 对比传统 `read/write` 系统调用：mmap 省去用户态缓冲拷贝，写路径只剩一次内存拷贝；配合 `mlock` 可防止映射页被换出。

:::

【L4】mmap 的释放依赖 `unmap`（Java 需反射调用 `Cleaner`），因此 RocketMQ 按 1G 固定大小滚动文件并延迟释放旧映射；`vm.max_map_count` 内核参数不足会导致映射失败，是部署时常见坑。

#### 🔀 发散问题

**Q：mmap 模式下为什么异步刷盘可能丢消息？**
A：写入只到达 Page Cache 就返回成功，若整机断电，未刷盘的缓存数据丢失。丢失量约等于刷盘间隔内的写入量，见《MQ面试》『如何保证 MQ 消息不丢失？』。

**Q：Kafka 和 RocketMQ 都用了零拷贝，用法一样吗？**
A：思路相同但侧重不同：RocketMQ 写路径重度依赖 mmap；Kafka 读路径更多用 `sendfile` 直接从 Page Cache 到网卡。两者都靠 Page Cache 抹平磁盘速度。

## RocketMQ 生产消费

### 【中等】RocketMQ 如何发送消息？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 生产端

#### 💎 关键结论

消息发送分三阶段：先从 NameServer 拉取并缓存路由，再按负载均衡策略选队列发给目标 Broker，失败时自动重试并规避故障 Broker。因为路由本地缓存 + 重试故障转移的组合，发送链路天然具备高可用能力。

#### ⚡记忆卡片

- **口诀**：拉路由、选队列、发消息、败重试、避故障
- **关键词**：路由发现 ／ 队列选择 ／ 同步发送 ／ 失败重试 ／ 故障规避
- **链路**：Producer 连 NameServer 拉路由并缓存 → 轮询选 MessageQueue → 发送到队列所在 Master Broker → 失败自动重试（默认 2 次）并避开上次失败的 Broker → 持续失败则刷新路由

#### 📖 核心知识

发送主链路：**Producer（发送方）→ NameServer（路由中心）→ Broker（存储方）**。

**准备阶段（启动与路由发现）**

- Producer 启动，连接 NameServer。
- 从 NameServer 拉取 Topic 的**路由信息**（Topic 分布在哪些 Broker、每个 Broker 上有哪些 MessageQueue），并缓存在本地。

**发送阶段（路由选择与发送）**

- **选择队列**：根据负载均衡策略（如轮询）为消息选择一个具体的 MessageQueue。
- **发送消息**：根据路由信息，找到队列所在的主 Broker，将消息发送出去。
- **Broker 处理**：Broker 接收消息，写入存储文件后，向 Producer 返回发送结果。

**容错阶段（失败重试）**

- **自动重试**：若发送失败（如网络问题），Producer 会自动重试（默认 2 次）。
- **故障规避**：重试时会**自动避开上次失败的 Broker**，选择其他队列，保证高可用。
- **路由更新**：若持续失败，会重新从 NameServer 拉取最新路由信息。

#### 🔬 扩展知识

【L3】故障规避由 `sendLatencyFaultEnable` 控制：开启后客户端会记录每个 Broker 的发送延迟与失败，一段时间内优先避开高延迟 Broker；默认关闭，高可用要求高的场景建议开启。

::: details

- 注意权衡：队列数少于 Broker 数或 Broker 节点少时，规避机制可能把消息切到负载更高的节点，反而加剧热点。

:::

【L4】顺序消息场景下重试机制会破坏顺序（重发可能落到其他队列），建议关闭发送重试，见《MQ面试》『如何保证 MQ 消息的顺序性？』。

#### 🔀 发散问题

**Q：同步、异步、单向三种发送方式怎么选？**
A：见本文档『RocketMQ 有几种发送消息方式？』。核心业务用同步，高吞吐用异步，可容忍丢失的日志用单向。

**Q：发送失败重试会不会导致消息重复？**
A：会。超时重试时 Broker 可能实际已写成功，重试再写一份，因此消费端必须幂等，见《MQ面试》『如何保证 MQ 消息不重复？』。

### 【中等】RocketMQ 有几种发送消息方式？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 生产端

#### 💎 关键结论

RocketMQ 有同步、异步、单向三种发送方式，本质是可靠性与吞吐的三档取舍：同步阻塞等确认最可靠，异步回调不阻塞兼顾可靠与吞吐，单向不等响应最快但可能丢。选型只需看业务能不能容忍丢消息。

#### ⚡记忆卡片

- **口诀**：同步可靠阻塞等，异步回调不阻塞，单向发射不管回
- **关键词**：同步发送 ／ 异步发送 ／ 单向发送 ／ SendCallback ／ 重试
- **链路**：同步：发送 → 阻塞等 SendResult → 失败重试；异步：发送 → 立即返回 → 线程池发送 → 回调 SendCallback；单向：发送 → 立即返回 → 无响应无重试

#### 📖 核心知识

| 发送方式     | 原理                                                   | 可靠性               | 响应时间 |
| :----------- | :----------------------------------------------------- | :------------------- | :------- |
| **同步发送** | 发送消息后，**发送线程会阻塞**，等待 Broker 返回结果。 | **最高**             | 最长     |
| **异步发送** | 发送消息后，**不阻塞线程**，通过回调函数异步接收结果。 | **高**               | 短       |
| **单向发送** | 只负责发送消息，**不等待响应，也不提供回调**。         | **最低**（可能丢失） | 最短     |

::: details 同步发送

这是最常用、最可靠的方式。

**工作流程**：应用程序调用发送 API 后，线程会一直阻塞，直到收到 Broker 返回的 `SendResult`（包含消息 ID、队列信息等）。

**关键特性**：有**内置的重试机制**（默认重试 2 次）。如果发送失败，客户端会自动尝试重试，从而保证消息的可靠投递。

**适用场景**：重要通知、订单创建等**强一致性**场景。

```java
SendResult sendResult = producer.send(message);
System.out.println("发送结果：" + sendResult);
```

:::

::: details 异步发送

适用于对响应时间要求很高的场景，通过回调方式处理发送结果。

**工作流程**：应用程序调用发送 API 后立即返回，发送任务被放入线程池中异步执行。当 Broker 返回响应后，会回调开发者实现的 `SendCallback` 接口。

**关键特性**：同样有重试机制。发送结果在回调函数中处理，成功或失败都需要在回调中考虑。

**适用场景**：**需要高吞吐、对响应敏感**的场景，如日志记录。

```java
producer.send(message, new SendCallback() {
    @Override
    public void onSuccess(SendResult sendResult) {
        System.out.println("异步发送成功：" + sendResult);
    }
    @Override
    public void onException(Throwable e) {
        System.out.println("异步发送失败：" + e.getMessage());
        // 此处应添加失败处理逻辑，如记录日志或入库
    }
});
```

:::

::: details 单向发送（one-way）

只关心发送过程，不关心发送结果。

- **工作流程**：应用程序调用发送 API 后立即返回，不等待 Broker 的任何响应，也不提供回调函数。
- **关键特性**：**没有重试机制**，网络出现波动时消息可能会丢失。它是三种方式中吞吐量最高、耗时最短的，但可靠性最低。
- **适用场景**：纯日志收集、指标上报等**可容忍少量丢失**的场景。

```java
producer.sendOneway(message);
```

:::

#### 🔀 发散问题

**Q：为什么单向发送没有重试？**
A：单向发送不等待任何响应，客户端无从感知失败，自然无法重试。它的定位就是用可靠性换极致吞吐。

**Q：异步发送的失败怎么处理才不丢消息？**
A：在 `onException` 回调中落本地存储（如日志或补偿表），再由定时任务重发，避免静默丢失。

### 【中等】RocketMQ 如何消费消息？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 消费端

#### 💎 关键结论

RocketMQ 消费是"拉取式 + 组内队列分配"模型：同组消费者均分 MessageQueue，每个队列只归一个消费者，拉到的消息交给线程池处理，成功后定期提交位点。因为默认是 at-least-once 语义，所以消费端必须自己做幂等。

#### ⚡记忆卡片

- **口诀**：组内分队列，一队一消费，成功才提交，失败进重试
- **关键词**：消费者组 ／ Rebalance ／ 拉取 ／ Offset ／ at-least-once
- **链路**：Consumer 从 NameServer 获取路由 → 组内均分 MessageQueue → 拉取消息提交线程池处理 → 成功 ACK 并定期持久化 Offset → 失败进重试队列（默认 16 次后进死信）

#### 📖 核心知识

**消费流程**

1. **负载均衡**
   - Consumer 连接 NameServer，获取 Topic 的路由信息（包含所有 MessageQueue）。
   - **同组内的消费者均分所有 MessageQueue**，每个 MessageQueue 只被一个消费者占用。
2. **拉取与处理**
   - 每个消费者**只从分配给自己的 MessageQueue 中拉取消息**。
   - 拉取到的消息提交到消费线程池，由业务监听器（`MessageListener`）处理。
3. **确认与记录（ACK & Offset）**
   - **成功 ACK**：向 Broker 返回 **ACK**。Consumer 会**定期**将 Offset 持久化到 Broker，确保重启后能从断点继续消费。
   - **失败重试**：处理失败的消息会进入**自动重试**流程，超过最大重试次数（默认 16 次）后，放入死信队列。

**消费要点**

- **并行基础**：**消息队列是并发消费的最小单位**，通过分配队列实现水平扩展。
- **消费模式**：
  - **集群模式**：组内竞争，一条消息**只被一个消费者**消费（用于负载均衡）。
  - **广播模式**：组内共享，一条消息**被所有消费者**消费（用于全员通知）。
- **结果保证**：默认提供 **at-least-once** 语义，消息可能不丢但可能重复，要求业务逻辑实现**幂等性**。

#### 🔬 扩展知识

【L3】`DefaultMQPushConsumer` 的 Push 模式本质是长轮询拉取：客户端不断发起 Pull 请求，Broker 无新消息时挂起请求（默认最长 15s）直到有消息或超时才返回，兼顾实时性与 Broker 压力。

::: details

- 消费位点在集群模式下默认每 5 秒批量提交一次，进程崩溃存在最多 5 秒的重复消费窗口，这是 at-least-once 重复的重要来源之一。

:::

【L4】RocketMQ 5.0 的 Pop 消费不再把队列固定分配给实例，而是以 Pop 请求粒度抢占消息，消费者可无状态弹性伸缩，见本文档『RocketMQ 5.0 有哪些新特性？』。

#### 🔀 发散问题

**Q：消费者扩到比队列数还多有用吗？**
A：没用。一个队列只能分给组内一个实例，多出的实例分不到队列完全空转，详见《MQ面试》『如何处理 MQ 消息积压？』。

**Q：消费失败的消息去哪了？**
A：并发消费下进入 `%RETRY%` 重试队列递延重试，默认 16 次后进 `%DLQ%` 死信队列，见《MQ面试》『什么是死信队列？如何设计死信队列的处理机制？』。

**Q：集群消费和广播消费怎么选？**
A：这属于消费模式的选择——集群模式组内一条消息只被一个实例消费用于负载均衡，广播模式每个实例都消费全量用于全员通知，两者位点存储位置也不同，详见本文档『RocketMQ 有几种消费消息方式？』。

### 【简单】RocketMQ 有几种消费消息方式？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 消费端

#### 💎 关键结论

RocketMQ 有集群和广播两种消费模式：集群模式组内一条消息只被一个实例消费，用于负载均衡；广播模式每个实例都消费全量消息，用于全员通知。两者的本质区别是队列分配方式与位点存储位置。

#### ⚡记忆卡片

- **口诀**：集群分摊一条只吃一次，广播人手一份各自记位点
- **关键词**：集群模式 ／ 广播模式 ／ 负载均衡 ／ 全员通知 ／ Offset 存储
- **链路**：集群：组内均分队列 → 一条消息只到一个实例 → 位点存 Broker；广播：每个实例独立消费全量 → 位点存本地

#### 📖 核心知识

- **集群模式**：默认且最常用的模式，用于实现消息的分布式并行处理。
- **广播模式**：适用于需要"通知到每一个节点"的特殊场景。

| 特性维度     | **集群模式**                                               | **广播模式**                                           |
| :----------- | :--------------------------------------------------------- | :----------------------------------------------------- |
| **核心原理** | 一条消息只能被**同一个消费组内的一个消费者**消费。         | 一条消息会被**同一个消费组内的所有消费者**各消费一次。 |
| **工作方式** | 通过**负载均衡**，将主题下的消息队列平均分配给组内消费者。 | 每个消费者实例都**独立消费全量消息**。                 |
| **消费进度** | 消费偏移量在 **Broker 端集中存储和管理**。                 | 消费偏移量由每个消费者在**本地维护**。                 |
| **设计目标** | **负载均衡**与**水平扩展**，提升整体吞吐量。               | **全局广播**，确保每个节点都执行相同操作。             |
| **典型场景** | 订单处理、日志处理等需要**分摊负载**的分布式业务。         | 刷新所有服务器的本地缓存、配置更新等。                 |

#### 🔀 发散问题

**Q：广播模式消费失败会重试吗？**
A：广播模式不支持消费重试（无 `%RETRY%` 队列），失败需要业务自行处理，这也是生产上慎用广播模式的原因之一。

**Q：同一个应用能不能既集群又广播消费同一 Topic？**
A：可以，用不同消费组分别以集群/广播模式订阅即可，互不影响。

**Q：确定消费模式后完整的消费流程是怎样的？**
A：无论集群还是广播都遵循“分配队列 → 拉取消息 → 业务处理 → ACK/位点提交”的主干，差异只在位点存储位置（集群存 Broker、广播存本地），详见本文档『RocketMQ 如何消费消息？』。

### 【简单】RocketMQ 如何实现批量消息？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 生产端

#### 💎 关键结论

批量消息通过 `MessageBatch` 把多条消息打包成一次网络请求发送，用网络往返次数换吞吐。但批量包有大小上限，超限要自行分批，否则发送直接失败。

#### ⚡记忆卡片

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

### 【简单】RocketMQ 集群有几种部署方式？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 集群部署

#### 💎 关键结论

RocketMQ 有四种部署方式，本质是"性能 vs 可靠性"的连续谱：单 Master 最简单，多 Master 性能最高但岩机丢消息，多主多从同步复制可靠性最高。生产环境至少多主多从异步复制，金融场景用同步复制。

#### ⚡记忆卡片

- **口诀**：单机裸奔、多主性能、主从异步折中、主从同步最稳
- **关键词**：单 Master ／ 多 Master ／ 异步复制 ／ 同步复制 ／ brokerRole
- **链路**：可靠性递增：单 Master → 多 Master → 多主多从（异步）→ 多主多从（同步），性能递减

#### 📖 核心知识

| 部署方式                           | 特点                                                               |
| :--------------------------------- | :----------------------------------------------------------------- |
| **单 Master 部署**                 | 简单，适合开发测试，岩机即全部不可用                               |
| **多 Master 部署**                 | 性能最高，单个 Master 岩机时该节点未消费消息不可用，可能有消息丢失 |
| **多 Master 多 Slave（异步复制）** | 主从异步复制，Master 岩机可从 Slave 继续消费，可能有少量消息丢失   |
| **多 Master 多 Slave（同步复制）** | 主从同步复制，可靠性最高，性能略有损耗                             |

#### 🔀 发散问题

**Q：传统主从部署的最大痛点是什么？**
A：Master 岩机后 Slave 只读不写，需人工介入切换，无法自动故障转移；RocketMQ 4.5+ DLedger 和 5.0+ Controller 模式解决了这个问题，见本文档『RocketMQ 如何实现高可用？』。

### 【中等】RocketMQ 如何实现高可用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：RocketMQ / 高可用

#### 💎 关键结论

RocketMQ 高可用分三层：路由层 NameServer 多活、存储层 Broker 主从复制 + 自动切换、客户端层重试 + 故障规避。因为每层都无单点且可独立失效自愈，所以单点故障对整体收发消息的影响可控。

#### ⚡记忆卡片

- **口诀**：NameServer 多活、Broker 主从、客户端重试规避
- **关键词**：NameServer 多活 ／ 心跳 30s ／ 120s 剔除 ／ 同步双写 ／ DLedger ／ Controller
- **链路**：Broker 每 30s 心跳注册 → NameServer 120s 无心跳剔除路由 → 客户端每 30s 拉路由 → 发送失败重试换 Broker → 岩机时主从切换接管

#### 📖 核心知识

RocketMQ 高可用可分为三个维度：

- **路由层**：NameServer 多活
- **存储层**：Broker 主从复制 + 自动切换
- **客户端层**：自动重试 + 故障规避

**高可用工作流程**

- **启动 NameServer**：NameServer 起来后监听端口，等待 Broker、Producer、Consumer 连上来，相当于一个路由控制中心。
- **启动 Broker**：跟所有的 NameServer 保持长连接，定时发送心跳包。心跳包中包含当前 Broker 信息（IP+端口等）以及存储所有 Topic 信息。注册成功后，NameServer 集群中就有 Topic 跟 Broker 的映射关系。
- **创建 Topic**：创建 Topic 时需要指定该 Topic 要存储在哪些 Broker 上，也可以在发送消息时自动创建 Topic。
- **Producer 发送消息**：启动时先跟 NameServer 集群中的其中一台建立长连接，并获取当前发送的 Topic 存在哪些 Broker 上，轮询从队列列表中选择一个队列，然后与队列所在的 Broker 建立长连接从而向 Broker 发消息。
- **Consumer 消费消息**：跟其中一台 NameServer 建立长连接，获取当前订阅 Topic 存在哪些 Broker 上，然后直接跟 Broker 建立连接通道，开始消费消息。

**NameServer 高可用：多活架构 + 心跳检测**

- 部署方式：至少 2 个，推荐 3~4 个 NameServer；每个实例独立，存储全量路由信息；客户端随机选择或配置多个地址；单个岩机无影响（客户端自动切换）。
- Broker **每 30 秒**向所有 NameServer 发送心跳。
- NameServer **120 秒**无心跳则标记 Broker 不可用，调整 Topic 跟 Broker 的对应关系。
- 客户端**每 30 秒**从 NameServer 拉取最新路由。

**Broker 高可用：复制模式选型**

| 复制模式     | 原理                                | 高可用表现             | 适用场景       |
| :----------- | :---------------------------------- | :--------------------- | :------------- |
| **异步复制** | Master 写入即返回，后台同步到 Slave | 切换快，可能丢少量数据 | 大多数业务场景 |
| **同步双写** | Master 等 Slave 确认后才返回        | 数据零丢失，切换稍慢   | 金融、交易场景 |

**客户端高可用**

::: tabs#客户端容错

@tab 生产者容错

失败重试 + 故障规避

```java
DefaultMQProducer producer = new DefaultMQProducer("Group");
// 关键配置
producer.setNamesrvAddr("ns1:9876;ns2:9876");  // 多 NameServer
producer.setRetryTimesWhenSendFailed(3);       // 发送失败重试
producer.setSendLatencyFaultEnable(true);      // 故障延迟规避
producer.setSendMsgTimeout(5000);              // 发送超时

// 发送时自动故障转移
SendResult result = producer.send(msg);
// 内部：尝试其他 Broker → 重试 → 最终失败才抛出异常
```

@tab 消费者容错

消费重试 16 次（默认），全部失败，则消息进入死信队列。

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("Group");
consumer.setNamesrvAddr("ns1:9876;ns2:9876");

// 消费失败处理
consumer.registerMessageListener(new MessageListenerConcurrently() {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(
        List<MessageExt> msgs,
        ConsumeConcurrentlyContext context) {
        try {
            // 业务处理
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        } catch (Exception e) {
            // 失败消息进入重试队列
            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
        }
    }
});

// 广播模式容错（每个客户端独立消费）
// 集群模式容错（组内消费者自动平衡）
```

:::

#### 🔬 扩展知识

【L3】传统主从架构的局限：早期 RocketMQ 的 Master-Slave 模式中，Slave 只读不写，Master 岩机后需要人工介入切换，无法自动故障转移。为此 RocketMQ 提供了两种自动故障转移方案。

::: details

**1. DLedger 模式（RocketMQ 4.5+）**

- **核心**：基于 **Raft 协议**的 CommitLog 复制和自动选主机制。
- **架构**：将 DLedger 模块嵌入 Broker，由 DLedger 负责日志复制和 Leader 选举。
- **数据流**：Producer → DLedger Leader → Raft 复制 → DLedger Followers。
- **故障转移**：Leader 岩机后，Raft 自动选举新 Leader（秒级切换）。
- **代价**：需要单独部署 DLedger 集群（或与 Broker 共存）；存储格式变化（使用 DLedger 日志格式，与原 CommitLog 格式不兼容）；性能有轻微损耗。

**2. Controller 模式（RocketMQ 5.0+，推荐）**

- **核心**：引入独立的 **Controller 组件**统一管理 Broker 主从切换。
- **架构**：Controller 集群（基于 Raft）独立部署，Broker 向 Controller 注册。
- **优势**：兼容原生存储（不改变 CommitLog 格式，老集群可平滑升级）；支持 `SyncMaster` 和 `SyncBroker` 两种切换级别；Controller 只参与选举决策，不参与数据读写。
- **故障转移流程**：Controller 通过心跳检测 Master 故障 → 从 ISR 副本列表中选举新 Master → 通知所有 Broker 和客户端更新路由。

:::

【L4】三种高可用方案对比（生产选型参考）：

::: details

| 方案                | 自动切换 | 数据零丢失   | 存储兼容 | 推荐版本 | 适用场景                     |
| ------------------- | -------- | ------------ | -------- | -------- | ---------------------------- |
| **主从复制**        | 否       | 同步双写支持 | 兼容     | 全版本   | 有运维团队，对自动切换无要求 |
| **DLedger 模式**    | 是       | 是           | 不兼容   | 4.5+     | 需自动切换，可接受迁移成本   |
| **Controller 模式** | 是       | 是           | **兼容** | **5.0+** | **生产推荐**，平滑升级       |

:::

#### 🔀 发散问题

**Q：NameServer 全挂了集群会立即不可用吗？**
A：不会立即。客户端本地缓存路由（默认 30 秒刷新一次），已建连接可继续收发；但新 Broker 无法注册、岩机节点无法从路由剔除，长时间全挂会逐步劣化。

**Q：5.0 升级想要自动切主，选 DLedger 还是 Controller？**
A：优先 Controller：兼容原 CommitLog 格式、老集群可平滑升级，而 DLedger 需要接受存储格式迁移成本。

**Q：高可用机制和四种部署方式是什么关系？**
A：部署方式（单/多 Master、主从异步/同步复制）是静态的可靠性底座，高可用机制（NameServer 多活、DLedger/Controller 自动切换、客户端重试规避）是在此之上的动态故障自愈能力，详见本文档『RocketMQ 集群有几种部署方式？』。

### 【中等】RocketMQ 如何实现负载均衡？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 消费端 / Rebalance

#### 💎 关键结论

RocketMQ 的负载均衡是消费侧的"队列分配"模型：组内实例均分 Topic 下的 MessageQueue，实例增减时定期 Rebalance 重新分配。因为队列是分配的最小单位，所以队列数决定了消费并行度上限。

#### ⚡记忆卡片

- **口诀**：组内分队列，人多队少均着来，增减实例自动分
- **关键词**：消费者组 ／ MessageQueue ／ Rebalance ／ 分配策略 ／ Offset
- **链路**：实例加入或退出 → 20s 周期定时任务触发 Rebalance → 按策略重新分配队列 → 新实例从对应位点接管消费

#### 📖 核心知识

RocketMQ 的消费负载均衡主要通过消费者组、消费者实例与消息队列实现：每个消费者组由多个消费者实例组成，每个实例消费部分消息队列中的消息；系统会自动分配消息队列给组内各实例，且在实例增减时动态重新分配。

- **消费者组**：每个组可包含多个实例，组间互不影响，组内实例共同消费组内消息。
- **消息队列**：每个 Topic 下有多个 MessageQueue，分布在不同 Broker 节点，保障高可用与扩展性。
- **消息分配策略**：提供轮询法（RoundRobin）、平均分配（Average Allocation）等多种策略，可修改以适配业务需求。
- **Rebalance 触发机制**：消费者实例数量变化时，自动触发该机制重新分配队列。新实例加入会分配部分队列，实例岩机则其负责的队列会被重新分配给剩余实例。
- **消费进度**：每个消费者实例本地或远程保存消费进度（Offset），消息消费后更新进度，防止重复消费或丢失。
- **定时任务**：内部每 20 秒触发一次定时任务，根据消费者组变化重新平衡消息队列分配。

负载均衡机制保障了系统的可扩展性和高可用性，避免消费者实例过载或空闲，提升整体性能。

#### 🔬 扩展知识

【L3】客户端内置多种分配策略：平均分配（AllocateMessageQueueAveragely）、环形分配（AllocateMessageQueueAveragelyByCircle）、机房就近、一致性哈希等，默认平均分配；实例数超过队列数时多出的实例分不到队列，完全空转。

::: details

- Rebalance 期间队列交接存在重复消费窗口（旧实例已消费但位点未提交），这是 at-least-once 重复的来源之一，见《MQ面试》『如何保证 MQ 消息不重复？』。

:::

【L4】RocketMQ 5.0 的 Pop 消费改变了负载均衡形态：不再绑定"实例-队列"，而是以请求粒度竞争消息，消费者可无状态弹性伸缩，天然适配 Serverless 场景。

#### 🔀 发散问题

**Q：为什么扩容消费者有时没效果？**
A：实例数超过队列数时多出的实例空转。扩容前先确认队列数，必要时新建更多队列的 Topic 转发，见《MQ面试》『如何处理 MQ 消息积压？』。

**Q：生产者端有负载均衡吗？**
A：有，但形式不同：Producer 轮询选择 MessageQueue，消息自然分散到各 Broker，无需分配机制。

### 【中等】RocketMQ 的 NameServer 有什么作用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 架构组件 / 服务发现

#### 💎 关键结论

NameServer 是 RocketMQ 的路由注册中心：管理所有 Broker 的路由信息，为 Producer/Consumer 提供服务发现。它无状态、节点互不通信、每个实例保存全量路由，任一节点存活即可提供服务。

#### ⚡记忆卡片

- **口诀**：无状态、不互通、存全量、随时可换
- **关键词**：路由注册 ／ 服务发现 ／ 无状态 ／ 多活 ／ 心跳 30s
- **链路**：Broker 每 30s 向所有 NameServer 注册心跳 → NameServer 更新路由与最后心跳时间 → 客户端拉取全量路由 → 120s 无心跳剔除 Broker

#### 📖 核心知识

NameServer 是 RocketMQ 的路由注册中心，**负责管理所有 Broker 的路由信息，为生产者和消费者提供服务发现功能**。

**主要特点**

- **集群部署，互不通讯**：每个 NameServer 实例独立，不互相交换数据。
- **全量路由信息**：每个 NameServer 都保存**完整的集群路由信息**。
- **无主设计**：所有实例平等，无单点故障。

**服务发现机制**

- Broker 启动，每 30 秒向所有 NameServer 注册路由信息。
- Broker 向所有 NameServer 发送心跳，心跳包含：Broker 信息 + 负责的所有 Topic 列表。
- NameServer 更新 Broker 最后心跳时间。

**多活架构**

NameServer 通过多活架构来保证可用性：

- NameServer 若岩机，Broker 继续向其他 NameServer 发送心跳。
- Producer/Consumer 连接其他 NameServer 获取路由。

#### 🔬 扩展知识

【L3】NameServer 节点间不通信是刻意的 AP 设计：路由由各 Broker 分别向所有节点注册，节点间不一致窗口只有心跳周期（30s）级别，客户端最终会拉到一致的路由。

::: details

- NameServer 无持久化存储，重启后依赖 Broker 下一次心跳（最多 30s）重新注册恢复全量路由，因此重启代价极低。

:::

【L4】路由剔除是懒式处理：NameServer 不做主动探测，仅靠每 10s 一次的定时任务扫描心跳时间戳，超过 120s 即从路由表移除 Broker；因此 Broker 岩机后最多约 2 分钟内客户端仍可能向其发送，靠发送重试与故障规避兑底。

#### 🔀 发散问题

**Q：为什么 NameServer 敢不节点同步数据？**
A：因为 Broker 心跳是向所有 NameServer 广播的，数据源头只有一个（Broker），节点间无需同步，天然避免了共识开销，见本文档『为什么 RocketMQ 不用 ZooKeeper，而是自己开发 NameServer？』。

### 【中等】为什么 RocketMQ 不用 ZooKeeper，而是自己开发 NameServer？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 架构选型 / CAP

#### 💎 关键结论

消息队列的路由发现本质是 AP 场景：短暂路由不一致只影响个别消息（可重试兑底），而注册中心不可用则全局瘫痪。ZooKeeper 的 CP 强一致带来不必要的性能与复杂度开销，所以 RocketMQ 自研了轻量、无状态、最终一致的 NameServer。

#### ⚡记忆卡片

- **口诀**：路由要的是可用不是强一致，ZK 太重，自研更轻
- **关键词**：CP vs AP ／ 强一致 ／ 最终一致 ／ 无状态 ／ 轻量级
- **链路**：路由场景容忍短暂不一致 → CP 的 ZK 选举停顿与写瓶颈成为负担 → 自研无状态 NameServer → 节点平等互不通信 → 最终一致 + 高可用

#### 📖 核心知识

**ZooKeeper 的强一致性保障带来了不必要的性能和复杂度开销，而消息队列的路由发现场景本身是一个更注重高可用和高性能的 AP 场景**。

- **ZooKeeper (CP)**：**太重**。为强一致性牺牲性能，功能冗余，运维复杂。
- **NameServer (AP)**：**专为消息队列设计**。轻量、无状态、节点间无同步，实现最终一致性，延迟极低。

概括来说，核心是为了**简单、高效、专注**。

**自研 NameServer 的好处**

NameServer 集群中所有节点平等，无需主从复制、故障转移：

- **更轻量，易部署**。
- **性能更好**：无主从，因此避免了 ZK 主节点集中负责写操作的瓶颈问题。
- **可用性高**：NameServer 无需故障转移，只要有一个节点存在，服务依然可用；ZK 需要集群半数以上节点存活才可用。
- **无持久化存储**（重启后依赖 Broker 重新注册）。

**方案对比**

| **场景**             | **ZooKeeper**             | **RocketMQ 选择**                 |
| -------------------- | ------------------------- | --------------------------------- |
| **注册中心读写频率** | 低频（秒级）              | 高频（毫秒级 Broker 心跳）        |
| **节点规模**         | 适合中小集群（<100 节点） | 支持大规模集群（数千节点）        |
| **吞吐量**           | 写性能受限（需全局有序）  | 自研 NameServer（无强一致性要求） |

#### 🔬 扩展知识

【L3】ZooKeeper 在 Leader 选举期间集群不可写（秒级到分钟级停顿），对路由注册这类"宁可短暂不一致也不能拒绝服务"的场景是致命缺陷；NameServer 任何单点故障都不影响其他节点服务。

::: details

- 反例对比：Kafka 早期依赖 ZooKeeper 管理元数据，大规模集群下元数据变更成为瓶颈，后来也在 KRaft 模式中去除了 ZooKeeper 依赖，印证了"消息系统元数据层轻量化"的行业趋势。

:::

【L4】注册中心选型的通用准则：需要强一致选主、分布式锁等场景选 CP（ZooKeeper/etcd）；仅需服务发现与路由、容忍最终一致选 AP（NameServer/Nacos/Eureka）。

#### 🔀 发散问题

**Q：NameServer 不一致窗口会导致什么问题？**
A：客户端可能拿到旧路由，把消息发到已下线 Broker，但发送失败后会重试并刷新路由，代价只是单次失败重试，不会丢消息。

**Q：如果团队已有 ZooKeeper，能让 RocketMQ 用它做注册中心吗？**
A：官方不支持替换 NameServer；为 RocketMQ 单独部署一组轻量 NameServer 的成本远低于改造适配，这也是自研组件的运维优势。

### 【中等】RocketMQ 5.0 有哪些新特性？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 5.0 / 架构演进

#### 💎 关键结论

RocketMQ 5.0 从"消息队列"升级为"消息 + 事件 + 流"一体化数据平台，三大核心变化：Proxy 无状态接入层（gRPC 多语言）、Controller 自动切主、Pop 无状态消费。因为计算存储分离，所以能支撑 Serverless 弹性与云原生运维。

#### ⚡记忆卡片

- **口诀**：接入加 Proxy，切主靠 Controller，消费用 Pop，延迟任意定
- **关键词**：Proxy ／ gRPC ／ Controller ／ Pop 消费 ／ 任意延迟消息 ／ LMQ
- **链路**：客户端 gRPC 连 Proxy → Proxy 转发 Broker → Controller 基于 Raft 管理主从切换 → Pop 消费无队列绑定弹性伸缩

#### 📖 核心知识

RocketMQ 5.0 的定位从"消息队列"升级为 **"消息 + 事件 + 流"一体化的数据平台**，架构和能力都有重大变化。

**架构层面**

1. **Proxy 接入层**：新增无状态接入层（支持与 Broker 合并部署的 Local 模式，也支持独立部署的 Cluster 模式），统一多语言 gRPC 接入，为 Serverless 弹性打基础。
2. **Controller 模式**：Broker 支持基于 Controller（DLedger/Raft）的**主从自动切换**，解决了传统主从模式无法自动故障转移的痛点。
3. **轻量级 Topic（LMQ）**：支持百万级轻量队列，适配 MQTT/IoT 和海量 Topic 场景。

**功能层面**

1. **任意时刻延迟消息**：突破 4.x 固定 18 个延迟等级的限制，基于时间轮 + 存储引擎，支持秒级精度的定时消息。
2. **Pop 消费**：无状态消费模式，无需 Queue 再均衡，天然支持消费者弹性扩缩容和跨集群负载迁移。
3. **Serverless**：计算存储分离，按需伸缩、按量计费。
4. **EventBridge 事件网格**：对接 Eventing 生态，支持事件源与事件目标的桥接。

**升级影响**

- 5.0 客户端向下兼容 4.x Broker；任意延迟、Pop 消费等新特性需启用 Proxy。
- 迁移建议按 Broker → Proxy → 客户端的顺序升级，先在测试环境验证。

> **一句话总结**：RocketMQ 5.0 的核心是"Proxy 接入层 + Controller 高可用 + Pop 消费"，从消息中间件走向云原生事件平台。

#### 🔬 扩展知识

【L3】Pop 消费的本质：把"队列归属实例"改为"请求级抢占"，每条（批）消息有不可见时间窗口，处理失败超时可被其他实例重新 Pop，因此不再需要 Rebalance，这是消费者能无状态弹性的根源。

::: details

- 5.0 客户端协议基于 gRPC + Protobuf，天然支持多语言与流式语义，4.x 的 Remoting 协议客户端仍可正常工作（向下兼容）。

:::

【L4】5.0 的分级存储（Tiered Storage）方向：冷数据可下沉到对象存储，突破本地磁盘容量对消息保留时长的限制，适配长周期回溯场景。

#### 🔀 发散问题

**Q：4.x 集群升级到 5.0 会不会破坏主从架构？**
A：不会。Controller 模式兼容原生 CommitLog 格式，老集群可平滑升级，见本文档『RocketMQ 如何实现高可用？』。

**Q：5.0 的任意延迟消息和 4.x 的 18 级延迟能共存吗？**
A：能。4.x 的 delayTimeLevel 语义保留，5.0 新增按时间戳的定时消息（需 5.0+ Broker），两者可并存使用。

## RocketMQ 可靠传输

### 【中等】RocketMQ 中如何配置并发消费和顺序消费？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 消费端 / 配置

#### 💎 关键结论

并发消费与顺序消费的区别只在注册的监听器：`MessageListenerConcurrently` 线程池并发处理吞吐高不保序，`MessageListenerOrderly` 对每个队列加锁单线程串行保序。两者的重试机制也不同：并发送重试 Topic，顺序原地挂起。

#### ⚡记忆卡片

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
                // 如果处理失败，会暂停当前队列，并在内部进行重试，而不是投递到重试主题。
                // 如果重试多次后仍然失败，会跳过这条消息，继续处理下一条（在实际生产中需要告警和人工干预）。
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

#### 🔀 发散问题

**Q：同一消费组能一部分实例用并发、一部分用顺序吗？**
A：不能。同一消费组内监听器类型必须一致，否则消费行为未定义；需要两种方式时应拆分消费组。

**Q：顺序消费的完整保序条件有哪些？**
A：生产端同键同队列 + 同步发送、消费端 Orderly 监听器、队列数固定，见《MQ面试》『如何保证 MQ 消息的顺序性？』。

## RocketMQ 架构

### 【简单】RocketMQ 如何实现消息过滤？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 消息过滤

#### 💎 关键结论

RocketMQ 有 Tag 和 SQL92 两种过滤方式，均在 Broker 端执行：Tag 按标签匹配简单高效，SQL92 按属性表达式灵活但耗资源。绝大多数场景优先用 Tag，只有多属性复杂条件才用 SQL92。

#### ⚡记忆卡片

- **口诀**：简单用 Tag，复杂用 SQL，过滤在 Broker
- **关键词**：Tag ／ SQL92 ／ Broker 端过滤 ／ 订阅表达式
- **链路**：生产者打标签或设属性 → 消费者订阅时声明过滤条件 → Broker 拉取时即过滤 → 只投递匹配消息

#### 📖 核心知识

| 方式           | 实现原理                                                        | 特点                                                     | 适用场景                                                       |
| :------------- | :-------------------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------- |
| **Tag 过滤**   | 生产者给消息打上**标签**，消费者按**标签匹配**订阅。            | **简单高效**，但信息量有限，灵活性低。                   | 简单的消息分类，如按业务类型（"ORDER"、"PAYMENT"）过滤。       |
| **SQL92 过滤** | 生产者给消息设置**自定义属性**，消费者使用 **SQL 表达式**订阅。 | **灵活强大**，支持复杂规则，但**消耗更多 Broker 资源**。 | 需要复杂业务逻辑过滤，如 `amount > 100 AND type = 'PAYMENT'`。 |

**执行位置**：两种过滤均在 **Broker 端**完成，确保网络传输效率。

**选择建议**

- 绝大多数场景下，优先使用 **Tag 过滤**，因其性能开销最小。
- 只有当过滤逻辑需要基于消息内容或多个属性进行复杂判断时，才使用 **SQL92 过滤**。

#### 🔀 发散问题

**Q：为什么过滤要在 Broker 端而不是客户端做？**
A：客户端过滤会把大量无关消息拉过来浪费带宽与反序列化开销；Broker 端过滤利用 ConsumeQueue 中预存的 Tag 哈希码快速预筛，代价最小。

**Q：Tag 过滤是怎么快速匹配的？**
A：ConsumeQueue 索引中存了 Tag 的哈希码，Broker 先用哈希码粗筛，命中后再回 CommitLog 比对 Tag 原文，避免每条消息都读正文。

### 【中等】RocketMQ 的消息轨迹如何启用？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RocketMQ / 可观测性

#### 💎 关键结论

消息轨迹把消息的生产、存储、消费全链路事件以消息形式写入内部 Trace Topic，实现端到端追踪。启用只需 Broker 开启配置 + 客户端 `setUseTracing(true)`，是排查丢消息/重复/消费慢的第一工具。

#### ⚡记忆卡片

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

### 【困难】事务消息是如何工作的？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：RocketMQ / 事务消息 / 分布式事务

#### 💎 关键结论

RocketMQ 事务消息（4.3+ 支持）通过"半消息 + 本地事务确认 + 超时回查"实现生产端最终一致：先发半消息对消费者不可见，本地事务成功后 Commit 投递，失败则 Rollback，确认丢失时 Broker 定期回查。它把本地消息表的自研成本转移给了 Broker，但只保证"本地事务与消息投递的原子性"，不管消费端。

#### ⚡记忆卡片

- **口诀**：先发半消息，再跑本地事务，成功 Commit 失败 Rollback，失联就回查
- **关键词**：半消息 ／ TRANS_HALF_TOPIC ／ Commit ／ Rollback ／ 事务回查 ／ 最终一致
- **链路**：发半消息（换 Topic 存储不可见）→ 执行本地事务 → 按结果 Commit（重写回原 Topic）/Rollback → 确认丢失时 Broker 定时回查 → 按回查结果处理

#### 📖 核心知识

MQ 事务方案本质是利用 MQ 功能实现的本地消息表。事务消息需要消息队列提供相应的功能才能实现，Kafka 和 RocketMQ 都提供了事务相关功能：

- **Kafka** 的解决方案是：直接抛出异常，让用户自行处理。用户可以在业务代码中反复重试提交，直到提交成功，或者删除之前修改的数据记录进行事务补偿。
- **RocketMQ** 的解决方案是：通过事务反查机制来解决事务消息提交失败的问题。如果 Producer 在提交或者回滚事务消息时发生网络异常，Broker 没有收到提交或者回滚的请求，Broker 会定期去 Producer 上反查这个事务对应的本地事务的状态，然后根据反查结果决定提交或者回滚这个事务。为了支撑这个事务反查机制，业务代码需要实现一个反查本地事务状态的接口。

**事务消息处理流程**（事务消息自 RocketMQ 4.3 起支持）

事务消息支持在分布式场景下保障消息生产和本地事务的最终一致性。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/09/ee5fa22853b045119e12f9a96d41aec7.png)

1. 生产者将消息发送至 RocketMQ 服务端。
2. 服务端将消息持久化成功之后，向生产者返回 Ack 确认消息已经发送成功，此时消息被标记为"暂不能投递"，这种状态下的消息即为半事务消息。
3. 生产者开始执行本地事务逻辑。
4. 生产者根据本地事务执行结果向服务端提交二次确认结果（Commit 或是 Rollback），服务端收到确认结果后处理逻辑如下：
   - 二次确认结果为 Commit：服务端将半事务消息标记为可投递，并投递给消费者。
   - 二次确认结果为 Rollback：服务端将回滚事务，不会将半事务消息投递给消费者。
5. 在断网或者是生产者应用重启的特殊情况下，若服务端未收到发送者提交的二次确认结果，或服务端收到的二次确认结果为 Unknown 未知状态，经过固定时间后，服务端将对消息生产者即生产者集群中任一生产者实例发起消息回查。**说明**：服务端回查的间隔时间和最大回查次数，请参见 [参数限制](https://rocketmq.apache.org/zh/docs/introduction/03limits)。
6. 生产者收到消息回查后，需要检查对应消息的本地事务执行的最终结果。
7. 生产者根据检查到的本地事务的最终状态再次提交二次确认，服务端仍按照步骤 4 对半事务消息进行处理。

**源码级存储与回查机制（关键参数）**

- **半消息对消费者不可见**：Broker 收到半消息后，将其 Topic/Queue 替换为系统 Topic `RMQ_SYS_TRANS_HALF_TOPIC` 存入 CommitLog，消费者订阅原 Topic 自然看不到。
- **Commit 的本质**：不是"移动消息"，而是把半消息**重新写一份**到原 Topic（恢复真实 Topic/Queue），同时在 `RMQ_SYS_TRANS_OP_HALF_TOPIC` 写一条操作记录标记已处理。
- **回查调度**：Broker 的 `TransactionalMessageCheckService` 每隔 `transactionCheckInterval`（**默认 60s**）扫描半消息队列，对超时未确认的消息向 Producer 集群任一存活实例发起回查；单条消息最多回查 `transactionCheckMax`（**默认 15 次**），超限后默认按 **Rollback** 处理（即消息永远不投递，需告警监控）。
- **方案权衡**：事务消息把"本地消息表 + 定时扫表"的自研成本转移给了 Broker，回查延迟最多约 60s 量级；代价是强绑定 RocketMQ，且回查接口必须由业务保证准确，否则会出现误 Commit（多发）或误 Rollback（漏发）。

**事务消息生命周期**

![事务消息](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/cd8991ae5f4a4bfcb059a80f8f9526c7.png)

- **初始化**：半事务消息被生产者构建完成，待发送到服务端。
- **事务待提交**：半消息发送到服务端后不会直接持久化到普通存储，而是单独存入事务存储系统（TRANS_HALF_TOPIC），等待本地事务结果，此时对消费者不可见。
- **消息回滚**：二次确认明确为 Rollback 时，半消息被回滚，流程终止。
- **提交待消费**：二次确认明确为 Commit 时，半消息重新存入普通存储系统，对消费者可见，等待消费。
- **消费中**：消费者获取消息并按业务逻辑处理；超时未响应时服务端会重试投递。
- **消费提交**：消费者提交消费结果后，消息被逻辑标记已处理（默认保留，到期或空间不足才物理删除，期间可回溯重消费）。
- **消息删除**：按存储清理机制滚动删除，消息从物理文件中移除。

**失效场景**

- 本地事务成功但返回 `UNKNOW`（或抛异常）且回查接口查不到状态：15 次回查后消息被 Rollback，业务成功但下游永远收不到消息（漏发）。
- 回查接口把"查不到记录"当成功返回 `COMMIT`：本地事务实际回滚，消息却被投递（多发）。
- 半消息发送成功前本地事务已执行：发半消息失败时若直接抛异常，本地事务已提交 → 不一致；正确顺序是先发半消息，成功后再执行本地事务。

**本地消息表 vs. 事务消息**

- **本地消息表**：**业务与消息耦合**，通过**数据库+自研任务**保证可靠性。
- **RocketMQ 事务消息**：**业务与消息解耦**，通过 **MQ 框架机制**保证可靠性。

| 维度         | 本地消息表                 | RocketMQ 事务消息        |
| :----------- | :------------------------- | :----------------------- |
| **核心机制** | 数据库事务 + 定时任务扫表  | 半消息 + 事务回查        |
| **性能**     | 中（受数据库限制）         | **高**（由 MQ 保障）     |
| **侵入性**   | **低**（只需写库）         | 中（需实现回查接口）     |
| **复杂度**   | 中（在应用侧，需自研任务） | 中（在框架侧，开箱即用） |
| **耦合度**   | **与数据库耦合**           | **与 RocketMQ 耦合**     |
| **通用性**   | **高**（适配任何 MQ）      | 低（仅限 RocketMQ）      |

**技术选型**

- **选本地消息表**：追求**通用解**、技术栈多样、消息量适中。
- **选 RocketMQ 事务消息**：技术栈已定、追求**高性能**、希望减少自研成本。

#### 🔬 扩展知识

【L3】半消息的写放大：Commit 不是移动而是重新写一份到原 Topic（新 offset）并在 Op 队列记录操作，因此事务消息的写放大约为普通消息的两倍；评估 Broker 容量时要把半消息队列的存储计入。

::: details

- 回查次数超限（默认 15 次）后默认按 Rollback 处理且没有内置告警——这是最危险的静默失败，必须自建监控：定期扫半消息队列堆积量与 Op 队列中 rollback 记录，或业务侧对账比对"本地事务成功数 vs 下游消费数"。

:::

【L3】跨 MQ 事务支持对比与同步双写

::: details

| MQ                    | 事务支持                      | 机制差异                                                                                                                                                      |
| :-------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **RocketMQ**          | 原生事务消息                  | 半消息 + 定时回查（默认间隔 60s、最多 15 次），业务实现回查接口即可，是"事务消息"形态的典型代表                                                               |
| **Kafka**             | 事务 API（Exactly-Once 语义） | 定位不同：解决"多分区原子写入 + 消费端幂等"（produce-consume 链路），而非"本地事务 + 消息的原子性"；没有半消息/回查机制，本地事务失败需用户自行补偿或重试提交 |
| **RabbitMQ / Pulsar** | 无原生回查式事务消息          | 通常用本地消息表或 publisher confirm + 重试兜底来实现等价效果                                                                                                 |

除本地消息表外，还有一种更简单的方案——**同步双写**（业务提交前同步发消息，失败则业务回滚）：实现最简单，但发消息失败则业务失败、可用性耦合；且发送成功但业务提交失败时无法回滚已发消息，存在不一致窗口。选型结论：需要"本地事务与消息原子绑定"时，RocketMQ 类回查机制最直接；用 Kafka 时应明确其事务语义不覆盖该场景。

:::

【L4】事务消息的边界：它只保证"本地事务与消息投递的原子性（生产端最终一致）"，消费端失败仍需重试/死信 + 幂等解决；它也不提供跨服务的分布式事务，本质是"可靠消息最终一致性"模式，不要把它当 2PC 用。

> 📚 延伸阅读：[RocketMQ 官方参数限制说明](https://rocketmq.apache.org/zh/docs/introduction/03limits)

#### 🏭 实战场景

::: details

**踩坑案例：回查风暴压垮交易库**

- **现象**：某天 Broker 报警半消息队列堆积数十万条，随后交易库 CPU 飙升，大量慢查询来自 Producer 的回查线程。
- **排查**：回查日志显示大量订单的 `checkLocalTransaction` 返回 `UNKNOW`；定位到该订单服务的本地事务状态表写入因一次发布被遗漏（事务内忘记 insert 状态记录）。
- **根因**：回查接口查不到状态记录时返回 `UNKNOW` 而非明确结论，每条半消息按 60s 间隔反复回查最多 15 次；积压 × 15 次回查形成风暴，把交易库打满，反过来又让本地事务更慢，恶性循环。
- **修复**：紧急修复状态记录写入；回查接口改为"查不到且超过业务最大耗时 → 按业务规则返回明确 Rollback + 告警"；同时对回查 QPS 限流、`transactionCheckInterval` 临时调大降压。

:::

::: details

**场景题：支付成功但下游始终收不到消息**

订单支付成功，但下游积分服务始终未收到消息；事务消息回查日志显示本地事务状态一直返回 UNKNOWN：

- **应急处理**：先用控制台按订单 Key 查到半消息，确认其状态；若回查已接近 15 次上限，立即人工介入：查订单库确认支付确实成功后，通过运维手段或临时修复回查逻辑让其返回 Commit，避免消息被默认 Rollback 永久丢失；同时补偿积分。
- **根因分析**：回查返回 UNKNOWN 说明回查接口查不到本地事务状态——常见原因：① 本地事务状态记录写入与业务不在同一事务，写失败；② 回查用错查询键（如用 msgId 而非 orderId）；③ 回查被路由到同一 Group 的其他实例，而该实例连的库/缓存不同。逐一比对回查请求中的 msgId/Key 与业务表的查询条件即可定位。
- **长期方案**：本地事务内强制写事务状态表（与业务同库同事务）；回查接口只允许返回明确的 Commit/Rollback，"查不到"超过业务最大耗时阈值时按预设策略返回并告警；接入半消息堆积监控。
- **权衡**：状态表方案增加一次 DB 写入（可与业务同事务，成本极低）；回查接口"宁可 Rollback 也不误 Commit"还是"宁可 Commit 也不漏发"，取决于下游幂等能力——下游幂等完备时可偏向 Commit + 去重，否则偏向 Rollback + 人工补偿。

:::

::: details

**踩坑案例：滚动发布期回查查实例本地缓存，消息被丢弃**

某系统"支付成功→通知清结算"链路用事务消息。支付服务滚动发布时，一批半消息的二次确认因进程被 kill 而丢失，Broker 启动回查；但回查接口实现是"查当前实例的本地缓存"，新实例上查不到旧事务状态，一律返回 Unknown，这批消息被回查耗尽后丢弃，清结算当晚少对账数十笔，靠 T+1 对账才发现。修复：① 回查改查数据库事务流水表（跨实例可查）；② 对"回查达上限被丢弃"的消息配置告警 + 自动落表待人工处理；③ 发布改为优雅停机（先停新事务、等存量事务确认完成再下线）。教训：**回查接口的正确性是事务消息的生命线，它必须基于持久化状态而非进程内存**。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "事务消息能解决整个链路的分布式事务" → 它只保证本地事务与消息投递的原子性，消费端一致性仍需重试/死信 + 幂等，不要当 2PC 用。
- ❌ "回查查不到记录就返回 COMMIT 保险" → 若本地事务实际回滚会造成多发；查不到应按预设策略处理并告警，而非默认提交。
- ❌ "先执行本地事务再发半消息也一样" → 顺序错误：半消息发送失败时本地事务已提交会造成不一致，正确顺序是先发半消息成功后再执行本地事务。
- ❌ "Kafka 事务可以替代 RocketMQ 事务消息" → Kafka 事务解决的是"多分区原子写入 + 消费位点原子提交"，服务 exactly-once 流处理；没有半消息挂起与回查机制，两者同名不同义。
- ❌ "事务消息能保证消费端恰好一次" → 它只保证生产侧"本地事务与消息发送原子绑定"，消费端仍是 at-least-once，必须自行幂等。

:::

#### 🔀 发散问题

**Q：半消息为什么能存在 Broker 上却不被消费者看到？Commit 是移动还是复制？**
A：半消息写入时 Topic/Queue 被替换成 `RMQ_SYS_TRANS_HALF_TOPIC`，消费者订阅原 Topic 自然不可见。Commit 是把消息重新写一份到原 Topic（新 offset）并在 Op 队列记录，所以是一次额外写入。

**Q：回查次数超限后消息去哪了？业务怎么感知？**
A：默认按 Rollback 处理，消息永不投递，且没有内置告警——必须自建半消息堆积与 rollback 记录监控，或业务对账比对。

**Q：回查接口的具体设计要点是什么？**
A：见本文档『RocketMQ 事务消息的回查机制如何实现？回查接口该如何设计？』。核心是幂等、基于业务唯一键查询、返回明确结果、查不到默认 Rollback。

### 【困难】RocketMQ 事务消息的回查机制如何实现？回查接口该如何设计？⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RocketMQ / 事务消息 / 回查

#### 💎 关键结论

事务回查是事务消息的核心容错机制：Broker 超时（默认 60s）未收到二次确认或收到 Unknown 时，定时扫描半消息并向 Producer 任一存活实例回查本地事务状态。回查接口设计的核心是幂等、基于业务唯一键、返回明确结果。

#### ⚡记忆卡片

- **口诀**：超时未确认就回查，查业务键、给准信、查不到就回滚
- **关键词**：transactionCheckInterval ／ transactionCheckMax ／ UNKNOW ／ 业务唯一键 ／ 幂等
- **链路**：Broker 60s 扫描半消息队列 → 向任一 Producer 实例发回查 → 按业务键查本地事务状态 → 返回 Commit/Rollback/Unknown → 最多 15 次，超限默认 Rollback

#### 📖 核心知识

**回查触发条件**

当 Broker 在**事务超时**（默认 60s）后仍未收到 Producer 的二次确认结果，或者收到的是 `Unknown` 状态时，Broker 会发起事务回查。

**回查工作流程**

1. **Broker 定时扫描**：Broker 内部定时任务（默认每 60s）扫描半消息 Topic `RMQ_SYS_TRANS_HALF_TOPIC`，找出超时未确认的半消息。
2. **回查 Producer**：Broker 向 Producer 集群中**任一存活实例**发送回查请求，携带消息的唯一标识。
3. **Producer 检查本地事务状态**：Producer 根据消息标识查询本地事务的最终执行结果。
4. **返回结果**：Producer 向 Broker 返回 `Commit`、`Rollback` 或 `Unknown`。
5. **Broker 处理**：
   - `Commit`：将半消息从 `RMQ_SYS_TRANS_HALF_TOPIC` 转移到原 Topic，对消费者可见。
   - `Rollback`：将半消息标记为已删除（存入 `RMQ_SYS_TRANS_OP_HALF_TOPIC`）。
   - `Unknown`：等待下一轮回查。
6. **回查次数限制**：默认最多回查 **15 次**，超过后**默认按 Rollback 处理**（可通过 `transactionCheckMax` 配置，4.x 版本行为）。

**回查接口设计示例**

```java
public class OrderTransactionListener implements TransactionListener {

    // 执行本地事务（半消息发送成功后调用）
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        String orderId = msg.getKeys();
        try {
            // 执行本地业务（如创建订单）
            orderService.createOrder(orderId);
            return LocalTransactionState.COMMIT_MESSAGE;
        } catch (Exception e) {
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
    }

    // 事务回查（Broker 超时未收到确认时调用）
    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        String orderId = msg.getKeys();
        // 【关键】根据业务唯一标识查询本地事务最终结果
        Order order = orderService.queryByOrderId(orderId);
        if (order == null) {
            // 本地事务未执行或执行失败，回滚
            return LocalTransactionState.ROLLBACK_MESSAGE;
        }
        // 本地事务已成功提交，确认消息
        return LocalTransactionState.COMMIT_MESSAGE;
        // 注意：不要轻易返回 UNKNOW，否则会持续触发回查
    }
}
```

**回查接口设计的关键原则**

| 原则               | 说明                                                      |
| ------------------ | --------------------------------------------------------- |
| **幂等性**         | 回查可能被调用多次，检查逻辑必须幂等                      |
| **基于业务唯一键** | 使用订单 ID 等业务标识查询，而非消息 ID                   |
| **明确返回结果**   | 尽量返回明确的 Commit/Rollback，避免 Unknown 导致无限回查 |
| **快速响应**       | 回查接口应快速返回，避免阻塞 Broker 的回查线程            |
| **记录事务日志**   | 建议在本地事务表中记录事务状态，便于回查时查询            |
| **容错处理**       | 查询不到记录时，默认 Rollback（安全优先），避免误投递     |

**常见坑点**

- **回查超时**：如果回查接口响应慢（如数据库查询慢），会导致 Broker 回查线程阻塞，影响其他事务消息。
- **回查失败**：Producer 岩机导致回查无响应，Broker 会等待并重试，但不会无限重试。
- **本地事务与消息状态不一致**：必须保证本地事务提交和记录事务状态在**同一数据库事务**中。

#### 🔬 扩展知识

【L3】回查风暴防护：半消息大量堆积时，回查 QPS = 堆积量 / 回查间隔，可能压垮 Producer 依赖的数据库；应对手段是对回查 QPS 限流、临时调大 `transactionCheckInterval`、修复状态记录写入后再恢复。

::: details

- 回查接口的降级策略设计："查不到"时结合业务最大耗时阈值决策——超过阈值仍查不到按预设策略返回明确 Commit 或 Rollback + 告警，而不是无限返回 UNKNOW。

:::

【L4】多实例一致性注意：回查请求可能落到同一 Producer Group 的任一实例，若各实例依赖的缓存/库不一致（如只查本地缓存）会返回错误结果；状态查询必须走共享存储。

#### 🔀 发散问题

**Q：回查接口能不能返回 UNKNOW 让它一直查？**
A：可以但不推荐。UNKNOW 会持续触发回查直到 15 次上限，期间半消息一直悬挂；积压时还会放大回查压力，应尽量返回明确结论。

**Q：事务消息整体流程和失效场景是什么？**
A：见本文档『事务消息是如何工作的？』。核心风险是回查查不到状态导致的漏发/多发，需监控半消息堆积兑底。

## RocketMQ 优化

### 【中等】RocketMQ 如何优化性能？有哪些调优策略？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RocketMQ / 性能调优

#### 💎 关键结论

RocketMQ 调优分四层：生产者批量异步降网络开销，Broker 刷盘/线程/内存参数挖吞吐，消费者提并发与批量，操作系统层 SSD 与内核参数兑底。原则是先压测定瓶颈再调参，避免盲目修改默认值。

#### ⚡记忆卡片

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

| 优化项                | 参数/方法                            | 说明                             |
| --------------------- | ------------------------------------ | -------------------------------- |
| **刷盘策略**          | `flushDiskType=ASYNC_FLUSH`          | 异步刷盘，吞吐高（有丢消息风险） |
| **内存映射**          | `transientStorePoolEnable=true`      | 启用堆外内存池，减少 GC          |
| **ConsumeQueue 刷盘** | `flushConsumeQueueConcurrently=true` | ConsumeQueue 并发刷盘            |
| **消息索引**          | `maxIndexNum=20000000`               | 增大索引文件容量                 |
| **线程数**            | `sendMessageThreadPoolNums`          | 根据 CPU 核数调整发送线程池      |
| **预分配映射文件**    | `mappedFileSizeCommitLog=1G`         | 增大单个 CommitLog 文件大小      |

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
