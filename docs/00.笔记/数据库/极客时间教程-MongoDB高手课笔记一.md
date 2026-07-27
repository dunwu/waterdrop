---
icon: logos:mongodb
title: 《极客时间教程 - MongoDB 高手课》笔记一
date: 2024-10-17 07:19:53
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 文档数据库
  - MongoDB
permalink: /pages/871f8b70/
---

# 《极客时间教程 - MongoDB 高手课》笔记一

[极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001) 学习笔记

<!-- more -->

## 第一章：MongoDB 再入门

### MongoDB 简介

MongoDB 是以 **JSON 文档**为数据模型的文档数据库（非 PDF/Word），由 MongoDB Inc. 开发。

- **用途**：应用数据库（类似 Oracle/MySQL）、海量数据处理/数据平台
- **特点**：建模可选、JSON 模型适合开发者、横向扩展支撑大数据量和高并发
- **版本**：社区版（SSPL 开源协议）、企业版（商业付费）

### MongoDB vs. RDBMS

|              | MongoDB                                                      | RDBMS                  |
| ------------ | ------------------------------------------------------------ | ---------------------- |
| 数据模型     | 文档模型                                                     | 关系模型               |
| 数据库类型   | OLTP                                                         | OLTP                   |
| CRUD 操作    | MQL/SQL                                                      | SQL                    |
| 高可用       | 复制集                                                       | 集群模式               |
| 横向扩展能力 | 通过原生分片完善支持                                         | 数据分区或者应用侵入式 |
| 索引支持     | B-树、全文索引、地理位置索引、多键 (multikey) 索引、TTL 索引 | B 树                   |
| 开发难度     | 容易                                                         | 困难                   |
| 数据容量     | 没有理论上限                                                 | 千万、亿               |
| 扩展方式     | 垂直扩展+水平扩展                                            | 垂直扩展               |

### MongoDB 特色及优势

**文档模型优势**：
- **多形性**：同一集合可包含不同字段的文档
- **动态性**：线上修改数据模式，应用与数据库无须下线
- **数据治理**：支持 JSON Schema 规范数据模式
- **快速开发**：单存储区读写、反范式优化查询、API 自然

**高可用与扩展**：
- **Replica Set**：2~50 成员、自恢复、多中心容灾、滚动服务
- **横向扩展**：无缝扩展、应用透明、多种数据分布策略、支持 TB~PB 级

**技术优势总结**：JSON 结构接近对象模型 → 代码量低、动态模型 → 快速响应业务、复制集 → 99.999% 高可用、分片 → 海量数据无缝扩容

### MongoDB 基本操作

#### 使用 insert 完成插入操作

```json
db.fruit.insertOne({name: "apple"})
db.fruit.insertMany([
    {name: "apple"},
    {name: "pear"},
    {name: "orange"}
])
```

#### 使用 find 查询文档

`find` 是 MongoDB 查询数据的基本指令（等价 SQL `SELECT`），返回**游标**。

```json
db.movies.find( { "year" : 1975 } ) //单条件查询

db.movies.find( { "year" : 1989, "title" : "Batman" } ) //多条件 and 查询

db.movies.find( { $and : [ {"title" : "Batman"}, { "category" : "action" }] } ) // and 的另一种形式

db.movies.find( { $or: [{"year" : 1989}, {"title" : "Batman"}] } ) //多条件 or 查询

db.movies.find( { "title" : /^B/} ) //按正则表达式查找
```

##### 查询条件对照表

| SQL      | MQL              |
| -------- | ---------------- |
| `a = 1`  | `{a: 1}`         |
| `a <> 1` | `{a: {$ne: 1}}`  |
| `a > 1`  | `{a: {$gt: 1}}`  |
| `a >= 1` | `{a: {$gte: 1}}` |
| `a < 1`  | `{a: {$lt: 1}}`  |
| `a <= 1` | `{a: {$lte: 1}}` |

##### 查询逻辑对照表

| SQL               | MQL                                          |
| ----------------- | -------------------------------------------- |
| `a = 1 AND b = 1` | `{a: 1, b: 1}` 或 `{$and: [{a: 1}, {b: 1}]}` |
| `a = 1 OR b = 1`  | `{$or: [{a: 1}, {b: 1}]}`                    |
| `a IS NULL`       | `{a: {$exists: false}}`                      |
| `a IN (1, 2, 3)`  | `{a: {$in: [1, 2, 3]}}`                      |

##### 查询逻辑运算符

- `$lt` - 存在并小于
- `$lte` - 存在并小于等于
- `$gt` - 存在并大于
- `$gte` - 存在并大于等于
- `$ne` - 不存在或存在但不等于
- `$in` - 存在并在指定数组中
- `$nin` - 不存在或不在指定数组中
- `$or` - 匹配两个或多个条件中的一个
- `$and` - 匹配全部条件

#### 使用 find 搜索子文档

支持 `"field.sub_field"` 形式查询子文档：

```json
// 点号查询：只要 from 中有 country=China 就匹配
db.fruit.find( { "from.country" : "China" } )
// 精确匹配：from 必须恰好等于 {country: "China"}
db.fruit.find( { "from" : {country: "China"} } )
```

#### 使用 find 搜索数组

直接搜索数组元素：

```json
db.fruit.insert([
    { "name" : "Apple", color: ["red", "green" ] },
    { "name" : "Mango", color: ["yellow", "green"] }
])

db.fruit.find({color: "red"})
db.fruit.find({$or: [{color: "red"}, {color: "yellow"}]} )
```

#### 使用 find 搜索数组中的对象

使用点号或 `$elemMatch` 搜索数组中的子对象：

```json
// 跨元素匹配：city=Rome 和 country=USA 可以在不同子对象中
db.movies.find({"filming_locations.city": "Rome", "filming_locations.country": "USA"})
// $elemMatch：同一子对象必须同时满足 city=Rome 和 country=USA
db.movies.find({"filming_locations": {$elemMatch:{"city":"Rome", "country": "USA"}}})
```

#### 控制 find 返回的字段（投影 Projection）

- 指定返回/排除字段，`_id` 默认返回需显式排除
- 示例：`db.movies.find({"category": "action"}, {"_id":0, title:1})`

#### 使用 remove 删除文档

`remove` 配合查询条件使用，匹配条件的文档被删除：

```json
db.testcol.remove( { a : 1 } )       // 删除 a=1 的记录
db.testcol.remove( { a : { $lt : 5 } } ) // 删除 a<5 的记录
db.testcol.remove( { } )             // 删除所有记录
```

#### 使用 update 更新文档

格式：`db.<集合>.updateOne/updateMany(<查询条件>, <更新字段>)`

- **updateOne**：只更新第一条匹配记录
- **updateMany**：更新所有匹配记录
- 更新操作符必须包含以下之一：`$set/$unset`、`$push/$pop`、`$pull/$pullAll`、`$addToSet`

#### 使用 update 更新数组

- `$push`: 增加一个对象到数组底部
- `$pushAll`: 增加多个对象到数组底部
- `$pop`: 从数组底部删除一个对象
- `$pull`: 如果匹配指定的值，从数组中删除相应的对象
- `$pullAll`: 如果匹配任意的值，从数据中删除相应的对象
- `$addToSet`: 如果不存在则增加一个值到数组

#### 使用 drop 删除集合/数据库

- **删除集合**：`db.<集合>.drop()` — 删除全部文档和相关索引
- **删除数据库**：`db.dropDatabase()` — 删除数据库文件，释放磁盘空间

### 聚合查询

#### 聚合框架概述

MongoDB **聚合框架**（Aggregation Framework）对集合中的数据进行一系列运算，转化为期望的形式。等价于 SQL 的 `GROUP BY`、`LEFT OUTER JOIN`、`AS` 等。

#### 管道（Pipeline）和步骤（Stage）

管道由多个步骤组成，每个步骤接受文档 → 运算 → 输出给下一步：

```
pipeline = [$stage1, $stage2, ...$stageN];

db.<COLLECTION>.aggregate(
    pipeline,
    { options }
);
```

常见步骤：

| 步骤                 | 作用     | SQL 等价运算符    |
| -------------------- | -------- | ----------------- |
| `$match`             | 过滤     | `WHERE`           |
| `$project`           | 投影     | `AS`              |
| `$sort`              | 排序     | `ORDER BY`        |
| `$group`             | 分组     | `GROUP BY`        |
| `$skip` / `$limit`   | 结果限制 | `SKIP` / `LIMIT`  |
| `$lookup`            | 左外连接 | `LEFT OUTER JOIN` |
| `$unwind`            | 展开数组 | N/A               |
| `$graphLookup`       | 图搜索   | N/A               |
| `$facet` / `$bucket` | 分面搜索 | N/A               |

常见步骤中的运算符

| `$match`                                                                                    | `$project`                                                                                                                                                                                   | `$group`                                                                        |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `$eq`/`$gt`/`$gte`/`$lt`/`$lte`<br/>`$and`/`$or`/`$not`/`$in`<br/>`$geoWithin`/`$intersect` | 选择需要的或排除不需要的字段<br/>`$map`/`$reduce`/`$filter`<br/>`$range`<br/>`$multiply`/`$divide`/`$substract`/`$add`<br/>`$year`/`$month`/`$dayOfMonth`/`$hour`/`$minute`/`$second`<br/>…… | `$sum`/`$avg`<br/>`$push`/`$addToSet`<br/>`$first`/`$last`/`$max`/`$min`<br/>…… |

#### 聚合运算场景

- **OLTP**：计算
- **OLAP**：分析销售额/均值、计算净利润、用户年龄分布、成绩分布、员工绩效等

【示例一】

```sql
SELECT
FIRST_NAME AS `名`,
LAST_NAME AS `姓`
FROM Users
WHERE GENDER = '男'
SKIP 100
LIMIT 20
```

等价于

```json
db.users.aggregate([
    {$match: {gender: ’’男”}},
    {$skip: 100},
    {$limit: 20},
    {$project: {
        '名': '$first_name',
        '姓': '$last_name'
    }}
]);
```

【示例二】

```sql
SELECT DEPARTMENT,
COUNT(NULL) AS EMP_QTY
FROM Users
WHERE GENDER = '女'
GROUP BY DEPARTMENT HAVING
COUNT(*) < 10
```

等价于

```json
db.users.aggregate([
    {$match: {gender: '女'}},
    {$group: {
        _id: '$DEPARTMENT’,
        emp_qty: {$sum: 1}
    }},
    {$match: {emp_qty: {$lt: 10}}}
]);
```

【示例三】

```json
> db.students.findOne()
{
    name:'张三',
    score:[
        {subject:'语文',score:84},
        {subject:'数学',score:90},
        {subject:'外语',score:69}
    ]
}

> db.students.aggregate([{$unwind: '$score'}])
{name: '张三', score: {subject: '语文', score: 84}}
{name: '张三', score: {subject: '数学', score: 90}}
{name: '张三', score: {subject: '外语', score: 69}}
```

#### MQL 特有步骤 `$bucket`

```json
db.products.aggregate([{
    $bucket:{
        groupBy: "$price",
        boundaries: [0,10,20,30,40],
        default: "Other",
        output:{"count":{$sum:1}}
    }
}])
```

#### MQL 特有步骤 $facet

```json
db.products.aggregate([{
    $facet:{
        price:{
            $bucket:{…}
        },
        year:{
            $bucket:{…}
        }
    }
}])
```

#### 聚合查询实验

计算到目前为止的所有订单的总销售额

```json
db.orders.aggregate([
	{ $group:
		{
			_id: null,
			total: { $sum: "$total" }
		}
	}
])

// 结果： // { "_id" : null, "total" : NumberDecimal("44019609") }
```

查询 2019 年第一季度（1 月 1 日~3 月 31 日）已完成订单（completed）的订单总金额和订单总数

```json
db.orders.aggregate([

    // 步骤 1：匹配条件
    { $match: { status: "completed", orderDate: {
                                    $gte: ISODate("2019-01-01"),
                                    $lt: ISODate("2019-04-01") } } },

    // 步骤二：聚合订单总金额、总运费、总数量
    { $group: {
                _id: null,
                total: { $sum: "$total" },
                shippingFee: { $sum: "$shippingFee" },
                count: { $sum: 1 } } },
    { $project: {
                // 计算总金额
                grandTotal: { $add: ["$total", "$shippingFee"] },
                count: 1,
                _id: 0 } }
])

// 结果：
// { "count" : 5875, "grandTotal" : NumberDecimal("2636376.00") }
```

#### 复制集机制

**作用**：实现服务高可用，依赖数据复制 + 自动选举。

**附加作用**：数据分发（减少读延迟）、读写分离、异地容灾。

**典型结构**：3+ 个投票节点：
- **PRIMARY**：接受写入 + 选举投票
- **SECONDARY**：复制数据 + 选举投票
- 不推荐 Arbiter（纯投票节点）

**数据复制**：主节点记录操作为 **oplog**，从节点通过 tailable 游标获取并回放。

**选举机制**：基于 **RAFT** 一致性算法
- 节点两两发送心跳，5 次未收到判断为失联
- 主节点失联 → 从节点发起选举
- 成功条件：大多数投票节点存活
- 最多 50 个节点，投票权最多 7 个

**影响选举的因素**：多数节点存活（N/2+1）、能与多数节点连接、较新 oplog、较高优先级

**常见选项**：
- **v 参数**：是否有投票权
- **priority**：优先级越高越优先成为主节点，0 则无法成为主节点
- **hidden**：复制数据但对应用不可见，优先级必须为 0
- **slaveDelay**：复制 n 秒前的数据

**注意事项**：节点硬件配置必须一致、软件版本必须一致、增加节点不增加写性能

### MongoDB 全家桶

| 软件模块                  | 描述                                            |
| ------------------------- | ----------------------------------------------- |
| mongod                    | MongoDB 数据库软件                              |
| mongo                     | MongoDB 命令行工具，管理 MongoDB 数据库         |
| mongos                    | MongoDB 路由进程，分片环境下使用                |
| mongodump / mongorestore  | 命令行数据库备份与恢复工具                      |
| mongoexport / mongoimport | CSV/JSON 导入与导出，主要用于不同系统间数据迁移 |
| Compass                   | MongoDB GUI 管理工具                            |
| Ops Manager（企业版）     | MongoDB 集群管理软件                            |
| BI Connector（企业版）    | SQL 解释器 / BI 套接件                          |
| MongoDB Charts（企业版）  | MongoDB 可视化软件                              |
| Atlas（付费及免费）       | MongoDB 云托管服务，包括永久免费云数据库        |

## 第二章：从熟练到精通的开发之路

### 模型设计基础

#### 数据模型设计要素

- **实体（Entity）**：描述业务的主要数据集合（谁/什么/何时/何地/为何/如何）
- **属性（Attribute）**：描述实体的单个信息
- **关系（Relationship）**：实体间数据规则（1-N、N-N、引用规则）
- **三层深度**：概念模型 → 逻辑模型 → 物理模型

#### JSON 文档模型设计三个误区

1. 不需要模型设计
2. 应该用一个超级大文档组织所有数据
3. 不支持关联或事务

**文档模型设计**处于物理模型设计阶段（PDM），通过内嵌数组或引用字段表示关系，不遵从第三范式，允许冗余。

**“无模式”由来**：可以省略物理建模的具体过程，但同样需要概念/逻辑建模。

#### 关系模型 vs 文档模型

|              | 关系数据库                         | JSON 文档模型         |
| ------------ | ---------------------------------- | --------------------- |
| 模型设计层次 | 概念模型<br/>逻辑模型<br/>物理模型 | 概念模型<br/>逻辑模型 |
| 模型实体     | 表                                 | 集合                  |
| 模型属性     | 列                                 | 字段                  |
| 模型关系     | 关联关系，主外键                   | 内嵌数组，引用字段    |

### 文档模型设计

#### 基础设计

- 根据概念模型/业务需求推导逻辑模型 → 找到对象
- 列出实体关系及基数 → 明确关系
- 套用逻辑设计原则决定内嵌方式 → 进行建模

**90:10 规则**：大部分时候使用内嵌表示 1-1、1-N、N-N。内嵌类似于预先聚合，对读操作有优势。

#### 工况细化

场景梳理要点：最频繁查询模式、最常用查询参数、最频繁写入模式、读写比例、数据量大小。

**使用引用的场景**：
- 内嵌文档太大（超过 16MB）
- 内嵌文档/数组元素会频繁修改
- 内嵌数组元素持续增长无封顶

**MongoDB 引用限制**：无主外键检查、`$lookup` 模仿关联查询（仅 left outer join）、关联目标不能是分片表

#### 模式套用

利用文档内嵌数组，将时间段数据聚合到一个文档，大量减少文档数量和索引占用。

#### 设计模式集锦

- **版本管理**：增加版本号字段，快速过滤不同版本文档
- **近似计算**：统计网页点击流量
- **预聚合字段**：业绩排名、游戏排名、商品统计等精确统计，模型中增加统计字段，每次更新同时更新统计值

### 事务开发：写操作事务

**writeConcern** 决定写操作落到多少个节点上才算成功：
- **0**：不关心是否成功
- **1~最大节点数**：需复制到指定节点数
- **majority**：需复制到大多数节点

**journal** 定义如何才算成功：
- **true**：落到 journal 文件才算成功
- **false**：到达内存即算成功

### 事务开发：读操作事务

两个核心问题：**从哪里读**（readPreference）+ **什么样的数据可读**（readConcern）

#### readPreference

决定使用哪个节点响应读请求：
- **primary**：只选主节点
- **primaryPreferred**：优先主节点
- **secondary**：只选从节点
- **secondaryPreferred**：优先从节点
- **nearest**：最近节点

**场景**：下单后查详情 → primary（从节点可能未复制）、查历史订单 → secondary、生成报表 → secondary、全球分发图片 → nearest

**Tag**：将节点选择控制到一个或几个节点（如 online/analyse 分组）

**注意**：指定 primary 时故障转移期间无可读节点，建议用 primaryPreferred；Tag 需与优先级、选举权综合考虑

#### readConcern

决定节点上哪些数据可读（类似隔离级别）：
- **available**：读取所有可用数据
- **local**：读取属于当前分片的数据（默认）
- **majority**：读取大多数节点上提交的数据
- **linearizable**：保证线性顺序（只对单文档有效，建议配合 maxTimeMS）
- **snapshot**：读取快照数据（仅多文档事务生效，防脏读/不可重复读/幻读）

**local vs available**：在分片集中体现差异（chunk 迁移时 local 过滤、available 不过滤）

**majority 与脏读**：写操作到达大多数节点前不安全，可能被回滚。使用 `{readConcern: "majority"}` 可有效避免脏读

**安全读写分离**：`writeConcern: majority` + `readConcern: majority` + `readPref: secondary`

### 多文档事务

MongoDB 4.2 起全面支持多文档事务，但原则是**能不用尽量不用**。通过合理设计文档模型可规避大部分事务需求。

**原因**：事务 = 锁 + 节点协调 + 额外开销 + 性能影响

**ACID 支持**：
- **原子性**：单表单文档 1.x、复制集多表多行 4.0、分片集群 4.2
- **一致性**：writeConcern + readConcern (3.2)
- **隔离性**：readConcern (3.2)
- **持久性**：Journal + Replication

**隔离级别**：事务完成前，事务外操作不可见。使用 `{readConcern: "snapshot"}` 可达到可重复读。

**事务写机制**：
- 事务外修改过文档 → 事务修改时触发 Abort（重做即可）
- 事务内修改文档时，事务外修改同一文档会等待事务完成

### Change Stream

**Change Stream** 是 MongoDB 的变更追踪方案，类似触发器但原理不同：

| | Change Stream | 触发器 |
|---|---|---|
| 触发方式 | 异步 | 同步（事务保证） |
| 触发位置 | 应用回调事件 | 数据库触发器 |
| 触发次数 | 每个订阅客户端 | 1 次 |
| 故障恢复 | 从上次断点重新触发 | 事务回滚 |

**实现原理**：基于 **oplog** 开启 tailable cursor 追踪变更，调用应用回调函数。

**追踪事件**：insert/update/delete、drop、rename、dropDatabase、invalidate

**约束**：只推送 majority 提交的变更；未开启 majority readConcern 或无法满足 `{w: "majority"}` 时无法使用。

**使用场景**：跨集群变更复制、微服务联动、系统联动

**注意事项**：依赖 oplog（中断时间不可超过 oplog 回收时间窗）、update 只通知增量部分、delete 只通知 `_id`

## 参考资料

- [极客时间教程 - MongoDB 高手课](https://time.geekbang.org/course/intro/100040001)
