---
title: Spring Bean 作用域
date: 2022-12-21 11:42:00
order: 06
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
  - Bean
permalink: /pages/bf41e73b/
---

# Spring Bean 作用域

## Spring Bean 作用域

| 来源        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| singleton   | 默认 Spring Bean 作用域，一个 BeanFactory 有且仅有一个实例 |
| prototype   | 原型作用域，每次依赖查找和依赖注入生成新 Bean 对象         |
| request     | 将 Spring Bean 存储在 ServletRequest 上下文中              |
| session     | 将 Spring Bean 存储在 HttpSession 中                       |
| application | 将 Spring Bean 存储在 ServletContext 中                    |

## "singleton" Bean 作用域

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/12/763d46a1e80d4f0aae8ed4acafd626c9.png)

## "prototype" Bean 作用域

Spring 容器没有办法管理 prototype Bean 的完整生命周期，也没有办法记录实例的存在。销毁回调方法将不会执行，可以利用 `BeanPostProcessor` 进行清扫工作。

## "request" Bean 作用域

- 配置
  - XML - `<bean class="..." scope = “request" />`
  - Java 注解 - `@RequestScope` 或 `@Scope(WebApplicationContext.SCOPE_REQUEST)`
- 实现
  - API - RequestScope

## "session" Bean 作用域

- 配置
  - XML - `<bean class="..." scope = “session" />`
  - Java 注解 - `@SessionScope` 或 `@Scope(WebApplicationContext.SCOPE_SESSION)`
- 实现
  - API - SessionScope

## "application" Bean 作用域

- 配置
  - XML - `<bean class="..." scope = “application" />`
  - Java 注解 - `@ApplicationScope` 或 `@Scope(WebApplicationContext.SCOPE_APPLICATION)`
- 实现
  - API - ServletContextScope

## 自定义 Bean 作用域

- 实现 Scope

  - `org.springframework.beans.factory.config.Scope`

- 注册 Scope

  - API - `org.springframework.beans.factory.config.ConfigurableBeanFactory#registerScope`

- 配置

  ```xml
  <bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
    <property name="scopes">
      <map>
        <entry key="...">
        </entry>
      </map>
    </property>
  </bean>
  ```

## 问题

Spring 內建的 Bean 作用域有几种？

singleton、prototype、request、session、application 以及 websocket

singleton Bean 是否在一个应用是唯一的？

否。singleton bean 仅在当前 Spring IoC 容器（BeanFactory）中是单例对象。

application Bean 是否可以被其他方案替代？

可以的，实际上，“application” Bean 与“singleton” Bean 没有本质区别

## 典型应用场景

- **无状态服务层**：使用 `singleton` 作用域管理 Service/DAO Bean，节省内存和实例化开销。
- **有状态对象封装**：使用 `prototype` 作用域创建用户会话数据封装、购物车等易变对象。
- **Web 请求绑定**：使用 `request` 作用域将表单数据与单次 HTTP 请求绑定，请求结束后自动销毁。
- **用户会话共享**：使用 `session` 作用域存储登录用户信息，同一会话内共享。

## 最佳实践

- **默认使用 singleton**：绝大多数 Bean 应设计为无状态单例，避免不必要的实例化开销。
- **singleton 注入 prototype 时使用 ScopedProxy**：否则 prototype 只会在 singleton 创建时注入一次，失去多例效果。
- **避免在 prototype Bean 中使用 `@PreDestroy`**：Spring 不管理 prototype Bean 的完整生命周期，销毁回调不会被执行。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
