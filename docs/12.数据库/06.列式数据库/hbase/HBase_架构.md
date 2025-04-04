---
icon: logos:hbase
title: HBase 架构
date: 2020-07-24 06:52:07
categories:
  - 数据库
  - 列式数据库
  - hbase
tags:
  - 数据库
  - 列式数据库
  - 大数据
  - hbase
permalink: /pages/ed3d3fde/
---

# HBase 架构

> **_HBase 是一个在 HDFS 上开发的面向列的分布式数据库。_**

## HBase 存储架构

> 在 HBase 中，表被分割成多个更小的块然后分散的存储在不同的服务器上，这些小块叫做 Regions，存放 Regions 的地方叫做 RegionServer。Master 进程负责处理不同的 RegionServer 之间的 Region 的分发。

### 概览

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200612151239.png)

HBase 主要处理两种文件：预写日志（WAL）和实际数据文件 HFile。一个基本的流程是客户端首先联系 ZooKeeper 集群查找行键。上述过程是通过 ZooKeeper 获取欧含有 `-ROOT-` 的  region 服务器来完成的。通过含有 `-ROOT-` 的 region 服务器可以查询到含有 `.META.` 表中对应的 region 服务器名，其中包含请求的行键信息。这两种内容都会被缓存下来，并且只查询一次。最终，通过查询 .META. 服务器来获取客户端查询的行键数据所在 region 的服务器名。

### Region

HBase Table 中的所有行按照 `Row Key` 的字典序排列。HBase Table 根据 Row Key 的范围分片，每个分片叫做 `Region`。一个 `Region` 包含了在 start key 和 end key 之间的所有行。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/bigdata/hbase/1551165887616.png)

**HBase 支持自动分区**：每个表初始只有一个 `Region`，随着数据不断增加，`Region` 会不断增大，当增大到一个阀值的时候，`Region` 就会分裂为两个新的 `Region`。当 Table 中的行不断增多，就会有越来越多的 `Region`。

`Region` 是 HBase 中**分布式存储和负载均衡的最小单元**。这意味着不同的 `Region` 可以分布在不同的 `Region Server` 上。但一个 `Region` 是不会拆分到多个 Server 上的。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200601181219.png)

### Region Server

`Region` 只不过是表被拆分，并分布在 Region Server。

`Region Server` 运行在 HDFS 的 DataNode 上。它具有以下组件：

- **WAL(Write Ahead Log，预写日志)**：用于存储尚未进持久化存储的数据记录，以便在发生故障时进行恢复。如果写 WAL 失败了，那么修改数据的完整操作就是失败的。
  - 通常情况，每个 RegionServer 只有一个 WAL 实例。在 2.0 之前，WAL 的实现叫做 HLog
  - WAL 位于 `/hbase/WALs/` 目录下
  - 如果每个 RegionServer 只有一个 WAL，由于 HDFS 必须是连续的，导致必须写 WAL 连续的，然后出现性能问题。MultiWAL 可以让 RegionServer 同时写多个 WAL 并行的，通过 HDFS 底层的多管道，最终提升总的吞吐量，但是不会提升单个 Region 的吞吐量。
- **BlockCache**：**读缓存**。它将频繁读取的数据存储在内存中，如果存储不足，它将按照 `最近最少使用原则` 清除多余的数据。
- **MemStore**：**写缓存**。它存储尚未写入磁盘的新数据，并会在数据写入磁盘之前对其进行排序。每个 Region 上的每个列族都有一个 MemStore。
- **HFile**：**将行数据按照 Key/Values 的形式存储在文件系统上**。HFile 是 HBase 在 HDFS 中存储数据的格式，它包含多层的索引，这样在 HBase 检索数据的时候就不用完全的加载整个文件。HFile 存储的根目录默认为为 `/hbase`。索引的大小(keys 的大小，数据量的大小)影响 block 的大小，在大数据集的情况下，block 的大小设置为每个 RegionServer 1GB 也是常见的。
  - 起初，HFile 中并没有任何 Block，数据还存在于 MemStore 中。
  - Flush 发生时，创建 HFile Writer，第一个空的 Data Block 出现，初始化后的 Data Block 中为 Header 部分预留了空间，Header 部分用来存放一个 Data Block 的元数据信息。
  - 而后，位于 MemStore 中的 KeyValues 被一个个 append 到位于内存中的第一个 Data Block 中：

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/bigdata/hbase/1551166602999.png)

Region Server 存取一个子表时，会创建一个 Region 对象，然后对表的每个列族创建一个 `Store` 实例，每个 `Store` 会有 0 个或多个 `StoreFile` 与之对应，每个 `StoreFile` 则对应一个 `HFile`，HFile 就是实际存储在 HDFS 上的文件。

## HBase 系统架构

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/bigdata/hbase/1551164744748.png)

和 HDFS、YARN 一样，**HBase 也遵循 master / slave 架构**：

- HBase 有一个 master 节点。**master 节点负责协调管理 region server 节点**。
  - master 负责将 region 分配给 region server 节点；
  - master 负责恢复 region server 节点的故障。
- HBase 有多个 region server 节点。**region server 节点负责零个或多个 region 的管理并响应客户端的读写请求。region server 节点还负责 region 的划分并通知 master 节点有了新的子 region**。
- HBase 依赖 ZooKeeper 来实现故障恢复。

### Master Server

**Master Server 负责协调 Region Server**。具体职责如下：

- 为 Region Server 分配 Region ；
- 负责 Region Server 的负载均衡 ；
- 发现失效的 Region Server 并重新分配其上的 Region；
- GFS 上的垃圾文件回收；
- 处理 Schema 的更新请求。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/bigdata/hbase/1551166513572.png)

### Region Server

- Region Server 负责维护 Master Server 分配给它的 Region，并处理发送到 Region 上的 IO 请求；
- 当 Region 过大，Region Server 负责自动分区，并通知 Master Server 记录更新。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200612151602.png)

### ZooKeeper

**HBase 依赖 ZooKeeper 作为分布式协调服务来维护集群中的服务器状态**。Zookeeper 维护哪些服务器是活动的和可用的，并提供服务器故障通知。集群至少应该有 3 个节点。

ZooKeeper 的作用：

- 保证任何时候，集群中只有一个 Master；
- 存储所有 Region 的寻址入口；
- 实时监控 Region Server 的状态，将 Region Server 的上线和下线信息实时通知给 Master；
- 存储 HBase 的 Schema，包括有哪些 Table，每个 Table 有哪些 Column Family 等信息。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/bigdata/hbase/1551166447147.png)

以上，最重要的一点是 ZooKeeper 如何保证 HBase 集群中只有一个 Master Server 的呢？

- 所有 Master Server 会竞争 Zookeeper 的 znode 锁（一个临时节点），只有一个 Master Server 能够创建成功，此时该 Master 就是主 Master。
- 主 Master 会定期向 Zookeeper 发送心跳。从 Master 则通过 Watcher 机制对主 Master 所在节点进行监听。
- 如果，主 Master 未能及时发送心跳，则其持有的 ZooKeeper 会话会过期，相应的 znode 锁（一个临时节点）会被自动删除。这会触发定义在该节点上的 Watcher 事件，所有从 Master 会得到通知，并再次开始竞争 znode 锁，直到完成主 Master 的选举。

HBase 内部保留名为 hbase:meta 的特殊目录表（catalog table）。它维护着当前集群上所有 region 的列表、状态和位置。hbase:meta 表中的项使用 region 作为键。region 名由所属的表名、region 的起始行、region的创建时间以及基于整体计算得出的 MD5 组成。

## HBase 读写流程

### 写入数据的流程

1. Client 向 Region Server 提交写请求；
2. Region Server 找到目标 Region；
3. Region 检查数据是否与 Schema 一致；
4. 如果客户端没有指定版本，则获取当前系统时间作为数据版本；
5. 将更新写入 WAL Log；
6. 将更新写入 Memstore；
7. 判断 Memstore 存储是否已满，如果存储已满则需要 flush 为 Store Hfile 文件。

> 更为详细写入流程可以参考：[HBase － 数据写入流程解析](http://hbasefly.com/2016/03/23/hbase_writer/)

### 读取数据的流程

以下是客户端首次读写 HBase 上数据的流程：

1. 客户端从 Zookeeper 获取 `META` 表所在的 Region Server；
2. 客户端访问 `META` 表所在的 Region Server，从 `META` 表中查询到访问行键所在的 Region Server，之后客户端将缓存这些信息以及 `META` 表的位置；
3. 客户端从行键所在的 Region Server 上获取数据。

如果再次读取，客户端将从缓存中获取行键所在的 Region Server。这样客户端就不需要再次查询 `META` 表，除非 Region 移动导致缓存失效，这样的话，则将会重新查询并更新缓存。

注：`META` 表是 HBase 中一张特殊的表，它保存了所有 Region 的位置信息，META 表自己的位置信息则存储在 ZooKeeper 上。

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200601182655.png)

> 更为详细读取数据流程参考：
>
> [HBase 原理－数据读取流程解析](http://hbasefly.com/2016/12/21/hbase-getorscan/)
>
> [HBase 原理－迟到的‘数据读取流程部分细节](http://hbasefly.com/2017/06/11/hbase-scan-2/)

## 参考资料

- **官方**
  - [HBase 官网](http://hbase.apache.org/)
  - [HBase 官方文档](https://hbase.apache.org/book.html)
  - [HBase 官方文档中文版](http://abloz.com/hbase/book.html)
  - [HBase API](https://hbase.apache.org/apidocs/index.html)
- **教程**
  - [BigData-Notes](https://github.com/heibaiying/BigData-Notes)
- **文章**
  - [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/bigtable-osdi06.pdf)
  - [An In-Depth Look at the HBase Architecture](https://mapr.com/blog/in-depth-look-hbase-architecture/)
  - [入门 HBase，看这一篇就够了](https://juejin.im/post/5c666cc4f265da2da53eb714)
  - https://bighadoop.wordpress.com/tag/hbase/
