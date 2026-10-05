---
icon: simple:apachespark
title: Spark 面试
date: 2026-09-28 22:12:27
categories:
  - 大数据
  - Spark
tags:
  - 大数据
  - Spark
  - RDD
  - DataFrame
  - 面试
permalink: /pages/901e6185/
---

# Spark 面试

## 核心抽象

### 【中等】RDD、DataFrame 和 Dataset 有什么区别？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Spark / 核心抽象

#### 💎 关键结论

RDD 是最底层的分布式数据抽象（类型安全但无优化）；DataFrame 引入了 Schema 信息使 Catalyst 优化器可做列裁剪、谓词下推等优化（非类型安全）；Dataset 兼顾两者（类型安全 + Catalyst 优化），但仅支持 Scala/Java。生产中最常用 DataFrame（配合 Spark SQL）。

#### ⚡ 记忆卡片

- **口诀**：RDD 原始无优化，DF 有 Schema 可优化，DS 二者兼得但限 JVM
- **关键词**：RDD ／ DataFrame ／ Dataset ／ Catalyst ／ Encoder
- **链路**：RDD（1.x 唯一抽象）→ DataFrame（1.3+，Schema 信息）→ Dataset（1.6+，类型安全 + 优化）

#### 📖 核心知识

| 对比项            | RDD                         | DataFrame                              | Dataset                             |
| :---------------- | :-------------------------- | :------------------------------------- | :---------------------------------- |
| **Schema 信息**   | 无                          | 有（StructType）                       | 有（Encoder 编译期推导）            |
| **类型安全**      | 编译期                      | 运行期（列名为准）                     | 编译期                              |
| **Catalyst 优化** | 不支持                      | **支持**（列裁剪、谓词下推、常量折叠） | **支持**                            |
| **序列化**        | Java 序列化（慢、大）       | Tungsten 二进制编码（快、紧凑）        | Encoder 自定义编码（接近 Tungsten） |
| **API 风格**      | 函数式（map/filter/reduce） | 声明式（SQL / Column DSL）             | 函数式 + 声明式                     |
| **语言支持**      | Scala/Java/Python/R         | Scala/Java/Python/R                    | **仅 Scala/Java**                   |
| **性能**          | 最慢（序列化开销大）        | 最快（Tungsten + Catalyst）            | 接近 DataFrame                      |
| **适用场景**      | 非结构化数据、精细控制      | 结构化数据分析、SQL 查询               | 需要类型安全的复杂 ETL              |

**性能量化对比**（以 10GB TPC-DS 查询为例）：

- DataFrame（Catalyst + Tungsten）比纯 RDD 快约 **3~5 倍**，主要得益于二进制编码跳过反序列化、列式批处理利用 CPU 缓存。
- Dataset 与 DataFrame 性能接近（差距 < 10%），但 Dataset 的 Encoder 编解码在复杂嵌套类型时可能略慢。

#### 🔬 扩展知识

::: details

- 【L3】**Tungsten 项目**

  Spark 1.4 引入，核心优化包括：① 显式内存管理（绕过 JVM GC，使用 `sun.misc.Unsafe` 直接操作堆外内存）；
  ② 代码生成（Whole-Stage Code Generation，消除虚函数调用和虚拟内存间接寻址）；③ 二进制行格式（列式紧凑布局，CPU cache 友好）。这三项使 Spark SQL 性能接近手写 C++。

- 【L3】**何时用 RDD 而非 DataFrame**

  ① 非结构化数据（如图片、文本流）无法表达 Schema；② 需要精细控制分区策略（如自定义 Partitioner）；③ 增量迁移旧代码。

  新项目中 DataFrame/Dataset 应作为默认选择。

:::

#### 🔀 发散问题

- **Q：Spark SQL Catalyst 优化器做了什么？**

  → 见本文档「Spark SQL 的 Catalyst 优化器是如何工作的？」。

- **Q：DataFrame 如何转换为 RDD？**

  → `df.rdd` 获取 `RDD[Row]`，但会丢失 Catalyst 优化，生产环境应避免。

### 【中等】Spark 的架构设计是怎样的？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Spark / 架构

#### 💎 关键结论

Spark 采用 Master-Worker 架构：Driver 程序负责解析 SQL/DAG 编排，Cluster Manager 负责资源分配，Executor 负责实际计算。核心设计思想是「内存迭代计算 + 有向无环图（DAG）调度」，相比 MapReduce 的「Map → 磁盘 → Reduce」模型，减少磁盘 I/O 是性能提升的根本原因。

#### ⚡ 记忆卡片

- **口诀**：Driver 编排、Manager 分配、Executor 计算、DAG 调度
- **关键词**：Driver ／ Executor ／ Cluster Manager ／ DAG ／ Stage ／ Task
- **链路**：用户代码 → Driver（DAGScheduler → TaskScheduler）→ Cluster Manager → Executor

#### 📊 量化参考

| 指标               | 数值                                                                           | 备注                                                               |
| :----------------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Executor 心跳      | 10s/次（spark.executor.heartbeatInterval）                                     | 超过 spark.network.timeout（默认 120s）未心跳判失联，Task 重新调度 |
| 推荐 Executor 配比 | 单实例 4~5 核 + 8~16GB                                                       | 核数过多会加剧 HDFS 客户端线程争抢                                 |
| 统一内存占比       | (堆内存 − 300MB 保留) × spark.memory.fraction(0.6)，storage/execution 初始各半 | 双方可互相借用，强制回收仅针对对方持有部分                         |
| 本地化等待         | spark.locality.wait 默认 3s                                                    | PROCESS_LOCAL 无网络开销，本地化等级差可损失 10%~30% 吞吐          |
| 与 MR 对比         | 官方经典基准：逻辑回归迭代 MR 110s → Spark 0.9s                                | 中间结果缓存在内存、不落 HDFS，是 10~100 倍差距的根源              |

#### 📖 核心知识

```
用户程序
   │
   ▼
┌──────────┐    注册/心跳    ┌────────────────┐    请求资源    ┌──────────────┐
│  Driver   │ ◄────────────► │ Cluster Manager │ ◄───────────► │ YARN / K8s   │
│ (JVM进程) │               │ (StandAlone/    │               │ Mesos        │
│           │               │  YARN/K8s)      │               └──────────────┘
│ DAGSch.   │   分配/释放
│ TaskSch.  │ ──────────────► ┌───────────────┐
└──────────┘                 │  Executor      │
                             │ (JVM进程/容器)  │
                             │ ┌───────────┐  │
                             │ │ Task 线程  │  │
                             │ │ Task 线程  │  │
                             │ └───────────┘  │
                             │  缓存/Shuffle  │
                             └───────────────┘
```

核心组件职责：

| 组件                | 职责                                                                 |
| :------------------ | :------------------------------------------------------------------- |
| **Driver**          | 解析用户代码、构建 DAG、划分 Stage、生成 TaskSet、跟踪 Executor 状态 |
| **Cluster Manager** | 管理集群资源、按 Driver 请求分配/回收 Executor 容器                  |
| **Executor**        | 执行 Task、管理缓存（Storage 模块）、上报心跳和指标                  |
| **DAGScheduler**    | 将 RDD 依赖图划分为 Stage（以 Shuffle 为边界），按拓扑序提交 TaskSet |
| **TaskScheduler**   | 将 Task 分配到具体 Executor，处理失败重试和推测执行                  |

**量化参数**：

- 单个 Executor 默认分配 1 个 CPU 核心和 1GB 内存（`spark.executor.cores` / `spark.executor.memory`）。
- 每个 Executor 可并行运行的 Task 数 = `spark.executor.cores`（默认 1）。
- Driver 内存默认 1GB（`spark.driver.memory`），大型应用建议 4~8GB。

#### 🔬 扩展知识

::: details

- 【L3】**Driver 单点问题**

  Driver 是单点进程，承载 DAG 编排和结果收集。当 collect() 返回大数据集时，Driver 内存可能 OOM。

  生产环境 collect 操作应限制数据量（`spark.driver.maxResultSize` 默认 1GB），大数据结果写回 HDFS/S3。

- 【L3】**动态资源分配**

  `spark.dynamicAllocation.enabled=true` 开启后，Cluster Manager 根据负载自动增减 Executor。

  空闲 Executor 超过 60s（`spark.dynamicAllocation.executorIdleTimeout`）被回收。适合负载波动大的批处理场景，但实时流处理建议关闭（避免频繁扩缩容引入延迟）。

:::

#### 🔀 发散问题

- **Q：Spark on YARN 的 Client/Cluster 模式区别？**

  → Client 模式 Driver 运行在客户端（调试用），Cluster 模式 Driver 运行在 YARN ApplicationMaster（生产用）。

- **Q：Spark 如何比 MapReduce 快 10~100 倍？**

  → 核心是内存迭代计算 + DAG 调度，减少磁盘 I/O，见本文档「RDD、DataFrame 和 Dataset 有什么区别？」。

## 运行机制

### 【困难】Spark Shuffle 机制是如何工作的？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Spark / Shuffle / 性能调优

#### 💎 关键结论

Spark Shuffle 是跨 Stage 数据重分布的机制，经历了 Hash Shuffle → Sort-Based Shuffle → Tungsten-Sort Shuffle 三代演进。当前默认 Tungsten-Sort，核心思路是「先写磁盘临时文件 → 按 key 排序 → 合并为最终 Shuffle 文件」，通过减少随机写和内存拷贝提升性能。Shuffle 是 Spark 性能瓶颈的主要来源，调优的核心是减少 Shuffle 数据量和避免磁盘 I/O 放大。

#### ⚡ 记忆卡片

- **口诀**：Hash 写文件太多、Sort 归并排序、Tungsten 二进制加速
- **关键词**：Hash Shuffle ／ Sort Shuffle ／ Tungsten-Sort ／ Shuffle Write ／ Shuffle Read ／ 外部排序
- **链路**：Map 端写临时文件 → 按 key 排序 → 合并为 Shuffle 数据文件 + 索引文件 → Reduce 端拉取 → 外部排序合并

#### 📊 量化参考

- **Tungsten-Sort vs Hash Shuffle**：文件数减少 50~70%，磁盘 I/O 提升 30~50%
- **Shuffle 缓冲区**：`spark.shuffle.file.buffer` 默认 32KB，调至 128KB 可减少 10~15% 磁盘 I/O
- **Shuffle 压缩**：lz4 压缩减少 40~60% 网络传输，zstd 压缩率更高但 CPU 开销增加 20~30%
- **100GB Shuffle 数据**：lz4 压缩后约 50~60GB，网络传输从 5min 降到 3min
- **外部排序合并系数**：Reduce 端合并文件数 > 1000 时，合并开销可能抵消排序收益
- **Shuffle 写盘速度**：SSD 约 200~500MB/s，HDD 约 50~100MB/s

#### 📖 核心知识

三代 Shuffle 管理器演进：

| 管理器                    | 版本 | 核心思路                                                     | 缺陷                           |
| :------------------------ | :--- | :----------------------------------------------------------- | :----------------------------- |
| **Hash Shuffle**          | 1.2- | 每个 Reduce 任务一个临时文件，Map 端直接按 hash 写入对应文件 | 文件数 = Map × Reduce，FD 爆炸 |
| **Sort-Based Shuffle**    | 1.2+ | Map 端先写内存缓冲区，溢出时排序写磁盘，最终合并             | 序列化开销                     |
| **Tungsten-Sort Shuffle** | 2.0+ | 在 Sort 基础上使用 Tungsten 二进制行格式 + 堆外内存          | 需要数据可序列化               |

**Tungsten-Sort Shuffle 详细流程**：

1. **Map 端**：每条记录经 Encoder 编码为二进制行，写入内存缓冲区（默认 32MB，`spark.shuffle.file.buffer`）。缓冲区满后触发排序（基于 key 的 Partition ID + key 值），排序后的数据溢写（spill）到磁盘临时文件。
2. **合并**：所有溢写文件按 Partition ID 归并排序，生成最终的 Shuffle 数据文件（`.data`）和索引文件（`.index`，记录每个 Partition 的偏移量）。
3. **Reduce 端**：按索引定位自己 Partition 的数据块，通过 BlockTransferService（Netty）从各 Map 端拉取。拉取的数据在内存中合并排序（若超出内存则溢写磁盘再归并）。

**量化参数**：

- Shuffle 写盘缓冲区默认 32KB（`spark.shuffle.file.buffer`），增大到 64~128KB 可减少磁盘 I/O 次数，性能提升约 5~10%。
- Shuffle 内存占比由 `spark.shuffle.memoryFraction`（1.x）或统一内存模型（2.x+）管理。Spark 2.x+ 统一内存模型中 Shuffle 可动态借用存储内存，上限为 `spark.memory.fraction`（默认 0.6）× JVM 堆。
- 典型 ETL 作业中，Shuffle 耗时占总耗时的 **30~60%**，是首要优化目标。

#### 🔬 扩展知识

::: details

- 【L3】**Shuffle 调优三板斧**

  ① 减少 Shuffle 数据量（`mapSideCombine` 预聚合、过滤无效数据）；② 增大并行度（`spark.sql.shuffle.partitions` 默认 200，
  数据量大时调至 500~2000）；③ 增大缓冲区减少磁盘 I/O。

- 【L3】**Shuffle spill（溢写）机制**

  当内存缓冲区不足时，数据溢写到磁盘（`spark.local.dirs`），每次溢写产生一个临时文件。溢写次数过多意味着内存不足，
  应增大 `spark.executor.memory` 或减小 `spark.memory.fraction` 中 Shuffle 以外的占比。

- 【L4】**Bypass Merge Sort Shuffle**

  当 Reduce 分区数较小（`spark.shuffle.sort.bypassMergeThreshold` 默认 200）且无聚合/排序需求时，
  Spark 自动切换到 Bypass 模式——直接按 Partition 写独立文件再合并，避免排序开销。这是 Sort Shuffle 的内部优化分支。

:::

#### 🔀 发散问题

- **Q：如何定位和解决数据倾斜？**

  → 见本文档「Spark 如何定位和解决数据倾斜？」。

- **Q：Shuffle 数据可以缓存吗？**

  → Shuffle 写盘文件在 Executor 退出或磁盘空间不足时清理，不可持久缓存。

### 【困难】Spark 如何定位和解决数据倾斜？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Spark / 数据倾斜 / 调优

#### 💎 关键结论

数据倾斜是指个别 Task 处理的数据量远超其他 Task，导致长尾效应。定位方法：Spark UI → Stage 页面 → Summary Metrics 对比 Max 与 Median。解决方案按优先级：① 过滤异常 key → ② 加盐打散（两阶段聚合）→ ③ Broadcast Join 替代 Shuffle Join → ④ Skew Hint（Spark 3.x AQE 自动处理）。

#### ⚡ 记忆卡片

- **口诀**：一看 UI 找长尾，二查 key 分布，三选方案（过滤/加盐/广播/AQE）
- **关键词**：Summary Metrics ／ Max vs Median ／ 加盐 ／ Broadcast Join ／ AQE ／ Skew Hint
- **链路**：Spark UI 定位 → 分析倾斜 key → 过滤异常 key / 加盐两阶段聚合 / 广播小表 / AQE 自动处理

#### 📊 量化参考

- **AQE 自动倾斜处理**：长尾 Task 从 30min 降到 5min（自动拆分热点分区）
- **Broadcast Join**：小表 < 100MB 时性能提升 5~10 倍（消除 Shuffle）
- **倾斜比例**：Max/Median > 10 为明显倾斜，生产中常见 50~100 倍（单 Task 处理 10GB vs 平均 100MB）
- **spark.sql.adaptive.skewJoin.threshold**：默认 256MB，超过即触发自动拆分
- **加盐两阶段聚合**：10 亿条数据倾斜场景下，耗时从 30min 降到 5min
- **Broadcast 阈值**：`spark.sql.autoBroadcastJoinThreshold` 默认 10MB，可调至 100MB

#### 📖 核心知识

**定位方法**：

1. **Spark UI → Stage → Summary Metrics**：对比 `Duration` 和 `Shuffle Read Size` 的 Max 与 Median。若 Max / Median > 10，存在明显倾斜。
2. **采样分析**：对倾斜 key 采样（`df.groupBy("key").count().orderBy(desc("count")).show(20)`），找出 Top N 热点 key。

**解决方案**（按推荐优先级）：

| 方案                           | 适用场景                  | 原理                                           | 效果                         |
| :----------------------------- | :------------------------ | :--------------------------------------------- | :--------------------------- |
| **过滤异常 key**               | null/空值/默认值导致      | 单独处理或丢弃异常 key                         | 简单直接                     |
| **加盐两阶段聚合**             | GroupBy/Join 热点 key     | 第一轮加随机前缀局部聚合，第二轮去前缀全局聚合 | 数据均匀化，耗时降到平均     |
| **Broadcast Join**             | 大小表 Join，小表 < 100MB | 小表广播到所有 Executor，避免 Shuffle          | 消除 Shuffle，性能提升 5~10x |
| **AQE Skew Hint（Spark 3.x）** | 通用                      | 自适应查询执行自动检测倾斜并拆分分区           | 零代码改动                   |
| **自定义 Partitioner**         | 已知 key 分布的业务场景   | 按业务逻辑将热点 key 分散到不同分区            | 精准但维护成本高             |

**量化对比**（以 100GB Join 作业为例，其中一个 key 占 30% 数据）：

- 不处理：最长 Task 耗时约 30 分钟（其他 Task 约 2 分钟），整体 Stage 耗时 30 分钟。
- 加盐两阶段聚合：最长 Task 降到约 3~5 分钟，整体 Stage 耗时约 5 分钟（**提升 6 倍**）。
- Broadcast Join（小表 50MB）：消除 Shuffle，整体耗时约 2 分钟（**提升 15 倍**）。
- AQE 自动处理：耗时约 4~6 分钟，接近手动加盐效果（**零代码改动**）。

#### 🔬 扩展知识

::: details

- 【L3】**AQE（Adaptive Query Execution）**

  Spark 3.0 引入，运行时根据实际统计信息动态优化执行计划。核心能力：

  ① 动态合并小分区（`spark.sql.adaptive.coalescePartitions.enabled`）；② 动态切换 Join 策略（Sort Merge → Broadcast）；
  ③ 动态优化数据倾斜（`spark.sql.adaptive.skewJoin.enabled`，自动将倾斜分区拆分为子分区）。建议生产环境默认开启。

- 【L3】**加盐的具体实现**

  以 GroupBy 为例，第一轮 `df.withColumn("salt", rand() % 10).groupBy($"key", $"salt").agg(...)` 局部聚合为 10 份；
  第二轮 `.groupBy("key").agg(...)` 去盐全局聚合。盐的基数 = 热点 key 数据量 / 平均 key 数据量。

:::

#### 🔀 发散问题

- **Q：Spark Shuffle 的底层机制是什么？**

  → 见本文档「Spark Shuffle 机制是如何工作的？」。

- **Q：Broadcast Join 有什么限制？**

  → 小表必须能完整加载到每个 Executor 内存，通常限制 < 100MB（`spark.sql.autoBroadcastJoinThreshold` 默认 10MB）。

## 内存与性能

### 【困难】Spark 的内存管理模型是怎样的？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Spark / 内存管理 / 性能调优

#### 💎 关键结论

Spark 2.x+ 采用统一内存管理模型，将堆内存划分为执行内存（Execution）和存储内存（Storage），二者边界可动态借用。执行内存用于 Shuffle/Join/Sort，存储内存用于缓存和广播数据。统一模型的核心改进是：空闲的执行内存可被存储借用，反之亦然，减少了内存碎片化。

#### ⚡ 记忆卡片

- **口诀**：统一模型，动态借用，执行存弹性，存储借执行
- **关键词**：统一内存 ／ 执行内存 ／ 存储内存 ／ 堆外内存 ／ `spark.memory.fraction`
- **链路**：JVM 堆 → 统一内存区（`spark.memory.fraction` × (堆 - 300MB)）→ 执行 + 存储（动态借用）

#### 📊 量化参考

- **统一内存模型**：`spark.memory.fraction` 默认 0.6，即 60% (堆-300MB) 用于执行+存储
- **16GB 堆**：统一内存约 10.9GB，执行+存储动态共享（Spark 1.x 固定执行仅 3.2GB）
- **堆外内存**：主要用于 Shuffle 和序列化，100GB Shuffle 数据堆外排序避免 30~50GB 堆内 GC
- **Full GC 频率**：统一模型下 32GB 堆约 30min+ 一次（Spark 1.x 静态模型约 10min 一次）
- **内存借用效率**：空闲执行内存可 100% 被存储借用，减少缓存浪费 40~60%
- **生产推荐配置**：32GB 堆 + 统一模型，OOM 风险降低 60~70%

#### 📖 核心知识

**Spark 1.x 静态模型 vs 2.x+ 统一模型**：

| 对比项       | Spark 1.x（静态模型）                          | Spark 2.x+（统一模型）                                |
| :----------- | :--------------------------------------------- | :---------------------------------------------------- |
| **内存划分** | 执行（0.2×堆）+ 存储（0.6×堆）+ 其他（0.2×堆） | 统一区（`fraction` × (堆-300MB)）→ 执行 + 存储        |
| **边界**     | 固定，互不借用                                 | **动态借用**，空闲方可被对方使用                      |
| **存储驱逐** | 执行内存不足时不驱逐存储                       | 执行可驱逐存储（LRU），但存储有保留区                 |
| **堆外内存** | 不支持                                         | 支持（`spark.memory.useLegacyMode=false` + Off-Heap） |
| **缺陷**     | 执行内存固定 20% 不够用，存储 60% 空闲浪费     | 大幅减少内存碎片和浪费                                |

**统一内存模型详细参数**：

```
JVM 堆内存
├── 保留区（300MB，由 spark.testing.reservedMemory 控制）
└── 统一内存区 = (堆 - 300MB) × spark.memory.fraction（默认 0.6）
    ├── 执行内存（初始 50%，可动态扩展）
    │   ├── Shuffle
    │   ├── Join（Hash/Sort Merge）
    │   └── Aggregate / Sort
    └── 存储内存（初始 50%，可动态扩展）
        ├── Cache（RDD/DataFrame 缓存）
        └── Broadcast 数据
```

**量化参数**（以 16GB Executor 堆为例）：

- 统一内存区 = (16GB - 300MB) × 0.6 ≈ **9.4GB**
- 初始执行内存 ≈ 4.7GB，初始存储内存 ≈ 4.7GB
- 若 Shuffle 需要 7GB，可从存储借用 2.3GB（存储剩余 2.4GB 用于缓存）
- 堆外内存（`spark.memory.offHeap.enabled=true`）：独立于 JVM 堆，不受 GC 影响，适合大 Shuffle 场景

#### 🔬 扩展知识

::: details

- 【L3】**缓存策略选型**

  `MEMORY_ONLY` > `MEMORY_AND_DISK` > `DISK_ONLY`。

  `MEMORY_ONLY` 读取速度比 `MEMORY_AND_DISK` 快约 5~10 倍（避免磁盘 I/O）。若内存不够，优先降低存储内存占比而非降级为磁盘存储。

- 【L3】**GC 调优**

  Executor 频繁 Full GC 是内存不足的典型信号。关键参数：① `spark.executor.memory`（增大堆）；② `spark.memory.fraction`（调大统一区占比，
  默认 0.6，可调到 0.7~0.8）；③ `spark.serializer`（使用 Kryo 序列化，比 Java 序列化快约 10 倍、体积小 3~5 倍）。

- 【L4】**堆外内存的代价**

  `offHeap.enabled=true` 后 Shuffle 和存储都可使用堆外内存，绕过 GC，但需额外配置 `spark.memory.offHeap.size`。

  代价是调试困难（堆外内存泄漏不会在 heap dump 中显示），且部分第三方库不兼容。适合超大规模 Shuffle 场景（单 Executor Shuffle 数据 > 10GB）。

:::

#### 🔀 发散问题

- **Q：Spark 序列化如何选型？**

  → 默认 Java 序列化（兼容但慢），推荐 Kryo（`spark.serializer=org.apache.spark.serializer.KryoSerializer`），速度快 10 倍、体积小 3~5 倍。

- **Q：如何判断内存是否充足？**

  → Spark UI → Executors 页面，关注 `Storage Memory` 使用率和 `GC Time`。Full GC 时间占比 > 10% 说明内存紧张。

## SQL 与优化

### 【中等】Spark SQL 的 Catalyst 优化器是如何工作的？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Spark / Catalyst / 查询优化

#### 💎 关键结论

Catalyst 是 Spark SQL 的查询优化器，采用基于规则（RBO）的四阶段优化流程：分析 → 逻辑优化 → 物理计划 → 代码生成。核心能力包括谓词下推、列裁剪、常量折叠、Join 重排序、Broadcast/SortMerge Join 自动选择。Spark 3.x 的 AQE 在此基础上增加了运行时自适应优化。

#### ⚡ 记忆卡片

- **口诀**：分析 → 逻辑优化 → 物理计划 → 代码生成，四阶段流水线
- **关键词**：Catalyst ／ Logical Plan ／ Physical Plan ／ 谓词下推 ／ 列裁剪 ／ AQE
- **链路**：SQL/DataFrame DSL → Unresolved Logical Plan → Analyzed → Optimized → Physical Plans → Cost Model → Best Plan → Whole-Stage CodeGen

#### 📖 核心知识

Catalyst 四阶段优化流程：

| 阶段         | 输入                    | 输出                    | 核心优化规则                                                          |
| :----------- | :---------------------- | :---------------------- | :-------------------------------------------------------------------- |
| **分析**     | Unresolved Logical Plan | Analyzed Logical Plan   | 解析表名/列名、类型检查、消除子查询                                   |
| **逻辑优化** | Analyzed Logical Plan   | Optimized Logical Plan  | **谓词下推**、**列裁剪**、常量折叠、布尔化简、Join 重排序             |
| **物理计划** | Optimized Logical Plan  | Physical Plan           | 枚举实现策略（Join: Broadcast/SortMerge/ShuffleHash）、代价模型选最优 |
| **代码生成** | Physical Plan           | Java 字节码（Tungsten） | **Whole-Stage CodeGen**，消除虚函数调用                               |

**核心优化规则详解**：

- **谓词下推（Predicate Pushdown）**：将 WHERE 条件尽可能推到数据源端执行。例如 `SELECT * FROM t WHERE age > 18` 在读取 Parquet 文件时，利用 Row Group 级别的统计信息跳过不满足条件的数据块，减少 I/O 约 50~90%。
- **列裁剪（Column Pruning）**：只读取查询需要的列。`SELECT name FROM t` 在列式存储（Parquet/ORC）中只读 name 列，数据量减少与列数成正比（100 列表只读 1 列，I/O 减少约 99%）。
- **Join 重排序**：Catalyst 根据表大小和统计信息自动选择 Join 策略：小表 < `autoBroadcastJoinThreshold`（默认 10MB）→ Broadcast Hash Join；中等表 → Sort Merge Join；极小表 → Shuffle Hash Join。

#### 🔬 扩展知识

::: details

- 【L3】**AQE 对 Catalyst 的增强**

  Spark 3.x AQE 在物理计划执行阶段根据运行时统计信息动态调整：① 合并小分区（减少 Task 数，避免调度开销）；② 动态切换 Join 策略（运行时发现表实际大小后，
  Sort Merge → Broadcast）；③ 动态处理数据倾斜（自动拆分热点分区）。AQE 使 Catalyst 从「编译期静态优化」进化为「运行时自适应优化」。

- 【L3】**查看执行计划**

  `df.explain(true)` 或 `df.explain("extended")` 输出完整四阶段计划。生产调优时应关注 Physical Plan 中的 Join 策略和数据量估算是否准确。

:::

#### 🔀 发散问题

- **Q：Broadcast Join 和 Sort Merge Join 如何选型？**

  → Catalyst 自动选择：小表 < 10MB 用 Broadcast，大表用 Sort Merge。也可手动 `df.hint("broadcast")` 强制指定。

- **Q：如何查看和优化 Spark SQL 执行计划？**

  → `df.explain(true)` 查看四阶段计划，关注 Join 策略、数据量估算、是否有不必要的全表扫描。

## 流批一体

### 【中等】Spark Streaming 和 Structured Streaming 有什么区别？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Spark / 流计算 / Structured Streaming

#### 💎 关键结论

Spark Streaming（DStream）是早期的微批流处理 API，以「时间批次」模拟流；Structured Streaming 是 Spark 2.0 推出的新一代流处理引擎，基于 DataFrame/Dataset 和 Catalyst 优化器，将流数据视为「无界表」，提供统一的批流 API。生产环境应优先选择 Structured Streaming，DStream 已进入维护模式。

#### ⚡ 记忆卡片

- **口诀**：DStream 微批老 API，Structured 无界表新引擎，批流统一 Catalyst
- **关键词**：DStream ／ Structured Streaming ／ 无界表 ／ 微批 ／ Continuous Processing ／ Exactly-Once
- **链路**：DStream（1.x，RDD 序列）→ Structured Streaming（2.0+，DataFrame + Catalyst + 增量执行）

#### 📖 核心知识

| 对比项           | Spark Streaming（DStream）              | Structured Streaming                                    |
| :--------------- | :-------------------------------------- | :------------------------------------------------------ |
| **数据抽象**     | DStream（RDD 序列）                     | DataFrame/Dataset（无界表）                             |
| **API 风格**     | 函数式（map/flatMap/window）            | 声明式（SQL / DataFrame DSL）                           |
| **优化器**       | 无                                      | **Catalyst + Tungsten**                                 |
| **语义保证**     | At-Least-Once（需 WAL 才 Exactly-Once） | **Exactly-Once**（内置 checkpoint）                     |
| **事件时间窗口** | 有限支持                                | **原生支持**（Watermark + 延迟数据处理）                |
| **批流统一**     | 否（批和流是两套 API）                  | **是**（同一 DataFrame API 处理批和流）                 |
| **延迟**         | 微批（≥ 500ms）                         | 微批（≥ 100ms）/ Continuous Processing（≥ 1ms，实验性） |
| **状态**         | 已进入维护模式                          | **活跃开发**，推荐生产使用                              |

**量化对比**（以 Kafka → 窗口聚合 → 写 HDFS 场景为例）：

- DStream：批次间隔 5s，端到端延迟约 5~10s，吞吐约 10 万 events/s。
- Structured Streaming（微批）：Trigger 1s，端到端延迟约 1~3s，吞吐约 15~20 万 events/s（Catalyst 优化）。
- Structured Streaming（Continuous Processing）：端到端延迟约 1~5ms，但吞吐降低约 30~50%（实验性，不支持所有操作）。

#### 🔬 扩展知识

::: details

- 【L3】**Watermark 机制**

  Structured Streaming 通过 Watermark 解决乱序数据问题。

  `df.withWatermark("eventTime", "10 minutes")` 表示系统等待 10 分钟的迟到数据，超过 Watermark 的数据被丢弃。Watermark 过大会增加状态存储，过小会丢失迟到数据——
  需要根据业务 P99 延迟设置。

- 【L3】**状态管理**

  有状态聚合（如窗口计数）需要 Checkpoint 持久化状态到 HDFS/S3。状态大小直接影响 Checkpoint 耗时和恢复时间。生产建议：① 状态大小控制在 10GB 以内；
  ② Checkpoint 间隔 = 批次间隔 × 10~20；③ 使用 RocksDB 状态后端（Spark 3.x）减少内存占用。

:::

#### 🔄 迁移策略

::: details

**场景：DStream（Spark Streaming）迁移到 Structured Streaming**

- **迁移动因**：DStream 自 Spark 2.3 起进入维护模式，不再新增特性，RDD API 难以被 Catalyst 优化；Structured Streaming 提供 Event-Time/Window/Watermark 一等支持，批流共用同一套 DataFrame API。
- **步骤**：① 盘点存量 DStream 作业，按「无状态转换 → 有状态窗口聚合 → 与外部系统事务耦合」排序，低风险先行；② 算子逐一映射 DataFrame API（map/filter 直译，reduceByKeyAndWindow → groupBy + window + watermark）；③ 触发器用 Trigger.ProcessingTime 对齐原批间隔，Exactly-Once 落地场景配 Trigger.AvailableNow + Checkpoint；④ Sink 侧用 foreachBatch 承接原 foreachRDD 的自定义写出，保留幂等写入逻辑；⑤ 灰度双跑：新旧作业分别消费不同 Consumer Group，比对 P99 延迟与聚合结果，1~2 周后切流下线旧作业。
- **回滚预案**：新旧作业写入同一套幂等 Sink，切流后旧作业保留一周不销毁；异常时把新作业停掉、旧作业恢复原 Consumer Group 即可回到原状。
- **踩坑提示**：① DStream 的 batchInterval ≠ SS 的 Trigger 间隔，updateStateByKey/mapGroupsWithState 的状态语义需逐条核对重写；② 旧作业若用 Receiver 模式接 Kafka，迁移后统一改 Direct/Assign 订阅，分区与并行度映射关系会变化；③ 两代引擎 Checkpoint 格式不兼容，新作业必须冷启动并回补状态（如从源端重放或数仓回灌）。

:::

#### 🔀 发散问题

- **Q：Structured Streaming 如何保证 Exactly-Once？**

  → 通过 WAL（Write-Ahead Log）+ Checkpoint + Source 可重放实现。Source 需支持偏移量记录（如 Kafka offset）。

- **Q：Spark Streaming 和 Flink 的区别？**

  → Flink 是原生流处理（逐条处理），Spark 是微批处理。Flink 延迟更低（ms 级），Spark 吞吐更高且与批处理生态统一。
