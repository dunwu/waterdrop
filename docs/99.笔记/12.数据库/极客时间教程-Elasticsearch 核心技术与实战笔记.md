---
title: 《极客时间教程 - Elasticsearch 核心技术与实战》笔记
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
---

# 《极客时间教程 - Elasticsearch 核心技术与实战》笔记

## 什么是 Elasticsearch

Elasticsearch 是一款基于 Lucene 的开源分布式搜索引擎。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411060749487.png)

## Elasticsearch 概述及其发展历史

- 1.0（2014年1月）
- 5.0（2016年10月）
  - Lucene 6.x
  - 默认打分机制从 TD-IDF 改为 BM 25
  - 支持 Keyword 类型
- 6.0（2017年10月）
  - Lucene 7.x
  - 跨集群复制
  - 索引生命周期管理
  - SQL 的支持
- 7.0（2019年4月）
  - Lucene 7.x
  - 移除 Type
  - ECK （用于支持 K8S）
  - 集群协调
  - High Level Rest Client
  - Script Score 查询

## Elastic 技术栈

Elasticsearch、Logstash、Kibana

Beats - 各种采集器

X-Pack - 商业化套件

## 基本概念 - 索引、文档和 REST API

Elasticsearch 是面向文档的，文档是所有可搜索数据的最小单位。

Elasticsearch 中，文档会被序列化成 JSON 格式保存。

每个文档都有一个唯一性 ID，如果没有指定，ES 会自动生成。

### 文档元数据

- \_index -文档所属索引
- \_type - 文档所属类型
- \_id - 文档的唯一 ID
- \_source - 文档的原始数据（JSON）
- \_all - 整合所有字段内容到该字段，已废弃
- \_version - 文档版本
- \_score - 相关性打分

### 索引

mapping - 定义文档字段类型

setting - 定义不同数据分布

## 基本概念 - 集群、节点、分片、副本

集群的作用：高可用、可扩展

ES 集群通过 cluster.name 来区分。

ES 节点通过配置文件或 -E node.name=xxx 指定。

每个 ES 节点启动后，会分配一个 UID，保存在 data 目录下

### master 候选节点和 master 节点

每个节点启动后，默认就是一个 master 候选节点。候选节点可以通过选举，成为 master 节点。

集群中第一个节点启动时，会将自己选举为 master 节点。

每个节点上都保存了集群的状态，只有 master 节点才能修改集群的状态信息（通过集中式管理，保证数据一致性）。

集群状态信息：

- 所有的节点信息
- 所有的索引和相关 mapping、setting 信息
- 分片的路由信息

### data node 和 coordinating node

- data node - 保存数据的节点，叫做 data node。负责保存分片数据。
- coordinating node - 负责接受 client 请求，将请求分发到合适节点，最终把结果汇聚到一起。每个节点默认都有 coordinating node 的职责。

### 其他节点类型

hot & warm 节点 - 不同硬件配置的 data node，用来实现 hot & warm 架构，降低集群部署成本。

机器学习节点 - 负责跑机器学习的 Job，用来做异常检测

tribe 节点 - 连接到不同的 ES 集群

### 分片

主分片 - 用于水平扩展，以提升系统可承载的总数据量以及吞吐量。

- 一个分片是一个运行 Lucene 实例
- 主分片数在索引创建时指定，后续不允许修改，除非 reindex

副分片（副本） - 用于冗余，解决高可用的问题。

- 副本数，可以动态调整
- 增加副本数，可以在一定程度上提高服务的可用性，以及查询的吞吐量。

生产环境的分片数，需要提前规划：

分片数过小：

- 无法通过增加节点实现水平扩展
- 单个分片的数据量太大，导致数据重新分配耗时

分片数过大：

- 影响搜索结果的相关性打分，影响统计结果的准确性
- 单个节点上过多的分片，会导致资源浪费，同时也会影响性能
- 7.0 开始，默认主分片数设置为 1， 解决了 over-sharding 的问题

### 查看集群健康状态

`GET _cluster/health` 有三种结果：

- Green - 主分片和副本都正常分配
- Yellow - 主分片全部正常分配，有副本分片未能正常分配
- Red - 有主分片未能分配

## 文档的基本 CRUD 和批量操作

### 文档的 CRUD

- index
- create
- read
- update
- delete - DELETE `<index>/_doc/1`

### 批量写

bulk API 支持四种类型：

- index
- create
- update
- delete

### 批量读

mget

msearch

## 倒排索引

正排：文档 ID 到文档内容和单词的关联

倒排：单词到文档 ID 的关系

### 倒排索引的核心组成

倒排索引含两个部分

单词词典 - 记录所有文档的单词，记录单词到倒排列表的关联关系

倒排列表 - 记录了单词对应的文档结合，由倒排索引项组成。

倒排索引项：

- 文档 ID
- 词频 TF
- 位置
- 偏移

## 分词

分词：文本分析是把全文本转换一系列单词（term / token）的过程.

分析组件由如下三部分组成，它的执行顺序如下：

```
character filters -> tokenizer -> token filters
```

内置分析器：standard、simple、

## 参考资料

- [极客时间教程 - Elasticsearch 核心技术与实战](https://time.geekbang.org/course/detail/100030501-102659)
