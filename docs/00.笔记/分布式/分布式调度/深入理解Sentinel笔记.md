---
title: 《深入理解 Sentinel》笔记
date: 2024-05-27 06:58:23
order: 1
categories:
  - 笔记
  - 分布式
  - 分布式调度
tags:
  - 分布式
  - 调度
  - 限流
  - 熔断
  - 降级
  - Sentinel
permalink: /pages/f7d4ff23/
---

# 《深入理解 Sentinel》笔记

## 开篇词：一次服务雪崩问题排查经历

**服务雪崩**：微服务中突发流量导致某个服务不可用 → 上游服务不可用 → 级联效应 → 整个系统不可用。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/01/3ed28b9b8d59421ca0aba8e03daa3315.png)

当依赖服务（如 QPS 为 50 的依赖 I）不可用时，上游请求被阻塞，级联故障愈演愈烈。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/01/f728fc0f29554541984e63189f5e84f3.png)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/7b5ae09432714c1a91dc2acd21d06f32.png)

## 为什么需要服务降级

**服务降级**：牺牲部分流量换取系统稳定运行的保护方式。

三种实现方式：

- **开关降级**：适用于促销等可预估流量突增场景
- **限流降级**：达到阈值即触发，即使未到系统瓶颈
- **熔断降级**：尽量完成请求，容忍失败，可自动恢复

熔断触发策略：

- 每秒请求异常数超过阈值
- 每秒请求异常错误率超过阈值
- 每秒请求平均耗时超过阈值

## Sentinel vs Hystrix

| 特性 | Sentinel | Hystrix |
| --- | --- | --- |
| 社区活跃度 | 活跃（13K+ star） | 官方停止维护 |
| 隔离策略 | 信号量隔离 | 线程池/信号量隔离 |
| 熔断策略 | 基于响应时间或失败比率 | 基于失败比率 |
| 实时指标 | 滑动窗口 | 滑动窗口（RxJava） |
| 限流 | 基于 QPS，支持调用关系限流 | 有限支持 |
| 流量整形 | 慢启动、匀速器模式 | 不支持 |
| 系统负载保护 | 支持 | 不支持 |
| 控制台 | 开箱即用 | 不完善 |

## 滑动窗口实时指标数据统计

- **WindowWrap**：包装 Bucket，记录时间窗口信息
- **Bucket**：负责统计各项指标数据
- WindowWrap 数组实现**滑动窗口**，定位 Bucket 实际是定位 WindowWrap

## 核心概念与类

### 概念

- **资源**：Sentinel 的关键概念（方法、代码段、接口等）
- **规则**：围绕资源设定的规则（流量控制、熔断降级、系统保护）
- **降级**：根据资源状态有策略地拒绝部分流量

### 核心类

- `ResourceWrapper`：表示资源
- `Node`：持有实时统计指标数据
  - `StatisticNode`：实现实时指标数据统计
  - `DefaultNode`：以资源为维度的指标统计
  - `ClusterNode`：全局指标统计 + 按调用来源区分
  - `EntranceNode`：维护调用树，从根到叶子为不同请求调用链路
- `Context`：调用链路上下文（ThreadLocal 传递），维持入口节点、curNode、调用来源
- `Entry`：维护当前资源的 DefaultNode + 调用来源的 StatisticNode
- `ProcessorSlot`：Sentinel 实现限流/降级的切入点
  - **指标统计类**：NodeSelectorSlot、StatisticSlot 等
  - **降级功能类**：`AuthoritySlot`（黑白名单）、`SystemSlot`（系统自适应）、`FlowSlot`（限流）、`DegradeSlot`（熔断）

## 责任链模式与整体工作流

Sentinel 使用**责任链模式**将 ProcessorSlot 串成单向链表（`ProcessorSlotChain`），由 `SlotChainBuilder` 构造。

## SPI 在 Sentinel 中的应用

SPI（Service Provider Interface）本质：将接口实现类全限定名配置在文件中，运行时动态替换实现类。

`sentinel-core` 的 `META-INF/services/` 下配置 `SlotChainBuilder` 接口实现类。

## 资源指标数据统计（上）

`NodeSelectorSlot` 负责为资源首次访问创建 DefaultNode、维护调用树，位于 ProcessorSlotChain **第一个位置**（后续 Slot 依赖它）。

## 资源指标数据统计（下）

关键规则：

- 一个调用链路只创建一个 **Context**（在入口创建）
- 一个 Context 名称只创建一个 **EntranceNode**
- `SphU#entry` 调用深度对应 `CtEntry` 双向链表层级
- 相同资源名只创建一个 **DefaultNode**（作为前一个 DefaultNode 的子节点）
- 一个资源有且只有一个 **ProcessorSlotChain** 和一个 **ClusterNode**
- `StatisticSlot` 同时向 DefaultNode（同 Context 维度）和 ClusterNode（全局维度）收集指标

## 限流降级与流量效果控制器

## 熔断降级与系统自适应限流

## 黑白名单限流与热点参数限流

## 自定义 ProcessorSlot 实现开关降级

## Sentinel 动态数据源：规则动态配置

## Sentinel 主流框架适配

## Sentinel 集群限流

## Sentinel 对应用的性能影响

## Sentinel 1.8.0 熔断降级新特性

## 资料

https://wujiuye.com/album/52c96863a60441829497e98226e2c337
