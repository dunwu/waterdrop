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

### 【简单】RocketMQ 是什么？⭐

**RocketMQ 是一个开源分布式消息中间件**。最初由阿里巴巴开发，现在是 Apache 顶级项目。

**RocketMQ 的核心概念**

- **核心组件**
  - **生产者（Producer）**：从 NameServer 获取路由信息后，将消息发送到 Broker。
  - **消费者（Consumer）**：从 NameServer 获取路由信息后，从 Broker 拉取并消费消息。
  - **代理（Broker）**：负责消息的存储、投递和查询。采用主从结构保证高可用。
  - **命名服务（NameServer）**：管理所有 Broker 的地址列表。无状态，简单高效。
- **逻辑存储**
  - **主题（Topic）**：消息的一级分类，生产者和消费者操作的逻辑对象。
  - **标签（Tag）**：Topic 下的二级分类，用于对消息进行过滤。
  - **消息（Message）**：包含 Body（消息体）、Topic、Tags（标签）、Keys（唯一键）等属性。
  - **消息队列（Message Queue）**：Topic 在物理上的分区，是负载均衡和并行处理的最小单位。
- **物理存储**
  - **提交日志（Commit Log）**：所有 Topic 的消息都**顺序追加**到这一个文件中。这是实现高吞吐写入的关键。
  - **消费队列（Consume Queue）**：作为 CommitLog 的**索引文件**。每个 Queue 对应一个，记录消息在 CommitLog 中的位置，实现高效的读取。
  - **索引文件（Index File）**：提供按 **Message Key** 或时间范围查询消息的能力。

### 【简单】RocketMQ 有哪些核心组件？⭐

::: info RocketMQ 核心组件

:::

| 组件           | 核心角色           | 关键职责                                                      | 特点                                     |
| :------------- | :----------------- | :------------------------------------------------------------ | :--------------------------------------- |
| **NameServer** | **路由中心**       | 服务发现与路由管理。Broker 注册，Producer/Consumer 获取路由。 | **无状态、轻量级**，实现组件解耦。       |
| **Broker**     | **存储与中转核心** | 消息的接收、存储、投递和查询。                                | **主从架构**，保证高可用与数据持久化。   |
| **Producer**   | **消息生产者**     | 创建并发送消息到指定 Topic 的 Broker。                        | 支持**同步、异步、单向**发送，内置重试。 |
| **Consumer**   | **消息消费者**     | 从 Broker 拉取消息并提交给业务应用处理。                      | 以**消费者组**为单位进行负载均衡消费。   |

::: info RocketMQ 核心组件协作流程

:::

![](https://raw.githubusercontent.com/dunwu/images/master/202509272301766.png)

1.  **Broker** 启动后向 **Name Server** 注册。
2.  **Producer/Consumer** 启动时从 **Name Server** 获取路由信息（Topic 在哪些 Broker 上）。
3.  **Producer** 根据路由信息将消息发送给对应的 **Broker**。
4.  **Broker** 将消息持久化存储。
5.  **Consumer** 根据路由信息从 **Broker** 拉取消息进行消费。

**一句话总结：Name Server 管路由，Broker 管存储，Producer 发消息，Consumer 收消息。**

## RocketMQ 存储

### 【中等】RocketMQ 如何存储数据？⭐⭐

RocketMQ 通过“单一日志顺序写，异步构建多索引”的架构，完美平衡了高性能、高可靠性和海量消息堆积能力。

::: info RocketMQ 物理存储文件

:::

Apache RocketMQ 消息默认存储在本地磁盘文件中，存储文件的根目录由配置参数 storePathRootDir 决定，存储结构如下图所示，其中 commitLog 文件夹存储消息物理文件，consumeQueue 文件夹存储逻辑队列索引。

![](https://raw.githubusercontent.com/dunwu/images/master/202509272356323.jpg)

| 文件              | 核心作用                                        | 特点                                                                                |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------- |
| **Commit Log**    | **唯一存储**所有消息的实体内容                  | 所有 Topic 和 Queue 的消息**混合顺序写入**，是数据的“唯一真相源”。                  |
| **Consume Queue** | Commit Log 的**索引文件**，用于消息消费         | 每个 Message Queue 对应一个，存储消息在 Commit Log 中的**物理偏移量**，实现快速定位 |
| **Index File**    | 提供按 **Message Key** 或时间范围查询消息的能力 | 用于控制台查询等运维场景                                                            |

::: info RocketMQ 读写存储流程

:::

1.  **写入流程**：
    - 消息**顺序写入** Commit Log 后即返回成功。
    - 索引的构建（写入 Consume Queue）是**异步完成**的，不影响主写入性能。
    - 无论 Commit Log 还是 Commit Queue，文件都是按固定大小分段管理的（如每个文件 1G 大小）。

2.  **读取/消费流程**：
    - 消费者根据消费偏移量，先从 **Consume Queue** 找到索引。
    - 再根据索引中的物理地址，到 **Commit Log** 中读取实际消息内容。

### 【中等】RocketMQ 如何持久化？⭐⭐

RocketMQ 持久化有以下核心机制：

- **顺序 I/O**：**RocketMQ 数据以日志形式存储于磁盘**。采用**追加写入，不可修改**，以此避免在磁盘上随机写入性能不高的问题。
- **刷盘机制**
  - 数据先写入**页缓存**，再在合适时机写入磁盘。
  - 支持两种刷盘策略，在 `broker.conf` 文件中配置：
    - **异步刷盘**：性能高，有极低概率丢消息。
    - **同步刷盘**：可靠性高，性能略有损耗。
- **日志清理**：基于时间或空间的**保留策略**自动清理旧数据，防止磁盘耗尽。
  - **基于空间清理**：磁盘使用率超过阈值（默认 75%），**强制清理**旧文件直到空间充足
  - **基于时间清理**：定期清理超过保留时长（默认 3 天）且**不再被任何消费者需要**的文件
- **多索引**
  - **Consume Queue**：是 **Commit Log** 的**索引文件**，用于记录已消息消费
  - **Index File**：提供按 **Message Key** 或时间范围查询消息的能力

### 【困难】RocketMQ 如何实现内存映射机制？

**内存映射**使用 `MappedByteBuffer`，将磁盘文件**直接映射到进程虚拟内存空间**，以实现**高吞吐、低延迟**的读写性能。

**工作原理**

- **写入**：消息直接**追加**到 `MappedByteBuffer`，本质是写入**内存**和 **OS Page Cache**，而非直接写磁盘。
- **读取**：通过 `MappedByteBuffer` **直接定位内存地址**读取数据，如同访问数组，无需磁盘 I/O。

**性能优势**

- **极高写入性能**：将磁盘随机 I/O 转换为顺序内存写入，避免频繁系统调用。
- **极高读取性能**：将磁盘随机 I/O 转换为内存访问，利用 Page Cache 实现“**零拷贝**” 读取。
- **高效 GC**：主动调用 `force()` 刷盘，避免传统 `DirectByteBuffer` 的 Full GC 问题。

**潜在问题**

- **内存压力**：受 OS 虚拟内存空间限制，大量映射文件占用地址空间。
- **数据丢失风险**：**异步刷盘**模式下，写入 Page Cache 后即返回，宕机可能导致数据丢失。
- **文件释放**：`MappedByteBuffer` 占用的堆外内存不易被 JVM 及时回收。

## RocketMQ 生产消费

### 【中等】RocketMQ 如何发送消息？⭐⭐

::: important 要点

Producer（发送方） -> **Name Server**（路由中心） -> Broker（存储方）。

:::

**准备阶段（启动与路由发现）**

- Producer 启动，连接 Name Server。
- 从 Name Server 拉取 Topic 的**路由信息**（Topic 分布在哪些 Broker、每个 Broker 上有哪些 Message Queue），并缓存在本地。

**发送阶段（路由选择与发送）**

- **选择队列**：根据负载均衡策略（如轮询）为消息选择一个具体的 Message Queue。
- **发送消息**：根据路由信息，找到队列所在的主 Broker，将消息发送出去。
- **Broker 处理**：Broker 接收消息，写入存储文件后，向 Producer 返回发送结果。

**容错阶段（失败重试）**

- **自动重试**：若发送失败（如网络问题），Producer 会自动重试（默认 2 次）。
- **故障规避**：重试时会**自动避开上次失败的 Broker**，选择其他队列，保证高可用。
- **路由更新**：若持续失败，会重新从 Name Server 拉取最新路由信息。

### 【中等】RocketMQ 有几种发送消息方式？⭐

::: important 要点

| 发送方式     | 原理                                                   | 可靠性               | 响应时间 |
| :----------- | :----------------------------------------------------- | :------------------- | :------- |
| **同步发送** | 发送消息后，**发送线程会阻塞**，等待 Broker 返回结果。 | **最高**             | 最长     |
| **异步发送** | 发送消息后，**不阻塞线程**，通过回调函数异步接收结果。 | **高**               | 短       |
| **单向发送** | 只负责发送消息，**不等待响应，也不提供回调**。         | **最低**（可能丢失） | 最短     |

:::

::: info 同步发送

:::

这是最常用、最可靠的方式。

**工作流程**：应用程序调用发送 API 后，线程会一直阻塞，直到收到 RocketMQ 服务器（Broker）返回的 `SendResult`（包含消息 ID、队列信息等）。

**关键特性**：有**内置的重试机制**（默认重试 2 次）。如果发送失败，客户端会自动尝试重试，从而保证消息的可靠投递。

**适用场景**：重要通知、订单创建等**强一致性**场景。

**示例**

```java
SendResult sendResult = producer.send(message);
System.out.println("发送结果：" + sendResult);
```

::: info 异步发送

:::

适用于对响应时间要求很高的场景，通过回调方式处理发送结果。

**工作流程**：应用程序调用发送 API 后立即返回，发送任务被放入线程池中异步执行。当 Broker 返回响应后，会回调开发者实现的 `SendCallback` 接口。

**关键特性**：同样有重试机制。发送结果在回调函数中处理，成功或失败都需要在回调中考虑。

**适用场景**：**需要高吞吐、对响应敏感**的场景，如日志记录。

**示例**

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

::: info 单向发送（one-way）

:::

只关心发送过程，不关心发送结果。

- **工作流程**：应用程序调用发送 API 后立即返回，不等待 Broker 的任何响应，也不提供回调函数。
- **关键特性**：**没有重试机制**，网络出现波动时消息可能会丢失。它是三种方式中吞吐量最高、耗时最短的，但可靠性最低。
- **适用场景**：纯日志收集、 指标上报等**可容忍少量丢失**的场景。

**示例**

```java
producer.sendOneway(message);
```

### 【中等】RocketMQ 如何消费消息 ？⭐⭐

::: info RocketMQ 消费消息流程

:::

1.  **负载均衡**
    - Consumer 连接 Name Server，获取 Topic 的路由信息（包含所有 Message Queue）。
    - **同组内的消费者均分所有 Message Queue**，每个 Message Queue 只被一个消费者占用。
2.  **拉取与处理**
    - 每个消费者**只从分配给自己的 Message Queue 中拉取消息**。
    - 拉取到的消息提交到消费线程池，由业务监听器 (`MessageListener`) 处理。
3.  **确认与记录（ACK & Offset）**
    - **成功 ACK**：向 Broker 返回 **ACK**。Consumer 会**定期**将 Offset 持久化到 Broker，确保重启后能从断点继续消费。
    - **失败重试**：处理失败的消息会进入**自动重试**流程，超过最大重试次数（默认 16 次）后，放入死信队列。

::: info RocketMQ 消费消息要点

:::

- **并行基础**：**消息队列是并发消费的最小单位**，通过分配队列实现水平扩展。
- **消费模式**：
  - **集群模式**：组内竞争，一条消息**只被一个消费者**消费（用于负载均衡）。
  - **广播模式**：组内共享，一条消息**被所有消费者**消费（用于全员通知）。
- **结果保证**：默认提供 **`at least once`** 语义，消息可能不丢但可能重复，要求业务逻辑实现**幂等性**。

### 【简单】RocketMQ 有几种消费消息方式？⭐

::: important 要点

RocketMQ 支持两种消费方式

- **集群模式**：默认且最常用的模式，用于实现消息的分布式并行处理。
- **广播模式**：适用于需要“通知到每一个节点”的特殊场景。

:::

| 特性维度     | **集群模式**                                               | **广播模式**                                           |
| :----------- | :--------------------------------------------------------- | :----------------------------------------------------- |
| **核心原理** | 一条消息只能被**同一个消费组内的一个消费者**消费。         | 一条消息会被**同一个消费组内的所有消费者**各消费一次。 |
| **工作方式** | 通过**负载均衡**，将主题下的消息队列平均分配给组内消费者。 | 每个消费者实例都**独立消费全量消息**。                 |
| **消费进度** | 消费偏移量在 **Broker 端集中存储和管理**。                 | 消费偏移量由每个消费者在**本地维护**。                 |
| **设计目标** | **负载均衡**与**水平扩展**，提升整体吞吐量。               | **全局广播**，确保每个节点都执行相同操作。             |
| **典型场景** | 订单处理、日志处理等需要**分摊负载**的分布式业务。         | 刷新所有服务器的本地缓存、配置更新等。                 |

### 【简单】RocketMQ 如何实现批量消息？

在 RocketMQ 中，批量消息通过 `MessageBatch` 类实现，该类将多条消息封装成一个对象，再通过单次网络调用统一发送。示例代码：

```java
// 示例代码：
List<Message> messages = new ArrayList<>();
messages.add(new Message("Topic", "Tag", "Key", "Message Body".getBytes()));
// 省略添加更多消息
MessageBatch messageBatch = MessageBatch.generateFromList(messages);
// producer.send(messageBatch);
```

## RocketMQ 集群

### 【简单】RocketMQ 集群有几种部署方式？

| 部署方式                           | 特点                         |
| :--------------------------------- | :--------------------------- |
| **单 Master 部署**                 | 简单                         |
| **多 Master 部署**                 | 性能最高，可能有消息丢失     |
| **多 Master 多 Slave（异步复制）** | 主从异步复制，可能有消息丢失 |
| **多 Master 多 Slave（同步复制）** | 主从同步复制，可靠性最高     |

### 【中等】RocketMQ 如何实现主从复制？⭐⭐

**RocketMQ 采用主从架构，基于主从复制实现高可用**。

::: info 主从复制原理

:::

RocketMQ 以 **Commit Log** 为复制单位，而非主题或队列。

**RocketMQ 主从架构角色**：

- **主节点（Master）**：处理读写请求；消息写入时，持久化到本地存储。
- **从节点（Slave）**：只处理读请求；定期向主节点拉取数据，以保持同步。

**数据流向**：

- Producer → Master Commit Log → （复制） → Slave Commit Log。
- Consume Queue（消费索引）在 Master 和 Slave 上**各自独立生成**。

**RocketMQ 复制模式**

| 模式     | 配置参数                    | 工作原理                                                | 优点               | 缺点                                        |
| :------- | :-------------------------- | :------------------------------------------------------ | :----------------- | :------------------------------------------ |
| **异步** | `brokerRole = ASYNC_MASTER` | Master 写入内存后立即返回成功，**异步**同步数据到 Slave | **性能高**，延迟低 | **可能丢消息**（Master 宕机且数据未同步时） |
| **同步** | `brokerRole = SYNC_MASTER`  | Master 写入内存后，**等待 Slave 写入成功**后才返回      | **数据可靠性高**   | **性能较低**，延迟增加                      |

### 【中等】RocketMQ 如何实现高可用？⭐⭐⭐

RocketMQ 高可用可以分为三个维度：

- 路由层：NameServer 多活
- 存储层：Broker 主从复制 + 自动切换
- 客户端层：自动重试 + 故障规避

::: info 高可用流程

:::

- **启动 NameServer**：NameServer 起来后监听端口，等待 Broker、Producer、Consumer 连上来，相当于一个路由控制中心。

- **启动 Broker**：跟所有的 NameServer 保持长连接，定时发送心跳包。心跳包中包含当前 Broker 信息 (IP+端口等）以及存储所有 Topic 信息。注册成功后，NameServer 集群中就有 Topic 跟 Broker 的映射关系。

- **创建 Topic**：创建 Topic 时需要指定该 Topic 要存储在哪些 Broker 上，也可以在发送消息时自动创建 Topic。

- **Producer 发送消息**：启动时先跟 NameServer 集群中的其中一台建立长连接，并从 NameServer 中获取当前发送的 Topic 存在哪些
  Broker 上，轮询从队列列表中选择一个队列，然后与队列所在的 Broker 建立长连接从而向 Broker 发消息。

- **Consumer 消费消息**：跟其中一台 NameServer 建立长连接，获取当前订阅 Topic 存在哪些 Broker 上，然后直接跟 Broker 建立连接通道，开始消费消息

:::info NameServer 高可用

:::

**多活架构**

- 部署方式：至少 2 个，推荐 3-4 个 NameServer

- 工作模式：每个实例独立，存储全量路由信息

- 客户端连接：随机选择或配置多个地址

- 故障影响：单个宕机无影响（客户端自动切换）

**心跳检测**

- Broker **每 30 秒**向所有 NameServer 发送心跳

- NameServer **120 秒**无心跳则标记 Broker 不可用，调整 Topic 跟 Broker 的对应关系

- 客户端 **每 30 秒**从 NameServer 拉取最新路由

:::info Broker 高可用

:::

**复制模式**

| 复制模式     | 原理                                | 高可用表现             | 适用场景       |
| :----------- | :---------------------------------- | :--------------------- | :------------- |
| **异步复制** | Master 写入即返回，后台同步到 Slave | 切换快，可能丢少量数据 | 大多数业务场景 |
| **同步双写** | Master 等 Slave 确认后才返回        | 数据零丢失，切换稍慢   | 金融、交易场景 |

:::info 客户端高可用

:::

::: tabs#单例模式

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

### 【中等】RocketMQ 如何实现负载均衡？⭐⭐⭐

RocketMQ 的消费负载均衡主要通过消费者组、消费者实例与消息队列实现。

每个消费者组由多个消费者实例组成，每个实例消费部分消息队列中的消息；系统会自动分配消息队列给消费者组内各实例，且在实例增减时动态重新分配，确保负载均衡。

- **消费者组**：每个组可包含多个实例，组间互不影响，组内实例共同消费组内消息。
- **消息队列**：每个主题（Topic）下有多个消息队列（Message Queue），分布在不同 Broker 节点，保障高可用与扩展性。
- **消息分配策略**：提供轮询法（RoundRobin）、平均分配（Average Allocation）等多种策略，可修改以适配业务需求。
- **Rebalance 触发机制**：消费者实例数量变化时，自动触发该机制重新分配消息队列。新实例加入会分配部分队列，实例宕机则其负责的队列会被重新分配给剩余实例。
- **消费进度**：每个消费者实例本地或远程保存消费进度（Offset），消息消费后更新进度，防止重复消费或丢失。
- **定时任务**：内部每 20 秒触发一次定时任务，根据消费者组变化重新平衡消息队列分配。

RocketMQ 的消费负载均衡机制保障了系统的可扩展性和高可用性，避免消费者实例过载或空闲，提升整体性能。

### 【中等】RocketMQ 的 NameServer 有什么作用？⭐⭐

NameServer 是 RocketMQ 的路由注册中心，**负责管理所有 Broker 的路由信息，为生产者和消费者提供服务发现功能**。

**主要功能**：

- **集群部署，互不通讯**：每个 NameServer 实例独立，不互相交换数据
- **全量路由信息**：每个 NameServer 都保存**完整的集群路由信息**
- **无主设计**：所有实例平等，无单点故障

::: info NameServer 服务发现

:::

- Broker 启动，每 30 秒向所有 NameServer 注册路由信息

- Broker 向所有 NameServer 发送心跳，心跳包含：Broker 信息 + 负责的所有 Topic 列表

- NameServer 更新 Broker 最后心跳时间

::: info NameServer 多活架构

:::

NameServer 通过多活架构，来保证可用性：

- NameServer 若宕机，Broker 继续向其他 NameServer 发送心跳
- Producer/Consumer 连接其他 NameServer 获取路由

### 【中等】为什么 RocketMQ 不用 ZooKeeper，而是自己开发 NameServer？⭐⭐

::: info 为什么不用 Zookeeper 作为注册中心

:::

**ZooKeeper 的强一致性保障带来了不必要的性能和复杂度开销，而消息队列的路由发现场景本身是一个更注重高可用和高性能的 AP 场景**。

- **ZooKeeper (CP)**：**太重**。为强一致性牺牲性能，功能冗余，运维复杂。
- **NameServer (AP)**：**专为消息队列设计**。轻量、无状态、节点间无同步，实现最终一致性，延迟极低。

概括来说，核心是为了**简单、高效、专注**。

::: info 为什么开发 NameServer?

:::

NameServer 集群中所有节点平等，无需主从复制、故障转移。因此，它有以下好处：

- **更轻量，已部署**
- **性能更好**：无主从，因此避免了 zk 主节点集中负责写操作的瓶颈问题
- **可用性高**：NameServer 无需故障转移，只要有一个节点存在，服务依然可用；Zk 需要集群半数以上节点存活才可用。
- **无持久化存储**（重启后依赖 Broker 重新注册）

::: info ZooKeeper vs. RocketMQ 方案

:::

| **场景**             | **ZooKeeper**             | **RocketMQ 选择**                 |
| -------------------- | ------------------------- | --------------------------------- |
| **注册中心读写频率** | 低频（秒级）              | 高频（毫秒级 Broker 心跳）        |
| **节点规模**         | 适合中小集群（<100 节点） | 支持大规模集群（数千节点）        |
| **吞吐量**           | 写性能受限（需全局有序）  | 自研 NameServer（无强一致性要求） |

## RocketMQ 可靠传输

### 【困难】如何保证 RocketMQ 消息不丢失？⭐⭐⭐

需从**生产、存储、消费**三个核心阶段分别采取措施。

::: info 生产：确保消息成功送达 Broker

:::

- **发送 ACK**：发送后等待 Broker 确认响应，仅收到 “发送成功” 确认才算完成，失败时触发重试（避免异步 / 单向发送的 “无反馈” 风险）。
- **合理配置发送参数**：设置合适的发送超时时间（平衡效率与可靠性），超时未确认则重试。
- **关键场景用事务消息**：核心业务（如下单）通过 “半事务消息 + 本地业务确认” 机制，确保本地业务成功后，消息才被 Broker 标记为可消费，避免 “业务成功但消息未发” 的丢失。

::: info 存储：确保 Broker 不丢消息

:::

- **主从复制**：Master 负责写入，Slave 实时同步数据；Master 故障时 Slave 可切换，避免单点故障导致数据丢失。
- **同步刷盘**：消息写入后立即刷盘（而非仅存内存），刷盘成功才向 Producer 确认，杜绝 “Broker 宕机导致内存消息丢失”。
- **磁盘监控与配额**：设置磁盘空间预警，避免磁盘满导致消息无法写入；实时监控 Broker 状态，及时处理存储异常。

::: info 消费：确保消息被成功处理

:::

- **手动确认消费（ACK）**：仅当业务逻辑处理完成（如数据入库、状态更新），才向 Broker 发送消费确认；未确认的消息会被 Broker 重新投递。
- **失败重试 + 死信队列**：消费失败时，消息自动进入重试队列，超过重试阈值（可配，默认 16 次），消息进入死信队列。

### 【困难】如何保证 RocketMQ 消息不重复？⭐⭐⭐

RocketMQ 的消息保障机制（重试、重投）必然会导致消息可能被重复消费，因此必须在**消费端**解决此问题。

保证 RocketMQ 消息不重复的主要方法：

| 方法             | 核心思想                                                                       | 实现方式举例                                                                                                                                                                           | 优点                                       | 适用场景                                           |
| :--------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- | :------------------------------------------------- |
| **消费端幂等性** | **核心方法**<br>处理逻辑本身具备幂等性，即同一消息处理多次的结果与处理一次相同 | 数据库唯一约束插入（如订单 ID）<br>乐观锁更新状态（如`update table set status = 'paid' where id = 1 and status = 'unpaid'`）<br>读写操作天然幂等（如`select`、`update set value = 1`） | **最优雅、高效**<br>不依赖存储，性能损耗小 | **首选方案**，适用于绝大多数业务，如交易、状态更新 |
| **消息状态记录** | **兜底方案**<br>消费前检查全局状态，判断消息是否已被处理过                     | 创建**去重表**，以消息唯一键（如`MessageId`）作为主键，消费前尝试插入，插入成功才处理<br>使用 Redis 等缓存，以消息 ID 为 Key 记录消费状态                                              | **简单、直接**，可靠性高                   | 幂等性难以实现的复杂业务；与 DB 操作强关的场景     |
| **优化重试机制** | **辅助手段**<br>减少不必要的重复消费触发源头                                   | 设置合理的**最大重试次数**（非无限重试）<br>避免消费者进程频繁异常重启，以减少消息被退回 Broker 重试的次数                                                                             | 从源头降低重复概率                         | 作为前两种方法的辅助优化                           |

### 【困难】如何保证 RocketMQ 消息有序？⭐⭐⭐

RocketMQ 可以保证消息在同一队列中有序，但无法保证全局所有消息有序。

**生产者要点**

- **选择队列**：使用 `MessageQueueSelector` 接口。
- **路由策略**：根据“业务标识”（如 `orderId`）进行**哈希取模**，确保同一组消息始终发送到**同一个 MessageQueue**。
- **发送方式**：使用**同步发送**，保证前一条消息发送成功后再发下一条。

**消费者要点**

- **使用顺序监听器**：注册 `MessageListenerOrderly`。
- **单线程消费者**：
  - **队列锁**：同一队列只会被一个消费线程占用，防止并发。
  - **顺序处理**：队列消息**串行消费**，前一批处理成功后才处理下一批。
- **消费结果**：
  - 返回 `SUCCESS`：继续消费下一条。
  - 返回 `SUSPEND_CURRENT_QUEUE_A_MOMENT`：暂停当前队列，等待重试。

**注意事项**

- **队列数固定**：Topic 的 **MessageQueue 数量一旦创建不可变更**，否则会破坏路由顺序。
- **避免顺序失效**：
  - 禁止使用异步发送。
  - 消费逻辑需**幂等**，避免因异常重试阻塞后续消息。
- **性能与设计**：
  - 不同业务使用不同 Topic 隔离。
  - 警惕“热点”订单，可通过更细粒度的标识（如订单 ID+明细 ID）打散消息。

### 【困难】如何处理 RocketMQ 消息积压？⭐⭐

处理 MQ 消息积压的核心思路是 **“快速消费存量+优化生产速率”**，需结合监控、扩容、降级等手段综合治理。

大致可以归纳为：

- **短期**：扩容+降级，优先恢复服务。
- **长期**：优化消费逻辑+批处理，预防再次积压。
- **口诀**：**监控早发现，扩容扛流量，消费改批量，生产限流速**。

::: info 快速消费积压消息

:::

- **增加消费者实例**：横向扩展消费者服务（如 Kubernetes 动态扩容 Pod），注意分区数限制（Kafka 需提前规划足够分区）。
- **提升消费并行度**：
  - 调整消费者并发参数（如 Kafka 的 `max.poll.records`、RabbitMQ 的 `prefetch_count`）。
  - 多线程消费（需保证无顺序要求的场景）。
- **临时降级**：非核心业务暂停消费（如日志处理），集中资源处理核心业务消息。

::: info 优化消费能力

:::

- **批量处理**：合并多条消息一次处理（如数据库批量插入）。
- **异步化+削峰**：消费者将消息存入内存队列，后台线程异步处理，避免同步阻塞。
- **跳过非关键逻辑**：临时关闭日志记录、数据校验等非必要操作。

::: info 控制生产端流量

:::

- **限流**：生产端启用速率限制（如 Kafka 的 `quota`、Redis 令牌桶）。
- **削峰填谷**：消息先写入缓存层（如 Redis List），再匀速写入 MQ。
- **业务降级**：高峰期关闭非核心功能的消息生产（如暂停推荐系统更新）。

::: info 监控与告警

:::

- **实时监控指标**：
  - 队列堆积量（如 Kafka 的 `lag`）、消费速率（TPS）、消费者状态。
  - 设置阈值告警（如积压超过 10W 条触发短信通知）。
- **根因分析工具**：
  - 日志分析（消费者卡顿、GC 问题）。
  - 链路追踪（如 SkyWalking 定位慢消费）。

::: info 长期预防措施

:::

- **容量规划**：根据业务峰值预先扩容分区/队列（如 Kafka 分区数 = 消费者数 × 1.5）。
- **死信队列+重试机制**：处理失败的消息转入死信队列，避免阻塞正常消费。
- **自动化扩缩容**：基于积压指标动态调整消费者数量（如 K8s HPA）。

::: info 主流 MQ 处理

:::

| 消息队列     | 关键操作                                |
| ------------ | --------------------------------------- |
| **Kafka**    | 增加分区+消费者，调整 `fetch.max.bytes` |
| **RabbitMQ** | 镜像队列扩容，提高 `prefetch_count`     |
| **RocketMQ** | 消费组扩容，启用定时消息延迟消费        |

### 【中等】RocketMQ 中如何配置并发消费和顺序消费？⭐

::: important 要点

RocketMQ 中配置并发消费和顺序消费的主要区别在于**消费者注册的消息监听器**。

| 消费方式     | 监听器接口                    | 核心特性                                                           |
| :----------- | :---------------------------- | :----------------------------------------------------------------- |
| **并发消费** | `MessageListenerConcurrently` | 消费者内部使用线程池**并发处理**消息，最大化吞吐量，**不保证顺序** |
| **顺序消费** | `MessageListenerOrderly`      | 对**每个消息队列**加锁，**顺序地、单线程地**处理该队列中的消息     |

:::

::: info 并发消费 vs. 顺序消费

:::

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
                // 模拟业务处理。..
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
                // 处理业务逻辑。..

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

## RocketMQ 架构

### 【简单】RocketMQ 如何实现消息过滤？⭐

| 方式           | 实现原理                                                        | 特点                                                     | 适用场景                                                       |
| :------------- | :-------------------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------- |
| **Tag 过滤**   | 生产者给消息打上**标签**，消费者按**标签匹配**订阅。            | **简单高效**，但信息量有限，灵活性低。                   | 简单的消息分类，如按业务类型（"ORDER"、"PAYMENT"）过滤。       |
| **SQL92 过滤** | 生产者给消息设置**自定义属性**，消费者使用** SQL 表达式**订阅。 | **灵活强大**，支持复杂规则，但**消耗更多 Broker 资源**。 | 需要复杂业务逻辑过滤，如 `amount > 100 AND type = 'PAYMENT'`。 |

**执行位置**：两种过滤均在 **Broker 端** 完成，确保网络传输效率。

**选择建议**：

- 绝大多数场景下，优先使用 **Tag 过滤**，因其性能开销最小。
- 只有当过滤逻辑需要基于消息内容或多个属性进行复杂判断时，才使用 **SQL92 过滤**。

### 【简单】RocketMQ 支持哪几种消息传输模式？⭐

RocketMQ 支持推（Push）和拉（Pull）两种消费传输模式

| 模式              | 控制方            | 工作原理                                          | 核心特点                                                             |
| :---------------- | :---------------- | :------------------------------------------------ | :------------------------------------------------------------------- |
| **推模式 (Push)** | **Broker 主导**   | Broker 在收到消息后，**主动**将消息推送给消费者。 | **高实时性**，延迟极低。简化客户端逻辑，像是一个“事件驱动”模型。     |
| **拉模式 (Pull)** | **Consumer 主导** | Consumer **主动**、**轮询**地向 Broker 请求消息。 | **灵活性高**，消费节奏完全由客户端控制，便于实现批量处理等复杂逻辑。 |

### 【中等】RocketMQ 如何实现延迟消息？⭐

RocketMQ 的延迟消息采用 **多级时间轮 + 定时任务扫描** 实现，非实时投递而是延迟触发。

::: info RocketMQ 延迟消息工作流程

:::

1. **设置延迟级别**
   - Producer 发送消息时指定 `delayTimeLevel`（如 `3` 表示延迟 10 秒）
   - 支持 18 个固定延迟级别（1s/5s/10s/30s/1m...2h）
2. **延迟存储**
   - Broker 将延迟消息存入 **专用 Topic**（`SCHEDULE_TOPIC_XXXX`）
   - 按延迟级别分队列（如 `delayLevel=3` 的消息存入 `SCHEDULE_TOPIC_XXXX` 的 Queue3）
3. **定时扫描**
   - **时间轮算法** 管理延迟队列
   - 每秒扫描对应队列，将到期消息 **重新投递** 到目标 Topic
4. **消息投递**
   - 到期后，Broker 将消息从延迟 Topic 转移到原始 Topic
   - Consumer 正常消费

**示例代码**

```java
Message msg = new Message("TestTopic", "Hello Delay".getBytes());
msg.setDelayTimeLevel(3); // 设置延迟级别 3（对应 10 秒）
producer.send(msg);
```

::: info RocketMQ 延迟消息关键设计

:::

| **组件**          | **作用**                                   |
| ----------------- | ------------------------------------------ |
| **ScheduleTopic** | 存储所有延迟消息（内部 Topic，对用户透明） |
| **TimerWheel**    | 高效触发延迟任务（O(1) 时间复杂度）        |
| **定时线程**      | 每秒扫描时间轮，将到期消息移出延迟队列     |

**特点**

- **固定延迟级别**：不支持任意时间精度（如 23 秒）
- **投递误差**：±1 秒（依赖扫描间隔）
- **高吞吐**：时间轮算法避免遍历所有消息

**注**：RocketMQ 5.0+ 支持 **定时消息**（精确到毫秒），底层改用时间戳+哈希分片。

### 【中等】RocketMQ 的消息轨迹如何启用？

- **作用**：跟踪消息的完整生命周期（生产、存储、消费）。
- **实现方式**：轨迹数据本身作为消息存储在内部 Topic（默认 `RMQ_SYS_TRACE_TOPIC`）。

::: info 消息轨迹启用步骤

:::

**Broker 端**

- **修改配置**：在 `broker.conf` 中添加 `traceTopicEnable=true`
- **重启生效**：修改后必须重启 Broker

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

1. **查看轨迹 Topic**：在控制台确认 `RMQ_SYS_TRACE_TOPIC` 存在
2. **查询具体消息**：在控制台 Message 页面：
   - 输入 Message ID/Key 搜索
   - 点击 **Trace** 按钮查看详细轨迹图

**注意事项**

- **性能开销**：会带来额外的 CPU/网络消耗和存储占用
- **存储成本**：轨迹数据占用磁盘空间，需监控清理
- **生产建议**：推荐开启，便于问题排查（消息丢失、重复、消费慢等）

## RocketMQ 事务

### 【中等】RocketMQ 如何实现幂等性？⭐

**RocketMQ 不提供内置幂等性**，需由业务系统自行实现。

- **幂等键设计**：
  - 使用**业务唯一标识**（如 `orderId`），而非 `messageId`
  - 推荐格式：`业务类型：业务 ID`（如 `order_pay:123`）

- **处理流程**：
  - 先检查幂等键 → 再执行业务逻辑
  - 业务操作与幂等记录写入必须在同一事务中

- **选型建议**：
  - **核心业务**：首选数据库唯一键方案
  - **高并发场景**：可选用 Redis 方案
  - **状态业务**：状态机方案作为补充保障

### 【困难】事务消息是如何工作的？⭐⭐⭐

MQ 事务方案本质是利用 MQ 功能实现的本地消息表。事务消息需要消息队列提供相应的功能才能实现，Kafka 和 RocketMQ 都提供了事务相关功能。

- **Kafka** 的解决方案是：直接抛出异常，让用户自行处理。用户可以在业务代码中反复重试提交，直到提交成功，或者删除之前修改的数据记录进行事务补偿。
- **RocketMQ** 的解决方案是：通过事务反查机制来解决事务消息提交失败的问题。如果 Producer 在提交或者回滚事务消息时发生网络异常，RocketMQ 的 Broker 没有收到提交或者回滚的请求，Broker 会定期去 Producer 上反查这个事务对应的本地事务的状态，然后根据反查结果决定提交或者回滚这个事务。为了支撑这个事务反查机制，业务代码需要实现一个反查本地事务状态的接口，告知 RocketMQ 本地事务是成功还是失败。

::: info RocketMQ 事务消息实现
:::

事务消息是 Apache RocketMQ 提供的一种困难消息类型，支持在分布式场景下保障消息生产和本地事务的最终一致性。

![](https://raw.githubusercontent.com/dunwu/images/master/202509282123347.png)

**事务消息处理流程**

1. 生产者将消息发送至 Apache RocketMQ 服务端。
2. Apache RocketMQ 服务端将消息持久化成功之后，向生产者返回 Ack 确认消息已经发送成功，此时消息被标记为"暂不能投递"，这种状态下的消息即为半事务消息。
3. 生产者开始执行本地事务逻辑。
4. 生产者根据本地事务执行结果向服务端提交二次确认结果（Commit 或是 Rollback），服务端收到确认结果后处理逻辑如下：
   - 二次确认结果为 Commit：服务端将半事务消息标记为可投递，并投递给消费者。
   - 二次确认结果为 Rollback：服务端将回滚事务，不会将半事务消息投递给消费者。
5. 在断网或者是生产者应用重启的特殊情况下，若服务端未收到发送者提交的二次确认结果，或服务端收到的二次确认结果为 Unknown 未知状态，经过固定时间后，服务端将对消息生产者即生产者集群中任一生产者实例发起消息回查。 **说明** 服务端回查的间隔时间和最大回查次数，请参见 [参数限制](https://rocketmq.apache.org/zh/docs/introduction/03limits)。
6. 生产者收到消息回查后，需要检查对应消息的本地事务执行的最终结果。
7. 生产者根据检查到的本地事务的最终状态再次提交二次确认，服务端仍按照步骤 4 对半事务消息进行处理。

::: info 本地消息表 vs. 事务消息
:::

- **本地消息表**：**业务与消息耦合**，通过**数据库+自研任务**保证可靠性。
- **RocketMQ 事务消息**：**业务与消息解耦**，通过** MQ 框架机制**保证可靠性。

**本地消息表 vs. 事务消息**

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

## 参考资料

- [面试鸭 - RocketMQ 面试](https://www.mianshiya.com/bank/1850081899830079490)