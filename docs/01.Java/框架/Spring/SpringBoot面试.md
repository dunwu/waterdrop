---
title: SpringBoot 面试
date: 2025-09-19 08:22:21
categories:
  - Java
  - 框架
  - Spring
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
  - 面试
permalink: /pages/fc674dbb/
---

# SpringBoot 面试

## SpringBoot 简介

### 【简单】什么是 SpringBoot？⭐⭐

> 🎯 目标等级：L1 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：SpringBoot / 概述

#### 💎 关键结论

SpringBoot 是基于 Spring 的开箱即用脚手架，核心理念是**约定优于配置**：自动配置按依赖推断并装配 Bean，starter 将相关依赖打包成整体，内嵌容器支持 `java -jar` 直接运行，Actuator 提供生产监控。它没有替代 Spring，而是消除了 Spring 应用的样板配置。

#### ⚡记忆卡片

- **口诀**：自动配、starter 捆依赖、内嵌容器一键跑、Actuator 看健康
- **关键词**：约定优于配置 ／ starter ／ 内嵌 Tomcat ／ Actuator
- **链路**：Spring 样板配置多 → 约定优于配置 → 自动配置 + starter → `java -jar` 独立运行

#### 📖 核心知识

Spring Boot 是一个基于 Spring 框架的"开箱即用"的脚手架框架，它基于**约定优于配置**的原则，极大地简化了 Spring 应用的搭建和开发过程。

SpringBoot 的核心特性：

- **自动配置**：根据项目依赖**自动推断并配置**所需的 Bean（如引入 Web 依赖则自动配置 Tomcat + Spring MVC）。
- **starter 依赖**：将功能相关的依赖**打包成一个整体**（如 `spring-boot-starter-web`），解决版本兼容问题。
- **内嵌服务器**：内嵌服务器 Tomcat/Jetty，无需外部容器，打包成可执行 JAR 后一键运行（`java -jar`）。
- **监控**：提供 **Actuator** 模块，轻松监控应用健康、性能等指标（通过 `/actuator/health` 等端点）。

#### 🔀 发散问题

- **Q：SpringBoot 是如何实现自动配置的？** → `@EnableAutoConfiguration` 经 `AutoConfigurationImportSelector` 加载候选配置类并按条件注解筛选，见本文档「SpringBoot 是如何实现自动配置的？」。
- **Q：SpringBoot Actuator 是什么？** → 生产级监控模块，通过 HTTP/JMX 端点暴露健康检查与指标，见本文档「SpringBoot Actuator 是什么？有哪些核心端点？」。
- **Q：SpringBoot 的启动流程是怎样的？** → 实例化 → 准备环境 → 创建上下文 → 刷新 → 执行 Runner 六阶段，见本文档「SpringBoot 的启动流程是如何设计的？」。

## SpringBoot 架构

### 【中等】SpringBoot 是如何实现自动配置的？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：SpringBoot / 自动配置

#### 💎 关键结论

入口是 `@SpringBootApplication` 组合注解，其中 `@EnableAutoConfiguration` 通过 `@Import` 导入 `AutoConfigurationImportSelector`，从注册文件（Boot 2.6 及以前为 `spring.factories`，2.7 起过渡、3.x 改为 `AutoConfigurationImports`）读取候选自动配置类，再逐个评估 `@ConditionalOnXXX` 条件注解，满足条件才注册 Bean——约定优于配置，且用户配置可覆盖。

#### ⚡记忆卡片

- **口诀**：组合注解开门，Selector 选候选，条件注解定去留，用户 Bean 优先
- **关键词**：@EnableAutoConfiguration ／ AutoConfigurationImportSelector ／ @ConditionalOnMissingBean ／ AutoConfigurationImports
- **链路**：@SpringBootApplication → @EnableAutoConfiguration → @Import(AutoConfigurationImportSelector) → 加载候选类 → @ConditionalOnXXX 按需筛选 → 注册 Bean

#### 📖 核心知识

**1. `@SpringBootApplication` 注解**

SpringBoot 的启动入口一般都是从标记 `@SpringBootApplication` 注解开始。

```java
@SpringBootApplication
public class MyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}

}
```

@SpringBootApplication 是一个组合注解，其定义如下：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
	// ...
}
```

其中，最核心的注解有 2 个：

- **`@EnableAutoConfiguration` 注解**：开启了 Spring Boot 的自动配置功能。
- **`@ComponentScan` 注解**：自动扫描指定包及其子包下的所有被 `@Component` 等注解标记的类，并将它们注册为 Spring 容器中的 Bean。默认，`@SpringBootApplication` 标注的类所在的包及其子包下的组件都会被扫描。

**2. `@EnableAutoConfiguration` 注解**

`@EnableAutoConfiguration` 也是一个组合注解，其定义如下：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
	// ...
}
```

其中，最关键点在于 `@Import(AutoConfigurationImportSelector.class)` 注解，表示导入 `AutoConfigurationImportSelector`。`AutoConfigurationImportSelector` 正是自动导入配置的关键。

**3. `AutoConfigurationImportSelector`**

`AutoConfigurationImportSelector` 会扫描自动配置类注册文件（Boot 2.x 为 `META-INF/spring.factories`）中的自动配置类，并根据限制条件，选择性为应用自动初始化、注入合适的 Bean。

> 注：这其实就是 SpringBoot 的 SPI 机制。

**4. 注册文件 `spring.factories`**

Boot 2.x 中，`spring.factories` 文件列出了所有自动配置类，当 SpringBoot 启动时，会根据文件中指定的配置类加载相应的自动配置。

`spring.factories` 文件部分内容：

```properties
# Initializers
org.springframework.context.ApplicationContextInitializer=\
org.springframework.boot.autoconfigure.SharedMetadataReaderFactoryContextInitializer,\
org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener

# Application Listeners
org.springframework.context.ApplicationListener=\
org.springframework.boot.autoconfigure.BackgroundPreinitializer

# Auto Configuration Import Listeners
org.springframework.boot.autoconfigure.AutoConfigurationImportListener=\
org.springframework.boot.autoconfigure.condition.ConditionEvaluationReportAutoConfigurationImportListener

# Auto Configuration Import Filters
org.springframework.boot.autoconfigure.AutoConfigurationImportFilter=\
org.springframework.boot.autoconfigure.condition.OnBeanCondition,\
org.springframework.boot.autoconfigure.condition.OnClassCondition,\
org.springframework.boot.autoconfigure.condition.OnWebApplicationCondition

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\

// ...
```

注册文件的版本演进（**版本结论**）：

| 版本          | 注册文件                                                                          | 加载入口                |
| :------------ | :-------------------------------------------------------------------------------- | :---------------------- |
| 1.x ~ 2.6     | `META-INF/spring.factories`（key 为 `EnableAutoConfiguration`）                   | `SpringFactoriesLoader` |
| 2.7（过渡期） | 两种文件同时支持，`spring.factories` 方式标记废弃                                 | 二者兼容                |
| 3.x           | `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfigurationImports` | `ImportCandidates.load` |

演进原因：`spring.factories` 把 Initializer、Listener、自动配置类等全部塞在一个文件里，启动时要全量解析；拆出独立文件后自动配置清单可逐行直接读取。注意 Boot 3.x 只是不再读取 `spring.factories` 中的 `EnableAutoConfiguration` 这一 key，自定义 Initializer 和 Listener 仍走 `spring.factories`。「starter 升级到 Boot 3.x 后自动配置静默失效」多半是这个演进没跟上。

**5. 自动配置类**

自动配置类中有以下核心注解，来辅助它完成自动配置的能力：

- `@Configuration`：自动配置类，一般都会标记 `@Configuration` 注解，来表明需要被扫描。
- `@EnableConfigurationProperties(xxx.class)`：表明这个配置类需要自动绑定的配置属性。
- `@Import`：需要前置依赖的其他配置类。

自动配置类通常使用 `@ConditionalOnClass`、`@ConditionalOnMissingBean`、`@ConditionalOnProperty` 等条件注解，来控制自动加载的触发条件。

::: details KafkaAutoConfiguration 示例

```java
@Configuration
@ConditionalOnClass(KafkaTemplate.class)
@EnableConfigurationProperties(KafkaProperties.class)
@Import({ KafkaAnnotationDrivenConfiguration.class, KafkaStreamsAnnotationDrivenConfiguration.class })
public class KafkaAutoConfiguration {

    private final KafkaProperties properties;

    private final RecordMessageConverter messageConverter;

    public KafkaAutoConfiguration(KafkaProperties properties, ObjectProvider<RecordMessageConverter> messageConverter) {
       this.properties = properties;
       this.messageConverter = messageConverter.getIfUnique();
    }

    @Bean
    @ConditionalOnMissingBean(KafkaTemplate.class)
    public KafkaTemplate<?, ?> kafkaTemplate(ProducerFactory<Object, Object> kafkaProducerFactory,
          ProducerListener<Object, Object> kafkaProducerListener) {
       KafkaTemplate<Object, Object> kafkaTemplate = new KafkaTemplate<>(kafkaProducerFactory);
       if (this.messageConverter != null) {
          kafkaTemplate.setMessageConverter(this.messageConverter);
       }
       kafkaTemplate.setProducerListener(kafkaProducerListener);
       kafkaTemplate.setDefaultTopic(this.properties.getTemplate().getDefaultTopic());
       return kafkaTemplate;
    }

    @Bean
    @ConditionalOnMissingBean(ProducerListener.class)
    public ProducerListener<Object, Object> kafkaProducerListener() {
       return new LoggingProducerListener<>();
    }

    @Bean
    @ConditionalOnMissingBean(ConsumerFactory.class)
    public ConsumerFactory<?, ?> kafkaConsumerFactory() {
       return new DefaultKafkaConsumerFactory<>(this.properties.buildConsumerProperties());
    }

    @Bean
    @ConditionalOnMissingBean(ProducerFactory.class)
    public ProducerFactory<?, ?> kafkaProducerFactory() {
       DefaultKafkaProducerFactory<?, ?> factory = new DefaultKafkaProducerFactory<>(
             this.properties.buildProducerProperties());
       String transactionIdPrefix = this.properties.getProducer().getTransactionIdPrefix();
       if (transactionIdPrefix != null) {
          factory.setTransactionIdPrefix(transactionIdPrefix);
       }
       return factory;
    }

    @Bean
    @ConditionalOnProperty(name = "spring.kafka.producer.transaction-id-prefix")
    @ConditionalOnMissingBean
    public KafkaTransactionManager<?, ?> kafkaTransactionManager(ProducerFactory<?, ?> producerFactory) {
       return new KafkaTransactionManager<>(producerFactory);
    }

    @Bean
    @ConditionalOnProperty(name = "spring.kafka.jaas.enabled")
    @ConditionalOnMissingBean
    public KafkaJaasLoginModuleInitializer kafkaJaasInitializer() throws IOException {
       KafkaJaasLoginModuleInitializer jaas = new KafkaJaasLoginModuleInitializer();
       Jaas jaasProperties = this.properties.getJaas();
       if (jaasProperties.getControlFlag() != null) {
          jaas.setControlFlag(jaasProperties.getControlFlag());
       }
       if (jaasProperties.getLoginModule() != null) {
          jaas.setLoginModule(jaasProperties.getLoginModule());
       }
       jaas.setOptions(jaasProperties.getOptions());
       return jaas;
    }

    @Bean
    @ConditionalOnMissingBean
    public KafkaAdmin kafkaAdmin() {
       KafkaAdmin kafkaAdmin = new KafkaAdmin(this.properties.buildAdminProperties());
       kafkaAdmin.setFatalIfBrokerNotAvailable(this.properties.getAdmin().isFailFast());
       return kafkaAdmin;
    }

}
```

:::

**6. 自动配置简化流程**

```
@SpringBootApplication -> @EnableAutoConfiguration -> @Import({AutoConfigurationImportSelector.class}) -> 扫描 META-INF/spring.factories 文件 -> 自动加载文件中的配置 -> XXXAutoConfiguration 中根据 @ConditionalOnXXX 按需加载
```

```mermaid
graph TD
    A["@SpringBootApplication"] --> B["@EnableAutoConfiguration"]
    B --> C["@Import AutoConfigurationImportSelector"]
    C --> D[扫描 META-INF/spring.factories]
    D --> E[加载所有候选自动配置类]
    E --> F{"@ConditionalOnClass 条件满足?"}
    F -->|否| G[跳过该配置]
    F -->|是| H{"@ConditionalOnMissingBean 条件满足?"}
    H -->|否| G
    H -->|是| I[注册 Bean 到容器]
    I --> J{"@ConditionalOnProperty 条件满足?"}
    J -->|否| G
    J -->|是| I
```

**7. 顺序保障：用户配置优先**

`@SpringBootApplication` 中的 `@ComponentScan` 先扫描注册用户的 Bean，自动配置类后经 `@Import` 导入，因此 `@ConditionalOnMissingBean` 的判断天然发生在用户 Bean 已注册之后——这是「用户配置优先于自动配置」的前提。

#### 🔬 扩展知识

::: details

- 【L3】源码定位：自动配置不是黑魔法，每一步都有明确的源码落点——① `AutoConfigurationImportSelector#selectImports` → `getAutoConfigurationEntry`：由 `ConfigurationClassParser` 在解析配置类阶段回调，返回候选配置类全限定名与排除项；② `AutoConfigurationImportSelector#getCandidateConfigurations`：Boot 2.x 通过 `SpringFactoriesLoader.loadFactoryNames` 读取候选类，3.x 改为 `ImportCandidates.load` 读取 `AutoConfigurationImports` 文件；③ `AutoConfigurationImportFilter`（如 `OnClassCondition` 实现）做前置过滤，Boot 2.7 约有 144 个候选自动配置类，过滤后真正生效的通常不足 30 个，大幅减少无效类的解析开销；④ `ConfigurationClassPostProcessor#postProcessBeanDefinitionRegistry` 是真正解析所有 `@Configuration` 并注册 Bean 定义的入口。
- 【L3】加载顺序如何确定？通过 `@AutoConfigureBefore`/`@AutoConfigureAfter` 及 `@AutoConfiguration` 的 `before/after` 属性，由 `AutoConfigurationSorter` 做拓扑排序（结果缓存在 `AutoConfigurationImportSelector` 中）。未声明顺序的类按类名字典序排列，因此一旦某自动配置依赖另一类的 Bean，必须显式声明顺序，否则换个依赖版本就可能失效。
- 【L3】为什么用户自己 `@ComponentScan` 扫描的类上用 `@ConditionalOnBean` 不可靠？条件判断发生在 BeanDefinition 注册阶段，用户配置类之间的处理顺序没有保证，判断「是否存在」时目标 Bean 可能还没注册。只有自动配置类被统一放到最后处理，条件判断才完备，这也是官方文档限定这两个注解只用于自动配置场景的原因。
- 【L3】生产上如何快速确认哪些自动配置生效了？启动加 `--debug`（或 `debug=true`），`ConditionEvaluationReportLoggingListener` 会打印完整的条件评估报告，列出每个类的 Positive/Negative 匹配及具体原因；运行时也可访问 `/actuator/conditions` 端点查看。这是排查「starter 为什么没生效」的第一工具。
- 【L4】方案权衡：

| 方案                                                             | 语义                                    | 适用边界                                                                              |
| :--------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------ |
| `@ConditionalOnMissingBean`（主流）                              | 用户没定义才生效，用户优先              | 99% 的 starter 都应采用                                                               |
| 无条件注册 + `spring.main.allow-bean-definition-overriding=true` | 同名 Bean 允许覆盖                      | Boot 2.1 起默认禁止覆盖，冲突直接抛 `BeanDefinitionOverrideException`，生产不推荐打开 |
| `@Primary` 共存                                                  | 两个 Bean 共存，注入点优先选 `@Primary` | 需要保留自动配置 Bean 给其他逻辑兜底时                                                |

另一个常见权衡：核心 Bean 写在自动配置类里，还是拆成独立 `@Configuration` 由自动配置类 `@Import` 进来？后者便于业务方关闭自动配置（`spring.autoconfigure.exclude`）后仍手动导入核心配置，灵活度更高。

- 【L4】失效场景：① **自动配置被静默接管**——用户定义了同类型 Bean，`@ConditionalOnMissingBean` 使 starter 不再生效，且没有任何日志提示，排查时先确认业务方是否自定义了同类型 Bean；② **条件注解误判**——`@ConditionalOnBean`/`@ConditionalOnMissingBean` 用在普通用户配置类上时注册顺序不可控，极易误判，官方只保证它们在自动配置类中可靠；③ **顺序依赖未声明**——自动配置类之间必须用 `@AutoConfigureBefore`/`@AutoConfigureAfter` 声明顺序，否则会随 jar 包顺序变化而间歇性失效；④ **Boot 3.x 注册文件失效**——starter 仍把自动配置类写在 `spring.factories` 里，升级后静默不生效。

> 📚 延伸阅读：[SpringBoot 官方文档 - Auto-configuration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)

:::

::: details 踩坑案例：starter 升级引发 BeanDefinitionOverrideException

> **现象**：公司统一短信 starter 从 1.2 升到 2.0，订单服务发布后立即启动失败，报 `BeanDefinitionOverrideException: Cannot register bean definition ... for bean 'smsTemplate'`，滚动发布全部卡住。
>
> **排查**：对比 2.0 源码，发现新增了一个不带任何条件的 `@Bean SmsTemplate`；而订单服务早年为定制重试参数自己定义过同名 `smsTemplate` Bean。Boot 2.1 之后 `spring.main.allow-bean-definition-overriding` 默认 `false`，同名直接启动失败。
>
> **根因**：starter 作者漏加 `@ConditionalOnMissingBean`，把「用户优先」的覆盖语义变成了同名冲突。
>
> **修复**：应急让业务方临时开 `allow-bean-definition-overriding=true` 恢复启动；长期方案 starter 2.1 给所有 `@Bean` 补齐 `@ConditionalOnMissingBean`，并在 CI 中引入「模拟用户自定义 Bean」的启动冒烟测试（基于 `ApplicationContextRunner`），防止回归。

:::

#### 🔀 发散问题

- **Q：SpringBoot 有哪些条件注解？** → 类/Bean/属性/资源/Web 六大类，核心是 `@ConditionalOnMissingBean` 保证用户优先，见本文档「SpringBoot 有哪些条件注解？」。
- **Q：如何自定义一个 starter 包？** → 自动配置类 + 属性类 + 注册文件 + 依赖打包四步走，见本文档「如何自定义一个 starter 包？」。
- **Q：SpringBoot 是如何通过 main 方法启动 web 项目的？** → `SpringApplication.run` 刷新上下文时经 `onRefresh` 创建内嵌容器，见本文档「SpringBoot 是如何通过 main 方法启动 web 项目的？」。

### 【中等】SpringBoot 是如何通过 main 方法启动 web 项目的？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：SpringBoot / 启动原理

#### 💎 关键结论

启动逻辑全部封装在 `SpringApplication.run`：它复用 Spring 容器启动流程并做大量扩展——创建应用上下文并执行自动配置，在 `refreshContext` 阶段的 `onRefresh` 钩子中通过 `WebServerFactory` 创建并启动内嵌 Web 服务器（默认 Tomcat），随后 `DispatcherServlet` 接管 HTTP 请求。这是 `java -jar` 独立运行的基石。

#### ⚡记忆卡片

- **口诀**：run 建上下文，刷新时起容器，Servlet 接流量
- **关键词**：SpringApplication.run ／ refreshContext ／ onRefresh ／ 内嵌 Tomcat
- **链路**：main → SpringApplication.run → 创建上下文 → refreshContext → onRefresh 启动 WebServer → DispatcherServlet 处理请求

#### 📖 核心知识

Spring Boot 应用的启动流程都封装在 `SpringApplication.run` 方法中，它的大部分逻辑都是复用 Spring 启动的流程，只不过在它的基础上做了大量的扩展。

在启动的过程中有一个刷新上下文的动作，这个方法内会触发 webServer 的创建，此时就会创建并启动内嵌的 web 服务，默认的 web 服务就是 Tomcat。

Spring Boot 启动过程的几个核心步骤：

1. **`SpringApplication.run()`**：这是启动的入口，它会创建 Spring 应用上下文，并执行自动配置。
2. **创建应用上下文**：为 Web 应用创建 `AnnotationConfigServletWebServerApplicationContext` 上下文。
3. **启动内嵌 Web 服务器**：在 `refreshContext()` 阶段启动内嵌的 Web 服务器（如 Tomcat）。
4. **自动配置**：通过 `@EnableAutoConfiguration` 自动配置各种组件，如 `DispatcherServlet`。
5. **请求处理**：内嵌的 `DispatcherServlet` 负责处理 HTTP 请求。

#### 🔬 扩展知识

::: details

- 【L3】Web 应用专用上下文 `AnnotationConfigServletWebServerApplicationContext` 重写了 `onRefresh()`，内部调用 `createWebServer()` 从 `ServletWebServerFactory`（默认 `TomcatServletWebServerFactory`）创建容器实例，容器启动早于非懒加载单例 Bean 的实例化完成。
- 【L3】完整的六阶段启动流程（推断应用类型、准备环境、发布启动事件等）是本题的展开版，见本文档「SpringBoot 的启动流程是如何设计的？」。
- 【L4】Reactive（WebFlux）应用推断为 REACTIVE 类型后，创建的是 `AnnotationConfigReactiveWebServerApplicationContext`，默认内嵌 Netty 而非 Tomcat。

> 📚 延伸阅读：[SpringBoot 官方文档 - SpringApplication](https://docs.spring.io/spring-boot/reference/features/spring-application.html)

:::

#### 🔀 发散问题

- **Q：SpringBoot 的启动流程是如何设计的？** → 实例化、准备环境、创建上下文、刷新、执行 Runner 六阶段全景，见本文档「SpringBoot 的启动流程是如何设计的？」。
- **Q：SpringBoot 是如何内嵌 Tomcat 的？** → `WebServerFactory` 工厂创建并封装 `TomcatWebServer`，见本文档「SpringBoot 是如何内嵌 Tomcat 的？」。

### 【困难】SpringBoot 的启动流程是如何设计的？⭐⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：SpringBoot / 启动流程

#### 💎 关键结论

启动流程分六个阶段：实例化 `SpringApplication`（推断应用类型、加载扩展）→ 运行 `run()` 并发布 `ApplicationStartingEvent` → 准备 Environment 加载配置 → 创建 ApplicationContext → `refreshContext`（解析自动配置、`onRefresh` 启动内嵌容器、实例化单例 Bean）→ 发布 `ApplicationReadyEvent` 并执行 Runner。设计本质是事件驱动 + SPI 加载 + 钩子扩展点。

#### ⚡记忆卡片

- **口诀**：实例化、备环境、建上下文、刷新、跑 Runner
- **关键词**：SpringApplication ／ ApplicationStartingEvent ／ ConfigurationClassPostProcessor ／ onRefresh ／ ApplicationReadyEvent
- **链路**：构造推断类型 → prepareEnvironment → prepareContext → refreshContext（onRefresh 建容器）→ callRunners

#### 📖 核心知识

Spring Boot 启动流程大致分为六个关键阶段。

**1. 实例化 SpringApplication**

- **推断应用类型**（Servlet、Reactive、None）。
- **加载扩展**：从 `META-INF/spring.factories` 加载 `ApplicationContextInitializer` 和 `ApplicationListener`。

**2. 运行 `run()` 方法**

- 启动计时器，记录应用启动耗时。
- 发布第一个事件：**`ApplicationStartingEvent`**。

**3. 准备环境**

- 创建并配置环境，整合命令行参数、配置文件（`application.properties`）、系统属性等。
- 发布 **`ApplicationEnvironmentPreparedEvent`** 事件（触发配置文件的加载）。

**4. 创建应用上下文（ApplicationContext）**

- 根据应用类型创建对应的 `ApplicationContext`（如 `AnnotationConfigServletWebServerApplicationContext`）。
- 将环境设置到上下文中，并执行 `ApplicationContextInitializer`。

**5. 刷新应用上下文**

1. **准备 BeanFactory**。
2. **执行 BeanFactoryPostProcessor**：核心为 **`ConfigurationClassPostProcessor`**，负责解析 `@Configuration`、`@ComponentScan` 和 **`@EnableAutoConfiguration`（自动配置的入口）**。
3. **注册 BeanPostProcessor**（负责依赖注入 `@Autowired`、AOP 等）。
4. **onRefresh() 方法（Spring Boot 精华）**：**创建并启动内嵌的 Web 服务器**（如 Tomcat）。
5. **完成 BeanFactory 初始化**：**实例化所有非懒加载的单例 Bean**（调用所有 `BeanPostProcessor`，完成依赖注入和初始化）。

**6. 发布事件与执行 Runner**

- 发布最终事件 **`ApplicationReadyEvent`**（表示应用已完全就绪）。
- 执行所有 **`CommandLineRunner`** 和 **`ApplicationRunner`** 接口的实现，进行启动后初始化。

**设计思想总结**

- **事件驱动**：通过发布一系列事件，将启动过程解耦，允许开发者监听并介入特定阶段。
- **工厂加载机制（SPI）**：通过 `META-INF/spring.factories` 文件自动加载配置和组件，实现**约定优于配置**。
- **钩子方法**：提供大量扩展点（如 `*Aware`、`*Processor`、`*Runner` 接口），方便定制。
- **内嵌服务器**：在刷新上下文的 `onRefresh()` 钩子中启动 Web 服务器，这是独立运行（`java -jar`）的基石。

```mermaid
graph TD
    A["main 方法调用 SpringApplication.run"] --> B[实例化 SpringApplication]
    B --> C[推断应用类型 Servlet/Reactive/None]
    C --> D[加载 ApplicationContextInitializer 和 ApplicationListener]
    D --> E["发布 ApplicationStartingEvent"]
    E --> F[准备 Environment 加载配置文件]
    F --> G["发布 ApplicationEnvironmentPreparedEvent"]
    G --> H[创建 ApplicationContext]
    H --> I[执行 Initializer 设置环境]
    I --> J[refreshContext 刷新上下文]
    J --> K[解析自动配置 注册 Bean]
    K --> L["onRefresh 启动内嵌 Web 服务器"]
    L --> M[初始化所有单例 Bean]
    M --> N["发布 ApplicationReadyEvent"]
    N --> O[执行 CommandLineRunner/ApplicationRunner]
```

#### 🔬 扩展知识

::: details

- 【L3】源码定位：启动骨架都在 `SpringApplication#run`（main 方法进入静态 `SpringApplication.run(Class, String[])` → new SpringApplication + 实例方法 run）——① `SpringApplication#deduceWebApplicationType`：根据类路径推断 Servlet/Reactive/None，决定创建哪种上下文；② `getSpringFactoriesInstances`：从 `spring.factories` 加载 Initializer 和 Listener（Boot 3.x 只是把自动配置类清单挪到了 `AutoConfigurationImports` 文件，Initializer/Listener 仍读 `spring.factories`）；③ `prepareEnvironment`：`ConfigDataEnvironmentPostProcessor` 完成配置文件解析，随后发布 `ApplicationEnvironmentPreparedEvent`；④ `prepareContext`：`applyInitializers` 执行所有 Initializer，发布 `ApplicationContextInitializedEvent` 与 `ApplicationPreparedEvent`，注册主类 BeanDefinition；⑤ `refreshContext` → `AbstractApplicationContext#refresh`：核心是 `ConfigurationClassPostProcessor` 解析 `@Configuration` 并触发自动配置，`ServletWebServerApplicationContext#onRefresh` → `createWebServer` 创建内嵌容器；⑥ `callRunners`：依次执行所有 Runner。
- 【L3】整个流程通过 `SpringApplicationRunListener`（默认实现 `EventPublishingRunListener`）向外广播，它是启动事件发布的总枢纽：`starting → environmentPrepared → contextPrepared → contextLoaded → started → ready` 每一步回调都会转换为对应的 `ApplicationEvent`。
- 【L3】扩展点选型权衡：

| 需求                                                   | 选择                                    | 边界与限制                                         |
| :----------------------------------------------------- | :-------------------------------------- | :------------------------------------------------- |
| 容器 refresh 前改造容器（动态注册 Bean、激活 profile） | `ApplicationContextInitializer`         | 此时容器未刷新，不能依赖任何用户 Bean              |
| 对启动各阶段事件做响应                                 | `ApplicationListener`                   | 同步执行，耗时操作会阻塞启动主线程                 |
| 启动完成后的业务初始化（预热、订阅注册）               | `ApplicationRunner`/`CommandLineRunner` | 抛异常会导致启动失败，非关键逻辑必须自己 try-catch |
| 深度定制启动过程（监听每一步回调）                     | 自定义 `SpringApplicationRunListener`   | 重量级手段，需在 `spring.factories` 注册，一般不用 |

典型权衡：缓存预热放 `@PostConstruct`（同步阻塞启动、启动即可用）还是放 `ApplicationReadyEvent` 异步执行（启动快、短时间缓存未命中）？核心接口依赖的预热建议同步 + 拉长 K8s 探针延迟，非核心预热一律异步。

- 【L4】`ApplicationRunner` 和 `CommandLineRunner` 本质区别是什么？唯一区别是入参：`ApplicationRunner` 收解析后的 `ApplicationArguments`，`CommandLineRunner` 收原始 `String[]`。二者由 `SpringApplication#callRunners` 在发布 `ApplicationReadyEvent` 后调用，抛异常会走 `handleRunFailure` 直接终止应用。这是有意设计：初始化失败等价于启动失败，避免应用带伤运行。
- 【L4】`SpringApplicationRunListener` 和 `ApplicationListener` 是什么关系？前者是启动主流程的内嵌回调（`SpringApplication#run` 每一步直接调用它），能介入启动过程本身；`EventPublishingRunListener` 把这些回调翻译成 `ApplicationStartingEvent` 等事件再广播给后者。多这一层是为了把「流程控制点」和「事件消费者」解耦：框架用 RunListener 驱动流程，业务用 Listener 被动观察。
- 【L4】启动慢时如何精确定位是哪个阶段慢？Boot 2.4+ 用 `application.setApplicationStartup(new BufferingApplicationStartup(2048))` 记录启动步骤，通过 `/actuator/startup` 端点或配合 Java Flight Recorder 查看各步骤时间线，可精确到具体 Bean 的实例化耗时；配合 `--debug` 启动报告确认自动配置解析开销。

> 📚 延伸阅读：[SpringBoot 官方文档 - SpringApplication](https://docs.spring.io/spring-boot/reference/features/spring-application.html)

:::

#### 🏭 实战场景

::: details

**踩坑案例：同步监听器拖垮 K8s 发布**

> **现象**：商品服务上 K8s 后反复 `CrashLoopBackOff`，日志显示启动耗时超 120 秒后被 liveness 探针杀掉，发布当晚高峰服务容量不足。
>
> **排查**：抓线程栈发现 main 线程卡在一个 `ApplicationReadyEvent` 监听器里，里面做全量商品缓存预热，同步逐条调 Redis 加载约 80 万个 SKU。
>
> **根因**：开发者把重活放进了同步监听器，误以为 Ready 事件后执行不影响启动；而启动未完成时 liveness 探针（initialDelaySeconds 仅 60 秒）提前杀容器，形成死循环。
>
> **修复**：预热改为提交到线程池异步执行，启动立即返回；同时把就绪状态改接 `/actuator/health/readiness`，预热完成后才通过 readiness 探针放量。修复后启动耗时从 120 秒降到 25 秒，预热在后台 3 分钟内完成。

**场景题：订单服务启动 90 秒被探针杀掉，如何系统性排查优化？**

- **应急处理**：先临时调大 liveness 探针的 `initialDelaySeconds` 和 `failureThreshold` 保住发布不被杀；降低滚动发布并发度，避免同时大量实例不可用。
- **根因分析**：三步定位——① 开启 `BufferingApplicationStartup`，看 `/actuator/startup` 时间线，找出耗时最大的步骤（通常是某个具体 Bean 的 `spring.beans.instantiate`）；② 用 `--debug` 看条件评估报告，确认生效的自动配置类数量是否异常；③ 对卡住时刻抓线程栈，确认是否阻塞在远程连接上（配置中心、数据库连接池、Redis）。典型根因：`@PostConstruct` 里全量预热缓存、连接池初始化阻塞、`@ComponentScan` 扫了巨大的包。
- **长期方案**：① `@PostConstruct` 里的非关键初始化移到 `ApplicationReadyEvent` 后异步执行；② 用 `spring.autoconfigure.exclude` 排除不需要的自动配置，`scanBasePackages` 收窄到具体业务包；③ 启动耗时纳入 CI 门禁：超过 60 秒构建失败，防止逐步劣化；④ 探针体系改接 readiness 分组（`/actuator/health/readiness`），启动完成 ≠ 可接流量，预热完成后再放量。
- **权衡**：`spring.main.lazy-initialization=true` 全局懒加载能显著提速，但会把初始化错误推迟到运行时第一次请求（首请求变慢甚至报错），生产核心服务建议保持饿汉式启动、只优化具体耗时点。另外「启动快」与「启动即可用」是一对矛盾：同步预热启动慢但就绪即可用，异步预热启动快但有窗口期，需按业务容忍度选择。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "`ApplicationReadyEvent` 是启动完成后触发，监听器里干重活不影响启动" → 启动事件默认同步广播，监听器里做全量预热、远程调用会直接拖长甚至卡死启动主线程。
- ❌ "Runner 里的初始化失败没关系，应用照常运行" → `CommandLineRunner`/`ApplicationRunner` 抛出的未捕获异常会被 `handleRunFailure` 视为启动失败，非关键初始化必须自吞异常。
- ❌ "在 `ApplicationStartingEvent` 阶段就能读业务配置" → 此时 Environment 还没装配完，拿到的是空值；至少要到 `ApplicationEnvironmentPreparedEvent` 之后。
- ❌ "应用启动成功就代表端口在监听" → 缺 servlet-api 依赖时 `deduceWebApplicationType` 推断为 None，`onRefresh` 不会创建 Tomcat，进程不报错但端口不监听，很难排查。

:::

#### 🔀 发散问题

- **Q：SpringBoot 是如何实现自动配置的？** → 自动配置发生在刷新阶段的 `ConfigurationClassPostProcessor` 解析中，见本文档「SpringBoot 是如何实现自动配置的？」。
- **Q：SpringBoot 启动慢的原因有哪些？如何优化？** → 用 `BufferingApplicationStartup` 定位耗时点再逐项优化，见本文档「SpringBoot 启动慢的原因有哪些？如何优化？」。
- **Q：SpringBoot 是如何通过 main 方法启动 web 项目的？** → 本题的简化版：`run` → 刷新上下文 → `onRefresh` 起容器，见本文档「SpringBoot 是如何通过 main 方法启动 web 项目的？」。

### 【困难】如何自定义一个 starter 包？⭐⭐⭐

> 🎯 目标等级：L3 ｜ ⏱ 建议用时：20 min ｜ 🏷 标签：SpringBoot / 自定义 starter

#### 💎 关键结论

starter 本质是「自动配置类 + 注册文件 + 依赖聚合」：写一个 `XxxAutoConfiguration`，类上用 `@ConditionalOnClass`/`@ConditionalOnProperty` 控制生效，`@Bean` 上加 `@ConditionalOnMissingBean` 保证用户优先，用 `@ConfigurationProperties` 绑定参数，再注册到 `META-INF` 注册文件（Boot 2.7+ 推荐 `AutoConfigurationImports`，3.x 只读该文件），最后打包成 Maven 模块供业务方引入。

#### ⚡记忆卡片

- **口诀**：一类、一表、一属性、一开关、一注册
- **关键词**：@ConditionalOnClass ／ @ConditionalOnMissingBean ／ @ConfigurationProperties ／ AutoConfigurationImports
- **链路**：Properties 定默认值 → AutoConfiguration 按条件装配 → 注册文件登记 → starter 聚合依赖交付

#### 📖 核心知识

**1. 创建自动配置类**

```java
@EnableConfigurationProperties(MyServiceProperties.class) // 启用属性配置绑定
@ConditionalOnClass(MyService.class) // 条件 1: 当类路径下存在 MyService 类时生效
@ConditionalOnProperty(prefix = "my.service", value = "enabled", havingValue = "true", matchIfMissing = true) // 条件 2: 当配置文件中 my.service.enabled=true 时生效（默认 true）
public class MyServiceAutoConfiguration {

    @Autowired
    private MyServiceProperties properties;

    @Bean
    @ConditionalOnMissingBean // 关键条件：只有当用户没有自己配置 MyService 这个 Bean 时，才生效
    public MyService myService() {
        return new MyService(properties.getPrefix(), properties.getSuffix());
    }
}
```

说明：

- `@ConditionalOnClass(MyService.class)`：只有当 `MyService` 类在类路径下可用时（即你的 starter 被引入了），这个自动配置才应该生效。
- `@ConditionalOnProperty`：允许用户通过配置文件（`application.properties`）来控制自动配置是否开启。
- `@ConditionalOnMissingBean`：**这是最重要的条件**。它表示只有当用户没有在他们的自己的 `@Configuration` 类中手动声明 `MyService` Bean 时，这个自动配置才会执行。这确保了用户的自定义配置可以**覆盖**你的自动配置。

**2. 创建属性配置类**

为了让用户能够通过 `application.properties` 文件来自定义行为，需要创建一个属性类。

```java
@ConfigurationProperties(prefix = "my.service") // 绑定配置文件中以 my.service 为前缀的属性
public class MyServiceProperties {

    private String prefix = "Hello"; // 默认值
    private String suffix = "!";
    // 省略 getter 和 setter
}
```

**3. 注册自动配置类**

为了让 Spring Boot 发现自定义的自动配置类，需要在 Jar 包的 `resources` 目录下创建一个特定的文件。

Boot 2.6 及以前的文件位置：`src/main/resources/META-INF/spring.factories`，内容如下：

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.yourcompany.autoconfig.MyServiceAutoConfiguration
```

Spring Boot 在启动时会扫描所有 Jar 包中的这个文件，并将列出的类作为候选自动配置类进行加载和条件判断。

**版本注意（版本结论）**：Boot 2.7 起 `spring.factories` 中的自动配置注册方式已标记废弃，推荐改用新文件；Boot 3.x 不再读取 `spring.factories` 中的 `EnableAutoConfiguration` key。新文件位置：`src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfigurationImports`，内容为每行一个自动配置类全限定名：

```text
com.yourcompany.autoconfig.MyServiceAutoConfiguration
```

**4. 创建自定义 Starter**

一个完整的“自动配置”通常会打包成一个 **Starter**。Starter 的本质是一个空的 Maven 项目，它只做两件事：

1. 提供 `pom.xml`，管理相关依赖。
2. 提供注册文件（`spring.factories` 或 `AutoConfigurationImports`），注册自动配置类。

**Starter 项目的结构**

```
my-spring-boot-starter
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── yourcompany
│       │           ├── MyService.java
│       │           ├── MyServiceProperties.java
│       │           └── autoconfig
│       │               └── MyServiceAutoConfiguration.java
│       └── resources
│           └── META-INF
│               ├── spring.factories # 注册自动配置
│               └── additional-spring-configuration-metadata.json # 可选：为属性提供元数据提示
└── pom.xml
```

**Starter 的 `pom.xml` 关键点：**

- **依赖**：只包含你的自动配置模块和它所必需的第三方库。
- **不包含**：通常不包含 Spring Boot 的启动器（如 `spring-boot-starter`），而是让使用者去引入，这避免了依赖版本冲突。

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
        <!-- 注意：这里通常不指定版本，由使用者项目的 Spring Boot Parent 决定 -->
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
    <!-- 你的核心服务模块 -->
    <dependency>
        <groupId>com.yourcompany</groupId>
        <artifactId>my-service-core</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>
```

::: details 提供元数据提示（可选）

为了让用户在配置 `application.properties` 时能有代码提示和自动完成，可以创建一个 `additional-spring-configuration-metadata.json` 文件。

**文件位置：** `src/main/resources/META-INF/additional-spring-configuration-metadata.json`

**文件内容：**

```json
{
  "properties": [
    {
      "name": "my.service.enabled",
      "type": "java.lang.Boolean",
      "description": "Whether to enable the MyService auto-configuration.",
      "defaultValue": true
    },
    {
      "name": "my.service.prefix",
      "type": "java.lang.String",
      "description": "The prefix to use for the service.",
      "defaultValue": "Hello"
    },
    {
      "name": "my.service.suffix",
      "type": "java.lang.String",
      "description": "The suffix to use for the service.",
      "defaultValue": "!"
    }
  ]
}
```

使用 `spring-boot-configuration-processor` 依赖会在项目编译时自动生成这部分元数据。

:::

#### 🔬 扩展知识

::: details

- 【L3】注册文件的版本演进：Boot 1.x ~ 2.6 用 `spring.factories`（key 为 `EnableAutoConfiguration`，`SpringFactoriesLoader` 加载）；2.7 过渡期两种文件同时支持、旧方式标记废弃；3.x 只读 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfigurationImports`（`ImportCandidates.load` 加载）。「starter 升级 Boot 3.x 后自动配置静默失效」多半是这一步没跟上。
- 【L3】命名规范：官方 starter 命名是 `spring-boot-starter-xxx`，第三方/公司自定义 starter 应命名为 `xxx-spring-boot-starter`，避免与官方模块撞名。
- 【L4】设计检查单：① 所有 `@Bean` 加 `@ConditionalOnMissingBean`（按类型而非按名称判断）；② Bean 命名带业务前缀（如 `xxRateLimiter`），配置属性统一 `xx.*` 前缀；③ 提供总开关 `@ConditionalOnProperty(matchIfMissing = true)`；④ Boot 2.7+ 用 `@AutoConfiguration` + `AutoConfigurationImports` 注册，对顺序敏感的依赖声明 `@AutoConfigureAfter`；⑤ CI 增加覆盖测试：用 `ApplicationContextRunner` 模拟用户定义同类型 Bean，断言自动配置 Bean 不存在且启动无冲突。
- 【L4】`@ConditionalOnMissingBean` 的代价是用户覆盖后 starter 失去对该 Bean 的控制（用户可能漏配关键属性），因此应把行为尽量做成 `@ConfigurationProperties` 可调参，缩小用户必须自定义 Bean 的场景。若某个 Bean 必须强制注册（基础设施型），应起独占名称并在文档中明示，冲突时给出明确的自定义错误信息，而不是让业务方看到晦涩的 `BeanDefinitionOverrideException`。

> 📚 延伸阅读：[SpringBoot 官方文档 - Creating Your Own Auto-configuration](https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html)

:::

#### 🏭 实战场景

::: details

**场景**：你为公司写了一个自定义 starter，内部注册了一个名为 `rateLimiter` 的 Bean。某业务方自己也有一个叫 `rateLimiter` 的 Bean，引入你的 starter 后启动报 `BeanDefinitionOverrideException`，业务方在群里 @ 你。你如何设计 starter 避免这类问题？

- **应急处理**：先让业务方加 `spring.main.allow-bean-definition-overriding=true` 恢复启动（或临时改业务方 Bean 名），同时回滚 starter 版本引用止损，再排查影响面。
- **根因分析**：三处设计失误——① Bean 名过于通用，没有 starter 前缀，撞名概率高；② `@Bean` 未加 `@ConditionalOnMissingBean`，没有遵循「用户优先」；③ 发布前没有做过 Bean 冲突的冒烟测试。
- **长期方案**：① 所有 `@Bean` 加 `@ConditionalOnMissingBean`，用户自定义 Bean 自动优先；② Bean 命名带业务前缀（如 `xxRateLimiter`），配置属性统一 `xx.ratelimit.*` 前缀，从源头降低撞名概率；③ 提供总开关 `xx.ratelimit.enabled`，业务方可一键关闭；④ 用 `@AutoConfiguration` + `AutoConfigurationImports` 文件注册，对顺序敏感的依赖声明 `@AutoConfigureAfter`；⑤ CI 增加覆盖测试：用 `ApplicationContextRunner` 模拟用户定义同类型 Bean，断言自动配置 Bean 不存在且启动无冲突。
- **权衡**：`@ConditionalOnMissingBean` 的代价是用户覆盖后 starter 失去对该 Bean 的控制，因此应把行为尽量做成 `@ConfigurationProperties` 可调参。若某个 Bean 必须强制注册（基础设施型），应起独占名称并在文档中明示，冲突时给出明确的自定义错误信息。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ "starter 注册只写 `spring.factories` 就行" → Boot 3.x 不再读取其中的 `EnableAutoConfiguration` key，升级后自动配置静默失效；2.7 起应迁移到 `AutoConfigurationImports` 文件。
- ❌ "starter 里把所有依赖都打进去，用户就不用操心了" → starter 应只包含必需的依赖，Spring Boot 启动器通常由使用者引入或设为 provided/optional，否则极易引入版本冲突。
- ❌ "用户不会定义同名 Bean，`@ConditionalOnMissingBean` 可以不加" → Boot 2.1 起默认禁止 Bean 定义覆盖，同名直接抛 `BeanDefinitionOverrideException` 启动失败，这是 starter 设计的必修课。

:::

#### 🔀 发散问题

- **Q：SpringBoot 是如何实现自动配置的？** → starter 是自动配置机制的应用方，原理见本文档「SpringBoot 是如何实现自动配置的？」。
- **Q：SpringBoot 有哪些条件注解？** → 类/Bean/属性/资源/Web 六大类，见本文档「SpringBoot 有哪些条件注解？」。
- **Q：SpringBoot 如何解决 jar 包冲突？** → starter 聚合依赖后冲突排查靠 dependency:tree + exclusions，见本文档「SpringBoot 如何解决 jar 包冲突？」。

## 条件注解

### 【中等】SpringBoot 有哪些条件注解？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 条件注解

#### 💎 关键结论

条件注解均以 `@Conditional` 为基础扩展，分六大类：类条件（`@ConditionalOnClass`）、Bean 条件（`@ConditionalOnMissingBean`）、属性条件（`@ConditionalOnProperty`）、资源、Web 应用与其他（Expression/Java/CloudPlatform）。条件满足时对应 Bean/配置类才会注册。最核心的是 `@ConditionalOnMissingBean`，它保证了「用户自定义 Bean 优先于自动配置」。

#### ⚡记忆卡片

- **口诀**：类看类路径，Bean 看容器，属性看配置，用户定义最优先
- **关键词**：@Conditional ／ @ConditionalOnClass ／ @ConditionalOnMissingBean ／ @ConditionalOnProperty
- **链路**：条件评估 → 满足才注册 → 用户 Bean 先注册 → MissingBean 命中 → 自动配置让位

#### 📖 核心知识

条件注解是 SpringBoot 自动配置的核心机制，均以 `@Conditional` 为基础扩展而来。当条件满足时，对应的 Bean 或配置类才会被注册到容器中。

**类条件注解**

| 注解                         | 说明                             |
| :--------------------------- | :------------------------------- |
| `@ConditionalOnClass`        | 类路径下存在指定类时，配置生效   |
| `@ConditionalOnMissingClass` | 类路径下不存在指定类时，配置生效 |

**Bean 条件注解**

| 注解                            | 说明                                                             |
| :------------------------------ | :--------------------------------------------------------------- |
| `@ConditionalOnBean`            | 容器中存在指定类型的 Bean 时生效                                 |
| `@ConditionalOnMissingBean`     | 容器中不存在指定类型的 Bean 时生效（**用户自定义优先**）         |
| `@ConditionalOnSingleCandidate` | 容器中指定类型的 Bean 只有一个或虽有多个但有一个 @Primary 时生效 |

**属性条件注解**

| 注解                     | 说明                                                                                     |
| :----------------------- | :--------------------------------------------------------------------------------------- |
| `@ConditionalOnProperty` | 配置文件中指定属性满足条件时生效，支持 `prefix`、`name`、`havingValue`、`matchIfMissing` |

**资源条件注解**

| 注解                     | 说明                           |
| :----------------------- | :----------------------------- |
| `@ConditionalOnResource` | 类路径下存在指定资源文件时生效 |

**Web 应用条件注解**

| 注解                              | 说明                                             |
| :-------------------------------- | :----------------------------------------------- |
| `@ConditionalOnWebApplication`    | 当前应用是 Web 应用（Servlet 或 Reactive）时生效 |
| `@ConditionalOnNotWebApplication` | 当前应用不是 Web 应用时生效                      |

**其他条件注解**

| 注解                          | 说明                             |
| :---------------------------- | :------------------------------- |
| `@ConditionalOnExpression`    | SpEL 表达式结果为 true 时生效    |
| `@ConditionalOnJava`          | JDK 版本满足条件时生效           |
| `@ConditionalOnCloudPlatform` | 运行在指定云平台（如 K8s）时生效 |

**核心设计思想**：`@ConditionalOnMissingBean` 是实现"用户配置优先覆盖自动配置"的关键。SpringBoot 在自动配置类上大量使用该注解，确保开发者自定义的 Bean 不会被框架的默认配置覆盖。这也是 SpringBoot "约定优于配置"但"配置可覆盖"的设计哲学体现。

#### 🔬 扩展知识

::: details

- 【L3】条件评估时机有坑：`@ConditionalOnBean`/`@ConditionalOnMissingBean` 的判断依赖 BeanDefinition 的注册顺序，用在用户 `@ComponentScan` 扫到的普通配置类上时顺序不可控、极易误判；官方只保证它们在自动配置类（最后处理）中可靠。
- 【L4】自定义条件：实现 `org.springframework.context.annotation.Condition` 接口（或继承 `SpringBootCondition`）即可定义任意判断逻辑，配合自定义组合注解（元注解标注 `@Conditional`）封装成团队内部的条件注解。

> 📚 延伸阅读：[SpringBoot 官方文档 - Condition Annotations](https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html)

:::

#### 🔀 发散问题

- **Q：SpringBoot 是如何实现自动配置的？** → 条件注解是自动配置的筛选器，完整链路见本文档「SpringBoot 是如何实现自动配置的？」。
- **Q：如何自定义一个 starter 包？** → 条件注解是 starter 设计的核心工具，见本文档「如何自定义一个 starter 包？」。

## 内嵌容器

### 【中等】SpringBoot 支持哪些内嵌 Web 容器？如何切换？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 内嵌容器

#### 💎 关键结论

SpringBoot 默认内嵌 **Tomcat**，可切换为 **Jetty**（适合长连接/WebSocket）或 **Undertow**（高并发、内存占用最低），三者均实现 Servlet 规范。切换只需排除 `spring-boot-starter-tomcat` 再引入对应容器的 starter，`WebServerFactory` 自动配置会随之切换。

#### ⚡记忆卡片

- **口诀**：默认 Tomcat，Jetty 长连接，Undertow 高并发
- **关键词**：Tomcat ／ Jetty ／ Undertow ／ exclusions
- **链路**：starter-web 带 Tomcat → exclusions 排除 → 引入新容器 starter → WebServerFactory 自动切换

#### 📖 核心知识

SpringBoot 默认内嵌 **Tomcat** 作为 Web 服务器，同时支持 **Jetty** 和 **Undertow**，三者均实现了 Servlet 规范。

**三种容器对比**

| 特性             | Tomcat           | Jetty                            | Undertow             |
| :--------------- | :--------------- | :------------------------------- | :------------------- |
| **默认**         | 是               | 否                               | 否                   |
| **性能**         | 中等             | 中等                             | 最高（内存占用最小） |
| **成熟度**       | 最高，使用最广泛 | 高，轻量级                       | 较高，Red Hat 维护   |
| **适用场景**     | 通用 Web 应用    | 长连接、异步场景（如 WebSocket） | 高并发、资源敏感型   |
| **Servlet 支持** | 完整             | 完整                             | 完整                 |
| **内存占用**     | 较高             | 较低                             | 最低                 |

**切换方式（以切换为 Undertow 为例）**

```xml
<!-- 1. 排除默认的 Tomcat -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 2. 引入 Undertow -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```

**自定义容器配置**

```yaml
server:
  port: 8080
  undertow:
    threads:
      io: 2 # IO 线程数，默认 CPU 核心数
      worker: 256 # 工作线程数，默认 10 * IO 线程数
    buffer-size: 1024 # 每个缓冲区大小
    direct-buffers: true # 直接内存分配
```

#### 🔬 扩展知识

::: details

- 【L3】切换为何能自动生效？`ServletWebServerFactoryAutoConfiguration` 内部按 `@ConditionalOnClass` 分别探测 Tomcat/Jetty/Undertow 的类是否存在，类路径上有哪个容器的类就用对应的 `XxxServletWebServerFactory`，无需任何额外代码。
- 【L4】Reactive（WebFlux）应用的默认容器是 Netty（`NettyReactiveWebServerFactory`），也可切换为 Undertow/Tomcat 的 Reactive 实现。

:::

#### 🔀 发散问题

- **Q：SpringBoot 是如何内嵌 Tomcat 的？** → `WebServerFactory` 工厂模式在 `onRefresh` 阶段创建容器，见本文档「SpringBoot 是如何内嵌 Tomcat 的？」。
- **Q：SpringBoot 如何实现优雅停机？** → 三种内嵌容器（加 Reactor Netty）均支持 `server.shutdown=graceful`，见本文档「SpringBoot 如何实现优雅停机？」。

### 【中等】SpringBoot 是如何内嵌 Tomcat 的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 内嵌容器

#### 💎 关键结论

核心是 `WebServerFactory` 工厂模式：`ServletWebServerApplicationContext` 在 `onRefresh()` 阶段调用 `createWebServer()`，由 `TomcatServletWebServerFactory` 创建并配置 Tomcat 实例，封装为 `TomcatWebServer` 启动，`DispatcherServlet` 随后注册处理请求——是应用管理容器生命周期，而不是容器管理应用。

#### ⚡记忆卡片

- **口诀**：onRefresh 建容器，工厂造 Tomcat，应用管生命周期
- **关键词**：ServletWebServerApplicationContext ／ TomcatServletWebServerFactory ／ TomcatWebServer ／ DispatcherServlet
- **链路**：onRefresh → createWebServer → TomcatServletWebServerFactory 造实例 → TomcatWebServer.start → DispatcherServlet 接请求

#### 📖 核心知识

SpringBoot 内嵌 Tomcat 的核心机制是在应用启动时，通过 `WebServerFactory` 创建并启动 Tomcat 实例，无需外部容器部署。

**核心流程**

1. **`ServletWebServerApplicationContext`**：SpringBoot 专用的应用上下文，在 `onRefresh()` 阶段调用 `createWebServer()` 方法。
2. **`ServletWebServerFactory`**：工厂接口，`TomcatServletWebServerFactory` 是其默认实现，负责创建和配置 `Tomcat` 实例。
3. **`TomcatWebServer`**：封装了 `Tomcat` 实例，`start()` 方法启动 Tomcat，`stop()` 方法关闭。
4. **`DispatcherServlet`**：自动注册到内嵌 Tomcat 的 ServletContext 中，映射 `/` 路径，处理所有 HTTP 请求。

**与传统 WAR 部署的区别**：传统方式需要将应用打包成 WAR 部署到外部 Tomcat，由 Tomcat 管理应用生命周期。SpringBoot 内嵌容器则是应用管理容器生命周期，`main` 方法启动即创建 Tomcat 并注册 Servlet，实现 `java -jar` 一键启动。

#### 🔬 扩展知识

::: details

- 【L3】定制容器参数：`server.*` 配置（如 `server.port`、`server.tomcat.threads.max`）由 `ServerProperties` 绑定，通过 `WebServerFactoryCustomizer` 机制应用到工厂；也可自己实现 `WebServerFactoryCustomizer<TomcatServletWebServerFactory>` 做更深层定制（如 Connector 参数）。
- 【L4】时机细节：容器在 `onRefresh` 创建并启动，早于非懒加载单例 Bean 的实例化；但真正对外接受流量要等上下文完全刷新完毕，这也是 readiness 探针与启动完成需要分开判断的原因之一。

:::

#### 🔀 发散问题

- **Q：SpringBoot 支持哪些内嵌 Web 容器？如何切换？** → Tomcat/Jetty/Undertow 三选一切换，见本文档「SpringBoot 支持哪些内嵌 Web 容器？如何切换？」。
- **Q：SpringBoot 是如何通过 main 方法启动 web 项目的？** → 内嵌容器启动是 `run` 流程中 `refreshContext` 的一环，见本文档「SpringBoot 是如何通过 main 方法启动 web 项目的？」。

## 配置管理

### 【中等】SpringBoot 的配置文件优先级是怎样的？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 配置管理

#### 💎 关键结论

配置优先级本质是 PropertySource 的排序：**越靠近运行时、越外部的来源优先级越高**——命令行参数最高，其次是 `SPRING_APPLICATION_JSON`、系统属性、环境变量，再到 jar 包外的 profile 配置、jar 内配置、`@PropertySource`，默认属性最低。记住「外部覆盖内部，命令行覆盖一切」。

#### ⚡记忆卡片

- **口诀**：命令行最大，外部压内部，默认属性垫底
- **关键词**：命令行参数 ／ SPRING_APPLICATION_JSON ／ application-{profile} ／ @PropertySource ／ 默认属性
- **链路**：命令行 → 环境 JSON → 系统属性/环境变量 → jar 外配置 → jar 内配置 → @PropertySource → 默认属性

#### 📖 核心知识

SpringBoot 支持多种配置来源，加载时按以下优先级从高到低覆盖（高优先级覆盖低优先级）：

1. **命令行参数**：`java -jar app.jar --server.port=9090`
2. **SPRING_APPLICATION_JSON**：环境变量或命令行中的 JSON 配置
3. **ServletConfig / ServletContext** 初始化参数
4. **JNDI 属性**：`java:comp/env/xxx`
5. **Java 系统属性**：`System.getProperties()`
6. **操作系统环境变量**
7. **`RandomValuePropertySource`**：`random.*` 属性
8. **jar 包外的 `application-{profile}.yml/properties`**：与 jar 同级目录
9. **jar 包内的 `application-{profile}.yml/properties`**：类路径下
10. **jar 包外的 `application.yml/properties`**
11. **jar 包内的 `application.yml/properties`**
12. **`@PropertySource`** 注解指定的配置文件
13. **默认属性**：`SpringApplication.setDefaultProperties()`

**实践建议**：

- **多环境**：使用 `application-{profile}.yml` 区分 dev/test/prod，通过 `spring.profiles.active` 激活。
- **敏感配置**：数据库密码等敏感信息使用环境变量或配置中心管理，不要硬编码。
- **覆盖优先**：命令行参数优先级最高，常用于运维临时调整（如端口号）。

#### 🔬 扩展知识

::: details

- 【L3】同一位置同时存在 `application.properties` 和 `application.yml` 时，`.properties` 优先级更高（后加载覆盖先加载）；配置文件的实际解析由 `ConfigDataEnvironmentPostProcessor` 完成。
- 【L3】Boot 2.4 起配置文件处理规则有变化：多文档文件的 profile 激活逻辑重设计，`spring.profiles.active` 不能再由 profile-specific 文件自身覆盖；2.4 以前的旧行为可用 `spring.config.use-legacy-processing=true` 回退。
- 【L4】接入配置中心（如 Nacos/Apollo）后，远程配置通常以高优先级 PropertySource 插入，可覆盖本地文件；但命令行参数仍可覆盖远程配置，这是运维紧急降级的保留通道。

:::

#### 🔀 发散问题

- **Q：@ConfigurationProperties 和 @Value 有什么区别？** → 优先级决定“读到的值”，这两个注解决定“怎么绑定”，见本文档「@ConfigurationProperties 和 @Value 有什么区别？」。
- **Q：SpringBoot 支持哪些内嵌 Web 容器？如何切换？** → `server.*` 配置项同样受优先级约束，见本文档「SpringBoot 支持哪些内嵌 Web 容器？如何切换？」。

### 【中等】@ConfigurationProperties 和 @Value 有什么区别？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 配置绑定

#### 💎 关键结论

两者都是配置绑定手段：`@ConfigurationProperties` 按前缀**批量绑定**，支持松散绑定、JSR-303 校验与 IDE 元数据提示，适合结构化配置；`@Value` 逐个注入单值，支持 SpEL 但不支持松散绑定。结构化配置一律优先 `@ConfigurationProperties`，零散单值才用 `@Value`。

#### ⚡记忆卡片

- **口诀**：批量用 Properties，单值用 Value；松散绑定只属前者
- **关键词**：prefix ／ 松散绑定 ／ @Validated ／ SpEL ／ 元数据提示
- **链路**：配置文件 → 按 prefix 匹配 → 松散绑定字段 → 校验 → 注入 Bean

#### 📖 核心知识

| 维度         | `@ConfigurationProperties`     | `@Value`       |
| :----------- | :----------------------------- | :------------- |
| **功能**     | 批量绑定配置到 Bean 的字段     | 单个属性注入   |
| **松散绑定** | 支持（`my-name` ↔ `myName`）  | 不支持         |
| **SpEL**     | 不支持                         | 支持 `#{...}`  |
| **元数据**   | 支持自动生成配置提示           | 不支持         |
| **校验**     | 支持 `@Validated` JSR-303 校验 | 不支持         |
| **适用场景** | 结构化配置（如数据库连接池）   | 简单的单值注入 |

**使用示例**

```java
// 方式一：@ConfigurationProperties 批量绑定
@Component
@ConfigurationProperties(prefix = "app.datasource")
@Validated
public class DataSourceProperties {

    @NotBlank
    private String url;

    @Min(1)
    @Max(65535)
    private int port = 3306;

    private String username;
    private String password;
    // getter/setter 省略
}

// 方式二：@Value 单值注入
@Component
public class MyComponent {

    @Value("${app.datasource.url}")
    private String url;

    @Value("#{T(java.lang.Math).random() * 100}")
    private double randomValue;
}
```

#### 🔬 扩展知识

::: details

- 【L3】`@ConfigurationProperties` 本身不是组件注解，Bean 需先被注册才生效：常见三种方式——类上加 `@Component` 被扫描、配置类上 `@EnableConfigurationProperties(XxxProperties.class)` 启用（starter 的标准做法，见本文档「如何自定义一个 starter 包？」）、Boot 2.2+ 主类上 `@ConfigurationPropertiesScan` 扫描。
- 【L4】构造器绑定（Constructor Binding）：Boot 2.2+ 支持不可变配置——类不写 setter，用带参构造器接收绑定值，字段可声明为 `final`，配合 `@DefaultValue` 指定默认值，适合配置不可变的场景。

> 📚 延伸阅读：[SpringBoot 官方文档 - Type-safe Configuration Properties](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties)

:::

#### 🔀 发散问题

- **Q：SpringBoot 的配置文件优先级是怎样的？** → 绑定之前先要确定“读到的值”来自哪个来源，见本文档「SpringBoot 的配置文件优先级是怎样的？」。
- **Q：如何自定义一个 starter 包？** → `XxxProperties` 是 starter 对外暴露参数的标准方式，见本文档「如何自定义一个 starter 包？」。

## Actuator

### 【中等】SpringBoot Actuator 是什么？有哪些核心端点？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / Actuator

#### 💎 关键结论

Actuator 是 SpringBoot 内置的生产级监控模块，通过 HTTP/JMX 端点暴露运行时信息：`/health` 健康检查、`/metrics` 指标、`/loggers` 动态改日志级别、`/heapdump` 堆转储，无需额外开发。默认只暴露 `health`，生产必须精确控制暴露范围并加鉴权。

#### ⚡记忆卡片

- **口诀**：health 看命，metrics 看指标，loggers 调日志，暴露要收紧
- **关键词**：／health ／ ／metrics ／ exposure.include ／ show-details
- **链路**：引入 starter-actuator → 端点自动注册 → exposure 控制暴露 → 探针/监控对接

#### 📖 核心知识

SpringBoot Actuator 是生产级的监控和管理模块，通过 HTTP 或 JMX 端点暴露应用运行时信息，无需额外开发即可实现健康检查、指标监控等功能。

**核心端点**

| 端点                   | 调用方法 | 说明                                         |
| :--------------------- | :------- | :------------------------------------------- |
| `/actuator/health`     | GET      | 健康检查，显示应用及组件（DB、Redis 等）状态 |
| `/actuator/info`       | GET      | 应用基本信息（需手动配置）                   |
| `/actuator/metrics`    | GET      | 应用指标（JVM、HTTP 请求等）                 |
| `/actuator/env`        | GET      | 环境变量和配置属性                           |
| `/actuator/loggers`    | GET/POST | 动态查看和修改日志级别                       |
| `/actuator/beans`      | GET      | 容器中所有 Bean 列表                         |
| `/actuator/mappings`   | GET      | 所有 `@RequestMapping` 路径                  |
| `/actuator/threaddump` | GET      | 线程栈信息                                   |
| `/actuator/heapdump`   | GET      | 堆 dump 文件下载                             |
| `/actuator/refresh`    | POST     | 刷新配置（需集成 Spring Cloud Config）       |

**配置示例**

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,loggers # 暴露指定端点
        exclude: env,beans # 排除敏感端点
  endpoint:
    health:
      show-details: always # 显示健康详情（默认 never）
  server:
    port: 8081 # 独立端口，与业务端口隔离（安全建议）
```

**安全提示**：生产环境中，`env`、`beans`、`heapdump` 等端点可能暴露敏感信息，应通过 `management.endpoints.web.exposure.include` 精确控制暴露范围，并配合 Spring Security 进行鉴权。

#### 🔬 扩展知识

::: details

- 【L3】自定义端点：用 `@Endpoint(id = "xxx")` + `@ReadOperation`/`@WriteOperation` 定义；自定义健康检查实现 `HealthIndicator` 接口，把中间件连通性纳入 `/health`。
- 【L4】`/metrics` 底层基于 Micrometer，可对接 Prometheus/Grafana；`/actuator/conditions` 可查自动配置的条件评估报告（排查 starter 不生效的第一工具）；`/actuator/startup` 可查启动时间线（见本文档「SpringBoot 启动慢的原因有哪些？如何优化？」）。

:::

#### 🔀 发散问题

- **Q：SpringBoot 的启动流程是如何设计的？** → `/health/readiness` 与 `ApplicationReadyEvent` 直接相关，见本文档「SpringBoot 的启动流程是如何设计的？」。
- **Q：SpringBoot 启动慢的原因有哪些？如何优化？** → `/actuator/startup` 是定位启动耗时的关键端点，见本文档「SpringBoot 启动慢的原因有哪些？如何优化？」。

## SpringBoot 3.x

### 【中等】SpringBoot 3.x 有哪些重要新特性？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：SpringBoot / 版本演进

#### 💎 关键结论

3.x 五大变化：最低 JDK 17；`javax.*` 全面迁移到 `jakarta.*`；一等公民支持 GraalVM 原生镜像（启动从秒级降至毫秒级）；Micrometer Observation API 统一可观测性、取代 Sleuth；内置 HTTP Interface 声明式 HTTP 客户端。升级最大的两个坎是 Jakarta 包名替换与自动配置注册文件变更。

#### ⚡记忆卡片

- **口诀**：17 起步，jakarta 换包，native 秒变毫秒，观测一把梭
- **关键词**：JDK 17 ／ jakarta.\* ／ GraalVM Native ／ Observation API ／ HTTP Interface
- **链路**：JDK 17 → Jakarta EE 迁移 → Native Image 毫秒启动 → Observation 统一观测 → HTTP Interface 声明式调用

#### 📖 核心知识

**1. 最低要求 JDK 17**

SpringBoot 3.x 要求 JDK 17+，全面使用现代 Java 特性（Record、Sealed Classes、Pattern Matching 等）。

**2. Jakarta EE 迁移**

`javax.*` 包名全部迁移到 `jakarta.*`，影响 Servlet、JPA、Validation 等 API。升级时需同步更新依赖和 import。

```java
// SpringBoot 2.x
import javax.servlet.http.HttpServletRequest;
import javax.persistence.Entity;

// SpringBoot 3.x
import jakarta.servlet.http.HttpServletRequest;
import jakarta.persistence.Entity;
```

**3. GraalVM 原生镜像支持**

SpringBoot 3.x 一等公民支持 GraalVM Native Image，应用可编译为独立可执行文件，启动时间从秒级降至毫秒级，内存占用大幅降低。

```xml
<!-- pom.xml 添加 native 构建工具 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

```bash
# 编译为原生镜像
mvn -Pnative native:compile
```

| 维度         | JVM 模式         | Native Image            |
| :----------- | :--------------- | :---------------------- |
| **启动时间** | 1-5 秒           | 10-100 毫秒             |
| **内存占用** | 200MB-1GB        | 50-100MB                |
| **峰值性能** | 高（JIT 预热后） | 较低（AOT 无 JIT 优化） |
| **构建时间** | 快               | 慢（分钟级）            |
| **动态特性** | 完整支持         | 受限（反射需配置）      |

**4. Micrometer Observation API**

统一可观测性 API，取代原有的 Sleuth，通过单一 API 同时产生 Metrics、Tracing、Logging 数据。

```java
@Service
public class MyService {

    private final ObservationRegistry registry;

    public MyService(ObservationRegistry registry) {
        this.registry = registry;
    }

    public String doSomething() {
        return Observation.createNotStarted("my-operation", registry)
            .lowCardinalityKeyValue("type", "demo")
            .observe(() -> {
                // 业务逻辑
                return "result";
            });
    }
}
```

**5. HTTP Interface（声明式 HTTP 客户端）**

内置声明式 HTTP 客户端，无需 Feign 即可定义 HTTP 接口。

```java
@HttpExchange(url = "/api/users", accept = "application/json")
public interface UserApi {

    @GetExchange("/{id}")
    User getUser(@PathVariable Long id);

    @PostExchange
    User createUser(@RequestBody User user);
}

// 配置
@Configuration
public class HttpConfig {

    @Bean
    public UserApi userApi(WebClient.Builder builder) {
        WebClient client = builder.baseUrl("http://user-service").build();
        HttpServiceProxyFactory factory = HttpServiceProxyFactory
            .builderFor(WebClientAdapter.create(client)).build();
        return factory.createClient(UserApi.class);
    }
}
```

#### 🔬 扩展知识

::: details

- 【L3】自动配置注册文件变更（升级必检）：Boot 3.x 不再读取 `spring.factories` 中的 `EnableAutoConfiguration` key，自动配置类必须注册到 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfigurationImports`；自定义 starter 若没跟上会静默失效，详见本文档「SpringBoot 是如何实现自动配置的？」。
- 【L4】Boot 3.2+ 支持虚拟线程：`spring.threads.virtual.enabled=true` 即可让 Tomcat 工作线程、任务执行器使用 JDK 21 虚拟线程；同期还支持 JVM CDS（Class Data Sharing）归档加速启动。

> 📚 延伸阅读：[SpringBoot 3.0 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes)

:::

#### 🔀 发散问题

- **Q：SpringBoot 是如何实现自动配置的？** → 3.x 注册文件演进是升级最大的隐形坑，见本文档「SpringBoot 是如何实现自动配置的？」。
- **Q：如何自定义一个 starter 包？** → 兼容 3.x 的 starter 必须用新的注册文件，见本文档「如何自定义一个 starter 包？」。

## 常见问题

### 【中等】SpringBoot 启动慢的原因有哪些？如何优化？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 启动优化

#### 💎 关键结论

启动慢大多来自五处：自动配置类过多、连接类 Bean 初始化、组件扫描范围过大、`@PostConstruct` 慢逻辑、日志框架扫描类路径。排查靠 `BufferingApplicationStartup` 时间线定位，优化手段按性价比排序：排除无用自动配置、收窄扫描包、非关键初始化延后到 `ApplicationReadyEvent` 异步执行，全局懒加载慎用。

#### ⚡记忆卡片

- **口诀**：先定位后优化，排配置、缩扫描、慢活延后
- **关键词**：autoconfigure.exclude ／ lazy-initialization ／ scanBasePackages ／ BufferingApplicationStartup
- **链路**：时间线定位耗时点 → 排除无用自动配置 → 收窄扫描 → 非关键初始化异步化

#### 📖 核心知识

**启动慢的常见原因**

1. **自动配置类过多**：SpringBoot 扫描加载大量 `@AutoConfiguration`，即使大部分不生效也需条件判断。
2. **Bean 初始化耗时**：数据库连接池创建、Redis 连接、HTTP 客户端初始化等。
3. **组件扫描范围过大**：`@ComponentScan` 扫描了过多无关包。
4. **`@PostConstruct` / `InitializingBean`** 中执行了耗时逻辑。
5. **日志框架初始化**：某些日志框架启动时扫描类路径。

**优化手段**

| 优化方向         | 具体措施                                                                |
| :--------------- | :---------------------------------------------------------------------- |
| **精简自动配置** | 使用 `spring.autoconfigure.exclude` 排除不需要的自动配置类              |
| **懒加载**       | `spring.main.lazy-initialization=true`，启动时只创建必需 Bean           |
| **缩小扫描范围** | `@SpringBootApplication(scanBasePackages = "com.xxx.service")` 精确指定 |
| **异步初始化**   | 用 `@Async` 或 `ApplicationRunner` 将非关键初始化延后                   |
| **JVM 参数**     | `-XX:TieredStopAtLevel=1`（仅 C1 编译，减少 JIT 时间）                  |

#### 🔬 扩展知识

::: details

- 【L3】精确定位耗时：Boot 2.4+ 开启 `BufferingApplicationStartup` 后通过 `/actuator/startup` 查看各步骤时间线，可精确到具体 Bean 的实例化耗时；配合 `--debug` 条件评估报告确认自动配置解析开销（定位方法论见本文档「SpringBoot 的启动流程是如何设计的？」的实战场景）。
- 【L4】Boot 3.2+ 可配合 JVM CDS（Class Data Sharing）归档进一步压缩启动时间；Serverless/弹性扩缩容场景可评估 GraalVM Native Image（见本文档「SpringBoot 3.x 有哪些重要新特性？」），但要权衡反射受限与峰值性能下降。

:::

#### 🔀 发散问题

- **Q：SpringBoot 的启动流程是如何设计的？** → 知道哪个阶段慢才能对症下药，见本文档「SpringBoot 的启动流程是如何设计的？」。
- **Q：SpringBoot 是如何实现自动配置的？** → 排除自动配置的前提是理解条件评估机制，见本文档「SpringBoot 是如何实现自动配置的？」。

### 【中等】SpringBoot 如何解决 jar 包冲突？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：SpringBoot / 依赖管理

#### 💎 关键结论

jar 冲突本质是 Maven 版本仲裁问题：先用 `dependency:tree` 定位同一 artifact 的多个版本，再用 `<exclusions>` 排除或在 `<dependencyManagement>` 统一版本。用了 SpringBoot 后，`spring-boot-dependencies` BOM 已统一管理数百个常用库版本，大部分冲突已被消化，手动处理主要针对 BOM 之外的库。

#### ⚡记忆卡片

- **口诀**：先看树、再排除、后统一，BOM 打底少冲突
- **关键词**：dependency:tree ／ exclusions ／ dependencyManagement ／ spring-boot-dependencies
- **链路**：dependency:tree 定位 → exclusions 排除 → dependencyManagement 统一 → BOM 预防

#### 📖 核心知识

**排查步骤**

1. **查看依赖树**：`mvn dependency:tree -Dverbose -Dincludes=groupId:artifactId`
2. **定位冲突**：找到同一 artifact 的多个版本，确认哪个版本被加载。
3. **排除依赖**：在引入冲突依赖的地方使用 `<exclusions>` 排除不需要的版本。
4. **统一版本**：在 `<dependencyManagement>` 中统一指定版本。

**示例**

```xml
<!-- 排除传递依赖中的冲突版本 -->
<dependency>
    <groupId>com.example</groupId>
    <artifactId>lib-a</artifactId>
    <version>1.0</version>
    <exclusions>
        <exclusion>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 统一版本管理 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>32.1.3-jre</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**SpringBoot 的依赖管理**：SpringBoot 通过 `spring-boot-dependencies` BOM 统一管理了数百个常用库的版本，引入 Starter 时会自动继承这些版本，大大减少了手动解决版本冲突的需要。只有当引入非 SpringBoot 管理的库时，才需要手动处理冲突。

#### 🔬 扩展知识

::: details

- 【L3】Maven 仲裁规则：同一 artifact 多版本共存时，「最近优先」（路径最短者胜）；路径深度相同时按 pom 中声明顺序取先声明者。`dependency:tree -Dverbose` 会打印被仲裁掉的版本（omitted for conflict）。
- 【L4】CI 预防：用 `maven-enforcer-plugin` 的 `dependencyConvergence` 规则强制同一 artifact 版本收敛，版本不一致直接构建失败，把冲突拦在合码阶段而非运行期 `NoClassDefFoundError`。

:::

#### 🔀 发散问题

- **Q：如何自定义一个 starter 包？** → starter 聚合依赖后同样受冲突治理约束，见本文档「如何自定义一个 starter 包？」。
- **Q：SpringBoot 支持哪些内嵌 Web 容器？如何切换？** → 切换容器时的 exclusions 就是排除依赖的典型用法，见本文档「SpringBoot 支持哪些内嵌 Web 容器？如何切换？」。

### 【中等】SpringBoot 如何实现优雅停机？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：SpringBoot / 优雅停机

#### 💎 关键结论

优雅停机 = “拒新请求 + 等存量完成 + 安全销毁资源”：Boot 2.3+ 配置 `server.shutdown=graceful` 即可，收到 SIGTERM 后容器停止接受新请求，在 `timeout-per-shutdown-phase` 内等待存量请求完成，再执行 `@PreDestroy` 等销毁逻辑。但要真正无损，还需配合 K8s `preStop` 钩子与 readiness 探针。

#### ⚡记忆卡片

- **口诀**：拒新、等旧、销毁，一行配置 + 发布系统配套
- **关键词**：server.shutdown=graceful ／ SIGTERM ／ timeout-per-shutdown-phase ／ preStop
- **链路**：SIGTERM → 拒新请求（503）→ 等存量完成 → @PreDestroy/DisposableBean 销毁 → 进程退出

#### 📖 核心知识

优雅停机指应用发布或重启时，先停止接收新请求，等待存量请求处理完成后再关闭，避免用户请求被中断。

**开启方式（SpringBoot 2.3+）**

```yaml
server:
  shutdown: graceful # 开启优雅停机
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s # 停机阶段最长等待时间
```

**工作原理**

1. 收到 SIGTERM 信号（如 K8s/Docker 中的 `kill -15`），触发容器关闭流程。
2. **停止接收新请求**：Tomcat/Netty 等停止监听，新连接被拒绝，返回 503。
3. **等待存量请求完成**：在 `timeout-per-shutdown-phase` 内等待处理中的请求结束，超时则强制关闭。
4. **销毁资源**：依次执行 `@PreDestroy`、`DisposableBean#destroy`，关闭线程池、数据库连接等。

**注意事项**

- Tomcat、Jetty、Undertow、Reactor Netty 四种内嵌容器均支持。
- 自定义线程池需设置 `setWaitForTasksToCompleteOnShutdown(true)` 和 `setAwaitTerminationSeconds`，否则任务会被直接打断。
- 需配合 K8s `preStop` 钩子，确保负载均衡先摘除实例再停机，避免流量进入正在关闭的实例。

一句话总结：优雅停机 = “拒新请求 + 等存量完成 + 安全销毁资源”，一行配置开启，但要配合发布系统才能真正生效。

#### 🔬 扩展知识

::: details

- 【L3】实现机制：优雅停机由 SmartLifecycle 组件 `WebServerGracefulShutdownLifecycle` 驱动，它在容器关闭的最早阶段（最高 phase）触发 WebServer 的 `shutDownGracefully`，先拒新连接再等待存量请求，随后才轮到 Bean 销毁。
- 【L4】K8s 配套细节：SIGTERM 与 endpoints 摘除是并发的，单靠优雅停机仍会有流量窗口，标准做法是 `preStop: sleep 5-10s` 等待负载均衡更新，再依赖 graceful shutdown 消化存量；健康检查改接 `/actuator/health/readiness`，见本文档「SpringBoot Actuator 是什么？有哪些核心端点？」。

:::

#### 🔀 发散问题

- **Q：SpringBoot 支持哪些内嵌 Web 容器？如何切换？** → 四种内嵌容器均支持优雅停机，见本文档「SpringBoot 支持哪些内嵌 Web 容器？如何切换？」。
- **Q：SpringBoot 的启动流程是如何设计的？** → 停机是启动的镜像：事件与生命周期钩子同样生效，见本文档「SpringBoot 的启动流程是如何设计的？」。

## 资料

- [面试鸭 - SpringBoot 面试](https://www.mianshiya.com/bank/1790683494127804418)
