---
title: ZooKeeper命令
date: 2022-02-19 13:27:21
categories:
  - 分布式
  - 分布式协同
  - ZooKeeper
tags:
  - 分布式
  - 协同
  - zookeeper
permalink: /pages/bd3b7203/
---

# ZooKeeper 命令

> ZooKeeper 命令用于在 ZooKeeper 服务上执行操作。

## 启动服务和启动命令行

```bash
# 启动服务
bin/zkServer.sh start

# 启动命令行，不指定服务地址则默认连接到localhost:2181
bin/zkCli.sh -server hadoop001:2181
```

## 查看节点列表

### `ls` 命令

`ls` 命令用于查看某个路径下目录列表。

【语法】

```bash
ls path
```

> 说明：
>
> - **path**：代表路径。

【示例】

```
[zk: localhost:2181(CONNECTED) 0] ls /
[cluster, controller_epoch, brokers, storm, zookeeper, admin,  ...]
```

### `ls2` 命令

`ls2` 命令用于查看某个路径下目录列表，它比 ls 命令列出更多的详细信息。

【语法】

```bash
ls2 path
```

> 说明：
>
> - **path**：代表路径。

【示例】

```bash
[zk: localhost:2181(CONNECTED) 1] ls2 /
[cluster, controller_epoch, brokers, storm, zookeeper, admin, ....]
cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x130
cversion = 19
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 11
```

## 节点的增删改查

### `get` 命令

`get` 命令用于获取节点数据和状态信息。

【语法】

```
get path [watch]
```

> 说明：
>
> - **path**：代表路径。
> - **[watch]**：对节点进行事件监听。

【示例】

```bash
[zk: localhost:2181(CONNECTED) 31] get /hadoop
123456   #节点数据
cZxid = 0x14b
ctime = Fri May 24 17:03:06 CST 2019
mZxid = 0x14b
mtime = Fri May 24 17:03:06 CST 2019
pZxid = 0x14b
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 0
```

> 说明：
>
> 节点各个属性如下表。其中一个重要的概念是 Zxid(ZooKeeper Transaction Id)，ZooKeeper 节点的每一次更改都具有唯一的 Zxid，如果 Zxid1 小于 Zxid2，则 Zxid1 的更改发生在 Zxid2 更改之前。
>
> | **状态属性**   | **说明**                                                                                   |
> | -------------- | ------------------------------------------------------------------------------------------ |
> | cZxid          | 数据节点创建时的事务 ID                                                                    |
> | ctime          | 数据节点创建时的时间                                                                       |
> | mZxid          | 数据节点最后一次更新时的事务 ID                                                            |
> | mtime          | 数据节点最后一次更新时的时间                                                               |
> | pZxid          | 数据节点的子节点最后一次被修改时的事务 ID                                                  |
> | cversion       | 子节点的更改次数                                                                           |
> | dataVersion    | 节点数据的更改次数                                                                         |
> | aclVersion     | 节点的 ACL 的更改次数                                                                      |
> | ephemeralOwner | 如果节点是临时节点，则表示创建该节点的会话的 SessionID；如果节点是持久节点，则该属性值为 0 |
> | dataLength     | 数据内容的长度                                                                             |
> | numChildren    | 数据节点当前的子节点个数                                                                   |

### `stat` 命令

`stat` 命令用于查看节点状态信息。它的返回值和 `get` 命令类似，但不会返回节点数据。

【语法】

```
stat path [watch]
```

- **path**：代表路径。
- **[watch]**：对节点进行事件监听。

【示例】

```bash
[zk: localhost:2181(CONNECTED) 32] stat /hadoop
cZxid = 0x14b
ctime = Fri May 24 17:03:06 CST 2019
mZxid = 0x14b
mtime = Fri May 24 17:03:06 CST 2019
pZxid = 0x14b
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 0
```

### `create` 命令

`create` 命令用于创建节点并赋值。

【语法】

```bash
create [-s] [-e] path data acl
```

> 说明：
>
> - **[-s][-e]**：-s 和 -e 都是可选的，-s 代表顺序节点，-e 代表临时节点，注意其中 -s 和 -e 可以同时使用的，并且临时节点不能再创建子节点。
>   - 默认情况下，所有 znode 都是持久的。
>   - 顺序节点保证 znode 路径将是唯一的。
>   - 临时节点会在会话过期或客户端断开连接时被自动删除。
> - **path**：指定要创建节点的路径，比如 **/hadoop**。
> - **data**：要在此节点存储的数据。
> - **acl**：访问权限相关，默认是 world，相当于全世界都能访问。

【示例】创建持久节点

```bash
[zk: localhost:2181(CONNECTED) 4] create /hadoop 123456
Created /hadoop
```

【示例】创建有序节点，此时创建的节点名为指定节点名 + 自增序号：

```bash
[zk: localhost:2181(CONNECTED) 23] create -s /a  "aaa"
Created /a0000000022
[zk: localhost:2181(CONNECTED) 24] create -s /b  "bbb"
Created /b0000000023
[zk: localhost:2181(CONNECTED) 25] create -s /c  "ccc"
Created /c0000000024
```

【示例】创建临时节点：

```bash
[zk: localhost:2181(CONNECTED) 26] create -e /tmp  "tmp"
Created /tmp
```

### `set` 命令

`set` 命令用于修改节点存储的数据。

【语法】

```
set path data [version]
```

> 说明：
>
> - **path**：节点路径。
> - **data**：需要存储的数据。
> - **[version]**：可选项，版本号(可用作乐观锁)。

【示例】

```bash
[zk: localhost:2181(CONNECTED) 33] set /hadoop 345
cZxid = 0x14b
ctime = Fri May 24 17:03:06 CST 2019
mZxid = 0x14c
mtime = Fri May 24 17:13:05 CST 2019
pZxid = 0x14b
cversion = 0
dataVersion = 1  # 注意更改后此时版本号为 1，默认创建时为 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 3
numChildren = 0
```

也可以基于版本号进行更改，此时类似于乐观锁机制，当你传入的数据版本号 (dataVersion) 和当前节点的数据版本号不符合时，zookeeper 会拒绝本次修改：

```bash
[zk: localhost:2181(CONNECTED) 34] set /hadoop 678 0
version No is not valid : /hadoop    #无效的版本号
```

### `delete` 命令

`delete` 命令用于删除某节点。

【语法】

```
delete path [version]
```

> 说明：
>
> - **path**：节点路径。
> - **[version]**：可选项，版本号（同 set 命令）。和更新节点数据一样，也可以传入版本号，当你传入的数据版本号 (dataVersion) 和当前节点的数据版本号不符合时，zookeeper 不会执行删除操作。

【示例】

```bash
[zk: localhost:2181(CONNECTED) 36] delete /hadoop 0
version No is not valid : /hadoop   #无效的版本号
[zk: localhost:2181(CONNECTED) 37] delete /hadoop 1
[zk: localhost:2181(CONNECTED) 38]
```

`delete` 命令不能删除带有子节点的节点。如果想要删除节点及其子节点，可以使用 `deleteall path`

## 监听器

针对每个节点的操作，都会有一个监听者（watcher）。

- 当监听的某个对象（znode）发生了变化，则触发监听事件。
- zookeeper 中的监听事件是一次性的，触发后立即销毁。
- 父节点，子节点的增删改都能够触发其监听者（watcher）
- 针对不同类型的操作，触发的 watcher 事件也不同：
  - 父节点 Watcher 事件
    - 创建父节点触发：NodeCreated
    - 修改节点数据触发：NodeDatachanged
    - 删除节点数据触发：NodeDeleted
  - 子节点 Watcher 事件
    - 创建子节点触发：NodeChildrenChanged
    - 删除子节点触发：NodeChildrenChanged
    - 修改子节点不触发事件

### get path

使用 `get path -w` 注册的监听器能够在节点内容发生改变的时候，向客户端发出通知。需要注意的是 zookeeper 的触发器是一次性的 (One-time trigger)，即触发一次后就会立即失效。

```bash
[zk: localhost:2181(CONNECTED) 4] get /hadoop -w
[zk: localhost:2181(CONNECTED) 5] set /hadoop 45678
WATCHER::
WatchedEvent state:SyncConnected type:NodeDataChanged path:/hadoop  #节点值改变
```

> get path [watch] 在当前版本已废弃

### stat path

使用 `stat path -w` 注册的监听器能够在节点状态发生改变的时候，向客户端发出通知。

```bash
[zk: localhost:2181(CONNECTED) 7] stat path -w
[zk: localhost:2181(CONNECTED) 8] set /hadoop 112233
WATCHER::
WatchedEvent state:SyncConnected type:NodeDataChanged path:/hadoop  #节点值改变
```

> stat path [watch] 在当前版本已废弃

### ls\ls2 path

使用 `ls path -w` 或 `ls2 path -w` 注册的监听器能够监听该节点下所有**子节点**的增加和删除操作。

```bash
[zk: localhost:2181(CONNECTED) 9] ls /hadoop -w
[]
[zk: localhost:2181(CONNECTED) 10] create  /hadoop/yarn "aaa"
WATCHER::
WatchedEvent state:SyncConnected type:NodeChildrenChanged path:/hadoop
```

> ls path [watch] 和 ls2 path [watch] 在当前版本已废弃

## 辅助命令

使用 `help` 可以查看所有命令帮助信息。

使用 `history` 可以查看最近 10 条历史记录。

## zookeeper 四字命令

| 命令 | 功能描述                                                                                                                    |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| conf | 打印服务配置的详细信息。                                                                                                    |
| cons | 列出连接到此服务器的所有客户端的完整连接/会话详细信息。包括接收/发送的数据包数量，会话 ID，操作延迟，上次执行的操作等信息。 |
| dump | 列出未完成的会话和临时节点。这只适用于 Leader 节点。                                                                        |
| envi | 打印服务环境的详细信息。                                                                                                    |
| ruok | 测试服务是否处于正确状态。如果正确则返回“imok”，否则不做任何相应。                                                          |
| stat | 列出服务器和连接客户端的简要详细信息。                                                                                      |
| wchs | 列出所有 watch 的简单信息。                                                                                                 |
| wchc | 按会话列出服务器 watch 的详细信息。                                                                                         |
| wchp | 按路径列出服务器 watch 的详细信息。                                                                                         |

> 更多四字命令可以参阅官方文档：[https://zookeeper.apache.org/doc/current/zookeeperAdmin.html](https://zookeeper.apache.org/doc/current/zookeeperAdmin.html)

使用前需要使用 `yum install nc` 安装 nc 命令，使用示例如下：

```bash
[root@hadoop001 bin]# echo stat | nc localhost 2181
Zookeeper version: 3.4.13-2d71af4dbe22557fda74f9a9b4309b15a7487f03,
built on 06/29/2018 04:05 GMT
Clients:
 /0:0:0:0:0:0:0:1:50584[1](queued=0,recved=371,sent=371)
 /0:0:0:0:0:0:0:1:50656[0](queued=0,recved=1,sent=0)
Latency min/avg/max: 0/0/19
Received: 372
Sent: 371
Connections: 2
Outstanding: 0
Zxid: 0x150
Mode: standalone
Node count: 167
```

## 参考资料

- [Zookeeper 客户端基础命令使用](https://www.runoob.com/w3cnote/zookeeper-bs-command.html)