---
title: spring-boot-async
date: 2019-11-18 14:55:01
order: 01
categories:
  - Java
  - 框架
  - Spring
  - SpringIO
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
  - 异步
permalink: /pages/3d32ad58/
---

# SpringBoot 教程之处理异步请求

## `@EnableAsync` 注解

要使用 `@Async`，首先需要使用 `@EnableAsync` 注解开启 Spring Boot 中的异步特性。

```java
@Configuration
@EnableAsync
public class AppConfig {
}
```

更详细的配置说明，可以参考：[`AsyncConfigurer`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/AsyncConfigurer.html)

## `@Async` 注解

### 支持的用法

（1）**无入参无返回值方法**

您可以用 `@Async` 注解修饰方法，这表明这个方法是异步方式调用。换句话说，程序在调用此方法时会立即返回，而方法的实际执行发生在已提交给 Spring `TaskExecutor` 的任务中。在最简单的情况下，您可以将注解应用于返回 void 的方法，如以下示例所示：

```java
@Async
void doSomething() {
    // this will be executed asynchronously
}
```

（2）**有入参无返回值方法**

与使用 `@Scheduled` 注释注释的方法不同，这些方法可以指定参数，因为它们在运行时由调用者以“正常”方式调用，而不是由容器管理的调度任务调用。例如，以下代码是 `@Async` 注解的合法应用：

```java
@Async
void doSomething(String s) {
    // this will be executed asynchronously
}
```

（3）**有入参有返回值方法**

甚至可以异步调用返回值的方法。但是，这些方法需要具有 `Future` 类型的返回值。这仍然提供了异步执行的好处，以便调用者可以在调用 `Future` 上的 `get()` 之前执行其他任务。以下示例显示如何在返回值的方法上使用`@Async`：

```java
@Async
Future<String> returnSomething(int i) {
    // this will be executed asynchronously
}
```

### 不支持的用法

`@Async` 不能与生命周期回调一起使用，例如 `@PostConstruct`。

要异步初始化 Spring bean，必须使用单独的初始化 Spring bean，然后在目标上调用 `@Async` 带注释的方法，如以下示例所示：

```java
public class SampleBeanImpl implements SampleBean {

    @Async
    void doSomething() {
        // ...
    }

}

public class SampleBeanInitializer {

    private final SampleBean bean;

    public SampleBeanInitializer(SampleBean bean) {
        this.bean = bean;
    }

    @PostConstruct
    public void initialize() {
        bean.doSomething();
    }

}
```

## 明确指定执行器

默认情况下，在方法上指定 `@Async` 时，使用的执行器是在启用异步支持时配置的执行器，即如果使用 XML 或 `AsyncConfigurer` 实现（如果有），则为 `annotation-driven` 元素。但是，如果需要指示在执行给定方法时应使用默认值以外的执行器，则可以使用 `@Async` 注解的 value 属性。以下示例显示了如何执行此操作：

```java
@Async("otherExecutor")
void doSomething(String s) {
    // this will be executed asynchronously by "otherExecutor"
}
```

在这种情况下，“otherExecutor”可以是 Spring 容器中任何 Executor bean 的名称，也可以是与任何 Executor 关联的限定符的名称（例如，使用 `<qualifier>` 元素或 Spring 的 `@Qualifier` 注释指定） ）。

## 管理 `@Async` 的异常

当 `@Async` 方法的返回值类型为 `Future` 型时，很容易管理在方法执行期间抛出的异常，因为在调用 `get` 结果时会抛出此异常。但是，对于返回值类型为 void 型的方法，异常不会被捕获且无法传输。您可以提供 `AsyncUncaughtExceptionHandler` 来处理此类异常。以下示例显示了如何执行此操作：

```java
public class MyAsyncUncaughtExceptionHandler implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        // handle exception
    }
}
```

默认情况下，仅记录异常。您可以使用 `AsyncConfigurer` 或 `<task：annotation-driven />` XML 元素定义自定义 `AsyncUncaughtExceptionHandler`。

## 示例源码

> 示例源码：[spring-boot-async](https://github.com/dunwu/spring-boot-tutorial/tree/master/codes/spring-boot-async)

## 典型应用场景

- **异步任务执行**：通过 `@Async` 将耗时操作（邮件发送、报表生成）放入后台线程异步执行。
- **并行计算**：将多个独立任务并行执行，汇总结果后返回，提升响应速度。
- **事件驱动处理**：异步处理 Spring 事件，避免阻塞主线程。
- **定时任务异步化**：结合 `@Scheduled` 与异步执行器实现不阻塞主线程的定时任务。

## 最佳实践

- **自定义线程池**：避免使用默认的 `SimpleAsyncTaskExecutor`，配置 `ThreadPoolTaskExecutor` 控制线程数和队列容量。
- **设置合理的超时时间**：通过 `Future.get(timeout)` 避免异步任务无限等待。
- **异常处理不能忽略**：配置 `AsyncUncaughtExceptionHandler` 捕获未处理异常，避免静默失败。
- **避免在 `@Async` 方法中调用同类方法**：同类内部调用不会触发代理，导致异步失效。

## 常见问题

**为什么 `@Async` 方法没有异步执行？**

`@Async` 基于 AOP 代理实现，同类内部方法调用不会经过代理。需将异步方法放在单独的 Bean 中或通过 `AopContext.currentProxy()` 调用。

## 参考资料

- [Spring Boot 官方文档之 boot-features-external-config](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config)
- [Spring Boot 官方文档之 scheduling-annotation-support](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#scheduling-annotation-support)
