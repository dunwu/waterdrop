---
title: Redis 教程
date: 2020-02-10 14:27:39
categories:
  - 数据库
  - KV数据库
  - Redis
tags:
  - 数据库
  - KV数据库
  - Redis
permalink: /pages/fe3808/
hidden: true
---

# Redis 教程

> Redis 最典型的应用场景是作为分布式缓存。
>
> 学习 Redis，有必要深入理解缓存的原理，以及 Redis 作为一种缓存方案，在系统应用中的定位。
>
> 参考：[缓存基本原理](https://dunwu.github.io/design/distributed/分布式缓存.html)，有助于理解缓存的特性、原理，使用缓存常见的问题及解决方案。

## 📖 内容

### [Redis 面试](01.Redis面试.md) 💯

### [Redis 数据类型](02.Redis数据类型.md)

> 关键词：`String`、`Hash`、`List`、`Set`、`Zset`、`BitMap`、`HyperLogLog`、`Geo`、`Stream`

![](https://raw.githubusercontent.com/dunwu/images/dev/snap/20230901071808.png)

### [Redis 数据结构](03.Redis数据结构.md)

> 关键词：`对象`、`SDS`、`链表`、`字典`、`跳表`、`整数集合`、`压缩列表`

![](https://raw.githubusercontent.com/dunwu/images/dev/snap/20230901071535.png)

### [Redis 过期删除和内存淘汰](04.Redis过期删除和内存淘汰.md)

> 关键词：`定时删除`、`惰性删除`、`定期删除`、`LRU`、`LFU`

### [Redis 持久化](05.Redis持久化.md)

> Redis 是内存型数据库，为了保证数据在宕机后不会丢失，需要将内存中的数据持久化到硬盘上。
>
> Redis 支持两种持久化方式：RDB 和 AOF。
>
> 关键词：`RDB`、`AOF`、`SAVE`、`BGSAVE`、`appendfsync`

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200224214047.png)

### [Redis 独立功能](06.Redis独立功能.md)

> 关键词：`发布与订阅`、`事务`、`Lua`、`管道`

### [Redis 复制](11.Redis复制.md)

> 关键词：`SLAVEOF`、`SYNC`、`PSYNC`、`REPLCONF ACK`

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200712182603.png)

### [Redis 哨兵](12.Redis哨兵.md)

> Redis 哨兵（Sentinel）是 Redis 的高可用性（High Availability）解决方案，它是基于 Raft 协议实现的。哨兵可以监听主服务器，并在主服务器进入下线状态时，自动从从服务器中选举出新的主服务器。
>
> 关键词：`Sentinel`、`PING`、`INFO`、`Raft`

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200713072747.png)

### [Redis 集群](13.Redis集群.md)

> 关键词：`CLUSTER MEET`、`Hash slot`、`MOVED`、`ASK`、`SLAVEOF no one`、`redis-trib`

![img](https://raw.githubusercontent.com/dunwu/images/dev/snap/20200713100613.png)

### [Redis 实战](21.Redis实战.md)

> 关键词：`缓存`、`分布式锁`、`布隆过滤器`

### [Redis 运维](20.Redis运维.md) 🔨

> 关键词：`安装`、`配置`、`命令`、`集群`、`客户端`

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
- **源码**
  - [《Redis 实战》配套 Python 源码](https://github.com/josiahcarlson/redis-in-action)
- **资源汇总**
  - [awesome-redis](https://github.com/JamzyWang/awesome-redis)
- **Redis Client**
  - [spring-data-redis 官方文档](https://docs.spring.io/spring-data/redis/docs/1.8.13.RELEASE/reference/html/)
  - [Redisson 官方文档(中文,略有滞后)](https://github.com/redisson/redisson/wiki/%E7%9B%AE%E5%BD%95)
  - [Redisson 官方文档(英文)](https://github.com/redisson/redisson/wiki/Table-of-Content)
  - [CRUG | Redisson PRO vs. Jedis: Which Is Faster? 翻译](https://www.jianshu.com/p/82f0d5abb002)
  - [redis 分布锁 Redisson 性能测试](https://blog.csdn.net/everlasting_188/article/details/51073505)
  - [RedisDesktopManager](https://github.com/uglide/RedisDesktopManager)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾
