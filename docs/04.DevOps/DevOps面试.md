---
title: DevOps 面试
date: 2025-09-14 21:15:59
categories:
  - DevOps
tags:
  - DevOps
  - 面试
permalink: /pages/e91cabf8/
---

# DevOps 面试

## Nginx

### Nginx 是什么？它有哪些应用场景？

Nginx 是一种高性能的服务器、反向代理服务器。

用于反向代理、负载均衡、网关。

### 什么是正向代理和反向代理，如何使用 Nginx 做反向代理？

配置 domain、upstream

domain 配置将域名请求，根据 context 映射到不同 upstream

在 upstream 中配置反向映射的 IP+端口，并设置负载均衡、重试规则

### 如何用 Nginx 做限流，有几种限流算法，分别如何实现？

## Git

### 什么是 Git 的 fork 命令？它和 clone 命令有什么区别？

创建一个新的工程空间

### 什么是 Git 的 cherry-pick？

单独将某一次提交合入其他分支

## Linux

### Linux 中的硬链接和软连接是什么，二者有什么区别？

### CC 攻击是什么？什么叫 DDOS 攻击？什么是网站数据库注入？

### 如何在 Linux 中查看系统资源使用情况？比如内存、CPU、网络端口。

- top 查资源占用排名

- free 查内存占用

- df 查磁盘占用

- iostat 查 IO

- netstat 查网络

- ping、traceroute 查网络链路