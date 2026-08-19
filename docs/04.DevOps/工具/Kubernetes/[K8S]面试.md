---
icon: logos:kubernetes
title: Kubernetes 面试
date: 2025-09-25 07:49:46
order: 99
categories:
  - DevOps
  - 工具
  - Kubernetes
tags:
  - DevOps
  - Docker
  - Kubernetes
  - 面试
permalink: /pages/219f58bb/
---

# Kubernetes 面试

## Kubernetes 简介

### 【中等】什么是 Kubernetes，并描述其主要组件及其作用。⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 架构概览

#### 💎 关键结论

Kubernetes 是开源的容器编排平台，自动化部署、扩缩容和管理容器化应用。架构分控制面与节点两层：kube-apiserver 是统一入口，etcd 保存状态，scheduler 负责调度，kubelet 在节点上执行 Pod 管理。

#### ⚡记忆卡片

- **口诀**：控制面管决策，节点管执行；API 是门，etcd 是账本
- **关键词**：容器编排 ／ 控制面 ／ 期望状态
- **链路**：kubectl → kube-apiserver → etcd ／ scheduler → kubelet → 容器运行时

#### 📖 核心知识

**定位与解决的问题**

Kubernetes（K8s）是一个**开源的容器编排平台**，用于**自动化部署、扩展和管理容器化应用**。它解决了管理大量微服务时的核心难题：

- **自动化运维**：实现自动部署、扩缩容、故障恢复（自我修复）、滚动更新。
- **高可用与弹性伸缩**：保证应用持续在线，并能轻松应对流量波动。
- **资源优化**：高效调度容器，充分利用基础设施资源。

**核心概念**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/8d6c4f92377944c49d904a5f86876616.png)

- **集群**：由 **Control Plane / Master Node** 和 **Worker Nodes** 组成。
- **Pod**：最小部署单元，包含一个或多个紧密关联的容器。
- **Deployment**：定义 Pod 的期望状态（如副本数），实现滚动更新和回滚。
- **Service**：为动态变化的 Pod 提供稳定的网络访问和服务发现。

**主要组件及作用**

| 组件                   | 所在位置 | 职责                                             |
| :--------------------- | :------- | :----------------------------------------------- |
| **kube-apiserver**     | 控制面   | 集群统一入口，提供 REST API，所有组件经它交互    |
| **etcd**               | 控制面   | 分布式 KV 存储，保存集群全部状态数据             |
| **kube-scheduler**     | 控制面   | 为未调度的 Pod 按策略选择合适节点                |
| **kube-controller-manager** | 控制面 | 运行各类控制器（Deployment、Node 等），维护期望状态 |
| **kubelet**            | 工作节点 | 节点代理，确保容器按 Pod 规约运行并上报状态      |
| **kube-proxy**         | 工作节点 | 维护节点网络规则，落地 Service 的转发            |
| **容器运行时**         | 工作节点 | 真正负责拉取镜像、运行容器（如 containerd）      |

#### 🔬 扩展知识

::: details

- 【L3】K8s 的核心设计是**声明式 API + 控制器循环**：用户声明期望状态写入 etcd，控制器不断对比实际状态与期望状态并做出调谐（reconcile），这是自愈能力的来源。
- 【L4】生产集群通常将控制面组件容器化部署在 kube-system 命名空间，etcd 需 3 或 5 节点保证 raft 多数派；大规模集群还需关注 apiserver 与 etcd 的性能调优。

> 📚 延伸阅读：[Kubernetes 官方文档 - 组件概述](https://kubernetes.io/docs/concepts/overview/components/)

:::

#### 🔀 发散问题

- **Q：Pod 在架构中处于什么位置？** → Pod 是最小部署单元，由 kubelet 在节点上管理，见本文档「Kubernetes 中的 Pod 是什么？其作用是什么？」。
- **Q：工作负载控制器有哪些？** → Deployment、StatefulSet、DaemonSet 等各有分工，见本文档「Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？」。
- **Q：Pod 如何被分配到节点？** → 由 kube-scheduler 按亲和性等策略决定，见本文档「Kubernetes 中 Pod 的调度策略有哪些？」。

## Pod

### 【简单】Kubernetes 中的 Pod 是什么？其作用是什么？⭐⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / Pod

#### 💎 关键结论

Pod 是 K8s 最小的部署和管理单元，封装一个或多个紧耦合容器，共享网络命名空间和存储卷。它是调度、扩缩容、自愈的最小单位，容器间可通过 localhost 直接通信。

#### ⚡记忆卡片

- **口诀**：一 Pod 多容器，共享网络与存储；调度自愈最小单元
- **关键词**：最小部署单元 ／ 共享网络 ／ 临时性
- **链路**：控制器声明 Pod → 调度器选节点 → kubelet 拉起容器

#### 📖 核心知识

Kubernetes 中的 Pod 是集群中最小的部署和管理单元，是容器的封装集合。

**核心构成**

- 包含一个或多个紧密关联的容器（如应用容器 + 日志收集容器）
- 共享网络命名空间（同一 Pod 内容器共享 IP 和端口，可通过 localhost 通信）
- 共享存储卷（可通过 Volume 实现容器间数据共享）

**主要作用**

1. 作为应用部署的基本单位，封装应用运行所需的容器、网络和存储资源
2. 提供容器间协同工作的环境（如前后端容器同 Pod 部署，通过 localhost 通信）
3. 作为 Kubernetes 调度、扩展、自愈的最小单元（如调度到节点、副本集扩缩容均以 Pod 为单位）
4. 抽象底层容器运行时，统一管理容器生命周期

Pod 具有**临时性**，生命周期结束后会被销毁重建，其 IP 可能变化，通常通过 Service 提供稳定访问入口。

#### 🔬 扩展知识

::: details

- 【L3】Pod 内有一个基础设施容器（pause 容器）持有网络命名空间，业务容器加入该命名空间，因此共享 IP；Pod IP 在 Pod 重建后会变化。
- 【L4】Sidecar 模式（日志收集、代理、配置热加载）是 Pod 多容器设计的典型应用；1.28+ 引入原生 Sidecar 容器（init container + restartPolicy: Always），改善了启停顺序问题。

> 📚 延伸阅读：[Kubernetes 官方文档 - Pod](https://kubernetes.io/docs/concepts/workloads/pods/)

:::

#### 🔀 发散问题

- **Q：如何创建一个 Pod？** → 生产推荐 YAML + `kubectl apply`，见本文档「如何在 Kubernetes 中创建一个 Pod？」。
- **Q：Pod 的健康状态如何保障？** → 通过三类探针检测，见本文档「Kubernetes 中的探针有哪些类型？各有什么作用？」。
- **Q：Pod 资源紧张时会怎样？** → 按 QoS 等级被驱逐，见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。

### 【中等】如何在 Kubernetes 中创建一个 Pod？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / Pod

#### 💎 关键结论

生产环境用 YAML 声明 Pod 并 `kubectl apply` 应用，可版本控制、可重复；命令式 `kubectl run` 仅用于临时测试。且生产中不应裸建 Pod，应交给 Deployment 等控制器管理。

#### ⚡记忆卡片

- **口诀**：生产写 YAML，测试用 run；裸 Pod 不可靠，控制器来托管
- **关键词**：kubectl apply ／ YAML 声明式 ／ 控制器托管
- **链路**：编写 YAML → kubectl apply → apiserver 校验存储 → 调度并运行

#### 📖 核心知识

**方法一、配置文件（推荐用于生产）**

（1）**创建 YAML 文件（示例：`my-pod.yaml`）**

```yml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
    - name: nginx-container
      image: nginx:1.25.3
      ports:
        - containerPort: 80
```

（2）**应用配置**

```shell
kubectl apply -f my-pod.yaml
```

**优势**：可版本控制、可重复、内容清晰，是生产环境标准做法。

**方法二、命令式命令（仅用于测试）**

```shell
kubectl run my-redis-pod --image=redis --restart=Never
```

_注意：必须加 `--restart=Never` 才会创建独立 Pod，否则会默认创建 Deployment。_

**优势：** 快速简单，适合临时测试。

**最佳实践**

- 在生产中，不应直接创建 Pod，而应使用 **Deployment** 或 **StatefulSet** 等更高层级资源来管理 Pod，以实现自动恢复、扩缩容和滚动更新。
- **`containerPort` 字段**仅是文档说明，实际开放端口需要通过 **Service** 资源来实现。

#### 🔬 扩展知识

::: details

- 【L3】`kubectl apply` 是声明式操作，apiserver 会做准入校验并与现有对象做三方合并；可用 `kubectl apply --dry-run=client -o yaml` 先验证配置。
- 【L4】`kubectl run` 可加 `--rm -it` 启动一次性调试 Pod（类似 docker run --rm），排查网络与配置问题很实用。

> 📚 延伸阅读：[Kubernetes 官方文档 - kubectl 速查](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

:::

#### 🔀 发散问题

- **Q：Pod 的本质和构成是什么？** → 见本文档「Kubernetes 中的 Pod 是什么？其作用是什么？」。
- **Q：Pod 版本如何更新？** → 通过控制器的滚动更新，见本文档「Kubernetes 中如何进行滚动更新和回滚？」。
- **Q：Pod 启动失败怎么排查？** → 见本文档「Pod 一直处于 CrashLoopBackOff，如何排查？」。

## Service 与 Ingress

### 【简单】Service（服务）：内部稳定端点⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 网络

#### 💎 关键结论

Service 为动态变化的 Pod 集合提供稳定的 IP、DNS 和端口，通过标签选择器实现服务发现与负载均衡，是集群内部的稳定访问端点。

#### ⚡记忆卡片

- **口诀**：Pod 会变，Service 不变；标签选后端，VIP 做入口
- **关键词**：稳定端点 ／ 服务发现 ／ 负载均衡
- **链路**：客户端 → Service ClusterIP → kube-proxy 规则 → 后端 Pod

#### 📖 核心知识

- **用途**：为动态变化的 Pod 集合提供一个**稳定的 IP 地址、DNS 名称和端口**，实现服务发现和内部负载均衡。
- **核心功能**：
  - **服务发现**：通过标签选择器动态找到后端 Pod。
  - **负载均衡**：将请求分发给多个 Pod 实例。
- **类型概览**：
  - **ClusterIP（默认）**：仅限集群内部访问。
  - **NodePort**：通过节点 IP 和静态端口暴露服务，可从外部访问。
  - **LoadBalancer**：通过云提供商负载均衡器暴露服务到公网。

#### 🔀 发散问题

- **Q：Service 完整有哪些类型？** → 含 ExternalName 与 Headless，见本文档「Kubernetes 中的 Service 有哪几种类型？」。
- **Q：与 Ingress 怎么分工？** → 见本文档「Kubernetes 中的 Service 和 Ingress 有什么区别？」。

### 【简单】Ingress（入口）：外部流量网关⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 网络

#### 💎 关键结论

Ingress 是集群的统一 HTTP(S) 入口，按域名和路径把外部流量路由到不同后端 Service，并可在入口做 TLS 终结；规则生效必须先部署 Ingress Controller。

#### ⚡记忆卡片

- **口诀**：外流走 Ingress，域名路径定去向；规则要生效，控制器先装
- **关键词**：L7 路由 ／ TLS 终止 ／ Ingress Controller
- **链路**：外部用户 → Ingress Controller → Ingress 规则 → Service → Pod

#### 📖 核心知识

- **用途**：作为集群的**统一入口**，管理外部访问，实现基于域名和路径的**高级路由**。
- **核心功能**：
  - **基于规则的路由**：根据 HTTP 请求的域名（如 `api.example.com`）和路径（如 `/api`）将流量导向不同的后端 Service。
  - **SSL/TLS 终止**：在入口处处理 HTTPS 加密/解密。
- **重要概念**：
  - **Ingress Controller**：**必须部署**的**软件**（如 Nginx、Traefik），用于实现 Ingress 规则。
  - **Ingress Resource**：**声明路由规则**的 YAML 配置文件。

#### 🔀 发散问题

- **Q：Ingress 资源具体怎么配置？** → 见本文档「Kubernetes 中的 Ingress 资源有什么作用？如何配置？」。
- **Q：与 Service 的本质区别？** → 见本文档「Kubernetes 中的 Service 和 Ingress 有什么区别？」。

### 【中等】Kubernetes 中的 Service 和 Ingress 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 网络

#### 💎 关键结论

Service 工作在 L4，解决集群内部的稳定访问与负载均衡；Ingress 工作在 L7，管理外部 HTTP(S) 流量的域名/路径路由与 TLS 终结。典型路径：外部用户 → Ingress → Service → Pod。

#### ⚡记忆卡片

- **口诀**：内用 Service（L4），外用 Ingress（L7）；Ingress 依赖 Service 做后端
- **关键词**：L4 vs L7 ／ 内部稳定 ／ 外部路由
- **链路**：外部用户 → Ingress → Service → Pod

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/e8732156edb048669f47e5eb83a4e2e4.png)

- **Service**：集群**内部**的通信与负载均衡。
- **Ingress**：集群**外部**的 HTTP(S) 流量管理与路由。
- **典型流量路径**：外部用户 -> **Ingress** -> **Service** -> **Pod**。

**核心区别对比表**

| 特性         | Service              | Ingress                                                      |
| :----------- | :------------------- | :----------------------------------------------------------- |
| **作用层面** | **传输层（L4）**     | **应用层（L7，HTTP/HTTPS）**                                 |
| **主要目标** | **内部通信**与稳定性 | **外部访问**与智能路由                                       |
| **依赖关系** | Kubernetes 内置功能  | **依赖 Service** 作为后端，并需要**部署 Ingress Controller** |
| **功能**     | 负载均衡、服务发现   | 域名/路径路由、SSL 终止                                      |

#### 🔬 扩展知识

::: details

- 【L3】Service 基于 kube-proxy 的 iptables/IPVS 规则做四层转发；Ingress 本身只是规则对象，实际由 Ingress Controller（Nginx、Traefik 等）反向代理实现。
- 【L4】Gateway API 是 Ingress 的演进方向，用 GatewayClass/Gateway/HTTPRoute 分离基础设施与路由职责，表达能力更强。

> 📚 延伸阅读：[Kubernetes 官方文档 - Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

:::

#### 🔀 发散问题

- **Q：Service 的类型怎么选？** → 见本文档「Kubernetes 中的 Service 有哪几种类型？」。
- **Q：Ingress 的 YAML 怎么写？** → 见本文档「Kubernetes 中的 Ingress 资源有什么作用？如何配置？」。

## Deployment 与更新

### 【中等】滚动更新⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / 发布策略

#### 💎 关键结论

滚动更新是 Deployment 的默认更新策略：创建新 ReplicaSet，按 maxSurge/maxUnavailable 控制节奏逐步替换旧 Pod，实现零停机发布。

#### ⚡记忆卡片

- **口诀**：新 RS 逐步替旧，边建边删不停服
- **关键词**：零停机 ／ maxSurge ／ maxUnavailable
- **链路**：改镜像版本 → apply/set image → 新 RS 扩容 → 旧 RS 缩容

#### 📖 核心知识

**目标**：逐步用新版本 Pod 替换旧版本 Pod，实现**零停机**部署。

**关键机制与参数**（在 Deployment YAML 的 `spec.strategy.rollingUpdate` 中）：

- `maxSurge`：允许临时超过期望副本数的 Pod 数量（如 25%），用于平滑更新。
- `maxUnavailable`：更新过程中允许不可用的 Pod 最大数量（如 25%），保证服务最低可用性。

**触发方式**

（1）**命令式（快速测试）**

```shell
kubectl set image deployment/my-app my-container=my-app:v2.0
```

（2）**声明式（生产推荐）**

```shell
kubectl apply -f deployment.yaml  # 修改 yaml 文件中的镜像版本后应用
```

**监控命令**

```shell
kubectl rollout status deployment/my-app  # 查看实时状态
```

#### 🔬 扩展知识

::: details

- 【L3】`spec.strategy.type` 还可设为 `Recreate`（先全部删除再创建），仅用于无法多实例并存的应用，会有停机窗口。
- 【L4】结合 `kubectl rollout pause/resume` 可先改多项配置再一次性生效，避免多次触发滚动；灰度发布可配合少量副本的新 Deployment 或流量切分实现。

> 📚 延伸阅读：[Kubernetes 官方文档 - Deployment 更新策略](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment)

:::

#### 🔀 发散问题

- **Q：更新出问题怎么办？** → 见本文档「回滚操作」。
- **Q：完整发布流程命令有哪些？** → 见本文档「Kubernetes 中如何进行滚动更新和回滚？」。

### 【中等】回滚操作⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / 发布策略

#### 💎 关键结论

回滚利用 Deployment 保留的历史 ReplicaSet，用 `kubectl rollout undo` 把 Pod 模板重置为旧版本并再次触发更新；`revisionHistoryLimit` 决定可回滚的深度。

#### ⚡记忆卡片

- **口诀**：history 看版本，undo 回到过去，--to-revision 定点回
- **关键词**：rollout undo ／ 修订历史 ／ revisionHistoryLimit
- **链路**：查看历史 → 选定 revision → undo 重置模板 → 触发滚动更新

#### 📖 核心知识

**目标**：当新版本出现问题时，**快速恢复**到之前的稳定版本。

**操作流程**

（1）**查看修订历史**

```shell
kubectl rollout history deployment/my-app
```

（2）**执行回滚**

**回滚到上一个版本**（最常用）

```shell
kubectl rollout undo deployment/my-app
```

**回滚到指定版本**

```shell
kubectl rollout undo deployment/my-app --to-revision=1
```

**关键配置**

- `revisionHistoryLimit`：指定保留的旧 ReplicaSet 历史记录数量，默认为 10，供回滚使用。

#### 🔬 扩展知识

::: details

- 【L3】回滚本质是把指定 revision 的 ReplicaSet 模板重新设为期望状态，因此是一次新的滚动更新，也会遵循 maxSurge/maxUnavailable 节奏。
- 【L4】若将 `revisionHistoryLimit` 设为 0，旧 ReplicaSet 会被立即清理，将失去回滚能力，生产环境不要这样做。

> 📚 延伸阅读：[Kubernetes 官方文档 - 回滚 Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)

:::

#### 🔀 发散问题

- **Q：滚动更新本身是怎么回事？** → 见本文档「滚动更新」。
- **Q：发布与回滚的完整命令链？** → 见本文档「Kubernetes 中如何进行滚动更新和回滚？」。

### 【中等】Kubernetes 中如何进行滚动更新和回滚？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 发布策略

#### 💎 关键结论

滚动更新和回滚都是 Deployment 的核心能力：更新靠创建新 ReplicaSet 逐步替换 Pod，回滚靠 `rollout undo` 重置 Pod 模板到历史版本，全程用 rollout 子命令观察和控制。

#### ⚡记忆卡片

- **口诀**：更新换 RS，回滚 undo 翻旧账；status 看进度，history 查版本
- **关键词**：Deployment ／ ReplicaSet ／ rollout 命令族
- **链路**：set image/apply → rollout status → rollout history → rollout undo

#### 📖 核心知识

滚动更新和回滚是 **Deployment** 资源的核心功能。Deployment 通过控制 **ReplicaSet** 来管理 Pod，通过改变 Pod 模板的“期望状态”来实现无缝更新。

| 操作         | 核心命令                                     | 本质                                            |
| :----------- | :------------------------------------------- | :---------------------------------------------- |
| **滚动更新** | `kubectl set image...` 或 `kubectl apply -f` | 通过创建新 ReplicaSet，**逐步替换** Pod。       |
| **回滚**     | `kubectl rollout undo`                       | 将 Pod 模板**重置**为历史版本，并再次触发更新。 |

**完整操作流程**

1. **发起更新**：`kubectl set image deployment/my-app my-container=my-app:v2.0`，或修改 YAML 后 `kubectl apply -f deployment.yaml`。
2. **观察进度**：`kubectl rollout status deployment/my-app`，确认新 ReplicaSet 逐步就绪。
3. **验证异常时查历史**：`kubectl rollout history deployment/my-app` 查看各 revision。
4. **执行回滚**：`kubectl rollout undo deployment/my-app`（上一版本）或加 `--to-revision=N`（指定版本）。

::: details 案例：一次典型的发布与回滚

- 修改镜像版本后 `kubectl apply`，Deployment 创建新 ReplicaSet 并按 25%/25% 的默认节奏替换 Pod。
- 上线后发现错误率上升，`kubectl rollout undo` 一键回到上一 revision，流量恢复。
- 保留足够的 `revisionHistoryLimit`（默认 10）是回滚深度的保障。

:::

#### 🔬 扩展知识

::: details

- 【L3】`kubectl rollout restart deployment/my-app` 不改配置即可重建全部 Pod，常用于 ConfigMap/Secret 变更后刷新。
- 【L4】生产发布可结合 `kubectl rollout pause` 做分批灰度：先替换一小批观察指标，再 resume 全量推进。

> 📚 延伸阅读：[Kubernetes 官方文档 - Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

:::

#### 🔀 发散问题

- **Q：滚动更新的参数如何控制节奏？** → 见本文档「滚动更新」。
- **Q：回滚能回多深由什么决定？** → 见本文档「回滚操作」。
- **Q：更新期间 502 如何治理？** → 与探针和优雅关闭相关，见本文档「Kubernetes 中的探针有哪些类型？各有什么作用？」。

## 配置管理

### 【简单】ConfigMap（配置映射）⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 配置管理

#### 💎 关键结论

ConfigMap 以明文存储非敏感配置（环境变量、配置文件、命令行参数），可作为环境变量注入或挂载为配置文件，实现配置与镜像解耦。

#### ⚡记忆卡片

- **口诀**：配置进 ConfigMap，明文存放别放密
- **关键词**：非敏感 ／ 明文 ／ 挂载或注入
- **链路**：创建 ConfigMap → 环境变量注入或 Volume 挂载 → 容器读取

#### 📖 核心知识

- **用途**：**存储非敏感数据**。
- **数据类型**：环境变量（如 `LOG_LEVEL=info`）、配置文件（如 `nginx.conf`）、命令行参数。
- **存储形式**：**明文**存储。
- **使用方式**：
  1. **作为环境变量注入**到容器中。
  2. **作为配置文件挂载**到容器的指定目录（最常用）。

#### 🔀 发散问题

- **Q：敏感信息用什么？** → 见本文档「Secret（密钥）」。
- **Q：两者如何对比选型？** → 见本文档「Kubernetes 中的 ConfigMap 和 Secret 有什么作用？」。

### 【简单】Secret（密钥）⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 配置管理

#### 💎 关键结论

Secret 用于存储密码、密钥、证书等敏感信息，默认 Base64 编码（是编码不是加密），推荐以只读文件挂载而非环境变量注入。

#### ⚡记忆卡片

- **口诀**：敏感信息进 Secret，Base64 非加密，挂载优于注入
- **关键词**：敏感信息 ／ Base64 编码 ／ 文件挂载
- **链路**：创建 Secret → 挂载只读文件或注入环境变量 → 容器使用

#### 📖 核心知识

- **用途**：**存储敏感信息**。
- **数据类型**：密码、API 密钥、TLS 证书、镜像仓库拉取凭证。
- **存储形式**：**Base64 编码**（注意：这是编码，**不是加密**）。
- **使用方式**：
  1. 作为环境变量注入（**不推荐**用于高敏感数据，有日志泄露风险）。
  2. **作为只读文件挂载**（**推荐**方式，更安全）。
  3. 特殊类型 `imagePullSecrets` 用于拉取私有镜像。

#### 🔀 发散问题

- **Q：非敏感配置放哪？** → 见本文档「ConfigMap（配置映射）」。
- **Q：Secret 默认不加密怎么办？** → 涉及 etcd 加密与外部密钥系统，见本文档「Kubernetes 中如何进行安全配置？」。

### 【中等】Kubernetes 中的 ConfigMap 和 Secret 有什么作用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 配置管理

#### 💎 关键结论

用 ConfigMap 管理非敏感应用配置，用 Secret 管理密码密钥等敏感信息；两者都支持环境变量注入与文件挂载，实现配置与镜像解耦、多环境复用。

#### ⚡记忆卡片

- **口诀**：普通配置 ConfigMap，敏感数据 Secret；永远不用 ConfigMap 存密码
- **关键词**：配置与镜像解耦 ／ 明文 vs Base64 ／ 挂载注入
- **链路**：定义 ConfigMap/Secret → 注入或挂载 → 应用读取配置

#### 📖 核心知识

**核心区别与总结**

| 特性         | ConfigMap      | Secret                                         |
| :----------- | :------------- | :--------------------------------------------- |
| **数据性质** | **非敏感**配置 | **敏感**信息                                   |
| **安全性**   | 低，明文       | 较高（但默认不加密，需配合 RBAC 和 ETCD 加密） |
| **关键建议** | 存放应用配置   | **永远不要**用 ConfigMap 存密码                |

**共同作用**

- **配置与镜像解耦**：同一镜像在不同环境（开发/测试/生产）加载不同配置，无需重新打包。
- **两种消费方式**：环境变量注入（适合少量键值）、文件挂载（适合配置文件与证书，Secret 推荐此方式）。

#### 🔬 扩展知识

::: details

- 【L3】Secret 默认仅 Base64 编码存储于 etcd，应开启 etcd 静态加密（EncryptionConfiguration）并用 RBAC 严格限制 get/list Secret 的权限。
- 【L4】更高安全要求可对接外部密钥管理系统（如 HashiCorp Vault、云厂商 KMS），通过 External Secrets Operator 同步到集群。

> 📚 延伸阅读：[Kubernetes 官方文档 - Secret](https://kubernetes.io/docs/concepts/configuration/secret/)

:::

#### 🔀 发散问题

- **Q：各自的细节？** → 见本文档「ConfigMap（配置映射）」与「Secret（密钥）」。
- **Q：配置变更后 Pod 如何生效？** → 可结合 rollout restart，见本文档「Kubernetes 中如何进行滚动更新和回滚？」。

### 【中等】Kubernetes 中如何配置资源配额？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / 配置管理

#### 💎 关键结论

在命名空间创建 ResourceQuota 对象即可限制该命名空间的计算资源总量与对象数量，防止资源滥用、控制成本；需与 Pod 的 requests/limits 配合，超配额时资源创建会被拒绝。

#### ⚡记忆卡片

- **口诀**：配额按命名空间，两类上限：资源总量 + 对象个数
- **关键词**：ResourceQuota ／ 命名空间 ／ requests 总量
- **链路**：定义 quota YAML → kubectl apply → 准入控制器校验 → 超额拒绝

#### 📖 核心知识

**Kubernetes 中通过在命名空间创建 ResourceQuota 对象来配置资源配额**。

**配置方式**：

- 用 YAML 定义 `ResourceQuota` 对象，指定 `namespace`（仅作用于目标命名空间）
- 配置项含两类：计算资源（`requests.cpu/limits.memory` 等总量上限）、对象数量（`pods/services` 等最大数量）
- 应用命令：`kubectl apply -f quota.yaml`

**核心作用**：

- 防资源滥用：限制命名空间资源总用量，避免单个应用占用过多资源
- 公平分配：按业务需求为不同命名空间（如开发 / 生产）分配配额
- 成本控制：避免超预期资源消耗，降低运维成本
- 保障核心业务：为关键业务预留资源，防止被抢占

**注意**：需与 Pod 的 `requests/limits` 配合（命名空间启用配额后，Pod 通常必须声明 requests/limits）；超配额时资源创建会被拒绝。

#### 🔬 扩展知识

::: details

- 【L3】LimitRange 与 ResourceQuota 互补：前者为命名空间内单个 Pod/容器设置默认值与上下限，后者管总量。
- 【L4】多租户集群可叠加 PriorityClass 与准入 Webhook，实现按优先级抢占与更细粒度的成本治理。

> 📚 延伸阅读：[Kubernetes 官方文档 - 资源配额](https://kubernetes.io/docs/concepts/policy/resource-quotas/)

:::

#### 🔀 发散问题

- **Q：配额通常配在什么隔离单元上？** → 见本文档「Kubernetes 中的 Namespace 有什么作用？」。
- **Q：requests/limits 还影响什么？** → 决定 QoS 与驱逐顺序，见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。

### 【简单】Kubernetes 中的 Namespace 有什么作用？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 配置管理

#### 💎 关键结论

Namespace 是集群的虚拟分区，提供逻辑隔离的工作空间，支撑环境/团队隔离、资源配额与 RBAC 权限边界；它是逻辑隔离而非物理隔离。

#### ⚡记忆卡片

- **口诀**：一集群多空间，隔离靠命名空间；删库先看清，删除不可逆
- **关键词**：逻辑隔离 ／ 环境分离 ／ 配额与权限载体
- **链路**：创建 Namespace → 资源归属其中 → 配额/RBAC 按空间管控

#### 📖 核心知识

**Namespace（命名空间）** 是 Kubernetes 集群的**虚拟分区**，用于在同一个物理集群中创建多个**逻辑隔离**的工作空间。

- **资源与对象隔离**：不同 Namespace 中的资源（如 Pod、Service）可以**重名**。
- **资源配额管理**：可以为每个 Namespace 设置独立的 CPU、内存等资源使用上限。
- **访问权限控制**：结合 RBAC，可限制不同团队或用户只能访问指定的 Namespace。

**主要使用场景**

| 场景                    | 目的                                               | 示例                           |
| :---------------------- | :------------------------------------------------- | :----------------------------- |
| **环境隔离** （最常用） | 将开发、测试、生产环境完全分离，避免相互干扰。     | `dev`, `test`, `prod`          |
| **团队/项目隔离**       | 在共享集群中，为不同团队或项目提供独立的工作空间。 | `team-a`, `project-x`          |
| **系统组件隔离**        | 将 Kubernetes 核心系统组件与用户应用分开管理。     | `kube-system` （存放核心组件） |

**关键要点与注意事项**

- **并非完全隔离**：是逻辑隔离，非物理隔离。异常应用仍可能影响底层节点。
- **部分资源不归属**：Node、PersistentVolume 等集群级资源不属于任何 Namespace。
- **删除后果严重**：删除 Namespace 会**同步删除**其内所有资源，且不可逆。
- **默认空间**：未指定时，操作默认在 `default` 命名空间进行。

#### 🔀 发散问题

- **Q：按命名空间限资源怎么做？** → 见本文档「Kubernetes 中如何配置资源配额？」。
- **Q：按命名空间控权限怎么做？** → 见本文档「什么是 Kubernetes 中的 RBAC？」。

## 日志与存储

### 【中等】Kubernetes 中如何进行日志管理？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 日志

#### 💎 关键结论

应用应把日志输出到 stdout/stderr；开发用 kubectl logs 即可，生产必须建集群级日志架构：DaemonSet 日志代理 + 中心化后端 + 可视化，典型如 EFK。

#### ⚡记忆卡片

- **口诀**：日志走标准输出，生产必建集群级；EFK 三件套，代理 DaemonSet
- **关键词**：stdout/stderr ／ DaemonSet 采集 ／ 中心化后端
- **链路**：应用 stdout → 节点文件 → Fluentd → Elasticsearch → Kibana

#### 📖 核心知识

Kubernetes 本身不提供内置的集中式日志解决方案，但其基础机制是：**应用应将日志输出到标准输出（stdout）和标准错误（stderr）**，而非文件。

| 场景          | 方案               | 特点                                               |
| :------------ | :----------------- | :------------------------------------------------- |
| **开发/调试** | `kubectl logs`     | 简单快捷，但日志易失、分散。                       |
| **生产环境**  | **集群级日志架构** | **必备方案**。实现日志的集中、持久化、搜索和告警。 |

**基础查看（用于开发调试）**

- **命令**：使用 `kubectl logs <pod-name>` 直接查看 Pod 的日志。
- **原理**：日志由节点上的容器运行时捕获并存储在本地文件中。
- **缺点**：**日志分散在各节点**，随 Pod 删除或节点故障而**丢失**，无法集中分析。

**集群级方案（用于生产环境）**

这是必须采用的架构，核心是增加一个**日志代理**，将日志收集到**中心化后端**。

- **核心组件**：
  1. **日志代理**：以 **DaemonSet** 形式运行在每个节点上（如 **Fluentd** 或 **Fluent Bit**），负责收集和转发该节点上所有容器的日志。
  2. **日志后端**：集中存储和索引日志的系统（如 **Elasticsearch**、**Grafana Loki** 或云厂商服务）。
  3. **可视化界面**：用于查询和展示日志的 Web UI（如 **Kibana**、**Grafana**）。

- **经典架构（EFK）**：
  `应用 stdout -> 节点文件 -> Fluentd -> Elasticsearch -> Kibana`

**关键实践与要点**

- **日志上下文**：日志代理会自动为每条日志添加丰富的元数据（如 Pod 名称、命名空间、标签），极大方便问题排查。
- **处理文件日志**：若应用必须写文件到磁盘，可采用 **Sidecar 容器模式**，由 Sidecar 读取日志文件并输出到其 stdout，从而纳入标准收集流程。
- **云服务**：在公有云上，直接使用托管的日志服务（如 AWS CloudWatch）是最简单省心的选择。

#### 🔬 扩展知识

::: details

- 【L3】kubelet 会轮转容器日志（`containerLogMaxSize`），节点磁盘压力时可能提前清理，日志必须尽快转走而非长期留在节点。
- 【L4】大规模集群可选轻量采集器（Fluent Bit）+ Loki 降低存储成本，或改用 eBPF/无代理采集方案减少资源开销。

> 📚 延伸阅读：[Kubernetes 官方文档 - 日志架构](https://kubernetes.io/docs/concepts/cluster-administration/logging/)

:::

#### 🔀 发散问题

- **Q：日志代理为什么用 DaemonSet？** → 见本文档「Kubernetes 中的 DaemonSet 有什么作用？」。
- **Q：排查问题时日志怎么看？** → 见本文档「Pod 一直处于 CrashLoopBackOff，如何排查？」。

### 【中等】Kubernetes 中如何实现持久化存储？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Kubernetes / 存储

#### 💎 关键结论

持久化存储用 PV/PVC 机制：管理员定义 PV 提供存储，用户用 PVC 申请并挂载到 Pod；生产推荐 StorageClass 动态供给，容器销毁后数据仍保留在 PV 中。

#### ⚡记忆卡片

- **口诀**：PV 是仓库，PVC 是申请单，StorageClass 自动建仓
- **关键词**：PV/PVC ／ 动态供给 ／ 数据持久
- **链路**：定义 PV/StorageClass → 创建 PVC 申请 → Pod 挂载 PVC

#### 📖 核心知识

在 Kubernetes 中配置持久化存储需通过 **PV（PersistentVolume，持久卷）** 和 **PVC（PersistentVolumeClaim，持久卷声明）** 实现，核心步骤如下：

（1）**定义 PV（集群级存储资源）**

PV 由管理员配置，代表集群中的实际存储资源（如本地磁盘、NFS、云存储等），示例（NFS 类型）：

```yml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 10Gi # 存储容量
  accessModes:
    - ReadWriteMany # 多节点读写
  nfs:
    path: /data/nfs # NFS 共享路径
    server: 192.168.1.100 # NFS 服务器地址
  persistentVolumeReclaimPolicy: Retain # 回收策略（Retain/Delete/Recycle）
```

应用：`kubectl apply -f pv.yaml`

（2）**定义 PVC（用户申请存储）**

PVC 由用户创建，用于申请 PV 资源，无需关心底层存储细节：

```yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi # 申请 5Gi 存储
  # 可选：通过 storageClassName 指定存储类
  # storageClassName: "fast"
```

应用：`kubectl apply -f pvc.yaml`

（3）**Pod 挂载 PVC**

在 Pod 中引用 PVC，实现数据持久化：

```yml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - name: data-volume
          mountPath: /usr/share/nginx/html # 容器内挂载路径
  volumes:
    - name: data-volume
      persistentVolumeClaim:
        claimName: app-pvc # 关联 PVC
```

（4）**进阶：使用 StorageClass 动态供应**

通过 StorageClass 实现 PV 自动创建，无需手动配置 PV：

```yml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/aws-ebs # 存储插件（如 AWS EBS、Ceph 等）
parameters:
  type: gp2 # 存储类型
reclaimPolicy: Delete
```

PVC 引用 StorageClass 即可动态获取存储。

**核心价值**

> 管理员管理 PV，用户通过 PVC 申请，无需关注底层存储细节

- 数据持久化：容器销毁后，数据仍保存在 PV 中，支持跨 Pod 复用
- 灵活适配：支持多种存储后端（本地磁盘、NFS、云存储等）

通过 PV/PVC 机制，Kubernetes 实现了存储资源的标准化管理，满足有状态应用（如数据库）的数据持久化需求。

#### 🔬 扩展知识

::: details

- 【L3】accessModes 决定并发语义：ReadWriteOnce（单节点读写）、ReadWriteMany（多节点读写，需 NFS/CephFS 等支持）、ReadOnlyMany；云盘通常只支持 RWO。
- 【L4】回收策略 Retain 防误删但需手动清理，Delete 随 PVC 释放；数据库类负载建议 Retain + 备份兜底，并可结合卷快照与扩容能力。

> 📚 延伸阅读：[Kubernetes 官方文档 - 持久卷](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

:::

#### 🔀 发散问题

- **Q：PV 与 PVC 的本质区别？** → 见本文档「Kubernetes 中的 Persistent Volume 和 Persistent Volume Claim 有什么区别？」。
- **Q：有状态应用如何绑定独立 PVC？** → 见本文档「Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？」。

## Helm

### 【中等】Kubernetes 中的 Helm 有什么作用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / Helm

#### 💎 关键结论

Helm 是 K8s 的包管理工具：把多资源清单打包为 Chart，一键安装/升级/回滚，模板化配置适配多环境，并自动处理依赖。

#### ⚡记忆卡片

- **口诀**：Chart 是包，Release 是实例；install 部署，rollback 救命
- **关键词**：Chart ／ Release ／ 模板化配置
- **链路**：Chart 模板 + values 参数 → helm install → 生成清单并部署

#### 📖 核心知识

Helm 作为 Kubernetes 包管理工具的核心作用：

- **应用打包**：将 Deployment、Service 等资源打包为「Chart」，便于分发复用
- **简化部署**：通过 `helm install` 一键部署，支持动态配置（`--set` 或 values 文件）
- **版本管理**：记录应用版本（Release），支持 `upgrade` 升级和 `rollback` 回滚
- **依赖管理**：自动处理应用间依赖，一键部署完整应用栈
- **模板化配置**：用 Go 模板分离配置与代码，适配多环境部署

适用于简化复杂 K8s 应用的管理，提升部署效率和可维护性。

#### 🔬 扩展知识

::: details

- 【L3】Helm 3 移除了服务端组件 Tiller，直接用 kubeconfig 权限与 apiserver 交互，简化了部署与权限模型。
- 【L4】可用 `helm template` 本地渲染清单做 Code Review，或在 CI 中用 `helm lint` 校验 Chart 质量。

> 📚 延伸阅读：[Helm 官方文档](https://helm.sh/docs/)

:::

#### 🔀 发散问题

- **Q：具体怎么部署应用？** → 见本文档「如何在 Kubernetes 中使用 Helm 部署应用？」。
- **Q：版本与回滚机制？** → 见本文档「Kubernetes 的 Helm Charts 如何实现应用的版本控制？」。

### 【中等】如何在 Kubernetes 中使用 Helm 部署应用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / Helm

#### 💎 关键结论

Helm 部署四步：加仓库 → 搜 Chart 并自定义 values → `helm install` 创建 Release → 用 upgrade/rollback/uninstall 管理生命周期；也可 `helm create` 开发自己的 Chart。

#### ⚡记忆卡片

- **口诀**：加库搜包改 values，install 上线，upgrade 升级，rollback 回滚
- **关键词**：helm repo ／ values 覆盖 ／ Release 生命周期
- **链路**：repo add → search → install/upgrade → history → rollback

#### 📖 核心知识

使用 Helm 在 Kubernetes 中部署应用的核心要点：

1. **准备工作**：安装 Helm 客户端，添加并更新 Chart 仓库（如 `helm repo add`）
2. **部署流程**：
   - 搜索 Chart（`helm search repo`）并查看配置（`helm show values`）
   - 自定义配置（通过 `values.yaml` 或 `--set` 参数覆盖默认值）
   - 部署应用（`helm install <release 名> <chart 名>`）
3. **管理操作**：
   - 升级（`helm upgrade`）：更新配置或 Chart 版本
   - 回滚（`helm rollback`）：基于历史版本（`helm history` 查看）恢复
   - 卸载（`helm uninstall`）：删除 Release 及相关资源
4. **自定义应用**：通过 `helm create` 生成 Chart 结构，编写模板和配置后部署本地 Chart

优势：简化多资源部署，支持配置分离、版本控制和一键回滚，提升管理效率。

#### 🔬 扩展知识

::: details

- 【L3】`helm upgrade --install` 幂等写法：不存在则安装、存在则升级，适合 CI/CD 流水线。
- 【L4】多环境可用 `-f values-prod.yaml` 叠加多份 values 文件，配合 Git 仓库实现 GitOps 管理。

> 📚 延伸阅读：[Helm 官方文档 - 使用 Helm](https://helm.sh/docs/intro/using_helm/)

:::

#### 🔀 发散问题

- **Q：Helm 解决什么问题？** → 见本文档「Kubernetes 中的 Helm 有什么作用？」。
- **Q：Release 的版本与依赖怎么管？** → 见本文档「Kubernetes 的 Helm Charts 如何实现应用的版本控制？」。

## 安全

### 【中等】Kubernetes 中如何进行安全配置？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 安全

#### 💎 关键结论

K8s 安全分五层：API 入口防护（TLS+RBAC）、Pod 安全上下文与资源限制、NetworkPolicy 网络隔离、镜像供应链安全、审计与监控，纵深防御缺一不可。

#### ⚡记忆卡片

- **口诀**：门禁（API）窗禁（网络）查身份（RBAC），货物（镜像）要安检，全程留监控
- **关键词**：RBAC ／ 安全上下文 ／ NetworkPolicy
- **链路**：API 防护 → Pod 运行时加固 → 网络隔离 → 供应链 → 审计监控

#### 📖 核心知识

- **集群级防护**：API Server 启用 TLS 加密 + IP 限制 + RBAC；kubelet 最小权限配置；用 Secrets / 外部工具（Vault）管理敏感信息
- **资源安全配置**：
  - Pod 安全上下文（禁止 root 运行、禁用权限提升等）
  - 用 Pod 安全标准 / 策略定义运行规则，设资源限制防耗尽
- **网络安全**：通过 NetworkPolicy 限制 Pod 间通信；服务网格（如 Istio）实现 mTLS 加密
- **镜像与供应链**：扫描镜像漏洞，用私有仓库 + 拉取密钥，禁止 `latest` 标签
- **审计与监控**：启用 API Server 审计日志，监控异常行为（如特权容器创建）

#### 🔬 扩展知识

::: details

- 【L3】Pod 安全准入（Pod Security Admission）已取代 PodSecurityPolicy，可按命名空间设置 privileged/baseline/restricted 三档标准。
- 【L4】零信任方向可引入服务网格 mTLS 全覆盖 + 证书自动轮转，供应链层面用镜像签名（如 cosign）与准入校验。

> 📚 延伸阅读：[Kubernetes 官方文档 - 安全](https://kubernetes.io/docs/concepts/security/)

:::

#### 🔀 发散问题

- **Q：网络隔离具体怎么写规则？** → 见本文档「Kubernetes 中的网络策略如何实现？」。
- **Q：权限控制机制？** → 见本文档「什么是 Kubernetes 中的 RBAC？」。
- **Q：敏感信息存储？** → 见本文档「Kubernetes 中的 ConfigMap 和 Secret 有什么作用？」。

## 工作负载

### 【中等】Kubernetes 中如何实现服务的自动伸缩？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 工作负载

#### 💎 关键结论

服务自动伸缩主要靠 HPA：根据 CPU/内存或自定义指标动态调整 Pod 副本数；前提是部署 Metrics Server 且 Pod 声明了 resources.requests。

#### ⚡记忆卡片

- **口诀**：HPA 看指标调副本，没 requests 不干活
- **关键词**：HPA ／ Metrics Server ／ min/maxReplicas
- **链路**：Metrics Server 采指标 → HPA 计算期望副本 → 调整 Deployment 副本数

#### 📖 核心知识

Kubernetes 中服务自动伸缩的核心要点：

- **核心实现**：通过 HPA（Horizontal Pod Autoscaler）实现，根据指标动态调整 Pod 副本数
- **配置要点**：
  - 关联目标控制器（Deployment/StatefulSet 等）
  - 设定副本数范围（minReplicas/maxReplicas）
  - 基于指标触发伸缩（CPU / 内存使用率或自定义指标）
- **依赖条件**：需部署 Metrics Server 收集指标，目标 Pod 需定义 resources.requests
- **作用**：动态适配负载变化，高峰扩容提升能力，低谷缩容节约资源，保障服务稳定性
- **扩展场景**：结合 Prometheus 等工具支持自定义指标（如每秒请求数）伸缩

#### 🔬 扩展知识

::: details

- 【L3】除水平伸缩（HPA）外，还有垂直伸缩 VPA（调整 requests/limits）和集群级伸缩 Cluster Autoscaler（节点不够时自动加节点）。
- 【L4】HPA v2 支持多指标与 behavior 字段控制扩缩速率（如缩容冷却窗口），避免抖动；指标型伸缩存在滞后性，突发流量可结合预热副本或 KEDA 事件驱动伸缩。

> 📚 延伸阅读：[Kubernetes 官方文档 - HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

:::

#### 🔀 发散问题

- **Q：requests/limits 设不好会怎样？** → 影响 QoS 与驱逐，见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。
- **Q：HPA 扩的是哪种控制器？** → 见本文档「Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？」。

### 【中等】Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？⭐⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kubernetes / 工作负载

#### 💎 关键结论

Deployment 管无状态：副本身份随机、并行滚动、共享存储；StatefulSet 管有状态：固定序号身份、每实例独立 PVC、严格有序扩缩与更新。选型看是否依赖稳定身份、独立存储或有序语义。

#### ⚡记忆卡片

- **口诀**：无状态 Deployment，有状态 StatefulSet；身份稳不稳、存储分不分、顺序严不严
- **关键词**：稳定身份 ／ 独立 PVC ／ 有序语义
- **链路**：判断状态依赖 → 选控制器 → 配存储与探针 → 验证失效场景

#### 📖 核心知识

Kubernetes 中 Deployment 与 StatefulSet 的核心区别：

- **适用场景**：
  - **Deployment**：适用于无状态应用（如 Web 服务），副本完全等价
  - **StatefulSet**：适用于有状态应用（如数据库），需稳定身份和存储
- **核心差异**：
  - **命名**：Deployment 随机命名，StatefulSet 固定序号命名（如 db-0、db-1）
  - **网络**：Deployment 共享 Service IP，StatefulSet 每个 Pod 有稳定 DNS
  - **存储**：Deployment 共享存储，StatefulSet 每个 Pod 绑定独立 PVC
  - **更新** / 扩缩容：Deployment 无序操作，StatefulSet 按序号严格执行
  - **自愈**：Deployment 重建后身份变化，StatefulSet 保持原身份

选择依据：应用是否依赖稳定身份、存储或有序部署 / 更新。

**方案权衡（选型边界）**

| 维度              | Deployment                                            | StatefulSet                                                        | 适用边界                                                          |
| :---------------- | :---------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------- |
| **实例身份**      | 随机后缀（`app-7d4b9c-x2f9p`），重建即变              | 固定序号（`db-0`、`db-1`），重建不变                               | 集群成员关系、主从选举依赖固定身份时必须用 StatefulSet            |
| **存储语义**      | 副本共享同一 PVC（需 ReadWriteMany），或各自 emptyDir | `volumeClaimTemplates` 为每个 Pod 创建独立 PVC，数据隔离且跟随 Pod | 每实例需要独占数据目录（MySQL 主从、ES 数据节点）时用 StatefulSet |
| **伸缩/更新顺序** | 完全并行                                              | 扩容 0→N 严格有序，缩容与滚动更新 N→0 逆序                         | 有主从依赖（从库需等主库先就绪）的中间件需要有序语义              |
| **运维成本**      | 低，滚动快                                            | 高，PVC 清理、有序排障、升级慢                                     | 无状态 Web 服务不要为了“看起来高级”而用 StatefulSet               |

#### 🔬 扩展知识

::: details

- 【L3】**失效场景（面试加分点）**
  - **PVC 不随 Pod 走**：StatefulSet 的 PVC 不会随 Pod 删除、缩容而自动删除，甚至 `kubectl delete statefulset` 后 PVC 依然保留。这是防误删数据的设计，但忘记清理就会变成“存储成本泄漏”，需手动清理或配置 `persistentVolumeClaimRetentionPolicy`（1.27 GA）。
  - **滚动更新卡死**：StatefulSet 逆序逐个更新，若 db-0 的新版本 readinessProbe 始终失败，整个更新会停在 db-0，不像 Deployment 还能并行推进。
  - **反向失效**：用 Deployment + 共享 PVC 硬跑有状态应用，多副本并发写同一数据目录，直接导致数据损坏。
- 【L4】**量化数据**
  - Deployment 滚动更新默认 `maxSurge: 25%`、`maxUnavailable: 25%`，即 10 副本一次最多并行替换约 2~3 个 Pod；StatefulSet 严格串行，升级总时长 ≈ N × 单 Pod 就绪时间，10 副本数据库每实例就绪需 30 秒时全量滚动要 5 分钟以上。
  - StatefulSet 缩容 / 删除耗时 ≈ N ×（`terminationGracePeriodSeconds` + 优雅退出时间），5 副本、宽限 60 秒的 ES 集群完整释放要 5 分钟以上，远慢于 Deployment 的并行终止。
  - Headless Service 下 `db-0.db-headless.ns.svc.cluster.local` 的 DNS 解析为毫秒级，身份寻址不依赖额外组件，这是 ZooKeeper、Kafka 选择 Headless Service 的原因。

> 📚 延伸阅读：[Kubernetes 官方文档 - StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

:::

#### 🏭 实战场景

::: details

**踩坑案例（生产事故）：MySQL 主从用 Deployment 部署导致主库“换人”**

- **现象**：某团队把自建 MySQL 主从迁到 K8s，某天凌晨发现主库“换人”，新主数据落后 3 小时，业务写入出现缺口。
- **排查**：该部署用的是 Deployment，节点故障后两个副本被随机重建；两者挂载同一个 NFS 共享卷，旧主重建后以从库身份连上新主，binlog 位点已经错乱。
- **根因**：Deployment 无稳定身份、无有序语义，主从角色靠“谁先起来谁当主”判定，存在脑裂风险；共享存储破坏了实例级数据隔离。
- **修复**：改为 StatefulSet + `volumeClaimTemplates` 每实例独立 PVC，引入 Orchestrator 做故障切换，readinessProbe 校验复制延迟（`Seconds_Behind_Master` 超过 30 秒即从读流量 Service 摘除）。

**场景题：有状态中间件（如 Elasticsearch）从虚拟机迁到 K8s，如何设计 StatefulSet、存储与探针配置保证数据安全？**

- **应急处理（迁移前兜底）**：先做全量快照（`elasticsearch snapshot` 备份到 S3/OSS 仓库），切换窗口内关闭分片自动分配（`cluster.routing.allocation.enable: none`），避免迁移期间触发分片迁移风暴。
- **核心风险**：ES 的数据安全依赖三点——每个节点数据目录独占、节点身份稳定（否则选主脑裂）、节点恢复数据期间不被误杀或误调度。
- **长期方案**：
  - **StatefulSet 设计**：`serviceName` 指向 Headless Service；`podManagementPolicy: Parallel` 加速扩缩容（更新仍保持有序）；master 角色至少 3 副本。
  - **存储**：`volumeClaimTemplates` 为每个节点绑定独立云盘（ReadWriteOnce），StorageClass 指定 SSD 类型；PV 回收策略设为 `Retain` 防误删；严禁多 Pod 共享 NFS。
  - **探针设计**：startupProbe 的 `failureThreshold × periodSeconds` 覆盖最长分片恢复时间（如 60 × 10 秒 = 10 分钟）；readinessProbe 调用 `/_cluster/health`，yellow 以上才接流量；livenessProbe 只检查进程自身存活且阈值放宽（`failureThreshold: 5`），防止 GC 停顿期间被误杀。
  - **调度**：podAntiAffinity 或 `topologySpreadConstraints`（`maxSkew: 1`）把节点分散到不同可用区。
- **权衡**：K8s 的自愈（故障自动重建）与有状态服务“别动我的数据”天然冲突，原则是“探针放宽、存储 Retain、备份兜底”；若团队没有存储插件运维经验，直接用云厂商托管 ES，自建与托管的长期成本差异常在一个数量级。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “StatefulSet 更高级，重要服务都用它” → 无状态服务用 StatefulSet 只会徒增运维成本（PVC 清理、有序升级慢），选型看状态依赖而非重要性。
- ❌ “Deployment + 共享 PVC 也能跑数据库” → 多副本并发写同一数据目录会直接损坏数据，有状态必须每实例独立 PVC。
- ❌ “删掉 StatefulSet，PVC 和数据就一起没了” → PVC 被刻意保留以防误删，需手动清理或用 `persistentVolumeClaimRetentionPolicy`。

:::

#### 🔀 发散问题

- **Q：StatefulSet 为什么配 Headless Service？** → Headless 为每个 Pod 提供独立 DNS 实现稳定身份，关联普通 ClusterIP 则无法定向访问特定实例；详见本文档「Kubernetes 中的 Service 有哪几种类型？」。
- **Q：StatefulSet 的 PVC 删除后怎么办？** → PVC 刻意保留防误删，自动清理可用 `persistentVolumeClaimRetentionPolicy`（1.23 beta、1.27 GA）或流水线显式删除。
- **Q：有状态服务的探针怎么配？** → startup 覆盖恢复窗口、readiness 控流量，见本文档「Kubernetes 中的探针有哪些类型？各有什么作用？」。
- **Q：ES 硬跑在 Deployment 上最坏会怎样？** → 身份随机 + 无专属存储导致成员关系抖动、共享卷写坏索引、主分片迁移风暴把集群打成 red。

### 【中等】Kubernetes 中的 Ingress 资源有什么作用？如何配置？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 网络

#### 💎 关键结论

Ingress 资源声明集群入口的 L7 路由规则：按域名/路径把 HTTP(S) 流量导向不同 Service，并可终结 TLS；规则生效的前提是部署 Ingress Controller 并用 ingressClassName 指定。

#### ⚡记忆卡片

- **口诀**：host 定域名，path 定路径，tls 挂证书，控制器先就位
- **关键词**：域名路由 ／ TLS 终结 ／ ingressClassName
- **链路**：Ingress 规则 → Controller 加载 → 按 host/path 转发 → 后端 Service

#### 📖 核心知识

Kubernetes 中 Ingress 资源的核心要点：

- **核心作用**：
  - 作为集群入口网关，统一管理外部对集群内服务的访问
  - 支持基于域名、路径的 HTTP/HTTPS 请求路由（如将不同域名请求转发到对应服务）
  - 实现 SSL 终结（集中管理 HTTPS 证书）和负载均衡
- **配置前提**：需部署 Ingress 控制器（如 Nginx Ingress Controller），否则规则不生效
- **关键配置**：
  - `ingressClassName`：指定使用的控制器
  - `rules`：定义路由规则（`host` 域名 + `paths` 路径，关联目标 Service）
  - `tls`：配置 HTTPS，通过 `secretName` 关联存储证书的 Secret
  - `pathType`：路径匹配类型（Prefix 前缀 / Exact 精确等）
- **示例场景**：基于域名（`web.example.com` 到 Web 服务）、路径（`/v1` 到 API v1 服务）的路由，或配置 HTTPS 加密访问

#### 🔬 扩展知识

::: details

- 【L3】证书可配合 cert-manager 自动签发与轮转；非 HTTP 协议（如 MySQL）可用 Ingress Controller 的 TCP/UDP 透传配置或单独 LoadBalancer。
- 【L4】Ingress Controller 是集群入口单点，需多副本 + 反亲和分散 + HPA 应对流量高峰，并监控 P99 延迟。

> 📚 延伸阅读：[Kubernetes 官方文档 - Ingress 资源](https://kubernetes.io/docs/concepts/services-networking/ingress/)

:::

#### 🔀 发散问题

- **Q：Ingress 和 Service 怎么分工？** → 见本文档「Kubernetes 中的 Service 和 Ingress 有什么区别？」。
- **Q：大量 HTTP 服务对外暴露怎么设计？** → 见本文档「Kubernetes 中的 Service 有哪几种类型？」中的暴露层次权衡。

### 【中等】Kubernetes 中的 DaemonSet 有什么作用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / 工作负载

#### 💎 关键结论

DaemonSet 确保所有（或指定标签的）节点上各运行一个 Pod 副本，专为节点级系统服务设计：监控、日志采集、网络/存储插件，并随节点增减自动伸缩。

#### ⚡记忆卡片

- **口诀**：一节点一副本，节点级服务专用；新节点自动补，无副本数概念
- **关键词**：每节点一份 ／ 节点级服务 ／ 自动适配
- **链路**：节点加入 → DaemonSet 自动拉起 Pod → 节点移除 → 自动清理

#### 📖 核心知识

Kubernetes 中 DaemonSet 的核心要点：

- **核心作用**：确保集群中（或指定标签的）所有节点上都运行且仅运行一个相同的 Pod 副本，专为节点级服务设计。
- **典型场景**：
  - 节点监控（如 Prometheus Node Exporter）
  - 日志收集（如 Fluentd）
  - 网络 / 存储插件的节点代理（如 Calico、Ceph 代理）
- **关键特性**：
  - 自动适配节点变化（新节点加入时自动部署，节点移除时自动清理）
  - 无需手动配置副本数（由符合条件的节点数量决定）
  - 支持通过 `nodeSelector` 等指定部署节点范围

适用于需要在每个节点上部署的系统级服务，简化底层支撑能力的统一管理。

#### 🔬 扩展知识

::: details

- 【L3】日志采集、CNI 类 DaemonSet 通常需要 hostNetwork、特权或挂载宿主机目录，这也是安全加固时要重点审计的对象。
- 【L4】DaemonSet 支持 RollingUpdate 与 OnDelete 更新策略；给关键系统 DaemonSet 配高 PriorityClass 与节点资源预留，避免被业务 Pod 挤掉。

> 📚 延伸阅读：[Kubernetes 官方文档 - DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

:::

#### 🔀 发散问题

- **Q：日志采集为什么用 DaemonSet？** → 见本文档「Kubernetes 中如何进行日志管理？」。
- **Q：DaemonSet 与 Deployment 的区别？** → 前者按节点维度铺副本，后者按副本数伸缩，选型见本文档「Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？」。

### 【中等】Kubernetes 中的 ReplicaSet 和 ReplicationController 有什么区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Kubernetes / 工作负载

#### 💎 关键结论

ReplicaSet 是 ReplicationController 的升级替代：核心差异在标签选择器——RS 支持集合选择器（matchExpressions），RC 只支持等值匹配；RS 是 Deployment 的底层依赖，RC 已逐步淘汰。

#### ⚡记忆卡片

- **口诀**：RS 能集合匹配，RC 只能等值；新集群只用 RS
- **关键词**：matchExpressions ／ apps/v1 ／ Deployment 底层
- **链路**：声明选择器 → RS 维持副本数 → Deployment 管理 RS 实现滚动

#### 📖 核心知识

Kubernetes 中 ReplicaSet 与 ReplicationController 的核心区别：

1. **核心差异：标签选择器**
   - ReplicationController：仅支持等值选择器（`matchLabels`），只能匹配标签完全一致的 Pod，灵活性低。
   - ReplicaSet：支持等值选择器（`matchLabels`）和集合选择器（`matchExpressions`），可通过表达式（如 `app in (nginx,web)`）实现复杂匹配，灵活性更高。
2. **其他区别**
   - API 版本：ReplicationController 使用 `v1`（老旧），ReplicaSet 使用 `apps/v1`（标准稳定版）。
   - 定位：ReplicaSet 是 ReplicationController 的升级替代方案，是 Deployment 的底层依赖，目前为推荐使用的副本管理组件；ReplicationController 已逐步淘汰。

选择建议：优先使用 ReplicaSet，仅在维护旧集群时考虑 ReplicationController。

#### 🔀 发散问题

- **Q：实际生产中谁在管理 ReplicaSet？** → Deployment 通过新旧 RS 实现滚动更新，见本文档「Kubernetes 中如何进行滚动更新和回滚？」。

### 【中等】Kubernetes 中的 Service 有哪几种类型？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kubernetes / 网络

#### 💎 关键结论

Service 四种基本类型：ClusterIP 集群内、NodePort 节点端口、LoadBalancer 云 LB 公网、ExternalName 外部域名映射，另有 Headless 服务 StatefulSet。选型看暴露层次与成本。

#### ⚡记忆卡片

- **口诀**：内用 ClusterIP，外测 NodePort，公网 LoadBalancer，外部域名 ExternalName，有状态用 Headless
- **关键词**：暴露层次 ／ kube-proxy ／ 成本权衡
- **链路**：客户端 → Service VIP → kube-proxy 规则（iptables/IPVS）→ 后端 Pod

#### 📖 核心知识

- **ClusterIP（默认）**：仅集群内访问，分配内部虚拟 IP；用于集群内服务通信（如前端调后端）。
- **NodePort**：每个节点开放静态端口（30000-32767），外部通过`节点 IP:NodePort`访问；含 ClusterIP 功能，适合临时外部测试。
- **LoadBalancer**：依赖云服务商负载均衡器，分配外部 IP；用于生产环境公网访问（需云环境支持）。
- **ExternalName**：将 Service 映射到外部域名（如 example.com），无 Pod 关联；用于访问集群外固定服务（如外部数据库）。
- **Headless Service（无头服务）**：不分配 ClusterIP，DNS 直接返回匹配 Pod IP 列表；适用于 StatefulSet 有状态应用（如数据库主从，需访问特定 Pod）。

核心作用：抽象 Pod 动态变化，提供稳定访问入口，适配不同内外网访问场景。

**方案权衡（暴露层次怎么选）**

| 方案             | 层次      | 成本                                             | 适用边界                             |
| :--------------- | :-------- | :----------------------------------------------- | :----------------------------------- |
| **ClusterIP**    | 集群内 L4 | 无                                               | 集群内互调的默认选择                 |
| **NodePort**     | 节点 L4   | 占用全集群端口段（默认 30000-32767，共 2768 个） | 测试环境；生产有端口冲突与暴露面风险 |
| **LoadBalancer** | 公网 L4   | 每个 Service 独占一个云 LB 实例，单独计费        | 少量需要公网直连的 TCP/UDP 服务      |
| **Ingress**      | 公网 L7   | 全集群共享 1~2 个 LB，按域名/路径路由            | 大量 HTTP(S) 服务，成本最优          |

生产决策示例：100 个 HTTP 微服务要对外暴露，若每个都建 LoadBalancer，就要申请 100 个 LB 实例，成本直接爆炸；正确做法是 Ingress + 1 个 LoadBalancer。

#### 🔬 扩展知识

::: details

- 【L3】**kube-proxy 实现深挖（面试重点）**：Service 的 L4 转发由各节点的 kube-proxy 落地，主流两种模式：
  - **iptables 模式**：每个 Service 及其 Endpoint 会生成约 5 条规则（KUBE-SERVICES / KUBE-SVC / KUBE-SEP 链），规则数随 Service × Endpoint 数量**线性膨胀**。万级 Service 集群规则数可达数十万条，`iptables-save` 一次要十几秒，数据包匹配是 O(n) 线性遍历，高并发下转发延迟明显上升。
  - **IPVS 模式**：内核专用模块，规则以哈希表存储，查找接近 O(1)，万级 Service 增量同步仅需毫秒级，还支持 rr、lc、sh 等 6 种负载均衡算法。**Service 数量超过 1000 的中大型集群应标配 IPVS**。
  - 量化参考：实测 5000 个 Service 时，iptables 模式 kube-proxy 全量同步规则约 11 秒，IPVS 模式小于 100ms；变更高峰期 iptables 模式的新建连接延迟可放大 2~3 倍。
- 【L4】**失效场景**
  - **长连接负载倾斜**：Service 默认按连接做负载均衡（iptables 随机、IPVS rr），gRPC、WebSocket 这类长连接服务会出现个别 Endpoint 承载 80% 流量的严重倾斜，需把均衡上移到 L7（Ingress / 服务网格）或客户端负载均衡。
  - **NodePort 陷阱**：流量可能从任一节点进入后经 iptables 跨节点二次转发，多一跳 SNAT；且 30000-32767 端口段全集群共享，两个 Service 抢端口是常见事故。
  - **LoadBalancer 一直 Pending**：裸金属集群没有云厂商 LB 集成，LoadBalancer 类型 Service 会永久 Pending，需部署 MetalLB 等组件补齐。

> 📚 延伸阅读：[Kubernetes 官方文档 - Service](https://kubernetes.io/docs/concepts/services-networking/service/)

:::

#### 🏭 实战场景

::: details

**踩坑案例（生产事故）：iptables 模式在万级 Service 下拖垮新建连接**

- **现象**：某集群 Service 数量涨到 8000 后，全集群 Pod 偶发 DNS 解析与新连接建立延迟 3~5 秒，且每次大规模发布 Service 变更时问题加剧。
- **排查**：观察发现变更瞬间 kube-proxy CPU 飙高；`time iptables-save | wc -l` 耗时 12 秒、规则超 40 万条；conntrack 表还频繁报 `nf_conntrack: table full`（默认上限随内存约每 GB 65536 条）。
- **根因**：kube-proxy 处于 iptables 模式，万级 Service 规模下每次变更都要全量重建规则，O(n) 匹配路径导致转发延迟，发布风暴放大了抖动。
- **修复**：kube-proxy 切换 IPVS 模式（逐节点滚动切换），`nf_conntrack_max` 调大到 1048576，并对 Service 数量与规则同步耗时建立监控告警，发布期延迟抖动消失。

**场景题：200 个 HTTP 微服务要对外暴露，只允许开放 80/443，怎么设计？**

- **应急处理**：临时联调可用 NodePort 顶一下，但必须登记回收时间，并核查安全组规则，避免测试端口长期暴露公网。
- **约束拆解**：端口只有 80/443、服务多达 200 个、协议清一色 HTTP(S)。NodePort 的 30000-32767 端口段不符合安全要求且数量不够；每服务一个 LoadBalancer 没有足够端口且成本不可接受——两个方案被约束直接排除。
- **长期方案**：部署 Nginx Ingress Controller（至少 2 副本 + podAntiAffinity 分散到不同节点），前面挂 1 个 LoadBalancer 或 VIP 占用 80/443，通过 Ingress 按域名（`a.example.com`、`b.example.com`）和路径路由到各后端 Service；TLS 在 Ingress 层集中终结，证书放 Secret 并由 cert-manager 自动轮转；少量非 HTTP 协议（如 MySQL 3306）单独走 LoadBalancer 或 Ingress Controller 的 TCP 透传配置。
- **权衡**：Ingress Controller 成为单点与流量瓶颈，必须以多副本 + HPA + P99 延迟监控兜底；若个别业务要求四层直通或极致延迟，可为其单独接受 LoadBalancer 成本。方案落地后先按 2 倍峰值压测再切生产流量。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “ExternalName 也能给 Pod 做负载均衡” → ExternalName 只是 DNS CNAME 映射到外部域名，无 Pod 关联、无转发规则。
- ❌ “裸金属集群 LoadBalancer 直接可用” → 没有云 LB 集成会永久 Pending，需 MetalLB 等实现。
- ❌ “gRPC 长连接挂在 Service 上流量自然均匀” → L4 按连接均衡，长连接会严重倾斜，需 L7 或客户端均衡。

:::

#### 🔀 发散问题

- **Q：ClusterIP 由谁分配、Pod 怎么发现 Service？** → ClusterIP 由 apiserver 从 `--service-cluster-ip-range` 网段分配，发现靠 CoreDNS 解析或环境变量注入（后者有启动顺序坑）。
- **Q：Endpoints 变更多久生效？滚动时为什么 502？** → 规则亚秒级生效，但 DNS 缓存拖长感知；502 根因是流量与就绪不同步，需 readinessProbe + preStop + 优雅关闭，见本文档「Kubernetes 中的探针有哪些类型？各有什么作用？」。
- **Q：externalTrafficPolicy: Local 得到什么牺牲什么？** → 得到真实源 IP 与低延迟，牺牲负载均匀性（仅本节点有 Endpoint 才接流量），节点故障时入口流量直接丢弃。
- **Q：HTTP 入口路由还能怎么做？** → 见本文档「Kubernetes 中的 Ingress 资源有什么作用？如何配置？」。

### 【中等】Kubernetes 的 Helm Charts 如何实现应用的版本控制？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / Helm

#### 💎 关键结论

Helm 版本控制双轨：Chart 版本（Chart.yaml 语义化版本）管模板，Release 版本（自动递增）管部署实例；helm history/rollback 实现全链路追踪与回滚，依赖用 Chart.lock 锁定。

#### ⚡记忆卡片

- **口诀**：Chart 管模板版本，Release 管部署版本；lock 锁依赖，history 可回溯
- **关键词**：Chart version ／ Release revision ／ Chart.lock
- **链路**：Chart 版本变更 → install/upgrade 生成 Release 版本 → history 追踪 → rollback 回退

#### 📖 核心知识

Helm Charts 实现应用版本控制的核心机制：

- **Chart 版本管理**：通过 `Chart.yaml` 的 `version` 字段（语义化版本）标识模板本身版本，内容变更时同步更新版本号。
- **Release 版本控制**：
  - 每个部署实例（Release）有独立版本号（自动递增），记录当前 Chart 版本、配置参数和资源状态。
  - 可通过 `helm history` 查看所有版本记录，用 `helm rollback` 回滚到指定版本。
- **配置与依赖管理**
  - 配置（`values.yaml`）与模板分离，不同环境配置独立管理，变更随 Release 版本记录。
  - 依赖通过 `Chart.yaml` 声明版本范围，`Chart.lock` 锁定实际安装版本，确保部署一致性。

核心价值：实现从应用模板到部署实例的全链路版本追踪，支持安全升级与快速回滚，简化 Kubernetes 应用的版本管理。

#### 🔬 扩展知识

::: details

- 【L3】Chart 仓库（ChartMuseum、OCI 仓库）可按版本分发，CI 中可对同一 Chart 多版本并存发布与灰度。
- 【L4】配合 GitOps 工具（Argo CD 等）时，Helm 版本与 Git 提交双重追溯，回滚可精确到提交粒度。

> 📚 延伸阅读：[Helm 官方文档 - Chart 最佳实践](https://helm.sh/docs/chart_best_practices/)

:::

#### 🔀 发散问题

- **Q：Helm 部署流程是什么？** → 见本文档「如何在 Kubernetes 中使用 Helm 部署应用？」。
- **Q：Helm 回滚与 Deployment 回滚什么关系？** → Helm 回滚重新应用历史渲染结果，底层仍触发 Deployment 滚动，见本文档「Kubernetes 中如何进行滚动更新和回滚？」。

## 任务调度

### 【中等】Kubernetes 中的 Job 和 CronJob 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Kubernetes / 任务调度

#### 💎 关键结论

Job 管单次任务：确保指定数量 Pod 成功完成后退出；CronJob 管周期任务：按 cron 表达式定时触发 Job，本质是 Job 的定时调度器。

#### ⚡记忆卡片

- **口诀**：一次性用 Job，定时用 CronJob；Job 保成功，CronJob 保准时
- **关键词**：completions/parallelism ／ cron schedule ／ jobTemplate
- **链路**：cron 表达式触发 → 创建 Job → Job 创建 Pod → 成功数达标则完成

#### 📖 核心知识

Kubernetes 中 Job 和 CronJob 均用于管理短期运行的任务型工作负载，核心区别在于执行时机和调度方式：

- Job 适用于**单次运行**的任务，强调任务的成功完成；
- CronJob 适用于**周期性重复**的任务，通过时间规则自动触发 Job，本质是 Job 的定时调度器。

两者均专注于短期任务（区别于长期运行的 Deployment），但在执行时机和周期上有明确分工。

**关键特性差异**

| 特性         | Job                                                           | CronJob                                                                       |
| ------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **执行方式** | 手动触发或部署后立即执行                                      | 按 cron 表达式自动定时触发（如 `0 3 * * *` 表示每天凌晨 3 点）                |
| **任务周期** | 一次性完成，执行结束后终止                                    | 周期性重复执行，按调度规则循环触发新 Job                                      |
| **核心配置** | 指定完成的 Pod 数量（`completions`）、并行数（`parallelism`） | 包含 cron 表达式（`schedule`）、任务模板（`jobTemplate`）、历史任务保留策略等 |

**配置示例对比**

Job（一次性任务）：

```yml
apiVersion: batch/v1
kind: Job
metadata:
  name: backup-job
spec:
  completions: 1 # 需成功完成 1 个 Pod
  parallelism: 1 # 并行执行 1 个 Pod
  template:
    spec:
      containers:
        - name: backup
          image: backup-tool:v1
          command: ['backup', '/data']
      restartPolicy: Never # 失败后不重启，由 Job 重新创建 Pod
```

CronJob（定时任务）：

```yml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: log-cleanup-cronjob
spec:
  schedule: '0 3 * * *' # 每天凌晨 3 点执行
  jobTemplate: # 嵌套 Job 配置
    spec:
      template:
        spec:
          containers:
            - name: cleaner
              image: cleanup-tool:v1
              command: ['clean', '/logs']
          restartPolicy: Never
  successfulJobsHistoryLimit: 3 # 保留 3 个成功历史任务
  failedJobsHistoryLimit: 1 # 保留 1 个失败历史任务
```

#### 🔬 扩展知识

::: details

- 【L3】Job 的 restartPolicy 只能是 Never 或 OnFailure（不支持 Always）；`backoffLimit` 控制失败重试次数，超限后 Job 标记失败。
- 【L4】CronJob 可配 `concurrencyPolicy`（Allow/Forbid/Replace）控制任务堆叠；`startingDeadlineSeconds` 错过调度窗口后放弃，避免任务堆积。

> 📚 延伸阅读：[Kubernetes 官方文档 - Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

:::

#### 🔀 发散问题

- **Q：定时任务日志怎么看、失败怎么查？** → 与 Pod 排查思路一致，见本文档「Pod 一直处于 CrashLoopBackOff，如何排查？」。
- **Q：任务型 Pod 的资源限制？** → 同样受配额与 QoS 约束，见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。

### 【中等】Kubernetes 中的 Persistent Volume 和 Persistent Volume Claim 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 存储

#### 💎 关键结论

PV 是存储资源本身（管理员提供，集群级），PVC 是对存储的请求（开发者声明，命名空间级）；K8s 负责把两者绑定，动态供给用 StorageClass 自动创建 PV。

#### ⚡记忆卡片

- **口诀**：PV 是仓库，PVC 是申请单；管理员建仓，开发者递单
- **关键词**：资源 vs 请求 ／ 集群级 vs 命名空间级 ／ 静态 vs 动态供给
- **链路**：管理员定义 PV/StorageClass → 开发者提交 PVC → 系统绑定 → Pod 使用

#### 📖 核心知识

- **PV** 是**具体的存储资源**，如一块云硬盘或 NFS 目录。相当于一个**仓库**。
- **PVC** 是用户对存储的**抽象请求**，如“我需要 10Gi 可读写的存储”。相当于一份**仓储申请单**。

Kubernetes 的作用是将 PVC（申请单）与合适的 PV（仓库）进行绑定，供 Pod（用户）使用。

**核心区别对比**

| 特性         | Persistent Volume (PV)                 | Persistent Volume Claim (PVC)      |
| :----------- | :------------------------------------- | :--------------------------------- |
| **本质**     | **存储资源本身**                       | **对存储的请求**                   |
| **创建者**   | **集群管理员**（或由系统自动创建）     | **应用开发者**                     |
| **作用范围** | **集群级别**资源，不属于任何命名空间   | **命名空间级别**资源               |
| **关注点**   | **“如何提供”**（如 NFS、云硬盘、容量） | **“需要什么”**（如容量、访问模式） |

**两种供给模式**

- **静态供给**：管理员预先创建好一批 PV，PVC 从现有 PV 池中申请绑定。
- **动态供给（推荐）**：管理员创建 **StorageClass**（存储类）。当用户创建 PVC 并指定 `storageClassName` 时，系统**自动按需创建**对应的 PV。这是云环境中的标准做法。

**核心价值：职责分离**

- **管理员**：负责底层存储基础设施（PV/StorageClass）。
- **开发者**：只需通过 PVC 声明存储需求，无需关心后端细节。

#### 🔬 扩展知识

::: details

- 【L3】绑定需同时满足容量、accessModes、storageClassName 等条件；PVC 与 PV 一对一绑定，Pod 删除后 PVC 与数据默认保留。
- 【L4】云环境下可结合卷快照（VolumeSnapshot）与在线扩容（allowVolumeExpansion）做备份与容量治理。

> 📚 延伸阅读：[Kubernetes 官方文档 - 持久卷生命周期](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#lifecycle-of-a-volume-and-claim)

:::

#### 🔀 发散问题

- **Q：具体怎么一步步配置？** → 见本文档「Kubernetes 中如何实现持久化存储？」。
- **Q：有状态应用如何每实例一份 PVC？** → volumeClaimTemplates，见本文档「Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？」。

## 网络策略

### 【中等】Kubernetes 中的网络策略如何实现？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 网络策略

#### 💎 关键结论

NetworkPolicy 是基于标签的 Pod 级防火墙，采用白名单模型：Pod 未被选中时全通，被选中后入站默认拒绝；生效前提是网络插件（Calico/Cilium）支持。

#### ⚡记忆卡片

- **口诀**：无策全通，有策白名单；入站默认拒，出站默认放
- **关键词**：白名单 ／ podSelector ／ Ingress/Egress
- **链路**：定义策略 → 网络插件下发规则 → 按标签/命名空间/IP 段放行或拒绝

#### 📖 核心知识

**网络策略是一种基于规则的防火墙**，用于控制 Pod 之间的网络流量。它采用 **“默认允许，有策则拒”** 的白名单模型。

- **前提**：集群的**网络插件必须支持 NetworkPolicy**（如 Calico、Cilium），否则策略不生效。
- **本质**：基于标签的 Pod 级防火墙。
- **模型**：白名单。规则之外的流量被拒绝。
- **价值**：实现**网络微隔离**，是 Kubernetes 安全的重要基石。

**核心规则模型**

- **无策略状态**：Pod 未被任何 NetworkPolicy 选中时，**允许所有入站和出站流量**。
- **有策略状态**：一旦 Pod 被某个策略选中，则：
  - **入站流量**：默认被拒绝，除非在 `ingress` 规则中明确允许。
  - **出站流量**：默认仍被允许，除非在 `egress` 规则中明确限制。

**NetworkPolicy 关键组成部分**

一个策略主要定义四部分：

- **`podSelector`**：**此策略应用于哪些 Pod**（通过标签选择）。
- **`policyTypes`**：策略类型（`Ingress`， `Egress`，或两者）。
- **`ingress`**：**允许的入站**流量来源（`from`）和端口（`ports`）。
- **`egress`**：**允许的出站**流量目标（`to`）和端口（`ports`）。

**流量来源/目标可以是**

- `podSelector`：同一命名空间内的其他 Pod。
- `namespaceSelector`：特定命名空间下的 Pod。
- `ipBlock`：外部 IP 地址段（CIDR）。

**经典场景示例**

场景一：禁止所有入站流量（最基础的安全加固）

```yml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  podSelector: {} # 选择本命名空间所有 Pod
  policyTypes:
    - Ingress
  # ingress 规则为空，表示拒绝所有入站连接
```

场景二：只允许特定前端访问后端 API

```yml
---
spec:
  podSelector:
    matchLabels:
      app: backend # 策略作用于后端 Pod
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend # 只允许来自前端 Pod 的流量
      ports:
        - port: 8080 # 只开放 8080 端口
```

#### 🔬 扩展知识

::: details

- 【L3】出站限制会连带影响 DNS（默认 53 端口），配 egress 白名单时必须放行 CoreDNS，否则 Pod 解析全部失败。
- 【L4】微隔离可自底向上推进：先 deny-all，再逐业务加白名单；Cilium 还支持基于 L7（HTTP 方法/路径）的策略。

> 📚 延伸阅读：[Kubernetes 官方文档 - Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

:::

#### 🔀 发散问题

- **Q：网络隔离在安全体系中的位置？** → 见本文档「Kubernetes 中如何进行安全配置？」。
- **Q：跨命名空间放行怎么写？** → 用 namespaceSelector 配合标签，与命名空间隔离设计相关，见本文档「Kubernetes 中的 Namespace 有什么作用？」。

## 探针与健康检查

### 【中等】Kubernetes 中的探针有哪些类型？各有什么作用？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kubernetes / 健康检查

#### 💎 关键结论

三类探针：liveness 决定是否重启，readiness 决定是否接流量，startup 保护慢启动容器。原则：liveness 要保守（只探自身），readiness 可严格（可探依赖），重启代价高、摘流量代价低。

#### ⚡记忆卡片

- **口诀**：活着看 liveness，接活看 readiness，启动慢靠 startup 兜底
- **关键词**：重启 vs 摘流量 ／ httpGet/exec/tcpSocket ／ 阈值参数
- **链路**：kubelet 周期探测 → 连续失败超阈值 → 重启容器或摘出 Endpoints

#### 📖 核心知识

**探针（Probe）** 是 K8s 检测 Pod 中容器状态的机制，用于决定是否重启容器或是否将流量路由到容器。

| 探针类型           | 作用                                           | 失败行为                  |
| :----------------- | :--------------------------------------------- | :------------------------ |
| **livenessProbe**  | 检测容器是否**存活**                           | 失败则**重启**容器        |
| **readinessProbe** | 检测容器是否**就绪**（可接收流量）             | 失败则从 Service **摘除** |
| **startupProbe**   | 检测容器是否**已启动**（禁用其他探针直到成功） | 失败则**重启**容器        |

**探针检测方式**

| 方式        | 说明                                      |
| :---------- | :---------------------------------------- |
| `httpGet`   | 发送 HTTP GET 请求，状态码 200-399 为成功 |
| `tcpSocket` | 尝试 TCP 连接，连接成功为成功             |
| `exec`      | 执行命令，退出码 0 为成功                 |
| `grpc`      | gRPC 健康检查（K8s 1.24+）                |

```yaml
spec:
  containers:
    - name: app
      livenessProbe:
        httpGet:
          path: /healthz
          port: 8080
        initialDelaySeconds: 15 # 容器启动后等待 15 秒才开始探测
        periodSeconds: 10 # 每 10 秒探测一次
        failureThreshold: 3 # 连续 3 次失败才判定为不健康
      readinessProbe:
        httpGet:
          path: /ready
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 5
      startupProbe:
        httpGet:
          path: /healthz
          port: 8080
        failureThreshold: 30 # 最多等 30 次探测（配合 periodSeconds）
        periodSeconds: 10
```

**方案权衡：三种探针怎么分工**

- **livenessProbe**：解决“活着但不能干活”（死锁、无限循环），失败代价是**重启容器，代价高**，所以要保守：探测路径只检查进程自身，绝不探下游依赖（DB、Redis），否则下游抖动会连锁杀死自己。
- **readinessProbe**：解决“还不能接流量”（预热中、缓存加载中），失败只是**从 Service Endpoints 摘除，代价低**，所以可以严格：依赖健康度、初始化状态都该放这里。
- **startupProbe**：解决“启动慢”，成功后才把控制权交给另外两个探针；慢启动应用不配 startupProbe，就只能靠无限加大 `initialDelaySeconds` 赌博。

决策口诀：**重启能解决的故障给 liveness，能不能接流量给 readiness，启动期保护给 startupProbe**。

**最佳实践**：

- 所有生产 Pod **必须配置** livenessProbe + readinessProbe。
- 启动慢的应用使用 **startupProbe** 避免被 liveness 误杀。
- readinessProbe 的 `initialDelaySeconds` 应略大于应用启动时间。

#### 🔬 扩展知识

::: details

- 【L3】**量化参数（默认值与调优）**

| 参数                  | 默认值 | 说明                                             |
| :-------------------- | :----- | :----------------------------------------------- |
| `initialDelaySeconds` | 0      | 容器启动后等多少秒才开始探测                     |
| `periodSeconds`       | **10** | 探测间隔（最小 1）                               |
| `timeoutSeconds`      | **1**  | 单次探测超时，极易踩坑，慢接口必须调大           |
| `failureThreshold`    | **3**  | 连续失败多少次判定失败                           |
| `successThreshold`    | 1      | 仅对 readiness 有意义，liveness/startup 必须为 1 |

  默认配置下，一个容器从探测失败到触发动作至少需要 3 × 10 = 30 秒。
- 【L4】**失效场景**
  - **readinessProbe 过激进引发滚动雪崩**：`periodSeconds: 1` + `failureThreshold: 1`，新 Pod 预热时接口瞬间超时，被全部摘出 Endpoints，流量压回旧 Pod → 旧 Pod 也被摘 → **Service 无可用 Endpoint，滚动更新雪崩**。
  - **liveness 的 timeoutSeconds 过短**：GC 或高负载下接口耗时 2 秒 > 默认超时 1 秒 → 判失败 → 重启 → 冷启动负载更重 → 反复被杀成 CrashLoopBackOff 正反馈环。
  - **liveness 探下游依赖**：探测路径检查 DB 连通性，DB 一抖动，该服务所有 Pod 同时被重启，把“局部故障”放大成“服务整体不可用”。

> 📚 延伸阅读：[Kubernetes 官方文档 - Probe](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)

:::

#### 🏭 实战场景

::: details

**踩坑案例（生产事故）：liveness 超时把慢启动 Java 服务杀成 CrashLoopBackOff**

- **现象**：某 Java 服务每次发布后全部 Pod 进入 CrashLoopBackOff，发布系统自动回滚后恢复，被当作“坏版本”压下去，几周后再次发布复现。
- **排查**：`kubectl describe pod` 看到重启原因是 Liveness probe failed；应用日志显示每次重启都发生在启动后 40 秒左右；探测接口 `/healthz` 平时 200ms 返回，但冷启动期间因缓存预热 + JIT 编译会超过 2 秒。
- **根因**：livenessProbe 的 `timeoutSeconds` 用了默认 1 秒，`initialDelaySeconds` 只设了 15 秒，而真实启动需要 30~40 秒，冷启动探测超时后连续 3 次（`failureThreshold: 3`）即被杀；重启后缓存又是冷的，再次被杀，形成循环。
- **修复**：增加 startupProbe（`failureThreshold: 30` × `periodSeconds: 10`，覆盖 5 分钟启动窗口），livenessProbe 的 `timeoutSeconds` 调到 3 秒，并把缓存预热逻辑挪到 readinessProbe 判定中，之后发布再未复现。

**场景题：订单服务滚动更新期间间歇性 502，约每 3 分钟一次，怎么定位和解决？**

- **应急处理**：先把 Deployment 的滚动参数改为 `maxSurge: 1、maxUnavailable: 0` 降低单批替换幅度，必要时暂停发布、回滚到上一版本止血。
- **根因分析（三个最可疑点）**：① 新 Pod 的 readinessProbe 通过但预热未完成，满负载流量直接打进来；② 旧 Pod 被摘除 Endpoints 的同时收到 SIGTERM，在途请求被切断；③ 客户端长连接 / DNS 缓存仍指向已终止的旧 Pod。用 `kubectl get endpoints -w` 对照访问日志时间戳定位：502 集中在新 Pod Ready 后 1~2 秒内，是①；集中在旧 Pod 终止前最后几秒，是②。
- **长期方案**：新 Pod 侧把预热完成纳入 readinessProbe（预热不完不接流量）；旧 Pod 侧加 `preStop: sleep 10` 覆盖 Endpoint 传播 + DNS 缓存窗口；滚动参数恢复默认 `maxSurge: 25%、maxUnavailable: 25%`，并配 PDB 保证最小可用副本数。
- **权衡**：`preStop` 会拉长整体滚动时长（每批多 10 秒左右），用发布速度换零中断，对核心无状态服务这笔交易值得；若服务预热特征明显，可进一步引入服务网格或 LB 的慢启动权重能力，让新实例流量逐步爬升。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “liveness 探得越全越好，顺便探下游依赖” → 下游一抖动所有 Pod 同时被重启，局部故障放大成整体不可用；liveness 只探进程自身。
- ❌ “timeoutSeconds 默认 1 秒够用” → GC/高负载下探测超时会被误判，慢接口必须调大，否则形成重启正反馈环。
- ❌ “readiness 阈值调小能更快发现问题” → `failureThreshold: 1` 易引发新 Pod 预热期被全量摘除的滚动雪崩。

:::

#### 🔀 发散问题

- **Q：readiness 失败后存量流量多久排干？** → Endpoint 摘除亚秒级生效，但客户端 DNS 缓存（CoreDNS TTL 30 秒、JVM 默认无限缓存）会拖长，需 `terminationGracePeriodSeconds` + `preStop sleep` 兜底。
- **Q：exec 探针在高密度节点要注意什么？** → 每次探测 fork + exec 一个进程，100 Pod 节点 + 5 秒间隔意味着每秒 20 个进程开销；高密度优先 httpGet，exec 间隔建议 30 秒以上。
- **Q：startupProbe 成功后另两个探针立即接管有什么坑？** → 窗口设得太短慢启动应用照样被杀；应取“最长启动时间 × 2”作为安全边界。
- **Q：探针失败导致的重启状态怎么看？** → 见本文档「Pod 一直处于 CrashLoopBackOff，如何排查？」。

## 调度策略

### 【困难】Kubernetes 中 Pod 的调度策略有哪些？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Kubernetes / 调度

#### 💎 关键结论

调度五件套：nodeSelector 简单匹配、nodeAffinity 表达式、Pod 亲和/反亲和聚散、污点容忍独占推开、topologySpreadConstraints 均匀打散。硬约束决定能不能去，软约束决定去哪更好。

#### ⚡记忆卡片

- **口诀**：拉用亲和，推用污点；硬约束管 Pending，软约束管打分
- **关键词**：nodeAffinity ／ taint-toleration ／ topologySpreadConstraints
- **链路**：过滤（Filtering）淘汰不合格节点 → 打分（Scoring）选最高分 → 绑定

#### 📖 核心知识

K8s 调度器（kube-scheduler）根据多种策略将 Pod 分配到合适的节点：

| 调度策略         | 配置方式               | 说明                                              |
| :--------------- | :--------------------- | :------------------------------------------------ |
| **节点选择器**   | `nodeSelector`         | 简单匹配节点标签                                  |
| **节点亲和性**   | `nodeAffinity`         | 支持更复杂的表达式匹配（`In`、`NotIn`、`Exists`） |
| **Pod 亲和性**   | `podAffinity`          | 将 Pod 调度到与特定 Pod 相同的节点/区域           |
| **Pod 反亲和性** | `podAntiAffinity`      | 将 Pod 调度到**不同**节点（实现高可用分散部署）   |
| **污点和容忍**   | `taint` / `toleration` | 节点“排斥” Pod，除非 Pod 声明“容忍”该污点         |

**典型场景**：

```yaml
# Pod 反亲和性：确保同一应用的 Pod 不在同一节点
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: my-app
        topologyKey: kubernetes.io/hostname

# 污点容忍：将关键 Pod 调度到专用节点
tolerations:
  - key: 'dedicated'
    operator: 'Equal'
    value: 'gpu'
    effect: 'NoSchedule'
```

**方案权衡：什么约束用什么工具**

| 需求                         | 首选                               | 理由                                                |
| :--------------------------- | :--------------------------------- | :-------------------------------------------------- |
| 简单“调度到 GPU 节点”        | `nodeSelector`                     | 一行配置，可维护性最好                              |
| “尽量去可用区 A，不行也行”   | `nodeAffinity` 软约束（preferred） | 硬约束不满足直接 Pending，软约束只是降分            |
| 同一应用多副本打散到不同节点 | `podAntiAffinity`                  | 能表达“和我的其他副本不同拓扑”                      |
| 独占节点给某业务             | taint + toleration                 | nodeAffinity 只能“拉”，污点还能“推开”别的 Pod       |
| 跨可用区均匀分布             | `topologySpreadConstraints`        | 反亲和只保证“不同”，打散约束才保证“均匀”（maxSkew） |

**硬约束 vs 软约束**：`requiredDuringSchedulingIgnoredDuringExecution` 是硬约束，不满足则 Pod **永久 Pending**；`preferredDuringSchedulingIgnoredDuringExecution` 是软约束，调度器按权重（1~100）打分，都不满足也能调度。注意两者都只在调度时生效（IgnoredDuringExecution），运行中节点标签变化不会驱逐 Pod。

#### 🔬 扩展知识

::: details

- 【L3】**失效场景**
  - **亲和性过严导致 Pending**：podAntiAffinity 硬约束 + `topologyKey: kubernetes.io/hostname`，集群只有 3 个节点却要 4 副本，第 4 个 Pod 永久 Pending，`kubectl describe` 报 `didn't match pod anti-affinity rules`。
  - **污点忘摘**：给节点打污点做维护，恢复后忘记清除，没有容忍度的业务 Pod 调度不上去，集群容量被隐性缩水。
  - **资源不匹配**：亲和规则全部满足，但 requests 超过节点剩余可分配资源，同样 Pending——排查时先看 describe 的 Events，别靠猜。
- 【L4】**量化数据**
  - `preferred` 亲和的打分权重范围 1~100；`topologySpreadConstraints` 的 `maxSkew: 1` 表示任意两个拓扑域副本数差 ≤ 1。
  - kube-scheduler 在千节点规模集群的吞吐约 100 Pod/秒，单个 Deployment 一次扩容 500 副本时，全部绑定完成需 5~10 秒，期间 Pod 处于 Pending。
  - 节点不可达（unreachable）时，Pod 默认容忍 300 秒（`tolerationSeconds`）才会被驱逐重建，这是“节点故障后 Pod 迟迟不迁移”的量化解释。

> 📚 延伸阅读：[Kubernetes 官方文档 - 调度与驱逐](https://kubernetes.io/docs/concepts/scheduling-eviction/)

:::

#### 🏭 实战场景

::: details

**踩坑案例（调度倾斜引发节点 OOM）**

- **现象**：某集群一个节点每天凌晨触发 OOM，节点上的 Pod 被批量驱逐到别的节点，引发连锁资源紧张。
- **排查**：调度事件显示，一批离线计算 Pod 用 `preferred` 节点亲和（权重 100）倾向该节点的 `high-memory=true` 标签，且没设任何资源 limits，调度器按打分把它们全部堆到这一台。
- **根因**：软亲和 + BestEffort QoS（无 requests/limits）+ 无分散约束三者叠加，凌晨批任务集中调度时单机内存被打穿，kubelet 按 QoS 顺序批量驱逐。
- **修复**：批任务统一声明 requests = limits（升为 Guaranteed），加 `topologySpreadConstraints`（`maxSkew: 1`）与 Pod 反亲和限制单机堆叠数量，并用 ResourceQuota 限制命名空间内存总量。

**场景题：3 个可用区部署 6 副本关键服务，要求每区至少 1 副本、尽量均匀、绝不调度到维护节点，怎么写配置？**

- **应急处理**：若当前已有可用区故障，先 `kubectl cordon` 确认节点状态与现有 Pod 分布，确保剩余两个可用区能承接全部流量后再做变更。
- **需求拆解**：要求分三层——可用区间均匀（打散约束）、避开维护节点（污点/容忍）、最低可用性保障（PDB）。注意 podAntiAffinity 表达不了“每个可用区至少 1 个”，它只能说“不要和别的副本同域”，必须用 topologySpreadConstraints。
- **长期方案**（关键配置）：

```yaml
topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule # 硬保证跨可用区均匀
    labelSelector:
      matchLabels:
        app: critical-svc
# 不声明任何 toleration，自然避开运维打的维护污点（maintain=true:NoSchedule）
```

  同时配置 PDB（`minAvailable: 4`），防止滚动更新或主动驱逐一次性打挂超过 1/3 副本；维护节点由运维流程统一打 `maintain=true:NoSchedule` 污点，恢复后摘除。
- **权衡**：`whenUnsatisfiable: DoNotSchedule` 的代价是——某可用区整体故障时，新 Pod 会因无法保持均匀而 Pending，这是“宁缺毋滥”的正确行为（防止全部挤进单区），但必须配 Pending 告警；若业务要求“先跑起来再说”，改为 `ScheduleAnyway`（软约束），并依赖后续重平衡修复分布。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “podAntiAffinity 能保证均匀分布” → 反亲和是布尔判断“同或不同”，3 节点 3 副本分布成 2:1:0 也满足；均匀需 topologySpreadConstraints 的 maxSkew。
- ❌ “满足亲和规则还 Pending，一定是亲和写错了” → 很可能是 requests 超过节点剩余可分配资源，先看 describe Events 再下结论。
- ❌ “NoSchedule 污点会赶走已运行的 Pod” → NoSchedule 只阻止新 Pod 调度；会立即驱逐已运行 Pod 的是 NoExecute（配合 tolerationSeconds 可延迟）。

:::

#### 🔀 发散问题

- **Q：调度分哪两个阶段，亲和性分别在哪起作用？** → 过滤（硬约束淘汰节点）与打分（软约束加权求和选最高分），排查 Pending 只看过滤阶段失败原因。
- **Q：NoExecute 和 NoSchedule 本质区别？** → NoExecute 会立即驱逐不容忍的已运行 Pod；`tolerationSeconds` 可延迟驱逐，典型用于容忍节点 unreachable 300 秒避免迁移风暴。
- **Q：调度与驱逐顺序有什么关系？** → 资源声明决定 QoS 等级，见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。
- **Q：每节点必跑一个副本用什么机制？** → 见本文档「Kubernetes 中的 DaemonSet 有什么作用？」。

## RBAC

### 【中等】什么是 Kubernetes 中的 RBAC？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 权限

#### 💎 关键结论

RBAC 是基于角色的访问控制：用 Role/ClusterRole 定义权限规则，用 RoleBinding/ClusterRoleBinding 把规则绑给用户/组/ServiceAccount，遵循最小权限原则。

#### ⚡记忆卡片

- **口诀**：Role 定规则，Binding 绑主体；命名空间看 Role，集群看 ClusterRole
- **关键词**：Role ／ Binding ／ 最小权限
- **链路**：定义 Role → RoleBinding 绑定主体 → apiserver 鉴权放行或拒绝

#### 📖 核心知识

**RBAC（Role-Based Access Control）** 是基于角色的访问控制机制，用于管理谁可以对 K8s 资源执行什么操作。

**四大核心对象**

| 对象                   | 作用域     | 说明                                 |
| :--------------------- | :--------- | :----------------------------------- |
| **Role**               | 命名空间内 | 定义命名空间内的权限规则             |
| **RoleBinding**        | 命名空间内 | 将 Role 绑定到用户/组/ServiceAccount |
| **ClusterRole**        | 集群级别   | 定义集群级别的权限规则               |
| **ClusterRoleBinding** | 集群级别   | 将 ClusterRole 绑定到用户/组         |

**最小权限原则**：只授予用户/服务账户完成其任务所需的**最少权限**。

#### 🔬 扩展知识

::: details

- 【L3】ClusterRole 也可通过 RoleBinding 在单个命名空间内复用，实现“一套规则多空间绑定”；Pod 内的权限来自其 ServiceAccount，默认 default SA 应关闭自动挂载（automountServiceAccountToken: false）。
- 【L4】可用 `kubectl auth can-i <verb> <resource> --as=<user>` 验证权限；审计日志能回溯“谁在什么时候做了什么”，是权限治理的闭环手段。

> 📚 延伸阅读：[Kubernetes 官方文档 - RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

:::

#### 🔀 发散问题

- **Q：RBAC 与命名空间怎么配合？** → 见本文档「Kubernetes 中的 Namespace 有什么作用？」。
- **Q：RBAC 在安全体系中的位置？** → 见本文档「Kubernetes 中如何进行安全配置？」。

## Pod 驱逐与 QoS

### 【中等】Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / QoS

#### 💎 关键结论

QoS 是 K8s 的资源保护等级，由 requests/limits 声明决定：Guaranteed 最后驱逐、Burstable 居中、BestEffort 最先驱逐；节点压力时 kubelet 按 QoS + 超用程度排序驱逐。

#### ⚡记忆卡片

- **口诀**：声明全且等是保级，只申 requests 是突级，啥都不设最先死
- **关键词**：Guaranteed ／ Burstable ／ BestEffort
- **链路**：节点压力超阈值 → kubelet 按 QoS 排序驱逐 → 控制器在别的节点重建

#### 📖 核心知识

Kubernetes 根据 Pod 的资源声明将其划分为三个 **QoS 等级**，决定资源紧张时的驱逐优先级：

| QoS 等级       | 判定条件                                         | 驱逐优先级   |
| :------------- | :----------------------------------------------- | :----------- |
| **Guaranteed** | 每个容器都设置了 requests = limits（CPU 和内存） | **最后驱逐** |
| **Burstable**  | 至少一个容器设置了 requests，但不满足 Guaranteed | 中等         |
| **BestEffort** | 所有容器都未设置 requests/limits                 | **最先驱逐** |

**驱逐机制（Eviction）**：当节点内存/磁盘压力超过阈值（如 `memory.available < 100Mi`）时，kubelet 按 **QoS 等级 → 资源超用程度** 排序驱逐 Pod，被驱逐的 Pod 由控制器（如 Deployment）在其他节点重建。

**相关概念**：

- **OOMKilled**：容器内存超过 limits 时被内核直接杀死，与节点级驱逐不同。
- **节点压力污点**：kubelet 自动给压力节点打上 `node.kubernetes.io/memory-pressure` 等污点，阻止新 Pod 调度进来。

**最佳实践**：生产 Pod **必须声明 requests/limits**（争取 Guaranteed），并通过 PriorityClass 为关键业务设置高优先级。

**总结**：QoS 是 K8s 的“资源保护等级”，不设 requests/limits 的 Pod 在资源紧张时最先被牺牲。

#### 🔬 扩展知识

::: details

- 【L3】同一 QoS 内部还会比较实际用量相对 requests 的超用比例，超用越多越先被驱逐；驱逐事件可通过 `kubectl get events` 与 Pod status.reason=Evicted 观察。
- 【L4】PriorityClass + 抢占调度可实现“关键业务挤掉低优先级 Pod”；节点侧还可通过 kube-reserved/system-reserved 预留资源，减少驱逐发生。

> 📚 延伸阅读：[Kubernetes 官方文档 - QoS 与驱逐](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/)

:::

#### 🔀 发散问题

- **Q：requests/limits 从哪约束？** → 命名空间配额与 LimitRange，见本文档「Kubernetes 中如何配置资源配额？」。
- **Q：被驱逐后 Pod 去哪了？** → 重新调度，受调度策略约束，见本文档「Kubernetes 中 Pod 的调度策略有哪些？」。
- **Q：OOMKilled 状态怎么排查？** → 退出码 137，见本文档「Pod 一直处于 CrashLoopBackOff，如何排查？」。

## 故障排查

### 【中等】Pod 一直处于 CrashLoopBackOff，如何排查？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Kubernetes / 故障排查

#### 💎 关键结论

CrashLoopBackOff 是容器反复崩溃后 kubelet 的指数退避重启。三板斧：describe 看事件与退出码、logs --previous 看崩溃现场、按退出码定方向，能解决九成问题。

#### ⚡记忆卡片

- **口诀**：describe 看事件，logs 加 previous，退出码定方向
- **关键词**：指数退避 ／ 退出码 ／ --previous
- **链路**：容器崩溃 → kubelet 退避重启 → 看状态/事件 → 看上次日志 → 定位根因

#### 📖 核心知识

**CrashLoopBackOff** 表示容器反复崩溃，kubelet 按**指数退避**（10s、20s、40s…上限 5min）不断重启。排查思路：

**第一步：看状态和事件**

```bash
kubectl describe pod <pod-name>   # 看 Events 和 Last State（退出码、重启原因）
```

**第二步：看日志**

```bash
kubectl logs <pod-name>            # 当前容器日志
kubectl logs <pod-name> --previous # 上一次崩溃的容器日志（关键！）
```

**常见根因与退出码**：

| 现象/退出码           | 可能原因                                                        |
| :-------------------- | :-------------------------------------------------------------- |
| **Exit Code 1/2**     | 应用自身异常（配置错误、启动报错）                              |
| **Exit Code 137**     | 内存超限被 **OOMKilled**，需调大 limits 或修复内存泄漏          |
| **Exit Code 139**     | 段错误（程序崩溃）                                              |
| **Liveness 探针失败** | 探针路径/端口配错，或应用启动慢未配 startupProbe                |
| **镜像问题**          | ImagePullBackOff 时检查镜像名/标签/拉取凭证（imagePullSecrets） |
| **配置问题**          | ConfigMap/Secret 未创建、环境变量缺失导致启动失败               |

**其他辅助手段**：`kubectl get pod -o yaml` 看完整状态；用 `kubectl debug` 或临时改 `command: ["sleep", "3600"]` 进入容器现场排查。

**总结**：describe 看事件、logs --previous 看崩溃现场、退出码定方向，三板斧解决九成 CrashLoopBackOff。

#### 🔬 扩展知识

::: details

- 【L3】退出码 137 = 128 + SIGKILL(9)，多为内存超限或手工 kill；143 = SIGTERM 优雅退出；143 与 137 的区分能快速定位“被杀”还是“自杀”。
- 【L4】镜像拉不下来（ImagePullBackOff）与配置缺失是高频根因，建议在 CI 阶段加启动自测与镜像签名验证，把问题左移。

> 📚 延伸阅读：[Kubernetes 官方文档 - 应用调试](https://kubernetes.io/docs/tasks/debug/debug-application/)

:::

#### 🔀 发散问题

- **Q：探针误杀导致的反复重启怎么治理？** → 见本文档「Kubernetes 中的探针有哪些类型？各有什么作用？」。
- **Q：退出码 137 背后的驱逐顺序？** → 见本文档「Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？」。
- **Q：配置缺失导致的启动失败？** → 见本文档「Kubernetes 中的 ConfigMap 和 Secret 有什么作用？」。

## 参考资料

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Kubernetes 权威指南](https://book.douban.com/subject/30418855/)
- [面试鸭 - Kubernetes 面试题](https://www.mianshiya.com/bank/1812067408974839809)
