---
icon: logos:kafka-icon
title: Kafka 流式处理
date: 2020-07-24 06:52:07
categories:
  - 分布式
  - 分布式通信
  - MQ
  - Kafka
tags:
  - 分布式
  - 通信
  - MQ
  - Kafka
permalink: /pages/97b2c587/
---

# Kafka 流式处理

## 简介

### 什么是流式处理

**数据流是无边界数据集的抽象表示**。无边界意味着无限和持续增长。无边界数据集之所以是无限的，是因为随着时间的推移，新的记录会不断加入进来。

- **事件流是有序的**。事件的发生总是有先后顺序。而数据库里的记录是无序的。
- **不可变的数据记录**。事件一旦发生，就不能被改变。
- **事件流是可重播的**。对于大多数业务来说，重播发生在几个月前（甚至几年前）的原始事件流是一个很重要的需求。可能是为了尝试使用新的分析方法纠正过去的错误，或是为了进行审计。如果没有这项能力，流式处理充其量只是数据科学实验室里的一个玩具而已。

**流式处理是指实时地处理一个或多个事件流**。流式处理是一种编程范式，就像请求与响应范式和批处理范式那样。

### 编程范式对比

- **请求与响应** - 这是**延迟最小**的一种范式，响应时间处于亚毫秒到毫秒之间，而且响应时间一般非常稳定。这种处理模式一般是阻塞的，应用程序向处理系统发出请求，然后等待响应。
- **批处理** - 这种范式具有**高延迟**和**高吞吐量**的特点。处理系统按照设定的时间启动处理进程，读取所有的输入数据（从上一次执行之后的所有可用数据，或者从月初开始的所有数据等），输出结果，然后等待下一次启动。处理时间从几分钟到几小时不等，并且用户从结果里读到的都是旧数据。一般用于 BI 生成分析报表。
- **流式处理** - 这种范式介于上述两者之间。大部分的业务不要求亚毫秒级的响应，不过也接受不了长时间的等待。大部分业务流程都是持续进行的，只要业务报告保持更新，业务产品线能够持续响应，那么业务流程就可以进行下去，而无需等待特定的响应，也不要求在几毫秒内得到响应。一些业务流程具有持续性和非阻塞的特点。

流的定义不依赖任何一个特定的框架、 API 或特性。只要持续地从一个无边界的数据集读取数据，然后对它们进行处理并生成结果，那就是在进行流式处理。重点是，**整个处理过程必须是持续的**。

### 流处理的核心概念

#### 时间

时间或许是流式处理最为重要的概念。大部分流式应用的操作都是基于时间窗口的。有这么几个时间概念：

- **事件时间** - 事件时间是指所追踪事件的发生时间和记录的创建时间。
- **日志追加时间** - 日志追加时间是指事件保存到 broker 的时间。
- **处理时间** - 处理时间是指应用程序在收到事件之后要对其进行处理的时间。这个时间可以是在事件发生之后的几毫秒、几小时或几天。同一个事件可能会被分配不同的时间戳，这取决于应用程序何时读取这个事件。如果应用程序使用了两个线程来读取同一个事件，这个时间戳也会不一样！所以这个时间戳非常不可靠，应该避免使用它。

> 注意：在处理与时间有关的问题时，需要注意时区问题。整个数据管道应该使用同一个时区。

#### 状态

如果只是单独处理每一个事件，那么流式处理就很简单。

如果操作里包含了多个事件，流式处理就会变得复杂而有趣。**事件与事件之间的信息被称为状态**。这些状态一般被保存在应用程序的本地变量里。

流式处理含以下几种状态：

- **本地状态或内部状态** - 这种状态只能被单个应用程序实例访问，它们一般使用内嵌在应用程序里的数据库进行维护和管理。本地状态的优势在于它的速度，不足之处在于它受到内存大小的限制 。 所以，流式处理的很多设计模式都将数据拆分到多个子流，这样就可以使用有限的本地状态来处理它们。
- **外部状态** - 这种状态使用外部的数据存储来维护，一般使用 NoSQL 系统，比如 Cassandra。大部分流式处理应用尽量避免使用外部存储，或者将信息缓存在本地，减少与外部存储发生交互，以此来降低延迟，而这就引入了如何维护内部和外部状态一致性的问题。

#### 流和表

**流是一系列事件，每个事件就是一个变更。表包含了当前的状态，是多个变更所产生的结果**。所以说， 表和流是同一个硬币的两面，世界总是在发生变化，用户有时候关注变更事件，有时候则关注世界的当前状态。如果一个系统允许使用这两种方式来查看数据，那么它就比只支持一种方式的系统强大。

#### 时间窗口

时间窗口有不同的类型，基于以下属性决定：

- 窗口的大小
- 窗口移动的频率
- 窗口的可更新时间多长

## 流处理的设计模式

### 单个事件处理

处理单个事件是流式处理最基本的模式。这个模式也叫 `map` 或 `filter` 模式，因为它经常被用于过滤无用的事件或者用于转换事件（ map 这个术语是从 Map-Reduce 模式中来的， `map` 阶段转换事件， `reduce` 阶段聚合转换过的事件）。

在这种模式下，应用程序读取流中的事件 ，修改它们，然后把事件生成到另一个流上。

### 使用本地状态

大部分流式处理应用程序关心的是如何聚合信息，特别是基于时间窗口进行聚合。

要实现这些聚合操作，需要维护流的状态，可以通过本地状态（而不是共享状态）来实现。

如果流式处理应用包含了本地状态，会变得非常复杂，还需要解决下列问题：

- **内存使用** - 应用实例必须有可用的内存来保存本地状态。
- **持久化** - 要确保在应用程序关闭时不会丢失状态，并且在应用程序重启后或者切换到另一个应用实例时可以恢复状态。
- **再均衡** - 有时候，分区会被重新分配给不同的消费者。在这种情况下，失去分区的实例必须把最后的状态保存起来 ， 同时获得分区的实例必须知道如何恢复到正确的状态。

### 多阶段处理和重分区

数据量不大的时候，可以使用本地状态。但面对海量的流数据时，可以使用多阶段处理（类似 Hadoop 的 map reduce）

### 流和表的连接

有些场景下，流式处理需要将外部数据和流集成在一起。

可以考虑将外部的数据信息（如数据库存储）缓存到流式处理应用程序里。

### 流和流的连接

有些场景下，需要连接两个真实的事件流。

将两个流里具有相同键和发生在相同时间窗口内的事件匹配起来。这就是为什么流和流的连接也叫作基于时间窗口的连接（ windowed-join ）。

### 乱序的事件

不管是对于流式处理还是传统的 ETL 系统来说，处理乱序事件都是一个挑战。

要让流处理应用程序处理好这些场景，需要做到以下几点：

- **识别乱序的事件**。应用程序需要检查事件的时间，并将其与当前时间进行比较。
- **规定一个时间段用于重排乱序的事件**。比如 3 个小时以内的事件可以重排，但 3 周以外的事件就可以直接扔掉。
- **具有在一定时间段内重排乱序事件的能力**。这是流式处理应用与批处理作业的一个主要不同点。假设有一个每天运行的作业， 一些事件在作业结束之后才到达，那么可以重新运行昨天的作业来更新事件。而在流式处理中，“重新运行昨天的作业”这种情况是不存在的，乱序事件和新到达的事件必须一起处理。
- **具备更新结果的能力**。如果处理的结果保存到数据库里，那么可以通过 put 或 update 对结果进行更新。如果流应用程序通过邮件发送结果，那么要对结果进行更新，就需要很巧妙的手段。

### 重新处理

有两种模式：

模式一：使用新版本应用处理同一个事件流，生成新的结果，并比较两种版本的结果，然后在某个时间点将客户端切换到新的结果流上。

模式二：重置应用，让应用回到输入流的起始位置开始处理，同时重置本地状态（这样就不会将两个版本应用的处理结果棍淆起来了），而且还可能需要清理之前的输出流。

## Kafka Streams 的特性

Kafka Streams 是 Kafka 客户端库，用于构建实时流处理应用，具有以下核心特性：

| 特性 | 说明 |
| --- | --- |
| 轻量级 | 仅是一个 Java 库，无需独立集群，部署简单 |
| 恰好一次（Exactly-Once） | 基于事务实现端到端 Exactly-Once 语义 |
| 状态管理 | 内置 RocksDB 状态存储，支持本地状态与容错恢复 |
| 窗口操作 | 支持滚动窗口、跳跃窗口、会话窗口 |
| 流表二元性 | 支持 KStream（流）和 KTable（表）的相互转换 |
| 连接操作 | 支持流-流、流-表、表-表连接 |
| 容错与恢复 | 状态自动备份到 Kafka Topic，故障后自动恢复 |
| 突出集成 | 原生支持 Kafka，无需额外连接器 |
| 水平扩展 | 基于分区并行模型，实例数 = 分区数时并行度最大 |

## 应用场景

Kafka Streams 适用于以下典型场景：

- **实时 ETL**：从输入 Topic 读取数据，过滤、转换、富化后写入输出 Topic，替代离线 ETL 批处理。
- **实时监控告警**：对设备指标、应用日志进行窗口聚合（如 5 分钟均值），超阈值触发告警。
- **用户行为分析**：实时统计 PV/UV、漏斗转化、用户路径，驱动数据看板。
- **异常检测**：基于滑动窗口检测异常流量、欺诈交易，配合规则引擎实时拦截。
- **IoT 数据处理**：传感器数据清洗、降采样、聚合，输出到时序数据库。
- **实时推荐**：用户点击流实时计算兴趣向量，更新推荐特征库。

## 最佳实践

### 案例一：单词计数（Word Count）入门示例

**场景**：实时统计输入文本流中每个单词的出现次数，输出到结果 Topic。

```java
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;

import java.util.Arrays;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;

public class WordCountApplication {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "wordcount-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        // 启用 Exactly-Once
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, "exactly_once_v2");

        StreamsBuilder builder = new StreamsBuilder();
        // 从 input-topic 读取文本流
        KStream<String, String> textLines = builder.stream("input-topic");
        // 拆分单词、分组、计数
        KTable<String, Long> wordCounts = textLines
                .flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\W+")))
                .groupBy((key, word) -> word)
                .count(Materialized.as("word-counts-store"));

        // 输出到 output-topic
        wordCounts.toStream().to("output-topic",
                Produced.with(Serdes.String(), Serdes.Long()));

        final KafkaStreams streams = new KafkaStreams(builder.build(), props);
        final CountDownLatch latch = new CountDownLatch(1);

        // 优雅退出
        Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
            @Override
            public void run() {
                streams.close();
                latch.countDown();
            }
        });

        try {
            streams.start();
            latch.await();
        } catch (Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }
}
```

**Maven 依赖**：

```xml
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-streams</artifactId>
    <version>3.5.0</version>
</dependency>
```

**说明**：`processing.guarantee=exactly_once_v2` 启用 Exactly-Once（要求 Kafka 2.5+）；`Materialized.as` 指定状态存储名称，便于容错恢复。

### 案例二：基于时间窗口的实时聚合

**场景**：实时统计每 5 分钟内每个用户的订单总金额，输出到监控看板。

```java
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;
import org.apache.kafka.streams.*;

import java.time.Duration;
import java.util.Properties;

public class WindowedOrderAggregation {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-aggregation");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder();
        KStream<String, String> orders = builder.stream("orders");

        // 按用户分组，5 分钟滚动窗口聚合
        orders
            .groupBy((key, value) -> extractUserId(value))
            .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
            .aggregate(
                () -> 0.0,
                (userId, orderJson, total) -> total + extractAmount(orderJson),
                Materialized.<String, Double, org.apache.kafka.streams.state.WindowStore<org.apache.kafka.common.utils.Bytes, byte[]>>as("order-window-store")
                    .withValueSerde(Serdes.Double())
            )
            .toStream()
            .map((windowedKey, total) -> new KeyValue<>(
                windowedKey.key() + "@" + windowedKey.window().start(),
                String.valueOf(total)
            ))
            .to("order-stats-5min");

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }

    private static String extractUserId(String json) {
        // 简化：实际应使用 JSON 解析
        return json.split("\"userId\":\"")[1].split("\"")[0];
    }

    private static double extractAmount(String json) {
        return Double.parseDouble(json.split("\"amount\":")[1].split("[,}]")[0]);
    }
}
```

**说明**：`TimeWindows.ofSizeWithNoGrace` 创建无宽限期的滚动窗口；如有乱序数据，可用 `TimeWindows.ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofMinutes(1))` 允许 1 分钟延迟。

### 案例三：流表连接（实时富化）

**场景**：订单流需要关联用户信息表（KTable），输出富化后的订单详情。

```java
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;

import java.util.Properties;

public class StreamTableJoin {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-enrichment");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder builder = new StreamsBuilder();

        // 用户信息表（key=userId, value=用户JSON）
        KTable<String, String> userTable = builder.table("users");

        // 订单流（value 中包含 userId）
        KStream<String, String> orders = builder.stream("orders");

        // 流表连接：用订单中的 userId 关联用户信息
        KStream<String, String> enriched = orders
            .selectKey((key, order) -> extractUserId(order))  // 重新分区按 userId
            .join(userTable,
                (order, user) -> enrichOrder(order, user));

        enriched.to("enriched-orders");

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }

    private static String extractUserId(String order) {
        return order.split("\"userId\":\"")[1].split("\"")[0];
    }

    private static String enrichOrder(String order, String user) {
        // 将用户信息合并到订单 JSON 中
        String userName = user.split("\"name\":\"")[1].split("\"")[0];
        return order.replace("}", ",\"userName\":\"" + userName + "\"}");
    }
}
```

**说明**：流表连接要求流和表的 key 一致，因此使用 `selectKey` 重新分区；KTable 会缓存最新状态，连接时直接查询本地状态存储，性能极高。

## 常见问题

### 问题一：状态存储过大导致 OOM

**问题描述**：Kafka Streams 应用运行一段时间后，状态存储（RocksDB）持续增长，最终 OOM 崩溃。

**原因分析**：
1. 窗口未配置保留期，历史窗口数据永不清理。
2. 聚合 key 基数过高（如 userId 过亿），状态膨胀。
3. RocksDB 内存配置不当，未限制 block cache。
4. 使用 `KTable` 但未配置 `retention`，旧记录不被清理。

**解决方案**：

```java
// 1. 窗口聚合必须配置保留期
.groupBy((key, value) -> value)
.windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
.aggregate(
    () -> 0L,
    (key, value, agg) -> agg + 1,
    Materialized.<String, Long, org.apache.kafka.streams.state.WindowStore<org.apache.kafka.common.utils.Bytes, byte[]>>as("counts")
        .withRetention(Duration.ofHours(1))  // 窗口数据保留 1 小时后清理
        .withValueSerde(Serdes.Long())
)

// 2. KTable 配置保留期
KTable<String, String> table = builder.table("input",
    Materialized.<String, String>as("store")
        .withRetention(Duration.ofDays(7))  // 7 天后清理
        .withKeySerde(Serdes.String())
        .withValueSerde(Serdes.String())
);
```

```java
// 3. 调整 RocksDB 内存配置
props.put(StreamsConfig.ROCKSDB_CONFIG_SETTER_CLASS_CONFIG,
    CustomRocksDBConfigSetter.class);

public static class CustomRocksDBConfigSetter implements RocksDBConfigSetter {
    @Override
    public void setConfig(String storeName, Options options, java.util.Map<String, Object> configs) {
        options.setWriteBufferSize(32 * 1024 * 1024);  // 32MB
        options.setMaxWriteBufferNumber(2);
        BlockBasedTableConfig tableConfig = new BlockBasedTableConfig();
        tableConfig.setBlockCacheSize(128 * 1024 * 1024);  // 128MB
        options.setTableFormatConfig(tableConfig);
    }
}
```

**说明**：状态存储的保留期应大于窗口大小，通常设为 `窗口大小 + 宽限期`，否则结果可能被提前清理。

### 问题二：Rebalance 导致处理中断

**问题描述**：应用重启或扩容时，频繁 Rebalance 导致消息处理中断数分钟，且出现重复消费。

**原因分析**：
1. Kafka Streams 的 `application.id` 变更，导致被认为是新应用，从头消费。
2. 状态存储未正确恢复，触发 `Standby Task` 重建。
3. `consumer.session.timeout.ms` 过小，启动慢被踢出。
4. 实例数超过分区数，多余实例空转触发 Rebalance。

**解决方案**：

```java
Properties props = new Properties();
// application.id 必须稳定，变更会导致状态丢失
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "stable-app-id-v1");
// 调整 Rebalance 相关参数
props.put(StreamsConfig.consumerPrefix(org.apache.kafka.clients.consumer.ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG), "60000");
props.put(StreamsConfig.consumerPrefix(org.apache.kafka.clients.consumer.ConsumerConfig.HEARTBEAT_INTERVAL_MS_CONFIG), "10000");
// 启用 Standby Replica 加速状态恢复
props.put(StreamsConfig.NUM_STANDBY_REPLICAS_CONFIG, "1");
// 增加恢复线程，加速状态重建
props.put(StreamsConfig.NUM_STREAM_THREADS_CONFIG, "4");
```

```java
// 监听 Rebalance 事件
streams.setUncaughtExceptionHandler((thread, throwable) -> {
    System.err.println("未捕获异常: " + throwable.getMessage());
    return StreamsUncaughtExceptionHandler.StreamThreadExceptionResponse.SHUTDOWN_APPLICATION;
});

streams.setStateListener((newState, oldState) -> {
    if (newState == KafkaStreams.State.REBALANCING) {
        System.out.println("Rebalance 开始，处理可能中断");
    }
});
```

**说明**：`num.standby.replicas=1` 会为每个 Task 维护一个备机，故障切换时直接从备机恢复状态，显著缩短中断时间。

### 问题三：乱序事件导致窗口结果不准确

**问题描述**：基于事件时间的窗口聚合结果与批处理对账不一致，部分事件被丢弃。

**原因分析**：
1. 事件到达顺序与事件时间不一致，迟到事件落入已关闭的窗口被丢弃。
2. 未配置宽限期（grace period），窗口一结束即关闭。
3. 使用处理时间而非事件时间，导致窗口划分错误。

**解决方案**：

```java
import java.time.Duration;

// 方案1：使用事件时间 + 宽限期
KStream<String, String> stream = builder.stream("input",
    Consumed.with(TimestampExtractorClass.EventTimeExtractor.class));

stream
    .groupBy((key, value) -> value)
    // 窗口 5 分钟，宽限期 10 分钟（迟到 10 分钟内的事件仍可更新窗口）
    .windowedBy(TimeWindows.ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofMinutes(10)))
    .aggregate(
        () -> 0L,
        (key, value, agg) -> agg + 1,
        Materialized.as("counts")
    )
    .suppress(Suppressed.untilWindowCloses(Suppressed.BufferConfig.unbounded()))
    .toStream()
    .to("output");
```

```java
// 自定义时间提取器：从消息中提取事件时间
public static class EventTimeExtractor implements TimestampExtractor {
    @Override
    public long extract(org.apache.kafka.clients.consumer.ConsumerRecord<Object, Object> record, long partitionTime) {
        String value = (String) record.value();
        // 从 JSON 中提取 eventTime 字段（毫秒时间戳）
        String tsStr = value.split("\"eventTime\":")[1].split("[,}]")[0];
        return Long.parseLong(tsStr);
    }
}
```

```java
// 方案2：使用抑制（Suppress）等待窗口完全关闭后再输出，避免频繁更新
.suppress(Suppressed.untilWindowCloses(
    Suppressed.BufferConfig.maxBytes(1024 * 1024L)  // 限制缓冲区大小防 OOM
))
```

**说明**：`ofSizeAndGrace` 的宽限期需根据业务乱序程度设置；`suppress` 确保窗口关闭后才输出最终结果，减少下游更新压力。

## 参考资料

- **官方**
  - [Kafka 官网](http://kafka.apache.org/)
  - [Kafka Github](https://github.com/apache/kafka)
  - [Kafka 官方文档](https://kafka.apache.org/documentation/)
- **书籍**
  - [《Kafka 权威指南》](https://book.douban.com/subject/27665114/)
- **教程**
  - [Kafka 中文文档](https://github.com/apachecn/kafka-doc-zh)
  - [Kafka 核心技术与实战](https://time.geekbang.org/column/intro/100029201)
- **文章**
  - [Kafka 设计解析（七）：流式计算的新贵 Kafka Stream](https://www.infoq.cn/article/kafka-analysis-part-7)
