---
title: "《HBase: A NoSQL database》笔记"
date: 2023-09-05 19:52:01
order: 01
categories:
  - 笔记
  - 分布式
  - 分布式存储
tags:
  - 分布式
  - 分布式存储
  - HBASE
permalink: /pages/d4b89677/
---

# 《HBase: A NoSQL database》笔记

## 简介

HBase 是 Java 版 Google BigTable 的开源实现，基于 HDFS 构建，现为 Apache 顶级项目。

设计目标：存储**大规模数据集**。**列式数据库**，适合存储稀疏数据（宽表）。

## HBase 关键特性

- 水平扩展、分区容错性
- 支持并行处理、HDFS 和 MapReduce
- 近实时查询
- 大规模数据集 + 稀疏型数据存储
- 表的动态负载均衡
- 块缓存和布隆过滤器

## HBase 数据结构和架构

HBase 表由**行、列族、列、时间戳**组成，可被分成多个分区（定义起始/结束 key），存储于 HDFS 文件中。可作为 MapReduce 任务的输入/输出对象。

### 架构组成

- **Master Server**：
  - 借助 ZooKeeper 为分区分配 Region Server，控制负载均衡
  - 负责 Schema 变更
  - 管理和监控集群

- **Region Server**：
  - 处理客户端 CRUD 操作
  - 运行在 HDFS 数据节点上
  - 四个核心组件：**Block Cache**（读缓存）、**MemStore**（写缓存）、**WAL**、**HFile**（行数据，KV 结构）

- **ZooKeeper**：
  - Region Server 宕机恢复协调
  - 维护 Master/Region Server 注册元数据
  - 追踪服务器错误

## HBase 和大数据

HBase 属于 Hadoop 生态重要一环，广泛用于大数据领域。近年面临 MongoDB、Cassandra 的竞争。

## HBase 应用

Facebook 消息平台使用 HBase 存储数据（每月约 13.5 亿条信息）。

## 挑战和限制

- **主从架构**：Master Server 不可用时恢复时间长
- **不支持二级索引**

## 参考资料

- [HBase: A NoSQL Database](https://www.researchgate.net/publication/317399857_HBase_A_NoSQL_Database)
