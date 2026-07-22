---
title: 深入剖析共识性算法 Paxos
cover: https://raw.githubusercontent.com/dunwu/images/master/archive/2023/10/eba86cbf98354c65b6de63ff0304ca0c.png
date: 2020-02-02 22:00:00
categories:
  - 分布式
  - 分布式理论
tags:
  - 分布式
  - 算法
  - 共识
  - Paxos
permalink: /pages/a22fc1e4/
---

# 深入剖析共识性算法 Paxos

> **Paxos 是一种基于消息传递且具有容错性的共识性（consensus）算法**。
>
> **Paxos 算法解决了分布式一致性问题**：在一个节点数为 `2N+1` 的分布式集群中，只要半数以上的节点（`N + 1`）还正常工作，整个系统仍可以正常工作。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/c881007e302744b2b9e014b9541a8000.png)

## Paxos 背景

Paxos 是 Leslie Lamport 于 1990 年提出的一种基于消息传递且具有高度容错特性的**共识（consensus）算法**。

为描述 Paxos 算法，Lamport 虚拟了一个叫做 Paxos 的希腊城邦，这个岛按照议会民主制的政治模式制订法律，但是没有人愿意将自己的全部时间和精力放在这种事情上。所以无论是议员，议长或者传递纸条的服务员都不能承诺别人需要时一定会出现，也无法承诺批准决议或者传递消息的时间。

Paxos 算法解决的问题正是分布式共识性问题，即一个分布式系统中的各个节点如何就某个值（决议）达成一致。

Paxos 算法运行在允许宕机故障的异步系统中，不要求可靠的消息传递，可容忍消息丢失、延迟、乱序以及重复。它利用大多数 (Majority) 机制保证了一定的容错能力，即 `N` 个节点的系统最多允许 `N / 2 - 1` 个节点同时出现故障。

Paxos 算法包含 2 个部分：

- **Basic Paxos 算法**：描述的多节点之间如何就某个值达成共识。
- **Multi Paxos 思想**：描述的是执行多个 Basic Paxos 实例，就一系列值达成共识。

## Basic Paxos 算法

### 角色

Paxos 将分布式系统中的节点分 Proposer、Acceptor、Learner 三种角色。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2021/05/16a841866ecc4612ace4c507177f7bf4.png)

- **提议者（Proposer）**：发出提案（Proposal），用于投票表决。Proposal 信息包括提案编号 (Proposal ID) 和提议的值 (Value)。在绝大多数场景中，集群中收到客户端请求的节点，才是提议者。这样做的好处是，对业务代码没有入侵性，也就是说，我们不需要在业务代码中实现算法逻辑。
- **接受者（Acceptor）**：对每个 Proposal 进行投票，若 Proposal 获得多数 Acceptor 的接受，则称该 Proposal 被批准。一般来说，集群中的所有节点都在扮演接受者的角色，参与共识协商，并接受和存储数据。
- **学习者（Learner）**：不参与接受，从 Proposers/Acceptors 学习、记录最新达成共识的提案（Value）。一般来说，学习者是数据备份节点，比如主从架构中的从节点，被动地接受数据，容灾备份。

在多副本状态机中，每个副本都同时具有 Proposer、Acceptor、Learner 三种角色。

这三种角色，在本质上代表的是三种功能：

- 提议者代表的是接入和协调功能，收到客户端请求后，发起二阶段提交，进行共识协商；
- 接受者代表投票协商和存储数据，对提议的值进行投票，并接受达成共识的值，存储保存；
- 学习者代表存储数据，不参与共识协商，只接受达成共识的值，存储保存。

### 算法

Paxos 算法有 3 个阶段，其中，前 2 个阶段负责协商并达成共识：

1. **准备（Prepare）阶段**：Proposer 向 Acceptors 发出 Prepare 请求，Acceptors 针对收到的 Prepare 请求进行 Promise 承诺。
2. **接受（Accept）阶段**：Proposer 收到多数 Acceptors 承诺的 Promise 后，向 Acceptors 发出 Propose 请求，Acceptors 针对收到的 Propose 请求进行 Accept 处理。
3. **学习（Learn）阶段**：Proposer 在收到多数 Acceptors 的 Accept 之后，标志着本次 Accept 成功，决议形成，将形成的决议发送给所有 Learners。

看到这里，了解过分布式事务的读者，想必会觉得眼熟：这不就是两阶段提交嘛！没错，这里采用的正式两阶段提交的思想。两阶段提交是达成共识的常用方式。

Paxos 算法流程中的每条消息描述如下：

- **Prepare**: Proposer 生成全局唯一且递增的 Proposal ID (可使用时间戳加 Server ID)，向所有 Acceptors 发送 Prepare 请求，这里无需携带提案内容，只携带 Proposal ID 即可。
- **Promise**: Acceptors 收到 Prepare 请求后，做出“两个承诺，一个应答”。
  - 两个承诺：
    - 不再接受 Proposal ID 小于等于当前请求的 Prepare 请求。
    - 不再接受 Proposal ID 小于当前请求的 Propose 请求。
  - 一个应答：
    - 不违背以前作出的承诺下，回复已经 Accept 过的提案中 Proposal ID 最大的那个提案的 Value 和 Proposal ID，没有则返回空值。
- **Propose**: Proposer 收到多数 Acceptors 的 Promise 应答后，从应答中选择 Proposal ID 最大的提案的 Value，作为本次要发起的提案。如果所有应答的提案 Value 均为空值，则可以自己随意决定提案 Value。然后携带当前 Proposal ID，向所有 Acceptors 发送 Propose 请求。
- **Accept**: Acceptor 收到 Propose 请求后，在不违背自己之前作出的承诺下，接受并持久化当前 Proposal ID 和提案 Value。
- **Learn**: Proposer 收到多数 Acceptors 的 Accept 后，决议形成，将形成的决议发送给所有 Learners。

### Prepare 阶段

在准备请求中是不需要指定提议的值的，只需要携带提案编号就可以了。

下图的示例中，首先客户端 1、2 作为提议者，分别向所有接受者发送包含提案编号的准备请求：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/72d93f095bc3422a9e311b67938e9071.png)

接着，当节点 A、B 收到提案编号为 1 的准备请求，节点 C 收到提案编号为 5 的准备请求后，将进行这样的处理：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/ff46adbf7de945bbbac5c8ca61c49328.png)

- 由于之前没有通过任何提案，所以节点 A、B 将返回一个 “尚无提案” 的响应。也就是说节点 A 和 B 在告诉提议者，我之前没有通过任何提案呢，并承诺以后不再响应提案编号小于等于 1 的准备请求，不会通过编号小于 1 的提案。
- 节点 C 也是如此，它将返回一个 “尚无提案”的响应，并承诺以后不再响应提案编号小于等于 5 的准备请求，不会通过编号小于 5 的提案。

另外，当节点 A、B 收到提案编号为 5 的准备请求，和节点 C 收到提案编号为 1 的准备请求的时候，将进行这样的处理过程：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/5572085bbfb842ceb6cb5db1501b7ccb.png)

- 当节点 A、B 收到提案编号为 5 的准备请求的时候，因为提案编号 5 大于它们之前响应的准备请求的提案编号 1，而且两个节点都没有通过任何提案，所以它将返回一个 “尚无提案”的响应，并承诺以后不再响应提案编号小于等于 5 的准备请求，不会通过编号小于 5 的提案。

- 当节点 C 收到提案编号为 1 的准备请求的时候，由于提案编号 1 小于它之前响应的准备请求的提案编号 5，所以丢弃该准备请求，不做响应。

### Accept 阶段

首先客户端 1、2 在收到大多数节点的准备响应之后，会分别发送接受请求：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/1b2534d957354bcd80219a4134a55d8b.png)

- 当客户端 1 收到大多数的接受者（节点 A、B）的准备响应后，根据响应中提案编号最大的提案的值，设置接受请求中的值。因为该值在来自节点 A、B 的准备响应中都为空（也就是图 5 中的“尚无提案”），所以就把自己的提议值 3 作为提案的值，发送接受请求[1, 3]。

- 当客户端 2 收到大多数的接受者的准备响应后（节点 A、B 和节点 C），根据响应中提案编号最大的提案的值，来设置接受请求中的值。因为该值在来自节点 A、B、C 的准备响应中都为空（也就是图 5 和图 6 中的“尚无提案”），所以就把自己的提议值 7 作为提案的值，发送接受请求[5, 7]。

当三个节点收到 2 个客户端的接受请求时，会进行这样的处理：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/cc2ebbf8a81a449797c2a962258dbf9a.png)

- 当节点 A、B、C 收到接受请求[1, 3]的时候，由于提案的提案编号 1 小于三个节点承诺能通过的提案的最小提案编号 5，所以提案[1, 3]将被拒绝。
- 当节点 A、B、C 收到接受请求[5, 7]的时候，由于提案的提案编号 5 不小于三个节点承诺能通过的提案的最小提案编号 5，所以就通过提案[5, 7]，也就是接受了值 7，三个节点就 X 值为 7 达成了共识。

### 小结

Basic Paxos 是通过二阶段提交的方式来达成共识的。

除了共识，Basic Paxos 还实现了容错，在少于一半的节点出现故障时，集群也能工作。它不像分布式事务算法那样，必须要所有节点都同意后才提交操作，因为“所有节点都同意”这个原则，在出现节点故障的时候会导致整个集群不可用。也就是说，“大多数节点都同意”的原则，赋予了 Basic Paxos 容错的能力，让它能够容忍少于一半的节点的故障。

本质上而言，提案编号的大小代表着优先级，你可以这么理解，根据提案编号的大小，接受者保证三个承诺，具体来说：

- 如果准备请求的提案编号，小于等于接受者已经响应的准备请求的提案编号，那么接受者将承诺不响应这个准备请求；
- 如果接受请求中的提案的提案编号，小于接受者已经响应的准备请求的提案编号，那么接受者将承诺不通过这个提案；
- 如果接受者之前有通过提案，那么接受者将承诺，会在准备请求的响应中，包含已经通过的最大编号的提案信息。

## Multi Paxos 思想

兰伯特提到的 Multi-Paxos 是一种思想，不是算法。而 Multi-Paxos 算法是一个统称，它是指基于 Multi-Paxos 思想，通过多个 Basic Paxos 实例实现一系列值的共识的算法（比如 Chubby 的 Multi-Paxos 实现、Raft 算法等）。

### Basic Paxos 的问题

Basic Paxos 有以下问题，导致它不能应用于实际：

- **Basic Paxos 算法只能对一个值形成决议**。
- **Basic Paxos 算法会消耗大量网络带宽**。Basic Paxos 中，决议的形成至少需要两次网络通信，在高并发情况下可能需要更多的网络通信，极端情况下甚至可能形成活锁。如果想连续确定多个值，Basic Paxos 搞不定了。

### Multi Paxos 的改进

Multi Paxos 正是为解决以上问题而提出。Multi Paxos 基于 Basic Paxos 做了两点改进：

- **针对每一个要确定的值，运行一次 Paxos 算法实例（Instance），形成决议**。每一个 Paxos 实例使用唯一的 Instance ID 标识。
- **在所有 Proposer 中选举一个 Leader，由 Leader 唯一地提交 Proposal 给 Acceptor 进行表决**。这样没有 Proposer 竞争，解决了活锁问题。在系统中仅有一个 Leader 进行 Value 提交的情况下，Prepare 阶段就可以跳过，从而将两阶段变为一阶段，提高效率。

Multi Paxos 首先需要选举 Leader，Leader 的确定也是一次决议的形成，所以可执行一次 Basic Paxos 实例来选举出一个 Leader。选出 Leader 之后只能由 Leader 提交 Proposal，在 Leader 宕机之后服务临时不可用，需要重新选举 Leader 继续服务。在系统中仅有一个 Leader 进行 Proposal 提交的情况下，Prepare 阶段可以跳过。

Multi Paxos 通过改变 Prepare 阶段的作用范围至后面 Leader 提交的所有实例，从而使得 Leader 的连续提交只需要执行一次 Prepare 阶段，后续只需要执行 Accept 阶段，将两阶段变为一阶段，提高了效率。为了区分连续提交的多个实例，每个实例使用一个 Instance ID 标识，Instance ID 由 Leader 本地递增生成即可。

Multi Paxos 允许有多个自认为是 Leader 的节点并发提交 Proposal 而不影响其安全性，这样的场景即退化为 Basic Paxos。

Chubby 和 Boxwood 均使用 Multi Paxos。ZooKeeper 使用的 Zab 也是 Multi Paxos 的变形。

## 特性

Paxos 算法具有以下核心特性：

| 特性 | 说明 |
| --- | --- |
| **容错性** | 在 `2N+1` 个节点的集群中，容忍最多 `N` 个节点同时故障，只要多数节点存活即可正常工作 |
| **一致性** | 保证被批准的提案值是唯一的，不会出现不同节点达成不同决议的情况 |
| **可用性** | 只要多数节点能够相互通信，系统就能继续对外提供服务 |
| **异步性** | 算法运行在异步系统中，不依赖消息传递的时限，可容忍消息丢失、延迟、乱序和重复 |
| **安全性** | 只有被提出的值才可能被选中，且最终所有节点学习的值都是同一个 |
| **活锁风险** | 在多个 Proposer 竞争时，可能出现活锁（通过 Leader 选举解决） |

### 安全性属性

Paxos 算法保证以下两个安全性属性：

- **决议一致性（Consistency）**：永远不会选定两个不同的值。
- **决议活性（Liveness）**：如果持续有提案被提出，最终一定会有提案被选定。

### 与其他算法对比

| 算法 | 难度 | 性能 | Leader | 适用场景 |
| --- | --- | --- | --- | --- |
| **Basic Paxos** | 难 | 低（两阶段） | 无 | 理论研究 |
| **Multi Paxos** | 较难 | 高（一阶段） | 有 | 通用分布式系统 |
| **Raft** | 易 | 高 | 有 | 工程实践首选 |
| **Zab** | 中 | 高 | 有 | ZooKeeper |

## 应用场景

Paxos 算法及其变体广泛应用于需要强一致性的分布式系统中：

### 1. 分布式锁服务

Google Chubby 使用 Multi Paxos 实现，提供分布式锁服务和少量数据存储，用于实现主节点选举和元数据存储。Chubby 的设计目标是提供粗粒度的锁服务，客户端持有锁的时间较长，减少锁竞争的频率。

### 2. 分布式数据库

- **Google Spanner**：使用 Multi Paxos 的变体实现跨数据中心的副本同步，保证数据的强一致性。
- **OceanBase**：阿里巴巴的分布式数据库，使用 Multi Paxos 实现数据副本的一致性。
- **Tephra**：Apache Phoenix 的事务层使用 Paxos 相关思想。

### 3. 分布式存储系统

- **Boxwood**：使用 Multi Paxos 管理分布式锁和元数据。
- **Ceph**：其 MON（Monitor）模块使用 Paxos 变体实现集群映射的一致性。

### 4. 配置中心和元数据管理

- **etcd**（Raft，Paxos 变体）：用于服务发现和配置管理。
- **ZooKeeper**（Zab，Paxos 变体）：用于分布式协调服务。

### 5. 分布式消息队列

部分高可靠消息队列系统使用 Paxos 算法保证消息的顺序性和一致性，确保消息不丢失、不重复。

## 最佳实践

### 案例 1：基于 Multi Paxos 实现简单的分布式 KV 存储

以下示例展示了 Multi Paxos 的核心思想实现，包含 Leader 选举和日志复制：

```java
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Multi Paxos 算法核心实现示例
 * 演示 Leader 选举和日志复制的基本流程
 */
public class MultiPaxosExample {

    // 提案编号生成器
    private final AtomicLong proposalIdGenerator = new AtomicLong(0);
    // 当前 Leader 节点 ID
    private volatile String currentLeader;
    // 当前节点 ID
    private final String nodeId;
    // 已提交的日志条目
    private final List<LogEntry> committedLog = new CopyOnWriteArrayList<>();
    // Acceptor 状态：已承诺的最大提案编号
    private volatile long promisedProposalId = 0;
    // Acceptor 状态：已接受的最大提案
    private AcceptedProposal acceptedProposal = null;

    public MultiPaxosExample(String nodeId) {
        this.nodeId = nodeId;
    }

    /**
     * 日志条目
     */
    public static class LogEntry {
        private final long index;
        private final long term;
        private final String command;

        public LogEntry(long index, long term, String command) {
            this.index = index;
            this.term = term;
            this.command = command;
        }

        public long getIndex() { return index; }
        public long getTerm() { return term; }
        public String getCommand() { return command; }

        @Override
        public String toString() {
            return String.format("LogEntry{index=%d, term=%d, command='%s'}", index, term, command);
        }
    }

    /**
     * 已接受的提案
     */
    private static class AcceptedProposal {
        final long proposalId;
        final String value;

        AcceptedProposal(long proposalId, String value) {
            this.proposalId = proposalId;
            this.value = value;
        }
    }

    /**
     * Prepare 阶段：Proposer 向 Acceptor 发送 Prepare 请求
     * 在 Multi Paxos 中，Leader 选出后此阶段可跳过
     */
    public boolean prepare(long proposalId, List<MultiPaxosExample> acceptors) {
        int promiseCount = 0;
        int majority = acceptors.size() / 2 + 1;

        for (MultiPaxosExample acceptor : acceptors) {
            PromiseResponse response = acceptor.handlePrepare(proposalId);
            if (response.isPromised()) {
                promiseCount++;
            }
        }
        return promiseCount >= majority;
    }

    /**
     * Acceptor 处理 Prepare 请求
     */
    public synchronized PromiseResponse handlePrepare(long proposalId) {
        if (proposalId > this.promisedProposalId) {
            this.promisedProposalId = proposalId;
            return new PromiseResponse(true, this.acceptedProposal);
        }
        return new PromiseResponse(false, null);
    }

    /**
     * Accept 阶段：Proposer 向 Acceptor 发送 Accept 请求
     */
    public boolean accept(long proposalId, String value, List<MultiPaxosExample> acceptors) {
        int acceptCount = 0;
        int majority = acceptors.size() / 2 + 1;

        for (MultiPaxosExample acceptor : acceptors) {
            if (acceptor.handleAccept(proposalId, value)) {
                acceptCount++;
            }
        }

        if (acceptCount >= majority) {
            // 决议形成，提交日志
            long logIndex = committedLog.size();
            committedLog.add(new LogEntry(logIndex, proposalId, value));
            System.out.println("[" + nodeId + "] 提案已提交: " + value);
            return true;
        }
        return false;
    }

    /**
     * Acceptor 处理 Accept 请求
     */
    public synchronized boolean handleAccept(long proposalId, String value) {
        if (proposalId >= this.promisedProposalId) {
            this.promisedProposalId = proposalId;
            this.acceptedProposal = new AcceptedProposal(proposalId, value);
            return true;
        }
        return false;
    }

    /**
     * Leader 提交提案（一阶段提交，跳过 Prepare）
     */
    public boolean proposeAsLeader(String value, List<MultiPaxosExample> cluster) {
        long proposalId = proposalIdGenerator.incrementAndGet();
        // Multi Paxos 优化：Leader 已建立权威，直接进入 Accept 阶段
        return accept(proposalId, value, cluster);
    }

    public String getNodeId() { return nodeId; }
    public List<LogEntry> getCommittedLog() { return committedLog; }

    /**
     * Promise 响应
     */
    public static class PromiseResponse {
        private final boolean promised;
        private final AcceptedProposal acceptedProposal;

        public PromiseResponse(boolean promised, AcceptedProposal acceptedProposal) {
            this.promised = promised;
            this.acceptedProposal = acceptedProposal;
        }

        public boolean isPromised() { return promised; }
        public AcceptedProposal getAcceptedProposal() { return acceptedProposal; }
    }

    public static void main(String[] args) {
        // 创建 3 节点集群
        List<MultiPaxosExample> cluster = Arrays.asList(
            new MultiPaxosExample("node-1"),
            new MultiPaxosExample("node-2"),
            new MultiPaxosExample("node-3")
        );

        MultiPaxosExample leader = cluster.get(0);
        System.out.println("Leader: " + leader.getNodeId());

        // Leader 提交多个提案
        leader.proposeAsLeader("SET key1 value1", cluster);
        leader.proposeAsLeader("SET key2 value2", cluster);
        leader.proposeAsLeader("DELETE key1", cluster);

        // 打印所有节点的日志
        for (MultiPaxosExample node : cluster) {
            System.out.println("节点 " + node.getNodeId() + " 的日志:");
            for (LogEntry entry : node.getCommittedLog()) {
                System.out.println("  " + entry);
            }
        }
    }
}
```

### 案例 2：Paxos 集群部署配置示例

以下是基于 ZooKeeper（Zab 协议，Paxos 变体）的集群部署配置示例：

```properties
# zoo.cfg - ZooKeeper 集群配置文件

# 基本配置
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/data/zookeeper/data
dataLogDir=/data/zookeeper/logs
clientPort=2181

# 集群节点配置
# 格式：server.<myid>=<host>:<leader-election-port>:<quorum-port>
server.1=zookeeper-node1:2888:3888
server.2=zookeeper-node2:2888:3888
server.3=zookeeper-node3:2888:3888

# 自动清理配置
autopurge.snapRetainCount=3
autopurge.purgeInterval=1

# 监控配置
metricsProvider.className=org.apache.zookeeper.metrics.prometheus.PrometheusMetricsProvider
metricsProvider.httpPort=7000
metricsProvider.exportJvmInfo=true
```

每个节点的 `myid` 文件配置：

```bash
# 在 node1 上执行
echo "1" > /data/zookeeper/data/myid

# 在 node2 上执行
echo "2" > /data/zookeeper/data/myid

# 在 node3 上执行
echo "3" > /data/zookeeper/data/myid
```

### 案例 3：使用 Curator 客户端操作 Paxos（ZooKeeper）集群

```java
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.leader.LeaderSelector;
import org.apache.curator.framework.recipes.leader.LeaderSelectorListener;
import org.apache.curator.framework.state.ConnectionState;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.zookeeper.CreateMode;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * 使用 Apache Curator 操作 ZooKeeper 集群
 * 演示 Leader 选举和分布式锁
 */
public class ZooKeeperPaxosExample {

    private static final String ZK_CONNECT_STRING =
        "zookeeper-node1:2181,zookeeper-node2:2181,zookeeper-node3:2181";

    public static void main(String[] args) throws Exception {
        // 创建 Curator 客户端
        CuratorFramework client = CuratorFrameworkFactory.builder()
            .connectString(ZK_CONNECT_STRING)
            .sessionTimeoutMs(5000)
            .connectionTimeoutMs(3000)
            .retryPolicy(new ExponentialBackoffRetry(1000, 3))
            .namespace("paxos-demo")
            .build();

        client.start();

        // 1. 创建持久节点作为父节点
        if (client.checkExists().forPath("/config") == null) {
            client.create().creatingParentsIfNeeded()
                .forPath("/config");
        }

        // 2. 写入配置数据（通过 Zab 协议保证一致性）
        client.create()
            .creatingParentsIfNeeded()
            .withMode(CreateMode.PERSISTENT)
            .forPath("/config/database-url", "jdbc:mysql://db-host:3306/mydb".getBytes());

        // 3. 读取配置数据
        byte[] data = client.getData().forPath("/config/database-url");
        System.out.println("读取到配置: " + new String(data));

        // 4. Leader 选举示例
        String leaderPath = "/leader-election";
        CountDownLatch latch = new CountDownLatch(1);

        LeaderSelectorListener listener = new LeaderSelectorListener() {
            @Override
            public void takeLeadership(CuratorFramework client) throws Exception {
                System.out.println("当前节点被选为 Leader！");
                // 作为 Leader 执行业务逻辑
                try {
                    TimeUnit.SECONDS.sleep(5);
                } finally {
                    System.out.println("释放 Leader 身份");
                }
            }

            @Override
            public void stateChanged(CuratorFramework client, ConnectionState newState) {
                // 处理连接状态变化
            }
        };

        LeaderSelector selector = new LeaderSelector(client, leaderPath, listener);
        selector.autoRequeue();  // 失去 Leadership 后自动重新排队
        selector.start();

        latch.await(30, TimeUnit.SECONDS);

        client.close();
    }
}
```

Maven 依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>5.5.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
        <version>5.5.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.zookeeper</groupId>
        <artifactId>zookeeper</artifactId>
        <version>3.8.1</version>
    </dependency>
</dependencies>
```

## 常见问题

### 问题 1：活锁（Live Lock）问题

**问题描述**：在多个 Proposer 同时发起提案时，可能出现两个 Proposer 不断互相打断对方的 Prepare 阶段，导致没有任何提案能被接受，系统永远无法达成共识。

**原因分析**：

活锁的产生过程如下：
1. Proposer A 发起 Prepare(n=1)，Acceptor 承诺不再接受编号 <= 1 的提案
2. Proposer B 发起 Prepare(n=2)，Acceptor 承诺不再接受编号 <= 2 的提案
3. Proposer A 的 Accept(1) 请求被拒绝（因为 Acceptor 已承诺 n=2）
4. Proposer A 发起 Prepare(n=3)，Acceptor 承诺不再接受编号 <= 3 的提案
5. Proposer B 的 Accept(2) 请求被拒绝（因为 Acceptor 已承诺 n=3）
6. 如此循环，永远无法达成共识

**解决方案**：通过选举 Leader，只允许 Leader 发起提案。这是 Multi Paxos 的核心改进。

```java
/**
 * 解决活锁问题：引入 Leader 选举，只允许 Leader 提交提案
 */
public class PaxosAntiLiveLock {

    private volatile String leaderId;
    private final String nodeId;
    private final List<PaxosAntiLiveLock> cluster;

    public PaxosAntiLiveLock(String nodeId, List<PaxosAntiLiveLock> cluster) {
        this.nodeId = nodeId;
        this.cluster = cluster;
    }

    /**
     * 选举 Leader：使用 Basic Paxos 选出一个 Leader
     */
    public synchronized boolean electLeader() {
        // 每个节点先投自己一票
        long proposalId = System.currentTimeMillis();
        int voteCount = 1; // 投自己

        // 向其他节点拉票
        for (PaxosAntiLiveLock node : cluster) {
            if (!node.nodeId.equals(this.nodeId) && node.vote(proposalId, this.nodeId)) {
                voteCount++;
            }
        }

        int majority = cluster.size() / 2 + 1;
        if (voteCount >= majority) {
            this.leaderId = this.nodeId;
            // 通知其他节点新的 Leader
            for (PaxosAntiLiveLock node : cluster) {
                node.leaderId = this.nodeId;
            }
            System.out.println("Leader 选举完成: " + leaderId);
            return true;
        }
        return false;
    }

    /**
     * 只有 Leader 才能提交提案
     */
    public boolean propose(String value) {
        if (!this.nodeId.equals(this.leaderId)) {
            System.out.println("非 Leader 节点，无法提交提案");
            return false;
        }
        // Leader 直接进入 Accept 阶段
        System.out.println("Leader " + nodeId + " 提交提案: " + value);
        return true;
    }

    private synchronized boolean vote(long proposalId, String candidateId) {
        // 简化投票逻辑：先来先服务
        // 实际实现中需要考虑 proposalId 的大小比较
        return true;
    }
}
```

### 问题 2：脑裂（Split Brain）问题

**问题描述**：在网络分区的情况下，集群可能分裂为多个子集群，每个子集群各自选举 Leader 并独立处理请求，导致数据不一致。

**原因分析**：

假设 5 节点集群发生网络分区：
- 分区 1：节点 A、B（2 个节点）
- 分区 2：节点 C、D、E（3 个节点）

如果分区 1 中的节点 A、B 选举出 Leader 并处理写请求，分区 2 中的节点 C、D、E 也选举出 Leader 并处理写请求，就会出现两个 Leader 同时处理请求，导致数据不一致。

**解决方案**：Paxos 通过多数派（Quorum）机制天然防止脑裂。因为任何决议都需要多数节点同意，而两个多数派必然有交集，所以不可能同时通过两个矛盾的决议。

```java
import java.util.*;

/**
 * 演示 Paxos 的多数派机制如何防止脑裂
 */
public class PaxosQuorumDemo {

    /**
     * 检查是否有足够节点形成多数派
     */
    public static boolean hasQuorum(Set<String> aliveNodes, int totalNodes) {
        return aliveNodes.size() > totalNodes / 2;
    }

    public static void main(String[] args) {
        int totalNodes = 5;
        List<String> allNodes = Arrays.asList("A", "B", "C", "D", "E");

        // 模拟网络分区：分区1 = {A, B}, 分区2 = {C, D, E}
        Set<String> partition1 = new HashSet<>(Arrays.asList("A", "B"));
        Set<String> partition2 = new HashSet<>(Arrays.asList("C", "D", "E"));

        System.out.println("分区 1 节点: " + partition1);
        System.out.println("分区 1 是否有多数派: " + hasQuorum(partition1, totalNodes));
        // 输出: false - 分区 1 无法达成共识，不会产生脑裂

        System.out.println("分区 2 节点: " + partition2);
        System.out.println("分区 2 是否有多数派: " + hasQuorum(partition2, totalNodes));
        // 输出: true - 只有分区 2 能正常工作

        // 结论：多数派机制确保任何时候最多只有一个分区能达成共识
    }
}
```

### 问题 3：Proposal ID 冲突问题

**问题描述**：多个 Proposer 可能生成相同的 Proposal ID，导致 Paxos 算法的安全性被破坏。

**原因分析**：

如果 Proposal ID 仅使用时间戳生成，在以下情况可能冲突：
1. 多个节点同时发起提案，时间戳相同
2. 节点时钟不同步，导致生成的 ID 相同或乱序
3. 节点重启后时间回拨

**解决方案**：使用 `时间戳 + 节点 ID` 的组合方式生成全局唯一且递增的 Proposal ID。

```java
import java.util.concurrent.atomic.AtomicLong;

/**
 * 安全的 Proposal ID 生成器
 * 使用 "高位时间戳 + 低位节点ID" 的方式保证唯一性和递增性
 */
public class ProposalIdGenerator {

    // 节点 ID 占用的位数（支持 1024 个节点）
    private static final int NODE_ID_BITS = 10;
    private static final long MAX_NODE_ID = (1L << NODE_ID_BITS) - 1;
    // 序列号占用的位数
    private static final int SEQUENCE_BITS = 12;
    private static final long SEQUENCE_MASK = (1L << SEQUENCE_BITS) - 1;

    private final long nodeId;
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    public ProposalIdGenerator(long nodeId) {
        if (nodeId < 0 || nodeId > MAX_NODE_ID) {
            throw new IllegalArgumentException(
                String.format("节点 ID 必须在 0 和 %d 之间", MAX_NODE_ID));
        }
        this.nodeId = nodeId;
    }

    /**
     * 生成全局唯一且递增的 Proposal ID
     * 结构：[时间戳(42位)] [节点ID(10位)] [序列号(12位)]
     */
    public synchronized long nextId() {
        long currentTimestamp = System.currentTimeMillis();

        if (currentTimestamp < lastTimestamp) {
            // 时钟回拨处理：等待时钟追上
            throw new RuntimeException(
                String.format("时钟回拨 %d 毫秒，拒绝生成 Proposal ID",
                    lastTimestamp - currentTimestamp));
        }

        if (currentTimestamp == lastTimestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0) {
                // 序列号溢出，等待下一毫秒
                currentTimestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = currentTimestamp;

        return (currentTimestamp << (NODE_ID_BITS + SEQUENCE_BITS))
             | (nodeId << SEQUENCE_BITS)
             | sequence;
    }

    private long tilNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }

    public static void main(String[] args) {
        ProposalIdGenerator generator1 = new ProposalIdGenerator(1);
        ProposalIdGenerator generator2 = new ProposalIdGenerator(2);

        System.out.println("节点 1 生成的 Proposal ID:");
        for (int i = 0; i < 5; i++) {
            System.out.println("  " + generator1.nextId());
        }

        System.out.println("节点 2 生成的 Proposal ID:");
        for (int i = 0; i < 5; i++) {
            System.out.println("  " + generator2.nextId());
        }

        // 结论：即使两个节点在同一毫秒生成 ID，也不会冲突
    }
}
```

## 参考资料

- [Part-time Parliament 论文](https://research.microsoft.com/en-us/um/people/lamport/pubs/lamport-paxos.pdf)
- [Paxos Made Simple 论文](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
- [Paxos 算法详解](https://zhuanlan.zhihu.com/p/31780743)
- [Wiki - Paxos 算法](https://zh.wikipedia.org/w/index.php?title=Paxos%E7%AE%97%E6%B3%95)
- [一致性算法（Paxos、Raft、Zab）](https://www.bilibili.com/video/BV1TW411M7Fx?from=search&seid=11524608198747599965)
- [Raft 作者讲解 Paxos 视频](https://www.bilibili.com/video/av36556594)
- [Paxos 算法讲解视频](https://www.youtube.com/watch?v=d7nAGI_NZPk)
- [分布式协议与算法实战](https://time.geekbang.org/column/intro/100046101)
