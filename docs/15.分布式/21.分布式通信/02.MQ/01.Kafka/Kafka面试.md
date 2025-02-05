---
title: Kafka 面试
date: 2025-02-03 11:15:43
cover: https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-event-system.png
categories:
  - 分布式
  - 分布式通信
  - MQ
  - Kafka
tags:
  - Java
  - 中间件
  - MQ
  - Kafka
  - 面试
permalink: /pages/404a13d7/
---

# Kafka 面试

## Kafka 简介

### 【基础】什么是 Kafka?

:::details 要点

Apache Kafka 是一款开源的消息引擎系统，也是一个分布式流计算平台，此外，还可以作为数据存储\*\*。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-event-system.png)

Kafka 的核心功能如下：

- **消息引擎** - Kafka 可以作为一个消息引擎系统。
- **流处理** - Kafka 可以作为一个分布式流处理平台。
- **存储** - Kafka 可以作为一个安全的分布式存储。

Kafka 的设计目标：

- **高性能**
  - **分区、分段、索引**：基于分区机制提供并发处理能力。分段、索引提升了数据读写的查询效率。
  - **顺序读写**：使用顺序读写提升磁盘 IO 性能。
  - **零拷贝**：利用零拷贝技术，提升网络 I/O 效率。
  - **页缓存**：利用操作系统的 PageCache 来缓存数据（典型的利用空间换时间）
  - **批量读写**：批量读写可以有效提升网络 I/O 效率。
  - **数据压缩**：Kafka 支持数据压缩，可以有效提升网络 I/O 效率。
  - **pull 模式**：Kafka 架构基于 pull 模式，可以自主控制消费策略，提升传输效率。
- **高可用**
  - **持久化**：Kafka 所有的消息都存储在磁盘，天然支持持久化。
  - **副本机制**：Kafka 的 Broker 集群支持副本机制，可以通过冗余，来保证其整体的可用性。
  - **选举 Leader**：Kafka 基于 ZooKeeper 支持选举 Leader，实现了故障转移能力。
- **伸缩性**
  - **分区**：Kafka 的分区机制使得其具有良好的伸缩性。

:::

## 生产者

### 【中级】Kafka 发送消息的工作流程是怎样的？

:::details 要点

Kafka 生产者用一个 `ProducerRecord` 对象来抽象一条要发送的消息， `ProducerRecord` 对象需要包含目标主题和要发送的内容，还可以指定键或分区。其发送消息流程如下：

（1）**序列化** - 生产者要先把键和值序列化成字节数组，这样它们才能够在网络中传输。

（2）**分区** - 数据被传给分区器。如果在 `ProducerRecord` 中已经指定了分区，那么分区器什么也不会做；否则，分区器会根据 `ProducerRecord` 的键来选择一个分区。选定分区后，生产者就知道该把消息发送给哪个主题的哪个分区。

（3）**批次传输** - 接着，这条记录会被添加到一个记录批次中。这个批次中的所有消息都会被发送到相同的主题和分区上。有一个独立的线程负责将这些记录批次发送到相应 Broker 上。

- **批次，就是一组消息，这些消息属于同一个主题和分区**。
- 发送时，会把消息分成批次传输，如果每次只发送一个消息，会占用大量的网路开销。

（4）**响应** - 服务器收到消息会返回一个响应。

- 如果**成功**，则返回一个 `RecordMetaData` 对象，它包含了主题、分区、偏移量；
- 如果**失败**，则返回一个错误。生产者在收到错误后，可以进行重试，重试次数可以在配置中指定。失败一定次数后，就返回错误消息。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200528224323.png)

生产者向 Broker 发送消息时是怎么确定向哪一个 Broker 发送消息？

- 生产者会向任意 broker 发送一个元数据请求（`MetadataRequest`），获取到每一个分区对应的 Leader 信息，并缓存到本地。
- 生产者在发送消息时，会指定 Partition 或者通过 key 得到到一个 Partition，然后根据 Partition 从缓存中获取相应的 Leader 信息。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200621113043.png)

:::

## 消费者

### 【中级】如何消费 Kafka 消息？

:::details 要点

#### 消费者

每个 Consumer 的唯一元数据是该 Consumer 在日志中消费的位置。这个偏移量是由 Consumer 控制的：Consumer 通常会在读取记录时线性的增加其偏移量。但实际上，由于位置由 Consumer 控制，所以 Consumer 可以采用任何顺序来消费记录。

**一条消息只有被提交，才会被消费者获取到**。如下图，只能消费 Message0、Message1、Message2：

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200621113917.png)

#### 消费者群组

**Consumer Group 是 Kafka 提供的可扩展且具有容错性的消费者机制**。

Kafka 的写入数据量很庞大，如果只有一个消费者，消费消息速度很慢，时间长了，就会造成数据积压。为了减少数据积压，Kafka 支持消费者群组，可以让多个消费者并发消费消息，对数据进行分流。

Kafka 消费者从属于消费者群组，**一个群组里的 Consumer 订阅同一个 Topic，一个主题有多个 Partition，每一个 Partition 只能隶属于消费者群组中的一个 Consumer**。

如果超过主题的分区数量，那么有一部分消费者就会被闲置，不会接收到任何消息。

同一时刻，**一条消息只能被同一消费者组中的一个消费者实例消费**。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210408194235.png)

**不同消费者群组之间互不影响**。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210408194839.png)

#### 消费流程

Kafka 消费者通过 `poll` 来获取消息，但是获取消息时并不是立刻返回结果，需要考虑两个因素：

- 消费者通过 `customer.poll(time)` 中设置等待时间
- Broker 会等待累计一定量数据，然后发送给消费者。这样可以减少网络开销。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210425194822.png)

poll 除了获取消息外，还有其他作用：

- **发送心跳信息**。消费者通过向被指派为群组协调器的 Broker 发送心跳来维护他和群组的从属关系，当机器宕掉后，群组协调器触发再均衡。

:::

## 分区

### 【中级】什么是分区？为什么要分区？

:::details 要点

Kafka 的数据结构采用三级结构，即：主题（Topic）、分区（Partition）、消息（Record）。

在 Kafka 中，任意一个 Topic 维护了一组 Partition 日志，如下所示：

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/mq/kafka/kafka-log-anatomy.png)

每个 Partition 都是一个单调递增的、不可变的日志记录，以不断追加的方式写入数据。Partition 中的每条记录会被分配一个单调递增的 id 号，称为偏移量（Offset），用于唯一标识 Partition 内的每条记录。

为什么 Kafka 的数据结构采用三级结构？

**分区的作用就是提供负载均衡的能力**，以实现系统的高伸缩性（Scalability）。

不同的分区能够被放置到不同节点的机器上，而数据的读写操作也都是针对分区这个粒度而进行的，这样每个节点的机器都能独立地执行各自分区的读写请求处理。并且，我们还可以通过添加新的机器节点来增加整体系统的吞吐量。

:::

### 【中级】Kafka 的分区策略是怎样的？

:::details 要点

所谓分区策略是决定生产者将消息发送到哪个分区的算法，也就是负载均衡算法。

Kafka 生产者发送消息使用的对象 `ProducerRecord` ，可以选填 Partition 和 Key。不过，大多数应用会用到 key。key 有两个作用：作为消息的附加信息；也可以用来决定消息该被写到 Topic 的哪个 Partition，拥有相同 key 的消息将被写入同一个 Partition。

**如果 `ProducerRecord` 指定了 Partition，则分区器什么也不做**，否则分区器会根据 key 选择一个 Partition 。

- 没有 key 时的分发逻辑：每隔 `topic.metadata.refresh.interval.ms` 的时间，随机选择一个 partition。这个时间窗口内的所有记录发送到这个 partition。发送数据出错后会重新选择一个 partition。
- 根据 key 分发：Kafka 的选择分区策略是：根据 key 求 hash 值，然后将 hash 值对 partition 数量求模。这里的关键点在于，**同一个 key 总是被映射到同一个 Partition 上**。所以，在选择分区时，Kafka 会使用 Topic 的所有 Partition ，而不仅仅是可用的 Partition。这意味着，**如果写入数据的 Partition 是不可用的，那么就会出错**。

:::

### 【中级】如何自定义分区策略？

:::details 要点

如果 Kafka 的默认分区策略无法满足实际需要，可以自定义分区策略。需要显式地配置生产者端的参数 `partitioner.class`。这个参数该怎么设定呢？

首先，要实现 `org.apache.kafka.clients.producer.Partitioner` 接口。这个接口定义了两个方法：`partition` 和 `close`，通常只需要实现最重要的 `partition` 方法。我们来看看这个方法的方法签名：

```java
int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster);
```

这里的 `topic`、`key`、`keyBytes`、`value`和 `valueBytes` 都属于消息数据，`cluster` 则是集群信息（比如当前 Kafka 集群共有多少主题、多少 Broker 等）。Kafka 给你这么多信息，就是希望让你能够充分地利用这些信息对消息进行分区，计算出它要被发送到哪个分区中。

接着，设置 `partitioner.class` 参数为自定义类的全限定名，那么生产者程序就会按照你的代码逻辑对消息进行分区。

负载均衡算法常见的有：

- 随机算法
- 轮询算法
- 最小活跃数算法
- 源地址哈希算法

可以根据实际需要去实现。

:::

## 重复消息

### 【中级】如何避免重复消息？

:::details 要点

应对重复消费问题，需要在业务层面，通过 **幂等性设计** 来解决。

**幂等**（idempotent、idempotence）是一个数学与计算机学概念，指的是：**一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。**

#### Kafka Producer 的幂等性

在 Kafka 中，Producer **默认不是幂等性的**，但我们可以创建幂等性 Producer。它其实是 0.11.0.0 版本引入的新功能。在此之前，Kafka 向分区发送数据时，可能会出现同一条消息被发送了多次，导致消息重复的情况。在 0.11 之后，指定 Producer 幂等性的方法很简单，仅需要设置一个参数即可，即 `props.put(“enable.idempotence”, ture)`，或 `props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG， true)`。

`enable.idempotence` 被设置成 true 后，Producer 自动升级成幂等性 Producer，其他所有的代码逻辑都不需要改变。Kafka 自动帮你做消息的去重。底层具体的原理很简单，就是经典的用空间去换时间的优化思路，即在 Broker 端多保存一些字段。当 Producer 发送了具有相同字段值的消息后，Broker 能够自动知晓这些消息已经重复了，于是可以在后台默默地把它们“丢弃”掉。当然，实际的实现原理并没有这么简单，但你大致可以这么理解。

我们必须要了解幂等性 Producer 的作用范围：

- 首先，**`enable.idempotence` 只能保证单分区上的幂等性**，即一个幂等性 Producer 能够保证某个主题的一个分区上不出现重复消息，它无法实现多个分区的幂等性。
- 其次，**它只能实现单会话上的幂等性，不能实现跨会话的幂等性**。这里的会话，你可以理解为 Producer 进程的一次运行。当你重启了 Producer 进程之后，这种幂等性保证就丧失了。

如果想实现多分区以及多会话上的消息无重复，应该怎么做呢？答案就是事务（transaction）或者依赖事务型 Producer。这也是幂等性 Producer 和事务型 Producer 的最大区别！

#### PID 和 Sequence Number

为了实现 Producer 的幂等性，Kafka 引入了 Producer ID（即 PID）和 Sequence Number。

- **PID**。每个新的 Producer 在初始化的时候会被分配一个唯一的 PID，这个 PID 对用户是不可见的。
- **Sequence Numbler**。对于每个 PID，该 Producer 发送数据的每个 `<Topic, Partition>` 都对应一个从 0 开始单调递增的 Sequence Number。

Broker 端在缓存中保存了这 seq number，对于接收的每条消息，如果其序号比 Broker 缓存中序号大于 1 则接受它，否则将其丢弃。这样就可以实现了消息重复提交了。但是，只能保证单个 Producer 对于同一个 `<Topic, Partition>` 的 Exactly Once 语义。不能保证同一个 Producer 一个 topic 不同的 partion 幂等。

![img](http://www.heartthinkdo.com/wp-content/uploads/2018/05/1-1.png)

实现幂等之后：

![img](http://www.heartthinkdo.com/wp-content/uploads/2018/05/2.png)

#### 幂等性的应用实例

（1）配置属性

需要设置：

- `enable.idempotence`，需要设置为 ture，此时就会默认把 acks 设置为 all，所以不需要再设置 acks 属性了。

```java
// 指定生产者的配置
final Properties properties = new Properties();
properties.put("bootstrap.servers", "localhost:9092");
// 设置 key 的序列化器
properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
// 设置 value 的序列化器
properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// 开启幂等性
properties.put("enable.idempotence", true);
// 设置重试次数
properties.put("retries", 3);
//Reduce the no of requests less than 0
properties.put("linger.ms", 1);
// buffer.memory 控制生产者可用于缓冲的内存总量
properties.put("buffer.memory", 33554432);

// 使用配置初始化 Kafka 生产者
producer = new KafkaProducer<>(properties);
```

（2）发送消息

跟一般生产者一样，如下

```java
public void produceIdempotMessage(String topic, String message) {
    // 创建Producer
    Producer producer = buildIdempotProducer();
    // 发送消息
    producer.send(new ProducerRecord<String, String>(topic, message));
    producer.flush();
}
```

此时，因为我们并没有配置 `transaction.id` 属性，所以不能使用事务相关 API，如下

```java
producer.initTransactions();
```

否则会出现如下错误：

```java
Exception in thread “main” java.lang.IllegalStateException: Transactional method invoked on a non-transactional producer.
    at org.apache.kafka.clients.producer.internals.TransactionManager.ensureTransactional(TransactionManager.java:777)
    at org.apache.kafka.clients.producer.internals.TransactionManager.initializeTransactions(TransactionManager.java:202)
    at org.apache.kafka.clients.producer.KafkaProducer.initTransactions(KafkaProducer.java:544)
```

:::

## 事务

### 【中级】Kafka 是否支持事务？如何支持事务？

:::details 要点

**Kafka 的事务概念是指一系列的生产者生产消息和消费者提交偏移量的操作在一个事务，或者说是是一个原子操作），同时成功或者失败**。

消息可靠性保障，由低到高为：

- 最多一次（at most once）：消息可能会丢失，但绝不会被重复发送。
- 至少一次（at least once）：消息不会丢失，但有可能被重复发送。
- 精确一次（exactly once）：消息不会丢失，也不会被重复发送。

Kafka 支持事务功能主要是为了实现精确一次处理语义的，而精确一次处理是实现流处理的基石。

Kafka 自 0.11 版本开始提供了对事务的支持，目前主要是在 read committed 隔离级别上做事情。它能**保证多条消息原子性地写入到目标分区，同时也能保证 Consumer 只能看到事务成功提交的消息**。

#### 事务型 Producer

事务型 Producer 能够保证将消息原子性地写入到多个分区中。这批消息要么全部写入成功，要么全部失败。另外，事务型 Producer 也不惧进程的重启。Producer 重启回来后，Kafka 依然保证它们发送消息的精确一次处理。

**事务属性实现前提是幂等性**，即在配置事务属性 `transaction.id` 时，必须还得配置幂等性；但是幂等性是可以独立使用的，不需要依赖事务属性。

在事务属性之前先引入了生产者幂等性，它的作用为：

- **生产者多次发送消息可以封装成一个原子操作**，要么都成功，要么失败。
- consumer-transform-producer 模式下，因为消费者提交偏移量出现问题，导致**重复消费**。需要将这个模式下消费者提交偏移量操作和生产者一系列生成消息的操作封装成一个原子操作。

**消费者提交偏移量导致重复消费消息的场景**：消费者在消费消息完成提交便宜量 o2 之前挂掉了（假设它最近提交的偏移量是 o1），此时执行再均衡时，其它消费者会重复消费消息(o1 到 o2 之间的消息）。

#### Kafka 事务相关配置

使用 kafka 的事务 api 时的一些注意事项：

- 需要消费者的自动模式设置为 false，并且不能子再手动的进行执行 `consumer#commitSync` 或者 `consumer#commitAsyc`
- 设置 Producer 端参数 `transctional.id`。最好为其设置一个有意义的名字。
- 和幂等性 Producer 一样，开启 `enable.idempotence = true`。如果配置了 `transaction.id`，则此时 `enable.idempotence` 会被设置为 true
- 消费者需要配置事务隔离级别 `isolation.level`。在 `consume-trnasform-produce` 模式下使用事务时，必须设置为 `READ_COMMITTED`。
  - `read_uncommitted`：这是默认值，表明 Consumer 能够读取到 Kafka 写入的任何消息，不论事务型 Producer 提交事务还是终止事务，其写入的消息都可以读取。很显然，如果你用了事务型 Producer，那么对应的 Consumer 就不要使用这个值。
  - `read_committed`：表明 Consumer 只会读取事务型 Producer 成功提交事务写入的消息。当然了，它也能看到非事务型 Producer 写入的所有消息。

:::
