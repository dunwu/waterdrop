---
title: Spring 注解
date: 2022-12-23 09:08:15
order: 28
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
permalink: /pages/4de477bb/
---

# Spring 注解

## Spring 注解驱动编程发展历程

- 注解驱动启蒙时代：Spring Framework 1.x
- 注解驱动过渡时代：Spring Framework 2.x
- 注解驱动黄金时代：Spring Framework 3.x
- 注解驱动完善时代：Spring Framework 4.x
- 注解驱动当下时代：Spring Framework 5.x

## Spring 核心注解场景分类

Spring 模式注解

| Spring 注解    | 场景说明           | 起始版本 |
| -------------- | ------------------ | -------- |
| @Repository    | 数据仓储模式注解   | 2.0      |
| @Component     | 通用组件模式注解   | 2.5      |
| @Service       | 服务模式注解       | 2.5      |
| @Controller    | Web 控制器模式注解 | 2.5      |
| @Configuration | 配置类模式注解     | 3.0      |

装配注解

| Spring 注解     | 场景说明                                    | 起始版本 |
| --------------- | ------------------------------------------- | -------- |
| @ImportResource | 替换 XML 元素 `<import>`                    | 2.5      |
| @Import         | 导入 Configuration 类                       | 2.5      |
| @ComponentScan  | 扫描指定 package 下标注 Spring 模式注解的类 | 3.1      |

依赖注入注解

| Spring 注解 | 场景说明                            | 起始版本 |
| ----------- | ----------------------------------- | -------- |
| @Autowired  | Bean 依赖注入，支持多种依赖查找方式 | 2.5      |
| @Qualifier  | 细粒度的 @Autowired 依赖查找        | 2.5      |

## Spring 注解编程模型

- 元注解（Meta-Annotations）
- Spring 模式注解（Stereotype Annotations）
- Spring 组合注解（Composed Annotations）
- Spring 注解属性别名和覆盖（Attribute Aliases and Overrides）

## Spring 元注解（Meta-Annotations）

- java.lang.annotation.Documented
- java.lang.annotation.Inherited
- java.lang.annotation.Repeatable

## Spring 模式注解（Stereotype Annotations）

理解 @Component “派⽣性”：元标注 @Component 的注解在 XML 元素 <context:component-scan> 或注解 @ComponentScan 扫描中“派生”了 @Component 的特性，并且从 Spring Framework 4.0 开始支持多层次“派⽣性”。

举例说明：

- @Repository
- @Service
- @Controller
- @Configuration
- @SpringBootConfiguration（Spring Boot）

@Component “派⽣性”原理

- 核心组件 - org.springframework.context.annotation.ClassPathBeanDefinitionScanner
- org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider
- 资源处理 - org.springframework.core.io.support.ResourcePatternResolver
- 资源-类元信息
- org.springframework.core.type.classreading.MetadataReaderFactory
- 类元信息 - org.springframework.core.type.ClassMetadata
- ASM 实现 - org.springframework.core.type.classreading.ClassMetadataReadingVisitor
- 反射实现 - org.springframework.core.type.StandardAnnotationMetadata
- 注解元信息 - org.springframework.core.type.AnnotationMetadata
- ASM 实现 - org.springframework.core.type.classreading.AnnotationMetadataReadingVisitor
- 反射实现 - org.springframework.core.type.StandardAnnotationMetadata

## Spring 组合注解（Composed Annotations）

Spring 组合注解（Composed Annotations）中的元注允许是 Spring 模式注解（Stereotype Annotation）与其他 Spring 功能性注解的任意组合。

## Spring 注解属性别名（Attribute Aliases）

## Spring 注解属性覆盖（Attribute Overrides）

## Spring @Enable 模块驱动

@Enable 模块驱动

@Enable 模块驱动是以 @Enable 为前缀的注解驱动编程模型。所谓“模块”是指具备相同领域的功能组件集合，组合所形成⼀个独⽴的单元。⽐如 Web MVC 模块、AspectJ 代理模块、Caching（缓存）模块、JMX（Java 管理扩展）模块、Async（异步处理）模块等。

举例说明

- @EnableWebMvc
- @EnableTransactionManagement
- @EnableCaching
- @EnableMBeanExport
- @EnableAsync

@Enable 模块驱动编程模式

- 驱动注解：@EnableXXX
- 导入注解：@Import 具体实现
- 具体实现
- 基于 Configuration Class
- 基于 ImportSelector 接口实现
- 基于 ImportBeanDefinitionRegistrar 接口实现

## Spring 条件注解

基于配置条件注解 - @org.springframework.context.annotation.Profile

- 关联对象 - org.springframework.core.env.Environment 中的 Profiles
- 实现变化：从 Spring 4.0 开始，@Profile 基于 @Conditional 实现

基于编程条件注解 - @org.springframework.context.annotation.Conditional

- 关联对象 - org.springframework.context.annotation.Condition 具体实现

@Conditional 实现原理

- 上下文对象 - org.springframework.context.annotation.ConditionContext
- 条件判断 - org.springframework.context.annotation.ConditionEvaluator
- 配置阶段 - org.springframework.context.annotation.ConfigurationCondition.ConfigurationPhase
- 判断入口
  - org.springframework.context.annotation.ConfigurationClassPostProcessor
  - org.springframework.context.annotation.ConfigurationClassParser

## 典型应用场景

- **组件分层注册**：通过 `@Repository`、`@Service`、`@Controller` 分别标识 DAO、Service、Web 层组件，实现职责清晰的分层架构。
- **模块化功能开关**：使用 `@EnableAsync`、`@EnableCaching`、`@EnableScheduling` 等 `@Enable` 系列注解按需开启异步处理、缓存、定时任务等功能模块。
- **环境隔离配置**：通过 `@Profile("dev")` 和 `@Profile("prod")` 标记不同环境的 Bean，实现开发/测试/生产环境的配置隔离。
- **自定义 Starter 开发**：基于 `@Configuration` + `@ConditionalOnClass` + `@ConditionalOnMissingBean` 实现自动配置类，打包为 SpringBoot Starter 提供给其他项目复用。

## 最佳实践

- **优先使用组合注解**：如 `@SpringBootApplication` 已组合 `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`，避免重复标注。
- **`@Autowired` 搭配 `@Qualifier` 消除歧义**：当容器中存在多个同类型 Bean 时，用 `@Qualifier` 指定 Bean 名称，或用 `@Primary` 标记优先注入的 Bean。
- **避免注解过于分散**：大型项目中注解扫描范围过大可能导致启动慢，应通过 `@ComponentScan(basePackages = "com.xxx")` 精确控制扫描路径。
- **`@Conditional` 系列用于精细化控制**：`@ConditionalOnProperty`、`@ConditionalOnBean` 等可用于根据配置或容器状态决定是否注册 Bean，是自定义 Starter 的核心能力。

## 常见问题

- **`@Component` 和 `@Bean` 有什么区别？** `@Component` 用于类级别自动扫描注册；`@Bean` 用于方法级别，可精确控制实例化逻辑，适合第三方类注册。
- **`@Autowired` 和 `@Resource` 有什么区别？** `@Autowired` 是 Spring 原生注解，默认按类型注入；`@Resource` 是 JSR-250 标准注解，默认按名称注入。
- **为什么 `@Autowired` 有时注入为 null？** 常见原因：Bean 未被 Spring 管理（手动 new 的对象）、扫描路径未覆盖、存在多个同类型 Bean 未指定名称。
- **`@EnableXXX` 注解的工作原理是什么？** 通过 `@Import` 导入配置类或 `ImportSelector`，动态注册特定功能所需的 Bean 到容器中。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
