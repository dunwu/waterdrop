---
title: Spring 笔记
date: 2022-06-14 09:37:30
categories:
  - Java
  - 框架
  - Spring
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
permalink: /pages/d1f190c9/
hidden: true
index: false
---

# Spring 笔记

![license](https://badgen.net/github/license/dunwu/spring-tutorial)
![build](https://travis-ci.com/dunwu/spring-tutorial.svg?branch=master)

> 🍃 **`spring-tutorial`** 是一个 Spring & Spring Boot 教程。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/spring-tutorial/) | [Gitee](https://gitee.com/turnon/spring-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/spring-tutorial/) | [Gitee Pages](http://turnon.gitee.io/spring-tutorial/)

## 📖 内容

### 综合

- [Spring 概述](Spring综合/Spring概述.md)
- [SpringBoot 知识图谱](Spring综合/SpringBoot知识图谱.md)
- [SpringBoot 基本原理](Spring综合/SpringBoot基本原理.md)
- [Spring 面试](Spring面试.md)

### 核心

- [Spring Bean](Spring核心/SpringBean.md)
- [Spring IoC](Spring核心/SpringIoC.md)
- [Spring 依赖查找](Spring核心/Spring依赖查找.md)
- [Spring 依赖注入](Spring核心/Spring依赖注入.md)
- [Spring IoC 依赖来源](Spring核心/SpringIoC依赖来源.md)
- [Spring Bean 作用域](Spring核心/SpringBean作用域.md)
- [Spring Bean 生命周期](Spring核心/SpringBean生命周期.md)
- [Spring 配置元数据](Spring核心/Spring配置元数据.md)
- [Spring AOP](Spring核心/SpringAop.md)
- [Spring 资源管理](Spring核心/Spring资源管理.md)
- [Spring 校验](Spring核心/Spring校验.md)
- [Spring 数据绑定](Spring核心/Spring数据绑定.md)
- [Spring 类型转换](Spring核心/Spring类型转换.md)
- [Spring EL 表达式](Spring核心/SpringEL.md)
- [Spring 事件](Spring核心/Spring事件.md)
- [Spring 国际化](Spring核心/Spring国际化.md)
- [Spring 泛型处理](Spring核心/Spring泛型处理.md)
- [Spring 注解](Spring核心/Spring注解.md)
- [Spring Environment 抽象](Spring核心/SpringEnvironment抽象.md)
- [SpringBoot 教程之快速入门](Spring核心/SpringBoot之快速入门.md)
- [SpringBoot 之属性加载](Spring核心/SpringBoot之属性加载.md)
- [SpringBoot 之 Profile](Spring核心/SpringBoot之Profile.md)

### 数据

- [Spring 之数据源](Spring数据/Spring之数据源.md)
- [Spring 之 JDBC](Spring数据/Spring之JDBC.md)
- [Spring 之事务](Spring数据/Spring之事务.md)
- [Spring 之 JPA](Spring数据/Spring之JPA.md)
- [Spring 集成 Mybatis](Spring数据/Spring集成Mybatis.md)
- [Spring 访问 Redis](Spring数据/Spring访问Redis.md)
- [Spring 访问 MongoDB](Spring数据/Spring访问MongoDB.md)
- [Spring 访问 Elasticsearch](Spring数据/Spring访问Elasticsearch.md)

### Web

- [SpringWeb 综述](SpringWeb/SpringWeb综述.md)
- [SpringWeb 应用](SpringWeb/SpringWeb应用.md)
- [DispatcherServlet](SpringWeb/DispatcherServlet.md)
- [Spring 过滤器](SpringWeb/Spring过滤器.md)
- [Spring 跨域](SpringWeb/Spring跨域.md)
- [Spring 视图](SpringWeb/Spring视图.md)
- [SpringBoot 之应用 EasyUI](SpringWeb/SpringBoot之应用EasyUI.md)

### IO

- [SpringBoot 之异步请求](SpringIO/SpringBoot之异步请求.md)
- [SpringBoot 之 Json](SpringIO/SpringBoot之Json.md)
- [SpringBoot 之邮件](SpringIO/SpringBoot之邮件.md)

### 集成

- [Spring 集成缓存中间件](Spring集成/Spring集成缓存.md)
- [Spring 集成定时任务中间件](Spring集成/Spring集成调度器.md)
- [Spring 集成 Dubbo](Spring集成/Spring集成Dubbo.md)

### 其他

- [Spring4 升级](Spring其他/Spring4升级.md)
- [SpringBoot 之 banner](Spring其他/SpringBoot之banner.md)
- [SpringBoot 之 Actuator](Spring其他/SpringBoot之Actuator.md)

## 💻 示例

### 核心篇示例

- [spring-core-actuator](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/actuator) - Spring 应用监控示例。
- [spring-core-aop](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/aop) - Spring AOP 编程示例。
- [spring-core-async](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/async) - Spring 使用异步接口示例。
- [spring-core-banner](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/banner) - Spring 定制启动时的输出 Logo。
- [spring-core-bean](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/bean) - Spring 管理 JavaBean 生命周期示例。
- [spring-core-conversion](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/conversion) - Spring 数据转换示例。
- [spring-core-data-binding](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/data-binding) - Spring 数据绑定示例。
- [spring-core-ioc](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/ioc) - Spring IOC 示例。
- [spring-core-profile](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/profile) - 在 Spring 中根据 profile 在不同的环境下执行不同的行为。
- [spring-core-property](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/property) - 全方位的演示 Spring 加载属性的方式：记载 `properties` 和 `yaml` 两种文件；通过 `@Value`、`@ConfigurationProperties`、`Environment` 读取属性。
- [spring-core-resource](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/resource) - Spring 资源加载示例。
- [spring-core-validation](https://github.com/dunwu/spring-tutorial/tree/master/codes/core/validation) - Spring 数据校验示例。

### 数据篇示例

- **JDBC**
  - [spring-data-jdbc-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/basics) - Spring Boot 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。
  - [spring-data-jdbc-druid](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/druid) - SpringBoot 使用 [Druid](https://github.com/alibaba/druid) 作为数据库连接池。
  - [spring-data-jdbc-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/multi-datasource) - SpringBoot 连接多数据源示例。
  - [spring-data-jdbc-xml](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/xml) - Spring 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。
- **ORM**
  - [spring-data-orm-jpa](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/jpa) - SpringBoot 使用 JPA 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis) - Spring 使用 [MyBatis](https://github.com/mybatis/mybatis-3) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-mapper](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-mapper) - SpringBoot 使用 [MyBatis](https://github.com/mybatis/mybatis-3) + [Mapper](https://github.com/abel533/Mapper) + [PageHelper](https://github.com/pagehelper/Mybatis-PageHelper) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-multi-datasource) - SpringBoot 连接多数据源，并使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。
  - [spring-data-orm-mybatis-plus](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/mybatis-plus) - SpringBoot 使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。
- **Nosql**
  - [spring-data-nosql-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/basics) - Spring 访问各种 NoSQL 的示例。
  - [spring-data-nosql-mongodb](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/mongodb) - SpringBoot 访问 [MongoDB](https://www.mongodb.com/) 的示例。
  - [spring-data-nosql-redis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/redis) - SpringBoot 访问 [Redis](https://redis.io/) 单节点、集群的示例。
  - [spring-data-nosql-elasticsearch](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/elasticsearch) - SpringBoot 访问 [Elasticsearch](https://www.elastic.co/guide/index.html) 的示例。
  - [spring-data-nosql-hdfs](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/hdfs) - SpringBoot 访问 HDFS 的示例。
- **Cache**
  - [spring-data-cache-basics](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/basics) - SpringBoot 默认缓存框架的示例。
  - [spring-data-cache-j2cache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/j2cache) - SpringBoot 使用 [j2cache](https://gitee.com/ld/J2Cache) 作为缓存框架的示例。
  - [spring-data-cache-jetcache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/jetcache) - SpringBoot 使用 [jetcache](https://github.com/alibaba/jetcache) 作为缓存框架的示例。
- **中间件**
  - [spring-data-middleware-flyway](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/middleware/flyway) - Spring 使用版本管理中间件 Flyway 示例。
  - [spring-data-middleware-sharding](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/middleware/sharding) - Spring 使用分库分表中间件示例。

## 📚 资料

- **官方**
  - [Spring 官网](https://spring.io/)
  - [Spring Github](https://github.com/spring-projects/spring-framework)
  - [Spring Framework 官方文档](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/index.html)
  - [Spring Boot 官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/data.html)
- **书籍**
  - [《 Spring 实战（第 5 版）》](https://book.douban.com/subject/34949443/)
- **教程**
  - [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
  - [geekbang-lessons](https://github.com/geektime-geekbang/geekbang-lessons)
  - [跟我学 Spring3](http://jinnianshilongnian.iteye.com/blog/1482071)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
