---
icon: logos:hbase
title: HBase Java API 管理功能
date: 2023-04-13 16:36:48
categories:
  - 数据库
  - 列式数据库
  - HBase
tags:
  - 数据库
  - 列式数据库
  - 大数据
  - HBase
  - API
permalink: /pages/447272b4/
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

## 应用场景

- **表生命周期管理**：通过 Admin API 创建、删除、禁用、启用表，管理表的完整生命周期。
- **集群运维**：监控 RegionServer 状态、执行 Major Compaction、平衡 Region 分布。
- **Schema 变更**：在线添加/删除列族，调整表结构，支持业务迭代。
- **权限管理**：通过 ACL 控制用户/组的读写权限，保障数据安全。

## 最佳实践

- **谨慎执行 Major Compaction**：Major Compaction 会合并所有 StoreFile，耗时长且影响性能，建议在低峰期执行。
- **监控 Region 分布**：使用 balancer 确保 Region 在各 RegionServer 间均匀分布，避免热点。
- **定期清理快照**：及时删除过期快照，释放存储空间。
- **自动化运维**：编写运维脚本自动化常见操作，减少人工错误。

## 常见问题

**为什么表禁用后才能删除？**

HBase 设计如此，禁用表是为了确保所有 Region 已关闭，避免删除过程中数据不一致。

**如何在线添加列族？**

先禁用表，然后使用 Admin.addFamily() 添加列族，最后启用表。注意：添加列族会影响该表的所有 Region。

## 参考资料

- [《HBase 权威指南》](https://item.jd.com/11321037.html)
- [《HBase 权威指南》官方源码](https://github.com/larsgeorge/hbase-book)
- [连接 HBase 的正确姿势](https://developer.aliyun.com/article/581702)
