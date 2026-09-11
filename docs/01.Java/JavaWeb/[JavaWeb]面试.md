---
title: JavaWeb 面试
date: 2020-02-07 23:04:47
order: 99
categories:
  - Java
  - JavaWeb
tags:
  - Java
  - JavaWeb
  - Servlet
permalink: /pages/8c23f138/
---

# JavaWeb 面试

## Web

### 【简单】用户在浏览器中输入 URL 后发生了什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JavaWeb / 网络链路

#### 💎 关键结论

七步链路：DNS 解析 → TCP 三次握手 → 发送 HTTP 请求 → 服务器处理 → 返回响应 → 浏览器渲染 → 四次挥手（Keep-Alive 则保持连接）。每一步都可深挖：DNS 缓存层级、TLS 握手、服务端请求链路、浏览器渲染管线。

#### ⚡记忆卡片

- **口诀**：解析、握手、发请求、处理、响应、渲染、挥手
- **关键词**：DNS ／ 三次握手 ／ 状态码 ／ 渲染 ／ 四次挥手
- **链路**：DNS → TCP 握手 → HTTP 请求 → 服务器处理 → HTTP 响应 → 浏览器渲染 → 连接关闭

#### 📖 核心知识

1. **DNS 解析**：域名 → IP 地址（依次查浏览器缓存、系统缓存、路由器缓存、DNS 服务器递归查询）
2. **TCP 三次握手**：建立 TCP 连接（HTTPS 还需 TLS 握手）
3. **发送 HTTP 请求**：构造请求行、请求头、请求体
4. **服务器处理请求**：路由、业务逻辑、数据库操作
5. **返回 HTTP 响应**：状态码 + 响应头 + 响应体（HTML）
6. **浏览器渲染**：解析 HTML → DOM 树 → 渲染页面
7. **TCP 四次挥手**：关闭连接（Keep-Alive 则保持）

#### 🔬 扩展知识

::: details

- 【L3】浏览器渲染管线：HTML → DOM 树，CSS → CSSOM，二者合成 Render 树，再布局（Layout）与绘制（Paint）；`<script>` 默认阻塞解析，`async`/`defer` 可改变加载行为。
- 【L3】服务端链路展开即 Tomcat → Filter → DispatcherServlet → Interceptor → Controller，是 Web 框架面试题的标准纵深。
- 【L4】现代优化：HTTP/2 多路复用减少连接数、`dns-prefetch`/`preconnect` 提前建连、CDN 就近访问、关键 CSS 内联与非关键 JS 延迟加载。

:::

#### 🔀 发散问题

- **Q：服务器处理请求的内部链路是什么？** → Filter → Interceptor → AOP → Controller，见本文档「过滤器(Filter)、拦截器(Interceptor)、AOP 的区别？」。
- **Q：响应状态码怎么读？** → 首位定类，见本文档「HTTP 常见状态码有哪些？」。
- **Q：响应能否被浏览器缓存？** → 强缓存与协商缓存两级策略，见本文档「HTTP 缓存机制是如何工作的？」。

### 【简单】GET 请求和 POST 请求的区别？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / HTTP 方法

#### 💎 关键结论

GET 与 POST 的核心差异在语义：GET 获取数据、幂等、参数在 URL；POST 提交数据、非幂等、参数在 Body。由此衍生出缓存、安全性、数据量限制等差异。注意 POST 也不是加密的，安全依赖 HTTPS 而非方法本身。

#### ⚡记忆卡片

- **口诀**：GET 取、POST 送；GET 幂等可缓存，POST 提交不缓存
- **关键词**：语义 ／ 幂等 ／ 参数位置 ／ URL 长度限制
- **链路**：请求方法 → 语义（取/送）→ 参数位置（URL/Body）→ 缓存与安全差异

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/f497fd6a2e5647dc9e843fcce37fe199.png)

| 对比维度     | GET                                 | POST                  |
| :----------- | :---------------------------------- | :-------------------- |
| **语义**     | 从服务器**获取**数据                | 向服务器**提交**数据  |
| **参数位置** | 附加在 URL 之后（`?key=value&...`） | 放在请求 Body 中      |
| **数据量**   | 受 URL 长度限制（约 2KB）           | 理论上无限制          |
| **安全性**   | 差，参数暴露在 URL 中               | 较高，参数不在 URL 中 |
| **幂等性**   | 幂等（多次请求结果相同）            | 非幂等                |
| **缓存**     | 可被浏览器缓存                      | 默认不缓存            |

- **参数位置**：GET 参数拼在 URL 上，会留在浏览器历史与服务端访问日志中；POST 参数在请求体中，但同样是明文，需 HTTPS 保护。
- **幂等性**：GET 天然幂等，多次请求结果一致；POST 重复提交会产生重复数据，故"防重复提交"通常针对 POST。
- **数据量**：HTTP 规范并未限制 GET 长度，约 2KB 是浏览器/服务器的常见实现限制（不同实现约 2KB~8KB）；POST 理论无限制，实际受服务器配置约束。

**扩展要点**：RESTful 设计中 PUT/DELETE 也是幂等方法，方法语义是 HTTP 规范层面的约定；HTTP/2、HTTP/3 下 GET/POST 在传输层已无差异，幂等性完全靠应用层接口设计保证。

#### 🔀 发散问题

- **Q：HTTP 常见状态码有哪些？** → GET 命中缓存返回 200 from cache，协商命中返回 304，见本文档「HTTP 常见状态码有哪些？」。
- **Q：RESTful 接口如何使用方法语义？** → GET 查、POST 增、PUT 改、DELETE 删，见本文档「什么是 RESTful API？设计原则？」。

### 【简单】HTTP 常见状态码有哪些？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / HTTP 状态码

#### 💎 关键结论

状态码三位数字，首位定类：1xx 信息、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务器错误。高频记牢：200 成功、301/302 重定向、304 缓存命中、401 未认证、403 无权限、404 不存在、500 服务端异常、502 网关错误、503 服务不可用。

#### ⚡记忆卡片

- **口诀**：1 信 2 成 3 跳转，4 错客户 5 错服务
- **关键词**：200 ／ 302 ／ 304 ／ 401 vs 403 ／ 502
- **链路**：请求 → 2xx 成功 ／ 3xx 跳转 ／ 4xx 客户端错 ／ 5xx 服务端错

#### 📖 核心知识

| 状态码类别 | 含义         | 常见状态码                                                          |
| :--------- | :----------- | :------------------------------------------------------------------ |
| `1xx`      | 信息性状态码 | 100 Continue                                                        |
| `2xx`      | 成功         | 200 OK、201 Created、204 No Content、206 Partial Content            |
| `3xx`      | 重定向       | 301 永久重定向、302 临时重定向、304 Not Modified（缓存）            |
| `4xx`      | 客户端错误   | 400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found     |
| `5xx`      | 服务器错误   | 500 Internal Server Error、502 Bad Gateway、503 Service Unavailable |

- **401 vs 403**：401 是未认证（没登录或凭证失效，应引导重新登录）；403 是已认证但无权限。
- **304**：与协商缓存配合，服务器确认资源未变，浏览器直接用本地缓存。
- **502 vs 504**：502 是网关收到上游的错误响应；504 是网关等上游超时。
- **429 Too Many Requests**：限流场景常见。

#### 🔀 发散问题

- **Q：304 是怎么产生的？** → 协商缓存命中（ETag / Last-Modified 未变化），见本文档「HTTP 缓存机制是如何工作的？」。
- **Q：401 之后用户如何重新认证？** → 取决于会话方案选型（Session/JWT/OAuth2），见本文档「Cookie / Session / Token / JWT 如何选型？」。

### 【中等】HTTP 缓存机制是如何工作的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / HTTP 缓存

#### 💎 关键结论

HTTP 缓存两级策略：先走强缓存（`Cache-Control` 有效期内直接用本地副本，不发请求）；过期后走协商缓存（带 `ETag`/`Last-Modified` 询问服务器，未变则返回 304 复用本地）。强缓存省请求，协商缓存省带宽。

#### ⚡记忆卡片

- **口诀**：强缓存看 Cache-Control，协商缓存看 ETag，304 就是没变
- **关键词**：max-age ／ Expires ／ If-None-Match ／ 304
- **链路**：请求 → 强缓存命中？→ 否 → 带条件请求 → 304 用缓存 ／ 200 下新资源

#### 📖 核心知识

HTTP 缓存分为**强缓存**和**协商缓存**两种策略：

**强缓存**：浏览器直接使用本地缓存，不发送请求（状态码 200 from cache）。

| 响应头          | 说明                                        | 优先级         |
| :-------------- | :------------------------------------------ | :------------- |
| `Cache-Control` | `max-age=3600`（秒级有效期）                | 高（HTTP/1.1） |
| `Expires`       | `Thu, 01 Dec 2025 16:00:00 GMT`（绝对时间） | 低（HTTP/1.0） |

**协商缓存**：浏览器向服务器询问资源是否更新，未更新返回 304。

| 请求头 / 响应头                       | 说明                       |
| :------------------------------------ | :------------------------- |
| `Last-Modified` / `If-Modified-Since` | 基于文件最后修改时间       |
| `ETag` / `If-None-Match`              | 基于文件内容哈希（更精确） |

```mermaid
graph TD
    A[浏览器请求资源] --> B{强缓存命中?}
    B -->|是| C[直接使用缓存 200 from cache]
    B -->|否| D[发送请求到服务器]
    D --> E{协商缓存命中?}
    E -->|304| F[使用本地缓存]
    E -->|200| G[下载新资源并更新缓存]
```

#### 🔬 扩展知识

::: details

- 【L3】`Cache-Control` 的 `no-store`（完全不缓存）与 `no-cache`（跳过强缓存、但仍走协商缓存）含义不同；`no-cache` 并非"不缓存"。
- 【L3】`Last-Modified` 是秒级精度且无法感知"改了但内容没变"的场景，故 `ETag` 优先级更高、更精确。
- 【L4】多副本部署时 ETag 必须一致（如用内容哈希或版本号生成），否则请求打到不同节点会频繁返回 200 而非 304。
- 【L4】用户按 F5 刷新会跳过强缓存（带上条件请求头），Ctrl+F5 会强制绕过所有缓存——排查"缓存不生效"时要先区分操作方式。

:::

#### 🔀 发散问题

- **Q：304 状态码属于哪一类？** → 3xx 重定向类，协商缓存命中，见本文档「HTTP 常见状态码有哪些？」。
- **Q：GET 请求与缓存的关系？** → GET 可被浏览器缓存、POST 默认不缓存，见本文档「GET 请求和 POST 请求的区别？」。

### 【中等】什么是 RESTful API？设计原则？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / RESTful

#### 💎 关键结论

REST 是一种架构风格：URL 用名词表示资源，HTTP 方法表达操作语义（GET 查/POST 增/PUT 改/DELETE 删），状态码表达结果，接口无状态。核心价值是语义清晰、可缓存、易扩展。

#### ⚡记忆卡片

- **口诀**：名词当资源，动词变方法，状态码说话
- **关键词**：资源 ／ HTTP 方法语义 ／ 无状态 ／ 状态码
- **链路**：资源（URL 名词）→ 操作（HTTP 方法）→ 结果（状态码）

#### 📖 核心知识

**REST（Representational State Transfer）是一种软件架构风格**，RESTful API 是基于 REST 原则设计的 HTTP 接口。

**核心原则**：

- **资源导向**：URL 表示资源，用名词不用动词（`/users` 而非 `/getUsers`）
- **HTTP 方法语义化**：GET（查）、POST（增）、PUT（改）、DELETE（删）
- **状态码规范**：200 成功、201 创建成功、400 参数错误、404 不存在
- **无状态**：每次请求包含所有信息，服务器不保存会话状态

| 操作         | 方法   | URL            | 请求体 | 成功响应        |
| :----------- | :----- | :------------- | :----- | :-------------- |
| 查询用户列表 | GET    | `/api/users`   | 无     | 200 + JSON 数组 |
| 查询单个用户 | GET    | `/api/users/1` | 无     | 200 + JSON 对象 |
| 创建用户     | POST   | `/api/users`   | JSON   | 201 + JSON      |
| 更新用户     | PUT    | `/api/users/1` | JSON   | 200 + JSON      |
| 删除用户     | DELETE | `/api/users/1` | 无     | 204             |

#### 🔬 扩展知识

::: details

- 【L3】PUT 与 PATCH：PUT 是全量替换（幂等），PATCH 是局部更新（通常不要求幂等）。
- 【L3】REST 的无状态与认证方案直接相关：JWT 天然契合，Session 则破坏无状态性。
- 【L4】分页/过滤/排序惯例用查询参数（`?page=1&sort=createdAt,desc`）；HATEOAS（响应中携带后续操作链接）是 REST 成熟度模型的顶层，实践中很少完整落地。

:::

#### 🔀 发散问题

- **Q：REST 的无状态要求与登录态怎么协调？** → 分布式场景选 JWT，见本文档「Cookie / Session / Token / JWT 如何选型？」。
- **Q：方法语义与幂等性的关系？** → GET/PUT/DELETE 幂等、POST 非幂等，见本文档「GET 请求和 POST 请求的区别？」。

## Servlet

### 【简单】什么是 Servlet？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / Servlet 基础

#### 💎 关键结论

Servlet 是运行在服务器端的 Java 程序，用于生成动态 Web 内容。狭义指 Servlet 接口，广义指任何实现该接口的类。它独立于平台与协议，由容器以"单实例多线程"方式服务请求，这是它战胜 CGI 的根本原因。

#### ⚡记忆卡片

- **口诀**：接口定义、容器托管、单例多线程
- **关键词**：Server Applet ／ Servlet 容器 ／ 独立于平台协议
- **链路**：HTTP 请求 → Servlet 容器（Tomcat）→ Servlet 实例 → 动态响应

#### 📖 核心知识

**Servlet（Server Applet）是 Java 编写的服务器端程序**，用于交互式地浏览和生成数据，生成动态 Web 内容。

- 狭义：Java 实现的一个接口
- 广义：任何实现了 Servlet 接口的类

Servlet 运行于支持 Java 的应用服务器中，独立于平台和协议，主要用于扩展基于 HTTP 协议的 Web 服务器。

**Servlet 与 CGI 的区别**：

| 对比维度     | Servlet                    | CGI                       |
| :----------- | :------------------------- | :------------------------ |
| **执行方式** | 同一实例多线程处理多个请求 | 每个请求创建新进程        |
| **性能**     | 高效，实例复用             | 低效，进程创建/销毁开销大 |
| **生命周期** | 实例常驻，一般不会销毁     | 服务完成后销毁            |

**扩展要点**：

- Servlet 规范现归属 Jakarta EE（Servlet 6.0 对应 Jakarta EE 10），包名已从 `javax.servlet` 迁移为 `jakarta.servlet`。
- Servlet 3.0 起支持异步处理（`AsyncContext`），长耗时请求可移交业务线程，避免占满容器线程池。

#### 🔀 发散问题

- **Q：Servlet 和 JSP 的区别？** → JSP 本质就是 Servlet，编译后转为 Servlet 类；JSP 偏视图，Servlet 偏控制逻辑，见本文档「Servlet 和 JSP 的区别？」。
- **Q：Servlet 实例是每次请求都新建吗？** → 不是。容器默认只创建一个实例，多线程并发调用 `service()`，这也是不能在 Servlet 中存可变请求状态的原因，见本文档「简述 Servlet 生命周期」。

### 【中等】简述 Servlet 生命周期⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / Servlet 生命周期

#### 💎 关键结论

Servlet 生命周期由容器管理，五个阶段：加载 → 初始化（`init()` 仅一次）→ 服务（`service()` 每请求一次）→ 销毁（`destroy()` 仅一次）→ 卸载。核心是"一次初始化、多次服务、一次销毁"，`service()` 被多线程并发调用。

#### ⚡记忆卡片

- **口诀**：加载初始化，服务多次调，销毁只一回
- **关键词**：init ／ service ／ destroy ／ 单实例多线程
- **链路**：加载 → init()（1 次）→ service()（N 次）→ destroy()（1 次）→ 卸载

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/9b3261cc037c45b6978877f41c4f526e.jpg)

| 阶段       | 方法        | 说明                                      |
| :--------- | :---------- | :---------------------------------------- |
| **加载**   | —           | 容器通过类加载器加载 Servlet 类           |
| **初始化** | `init()`    | 仅执行一次，创建后初始化                  |
| **服务**   | `service()` | 每次请求调用，分发到 `doGet()`/`doPost()` |
| **销毁**   | `destroy()` | 容器关闭时调用，释放资源                  |
| **卸载**   | —           | 由 JVM 垃圾回收器回收                     |

- **加载**：容器通过类加载器加载 Servlet 类并创建实例。
- **初始化**：`init()` 仅执行一次，适合放置一次性资源初始化（如读取配置）。
- **服务**：`service()` 是请求处理入口，每次请求调用一次，内部按 HTTP 方法分发到 `doGet()`/`doPost()` 等方法。
- **销毁**：容器关闭或卸载 Servlet 时调用 `destroy()`，仅一次，用于释放资源。
- **卸载**：实例由 JVM 垃圾回收器回收。

注意：`service()` 是多线程并发调用的，因此 Servlet 中不应定义保存请求状态的可变成员变量（线程安全问题）。

#### 🔬 扩展知识

::: details

- 【L3】`init()` 的执行时机可由 `loadOnStartup` 控制：配置后容器启动即初始化（值越小越先），否则首次请求时才初始化。
- 【L3】Servlet 3.0+ 的异步处理（`AsyncContext`）允许长耗时请求离开容器线程，避免线程池耗尽。
- 【L4】Servlet 6.0（Jakarta EE 10）包名为 `jakarta.servlet`，生命周期模型本身未变；虚拟线程让"一请求一线程"模型重新具备高并发能力。

:::

#### 🔀 发散问题

- **Q：`service()` 与 `doGet()`/`doPost()` 是什么关系？** → `service()` 按请求方法分发到对应的 `doXxx()`，自定义方法需重写 `service()`。
- **Q：过滤器在生命周期中的什么位置？** → Filter 在 Servlet 容器层、请求到达 Servlet 之前执行，见本文档「过滤器(Filter)、拦截器(Interceptor)、AOP 的区别？」。

### 【中等】转发(forward)和重定向(redirect)有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / 请求流转

#### 💎 关键结论

转发是服务器内部的一次请求流转，地址栏不变、可共享 request 数据、效率高，但只能跳本应用；重定向是服务器让浏览器重新发起第二次请求，地址栏变化、数据不共享，但可跳任意 URL。登录成功后常用重定向防刷新重复提交。

#### ⚡记忆卡片

- **口诀**：转发一次内部走，重定向两次地址变
- **关键词**：RequestDispatcher ／ sendRedirect ／ 302 ／ request 共享
- **链路**：请求 → 服务器内部转发（1 次）／响应 3xx → 浏览器再请求（2 次）

#### 📖 核心知识

| 对比维度     | 转发（forward）         | 重定向（redirect）     |
| :----------- | :---------------------- | :--------------------- |
| **请求次数** | 一次（服务器内部转发）  | 两次（客户端重新请求） |
| **地址栏**   | 不变                    | 显示新的 URL           |
| **数据共享** | 可共享 request 中的数据 | 不能共享               |
| **效率**     | 高                      | 低                     |
| **范围**     | 仅限同一应用内          | 可跳转到任意 URL       |

**API 用法**：

- 转发：`request.getRequestDispatcher(url).forward(request, response)`
- 重定向：`response.sendRedirect(url)`（本质是返回 302 + `Location` 响应头）

**实践惯例**：POST 提交成功后重定向到结果页（Post-Redirect-Get 模式），防止用户刷新页面导致重复提交；页面内部的视图跳转用转发。注意 `sendRedirect` 之后代码仍会继续执行，应及时 `return`。

#### 🔬 扩展知识

::: details

- 【L3】`RequestDispatcher` 还有 `include()`：将目标资源输出包含进当前响应，与 `forward()`（替换响应输出、要求响应未提交）不同。
- 【L4】301 与 302 的差别在浏览器是否缓存跳转：301 会被浏览器长期缓存；307/308 保证重定向后请求方法不变（302 历史上会把 POST 变为 GET）。

:::

#### 🔀 发散问题

- **Q：重定向对应的状态码是什么？** → 302 临时重定向、301 永久重定向，见本文档「HTTP 常见状态码有哪些？」。
- **Q：转发能共享的数据放在哪个作用域？** → request 作用域，四种作用域见本文档「JSP 的内置对象和作用域？」。

### 【简单】Servlet 中如何获取用户提交的查询参数或表单数据？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：3 min ｜ 🏷 标签：JavaWeb / Servlet API

#### 💎 关键结论

三个 API 覆盖全部场景：`getParameter(name)` 取单个值，`getParameterValues(name)` 取同名多值（如复选框），`getParameterMap()` 取全部参数。注意参数读取前要先处理字符编码。

#### ⚡记忆卡片

- **口诀**：单值 getParameter，多值加 s，全量 Map
- **关键词**：getParameter ／ getParameterValues ／ getParameterMap
- **链路**：请求参数 → request.getParameter\* → 业务处理

#### 📖 核心知识

- `request.getParameter(name)`：获取单个参数值
- `request.getParameterValues(name)`：获取同名参数的所有值（如复选框）
- `request.getParameterMap()`：获取所有参数的 Map

注意：参数由容器自动做 URL 解码；POST 表单的字符编码需在首次读取参数前调用 `request.setCharacterEncoding("UTF-8")`（通常用编码 Filter 统一处理）。

#### 🔀 发散问题

- **Q：这些参数方法属于哪个对象？** → HttpServletRequest，见本文档「Request 和 Response 的常用方法？」。
- **Q：编码 Filter 应该放在链路什么位置？** → 最外层、参数解析之前，见本文档「过滤器(Filter)、拦截器(Interceptor)、AOP 的区别？」。

### 【简单】Request 和 Response 的常用方法？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：3 min ｜ 🏷 标签：JavaWeb / Servlet API

#### 💎 关键结论

request 侧以"读"为主：取参数、属性、请求头、方法、URI、Session、Cookie；response 侧以"写"为主：设内容类型、响应头、状态码、重定向、输出流。分清 parameter（客户端提交的参数）与 attribute（服务端设置的属性）是高频考点。

#### ⚡记忆卡片

- **口诀**：request 读进来，response 写出去；parameter 属客户端，attribute 属服务端
- **关键词**：getParameter ／ getAttribute ／ setHeader ／ sendRedirect
- **链路**：request（参数/头/URI）→ 业务处理 → response（状态码/头/输出流）

#### 📖 核心知识

**HttpServletRequest 常用方法**：

| 方法                 | 说明                     |
| :------------------- | :----------------------- |
| `getParameter(name)` | 获取请求参数             |
| `getAttribute(name)` | 获取请求属性             |
| `getHeader(name)`    | 获取请求头               |
| `getMethod()`        | 获取请求方法（GET/POST） |
| `getRequestURI()`    | 获取请求 URI             |
| `getSession()`       | 获取 Session             |
| `getCookies()`       | 获取 Cookie 数组         |

**HttpServletResponse 常用方法**：

| 方法                     | 说明             |
| :----------------------- | :--------------- |
| `setContentType(type)`   | 设置响应内容类型 |
| `setHeader(name, value)` | 设置响应头       |
| `sendRedirect(url)`      | 重定向           |
| `getWriter()`            | 获取输出流       |
| `setStatus(code)`        | 设置状态码       |

**parameter vs attribute**：`getParameter` 读取客户端提交的请求参数（字符串、来自 URL 或表单）；`getAttribute` 读取服务端在请求处理过程中设置的属性（任意对象，常用于转发时共享数据）。

#### 🔀 发散问题

- **Q：request 里的 Session 是怎么来的？** → `getSession()` 背后是 SessionID 匹配机制，见本文档「Cookie 和 Session 的区别是什么？」。
- **Q：`sendRedirect` 的底层原理？** → 返回 302 + Location 头，见本文档「转发(forward)和重定向(redirect)有什么区别？」。

### 【简单】Servlet 和 JSP 的区别？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / JSP

#### 💎 关键结论

JSP 本质就是 Servlet——JSP 编译后生成 `.java` 再编译为 `.class`。分工上 JSP 侧重视图（View），Servlet 侧重控制逻辑（Controller），这是 MVC 分层的基本常识。

#### ⚡记忆卡片

- **口诀**：JSP 即 Servlet，视图归 JSP，控制归 Servlet
- **关键词**：编译转换 ／ 视图 ／ 控制逻辑
- **链路**：JSP → 翻译成 .java → 编译成 .class → 按 Servlet 运行

#### 📖 核心知识

1. **Servlet** 是运行在服务器上的 Java 类，负责控制程序逻辑
2. **JSP 本质上就是 Servlet**，编译后生成 `.java` → `.class`
3. JSP 侧重于视图（View），Servlet 侧重于控制逻辑（Controller）
4. 在 MVC 架构中：JSP 适合 View，Servlet 适合 Controller

#### 🔀 发散问题

- **Q：什么是 Servlet？** → Servlet 是运行于容器的服务器端程序，JSP 最终也会被转换为 Servlet 运行，见本文档「什么是 Servlet？」。
- **Q：JSP 有哪些内置对象？** → 九大内置对象、四种作用域，见本文档「JSP 的内置对象和作用域？」。

### 【简单】JSP 的内置对象和作用域？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / JSP

#### 💎 关键结论

JSP 有九大内置对象（request/response/session/application/pageContext/out/config/page/exception），无需声明直接使用。四种作用域由小到大：page → request → session → application，决定数据的可见范围与生命周期。

#### ⚡记忆卡片

- **口诀**：九大对象免声明，作用域从小到大 page/request/session/application
- **关键词**：九大内置对象 ／ 四种作用域 ／ pageContext ／ application
- **链路**：page（页面）→ request（一次请求）→ session（一次会话）→ application（整个应用）

#### 📖 核心知识

**九大内置对象**：

| 对象          | 作用                             |
| :------------ | :------------------------------- |
| `request`     | 客户端请求信息                   |
| `response`    | 服务器响应信息                   |
| `session`     | 用户会话状态                     |
| `application` | 全局应用数据（服务器启动到关闭） |
| `pageContext` | 页面属性管理                     |
| `out`         | 向客户端输出数据                 |
| `config`      | Servlet 配置参数                 |
| `page`        | 当前 JSP 页面本身                |
| `exception`   | 异常信息（仅错误页面可用）       |

**四种作用域**（从小到大）：

1. **page**：当前页面
2. **request**：一次请求
3. **session**：一次会话
4. **application**：整个应用生命周期

#### 🔀 发散问题

- **Q：request 作用域的数据如何在转发中共享？** → forward 共享 request 数据，见本文档「转发(forward)和重定向(redirect)有什么区别？」。
- **Q：session 对象背后的机制？** → SessionID + 服务端存储，见本文档「Cookie 和 Session 的区别是什么？」。

### 【简单】JSP 中动态 INCLUDE 和静态 INCLUDE 的区别？⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：JavaWeb / JSP

#### 💎 关键结论

静态 INCLUDE（`<%@ include %>`）是"先合并再编译"——翻译期把源码并入当前页一起编译，不检查包含文件变化、不能传参；动态 INCLUDE（`<jsp:include>`）是"先编译再合并"——运行时调用目标页面输出，会检查文件变化、可传参。

#### ⚡记忆卡片

- **口诀**：静态合并早，动态调用晚；动态能传参，静态不查变
- **关键词**：翻译期合并 ／ 运行时包含 ／ 传参 ／ 变化检查
- **链路**：静态：源码合并 → 一起编译；动态：各自编译 → 运行时合并输出

#### 📖 核心知识

- **静态 INCLUDE**（`<%@ include file="xxx.html" %>`）：先合并再编译，不检查包含文件的变化
- **动态 INCLUDE**（`<jsp:include page="xxx.jsp" />`）：先编译再合并，会检查文件变化，可带参数

| 对比维度     | 静态 INCLUDE             | 动态 INCLUDE                 |
| :----------- | :----------------------- | :--------------------------- |
| **语法**     | `<%@ include file %>`    | `<jsp:include page />`       |
| **合并时机** | 编译前（翻译期合并源码） | 运行时（请求处理期合并输出） |
| **变化检查** | 不检查                   | 检查                         |
| **传参**     | 不支持                   | 支持（`jsp:param`）          |

#### 🔀 发散问题

- **Q：JSP 为什么最终会被编译成 Servlet？** → JSP 本质就是 Servlet，见本文档「Servlet 和 JSP 的区别？」。
- **Q：动态包含的底层机制？** → 与 `RequestDispatcher.include()` 相关，转发的区别见本文档「转发(forward)和重定向(redirect)有什么区别？」。

### 【中等】过滤器(Filter)、拦截器(Interceptor)、AOP 的区别？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：JavaWeb / 请求链路

#### 💎 关键结论

三者都是拦截机制，但分属不同容器、作用于请求链路的不同位置：**Filter 在外层（Servlet 容器）、Interceptor 在中层（Spring MVC）、AOP 在最内层（Bean 方法）**。记忆：Filter 管"请求进来"，Interceptor 管"调用哪个方法"，AOP 管"方法怎么执行"——能在外层解决的不要放内层。

#### ⚡记忆卡片

- **口诀**：Filter 管进门、Interceptor 管找人、AOP 管办事
- **关键词**：Servlet 规范 ／ DispatcherServlet ／ HandlerMethod ／ 切点表达式
- **链路**：Tomcat → Filter 链 → DispatcherServlet → Interceptor → AOP → Controller

#### 📖 核心知识

三者都是"拦截"机制，但**分属不同容器、作用于请求链路的不同位置、切入点粒度不同**。

| 对比维度                 | Filter（过滤器）                       | Interceptor（拦截器）                 | AOP（切面）                       |
| :----------------------- | :------------------------------------- | :------------------------------------ | :-------------------------------- |
| **规范归属**             | Servlet 规范                           | Spring MVC                            | Spring AOP / AspectJ              |
| **容器归属**             | Servlet 容器（如 Tomcat）              | Spring 容器                           | Spring 容器                       |
| **执行位置**             | DispatcherServlet 之前/之后            | DispatcherServlet 内、Controller 前后 | 任意 Bean 方法调用内部            |
| **作用范围**             | 所有请求（含静态资源）                 | 仅到达 Controller 的请求              | 任意 Spring Bean 方法（不限 Web） |
| **切入点粒度**           | URL 模式级（`/*`、`/api/*`）           | URL 模式级 + 可读取目标方法信息       | 方法级（切点表达式、注解）        |
| **能否使用 Spring Bean** | 不能（需 FilterRegistrationBean 注册） | 能                                    | 能                                |
| **典型用途**             | 编码设置、CORS、请求体包装             | 登录检查、权限、日志                  | 事务、方法日志、性能监控          |

**执行顺序（Web 请求链路）**：

```
请求 → Tomcat → Filter 链 → DispatcherServlet → Interceptor preHandle → （AOP 环绕增强） → Controller → AOP → Interceptor postHandle/afterCompletion → Filter → 响应
```

记忆要点：**Filter 在外层、Interceptor 在中层、AOP 在最内层**。Filter 链由 Servlet 容器编排，在 Spring 介入之前执行；Interceptor 由 DispatcherServlet 编排；AOP 在 Controller 方法被代理调用时触发（JDK 动态代理/CGLIB 为目标 Bean 生成代理对象，在方法调用前后织入增强逻辑）。

**方案权衡：认证/权限逻辑放哪一层？**

- **放 Filter**：最早拦截，连未匹配到 Controller 的请求也能处理，适合粗粒度全局控制（如所有 `/api/**` 必须带 Token）；但拿不到目标方法的注解信息。
- **放 Interceptor**：`preHandle` 中能拿到 `HandlerMethod`，可读取 `@RequirePermission` 等注解，细粒度；但拦不到静态资源和未匹配到 Controller 的请求。
- **放 AOP**：最灵活，可自定义注解、读取方法参数做决策；但已进入 Spring 调用链，拦截时机最晚。
- 工程惯例：**统一认证放 Filter（或网关），权限校验放 Interceptor 或 AOP 注解，事务/日志放 AOP**。

```java
// Filter 示例
@WebFilter(urlPatterns = "/*")
public class EncodingFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) {
        req.setCharacterEncoding("UTF-8");
        chain.doFilter(req, resp);
    }
}

// Interceptor 示例
public class LoginInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) {
        if (req.getSession().getAttribute("user") == null) {
            resp.sendRedirect("/login");
            return false;
        }
        return true;
    }
}
```

一句话总结：**Filter 管"请求进来"，Interceptor 管"调用哪个方法"，AOP 管"方法怎么执行"**——按粒度选择，能在外层解决的问题不要放到内层。

#### 🔬 扩展知识

::: details

- 【L3】**Filter 为什么不能直接 @Autowired 注入 Spring Bean？** Filter 由 Servlet 容器创建和初始化，在 Spring Boot 内嵌容器中其启动时机早于 Spring 上下文完全就绪，此时 Bean 尚未注册，直接注入会拿到 null。标准解法是用 `FilterRegistrationBean` 注册（让 Spring 接管 Filter 实例的生命周期），或在 Filter 内部延迟从 ApplicationContext 获取 Bean。
- 【L3】**Controller 抛异常后，postHandle 和 afterCompletion 还会执行吗？** `postHandle` 不会（只在 Controller 正常返回后调用），但 `afterCompletion` 会执行——资源清理必须放 `afterCompletion`；另注意视图渲染发生在 postHandle 与 afterCompletion 之间。
- 【L4】**权限切面用 Spring AOP 还是 AspectJ？** Spring AOP 是运行时代理，零构建侵入，Web 场景足够；AspectJ 是编译期/加载期字节码织入，能拦私有方法和构造器但构建复杂度高。Spring AOP 拦不到私有方法的根因：代理依赖"外部调用经过代理对象"，私有方法对外不可见、无法经由代理入口进入。

:::

#### 🏭 实战场景

::: details 路径白名单失误导致越权漏洞

某系统被安全团队通报越权漏洞：普通用户能调用管理员接口。排查：① 权限逻辑在 Interceptor 里，基于路径白名单放行 `/open/**`；② 新同学新加的一批接口恰好以 `/open` 开头但实际是管理功能，被静默放行，且无任何报错——**基于路径名单的权限控制，一次配置失误就是全面裸奔**。修复：改为白名单思路——默认全部接口需鉴权，只有标注 `@PermitAll` 注解的方法才放行，校验逻辑从 Interceptor 换成绑定注解的 AOP 切面，漏配从"静默放行"变为"默认拒绝"，此后未再出现越权。

:::

::: details 场景题：审计日志要记完整请求体，放哪一层？

**场景**：安全合规要求对所有 POST/PUT 请求记录完整请求体审计日志，但请求体流只能读一次。这个功能应该放在哪一层实现？如何避免影响后续 Controller 的参数解析？

1. **应急处理**：直接在 Filter 里读 InputStream 会导致流被耗尽，Controller 解析参数直接报 400——这是该需求第一版最常见的线上事故。
2. **根因分析**：`ServletRequest` 的输入流是一次性的，要"既记录又让下游继续用"，必须缓存请求体并包装 Request 对象。
3. **长期方案**：放在 **Filter 层**实现（最外层，能覆盖所有 POST/PUT，且早于 Spring 参数解析）：用 `ContentCachingRequestWrapper` 或自定义 `HttpServletRequestWrapper` 先把 body 读入 byte[]，重写 `getInputStream()` 返回可重复读的流，再用包装对象 `chain.doFilter`。为什么不放 Interceptor：Interceptor 执行时参数解析可能已消费完 body，为时已晚。
4. **权衡**：① body 缓存增加内存占用，大请求体接口（文件上传、超过 10MB）应排除在审计之外或只记录摘要，否则有 OOM 风险；② 密码、身份证号等敏感字段必须脱敏后再落日志；③ 审计日志建议异步写入，避免阻塞主链路。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "Interceptor 就是 Filter 的另一种写法" → 二者归属不同容器：Filter 属 Servlet 规范、早于 Spring；Interceptor 在 DispatcherServlet 内部，能拿到 HandlerMethod。
- ❌ "权限校验配好路径白名单就安全了" → 路径名单一次配置失误就是全面裸奔，应默认拒绝、注解放行。
- ❌ "Filter 顺序无所谓" → 多个 Filter 按注册顺序执行，编码 Filter 排在参数解析 Filter 之后会引发乱码。

:::

#### 🔀 发散问题

- **Q：登录检查应该放 Filter 还是 Interceptor？** → 需要读 Session 用 Interceptor 示例更直观；纯 Token 校验放 Filter 或网关，机制见本文档「Cookie 和 Session 的区别是什么？」。
- **Q：AOP 的代理机制细节？** → JDK 动态代理与 CGLIB 的选择属 Spring 范畴，核心结论：接口用 JDK 代理、类用 CGLIB，自调用绕过代理导致增强失效。

## Web 会话

### 【中等】Cookie 和 Session 的区别是什么？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JavaWeb / 会话管理

#### 💎 关键结论

本质区别是"状态由谁保管"：Cookie 把状态放客户端，Session 放服务端。二者常配合使用——Session 依赖 Cookie 传递 SessionID。Cookie 方便但暴露，Session 安全但要解决服务端存储与分布式共享问题。

#### ⚡记忆卡片

- **口诀**：Cookie 存客户端，Session 存服务端，SessionID 靠 Cookie 传
- **关键词**：状态归属 ／ 4KB ／ HttpOnly ／ SessionID ／ 分布式共享
- **链路**：登录 → 服务端建 Session → Set-Cookie 下发 SessionID → 后续请求自动携带 → 服务端按 ID 查状态

#### 📖 核心知识

Cookie 与 Session 是"无状态 HTTP 协议如何维持状态"的两种经典解法：**Cookie 把状态放在客户端，Session 把状态放在服务端**。

| 对比维度     | Cookie                               | Session                              |
| :----------- | :----------------------------------- | :----------------------------------- |
| **存储位置** | 客户端（浏览器）                     | 服务器端                             |
| **安全性**   | 低，用户可见可篡改                   | 高，数据在服务端                     |
| **存储大小** | 单条 4KB，每站最多约 20 个           | 无硬性限制（但占用服务器内存）       |
| **跨域**     | 不支持（受同源策略与 SameSite 限制） | 不支持（依赖 Cookie 传递 SessionID） |
| **生命周期** | 可设置过期时间（Max-Age/Expires）    | 随会话结束或超时销毁（默认 30 分钟） |
| **性能**     | 不占服务器资源                       | 占用服务器内存，并发高时压力大       |

**Session 工作原理**：服务器创建 Session 后生成唯一 SessionID，通过 `Set-Cookie` 响应头传给浏览器；后续请求浏览器自动携带该 Cookie，服务器通过 SessionID 查找对应 Session 数据。

**方案权衡**：

- **Session 存本地内存 vs 存 Redis**：本地内存方案简单，但多实例部署时 Session 无法跨机器共享（用户会被随机登出），高并发时内存吃紧；Redis 集中式 Session（如 Spring Session）支持水平扩展。按每个 Session 约 1~2KB 估算，10 万在线用户约需 100~200MB Redis 内存，完全可承受。
- **纯 Cookie vs Session**：状态极小且不敏感（如主题、语言偏好）时可直接存 Cookie，省去服务端开销；涉及登录态等敏感数据时必须放服务端 Session，Cookie 中只留 SessionID。

一句话总结：**Cookie 与 Session 的本质区别是"状态由谁保管"**——Cookie 方便但暴露在客户端，Session 安全但需要服务端存储并解决分布式问题。

#### 🔬 扩展知识

::: details

- 【L3】**Session 超时为什么默认 30 分钟？** 30 分钟是安全性与体验的经验折中（Tomcat 默认值）。容器采用滑动过期——每次访问重置计时器；若业务要求绝对过期（如"无论是否活跃，8 小时后必须重新登录"），需自行记录创建时间实现。
- 【L3】**SessionID 会被暴力猜解吗？** Tomcat 用 `SecureRandom` 生成至少 128 位随机数（默认 16 字节、32 个十六进制字符），暴力猜解理论上不可行。真实事故多源于随机源配置错误，或 SessionID 经由 URL、日志泄漏。
- 【L4】**浏览器禁用 Cookie 后 Session 还能工作吗？** 可用 URL 重写（`response.encodeURL`）把 SessionID 拼进 URL，但会暴露在地址栏、Referer 与日志中，安全性更差，如今基本淘汰——无 Cookie 场景（App、小程序）应直接改用 Token 方案。
- 【L4】大规模场景可用 Redis Hash 维护 `session:{userId}` 用户 → Session 的反向索引，冻结账号时直接删 key，全局生效延迟可控制在 1 秒内。

:::

#### 🏭 实战场景

::: details K8s 双节点部署导致随机登出

把老系统从单机迁到 2 节点的 K8s 集群，次日大量用户反馈"随机被登出"。排查发现网关日志中同一用户的请求被轮询打到两个 Pod，A 节点有 Session、B 节点没有。根因：Tomcat 默认 Session 存在 JVM 内存中，负载均衡轮询导致请求漂移。修复：引入 Spring Session + Redis 集中存储 Session，超时设为 30 分钟，上线后问题消失。复盘结论：多实例部署下 Session 必须外置，否则扩缩容和滚动发布都会引发同类故障。

:::

::: details 场景题：被冻结账号如何立即全局登出？

**场景**：管理后台系统，安全审计要求"被冻结账号的用户必须立即全局登出"，当前是原生 Tomcat Session（单机、内存存储），如何设计？

1. **应急处理**：单机下可遍历 `SessionManager` 找到目标用户的 Session 并 `invalidate`，但遍历全量 Session 是 O(N) 操作，且该手段在多机部署下完全失效。
2. **根因分析**：内存 Session 没有集中管理面，更缺少"按用户反查 Session"的索引能力，无法定点清除。
3. **长期方案**：迁移到 Spring Session + Redis，以 `session:{userId}` 维护用户 → Session 集合的反向索引；冻结账号时直接删除对应 key，全局生效延迟在 1 秒内。
4. **权衡**：若系统正在改造为无状态 JWT，则需引入黑名单机制（详见本文档「JWT 如何实现刷新与主动失效？」）；Session + Redis 天然支持主动失效，这正是 Session 相对 JWT 的核心优势——**"立即失效"是硬需求时，选型应偏向 Session 或"JWT + 黑名单"**。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "Session 比 Cookie 安全，所以 Session 绝对安全" → Cookie 属性缺失照样失守：缺 **HttpOnly**，XSS 可通过 `document.cookie` 窃取 SessionID（会话劫持）；缺 **SameSite**，跨站请求自动携带 Cookie，给 CSRF 敞开大门；缺 **Secure**，SessionID 在 HTTP 明文链路上被中间人截获；此外还有 **Session 固定攻击**——攻击者预设 SessionID 诱导受害者登录，若登录后服务端不更换 SessionID，攻击者即可冒用身份。
- ❌ "禁用 Cookie 后 Session 完全不能工作" → 可用 URL 重写传递 SessionID，但安全性更差，基本被淘汰。

:::

#### 🔀 发散问题

- **Q：Cookie 里的登录态如何选型？** → 单体选 Session，分布式选 JWT，见本文档「Cookie / Session / Token / JWT 如何选型？」。
- **Q：SessionID 被盗与 CSRF 利用 Cookie 有什么关系？** → SameSite 属性是两者共同的防线，见本文档「什么是 CSRF 攻击？如何防御？」。

### 【中等】如果禁用了 Cookie 怎么办？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：分布式协同 / 会话跟踪

#### 💎 关键结论

禁用 Cookie 后问题本质是"sessionId/身份凭证没地方放了"。两条路：每次请求显式携带 SessionID 参数（URL 拼接或 POST 提交），或者干脆改用 Token 机制——服务端签发字符串令牌，客户端每次请求带上，App 与前后端分离场景的主流选择。

#### ⚡记忆卡片

- **口诀**：Cookie 没了就显式带，参数 SessionID 或 Token 顶上
- **关键词**：SessionID 参数 ／ URL 重写 ／ Token ／ 令牌
- **链路**：Cookie 被禁用 → sessionId 无法自动携带 → 请求参数显式携带 SessionID → 或改用 Token 机制由客户端主动携带 → 会话跟踪恢复

#### 📖 核心知识

既然服务端是根据 Cookie 中的信息判断用户是否登录，那么如果浏览器中禁止了 Cookie，如何保障整个机制的正常运转：

- 第一种方案，每次请求中都携带一个 SessionID 的参数，也可以 POST 的方式提交，也可以在请求的地址后面拼接 `xxx?SessionID=123456...`。
- 第二种方案，Token 机制。Token 机制多用于 App 客户端和服务器交互的模式，也可以用于 Web 端做用户状态管理。

Token 的意思是"令牌"，是服务端生成的一串字符串，作为客户端进行请求的一个标识。Token 机制和 Cookie 和 Session 的使用机制比较类似。

当用户第一次登录后，服务器根据提交的用户信息生成一个 Token，响应时将 Token 返回给客户端，以后客户端只需带上这个 Token 前来请求数据即可，无需再次登录验证。

#### 🔬 扩展知识

::: details

【L3】URL 携带 SessionID 的历史方案叫"URL 重写"（如 Tomcat 的 `;jsessionid=`），它的问题是 sessionId 会出现在浏览器历史、Referer 头和服务端日志中，泄露风险高，现代应用基本弃用，转而使用 Header 携带 Token（`Authorization: Bearer xxx`）。

【L4】Token 机制与 Session 的本质差异在"状态存哪"：Session 是有状态（服务端存会话），Token 可做成无状态（如 JWT，服务端只验签不存储）。无状态带来水平扩展的便利，也带来"无法主动失效"的新问题，详见本文档『JWT Token 如何续签？如何解决无法主动失效的问题？』。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "禁用 Cookie 后登录功能直接不可用" → 会话凭证只是换传递通道（参数 / Header），认证机制本身不受影响。
- ❌ "Token 和 Session 是竞争关系，选一个就行" → Token 是凭证的载体形式，Session 是状态的存储方式，两者维度不同；"Token + 服务端存储"本质上就是 Session 的变体。

:::

#### 🔀 发散问题

**Token 放 URL、Body 还是 Header 更安全？**
Header 最安全：不进浏览器历史、不被 Referer 泄露、日志中通常脱敏；URL 参数泄露面最大，一般只在兼容老接口时使用。

**Token 机制的主流标准是什么？**
JWT（JSON Web Token，RFC 7519），详见本文档『什么是 JWT？JWT 的原理和结构是什么？』。

### 【中等】分布式 Session 有哪些实现方案？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：分布式协同 / 分布式 Session

#### 💎 关键结论

分布式下单机 Session 失效，三种解法：粘性 Session（LB 把同一用户固定到一台机器，简单但宕机丢全部）、Session 复制（节点间互相同步，无死角但内存和带宽开销大）、集中存储（Session 放 Redis/DB，主流方案，推荐 Spring Session + Redis）。

#### ⚡记忆卡片

- **口诀**：粘性绑机器、复制全同步、集中存 Redis
- **关键词**：粘性 Session ／ Session 复制 ／ 缓存共享 ／ Spring Session
- **链路**：负载均衡转发请求到其他节点 → 本机无 Session → 粘性路由绑定节点（宕机丢 Session） → 或节点间复制（开销大） → 或集中存 Redis（推荐）

#### 📖 核心知识

在分布式场景下，一个用户的 Session 如果只存储在一个服务器上，那么当负载均衡器把用户的下一个请求转发到另一个服务器上，该服务器没有用户的 Session，就可能导致用户需要重新进行登录等操作。

分布式 Session 的几种实现策略：

1. 粘性 Session
2. 应用服务器间的 Session 复制共享
3. 基于缓存的 Session 共享 ✔️（推荐）

**粘性 Session**

粘性 Session（Sticky Sessions）**需要配置负载均衡器，使得一个用户的所有请求都路由到一个服务器节点上**，这样就可以把用户的 Session 存放在该服务器节点中。

缺点：**当服务器节点宕机时，将丢失该服务器节点上的所有 Session**。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/MultiNode-StickySessions.jpg)

**Session 复制**

Session 复制共享（Session Replication）**在服务器节点之间进行 Session 同步操作**，这样的话用户可以访问任何一个服务器节点。

缺点：**占用过多内存**；**同步过程占用网络带宽以及服务器处理器时间**。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/MultiNode-SessionReplication.jpg)

**Session 共享（基于缓存）**

**使用一个单独的存储服务器存储 Session 数据**，可以存在 MySQL 数据库上，也可以存在 Redis 或者 Memcached 这种内存型数据库。

缺点：需要去实现存取 Session 的代码。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/design/architecture/MultiNode-SpringSession.jpg)

#### 🔬 扩展知识

::: details

【L3】Spring Session 是缓存共享方案的工程标配：它通过 Servlet Filter 拦截请求，把 HttpSession 透明地重定向到 Redis（JDBC、Hazelcast 也可），业务代码继续用原生 Session API，几乎零侵入。配合 Redis 的过期机制，Session 超时管理也一并交给存储层。

【L4】粘性 Session 在云原生环境基本绝迹：K8s 滚动发布时 Pod 频繁销毁重建，"绑定节点"的前提不存在；Session 复制则受限于节点数（N 个节点的全量同步是 O(N²) 通信），一般超过 4~5 个节点就不适用。这两个方案更多是面试中"为什么演进到集中存储"的论证素材。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "粘性 Session 最简单，先用它顶着" → 节点宕机即丢该节点全部用户的登录态，发布 / 扩缩容同样会触发，生产中故障面太大。
- ❌ "Session 复制到所有节点，就绝对不丢了" → 同步是异步广播，切换瞬间仍可能读到旧状态；且节点越多同步开销越大，规模化后不可行。

:::

#### 🔀 发散问题

**为什么不直接用 JWT 替代分布式 Session？**
可以，JWT 无状态天然免去共享存储；但换来"无法主动失效、续签复杂"的问题，选型需权衡，详见本文档『Session 和 JWT 如何选型？』。

**Redis 存 Session 挂了怎么办？**
Redis 用主从 + 哨兵 / 集群保证可用性；极端情况下 Session 集中存储是单点依赖，可接受"短暂全量重新登录"的代价，远比粘性方案逐节点丢 Session 可控。

### 【中等】什么是 JWT？JWT 的原理和结构是什么？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：分布式协同 / JWT

#### 💎 关键结论

JWT 是"自包含的签名凭证"：Header.Payload.Signature 三段 Base64 用点拼接，服务端不存会话，拿到 Token 用密钥验签即可确认身份。好处是无状态易扩展，代价是 Payload 不加密（别放敏感信息）且无法主动失效。

#### ⚡记忆卡片

- **口诀**：三段式、验签不查库、载荷不加密
- **关键词**：Header ／ Payload ／ Signature ／ RFC 7519 ／ 无状态认证
- **链路**：登录成功签发 JWT → 客户端每次请求携带 → 服务端用密钥验签 + 校验过期 → 无需查询存储即确认身份 → 水平扩展无障碍

#### 📖 核心知识

**JWT（JSON Web Token）** 是一种开放标准（RFC 7519），用于在各方之间安全地传输信息。JWT 通常用于**无状态认证**：服务端不存储会话，每次请求由客户端携带 Token，服务端验证签名即可。

**JWT 的结构**：

JWT 由三部分组成，用 `.` 分隔：`Header.Payload.Signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

| 部分          | 内容                                                         | 说明                               |
| ------------- | ------------------------------------------------------------ | ---------------------------------- |
| **Header**    | `{"alg": "HS256", "typ": "JWT"}`                             | 算法类型和 Token 类型              |
| **Payload**   | `{"sub": "123", "name": "John", "iat": 1516239022}`          | 声明（Claims），包括标准、私有声明 |
| **Signature** | `HMACSHA256(base64(header) + "." + base64(payload), secret)` | 签名，用于验证完整性               |

::: warning JWT 的安全注意事项

- **不要在 Payload 中存放敏感信息**：Payload 只是 Base64 编码，并非加密，任何人可解码。
- **签名密钥要保密**：密钥泄露后，任何人都能伪造合法 Token。
- **使用 HTTPS 传输**：防止 Token 在传输过程中被窃取。
- **设置合理的过期时间**：Token 过期时间不宜过长，降低泄露风险。

:::

**JWT vs Session 对比**：

| 维度         | Session                        | JWT                               |
| ------------ | ------------------------------ | --------------------------------- |
| **状态**     | 有状态（服务端存储）           | 无状态（服务端不存储）            |
| **扩展性**   | 需共享存储（如 Redis）         | 天然支持水平扩展                  |
| **失效控制** | 服务端可随时使 Session 失效    | 难以主动失效（需黑名单机制）      |
| **存储位置** | 服务端                         | 客户端                            |
| **大小**     | SessionID 较小                 | JWT 较大（含 Payload）            |
| **续签**     | 自动续期（访问即刷新过期时间） | 需额外机制（双 Token / 滑动过期） |
| **适用场景** | 传统 Web 应用                  | 前后端分离、移动端、微服务        |

#### 🔬 扩展知识

::: details

【L3】验签的安全细节：服务端必须显式指定期望算法再验签，不能信任 Header 中的 `alg` 字段——历史上著名的 `alg: none` 攻击就是利用库默认信任 Header，把签名算法改成 none 绕过验签；此外 HS256（对称）与 RS256（非对称）混用的"密钥混淆攻击"也源于同类信任问题。

【L4】Payload 的标准声明（Claims）值得记几个：`sub`（主体）、`iat`（签发时间）、`exp`（过期时间）、`iss`（签发者）、`aud`（受众）。多服务网关场景下，`iss`/`aud` 校验能防止"A 服务签发的 Token 被拿去调 B 服务"的横向滥用。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "JWT 是加密的，Payload 放密码、手机号没关系" → Payload 只是 Base64 编码，复制出来在线就能解码；JWT 保证的是完整性（防篡改），不是机密性。
- ❌ "签名能防止 Token 被伪造，所以密钥写在前端代码里也行" → 密钥只能在服务端；HS256 的密钥一旦泄露（如打进前端包），任何人可伪造合法 Token。

:::

#### 🔀 发散问题

**JWT 被窃取了怎么办？**
无法单方面废止已签发的 Token，只能靠短过期时间控制损失面，或引入黑名单 / 版本号机制，详见本文档『JWT Token 如何续签？如何解决无法主动失效的问题？』。

**JWT 和 OAuth 2.0 是什么关系？**
OAuth 2.0 是授权框架，其颁发的 Access Token 可以用 JWT 格式承载（也可以是不透明字符串）；二者是"协议"与"令牌格式"的关系，不是同一层概念。

### 【中等】JWT Token 如何续签？如何解决无法主动失效的问题？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：分布式协同 / JWT 续签与失效

#### 💎 关键结论

JWT 无状态的代价是"签发即生效到过期"。续签主流用双 Token：短期 Access 走业务、长期 Refresh 走换发，Refresh 存服务端可随时作废。主动失效靠黑名单（Redis 记已登出 Token，TTL 设为剩余有效期）或用户维度版本号，本质是"用少量状态换回控制权"。

#### ⚡记忆卡片

- **口诀**：Access 短命跑业务，Refresh 长命换新衣，黑名单管失效
- **关键词**：双 Token ／ Access Token ／ Refresh Token ／ 黑名单 ／ 版本号
- **链路**：JWT 签发后无法主动失效 → 短 Access 控制暴露面 → 过期用 Refresh 换新 → Refresh 存服务端可主动删除 → 登出时 Access 进黑名单按剩余 TTL 过期

#### 📖 核心知识

JWT 是无状态的，Token 一旦签发，在过期前始终有效，服务端无法单方面使其失效。这是 JWT 的固有局限性，需要额外机制解决。

**Token 续签方案**：

| 方案                             | 原理                                                                          | 优缺点                                         |
| -------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| **双 Token（Access + Refresh）** | 短期 Access Token + 长期 Refresh Token，Access 过期后用 Refresh 换新的 Access | 主流方案；Refresh Token 需存储，可主动失效     |
| **滑动过期**                     | 每次请求都检查 Token 剩余有效期，若不足阈值则签发新 Token                     | 简单；但每次请求可能返回新 Token，客户端需处理 |
| **Token 黑名单**                 | 将失效的 Token 加入 Redis 黑名单，校验时检查                                  | 可主动失效；但引入了状态，失去无状态优势       |
| **Token 版本号**                 | 用户维度维护 Token 版本号，签发时写入 Token，校验时比对                       | 修改密码时版本号 +1，旧 Token 失效             |

**双 Token 方案流程（推荐）**：

1. 用户登录，服务端签发 **Access Token**（短期，如 30 分钟）和 **Refresh Token**（长期，如 7 天）。
2. 客户端存储两个 Token，请求时携带 Access Token。
3. Access Token 过期后，客户端用 Refresh Token 请求 `/refresh` 接口。
4. 服务端验证 Refresh Token 有效性，签发新的 Access Token（可选：同时刷新 Refresh Token）。
5. Refresh Token 过期后，用户需重新登录。

**JWT 主动失效方案（Token 黑名单）**：

```java
// 退出登录时，将 Token 加入黑名单
public void logout(String token) {
    Claims claims = JwtUtil.parseToken(token);
    long expiration = claims.getExpiration().getTime() - System.currentTimeMillis();
    // 黑名单 TTL = Token 剩余有效时间，过期后自动清理
    redisTemplate.opsForValue().set("jwt:blacklist:" + token, "1", expiration, TimeUnit.MILLISECONDS);
}

// 校验时检查黑名单
public boolean isValid(String token) {
    if (redisTemplate.hasKey("jwt:blacklist:" + token)) {
        return false; // Token 已被主动失效
    }
    return !JwtUtil.isExpired(token);
}
```

#### 🔬 扩展知识

::: details

【L3】Refresh Token 应存储在服务端（如 Redis），原因：

1. **可主动失效**：用户登出或修改密码时，删除 Refresh Token，强制重新登录。
2. **单设备登录**：每个 Refresh Token 绑定设备，实现单端登录控制。
3. **旋转机制**：每次刷新时生成新的 Refresh Token 并废弃旧的，防止 Refresh Token 被盗用。

【L4】黑名单方案的存储成本可以控制：只存 Token 的哈希 + 剩余 TTL（如代码所示），而非全量 Token；由于 TTL 与 Token 过期时间对齐，黑名单条目会自动清理，Redis 内存占用上界 ≈ "单位时间内登出用户数 × 平均剩余有效期"。这就是"黑名单没有想象中昂贵"的原因。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "把 Access Token 有效期设长一点，就不用续签了" → 有效期越长泄露损失面越大；正确方向是缩短 Access 有效期 + 完善续签链路。
- ❌ "用了黑名单，JWT 就等于 Session 了，不如直接用 Session" → 黑名单只覆盖"提前失效"这一个诉求，条目有 TTL 自动过期，远轻于全量 Session 存储；JWT 无状态扩展的主优势仍在。
- ❌ "Refresh Token 和 Access Token 一样放前端 localStorage 就行" → Refresh Token 生命周期长、权限大，应使用更安全的存储（HttpOnly Cookie + CSRF 防护），并配合旋转机制限制被盗后的可用窗口。

:::

#### 🔀 发散问题

**修改密码后如何让所有旧 Token 立即失效？**
用 Token 版本号方案：用户维度维护版本号，签发时写入，校验时比对；改密时版本号 +1，所有旧版本 Token 集体失效，比逐个拉黑高效。

**双 Token 的时长怎么定？**
常见配置：Access 15~~30 分钟（覆盖一次连续操作），Refresh 7~~30 天（覆盖免登录周期）；金融类应用会进一步缩短并叠加设备绑定。

### 【困难】Cookie / Session / Token / JWT 如何选型？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：JavaWeb / 认证选型

#### 💎 关键结论

一句话原则：**单体求稳选 Session，分布式求扩展选 JWT，开放场景走标准协议**。JWT 自包含、本地验签、无服务端状态，但无法主动失效；Session 可即时踢人冻结，但需集中存储。选型看三件事：要不要立即失效、是否跨端、是否对外开放。

#### ⚡记忆卡片

- **口诀**：单体 Session 稳，分布式 JWT 快，开放平台 OAuth2
- **关键词**：状态归属 ／ 主动失效 ／ 本地验签 ／ RS256 ／ 黑名单
- **链路**：业务形态 → 是否要立即失效 → 是否跨端/开放 → Session / JWT / OAuth2

#### 📖 核心知识

本题承接上一题的机制对比，聚焦**不同业务形态下的选型决策**。

**四种方案速览**：

| 方案                  | 服务端开销       | 跨域   | 防篡改     | 主动失效能力    |
| :-------------------- | :--------------- | :----- | :--------- | :-------------- |
| **Cookie**            | 低               | 不支持 | 弱         | 天然支持        |
| **Session**           | 高（内存/Redis） | 不支持 | 强         | 天然支持        |
| **Token（自建签名）** | 低（无状态）     | 支持   | 需签名验证 | 需黑名单        |
| **JWT**               | 低（自包含）     | 支持   | 签名防篡改 | 需黑名单/版本号 |

**选型决策树**：

| 业务形态                   | 推荐方案                                | 理由                                                  |
| :------------------------- | :-------------------------------------- | :---------------------------------------------------- |
| **传统单体（服务端渲染）** | Session + Cookie（HttpOnly + SameSite） | 简单成熟，天然支持踢人、登出、冻结                    |
| **前后端分离单体**         | Session + Redis 或 JWT 均可             | 后台管理类系统对"立即失效"要求高时优先 Session        |
| **分布式/微服务集群**      | JWT（或集中式 Session）                 | 网关统一验签、各服务无状态，避免 Session 中心成为单点 |
| **跨端（App/小程序/IoT）** | JWT                                     | 不依赖 Cookie，各端统一走 Authorization 头            |
| **开放平台/跨公司 SSO**    | OAuth 2.0 + JWT（OIDC）                 | 标准协议，RS256 非对称签名可让第三方离线验签          |

**Session+Redis vs JWT（分布式下的核心权衡）**：

- **Session+Redis**：支持主动失效，权限变更实时生效；但每次请求都要查一次 Redis（约增加 0.5~1ms），且 Redis 成为可用性依赖——Redis 故障即全站无法鉴权。
- **JWT**：纯本地验签、零远程调用，性能最好；但**无法主动吊销**（根因：Token 自包含、服务端不存状态，验签不依赖任何可追溯的记录），且 Payload 只是 Base64 编码而非加密，绝不能放敏感信息。
- **折中方案**：短有效期 JWT（15 分钟）+ 黑名单只记录少量已注销 Token，兼顾性能与可控性。

**JWT（JSON Web Token）结构**：`Header.Payload.Signature`

- **Header**：算法类型（如 HS256）与 `kid`
- **Payload**：声明数据（用户 ID、过期时间 `exp`、唯一标识 `jti` 等）
- **Signature**：`HMACSHA256(base64(header) + "." + base64(payload), secret)`

**优缺点**：

- **优点**：无状态、跨域友好、自包含（减少查库）、适合微服务
- **缺点**：无法主动失效（除非引入黑名单机制）、Payload 明文（Base64 编码，非加密）、Token 体积较大

**量化经验值**：

- JWT 体积：典型 3~5 个声明约 300~500 字节，是 SessionID Cookie（约 50 字节）的 6~10 倍，高 QPS 下带宽开销不可忽略。
- 验签性能：HS256 为微秒级；RS256 验签约 0.05ms/次、签名更慢，故 RS256 只应在认证中心签名，资源服务器只做验签。
- 单机 1 万 QPS 场景：HS256 验签 CPU 占比可忽略；RS256 需压测评估，必要时换 ECDSA。

一句话总结：**没有最好的方案，只有最匹配的场景**——要强控状态选 Session，要水平扩展选 JWT，要对外开放走 OAuth 2.0 标准协议。

#### 🔬 扩展知识

::: details

- 【L3】**JWT 为什么无法主动失效？** 验签只依赖签名和时间，不查询服务端状态。加黑名单确实引入了状态，但开销本质不同：黑名单只存少量"被注销 Token"的 `jti` 与剩余有效期，而 Session 要存所有在线用户的全量数据，属于"小状态"折中而非倒退。
- 【L3】**HS256 与 RS256 怎么选？** HS256 是对称算法，签名与验签共享同一密钥，只适合单一系统自签自验；RS256 是非对称算法，私钥签名、公钥验签，公钥可分发给任意资源服务器——微服务和开放平台必须用 RS256，否则密钥分发到任何一个下游都意味着全线沦陷。
- 【L4】**Token 为什么不存 localStorage？** localStorage 可被任何 JS 读取，一旦存在 XSS 漏洞 Token 即被窃取；HttpOnly Cookie 天然免疫 JS 读取。业界主流：Access Token 放内存（JS 变量），Refresh Token 放 HttpOnly Cookie，并配合 SameSite 防 CSRF。
- 【L4】多机时钟不同步会导致 `exp` 校验误判，验签需容忍 `leeway`（一般 30~60 秒）。

> 📚 延伸阅读：[JWT.io](https://jwt.io/)

:::

#### 🏭 实战场景

::: details HS256 密钥泄漏导致全平台连环 401

开放接口最初为追求"服务端零状态"，全量采用 HS256 签名的 JWT。一次某合作方密钥泄漏需要紧急停用其凭证，却发现整条链路没有任何失效手段，只好紧急更换全局签名密钥——**导致所有合作方 Token 同时失效**，全平台 401 连环报警，连夜通知各家重新换 Token。复盘结论：① 改用 RS256，换密钥只影响签发方（私钥），验签方公钥可平滑过渡；② 增加 `kid`（密钥 ID）支持多密钥并存切换；③ 预留黑名单通道应对紧急吊销。

:::

::: details 场景题：三套系统统一登录如何选型？

**场景**：公司有三套系统——内部 OA（单体，要求即时冻结账号）、电商 App（前后端分离、多端）、开放平台（对外授权数据给第三方）。领导要求"统一登录体系"，作为架构师如何选型？

1. **现状分析**：三套系统各自维护登录，重复建设、安全水位参差，且无法做到"一处冻结、处处生效"。
2. **根因分析**：问题本质是单一认证协议无法同时满足"强管控、跨端、开放"三种诉求，必须把身份层与凭证层解耦。
3. **长期方案**：建设统一认证中心（SSO），对外签发 JWT（RS256 + OIDC）：
   - 开放平台：标准 JWT，第三方用公钥离线验签；
   - 电商 App：双 Token（Access 15 分钟 / Refresh 7 天）+ 设备标识；
   - 内部 OA 的"即时冻结"：在 JWT 中携带用户状态版本号，网关高频（缓存 TTL 1~5 秒）校验 Redis 中的最新版本，冻结可在 5 秒内全局生效。
4. **权衡**：全集中式 Session 也能覆盖前两个场景，但每个服务都要查 Redis，且开放平台的跨公司场景天然走不通；"无状态 JWT + 最小化状态（版本号/黑名单）"的混合架构是统一认证中心的最优解，也是可支撑百万级日活的成熟实践。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "JWT 可以随时作废，和 Session 一样能踢人" → JWT 签发后在有效期内始终合法，只能靠黑名单/版本号补偿，存在最长一个有效期窗口的风险。
- ❌ "JWT Payload 是加密的，可以放手机号、身份证号" → Payload 只是 Base64 编码，解码即明文，敏感信息绝不能放。
- ❌ "Session 未集中化也能多实例部署" → 多实例下请求漂移会导致随机登出，Session 必须外置（如 Spring Session + Redis）。
- ❌ "需要即时冻结账号的系统也可以选 JWT" → 账号停用后旧 Token 仍可使用至过期，此类系统应偏向 Session 或"JWT + 黑名单"。

:::

#### 🔀 发散问题

- **Q：JWT 如何做刷新与主动失效？** → 双 Token 轮换 + 黑名单/版本号，见本文档「JWT 如何实现刷新与主动失效？」。
- **Q：对外开放授权走什么协议？** → OAuth 2.0 授权码模式 + PKCE，见本文档「OAuth 2.0 有哪些授权模式？授权码模式流程是怎样的？」。
- **Q：Cookie 和 Session 的机制差异？** → 状态由谁保管，见本文档「Cookie 和 Session 的区别是什么？」。

### 【中等】JWT 如何实现刷新与主动失效？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：JavaWeb / JWT

#### 💎 关键结论

JWT 无状态，服务端不能直接让它失效。刷新靠双 Token：短效 Access Token + 长效 Refresh Token，且 Refresh Token 必须轮换。主动失效靠服务端状态补偿：黑名单（精确到单个 Token）或版本号（一刀切作废该用户全部 Token）。

#### ⚡记忆卡片

- **口诀**：短访问、长刷新、一次轮换；登出拉黑、改密升版
- **关键词**：Access/Refresh ／ Rotation ／ jti 黑名单 ／ 版本号
- **链路**：登录签发双 Token → Access 过期 → Refresh 换新并轮换 → 登出/改密 → 黑名单/版本号生效

#### 📖 核心知识

JWT 是无状态的，服务端无法直接让它失效，刷新与失效机制主要依靠以下方案。

**双 Token 机制（主流刷新方案）**

- 登录时同时签发短有效期的 **Access Token**（如 15~30 分钟）和长有效期的 **Refresh Token**（如 7 天）。
- Access Token 过期后，前端用 Refresh Token 调用刷新接口换取新的 Access Token；Refresh Token 过期则要求重新登录。
- Refresh Token 应**轮换（Rotation）**使用：每次刷新后签发新的 Refresh Token 并使旧的作废，防止被盗用后重放。

**主动失效方案**

- **黑名单机制**：退出登录或修改密码时，将 JWT 的 `jti`（唯一标识）写入 Redis 黑名单（过期时间设为 JWT 剩余有效期），鉴权时校验黑名单。
- **版本号机制**：服务端为用户维护 Token 版本号，退出或改密时版本号自增，校验时拒绝版本落后的 Token。

**方案权衡**：

- **滑动过期（Session 思路）vs 双 Token**：滑动过期每次请求续期、实现简单，但每个 Token 都需服务端存状态，本质退化回 Session；双 Token 中 Access Token 纯无状态验签，只有 Refresh Token 涉及服务端状态（存轮换记录），且交互频率低（约每 15 分钟一次），是主流选择。
- **黑名单 vs 版本号**：黑名单粒度细（精确到单个 Token），适合"只登出当前设备"，Redis 开销可控——每日 1 万次登出、每条 `jti` 约 60 字节，仅占约 600KB；版本号粒度粗（一次作废该用户全部 Token），适合改密码、冻结账号等一刀切场景，只需存一个整数，开销更小。

**工程细节**

- 前端通常在响应拦截器中统一处理刷新：第一个 401 发起刷新并缓存该 Promise，后续 401 直接 await 同一个 Promise，刷新成功后统一重放队列中的请求；注意刷新请求自身不能再被拦截器处理，否则死循环。
- Refresh Token 建议放 HttpOnly Cookie 防 XSS 窃取，Access Token 可放内存。
- 刷新接口本身需限流（如每用户每分钟最多 10 次），防止被滥刷。

**量化经验值**：Access Token 15 分钟 / Refresh Token 7 天是业界默认值；高安全场景（支付）可收紧到 5 分钟 / 24 小时；低敏感场景（内容社区）可放宽到 30 分钟 / 30 天以降低重新登录频率。

一句话总结：JWT 刷新的本质是"短效访问 + 长效刷新 + 一次性轮换"，主动失效必须借助服务端状态（黑名单/版本号）弥补无状态缺陷。

#### 🔬 扩展知识

::: details

- 【L3】**轮换机制下收到已作废的旧 Refresh Token，是用户重放还是攻击？** 严格做法（OAuth 2.0 安全建议）：一旦检测到已作废的 Refresh Token 被复用，立即作废该用户整条刷新链并强制重新登录——宁可误伤合法用户也要保安全。宽松做法：给旧 Token 设 10~30 秒宽限期容忍网络延迟，适合低风险业务。
- 【L4】**黑名单 Redis 宕机怎么降级？** 两派选择：① 可用性优先——跳过黑名单校验但记录告警，依赖 Access Token 短有效期（15 分钟）兜底；② 安全优先——直接拒绝鉴权，适合支付级系统。这必须是事先想清楚的显式选择，而不是意外行为。
- 【L4】并发刷新竞态：多个前端请求同时发现过期并发起刷新，轮换机制下合法用户的第二个刷新请求会因旧 Refresh Token 已作废而被误判为攻击——需要前端串行化刷新或服务端宽限期配合。

:::

#### 🏭 实战场景

::: details "登出不等于失效"导致的退款盗用

支付系统收到用户投诉："我昨天明明退出登录了，今天账上却出现 3 笔我没操作的退款"。排查：① 访问日志显示请求来自异地 IP，但 Token 完全合法；② 时间线显示用户在公共电脑上 18:00 退出登录，退出只是前端清了本地存储，并未调用服务端登出接口，而 Access Token 要到 18:20 才过期；③ 公共电脑上的恶意程序早已通过 XSS 拿到了 Token。根因：**登出不等于失效**——无状态 JWT 不会因为客户端删除而作废，剩余 20 分钟有效期成了盗用窗口。修复：① 登出接口必须把当前 Token 的 `jti` 写入 Redis 黑名单；② Access Token 有效期从 20 分钟缩短到 10 分钟；③ 敏感操作增加"签发时间超过 5 分钟需二次验证"的校验。修复后同类事故不再发生。

:::

::: details 场景题：无状态 JWT 如何做多设备登录互踢？

**场景**：App 要求支持"多设备登录互踢"（同一账号只允许一台设备在线，新登录踢掉旧设备），现有无状态 JWT 方案没有设备概念，如何改造？

1. **应急处理**：纯无状态方案无法实现互踢。先与产品明确需求边界——是"立即踢下线"还是"下次请求时失效"？后者无需长连接，成本低得多，通常可接受。
2. **根因分析**：互踢要求服务端知道"用户当前有哪些设备在线、哪台是最新的"，无状态 JWT 不携带这些信息，必须引入设备维度的服务端状态。
3. **长期方案**：
   - JWT 中增加 `device_id` 声明（设备指纹）；
   - Redis 维护 Hash：`user:{uid}:device` → 最新 Refresh Token 的 `jti`；
   - 新登录时覆盖该记录；旧设备刷新或鉴权时，发现自身 Token 的 `jti` 与 Redis 最新记录不一致即返回 401，自然被踢下线；
   - 若要求立即下线，配合推送（APNs/FCM）或 WebSocket 通知旧设备退出。
4. **权衡**：每次鉴权多一次 Redis 读取（约 0.5~1ms），可接受，这是视频会员类业务的标准做法；若进一步要求"登录设备管理列表"，则需完整存储设备 Session，本质上回到 Session 模式——是否值得取决于产品诉求，不要过度设计。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "前端清除本地 Token 就算登出了" → 无状态 JWT 不会因客户端删除而作废，登出必须把 `jti` 写入服务端黑名单。
- ❌ "Access Token 有效期拉长到 1 天可以减少刷新频率" → 黑名单只影响后续请求，已泄漏 Token 的盗用窗口等于剩余有效期，不能为省刷新而放大风险窗口。
- ❌ "Refresh Token 放 localStorage 方便前端管理" → Refresh Token 泄漏意味着攻击者可静默持续刷新获得长期访问权，必须放 HttpOnly Cookie，绝不进 localStorage。

:::

#### 🔀 发散问题

- **Q：为什么不干脆全用 Session？** → 分布式与跨端场景 Session 受限，选型见本文档「Cookie / Session / Token / JWT 如何选型？」。
- **Q：Refresh Token 被盗与 XSS 是什么关系？** → XSS 是 Token 泄漏的主要通道，防御见本文档「什么是 XSS 攻击？如何防御？」。

## Web 安全

### 【中等】什么是 XSS 攻击？如何防御？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Web 安全 / XSS

#### 💎 关键结论

XSS 是攻击者向页面注入恶意脚本，在用户浏览器中执行，窃取 Cookie、劫持会话或操作用户数据。防御核心是"永远不要信任用户输入"：输出编码是第一防线，HttpOnly 保护敏感 Cookie，CSP 兜底。

#### ⚡记忆卡片

- **口诀**：输入过滤、输出转义、HttpOnly、CSP 兜底
- **关键词**：反射型 ／ 存储型 ／ DOM 型 ／ 输出编码
- **链路**：恶意输入 → 注入页面脚本 → 浏览器执行 → 窃取 Cookie/会话 → 输出编码阻断

#### 📖 核心知识

**XSS（Cross-Site Scripting，跨站脚本攻击）**：攻击者向 Web 页面注入恶意脚本，当用户浏览页面时脚本执行，窃取用户信息或执行恶意操作。

| 类型           | 注入方式     | 存储位置         | 危害程度 |
| :------------- | :----------- | :--------------- | :------- |
| **反射型 XSS** | URL 参数     | 不存储，即时触发 | 中       |
| **存储型 XSS** | 表单提交     | 数据库           | 高       |
| **DOM 型 XSS** | 前端 JS 操作 | 不经过服务器     | 中       |

**防御措施**：

- **输入过滤**：对用户输入进行严格的白名单校验
- **输出编码**：HTML 实体转义（`<` → `&lt;`）、JavaScript 编码
- **HttpOnly Cookie**：禁止 JS 读取敏感 Cookie
- **CSP（Content Security Policy）**：限制页面可执行的脚本来源

#### 🔬 扩展知识

::: details

- 【L3】输出编码要分上下文：HTML 正文、HTML 属性、JavaScript 字符串、URL 参数的转义规则各不相同，现代框架（React/Vue）默认转义，但 `dangerouslySetInnerHTML`/`v-html` 是高危入口。
- 【L3】富文本场景（允许部分 HTML）应使用 DOMPurify 等白名单净化器，服务端与客户端各做一次。
- 【L4】存储型 XSS 的杀伤力在于"一次注入、所有访问者中招"，可结合 CSRF 形成组合攻击；CSP 3 的 nonce/hash 机制可禁止内联脚本，大幅收窄攻击面。

:::

#### 🔀 发散问题

- **Q：XSS 窃取 Cookie 怎么防？** → HttpOnly 使 JS 无法读取，机制见本文档「Cookie 和 Session 的区别是什么？」。
- **Q：XSS 和 CSRF 的区别？** → XSS 是注入脚本执行，CSRF 是冒用登录态发请求，见本文档「什么是 CSRF 攻击？如何防御？」。

### 【中等】什么是 CSRF 攻击？如何防御？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Web 安全 / CSRF

#### 💎 关键结论

CSRF 是攻击者诱导用户在已登录的站点上执行非预期操作（转账、改密码）。本质是浏览器自动携带 Cookie，服务器无法区分请求是否出自用户本意。防御三板斧：SameSite Cookie、CSRF Token、敏感操作二次验证。

#### ⚡记忆卡片

- **口诀**：冒用登录态，SameSite 断携带，Token 验身份
- **关键词**：自动携带 Cookie ／ CSRF Token ／ SameSite ／ Referer
- **链路**：登录 A 站 → 访问恶意 B 站 → B 发起对 A 的请求 → 浏览器自动带 Cookie → A 误认本人

#### 📖 核心知识

**CSRF（Cross-Site Request Forgery，跨站请求伪造）**：攻击者诱导用户在已认证的 Web 站点上执行非预期的操作（如转账、修改密码）。

**攻击原理**：用户登录 A 站后 Cookie 有效，访问恶意 B 站时，B 站发起对 A 站的请求，浏览器自动携带 A 的 Cookie，A 站误以为是用户本人操作。

**防御措施**：

| 防御手段                | 原理                                 | 效果           |
| :---------------------- | :----------------------------------- | :------------- |
| **CSRF Token**          | 服务器下发随机 Token，请求时必须携带 | 最常用，效果好 |
| **SameSite Cookie**     | 限制 Cookie 只在同站请求中发送       | 现代浏览器支持 |
| **验证 Referer/Origin** | 检查请求来源是否合法                 | 简单但可被伪造 |
| **双重确认**            | 敏感操作需二次验证（短信/密码）      | 最安全         |

#### 🔬 扩展知识

::: details

- 【L3】SameSite 三种取值：`Strict` 完全禁止跨站携带；`Lax`（现代浏览器默认）允许顶层导航 GET 携带；`None` 必须同时声明 `Secure`。
- 【L3】CSRF 攻击通常用表单自动提交或 `<img>` 发起——无法携带自定义请求头，这正是"自定义请求头校验"能防御 CSRF 的原因。
- 【L4】前后端分离 + JWT 放 Authorization 头的方案天然免疫传统 CSRF（浏览器不会自动附加该头），但 Cookie 存 Token 的方案仍需防护。

:::

#### 🔀 发散问题

- **Q：CSRF 利用的是 Cookie 的什么特性？** → 浏览器自动携带，见本文档「Cookie 和 Session 的区别是什么？」。
- **Q：CSRF 与 CORS 有什么关系？** → CORS 的凭证配置不当会放大 CSRF 风险，见本文档「什么是 CORS 跨域？如何解决？」。

### 【中等】什么是 CORS 跨域？如何解决？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / CORS

#### 💎 关键结论

跨域是浏览器同源策略（协议+域名+端口相同才同源）拦截了 JS 的跨源请求。首选 CORS：服务器返回 `Access-Control-Allow-Origin` 授权；生产环境常用 Nginx 反向代理统一同域。JSONP 已过时，WebSocket 不受同源限制。

#### ⚡记忆卡片

- **口诀**：同源三要素，CORS 开白名单，代理绕过去
- **关键词**：同源策略 ／ Access-Control-Allow-Origin ／ 预检 OPTIONS ／ 反向代理
- **链路**：跨源请求 → 浏览器拦截 → 预检 OPTIONS → 服务端授权响应头 → 放行

#### 📖 核心知识

**跨域**：浏览器出于同源策略（协议 + 域名 + 端口相同才算同源），阻止前端 JS 向不同源的资源发起请求。

**解决方案**：

| 方案               | 原理                                            | 适用场景           |
| :----------------- | :---------------------------------------------- | :----------------- |
| **CORS（推荐）**   | 服务器返回 `Access-Control-Allow-Origin` 响应头 | 前后端分离         |
| **Nginx 反向代理** | 代理服务器转发请求，绕过浏览器同源策略          | 生产环境           |
| **JSONP**          | 利用 `<script>` 标签不受同源限制                | 仅支持 GET，已过时 |
| **WebSocket**      | 不受同源策略限制                                | 实时通信           |

```java
// Spring Boot CORS 配置
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://example.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

#### 🔬 扩展知识

::: details

- 【L3】**简单请求 vs 预检请求**：方法为 GET/HEAD/POST 且只含简单请求头时直接发送；否则先发 OPTIONS 预检（`Access-Control-Request-Method` 等），服务端用 `Access-Control-Allow-*` 响应，`maxAge` 可缓存预检结果。
- 【L3】开启凭证（`allowCredentials(true)` / `withCredentials`）时，`Access-Control-Allow-Origin` 不能为通配符 `*`，必须是具体来源。
- 【L4】同源策略禁止的是"读取跨源响应"，`<script>`/`<img>` 等标签仍可跨源加载资源——这是 JSONP 的历史由来；服务端之间的调用也不受同源策略限制。

:::

#### 🔀 发散问题

- **Q：跨域实时通信选什么方案？** → WebSocket 不受同源策略限制，见本文档「什么是 WebSocket？与 HTTP 的区别？」。
- **Q：CORS 应该放 Filter 还是拦截器处理？** → Filter 最早拦截、适合全局 CORS，见本文档「过滤器(Filter)、拦截器(Interceptor)、AOP 的区别？」。

## WebSocket

### 【中等】什么是 WebSocket？与 HTTP 的区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：JavaWeb / WebSocket

#### 💎 关键结论

WebSocket 是全双工协议：单个 TCP 连接上双向实时通信。它借 HTTP 握手（Upgrade 请求 + 101 响应）建立后切换协议，帧头仅 2~14 字节，远轻于每次请求携带完整 Header 的 HTTP 轮询，是聊天、推送、行情类场景的标配。

#### ⚡记忆卡片

- **口诀**：一次握手，双向长连；帧头极小，推送随心
- **关键词**：全双工 ／ Upgrade ／ 101 ／ ws://、wss://
- **链路**：HTTP Upgrade 请求 → 101 Switching Protocols → 协议切换 → 双向收发帧

#### 📖 核心知识

**WebSocket 是一种全双工通信协议**，在单个 TCP 连接上实现客户端与服务器之间的双向实时通信。

| 对比维度     | HTTP                       | WebSocket            |
| :----------- | :------------------------- | :------------------- |
| **通信方式** | 单向（请求-响应）          | 双向（全双工）       |
| **连接**     | 短连接（HTTP/1.0）或长连接 | 持久连接             |
| **实时性**   | 差（需轮询）               | 高（服务器主动推送） |
| **协议**     | `http://`                  | `ws://` / `wss://`   |
| **数据量**   | 每次请求携带完整 Header    | 帧头仅 2~14 字节     |

**建立连接流程**：客户端先发送 HTTP Upgrade 请求（`Connection: Upgrade` + `Upgrade: websocket` + `Sec-WebSocket-Key`），服务器返回 101 Switching Protocols，之后切换为 WebSocket 协议。

**WebSocket vs HTTP 长轮询**：

- **长轮询**：客户端发请求，服务器有数据才响应，响应后客户端立即再发。频繁建连开销大。
- **WebSocket**：一次握手后持久连接，双方随时发消息，效率高得多。

#### 🔬 扩展知识

::: details

- 【L3】生产环境需要应用层心跳（ping/pong 帧）：链路中间的 LB/防火墙会杀掉空闲连接，心跳用于保活与检测半开连接。
- 【L3】WebSocket 不内置断线重连与消息补偿，需客户端实现指数退避重连；`wss://`（TLS）在生产环境是强制要求。
- 【L4】服务端推送的替代方案 SSE（Server-Sent Events）：基于 HTTP、单向推送、自动重连，适合"只推不收"场景；双向交互才需要 WebSocket。

:::

#### 🔀 发散问题

- **Q：WebSocket 握手阶段和 HTTP 是什么关系？** → 握手复用 HTTP（101 状态码切换协议），见本文档「HTTP 常见状态码有哪些？」。
- **Q：跨域场景下 WebSocket 可用吗？** → WebSocket 不受同源策略限制，是跨域实时通信方案之一，见本文档「什么是 CORS 跨域？如何解决？」。

## 参考资料

- [Java Servlet 规范](https://javaee.github.io/servlet-spec/)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Scripting_Prevention_Cheat_Sheet.html)
- [JWT.io](https://jwt.io/)
- [Spring 官方文档 - Web](https://docs.spring.io/spring-framework/reference/web.html)
- 《Head First Servlets & JSP》
