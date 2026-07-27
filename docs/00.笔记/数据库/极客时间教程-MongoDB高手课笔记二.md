---
icon: logos:mongodb
title: 《极客时间教程 - MongoDB 高手课》笔记二
date: 2024-10-17 07:19:53
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 文档数据库
  - MongoDB
permalink: /pages/e28fc1b0/
---

# 《极客时间教程 - MongoDB 高手课》笔记二

[极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001) 学习笔记

<!-- more -->

## 第三章：分片集群与高级运维之道

### 分片集群机制及原理

**为什么使用分片**：分而治之，解决单机资源瓶颈

**分片组件**：

- **mongos**（路由节点）：集群单一入口，转发请求，无状态，建议至少 2 个
- **config**（配置节点）：存储集群元数据、分片数据分布映射
- **shard**（数据节点）：以复制集为单位水平扩展，最大 1024 分片，分片间数据不重复

**分片特点**：

- 应用全透明，数据自动均衡，动态扩容无须下线
- 三种分片方式：
  - **基于范围**：范围查询性能好，但数据分布不均，易热点
  - **基于 Hash**：数据分布均匀，但范围查询效率低
  - **基于 zone/tag**

### 分片集群设计

**分片基本标准**：

- 数据量不超过 3TB，尽可能保持在 2TB 一个片
- 常用索引必须容纳进内存

**分片数量计算**：

- `A = 所需存储总量 / 单服务器容量`
- `B = 工作集大小 / 单服务器内存`
- `C = 并发量总数 / (单服务器并发量 * 0.7)`
- **分片数量 = max(A, B, C)**

**关键概念**：片键(shard key) → 文档(doc) → 块(Chunk) → 分片(Shard) → 集群(Cluster)

**片键选择原则**：

- 取值基数要大，便于水平扩展
- 取值分布尽可能均匀，避免热点
- 分散写，集中读
- 被尽可能多的业务场景用到
- 避免单调递增/递减的片键

**资源规划**：

- mongos/config 资源消耗少，可用低规格虚拟机
- shard 需要足够内存容纳热数据索引，磁盘尽量用 SSD

### 实验：分片集群搭建及扩容（略）

### MongoDB 监控最佳实践

**监控工具**：MongoDB Ops Manager、Percona、通用监控平台、程序脚本

**监控信息来源**：`db.serverStatus()`（主要）、`db.isMaster()`、`mongostats`

> 注意：`db.serverStatus()` 是累计数据，不能简单使用

**serverStatus() 主要信息**：

- `connections`：连接数
- `locks`：锁情况
- `network`：网络统计
- `opcounters`：CRUD 执行次数
- `wiredTiger`：存储引擎执行情况（block-manager、session、concurrentTransactions）
- `mem`：内存使用
- `metrics`：性能指标统计

监控报警的考量

- 具备一定的容错机制以减少误报的发生；
- 总结应用各指标峰值；
- 适时调整报警阈值；
- 留出足够的处理时间；

建议监控指标

| 指标                          | 意义                                                                                                                                                      | 获取                                                                                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opcounters（操作计数器）      | 查询、更新、插入、删除、getmore 和其他命令的的数量。                                                                                                      | `db.serverStatus().opcounters`                                                                                                                                                        |
| tickets（令牌）               | 对 WiredTiger 存储引擎的读/写令牌数量。令牌数量表示了可以进入存储引擎的并发操作数量。                                                                     | `db.serverStatus().wiredTiger.concurrentTransactions`                                                                                                                                 |
| replication lag（复制延迟）   | 这个指标代表了写操作到达从结点所需要的最小时间。过高的 replication lag 会减小从结点的价值并且不利于配置了写关                                             | `db.adminCommand({'replSetGetStatus': 1})`                                                                                                                                            |
| oplog window（复制时间窗）    | 这个指标代表 oplog 可以容纳多长时间的写操作。它表示了一个从结点可以离线多长时间仍能够追上主节点。通常建议该值应大于 24 小时为佳。                         | `db.oplog.rs.find().sort({$natural: -1}).limit(1).next().ts -db.oplog.rs.find().sort({$natural: 1}).limit(1).next().ts`                                                               |
| connections（连接数）         | 连接数应作为监控指标的一部分，因为每个连接都将消耗资源。应该计算低峰/正常/高峰时间的连接数，并制定合理的报警阈值范围。                                    | `db.serverStatus().connections`                                                                                                                                                       |
| Query targeting（查询专注度） | 索引键/文档扫描数量比返回的文档数量，按秒平均。如果该值比较高表示查询系需要进行很多低效的扫描来满足查询。这个情况通常代表了索引不当或缺少索引来支持查询。 | `var status = db.serverStatus()status.metrics.queryExecutor.scanned / status.metrics.document.returnedstatus.metrics.queryExecutor.scannedObjects / status.metrics.document.returned` |
| Scan and Order（扫描和排序）  | 每秒内内存排序操作所占的平均比例。内存排序可能会十分昂贵，因为它们通常要求缓冲大量数据。如果有适当索引的情况下，内存排序是可以避免的。                    | `var status = db.serverStatus()status.metrics.operation.scanAndOrder / status.opcounters.query`                                                                                       |
| 节点状态                      | 每个节点的运行状态。如果节点状态不是 PRIMARY、SECONDARY、ARBITER 中的一个，或无法执行上述命令则报警                                                       | `db.runCommand("isMaster")`                                                                                                                                                           |
| dataSize（数据大小）          | 整个实例数据总量（压缩前）                                                                                                                                | 每个 DB 执行 db.stats()；                                                                                                                                                             |
| StorageSize（磁盘空间大小）   | 已使用的磁盘空间占总空间的百分比。                                                                                                                        |                                                                                                                                                                                       |

### MongoDB 备份与恢复

**备份机制**：

- **延迟节点备份**：任意时间点状态 = 延迟从节点 + 重放 oplog
- **全量 + Oplog 增量**：全量备份 + oplog = 任意时间点恢复（PIT）

**全量备份方式**：mongodump、复制数据文件、文件系统快照

**注意事项**：

- 复制文件必须先关闭节点或 `db.fsyncLock()`，完成后 `db.fsyncUnlock()`
- 文件系统快照无须停机，但数据文件和 Journal 必须在同一卷上
- mongodump 最灵活但最慢，备份数据不代表某个时间点

### 备份与恢复操作（略）

### MongoDB 安全架构（略）

### MongoDB 安全加固实践（略）

### MongoDB 索引机制

**数据结构**：B-树

**索引类型**：单键、组合、多值、地理位置、全文、TTL、部分、哈希

**组合索引最佳方式：ESR 原则**

- **E**qual（精确匹配）放最前
- **S**ort（排序条件）放中间
- **R**ange（范围匹配）放最后

### MongoDB 索引机制（二）

### MongoDB 读写性能机制

#### 读操作节点选择

由 `readPreference` 决定：`primary` / `primaryPreferred` / `secondary` / `secondaryPreferred` / `nearest`

避免选择远距离节点：设置为隐藏节点、通过标签(Tag)控制、使用 nearest

#### 性能诊断

- **mongostat**：了解 MongoDB 运行状态
- **mongotop**：了解集合压力状态
- **mongod 日志**：记录执行超过 100ms 的查询及其执行计划

> 不能命中索引的搜索和内存排序是导致性能问题的最主要原因

### 高级集群设计：两地三中心

**容灾级别**：

- 无备源中心：无灾难恢复能力
- 本地备份 + 异地保存
- 双中心主备：异地热备份
- 双中心双活：相互数据备份
- **两地三中心**：同城双中心 + 异地热备

**多数据中心要点**：

- 主节点故障 → 主数据中心内自动切换（5-10秒）
- 主数据中心不可用 → 从节点升级为主节点（5-30秒）
- 节点数量建议 **5 个（2+2+1 模式）**
- 同城双中心需低延迟专线，满足 `writeConcern: Majority` 双中心写需求
- 使用 **Retryable Writes and Reads** 保证零下线时间

### 实验：搭建两地三中心集群（略）

### 高级集群设计：全球多写（略）

### MongoDB 上线及升级（略）

## 第四章：企业架构师进阶之法（略）

## 参考资料

- [极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001)
