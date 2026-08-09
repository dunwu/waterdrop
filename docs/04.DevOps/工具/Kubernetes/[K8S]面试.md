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

::: tip 扩展

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [Kubernetes 权威指南](https://book.douban.com/subject/30418855/)

:::

## Kubernetes 简介

### 【中等】什么是 Kubernetes，并描述其主要组件及其作用。⭐⭐⭐

Kubernetes（K8s）是一个**开源的容器编排平台**，用于**自动化部署、扩展和管理容器化应用**。

它解决了管理大量微服务时的核心难题：

- **自动化运维**：实现自动部署、扩缩容、故障恢复（自我修复）、滚动更新。
- **高可用与弹性伸缩**：保证应用持续在线，并能轻松应对流量波动。
- **资源优化**：高效调度容器，充分利用基础设施资源。

**核心概念**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/8d6c4f92377944c49d904a5f86876616.png)

- **集群**：由 **Control Plane / Master Node** 和 **Worker Nodes** 组成。
- **Pod**：最小部署单元，包含一个或多个紧密关联的容器。
- **Deployment**：定义 Pod 的期望状态（如副本数），实现滚动更新和回滚。
- **Service**：为动态变化的 Pod 提供稳定的网络访问和服务发现。

## Pod

### 【中等】Kubernetes 中的 Pod 是什么？其作用是什么？⭐⭐⭐

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

**快速创建 Pod 的命令**

```shell
kubectl run my-redis-pod --image=redis --restart=Never
```

_注意：必须加 `--restart=Never` 才会创建独立 Pod，否则会默认创建 Deployment。_

**优势：** 快速简单，适合临时测试。

::: info 建议

:::

- **最佳实践：** 在生产中，不应直接创建 Pod，而应使用 **Deployment** 或 **StatefulSet** 等更高层级资源来管理 Pod，以实现自动恢复、扩缩容和滚动更新。
- **`containerPort` 字段** 仅是文档说明，实际开放端口需要通过 **Service** 资源来实现。

### 【中等】如何在 Kubernetes 中创建一个 Pod？⭐⭐

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

### 【简单】Service（服务）：内部稳定端点⭐⭐

- **用途**：为动态变化的 Pod 集合提供一个**稳定的 IP 地址、DNS 名称和端口**，实现服务发现和内部负载均衡。
- **核心功能**：
  - **服务发现**：通过标签选择器动态找到后端 Pod。
  - **负载均衡**：将请求分发给多个 Pod 实例。
- **类型**：
  - **ClusterIP（默认）**：仅限集群内部访问。
  - **NodePort**：通过节点 IP 和静态端口暴露服务，可从外部访问。
  - **LoadBalancer**：通过云提供商负载均衡器暴露服务到公网。

### 【简单】Ingress（入口）：外部流量网关⭐⭐

- **用途**：作为集群的**统一入口**，管理外部访问，实现基于域名和路径的**高级路由**。
- **核心功能**：
  - **基于规则的路由**：根据 HTTP 请求的域名（如 `api.example.com`）和路径（如 `/api`）将流量导向不同的后端 Service。
  - **SSL/TLS 终止**：在入口处处理 HTTPS 加密/解密。
- **重要概念**：
  - **Ingress Controller**：**必须部署**的**软件**（如 Nginx、Traefik），用于实现 Ingress 规则。
  - **Ingress Resource**：**声明路由规则**的 YAML 配置文件。

## Service 与 Ingress

### 【中等】Kubernetes 中的 Service 和 Ingress 有什么区别？⭐⭐⭐

滚动更新和回滚是 **Deployment** 资源的核心功能。Deployment 通过控制 **ReplicaSet** 来管理 Pod，通过改变 Pod 模板的“期望状态”来实现无缝更新。

| 操作         | 核心命令                                     | 本质                                            |
| :----------- | :------------------------------------------- | :---------------------------------------------- |
| **滚动更新** | `kubectl set image...` 或 `kubectl apply -f` | 通过创建新 ReplicaSet，**逐步替换** Pod。       |
| **回滚**     | `kubectl rollout undo`                       | 将 Pod 模板**重置**为历史版本，并再次触发更新。 |

### 【中等】滚动更新⭐⭐

**目标**：逐步用新版本 Pod 替换旧版本 Pod，实现**零停机**部署。

**操作方式**：

（1）**命令式（快速测试）**

```shell
kubectl set image deployment/my-app my-container=my-app:v2.0
```

（2）**声明式（生产推荐）**

```shell
kubectl apply -f deployment.yaml  # 修改 yaml 文件中的镜像版本后应用
```

**关键配置参数**（在 Deployment YAML 的 `spec.strategy.rollingUpdate` 中）：

- `maxSurge`：允许临时超过期望副本数的 Pod 数量（如 25%），用于平滑更新。
- `maxUnavailable`：更新过程中允许不可用的 Pod 最大数量（如 25%），保证服务最低可用性。

**监控命令**：

```shell
kubectl rollout status deployment/my-app  # 查看实时状态
```

### 【中等】回滚操作⭐⭐

**目标**：当新版本出现问题时，**快速恢复**到之前的稳定版本。

**操作流程**：

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

**关键配置**：

- `revisionHistoryLimit`：指定保留的旧 ReplicaSet 历史记录数量，默认为 10，供回滚使用。

## Deployment 与更新

### 【中等】Kubernetes 中如何进行滚动更新和回滚？⭐⭐⭐

用 **ConfigMap** 管理应用配置，用 **Secret** 管理所有密码密钥。

**核心区别与总结**

| 特性         | ConfigMap      | Secret                                         |
| :----------- | :------------- | :--------------------------------------------- |
| **数据性质** | **非敏感**配置 | **敏感**信息                                   |
| **安全性**   | 低，明文       | 较高（但默认不加密，需配合 RBAC 和 ETCD 加密） |
| **关键建议** | 存放应用配置   | **永远不要**用 ConfigMap 存密码                |

### 【简单】ConfigMap（配置映射）⭐⭐

- **用途**：**存储非敏感数据**。
- **数据类型**：环境变量（如 `LOG_LEVEL=info`）、配置文件（如 `nginx.conf`）、命令行参数。
- **存储形式**：**明文**存储。
- **使用方式**：
  1.  **作为环境变量注入**到容器中。
  2.  **作为配置文件挂载**到容器的指定目录（最常用）。

### 【简单】Secret（密钥）⭐⭐

- **用途**：**存储敏感信息**。
- **数据类型**：密码、API 密钥、TLS 证书、镜像仓库拉取凭证。
- **存储形式**：**Base64 编码**（注意：这是编码，**不是加密**）。
- **使用方式**：
  1.  作为环境变量注入（**不推荐**用于高敏感数据，有日志泄露风险）。
  2.  **作为只读文件挂载**（**推荐**方式，更安全）。
  3.  特殊类型 `imagePullSecrets` 用于拉取私有镜像。

## 配置管理

### 【中等】Kubernetes 中的 ConfigMap 和 Secret 有什么作用？⭐⭐⭐

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

**注意**：需与 Pod 的 `requests/limits` 配合；超配额时资源创建会被拒绝。

### 【中等】Kubernetes 中如何配置资源配额？⭐⭐

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

### 【中等】Kubernetes 中的 Namespace 有什么作用？⭐⭐

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

  1.  **日志代理**：以 **DaemonSet** 形式运行在每个节点上（如 **Fluentd** 或 **Fluent Bit**），负责收集和转发该节点上所有容器的日志。
  2.  **日志后端**：集中存储和索引日志的系统（如 **Elasticsearch**、**Grafana Loki** 或云厂商服务）。
  3.  **可视化界面**：用于查询和展示日志的 Web UI（如 **Kibana**、**Grafana**）。

- **经典架构（EFK）**：
  `应用 stdout -> 节点文件 -> Fluentd -> Elasticsearch -> Kibana`

**关键实践与要点**

- **日志上下文**：日志代理会自动为每条日志添加丰富的元数据（如 Pod 名称、命名空间、标签），极大方便问题排查。
- **处理文件日志**：若应用必须写文件到磁盘，可采用 **Sidecar 容器模式**，由 Sidecar 读取日志文件并输出到其 stdout，从而纳入标准收集流程。
- **云服务**：在公有云上，直接使用托管的日志服务（如 AWS CloudWatch）是最简单省心的选择。

## 日志与存储

### 【中等】Kubernetes 中如何进行日志管理？⭐⭐

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

（4）进阶：使用 StorageClass 动态供应

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

### 【中等】Kubernetes 中如何实现持久化存储？⭐⭐⭐

> 管理员管理 PV，用户通过 PVC 申请，无需关注底层存储细节

- 数据持久化：容器销毁后，数据仍保存在 PV 中，支持跨 Pod 复用
- 灵活适配：支持多种存储后端（本地磁盘、NFS、云存储等）

通过 PV/PVC 机制，Kubernetes 实现了存储资源的标准化管理，满足状态应用（如数据库）的数据持久化需求。

## Helm

### 【中等】Kubernetes 中的 Helm 有什么作用？⭐⭐

Helm 作为 Kubernetes 包管理工具的核心作用：

- **应用打包**：将 Deployment、Service 等资源打包为「Chart」，便于分发复用
- **简化部署**：通过 `helm install` 一键部署，支持动态配置（`--set` 或 values 文件）
- **版本管理**：记录应用版本（Release），支持 `upgrade` 升级和 `rollback` 回滚
- **依赖管理**：自动处理应用间依赖，一键部署完整应用栈
- **模板化配置**：用 Go 模板分离配置与代码，适配多环境部署

适用于简化复杂 K8s 应用的管理，提升部署效率和可维护性。

## 【中等】如何在 Kubernetes 中使用 Helm 部署应用？

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

### 【中等】如何在 Kubernetes 中使用 Helm 部署应用？⭐⭐

- **集群级防护**：API Server 启用 TLS 加密 + IP 限制 + RBAC；kubelet 最小权限配置；用 Secrets / 外部工具（Vault）管理敏感信息
- **资源安全配置**：
  - Pod 安全上下文（禁止 root 运行、禁用权限提升等）
  - 用 Pod 安全标准 / 策略定义运行规则，设资源限制防耗尽
- **网络安全**：通过 NetworkPolicy 限制 Pod 间通信；服务网格（如 Istio）实现 mTLS 加密
- **镜像与供应链**：扫描镜像漏洞，用私有仓库 + 拉取密钥，禁止 `latest` 标签
- **审计与监控**：启用 API Server 审计日志，监控异常行为（如特权容器创建）

## 安全

### 【中等】Kubernetes 中如何进行安全配置？⭐⭐⭐

Kubernetes 中的 Pod 是集群中最小的部署和管理单元，是容器的封装集合。

**核心构成**：

- 包含一个或多个紧密关联的容器（如应用容器 + 日志收集容器）
- 共享网络命名空间（同一 Pod 内容器共享 IP 和端口）
- 共享存储卷（可通过 Volume 实现容器间数据共享）

**主要作用**：

1. 作为应用部署的基本单位，封装应用运行所需的容器、网络和存储资源
2. 提供容器间协同工作的环境（如前后端容器同 Pod 部署，通过 [localhost](https://localhost/) 通信）
3. 作为 Kubernetes 调度、扩展、自愈的最小单元（如调度到节点、副本集扩缩容均以 Pod 为单位）
4. 抽象底层容器运行时，统一管理容器生命周期

Pod 具有临时性，生命周期结束后会被销毁重建，其 IP 可能变化，通常通过 Service 提供稳定访问入口。

## 工作负载

### 【中等】Kubernetes 中如何实现服务的自动伸缩？⭐⭐⭐

Kubernetes 中服务自动伸缩的核心要点：

- **核心实现**：通过 HPA（Horizontal Pod Autoscaler）实现，根据指标动态调整 Pod 副本数
- **配置要点**：
  - 关联目标控制器（Deployment/StatefulSet 等）
  - 设定副本数范围（minReplicas/maxReplicas）
  - 基于指标触发伸缩（CPU / 内存使用率或自定义指标）
- **依赖条件**：需部署 Metrics Server 收集指标，目标 Pod 需定义 resources.requests
- **作用**：动态适配负载变化，高峰扩容提升能力，低谷缩容节约资源，保障服务稳定性
- **扩展场景**：结合 Prometheus 等工具支持自定义指标（如每秒请求数）伸缩

### 【中等】Kubernetes 中的 Deployment 和 StatefulSet 有什么区别？⭐⭐⭐

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

**失效场景（面试加分点）**

- **PVC 不随 Pod 走**：StatefulSet 的 PVC 不会随 Pod 删除、缩容而自动删除，甚至 `kubectl delete statefulset` 后 PVC 依然保留。这是防误删数据的设计，但忘记清理就会变成“存储成本泄漏”，需手动清理或配置 `persistentVolumeClaimRetentionPolicy`（1.27 GA）。
- **滚动更新卡死**：StatefulSet 逆序逐个更新，若 db-0 的新版本 readinessProbe 始终失败，整个更新会停在 db-0，不像 Deployment 还能并行推进。
- **反向失效**：用 Deployment + 共享 PVC 硬跑有状态应用，多副本并发写同一数据目录，直接导致数据损坏。

**踩坑案例（生产事故）**

- **现象**：某团队把自建 MySQL 主从迁到 K8s，某天凌晨发现主库“换人”，新主数据落后 3 小时，业务写入出现缺口。
- **排查**：该部署用的是 Deployment，节点故障后两个副本被随机重建；两者挂载同一个 NFS 共享卷，旧主重建后以从库身份连上新主，binlog 位点已经错乱。
- **根因**：Deployment 无稳定身份、无有序语义，主从角色靠“谁先起来谁当主”判定，存在脑裂风险；共享存储破坏了实例级数据隔离。
- **修复**：改为 StatefulSet + `volumeClaimTemplates` 每实例独立 PVC，引入 Orchestrator 做故障切换，readinessProbe 校验复制延迟（`Seconds_Behind_Master` 超过 30 秒即从读流量 Service 摘除）。

**量化数据**

- Deployment 滚动更新默认 `maxSurge: 25%`、`maxUnavailable: 25%`，即 10 副本一次最多并行替换约 2~3 个 Pod；StatefulSet 严格串行，升级总时长 ≈ N × 单 Pod 就绪时间，10 副本数据库每实例就绪需 30 秒时全量滚动要 5 分钟以上。
- StatefulSet 缩容 / 删除耗时 ≈ N ×（`terminationGracePeriodSeconds` + 优雅退出时间），5 副本、宽限 60 秒的 ES 集群完整释放要 5 分钟以上，远慢于 Deployment 的并行终止。
- Headless Service 下 `db-0.db-headless.ns.svc.cluster.local` 的 DNS 解析为毫秒级，身份寻址不依赖额外组件，这是 ZooKeeper、Kafka 选择 Headless Service 的原因。

#### 拓展追问

1. StatefulSet 的 Pod 被删除后，它的 PVC 和数据会发生什么？想要自动清理怎么办？
   PVC 会被刻意保留，Pod 删除、缩容到 0 甚至删除 StatefulSet 都不会自动删除 PVC，防止误删数据。自动清理可用 `persistentVolumeClaimRetentionPolicy` 字段（1.23 beta、1.27 GA），设置 `whenDeleted: Delete`；或在运维流水线里缩容后显式删除 PVC，并靠 PV 的 reclaimPolicy 回收底层存储。
2. StatefulSet 为什么要求关联 Headless Service？关联普通 ClusterIP Service 会怎样？
   Headless Service（`clusterIP: None`）让 DNS 为每个 Pod 返回独立 A 记录（`db-0.svc`、`db-1.svc`），提供稳定网络身份；关联普通 ClusterIP 时 Pod 名字虽然稳定，但 DNS 只解析到一个虚拟 IP，流量被负载均衡，无法定向访问特定实例，ZooKeeper、Kafka 这类需要节点间互相寻址的场景会直接不可用。
3. 把 Elasticsearch 硬部署在 Deployment 上，最坏会发生什么？
   所有副本身份随机且无专属存储：Pod 重建后以“新节点”身份重新加入集群，集群成员关系频繁抖动；若挂了共享卷，多个实例同时写同一份 Lucene 索引文件会导致索引损坏；叠加滚动更新的并行替换，主分片迁移风暴会把集群打成 red，最坏情况数据不可读写。

#### 场景题

**有状态中间件（如 Elasticsearch）从虚拟机迁到 K8s，你如何设计 StatefulSet、存储与探针配置来保证数据安全？**

**应急处理（迁移前兜底）**：先做全量快照（`elasticsearch snapshot` 备份到 S3/OSS 仓库），切换窗口内关闭分片自动分配（`cluster.routing.allocation.enable: none`），避免迁移期间触发分片迁移风暴。

**根因分析（迁移的核心风险）**：ES 的数据安全依赖三点——每个节点数据目录独占、节点身份稳定（否则选主脑裂）、节点恢复数据期间不被误杀或误调度。

**长期方案**：

- **StatefulSet 设计**：`serviceName` 指向 Headless Service；`podManagementPolicy: Parallel` 加速扩缩容（更新仍保持有序）；master 角色至少 3 副本。
- **存储**：`volumeClaimTemplates` 为每个节点绑定独立云盘（ReadWriteOnce），StorageClass 指定 SSD 类型；PV 回收策略设为 `Retain` 防误删；严禁多 Pod 共享 NFS。
- **探针设计**：startupProbe 的 `failureThreshold × periodSeconds` 覆盖最长分片恢复时间（如 60 × 10 秒 = 10 分钟）；readinessProbe 调用 `/_cluster/health`，yellow 以上才接流量；livenessProbe 只检查进程自身存活且阈值放宽（`failureThreshold: 5`），防止 GC 停顿期间被误杀。
- **调度**：podAntiAffinity 或 `topologySpreadConstraints`（`maxSkew: 1`）把节点分散到不同可用区。

**权衡**：K8s 的自愈（故障自动重建）与有状态服务“别动我的数据”天然冲突，原则是“探针放宽、存储 Retain、备份兜底”；若团队没有存储插件运维经验，直接用云厂商托管 ES，自建与托管的长期成本差异常在一个数量级。

### 【中等】Kubernetes 中的 Ingress 资源有什么作用？如何配置？⭐⭐⭐

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

### 【中等】Kubernetes 中的 DaemonSet 有什么作用？⭐⭐

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

### 【中等】Kubernetes 中的 ReplicaSet 和 ReplicationController 有什么区别？⭐

Kubernetes 中 ReplicaSet 与 ReplicationController 的核心区别：

1. **核心差异：标签选择器**
   - ReplicationController：仅支持等值选择器（`matchLabels`），只能匹配标签完全一致的 Pod，灵活性低。
   - ReplicaSet：支持等值选择器（`matchLabels`）和集合选择器（`matchExpressions`），可通过表达式（如 `app in (nginx,web)`）实现复杂匹配，灵活性更高。
2. **其他区别**
   - API 版本：ReplicationController 使用 `v1`（老旧），ReplicaSet 使用 `apps/v1`（标准稳定版）。
   - 定位：ReplicaSet 是 ReplicationController 的升级替代方案，是 Deployment 的底层依赖，目前为推荐使用的副本管理组件；ReplicationController 已逐步淘汰。

选择建议：优先使用 ReplicaSet，仅在维护旧集群时考虑 ReplicationController。

### 【中等】Kubernetes 中的 Service 有哪几种类型？⭐⭐⭐

- **ClusterIP（默认）**：仅集群内访问，分配内部虚拟 IP；用于集群内服务通信（如前端调后端）。
- **NodePort**：每个节点开放静态端口（30000-32767），外部通过`节点 IP:NodePort`访问；含 ClusterIP 功能，适合临时外部测试。
- **LoadBalancer**：依赖云服务商负载均衡器，分配外部 IP；用于生产环境公网访问（需云环境支持）。
- **ExternalName**：将 Service 映射到外部域名（如 [example.com](https://example.com/)），无 Pod 关联；用于访问集群外固定服务（如外部数据库）。
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

**kube-proxy 实现深挖（面试重点）**

Service 的 L4 转发由各节点的 kube-proxy 落地，主流两种模式：

- **iptables 模式**：每个 Service 及其 Endpoint 会生成约 5 条规则（KUBE-SERVICES / KUBE-SVC / KUBE-SEP 链），规则数随 Service × Endpoint 数量**线性膨胀**。万级 Service 集群规则数可达数十万条，`iptables-save` 一次要十几秒，数据包匹配是 O(n) 线性遍历，高并发下转发延迟明显上升。
- **IPVS 模式**：内核专用模块，规则以哈希表存储，查找接近 O(1)，万级 Service 增量同步仅需毫秒级，还支持 rr、lc、sh 等 6 种负载均衡算法。**Service 数量超过 1000 的中大型集群应标配 IPVS**。
- 量化参考：实测 5000 个 Service 时，iptables 模式 kube-proxy 全量同步规则约 11 秒，IPVS 模式小于 100ms；变更高峰期 iptables 模式的新建连接延迟可放大 2~3 倍。

**失效场景**

- **长连接负载倾斜**：Service 默认按连接做负载均衡（iptables 随机、IPVS rr），gRPC、WebSocket 这类长连接服务会出现个别 Endpoint 承载 80% 流量的严重倾斜，需设 `sessionAffinity: ClientIP` 或把均衡上移到 L7（Ingress / 服务网格）。
- **NodePort 陷阱**：流量可能从任一节点进入后经 iptables 跨节点二次转发，多一跳 SNAT；且 30000-32767 端口段全集群共享，两个 Service 抢端口是常见事故。
- **LoadBalancer 一直 Pending**：裸金属集群没有云厂商 LB 集成，LoadBalancer 类型 Service 会永久 Pending，需部署 MetalLB 等组件补齐。

**踩坑案例（生产事故）**

- **现象**：某集群 Service 数量涨到 8000 后，全集群 Pod 偶发 DNS 解析与新连接建立延迟 3~5 秒，且每次大规模发布 Service 变更时问题加剧。
- **排查**：观察发现变更瞬间 kube-proxy CPU 飙高；`time iptables-save | wc -l` 耗时 12 秒、规则超 40 万条；conntrack 表还频繁报 `nf_conntrack: table full`（默认上限随内存约每 GB 65536 条）。
- **根因**：kube-proxy 处于 iptables 模式，万级 Service 规模下每次变更都要全量重建规则，O(n) 匹配路径导致转发延迟，发布风暴放大了抖动。
- **修复**：kube-proxy 切换 IPVS 模式（逐节点滚动切换），`nf_conntrack_max` 调大到 1048576，并对 Service 数量与规则同步耗时建立监控告警，发布期延迟抖动消失。

#### 拓展追问

1. Service 创建后 ClusterIP 由谁分配？Pod 是如何发现这个 Service 的？
   ClusterIP 由 kube-apiserver 在 Service 创建时从 `--service-cluster-ip-range` 网段分配，它是一个不对应任何网卡的虚拟 IP，由各节点 iptables/IPVS 规则落地转发。发现方式有两种：CoreDNS 解析 `service名.命名空间.svc.cluster.local`（推荐），或环境变量注入（`*_SERVICE_HOST`，但只对 Pod 启动前已存在的 Service 生效，有顺序坑）。
2. Service 的 Endpoints 变更后，数据面多久生效？为什么滚动更新时容易出现 502？
   Endpoint 变更由 kube-proxy watch 后更新规则，通常亚秒级生效，但客户端 DNS 缓存（Pod 内 `ndots: 5` 与 CoreDNS TTL 30 秒）会拖长感知。502 的根因是“流量与就绪不同步”：旧 Pod 刚被摘除就收到 SIGTERM，存量连接被切断；或新 Pod Ready 但缓存未预热，瞬时被打满。需要 readinessProbe + `preStop sleep` + 优雅关闭组合解决。
3. externalTrafficPolicy 设为 Local 时，你得到了什么、牺牲了什么？
   得到：保留客户端真实源 IP（不做 SNAT），且避免跨节点转发带来的额外延迟。牺牲：流量只会落到“本节点就有该 Service Endpoint”的节点上，Pod 分布不均时负载直接倾斜，节点故障时该节点的入口流量直接丢弃。适合需要源 IP 审计、LB 健康检查直连的场景。

#### 场景题

**集群里有 200 个 HTTP 微服务需要对外暴露，网络团队只允许开放 80/443 两个端口，你怎么设计暴露方案？**

**应急处理**：临时联调可用 NodePort 顶一下，但必须登记回收时间，并核查安全组规则，避免测试端口长期暴露公网。

**根因分析（约束拆解）**：端口只有 80/443、服务多达 200 个、协议清一色 HTTP(S)。NodePort 的 30000-32767 端口段不符合安全要求且数量不够；每服务一个 LoadBalancer 没有足够端口且成本不可接受——两个方案被约束直接排除。

**长期方案**：部署 Nginx Ingress Controller（至少 2 副本 + podAntiAffinity 分散到不同节点），前面挂 1 个 LoadBalancer 或 VIP 占用 80/443，通过 Ingress 按域名（`a.example.com`、`b.example.com`）和路径路由到各后端 Service；TLS 在 Ingress 层集中终结，证书放 Secret 并由 cert-manager 自动轮转；少量非 HTTP 协议（如 MySQL 3306）单独走 LoadBalancer 或 Ingress Controller 的 TCP 透传配置。

**权衡**：Ingress Controller 成为单点与流量瓶颈，必须以多副本 + HPA + P99 延迟监控兜底；若个别业务要求四层直通或极致延迟，可为其单独接受 LoadBalancer 成本。方案落地后先按 2 倍峰值压测再切生产流量。

### 【中等】Kubernetes 的 Helm Charts 如何实现应用的版本控制？⭐⭐

Helm Charts 实现应用版本控制的核心机制：

- **Chart 版本管理**：通过 `Chart.yaml` 的 `version` 字段（语义化版本）标识模板本身版本，内容变更时同步更新版本号。
- **Release 版本控制**：
  - 每个部署实例（Release）有独立版本号（自动递增），记录当前 Chart 版本、配置参数和资源状态。
  - 可通过 `helm history` 查看所有版本记录，用 `helm rollback` 回滚到指定版本。
- **配置与依赖管理**
  - 配置（`values.yaml`）与模板分离，不同环境配置独立管理，变更随 Release 版本记录。
  - 依赖通过 `Chart.yaml` 声明版本范围，`Chart.lock` 锁定实际安装版本，确保部署一致性。

核心价值：实现从应用模板到部署实例的全链路版本追踪，支持安全升级与快速回滚，简化 Kubernetes 应用的版本管理。

## 任务调度

### 【中等】Kubernetes 中的 Job 和 CronJob 有什么区别？⭐⭐

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

::: tabs#配置示例对比

@tab Job（一次性任务）

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

@tab CronJob（定时任务）

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

:::

### 【中等】Kubernetes 中的 Persistent Volume 和 Persistent Volume Claim 有什么区别？⭐⭐⭐

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

## 网络策略

### 【中等】Kubernetes 中的网络策略如何实现？⭐⭐⭐

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

::: tabs#经典场景示例

@tab 场景：禁止所有入站流量

最基础的安全加固

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

@tab 场景：只允许特定前端访问后端 API

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

:::

## 探针与健康检查

### 【中等】Kubernetes 中的探针有哪些类型？各有什么作用？⭐⭐⭐⭐

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

**最佳实践**：

- 所有生产 Pod **必须配置** livenessProbe + readinessProbe。
- 启动慢的应用使用 **startupProbe** 避免被 liveness 误杀。
- readinessProbe 的 `initialDelaySeconds` 应略大于应用启动时间。

**方案权衡：三种探针怎么分工**

- **livenessProbe**：解决“活着但不能干活”（死锁、无限循环），失败代价是**重启容器，代价高**，所以要保守：探测路径只检查进程自身，绝不探下游依赖（DB、Redis），否则下游抖动会连锁杀死自己。
- **readinessProbe**：解决“还不能接流量”（预热中、缓存加载中），失败只是**从 Service Endpoints 摘除，代价低**，所以可以严格：依赖健康度、初始化状态都该放这里。
- **startupProbe**：解决“启动慢”，成功后才把控制权交给另外两个探针；慢启动应用不配 startupProbe，就只能靠无限加大 `initialDelaySeconds` 赌博。

决策口诀：**重启能解决的故障给 liveness，能不能接流量给 readiness，启动期保护给 startupProbe**。

**量化参数（默认值与调优）**

| 参数                  | 默认值 | 说明                                             |
| :-------------------- | :----- | :----------------------------------------------- |
| `initialDelaySeconds` | 0      | 容器启动后等多少秒才开始探测                     |
| `periodSeconds`       | **10** | 探测间隔（最小 1）                               |
| `timeoutSeconds`      | **1**  | 单次探测超时，极易踩坑，慢接口必须调大           |
| `failureThreshold`    | **3**  | 连续失败多少次判定失败                           |
| `successThreshold`    | 1      | 仅对 readiness 有意义，liveness/startup 必须为 1 |

默认配置下，一个容器从探测失败到触发动作至少需要 3 × 10 = 30 秒。

**失效场景**

- **readinessProbe 过激进引发滚动雪崩**：`periodSeconds: 1` + `failureThreshold: 1`，新 Pod 预热时接口瞬间超时，被全部摘出 Endpoints，流量压回旧 Pod → 旧 Pod 也被摘 → **Service 无可用 Endpoint，滚动更新雪崩**。
- **liveness 的 timeoutSeconds 过短**：GC 或高负载下接口耗时 2 秒 > 默认超时 1 秒 → 判失败 → 重启 → 冷启动负载更重 → 反复被杀成 CrashLoopBackOff 正反馈环。
- **liveness 探下游依赖**：探测路径检查 DB 连通性，DB 一抖动，该服务所有 Pod 同时被重启，把“局部故障”放大成“服务整体不可用”。

**踩坑案例（生产事故）**

- **现象**：某 Java 服务每次发布后全部 Pod 进入 CrashLoopBackOff，发布系统自动回滚后恢复，被当作“坏版本”压下去，几周后再次发布复现。
- **排查**：`kubectl describe pod` 看到重启原因是 Liveness probe failed；应用日志显示每次重启都发生在启动后 40 秒左右；探测接口 `/healthz` 平时 200ms 返回，但冷启动期间因缓存预热 + JIT 编译会超过 2 秒。
- **根因**：livenessProbe 的 `timeoutSeconds` 用了默认 1 秒，`initialDelaySeconds` 只设了 15 秒，而真实启动需要 30~40 秒，冷启动探测超时后连续 3 次（`failureThreshold: 3`）即被杀；重启后缓存又是冷的，再次被杀，形成循环。
- **修复**：增加 startupProbe（`failureThreshold: 30` × `periodSeconds: 10`，覆盖 5 分钟启动窗口），livenessProbe 的 `timeoutSeconds` 调到 3 秒，并把缓存预热逻辑挪到 readinessProbe 判定中，之后发布再未复现。

#### 拓展追问

1. readiness 失败被摘出 Endpoints 后，存量流量多久才能完全排干？
   Endpoint 摘除由 kube-proxy watch 后更新规则，通常亚秒级生效，但客户端 DNS 缓存（CoreDNS TTL 30 秒、JVM 默认无限缓存）会让客户端继续连旧 IP。所以滚动更新要配合 `terminationGracePeriodSeconds`（默认 30 秒）+ `preStop sleep`（5~10 秒），确保摘除传播完成后再接收 SIGTERM。
2. exec 型探针在高密度节点上为什么要谨慎？
   每次探测都要在容器内 fork + exec 一个进程，`periodSeconds: 5` 且节点上跑 100 个 Pod 时，每秒要拉起 20 个进程，CPU sys 开销与 PID 资源消耗不可忽略；且探测命令自身挂住会被 `timeoutSeconds` 判超时，反过来触发重启。高密度场景优先 httpGet，exec 探针间隔建议 30 秒以上。
3. startupProbe 成功后，liveness 和 readiness 是立即同时生效吗？这里有什么隐藏坑？
   是同时接管。隐藏坑：若 startupProbe 刚通过、应用实际只能算“启动完成”而不能算“就绪”，readiness 的 `initialDelaySeconds` 又设为 0，会出现短暂接流量又被摘除的抖动；更危险的是 startup 窗口设得太短，慢启动应用照样被杀，等于没配。startup 窗口应取“最长启动时间 × 2”作为安全边界。

#### 场景题

**订单服务滚动更新期间出现间歇性 502，大约每 3 分钟一次，你怎么定位和解决？**

**应急处理**：先把 Deployment 的滚动参数改为 `maxSurge: 1、maxUnavailable: 0` 降低单批替换幅度，必要时暂停发布、回滚到上一版本止血。

**根因分析（三个最可疑点）**：① 新 Pod 的 readinessProbe 通过但预热未完成，满负载流量直接打进来；② 旧 Pod 被摘除 Endpoints 的同时收到 SIGTERM，在途请求被切断；③ 客户端长连接 / DNS 缓存仍指向已终止的旧 Pod。用 `kubectl get endpoints -w` 对照访问日志时间戳定位：502 集中在新 Pod Ready 后 1~2 秒内，是①；集中在旧 Pod 终止前最后几秒，是②。

**长期方案**：新 Pod 侧把预热完成纳入 readinessProbe（预热不完不接流量）；旧 Pod 侧加 `preStop: sleep 10` 覆盖 Endpoint 传播 + DNS 缓存窗口；滚动参数恢复默认 `maxSurge: 25%、maxUnavailable: 25%`，并配 PDB 保证最小可用副本数。

**权衡**：`preStop` 会拉长整体滚动时长（每批多 10 秒左右），用发布速度换零中断，对核心无状态服务这笔交易值得；若服务预热特征明显，可进一步引入服务网格或 LB 的慢启动权重能力，让新实例流量逐步爬升。

## 调度策略

### 【困难】Kubernetes 中 Pod 的调度策略有哪些？⭐⭐⭐

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

**失效场景**

- **亲和性过严导致 Pending**：podAntiAffinity 硬约束 + `topologyKey: kubernetes.io/hostname`，集群只有 3 个节点却要 4 副本，第 4 个 Pod 永久 Pending，`kubectl describe` 报 `didn't match pod anti-affinity rules`。
- **污点忘摘**：给节点打污点做维护，恢复后忘记清除，没有容忍度的业务 Pod 调度不上去，集群容量被隐性缩水。
- **资源不匹配**：亲和规则全部满足，但 requests 超过节点剩余可分配资源，同样 Pending——排查时先看 describe 的 Events，别靠猜。

**踩坑案例（调度倾斜引发节点 OOM）**

- **现象**：某集群一个节点每天凌晨触发 OOM，节点上的 Pod 被批量驱逐到别的节点，引发连锁资源紧张。
- **排查**：调度事件显示，一批离线计算 Pod 用 `preferred` 节点亲和（权重 100）倾向该节点的 `high-memory=true` 标签，且没设任何资源 limits，调度器按打分把它们全部堆到这一台。
- **根因**：软亲和 + BestEffort QoS（无 requests/limits）+ 无分散约束三者叠加，凌晨批任务集中调度时单机内存被打穿，kubelet 按 QoS 顺序批量驱逐。
- **修复**：批任务统一声明 requests = limits（升为 Guaranteed），加 `topologySpreadConstraints`（`maxSkew: 1`）与 Pod 反亲和限制单机堆叠数量，并用 ResourceQuota 限制命名空间内存总量。

**量化数据**

- `preferred` 亲和的打分权重范围 1~100；`topologySpreadConstraints` 的 `maxSkew: 1` 表示任意两个拓扑域副本数差 ≤ 1。
- kube-scheduler 在千节点规模集群的吞吐约 100 Pod/秒，单个 Deployment 一次扩容 500 副本时，全部绑定完成需 5~10 秒，期间 Pod 处于 Pending。
- 节点不可达（unreachable）时，Pod 默认容忍 300 秒（`tolerationSeconds`）才会被驱逐重建，这是“节点故障后 Pod 迟迟不迁移”的量化解释。

#### 拓展追问

1. kube-scheduler 的调度分哪两个阶段？亲和性规则分别在哪里起作用？
   分为**过滤（Filtering）**和**打分（Scoring）**：硬约束（required 亲和、污点、资源是否够）在过滤阶段淘汰不满足的节点；软约束（preferred 亲和、均衡类插件）在打分阶段加权求和，选总分最高的节点绑定。所以硬约束决定“能不能去”，软约束决定“去哪里更好”，排查 Pending 只需看过滤阶段的失败原因。
2. taint 的 NoExecute 和 NoSchedule 有什么本质区别？tolerationSeconds 有什么用？
   NoSchedule 只阻止**新** Pod 调度进来，已运行的不受影响；NoExecute 会**立即驱逐**已运行且不容忍该污点的 Pod。`tolerationSeconds` 让 Pod“容忍一段时间后再被驱逐”，典型用途是容忍节点 unreachable/not-ready 污点 300 秒，避免网络抖动时 Pod 不必要的迁移风暴。
3. podAntiAffinity 为什么不能保证“均匀分布”？topologySpreadConstraints 解决了什么？
   反亲和是布尔判断“同或不同”：3 节点 3 副本时分布成 2:1:0 也满足“任意两个不同节点”——只要不冲突就不管均不均。topologySpreadConstraints 引入 maxSkew 量化指标，调度器保证各拓扑域副本数差不超过 maxSkew，才是真正的均匀打散；且它的 `whenUnsatisfiable` 还可选 DoNotSchedule（硬）或 ScheduleAnyway（软）。

#### 场景题

**集群有 3 个可用区，需要部署一个 6 副本的关键服务：要求每个可用区至少 1 副本、尽量均匀，且绝不能调度到正在维护的节点，你怎么写调度配置？**

**应急处理**：若当前已有可用区故障，先 `kubectl cordon` 确认节点状态与现有 Pod 分布，确保剩余两个可用区能承接全部流量后再做变更。

**根因分析（需求拆解）**：要求分三层——可用区间均匀（打散约束）、避开维护节点（污点/容忍）、最低可用性保障（PDB）。注意 podAntiAffinity 表达不了“每个可用区至少 1 个”，它只能说“不要和别的副本同域”，必须用 topologySpreadConstraints。

**长期方案**（关键配置）：

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

**权衡**：`whenUnsatisfiable: DoNotSchedule` 的代价是——某可用区整体故障时，新 Pod 会因无法保持均匀而 Pending，这是“宁缺毋滥”的正确行为（防止全部挤进单区），但必须配 Pending 告警；若业务要求“先跑起来再说”，改为 `ScheduleAnyway`（软约束），并依赖后续重平衡修复分布。

## RBAC

### 【中等】什么是 Kubernetes 中的 RBAC？⭐⭐⭐

**RBAC（Role-Based Access Control）** 是基于角色的访问控制机制，用于管理谁可以对 K8s 资源执行什么操作。

**四大核心对象**

| 对象                   | 作用域     | 说明                                 |
| :--------------------- | :--------- | :----------------------------------- |
| **Role**               | 命名空间内 | 定义命名空间内的权限规则             |
| **RoleBinding**        | 命名空间内 | 将 Role 绑定到用户/组/ServiceAccount |
| **ClusterRole**        | 集群级别   | 定义集群级别的权限规则               |
| **ClusterRoleBinding** | 集群级别   | 将 ClusterRole 绑定到用户/组         |

**最小权限原则**：只授予用户/服务账户完成其任务所需的**最少权限**。

## Pod 驱逐与 QoS

### 【中等】Kubernetes 中 Pod 的 QoS 等级是什么？节点资源不足时如何驱逐 Pod？⭐⭐⭐

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

## 故障排查

### 【中等】Pod 一直处于 CrashLoopBackOff，如何排查？⭐⭐⭐

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

## 参考资料

- [Kubernetes 官方文档](https://kubernetes.io/docs/)
- [面试鸭 - Kubernetes 面试题](https://www.mianshiya.com/bank/1812067408974839809)
