---
icon: logos:mongodb
title: 《MongoDB 权威指南》笔记一
date: 2024-09-29 07:45:34
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - 文档数据库
  - MongoDB
permalink: /pages/471acd9f/
---

# 《MongoDB 权威指南》笔记一

[《MongoDB 权威指南》](https://book.douban.com/subject/35688800/) 学习笔记

<!-- more -->

## 第 1 章 MongoDB 简介

### MongoDB 简介

MongoDB 是一个分布式文档数据库，由 C++ 编写。

#### 面向文档

用灵活的“文档”模型取代“行”，通过嵌入文档和数组表示复杂层次关系。**无预定义模式**，按需添加/删除字段。**支持结构化、半结构化数据模型，可动态响应结构变化**。

#### 功能丰富

- **索引**：二级索引、唯一索引、复合索引、地理空间索引、全文索引、TTL 索引、部分索引
- **聚合**：基于数据处理管道的聚合框架
- **特殊集合**：TTL 集合、固定大小集合、部分索引
- **文件存储**：GridFS 协议

#### 分布式

- 副本机制 → 高可用
- 分片 → 扩容能力

## 第 2 章 入门指南

文档是 MongoDB 的基本数据单元（相当于 RDBMS 的行），集合相当于具有**动态模式**的表。一个实例可拥有多个独立数据库，每个文档有唯一的 `_id` 键。

### 文档

文档是一组有序键值对。键为字符串类型（不能含 `\0`，`.` 和 `$` 为特殊字符）。MongoDB 区分类型和大小写，不允许重复键。

### 集合

集合是一组文档，具有**动态模式**特性（同一集合可包含不同“形状”的文档）。

**命名限制**：不能为空、不能含 `\0`、不能以 `system.` 开头、不应含 `$`。

用 `.` 分隔命名空间（如 `blog.posts`、`blog.authors`）只是组织惯例，无实际关系。

### 数据库

MongoDB 用集合分组文档，用数据库分组集合。

**命名限制**：不能为空、不能含 `/\.$"*<>:|?$` 和空格及 `\0`、区分大小写、长度限制 64 字节。

**保留数据库**：
- **admin**：身份验证和授权
- **local**：副本集复制数据（不被复制）
- **config**：分片集群信息

### 启动 MongoDB

执行 `mongod`（Unix）或 `mongod.exe`（Windows）。默认数据目录 `/data/db/`，默认端口 `27017`。

### MongoDB Shell

内置命令行交互工具，也是功能齐全的 JavaScript 解释器。

【示例】MongoDB Shell 基本操作

```shell
# 查看有哪些数据库
> show dbs
admin            0.000GB
config           0.000GB
fc_open_core     0.000GB
local            0.000GB
spring-tutorial  0.000GB
test             0.919GB

# 切换到 test 数据库
> use test
switched to db test

# 插入文档
> db.user.insertOne({ name: "dunwu", sex: 'man' })
{
        "acknowledged" : true,
        "insertedId" : ObjectId("670a281a2647017bf5f42962")
}

# 查询文档
}
> db.user.find()
{ "_id" : ObjectId("670a281a2647017bf5f42962"), "name" : "dunwu", "sex" : "man" }

# 更新文档
> db.user.updateOne({ name: "dunwu" }, { $set: { age: 30 } })
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

# 删除文档
> db.user.deleteOne({ name: "dunwu" })
{ "acknowledged" : true, "deletedCount" : 1 }

# 退出 MongoDB Shell
> quit()
```

### 数据类型

| 类型 | 说明 | 示例 |
|---|---|---|
| `null` | 空值或不存在的字段 | `{"x": null}` |
| 布尔 | true/false | `{"x": true}` |
| 数值 | 默认 64 位浮点数，可用 NumberInt/NumberLong | `{"x": 3.14}` |
| 字符串 | 任意 UTF-8 字符串 | `{"x": "foobar"}` |
| 日期 | 自 Unix 纪元的毫秒数，无时区 | `{"x": new Date()}` |
| 正则表达式 | 与 JS 语法相同 | `{"x": /foobar/i}` |
| 数组 | 集合/列表 | `{"x": ["a","b","c"]}` |
| 内嵌文档 | 嵌套其他文档 | `{"x": {"foo": "bar"}}` |
| ObjectId | 12 字节唯一 ID，默认 `_id` 类型 | `{"x": ObjectId()}` |
| 二进制数据 | 任意字节字符串，存非 UTF-8 数据的唯一方法 | - |
| 代码 | JavaScript 代码 | `{"x": function(){}}` |

**ObjectId 结构**（12 字节 = 24 个十六进制字符）：

```
0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  10  |  11
         时间戳       |           随机值            | 计数器（起始值随机）
```

前 4 字节为 Unix 时间戳，与后续 5 字节随机值组合提供秒级唯一性。

### 使用 MongoDB shell（略）

## 第 3 章 创建、更新和删除文档

### 插入文档

#### insertOne

插入单条文档：`db.collection.insertOne(document, options)`

```json
> db.movies.insertOne({"title" : "Stand by Me"})
```

#### insertMany

批量插入文档：`db.collection.insertMany(documents, options)`

```json
> db.movies.insertMany([{"title" : "Ghostbusters"},{"title" : "E.T."},{"title" : "Blade Runner"}]);
```

最大消息长度 48MB，超出会自动拆分。缺少 `_id` 字段会自动添加。

### 删除文档

- **deleteOne**：删除单条文档
- **deleteMany**：删除满足条件的所有文档，`deleteMany({})` 清空集合

### 更新文档

- **replaceOne**：将新文档完全替换匹配文档（适合模式迁移）
- **updateOne**：更新单条文档
- **updateMany**：批量更新文档

通用语法：`db.collection.updateXxx(filter, update, options)`，`options` 支持 `upsert`、`arrayFilters` 等。

#### 更新运算符

| 操作符 | 说明 |
|---|---|
| `$set` | 设置字段值，不存在则创建 |
| `$unset` | 删除字段 |
| `$inc` | 增加数值，不存在则创建 |
| `$push` | 向数组末尾添加元素 |
| `$pop` | 从数组一端删除元素（1=末尾，-1=头部） |
| `$pull` | 删除匹配条件的数组元素 |

#### upsert

找不到匹配文档时创建新文档，找到时正常更新：

```json
> db.users.updateOne({"rep" : 25}, {"$inc" : {"rep" : 3}}, {"upsert" : true})
```

## 第 4 章 查询

### find 简介

`find` 方法用于查询，语法：`db.collection.find(query, projection)`

- **query**：查询条件，默认 `{}` 匹配所有
- **projection**（可选）：指定返回/排除字段

### 查询条件

#### 比较操作符

| 操作符 | 描述 | 示例 |
|---|---|---|
| `$eq` | 等于 | `{ age: { $eq: 25 } }` |
| `$ne` | 不等于 | `{ age: { $ne: 25 } }` |
| `$gt` | 大于 | `{ age: { $gt: 25 } }` |
| `$gte` | 大于等于 | `{ age: { $gte: 25 } }` |
| `$lt` | 小于 | `{ age: { $lt: 25 } }` |
| `$lte` | 小于等于 | `{ age: { $lte: 25 } }` |
| `$in` | 在数组中 | `{ age: { $in: [25, 30, 35] } }` |
| `$nin` | 不在数组中 | `{ age: { $nin: [25, 30, 35] } }` |

#### 逻辑操作符

| 操作符 | 描述 | 示例 |
|---|---|---|
| `$and` | 逻辑与 | `{ $and: [ { age: { $gt: 25 } }, { city: "NY" } ] }` |
| `$or` | 逻辑或 | `{ $or: [ { age: { $lt: 25 } }, { city: "NY" } ] }` |
| `$not` | 取反 | `{ age: { $not: { $gt: 25 } } }` |
| `$nor` | 与非 | `{ $nor: [ { age: { $gt: 25 } }, { city: "NY" } ] }` |

#### 元素/数组/其他操作符

| 操作符 | 类型 | 描述 |
|---|---|---|
| `$exists` | 元素 | 字段是否存在 |
| `$type` | 元素 | 字段的 BSON 类型 |
| `$all` | 数组 | 包含所有指定元素 |
| `$elemMatch` | 数组 | 数组中元素匹配指定条件 |
| `$size` | 数组 | 数组长度等于指定值 |
| `$regex` | 其他 | 正则表达式匹配 |
| `$text` | 其他 | 文本搜索 |
| `$where` | 其他 | JavaScript 表达式过滤（性能差，避免使用） |

### 特定类型查询

#### null

`null` 匹配值为 null 或缺少该键的文档。仅匹配 null 值需结合 `$exists`：

```json
db.c.find({"z" : {"$eq" : null, "$exists" : true}})
```

#### 正则表达式

`$regex` 提供字符串模式匹配，使用 PCRE 库。

#### 查询内嵌文档

使用点号查询：`db.people.find({"name.first" : "Joe", "name.last" : "Schmoe"})`

#### `$where` 查询

允许执行任意 JavaScript 代码，但**性能极差，应避免使用**。

#### 游标

数据库使用游标返回 `find` 结果，支持链式调用：
- `limit(n)`：限制返回数量
- `skip(n)`：跳过指定数量（分页）
- `sort({field: 1/-1})`：排序（1=升序，-1=降序）

## 参考资料

- [《MongoDB 权威指南》](https://book.douban.com/subject/35688800/)
