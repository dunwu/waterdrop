---
title: 《SQL 必知必会》笔记
date: 2024-09-29 07:45:34
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 关系型数据库
permalink: /pages/cda70ebb/
---

# 《SQL 必知必会》笔记

## 第 1 课 了解 SQL

### 数据库基础

- **数据库**：保存有组织数据的容器
- **表**：特定类型数据的结构化清单
- **模式**：数据库和表的布局及特性
- **列**：表中的一个字段
- **数据类型**：限制列中允许存储的数据类型
- **行**：表中的一条记录
- **主键**：唯一标识表中每一行，不允许 NULL、不允许重复、不可修改、不可重用

### 什么是 SQL

SQL（Structured Query Language）是专门用来与数据库沟通的结构化查询语言。

## 第 2 课 检索数据

关键字不能用作表或列的名字。

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

`ORDER BY` 支持 `ASC`（升序）和 `DESC`（降序）。

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

使用 `WHERE` 子句指定过滤条件。

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

- **AND**：检索满足所有条件的行
- **OR**：检索匹配任一条件的行
- **优先级**：AND 优先于 OR，应使用括号明确分组

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

指定条件范围，比一组 OR 更快，可包含子查询。

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

## 第 6 课 通配符过滤

通配符用于匹配值的一部分，配合 `LIKE` 操作符使用。

### 通配符类型

| 通配符 | 说明 | 示例 |
| :--- | :--- | :--- |
| `%` | 任意字符出现任意次数 | `'Fish%'`、`'%bean bag%'`、`'F%y'` |
| `_` | 匹配单个字符 | `'__ inch teddy bear'` |
| `[ ]` | 匹配指定位置的一个字符（仅 Access/SQL Server） | `'[JM]%'` |

## 第 7 课 计算字段

### 拼接字段

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

使用 `AS` 关键字定义别名。

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

函数类型：算术函数、文本处理函数、时间处理函数、聚合函数、系统函数

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

| 函数 | 说明 |
| :--- | :--- |
| `AVG()` | 返回某列的平均值 |
| `COUNT()` | 返回某列的行数 |
| `MAX()` | 返回某列的最大值 |
| `MIN()` | 返回某列的最小值 |
| `SUM()` | 返回某列值之和 |

```sql
SELECT AVG(prod_price) AS avg_price
FROM Products;
```

`COUNT(*)` 计数所有行，`COUNT(column)` 只计数非 NULL 行。

返回顾客总数：

```sql
SELECT COUNT(*) AS num_cust
FROM Customers;
```

只对具有邮件地址的顾客计数：

```sql
SELECT COUNT(cust_email) AS num_cust
FROM Customers;
```

`MAX()`/`MIN()` 返回最大/最小值：

```sql
SELECT MAX(prod_price) AS max_price
FROM Products;
```

```sql
SELECT MIN(prod_price) AS min_price
FROM Products;
```

`SUM()` 返回值之和：

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

使用 `GROUP BY` 子句建立分组。

```sql
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
GROUP BY vend_id;
```

**GROUP BY 要点**：
- 可包含任意数目的列，支持嵌套分组
- 每列必须是检索列或有效表达式（不能是聚集函数/别名）
- SELECT 中非聚集列必须在 GROUP BY 中给出
- NULL 值作为一组返回
- 位置：WHERE 之后、ORDER BY 之前

**HAVING**：过滤分组（WHERE 过滤行）

过滤两个以上订单的分组

```sql
SELECT cust_id, COUNT(*) AS orders
FROM Orders
GROUP BY cust_id
HAVING COUNT(*) >= 2;
```

列出具有两个以上产品且其价格大于等于 4 的供应商：

```sql
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
WHERE prod_price >= 4
GROUP BY vend_id
HAVING COUNT(*) >= 2;
```

检索包含三个或更多物品的订单号和订购物品的数目：

```sql
SELECT order_num, COUNT(*) AS items
FROM orderitems
GROUP BY order_num
HAVING COUNT(*) >= 3;
```

要按订购物品的数目排序输出，需要添加 ORDER BY 子句

```sql
SELECT order_num, COUNT(*) AS items
FROM orderitems
GROUP BY order_num
HAVING COUNT(*) >= 3
ORDER BY items, order_num;
```

**子句顺序**：`SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY`

## 第 11 课 子查询

子查询是嵌套在其他查询中的查询。示例：查找订购物品 RGAN01 的所有顾客。

```sql
SELECT order_num
FROM OrderItems
WHERE prod_id = 'RGAN01';
```

输出

```
order_num
-----------
20007
20008
```

嵌套子查询：

```sql
SELECT cust_id
FROM orders
WHERE order_num IN (SELECT order_num
                    FROM orderitems
                    WHERE prod_id = 'RGAN01');
```

再进一步结合第三个查询

```sql
SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'RGAN01'));
```

## 第 12 课 联结表

**笛卡尔积**：无联结条件时，结果行数 = 表1行数 × 表2行数

内联结

```sql
SELECT vend_name, prod_name, prod_price
FROM vendors INNER JOIN products
ON vendors.vend_id = products.vend_id;
```

联结多个表

下面两个 SQL 等价：

```sql
SELECT cust_name, cust_contact
FROM customers, orders, orderitems
WHERE customers.cust_id = orders.cust_id AND orderitems.order_num = orders.order_num AND prod_id = 'RGAN01';

SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'RGAN01'));
```

## 第 13 课 高级联结

**自联结**：同一表与自身联结（可用子查询替代）

```sql
-- 子查询方式
SELECT cust_id, cust_name, cust_contact
FROM customers
WHERE cust_name = (SELECT cust_name
                   FROM customers
                   WHERE cust_contact = 'Jim Jones');

-- 自联结方式
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM customers AS c1, customers AS c2
WHERE c1.cust_name = c2.cust_name AND c2.cust_contact = 'Jim Jones';
```

**自然联结**：消除重复列的联结

```sql
SELECT c.*, o.order_num, o.order_date, oi.prod_id, oi.quantity, oi.item_price
FROM customers AS c, orders AS o, orderitems AS oi
WHERE c.cust_id = o.cust_id AND oi.order_num = o.order_num AND prod_id = 'RGAN01';
```

**外联结**：
- `LEFT OUTER JOIN`：左表所有行 + 右表匹配行
- `RIGHT OUTER JOIN`：右表所有行 + 左表匹配行
- `FULL OUTER JOIN`：两表所有行（MySQL/SQLite 不支持）

**带聚集函数的联结**

```sql
SELECT customers.cust_id,
  COUNT(orders.order_num) AS num_ord
FROM customers
       INNER JOIN orders
ON customers.cust_id = orders.cust_id
GROUP BY customers.cust_id;
```

## 第 14 课 组合查询（UNION）

使用场景：不同表返回相同结构数据、对同一表执行多个查询。

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state IN ('IL','IN','MI');
```

找出所有 Fun4All

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_name = 'Fun4All';
```

组合这两条语句

```sql
SELECT cust_name, cust_contact, cust_email
FROM customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION
SELECT cust_name, cust_contact, cust_email
FROM customers
WHERE cust_name = 'Fun4All';
```

`UNION` 默认去重，`UNION ALL` 保留重复行。

```sql
SELECT cust_name, cust_contact, cust_email
FROM customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION ALL
SELECT cust_name, cust_contact, cust_email
FROM customers
WHERE cust_name = 'Fun4All';
```

## 第 15 课 插入数据

插入完整的行

```sql
-- 下面两条 SQL 等价
INSERT INTO Customers
VALUES ('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY', '11111', 'USA', NULL, NULL);

INSERT INTO Customers(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
VALUES ('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY','11111', 'USA', NULL, NULL);
```

插入行的一部分

```sql
INSERT INTO customers(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country)
VALUES ('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY', '11111', 'USA');
```

插入某些查询的结果

```sql
INSERT INTO Customers(cust_id, cust_contact, cust_email, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country)
SELECT cust_id, cust_contact, cust_email, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country
FROM CustNew;
```

从一个表复制到另一个表

```sql
SELECT *
INTO CustCopy
FROM Customers;

-- MariaDB、MySQL、Oracle、PostgreSQL 和 SQLite
CREATE TABLE CustCopy AS
SELECT * FROM Customers;
```

## 第 16 课 更新和删除数据

**更新**：`UPDATE ... SET ... WHERE ...`

**删除**：`DELETE FROM ... WHERE ...`

**安全原则**：
- 必须带 WHERE 子句（除非更新/删除全表）
- 保证每个表有主键
- 先用 SELECT 测试 WHERE 条件
- 启用引用完整性约束
- 启用 `sql_safe_updates` 防止无 WHERE 操作



## 第 17 课 创建和操纵表

创建表

利用 CREATE TABLE 创建表，必须给出下列信息：

- 新表的名字，在关键字 CREATE TABLE 之后给出；
- 表列的名字和定义，用逗号分隔；
- 有的 DBMS 还要求指定表的位置。

```sql
CREATE TABLE products (
  prod_id CHAR(10) NOT NULL,
  vend_id CHAR(10) NOT NULL,
  prod_name CHAR(254) NOT NULL,
  prod_price DECIMAL(8, 2) NOT NULL,
  prod_desc VARCHAR(1000) NULL
);
```

### 更新表

添加列：

```sql
ALTER TABLE Vendors
ADD vend_phone CHAR(20);
```

删除列：

```sql
ALTER TABLE Vendors
DROP COLUMN vend_phone;
```

### 删除表

```sql
DROP TABLE CustCopy;
```

## 第 18 课 视图

视图是**虚拟表**，只包含动态检索数据的查询。

**应用**：重用 SQL、简化复杂操作、保护数据、更改数据格式

**创建视图**：

```sql
CREATE VIEW ProductCustomers AS
SELECT cust_name, cust_contact, prod_id
FROM Customers, Orders, OrderItems
WHERE Customers.cust_id = Orders.cust_id
AND OrderItems.order_num = Orders.order_num;
```

检索订购了产品 RGAN01 的顾客

```sql
SELECT cust_name, cust_contact
FROM ProductCustomers
WHERE prod_id = 'RGAN01';
```

## 第 19 课 存储过程

预编译的 SQL 批处理，通过名称调用。

```sql
CREATE PROCEDURE MailingListCount (
  ListCount OUT INTEGER
) IS
v_rows INTEGER;

BEGIN
SELECT COUNT(*)
INTO v_rows
FROM customers
WHERE NOT cust_email IS NULL;
ListCount := v_rows;
END;
```

## 第 20 课 事务处理

事务处理确保 SQL 操作要么完全执行，要么完全不执行。

- **事务**：一组 SQL 语句
- **回退**：撤销指定语句
- **提交**：将结果写入数据库
- **保留点**：事务中的临时占位符

**事务语法**：

```sql
-- SQL Server: BEGIN TRANSACTION ... COMMIT TRANSACTION
-- MySQL/Oracle: SET TRANSACTION ...
-- PostgreSQL: BEGIN ...
```

**回退**：`ROLLBACK` | **提交**：`COMMIT`（事务中不隐式提交）

**保留点**：`SAVEPOINT name` + `ROLLBACK TO name`

## 第 21 课 游标

游标（cursor）是存储在 DBMS 服务器上的查询结果集，支持逐行处理。

**操作**：`DECLARE` → `OPEN` → `FETCH` → `CLOSE`

```sql
DECLARE CustCursor CURSOR FOR SELECT * FROM Customers WHERE cust_email IS NULL
```

打开/关闭：`OPEN CustCursor` / `CLOSE CustCursor`

## 第 22 课 高级 SQL 特性

### 约束

约束是管理数据操作规则，保证引用完整性。

- **主键**：值唯一、不为 NULL、不可修改、不可重用
- **外键**：值必须在另一表的主键中存在
- **唯一约束**：值唯一，允许 NULL，可修改，可多个
- **检查约束**：值满足指定条件（如 `quantity > 0`）

**主键示例**：

```sql
CREATE TABLE vendors (
  vend_id CHAR(10) NOT NULL PRIMARY KEY,
  vend_name CHAR(50) NOT NULL,
  vend_address CHAR(50) NULL,
  vend_city CHAR(50) NULL,
  vend_state CHAR(5) NULL,
  vend_zip CHAR(10) NULL,
  vend_country CHAR(50) NULL
);
```

更新表时指定主键

```sql
ALTER TABLE Vendors
ADD CONSTRAINT PRIMARY KEY (vend_id);
```

**外键示例**：

```sql
CREATE TABLE Orders (
  order_num INTEGER NOT NULL PRIMARY KEY,
  order_date DATETIME NOT NULL,
  cust_id CHAR(10) NOT NULL REFERENCES customers(cust_id)
);
```

`ALTER TABLE` 添加外键：

```sql
ALTER TABLE Orders
ADD CONSTRAINT FOREIGN KEY (cust_id) REFERENCES Customers (cust_id)
```

**唯一约束** vs **主键**：
- 表可有多个唯一约束，但只有一个主键
- 唯一约束允许 NULL、可修改、值可重用
- 唯一约束不能定义外键

**检查约束**：保证值满足条件（最小/最大值、范围、特定值）

### 索引

```sql
CREATE INDEX prod_name_ind ON Products (prod_name);
```

### 触发器

触发器是特殊的存储过程，在 INSERT/UPDATE/DELETE 操作时自动执行。

**用途**：保证数据一致、执行审计跟踪、进行额外验证、计算计算列

```sql
-- SQL Server
CREATE TRIGGER customer_state ON Customers FOR INSERT, UPDATE AS
UPDATE Customers SET cust_state = Upper(cust_state)
WHERE Customers.cust_id = inserted.cust_id;
```

### 数据库安全

使用 `GRANT` 和 `REVOKE` 管理权限。

## 参考资料

- [《SQL 必知必会》](https://book.douban.com/subject/35167240/)
