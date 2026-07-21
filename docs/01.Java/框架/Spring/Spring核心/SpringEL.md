---
title: Spring EL 表达式
date: 2023-01-12 20:26:46
order: 24
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
permalink: /pages/99cce9e2/
---

# Spring EL 表达式

Spring Expression Language（SpEL）是 Spring 提供的强大表达式语言，支持在运行时查询和操作对象图。它类似于 OGNL 和 MVEL，但专为 Spring 生态优化设计。

## 核心特性

- **对象图导航**：通过点号语法访问对象属性、方法、集合，如 `person.address.city`。
- **集合操作**：支持 List、Map 的创建和访问，支持集合投影（`.![name]`）和选择（`.?[age > 18]`）。
- **运算符支持**：算术、关系、逻辑、赋值、三元、Elvis（`?:`）等运算符。
- **正则表达式匹配**：通过 `matches` 运算符进行正则匹配。
- **类型引用与构造**：通过 `T(Math)` 引用类型，通过 `new` 构造对象。
- **变量与函数**：支持 `#variableName` 引用变量，`#functionName()` 调用函数。

## 典型应用场景

- **`@Value` 注解注入**：在 `@Value("#{systemProperties['user.name']}")` 中读取系统属性。
- **配置属性引用**：`@Value("${app.name:default}")` 读取配置文件属性，支持默认值。
- **`@PreAuthorize` 权限表达式**：Spring Security 中用 SpEL 定义访问控制规则，如 `@PreAuthorize("hasRole('ADMIN')")`。
- **`@Cacheable` 缓存条件**：用 SpEL 控制缓存命中条件，如 `@Cacheable(condition = "#id > 0")`。

## 快速入门

```java
ExpressionParser parser = new SpelExpressionParser();

// 字符串拼接
Expression exp = parser.parseExpression("'Hello ' + 'World'");
String message = (String) exp.getValue(); // "Hello World"

// 访问对象属性
Expression exp2 = parser.parseExpression("name");
String name = exp2.getValue(person, String.class);

// 集合选择
Expression exp3 = parser.parseExpression("members.?[age > 30]");
List<Person> result = (List<Person>) exp3.getValue(context);

// 三元运算符
Expression exp4 = parser.parseExpression("name != null ? name : 'unknown'");
```

## 最佳实践

- **避免在注解中写过于复杂的 SpEL**：表达式过长可读性差，建议将复杂逻辑提取到方法中。
- **注意性能**：SpEL 每次解析都会重新编译，对于频繁执行的表达式，应缓存 `Expression` 对象。
- **安全风险**：SpEL 能执行任意方法调用，在用户输入作为表达式时可能导致代码注入攻击，需严格校验输入。

## 常见问题

- **SpEL 中如何调用静态方法？** 使用 `T(com.example.MathUtils).max(1, 2)` 语法。
- **`#{}` 和 `${}` 有什么区别？** `#{}` 是 SpEL 表达式，可操作对象图、调用方法；`${}` 是属性占位符，仅读取配置文件中的属性值。
- **如何在 SpEL 中访问 Bean？** 使用 `@beanName` 语法引用容器中的 Bean。

## 参考资料

- [Spring 官方文档之 Expression Language](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#expressions)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
