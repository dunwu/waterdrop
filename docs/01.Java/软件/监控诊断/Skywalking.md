---
title: SkyWalking 快速入门
date: 2020-02-07 23:04:47
order: 04
categories:
  - Java
  - 软件
  - 监控诊断
tags:
  - Java
  - 监控
  - SkyWalking
permalink: /pages/20fec4cd/
---

# SkyWalking 快速入门

SkyWalking 是一个基于 Java 开发的分布式系统的应用程序性能监视工具，专为微服务、云原生架构和基于容器（Docker、K8s、Mesos）架构而设计。

## 一、SkyWalking 简介

SkyWalking 是观察性分析平台和应用性能管理系统。

提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/02/d011d654e99443e6a16523432d8d2aff.png)

### SkyWalking 特性

- 多种监控手段，语言探针和 service mesh
- 多语言自动探针，Java，.NET Core 和 Node.JS
- 轻量高效，不需要大数据
- 模块化，UI、存储、集群管理多种机制可选
- 支持告警
- 优秀的可视化方案

### SkyWalking 核心概念

- **Service** - 服务。代表一组为传入请求提供相同的行为的工作负载。 使用代理或 SDK 时，可以定义服务名称。
- **Service Instance** - 服务实例。服务组中的每个工作负载都称为一个实例。就像 Kubernetes 中的 Pod 一样，它在 OS 中不必是单个进程。
- **Endpoint** - 端点。它是特定服务中用于传入请求的路径，例如 HTTP URI 路径或 RPC 服务类+方法签名。

## 二、SkyWalking 架构

从逻辑上讲，SkyWalking 分为四个部分：探针（Probes），平台后端，存储和 UI。

![SkyWalking 架构](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/02/8769f28276e04df5864a0f8377cd74d6.png)

- **探针（Probes）** - 探针是指集成到目标系统中的代理或 SDK 库。它们负责收集数据（包括跟踪数据和统计数据）并将其按照 SkyWalking 的要求重新格式化为。
- **平台后端** - 平台后端是一个提供后端服务的集群。它用于聚合、分析和驱动从探针到 UI 的流程。它还为传入格式（如 Zipkin 的格式），存储实现程序和集群管理提供可插入功能。 您甚至可以使用 Observability Analysis Language 自定义聚合和分析。
- **存储** - 您可以选择一个 SkyWalking 已实现的存储，如由 Sharding-Sphere 管理的 ElasticSearch，H2 或 MySQL 集群，也可以自行实现一个存储。
- **UI** - 用户界面很酷，对于 SkyWalking 最终用户而言非常强大。它也可以自定义以匹配您的自定义后端。

## 三、SkyWalking 安装

进入 [Apache SkyWalking 官方下载页面](http://skywalking.apache.org/downloads/)，选择安装版本，下载解压到本地。

![SkyWalking 组件](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/02/2c2c6a1acdb54e20b739357e7d055117.png)

安装分为三个部分：

- [Backend setup document](https://github.com/apache/skywalking/blob/master/docs/en/setup/backend/backend-setup.md)
- [UI setup document](https://github.com/apache/skywalking/blob/master/docs/en/setup/backend/ui-setup.md)
- [CLI set up document](https://github.com/apache/skywalking-cli)

## 典型应用场景

- **微服务链路追踪**：自动埋点追踪 HTTP、RPC、MQ 等跨服务调用，生成调用链拓扑图，快速定位慢调用和故障节点。
- **性能瓶颈分析**：通过 Trace 详情查看每个 Span 的耗时，结合 Metrics 和 Logs 定位性能瓶颈（如数据库慢查询、外部接口超时）。
- **服务网格监控**：集成 Istio、Envoy 等 Service Mesh，采集 sidecar 遥测数据，实现对服务网格的全方位观测。
- **告警与可视化**：配置基于指标的告警规则（如错误率、响应时间 P99），通过 Grafana 或内置 UI 展示实时监控大盘。

## 最佳实践

- **合理设置采样率**：生产环境建议采样率 10%-20%，核心接口可配置全量采样，避免过度采集导致存储压力。
- **规范服务命名**：通过 `-Dskywalking.agent.service_name` 明确指定服务名，避免默认名导致的服务混淆。
- **多环境隔离**：开发、测试、生产环境使用独立的 SkyWalking 实例或命名空间，避免数据混杂。
- **定期清理数据**：配置数据 TTL（Time To Live），定期清理历史 Trace 和 Metrics 数据，控制存储规模。

## 常见问题

**SkyWalking Agent 对应用性能影响大吗？**

SkyWalking 采用无侵入式字节码增强技术，对应用性能影响较小（通常 1%-3%）。如果影响较大，可检查：1) 是否开启了过多的插件；2) 采样率是否过高；3) 是否采集了过多自定义 Tag。

**Trace 数据丢失或上报延迟？**

常见原因：1) Agent 与 OAP 服务端网络不通，检查防火墙和端口；2) OAP 服务端负载过高，处理不过来，考虑扩容 OAP 集群；3) Agent 配置错误，检查 agent.config 中的 backend 地址是否正确。

## 参考资料

- [SkyWalking Github](https://github.com/apache/skywalking)
