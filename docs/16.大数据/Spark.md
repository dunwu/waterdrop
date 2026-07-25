---
title: Spark
date: 2019-05-07 20:19:25
order: 01
categories:
  - 大数据
tags:
  - 大数据
  - Spark
permalink: /pages/ff93bb59/
---

# Spark

## 概述

Apache Spark 是一个开源的、大规模分布式通用计算引擎，最初由加州大学伯克利分校 AMPLab 于 2009 年开发，2013 年捐献给 Apache 基金会并成为顶级项目。

Spark 的核心设计思想是**基于内存的迭代计算**，通过引入 RDD（Resilient Distributed Dataset，弹性分布式数据集）抽象，克服了 Hadoop MapReduce 在迭代计算场景下需要反复读写磁盘的性能瓶颈。相比 MapReduce，Spark 在内存中的计算速度可快 **100 倍**，在磁盘上也能快 **10 倍**。

Spark 提供了统一的大数据处理平台，支持批处理、流处理、交互式查询、机器学习和图计算等多种场景，形成了完整的生态体系：

| 组件 | 说明 |
|---|---|
| **Spark Core** | 核心计算框架，提供 RDD 抽象、任务调度、内存管理、容错机制 |
| **Spark SQL** | 结构化数据查询，支持 SQL、DataFrame、Dataset API |
| **Spark Streaming** | 实时流处理（微批模式），支持 Kafka、Flume、HDFS 等数据源 |
| **Structured Streaming** | 基于 DataFrame/Dataset 的流处理引擎（Spark 2.0+） |
| **Spark MLlib** | 内置机器学习算法库，支持分类、回归、聚类、协同过滤 |
| **Spark GraphX** | 图计算框架，内置 PageRank、连通分量等图算法 |

## 特性

### 高性能

- **内存计算**：将中间结果缓存在内存中，避免 MapReduce 每次迭代都写磁盘的开销
- **DAG 执行引擎**：将复杂的数据流转化为有向无环图（DAG），进行全局优化后执行
- **流水线优化**：对不涉及 Shuffle 的算子进行流水线合并（Pipeline），减少调度开销
- **向量化执行**：Spark 3.x 引入的 Vectorized Execution，利用 CPU SIMD 指令集加速列式计算

### 易用性

- 提供 **Scala、Java、Python、R** 四种语言的原生 API
- 交互式 Shell（`spark-shell`、`pyspark`）支持即席查询和探索性分析
- 高层次 API（DataFrame/Dataset）屏蔽底层复杂性，开发效率高

### 通用性

- 统一引擎支持**批处理、流处理、SQL 查询、机器学习、图计算**
- 可与 Hadoop 生态（HDFS、YARN、Hive）无缝集成，也可独立部署

### 多种运行模式

| 模式 | 说明 |
|---|---|
| Local | 单机模式，用于开发调试 |
| Standalone | Spark 自带的集群管理器 |
| YARN | 部署在 Hadoop YARN 上，共享集群资源 |
| Mesos | 部署在 Apache Mesos 上 |
| Kubernetes | 部署在 K8s 上（Spark 2.3+） |

### 高容错

- 基于 RDD 的**血统（Lineage）机制**：记录 RDD 的转换关系，分区丢失时可从父 RDD 重新计算
- **CheckPoint**：对长血统链进行检查点，缩短故障恢复时间

## 原理

### 编程模型

#### RDD

**RDD（Resilient Distributed Dataset，弹性分布式数据集）** 是 Spark 最基础的数据抽象，具有以下特性：

- **分布式**：数据分区存储在集群的多个节点上
- **不可变**：RDD 一旦创建不可修改，只能通过转换生成新 RDD
- **弹性**：基于血统机制自动故障恢复
- **延迟计算（Lazy Evaluation）**：Transformation 操作只记录计划，Action 触发时才真正执行

**RDD 的两类操作：**

| 操作类型 | 特点 | 常用算子 |
|---|---|---|
| **Transformation（转换）** | 惰性执行，返回新 RDD | `map`、`filter`、`flatMap`、`groupByKey`、`reduceByKey`、`join` |
| **Action（动作）** | 立即触发计算，返回结果 | `count`、`collect`、`first`、`take`、`saveAsTextFile`、`foreach` |

**RDD 依赖关系：**

- **窄依赖（Narrow Dependency）**：父 RDD 的每个分区最多被一个子 RDD 的分区依赖，支持流水线执行，如 `map`、`filter`
- **宽依赖（Wide Dependency / Shuffle Dependency）**：父 RDD 的分区可被多个子 RDD 分区依赖，需要 Shuffle，如 `groupByKey`、`reduceByKey`

宽依赖是 Spark 中产生 Shuffle 的根本原因，也是性能调优的重点关注点。

#### DataFrame 与 Dataset

Spark 1.3 引入 DataFrame，Spark 1.6 引入 Dataset，Spark 2.0 统一为 Dataset（DataFrame = Dataset[Row]）。

| API | 类型安全 | 性能优化 | 语言支持 |
|---|---|---|---|
| RDD | 编译时 | 无 Catalyst 优化 | Scala/Java/Python/R |
| DataFrame | 仅运行时 | Catalyst + Tungsten | 全部 |
| Dataset | 编译时 | Catalyst + Tungsten | Scala/Java |

### 运行架构

```
Driver Program
    │
    ├── SparkContext
    │     └── DAGScheduler → TaskScheduler
    │
Cluster Manager（YARN / Standalone / K8s）
    │
    ├── Executor（Worker Node 1）
    │     ├── Task 1
    │     └── Task 2
    └── Executor（Worker Node 2）
          ├── Task 3
          └── Task 4
```

**核心组件说明：**

- **Driver**：运行用户程序 `main()` 函数的进程，负责创建 SparkContext、构建 DAG、划分 Stage、分发 Task
- **SparkContext**：Spark 应用的入口，连接 Cluster Manager，申请资源
- **DAGScheduler**：将 RDD 的 DAG 按照宽依赖边界划分为 Stage（ShuffleMapStage 和 ResultStage）
- **TaskScheduler**：将 Stage 内的 Task 分发到 Executor 执行
- **Executor**：运行在 Worker 节点上的 JVM 进程，负责执行 Task 并缓存数据
- **Cluster Manager**：集群资源管理器（YARN ResourceManager / Standalone Master / K8s API Server）

### 任务调度流程

1. 用户程序触发 Action，Driver 将 DAG 提交给 DAGScheduler
2. DAGScheduler 从最终 RDD 向前回溯，遇到宽依赖切分 Stage
3. Stage 按拓扑顺序提交给 TaskScheduler
4. TaskScheduler 将 Task 分配给 Executor（优先数据本地性：PROCESS_LOCAL > NODE_LOCAL > RACK_LOCAL）
5. Executor 执行 Task，结果写回 Driver 或持久化到存储

### Shuffle 机制

Shuffle 是 Spark 性能优化的核心关注点：

- **Hash Shuffle**（旧）：每个 Map Task 为每个 Reduce Task 创建一个文件，文件数 = M × R
- **Sort Shuffle**（当前默认）：每个 Map Task 将所有输出排序后写入一个文件+一个索引文件，文件数 = 2M，大幅减少文件数量
- **Tungsten Sort**：利用堆外内存和二进制比较，进一步提升 Shuffle 性能

## 应用场景

### 场景一：电商实时推荐系统

**需求**：对用户的实时行为流（点击、加购、购买）进行处理，实时更新推荐结果。

**方案**：使用 Structured Streaming 消费 Kafka 行为事件流，结合预先用 MLlib 训练的协同过滤模型，实时计算用户偏好并写入 Redis 供业务系统查询。

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StringType, LongType

spark = SparkSession.builder.appName("RealtimeRecommend").getOrCreate()

schema = StructType().add("user_id", StringType()).add("item_id", StringType()).add("ts", LongType())

# 从 Kafka 读取用户行为事件
df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "user_behavior") \
    .load() \
    .select(from_json(col("value").cast("string"), schema).alias("data")) \
    .select("data.*")

# 滑动窗口统计每个用户近 5 分钟的热门品类
from pyspark.sql.functions import window
result = df.groupBy(
    col("user_id"),
    window(col("ts").cast("timestamp"), "5 minutes", "1 minute")
).count()

# 写出到 Redis（通过 foreachBatch）
def write_to_redis(batch_df, batch_id):
    # 调用 Redis 客户端更新推荐结果
    pass

result.writeStream.foreachBatch(write_to_redis).start().awaitTermination()
```

### 场景二：大规模日志 ETL 与数据仓库构建

**需求**：每天对 TB 级 Nginx 访问日志进行清洗、解析、聚合，写入数据仓库供报表查询。

**方案**：使用 Spark SQL 读取 HDFS 上的原始日志，利用 DataFrame API 进行数据清洗（过滤爬虫、解析 User-Agent、IP 归因），分区写入 Parquet 格式的 Hive 表。

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_extract, to_date, col

spark = SparkSession.builder.appName("LogETL").enableHiveSupport().getOrCreate()

# 读取原始日志（每行为 Nginx Combined Log 格式）
raw = spark.read.text("hdfs:///data/nginx/2024-01-01/")

# 正则解析日志字段
LOG_PATTERN = r'(\S+) - - \[(.+?)\] "(\S+) (\S+) \S+" (\d{3}) (\d+)'
parsed = raw.select(
    regexp_extract("value", LOG_PATTERN, 1).alias("ip"),
    regexp_extract("value", LOG_PATTERN, 4).alias("uri"),
    regexp_extract("value", LOG_PATTERN, 5).cast("int").alias("status"),
    regexp_extract("value", LOG_PATTERN, 6).cast("long").alias("bytes"),
)

# 过滤异常数据，按状态码聚合
summary = parsed.filter(col("status").isNotNull()) \
    .groupBy("uri", "status") \
    .agg({"bytes": "sum", "*": "count"}) \
    .withColumnRenamed("count(1)", "pv") \
    .withColumnRenamed("sum(bytes)", "total_bytes")

# 写入 Hive 分区表
summary.write.mode("overwrite").partitionBy("status") \
    .saveAsTable("dw.nginx_summary_daily")
```

### 场景三：机器学习特征工程与模型训练

**需求**：对用户画像原始数据进行特征工程处理，并训练用户流失预测模型。

**方案**：使用 Spark MLlib 的 Pipeline API 构建特征处理和模型训练流水线。

```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StandardScaler, StringIndexer
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import BinaryClassificationEvaluator

# 特征处理 Pipeline
indexer = StringIndexer(inputCol="city", outputCol="city_idx")
assembler = VectorAssembler(
    inputCols=["age", "city_idx", "login_days", "purchase_count", "avg_order_value"],
    outputCol="features_raw"
)
scaler = StandardScaler(inputCol="features_raw", outputCol="features")
rf = RandomForestClassifier(labelCol="churn", featuresCol="features", numTrees=100)

pipeline = Pipeline(stages=[indexer, assembler, scaler, rf])

# 训练与评估
train_df, test_df = data.randomSplit([0.8, 0.2], seed=42)
model = pipeline.fit(train_df)
predictions = model.transform(test_df)

evaluator = BinaryClassificationEvaluator(labelCol="churn")
auc = evaluator.evaluate(predictions)
print(f"AUC: {auc:.4f}")

# 保存模型
model.write().overwrite().save("hdfs:///models/churn_prediction_v1")
```

### 场景四：图计算——社交网络影响力分析

**需求**：计算社交网络中每个用户的 PageRank 影响力评分，用于广告投放受众筛选。

```python
from pyspark.sql import SparkSession
from graphframes import GraphFrame

spark = SparkSession.builder.appName("SocialGraph").getOrCreate()

# 构建顶点和边
vertices = spark.createDataFrame([("1", "Alice"), ("2", "Bob"), ("3", "Carol")],
                                  ["id", "name"])
edges = spark.createDataFrame([("1", "2"), ("2", "3"), ("3", "1"), ("2", "1")],
                               ["src", "dst"])

g = GraphFrame(vertices, edges)

# 运行 PageRank（迭代 10 次）
results = g.pageRank(resetProbability=0.15, maxIter=10)
results.vertices.select("id", "name", "pagerank") \
    .orderBy("pagerank", ascending=False) \
    .show()
```

## 最佳实践

### 实践一：合理控制并行度与分区数

**问题**：分区数过少导致资源利用率低，分区数过多导致调度开销大。

**建议**：
- 读取 HDFS 时，每个分区建议对应 128MB 数据（与 HDFS Block 大小一致）
- 经过 Shuffle 后的分区数通过 `spark.sql.shuffle.partitions`（默认 200）控制，根据数据量调整
- 使用 `repartition()` 增加分区（触发 Shuffle），`coalesce()` 减少分区（不触发 Shuffle）

```python
# 读取后重分区，提高并行度
df = spark.read.parquet("hdfs:///data/large_table/")
# 按数据量估算：10GB / 128MB ≈ 80 分区
df = df.repartition(80)

# Shuffle 后调整分区数（避免过多小文件）
spark.conf.set("spark.sql.shuffle.partitions", "80")
```

### 实践二：充分利用数据缓存（Cache / Persist）

**场景**：同一个 RDD/DataFrame 被多个下游操作重复使用时，避免重复计算。

**存储级别选择：**

| 存储级别 | 说明 | 适用场景 |
|---|---|---|
| `MEMORY_ONLY` | 仅内存，Java 对象 | 内存充足，频繁访问 |
| `MEMORY_AND_DISK` | 内存不足时溢写磁盘 | 内存紧张的大数据集 |
| `MEMORY_ONLY_SER` | 序列化存储，节省内存 | 内存有限，GC 压力大 |
| `DISK_ONLY` | 仅磁盘 | 数据量极大，访问频率低 |

```python
from pyspark import StorageLevel

# 对多次使用的 DataFrame 进行缓存
user_features = spark.table("dw.user_features").cache()

# 或指定存储级别
user_features.persist(StorageLevel.MEMORY_AND_DISK_SER)

# 使用完毕后释放缓存
user_features.unpersist()
```

### 实践三：避免数据倾斜

**数据倾斜**是 Spark 最常见的性能问题，通常表现为某些 Task 执行时间远超其他 Task。

**常见原因与解决方案：**

| 原因 | 解决方案 |
|---|---|
| `groupBy` / `join` 的 key 分布不均 | 对热点 key 加随机前缀打散，再二次聚合 |
| 大表与小表 join | 将小表广播（Broadcast Join），避免 Shuffle |
| 数据源分区不均 | 读取后 `repartition()` 重新分区 |

```python
from pyspark.sql.functions import broadcast, concat, lit, floor, rand

# 方案1：小表广播 Join（推荐，适用于小表 < 10MB）
result = large_df.join(broadcast(small_df), "user_id")

# 方案2：热点 key 加盐打散（适用于大表 Join）
# 将热点 key 的数据扩展 N 份，另一侧也复制 N 份
N = 10
df_with_salt = df.withColumn("salt_key",
    concat(col("skew_key"), lit("_"), (rand() * N).cast("int").cast("string")))
```

### 实践四：合理配置资源参数

```properties
# 推荐生产环境配置（以 YARN 模式为例）
spark.executor.instances=20          # Executor 数量
spark.executor.cores=4               # 每个 Executor 的 CPU 核心数
spark.executor.memory=8g             # 每个 Executor 的内存
spark.executor.memoryOverhead=2g     # JVM 堆外内存（防止 OOM）
spark.driver.memory=4g               # Driver 内存
spark.sql.shuffle.partitions=400     # Shuffle 后分区数（= 2~4 倍 CPU 核心总数）
spark.serializer=org.apache.spark.serializer.KryoSerializer  # 使用 Kryo 序列化
```

### 实践五：使用 Kryo 序列化替代默认 Java 序列化

Kryo 序列化比 Java 默认序列化快约 10 倍，且体积更小：

```python
spark = SparkSession.builder \
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer") \
    .config("spark.kryo.registrationRequired", "false") \
    .getOrCreate()
```

## 常见问题

### Q1：`java.lang.OutOfMemoryError: GC overhead limit exceeded` 如何处理？

**原因**：Driver 或 Executor 内存不足，GC 占用 CPU 时间超过 98%。

**解决方案**：
1. 增加 Executor 内存：`--executor-memory 8g`
2. 使用序列化存储减少内存占用：`persist(StorageLevel.MEMORY_ONLY_SER)`
3. 减少每个 Executor 的并发 Task 数（降低 `spark.executor.cores`）
4. 增加堆外内存：`spark.executor.memoryOverhead=2g`
5. 检查是否存在数据倾斜，导致单个 Task 处理数据量过大

### Q2：Spark Streaming 的批次处理时间持续超过批次间隔怎么办？

**原因**：处理速度跟不上数据产生速度，导致积压越来越严重。

**解决方案**：
1. 增加 Executor 数量或 CPU 核心数
2. 启用背压机制（`spark.streaming.backpressure.enabled=true`），自动调节消费速率
3. 增大批次间隔，减少调度开销
4. 优化代码逻辑，减少 Shuffle 操作
5. 将 Spark Streaming 升级为 Structured Streaming，性能更优

### Q3：`Could not serialize task` 错误如何解决？

**原因**：Task 中包含了不可序列化的对象（如数据库连接、文件句柄）。

**解决方案**：
- 在每个 Task 内部（`mapPartitions` 或 `foreachPartition`）创建连接，而不是在 Driver 端创建后传递
- 使用 `@transient` 标注不需要序列化的变量（Scala）

```scala
// 错误做法：在 Driver 创建连接，序列化失败
val conn = createDBConnection()
rdd.foreach(row => conn.write(row))  // conn 无法序列化

// 正确做法：在每个分区内创建连接
rdd.foreachPartition { rows =>
  val conn = createDBConnection()  // 每个分区创建一次连接
  rows.foreach(row => conn.write(row))
  conn.close()
}
```

### Q4：如何处理 Spark 中的小文件问题？

**问题**：写出的文件数量过多（与分区数相同），HDFS NameNode 压力大，下游读取效率低。

**解决方案**：
```python
# 写出前合并分区
df.coalesce(10).write.parquet("hdfs:///output/")

# 或使用 Hive 的动态分区合并（配合 Hive 使用）
spark.conf.set("hive.merge.mapfiles", "true")
spark.conf.set("hive.merge.mapredfiles", "true")
spark.conf.set("hive.merge.size.per.task", "256000000")  # 256MB
```

### Q5：Spark 与 Flink 如何选型？

| 维度 | Spark | Flink |
|---|---|---|
| 流处理模型 | 微批（Micro-batch） | 真正的事件驱动流处理 |
| 延迟 | 秒级（Structured Streaming 可达百毫秒） | 毫秒级 |
| 批处理 | 成熟稳定，生态更丰富 | 支持批流一体，但批处理相对较弱 |
| 机器学习 | MLlib 更成熟 | FlinkML 相对较少 |
| 状态管理 | 有限 | 丰富的状态后端（RocksDB 等） |
| 适用场景 | 数据仓库 ETL、批处理、ML | 实时风控、CEP、低延迟流处理 |

**建议**：离线批处理优先选 Spark；低延迟实时处理、复杂事件处理（CEP）优先选 Flink。

## 参考资料

- [Apache Spark 官网](https://spark.apache.org/)
- [Spark 官方文档](https://spark.apache.org/docs/latest/)
- [Spark: The Definitive Guide（O'Reilly）](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)
- [Learning Spark 2nd Edition（O'Reilly）](https://www.oreilly.com/library/view/learning-spark-2nd/9781492050032/)
- [Spark 技术内幕——深入解析 Spark 内核架构设计与实现原理](https://book.douban.com/subject/26649141/)
- [美团 Spark 性能优化实战](https://tech.meituan.com/2016/04/29/spark-tuning-basic.html)
- [Databricks 博客](https://www.databricks.com/blog)
