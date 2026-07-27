---
title: 《极客时间教程 - Java 并发编程实战》笔记四
date: 2024-08-30 08:02:52
categories:
  - 笔记
  - Java
tags:
  - Java
  - 并发
permalink: /pages/898948ad/
---

# 《极客时间教程 - Java 并发编程实战》笔记四

## 案例分析（一）：高性能限流器 Guava RateLimiter

**Guava RateLimiter**：Google 开源的限流工具类，基于**令牌桶算法**实现。

```java
//限流器流速：2 个请求/秒
RateLimiter limiter = RateLimiter.create(2.0);
//执行任务的线程池
ExecutorService es = Executors.newFixedThreadPool(1);
//记录上一次执行时间
prev = System.nanoTime();
//测试执行 20 次
for (int i = 0; i < 20; i++) {
    //限流器限流
    limiter.acquire();
    //提交任务异步执行
    es.execute(() -> {
        long cur = System.nanoTime();
        //打印时间间隔：毫秒
        System.out.println((cur - prev) / 1000_000);
        prev = cur;
    });
}

// 输出结果：
// ...
// 500
// 499
// 500
// 499
```

### 经典限流算法：令牌桶算法

**核心规则**：请求通过限流器的前提是拿到令牌。

1. 令牌以固定速率添加到桶中（速率 r/秒，每 1/r 秒添加一个）
2. 桶容量为 b（**burst**，最大突发流量），满则丢弃新令牌
3. 请求需桶中有令牌才能通过

### Guava 如何实现令牌桶算法

关键：**记录并动态计算下一令牌发放时间**。

假设 b=1，r=1个/秒。T1 在第 2 秒请求令牌（下一令牌在第 3 秒），需等待 1 秒，且下一令牌时间后移：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/d3d3eedd362b44cca2f4cc66df04110d.png)

T1 预占令牌后，下一令牌时间增加 1 秒：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/fc45f874ba334522a932f98a577216b1.png)

T2 紧随其后请求，需等待到第 4 秒：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/4e1d438863ad4711b142967ebd590ee8.png)

T2 预占后，下一令牌时间继续后移：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/873027124abd4a2293bbd9c26f1c1424.png)

若请求时间在**下一令牌产生时间之后**（如第 7 秒 T3 请求）：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/68df48fca8fb4adc873ce02f19c090f9.png)

T3 可直接拿到令牌（桶中已有令牌）。b=1 时多余令牌被丢弃，下一令牌时间重置为第 8 秒：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/3ddee97a93584693a66eb98507d5a701.png)

**核心结论**：只需记录下一令牌产生时间并动态更新即可完成限流。**`reserve()` 方法**为线程预分配令牌并返回获取时间：
- 请求时间在下一令牌产生时间**之后** → 立刻获取
- 请求时间在下一令牌产生时间**之前** → 在下一令牌时间获取，并后移 `interval`

```java
class SimpleLimiter {

    //下一令牌产生时间
    long next = System.nanoTime();
    //发放令牌间隔：纳秒
    long interval = 1000_000_000;

    //预占令牌，返回能够获取令牌的时间
    synchronized long reserve(long now) {
        //请求时间在下一令牌产生时间之后
        //重新计算下一令牌产生时间
        if (now > next) {
            //将下一令牌产生时间重置为当前时间
            next = now;
        }
        //能够获取令牌的时间
        long at = next;
        //设置下一令牌产生时间
        next += interval;
        //返回线程需要等待的时间
        return Math.max(at, 0L);
    }

    //申请令牌
    void acquire() {
        //申请令牌时的时间
        long now = System.nanoTime();
        //预占令牌
        long at = reserve(now);
        long waitTime = max(at - now, 0);
        //按照条件等待
        if (waitTime > 0) {
            try {
                TimeUnit.NANOSECONDS.sleep(waitTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

b>1 时，增加 **`resync()` 方法**按需计算桶中令牌数（**公式：`(now-next)/interval`**），`reserve()` 优先从桶中出令牌（此时 `next` 无需增加 `interval`）：

```java
class SimpleLimiter {

    //当前令牌桶中的令牌数量
    long storedPermits = 0;
    //令牌桶的容量
    long maxPermits = 3;
    //下一令牌产生时间
    long next = System.nanoTime();
    //发放令牌间隔：纳秒
    long interval = 1000_000_000;

    //请求时间在下一令牌产生时间之后，则
    // 1. 重新计算令牌桶中的令牌数
    // 2. 将下一个令牌发放时间重置为当前时间
    void resync(long now) {
        if (now > next) {
            //新产生的令牌数
            long newPermits = (now - next) / interval;
            //新令牌增加到令牌桶
            storedPermits = min(maxPermits, storedPermits + newPermits);
            //将下一个令牌发放时间重置为当前时间
            next = now;
        }
    }

    //预占令牌，返回能够获取令牌的时间
    synchronized long reserve(long now) {
        resync(now);
        //能够获取令牌的时间
        long at = next;
        //令牌桶中能提供的令牌
        long fb = min(1, storedPermits);
        //令牌净需求：首先减掉令牌桶中的令牌
        long nr = 1 - fb;
        //重新计算下一令牌产生时间
        next = next + nr * interval;
        //重新计算令牌桶中的令牌
        this.storedPermits -= fb;
        return at;
    }

    //申请令牌
    void acquire() {
        //申请令牌时的时间
        long now = System.nanoTime();
        //预占令牌
        long at = reserve(now);
        long waitTime = max(at - now, 0);
        //按照条件等待
        if (waitTime > 0) {
            try {
                TimeUnit.NANOSECONDS.sleep(waitTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 总结

经典限流算法对比：

- **令牌桶算法（Token Bucket）**：定时发放令牌，请求需拿到令牌才能通过
- **漏桶算法（Leaky Bucket）**：请求如水注入漏桶，按固定速率流出，桶满则拒绝新请求

## 案例分析（二）：高性能网络应用框架 Netty

### 网络编程性能的瓶颈

**BIO 模型**：`read()`/`write()` 均阻塞线程，**每个 socket 需分配独立线程**避免相互影响。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/b72e0f19f6414d5d8526669a207a272d.png)

BIO 无法支撑百万连接：互联网场景连接多但请求不频繁，线程大部分时间阻塞在 I/O 等待上，创建百万线程不现实。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/93f73d78313e4a9486464ba1d7569bba.png)

### Reactor 模式

Reactor 模式核心组件：

- **Handle**：I/O 句柄（Java 中即网络连接）
- **Event Handler**：事件处理器，处理一个 I/O Handle
- **Synchronous Event Demultiplexer**：I/O 多路复用 API（如 `select()`、`epoll()`）

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/5995a45408124e67b4ab45490100c2b6.png)

**Reactor 类**核心方法：`register_handler()`/`remove_handler()` 注册/删除事件处理器；**`handle_events()`** 通过 `select()` 监听事件并分发处理：

```java
void Reactor::handle_events(){
  //通过同步事件多路选择器提供的
  //select() 方法监听网络事件
  select(handlers);
  //处理网络事件
  for(h in handlers){
    h.handle_event();
  }
}
// 在主程序中启动事件循环
while (true) {
  handle_events();
```

### Netty 中的线程模型

**EventLoop**（事件循环）= Reactor，负责监听网络事件并调用处理器。

关键关系：
- 网络连接 : EventLoop = 多 : 1（稳定）
- EventLoop : Java 线程 = 1 : 1
- **一个网络连接只对应一个 Java 线程** → 避免并发问题

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/c520d2c3c1704e978946d0f81af1a021.png)

**EventLoopGroup**：一组 EventLoop。实际使用创建两个：

- **bossGroup**：处理 TCP 连接请求（监听 1 个端口只需 1 个 EventLoop）
- **workerGroup**：处理读写请求（默认 `2*CPU核数` 个 EventLoop）
- 新连接通过**轮询算法**分配给 workerGroup 中的 EventLoop
- 事件处理器中**不能有阻塞操作**，否则导致大面积超时

### 用 Netty 实现 Echo 程序服务端

```java
//事件处理器
final EchoServerHandler serverHandler = new EchoServerHandler();
//boss 线程组
EventLoopGroup bossGroup = new NioEventLoopGroup(1);
//worker 线程组
EventLoopGroup workerGroup = new NioEventLoopGroup();
try {
    ServerBootstrap b = new ServerBootstrap();
    b.group(bossGroup, workerGroup)
     .channel(NioServerSocketChannel.class)
     .childHandler(new ChannelInitializer<SocketChannel>() {
         @Override
         public void initChannel(SocketChannel ch) {
             ch.pipeline().addLast(serverHandler);
         }
     });
    //bind 服务端端口
    ChannelFuture f = b.bind(9090).sync();
    f.channel().closeFuture().sync();
} finally {
    //终止工作线程组
    workerGroup.shutdownGracefully();
    //终止 boss 线程组
    bossGroup.shutdownGracefully();
}

//socket 连接处理器
class EchoServerHandler extends ChannelInboundHandlerAdapter {

    //处理读事件
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        ctx.write(msg);
    }

    //处理读完成事件
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }

    //处理异常事件
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
```

### 总结

Netty 线程模型：每个网络连接关联到一个线程，读写操作单线程执行，**避免并发问题**。同时优化了 `ByteBuffer`、支持零拷贝等。

## 案例分析（三）：高性能队列 Disruptor

**Disruptor**：高性能有界内存队列，广泛应用于 Log4j2、Spring Messaging、HBase、Storm 等。

高性能原因：

1. **RingBuffer 数据结构**：数组元素初始化时一次性全部创建，提升缓存命中率；对象循环利用，避免频繁 GC
2. **避免伪共享**：提升缓存利用率
3. **无锁算法**：避免加锁/解锁性能消耗
4. **批量消费**：消费者可无锁方式消费多个消息

使用方式：

- 自定义 Event（如 `LongEvent`）
- 构建 Disruptor 需指定队列大小 + `EventFactory`
- 消费通过 `handleEventsWith()` 注册处理器，发布通过 `publishEvent()`

  ```java
  // 自定义 Event
  class LongEvent {
    private long value;
    public void set(long value) {
      this.value = value;
    }
  }
  // 指定 RingBuffer 大小，
  // 必须是 2 的 N 次方
  int bufferSize = 1024;

  // 构建 Disruptor
  Disruptor<LongEvent> disruptor
    = new Disruptor<>(
      LongEvent::new,
      bufferSize,
      DaemonThreadFactory.INSTANCE);

  // 注册事件处理器
  disruptor.handleEventsWith(
    (event, sequence, endOfBatch) ->
      System.out.println("E: "+event));

  // 启动 Disruptor
  disruptor.start();

  // 获取 RingBuffer
  RingBuffer<LongEvent> ringBuffer
    = disruptor.getRingBuffer();
  // 生产 Event
  ByteBuffer bb = ByteBuffer.allocate(8);
  for (long l = 0; true; l++){
    bb.putLong(0, l);
    // 生产者生产消息
    ringBuffer.publishEvent(
      (event, sequence, buffer) ->
        event.set(buffer.getLong(0)), bb);
    Thread.sleep(1000);
  }
  ```

### RingBuffer 如何提升性能

`ArrayBlockingQueue` 每次 `add` 时创建新对象，内存地址不连续。Disruptor 的 RingBuffer **初始化时一次性创建所有元素**，内存地址连续。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/8b95aabd22f541f2a21def7a8d12d9c6.png)

```java
for (int i=0; i<bufferSize; i++){
  //entries[] 就是 RingBuffer 内部的数组
  //eventFactory 就是前面示例代码中传入的 LongEvent::new
  entries[BUFFER_PAD + i]
    = eventFactory.newInstance();
}
```

**内存地址连续的优势**：利用**空间局部性原理**，消费 E1 时 CPU 将相邻的 E2 也加载进 Cache，减少内存访问。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/ea8d4d7f8abc4b22bac66e7bc3f32a11.png)

此外，`publishEvent()` 不创建新 Event，而是通过 `event.set()` 修改已有 Event，**对象循环利用**，避免频繁 GC。

### 如何避免“伪共享”

**伪共享**：共享缓存行导致缓存无效。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/4846dc3bccb04866aa85f3104d9521cb.png)

解决方案：**缓存行填充**——每个变量前后各填充 56 字节，确保独占一个缓存行。Disruptor 中 `Sequence`、`RingBuffer` 等均使用此技术：

```java
//前：填充 56 字节
class LhsPadding{
    long p1, p2, p3, p4, p5, p6, p7;
}
class Value extends LhsPadding{
    volatile long value;
}
//后：填充 56 字节
class RhsPadding extends Value{
    long p9, p10, p11, p12, p13, p14, p15;
}
class Sequence extends RhsPadding{
  //省略实现
}
```

### Disruptor 中的无锁算法

**入队操作**：维护入队索引（`cursor`），出队索引由所有消费者的最小位置决定。核心逻辑：无空位则 `parkNanos(1)` 重试，有空位则 CAS 设置入队索引：

```java
//生产者获取 n 个写入位置
do {
  //cursor 类似于入队索引，指的是上次生产到这里
  current = cursor.get();
  //目标是在生产 n 个
  next = current + n;
  //减掉一个循环
  long wrapPoint = next - bufferSize;
  //获取上一次的最小消费位置
  long cachedGatingSequence = gatingSequenceCache.get();
  //没有足够的空余位置
  if (wrapPoint>cachedGatingSequence || cachedGatingSequence>current){
    //重新计算所有消费者里面的最小值位置
    long gatingSequence = Util.getMinimumSequence(
        gatingSequences, current);
    //仍然没有足够的空余位置，出让 CPU 使用权，重新执行下一循环
    if (wrapPoint > gatingSequence){
      LockSupport.parkNanos(1);
      continue;
    }
    //从新设置上一次的最小消费位置
    gatingSequenceCache.set(gatingSequence);
  } else if (cursor.compareAndSet(current, next)){
    //获取写入位置成功，跳出循环
    break;
  }
} while (true);
```

## 案例分析（四）：高性能数据库连接池 HiKariCP

**HiKariCP**：业界最快数据库连接池，Spring Boot 2.0 **默认连接池**。

### 什么是数据库连接池

连接池 = 池化数据库连接，避免频繁创建/销毁。服务端运行期持有连接，使用时从池中获取，用完归还：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/ad25cd5975c44bc88ad84b3f1e5b787b.png)

数据库操作步骤：

1. 获取连接 → 2. 创建 Statement → 3. 执行 SQL → 4. 获取结果 → 5-7. 释放 ResultSet/Statement/连接

```java
//数据库连接池配置
HikariConfig config = new HikariConfig();
config.setMinimumIdle(1);
config.setMaximumPoolSize(2);
config.setConnectionTestQuery("SELECT 1");
config.setDataSourceClassName("org.h2.jdbcx.JdbcDataSource");
config.addDataSourceProperty("url", "jdbc:h2:mem:test");
// 创建数据源
DataSource ds = new HikariDataSource(config);
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try {
  // 获取数据库连接
  conn = ds.getConnection();
  // 创建 Statement
  stmt = conn.createStatement();
  // 执行 SQL
  rs = stmt.executeQuery("select * from abc");
  // 获取结果
  while (rs.next()) {
    int id = rs.getInt(1);
    ......
  }
} catch(Exception e) {
   e.printStackTrace();
} finally {
  //关闭 ResultSet
  close(rs);
  //关闭 Statement
  close(stmt);
  //关闭 Connection
  close(conn);
}
//关闭资源
void close(AutoCloseable rs) {
  if (rs != null) {
    try {
      rs.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
```

HiKariCP 性能优化关键：微观上字节码级优化，宏观上依赖两个数据结构：**FastList** 和 **ConcurrentBag**。

### FastList 解决了哪些性能问题

Connection 关闭时需自动关闭所有 Statement，用 ArrayList 跟踪。问题：`remove()` 顺序查找，但 Statement 通常逆序关闭，查找效率低。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/eb407f6eab4046e39d40cf516c8edfd3.png)

**FastList 优化点**：

1. `remove()` 改为**逆序查找**（匹配逆序关闭习惯）
2. `get()` **无越界检查**（HiKariCP 保证不越界）

### ConcurrentBag 解决了哪些性能问题

简单实现：用两个阻塞队列（`idle` + `busy`），但高并发下锁争用影响性能。

```java
BlockingQueue<Connection> busy;
BlockingQueue<Connection> idle;
```

HiKariCP 自实现 **ConcurrentBag**，核心设计：用 `ThreadLocal` 避免部分并发问题。

四个关键属性：
- `sharedList`（`CopyOnWriteArrayList`）：共享队列
- `threadList`（`ThreadLocal`）：线程本地存储
- `waiters`（`AtomicInteger`）：等待线程数
- `handoffQueue`（`SynchronousQueue`）：连接分配工具

```java
//用于存储所有的数据库连接
CopyOnWriteArrayList<T> sharedList;
//线程本地存储中的数据库连接
ThreadLocal<List<Object>> threadList;
//等待数据库连接的线程数
AtomicInteger waiters;
//分配数据库连接的工具
SynchronousQueue<T> handoffQueue;
```

`add()`：加入 `sharedList`，若有等待线程则通过 `handoffQueue` 直接分配：

```java
//将空闲连接添加到队列
void add(final T bagEntry){
  //加入共享队列
  sharedList.add(bagEntry);
  //如果有等待连接的线程，
  //则通过 handoffQueue 直接分配给等待的线程
  while (waiters.get() > 0
    && bagEntry.getState() == STATE_NOT_IN_USE
    && !handoffQueue.offer(bagEntry)) {
      yield();
  }
}
```

`borrow()` 获取连接优先级：

1. **线程本地存储**空闲连接（CAS 防止重复分配）
2. **共享队列**空闲连接（CAS 防止重复分配）
3. 均无则通过 `handoffQueue` **等待**

```java
T borrow(long timeout, final TimeUnit timeUnit){
  // 先查看线程本地存储是否有空闲连接
  final List<Object> list = threadList.get();
  for (int i = list.size() - 1; i >= 0; i--) {
    final Object entry = list.remove(i);
    final T bagEntry = weakThreadLocals
      ? ((WeakReference<T>) entry).get()
      : (T) entry;
    //线程本地存储中的连接也可以被窃取，
    //所以需要用 CAS 方法防止重复分配
    if (bagEntry != null
      && bagEntry.compareAndSet(STATE_NOT_IN_USE, STATE_IN_USE)) {
      return bagEntry;
    }
  }

  // 线程本地存储中无空闲连接，则从共享队列中获取
  final int waiting = waiters.incrementAndGet();
  try {
    for (T bagEntry : sharedList) {
      //如果共享队列中有空闲连接，则返回
      if (bagEntry.compareAndSet(STATE_NOT_IN_USE, STATE_IN_USE)) {
        return bagEntry;
      }
    }
    //共享队列中没有连接，则需要等待
    timeout = timeUnit.toNanos(timeout);
    do {
      final long start = currentTime();
      final T bagEntry = handoffQueue.poll(timeout, NANOSECONDS);
      if (bagEntry == null
        || bagEntry.compareAndSet(STATE_NOT_IN_USE, STATE_IN_USE)) {
          return bagEntry;
      }
      //重新计算等待时间
      timeout -= elapsedNanos(start);
    } while (timeout > 10_000);
    //超时没有获取到连接，返回 null
    return null;
  } finally {
    waiters.decrementAndGet();
  }
}
```

`requite()` 释放连接：更新状态为 `STATE_NOT_IN_USE`，有等待线程则直接分配，否则存入线程本地存储：

```java
//释放连接
void requite(final T bagEntry){
  //更新连接状态
  bagEntry.setState(STATE_NOT_IN_USE);
  //如果有等待的线程，则直接分配给线程，无需进入任何队列
  for (int i = 0; waiters.get() > 0; i++) {
    if (bagEntry.getState() != STATE_NOT_IN_USE
      || handoffQueue.offer(bagEntry)) {
        return;
    } else if ((i & 0xff) == 0xff) {
      parkNanos(MICROSECONDS.toNanos(10));
    } else {
      yield();
    }
  }
  //如果没有等待的线程，则进入线程本地存储
  final List<Object> threadLocalList = threadList.get();
  if (threadLocalList.size() < 50) {
    threadLocalList.add(weakThreadLocals
      ? new WeakReference<>(bagEntry)
      : bagEntry);
  }
}
```

## Actor 模型：面向对象原生的并发模型

**Actor 模型**：所有计算都在 Actor 中执行，Actor 之间**完全隔离，不共享变量**，从根本上避免并发问题。Java 通过 **Akka** 库支持。

### Hello Actor 模型

```java
//该 Actor 当收到消息 message 后，
//会打印 Hello message
static class HelloActor
    extends UntypedActor {
  @Override
  public void onReceive(Object message) {
    System.out.println("Hello " + message);
  }
}

public static void main(String[] args) {
  //创建 Actor 系统
  ActorSystem system = ActorSystem.create("HelloSystem");
  //创建 HelloActor
  ActorRef helloActor =
    system.actorOf(Props.create(HelloActor.class));
  //发送消息给 HelloActor
  helloActor.tell("Actor", ActorRef.noSender());
}
```

### 消息和对象方法的区别

- **Actor 消息机制**：异步，内部有邮箱（Mailbox），单线程处理，类似单消费者生产者-消费者模式
- **对象方法调用**：同步，调用方等待 return
- **Actor 消息可跨进程/跨机器**，适用于分布式计算

### Actor 的规范化定义

Actor 包含三部分能力：

1. **处理能力**：处理接收到的消息
2. **存储能力**：存储内部状态，不同 Actor 间绝对隔离
3. **通信能力**：与其他 Actor 通信

接收消息后可做三件事：创建更多 Actor、发消息给其他 Actor、确定如何处理下一条消息。

### 用 Actor 实现累加器

CounterActor 内部持有累计值，接收数字则累加，否则打印结果。多线程生产消息，**无锁无 CAS，线程安全**：

```java
//累加器
static class CounterActor extends UntypedActor {
  private int counter = 0;
  @Override
  public void onReceive(Object message){
    //如果接收到的消息是数字类型，执行累加操作，
    //否则打印 counter 的值
    if (message instanceof Number) {
      counter += ((Number) message).intValue();
    } else {
      System.out.println(counter);
    }
  }
}
public static void main(String[] args) throws InterruptedException {
  //创建 Actor 系统
  ActorSystem system = ActorSystem.create("HelloSystem");
  //4 个线程生产消息
  ExecutorService es = Executors.newFixedThreadPool(4);
  //创建 CounterActor
  ActorRef counterActor =
    system.actorOf(Props.create(CounterActor.class));
  //生产 4*100000 个消息
  for (int i=0; i<4; i++) {
    es.execute(()->{
      for (int j=0; j<100000; j++) {
        counterActor.tell(1, ActorRef.noSender());
      }
    });
  }
  //关闭线程池
  es.shutdown();
  //等待 CounterActor 处理完所有消息
  Thread.sleep(1000);
  //打印结果
  counterActor.tell("", ActorRef.noSender());
  //关闭 Actor 系统
  system.shutdown();
}
```

## 软件事务内存：借鉴数据库的并发经验

**STM（Software Transactional Memory）**：借鉴数据库事务思想，支持 ACI（无持久化）。

### 用 STM 实现转账

`synchronized` 转账无法避免死锁。数据库事务方案简单：

```java
class UnsafeAccount {
  //余额
  private long balance;
  //构造函数
  public UnsafeAccount(long balance) {
    this.balance = balance;
  }
  //转账
  void transfer(UnsafeAccount target, long amt){
    if (this.balance > amt) {
      this.balance -= amt;
      target.balance += amt;
    }
  }
}
```

该转账操作若使用数据库事务就会非常简单，如下面的示例代码所示。如果所有 SQL 都正常执行，则通过 commit() 方法提交事务；如果 SQL 在执行过程中有异常，则通过 rollback() 方法回滚事务。数据库保证在并发情况下不会有死锁，而且还能保证前面我们说的原子性、一致性、隔离性和持久性，也就是 ACID。

```java
Connection conn = null;
try{
  //获取数据库连接
  conn = DriverManager.getConnection();
  //设置手动提交事务
  conn.setAutoCommit(false);
  //执行转账 SQL
  ......
  //提交事务
  conn.commit();
} catch (Exception e) {
  //出现异常回滚事务
  conn.rollback();
}
```

STM 方案（借助 [Multiverse](https://github.com/pveentjer/Multiverse)）：余额类型改为 `TxnLong`，转账操作放入 `atomic()` 即可：

```java
class Account{
  //余额
  private TxnLong balance;
  //构造函数
  public Account(long balance){
    this.balance = StmUtils.newTxnLong(balance);
  }
  //转账
  public void transfer(Account to, int amt){
    //原子化操作
    atomic(()->{
      if (this.balance.get() > amt) {
        this.balance.decrement(amt);
        to.balance.increment(amt);
      }
    });
  }
}
```

`atomic()` 解决并发问题的原理：基于 **MVCC（多版本并发控制）**。

- 事务开启时打快照，提交时检查数据是否变化
- 通过**版本号**检测冲突，类似乐观锁
- 知名实现：Clojure STM

## 自己实现 STM

**`VersionedRef`**：将对象包装为带版本号的不可变引用。

**`TxnRef`**：事务内读写委托给 `Txn` 接口，内部持有最新值 `curRef`：

```java
//带版本号的对象引用
public final class VersionedRef<T> {
  final T value;
  final long version;
  //构造方法
  public VersionedRef(T value, long version) {
    this.value = value;
    this.version = version;
  }
}
//支持事务的引用
public class TxnRef<T> {
  //当前数据，带版本号
  volatile VersionedRef curRef;
  //构造方法
  public TxnRef(T value) {
    this.curRef = new VersionedRef(value, 0L);
  }
  //获取当前事务中的数据
  public T getValue(Txn txn) {
    return txn.get(this);
  }
  //在当前事务中设置数据
  public void setValue(T value, Txn txn) {
    txn.set(this, value);
  }
}
```

**`STMTxn`**：事务实现类，核心属性：
- `inTxnMap`：当前事务所有读写数据的快照
- `writeMap`：当前事务需要写入的数据
- `txnId`：全局递增事务 ID

三个核心方法：
- `get()`：读数据作为快照放入 `inTxnMap`
- `set()`：写数据放入 `writeMap`
- `commit()`：串行提交（互斥锁），检查 `inTxnMap` 中数据是否变化，未变化则写入：

```java
//事务接口
public interface Txn {
  <T> T get(TxnRef<T> ref);
  <T> void set(TxnRef<T> ref, T value);
}
//STM 事务实现类
public final class STMTxn implements Txn {
  //事务 ID 生成器
  private static AtomicLong txnSeq = new AtomicLong(0);

  //当前事务所有的相关数据
  private Map<TxnRef, VersionedRef> inTxnMap = new HashMap<>();
  //当前事务所有需要修改的数据
  private Map<TxnRef, Object> writeMap = new HashMap<>();
  //当前事务 ID
  private long txnId;
  //构造函数，自动生成当前事务 ID
  STMTxn() {
    txnId = txnSeq.incrementAndGet();
  }

  //获取当前事务中的数据
  @Override
  public <T> T get(TxnRef<T> ref) {
    //将需要读取的数据，加入 inTxnMap
    if (!inTxnMap.containsKey(ref)) {
      inTxnMap.put(ref, ref.curRef);
    }
    return (T) inTxnMap.get(ref).value;
  }
  //在当前事务中修改数据
  @Override
  public <T> void set(TxnRef<T> ref, T value) {
    //将需要修改的数据，加入 inTxnMap
    if (!inTxnMap.containsKey(ref)) {
      inTxnMap.put(ref, ref.curRef);
    }
    writeMap.put(ref, value);
  }
  //提交事务
  boolean commit() {
    synchronized (STM.commitLock) {
    //是否校验通过
    boolean isValid = true;
    //校验所有读过的数据是否发生过变化
    for(Map.Entry<TxnRef, VersionedRef> entry : inTxnMap.entrySet()){
      VersionedRef curRef = entry.getKey().curRef;
      VersionedRef readRef = entry.getValue();
      //通过版本号来验证数据是否发生过变化
      if (curRef.version != readRef.version) {
        isValid = false;
        break;
      }
    }
    //如果校验通过，则所有更改生效
    if (isValid) {
      writeMap.forEach((k, v) -> {
        k.curRef = new VersionedRef(v, txnId);
      });
    }
    return isValid;
  }
}
```

`atomic()` 实现：类似 CAS，提交失败则重建事务重试：

```java
@FunctionalInterface
public interface TxnRunnable {
  void run(Txn txn);
}
//STM
public final class STM {
  //私有化构造方法
  private STM() {
  //提交数据需要用到的全局锁
  static final Object commitLock = new Object();
  //原子化提交方法
  public static void atomic(TxnRunnable action) {
    boolean committed = false;
    //如果没有提交成功，则一直重试
    while (!committed) {
      //创建新的事务
      STMTxn txn = new STMTxn();
      //执行业务逻辑
      action.run(txn);
      //提交事务
      committed = txn.commit();
    }
  }
}}
```

使用自实现 STM 完成转账（与 Multiverse 用法类似）：

```java
class Account {
  //余额
  private TxnRef<Integer> balance;
  //构造方法
  public Account(int balance) {
    this.balance = new TxnRef<Integer>(balance);
  }
  //转账操作
  public void transfer(Account target, int amt){
    STM.atomic((txn)->{
      Integer from = balance.getValue(txn);
      balance.setValue(from-amt, txn);
      Integer to = target.balance.getValue(txn);
      target.balance.setValue(to+amt, txn);
    });
  }
}
```

## 协程：更轻量级的线程

**协程**：轻量级线程，在**用户态**调度（线程在内核态调度）。

- 切换成本低于线程
- 协程栈仅几 K~几十 K（线程栈约 1M）
- 支持语言：Golang、Python、Lua、Kotlin 等

## CSP 模型：Golang 的主力队员

Golang 支持协程，提供两种并发通信方案：

1. **共享内存**：类似 Java，用管程 + 原子类同步
2. **消息传递（CSP 模型）**：避免共享，Golang 推荐方案

## 参考资料

- [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901)
