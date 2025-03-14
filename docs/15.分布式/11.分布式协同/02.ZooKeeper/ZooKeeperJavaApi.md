---
title: ZooKeeperJavaApi
date: 2022-02-19 13:27:21
categories:
  - 分布式
  - 分布式协同
  - ZooKeeper
tags:
  - 分布式
  - 协同
  - zookeeper
permalink: /pages/029ebe41/
---

# ZooKeeper Java Api

> ZooKeeper 是 Apache 的顶级项目。**ZooKeeper 为分布式应用提供了高效且可靠的分布式协调服务，提供了诸如统一命名服务、配置管理和分布式锁等分布式的基础服务。在解决分布式数据一致性方面，ZooKeeper 并没有直接采用 Paxos 算法，而是采用了名为 ZAB 的一致性协议**。
>
> ZooKeeper 主要用来解决分布式集群中应用系统的一致性问题，它能提供基于类似于文件系统的目录节点树方式的数据存储。但是 ZooKeeper 并不是用来专门存储数据的，它的作用主要是用来**维护和监控存储数据的状态变化。通过监控这些数据状态的变化，从而可以达到基于数据的集群管理**。
>
> 很多大名鼎鼎的框架都基于 ZooKeeper 来实现分布式高可用，如：Dubbo、Kafka 等。
>
> ZooKeeper 官方支持 Java 和 C 的 Client API。ZooKeeper 社区为大多数语言（.NET，python 等）提供非官方 API。

## ZooKeeper 官方客户端

### ZooKeeper 客户端简介

客户端和服务端交互遵循以下基本步骤：

1. 客户端连接 ZooKeeper 服务端集群任意工作节点，该节点为客户端分配会话 ID。
2. 为了保持通信，客户端需要和服务端保持心跳（实质上就是 ping ）。否则，ZooKeeper 服务会话超时时间内未收到客户端请求，会将会话视为过期。这种情况下，客户端如果要通信，就需要重新连接。
3. 只要会话 ID 处于活动状态，就可以执行读写 znode 操作。
4. 所有任务完成后，客户端断开与 ZooKeeper 服务端集群的连接。如果客户端长时间不活动，则 ZooKeeper 集合将自动断开客户端。

ZooKeeper 官方客户端的核心是 **`ZooKeeper` 类**。它在其构造函数中提供了连接 ZooKeeper 服务的配置选项，并提供了访问 ZooKeeper 数据的方法。

> 其主要操作如下：
>
> - **`connect`** - 连接 ZooKeeper 服务
> - **`create`** - 创建 znode
> - **`exists`** - 检查 znode 是否存在及其信息
> - **`getACL`** / **`setACL`**- 获取/设置一个 znode 的 ACL
> - **`getData`** / **`setData`**- 获取/设置一个 znode 的数据
> - **`getChildren`** - 获取特定 znode 中的所有子节点
> - **`delete`** - 删除特定的 znode 及其所有子项
> - **`close`** - 关闭连接

ZooKeeper 官方客户端的使用方法是在 maven 项目的 pom.xml 中添加：

```xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.7.0</version>
</dependency>
```

### 创建连接

ZooKeeper 类通过其构造函数提供连接 ZooKeeper 服务的功能。其构造函数的定义如下：

```java
ZooKeeper(String connectionString, int sessionTimeout, Watcher watcher)
```

> 参数说明：
>
> - **`connectionString`** - ZooKeeper 集群的主机列表。
> - **`sessionTimeout`** - 会话超时时间（以毫秒为单位）。
> - **watcher** - 实现监视机制的回调。当被监控的 znode 状态发生变化时，ZooKeeper 服务端的 `WatcherManager` 会主动调用传入的 Watcher ，推送状态变化给客户端。

【示例】连接 ZooKeeper

```java
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;
import org.junit.jupiter.api.*;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

/**
 * ZooKeeper 官方客户端测试例
 *
 * @author <a href="mailto:forbreak@163.com">Zhang Peng</a>
 * @since 2022-02-19
 */
@DisplayName("ZooKeeper 官方客户端测试例")
public class ZooKeeperTest {

    /**
     * ZooKeeper 连接实例
     */
    private static ZooKeeper zk;

    /**
     * 创建 ZooKeeper 连接
     */
    @BeforeAll
    public static void init() throws IOException, InterruptedException {
        final String HOST = "localhost:2181";
        CountDownLatch latch = new CountDownLatch(1);
        zk = new ZooKeeper(HOST, 5000, watcher -> {
            if (watcher.getState() == Watcher.Event.KeeperState.SyncConnected) {
                latch.countDown();
            }
        });
        latch.await();
    }

    /**
     * 关闭 ZooKeeper 连接
     */
    @AfterAll
    public static void destroy() throws InterruptedException {
        if (zk != null) {
            zk.close();
        }
    }

    /**
     * 建立连接
     */
    @Test
    public void getState() {
        ZooKeeper.States state = zk.getState();
        Assertions.assertTrue(state.isAlive());
    }

}
```

> 说明：
>
> 添加一个 `connect` 方法，用于创建一个 `ZooKeeper` 对象，用于连接到 ZooKeeper 服务。
>
> 这里 `CountDownLatch` 用于停止（等待）主进程，直到客户端与 ZooKeeper 集合连接。
>
> `ZooKeeper` 对象通过监听器回调来监听连接状态。一旦客户端与 ZooKeeper 建立连接，监听器回调就会被调用；并且监听器回调函数调用 `CountDownLatch` 的 `countDown` 方法来释放锁，在主进程中 `await`。

### 节点增删改查

#### 判断节点是否存在

ZooKeeper 类提供了 `exists` 方法来检查 znode 的存在。如果指定的 znode 存在，则返回一个 znode 的元数据。

`exists` 方法的签名如下：

```
exists(String path, boolean watcher)
```

- **path**- Znode 路径
- **watcher** - 布尔值，用于指定是否监视指定的 znode

【示例】

```java
Stat stat = zk.exists("/", true);
Assertions.assertNotNull(stat);
```

#### 创建节点

`ZooKeeper` 类的 `create` 方法用于在 ZooKeeper 中创建一个新节点（znode）。

`create` 方法的签名如下：

```
create(String path, byte[] data, List<ACL> acl, CreateMode createMode)
```

- **path** - Znode 路径。例如，/myapp1，/myapp2，/myapp1/mydata1，myapp2/mydata1/myanothersubdata
- **data** - 要存储在指定 znode 路径中的数据
- **acl** - 要创建的节点的访问控制列表。ZooKeeper API 提供了一个静态接口 **ZooDefs.Ids** 来获取一些基本的 acl 列表。例如，ZooDefs.Ids.OPEN_ACL_UNSAFE 返回打开 znode 的 acl 列表。
- **createMode** - 节点的类型，即临时，顺序或两者。这是一个**枚举**。

【示例】

```java
private static final String path = "/mytest";

String text = "My first zookeeper app";
zk.create(path, text.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
Stat stat = zk.exists(path, true);
Assertions.assertNotNull(stat);
```

#### 删除节点

ZooKeeper 类提供了 `delete` 方法来删除指定的 znode。

`delete` 方法的签名如下：

```
delete(String path, int version)
```

- **path** - Znode 路径。
- **version** - znode 的当前版本。

让我们创建一个新的 Java 应用程序来了解 ZooKeeper API 的 **delete** 功能。创建文件 **ZKDelete.java** 。在 main 方法中，使用 **ZooKeeperConnection** 对象创建一个 ZooKeeper 对象 **zk** 。然后，使用指定的路径和版本号调用 **zk** 对象的 **delete** 方法。

删除 znode 的完整程序代码如下：

【示例】

```java
zk.delete(path, zk.exists(path, true).getVersion());
Stat stat = zk.exists(path, true);
Assertions.assertNull(stat);
```

#### 获取节点数据

ZooKeeper 类提供 **getData** 方法来获取附加在指定 znode 中的数据及其状态。 **getData** 方法的签名如下：

```
getData(String path, Watcher watcher, Stat stat)
```

- **path** - Znode 路径。
- **watcher** - 监听器类型的回调函数。当指定的 znode 的数据改变时，ZooKeeper 集合将通过监听器回调进行通知。这是一次性通知。
- **stat** - 返回 znode 的元数据。

【示例】

```java
byte[] data = zk.getData(path, false, null);
String text1 = new String(data);
Assertions.assertEquals(text, text1);
System.out.println(text1);
```

#### 设置节点数据

ZooKeeper 类提供 **setData** 方法来修改指定 znode 中附加的数据。 **setData** 方法的签名如下：

```
setData(String path, byte[] data, int version)
```

- **path**- Znode 路径
- **data** - 要存储在指定 znode 路径中的数据。
- **version**- znode 的当前版本。每当数据更改时，ZooKeeper 会更新 znode 的版本号。

【示例】

```java
String text = "含子节点的节点";
zk.create(path, text.getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
zk.create(path + "/1", "1".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
zk.create(path + "/2", "1".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
List<String> actualList = zk.getChildren(path, false);
for (String child : actualList) {
    System.out.println(child);
}
```

#### 获取子节点

ZooKeeper 类提供 **getChildren** 方法来获取特定 znode 的所有子节点。 **getChildren** 方法的签名如下：

```
getChildren(String path, Watcher watcher)
```

- **path** - Znode 路径。
- **watcher** - 监听器类型的回调函数。当指定的 znode 被删除或 znode 下的子节点被创建/删除时，ZooKeeper 集合将进行通知。这是一次性通知。

【示例】

```java
@Test
public void getChildren() throws InterruptedException, KeeperException {
    byte[] data = "My first zookeeper app".getBytes();
    zk.create(path, data, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    zk.create(path + "/1", "1".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    zk.create(path + "/2", "1".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    List<String> actualList = zk.getChildren(path, false);
    List<String> expectedList = CollectionUtil.newArrayList("1", "2");
    Assertions.assertTrue(CollectionUtil.containsAll(expectedList, actualList));
    for (String child : actualList) {
        System.out.println(child);
    }
}
```

## Curator 客户端

### Curator 客户端简介

Curator 客户端的使用方法是在 maven 项目的 pom.xml 中添加：

```xml
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.1.0</version>
</dependency>
```

### 创建连接

```java
import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.imps.CuratorFrameworkState;
import org.apache.curator.retry.RetryNTimes;
import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.ZooDefs;
import org.junit.jupiter.api.*;

import java.nio.charset.StandardCharsets;

public class CuratorTest {

    /**
     * Curator ZooKeeper 连接实例
     */
    private static CuratorFramework client = null;
    private static final String path = "/mytest";

    /**
     * 创建连接
     */
    @BeforeAll
    public static void init() {
        // 重试策略
        RetryPolicy retryPolicy = new RetryNTimes(3, 5000);
        client = CuratorFrameworkFactory.builder()
                                        .connectString("localhost:2181")
                                        .sessionTimeoutMs(10000).retryPolicy(retryPolicy)
                                        .namespace("workspace").build();  //指定命名空间后，client 的所有路径操作都会以 /workspace 开头
        client.start();
    }

    /**
     * 关闭连接
     */
    @AfterAll
    public static void destroy() {
        if (client != null) {
            client.close();
        }
    }

}
```

### 节点增删改查

#### 判断节点是否存在

```java
Stat stat = client.checkExists().forPath(path);
Assertions.assertNull(stat);
```

#### 判读服务状态

```java
CuratorFrameworkState state = client.getState();
Assertions.assertEquals(CuratorFrameworkState.STARTED, state);
```

#### 创建节点

```java
// 创建节点
String text = "Hello World";
client.create().creatingParentsIfNeeded()
      .withMode(CreateMode.PERSISTENT)      //节点类型
      .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
      .forPath(path, text.getBytes(StandardCharsets.UTF_8));
```

#### 删除节点

```java
client.delete()
      .guaranteed()                     // 如果删除失败，会继续执行，直到成功
      .deletingChildrenIfNeeded()       // 如果有子节点，则递归删除
      .withVersion(stat.getVersion())   // 传入版本号，如果版本号错误则拒绝删除操作，并抛出 BadVersion 异常
      .forPath(path);
```

#### 获取节点数据

```java
byte[] data = client.getData().forPath(path);
Assertions.assertEquals(text, new String(data));
System.out.println("修改前的节点数据：" + new String(data));
```

#### 设置节点数据

```java
String text2 = "try again";
client.setData()
      .withVersion(client.checkExists().forPath(path).getVersion())
      .forPath(path, text2.getBytes(StandardCharsets.UTF_8));
```

#### 获取子节点

```java
List<String> children = client.getChildren().forPath(path);
for (String s : children) {
    System.out.println(s);
}
List<String> expectedList = CollectionUtil.newArrayList("1", "2");
Assertions.assertTrue(CollectionUtil.containsAll(expectedList, children));
```

### 监听事件

#### 创建一次性监听

和 Zookeeper 原生监听一样，使用 `usingWatcher` 注册的监听是一次性的，即监听只会触发一次，触发后就销毁。

【示例】

```java
// 设置监听器
client.getData().usingWatcher(new CuratorWatcher() {
    public void process(WatchedEvent event) {
        System.out.println("节点 " + event.getPath() + " 发生了事件：" + event.getType());
    }
}).forPath(path);

// 第一次修改
client.setData()
      .withVersion(client.checkExists().forPath(path).getVersion())
      .forPath(path, "第一次修改".getBytes(StandardCharsets.UTF_8));

// 第二次修改
client.setData()
      .withVersion(client.checkExists().forPath(path).getVersion())
      .forPath(path, "第二次修改".getBytes(StandardCharsets.UTF_8));
```

输出

```
节点 /mytest 发生了事件：NodeDataChanged
```

说明

修改两次数据，但是监听器只会监听第一次修改。

#### 创建永久监听

Curator 还提供了创建永久监听的 API，其使用方式如下：

```java
// 设置监听器
CuratorCache curatorCache = CuratorCache.builder(client, path).build();
PathChildrenCacheListener pathChildrenCacheListener = new PathChildrenCacheListener() {
    @Override
    public void childEvent(CuratorFramework framework, PathChildrenCacheEvent event) throws Exception {
        System.out.println("节点 " + event.getData().getPath() + " 发生了事件：" + event.getType());
    }
};
CuratorCacheListener listener = CuratorCacheListener.builder()
                                                    .forPathChildrenCache(path, client,
                                                        pathChildrenCacheListener)
                                                    .build();
curatorCache.listenable().addListener(listener);
curatorCache.start();

// 第一次修改
client.setData()
      .withVersion(client.checkExists().forPath(path).getVersion())
      .forPath(path, "第一次修改".getBytes(StandardCharsets.UTF_8));

// 第二次修改
client.setData()
      .withVersion(client.checkExists().forPath(path).getVersion())
      .forPath(path, "第二次修改".getBytes(StandardCharsets.UTF_8));
```

#### 监听子节点

这里以监听 `/hadoop` 下所有子节点为例，实现方式如下：

```java
// 创建节点
String text = "Hello World";
client.create().creatingParentsIfNeeded()
      .withMode(CreateMode.PERSISTENT)      //节点类型
      .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
      .forPath(path, text.getBytes(StandardCharsets.UTF_8));
client.create().creatingParentsIfNeeded()
      .withMode(CreateMode.PERSISTENT)      //节点类型
      .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
      .forPath(path + "/1", text.getBytes(StandardCharsets.UTF_8));
client.create().creatingParentsIfNeeded()
      .withMode(CreateMode.PERSISTENT)      //节点类型
      .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
      .forPath(path + "/2", text.getBytes(StandardCharsets.UTF_8));

// 设置监听器
// 第三个参数代表除了节点状态外，是否还缓存节点内容
PathChildrenCache childrenCache = new PathChildrenCache(client, path, true);
/*
 * StartMode 代表初始化方式:
 *    NORMAL: 异步初始化
 *    BUILD_INITIAL_CACHE: 同步初始化
 *    POST_INITIALIZED_EVENT: 异步并通知,初始化之后会触发 INITIALIZED 事件
 */
childrenCache.start(PathChildrenCache.StartMode.POST_INITIALIZED_EVENT);

List<ChildData> childDataList = childrenCache.getCurrentData();
System.out.println("当前数据节点的子节点列表：");
childDataList.forEach(x -> System.out.println(x.getPath()));

childrenCache.getListenable().addListener(new PathChildrenCacheListener() {
    public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) {
        switch (event.getType()) {
            case INITIALIZED:
                System.out.println("childrenCache 初始化完成");
                break;
            case CHILD_ADDED:
                // 需要注意的是: 即使是之前已经存在的子节点，也会触发该监听，因为会把该子节点加入 childrenCache 缓存中
                System.out.println("增加子节点:" + event.getData().getPath());
                break;
            case CHILD_REMOVED:
                System.out.println("删除子节点:" + event.getData().getPath());
                break;
            case CHILD_UPDATED:
                System.out.println("被修改的子节点的路径:" + event.getData().getPath());
                System.out.println("修改后的数据:" + new String(event.getData().getData()));
                break;
        }
    }
});

// 第一次修改
client.setData()
      .forPath(path + "/1", "第一次修改".getBytes(StandardCharsets.UTF_8));

// 第二次修改
client.setData()
      .forPath(path + "/1", "第二次修改".getBytes(StandardCharsets.UTF_8));
```

### ACL 权限管理

```java
public class AclOperation {

    private CuratorFramework client = null;
    private static final String zkServerPath = "192.168.0.226:2181";
    private static final String nodePath = "/mytest/hdfs";

    @Before
    public void prepare() {
        RetryPolicy retryPolicy = new RetryNTimes(3, 5000);
        client = CuratorFrameworkFactory.builder()
                .authorization("digest", "heibai:123456".getBytes()) //等价于 addauth 命令
                .connectString(zkServerPath)
                .sessionTimeoutMs(10000).retryPolicy(retryPolicy)
                .namespace("workspace").build();
        client.start();
    }

    /**
     * 新建节点并赋予权限
     */
    @Test
    public void createNodesWithAcl() throws Exception {
        List<ACL> aclList = new ArrayList<>();
        // 对密码进行加密
        String digest1 = DigestAuthenticationProvider.generateDigest("heibai:123456");
        String digest2 = DigestAuthenticationProvider.generateDigest("ying:123456");
        Id user01 = new Id("digest", digest1);
        Id user02 = new Id("digest", digest2);
        // 指定所有权限
        aclList.add(new ACL(Perms.ALL, user01));
        // 如果想要指定权限的组合，中间需要使用 | ,这里的|代表的是位运算中的 按位或
        aclList.add(new ACL(Perms.DELETE | Perms.CREATE, user02));

        // 创建节点
        byte[] data = "abc".getBytes();
        client.create().creatingParentsIfNeeded()
                .withMode(CreateMode.PERSISTENT)
                .withACL(aclList, true)
                .forPath(nodePath, data);
    }


    /**
     * 给已有节点设置权限,注意这会删除所有原来节点上已有的权限设置
     */
    @Test
    public void SetAcl() throws Exception {
        String digest = DigestAuthenticationProvider.generateDigest("admin:admin");
        Id user = new Id("digest", digest);
        client.setACL()
                .withACL(Collections.singletonList(new ACL(Perms.READ | Perms.DELETE, user)))
                .forPath(nodePath);
    }

    /**
     * 获取权限
     */
    @Test
    public void getAcl() throws Exception {
        List<ACL> aclList = client.getACL().forPath(nodePath);
        ACL acl = aclList.get(0);
        System.out.println(acl.getId().getId()
                           + "是否有删读权限:" + (acl.getPerms() == (Perms.READ | Perms.DELETE)));
    }

    @After
    public void destroy() {
        if (client != null) {
            client.close();
        }
    }
}
```

## 参考资料

- **官方**
  - [ZooKeeper 官网](http://zookeeper.apache.org/)
  - [ZooKeeper 官方文档](https://cwiki.apache.org/confluence/display/ZOOKEEPER)
  - [ZooKeeper Github](https://github.com/apache/zookeeper)
- **书籍**
  - [《Hadoop 权威指南（第四版）》](https://book.douban.com/subject/27115351/)
- **文章**
  - [分布式服务框架 ZooKeeper -- 管理分布式环境中的数据](https://www.ibm.com/developerworks/cn/opensource/os-cn-zookeeper/index.html)
  - [ZooKeeper 的功能以及工作原理](https://www.cnblogs.com/felixzh/p/5869212.html)
  - [ZooKeeper 简介及核心概念](https://github.com/heibaiying/BigData-Notes/blob/master/notes/ZooKeeper%E7%AE%80%E4%BB%8B%E5%8F%8A%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.md)
  - [详解分布式协调服务 ZooKeeper](https://draveness.me/zookeeper-chubby)
  - [深入浅出 Zookeeper（一） Zookeeper 架构及 FastLeaderElection 机制](http://www.jasongj.com/zookeeper/fastleaderelection/)