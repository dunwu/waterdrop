---
icon: logos:rabbitmq-icon
title: RabbitMQ 面试
date: 2025-09-19 08:22:21
categories:
  - 分布式
  - 分布式通信
  - MQ
tags:
  - 分布式
  - 通信
  - MQ
  - RabbitMQ
  - 面试
permalink: /pages/5eea3123/
---

# RabbitMQ 面试

## RabbitMQ 简介

### 【简单】RabbitMQ 是什么？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 基础概念

#### 💎 关键结论

RabbitMQ 是基于 AMQP 协议、用 Erlang 实现的开源消息中间件，由 Broker 通过「交换机 + 绑定 + 队列」完成消息的接收、路由与存储。选它是因为投递可靠（Confirm + 持久化 + 仲裁队列）、路由灵活、延迟低，适合解耦、削峰、异步化等业务消息场景。

#### ⚡记忆卡片

- **口诀**：一协议（AMQP）、一代理（Broker）、路由三件套（交换机—绑定—路由键）
- **关键词**：AMQP ／ Broker ／ Exchange ／ Queue ／ Binding ／ Routing Key ／ VHost
- **链路**：生产者带路由键发消息 → 交换机按绑定规则匹配 → 消息进入一个或多个队列 → 消费者订阅消费 → 手动 ACK → Broker 删除消息

#### 📖 核心知识

RabbitMQ 是一个开源的消息队列中间件，基于 AMQP（Advanced Message Queuing Protocol，高级消息队列协议）标准实现。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/9249144112254111998aea81eb34999f.png)

**RabbitMQ 的核心概念**

- **生产者（Producer）**：发送消息的应用。
- **消费者（Consumer）**：接收和处理消息的应用。
- **消息代理（Broker）**：负责接收、路由和存储消息。
- **交换机（Exchange）**：消息路由中心，根据规则将消息发到不同队列。
- **队列（Queue）**：存储消息的缓冲区。
- **绑定（Binding）**：定义交换机与队列的映射关系（含路由键规则）。
- **路由键（Routing Key）**：生产者发送时指定的关键字，用于交换机匹配队列。
- **虚拟主机（VHost）**：逻辑隔离单元（类似命名空间），不同 VHost 的队列/交换机互不可见。
- **死信队列（DLX）**：用于存放处理失败或过期消息的“垃圾回收站”或“隔离分析区”。
- **AMQP**：RabbitMQ 的核心通信协议，定义消息格式与交互规则。

### 【简单】RabbitMQ 有哪些核心组件？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 架构组件

#### 💎 关键结论

RabbitMQ 的核心组件可概括为「三类角色 + 一条链路」：生产者/消费者/Broker 三类角色，消息沿 Producer → Exchange →（Binding）→ Queue → Consumer 链路流动，而 Connection/Channel 承载通信、VHost 承载隔离。记住这条链路就能串起全部组件。

#### ⚡记忆卡片

- **口诀**：生产消费靠 Broker，路由绑定连队列，连接信道走消息，虚拟主机做隔离
- **关键词**：Producer ／ Consumer ／ Exchange ／ Queue ／ Binding ／ Routing Key ／ Virtual Host ／ Connection ／ Channel
- **链路**：Producer 经 Connection 上的 Channel 发消息 → Exchange 依据 Binding 与 Routing Key 路由 → Queue 存储 → Consumer 经 Channel 拉取/推送消费

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/73e008a437134e34b76b8ac46682219a.png)

RabbitMQ 的基本架构主要由以下核心组件组成：

- **Producer（生产者）**：负责发送消息到交换机。
- **Consumer（消费者）**：接收并处理队列中的消息。
- **Exchange（交换机）**：接受并路由消息到队列，根据绑定键将消息分配到一个或多个队列。
- **Queue（队列）**：消息的存储地点，消费者从队列中读取消息。
- **Binding（绑定）**：定义交换机和队列之间的路由规则。
- **Routing Key（路由键）**：用于交换机到队列的路由规则。
- **Virtual Host（虚拟主机）**：逻辑分组，用于隔离不同应用的资源。
- **Connection（连接）**：RabbitMQ 的客户端与服务器之间的网络连接。
- **Channel（信道）**：在连接中的虚拟连接，进行消息的读写操作。

### 【简单】RabbitMQ 的 routing key 和 binding key 的最大长度是多少字节？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 消息路由

#### 💎 关键结论

Routing Key 与 Binding Key 的最大长度都是 **255 字节**，超限会抛出异常。理由：AMQP 协议中 short-string 的长度上限即 255 字节，RabbitMQ 沿用了这一约束。

#### ⚡记忆卡片

- **口诀**：路由绑定二五五，Direct 精确、Topic 通配、Headers 看头
- **关键词**：255 字节 ／ Routing Key ／ Binding Key ／ Direct ／ Topic ／ Headers
- **链路**：生产者指定 Routing Key → 交换机取 Binding Key 匹配（精确/通配/消息头）→ 命中则入队，未命中则按 mandatory 策略处理

#### 📖 核心知识

**长度限制**

- **最大 255 字节**（超限会抛出异常）。
- 适用于 **Routing Key**（生产者指定）和 **Binding Key**（队列绑定交换机时指定）。

**匹配规则（不同交换机类型）**

| **交换机类型** | **匹配方式**                                 | **示例**                             |
| -------------- | -------------------------------------------- | ------------------------------------ |
| **Direct**     | 完全匹配                                     | `routing_key == binding_key`         |
| **Topic**      | 通配符匹配（`*` 匹配一个词，`#` 匹配多个词） | `*.order.#` 匹配 `user.order.create` |
| **Headers**    | 不依赖 Routing Key，基于消息头键值对匹配     | `x-match: all/any`                   |

**最佳实践**

- **保持简短**：避免接近 255 字节，提升性能。
- **命名规范**：如 `{服务}.{模块}.{事件}`（例：`user.order.paid`）。
- **Topic 通配符**：合理使用 `*` 和 `#`，避免过度复杂。

> ⚠️ **注意**：Headers 交换机忽略 Routing Key，仅依赖消息头（Headers）匹配。

### 【中等】RabbitMQ 中 Connection 和 Channel 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 客户端通信

#### 💎 关键结论

Connection 是客户端与 Broker 之间的 TCP 物理连接，开销大；Channel 是 Connection 上的轻量逻辑信道，所有 AMQP 操作都在 Channel 上完成。原因是 TCP 建连昂贵且操作系统限制连接数，用多 Channel 复用一条连接才能兼顾性能与隔离。

#### ⚡记忆卡片

- **口诀**：连接物理信道虚，一线一信道，长连复用不能少
- **关键词**：TCP 物理连接 ／ 虚拟信道 ／ 多路复用 ／ 线程隔离 ／ 长连接
- **链路**：建立 TCP Connection（三次握手）→ 按需创建多个 Channel → 各线程独占 Channel 收发 → Channel 关闭而 Connection 保留 → 应用停机才断连

#### 📖 核心知识

- **Connection**：客户端与 Broker 之间的 **TCP 物理连接**，开销大（建连、握手、心跳维护）。
- **Channel**：Connection 上的 **虚拟连接**（逻辑信道），AMQP 操作（发布、消费、声明队列）都在 Channel 上进行。

**为什么要引入 Channel？**

- **TCP 连接昂贵**：每次创建 TCP 连接都需要三次握手，且操作系统对连接数有限制。
- **多路复用**：一个 Connection 上可以创建多个 Channel，共享 TCP 连接，减少网络开销。
- **线程隔离**：多线程环境下，每个线程使用独立的 Channel，避免并发冲突。

**使用建议**

| 场景                 | 建议                                                                    |
| :------------------- | :---------------------------------------------------------------------- |
| **短连接 vs 长连接** | 生产环境**必须使用长连接**，避免频繁建连                                |
| **Channel 复用**     | 不要每次操作都创建 Channel，应复用                                      |
| **线程与 Channel**   | **每个线程独占一个 Channel**，Channel 不是线程安全的                    |
| **Connection 池**    | 高并发场景使用连接池（如 Spring AMQP 的 `CachingConnectionFactory`）    |
| **Channel 数量**     | 单 Connection 上 Channel 数不宜过多（建议 ≤ 100），否则增加 Broker 压力 |

::: details 案例：长连接 + 多 Channel 的正确用法（Java）

```java
// 正确用法：长连接 + 多 Channel
Connection connection = factory.newConnection(); // 复用连接
Channel channel1 = connection.createChannel();   // 线程1 使用
Channel channel2 = connection.createChannel();   // 线程2 使用
// 使用完毕后关闭 Channel，但保持 Connection
channel1.close();
channel2.close();
connection.close(); // 应用关闭时才关闭连接
```

:::

#### 🔬 扩展知识

**【L3】Channel 上限与资源协商**

::: details

客户端与 Broker 在连接握手时通过 `channel_max`、`frame_max`、`heartbeat` 三个参数协商资源上限。`channel_max` 限定单连接最大 Channel 数（0 表示无限制，服务端通常配置上限），每个 Channel 在 Broker 端对应独立的 Erlang 进程与状态，Channel 过多会放大 Broker 的进程与内存压力，这也是「单连接 Channel 不宜过多」的底层原因。

:::

**【L4】多路复用设计的类比**

::: details

Connection/Channel 的「一条物理连接复用多个逻辑流」与 HTTP/2 的 Connection/Stream、TCP/IP 的端口复用是同一思想：把昂贵的内核级资源（socket、文件描述符）收敛到少量物理连接上，用轻量的协议级逻辑单元承载并发。理解这一点可以解释为什么 RabbitMQ 官方 Java 客户端中 Connection 是线程安全的而 Channel 不是——复用层做全局协调，逻辑层为性能放弃锁。

:::

> 📚 延伸阅读：[RabbitMQ Connections 官方文档](https://www.rabbitmq.com/connections.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “每次发消息都新建一个 Connection，用完就关” → 错误。TCP 建连 + AMQP 握手开销大，且 Broker 对连接数敏感，必须长连接复用，频繁建连是 RabbitMQ 客户端最常见的性能反模式。
- ❌ “多个线程共享一个 Channel 加锁就行” → 不推荐。即使加锁保证正确性，串行化也抹掉了并发收益，且 Channel 异常会波及所有线程；正确做法是每线程独占 Channel。
- ❌ “Channel 和 Connection 一样重，都要池化” → 不准确。需要池化（或缓存）的主要是 Connection；Channel 创建成本低，按需创建、用完关闭即可，Spring AMQP 中也是缓存 Connection、按需创建 Channel。

:::

#### 🔀 发散问题

1. Channel 为什么不是线程安全的？
   Channel 内部维护发布序号、未确认消息表等有状态结构，多线程并发写入会破坏帧的完整性与序号连续性。官方客户端选择不在 Channel 内加锁，把并发控制权交给使用者（每线程一个 Channel），以换取单线程场景下的极致性能。
2. Spring AMQP 中如何配置连接与 Channel 的缓存？
   `CachingConnectionFactory` 默认缓存 Connection 并按需缓存 Channel，可通过 `connectionCacheSize`、`channelCacheSize` 调整缓存规模；当 Channel 缓存不够时会频繁开关 Channel，可观察 `channelCacheSize` 命中率来调优。
3. 消息的发布与消费分别在什么层完成？
   见本文档『RabbitMQ 如何实现消息路由？』：发布走 Exchange 路由，消费走 Queue 订阅，二者都以 Channel 为操作入口。

## RabbitMQ 存储

### 【中等】RabbitMQ 中的持久化队列与非持久化队列有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 存储与持久化

#### 💎 关键结论

持久化队列把元数据与消息落盘，Broker 重启后消息保留，代价是写盘带来的性能下降；非持久化队列纯内存、性能极高，但重启即丢。本质是在消息「可靠性」与「性能」之间做选择。

#### ⚡记忆卡片

- **口诀**：持久落盘保可靠，内存队列拼性能，durable 一键切换
- **关键词**：持久化队列 ／ 非持久化队列 ／ 磁盘 ／ 内存 ／ durable
- **链路**：声明队列 durable=true → 消息写入后落盘 → Broker 重启仍可恢复 → 反之内存队列重启即清空

#### 📖 核心知识

RabbitMQ 提供持久化队列和非持久化队列两种队列类型，主要区别在于消息存储方式及服务器重启或崩溃时的行为：

| 特性                | 持久化队列               | 非持久化队列                       |
| :------------------ | :----------------------- | :--------------------------------- |
| **存储位置**        | 磁盘                     | 内存                               |
| **服务器重启/崩溃** | **消息保留**，确保不丢失 | **消息全部丢失**                   |
| **性能**            | 较低（因需写磁盘）       | **极高**（内存操作）               |
| **适用场景**        | 要求**消息可靠性**的场景 | 允许消息丢失，追求**高性能**的场景 |

- **核心权衡**：在消息的“可靠性”与“性能”之间做选择。
- **生效前提**：队列持久化只保证队列元数据存在，消息不丢还需配合消息持久化（`deliveryMode=2`），详见本文档『RabbitMQ 如何持久化？』。

#### 🔬 扩展知识

**【L3】惰性队列（Lazy Queue）的中间形态**

::: details

RabbitMQ 提供惰性队列（`x-queue-mode=lazy`）：消息一到达就直接写入磁盘，内存中只保留极少量索引，可支撑千万级消息堆积而不触发内存告警；代价是消费时每条消息都要读盘，吞吐显著下降。它是「内存队列」与「磁盘队列」之间的第三种形态，适合消化存量积压而非高吞吐实时消费。

:::

**【L4】仲裁队列的存储模型**

::: details

仲裁队列（Quorum Queue，3.8 引入）没有「持久化开关」——消息默认全部持久化并基于 Raft 协议复制到多数派节点落盘后才确认，用协议层的一致性换取可靠性。对比可见存储模型的演进：非持久化（纯内存）→ 持久化（单机落盘）→ 惰性（磁盘优先）→ 仲裁（多副本强一致落盘）。

:::

> 📚 延伸阅读：[RabbitMQ Lazy Queues 官方文档](https://www.rabbitmq.com/lazy-queues.html)

#### 🔀 发散问题

1. 持久化队列里的消息就一定不丢吗？
   不一定。持久化消息到达队列后会尽快写盘，但存在短暂批量窗口，单节点在该窗口内崩溃仍可能丢；真正堵死该窗口的是仲裁队列的多数派落盘确认。详见本文档『RabbitMQ 如何保证消息不丢失？』。
2. 非持久化队列有什么实际用途？
   适合可丢弃的临时数据，如实时行情快照、监控埋点缓冲、测试环境的临时通道——用内存性能换取时效性，丢消息不影响业务正确性。

### 【中等】RabbitMQ 如何持久化？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 存储与持久化

#### 💎 关键结论

RabbitMQ 持久化是把消息和队列元数据保存到磁盘，需要「队列 durable + 消息 deliveryMode=2 + 交换机 durable」三处同时配置才完整生效。原因是任何一环缺失都会在重启后造成元数据或消息丢失，尤其仅消息持久化而队列非持久化时，重启后队列不存在，消息照样丢。

#### ⚡记忆卡片

- **口诀**：队列交换机 durable，消息 deliveryMode=2，三件套缺一即漏
- **关键词**：durable=true ／ deliveryMode=2 ／ 队列持久化 ／ 消息持久化 ／ 交换机持久化
- **链路**：声明队列/交换机 durable=true → 发送消息 deliveryMode=2 → Broker 写盘 → 重启后恢复元数据与消息

#### 📖 核心知识

**RabbitMQ 持久化是将消息和队列元数据保存到磁盘，确保服务重启后数据不丢失**。实现方法：

| 要素             | 目的                   | 实现方式                     |
| :--------------- | :--------------------- | :--------------------------- |
| **队列持久化**   | 保证队列元数据不丢失   | 声明队列时 `durable=true`    |
| **消息持久化**   | 保证消息内容不丢失     | 发送消息时 `delivery_mode=2` |
| **交换机持久化** | 保证交换机元数据不丢失 | 声明交换机时 `durable=true`  |

- **生效前提**：必须将**持久化消息**发送到**持久化队列**才能生效。仅消息持久化而队列非持久化，重启后消息依然会丢失。
- **性能代价**：持久化需要写磁盘，会显著降低吞吐量，是**可靠性**与**性能**之间的权衡。

#### 🔬 扩展知识

**【L3】持久化的刷盘时机**

::: details

持久化消息到达队列后会尽快写入磁盘，但 RabbitMQ 采用批量/短窗口写入而非每条消息同步 fsync，因此「持久化」承诺的是重启后可恢复，而非写入瞬间的绝对安全——单节点在写盘窗口内崩溃仍可能丢少量消息。要在崩溃场景下也不丢，需要仲裁队列的多数派落盘确认。

:::

**【L4】持久化与仲裁队列的关系**

::: details

仲裁队列（3.8+）的消息天然全部持久化并 Raft 多副本落盘，声明时无需也无法单独设置 deliveryMode 语义上的持久化开关；新项目使用仲裁队列后，「三件套」配置更多是经典队列时代的遗留知识，但面试与存量系统中仍是高频考点。

:::

> 📚 延伸阅读：[RabbitMQ Quorum Queues 官方说明](https://www.rabbitmq.com/quorum-queues.html)

#### 🔀 发散问题

1. 持久化和高可用是一回事吗？
   不是。持久化解决「单节点重启」不丢，高可用（副本）解决「节点故障」不丢，二者正交；完整的可靠性方案是持久化 + 副本 + 确认机制的组合。详见本文档『RabbitMQ 如何实现高可用？』。
2. 为什么默认不对所有消息开启持久化？
   写盘显著降低吞吐并放大磁盘 IO，日志、埋点等可容忍丢失的消息用非持久化 + 内存队列性能可高一个量级以上，应按业务重要性分级配置。

### 【中等】什么是 RabbitMQ 中的虚拟主机（vhost）？有什么作用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 资源隔离

#### 💎 关键结论

vhost 是 RabbitMQ 内部的「命名空间」，每个 vhost 拥有独立的交换机、队列、绑定与权限，用于在同一 Broker 上隔离多个应用或租户。理由是资源隔离 + 权限边界都在 vhost 这一层实现，比逐队列授权简单得多。

#### ⚡记忆卡片

- **口诀**：vhost 即命名空间，资源隔离权限分，默认根号 `/`
- **关键词**：vhost ／ 资源隔离 ／ 权限控制 ／ 多租户 ／ 默认 `/`
- **链路**：创建 vhost → 在其中声明交换机/队列/绑定 → 按 vhost 粒度授权用户 → 不同 vhost 资源互不可见

#### 📖 核心知识

**RabbitMQ 中的虚拟主机（vhost）是逻辑上的隔离概念，用于隔离不同应用或租户**。每个虚拟主机可拥有独立的队列、交换器、绑定、权限等资源，多个独立应用可共存于一台 RabbitMQ 服务器且互不影响，可看作 RabbitMQ 内部的 “命名空间”。

1. **资源隔离**：不同 vhost 有自己的交换器（exchange）、队列（queue）和绑定（binding），资源在不同 vhost 中互不干扰。
2. **安全控制**：通过对 vhost 的不同用户角色进行权限管理，细化资源访问控制。
3. **管理便捷**：使多租户应用管理更便捷，可在同一个 RabbitMQ 实例上运行多个独立应用。

#### 🔬 扩展知识

**【L3】权限模型：三元正则**

::: details

RabbitMQ 的授权以 vhost 为边界，每个用户在每个 vhost 上配置三个正则：configure（可声明/删除哪些资源）、write（可发布到哪些资源）、read（可消费/绑定哪些资源）。这种「vhost + 三元正则」模型使权限管理粒度既足够细，又不必逐队列配置。默认存在 vhost `/`，guest 用户仅能本地访问。

:::

**【L4】vhost 的运维边界**

::: details

vhost 是逻辑隔离而非物理隔离：所有 vhost 共享同一 Broker 的内存、磁盘与连接资源，一个 vhost 的队列积压触发内存水位后仍会阻塞整个节点的所有 vhost。因此核心业务不仅要分 vhost，还应结合节点级隔离（独立集群或独立节点）来划故障域。

:::

> 📚 延伸阅读：[RabbitMQ Virtual Hosts 官方文档](https://www.rabbitmq.com/vhosts.html)

#### 🔀 发散问题

1. vhost 和 Kafka 的 Topic 前缀隔离有什么本质区别？
   vhost 是协议级强隔离（跨 vhost 无法寻址），Kafka 的前缀只是命名约定、无权限强制力；前者适合多租户，后者只是组织手段。
2. vhost 数量有上限吗？
   协议上无硬性上限，但每个 vhost 都有元数据与管理开销，实际受节点内存限制，生产上一般以个位数到十几个为宜，更多隔离需求应拆集群。

## RabbitMQ 生产消费

### 【中等】如何在 RabbitMQ 中声明一个队列？有哪些必要参数？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RabbitMQ / 队列声明

#### 💎 关键结论

声明队列用 `queueDeclare`：不存在则创建，存在则校验参数一致性。五个核心参数中，`durable`、`exclusive`、`autoDelete` 三个布尔位决定了队列的可靠性与生命周期，是最容易答漏的点。

#### ⚡记忆卡片

- **口诀**：名称加三布尔（durable/exclusive/autoDelete），外加 arguments 扩展位
- **关键词**：queueDeclare ／ durable ／ exclusive ／ autoDelete ／ arguments
- **链路**：声明队列 → 不存在则按参数创建 → 存在则校验参数匹配 → 参数冲突抛错 → arguments 决定 TTL/死信等扩展行为

#### 📖 核心知识

- **声明方式**：通过客户端库的`queueDeclare`方法实现，队列不存在则创建，存在则验证参数匹配性
- **核心参数**：
  - **队列名称**：唯一标识，空字符串会生成随机名称
  - **持久化（durable）**：`true`表示队列元数据持久化，重启不丢失
  - **排他性（exclusive）**：`true`表示仅当前连接可见，连接关闭后自动删除
  - **自动删除（autoDelete）**：`true`表示最后一个消费者断开后自动删除
  - **其他参数（arguments）**：可选，用于配置消息过期时间、死信交换机等
- **特性**：根据业务需求（可靠性、生命周期等）配置参数，确保队列行为符合预期

::: details 案例：声明一个持久化队列（Java）

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class DeclareQueueExample {
    public static void main(String[] args) throws Exception {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        // 建立连接和信道
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            // 声明队列
            String queueName = "order_queue";
            boolean durable = true;         // 持久化
            boolean exclusive = false;      // 非排他
            boolean autoDelete = false;     // 不自动删除
            Map<String, Object> arguments = null;  // 无额外参数
            channel.queueDeclare(queueName, durable, exclusive, autoDelete, arguments);
            System.out.println("队列 " + queueName + " 声明成功");
        }
    }
}
```

:::

#### 🔀 发散问题

1. 重复声明同名但参数不同的队列会怎样？
   Broker 不会覆盖，而是抛出 channel 异常（`PRECONDITION_FAILED`）并关闭当前 Channel，这是防止误改存量队列的保护机制。确需改参数只能删除重建（会丢消息）或用 Policy 方式调整。
2. exclusive 和 autoDelete 有什么区别？
   exclusive 绑定到「连接」——仅声明它的连接可见，连接断开即删；autoDelete 绑定到「消费者」——最后一个消费者断开才删。前者用于私有临时队列（如 RPC 回调队列），后者用于订阅型队列。

### 【中等】RabbitMQ 如何实现消息路由？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 消息路由

#### 💎 关键结论

RabbitMQ 的消息路由由交换机（Exchange）完成：生产者从不直接把消息发给队列，而是发给交换机，交换机依据类型与绑定（Binding）规则把消息分发到一个或多个队列。这一设计把「发送」与「分发」解耦，是 RabbitMQ 路由灵活性的根源。

#### ⚡记忆卡片

- **口诀**：消息进交换机，绑定定去向，四类策略各不同
- **关键词**：Exchange ／ Binding ／ Routing Key ／ Direct ／ Fanout ／ Topic ／ Headers
- **链路**：生产者发消息到 Exchange → Exchange 查绑定关系 → 按类型规则匹配 Routing Key → 命中队列入队，未命中按 mandatory 处理

#### 📖 核心知识

RabbitMQ 通过交换机（Exchange）实现消息路由，而非直接发送到队列。交换机接收生产者消息，依据特定策略（路由键）将消息路由到一个或多个队列，其类型和绑定（Binding）规则决定消息流向。RabbitMQ 常见路由策略包括：

- Direct 交换机：消息通过完全匹配路由键进行路由。
- Fanout 交换机：广播消息到所有绑定的队列，不需要路由键。
- Topic 交换机：根据路由键模式匹配进行路由。
- Headers 交换机：根据消息头属性进行路由。

#### 🔬 扩展知识

**【L3】默认交换机与无名路由**

::: details

每个新 vhost 都有一个名为 `""` 的默认 Direct 交换机：发布消息时若 exchange 传空串，Broker 会把消息路由到「与 routing key 同名」的队列。这让简单场景可以跳过显式绑定直接投递，也是 `basicPublish("", "queueName", ...)` 能工作的原因。

:::

**【L4】预定义交换机与 Internal 属性**

::: details

Broker 内置 `amq.direct`、`amq.fanout`、`amq.topic`、`amq.headers` 等预定义交换机；交换机还可声明为 `internal=true`，此类交换机不接受客户端直接发布，只能作为其他交换机的路由目标，用于构建「交换机 → 交换机」的级联路由拓扑。

:::

> 📚 延伸阅读：[AMQP 0-9-1 快速参考](https://www.rabbitmq.com/amqp-0-9-1-quickref.html)

#### 🔀 发散问题

1. 一条消息能同时进入多个队列吗？
   能。Fanout 会广播到所有绑定队列，Topic/Direct 也允许多个队列绑定同一 key；消息是按引用分发的逻辑复制，各队列独立消费互不影响。
2. 路由失败的消息去哪了？
   默认静默丢弃；设置 `mandatory=true` 会退回生产者，或配置备用交换机（AE）兜底。详见本文档『RabbitMQ 中无法路由的消息会去到哪里？』。

### 【中等】RabbitMQ 的四种交换机类型有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：RabbitMQ / 消息路由

#### 💎 关键结论

四种交换机区别在匹配方式：Direct 精确匹配、Fanout 全量广播、Topic 通配符匹配、Headers 按消息头匹配。选型一句话：绝大多数场景用 Topic，点对点用 Direct，广播用 Fanout，尽量别用 Headers（性能最差）。

#### ⚡记忆卡片

- **口诀**：Direct 精确、Fanout 广播、Topic 通配、Headers 看头
- **关键词**：Direct ／ Fanout ／ Topic ／ Headers ／ Routing Key ／ Binding Key ／ x-match
- **链路**：生产者带 Routing Key 发布 → Direct 全等匹配 / Fanout 忽略 key 广播 / Topic 按 `*`、`#` 匹配 / Headers 比对消息头 → 命中队列收消息

#### 📖 核心知识

**四种交换机类型对比**

| **交换机类型** | **路由规则**                                           | **是否需要 Routing Key** | **性能** | **典型应用场景**                        |
| -------------- | ------------------------------------------------------ | ------------------------ | -------- | --------------------------------------- |
| **Direct**     | **精确匹配** Routing Key == Binding Key                | 是                       | 高       | 点对点消息、日志分级（error/warn/info） |
| **Fanout**     | **广播** 到所有绑定的队列，忽略 Routing Key            | 否                       | **最高** | 事件广播、系统通知                      |
| **Topic**      | **模式匹配**，支持通配符 `*`（一个词）和 `#`（多个词） | 是                       | 中       | 复杂路由、多维度消息分类                |
| **Headers**    | 基于**消息头**键值对匹配，忽略 Routing Key             | 否                       | **最低** | 需要多条件匹配的复杂路由                |

**Direct Exchange（直连交换机）**

- **路由规则**：消息的 `routing_key` 与队列绑定的 `binding_key` **完全一致** 时，消息才会被路由到该队列。
- **特点**：简单、高效，支持一个路由键绑定多个队列。
- **示例**：
  - 队列 Q1 绑定 `binding_key = "error"`，队列 Q2 绑定 `binding_key = "info"`。
  - 生产者发送 `routing_key = "error"` 的消息 → 进入 Q1。
  - 生产者发送 `routing_key = "info"` 的消息 → 进入 Q2。
- **应用场景**：日志分级处理（不同级别的日志路由到不同队列）。

**Fanout Exchange（扇出交换机）**

- **路由规则**：**广播** 消息到所有绑定的队列，**完全忽略** `routing_key`。
- **特点**：性能最高（无需匹配），每个绑定的队列都会收到全量消息。
- **示例**：
  - 队列 Q1、Q2、Q3 都绑定到 Fanout Exchange。
  - 生产者发送一条消息 → Q1、Q2、Q3 **都收到**该消息。
- **应用场景**：事件广播（如用户注册后同时通知邮件服务、短信服务、积分服务）。

**Topic Exchange（主题交换机）**

- **路由规则**：基于**模式匹配**，`routing_key` 和 `binding_key` 都是用 `.` 分隔的字符串，支持通配符：
  - `*`：匹配**一个**单词（如 `order.*` 匹配 `order.create` 但不匹配 `order.create.success`）。
  - `#`：匹配**零个或多个**单词（如 `order.#` 匹配 `order`、`order.create`、`order.create.success`）。
- **特点**：灵活性最高，是**最常用**的交换机类型。
- **示例**：
  - Q1 绑定 `binding_key = "order.*"`，Q2 绑定 `binding_key = "order.create.#"`。
  - 发送 `routing_key = "order.create"` → Q1、Q2 **都收到**。
  - 发送 `routing_key = "order.create.success"` → **仅 Q2 收到**。
- **应用场景**：复杂的事件路由（如电商订单的多维度消息分类）。

**Headers Exchange（头交换机）**

- **路由规则**：**不依赖** Routing Key，而是根据**消息头（headers）** 的键值对匹配。
  - `x-match: all`：所有 header 键值对都匹配才路由（AND 逻辑）。
  - `x-match: any`：任一 header 键值对匹配即路由（OR 逻辑）。
- **特点**：性能最低（需遍历所有 headers），灵活性高但复杂。
- **示例**：
  - 队列绑定 `headers = {"x-match": "all", "format": "pdf", "type": "report"}`。
  - 消息 headers 包含 `{"format": "pdf", "type": "report"}` → 匹配成功，消息路由到该队列。
- **应用场景**：需要多条件匹配的复杂路由（实际使用较少，通常用 Topic 替代）。

**选型建议**

- **大多数场景**：优先选择 **Topic Exchange**，灵活性最高。
- **简单点对点**：使用 **Direct Exchange**。
- **广播通知**：使用 **Fanout Exchange**。
- **避免使用 Headers Exchange**：性能差，可用 Topic + 复杂路由键替代。

#### 🔬 扩展知识

**【L3】Topic 匹配的边界规则**

::: details

Routing Key 以 `.` 分段，空段也有语义：`order..create` 中的空串是一个独立单词；`#` 单独使用可匹配所有 key（等价于 Fanout 效果）；`*` 恰好匹配一个单词，`order.*` 不匹配 `order` 本身。这些边界是 Topic 路由面试题的高频陷阱。

:::

**【L4】Topic 匹配的性能实现**

::: details

Topic 交换机在 Broker 内部维护按单词组织的匹配结构，绑定数量大时匹配开销上升；生产上应控制单交换机的绑定数量级，避免用 `#` 开头的宽泛绑定覆盖一切，否则退化为近广播行为并放大投递扇出。

:::

> 📚 延伸阅读：[RabbitMQ Exchanges 与绑定官方文档](https://www.rabbitmq.com/tutorials/amqp-concepts)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “生产者把消息直接发给队列，交换机只是可选装饰” → 错误。消息必须先到交换机，由绑定决定去向；队列直连只发生在默认交换机 `""` 的特例中。
- ❌ “Fanout 也需要 routing key，只是被忽略” → 表述不严谨。Fanout 路由完全不参与 key 匹配，发布时可以传任意值或空值，语义上「不需要」routing key。
- ❌ “Headers 交换机最灵活所以最推荐” → 相反。Headers 匹配需遍历键值对，性能最差，生产中几乎总是可以用 Topic 的分段命名替代。

:::

#### 🔀 发散问题

1. Direct 和 Topic 能不能互相替代？
   Topic 用不含通配符的绑定即可模拟 Direct，但 Direct 匹配开销更低；明确点对点时优先 Direct，需要未来扩展路由维度时用 Topic。
2. 交换机上没有任何绑定时消息会怎样？
   无法路由：默认静默丢弃，`mandatory=true` 时退回生产者，也可用备用交换机（AE）收集。见本文档『RabbitMQ 中无法路由的消息会去到哪里？』。
3. 交换机本身存消息吗？
   不存。交换机只做路由转发，消息的暂存与持久化都发生在队列层，这也是为什么交换机和队列都要分别做持久化声明。

### 【中等】RabbitMQ 中无法路由的消息会去到哪里？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 可靠投递

#### 💎 关键结论

无法路由的消息默认被 Broker **静默丢弃**；设置 `mandatory=true` 时会通过 `basic.return` 退回生产者，也可用备用交换机（Alternate Exchange）兜底入队。最隐蔽的丢消息点正是默认丢弃，关键业务必须显式处理。

#### ⚡记忆卡片

- **口诀**：默认丢弃无感知，mandatory 退回生产者，AE 兜底进备用队列
- **关键词**：mandatory ／ basic.return ／ ReturnListener ／ Alternate Exchange ／ immediate 已废弃
- **链路**：消息到达交换机 → 无任何队列匹配 → 未设 mandatory 则丢弃 / 已设则 basic.return 退回 → 或路由到 alternate-exchange 指定的备用队列

#### 📖 核心知识

在 RabbitMQ 中，**无法路由的消息**（即无法被投递到任何队列的消息）的处理方式取决于消息的 **`mandatory` 属性**（RabbitMQ 3.0+ 已弃用 `immediate`），具体规则如下：

**默认情况（未设置 `mandatory`）**

- **消息被直接丢弃**（即 “静默丢失”）。
- **生产者无感知**：Broker 不会返回任何通知。

**设置了 `mandatory=true`**

- 若消息无法路由到任何队列，Broker 会通过 **`basic.return`** 方法将消息返回给生产者。
- **生产者需监听返回消息**，适用于需严格确保消息路由成功的业务（如关键订单通知）。

**备用交换机（Alternate Exchange）**

- **预先声明一个备用交换机**，绑定一个队列（如 `unrouted_queue`）接收无法路由的消息。
- **逻辑**：若消息无法通过 `main_exchange` 路由，则自动转发到 `my_ae`，最终进入 `unrouted_queue`。

**关键区别**

| 处理方式             | 条件                      | 结果                         | 适用场景                   |
| -------------------- | ------------------------- | ---------------------------- | -------------------------- |
| **直接丢弃**         | 默认情况                  | 消息丢失，无通知             | 允许消息丢失的非关键业务   |
| **返回生产者**       | `mandatory=true`          | 通过 `basic.return` 回退消息 | 需严格监控路由失败的场景   |
| **转发到备用交换机** | 配置了 Alternate Exchange | 消息存入备用队列             | 需审计或补偿无法路由的消息 |

**最佳实践**

- **关键消息**：始终设置 `mandatory=true` 并监听 `basic.return`。
- **日志与监控**：使用备用交换机收集无法路由的消息，便于排查问题。
- **避免消息丢失**：确保交换机和队列的绑定关系正确，或使用 **死信队列（DLX）** 处理异常消息。

::: details 案例：mandatory 退回与备用交换机配置（Java）

```java
channel.basicPublish("exchange", "routingKey",
    new AMQP.BasicProperties.Builder().mandatory(true).build(),
    message.getBytes());

// 添加 ReturnListener 监听返回消息
channel.addReturnListener((replyCode, replyText, exchange, routingKey, properties, body) -> {
    System.out.println("消息未被路由：" + new String(body));
});
```

```java
Map<String, Object> args = new HashMap<>();
args.put("alternate-exchange", "my_ae"); // 指定备用交换机
channel.exchangeDeclare("main_exchange", "direct", false, false, args);

// 声明备用交换机和队列
channel.exchangeDeclare("my_ae", "fanout");
channel.queueDeclare("unrouted_queue", false, false, false, null);
channel.queueBind("unrouted_queue", "my_ae", "");
```

:::

> 📌 **注意**：RabbitMQ 3.0+ 已移除 `immediate` 参数，旧版本中设置 `immediate=true` 会导致无法路由的消息被丢弃（除非同时设置 `mandatory`）。

#### 🔬 扩展知识

**【L3】Return 与 Confirm 的时序**

::: details

开启 Publisher Confirms 且 `mandatory=true` 时，无法路由的消息会**先**收到 `basic.return`、**后**收到 Confirm Ack（Broker 确实接收了消息，只是没进队列）。因此 Confirm Ack 不代表消息入队，二者必须组合监听才能覆盖「到达」与「路由」两个环节。

:::

**【L4】AE 的类型与扇出**

::: details

Alternate Exchange 可以是任意类型，常用 Fanout 挂一个兜底队列做审计；也可以挂 Topic 交换机按原始 routing key 二次分流。注意 AE 只在「首次路由失败」时生效，AE 自身再路由失败则消息仍会丢弃，可继续级联 AE。

:::

> 📚 延伸阅读：[RabbitMQ Publisher Confirms 与 Return 官方指南](https://www.rabbitmq.com/confirms.html)

#### 🔀 发散问题

1. 无法路由和进入死信队列是一回事吗？
   不是。无法路由发生在「入队之前」（交换机找不到队列）；死信发生在「入队之后」（被拒绝、过期、队列溢出）。两者触发点与配置参数完全不同。
2. mandatory 对性能有影响吗？
   很小。只是给 Broker 增加「路由失败时回传」的义务，路由成功路径几乎无额外开销，关键业务建议常开。

### 【中等】RabbitMQ 中消息什么时候会进入死信交换机？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 死信机制

#### 💎 关键结论

消息进入死信交换机（DLX）只有三种情况：**被拒绝且不重入队、TTL 过期、队列达到最大长度**。前提是队列声明时配置了 `x-dead-letter-exchange`；通过 DLX 可实现失败消息的优雅降级与故障隔离。

#### ⚡记忆卡片

- **口诀**：拒绝不过期、过期不拒绝、队列满挤出，三因进死信
- **关键词**：basicReject ／ basicNack ／ requeue=false ／ TTL ／ x-max-length ／ x-dead-letter-exchange
- **链路**：消息被拒（requeue=false）/ TTL 到期 / 队列溢出 → Broker 将其发布到 x-dead-letter-exchange → 按死信路由键进入死信队列 → 由补偿消费者处理

#### 📖 核心知识

在 RabbitMQ 中，消息进入 **死信交换机（Dead Letter Exchange, DLX）** 由以下 **3 种情况**触发（以官方定义为准）：

**（1）消息被消费者拒绝**：消费者显式拒绝消息且不重新入队。

```java
channel.basicReject(deliveryTag, false); // 或 basicNack 且 requeue=false
```

- **典型场景**：消息处理失败且无需重试（如业务校验不通过）。

**（2）消息过期（TTL 超时）**：

- 消息设置了 **TTL（Time-To-Live）**，且未在过期前被消费。
- 队列设置了 `x-message-ttl`，消息在队列中停留超时。

**（3）队列达到最大长度**：队列设置了 `x-max-length` 或 `x-max-length-bytes`，且新消息到达时队列已满，最旧的消息被挤出成为死信。

**关键配置步骤**

1. **声明死信交换机（DLX）和死信队列**；
2. **为普通队列绑定死信交换机**（`x-dead-letter-exchange`，可选 `x-dead-letter-routing-key`）。

::: details 案例：DLX 配置（Java）

```java
// 1. 声明死信交换机与死信队列
channel.exchangeDeclare("dlx_exchange", "direct");
channel.queueDeclare("dlx_queue", false, false, false, null);
channel.queueBind("dlx_queue", "dlx_exchange", "dlx_routing_key");

// 2. 为普通队列绑定死信交换机
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx_exchange"); // 指定 DLX
args.put("x-dead-letter-routing-key", "dlx_routing_key"); // 可选
channel.queueDeclare("normal_queue", false, false, false, args);
```

:::

**注意事项**

- 死信消息的 **原始属性**（如 headers）会被保留，但 `exchange` 和 `routingKey` 会被替换为 DLX 的配置。
- 若未指定 `x-dead-letter-routing-key`，则使用消息原来的 routing key。

**典型应用场景**

- **延迟队列**：通过 TTL+DLX 实现消息延迟投递。
- **失败处理**：将处理失败的消息自动路由到死信队列，供人工或异步处理。
- **流量控制**：队列满时转移旧消息，避免阻塞新消息。

#### 🔬 扩展知识

**【L3】消息级 TTL 的「队首检查」陷阱**

::: details

按消息粒度设置 `expiration` 时，RabbitMQ 只在**队首**检查过期：一条 5 秒 TTL 的消息排在 60 秒 TTL 消息后面时，要等前面的消息出队才会被判定过期，因此过期时间并不精确。队列级 `x-message-ttl` 则整队统一、无此问题。需要精确定时请用延迟消息插件或仲裁队列方案。

:::

**【L4】死信与队列溢出策略的配合**

::: details

队列溢出行为可通过 `x-overflow` 调整：默认 `drop-head`（丢最旧，被丢消息若配置 DLX 会成为死信）；`reject-publish` 直接拒绝新消息发布；`reject-publish-dlx` 拒绝新消息的同时把被拒消息转 DLX。不同组合决定了「保新」还是「保旧」的业务语义。

:::

> 📚 延伸阅读：[RabbitMQ DLX 官方文档](https://www.rabbitmq.com/dlx.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “队列被删除时，其中的消息会变成死信” → 错误。删除队列会直接连同消息一起删除，不会触发死信流转；想在删除前保全消息，必须先搬运或转储。
- ❌ “镜像队列主节点崩溃时，未同步的消息会进入死信队列” → 错误。主节点崩溃且消息未同步时，消息是**直接丢失**而非进入 DLX；这正是镜像队列可靠性缺陷，仲裁队列以 Raft 多数派确认解决该问题。
- ❌ “任何失败消息都会自动进死信” → 错误。必须满足三个触发条件之一，且队列预先配置了 `x-dead-letter-exchange`，否则被拒消息在 `requeue=false` 时会被直接丢弃。

:::

#### 🔀 发散问题

1. 死信队列能再配置死信吗？
   可以，死信队列本身也是队列，可再声明自己的 DLX，形成多级死信链；实践中常用它实现「重试 N 次后进最终人工队列」的退避重试。
2. TTL + DLX 能做延迟队列吗？
   可以：消息先进带 TTL 的中转队列，过期后转 DLX 路由到真实消费队列；缺点是精度受队首检查影响，且不同延迟需多个队列。详见本文档『RabbitMQ 如何实现延迟队列？』。

### 【中等】RabbitMQ 如何实现消息确认机制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：RabbitMQ / 可靠投递

#### 💎 关键结论

消息确认分两个方向：生产端用 Publisher Confirms 确认「消息到达 Broker」，消费端用手动 ACK 确认「业务处理完成」；两端都确认，消息才算走完一次可靠传输。理由：任一端缺失都会在对应环节留下丢失窗口。

#### ⚡记忆卡片

- **口诀**：生产 Confirm 问到达，消费 Ack 问处理，Return 补路由失败
- **关键词**：Publisher Confirms ／ basicAck ／ basicNack ／ basicReject ／ requeue ／ mandatory
- **链路**：生产者 confirmSelect 开启确认 → Broker 接收后回 Ack/Nack → 消费者 autoAck=false 手动确认 → 处理成功 basicAck，失败 basicNack 重入队或转死信

#### 📖 核心知识

RabbitMQ 的消息确认机制主要用于确保可靠的消息传输，分为 **生产者确认** 和 **消费者确认** 两个方向。

**生产者确认机制（Publisher Confirms）**

生产者开启发布确认模式（Publisher Confirms）后，Broker 会返回一个确认信号，确保消息已成功到达 Broker。

- **`Basic.Ack`**：消息成功被 Broker 接收（并可能已持久化）。收到 `Ack` 才认为发送成功，否则需重发。
- **`Basic.Nack`**：消息接收失败（罕见，如 Broker 内部错误）。

**三种 Confirm 模式**：

| 模式             | 实现方式                                 | 性能     | 可靠性 | 适用场景                     |
| :--------------- | :--------------------------------------- | :------- | :----- | :--------------------------- |
| **同步单条确认** | `channel.waitForConfirms()` 逐条等待     | **最低** | 最高   | 极少使用，仅用于测试         |
| **同步批量确认** | 批量发送后调用 `waitForConfirms()`       | 中       | 中     | 中等吞吐场景                 |
| **异步确认**     | `addConfirmListener()` 异步回调 【推荐】 | **最高** | 高     | **生产环境首选**，高吞吐场景 |

**Confirm 和 Return 的区别**：

| 机制        | 触发条件                             | 作用                   |
| :---------- | :----------------------------------- | :--------------------- |
| **Confirm** | 消息**是否到达 Broker**              | 确保消息被 Broker 接收 |
| **Return**  | 消息到达 Broker 但**无法路由到队列** | 确保消息被正确路由     |

- **Confirm** 回答的是：Broker 收到消息了吗？
- **Return** 回答的是：Broker 收到消息了，但找不到对应的队列，怎么办？

**消费者确认机制（Consumer Ack）**

- **自动确认 (`autoAck=true`)**：消息一发出就被 Broker 删除。

  - **风险**：消费者处理失败会导致消息**永久丢失**。

- **手动确认 (`autoAck=false`) 【推荐】**：消费者必须显式发送确认命令（调用 `channel.basicAck()`），Broker 才会删除消息。
  - **`basicAck`**：处理成功，确认删除。
  - **`basicNack` / `basicReject`**：处理失败。可选择是否将消息**重新放回队列 (`requeue=true`)** 或**丢弃/转入死信队列 (`requeue=false`)**。

**三种确认/拒绝方式对比**：

| 方法          | 参数                                 | 行为                                      |
| :------------ | :----------------------------------- | :---------------------------------------- |
| `basicReject` | `deliveryTag`, `requeue`             | 拒绝**单条**消息                          |
| `basicNack`   | `deliveryTag`, `multiple`, `requeue` | 拒绝**单条或多条**消息（`multiple=true`） |
| `basicAck`    | `deliveryTag`, `multiple`            | 确认消息处理成功                          |

::: details 案例：异步 Confirm 与 Return 监听（Java）

```java
channel.confirmSelect(); // 开启 Confirm 模式
channel.addConfirmListener(
    (deliveryTag, multiple) -> {
        // 消息确认成功
        System.out.println("Ack: " + deliveryTag);
    },
    (deliveryTag, multiple) -> {
        // 消息确认失败，需重发
        System.out.println("Nack: " + deliveryTag);
    }
);
channel.basicPublish(exchange, routingKey, props, body.getBytes());
```

```java
channel.addReturnListener((replyCode, replyText, exchange,
    routingKey, properties, body) -> {
    // 消息无法路由，被退回
    System.out.println("Returned: " + new String(body));
});

// 必须设置 mandatory=true，Return 机制才会生效
channel.basicPublish(exchange, routingKey,
    new AMQP.BasicProperties.Builder().mandatory(true).build(),
    body.getBytes());
```

:::

#### 🔬 扩展知识

**【L3】Confirm 的时机语义**

::: details

Broker 何时回 Ack 取决于消息属性：非持久化消息入队即确认；持久化消息需写入磁盘（或进入仲裁队列被多数派接受）后才确认。因此 Confirm Ack 对持久化消息的含金量更高，但也意味着更高的延迟——这是可靠性与吞吐的直接权衡。

:::

**【L4】Confirm 的 deliveryTag 与未确认集维护**

::: details

生产端需自行维护「已发布未确认」集合：Confirm 回调带 `multiple` 参数，为 true 时表示 ≤ deliveryTag 的所有消息批量确认，可用有序集合（如 ConcurrentSkipListMap）清理；超时未确认的消息需主动重发并配合消费端幂等防重复。这是异步确认落地时最容易写错的部分。

:::

> 📚 延伸阅读：[RabbitMQ Publisher Confirms 官方指南](https://www.rabbitmq.com/confirms.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Confirm 成功就等于消息不会丢” → 错误。Confirm 只保证 Broker 接收，若消息未持久化、队列无副本，Broker 崩溃仍会丢；完整不丢方案见本文档『RabbitMQ 如何保证消息不丢失？』。
- ❌ “autoAck=true 也能保证不丢，只要消费者快” → 错误。autoAck 是推送即删除，处理崩溃窗口内的消息永久丢失，可靠性要求高时必须手动确认。
- ❌ “basicNack 和 basicReject 功能完全一样” → 不准确。basicReject 只能拒单条，basicNack 支持 `multiple=true` 批量拒绝，批量消费场景只能用 basicNack。

:::

#### 🔀 发散问题

1. 为什么异步 Confirm 比同步逐条快得多？
   同步模式下每条消息都要等一个 RTT，管道无法填满；异步模式允许成百上千条在途消息，Broker 批量回确认，吞吐可高 1~2 个数量级（经验值）。
2. 消费者宕机后未确认的消息怎么办？
   Broker 检测到连接/Channel 关闭后会把未确认消息重新入队并投递给其他消费者，消息会带 redelivered 标记，消费逻辑需幂等。见本文档『RabbitMQ 中如何处理未被消费者确认的消息？』。

### 【中等】如何在 RabbitMQ 中实现消息的批量消费？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 消费模式

#### 💎 关键结论

RabbitMQ 协议层不支持服务端批量推送，批量消费靠客户端实现：**Prefetch 预取 + 手动确认，攒够一批后统一处理、统一 ACK**。核心前提是业务幂等，否则批量重投会造成重复。

#### ⚡记忆卡片

- **口诀**：预取攒批、手动确认、批量入库、幂等保底
- **关键词**：basicQos ／ prefetchCount ／ 手动确认 ／ 批量 ACK ／ 幂等
- **链路**：basicQos 设置预取数 → 消息暂存客户端缓冲 → 达到批量阈值或超时 → 批量执行业务（如批量入库）→ 批量 basicAck

#### 📖 核心知识

RabbitMQ 协议本身不支持服务端批量推送，但可通过**客户端机制**模拟批量消费。核心是：**开启手动确认，积攒消息，统一处理后再确认。**

**首选方法：Prefetch（预取） + 手动确认**

- **设置预取数量**：使用 `channel.basicQos(prefetchCount)`，限制信道上次可持有的最大未确认消息数。
- **开启手动确认**：消费消息时，不自动确认，由业务逻辑控制。
- **缓存与批量处理**：
  - 将收到的消息暂存到内存（如列表）。
  - 当积攒数量达到 `prefetchCount` 或等待超时时，执行批量业务逻辑（如批量入库）。
- **统一确认**：批量处理成功后，对该批所有消息进行手动确认。

**优点**：实现简单、能进行流量控制、显著提高吞吐量。

**关键**：业务逻辑必须支持**幂等性**，以防重复消费。

**备选方法：主动拉取**

使用 `channel.basicGet()` 在循环中主动从队列拉取消息，凑够一批后处理和确认。**优点**：控制更精确。**缺点**：实现复杂，空队列时效率低。**不推荐**为首选。

**总结建议**

- **绝大多数场景下，应使用 Prefetch + 手动确认的方案**。
- 牢记**幂等性**是保证数据准确性的前提。
- 根据业务处理能力和内存情况，合理设置 `prefetchCount` 大小。

#### 🔬 扩展知识

**【L3】批量 ACK 的 multiple 语义与失败放大**

::: details

`basicAck(deliveryTag, multiple=true)` 可一次确认 ≤ 该 tag 的所有消息，大幅减少 ACK 往返；但批内任一条处理失败时，若整批 Nack(requeue=true) 会导致已成功的消息也被重投，因此批量消费必须幂等，且建议「成功的单条 Ack、失败的单条 Nack 转死信」的细粒度策略。

:::

**【L4】prefetch 与批量大小的匹配**

::: details

预取值应 ≥ 批量大小，否则管道内消息不够一批，批量效果打折；但 prefetch 过大会把大量未确认消息压在单个消费者内存里，宕机时整批 requeue 造成重复与抖动。经验上是「prefetch = 批量大小 × 1~2」并结合单条消息体积评估内存占用。

:::

#### 🔀 发散问题

1. 为什么不用 basicGet 做批量拉取？
   basicGet 每次只能取一条且空队列时空转，效率低、还拿不到 QoS 保护；仅在需要精确控制拉取节奏的离线批处理中偶尔使用。
2. 批量入库失败怎么处理最稳？
   先按单条幂等插入（或带唯一索引的批量插入），成功的单独 Ack，失败的单条 Nack(requeue=false) 转死信，避免整批反复重投。

### 【中等】RabbitMQ 中如何处理未被消费者确认的消息？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 消费模式

#### 💎 关键结论

消费者未确认的消息，在消费者断开（宕机、断连）后会被 Broker **自动重新入队**，投递给下一个可用消费者，且消息带 `redelivered=true` 标记。这是 At-Least-Once 语义的直接体现，也是消费端必须幂等的原因之一。

#### ⚡记忆卡片

- **口诀**：未确认即未消费，断连重投带标记，幂等兼容重复
- **关键词**：unacked ／ 重新入队 ／ redelivered ／ basicRecover ／ delivery-limit
- **链路**：消费者收到消息未 ACK → 连接/Channel 断开 → Broker 将消息重新入队 → 投递给其他消费者（redelivered=true）→ 幂等逻辑兼容重复处理

#### 📖 核心知识

在 RabbitMQ 中，当消费者接收到一条消息后，若因某种原因未确认（ACK）该消息，这条消息会被重新入队并传递给其他消费者（或相同消费者再次接收）。详细实现方式如下：

1. 在消费者代码中需启用消息确认机制（manual acknowledgment），即通过 `channel.basicAck` 手动确认消息处理完成。
2. 若消费者未发送 `basicAck`（比如消费者宕机或消息处理异常导致连接断开），消息会被再次发送给下一个可用的消费者，以保证消息被再次处理。
3. 重新投递的消息 `redelivered` 标志为 true，消费端可据此识别重试消息并做幂等校验。

#### 🔬 扩展知识

**【L3】basicRecover：主动重投未确认消息**

::: details

除被动等待断连外，消费者可显式调用 `basicRecover(requeue=true)` 要求 Broker 把当前 Channel 上所有未确认消息重新投递，适合消费逻辑热重置、依赖的下游刚恢复等场景；注意它是 Channel 级全量操作，不支持指定单条。

:::

**【L4】投递次数限制（delivery limit）**

::: details

经典队列的 requeue 没有次数限制，毒消息（永远处理失败）会无限循环；仲裁队列支持 `x-delivery-limit` 参数，超过重投次数后消息直接丢弃或转死信，从协议层切断了无限重投风暴，是仲裁队列相比经典队列的重要运维优势。

:::

> 📚 延伸阅读：[RabbitMQ Delivery Limit 官方文档](https://www.rabbitmq.com/delivery-limit.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “未确认的消息会在超时后自动删除” → 错误。经典队列中 unacked 消息不会超时，只在消费者断开或显式 recover 时重投，消费者挂着但不 ACK 会导致消息一直被占用。
- ❌ “重新投递的消息和原消息是同一次投递” → 错误。重投会分配新的 deliveryTag，且 redelivered=true；不能用 deliveryTag 做幂等键。

:::

#### 🔀 发散问题

1. 消费者处理很慢但不宕机，消息会怎样？
   消息一直处于 unacked 状态不会被别人消费，可能造成队列局部阻塞；应配合 consumer 超时机制（如 Spring AMQP 的 consumer timeout）或主动 Nack 释放消息。
2. 如何避免毒消息无限重投？
   经典队列用「失败计数 + 转死信」的应用层方案；仲裁队列直接配置 `x-delivery-limit`。见本文档『RabbitMQ 如何保证消息不重复？』中 requeue 风暴的讨论。

### 【简单】如何在 RabbitMQ 中设置队列的最大长度？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 队列参数

#### 💎 关键结论

通过队列参数 `x-max-length` 设置最大消息数，超出时默认按先进先出丢弃最旧消息（被丢消息若配置了 DLX 会转死信）。它是防止队列无限积压的第一道闸门。

#### ⚡记忆卡片

- **口诀**：x-max-length 限条数，超出丢旧保新，配 DLX 不白丢
- **关键词**：x-max-length ／ x-max-length-bytes ／ x-overflow ／ drop-head
- **链路**：声明队列带 x-max-length → 队列满时新消息到达 → 默认 drop-head 挤出最旧消息 → （可选）被挤消息转 DLX 留痕

#### 📖 核心知识

在 RabbitMQ 中，可通过 `x-max-length` 参数设置队列最大长度，该参数能在声明队列时指定队列允许的最大消息数，超出数量的消息会被自动删除（默认按先进先出原则删老消息）。

具体实现步骤：

1. 使用 RabbitMQ 管理工具（如 `rabbitmqctl` 或 RabbitMQ 管理控制台）。
2. 通过代码创建队列时，设置队列属性。

- 除条数外，还可用 `x-max-length-bytes` 按字节总量限制；
- 溢出行为可用 `x-overflow` 调整：`drop-head`（默认丢最旧）、`reject-publish`（拒绝新消息）。

::: details 案例：声明带最大长度的队列（Python/Pika）

```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# 设置队列的最大长度 x-max-length
channel.queue_declare(queue='my_queue', arguments={'x-max-length': 10})

connection.close()
```

在这段代码里，`queue_declare` 方法的 `arguments` 参数指定了 `x-max-length`，并将其值设为 10。

:::

#### 🔀 发散问题

1. 被丢弃的旧消息能找回吗？
   不能，除非队列配置了 `x-dead-letter-exchange`，被挤出的消息会转入死信队列留痕，可用于审计或补偿。
2. 队列长度限制和内存水位是一回事吗？
   不是。x-max-length 是队列级容量约束，内存水位是节点级资源保护（触发后阻塞全节点发布），两者应配合使用。见本文档『RabbitMQ 如何应对消息堆积？』。

### 【简单】如何在 RabbitMQ 中配置消息的 TTL（过期时间）？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 消息过期

#### 💎 关键结论

TTL 有两个设置点：队列级 `x-message-ttl`（全队列统一）与消息级 `expiration`（逐条设置），两者同时存在时取较小值。队列级更精确可控，消息级灵活但有过期检查的队首陷阱。

#### ⚡记忆卡片

- **口诀**：队列 x-message-ttl，消息 expiration，同设取小
- **关键词**：x-message-ttl ／ expiration ／ 毫秒 ／ 取较小值
- **链路**：声明队列设 TTL / 发布消息设 expiration → 消息在队时间超过 TTL → 过期被判死信 → 配置 DLX 则转发，否则丢弃

#### 📖 核心知识

要在 RabbitMQ 中配置消息的 TTL（过期时间），需通过设置队列或消息的 TTL（Time To Live，消息在队列中存活的时间），有两种方式：

队列级别的 TTL：在声明队列时通过设置 `x-message-ttl` 参数指定队列中所有消息的 TTL。

```java
// Java 示例（使用 RabbitMQ 的官方客户端）
Map<String, Object> args = new HashMap<>();
args.put("x-message-ttl", 60000); // 设置队列的 TTL 为 60,000 毫秒（60 秒）
channel.queueDeclare("myQueue", false, false, false, args);
```

消息级别的 TTL：在发送消息时通过 `AMQP.BasicProperties` 属性指定单个消息的 TTL。

```java
// Java 示例（使用 RabbitMQ 的官方客户端）
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .expiration("60000") // 设置消息的 TTL 为 60,000 毫秒（60 秒）
    .build();
channel.basicPublish("", "myQueue", props, "Hello, World!".getBytes());
```

> 注意：两个 TTL 同时设置时，实际生效的是**较小值**；消息级 TTL 过期检查存在队首限制，精确定时请配合延迟消息插件。见本文档『RabbitMQ 如何实现延迟队列？』。

#### 🔀 发散问题

1. TTL 到期的消息一定会立刻被清理吗？
   不一定。过期判定发生在消息即将投递给消费者的时刻（队首检查），未被消费的过期消息可能在队列中停留更久，只是不会再被投递。
2. TTL 和死信队列配合能做什么？
   实现延迟队列：中转队列设 TTL 且不挂消费者，过期消息自动转 DLX 路由到真实业务队列。见本文档『RabbitMQ 如何实现延迟队列？』。

### 【中等】RabbitMQ 有哪些工作模式？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 消费模式

#### 💎 关键结论

RabbitMQ 的工作模式本质是「拓扑组合」：简单、工作队列、发布订阅、路由、主题、RPC 六种，差别只在交换机类型与消费者数量。抓住「用哪类交换机 + 几个消费者」就能推导出任何模式。

#### ⚡记忆卡片

- **口诀**：单发单收是简单，多消竞争工作队，Fanout 广播、Direct 路由、Topic 通配、RPC 回调
- **关键词**：Simple ／ Work Queue ／ Publish-Subscribe ／ Routing ／ Topic ／ RPC ／ reply_to ／ correlation_id
- **链路**：生产者 → （交换机类型决定分发方式）→ 队列 → （单消费/竞争/广播）→ 消费者；RPC 额外用 reply_to + correlation_id 闭环

#### 📖 核心知识

RabbitMQ 有以下几种主要的工作模式：

- 简单模式（Simple）
- 工作队列模式（Work Queue）
- 发布/订阅模式（Publish/Subscribe）
- 路由模式（Routing）
- 主题模式（Topic）
- RPC 模式（远程调用）

以下，对几种工作模式逐一进行说明：

**简单模式（Simple）**

- **角色**：1 生产者 → 1 队列 → 1 消费者
- **特点**：单向通信，无路由逻辑，即点对点模式
- **场景**：单任务处理（如日志记录）

**工作队列模式（Work Queue）**

- **角色**：1 生产者 → 1 队列 → **多个消费者竞争消费**
- **特点**：
  - 消息**轮询分发**（默认）或**公平分发**（需设置`prefetch=1`）
  - 消费者并行处理
- **场景**：任务分发（如订单处理）

**发布/订阅模式（Publish/Subscribe）**

- **角色**：1 生产者 → **Fanout 交换机** → 绑定多个队列 → 多个消费者
- **特点**：
  - 消息**广播**到所有队列
  - 消费者各自独立接收全量消息
- **场景**：事件通知（如系统公告）

**路由模式（Routing）**

- **角色**：1 生产者 → **Direct 交换机** → 根据`routing_key`路由到特定队列
- **特点**：
  - **精确匹配**路由键
  - 支持多队列绑定相同路由键
- **场景**：条件过滤（如错误日志分级处理）

**主题模式（Topic）**

- **角色**：1 生产者 → **Topic 交换机** → 基于通配符（`*`/`#`）匹配路由键
- **特点**：
  - **模糊匹配**（如`order.*`匹配`order.create`）
  - 灵活性高
- **场景**：复杂路由（如多维度消息分类）

**RPC 模式（远程调用）**

- **角色**：客户端 → 请求队列 → 服务端 → 响应队列 → 客户端
- **特点**：
  - 通过`reply_to`和`correlation_id`关联请求/响应
  - 同步阻塞式通信
- **场景**：服务间调用（需即时响应）

**模式对比**

| **模式**  | **交换机类型** | **路由规则**          | **典型应用** |
| --------- | -------------- | --------------------- | ------------ |
| 简单模式  | 无             | 无                    | 单任务处理   |
| 工作队列  | 无             | 轮询/公平分发         | 并行任务     |
| 发布/订阅 | Fanout         | 广播                  | 多系统通知   |
| 路由模式  | Direct         | 精确匹配`routing_key` | 条件过滤     |
| 主题模式  | Topic          | 通配符匹配            | 复杂路由     |
| RPC 模式  | 无             | 请求-响应关联         | 同步服务调用 |

**选择建议**

- **广播需求** → Fanout
- **条件过滤** → Direct/Topic
- **任务并行** → Work Queue
- **服务调用** → RPC

#### 🔬 扩展知识

**【L3】工作队列的公平分发细节**

::: details

默认轮询分发按消息数均分，不考虑消费者处理速度，会造成快消费者空闲、慢消费者积压；设置 `basicQos(prefetchCount=1)` 后 Broker 只在消费者确认后才发下一条，实现「能者多劳」的公平分发——这也是 prefetch 作为流控与分发双重作用的典型体现。

:::

**【L4】RPC 模式的超时与孤儿响应**

::: details

RPC 模式用 exclusive 临时队列接收响应，靠 `correlation_id` 匹配；客户端必须设超时，否则服务端崩溃会导致永久阻塞；服务端响应发布失败时客户端也只能靠超时兑底。正因这些脆弱性，生产环境的同步调用更推荐专门的 RPC 框架（如 Dubbo/gRPC）而非 MQ 自建。

:::

#### 🔀 发散问题

1. 工作队列模式和工作队列（竞争消费）是一回事吗？
   是同一概念的不同叫法：一个队列挂多个消费者竞争消费，消息只会被其中一个处理，与发布订阅的「每人都收全量」形成对照。
2. 发布订阅模式下各消费者的消费进度互相影响吗？
   不影响。每个消费者绑定自己的独立队列，各自维护 offset/ACK，一个消费者积压不会拖慢其他消费者。

## RabbitMQ 集群

### 【中等】RabbitMQ 如何实现主从复制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 集群与高可用

#### 💎 关键结论

RabbitMQ 的主从复制以队列为单位，经典方案是镜像队列（Policy 启用，主从异步复制 + 自动故障转移）。需要注意版本事实：镜像队列自 3.8 起被仲裁队列（Quorum Queue，Raft 复制）取代，4.0 已移除，新项目应直接用仲裁队列。

#### ⚡记忆卡片

- **口诀**：镜像队列主从异步，策略开启、自动切主；新项目直接上仲裁队列
- **关键词**：镜像队列 ／ ha-mode ／ ha-sync-mode ／ 主队列 ／ 故障转移 ／ 仲裁队列
- **链路**：Policy 匹配队列 → 在从节点建立镜像 → 主队列处理读写并异步同步从队列 → 主节点宕机 → 从队列选举新主继续服务

#### 📖 核心知识

**RabbitMQ 通过为队列配置镜像策略来实现主从复制和高可用，这是一种以队列为单位的复制机制。**

- **核心命令（示例）**：
  ```bash
  # 将匹配的所有队列镜像到集群中所有节点
  rabbitmqctl set_policy ha-all "^ha\." '{"ha-mode":"all"}'
  ```
- **关键参数**：

  - `ha-mode`： 模式（`all`全部节点、`exactly`指定数量、`nodes`指定节点）。
  - `ha-sync-mode`： 同步模式（`automatic`自动同步更安全）。

- **推荐方式**： 使用**管理控制台** 或 **命令行工具** 设置策略，灵活且无需修改代码。

**工作原理与故障转移**

- **主从结构**： 每个镜像队列有一个**主队列**（处理所有读写）和多个**从队列**（异步同步数据）。
- **客户端透明**： 客户端始终与主队列交互，连接从节点时请求会被自动转发。
- **自动故障转移**： 当主队列所在节点宕机，系统会**自动从从队列中选举**出一个新的主队列，实现高可用。

#### 🔬 扩展知识

**【L3】镜像队列的可靠性缺陷**

::: details

镜像队列是自研的主从异步复制协议：主宕机时未同步消息丢失；新主可能选到数据落后的节点（可用 `ha-promote-on-failure` 控制）；网络分区时两侧各自主导致消息分叉。这些缺陷无法在协议内修复，是官方弃用它的根本原因。

:::

**【L4】仲裁队列的复制模型**

::: details

仲裁队列（3.8+）基于 Raft：写入需多数派节点落盘确认后才返回，Leader 宕机只能从日志最新的 follower 中选主，从协议层消除「丢未同步消息」与「脑裂分叉」两大缺陷；4.0 起镜像队列被彻底移除。存量系统迁移时可用策略将队列转换为仲裁队列。

:::

> 📚 延伸阅读：[RabbitMQ Quorum Queues 官方说明](https://www.rabbitmq.com/quorum-queues.html)

#### 🔀 发散问题

1. 镜像队列的故障切换对客户端透明吗？
   基本透明但非无感：Channel 上未完成的操作会失败，未确认消息会重投，客户端需要重连与重试逻辑，消息可能重复，消费端必须幂等。
2. 为什么仲裁队列不需要 ha-mode 这类策略？
   仲裁队列的副本是队列类型的内置属性（声明 `x-queue-type=quorum` 即多副本），复制行为由 Raft 协议固定，不再需要外部策略配置。

### 【困难】RabbitMQ 如何实现高可用？⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：RabbitMQ / 集群与高可用

#### 💎 关键结论

RabbitMQ 高可用 = 集群保服务连续（元数据全节点共享，任一存活节点可接入）+ 队列复制保数据不丢（镜像队列或 3.8+ 推荐的仲裁队列）。再用负载均衡器统一接入、自动屏蔽故障节点，形成完整高可用闭环。

#### ⚡记忆卡片

- **口诀**：三节点磁盘、LB 接入、元数据共享、队列多副本
- **关键词**：集群 ／ 磁盘节点 ／ 镜像队列 ／ 仲裁队列 ／ 负载均衡 ／ 故障转移
- **链路**：多节点组集群共享元数据 → 队列通过镜像/仲裁复制到多节点 → 主节点宕机自动切主 → 客户端经 LB 接入任一存活节点继续服务

#### 📖 核心知识

**高可用关键点**

- **部署**：至少** 3 个节点**（最好都是磁盘节点），分布在不同物理机。
- **接入层**：使用**负载均衡器**为客户端提供统一入口，自动屏蔽故障节点。
- **故障转移**：当主节点宕机，**从节点会自动选举为新主**，恢复服务。

**两大实现机制**

**集群**

- **作用**：解决**服务连续性**。多个节点共享元数据（队列、交换机定义）。
- **关键**：客户端可连接集群中**任一存活节点**进行所有操作。
- **节点类型**：必须保证有**磁盘节点**在线（通常建议部署多个），以防元数据丢失。

**队列复制**

- **作用**：解决**数据不丢失**。将队列内容（消息）复制到多个节点。
- **两种实现**：
  - **镜像队列**：传统方案，主从异步复制。通过**策略**启用，如 `rabbitmqctl set_policy ha-all "^ha\." '{"ha-mode":"all"}'`。
  - **仲裁队列**：现代方案，基于 Raft 协议强一致复制。**消息需多数节点确认**，更安全，为 3.8+版本后的**推荐选择**（4.0 已移除镜像队列）。

#### 🔬 扩展知识

**【L3】磁盘节点与内存节点的取舍**

::: details

集群中至少需要一个磁盘节点存储元数据，其余可以是内存节点以提升性能；但实践中推荐全部磁盘节点——内存节点重启后需从磁盘节点拉取元数据，磁盘节点全挂时集群无法启动。元数据体量小，磁盘开销可忽略，稳定性收益更大。

:::

**【L4】网络分区对高可用的破坏**

::: details

集群高可用最大的敌人是网络分区：默认 `ignore` 策略下分区两侧继续服务，恢复后少数派数据被丢弃（镜像队列）或少数派自动停服（`pause_minority`，牺牲可用性换一致性）。仲裁队列因 Raft 少数派拒写天然防脑裂，是分区场景下数据安全的根本解。

:::

> 📚 延伸阅读：[RabbitMQ Clustering 官方文档](https://www.rabbitmq.com/clustering.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “普通集群就是高可用” → 错误。普通集群只同步元数据，消息实体仅存于队列所在节点，节点宕机则该节点上的队列消息不可用，必须叠加队列复制才算高可用。
- ❌ “仲裁队列和镜像队列可以随便混用” → 不准确。两者复制协议不同，队列类型不可原地互转，需新建队列并迁移；混用期间运维口径（分区策略、监控指标）也不统一。
- ❌ “3 节点就能容忍任意 2 个节点挂” → 错误。仲裁队列要求多数派存活，3 节点只能容忍 1 个节点故障；容忍 f 个故障需 2f+1 个节点。

:::

#### 🔀 发散问题

1. 跨机房高可用怎么做？
   同城多机房可用仲裁队列（容忍毫秒级跨机房延迟）；异地则依赖 Federation/Shovel 插件异步转发，接受最终一致。见本文档『RabbitMQ 有哪些集群模式？』。
2. 客户端连接高可用怎么保证？
   通过 LB/DNS 提供统一入口，客户端配置多节点地址列表自动故障转移；注意客户端应监听连接断开事件重建 Channel，而不是无限重试旧连接。
3. 镜像队列主从切换为什么会丢消息？
   异步复制下未同步消息随主节点丢失，新主可能选到落后副本；仲裁队列多数派落盘确认后才返回，从机制上消除该窗口。详见本文档『RabbitMQ 的镜像队列和 Quorum Queue 有什么区别？』。

### 【简单】如何在 RabbitMQ 中创建一个镜像队列？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 集群与高可用

#### 💎 关键结论

镜像队列不需要单独“创建”，而是通过 Policy 为匹配的队列自动开启主从复制：策略三要素是名称、队列名正则、`ha-mode` 定义。前提是先组成集群；新项目建议直接用仲裁队列（3.8+ 官方推荐，镜像队列已在 4.0 移除）。

#### ⚡记忆卡片

- **口诀**：策略三要素：名称、正则、ha-mode；exactly=2 最常用
- **关键词**：Policy ／ ha-mode ／ ha-params ／ rabbitmqctl set_policy ／ 集群前提
- **链路**：创建集群 → 定义 Policy（正则匹配队列）→ 匹配队列自动建镜像 → 主从同步服务

#### 📖 核心知识

镜像队列是通过**策略**为普通队列开启主从复制，实现高可用。它基于 RabbitMQ 集群环境。

**策略三要素：**

- **名称**：策略标识。
- **模式**：匹配队列名的正则表达式（如 `^important\.` 匹配重要队列）。
- **定义**：核心设置 `ha-mode`。
  - `all`：镜像到所有节点（开销大）。
  - `exactly`：**推荐**。指定副本数（如 `2`，即 1 主 1 从）。

**配置方式：**

- **管理界面**：在 `Admin` -> `Policies` 中添加。
- **命令行**：使用 `rabbitmqctl set_policy` 命令。

::: details 案例：为重要队列创建 2 个副本（生产环境常用）

```bash
# 为重要队列创建 2 个副本
rabbitmqctl set_policy ha-important "^important\." '{"ha-mode":"exactly", "ha-params":2}'
```

:::

**注意事项**

- **集群是前提**：单节点无效。
- **性能开销**：同步复制有开销，**只镜像关键队列**。
- **队列命名**：用前缀（如 `critical.`）区分重要队列，便于策略匹配。

**一句话总结：通过创建策略，为匹配的队列自动开启主从复制，实现高可用。**

> ⚠️ 版本事实：镜像队列自 3.8 起不再推荐，官方推荐仲裁队列（Quorum Queue）；4.0 已移除镜像队列，存量系统应规划迁移。

#### 🔀 发散问题

1. 新业务还要不要用镜像队列？
   不要。新项目直接用仲裁队列，声明 `x-queue-type=quorum` 即可，无需任何 Policy；镜像队列仅存在于需兼容旧版本的存量系统中。
2. ha-mode=exactly 的副本分布在哪些节点？
   由 Broker 自动选择（可通过 ha-promote-on-shutdown 等参数影响行为），没有显式指定节点的能力；需要指定节点用 `ha-mode=nodes`。

### 【中等】RabbitMQ 有哪些集群模式？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 集群与高可用

#### 💎 关键结论

RabbitMQ 有四种集群模式：普通集群（只同步元数据）、镜像队列集群（消息全量冗余，已弃维）、联邦集群（跨地域异步转发）、分片集群（队列水平拆分）。所有模式都依赖 Erlang Cookie 一致来完成节点认证。

#### ⚡记忆卡片

- **口诀**：普通同步元数据，镜像冗余保可用，联邦跨域、分片扩容
- **关键词**：普通集群 ／ 镜像队列 ／ Federation ／ Sharding ／ Erlang Cookie
- **链路**：节点 Cookie 一致加入集群 → 按需求叠加镜像/联邦/分片能力 → 分别解决高可用/跨地域/容量三类问题

#### 📖 核心知识

RabbitMQ 有以下集群模式：

- 普通集群
- 镜像队列集群（高可用模式）
- 联邦集群
- 分片集群

所有集群模式均依赖 **Erlang Cookie** 实现节点间认证，需确保一致。

**普通集群**

- **核心特点**
  - 元数据（队列、交换机等）**全节点同步**
  - **消息实体仅存于创建队列的节点**（其他节点通过指针访问）
- **优点**
  - 节省存储（消息不冗余）
  - 横向扩展方便
- **缺点**
  - **单点故障风险**：若某节点宕机，其上的队列消息不可用
  - 跨节点访问消息需网络传输

**镜像队列集群（高可用模式）**

- **核心特点**
  - 队列**跨节点镜像复制**（消息实体全节点冗余）
  - 通过策略（Policy）定义镜像规则（如 `ha-mode=all` 表示全节点复制）
- **优点**
  - **高可用**：任一节点宕机，其他节点可继续服务
  - 自动故障转移（消费者无感知）
- **缺点**
  - **存储开销大**（消息全量复制）
  - 写入性能略低（需同步所有副本）

**联邦集群（Federation）**

- **核心特点**
  - **跨机房/地域**部署，消息按需异步转发
  - 基于插件（`rabbitmq_federation`）实现
- **适用场景**
  - 异地容灾
  - 多区域消息同步

**分片集群（Sharding）**

- **核心特点**
  - 通过插件（`rabbitmq_sharding`）将队列**水平拆分**到不同节点
  - 生产者自动路由到对应分片
- **适用场景**
  - 超大规模队列（减轻单节点压力）

**方案对比**

| **模式** | **数据冗余** | **高可用** | **跨地域** | **适用场景**             |
| -------- | ------------ | ---------- | ---------- | ------------------------ |
| 普通集群 | 无           | ❌         | ❌         | 开发测试、低重要性数据   |
| 镜像队列 | 全量复制     | ✔️         | ❌         | 生产环境（如订单、支付） |
| 联邦集群 | 按需同步     | ✔️         | ✔️         | 异地多活                 |
| 分片集群 | 无           | ❌         | ❌         | 超大规模队列             |

**选择建议**

- **生产环境**：优先使用 **镜像队列集群**（需权衡性能与冗余）
- **异地容灾**：结合 **联邦集群** + 镜像队列
- **海量数据**：考虑 **分片集群**（但需业务适配）

#### 🔬 扩展知识

**【L3】仲裁队列对「镜像队列集群」的替代**

::: details

上表「生产环境选镜像队列」的结论需随版本更新：3.8+ 官方推荐仲裁队列作为高可用队列方案，4.0 已移除镜像队列。现代生产集群的推荐组合是：普通集群 + 仲裁队列（代替镜像）+ 按需联邦，实现强一致高可用。

:::

**【L4】Federation 与 Shovel 的分工**

::: details

两者都做跨集群转发：Federation 面向交换机/队列级的订阅式转发，支持多级拓扑与断点续传，适合异地多活；Shovel 更底层、配置更简单，适合点对点搬运消息。选型口诀：订阅转发用 Federation，管道搬运用 Shovel。

:::

> 📚 延伸阅读：[RabbitMQ Federation 官方文档](https://www.rabbitmq.com/federation.html)

#### 🔀 发散问题

1. 普通集群相比单节点的价值是什么？
   主要是接入高可用与连接/吞吐的水平扩展：客户端可接任一节点，节点故障不丢元数据；但消息本身不冗余，不能承诺数据不丢。
2. 分片插件的代价是什么？
   分片后单队列语义被打破，顺序性、全局积压监控都需按分片重新设计，适合无顺序要求的大吞吐场景；有顺序要求的业务应按业务键手动分队列。

## RabbitMQ 可靠传输

### 【困难】RabbitMQ 如何保证消息不丢失？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：RabbitMQ / 可靠性

#### 💎 关键结论

消息不丢失需要生产、存储、消费三端同时设防：**生产端 Confirm + Return，服务端持久化 + 副本（仲裁队列），消费端手动 ACK**。任何一环缺失都会留下对应的丢失窗口，单点方案都不成立。

#### ⚡记忆卡片

- **口诀**：生产双保险、存储三件套+副本、消费手动 ACK
- **关键词**：Confirm ／ Return ／ mandatory ／ durable ／ deliveryMode=2 ／ 仲裁队列 ／ basicAck
- **链路**：Confirm 保到达 → Return 保路由 → 持久化保重启 → 副本保宕机 → 手动 ACK 保处理 → 死信保异常兜底

#### 📖 核心知识

RabbitMQ 从**生产、存储、消费**三个环节共同保障消息不丢失。核心思路是 **“生产端 Confirm + Return + 服务端持久化 + 副本 + 消费端手动 ACK”**，每一环都有明确的失效边界。

**全链路保障方案**

| 环节       | 机制                           | 配置方式                                                         |
| :--------- | :----------------------------- | :--------------------------------------------------------------- |
| **生产端** | Publisher Confirms（发布确认） | `channel.confirmSelect()` + 异步 `addConfirmListener`            |
|            | Return 机制（路由失败回退）    | `mandatory=true` + `addReturnListener`                           |
|            | 失败重试                       | 监听 `Nack` 或超时后业务侧重发                                   |
| **服务端** | 队列持久化                     | 声明队列时 `durable=true`                                        |
|            | 消息持久化                     | 发送消息时 `deliveryMode=2` (PERSISTENT)                         |
|            | 交换机持久化                   | 声明交换机时 `durable=true`                                      |
|            | 副本机制                       | **仲裁队列（Quorum Queue，推荐）** 或 镜像队列（Mirrored Queue） |
| **消费端** | 手动 ACK                       | `autoAck=false`，处理成功后 `channel.basicAck()`                 |
|            | 失败处理                       | `basicNack(requeue=false)` 转入死信队列                          |

**生产端：Confirm + Return 双保险**

- **Confirm 回答“消息到没到 Broker”**：开启 `confirmSelect()` 后异步监听 `Basic.Ack/Nack`，收到 Ack 才认为发送成功。异步确认对吞吐影响很小（相比同步逐条确认吞吐可高 1~2 个数量级）。
- **Return 回答“消息有没有进队列”**：`mandatory=true` 时，无法路由的消息通过 `basic.return` 退回生产者；不设置则**静默丢弃**——这是最隐蔽的丢消息点。
- **失效场景**：Confirm 成功只代表 Broker 接收成功，若此时消息未持久化且未进仲裁队列，Broker 崩溃仍会丢；**Confirm 回调与业务写库不是原子操作**，回调前进程崩溃会出现“业务成功但消息未标记已发”的不一致，需靠对账兜底。

**存储端：持久化 + 副本 + 故障转移**

- **持久化**：队列 `durable=true` + 消息 `deliveryMode=2` + 交换机 `durable=true` 三者缺一不可；仅消息持久化而队列非持久化，重启后队列不存在，消息仍丢。
- **副本机制选型（关键权衡）**：

| 维度       | **镜像队列（Mirrored）**                                   | **仲裁队列（Quorum，3.8+ 推荐）**          |
| :--------- | :--------------------------------------------------------- | :----------------------------------------- |
| **复制**   | 主从异步复制，可配 `ha-promote-on-failure`                 | Raft 多数派确认，强一致                    |
| **可靠性** | 主宕机可能丢未同步消息                                     | 确认即安全，**绝不丢**                     |
| **脑裂**   | 网络分区时可能消息分叉/丢失（`pause_minority` 策略需预配） | Raft 天然防脑裂，少数派自动停服            |
| **性能**   | 延迟低、吞吐高                                             | 多数派写盘确认，吞吐约降 30%~50%（经验值） |
| **适用**   | 允许微量丢失的低延迟场景（已弃维）                         | 金融、交易等关键业务（生产首选）           |

- **失效场景**：持久化不等于不丢——消息先写内存再异步刷盘，单节点 Broker 在刷盘前崩溃仍丢；只有仲裁队列/镜像 + 同步策略能堵住这个窗口。

**消费端：手动 ACK**

- 业务逻辑成功后才调用 `channel.basicAck()`；“先 ACK 后处理”是典型丢消息反模式。
- 失败时 `basicNack(requeue=false)` 转死信队列，而非无限 requeue。
- **失效场景**：`prefetch` 设置过大时，大量未 ACK 消息堆积在消费者内存，消费者 OOM 崩溃后消息 requeue（不丢但可能重复）；若用了 `autoAck=true`，推送即删除，处理失败直接永久丢失。

#### 🔬 扩展知识

**【L3】Confirm 回调不能当事务用：本地消息表兜底**

::: details

“业务写库成功”与“消息发送成功”不是原子操作。常见做法：本地事务内写业务表 + 消息记录表（待发），事务提交后异步发送，Confirm 成功更新记录表状态，失败由定时任务扫表重发（本地消息表模式）；若用 MQ 承载交易链路，也可考虑换 RocketMQ 事务消息把这件事交给中间件。

:::

**【L4】对账作为最后一道防线**

::: details

即使上述机制全部开启，极端场景（Confirm 回调丢失、对账窗口内 Broker 集群性故障）仍可能有微量不一致，因此关键业务还需周期性对账：比对业务表与消息/下游处理记录，发现缺失即补发。工程上把“不丢”从机制承诺升级为「机制 + 对账可发现」的双重承诺。

:::

> 📚 延伸阅读：[RabbitMQ Publisher Confirms 官方指南](https://www.rabbitmq.com/confirms.html) ｜ [RabbitMQ Quorum Queue 官方说明](https://www.rabbitmq.com/quorum-queues.html)

#### 🏭 实战场景

::: details

**踩坑案例：镜像队列脑裂导致消息分叉丢失**（案例推演，数据为示意）

- **现象**：机房网络抖动 5 分钟后恢复，业务反馈部分订单消息“消失”，同时少数消息被消费了两次。
- **排查**：`rabbitmqctl list_queues name node slaves` 发现集群分裂成两个分区，同一队列在两边各有一个“主”；网络恢复后按默认策略少数派分区被丢弃，其上已写入但未同步的消息全部丢失，而两边都已投递的消息造成重复。
- **根因**：镜像队列未配置分区处理策略（默认 `ignore`），脑裂时两边继续服务产生消息分叉，恢复时少数派数据被直接抛弃。
- **修复**：短期设置 `cluster_partition_handling=pause_minority`（少数派自动停服，牺牲可用性换一致性）；长期将核心队列迁移到仲裁队列（Raft 天然防脑裂），接受约 30%~50% 的吞吐下降。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “开了 Publisher Confirm 就保证不丢” → 错误。Confirm 只保证 Broker 接收，存储端无持久化/副本、消费端 autoAck 都会丢；三端必须同时设防。
- ❌ “持久化了就一定不丢” → 错误。单节点持久化在刷盘窗口内崩溃仍丢，必须叠加副本（仲裁队列）才能堵住崩溃窗口。
- ❌ “requeue 万能，失败就重入队” → 危险。无限 requeue 会形成重投风暴打爆下游，且伴随重复消费；失败应转死信 + 受控重试。
- ❌ “镜像队列和仲裁队列效果差不多” → 错误。前者异步复制可能丢未同步消息，后者多数派确认不丢，两者是一致性级别不同的方案（3.8 后官方只推荐后者）。

:::

#### 🔀 发散问题

1. Publisher Confirm 成功是否意味着消息一定不丢？还差哪几步？
   不意味着。Confirm 只保证 Broker 接收并入队，还需要：① 消息/队列持久化或仲裁队列多数派落盘；② 消费端手动 ACK 且业务成功后才确认；③ requeue 与死信策略避免消息被意外丢弃。四者缺一不可，单独拿出任何一个都不能承诺不丢。
2. 镜像队列为什么在 3.8 之后被仲裁队列取代？脑裂问题的本质是什么？
   镜像队列的复制协议是自研的主从异步复制，无法解决网络分区下的数据一致性：分区时两边都自认主，消息分叉；恢复时必有一边数据被丢弃。仲裁队列基于 Raft，少数派自动拒绝写入，从协议层消除了脑裂；代价是多数派确认带来的延迟与吞吐下降，官方已在 4.0 移除镜像队列。
3. “业务写库成功”与“消息发送成功”如何做到一致？Confirm 回调能当事务用吗？
   不能，二者不是原子操作。常见做法：本地事务内写业务表 + 消息记录表（待发），事务提交后异步发送，Confirm 成功更新记录表状态，失败由定时任务扫表重发（本地消息表模式）；若用 RabbitMQ 承载交易链路，也可考虑换 RocketMQ 事务消息把这件事交给中间件。

### 【困难】RabbitMQ 如何保证消息不重复？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：RabbitMQ / 可靠性

#### 💎 关键结论

RabbitMQ 本身不保证消息不重复：AMQP 是 At-Least-Once 语义，重投路径多且无法从协议层消除，唯一正解是**消费端幂等**。其中 requeue 与镜像队列切主是最容易被忽视的两条重复路径。

#### ⚡记忆卡片

- **口诀**：重复四条路，幂等一条解：业务唯一键 + 强一致存储
- **关键词**：At-Least-Once ／ requeue ／ 生产者重试 ／ 主从切换 ／ 幂等 ／ 唯一索引 ／ SETNX
- **链路**：ACK 丢失/重试/切主 → 消息重复投递 → 消费端用业务唯一键查重 → 已处理则直接 ACK，未处理则执行并落幂等标记

#### 📖 核心知识

**RabbitMQ 本身不保证消息不重复**。AMQP 协议设计上允许消息重复投递（At Least Once 语义），因此必须在消费侧自行实现幂等性。而且 RabbitMQ 的重复路径比想象中多，尤其是 **requeue 与主从切换**这两条。

**RabbitMQ 产生重复消息的四条路径**

1. **消费者未及时 ACK**：消费者处理完消息但 ACK 丢失（网络问题/进程崩溃），Broker 认为消息未消费，重新投递。
2. **requeue 重复路径（最容易被忽视）**：`basicNack/basicReject` 带 `requeue=true` 时消息重新入队，若失败发生在“业务已部分成功”之后，再投递就是重复执行；且 requeue 后 deliveryTag 变化，无法用 deliveryTag 去重。
3. **生产者重试**：生产者发送后未收到 Confirm（超时/网络抖动）触发重试，Broker 实际已接收第一份，产生两条内容相同的消息。
4. **镜像队列主从切换**：主节点宕机时，已投递但未同步的 ACK 状态丢失，从节点提升为主后重新投递已消费消息。

**关键认知**：这四条路径都无法从协议层消除（除非用 Exactly Once 的事务性消费，性能代价极高且不通用），**幂等是唯一正解**。

**幂等性实现方案**

| 方案                 | 实现方式                                       | 优点         | 缺点                    | 适用场景             |
| :------------------- | :--------------------------------------------- | :----------- | :---------------------- | :------------------- |
| **数据库唯一索引**   | 消费前 INSERT 唯一键（消息 ID），冲突则跳过    | 简单可靠     | 依赖数据库，有性能开销  | 低频业务             |
| **Redis SETNX 去重** | 用 `SETNX` 设置消息 ID + 过期时间              | **高性能**   | Redis 宕机可能失效      | **高频业务（推荐）** |
| **乐观锁（版本号）** | 更新时带 `version` 条件，重复更新影响行数为 0  | 无需额外存储 | 需业务表有 version 字段 | 更新类业务           |
| **状态机控制**       | 业务状态严格流转，如“已支付”订单不允许重复扣款 | 业务语义清晰 | 需业务支持状态机        | 有明确状态流转的业务 |

**方案权衡**

- **去重键选择**：不要用 deliveryTag（requeue 后变化）；`messageId` 也不可靠（生产重试、TTL+DLX 重新投递都可能变），应优先用**业务唯一键**；若必须用 messageId，生产者必须显式设置且重发时保持不变。
- **性能对比**：DB 唯一索引强一致但受写入 TPS 约束（单机数千 TPS 量级）；Redis SETNX 可达十万级 TPS 但存在主从切换丢标记窗口；核心链路推荐 **Redis 初筛 + DB 唯一索引兜底**。

**最佳实践**

- **查询操作**：`SELECT` 是天然的幂等操作，无需额外处理。
- **更新操作**：使用乐观锁或带条件的更新。
- **慎用 requeue**：失败优先转死信 + 退避重试，避免无控重投风暴。
- **Redis 去重 + 数据库兜底**：高频场景用 Redis 去重，关键业务用数据库唯一索引双保险。

::: details 案例：Redis 去重消费（Java）

```java
public void consume(String messageId, String body) {
    // 1. Redis 去重检查
    Boolean isNew = redis.opsForValue().setIfAbsent(
        "msg:processed:" + messageId, "1", Duration.ofHours(1));

    if (Boolean.FALSE.equals(isNew)) {
        // 消息已处理，直接 ACK
        channel.basicAck(deliveryTag, false);
        return;
    }

    // 2. 执行业务逻辑
    try {
        processBusiness(body);
        channel.basicAck(deliveryTag, false);
    } catch (Exception e) {
        // 处理失败，删除 Redis 标记，允许重试
        redis.delete("msg:processed:" + messageId);
        channel.basicNack(deliveryTag, false, true); // requeue=true
    }
}
```

> 上述示例的隐藏坑：`redis.delete` 与 `basicNack` 之间若进程崩溃，标记已删但消息未 requeue，会依赖其他重复路径才能重试；更稳妥的做法是失败时**保留标记**并转死信队列人工处理，或用 DB 事务内写业务 + 写标记原子化。

:::

#### 🔬 扩展知识

**【L3】为什么 RabbitMQ 不提供 Exactly-Once**

::: details

要做到 Exactly Once 需要“消息删除与业务处理原子化”，而业务系统（DB/外部接口）与 Broker 不在同一事务域，协议层无法覆盖。工业界通行做法是 At Least Once + 消费幂等，在业务层达成 Exactly Once 效果，而不是寄希望于中间件。

:::

**【L4】幂等标记存储位置决定资金安全**

::: details

幂等标记若只存 Redis，Redis 与 MQ 同时故障时存在窗口；若与业务在同一 DB 事务中提交（先插处理记录再执行业务），切主后的重复消息会被唯一键挡住。金融级场景幂等必须落在强一致存储（DB）上，Redis 只能作初筛。

:::

#### 🏭 实战场景

::: details

**踩坑案例：requeue 风暴导致优惠券重复发放**（案例推演，数据为示意）

- **现象**：某次下游接口抖动，大量用户反馈优惠券被重复发放，优惠券表出现同一订单号多条记录。
- **排查**：消费日志显示同一消息在几秒内被反复消费；代码中下游超时后抛异常，监听器统一 `basicNack(requeue=true)`，消息回队后被另一个消费者拿走再执行，发券接口本身无幂等。
- **根因**：把 requeue 当重试机制使用——RabbitMQ 的 requeue 是“重新入队”，没有重试间隔与次数控制，抖动期间形成重投风暴；叠加业务接口无幂等，造成重复发放。
- **修复**：失败消息改为 `requeue=false` + 死信队列，由独立的重试消费者按退避策略（30s/2min/10min）从死信重投；发券接口增加订单号幂等校验。此后重复问题归零。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “用 deliveryTag 或 messageId 做去重键就够了” → 不可靠。deliveryTag 在 requeue 后变化，messageId 默认不保证唯一且重投可能变，应优先使用业务唯一键（订单号、流水号）。
- ❌ “RabbitMQ 配置正确就能做到不重复” → 错误。重复是 At-Least-Once 语义的固有属性，任何配置都无法消除，只能靠消费端幂等兼容。
- ❌ “Redis 去重能单独用于资金链路” → 危险。Redis 主从切换可能丢标记，资金场景必须叠加 DB 唯一索引或与业务同事务。

:::

#### 🔀 发散问题

1. 为什么 RabbitMQ 不提供 Exactly Once 消费？理论上能做到吗？
   要做到 Exactly Once 需要“消息删除与业务处理原子化”，而业务系统与 Broker 不在同一事务域，协议层无法覆盖。工业界通行做法是 At Least Once + 消费幂等，在业务层达成 Exactly Once 效果。
2. requeue=true 和转死信队列重试，应该怎么选？
   requeue 无延迟、无次数控制，适合“瞬时性错误且业务能容忍立即重试”的场景；但抖动型故障往往持续数秒到数分钟，无控 requeue 会形成风暴并打爆下游。转死信 + 退避重试可控性强（间隔、次数、告警都可配），应作为默认选择。
3. 镜像队列切主导致的重复，幂等表能完全挡住吗？
   取决于幂等标记的存储位置：若标记在业务 DB 且与业务同事务提交，切主后重复消息会被 DB 唯一键挡住；若标记只在 Redis，且 Redis 与 MQ 同时故障，存在窗口。所以金融级场景幂等必须落在强一致存储（DB）上。

### 【困难】RabbitMQ 如何保证消息有序？⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：RabbitMQ / 顺序性

#### 💎 关键结论

RabbitMQ 只保证单队列内的 FIFO 顺序，多消费者竞争、requeue、主从切换都会打破顺序。工程上的推荐解是**按业务 ID 哈希分流到多队列，每队列单消费者**，在顺序与吞吐之间取得平衡。

#### ⚡记忆卡片

- **口诀**：单队列单消绝对有序，业务键分流兼顾吞吐，慎用 requeue
- **关键词**：FIFO ／ 单消费者 ／ 哈希分流 ／ x-single-active-consumer ／ 一致性哈希交换机
- **链路**：生产者按业务 ID 哈希选队列 → 每队列单消费者串行处理 → 同业务 ID 消息始终同队列 → 保持局部有序

#### 📖 核心知识

RabbitMQ **仅保证队列内消息的 FIFO 顺序**（单队列单消费者时天然有序）。一旦多个消费者消费同一队列，或使用 `requeue` 机制，顺序性就会被打破。

**为什么 RabbitMQ 容易出现消息乱序？**

以下场景会导致消息乱序：

1. **多消费者竞争消费同一队列**：消息被轮询分发给不同消费者，各消费者处理速度不同，完成顺序不可控。
2. **消息重新入队（`requeue=true`）**：失败的消息重新入队后，会被排到队列**尾部**，而非原位置，破坏顺序。
3. **镜像队列主从切换**：主节点宕机后，未同步的消息可能丢失或乱序。
4. **网络延迟差异**：多消费者场景下，网络延迟不同导致处理完成顺序不一致。

**保证有序的方案对比**

| 方案                                 | 原理                                                               | 优点                           | 缺点                                 | 适用场景                             |
| :----------------------------------- | :----------------------------------------------------------------- | :----------------------------- | :----------------------------------- | :----------------------------------- |
| **单队列单消费者**                   | 一个队列只配置一个消费者，串行处理                                 | 简单，绝对保序                 | **吞吐量低**，无法水平扩展，单点瓶颈 | 消息量极小，顺序性要求绝对严格的场景 |
| **多队列分流（按业务 ID）**          | 生产者按业务 ID 哈希，将消息发送到不同队列，每队列单消费者         | **平衡顺序与性能**，可水平扩展 | 需提前规划队列数量，队列数固定       | **推荐**。同一业务 ID 消息有序的场景 |
| **一致性哈希交换机**                 | 使用 `rabbitmq_consistent_hash_exchange` 插件，按 Key 哈希分配队列 | 动态增减队列，负载均衡好       | 需安装插件，配置稍复杂               | 大规模有序消费场景                   |
| **消息组（single active consumer）** | RabbitMQ 3.8+ 的 `x-single-active-consumer` + `group_id`           | 自动管理消费者，故障自动切换   | 仅限 Quorum Queue，配置复杂          | 高可用 + 顺序消费的场景              |

**方案详解：多队列分流（推荐）**

**核心思路**：将同一业务 ID 的消息路由到同一队列，每队列只用一个消费者处理。

**注意事项**：

- 队列数量应根据并发需求合理设置（如 10~100）。
- 消费者数量 = 队列数量，**一一对应**。
- 若某个消费者宕机，对应队列的消息会积压，需有监控和告警。

**最佳实践建议**

- **优先评估需求**：很多业务可通过幂等性和状态机设计避免强顺序依赖。
- **首选多队列分流方案**：在需要保证顺序时，这是平衡吞吐量和顺序性的最佳选择。
- **避免无序操作**：慎用 `requeue=true`，失败消息可转入死信队列。
- **使用 Quorum Queue**：相比镜像队列，Quorum Queue 的 `x-single-active-consumer` 能在保证顺序的同时实现高可用。

::: details 案例：按 orderId 哈希分流（Java）

```java
// 1. 生产者：按 orderId 哈希选择队列
int queueNum = Math.abs(orderId.hashCode()) % QUEUE_COUNT;
String queueName = "order_queue_" + queueNum;
channel.basicPublish("", queueName, null, message.getBytes());

// 2. 为每个队列启动一个消费者，串行消费
for (int i = 0; i < QUEUE_COUNT; i++) {
    String qn = "order_queue_" + i;
    channel.basicConsume(qn, false, consumer); // autoAck=false
}
```

:::

#### 🔬 扩展知识

**【L3】x-single-active-consumer 的高可用保序**

::: details

仲裁队列（3.8+）支持 `x-single-active-consumer=true`：同一队列的多个消费者中只有一个处于活跃状态，其余作为热备；活跃消费者宕机后 Broker 自动切换备用，既保留单消费者串行保序，又解决了单队列单消费者的单点问题，是「高可用 + 保序」的官方方案。

:::

**【L4】顺序性的成本模型**

::: details

保序的本质代价是把并行度从「消费者数」降为「队列数」：吞吐上限 ≈ 队列数 × 单队列串行吞吐。因此设计顺序方案时先问两个问题：能否用幂等/状态机消除顺序依赖？只有同一实体（订单、账户）的事件才需要互相有序，不同实体间无需有序——哈希键选得越细，并行度越高。

:::

> 📚 延伸阅读：[RabbitMQ Single Active Consumer 官方文档](https://www.rabbitmq.com/consumers.html#single-active-consumer)

#### 🏭 实战场景

::: details

**场景推演：订单状态事件乱序导致状态回退**（案例推演，数据为示意）

- **现象**：订单中心发现约 0.5% 的订单状态出现「已发货→已支付」的回退；消费端为同一队列挂了 6 个消费者并行处理，单笔处理耗时 20~200ms。
- **根因推演**：同一订单的支付、发货事件被轮询分发给不同消费者，慢消费者上的前序事件晚于快消费者上的后序事件落库；叠加失败重投进一步打乱顺序。
- **处置与预防**：按订单 ID 哈希到 32 个分片队列、每队列单消费者后乱序归零；失败事件转死信退避重试，避免 requeue 插队；监控「状态回退」业务指标作为乱序报警。
- **量化**：32 队列 × 单队列约 300 TPS（推估值）≈ 9600 TPS 容量，较原单队列方案提升一个数量级。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “RabbitMQ 队列天然保证全局顺序，加消费者也不影响” → 错误。FIFO 只在单队列单消费者且无 requeue 时成立，多消费者竞争必然乱序。
- ❌ “失败后 requeue 重试不影响顺序” → 错误。requeue 会把消息插到队列其他位置，打破原有顺序；保序场景应转死信延后处理。
- ❌ “队列分得越多越好” → 不准确。队列数是并行度上限也是运维成本，需按吞吐需求规划；且哈希键分布不均会造成分片热点。

:::

#### 🔀 发散问题

1. 为什么很多业务其实不需要严格顺序？
   只要消费端幂等且用状态机校验前置状态，乱序到达的消息可以被安全丢弃或挂起，等价于“最终有序”；先评估能否用幂等替代保序，能省掉大量架构复杂度。
2. 一致性哈希交换机和手动哈希分流怎么选？
   队列数稳定且可预估时手动分流更可控；需要动态扩缩队列、避免扩容后全量重分布时用一致性哈希交换机插件。
3. Kafka 和 RabbitMQ 保序思路有什么异同？
   本质相同：都是「分区/队列 + 键哈希 + 分区内单消费者」；区别在 Kafka 分区是一等公民且支持海量分区，RabbitMQ 队列较重，分片数量级更小。见本文档『RabbitMQ 如何应对消息堆积？』中的架构对比。

### 【困难】RabbitMQ 如何应对消息堆积？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：RabbitMQ / 消息积压

#### 💎 关键结论

应对堆积的方针是**加速消费是根本，限流生产是保底**。同时要认清 RabbitMQ 的架构短板：它不是为海量积压设计的（对比 Kafka/RocketMQ 的顺序日志存储，后者积压上亿条仍能稳定消费），积压治理重在预防。

#### ⚡记忆卡片

- **口诀**：扩容提 prefetch，惰性落盘解内存，转发分片快消化，限流保底线
- **关键词**：prefetch ／ Lazy Queue ／ 临时队列转发 ／ x-max-length ／ vm_memory_high_watermark ／ connection.blocked
- **链路**：积压增长 → 内存逼近水位 → 先转惰性/扩容解除阻塞 → 转发到多分片队列并行消化 → 生产端限流防再次压垮

#### 📖 核心知识

**为什么 RabbitMQ 怕积压（架构根因）**

- **内存优先的队列实现**：消息默认在内存中排队，积压触发 `vm_memory_high_watermark`（默认 0.4）后 Broker **阻塞所有生产者连接**，积压会反噬全集群。
- **页交换惩罚**：持久化消息积压超出内存后换页到磁盘，消费时再换回，读写退化为随机 IO，吞吐显著下降（积压百万级时消费速率常见下降 5~10 倍，经验值）。
- **与 Kafka 的差距**：Kafka 分区独立顺序日志，积压只是顺序读磁盘，恢复速率接近峰值；RabbitMQ 单队列是单进程串行模型，无法通过加磁盘线性恢复——**RabbitMQ 的积压治理重在“预防”，而 Kafka 重在“快速消化”**。

**应急三板斧：扩容、惰性、降级**

1. **扩容消费者**：无顺序要求时，增加消费实例/线程，调大 `prefetch_count`（如从 10 提到 50~100）提升管道内消息数；注意单队列并发消费者共享队列，吞吐上限受队列所在节点约束。
2. **惰性队列（Lazy Queue）消化存量**：把积压队列转为 `x-queue-mode=lazy`，消息直接落盘不占内存，解除内存告警与生产阻塞，让 Broker 缓过来后再慢慢消费；新版本更推荐直接迁移仲裁队列 + `delivery-limit`。
3. **临时队列转发（重度积压）**：新建多倍队列数的临时 Topic 组，用桥接消费者把存量快速搬运过去，再部署多倍消费者并行消化——与 RocketMQ 临时 Topic 方案同理。
4. **非核心降级**：暂停日志/埋点类队列消费与生产，把资源让给核心链路。

**优化消费能力**

- **批量处理**：配合 `prefetch` 攻攒一批后批量入库，减少 ACK 往返与 DB IO（注意批量 ACK 失败会整批 requeue，需幂等）。
- **异步化**：消费线程只入内存队列，后台线程池异步处理，避免同步阻塞拉取管道。
- **跳过非关键逻辑**：临时关闭校验、日志等旁路。

**量化估算与容量参数**

- **消化时长估算**：`积压量 / (消费总 TPS - 新增 TPS)`。例：积压 500 万，单消费者 200 TPS，5 个实例，新增 500 TPS：净速率 = 1000 - 500 = 500 TPS，约 2.8 小时消化完；结论不达标就得扩实例或转惰性 + 转发。
- **关键阈值**：`vm_memory_high_watermark`（默认 0.4，触发生产阻塞）、`disk_free_limit`（默认 50 MB，磁盘低于阈值全节点阻塞）、`x-max-length`（队列上限，超出丢弃最旧）。

**辅助手段：管理生产与队列**

- **生产端限流**：控制发送速率，避免压垮系统；监听 `connection.blocked/unblocked` 回调感知背压并告警。
- **设置队列最大长度**：`x-max-length` 限制容量，配合 DLX 记录被丢弃消息用于审计。
- **设置消息 TTL**：`x-message-ttl` 使过期消息自动丢弃，保证时效性敏感消息不堆积。

#### 🔬 扩展知识

**【L3】connection.blocked 的节点级全局性**

::: details

内存/磁盘保护是**节点级全局的**：一个队列的积压耗尽内存后，同节点所有队列的发布都会被阻塞，无关业务连带受损。因此按重要性拆分 vhost 只是逻辑隔离，真正的故障域隔离需要节点级甚至集群级拆分，积压告警应设在水位触发前（如 50%）。

:::

**【L4】仲裁队列的积压行为差异**

::: details

仲裁队列消息默认全量落盘（类似惰性行为），积压主要消耗磁盘而非内存，不会轻易触发内存水位阻塞；但 Raft 日志与快照在高积压下的回收、以及消费读盘吞吐仍需关注，配合 `delivery-limit` 防毒消息，是新版 RabbitMQ 积压治理的推荐底座。

:::

> 📚 延伸阅读：[RabbitMQ Lazy Queues 官方文档](https://www.rabbitmq.com/lazy-queues.html)

#### 🏭 实战场景

::: details

**踩坑案例：内存水位告警引发全集群生产阻塞**（案例推演，数据为示意）

- **现象**：凌晨某下游服务发版故障停止消费，两小时后全业务线告警：所有生产者（包括无关业务）发送卡死。
- **排查**：控制台显示故障队列积压 800 万条，节点内存告警；`rabbitmqctl status` 确认触发 `memory resource limit`，Broker 阻塞了全部连接的发布。
- **根因**：RabbitMQ 的内存保护是**节点级全局的**——一个队列的积压耗尽内存后，同节点所有队列的生产都被阻塞；且该队列未设 `x-max-length`，积压无上限。
- **修复**：紧急部署临时消费者 + 将该队列转惰性模式降压；长期方案：业务队列按重要性拆 vhost/节点隔离，关键队列配 `x-max-length` + DLX，积压告警阈值设在内存水位的 50% 之前。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “加消费者就能无限提速” → 错误。单队列吞吐受队列所在节点的单进程模型约束，消费者加到一定数量后收益递减；要提速必须分片多队列。
- ❌ “积压只是消费慢，不影响生产者” → 错误。积压触发内存/磁盘水位后 Broker 会阻塞全部发布，积压会反噬全节点。
- ❌ “惰性队列能当常规高性能队列用” → 不准确。惰性队列消费需逐条读盘，吞吐显著低于内存队列，只适合存量慢消化，消化完应转回默认模式。

:::

#### 🔀 发散问题

1. 为什么扩容消费者在 RabbitMQ 上有上限？和 Kafka 有什么不同？
   RabbitMQ 的队列是单一数据结构，消费者再多也要经过队列所在节点的这个单点；且单队列内部调度是单进程模型，吞吐天花板常见在万级 TPS。Kafka 则以 Partition 为并行单位，分区数决定并行度上限，架构上更适合海量积压场景。
2. 惰性队列（Lazy Queue）的原理和代价是什么？
   惰性队列把消息直接写磁盘、内存中只保留极少量索引，从而支持千万级积压而不触发内存告警；代价是消费时每条消息需从磁盘读取，消费吞吐显著低于内存队列，适合“存量慢慢消化”而非“高吞吐实时消费”，消化完成后应转回默认模式。
3. 积压导致 `connection.blocked` 后，生产者应该怎么处理？
   必须监听 `blocked/unblocked` 回调：阻塞期间停止发送或写入本地缓冲/降级（如丢弃日志类消息、写备用存储），避免发送线程无限堆积拖垮应用本身；恢复后限速重放。不感知背压是积压事故放大的常见原因。

### 【中等】RabbitMQ 如何实现背压机制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 流量控制

#### 💎 关键结论

RabbitMQ 的背压是一条连锁反应链：**消费者 QoS 限流 → Broker 队列积压 → 资源水位触发阻塞生产者连接**，把消费端的压力反向传导到生产端。它让系统吞吐由最慢的消费者决定，而非最快的生产者。

#### ⚡记忆卡片

- **口诀**：QoS 起步，积压传导，水位阻塞生产者
- **关键词**：prefetch ／ unacked ／ 队列积压 ／ vm_memory_high_watermark ／ connection.blocked
- **链路**：消费者 prefetch 限制未确认数 → 处理变慢后 Broker 停推新消息 → 队列积压消耗内存/磁盘 → 达阈值后阻塞生产者连接 → 生产者被动降速

#### 📖 核心知识

RabbitMQ 通过一套**连锁反应机制**实现背压，将消费者的处理压力反向传导至生产者，迫使生产者降速，避免系统被压垮。

**背压触发与传导流程**

- **起点：消费者限流**

  - **机制**：消费者设置较小的 **QoS 预取值**（如 `prefetch=1`）。
  - **效果**：当消费者处理变慢，未确认消息数达到上限时，Broker **立即停止向该消费者推送新消息**。

- **中间环节：Broker 积压**

  - **效果**：消息在队列中快速堆积，消耗 Broker 的内存和磁盘资源。

- **终点：生产者被限速**
  - **机制**：当 Broker 资源（内存/磁盘）达到阈值时，自动**阻塞生产者的连接**。
  - **效果**：生产者的发送操作被暂停或变慢，**背压成功传导至源头**。

**关键配置与监控**

- **必须使用手动确认模式**：这是 QoS 生效的前提。
- **设置小预取值**：是启动背压链条的关键（如 1-10）。
- **监控队列长度**：队列积压是背压触发的明显信号。
- **监听连接阻塞**：生产者通过监听器感知背压，进行日志记录或告警。

**核心价值**

这套机制确保了**系统的吞吐量由最慢的消费者决定，而非由最快的生产者决定**，从而优雅地实现了系统自我保护。

**一句话总结：通过 `消费者 QoS` 触发，经 `Broker 积压` 传导，最终由 `Broker 流控` 作用于生产者，形成完整的背压闭环**。

#### 🔬 扩展知识

**【L3】背压信号的观测点**

::: details

三层背压各有观测手段：消费者层看 unacked 消息数是否长期顶到 prefetch；队列层看 `messages_ready` 积压量与增长速率；生产者层监听 `connection.blocked/unblocked` 回调。把三个信号串成告警链，可以在内存水位触发前就发现背压传导。

:::

**【L4】与响应式流背压的对比**

::: details

RabbitMQ 背压是资源水位驱动的「硬背压」（直接阻塞连接），而 Reactive Streams/Netty 的背压是信用额度驱动的「软背压」（按请求量投递）。前者简单但有全局阻塞副作用，后者精细但需要端到端协议支持；理解差异有助于解释为什么 RabbitMQ 需要配合队列隔离来避免背压互相传染。

:::

> 📚 延伸阅读：[RabbitMQ Flow Control 官方文档](https://www.rabbitmq.com/flow-control.html)

#### 🔀 发散问题

1. 背压触发后生产者应该硬重试吗？
   不建议。阻塞期间硬重试只会堆积发送线程；应监听 blocked 回调暂停发送、写本地缓冲或降级，unblocked 后限速重放。
2. prefetch 设大是不是就绕过背压了？
   只是把压力从 Broker 转移到了消费者内存：unacked 消息堆积在客户端，消费者 OOM 后消息整批 requeue，背压问题以更剧烈的形式重现。见本文档『RabbitMQ 的 prefetch_count 有什么作用？如何设置？』。

## RabbitMQ 架构

### 【中等】RabbitMQ 为什么使用 Erlang 语言？有什么优势和劣势？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 架构与语言

#### 💎 关键结论

选 Erlang 是因为它为电信级系统设计：轻量进程 + Actor 模型 + OTP 容错，与消息中间件「高并发、高可靠」的需求天然匹配。代价是语言小众、二开与运维门槛高，且不适合海量堆积场景。

#### ⚡记忆卡片

- **口诀**：轻量进程百万级，OTP 自愈 let it crash，性能强但生态小
- **关键词**：Erlang ／ 轻量进程 ／ Actor ／ OTP ／ 热升级 ／ 堆积弱
- **链路**：Erlang 轻量进程支撑海量连接 → Actor 消息传递契合 MQ 模型 → OTP Supervisor 自动重启保自愈 → 代价：语言小众、堆积能力弱

#### 📖 核心知识

RabbitMQ 使用 **Erlang** 语言开发，这是一个由爱立信为电信系统设计的函数式编程语言。这一选择深刻影响了 RabbitMQ 的架构特点和性能表现。

**Erlang 的核心特性**

| 特性           | 说明                                                     | 对 RabbitMQ 的影响                               |
| :------------- | :------------------------------------------------------- | :----------------------------------------------- |
| **轻量级进程** | Erlang 的进程极其轻量（约 2KB 栈），单机可创建百万级进程 | RabbitMQ 可为每个连接/信道创建独立进程，隔离性好 |
| **Actor 模型** | 进程间通过消息传递通信，无共享内存                       | 天然适合消息队列的并发模型                       |
| **OTP 框架**   | 提供 Supervisor 树、GenServer 等成熟模式                 | RabbitMQ 具备强大的容错和自愈能力                |
| **抢占式调度** | Erlang VM 的调度器公平分配 CPU 时间                      | 单个慢请求不会阻塞其他请求                       |
| **热代码升级** | 支持运行时替换代码                                       | RabbitMQ 可不停机升级                            |

**优势**

1. **高并发**：Erlang 的轻量级进程使得 RabbitMQ 在单机上能支持**数万并发连接**，延迟稳定在微秒级。
2. **高可用与容错**：OTP 的 Supervisor 树实现“let it crash”哲学，进程崩溃后自动重启，系统自愈能力强。
3. **分布式原生支持**：Erlang 内置分布式通信机制，RabbitMQ 集群节点间通信天然高效。
4. **低延迟**：Erlang 的调度和消息传递机制使得 RabbitMQ 的消息延迟可达**微秒级**，是主流 MQ 中延迟最低的。

**劣势**

1. **学习曲线陡峭**：Erlang 是函数式语言，对 Java/Go 背景的工程师不友好，二次开发和深度调优困难。
2. **社区规模小**：相比 Java/Go，Erlang 开发者少，社区生态有限，问题排查资料少。
3. **不适合计算密集型**：Erlang 擅长 I/O 密集型场景，但在 CPU 密集型计算上性能不如 Java/Go。
4. **堆积能力弱**：RabbitMQ 的存储设计不适合海量消息堆积，堆积过多会影响整体性能（与 Erlang 的 GC 机制有关）。
5. **运维门槛高**：Erlang VM 的调优需要专业知识，普通运维人员难以驾驭。

**与其他 MQ 的对比**

| 维度         | RabbitMQ (Erlang)      | Kafka (Scala/Java) | RocketMQ (Java)  |
| :----------- | :--------------------- | :----------------- | :--------------- |
| **并发模型** | Actor 模型（轻量进程） | 线程模型           | 线程模型         |
| **延迟**     | **微秒级**（最低）     | 毫秒级             | 毫秒级           |
| **吞吐量**   | 万级                   | **百万级**（最高） | 十万级           |
| **堆积能力** | 弱（万级为佳）         | **极强**（亿级）   | 强（亿级）       |
| **二次开发** | 困难（Erlang）         | 容易（Java/Scala） | **容易**（Java） |

#### 🔬 扩展知识

**【L3】let it crash 与队列进程的自愈**

::: details

RabbitMQ 中每个队列对应一个 Erlang 进程，由 Supervisor 树管理：队列进程异常崩溃时，Supervisor 按策略自动重启并恢复状态（持久化队列从磁盘重建），而不是像线程模型那样让整个服务崩溃。这也是「单队列故障不影响其他队列」隔离性的来源。

:::

**【L4】Erlang GC 与延迟的关系**

::: details

Erlang 采用**每进程独立的小堆 + 分代 GC**：垃圾回收只停顿单个轻量进程（微秒级），不会出现 JVM 式的全局 STW，这是 RabbitMQ 尾部延迟稳定的重要原因；代价是大量消息驻留内存时（堆积）总内存占用与 GC 压力上升，解释了其堆积能力弱的语言层根因。

:::

#### 🔀 发散问题

1. 为什么 RabbitMQ 堆积能力弱也和 Erlang 有关？
   消息在 Erlang 进程堆上排队，堆积时内存占用与 GC 压力同步上升；而 Kafka 的页缓存 + 顺序日志把数据交给 OS 管理，语言层无此负担。
2. 用 Java 重写一个 RabbitMQ 可行吗？
   技术上可行（如 Apache Qpid），但要重新解决海量连接的线程模型、全局 GC 停顿与容错框架问题，这正是 Erlang/OTP 数十年沉淀的护城河。

### 【中等】RabbitMQ 的 prefetch_count 有什么作用？如何设置？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 流量控制

#### 💎 关键结论

prefetch_count 是消费者限流的核心参数：**限制单个消费者未确认消息的最大数量**，达到上限后 Broker 停止推送。设置原则：消费快设大（50~100）、消费慢设小（1~10），必须配合手动 ACK 才生效。

#### ⚡记忆卡片

- **口诀**：预取限未确认，达上限停推，ACK 一条补一条
- **关键词**：basicQos ／ prefetchCount ／ unacked ／ 手动 ACK ／ 公平分发
- **链路**：basicQos 设 N → Broker 推送 N 条处于 unacked → 达到 N 后停推 → 消费者 ACK 一条 → Broker 补推一条 → 维持 unacked ≤ N

#### 📖 核心知识

`prefetch_count`（预取计数）是 RabbitMQ **消费者限流** 的核心参数，通过 `channel.basicQos()` 设置。

**核心作用**

**限制单个 Channel 上未确认（unacked）消息的最大数量**。当未确认消息数达到 `prefetch_count` 时，Broker **停止向该消费者推送新消息**，直到消费者确认部分消息后才会继续推送。

**工作原理**

1. 消费者设置 `prefetch_count = N`。
2. Broker 推送 N 条消息给消费者，这些消息处于 `unacked` 状态。
3. 消费者处理完一条消息，调用 `basicAck()`，Broker 感知后**再推送一条**新消息。
4. 始终保持 `unacked` 消息数 ≤ N。

**prefetch_count 取值的影响**

| 取值               | 行为                               | 优点                   | 缺点                         | 适用场景                   |
| :----------------- | :--------------------------------- | :--------------------- | :--------------------------- | :------------------------- |
| **未设置（0）**    | **无限制**，Broker 持续推送        | 吞吐量最高             | 消费者可能被压垮，内存溢出   | 不推荐                     |
| **= 1**            | 一次只推送一条，确认后才推送下一条 | **严格限流**，公平分发 | 吞吐量低，网络往返开销大     | 顺序消费、消费耗时长的场景 |
| **适中（10~100）** | 允许一定数量的未确认消息           | **平衡吞吐与限流**     | 需根据业务调优               | **大多数场景推荐**         |
| **过大（1000+）**  | 几乎无限流效果                     | 吞吐量高               | 失去限流意义，可能压垮消费者 | 不推荐                     |

**全局 vs Consumer 级别**

`basicQos` 的 `global` 参数决定作用域：

```java
// Consumer 级别（prefetchCount 作用于单个消费者，更精细，推荐）
channel.basicQos(10);

// global 参数：false 为 Consumer 级别，true 为 Channel 级别
channel.basicQos(10, true);
```

- **Consumer 级别**（推荐）：每个消费者独立计数，限流更精确。
- **Channel 级别**：Channel 下所有消费者共享计数，可能导致分配不均。

**最佳实践**

1. **必须配合手动 ACK**：`prefetch_count` 仅在 `autoAck=false` 时生效。
2. **根据消费耗时调优**：
   - 消费快（毫秒级）：`prefetch_count` 可设置较大（如 50~100）。
   - 消费慢（秒级）：`prefetch_count` 应设置较小（如 1~10）。
3. **避免设置过大**：过大的 `prefetch_count` 会导致消息积压在客户端内存中，可能引发 OOM。
4. **公平分发**：设置 `prefetch_count=1` 可实现公平分发（能者多劳），避免快消费者空闲、慢消费者积压。

#### 🔬 扩展知识

**【L3】prefetch 与批量消费的联动**

::: details

批量消费场景下 prefetch 应 ≥ 批量大小，否则管道内消息凑不够一批；但也不宜过大，避免单消费者 OOM 后整批 requeue。经验值是「prefetch = 批量大小 × 1~2」，并结合单条消息体积估算客户端内存占用。

:::

**【L4】prefetch=0 的真实行为**

::: details

prefetch=0 表示不设限，Broker 会尽可能多推（受内存与调度约束），常被误读为「不推送」；这在慢消费者场景会把队列内存压力转移到客户端，是隐性 OOM 来源。AMQP 规范中 0 的含义是「无限制」，面试中是经典陷阱。

:::

> 📚 延伸阅读：[RabbitMQ Consumer Prefetch 官方文档](https://www.rabbitmq.com/consumer-prefetch.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “prefetch 越大吞吐越高，往大里设” → 错误。过大 prefetch 把未确认消息压在客户端内存，消费者崩溃后整批重投，且失去限流意义；应按消费耗时平衡设置。
- ❌ “autoAck 模式下 prefetch 也生效” → 错误。prefetch 只约束未确认消息，autoAck 推送即确认，无未确认可言，QoS 不生效。
- ❌ “prefetch 限制的是队列总消息数” → 错误。它限制的是每个消费者（或 Channel）的未确认数，与队列长度无关。

:::

#### 🔀 发散问题

1. prefetch 和 Kafka 的 max.poll.records 有什么相似之处？
   都是消费端批量拉取/推送的上限控制，作用都是平衡吞吐与内存压力；区别在 RabbitMQ 是 Broker 推送模型下的信用额度，Kafka 是客户端拉取模型的批量参数。
2. 如何实现「能者多劳」的公平分发？
   设置 prefetch=1，Broker 只在消费者确认后才发下一条，快的消费者自然拿到更多消息，避免轮询分发下的忙闲不均。

### 【中等】RabbitMQ 如何实现延迟队列？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RabbitMQ / 延迟消息

#### 💎 关键结论

RabbitMQ 原生不支持延迟消息，两种实现：**TTL + 死信队列**（无插件但定时不精确、不灵活）与 **`rabbitmq_delayed_message_exchange` 插件**（每条消息独立设延迟、毫秒级精度，推荐）。选型看延迟是否需逐条动态设置。

#### ⚡记忆卡片

- **口诀**：原生 TTL 转死信，插件 x-delay 更精确
- **关键词**：TTL ／ DLX ／ x-delay ／ x-delayed-message ／ 插件
- **链路**：方案一：消息进 TTL 队列 → 过期转 DLX → 路由到目标队列；方案二：消息带 x-delay 发入延迟交换机 → 插件到期投递

#### 📖 核心知识

RabbitMQ 实现延迟队列主要有两种方式：

| 方法                                         | 原理                                                                                                     | 优点                   | 缺点                                                     | 适用场景                         |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------- | :------------------------------------------------------- | :------------------------------- |
| **死信队列+TTL**                             | 让消息先进入一个**有过期时间（TTL）** 的队列，消息过期后自动被转发到**死信交换机**，再路由到最终消费队列 | 稳定可靠，无需额外插件 | **不灵活**，需为不同延迟时间创建多个队列；**定时不精确** | 允许一定时间误差的简单延迟任务   |
| **`rabbitmq_delayed_message_exchange` 插件** | 使用一种特殊的交换机。发送消息时通过 `x-delay` 参数**为每条消息单独设置延迟时间**                        | **定时精确**，使用简便 | 需安装插件，大量延迟消息可能影响内存                     | **推荐方案**，要求定时精确的场景 |

#### 🔀 发散问题

1. 为什么 TTL+DLX 定时不精确？
   消息级 TTL 只在队首检查过期，短 TTL 消息排在长 TTL 消息后面时要等前者出队才被判定，实际延迟会大于设定值；若需要精确逐条延迟，用插件或仲裁队列方案。更详细的实现步骤与代码见本文档后文的『RabbitMQ 如何实现延迟队列？』（插件方案详解）。
2. 订单超时关闭这类业务适合哪种方案？
   每单超时时间不同（下单时间各异），需要逐条动态延迟，适合插件方案；若所有订单统一 30 分钟超时，TTL+DLX 也够用。

### 【中等】RabbitMQ 中无法路由的消息会去到哪里？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 可靠投递

#### 💎 关键结论

无法路由的消息去向由 `mandatory` 参数决定：默认 false 直接丢弃，true 时通过 ReturnCallback 退回生产者。注意它不会进死信队列——死信只处理「已入队后」的异常消息。

#### ⚡记忆卡片

- **口诀**：mandatory 定去留，默认丢弃、true 退回，死信不管未入队
- **关键词**：mandatory ／ ReturnCallback ／ basic.return ／ 非死信
- **链路**：发布消息 → 交换机无匹配队列 → mandatory=false 则丢弃 / true 则退回生产者 → （与死信队列无关）

#### 📖 核心知识

在 RabbitMQ 中，无法路由的消息去向由生产者发送时的 `mandatory` 参数决定：

- **`mandatory = false` （默认值）**：消息被 Broker **直接丢弃**。
- **`mandatory = true`**：消息通过 **`ReturnCallback`** 机制**返回给生产者**进行处理。

**重要提示**：无法路由的消息不会自动进入死信队列（DLQ），因为死信队列用于处理已成功入队但后被拒绝或过期的消息。两种异常的边界划分与完整处理手段（含备用交换机）见本文档前文的『RabbitMQ 中无法路由的消息会去到哪里？』。

#### 🔀 发散问题

1. 死信和无法路由的核心区别是什么？
   分界点是「是否成功入队」：无法路由发生在入队前（交换机层），死信发生在入队后（队列层：被拒、过期、溢出），两者配置参数完全不同。
2. 想兼顾两者兜底怎么配？
   生产端 mandatory + ReturnListener 处理入队前异常，队列配 DLX 处理入队后异常，两层兜底才能覆盖全链路。

### 【中等】RabbitMQ 中消息什么时候会进入死信交换机？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：RabbitMQ / 死信机制

#### 💎 关键结论

三种情况进死信：**被拒绝且不重入队、TTL 过期、队列满挤出**；前提是队列预先配置了 `x-dead-letter-exchange`。记「拒、过期、满」三因即可。

#### ⚡记忆卡片

- **口诀**：拒不过期、过期不拒、队列满挤，前提配 DLX
- **关键词**：reject ／ requeue=false ／ TTL ／ x-max-length ／ x-dead-letter-exchange
- **链路**：三种触发之一发生 → Broker 将消息发布到队列配置的 DLX → 按死信路由键进入死信队列

#### 📖 核心知识

RabbitMQ 中，消息会在以下三种情况下进入死信交换机（DLX）：

1.  **被拒绝 (Rejected)**：消费者拒绝消息（`basic.reject` 或 `basic.nack`）且不重新入队（`requeue=false`）。
2.  **已过期 (Expired)**：消息的存活时间（TTL）到期。
3.  **队列满 (Overflowed)**：队列达到最大长度限制，最老的消息会被挤出。

**核心前提**：必须在声明原始队列时通过 `x-dead-letter-exchange` 参数预先配置好死信交换机。

> 完整配置步骤、注意事项与应用场景见本文档前文的『RabbitMQ 中消息什么时候会进入死信交换机？』详解。

#### 🔀 发散问题

1. 队列删除时消息会进死信吗？
   不会。删除队列会直接连同消息一起删除，不触发死信流转；这是常见的认知误区。
2. 死信队列一定要人工处理吗？
   不一定。可以挂自动补偿消费者按退避策略重投，超过重试上限再转人工队列，形成多级重试链。

### 【中等】RabbitMQ 的镜像队列和 Quorum Queue 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 集群与高可用

#### 💎 关键结论

一句话区分：镜像队列是主从异步复制，重性能弱一致（可能丢消息）；仲裁队列基于 Raft 共识，重安全强一致（不丢消息）。官方自 3.8 起推荐仲裁队列，4.0 已移除镜像队列，新项目无脑选仲裁。

#### ⚡记忆卡片

- **口诀**：镜像异步快但可能丢，仲裁 Raft 慢但绝不丢
- **关键词**：主从异步复制 ／ Raft ／ 多数派确认 ／ 脑裂 ／ 3.8 ／ 4.0 移除
- **链路**：写入镜像队列 → 主确认即返回（从异步同步，主宕机丢未同步）；写入仲裁队列 → 多数派落盘确认才返回 → 切主只选日志最全节点

#### 📖 核心知识

RabbitMQ 官方自 3.8.x 版本起，**推荐优先使用 Quorum Queue** 作为高可用解决方案。

- **镜像队列**：主从异步复制，**重性能、弱一致**（可能丢消息）。
- **仲裁队列**：基于 Raft 共识，**重安全、强一致**（不丢消息）。

**核心区别对比**

| 特性           | 镜像队列                                     | 仲裁队列                                     |
| :------------- | :------------------------------------------- | :------------------------------------------- |
| **复制机制**   | **主从异步复制**                             | **Raft 共识算法**                            |
| **数据一致性** | **最终一致性**（主节点宕机可能**丢失消息**） | **强一致性**（消息确认即安全，**绝不丢失**） |
| **性能**       | **延迟低，吞吐量高**（只需主节点确认）       | **延迟高，吞吐量相对低**（需多数节点确认）   |
| **故障恢复**   | 快，但可能选数据落后的节点为主               | 慢，但保证新主数据最全，**更安全**           |
| **设计目标**   | 灵活、高性能                                 | 数据安全、强一致                             |
| **适用场景**   | 允许微量丢失的非关键业务、低延迟场景         | **金融、交易等关键业务**，要求数据零丢失     |

**选择建议**

- **优先选择仲裁队列**：特别是对于新项目和关键业务，其数据安全性是首要优势。
- **仅在对延迟有极端要求**，且可容忍消息丢失时，才考虑镜像队列。

#### 🔬 扩展知识

**【L3】版本演进时间线**

::: details

仲裁队列于 3.8 引入并同步宣布镜像队列弃维（deprecated）；此后新版本持续增强仲裁队列（如 delivery-limit、single-active-consumer），并在 4.0 彻底移除镜像队列代码。面试时给出这条时间线能显著体现版本敏感度。

:::

**【L4】脑裂行为的本质差异**

::: details

网络分区时镜像队列两侧可能各自继续接受写入（分叉），恢复后少数派数据被丢弃；仲裁队列因 Raft 少数派拒写，分区期间少数派自动不可服务，恢复后数据天然收敛。这是「异步复制 + 人工策略」与「共识协议内置安全」的本质差异。

:::

> 📚 延伸阅读：[RabbitMQ Quorum Queue 官方说明](https://www.rabbitmq.com/quorum-queues.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “镜像队列只是慢一点，数据一样安全” → 错误。异步复制下主宕机会丢未同步消息，切主可能选落后副本，与仲裁队列是不同一致性级别。
- ❌ “新项目可以继续用镜像队列，成熟稳定” → 过时。镜像队列 3.8 起弃维、4.0 已移除，新项目应直接用仲裁队列。
- ❌ “仲裁队列性能差，不能用在线业务” → 不准确。多数派确认带来的是吞吐下降（经验值 30%~50%）与延迟上升，对绝大多数在线业务仍可接受；仅极低延迟场景才需权衡。

:::

#### 🔀 发散问题

1. 存量镜像队列如何迁移到仲裁队列？
   无法原地转换：需新建仲裁队列、双写或停写搬运存量、切换消费者后再下线旧队列；可利用管理插件的队列导入导出辅助。
2. 仲裁队列的节点数要求？
   需要多数派存活：3 副本容忍 1 节点故障，5 副本容忍 2 节点故障；副本数在声明时通过 `x-quorum-queue` 相关参数与集群规模决定。

### 【中等】RabbitMQ 如何通过插件扩展功能？常用的插件有哪些？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：RabbitMQ / 插件机制

#### 💎 关键结论

RabbitMQ 用 `rabbitmq-plugins` 工具管理插件，通过 Erlang 的 OTP 应用机制实现不停机扩展。面试重点记住五个高频插件：management（控制台）、federation（跨域）、shovel（搬运）、delayed_message_exchange（延迟）、auth_backend_ldap（认证）。

#### ⚡记忆卡片

- **口诀**：rabbitmq-plugins enable 启用，五大插件：管理/联邦/铲子/延迟/LDAP
- **关键词**：rabbitmq-plugins ／ rabbitmq_management ／ rabbitmq_federation ／ rabbitmq_shovel ／ delayed_message_exchange ／ LDAP
- **链路**：enable 插件 → Broker 加载 OTP 应用 → 新能力生效（控制台/转发/延迟等）→ disable 反向卸载

#### 📖 核心知识

RabbitMQ 借助插件机制扩展功能，可通过其提供的 `rabbitmq-plugins` 工具管理插件。

启用插件的命令：

```sh
rabbitmq-plugins enable <插件名>
```

禁用插件的命令：

```sh
rabbitmq-plugins disable <插件名>
```

常用的 RabbitMQ 插件有：

- `rabbitmq_management`：用于管理 RabbitMQ 的 Web 控制台插件，提供图形界面监控和管理。
- `rabbitmq_federation`：允许 RabbitMQ 节点和集群跨广域网通信。
- `rabbitmq_shovel`：用于桥接不同 RabbitMQ 节点，实现消息转发。
- `rabbitmq_delayed_message_exchange`：支持延迟消息，可在指定时间后投递消息。
- `rabbitmq_auth_backend_ldap`：允许 RabbitMQ 通过 LDAP（轻量级目录访问协议）进行用户认证。

#### 🔬 扩展知识

**【L3】插件与 RabbitMQ 核心的关系**

::: details

RabbitMQ 本身是 Erlang/OTP 应用，插件也是 OTP 应用，enable 即启动对应应用及其依赖；部分插件（如 management）需要监听额外端口（默认 15672），部署时需同步放通防火墙。可用 `rabbitmq-plugins list` 查看全部可用插件及启用状态。

:::

**【L4】社区插件与版本兼容性**

::: details

除官方内置插件外，社区插件（如 consistent_hash_exchange、消息轨迹类插件）需从 RabbitMQ 社区仓库下载对应版本编译包，版本必须与 Broker 主版本匹配，否则启动失败；升级 Broker 时插件兼容性检查是标准运维步骤。

:::

#### 🔀 发散问题

1. federation 和 shovel 插件怎么选？
   订阅式、多级、需断点续传的跨集群转发用 federation；简单的点对点消息搬运用 shovel。见本文档『RabbitMQ 有哪些集群模式？』。
2. 延迟消息插件生产能用吗？
   能，但大量延迟消息会占用内存/磁盘，需评估延迟消息存量；金融级精确场景也可用 TTL+DLX 多队列方案对比选型。见本文档『RabbitMQ 如何实现延迟队列？』。

### 【中等】RabbitMQ 如何实现延迟队列？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 延迟消息

#### 💎 关键结论

两种实现：**原生 TTL + 死信队列**（无插件、固定延迟、精度秒级）与 **延迟交换机插件**（消息级动态延迟、毫秒级精度，推荐）。选型核心：延迟时间是否需逐条动态设置。

#### ⚡记忆卡片

- **口诀**：固定延迟用 TTL+DLX，动态延迟用插件 x-delay
- **关键词**：x-message-ttl ／ x-dead-letter-exchange ／ x-delayed-message ／ x-delay ／ 毫秒级
- **链路**：TTL 方案：消息进延迟队列 → TTL 到期转 DLX → 路由到目标队列；插件方案：消息带 x-delay 进延迟交换机 → 插件内部调度到期投递

#### 📖 核心知识

**原生方案：TTL+死信队列（DLX）**

- **核心原理**：通过消息 TTL（存活时间）和死信交换机（DLX）实现延迟投递。
- **实现步骤**

  1. **创建延迟队列**：设置 `x-message-ttl`（消息过期时间）和 `x-dead-letter-exchange`（死信交换机）
  2. **消息投递**：发送到延迟队列，等待 TTL 到期
  3. **自动转发**：过期后由 DLX 将消息路由到目标队列
  4. **消费者**：从目标队列获取延迟消息

- **特点**
  - 固定延迟时间（每条消息 TTL 需单独设置）
  - 无需插件，但灵活性较差

**插件方案：rabbitmq_delayed_message_exchange**

- **核心原理**：官方插件提供 `x-delayed-message` 交换机类型，支持动态延迟时间。
- **实现步骤**

  1. **启用插件**：安装 `rabbitmq_delayed_message_exchange`
  2. **声明交换机**：类型设为 `x-delayed-message`，并指定路由规则（如 direct/topic）
  3. **发送消息**：通过 `headers` 设置 `x-delay` 参数（毫秒级延迟）
  4. **自动投递**：插件内部调度，到期后投递到目标队列

- **特点**
  - 支持动态延迟时间（每条消息可独立设置）
  - 高精度（毫秒级）
  - 需额外安装插件

**方案对比**

| **维度**     | **TTL+DLX**                                              | **插件方案**                       |
| ------------ | -------------------------------------------------------- | ---------------------------------- |
| **灵活性**   | 固定延迟（队列级别）                                     | 动态延迟（消息级别）               |
| **精度**     | 秒级                                                     | 毫秒级                             |
| **复杂度**   | 无需插件，需配置 DLX                                     | 需安装插件                         |
| **适用场景** | 简单延迟需求（如统一 30 秒延迟）                         | 复杂延迟需求（如不同订单超时时间） |
| **缺点**     | 队列中消息若阻塞，会延迟后续消息投递（需确保 FIFO 消费） | 大量延迟消息可能占用较高内存       |

::: details 案例：插件方案发送延迟消息（Python）

```python
# 声明延迟交换机
channel.exchange_declare(
    exchange='delayed_exchange',
    exchange_type='x-delayed-message',  # 关键参数
    arguments={'x-delayed-type': 'direct'}
)

# 发送延迟消息（延迟 5 秒）
channel.basic_publish(
    exchange='delayed_exchange',
    routing_key='order_queue',
    body=message,
    properties=pika.BasicProperties(
        headers={'x-delay': 5000}  # 延迟毫秒数
    )
)
```

:::

#### 🔬 扩展知识

**【L3】TTL 方案的队首阻塞问题**

::: details

消息级 TTL 只在队首检查过期：若队列头部是长 TTL 消息，后面短 TTL 消息即使已过期也要等它出队才能被投递，造成后续消息延迟被放大。缓解办法：按延迟时长拆分多个队列（各队列 TTL 统一），或直接用延迟交换机插件。

:::

**【L4】延迟插件的存储代价**

::: details

延迟消息在到期前由插件存储（基于 Mnesia/磁盘），大量长期延迟消息（如百万级、延迟数天）会带来可观的内存与磁盘开销，且插件交换机的吞吐低于原生交换机；海量长期延迟场景可评估用时间轮调度 + 普通 MQ 的自研方案。

:::

#### 🔀 发散问题

1. 订单 30 分钟未支付自动关闭怎么实现？
   下单时发一条延迟 30 分钟的消息，到期后消费检查支付状态：已支付则忽略，未支付则关单并释放库存；消息体带订单号保证幂等。
2. 两种方案的可靠性差异？
   TTL+DLX 复用原生持久化与副本能力；延迟插件的消息可靠性取决于插件存储实现，关键业务建议同样开启持久化并监控插件交换机积压。

## RabbitMQ 事务

### 【中等】RabbitMQ 如何实现事务机制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：RabbitMQ / 事务机制

#### 💎 关键结论

RabbitMQ 事务通过 `txSelect/txCommit/txRollback` 把「发布 + 提交」变成同步原子操作，但性能代价极大，且只覆盖生产者到 Broker 一段。**生产环境绝大多数场景应用 Publisher Confirms 替代事务**。

#### ⚡记忆卡片

- **口诀**：txSelect 开事务，commit 才投递，rollback 丢弃，生产用 Confirm 替代
- **关键词**：txSelect ／ txCommit ／ txRollback ／ 同步阻塞 ／ Publisher Confirms
- **链路**：txSelect 开启 → 发布消息暂存 → txCommit 同步等待 Broker 确认后才真正入队 → 失败则 txRollback 丢弃

#### 📖 核心知识

RabbitMQ 的事务机制（Transaction）通过 **信道（Channel）** 提供了一种保证消息可靠投递的机制，但其设计简单且对性能影响较大。RabbitMQ 的事务通过同步机制确保消息投递的原子性，但性能代价高。**在绝大多数生产环境中，推荐使用 Publisher Confirms 替代事务**，以兼顾可靠性和吞吐量。

**事务的核心操作**

- **开启事务**：

  ```java
  channel.txSelect(); // 开启事务模式
  ```

- **提交事务**：

  ```java
  channel.txCommit(); // 提交事务，消息真正投递到队列
  ```

- **回滚事务**：

  ```java
  channel.txRollback(); // 回滚事务，丢弃未提交的消息
  ```

**事务的工作流程**

1. 生产者发送消息到 RabbitMQ（消息暂存于信道缓冲区，未写入队列）。
2. 执行 `txCommit()`：消息持久化到队列；若失败或调用 `txRollback()`，消息丢弃。
3. **同步阻塞**：事务提交/回滚需等待 Broker 确认，性能较低。

**事务的局限性**

- **性能差**：每次提交需等待 Broker 确认，吞吐量显著下降（通常降低数十到上百倍）。
- **无分布式事务**：仅保证生产者到 Broker 的可靠性，不涉及消费者或下游系统。
- **不推荐高频使用**：适合低频关键业务，高并发场景建议用 **确认机制（Publisher Confirms）**。

**事务 vs. 确认机制（Publisher Confirms）**

| 特性         | 事务（Transaction）    | 确认机制（Publisher Confirms） |
| ------------ | ---------------------- | ------------------------------ |
| **可靠性**   | 强一致（同步阻塞）     | 最终一致（异步）               |
| **性能**     | 极低（同步等待）       | 高（异步回调）                 |
| **适用场景** | 低频关键消息（如支付） | 高频业务（如日志、订单）       |
| **复杂度**   | 简单                   | 需处理确认/未确认逻辑          |

::: details 案例：事务发送与 Confirm 替代写法（Java）

```java
try {
    channel.txSelect(); // 开启事务
    channel.basicPublish("", "queue1", null, msg1.getBytes());
    channel.basicPublish("", "queue2", null, msg2.getBytes());
    channel.txCommit(); // 提交事务
} catch (Exception e) {
    channel.txRollback(); // 回滚事务
    // 处理异常
}
```

```java
// 推荐替代：Confirm 模式
channel.confirmSelect(); // 开启确认模式
channel.addConfirmListener(...); // 异步回调
```

:::

**使用建议**

- **优先选择 Confirm 模式**；
- **事务适用场景**：
  - 严格保证单批次消息的原子性（如同时投递订单和库存消息）。
  - 兼容旧版 RabbitMQ（Confirm 模式需 v3.3+）。

#### 🔬 扩展知识

**【L3】事务的原子性边界**

::: details

txCommit 的原子性只覆盖「本 Channel 内本次事务的多条发布一起入队或不入队」，不覆盖：① 业务写库（与 DB 不在同一事务域）；② 消费端处理；③ 跨 Channel/跨 Broker 投递。把它理解成「批量发布的原子提交」而非分布式事务，是正确预期管理的关键。

:::

**【L4】Confirm 为什么能替代事务**

::: details

事务的性能代价在于「每条/每批同步等待」；异步 Confirm 允许大量在途消息批量确认，达到接近无确认的吞吐，同时提供等效的「到达可知」语义；配合生产端未确认集维护 + 失败重发，可靠性不逊于事务，这是官方推荐迁移的根本原因。

:::

> 📚 延伸阅读：[RabbitMQ Publisher Confirms 官方指南](https://www.rabbitmq.com/confirms.html)

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “RabbitMQ 事务能像数据库事务一样回滚已消费的消息” → 错误。tx 只作用于发布侧，与消费端无关；消费侧的“回滚”只能通过 Nack/requeue 实现。
- ❌ “事务开了就万事大吉，不用再配持久化” → 错误。事务只保证「提交动作原子」，提交后消息能否抗重启仍取决于持久化与副本配置。
- ❌ “Confirm 模式性能差，不如事务可靠” → 相反。异步 Confirm 吞吐远高于事务，且到达语义等效，是生产环境的默认选择。

:::

#### 🔀 发散问题

1. 为什么事务吞吐下降如此严重？
   txCommit 是同步 RPC：每批消息都要等 Broker 落盘/入队确认后客户端才能继续，管道完全串行化；相比异步流水线化的 Confirm，吞吐量会下降数十到上百倍。
2. 需要「写库 + 发消息」原子性时该怎么办？
   RabbitMQ 事务解决不了（不涉及 DB）：用本地消息表 + 定时对账，或改用 RocketMQ 事务消息把两阶段提交交给中间件。见本文档『RabbitMQ 如何保证消息不丢失？』中的讨论。

## 参考资料

- [面试鸭 - RabbitMQ 面试](https://www.mianshiya.com/bank/1850081848441466881)
- [RabbitMQ 官方文档](https://www.rabbitmq.com/documentation.html)
- [RabbitMQ 实战指南 - 朱忠华](https://book.douban.com/subject/27591384/)
- [AMQP 0-9-1 协议规范](https://www.rabbitmq.com/amqp-0-9-1-quickref.html)
- [RabbitMQ Quorum Queue 官方说明](https://www.rabbitmq.com/quorum-queues.html)
- [RabbitMQ Publisher Confirms 官方指南](https://www.rabbitmq.com/confirms.html)
