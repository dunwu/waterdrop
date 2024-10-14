---
title: Elasticsearch 简介
date: 2020-06-16 07:10:44
order: 02
categories:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
tags:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
permalink: /pages/adc985cd/
---

# Elasticsearch 简介

## 什么是 Elasticsearch

**[Elasticsearch](https://github.com/elastic/Elasticsearch) 是一个开源的分布式搜索和分析引擎**。

**[Elasticsearch](https://github.com/elastic/Elasticsearch) 基于搜索库 [Lucene](https://github.com/apache/lucene-solr) 开发**。Elasticsearch 隐藏了 Lucene 的复杂性，提供了简单易用的 Restful API 以及多种编程语言的 API 接口（例如：Java、C#、PHP、Python 等）。

Elasticsearch 可以视为一个文档存储，它**将复杂数据结构序列化为 JSON 存储**。

**Elasticsearch 是近实时（Near Realtime，缩写 NRT）的全文搜索**。近实时是指：

- 从写入数据到数据可以被搜索，存在较小的延迟（大概是 1s）。
- 基于 ES 执行搜索和分析可以达到秒级。

## 为什么不直接使用 Lucene

Elasticsearch 是基于 Lucene 的，那么为什么不是直接使用 Lucene 呢？

Lucene 可以说是当下最先进、高性能、全功能的搜索引擎库。

但是，Lucene 仅仅只是一个库。为了充分发挥其功能，需要使用 Java 并将 Lucene 直接集成到应用程序中。 Lucene 非常复杂，了解其工作原理并不容易。

Elasticsearch 也是使用 Java 编写的，它的内部使用 Lucene 做索引与搜索，但是它的目的是使全文检索变得简单，**通过隐藏 Lucene 的复杂性，取而代之的提供一套简单一致的 RESTful API**。

然而，Elasticsearch 不仅仅是 Lucene，并且也不仅仅只是一个全文搜索引擎。 它可以被下面这样准确的形容：

- 一个分布式的实时文档数据库，每个字段可以被索引与搜索。
- 一个分布式实时分析搜索引擎。
- 支持扩展为上百个服务节点的集群，并支持 PB 级别的半结构化数据。

## Elasticsearch 功能和应用场景

Elasticsearch 的主要功能：

- **海量数据的分布式存储及集群管理** - 支持高并发、高可用、易扩展；
- **近实时搜索** - 性能卓越。对结构化、全文、地理位置等类型数据的处理；
- **海量数据的近实时分析（聚合功能）**

除了搜索，结合 Kibana、Logstash、Beats 开源产品，Elastic Stack（简称 ELK）还被广泛运用在大数据近实时分析领域，包括：**日志分析**、**指标监控**、**信息安全**等。它可以帮助你**探索海量结构化、非结构化数据，按需创建可视化报表，对监控数据设置报警阈值，通过使用机器学习，自动识别异常状况**。

## Elasticsearch 核心概念

```
index -> type -> mapping -> document -> field
```

### Cluster

集群包含多个节点，每个节点属于哪个集群都是通过一个配置来决定的，对于中小型应用来说，刚开始一个集群就一个节点很正常。

### Node

Node 是集群中的一个节点，节点也有一个名称，默认是随机分配的。默认节点会去加入一个名称为 `Elasticsearch` 的集群。如果直接启动一堆节点，那么它们会自动组成一个 Elasticsearch 集群，当然一个节点也可以组成 Elasticsearch 集群。

### Index

**可以认为是文档（document）的优化集合。**

ES 会为所有字段建立索引，经过处理后写入一个反向索引（Inverted Index）。查找数据的时候，直接查找该索引。

所以，ES 数据管理的顶层单位就叫做 Index（索引）。它是单个数据库的同义词。每个 Index （即数据库）的名字必须是小写。

### Type

每个索引里可以有一个或者多个类型（type）。`类型（type）` 是 index 的一个逻辑分类。

不同的 Type 应该有相似的结构（schema），举例来说，`id`字段不能在这个组是字符串，在另一个组是数值。这是与关系型数据库的表的 [一个区别](https://www.elastic.co/guide/en/Elasticsearch/guide/current/mapping.html)。性质完全不同的数据（比如`products`和`logs`）应该存成两个 Index，而不是一个 Index 里面的两个 Type（虽然可以做到）。

> 注意：根据 [规划](https://www.elastic.co/blog/index-type-parent-child-join-now-future-in-Elasticsearch)，Elastic 6.x 版只允许每个 Index 包含一个 Type，7.x 版将会彻底移除 Type。

### Document

Index 里面单条的记录称为 Document（文档）。许多条 Document 构成了一个 Index。

每个 **`文档（document）`** 都是字段（field）的集合。

Document 使用 JSON 格式表示，下面是一个例子。

```javascript
{
"user": "张三",
"title": "工程师",
"desc": "数据库管理"
}
```

同一个 Index 里面的 Document，不要求有相同的结构（scheme），但是最好保持相同，这样有利于提高搜索效率。

### Field

**`字段（field）`** 是包含数据的键值对。

默认情况下，Elasticsearch 对每个字段中的所有数据建立索引，并且每个索引字段都具有专用的优化数据结构。

### Shard

当单台机器不足以存储大量数据时，Elasticsearch 可以将一个索引中的数据切分为多个 **`分片（shard）`** 。 **`分片（shard）`** 分布在多台服务器上存储。有了 shard 就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。每个 shard 都是一个 lucene index。

### Replica

任何一个服务器随时可能故障或宕机，此时 shard 可能就会丢失，因此可以为每个 shard 创建多个 **`副本（replica）`**。replica 可以在 shard 故障时提供备用服务，保证数据不丢失，多个 replica 还可以提升搜索操作的吞吐量和性能。primary shard（建立索引时一次设置，不能修改，默认 5 个），replica shard（随时修改数量，默认 1 个），默认每个索引 10 个 shard，5 个 primary shard，5 个 replica shard，最小的高可用配置，是 2 台服务器。

### ES 核心概念 vs. DB 核心概念

| ES                     | DB                 |
| ---------------------- | ------------------ |
| 索引（index）          | 数据库（database） |
| 类型（type，6.0 废弃） | 数据表（table）    |
| 文档（docuemnt）       | 行（row）          |
| 字符（field）          | 列（column）       |
| 映射（mapping）        | 表结构（schema）   |

## Elastic Stack 生态

### Elastic Stack  核心组件

Elastic Stack 生态主要组成：Beats + Logstash + ElasticSearch + Kibana

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-1-1.png)

#### Beats

Beats 是一个面向**轻量型采集器**的平台，这些采集器可以从边缘机器向 Logstash、ElasticSearch 发送数据，它是由 Go 语言进行开发的，运行效率方面比较快。从下图中可以看出，不同 Beats 的套件是针对不同的数据源。

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-0.png)

#### Logstash

Logstash 是**动态数据收集管道**，拥有可扩展的插件生态系统，支持从不同来源采集数据，转换数据，并将数据发送到不同的存储库中。其能够与 ElasticSearch 产生强大的协同作用，后被 Elastic 公司在 2013 年收购。

它具有如下特性：

1）实时解析和转换数据；

2）可扩展，具有 200 多个插件；

3）可靠性、安全性。Logstash 会通过持久化队列来保证至少将运行中的事件送达一次，同时将数据进行传输加密；

4）监控；

#### ElasticSearch

ElasticSearch 对数据进行**搜索、分析和存储**，其是基于 JSON 的分布式搜索和分析引擎，专门为实现水平可扩展性、高可靠性和管理便捷性而设计的。

它的实现原理主要分为以下几个步骤：

1）首先用户将数据提交到 ElasticSearch 数据库中；

2）再通过分词控制器将对应的语句分词；

3）将分词结果及其权重一并存入，以备用户在搜索数据时，根据权重将结果排名和打分，将返回结果呈现给用户；

#### Kibana

Kibana 实现**数据可视化**，其作用就是在 ElasticSearch 中进行民航。Kibana 能够以图表的形式呈现数据，并且具有可扩展的用户界面，可以全方位的配置和管理 ElasticSearch。

Kibana 最早的时候是基于 Logstash 创建的工具，后被 Elastic 公司在 2013 年收购。

1）Kibana 可以提供各种可视化的图表；

2）可以通过机器学习的技术，对异常情况进行检测，用于提前发现可疑问题；

### 从日志收集系统看 ES Stack 的发展

> 我们看下 ELK 技术栈的演化，通常体现在日志收集系统中。

一个典型的日志系统包括：

1. 收集：能够采集多种来源的日志数据
2. 传输：能够稳定的把日志数据解析过滤并传输到存储系统
3. 存储：存储日志数据
4. 分析：支持 UI 分析
5. 警告：能够提供错误报告，监控机制

（1）beats+elasticsearch+kibana

Beats 采集数据后，存储在 ES 中，有 Kibana 可视化的展示。

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-1.png)

（2）beats+logstath+elasticsearch+kibana

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-2.png)

该框架是在上面的框架的基础上引入了 logstash，引入 logstash 带来的好处如下：

- Logstash 具有基于磁盘的自适应缓冲系统，该系统将吸收传入的吞吐量，从而减轻背压。
- 从其他数据源（例如数据库，S3 或消息传递队列）中提取。
- 将数据发送到多个目的地，例如 S3，HDFS 或写入文件。
- 使用条件数据流逻辑组成更复杂的处理管道。

beats 结合 logstash 带来的优势：

- 水平可扩展性，高可用性和可变负载处理：beats 和 logstash 可以实现节点之间的负载均衡，多个 logstash 可以实现 logstash 的高可用
- 消息持久性与至少一次交付保证：使用 beats 或 Winlogbeat 进行日志收集时，可以保证至少一次交付。从 Filebeat 或 Winlogbeat 到 Logstash 以及从 Logstash 到 Elasticsearch 的两种通信协议都是同步的，并且支持确认。Logstash 持久队列提供跨节点故障的保护。对于 Logstash 中的磁盘级弹性，确保磁盘冗余非常重要。
- 具有身份验证和有线加密的端到端安全传输：从 Beats 到 Logstash 以及从 Logstash 到 Elasticsearch 的传输都可以使用加密方式传递 。与 Elasticsearch 进行通讯时，有很多安全选项，包括基本身份验证，TLS，PKI，LDAP，AD 和其他自定义领域

**增加更多的数据源** 比如：TCP，UDP 和 HTTP 协议是将数据输入 Logstash 的常用方法

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-3.png)

（3）beats+MQ+logstash+elasticsearch+kibana

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-4.png)

在如上的基础上我们可以在 beats 和 logstash 中间添加一些组件 redis、kafka、RabbitMQ 等，添加中间件将会有如下好处：

（1）降低对日志所在机器的影响，这些机器上一般都部署着反向代理或应用服务，本身负载就很重了，所以尽可能的在这些机器上少做事；

（2）如果有很多台机器需要做日志收集，那么让每台机器都向 Elasticsearch 持续写入数据，必然会对 Elasticsearch 造成压力，因此需要对数据进行缓冲，同时，这样的缓冲也可以一定程度的保护数据不丢失；

（3）将日志数据的格式化与处理放到 Indexer 中统一做，可以在一处修改代码、部署，避免需要到多台机器上去修改配置；

### Elastic Stack 最佳实践

> 我们再看下官方开发成员分享的最佳实践。

#### 日志收集系统

（PS：就是我们上面阐述的）

基本的日志系统

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-5.png)

增加数据源，和使用 MQ

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-6.png)

#### Metric 收集和 APM 性能监控

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-7.png)

#### 多数据中心方案

通过冗余实现数据高可用

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-8.png)

两个数据采集中心（比如采集两个工厂的数据），采集数据后的汇聚

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-9.png)

数据分散，跨集群的搜索

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-10.png)

## Elasticsearch 基本原理

### ES 写数据过程

- 客户端选择一个 node 发送请求过去，这个 node 就是 `coordinating node`（协调节点）。
- `coordinating node` 对 document 进行**路由**，将请求转发给对应的 node（有 primary shard）。
- 实际的 node 上的 `primary shard` 处理请求，然后将数据同步到 `replica node`。
- `coordinating node` 如果发现 `primary node` 和所有 `replica node` 都搞定之后，就返回响应结果给客户端。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20210712104055.png)

### ES 读数据过程

可以通过 `doc id` 来查询，会根据 `doc id` 进行 hash，判断出来当时把 `doc id` 分配到了哪个 shard 上面去，从那个 shard 去查询。

- 客户端发送请求到**任意**一个 node，成为 `coordinate node`。
- `coordinate node` 对 `doc id` 进行哈希路由，将请求转发到对应的 node，此时会使用 `round-robin` **轮询算法**，在 `primary shard` 以及其所有 replica 中随机选择一个，让读请求负载均衡。
- 接收请求的 node 返回 document 给 `coordinate node`。
- `coordinate node` 返回 document 给客户端。

### es 搜索数据过程

es 最强大的是做全文检索，就是比如你有三条数据：

```
java 真好玩儿啊
java 好难学啊
j2ee 特别牛
```

你根据 `java` 关键词来搜索，将包含 `java` 的 `document` 给搜索出来。es 就会给你返回：java 真好玩儿啊，java 好难学啊。

- 客户端发送请求到一个 `coordinate node` 。
- 协调节点将搜索请求转发到**所有**的 shard 对应的 `primary shard` 或 `replica shard` ，都可以。
- query phase：每个 shard 将自己的搜索结果（其实就是一些 `doc id` ）返回给协调节点，由协调节点进行数据的合并、排序、分页等操作，产出最终结果。
- fetch phase：接着由协调节点根据 `doc id` 去各个节点上**拉取实际**的 `document` 数据，最终返回给客户端。

> 写请求是写入 primary shard，然后同步给所有的 replica shard；读请求可以从 primary shard 或 replica shard 读取，采用的是随机轮询算法。

### 写数据底层原理

[![es-write-detail](https://github.com/doocs/advanced-java/raw/master/docs/high-concurrency/images/es-write-detail.png)](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/images/es-write-detail.png)

先写入内存 buffer，在 buffer 里的时候数据是搜索不到的；同时将数据写入 translog 日志文件。

如果 buffer 快满了，或者到一定时间，就会将内存 buffer 数据 `refresh` 到一个新的 `segment file` 中，但是此时数据不是直接进入 `segment file` 磁盘文件，而是先进入 `os cache` 。这个过程就是 `refresh`。

每隔 1 秒钟，es 将 buffer 中的数据写入一个**新的** `segment file`，每秒钟会产生一个**新的磁盘文件** `segment file`，这个 `segment file` 中就存储最近 1 秒内 buffer 中写入的数据。

但是如果 buffer 里面此时没有数据，那当然不会执行 refresh 操作，如果 buffer 里面有数据，默认 1 秒钟执行一次 refresh 操作，刷入一个新的 segment file 中。

操作系统里面，磁盘文件其实都有一个东西，叫做 `os cache`，即操作系统缓存，就是说数据写入磁盘文件之前，会先进入 `os cache`，先进入操作系统级别的一个内存缓存中去。只要 `buffer` 中的数据被 refresh 操作刷入 `os cache`中，这个数据就可以被搜索到了。

为什么叫 es 是**准实时**的？ `NRT`，全称 `near real-time`。默认是每隔 1 秒 refresh 一次的，所以 es 是准实时的，因为写入的数据 1 秒之后才能被看到。可以通过 es 的 `restful api` 或者 `java api`，**手动**执行一次 refresh 操作，就是手动将 buffer 中的数据刷入 `os cache`中，让数据立马就可以被搜索到。只要数据被输入 `os cache` 中，buffer 就会被清空了，因为不需要保留 buffer 了，数据在 translog 里面已经持久化到磁盘去一份了。

重复上面的步骤，新的数据不断进入 buffer 和 translog，不断将 `buffer` 数据写入一个又一个新的 `segment file` 中去，每次 `refresh` 完 buffer 清空，translog 保留。随着这个过程推进，translog 会变得越来越大。当 translog 达到一定长度的时候，就会触发 `commit` 操作。

commit 操作发生第一步，就是将 buffer 中现有数据 `refresh` 到 `os cache` 中去，清空 buffer。然后，将一个 `commit point` 写入磁盘文件，里面标识着这个 `commit point` 对应的所有 `segment file`，同时强行将 `os cache` 中目前所有的数据都 `fsync` 到磁盘文件中去。最后**清空** 现有 translog 日志文件，重启一个 translog，此时 commit 操作完成。

这个 commit 操作叫做 `flush`。默认 30 分钟自动执行一次 `flush`，但如果 translog 过大，也会触发 `flush`。flush 操作就对应着 commit 的全过程，我们可以通过 es api，手动执行 flush 操作，手动将 os cache 中的数据 fsync 强刷到磁盘上去。

translog 日志文件的作用是什么？你执行 commit 操作之前，数据要么是停留在 buffer 中，要么是停留在 os cache 中，无论是 buffer 还是 os cache 都是内存，一旦这台机器死了，内存中的数据就全丢了。所以需要将数据对应的操作写入一个专门的日志文件 `translog` 中，一旦此时机器宕机，再次重启的时候，es 会自动读取 translog 日志文件中的数据，恢复到内存 buffer 和 os cache 中去。

translog 其实也是先写入 os cache 的，默认每隔 5 秒刷一次到磁盘中去，所以默认情况下，可能有 5 秒的数据会仅仅停留在 buffer 或者 translog 文件的 os cache 中，如果此时机器挂了，会**丢失** 5 秒钟的数据。但是这样性能比较好，最多丢 5 秒的数据。也可以将 translog 设置成每次写操作必须是直接 `fsync` 到磁盘，但是性能会差很多。

实际上你在这里，如果面试官没有问你 es 丢数据的问题，你可以在这里给面试官炫一把，你说，其实 es 第一是准实时的，数据写入 1 秒后可以搜索到；可能会丢失数据的。有 5 秒的数据，停留在 buffer、translog os cache、segment file os cache 中，而不在磁盘上，此时如果宕机，会导致 5 秒的**数据丢失**。

**总结一下**，数据先写入内存 buffer，然后每隔 1s，将数据 refresh 到 os cache，到了 os cache 数据就能被搜索到（所以我们才说 es 从写入到能被搜索到，中间有 1s 的延迟）。每隔 5s，将数据写入 translog 文件（这样如果机器宕机，内存数据全没，最多会有 5s 的数据丢失），translog 大到一定程度，或者默认每隔 30mins，会触发 commit 操作，将缓冲区的数据都 flush 到 segment file 磁盘文件中。

> 数据写入 segment file 之后，同时就建立好了倒排索引。

### 删除/更新数据底层原理

如果是删除操作，commit 的时候会生成一个 `.del` 文件，里面将某个 doc 标识为 `deleted` 状态，那么搜索的时候根据 `.del` 文件就知道这个 doc 是否被删除了。

如果是更新操作，就是将原来的 doc 标识为 `deleted` 状态，然后新写入一条数据。

buffer 每 refresh 一次，就会产生一个 `segment file`，所以默认情况下是 1 秒钟一个 `segment file`，这样下来 `segment file` 会越来越多，此时会定期执行 merge。每次 merge 的时候，会将多个 `segment file` 合并成一个，同时这里会将标识为 `deleted` 的 doc 给**物理删除掉**，然后将新的 `segment file` 写入磁盘，这里会写一个 `commit point`，标识所有新的 `segment file`，然后打开 `segment file` 供搜索使用，同时删除旧的 `segment file`。

### 底层 lucene

简单来说，lucene 就是一个 jar 包，里面包含了封装好的各种建立倒排索引的算法代码。我们用 Java 开发的时候，引入 lucene jar，然后基于 lucene 的 api 去开发就可以了。

通过 lucene，我们可以将已有的数据建立索引，lucene 会在本地磁盘上面，给我们组织索引的数据结构。

### 倒排索引

在搜索引擎中，每个文档都有一个对应的文档 ID，文档内容被表示为一系列关键词的集合。例如，文档 1 经过分词，提取了 20 个关键词，每个关键词都会记录它在文档中出现的次数和出现位置。

那么，倒排索引就是**关键词到文档** ID 的映射，每个关键词都对应着一系列的文件，这些文件中都出现了关键词。

举个栗子。

有以下文档：

| DocId | Doc                                            |
| ----- | ---------------------------------------------- |
| 1     | 谷歌地图之父跳槽 Facebook                      |
| 2     | 谷歌地图之父加盟 Facebook                      |
| 3     | 谷歌地图创始人拉斯离开谷歌加盟 Facebook        |
| 4     | 谷歌地图之父跳槽 Facebook 与 Wave 项目取消有关 |
| 5     | 谷歌地图之父拉斯加盟社交网站 Facebook          |

对文档进行分词之后，得到以下**倒排索引**。

| WordId | Word     | DocIds    |
| ------ | -------- | --------- |
| 1      | 谷歌     | 1,2,3,4,5 |
| 2      | 地图     | 1,2,3,4,5 |
| 3      | 之父     | 1,2,4,5   |
| 4      | 跳槽     | 1,4       |
| 5      | Facebook | 1,2,3,4,5 |
| 6      | 加盟     | 2,3,5     |
| 7      | 创始人   | 3         |
| 8      | 拉斯     | 3,5       |
| 9      | 离开     | 3         |
| 10     | 与       | 4         |
| ..     | ..       | ..        |

另外，实用的倒排索引还可以记录更多的信息，比如文档频率信息，表示在文档集合中有多少个文档包含某个单词。

那么，有了倒排索引，搜索引擎可以很方便地响应用户的查询。比如用户输入查询 `Facebook`，搜索系统查找倒排索引，从中读出包含这个单词的文档，这些文档就是提供给用户的搜索结果。

要注意倒排索引的两个重要细节：

- 倒排索引中的所有词项对应一个或多个文档；
- 倒排索引中的词项**根据字典顺序升序排列**

> 上面只是一个简单的栗子，并没有严格按照字典顺序升序排列。

## 参考资料

- **官方**
  - [Elasticsearch 官网](https://www.elastic.co/cn/products/Elasticsearch)
  - [Elasticsearch Github](https://github.com/elastic/Elasticsearch)
  - [Elasticsearch 官方文档](https://www.elastic.co/guide/en/Elasticsearch/reference/current/index.html)
- **文章**
  - [Install Elasticsearch with RPM](https://www.elastic.co/guide/en/Elasticsearch/reference/current/rpm.html#rpm)
  - [https://www.ruanyifeng.com/blog/2017/08/Elasticsearch.html](https://www.ruanyifeng.com/blog/2017/08/Elasticsearch.html)
  - [es-introduction](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/es-introduction.md)
  - [es-write-query-search](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/es-write-query-search.md)