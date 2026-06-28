---
title: Spring 面试
date: 2018-08-02 17:33:32
categories:
  - Java
  - 框架
  - Spring
tags:
  - Java
  - 框架
  - Spring
  - 面试
permalink: /pages/570851bb/
---

# Spring 面试

## 综合

### 【简单】什么是 Spring？

- Spring 是一个开源企业级 **Java 开发框架**，旨在**简化复杂应用的构建**。
- 它是**轻量级**、**松散耦合**的。
- 它具有**分层体系结构**，允许用户选择组件，同时还为 J2EE 应用程序开发提供了一个有凝聚力的框架。
- 它**可以集成其他框**架，如 Structs、Hibernate、EJB 等，所以又称为框架的框架。

### 【简单】Spring 有哪些优点？

Spring 的核心优点在于其非侵入式设计、强大的**解耦**能力以及**完整的生态体系**。具体来说：

- **轻量级与低侵入**：Spring 的 API 不会侵入业务代码，应用组件无需实现框架特定接口，易于替换和测试。
- **IoC 容器解耦**：通过控制反转（IoC）管理对象依赖，降低组件间的耦合度，提升代码的可维护性和可扩展性。
- **AOP 支持**：面向切面编程将日志、事务等通用功能与业务逻辑分离，实现横切关注点的模块化复用。
- **声明式事务**：通过注解或 XML 配置即可管理事务，摆脱复杂的事务 API 编码。
- **生态丰富**：无缝集成持久层框架（MyBatis/Hibernate）、安全框架（Spring Security）、微服务套件（Spring Cloud）等，覆盖企业开发全场景。
- **测试友好**：依赖注入使单元测试和集成测试更加便捷，支持 Mock 对象和测试上下文框架。
- **模块化分层**：按需引入模块（如 Web、数据访问、消息），避免臃肿依赖。

这些优点使 Spring 成为 Java 企业级开发的事实标准，既能简化开发，又能保障架构的灵活性和稳定性。

### 【中等】Spring 有哪些模块？⭐

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/spring-framework.png)

Spring 的核心模块主要包括以下部分：

- **Core Container 模块**
  - **Spring Core**：提供控制反转（IoC）和依赖注入（DI）功能，是 Spring 框架的基础。
  - **Spring Beans**：管理 Bean 的生命周期和依赖关系，提供 BeanFactory，用于创建和管理对象。
  - **Spring Context**：建立在 Core 和 Beans 模块之上，提供配置、国际化、事件传播等功能。
  - **Spring Expression Language（SpEL）**：支持运行时查询和操作对象图的表达式语言。
- **AOP 模块**
  - **Spring AOP**：提供面向切面编程的支持，实现横切关注点的模块化，如日志、事务管理。
  - **Aspects**：与 AspectJ 集成，提供更强大的 AOP 功能。
- **数据访问/集成模块**
  - **Spring JDBC**：简化 JDBC 操作，提供异常处理和资源管理。
  - **Spring ORM**：集成主流 ORM 框架，如 Hibernate、JPA，提供统一的 DAO 支持。
  - **Spring Transactions**：提供声明式和编程式事务管理，确保数据一致性。
- **Web 模块**
  - **Spring Web**：提供 Web 应用程序开发的基础功能，如多部分文件上传。
  - **Spring MVC**：基于 MVC 设计模式的 Web 框架，支持灵活的视图技术。
  - **Spring WebFlux**：响应式编程模型，支持非阻塞式 Web 应用。
- **测试模块**
  - **Spring Test**：提供对单元测试和集成测试的支持，简化测试代码的编写。
- **其他模块**
  - **Spring Instrumentation**：提供类加载器和类植入支持。
  - **Spring Messaging**：支持消息传输，如 STOMP 协议和 WebSocket。

这些核心模块共同构成了 Spring 框架的基础，为开发者提供了全面的解决方案，简化了 Java 应用程序的开发。

### 【简单】Spring 有哪些里程碑版本？

| 版本           | 发布时间 | 核心特性                                                    | 时代意义                                                       |
| :------------- | :------- | :---------------------------------------------------------- | :------------------------------------------------------------- |
| **Spring 1.x** | 2004 年  | IoC 容器、XML 配置、AOP 支持、声明式事务                    | 颠覆 EJB，奠定 Spring 在 Java 企业级开发的基础地位             |
| **Spring 2.x** | 2006 年  | XML Schema 简化配置、注解支持、AspectJ 整合                 | 开启配置简化之路，让开发者从繁琐的 XML 中初步解放              |
| **Spring 3.x** | 2009 年  | Java 配置类、REST API 支持、SpEL 表达式语言                 | 开启 Java 配置时代，适应 Web 2.0 和移动端对 RESTful 服务的需求 |
| **Spring 4.x** | 2013 年  | Java 8 支持、WebSocket、条件化配置                          | 全面拥抱 Java 8，为实时双向通信应用提供支持                    |
| **Spring 5.x** | 2017 年  | 响应式编程、WebFlux 模块、函数式风格                        | 引入响应式编程范式，解决高并发场景下的资源利用率问题           |
| **Spring 6.x** | 2022 年  | Java 17 基线、Jakarta EE 9+、GraalVM 原生镜像、虚拟线程支持 | 拥抱云原生，通过提前编译和虚拟线程实现极致性能优化             |

### 【简单】Spring 和 Spring MVC 之间是什么关系？

- Spring 是基础框架，提供 IoC、AOP 等核心能力；
- Spring MVC 是 Spring 的一个 Web 模块，专门处理 HTTP 请求和视图渲染。
- Spring MVC 依赖 Spring 核心运行，是 Spring 在 Web 层的具体实现。

### 【简单】Spring、SpringBoot、SpringCloud 之间是什么关系？

- Spring 是生态的基石，提供 IoC、AOP 等核心能力；
- Spring Boot 是构建在 Spring 之上的快速开发脚手架，通过自动配置和内嵌服务器简化应用搭建；
- Spring Cloud 是基于 Spring Boot 的微服务治理套件，用于构建分布式系统中的服务发现、配置管理等基础设施。

三者形成递进关系：Spring 做基础，Spring Boot 做单服务，Spring Cloud 做集群。

### 【中等】Spring 中用到了哪些设计模式？⭐⭐

| 设计模式         | Spring 中的应用场景                      | 目的                         |
| :--------------- | :--------------------------------------- | :--------------------------- |
| **工厂模式**     | `BeanFactory`, `ApplicationContext`      | 解耦对象的创建与使用         |
| **单例模式**     | Bean 的默认作用域                        | 保证一个类只有一个实例       |
| **代理模式**     | AOP（如 `@Transactional`）               | 控制对象访问，增强功能       |
| **模板方法模式** | `JdbcTemplate`, `RestTemplate`           | 封装固定流程，简化开发       |
| **观察者模式**   | 应用事件（`ApplicationEvent`）           | 实现事件驱动，解耦组件       |
| **策略模式**     | `Resource`, `PlatformTransactionManager` | 封装可互换的算法族           |
| **适配器模式**   | `HandlerAdapter`                         | 转换接口，使不兼容的类能合作 |
| **装饰者模式**   | `HttpServletRequestWrapper`              | 动态增强对象功能             |

### 【中等】Spring 通知有哪些类型？

## Bean

### 【简单】什么是 Spring Bean？

在 Spring 中，构成应用程序主体，由 Spring IoC 容器管理的对象称为 Bean。

**Bean 是由 Spring IoC 容器实例化、装配和管理的对象**。 Bean 以及它们之间的依赖关系反映在容器使用的配置元数据中。

Spring IoC 容器本身，并不能识别配置的元数据。为此，要将这些配置信息转为 Spring 能识别的格式——`BeanDefinition` 对象。

**`BeanDefinition` 是 Spring 中定义 Bean 的配置元信息接口**，它包含：

- Bean 类名
- Bean 行为配置元素，如：作用域、自动绑定的模式、生命周期回调等
- 其他 Bean 引用，也可称为合作者（Collaborators）或依赖（Dependencies）
- 配置设置，如 Bean 属性（Properties）

### 【简单】Spring Bean 注册有几种方式？⭐

Spring Bean 的注册方式主要有以下方式：

- **XML 配置文件**：传统方式，在 XML 中通过 `<bean>` 标签显式定义 Bean 的类名、属性和依赖。
- **注解 + 组件扫描**：使用 `@Component`、`@Service`、`@Repository`、`@Controller` 标注类，并通过 `@ComponentScan` 或 XML `<context:component-scan>` 自动扫描注册。
- **Java 配置类**：在 `@Configuration` 类中通过 `@Bean` 注解方法，方法返回的对象被注册为 Bean。
- **@Import 注解**：导入普通类（自动注册为 Bean）、`@Configuration` 类、或实现 `ImportSelector` / `ImportBeanDefinitionRegistrar` 的类，实现动态注册。

### 【中等】Spring Bean 支持哪些作用域？⭐⭐

Spring Bean 一共有 **6 种**作用域，分为两类：**通用作用域**和 **Web 专用作用域**。

**通用作用域（2 种）**

适用于非 Web 环境的核心场景。

| 作用域                 | 核心特征                                                                            | 适用场景                                         |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| **singleton** （单例） | **默认作用域**。整个 IoC 容器中只有**一个实例**，所有依赖注入拿到的都是同一个对象。 | 适合**无状态**的 Service、DAO 层组件。           |
| **prototype** （多例） | 每次从容器**获取** Bean 时都会 **new 一个新实例**，容器只负责创建，不负责销毁。     | 适合有**状态**的对象，如用户会话相关的数据封装。 |

**Web 专用作用域（4 种）**

只能在 Spring Web 应用（如 Spring MVC）中使用。

| 作用域          | 核心特征                                         | 生命周期                                                           |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| **request**     | 每个 **HTTP 请求**创建一个实例。                 | **请求结束后**销毁。                                               |
| **session**     | 同一个 **HTTP Session** 共享一个实例。           | **Session 失效后**销毁。                                           |
| **application** | 整个 **ServletContext** 生命周期内只有一个实例。 | 比 Singleton 范围更大，**Spring 容器共享**，等同于应用级全局单例。 |
| **websocket**   | 每个 **WebSocket 会话**一个实例。                | **会话关闭时**销毁。                                               |

### 【困难】Spring Bean 的生命周期是怎样的？⭐⭐⭐

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2021/12/843b87f616f1495596adabca5bc2db4b.png)

Spring Bean 容器的生命周期如下：

- **实例化**：Spring 容器根据配置文件或注解实例化 Bean 对象。
- **属性注入**：Spring 将依赖（通过构造器、setter 方法或字段注入）注入到 Bean 实例中。
- **初始化前的扩展机制**：如果 Bean 实现了 BeanNameAware 等 aware 接口，则执行 aware 注入。
- **初始化前（BeanPostProcessor）**：在 Bean 初始化之前，可以通过 BeanPostProcessor 接口对 Bean 进行一些额外的处理。
- **初始化**：调用 InitializingBean 接口的 afterPropertiesSet () 方法或通过 init-method 属性指定的初始化方法。
- **初始化后（BeanPostProcessor）**：在 Bean 初始化后，可以通过 BeanPostProcessor 进行进一步的处理。
- **使用 Bean**：Bean 已经初始化完成，可以被容器中的其他 Bean 使用。
- **销毁**：当容器关闭时，Spring 调用 DisposableBean 接口的 destroy () 方法或通过 destroy-method 属性指定的销毁方法。

### 【中等】Spring 的单例 Bean 是否有并发安全问题？

Spring 的单例 Bean 本身**并不保证线程安全**，其是否存在并发安全问题取决于 Bean 的内部状态。

- **无状态 Bean**：若 Bean 中没有成员变量，或成员变量是不可变的（如 `final` 常量）、线程安全的（如 `AtomicInteger`、`ConcurrentHashMap`），则多个线程共享此实例是安全的。Controller、Service、DAO 通常设计为无状态，因此安全。
- **有状态 Bean**：若 Bean 包含可变的成员变量（如普通 `int`、`ArrayList`），则多个线程并发读写这些变量会导致数据不一致，存在线程安全问题。

**解决方案**：

1. 将 Bean 作用域改为 `prototype`，每次请求创建新实例（避免共享）。
2. 使用线程安全的容器或同步机制（如 `synchronized`、`Lock`）保护可变状态。
3. 使用 `ThreadLocal` 为每个线程维护独立的变量副本。
4. 尽量设计为无状态 Bean，将状态数据存储在外部（如数据库、缓存）或通过方法参数传递。

**总结**：Spring 单例 Bean 的并发安全问题源于共享的可变状态，而非 Spring 容器本身。

### 【中等】Spring 是如何启动的？⭐⭐

Spring 启动的核心是 IoC 容器的初始化，分为以下关键阶段：

1. **加载配置**：读取 XML、Java Config 或组件扫描，创建 `ApplicationContext`，加载 `BeanDefinition` 元数据。
2. **解析 BeanDefinition**：将配置解析为 Bean 的规格说明（类名、作用域、依赖、初始化方法等），此时未创建对象。
3. **实例化 Bean**：根据 `BeanDefinition` 通过反射创建对象实例（默认实例化所有单例 Bean，懒加载除外）。
4. **依赖注入**：通过构造器、Setter 或字段注入装配依赖。
5. **BeanPostProcessor 前置处理**：调用 `postProcessBeforeInitialization`，AOP 代理在此阶段织入。
6. **初始化回调**：依次执行 `@PostConstruct`、`InitializingBean.afterPropertiesSet()`、自定义 `init-method`。
7. **BeanPostProcessor 后置处理**：调用 `postProcessAfterInitialization`。
8. **容器就绪**：发布 `ContextRefreshedEvent` 事件，应用对外服务。

**注意**：初始化回调位于两个 `BeanPostProcessor` 调用之间，顺序固定。

### 【中等】什么是自动装配？⭐⭐

Spring 的自动装配，就是让容器根据某种规则自动把依赖注入进去，不用手动写 `<property>` 或者 `ref=`。

默认情况下，Spring 容器中未打开注解装配。因此，要使用基于注解装配，我们必须通过配置`<context：annotation-config />` 元素在 Spring 配置文件中启用它。

从 XML 配置的角度，autowire 属性有 4 种取值：

- **no**：默认值，不自动装配，依赖必须显式声明
- **byName**：根据属性名去容器里找同名的 Bean 注入。比如属性叫 userDao，就找 id="userDao" 的 Bean
- **byType**：根据属性类型去容器里找唯一匹配的 Bean 注入。如果找到多个同类型的 Bean 会报错
- **constructor**：跟 byType 类似，但是是通过构造函数参数类型匹配

不过现在主流都用注解方式了，@Autowired 默认按类型装配，配合 @Qualifier 可以指定名称。@Resource 是 JSR-250 规范的，默认按名称装配。

## IoC

### 【中等】什么是 IoC？什么是依赖注入？什么是 Spring IoC？⭐⭐⭐

**控制反转（IoC）**是一种**设计思想**：将对象的**创建控制权**从程序内部“反转”给**外部容器**，目的是**解耦**。

**依赖注入（DI）**是实现 IoC 的**具体技术**：由容器**动态地**将依赖关系**注入**到对象中（通过构造器或 Setter）。

**Spring IoC** 是 Spring 对 **IoC/DI 的实现**。Spring 的 **IoC 容器**负责管理所有对象（称为 **Bean**），包括创建、组装和管理其生命周期。

一言以蔽之：遵循 **IoC** 思想，通过 **DI** 技术实现，而 **Spring IoC** 就是最主流的实现容器。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2022/10/49a819c968434375b7a40e9edf468081.png)

### 【中等】Spring 一共有几种注入方式？⭐⭐

依赖注入有如下方式：

| 依赖注入方式        | 配置元数据举例                                     |
| ------------------- | -------------------------------------------------- |
| **构造器注入**      | `<constructor-arg name="user" ref="userBean" />`   |
| **Setter 方法注入** | `<proeprty name="user" ref="userBean"/>`           |
| **字段注入**        | `@Autowired User user;`                            |
| **方法注入**        | `@Autowired public void user(User user) { ... }`   |
| **接口回调注入**    | `class MyBean implements BeanFactoryAware { ... }` |

### 【中等】Spring IOC 容器如何初始化？⭐⭐

Spring IoC 容器初始化分为四个核心阶段：

- **加载配置**：加载配置元数据（XML、注解或 Java Config），创建 `ApplicationContext` 实例，调用 `refresh()` 方法启动容器。
- **Bean 注册**：`BeanDefinitionReader` 解析配置，将每个 Bean 的元信息（类名、作用域、依赖等）封装为 `BeanDefinition`，并注册到 `BeanDefinitionRegistry`。此时仅登记“图纸”，未实例化。
- **实例化与依赖注入**：根据 `BeanDefinition` 创建 Bean 实例（单例非懒加载在容器启动时创建）。实例化后，通过构造器、Setter 或字段注入完成依赖装配。
- **初始化**：依次执行 `Aware` 接口回调、`BeanPostProcessor` 前置处理、`@PostConstruct`、`InitializingBean.afterPropertiesSet()`、自定义 `init-method`，最后执行 `BeanPostProcessor` 后置处理，完成 Bean 的初始化。

### 【中等】Spring 自动装配的方式有哪些？⭐

**XML 自动装配模式**（`<bean autowire="">`）：

- `no`：默认，不自动装配，需手动声明依赖。
- `byName`：根据属性名匹配容器中同名的 Bean。
- `byType`：根据属性类型匹配唯一 Bean，存在多个同类型则报错。
- `constructor`：通过构造器参数类型匹配，类似 `byType`。

**主流注解方式**：

- `@Autowired`：Spring 原生，默认按类型装配，可配合 `@Qualifier` 指定名称。
- `@Resource`：JSR-250 规范，默认按名称装配，名称不匹配时降级为类型。

### 【中等】Spring 中的 ObjectFactory 是什么？

`ObjectFactory<T>` 是 Spring 提供的函数式接口，仅含 `T getObject()` 方法，核心作用是**延迟获取 Bean 实例**。

注入 `ObjectFactory<T>` 而非直接注入 `T` 时，容器仅在调用 `getObject()` 时才真正创建或获取 Bean，实现按需加载，**常用于避免提前初始化、解决循环依赖（三级缓存机制）及支持作用域代理**。

### 【简单】BeanFactory 和 ApplicationContext 有什么区别？⭐

在 Spring 中，有两种 IoC 容器：`BeanFactory` 和 `ApplicationContext`。

- `BeanFactory`：**`BeanFactory` 是 Spring 基础 IoC 容器**。`BeanFactory` 提供了 Spring 容器的配置框架和基本功能。
- `ApplicationContext`：**`ApplicationContext` 是具备应用特性的 `BeanFactory` 的子接口**。它还扩展了其他一些接口，以支持更丰富的功能，如：国际化、访问资源、事件机制、更方便的支持 AOP、在 web 应用中指定应用层上下文等。

实际开发中，更推荐使用 `ApplicationContext` 作为 IoC 容器，因为它的功能远多于 `BeanFactory`。

### 【简单】BeanFactory 和 FactoryBean 有什么区别？⭐

**`BeanFactory` 是 Spring 基础 IoC 容器**。

**`FactoryBean` 是创建 Bean 的一种方式**，帮助实现复杂的初始化逻辑。

### 【困难】Spring 如何解决循环依赖？⭐⭐⭐

**循环依赖**是指**多个 Bean 相互持有对方的引用，形成一个闭环依赖关系**，导致 Spring 容器在实例化时无法确定创建顺序的问题。

**Spring 采用三级缓存来解决循环依赖**，其关键是：**提前暴露未完全创建完毕的 Bean**。

三级缓存：

- **一级缓存（singletonObjects）**：这是成品货架。放的都是完全初始化、可以直接用的 Bean
- **二级缓存（earlySingletonObjects）**：这是半成品货架。放的是已经实例化（new 出来了），但还没填充属性的 Bean
- **三级缓存（singletonFactories）**：这是工厂货架。这里放的不是 Bean 本身，而是一个能生产 Bean 的工厂（lambda 表达式），这是解决问题的关键。

解决步骤：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/321e07e5f17840b3833391e6d95c8140.png)

1. **实例化 & 暴露工厂**：实例化 Bean A 后，立即将其工厂放入**三级缓存**，**提前暴露引用**。
2. **填充属性时循环引用**：为 A 注入 B 时，触发创建 B。B 在注入 A 时，能从**三级缓存**的工厂中获取到 A 的早期引用。
3. **升级缓存 & 完成注入**：将获取到的早期引用 A 放入**二级缓存**，并注入给 B，从而让 B 和 A 都能顺利完成创建。

### 【困难】Spring 解决循环依赖为什么一定要用三级缓存？⭐⭐⭐

选择**三级缓存**而非二级缓存，主要出于 **AOP 代理**的考虑，而非单纯解决循环依赖。

- **二级缓存问题**：如果使用二级缓存，必须在 Bean **实例化后立即创建代理**。这违背了 Spring 在 Bean **初始化完成后才创建代理**的设计原则，且可能导致注入的是原始对象而非最终代理对象。
- **三级缓存优势**：三级缓存存储的是**一个能生产最终代理对象的工厂**。当发生循环依赖时，由工厂动态决定返回原始对象还是代理对象，从而**确保注入的总是最终版本的对象**，同时遵守了代理的创建时机原则。

一言以蔽之：**三级缓存通过一个延迟处理的工厂，确保了在循环依赖中注入的也是最终的代理对象，维护了 AOP 与 IOC 的正确行为**。

## AOP

### 【简单】什么是 AOP？⭐⭐⭐

**AOP（面向切面编程）**是一种编程思想，**将与核心业务无关的公共功能（如日志、事务）从业务代码中剥离出来，集中管理和复用**，作为 OOP（面向对象编程）的有效补充。

**为什么需要 AOP？**

解决 **“横切关注点”** 问题，即那些分散在各个模块中的重复性代码（如日志、安全、事务）。目标是：**解耦、避免代码重复、提升可维护性**。换句话说，**AOP 能在不修改原有业务代码的情况下，给程序动态、统一地添加功能**。

**AOP 核心概念**

- **切面（Aspect）**：**“做什么”**。封装公共功能的模块（如日志模块）。
- **切点（Pointcut）**：**“在哪做”**。通过表达式匹配需要切入的具体方法。
- **连接点（JoinPoint）**：**“可以做的点”**。程序执行中的节点（如方法调用），是切点的具体实例。
- **通知（Advice）**：**“何时做”**。定义切面工作的具体时机（如方法调用前、后）。
  - **前置通知（Before）**：方法执行前触发
  - **后置返回通知（After returning）**：方法正常返回后触发
  - **后置异常通知（After throwing）**：方法抛异常后触发
  - **后置最终通知（After finally）**：不管正常还是异常都会触发，类似 `finally`
  - **环绕通知（Around）**：在目标方法执行前后都执行。能控制方法是否执行、修改返回值。日志打印和性能监控常用这个
- **目标对象（Target Object）**：被增强的原始业务对象，对切面逻辑无感知。
- **代理（Proxy）**：Spring 生成的增强对象，若目标类实现了接口则使用 JDK 动态代理，否则使用 CGLIB 代理。
- **织入（Weaving）**：将切面应用到目标对象并生成代理的过程。Spring AOP 采用运行时织入（AspectJ 支持编译时、类加载时织入）。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/core/spring-aop.png)

### 【中等】Spring AOP 有哪些实现方式？⭐⭐⭐

Spring AOP 基于**动态代理**，主要分为两种实现方式：

- **JDK 动态代理**
  - **条件**：代理**实现了接口**的类。
  - **原理**：通过反射创建**实现了相同接口**的代理对象。运行时通过 `java.lang.reflect.Proxy` 动态生成一个实现了目标接口的代理类。调用代理方法时，实际上是调用 `InvocationHandler` 的 `invoke()` 方法，再反射调用真实对象。
  - **限制**：只能代理**接口中定义的方法**。

- **CGLIB 代理**
  - **条件**：代理**未实现接口**的类。
  - **原理**：通过**字节码技术**生成目标类的**子类**作为代理对象。利用 ASM 字节码框架在运行时生成目标类的子类，通过重写父类方法来插入切面逻辑。
  - **限制**：因为实现基于继承父类，所以无法代理 **`final` 类** 或 **`final`/`static` 方法**。

**选择策略**

- **默认行为**：有接口用 **JDK**，无接口用 **CGLIB**。
- **强制配置**：可通过设置 `proxy-target-class=true` **强制**所有情况都使用 **CGLIB**。

**一句话总结**：Spring AOP 在运行时通过 **JDK 代理（基于接口）** 或 **CGLIB 代理（基于继承）** 动态生成代理对象，从而将切面逻辑织入目标方法。

### 【中等】Spring AOP 和 AspectJ 有什么区别？

Spring AOP 与 AspectJ 定位截然不同：

- Spring AOP 是 Spring 内置的轻量级实现，依赖运行时代理（JDK 或 CGLIB），仅能拦截 Spring 容器中 Bean 的公共方法，简单易用；
- AspectJ 是完整的 AOP 框架，支持编译时/类加载时/运行时织入，通过字节码操作可拦截构造器、字段、静态方法等，切点表达式更强大，性能更优但配置复杂。

核心差异速记：

- 织入时机：Spring AOP 仅运行时；AspectJ 支持编译时/类加载时/运行时。
- 实现方式：Spring AOP 为动态代理；AspectJ 为直接修改字节码。
- 拦截范围：Spring AOP 仅方法；AspectJ 涵盖构造器、字段、静态方法等。
- 使用门槛：Spring AOP 开箱即用；AspectJ 需额外编译器或 agent。

选型建议：绝大多数业务场景 Spring AOP 足够，仅在需要拦截非 Spring Bean、构造函数，或对极致性能有要求时才考虑 AspectJ。

### 【中等】Spring 拦截链如何实现？⭐⭐

Spring 拦截链本质是将多个拦截器串联成链（职责链模式），依次处理请求，实现日志、权限、事务等横切关注点，避免侵入业务代码。

Spring 有三种主要的拦截方式：

- **Filter（过滤器）**：基于 Servlet API，在请求进入 Spring MVC 之前就能拦截，能拦截所有进出容器的请求、包括静态资源、JSP 等。适合做编码转换、跨域处理、安全过滤这类底层操作。
- **HandlerInterceptor（拦截器）**：Spring MVC 层面的拦截，只能拦截经过 DispatcherServlet 的请求。通过 `preHandle`、`postHandle`、`afterCompletion` 三个方法，分别在 Controller 执行前后、请求完成后进行处理。
- **AOP 切面**：方法级别的拦截，通过 `@Before`、`@After`、`@Around` 等注解，精确控制在目标方法执行前后切入。

一个请求从进入到返回，完整的执行流程是这样的：

- **进入**：请求到达 Servlet 容器，**Filter 链**按 order 从小到大依次执行 `doFilter()` 的前半段。
- **路由**：进入 DispatcherServlet，根据 URL 找到 Handler。
- **前置拦截**：**Interceptor** 按**顺序**执行 `preHandle` 方法。
- **业务执行**：若所有 `preHandle` 返回 true，执行 Controller 方法。
- **后置处理**：Controller 返回后，**倒序**执行 Interceptor 的 `postHandle` 方法。
- **视图渲染**：完成视图渲染后，**倒序**执行 Interceptor 的 `afterCompletion` 方法。
- **退出**：响应返回时，**倒序**执行 Filter 链的后半段。

## 数据

### 【中等】Spring DAO 有哪些异常？

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/data-access/spring-data-access-exception.png)

### 【中等】什么是 Spring 的事务管理？

Spring 支持声明式、编程式、注解式定义事务。

Spring 事务定义的属性有：

- **隔离级别**：`DEFAULT`（使用数据库默认），`READ_COMMITTED`，`REPEATABLE_READ` 等
- **传播行为**：`REQUIRED`（默认），`REQUIRES_NEW`，`NESTED`，`SUPPORTS` 等
- **回滚规则**：指定哪些异常触发回滚
- **是否只读**
- **事务超时**

### 【中等】Spring 事务支持哪些隔离级别？⭐

- **default（默认）**：使用数据库默认隔离级别（通常为 read_committed）。
- **read_uncommitted（读未提交）**：可读未提交数据，可能出现脏读、不可重复读、幻读。
- **read_committed（读已提交）**：只读已提交数据，避免脏读，但可能出现不可重复读、幻读。
- **repeatable_read（可重复读）**：保证多次读取结果一致，避免脏读、不可重复读，但可能出现幻读。
- **serializable（可串行化）**：事务串行执行，避免所有并发问题，但性能最低。

### 【中等】Spring 事务支持哪些传播行为？⭐

Spring 事务传播行为共 7 种，定义在 `Propagation` 枚举中：

- **required**：默认，支持当前事务，不存在则新建。
- **supports**：支持当前事务，不存在则以非事务方式执行。
- **mandatory**：支持当前事务，不存在则抛出异常。
- **requires_new**：新建事务，挂起当前事务。
- **not_supported**：以非事务方式执行，挂起当前事务。
- **never**：以非事务方式执行，存在事务则抛出异常。
- **nested**：嵌套事务，基于保存点实现，子事务回滚不影响外层。

### 【中等】Spring 事务传播行为有什么用？

Spring 事务传播行为用于**定义多个事务方法相互调用时的事务边界控制**，解决“事务如何传递”的问题。在实际调用链中，若无传播机制，各方法独立开启事务将破坏数据一致性。

传播行为规定了当前方法被已有事务调用时的处理策略：可加入现有事务（REQUIRED）、新建独立事务（REQUIRES_NEW）、以非事务方式执行（SUPPORTS/NOT_SUPPORTED）等。典型应用包括：多个操作共享事务保证整体成功或失败（如订单与库存）；某些操作独立于主事务即使主流程失败也需提交（如审计日志）；强制事务存在或不存在以规避误用。

### 【中等】Spring 事务在什么情况下会失效？⭐

Spring 事务最常见失效原因如下：

- **非 public 方法**：`@Transactional` 仅对 public 方法生效，代理无法拦截非 public 调用。
- **同类内部调用**：同一类中方法直接调用带事务的方法（`this.method()`），未经过代理，事务不生效。需通过代理对象调用。
- **异常类型不匹配**：默认只回滚 `RuntimeException` 和 `Error`，若抛出 checked 异常且未在 `rollbackFor` 中指定，事务不回滚。
- **异常被捕获**：方法内捕获异常后未重新抛出，事务无法感知异常，不会回滚。
- **数据库引擎不支持事务**：如 MySQL 的 MyISAM 表不支持事务。
- **方法被 final 或 static 修饰**：CGLIB 无法通过子类代理 final 方法，事务失效。
- **未正确配置事务管理器**：多数据源时未指定 `transactionManager`，或未启用事务管理（缺少 `@EnableTransactionManagement`）。

### 【中等】Spring 中的 JPA 和 Hibernate 有什么区别？

JPA（Java Persistence API）是 ORM 规范，定义了一套标准接口和注解（如 `EntityManager`、`@Entity`）；Hibernate 是 JPA 的具体实现，也是 Spring 默认集成的 JPA 提供者。在 Spring 中，通常通过 Spring Data JPA 操作 JPA 接口，底层由 Hibernate 执行实际的持久化逻辑。使用 JPA 规范可使代码与具体实现解耦，便于切换；而直接使用 Hibernate 原生 API 则可访问其特有功能（如二级缓存、HQL 扩展）。

## MVC

### 【中等】说下对 Spring MVC 的理解？

Spring MVC 是 Spring 框架的 Web 模块，基于 MVC 分层架构设计：

- **Model**：封装数据模型
- **View**：负责视图渲染（JSP、Thymeleaf 或 JSON）
- **Controller**：处理请求，协调模型与视图

Spring MVC 核心组件为前端控制器 **DispatcherServlet**，它统一接收所有请求，通过注解（如 `@RequestMapping`）映射到具体处理方法，替代传统 Servlet 的繁琐配置，显著降低开发成本。

典型分层结构：

- **Controller 层**：接收 HTTP 请求，调用 Service，返回视图或数据
- **Service 层**：封装业务逻辑与事务控制
- **Repository/DAO 层**：数据持久化操作
- **View 层**：渲染页面或输出 JSON（前后端分离场景）

Spring MVC 的引入使 Web 层关注点分离，代码简洁且易于维护。

### 【困难】Spring MVC 如何工作？⭐⭐⭐

**Spring MVC 的核心是 `DispatcherServlet`，它充当了前端控制器（Front Controller）的模式，是所有请求的统一入口，负责协调各个组件完成请求处理**。

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/web/spring-dispatcher-servlet.png)

**请求流程**

1. **用户请求**：用户通过浏览器发送 HTTP 请求到服务器。
2. **DispatcherServlet 接收请求**：作为前端控制器，DispatcherServlet 拦截所有请求。
3. **HandlerMapping 映射处理器**：DispatcherServlet 调用 HandlerMapping，根据请求的 URL 找到对应的处理器（Controller）。
4. **HandlerAdapter 调用处理器**：DispatcherServlet 通过 HandlerAdapter 调用具体的 Controller 方法，执行业务逻辑。
5. **处理器返回 ModelAndView**：处理器处理完请求后，返回包含模型数据和视图信息的 ModelAndView 对象。
6. **ViewResolver 解析视图**：DispatcherServlet 使用 ViewResolver 将逻辑视图名解析为具体的视图实现（如 JSP）。
7. **渲染视图**：视图组件将模型数据填充到视图中，生成最终的响应内容。
8. **返回响应**：DispatcherServlet 将渲染后的视图返回给客户端，完成请求-响应的整个过程。

**配置与扩展**

- 注解支持：使用 `@Controller`、`@RequestMapping` 等注解简化开发。
- 拦截器（Interceptor）：在请求处理前后执行额外的逻辑，如权限检查、日志记录等。
- 数据绑定与验证：提供数据绑定和验证机制，方便处理表单数据。
  通过以上流程和组件，Spring MVC 实现了请求的分发、处理、视图渲染等功能，使开发者能够高效地开发 Web 应用程序。

### 【中等】Spring MVC 有哪些核心组件？⭐⭐

Spring MVC 的核心组件围绕 `DispatcherServlet` 展开工作：

- **`DispatcherServlet`（前端控制器）**：负责接收请求并协调其他组件的工作。
- **`HandlerMapping`（处理映射器）**：根据请求的 URL，将请求映射到对应的处理器。
- **`HandlerAdapter`（处理适配器）**：调用处理器方法，并处理返回结果。
- **`Controller`（处理器）**：处理具体的业务逻辑，生成模型和视图信息。
- **`ViewResolver`（视图解析器）**：将逻辑视图名解析为实际的视图实现。
- **`View`（视图）**：负责将模型数据渲染成最终的响应内容。
- **`HandlerInterceptor`（拦截器）**：在 Controller 执行前后插入自定义逻辑，比如权限校验、日志记录、性能监控。

### 【中等】Spring MVC 中的 Controller 是什么？

Spring MVC 中的 Controller 是控制层组件，负责处理 HTTP 请求并返回响应。

前端控制器 `DispatcherServlet` 拦截请求，通过 `HandlerMapping` 定位到具体 Controller 方法，再由 `HandlerAdapter` 执行，最后处理返回值。

Controller 核心职责与工作方式如下：

- **职责**：接收并解析请求参数，调用 Service 层业务逻辑，将结果封装为 Model 并选择视图渲染，或直接返回数据（如 JSON）。
- **注解标识**：
  - `@Controller`：用于传统 MVC 模式，通常配合视图技术。
  - `@RestController`：组合 `@Controller` 与 `@ResponseBody`，所有方法默认返回数据而非视图，适用于前后端分离。
- **请求映射**：通过 `@RequestMapping` 及其变体（`@GetMapping`、`@PostMapping` 等）将 URL 绑定到处理方法。

### 【中等】Spring MVC 中如何处理表单提交？

- **参数绑定**：方法参数支持多种注解，自动从请求中取值并转换类型：
  - `@RequestParam`：获取请求参数。
  - `@PathVariable`：获取路径变量。
  - `@RequestBody`：绑定请求体（JSON/XML）。
  - `@ModelAttribute`：绑定表单数据到对象。
- **返回值处理**：
  - `String`：逻辑视图名。
  - `ModelAndView`：包含视图名和模型数据。
  - POJO 或 `ResponseEntity`：通过 `HttpMessageConverter` 自动序列化为 JSON/XML。

### 【中等】Spring MVC 中的视图解析器有什么作用？

Spring MVC 中的视图解析器（ViewResolver）用于将控制器返回的逻辑视图名称解析为具体的视图对象（View）。其核心作用是解耦控制器与视图技术，控制器只需返回逻辑名（如 "userList"），无需关心实际渲染使用 JSP、Thymeleaf 还是其他模板。通过配置视图解析器（如设置前缀后缀），可统一管理视图位置并灵活切换视图技术。多个视图解析器可组成链式顺序尝试解析，直至成功。最终由 DispatcherServlet 调用解析出的视图对象渲染响应。

### 【中等】Spring MVC 中的拦截器是什么？如何定义一个拦截器？

### 【中等】Spring MVC 中的国际化是如何实现？

Spring MVC 国际化基于 `LocaleResolver` 与 `MessageSource` 协作实现：

- **LocaleResolver**：解析用户区域信息（来源可配置为 Session、Cookie 或请求头 Accept-Language）。
- **MessageSource**：根据区域加载对应资源文件（如 messages_en.properties、messages_zh.properties），提供国际化文本。

实现步骤：

1. **定义资源文件**：不同语言分别创建 properties 文件，键相同值不同。
2. **配置 LocaleResolver**：指定区域解析策略（如 SessionLocaleResolver、AcceptHeaderLocaleResolver 等）。
3. **配置 MessageSource**：设置资源文件路径，控制器中通过 `messageSource.getMessage()` 获取国际化文本。

### 【中等】Spring MVC 如何处理异常？

Spring MVC 通过 **HandlerExceptionResolver** 机制集中处理异常，将异常映射为响应。主要方式：

- **局部处理**：`@ExceptionHandler` 注解控制器内方法，仅处理本控制器异常。
- **全局处理**：`@ControllerAdvice` + `@ExceptionHandler` 统一管理所有控制器异常。
- **注解驱动**：`@ResponseStatus` 标注异常类，或抛出 `ResponseStatusException`，指定状态码和原因。
- **容器级别**：实现 `HandlerExceptionResolver` 或配置 `SimpleMappingExceptionResolver`，将异常映射到视图。

**执行优先级**：`@ExceptionHandler`（局部 > 全局） > `@ResponseStatus`/`ResponseStatusException` > 容器级别处理器。

### 【中等】Spring MVC 父子容器是什么知道吗？

Spring MVC 父子容器通过分层隔离实现 Bean 管理：

- **父容器**：由 `ContextLoaderListener` 加载，管理业务层全局 Bean（如 Service、DAO、数据源、事务管理器）。
- **子容器**：每个 `DispatcherServlet` 创建独立子容器，管理 Web 层组件（如 Controller、拦截器、视图解析器）。

**访问规则**：子容器可访问父容器的 Bean，父容器不能访问子容器。这保证了 Controller 能调用 Service，而业务层不依赖 Web 层，实现解耦。

### 【中等】Spring WebFlux 是什么？它与 Spring MVC 有何不同？

Spring WebFlux 是 Spring 5 引入的响应式 Web 框架，基于 Reactor 实现非阻塞 I/O，适用于高并发、I/O 密集型场景。与 Spring MVC 的核心区别：

- **编程模型**：WebFlux 支持响应式（Mono/Flux）与注解控制器；MVC 基于 Servlet API，采用传统命令式编程。
- **线程模型**：WebFlux 使用少量线程处理海量请求（事件循环）；MVC 每个请求独占一个线程。
- **底层运行时**：WebFlux 可运行在 Netty、Undertow 等非 Servlet 容器；MVC 必须依赖 Servlet 容器。
- **适用场景**：WebFlux 适合延迟敏感、高并发的异步链路（如网关）；MVC 适合传统 Web 应用或 CPU 密集型任务。

### 【中等】什么是 Restful 风格的接口？

RESTful 是一种基于 HTTP 协议的软件架构风格，核心思想是将一切视为资源，通过 URI 唯一标识资源，并利用 HTTP 标准方法（GET、POST、PUT、DELETE）对资源进行操作。其设计原则包括无状态通信、统一接口、可缓存性、客户端-服务器分层等。典型特征：使用 JSON/XML 作为数据交换格式，通过 HTTP 状态码表达操作结果，URL 设计清晰且符合资源语义（如 `/users/1` 表示 ID 为 1 的用户）。RESTful 接口简洁、易于扩展，与 Web 架构天然契合，已成为现代 API 设计的主流规范。

## 注解

### 【中等】你用过哪些重要的 Spring 注解？

- **@Controller** - 用于 Spring MVC 项目中的控制器类。
- **@Service** - 用于服务类。
- **@RequestMapping** - 用于在控制器处理程序方法中配置 URI 映射。
- **@ResponseBody** - 用于发送 Object 作为响应，通常用于发送 XML 或 JSON 数据作为响应。
- **@PathVariable** - 用于将动态值从 URI 映射到处理程序方法参数。
- **@Autowired** - 用于在 spring bean 中自动装配依赖项。
- **@Qualifier** - 使用 @Autowired 注解，以避免在存在多个 bean 类型实例时出现混淆。
- **@Scope** - 用于配置 spring bean 的范围。
- **@Configuration**，**@ComponentScan** 和 **@Bean** - 用于基于 java 的配置。
- **@Aspect**，**@Before**，**@After**，**@Around**，**@Pointcut** - 用于切面编程（AOP）。

### 【简单】@Bean 和@Component 有什么区别？

@Bean 用于方法，显式声明一个 Bean 实例，通常用于配置第三方类；

@Component 用于类，通过类路径扫描自动注册为 Bean。

两者最终效果相同，但使用位置和适用场景不同。

### 【简单】@Component, @Controller, @Repository, @Service 有何区别？

- @Component：这将 java 类标记为 bean。它是任何 Spring 管理组件的通用构造型。spring 的组件扫描机制现在可以将其拾取并将其拉入应用程序环境中。
- @Controller：这将一个类标记为 Spring Web MVC 控制器。标有它的 Bean 会自动导入到 IoC 容器中。
- @Service：此注解是组件注解的特化。它不会对 @Component 注解提供任何其他行为。您可以在服务层类中使用 @Service 而不是 @Component，因为它以更好的方式指定了意图。
- @Repository：这个注解是具有类似用途和功能的 @Component 注解的特化。它为 DAO 提供了额外的好处。它将 DAO 导入 IoC 容器，并使未经检查的异常有资格转换为 Spring DataAccessException。

### 【简单】@Autowired 注解有什么用？

@Autowired 是 Spring 的依赖注入注解，用于自动装配 Bean，默认按类型匹配，可配合 @Qualifier 指定名称。

```java
public class Employee {
    private String name;
    @Autowired
    public void setName(String name) {
        this.name=name;
    }
    public string getName(){
        return name;
    }
}
```

### 【简单】@Qualifier 注解有什么作用

@Qualifier 与 @Autowired 配合使用，在存在多个同类型 Bean 时，通过指定 Bean 名称消除歧义，精确注入所需实例。

### 【简单】Spring 中的 @Primary 注解的作用是什么？

@Primary 注解用于在多个相同类型的 Bean 中标识优先注入的 Bean，解决自动装配时的歧义性问题。

### 【简单】Spring 中的 @Value 注解的作用是什么？

@Value 用于将外部配置属性或 SpEL 表达式注入到 Spring Bean 的字段、方法参数或构造函数参数中。

### 【简单】Spring 中的 @Profile 注解的作用是什么？

@Profile 注解用于指定 Bean 或配置类在特定的运行环境（如开发、测试、生产）中生效，实现环境隔离。

### 【简单】Spring 中的 @PostConstruct 和 @PreDestroy 注解的作用是什么？

@PostConstruct 指定 Bean 初始化后执行的方法

@PreDestroy 指定 Bean 销毁前执行的方法

二者都是用于管理 Bean 生命周期中的自定义行为。

### 【简单】Spring 中的 @RequestBody 和 @ResponseBody 注解的作用是什么？

@RequestBody 将 HTTP 请求体反序列化为控制器方法参数

@ResponseBody 将方法返回值直接序列化为 HTTP 响应体。

### 【简单】Spring 中的 @PathVariable 注解的作用是什么？

@PathVariable 用于将 URL 路径中的动态变量绑定到控制器方法的参数上，常用于 RESTful 接口中提取资源标识符。

### 【简单】Spring 中的 @ModelAttribute 注解的作用是什么？

@ModelAttribute 用于将请求参数绑定到模型对象，或向模型中添加公共数据，使其在视图中可用。

### 【简单】Spring 中的 @ExceptionHandler 注解的作用是什么？

@ExceptionHandler 用于标注方法作为特定异常的处理器，在控制器层集中处理异常并返回自定义响应。

### 【简单】Spring 中的 @ResponseStatus 注解的作用是什么？

@ResponseStatus 用于标注异常类或控制器方法，指定抛出异常或成功处理时应返回的 HTTP 状态码及原因，由框架自动设置响应。

### 【简单】Spring 中的 @RequestHeader 和 @CookieValue 注解的作用是什么？

@RequestHeader 将 HTTP 请求头中的值绑定到控制器方法参数

@CookieValue 将 Cookie 中的值绑定到控制器方法参数。

### 【简单】Spring 中的 @SessionAttribute 注解的作用是什么？

@SessionAttribute 用于将当前 HTTP 会话中存储的指定模型属性绑定到控制器方法参数上，方便在请求间共享数据。

### 【简单】Spring 中的 @Validated 和 @Valid 注解有什么区别？

@Valid 和 @Validated 都用于触发参数校验，但主要区别在于：

- **来源**：@Valid 是 Java Bean Validation 规范（JSR-303）的标准注解；@Validated 是 Spring 框架提供的注解，是对 @Valid 的扩展封装。
- **分组校验**：@Validated 支持校验分组（通过 `groups` 属性指定），允许同一对象在不同场景下执行不同校验规则；@Valid 不支持分组。
- **应用位置**：@Valid 可用于字段、方法参数、方法返回值等，支持级联校验；@Validated 只能用在类、方法、方法参数上，不能用于字段，因此无法直接触发级联校验。
- **内部机制**：@Validated 由 Spring 的 MethodValidationPostProcessor 处理，最终仍使用 Validator 实现校验。

**使用场景**：当需要根据操作（如新增、更新）执行不同校验规则时，必须使用 @Validated 配合分组接口。

### 【简单】Spring 中的 @Conditional 注解的作用是什么？

@Conditional 根据指定条件决定是否将 Bean 或配置类注册到 Spring 容器，实现条件化装配。

### 【简单】Spring 中的 @Cacheable 和 @CacheEvict 注解的作用是什么？

@Cacheable 将方法结果存入缓存，后续相同参数调用直接返回缓存值；

@CacheEvict 从缓存中移除指定条目，两者共同实现 Spring 声明式缓存管理。

### 【简单】Spring 中的 @Lazy 注解的作用是什么？

@Lazy 用于延迟 Bean 的初始化或依赖注入，使 Bean 在首次被使用时才创建实例，常用于优化启动性能或解决循环依赖。

### 【简单】Spring 中的 @PropertySource 注解的作用是什么？

@PropertySource 用于加载指定属性文件（如 .properties）中的配置项到 Spring Environment 中，使属性值可通过 @Value 或 Environment 读取。

### 【简单】Spring 中的 @EventListener 注解的作用是什么？

@EventListener 将方法标记为事件监听器，当应用程序发布对应类型的事件时，Spring 容器自动调用该方法进行处理。

### 【简单】Spring 中的 @Scheduled 注解的作用是什么？

@Scheduled 注解用于将方法标记为定时任务，支持固定延迟、固定速率或 Cron 表达式，由 Spring 容器自动调度执行。

### 【简单】@Async 注解的原理是什么？

@Async 注解基于 Spring AOP 代理实现异步执行，核心流程如下：

- **启用与代理**：`@EnableAsync` 开启功能，Spring 为带有 `@Async` 的 Bean 创建代理（JDK 或 CGLIB）。
- **拦截提交**：代理拦截目标方法调用，将其封装为任务提交给 `TaskExecutor` 线程池。
- **返回值处理**：
  - `void`：直接返回，任务异步执行。
  - `Future`：返回 `AsyncResult` 占位符，供后续获取结果。
  - 其他类型：设计上不推荐，行为不可控。
- **异常处理**：调用方无法捕获异步方法内的异常，需自定义 `AsyncUncaughtExceptionHandler` 处理。

**关键点**：

- 同类内部调用（`this.method()`）绕过代理，导致异步失效。
- 默认线程池为 `SimpleAsyncTaskExecutor`，生产环境需自定义。
- 可通过注解指定线程池名称实现隔离。

### 【简单】@Async 什么时候会失效？

@Async 失效常见原因如下：

- **同类内部调用**：直接 `this.method()` 绕过代理，异步不生效。
- **私有方法**：代理无法拦截 `private` 方法。
- **final 或 static 方法**：CGLIB 无法重写 `final`，静态方法不在代理范围。
- **未启用异步**：缺少 `@EnableAsync` 注解。
- **线程池问题**：默认线程池（SimpleAsyncTaskExecutor）不适合生产，或自定义线程池未正确配置。
- **异常未处理**：异步方法内异常不影响调用方，但无处理器则静默丢失。
- **返回值类型错误**：声明 `void` 却需返回结果，或返回类型非 `Future` 导致数据错乱。
- **Bean 未被管理**：手动 `new` 的对象注解不生效。
- **事务传播失效**：异步方法内调用事务方法，事务绑定原线程，无法生效。

### 【简单】@Async 如何避免内部调用失效？

@Async 基于 Spring AOP 代理实现，同一类内部方法直接调用（`this.method()`）会绕过代理，导致异步失效。解决方案如下：

- **使用 AopContext 获取当前代理**：在方法内通过 `((YourService) AopContext.currentProxy()).asyncMethod()` 调用。需在配置类或启动类上添加 `@EnableAspectJAutoProxy(exposeProxy = true)` 开启暴露代理。
- **注入自身 Bean**：在类中通过 `@Autowired` 注入自身实例（`private YourService self;`），使用 `self.asyncMethod()` 调用。
- **拆分异步方法到独立 Bean**：将带有 `@Async` 的方法定义在另一个 Spring 管理的组件中，通过依赖注入调用。
- **编程式获取 Bean**：实现 `ApplicationContextAware` 接口，从容器中获取 Bean 实例进行调用。

推荐使用前两种方式，需注意事务等其他代理机制可能受同样影响。

## 资料

- [面试鸭 - Spring 面试](https://www.mianshiya.com/bank/1797452903309508610)
- [Top 50 Spring Interview Questions You Must Prepare In 2018](https://www.edureka.co/blog/interview-questions/spring-interview-questions/)
- [Spring Interview Questions and Answers](https://www.journaldev.com/2696/spring-interview-questions-and-answers)
