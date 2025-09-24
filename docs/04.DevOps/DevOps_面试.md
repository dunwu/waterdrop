---
title: DevOps 面试
date: 2025-09-14 21:15:59
categories:
  - DevOps
tags:
  - DevOps
  - 面试
permalink: /pages/18dca404/
---

# DevOps 面试

## DevOps 简介

### 【简单】什么是 DevOps？

**DevOps是通过平台（Platform）、流程（Process）和人（People）的有机整合，以C（协作）A（自动化）L（精益）M（度量）S（共享）文化为指引，旨在建立一种可以快速交付价值并且具有持续改进能力的现代化IT组织。**

简单来说，**DevOps 就是让构建、发布和运行软件的过程变得更快、更顺、更稳**。

### 【中等】列举一下 DevOps 各环节的主流工具？

![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*hnrlp3W6kfInWHtJd9Vvag.jpeg)

| 阶段 (Phase)                                | 核心任务与功能                         | 主流工具                                                                                                                                                                               |
| :------------------------------------------ | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **计划与协作** (Plan & Collaborate)         | 需求管理、任务拆分、项目跟踪、文档协作 | **Jira**、**Confluence**                                                                                                                                                               |
| **代码与版本控制** (Code & Version Control) | 源代码管理、代码审查、分支策略         | **代码托管**：**Git**、**GitHub**、**GitLab**、**Svn**<br/>**分支策略**：**Gitflow**                                                                                                   |
| **构建与持续集成 (CI)** (Build & CI)        | 自动编译、运行单元测试、打包制品       | **CI**：**Jenkins**、**GitLab CI/CD**、**GitHub Actions**、**CircleCI**<br/>**Java 构建**：**Maven**、**Gradle**<br/>**JS 构建**：**npm**、**yarn**<br/>**仓库**：**Nexus**、**JFrog** |
| **测试和质量** (Test)                       | 自动化测试、代码质量与安全扫描         | **测试**：**Selenium**、**Cypress**、**JUnit**<br/>**质量**：**SonarQube**                                                                                                             |
| **发布与持续部署 (CD)** (Release & CD)      | 自动化部署、发布策略管理               | **Jenkins**、**GitLab CI/CD**、**GitHub Actions**（通用CD） **云原生CD:** **ArgoCD**（GitOps理念）、**Spinnaker**（复杂部署策略）、Tekton                                              |
| **运维与配置** (Operate & Configure)        | 基础设施自动化、配置管理、容器编排     | **IaC工具**：**Terraform**（多云标准）、Ansible（无代理配置）<br/>**容器化:** **Docker**、**Kubernetes**、Helm                                                                         |
| **监控与反馈** (Monitor & Feedback)         | 性能监控、日志管理、故障告警、用户反馈 | **监控**：**Prometheus**、**Grafana**<br/>**日志**：**ELK Stack**（Elasticsearch, Logstash, Kibana）<br/>**链路追踪**：Jaeger、Zipkin、Skywalking、OpenTelemetry                       |

## Git

### 【中等】什么是 Git 的 fork 命令？它和 clone 命令有什么区别？

创建一个新的工程空间

### 【中等】什么是 Git 的 cherry-pick？

单独将某一次提交合入其他分支

## Linux

### 【中等】Linux 中的硬链接和软连接是什么，二者有什么区别？

### 【中等】CC 攻击是什么？什么叫 DDOS 攻击？什么是网站数据库注入？

### 【中等】如何在 Linux 中查看系统资源使用情况？比如内存、CPU、网络端口。

- top 查资源占用排名

- free 查内存占用

- df 查磁盘占用

- iostat 查 IO

- netstat 查网络

- ping、traceroute 查网络链路