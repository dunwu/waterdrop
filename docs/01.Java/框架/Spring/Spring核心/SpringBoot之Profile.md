---
title: SpringBoot 之 Profile
date: 2019-11-18 14:55:01
order: 33
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
permalink: /pages/56c68497/
---

# SpringBoot 之 Profile

> 一个应用为了在不同的环境下工作，常常会有不同的配置，代码逻辑处理。Spring Boot 对此提供了简便的支持。
>
> 关键词： `@Profile`、`spring.profiles.active`

## 区分环境的配置

### properties 配置

假设，一个应用的工作环境有：dev、test、prod

那么，我们可以添加 4 个配置文件：

- `applcation.properties` - 公共配置
- `application-dev.properties` - 开发环境配置
- `application-test.properties` - 测试环境配置
- `application-prod.properties` - 生产环境配置

在 `applcation.properties` 文件中可以通过以下配置来激活 profile：

```properties
spring.profiles.active = test
```

### yml 配置

与 properties 文件类似，我们也可以添加 4 个配置文件：

- `applcation.yml` - 公共配置
- `application-dev.yml` - 开发环境配置
- `application-test.yml` - 测试环境配置
- `application-prod.yml` - 生产环境配置

在 `applcation.yml` 文件中可以通过以下配置来激活 profile：

```yml
spring:
  profiles:
    active: prod
```

此外，yml 文件也可以在一个文件中完成所有 profile 的配置：

```yml
# 激活 prod
spring:
  profiles:
    active: prod
# 也可以同时激活多个 profile
# spring.profiles.active: prod,proddb,prodlog
---
# dev 配置
spring:
  profiles: dev

# 略去配置

---
spring:
  profiles: test

# 略去配置

---
spring.profiles: prod
spring.profiles.include:
  - proddb
  - prodlog

---
spring:
  profiles: proddb

# 略去配置

---
spring:
  profiles: prodlog
# 略去配置
```

注意：不同 profile 之间通过 `---` 分割

## 区分环境的代码

使用 `@Profile` 注解可以指定类或方法在特定的 Profile 环境生效。

### 修饰类

```java
@Configuration
@Profile("production")
public class JndiDataConfig {

    @Bean(destroyMethod="")
    public DataSource dataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

### 修饰注解

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Profile("production")
public @interface Production {
}
```

### 修饰方法

```java
@Configuration
public class AppConfig {

    @Bean("dataSource")
    @Profile("development")
    public DataSource standaloneDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .addScript("classpath:com/bank/config/sql/test-data.sql")
            .build();
    }

    @Bean("dataSource")
    @Profile("production")
    public DataSource jndiDataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

## 激活 profile

### 插件激活 profile

```
spring-boot:run -Drun.profiles=prod
```

### main 方法激活 profile

```
--spring.profiles.active=prod
```

### jar 激活 profile

```
java -jar -Dspring.profiles.active=prod *.jar
```

### 在 Java 代码中激活 profile

直接指定环境变量来激活 profile：

```java
System.setProperty("spring.profiles.active", "test");
```

在 Spring 容器中激活 profile：

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
ctx.getEnvironment().setActiveProfiles("development");
ctx.register(SomeConfig.class, StandaloneDataConfig.class, JndiDataConfig.class);
ctx.refresh();
```

## 示例源码

> 示例源码：[spring-boot-profile](https://github.com/dunwu/spring-boot-tutorial/tree/master/codes/spring-boot-profile)

## 典型应用场景

- **多环境数据源配置**：dev 环境用嵌入式 H2 数据库，prod 环境用 JNDI 数据源，通过 `@Profile` 隔离不同实现。
- **微服务多环境部署**：通过 `application-{profile}.yml` 为不同环境配置不同的服务地址、端口、日志级别。
- **功能开关与灰度发布**：在特定 Profile 下激活实验性功能模块，其他环境不加载。
- **测试环境隔离**：测试用 `@Profile("test")` 加载专用 Mock Bean，不影响生产环境逻辑。

## 最佳实践

- **避免在代码中硬编码 Profile**：优先通过环境变量或启动参数激活 Profile，而不是 `System.setProperty`。
- **为所有环境提供默认配置**：将公共配置放入 `application.properties`，仅将差异部分放入 `application-{profile}.properties`。
- **使用 `@Profile` 修饰类而非方法**：类级别 `@Profile` 语义更清晰，方法级别仅用于 `@Bean` 方法条件化注册。
- **生产环境显式指定 Profile**：避免依赖默认 Profile，防止配置误用。

## 常见问题

**Profile 未生效怎么办？**

检查配置文件是否被正确加载，确认 `spring.profiles.active` 拼写无误；同时确认未被更高优先级的配置源覆盖。

**能否同时激活多个 Profile？**

可以。通过逗号分隔多个 profile 名称，如 `spring.profiles.active=prod,proddb,prodlog`。

## 参考资料

- [Spring 官方文档之 Bean Definition Profiles](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-definition-profiles)
- [Spring Boot 官方文档之 boot-features-profiles](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-profiles)
