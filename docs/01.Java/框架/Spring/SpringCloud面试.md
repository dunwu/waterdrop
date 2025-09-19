---
title: SpringCloud 面试
date: 2025-09-19 08:22:21
categories:
  - Java
  - 框架
  - Spring
tags:
  - Java
  - 框架
  - Spring
  - SpringCloud
  - 面试
permalink: /pages/7603c590/
---

# SpringCloud 面试

### 【简单】Dubbo 和 Spring Cloud Gateway 有什么区别？

Dubbo 与 Spring Cloud Gateway 对比：

| 对比维度     | Dubbo                                 | Spring Cloud Gateway                            |
| :----------- | :------------------------------------ | :---------------------------------------------- |
| **核心定位** | **RPC （远程过程调用） 框架**         | **API 网关 （流量入口）**                       |
| **核心功能** | 服务间高性能调用、服务治理            | 请求路由、过滤链（安全、限流、日志）            |
| **解决需求** | **服务之间**如何调用 (**东西向流量**) | **外部请求**如何进入微服务集群 (**南北向流量**) |
| **工作层次** | 服务层 (Service-to-Service)           | 入口层 (Edge Service)                           |
| **关键能力** | 服务发现、负载均衡、容错、熔断        | 动态路由、身份认证、权限校验、限流              |
| **通信协议** | 默认 Dubbo 协议 (TCP)、HTTP、gRPC     | HTTP、HTTPS （基于 WebFlux)                     |

**总结与关系**：在现代微服务架构中，二者是**互补而非替代**的关系。通常由 **Spring Cloud Gateway** 作为统一网关接收和处理所有外部请求，然后通过 **Dubbo** 在内部微服务之间进行高效、可靠的方法调用和治理。

## 资料

- [面试鸭 - SpringCloud 面试](https://www.mianshiya.com/bank/1797453053310402561)