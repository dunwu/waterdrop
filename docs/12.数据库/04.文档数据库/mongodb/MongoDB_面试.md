---
icon: logos:mongodb
title: MongoDB 面试
date: 2025-03-04 21:03:08
categories:
  - 数据库
  - 文档数据库
  - mongodb
tags:
  - 数据库
  - 文档数据库
  - mongodb
  - 面试
permalink: /pages/edc11157/
---

# MongoDB 面试

## 简介

### 【基础】MongoDB 是什么？

:::details 要点

MongoDB 是一个基于 **分布式文件存储** 的开源 NoSQL 数据库系统，由 **C++** 编写的。MongoDB 提供了 **面向文档** 的存储方式，操作起来比较简单和容易，支持“**无模式**”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 **文档类型数据库** 。

在高负载的情况下，MongoDB 天然支持水平扩展和高可用，可以很方便地添加更多的节点/实例，以保证服务性能和可用性。在许多场景下，MongoDB 可以用于代替传统的关系型数据库或键/值存储方式，皆在为 Web 应用提供可扩展的高可用高性能数据存储解决方案。

:::

### 【基础】MongoDB 有什么特性？

:::details 要点

- **数据记录被存储为文档**：MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。
- **模式自由**：集合的概念类似 MySQL 里的表，但它不需要定义任何模式，能够用更少的数据对象表现复杂的领域模型对象。
- **支持多种查询方式**：MongoDB 查询 API 支持读写操作 (CRUD) 以及数据聚合、文本搜索和地理空间查询。
- **支持 ACID 事务**：NoSQL 数据库通常不支持事务，为了可扩展和高性能进行了权衡。不过，也有例外，MongoDB 就支持事务。与关系型数据库一样，MongoDB 事务同样具有 ACID 特性。MongoDB 单文档原生支持原子性，也具备事务的特性。MongoDB 4.0 加入了对多文档事务的支持，但只支持复制集部署模式下的事务，也就是说事务的作用域限制为一个副本集内。MongoDB 4.2 引入了分布式事务，增加了对分片集群上多文档事务的支持，并合并了对副本集上多文档事务的现有支持。
- **高效的二进制存储**：存储在集合中的文档，是以键值对的形式存在的。键用于唯一标识一个文档，一般是 `ObjectId` 类型，值是以 BSON 形式存在的。BSON = Binary JSON， 是在 JSON 基础上加了一些类型及元数据描述的格式。
- **自带数据压缩功能**：存储同样的数据所需的资源更少。
- **支持 mapreduce**：通过分治的方式完成复杂的聚合任务。不过，从 MongoDB 5.0 开始，map-reduce 已经不被官方推荐使用了，替代方案是 [聚合管道](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)。聚合管道提供比 map-reduce 更好的性能和可用性。
- **支持多种类型的索引**：MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。
- **支持 failover**：提供自动故障恢复的功能，主节点发生故障时，自动从从节点中选举出一个新的主节点，确保集群的正常使用，这对于客户端来说是无感知的。
- **支持分片集群**：MongoDB 支持集群自动切分数据，让集群存储更多的数据，具备更强的性能。在数据插入和更新时，能够自动路由和存储。
- **支持存储大文件**：MongoDB 的单文档存储空间要求不超过 16MB。对于超过 16MB 的大文件，MongoDB 提供了 GridFS 来进行存储，通过 GridFS，可以将大型数据进行分块处理，然后将这些切分后的小文档保存在数据库中。

:::

【基础】MongoDB 适合什么应用场景？

:::details 要点

**MongoDB 的优势在于其数据模型和存储引擎的灵活性、架构的可扩展性以及对强大的索引支持。**

选用 MongoDB 应该充分考虑 MongoDB 的优势，结合实际项目的需求来决定：

- 随着项目的发展，使用类 JSON 格式（BSON）保存数据是否满足项目需求？MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。
- 是否需要大数据量的存储？是否需要快速水平扩展？MongoDB 支持分片集群，可以很方便地添加更多的节点（实例），让集群存储更多的数据，具备更强的性能。
- 是否需要更多类型索引来满足更多应用场景？MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。
- ……

:::

## 存储

### 【基础】MongoDB 的逻辑存储是什么？

:::details 要点

MongoDB 的存储结构区别于传统的关系型数据库，主要由如下三个单元组成：

- **文档（Document）**：MongoDB 中最基本的单元，由 BSON 键值对（key-value）组成，类似于关系型数据库中的行（Row）。
- **集合（Collection）**：一个集合可以包含多个文档，类似于关系型数据库中的表（Table）。
- **数据库（Database）**：一个数据库中可以包含多个集合，可以在 MongoDB 中创建多个数据库，类似于关系型数据库中的数据库（Database）。

也就是说，MongoDB 将数据记录存储为文档 （更具体来说是 [BSON 文档](https://www.mongodb.com/docs/manual/core/document/#std-label-bson-document-format)），这些文档在集合中聚集在一起，数据库中存储一个或多个文档集合。

**SQL 与 MongoDB 常见术语对比**：

| SQL                      | MongoDB                         |
| ------------------------ | ------------------------------- |
| 表（Table）              | 集合（Collection）              |
| 行（Row）                | 文档（Document）                |
| 列（Col）                | 字段（Field）                   |
| 主键（Primary Key）      | 对象 ID（Objectid）             |
| 索引（Index）            | 索引（Index）                   |
| 嵌套表（Embedded Table） | 嵌入式文档（Embedded Document） |
| 数组（Array）            | 数组（Array）                   |

#### 文档

文档的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。字段的值可能包括其他文档、数组和文档数组。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503041024526.png)

文档的键是字符串。除了少数例外情况，键可以使用任意 UTF-8 字符。

- 键不能含有 `\0`（空字符）。这个字符用来表示键的结尾。
- `.` 和 `$` 有特别的意义，只有在特定环境下才能使用。
- 以下划线`_`开头的键是保留的（不是严格要求的）。

**BSON [bee·sahn]** 是 Binary [JSON](http://json.org/) 的简称，是 JSON 文档的二进制表示，支持将文档和数组嵌入到其他文档和数组中，还包含允许表示不属于 JSON 规范的数据类型的扩展。有关 BSON 规范的内容，可以参考 [bsonspec.org](http://bsonspec.org/)，另见 [BSON 类型](https://www.mongodb.com/docs/manual/reference/bson-types/)。

根据维基百科对 BJSON 的介绍，BJSON 的遍历速度优于 JSON，这也是 MongoDB 选择 BSON 的主要原因，但 BJSON 需要更多的存储空间。

> 与 JSON 相比，BSON 着眼于提高存储和扫描效率。BSON 文档中的大型元素以长度字段为前缀以便于扫描。在某些情况下，由于长度前缀和显式数组索引的存在，BSON 使用的空间会多于 JSON。

#### 集合

MongoDB 集合存在于数据库中，**没有固定的结构**，也就是 **无模式** 的，这意味着可以往集合插入不同格式和类型的数据。不过，通常情况下，插入集合中的数据都会有一定的关联性。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503041024137.png)

集合不需要事先创建，当第一个文档插入或者第一个索引创建时，如果该集合不存在，则会创建一个新的集合。

集合名可以是满足下列条件的任意 UTF-8 字符串：

- 集合名不能是空字符串`""`。
- 集合名不能含有 `\0` （空字符），这个字符表示集合名的结尾。
- 集合名不能以"system."开头，这是为系统集合保留的前缀。例如 `system.users` 这个集合保存着数据库的用户信息，`system.namespaces` 集合保存着所有数据库集合的信息。
- 集合名必须以下划线或者字母符号开始，并且不能包含 `$`。

#### 数据库

数据库用于存储所有集合，而集合又用于存储所有文档。一个 MongoDB 中可以创建多个数据库，每一个数据库都有自己的集合和权限。

MongoDB 预留了几个特殊的数据库。

- **admin** : admin 数据库主要是保存 root 用户和角色。例如，system.users 表存储用户，system.roles 表存储角色。一般不建议用户直接操作这个数据库。将一个用户添加到这个数据库，且使它拥有 admin 库上的名为 dbAdminAnyDatabase 的角色权限，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如关闭服务器。
- **local** : local 数据库是不会被复制到其他分片的，因此可以用来存储本地单台服务器的任意 collection。一般不建议用户直接使用 local 库存储任何数据，也不建议进行 CRUD 操作，因为数据无法被正常备份与恢复。
- **config** : 当 MongoDB 使用分片设置时，config 数据库可用来保存分片的相关信息。
- **test** : 默认创建的测试库，连接 [mongod](https://mongoing.com/docs/reference/program/mongod.html) 服务时，如果不指定连接的具体数据库，默认就会连接到 test 数据库。

数据库名可以是满足以下条件的任意 UTF-8 字符串：

- 不能是空字符串`""`。
- 不得含有`' '`（空格）、`.`、`$`、`/`、`\`和 `\0` （空字符）。
- 应全部小写。
- 最多 64 字节。

数据库名最终会变成文件系统里的文件，这也就是有如此多限制的原因。

:::

### 【中级】MongoDB 支持哪些存储引擎？

:::details 要点

存储引擎（Storage Engine）是数据库的核心组件，负责管理数据在内存和磁盘中的存储方式。

与 MySQL 一样，MongoDB 采用的也是 **插件式的存储引擎架构** ，支持不同类型的存储引擎，不同的存储引擎解决不同场景的问题。在创建数据库或集合时，可以指定存储引擎。

> 插件式的存储引擎架构可以实现 Server 层和存储引擎层的解耦，可以支持多种存储引擎，如 MySQL 既可以支持 B-Tree 结构的 InnoDB 存储引擎，还可以支持 LSM 结构的 RocksDB 存储引擎。

在存储引擎刚出来的时候，默认是使用 MMAPV1 存储引擎，MongoDB4.x 版本不再支持 MMAPv1 存储引擎。

现在主要有下面这两种存储引擎：

- **WiredTiger 存储引擎**：自 MongoDB 3.2 以后，默认的存储引擎为 [WiredTiger 存储引擎](https://www.mongodb.com/docs/manual/core/wiredtiger/) 。非常适合大多数工作负载，建议用于新部署。WiredTiger 提供文档级并发模型、检查点和数据压缩（后文会介绍到）等功能。
- **In-Memory 存储引擎**：[In-Memory 存储引擎](https://www.mongodb.com/docs/manual/core/inmemory/) 在 MongoDB Enterprise 中可用。它不是将文档存储在磁盘上，而是将它们保留在内存中以获得更可预测的数据延迟。

此外，MongoDB 3.0 提供了 **可插拔的存储引擎 API** ，允许第三方为 MongoDB 开发存储引擎，这点和 MySQL 也比较类似。

:::

### 【中级】MongoDB 支持哪些亚索算法？

:::details 要点

借助 WiredTiger 存储引擎（ MongoDB 3.2 后的默认存储引擎），MongoDB 支持对所有集合和索引进行压缩。压缩以额外的 CPU 为代价最大限度地减少存储使用。

默认情况下，WiredTiger 使用 [Snappy](https://github.com/google/snappy) 压缩算法（谷歌开源，旨在实现非常高的速度和合理的压缩，压缩比 3 ～ 5 倍）对所有集合使用块压缩，对所有索引使用前缀压缩。

除了 Snappy 之外，对于集合还有下面这些压缩算法：

- [zlib](https://github.com/madler/zlib)：高度压缩算法，压缩比 5 ～ 7 倍
- [Zstandard](https://github.com/facebook/zstd)（简称 zstd）：Facebook 开源的一种快速无损压缩算法，针对 zlib 级别的实时压缩场景和更好的压缩比，提供更高的压缩率和更低的 CPU 使用率，MongoDB 4.2 开始可用。

WiredTiger 日志也会被压缩，默认使用的也是 Snappy 压缩算法。如果日志记录小于或等于 128 字节，WiredTiger 不会压缩该记录。

:::

### 【中级】WiredTiger 基于 LSM Tree 还是 B+ Tree？

:::details 要点

目前绝大部分流行的数据库存储引擎都是基于 B/B+ Tree 或者 LSM(Log Structured Merge) Tree 来实现的。对于 NoSQL 数据库来说，绝大部分（比如 HBase、Cassandra、RocksDB）都是基于 LSM 树，MongoDB 不太一样。

上面也说了，自 MongoDB 3.2 以后，默认的存储引擎为 WiredTiger 存储引擎。在 WiredTiger 引擎官网上，我们发现 WiredTiger 使用的是 B+ 树作为其存储结构：

```
WiredTiger maintains a table's data in memory using a data structure called a B-Tree ( B+ Tree to be specific), referring to the nodes of a B-Tree as pages. Internal pages carry only keys. The leaf pages store both keys and values.
```

此外，WiredTiger 还支持 [LSM(Log Structured Merge)](https://source.wiredtiger.com/3.1.0/lsm.html) 树作为存储结构，MongoDB 在使用 WiredTiger 作为存储引擎时，默认使用的是 B+ 树。

如果想要了解 MongoDB 使用 B+ 树的原因，可以看看这篇文章：[【驳斥八股文系列】别瞎分析了，MongoDB 使用的是 B+ 树，不是你们以为的 B 树](https://zhuanlan.zhihu.com/p/519658576)。

使用 B+ 树时，WiredTiger 以 **page** 为基本单位往磁盘读写数据。B+ 树的每个节点为一个 page，共有三种类型的 page：

- **root page（根节点）**：B+ 树的根节点。
- **internal page（内部节点）**：不实际存储数据的中间索引节点。
- **leaf page（叶子节点）**：真正存储数据的叶子节点，包含一个页头（page header）、块头（block header）和真正的数据（key/value），其中页头定义了页的类型、页中实际载荷数据的大小、页中记录条数等信息；块头定义了此页的 checksum、块在磁盘上的寻址位置等信息。

其整体结构如下图所示：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503041050392.png)

如果想要深入研究学习 WiredTiger 存储引擎，推荐阅读 MongoDB 中文社区的 [WiredTiger 存储引擎系列](https://mongoing.com/archives/category/wiredtiger 存储引擎系列)。

:::

## 索引

### 【基础】MongoDB 支持哪些类型的索引？

:::details 要点

**MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。**

- **单字段索引：** 建立在单个字段上的索引，索引创建的排序顺序无所谓，MongoDB 可以头/尾开始遍历。
- **复合索引：** 建立在多个字段上的索引，也可以称之为组合索引、联合索引。
- **多键索引**：MongoDB 的一个字段可能是数组，在对这种字段创建索引时，就是多键索引。MongoDB 会为数组的每个值创建索引。就是说你可以按照数组里面的值做条件来查询，这个时候依然会走索引。
- **哈希索引**：按数据的哈希值索引，用在哈希分片集群上。
- **文本索引：** 支持对字符串内容的文本搜索查询。文本索引可以包含任何值为字符串或字符串元素数组的字段。一个集合只能有一个文本搜索索引，但该索引可以覆盖多个字段。MongoDB 虽然支持全文索引，但是性能低下，暂时不建议使用。
- **地理位置索引：** 基于经纬度的索引，适合 2D 和 3D 的位置查询。
- **唯一索引**：确保索引字段不会存储重复值。如果集合已经存在了违反索引的唯一约束的文档，则后台创建唯一索引会失败。
- **TTL 索引**：TTL 索引提供了一个过期机制，允许为每一个文档设置一个过期时间，当一个文档达到预设的过期时间之后就会被删除。
- ……

:::

### 【基础】复合索引中字段的顺序有影响吗？

:::details 要点

复合索引中字段的顺序非常重要，例如下图中的复合索引由`{userid:1, score:-1}`组成，则该复合索引首先按照`userid`升序排序；然后再每个`userid`的值内，再按照`score`降序排序。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503041116883.png)

在复合索引中，按照何种方式排序，决定了该索引在查询中是否能被应用到。

走复合索引的排序：

```sql
db.s2.find().sort({"userid": 1, "score": -1})
db.s2.find().sort({"userid": -1, "score": 1})
```

不走复合索引的排序：

```sql
db.s2.find().sort({"userid": 1, "score": 1})
db.s2.find().sort({"userid": -1, "score": -1})
db.s2.find().sort({"score": 1, "userid": -1})
db.s2.find().sort({"score": 1, "userid": 1})
db.s2.find().sort({"score": -1, "userid": -1})
db.s2.find().sort({"score": -1, "userid": 1})
```

我们可以通过 explain 进行分析：

```sql
db.s2.find().sort({"score": -1, "userid": 1}).explain()
```

**MongoDB 的复合索引遵循左前缀原则**：拥有多个键的索引，可以同时得到所有这些键的前缀组成的索引，但不包括除左前缀之外的其他子集。比如说，有一个类似 `{a: 1, b: 1, c: 1, ..., z: 1}` 这样的索引，那么实际上也等于有了 `{a: 1}`、`{a: 1, b: 1}`、`{a: 1, b: 1, c: 1}` 等一系列索引，但是不会有 `{b: 1}` 这样的非左前缀的索引。

:::

### 【基础】什么是 TTL 索引？

:::details 要点

TTL 索引提供了一个过期机制，允许为每一个文档设置一个过期时间 `expireAfterSeconds` ，当一个文档达到预设的过期时间之后就会被删除。TTL 索引除了有 `expireAfterSeconds` 属性外，和普通索引一样。

数据过期对于某些类型的信息很有用，比如机器生成的事件数据、日志和会话信息，这些信息只需要在数据库中保存有限的时间。

**TTL 索引运行原理**：

- MongoDB 会开启一个后台线程读取该 TTL 索引的值来判断文档是否过期，但不会保证已过期的数据会立马被删除，因后台线程每 60 秒触发一次删除任务，且如果删除的数据量较大，会存在上一次的删除未完成，而下一次的任务已经开启的情况，导致过期的数据也会出现超过了数据保留时间 60 秒以上的现象。
- 对于副本集而言，TTL 索引的后台进程只会在 Primary 节点开启，在从节点会始终处于空闲状态，从节点的数据删除是由主库删除后产生的 oplog 来做同步。

**TTL 索引限制**：

- TTL 索引是单字段索引。复合索引不支持 TTL
- `_id`字段不支持 TTL 索引。
- 无法在上限集合 (Capped Collection) 上创建 TTL 索引，因为 MongoDB 无法从上限集合中删除文档。
- 如果某个字段已经存在非 TTL 索引，那么在该字段上无法再创建 TTL 索引。

:::

### 【中级】什么是覆盖索引查询？

:::details 要点

根据官方文档介绍，覆盖查询是以下的查询：

- 所有的查询字段是索引的一部分。
- 结果中返回的所有字段都在同一索引中。
- 查询中没有字段等于`null`。

由于所有出现在查询中的字段是索引的一部分， MongoDB 无需在整个数据文档中检索匹配查询条件和返回使用相同索引的查询结果。因为索引存在于内存中，从索引中获取数据比通过扫描文档读取数据要快得多。

举个例子：我们有如下 `users` 集合：

```json
{
   "_id": ObjectId("53402597d852426020000002"),
   "contact": "987654321",
   "dob": "01-01-1991",
   "gender": "M",
   "name": "Tom Benzamin",
   "user_name": "tombenzamin"
}
```

我们在 `users` 集合中创建联合索引，字段为 `gender` 和 `user_name` :

```sql
db.users.ensureIndex({gender:1,user_name:1})
```

现在，该索引会覆盖以下查询：

```sql
db.users.find({gender:"M"},{user_name:1,_id:0})
```

为了让指定的索引覆盖查询，必须显式地指定 `_id: 0` 来从结果中排除 `_id` 字段，因为索引不包括 `_id` 字段。

:::

## 聚合

### 【基础】MongoDB 聚合有什么用？

:::details 要点

实际项目中，我们经常需要将多个文档甚至是多个集合汇总到一起计算分析（比如求和、取最大值）并返回计算后的结果，这个过程被称为 **聚合操作** 。

根据官方文档介绍，我们可以使用聚合操作来：

- 将来自多个文档的值组合在一起。
- 对集合中的数据进行的一系列运算。
- 分析数据随时间的变化。

:::

### 【基础】MongoDB 提供了哪几种执行聚合的方法？

:::details 要点

MongoDB 提供了两种执行聚合的方法：

- **聚合管道（Aggregation Pipeline）**：执行聚合操作的首选方法。
- **单一目的聚合方法（Single purpose aggregation methods）**：也就是单一作用的聚合函数比如 `count()`、`distinct()`、`estimatedDocumentCount()`。

绝大部分文章中还提到了 **map-reduce** 这种聚合方法。不过，从 MongoDB 5.0 开始，map-reduce 已经不被官方推荐使用了，替代方案是 [聚合管道](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)。聚合管道提供比 map-reduce 更好的性能和可用性。

MongoDB 聚合管道由多个阶段组成，每个阶段在文档通过管道时转换文档。每个阶段接收前一个阶段的输出，进一步处理数据，并将其作为输入数据发送到下一个阶段。

每个管道的工作流程是：

1. 接受一系列原始数据文档
2. 对这些文档进行一系列运算
3. 结果文档输出给下一个阶段

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503041056046.png)

**常用阶段操作符**：

| 操作符   | 简述                                                         |
| -------- | ------------------------------------------------------------ |
| $match   | 匹配操作符，用于对文档集合进行筛选                           |
| $project | 投射操作符，用于重构每一个文档的字段，可以提取字段，重命名字段，甚至可以对原有字段进行操作后新增字段 |
| $sort    | 排序操作符，用于根据一个或多个字段对文档进行排序             |
| $limit   | 限制操作符，用于限制返回文档的数量                           |
| $skip    | 跳过操作符，用于跳过指定数量的文档                           |
| $count   | 统计操作符，用于统计文档的数量                               |
| $group   | 分组操作符，用于对文档集合进行分组                           |
| $unwind  | 拆分操作符，用于将数组中的每一个值拆分为单独的文档           |
| $lookup  | 连接操作符，用于连接同一个数据库中另一个集合，并获取指定的文档，类似于 populate |

更多操作符介绍详见官方文档：https://docs.mongodb.com/manual/reference/operator/aggregation/

阶段操作符用于 `db.collection.aggregate` 方法里面，数组参数中的第一层。

```json
db.collection.aggregate( [ { 阶段操作符：表述 }, { 阶段操作符：表述 }, ... ] )
```

下面是 MongoDB 官方文档中的一个例子：

```json
db.orders.aggregate([
    // 第一阶段：$match 阶段按 status 字段过滤文档，并将 status 等于"A"的文档传递到下一阶段。
    { $match: { status: "A" } },
    // 第二阶段：$group 阶段按 cust_id 字段将文档分组，以计算每个 cust_id 唯一值的金额总和。
    { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
])
```

:::

## 事务

### 【中级】MongoDB 是否支持事务？

:::details 要点

MongoDB 事务想要搞懂原理还是比较花费时间的，我自己也没有搞太明白。因此，我这里只是简单介绍一下 MongoDB 事务，想要了解原理的小伙伴，可以自行搜索查阅相关资料。

这里推荐几篇文章，供大家参考：

- [技术干货| MongoDB 事务原理](https://mongoing.com/archives/82187)
- [MongoDB 一致性模型设计与实现](https://developer.aliyun.com/article/782494)
- [MongoDB 官方文档对事务的介绍](https://www.mongodb.com/docs/upcoming/core/transactions/)

我们在介绍 NoSQL 数据的时候也说过，NoSQL 数据库通常不支持事务，为了可扩展和高性能进行了权衡。不过，也有例外，MongoDB 就支持事务。

与关系型数据库一样，MongoDB 事务同样具有 ACID 特性：

- **原子性**（`Atomicity`）：事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；
- **一致性**（`Consistency`）：执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
- **隔离性**（`Isolation`）：并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的。WiredTiger 存储引擎支持读未提交（ read-uncommitted ）、读已提交（ read-committed ）和快照（ snapshot ）隔离，MongoDB 启动时默认选快照隔离。在不同隔离级别下，一个事务的生命周期内，可能出现脏读、不可重复读、幻读等现象。
- **持久性**（`Durability`）：一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。

关于事务的详细介绍这篇文章就不多说了，感兴趣的可以看看我写的 [MySQL 常见面试题总结]() 这篇文章，里面有详细介绍到。

MongoDB 单文档原生支持原子性，也具备事务的特性。当谈论 MongoDB 事务的时候，通常指的是 **多文档** 。MongoDB 4.0 加入了对多文档 ACID 事务的支持，但只支持复制集部署模式下的 ACID 事务，也就是说事务的作用域限制为一个副本集内。MongoDB 4.2 引入了 **分布式事务** ，增加了对分片集群上多文档事务的支持，并合并了对副本集上多文档事务的现有支持。

根据官方文档介绍：

> 从 MongoDB 4.2 开始，分布式事务和多文档事务在 MongoDB 中是一个意思。分布式事务是指分片集群和副本集上的多文档事务。从 MongoDB 4.2 开始，多文档事务（无论是在分片集群还是副本集上）也称为分布式事务。

在大多数情况下，多文档事务比单文档写入会产生更大的性能成本。对于大部分场景来说， [非规范化数据模型（嵌入式文档和数组）](https://www.mongodb.com/docs/upcoming/core/data-model-design/#std-label-data-modeling-embedding) 依然是最佳选择。也就是说，适当地对数据进行建模可以最大限度地减少对多文档事务的需求。

**注意**：

- 从 MongoDB 4.2 开始，多文档事务支持副本集和分片集群，其中：主节点使用 WiredTiger 存储引擎，同时从节点使用 WiredTiger 存储引擎或 In-Memory 存储引擎。在 MongoDB 4.0 中，只有使用 WiredTiger 存储引擎的副本集支持事务。
- 在 MongoDB 4.2 及更早版本中，你无法在事务中创建集合。从 MongoDB 4.4 开始，您可以在事务中创建集合和索引。有关详细信息，请参阅 [在事务中创建集合和索引](https://www.mongodb.com/docs/upcoming/core/transactions/#std-label-transactions-create-collections-indexes)。

:::

## 复制

### 【中级】MongoDB 的副本机制是怎样的？

:::details 要点

MongoDB 的复制集群又称为副本集群，是一组维护相同数据集合的 mongod 进程。

客户端连接到整个 Mongodb 复制集群，主节点机负责整个复制集群的写，从节点可以进行读操作，但默认还是主节点负责整个复制集群的读。主节点发生故障时，自动从从节点中选举出一个新的主节点，确保集群的正常使用，这对于客户端来说是无感知的。

通常来说，一个复制集群包含 1 个主节点（Primary），多个从节点（Secondary）以及零个或 1 个仲裁节点（Arbiter）。

- **主节点**：整个集群的写操作入口，接收所有的写操作，并将集合所有的变化记录到操作日志中，即 oplog。主节点挂掉之后会自动选出新的主节点。
- **从节点**：从主节点同步数据，在主节点挂掉之后选举新节点。不过，从节点可以配置成 0 优先级，阻止它在选举中成为主节点。
- **仲裁节点**：这个是为了节约资源或者多机房容灾用，只负责主节点选举时投票不存数据，保证能有节点获得多数赞成票。

下图是一个典型的三成员副本集群：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042030712.png)

主节点与备节点之间是通过 **oplog（操作日志）** 来同步数据的。oplog 是 local 库下的一个特殊的 **上限集合 (Capped Collection)** ，用来保存写操作所产生的增量日志，类似于 MySQL 中 的 Binlog。

> 上限集合类似于定长的循环队列，数据顺序追加到集合的尾部，当集合空间达到上限时，它会覆盖集合中最旧的文档。上限集合的数据将会被顺序写入到磁盘的固定空间内，所以，I/O 速度非常快，如果不建立索引，性能更好。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042030639.png)

当主节点上的一个写操作完成后，会向 oplog 集合写入一条对应的日志，而从节点则通过这个 oplog 不断拉取到新的日志，在本地进行回放以达到数据同步的目的。

副本集最多有一个主节点。 如果当前主节点不可用，一个选举会抉择出新的主节点。MongoDB 的节点选举规则能够保证在 Primary 挂掉之后选取的新节点一定是集群中数据最全的一个。

当主节点上的一个写操作完成后，会向 oplog 集合写入一条对应的日志，而从节点则通过这个 oplog 不断拉取到新的日志，在本地进行回放以达到数据同步的目的。

副本集最多有一个主节点。 如果当前主节点不可用，一个选举会抉择出新的主节点。MongoDB 的节点选举规则能够保证在 Primary 挂掉之后选取的新节点一定是集群中数据最全的一个。

为什么要用复制集群？

- **实现 failover**：提供自动故障恢复的功能，主节点发生故障时，自动从从节点中选举出一个新的主节点，确保集群的正常使用，这对于客户端来说是无感知的。
- **实现读写分离**：我们可以设置从节点上可以读取数据，主节点负责写入数据，这样的话就实现了读写分离，减轻了主节点读写压力过大的问题。MongoDB 4.0 之前版本如果主库压力不大，不建议读写分离，因为写会阻塞读，除非业务对响应时间不是非常关注以及读取历史数据接受一定时间延迟。

:::

## 分片

### 【中级】什么是分片集群？

:::details 要点

分片集群是 MongoDB 的分布式版本，相较副本集，分片集群数据被均衡的分布在不同分片中， 不仅大幅提升了整个集群的数据容量上限，也将读写的压力分散到不同分片，以解决副本集性能瓶颈的难题。

MongoDB 的分片集群由如下三个部分组成（下图来源于 [官方文档对分片集群的介绍](https://www.mongodb.com/docs/manual/sharding/)）：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042043821.png)

**Config Servers**：配置服务器，本质上是一个 MongoDB 的副本集，负责存储集群的各种元数据和配置，如分片地址、Chunks 等

**Mongos**：路由服务，不存具体数据，从 Config 获取集群配置讲请求转发到特定的分片，并且整合分片结果返回给客户端。

**Shard**：每个分片是整体数据的一部分子集，从 MongoDB3.6 版本开始，每个 Shard 必须部署为副本集（replica set）架构

:::

### 【基础】为什么要用分片集群？

:::details 要点

随着系统数据量以及吞吐量的增长，常见的解决办法有两种：垂直扩展和水平扩展。

垂直扩展通过增加单个服务器的能力来实现，比如磁盘空间、内存容量、CPU 数量等；水平扩展则通过将数据存储到多个服务器上来实现，根据需要添加额外的服务器以增加容量。

类似于 Redis Cluster，MongoDB 也可以通过分片实现 **水平扩展** 。水平扩展这种方式更灵活，可以满足更大数据量的存储需求，支持更高吞吐量。并且，水平扩展所需的整体成本更低，仅仅需要相对较低配置的单机服务器即可，代价是增加了部署的基础设施和维护的复杂性。

也就是说当你遇到如下问题时，可以使用分片集群解决：

- 存储容量受单机限制，即磁盘资源遭遇瓶颈。
- 读写能力受单机限制，可能是 CPU、内存或者网卡等资源遭遇瓶颈，导致读写能力无法扩展。

:::

### 【基础】如何选择分片键？

:::details 要点

选择合适的片键对 sharding 效率影响很大，主要基于如下四个因素（摘自 [分片集群使用注意事项 - - 腾讯云文档](https://cloud.tencent.com/document/product/240/44611)）：

- **取值基数** 取值基数建议尽可能大，如果用小基数的片键，因为备选值有限，那么块的总数量就有限，随着数据增多，块的大小会越来越大，导致水平扩展时移动块会非常困难。 例如：选择年龄做一个基数，范围最多只有 100 个，随着数据量增多，同一个值分布过多时，导致 chunck 的增长超出 chuncksize 的范围，引起 jumbo chunk，从而无法迁移，导致数据分布不均匀，性能瓶颈。
- **取值分布** 取值分布建议尽量均匀，分布不均匀的片键会造成某些块的数据量非常大，同样有上面数据分布不均匀，性能瓶颈的问题。
- **查询带分片** 查询时建议带上分片，使用分片键进行条件查询时，mongos 可以直接定位到具体分片，否则 mongos 需要将查询分发到所有分片，再等待响应返回。
- **避免单调递增或递减** 单调递增的 sharding key，数据文件挪动小，但写入会集中，导致最后一篇的数据量持续增大，不断发生迁移，递减同理。

综上，在选择片键时要考虑以上 4 个条件，尽可能满足更多的条件，才能降低 MoveChunks 对性能的影响，从而获得最优的性能体验。

:::

### 【中级】分片策略有哪些？

:::details 要点

MongoDB 支持两种分片算法来满足不同的查询需求（摘自 [MongoDB 分片集群介绍 - 阿里云文档](https://help.aliyun.com/document_detail/64561.html?spm=a2c4g.11186623.0.0.3121565eQhUGGB#h2--shard-key-3)）：

**1、基于范围的分片**：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042049549.png)

MongoDB 按照分片键（Shard Key）的值的范围将数据拆分为不同的块（Chunk），每个块包含了一段范围内的数据。当分片键的基数大、频率低且值非单调变更时，范围分片更高效。

- 优点：Mongos 可以快速定位请求需要的数据，并将请求转发到相应的 Shard 节点中。
- 缺点：可能导致数据在 Shard 节点上分布不均衡，容易造成读写热点，且不具备写分散性。
- 适用场景：分片键的值不是单调递增或单调递减、分片键的值基数大且重复的频率低、需要范围查询等业务场景。

**2、基于 Hash 值的分片**

![img](https://oss.javaguide.cn/github/javaguide/database/mongodb/example-of-hash-based-sharding.png)

MongoDB 计算单个字段的哈希值作为索引值，并以哈希值的范围将数据拆分为不同的块（Chunk）。

- 优点：可以将数据更加均衡地分布在各 Shard 节点中，具备写分散性。
- 缺点：不适合进行范围查询，进行范围查询时，需要将读请求分发到所有的 Shard 节点。
- 适用场景：分片键的值存在单调递增或递减、片键的值基数大且重复的频率低、需要写入的数据随机分发、数据读取随机性较大等业务场景。

除了上述两种分片策略，您还可以配置 **复合片键** ，例如由一个低基数的键和一个单调递增的键组成。

:::

### 【中级】分片数据如何存储？

:::details 要点

**Chunk（块）** 是 MongoDB 分片集群的一个核心概念，其本质上就是由一组 Document 组成的逻辑数据单元。每个 Chunk 包含一定范围片键的数据，互不相交且并集为全部数据，即离散数学中**划分**的概念。

分片集群不会记录每条数据在哪个分片上，而是记录 Chunk 在哪个分片上一级这个 Chunk 包含哪些数据。

默认情况下，一个 Chunk 的最大值默认为 64MB（可调整，取值范围为 1~1024 MB。如无特殊需求，建议保持默认值），进行数据插入、更新、删除时，如果此时 Mongos 感知到了目标 Chunk 的大小或者其中的数据量超过上限，则会触发 **Chunk 分裂**。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042053916.png)

数据的增长会让 Chunk 分裂得越来越多。这个时候，各个分片上的 Chunk 数量可能会不平衡。Mongos 中的 **均衡器 (Balancer)** 组件就会执行自动平衡，尝试使各个 Shard 上 Chunk 的数量保持均衡，这个过程就是 **再平衡（Rebalance）**。默认情况下，数据库和集合的 Rebalance 是开启的。

如下图所示，随着数据插入，导致 Chunk 分裂，让 AB 两个分片有 3 个 Chunk，C 分片只有一个，这个时候就会把 B 分配的迁移一个到 C 分片实现集群数据均衡。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202503042054456.png)

> Balancer 是 MongoDB 的一个运行在 Config Server 的 Primary 节点上（自 MongoDB 3.4 版本起）的后台进程，它监控每个分片上 Chunk 数量，并在某个分片上 Chunk 数量达到阈值进行迁移。

Chunk 只会分裂，不会合并，即使 chunkSize 的值变大。

Rebalance 操作是比较耗费系统资源的，我们可以通过在业务低峰期执行、预分片或者设置 Rebalance 时间窗等方式来减少其对 MongoDB 正常使用所带来的影响。

:::