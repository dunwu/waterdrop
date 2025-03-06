---
icon: logos:mongodb
title: MongoDB 分片
cover: https://raw.githubusercontent.com/dunwu/images/master/snap/202503062347036.avif
date: 2020-09-20 23:12:17
categories:
  - 数据库
  - 文档数据库
  - mongodb
tags:
  - 数据库
  - 文档数据库
  - mongodb
  - 分区
permalink: /pages/2b3824ce/
---

# MongoDB 分片

::: info 概述

分区通常是这样定义的，即每一条数据（或者每条记录，每行或每个文档）只属于某个特定分区。实际上，每个分区都可以视为一个完整的小型数据库，虽然数据库可能存在一些跨分区的操作。

在不同系统中，分区有着不同的称呼，例如它对应于 MongoDB, Elasticsearch 和 SolrCloud 中的 shard, HBase 的 region, Bigtable 中的 tablet, Cassandra 和 Riak 中的 vnode ，以及 Couch base 中的 vBucket。

数据量如果太大，单台机器进行存储和处理就会成为瓶颈，因此需要引入数据分区机制。分区的目地是通过多台机器均匀分布数据和查询负载，避免出现热点。这需要选择合适的数据分区方案，在节点添加或删除时重新动态平衡分区。

分区通常与复制结合使用，即每个分区在多个节点都存有副本。这意味着某条记录属于特定的分区，而同样的内容会保存在不同的节点上以提高系统的容错性。一个节点上可能存储了多个分区。每个分区都有自己的主副本，例如被分配给某节点，而从副本则分配在其他一些节点。一个节点可能既是某些分区的主副本，同时又是其他分区的从副本。

:::

<!-- more -->

## 分片集群简介

当 MongoDB 需要存储海量数据时，单节点不足以存储全量数据，且可能无法提供令人满意的吞吐量。所以，可以通过 MongoDB 分片机制来支持水平扩展。

### 分片集群特点

对应用完全透明

数据自动均衡

动态扩容

提供三种分片方式

### 分片集群组件

MongoDB 分片集群含以下组件：

- [shard](https://docs.mongodb.com/manual/core/sharded-cluster-shards/)：每个分片包含分片数据的子集。每个分片都可以部署为副本集。
- [mongos](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/)：mongos 充当查询路由器，在客户端应用程序和分片集群之间提供接口。从 MongoDB 4.4 开始，mongos 可以支持 [hedged reads](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/#mongos-hedged-reads) 以最大程度地减少延迟。
- [config servers](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/)：提供集群元数据存储和分片数据分布的映射。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920210057.svg)

### 分片集群的分布

**MongoDB 复制集以 collection 为单位**，将数据分布在集群中的各个分片上。最多允许 1024 个分片。

MongoDB 复制集的分片之间数据不重复，只有当所有分片都正常时，才能完整工作。

MongoDB 数据库可以同时包含分片和未分片的集合的 collection。分片 collection 会分布在集群中各节点上。而未分片的 collection 存储在主节点上。每个数据库都有其自己的主节点。

分片和未分片的 collection：

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920212159.svg)

### 路由节点 mongos

要连接 [MongoDB 分片集群](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster)，必须连接到 [`mongos`](https://docs.mongodb.com/manual/reference/glossary/#term-mongos) 路由器。这包括分片和未分片的 collection。客户端不应该连接到单个分片节点进行读写操作。

连接 [`mongos`](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) 的方式和连接 [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) 相同，例如通过 [`mongo`](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell 或 [MongoDB 驱动程序](https://docs.mongodb.com/drivers/?jump=docs)。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920212157.svg)

路由节点的作用：

- 提供集群的单一入口
- 转发应用端请求
- 选择合适数据节点进行读写
- 合并多个数据节点的返回

一般，路由节点 mongos 建议至少 2 个。

## 分片 Key

MongoDB 使用分片 Key 在各个分片之间分发 collection 的 document。分片 Key 由 document 中的一个或多个字段组成。

- 从 MongoDB 4.4 开始，分片 collection 中的 document 可能缺少分片 Key 字段。在跨分片分布文档时，缺少分片 Key 字段将被视为具有空值，但在路由查询时则不会。

- 在 MongoDB 4.2 及更早版本中，分片 Key 字段必须在每个 document 中存在一个分片 collection。

在分片 collection 时选择分片 Key。

- 从 MongoDB 4.4 开始，您可以通过在现有 Key 中添加一个或多个后缀字段来优化 collection 的分片 Key。
- 在 MongoDB 4.2 和更低版本中，无法在分片后更改分片 Key 的选择。

document 的分片键值决定了其在各个分片中的分布

- 从 MongoDB 4.2 开始，除非您的分片 Key 字段是不可变的`_id` 字段，否则您可以更新 document 的分片键值。
- 在 MongoDB 4.0 及更低版本中，文档的分片 Key 字段值是不可变的。

分片 Key 索引：要对已填充的 collection 进行分片，该 collection 必须具有以分片 Key 开头的索引。分片一个空 collection 时，如果该 collection 还没有针对指定分片 Key 的适当索引，则 MongoDB 会创建支持索引。

分片 Key 策略：分片 Key 的选择会影响分片集群的性能，效率和可伸缩性。分片 Key 及其后备索引的选择也会影响集群可以使用的分片策略。

MongoDB 分区将数据分片。每个分块都有基于分片 Key 的上下限。

为了在整个集群中的所有分片上实现块的均匀分布，均衡器在后台运行，并在各分片上迁移块。

## 分片策略

MongoDB 支持两种分片策略：Hash 分片和范围分片。

### Hash 分片

Hash 分片策略会先计算分片 Key 字段值的哈希值；然后，根据分片键值为每个 [chunk](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) 分配一个范围。

> 注意：使用哈希索引解析查询时，MongoDB 会自动计算哈希值，应用程序不需要计算哈希。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920213343.svg)

尽管分片 Key 范围可能是“接近”的，但它们的哈希值不太可能在同一 [chunk](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) 上。基于 Hash 的数据分发有助于更均匀的数据分布，尤其是在分片 Key 单调更改的数据集中。

但是，Hash 分片意味着对分片 Key 做范围查询时不太可能针对单个分片，从而导致更多的集群范围内的广播操作。

### 范围分片

范围分片根据分片 Key 值将数据划分为多个范围。然后，根据分片 Key 值为每个 [chunk](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) 分配一个范围。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920213345.svg)

值比较近似的一系列分片 Key 更有可能驻留在同一 [chunk](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) 上。范围分片的效率取决于选择的分片 Key。分片 Key 考虑不周全会导致数据分布不均，这可能会削弱分片的某些优势或导致性能瓶颈。

## 分片集群中的区域

区域可以提高跨多个数据中心的分片集群的数据局部性。

在分片集群中，可以基于分片 Key 创建分片数据[区域](https://docs.mongodb.com/manual/reference/glossary/#term-zone)。可以将每个区域与集群中的一个或多个分片关联。分片可以与任意数量的区域关联。在平衡的集群中，MongoDB 仅将区域覆盖的 [chunk](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) 迁移到与该区域关联的分片。

每个区域覆盖一个或多个分片 Key 值范围。区域覆盖的每个范围始终包括其上下边界。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200920214854.svg)

在定义要覆盖的区域的新范围时，必须使用分片 Key 中包含的字段。如果使用复合分片 Key，则范围必须包含分片 Key 的前缀。

选择分片 Key 时，应考虑将来可能使用的区域。

## 参考资料

- **官方**
  - [MongoDB 官网](https://www.mongodb.com/)
  - [MongoDB Github](https://github.com/mongodb/mongo)
  - [MongoDB 官方免费教程](https://learn.mongodb.com/)
- **教程**
  - [MongoDB 教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)
  - [极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001)
