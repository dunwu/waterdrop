---
title: 分布式理论
date: 2022-06-23 17:17:18
categories:
  - 分布式
  - 分布式理论
tags:
  - 分布式
  - 理论
permalink: /pages/86cdf2/
hidden: true
index: false
---

# 分布式理论

## 📖 内容

- [分布式理论](01.分布式基础理论.md) - 关键词：`拜占庭将军`、`错误的分布式假设`
- [逻辑时钟](02.逻辑时钟.md) - 关键词：`逻辑时钟`、`向量时钟`、`版本时钟`、`全序`、`偏序`
- [分布式一致性](03.分布式一致性.md) - 关键词：`ACID`、`CAP`、`BASE`、`强一致性`、`最终一致性`
- [拜占庭将军问题](10.拜占庭将军问题.md) - 关键词：`共识性`
- [Paxos 算法](11.Paxos算法.md) - 关键词：`Paxos`
- [Raft 算法](12.Raft算法.md) - 关键词：`Raft`
- [Gossip 算法](13.Gossip算法.md) - 关键词：`Gossip`
- [ZAB 协议](14.Zab协议.md) - 关键词：`ZAB`、`ZooKeeper`

## 📚 资料

#### 分布式理论综合资料

- **教程**
  - [**MIT-6.824**](https://pdos.csail.mit.edu/6.824/index.html) - 麻省理工分布式系统课程
  - [**CMU-15-440**](http://www.cs.cmu.edu/~dga/15-440/S14/) - 卡内基梅隆分布式系统课程
  - [**Standford-CS244b**](https://www.scs.stanford.edu/14au-cs244b/) - 斯坦福分布式系统课程
  - [**UC Berkley-CS294-91**](https://people.eecs.berkeley.edu/~alig/cs294-91/)- 伯克利分布式计算课程
  - [**分布式技术原理与算法解析**](https://time.geekbang.org/column/intro/100036401) - 极客时间教程
  - [**分布式协议与算法实战**](https://time.geekbang.org/column/intro/100046101) - 极客时间教程
- **书籍**
  - [**分布式系统原理与范型**](https://book.douban.com/subject/11691266/)：书原名 Distributed Systems Principles and Paradigms。经典分布式教程，介绍了分布式系统的七大核心原理，并给出了大量的例子；系统讲述了分布式系统的概念和技术，包括通信、进程、命名、同步化、一致性和复制、容错以及安全等。
- **文章**
  - [**Solution of a Problem in Concurrent Programming Control**](https://dl.acm.org/doi/pdf/10.1145/365559.365617)，[**译文**](http://duanple.com/?p=1022) - Dijkstra 首次提出并解决了互斥执行问题
  - [**Time, Clocks, and the Ordering of Events in a Distributed System**](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)，[**译文**](https://cloud.tencent.com/developer/article/1163428)，[**解读**](https://zhuanlan.zhihu.com/p/56146800) - Lamport 介绍 happened before、偏序关系（partial ordering）、逻辑时钟（Logical Clocks）概念，提出解决分布式系统中区分事件发生的时序问题的方法。
  - [**Virtual Time and Global States of Distributed Systems**](http://courses.csail.mit.edu/6.852/01/papers/VirtTime_GlobState.pdf)，[**解读**](https://zhuanlan.zhihu.com/p/56886156) - 逻辑时钟无法描述事件的因果关系。本文提出了向量时钟，这种算法利用了向量这种数据结构将全局各个进程的逻辑时间戳广播给各个进程，通过向量时间戳就能够比较任意两个事件的因果关系。
  - [**Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services**](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf)，[**解读**](https://juejin.cn/post/6844903936718012430) - 经典的 CAP 理论，即：在一个分布式系统中，当发生网络分区时，那么强一致性和可用性只能二选一。
  - [**CAP Twelve Years Later: How the “Rules” Have Changed**](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/) - CAP 理论的新解读，并阐述 CAP 理论的一些常见误区。
  - [**BASE: An Acid Alternative**](https://www.semanticscholar.org/paper/BASE%3A-An-Acid-Alternative-Pritchett/2e72e6c022dd33115304ecfcb6dad7ea609534a4)，[**译文**](https://www.cnblogs.com/savorboard/p/base-an-acid-alternative.html) - BASE 理论是对 CAP 中一致性和可用性的权衡，提出采用适当的方式来使系统达到最终一致性。
  - [**A Simple Totally Ordered Broadcast Protocol**](https://diyhpl.us/~bryan/papers2/distributed/distributed-systems/zab.totally-ordered-broadcast-protocol.2008.pdf) - 概述 ZooKeeper 的全序广播协议（Zab）
  - [**The Eight Fallacies of Distributed Computing - Tech Talk**](https://web.archive.org/web/20171107014323/http://blog.fogcreek.com/eight-fallacies-of-distributed-computing-tech-talk/) - 分布式系统新手常犯的 8 个错误，并探讨了其会带来的影响。
  - [**Distributed Systems for Fun and Profit**](http://book.mixu.net/distsys/) - 一本学习小册，涵盖了分布式系统中的关键问题，包括时间的作用和不同的复制策略。
  - [**A Note on Distributed System**s](https://scholar.harvard.edu/files/waldo/files/waldo-94.pdf) - 这是一篇经典的论文，讲述了为什么在分布式系统中，远程交互不能像本地对象那样进行。
  - [**深度探索分布式理论经典论文**](https://zhuanlan.zhihu.com/p/338161857) - 分布式理论论文的导读文章
  - [**Distributed Systems for fun and profit**](http://book.mixu.net/distsys/single-page.html)：分为五章，讲述了扩展性、可用性、性能和容错等基础知识，FLP 不可能性和 CAP 定理，探讨了大量的一致性模型；讨论了时间和顺序，及时钟的各种用法。随后，探讨了复制问题，如何防止差异，以及如何接受差异。此外，每章末尾都给出了针对本章内容的扩展阅读资源列表，这些资料是对本书内容的很好补充。
  - [**An introduction to distributed systems**](https://github.com/aphyr/distsys-class) - 这是一份分布式系统的提纲挈领的介绍，几乎涵盖了所有知识点，并辅以简洁并切中要害的说明文字，适合初学者了解知识全貌，快速与现有知识结合，形成知识体系。

#### 分布式算法资料

- **视频**
  - [**拜占庭将军问题视频讲解**](https://www.bilibili.com/video/av78588312/) - 李永乐老师通俗讲解拜占庭问题
  - [**Paxos 算法讲解视频**](https://www.youtube.com/watch?v=d7nAGI_NZPk)
  - [**Raft 作者讲解 Paxos 视频**](https://www.bilibili.com/video/av36556594)
  - [**Raft 作者讲解视频**](https://www.youtube.com/watch?v=YbZ3zDzDnrw&feature=youtu.be)
  - [**Raft 作者讲解视频对应的 PPT**](http://www2.cs.uh.edu/~paris/6360/PowerPoint/Raft.ppt)
  - [**一致性算法（Paxos、Raft、Zab）**](https://www.bilibili.com/video/BV1TW411M7Fx?from=search&seid=11524608198747599965)
- **动画**
  - [**Raft: Understandable Distributed Consensus**](http://thesecretlivesofdata.com/raft) - 分布式一致性算法 Raft 的动画教程
  - [**The Raft Consensus Algorithm**](https://raft.github.io/) - 分布式一致性算法 Raft 的交互式动画教程
  - [**Goosip 协议仿真动画**](https://flopezluis.github.io/gossip-simulator/)
- **文章**
  - [**The Byzantine Generals Problem**](https://lamport.azurewebsites.net/pubs/byz.pdf) - Lamport 提出拜占庭将军问题——一种解决分布式系统一致性问题的理论。
  - [**The Part-Time Parliament**](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf) - Lamport 提出分布式一致性算法 Paxos。
  - [**Paxos Made Simple**](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)，[**译文**](http://duanple.com/?p=166)，[**解读**](https://zhuanlan.zhihu.com/p/31780743) - Lamport 重新阐述 Paxos。
  - [**Paxos Made Live: An Engineering Perspective**](https://www.cs.utexas.edu/users/lorenzo/corsi/cs380d/papers/paper2-1.pdf)，[**译文**](https://blog.mrcroxx.com/posts/paper-reading/paxos-made-live/) - 讲述了 Google 在最初实现 Paxos 碰到的一系列问题及解决方案。
  - [**How to Build a Highly Availability System using Consensus**](http://bwl-website.s3-website.us-east-2.amazonaws.com/58-Consensus/Acrobat.pdf)，[**译文**](http://duanple.com/?p=63) - 以 Paxos 为实例，讲述了如何描述、解决、理解、证明分布式算法。
  - [**Using Paxos to Build a Scalable, Consistent, and Highly Available Datastore**
    **Impossibility of Distributed Consensus With One Faulty Process**](https://arxiv.org/pdf/1103.2408) - 讲述了 LinkedIn 是如何利用 Paxos 和 ZooKeeper 构建一个名为 Spinnaker 的 KV 数据库。
  - [**Raft: In Search of an Understandable Consensus Algorithm**](https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf)，[**译文**](https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md)，[**解读**](https://zhuanlan.zhihu.com/p/32052223) - 分布式一致性算法 Raft
  - [**A Brief History of Consensus, 2PC and Transaction Commit**](https://betathoughts.blogspot.com/2007/06/brief-history-of-consensus-2pc-and.html) - 一致性, 两阶段提交和事务提交的发展史
  - [**Consensus in the Presence of Partial Synchrony**](https://dl.acm.org/doi/pdf/10.1145/42282.42283) - 部分同步的一致性
  - [**Epidemic Algorithms for Replicated Database Maintenance**](http://bitsavers.trailing-edge.com/pdf/xerox/parc/techReports/CSL-89-1_Epidemic_Algorithms_for_Replicated_Database_Maintenance.pdf)，[**解读**](https://zhuanlan.zhihu.com/p/41228196) - 论文提出 Gossip 协议及应用
  - [**INTRODUCTION TO GOSSIP**](https://managementfromscratch.wordpress.com/2016/04/01/introduction-to-gossip/) - Gossip 协议介绍
- **工具**
  - [sofa-jraft](https://github.com/sofastack/sofa-jraft) - 蚂蚁金服的 Raft 算法实现库（Java 版）

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾