---
title: 分布式 ID
date: 2019-07-24 11:55:00
order: 04
categories:
  - 分布式
  - 分布式协同
tags:
  - 分布式
  - 协同
  - 分布式 ID
  - UUID
  - Snowflake
  - Leaf
permalink: /pages/1050baf5/
---

# 分布式 ID

## 分布式 ID 简介

### 什么是分布式 ID？

ID 是 Identity 的缩写，用于唯一的标识一条数据。**分布式 ID**，顾名思义，是**用于在分布式系统中唯一标识数据的 ID**。

### 为什么需要分布式 ID？

传统数据库基本都支持针对单表生成唯一性的自增主键。随着数据的膨胀，单机成为了性能和容量的瓶颈。为了解决这个问题，有了分库分表技术。分库分表所要面临的第一个问题是：数据分布在不同机器上，数据库无法保证多个节点上产生的主键唯一。 这就需要用到分布式 ID 了，它起到了分布式系统中**全局 ID** 的作用。

### 分布式 ID 的设计目标

首先，分布式 ID 应该具备哪些特性呢？

1. **全局唯一性** - 不能出现重复的 ID 号，既然是唯一标识，这是最基本的要求。
2. **单调递增** - 保证下一个 ID 一定大于上一个 ID，例如事务版本号、IM 增量消息、排序等特殊需求。
3. **高性能** - 分布式 ID 的生成速度要快，对本地资源消耗要小。
4. **高可用** - 生成分布式 ID 的服务要保证可用性无限接近于 100%。
5. **安全性** - ID 中不应包括敏感信息。

## UUID

UUID 是通用唯一识别码（Universally Unique Identifier）的缩写，是一种 128 位的标识符，由32个16进制字符表示。**UUID 会根据运行应用的计算机网卡 MAC 地址、时间戳、命名空间等元素，通过一定的随机算法产生**。

UUID 不保证全局唯一性，我们需要小心 ID 冲突（尽管这种可能性很小）。

[维基百科 - UUID](https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E5%94%AF%E4%B8%80%E8%AF%86%E5%88%AB%E7%A0%81) 中介绍了 5 种 UUID 算法。

### 版本 1

UUID 版本 1 **根据时间和 MAC 地址生成 UUID**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/10c8d68cbbcb45f4aeb538ada8f6903f.png)

组成参数说明：

- **time_low** - 与日期时间信息的低值有关
- **time_mid** - 与日期时间信息的 mid 值有关
- **time_high_and_version** - 与日期时间信息的高值有关
- **clock_seq_hi_and_reserved** - 与计算机系统的内部时钟序列有关
- **MAC 地址** - 设备的 MAC 地址

### 版本 2

UUID 版本 2 **根据时间和 MAC 地址、DCE Security 生成 UUID**。

它将版本 1 中的日期时间信息替换为本地域名。它没有被广泛使用，因为它降低了唯一性。

### 版本 3

UUID 版本 3 **使用命名空间和名称生成 UUID**。**命名空间**本身是一个 UUID，URL 名称用作标识。二者组合后，通过 **MD5** 哈希算法计算生成 UUID。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/915fb69f559d4bf2b238e78dedb0537e.png)

### 版本 5

UUID 版本 5 和 版本 4 近似，都**使用命名空间和名称生成 UUID**。差异在于：**版本 3 采用 MD5 作为哈希算法**；**版本 5 采用 SHA1 作为哈希算法**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/adb8a49d0b374e3798e97d4ba269ca16.png)

**版本 3 、版本 5** - 基于哈希命名空间标识符和名称生成 UUID，差异在于：版本 3 采用 MD5 作为哈希算法；版本 5 采用 SHA1 作为哈希算法。

### 版本 4

版本 4 随机生成 UUID，不包含其他 UUID 中使用的任何信息 （命名空间、MAC 地址、时间）。识别它的唯一方法是版本 4 UUID，字符只是 **4** 位于 UUID 第三部分的第一个位置。其他字符是随机生成的。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/90754adb223348c2b8aa2f8524085c0e.png)

版本 4 是最常见的 UUID 实现，JDK 中也提供了实现，示例如下：

```java
String uuid = UUID.randomUUID().toString();
```

### UUID 的优缺点

- **优点**
  - 简单、生成速度较快（本地生成，不依赖其他服务）
- **缺点**
  - **无序** - 不能生成递增有序的数字，这不利于一些特定场景。如：MySQL InnoDB 存储引擎使用 B+ 树存储索引数据，索引数据在 B+ 树中是有序排列的。而 UUID 的无序性可能会引起数据位置频繁变动，严重影响性能。
  - **长度过长** - UUID 需要占用 32 个字节
  - **信息不安全** - 基于 MAC 地址生成 UUID 的算法，可能会造成 MAC 地址泄露，这个漏洞曾被用于寻找梅丽莎病毒的制作者位置。

## 数据库自增序列

大多数数据库都支持自增主键。基于此特性，可以利用事务管理控制生成唯一 ID。

以 MySQL 举例，我们通过下面的方式即可。

（1）创建一个专用于生成 ID 的表

```sql
CREATE TABLE `sequence_id` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `stub` char(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `stub` (`stub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

`stub` 字段无意义，只是为了占位，便于我们插入或者修改数据。并且，给 `stub` 字段创建了唯一索引，保证其唯一性。

（2）通过 `replace into` 来插入数据。

```sql
BEGIN;
REPLACE INTO sequence_id (stub) VALUES ('stub');
SELECT LAST_INSERT_ID();
COMMIT;
```

插入数据这里，我们没有使用 `insert into` 而是使用 `replace into` 来插入数据，具体步骤是这样的：

- 第一步：尝试把数据插入到表中。
- 第二步：如果主键或唯一索引字段出现重复数据错误而插入失败时，先从表中删除含有重复关键字值的冲突行，然后再次尝试把数据插入到表中。

这种方式的优缺点也比较明显：

- **优点**：
  - 方案简单
  - 有序
  - ID 长度小
- **缺点**：
  - 性能差
  - 每次获取 ID 都要访问一次数据库，增加了对数据库的压力
  - 不安全，根据发号数量信息可能推测出业务规模
  - 单点问题，如果数据库宕机会造成服务不可用，可以使用高可用方案来解决，但会增加复杂度

## 数据库生成号段

数据库自增序列这种模式，每次获取 ID 都要请求一次数据库。当请求并发量高时，会给数据库带来很大的压力，并且生成 ID 的性能也比较差。

可以采用**批处理**的思路来优化数据库自增序列方案。申请 ID 改为批量获取，不再一次只申请一个 ID，而是一次批量生成一个 segment（号段），号段的大小由 step（步长）控制。用完之后再去数据库获取新的号段，可以大大的减轻数据库的压力。各个业务不同的发号需求用 biz_tag 字段来区分，每个 biz_tag 的 ID 获取相互隔离，互不影响。如果以后有性能需求需要对数据库扩容，不需要上述描述的复杂的扩容操作，只需要对 biz_tag 分库分表就行。

以 MySQL 举例，我们通过下面的方式即可。

```sql
CREATE TABLE `leaf_alloc` (
  `biz_tag` varchar(128)  NOT NULL DEFAULT '',
  `max_id` bigint(20) NOT NULL DEFAULT '1',
  `step` int(11) NOT NULL,
  `description` varchar(256)  DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`biz_tag`)
) ENGINE=InnoDB;

insert into leaf_alloc(biz_tag, max_id, step, description) values('leaf-segment-test', 1, 2000, 'Test leaf Segment Mode Get Id')
```

重要字段说明：

- `biz_tag` 用来区分业务
- `max_id` 表示该 `biz_tag` 目前所被分配的 ID 号段的最大值
- `step` 表示每次分配的号段长度。原来获取 ID 每次都需要写数据库，现在只需要把 `step` 设置得足够大，比如 1000。那么只有当 1000 个号被消耗完了之后才会去重新读写一次数据库。读写数据库的频率从 1 减小到了 1/step。

大致架构如下图所示：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/4670063daaea4fada17b89b848133837.png)

test_tag 在第一台 Leaf 机器上是 `1~1000` 的号段，当这个号段用完时，会去加载另一个长度为 step=1000 的号段，假设另外两台号段都没有更新，这个时候第一台机器新加载的号段就应该是 `3001~4000`。同时数据库对应的 biz_tag 这条数据的 max_id 会从 3000 被更新成 4000，更新号段的 SQL 语句如下：

```sql
Begin
UPDATE table SET max_id=max_id+step WHERE biz_tag=xxx
SELECT tag, max_id, step FROM table WHERE biz_tag=xxx
Commit
```

**数据库号段模式的优缺点：**

- **优点**：
  - 有序
  - ID 长度小
  - 效率比数据库自增序列方式高很多
- **缺点**
  - 号段使用完，还是需要向数据库发起事务更新，以获取新号段
  - 不安全，根据发号数量信息可能推测出业务规模
  - 单点问题，如果数据库宕机会造成服务不可用，可以使用高可用方案来解决，但会增加复杂度

> 扩展：滴滴的 [tinyid](https://github.com/didi/tinyid) 和美团的 [Leaf](https://github.com/Meituan-Dianping/Leaf) 都是基于数据库生成号段方案实现的，不过都各自做了一些优化。
>
> 美团技术团队还对分布式 ID 生成做了一篇技术分享：[Leaf——美团点评分布式 ID 生成系统](https://tech.meituan.com/2017/04/21/mt-leaf.html)，其对于数据库号段模式的优化要点如下：
>
> - Leaf 采用双 Buffer 优化，避免号段耗尽时，阻塞以获取新号段。其本质上是：通过双缓存，提前预热号段缓存。
> - 此外，基于 Atlas（以改名 DBProxy）保障数据库的高可用。也就是保护了号段数据存储的高可用。

## 原子计数器

一些 NoSQL 数据库提供了原子性的计数器，可以基于这点，来实现分布式 ID。

### Redis 生成自增键

Redis 的 String 类型提供 `INCR` 和 `INCRBY` 命令将 key 中储存的数字**原子递增**。

为避免单点问题，可以采用 Redis Cluster。

**Redis 方案的优缺点：**

- **优点**：高性能、有序
- **缺点**：和数据库自增序列方案的缺点类似

### ZooKeeper 生成自增键

利用 ZooKeeper 中的顺序节点特性，很容易使我们创建的 ID 编码具有有序的特性。并且我们也可以通过客户端传递节点的名称，根据不同的业务编码区分不同的业务系统，从而使编码的扩展能力更强。

**每个需要 ID 编码的业务服务器可以看作是 ZooKeeper 的客户端**。ID 编码生成器可以作为 ZooKeeper 的服务端。客户端通过发送请求到 ZooKeeper 服务器，来获取编码信息，服务端接收到请求后，发送 ID 编码给客户端。

![Drawing 2.png](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/d971189a0dea443187b7b6327358ee1a.png)

可以利用 ZooKeeper 数据模型中的顺序节点作为 ID 编码。客户端通过调用 create 函数创建顺序节点。服务器成功创建节点后，会响应客户端请求，把创建好的节点信息发送给客户端。客户端用数据节点名称作为 ID 编码，进行之后的本地业务操作。

:::details 要点

```java
@Slf4j
public class ZookeeperDistributedId {

    public static void main(String[] args) throws Exception {

        // 获取客户端
        RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
        CuratorFramework client = CuratorFrameworkFactory.newClient("127.0.0.1:2181", retryPolicy);

        // 开启会话
        client.start();

        String id1 = client.create()
                           .creatingParentsIfNeeded()
                           .withMode(CreateMode.PERSISTENT_SEQUENTIAL)
                           .forPath("/zkid/id_");
        log.info("id: {}", id1);

        String id2 = client.create()
                           .creatingParentsIfNeeded()
                           .withMode(CreateMode.PERSISTENT_SEQUENTIAL)
                           .forPath("/zkid/id_");
        log.info("id: {}", id2);

        List<String> children = client.getChildren().forPath("/zkid");
        if (CollectionUtil.isNotEmpty(children)) {
            for (String child : children) {
                client.delete().forPath("/zkid/" + child);
            }
        }
        client.delete().forPath("/zkid");

        // 关闭客户端
        client.close();
    }

}
```

:::

**ZooKeeper 方案的优缺点：**

- **优点**：简单、可靠性高
- **缺点**：性能不高

## 雪花算法（Snowflake）

雪花算法（Snowflake）是由 Twitter 公布的分布式主键生成算法，**它会生成一个 `64 bit` 的整数**，可以保证不同进程主键的不重复性，以及相同进程主键的有序性。在同一个进程中，它首先是通过时间位保证不重复，如果时间相同则是通过序列位保证。 同时由于时间位是单调递增的，且各个服务器如果大体做了时间同步，那么生成的主键在分布式环境可以认为是总体有序的，这就保证了对索引字段的插入的高效性。

### 键的组成

使用**雪花算法生成的主键，二进制表示形式包含 4 部分**，从高位到低位分表为：1bit 符号位、41bit 时间戳位、10bit 工作进程位以及 12bit 序列号位。

- **符号位 (1bit)**

预留的符号位，恒为零。

- **时间戳位 (41bit)**

41 位的时间戳可以容纳的毫秒数是 2 的 41 次幂，一年所使用的毫秒数是：`365 * 24 * 60 * 60 * 1000`。通过计算可知：

```java
Math.pow(2, 41) / (365 * 24 * 60 * 60 * 1000L);
```

结果约等于 69.73 年。ShardingSphere 的雪花算法的时间纪元从 2016 年 11 月 1 日零点开始，可以使用到 2086 年，相信能满足绝大部分系统的要求。

- **工作进程位 (10bit)**

该标志在 Java 进程内是唯一的，如果是分布式应用部署应保证每个工作进程的 id 是不同的。该值默认为 0，可通过属性设置。

- **序列号位 (12bit)**

该序列是用来在同一个毫秒内生成不同的 ID。如果在这个毫秒内生成的数量超过 4096(2 的 12 次幂），那么生成器会等待到下个毫秒继续生成。

雪花算法主键的详细结构见下图：

![雪花算法](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/5c3f3aafb4df450dbe3acb2e9f63553a.png)

### 时钟回拨

服务器时钟回拨会导致产生重复序列，因此默认分布式主键生成器提供了一个最大容忍的时钟回拨毫秒数。 如果时钟回拨的时间超过最大容忍的毫秒数阈值，则程序报错；如果在可容忍的范围内，默认分布式主键生成器会等待时钟同步到最后一次主键生成的时间后再继续工作。 最大容忍的时钟回拨毫秒数的默认值为 0，可通过属性设置。

雪花算法是强依赖于时间的，而如果机器时间发生回拨，有可能会生成重复的 ID。

我们可以针对算法做一些优化，来防止时钟回拨生成重复 ID。

用当前时间和上一次的时间进行判断，如果当前时间小于上一次的时间那么肯定是发生了回拨。普通的算法会直接抛出异常，这里我们可以对其进行优化，一般分为两个情况：

- 如果时间回拨时间较短，比如配置 `5ms` 以内，那么可以直接等待一定的时间，让机器的时间追上来。
- 如果时间的回拨时间较长，我们不能接受这么长的阻塞等待，那么又有两个策略：
  - 直接拒绝，抛出异常。打日志，通知 RD 时钟回滚。
  - 利用扩展位。上面我们讨论过，不同业务场景位数可能用不到那么多比特位，那么我们可以把扩展位数利用起来。比如：当这个时间回拨比较长的时候，我们可以不需要等待，直接在扩展位加 1。两位的扩展位允许我们有三次大的时钟回拨，一般来说就够了，如果其超过三次我们还是选择抛出异常，打日志。

### 灵活定制

上面只是一个将 `64bit` 划分的标准，当然也不一定这么做，可以根据不同业务的具体场景来划分，比如下面给出一个业务场景：

- 服务目前 QPS10 万，预计几年之内会发展到百万。
- 当前机器三地部署，上海，北京，深圳都有。
- 当前机器 10 台左右，预计未来会增加至百台。

这个时候我们根据上面的场景可以再次合理的划分 62bit，QPS 几年之内会发展到百万，那么每毫秒就是千级的请求，目前 10 台机器那么每台机器承担百级的请求，为了保证扩展，后面的循环位可以限制到 1024，也就是 2^10，那么循环位 10 位就足够了。

机器三地部署我们可以用 3bit 总共 8 来表示机房位置，当前的机器 10 台，为了保证扩展到百台那么可以用 7bit 128 来表示，时间位依然是 41bit，那么还剩下 64-10-3-7-41-1 = 2bit，还剩下 2bit 可以用来进行扩展。

### 雪花算法小结

雪花算法的**利弊**：

- **优点**
  - 生成的 ID 都是趋势递增的。
  - 不依赖数据库等第三方系统，以服务的方式部署，稳定性更高，生成 ID 的性能也是非常高的。
  - 可以根据自身业务特性分配 bit 位，非常灵活。
- **缺点**
  - 强依赖机器时钟，如果机器上时钟回拨，会导致发号重复或者服务会处于不可用状态。

雪花算法的**适用场景**：

当我们需要无序不能被猜测的 ID，并且需要一定高性能，且需要 long 型，那么就可以使用我们雪花算法。比如常见的订单 ID，用雪花算法别人就无法猜测你每天的订单量是多少。

## 应用场景

分布式 ID 在分布式系统中几乎无处不在，常见的典型应用场景包括：

- **分库分表主键** - 当数据库采用分库分表方案后，单表的自增主键无法保证全局唯一，必须使用分布式 ID。例如：电商系统的订单表、支付流水表拆分到多个数据库实例后，订单号需要全局唯一。
- **订单号 / 流水号** - 业务系统需要生成全局唯一的订单号、支付流水号、退款单号等。这些 ID 除了唯一性外，通常还要求趋势递增、不可猜测（防泄露业务量）。
- **消息 ID** - 在消息队列中，消息需要全局唯一标识，以便消费端做幂等处理，避免重复消费。
- **链路追踪 TraceId** - 分布式链路追踪系统中，一次请求跨越多个微服务，需要一个全局唯一的 TraceId 串联整个调用链路。
- **分布式 Session** - 分布式会话管理中，每个会话需要全局唯一的 SessionID。
- **文件 / 对象存储** - 分布式文件系统或对象存储中，每个文件 / 对象需要全局唯一的标识，如 FastDFS 的 file_id、OSS 的 object key。
- **用户 ID / 商品 ID** - 用户量、商品量巨大时，ID 分配需要支持分布式生成，避免单点瓶颈。
- **日志 / 操作记录 ID** - 分布式日志系统中，每条日志或操作记录需要全局唯一 ID 便于检索和去重。

### 场景选型建议

| 场景 | 推荐方案 | 理由 |
| ---- | -------- | ---- |
| 订单号 / 支付流水号 | 雪花算法 / Leaf | 趋势递增、不可猜测、高性能 |
| 分库分表主键 | 雪花算法 / Leaf 号段 | 全局唯一、单调递增、对索引友好 |
| 链路追踪 TraceId | 雪花算法变种 | 本地生成、无网络开销、高性能 |
| 消息 ID | UUID / 雪花算法 | 唯一即可，无需递增 |
| 用户 ID / 商品 ID | 数据库号段 (Leaf) | 趋势递增、可读性较好 |
| 缓存 key 防穿透 | UUID | 仅需唯一性，无需递增 |

## 最佳实践

### 案例 1：基于 ShardingSphere 的雪花算法主键生成

ShardingSphere 内置了雪花算法分布式主键生成器 `org.apache.shardingsphere.spi.keygen.core.snowflake.SnowflakeKeyGenerator`，可以直接用于分库分表场景。

（1）Maven 依赖

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc-core</artifactId>
    <version>5.3.2</version>
</dependency>
```

（2）分片规则配置（YAML）

```yaml
dataSources:
  ds_0:
    dataSourceClassName: com.zaxxer.hikari.HikariDataSource
    driverClassName: com.mysql.cj.jdbc.Driver
    jdbcUrl: jdbc:mysql://localhost:3306/demo_ds_0
    username: root
    password: root

rules:
- !SHARDING
  tables:
    t_order:
      actualDataNodes: ds_${0..1}.t_order_${0..1}
      tableStrategy:
        standard:
          shardingColumn: order_id
          shardingAlgorithmName: t_order_inline
      keyGenerateStrategy:
        column: order_id
        keyGeneratorName: snowflake
  shardingAlgorithms:
    t_order_inline:
      type: INLINE
      props:
        algorithm-expression: t_order_${order_id % 2}
  keyGenerators:
    snowflake:
      type: SNOWFLAKE
      props:
        worker-id: 123
```

（3）实体与 Mapper

```java
public class Order {
    private Long orderId;
    private Long userId;
    private String status;
    // 省略 getter/setter
}
```

```java
@Mapper
public interface OrderMapper {
    @Insert("INSERT INTO t_order (user_id, status) VALUES (#{userId}, #{status})")
    int insert(Order order);
}
```

说明：`order_id` 由 ShardingSphere 自动通过雪花算法生成并回填到实体对象，无需业务代码干预。

### 案例 2：基于 Redis 的自增序列实现秒杀单号

秒杀场景下，要求单号全局唯一、严格递增、生成速度极快，适合使用 Redis 的 `INCR` 命令。

```java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class RedisSerialIdGenerator {

    private final JedisPool jedisPool;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

    /**
     * 生成订单号：前缀 + 日期 + 6 位自增序列
     * 例如：SO20260721000001
     */
    public String generateOrderNo(String bizPrefix) {
        String date = LocalDate.now().format(FORMATTER);
        String key = "id:order:" + bizPrefix + ":" + date;
        try (Jedis jedis = jedisPool.getResource()) {
            // 使用 INCR 原子自增，并设置当天过期
            long seq = jedis.incr(key);
            if (seq == 1L) {
                jedis.expire(key, 24 * 60 * 60 + 60);
            }
            return String.format("%s%s%06d", bizPrefix, date, seq);
        }
    }
}
```

使用示例：

```java
JedisPool pool = new JedisPool("localhost", 6379);
RedisSerialIdGenerator generator = new RedisSerialIdGenerator(pool);
String orderNo = generator.generateOrderNo("SO");
System.out.println(orderNo); // SO20260721000001
```

说明：通过 Redis 的 `INCR` 原子操作保证序列号唯一且递增；通过 key 加日期维度实现按天归零；通过设置过期时间避免 key 堆积。

### 案例 3：基于 Leaf 号段模式的实现

Leaf 是美团开源的分布式 ID 生成系统，支持号段（Segment）和 Snowflake 两种模式。下面演示号段模式的接入。

（1）数据库初始化

```sql
CREATE TABLE `leaf_alloc` (
  `biz_tag` varchar(128) NOT NULL DEFAULT '',
  `max_id` bigint(20) NOT NULL DEFAULT '1',
  `step` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`biz_tag`)
) ENGINE=InnoDB;

INSERT INTO leaf_alloc(biz_tag, max_id, step, description)
VALUES ('order-service', 1, 2000, '订单服务 ID 号段');
```

（2）Leaf Server 部署后，通过 HTTP 接口获取 ID

```java
import org.springframework.web.client.RestTemplate;

public class LeafIdClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String leafServerUrl;

    public LeafIdClient(String leafServerUrl) {
        this.leafServerUrl = leafServerUrl;
    }

    public long nextId(String bizTag) {
        String url = leafServerUrl + "/api/segment/get/" + bizTag;
        String result = restTemplate.getForObject(url, String.class);
        return Long.parseLong(result);
    }
}
```

（3）业务调用

```java
LeafIdClient client = new LeafIdClient("http://leaf-server:8080");
long orderId = client.nextId("order-service");
System.out.println("生成的订单 ID: " + orderId);
```

说明：Leaf 通过双 Buffer 优化，在号段消耗到一定比例时异步预加载下一个号段，避免号段切换时的阻塞。`biz_tag` 实现了业务隔离，不同业务的 ID 生成互不影响。

## 常见问题

### 问题 1：雪花算法时钟回拨导致 ID 重复

**问题描述**：生产环境中，某台机器因 NTP 同步或人工调整时间，发生时钟回拨，导致雪花算法生成了重复的 ID，引发主键冲突。

**原因分析**：雪花算法强依赖机器时钟，`41bit` 时间戳记录的是当前时间与起始时间的差值。当时钟回拨后，`lastTimestamp` 会大于当前时间，如果直接使用当前时间生成 ID，则可能与之前生成的 ID 重复（尤其是序列号位也在同一毫秒内被重置）。

**解决方案**：在 `nextId()` 方法中加入时钟回拨检测与处理逻辑。

```java
public class SafeSnowflakeIdGenerator {

    // 起始时间戳 (2026-01-01 00:00:00)
    private static final long EPOCH = 1767196800000L;
    private static final long WORKER_ID_BITS = 10L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long MAX_WORKER_ID = ~(-1L << WORKER_ID_BITS);
    private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BITS);
    private static final long WORKER_ID_SHIFT = SEQUENCE_BITS;
    private static final long TIMESTAMP_LEFT_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS;

    private final long workerId;
    private long sequence = 0L;
    private long lastTimestamp = -1L;
    // 时钟回拨最大容忍毫秒数
    private static final long MAX_BACKWARD_MS = 5L;

    public SafeSnowflakeIdGenerator(long workerId) {
        if (workerId < 0 || workerId > MAX_WORKER_ID) {
            throw new IllegalArgumentException("workerId 非法");
        }
        this.workerId = workerId;
    }

    public synchronized long nextId() {
        long currentTimestamp = System.currentTimeMillis();

        // 时钟回拨检测
        if (currentTimestamp < lastTimestamp) {
            long offset = lastTimestamp - currentTimestamp;
            if (offset <= MAX_BACKWARD_MS) {
                // 回拨在容忍范围内，等待时钟追上
                try {
                    wait(offset + 1);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("时钟回拨等待被中断", e);
                }
                currentTimestamp = System.currentTimeMillis();
                if (currentTimestamp < lastTimestamp) {
                    throw new RuntimeException("时钟回拨超过容忍范围，拒绝生成 ID");
                }
            } else {
                throw new RuntimeException("时钟回拨 " + offset + "ms，超过容忍范围 " + MAX_BACKWARD_MS + "ms");
            }
        }

        if (currentTimestamp == lastTimestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0L) {
                // 同一毫秒序列号耗尽，等待下一毫秒
                currentTimestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = currentTimestamp;
        return ((currentTimestamp - EPOCH) << TIMESTAMP_LEFT_SHIFT)
                | (workerId << WORKER_ID_SHIFT)
                | sequence;
    }

    private long tilNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }
}
```

说明：该实现中，当时钟回拨在 `MAX_BACKWARD_MS`（如 5ms）以内时，通过 `wait()` 等待时钟追上；超过容忍范围则直接抛出异常，拒绝生成 ID，避免重复。

### 问题 2：UUID 作为 MySQL 主键导致性能下降

**问题描述**：某系统将 `UUID.randomUUID().toString()` 生成的 32 位字符串作为 MySQL InnoDB 表的主键，随着数据量增长，写入性能急剧下降，且磁盘空间占用较大。

**原因分析**：InnoDB 使用 B+ 树聚簇索引存储数据，数据物理存储顺序与主键顺序一致。UUID 是完全无序的，每次插入的主键值可能落在 B+ 树的任意位置，导致：
1. **频繁页分裂**：新数据插入到已有数据页中间，触发页分裂与数据移动。
2. **索引碎片化**：页分裂导致数据页不连续，磁盘随机 IO 增加。
3. **空间浪费**：UUID 字符串占用 36 字节（含 `-`），远大于 `bigint` 的 8 字节，二级索引也会存储主键，导致空间放大。

**解决方案**：将主键改为趋势递增的 `bigint`，使用雪花算法或数据库号段生成。

```sql
-- 1. 新增 bigint 主键列
ALTER TABLE t_order ADD COLUMN id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
-- 2. 删除原 UUID 主键
ALTER TABLE t_order DROP PRIMARY KEY;
-- 3. 将原 UUID 字段改为普通唯一索引（如业务仍需）
ALTER TABLE t_order MODIFY uuid CHAR(36) NOT NULL, ADD UNIQUE KEY uk_uuid (uuid);
```

如果业务上确实需要保留 UUID 作为业务标识，应将其作为普通唯一索引，而用雪花算法生成的 `bigint` 作为物理主键：

```java
public class Order {
    // 物理主键，由雪花算法生成，趋势递增，对 B+ 树友好
    private Long id;
    // 业务唯一标识，UUID 生成，仅用于业务层引用
    private String uuid = java.util.UUID.randomUUID().toString();
    // 其他字段...
}
```

### 问题 3：数据库号段模式单点故障导致服务不可用

**问题描述**：使用数据库号段模式生成 ID 的系统，在数据库主节点宕机后，ID 生成服务完全不可用，导致上游业务大面积报错。

**原因分析**：号段模式依赖单一数据库实例，当该实例宕机或网络不通时，无法更新 `max_id` 获取新号段，所有依赖 ID 的业务均会失败。

**解决方案**：

1. **数据库高可用**：使用 MySQL 主从 + MHA / Orchestrator 等高可用方案，主节点故障时自动切换到从节点。
2. **Leaf 双 Buffer 预加载**：在当前号段消耗到一定比例（如 20%）时，异步加载下一个号段，缓存在内存中。即使数据库短暂不可用，仍可从内存号段发号。
3. **降级方案**：当数据库不可用时，降级到本地雪花算法生成 ID，保证业务可用性（牺牲短暂的趋势递增连续性）。

下面是双 Buffer + 降级的简化实现：

```java
import javax.sql.DataSource;
import java.sql.*;
import java.util.concurrent.atomic.AtomicLong;

public class SegmentBufferIdGenerator {

    private final DataSource dataSource;
    private final String bizTag;
    private final int step;

    // 双 Buffer
    private volatile Segment current;
    private volatile Segment next;
    private volatile boolean isLoadingNext = false;
    // 降级用的雪花算法
    private final SafeSnowflakeIdGenerator fallback = new SafeSnowflakeIdGenerator(1);

    public SegmentBufferIdGenerator(DataSource dataSource, String bizTag, int step) {
        this.dataSource = dataSource;
        this.bizTag = bizTag;
        this.step = step;
        this.current = loadSegment();
    }

    public synchronized long nextId() {
        long id = current.nextId();
        // 号段消耗超过 20%，异步加载下一个
        if (!isLoadingNext && current.needLoadNext() && next == null) {
            isLoadingNext = true;
            new Thread(() -> {
                try {
                    next = loadSegment();
                } catch (Exception e) {
                    // 加载失败，next 保持 null
                } finally {
                    isLoadingNext = false;
                }
            }).start();
        }
        // 当前号段耗尽
        if (id == -1L) {
            if (next != null) {
                current = next;
                next = null;
                id = current.nextId();
            } else {
                // 降级到雪花算法
                return fallback.nextId();
            }
        }
        return id;
    }

    private Segment loadSegment() {
        try (Connection conn = dataSource.getConnection()) {
            conn.setAutoCommit(false);
            try (PreparedStatement update = conn.prepareStatement(
                    "UPDATE leaf_alloc SET max_id = max_id + step WHERE biz_tag = ?")) {
                update.setString(1, bizTag);
                update.executeUpdate();
            }
            try (PreparedStatement select = conn.prepareStatement(
                    "SELECT max_id, step FROM leaf_alloc WHERE biz_tag = ?")) {
                select.setString(1, bizTag);
                ResultSet rs = select.executeQuery();
                if (rs.next()) {
                    long maxId = rs.getLong("max_id");
                    int step = rs.getInt("step");
                    conn.commit();
                    return new Segment(maxId - step + 1, maxId, step);
                }
            }
            conn.commit();
        } catch (SQLException e) {
            throw new RuntimeException("加载号段失败", e);
        }
        throw new RuntimeException("biz_tag 不存在: " + bizTag);
    }

    private static class Segment {
        private final AtomicLong value;
        private final long maxId;
        private final long step;

        Segment(long minId, long maxId, long step) {
            this.value = new AtomicLong(minId);
            this.maxId = maxId;
            this.step = step;
        }

        long nextId() {
            long id = value.getAndIncrement();
            return id > maxId ? -1L : id;
        }

        boolean needLoadNext() {
            return (maxId - value.get()) < step * 0.2;
        }
    }
}
```

说明：该实现通过双 Buffer 异步预加载号段，数据库短暂不可用时仍可从内存发号；当内存号段也耗尽且数据库仍不可用时，降级到雪花算法，保证业务不中断。

## 参考资料

- [如果再有人问你分布式 ID，这篇文章丢给他](https://juejin.im/post/5bb0217ef265da0ac2567b42)
- [理解分布式 id 生成算法 SnowFlake](https://segmentfault.com/a/1190000011282426)
- [Leaf——美团点评分布式 ID 生成系统](https://tech.meituan.com/2017/04/21/mt-leaf.html)
- [UUID 规范](https://www.ietf.org/rfc/rfc4122.txt)
- [百度分布式 ID](https://github.com/baidu/uid-generator/blob/master/README.zh_cn.md)
- [ShardingSphere 分布式主键](https://shardingsphere.apache.org/document/current/cn/features/sharding/other-features/key-generator/)
- [7 Famous Approaches to Generate Distributed ID with Comparison Table](https://medium.com/bytebytego-system-design-alliance/7-famous-approaches-to-generate-distributed-id-with-comparison-table-af89afe4601f)
- [冷饭新炒：理解 JDK 中 UUID 的底层实现](https://www.cnblogs.com/throwable/p/14343086.html)
- [What is UUID?](https://bleid.netlify.app/)
