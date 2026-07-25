---
icon: devicon:hadoop
title: YARN
date: 2019-05-07 20:19:25
categories:
  - 大数据
  - Hadoop
tags:
  - 大数据
  - Hadoop
  - yarn
permalink: /pages/83e894f7/
---

# YARN

## 概述

**Apache YARN（Yet Another Resource Negotiator）** 是 Hadoop 2.0 引入的集群资源管理系统，于 2012 年正式发布。

在 Hadoop 1.x 时代，JobTracker 同时承担**资源管理**和**作业调度**两大职责，这导致了严重的单点瓶颈和扩展性问题——一个集群最多只能支撑约 4000 个节点和 40000 个并发任务。

YARN 的核心设计思想是**将资源管理与作业调度彻底分离**：
- **ResourceManager**：全局资源仲裁者，只负责资源分配
- **ApplicationMaster**：每个应用独立的调度者，负责作业的具体调度和容错

这一设计让 YARN 成为通用的资源管理平台，不仅支持 MapReduce，还可以运行 Spark、Flink、Tez、HBase 等各种计算框架，真正实现了**一个集群多种计算框架共享资源**。

## 特性

| 特性 | 说明 |
|---|---|
| **多框架支持** | 同一集群上可运行 MapReduce、Spark、Flink、Tez 等多种框架 |
| **资源细粒度管理** | 以 Container（CPU + 内存 + 磁盘 + 网络）为单位分配资源 |
| **高扩展性** | 支持万级节点集群，ResourceManager 通过 HA 解决单点问题 |
| **多租户支持** | 通过 Capacity Scheduler / Fair Scheduler 实现多用户/多队列资源隔离 |
| **数据本地性优化** | 调度时优先将 Task 分配到数据所在节点，减少网络传输 |
| **安全性** | 支持 Kerberos 认证、ACL 访问控制 |

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/4179c2265ff94f93a725957112bb5f19.png)

## 原理

### YARN 架构

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/df3fc4d6e8f64e47ac6a84468f098bcd.png)

### ResourceManager

`ResourceManager` 通常在独立的机器上以后台进程的形式运行，它是整个集群资源的主要协调者和管理者。`ResourceManager` 负责给用户提交的所有应用程序分配资源，它根据应用程序优先级、队列容量、ACLs、数据位置等信息，做出决策，然后以共享的、安全的、多租户的方式制定分配策略，调度集群资源。

### NodeManager

`NodeManager` 是 YARN 集群中的每个具体节点的管理者。主要负责该节点内所有容器的生命周期的管理，监视资源和跟踪节点健康。具体如下：

- 启动时向 `ResourceManager` 注册并定时发送心跳消息，等待 `ResourceManager` 的指令；
- 维护 `Container` 的生命周期，监控 `Container` 的资源使用情况；
- 管理任务运行时的相关依赖，根据 `ApplicationMaster` 的需要，在启动 `Container` 之前将需要的程序及其依赖拷贝到本地。

### ApplicationMaster

在用户提交一个应用程序时，YARN 会启动一个轻量级的进程 `ApplicationMaster`。`ApplicationMaster` 负责协调来自 `ResourceManager` 的资源，并通过 `NodeManager` 监视容器内资源的使用情况，同时还负责任务的监控与容错。具体如下：

- 根据应用的运行状态来决定动态计算资源需求；
- 向 `ResourceManager` 申请资源，监控申请的资源的使用情况；
- 跟踪任务状态和进度，报告资源的使用情况和应用的进度信息；
- 负责任务的容错。

### Container

`Container` 是 YARN 中的资源抽象，它封装了某个节点上的多维度资源，如内存、CPU、磁盘、网络等。当 AM 向 RM 申请资源时，RM 为 AM 返回的资源是用 `Container` 表示的。YARN 会为每个任务分配一个 `Container`，该任务只能使用该 `Container` 中描述的资源。`ApplicationMaster` 可在 `Container` 内运行任何类型的任务。例如，`MapReduce ApplicationMaster` 请求一个容器来启动 map 或 reduce 任务，而 `Giraph ApplicationMaster` 请求一个容器来运行 Giraph 任务。

### YARN 工作原理

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/085a9f5c043c49e1acc6927a50371241.png)

1. `Client` 提交作业到 YARN 上；

2. `Resource Manager` 选择一个 `Node Manager`，启动一个 `Container` 并运行 `Application Master` 实例；

3. `Application Master` 根据实际需要向 `Resource Manager` 请求更多的 `Container` 资源（如果作业很小，应用管理器会选择在其自己的 JVM 中运行任务）；

4. `Application Master` 通过获取到的 `Container` 资源执行分布式计算。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2025/02/4f284dea034b4da192f532eb2a6960b1.png)

#### 作业提交

client 调用 job.waitForCompletion 方法，向整个集群提交 MapReduce 作业 （第 1 步） 。新的作业 ID（应用 ID) 由资源管理器分配 （第 2 步）。作业的 client 核实作业的输出，计算输入的 split, 将作业的资源 （包括 Jar 包，配置文件，split 信息） 拷贝给 HDFS（第 3 步）。 最后，通过调用资源管理器的 submitApplication() 来提交作业 （第 4 步）。

#### 作业初始化

当资源管理器收到 submitApplciation() 的请求时，就将该请求发给调度器 (scheduler), 调度器分配 container, 然后资源管理器在该 container 内启动应用管理器进程，由节点管理器监控 （第 5 步）。

MapReduce 作业的应用管理器是一个主类为 MRAppMaster 的 Java 应用，其通过创造一些 bookkeeping 对象来监控作业的进度，得到任务的进度和完成报告 （第 6 步）。然后其通过分布式文件系统得到由客户端计算好的输入 split（第 7 步），然后为每个输入 split 创建一个 map 任务，根据 mapreduce.job.reduces 创建 reduce 任务对象。

#### 任务分配

如果作业很小，应用管理器会选择在其自己的 JVM 中运行任务。

如果不是小作业，那么应用管理器向资源管理器请求 container 来运行所有的 map 和 reduce 任务 （第 8 步）。这些请求是通过心跳来传输的，包括每个 map 任务的数据位置，比如存放输入 split 的主机名和机架 (rack)，调度器利用这些信息来调度任务，尽量将任务分配给存储数据的节点，或者分配给和存放输入 split 的节点相同机架的节点。

#### 任务运行

当一个任务由资源管理器的调度器分配给一个 container 后，应用管理器通过联系节点管理器来启动 container（第 9 步）。任务由一个主类为 YarnChild 的 Java 应用执行， 在运行任务之前首先本地化任务需要的资源，比如作业配置，JAR 文件，以及分布式缓存的所有文件 （第 10 步。 最后，运行 map 或 reduce 任务 （第 11 步）。

YarnChild 运行在一个专用的 JVM 中，但是 YARN 不支持 JVM 重用。

#### 进度和状态更新

YARN 中的任务将其进度和状态 （包括 counter) 返回给应用管理器，客户端每秒 （通 mapreduce.client.progressmonitor.pollinterval 设置） 向应用管理器请求进度更新，展示给用户。

#### 作业完成

除了向应用管理器请求作业进度外，客户端每 5 分钟都会通过调用 waitForCompletion() 来检查作业是否完成，时间间隔可以通过 mapreduce.client.completion.pollinterval 来设置。作业完成之后，应用管理器和 container 会清理工作状态， OutputCommiter 的作业清理方法也会被调用。作业的信息会被作业历史服务器存储以备之后用户核查。

## 应用场景

### 场景一：多框架混部共享集群资源

**背景**：某公司既有 Hive 离线报表任务（MapReduce），又有 Spark 流处理任务，以及 Flink 实时计算任务，传统方案需要为每种框架维护独立集群，资源利用率低、运维成本高。

**方案**：将所有框架部署到同一个 YARN 集群，通过 **Capacity Scheduler** 划分队列：

```xml
<!-- capacity-scheduler.xml 示例 -->
<property>
  <name>yarn.scheduler.capacity.root.queues</name>
  <value>offline,realtime,default</value>
</property>
<!-- 离线批处理队列：占 60% 集群资源 -->
<property>
  <name>yarn.scheduler.capacity.root.offline.capacity</name>
  <value>60</value>
</property>
<!-- 实时计算队列：占 30% 集群资源 -->
<property>
  <name>yarn.scheduler.capacity.root.realtime.capacity</name>
  <value>30</value>
</property>
<!-- 默认队列：占 10% 集群资源 -->
<property>
  <name>yarn.scheduler.capacity.root.default.capacity</name>
  <value>10</value>
</property>
```

**价值**：相比独立集群，资源利用率从约 40% 提升至 70%+，大幅降低硬件成本。

### 场景二：Spark 作业提交到 YARN

**背景**：数据平台团队希望将 Spark ETL 作业统一托管在 YARN 上运行，利用 YARN 的资源调度和监控能力。

```bash
# 以 YARN-cluster 模式提交 Spark 作业
# YARN-cluster 模式：Driver 运行在 YARN 的 ApplicationMaster 中，适合生产环境
spark-submit \
  --master yarn \
  --deploy-mode cluster \
  --queue offline \              # 指定提交到 offline 队列
  --executor-instances 20 \
  --executor-cores 4 \
  --executor-memory 8g \
  --driver-memory 4g \
  --class com.example.ETLJob \
  etl-job.jar

# 以 YARN-client 模式提交（Driver 在本地，适合调试）
spark-submit \
  --master yarn \
  --deploy-mode client \
  --class com.example.ETLJob \
  etl-job.jar
```

### 场景三：资源配额与多租户管理

**背景**：公司内部多个业务团队（数据分析、风控、推荐）共享同一个大数据集群，需要保证每个团队有最低资源保障，同时允许在资源空闲时弹性借用。

**方案**：使用 **Fair Scheduler（公平调度器）**，配置最小资源保障和最大资源上限：

```xml
<!-- fair-scheduler.xml 示例 -->
<allocations>
  <queue name="analytics">
    <minResources>100000 mb, 10 vcores</minResources>
    <maxResources>500000 mb, 50 vcores</maxResources>
    <weight>2.0</weight>    <!-- 公平份额权重 -->
  </queue>
  <queue name="risk">
    <minResources>50000 mb, 5 vcores</minResources>
    <maxResources>300000 mb, 30 vcores</maxResources>
    <weight>1.0</weight>
  </queue>
  <queuePlacementPolicy>
    <rule name="specified" />
    <rule name="default" />
  </queuePlacementPolicy>
</allocations>
```

## 最佳实践

### 实践一：合理配置调度器和队列

YARN 内置两种调度器：

| 调度器 | 适用场景 | 特点 |
|---|---|---|
| **FIFO Scheduler** | 开发测试环境 | 先进先出，不支持多队列 |
| **Capacity Scheduler**（默认） | 企业多部门共享集群 | 按容量百分比分配，支持层级队列 |
| **Fair Scheduler** | 多用户公平使用 | 动态平衡，短作业响应快 |

**推荐配置（Capacity Scheduler）**：
```bash
# 查看队列状态
yarn queue -status offline

# 动态更新队列配置（无需重启 ResourceManager）
yarn rmadmin -refreshQueues
```

### 实践二：开启 NodeManager 的资源本地化和 cgroup 隔离

```xml
<!-- yarn-site.xml -->
<!-- 开启 cgroup CPU 资源隔离，防止 Container 抢占 CPU -->
<property>
  <name>yarn.nodemanager.container-executor.class</name>
  <value>org.apache.hadoop.yarn.server.nodemanager.LinuxContainerExecutor</value>
</property>
<property>
  <name>yarn.nodemanager.linux-container-executor.cgroups.hierarchy</name>
  <value>/hadoop-yarn</value>
</property>
<property>
  <name>yarn.nodemanager.resource.cpu-vcores</name>
  <value>32</value>   <!-- 配置每个节点可用的虚拟 CPU 核数 -->
</property>
```

### 实践三：监控与告警

```bash
# 查看集群整体资源使用情况
yarn cluster --list-node-labels

# 查看所有运行中的应用
yarn application -list

# 查看某个应用的日志
yarn logs -applicationId application_1234567890_0001

# 查看 NodeManager 列表和健康状态
yarn node -list -all
```

## 提交作业到 YARN 上运行

这里以提交 Hadoop Examples 中计算 Pi 的 MapReduce 程序为例，相关 Jar 包在 Hadoop 安装目录的 `share/hadoop/mapreduce` 目录下：

```shell
# 提交格式：hadoop jar jar 包路径 主类名称 主类参数
hadoop jar hadoop-mapreduce-examples-2.6.0-cdh5.15.2.jar pi 3 3
```

## 常见问题

### Q1：ResourceManager 挂掉后如何快速恢复？

**方案**：配置 ResourceManager HA（Active/Standby 双 RM，通过 ZooKeeper 选举）：

```xml
<!-- yarn-site.xml -->
<property>
  <name>yarn.resourcemanager.ha.enabled</name>
  <value>true</value>
</property>
<property>
  <name>yarn.resourcemanager.cluster-id</name>
  <value>yarn-cluster</value>
</property>
<property>
  <name>yarn.resourcemanager.ha.rm-ids</name>
  <value>rm1,rm2</value>
</property>
<property>
  <name>yarn.resourcemanager.zk-address</name>
  <value>zk1:2181,zk2:2181,zk3:2181</value>
</property>
```

### Q2：Container 被 YARN 杀掉，报 `Container killed on request` 怎么解决？

**原因**：Container 使用的物理内存超过 `yarn.nodemanager.vmem-pmem-ratio`（默认 2.1 倍）限制。

**解决方案**：
1. 增大申请的 Container 内存（`--executor-memory` 参数）
2. 关闭虚拟内存检查（不推荐）：`yarn.nodemanager.vmem-check-enabled=false`
3. 调大虚拟/物理内存比：`yarn.nodemanager.vmem-pmem-ratio=3`

### Q3：作业长时间处于 ACCEPTED 状态（等不到资源）怎么解决？

**原因**：集群资源不足，或队列资源已满。

**排查步骤**：
```bash
# 查看集群可用资源
yarn cluster --list-node-labels
# 查看队列资源使用情况
yarn queue -status <queue-name>
# 查看作业等待原因
yarn application -status <application-id>
```

**解决方案**：增加集群节点、调整队列容量、或终止低优先级作业释放资源。

## 参考资料

- [Apache Hadoop YARN 官方文档](http://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html)
- [YARN Capacity Scheduler 文档](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/CapacityScheduler.html)
- [YARN Fair Scheduler 文档](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/FairScheduler.html)
- [Hadoop 权威指南（第 4 版）](https://book.douban.com/subject/27115351/)
- [初步掌握 Yarn 的架构及原理](https://www.cnblogs.com/codeOfLife/p/5492740.html)
- [深入浅出 Hadoop YARN](https://zhuanlan.zhihu.com/p/54192454)
