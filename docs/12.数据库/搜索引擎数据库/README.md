---
title: 搜索引擎数据库
date: 2023-09-08 16:02:29
categories:
  - 数据库
  - 搜索引擎数据库
tags:
  - 数据库
  - 搜索引擎数据库
permalink: /pages/bf863c80/
hidden: true
index: false
dir:
  order: 06
  link: true
---

# 搜索引擎数据库

## 📖 内容

### Elasticsearch

> Elasticsearch 是一个基于 Lucene 的搜索和数据分析工具，它提供了一个分布式服务。Elasticsearch 是遵从 Apache 开源条款的一款开源产品，是当前主流的企业级搜索引擎。

- [Elasticsearch 概述](Elasticsearch/[Elasticsearch]概述.md) - 关键词：`Lucene`、`倒排索引`、`分布式`、`全文搜索`、`Elastic Stack`、`Logstash`、`Kibana`、`近实时`
- [Elasticsearch 建模](Elasticsearch/[Elasticsearch]建模.md) - 关键词：`Mapping`、`动态映射`、`静态映射`、`数据类型`、`动态模板`、`运行时字段`、`嵌套类型`、`元数据字段`
- [Elasticsearch CRUD](Elasticsearch/[Elasticsearch]CRUD.md) - 关键词：`Index API`、`Bulk API`、`Update API`、`Delete API`、`Multi Get`、`文档版本控制`、`批量操作`、`Refresh策略`
- [Elasticsearch 存储](Elasticsearch/[Elasticsearch]存储.md) - 关键词：`倒排索引`、`正排索引`、`Shard`、`Segment`、`Index Setting`、`分词器`、`doc_values`、`逻辑存储`
- [Elasticsearch 检索（上）](Elasticsearch/[Elasticsearch]检索上.md) - 关键词：`_search API`、`分页`、`排序`、`深分页`、`search_after`、`高亮`、`filter`、`相关性评分`
- [Elasticsearch 检索（下）](Elasticsearch/[Elasticsearch]检索下.md) - 关键词：`Query DSL`、`全文查询`、`词项查询`、`bool查询`、`function_score`、`Suggester`、`多字段查询`、`模糊匹配`
- [Elasticsearch 聚合](Elasticsearch/[Elasticsearch]聚合.md) - 关键词：`Bucket聚合`、`Metric聚合`、`Pipeline聚合`、`terms聚合`、`date_histogram`、`子聚合`、`cardinality`、`聚合精度`
- [Elasticsearch 分析](Elasticsearch/[Elasticsearch]分析.md) - 关键词：`Analyzer`、`Tokenizer`、`Token Filter`、`Character Filter`、`中文分词`、`IK分词器`、`同义词`、`停用词`
- [Elasticsearch 集群](Elasticsearch/[Elasticsearch]集群.md) - 关键词：`集群健康`、`主分片`、`副本分片`、`水平扩容`、`故障转移`、`段合并`、`Refresh`、`Translog`
- [Elasticsearch 架构](Elasticsearch/[Elasticsearch]架构.md) - 关键词：`协调节点`、`数据路由`、`Query阶段`、`Fetch阶段`、`深度分页`、`Refresh`、`Translog`、`Merge`
- [Elasticsearch 优化](Elasticsearch/[Elasticsearch]优化.md) - 关键词：`JVM内存`、`分片策略`、`Bulk提交`、`refresh_interval`、`SSD`、`Filter优化`、`Hot-Warm架构`、`节点角色分离`
- [Elasticsearch 运维](Elasticsearch/[Elasticsearch]运维.md) - 关键词：`集群规划`、`elasticsearch.yml`、`vm.max_map_count`、`内存锁定`、`节点发现`、`JVM配置`、`分片分配`、`集群部署`
- [Elasticsearch API](Elasticsearch/[Elasticsearch]API.md) - 关键词：`REST API`、`URI Search`、`Request Body`、`Bulk API`、`索引别名`、`cat API`、`集群健康`、`msearch`
- [ElasticSearch API 之 High Level REST Client](Elasticsearch/[Elasticsearch]API之HighLevelRestClient.md) - 关键词：`RestHighLevelClient`、`Java REST Client`、`索引API`、`文档CRUD`、`SearchRequest`、`BulkRequest`、`RequestOptions`、`XContentType`
- [Elasticsearch 面试](Elasticsearch/[Elasticsearch]面试.md) 💯

### Elastic

- [Elastic](Elastic/Elastic.md) - 关键词：`Elastic Stack`、`ELK`、`Elasticsearch`、`Logstash`、`Kibana`、`Beats`、`日志采集`、`分布式架构`
- [Kibana](Elastic/Kibana.md) - 关键词：`Discover`、`Visualize`、`Dashboard`、`Index Pattern`、`查询语法`、`数据可视化`、`Kibana配置`、`搜索栏`
- [Logstash](Elastic/Logstash.md) - 关键词：`数据处理管道`、`Input插件`、`Filter插件`、`Output插件`、`Grok`、`事件处理`、`logstash.yml`、`pipeline配置`
- [Filebeat](Elastic/Filebeat.md) - 关键词：`Beats`、`轻量级采集器`、`日志采集`、`filebeat.yml`、`Prospector`、`多行日志`、`背压机制`、`断点续传`

## 📚 资料

### Elasticsearch 资料

- **官方**
  - [Elasticsearch 官网](https://www.elastic.co/cn/products/elasticsearch)
  - [Elasticsearch Github](https://github.com/elastic/elasticsearch)
  - [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
  - [Elasticsearch: The Definitive Guide](https://www.elastic.co/guide/en/elasticsearch/guide/master/index.html) - ElasticSearch 官方学习资料
- **书籍**
  - [《Elasticsearch 实战》](https://book.douban.com/subject/30380439/)
- **教程**
  - [ELK Stack 权威指南](https://github.com/chenryn/logstash-best-practice-cn)
  - [Elasticsearch 教程](https://www.knowledgedict.com/tutorial/elasticsearch-intro.html)
- **文章**
  - [Elasticsearch+Logstash+Kibana 教程](https://www.cnblogs.com/xing901022/p/4704319.html)
  - [ELK（Elasticsearch、Logstash、Kibana）安装和配置](https://github.com/judasn/Linux-Tutorial/blob/master/ELK-Install-And-Settings.md)
  - [Elasticsearch Performance Tuning Practice at eBay](https://www.ebayinc.com/stories/blogs/tech/elasticsearch-performance-tuning-practice-at-ebay/)
  - [Elasticsearch at Kickstarter](https://kickstarter.engineering/elasticsearch-at-kickstarter-db3c487887fc)
  - [9 tips on ElasticSearch configuration for high performance](https://www.loggly.com/blog/nine-tips-configuring-elasticsearch-for-high-performance/)
  - [Elasticsearch In Production - Deployment Best Practices](https://medium.com/@abhidrona/elasticsearch-deployment-best-practices-d6c1323b25d7)
- **更多资源**
  - [GitHub: Awesome ElasticSearch](https://github.com/dzharii/awesome-elasticsearch)

### Elastic 资料

- **官方**
  - [Logstash 官网](https://www.elastic.co/cn/products/logstash)
  - [Logstash Github](https://github.com/elastic/logstash)
  - [Logstash 官方文档](https://www.elastic.co/guide/en/logstash/current/index.html)
  - [Kibana 官网](https://www.elastic.co/cn/products/kibana)
  - [Kibana Github](https://github.com/elastic/kibana)
  - [Kibana 官方文档](https://www.elastic.co/guide/en/kibana/current/index.html)
  - [Beats 官网](https://www.elastic.co/cn/products/beats)
  - [Beats Github](https://github.com/elastic/beats)
  - [Beats 官方文档](https://www.elastic.co/guide/en/beats/libbeat/current/index.html)
- **第三方工具**
  - [logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder)
- **文章**
  - [Elasticsearch+Logstash+Kibana 教程](https://www.cnblogs.com/xing901022/p/4704319.html)
  - [ELK（Elasticsearch、Logstash、Kibana）安装和配置](https://github.com/judasn/Linux-Tutorial/blob/master/ELK-Install-And-Settings.md)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
