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

## 综合篇

### 【简单】不同版本的 Spring 有哪些主要功能？

| Version    | Feature                                                             |
| ---------- | ------------------------------------------------------------------- |
| Spring 2.5 | 发布于 2007 年。这是第一个支持注解的版本。                          |
| Spring 3.0 | 发布于 2009 年。它完全利用了 Java5 中的改进，并为 JEE6 提供了支持。 |
| Spring 4.0 | 发布于 2013 年。这是第一个完全支持 JAVA8 的版本。                   |

### 【简单】Spring、SpringMVC、SpringBoot 三者之间是什么关系？

Spring 是一个应用级框架。

Spring MVC 是 Spring 一个子模块，主要支持 Web 领域的开发。

Spring Boot 是基于 Spring 框架，支持各种自动化默认配置，节省接入成本。其设计理念是：约定由于配置。

### 【简单】什么是 Spring？

- Spring 是一个开源应用框架，旨在降低应用程序开发的复杂度。
- 它是轻量级、松散耦合的。
- 它具有分层体系结构，允许用户选择组件，同时还为 J2EE 应用程序开发提供了一个有凝聚力的框架。
- 它可以集成其他框架，如 Structs、Hibernate、EJB 等，所以又称为框架的框架。

### 【简单】列举 Spring Framework 的优点。

- 由于 Spring Frameworks 的分层架构，用户可以自由选择自己需要的组件。
- Spring Framework 支持 POJO(Plain Old Java Object) 编程，从而具备持续集成和可测试性。
- 由于依赖注入和控制反转，JDBC 得以简化。
- 它是开源免费的。

### 【中等】Spring 有哪些模块？🌟

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/spring-framework.png)

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

### 【中等】Spring 是如何启动的？🌟🌟

Spring 启动主要分为三阶段：

1. **初始化容器**
   - 实例化 `ApplicationContext`。
   - 调用核心的 **`refresh()`** 方法，触发启动流程。
2. **加载解析配置**
   - 将配置（XML 或注解）解析为 **`BeanDefinition`** 对象。
   - 将所有 `BeanDefinition` 注册到容器的“注册表”中。
3. **创建与注入 Bean**
   - 实例化所有非懒加载的单例 Bean（**调用构造方法**）。
   - **进行依赖注入（DI）**，为 Bean 填充属性。
   - 执行 Bean 的**初始化**（Aware 接口、`BeanPostProcessor`、init-method）。

Spring 启动流程可以概括为：**容器读取配置，生成 Bean 定义，然后根据定义通过反射创建 Bean 实例，并递归地完成依赖注入和初始化的过程**。

### 【中等】Spring 框架中都用到了哪些设计模式？🌟🌟

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

## Bean

### 【简单】什么是 Spring Bean？

在 Spring 中，构成应用程序主体由 Spring IoC 容器管理的对象称为 Bean。**Bean 是由 Spring IoC 容器实例化、装配和管理的对象**。 Bean 以及它们之间的依赖关系反映在容器使用的配置元数据中。

Spring IoC 容器本身，并不能识别配置的元数据。为此，要将这些配置信息转为 Spring 能识别的格式——`BeanDefinition` 对象。

**`BeanDefinition` 是 Spring 中定义 Bean 的配置元信息接口**，它包含：

- Bean 类名
- Bean 行为配置元素，如：作用域、自动绑定的模式、生命周期回调等
- 其他 Bean 引用，也可称为合作者（Collaborators）或依赖（Dependencies）
- 配置设置，如 Bean 属性（Properties）

### 【简单】Spring 提供了哪些配置方式？

- 基于 xml 配置

bean 所需的依赖项和服务在 XML 格式的配置文件中指定。这些配置文件通常包含许多 bean 定义和特定于应用程序的配置选项。它们通常以 bean 标签开头。例如：

```xml
<bean id="studentbean" class="org.edureka.firstSpring.StudentBean">
 <property name="name" value="Edureka"></property>
</bean>
```

- 基于注解配置

您可以通过在相关的类，方法或字段声明上使用注解，将 bean 配置为组件类本身，而不是使用 XML 来描述 bean 装配。默认情况下，Spring 容器中未打开注解装配。因此，您需要在使用它之前在 Spring 配置文件中启用它。例如：

```xml
<beans>
<context:annotation-config/>
<!-- bean definitions go here -->
</beans>
```

- 基于 Java API 配置

Spring 的 Java 配置是通过使用 @Bean 和 @Configuration 来实现。

1.  @Bean 注解扮演与 `<bean />` 元素相同的角色。
2.  @Configuration 类允许通过简单地调用同一个类中的其他 @Bean 方法来定义 bean 间依赖关系。

例如：

```java
@Configuration
public class StudentConfig {
    @Bean
    public StudentBean myStudent() {
        return new StudentBean();
    }
}
```

### 【中等】Spring Bean 支持哪些作用域？🌟🌟

| 作用域          | 说明                       | 适用场景                           | 配置                           |
| :-------------- | :------------------------- | :--------------------------------- | :----------------------------- |
| **singleton**   | **默认**，每个容器一个实例 | 无状态 Bean：Service, DAO, 工具类  | `@Scope("singleton")` （默认） |
| **prototype**   | 每次请求创建一个新实例     | 有状态 Bean：需要隔离的对象        | `@Scope("prototype")`          |
| **request**     | 每个 HTTP 请求一个实例     | 存储请求相关数据                   | `@RequestScope`                |
| **session**     | 每个 HTTP Session 一个实例 | 存储用户会话信息：购物车、用户身份 | `@SessionScope`                |
| **application** | 每个 Web 应用一个实例      | 存储全局应用级数据                 | `@ApplicationScope`            |

### 【困难】Spring Bean 的生命周期是怎样的？🌟🌟🌟

![](https://raw.githubusercontent.com/dunwu/images/master/snap/20211201102734.png)

Spring Bean 容器的生命周期如下：

- **实例化**：Spring 容器根据配置文件或注解实例化 Bean 对象。
- **属性注入**：Spring 将依赖（通过构造器、setter 方法或字段注入）注入到 Bean 实例中。
- **初始化前的扩展机制**：如果 Bean 实现了 BeanNameAware 等 aware 接口，则执行 aware 注入。
- **初始化前（BeanPostProcessor）**：在 Bean 初始化之前，可以通过 BeanPostProcessor 接口对 Bean 进行一些额外的处理。
- **初始化**：调用 InitializingBean 接口的 afterPropertiesSet () 方法或通过 init-method 属性指定的初始化方法。
- **初始化后（BeanPostProcessor）**：在 Bean 初始化后，可以通过 BeanPostProcessor 进行进一步的处理。
- **使用 Bean**：Bean 已经初始化完成，可以被容器中的其他 Bean 使用。
- **销毁**：当容器关闭时，Spring 调用 DisposableBean 接口的 destroy () 方法或通过 destroy-method 属性指定的销毁方法。

### 【中等】什么是自动装配？

Spring 容器能够自动装配 bean。也就是说，可以通过检查 BeanFactory 的内容让 Spring 自动解析 bean 的协作者。

自动装配的不同模式：

- **no** - 这是默认设置，表示没有自动装配。应使用显式 bean 引用进行装配。
- **byName** - 它根据 bean 的名称注入对象依赖项。它匹配并装配其属性与 XML 文件中由相同名称定义的 bean。
- **byType** - 它根据类型注入对象依赖项。如果属性的类型与 XML 文件中的一个 bean 名称匹配，则匹配并装配属性。
- **构造器** - 它通过调用类的构造器来注入依赖项。它有大量的参数。
- **autodetect** - 首先容器尝试通过构造器使用 autowire 装配，如果不能，则尝试通过 byType 自动装配。

自动装配的局限：

- 覆盖的可能性 - 您始终可以使用 `<constructor-arg>` 和 `<property>` 设置指定依赖项，这将覆盖自动装配。
- 基本元数据类型 - 简单属性（如原数据类型，字符串和类）无法自动装配。
- 令人困惑的性质 - 总是喜欢使用明确的装配，因为自动装配不太精确。

## IoC

### 【简单】什么是 IoC？什么是依赖注入？什么是 Spring IoC？🌟🌟🌟

**控制反转（IoC）**是一种**设计思想**：将对象的**创建控制权**从程序内部“反转”给**外部容器**，目的是**解耦**。

**依赖注入（DI）**是实现 IoC 的**具体技术**：由容器**动态地**将依赖关系**注入**到对象中（通过构造器或 Setter）。

**Spring IoC** 是 Spring 对 **IoC/DI 的实现**。Spring 的 **IoC 容器**负责管理所有对象（称为 **Bean**），包括创建、组装和管理其生命周期。

一言以蔽之：遵循 **IoC** 思想，通过 **DI** 技术实现，而 **Spring IoC** 就是最主流的实现容器。

![](https://raw.githubusercontent.com/dunwu/images/master/snap/20221005163639.png)

### 【简单】依赖注入有哪些实现方式？

依赖注入有如下方式：

| 依赖注入方式    | 配置元数据举例                                     |
| --------------- | -------------------------------------------------- |
| Setter 方法注入 | `<proeprty name="user" ref="userBean"/>`           |
| 构造器注入      | `<constructor-arg name="user" ref="userBean" />`   |
| 字段注入        | `@Autowired User user;`                            |
| 方法注入        | `@Autowired public void user(User user) { ... }`   |
| 接口回调注入    | `class MyBean implements BeanFactoryAware { ... }` |

### 【简单】BeanFactory 和 ApplicationContext 有什么区别？🌟

在 Spring 中，有两种 IoC 容器：`BeanFactory` 和 `ApplicationContext`。

- `BeanFactory`：**`BeanFactory` 是 Spring 基础 IoC 容器**。`BeanFactory` 提供了 Spring 容器的配置框架和基本功能。
- `ApplicationContext`：**`ApplicationContext` 是具备应用特性的 `BeanFactory` 的子接口**。它还扩展了其他一些接口，以支持更丰富的功能，如：国际化、访问资源、事件机制、更方便的支持 AOP、在 web 应用中指定应用层上下文等。

实际开发中，更推荐使用 `ApplicationContext` 作为 IoC 容器，因为它的功能远多于 `BeanFactory`。

### 【简单】BeanFactory 和 FactoryBean 有什么区别？🌟

**`BeanFactory` 是 Spring 基础 IoC 容器**。

**`FactoryBean` 是创建 Bean 的一种方式**，帮助实现复杂的初始化逻辑。

### 【困难】Spring 如何解决循环依赖？🌟🌟🌟

**Spring 采用三级缓存来解决循环依赖**，其关键是：**提前暴露未完全创建完毕的 Bean**。

三级缓存：

- **一级缓存（成品，`singletonObjects`）**：存放完全初始化的单例 Bean。
- **二级缓存（半成品，`earlySingletonObjects`）**：存放从工厂中取出的早期引用，用于提前暴露对象，避免循环依赖问题。
- **三级缓存（工厂，`singletonFactories`）**：**最关键的一步**。存放 Bean 的工厂（`ObjectFactory`），用于**提前暴露**一个尚未初始化完成的 Bean 的引用（特别是为了支持 AOP 代理对象的创建）。

解决步骤：

![](https://img2024.cnblogs.com/blog/786311/202506/786311-20250620213520068-1302403901.png)

1. **实例化 & 暴露工厂**：实例化 Bean A 后，立即将其工厂放入**三级缓存**，**提前暴露引用**。
2. **填充属性时循环引用**：为 A 注入 B 时，触发创建 B。B 在注入 A 时，能从**三级缓存**的工厂中获取到 A 的早期引用。
3. **升级缓存 & 完成注入**：将获取到的早期引用 A 放入**二级缓存**，并注入给 B，从而让 B 和 A 都能顺利完成创建。

### 【困难】Spring 解决循环依赖为什么一定要用三级缓存？🌟🌟

选择**三级缓存**而非二级缓存，主要出于** AOP 代理**的考虑，而非单纯解决循环依赖。

- **二级缓存问题**：如果使用二级缓存，必须在 Bean **实例化后立即创建代理**。这违背了 Spring 在 Bean **初始化完成后才创建代理**的设计原则，且可能导致注入的是原始对象而非最终代理对象。
- **三级缓存优势**：三级缓存存储的是**一个能生产最终代理对象的工厂**。当发生循环依赖时，由工厂动态决定返回原始对象还是代理对象，从而**确保注入的总是最终版本的对象**，同时遵守了代理的创建时机原则。

一言以蔽之：**三级缓存通过一个延迟处理的工厂，确保了在循环依赖中注入的也是最终的代理对象，维护了 AOP 与 IOC 的正确行为**。

## AOP

### 【简单】什么是 AOP？🌟🌟🌟

**AOP（面向切面编程）**是一种编程思想，**将与核心业务无关的公共功能（如日志、事务）从业务代码中剥离出来，集中管理和复用**，作为 OOP（面向对象编程）的有效补充。

**为什么需要 AOP？**

解决 **“横切关注点”** 问题，即那些分散在各个模块中的重复性代码（如日志、安全、事务）。目标是：**解耦、避免代码重复、提升可维护性**。换句话说，**AOP 能在不修改原有业务代码的情况下，给程序动态、统一地添加功能**。

**AOP 核心概念**

- **切面（Aspect）**：**“做什么”**。封装公共功能的模块（如日志模块）。
- **通知（Advice）**：**“何时做”**。定义切面工作的具体时机（如方法调用前、后）。
  - **前置通知（Before）**：在方法执行之前执行的操作。
  - **后置通知（After）**：在方法执行之后执行的操作。
  - **环绕通知（Around）**：在方法执行前后都可以执行的操作，可以控制方法是否执行。
  - **异常通知（AfterThrowing）**：在方法抛出异常后执行的操作。
  - **返回通知（AfterReturning）**：在方法成功返回后执行的操作。
- **切点（Pointcut）**：**“在哪做”**。通过表达式匹配需要切入的具体方法。
- **连接点（JoinPoint）**：**“可以做的点”**。程序执行中的节点（如方法调用），是切点的具体实例。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/core/spring-aop.png)

### 【中等】Spring AOP 有哪些实现方式？🌟🌟🌟

Spring AOP 基于**动态代理**，主要分为两种实现方式：

- **JDK 动态代理**
  - **条件**：代理**实现了接口**的类。
  - **原理**：通过反射创建**实现了相同接口**的代理对象。
  - **限制**：只能代理**接口中定义的方法**。

- **CGLIB 代理**
  - **条件**：代理**未实现接口**的类。
  - **原理**：通过**字节码技术**生成目标类的**子类**作为代理对象。
  - **限制**：无法代理 **`final` 类** 或 **`final`/`static` 方法**。

**选择策略**

- **默认行为**：有接口用 **JDK**，无接口用 **CGLIB**。
- **强制配置**：可通过设置 `proxy-target-class=true` **强制**所有情况都使用 **CGLIB**。

**一句话总结**：Spring AOP 在运行时通过 **JDK 代理（基于接口）** 或 **CGLIB 代理（基于继承）** 动态生成代理对象，从而将切面逻辑织入目标方法。

## 注解

### 你用过哪些重要的 Spring 注解？

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

### 如何在 spring 中启动注解装配？

默认情况下，Spring 容器中未打开注解装配。因此，要使用基于注解装配，我们必须通过配置`<context：annotation-config />` 元素在 Spring 配置文件中启用它。

### @Component, @Controller, @Repository, @Service 有何区别？

- @Component：这将 java 类标记为 bean。它是任何 Spring 管理组件的通用构造型。spring 的组件扫描机制现在可以将其拾取并将其拉入应用程序环境中。
- @Controller：这将一个类标记为 Spring Web MVC 控制器。标有它的 Bean 会自动导入到 IoC 容器中。
- @Service：此注解是组件注解的特化。它不会对 @Component 注解提供任何其他行为。您可以在服务层类中使用 @Service 而不是 @Component，因为它以更好的方式指定了意图。
- @Repository：这个注解是具有类似用途和功能的 @Component 注解的特化。它为 DAO 提供了额外的好处。它将 DAO 导入 IoC 容器，并使未经检查的异常有资格转换为 Spring DataAccessException。

### @Required 注解有什么用？

@Required 应用于 bean 属性 setter 方法。此注解仅指示必须在配置时使用 bean 定义中的显式属性值或使用自动装配填充受影响的 bean 属性。如果尚未填充受影响的 bean 属性，则容器将抛出 BeanInitializationException。

示例：

```java
public class Employee {
    private String name;
    @Required
    public void setName(String name){
        this.name=name;
    }
    public string getName(){
        return name;
    }
}
```

### @Autowired 注解有什么用？

@Autowired 可以更准确地控制应该在何处以及如何进行自动装配。此注解用于在 setter 方法，构造器，具有任意名称或多个参数的属性或方法上自动装配 bean。默认情况下，它是类型驱动的注入。

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

### @Qualifier 注解有什么用？

当您创建多个相同类型的 bean 并希望仅使用属性装配其中一个 bean 时，您可以使用@Qualifier 注解和 @Autowired 通过指定应该装配哪个确切的 bean 来消除歧义。

例如，这里我们分别有两个类，Employee 和 EmpAccount。在 EmpAccount 中，使用@Qualifier 指定了必须装配 id 为 emp1 的 bean。

Employee.java

```java
public class Employee {
    private String name;
    @Autowired
    public void setName(String name) {
        this.name=name;
    }
    public string getName() {
        return name;
    }
}
```

EmpAccount.java

```java
public class EmpAccount {
    private Employee emp;

    @Autowired
    @Qualifier(emp1)
    public void showName() {
        System.out.println(“Employee name : ”+emp.getName);
    }
}
```

### @RequestMapping 注解有什么用？

@RequestMapping 注解用于将特定 HTTP 请求方法映射到将处理相应请求的控制器中的特定类/方法。此注解可应用于两个级别：

- 类级别：映射请求的 URL
- 方法级别：映射 URL 以及 HTTP 请求方法

## 数据篇

### 【中等】Spring DAO 有哪些异常？

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/data-access/spring-data-access-exception.png)

### 【中等】什么是 Spring 的事务管理？

Spring 支持声明式、编程式、注解式定义事务。

Spring 事务定义的属性有：

- **隔离级别**：`DEFAULT`（使用数据库默认），`READ_COMMITTED`，`REPEATABLE_READ` 等
- **传播行为**：`REQUIRED`（默认），`REQUIRES_NEW`，`NESTED`，`SUPPORTS` 等
- **回滚规则**：指定哪些异常触发回滚
- **是否只读**
- **事务超时**

### 【中等】Spring 事务支持哪些传播行为？🌟

| 传播行为              | 值                          | 当前有事务                   | 当前无事务       |
| :-------------------- | :-------------------------- | :--------------------------- | :--------------- |
| **REQUIRED** （默认） | `Propagation.REQUIRED`      | **加入**当前事务             | **新建**一个事务 |
| **SUPPORTS**          | `Propagation.SUPPORTS`      | **加入**当前事务             | **非事务**运行   |
| **MANDATORY**         | `Propagation.MANDATORY`     | **加入**当前事务             | **抛出异常**     |
| **REQUIRES_NEW**      | `Propagation.REQUIRES_NEW`  | **挂起**当前并**新建**       | **新建**一个事务 |
| **NOT_SUPPORTED**     | `Propagation.NOT_SUPPORTED` | **挂起**当前并**非事务**运行 | **非事务**运行   |
| **NEVER**             | `Propagation.NEVER`         | **抛出异常**                 | **非事务**运行   |
| **NESTED**            | `Propagation.NESTED`        | 在**嵌套事务**中执行         | **新建**一个事务 |

## MVC

### 【困难】Spring MVC 是如何工作的？🌟🌟🌟

**Spring MVC 的核心是 `DispatcherServlet`，它充当了前端控制器（Front Controller）的模式，是所有请求的统一入口，负责协调各个组件完成请求处理**。

![img](https://raw.githubusercontent.com/dunwu/images/master/cs/java/spring/web/spring-dispatcher-servlet.png)

**请求流程**

1. **用户请求**：用户通过浏览器发送 HTTP 请求到服务器。
2. **DispatcherServlet 接收请求**：作为前端控制器，DispatcherServlet 拦截所有请求。
3. **HandlerMapping 映射处理器**：DispatcherServlet 调用 HandlerMapping，根据请求的 URL 找到对应的处理器（Controller）。
4. **HandlerAdapter 调用处理器**：DispatcherServlet 通过 HandlerAdapter 调用具体的处理器方法，执行业务逻辑。
5. **处理器返回 ModelAndView**：处理器处理完请求后，返回包含模型数据和视图信息的 ModelAndView 对象。
6. **ViewResolver 解析视图**：DispatcherServlet 使用 ViewResolver 将逻辑视图名解析为具体的视图实现（如 JSP）。
7. **渲染视图**：视图组件将模型数据填充到视图中，生成最终的响应内容。
8. **返回响应**：DispatcherServlet 将渲染后的视图返回给客户端，完成请求-响应的整个过程。

**核心组件**

- **`DispatcherServlet`**：作为前端控制器，负责接收请求并协调其他组件的工作。
- **`HandlerMapping`**：根据请求的 URL，将请求映射到对应的处理器。
- **`HandlerAdapter`**：调用处理器方法，并处理返回结果。
- **`Controller`**：处理具体的业务逻辑，生成模型和视图信息。
- **`ModelAndView`**：包含处理结果和视图信息的对象。
- **`ViewResolver`**：将逻辑视图名解析为实际的视图实现。
- **`View`**：负责将模型数据渲染成最终的响应内容。

**配置与扩展**

- 注解支持：使用 `@Controller`、`@RequestMapping` 等注解简化开发。
- 拦截器（Interceptor）：在请求处理前后执行额外的逻辑，如权限检查、日志记录等。
- 数据绑定与验证：提供数据绑定和验证机制，方便处理表单数据。
  通过以上流程和组件，Spring MVC 实现了请求的分发、处理、视图渲染等功能，使开发者能够高效地开发 Web 应用程序。

## 资料

- [面试鸭 - Spring 面试](https://www.mianshiya.com/bank/1797452903309508610)
- [Top 50 Spring Interview Questions You Must Prepare In 2018](https://www.edureka.co/blog/interview-questions/spring-interview-questions/)
- [Spring Interview Questions and Answers](https://www.journaldev.com/2696/spring-interview-questions-and-answers)