---
title: JMeter 快速入门
date: 2022-02-17 22:34:30
order: 03
categories:
  - Java
  - 工具
  - 测试
tags:
  - Java
  - 测试
  - JMeter
permalink: /pages/7949fa85/
---

# JMeter 快速入门

> [Jmeter](https://github.com/apache/jmeter) 是一款基于 Java 开发的功能和性能测试软件。
>
> 🎁 本文编辑时的最新版本为：5.1.1

## 简介

[Jmeter](https://github.com/apache/jmeter) 是一款使用 Java 开发的功能和性能测试软件。

### 特性

Jmeter 能够加载和性能测试许多不同的应用程序/服务器/协议类型：

- 网络 - HTTP，HTTPS(Java，NodeJS，PHP，ASP.NET 等)
- SOAP / REST Web 服务
- FTP 文件
- 通过 JDBC 的数据库
- LDAP
- 通过 JMS 的面向消息的中间件(MOM)
- 邮件-SMTP(S)，POP3(S)和 IMAP(S)
- 本机命令或 Shell 脚本
- TCP 协议
- Java 对象

### 工作流

Jmeter 的工作原理是仿真用户向服务器发送请求，并收集服务器应答信息并计算统计信息。

Jmeter 的工作流如下图所示：

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/technology/test/jmeter-workflow.png)

### 主要元素

Jmeter 的主要元素如下：

- **`测试计划(Test Plan)`** - 可以将测试计划视为 JMeter 的测试脚本 。测试计划由测试元素组成，例如线程组，逻辑控制器，样本生成控制器，监听器，定时器，断言和配置元素。
- **`线程组(Thread Group)`** - 线程组的作用是：模拟大量用户负载的运行场景。
  - 设置线程数
  - 设置加速期
  - 设置执行测试的次数
- **`控制器(Controllers)`** - 可以分为两大类：
  - **`采样器（Sampler）`** - 采样器的作用是模拟用户对目标服务器发送请求。 采样器是必须将组件添加到测试计划中的，因为它只能让 JMeter 知道需要将哪种类型的请求发送到服务器。 请求可以是 HTTP，HTTP(s)，FTP，TCP，SMTP，SOAP 等。
  - **`逻辑控制器`** - 逻辑控制器的作用是：控制多个请求发送的循环次数及顺序等。
- **`监听器(Listeners)`** - 监听器的作用是：收集测试结果信息。如查看结果树、汇总报告等。
- **`计时器(Timers)`** - 计时器的作用是：控制多个请求发送的时间频次。
- **`配置元素(Configuration Elements)`** - 配置元素的工作与采样器的工作类似。但是，它不发送请求，而是提供预备的数据等，如 CSV、函数助手。
- **`预处理器元素(Pre-Processor Elements)`** - 预处理器元素在采样器发出请求之前执行，如果预处理器附加到采样器元素，那么它将在该采样器元素运行之前执行。预处理器元素用于在运行之前准备环境及参数。
- **`后处理器元素(Post-Processor Elements)`** - 后处理器元素是在发送采样器请求之后执行的元素，常用于处理响应数据。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javaweb/technology/test/jmeter-elements.png)

> 📌 提示：
>
> Jmeter 元素的数量关系大致如下：
>
> 1. 脚本中最多只能有一个测试计划。
> 2. 测试计划中至少要有一个线程组。
> 3. 线程组中至少要有一个取样器。
> 4. 线程组中至少要有一个监听器。

## 安装

### 环境要求

- 必要的。Jmeter 基于 JDK8 开发，所以必须运行在 JDK8 环境。

  - JDK8

- 可选的。有些 jar 包不是 Jmeter 提供的，如果需要相应的功能，需要自行下载并置于 `lib` 目录。
  - JDBC
  - JMS
  - [Bouncy Castle](http://www.bouncycastle.org/test_releases.html)

### 下载

进入 [**Jmeter 官网下载地址**](https://jmeter.apache.org/download_jmeter.cgi) 选择需要版本进行下载。

### 启动

解压 Jmeter 压缩包，进入 bin 目录

Unix 类系统运行 `jmeter` ；Windows 系统运行 `jmeter.bat`

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/9318fd382f664225b618f520ec5b333b.png)

## 使用

### 创建测试计划

> 🔔 注意：
>
> - 在运行整个测试计划之前，应保存测试计划。
> - JMeter 的测试计划以 `.jmx` 扩展文件的形式保存。

#### 创建线程组

- 在“测试计划”上右键 【添加】=>【线程（用户）】=>【线程组】。

- 设置线程数和循环次数

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/8a49319fe6424defb420c3f8700df21c.png)

#### 配置原件

- 在新建的线程组上右键 【添加】=>【配置元件】=>【HTTP 请求默认值】。

- 填写协议、服务器名称或 IP、端口号

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/e03d2dc839154660afa372fc6b995344.png)

#### 构造 HTTP 请求

- 在“线程组”上右键 【添加-】=>【取样器】=>【HTTP 请求】。

- 填写协议、服务器名称或 IP、端口号（如果配置了 HTTP 请求默认值可以忽略）
- 填写方法、路径
- 填写参数、消息体数据、文件上传

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/4b9ea1a9317f460b88da08d4d35fbb78.png)

#### 添加 HTTP 请求头

- 在“线程组”上右键 【添加】=>【配置元件】=>【HTTP 信息头管理器】
- 由于我的测试例中传输的数据为 json 形式，所以设置键值对 `Content-Type`：`application/json`

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/3a54227821a14a5082d9d84a5dc77b6b.png)

#### 添加断言

- 在“线程组”上右键 【添加】=>【断言】=>【 响应断言 】
- 在我的案例中，以 HTTP 应答状态码为 200 来判断请求是否成功

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/b0bb9328437b4220b5a379e56a872516.png)

#### 添加察看结果树

- 在“线程组”上右键 【添加】=>【监听器】=>【察看结果树】
- 直接点击运行，就可以查看测试结果

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/e412625e076e400db34f93bb11da93cf.png)

#### 添加汇总报告

- 在“线程组”上右键 【添加】=>【监听器】=>【汇总报告】
- 直接点击运行，就可以查看测试结果

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/56ff174f32e94982ba2edebbf182023f.png)

#### 保存测试计划

执行测试计划前，GUI 会提示先保存配置为 `jmx` 文件。

### 执行测试计划

官方建议不要直接使用 GUI 来执行测试计划，这种模式指适用于创建测试计划和 debug。

执行测试计划应该使用命令行模式，语法形式如下：

```bash
jmeter -n -t [jmx file] -l [results file] -e -o [Path to web report folder]
```

执行测试计划后，在 `-e -o` 参数后指定的 web 报告目录下，可以找到测试报告内容。在浏览器中打开 `index.html` 文件，可以看到如下报告：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/10/e5eed8906d064150aabfa11e2898f774.png)

## 问题

### 如何读取本地 txt/csv 文件作为请求参数

参考：[Jmeter 读取本地 txt/csv 文件作为请求参数，实现接口自动化](https://www.jianshu.com/p/3b2d3b643415)

（1）依次点击【添加】=>【配置元件】=>【CSV 数据文件设置】

配置如下所示：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/11/6f4249a055d0494b87a69e76c8e6ad36.png)

重要配置说明（其他配置根据实际情况填）：

- 文件名：输入需要导入的数据文件位置。
- 文件编码：设为 UTF-8，避免乱码。
- 变量名称：使用 `,` 分隔输入变量列表。如截图中设置了两个变量 `a` 和 `b`

（2）在 HTTP 请求的消息体数据中配置参数

```
[{"a":"${a}","b":"${b}"}]
```

### 如何有序发送数据

依次点击【添加】=>【逻辑控制器】=>【事务控制器】

## 典型应用场景

- **接口性能压测**：对 HTTP API 进行并发压测，评估接口在不同并发量下的响应时间、吞吐量和错误率。
- **数据库性能测试**：通过 JDBC Sampler 对数据库查询进行压测，找出慢查询和连接池配置瓶颈。
- **登录场景模拟**：使用 CSV 数据文件读取用户名/密码，模拟多用户登录场景，验证认证服务的并发处理能力。
- **微服务链路压测**：结合参数化和事务控制器，模拟完整业务链路（如注册→下单→支付）的端到端性能测试。

## 最佳实践

- **使用 CLI 模式执行压测**：GUI 模式仅用于脚本开发和调试，正式压测必须使用命令行模式（`-n -t`），避免 GUI 消耗资源影响结果准确性。
- **合理配置线程数和 Ramp-Up**：线程数模拟并发用户数，Ramp-Up 时间控制用户加载速率，避免瞬间加载导致客户端瓶颈。
- **使用断言验证结果**：不仅关注响应时间，还要添加响应断言（状态码、关键字、JSONPath）确保响应内容正确。
- **避免在监听器中存储所有结果**：生产压测时禁用察看结果树等占用内存的监听器，使用 CSV 或聚合报告输出结果。

## 常见问题

**压测结果响应时间偏高？**

可能是客户端资源不足（CPU/内存/网络连接数）导致。检查压测机器资源，增加压测机器数量，或使用分布式压测模式。

**如何模拟不同用户的数据？**

使用 CSV Data Set Config 读取外部数据文件，每行对应一个用户数据，通过变量名在 HTTP 请求中引用 `${变量名}`。

**JMeter 如何做参数化随机化？**

结合 `__Random`、`__RandomString` 等内置函数和 CSV 文件实现参数随机化，也可以使用 `__counter` 函数生成递增序列。

## 参考资料

- [Jmeter 官网](https://jmeter.apache.org/)
- [Jmeter Github](https://github.com/apache/jmeter)
- [Jmeter 性能测试入门](https://www.cnblogs.com/TankXiao/p/4045439.html)
- [易百教程 - Jmeter 教程](https://www.yiibai.com/jmeter)
- [Jmeter 读取本地 txt/csv 文件作为请求参数，实现接口自动化](https://www.jianshu.com/p/3b2d3b643415)
