---
icon: logos:mysql
title: MySQL
cover: https://raw.githubusercontent.com/dunwu/images/master/202509141351123.webp
date: 2020-02-10 14:27:39
categories:
  - 数据库
  - 关系型数据库
  - MySQL
tags:
  - 数据库
  - 关系型数据库
  - MySQL
permalink: /pages/b3143f7c/
hidden: true
index: false
---

# MySQL

::: info 概述

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的RDBMS应用软件之一。

MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

:::

## 📖 内容

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2023/09/ed4d5381a82942639cb3fca5292f9301.png)

- [MySQL 概述]([MySQL]概述.md) - 关键词：`MySQL`、`关系型数据库`、`RDBMS`、`InnoDB`、`存储引擎`、`OLTP`、`OLAP`、`DBMS`
- [MySQL 建模]([MySQL]建模.md) - 关键词：`数据类型`、`VARCHAR`、`CHAR`、`DECIMAL`、`BIGINT`、`DATETIME`、`TIMESTAMP`、`utf8mb4`
- [MySQL CRUD]([MySQL]CRUD.md) - 关键词：`CRUD`、`DDL`、`INSERT`、`SELECT`、`UPDATE`、`DELETE`、`约束`、`索引管理`
- [MySQL 存储]([MySQL]存储.md) - 关键词：`InnoDB`、`MyISAM`、`存储引擎`、`Buffer Pool`、`聚簇索引`、`Change Buffer`、`表空间`、`redo log`
- [MySQL 索引]([MySQL]索引.md) - 关键词：`B+Tree索引`、`聚簇索引`、`覆盖索引`、`最左匹配`、`Hash索引`、`前缀索引`、`联合索引`、`索引失效`
- [MySQL 事务]([MySQL]事务.md) - 关键词：`ACID`、`MVCC`、`事务隔离级别`、`可重复读`、`ReadView`、`UndoLog`、`幻读`、`分布式事务`
- [MySQL 锁]([MySQL]锁.md) - 关键词：`行锁`、`间隙锁`、`Next-Key Lock`、`死锁`、`悲观锁`、`乐观锁`、`共享锁`、`独享锁`
- [MySQL 复制]([MySQL]复制.md) - 关键词：`主从复制`、`binlog`、`读写分离`、`relay log`、`主备配置`、`数据同步`、`高可用`、`slave`
- [MySQL 架构]([MySQL]架构.md) - 关键词：`Server层`、`存储引擎`、`redo log`、`binlog`、`WAL`、`两阶段提交`、`优化器`、`执行器`
- [MySQL 优化]([MySQL]优化.md) - 关键词：`EXPLAIN`、`慢查询`、`索引优化`、`SQL优化`、`覆盖索引`、`分页优化`、`JOIN优化`、`执行计划`
- [MySQL 运维]([MySQL]运维.md) - 关键词：`mysqldump`、`用户管理`、`主从部署`、`my.cnf`、`慢查询`、`max_connections`、`Buffer Pool`、`备份恢复`
- [MySQL 面试]([MySQL]面试.md) 💯
- [MySQL 面试之索引篇]([MySQL]面试之索引篇.md) 💯
- [MySQL 面试之事务和锁篇]([MySQL]面试之事务和锁篇.md) 💯

## 📚 资料

- **官方**
  - [MySQL 官网](https://www.mysql.com/)
  - [MySQL 官方文档](https://dev.mysql.com/doc/)
  - **官方 PPT**
    - [How to Analyze and Tune MySQL Queries for Better Performance](https://www.mysql.com/cn/why-mysql/presentations/tune-mysql-queries-performance/)
    - [MySQL Performance Tuning 101](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-tuning101/)
    - [MySQL Performance Schema & Sys Schema](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-sys-schema/)
    - [MySQL Performance: Demystified Tuning & Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-performance-tuning-best-practices/)
    - [MySQL Security Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-security-best-practices/)
    - [MySQL Cluster Deployment Best Practices](https://www.mysql.com/cn/why-mysql/presentations/mysql-cluster-deployment-best-practices/)
    - [MySQL High Availability with InnoDB Cluster](https://www.mysql.com/cn/why-mysql/presentations/mysql-high-availability-innodb-cluster/)
- **书籍**
  - [《高性能 MySQL》](https://book.douban.com/subject/23008813/) - 经典，适合 DBA 或作为开发者的参考手册【进阶】
  - [《MySQL 技术内幕：InnoDB 存储引擎》](https://book.douban.com/subject/24708143/)
  - [《MySQL 必知必会》](https://book.douban.com/subject/3354490/) - MySQL 的基本概念和语法【入门】
- **教程**
  - [SQL 必知必会](https://time.geekbang.org/column/intro/192) - 极客 SQL 教程
  - [极客时间教程 - MySQL 实战 45 讲](https://time.geekbang.org/column/intro/139) - 极客 MySQL 教程
  - [runoob.com MySQL 教程](http://www.runoob.com/mysql/mysql-tutorial.md) - 入门级 SQL 教程
  - [mysql-tutorial](https://github.com/jaywcjlove/mysql-tutorial)
- **文章**
  - [MySQL 索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.md)
  - [Some study on database storage internals](https://medium.com/@kousiknath/data-structures-database-storage-internals-1f5ed3619d43)
  - [Sharding Pinterest: How we scaled our MySQL fleet](https://medium.com/@Pinterest_Engineering/sharding-pinterest-how-we-scaled-our-mysql-fleet-3f341e96ca6f)
  - [Guide to MySQL High Availability](https://www.mysql.com/cn/why-mysql/white-papers/mysql-guide-to-high-availability-solutions/)
  - [Choosing MySQL High Availability Solutions](https://dzone.com/articles/choosing-mysql-high-availability-solutions)
  - [High availability with MariaDB TX: The definitive guide](https://mariadb.com/sites/default/files/content/Whitepaper_High_availability_with_MariaDB-TX.pdf)
  - [How to create unique row ID in sharded databases?](https://stackoverflow.com/questions/788829/how-to-create-unique-row-id-in-sharded-databases)
  - [SQL Azure Federation – Introduction](http://geekswithblogs.net/shaunxu/archive/2012/01/07/sql-azure-federation-ndash-introduction.aspx)
  - MySQL 相关经验
    - [20+ 条 MySQL 性能优化的最佳经验](https://www.jfox.info/20-tiao-mysql-xing-nen-you-hua-de-zui-jia-jing-yan.html)
    - [Booking.com: Evolution of MySQL System Design](https://www.percona.com/live/mysql-conference-2015/sessions/bookingcom-evolution-mysql-system-design) ，Booking.com 的 MySQL 数据库使用的演化，其中有很多不错的经验分享，我相信也是很多公司会遇到的的问题。
    - [Tracking the Money - Scaling Financial Reporting at Airbnb](https://medium.com/airbnb-engineering/tracking-the-money-scaling-financial-reporting-at-airbnb-6d742b80f040) ，Airbnb 的数据库扩展的经验分享。
    - [Why Uber Engineering Switched from Postgres to MySQL](https://eng.uber.com/mysql-migration/) ，无意比较两个数据库谁好谁不好，推荐这篇 Uber 的长文，主要是想让你从中学习到一些经验和技术细节，这是一篇很不错的文章。
  - MySQL 集群复制
    - [Monitoring Delayed Replication, With A Focus On MySQL](https://engineering.imvu.com/2013/01/09/monitoring-delayed-replication-with-a-focus-on-mysql/)
    - [Mitigating replication lag and reducing read load with freno](https://githubengineering.com/mitigating-replication-lag-and-reducing-read-load-with-freno/)
    - [Better Parallel Replication for MySQL](https://medium.com/booking-com-infrastructure/better-parallel-replication-for-mysql-14e2d7857813)
    - [Evaluating MySQL Parallel Replication Part 2: Slave Group Commit](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-2-slave-group-commit-459026a141d2)
    - [Evaluating MySQL Parallel Replication Part 3: Benchmarks in Production](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-3-benchmarks-in-production-db5811058d74)
    - [Evaluating MySQL Parallel Replication Part 4: More Benchmarks in Production](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-4-more-benchmarks-in-production-49ee255043ab)
    - [Evaluating MySQL Parallel Replication Part 4, Annex: Under the Hood](https://medium.com/booking-com-infrastructure/evaluating-mysql-parallel-replication-part-4-annex-under-the-hood-eb456cf8b2fb)
  - MySQL 数据分区
    - [StackOverflow: MySQL sharding approaches?](https://stackoverflow.com/questions/5541421/mysql-sharding-approaches)
    - [Why you don’t want to shard](https://www.percona.com/blog/2009/08/06/why-you-dont-want-to-shard/)
    - [How to Scale Big Data Applications](https://www.percona.com/sites/default/files/presentations/How to Scale Big Data Applications.pdf)
    - [MySQL Sharding with ProxySQL](https://www.percona.com/blog/2016/08/30/mysql-sharding-with-proxysql/)
  - 各公司的 MySQL 数据分区经验分享
    - [MailChimp: Using Shards to Accommodate Millions of Users](https://devs.mailchimp.com/blog/using-shards-to-accommodate-millions-of-users/)
    - [Uber: Code Migration in Production: Rewriting the Sharding Layer of Uber’s Schemaless Datastore](https://eng.uber.com/schemaless-rewrite/)
    - [Sharding & IDs at Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
    - [Airbnb: How We Partitioned Airbnb’s Main Database in Two Weeks](https://medium.com/airbnb-engineering/how-we-partitioned-airbnb-s-main-database-in-two-weeks-55f7e006ff21)
- **更多资源**
  - [awesome-mysql](https://github.com/jobbole/awesome-mysql-cn) - MySQL 的资源列表

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
