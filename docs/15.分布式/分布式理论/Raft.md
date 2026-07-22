---
title: 深入剖析共识性算法 Raft
date: 2020-02-01 22:07:00
categories:
  - 分布式
  - 分布式理论
tags:
  - 分布式
  - 算法
  - 共识
  - Raft
permalink: /pages/29586d95/
---

# 深入剖析共识性算法 Raft

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/70b31b134b514e0c9e065dd0bc8fb757.png)

## Raft 简介

**[Raft](https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf) 是一种为了管理日志复制的分布式共识性算法**。从本质上说，**Raft 算法是通过一切以领导者为准的方式，实现一系列值的共识和各节点日志的一致**。

[Raft](https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf) 出现之前，Paxos 一直是分布式共识性算法的标准。Paxos **难以理解，更难以实现**。Raft 的设计目标是简化 Paxos，使得算法**既容易理解，也容易实现**。

Paxos 和 Raft 都是分布式共识性算法，这个过程如同投票选举领袖（Leader），参选者（Candidate）需要说服大多数投票者（Follower）投票给他，一旦选举出领袖，就由领袖发号施令。Paxos 和 Raft 的区别在于选举的具体过程不同。

**Raft 可以解决分布式 CAP 理论中的 CP**，即 _一致性（C：Consistency）_ 和 _分区容忍性（P：Partition Tolerance）_，并不能解决 _可用性（A：Availability）_ 的问题。

### 分布式共识性

分布式共识性 (distributed consensus) 是分布式系统中最基本的问题，用来保证一个分布式系统的可靠性以及容错能力。简单来说，**_分布式共识性是指多个服务器的保持状态一致_**。

在分布式系统中，可能出现各种意外（断电、网络拥塞、CPU/内存耗尽等等），使得服务器宕机或无法访问，最终导致无法和其他服务器保持状态一致。为了应对这种情况，就需要有一种一致性协议来进行容错，使得分布式系统中即使有部分服务器宕机或无法访问，整体依然可以对外提供服务。

以容错方式达成一致，自然不能要求所有服务器都达成一致状态，只要**超过半数以上**的服务器达成一致就可以了。假设有 N 台服务器， 大于等于 `N/2 + 1` 台服务器就算是半数以上了 。

### 复制状态机

**`复制状态机（Replicated State Machines）`** 是指一组服务器上的状态机产生相同状态的副本，并且在一些机器宕掉的情况下也可以继续运行。一致性算法管理着来自客户端指令的复制日志。状态机从日志中处理相同顺序的相同指令，所以产生的结果也是相同的。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/01/b35a7a0be4764c26937df03523b68bc6.png)

复制状态机通常都是基于复制日志实现的，如上图。每一个服务器存储一个包含一系列指令的日志，并且按照日志的顺序进行执行。每一个日志都按照相同的顺序包含相同的指令，所以每一个服务器都执行相同的指令序列。因为每个状态机都是确定的，每一次执行操作都产生相同的状态和同样的序列。

保证复制日志相同就是一致性算法的工作了。在一台服务器上，一致性模块接收客户端发送来的指令然后增加到自己的日志中去。它和其他服务器上的一致性模块进行通信来保证每一个服务器上的日志最终都以相同的顺序包含相同的请求，尽管有些服务器会宕机。一旦指令被正确的复制，每一个服务器的状态机按照日志顺序处理他们，然后输出结果被返回给客户端。因此，服务器集群看起来形成一个高可靠的状态机。

实际系统中使用的一致性算法通常含有以下特性：

- **安全性保证**（绝对不会返回一个错误的结果）：在非拜占庭错误情况下，包括网络延迟、分区、丢包、冗余和乱序等错误都可以保证正确。
- **可用性**：集群中只要有大多数的机器可运行并且能够相互通信、和客户端通信，就可以保证可用。因此，一个典型的包含 5 个节点的集群可以容忍两个节点的失败。服务器被停止就认为是失败。他们当有稳定的存储的时候可以从状态中恢复回来并重新加入集群。
- **不依赖时序来保证一致性**：物理时钟错误或者极端的消息延迟只有在最坏情况下才会导致可用性问题。
- 通常情况下，一条指令可以尽可能快的在集群中大多数节点响应一轮远程过程调用时完成。小部分比较慢的节点不会影响系统整体的性能。

### RAFT 应用

RAFT 可以做什么？

通过 RAFT 提供的复制状态机，可以解决分布式系统的复制、修复、节点管理等问题。Raft 极大的简化当前分布式系统的设计与实现，让开发者只关注于业务逻辑，将其抽象实现成对应的状态机即可。基于这套框架，可以构建很多分布式应用：

- 分布式存储系统：比如分布式消息队列、分布式块系统、分布式文件系统、分布式表格系统等。代表有：Redis、Etcd、Consul
- 高可靠元信息管理：比如各类 Master 模块的 HA

## Raft 基础

Raft 将一致性问题分解成了三个子问题：

- **选举 Leader**
- **日志复制**
- **安全性**

在后续章节，会详细讲解这个子问题。现在，先了解一下 Raft 的一些核心概念。

### 服务器角色

在 Raft 中，任何时刻，每个服务器都处于这三个角色之一 ：

- **`Leader`** - 领导者，通常一个系统中是**一主（Leader）多从（Follower）**。Leader **负责处理所有的客户端请求**。
- **`Follower`** - 跟随者，**不会发送任何请求**，只是简单的 **响应来自 Leader 或者 Candidate 的请求**。
- **`Candidate`** - 参选者，选举新 Leader 时的临时角色。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/01/2c3b424b83e944729ce71ee6dab8baf9.png)

> :bulb: 图示说明：
>
> - Follower 只响应来自其他服务器的请求。在一定时限内，如果 Follower 接收不到消息，就会转变成 Candidate，并发起选举。
> - Candidate 向 Follower 发起投票请求，如果获得集群中半数以上的选票，就会转变为 Leader。
> - 在一个 Term 内，Leader 始终保持不变，直到下线了。Leader 需要周期性向所有 Follower 发送心跳消息，以阻止 Follower 转变为 Candidate。

### 任期

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/01/27c2819256024ed0af63abee0bf0580e.png)

Raft 把时间分割成任意长度的 **_`任期（Term）`_**，任期用连续的整数标记。每一段任期从一次**选举**开始。**Raft 保证了在一个给定的任期内，最多只有一个领导者**。

- 如果选举成功，Leader 会管理整个集群直到任期结束。
- 如果选举失败，那么这个任期就会因为没有 Leader 而结束。

**不同服务器节点观察到的任期转换状态可能不一样**：

- 服务器节点可能观察到多次的任期转换。
- 服务器节点也可能观察不到任何一次任期转换。

**任期在 Raft 算法中充当逻辑时钟的作用，使得服务器节点可以查明一些过期的信息（比如过期的 Leader）。每个服务器节点都会存储一个当前任期号，这一编号在整个时期内单调的增长。当服务器之间通信的时候会交换当前任期号。**

- 如果一个服务器的当前任期号比其他人小，那么他会更新自己的编号到较大的编号值。
- 如果一个 Candidate 或者 Leader 发现自己的任期号过期了，那么他会立即恢复成跟随者状态。
- 如果一个节点接收到一个包含过期的任期号的请求，那么他会直接拒绝这个请求。

### RPC

Raft 算法中服务器节点之间的通信使用 **_`远程过程调用（RPC）`_**。

基本的一致性算法只需要两种 RPC：

- **`RequestVote RPC`** - 请求投票 RPC，由 Candidate 在选举期间发起。
- **`AppendEntries RPC`** - 附加条目 RPC，由 Leader 发起，用来复制日志和提供一种心跳机制。

## 选举 Leader

### 选举规则

**领导者心跳消息**：Raft 使用一种心跳机制来触发 Leader 选举。**Leader 需要周期性的向所有 Follower 发送心跳消息**，以此维持 Leader 身份。

**随机的竞选超时时间**：每个 Follower 都设置了一个**随机的竞选超时时间**，一般为 `150ms ~ 300ms`，如果在竞选超时时间内没有收到 Leader 的心跳消息，就会认为当前 Term 没有可用的 Leader，并发起选举来选出新的 Leader。开始一次选举过程，Follower 先要增加自己的当前 Term 号，并**转换为 Candidate**。

Candidate 会并行的**向集群中的所有服务器节点发送投票请求（`RequestVote RPC`）**，它会保持当前状态直到以下三件事情之一发生：

- **自己成为 Leader**
- **其他的服务器成为 Leader**
- **没有任何服务器成为 Leader**

#### 自己成为 Leader

- 当一个 Candidate 从整个集群**半数以上**的服务器节点获得了针对同一个 Term 的选票，那么它就赢得了这次选举并成为 Leader。每个服务器最多会对一个 Term 投出一张选票，按照**先来先服务（FIFO）的原则**。_要求半数以上选票的规则确保了最多只会有一个 Candidate 赢得此次选举_。
- 一旦 Candidate 赢得选举，就立即成为 Leader。然后它会向其他的服务器发送心跳消息来建立自己的权威并且阻止新的领导人的产生。

#### 其他的服务器成为 Leader

等待投票期间，Candidate 可能会从其他的服务器接收到声明它是 Leader 的 `AppendEntries RPC`。

- 如果这个 Leader 的 Term 号（包含在此次的 RPC 中）不小于 Candidate 当前的 Term，那么 Candidate 会承认 Leader 合法并回到 Follower 状态。
- 如果此次 RPC 中的 Term 号比自己小，那么 Candidate 就会拒绝这个消息并继续保持 Candidate 状态。

#### 没有任何服务器成为 Leader

如果有多个 Follower 同时成为 Candidate，那么选票可能会被瓜分以至于没有 Candidate 可以赢得半数以上的投票。当这种情况发生的时候，每一个 Candidate 都会竞选超时，然后通过增加当前 Term 号来开始一轮新的选举。然而，没有其他机制的话，选票可能会被无限的重复瓜分。

Raft 算法使用随机选举超时时间的方法来确保很少会发生选票瓜分的情况，就算发生也能很快的解决。为了阻止选票起初就被瓜分，竞选超时时间是一个**随机的时间**，在一个固定的区间（例如 150-300 毫秒）随机选择，这样可以把选举都分散开。

- 以至于在大多数情况下，只有一个服务器会超时，然后它赢得选举，成为 Leader，并在其他服务器超时之前发送心跳包。
- 同样的机制也被用在选票瓜分的情况下：每一个 Candidate 在开始一次选举的时候会重置一个随机的选举超时时间，然后在超时时间内等待投票的结果；这样减少了在新的选举中另外的选票瓜分的可能性。

---

理解了上面的选举规则后，我们通过动图来加深认识。

### 单 Candidate 选举

（1）下图表示一个分布式系统的最初阶段，此时只有 Follower，没有 Leader。Follower A 等待一个随机的选举超时时间之后，没收到 Leader 发来的心跳消息。因此，将 Term 由 0 增加为 1，转换为 Candidate，进入选举状态。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-candidate-01.gif)

（2）此时，A 向所有其他节点发送投票请求。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-candidate-02.gif)

（3）其它节点会对投票请求进行回复，如果超过半数以上的节点投票了，那么该 Candidate 就会立即变成 Term 为 1 的 Leader。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-candidate-03.gif)

（4）Leader 会周期性地发送心跳消息给所有 Follower，Follower 接收到心跳包，会重新开始计时。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-candidate-04.gif)

### 多 Candidate 选举

（1）如果有多个 Follower 成为 Candidate，并且所获得票数相同，那么就需要重新开始投票。例如下图中 Candidate B 和 Candidate D 都发起 Term 为 4 的选举，且都获得两票，因此需要重新开始投票。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-multi-candidate-01.gif)

（2）当重新开始投票时，由于每个节点设置的随机竞选超时时间不同，因此能下一次再次出现多个 Candidate 并获得同样票数的概率很低。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-multi-candidate-02.gif)

### 小结

Raft 算法通过：领导者心跳消息、随机选举超时时间、得到大多数选票才通过原则、任期最新者优先、先来先服务等投票原则，保证了一个任期只有一位领导，也极大地减少了选举失败的情况。

## 日志复制

### 日志格式

**日志由含日志索引（log index）的日志条目（log entry）组成**。每个日志条目包含它被创建时的 Term 号（下图中方框中的数字），和一个复制状态机需要执行的指令。如果一个日志条目被复制到半数以上的服务器上，就被认为可以提交（Commit）了。

- 日志条目中的 Term 号被用来检查是否出现不一致的情况，它实际上是创建这条日志的领导者的任期编号。
- 日志条目中的日志索引用来表明它在日志中的位置，它是一个单调递增的整数。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/0aee89525cc042369958da4ef9a6df40.png)

Raft 日志同步保证如下两点：

- 如果不同日志中的两个日志条目有着相同的日志索引和 Term，则**它们所存储的命令是相同的**。
  - 这个特性基于这条原则：Leader 最多在一个 Term 内、在指定的一个日志索引上创建一条日志条目，同时日志条目在日志中的位置也从来不会改变。
- 如果不同日志中的两个日志条目有着相同的日志索引和 Term，则**它们之前的所有条目都是完全一样的**。
  - 这个特性由 `AppendEntries RPC` 的一个简单的一致性检查所保证。在发送 `AppendEntries RPC` 时，Leader 会把新日志条目之前的日志条目的日志索引和 Term 号一起发送。如果 Follower 在它的日志中找不到包含相同日志索引和 Term 号的日志条目，它就会拒绝接收新的日志条目。

### 日志复制流程

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/6560d178194f41f597f775761c320f32.png)

1. Leader 负责处理所有客户端的请求。
2. Leader 把请求作为日志条目加入到它的日志中，然后并行的向其他服务器发送 `AppendEntries RPC` 请求，要求 Follower 复制日志条目。
3. Follower 复制成功后，返回确认消息。
4. 当这个日志条目被半数以上的服务器复制后，Leader 提交这个日志条目到它的复制状态机，并向客户端返回执行结果。

> 注意：如果 Follower 崩溃或者运行缓慢，再或者网络丢包，Leader 会不断的重复尝试发送 `AppendEntries RPC` 请求 （尽管已经回复了客户端），直到所有的跟随者都最终复制了所有的日志条目。

下面，通过一组动图来加深认识：

（1）来自客户端的修改都会被传入 Leader。注意该修改还未被提交，只是写入日志中。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-sync-log-01.gif)

（2）Leader 会把修改复制到所有 Follower。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-sync-log-02.gif)

（3）Leader 会等待大多数的 Follower 也进行了修改，然后才将修改提交。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-sync-log-03.gif)

（4）此时 Leader 会通知的所有 Follower 让它们也提交修改，此时所有节点的值达成一致。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/raft-sync-log-04.gif)

### 日志一致性

一般情况下，Leader 和 Followers 的日志保持一致，因此日志条目一致性检查通常不会失败。然而，Leader 崩溃可能会导致日志不一致：旧的 Leader 可能没有完全复制完日志中的所有条目。

#### Leader 和 Follower 日志不一致的可能

Leader 和 Follower 可能存在多种日志不一致的可能。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/5999c1ee92fe4628a70062b5e6b9a170.png)

> :bulb: 图示说明：
>
> 上图阐述了 Leader 和 Follower 可能存在多种日志不一致的可能，每一个方框表示一个日志条目，里面的数字表示任期号 。
>
> 当一个 Leader 成功当选时，Follower 可能出现以下情况（a-f）：
>
> - **存在未更新日志条目**，如（a、b）。
> - **存在未提交日志条目**，如（c、d）。
> - 或**两种情况都存在**，如（e、f）。
>
> _例如，场景 f 可能会这样发生，某服务器在 Term2 的时候是 Leader，已附加了一些日志条目到自己的日志中，但在提交之前就崩溃了；很快这个机器就被重启了，在 Term3 重新被选为 Leader，并且又增加了一些日志条目到自己的日志中；在 Term 2 和 Term 3 的日志被提交之前，这个服务器又宕机了，并且在接下来的几个任期里一直处于宕机状态_。

#### Leader 和 Follower 日志一致的保证

Leader 通过强制 Followers 复制它的日志来处理日志的不一致，**Followers 上的不一致的日志会被 Leader 的日志覆盖**。

- Leader 为了使 Followers 的日志同自己的一致，Leader 需要找到 Followers 同它的日志一致的地方，然后覆盖 Followers 在该位置之后的条目。
- Leader 会从后往前试，每次日志条目失败后尝试前一个日志条目，直到成功找到每个 Follower 的日志一致位点，然后向后逐条覆盖 Followers 在该位置之后的条目。

## 安全性

前面描述了 Raft 算法是如何选举 Leader 和复制日志的。

Raft 还增加了一些限制来完善 Raft 算法，以保证安全性：保证了任意 Leader 对于给定的 Term，都拥有了之前 Term 的所有被提交的日志条目。

### 选举限制

拥有最新的已提交的日志条目的 Follower 才有资格成为 Leader。

Raft 使用投票的方式来阻止一个 Candidate 赢得选举除非这个 Candidate 包含了所有已经提交的日志条目。 Candidate 为了赢得选举必须联系集群中的大部分节点，这意味着每一个已经提交的日志条目在这些服务器节点中肯定存在于至少一个节点上。如果 Candidate 的日志至少和大多数的服务器节点一样新（这个新的定义会在下面讨论），那么他一定持有了所有已经提交的日志条目。

`RequestVote RPC` 实现了这样的限制：**RequestVote RPC 中包含了 Candidate 的日志信息， Follower 会拒绝掉那些日志没有自己新的投票请求**。

如何判断哪个日志条目比较新？

Raft 通过比较两份日志中最后一条日志条目的日志索引和 Term 来判断哪个日志比较新。

- 先判断 Term，哪个数值大即代表哪个日志比较新。
- 如果 Term 相同，再比较 日志索引，哪个数值大即代表哪个日志比较新。

### 提交旧任期的日志条目

一个当前 Term 的日志条目被复制到了半数以上的服务器上，Leader 就认为它是可以被提交的。如果这个 Leader 在提交日志条目前就下线了，后续的 Leader 可能会覆盖掉这个日志条目。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/05/c9820bf6535a4fe1a5a9778bd38d7a69.png)

> 💡 图示说明：
>
> 上图解释了为什么 Leader 无法对旧 Term 的日志条目进行提交。
>
> - 阶段 (a) ，S1 是 Leader，且 S1 写入日志条目为 (Term 2，日志索引 2），只有 S2 复制了这个日志条目。
> - 阶段 (b)，S1 下线，S5 被选举为 Term3 的 Leader。S5 写入日志条目为 (Term 3，日志索引 2）。
> - 阶段 (c)，S5 下线，S1 重新上线，并被选举为 Term4 的 Leader。此时，Term 2 的那条日志条目已经被复制到了集群中的大多数节点上，但是还没有被提交。
> - 阶段 (d)，S1 再次下线，S5 重新上线，并被重新选举为 Term3 的 Leader。然后 S5 覆盖了日志索引 2 处的日志。
> - 阶段 (e)，如果阶段 (d) 还未发生，即 S1 再次下线之前，S1 把自己主导的日志条目复制到了大多数节点上，那么在后续 Term 里面这些新日志条目就会被提交。这样在同一时刻就同时保证了，之前的所有旧日志条目就会被提交。

**Raft 永远不会通过计算副本数目的方式去提交一个之前 Term 内的日志条目**。只有 Leader 当前 Term 里的日志条目通过计算副本数目可以被提交；一旦当前 Term 的日志条目以这种方式被提交，那么由于日志匹配特性，之前的日志条目也都会被间接的提交。

当 Leader 复制之前任期里的日志时，Raft 会为所有日志保留原始的 Term，这在提交规则上产生了额外的复杂性。在其他的一致性算法中，如果一个新的领导人要重新复制之前的任期里的日志时，它必须使用当前新的任期号。Raft 使用的方法更加容易辨别出日志，因为它可以随着时间和日志的变化对日志维护着同一个任期编号。另外，和其他的算法相比，Raft 中的新领导人只需要发送更少日志条目（其他算法中必须在他们被提交之前发送更多的冗余日志条目来为他们重新编号）。

## 日志压缩

在实际的系统中，不能让日志无限膨胀，否则系统重启时需要花很长的时间进行恢复，从而影响可用性。Raft 采用对整个系统进行快照来解决，快照之前的日志都可以丢弃。

每个副本独立的对自己的系统状态生成快照，并且只能对已经提交的日志条目生成快照。

快照包含以下内容：

- 日志元数据。最后一条已提交的日志条目的日志索引和 Term。这两个值在快照之后的第一条日志条目的 `AppendEntries RPC` 的完整性检查的时候会被用上。
- 系统当前状态。

当 Leader 要发送某个日志条目，落后太多的 Follower 的日志条目会被丢弃，Leader 会将快照发给 Follower。或者新上线一台机器时，也会发送快照给它。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/02/d936d27165ca456c8d1811a48411c34f.png)

**生成快照的频率要适中**，频率过高会消耗大量 I/O 带宽；频率过低，一旦需要执行恢复操作，会丢失大量数据，影响可用性。推荐当日志达到某个固定的大小时生成快照。

生成一次快照可能耗时过长，影响正常日志同步。可以通过使用 copy-on-write 技术避免快照过程影响正常日志同步。

## 特性

Raft 算法具有以下核心特性：

| 特性 | 说明 |
| --- | --- |
| **强领导者（Strong Leader）** | 系统中所有写请求都由 Leader 处理，简化了日志复制流程 |
| **易理解性** | 相比 Paxos，Raft 通过问题分解（选举、日志复制、安全性）使算法更易理解和实现 |
| **容错性** | 在 `2N+1` 个节点的集群中，容忍最多 `N` 个节点故障 |
| **强一致性** | 保证已提交的日志在所有存活节点上最终一致 |
| **顺序性** | 日志条目严格按照顺序提交和执行，保证状态机一致性 |
| **成员变更** | 支持在线集群成员变更，无需停机 |

### Raft 安全性保证

Raft 算法通过以下机制保证安全性：

- **选举限制**：只有拥有最新已提交日志的节点才能当选 Leader
- **Leader 只追加**：Leader 永远不会覆盖或删除自己的日志条目，只追加
- **日志匹配**：如果两条日志在同一索引位置且 Term 相同，则之前的所有日志也相同
- **状态机安全**：如果一个日志条目在某个 Term 被提交，那么后续 Term 的 Leader 必定包含该条目

### Raft 与 Paxos 对比

| 对比维度 | Raft | Paxos |
| --- | --- | --- |
| **易理解性** | 高，分解为三个子问题 | 低，理论性强 |
| **Leader 角色** | 强 Leader，所有请求经过 Leader | Multi-Paxos 有 Leader，Basic Paxos 无 |
| **日志复制** | 单向，Leader 到 Follower | 双向协商 |
| **工程实现** | 成熟实现多（etcd、Consul） | 实现复杂（Chubby） |
| **成员变更** | 内置支持 | 需要额外扩展 |

## 应用场景

Raft 算法因其易理解性和强一致性，被广泛应用于现代分布式系统：

### 1. 服务发现与配置管理

- **etcd**：CoreOS 开发的分布式键值存储，Kubernetes 的核心组件，使用 Raft 保证数据一致性
- **Consul**：HashiCorp 的服务发现和配置工具，使用 Raft 实现强一致性
- **Nacos**：阿里巴巴的服务发现和配置管理平台，Raft 模式下用于一致性选举

### 2. 分布式数据库

- **TiKV**：PingCAP 的分布式事务型键值存储，每个 Region 使用一个 Raft Group
- **CockroachDB**：分布式的 SQL 数据库，使用 Raft 实现数据副本一致性
- **YugabyteDB**：分布式 SQL 数据库，基于 Raft 实现强一致性

### 3. 消息队列

- **Kafka (KRaft 模式)**：从 2.8 版本开始，Kafka 引入 KRaft 模式，使用 Raft 替代 ZooKeeper 进行元数据管理
- **NATS Streaming**：使用 Raft 实现集群的高可用

### 4. 分布式存储

- **Ceph (可选)**：部分模块可使用 Raft 进行一致性保证
- **MinIO**：对象存储系统，使用 Raft 保证元数据一致性
- **Longhorn**：Kubernetes 的分布式块存储，使用 Raft 管理副本

### 5. 分布式协调

- **SOFA-JRaft**：蚂蚁金服开源的 Java Raft 实现，用于金融级分布式系统
- **Apache Ratis**：Apache 基金会的 Raft Java 实现

## 最佳实践

### 案例 1：使用 etcd 实现分布式锁

以下示例展示如何使用 etcd（Raft 实现）实现分布式锁：

```java
import io.etcd.jetcd.*;
import io.etcd.jetcd.kv.PutResponse;
import io.etcd.jetcd.lease.LeaseGrantResponse;
import io.etcd.jetcd.lock.LockResponse;
import io.etcd.jetcd.options.PutOption;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * 基于 etcd (Raft) 的分布式锁实现
 * 利用 etcd 的 Lease 机制和 Raft 协议保证一致性
 */
public class EtcdDistributedLock {

    private final Client client;
    private final Lock lockClient;
    private final Lease leaseClient;
    private final KV kvClient;
    private long leaseId;

    public EtcdDistributedLock(String endpoints) {
        this.client = Client.builder()
            .endpoints(endpoints.split(","))
            .build();
        this.lockClient = client.getLockClient();
        this.leaseClient = client.getLeaseClient();
        this.kvClient = client.getKVClient();
    }

    /**
     * 获取分布式锁
     *
     * @param lockKey   锁的 key
     * @param ttl       租约时间（秒）
     * @return          租约 ID，用于释放锁
     */
    public long acquireLock(String lockKey, long ttl) throws Exception {
        // 1. 创建租约，TTL 为 ttl 秒
        CompletableFuture<LeaseGrantResponse> leaseFuture =
            leaseClient.grant(ttl);
        LeaseGrantResponse leaseResponse = leaseFuture.get();
        this.leaseId = leaseResponse.getID();

        // 2. 使用租约获取锁
        CompletableFuture<LockResponse> lockFuture =
            lockClient.lock(
                ByteSequence.from(lockKey.getBytes()),
                leaseId
            );

        LockResponse lockResponse = lockFuture.get();
        System.out.println("获取锁成功: " + lockKey + ", leaseId=" + leaseId);
        return leaseId;
    }

    /**
     * 释放分布式锁
     *
     * @param lockKey 锁的 key
     * @param leaseId 租约 ID
     */
    public void releaseLock(String lockKey, long leaseId) throws Exception {
        // 释放锁并撤销租约
        lockClient.unlock(ByteSequence.from(lockKey.getBytes())).get();
        leaseClient.revoke(leaseId).get();
        System.out.println("释放锁成功: " + lockKey);
    }

    /**
     * 使用锁执行临界区操作
     */
    public <T> T executeWithLock(String lockKey, long ttl, java.util.concurrent.Callable<T> task) throws Exception {
        long leaseId = acquireLock(lockKey, ttl);
        try {
            return task.call();
        } finally {
            releaseLock(lockKey, leaseId);
        }
    }

    /**
     * 写入配置数据（通过 Raft 保证一致性）
     */
    public void putConfig(String key, String value) throws Exception {
        CompletableFuture<PutResponse> future = kvClient.put(
            ByteSequence.from(key.getBytes()),
            ByteSequence.from(value.getBytes())
        );
        PutResponse response = future.get();
        System.out.println("写入配置: " + key + "=" + value + ", revision=" + response.getHeader().getRevision());
    }

    /**
     * 读取配置数据
     */
    public String getConfig(String key) throws Exception {
        CompletableFuture<io.etcd.jetcd.kv.GetResponse> future =
            kvClient.get(ByteSequence.from(key.getBytes()));
        io.etcd.jetcd.kv.GetResponse response = future.get();
        if (response.getKvs().isEmpty()) {
            return null;
        }
        return response.getKvs().get(0).getValue().toString();
    }

    public void close() {
        client.close();
    }

    public static void main(String[] args) throws Exception {
        // 连接 etcd 集群（3 节点 Raft 集群）
        EtcdDistributedLock distributedLock = new EtcdDistributedLock(
            "http://etcd-node1:2379,http://etcd-node2:2379,http://etcd-node3:2379"
        );

        try {
            // 使用分布式锁执行操作
            String result = distributedLock.executeWithLock("order-lock-123", 30, () -> {
                System.out.println("执行临界区操作...");
                Thread.sleep(2000);
                return "操作完成";
            });
            System.out.println(result);

            // 写入和读取配置
            distributedLock.putConfig("/config/app/database-url", "jdbc:mysql://db:3306/mydb");
            String dbUrl = distributedLock.getConfig("/config/app/database-url");
            System.out.println("读取到配置: " + dbUrl);

        } finally {
            distributedLock.close();
        }
    }
}
```

Maven 依赖：

```xml
<dependencies>
    <dependency>
        <groupId>io.etcd</groupId>
        <artifactId>jetcd-core</artifactId>
        <version>0.7.5</version>
    </dependency>
</dependencies>
```

### 案例 2：etcd Raft 集群部署配置

```yaml
# etcd 集群配置文件 etcd-config.yaml

# 节点名称
name: etcd-node1

# 数据存储目录
data-dir: /var/lib/etcd

# 监听客户端请求的地址
listen-client-urls: http://0.0.0.0:2379

# 对外提供服务的地址
advertise-client-urls: http://etcd-node1:2379

# 监听集群内部通信的地址
listen-peer-urls: http://0.0.0.0:2380

# 集群内部通信的对外地址
initial-advertise-peer-urls: http://etcd-node1:2380

# 初始化集群配置
initial-cluster: etcd-node1=http://etcd-node1:2380,etcd-node2=http://etcd-node2:2380,etcd-node3=http://etcd-node3:2380

# 集群 token，用于区分不同集群
initial-cluster-token: my-etcd-cluster

# 初始化集群状态：new 表示新集群，existing 表示加入已有集群
initial-cluster-state: new

# 心跳间隔（毫秒）
heartbeat-interval: 100

# 选举超时时间（毫秒）
election-timeout: 1000

# 快照保留数量
snapshot-count: 10000

# 自动压缩：保留 1 小时的历史
auto-compaction-retention: "1"

# quota-backend-bytes: 2GB
quota-backend-bytes: 2147483648
```

Docker Compose 部署 etcd 集群：

```yaml
# docker-compose.yml
version: '3.8'

services:
  etcd-node1:
    image: quay.io/coreos/etcd:v3.5.10
    container_name: etcd-node1
    ports:
      - "2379:2379"
      - "2380:2380"
    command:
      - /usr/local/bin/etcd
      - --name=etcd-node1
      - --data-dir=/etcd-data
      - --listen-client-urls=http://0.0.0.0:2379
      - --advertise-client-urls=http://etcd-node1:2379
      - --listen-peer-urls=http://0.0.0.0:2380
      - --initial-advertise-peer-urls=http://etcd-node1:2380
      - --initial-cluster=etcd-node1=http://etcd-node1:2380,etcd-node2=http://etcd-node2:2380,etcd-node3=http://etcd-node3:2380
      - --initial-cluster-token=my-etcd-cluster
      - --initial-cluster-state=new
      - --heartbeat-interval=100
      - --election-timeout=1000
    networks:
      - etcd-net

  etcd-node2:
    image: quay.io/coreos/etcd:v3.5.10
    container_name: etcd-node2
    ports:
      - "2381:2379"
      - "2382:2380"
    command:
      - /usr/local/bin/etcd
      - --name=etcd-node2
      - --data-dir=/etcd-data
      - --listen-client-urls=http://0.0.0.0:2379
      - --advertise-client-urls=http://etcd-node2:2379
      - --listen-peer-urls=http://0.0.0.0:2380
      - --initial-advertise-peer-urls=http://etcd-node2:2380
      - --initial-cluster=etcd-node1=http://etcd-node1:2380,etcd-node2=http://etcd-node2:2380,etcd-node3=http://etcd-node3:2380
      - --initial-cluster-token=my-etcd-cluster
      - --initial-cluster-state=new
    networks:
      - etcd-net

  etcd-node3:
    image: quay.io/coreos/etcd:v3.5.10
    container_name: etcd-node3
    ports:
      - "2383:2379"
      - "2384:2380"
    command:
      - /usr/local/bin/etcd
      - --name=etcd-node3
      - --data-dir=/etcd-data
      - --listen-client-urls=http://0.0.0.0:2379
      - --advertise-client-urls=http://etcd-node3:2379
      - --listen-peer-urls=http://0.0.0.0:2380
      - --initial-advertise-peer-urls=http://etcd-node3:2380
      - --initial-cluster=etcd-node1=http://etcd-node1:2380,etcd-node2=http://etcd-node2:2380,etcd-node3=http://etcd-node3:2380
      - --initial-cluster-token=my-etcd-cluster
      - --initial-cluster-state=new
    networks:
      - etcd-net

networks:
  etcd-net:
    driver: bridge
```

### 案例 3：使用 SOFA-JRaft 实现状态机复制

```java
import com.alipay.sofa.jraft.*;
import com.alipay.sofa.jraft.entity.*;
import com.alipay.sofa.jraft.option.*;
import com.alipay.sofa.jraft.rpc.*;
import com.alipay.sofa.jraft.storage.snapshot.*;
import com.alipay.sofa.jraft.util.*;

import java.io.*;
import java.nio.ByteBuffer;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;

/**
 * 基于 SOFA-JRaft 实现的分布式 KV 存储
 * 演示 Raft 状态机复制的完整流程
 */
public class JRaftKvStore {

    /**
     * 状态机实现：维护 KV 数据
     */
    public static class KvStateMachine implements StateMachine {

        // 内存中的 KV 存储
        private final ConcurrentHashMap<String, String> kvStore = new ConcurrentHashMap<>();

        public ConcurrentHashMap<String, String> getKvStore() {
            return kvStore;
        }

        @Override
        public void onApply(Iterator iterator) {
            // 应用日志条目到状态机
            while (iterator.hasNext()) {
                LogEntry entry = iterator.next();
                ByteBuffer data = entry.getData();
                String[] parts = new String(data.array()).split(":");
                String op = parts[0];
                String key = parts[1];

                if ("PUT".equals(op)) {
                    String value = parts[2];
                    kvStore.put(key, value);
                    System.out.println("[状态机] PUT " + key + "=" + value);
                } else if ("DELETE".equals(op)) {
                    kvStore.remove(key);
                    System.out.println("[状态机] DELETE " + key);
                }
                iterator.next();
            }
        }

        @Override
        public void onSaveSnapshot(SnapshotWriter writer, Closure done) {
            // 保存快照
            String snapshotFile = writer.getPath() + "/kv_snapshot.dat";
            try (ObjectOutputStream oos = new ObjectOutputStream(
                    new FileOutputStream(snapshotFile))) {
                oos.writeObject(kvStore);
                writer.addFile("kv_snapshot.dat");
                done.run(Status.OK());
            } catch (IOException e) {
                done.run(new Status(RaftError.EIO, "保存快照失败: " + e.getMessage()));
            }
        }

        @Override
        public boolean onSnapshotLoad(SnapshotReader reader) {
            // 加载快照
            String snapshotFile = reader.getPath() + "/kv_snapshot.dat";
            if (!new File(snapshotFile).exists()) {
                return false;
            }
            try (ObjectInputStream ois = new ObjectInputStream(
                    new FileInputStream(snapshotFile))) {
                @SuppressWarnings("unchecked")
                ConcurrentHashMap<String, String> loaded =
                    (ConcurrentHashMap<String, String>) ois.readObject();
                kvStore.clear();
                kvStore.putAll(loaded);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        @Override
        public void onLeaderStart(long term) {
            System.out.println("[状态机] 成为 Leader, term=" + term);
        }

        @Override
        public void onLeaderStop(Status status) {
            System.out.println("[状态机] 不再是 Leader");
        }
    }

    /**
     * KV 操作的 Task
     */
    public static class KvTask implements Closure {
        private final String operation; // PUT 或 DELETE
        private final String key;
        private final String value;
        private final CountDownLatch latch;
        private Status status;

        public KvTask(String operation, String key, String value, CountDownLatch latch) {
            this.operation = operation;
            this.key = key;
            this.value = value;
            this.latch = latch;
        }

        public ByteBuffer getData() {
            if ("PUT".equals(operation)) {
                return ByteBuffer.wrap((operation + ":" + key + ":" + value).getBytes());
            } else {
                return ByteBuffer.wrap((operation + ":" + key).getBytes());
            }
        }

        @Override
        public void run(Status status) {
            this.status = status;
            latch.countDown();
        }

        public Status getStatus() { return status; }
    }

    public static void main(String[] args) throws Exception {
        String groupId = "kv-store-group";
        String serverAddress = "127.0.0.1:8081";

        // 初始化 RPC 服务器
        RaftRpcServer rpcServer = RaftRpcServerFactory.createRaftRpcServer(serverAddress);

        // 状态机
        KvStateMachine stateMachine = new KvStateMachine();

        // 节点选项
        NodeOptions nodeOptions = new NodeOptions();
        nodeOptions.setFsm(stateMachine);
        nodeOptions.setLogUri("./raft/log");
        nodeOptions.setRaftMetaUri("./raft/meta");
        nodeOptions.setSnapshotUri("./raft/snapshot");
        nodeOptions.setSnapshotIntervalSecs(3600); // 每小时做一次快照

        // 集群配置
        Configuration conf = new Configuration();
        conf.addPeer(new PeerId("127.0.0.1", 8081));
        nodeOptions.setInitialConf(conf);

        // 启动节点
        RpcServer rpcServerImpl = new GrpcRpcServer(serverAddress);
        NodeManager.getInstance().addAddress(new Endpoint("127.0.0.1", 8081));
        RaftGroupService raftGroupService = new RaftGroupService(
            groupId, nodeOptions, rpcServerImpl);
        Node node = raftGroupService.start();

        // 等待选举完成
        Thread.sleep(3000);

        // 提交操作
        CountDownLatch latch1 = new CountDownLatch(1);
        KvTask putTask = new KvTask("PUT", "name", "Raft-User", latch1);
        node.apply(putTask);
        latch1.await();
        System.out.println("PUT 操作结果: " + putTask.getStatus());

        // 读取数据
        System.out.println("当前 KV 存储: " + stateMachine.getKvStore());

        // 关闭
        node.shutdown();
        rpcServerImpl.shutdown();
    }
}
```

Maven 依赖：

```xml
<dependencies>
    <dependency>
        <groupId>com.alipay.sofa</groupId>
        <artifactId>jraft-core</artifactId>
        <version>1.3.13</version>
    </dependency>
</dependencies>
```

## 常见问题

### 问题 1：脑裂导致数据不一致

**问题描述**：在网络分区的情况下，集群分裂为多个子集群，每个子集群可能选举出各自的 Leader，导致数据不一致。

**原因分析**：

假设 5 节点集群发生网络分区：
- 分区 A：节点 S1、S2（2 个节点，不足多数派）
- 分区 B：节点 S3、S4、S5（3 个节点，形成多数派）

分区 A 中的节点无法选出 Leader（因为没有多数派），不会处理写请求。分区 B 可以选出 Leader 并正常处理请求。网络恢复后，分区 A 的节点会通过日志同步追上最新数据。

但如果错误配置导致分区 A 也认为自己是多数派（如错误的 `initial-cluster` 配置），就会产生脑裂。

**解决方案**：确保集群配置正确，Raft 的多数派机制天然防止脑裂。

```java
import java.util.*;

/**
 * Raft 脑裂防护演示
 * 验证网络分区时只有多数派分区能正常工作
 */
public class RaftSplitBrainPrevention {

    /**
     * 模拟 Raft 集群
     */
    static class RaftNode {
        String id;
        String state = "Follower"; // Leader / Follower / Candidate
        int term = 0;
        Set<String> reachablePeers = new HashSet<>();

        RaftNode(String id) {
            this.id = id;
        }

        /**
         * 尝试发起选举
         */
        boolean tryStartElection() {
            // Raft 选举需要多数派支持
            int voteCount = 1; // 投自己
            for (String peer : reachablePeers) {
                voteCount++; // 假设可达的 peer 都投票
            }
            int majority = (5 / 2) + 1; // 5 节点集群，多数派 = 3
            if (voteCount >= majority) {
                this.state = "Leader";
                this.term++;
                return true;
            }
            return false;
        }
    }

    public static void main(String[] args) {
        List<RaftNode> cluster = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            cluster.add(new RaftNode("S" + i));
        }

        // 模拟网络分区: {S1, S2} 和 {S3, S4, S5}
        cluster.get(0).reachablePeers.add("S2");  // S1 可达 S2
        cluster.get(1).reachablePeers.add("S1");  // S2 可达 S1

        cluster.get(2).reachablePeers.addAll(Arrays.asList("S4", "S5")); // S3 可达 S4, S5
        cluster.get(3).reachablePeers.addAll(Arrays.asList("S3", "S5")); // S4 可达 S3, S5
        cluster.get(4).reachablePeers.addAll(Arrays.asList("S3", "S4")); // S5 可达 S3, S4

        System.out.println("=== 网络分区后的选举结果 ===");
        for (RaftNode node : cluster) {
            boolean elected = node.tryStartElection();
            System.out.println(node.id + ": 可达节点数=" + node.reachablePeers.size() +
                ", 选举结果=" + (elected ? "成为 Leader (term=" + node.term + ")" : "无法选举"));
        }
        // 输出：
        // S1: 可达节点数=1, 选举结果=无法选举 (只有2票，不足多数派)
        // S2: 可达节点数=1, 选举结果=无法选举 (只有2票，不足多数派)
        // S3: 可达节点数=2, 选举结果=成为 Leader (3票，满足多数派)
        // S4: 可达节点数=2, 选举结果=成为 Leader (3票，满足多数派)
        // S5: 可达节点数=2, 选举结果=成为 Leader (3票，满足多数派)
        // 注意：实际 Raft 中，同一 term 只会有一个 Leader
        System.out.println("\n结论: 分区 {S1, S2} 无法选举 Leader，不会产生脑裂");
    }
}
```

### 问题 2：选举超时配置不当导致频繁选举

**问题描述**：集群 Leader 频繁切换，导致服务不稳定，写请求频繁失败。

**原因分析**：

选举超时时间（`election-timeout`）配置过小，会导致：
1. 网络稍有延迟，Follower 就认为 Leader 宕机，发起选举
2. 多个 Follower 同时超时，同时发起选举，导致选票瓜分
3. 新选举的 Leader 还没来得及稳定，又触发下一轮选举

**解决方案**：合理配置选举超时时间和心跳间隔。

```java
/**
 * Raft 选举超时时间配置建议
 */
public class RaftTimeoutConfig {

    /**
     * 计算推荐的选举超时时间
     *
     * @param heartbeatInterval 心跳间隔（毫秒）
     * @param networkLatency    网络平均延迟（毫秒）
     * @return 推荐的选举超时时间范围（毫秒）
     */
    public static long[] recommendElectionTimeout(long heartbeatInterval, long networkLatency) {
        // 选举超时应该至少是心跳间隔的 10 倍
        long minTimeout = heartbeatInterval * 10;
        // 考虑网络延迟：超时时间应远大于网络延迟
        long latencyBasedTimeout = networkLatency * 5;
        long baseTimeout = Math.max(minTimeout, latencyBasedTimeout);

        // 随机化范围：baseTimeout ~ baseTimeout * 2
        return new long[]{baseTimeout, baseTimeout * 2};
    }

    public static void main(String[] args) {
        // 典型的 LAN 环境
        long[] lanTimeout = recommendElectionTimeout(50, 1);
        System.out.println("LAN 环境推荐选举超时: " + lanTimeout[0] + "ms ~ " + lanTimeout[1] + "ms");

        // 典型的 WAN 跨数据中心环境
        long[] wanTimeout = recommendElectionTimeout(100, 50);
        System.out.println("WAN 环境推荐选举超时: " + wanTimeout[0] + "ms ~ " + wanTimeout[1] + "ms");

        // 最佳实践配置表
        System.out.println("\n=== Raft 超时时间配置建议 ===");
        System.out.println("| 环境          | 心跳间隔 | 选举超时范围       |");
        System.out.println("|---------------|----------|-------------------|");
        System.out.println("| LAN (低延迟)  | 50ms     | 500ms ~ 1000ms    |");
        System.out.println("| WAN (跨机房)  | 100ms    | 1000ms ~ 2000ms   |");
        System.out.println("| 云环境 (中等) | 100ms    | 1000ms ~ 3000ms   |");
    }
}
```

etcd 推荐配置：

```yaml
# etcd 推荐的超时配置

# 心跳间隔：LAN 环境用 50-100ms，WAN 环境用 100-200ms
heartbeat-interval: 100

# 选举超时：至少是心跳间隔的 10 倍
election-timeout: 1000

# 快照触发阈值：根据写入量调整
snapshot-count: 10000

# 写请求超时
# (在客户端代码中配置)
```

### 问题 3：日志无限增长导致磁盘耗尽

**问题描述**：长时间运行的 Raft 集群，日志不断增长，最终导致磁盘空间耗尽，节点无法启动。

**原因分析**：

Raft 算法本身不会自动清理日志。如果不配置快照机制，所有已提交的日志条目都会保留在磁盘上。对于高频写入的系统，日志增长非常快。

**解决方案**：配置快照机制，定期对已提交的日志做快照，清理旧日志。

```java
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Raft 日志压缩和快照管理示例
 * 演示如何通过快照机制控制日志增长
 */
public class RaftLogCompaction {

    // 已提交的日志条目
    private final List<LogEntry> logEntries = new CopyOnWriteArrayList<>();
    // 最后一次快照包含的日志索引
    private final AtomicLong lastSnapshotIndex = new AtomicLong(0);
    // 快照存储路径
    private final String snapshotDir;
    // 快照触发阈值
    private final long snapshotThreshold;

    public RaftLogCompaction(String snapshotDir, long snapshotThreshold) {
        this.snapshotDir = snapshotDir;
        this.snapshotThreshold = snapshotThreshold;
        new File(snapshotDir).mkdirs();
    }

    /**
     * 日志条目
     */
    static class LogEntry implements Serializable {
        final long index;
        final long term;
        final String command;

        LogEntry(long index, long term, String command) {
            this.index = index;
            this.term = term;
            this.command = command;
        }
    }

    /**
     * 应用日志到状态机后的数据
     */
    private final ConcurrentHashMap<String, String> stateMachine = new ConcurrentHashMap<>();

    /**
     * 添加日志条目
     */
    public void appendLog(long term, String command) {
        long index = logEntries.size();
        LogEntry entry = new LogEntry(index, term, command);
        logEntries.add(entry);

        // 应用到状态机
        String[] parts = command.split(":");
        if ("PUT".equals(parts[0])) {
            stateMachine.put(parts[1], parts[2]);
        }

        // 检查是否需要做快照
        if (logEntries.size() - lastSnapshotIndex.get() >= snapshotThreshold) {
            takeSnapshot();
        }
    }

    /**
     * 创建快照并清理旧日志
     */
    public synchronized void takeSnapshot() {
        long snapshotIndex = logEntries.size() - 1;
        if (snapshotIndex <= lastSnapshotIndex.get()) {
            return;
        }

        String snapshotFile = snapshotDir + "/snapshot_" + snapshotIndex + ".dat";
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(snapshotFile))) {
            // 保存状态机数据
            oos.writeObject(new HashMap<>(stateMachine));
            oos.writeLong(snapshotIndex);

            // 清理已快照的日志
            int removeCount = (int) (snapshotIndex - lastSnapshotIndex.get());
            for (int i = 0; i < removeCount && !logEntries.isEmpty(); i++) {
                logEntries.remove(0);
            }

            lastSnapshotIndex.set(snapshotIndex);
            System.out.println("快照已创建: " + snapshotFile +
                ", 清理日志条目数: " + removeCount +
                ", 剩余日志: " + logEntries.size());
        } catch (IOException e) {
            System.err.println("快照创建失败: " + e.getMessage());
        }
    }

    /**
     * 从快照恢复
     */
    @SuppressWarnings("unchecked")
    public void loadFromSnapshot(String snapshotFile) throws Exception {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(snapshotFile))) {
            Map<String, String> loaded = (Map<String, String>) ois.readObject();
            long snapshotIndex = ois.readLong();

            stateMachine.clear();
            stateMachine.putAll(loaded);
            lastSnapshotIndex.set(snapshotIndex);
            logEntries.clear();

            System.out.println("从快照恢复成功: " + snapshotFile +
                ", 状态机大小: " + stateMachine.size());
        }
    }

    public void printStatus() {
        System.out.println("=== Raft 日志状态 ===");
        System.out.println("日志条目数: " + logEntries.size());
        System.out.println("状态机大小: " + stateMachine.size());
        System.out.println("最后快照索引: " + lastSnapshotIndex.get());

        // 计算磁盘使用
        File dir = new File(snapshotDir);
        long totalSize = 0;
        if (dir.exists()) {
            for (File f : dir.listFiles()) {
                totalSize += f.length();
            }
        }
        System.out.println("快照磁盘占用: " + (totalSize / 1024) + " KB");
    }

    public static void main(String[] args) throws Exception {
        // 每 1000 条日志做一次快照
        RaftLogCompaction raft = new RaftLogCompaction("./raft-snapshots", 1000);

        // 模拟写入 5000 条日志
        System.out.println("写入 5000 条日志...");
        for (int i = 0; i < 5000; i++) {
            raft.appendLog(1, "PUT:key" + i + ":value" + i);
        }

        raft.printStatus();
        // 输出：日志条目数约为 1000（已清理 4000），快照已创建

        // 从最新快照恢复
        File snapshotDir = new File("./raft-snapshots");
        File[] snapshots = snapshotDir.listFiles((d, name) -> name.startsWith("snapshot_"));
        if (snapshots != null && snapshots.length > 0) {
            Arrays.sort(snapshots, Comparator.comparing(File::getName).reversed());
            raft.loadFromSnapshot(snapshots[0].getAbsolutePath());
            raft.printStatus();
        }
    }
}
```

> 说明：本文仅阐述 Raft 算法的核心内容，不包括算法论证、评估等

## 参考资料

- [Raft 算法论文](https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf)
- [Raft 算法论文译文](https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md)
- [Raft 作者讲解视频](https://www.youtube.com/watch?v=YbZ3zDzDnrw&feature=youtu.be)
- [Raft 作者讲解视频对应的 PPT](http://www2.cs.uh.edu/~paris/6360/PowerPoint/Raft.ppt)
- [分布式系统的 Raft 算法](https://www.jdon.com/artichect/raft.html)
- [Raft 算法详解](https://zhuanlan.zhihu.com/p/32052223)
- [Raft: Understandable Distributed Consensus](http://thesecretlivesofdata.com/raft) - 一个动画教程
- [The Raft Consensus Algorithm](https://raft.github.io/) - 一个交互式动画教程
- [sofa-jraft](https://github.com/sofastack/sofa-jraft) - 蚂蚁金服的 Raft 算法实现库（Java 版）
