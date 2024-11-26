---
icon: logos:elasticsearch
title: Elasticsearch 面试
date: 2020-06-16 07:10:44
categories:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
tags:
  - 数据库
  - 搜索引擎数据库
  - Elasticsearch
  - 面试
permalink: /pages/6219b063/
---

# Elasticsearch 面试

## Elasticsearch 简介

### 【基础】什么是 ES？

:::details 参考答案

**[Elasticsearch](https://github.com/elastic/elasticsearch) 是一个开源的分布式搜索和分析引擎**。

**[Elasticsearch](https://github.com/elastic/elasticsearch) 基于搜索库 [Lucene](https://github.com/apache/lucene-solr) 开发**。Elasticsearch 隐藏了 Lucene 的复杂性，提供了简单易用的 REST API / Java API 接口（另外还有其他语言的 API 接口）。

Elasticsearch 是面向文档的，它**将复杂数据结构序列化为 JSON 形式存储**。

**Elasticsearch 是近实时（Near Realtime，缩写 NRT）的全文搜索**。近实时是指：

- 从写入数据到数据可以被搜索，存在较小的延迟（大概是 1s）。
- 基于 Elasticsearch 执行搜索和分析可以达到秒级。

:::

### 【基础】ES 的应用场景有哪些？

:::details 参考答案

Elasticsearch 的主要功能如下：

- **海量数据的分布式存储及集群管理**
- **提供丰富的近实时搜索能力**
- **海量数据的近实时分析（聚合）**

Elasticsearch 被广泛应用于以下场景：

- **搜索**
  - **全文检索** - Elasticsearch 通过快速搜索大型数据集，使复杂的搜索查询变得更加容易。它对于需要即时和相关搜索结果的网站、应用程序或企业特别有用。
  - **自动补全和拼写纠正** - 可以在用户输入内容时，实时提供自动补全和拼写纠正，以增加用户体验并提高搜索效率。
  - **地理空间搜索** - 使用地理空间查询搜索位置并计算空间关系。
- **可观测性**
  - **日志、指标和链路追踪** - 收集、存储和分析来自应用程序、系统和服务的日志、指标和追踪。
  - **性能监控** - 监控和分析业务关键性能指标。
  - **OpenTelemetry** - 使用 OpenTelemetry 标准，将遥测数据采集到 Elastic Stack。

:::

### 【基础】如何在 ES 中 CRUD？

:::details 参考答案

Elasticsearch 的基本 CRUD 方式如下：

- **添加索引**
  - `PUT <index>/_create/<id>` - 指定 id，如果 id 已存在，报错
  - `POST <index>/_doc` - 自动生成 `_id`
- **删除索引** - `DELETE /<index>？pretty`
- **更新索引** - `POST <index>/_update/<id>`
- **查询索引** - `GET <index>/_doc/<id>`
- **批量更新** - `bulk` API 支持 `index/create/update/delete`
- **批量查询** - `_mget` 和 `_msearch` 可以用于批量查询

> 扩展：[Quick starts](https://www.elastic.co/guide/en/elasticsearch/reference/current/quickstart.html)

:::

### 【中级】什么是 Elasic Stack(ELK)？

:::details 参考答案

Elastic Stack 通常被用来作为日志采集、检索、可视化的解决方案。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411231210104.png)

Elastic Stack 也常被称为 ELK，这是 Elastic 公司旗下三款产品 [Elasticsearch](https://www.elastic.co/elasticsearch) 、[Logstash](https://www.elastic.co/products/logstash) 、[Kibana](https://www.elastic.co/kibana) 的首字母组合。

- [Elasticsearch](https://www.elastic.co/elasticsearch) 负责存储数据，并提供对数据的检索和分析。
- [Logstash](https://www.elastic.co/logstash) 传输和处理你的日志、事务或其他数据。
- [Kibana](https://www.elastic.co/kibana) 将 Elasticsearch 的数据分析并渲染为可视化的报表。

Elastic Stack，在 ELK 的基础上扩展了一些新的产品。如：[Beats](https://www.elastic.co/beats)，这是针对不同类型数据的轻量级采集器套件。

此外，基于 Elastic Stack，其技术生态还可以和一些主流的分布式中间件进行集成，以应对各种不同的场景。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411231211496.png)

:::

## Elasticsearch 存储

### 【基础】ES 的逻辑存储是怎样设计的？

:::details 参考答案

Elasticsearch 的逻辑存储被设计为层级结构，自上而下依次为：

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411260812733.png)

各层级结构的说明如下：

（1）Document（文档）

Elasticsearch 是面向文档的，这意味着读写数据的最小单位是文档。Elasticsearch 以 JSON 文档的形式序列化和存储数据。文档是一组字段，这些字段是包含数据的键值对。每个文档都有一个唯一的 ID。

一个简单的 Elasticsearch 文档可能如下所示：

```json
{
  "_index": "my-first-elasticsearch-index",
  "_id": "DyFpo5EBxE8fzbb95DOa",
  "_version": 1,
  "_seq_no": 0,
  "_primary_term": 1,
  "found": true,
  "_source": {
    "email": "john@smith.com",
    "first_name": "John",
    "last_name": "Smith",
    "info": {
      "bio": "Eco-warrior and defender of the weak",
      "age": 25,
      "interests": ["dolphins", "whales"]
    },
    "join_date": "2024/05/01"
  }
}
```

Elasticsearch 中的 document 是无模式的，也就是并非所有 document 都必须拥有完全相同的字段，它们不受限于同一个模式。

（2）Field（字段）

field 包含数据的键值对。默认情况下，Elasticsearch 对每个字段中的所有数据建立索引，并且每个索引字段都具有专用的优化数据结构。

`document` 包含数据和元数据。[**Metadata Field（元数据字段）**](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-fields.html) 是存储有关文档信息的系统字段。在 Elasticsearch 中，元数据字段都以 `_` 开头。常见的元数据字段有：

- [`_index`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-index-field.html) - 文档所属的索引
- [`_id`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-id-field.html) - 文档的 ID
- [`_source`](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-source-field.html) - 表示文档原文的 JSON

（3）Type（类型）

在 Elasticsearch 中，**type 是 document 的逻辑分类**。每个 index 里可以有一个或多个 type。

不同的 type 应该有相似的结构（schema）。举例来说，`id`字段不能在这个组是字符串，在另一个组是数值。

> 注意：Elasticsearch 7.x 版已彻底移除 type。

（4）Index（索引）

在 Elasticsearch 中，**可以将 index 视为 document 的集合**。

Elasticsearch 会为所有字段建立索引，经过处理后写入一个倒排索引（Inverted Index）。查找数据的时候，直接查找该索引。

所以，Elasticsearch 数据管理的顶层单位就叫做 Index。它是单个数据库的同义词。每个 Index 的名字必须是小写。

（5）Elasticsearch 概念和 RDBM 概念

| Elasticsearch                    | DB                 |
| -------------------------------- | ------------------ |
| 索引（index）                    | 数据库（database） |
| 类型（type，6.0 废弃，7.0 移除） | 数据表（table）    |
| 文档（docuemnt）                 | 行（row）          |
| 字符（field）                    | 列（column）       |
| 映射（mapping）                  | 表结构（schema）   |

:::

### 【基础】ES 的物理存储是怎样设计的？

:::details 参考答案

Elasticsearch 的物理存储，天然使用了分布式设计。

每个 Elasticsearch 进程都从属于一个 cluster，一个 cluster 可以有一个或多个 node（即 Elasticsearch 进程）。

Elasticsearch 存储会将每个 index 分为多个 shard，而 shard 可以分布在集群中不同节点上。正是由于这个机制，使得 Elasticsearch 有了水平扩展的能力。shard 也是 Elasticsearch 将数据从一个节点迁移到拎一个节点的最小单位。

Elasticsearch 的每个 shard 对应一个 Lucene index（一个包含倒排索引的文件目录）。Lucene index 又会被分解为多个 segment。segment 是索引中的内部存储元素，由于写入效率的考虑，所以被设计为不可变更的。segment 会定期 [合并](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-merge.html) 较大的 segment，以保持索引大小。简单来说，Lucene 就是一个 jar 包，里面包含了封装好的构建、管理倒排索引的算法代码。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411260815446.png)

:::

### 【中级】什么是倒排索引？

:::details 参考答案

既然有倒排索引，顾名思义，有与之相对的正排索引。这里，以实现一个诗词检索器为例，来说明一下正排索引和倒排索引的区别。

**正排索引是 ID 到数据的映射关系**。如下所示，每首诗词用一个 ID 唯一识别。如果，我们要查找诗歌内容中是否包含某个关键字，就不得不在内容的完整文本中进行检索，效率很低。即使针对文档内容创建传统 RDBM 的索引（通常为 B+ 树结构），查找效率依然低下，并且会产生较大的额外存储空间开销。

| ID  | 文档标题   | 文档内容                                         |
| --- | ---------- | ------------------------------------------------ |
| 1   | 望月怀远   | 海上生明月，天涯共此时…                          |
| 2   | 春江花月夜 | 春江潮水连海平，海上明月共潮生…                  |
| 3   | 静夜思     | 床前明月光，疑是地上霜。举头望明月，低头思故乡。 |
| 4   | 锦瑟       | 沧海月明珠有泪，蓝田日暖玉生烟…                  |

倒排索引的实现与正排索引相反。**将文本分词后保存为多个词项，词项到 ID 的映射关系称为倒排索引（Inverted index）**。

| 词项 | ID         | 词频                               |
| ---- | ---------- | ---------------------------------- |
| 月   | 1, 2, 3, 4 | 1：1 次、2：1 次、3：2 次、4：1 次 |
| 明月 | 1, 2, 3    | 1：1 次、2：1 次、3：2 次          |
| 海   | 1, 2, 4    | 1：1 次、2：1 次、4：1 次          |

除了要保存词项与 ID 的关系外，还需要保存这个词项在对应文档出现的位置、偏移量等信息，这是因为很多检索的场景中还需要判断关键词前后的内容是否符合搜索要求。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411260816781.png)

:::

### 【中级】什么是字典树？

:::details 参考答案

Trie（字典树），也被称为前缀树，是一种树状数据结构，用于有效检索键值对。它通常用于实现字典和自动补全功能，使其成为许多搜索算法的基本组件。

Trie 遵循一个规则：如果两个字符串有共同的前缀，那么它们在 Trie 中将具有相同的祖先。

Trie 的检索能力也可以使用 Hash 替代，但是 Trie 比 Hash 更高效。此外，Trie 有 Hash 不具备的优势：Trie 支持前缀搜索和排序。Trie 的主要问题是：存储词项需要额外的空间，对于长文本，空间可能会变得很大。

![](https://media.geeksforgeeks.org/wp-content/uploads/20220828232752/Triedatastructure1.png)

:::

### 【高级】ES 如何实现倒排索引？

:::details 参考答案

在 Elasticsearch 中，数据存储、检索实际上是基于 Lucene 实现。

一个 Elasticsearch shard 对应一个 Lucene index，

Elasticsearch 的每个 shard 对应一个 Lucene index（一个包含倒排索引的文件目录）。Lucene index 又会被分解为多个 segment。segment 是索引中的内部存储元素，由于写入效率的考虑，所以被设计为不可变更的。segment 会定期 [合并](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-merge.html) 较大的 segment，以保持索引大小。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411260817705.png)

倒排索引的组成主要有 3 个部分：

- **Term Dictionary** - **Term Dictionary 用于保存 term（词项）**。由于 ES 会对 document 中的每个 field 都进行分词，所以数据量可能会非常大。
  - Term Dictionary 存储数据时，先将所有的 term 进行排序，然后将 Term Dictionary 中有共同前缀的 term 抽取出来进行分块存储；再对共同前缀做索引，最后通过索引就可以找到公共前缀对应的块在 Term Dictionary 文件中的偏移地址。
  - 由于每个块中都有共同前缀，所有不需要再保存每个 Term 的全部内容，只需要保存其后缀即可，而且这些后缀都是排好序的。
- **Term Index** - **Term Index 是 Term Dictionary 的索引**。由于 Term Dictionary 存储的 term 可能会非常多，为了提高查询效率，从而设计了 Term Index。
  - 为了提高检索效率以及节省空间，Term Index 只使用公共前缀做索引。
  - **Lucene 中实现 Term Index 采用了 FST 算法**。FST 是一种非常复杂的结构，可以把它简单理解为一个**占用空间小且高效的 KV 数据结构**，有点类似于 Trie（字典树）。FST 有以下的特点：
    - 通过对 Term Dictionary 数据的前缀复用，压缩了存储空间；
    - 高效的查询性能，`O(len(prefix))` 的复杂度；
    - 构建后不可修改，因此 Lucene segment 也不允许修改。
- **Posting List** - **Posting List 保存着每个 term 的映射信息**。如文档 ID、词频、位置等。Lucene 把这些数据分成 3 个文件进行存储：
  - `.doc` 文件，记录了文档 ID 信息和 term 的词频，还额外记录了跳表的信息，用来加速文档 ID 的查询；并且还记录了 term 在 `.pos` 和 `.pay` 文件中的位置，有助于进行快速读取。
  - `.pay` 文件，记录了 payload 信息和 term 在 doc 中的偏移信息；
  - `.pos` 文件，记录了 term 在 doc 中的位置信息。

> 扩展：https://www.itshujia.com/read/elasticsearch/354.html

:::

### 【基础】ES 支持哪些数据类型？

:::details 参考答案

Elasticsearch 支持丰富的数据类型，常见的有：

- 文本类型：[`text`](https://www.elastic.co/guide/en/elasticsearch/reference/current/text.html)、[`keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html#keyword-field-type)、[`constant_keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html#constant-keyword-field-type)、 [`wildcard`](https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html#wildcard-field-type)

- 二进制类型：[`binary`](https://www.elastic.co/guide/en/elasticsearch/reference/current/binary.html)

- 数值类型：`long`、`float` 等

- 日期类型：[`date`](https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html)

- 布尔类型：[`boolean`](https://www.elastic.co/guide/en/elasticsearch/reference/current/boolean.html)

- 对象类型：[`object`](https://www.elastic.co/guide/en/elasticsearch/reference/current/object.html)、[`nested`](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)

> 扩展：[数据类型](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)

:::

### 【基础】ES 如何识别字段的数据类型？

:::details 参考答案

在 Elasticsearch 中，每个文档都是字段的集合，每个字段都有自己的 [数据类型](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)。**Elasticsearch 通过映射来定义文档及其包含字段的存储和索引方式**。

Elasticsearch 映射可分为动态映射和静态映射。

在 RDBM 中写入数据之前首先要建表，在建表语句中声明字段的属性，在 Elasticsearch 中，则不必如此。Elasticsearch 最重要的功能之一是：文档写入 Elasticsearch 中，它会自动检测新字段的数据类型，这种机制称为 [**动态映射**](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html)。也正是由于这点，所以说 Elasticsearch 是无模式的。

例如，执行下面添加文档的操作，Elasticsearch 会自动将 `count` 字段识别为 `long` 类型。

```bash
PUT data/_doc/1
{ "count": 5 }
```

Elasticsearch 的动态映射无法保证完全符合预期，因此 Elasticsearch 也提供了显示设置映射规则的方法。[**静态映射（显示映射）**](https://www.elastic.co/guide/en/elasticsearch/reference/current/explicit-mapping.html) 是在创建索引时显示设置索引映射（即设置 mapping）。静态映射和 SQL 中在建表语句中指定字段属性类似。相比动态映射，通过静态映射可以添加更详细、更精准的配置信息。

- mapping 是用于定义文档结构的 JSON 对象。它指定文档中允许的字段，以及它们的数据类型和其他属性。mapping 用于控制文档的存储和索引方式，还影响文档的搜索和分析方式。

:::

## Elasticsearch 架构

### 【高级】ES 更新操作是如何执行的？

写入操作包含：单文档写入（index、create、update、delete）和批量写入（bulk）。

1. 客户端选择一个 node 发送请求过去，如果没有指定路由/协调节点，这个 node 就是 `coordinating node` （协调节点）。
2. `coordinating node` 对 document 进行**路由**，将请求转发给对应的 node（有 primary shard）。
3. 实际的 node 上的 `primary shard` 处理请求，然后将数据同步到 `replica node` 。
4. `coordinating node` 等待 `primary node` 和所有 `replica node` 执行成功后，就返回响应结果给客户端。

![es-write](https://github.com/doocs/advanced-java/raw/main/docs/high-concurrency/images/es-write.png)

第 2 步中的文档是如何路由的呢？

借助路由算法计算的对应的分片。路由算法就是：先根据 `_routing`（通常是 `_doc` 和 `_id`）进行 hash 计算，再根据主分片数取模。

```
shardNo = hash(_routing) % (num_of_primary_shards)
```

#### Elasticsearch index 操作的过程

协调节点默认使用文档 ID 参与计算（也支持通过 routing），以便为路由提供合适的分片。

```text
shard = hash(document_id) % (num_of_primary_shards)
```

- 当分片所在的节点接收到来自协调节点的请求后，会将请求写入到 MemoryBuffer，然后定时（默认是每隔 1 秒）写入到 Filesystem Cache，这个从 MemoryBuffer 到 Filesystem Cache 的过程就叫做 refresh；

- 当然在某些情况下，存在 Memory Buffer 和 Filesystem Cache 的数据可能会丢失，Elasticsearch 是通过 translog 的机制来保证数据的可靠性的。其实现机制是接收到请求后，同时也会写入到 translog 中 ，当 Filesystem cache 中的数据写入到磁盘中时，才会清除掉，这个过程叫做 flush；

- 在 flush 过程中，内存中的缓冲将被清除，内容被写入一个新段，段的 fsync 将创建一个新的提交点，并将内容刷新到磁盘，旧的 translog 将被删除并开始一个新的 translog。

- flush 触发的时机是定时触发（默认 30 分钟）或者 translog 变得太大（默认为 512M）时；

![](https://www.elastic.co/guide/en/elasticsearch/reference/current/images/data_processing_flow.png)

补充：关于 Lucene 的 Segement：

- Lucene 索引是由多个段组成，段本身是一个功能齐全的倒排索引。

- 段是不可变的，允许 Lucene 将新的文档增量地添加到索引中，而不用从头重建索引。

- 对于每一个搜索请求而言，索引中的所有段都会被搜索，并且每个段会消耗 CPU 的时钟周、文件句柄和内存。这意味着段的数量越多，搜索性能会越低。

- 为了解决这个问题，Elasticsearch 会合并小段到一个较大的段，提交新的合并段到磁盘，并删除那些旧的小段。

> 参考：
>
> - https://www.elastic.co/guide/en/elasticsearch/reference/current/preload-data-to-file-system-cache.html
> - https://blog.devgenius.io/elasticsearch-solution-to-searching-71116220c82f

#### Elasticsearch update 和 delete 操作的过程

Elasticsearch 的 document 的物理存储是 Luncene segment，而 segment 不允许变更。那么，如何处理删除和更新呢？

- 如果是删除操作，commit 的时候会生成一个 `.del` 文件，里面将某个 doc 标识为 `deleted` 状态，那么搜索的时候根据 `.del` 文件就知道这个 doc 是否被删除了。
- 如果是更新操作，就是将原来的 doc 标识为 `deleted` 状态，然后新写入一条数据。
- `memory buffer` 每 `refresh` 一次，就会产生一个 `segment file`。由于，默认每秒刷新 1 次，即每秒产生一个 `segment file`，这样下来 `segment file` 会越来越多。Elasticsearch 会定期执行 merge 操作，将多个 `segment file` 合并成一个。合并时会将标识为 `deleted` 的 doc 给**物理删除掉**，然后将新的 `segment file` 写入磁盘，这里会写一个 `commit point`，标识所有新的 `segment file`，然后打开 `segment file` 供搜索使用，同时删除旧的 `segment file`。

### 【高级】ES 查询操作是如何执行的？

在 Elasticsearch 中，搜索一般分为两个阶段，query 和 fetch 阶段。可以简单的理解，query 阶段确定要取哪些 doc，fetch 阶段取出具体的 doc。

1. 客户端发送请求到**任意**一个 node，这个 node 成为 `coordinate node`。`coordinate node` 创建一个大小为 from + size 的优先级队列用来存放结果。
2. `coordinate node` 将请求广播到**所有**的 shard（`primary shard` 或 `replica shard` 都可以）。
3. query phase：每个 shard 在内部执行搜索请求，执行结果存到自身内部的大小同样为 from+size 的优先级队列里，然后将结果返回给 `coordinate node`，`coordinate node` 对数据进行汇总处理：合并、排序、分页，产生最终结果。
4. fetch phase：`coordinate node` 根据 `doc id` 去各个节点上 fetch（拉取）实际的 `document` 数据，最终返回给客户端。

由以上流程可知：每个 shard 要扫描 `from + size` 条数据；而协调节点需要接收并处理 `(from + size) * primary_shard_num` 条数据量。一旦 from 或 size 过大，计算量也会很大，耗时很高。因此，Elasticsearch 默认限制数据结果窗口大小为 10000（可以通过 `index.max_result_window` 调整）。——这就是为什么 Elasticsearch 存在深分页问题。

此外，需要注意的是：搜索的时候，查询的是 Filesystem Cache 中的数据；而存在于 Memory Buffer 中，还未来得及刷新的数据，是不可见的。由于，默认刷新时间为 1 秒，这就是为什么 Elasticsearch 被称为近实时搜索的原因。

![img](https://pic2.zhimg.com/80/v2-4c25616e623de2aee23bd63ec22a5bfd_720w.jpg)

### 写数据底层原理

[![es-write-detail](https://github.com/doocs/advanced-java/raw/master/docs/high-concurrency/images/es-write-detail.png)](https://github.com/doocs/advanced-java/blob/main/docs/high-concurrency/images/es-write-detail.png)

先写入内存 buffer，在 buffer 里的时候数据是搜索不到的；同时将数据写入 translog 日志文件。

如果 buffer 快满了，或者到一定时间，就会将内存 buffer 数据 `refresh` 到一个新的 `segment file` 中，但是此时数据不是直接进入 `segment file` 磁盘文件，而是先进入 `os cache` 。这个过程就是 `refresh` 。

每隔 1 秒钟，es 将 buffer 中的数据写入一个**新的** `segment file` ，每秒钟会产生一个**新的磁盘文件** `segment file` ，这个 `segment file` 中就存储最近 1 秒内 buffer 中写入的数据。

但是如果 buffer 里面此时没有数据，那当然不会执行 refresh 操作，如果 buffer 里面有数据，默认 1 秒钟执行一次 refresh 操作，刷入一个新的 segment file 中。

操作系统里面，磁盘文件其实都有一个东西，叫做 `os cache` ，即操作系统缓存，就是说数据写入磁盘文件之前，会先进入 `os cache` ，先进入操作系统级别的一个内存缓存中去。只要 `buffer` 中的数据被 refresh 操作刷入 `os cache` 中，这个数据就可以被搜索到了。

为什么叫 es 是**准实时**的？ `NRT` ，全称 `near real-time` 。默认是每隔 1 秒 refresh 一次的，所以 es 是准实时的，因为写入的数据 1 秒之后才能被看到。可以通过 es 的 `restful api` 或者 `java api` ，**手动**执行一次 refresh 操作，就是手动将 buffer 中的数据刷入 `os cache` 中，让数据立马就可以被搜索到。只要数据被输入 `os cache` 中，buffer 就会被清空了，因为不需要保留 buffer 了，数据在 translog 里面已经持久化到磁盘去一份了。

重复上面的步骤，新的数据不断进入 buffer 和 translog，不断将 `buffer` 数据写入一个又一个新的 `segment file` 中去，每次 `refresh` 完 buffer 清空，translog 保留。随着这个过程推进，translog 会变得越来越大。当 translog 达到一定长度的时候，就会触发 `commit` 操作。

commit 操作发生第一步，就是将 buffer 中现有数据 `refresh` 到 `os cache` 中去，清空 buffer。然后，将一个 `commit point` 写入磁盘文件，里面标识着这个 `commit point` 对应的所有 `segment file` ，同时强行将 `os cache` 中目前所有的数据都 `fsync` 到磁盘文件中去。最后**清空** 现有 translog 日志文件，重启一个 translog，此时 commit 操作完成。

这个 commit 操作叫做 `flush` 。默认 30 分钟自动执行一次 `flush` ，但如果 translog 过大，也会触发 `flush` 。flush 操作就对应着 commit 的全过程，我们可以通过 es api，手动执行 flush 操作，手动将 os cache 中的数据 fsync 强刷到磁盘上去。

translog 日志文件的作用是什么？你执行 commit 操作之前，数据要么是停留在 buffer 中，要么是停留在 os cache 中，无论是 buffer 还是 os cache 都是内存，一旦这台机器死了，内存中的数据就全丢了。所以需要将数据对应的操作写入一个专门的日志文件 `translog` 中，一旦此时机器宕机，再次重启的时候，es 会自动读取 translog 日志文件中的数据，恢复到内存 buffer 和 os cache 中去。

translog 其实也是先写入 os cache 的，默认每隔 5 秒刷一次到磁盘中去，所以默认情况下，可能有 5 秒的数据会仅仅停留在 buffer 或者 translog 文件的 os cache 中，如果此时机器挂了，会**丢失** 5 秒钟的数据。但是这样性能比较好，最多丢 5 秒的数据。也可以将 translog 设置成每次写操作必须是直接 `fsync` 到磁盘，但是性能会差很多。

实际上你在这里，如果面试官没有问你 es 丢数据的问题，你可以在这里给面试官炫一把，你说，其实 es 第一是准实时的，数据写入 1 秒后可以搜索到；可能会丢失数据的。有 5 秒的数据，停留在 buffer、translog os cache、segment file os cache 中，而不在磁盘上，此时如果宕机，会导致 5 秒的**数据丢失**。

**总结一下**，数据先写入内存 buffer，然后每隔 1s，将数据 refresh 到 os cache，到了 os cache 数据就能被搜索到（所以我们才说 es 从写入到能被搜索到，中间有 1s 的延迟）。每隔 5s，将数据写入 translog 文件（这样如果机器宕机，内存数据全没，最多会有 5s 的数据丢失），translog 大到一定程度，或者默认每隔 30mins，会触发 commit 操作，将缓冲区的数据都 flush 到 segment file 磁盘文件中。

> 数据写入 segment file 之后，同时就建立好了倒排索引。

### 【高级】ES 如何保证读写一致？

**乐观锁机制** - 可以通过版本号使用乐观并发控制，以确保新版本不会被旧版本覆盖，由应用层来处理具体的冲突；

另外对于写操作，一致性级别支持 quorum/one/all，默认为 quorum，即只有当大多数分片可用时才允许写操作。但即使大多数可用，也可能存在因为网络等原因导致写入副本失败，这样该副本被认为故障，分片将会在一个不同的节点上重建。

对于读操作，可以设置 replication 为 sync（默认），这使得操作在主分片和副本分片都完成后才会返回；如果设置 replication 为 async 时，也可以通过设置搜索请求参数、\_preference 为 primary 来查询主分片，确保文档是最新版本。

## Elasticsearch 搜索

### Elasticsearch 查询速度为什么快？

:::details 参考答案

- **倒排索引** - Elasticsearch 查询速度快最核心的点在于使用倒排索引。
  - 在 Elasticsearch 中，为了提高查询效率，它对存储的文档进行了分词处理。分词是将连续的文本切分成一个个独立的词项的过程。对文本进行分词后，Elasticsearch 会为每个词项创建一个倒排索引。这样，当用户进行查询时，Elasticsearch 只需要在倒排索引中查找匹配的词项，从而快速地定位到相关的文档。
  - 正向索引的结构是每个文档和关键字做关联，每个文档都有与之对应的关键字，记录关键字在文档中出现的位置和次数；而倒排索引则是将文档中的词项和文档的 ID 进行关联，这样就可以通过词项快速找到包含它的文档。
- **分片** - Elasticsearch 通过分片，支持分布式存储和搜索，可以实现搜索的并行处理和负载均衡。

> 参考：https://cloud.tencent.com/developer/article/1922613

:::

### Elasticsearch 有几种分页方式？各有什么特点？

:::details 参考答案

Elasticsearch 支持三种分页查询方式。

- from + size - 可以使用 `from` 和 `size` 参数分别指定起始页和每页记录数。
- search after - search after 搜索方式不支持指定页数，只能向下翻页；并且需要指定 sort，并保证值是唯一的。然后，可以反复使用上次结果中最后一个文档的 sort 值进行查询。
- scroll - scroll 查询方式类似于 RDBMS 中的游标，只允许向下翻页。每次下一页查询后，使用返回结果的 scroll id 来作为下一次翻页的标记。scroll 查询会在搜索初始化阶段会生成快照，后续数据的变化无法及时体现在查询结果，因此更加适合一次性批量查询或非实时数据的分页查询。

:::

### Elasticsearch 为什么会有深分页问题？

:::details 参考答案

在 Elasticsearch 中，搜索一般分为两个阶段，query 和 fetch 阶段。可以简单的理解，query 阶段确定要取哪些 doc，fetch 阶段取出具体的 doc。

1. 客户端发送请求到**任意**一个 node，这个 node 成为 `coordinate node`。`coordinate node` 创建一个大小为 from + size 的优先级队列用来存放结果。
2. `coordinate node` 将请求广播到**所有**的 shard（`primary shard` 或 `replica shard` 都可以）。
3. query phase：每个 shard 在内部执行搜索请求，执行结果存到自身内部的大小同样为 from+size 的优先级队列里，然后将结果返回给 `coordinate node`，`coordinate node` 对数据进行汇总处理：合并、排序、分页，产生最终结果。
4. fetch phase：`coordinate node` 根据 `doc id` 去各个节点上 fetch（拉取）实际的 `document` 数据，最终返回给客户端。

由以上流程可知：每个 shard 要扫描 from + size 条数据；而协调节点需要接收并处理 `(from + size) * primary_shard_num` 条数据量。一旦 from 或 size 过大，计算量也会很大，耗时很高。因此，Elasticsearch 默认限制数据结果窗口大小为 10000（可以通过 `index.max_result_window` 调整）。

:::

### 如何解决 Elasticsearch 深分页问题？

:::details 参考答案

可以使用 search after 或 scroll 分页方式来解决深分页。

Elasticsearch 官方不再建议使用 scroll 查询方式进行深分页，而是推荐使用 [`search_after`](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after) 和时间点（PIT）一起使用。

:::

### Elasticsearch 索引别名有什么用？

:::details 参考答案

Elasticsearch 中的别名可用于更轻松地管理和使用索引。别名允许同时对多个索引执行操作，或者通过隐藏底层索引结构的复杂性来简化索引管理。

:::

### 【基础】Elasticsearch 查询中的 query 上下文和 filter 上下文有什么区别？

在 Elasticsearch 中，可以在两个不同的上下文中执行查询：

filter 上下文 - filter 的主要目的是通过应用特定条件或过滤器来缩小搜索结果的范围。当您希望根据特定标准包含或排除文档而不考虑其相关性分数时，会使用过滤器。

query 上下文 - 主要目的是确定文档与搜索查询的相关性。它根据每个文档与查询条件的匹配程度计算每个文档的相关性分数。当您希望根据文档的相关性分数检索最相关的文档时，会使用查询。

### 【基础】match 查询功能有什么用途？

Elasticsearch 中的 match 查询功能用于搜索包含特定值的文档。match 查询可用于搜索包含特定字符串、特定数字或特定日期的文档。

match 查询采用两个参数：字段名称和要搜索的值。字段名称是要搜索的文档中的“字段名称”。该值是您要搜索的值。

### 【基础】multi_match 查询功能有什么用途？

Elasticsearch 中的 multi_match 查询功能旨在通过单个查询跨多个字段执行搜索。它允许您指定多个字段并同时在所有指定字段中搜索匹配的文档。以下是 multi-match 查询函数的一些常见使用案例：

- 跨字段搜索
- 查询多个文本字段
- 搜索相关性
- 灵活的搜索
- 多语言搜索
- 部分匹配

### 【基础】range 查询功能有什么用途？

Elasticsearch 中的 range 查询功能用于搜索包含指定范围内的值的文档。范围查询可用于搜索包含特定字符串、特定数字或特定日期的文档。

范围查询采用三个参数：字段名称、起始值和结束值。字段名称是文档中要搜索的字段的名称。起始值是要搜索的最小值。end value （结束值） 是要搜索的最大值。

### 【基础】exists 查询功能有什么用途？

Elasticsearch 中的 'exists' 查询函数用于检查文档中是否存在特定字段。当您想根据某个字段的存在与否来搜索文档时，它特别有用。

'exists' 查询接受一个参数：字段名称。Field name （字段名称） 是要搜索的字段的名称。

### 【基础】script_score 查询功能有什么用途？

Elasticsearch 中的 script_score 函数用于根据自定义评分脚本自定义搜索结果的评分。它允许您通过提供计算每个文档的自定义分数的脚本来影响文档的相关性评分。

script_score 功能提供了灵活性，并可以控制 Elasticsearch 中搜索结果的评分。

### 【基础】common_terms 查询功能有什么用途？

Elasticsearch 中的 common_terms 查询函数用于文本查询，旨在查找与查询匹配的文档，同时考虑其他查询通常可能忽略的常见术语。它有助于解决查找相关结果的挑战，同时仍考虑索引文档的很大一部分中出现的常用术语。

### 【基础】bool 查询功能有什么用途？

Elasticsearch 中的布尔查询是使用布尔运算符将多个查询合并为单个查询的查询。

布尔查询的主要子句是：

- must - 必须子句指定必须与查询匹配的文档。所有与 must 子句不匹配的文档都将被排除在结果之外。
- should - should 子句指定应与查询匹配的文档。与 should 子句匹配的文档将包含在结果中，即使它们与 must 子句不匹配也是如此。
- must_not - must_not 子句指定必须与查询不匹配的文档。与 must_not 子句匹配的所有文档都将从结果中排除。

## Elasticsearch 聚合

### 【基础】什么是聚合？Elasticsearch 中有哪些聚合？

:::details 参考答案

Elasticsearch 中的聚合是一项强大的功能，可让您实时分析、汇总和执行复杂的数据集计算。聚合提供了从索引数据中分组和提取可操作见解的功能，这些数据可用于数据可视化、报告和分析目的。

Elasticsearch 中的聚合主要有三种类型：

- Bucket：分组计算
- Metric：统计值计算
- Pipeline：在聚合结果的基础上再次聚合，而非直接处理文档数据

:::

### 【中级】Elasticsearch 如何对海量数据（过亿）进行聚合计算？

Elasticsearch 提供的首个近似聚合是 cardinality 度量。它提供一个字段的基数，即该字段的 distinct 或者 unique 值的数目。它是基于 HLL 算法的。HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。

## Elasticsearch 分析

### 【基础】Elasticsearch 中的分析器是什么？

在 Elasticsearch 中，分析器是用于对文本进行分词的组件。分析器用于将文本分解为更小的单元，称为分词。然后，这些分词用于索引和搜索文本。分析器的主要目标是将原始文本转换为可以有效搜索和分析的结构化格式 （分词）。

文本分析由 [**analyzer（分析器）**](https://www.elastic.co/guide/en/elasticsearch/reference/current/analyzer-anatomy.html) 执行，分析器是一组控制整个过程的规则。无论是索引还是搜索，都需要使用分析器。

[**analyzer（分析器）**](https://www.elastic.co/guide/en/elasticsearch/reference/current/analyzer-anatomy.html) 由三个组件组成：零个或多个 [Character Filters（字符过滤器）](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-charfilters.html)、有且仅有一个 [Tokenizer（分词器）](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html)、零个或多个 [Token Filters（分词过滤器）](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html)。

它的执行顺序如下：

```
character filters -> tokenizer -> token filters
```

## Elasticsearch 集群

### 【基础】如哈查看 Elasticsearch 集群状态？

在 Elasticsearch 中， `_cat` API 是一组简单明了的 API，以人类可读的格式提供有关集群、节点、索引和其他组件的信息。`_cat` API 主要用于故障排除、监控和快速了解 Elasticsearch 集群的状态和运行状况。

### 【中级】Elasticsearch 集群中有哪些不同类型的节点？

:::details 参考答案

Elasticsearch 中的节点是指集群中的单个 Elasticsearch 进程实例。节点用于存储数据并参与集群的索引和搜索功能。

节点间会相互通信以分配数据和工作负载，从而确保集群的平衡和高性能。节点可以配置不同的角色，这些角色决定了它们在集群中的职责。

可以通过在 `elasticsearch.yml` 中设置 `node.roles` 来为节点分配角色。但是，如果您未设置 nodes.roles，则默认情况下，节点将被分配以下角色：

- **master（主节点）** - **主节点负责管理集群状态**。这包括集群中有哪些节点、存在哪些索引以及分片所在的位置等信息。
  - **分配分片**：创建新索引时，主节点将分片分配给集群中的节点。
  - **分片再均衡**：如果节点发生故障，主节点将重新平衡分片以确保所有数据仍然可用。
- **master-eligible（候选主节点）** - 当主节点无法正常工作，候选节点可以参与主节点的选举，其中一个节点回被选为主节点。
- **data（数据节点）** - 数据节点负责存储、索引和提供实际数据（分片数据）。它们处理索引操作 （在索引中添加或更新文档） 和搜索操作 （根据查询条件检索相关文档）。
- **ingest（摄取节点）** - 这些节点在索引之前预处理传入数据。他们使用 Elasticsearch 的采集管道在采集数据时对其进行转换、丰富和筛选。
- **coordinating（协调节点）** - 协调节点充当客户端请求的入口点，负责编排客户端和数据节点之间的通信。它们不存储数据或执行摄取处理，而是充当智能负载均衡器，优化查询和聚合的分发。
- **machine learning（机器学习节点）** - 机器学习节点专用于在 Elasticsearch 中运行机器学习作业，通常用于异常检测和数据分析。
- **cross-cluster search（CCS，跨集群搜索节点）** - CCS 节点支持同时查询多个 Elasticsearch 集群，充当跨这些集群执行联合搜索的单个点。
- **voting-only（仅限投票节点）** - 这些节点符合主节点条件，但不能被选为主节点。它们的主要功能是在主节点选举中投票，帮助防止票数平局并维护集群稳定性。

:::

### 【高级】Elasticsearch 集群中的 hot-warm-cold 架构有什么作用？

hot-warm-cold 是一种在 Elasticsearch 集群中的不同节点之间分配数据的方法。

- **hot** - hot 节点是集群中速度最快、功能最强大的节点。它们用于存储和提供最常访问的数据。
- **warm** - warm 节点的速度不如热节点快，但仍然相对较快。它们用于存储和提供访问频率低于热节点上数据的数据的数据。
- **cold** - cold 节点是集群中最慢且功能最弱的节点。它们用于存储和提供不经常访问的数据。

### 【高级】Elasticsearch 集群中的 ILM 是什么？

## Elasticsearch 复制

### Elasticsearch 如何保证数据可靠性？

Elasticsearch 通过以下几项功能确保数据可靠性：

- **复制**：将数据复制到集群中的多个节点，从而防止在节点发生故障时丢失数据。
- **分片**：数据被划分为分片，分片可以分布在多个节点上。这提高了性能和可伸缩性。
- **快照和还原**：Elasticsearch 提供快照和还原功能，允许您创建和还原数据备份。这可以防止由于人为错误或灾难而导致的数据丢失。
- **监控和警报**：Elasticsearch 提供了许多监控和警报功能，可以帮助您识别和解决潜在的数据问题。
- **安全性**：Elasticsearch 可以配置多种安全功能，以保护您的数据免受未经授权的访问。

### Elasticsearch 是如何实现选主的？

限制条件：

- 只有候选主节点才能成为主节点。

- 设置 `discovery.zen.minimum_master_nodes` 为 `N / 2 + 1`，当集群由于故障（如：通信失联）被分割成多个子集群时，节点数未达到半数以上的子集群，不允许进行选主。以此，来避免出现**脑裂**问题。

选主流程：

- Elasticsearch 的选主是 ZenDiscovery 模块负责的，主要包含 Ping（节点之间通过这个 RPC 来发现彼此）和 Unicast（单播模块，包含一个主机列表以控制哪些节点需要 ping 通）这两部分；

- 对所有可以成为 master 的节点（node.master: true）根据 nodeId 字典排序，每次选举每个节点都把自己所知道节点排一次序，然后选出第一个（第 0 位）节点，暂且认为它是 master 节点。

- 如果对某个节点的投票数达到一定的值（可以成为 master 节点数 n/2+1）并且该节点自己也选举自己，那这个节点就是 master。否则重新选举一直到满足上述条件。

- 补充：master 节点的职责主要包括集群、节点和索引的管理，不负责文档级别的管理；data 节点可以关闭 http 功能。

### Elasticsearch 如何避免脑裂问题？

Elasticsearch 中的最小主节点配置指定了集群中必须可用的最小节点数，才能将集群视为正常运行。如果集群中的节点数低于最小主节点配置，集群将进入“裂脑”状态，这可能导致数据丢失和其他问题。最低主节点配置非常重要，因为它可确保始终有 quorum 节点可用于管理集群。仲裁是集群中的大多数节点，对于选举新的主节点、创建或删除索引以及重新平衡分片等任务，它是必需的。

## Elasticsearch 分区

### 【中级】Elasticsearch 是如何实现水平扩展的？

Elasticsearch 通过分片来实现水平扩展。在 Elasticsearch 中，分片是索引的逻辑划分。索引可以有一个或多个分片，并且每个分片可以存储在集群中的不同节点上。分片用于在多个节点之间分配数据，从而提高性能和可扩展性。

Elasticsearch 中有两种类型的分片：

- primary shard（主分片） - 用于存储原始数据。适当增加主分片数，可以提升 Elasticsearch 集群的吞吐量和
- replica shard（副本分片） - 用于存储数据备份。

默认情况下，每个索引都有 1 个主分片（早期版本，默认每个索引有 5 个主分片）。

### Elasticsearch 是如何实现分区再均衡的？

![](https://raw.githubusercontent.com/dunwu/images/master/snap/202411221525828.png)

## Elasticsearch 建模

### 【基础】什么是 Elasticsearch 文档的父子关系？

Elasticsearch 中的父子关系是一种对文档之间的分层关系进行建模的方法。在父子关系中，一个文档（父文档）可以有一个或多个子文档。父文档是层次结构的根，子文档是其后代。

要创建父子关系，请在子文档中指定 `parent` 字段。`parent` 字段是包含父文档 ID 的字符串。当索引一个子文档时，Elasticsearch 会自动将其与父文档关联。

## Elasticsearch 生产环境

### Elasticsearch 生产环境部署情况是怎样的？

**典型问题**

- 你们的 Elasticsearch 生产环境部署情况是怎样的？
- 你们的 Elasticsearch 生产环境集群规模有多大？
- 你们的 Elasticsearch 生产环境中有多少索引，每个索引大概有多少个分片？

**知识点**

根据实际 Elasticsearch 集群情况描述，以下是一个案例：

- 节点数：19
- 索引数、分片数：1200+ 索引、1.6 万+ 分片
- 机器配置：6 核，10G 内存，800G 磁盘
- 容量：总容量 15TB，使用容量 10TB+
- 日增数据量：约 4 千万条数据，50 GB 增长容量

## Elasticsearch 优化

### filesystem cache

你往 es 里写的数据，实际上都写到磁盘文件里去了，**查询的时候**，操作系统会将磁盘文件里的数据自动缓存到 `filesystem cache` 里面去。

[![es-search-process](https://github.com/doocs/advanced-java/raw/main/docs/high-concurrency/images/es-search-process.png)](https://github.com/doocs/advanced-java/blob/master/docs/high-concurrency/images/es-search-process.png)

es 的搜索引擎严重依赖于底层的 `filesystem cache` ，你如果给 `filesystem cache` 更多的内存，尽量让内存可以容纳所有的 `idx segment file`索引数据文件，那么你搜索的时候就基本都是走内存的，性能会非常高。

性能差距究竟可以有多大？我们之前很多的测试和压测，如果走磁盘一般肯定上秒，搜索性能绝对是秒级别的，1 秒、5 秒、10 秒。但如果是走 `filesystem cache` ，是走纯内存的，那么一般来说性能比走磁盘要高一个数量级，基本上就是毫秒级的，从几毫秒到几百毫秒不等。

这里有个真实的案例。某个公司 es 节点有 3 台机器，每台机器看起来内存很多，64G，总内存就是 `64 * 3 = 192G` 。每台机器给 es jvm heap 是 `32G` ，那么剩下来留给 `filesystem cache` 的就是每台机器才 `32G` ，总共集群里给 `filesystem cache` 的就是 `32 * 3 = 96G` 内存。而此时，整个磁盘上索引数据文件，在 3 台机器上一共占用了 `1T` 的磁盘容量，es 数据量是 `1T` ，那么每台机器的数据量是 `300G` 。这样性能好吗？ `filesystem cache` 的内存才 100G，十分之一的数据可以放内存，其他的都在磁盘，然后你执行搜索操作，大部分操作都是走磁盘，性能肯定差。

归根结底，你要让 es 性能要好，最佳的情况下，就是你的机器的内存，至少可以容纳你的总数据量的一半。

根据我们自己的生产环境实践经验，最佳的情况下，是仅仅在 es 中就存少量的数据，就是你要**用来搜索的那些索引**，如果内存留给 `filesystem cache` 的是 100G，那么你就将索引数据控制在 `100G` 以内，这样的话，你的数据几乎全部走内存来搜索，性能非常之高，一般可以在 1 秒以内。

比如说你现在有一行数据。 `id,name,age ....` 30 个字段。但是你现在搜索，只需要根据 `id,name,age` 三个字段来搜索。如果你傻乎乎往 es 里写入一行数据所有的字段，就会导致说 `90%` 的数据是不用来搜索的，结果硬是占据了 es 机器上的 `filesystem cache` 的空间，单条数据的数据量越大，就会导致 `filesystem cahce` 能缓存的数据就越少。其实，仅仅写入 es 中要用来检索的**少数几个字段**就可以了，比如说就写入 es `id,name,age` 三个字段，然后你可以把其他的字段数据存在 mysql/hbase 里，我们一般是建议用 `es + hbase` 这么一个架构。

hbase 的特点是**适用于海量数据的在线存储**，就是对 hbase 可以写入海量数据，但是不要做复杂的搜索，做很简单的一些根据 id 或者范围进行查询的这么一个操作就可以了。从 es 中根据 name 和 age 去搜索，拿到的结果可能就 20 个 `doc id` ，然后根据 `doc id` 到 hbase 里去查询每个 `doc id` 对应的**完整的数据**，给查出来，再返回给前端。

写入 es 的数据最好小于等于，或者是略微大于 es 的 filesystem cache 的内存容量。然后你从 es 检索可能就花费 20ms，然后再根据 es 返回的 id 去 hbase 里查询，查 20 条数据，可能也就耗费个 30ms，可能你原来那么玩儿，1T 数据都放 es，会每次查询都是 5~10s，现在可能性能就会很高，每次查询就是 50ms。

### 数据预热

假如说，哪怕是你就按照上述的方案去做了，es 集群中每个机器写入的数据量还是超过了 `filesystem cache` 一倍，比如说你写入一台机器 60G 数据，结果 `filesystem cache` 就 30G，还是有 30G 数据留在了磁盘上。

其实可以做**数据预热**。

举个例子，拿微博来说，你可以把一些大 V，平时看的人很多的数据，你自己提前后台搞个系统，每隔一会儿，自己的后台系统去搜索一下热数据，刷到 `filesystem cache` 里去，后面用户实际上来看这个热数据的时候，他们就是直接从内存里搜索了，很快。

或者是电商，你可以将平时查看最多的一些商品，比如说 iphone 8，热数据提前后台搞个程序，每隔 1 分钟自己主动访问一次，刷到 `filesystem cache` 里去。

对于那些你觉得比较热的、经常会有人访问的数据，最好**做一个专门的缓存预热子系统**，就是对热数据每隔一段时间，就提前访问一下，让数据进入 `filesystem cache` 里面去。这样下次别人访问的时候，性能一定会好很多。

### 冷热分离

es 可以做类似于 mysql 的水平拆分，就是说将大量的访问很少、频率很低的数据，单独写一个索引，然后将访问很频繁的热数据单独写一个索引。最好是将**冷数据写入一个索引中，然后热数据写入另外一个索引中**，这样可以确保热数据在被预热之后，尽量都让他们留在 `filesystem os cache` 里，**别让冷数据给冲刷掉**。

你看，假设你有 6 台机器，2 个索引，一个放冷数据，一个放热数据，每个索引 3 个 shard。3 台机器放热数据 index，另外 3 台机器放冷数据 index。然后这样的话，你大量的时间是在访问热数据 index，热数据可能就占总数据量的 10%，此时数据量很少，几乎全都保留在 `filesystem cache` 里面了，就可以确保热数据的访问性能是很高的。但是对于冷数据而言，是在别的 index 里的，跟热数据 index 不在相同的机器上，大家互相之间都没什么联系了。如果有人访问冷数据，可能大量数据是在磁盘上的，此时性能差点，就 10% 的人去访问冷数据，90% 的人在访问热数据，也无所谓了。

### document 模型设计

对于 MySQL，我们经常有一些复杂的关联查询。在 es 里该怎么玩儿，es 里面的复杂的关联查询尽量别用，一旦用了性能一般都不太好。

最好是先在 Java 系统里就完成关联，将关联好的数据直接写入 es 中。搜索的时候，就不需要利用 es 的搜索语法来完成 join 之类的关联搜索了。

document 模型设计是非常重要的，很多操作，不要在搜索的时候才想去执行各种复杂的乱七八糟的操作。es 能支持的操作就那么多，不要考虑用 es 做一些它不好操作的事情。如果真的有那种操作，尽量在 document 模型设计的时候，写入的时候就完成。另外对于一些太复杂的操作，比如 join/nested/parent-child 搜索都要尽量避免，性能都很差的。

### 分页性能优化

es 的分页是较坑的，为啥呢？举个例子吧，假如你每页是 10 条数据，你现在要查询第 100 页，实际上是会把每个 shard 上存储的前 1000 条数据都查到一个协调节点上，如果你有个 5 个 shard，那么就有 5000 条数据，接着协调节点对这 5000 条数据进行一些合并、处理，再获取到最终第 100 页的 10 条数据。

分布式的，你要查第 100 页的 10 条数据，不可能说从 5 个 shard，每个 shard 就查 2 条数据，最后到协调节点合并成 10 条数据吧？你**必须**得从每个 shard 都查 1000 条数据过来，然后根据你的需求进行排序、筛选等等操作，最后再次分页，拿到里面第 100 页的数据。你翻页的时候，翻的越深，每个 shard 返回的数据就越多，而且协调节点处理的时间越长，非常坑爹。所以用 es 做分页的时候，你会发现越翻到后面，就越是慢。

我们之前也是遇到过这个问题，用 es 作分页，前几页就几十毫秒，翻到 10 页或者几十页的时候，基本上就要 5~10 秒才能查出来一页数据了。

有什么解决方案吗？

#### 不允许深度分页（默认深度分页性能很差）

跟产品经理说，你系统不允许翻那么深的页，默认翻的越深，性能就越差。

#### 类似于 app 里的推荐商品不断下拉出来一页一页的

类似于微博中，下拉刷微博，刷出来一页一页的，你可以用 `scroll api` ，关于如何使用，自行上网搜索。

scroll 会一次性给你生成**所有数据的一个快照**，然后每次滑动向后翻页就是通过**游标** `scroll_id` 移动，获取下一页下一页这样子，性能会比上面说的那种分页性能要高很多很多，基本上都是毫秒级的。

但是，唯一的一点就是，这个适合于那种类似微博下拉翻页的，**不能随意跳到任何一页的场景**。也就是说，你不能先进入第 10 页，然后去第 120 页，然后又回到第 58 页，不能随意乱跳页。所以现在很多产品，都是不允许你随意翻页的，app，也有一些网站，做的就是你只能往下拉，一页一页的翻。

初始化时必须指定 `scroll` 参数，告诉 es 要保存此次搜索的上下文多长时间。你需要确保用户不会持续不断翻页翻几个小时，否则可能因为超时而失败。

除了用 `scroll api` ，你也可以用 `search_after` 来做， `search_after` 的思想是使用前一页的结果来帮助检索下一页的数据，显然，这种方式也不允许你随意翻页，你只能一页页往后翻。初始化时，需要使用一个唯一值的字段作为 sort 字段。

**1.1、设计阶段调优**

（1）根据业务增量需求，采取基于日期模板创建索引，通过 roll over API 滚动索引；

（2）使用别名进行索引管理；

（3）每天凌晨定时对索引做 force_merge 操作，以释放空间；

（4）采取冷热分离机制，热数据存储到 SSD，提高检索效率；冷数据定期进行 shrink 操作，以缩减存储；

（5）采取 curator 进行索引的生命周期管理；

（6）仅针对需要分词的字段，合理的设置分词器；

（7）Mapping 阶段充分结合各个字段的属性，是否需要检索、是否需要存储等。……..

**1.2、写入调优**

（1）写入前副本数设置为 0；

（2）写入前关闭 refresh_interval 设置为-1，禁用刷新机制；

（3）写入过程中：采取 bulk 批量写入；

（4）写入后恢复副本数和刷新间隔；

（5）尽量使用自动生成的 id。

1.3、查询调优

（1）禁用 wildcard；

（2）禁用批量 terms（成百上千的场景）；

（3）充分利用倒排索引机制，能 keyword 类型尽量 keyword；

（4）数据量大时候，可以先基于时间敲定索引再检索；

（5）设置合理的路由机制。

1.4、其他调优

部署调优，业务调优等。

上面的提及一部分，面试者就基本对你之前的实践或者运维经验有所评估了。

### 查询优化

### 服务器优化

#### Elasticsearch GC 需要注意什么？

- 倒排索引的词典需要常驻内存，无法 GC，需要监控 data node 上 segment memory(filesystem cache) 增长趋势。

- 各类缓存，field cache, filter cache, indexing cache, bulk queue 等等，要设置合理的大小，并且要应该根据最坏的情况来看 heap 是否够用，也就是各类缓存全部占满的时候，还有 heap 空间可以分配给其他任务吗？避免采用 clear cache 等“自欺欺人”的方式来释放内存。

- 避免返回大量结果集的搜索与聚合。确实需要大量拉取数据的场景，可以采用 scan & scroll api 来实现。

- cluster stats 驻留内存并无法水平扩展，超大规模集群可以考虑分拆成多个集群通过 tribe node 连接。

- 想知道 heap 够不够，必须结合实际应用场景，并对集群的 heap 使用情况做持续的监控。

- 根据监控数据理解内存需求，合理配置各类 circuit breaker，将内存溢出风险降低到最低

### 硬件优化

#### Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法

**知识点**

- 关闭缓存 swap;

- 堆内存设置为：Min（节点内存/2, 32GB）;

- 设置最大文件句柄数；

- 线程池+队列大小根据业务需要做调整；

- 磁盘存储 raid 方式——存储有条件使用 RAID10，增加单节点性能以及避免单节点存储故障。

### 综合优化

#### Elasticsearch 索引数据多，如何优化？

**知识点**

- **动态索引** - 如果单索引数据量过大，可以创建索引模板，并周期性创建新索引（举例来说，索引名为 blog_yyyyMMdd），实现数据的分解。
- **冷热数据分离** - 将一定范围（如：一周、一月等）的数据作为热数据，其他数据作为冷数据。针对冷数据，可以考虑定期 force_merge + shrink 进行压缩，以节省存储空间和检索效率。
- **分区再均衡** - Elasticsearch 集群可以动态根据节点数的变化，调整索引分片在集群上的分布。但需要注意的是，要提前合理规划好索引的分片数：分片数过少，则增加节点也无法水平扩展；分片数过多，影响 Elasticsearch 读写效率。

## 参考资料

- [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- https://www.turing.com/interview-questions/elasticsearch
- https://github.com/rkm-ravi94/awesome-devops-interview/blob/main/elasticsearch.md
