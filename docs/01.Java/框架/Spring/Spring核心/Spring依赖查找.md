---
title: Spring 依赖查找
date: 2020-08-30 16:06:10
order: 03
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
  - 依赖查找
permalink: /pages/9fb2fdd0/
---

# Spring 依赖查找

**依赖查找是主动或手动的依赖查找方式，通常需要依赖容器或标准 API 实现**。

IoC 依赖查找大致可以分为以下几类：

- 根据 Bean 名称查找
- 根据 Bean 类型查找
- 根据 Bean 名称 + 类型查找
- 根据 Java 注解查找

此外，根据查找的 Bean 对象是单一或集合对象，是否需要延迟查找等特定常见，有相应不同的 API。

## 单一类型依赖查找

单一类型依赖查找接口- `BeanFactory`

- 根据 Bean 名称查找
  - `getBean(String)`
  - Spring 2.5 覆盖默认参数：`getBean(String,Object...)`
- 根据 Bean 类型查找
  - Bean 实时查找
    - Spring 3.0 `getBean(Class)`
    - Spring 4.1 覆盖默认参数：`getBean(Class,Object...)`
  - Spring 5.1 Bean 延迟查找
    - `getBeanProvider(Class)`
    - `getBeanProvider(ResolvableType)`
- 根据 Bean 名称 + 类型查找：`getBean(String,Class)`

## 集合类型依赖查找

集合类型依赖查找接口- `ListableBeanFactory`

- 根据 Bean 类型查找
  - 获取同类型 Bean 名称列表
    - `getBeanNamesForType(Class)`
    - Spring 4.2 `getBeanNamesForType(ResolvableType)`
  - 获取同类型 Bean 实例列表
    - `getBeansOfType(Class)` 以及重载方法
- 通过注解类型查找

  - Spring 3.0 获取标注类型 Bean 名称列表

    - `getBeanNamesForAnnotation(Class<? extends Annotation>)`

  - Spring 3.0 获取标注类型 Bean 实例列表

    - `getBeansWithAnnotation(Class<? extends Annotation>)`

  - Spring 3.0 获取指定名称+ 标注类型 Bean 实例

    - `findAnnotationOnBean(String,Class<? extends Annotation>)`

## 层次性依赖查找

层次性依赖查找接口- `HierarchicalBeanFactory`

- 双亲 `BeanFactory`：`getParentBeanFactory()`
- 层次性查找
  - 根据 Bean 名称查找
    - 基于 `containsLocalBean` 方法实现
  - 根据 Bean 类型查找实例列表
    - 单一类型：`BeanFactoryUtils#beanOfType`
    - 集合类型：`BeanFactoryUtils#beansOfTypeIncludingAncestors`
  - 根据 Java 注解查找名称列表
    - `BeanFactoryUtils#beanNamesForTypeIncludingAncestors`

## 延迟依赖查找

Bean 延迟依赖查找接口

- `org.springframework.beans.factory.ObjectFactory`
- `org.springframework.beans.factory.ObjectProvider`（Spring 5 对 Java 8 特性扩展）
- 函数式接口
  - `getIfAvailable(Supplier)`
  - `ifAvailable(Consumer)`
- Stream 扩展- stream()

## 安全依赖查找

| 依赖查找类型 | 代表实现                             | 是否安全 |
| ------------ | ------------------------------------ | -------- |
| 单一类型查找 | `BeanFactory#getBean`                | 否       |
|              | `ObjectFactory#getObject`            | 否       |
|              | `ObjectProvider#getIfAvailable`      | 是       |
|              |                                      |          |
| 集合类型查找 | `ListableBeanFactory#getBeansOfType` | 是       |
|              | `ObjectProvider#stream`              | 是       |

注意：层次性依赖查找的安全性取决于其扩展的单一或集合类型的 `BeanFactory` 接口

## 内建可查找的依赖

`AbstractApplicationContext` 内建可查找的依赖

| Bean                        | 名称 Bean                        | 实例使用场景            |
| --------------------------- | -------------------------------- | ----------------------- |
| environment                 | Environment 对象                 | 外部化配置以及 Profiles |
| systemProperties            | java.util.Properties 对象        | Java 系统属性           |
| systemEnvironment           | java.util.Map 对象               | 操作系统环境变量        |
| messageSource               | MessageSource 对象               | 国际化文案              |
| lifecycleProcessor          | LifecycleProcessor 对象          | Lifecycle Bean 处理器   |
| applicationEventMulticaster | ApplicationEventMulticaster 对象 | Spring 事件广播器       |

注解驱动 Spring 应用上下文内建可查找的依赖（部分）

| Bean 名称                                                                       | Bean 实例                                   | 使用场景                                              |
| ------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| org.springframework.context.annotation.internalConfigurationAnnotationProcessor | ConfigurationClassPostProcessor 对象        | 处理 Spring 配置类                                    |
| org.springframework.context.annotation.internalAutowiredAnnotationProcessor     | AutowiredAnnotationBeanPostProcessor 对象   | 处理@Autowired 以及@Value 注解                        |
| org.springframework.context.annotation.internalCommonAnnotationProcessor        | CommonAnnotationBeanPostProcessor 对象      | （条件激活）处理 JSR-250 注解，如@PostConstruct 等    |
| org.springframework.context.event.internalEventListenerProcessor                | EventListenerMethodProcessor 对象           | 处理标注@EventListener 的 Spring 事件监听方法         |
| org.springframework.context.event.internalEventListenerFactory                  | DefaultEventListenerFactory 对象            | @EventListener 事件监听方法适配为 ApplicationListener |
| org.springframework.context.annotation.internalPersistenceAnnotationProcessor   | PersistenceAnnotationBeanPostProcessor 对象 | （条件激活）处理 JPA 注解场景                         |

## 依赖查找中的经典异常

`BeansException` 子类型

| 异常类型                          | 触发条件（举例）                           | 场景举例                                     |
| --------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `NoSuchBeanDefinitionException`   | 当查找 Bean 不存在于 IoC 容器时            | `BeanFactory#getBeanObjectFactory#getObject` |
| `NoUniqueBeanDefinitionException` | 类型依赖查找时，IoC 容器存在多个 Bean 实例 | `BeanFactory#getBean(Class)`                 |
| `BeanInstantiationException`      | 当 Bean 所对应的类型非具体类时             | `BeanFactory#getBean`                        |
| `BeanCreationException`           | 当 Bean 初始化过程中                       | Bean 初始化方法执行异常时                    |
| `BeanDefinitionStoreException`    | 当 `BeanDefinition` 配置元信息非法时       | XML 配置资源无法打开时                       |

## 典型应用场景

- **框架扩展开发**：通过 `ListableBeanFactory#getBeansOfType` 查找所有实现某接口的 Bean，动态注册策略处理器、插件等。
- **延迟初始化优化**：使用 `ObjectProvider` 延迟查找 Bean，避免在启动时实例化昂贵的 Bean，实现按需加载。
- **安全查找避免异常**：在不确定 Bean 是否存在的场景中使用 `ObjectProvider#getIfAvailable` 避免 `NoSuchBeanDefinitionException`。
- **事件广播器查找**：通过 `getBean(ApplicationEventMulticaster.class)` 获取内建 Bean 发布自定义事件。

## 最佳实践

- **优先使用类型查找而非名称查找**：类型查找更健壮，重构时不易出错。
- **使用 `ObjectProvider` 处理可选依赖**：比 `@Autowired(required=false)` 更灵活，支持 Stream 操作和函数式 API。
- **避免在 Bean 构造器中执行依赖查找**：可能导致循环依赖问题，应在 `@PostConstruct` 或生命周期回调中执行。
- **注意层次性查找的性能**：在子容器中查找 Bean 会逐级向上搜索，层次过深时影响性能。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
