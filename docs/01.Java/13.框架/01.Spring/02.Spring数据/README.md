---
title: Spring 数据篇
date: 2022-09-18 11:05:36
categories:
  - Java
  - 框架
  - Spring
  - Spring数据
tags:
  - Java
  - 框架
  - Spring
  - SpringBoot
  - 数据库
permalink: /pages/b912d1/
hidden: true
index: false
---

# Spring 数据篇

## 📖 内容

- [Spring 之数据源](01.Spring之数据源.md)
- [Spring 之 JDBC](02.Spring之JDBC.md)
- [Spring 之事务](03.Spring之事务.md)
- [Spring 之 JPA](04.Spring之JPA.md)
- [Spring 集成 Mybatis](10.Spring集成Mybatis.md)
- [Spring 访问 Redis](21.Spring访问Redis.md)
- [Spring 访问 MongoDB](22.Spring访问MongoDB.md)
- [Spring 访问 Elasticsearch](23.Spring访问Elasticsearch.md)

## 💻 示例

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
  - [Spring Framework 官方文档](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/index.html)
  - [Spring Github](https://github.com/spring-projects/spring-framework)
- **书籍**
  - [《Spring In Action》](https://item.jd.com/12622829.html)
- **教程**
  - [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
  - [geekbang-lessons](https://github.com/geektime-geekbang/geekbang-lessons)
  - [跟我学 Spring3](http://jinnianshilongnian.iteye.com/blog/1482071)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾ 🎯 [我的博客](https://github.com/dunwu/blog) ◾