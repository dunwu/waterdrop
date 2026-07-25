---
icon: devicon:hadoop
title: HDFS
date: 2020-02-24 21:14:47
categories:
  - 大数据
  - Hadoop
tags:
  - 大数据
  - Hadoop
  - hdfs
permalink: /pages/c6cd6dd0/
---

# HDFS

## 概述

**HDFS（Hadoop Distributed File System）** 是 Apache Hadoop 项目的核心子项目，是一个运行在普通廉价硬件上的分布式文件系统。其设计思想源自 Google 2003 年发表的 GFS（Google File System）论文。

HDFS 的设计目标是：将大量数据可靠地存储在普通机器集群上，并以流式方式高效访问。它对外呈现为一个统一的文件系统视图，内部将数据以 Block（数据块）为单位分散存储在集群各节点上，每个 Block 保存多份副本（默认 3 份），以实现容错。

### 设计假设

HDFS 在设计时遵循以下核心假设：

1. **硬件故障是常态**：集群由数千台廉价硬件构成，节点故障是常见事件，系统必须能够自动检测并恢复
2. **流式数据访问**：优先支持高吞吐量的批量读写，而非低延迟的随机访问
3. **超大文件**：支持数百 MB 到数 TB 的大文件，Block 大小默认 128MB（Hadoop 1.x 为 64MB）
4. **一次写入，多次读取（Write Once, Read Many）**：文件一旦创建并写入，通常只追加，不修改
5. **就近计算**：将计算程序迁移到数据所在节点，而非传输数据到计算节点

## 特性

| 特性 | 说明 |
|---|---|
| **高容错** | 数据块自动多副本存储（默认 3 副本），节点故障时自动恢复副本数量 |
| **高吞吐量** | 针对批量数据读写优化，顺序读取性能优秀，适合离线大数据分析 |
| **超大规模** | 可管理 PB 级数据，支持数千节点的集群 |
| **高扩展性** | 通过增加 DataNode 即可线性扩展存储容量和 IO 吞吐 |
| **跨平台** | 基于 Java 实现，可运行在 Linux、Windows 等多种操作系统 |
| **统一命名空间** | 通过 NameNode 提供统一的目录树视图，对外表现为单一文件系统 |

## 原理

### 核心架构

HDFS 采用 Master/Slave 架构，主要由以下组件构成：

```
客户端（Client）
    │
    ▼
NameNode（主节点 - 元数据）
    │
    ├── DataNode 1（存储 Block 副本）
    ├── DataNode 2（存储 Block 副本）
    └── DataNode 3（存储 Block 副本）
```

**NameNode（名称节点）**：

- 管理文件系统的命名空间（目录树结构）
- 维护文件到 Block 的映射关系（`FsImage` + `EditLog`）
- 记录每个 Block 在哪些 DataNode 上有副本（存储在内存中，不持久化）
- 是整个集群的单点瓶颈，Hadoop 2.x 引入 HA（Active/Standby 双 NameNode）解决

**DataNode（数据节点）**：

- 实际存储数据块及其校验和
- 周期性向 NameNode 发送心跳和 Block 汇报
- 处理来自客户端的数据块读写请求

**SecondaryNameNode（辅助名称节点，非热备）**：

- 定期合并 `EditLog` 到 `FsImage`，防止 `EditLog` 文件过大
- 不是 NameNode 的热备（Hadoop 1.x 时代方案），Hadoop 2.x HA 模式下已由 Standby NameNode 替代

### 数据读取流程

1. 客户端调用 `FileSystem.open()` 向 NameNode 请求文件的 Block 位置列表
2. NameNode 返回包含每个 Block 所在 DataNode 的列表（按网络距离排序，优先本地）
3. 客户端依次从最近的 DataNode 读取每个 Block
4. 读取过程中校验数据完整性（CRC 校验），如发现损坏则从其他副本读取

### 数据写入流程

1. 客户端调用 `FileSystem.create()` 向 NameNode 申请创建文件
2. NameNode 检查权限和是否已存在，通过后返回可写入的 DataNode 列表（pipeline 管道）
3. 客户端将数据切分为 64KB 的 Packet，逐个写入 Pipeline（DataNode 1 → DataNode 2 → DataNode 3）
4. 每个 DataNode 收到 Packet 后先存入本地，再转发给下游，全部收到后返回 ACK
5. 全部 Block 写完后，客户端调用 `close()`，NameNode 完成元数据提交

### NameNode HA（高可用）

Hadoop 2.x 引入 NameNode HA，通过以下机制解决单点故障：

- **Active NameNode** 处理所有请求，将 EditLog 写入 **JournalNode 集群**（通常 3 个节点，Quorum 机制）
- **Standby NameNode** 实时读取 JournalNode 的 EditLog，保持与 Active 同步
- **ZKFC（ZooKeeper Failover Controller）** 监控 Active NameNode 健康状态，故障时自动切换
- DataNode 同时向两个 NameNode 汇报 Block 状态

### Block 副本放置策略

默认 3 副本的放置策略：

1. **第 1 副本**：写入客户端所在节点（若客户端在集群外，则随机选择一个低负载节点）
2. **第 2 副本**：写入与第 1 副本**不同机架**的随机节点（跨机架保证机架级容错）
3. **第 3 副本**：写入与第 2 副本**同机架**的不同节点（减少跨机架带宽消耗）

## 应用场景

### 场景一：大数据离线分析的底层存储

**背景**：某互联网公司每天产生 5TB 的用户行为日志，需要可靠存储并支持批量分析。

**方案**：使用 Flume 将各服务器的日志实时采集并写入 HDFS，日志按日期分区存储：

```
/data/logs/
  ├── 2024-01-01/
  │   ├── app_log.part-0000.gz
  │   └── app_log.part-0001.gz
  └── 2024-01-02/
      └── ...
```

Spark / Hive 直接读取 HDFS 上的数据进行 ETL 和报表计算。HDFS 的高吞吐特性使得批量扫描 TB 级数据的效率远超传统文件系统。

### 场景二：数据仓库的原始数据层（ODS）

**背景**：企业数据仓库的 ODS 层需要存储来自多个业务系统的原始数据快照，数据量逐年增长，需要低成本、高可靠的存储方案。

**方案**：通过 Sqoop 每日将 MySQL 业务数据批量同步至 HDFS，以 Parquet 列式格式存储，利用 Snappy 压缩降低存储成本（压缩比通常可达 3:1 到 5:1）：

```bash
# 每日增量同步 orders 表到 HDFS
sqoop import \
  --connect jdbc:mysql://db:3306/shop \
  --table orders \
  --target-dir /data/ods/orders/dt=2024-01-01 \
  --incremental lastmodified \
  --check-column update_time \
  --last-value "2024-01-01 00:00:00" \
  --as-parquetfile \
  -m 4
```

### 场景三：机器学习训练数据集管理

**背景**：AI 团队需要管理数百 GB 的图片、音频训练数据集，多个训练任务并发读取，需要高带宽。

**方案**：将训练数据集以原始格式上传 HDFS，训练框架（TensorFlow on YARN、PyTorch with HDFS connector）直接流式读取 HDFS 文件，利用数据本地性优化减少网络传输：

```java
// 使用 Java API 读取 HDFS 上的训练数据
Configuration conf = new Configuration();
conf.set("fs.defaultFS", "hdfs://namenode:9000");
FileSystem fs = FileSystem.get(conf);

RemoteIterator<LocatedFileStatus> files = fs.listFiles(
    new Path("/data/train/images"), true);
while (files.hasNext()) {
    LocatedFileStatus fileStatus = files.next();
    // 处理每个训练文件...
}
```

## 最佳实践

### 实践一：合理设置 Block 副本数

默认 3 副本适合大多数场景，但可根据具体需求调整：

```bash
# 对不重要的临时数据降低副本数以节省存储
hdfs dfs -setrep -w 1 /data/tmp/

# 对关键数据提高副本数以提升可靠性
hdfs dfs -setrep -w 5 /data/critical/

# 查看当前副本状态
hdfs fsck /data/critical/ -files -blocks -locations
```

### 实践二：使用合适的文件格式和压缩方式

| 场景 | 推荐格式 | 压缩算法 | 原因 |
|---|---|---|---|
| 数仓 ODS/DWD 层 | Parquet | Snappy | 列式存储，支持谓词下推，Snappy 压缩/解压快 |
| 归档冷数据 | ORC | Zlib/Zstd | 更高压缩比，降低存储成本 |
| 流式日志 | TextFile / SequenceFile | LZ4 | 支持追加写入，压缩速度快 |
| Hive 分析 | ORC | Snappy | Hive 对 ORC 有深度优化 |

```bash
# 查看文件实际压缩后大小
hdfs dfs -du -h /data/warehouse/
```

### 实践三：解决小文件问题

HDFS 的 NameNode 为每个文件/目录维护约 150 字节的元数据，大量小文件会耗尽 NameNode 内存：

**检测小文件：**
```bash
# 统计各目录下小于 1MB 的文件数
hdfs fsck / -files | awk '{print $2}' | sort -n | awk '$1 < 1048576 {count++} END {print count, "small files"}'
```

**合并小文件方案：**
```bash
# 方案1：使用 getmerge 合并同目录文件
hdfs dfs -getmerge /data/small_files/ /tmp/merged.txt
hdfs dfs -put /tmp/merged.txt /data/merged/

# 方案2：使用 Hive 定期合并（INSERT OVERWRITE 触发 Map-only 合并作业）
-- 合并小分区文件
SET hive.merge.mapfiles=true;
SET hive.merge.mapredfiles=true;
SET hive.merge.size.per.task=256000000;  -- 合并后每个文件 256MB
INSERT OVERWRITE TABLE orders PARTITION(dt='2024-01-01')
SELECT * FROM orders WHERE dt='2024-01-01';
```

### 实践四：定期检查集群健康状态

```bash
# 检查 HDFS 整体状态（副本丢失、损坏块等）
hdfs fsck / -summary

# 查看各 DataNode 磁盘使用情况
hdfs dfsadmin -report

# 触发数据均衡（DataNode 之间磁盘使用率差异超过阈值时）
hdfs balancer -threshold 10
```

## 常见问题

### Q1：NameNode 内存不足怎么解决？

**原因**：NameNode 将所有元数据存储在内存中，文件数过多（尤其大量小文件）导致 OOM。

**解决方案**：
1. 合并小文件（见最佳实践三）
2. 增大 NameNode 堆内存（修改 `hadoop-env.sh` 中的 `HADOOP_NAMENODE_OPTS`）
3. 使用 **HDFS Federation**：多个 NameNode 分别管理不同命名空间，横向扩展元数据容量
4. 设置文件/目录数量配额：`hdfs dfsadmin -setQuota 1000000 /data/user_logs`

### Q2：DataNode 磁盘使用不均衡怎么处理？

**原因**：节点扩容或数据写入分布不均，导致部分 DataNode 磁盘使用率远高于其他节点。

**解决方案**：
```bash
# 启动 Balancer，设置数据迁移带宽上限（单位 MB/s）
hdfs dfsadmin -setBalancerBandwidth 104857600  # 100MB/s
hdfs balancer -threshold 5  # 目标：所有节点磁盘使用率差异不超过 5%
```

### Q3：文件上传失败，报 `No space left on device`？

**可能原因与排查：**
1. DataNode 磁盘真的满了 → `hdfs dfsadmin -report` 查看各节点剩余空间
2. DataNode 配置的 `dfs.datanode.du.reserved` 保留空间过大 → 调整该参数
3. NameNode 元数据目录所在磁盘满了 → 检查 NameNode 所在机器磁盘

### Q4：如何处理损坏的 Block？

```bash
# 查找损坏的 Block
hdfs fsck / -list-corruptfileblocks

# 如果损坏文件不重要，可以删除
hdfs fsck /path/to/corrupt/file -delete

# 如果损坏文件重要，检查是否有其他副本可以恢复
# 通常只要还有一个完好副本，HDFS 会自动复制补齐
```

### Q5：HDFS 和对象存储（如 S3/OSS）如何选择？

| 维度 | HDFS | 对象存储（S3/OSS） |
|---|---|---|
| 数据本地性 | 支持，计算就近存储 | 不支持，计算与存储分离 |
| 延迟 | 低（局域网） | 较高（网络 IO） |
| 成本 | 较高（自建集群） | 低（按量付费） |
| 运维 | 需要自己运维 | 托管服务，无需运维 |
| 扩展性 | 需要手动扩容 | 近乎无限扩展 |
| 适用场景 | 对延迟敏感的批处理 | 云原生大数据、弹性计算 |

**建议**：在云环境下，存算分离（Spark/Flink on S3/OSS）是主流趋势，可以独立扩展计算和存储资源。

## HDFS 命令

### 显示当前目录结构

```shell
# 显示当前目录结构
hdfs dfs -ls <path>
# 递归显示当前目录结构
hdfs dfs -ls -R <path>
# 显示根目录下内容
hdfs dfs -ls /
```

### 创建目录

```shell
# 创建目录
hdfs dfs -mkdir <path>
# 递归创建目录
hdfs dfs -mkdir -p <path>
```

### 删除操作

```shell
# 删除文件
hdfs dfs -rm <path>
# 递归删除目录和文件
hdfs dfs -rm -R <path>
```

### 导入文件到 HDFS

```shell
# 二选一执行即可
hdfs dfs -put [localsrc] [dst]
hdfs dfs -copyFromLocal [localsrc] [dst]
```

### 从 HDFS 导出文件

```shell
# 二选一执行即可
hdfs dfs -get [dst] [localsrc]
hdfs dfs -copyToLocal [dst] [localsrc]
```

### 查看文件内容

```shell
# 二选一执行即可
hdfs dfs -text <path>
hdfs dfs -cat <path>
```

### 显示文件的最后一千字节

```shell
hdfs dfs -tail <path>
# 和 Linux 下一样，会持续监听文件内容变化 并显示文件的最后一千字节
hdfs dfs -tail -f <path>
```

### 拷贝文件

```shell
hdfs dfs -cp [src] [dst]
```

### 移动文件

```shell
hdfs dfs -mv [src] [dst]
```

### 统计当前目录下各文件大小

- 默认单位字节
- -s : 显示所有文件大小总和，
- -h : 将以更友好的方式显示文件大小（例如 64.0m 而不是 67108864）

```shell
hdfs dfs -du <path>
```

### 合并下载多个文件

- -nl 在每个文件的末尾添加换行符（LF）
- -skip-empty-file 跳过空文件

```shell
hdfs dfs -getmerge
# 示例 将 HDFS 上的 hbase-policy.xml 和 hbase-site.xml 文件合并后下载到本地的/usr/test.xml
hdfs dfs -getmerge -nl  /test/hbase-policy.xml /test/hbase-site.xml /usr/test.xml
```

### 统计文件系统的可用空间信息

```shell
hdfs dfs -df -h /
```

### 更改文件复制因子

```shell
hdfs dfs -setrep [-R] [-w] <numReplicas> <path>
```

- 更改文件的复制因子。如果 path 是目录，则更改其下所有文件的复制因子
- -w : 请求命令是否等待复制完成

```shell
# 示例
hdfs dfs -setrep -w 3 /user/Hadoop/dir1
```

### 权限控制

```shell
# 权限控制和 Linux 上使用方式一致
# 变更文件或目录的所属群组。 用户必须是文件的所有者或超级用户。
hdfs dfs -chgrp [-R] GROUP URI [URI ...]
# 修改文件或目录的访问权限  用户必须是文件的所有者或超级用户。
hdfs dfs -chmod [-R] <MODE[,MODE]... | OCTALMODE> URI [URI ...]
# 修改文件的拥有者  用户必须是超级用户。
hdfs dfs -chown [-R] [OWNER][:[GROUP]] URI [URI ]
```

### 文件检测

```shell
hdfs dfs -test - [defsz]  URI
```

可选选项：

- -d：如果路径是目录，返回 0。
- -e：如果路径存在，则返回 0。
- -f：如果路径是文件，则返回 0。
- -s：如果路径不为空，则返回 0。
- -r：如果路径存在且授予读权限，则返回 0。
- -w：如果路径存在且授予写入权限，则返回 0。
- -z：如果文件长度为零，则返回 0。

```
# 示例
hdfs dfs -test -e filename
```

## HDFS API

### 简介

想要使用 HDFS API，需要导入依赖 `hadoop-client`。如果是 CDH 版本的 Hadoop，还需要额外指明其仓库地址：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.heibaiying</groupId>
    <artifactId>hdfs-java-api</artifactId>
    <version>1.0</version>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <hadoop.version>2.6.0-cdh5.15.2</hadoop.version>
    </properties>

    <!---配置 CDH 仓库地址-->
    <repositories>
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
        </repository>
    </repositories>

    <dependencies>
        <!--Hadoop-client-->
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>${hadoop.version}</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

### FileSystem

`FileSystem` 是所有 HDFS 操作的主入口。由于之后的每个单元测试都需要用到它，这里使用 `@Before` 注解进行标注。

```java
private static final String HDFS_PATH = "hdfs://192.168.0.106:8020";
private static final String HDFS_USER = "root";
private static FileSystem fileSystem;

@Before
public void prepare() {
    try {
        Configuration configuration = new Configuration();
        // 这里我启动的是单节点的 Hadoop, 所以副本系数设置为 1, 默认值为 3
        configuration.set("dfs.replication", "1");
        fileSystem = FileSystem.get(new URI(HDFS_PATH), configuration, HDFS_USER);
    } catch (IOException e) {
        e.printStackTrace();
    } catch (InterruptedException e) {
        e.printStackTrace();
    } catch (URISyntaxException e) {
        e.printStackTrace();
    }
}

@After
public void destroy() {
    fileSystem = null;
}
```

> [FileSystem 官方 Java API 文档](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/fs/FileSystem.html)

### 创建目录

支持递归创建目录：

```java
@Test
public void mkDir() throws Exception {
    fileSystem.mkdirs(new Path("/hdfs-api/test0/"));
}
```

### 创建指定权限的目录

`FsPermission(FsAction u, FsAction g, FsAction o)` 的三个参数分别对应：创建者权限，同组其他用户权限，其他用户权限，权限值定义在 `FsAction` 枚举类中。

```java
@Test
public void mkDirWithPermission() throws Exception {
    fileSystem.mkdirs(new Path("/hdfs-api/test1/"),
            new FsPermission(FsAction.READ_WRITE, FsAction.READ, FsAction.READ));
}
```

### 创建文件，并写入内容

```java
@Test
public void create() throws Exception {
    // 如果文件存在，默认会覆盖，可以通过第二个参数进行控制。第三个参数可以控制使用缓冲区的大小
    FSDataOutputStream out = fileSystem.create(new Path("/hdfs-api/test/a.txt"),
                                               true, 4096);
    out.write("hello hadoop!".getBytes());
    out.write("hello spark!".getBytes());
    out.write("hello flink!".getBytes());
    // 强制将缓冲区中内容刷出
    out.flush();
    out.close();
}
```

### 判断文件是否存在

```java
@Test
public void exist() throws Exception {
    boolean exists = fileSystem.exists(new Path("/hdfs-api/test/a.txt"));
    System.out.println(exists);
}
```

### 查看文件内容

查看小文本文件的内容，直接转换成字符串后输出：

```java
@Test
public void readToString() throws Exception {
    FSDataInputStream inputStream = fileSystem.open(new Path("/hdfs-api/test/a.txt"));
    String context = inputStreamToString(inputStream, "utf-8");
    System.out.println(context);
}
```

`inputStreamToString` 是一个自定义方法，代码如下：

```java
/**
 * 把输入流转换为指定编码的字符
 *
 * @param inputStream 输入流
 * @param encode      指定编码类型
 */
private static String inputStreamToString(InputStream inputStream, String encode) {
    try {
        if (encode == null || ("".equals(encode))) {
            encode = "utf-8";
        }
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, encode));
        StringBuilder builder = new StringBuilder();
        String str = "";
        while ((str = reader.readLine()) != null) {
            builder.append(str).append("\n");
        }
        return builder.toString();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return null;
}
```

### 文件重命名

```java
@Test
public void rename() throws Exception {
    Path oldPath = new Path("/hdfs-api/test/a.txt");
    Path newPath = new Path("/hdfs-api/test/b.txt");
    boolean result = fileSystem.rename(oldPath, newPath);
    System.out.println(result);
}
```

### 删除目录或文件

```java
public void delete() throws Exception {
    /*
     *  第二个参数代表是否递归删除
     *    +  如果 path 是一个目录且递归删除为 true, 则删除该目录及其中所有文件；
     *    +  如果 path 是一个目录但递归删除为 false, 则会则抛出异常。
     */
    boolean result = fileSystem.delete(new Path("/hdfs-api/test/b.txt"), true);
    System.out.println(result);
}
```

### 上传文件到 HDFS

```java
@Test
public void copyFromLocalFile() throws Exception {
    // 如果指定的是目录，则会把目录及其中的文件都复制到指定目录下
    Path src = new Path("D:\\BigData-Notes\\notes\\installation");
    Path dst = new Path("/hdfs-api/test/");
    fileSystem.copyFromLocalFile(src, dst);
}
```

### 上传大文件并显示上传进度

```java
@Test
    public void copyFromLocalBigFile() throws Exception {

        File file = new File("D:\\kafka.tgz");
        final float fileSize = file.length();
        InputStream in = new BufferedInputStream(new FileInputStream(file));

        FSDataOutputStream out = fileSystem.create(new Path("/hdfs-api/test/kafka5.tgz"),
                new Progressable() {
                  long fileCount = 0;

                  public void progress() {
                     fileCount++;
                     // progress 方法每上传大约 64KB 的数据后就会被调用一次
                     System.out.println("上传进度：" + (fileCount * 64 * 1024 / fileSize) * 100 + " %");
                   }
                });

        IOUtils.copyBytes(in, out, 4096);

    }
```

### 从 HDFS 上下载文件

```java
@Test
public void copyToLocalFile() throws Exception {
    Path src = new Path("/hdfs-api/test/kafka.tgz");
    Path dst = new Path("D:\\app\\");
    /*
     * 第一个参数控制下载完成后是否删除源文件，默认是 true, 即删除；
     * 最后一个参数表示是否将 RawLocalFileSystem 用作本地文件系统；
     * RawLocalFileSystem 默认为 false, 通常情况下可以不设置，
     * 但如果你在执行时候抛出 NullPointerException 异常，则代表你的文件系统与程序可能存在不兼容的情况 (window 下常见）,
     * 此时可以将 RawLocalFileSystem 设置为 true
     */
    fileSystem.copyToLocalFile(false, src, dst, true);
}
```

### 查看指定目录下所有文件的信息

```java
public void listFiles() throws Exception {
    FileStatus[] statuses = fileSystem.listStatus(new Path("/hdfs-api"));
    for (FileStatus fileStatus : statuses) {
        //fileStatus 的 toString 方法被重写过，直接打印可以看到所有信息
        System.out.println(fileStatus.toString());
    }
}
```

`FileStatus` 中包含了文件的基本信息，比如文件路径，是否是文件夹，修改时间，访问时间，所有者，所属组，文件权限，是否是符号链接等，输出内容示例如下：

```properties
FileStatus{
path=hdfs://192.168.0.106:8020/hdfs-api/test;
isDirectory=true;
modification_time=1556680796191;
access_time=0;
owner=root;
group=supergroup;
permission=rwxr-xr-x;
isSymlink=false
}
```

### 递归查看指定目录下所有文件的信息

```java
@Test
public void listFilesRecursive() throws Exception {
    RemoteIterator<LocatedFileStatus> files = fileSystem.listFiles(new Path("/hbase"), true);
    while (files.hasNext()) {
        System.out.println(files.next());
    }
}
```

和上面输出类似，只是多了文本大小，副本系数，块大小信息。

```properties
LocatedFileStatus{
path=hdfs://192.168.0.106:8020/hbase/hbase.version;
isDirectory=false;
length=7;
replication=1;
blocksize=134217728;
modification_time=1554129052916;
access_time=1554902661455;
owner=root; group=supergroup;
permission=rw-r--r--;
isSymlink=false}
```

### 查看文件的块信息

```java
@Test
public void getFileBlockLocations() throws Exception {

    FileStatus fileStatus = fileSystem.getFileStatus(new Path("/hdfs-api/test/kafka.tgz"));
    BlockLocation[] blocks = fileSystem.getFileBlockLocations(fileStatus, 0, fileStatus.getLen());
    for (BlockLocation block : blocks) {
        System.out.println(block);
    }
}
```

块输出信息有三个值，分别是文件的起始偏移量 (offset)，文件大小 (length)，块所在的主机名 (hosts)。

```
0,57028557,hadoop001
```

这里我上传的文件只有 57M（小于 128M)，且程序中设置了副本系数为 1，所有只有一个块信息。

## 参考资料

- [HDFS 官方文档](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html)
- [The Google File System（GFS 原论文）](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)
- [HDFS Shell 命令参考](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/FileSystemShell.html)
- [HDFS Java API 参考](https://hadoop.apache.org/docs/stable/api/org/apache/hadoop/fs/FileSystem.html)
- [Hadoop 权威指南（第 4 版）](https://book.douban.com/subject/27115351/)
- [BigData-Notes: HDFS 常用 Shell 命令](https://github.com/heibaiying/BigData-Notes/blob/master/notes/HDFS%E5%B8%B8%E7%94%A8Shell%E5%91%BD%E4%BB%A4.md)
- [BigData-Notes: HDFS Java API](https://github.com/heibaiying/BigData-Notes/blob/master/notes/HDFS-Java-API.md)
