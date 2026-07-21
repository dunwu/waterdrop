---
title: Spring IoC 依赖来源
date: 2022-12-20 20:33:51
order: 05
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
  - IOC
  - 依赖注入
permalink: /pages/d408cb91/
---

# Spring IoC 依赖来源

## 依赖查找的来源

查找来源

| 来源                  | 配置元数据                               |
| --------------------- | ---------------------------------------- |
| Spring BeanDefinition | `<bean id ="user" class="xxx.xxx.User">` |
|                       | `@Bean public User user() {...}`         |
|                       | `BeanDefinitionBuilder`                  |
| 单例对象              | API 实现                                 |

Spring 內建 BeanDefintion

| Bean 名称                                                                       | Bean 实例                                 | 使用场景                                            |
| ------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| org.springframework.context.annotation.internalConfigurationAnnotationProcessor | ConfigurationClassPostProcessor 对象      | 处理 Spring 配置类                                  |
| org.springframework.context.annotation.internalAutowiredAnnotationProcessor     | AutowiredAnnotationBeanPostProcessor 对象 | 处理 @Autowired 以及 @Value 注解                    |
| org.springframework.context.annotation.internalCommonAnnotationProcessor        | CommonAnnotationBeanPostProcessor 对象    | （条件激活）处理 JSR-250 注解，如 @PostConstruct 等 |
| org.springframework.context.event.internalEventListenerProcessor                | EventListenerMethodProcessor 对象         | 处理标注 @EventListener 的 Spring 事件监听方法      |

Spring 內建单例对象

| Bean 名称                   | Bean 实例                        | 使用场景                |
| --------------------------- | -------------------------------- | ----------------------- |
| environment                 | Environment 对象                 | 外部化配置以及 Profiles |
| systemProperties            | java.util.Properties 对象        | Java 系统属性           |
| systemEnvironment           | java.util.Map 对象               | 操作系统环境变量        |
| messageSource               | MessageSource 对象               | 国际化文案              |
| lifecycleProcessor          | LifecycleProcessor 对象          | Lifecycle Bean 处理器   |
| applicationEventMulticaster | ApplicationEventMulticaster 对象 | Spring 事件广播器       |

## 依赖注入的来源

| 来源                   | 配置元数据                               |
| ---------------------- | ---------------------------------------- |
| Spring BeanDefinition  | `<bean id ="user" class="xxx.xxx.User">` |
|                        | `@Bean public User user() {...}`         |
|                        | `BeanDefinitionBuilder`                  |
| 单例对象               | API 实现                                 |
| 非 Spring 容器管理对象 |                                          |

## Spring 容器管理和游离对象

| 来源                  | Spring Bean 对象 | 生命周期管理 | 配置元信息 | 使用场景           |
| --------------------- | ---------------- | ------------ | ---------- | ------------------ |
| Spring BeanDefinition | 是               | 是           | 有         | 依赖查找、依赖注入 |
| 单体对象              | 是               | 否           | 无         | 依赖查找、依赖注入 |
| Resolvable Dependency | 否               | 否           | 无         | 依赖注入           |

## Spring BeanDefinition 作为依赖来源

- 元数据：`BeanDefinition`
- 注册：`BeanDefinitionRegistry#registerBeanDefinition`
- 类型：延迟和非延迟
- 顺序：Bean 生命周期顺序按照注册顺序

## 单例对象作为依赖来源

- 要素
  - 来源：外部普通 Java 对象（不一定是 POJO）
  - 注册：`SingletonBeanRegistry#registerSingleton`
- 限制
  - 无生命周期管理
  - 无法实现延迟初始化 Bean

## 非 Spring 对象容器管理对象作为依赖来源

- 要素
  - 注册：`ConfigurableListableBeanFactory#registerResolvableDependency`
- 限制
  - 无生命周期管理
  - 无法实现延迟初始化 Bean
  - 无法通过依赖查找

## 外部化配置作为依赖来源

- 要素
  - 类型：非常规 Spring 对象依赖来源
- 限制
  - 无生命周期管理
  - 无法实现延迟初始化 Bean
  - 无法通过依赖查找

## 问题

注入和查找的依赖来源是否相同？

否，依赖查找的来源仅限于 Spring `BeanDefinition` 以及单例对象，而依赖注入的来源还包括 Resolvable Dependency 以及 `@Value` 所标注的外部化配置

单例对象能在 IoC 容器启动后注册吗？

可以的，单例对象的注册与 `BeanDefinition` 不同，`BeanDefinition` 会被 `ConfigurableListableBeanFactory#freezeConfiguration()` 方法影响，从而冻结注册，单例对象则没有这个限制。

Spring 依赖注入的来源有哪些？

- Spring `BeanDefinition`
- 单例对象
- Resolvable Dependency
- `@Value` 外部化配置

## 典型应用场景

- **框架内部扩展**：利用内建 BeanDefinition 注册自定义后置处理器，如自定义注解处理器、权限校验拦截器等。
- **单例对象注册**：通过 `SingletonBeanRegistry#registerSingleton` 将第三方库的实例对象注册到 Spring 容器，使其能被其他 Bean 依赖注入。
- **Resolvable Dependency 注入**：通过 `registerResolvableDependency` 注入容器基础设施对象（如 `BeanFactory`、`ApplicationContext`），避免与业务 Bean 冲突。
- **多来源组合装配**：在同一应用中混合使用 BeanDefinition、单例对象和外部化配置，实现灵活的组件管理。

## 最佳实践

- **优先使用 `BeanDefinition` 注册业务 Bean**：享受完整的生命周期管理和延迟初始化支持。
- **谨慎使用单例对象注册**：单例对象无生命周期回调，不适合需要初始化/销毁逻辑的场景。
- **利用内建 Bean 获取基础设施**：通过依赖查找获取 `Environment`、`MessageSource` 等内建 Bean，而非手动创建。
- **避免重复注册 BeanDefinition**：在 `freezeConfiguration()` 之前完成所有 BeanDefinition 注册，否则可能引发异常。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
