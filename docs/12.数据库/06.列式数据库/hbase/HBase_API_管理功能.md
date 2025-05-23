---
icon: logos:hbase
title: HBase Java API 管理功能
date: 2023-04-13 16:36:48
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
permalink: /pages/e4d04380/
---

# HBase Java API 管理功能

## 初始化 Admin 实例

```java
Configuration conf = HBaseConfiguration.create();
Connection connection = ConnectionFactory.createConnection(conf);
Admin admin = connection.getAdmin();
```

## 管理命名空间

### 查看命名空间

```java
TableName[] tableNames = admin.listTableNamesByNamespace("test");
for (TableName tableName : tableNames) {
    System.out.println(tableName.getName());
}
```

### 创建命名空间

```java
NamespaceDescriptor namespace = NamespaceDescriptor.create("test").build();
admin.createNamespace(namespace);
```

### 修改命名空间

```java
NamespaceDescriptor namespace = NamespaceDescriptor.create("test")
                                                   .addConfiguration("Description", "Test Namespace")
                                                   .build();
admin.modifyNamespace(namespace);
```

### 删除命名空间

```java
admin.deleteNamespace("test");
```

## 管理表

### 创建表

```java
TableName tableName = TableName.valueOf("test:test");
HTableDescriptor tableDescriptor = new HTableDescriptor(tableName);
HColumnDescriptor columnDescriptor = new HColumnDescriptor(Bytes.toBytes("cf"));
tableDescriptor.addFamily(columnDescriptor);
admin.createTable(tableDescriptor);
```

### 删除表

```java
admin.deleteTable(TableName.valueOf("test:test"));
```

### 修改表

```java
// 原始表
TableName tableName = TableName.valueOf("test:test");
HColumnDescriptor columnDescriptor = new HColumnDescriptor("cf1");
HTableDescriptor tableDescriptor = new HTableDescriptor(tableName)
    .addFamily(columnDescriptor)
    .setValue("Description", "Original Table");
admin.createTable(tableDescriptor, Bytes.toBytes(1L), Bytes.toBytes(10000L), 50);

// 修改表
HTableDescriptor newTableDescriptor = admin.getTableDescriptor(tableName);
HColumnDescriptor newColumnDescriptor = new HColumnDescriptor("cf2");
newTableDescriptor.addFamily(newColumnDescriptor)
                  .setMaxFileSize(1024 * 1024 * 1024L)
                  .setValue("Description", "Modified Table");

// 修改表必须先禁用再想修改
admin.disableTable(tableName);
admin.modifyTable(tableName, newTableDescriptor);
```

### 禁用表

需要注意：HBase 表在删除前，必须先禁用。

```java
admin.disableTable(TableName.valueOf("test:test"));
```

### 启用表

```
admin.enableTable(TableName.valueOf("test:test"));
```

### 查看表是否有效

```java
boolean isOk = admin.isTableAvailable(tableName);
System.out.println("Table available: " + isOk);
```

## 参考资料

- [《HBase 权威指南》](https://item.jd.com/11321037.html)
- [《HBase 权威指南》官方源码](https://github.com/larsgeorge/hbase-book)
- [连接 HBase 的正确姿势](https://developer.aliyun.com/article/581702)
