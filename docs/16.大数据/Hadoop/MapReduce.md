---
icon: devicon:hadoop
title: MapReduce
date: 2020-06-22 00:22:25
categories:
  - 大数据
  - Hadoop
tags:
  - 大数据
  - Hadoop
  - mapreduce
permalink: /pages/5383c8e8/
---

# MapReduce

## 概述

MapReduce 是 Hadoop 项目中的分布式计算框架，源自 Google 2004 年发表的同名论文。它降低了分布式计算的门槛，可以让用户轻松编写程序，让其以可靠、容错的方式运行在大型集群上并行处理海量数据（TB 级）。

MapReduce 的两大核心设计思路：

- **分而治之，并行计算**：将大规模数据切分为若干子集，多个节点并行处理
- **移动计算，而非移动数据**：将计算程序调度到数据所在节点，避免大量数据在网络中传输

MapReduce 框架仅对 `<key, value>` 对进行操作，将作业的输入视为一组 `<k1, v1>` 对，经过 Map、Shuffle、Reduce 处理后，生成 `<k3, v3>` 对作为输出：

```
(input) <k1, v1> -> map -> <k2, v2> -> combine -> <k2, v2> -> reduce -> <k3, v3> (output)
```

## 特性

| 特性 | 说明 |
|---|---|
| **计算跟着数据走** | 调度器优先将 Map Task 分配到数据所在节点，减少网络传输 |
| **水平扩展** | 计算能力随节点数量增加近似线性递增 |
| **高容错** | Task 失败自动重试（默认 4 次），节点故障自动迁移任务 |
| **状态监控** | 通过 JobHistory Server 和 YARN Web UI 查看任务进度 |
| **批处理优化** | 适合 TB/PB 级离线批处理，不适合实时计算 |
| **编程门槛低** | 只需实现 Mapper 和 Reducer 接口，框架处理分布式细节 |

## 应用场景

### 适用场景

- **数据统计**：网站 PV/UV 统计、用户行为分析
- **搜索引擎索引构建**：对海量网页数据进行倒排索引构建
- **数据仓库 ETL**：大规模数据清洗、转换、聚合
- **日志分析**：对 TB 级日志数据进行批量解析和统计

### 不适用场景

| 不适用场景 | 原因 |
|---|---|
| **OLAP（交互式查询）** | 每次作业需要启动 JVM、调度等，延迟秒级～分钟级，无法满足毫秒级要求 |
| **实时流计算** | MapReduce 面向静态数据集，无法处理动态流数据 |
| **迭代计算（机器学习）** | 每轮迭代都需要读写磁盘，迭代 100 次则有 200 次磁盘 IO，远不如 Spark 的内存计算 |
| **复杂 DAG 计算** | 多个 MapReduce 作业通过 HDFS 传递中间结果，磁盘 IO 开销巨大 |

**结论**：在 Spark 出现后，MapReduce 的大多数场景已被 Spark 取代。MapReduce 目前主要用于对稳定性要求极高、数据量超大的超长批处理任务，以及与 Hive 深度集成的场景。

## 工作流程

MapReduce 程序被分为 **Map（映射）阶段** 和 **Reduce（化简）阶段**：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/d939d0d6c2784a3497513f7304c6b126.png)

1. **input** : 读取文本文件；
2. **splitting** : 将文件按照行进行拆分，此时得到的 `K1` 行数，`V1` 表示对应行的文本内容；
3. **mapping** : 并行将每一行按照空格进行拆分，拆分得到的 `List(K2,V2)`，其中 `K2` 代表每一个单词，由于是做词频统计，所以 `V2` 的值为 1，代表出现 1 次；
4. **shuffling**：由于 `Mapping` 操作可能是在不同的机器上并行处理的，所以需要通过 `shuffling` 将相同 `key` 值的数据分发到同一个节点上去合并，这样才能统计出最终的结果，此时得到 `K2` 为每一个单词，`List(V2)` 为可迭代集合，`V2` 就是 Mapping 中的 V2；
5. **Reducing** : 这里的案例是统计单词出现的总次数，所以 `Reducing` 对 `List(V2)` 进行归约求和操作，最终输出。

MapReduce 编程模型中 `splitting` 和 `shuffling` 操作都是由框架自动实现的，需要我们自己编程实现的只有 `mapping` 和 `reducing`，这也就是 MapReduce 这个称呼的来源。

## MapReduce 组件

MapReduce 有以下核心组件：

- **Job** - [Job](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapreduce/Job.html) 表示 MapReduce 作业配置。`Job` 通常用于指定 `Mapper`、combiner（如果有）、`Partitioner`、`Reducer`、`InputFormat`、`OutputFormat` 实现。
- **Mapper** - [Mapper](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapreduce/Mapper.html) 负责将输入键值对**映射**到一组中间键值对。转换的中间记录不需要与输入记录具有相同的类型。一个给定的输入键值对可能映射到零个或多个输出键值对。
- **Combiner** - `combiner` 是 `map` 运算后的可选操作，它实际上是一个本地化的 `reduce` 操作。它执行中间输出的本地聚合，这有助于减少从 `Mapper` 传输到 `Reducer` 的数据量。
- **Reducer** - [Reducer](http://hadoop.apache.org/docs/current/api/org/apache/hadoop/mapreduce/Reducer.html) 将共享一个 key 的一组中间值归并为一个小的数值集。Reducer 有 3 个主要子阶段：shuffle，sort 和 reduce。
  - **shuffle** - Reducer 的输入就是 mapper 的排序输出。在这个阶段，框架通过 HTTP 获取所有 mapper 输出的相关分区。
  - **sort** - 在这个阶段中，框架将按照 key （因为不同 mapper 的输出中可能会有相同的 key) 对 Reducer 的输入进行分组。shuffle 和 sort 两个阶段是同时发生的。
  - **reduce** - 对按键分组的数据进行聚合统计。
- **Partitioner** - [Partitioner](http://hadoop.apache.org/docs/current/api/org/apache/hadoop/mapreduce/Partitioner.html) 负责控制 map 中间输出结果的键的分区。
  - 键（或者键的子集）用于产生分区，通常通过一个散列函数。
  - 分区总数与作业的 reduce 任务数是一样的。因此，它控制中间输出结果（也就是这条记录）的键发送给 m 个 reduce 任务中的哪一个来进行 reduce 操作。
- **InputFormat** - [InputFormat](http://hadoop.apache.org/docs/current/api/org/apache/hadoop/mapreduce/InputFormat.html) 描述 MapReduce 作业的输入规范。MapReduce 框架依赖作业的 InputFormat 来完成以下工作：
  - 确认作业的输入规范。
  - 把输入文件分割成多个逻辑的 InputSplit 实例，然后将每个实例分配给一个单独的 Mapper。[InputSplit](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapreduce/InputSplit.html) 表示要由单个 `Mapper` 处理的数据。
  - 提供 RecordReader 的实现。[RecordReader](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapreduce/RecordReader.html) 从 `InputSplit` 中读取 `<key， value>` 对，并提供给 `Mapper` 实现进行处理。
- **OutputFormat** - [OutputFormat](http://hadoop.apache.org/docs/current/api/org/apache/hadoop/mapreduce/OutputFormat.html) 描述 MapReduce 作业的输出规范。MapReduce 框架依赖作业的 OutputFormat 来完成以下工作：
  - 确认作业的输出规范，例如检查输出路径是否已经存在。
  - 提供 RecordWriter 实现。[RecordWriter](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapreduce/RecordWriter.html) 将输出 `<key， value>` 对到文件系统。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/6e4555f1d0074087b51138005cba74d2.png)

## 最佳实践

### 实践一：使用 Combiner 减少 Shuffle 数据量

Combiner 是在 Map 端执行的本地 Reduce，可以大幅减少需要通过网络传输的数据量（通常可减少 50%~80%）。

**注意**：Combiner 只能用于满足结合律和交换律的操作（如求和、求最大值），不能用于求平均值等操作。

```java
public class WordCountJob {
    public static void main(String[] args) throws Exception {
        Job job = Job.getInstance(new Configuration());
        job.setMapperClass(WordCountMapper.class);
        // 设置 Combiner，使用与 Reducer 相同的逻辑（词频统计满足结合律）
        job.setCombinerClass(WordCountReducer.class);
        job.setReducerClass(WordCountReducer.class);
        // ...
    }
}
```

### 实践二：合理设置 Reduce Task 数量

Reduce Task 数量直接影响输出文件数量和执行性能：

- Reduce Task 数量过少：单个 Reducer 处理数据量过大，成为性能瓶颈
- Reduce Task 数量过多：大量小文件写入 HDFS，NameNode 压力大

```java
// 经验公式：Reduce 数量 = 集群 Reduce 容量的 0.95 或 1.75 倍
// 0.95：所有 Reduce Task 可以同时运行
// 1.75：快节点先完成，可以处理额外任务，整体更均衡
job.setNumReduceTasks(20);

// 特殊情况：如果不需要归并操作，设置为 0 可以跳过 Shuffle 阶段
job.setNumReduceTasks(0);  // Map-only 作业，输出直接写 HDFS
```

### 实践三：使用 Writable 序列化提升性能

MapReduce 默认使用 Java 序列化，推荐使用 Hadoop 的 `Writable` 接口，序列化体积更小、速度更快：

```java
// 自定义 Writable 类型（以用户对象为例）
public class UserWritable implements Writable {
    private String userId;
    private int age;
    private double score;

    @Override
    public void write(DataOutput out) throws IOException {
        out.writeUTF(userId);
        out.writeInt(age);
        out.writeDouble(score);
    }

    @Override
    public void readFields(DataInput in) throws IOException {
        userId = in.readUTF();
        age = in.readInt();
        score = in.readDouble();
    }
}
```

### 实践四：处理数据倾斜

**症状**：大多数 Reduce Task 很快完成，但少数几个 Reduce Task 耗时极长（常见于有"热点 key"的数据）。

**解决方案：两阶段聚合**

```java
// 第一阶段 Mapper：对 key 加随机前缀打散
public class SaltMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
    private Random random = new Random();
    @Override
    protected void map(LongWritable key, Text value, Context context)
            throws IOException, InterruptedException {
        String word = value.toString().trim();
        // 加随机前缀（0~9），将热点 key 分散到 10 个 Reducer
        String saltedKey = random.nextInt(10) + "_" + word;
        context.write(new Text(saltedKey), new IntWritable(1));
    }
}

// 第二阶段 Mapper：去掉前缀，还原真实 key
public class RemoveSaltMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
    @Override
    protected void map(LongWritable key, Text value, Context context)
            throws IOException, InterruptedException {
        String line = value.toString();
        String[] parts = line.split("\t");
        // 去掉随机前缀
        String realKey = parts[0].substring(parts[0].indexOf("_") + 1);
        context.write(new Text(realKey), new IntWritable(Integer.parseInt(parts[1])));
    }
}
```

## 常见问题

### Q1：MapReduce 任务运行缓慢，如何排查？

**常见原因与解决方案：**

| 原因 | 排查方法 | 解决方案 |
|---|---|---|
| 数据倾斜 | 查看各 Reduce Task 处理数据量是否均匀 | 加盐打散（见最佳实践四） |
| Map 输出数据量过大 | 查看 Shuffle 网络 IO | 添加 Combiner 减少 Shuffle 数据 |
| 磁盘 IO 瓶颈 | 查看 DataNode 磁盘使用率 | 使用压缩（MapReduce 中间结果启用 Snappy 压缩） |
| 内存不足（JVM OOM） | 查看 TaskTracker 日志 | 增大 `mapreduce.map/reduce.memory.mb` |
| 小文件过多 | 查看 Map Task 数量是否远大于预期 | 使用 `CombineFileInputFormat` 合并小文件 |

```xml
<!-- mapred-site.xml：启用 Map 输出压缩 -->
<property>
  <name>mapreduce.map.output.compress</name>
  <value>true</value>
</property>
<property>
  <name>mapreduce.map.output.compress.codec</name>
  <value>org.apache.hadoop.io.compress.SnappyCodec</value>
</property>
```

### Q2：如何编写一个完整的 WordCount 程序？

```java
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import java.io.IOException;
import java.util.StringTokenizer;

public class WordCount {
    // Mapper: 逐行读取，按空格拆分，每个单词输出 <word, 1>
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {
        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException {
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken());
                context.write(word, one);
            }
        }
    }

    // Reducer: 对相同 key 的所有 value 求和
    public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "word count");
        job.setJarByClass(WordCount.class);
        job.setMapperClass(TokenizerMapper.class);
        job.setCombinerClass(IntSumReducer.class);  // Combiner 优化
        job.setReducerClass(IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
```

### Q3：MapReduce 和 Spark 如何选择？

| 维度 | MapReduce | Spark |
|---|---|---|
| 计算模型 | 磁盘为主，每步骤写磁盘 | 内存为主，中间结果留内存 |
| 迭代性能 | 差（每次迭代读写磁盘） | 好（内存缓存中间结果） |
| 开发难度 | 较高（纯 Java，API 繁琐） | 低（Scala/Python/Java，API 丰富） |
| 生态成熟度 | 非常成熟，兼容性好 | 成熟，发展更快 |
| 适用场景 | 超大规模一次性批处理 | 迭代计算、流处理、ML |

**建议**：新项目优先选 Spark，若团队现有 MapReduce 历史代码且运行稳定，可保持不变。

## 参考资料

- [MapReduce 官方文档](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html)
- [Google MapReduce 原论文（2004）](https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf)
- [Hadoop 权威指南（第 4 版）](https://book.douban.com/subject/27115351/)
- [分布式计算框架——MapReduce](https://github.com/heibaiying/BigData-Notes/blob/master/notes/Hadoop-MapReduce.md)
