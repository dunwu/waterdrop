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

### 【简单】什么是 SpringBoot？

Spring Boot 是一个基于 Spring 框架的“开箱即用”的脚手架框架，它基于**约定优于配置**的原则，极大地简化了 Spring 应用的搭建和开发过程。

SpringBoot 的核心特性：

- **自动配置**：根据项目依赖**自动推断并配置**所需的 Bean（如引入 Web 依赖则自动配置 Tomcat + Spring MVC）。
- **starter 依赖**：将功能相关的依赖**打包成一个整体**（如 `spring-boot-starter-web`），解决版本兼容问题。
- **内嵌服务器**：内嵌服务器 Tomcat/Jetty，无需外部容器，打包成可执行 JAR 后一键运行 (`java -jar`)。
- **监控**：提供 **Actuator** 模块，轻松监控应用健康、性能等指标（通过 `/actuator/health` 等端点）。

## SpringBoot 架构

### 【中等】SpringBoot 是如何实现自动配置的？🌟🌟🌟

SpringBoot 自动配置的核心流程如下：

#### `@SpringBootApplication` 注解

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
- **`@ComponentScan` 注解**：自动扫描指定包及其子包下的所有被 `@Component` 等注解标记的类，并将它们注册为 Spring 容器中的 Bean 。默认，`@SpringBootApplication` 标注的类所在的包及其子包下的组件都会被扫描 。

#### `@EnableAutoConfiguration` 注解

**`@EnableAutoConfiguration` 注解**开启了 Spring Boot 的自动配置功能。

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

其中，最关键点在于 `@Import(AutoConfigurationImportSelector.class)` 注解，表示导入 `AutoConfigurationImportSelector`。`AutoConfigurationImportSelector` 正式自动导入配置的关键。

#### @Import(AutoConfigurationImportSelector.class)

`AutoConfigurationImportSelector` 会扫描 `META-INF/spring.factories` 文件中的自动配置类，并根据限制条件，选择性为应用自动初始化、注入合适的 Bean。

> 注：这其实就是 SpringBoot 的 SPI 机制。

#### spring.factories 文件

`spring.factories` 文件中列出了所有自动配置类，当 SpringBoot 启动时，会根据文件中指定的配置类加载相应的自动配置。

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

#### 自动配置类

自动配置类中有以下核心注解，来辅助它完成自动配置的能力。

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

#### 自动配置简化流程

```
@SpringBootApplication -> @EnableAutoConfiguration -> @Import({AutoConfigurationImportSelector.class}) -> 扫描 META-INF/spring.factories 文件 -> 自动加载文件中的配置 -> XXXAutoConfiguration 中根据 @ConditionalOnXXX 按需加载
```

### 【中等】SpringBoot 是如何通过 main 方法启动 web 项目的？🌟

Spring Boot 应用的启动流程都封装在 `SpringApplication.run` 方法中，它的大部分逻辑都是复用 Spring 启动的流程，只不过在它的基础上做了大量的扩展。

在启动的过程中有一个刷新上下文的动作，这个方法内会触发 webServer 的创建，此时就会创建并启动内嵌的 web 服务，默认的 web 服务就是 Tomcat。

Spring Boot 的启动过程几个核心步骤：

1. **`SpringApplication.run()`**：这是启动的入口，它会创建 Spring 应用上下文，并执行自动配置。
2. **创建应用上下文**：为 Web 应用创建 `AnnotationConfigServletWebServerApplicationContext` 上下文。
3. **启动内嵌 Web 服务器**：在 `refreshContext()` 阶段启动内嵌的 Web 服务器（如 Tomcat）。
4. **自动配置**：通过 `@EnableAutoConfiguration` 自动配置各种组件，如 `DispatcherServlet`。
5. **请求处理**：内嵌的 `DispatcherServlet` 负责处理 HTTP 请求。

### 【困难】SpringBoot 的启动流程是如何设计的？🌟🌟🌟

Spring Boot 启动流程大致分为六个关键阶段。

#### 实例化 SpringApplication

- **推断应用类型**（Servlet、Reactive、None）。
- **加载扩展**：从 `META-INF/spring.factories` 加载 `ApplicationContextInitializer` 和 `ApplicationListener`。

#### 运行 `run()` 方法

- 启动计时器，记录应用启动耗时。
- 发布第一个事件：**`ApplicationStartingEvent`**。

#### 准备环境

- 创建并配置环境，整合命令行参数、配置文件（`application.properties`）、系统属性等。
- 发布 **`ApplicationEnvironmentPreparedEvent`** 事件（触发配置文件的加载）。

#### 创建应用上下文 (ApplicationContext)

- 根据应用类型创建对应的 `ApplicationContext`（如 `AnnotationConfigServletWebServerApplicationContext`）。
- 将环境设置到上下文中，并执行 `ApplicationContextInitializer`。

#### 刷新应用上下文

1.  **准备 BeanFactory**。
2.  **执行 BeanFactoryPostProcessor**：核心为 **`ConfigurationClassPostProcessor`**，负责解析 `@Configuration`、`@ComponentScan` 和 **`@EnableAutoConfiguration`（自动配置的入口）**。
3.  **注册 BeanPostProcessor**（负责依赖注入 `@Autowired`、AOP 等）。
4.  **onRefresh() 方法（Spring Boot 精华）**：**创建并启动内嵌的 Web 服务器**（如 Tomcat）。
5.  **完成 BeanFactory 初始化**：**实例化所有非懒加载的单例 Bean**（调用所有 `BeanPostProcessor`，完成依赖注入和初始化）。

#### 发布事件与执行 Runner

- 发布最终事件 **`ApplicationReadyEvent`**（表示应用已完全就绪）。
- 执行所有 **`CommandLineRunner`** 和 **`ApplicationRunner`** 接口的实现，进行启动后初始化。

#### 设计思想总结

- **事件驱动**：通过发布一系列事件，将启动过程解耦，允许开发者监听并介入特定阶段。
- **工厂加载机制 (SPI)**：通过 `META-INF/spring.factories` 文件自动加载配置和组件，实现**约定优于配置**。
- **钩子方法**：提供大量扩展点（如 `*Aware`, `*Processor`, `*Runner` 接口），方便定制。
- **内嵌服务器**：在刷新上下文的 `onRefresh()` 钩子中启动 Web 服务器，这是独立运行（`java -jar`）的基石。

### 【困难】如何自定义一个 starter 包？🌟🌟🌟

#### 创建自动配置类

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

#### 创建属性配置类

为了让用户能够通过 `application.properties` 文件来自定义行为，需要创建一个属性类。

```java
@ConfigurationProperties(prefix = "my.service") // 绑定配置文件中以 my.service 为前缀的属性
public class MyServiceProperties {

    private String prefix = "Hello"; // 默认值
    private String suffix = "!";
    // 省略 getter 和 setter
}
```

#### 注册自动配置类

为了让 Spring Boot 发现自定义的自动配置类，需要在 Jar 包的 `resources` 目录下创建一个特定的文件：

**文件位置：** `src/main/resources/META-INF/spring.factories`

**文件内容：**

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.yourcompany.autoconfig.MyServiceAutoConfiguration
```

Spring Boot 在启动时会扫描所有 Jar 包中的这个文件，并将列出的类作为候选自动配置类进行加载和条件判断。

#### 创建自定义 Starter

一个完整的“自动配置”通常会打包成一个 **Starter**。Starter 的本质是一个空的 Maven 项目，它只做两件事：

1. 提供 `pom.xml`，管理相关依赖。
2. 提供 `META-INF/spring.factories` 文件，注册自动配置类。

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

#### 提供元数据提示（可选）

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

## 资料

- [面试鸭 - SpringBoot 面试](https://www.mianshiya.com/bank/1790683494127804418)