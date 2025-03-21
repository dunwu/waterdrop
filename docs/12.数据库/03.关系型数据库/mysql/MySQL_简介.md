---
icon: logos:mysql
title: MySQL 简介
cover: https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/ECX-1909_Hero_MySQL_600x400%402x-1.webp
date: 2025-03-13 08:05:53
categories:
  - 数据库
  - 关系型数据库
  - mysql
tags:
  - 数据库
  - 关系型数据库
  - mysql
permalink: /pages/d46aa18d/
---

# MySQL 简介

::: info 概述

**[MySQL](http://www.mysql.com/) 是一个关系型数据库管理系统**，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL 是最好的 RDBMS 应用软件之一。

本文简单介绍了 MySQL 的功能、特性、发行版本、简史、概念，可以让读者在短时间内对于 MySQL 有一个初步的认识。

:::

<!-- more -->

## 什么是 MySQL

**MySQL 是一个关系型数据库管理系统**，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL 是最好的 RDBMS 应用软件之一。

关系型数据库是指采用了关系模型来组织数据的数据库。关系模型是一种数据模型，它表示数据之间的联系，包括一对一、一对多和多对多的关系。在关系型数据库中，数据以表格的形式存储，每个表格称为一个“关系”，每个关系由行（记录或元组）和列（字段或属性）组成。

## MySQL 特性

- 使用 C和 C++编写，并使用了多种编译器进行测试，保证了源代码的可移植性。
- 适用于许多不同的平台，参考：https://www.mysql.com/support/supportedplatforms/database.html
- 为多种编程语言提供了 API。这些编程语言包括 C、C++、Python、Java、Perl、PHP、Eiffel、Ruby,.NET和 Tcl 等。
- 支持多线程，充分利用 CPU 资源。
- 优化的 SQL查询算法，有效地提高查询速度。
- 既能够作为一个单独的应用程序应用在客户端服务器网络环境中，也能够作为一个库而嵌入到其他的软件中。
- 提供多语言支持，常见的编码如中文的 GB 2312、BIG5，日文的 Shift_JIS等都可以用作数据表名和数据列名。
- 提供 TCP/IP、ODBC 和 JDBC等多种数据库连接途径。
- 提供用于管理、检查、优化数据库操作的管理工具。
- 支持大型的数据库。可以处理拥有上千万条记录的大型数据库。
- 支持多种存储引擎。
- MySQL 是开源的，所以你不需要支付额外的费用。
- MySQL 使用标准的 SQL数据语言形式。
- MySQL 对 PHP 有很好的支持，PHP是目前最流行的 Web 开发语言。
- MySQL是可以定制的，采用了 GPL协议，你可以修改源码来开发自己的 MySQL 系统。
- 在线 DDL/更改功能，数据架构支持动态应用程序和开发人员灵活性（5.6新增）
- 复制全局事务标识，可支持自我修复式集群（5.6新增）
- 复制无崩溃从机，可提高可用性（5.6新增）
- 复制多线程从机，可提高性能（5.6新增）
- 3倍更快的性能（5.7新增）
- 新的优化器（5.7新增）
- 原生JSON支持（5.7新增）
- 多源复制（5.7新增）
- GIS的空间扩展（5.7新增）

## MySQL 简史

![](https://www.datasciencecentral.com/wp-content/uploads/2021/10/growth_mysql-1.png)

- **1.0** - 1995 年，MySQL 1.0 发布，仅供内部使用。
- **3.23** - 1999 年，MySQL AB 公司成立。同年，发布 MySQL 3.23，该版本集成了 Berkeley DB 存储引擎。
- **4.0** - 2002 年，集成 InnoDB 存储引擎。
- **5.0** - 2005 年，支持分布式事务。
- **5.5** - 2010 年，InnoDB 成为默认存储引擎。
- **5.6** - 2011 年
- **5.7** - 2013 年
- **8.0** - 2016 年

## MySQL 概念

- **数据库** - 数据库 (DataBase 简称 DB) 就是信息的集合或者说数据库是由数据库管理系统管理的数据的集合。
- **数据库管理系统** - 数据库管理系统 (Database Management System 简称 DBMS) 是一种操纵和管理数据库的大型软件，通常用于建立、使用和维护数据库。
- **数据库系统** - 数据库系统 (Data Base System，简称 DBS) 通常由软件、数据库和数据管理员 (DBA) 组成。
- **数据库管理员** - 数据库管理员 (Database Administrator, 简称 DBA) 负责全面管理和控制数据库系统。
- **OLTP** - 联机事务处理 (OLTP) 系统的主要用途是处理数据库事务。
- **OLAP** - 联机分析处理 (OLAP) 系统的主要用途是分析聚合数据。
- **元组** - 元组（Tuple）是关系数据库中的基本概念，关系是一张表，表中的每行（即数据库中的每条记录）就是一个元组，每列就是一个属性。 在二维表里，元组也称为行。
- **码** - 码就是能唯一标识实体的属性，对应表中的列。
- **候选码** - 若关系中的某一属性或属性组的值能唯一的标识一个元组，而其任何、子集都不能再标识，则称该属性组为候选码。例如：在学生实体中，“学号”是能唯一的区分学生实体的，同时又假设“姓名”、“班级”的属性组合足以区分学生实体，那么{学号}和{姓名，班级}都是候选码。
- **主码** - 主码也叫主键。主码是从候选码中选出来的。一个实体集中只能有一个主码，但可以有多个候选码。
- **外码** - 外码也叫外键。如果一个关系中的一个属性是另外一个关系中的主码则这个属性为外码。
- **主属性** - 候选码中出现过的属性称为主属性。比如关系 工人（工号，身份证号，姓名，性别，部门）. 显然工号和身份证号都能够唯一标示这个关系，所以都是候选码。工号、身份证号这两个属性就是主属性。如果主码是一个属性组，那么属性组中的属性都是主属性。
- **非主属性** - 不包含在任何一个候选码中的属性称为非主属性。比如在关系——学生（学号，姓名，年龄，性别，班级）中，主码是“学号”，那么其他的“姓名”、“年龄”、“性别”、“班级”就都可以称为非主属性。

## 参考资料

- [《高性能 MySQL》](https://book.douban.com/subject/23008813/)
- [极客时间教程 - MySQL 实战 45 讲](https://time.geekbang.org/column/intro/139)
- [MySQL 官方文档之 MySQL 数据库管理系统概述](https://dev.mysql.com/doc/refman/8.4/en/what-is.html)