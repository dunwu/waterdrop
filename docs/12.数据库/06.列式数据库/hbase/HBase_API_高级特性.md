---
icon: logos:hbase
title: HBase Java API 其他高级特性
date: 2023-03-31 16:20:27
categories:
  - 数据库
  - 列式数据库
  - hbase
tags:
  - 数据库
  - 列式数据库
  - 大数据
  - hbase
  - API
permalink: /pages/5c4df258/
---

# HBase Java API 其他高级特性

## 计数器

HBase 提供了一种高级功能：计数器（counter）。**HBase 计数器可以用于实时统计，无需延时较高的批量处理操作**。HBase 有一种机制可以将列当作计数器：即读取并修改（其实就是一种 CAS 模式），其保证了在一次操作中的原子性。否则，用户需要对一行数据加锁，然后读取数据，再对当前数据做加法，最后写回 HBase 并释放行锁，这一系列操作会引起大量的资源竞争问题。

早期的 HBase 版本会在每次计数器更新操作调用一次 RPC 请求，新版本中可以在一次 RPC 请求中完成多个计数器的更新操作，但是多个计数器必须在同一行。

### 计数器使用 Shell 命令行

计数器不需要初始化，创建一个新列时初始值为 0，第一次 `incr` 操作返回 1。

计数器使用 `incr` 命令，增量可以是正数也可以是负数，但是必须是长整数 Long：

```bash
incr '<table>','<row>','<column>',['<increment-value>']
```

计数器使用的例子：

```python
hbase(main):001:0> create 'counters','daily','weekly','monthly'
0 row(s) in 1.2260 seconds

hbase(main):002:0> incr 'counters','20190301','daily:hites',1
COUNTER VALUE = 1

hbase(main):003:0> incr'counters','20190301','daily:hites',1
COUNTER VALUE = 2

hbase(main):004:0> get_counter 'counters','20190301','daily:hites'
COUNTER VALUE = 2
```

需要注意的是，增加的参数必须是长整型 Long，如果按照错误的格式更新了计数器（如字符串格式），下次调用 `incr` 会得到错误的结果：

```python
hbase(main):005:0> put 'counters','20190301','daily:clicks','1'
0 row(s) in 1.3250 seconds

hbase(main):006:0> incr'counters','20190301','daily:clicks',1
COUNTER VALUE = 3530822107858468865
```

### 单计数器

操作一个计数器，类似 shell 命令 `incr`

```java
HTable table  = new HTable(conf, "counters");

long cnt1 = table.incrementColumnValue(Bytes.toBytes("20190301"),
    Bytes.toBytes("daily"),
    Bytes.toBytes("hits"),
    1L);

long cnt2 = table.incrementColumnValue(Bytes.toBytes("20190301"),
    Bytes.toBytes("daily"),
    Bytes.toBytes("hits"),
    1L);

long current = table.incrementColumnValue(Bytes.toBytes("20190301"),
    Bytes.toBytes("daily"),
    Bytes.toBytes("hits"),
    0);
```

### 多计数器

使用 `Table` 的 `increment()` 方法可以操作一行的多个计数器，需要构建 `Increment` 实例，并且指定行键：

```cpp
HTable table  = new HTable(conf, "counters");

Increment incr1 = new Increment(Bytes.toBytes("20190301"));
incr1.addColumn(Bytes.toBytes("daily"), Bytes.toBytes("clicks"),1);
incr1.addColumn(Bytes.toBytes("daily"), Bytes.toBytes("hits"), 1);
incr1.addColumn(Bytes.toBytes("weekly"), Bytes.toBytes("clicks"), 2);
incr1.addColumn(Bytes.toBytes("weekly"), Bytes.toBytes("hits"), 2);

Result result = table.increment(incr1);
for(Cell cell : result.rawCells()) {
    // ...
}
```

Increment 类还有一种构造器：

```csharp
Increment(byte[] row, RowLock rowLock)
```

`rowLock` 参数可选，可以设置用户自定义锁，可以限制其他写程序操作此行，但是不保证读的操作性。

## 连接管理

### 连接管理简介

在 HBase Java API 中，`Connection` 类代表了一个集群连接，封装了与多台服务器（Matser/Region Server）的底层连接以及与 zookeeper 的连接。`Connection` 通过 `ConnectionFactory` 类实例化，而连接的生命周期则由调用者管理，调用者必须显示调用 `close()` 来释放连接。`Connection` 是线程安全的。创建 `Connection` 实例的开销很高，因此一个进程只需要实例化一个 `Connection` 即可。

`Table` 接口用于对指定的 HBase 表进行 CRUD 操作。一般，通过 `Connection` 获取 `Table` 实例，用完后，调用 `close()` 释放连接。

`Admin` 接口主要用于创建、删除、查看、启用/禁用 HBase 表，以及一些其他管理操作。一般，通过 `Connection` 获取 `Admin` 实例，用完后，调用 `close()` 释放连接。

`Table` 和 `Admin` 实例都是轻量级且并非线程安全的。建议每个线程只实例化一个 `Table` 或 `Admin` 实例。

### 连接池

问题：HBase 为什么没有提供 `Connection` 的连接池来获取更好的性能？是否需要自定义 `Connection` 连接池？

答：不需要。官方对于 `Connection` 的使用说明中，明确指出：对于高并发多线程访问的应用程序，一个进程中只需要预先创建一个 `Connection`。

问题：HBase 老版本中 `HTablePool` 为什么废弃？是否需要自定义 Table 的连接池？

答：不需要。Table 和 Admin 的连接本质上是复用 Connection，实例化是一个较为轻量级的操作，因此，并不需要缓存或池化。实际上，HBase Java API 官方就是这么建议的。 

下面是管理 HBase 连接的一个正确编程模型

```java
// 所有进程共用一个 connection 对象
connection = ConnectionFactory.createConnection(config);

// 每个线程使用单独的 table 对象
Table table = connection.getTable(TableName.valueOf("tableName"));
try {
	...
} finally {
   table.close();
}

Admin admin = connection.getAdmin();
try {
	...
} finally {
   admin.close();
}
```

## 参考资料

- [《HBase 权威指南》](https://item.jd.com/11321037.html)
- [《HBase 权威指南》官方源码](https://github.com/larsgeorge/hbase-book)
- [连接 HBase 的正确姿势](https://developer.aliyun.com/article/581702)
