---
title: ZooKeeper 原理
date: 2020-06-02 22:28:54
categories:
  - 分布式
  - 分布式协同
  - ZooKeeper
tags:
  - 分布式
  - 协同
  - zookeeper
  - 面试
permalink: /pages/eeaed507/
---

# ZooKeeper 面试

## ZooKeeper 简介

### 【简单】什么是 ZooKeeper？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：ZooKeeper / 概述

#### 💎 关键结论

ZooKeeper 是一个由 Apache 维护的开源分布式协调服务，它通过「树形数据模型 + ZAB 共识协议」为分布式系统提供 Master 选举、分布式锁、配置管理、命名服务等能力。因为分布式系统需要一个可靠的协调基座来解决顺序与一致性问题。

#### ⚡记忆卡片

- **口诀**：一棵树、一个协议、五大保证
- **关键词**：协调服务 ／ znode 树 ／ ZAB 协议 ／ 顺序一致性 ／ 原子性
- **链路**：客户端发起事务请求 → Leader 串行处理并分配 zxid → 广播给副本并获半数以上确认 → 形成全局一致的协调状态

#### 📖 核心知识

1. **定义**：ZooKeeper 是一个开源的分布式协调服务，目前由 Apache 进行维护。ZooKeeper 可以用于实现分布式系统中常见的发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能。
2. **顺序一致性**：从一个客户端发起的事务请求，最终都会严格按照其发起顺序被应用到 ZooKeeper 中。
3. **原子性**：所有事务请求的处理结果在整个集群中所有机器上都是一致的；不存在部分机器应用了该事务，而另一部分没有应用的情况。
4. **单一视图**：所有客户端看到的服务端数据模型都是一致的。
5. **可靠性**：一旦服务端成功应用了一个事务，则其引起的改变会一直保留，直到被另外一个事务所更改。
6. **实时性**：一旦一个事务被成功应用后，ZooKeeper 可以保证客户端立即可以读取到这个事务变更后的最新状态的数据。

#### 🔬 扩展知识

【L3】定位是"协调"而非"存储"

::: details

ZooKeeper 将数据全量保存在内存中以追求高吞吐、低延迟，因此单节点承载的数据量很有限（实践中通常建议把数据量控制在 MB ~ GB 级别），不适合存放大量业务数据；它的价值在于为分布式系统提供可靠的小状态协调。

:::

【L3】版本演进

::: details

ZooKeeper 自 3.5.x 起引入了 Container 节点、TTL 节点、动态配置（dynamic reconfiguration）等能力，3.6.0 又引入了新的指标体系（Metrics Provider）。面试中描述特性时注意标注版本。

:::

> 📚 延伸阅读：[ZooKeeper 官方文档](https://cwiki.apache.org/confluence/display/ZOOKEEPER)

#### 🔀 发散问题

**Q：ZooKeeper 有哪些典型应用场景？**
A：常见场景包括配置管理、Master 选举、分布式锁、命名服务、集群监控等，本质都是利用它的临时节点、顺序节点与 Watch 机制。详见本文档『ZooKeeper 中有哪些应用场景？』。

**Q：ZooKeeper 提供的是什么级别的一致性？**
A：ZooKeeper 提供顺序一致性：写经 ZAB 过半确认保证全局有序，读 Follower 时可能短暂滞后。详见本文档『ZooKeeper 提供了怎样的一致性保证？』。

### 【简单】ZooKeeper 中有哪些应用场景？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 应用场景

#### 💎 关键结论

ZooKeeper 的应用场景可归纳为「发布订阅、锁、选举、监控」四大类：配置下发、分布式锁、Master 选举、集群心跳监控。因为它提供的临时节点 + 顺序节点 + Watch 机制恰好能映射这些协调需求。

#### ⚡记忆卡片

- **口诀**：订阅、锁、选举、监控，一棵树全管住
- **关键词**：发布订阅 ／ 命名服务 ／ 分布式锁 ／ Master 选举 ／ 集群管理
- **链路**：向 znode 写数据 → 触发 Watch 事件 → 订阅者收到通知 → 完成协调动作（配置变更 / 锁释放 / 选举切换）

#### 📖 核心知识

**ZooKeeper 可以用于发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能**。

**发布订阅**

通过 ZooKeeper 进行数据的发布与订阅是它提供的最基本功能，它允许多个客户端同时订阅某一个节点的变更并在变更发生时执行我们预先设置好的回调函数，在运行时改变服务的配置和行为：

```java
ZooKeeper zk = new ZooKeeper("localhost", 3000, null);
zk.getData("/config", new Watcher() {
    public void process(WatchedEvent watchedEvent) {
        System.out.println(watchedEvent.toString());
    }
}, null);
zk.setData("/config", "draven".getBytes(), 0);

// WatchedEvent state:SyncConnected type:NodeDataChanged path:/config
```

发布与订阅是 ZooKeeper 提供的一个最基本的功能，它的使用非常的简单，我们可以在 `getData` 中传入实现 `process` 方法的 `Watcher` 对象，在每次改变节点的状态时，`process` 方法都会被调用，在这个方法中就可以对变更进行响应动态修改一些行为。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/b9a134918bac48d6a946d53932a7d998.png)

通过 ZooKeeper 这个中枢，每一个客户端对节点状态的改变都能够推送给节点的订阅者，在发布订阅模型中，ZooKeeper 的每一个节点都可以被理解成一个主题，每一个客户端都可以向这个主题推送消息，同时也可以订阅这个主题中的消息；只是 ZooKeeper 引入了文件系统的父子层级的概念将发布订阅功能实现得更加复杂。

```java
public static enum EventType {
    None(-1),
    NodeCreated(1),
    NodeDeleted(2),
    NodeDataChanged(3),
    NodeChildrenChanged(4);
}
```

如果我们订阅了一个节点的变更信息，那么该节点的子节点出现数量变更时就会调用 `process` 方法通知观察者，这也意味着更复杂的实现，同时和专门做发布订阅的中间件相比也没有性能优势，在海量推送的应用场景下，消息队列更能胜任，而 ZooKeeper 更适合做一些类似服务配置的动态下发的工作。

**命名服务**

在分布式系统中，通常需要一个全局唯一的名字，如生成全局唯一的订单号等，ZooKeeper 可以通过顺序节点的特性来生成全局唯一 ID，从而可以对分布式系统提供命名服务。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/3f2e9cb172d84b7fa2003337c1a9cf07.png)

**配置管理**

利用 ZooKeeper 的观察机制，可以将其作为一个高可用的配置存储器，允许分布式应用的参与者检索和更新配置文件。

**分布式锁**

可以通过 ZooKeeper 的临时节点和 Watcher 机制来实现分布式排它锁。

举例来说，有一个分布式系统，有三个节点 A、B、C，试图通过 ZooKeeper 获取分布式锁。

（1）访问 `/lock` （这个目录路径由程序自己决定），创建 **带序列号的临时节点（EPHEMERAL）** 。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/5b13ae075ef24a6889a6ba07b48283f2.png)

（2）每个节点尝试获取锁时，拿到 `/locks`节点下的所有子节点（`id_0000`,`id_0001`,`id_0002`），**判断自己创建的节点是不是序列号最小的**

- 如果序列号是最小的，则成功获取到锁。
  - 释放锁：执行完操作后，把创建的节点给删掉。
- 如果不是，则监听比自己要小 1 的节点变化。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/b53f701f32f04dee99ec563813699a7a.png)

（3）释放锁，即删除自己创建的节点。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/e78fde066a674827a7a60d4dc696e818.png)

图中，NodeA 删除自己创建的节点 `id_0000`，NodeB 监听到变化，发现自己的节点已经是最小节点，即可获取到锁。

**集群管理**

ZooKeeper 还能解决大多数分布式系统中的协调问题：

- **可以通过创建临时节点来建立心跳检测机制**。如果分布式系统的某个服务节点宕机了，则其持有的会话会超时，此时该临时节点会被删除，相应的监听事件就会被触发。
- **分布式系统的每个服务节点还可以将自己的节点状态写入临时节点，从而完成状态报告或节点工作进度汇报**。
- **通过数据的订阅和发布功能，ZooKeeper 还能对分布式系统进行模块的解耦和任务的调度**。
- **通过监听机制，还能对分布式系统的服务节点进行动态上下线**，从而实现服务的动态扩容。

**选举 Leader 节点**

分布式系统一个重要的模式就是主从模式 (Leader/Followers)，ZooKeeper 可以用于该模式下的 Leader 选举。可以让所有服务节点去竞争性地创建同一个 ZNode，由于 ZooKeeper 不能有路径相同的 ZNode，必然只有一个服务节点能够创建成功，这样该服务节点就可以成为 Leader 节点。

**队列管理**

ZooKeeper 可以处理两种类型的队列：

1. 当一个队列的成员都聚齐时，这个队列才可用，否则一直等待所有成员到达，这种是同步队列。
2. 队列按照 FIFO 方式进行入队和出队操作，例如实现生产者和消费者模型。

同步队列用 ZooKeeper 实现的实现思路如下：

创建一个父目录 `/synchronizing`，每个成员都监控标志（Set Watch）位目录 `/synchronizing/start` 是否存在，然后每个成员都加入这个队列，加入队列的方式就是创建 `/synchronizing/member_i` 的临时目录节点，然后每个成员获取 `/synchronizing` 目录的所有目录节点，也就是 `member_i`。判断 i 的值是否已经是成员的个数，如果小于成员个数等待 `/synchronizing/start` 的出现，如果已经相等就创建 `/synchronizing/start`。

#### 🔀 发散问题

**Q：分布式锁的标准实现细节是什么？**
A：标准方案是「临时顺序节点 + Watch 前一个节点」避免羊群效应，生产环境推荐用 Curator 的 InterProcessMutex。详见本文档『ZooKeeper 的典型应用场景有哪些？如何实现分布式锁？』。

**Q：为什么 ZooKeeper 不适合做海量消息推送？**
A：Watcher 一次性触发 + 全内存存储决定了它不适合高吞吐推送通道，海量推送应选消息队列，ZooKeeper 更适合配置动态下发这类低频协调场景。

## ZooKeeper 存储

### 【简单】ZooKeeper 如何存储数据？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：ZooKeeper / 数据模型

#### 💎 关键结论

ZooKeeper 采用类似文件系统的层级树结构存储数据，树节点称为 znode，数据大小被限制在 1MB 以内。因为它的定位是协调服务而非文件存储，小数据量才能支撑全内存的高吞吐。

#### ⚡记忆卡片

- **口诀**：树形存储、MB 上限、原子读写
- **关键词**：znode ／ 层级树 ／ ACL ／ 1MB 限制 ／ 绝对路径
- **链路**：客户端按绝对路径定位 znode → 读写原子地成功或失败 → 结合 ACL 控制访问权限

#### 📖 核心知识

1. **层级树结构**：ZooKeeper 采用类似于文件系统的层级结构存储数据。树中的节点被称为 **`znode`**，其中根节点为 `/`，每个节点上都会保存自己的数据和节点信息。
2. **ACL 权限**：znode 可以用于存储数据，并且有一个与之相关联的 ACL（详情可见 [ACL](#ACL)）。
3. **1MB 限制**：ZooKeeper 的设计目标是实现协调服务，而不是真的作为一个文件存储，因此 znode 存储数据的**大小被限制在 1MB 以内**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/90627118e0b54b38a9d1b0a101b2809f.png)

4. **访问原子性**：ZooKeeper 的数据访问具有原子性，其读写操作都是要么全部成功，要么全部失败。
5. **路径引用**：znode 通过路径被引用，**znode 节点路径必须是绝对路径**。

### 【简单】ZooKeeper 有几种节点类型？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：ZooKeeper / 节点类型

#### 💎 关键结论

znode 有「临时/持久 × 顺序/非顺序」两两组合出的四种经典类型；临时节点随会话生灭、顺序节点由父节点维护单调递增计数器，这两个特性正是分布式锁与选举的基石。

#### ⚡记忆卡片

- **口诀**：两维四型，临时随会话
- **关键词**：PERSISTENT ／ EPHEMERAL ／ SEQUENTIAL ／ 会话 ／ 递增计数器
- **链路**：会话建立 → 创建临时节点 → 会话超时断开 → 节点自动删除 → 监听者收到通知

#### 📖 核心知识

1. **四种经典类型**：znode 有 `PERSISTENT`、`PERSISTENT_SEQUENTIAL`、`EPHEMERAL` 和 `EPHEMERAL_SEQUENTIAL` 四种类型，它们是临时与持久、顺序与非顺序两个不同的方向组合成的四种类型。
2. **临时 vs 持久**：临时节点是客户端在连接 ZooKeeper 时才会保持存在的节点，一旦客户端和服务端之间的连接中断（会话失效），当前连接持有的所有临时节点都会被删除；而持久节点不会随着会话连接的中断而删除，它们需要被客户端主动删除。
3. **顺序特性**：如果创建了顺序节点，节点名字的末尾会附加一个序列号，序列号是一个由父节点维护的单调递增计数器。
4. **补充（3.5.x 起）**：ZooKeeper 3.5.x 起还引入了 Container 节点（最后一个子节点被删除后可被服务端自动清理）与 TTL 节点（在指定 TTL 时间内未被修改且无子节点时可被自动清理），用于降低大量空节点的清理负担。

## ZooKeeper 架构

### 【中等】ZooKeeper 的设计目标是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 架构设计

#### 💎 关键结论

ZooKeeper 的设计目标可概括为四点：简单的数据模型、构建集群、顺序访问、高性能高可用。因为它是面向「读多写少的大型分布式系统」的协调服务，而非通用存储。

#### ⚡记忆卡片

- **口诀**：简单模型、集群过半、有序 zxid、内存高性能
- **关键词**：znode 树 ／ 半数可用 ／ zxid 全局递增 ／ 全内存
- **链路**：树形模型降低使用复杂度 → 集群半数存活即可用 → zxid 保证全局顺序 → 全内存存储保证高吞吐

#### 📖 核心知识

ZooKeeper 致力于为那些高吞吐的大型分布式系统提供一个高性能、高可用、且具有严格顺序访问控制能力的分布式协调服务。它具有以下四个目标：

**目标一：简单的数据模型**

ZooKeeper 通过树形结构来存储数据，它由一系列被称为 znode 的数据节点组成，类似于常见的文件系统。不过和常见的文件系统不同，ZooKeeper 将数据全量存储在内存中，以此来实现高吞吐，减少访问延迟。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/3a8aaacfb47844a89b70751a5a137fc5.jpg)

**目标二：构建集群**

可以由一组 ZooKeeper 服务构成 ZooKeeper 集群，集群中每台机器都会单独在内存中维护自身的状态，并且每台机器之间都保持着通讯，只要集群中有半数机器能够正常工作，那么整个集群就可以正常提供服务。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/ecafef2a3e4c45978d03835eee7a961e.jpg)

**目标三：顺序访问**

对于来自客户端的每个更新请求，ZooKeeper 都会分配一个全局唯一的递增 ID（zxid），这个 ID 反映了所有事务请求的先后顺序。

**目标四：高性能高可用**

ZooKeeper 将数据全量存储在内存中以保持高性能，并通过服务集群来实现高可用，由于 ZooKeeper 的所有更新和删除都是基于事务的，所以其在读多写少的应用场景中有着很高的性能表现。

#### 🔬 扩展知识

【L3】为什么敢全内存？

::: details

协调类数据的特点是"小、读多写少"，全内存可换取毫秒级延迟与高吞吐；代价是容量受限，可靠性靠事务日志落盘 + 定期快照来兜底（重启后从快照 + 日志恢复）。

:::

【L4】写路径是扩展瓶颈

::: details

所有写请求必须经过 Leader，因此横向扩容只能提升读能力（加 Follower/Observer），写吞吐受单 Leader 限制。这也是后来 Kafka 在新版 KRaft 模式中移除 ZooKeeper 依赖的动机之一。

:::

#### 🔀 发散问题

**Q：ZooKeeper 集群的三种角色分别承担什么职责？**
A：Leader 负责所有写操作与心跳维护，Follower 处理读并参与投票，Observer 只读不投票。详见本文档『ZooKeeper 集群有几种角色？』。

**Q：这样的设计有什么缺点？**
A：单 Leader 写瓶颈、选举敏感、性能上限等问题。详见本文档『ZooKeeper 的架构有什么缺点？』。

### 【中等】ZooKeeper 集群有几种角色？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 集群角色

#### 💎 关键结论

ZooKeeper 集群有 Leader、Follower、Observer 三种角色：Leader 负责全部写操作并维护心跳，Follower 处理读并参与写投票，Observer 只读不投票。读可读任意节点，写必须走 Leader。

#### ⚡记忆卡片

- **口诀**：Leader 写、Follower 投、Observer 看
- **关键词**：Leader ／ Follower ／ Observer ／ 过半 ACK ／ 心跳
- **链路**：客户端写请求 → 转发至 Leader → Leader 广播 Proposal → 过半 Follower ACK → 提交并响应

#### 📖 核心知识

ZooKeeper 集群是一个基于主从复制的高可用集群，集群中每个节点都存储了一份数据副本（内存中）。此外，每个服务器节点承担如下三种角色中的一种：

- **Leader** - 它负责 **发起并维护与各 Follower 及 Observer 间的心跳。所有的写操作必须要通过 Leader 完成再由 Leader 将写操作广播给其它服务器**。一个 ZooKeeper 集群同一时间只会有一个实际工作的 Leader。
- **Follower** - 它会**响应 Leader 的心跳。Follower 可直接处理并返回客户端的读请求，同时会将写请求转发给 Leader 处理，并且负责在 Leader 处理写请求时对请求进行投票**。一个 ZooKeeper 集群可能同时存在多个 Follower。
- **Observer** - 角色与 Follower 类似，但是无投票权。

客户端可以从任意 ZooKeeper 服务器节点读取数据，但只能通过 Leader 服务写数据并需要半数以上 Follower 的 ACK，才算写入成功。

#### 🔬 扩展知识

【L3】Observer 的定位

::: details

Observer 不参与投票、不影响 Quorum 计数，专门用于扩展读性能。当需要跨机房就近读取时，加 Observer 而不是加 Follower，可以避免投票者增多拖慢写提交。

:::

【L4】角色是动态的

::: details

服务器角色不是固定配置的（除 Observer 外），而是由 ZAB 选举结果决定，服务器会在 LOOKING / LEADING / FOLLOWING / OBSERVING 四种状态间转换，详见本文档『Zab 协议中故障恢复的流程是怎样的？』。

:::

#### 🔀 发散问题

**Q：写请求的完整流程是怎样的？**
A：所有写请求最终交给 Leader，以 Proposal 广播并等待过半 ACK 后提交。详见本文档『ZooKeeper 写操作工作流程是怎样的？』。

**Q：为什么集群推荐奇数节点？**
A：相同容错能力下奇数节点写 ACK 更少、性能更优。详见本文档『ZooKeeper 集群为什么推荐奇数节点？』。

### 【中等】ZooKeeper 的权限控制如何设计的？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：ZooKeeper / ACL

#### 💎 关键结论

ZooKeeper 采用 ACL 策略做权限控制：每个 znode 创建时携带独立 ACL 列表，配合 digest/sasl/ip 三种认证机制，授权 CREATE/READ/WRITE/DELETE/ADMIN 五种权限，粒度是节点级。

#### ⚡记忆卡片

- **口诀**：一节点一 ACL，先认证后授权
- **关键词**：ACL ／ digest ／ sasl ／ ip ／ 五种权限
- **链路**：客户端认证身份 → 创建 znode 附带 ACL → 每次操作检查 ACL → 放行或拒绝

#### 📖 核心知识

**ZooKeeper 采用 ACL（Access Control Lists）策略来进行权限控制**。每个 znode 创建时都会带有一个 ACL 列表，用于决定谁可以对它执行何种操作。

ACL 依赖于 ZooKeeper 的客户端认证机制。ZooKeeper 提供了以下几种认证方式：

- **digest** - 用户名和密码来识别客户端
- **sasl** - 通过 kerberos 来识别客户端
- **ip** - 通过 IP 来识别客户端

ZooKeeper 定义了如下五种权限：

- **CREATE** - 允许创建子节点；
- **READ** - 允许从节点获取数据并列出其子节点；
- **WRITE** - 允许为节点设置数据；
- **DELETE** - 允许删除子节点；
- **ADMIN** - 允许为节点设置权限。

### 【困难】ZooKeeper 的架构有什么缺点？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：ZooKeeper / 架构评估

#### 💎 关键结论

ZooKeeper 的架构缺点集中在五点：高可用脆弱（单 Leader）、选举慢、性能有限、权限控制弱、仍难避免业务数据不一致。根源在于它“强一致优先 + Leader 中心化”的设计牺牲了可用性与弹性。

#### ⚡记忆卡片

- **口诀**：选举慢、性能限、权限弱、可用脆
- **关键词**：单 Leader ／ 选举耗时 ／ TPS 上限 ／ 弱 ACL ／ 客户端缓存
- **链路**：网络抖动 → 触发选举 → 选举期间集群不可用 → 业务方被迫用缓存与降级兜底 → 强一致承诺被缓存破坏

#### 📖 核心知识

**1. ZooKeeper 不是为高可用性设计的**

生产环境中常常需要通过多机房部署来容灾。出于成本考虑，一般多机房都是同时提供服务的，即一个机房撑不住所有流量。**ZooKeeper 集群只能有一个 Leader**，一旦机房之间连接出现故障，那么只有 Leader 所在的机房可以正常工作，其他机房只能停摆。于是所有流量集中到 Leader 所在的机房，由于处理不过来而导致崩溃。

即使是在同一个机房里面，由于网段的不同，在调整机房交换机的时候偶尔也会发生网段隔离的情况。实际上机房每个月基本上都会发生短暂的网络隔离之类的子网段调整。在那个时刻 ZooKeeper 将处于不可用状态。如果业务系统重度依赖 ZooKeeper（比如用 Dubbo 作为 RPC，且使用 ZooKeeper 作为注册中心），则系统的可用性将非常脆弱。

由于 ZooKeeper 对于网络隔离的极度敏感，导致 ZooKeeper 对于网络的任何风吹草动都会做出激烈反应。这使得 ZooKeeper 的**不可用**时间比较多。我们不能让 ZooKeeper 的**不可用**，变成系统的**不可用**。

**2. ZooKeeper 的选举过程速度很慢**

互联网环境中，网络不稳定几乎是必然的，而 ZooKeeper 对网络隔离非常敏感。一旦出现网络隔离，ZooKeeper 就要发起选举流程。**ZooKeeper 的选举流程通常耗时数十秒（早期版本常见经验值为 30 ~ 120 秒，新版本有明显改善），期间 ZooKeeper 由于没有 Leader，都是不可用的**。对于网络里面偶尔出现的、比如半秒一秒的网络隔离，ZooKeeper 会由于选举过程，而把不可用时间放大几十倍。

**3. ZooKeeper 的性能是有限的**

**典型 ZooKeeper 集群的 TPS 大概是一万多，无法支撑每天动辄几十亿次的调用**。因此，每次请求都去 ZooKeeper 获取业务系统信息是不可能的。为此，ZooKeeper 的 client 必须自己缓存业务系统的信息。这就导致 ZooKeeper 提供的**强一致性**实际上是做不到的。如果我们需要强一致性，还需要其他机制来进行保障：比如用自动化脚本把业务系统的 old master 给 kill 掉，但是这可能会引发很多其他问题。

**4. ZooKeeper 无法进行有效的权限控制**

**ZooKeeper 的权限控制非常弱**。在大型的复杂系统里面，使用 ZooKeeper 必须自己再额外开发一套权限控制系统，通过那套权限控制系统再访问 ZooKeeper。额外的权限控制系统不但增加了系统复杂性和维护成本，而且降低了系统的总体性能。

**5. 即使有了 ZooKeeper 也很难避免业务系统的数据不一致**

由于 ZooKeeper 的性能限制，我们无法让每次系统内部调用都走 ZooKeeper，因此总有某些时刻，业务系统会存在两份数据（业务系统 client 那边缓存的业务系统信息是定时从 ZooKeeper 更新的，因此会有更新不同步的问题）。

如果要保持数据的强一致性，唯一的方法是“先 kill 掉当前 Leader，再在 ZooKeeper 上更新 Leader 信息”。在是否要 kill 掉当前 Leader 这个问题上，程序是无法完全自动决定的（因为网络隔离的时候 ZooKeeper 已经不可用了，自动脚本没有全局信息，不管怎么做都可能是错的，什么都不做也可能是错的。当网络故障的时候，只有运维人员才有全局信息，程序是无法得知其他机房的情况的）。因此系统无法自动地保障数据一致性，必须要人工介入。而人工介入的典型时间是半个小时以上，我们不能让系统这么长时间不可用。因此我们必须在某个方向上进行妥协，最常见的妥协方式是放弃**强一致性**，而接受**最终一致性**。如果我们需要人工介入才能保证*可靠的强一致性*，那么 ZooKeeper 的价值就大打折扣。

#### 🔬 扩展知识

【L3】工程上的缓解手段

::: details

客户端本地缓存注册数据/配置快照，注册中心短暂不可用时用本地缓存降级（Dubbo 即如此）；关键路径避免对 ZK 的实时强依赖，把 ZK 定位成“元数据源”而非“请求路径上的依赖”。

:::

【L3】替代技术路线

::: details

对可用性敏感的场景可评估 etcd、Consul、Nacos 等替代方案；注册中心场景更建议 AP 型方案（Eureka、Nacos AP 模式），与本文档『ZooKeeper 是 CP 还是 AP？』的结论一致。

:::

【L4】缺陷的架构根源

::: details

这些缺点并非实现缺陷，而是设计取舍的必然结果：写路径集中到单 Leader 换来全局顺序与强一致，全内存换来高性能但限制了容量，过半机制换来正确性但对网络分区敏感。评估组件时应把缺点放回它的取舍语境里看。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "ZooKeeper 集群天然高可用，随便断网都没事" → 错。它对网络隔离极度敏感，短暂分区就可能触发选举并导致写不可用，多数派丢失时整体停摆。
- ❌ "用了 ZooKeeper 业务数据就一定强一致" → 错。客户端必须缓存 ZK 数据才能保证性能，缓存天然引入不同步窗口，最终只能做到最终一致性。

:::

#### 🔀 发散问题

**Q：ZooKeeper 的 CP 定位与这些缺点有什么关系？**
A：选举敏感、少数派停摆正是“一致性优先于可用性”的直接代价。详见本文档『ZooKeeper 是 CP 还是 AP？』。

**Q：如果必须用 ZooKeeper 做注册中心，怎么降低风险？**
A：客户端本地缓存地址列表 + 注册中心故障降级、多机房部署时避免跨机房强依赖、控制节点数据量。

## ZooKeeper 工作流

### 【中等】ZooKeeper 读操作工作流程是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：ZooKeeper / 读写流程

#### 💎 关键结论

Leader/Follower/Observer 都可直接处理读请求，从本地内存读取数据返回即可，服务器之间无需任何交互。因此 Follower/Observer 越多，读吞吐量越大。

#### ⚡记忆卡片

- **口诀**：谁接谁读，本地内存直出
- **关键词**：本地读 ／ 无交互 ／ 读水平扩展
- **链路**：客户端连接任意服务器 → 服务器从本地内存读数据 → 直接返回结果

#### 📖 核心知识

1. **任意节点可读**：**Leader/Follower/Observer 都可直接处理读请求，从本地内存中读取数据并返回给客户端即可**。
2. **读水平扩展**：由于处理读请求不需要服务器之间的交互，**Follower/Observer 越多，整体系统的读请求吞吐量越大**，也即读性能越好。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/8bbe50fab903486cb206ea1f5431327e.png)

#### 🔬 扩展知识

【L3】本地读可能滞后

::: details

Follower/Observer 的本地数据可能略落后于 Leader，读到的是"本地视图"而非"全局最新"。对强新鲜度敏感的场景应先执行 `sync` 或直接读 Leader，详见本文档『ZooKeeper 提供了怎样的一致性保证？』。

:::

#### 🔀 发散问题

**Q：写请求也能在任意节点处理吗？**
A：不能。所有写请求最终都要转发给 Leader 统一处理，这是与读流程的本质区别。详见本文档『ZooKeeper 写操作工作流程是怎样的？』。

### 【中等】ZooKeeper 写操作工作流程是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 读写流程

#### 💎 关键结论

所有写请求都由 Leader 处理：Leader 将写请求以事务 Proposal 广播给所有 Follower，收到过半数 ACK 即认为写成功；写到 Follower/Observer 的请求会先转发给 Leader。

#### ⚡记忆卡片

- **口诀**：写必走 Leader，过半即提交
- **关键词**：Leader ／ Proposal ／ ACK ／ 过半 ／ Commit
- **链路**：写请求 → Leader 生成 Proposal → 广播 Follower → 过半 ACK → 广播 Commit → 响应客户端

#### 📖 核心知识

所有的写请求实际上都要交给 Leader 处理。Leader 将写请求以事务形式发给所有 Follower 并等待 ACK，一旦收到半数以上 Follower 的 ACK，即认为写操作成功。

**写 Leader**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/d99ccb9cabe9486eb1dc03a1e9c37640.png)

由上图可见，通过 Leader 进行写操作，主要分为五步：

1. 客户端向 Leader 发起写请求
2. Leader 将写请求以事务 Proposal 的形式发给所有 Follower 并等待 ACK
3. Follower 收到 Leader 的事务 Proposal 后返回 ACK
4. Leader 得到过半数的 ACK（Leader 对自己默认有一个 ACK）后向所有的 Follower 和 Observer 发送 Commit
5. Leader 将处理结果返回给客户端

> 注意
>
> - Leader 不需要得到 Observer 的 ACK，即 Observer 无投票权。
> - Leader 不需要得到所有 Follower 的 ACK，只要收到过半的 ACK 即可，同时 Leader 本身对自己有一个 ACK。上图中有 4 个 Follower，只需其中两个返回 ACK 即可，因为 $(2+1) / (4+1) > 1/2$ 。
> - Observer 虽然无投票权，但仍须同步 Leader 的数据从而在处理读请求时可以返回尽可能新的数据。

**写 Follower/Observer**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/338cdfef25dc43e192fbd8a5bb2eb10a.png)

- Follower/Observer 均可接受写请求，但不能直接处理，而需要将写请求转发给 Leader 处理。
- 除了多了一步请求转发，其它流程与直接写 Leader 无任何区别。

#### 🔬 扩展知识

【L3】与两阶段提交（2PC）的差异

::: details

ZAB 的写流程形似两阶段提交，但 2PC 要求所有参与者确认，任一参与者故障即阻塞；ZAB 只需过半 ACK，少数派故障不影响提交，可用性更强。

:::

【L4】Observer 的数据同步

::: details

Observer 虽不计入 ACK，但会接收 Commit 并同步 Leader 的数据，因此它处理读请求时可以返回尽可能新的数据；代价是同步存在轻微延迟。

:::

#### 🔀 发散问题

**Q：过半 ACK 提交背后是哪个协议？**
A：ZAB 协议的原子广播流程，详见本文档『Zab 协议中原子广播的流程是怎样的？』。

**Q：为什么写必须串行经过 Leader？**
A：为了给所有更新分配全局递增的 zxid，保证顺序一致性，详见本文档『ZooKeeper 事务机制是怎样的？』。

### 【中等】ZooKeeper 事务机制是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 事务机制

#### 💎 关键结论

ZooKeeper 用全局递增的 zxid 标识每个事务，Leader 为每个 Follower 维护独立 FIFO 队列发送 Proposal，Follower 落盘后回 ACK，过半 ACK 后广播 Commit，从而保证严格的顺序一致性。

#### ⚡记忆卡片

- **口诀**：zxid 定序，过半即提交
- **关键词**：zxid ／ epoch ／ Proposal 队列 ／ FIFO ／ Ack
- **链路**：写请求 → Leader 分配 zxid → 入各 Follower 的 FIFO 队列 → Follower 写事务日志并 ACK → 过半 ACK → 广播 Commit 提交

#### 📖 核心知识

对于来自客户端的每个更新请求，ZooKeeper 具备严格的顺序访问控制能力。

1. **zxid 标识事务**：**为了保证事务的顺序一致性，ZooKeeper 采用了递增的事务 id 号（zxid）来标识事务**。所有的提议（**`proposal`**）都在被提出的时候加上了 zxid。zxid 是一个 64 位的数字，它的高 32 位是 **`epoch`** 用来标识 Leader 关系是否改变，每次一个 Leader 被选出来，它都会有一个新的 epoch，标识当前属于哪个 Leader 的统治时期；低 32 位用于递增计数。
2. **队列化广播**：**Leader 服务会为每一个 Follower 服务器分配一个单独的队列，然后将事务 Proposal 依次放入队列中，并根据 FIFO（先进先出）的策略进行消息发送**。Follower 服务在接收到 Proposal 后，会将其以事务日志的形式写入本地磁盘中，并在写入成功后反馈给 Leader 一个 Ack 响应。
3. **过半提交**：**当 Leader 接收到超过半数 Follower 的 Ack 响应后，就会广播一个 Commit 消息给所有的 Follower 以通知其进行事务提交**，之后 Leader 自身也会完成对事务的提交。而每一个 Follower 则在接收到 Commit 消息后，完成事务的提交。
4. **Follower 同步流程**：
   1. Leader 等待 Server 连接；
   2. Follower 连接 Leader，将最大的 zxid 发送给 Leader；
   3. Leader 根据 Follower 的 zxid 确定同步点；
   4. 完成同步后通知 Follower 已经成为 uptodate 状态；
   5. Follower 收到 uptodate 消息后，又可以重新接受 client 的请求进行服务了。

#### 🔬 扩展知识

【L3】zxid 结构的语义

::: details

高 32 位 epoch 标识 Leader 统治时期、低 32 位是期内序号，这种结构让 zxid 天然可用于比较"谁的数据更新"（选举时比 zxid）与"是否跨任期"（epoch 不同即属不同 Leader 时期）。

:::

【L4】与 Raft 的对应关系

::: details

ZAB 的 epoch + 序号与 Raft 的 term + log index 一一对应，两者都是"强领导者串行编号 + 多数派确认"的共识实现，差异主要在恢复模式与提交细节上。

:::

#### 🔀 发散问题

**Q：zxid 在选举中起什么作用？**
A：选举 PK 时优先推举 zxid 最大的服务器当 Leader，保证新 Leader 数据最新。详见本文档『FastLeaderElection 算法的核心原理是什么？』。

### 【中等】ZooKeeper 监听机制是怎样的？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：ZooKeeper / Watch 机制

#### 💎 关键结论

ZooKeeper 让客户端监听关心的 znode，变化时由服务端主动推送通知，且 Watcher 是一次性触发的（触发即移除）。因为一次性触发能让服务端保持轻量，代价是客户端必须重新注册。

#### ⚡记忆卡片

- **口诀**：注册即监听，触发即移除
- **关键词**：Watcher ／ 一次性触发 ／ 服务端推送 ／ 重注册 ／ CuratorCache
- **链路**：读请求注册 Watcher → 写请求触发事件 → 服务端推送通知并移除 Watcher → 客户端回调中重新注册

#### 📖 核心知识

1. **机制定义**：**ZooKeeper 允许客户端监听它关心的 znode，当 znode 状态发生变化（数据变化、子节点增减变化）时，ZooKeeper 服务会通知客户端**。需要注意的是：**ZooKeeper 的监听通知是一次性的**。无论是服务端还是客户端，一旦一个 Watcher 被触发，ZooKeeper 都会将其从相应的存储中移除。这样的设计有效地减轻了服务端的压力，不然对于更新非常频繁的节点，服务端会不断地向客户端发送事件通知，无论对于网络还是服务端的压力都非常大。
2. **为什么选服务端推送**：客户端和服务端保持连接一般有两种形式——客户端向服务端不断轮询、服务端向客户端推送状态。**ZooKeeper 的选择是服务端主动推送状态，也就是观察机制（`Watch`）**。观察机制允许用户在指定节点上针对感兴趣的事件注册监听，当事件发生时，监听器会被触发，并将事件信息推送到客户端。其特点：监听器实时触发；监听器总是有序的；创建新的 znode 数据前，客户端就能收到监听事件。
3. **注册方式**：客户端使用 `getData` 等接口获取 znode 状态时传入一个用于处理节点变更的回调，服务端就会主动向客户端推送节点的变更：

```java
public byte[] getData(final String path, Watcher watcher, Stat stat)
```

4. **服务端实现**：从这个方法中传入的 `Watcher` 对象实现了相应的 `process` 方法，每次对应节点出现了状态的改变，`WatchManager` 都会通过以下的方式调用传入 `Watcher` 的方法：

```java
Set<Watcher> triggerWatch(String path, EventType type, Set<Watcher> supress) {
    WatchedEvent e = new WatchedEvent(type, KeeperState.SyncConnected, path);
    Set<Watcher> watchers;
    synchronized (this) {
        watchers = watchTable.remove(path);
    }
    for (Watcher w : watchers) {
        w.process(e);
    }
    return watchers;
}
```

ZooKeeper 中的所有数据其实都是由一个名为 `DataTree` 的数据结构管理的，所有的读写数据的请求最终都会改变这颗树的内容，在发出读请求时可能会传入 `Watcher` 注册一个回调函数，而写请求就可能会触发相应的回调，由 `WatchManager` 通知客户端数据的变化。通知机制的实现其实还是比较简单的，通过读请求设置 `Watcher` 监听事件，写请求在触发事件时就能将通知发送给指定的客户端。

5. **Watcher 的注意事项**：
   - **一次性触发**：Watcher 通知是一次性的，一旦被触发就会被移除。如果需要持续监听节点变化，必须在收到通知后**重新注册 Watcher**。这也是导致"Watch 丢失"问题的根源。
   - **轻量级**：Watcher 通知只包含三部分内容（通知状态 state、事件类型 type、节点路径 path），不包含节点的具体数据变化内容。客户端收到通知后，需要再次调用 `getData` 等接口获取最新数据。
   - **客户端串行**：同一个客户端注册的多个 Watcher 会被**串行执行**，如果一个 Watcher 回调逻辑耗时过长，会阻塞后续 Watcher 的执行。因此，不建议在 Watcher 回调中执行耗时操作。
   - **有序性**：客户端先收到 Watch 事件，然后才能看到对应的数据变化。即客户端在处理 Watch 事件时，是看不到数据变化的，需要重新获取数据。
6. **Curator Cache 封装**：由于原生 ZooKeeper 的 Watcher 是一次性的，使用起来较为繁琐。Apache Curator 框架对 Watcher 进行了封装，提供了 **Curator Cache**（在 Curator 5.x 中统一了原 NodeCache、PathChildrenCache、TreeCache 三个 API）来实现持续监听：

```java
CuratorFramework client = CuratorFrameworkFactory.newClient(zkConnectionString, new ExponentialBackoffRetry(1000, 3));
client.start();

CuratorCache cache = CuratorCache.build(client, "/config");
cache.listenable().addListener((type, oldData, newData) -> {
    switch (type) {
        case NODE_CREATED:
            System.out.println("节点创建: " + newData.getPath());
            break;
        case NODE_CHANGED:
            System.out.println("节点数据变化: " + newData.getPath());
            break;
        case NODE_DELETED:
            System.out.println("节点删除: " + oldData.getPath());
            break;
    }
});
cache.start();
```

Curator Cache 内部会自动处理 Watcher 的重新注册，并在连接重连后恢复监听状态，有效解决了"Watch 丢失"的问题。

#### 🔬 扩展知识

【L3】设计权衡：一次性触发 + 服务端推送

::: details

ZooKeeper 的监听机制做了两个关键取舍：

| 取舍                           | 收益                                                       | 代价                                                                               |
| :----------------------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **一次性触发（触发即移除）**   | 服务端无需维护长期监听状态，频繁变更的节点不会造成通知风暴 | 客户端必须在回调里重新注册，存在"重注册窗口期"，窗口期内的变更会丢失               |
| **服务端主动推送（而非轮询）** | 变更感知延迟低（毫秒级），不浪费无效轮询                   | 服务端要维护 Watch 表（path → 客户端会话），Watch 数量多时内存与断开时的清理成本高 |

与之对比的替代方案：etcd 基于 MVCC 支持持续 Watch（保留历史版本，无需重注册）；Consul 用长轮询（blocking query）。ZooKeeper 的方案是"协调服务定位 + 内存有限"下的工程选择：用一次性触发换服务端轻量化，把重注册的复杂度推给客户端（Curator 再把它封装掉）。

:::

【L3】Watch 在什么条件下失效

::: details

- **重注册窗口期丢事件**：Watcher 触发后到重新注册之间发生的变更不会通知（一次性触发的固有代价）。
- **会话断开 / 过期**：断开期间的事件全部丢失；Session 过期后所有 Watcher 失效，临时节点被删，必须重建连接 + 重新注册。
- **串行回调阻塞**：同一客户端的 Watcher 回调串行执行，一个慢回调会阻塞后续所有事件，甚至拖慢心跳导致会话断开。
- **通知不含数据**：事件只带 state/type/path，客户端需再次 `getData`，若此时读到中间态需自行处理。

:::

【L4】量化参考

::: details

- Watch 事件从服务端触发到客户端收到通常毫秒级（同机房 < 10ms）；但"感知延迟" = 事件延迟 + 重注册窗口 + 回调处理时间，慢回调可能把感知延迟拉到秒级。
- ZooKeeper 服务端为每个 Watch 维护 path → session 映射，大规模 Watch（十万级）会显著增加内存与断连清理开销，不建议把 ZK Watch 当高吞吐消息通道用。
- 会话超时（sessionTimeout）常见配置 5~40s（服务端限制在 `2 × tickTime ~ 20 × tickTime`，tickTime 默认 2000ms）；超过该时间未收到心跳即 Session 过期，所有 Watch 失效。
- 兜底建议：无论用原生还是 Curator，都建议叠加 30~60s 的定时全量拉取对账，把 Watch 丢失的影响窗口封顶。

:::

#### 🏭 实战场景

::: details

**场景推演**（以下为模拟推演，非真实生产数据）：大促前夜，某依赖 ZooKeeper Watch 下发开关配置的系统，一台 ZooKeeper 机器网络分区后被踢出集群，客户端大量重连到新节点；随后运营推送开关变更，监控显示约 5% 的实例没有生效，仍在使用旧开关。**如何排查和决策？**

- **应急处理**：开关不生效是"安全开关还是风险开关"决定紧急度：若是限流/降级开关不生效，立即用备用通道（如 HTTP 接口直推或重启定向实例）强制生效；同时拉出未生效实例清单，评估影响面。
- **根因分析**：时间线是"ZK 节点被踢 → 客户端重连 → 变更下发后部分实例未收到通知"，典型根因有三类：① 重连期间会话状态是 CONNECTING，变更恰在此窗口发生，旧 Watch 已随断连失效、新 Watch 尚未注册；② 客户端重连后未重新注册 Watcher（原生 API 不会自动恢复）；③ 重连风暴导致部分连接建立失败但应用未感知。逐一核对客户端状态监听器日志（是否收到 RECONNECTED）、Watch 注册日志与变更时间戳即可定位。
- **长期方案**：① 切到 Curator + CuratorCache，自动处理重连后的 Watch 恢复；② 监听 ConnectionStateListener，RECONNECTED 后主动全量拉取一次配置（弥补断连期间的变更）；③ 叠加 30s 定时全量对账，把 Watch 丢失窗口封顶；④ ZK 集群监控 session 断开/重连风暴指标，提前发现网络分区。
- **权衡**：Watch 机制的正确性依赖"客户端状态恢复的完备性"，而网络分区 + 重连风暴恰恰是这种完备性最容易失效的时刻。正确姿势不是追求 Watch 永不丢失（做不到），而是接受"推送可能丢"的事实，用"重连全量拉取 + 定时对账"把丢失后果收敛到可接受窗口——推送负责低延迟，拉取负责正确性。

**踩坑案例**（推演案例）：某配置中心用原生 Watcher 监听配置节点，某次变更发布后部分实例一直用旧配置。排查：这些实例在收到 Watch 通知后先做了一次耗时的配置解析（约 3 秒）再重新注册 Watcher，而在这 3 秒窗口内运营又改了一次配置——第二次变更没有任何通知，且实例重新注册的是"基于旧数据的新 Watcher"，从此永久错过。根因是"慢回调拉大了一次性触发的丢失窗口 + 回调里没先重注册"。修复：① 回调里第一步先重新注册 Watcher，再做业务处理；② 耗时逻辑丢到线程池异步执行，不阻塞 Watcher 线程；③ 增加 30s 定时全量拉取对账作为兜底；④ 长期切到 CuratorCache。教训：**一次性触发机制下，"先重注册、后处理、再对账"是使用原生 Watcher 的铁律**。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "注册一次 Watcher 就能持续收到变更通知" → 错。Watcher 是一次性触发的，触发后即从服务端移除，要持续监听必须在回调里重新注册，否则后续变更完全无感知。
- ❌ "Watch 通知里带了节点的最新数据" → 错。通知只含 state/type/path 三部分，不含数据内容，客户端必须再调用 `getData` 获取最新值。
- ❌ "只要 Session 还在，Watch 就永远有效" → 错。连接断开期间的事件全部丢失；Session 过期后所有 Watch 失效、临时节点被删，必须重建连接并全量恢复状态。

:::

#### 🔀 发散问题

**Q：为什么 ZooKeeper 不做成"持续 Watch"（像 etcd 那样）？**
A：持续 Watch 要求服务端保留历史版本（MVCC）或长期持有监听状态，这与 ZooKeeper "全内存、轻量协调服务"的定位冲突：ZK 数据全量存内存且单节点数据量建议控制在 GB 级以下，保留多版本会显著推高内存开销。一次性触发是把状态维护成本转嫁给客户端的取舍，etcd 则选择了相反的方向。

**Q：Watch 通知后客户端立刻 getData，一定能读到最新值吗？**
A：能读到触发事件对应的变更：ZooKeeper 保证事件通知先于同客户端后续读请求被处理（FIFO 顺序）。但不一定能读到"触发事件之后的下一次变更"；若读的是 Follower 且未 sync，理论上可能读到尚未同步的旧状态（极端情况），对一致性敏感的场景应先 `sync` 或读 Leader。

**Q：大量客户端 Watch 同一节点时，变更会发生什么？如何优化？**
A：服务端会向所有订阅者逐个推送，产生 O(N) 的通知风暴，且每个客户端收到后还会重新 getData + 重注册，进一步放大压力。优化：① 分层订阅（选代表节点 Watch，再广播）；② 只 Watch 不读，变更由定时批量拉取获取；③ 把高频变更的配置移出 ZK，改用专门的配置中心。

### 【中等】ZooKeeper 会话机制是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 会话机制

#### 💎 关键结论

会话（Session）从客户端首次连接集群时建立，靠心跳保活；超时时间内服务端未收到任何请求则会话过期，过期不可逆，该会话的临时节点全部被删除。因为临时节点与 Watch 都依附于会话，会话是 ZooKeeper 协调能力的载体。

#### ⚡记忆卡片

- **口诀**：会话靠心跳，临时随会话亡
- **关键词**：Session ／ 心跳 ／ sessionTimeout ／ 临时节点 ／ SessionTracker
- **链路**：建立连接创建会话 → 心跳保活 → 超时则过期 → 临时节点删除 → 关联 Watch 失效

#### 📖 核心知识

1. **连接与会话建立**：**ZooKeeper 客户端通过 TCP 长连接连接到 ZooKeeper 服务集群**。**会话（Session）从第一次连接开始就已经建立，之后通过心跳检测机制来保持有效的会话状态**。通过这个连接，客户端可以发送请求并接收响应，同时也可以接收到 Watch 事件的通知。每个 ZooKeeper 客户端配置中都配置了 ZooKeeper 服务器集群列表，启动时会遍历列表尝试建立连接，失败则尝试下一个服务器，依次类推。
2. **会话过期语义**：一旦客户端与一台服务器建立连接，这台服务器会为这个客户端创建一个新的会话。**每个会话都会有一个超时时间，若服务器在超时时间内没有收到任何请求，则相应会话被视为过期**。一旦会话过期，就无法再重新打开，且任何与该会话相关的临时 znode 都会被删除。
3. **保活方式**：通常来说，会话应该长期存在，而这需要由客户端来保证。客户端可以通过心跳方式（ping）来保持会话不过期。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/2362e3dba7794967a892919e1bd8e446.png)

4. **会话的四个属性**：
   - `sessionID` - 会话 ID，唯一标识一个会话，每次客户端创建新的会话时，ZooKeeper 都会为其分配一个全局唯一的 sessionID。
   - `TimeOut` - 会话超时时间，客户端在构造 ZooKeeper 实例时，会配置 sessionTimeout 参数用于指定会话的超时时间，ZooKeeper 客户端向服务端发送这个超时时间后，服务端会根据自己的超时时间限制最终确定会话的超时时间。
   - `TickTime` - 下次会话超时时间点，为了便于 ZooKeeper 对会话实行“分桶策略”管理，同时为了高效低耗地实现会话的超时检查与清理，ZooKeeper 会为每个会话标记一个下次会话超时时间点，其值大致等于当前时间加上 TimeOut。
   - `isClosing` - 标记一个会话是否已经被关闭，当服务端检测到会话已经超时失效时，会将该会话的 isClosing 标记为“已关闭”，这样就能确保不再处理来自该会话的新请求了。
5. **SessionTracker 分桶管理**：ZooKeeper 的会话管理主要是通过 `SessionTracker` 来负责，其采用了**分桶策略**（将类似的会话放在同一区块中进行管理）进行管理，以便 ZooKeeper 对会话进行不同区块的隔离处理以及同一区块的统一处理。

#### 🔬 扩展知识

【L3】超时时间协商与分桶

::: details

客户端配置的 sessionTimeout 并非最终生效值，服务端会将其限制在 `2 × tickTime ~ 20 × tickTime` 范围内（tickTime 默认 2000ms）协商确定。SessionTracker 按“下次超时时间点”把会话分桶管理，每次只检查最近一个时间桶，从而高效低耗地完成超时检查与清理。

:::

【L4】连接断开 ≠ 会话过期

::: details

连接短暂断开但会话仍在有效期内时，重连后会话恢复，临时节点与 Watch 依然有效；而会话过期（Expired）不可逆，必须重建连接并重建全部状态（重注册 Watch、重建临时节点）。Curator 用 SUSPENDED / RECONNECTED / LOST 等连接状态区分了这些阶段。

:::

#### 🔀 发散问题

**Q：Session 过期会造成哪些业务影响？**
A：临时节点全部删除导致分布式锁被误释放、服务自动下线、Master 丢失身份，且所有 Watch 失效。详见本文档『ZooKeeper Session 过期会导致什么问题？如何处理？』。

**Q：会话断开期间 Watch 通知会怎样？**
A：断开期间的事件全部丢失，重连后原生 Watcher 也不会自动恢复。详见本文档『ZooKeeper 的 Watch 丢失问题是什么？如何解决？』。

## Zab 协议

### 【中等】什么是 Zab 协议？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / ZAB 协议

#### 💎 关键结论

ZAB 是 ZooKeeper 专门设计的一种支持故障恢复的原子广播协议，它不是 Paxos。它定义了选举 Leader 与原子广播两个可无限循环的流程，前者保高可用，后者保数据一致性。

#### ⚡记忆卡片

- **口诀**：两种模式：选举与广播
- **关键词**：ZAB ／ 原子广播 ／ 选举 Leader ／ 故障恢复
- **链路**：Leader 宕机 → 进入选举流程 → 选出新 Leader 并同步状态 → 过半同步完成 → 切换到原子广播模式处理写请求

#### 📖 核心知识

1. **不是 Paxos**：ZooKeeper 并没有直接采用 Paxos 算法，而是采用了名为 ZAB 的一致性协议。**ZAB 协议不是 Paxos 算法**，只是比较类似，二者在操作上并不相同。Multi-Paxos 实现的是一系列值的共识，不关心最终达成共识的值是什么，不关心各值的顺序。而 ZooKeeper 需要确保操作的顺序性。
2. **协议定位**：ZAB 协议是 ZooKeeper 专门设计的一种**支持故障恢复的原子广播协议**，是 ZooKeeper 的数据一致性和高可用解决方案。
3. **两个无限循环的流程**：
   - **`选举 Leader`** - 用于故障恢复，从而保证高可用。
   - **`原子广播`** - 用于主从同步，从而保证数据一致性。

#### 🔬 扩展知识

【L3】为什么不用 Multi-Paxos？

::: details

Multi-Paxos 对“一系列值”做共识，不保证值之间的应用顺序；而 ZooKeeper 作为主备复制系统，必须让所有副本按完全相同的顺序应用增量更新，因此需要 ZAB 这种带强领导者、按序提交的协议。

:::

【L4】全序广播与共识的关系

::: details

ZAB 的原子广播本质上是一种全序广播（Total Order Broadcast）。在分布式理论中，全序广播与共识可以相互归约，因此 ZAB 也属于共识协议家族，只是面向主备系统做了专门设计。

:::

#### 🔀 发散问题

**Q：Leader 宕机后的恢复流程是怎样的？**
A：基于过半选举机制选出新 Leader，过半机器完成状态同步后退出选举进入广播模式。详见本文档『Zab 协议中故障恢复的流程是怎样的？』。

**Q：正常写入时数据如何同步？**
A：走原子广播：Leader 生成 Proposal 广播，过半持久化后提交。详见本文档『Zab 协议中原子广播的流程是怎样的？』。

### 【困难】Zab 协议中故障恢复的流程是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：ZooKeeper / ZAB 协议

#### 💎 关键结论

Leader 宕机后，ZAB 基于过半选举机制产生新 Leader，其他机器从新 Leader 同步状态，过半机器完成同步后即退出选举模式、进入原子广播模式。因为“过半”在数学上保证了不可能出现双 Leader。

#### ⚡记忆卡片

- **口诀**：先比数据后比号，过半为王
- **关键词**：myid ／ zxid ／ logicClock ／ 选票 PK ／ 过半
- **链路**：服务器进入 LOOKING → 投自己并广播 → 收外部票按（zxid、myid）PK → 过半认可 → 产生 Leader → Follower 同步状态 → 进入原子广播

#### 📖 核心知识

**故障恢复概述**

**ZooKeeper 集群采用一主多从模式，主从节点通过副本机制保证数据一致**。

- **如果 Follower 节点挂了** - ZooKeeper 集群中的每个节点都会单独在内存中维护自身的状态，并且各节点之间都保持着通讯，**只要集群中有半数机器能够正常工作，那么整个集群就可以正常提供服务**。
- **如果 Leader 节点挂了** - 系统就不能正常工作了。此时，需要通过 ZAB 协议的选举 Leader 机制来进行故障恢复。

ZAB 协议的选举 Leader 机制简单来说，就是：**基于过半选举机制产生新的 Leader**，之后其他机器将从新的 Leader 上同步状态，当有过半机器完成状态同步后，就退出选举 Leader 模式，进入原子广播模式。

**术语**

- **myid** - 每个 ZooKeeper 服务器，都需要在数据文件夹下创建一个名为 myid 的文件，**该文件包含整个 ZooKeeper 集群唯一的 ID（整数）**。
- **zxid** - 类似于 RDBMS 中的事务 ID，**用于标识一次更新操作的 Proposal ID**。为了保证顺序性，该 zxid 必须单调递增。因此 ZooKeeper 使用一个 64 位的数来表示，高 32 位是 Leader 的 epoch，从 1 开始，每次选出新的 Leader，epoch 加一。低 32 位为该 epoch 内的序号，每次 epoch 变化，都将低 32 位的序号重置。这样保证了 zxid 的全局递增性。

**服务器状态**

- **LOOKING** - 不确定 Leader 状态。该状态下的服务器认为当前集群中没有 Leader，会发起 Leader 选举。
- **FOLLOWING** - 跟随者状态。表明当前服务器角色是 Follower，并且它知道 Leader 是谁。
- **LEADING** - 领导者状态。表明当前服务器角色是 Leader，它会维护与 Follower 间的心跳。
- **OBSERVING** - 观察者状态。表明当前服务器角色是 Observer，与 Follower 唯一的不同在于不参与选举，也不参与集群写操作时的投票。

**选票数据结构**

每个服务器在进行领导选举时，会发送如下关键信息：

- **logicClock** - 每个服务器会维护一个自增的整数，名为 logicClock，它表示这是该服务器发起的第多少轮投票。
- **state** - 当前服务器的状态。
- **self_id** - 当前服务器的 myid。
- **self_zxid** - 当前服务器上所保存的数据的最大 zxid。
- **vote_id** - 被推举的服务器的 myid。
- **vote_zxid** - 被推举的服务器上所保存的数据的最大 zxid。

**投票流程**

（1）**自增选举轮次** - ZooKeeper 规定所有有效的投票都必须在同一轮次中。每个服务器在开始新一轮投票时，会先对自己维护的 logicClock 进行自增操作。

（2）**初始化选票** - 每个服务器在广播自己的选票前，会将自己的投票箱清空。该投票箱记录了所收到的选票。例：服务器 2 投票给服务器 3，服务器 3 投票给服务器 1，则服务器 1 的投票箱为 (2, 3), (3, 1), (1, 1)。票箱中只会记录每一投票者的最后一票，如投票者更新自己的选票，则其它服务器收到该新选票后会在自己票箱中更新该服务器的选票。

（3）**发送初始化选票** - 每个服务器最开始都是通过广播把票投给自己。

（4）**接收外部投票** - 服务器会尝试从其它服务器获取投票，并记入自己的投票箱内。如果无法获取任何外部投票，则会确认自己是否与集群中其它服务器保持着有效连接。如果是，则再次发送自己的投票；如果否，则马上与之建立连接。

（5）**判断选举轮次** - 收到外部投票后，首先会根据投票信息中所包含的 logicClock 来进行不同处理：

- 外部投票的 logicClock 大于自己的 logicClock。说明该服务器的选举轮次落后于其它服务器的选举轮次，立即清空自己的投票箱并将自己的 logicClock 更新为收到的 logicClock，然后再对比自己之前的投票与收到的投票以确定是否需要变更自己的投票，最终再次将自己的投票广播出去。
- 外部投票的 logicClock 小于自己的 logicClock。当前服务器直接忽略该投票，继续处理下一个投票。
- 外部投票的 logicClock 与自己的相等。此时进行选票 PK。

（6）**选票 PK** - 选票 PK 是基于 `(self_id, self_zxid)` 与 `(vote_id, vote_zxid)` 的对比：

- 若 logicClock 一致，则对比二者的 vote_zxid，若外部投票的 vote_zxid 比较大，则将自己的票中的 vote_zxid 与 vote_myid 更新为收到的票中的 vote_zxid 与 vote_myid 并广播出去，另外将收到的票及自己更新后的票放入自己的票箱。如果票箱内已存在 (self_myid, self_zxid) 相同的选票，则直接覆盖。
- 若二者 vote_zxid 一致，则比较二者的 vote_myid，若外部投票的 vote_myid 比较大，则将自己的票中的 vote_myid 更新为收到的票中的 vote_myid 并广播出去，另外将收到的票及自己更新后的票放入自己的票箱。

（7）**统计选票** - 如果已经确定有过半服务器认可了自己的投票（可能是更新后的投票），则终止投票。否则继续接收其它服务器的投票。

（8）**更新服务器状态** - 投票终止后，服务器开始更新自身状态。若过半的票投给了自己，则将自己的服务器状态更新为 LEADING，否则将自己的状态更新为 FOLLOWING。

通过以上流程分析，我们不难看出：要使 Leader 获得多数 Server 的支持，则 **ZooKeeper 集群节点数必须是奇数。且存活的节点数目不得少于 `N + 1`**。

每个 Server 启动后都会重复以上流程。在恢复模式下，如果是刚从崩溃状态恢复的或者刚启动的 server 还会从磁盘快照中恢复数据和会话信息，zk 会记录事务日志并定期进行快照，方便在恢复时进行状态恢复。

#### 🔬 扩展知识

【L3】过半机制为何防脑裂

::: details

两个分区不可能同时拥有过半节点，因此不可能同时选出两个合法 Leader；少数派分区会因无法过半而停摆，从根本上避免“双 Leader 双写”。详见本文档『ZooKeeper 如何应对脑裂问题？』。

:::

【L4】具体算法实现

::: details

上述流程的默认实现是 FastLeaderElection（早期版本还有 LeaderElection 等实现，通过 electionAlg 参数选择），其核心原理详见本文档『FastLeaderElection 算法的核心原理是什么？』。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "谁先发起选举谁就当 Leader" → 错。Leader 由选票 PK 结果决定：zxid 大（数据新）者优先，zxid 相同才比 myid，且必须过半认可。
- ❌ "集群挂了 2 台还能继续服务" → 不一定。5 节点集群最多容忍 2 台故障，3 节点集群挂 2 台即不过半，集群不可用。

:::

#### 🔀 发散问题

**Q：新 Leader 选出后，数据落后的 Follower 如何追赶？**
A：Follower 连接 Leader 并上报最大 zxid，Leader 据此确定同步点，同步完成后 Follower 进入 uptodate 状态重新对外服务，详见本题 📖 核心知识的同步流程。

### 【困难】Zab 协议中原子广播的流程是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：ZooKeeper / ZAB 协议

#### 💎 关键结论

所有写请求都转发给 Leader，Leader 以原子广播方式通知 Follower，当半数以上 Follower 已将更新持久化后，Leader 才提交更新并响应客户端。这形似两阶段提交，但只需多数派确认。

#### ⚡记忆卡片

- **口诀**：Leader 广播，过半持久化即提交
- **关键词**：Proposal ／ ZXID ／ 半数 ACK ／ Commit ／ 类 2PC
- **链路**：写请求 → Leader 生成 Proposal 并分配 ZXID → 广播 Follower → 过半持久化并 ACK → Leader 提交 → 响应客户端成功

#### 📖 核心知识

1. **副本机制的实现**：**ZooKeeper 通过副本机制来实现高可用**，而副本机制的实现正是 ZAB 协议的原子广播。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/12/887f931d51a74924816aa7cea443d661.png)

2. **广播规则**：ZAB 协议的原子广播要求：**所有的写请求都会被转发给 Leader，Leader 会以原子广播的方式通知 Follower。当半数以上的 Follower 已经更新状态持久化后，Leader 才会提交这个更新，然后客户端才会收到一个更新成功的响应**。这有些类似数据库中的两阶段提交协议。
3. **Proposal 与 ZXID**：在整个消息的广播过程中，Leader 服务器会为每个事务请求生成对应的 Proposal，并为其分配一个全局唯一的递增的事务 ID（ZXID），之后再对其进行广播。

> ZAB 是通过“一切以领导者为准”的强领导者模型和严格按照顺序提交日志，来实现操作的顺序性的，这一点和 Raft 是一样的。

#### 🔬 扩展知识

【L3】与两阶段提交（2PC）的本质差异

::: details

2PC 要求所有参与者都确认才能提交，任一参与者故障都会阻塞整个事务；ZAB 只需半数以上 ACK，少数派故障不影响提交，因此 ZAB 是可容错的共识流程，而 2PC 是阻塞式协议。

:::

【L4】顺序提交如何保证全局有序

::: details

Leader 按 zxid 严格顺序生成并按序提交 Proposal，Follower 也严格按接收顺序落盘与应用；任何副本的日志前缀都一致，这保证了所有副本对增量更新的应用顺序完全一致。

:::

#### 🏭 实战场景

::: details

以下推演（模拟场景）：某 5 节点 ZooKeeper 集群一次写入中，2 台 Follower 所在磁盘 IO 突增、ACK 变慢。由于只需过半（3/5，含 Leader 自身）确认即可提交，写入延迟取决于第 3 个 ACK 的速度而非最慢节点；若故障机器达到 3 台则集群失去多数派，停止写服务并触发选举。这解释了为什么 ZooKeeper 对磁盘与网络延迟敏感：写延迟由“过半中最慢者”决定。

:::

#### 🔀 发散问题

**Q：原子广播和写操作工作流程是同一件事吗？**
A：是同一流程的不同视角：写操作工作流描述请求路径（五步），原子广播描述协议语义（Proposal/ACK/Commit）。详见本文档『ZooKeeper 写操作工作流程是怎样的？』。

### 【中等】Zab 和 Paxos 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / ZAB 协议

#### 💎 关键结论

Zab 与 Paxos 表面相似（提案 + 过半确认 + epoch/Ballot），但设计目标不同：Zab 为高可用主备系统设计，强调增量状态更新的严格顺序；Paxos 用于构建一致性状态机系统。

#### ⚡记忆卡片

- **口诀**：相同过半，目标两般
- **关键词**：Proposal ／ epoch ／ Ballot ／ 主备系统 ／ 状态机
- **链路**：客户端请求 → Paxos 对多个值做无序共识 ／ Zab 由主节点生成有序更新 → 副本严格按序执行

#### 📖 核心知识

1. **相似点**：Zab 和 Paxos 协议在实现上有非常多的相似点，例如：
   - 主节点会向所有的从节点发出提案；
   - 主节点在接收到一组从节点中一半以上节点的确认后，才会认为当前提案被提交的；
   - Zab 协议中的每一个提案都包含一个 epoch 值，与 Paxos 中的 Ballot 非常相似。
2. **设计目标差异**：因为有这些相同的特点，有的观点会认为 Zab 是 Paxos 的一个简化版本，但 Zab 和 Paxos 在设计理念上有着比较大的不同：Zab 主要是为构建高可用的主备系统设计的，而 Paxos 能够帮助工程师搭建具有一致性的状态机系统。
3. **状态机系统的语义**：作为一个一致性状态机系统，它能够保证集群中任意一个状态机副本都按照客户端的请求执行了相同顺序的请求，即使来自客户端的请求是异步的并且不同客户端接收同一个请求的顺序不同，集群中的这些副本就是会使用 Paxos 或者它的变种对提案达成一致；在集群运行的过程中，如果主节点出现了错误导致宕机，其他的节点会重新开始进行选举并处理未提交的请求。
4. **主备系统的语义**：在类似 ZooKeeper 的高可用主备系统中，所有的副本都需要对增量的状态更新顺序达成一致，这些状态更新的变量都是由主节点创建并发送给其他的从节点的，每一个从节点都会严格按照顺序逐一的执行主节点生成的状态更新请求，如果 ZooKeeper 集群中的主节点发生了宕机，新的主节点也必须严格按照顺序对请求进行恢复。
5. **总结**：使用状态更新节点数据的主备系统相比根据客户端请求改变状态的状态机系统对于请求的执行顺序有着更严格的要求。

#### 🔬 扩展知识

【L3】epoch 与 Ballot 的对应

::: details

两者的 epoch/Ballot 都用于标识“提案属于哪一任领导者/哪一轮投票”，防止跨任期的旧提案干扰新任期；Zab 将其固化进 zxid 高 32 位，比较 zxid 即可比较任期新旧。

:::

【L4】顺序要求的根源

::: details

状态机副本可以基于共识结果自行排序应用，而主备系统的副本必须逐条复刻主节点产生的更新流，因此 Zab 把“顺序”做成协议的一等公民（全局递增 zxid + 按序提交），这是它与 Multi-Paxos 最实质的区别。

:::

> 📚 延伸阅读：[Zab vs. Paxos](https://cwiki.apache.org/confluence/display/ZOOKEEPER/Zab+vs.+Paxos)

#### 🔀 发散问题

**Q：Zab、Raft、Paxos 三者如何定位？**
A：三者同属共识协议家族：Paxos 偏理论原型，Raft 以可理解性著称且广泛用于 etcd 等系统，Zab 专为主备复制的 ZooKeeper 设计。

## ZooKeeper 一致性

### 【困难】ZooKeeper 提供了怎样的一致性保证？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：ZooKeeper / 一致性模型

#### 💎 关键结论

ZooKeeper 提供的是顺序一致性（Sequential Consistency），而不是线性一致性：写经 ZAB 过半提交保证全局有序，但读由 Follower 本地处理可能读到旧值，读最新需要 sync 或读 Leader。

#### ⚡记忆卡片

- **口诀**：写强读弱，sync 补齐
- **关键词**：顺序一致性 ／ 线性一致性 ／ sync ／ Follower 读
- **链路**：写经 Leader 过半提交 → 读由 Follower 本地返回 → 可能读到旧值 → sync 追平 Leader 后读到最新

#### 📖 核心知识

**ZooKeeper 提供的是顺序一致性（Sequential Consistency），而不是强一致性（线性一致性）**。这是 ZooKeeper 面试中最容易混淆的一点，需要准确理解。

1. **ZooKeeper 一致性的精确定义**（官方文档给出的保证）：
   - **顺序一致性（Sequential Consistency）**：来自客户端的更新请求，将按照其发送顺序被应用。
   - **原子性（Atomicity）**：更新要么成功，要么失败，不存在部分应用的情况。
   - **单一系统映像（Single System Image）**：客户端无论连接到哪个服务器，看到的数据视图都是一致的。
   - **可靠性（Reliability）**：一旦更新被应用，其结果将一直保留，直到被另一个更新覆盖。
   - **及时性（Timeliness）**：系统的客户端视图最终会保证是及时的（但不保证实时）。
2. **为什么不是线性一致性？** ZooKeeper 的**读请求不经过 Leader，由 Follower 本地直接处理**。当 Leader 已经提交了一个事务但尚未同步到某个 Follower 时，该 Follower 仍可能返回旧数据：客户端 A 执行写操作 `setData("/x", "v2")` 并收到成功响应，紧接着客户端 B 执行 `getData("/x")` 仍可能读到旧值 `v1`。这种“先写后读却读到旧值”的现象违反了线性一致性的定义。
3. **如何读取最新数据？**
   - **`sync` 操作**：客户端在 `getData` 之前先调用 `sync`，强制 Follower 追赶到 Leader 的最新状态后再读取。
   - **直接读 Leader**：将读请求转发给 Leader 处理（牺牲一部分读性能）。
   - **注册 Watcher**：通过 Watcher 感知数据变化后再读取。
4. **单一 Leader 的写顺序语义**：ZooKeeper 的所有写请求都由 Leader 串行处理，并分配全局递增的 zxid，因此写操作天然是全局有序的。客户端看到的写操作顺序，与 Leader 处理的顺序一致，这是顺序一致性的核心保证。

> **小结**：ZooKeeper 在写上保证强一致性（通过 ZAB 协议），在读上只保证最终一致。整体属于顺序一致性，适合作为协调服务（如选举、配置下发、分布式锁），不适合作为强一致存储。

#### 🔬 扩展知识

【L3】sync 的原理与代价

::: details

`sync` 让当前 Follower 将待同步队列追平到 Leader 已提交的最新状态后再服务读请求，是一种轻量级的“读最新”折衷；代价是该次读的延迟增加，但比所有读都打到 Leader 更均衡。

:::

【L4】与 etcd 的一致性对比

::: details

etcd 基于 Raft，默认读请求由 Leader 处理，是线性一致的；ZooKeeper 默认读 Follower，只保证顺序一致性。选型时若业务对“读自己刚写的数据”敏感，需要显式使用 sync/读 Leader（ZK）或接受更高的读延迟（etcd）。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "ZooKeeper 是强一致（线性一致）存储" → 错。写是过半提交的强一致，但默认读可能滞后，整体是顺序一致性。
- ❌ "写成功后立刻读一定能读到新值" → 不一定。读请求若落在尚未同步完成的 Follower 上会读到旧值，需 sync 或读 Leader。

:::

#### 🔀 发散问题

**Q：ZooKeeper 是 CP 还是 AP？**
A：CP 系统，网络分区时少数派停摆、选举期间不可用，牺牲可用性保一致性。详见本文档『ZooKeeper 是 CP 还是 AP？』。

**Q：Follower 读为什么会滞后？**
A：写请求由 Leader 异步广播给 Follower，提交只需过半 ACK，未 ACK 的 Follower 本地数据自然短暂落后。详见本文档『ZooKeeper 写操作工作流程是怎样的？』。

### 【中等】ZooKeeper 是 CP 还是 AP？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / CAP

#### 💎 关键结论

ZooKeeper 是典型的 CP 系统：ZAB 保证一致性与分区容错，但 Leader 选举与少数派失效时集群会拒绝服务，牺牲了可用性。这也是它不适合作为服务注册中心的核心原因。

#### ⚡记忆卡片

- **口诀**：C 靠 ZAB，A 失在选举
- **关键词**：CP ／ ZAB ／ Leader 选举 ／ 少数派停摆 ／ 注册中心
- **链路**：网络分区 → 多数派选出 Leader 继续服务、少数派停摆 → 选举期间集群不可写 → 依赖方服务发现中断

#### 📖 核心知识

**ZooKeeper 是 CP 系统**，即在 CAP 理论中优先保证一致性和分区容错性，牺牲可用性。

1. **CP 的体现**：
   - **一致性（C）**：ZooKeeper 通过 ZAB 协议保证集群中所有节点数据一致。每次写请求必须经过 Leader，并由过半节点 ACK 后才能提交，保证强一致。
   - **分区容错（P）**：ZooKeeper 集群部署在多台机器上，天然支持网络分区。
   - **牺牲可用性（A）**：当网络分区导致 Leader 选举或节点数不足半数时，ZooKeeper 集群**不可用**（无法处理写请求），直到选举出新 Leader 或恢复多数派。
2. **不满足 AP 的典型场景**：
   - **Leader 宕机**：触发 Leader 选举，期间集群不可用（通常 200ms ~ 数秒）。
   - **网络分区**：少于半数节点的分区无法选出 Leader，直接停止服务。
3. **对注册中心的影响**：这也是为什么 ZooKeeper **不适合作为服务注册中心**的核心原因：注册中心更需要 AP 特性（即使节点间短暂不一致，也应保证服务发现可用），而 ZooKeeper 的 CP 特性在网络抖动时会导致整个服务发现不可用。Eureka、Nacos（AP 模式）更适合作为注册中心。

#### 🔬 扩展知识

【L3】注册中心场景的取舍

::: details

服务地址列表属于"宁可短暂不一致也要可用"的数据：调用方拿到稍旧的地址顶多调用失败重试，但注册中心整体不可用会让所有服务发现瘫痪。因此注册中心普遍选 AP（Eureka、Nacos AP 模式），而配置、选举、锁这类协调场景才是 ZooKeeper 的主场。

:::

【L4】可用性的边界

::: details

ZooKeeper 的可用性取决于多数派存活：3 节点容忍 1 个故障，5 节点容忍 2 个故障；多数派分区在选举完成后仍可正常读写，并非分区即全停，但选举窗口期整体不可写。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "ZooKeeper 分区时还能读，所以是 AP" → 错。少数派分区直接停摆，选举窗口期集群不可写，本质是牺牲可用性保一致性。
- ❌ "CP 系统就是完全不可用" → 错。多数派分区在选出新 Leader 后仍可正常服务，CP 描述的是分区时的取舍偏好而非永久不可用。

:::

#### 🔀 发散问题

**Q：ZooKeeper 与 Eureka、Nacos 的本质差异是什么？**
A：ZK 是 CP 协调服务，Eureka 是 AP 注册中心，Nacos 同时支持 AP/CP 模式；差异根源是对可用性与一致性的取舍不同。

**Q：ZooKeeper 的架构缺陷和 CP 特性有什么关系？**
A：选举敏感、单 Leader 等问题正是"强一致优先"设计的代价。详见本文档『ZooKeeper 的架构有什么缺点？』。

## ZooKeeper 选举算法

### 【中等】FastLeaderElection 算法的核心原理是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 选举算法

#### 💎 关键结论

FastLeaderElection 是 ZooKeeper 默认的 Leader 选举算法：每台服务器先投自己，收到外部选票后按「先比 zxid、再比 myid」PK，谁先获得过半支持谁当 Leader。因为选数据最新的节点能最小化后续同步开销。

#### ⚡记忆卡片

- **口诀**：数据新者胜，同号大者胜
- **关键词**：zxid ／ myid ／ logicClock ／ 选票 PK ／ 过半
- **链路**：投自己并广播 → 收外部票 → 比 logicClock 过滤过期票 → 按（zxid、myid）PK → 改票重广播收敛 → 过半认可当选 Leader

#### 📖 核心知识

**FastLeaderElection（快速领导者选举）是 ZooKeeper 默认使用的 Leader 选举算法**，用于在集群启动或 Leader 崩溃时快速选出新 Leader。其核心思想是：**通过选票 PK，让拥有最新数据（最大 zxid）和最大 myid 的服务器优先成为 Leader**。

1. **核心比较规则**（优先级从高到低）：
   - **比较 zxid（事务 ID）**：zxid 大的优先。zxid 反映了服务器上数据的完整度，zxid 越大说明数据越新。
   - **比较 myid（服务器 ID）**：zxid 相同时，myid 大的优先。这是一个保证收敛性的 tiebreaker。
2. **选举流程（简明版）**：
   1. **自增选票轮次（logicClock）**：每开始新一轮选举，logicClock 自增。
   2. **投自己**：每个服务器初始都投票给自己，选票格式为 `(myid, zxid)`。
   3. **广播选票**：将自己的选票发送给集群中所有其他服务器。
   4. **接收并 PK**：收到其他服务器的选票后，与自己当前支持的选票 PK：若外部选票优先级更高，则更新自己的选票并重新广播；若更低则忽略；相同则不变。
   5. **统计过半**：当某服务器发现集群中**过半**的服务器都支持同一个候选者时，该候选者成为 Leader。
   6. **更新状态**：Leader 切换为 LEADING，其他服务器切换为 FOLLOWING。
3. **为什么叫“Fast”？** 相比早期的 LeaderElection 算法，FastLeaderElection 优化了消息交换机制：服务器间直接点对点交换选票（默认基于 TCP 连接），无需经过中间转发；并通过 logicClock 机制过滤过期选票，避免无效投票，加快收敛。
4. **为什么选 zxid 最大的？** 选 zxid 最大的服务器作为 Leader，可以**最小化数据同步开销**：新 Leader 拥有最新的数据，其他 Follower 只需从 Leader 同步缺失的事务，避免了“Leader 数据比 Follower 还旧”的复杂恢复场景，保证了 ZAB 协议的“主备一致性”。

#### 🔬 扩展知识

【L3】logicClock 的作用

::: details

logicClock 标识选举轮次：收到更大轮次的票则跟随更新，收到更小轮次的票直接丢弃。它过滤了跨轮次的过期选票，避免旧票干扰收敛，是“Fast”的关键之一。

:::

【L4】消息复杂度与集群规模

::: details

每轮选举中服务器间两两交换选票，消息复杂度为 O(N²) 量级，因此 ZooKeeper 集群规模通常控制在 3/5/7 节点，靠 Observer 扩展读而非无限加投票节点。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "myid 最大的服务器会当 Leader" → 错。myid 只是 zxid 相同时的 tiebreaker，数据更新（zxid 更大）的服务器优先。
- ❌ "获得最多票数就能当选" → 错。必须获得过半数（而非相对多数）选票支持才能当选。

:::

#### 🔀 发散问题

**Q：选举的完整投票流程包含哪些步骤？**
A：包含自增轮次、初始化选票、广播、接收外部票、判断轮次、选票 PK、统计过半、更新状态八个步骤。详见本文档『Zab 协议中故障恢复的流程是怎样的？』。

**Q：为什么集群节点数必须是奇数？**
A：过半机制下偶数节点不提升容错却增加 ACK 成本。详见本文档『ZooKeeper 集群为什么推荐奇数节点？』。

## ZooKeeper 对比

### 【中等】ZooKeeper vs etcd vs Consul 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 技术对比

#### 💎 关键结论

三者都是 CP 协调组件，差异在生态与能力：ZooKeeper（ZAB、Java）深耕大数据生态，etcd（Raft、Go）是 K8s 标配，Consul（Raft、Go）服务发现能力最开箱即用。

#### ⚡记忆卡片

- **口诀**：都是 CP，各靠生态
- **关键词**：ZAB ／ Raft ／ 一次性 Watch ／ MVCC 持续 Watch ／ 长轮询
- **链路**：业务生态决定选型 → 协议与 Watch 机制决定用法 → CP 属性决定故障时的降级预案

#### 📖 核心知识

ZooKeeper、etcd、Consul 都是常见的分布式协调/服务发现组件，但它们在设计理念、实现语言和适用场景上有显著差异。

**核心对比**

| 维度           | ZooKeeper                     | etcd                           | Consul                              |
| :------------- | :---------------------------- | :----------------------------- | :---------------------------------- |
| **开发语言**   | Java                          | Go                             | Go                                  |
| **一致性协议** | ZAB（类 Paxos）               | Raft                           | Raft                                |
| **CAP 模型**   | CP                            | CP                             | CP（支持 stale 模式近似 AP）        |
| **数据模型**   | 层级树形 ZNode                | 扁平 KV（v3 支持前缀范围查询） | KV + 服务目录                       |
| **Watch 机制** | 一次性触发（需 Curator 补丁） | 持续 Watch（基于 MVCC 多版本） | 长轮询/blocking query               |
| **服务发现**   | 需自行实现（基于临时节点）    | 需自行实现                     | **原生支持**，内置健康检查          |
| **健康检查**   | Session 心跳                  | 无内置，需应用层实现           | **内置多种检查**（HTTP/TCP/Script） |
| **多数据中心** | 不支持                        | 不支持（需多集群拼接）         | **原生支持**                        |
| **ACL 权限**   | 支持（digest/ip/sasl）        | 支持（RBAC）                   | 支持（ACL + Intention）             |
| **HTTP API**   | 弱（原生 TCP 协议）           | **强**（gRPC + HTTP/JSON）     | **强**（HTTP/gRPC）                 |
| **运维复杂度** | 高（JVM 调优、GC 影响）       | 低                             | 中（集成度高，但概念多）            |
| **典型场景**   | Hadoop/Kafka/HBase 生态协调   | Kubernetes 状态存储            | 服务发现 + 配置 + 健康检查一体化    |

**选型建议**

- **Kubernetes 生态** → **etcd**：K8s 原生依赖，Raft 协议成熟，Go 语言生态一致。
- **服务发现 + 健康检查 + 多数据中心** → **Consul**：开箱即用的服务发现能力，内置健康检查和多数据中心支持。
- **大数据生态（Kafka/HBase/Hadoop）** → **ZooKeeper**：这些系统深度依赖 ZooKeeper，且生态成熟。
- **新项目通用协调服务** → 优先考虑 **etcd** 或 **Consul**，避免 ZooKeeper 的 JVM 运维负担和一次性 Watcher 问题。

> **特别注意**：三者都是 CP 系统，在发生网络分区时都会牺牲可用性。对于服务注册中心场景，建议评估 AP 型方案（如 Eureka、Nacos AP 模式）。

#### 🔬 扩展知识

【L3】Watch 机制差异决定客户端写法

::: details

ZK 一次性触发必须配合 Curator 重注册；etcd 基于 MVCC 可从指定 revision 持续 Watch，断线重连可补齐历史；Consul 长轮询需要客户端维护 index。迁移组件时最易踩坑的就是 Watch 语义差异。

:::

【L4】注册中心的 AP 替代

::: details

若选型目标是服务注册中心而非通用协调，应考虑 AP 型方案（Eureka、Nacos AP 模式）：服务发现场景下可用性优先于强一致，这与本文档『ZooKeeper 是 CP 还是 AP？』的结论相互印证。

:::

#### 🔀 发散问题

**Q：为什么 Kafka 在逐渐去 ZooKeeper 化？**
A：ZK 的单 Leader 写瓶颈、运维复杂度（JVM）与外部依赖让 Kafka 在新版 KRaft 模式中将元数据管理内置化，减少依赖并提升扩展性。

**Q：三者在网络分区时行为一致吗？**
A：都是多数派继续服务、少数派停摆，差异在于 Consul 支持 stale 读等降级读能力，可部分缓解分区时的读不可用。

## ZooKeeper 常见问题

### 【中等】ZooKeeper 如何应对脑裂问题？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 脑裂与容错

#### 💎 关键结论

ZooKeeper 通过过半机制（Quorum）从根本上避免脑裂：选举与写入提交都要求过半，而两个分区不可能同时过半，因此不可能出现双 Leader；少数派分区直接停止服务。

#### ⚡记忆卡片

- **口诀**：过半即合法，少数即停摆
- **关键词**：Quorum ／ 过半选举 ／ 过半提交 ／ 网络分区
- **链路**：网络分区 → 各分区清点节点数 → 过半分区选出 Leader 服务 → 少数分区无法过半而停摆 → 无双 Leader

#### 📖 核心知识

**脑裂（Split-Brain）** 是指集群在网络分区时，两个分区各自选举出 Leader，导致出现两个“合法”Leader 的现象。如果两个 Leader 都能处理写请求，会导致数据不一致。

1. **过半机制防脑裂**：
   - **选举过半**：Leader 选举必须获得**过半数**节点的支持。集群有 N 个节点，至少需要 `⌊N/2⌋ + 1` 个节点支持。
   - **提交过半**：写请求必须收到**过半数** Follower 的 ACK 才能提交。
   - **数学保证**：两个分区不可能同时拥有过半数节点（因为 `⌊N/2⌋ + 1 + ⌊N/2⌋ + 1 > N`），因此不可能同时出现两个合法 Leader。
2. **脑裂场景分析**：以 5 节点集群为例，发生网络分区：分区 A 有 3 个节点，分区 B 有 2 个节点。
   - **分区 A（3 节点）**：过半数（3 > 5/2），可以选出 Leader，正常提供写服务。
   - **分区 B（2 节点）**：不过半数（2 < 5/2），无法选出 Leader，停止服务。
   - 因此，ZooKeeper 不会出现真正的“双 Leader”脑裂。分区 B 会直接不可用，保证数据一致性。
3. **为什么推荐奇数节点？**（概览，详见本文档『ZooKeeper 集群为什么推荐奇数节点？』）

| 集群规模 | 容错能力      | 写性能（ACK 数） |
| :------- | :------------ | :--------------- |
| 3 节点   | 容忍 1 个故障 | 2 个 ACK         |
| 4 节点   | 容忍 1 个故障 | 3 个 ACK         |
| 5 节点   | 容忍 2 个故障 | 3 个 ACK         |
| 6 节点   | 容忍 2 个故障 | 4 个 ACK         |

   - 4 节点和 3 节点的容错能力相同（都容忍 1 个故障），但 4 节点写性能更差（需要 3 个 ACK vs 2 个）。
   - 6 节点和 5 节点的容错能力相同（都容忍 2 个故障），但 6 节点写性能更差。
   - **奇数节点在相同容错能力下，写性能更优**，因此推荐奇数部署。

#### 🔬 扩展知识

【L3】epoch 防旧 Leader 复活

::: details

分区恢复后，旧时代的 Leader 即使短暂复活也无法继续提交：新 Leader 的 epoch 已递增，Follower 只接受更高 epoch 的提案，旧 Leader 的未提交提案会在同步阶段被新 Leader 清理或覆盖，保证不出现两套已提交数据。

:::

【L4】与外部 Quorum 设备的对比

::: details

有些集群（如部分数据库 HA 方案）靠仲裁盘/见证节点凑过半，ZooKeeper 不依赖外部仲裁，纯靠投票节点计数实现过半，部署更简单但要求节点数规划合理。

:::

#### 🔀 发散问题

**Q：网络分区后少数派分区上的客户端会怎样？**
A：连接断开，若超过 sessionTimeout 未恢复则会话过期，临时节点被删、锁自动释放，客户端需重建连接并重建状态。详见本文档『ZooKeeper Session 过期会导致什么问题？如何处理？』。

### 【中等】ZooKeeper Session 过期会导致什么问题？如何处理？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 会话运维

#### 💎 关键结论

Session 过期不可逆：该会话的临时节点全部删除、所有 Watch 失效，客户端必须重建连接并重建全部状态（重注册、重建节点、重选举），业务还要用幂等兜底。

#### ⚡记忆卡片

- **口诀**：过期即毁，毁后重建
- **关键词**：Expired ／ 临时节点删除 ／ Watch 失效 ／ 状态重建 ／ 幂等
- **链路**：心跳中断超 sessionTimeout → 服务端判过期 → 临时节点删除 → 锁误释放/服务下线 → 客户端收 Expired → 重建连接与状态

#### 📖 核心知识

**Session 过期（Session Expired）是 ZooKeeper 客户端最常见的问题之一**，会导致临时节点被删除、Watch 丢失、连接重连等一系列连锁反应。

1. **触发条件**：
   - 客户端在 `sessionTimeout` 时间内未发送心跳（网络故障、GC 停顿、应用假死等）。
   - 服务端在 `sessionTimeout` 时间内未收到客户端任何请求。
   - 注意：服务端的实际 sessionTimeout 会与客户端协商，取客户端请求值和服务端配置范围的交集。
2. **过期后果**：
   - **临时节点全部删除**：该 Session 创建的所有临时节点（EPHEMERAL）会被 ZooKeeper 自动删除，导致：基于临时节点的分布式锁**自动释放**；基于临时节点的服务注册信息**自动下线**；Master 选举的 Leader 节点**自动失去 Leader 身份**。
   - **所有 Watch 失效**：Session 关闭后，之前注册的所有 Watcher 都会失效，客户端无法再收到任何节点变更通知。
   - **连接状态变更**：客户端会收到 `Expired` 状态事件。
3. **处理策略**：
   - **重建连接**：客户端收到 `Expired` 事件后，必须创建新的 ZooKeeper 连接（不能复用旧连接）。
   - **重建状态**：重新注册所有需要的 Watcher；重新创建必要的临时节点（如重新注册服务、重新获取分布式锁）；重新执行 Master 选举。
   - **使用 Curator ConnectionStateListener**：

```java
curator.getConnectionStateListenable().addListener((client, newState) -> {
    if (newState == ConnectionState.LOST) {
        // Session 过期，需要重建状态
        // 1. 释放本地持有的资源
        // 2. 重新创建临时节点
        // 3. 重新注册 Watcher
    } else if (newState == ConnectionState.RECONNECTED) {
        // 重连成功，恢复状态
    }
});
```

   - **避免 GC 停顿**：合理配置 JVM，避免长时间 Full GC 导致心跳超时。必要时增大 `sessionTimeout`。
   - **业务幂等**：Session 过期可能导致分布式锁被误释放，业务逻辑需保证幂等性，防止并发问题。

#### 🔬 扩展知识

【L3】过期与断开的区别

::: details

短暂断开但会话未过期时，重连后临时节点与 Watch 仍然有效；只有超过 sessionTimeout 未收到心跳才判过期，过期后一切不可恢复。长 GC 停顿是最隐蔽的过期诱因，因为它既停心跳也停业务逻辑。

:::

【L4】超时时间的生效范围

::: details

客户端配置的 sessionTimeout 会被服务端限制在 `2 × tickTime ~ 20 × tickTime` 范围内（tickTime 默认 2000ms），超出范围的值会被自动收紧或放宽，排查过期问题时先确认实际生效值。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "Session 过期后重连就能恢复原来的会话和临时节点" → 错。过期不可逆，会话及其临时节点已被清理，只能新建会话并重建全部状态。
- ❌ "锁被 ZK 自动释放就安全了" → 不完全。若业务仍在执行而锁已因过期释放，可能出现并发双写，需靠幂等或 fencing 校验兜底。

:::

#### 🔀 发散问题

**Q：Session 的四个属性和分桶管理是怎么回事？**
A：会话有 sessionID、TimeOut、TickTime、isClosing 四个属性，SessionTracker 用分桶策略按下次超时时间归类管理。详见本文档『ZooKeeper 会话机制是怎样的？』。

**Q：过期后 Watch 怎么办？**
A：全部失效，需重建连接后重新注册，这正是 Watch 丢失问题的主要来源之一。详见本文档『ZooKeeper 的 Watch 丢失问题是什么？如何解决？』。

### 【中等】ZooKeeper 的 Watch 丢失问题是什么？如何解决？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / Watch 机制

#### 💎 关键结论

Watch 丢失源于两大先天缺陷：一次性触发存在重注册窗口、断开重连不自动恢复 Watch；对策是 Curator Cache 自动重注册、版本号对比、定时拉取兜底、避免慢回调。

#### ⚡记忆卡片

- **口诀**：一次性触发、重连不恢复、拉取兜底
- **关键词**：一次性触发 ／ 重注册窗口 ／ 重连 ／ CuratorCache ／ 定时对账
- **链路**：Watcher 触发即移除 → 窗口期内再变更 → 通知丢失 → 靠定时全量拉取补偿

#### 📖 核心知识

**Watch 丢失（Watch Lost）是 ZooKeeper 原生 Watcher 机制最严重的问题之一**，指客户端注册的 Watcher 在某些情况下未能触发或丢失。

1. **典型场景**：
   - **一次性触发导致丢失**：客户端注册 Watcher 监听节点 A；节点 A 变化触发通知；客户端在**重新注册 Watcher 之前**，节点 A 又发生变化，这次变化**不会**通知客户端（Watcher 已被移除）。
   - **Session 重连导致丢失**：客户端断开重连后，原有的 Watcher **不会自动恢复**，若未主动重新注册，Watch 丢失。
   - **并发竞争**：多个客户端同时监听同一节点，在重新注册窗口期内发生的变更会丢失。
2. **解决方案**：
   - **使用 Curator Cache**：Curator 的 `CuratorCache`（5.x 统一了 NodeCache/PathChildrenCache/TreeCache）内部自动重新注册 Watcher，并处理重连后的状态恢复。**生产环境强烈推荐使用 Curator，而非原生 ZooKeeper API**。
   - **重新注册时对比版本号**：在收到 Watch 通知后，先读取数据并记录 `version`，重新注册 Watcher 时如果发现 `version` 已变化，说明在重新注册窗口期有新变更，需要再次处理。
   - **定时全量拉取兜底**：除 Watcher 外额外增加定时全量拉取机制（如每 30s 拉取一次），作为 Watch 丢失的兜底补偿。
   - **避免回调耗时操作**：Watcher 回调是串行执行的，耗时操作会延迟后续 Watcher 的触发，增加丢失风险。

#### 🔬 扩展知识

【L3】Curator 为什么能解决丢失

::: details

CuratorCache 内部把“触发→重注册”封装成循环，并在重连后自动恢复监听状态，等于把一次性触发的复杂度收敛在框架内部；业务代码只需处理节点变更事件，不再关心 Watch 生命周期。

:::

【L4】兜底的终极思路：推 + 拉

::: details

推送负责低延迟，拉取负责正确性：叠加 30~60s 的定时全量拉取对账，即可把任何 Watch 丢失的影响窗口封顶在分钟级以内，这是对“推送必然可能丢”的工程化接受。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "Watcher 断线重连后会自动恢复" → 错。原生 API 不会自动恢复，需手动重注册；只有 CuratorCache 等封装才自动处理。
- ❌ "用了 Watch 就一定能最终感知到变更" → 不保证。重注册窗口、断开期间的变更都可能丢，必须用定时拉取兜底。

:::

#### 🔀 发散问题

**Q：一次性触发是设计缺陷还是权衡？**
A：是权衡：服务端不维护长期监听状态保持轻量，把重注册复杂度推给客户端，详见本文档『ZooKeeper 监听机制是怎样的？』的扩展知识。

**Q：Session 过期导致的 Watch 失效怎么恢复？**
A：必须重建连接并重新注册全部 Watcher，详见本文档『ZooKeeper Session 过期会导致什么问题？如何处理？』。

### 【中等】ZooKeeper 集群为什么推荐奇数节点？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 部署实践

#### 💎 关键结论

奇数部署的核心原因：相同容错能力下，奇数节点需要的 ACK 更少、写性能更好，还能避免分区时两边票数相等；偶数节点多花一台机器却不提升容错。

#### ⚡记忆卡片

- **口诀**：同样容错，奇数更省
- **关键词**：过半 ／ ACK ／ 容错数 ／ 2-2 分区
- **链路**：N 节点容忍 ⌊(N-1)/2⌋ 故障 → 偶数与前一奇数容错相同 → 却要多一个 ACK → 奇数更划算

#### 📖 核心知识

**ZooKeeper 集群推荐部署奇数节点（3、5、7、9），而不是偶数节点**，主要原因有三点：

1. **相同容错能力下，奇数节点写性能更优**：ZooKeeper 写请求需要过半数节点 ACK。对比：
   - **3 节点**：容忍 1 个故障，需要 2 个 ACK
   - **4 节点**：容忍 1 个故障，需要 3 个 ACK ← 与 3 节点容错相同，但 ACK 更多
   - **5 节点**：容忍 2 个故障，需要 3 个 ACK
   - **6 节点**：容忍 2 个故障，需要 4 个 ACK ← 与 5 节点容错相同，但 ACK 更多

   奇数节点在相同容错能力下，写请求需要的 ACK 更少，性能更好。
2. **避免脑裂风险**：偶数节点在网络分区时，可能出现“两边票数相等”的情况（如 4 节点分成 2-2），无法选出 Leader，集群不可用。奇数节点必然有一方过半，能选出 Leader。
3. **成本优化**：对于给定的容错需求，奇数节点需要的机器更少：需要容忍 1 个故障：3 节点 vs 4 节点 → 节省 1 台；需要容忍 2 个故障：5 节点 vs 6 节点 → 节省 1 台。
4. **常见部署规模**：
   - **开发/测试**：3 节点（容忍 1 个故障）
   - **生产中小规模**：5 节点（容忍 2 个故障）
   - **生产大规模**：7 节点（容忍 3 个故障）

#### 🔬 扩展知识

【L3】容错数公式

::: details

N 个节点可容忍 ⌊(N-1)/2⌋ 个故障：3→1、5→2、7→3、9→4。推导依据是存活节点必须过半（≥ ⌊N/2⌋ + 1）才能继续选举与提交。

:::

【L4】节点数不是越多越好

::: details

节点越多，每次提交需要的 ACK 越多、广播链路越长，写延迟上升；且单 Leader 吞吐有限，超大规模应拆多集群而非无限加节点，读压力可用 Observer 分担。

:::

#### 🔀 发散问题

**Q：过半机制还防住了什么问题？**
A：防住了脑裂：两个分区不可能同时过半，不会出现双 Leader。详见本文档『ZooKeeper 如何应对脑裂问题？』。

### 【中等】ZooKeeper 的典型应用场景有哪些？如何实现分布式锁？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：ZooKeeper / 分布式锁

#### 💎 关键结论

ZooKeeper 分布式锁的标准姿势是「临时顺序节点 + Watch 前一个节点」：序号最小者持锁，只监听前驱而非父目录以避免羊群效应，会话过期自动删节点防死锁。

#### ⚡记忆卡片

- **口诀**：顺序排队，前驱唤醒
- **关键词**：临时顺序节点 ／ 最小者得锁 ／ Watch 前驱 ／ 羊群效应 ／ Curator
- **链路**：创建临时顺序节点 → 判断是否最小 → 是则得锁／否则 Watch 前驱 → 前驱删除被唤醒 → 得锁 → 删己节点释放

#### 📖 核心知识

ZooKeeper 的典型应用场景（发布订阅、命名服务、配置管理、分布式锁、集群管理、Master 选举、队列管理）在[简介部分](#zookeeper-简介)已有介绍，这里重点说明分布式锁的实现方案。

1. **排他锁（Exclusive Lock）的标准实现**：使用“临时顺序节点 + Watch 前一个节点”实现，避免羊群效应（Herd Effect）：
   1. 客户端在 `/lock` 节点下创建临时顺序节点 `/lock/seq-00000001`。
   2. 客户端获取 `/lock` 下所有子节点，判断自己是否是序号最小的节点：**是**则获取锁，执行业务逻辑；**否**则监听**比自己序号小 1 的前一个节点**（而非监听所有节点），等待前一个节点删除事件。
   3. 前一个节点释放锁（删除自己），客户端收到 Watch 通知，再次检查自己是否是最小节点，如果是则获取锁。
   4. 客户端执行完业务后，删除自己的节点释放锁。
   5. 如果客户端 Session 过期，临时节点自动删除，锁自动释放，避免死锁。

```
/lock
  ├── seq-00000001  ← 获得锁（最小节点）
  ├── seq-00000002  ← Watch seq-00000001
  └── seq-00000003  ← Watch seq-00000002
```

2. **为什么监听前一个节点而不是所有节点？** 如果所有客户端都监听 `/lock` 的子节点变化，当锁释放时，**所有等待的客户端都会被唤醒并竞争**，这就是“羊群效应”（Herd Effect），会对 ZooKeeper 造成巨大压力，且只有一个客户端能成功，其余再次阻塞。监听前一个节点，形成**链式唤醒**，每次只有一个客户端被唤醒，效率更高。
3. **共享锁（读写锁）的实现**：
   - **读锁**：创建临时顺序节点 `/lock/read-`，检查是否**没有序号更小的 write 节点**，是则获取读锁。
   - **写锁**：创建临时顺序节点 `/lock/write-`，检查是否是**最小节点**，是则获取写锁。
   - **释放**：删除自己的节点。
4. **Curator InterProcessMutex**：生产环境推荐使用 Curator 封装好的分布式锁：

```java
InterProcessMutex lock = new InterProcessMutex(client, "/lock");
try {
    if (lock.acquire(5, TimeUnit.SECONDS)) {
        // 获取锁成功，执行业务逻辑
    }
} finally {
    lock.release();
}
```

Curator 的 `InterProcessMutex` 是可重入锁，内部实现了上述标准算法，并处理了 Session 重连等边界情况。

#### 🔬 扩展知识

【L3】与 Redis 分布式锁的对比

::: details

ZK 锁靠临时节点自动释放 + 顺序保证公平，可靠性高、无“锁过期但业务未完”的典型难题，但吞吐与延迟逊于 Redis；Redis 锁性能高，但需额外处理锁续期（watchdog）与主从切换丢锁问题。低频强协调选 ZK，高频临界区选 Redis。

:::

【L4】公平性与可重入

::: details

顺序节点天然形成公平排队，不会饿死等待者；Curator InterProcessMutex 在此基础上支持同线程可重入，并处理了重连、会话失效等边界情况，手写实现很容易遗漏这些细节。

:::

#### 🔀 发散问题

**Q：锁持有者宕机了怎么办？**
A：其会话超时后临时节点自动删除，下一个等待者被链式唤醒，天然避免死锁；但要注意业务幂等，防止锁被提前释放引发并发问题。

**Q：为什么不用 getChildren 监听父目录？**
A：会引发羊群效应，每次释放锁唤醒全部等待者，对服务端造成 O(N) 压力，链式 Watch 前驱每次只唤醒一个。

## 参考资料

- [ZooKeeper 官方文档](https://cwiki.apache.org/confluence/display/ZOOKEEPER)
- [《Hadoop 权威指南（第四版）》](https://book.douban.com/subject/27115351/)
- [《从 Paxos 到 Zookeeper 分布式一致性原理与实践》](https://item.jd.com/11622772.html)
- [详解分布式协调服务 ZooKeeper](https://draveness.me/zookeeper-chubby)


