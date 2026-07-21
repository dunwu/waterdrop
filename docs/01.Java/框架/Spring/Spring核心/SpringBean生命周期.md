---
title: Spring Bean 生命周期
date: 2022-12-21 19:26:01
order: 07
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
permalink: /pages/0be08c8a/
---

# Spring Bean 生命周期

## Spring Bean 元信息配置阶段

BeanDefinition 配置

- 面向资源
  - XML 配置
  - Properties 资源配置
- 面向注解
- 面向 API

## Spring Bean 元信息解析阶段

- 面向资源 BeanDefinition 解析
  - BeanDefinitionReader
  - XML 解析器 - BeanDefinitionParser
- 面向注解 BeanDefinition 解析
  - AnnotatedBeanDefinitionReader

## Spring Bean 注册阶段

BeanDefinition 注册接口：BeanDefinitionRegistry

## Spring BeanDefinition 合并阶段

BeanDefinition 合并

父子 BeanDefinition 合并

- 当前 BeanFactory 查找
- 层次性 BeanFactory 查找

## Spring Bean Class 加载阶段

- ClassLoader 类加载
- Java Security 安全控制
- ConfigurableBeanFactory 临时 ClassLoader

## Spring Bean 实例化前阶段

实例化方式

- 传统实例化方式：实例化策略（InstantiationStrategy）
- 构造器依赖注入

## Spring Bean 实例化阶段

非主流生命周期 - Bean 实例化前阶段

InstantiationAwareBeanPostProcessor#postProcessBeforeInstantiation

## Spring Bean 实例化后阶段

Bean 属性赋值（Populate）判断

InstantiationAwareBeanPostProcessor#postProcessAfterInstantiation

## Spring Bean 属性赋值前阶段

- Bean 属性值元信息
  - PropertyValues
- Bean 属性赋值前回调
  - Spring 1.2 - 5.0：InstantiationAwareBeanPostProcessor#postProcessPropertyValues
  - Spring 5.1：InstantiationAwareBeanPostProcessor#postProcessProperties

## Spring Bean Aware 接口回调阶段

Spring Aware 接口：

- BeanNameAware
- BeanClassLoaderAware
- BeanFactoryAware
- EnvironmentAware
- EmbeddedValueResolverAware
- ResourceLoaderAware
- ApplicationEventPublisherAware
- MessageSourceAware
- ApplicationContextAware

## Spring Bean 初始化前阶段

已完成：

- Bean 实例化

- Bean 属性赋值

- Bean Aware 接口回调

方法回调：

- BeanPostProcessor#postProcessBeforeInitialization

## Spring Bean 初始化阶段

Bean 初始化（Initialization）

- @PostConstruct 标注方法
- 实现 InitializingBean 接口的 afterPropertiesSet() 方法
- 自定义初始化方法

## Spring Bean 初始化后阶段

方法回调：BeanPostProcessor#postProcessAfterInitialization

## Spring Bean 初始化完成阶段

方法回调：Spring 4.1 +：SmartInitializingSingleton#afterSingletonsInstantiated

## Spring Bean 销毁前阶段

方法回调：DestructionAwareBeanPostProcessor#postProcessBeforeDestruction

## Spring Bean 销毁阶段

Bean 销毁（Destroy）

- @PreDestroy 标注方法
- 实现 DisposableBean 接口的 destroy() 方法
- 自定义销毁方法

## Spring Bean 垃圾收集

Bean 垃圾回收（GC）

- 关闭 Spring 容器（应用上下文）
- 执行 GC
- Spring Bean 覆盖的 finalize() 方法被回调

## 问题

**BeanPostProcessor 的使用场景有哪些**？

BeanPostProcessor 提供 Spring Bean 初始化前和初始化后的生命周期回调，分别对应 postProcessBeforeInitialization 以及 postProcessAfterInitialization 方法，允许对关心的 Bean 进行扩展，甚至是替换。

加分项：其中，ApplicationContext 相关的 Aware 回调也是基于 BeanPostProcessor 实现，即 ApplicationContextAwareProcessor。

**BeanFactoryPostProcessor 与 BeanPostProcessor 的区别**？

BeanFactoryPostProcessor 是 Spring BeanFactory（实际为 ConfigurableListableBeanFactory） 的后置处理器，用于扩展 BeanFactory，或通过 BeanFactory 进行依赖查找和依赖注入。

BeanFactoryPostProcessor 必须有 Spring ApplicationContext 执行，BeanFactory 无法与其直接交互。

而 BeanPostProcessor 则直接与 BeanFactory 关联，属于 N 对 1 的关系。

**BeanFactory 是怎样处理 Bean 生命周期**？

BeanFactory 的默认实现为 `DefaultListableBeanFactory`，其中 Bean生命周期与方法映射如下：

- BeanDefinition 注册阶段 - registerBeanDefinition
- BeanDefinition 合并阶段 - getMergedBeanDefinition
- Bean 实例化前阶段 - resolveBeforeInstantiation
- Bean 实例化阶段 - createBeanInstance
- Bean 初始化后阶段 - populateBean
- Bean 属性赋值前阶段 - populateBean
- Bean 属性赋值阶段 - populateBean
- Bean Aware 接口回调阶段 - initializeBean
- Bean 初始化前阶段 - initializeBean
- Bean 初始化阶段 - initializeBean
- Bean 初始化后阶段 - initializeBean
- Bean 初始化完成阶段 - preInstantiateSingletons
- Bean 销毁前阶段 - destroyBean
- Bean 销毁阶段 - destroyBean

## 典型应用场景

- **资源初始化**：通过 `@PostConstruct` 或 `InitializingBean` 在 Bean 初始化后执行数据库连接池预热、缓存预加载等操作。
- **资源清理**：通过 `@PreDestroy` 或 `DisposableBean` 在 Bean 销毁前释放连接、关闭文件句柄、清理临时文件。
- **AOP 代理增强**：利用 `BeanPostProcessor` 在初始化前后为 Bean 自动创建代理对象（如事务代理、缓存代理）。
- **自定义框架扩展**：通过 `SmartInitializingSingleton` 在所有单例 Bean 初始化完成后执行全局注册或检查逻辑。

## 最佳实践

- **优先使用 `@PostConstruct`/`@PreDestroy`**：相比实现 `InitializingBean`/`DisposableBean` 接口，注解方式侵入性更低。
- **避免在生命周期回调中执行耗时操作**：如网络请求、大文件 IO 等，以免拖慢容器启动速度。
- **利用 `BeanPostProcessor` 替代手动代理**：统一通过框架机制实现横切逻辑，避免业务代码散落各处。
- **注意 `prototype` Bean 无销毁回调**：Spring 不管理 prototype Bean 的完整生命周期，需自行处理资源释放。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
