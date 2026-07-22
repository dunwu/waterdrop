---
icon: logos:redis
title: Redis 教程
cover: https://raw.githubusercontent.com/dunwu/images/master/archive/2024/11/1a422c1e990a4499873ba2f9e73ad0a5.png
date: 2020-02-10 14:27:39
categories:
  - 数据库
  - KV数据库
  - Redis
tags:
  - 数据库
  - KV数据库
  - Redis
permalink: /pages/0302a9aa/
hidden: true
index: false
---

# Redis 教程

::: info 概述

**Redis 是一种内存数据库**，对数据的读写操作都是在内存中完成。因此其**读写速度非常快**，常用于**缓存，消息队列、分布式锁等场景**。

- **高性能** – Redis 的数据读写都是在内存中完成，因此性能极高。
- **高并发** - Redis 的读速度约为 10w+ QPS，写的速度约为 8w+ TPS，将近是 Mysql 的 10 倍。

**Redis 支持多种数据类型**，如：String(字符串)、Hash(哈希)、 List (列表)、Set(集合)、Zset(有序集合)、Bitmaps（位图）、HyperLogLog（基数统计）、GEO（地理空间）、Stream（流）。Redis 对数据类型的操作都是**原子性**的，因为执行命令由单线程负责的，不存在并发竞争的问题。

**Redis 的读写采用单线程模型**，因此，其操作天然就具有**原子性**。

Redis 支持两种持久化策略：RDB 和 AOF。

Redis 支持过期删除和内存淘汰，因此常被用于作为缓存。

Redis 有多种高可用方案：**主从复制**模式、**哨兵**模式、**集群**模式。

Redis 支持很多丰富的特性，如：**事务** 、**Lua 脚本**、**发布订阅**等等。

:::

## 📖 内容

- [Redis 基本数据类型]([Redis]数据类型.md) - 关键词：`String`、`Hash`、`List`、`Set`、`Zset`
- [Redis 高级数据类型]([Redis]数据类型二.md) - 关键词：`BitMap`、`HyperLogLog`、`Geo`、`Stream`
- [Redis 数据结构]([Redis]数据结构.md) - 关键词：`对象`、`SDS`、`链表`、`字典`、`跳表`、`整数集合`、`压缩列表`
- [Redis 内存管理]([Redis]内存管理.md) - 关键词：`定时删除`、`惰性删除`、`定期删除`、`LRU`、`LFU`
- [Redis 持久化]([Redis]持久化.md) - 关键词：`RDB`、`AOF`、`SAVE`、`BGSAVE`、`appendfsync`
- [Redis 事件]([Redis]事件.md) - 关键词：`文件事件`、`时间事件`
- [Redis 复制]([Redis]复制.md) - 关键词：`SLAVEOF`、`SYNC`、`PSYNC`、`命令传播`、`心跳`
- [Redis 哨兵]([Redis]哨兵.md) - 关键词：`高可用`、`监控`、`选主`、`故障转移`、`Raft`
- [Redis 集群]([Redis]集群.md) - 关键词：`高可用`、`监控`、`选主`、`故障转移`、`分区`、`Raft`、`Gossip`
- [Redis 订阅]([Redis]订阅.md) - 关键词：`订阅`、`SUBSCRIBE`、`PSUBSCRIBE`、`PUBLISH`、`观察者模式`
- [Redis 独立功能]([Redis]事务.md) - 关键词：`事务`、`ACID`、`MULTI`、`EXEC`、`DISCARD`、`WATCH`
- [Redis 管道]([Redis]管道.md) - 关键词：`Pipeline`
- [Redis 脚本]([Redis]脚本.md) - 关键词：`Lua`
- [Redis 运维]([Redis]运维.md) - 关键词：`安装`、`配置`、`命令`、`集群`、`客户端`
- [Redis 实战]([Redis]实战.md) - 关键词：`缓存`、`分布式锁`、`布隆过滤器`
- [Redis 面试]([Redis]面试.md) 💯
- [Redis 面试之应用篇]([Redis]面试之应用篇.md) 💯

## 📚 资料

- **官网**
  - [Redis 官网](https://redis.io/)
  - [Redis Github](https://github.com/antirez/redis)
  - [Redis 官方文档中文版](http://redis.cn/)
  - [Redis 在线环境](https://try.redis.io/)
- **书籍**
  - [《Redis 实战》](https://item.jd.com/11791607.html)
  - [《Redis 设计与实现》](https://item.jd.com/11486101.html)
- **教程**
  - [Redis 命令参考](http://redisdoc.com/)
- **文章**
  - [Introduction to Redis](https://www.slideshare.net/dvirsky/introduction-to-redis)
  - [《我们一起进大厂》系列- Redis 基础](https://juejin.im/post/5db66ed9e51d452a2f15d833)
  - [Redis Explained](https://architecturenotes.co/p/redis)
- **源码**
  - [《Redis 实战》配套 Python 源码](https://github.com/josiahcarlson/redis-in-action)
- **资源汇总**
  - [awesome-redis](https://github.com/JamzyWang/awesome-redis)
- **Redis Client**
  - [Jedis](https://github.com/xetorthio/jedis) - 最流行的 Redis Java 客户端
  - [Redisson](https://github.com/redisson/redisson) - 额外提供了很多的分布式服务特性，如：分布式锁、分布式 Java 常用对象（BitSet、BlockingQueue、CountDownLatch 等）
  - [Lettuce](https://github.com/lettuce-io/lettuce-core) - Spring Boot 2.0 默认 Redis 客户端
  - [spring-data-redis 官方文档](https://docs.spring.io/spring-data/redis/docs/1.8.13.RELEASE/reference/html/)
  - [Redisson 官方文档(中文,略有滞后)](https://github.com/redisson/redisson/wiki/%E7%9B%AE%E5%BD%95)
  - [Redisson 官方文档(英文)](https://github.com/redisson/redisson/wiki/Table-of-Content)
  - [CRUG | Redisson PRO vs. Jedis: Which Is Faster? 翻译](https://www.jianshu.com/p/82f0d5abb002)
  - [redis 分布锁 Redisson 性能测试](https://blog.csdn.net/everlasting_188/article/details/51073505)
  - [RedisDesktopManager](https://github.com/uglide/RedisDesktopManager)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾
