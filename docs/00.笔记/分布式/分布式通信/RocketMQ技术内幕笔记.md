---
title: 《RocketMQ 技术内幕》笔记
date: 2022-07-12 16:58:58
categories:
  - 笔记
  - 分布式
  - 分布式通信
tags:
  - 分布式
  - 通信
  - MQ
  - RocketMQ
permalink: /pages/d862eca8/
---

# 《RocketMQ 技术内幕》笔记

## 读源代码前的准备

### 源代码目录结构

- `broker`：Broker 模块（Broker 启动进程）
- `client`：消息客户端（生产者、消费者）
- `common`：公共包
- `namesrv`：NameServer 实现（NameServer 启动进程）
- `remoting`：远程通信模块（基于 Netty）
- `store`：消息存储实现
- `tools`：工具类、监控命令

### 设计理念

- 自研 **NameServer** 替代 ZooKeeper（ZK 的 CP 模型不适合注册中心）
- 消息存储文件组概念，固定大小，顺序写 + 内存映射，引入消费队列和索引文件
- **允许消息重复消费**，简化内核设计，幂等由消费者实现

### 设计目标

- **顺序消息**：严格按到达顺序消费
- **消息过滤**：支持 Broker 端和消费端过滤
- **消息存储高性能**：内存映射 + 顺序写，支持过期机制（默认 3 天）
- **消息高可用**：同步刷盘不丢消息，异步复制减少单点故障损失
- **低延迟推送**：长轮询模式实现准实时推送
- **消息回溯**：按时间精确回溯（毫秒级）
- **定时消息**：支持特定延迟级别（非任意精度）
- **消息重试**：消费异常时支持重新投递

## NameServer 路由中心

### 架构设计

- Broker 启动时向所有 NameServer 注册
- Producer 发送前从 NameServer 获取 Broker 地址列表，按负载算法选择
- NameServer 与 Broker 保持长连接，间隔 30s 检测存活
- 路由变化不主动通知 Producer（降低复杂性，由发送端容错保证高可用）
- **多 NameServer 互不通信**，某一时刻数据不完全一致，但不影响消息发送

### 启动流程

1. 加载配置，初始化 `NamesrvController`（核心控制器）
2. 创建 `NettyRemotingServer` 网络处理对象
3. 开启定时任务：每 10s 扫描不活跃 Broker 并移除、每 10min 打印 KV 配置
4. 注册 JVM 钩子函数，优雅停机

### 路由元信息

核心实现类 `RouteInfoManager`，存储：

- `topicQueueTable`：Topic 消息队列路由信息
- `brokerAddrTable`：Broker 基础信息（brokerName、集群名、主备地址）
- `clusterAddrTable`：Broker 集群信息
- `brokerLiveTable`：Broker 状态信息（`lastUpdateTimestamp`）
- `filterServerTable`：Broker 上的 FilterServer 列表

### 路由注册

通过 Broker 与 NameServer 心跳实现：

- Broker 启动时向所有 NameServer 发送心跳
- 每隔 30s 发送心跳包
- NameServer 收到心跳更新 `brokerLiveTable`
- NameServer 每 10s 扫描，**连续 120s 无心跳则移除 Broker**

注册流程：加写锁 → 判断/创建集群 → 维护 BrokerData → 创建/更新 Topic 路由 → 更新 BrokerLiveInfo → 注册 FilterServer

设计亮点：使用**读写锁**，允许多 Producer 并发读，同一时刻只处理一个 Broker 心跳。

### 路由删除

两种触发：

1. NameServer 定时扫描 `brokerLiveTable`（120s 超时）
2. Broker 正常关闭时执行 `unregisterBroker`

删除流程：加写锁 → 从 `brokerLiveTable`/`filterServerTable` 移除 → 维护 `brokerAddrTable` → 从 `clusterAddrTable` 移除 → 遍历所有 Topic 队列移除

### 路由发现

**非实时**：路由变化后 NameServer 不主动推送，由客户端定时拉取（命令编码 `GET_ROUTEINTO_BY_TOPIC`）。

返回数据：顺序消息配置（`orderTopicConf`）、队列元数据（`List<QueueData>`）、Broker 元数据（`List<BrokerData>`）、FilterServer 地址列表。

## RocketMQ 消息发送

### 发送方式

- **同步（sync）**：等待 Broker 返回结果
- **异步（async）**：指定回调函数，立即返回
- **单向（oneway）**：不等待结果，不注册回调

需考虑：消息队列负载均衡、发送高可用、批量消息一致性。

### 消息结构

封装类 `org.apache.rocketmq.common.message.Message`：

- `topic`：主题
- `properties`：属性容器（`tags` 标签、`keys` 索引、`waitStoreMsgOK`、`delayTimeLevel`）
- `body`：消息体
- `transactionId`：事务 ID

### 生产者启动流程

`DefaultMQProducer` 核心方法：

- `send(Message)`：同步发送
- `send(Message, SendCallback)`：异步发送
- `sendOneway(Message)`：单向发送
- `send(Message, MessageQueue)`：发送到指定队列
- `send(Collection<Message>, MessageQueue)`：批量发送

核心属性：

- `producerGroup`：生产者组（事务回查时随机选择组内 Producer）
- `sendMsgTimeout`：默认 3s
- `retryTimesWhenSendFailed`：同步重试次数，默认 2（共 3 次）
- `maxMessageSize`：最大 4M

启动流程（`DefaultMQProducerImpl#start()`）：

1. 检查 `producerGroup`，改 `instanceName` 为进程 ID
2. 获取/创建 `MQClientInstance`（单例，同 `clientId` 只创建一个）
3. 注册当前生产者到 `MQClientInstance`
4. 启动 `MQClientInstance`（已启动则跳过）
5. 向所有 Broker 发送心跳
6. 启动定时任务清理过时发送请求

### 消息发送流程

核心方法：`DefaultMQProducerImpl#sendDefaultImpl`

1. **验证消息**：主题名、消息体非空，长度 ≤ 4M
2. **查找路由信息**（`tryToFindTopicPublishInfo`）：缓存命中则直接返回，否则向 NameServer 查询
3. **选择 Broker**
4. **发送消息**

`TopicPublishInfo` 关键属性：

- `orderTopic`：是否顺序消息
- `messageQueueList`：Topic 消息队列列表
- `sendWhichQueue`：队列选择计数器（每次选择自增）

## RocketMQ 消息存储

## RocketMQ 消息消费

## 消息过滤 FilterServer

## RocketMQ 主从同步

## RocketMQ 事务消息

## RocketMQ 实战

## 参考资料

- [RocketMQ 技术内幕](https://book.douban.com/subject/35626441/)
