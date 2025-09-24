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

### 【简单】什么是 Docker？为什么需要 Docker？

Docker 是一个**容器化平台**，用于将应用及其所有依赖打包成一个标准化、轻量级、可移植的单元（容器），从而实现 **“一次构建，处处运行”**。

**核心价值**

- **环境一致性**：彻底解决“在我电脑上能跑”的问题，保证开发、测试、生产环境绝对一致。
- **隔离性**：每个容器拥有独立的文件系统、网络和进程空间，应用间互不干扰。
- **轻量高效**：与传统虚拟机相比，**容器直接共享主机内核**，启动更快（秒级）、资源占用更少（MB 级）。
- **DevOps 基石**：极大简化了持续集成/持续部署 (CI/CD) 流程，是实现微服务架构的理想载体。

**应用场景**

- **微服务**：将大型应用拆分为多个独立部署和扩展的容器化服务。
- **CI/CD 流水线**：以镜像作为标准化交付物，实现自动化测试和部署。
- **快速搭建/清理环境**：一键部署和销毁复杂的测试环境，保持主机清洁。
- **混合云部署**：凭借其可移植性，轻松在不同云平台间迁移应用。

### 【简单】Docker 有哪些核心概念和组件？

- **容器**：是 Docker 的核心组件，是一个轻量级、可移植、自包含的软件包，包含应用程序运行所需的所有依赖项，与主机系统隔离但共享内核。
- **镜像**：是一个只读模板，包含启动容器所需的文件系统和配置信息，可基于其他镜像构建，由多个层组成。
- **仓库**：用于存储和分发 Docker 镜像，分为公共仓库和私有仓库，Docker Hub 是常见的公共仓库。
- **Dockerfile**：是一个文本文件，包含一系列指令，用于定义如何构建 Docker 镜像。
- **网络**：Docker 网络允许容器之间进行通信，提供多种网络驱动，如桥接网络、主机网络和覆盖网络等。
- **卷**：是 Docker 中用于持久化数据的机制，可独立于容器生命周期存在，也可用于多个容器之间共享数据。

### 【简单】Docker 有哪些核心组件？

- **Docker 守护进程**：运行在宿主机上，负责管理 Docker 对象，如镜像、容器、网络和卷等。
- **Docker 客户端**：是一个命令行工具，用于与 Docker 守护进程交互，用户通过客户端发送命令来管理容器和镜像。
- **Docker Registry**：是一个存储和分发 Docker 镜像的服务，公共的 Docker Registry 是 Docker Hub，用户也可以搭建私有 Registry。
- **Docker Compose**：用于定义和运行多容器 Docker 应用程序，通过一个`docker - compose.yml`文件，可定义多个服务及其依赖关系。
- **Docker Swarm**：是 Docker 的原生集群管理和编排工具，允许用户将多个 Docker 主机组成一个虚拟的 Docker 主机，实现容器的高可用性和负载均衡。

### 【中等】Docker 的工作原理是什么？

Docker 基于 **容器化技术** 和 **Linux 内核特性**（如 Namespace 隔离、Cgroups 资源限制、Union File System 分层存储）实现：

- **隔离性**：通过 Namespace 为容器提供独立的 PID（进程）、Network（网络）、Mount（文件系统）等命名空间，使容器看起来像独立主机。
- **资源控制**：通过 Cgroups 限制容器的 CPU、内存等资源，防止过度占用宿主机资源。
- **分层存储**：利用联合文件系统将镜像分层存储，容器运行时在镜像只读层上添加可写层，实现增量修改，节省空间并提高复用率。
- **生命周期管理**：通过 Docker 引擎协调镜像拉取、容器创建 / 启动 / 停止 / 删除等操作，简化应用的打包、部署和迁移流程。

简言之，Docker 通过封装和隔离，实现了 "一次构建，到处运行" 的目标，解决了应用环境一致性问题。

### 【困难】如何保证 Docker 沙箱执行时的安全性？

**遵循最小权限原则：** 绝不给予容器超出其运行所需之外的任何权限。

Docker 安全是 **“最小权限”** 的实践。通过使用**最小镜像**、以**非 root** 运行、**丢弃所有能力**、配置**只读根目录**，并**保护 Docker Socket**，可构建深度防御体系，极大降低风险。

| 层面                             | 核心实践                                                                                                        | 关键命令/示例                                                                                                               |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **镜像安全** <br/>（供应链安全） | **使用最小化基础镜像** (Alpine, Distroless) <br/>**扫描镜像漏洞** (Trivy, Grype) <br/>**多阶段构建**            | `FROM alpine:3.18` <br/> `trivy image my-app:latest`                                                                        |
| **运行时安全** <br/>（最核心）   | **禁止以 root 用户运行** <br/>**限制 Linux 能力** <br/>**使用只读文件系统** <br/>**限制资源** (CPU, 内存，PIDs) | `USER 1000` <br/> `--cap-drop=ALL --cap-add=NET_BIND_SERVICE` <br/> `--read-only --tmpfs /tmp` <br/> `-m 512m --cpus="1.5"` |
| **网络安全**                     | **使用自定义网络** <br/>**谨慎发布端口**                                                                        | `docker network create my-net` <br/> `-p 127.0.0.1:8080:80`                                                                 |
| **主机安全**                     | **严禁随意挂载 Docker Socket** <br/>**启用用户命名空间重映射**                                                  | **绝不轻易使用：** <br/> `-v /var/run/docker.sock:/var/run/docker.sock`                                                     |

## 镜像和容器

### 【简单】Docker 中的镜像和容器有什么区别？

| 特性         | 镜像 (Image)                             | 容器 (Container)                                    |
| :----------- | :--------------------------------------- | :-------------------------------------------------- |
| **本质**     | **只读的模板**和**静态文件**             | **镜像的运行实例**和**隔离的进程**                  |
| **状态**     | **静态的、不可变的**                     | **动态的、可变的**（运行、暂停、停止）              |
| **存储**     | 由一系列**只读层**组成                   | 在镜像的只读层之上，添加一个薄薄的**可写层**        |
| **创建方式** | 通过 `docker build` 根据 Dockerfile 创建 | 通过 `docker run` 从镜像启动                        |
| **数量关系** | 一个镜像可以用于**启动多个容器**         | 多个容器可以基于**同一个镜像**运行                  |
| **生命周期** | 手动**移除** (`docker rmi`)              | 可以被**启动、停止、删除** (`docker start/stop/rm`) |

### 【简单】Docker 中如何实现镜像的推送和拉取？

Docker 实现镜像推送和拉取的核心步骤（适用于 Docker Hub 或私有仓库）：

- **登录仓库**：用 `docker login [仓库地址]` 完成身份认证
- **镜像打标签**：按 `仓库地址/用户名/镜像名：版本` 格式，通过 `docker tag` 关联本地镜像与远程地址
- **推送镜像**：用 `docker push 标签名` 上传镜像到仓库
- **拉取镜像**：用 `docker pull 标签名`（不指定版本默认拉 latest）从仓库下载镜像
- **可选退出**：操作后可通过 `docker logout [仓库地址]` 退出登录

### 【简单】Docker 容器如何实现资源限制（如 CPU 和内存）？

Docker 容器的 CPU 和内存资源限制可通过命令参数实现，核心方式：

- **内存限制**
  - `--memory/-m`：限制最大使用内存（如 `-m 512m`）
  - `--memory-swap`：限制内存 + 交换区总用量（需配合 `-m` 使用）
- **CPU 限制**
  - `--cpus`：指定可用核心数（支持小数，如 `--cpus 0.5`）
  - `--cpu-shares`：设置资源竞争时的相对权重（默认 1024）
  - `--cpuset-cpus`：绑定特定物理核心（如 `--cpuset-cpus 0,1`）

示例：限制容器最多使用 1 个 CPU 核心，512MB 内存

```shell
docker run -d --cpus 1 -m 512m --name memory-limited nginx
```

### 【中等】Docker 镜像的多层结构是如何实现的？

Docker 镜像的多层结构基于联合文件系统实现，核心要点：

1. **分层存储**：由多个只读层组成，每层对应 Dockerfile 一条指令（如 `FROM`、`RUN` 等）
2. **读写分离**：运行容器时添加可写层，仅在该层进行修改，不改变底层只读层
3. **层复用机制**：不同镜像可共享基础层，节省空间，加速构建与传输

通过分层设计实现镜像轻量、高效的存储与分发。

## Docker 构建

### 【简单】如何构建 Docker 镜像？

使用 Dockerfile 创建自定义镜像的核心是通过编写指令脚本，定义镜像的构建流程，具体步骤如下：

（1）**准备工作**

- 创建项目目录（如 `my-image`），并在其中新建 `Dockerfile`（无扩展名）
- 准备所需文件（如应用代码、配置文件等）

（2）**编写 Dockerfile 指令**

常用核心指令及作用：

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

（3）**构建镜像**

在 Dockerfile 所在目录执行：

```shell
# -t 指定镜像标签（格式：名称：版本）
# . 表示构建上下文（当前目录所有文件）
docker build -t my-python-app:v1 .
```

（4） **验证自定义镜像**

```shell
# 运行镜像测试
docker run -p 5000:5000 my-python-app:v1

# 查看镜像信息
docker images | grep my-python-app
```

### 【中等】Docker 中的多阶段构建有什么优势？

Docker 多阶段构建的核心优势：

- **减小镜像体积**：分离构建与运行环境，仅保留运行必需文件，剔除编译工具、源码等冗余内容
- **简化维护**：单 Dockerfile 完成全流程，通过 `COPY --from` 复用前序产物，无需多个文件或手动清理
- **提升安全性**：减少镜像包含的工具和文件，降低攻击面，避免敏感信息残留
- **优化效率**：各阶段可使用最适合的基础镜像，支持并行构建场景

### 【中等】在 Docker 中，如何构建多阶段镜像以减少镜像体积？

下面是一个多阶段构建示例：

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

## 实践

### 【简单】在 Docker 中，如何管理和查看容器日志？

通过 [`docker logs`](https://docs.docker.com/engine/reference/commandline/logs) 命令从容器中读取日志。

### 【中等】在 Docker 中，如何进行数据卷管理？

在 Docker 中，数据卷管理主要包括创建、挂载、查看、删除等操作。

| 命令                                                                                                | 功能描述                                                      | 常用示例                                                         |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------- |
| [**`docker volume create`**](https://docs.docker.com/engine/reference/commandline/volume_create/)   | **创建数据卷**                                                | `docker volume create my_volume`                                 |
| [**`docker volume rm`**](https://docs.docker.com/engine/reference/commandline/volume_rm/)           | **删除数据卷**                                                | `docker volume rm my_volume` `docker volume rm vol1 vol2`        |
| [**`docker volume ls`**](https://docs.docker.com/engine/reference/commandline/volume_ls/)           | **列出所有已有的数据卷**                                      | `docker volume ls` `docker volume ls --quiet` （仅显示名称）     |
| [**`docker volume inspect`**](https://docs.docker.com/engine/reference/commandline/volume_inspect/) | **查看数据卷的具体信息** （如：创建时间、挂载点、驱动类型等） | `docker volume inspect my_volume`                                |
| [**`docker volume prune`**](https://docs.docker.com/engine/reference/commandline/volume_prune/)     | **清理无主的数据卷**                                          | `docker volume prune` `docker volume prune --force` （无需确认） |

### 【中等】如何在 Docker 中实现数据卷（volume）的持久化存储？

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

### 【中等】在 Docker 中，如何优化容器启动时间？

Docker 容器启动时间优化重点：

- **优化镜像**：多阶段构建减冗余，用轻量基础镜（alpine/distroless），合并层减少层数
- **简化启动流程**：避免启动时耗时操作，减少命令复杂度，采用异步初始化
- **资源配置**：适当增加启动时 CPU / 内存配额，优化应用自身配置
- **利用缓存**：合理排序 Dockerfile 指令利用层缓存，预编译依赖
- **存储驱动**：使用 overlay2 等高效驱动

### 【中等】在 Docker 中，如何实现容器之间的通信？

Docker 容器间通信的核心方式：

- **同一网络**：连接到同一网络（默认 / 自定义），通过容器名或 IP 直接通信
- **不同网络**：用`docker network connect`将容器加入目标网络实现跨网通信
- **间接访问**：通过宿主机端口映射（`-p`），其他容器访问宿主机 IP: 端口
- **跨主机**：集群用 overlay 网络，非集群可通过自定义路由或工具实现

依赖网络隔离与 DNS 服务发现，同网络内通信无需额外配置。

### 【中等】在 Docker 中，如何配置和管理环境变量？

Docker 中环境变量的配置与管理方式：

- **构建时定义**：Dockerfile 中用`ENV`指令设置（如`ENV APP_PORT=8080`），镜像固化变量，容器默认继承
- **启动时设置**：
  - 命令行`-e`指定（`docker run -e "APP_ENV=prod" 镜像`）
  - `--env-file`引用文件（`docker run --env-file .env 镜像`）
  - 优先级高于 Dockerfile 定义，支持动态修改
- **运行中查看**：`docker exec 容器名 env`查看所有变量，`echo $变量名`查看指定变量
- **管理技巧**：敏感信息避免明文，启动时变量可覆盖构建时定义，支持传递宿主机变量（`-e "HOST_IP=$HOST_IP"`）

### 【中等】Docker Compose 的主要作用是什么？

Docker Compose 的核心作用：

- 用 `docker-compose.yml` 集中定义多容器配置（镜像、网络等），替代多个 `docker run` 命令
- 通过 `up`/`down` 等命令一键批量管理容器（启动、停止等）
- 自动创建网络，实现容器间通过服务名通信
- 支持 `.env` 文件管理环境变量，实现环境隔离
- 可定义容器依赖和启动顺序

适用于简化多容器应用的本地开发、测试和简单部署管理。

### 【中等】在 CI/CD 流程中，如何使用 Jenkins 与 Docker 集成？

Jenkins 与 Docker 集成实现 CI/CD 的核心要点：

- **环境准备**：Jenkins 服务器安装 Docker 并配置权限，安装 `Docker Pipeline` 等相关插件
- **核心流程**：
  - 拉取代码后，通过 `docker build` 构建镜像（带构建号标签）
  - 用凭据登录镜像仓库，推送镜像（`docker push`）
  - 基于镜像启动容器执行自动化测试（`docker run`）
  - 通过 Docker Compose 或 `docker run` 部署到目标环境
- **优势**：保障环境一致性，实现全流程自动化，支持版本控制与回滚
- **关键配置**：使用 Jenkinsfile 定义流水线，通过 `withCredentials` 管理仓库凭据

## Docker 网络

### 【中等】在 Docker 中，如何配置容器的网络？

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

### 【中等】Docker 支持哪些网络模型？

Docker 网络模型基于隔离、互通和可扩展原则，利用 Linux 网络命名空间和虚拟设备实现容器网络管理，主要网络类型（驱动）及特点：

- **bridge（默认）**：通过虚拟网桥实现单宿主机容器通信，支持 IP 分配和 NAT，适合本地多容器场景
- **host**：容器共享宿主机网络，性能优但无隔离，适合高性能需求
- **none**：禁用网络，完全隔离，适合离线任务
- **overlay**：基于 VXLAN 实现跨宿主机 Swarm 集群通信，支持服务发现
- **macvlan**：为容器分配独立 MAC 地址，模拟物理设备接入网络
- **ipvlan**：轻量级替代 macvlan，共享 MAC 地址、分配不同 IP
- **自定义插件**：如 Calico 等，扩展实现复杂网络策略

核心特点：平衡隔离与互通，支持服务发现和跨主机扩展，适配不同场景需求。

### 【中等】Docker 的 bridge 网络模式如何配置和使用？

- **默认配置**：Docker 自动创建默认 `bridge` 网络（含 `docker0` 网桥），容器默认接入，获 `172.17.x.x` IP，支持容器间 IP 通信、宿主机 NAT 转发
- **自定义网络（推荐）**：`docker network create --driver bridge 网络名` 创建，支持容器名解析，功能优于默认网络
- **容器连接**：启动时用 `--network 网络名` 指定；已有容器用 `docker network connect 网络名 容器名` 连接
- **外部访问**：通过 `-p 宿主机端口：容器端口` 做端口映射（如 `-p 8080:80`）
- **通信规则**：同 bridge 网络容器可通过 IP / 容器名互通，不同网络默认隔离
- **移除操作**：先 `docker network disconnect 网络名 容器名` 断开容器，再 `docker network rm 网络名` 删除网络

### 【中等】Docker 中的 overlay 网络模式如何配置和使用？

Docker overlay 网络模式用于 Swarm 集群跨宿主机容器通信，核心配置与使用要点：

- **前提**：需 Swarm 集群环境，开放 4789、7946、2377 端口
- **创建网络**：管理节点执行 `docker network create --driver overlay 网络名`，`--attachable` 允许独立容器加入
- **服务使用**：部署服务时指定 `--network 网络名`，跨节点副本自动互通
- **独立容器加入**：需网络开启 `--attachable`，不同节点容器可通过名称通信
- **特点**：基于 VXLAN 实现跨主机通信，支持 DNS 解析，自动加密流量，适用于集群微服务场景

## Docker 编排

### 【中等】Docker 的容器编排有哪些常见工具？

Docker 容器编排常见工具及特点：

- **Docker Swarm**：官方原生，轻量简单，适合中小规模集群
- **Kubernetes（K8s）**：主流之选，功能强大，适合大规模及复杂应用，生态丰富
- **Docker Compose**：用于本地单主机多容器管理，适合开发测试
- **Mesos + Marathon**：适合超大规模集群，支持多种任务类型
- **Rancher**：容器管理平台，简化多种编排引擎的使用

### 【中等】什么是 Docker Swarm？

**Docker Swarm 是 Docker 官方的容器集群编排工具**。

**Docker Swarm 特点**

- 与 Docker 深度集成，命令兼容，学习成本低
- 部署配置简单，易于快速搭建集群
- 具备基础编排能力（服务部署、扩缩容、滚动更新等）
- 轻量级，无需额外复杂组件

适用场景：中小规模应用、需求简单的场景，作为 Docker 单机模式的自然扩展，成本较低，但在大规模集群和复杂场景下功能与扩展性不及 Kubernetes。

### 【中等】如何使用 Docker Swarm 部署一个高可用集群？

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

### 【中等】Docker Swarm 和 Kubernetes 在集群管理上的主要区别是什么？

| 对比维度           | Docker Swarm                               | Kubernetes (K8s)                                       |
| ------------------ | ------------------------------------------ | ------------------------------------------------------ |
| **复杂度**         | 简单，与 Docker 命令兼容，学习成本低       | 复杂，组件和概念多，学习曲线陡峭                       |
| **功能丰富度**     | 基础功能为主（部署、扩缩容等），高级特性少 | 功能全面（自愈、自动扩缩容、网络策略等），支持复杂场景 |
| **扩展性与灵活性** | 扩展性有限，插件生态弱                     | 高度可扩展，支持自定义资源和插件，灵活性强             |
| **高可用与性能**   | 支持基础高可用，大规模集群性能较弱         | 专为大规模设计，高可用机制成熟，调度更智能             |
| **生态与社区支持** | 生态封闭，社区活跃度低                     | 社区活跃，CNCF 托管，云厂商广泛支持，工具丰富          |
| **适用场景**       | 中小规模应用、简单场景、快速部署需求       | 大规模集群、复杂应用（微服务、有状态）、企业级环境     |

## 参考资料

- [面试鸭 - Docker 面试题](https://www.mianshiya.com/bank/1812067352871829505)