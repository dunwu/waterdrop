---
title: 《Dubbo 源码解读与实战》笔记
date: 2023-06-25 19:24:38
categories:
  - 笔记
  - 分布式
  - 分布式通信
tags:
  - 分布式
  - 通信
  - RPC
  - Dubbo
permalink: /pages/dde33f12/
---

# 《Dubbo 源码解读与实战》笔记

## 开篇词

[Apache Dubbo](http://dubbo.apache.org/zh-cn/) 是高性能、轻量级的开源 Java RPC 框架，三大核心能力：

- 面向接口的远程方法调用
- 可靠、智能的容错和负载均衡
- 服务自动注册和发现

## Dubbo 核心组件

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/distributed/rpc/dubbo/dubbo基本架构.png)

- **Registry**（注册中心）：服务地址注册与查找，通过长连接感知 Provider 宕机并推送通知
- **Provider**（服务提供者）：启动时向 Registry 注册服务地址（URL 格式）
- **Consumer**（服务消费者）：启动时订阅 Provider URL，根据负载均衡选择 Provider 建立长连接
- **Monitor**（监控中心）：统计调用次数和时间，宕机不影响核心功能
- **Container**：服务运行容器

## Dubbo 核心模块

- **dubbo-common**：公共工具类（SPI 实现、时间轮、动态编译器）
- **dubbo-remoting**：远程通信抽象（Netty4、ZooKeeper Curator 等实现）
- **dubbo-rpc**：协议抽象（Dubbo 协议等），只含一对一调用，不关心集群
- **dubbo-cluster**：集群管理（负载均衡、容错、路由），将多 Provider 伪装为一个
- **dubbo-registry**：注册中心交互（ZooKeeper、Nacos 等实现）
- **dubbo-monitor**：调用次数统计、调用链跟踪
- **dubbo-config**：对外配置解析（API 方式、Spring 集成）
- **dubbo-metadata**：元数据模块
- **dubbo-configcenter**：动态配置，服务治理规则存储与通知

## URL：Dubbo 的配置总线

Dubbo 中任意实现都抽象为 URL，贯穿整个框架：

```
protocol://username:password@host:port/path?key=value&key=value
```

核心类：**URL**（结构定义）、**URLBuilder**（辅助构造）、**URLStrParser**（字符串解析）。

URL 应用场景：SPI 扩展、服务暴露（`doRegister`）、服务订阅（`doSubscribe`）。

## Dubbo SPI

Dubbo 通过 SPI 实现**微内核架构**，达到 OCP 原则（对扩展开放，对修改封闭）。

### SPI 配置文件目录

- `META-INF/services/`：兼容 JDK SPI
- `META-INF/dubbo/`：用户自定义
- `META-INF/dubbo/internal/`：Dubbo 内部使用

Dubbo SPI 采用 **KV 格式**：

```ini
dubbo=org.apache.dubbo.rpc.protocol.dubbo.DubboProtocol
```

### SPI 核心实现

`@SPI` 注解标识扩展接口。核心逻辑封装在 `ExtensionLoader` 中：

- **strategies**（`LoadingStrategy[]`）：对应三个 SPI 目录
- **EXTENSION_LOADERS**（`ConcurrentMap<Class, ExtensionLoader>`）：扩展接口 → ExtensionLoader 缓存
- **EXTENSION_INSTANCES**（`ConcurrentMap<Class, Object>`）：实现类 → 实例对象缓存

## 时间轮

**时间轮**：高效批量管理定时任务的调度模型，环形结构，每个槽存储定时任务链表。

单层时间轮容量和精度有限，大规模场景使用**多级时间轮** + **持久化存储**。

核心接口：`TimerTask`、`Timer`、`Timeout`、`HashedWheelTimer`。

## ZooKeeper 与 Curator

### ZooKeeper 集群角色

- **Client**：通过长连接与 Server 交互，可查询/操作/监听 ZNode
- **Leader**：负责写操作，保证事务顺序性，同步 Follower/Observer
- **Follower**：处理读请求，转发写请求到 Leader，参与选举
- **Observer**：特殊从节点，不参与选举，提升读吞吐量

### ZNode 节点类型

- **持久节点** / **持久顺序节点**
- **临时节点** / **临时顺序节点**（Client 会话失效后自动删除）

## 代理模式

### JDK 动态代理

核心：`InvocationHandler` 接口，要求被代理类实现接口。

### CGLIB

基于 ASM 字节码生成，通过生成子类实现代理，无法代理 `final` 方法。**与 JDK 动态代理互补**：有接口用 JDK，无接口用 CGLIB。

核心成员：**Enhancer**（创建代理对象）、**MethodInterceptor**（方法增强）。

### Javassist

开源字节码类库，通过 Java API 直接修改类结构，简单快速。

## Netty IO 模型与线程模型

### IO 模型

传统阻塞 IO vs **IO 多路复用**（Selector 感知连接事件，少量线程处理大量连接）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/06/6dac0e3f06524d24a159675084887299.png)

### Reactor 线程模型

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/06/df38bfa800204e1ba6d520f75573d652.png)

三种模式：

- **单 Reactor 单线程**：简单但性能瓶颈，一般用于客户端
- **单 Reactor 多线程**：充分利用多核，但单一 Reactor 线程有瓶颈
- **主从 Reactor 多线程**：MainReactor 处理连接建立，SubReactor 处理读写，职责明确

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/06/5ccea09782e148fb8c91efb4f4ed73a9.png)

### Netty 线程模型

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/06/13a53841018f45c78b5c489b96bd9d75.png)

- **BossGroup**（`NioEventLoopGroup`）：接收客户端连接
- **WorkerGroup**（`NioEventLoopGroup`）：网络读写
- 每个 `NioEventLoop` 对应一个 `Selector`，处理绑定连接的事件
- `Pipeline` 与 `Channel` 绑定，按顺序调用 `ChannelHandler`

### Netty 核心组件

- **Channel**：网络连接抽象（`NioSocketChannel`、`NioServerSocketChannel`、`NioDatagramChannel`）
- **Selector**：多路复用器抽象，一个线程监听多个 Channel 事件
- **EventLoop** / **EventLoopGroup**：事件循环和循环组

## 简易版 RPC 框架实现

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/06/ea2815814d6b47da84d7e5c00a6b3868.png)

## 本地缓存：降低 ZooKeeper 压力

## 重试机制是网络操作的基本保证

## ZooKeeper 注册中心实现

## Dubbo Serialize 层：多种序列化算法

## Dubbo Remoting 层核心接口分析

## Buffer 缓冲区

## Transporter 层核心实现：编解码与线程模型

## Exchange 层剖析：Request-Response 模型

## 核心接口介绍，RPC 层骨架梳理

## 从 Protocol 起手，服务暴露和服务引用全流程

## 加餐：探秘 Invoker

## 代理帮你隐藏了多少底层细节？

## HTTP 协议 + JSON-RPC，Dubbo 跨语言

## Filter 接口，扩展 Dubbo 框架

## 路由机制：请求到底怎么走

## 负载均衡策略

## 集群容错

## Merger 合并器

## Mock 机制

## 服务自省设计方案

## 元数据方案，避免注册中心数据量膨胀

## 配置中心设计与实现

## 结束语

## 参考资料

- [《Dubbo 源码解读与实战》](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=393)
