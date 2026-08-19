---
icon: devicon:docker-wordmark
title: Docker 面试
date: 2025-09-25 07:49:46
order: 99
categories:
  - DevOps
  - 工具
  - Docker
tags:
  - DevOps
  - Docker
  - 面试
permalink: /pages/405c2e2e/
---

# Docker 面试

## Docker 简介

### 【简单】什么是 Docker？为什么需要 Docker？⭐⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 基础概念

#### 💎 关键结论

Docker 是开源**容器化平台**，把应用及其依赖打包成标准化、轻量级、可移植的容器，实现 **"一次构建，处处运行"**。相比虚拟机，容器**共享宿主机内核**，秒级启动、MB 级开销，彻底解决环境一致性问题，是微服务与 CI/CD 的基石。

#### ⚡记忆卡片

- **口诀**：打包依赖成镜像，共享内核轻又快，环境一致处处跑
- **关键词**：容器化 ／ 环境一致性 ／ 隔离 ／ 轻量高效 ／ DevOps 基石
- **链路**：应用 + 依赖 → 镜像 → 容器 → 一次构建，处处运行

#### 📖 核心知识

**定义**：Docker 是一个**容器化平台**，用于将应用及其所有依赖打包成一个标准化、轻量级、可移植的单元（容器），从而实现 **"一次构建，处处运行"**。

**核心价值**

- **环境一致性**：彻底解决"在我电脑上能跑"的问题，保证开发、测试、生产环境绝对一致。
- **隔离性**：每个容器拥有独立的文件系统、网络和进程空间，应用间互不干扰。
- **轻量高效**：与传统虚拟机相比，**容器直接共享主机内核**，启动更快（秒级）、资源占用更少（MB 级）。
- **DevOps 基石**：极大简化了持续集成/持续部署（CI/CD）流程，是实现微服务架构的理想载体。

**应用场景**

- **微服务**：将大型应用拆分为多个独立部署和扩展的容器化服务。
- **CI/CD 流水线**：以镜像作为标准化交付物，实现自动化测试和部署。
- **快速搭建/清理环境**：一键部署和销毁复杂的测试环境，保持主机清洁。
- **混合云部署**：凭借其可移植性，轻松在不同云平台间迁移应用。

#### 🔬 扩展知识

::: details

- 【L3】容器与虚拟机的本质区别：虚拟机通过 Hypervisor 模拟完整硬件，每个 VM 带独立 Guest OS；容器通过 Namespace 隔离 + Cgroups 限额，直接共享宿主机内核，因此启动从分钟级降到秒级、开销从 GB 级降到 MB 级。
- 【L4】容器技术演进：Unix chroot（1979）→ FreeBSD Jail → LXC（2008）→ Docker（2013，以镜像模型与开发者体验破圈）→ OCI 标准（2015，镜像规范与运行时规范解耦，containerd/CRI-O 等运行时可替换 Docker）。

> 📚 延伸阅读：[Docker 官方文档](https://docs.docker.com/)

:::

#### 🔀 发散问题

- **Q：Docker 有哪些核心概念？** → 镜像、容器、仓库、Dockerfile、网络、卷六大概念，见本文档「Docker 有哪些核心概念和组件？」。
- **Q：Docker 为什么能做到既隔离又轻量？** → 依赖 Namespace 隔离、Cgroups 限额、UnionFS 分层三大内核机制，见本文档「Docker 的工作原理是什么？」。
- **Q：镜像和容器是什么关系？** → 镜像是只读模板，容器是镜像的运行实例，见本文档「Docker 中的镜像和容器有什么区别？」。

### 【简单】Docker 有哪些核心概念和组件？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 基础概念

#### 💎 关键结论

Docker 围绕六大概念组织：**镜像**（只读模板）、**容器**（运行实例）、**仓库**（镜像分发）、**Dockerfile**（构建脚本）、**网络**（容器通信）、**卷**（数据持久化）。一句话串联：Dockerfile 构建镜像、仓库分发镜像、容器运行应用、网络负责互通、卷负责存数据。

#### ⚡记忆卡片

- **口诀**：镜像是模、容器是活、仓库分发、文件构建、网络互通、卷存数据
- **关键词**：镜像 ／ 容器 ／ 仓库 ／ Dockerfile ／ 网络 ／ 卷
- **链路**：Dockerfile → 构建镜像 → 推送仓库 → 启动容器 → 网络互通 + 卷持久化

#### 📖 核心知识

- **容器**：是 Docker 的核心组件，是一个轻量级、可移植、自包含的软件包，包含应用程序运行所需的所有依赖项，与主机系统隔离但共享内核。
- **镜像**：是一个只读模板，包含启动容器所需的文件系统和配置信息，可基于其他镜像构建，由多个层组成。
- **仓库**：用于存储和分发 Docker 镜像，分为公共仓库和私有仓库，Docker Hub 是常见的公共仓库。
- **Dockerfile**：是一个文本文件，包含一系列指令，用于定义如何构建 Docker 镜像。
- **网络**：Docker 网络允许容器之间进行通信，提供多种网络驱动，如桥接网络、主机网络和覆盖网络等。
- **卷**：是 Docker 中用于持久化数据的机制，可独立于容器生命周期存在，也可用于多个容器之间共享数据。

#### 🔀 发散问题

- **Q：守护进程、客户端这些架构组件有哪些？** → 见本文档「Docker 有哪些核心组件？」，从 C/S 架构视角切入，与本题的概念对象视角互补。
- **Q：镜像为什么能分层复用？** → 见本文档「Docker 镜像的多层结构是如何实现的？」。
- **Q：卷如何实现持久化？** → 见本文档「如何在 Docker 中实现数据卷（volume）的持久化存储？」。

### 【简单】Docker 有哪些核心组件？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 基础概念

#### 💎 关键结论

Docker 采用 **C/S 架构**：**客户端**发命令，**守护进程（dockerd）**干活——管理镜像、容器、网络、卷；**Registry** 负责镜像存储与分发（如 Docker Hub）；上层工具 **Compose** 管单机多容器、**Swarm** 管集群编排。

#### ⚡记忆卡片

- **口诀**：客户端下令、守护干活、仓库分发、Compose 编排单机、Swarm 编排集群
- **关键词**：dockerd ／ docker CLI ／ Registry ／ Compose ／ Swarm
- **链路**：客户端 → REST API → 守护进程 →（镜像 ↔ Registry）→ 容器/网络/卷

#### 📖 核心知识

- **Docker 守护进程**：运行在宿主机上，负责管理 Docker 对象，如镜像、容器、网络和卷等。
- **Docker 客户端**：是一个命令行工具，用于与 Docker 守护进程交互，用户通过客户端发送命令来管理容器和镜像。
- **Docker Registry**：是一个存储和分发 Docker 镜像的服务，公共的 Docker Registry 是 Docker Hub，用户也可以搭建私有 Registry。
- **Docker Compose**：用于定义和运行多容器 Docker 应用程序，通过一个 `docker-compose.yml` 文件，可定义多个服务及其依赖关系。
- **Docker Swarm**：是 Docker 的原生集群管理和编排工具，允许用户将多个 Docker 主机组成一个虚拟的 Docker 主机，实现容器的高可用性和负载均衡。

#### 🔀 发散问题

- **Q：镜像、容器、卷这些概念对象怎么理解？** → 见本文档「Docker 有哪些核心概念和组件？」，从概念对象视角切入，与本题的架构组件视角互补。
- **Q：Compose 的主要作用是什么？** → 见本文档「Docker Compose 的主要作用是什么？」。
- **Q：Swarm 是什么？** → 见本文档「什么是 Docker Swarm？」。

### 【中等】Docker 的工作原理是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 原理

#### 💎 关键结论

Docker 的底层靠 **Linux 内核三支柱**：**Namespace** 做隔离（独立的进程/网络/文件系统视图）、**Cgroups** 做资源限额（CPU/内存不超用）、**UnionFS** 做分层存储（镜像分层 + 可写层）。Docker 引擎在此之上封装出镜像拉取、容器生命周期管理，实现"一次构建，到处运行"。

#### ⚡记忆卡片

- **口诀**：Namespace 隔、Cgroups 限、UnionFS 分层存
- **关键词**：Namespace ／ Cgroups ／ UnionFS ／ 可写层 ／ Docker 引擎
- **链路**：Namespace 隔离 → Cgroups 限额 → UnionFS 分层 → Docker 引擎管理生命周期

#### 📖 核心知识

Docker 基于 **容器化技术** 和 **Linux 内核特性**（如 Namespace 隔离、Cgroups 资源限制、Union File System 分层存储）实现：

- **隔离性**：通过 Namespace 为容器提供独立的 PID（进程）、Network（网络）、Mount（文件系统）等命名空间，使容器看起来像独立主机。
- **资源控制**：通过 Cgroups 限制容器的 CPU、内存等资源，防止过度占用宿主机资源。
- **分层存储**：利用联合文件系统将镜像分层存储，容器运行时在镜像只读层上添加可写层，实现增量修改，节省空间并提高复用率。
- **生命周期管理**：通过 Docker 引擎协调镜像拉取、容器创建 / 启动 / 停止 / 删除等操作，简化应用的打包、部署和迁移流程。

简言之，Docker 通过封装和隔离，实现了 "一次构建，到处运行" 的目标，解决了应用环境一致性问题。

#### 🔬 扩展知识

::: details

- 【L3】Linux Namespace 共有 6 种（内核 4.x 后为 8 种）：PID（进程号）、NET（网络栈）、MNT（挂载点）、UTS（主机名）、IPC（进程间通信）、USER（用户与组），新版本还有 CGROUP 和 TIME。容器"看起来像独立主机"正是这几种命名空间叠加的效果。
- 【L4】当前主流存储驱动是 **overlay2**：镜像只读层依次叠放，容器启动时在最上层加一个可写层，写操作通过 **Copy-on-Write（写时复制）** 落到可写层，删除用 whiteout 标记。分层 + 共享让多个容器可复用同一份基础层，磁盘与传输都省。

> 📚 延伸阅读：[Docker 官方文档：Understand the underlying architecture](https://docs.docker.com/get-started/overview/)

:::

#### 🔀 发散问题

- **Q：Cgroups 的资源限制具体怎么配？** → 通过 `--cpus`、`-m` 等参数落到 Cgroups 配置，见本文档「Docker 容器如何实现资源限制（如 CPU 和内存）？」。
- **Q：分层存储具体是怎么实现的？** → 见本文档「Docker 镜像的多层结构是如何实现的？」。
- **Q：隔离被突破会怎样？** → 共享内核意味着隔离可能被穿透，见本文档「什么是容器逃逸？常见的逃逸途径和防御手段有哪些？」。

### 【困难】如何保证 Docker 沙箱执行时的安全性？⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Docker / 安全

#### 💎 关键结论

Docker 安全的核心是 **"最小权限"原则**：绝不给予容器超出其运行所需之外的任何权限。落地为五件事——**最小镜像**、**非 root 运行**、**丢弃所有能力**、**只读根目录**、**保护 Docker Socket**，叠加起来构成深度防御体系，极大降低被逃逸利用的风险。

#### ⚡记忆卡片

- **口诀**：最小镜像非 root，cap-drop 全丢再按需，只读根目录，sock 不外露
- **关键词**：最小权限 ／ Alpine/Distroless ／ Trivy ／ cap-drop ／ userns-remap
- **链路**：镜像安全（供应链）→ 运行时安全（最核心）→ 网络安全 → 主机安全

#### 📖 核心知识

**遵循最小权限原则：** 绝不给予容器超出其运行所需之外的任何权限。

Docker 安全是 **"最小权限"** 的实践。通过使用**最小镜像**、以**非 root** 运行、**丢弃所有能力**、配置**只读根目录**，并**保护 Docker Socket**，可构建深度防御体系，极大降低风险。

| 层面                             | 核心实践                                                                                                        | 关键命令/示例                                                                                                               |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **镜像安全** <br/>（供应链安全） | **使用最小化基础镜像** (Alpine, Distroless) <br/>**扫描镜像漏洞** (Trivy, Grype) <br/>**多阶段构建**            | `FROM alpine:3.18` <br/> `trivy image my-app:latest`                                                                        |
| **运行时安全** <br/>（最核心）   | **禁止以 root 用户运行** <br/>**限制 Linux 能力** <br/>**使用只读文件系统** <br/>**限制资源** (CPU, 内存，PIDs) | `USER 1000` <br/> `--cap-drop=ALL --cap-add=NET_BIND_SERVICE` <br/> `--read-only --tmpfs /tmp` <br/> `-m 512m --cpus="1.5"` |
| **网络安全**                     | **使用自定义网络** <br/>**谨慎发布端口**                                                                        | `docker network create my-net` <br/> `-p 127.0.0.1:8080:80`                                                                 |
| **主机安全**                     | **严禁随意挂载 Docker Socket** <br/>**启用用户命名空间重映射**                                                  | **绝不轻易使用：** <br/> `-v /var/run/docker.sock:/var/run/docker.sock`                                                     |

#### 🔬 扩展知识

::: details

- 【L3】纵深防御的第二层是内核安全策略：**Seccomp** 限制可用系统调用（Docker 默认 profile 拦截约 44 个危险系统调用）、**AppArmor/SELinux** 做强制访问控制；再配合 **userns-remap** 把容器内 root 映射为宿主机普通用户，即使提权成功也拿不到宿主权限。
- 【L4】安全治理要流程化：镜像准入用 Trivy/Grype 扫描高危漏洞并卡 CI 门禁；基线核查用 `docker-bench-security` 对照 CIS Docker Benchmark（100+ 检查项）定期巡检；不可信代码场景升级到 gVisor/Kata 沙箱运行时。

> 📚 延伸阅读：[Docker 官方文档：Engine security](https://docs.docker.com/engine/security/)

:::

#### 🔀 发散问题

- **Q：隔离被突破的典型攻击长什么样？** → 见本文档「什么是容器逃逸？常见的逃逸途径和防御手段有哪些？」。
- **Q：最小镜像怎么配合构建落地？** → 多阶段构建能把编译工具剔出运行镜像、缩小攻击面，见本文档「Docker 中的多阶段构建有什么优势？」。
- **Q：资源耗尽型攻击怎么防？** → 限制 CPU/内存/PIDs，见本文档「Docker 容器如何实现资源限制（如 CPU 和内存）？」。

### 【困难】什么是容器逃逸？常见的逃逸途径和防御手段有哪些？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：Docker / 安全

#### 💎 关键结论

**容器逃逸**指容器进程突破隔离边界、获取宿主机控制权。容器与宿主机**共享内核**，隔离依赖 Namespace、Cgroups 和能力机制，配置不当即可被突破。高频途径：挂载 docker.sock、`--privileged`、危险挂载、内核漏洞。防御一句话：**最小权限 + 及时打补丁**。

#### ⚡记忆卡片

- **口诀**：不给特权不挂 sock，cap-drop 全丢非 root，内核补丁要及时，不可信代码上沙箱
- **关键词**：docker.sock ／ --privileged ／ CVE-2019-5736 ／ userns-remap ／ gVisor/Kata
- **链路**：逃逸途径（sock/特权/挂载/内核漏洞）→ 最小权限加固 → 安全策略 → 沙箱运行时 → 准入控制兜底

#### 📖 核心知识

**容器逃逸**是指容器内的进程突破隔离边界，获取宿主机控制权的安全事件。容器与宿主机**共享内核**，隔离依赖 Namespace、Cgroups 和能力机制，一旦配置不当就可能被突破。

**常见逃逸途径**：

| 途径                         | 原理                                                          |
| :--------------------------- | :------------------------------------------------------------ |
| **挂载 Docker Socket**       | 容器内可直接调用 Docker API 启动特权容器，等于拿到宿主机 root |
| **特权模式（--privileged）** | 容器拥有全部 Capabilities 和设备访问权，可挂载宿主机磁盘      |
| **危险挂载**                 | 挂载 `/`、`/proc`、`/sys` 等宿主机目录可直接读写宿主机        |
| **内核漏洞**                 | 利用内核提权漏洞（如 Dirty Pipe、runc CVE-2019-5736）突破隔离 |
| **危险文件描述符**           | 通过 `/proc/self/fd` 等引用突破容器文件系统                   |

**防御手段**：

- **最小权限**：禁用 `--privileged`，`--cap-drop=ALL` 后按需添加能力，非 root 运行。
- **管控挂载**：绝不挂载 docker.sock 和宿主机敏感目录；需要时用 **rootless 模式**。
- **加固隔离**：启用用户命名空间重映射（userns-remap）、**只读根文件系统**、Seccomp/AppArmor/SELinux 安全策略。
- **及时补丁**：保持内核和容器运行时（runc/containerd）版本更新，用 **gVisor/Kata Containers** 提供更强隔离。

**总结**：容器隔离是"君子协定"而非硬边界，防逃逸的核心就一句话——最小权限 + 及时打补丁。

#### 🔬 扩展知识

::: details

**方案权衡：防御层级选型**

| 方案                                                              | 防护强度 | 成本/代价                              | 适用边界                           |
| :---------------------------------------------------------------- | :------- | :------------------------------------- | :--------------------------------- |
| **配置加固**（cap-drop、非 root、只读根目录）                     | 中       | 几乎零成本                             | 所有容器都该做，入门底线           |
| **安全策略**（Seccomp/AppArmor/SELinux + Pod Security Admission） | 中高     | 需维护策略，可能误拦                   | 企业内部可信代码的标准配置         |
| **沙箱运行时**（gVisor/Kata）                                     | 高       | 有 5%~15% 性能损耗，部分系统调用不兼容 | 多租户、不可信代码、合规强隔离场景 |

**失效场景**：

- **`--privileged` 直接击穿所有隔离**：特权容器拥有全部 Capabilities 和设备访问权，`mount /dev/sda1 /mnt` 一条命令就能拿到宿主机完整 root，Seccomp/AppArmor 都拦不住——所以特权容器必须全网扫描、逐个审批。
- **挂载 docker.sock 等于交出宿主机**：容器内可通过 Docker API 启动一个挂载宿主根目录的特权容器，等价于直接 root，CI 系统里这是最高频的违规配置。
- **补丁滞后时防御失效**：CVE-2019-5736（runc 逃逸）这类运行时漏洞，不升级 runc 时所有配置加固都拦不住。

**量化参考**：Docker 默认 Seccomp 配置会拦截约 44 个危险系统调用；CIS Docker Benchmark 共有 100+ 检查项，可用 `docker-bench-security` 一键扫描；行业红线：生产环境特权容器数量应为 **0**。

> 📚 延伸阅读：[CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)

:::

#### 🏭 实战场景

::: details

**踩坑案例**：某团队 CI 系统为了图方便，给构建容器挂载了 `/var/run/docker.sock`。一次安全演练中，红队通过一个含漏洞的构建脚本在容器内调用 Docker API，执行 `docker run --privileged -v /:/host` 拿到了宿主机完整控制权，前后只用了 3 分钟，横向打到了同机其他 6 个业务容器。排查：审计 docker.sock 挂载点与宿主机异常进程链；根因：CI 容器默认模板含危险挂载且无准入扫描；修复：全量排查存量容器挂载，CI 改用 rootless 构建（buildkit rootless 模式），并用准入策略（OPA/Kyverno）禁止特权容器与危险挂载上线。

**场景题**：安全扫描发现某生产集群里有 12 个容器使用了 `--privileged`，其中 3 个是存储插件（确实需要），9 个是业务团队"当年部署报错加上试试就好了"留下的。你作为平台 SRE，如何在不影响业务的前提下完成整改？

**应急处理**：先分级：① 立即对 9 个非必需特权容器做运行时审计（检查是否有异常进程/外连），确认未被利用；② 3 个存储插件确认属于必需后加白名单并限制到专用节点（taint/toleration），缩小爆炸半径。

**根因分析**：特权容器泛滥的根源不是开发者安全意识差，而是平台缺少准入控制——`--privileged` 能直接生效说明部署链路没有安全门禁；"报错加权限"的行为说明平台没有提供诊断支持，开发者只能用特权模式碰运气。

**长期方案**：① 上线准入策略（Pod Security Admission restricted 级别或 OPA/Kyverno），默认拒绝特权容器，白名单需安全审批；② 存量 9 个容器逐个分析真实权限需求，用 `--cap-add=<具体能力>` 替换全特权，多数场景只需 1~2 个 capability；③ 把 `docker-bench-security` 纳入周度安全巡检，新增特权容器告警到安全群。

**权衡**：一刀切立即禁用会导致业务部署失败、引发绕开平台的影子部署；逐容器分析又耗人力。正确的节奏是"新账不欠（准入拦截立即生效）+ 旧账限期还（存量按风险排序，2 周内清零）"，并给业务提供降权后的调试支持，把安全整改做成服务而不是对抗。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "容器和虚拟机一样是硬隔离" → 容器共享宿主机内核，隔离是"君子协定"；内核漏洞可直接穿透，多租户不可信代码应使用 gVisor/Kata 等沙箱运行时。
- ❌ "只要配置加固就能挡住一切逃逸" → CVE-2019-5736（runc 逃逸）这类运行时漏洞，不升级 runc 时所有配置加固都拦不住，打补丁是防御前提。
- ❌ "挂载 docker.sock 方便容器自我管理" → 拥有 docker.sock 即可通过 Docker API 创建挂载宿主机根目录的特权容器，等于直接交出宿主机 root。

:::

#### 🔀 发散问题

- **Q：为什么挂载了 docker.sock 就等于拿到了宿主机 root？** → docker.sock 是 Docker daemon 的 API 入口，拥有它的容器可以创建任意新容器，包括挂载宿主机根目录（`-v /:/host`）的特权容器；进入该容器后对 /host 的读写就是对宿主机的读写。本质上谁控制 Docker daemon 谁就是宿主机 root，所以 daemon 控制面必须与业务容器彻底隔离。
- **Q：userns-remap 是如何提升逃逸成本的？** → 它把容器内的 root（UID 0）映射为宿主机的一个普通非特权用户（如 UID 100000），即使攻击者在容器内提权到 root，在宿主机视角只是个普通用户，大幅降低逃逸后的破坏面。代价是部分需要真实权限的功能（如某些 NFS 挂载、设备访问）会受影响，需逐应用验证。
- **Q：gVisor 和 Kata Containers 的隔离原理有什么区别？** → gVisor 在用户态实现应用内核（Sentry）拦截容器的系统调用，容器永远接触不到宿主机真内核，代价是系统调用兼容性和性能损耗；Kata 给每个容器（Pod）套一层轻量 VM，容器跑在独立 Guest 内核里，隔离强度接近 VM，代价是启动稍慢、资源开销更大。选型口诀：不可信代码选 Kata，兼顾性能选 gVisor。
- **Q：日常安全加固的整体实践有哪些？** → 见本文档「如何保证 Docker 沙箱执行时的安全性？」。

## 镜像和容器

### 【简单】Docker 中的镜像和容器有什么区别？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 镜像

#### 💎 关键结论

**镜像是只读的静态模板，容器是镜像的运行实例**。镜像由多层只读层组成、通过 `docker build` 构建；容器在其上叠加一个可写层、通过 `docker run` 启动，有独立生命周期。一个镜像可启动多个容器，容器删除不影响镜像。

#### ⚡记忆卡片

- **口诀**：镜像是类，容器是对象；镜像只读，容器可写
- **关键词**：只读模板 ／ 运行实例 ／ 可写层 ／ 一对多
- **链路**：Dockerfile → build 镜像（只读层）→ run 容器（+可写层）→ 停止/删除

#### 📖 核心知识

| 特性         | 镜像 (Image)                             | 容器 (Container)                                    |
| :----------- | :--------------------------------------- | :-------------------------------------------------- |
| **本质**     | **只读的模板**和**静态文件**             | **镜像的运行实例**和**隔离的进程**                  |
| **状态**     | **静态的、不可变的**                     | **动态的、可变的**（运行、暂停、停止）              |
| **存储**     | 由一系列**只读层**组成                   | 在镜像的只读层之上，添加一个薄薄的**可写层**        |
| **创建方式** | 通过 `docker build` 根据 Dockerfile 创建 | 通过 `docker run` 从镜像启动                        |
| **数量关系** | 一个镜像可以用于**启动多个容器**         | 多个容器可以基于**同一个镜像**运行                  |
| **生命周期** | 手动**移除** (`docker rmi`)              | 可以被**启动、停止、删除** (`docker start/stop/rm`) |

#### 🔀 发散问题

- **Q：容器多出来的可写层是怎么实现的？** → 联合文件系统分层 + 写时复制，见本文档「Docker 镜像的多层结构是如何实现的？」。
- **Q：容器删了，数据还在吗？** → 容器可写层随容器删除，持久化要靠卷，见本文档「如何在 Docker 中实现数据卷（volume）的持久化存储？」。

### 【简单】Docker 中如何实现镜像的推送和拉取？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 镜像

#### 💎 关键结论

推送/拉取走同一套流程：`docker login` 认证 → `docker tag` 按 `仓库地址/用户名/镜像名:版本` 打标签 → `docker push` 上传 / `docker pull` 下载（不指定版本默认 latest）→ 可选 `docker logout`。适用于 Docker Hub 或私有仓库。

#### ⚡记忆卡片

- **口诀**：先登录、再打标、推拉看标签，用完退登录
- **关键词**：docker login ／ docker tag ／ docker push ／ docker pull
- **链路**：login → tag → push/pull → （logout）

#### 📖 核心知识

Docker 实现镜像推送和拉取的核心步骤（适用于 Docker Hub 或私有仓库）：

- **登录仓库**：用 `docker login [仓库地址]` 完成身份认证
- **镜像打标签**：按 `仓库地址/用户名/镜像名：版本` 格式，通过 `docker tag` 关联本地镜像与远程地址
- **推送镜像**：用 `docker push 标签名` 上传镜像到仓库
- **拉取镜像**：用 `docker pull 标签名`（不指定版本默认拉 latest）从仓库下载镜像
- **可选退出**：操作后可通过 `docker logout [仓库地址]` 退出登录

#### 🔀 发散问题

- **Q：仓库属于 Docker 的哪个组成部分？** → 见本文档「Docker 有哪些核心组件？」中的 Docker Registry。
- **Q：镜像为什么拉取快、体积省？** → 分层结构支持按层增量传输，见本文档「Docker 镜像的多层结构是如何实现的？」。

### 【中等】Docker 容器如何实现资源限制（如 CPU 和内存）？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 资源管理

#### 💎 关键结论

底层靠 **Cgroups**，落地靠 `docker run` 参数：内存用 `-m` 设硬上限（配 `--memory-swap` 管交换区），CPU 用 `--cpus` 限核心数、`--cpu-shares` 调竞争权重、`--cpuset-cpus` 绑核。超限内存会触发 OOM Kill，这是给容器设内存上限的直接原因。

#### ⚡记忆卡片

- **口诀**：内存 -m 设上限，CPU --cpus 限核忙，shares 权重 set 绑核
- **关键词**：Cgroups ／ -m ／ --memory-swap ／ --cpus ／ --cpu-shares ／ --cpuset-cpus
- **链路**：run 参数 → Cgroups 生效 → 超内存 OOM Kill ／ CPU 按权重分配

#### 📖 核心知识

Docker 容器的 CPU 和内存资源限制可通过命令参数实现，核心方式：

- **内存限制**
  - `--memory/-m`：限制最大使用内存（如 `-m 512m`）
  - `--memory-swap`：限制内存 + 交换区总用量（需配合 `-m` 使用）
- **CPU 限制**
  - `--cpus`：指定可用核心数（支持小数，如 `--cpus 0.5`）
  - `--cpu-shares`：设置资源竞争时的相对权重（默认 1024）
  - `--cpuset-cpus`：绑定特定物理核心（如 `--cpuset-cpus 0,1`）

::: details 示例：限制容器最多使用 1 个 CPU 核心、512MB 内存

```shell
docker run -d --cpus 1 -m 512m --name memory-limited nginx
```

:::

#### 🔬 扩展知识

::: details

- 【L3】内存硬限制触发后果：容器内存超过 `-m` 上限时，内核的 OOM Killer 会杀掉容器内进程，容器表现为反复重启；因此 JVM 类应用还需让堆上限感知容器限额（`-XX:MaxRAMPercentage`），否则 JVM 按宿主机内存估算会被 OOM Kill。
- 【L4】软限制与进程数限制：`--memory-reservation` 是尽力而为的软限制，仅在宿主机内存紧张时生效；`--pids-limit` 可防 fork 炸弹。cgroups v2 相比 v1 统一了控制器层级，是新一代发行版的默认方向。

> 📚 延伸阅读：[Docker 官方文档：Resource constraints](https://docs.docker.com/config/containers/resource_constraints/)

:::

#### 🔀 发散问题

- **Q：资源限制属于 Docker 哪个底层机制？** → Cgroups，属于工作原理三支柱之一，见本文档「Docker 的工作原理是什么？」。
- **Q：限制资源对安全有什么意义？** → 防资源耗尽型攻击，见本文档「如何保证 Docker 沙箱执行时的安全性？」。

### 【中等】Docker 镜像的多层结构是如何实现的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 镜像

#### 💎 关键结论

镜像由**多个只读层**叠成，每层对应 Dockerfile 的一条指令，靠**联合文件系统（UnionFS）**挂载成一个整体视图；容器运行时在顶部加一层**可写层**，所有修改只落在可写层（Copy-on-Write）。不同镜像**共享相同基础层**，因此存储省、传输快、构建有缓存。

#### ⚡记忆卡片

- **口诀**：一条指令一层楼，只读层上盖写层，基础楼层大家共用
- **关键词**：UnionFS ／ 只读层 ／ 可写层 ／ Copy-on-Write ／ 层复用
- **链路**：Dockerfile 指令 → 只读层 → 联合挂载 → 容器 + 可写层 → 增量修改

#### 📖 核心知识

Docker 镜像的多层结构基于联合文件系统实现，核心要点：

1. **分层存储**：由多个只读层组成，每层对应 Dockerfile 一条指令（如 `FROM`、`RUN` 等）
2. **读写分离**：运行容器时添加可写层，仅在该层进行修改，不改变底层只读层
3. **层复用机制**：不同镜像可共享基础层，节省空间，加速构建与传输

通过分层设计实现镜像轻量、高效的存储与分发。

#### 🔬 扩展知识

::: details

- 【L3】主流存储驱动是 **overlay2**：lowerdir 叠放各只读层、upperdir 是容器可写层、merged 呈现统一文件系统视图。删除文件时在可写层写 whiteout 标记"遮住"下层文件，底层数据其实还在。
- 【L4】分层带来的工程收益可量化：`docker history` 可查看每层的来源指令与体积；镜像推拉按层传输，本地已有的层直接跳过；构建时指令前缀未变即命中缓存——这也是"不常变的指令放前面"最佳实践的底层原因。

> 📚 延伸阅读：[Docker 官方文档：About storage drivers](https://docs.docker.com/storage/storagedriver/)

:::

#### 🔀 发散问题

- **Q：分层结构依赖哪个底层机制？** → UnionFS 联合文件系统，属于工作原理三支柱之一，见本文档「Docker 的工作原理是什么？」。
- **Q：怎么利用分层让构建更快？** → 指令排序利用层缓存，见本文档「Dockerfile 有哪些最佳实践？」。
- **Q：怎么用分层思路减小镜像体积？** → 见本文档「如何减小 Docker 镜像体积？」。

## Docker 构建

### 【简单】如何构建 Docker 镜像？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Docker / 构建

#### 💎 关键结论

四步走：① 建目录写 `Dockerfile`；② 用 `FROM`/`WORKDIR`/`COPY`/`RUN`/`ENV`/`EXPOSE`/`CMD` 等指令定义构建流程；③ 在 Dockerfile 目录执行 `docker build -t 名称:版本 .`；④ `docker run` 验证。`.` 是构建上下文，会整体发给 daemon。

#### ⚡记忆卡片

- **口诀**：写 Dockerfile、build 打标签、run 来验证
- **关键词**：Dockerfile ／ FROM ／ RUN ／ CMD ／ docker build ／ 构建上下文
- **链路**：Dockerfile → docker build（上下文 `.`）→ 镜像 → docker run 验证

#### 📖 核心知识

使用 Dockerfile 创建自定义镜像的核心是通过编写指令脚本，定义镜像的构建流程，具体步骤如下：

（1）**准备工作**

- 创建项目目录（如 `my-image`），并在其中新建 `Dockerfile`（无扩展名）
- 准备所需文件（如应用代码、配置文件等）

（2）**编写 Dockerfile 指令**

常用核心指令及作用：

::: details 示例 Dockerfile

```dockerfile
# 基础镜像（必填，指定从哪个镜像构建）
FROM ubuntu:22.04

# 设置工作目录（后续命令在此目录执行）
WORKDIR /app

# 复制文件（本地文件 -> 镜像内目录）
COPY ./app.py /app/
COPY ./requirements.txt /app/

# 执行命令（如安装依赖）
RUN apt-get update && \
    apt-get install -y python3 && \
    pip3 install -r requirements.txt

# 设置环境变量
ENV APP_ENV=production

# 声明暴露端口（仅文档说明，需运行时-p 映射）
EXPOSE 5000

# 容器启动命令（容器启动时执行）
CMD ["python3", "app.py"]
```

:::

（3）**构建镜像**

在 Dockerfile 所在目录执行：

```shell
# -t 指定镜像标签（格式：名称：版本）
# . 表示构建上下文（当前目录所有文件）
docker build -t my-python-app:v1 .
```

（4）**验证自定义镜像**

```shell
# 运行镜像测试
docker run -p 5000:5000 my-python-app:v1

# 查看镜像信息
docker images | grep my-python-app
```

#### 🔀 发散问题

- **Q：这个 Dockerfile 有哪些可优化点？** → 合并 RUN、利用缓存、固定版本等，见本文档「Dockerfile 有哪些最佳实践？」。
- **Q：构建产物太大怎么办？** → 见本文档「如何减小 Docker 镜像体积？」。

### 【中等】Docker 中的多阶段构建有什么优势？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 构建

#### 💎 关键结论

多阶段构建在一个 Dockerfile 里定义多个 `FROM` 阶段，用 `COPY --from` 只把**运行必需产物**带进最终镜像。四大优势：**体积小**（剔除编译工具/源码）、**维护简**（单文件完成全流程）、**更安全**（攻击面无构建残留）、**效率高**（各阶段选最合适的基础镜像）。

#### ⚡记忆卡片

- **口诀**：多个 FROM 分阶段，--from 只搬产物，编译工具全丢掉
- **关键词**：多 FROM ／ COPY --from ／ 构建与运行分离 ／ 攻击面
- **链路**：构建阶段（重镜像编译）→ COPY --from → 运行阶段（轻镜像）

#### 📖 核心知识

Docker 多阶段构建的核心优势：

- **减小镜像体积**：分离构建与运行环境，仅保留运行必需文件，剔除编译工具、源码等冗余内容
- **简化维护**：单 Dockerfile 完成全流程，通过 `COPY --from` 复用前序产物，无需多个文件或手动清理
- **提升安全性**：减少镜像包含的工具和文件，降低攻击面，避免敏感信息残留
- **优化效率**：各阶段可使用最适合的基础镜像，支持并行构建场景

#### 🔬 扩展知识

::: details

- 【L3】进阶用法：`COPY --from=<阶段名或镜像>` 既能引用前序阶段，也能直接从外部镜像拷贝文件（如 `COPY --from=busybox /bin/true /`）；`FROM ... AS stage` 给阶段命名后可在后续阶段间跳跃引用，未最终引用的阶段产物不会进入成品镜像。
- 【L4】BuildKit 加持下各阶段可并行构建，配合 `--target` 参数可以只构建到指定阶段（如 CI 中只构建"测试阶段"的镜像），进一步压缩流水线时间。

> 📚 延伸阅读：[Docker 官方文档：Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

:::

#### 🔀 发散问题

- **Q：具体怎么写一个多阶段 Dockerfile？** → 见本文档「在 Docker 中，如何构建多阶段镜像以减少镜像体积？」。
- **Q：多阶段构建与镜像瘦身的关系？** → 它是瘦身核心手段之一，见本文档「如何减小 Docker 镜像体积？」。

### 【中等】在 Docker 中，如何构建多阶段镜像以减少镜像体积？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 构建

#### 💎 关键结论

写法固定三段式：第一个 `FROM` 用**重编译镜像**装依赖并编译（`AS build-stage`），第二个 `FROM` 用**轻运行镜像**（如 nginx:alpine），中间用 `COPY --from=build-stage` 只搬产物（如 `dist` 目录）。编译工具、`node_modules` 全部留在构建阶段，成品镜像只剩运行时必需文件。

#### ⚡记忆卡片

- **口诀**：编译用重镜像，运行用轻镜像，--from 搬产物
- **关键词**：AS build-stage ／ COPY --from ／ nginx:alpine ／ dist 产物
- **链路**：node:18 编译 → dist 产物 → nginx:alpine 只装 dist → 小镜像

#### 📖 核心知识

::: details 多阶段构建示例（前端项目）

```dockerfile
# 构建阶段：使用完整的编译环境
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install  # 安装依赖
COPY . .
RUN npm run build  # 编译前端项目（生成 dist 目录）

# 运行阶段：使用轻量的 Nginx 镜像
FROM nginx:alpine
# 复制构建阶段的产物到 Nginx 静态目录
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 暴露 80 端口
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

:::

关键点：

- **构建阶段**承担安装依赖、编译打包的全部"脏活累活"，体积多大都无所谓
- **运行阶段**只保留静态产物 + Nginx，`node_modules`、编译缓存一概不进入成品
- 两个阶段可在同一 Dockerfile 中维护，无需手工在脚本间搬运产物

#### 🔬 扩展知识

::: details

- 【L3】体积对比量级：`node:18` 约 1GB，直接带 `node_modules` 的成品动辄数百 MB；换成 `nginx:alpine` + 静态产物后常见成品仅 20~50MB，拉取时间与存储成本同比例下降。
- 【L4】Java/Go 场景变体：Go 可 `FROM scratch` + 静态编译二进制做到 10MB 级；Java 可用 `FROM eclipse-temurin:17-jre-alpine` 只留 JRE；配合 `--target` 还能从同一 Dockerfile 产出"调试镜像"与"生产镜像"。

> 📚 延伸阅读：[Docker 官方文档：Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

:::

#### 🔀 发散问题

- **Q：为什么要用多阶段构建？** → 体积、维护、安全、效率四大优势，见本文档「Docker 中的多阶段构建有什么优势？」。
- **Q：还有哪些瘦身手段？** → 见本文档「如何减小 Docker 镜像体积？」。

## Dockerfile 最佳实践

### 【中等】COPY 和 ADD 有什么区别？CMD 和 ENTRYPOINT 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / Dockerfile

#### 💎 关键结论

**COPY vs ADD**：COPY 只复制本地文件、语义明确，推荐默认使用；ADD 多了自动解压 tar 和 URL 下载，行为不可预测，尽量少用。**CMD vs ENTRYPOINT**：CMD 是启动默认命令、`docker run` 尾部参数可直接覆盖；ENTRYPOINT 是固定入口、需 `--entrypoint` 才能覆盖。最佳组合：ENTRYPOINT 定主程序、CMD 给默认参数。

#### ⚡记忆卡片

- **口诀**：复制用 COPY，ADD 会解压；CMD 可覆盖，ENTRYPOINT 是入口
- **关键词**：COPY ／ ADD 解压 tar ／ CMD 默认参数 ／ ENTRYPOINT 固定入口
- **链路**：docker run 参数 → 覆盖 CMD → 追加到 ENTRYPOINT 之后

#### 📖 核心知识

**COPY vs ADD**

| 指令     | 功能                               | 区别                       |
| :------- | :--------------------------------- | :------------------------- |
| **COPY** | 复制本地文件到镜像                 | **推荐默认使用**，语义明确 |
| **ADD**  | 复制文件 + 自动解压 tar + 支持 URL | 行为不可预测，尽量少用     |

**CMD vs ENTRYPOINT**

| 指令           | 行为                         | 覆盖方式                      |
| :------------- | :--------------------------- | :---------------------------- |
| **CMD**        | 容器启动时的**默认命令**     | `docker run` 后加命令直接覆盖 |
| **ENTRYPOINT** | 容器启动时的**固定入口命令** | 需 `--entrypoint` 才能覆盖    |

**最佳组合**：`ENTRYPOINT` 定义主程序，`CMD` 提供默认参数。

::: details 组合示例

```dockerfile
ENTRYPOINT ["java", "-jar"]
CMD ["app.jar"]
# docker run myapp → java -jar app.jar
# docker run myapp app2.jar → java -jar app2.jar
```

:::

#### 🔬 扩展知识

::: details

- 【L3】exec 格式与 shell 格式的差异：`CMD ["java","-jar","app.jar"]`（exec 格式）直接 exec 进程，PID 1 就是 java，能正确接收 SIGTERM；`CMD java -jar app.jar`（shell 格式）会套一层 `/bin/sh -c`，PID 1 是 sh，信号可能无法转发导致优雅停机失败、`docker stop` 等满超时才 kill。
- 【L4】ADD 的两个正当用途：从构建上下文自动解压 tar 包（省去 RUN tar -xzf）、以及多阶段构建出现之前从远程 URL 拉文件（现在应改用 COPY + curl 或 `COPY --from`，以获得更好的缓存控制）。

> 📚 延伸阅读：[Dockerfile reference](https://docs.docker.com/reference/dockerfile/)

:::

#### 🔀 发散问题

- **Q：Dockerfile 还有哪些最佳实践？** → 见本文档「Dockerfile 有哪些最佳实践？」。
- **Q：容器启动命令与启动时间优化有关吗？** → 有关，启动流程越简单启动越快，见本文档「在 Docker 中，如何优化容器启动时间？」。

### 【中等】Dockerfile 有哪些最佳实践？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Docker / Dockerfile

#### 💎 关键结论

七条核心实践：**最小化基础镜像**（Alpine/Distroless）、**合并 RUN** 减层清缓存、**利用构建缓存**（不常变的指令放前面）、**多阶段构建**分离编译与运行、**非 root 运行**、用 **.dockerignore** 排除杂物、**固定版本标签**拒绝 latest。目标是：更小、更快、更安全、可复现。

#### ⚡记忆卡片

- **口诀**：小镜像、并 RUN、缓存放前、多阶段、非 root、ignore、锁版本
- **关键词**：Alpine ／ 层缓存 ／ 多阶段 ／ USER ／ .dockerignore ／ 固定标签
- **链路**：小基础镜像 → 指令排序吃缓存 → 合并 RUN 减层 → 多阶段剔冗余 → 非 root 交付

#### 📖 核心知识

| 实践               | 说明                                    | 示例                                                                          |
| :----------------- | :-------------------------------------- | :---------------------------------------------------------------------------- |
| **最小化基础镜像** | 使用 Alpine/Distroless 减少体积和攻击面 | `FROM alpine:3.18`                                                            |
| **合并 RUN 指令**  | 减少镜像层数，清理缓存                  | `RUN apt-get update && apt-get install -y xxx && rm -rf /var/lib/apt/lists/*` |
| **利用构建缓存**   | 将不常变化的指令放前面                  | 先 `COPY requirements.txt` 再 `COPY .`                                        |
| **多阶段构建**     | 分离编译环境和运行环境                  | 见本文档「在 Docker 中，如何构建多阶段镜像以减少镜像体积？」                  |
| **非 root 运行**   | 提升安全性                              | `USER 1000`                                                                   |
| **.dockerignore**  | 排除不需要的文件                        | 类似 `.gitignore`                                                             |
| **固定版本标签**   | 避免 `latest` 的不确定性                | `FROM node:18-alpine` 而非 `FROM node`                                        |

#### 🔬 扩展知识

::: details

- 【L3】缓存失效的精确规则：每条指令构建前先查"基础层 + 本指令内容"是否命中缓存，任一前置层失效则后续全失效；`COPY`/`ADD` 按**文件内容校验和**判断而非文件名，所以"先 COPY 依赖清单装依赖、再 COPY 全量代码"能让依赖层在代码频繁变动时依然命中。
- 【L4】`RUN apt-get update` 与 `apt-get install` 拆成两条指令是经典坑：update 层命中旧缓存时会安装过期版本的包，必须合并为一条并清理 `/var/lib/apt/lists/*`。CI 中可用 `docker build --cache-from` 或 BuildKit 的外部缓存后端（registry cache）跨流水线复用缓存。

> 📚 延伸阅读：[Docker 官方文档：Dockerfile best practices](https://docs.docker.com/build/building/best-practices/)

:::

#### 🔀 发散问题

- **Q：多阶段构建具体怎么写？** → 见本文档「在 Docker 中，如何构建多阶段镜像以减少镜像体积？」。
- **Q：非 root 运行属于哪个安全体系？** → 见本文档「如何保证 Docker 沙箱执行时的安全性？」。
- **Q：这些实践最终服务于什么指标？** → 镜像体积，见本文档「如何减小 Docker 镜像体积？」。

## 实践

### 【简单】在 Docker 中，如何管理和查看容器日志？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Docker / 实践

#### 💎 关键结论

用 `docker logs` 从容器中读取标准输出/错误日志：`-f` 实时跟踪、`--tail N` 只看末尾、`--since` 按时间过滤。日志由**日志驱动**（默认 json-file）采集落盘，生产环境务必配置 `max-size`/`max-file` 做轮转，防止日志撑爆磁盘。

#### ⚡记忆卡片

- **口诀**：logs 看日志，-f 跟踪 tail 截尾，轮转防撑盘
- **关键词**：docker logs ／ -f ／ --tail ／ json-file ／ 日志轮转
- **链路**：容器 stdout/stderr → 日志驱动落盘 → docker logs 读取

#### 📖 核心知识

通过 [`docker logs`](https://docs.docker.com/engine/reference/commandline/logs) 命令从容器中读取日志，常用用法：

- `docker logs 容器名`：查看全量日志
- `docker logs -f 容器名`：实时跟踪（类似 `tail -f`）
- `docker logs --tail 100 容器名`：只看最后 100 行
- `docker logs --since 30m 容器名`：按时间范围过滤

生产注意：默认日志驱动 json-file 不限制文件大小，需配置轮转参数，避免日志无限增长：

```shell
docker run -d --log-opt max-size=100m --log-opt max-file=3 nginx
```

#### 🔀 发散问题

- **Q：容器重启后日志还在吗？** → json-file 驱动下日志随容器保留，`docker rm` 删除容器时一并清除；要长期留存应接 ELK/Loki 等日志系统。
- **Q：多容器应用的日志怎么统一看？** → 用 Compose 集中管理，见本文档「Docker Compose 的主要作用是什么？」。

### 【中等】在 Docker 中，如何进行数据卷管理？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 存储

#### 💎 关键结论

数据卷由 Docker 统一管理，生命周期独立于容器。日常操作五个命令：`volume create` 创建、`volume ls` 列表、`volume inspect` 查详情、`volume rm` 删除、`volume prune` 清理无主卷。卷存放在宿主机 `/var/lib/docker/volumes/` 下，删容器不删卷。

#### ⚡记忆卡片

- **口诀**：create 建、ls 看、inspect 查、rm 删、prune 清无主
- **关键词**：volume create ／ volume ls ／ volume inspect ／ volume rm ／ volume prune
- **链路**：create → 挂载到容器 → rm 容器（卷保留）→ 复用或 prune 清理

#### 📖 核心知识

在 Docker 中，数据卷管理主要包括创建、挂载、查看、删除等操作。

| 命令                                                                                                | 功能描述                                                      | 常用示例                                                         |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------- |
| [**`docker volume create`**](https://docs.docker.com/engine/reference/commandline/volume_create/)   | **创建数据卷**                                                | `docker volume create my_volume`                                 |
| [**`docker volume rm`**](https://docs.docker.com/engine/reference/commandline/volume_rm/)           | **删除数据卷**                                                | `docker volume rm my_volume` `docker volume rm vol1 vol2`        |
| [**`docker volume ls`**](https://docs.docker.com/engine/reference/commandline/volume_ls/)           | **列出所有已有的数据卷**                                      | `docker volume ls` `docker volume ls --quiet` （仅显示名称）     |
| [**`docker volume inspect`**](https://docs.docker.com/engine/reference/commandline/volume_inspect/) | **查看数据卷的具体信息** （如：创建时间、挂载点、驱动类型等） | `docker volume inspect my_volume`                                |
| [**`docker volume prune`**](https://docs.docker.com/engine/reference/commandline/volume_prune/)     | **清理无主的数据卷**                                          | `docker volume prune` `docker volume prune --force` （无需确认） |

#### 🔬 扩展知识

::: details

- 【L3】卷的真实位置：`docker volume inspect` 返回的 `Mountpoint` 默认指向 `/var/lib/docker/volumes/<卷名>/_data`；卷被任何容器引用时无法删除（rm 报错），需先删容器或用 `docker volume rm -f`（慎用）。
- 【L4】卷驱动可扩展：`--driver` 支持第三方插件卷（如 NFS、云盘驱动），实现跨主机共享存储；配合 `--label` 给卷打标，便于批量治理与成本核算。

> 📚 延伸阅读：[Docker 官方文档：Manage data in Docker](https://docs.docker.com/storage/)

:::

#### 🔀 发散问题

- **Q：卷怎么挂载进容器实现持久化？** → 见本文档「如何在 Docker 中实现数据卷（volume）的持久化存储？」。
- **Q：容器被删后哪些数据会丢？** → 可写层随容器销毁，卷数据保留，见本文档「Docker 中的镜像和容器有什么区别？」。

### 【中等】如何在 Docker 中实现数据卷（volume）的持久化存储？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 存储

#### 💎 关键结论

两步完成：① `docker volume create` 创建卷；② `docker run -v 卷名:容器路径` 挂载。卷由 Docker 托管、**独立于容器生命周期**——容器删除后数据仍在，可被其他容器重新挂载复用，这是容器化有状态服务的标准姿势。

#### ⚡记忆卡片

- **口诀**：先建卷、再 -v 挂载，容器删了数据还在
- **关键词**：volume create ／ -v 挂载 ／ 生命周期独立 ／ 可复用
- **链路**：create 卷 → -v 卷名:/data → 写入数据 → 删容器 → 新容器重新挂载

#### 📖 核心知识

在 Docker 中实现数据卷（volume）的持久化存储，可以通过定义一个 Docker volume，并将其挂载到容器内部的路径来实现。具体步骤如下：

创建一个 Docker volume：

```shell
docker volume create my_volume
```

启动容器并将该 volume 挂载到容器内部的某个路径（例如 `/data`）：

```shell
docker run -d -v my_volume:/data --name my_container my_image
```

通过上述步骤，我们已经将一个名为 my_volume 的数据卷挂载到了容器 my_container 的 /data 目录，这样即使容器被删除，该数据卷中的数据也不会丢失，可以被其他容器重新挂载使用。

#### 🔬 扩展知识

::: details

- 【L3】三种数据挂载方式对比：**named volume**（`-v 卷名:/data`，Docker 托管、推荐用于生产数据）、**bind mount**（`-v /宿主路径:/data`，直接挂宿主目录，适合开发时同步代码）、**tmpfs**（`--tmpfs /tmp`，仅内存、不落盘，适合临时敏感数据）。
- 【L4】容器内未挂载卷的路径写入的是可写层，容器删除即丢失；因此数据库类服务必须显式把数据目录（如 `/var/lib/mysql`）挂到卷上，否则"升级镜像 = 清空数据"。

> 📚 延伸阅读：[Docker 官方文档：Volumes](https://docs.docker.com/storage/volumes/)

:::

#### 🔀 发散问题

- **Q：卷的日常管理命令有哪些？** → 见本文档「在 Docker 中，如何进行数据卷管理？」。
- **Q：可写层的原理是什么？** → 见本文档「Docker 镜像的多层结构是如何实现的？」。

### 【中等】在 Docker 中，如何优化容器启动时间？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 性能

#### 💎 关键结论

启动时间 = 拉取/解包时间 + 应用初始化时间。优化四方向：**镜像瘦身**（多阶段构建、轻量基础镜像、合并层）、**简化启动流程**（避免启动时耗时操作、异步初始化）、**资源配置**（启动期适当放宽 CPU/内存）、**基础设施**（overlay2 高效存储驱动 + 构建缓存预热）。

#### ⚡记忆卡片

- **口诀**：镜像瘦、流程简、资源足、驱动快
- **关键词**：多阶段构建 ／ alpine/distroless ／ 异步初始化 ／ overlay2
- **链路**：小镜像快拉取 → 启动命令精简 → 应用异步初始化 → 秒级就绪

#### 📖 核心知识

Docker 容器启动时间优化重点：

- **优化镜像**：多阶段构建减冗余，用轻量基础镜像（alpine/distroless），合并层减少层数
- **简化启动流程**：避免启动时耗时操作，减少命令复杂度，采用异步初始化
- **资源配置**：适当增加启动时 CPU / 内存配额，优化应用自身配置
- **利用缓存**：合理排序 Dockerfile 指令利用层缓存，预编译依赖
- **存储驱动**：使用 overlay2 等高效驱动

#### 🔬 扩展知识

::: details

- 【L3】先量化再优化：`docker run --rm 镜像` 配合 `time` 测冷启动；`docker events` / `systemd-analyze` 区分"镜像解包耗时"与"应用就绪耗时"——多数场景瓶颈在应用初始化（加载配置、建连接池），而非 Docker 本身。
- 【L4】大规模场景进阶：镜像预热（在节点提前 `docker pull`，避免调度后现拉）、镜像 P2P 分发（如 Dragonfly）；Kubernetes 场景还可用 init container 并行预检、readiness probe 精确界定"就绪"。

> 📚 延伸阅读：[Docker 官方文档：About storage drivers](https://docs.docker.com/storage/storagedriver/)

:::

#### 🔀 发散问题

- **Q：镜像瘦身的系统方法有哪些？** → 见本文档「如何减小 Docker 镜像体积？」。
- **Q：多阶段构建怎么帮到启动速度？** → 更小镜像意味着更快拉取与解包，见本文档「Docker 中的多阶段构建有什么优势？」。

### 【中等】在 Docker 中，如何实现容器之间的通信？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 网络

#### 💎 关键结论

同主机首选**同一自定义网络 + 容器名互访**（内置 DNS 服务发现）；跨网络用 `docker network connect` 把容器接入多网；对外暴露走 `-p` 端口映射；跨主机集群用 **overlay 网络**。注意默认 bridge 无 DNS，容器名解析不生效。

#### ⚡记忆卡片

- **口诀**：同网用名字，跨网先 connect，对外靠 -p，跨主机上 overlay
- **关键词**：同一网络 ／ 容器名 DNS ／ network connect ／ -p 端口映射 ／ overlay
- **链路**：加入同一网络 → DNS 按名解析 → 直接互访；跨主机 → overlay 打通

#### 📖 核心知识

Docker 容器间通信的核心方式：

- **同一网络**：连接到同一网络（默认 / 自定义），通过容器名或 IP 直接通信
- **不同网络**：用 `docker network connect` 将容器加入目标网络实现跨网通信
- **间接访问**：通过宿主机端口映射（`-p`），其他容器访问宿主机 IP:端口
- **跨主机**：集群用 overlay 网络，非集群可通过自定义路由或工具实现

依赖网络隔离与 DNS 服务发现，同网络内通信无需额外配置。

#### 🔬 扩展知识

::: details

- 【L3】默认 bridge（docker0）的坑：不支持容器名 DNS 解析，容器间只能用 IP 或已废弃的 `--link` 通信；`docker network create` 创建的自定义 bridge 才自带服务发现——这是"容器间连不通"最常见的根因。
- 【L4】跨主机通信的底层是 overlay 网络的 VXLAN 封装 + 内置 DNS 轮询，注意 MTU 要留足封装开销（如 1450）；生产集群则普遍交给 Kubernetes Service/CoreDNS 做服务发现。

> 📚 延伸阅读：[Docker 官方文档：Networking overview](https://docs.docker.com/network/)

:::

#### 🔀 发散问题

- **Q：支持哪些网络模型可选？** → 见本文档「Docker 支持哪些网络模型？」。
- **Q：bridge 模式具体怎么配？** → 见本文档「Docker 的 bridge 网络模式如何配置和使用？」。
- **Q：跨主机 overlay 怎么配？** → 见本文档「Docker 中的 overlay 网络模式如何配置和使用？」。

### 【中等】在 Docker 中，如何配置和管理环境变量？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 配置

#### 💎 关键结论

三个时机：**构建时**用 `ENV` 写进镜像做默认值；**启动时**用 `-e` 或 `--env-file` 注入并可覆盖构建值；**运行中**用 `docker exec 容器名 env` 查看。原则：启动时优先级高于构建时，敏感信息不明文写进镜像。

#### ⚡记忆卡片

- **口诀**：ENV 定默认，-e 来覆盖，env-file 批量装，敏感不进镜像
- **关键词**：ENV ／ -e ／ --env-file ／ 优先级覆盖 ／ docker exec env
- **链路**：ENV（构建时默认）→ -e/--env-file（启动时覆盖）→ 容器内生效

#### 📖 核心知识

Docker 中环境变量的配置与管理方式：

- **构建时定义**：Dockerfile 中用 `ENV` 指令设置（如 `ENV APP_PORT=8080`），镜像固化变量，容器默认继承
- **启动时设置**：
  - 命令行 `-e` 指定（`docker run -e "APP_ENV=prod" 镜像`）
  - `--env-file` 引用文件（`docker run --env-file .env 镜像`）
  - 优先级高于 Dockerfile 定义，支持动态修改
- **运行中查看**：`docker exec 容器名 env` 查看所有变量，`echo $变量名` 查看指定变量
- **管理技巧**：敏感信息避免明文，启动时变量可覆盖构建时定义，支持传递宿主机变量（`-e "HOST_IP=$HOST_IP"`）

#### 🔬 扩展知识

::: details

- 【L3】`ENV` 的双重作用：除了注入运行时环境，还会被后续 Dockerfile 指令引用（如 `WORKDIR $APP_HOME`），并在 `docker inspect` 中可见——所以密码、密钥类值绝不能写 `ENV`，镜像层会永久保留。
- 【L4】密钥管理进阶：生产环境用 `.env` 文件 + 严格权限（chmod 600、不进 Git），Compose 支持 `env_file` 与变量插值；更高要求接 Vault/K8s Secret 等密钥管理系统，运行时再注入。

> 📚 延伸阅读：[Docker 官方文档：Environment variables](https://docs.docker.com/reference/cli/docker/container/run/#env)

:::

#### 🔀 发散问题

- **Q：多容器应用的配置怎么统一管理？** → Compose 支持 `.env` 与 `env_file`，见本文档「Docker Compose 的主要作用是什么？」。
- **Q：环境变量与数据卷的分工？** → 配置用环境变量，数据用卷，见本文档「如何在 Docker 中实现数据卷（volume）的持久化存储？」。

### 【中等】Docker Compose 的主要作用是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 编排

#### 💎 关键结论

Compose 用一份 `docker-compose.yml` **声明式定义多容器应用**（服务、网络、卷、依赖），`up`/`down` 一键启停整套环境，替代一堆 `docker run`。自带网络与**服务名 DNS**、支持 `.env` 变量与依赖启动顺序，是本地开发/测试多容器应用的事实标准。

#### ⚡记忆卡片

- **口诀**：一个 yml 定义全家，up 起 down 停，服务名当主机名
- **关键词**：docker-compose.yml ／ up/down ／ 服务名 DNS ／ depends_on ／ .env
- **链路**：yml 声明服务 → compose up → 自动建网络 → 服务名互通

#### 📖 核心知识

Docker Compose 的核心作用：

- 用 `docker-compose.yml` 集中定义多容器配置（镜像、网络等），替代多个 `docker run` 命令
- 通过 `up`/`down` 等命令一键批量管理容器（启动、停止等）
- 自动创建网络，实现容器间通过服务名通信
- 支持 `.env` 文件管理环境变量，实现环境隔离
- 可定义容器依赖和启动顺序

适用于简化多容器应用的本地开发、测试和简单部署管理。

#### 🔬 扩展知识

::: details

- 【L3】能力边界：Compose 面向**单机**多容器，`depends_on` 只保证启动顺序、不保证依赖服务就绪（可用 `depends_on.condition: service_healthy` 配合健康检查）；需要跨节点高可用时应升级到 Swarm/Kubernetes。
- 【L4】Compose 规范已捐赠给社区并演进为 `docker compose`（V2，CLI 插件）；多环境差异用 override 文件（`docker-compose.override.yml`）或 profiles 实现，避免为每套环境复制一份 yml。

> 📚 延伸阅读：[Docker 官方文档：Compose](https://docs.docker.com/compose/)

:::

#### 🔀 发散问题

- **Q：编排工具全家福有哪些？** → 见本文档「Docker 的容器编排有哪些常见工具？」。
- **Q：CI 流水线里怎么和 Docker 配合？** → 见本文档「在 CI/CD 流程中，如何使用 Jenkins 与 Docker 集成？」。

### 【中等】在 CI/CD 流程中，如何使用 Jenkins 与 Docker 集成？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / CI-CD

#### 💎 关键结论

核心链路：**代码 → build 镜像（带构建号标签）→ push 仓库 → run 容器跑测试 → 部署**。镜像成为标准交付物，保证"测的就是部署的"。关键配置：Jenkins 装 Docker 及 Docker Pipeline 插件，Jenkinsfile 定义流水线，`withCredentials` 管仓库凭据。

#### ⚡记忆卡片

- **口诀**：拉码建镜像、打标推仓库、起容器测试、镜像去部署
- **关键词**：docker build ／ 构建号标签 ／ docker push ／ withCredentials ／ Jenkinsfile
- **链路**：代码 → build → push → 测试容器 → 部署（Compose/run）

#### 📖 核心知识

Jenkins 与 Docker 集成实现 CI/CD 的核心要点：

- **环境准备**：Jenkins 服务器安装 Docker 并配置权限，安装 `Docker Pipeline` 等相关插件
- **核心流程**：
  - 拉取代码后，通过 `docker build` 构建镜像（带构建号标签）
  - 用凭据登录镜像仓库，推送镜像（`docker push`）
  - 基于镜像启动容器执行自动化测试（`docker run`）
  - 通过 Docker Compose 或 `docker run` 部署到目标环境
- **优势**：保障环境一致性，实现全流程自动化，支持版本控制与回滚
- **关键配置**：使用 Jenkinsfile 定义流水线，通过 `withCredentials` 管理仓库凭据

#### 🔬 扩展知识

::: details

- 【L3】安全红线：给 Jenkins 构建容器挂载 `/var/run/docker.sock` 是最高频的违规配置——等于交出宿主机控制权；生产 CI 应改用 rootless 构建（BuildKit rootless）或专用构建节点，并禁止特权容器。
- 【L4】回滚与灰度的关键在**不可变镜像**：每次构建产出唯一标签（如 `app:build-123` 或 git SHA），部署/回滚只是切换标签指向；进阶可用动态 Agent（Jenkins Kubernetes 插件）按任务起容器，构建环境本身也容器化。

> 📚 延伸阅读：[Jenkins 官方文档：Docker Pipeline](https://www.jenkins.io/doc/book/pipeline/docker/)

:::

#### 🔀 发散问题

- **Q：为什么必须用构建号标签而不是 latest？** → latest 不可追溯、无法回滚，版本固定原则见本文档「Dockerfile 有哪些最佳实践？」。
- **Q：CI 里挂载 docker.sock 的风险？** → 见本文档「什么是容器逃逸？常见的逃逸途径和防御手段有哪些？」。

## Docker 网络

### 【中等】Docker 支持哪些网络模型？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Docker / 网络

#### 💎 关键结论

Docker 内置五种网络驱动：**bridge**（默认，网桥 + NAT，绝大多数场景首选）、**host**（共享宿主网络栈，无隔离高性能）、**none**（完全离线）、**overlay**（VXLAN 跨主机集群）、**macvlan/ipvlan**（L2 直连）。生产铁律：不用默认 bridge（无 DNS），一律 `docker network create` 自建网络。

#### ⚡记忆卡片

- **口诀**：默认 bridge 要自建，host 高性能无隔离，none 离线 overlay 跨机，macvlan 直连物理网
- **关键词**：bridge ／ host ／ none ／ overlay ／ macvlan ／ 自建网络 DNS
- **链路**：选驱动 → network create → --network 接入 → -p 对外暴露

#### 📖 核心知识

Docker 中配置容器网络主要通过 Docker 内置的网络驱动和相关命令实现，核心方式如下：

（1）**使用默认网络**

Docker 启动时自动创建三种网络：

- **`bridge`**（默认）：容器通过桥接模式与宿主机通信，彼此隔离但可通过端口映射访问
- **`host`**：容器直接使用宿主机网络，无网络隔离，性能好但安全性低
- **`none`**：禁用网络，容器无网络连接

示例：指定网络模式启动容器

```shell
docker run -d --network host nginx  # 使用 host 网络
```

（2）**自定义网络**

适合多容器通信（如微服务），支持自动 DNS 解析：

```shell
# 创建自定义桥接网络
docker network create my-network

# 连接容器到自定义网络
docker run -d --name app1 --network my-network nginx
docker run -d --name app2 --network my-network nginx
# app1 和 app2 可通过容器名互相访问
```

（3）**端口映射**

让外部访问容器服务，格式：`宿主机端口：容器端口`

```shell
docker run -d -p 8080:80 nginx  # 宿主机 8080 端口映射到容器 80 端口
```

（4）**网络连接管理**

动态连接 / 断开容器与网络：

```shell
docker network connect my-network app3  # 连接现有容器到网络
docker network disconnect my-network app3  # 断开连接
```

核心逻辑：通过网络模式隔离或连接容器，利用自定义网络实现容器间通信，通过端口映射实现外部访问，满足不同场景的网络需求。

**方案权衡：网络模型选型**

| 模型               | 隔离性                   | 性能                      | 适用边界                                                         |
| :----------------- | :----------------------- | :------------------------ | :--------------------------------------------------------------- |
| **bridge（默认）** | 有（独立 netns）         | 有 NAT/网桥开销，但可接受 | 绝大多数业务容器首选                                             |
| **host**           | **无**（共享宿主网络栈） | 最高（无 NAT）            | 对网络性能极度敏感、可信的服务（如监控 Agent）；端口冲突风险自负 |
| **overlay**        | 有                       | VXLAN 封装有 5%~10% 损耗  | 跨主机集群通信（Swarm/跨节点）                                   |
| **macvlan/ipvlan** | 有                       | 接近物理网络              | 需要 L2 可达、遗留系统直连物理网段                               |
| **none**           | 完全隔离                 | 无网络                    | 纯离线计算任务                                                   |

::: details 踩坑案例：overlay 的 MTU 陷阱导致大包卡死

某团队把微服务从 Swarm overlay 网络迁到单机 bridge 后，出现间歇性请求超时：小报文正常，超过 1450 字节的响应全部卡住。排查：tcpdump 抓包发现大包被分片且部分丢失，df 标志位被中间设备剥离；根因：容器内 MTU 仍是 1500，但 overlay 封装后实际可用载荷只有 1450；修复：`docker network create --driver bridge -o com.docker.network.driver.mtu=1450` 重建网络，并把 MTU 检查纳入迁移 checklist。

:::

::: details 场景题：开发机 bridge 正常、生产 overlay 偶发 DNS 失败 + 大文件上传失败

某微服务在开发机（单机 bridge）上一切正常，上生产（多节点 overlay）后出现两类怪象：① 服务 A 用容器名访问服务 B 偶发解析失败；② 上传大文件（>2MB）稳定失败。你如何排查并给出根治方案？

**应急处理**：先缓解业务：① 大文件上传先切小分片（单片 512KB）绕过 MTU 问题，同时在测试容器把 MTU 调到 1450 验证后快速全量生效；② DNS 偶发失败先确认是否命中"容器重建后调用方缓存旧 IP"。

**根因分析**：② 是经典的 VXLAN MTU 问题：overlay 封装吃掉 50 字节，容器内 MTU 1500 时大包触发分片，若中间链路禁分片（DF 位）则直接丢弃，表现为小请求正常、大请求失败；① 需检查两点：容器频繁重建导致 IP 变化而调用方缓存了旧 IP；以及 overlay 的 DNS 轮询在副本扩缩容瞬间存在短暂窗口。

**长期方案**：① 网络创建时统一声明 `--opt com.docker.network.driver.mtu=1450`（或按物理 MTU 9000 的巨帧环境另行计算），并纳入平台网络模板；② 服务间调用一律用容器名/服务名 + 客户端重试，不缓存 IP；③ 上线前增加网络自检测试（大包 ping -M do -s 1450 + 服务名解析），纳入发布 checklist。

**权衡**：调低 MTU 会轻微降低吞吐（头部占比升高），但相比分片丢包导致的重试风暴，这个代价可以忽略；若追求性能可将物理网络升级为 9000 巨帧，但涉及交换机全局配置，风险与收益需单独评估。

:::

#### 🔬 扩展知识

::: details

- 【L3】失效场景一：默认 bridge 无内置 DNS。默认 `docker0` 网络不支持容器名解析，容器间只能用 IP/`--link` 通信；必须用 `docker network create` 自建网络才有服务发现，这是新手最常见的"容器间连不通"根因。
- 【L3】失效场景二：host 模式端口冲突。多个容器都想绑 80 端口时直接启动失败，且宿主机防火墙规则对容器端口无隔离，安全面扩大。
- 【L4】量化参考：单机 bridge 网络下，端口映射经 iptables NAT 转发，高并发（万级连接）时 iptables 规则遍历开销明显，大规模集群通常换用 IPVS 模式（规则查找从 O(n) 降为 O(1)）或 eBPF 方案（Cilium）。

> 📚 延伸阅读：[Docker 官方文档：Networking overview](https://docs.docker.com/network/)

:::

#### 🔀 发散问题

- **Q：bridge 模式下，外部访问容器的流量是怎么到达容器内的？** → 外部请求先到宿主机 IP:端口，由 iptables 的 DNAT 规则把目标地址改写为容器在 docker0 网段内的 IP:端口，再经虚拟网桥 docker0 转发进容器的 veth 设备，回程做 SNAT 还原。"容器外能 ping 通宿主机但访问不到容器服务"多为 iptables FORWARD 链或防火墙规则拦截。
- **Q：macvlan 和 ipvlan 怎么选？** → macvlan 给每个容器分配独立 MAC 地址，L2 层如同一台物理设备，适合被物理交换机直接识别的遗留系统，但某些云网络会限制单端口 MAC 数量；ipvlan 共享宿主机 MAC、只分配独立 IP，更轻量、云上兼容性更好。口诀：物理网段直连选 macvlan，云上环境选 ipvlan。
- **Q：为什么生产环境不推荐默认 bridge，而要求自建网络？** → 默认 bridge 三个硬伤：无内置 DNS、所有容器默认接入同一网络缺乏隔离、无法设置加密；自建网络默认提供容器名 DNS、按项目隔离，overlay 还可加 `--opt encrypted`。
- **Q：bridge/overlay 具体怎么配？** → 见本文档「Docker 的 bridge 网络模式如何配置和使用？」与「Docker 中的 overlay 网络模式如何配置和使用？」。

### 【中等】在 Docker 中，如何配置容器的网络？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 网络

#### 💎 关键结论

Docker 网络基于 **Linux 网络命名空间 + 虚拟设备**，按"隔离、互通、可扩展"原则提供多种驱动：bridge（单机互通）、host（高性能无隔离）、none（离线）、overlay（跨主机）、macvlan/ipvlan（L2 直连）及自定义插件。配置动作就是：选驱动 → `network create` → 容器 `--network` 接入。

#### ⚡记忆卡片

- **口诀**：netns 隔离、veth 搭桥、选驱动建网再接入
- **关键词**：网络命名空间 ／ bridge ／ overlay ／ macvlan ／ 自定义插件
- **链路**：选驱动 → network create → --network 接入 → DNS/端口映射互通

#### 📖 核心知识

Docker 网络模型基于隔离、互通和可扩展原则，利用 Linux 网络命名空间和虚拟设备实现容器网络管理，主要网络类型（驱动）及特点：

- **bridge（默认）**：通过虚拟网桥实现单宿主机容器通信，支持 IP 分配和 NAT，适合本地多容器场景
- **host**：容器共享宿主机网络，性能优但无隔离，适合高性能需求
- **none**：禁用网络，完全隔离，适合离线任务
- **overlay**：基于 VXLAN 实现跨宿主机 Swarm 集群通信，支持服务发现
- **macvlan**：为容器分配独立 MAC 地址，模拟物理设备接入网络
- **ipvlan**：轻量级替代 macvlan，共享 MAC 地址、分配不同 IP
- **自定义插件**：如 Calico 等，扩展实现复杂网络策略

核心特点：平衡隔离与互通，支持服务发现和跨主机扩展，适配不同场景需求。

#### 🔬 扩展知识

::: details

- 【L3】底层设备链路：每个容器有独立 netns，宿主机侧用 veth pair 一端插到容器 netns、一端挂到网桥（bridge）或做路由（ipvlan L3）；理解这条链路才能定位"丢包发生在哪一段"。
- 【L4】插件生态：Libnetwork 的插件机制允许 Calico（BGP 路由 + NetworkPolicy）、Cilium（eBPF）等接管网络面，在 Kubernetes 场景提供加密、策略与可观测能力，比原生驱动更适合大规模多租户。

> 📚 延伸阅读：[Docker 官方文档：Networking overview](https://docs.docker.com/network/)

:::

#### 🔀 发散问题

- **Q：各模型的隔离性/性能怎么权衡？** → 见本文档「Docker 支持哪些网络模型？」中的选型表。
- **Q：容器间通信的常用方式？** → 见本文档「在 Docker 中，如何实现容器之间的通信？」。

### 【中等】Docker 的 bridge 网络模式如何配置和使用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 网络

#### 💎 关键结论

bridge 配置四件套：`network create --driver bridge` 建自定义网络（**推荐，有容器名 DNS**），`--network` 接入容器，`-p 宿主机端口:容器端口` 对外暴露，`disconnect` + `rm` 清理。默认 bridge（docker0，172.17.x.x）无 DNS 仅限调试，同网互通、跨网默认隔离。

#### ⚡记忆卡片

- **口诀**：自建网、--network 接、-p 映射对外，先断开再删网
- **关键词**：docker0 ／ 172.17.x.x ／ --driver bridge ／ 容器名解析 ／ -p 端口映射
- **链路**：network create → 容器 --network 接入 → -p 对外 → disconnect/rm 回收

#### 📖 核心知识

- **默认配置**：Docker 自动创建默认 `bridge` 网络（含 `docker0` 网桥），容器默认接入，获 `172.17.x.x` IP，支持容器间 IP 通信、宿主机 NAT 转发
- **自定义网络（推荐）**：`docker network create --driver bridge 网络名` 创建，支持容器名解析，功能优于默认网络
- **容器连接**：启动时用 `--network 网络名` 指定；已有容器用 `docker network connect 网络名 容器名` 连接
- **外部访问**：通过 `-p 宿主机端口：容器端口` 做端口映射（如 `-p 8080:80`）
- **通信规则**：同 bridge 网络容器可通过 IP / 容器名互通，不同网络默认隔离
- **移除操作**：先 `docker network disconnect 网络名 容器名` 断开容器，再 `docker network rm 网络名` 删除网络

#### 🔬 扩展知识

::: details

- 【L3】外部流量进容器的完整链路：宿主机 IP:端口 → iptables DNAT 改写为容器 IP:端口 → docker0 网桥转发到容器 veth。排查"外部访问不到容器服务"时，先查 iptables FORWARD 链与宿主防火墙，再看端口是否真在监听。
- 【L4】默认 bridge 与自建网络的本质差异不只是 DNS：自建网络支持按项目隔离、可在创建时声明 MTU/子网（`--subnet`、`-o com.docker.network.driver.mtu`），且容器间通信策略可控；默认 bridge 上所有容器同网互通，无隔离可言。

> 📚 延伸阅读：[Docker 官方文档：Bridge networks](https://docs.docker.com/network/drivers/bridge/)

:::

#### 🔀 发散问题

- **Q：为什么默认 bridge 没有容器名解析？** → 历史兼容设计，服务发现只在自建网络上提供，详见本文档「Docker 支持哪些网络模型？」。
- **Q：bridge 满足不了跨主机需求怎么办？** → 换 overlay，见本文档「Docker 中的 overlay 网络模式如何配置和使用？」。

### 【中等】Docker 中的 overlay 网络模式如何配置和使用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 网络

#### 💎 关键结论

overlay 用于 **Swarm 集群跨主机容器通信**，基于 VXLAN 封装。配置三步：开放 4789/7946/2377 端口 → 管理节点 `network create --driver overlay` → 服务 `--network` 接入自动互通。独立容器接入需加 `--attachable`；支持 DNS 解析与流量加密，MTU 记得留封装开销（如 1450）。

#### ⚡记忆卡片

- **口诀**：开三端口、管理节点建网、服务接网自动通，独立容器要 attachable
- **关键词**：VXLAN ／ 4789/7946/2377 ／ --driver overlay ／ --attachable ／ MTU 1450
- **链路**：Swarm 集群 → 开放端口 → create overlay → 服务 --network → 跨节点互通

#### 📖 核心知识

Docker overlay 网络模式用于 Swarm 集群跨宿主机容器通信，核心配置与使用要点：

- **前提**：需 Swarm 集群环境，开放 4789、7946、2377 端口
- **创建网络**：管理节点执行 `docker network create --driver overlay 网络名`，`--attachable` 允许独立容器加入
- **服务使用**：部署服务时指定 `--network 网络名`，跨节点副本自动互通
- **独立容器加入**：需网络开启 `--attachable`，不同节点容器可通过名称通信
- **特点**：基于 VXLAN 实现跨主机通信，支持 DNS 解析、自动加密流量，适用于集群微服务场景

#### 🔬 扩展知识

::: details

- 【L3】三个端口的分工：2377（TCP，集群管理 API）、7946（TCP/UDP，节点间通信与发现）、4789（UDP，VXLAN 数据面）；少开任一都会出现"服务建得出来但跨节点不通"的怪象。
- 【L4】性能与兼容：VXLAN 封装增加 50 字节头部，物理 MTU 1500 时应把容器 MTU 设为 1450，否则大包触发分片或丢弃；追求性能可将物理网升级为 9000 巨帧并相应调整，但涉及交换机全局配置需单独评估。

> 📚 延伸阅读：[Docker 官方文档：Overlay networks](https://docs.docker.com/network/drivers/overlay/)

:::

#### 🔀 发散问题

- **Q：overlay 的 MTU 坑长什么样？** → 大包卡死、小包正常，案例见本文档「Docker 支持哪些网络模型？」。
- **Q：Swarm 集群怎么搭？** → 见本文档「如何使用 Docker Swarm 部署一个高可用集群？」。

## Docker 编排

### 【中等】Docker 的容器编排有哪些常见工具？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Docker / 编排

#### 💎 关键结论

选型一句话：**Kubernetes 是主流之选**（大规模/复杂场景），**Swarm** 适合中小规模快速上手，**Compose** 管单机多容器开发测试；Mesos + Marathon 面向超大规模混合任务，Rancher 是多集群管理平台。新项目几乎无需再犹豫，直接 K8s。

#### ⚡记忆卡片

- **口诀**：大规模 K8s，小而美 Swarm，单机 Compose，Rancher 管多家
- **关键词**：Kubernetes ／ Docker Swarm ／ Compose ／ Mesos+Marathon ／ Rancher
- **链路**：单机开发（Compose）→ 小集群（Swarm）→ 大规模生产（K8s）

#### 📖 核心知识

Docker 容器编排常见工具及特点：

- **Docker Swarm**：官方原生，轻量简单，适合中小规模集群
- **Kubernetes（K8s）**：主流之选，功能强大，适合大规模及复杂应用，生态丰富
- **Docker Compose**：用于本地单主机多容器管理，适合开发测试
- **Mesos + Marathon**：适合超大规模集群，支持多种任务类型
- **Rancher**：容器管理平台，简化多种编排引擎的使用

#### 🔬 扩展知识

::: details

- 【L3】选型决策维度：集群规模、服务复杂度（有无有状态服务/复杂网络策略）、团队技能栈、生态依赖（监控/网关/Service Mesh 几乎都绑定 K8s）；存量 Mesos 团队迁移成本需单独评估。
- 【L4】趋势：Mesos 已退出主流，Docker Swarm 进入维护期，K8s 事实一统；新工具向更轻量演进（K3s/Nomad），Serverless 容器（Fargate/Knative）则进一步隐藏编排细节。

> 📚 延伸阅读：[Docker 官方文档：Orchestration](https://docs.docker.com/get-started/orchestration/)

:::

#### 🔀 发散问题

- **Q：Swarm 和 K8s 到底差在哪？** → 见本文档「Docker Swarm 和 Kubernetes 在集群管理上的主要区别是什么？」。
- **Q：Compose 的定位？** → 见本文档「Docker Compose 的主要作用是什么？」。

### 【中等】什么是 Docker Swarm？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Docker / 编排

#### 💎 关键结论

**Docker Swarm 是 Docker 官方的容器集群编排工具**：把多台 Docker 主机组成一个虚拟 Docker 主机，提供基础的服务部署、扩缩容、滚动更新与高可用。与 Docker 深度集成、命令兼容、上手快，适合中小规模；大规模复杂场景的功能与扩展性不及 Kubernetes。

#### ⚡记忆卡片

- **口诀**：官方原生编排，主机成集群，命令零迁移，小规模够用
- **关键词**：官方原生 ／ 虚拟 Docker 主机 ／ 服务发现 ／ 滚动更新 ／ 中小规模
- **链路**：swarm init → 节点 join → service create → 自动调度/故障转移

#### 📖 核心知识

**Docker Swarm 特点**

- 与 Docker 深度集成，命令兼容，学习成本低
- 部署配置简单，易于快速搭建集群
- 具备基础编排能力（服务部署、扩缩容、滚动更新等）
- 轻量级，无需额外复杂组件

适用场景：中小规模应用、需求简单的场景，作为 Docker 单机模式的自然扩展，成本较低，但在大规模集群和复杂场景下功能与扩展性不及 Kubernetes。

#### 🔬 扩展知识

::: details

- 【L3】Swarm 的核心抽象：node（manager/worker 两种角色）、service（声明式服务，含副本数）、task（服务拆分到节点的运行单元）；manager 基于 Raft 选举，奇数个（3~5）容忍 (n-1)/2 节点故障。
- 【L4】演进背景：Swarm 在 2016-2017 的编排大战中败给 Kubernetes，现处于维护状态；存量 Swarm 迁移 K8s 时，compose 文件可借助 kompose 工具辅助转换，但网络/存储模型需重新设计。

> 📚 延伸阅读：[Docker 官方文档：Swarm mode](https://docs.docker.com/engine/swarm/)

:::

#### 🔀 发散问题

- **Q：Swarm 高可用集群怎么搭？** → 见本文档「如何使用 Docker Swarm 部署一个高可用集群？」。
- **Q：为什么不选 Swarm 选 K8s？** → 见本文档「Docker Swarm 和 Kubernetes 在集群管理上的主要区别是什么？」。

### 【中等】如何使用 Docker Swarm 部署一个高可用集群？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Docker / 编排

#### 💎 关键结论

六步搭出高可用 Swarm：环境准备（≥3 台、开 2377/7946/4789）→ `swarm init` 初始化 → 加入 3~5 个 **manager**（奇数，Raft 容错）→ 加入 worker → `docker node ls` 验证 LEADER/REACHABLE → `service create --replicas` 部署验证故障转移。高可用核心在多 manager 故障转移 + 服务自动调度。

#### ⚡记忆卡片

- **口诀**：奇数 manager 保决策，worker 跑容器，副本自动迁
- **关键词**：swarm init ／ join-token ／ LEADER ／ REACHABLE ／ --replicas
- **链路**：init → manager join（奇数）→ worker join → node ls 验证 → service 多副本

#### 📖 核心知识

使用 Docker Swarm 部署高可用集群需通过多节点角色配置和集群初始化实现，核心步骤如下：

1. **环境准备**

   - 至少 3 台主机（推荐奇数，便于选举），确保网络互通，已安装 Docker
   - 所有节点间开放 2377（集群管理）、7946（节点通信）、4789（overlay 网络）端口

2. **初始化管理节点**：在主管理节点执行初始化命令，创建集群：

   ```shell
   docker swarm init --advertise-addr <主节点 IP>
   ```

   命令会生成 **工作节点加入令牌** 和 **管理节点加入令牌**

3. **添加管理节点（实现高可用）**：在其他管理节点执行（使用初始化时的管理节点令牌）：

   ```shell
   docker swarm join-token manager  # 查看加入命令
   # 执行返回的命令，如：
   docker swarm join --token <管理节点令牌> <主节点 IP>:2377
   ```

   建议部署 3-5 个管理节点（奇数），确保集群决策容错

4. **添加工作节点**：在工作节点执行（使用初始化时的工作节点令牌）：

   ```shell
   docker swarm join --token <工作节点令牌> <主节点 IP>:2377
   ```

   工作节点负责运行容器，可按需扩展数量

5. **验证集群状态**：在任意管理节点执行，查看节点状态：

   ```shell
   docker node ls
   ```

   输出中 `LEADER` 为当前主管理节点，`REACHABLE` 为备用管理节点

6. **部署服务（高可用验证）**：部署服务时指定副本数，Swarm 会自动在不同节点分发容器：

   ```shell
   docker service create --name ha-service --replicas 3 -p 80:80 nginx
   ```

   当某个节点故障时，Swarm 会自动在健康节点重建容器

通过以上步骤，即可实现 Docker Swarm 高可用集群，核心依赖多管理节点的故障转移能力和服务自动调度机制。

#### 🔬 扩展知识

::: details

- 【L3】容错数学：Raft 要求多数派存活，n 个 manager 容忍 ⌊(n-1)/2⌋ 个故障——3 个容忍 1 个、5 个容忍 2 个；manager 越多写入延迟越高，所以 5 个是上限而非越多越好。
- 【L4】验证高可用的正确姿势：主动 `docker node update --availability drain` 或关机一台节点，观察副本是否在健康节点重建；同时用 `docker service ps` 检查任务历史，确认没有 Pending/Rejected 堆积。

> 📚 延伸阅读：[Docker 官方文档：Swarm mode](https://docs.docker.com/engine/swarm/)

:::

#### 🔀 发散问题

- **Q：跨主机服务间通信靠什么？** → overlay 网络，见本文档「Docker 中的 overlay 网络模式如何配置和使用？」。
- **Q：Swarm 适合什么规模？** → 见本文档「什么是 Docker Swarm？」。

### 【中等】Docker Swarm 和 Kubernetes 在集群管理上的主要区别是什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Docker / 编排

#### 💎 关键结论

一句话概括：**Swarm 简单但能力有限，K8s 复杂但全面**。Swarm 与 Docker 命令兼容、上手快、适合中小规模；K8s 功能全面（自愈、自动扩缩容、网络策略）、生态与社区绝对领先，是大规模/复杂应用/企业级环境的事实标准。

#### ⚡记忆卡片

- **口诀**：Swarm 简单够用，K8s 全能主流；小规模快上手，大规模选 K8s
- **关键词**：学习曲线 ／ 自愈 ／ 扩展性 ／ CNCF 生态 ／ 适用规模
- **链路**：团队规模小/场景简单 → Swarm；大规模/复杂/有状态 → K8s

#### 📖 核心知识

| 对比维度           | Docker Swarm                               | Kubernetes (K8s)                                       |
| ------------------ | ------------------------------------------ | ------------------------------------------------------ |
| **复杂度**         | 简单，与 Docker 命令兼容，学习成本低       | 复杂，组件和概念多，学习曲线陡峭                       |
| **功能丰富度**     | 基础功能为主（部署、扩缩容等），高级特性少 | 功能全面（自愈、自动扩缩容、网络策略等），支持复杂场景 |
| **扩展性与灵活性** | 扩展性有限，插件生态弱                     | 高度可扩展，支持自定义资源和插件，灵活性强             |
| **高可用与性能**   | 支持基础高可用，大规模集群性能较弱         | 专为大规模设计，高可用机制成熟，调度更智能             |
| **生态与社区支持** | 生态封闭，社区活跃度低                     | 社区活跃，CNCF 托管，云厂商广泛支持，工具丰富          |
| **适用场景**       | 中小规模应用、简单场景、快速部署需求       | 大规模集群、复杂应用（微服务、有状态）、企业级环境     |

#### 🔬 扩展知识

::: details

- 【L3】架构差异根源：Swarm 复用 Docker 引擎自身（manager/worker 都是 dockerd），所以轻；K8s 有独立的控制面（API Server/etcd/Scheduler/Controller Manager），声明式 API + 控制器循环（reconcile）支撑自愈与复杂编排，代价是运维复杂度。
- 【L4】迁移视角：存量 Swarm 迁 K8s 时，service/compose 语义大部分可映射（K8s 1.24 后已移除 dockershim，但镜像/构建产物完全兼容）；迁移难点在网络模型（overlay → CNI）与存储（volume → PV/PVC）的重新设计。

> 📚 延伸阅读：[Kubernetes 官方文档](https://kubernetes.io/docs/home/)

:::

#### 🔀 发散问题

- **Q：Swarm 的高可用怎么搭？** → 见本文档「如何使用 Docker Swarm 部署一个高可用集群？」。
- **Q：编排工具全景还有哪些？** → 见本文档「Docker 的容器编排有哪些常见工具？」。

## 镜像瘦身

### 【困难】如何减小 Docker 镜像体积？⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Docker / 优化

#### 💎 关键结论

瘦身三板斧：**最小基础镜像**（alpine/distroless/scratch）、**多阶段构建**剔编译工具、**合并 RUN + 清缓存**减层去冗余；辅以 .dockerignore 控上下文、`--no-install-recommends` 减包。效果量级：Java 应用可从 470MB 压到 50MB，拉取、存储、启动时间同比例下降。

#### ⚡记忆卡片

- **口诀**：小底、多阶段、并 RUN 清缓存、ignore 拦杂物、锁版本防胖
- **关键词**：alpine/scratch ／ 多阶段构建 ／ 层合并 ／ .dockerignore ／ --no-install-recommends
- **链路**：选小基础镜像 → 多阶段剔编译层 → 合并 RUN 清缓存 → docker images/history 验收

#### 📖 核心知识

| 策略                               | 方法                                     | 效果               |
| :--------------------------------- | :--------------------------------------- | :----------------- |
| **最小基础镜像**                   | `alpine`（5MB）、`distroless`、`scratch` | 大幅减小           |
| **多阶段构建**                     | 编译阶段和运行阶段分离                   | 剔除编译工具       |
| **合并层**                         | 多个 `RUN` 合并为一个，并清理缓存        | 减少层数和冗余文件 |
| **.dockerignore**                  | 排除 `node_modules`、`.git` 等           | 减小构建上下文     |
| **清理包管理缓存**                 | `rm -rf /var/lib/apt/lists/*`            | 减少 100MB+        |
| **使用 `--no-install-recommends`** | 安装时不安装推荐依赖                     | 减少不必要包       |

**效果示例**：Java 应用从 `openjdk:17`（470MB）→ `eclipse-temurin:17-jre-alpine`（80MB）→ 多阶段构建（~50MB）。

#### 🔬 扩展知识

::: details

- 【L3】先测量再下手：`docker history 镜像` 逐层看体积来源，`docker image inspect` 看总大小；常见意外大头是包管理器缓存、调试工具、日志文件、被 COPY 进上下文的 `.git` 目录。
- 【L4】进阶手段：BuildKit 的 `--mount=type=cache` 把依赖缓存移出镜像层；distroless 无 shell 与包管理器，需配合静态编译或多阶段调试；镜像仓库层去重后，共享基础层带来的实际存储收益比单镜像体积更重要。

> 📚 延伸阅读：[Docker 官方文档：Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

:::

#### 🏭 实战场景

::: details

某团队 CI 流水线每次拉取 1.2GB 的业务镜像，高峰期 50 个构建任务并发拉镜像，仓库带宽打满、流水线平均排队 8 分钟。整改三步：① 基础镜像从 `openjdk:17` 换 `eclipse-temurin:17-jre-alpine`（470MB→80MB）；② 引入多阶段构建，编译工具链全部留在构建阶段，成品降到 ~50MB；③ .dockerignore 排除 `.git`/测试数据，构建上下文从 300MB 降到 20MB。结果：单镜像缩小 96%，拉取耗时从分钟级降到秒级，流水线排队基本消失，镜像仓库存储成本同比例下降。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "用 latest 标签构建省事" → latest 不可复现，基础镜像某天变胖或换大版本时镜像体积/行为静默漂移；应固定版本标签（如 `node:18-alpine`）。
- ❌ "分层多一点没关系，反正能压缩" → 层是真实存储单元，后层删文件只是"遮住"前层，总体积不降反升；删除必须与安装在同一条 RUN 里。
- ❌ "镜像小就是安全" → 瘦身主要减体积和拉取时间，安全还需非 root、cap-drop、漏洞扫描配合，见本文档「如何保证 Docker 沙箱执行时的安全性？」。

:::

#### 🔀 发散问题

- **Q：多阶段构建具体怎么写？** → 见本文档「在 Docker 中，如何构建多阶段镜像以减少镜像体积？」。
- **Q：瘦身与构建缓存的关系？** → 合理指令排序既吃缓存又减层，见本文档「Dockerfile 有哪些最佳实践？」。
- **Q：镜像瘦了对启动有什么影响？** → 拉取与解包更快，见本文档「在 Docker 中，如何优化容器启动时间？」。

## 参考资料

- [Docker 官方文档](https://docs.docker.com/)
- [Docker 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
- [面试鸭 - Docker 面试题](https://www.mianshiya.com/bank/1812067352871829505)
