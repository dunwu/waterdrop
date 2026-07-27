---
title: 《The Log-Structured Merge-Tree (LSM-Tree)》笔记
date: 2023-09-05 19:52:01
order: 02
categories:
  - 笔记
  - 分布式
  - 分布式存储
tags:
  - 分布式
  - 分布式存储
  - HBASE
permalink: /pages/8dbf8dbe/
---

# 《The Log-Structured Merge-Tree (LSM-Tree)》笔记

**LSM-Tree** 被广泛应用于以文件结构存储数据的数据库：HBase、Cassandra、LevelDB、SQLite。

**设计目标**：通过**顺序写**提高写操作吞吐量，替代传统的 B+ 树或 ISAM。

## 参考资料

- [The Log-Structured-Merge-Tree](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
- [Log Structured Merge Trees (LSM) 原理](https://www.open-open.com/lib/view/open1424916275249.html)
- [Log Structured Merge Tree](https://lrita.github.io/images/posts/database/lsmtree-170129180333.pdf)
