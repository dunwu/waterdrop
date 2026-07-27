---
title: 《RPC 实战与核心原理》笔记
date: 2022-06-19 09:48:17
categories:
  - 笔记
  - 分布式
  - 分布式通信
tags:
  - 分布式
  - 通信
  - RPC
permalink: /pages/84c5790f/
---

# 《RPC 实战与核心原理》笔记

## 为什么要学习 RPC

**RPC 是解决分布式系统通信问题的一大利器**。不仅用于微服务间通信，还广泛用于中间件通信（etcd/gRPC）、容器编排（Kubernetes/gRPC）等场景。

## 核心原理：RPC 通信流程

### 什么是 RPC

RPC（Remote Procedure Call，**远程过程调用**）：

- 屏蔽远程调用与本地调用的差异
- 隐藏底层网络通信的复杂性

### RPC 通信流程

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/c82438fe869d45f0af078cd755ff9eee.png)

关键要素：**TCP 协议**传输、**序列化/反序列化**、**协议**（数据头 + 消息体）、**动态代理**屏蔽细节。

### RPC 在架构中的位置

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/45ed92a202344e2c98607edb73415998.png)

## 协议：设计可扩展且向后兼容的协议

### 协议的作用

为数据报文设定边界，避免语义不一致。类似于文章的标点断句。

### RPC 协议设计

RPC 协议对性能要求高，公有协议报文过大、不够紧凑。

协议组成要素：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/ba7ab435b38142cab7d5b15e058221a8.png)

### 可扩展协议

定长协议头无法添加新参数。可扩展协议采用三部分结构：**固定部分 + 协议头内容 + 协议体内容**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/c3272dfb216141749fe5ceb8188d1bf0.png)

## 序列化：对象在网络中传输

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/8b8158b5588a47dd8e63514eeb4c6b66.png)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/5d40088ff9c54167adad38e7ae9a5885.png)

常用方式：

- **JDK 序列化**：`ObjectInputStream` / `ObjectOutputStream`
- **JSON**
- **二进制**：Hessian、Protobuf、Thrift

### 协议选型优先级

**安全性 > 通用性 > 兼容性 > 性能 > 效率 > 空间开销**。可靠性优先于性能。

### 使用注意事项

- 对象尽量简单、高内聚，避免复杂依赖
- 入参/返回值体积不要太大
- 使用常用、开发语言原生对象
- 避免复杂继承关系

## 网络通信：IO 模型

### 常见 IO 模型

四种：**同步阻塞 IO（BIO）**、**同步非阻塞 IO（NIO）**、**IO 多路复用**、**异步非阻塞 IO（AIO）**。

**IO 多路复用**（Reactor 模式）在高并发场景最广泛使用：Netty、Redis、Nginx 均采用。

### 零拷贝

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/ef59b8dceb7e4aa8bd848e645278fb09.png)

传统 IO：用户空间与内核空间之间需 2 次数据拷贝 + CPU 上下文切换。

**零拷贝**：取消用户空间与内核空间之间的数据拷贝，直接通过 DMA 完成。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/2b90f5b95c444f2fa0f0ab31d0e7199f.png)

Netty 零拷贝实现：`CompositeByteBuf`/`slice`/`wrap`（用户空间优化）、`Direct Buffers`（堆外内存）、`FileRegion`（`FileChannel.transferTo()`）。

## 动态代理：屏蔽 RPC 处理细节

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/93d4b0f0e72d417682bccab8a37f8f40.png)

- **JDK 动态代理**：`InvocationHandler`，要求被代理类为接口，使用反射（性能较低）
- **Javassist**：控制底层字节码，无需反射，性能更好
- **Byte Buddy**：API 更易用，代码可读性更高，生成类执行速度更快（Spring、Jackson 均使用）

## 架构设计：灵活的 RPC 框架

### RPC 架构

**RPC 本质**：拦截方法参数 → 转为网络可传输的二进制 → 服务端还原语义 → 实现本地调用体验。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/5caee901ef004dde854946c5656c0cae.png)

核心模块：**数据传输模块**（收发二进制）、**协议模块**（序列化 + 协议封装 + 压缩）、**服务发现**、**连接管理**、**服务治理**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/ec9030574ee5477dbe3350c070115fd2.png)

### 可扩展架构

通过 **SPI** 实现插件化（微内核架构）。JDK SPI 性能不高且不支持自动注入，一般选用其他 SPI 实现。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/62d78b8a7ba24478953578f825f7888d.png)

## 服务发现：CP 还是 AP？

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/238cc7b863d04b889ffac1f247c4476f.png)

- **服务注册**：Provider 启动时注册接口地址到注册中心
- **服务订阅**：Consumer 启动时查找并订阅 Provider IP，缓存到本地

### 基于 ZooKeeper 的服务发现

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/06/cbc4710785a845fcb3262d1d1ffdbc0c.png)

超大规模集群下的挑战：注册中心负载过高、节点数据不一致、服务下发不及时。

### 基于消息总线的最终一致性注册中心

RPC 服务发现**不需要 CP，AP 即可**（服务上线延迟几秒可接受）。牺牲强一致性换取性能和稳定性。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/07/c1d95c5241154205ad3e439d0512143c.png)

## 健康检测

服务方三种状态：**健康**（连接成功 + 心跳正常）、**亚健康**（连接成功 + 心跳连续失败）、**死亡**（连接失败）。

设计要点：加入**业务请求可用率**因素，最大化提升 RPC 接口可用率。心跳间隔一般 30s。

## 路由策略

应用场景：**分组调用**、**蓝绿发布**、**灰度发布**、**流量切换**、**线下联调**、**读写分离**。

路由规则类型：**条件路由**、**脚本路由**、**标签路由**。

## 负载均衡

### 算法

随机（加权）、轮询（加权）、最小活跃数（加权）、哈希、一致性哈希。

### RPC 负载均衡特点

完全由 RPC 框架自身实现（非硬件/四层代理），Consumer 与所有 Provider 建立长连接，自主选择节点。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/d38e2b60c8be4c19ab6c0548d0c549ac.png)

### 自适应负载均衡

根据节点指标（CPU 负载、内存、请求耗时 TP99/TP999、状态）综合打分，按分数权重分配流量。

```
健康值 = 指标值1 * 权重1 + 指标值2 * 权重2 + ...
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/deabaffb1204460eb7020a72e7daf09f.png)

## 异常重试

- 仅符合重试条件的异常触发重试（网络超时、连接异常等）
- **注意**：网络抖动导致的超时重试可能触发业务重复执行，需配合幂等设计
- **重试超时**：每次重试后重置超时时间，超时则直接返回
- 重试时从负载均衡列表中去除问题节点

可靠容错处理机制：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/07/a0d59085c46f453ca70d7aa6079d4bc3.png)

## 优雅关闭

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/558f248b05814a9595652011255fad1d.png)

核心策略：

- 关闭中的服务收到新请求 → 返回特定异常（ShutdownException）→ 调用方自动重试到其他节点
- 通过 `Runtime.addShutdownHook` 注册关闭钩子
- 主动通知 + 被动等待结合，确保实时性和可靠性

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/897e7a81c4a44155b5ec4cffea2aeb94.png)

## 优雅启动

### 启动预热

JVM 运行后"热点"代码编译为机器码，重启后消失。刚启动的服务不应承担全部流量。

方案：根据启动时间对服务提供方降权，流量缓慢增加到正常水平。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/1205a2f30b8640378c3b994325d87890.png)

### 延迟暴露

启动过程中不立即注册接口到注册中心，等启动完成后再注册，避免请求打到未完成的节点。可通过 Hook 预热 JVM 指令和预加载资源。

## 熔断限流

### 限流

算法：计数器、滑动窗口、漏桶、令牌桶。

要点：

- 限流阈值配置作用于单机
- 可通过注册中心下发总节点数，框架自行计算单机阈值
- 也可依赖专门的限流服务（精准但有性能损耗）

### 熔断

三种状态：**Closed**（正常）→ **Open**（拦截请求，快速失败）→ **Half-Open**（探测请求，成功则恢复）。

## 业务分组：流量隔离

通过分组将 Provider 划分成不同小集群，实现调用方流量隔离，保障核心业务不受非核心业务干扰。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2020/07/ceee3cd487354c9aa3e4e99aa04882f5.png)

**动态分组**：解决突发流量溢出问题，冗余机器做成共享池，实现秒级扩缩容。

## 异步 RPC：压榨单机吞吐量

- **调用端异步**：通过 `Future` 获取结果，减少业务逻辑耗时
- **服务端异步**：回调方式异步处理，结果异步通知调用端
- **CompletableFuture**：无代码入侵性，实现调用端与服务端完全异步

## 安全体系

RPC 一般用于内部应用通信（局域网），主要关注：确保调用方获取真实 Provider IP 集合、Provider 可管控调用授权（数字签名）。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/2b3bc6f99e644b4d951f2db574d19ed2.png)

## 链路追踪

要点：**traceId**（标识完整请求）、**spanId**（标识一次 RPC 调用位置）、**annotation**（业务自定义埋点）。

代表产品：**Zipkin**（轻量、部署简单）、**Pinpoint**（字节码注入、UI 强大）、**SkyWalking**（Apache 孵化）、**CAT**（美团点评）。

## 时钟轮在 RPC 中的应用

**时钟轮**：高效批量管理定时任务的调度模型，环形结构，分为多个时间槽。

应用场景：

- **请求超时处理**：替代每请求一线程或单线程轮询方案
- **启动超时控制**
- **定时心跳**

## 泛化调用：无接口 RPC 调用

应用场景：**测试平台**（在线测试 RPC 服务）、**轻量级服务网关**（HTTP 转 RPC）。

原理：调用端将接口名、分组名、方法名、参数信息封装成请求消息发送，无需依赖 Provider 接口 API。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/d3af39e6c6a048ed9dd3cb8f09808a1b.png)

```java
class GenericService {
    Object $invoke(String methodName, String[] paramTypes, Object[] params);
    CompletableFuture<Object> $asyncInvoke(String methodName, String[] paramTypes);
}
```

## 多协议兼容

通过解析数据包开头的 **magic number** 识别协议类型，使用对应格式解析。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/f9c1d347ea8142639d2cb1857f76d980.png)

协议解析过程：二进制数据 → 协议相关对象 → 协议无关的 RPC 通用对象 → 方法调用 → 通用对象 → 协议相关对象 → 写回。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/06/ce3762dbff484a2d9fdb943b8e500d4d.png)

## 参考资料

- [RPC 实战与核心原理](https://time.geekbang.org/column/intro/100046201)
