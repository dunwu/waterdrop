---
icon: logos:elasticsearch
title: Elasticsearch 简介
date: 2020-06-16 07:10:44
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

## 为什么使用 Elasticsearch

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

> 参考：[What is Elasticsearch?](https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro-what-is-es.html)

## Elasticsearch 历史

- 1.0（2014 年）
- 5.0（2016 年）
  - Lucene 6.x
  - 默认打分机制从 TD-IDF 改为 BM 25
  - 增加 Keyword 类型
- 6.0（2017 年）
  - Lucene 7.x
  - 跨集群复制
  - 索引生命周期管理
  - SQL 的支持
- 7.0（2019 年）
  - Lucene 8.0
  - 移除 Type
  - ECK （用于支持 K8S）
  - 集群协调
  - High Level Rest Client
  - Script Score 查询
- 8.0（2022 年）
  - Lucene 9.0
  - 向量搜索
  - 支持 OpenTelemetry

## Elasticsearch 概念

```
index -> type -> mapping -> document -> field
```

Elasticsearch 核心概念如下：

- **Cluster（集群）** - 集群包含多个节点，每个节点属于哪个集群都是通过一个配置来决定的，对于中小型应用来说，刚开始一个集群就一个节点很正常。
- **Node（节点）** - Node 是集群中的一个节点，节点也有一个名称，默认是随机分配的。默认节点会去加入一个名称为 `Elasticsearch` 的集群。如果直接启动一堆节点，那么它们会自动组成一个 Elasticsearch 集群，当然一个节点也可以组成 Elasticsearch 集群。
- **Index（索引）** - 在 ES 中，**可以将索引视为文档（document）的集合**。
  - ES 会为所有字段建立索引，经过处理后写入一个反向索引（Inverted Index）。查找数据的时候，直接查找该索引。
  - 所以，ES 数据管理的顶层单位就叫做 Index（索引）。它是单个数据库的同义词。每个 Index （即数据库）的名字必须是小写。
- **Type（类型）** - 每个索引里可以有一个或者多个类型（type）。`类型（type）` 是 Index 的一个逻辑分类。
  - 不同的 Type 应该有相似的结构（schema），举例来说，`id`字段不能在这个组是字符串，在另一个组是数值。这是与关系型数据库的表的 [一个区别](https://www.elastic.co/guide/en/Elasticsearch/guide/current/mapping.html)。性质完全不同的数据（比如`products`和`logs`）应该存成两个 Index，而不是一个 Index 里面的两个 Type（虽然可以做到）。
  - 注意：ES 7.x 版已彻底移除 Type。
- **Document（文档）** - Index 里面单条的记录称为 Document。文档是一组字段。每个文档都有一个唯一的 ID。
- **Field（字段）** - 包含数据的键值对。默认情况下，Elasticsearch 对每个字段中的所有数据建立索引，并且每个索引字段都具有专用的优化数据结构。
- [**Metadata Field（元数据字段）**](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-fields.html) - 存储有关文档的信息的系统字段。元数据字段都以 `_` 开头。常见元数据字段：
  - [`_index`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-index-field.html) - 文档所属的索引
  - [`_id`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-id-field.html) - 文档的 ID
  - [`_source`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html) - 表示文档原文的 JSON
- **Shard（分片）** - 当单台机器不足以存储大量数据时，Elasticsearch 可以将一个索引中的数据切分为多个 **`分片（shard）`** 。 **`分片（shard）`** 分布在多台服务器上存储。有了 shard 就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。每个 shard 都是一个 lucene index。
- **Replica（副本）** - 任何一个服务器随时可能故障或宕机，此时 shard 可能就会丢失，因此可以为每个 shard 创建多个 **`副本（replica）`**。replica 可以在 shard 故障时提供备用服务，保证数据不丢失，多个 replica 还可以提升搜索操作的吞吐量和性能。primary shard（建立索引时一次设置，不能修改，默认 5 个），replica shard（随时修改数量，默认 1 个），默认每个索引 10 个 shard，5 个 primary shard，5 个 replica shard，最小的高可用配置，是 2 台服务器。

ES 核心概念 vs. DB 核心概念：

| ES                               | DB                 |
| -------------------------------- | ------------------ |
| 索引（index）                    | 数据库（database） |
| 类型（type，6.0 废弃，7.0 移除） | 数据表（table）    |
| 文档（docuemnt）                 | 行（row）          |
| 字符（field）                    | 列（column）       |
| 映射（mapping）                  | 表结构（schema）   |

## Elastic Stack 生态

Elastic Stack 生态主要组成：Beats + Logstash + ElasticSearch + Kibana

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-1-1.png)

### Beats

Beats 是一个面向**轻量型采集器**的平台，这些采集器可以从边缘机器向 Logstash、ElasticSearch 发送数据，它是由 Go 语言进行开发的，运行效率方面比较快。从下图中可以看出，不同 Beats 的套件是针对不同的数据源。

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-0.png)

### Logstash

Logstash 是**动态数据收集管道**，拥有可扩展的插件生态系统，支持从不同来源采集数据，转换数据，并将数据发送到不同的存储库中。其能够与 ElasticSearch 产生强大的协同作用，后被 Elastic 公司在 2013 年收购。

它具有如下特性：

1）实时解析和转换数据；

2）可扩展，具有 200 多个插件；

3）可靠性、安全性。Logstash 会通过持久化队列来保证至少将运行中的事件送达一次，同时将数据进行传输加密；

4）监控；

### ElasticSearch

ElasticSearch 对数据进行**搜索、分析和存储**，其是基于 JSON 的分布式搜索和分析引擎，专门为实现水平可扩展性、高可靠性和管理便捷性而设计的。

它的实现原理主要分为以下几个步骤：

1）首先用户将数据提交到 ElasticSearch 数据库中；

2）再通过分词控制器将对应的语句分词；

3）将分词结果及其权重一并存入，以备用户在搜索数据时，根据权重将结果排名和打分，将返回结果呈现给用户；

### Kibana

Kibana 实现**数据可视化**，其作用就是在 ElasticSearch 中进行民航。Kibana 能够以图表的形式呈现数据，并且具有可扩展的用户界面，可以全方位的配置和管理 ElasticSearch。

Kibana 最早的时候是基于 Logstash 创建的工具，后被 Elastic 公司在 2013 年收购。

1）Kibana 可以提供各种可视化的图表；

2）可以通过机器学习的技术，对异常情况进行检测，用于提前发现可疑问题；

### ELK 演化

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

（1）日志收集系统

（PS：就是我们上面阐述的）

基本的日志系统

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-5.png)

增加数据源，和使用 MQ

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-6.png)

（2）Metric 收集和 APM 性能监控

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-7.png)

（3）多数据中心方案

通过冗余实现数据高可用

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-8.png)

两个数据采集中心（比如采集两个工厂的数据），采集数据后的汇聚

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-9.png)

数据分散，跨集群的搜索

![img](https://learn.lianglianglee.com/%e4%b8%93%e6%a0%8f/ElasticSearch%e7%9f%a5%e8%af%86%e4%bd%93%e7%b3%bb%e8%af%a6%e8%a7%a3/assets/es-introduce-2-10.png)

## Elasticsearch 快速入门

> 参考：[Quick starts](https://www.elastic.co/guide/en/elasticsearch/reference/current/quickstart.html)

## Elasticsearch 设置

> 参考：[Set up Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html)

## 参考资料

- **官方**
  - [Elasticsearch 官网](https://www.elastic.co/cn/products/Elasticsearch)
  - [Elasticsearch Github](https://github.com/elastic/Elasticsearch)
  - [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- **文章**
  - [Install Elasticsearch with RPM](https://www.elastic.co/guide/en/Elasticsearch/reference/current/rpm.html#rpm)
  - [https://www.ruanyifeng.com/blog/2017/08/Elasticsearch.html](https://www.ruanyifeng.com/blog/2017/08/Elasticsearch.html)
  - [es-introduction](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/es-introduction.md)
  - [es-write-query-search](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/es-write-query-search.md)
