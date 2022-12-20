---
title: SPRING-TUTORIAL
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
permalink: /pages/a1a3d3/
hidden: true
---

# SPRING-TUTORIAL

![license](https://badgen.net/github/license/dunwu/spring-tutorial)
![build](https://travis-ci.com/dunwu/spring-tutorial.svg?branch=master)

> 🍃 **`spring-tutorial`** 是一个 Spring & Spring Boot 教程。
>
> - 🔁 项目同步维护：[Github](https://github.com/dunwu/spring-tutorial/) | [Gitee](https://gitee.com/turnon/spring-tutorial/)
> - 📖 电子书阅读：[Github Pages](https://dunwu.github.io/spring-tutorial/) | [Gitee Pages](http://turnon.gitee.io/spring-tutorial/)

## 📖 内容

### 综合

- [Spring 概述](00.Spring综合/01.Spring概述.md)
- [SpringBoot 知识图谱](00.Spring综合/21.SpringBoot知识图谱.md)
- [SpringBoot 基本原理](00.Spring综合/22.SpringBoot基本原理.md)
- [Spring 面试](00.Spring综合/99.Spring面试.md)

### 核心

- [Spring Bean](01.Spring核心/01.SpringBean.md)
- [Spring IoC](01.Spring核心/02.SpringIoC.md)
- [Spring 依赖查找](01.Spring核心/03.Spring依赖查找.md)
- [Spring 依赖注入](01.Spring核心/04.Spring依赖注入.md)
- [Spring AOP](01.Spring核心/10.SpringAop.md)
- [Spring 资源管理](01.Spring核心/11.Spring资源管理.md)
- [SpringBoot 教程之快速入门](01.Spring核心/21.SpringBoot之快速入门.md)
- [SpringBoot 之属性加载](01.Spring核心/22.SpringBoot之属性加载.md)
- [SpringBoot 之 Profile](01.Spring核心/23.SpringBoot之Profile.md)

### 数据

- [Spring 连接数据源](02.Spring数据/01.Spring连接数据源.md)
- [Spring 之 JDBC](02.Spring数据/02.Spring之JDBC.md)
- [Spring 之事务](02.Spring数据/03.Spring之事务.md)
- [SpringBoot 之 Mybatis](02.Spring数据/22.SpringBoot之Mybatis.md)
- [SpringBoot 之 MongoDB](02.Spring数据/23.SpringBoot之MongoDB.md)
- [SpringBoot 之 Elasticsearch](02.Spring数据/24.SpringBoot之Elasticsearch.md)

### Web

- [Spring WebMvc](03.SpringWeb/01.SpringWebMvc.md)
- [SpringBoot 之应用 EasyUI](03.SpringWeb/21.SpringBoot之应用EasyUI.md)

### IO

- [SpringBoot 之异步请求](04.SpringIO/01.SpringBoot之异步请求.md)
- [SpringBoot 之 Json](04.SpringIO/02.SpringBoot之Json.md)
- [SpringBoot 之邮件](04.SpringIO/03.SpringBoot之邮件.md)

### 集成

- [Spring 集成缓存中间件](05.Spring集成/01.Spring集成缓存.md)
- [Spring 集成定时任务中间件](05.Spring集成/02.Spring集成调度器.md)
- [Spring 集成 Dubbo](05.Spring集成/03.Spring集成Dubbo.md)

### 其他

- [Spring4 升级](99.Spring其他/01.Spring4升级.md)
- [SpringBoot 之 banner](99.Spring其他/21.SpringBoot之banner.md)
- [SpringBoot 之 Actuator](99.Spring其他/22.SpringBoot之Actuator.md)

## 💻 示例

### 数据篇示例

（1）JDBC

| 项目类型   | 示例                                                                                                                                                  | 说明                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Spring     | [spring-data-jdbc](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/spring-data-jdbc)                                             | Spring 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。      |
| SpringBoot | [spring-boot-data-jdbc](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/spring-boot-data-jdbc)                                   | Spring Boot 以 JDBC 方式访问关系型数据库，通过 `JdbcTemplate` 执行基本的 CRUD 操作。 |
| SpringBoot | [spring-boot-data-jdbc-druid](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/spring-boot-data-jdbc-druid)                       | SpringBoot 使用 [Druid](https://github.com/alibaba/druid) 作为数据库连接池。         |
| SpringBoot | [spring-boot-data-jdbc-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/jdbc/spring-boot-data-jdbc-multi-datasource) | SpringBoot 连接多数据源。本示例中同时连接 Mysql 和 H2。                              |

（2）ORM

| 项目类型   | 示例                                                                                                                                                       | 说明                                                                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Spring     | [spring-data-mybatis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/spring-data-mybatis)                                             | Spring 使用 [MyBatis](https://github.com/mybatis/mybatis-3) 作为 ORM 框架访问数据库示例。                                                                                                                    |
| SpringBoot | [spring-boot-data-mybatis-mapper](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/spring-boot-data-mybatis-mapper)                     | SpringBoot 使用 [MyBatis](https://github.com/mybatis/mybatis-3) + [Mapper](https://github.com/abel533/Mapper) + [PageHelper](https://github.com/pagehelper/Mybatis-PageHelper) 作为 ORM 框架访问数据库示例。 |
| SpringBoot | [spring-boot-data-mybatis-plus](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/spring-boot-data-mybatis-plus)                         | SpringBoot 使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。                                                                                                       |
| SpringBoot | [spring-boot-data-mybatis-multi-datasource](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/spring-boot-data-mybatis-multi-datasource) | SpringBoot 连接多数据源，并使用 [MyBatis Plus](https://github.com/baomidou/mybatis-plus) 作为 ORM 框架访问数据库示例。                                                                                       |
| SpringBoot | [spring-boot-data-jpa](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/orm/spring-boot-data-jpa)                                           | SpringBoot 使用 JPA 作为 ORM 框架访问数据库示例。                                                                                                                                                            |

（3）Nosql 数据库

| 项目类型   | 示例                                                                                                                                   | 说明                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Spring     | [spring-data-nosql](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/spring-data-nosql)                           | Spring 访问各种 NoSQL 的示例。                                                    |
| SpringBoot | [spring-boot-data-redis](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/spring-boot-data-redis)                 | SpringBoot 访问 [Redis](https://redis.io/) 单节点、集群的示例。                   |
| SpringBoot | [spring-boot-data-mongodb](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/spring-boot-data-mongodb)             | SpringBoot 访问 [MongoDB](https://www.mongodb.com/) 的示例。                      |
| SpringBoot | [spring-boot-data-elasticsearch](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/spring-boot-data-elasticsearch) | SpringBoot 访问 [Elasticsearch](https://www.elastic.co/guide/index.html) 的示例。 |
| SpringBoot | [spring-boot-data-hdfs](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/nosql/spring-boot-data-hdfs)                   | SpringBoot 访问 HDFS 的示例。                                                     |

（4）缓存

| 项目类型   | 示例                                                                                                                                     | 说明                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| SpringBoot | [spring-boot-data-cache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/spring-boot-data-cache)                   | SpringBoot 默认缓存框架的示例。                                                      |
| SpringBoot | [spring-boot-data-cache-j2cache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/spring-boot-data-cache-j2cache)   | SpringBoot 使用 [j2cache](https://gitee.com/ld/J2Cache) 作为缓存框架的示例。         |
| SpringBoot | [spring-boot-data-cache-jetcache](https://github.com/dunwu/spring-tutorial/tree/master/codes/data/cache/spring-boot-data-cache-jetcache) | SpringBoot 使用 [jetcache](https://github.com/alibaba/jetcache) 作为缓存框架的示例。 |

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

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾