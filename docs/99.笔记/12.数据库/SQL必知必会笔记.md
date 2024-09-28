---
title: 《SQL 必知必会》笔记
date: 2024-09-29 07:45:34
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 关系型数据库
permalink: /pages/abe5a720/
---

# 《SQL 必知必会》笔记

## 第 1 课 了解 SQL

### 数据库基础

- 数据库（database） - 保存有组织的数据的容器（通常是一个文件或一组文件）。
- 表（table） - 某种特定类型数据的结构化清单。
- 模式 - 关于数据库和表的布局及特性的信息。
- 列（column） - 表中的一个字段。所有表都是由一个或多个列组成的。
- 数据类型 - 所允许的数据的类型。每个表列都有相应的数据类型，它限制（或允许）该列中存储的数据。
- 行（row） - 表中的一个记录。
- 主键（primary key） - 一列（或一组列），其值能够唯一标识表中每一行。表中的任何列都可以作为主键，只要它满足以下条件：
  - 任意两行都不具有相同的主键值；
  - 每一行都必须具有一个主键值（主键列不允许 NULL 值）；
  - 主键列中的值不允许修改或更新；
  - 主键值不能重用（如果某行从表中删除，它的主键不能赋给以后的新行）。

### 什么是 SQL

SQL 是 Structured Query Language（结构化查询语言）的缩写。SQL 是一种专门用来与数据库沟通的语言。

## 第 2 课 检索数据

作为 SQL 组成部分的保留字。关键字不能用作表或列的名字。

检索单列

```sql
SELECT prod_name
FROM Products;
```

检索多列

```sql
SELECT prod_id, prod_name, prod_price
FROM Products;
```

检索所有列

```sql
SELECT *
FROM Products;
```

检索去重

```sql
SELECT DISTINCT vend_id
FROM Products;
```

限制数量

检索 TOP5 数据：

```sql
-- SQL Server 和 Access
SELECT TOP 5 prod_name
FROM Products;

-- DB2
SELECT prod_name
FROM Products
FETCH FIRST 5 ROWS ONLY;

-- Oracle
SELECT prod_name
FROM Products
WHERE ROWNUM <=5;

-- MySQL、MariaDB、PostgreSQL 或者 SQLite
SELECT prod_name
FROM Products
LIMIT 5;
-- 检索从第 5 行起的 5 行数据
SELECT prod_name
FROM Products
LIMIT 5 OFFSET 5;
-- MySQL 和 MariaDB 中，上面的示例可以简化如下
SELECT prod_name
FROM Products
LIMIT 5, 5;
```

使用注释

```sql
SELECT prod_name -- 这是一条注释
FROM Products;

# 这是一条注释
SELECT prod_name
FROM Products;

/* SELECT prod_name, vend_id
FROM Products; */
SELECT prod_name
FROM Products;
```

## 第 3 课 排序检索数据

SQL 语句由子句构成，有些子句是必需的，有些则是可选的。一个子句通常由一个关键字加上所提供的数据组成。例如，SELECT 语句中的 FROM 子句。

ORDER BY 子句取一个或多个列的名字，据此对输出进行排序。ORDER BY 支持两种排序方式：ASC（升序） 和 DESC（降序）。

按单列排序：

```sql
SELECT prod_name
FROM Products
ORDER BY prod_name;
```

按多列排序：

```sql
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC, prod_name;
```

按列位置排序（不推荐）：

```sql
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY 2, 3;
```

指定排序方向

```sql
SELECT prod_id, prod_price, prod_name
FROM Products
ORDER BY prod_price DESC;
```

## 第 4 课 过滤数据

只检索所需数据需要指定搜索条件（search criteria），搜索条件也称为过滤条件（filter condition）。

在 SELECT 语句中，数据根据 WHERE 子句中指定的搜索条件进行过滤。

```sql
SELECT prod_name, prod_price
FROM Products
WHERE prod_price = 3.49;
```

检索所有价格小于 10 美元的产品。

```sql
SELECT prod_name, prod_price
FROM Products
WHERE prod_price < 10;
```

检索所有不是供应商 DLL01 制造的产品

```sql
-- 下面两条查询语句作用相同

SELECT vend_id, prod_name
FROM Products
WHERE vend_id <> 'DLL01';

SELECT vend_id, prod_name
FROM Products
WHERE vend_id != 'DLL01';
```

检索价格在 5 美元和 10 美元之间的所有产品

```sql
SELECT prod_name, prod_price
FROM Products
WHERE prod_price BETWEEN 5 AND 10;
```

检索所有没有邮件地址的顾客

```sql
SELECT cust_name
FROM CUSTOMERS
WHERE cust_email IS NULL;
```

## 第 5 课 高级数据过滤

- **AND** - AND 用来表示检索满足所有给定条件的行。
- **OR** - OR 用来表示检索匹配任一给定条件的行。

### 组合 WHERE 子句

检索由供应商 DLL01 制造且价格小于等于 4 美元的所有产品的名称和价格

```sql
SELECT prod_id, prod_price, prod_name
FROM Products
WHERE vend_id = 'DLL01' AND prod_price <= 4;
```

检索由供应商 DLL01 或供应商 BRS01 制造的所有产品的名称和价格

```sql
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';
```

WHERE 子句可以包含任意数目的 AND 和 OR 操作符。允许两者结合以进行复杂、高级的过滤。

SQL 在处理 OR 操作符前，优先处理 AND 操作符。

下面的示例中，SQL 会理解为由供应商 BRS01 制造的价格为 10 美元以上的所有产品，以及由供应商 DLL01 制造的所有产品，而不管其价格如何。

```sql
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01'
AND prod_price >= 10;
```

任何时候使用具有 AND 和 OR 操作符的 WHERE 子句，都应该使用圆括号明确地分组操作符。

```sql
SELECT prod_name, prod_price
FROM Products
WHERE (vend_id = 'DLL01' OR vend_id = 'BRS01')
AND prod_price >= 10;
```

### IN 操作符

IN 操作符用来指定条件范围，范围中的每个条件都可以进行匹配。IN 取一组由逗号分隔、括在圆括号中的合法值。

```sql
SELECT prod_name, prod_price
FROM Products
WHERE vend_id IN ( 'DLL01', 'BRS01' )
ORDER BY prod_name;
```

和下面的示例作用相同

```sql
SELECT prod_name, prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01'
ORDER BY prod_name;
```

为什么要使用 IN 操作符？其优点如下。

- 在有很多合法选项时，IN 操作符的语法更清楚，更直观。
- 在与其他 AND 和 OR 操作符组合使用 IN 时，求值顺序更容易管理。
- IN 操作符一般比一组 OR 操作符执行得更快。
- IN 的最大优点是可以包含其他 SELECT 语句，能够更动态地建立 HERE 子句。

### NOT 操作符

NOT 用来否定其后条件的关键字。

检索除 DLL01 之外的所有供应商制造的产品

```sql
SELECT prod_name
FROM Products
WHERE NOT vend_id = 'DLL01'
ORDER BY prod_name;
```

和下面的示例作用相同

```sql
SELECT prod_name
FROM Products
WHERE vend_id <> 'DLL01'
ORDER BY prod_name;
```

## 第 6 课 用通配符进行过滤

通配符（wildcard）用来匹配值的一部分的特殊字符。

搜索模式（search pattern）由字面值、通配符或两者组合构成的搜索条件。

在搜索子句中使用通配符，必须使用 LIKE 操作符。LIKE 指示 DBMS，后跟的搜索模式利用通配符匹配而不是简单的相等匹配进行比较。

### 百分号（%）通配符

%表示任何字符出现任意次数。

检索所有产品名以 Fish 开头的产品

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE 'Fish%';
```

匹配任何位置上包含文本 bean bag 的值，
不论它之前或之后出现什么字符。

检索产品名中包含 bean bag 的产品

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '%bean bag%';
```

检索产品名中以 F 开头，y 结尾的产品

```sql
SELECT prod_name
FROM Products
WHERE prod_name LIKE 'F%y';
```

### 下划线（\_）通配符

下划线（\_）的用途与%一样，但它只匹配单个字符。

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_name LIKE '__ inch teddy bear';
```

### 方括号（[ ]）通配符

方括号（[]）通配符用来指定一个字符集，它必须匹配指定位置（通配符的位置）的一个字符。

> 说明：并不是所有 DBMS 都支持用来创建集合的 []。只有微软的 Access 和 SQL Server 支持集合。

找出所有名字以 J 或 M 开头的联系人：

```sql
SELECT cust_contact
FROM Customers
WHERE cust_contact LIKE '[JM]%'
ORDER BY cust_contact;
```

## 第 7 课 创建计算字段

### 拼接字段

拼接字符串值：

```sql
-- Access 和 SQL Server
SELECT vend_name + ' (' + vend_country + ')'
FROM Vendors
ORDER BY vend_name;

-- DB2、Oracle、PostgreSQL、SQLite 和 Open Office Base
SELECT vend_name || ' (' || vend_country || ')'
FROM Vendors
ORDER BY vend_name;

-- MySQL 或 MariaDB
SELECT Concat(vend_name, ' (', vend_country, ')')
FROM Vendors
ORDER BY vend_name;
```

去除字符串中的空格

```sql
-- Access 和 SQL Server
SELECT RTRIM(vend_name) + ' (' + RTRIM(vend_country) + ')'
FROM Vendors
ORDER BY vend_name;

-- DB2、Oracle、PostgreSQL、SQLite 和 Open Office Base
SELECT RTRIM(vend_name) || ' (' || RTRIM(vend_country) || ')'
FROM Vendors
ORDER BY vend_name;
```

### 别名

使用别名

```sql
-- Access 和 SQL Server
SELECT RTRIM(vend_name) + ' (' + RTRIM(vend_country) + ')'
AS vend_title
FROM Vendors
ORDER BY vend_name;

-- DB2、Oracle、PostgreSQL、SQLite 和 Open Office Base
SELECT RTRIM(vend_name) || ' (' || RTRIM(vend_country) || ')'
AS vend_title
FROM Vendors
ORDER BY vend_name;

-- MySQL 和 MariaDB
SELECT Concat(vend_name, ' (', vend_country, ')')
AS vend_title
FROM Vendors
ORDER BY vend_name;
```

### 执行算术计算

汇总物品的价格（单价乘以订购数量）：

```sql
SELECT prod_id,
quantity,
item_price,
quantity*item_price AS expanded_price
FROM OrderItems
WHERE order_num = 20008;
```

## 第 8 课 使用函数处理数据

大多数 SQL 实现支持以下类型的函数：

- 算术函数
- 文本处理函数
- 时间处理函数
- 聚合函数
- 返回 DBMS 正使用的特殊信息（如返回用户登录信息）的系统函数

### 文本处理函数

| 函数                                     | 说明                    |
| ---------------------------------------- | ----------------------- |
| LEFT()（或使用子字符串函数）             | 返回字符串左边的字符    |
| LENGTH()（也使用 DATALENGTH() 或 LEN()） | 返回字符串的长度        |
| LOWER()（Access 使用 LCASE()）           | 将字符串转换为小写      |
| LTRIM()                                  | 去掉字符串左边的空格    |
| RIGHT()（或使用子字符串函数）            | 返回字符串右边的字符    |
| RTRIM()                                  | 去掉字符串右边的空格    |
| SOUNDEX()                                | 返回字符串的 SOUNDEX 值 |
| UPPER()（Access 使用 UCASE()）           | 将字符串转换为大写      |

UPPER() 将文本转换为大写

```sql
SELECT vend_name, UPPER(vend_name) AS vend_name_upcase
FROM Vendors
ORDER BY vend_name;
```

### 日期和时间处理函数

```sql
-- SQL Server
SELECT order_num
FROM Orders
WHERE DATEPART(yy, order_date) = 2012;

-- Access
SELECT order_num
FROM Orders
WHERE DATEPART('yyyy', order_date) = 2012;

-- PostgreSQL
SELECT order_num
FROM Orders
WHERE DATE_PART('year', order_date) = 2012;

-- Oracle
SELECT order_num
FROM Orders
WHERE to_number(to_char(order_date, 'YYYY')) = 2012;

-- MySQL 和 MariaDB
SELECT order_num
FROM Orders
WHERE YEAR(order_date) = 2012;
```

### 数值处理函数

| 函数   | 说明               |
| ------ | ------------------ |
| ABS()  | 返回一个数的绝对值 |
| COS()  | 返回一个角度的余弦 |
| EXP()  | 返回一个数的指数值 |
| PI()   | 返回圆周率         |
| SIN()  | 返回一个角度的正弦 |
| SQRT() | 返回一个数的平方根 |
| TAN()  | 返回一个角度的正切 |

## 第 9 课 汇总数据

聚集函数（aggregate function）对某些行运行的函数，计算并返回一个值。

| 函数    | 说明             |
| ------- | ---------------- |
| AVG()   | 返回某列的平均值 |
| COUNT() | 返回某列的行数   |
| MAX()   | 返回某列的最大值 |
| MIN()   | 返回某列的最小值 |
| SUM()   | 返回某列值之和   |

AVG() 通过对表中行数计数并计算其列值之和，求得该列的平均值。

使用 AVG() 返回 Products 表中所有产品的平均价格：

```sql
SELECT AVG(prod_price) AS avg_price
FROM Products;
```

COUNT() 函数进行计数。可利用 COUNT() 确定表中行的数目或符合特定条件的行的数目。

返回 Customers 表中顾客的总数：

```sql
SELECT COUNT(*) AS num_cust
FROM Customers;
```

只对具有电子邮件地址的客户计数：

```sql
SELECT COUNT(cust_email) AS num_cust
FROM Customers;
```

MAX() 返回指定列中的最大值。

返回 Products 表中最贵物品的价格：

```sql
SELECT MAX(prod_price) AS max_price
FROM Products;
```

MIN() 返回指定列的最小值。

返回 Products 表中最便宜物品的价格

```sql
SELECT MIN(prod_price) AS min_price
FROM Products;
```

SUM() 用来返回指定列值的和（总计）。

返回订单中所有物品数量之和

```sql
SELECT SUM(quantity) AS items_ordered
FROM OrderItems
WHERE order_num = 20005;
```

### 组合聚集函数

```sql
SELECT COUNT(*) AS num_items,
MIN(prod_price) AS price_min,
MAX(prod_price) AS price_max,
AVG(prod_price) AS price_avg
FROM Products;
```

## 第 10 课 分组数据

## 第 11 课 使用子查询

## 第 12 课 联结表

## 第 13 课 创建高级联结

## 第 14 课 组合查询

## 第 15 课 插入数据

## 第 16 课 更新和删除数据

## 第 17 课 创建和操纵表

## 第 18 课 使用视图

## 第 19 课 使用存储过程

## 第 20 课 管理事务处理

## 第 21 课 使用游标

## 第 22 课 高级 SQL 特性

## 参考资料

- [《SQL 必知必会》](https://book.douban.com/subject/35167240/)