---
title: SpringBoot 之安全快速入门
date: 2021-05-13 18:21:56
order: 01
categories:
  - Java
  - 框架
  - Spring
  - Spring安全
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
  - 安全
permalink: /pages/6dd9b2e6/
---

# SpringBoot 之安全快速入门

## QuickStart

（1）添加依赖

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
```

（2）添加配置

```properties
spring.security.user.name = root
spring.security.user.password = root
spring.security.user.roles = USER
```

（3）启动应用后，访问任意路径，都会出现以下页面，提示你先执行登录操作。输入配置的用户名、密码（root/root）即可访问应用页面。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/11/eb6ea5410de14e569824acfcf9e7716e.png)

## 典型应用场景

- **Web 应用认证授权**：为 Web 应用提供表单登录、HTTP Basic 认证、JWT Token 认证等安全机制。
- **API 安全防护**：为 RESTful API 配置 OAuth2 / JWT 认证，保护接口不被未授权访问。
- **权限控制**：基于角色或权限注解（`@PreAuthorize`、`@Secured`）控制方法级别的访问。
- **单点登录（SSO）**：结合 Spring Security + OAuth2 实现多应用单点登录。

## 最佳实践

- **生产环境禁用默认密码配置**：通过数据库或外部认证服务管理用户凭证，禁止在配置文件中明文存储密码。
- **配置 CORS 与 Security 协同**：确保 `CorsFilter` 在 Security 过滤器链之前执行。
- **密码加密存储**：使用 `BCryptPasswordEncoder` 等强哈希算法加密用户密码。
- **最小权限原则**：默认拒绝所有请求，仅显式放行的路径允许访问。

## 常见问题

**Spring Security 默认配置下为什么所有接口都被拦截？**

引入 `spring-boot-starter-security` 后，默认所有请求需要认证。可通过 `SecurityFilterChain` 配置放行特定路径。

**如何自定义登录页面？**

在 `SecurityFilterChain` 配置中调用 `formLogin().loginPage("/login")` 指定自定义登录页面 URL。
