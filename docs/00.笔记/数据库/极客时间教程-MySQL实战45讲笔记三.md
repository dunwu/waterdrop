---
icon: logos:mysql
title: 《MySQL 实战 45 讲》笔记三
date: 2022-07-20 19:20:08
categories:
  - 笔记
  - 数据库
tags:
  - 数据库
  - MySQL
permalink: /pages/c8dbd494/
---

# 《MySQL 实战 45 讲》笔记三

[极客时间教程 - MySQL 实战 45 讲](https://time.geekbang.org/column/intro/139) 学习笔记

<!-- more -->

## 31 误删数据后除了跑路，还能怎么办？

**误删分类**：误删行 / 误删表 / 误删库 / 误删实例

**误删行的恢复**：
- Flashback 工具解析 binlog 恢复（前提：`binlog_format=row` + `binlog_row_image=FULL`）
- 建议在临时库或从库上操作
- **预防**：`sql_safe_updates=on`，上线前 SQL 审计

**误删库/表的恢复**：
1. 取最近一次全量备份
2. 用备份恢复出临时库
3. 从日志备份中取出误删操作之后的日志，应用到临时库
- GTID 模式可更方便跳过误删操作的 binlog
- 可将临时库设为备库的从库，利用并行复制加速

**延迟复制备库**：`CHANGE MASTER TO MASTER_DELAY = N`，提供恢复时间窗口

**预防措施**：账号分离、删除前先改名、跨机房备份

## 32 为什么还有 kill 不掉的语句

**kill 命令类型**：
- `kill query + 线程 id`：终止正在执行的语句
- `kill connection + 线程 id`：断开连接并终止语句

**执行机制**：设置线程状态为 `KILL_QUERY`/`KILL_CONNECTION` 并发送信号，线程在执行过程中检查状态后才进入终止逻辑。

**kill 不掉的两种情况**：
- 线程未执行到判断状态的逻辑
- 终止逻辑耗时较长（大事务回滚、大查询删临时文件、DDL 删临时文件）

**客户端误区**：
- 表多导致连接慢：实际是客户端表名补全功能，用 `-A` 参数关闭
- `--quick` 参数：让客户端跳过缓存，并非加速服务端

## 33 我查这么多数据，会不会把数据库内存打爆？

**Server 层影响**：
- MySQL 采用“边读边发”方式，结果先写入 `net_buffer`（默认 16K），写满后发送给客户端
- 客户端接收慢时，网络栈可能被写满，状态显示为“Sending to client”
- 小查询用 `mysql_store_result`，大查询用 `mysql_use_result`

**InnoDB Buffer Pool 影响**：
- Buffer Pool 大小由 `innodb_buffer_pool_size` 控制（通常设为物理内存 60%~80%）
- 使用**改进 LRU 算法**：分为 young 区域和 old 区域
- 全表扫描数据放入 old 区域，停留超过 1 秒才移到 young 区域，**避免冷数据淘汰热数据**
- 线上系统应保证 Buffer Pool 命中率在 99% 以上

**结论**：大查询不会打爆内存，但会消耗 IO 资源，业务高峰期应避免全表扫描。

## 34 到底可不可以使用 join

MySQL 支持两种 JOIN 算法：**NLJ（Index Nested-Loop Join）** 和 **BNL（Block Nested-Loop Join）**。

**NLJ（被驱动表有索引时）**：
- 从驱动表读一行 → 用索引在被驱动表查找 → 组合结果
- 扫描行数：`N + N*2*log2M`（N=驱动表行数，M=被驱动表行数）
- **小表做驱动表**

**BNL（被驱动表无索引时）**：
- 驱动表数据读入 `join_buffer` → 扫描被驱动表与 buffer 匹配
- 扫描行数：`M + N`（内存操作，比 SNL 好）
- buffer 不够大时，小表做驱动表

**`join_buffer_size`**：默认 256KB，驱动表数据超过 buffer 大小时会分段处理，导致被驱动表多次扫描

**结论**：
- 被驱动表有索引时 JOIN 高效；无索引且表大时性能差
- 无论哪种算法，通常**小表做驱动表**（考虑参与 JOIN 字段的数据量）

## 35 join 语句怎么优化？

**MRR（Multi-Range Read）**：将主键 id 放入 `read_rnd_buffer` 排序后顺序回表，减少随机磁盘访问。启用：`optimizer_switch="mrr_cost_based=off"`

**BKA（Batched Key Access）**：对 NLJ 的优化，驱动表多行一次性放入 `join_buffer` 后批量传递给被驱动表。启用：`optimizer_switch='mrr=on,mrr_cost_based=off,batched_key_access=on'`

**BNL 性能问题**：大表 JOIN 时多次扫描被驱动表，占用 CPU/IO，可能淘汰 Buffer Pool 热数据

**优化方法**：
- 增大 `join_buffer_size`
- 给被驱动表加索引（BNL → BKA）
- 临时表方案：插入过滤后数据 → 建索引 → JOIN
- Hash Join 模拟：驱动表加载到内存哈希结构 → 被驱动表逐行匹配

## 36 为什么临时表可以重名？

**内存表 vs 临时表**：
- **内存表**：Memory 引擎，数据在内存，重启丢失
- **临时表**：可用多种引擎，可存磁盘或内存

**临时表特性**：
- 语法：`create temporary table`
- 仅创建 session 可见，可与普通表同名
- `show tables` 不显示，session 结束时自动删除
- 常用于分库分表系统的跨库查询汇总

**存储机制**：`table_def_key` = 库名 + 表名 + server_id + thread_id，确保不同线程的同名临时表不冲突

**主备复制**：`binlog_format=statement/mixed` 时临时表操作会记录到 binlog；`row` 时不记录

**操作限制**：可用 `alter table` 改名，不能用 `rename`

## 37 什么时候会使用内部临时表？

内部临时表用于存储中间结果，如 `UNION` 和 `GROUP BY`。

**UNION 操作**：创建内存临时表 → 插入子查询结果 → 去重合并 → `UNION ALL` 不需要去重，不需要临时表

**GROUP BY 操作**：创建临时表存储分组结果 → 扫描数据更新计数 → 排序返回。超过 `tmp_table_size` 时转为磁盘临时表

**优化方法**：
- 分组字段有索引可利用有序性避免临时表和排序
- 无排序要求时加 `ORDER BY NULL`
- 大数据量可用 `SQL_BIG_RESULT` 直接用磁盘临时表

## 38 都说 InnoDB 好，那还要不要使用 Memory 引擎？

| 对比项 | InnoDB | Memory |
| :--- | :--- | :--- |
| 数据组织 | 索引组织表（B+树，有序） | 堆组织表（数组，无序） |
| 存储位置 | 磁盘 | 内存（重启丢失） |
| 索引 | B-Tree | 默认哈希索引（也支持 B-Tree） |
| 锁粒度 | 行锁 | 表锁 |
| 数据类型 | 支持所有 | 不支持 Blob/Text，varchar 存为定长 |

**Memory 引擎缺点**：
- 只支持表锁，并发性能差
- 重启数据丢失，可能导致主备同步停止

**结论**：生产环境不建议使用 Memory 引擎普通表。内存临时表适合数据量小、不需持久化的场景。

## 39 自增主键为什么不是连续的？

**存储机制**：MyISAM 保存在数据文件，InnoDB 在内存中（MySQL 8.0 才持久化到 redo log）

**自增主键不连续的原因**：
- **唯一键冲突**：插入失败但自增值已增加
- **事务回滚**：自增值不回退
- **批量插入**：指数级分配策略（1, 2, 4, 8...），实际使用量可能少于分配量

**自增锁模式**（`innodb_autoinc_lock_mode`）：
- `0`：语句级锁
- `1`（默认）：普通插入立即释放，批量插入语句级释放
- `2`：所有插入立即释放（建议配合 `binlog_format=row`）

## 40 insert 语句的锁为什么这么多？

**`INSERT … SELECT`**：可重复读下对源表所有记录和间隙加 next-key lock（保证主备一致性）

**唯一键冲突**：
- 冲突时在唯一键上加共享 next-key lock（读锁）
- 多事务同时插入相同唯一键可能导致死锁

**`INSERT INTO … ON DUPLICATE KEY UPDATE`**：
- 冲突时加排他 next-key lock（写锁）并执行更新
- 多个唯一键冲突时按索引顺序处理第一个

**优化建议**：
- `INSERT … SELECT` 可用临时表避免循环写入
- 唯一键冲突时尽快提交/回滚事务，减少死锁风险

## 41 怎么最快地复制一张表？

| 方法 | 优点 | 缺点 |
| :--- | :--- | :--- |
| **mysqldump** | 可控制导出范围 | 速度慢，不能处理复杂 WHERE |
| **CSV 导出** | 灵活，支持所有 SQL | 每次只能导出一张表 |
| **物理拷贝** | 速度最快（大表） | 只能全表拷贝，需 InnoDB |

物理拷贝使用可传输表空间功能，拷贝 `.ibd` 和 `.cfg` 文件。

## 42 grant 之后要跟着 flush privileges 吗？

`GRANT` 同时更新磁盘权限表和内存权限数组，判断权限用内存数据。**规范使用 `GRANT`/`REVOKE` 不需要 `FLUSH PRIVILEGES`**。

`FLUSH PRIVILEGES` 会清空内存权限数组并从磁盘重新加载，仅在直接用 DML 修改权限表导致内存/磁盘不一致时才需要。

**建议**：避免直接操作权限表，用 `GRANT`/`REVOKE` 管理权限。

## 43 要不要使用分区表？

分区表将大表按规则分成多个小表，每个分区对应独立物理文件。

**引擎层**：每个分区是独立表，加锁范围仅限当前分区

**Server 层**：分区表是一个逻辑表，所有分区共享同一个 MDL 锁。第一次访问需打开所有分区文件。

**优缺点**：
- **优点**：业务透明，`ALTER TABLE ... DROP PARTITION` 快速删除历史数据
- **缺点**：打开所有分区文件开销、MDL 锁共享、分区过多影响性能

**注意事项**：
- MySQL 8.0 起仅支持 InnoDB/NDB 分区表
- 分区数量不宜过多，单分区 1000 万行以内性能可接受
- 分区表主键必须包含分区字段

## 44 答疑文章（三）

**JOIN 写法**：
- `left join` 左边不一定是驱动表
- `left join` 中条件放 `where` 可能改变语义
- `join` 条件放 `on`/`where` 无区别

**distinct vs group by**：不需要聚合函数时两者语义和性能相同

**备库自增主键**：`binlog_format=statement` 时通过 `SET INSERT_ID` 确保一致

## 45 自增 id 用完怎么办？

| ID 类型 | 大小 | 达到上限后 | 风险 |
| :--- | :--- | :--- | :--- |
| 表定义自增 ID | 视类型 | 值不变 | 主键冲突 |
| InnoDB row_id | 6 字节 | 从 0 循环 | 数据覆盖 |
| Xid (global_query_id) | 8 字节 | 从 0 循环 | 重复概率极低 |
| trx_id | 8 字节 | 从 0 循环 | 脏读（极少发生） |
| thread_id | 自增 | 从 0 循环 | 唯一数组保证不重复 |

**建议**：数据量大时用 `bigint unsigned`，主动创建自增主键避免 row_id 覆盖问题。

## 参考资料

- [极客时间教程 - MySQL 实战 45 讲](https://time.geekbang.org/column/intro/139)
