---
title: 《Kafka 核心源码解读》笔记
date: 2022-07-03 14:53:05
categories:
  - 笔记
  - 分布式
  - 分布式通信
tags:
  - 分布式
  - 通信
  - MQ
  - Kafka
permalink: /pages/3e806bd1/
---

# 《Kafka 核心源码解读》笔记

## 开篇词

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/b3c5274fa1d94d798c672c9152b1e4e4.png)

Kafka 源码四大模块：

- **服务器端源码**：实现架构和特性
- **Java 客户端源码**：与 Broker 交互机制
- **Connect 源码**：与外部系统的数据传输
- **Streams 源码**：实时流处理

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/2f71521f617f418392552cab6a7c815a.png)

## 导读

项目核心目录：`bin`（工具脚本）、`clients`（客户端）、`config`（配置）、`connect`、`core`（Broker 端）、`streams`。

## 日志段

### Kafka 日志结构

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/2bb9f2d94eef4d279c2943df630916b3.png)

日志对象由多个日志段组成，每个日志段包含一组文件：

- **消息日志文件（.log）**
- **位移索引文件（.index）**
- **时间戳索引文件（.timeindex）**
- **事务索引文件（.txnindex）**

一个主题分区对应一个 `Log` 对象，物理上对应一个子目录（如 `test-topic-0`）。

### 日志段源码解析

源码位于 `LogSegment.scala`，定义三个对象：`LogSegment class`、`LogSegment object`（工具类）、`LogFlushStats object`（计时统计）。

#### LogSegment class 声明

```scala
class LogSegment private[log] (val log: FileRecords,
                               val lazyOffsetIndex: LazyIndex[OffsetIndex],
                               val lazyTimeIndex: LazyIndex[TimeIndex],
                               val txnIndex: TransactionIndex,
                               val baseOffset: Long,
                               val indexIntervalBytes: Int,
                               val rollJitterMs: Long,
                               val time: Time) extends Logging { ... }
```

关键参数：

- `log`：消息文件记录（`FileRecords`）
- `lazyOffsetIndex` / `lazyTimeIndex`：偏移量索引 / 时间戳索引
- `baseOffset`：段内偏移量下限（磁盘文件名即此值，创建后不可更改）
- `indexIntervalBytes`：索引条目间隔字节数（对应 `log.index.interval.bytes`，默认 4KB）
- `rollJitterMs`：新增倒计时扰动值，避免同时创建多个日志段造成磁盘 I/O 压力

#### append 方法

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/07a6fc91bf6c4c9bb43dce115cf84429.png)

流程：判断日志段是否为空 → 验证位移合法性 → 写入消息到页缓存 → 更新最大时间戳 → 条件写入索引项（每 4KB 写一条）

#### read 方法

入参：`startOffset`、`maxSize`、`maxPosition`、`minOneMessage`。

流程：`translateOffset` 定位物理位置 → 计算读取字节数 → `FileRecords.slice` 读取消息集合。

#### recover 方法

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/e47f0686d2be4f6e917e6fbcb30b22ad.png)

流程：清空索引 → 遍历所有消息批次并校验 → 更新最大时间戳 → 有条件写入索引 → 更新事务 Producer 状态 → 截断非法消息。

## 日志

日志是日志段的容器，定义管理日志段的操作。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/ed7acc3fee324990bc188b272cc14fe2.png)

### Log 源码结构

核心对象：

- `UnifiedLog`（C/O）：最核心代码
- `LogAppendInfo`（C/O）：消息元数据
- `RollParams`：控制日志段切分
- `LogOffsetSnapshot`：位移元数据容器
- `LogReadInfo`：读取返回数据
- `CompletedTxn`：已完成事务元数据

### Log Class & Object

Log Object 定义文件类型：`.log`、`.index`、`.timeindex`、`.txnindex`、`.snapshot`、`.deleted`、`.cleaned`、`.swap`。

```scala
class UnifiedLog(@volatile var logStartOffset: Long,
                 private val localLog: LocalLog,
                 brokerTopicStats: BrokerTopicStats,
                 val producerIdExpirationCheckIntervalMs: Int,
                 @volatile var leaderEpochCache: Option[LeaderEpochFileCache],
                 val producerStateManager: ProducerStateManager,
                 @volatile private var _topicId: Option[Uuid],
                 val keepPartitionMetadataFile: Boolean) extends Logging with KafkaMetricsGroup { ... }
```

关键属性：

- `_dir`：主题分区的文件夹路径
- `logStartOffset`：日志当前对外可见的最早消息位移（volatile）
- `segments`：所有日志段信息（`ConcurrentNavigableMap`），是**最重要的属性**
- `nextOffsetMetadata`：约等于 LEO

**LEO**（Log End Offset）：下一条待插入消息位移。**Log Start Offset**：最早可见消息位移。高水位在两者之间。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/013f6e74c9a940dc8c1dac7a60c7fea3.png)

### Log 类初始化逻辑

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/2f89e4fb033c45c1a70596fdc78905fd.png)

### Log 的常见操作

四类操作：**高水位管理**、**日志段管理**、**关键位移值管理**、**读写操作**。

#### 高水位管理操作

```scala
@volatile private var highWatermarkMetadata: LogOffsetMetadata = LogOffsetMetadata(logStartOffset)
```

高水位值是 volatile 的，使用 Java Monitor 锁保证并发安全。初始值为 Log Start Offset。

`LogOffsetMetadata` 三个参数：

- `messageOffset`：消息位移值（高水位值即此值）
- `segmentBaseOffset`：所在日志段起始位移（判断两条消息是否同一日志段）
- `relativePositionInSegment`：段内物理位置（读取时计算字节数）

##### 获取和设置高水位值

```scala
  private def updateHighWatermarkMetadata(newHighWatermark: LogOffsetMetadata): Unit = {
    if (newHighWatermark.messageOffset < 0)
      throw new IllegalArgumentException("High watermark offset should be non-negative")
    lock synchronized {
      highWatermarkMetadata = newHighWatermark
      producerStateManager.onHighWatermarkUpdated(newHighWatermark.messageOffset)
      maybeIncrementFirstUnstableOffset()
    }
    trace(s"Setting high watermark $newHighWatermark")
  }
```

##### 更新高水位值

```scala
  def updateHighWatermark(hw: Long): Long = {
    val newHighWatermark = if (hw < logStartOffset)
      logStartOffset
    else if (hw > logEndOffset)
      logEndOffset
    else
      hw
    updateHighWatermarkMetadata(LogOffsetMetadata(newHighWatermark))
    newHighWatermark
  }

  def maybeIncrementHighWatermark(newHighWatermark: LogOffsetMetadata): Option[LogOffsetMetadata] = {
    if (newHighWatermark.messageOffset > logEndOffset)
      throw new IllegalArgumentException(s"High watermark $newHighWatermark update exceeds current " +
        s"log end offset $logEndOffsetMetadata")
    lock.synchronized {
      val oldHighWatermark = fetchHighWatermarkMetadata
      if (oldHighWatermark.messageOffset < newHighWatermark.messageOffset ||
        (oldHighWatermark.messageOffset == newHighWatermark.messageOffset && oldHighWatermark.onOlderSegment(newHighWatermark))) {
        updateHighWatermarkMetadata(newHighWatermark)
        Some(oldHighWatermark)
      } else {
        None
      }
    }
  }
```

- `updateHighWatermark`：Follower 从 Leader 获取消息后更新
- `maybeIncrementHighWatermark`：Leader 副本高水位更新（有条件）

##### 读取高水位值

```scala
  private def fetchHighWatermarkMetadata: LogOffsetMetadata = {
    checkIfMemoryMappedBufferClosed()
    val offsetMetadata = highWatermarkMetadata
    if (offsetMetadata.messageOffsetOnly) {
      lock.synchronized {
        val fullOffset = convertToOffsetMetadataOrThrow(highWatermark)
        updateHighWatermarkMetadata(fullOffset)
        fullOffset
      }
    } else {
      offsetMetadata
    }
  }
```

#### 日志段管理

- **添加**：`segments.put(segment.baseOffset, segment)`
- **删除**：根据时间/大小/Log Start Offset 条件删除旧段
- **修改**：用新段替换旧段
- **查询**：利用 `ConcurrentSkipListMap` 方法（firstEntry、lastEntry、higherEntry、floorEntry）

#### 关键位移值管理

**LEO 更新时机**：对象初始化、写入新消息、日志切分、日志截断。

**Log Start Offset 更新时机**：对象初始化、日志截断、Follower 同步、删除日志段、删除消息。

#### 读写操作

写操作流程：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/fbff8487445d420aaa6792c1236a67a8.png)

读操作参数：`startOffset`、`maxLength`、`isolation`（读取隔离级别）、`minOneMessage`。

## 索引

### 索引类图及源文件组织架构

- **AbstractIndex**：顶层抽象类，封装公共操作
- **LazyIndex**：包装类，实现延迟加载
- **OffsetIndex**：位移索引（<位移值, 物理位置>）
- **TimeIndex**：时间戳索引（<时间戳, 位移值>）
- **TransactionIndex**：事务索引（已中止事务元数据）

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/07/797c74ceac494e9fb4bb66d342956ab4.png)

### AbstractIndex 核心属性

- `file`：索引文件（var 型，支持路径迁移）
- `baseOffset`：对应日志段起始位移
- `maxIndexSize`：最大字节数（默认 10MB，由 `segment.index.bytes` 控制）
- `writable`：打开方式（读写/只读）

### 位移索引

Key = 消息的相对位移，Value = 消息在日志段文件中的物理位置。

## 参考资料

- [Kafka 核心源码解读](https://time.geekbang.org/column/intro/304)
