---
icon: logos:nginx
title: Nginx 面试
date: 2025-09-25 07:49:46
order: 99
categories:
  - DevOps
  - 工具
  - Nginx
tags:
  - DevOps
  - Nginx
  - 面试
permalink: /pages/73ef7196/
---

# Nginx 面试

## 【中等】如何限制上传文件大小？

显示错误信息：**413 Request Entity Too Large**。

意思是请求的内容过大，浏览器不能正确显示。常见的情况是发送 `POST` 请求来上传大文件。

**解决方法**

- 可以在 `http` 模块中设置：`client_max_body_size  20m;`
- 可以在 `server` 模块中设置：`client_max_body_size  20m;`
- 可以在 `location` 模块中设置：`client_max_body_size  20m;`

三者区别是：

- 如果文大小限制设置在 `http` 模块中，则对所有 Nginx 收到的请求。
- 如果文大小限制设置在 `server` 模块中，则只对该 `server` 收到的请求生效。
- 如果文大小限制设置在 `location` 模块中，则只对匹配了 `location` 路由规则的请求生效。

## 【中等】什么是 Nginx？

Nginx 是一个高性能、开源的 **Web 服务器**软件。但它更核心的现代角色是作为**反向代理服务器**和**负载均衡器**。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/nginx.jpg)

**核心特点**：采用**事件驱动**的异步架构，能以极少的资源处理海量并发连接，以**高性能、高稳定性和低内存占用**著称。

**应用场景**

| 场景             | 角色       | 核心作用                                                 | 简单比喻                                       |
| :--------------- | :--------- | :------------------------------------------------------- | :--------------------------------------------- |
| **静态内容服务** | Web 服务器 | 直接高效地处理静态文件（HTML, CSS, 图片等）              | **仓库管理员**，直接发货                       |
| **反向代理**     | 流量门户   | 接收所有用户请求，转发给后端应用服务器，并隐藏服务器细节 | **公司前台/总机**，接收所有电话再转接内部      |
| **负载均衡**     | 流量分配器 | 将用户请求分发到多个后端服务器，提升系统性能和可用性     | **银行的排队叫号系统**，将顾客平均分给多个柜台 |

## 【中等】什么是正向代理和反向代理？

反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/reverse-proxy.png)

## 【中等】如何用 Nginx 做限流，有几种限流算法，分别如何实现？

Nginx 主要通过两个**原生模块**实现限流，对应两种不同的场景：

（1）**`limit_req_zone` / `limit_req`：限制请求速率（常用）**

- **算法**：**漏桶算法**，能**平滑突发流量**，强制以恒定速率处理请求。
- **目的**：防止 CC 攻击、API 滥用、保护登录接口等。
- **关键参数**：
  - `zone`：定义共享内存区（存储访问状态）。
  - `rate`：限制速率，如 `1r/s`（每秒 1 次请求）。
  - `burst`：桶容量，允许的突发请求数（队列长度）。
  - `nodelay`：与 `burst` 联用，立即处理突发队列中的请求，不延迟。

```nginx
# http 块中定义限流规则
http {
    # 定义规则：以客户端 IP 为键，速率限制为每秒 10 次请求
    limit_req_zone $binary_remote_addr zone=my_rate_limit:10m rate=10r/s;
    ...
}

# server/location 块中应用规则
server {
    location /api/ {
        # 应用规则，并允许最多 20 个请求的突发队列，且立即处理
        limit_req zone=my_rate_limit burst=20 nodelay;
        ...
    }
}
```

（2）**`limit_conn_zone` / `limit_conn`：限制并发连接数**

- **算法**：无特定算法，简单计数。
- **目的**：防止单个客户端（如 IP）建立过多连接，耗尽服务器资源。适用于下载、上传等场景。
- **关键参数**：
  - `zone`：定义共享内存区。
  - 数值：每个键（如 IP）允许的最大并发连接数。

```nginx
# http 块中定义
http {
    # 定义连接限制区
    limit_conn_zone $binary_remote_addr zone=my_conn_limit:10m;
    ...
}

# server/location 块中应用
server {
    location /download/ {
        # 每个 IP 同时只能有 2 个连接
        limit_conn my_conn_limit 2;
        # 可配合限速
        limit_rate 500k;
        ...
    }
}
```

**其他限流算法对比**

| 算法           | 特点                                         | Nginx 支持情况                        |
| :------------- | :------------------------------------------- | :------------------------------------ |
| **漏桶算法**   | **平滑流量**，输出速率恒定，Nginx 原生支持。 | **原生支持** (`limit_req`)            |
| **令牌桶算法** | **允许突发**，只要桶里有令牌即可快速处理。   | 需通过 OpenResty/Lua 等扩展实现       |
| **滑动窗口**   | **更精确**，解决临界点问题，适合分布式环境。 | 需通过 OpenResty/Lua+Redis 等扩展实现 |

**建议**

- **首选 `limit_req`**：应对大多数流量控制场景。
- **善用 `burst` 和 `nodelay`**：在限制速率的同时，兼顾用户体验，允许合理的突发流量。
- **组合使用**：对核心接口可同时使用 `limit_req`（防刷）和 `limit_conn`（防资源耗尽）。
- **设置白名单**：避免内部 IP 或健康检查被误限。

## 【中等】如何用 Nginx 实现反向代理？

要使用 Nginx 实现反向代理，你需要配置 Nginx 的配置文件，指定代理规则。以下是具体步骤和示例：

基本反向代理配置

打开 Nginx 配置文件（通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/default.conf`），添加如下配置：

```nginx
server {
    listen 80;                 # Nginx 监听的端口
    server_name example.com;   # 访问的域名

    # 反向代理配置
    location / {
        proxy_pass http://127.0.0.1:3000;  # 目标服务器地址（被代理的服务）
        proxy_set_header Host $host;       # 传递主机名
        proxy_set_header X-Real-IP $remote_addr;  # 传递真实客户端 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 传递代理链 IP
        proxy_set_header X-Forwarded-Proto $scheme;  # 传递协议（http/https）
    }
}
```

**按路径分流的反向代理**

可以根据不同的 URL 路径代理到不同的服务：

```nginx
server {
    listen 80;
    server_name example.com;

    # 访问 /api 路径时代理到后端 API 服务
    location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        # 其他代理头配置。..
    }

    # 访问 /admin 路径时代理到管理后台服务
    location /admin {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Host $host;
        # 其他代理头配置。..
    }

    # 其他路径代理到前端服务
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        # 其他代理头配置。..
    }
}
```

**检查并生效配置**

配置完成后，执行以下命令检查配置是否正确并重启 Nginx：

```bash
# 检查配置语法
nginx -t

# 重启 Nginx 使配置生效
systemctl restart nginx
# 或
service nginx restart
```

**核心参数**

- `proxy_pass`：指定被代理的目标服务器地址（可以是 IP: 端口 或域名）
- `proxy_set_header`：设置传递给后端服务器的请求头
- `listen`：Nginx 监听的端口
- `server_name`：匹配的域名

## 【中等】如何用 Nginx 实现负载均衡？

要使用 Nginx 实现负载均衡，需要在配置中定义一个后端服务器集群（upstream），然后通过反向代理将请求分发到集群中的服务器。以下是具体实现方法：

**基本负载均衡配置**

首先定义一个服务器集群，然后配置反向代理指向这个集群：

```nginx
# 定义后端服务器集群
upstream backend_servers {
    server 127.0.0.1:3000;  # 服务器 1
    server 127.0.0.1:3001;  # 服务器 2
    server 192.168.1.100:3000;  # 服务器 3（可跨主机）
}

# 配置反向代理到集群
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_servers;  # 指向上面定义的集群
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**负载均衡策略**

Nginx 提供了多种负载均衡策略，默认是**轮询**（每个请求按顺序分配到不同服务器），其他常用策略如下：

::: tabs#负载均衡配置

@tab 权重分配（weight）

给性能更好的服务器分配更高权重：

```nginx
upstream backend_servers {
    server 127.0.0.1:3000 weight=3;  # 30%的请求
    server 127.0.0.1:3001 weight=2;  # 20%的请求
    server 192.168.1.100:3000 weight=5;  # 50%的请求
}
```

@tab IP 哈希（ip_hash）

同一客户端 IP 始终访问同一服务器（解决会话保持问题）：

```nginx
upstream backend_servers {
    ip_hash;  # 启用 IP 哈希策略
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}
```

@tab 最少连接（least_conn）

优先分配请求到连接数最少的服务器：

```nginx
upstream backend_servers {
    least_conn;  # 启用最少连接策略
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}
```

@tab URL 哈希（需要第三方模块）

根据请求 URL 分配到固定服务器（需安装 `ngx_http_upstream_hash_module`）：

```nginx
upstream backend_servers {
    hash $request_uri;  # 按 URL 哈希
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}
```

:::

**高级配置（健康检查）**

配置服务器健康检查，自动剔除故障节点：

```nginx
upstream backend_servers {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;

    # 健康检查配置
    keepalive 32;  # 保持连接数
    max_fails 3;   # 最大失败次数
    fail_timeout 30s;  # 失败后暂停 30 秒
}
```

**配置生效**

完成配置后，检查并重启 Nginx：

```bash
# 检查配置语法
nginx -t

# 重启 Nginx
systemctl restart nginx
# 或
service nginx restart
```

通过以上配置，Nginx 会根据指定策略将请求分发到后端服务器集群，实现负载均衡，提高系统可用性和吞吐量。