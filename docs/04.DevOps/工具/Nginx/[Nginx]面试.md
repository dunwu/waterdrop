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

::: tip 扩展

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Nginx 开发从入门到精通](http://tengine.taobao.org/book/index.html) —— 淘宝技术团队

:::

## Nginx 简介

### 【简单】什么是 Nginx？⭐⭐⭐

Nginx 是一个高性能、开源的 **Web 服务器**软件。但它更核心的现代角色是作为**反向代理服务器**和**负载均衡器**。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/nginx.jpg)

**核心特点**：采用**事件驱动**的异步架构，能以极少的资源处理海量并发连接，以**高性能、高稳定性和低内存占用**著称。

**应用场景**

| 场景             | 角色       | 核心作用                                                 | 简单比喻                                       |
| :--------------- | :--------- | :------------------------------------------------------- | :--------------------------------------------- |
| **静态内容服务** | Web 服务器 | 直接高效地处理静态文件（HTML, CSS, 图片等）              | **仓库管理员**，直接发货                       |
| **反向代理**     | 流量门户   | 接收所有用户请求，转发给后端应用服务器，并隐藏服务器细节 | **公司前台/总机**，接收所有电话再转接内部      |
| **负载均衡**     | 流量分配器 | 将用户请求分发到多个后端服务器，提升系统性能和可用性     | **银行的排队叫号系统**，将顾客平均分给多个柜台 |
| **SSL/TLS 终止** | 安全网关   | 统一管理 HTTPS 证书，后端服务只需 HTTP                   | **统一安检入口**                               |
| **限流与安全**   | 防护屏障   | 防 CC 攻击、API 滥用                                     | **门禁系统**                                   |

### 【中等】Nginx 的架构是什么？为什么性能高？⭐⭐⭐⭐

> - Nginx 的 Master-Worker 模型是什么？
> - 为什么 Nginx 比 Apache 性能高？

**Nginx 采用 Master-Worker 多进程模型 + 事件驱动异步架构**。

```mermaid
graph TB
    M[Master 进程] --> W1[Worker 进程 1]
    M --> W2[Worker 进程 2]
    M --> W3[Worker 进程 3]
    M --> W4[Worker 进程 4]
    W1 --> C1[连接 1]
    W1 --> C2[连接 2]
    W1 --> C3[连接 3...]
    W2 --> C4[连接 4]
    W2 --> C5[连接 5...]
```

| 组件            | 职责                                                     |
| :-------------- | :------------------------------------------------------- |
| **Master 进程** | 管理 Worker 进程（启动、停止、监控）、读取配置、信号处理 |
| **Worker 进程** | 实际处理请求，每个 Worker 可处理**数千个并发连接**       |

**高性能原因**：

| 特性           | Nginx                    | Apache（传统 Prefork） |
| :------------- | :----------------------- | :--------------------- |
| **架构**       | 事件驱动 + 异步非阻塞    | 每连接一个进程/线程    |
| **并发能力**   | 单 Worker 处理数千连接   | 受进程/线程数限制      |
| **内存消耗**   | 极低（共享 Master 资源） | 每连接独占进程内存     |
| **上下文切换** | 少（无进程切换）         | 频繁（进程切换）       |

**Nginx 底层使用的 I/O 模型**：Linux 上使用 **epoll**，FreeBSD 上使用 **kqueue**，这是其高性能的根基。

**方案权衡：并发模型的取舍**

| 模型               | 代表                    | 优势                                             | 代价                                               |
| :----------------- | :---------------------- | :----------------------------------------------- | :------------------------------------------------- |
| **多进程事件驱动** | Nginx                   | 进程隔离（一个 Worker 崩溃不影响其他）、无锁开销 | 进程间共享内存需额外机制（如共享内存区存限流计数） |
| **多线程事件驱动** | Apache worker/event MPM | 内存更省                                         | 锁竞争、线程崩溃可能带走整个进程                   |
| **每连接一进程**   | Apache prefork          | 实现简单、隔离最强                               | 内存随连接数线性增长，数千连接即力不从心           |

Nginx 选多进程而非多线程，核心是稳定性：Worker 之间零共享状态，无需加锁，单个 Worker 崩溃 Master 秒级重拉。

**失效场景**：

- **单 Worker 内阻塞操作是致命伤**：事件模型的前提是所有 I/O 都非阻塞，若在 Lua/模块里写了同步阻塞调用（如同步 DNS、阻塞的磁盘读），单 Worker 的数千连接全部卡住。必须用异步 API 或交给线程池（`aio threads`）。
- **CPU 密集型任务不适合 Nginx 内处理**：复杂正则、大文件压缩在 Worker 里执行会阻塞事件循环，应交给后端或 OpenResty 协程。
- **连接数超过 worker_connections 时直接拒连**：返回 502/503，需配合 `worker_rlimit_nofile` 和系统 fd 上限一起调。

**踩坑案例**：某团队在 OpenResty 里写了一个 `ngx.location.capture` 调用内网同步鉴权接口，平时鉴权接口 5ms 返回没暴露问题。某次鉴权服务发布超时（响应 3 秒），Nginx 单 Worker 的事件循环被同步等待阻塞，整台机器数万并发连接全部卡死，全站 504。排查：错误日志无异常但 `top` 显示 Worker 无 CPU 占用（在等待而非计算），结合鉴权服务变更记录定位；根因：同步子请求依赖无超时；修复：子请求加 200ms 超时 + 降级策略（鉴权失败时按默认策略放行/拒绝并告警），并把"下游依赖必须带超时"写入网关开发规范。

**量化参考**：Nginx 诞生于 2004 年，正是 **C10K 问题**（单机 1 万并发连接）困扰业界的时期；经调优后单机轻松支撑**数万并发连接**，官方曾展示过单机 100 万连接的配置案例；对比下 Apache prefork 模式在几千连接时内存就可能吃紧（每连接约 5~10MB）。

#### 拓展追问

1. epoll 相比 select/poll 强在哪里，为什么是 Nginx 高并发的前提？
   select/poll 每次调用都要把全部 fd 集合传入内核线性扫描，且 fd 上限低（select 默认 1024）；epoll 用红黑树管理 fd，通过回调将就绪事件放入就绪链表，`epoll_wait` 只返回就绪的连接，复杂度从 O(n) 降为 O(就绪数)。当 10 万连接中只有几百个活跃时，这个差异就是性能的分水岭。
2. Master-Worker 模型下，热重载为什么不会丢连接？
   reload 时 Master 先校验配置，然后启动一批新 Worker 处理新连接，旧 Worker 收到退出信号后不再接新连接，但继续处理存量连接直到完成或超时退出。新旧 Worker 并存过渡，所以服务不断、连接不丢；代价是若旧配置里有超长长连接，旧 Worker 会驻留很久，可用 `worker_shutdown_timeout` 限制。
3. Worker 数设为 CPU 核数的依据是什么？什么情况下应该偏离这个值？
   事件驱动的 Worker 主要在等待 I/O，CPU 密集时刻不多，核数即上限可避免不必要的进程切换。但两种情况要偏离：磁盘 I/O 重（静态文件服务大量读盘）时可适当多配配合 aio；SSL 卸载等 CPU 密集场景下 Worker 绑核（`worker_cpu_affinity`）比加数量更有效。

#### 场景题

大促前压测，Nginx 网关在 8 万并发连接时开始出现大量 502，但后端应用 CPU 只有 40%，Nginx 机器 CPU 也只有 30%。你如何定位瓶颈并解决？

**应急处理**：先确认 502 的分布——是连不上后端（connect failed）还是后端响应超时；同时临时扩容 Nginx 实例分流，避免压测演变成真实故障。

**根因分析**：双端 CPU 都不高但 502 飙升，大概率不是算力瓶颈而是**连接/文件描述符层**的问题。按优先级排查：① `ulimit -n` 与 `worker_rlimit_nofile` 是否到顶（默认 1024/65535 未调时 8 万连接必然碰墙）；② `worker_connections` 是否小于实际连接数；③ 内核参数：`net.core.somaxconn`、后端 listen backlog 是否溢出（`netstat -s` 看 overflow 计数）；④ Nginx 到后端的连接是否未复用，每请求新建 TCP 导致端口耗尽（TIME_WAIT 堆积），应配 `keepalive` 长连接。

**长期方案**：① 容量基线：压测确定单机连接数上限（通常调优后 5~10 万），在 70% 水位触发扩容；② 把 fd 上限、somaxconn、keepalive 连接池纳入平台标准配置模板，避免每个团队重踩；③ 监控增加 `nginx_connections_active/waiting`、listen overflow、TIME_WAIT 计数等网关层指标。

**权衡**：无脑横向加 Nginx 实例能掩盖问题但治标不治本，且增加长连接均衡的复杂度；正确顺序是先消除配置层天花板（几乎零成本），再按实测容量规划横向扩展。

## 代理与路由

### 【中等】什么是正向代理和反向代理？⭐⭐⭐

| 对比维度       | 正向代理（Forward Proxy）        | 反向代理（Reverse Proxy）        |
| :------------- | :------------------------------- | :------------------------------- |
| **代理对象**   | 代理**客户端**（隐藏客户端身份） | 代理**服务端**（隐藏服务端细节） |
| **客户端感知** | 客户端**知道**目标服务器         | 客户端**不知道**后端服务器       |
| **典型应用**   | VPN、翻墙、企业上网代理          | **Nginx**、CDN、API 网关         |
| **配置位置**   | 客户端配置                       | 服务端配置                       |

**反向代理配置示例**：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**关键代理头**：

- `X-Real-IP`：传递客户端真实 IP。
- `X-Forwarded-For`：传递完整代理链 IP（每经过一层代理追加一个 IP）。
- `X-Forwarded-Proto`：传递原始协议（HTTP/HTTPS）。

### 【中等】Nginx 的 location 匹配规则是什么？⭐⭐⭐

**匹配优先级**（从高到低）：

| 优先级 | 语法                 | 含义                              | 示例                     |
| :----- | :------------------- | :-------------------------------- | :----------------------- |
| 1      | `location = /uri`    | **精确匹配**                      | `location = /api/health` |
| 2      | `location ^~ /uri`   | **前缀匹配**（优先级高于正则）    | `location ^~ /static/`   |
| 3      | `location ~` 或 `~*` | **正则匹配**（`~*` 不区分大小写） | `location ~ \.php$`      |
| 4      | `location /uri`      | **普通前缀匹配**                  | `location /api`          |
| 5      | `location /`         | **通用匹配**（兜底）              | `location /`             |

**匹配流程**：先找精确匹配 → 再找最长前缀匹配 → 若前缀匹配有 `^~` 则停止，否则继续找正则匹配 → 正则按顺序匹配第一个命中的。

### 【中等】Nginx 中 rewrite 和 return 有什么区别？⭐⭐

| 指令        | 原理                 | 性能             | 适用场景      |
| :---------- | :------------------- | :--------------- | :------------ |
| **return**  | 直接返回状态码或 URL | **快**           | 简单重定向    |
| **rewrite** | 正则匹配 + 重写 URL  | 较慢（正则开销） | 复杂 URL 改写 |

```nginx
# return 示例：HTTP 跳 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

# rewrite 示例：旧路径映射
location /old-path {
    rewrite ^/old-path/(.*)$ /new-path/$1 permanent;
}
```

**rewrite 标记**：

- `last`：内部重写，重新进入 location 匹配。
- `break`：停止后续 rewrite 规则。
- `redirect`：302 临时重定向（客户端可见）。
- `permanent`：301 永久重定向。

## 负载均衡

### 【中等】如何用 Nginx 实现负载均衡？有哪些策略？⭐⭐⭐⭐

```nginx
upstream backend_servers {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 192.168.1.100:3000;
}

server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://backend_servers;
    }
}
```

**负载均衡策略**

| 策略               | 配置方式            | 原理                         | 适用场景           |
| :----------------- | :------------------ | :--------------------------- | :----------------- |
| **轮询（默认）**   | 无需配置            | 按顺序轮流分配               | 服务器性能一致     |
| **权重（weight）** | `weight=N`          | 按权重比例分配               | 服务器性能不同     |
| **IP 哈希**        | `ip_hash`           | 同一 IP 固定到同一服务器     | 会话保持           |
| **最少连接**       | `least_conn`        | 分配给当前连接数最少的服务器 | 请求处理时间差异大 |
| **URL 哈希**       | `hash $request_uri` | 同一 URL 固定到同一服务器    | 缓存场景           |
| **Fair**（第三方） | `fair`              | 按后端响应时间分配           | 需要最优响应       |

**健康检查配置**：

```nginx
upstream backend_servers {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3001 max_fails=3 fail_timeout=30s;
    keepalive 32;  # 与后端保持长连接
}
```

- `max_fails=3`：连续 3 次失败后标记为不可用。
- `fail_timeout=30s`：30 秒内不可用，之后重新尝试。
- `keepalive 32`：与后端保持 32 个长连接（减少 TCP 握手开销）。

**方案权衡：策略选型**

| 策略                                     | 优势                                | 代价/失效边界                                                                        |
| :--------------------------------------- | :---------------------------------- | :----------------------------------------------------------------------------------- |
| **轮询/加权轮询**                        | 简单、分配均匀                      | 不考虑后端实际负载，长请求多的后端会被压弯                                           |
| **least_conn**                           | 自适应请求时长差异                  | 只统计当前 Worker 视角的连接数，短连接场景统计失真                                   |
| **ip_hash**                              | 天然会话保持，零配置                | **客户端经过代理/CDN 时彻底失效**（看到的都是代理 IP）；后端增减节点时大量用户被打散 |
| **一致性哈希**（`hash $key consistent`） | 节点变动只影响 1/N 的键，适合缓存层 | 需配合虚拟节点才能均衡；哈希键选错会热点化                                           |

**会话保持的正确姿势**：ip_hash 只适合内网直连、无代理的场景；生产环境首选**会话外置（Redis/Token）**实现无状态化，负载均衡策略就可以自由切换，这是比任何 hash 策略都根本的解法。

**失效场景**：

- **ip_hash 在多层代理后失效**：Nginx 前面还有一层 SLB/CDN 时，`$remote_addr` 全是代理 IP，所有流量 hash 到同一台后端，负载均衡退化为单点——此时要么 hash `$http_x_forwarded_for`（需信任上游），要么干脆放弃会话保持。
- **被动健康检查的盲区**：`max_fails` 只在实际请求失败时才计数，没有流量经过的故障节点不会被发现；若后端假死（进程在但不响应），前几个真实用户会充当"探测器"吃到错误。对可靠性要求高的场景需主动探活（Nginx Plus 或 Tengine 的 `check` 指令）。
- **后端全部摘除时雪崩**：所有 server 都被标记失败时 Nginx 返回 502；`backup` 节点和合理的 `fail_timeout` 是保底。

**踩坑案例**：某业务从自建机房迁到云上加了一层 SLB，Nginx 配置没变仍是 `ip_hash` 做会话保持。上线后监控发现 5 台后端里只有 1 台在扛流量，其余 4 台几乎零请求，高峰期那台直接被打崩。排查：后端访问日志里客户端 IP 全是 SLB 的内网段；根因：多层代理后 ip_hash 退化为"固定打一台"；修复：会话迁移到 Redis 实现无状态化，负载策略改回加权轮询；并在接入规范中明确"存在多层代理时禁止使用 ip_hash"。

**量化参考**：Nginx 开源版负载均衡在万级 QPS 下转发开销可忽略（单核数万 QPS）；后端扩容时，普通 hash 会让几乎 100% 的键重新映射，一致性哈希（含虚拟节点）只迁移约 1/N（10 节点约 10%）。

#### 拓展追问

1. 一致性哈希为什么适合做缓存层，不适合做会话保持？
   缓存层的键是 URL/商品 ID 这类稳定分布，节点变动只影响约 1/N 的键，缓存命中率损失可控；而会话保持的键是用户，用户数远大于节点数且分布不均，hash 均衡性差，且节点下线时会话直接丢失——会话应该存 Redis 而不是靠路由固定。
2. 后端上线新节点时，为什么直接加入 upstream 可能导致流量尖刺？
   新节点连接池、JIT、本地缓存都是冷的，一上来就吃 1/N 流量容易被打崩或响应变慢。正确做法：先以小权重/低比例接入（或配合慢启动 slow start，Nginx Plus 支持 `slow_start` 参数），预热后再恢复正常权重；开源版可用分批 reload 模拟。
3. 主动健康检查和被动健康检查怎么选？
   被动（max_fails）零配置、无额外流量，但有盲区（无流量不探测、用真实用户试错）；主动探活定期发探针请求，能提前发现假死节点，代价是探针流量和配置复杂度。核心链路用主动 + 被动兑底，非核心链路被动即可。

#### 场景题

凌晨 2 点告警：某服务 5 台后端中有 1 台持续返回 500，Nginx 却在 max_fails=3 后把它摘除 30 秒又放回来，循环往复，期间部分用户持续看到错误页。你如何处置并根治？

**应急处理（先止血）**：立即把故障节点从 upstream 手动下线（注释掉 + reload，或直接停掉该实例），摘除"反复进出"的振荡，把影响面降为零；同时确认其余 4 台容量充足。

**根因分析**：振荡的本质是**被动健康检查的固有缺陷**：节点假死/间歇性故障时，fail_timeout 到期后 Nginx 会重新试探，前几个真实用户请求充当探针，失败则再摘 30 秒——用户周期性看到错误。更深层要查该节点为什么间歇性 500（常见：内存泄漏后 GC 风暴、磁盘满导致写失败），这才是病根。

**长期方案**：① 故障节点替换重建，不现场缝补；② 引入主动健康检查（Tengine `check` 或网关层探活），提前剔除假死节点，不让真实用户当探针；③ 调大 `fail_timeout`（如 60s）+ 增加 `max_fails` 降低振荡频率；④ 业务层加客户端重试（幂等接口）+ 优雅降级，把单节点故障的用户感知降到最低。

**权衡**：把 fail_timeout 调得过长会导致误摘的健康节点恢复慢；主动探活有额外流量和配置成本。原则：核心链路宁可多花探针流量也要提前发现故障，非核心链路容忍被动检查的滞后；但无论哪种，节点自身故障的快速重建能力（容器化自动拉起）才是真正的底气。

## 限流

### 【中等】如何用 Nginx 做限流？⭐⭐⭐

Nginx 主要通过两个**原生模块**实现限流：

**（1）`limit_req`：限制请求速率（漏桶算法）**

```nginx
http {
    # 定义规则：以客户端 IP 为键，速率限制为每秒 10 次请求
    limit_req_zone $binary_remote_addr zone=my_rate_limit:10m rate=10r/s;
}

server {
    location /api/ {
        # 允许 20 个请求的突发队列，且立即处理
        limit_req zone=my_rate_limit burst=20 nodelay;
    }
}
```

**（2）`limit_conn`：限制并发连接数**

```nginx
http {
    limit_conn_zone $binary_remote_addr zone=my_conn_limit:10m;
}

server {
    location /download/ {
        limit_conn my_conn_limit 2;  # 每个 IP 最多 2 个并发连接
        limit_rate 500k;             # 单连接限速 500KB/s
    }
}
```

**最佳实践**：

- **首选 `limit_req`**：应对大多数流量控制场景。
- **善用 `burst` 和 `nodelay`**：兼顾限流和用户体验。
- **设置白名单**：避免内部 IP 或健康检查被误限。

## 性能调优

### 【困难】Nginx 性能调优有哪些关键参数？⭐⭐⭐

| 配置项                 | 推荐值                  | 说明                      |
| :--------------------- | :---------------------- | :------------------------ |
| `worker_processes`     | `auto`（等于 CPU 核数） | Worker 进程数             |
| `worker_connections`   | `10000~65535`           | 每个 Worker 最大连接数    |
| `worker_rlimit_nofile` | `65535`                 | Worker 最大文件描述符数   |
| `keepalive_timeout`    | `65`                    | 客户端长连接超时          |
| `keepalive_requests`   | `1000`                  | 单连接最大请求数          |
| `sendfile`             | `on`                    | 启用零拷贝传输            |
| `tcp_nopush`           | `on`                    | 配合 sendfile，合并小包   |
| `tcp_nodelay`          | `on`                    | 禁用 Nagle 算法，减少延迟 |
| `gzip`                 | `on`                    | 启用响应压缩              |
| `proxy_buffering`      | `on`                    | 代理响应缓冲              |

**完整调优示例**：

```nginx
# nginx.conf
user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;
error_log /var/log/nginx/error.log warn;

events {
    worker_connections 65535;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    keepalive_requests 1000;

    # Gzip 压缩
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/json application/javascript;

    # 代理优化
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
    proxy_buffering on;
    proxy_buffer_size 4k;
    proxy_buffers 8 4k;
}
```

### 【中等】如何限制上传文件大小？⭐

配置 `client_max_body_size`：

```nginx
# http 模块（全局生效）
client_max_body_size 20m;

# server 模块（该 server 生效）
# location 模块（仅匹配的 location 生效）
```

超过限制返回 **413 Request Entity Too Large**。

## SSL/TLS

### 【中等】如何用 Nginx 配置 HTTPS？⭐⭐⭐

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # SSL 优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
        proxy_pass http://backend;
    }
}

# HTTP 强制跳转 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

**SSL 优化要点**：

- **启用 HTTP/2**：`listen 443 ssl http2`，多路复用大幅提升性能。
- **TLS 1.3**：握手更快（1-RTT，支持 0-RTT 重连）。
- **Session Cache**：缓存 SSL 会话，避免重复握手。

## 缓存

### 【中等】Nginx 如何做缓存？⭐⭐

**（1）浏览器缓存（通过响应头控制）**

```nginx
location /static/ {
    expires 30d;  # 30 天缓存
    add_header Cache-Control "public, immutable";
}
```

**（2）代理缓存（Nginx 缓存后端响应）**

```nginx
http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;
}

server {
    location /api/ {
        proxy_cache my_cache;
        proxy_cache_valid 200 10m;    # 200 响应缓存 10 分钟
        proxy_cache_valid 404 1m;     # 404 响应缓存 1 分钟
        proxy_cache_key "$scheme$request_method$host$request_uri";
        proxy_pass http://backend;
    }
}
```

## 高可用

### 【中等】如何实现 Nginx 高可用？⭐⭐

**方案：Keepalived + Nginx 双机热备**

```mermaid
graph LR
    VIP[虚拟 IP - VIP] --> N1[Nginx 主节点]
    VIP --> N2[Nginx 备节点]
    N1 -->|VRRP 心跳| N2
    N1 --> B[后端服务集群]
    N2 --> B
```

- **Keepalived** 基于 VRRP 协议，管理虚拟 IP（VIP）。
- 主节点故障时，VIP **秒级漂移**到备节点，实现无感知切换。
- 两个 Nginx 节点配置完全相同，通过配置同步工具（如 `lsyncd`）保持一致。

**Nginx 进程崩溃自动恢复**：Master 进程会监控 Worker，Worker 异常退出时 Master 会自动拉起新的 Worker。

### 【中等】Nginx 的热重载原理是什么？常用命令有哪些？⭐⭐⭐

**热重载原理**：基于 Master-Worker 模型和**信号机制**。执行 reload 时，Master 进程收到 `SIGHUP` 信号后：

1. 检查新配置语法，失败则继续用旧配置；
2. 启动一批**新 Worker**（加载新配置）；
3. 向**旧 Worker**发送优雅退出信号，处理完当前连接后退出（长连接会等待超时）。

整个过程**不中断服务、不丢失连接**，实现平滑重载。

**常用命令**：

```bash
nginx -t                        # 检查配置语法（改动后必做）
nginx -s reload                 # 热重载配置（发送 SIGHUP）
nginx -s stop                   # 快速停止
nginx -s quit                   # 优雅停止（处理完当前请求）
nginx -s reopen                 # 重新打开日志文件（日志切割）
```

**信号对应关系**：`SIGHUP`（reload）、`SIGQUIT`（优雅停止）、`SIGTERM`（快速停止）、`SIGUSR1`（重开日志）、`SIGUSR2`（平滑升级二进制）。

**总结**：改配置先 `nginx -t` 再 `nginx -s reload`，新旧 Worker 交接实现零停机更新。

## 防盗链

### 【简单】如何用 Nginx 实现防盗链？⭐

```nginx
location ~* \.(jpg|jpeg|png|gif|mp4)$ {
    valid_referers none blocked server_names *.example.com;
    if ($invalid_referer) {
        return 403;
        # 或返回一张替代图片
        # rewrite ^/ /images/hotlink-denied.png break;
    }
}
```

**原理**：检查 HTTP 请求头中的 `Referer` 字段，拒绝非授权来源的请求。

## 动静分离

### 【中等】Nginx 如何实现动静分离？⭐⭐

**动静分离**：Nginx 直接处理静态资源，动态请求转发到后端应用服务器。

```nginx
server {
    # 静态资源：Nginx 直接处理
    location /static/ {
        alias /var/www/static/;
        expires 30d;
    }

    location ~* \.(html|css|js|jpg|png|ico)$ {
        root /var/www/static;
        expires 7d;
    }

    # 动态请求：转发到后端
    location /api/ {
        proxy_pass http://backend_servers;
    }
}
```

**优势**：Nginx 处理静态资源的性能远高于 Tomcat/Spring Boot 等应用服务器，动静分离能**极大提升系统整体吞吐量**。

## 参考资料

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Nginx 开发从入门到精通](http://tengine.taobao.org/book/index.html) —— 淘宝技术团队
- [Nginx 核心知识 100 讲](https://time.geekbang.org/course/intro/100014401) —— 陶辉（极客时间）

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

![](https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/nginx.jpg)

**核心特点**：采用**事件驱动**的异步架构，能以极少的资源处理海量并发连接，以**高性能、高稳定性和低内存占用**著称。

**应用场景**

| 场景             | 角色       | 核心作用                                                 | 简单比喻                                       |
| :--------------- | :--------- | :------------------------------------------------------- | :--------------------------------------------- |
| **静态内容服务** | Web 服务器 | 直接高效地处理静态文件（HTML, CSS, 图片等）              | **仓库管理员**，直接发货                       |
| **反向代理**     | 流量门户   | 接收所有用户请求，转发给后端应用服务器，并隐藏服务器细节 | **公司前台/总机**，接收所有电话再转接内部      |
| **负载均衡**     | 流量分配器 | 将用户请求分发到多个后端服务器，提升系统性能和可用性     | **银行的排队叫号系统**，将顾客平均分给多个柜台 |

## 【中等】什么是正向代理和反向代理？

反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/reverse-proxy.png)

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
