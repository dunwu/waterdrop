---
title: 《极客时间教程 - Java 并发编程实战》笔记三
date: 2024-08-30 08:02:52
categories:
  - 笔记
  - Java
tags:
  - Java
  - 并发
permalink: /pages/20cddac5/
---

# 《极客时间教程 - Java 并发编程实战》笔记三

## Immutability 模式：如何利用不变性解决并发问题？

**不变性（Immutability）模式**：对象一旦创建后状态不再变化。解决并发问题最简单的方法——让共享变量只有读操作。

### 快速实现具备不可变性的类

- **类和属性都是 `final` 的，所有方法均是只读的**
- `String`、`Long`、`Integer`、`Double` 等包装类均严格遵守此规则
- `String.replace()` 不修改原 `value[]`，而是返回新字符串

```java
public final class String {
  private final char value[];
  // 字符替换
  String replace(char oldChar,
      char newChar) {
    //无需替换，直接返回 this
    if (oldChar == newChar){
      return this;
    }

    int len = value.length;
    int i = -1;
    /* avoid getfield opcode */
    char[] val = value;
    //定位到需要替换的字符位置
    while (++i < len) {
      if (val[i] == oldChar) {
        break;
      }
    }
    //未找到 oldChar，无需替换
    if (i >= len) {
      return this;
    }
    //创建一个 buf[]，这是关键
    //用来保存替换后的字符串
    char buf[] = new char[len];
    for (int j = 0; j < i; j++) {
      buf[j] = val[j];
    }
    while (i < len) {
      char c = val[i];
      buf[i] = (c == oldChar) ?
        newChar : c;
      i++;
    }
    //创建一个新的字符串返回
    //原字符串不会发生任何变化
    return new String(buf, true);
  }
}
```

### 利用享元模式避免创建重复对象

**享元模式（Flyweight Pattern）**：本质是**对象池**，减少创建对象数量以降低内存占用。

- `Long`/`Integer`/`Short`/`Byte` 包装类内部维护静态对象池，仅缓存 `[-128, 127]`
- **基础类型包装类不适合做锁**：享元模式导致看似私有的锁实际是共有的

```java
Long valueOf(long l) {
  final int offset = 128;
  // [-128,127] 直接的数字做了缓存
  if (l >= -128 && l <= 127) {
    return LongCache
      .cache[(int)l + offset];
  }
  return new Long(l);
}
//缓存，等价于对象池
//仅缓存 [-128,127] 直接的数字
static class LongCache {
  static final Long cache[]
    = new Long[-(-128) + 127 + 1];

  static {
    for(int i=0; i<cache.length; i++)
      cache[i] = new Long(i-128);
  }
}
```

**基础类型包装类不适合做锁**：享元模式导致看似私有的锁实际是共有的。

```java
class A {
  Long al=Long.valueOf(1);
  public void setAX(){
    synchronized (al) {
      //省略代码无数
    }
  }
}
class B {
  Long bl=Long.valueOf(1);
  public void setBY(){
    synchronized (bl) {
      //省略代码无数
    }
  }
}
```

### 使用 Immutability 式的注意事项

1. 属性都是 `final` **不等于**不可变：如果属性是普通对象，其属性仍可被修改。**需确认不变性的边界**
2. 不可变对象也需要**正确发布**：引用不可变对象的外部类需自行保证线程安全
   - 仅需可见性：用 `volatile`
   - 需要原子性：用 `AtomicReference` 等原子类

```java
class Foo{
  int age=0;
  int name="abc";
}
final class Bar {
  final Foo foo;
  void setAge(int a){
    foo.age=a; // foo 是 final，但 foo.age 仍可修改
  }
}
```

```java
//Foo 线程安全
final class Foo{
  final int age=0;
  final int name="abc";
}
//Bar 线程不安全
class Bar {
  Foo foo;
  void setFoo(Foo f){
    this.foo=f;
  }
}
```

如果你的程序仅仅需要 foo 保持可见性，无需保证原子性，那么可以将 foo 声明为 volatile 变量，这样就能保证可见性。如果你的程序需要保证原子性，那么可以通过原子类来实现。下面的示例代码是合理库存的原子化实现，你应该很熟悉了，其中就是用原子类解决了不可变对象引用的原子性问题。

```java
public class SafeWM {
  class WMRange{
    final int upper;
    final int lower;
    WMRange(int upper,int lower){
    //省略构造函数实现
    }
  }
  final AtomicReference<WMRange>
    rf = new AtomicReference<>(
      new WMRange(0,0)
    );
  // 设置库存上限
  void setUpper(int v){
    while(true){
      WMRange or = rf.get();
      // 检查参数合法性
      if(v < or.lower){
        throw new IllegalArgumentException();
      }
      WMRange nr = new
          WMRange(v, or.lower);
      if(rf.compareAndSet(or, nr)){
        return;
      }
    }
  }
}
```

### Immutability 总结

- Immutability 是最简单的并发解决方案，建议优先尝试
- **无状态对象**（无属性，只有方法）：无线程安全问题，可无限水平扩展

## Copy-on-Write 模式：不是延时策略的 COW

**Copy-on-Write（COW）**：**写时复制**。

### Copy-on-Write 模式的应用领域

- `CopyOnWriteArrayList`、`CopyOnWriteArraySet`：读操作无锁，性能极致
- **最大应用领域是函数式编程**：函数式编程基础是不可变性，所有修改操作都需要 COW

### 一个真实案例

Router 实现（重写 `equals` 以保证 `CopyOnWriteArraySet` 正常工作）：

```java
//路由信息
public final class Router{
  private final String  ip;
  private final Integer port;
  private final String  iface;
  //构造函数
  public Router(String ip,
      Integer port, String iface){
    this.ip = ip;
    this.port = port;
    this.iface = iface;
  }
  //重写 equals 方法
  public boolean equals(Object obj){
    if (obj instanceof Router) {
      Router r = (Router)obj;
      return iface.equals(r.iface) &&
             ip.equals(r.ip) &&
             port.equals(r.port);
    }
    return false;
  }
  public int hashCode() {
    //省略 hashCode 相关代码
  }
}
//路由表信息
public class RouterTable {
  //Key: 接口名
  //Value: 路由集合
  ConcurrentHashMap<String, CopyOnWriteArraySet<Router>>
    rt = new ConcurrentHashMap<>();
  //根据接口名获取路由表
  public Set<Router> get(String iface){
    return rt.get(iface);
  }
  //删除路由
  public void remove(Router router) {
    Set<Router> set=rt.get(router.iface);
    if (set != null) {
      set.remove(router);
    }
  }
  //增加路由
  public void add(Router router) {
    Set<Router> set = rt.computeIfAbsent(
      route.iface, r ->
        new CopyOnWriteArraySet<>());
    set.add(router);
  }
}
```

## 线程本地存储模式：没有共享，就没有伤害

**线程封闭**：避免共享，无并发安全问题。`ThreadLocal` 实现线程封闭。

### ThreadLocal 的使用方法

解决 `SimpleDateFormat` 线程不安全问题：

```java
static class SafeDateFormat {
  //定义 ThreadLocal 变量
  static final ThreadLocal<DateFormat>
  tl=ThreadLocal.withInitial(
    ()-> new SimpleDateFormat(
      "yyyy-MM-dd HH:mm:ss"));

  static DateFormat get(){
    return tl.get();
  }
}
//不同线程执行下面代码
//返回的 df 是不同的
DateFormat df = SafeDateFormat.get();
```

### ThreadLocal 的工作原理

ThreadLocal 内部维护一个 Map（Key=线程，Value=变量），但实际实现中 **Map 由 Thread 持有**（而非 ThreadLocal）：

- `Thread.threadLocals`：类型为 `ThreadLocalMap`
- `ThreadLocalMap` 的 Key 是 `ThreadLocal`，且为**弱引用**

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/c3dc79c9f51548ffa34abcf1e5ca2667.png)

```java
class MyThreadLocal<T> {
  Map<Thread, T> locals = new ConcurrentHashMap<>();
  T get() { return locals.get(Thread.currentThread()); }
  void set(T t) { locals.put(Thread.currentThread(), t); }
}
```

Java 实际实现：Map 由 Thread 持有，ThreadLocal 仅作代理：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/67ca9489f6a7453cb843c4a0f5fac587.png)

Thread 持有 ThreadLocalMap 的示意图

```java
class Thread {
  ThreadLocal.ThreadLocalMap threadLocals; // 内部持有 ThreadLocalMap
}
class ThreadLocal<T>{
  public T get() {
    ThreadLocalMap map = Thread.currentThread().threadLocals;
    Entry e = map.getEntry(this);
    return e.value;
  }
  static class ThreadLocalMap{
    Entry[] table; // 内部是数组
    static class Entry extends WeakReference<ThreadLocal> {
      Object value;
    }
  }
}
```

**Thread 持有 Map 而非 ThreadLocal 持有**：减少内存泄露风险。ThreadLocalMap 对 ThreadLocal 是弱引用，Thread 可被回收时 Map 也能被回收。

### ThreadLocal 与内存泄露

**线程池中线程不会被回收**，导致 ThreadLocalMap 中的 Value 被强引用无法回收。

解决方案：`try{}finally{}` 手动清理：

```java
ExecutorService es;
ThreadLocal tl;
es.execute(()->{
  //ThreadLocal 增加变量
  tl.set(obj);
  try {
    // 省略业务逻辑代码
  }finally {
    //手动清理 ThreadLocal
    tl.remove();
  }
});
```

## InheritableThreadLocal 与继承性

- `ThreadLocal` 创建的线程变量，子线程**无法继承**
- `InheritableThreadLocal` 支持子线程继承父线程变量
- **不建议在线程池中使用**：线程创建动态，继承关系易错乱；且同样有内存泄露风险

## Guarded Suspension 模式：等待唤醒机制的规范实现

消息队列中发送消息和消费结果是异步的，需要等待机制：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/aa57d6db1b1c441b94e12033ebdc2497.png)

```java
class Message{
  String id;
  String content;
}
//该方法可以发送消息
void send(Message msg){
  //省略相关代码
}
//MQ 消息返回后会调用该方法
//该方法的执行线程不同于
//发送消息的线程
void onMessage(Message msg){
  //省略相关代码
}
//处理浏览器发来的请求
Respond handleWebReq(){
  //创建一消息
  Message msg1 = new
    Message("1","{...}");
  //发送消息
  send(msg1);
  //如何等待 MQ 返回的消息呢？
  String result = ...;
}
```

### Guarded Suspension 模式

**Guarded Suspension**（保护性暂停）：`GuardedObject` 包含受保护对象 + `get(Predicate)` 等待 + `onChanged()` 唤醒。

核心：`get()` 用条件变量 `await()` 等待，`onChanged()` 用 `signalAll()` 唤醒。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/19745db87a924042a37ae305f9f54281.png)

```java
class GuardedObject<T>{
  //受保护的对象
  T obj;
  final Lock lock =
    new ReentrantLock();
  final Condition done =
    lock.newCondition();
  final int timeout=1;
  //获取受保护对象
  T get(Predicate<T> p) {
    lock.lock();
    try {
      //MESA 管程推荐写法
      while(!p.test(obj)){
        done.await(timeout,
          TimeUnit.SECONDS);
      }
    }catch(InterruptedException e){
      throw new RuntimeException(e);
    }finally{
      lock.unlock();
    }
    //返回非空的受保护对象
    return obj;
  }
  //事件通知方法
  void onChanged(T obj) {
    lock.lock();
    try {
      this.obj = obj;
      done.signalAll();
    } finally {
      lock.unlock();
    }
  }
}
```

### 扩展 Guarded Suspension 模式

通过维护消息 ID 与 `GuardedObject` 实例的映射关系，解决 `onMessage()` 中如何找到匹配的 `GuardedObject` 的问题：

```java
//处理浏览器发来的请求
Respond handleWebReq(){
  //创建一消息
  Message msg1 = new
    Message("1","{...}");
  //发送消息
  send(msg1);
  //利用 GuardedObject 实现等待
  GuardedObject<Message> go
    =new GuardObjec<>();
  Message r = go.get(
    t->t != null);
}
void onMessage(Message msg){
  //如何找到匹配的 go？
  GuardedObject<Message> go=???
  go.onChanged(msg);
}
```

handleWebReq() 创建 `GuardedObject` 实例并 `get()` 等待，`onMessage()` 如何找到匹配的 `GuardedObject`？通过消息 ID 维护映射关系：

```java
class GuardedObject<T>{
  //受保护的对象
  T obj;
  final Lock lock =
    new ReentrantLock();
  final Condition done =
    lock.newCondition();
  final int timeout=2;
  //保存所有 GuardedObject
  final static Map<Object, GuardedObject>
  gos=new ConcurrentHashMap<>();
  //静态方法创建 GuardedObject
  static <K> GuardedObject
      create(K key){
    GuardedObject go=new GuardedObject();
    gos.put(key, go);
    return go;
  }
  static <K, T> void
      fireEvent(K key, T obj){
    GuardedObject go=gos.remove(key);
    if (go != null){
      go.onChanged(obj);
    }
  }
  //获取受保护对象
  T get(Predicate<T> p) {
    lock.lock();
    try {
      //MESA 管程推荐写法
      while(!p.test(obj)){
        done.await(timeout,
          TimeUnit.SECONDS);
      }
    }catch(InterruptedException e){
      throw new RuntimeException(e);
    }finally{
      lock.unlock();
    }
    //返回非空的受保护对象
    return obj;
  }
  //事件通知方法
  void onChanged(T obj) {
    lock.lock();
    try {
      this.obj = obj;
      done.signalAll();
    } finally {
      lock.unlock();
    }
  }
}
```

客户端代码

```java
//处理浏览器发来的请求
Respond handleWebReq(){
  int id=序号生成器。get();
  //创建一消息
  Message msg1 = new
    Message(id,"{...}");
  //创建 GuardedObject 实例
  GuardedObject<Message> go=
    GuardedObject.create(id);
  //发送消息
  send(msg1);
  //等待 MQ 消息
  Message r = go.get(
    t->t != null);
}
void onMessage(Message msg){
  //唤醒等待的线程
  GuardedObject.fireEvent(
    msg.id, msg);
}
```

### Guarded Suspension 总结

- 本质是**等待唤醒机制的规范实现**（“多线程版本的 if”）
- 别名：Guarded Wait 模式、Spin Lock 模式
- 实际问题中常需扩展，如 Dubbo 的 `DefaultFuture`

## Balking 模式：再谈线程安全的单例模式

**Balking 模式**：条件不满足时快速放弃操作。典型场景：编辑器自动保存（未修改则跳过）。

```java
class AutoSaveEditor {

    //文件是否被修改过
    boolean changed = false;
    //定时任务线程池
    ScheduledExecutorService ses = Executors.newSingleThreadScheduledExecutor();

    //定时执行自动保存
    void startAutoSave() {
        ses.scheduleWithFixedDelay(() -> { autoSave(); }, 5, 5, TimeUnit.SECONDS);
    }

    //自动存盘操作
    void autoSave() {
        if (!changed) {
            return;
        }
        changed = false;
        //执行存盘操作
        //省略且实现
        this.execSave();
    }

    //编辑操作
    void edit() {
        //省略编辑逻辑
        changed = true;
    }

}
```

解决：缩小锁范围，只在读写 `changed` 时加锁：

```java
//自动存盘操作
void autoSave() {
    synchronized (this) {
        if (!changed) {
            return;
        }
        changed = false;
    }
    //执行存盘操作
    //省略且实现
    this.execSave();
}

//编辑操作
void edit() {
    //省略编辑逻辑
    synchronized (this) {
        changed = true;
    }
}
```

### Balking 模式的经典实现

将并发处理逻辑与业务逻辑分离，抽取 `change()` 方法：

```java
boolean changed=false;
//自动存盘操作
void autoSave(){
  synchronized(this){
    if (!changed) {
      return;
    }
    changed = false;
  }
  //执行存盘操作
  //省略且实现
  this.execSave();
}
//编辑操作
void edit(){
  //省略编辑逻辑
  ......
  change();
}
//改变状态
void change(){
  synchronized(this){
    changed = true;
  }
}
```

### 用 volatile 实现 Balking 模式

**使用 `volatile` 的前提是对原子性没有要求**。适用于 `scheduleWithFixedDelay` 保证同一时刻只有一个线程执行的场景。

```java
//路由表信息
public class RouterTable {
  //Key: 接口名
  //Value: 路由集合
  ConcurrentHashMap<String, CopyOnWriteArraySet<Router>>
    rt = new ConcurrentHashMap<>();
  //路由表是否发生变化
  volatile boolean changed;
  //将路由表写入本地文件的线程池
  ScheduledExecutorService ses=
    Executors.newSingleThreadScheduledExecutor();
  //启动定时任务
  //将变更后的路由表写入本地文件
  public void startLocalSaver(){
    ses.scheduleWithFixedDelay(()->{
      autoSave();
    }, 1, 1, MINUTES);
  }
  //保存路由表到本地文件
  void autoSave() {
    if (!changed) {
      return;
    }
    changed = false;
    //将路由表写入本地文件
    //省略其方法实现
    this.save2Local();
  }
  //删除路由
  public void remove(Router router) {
    Set<Router> set=rt.get(router.iface);
    if (set != null) {
      set.remove(router);
      //路由表已发生变化
      changed = true;
    }
  }
  //增加路由
  public void add(Router router) {
    Set<Router> set = rt.computeIfAbsent(
      route.iface, r ->
        new CopyOnWriteArraySet<>());
    set.add(router);
    //路由表已发生变化
    changed = true;
  }
}
```

Balking 模式典型应用：**单次初始化**和**线程安全单例**。

```java
class InitTest{
  boolean inited = false;
  synchronized void init(){
    if(inited){
      return;
    }
    //省略 doInit 的实现
    doInit();
    inited=true;
  }
}
```

线程安全单例 `synchronized` 方案性能差，优化为**双重检查**（Double Check）：

```java
class Singleton{
  private static
    Singleton singleton;
  //构造方法私有化
  private Singleton(){}
  //获取实例（单例）
  public synchronized static
  Singleton getInstance(){
    if(singleton == null){
      singleton=new Singleton();
    }
    return singleton;
  }
}
```

双重检查方案：对象创建后 `getInstance()` 无锁，`volatile` 禁止编译优化，获取锁后二次检查保证安全：

```java
class Singleton{
  private static volatile
    Singleton singleton;
  //构造方法私有化
  private Singleton() {}
  //获取实例（单例）
  public static Singleton
  getInstance() {
    //第一次检查
    if(singleton==null){
      synchronize(Singleton.class){
        //获取锁后二次检查
        if(singleton==null){
          singleton=new Singleton();
        }
      }
    }
    return singleton;
  }
}
```

### Balking 总结

- 与 Guarded Suspension 都解决“线程安全的 if”，但 Balking **不等待**
- 经典实现用互斥锁，特定场景可用 `volatile`（更谨慎）

## Thread-Per-Message 模式：最简单实用的分工方法

### 如何理解 Thread-Per-Message 模式

**Thread-Per-Message 模式**：为每个任务分配一个独立线程，委托他人办理。

### 用 Thread 实现 Thread-Per-Message 模式

经典场景：**网络编程服务端**，每个客户端请求创建一个线程。

```java
final ServerSocketChannel ssc =
  ServerSocketChannel.open().bind(new InetSocketAddress(8080));
//处理请求
try {
    while (true) {
        // 接收请求
        SocketChannel sc = ssc.accept();
        // 每个请求都创建一个线程
        new Thread(() -> {
            try {
                // 读 Socket
                ByteBuffer rb = ByteBuffer.allocateDirect(1024);
                sc.read(rb);
                //模拟处理请求
                Thread.sleep(2000);
                // 写 Socket
                ByteBuffer wb = (ByteBuffer) rb.flip();
                sc.write(wb);
                // 关闭 Socket
                sc.close();
            } catch (Exception e) {
                throw new UncheckedIOException(e);
            }
        }).start();
    }
} finally {
    ssc.close();
}
```

Java 线程与 OS 线程一一对应，创建成本高（耗时+内存）。不适合高并发。

业界另一方案：**轻量级线程**（协程/Fiber），创建成本极低。Go/Lua 已广泛使用，Java 通过 **Loom 项目**引入 Fiber。

### 用 Fiber 实现 Thread-Per-Message 模式

Loom 项目的 Fiber 与 Thread API 尽量兼容，只需将 `new Thread(()->{…}).start()` 换成 `Fiber.schedule(()->{})`：

```java
final ServerSocketChannel ssc =
    ServerSocketChannel.open().bind(new InetSocketAddress(8080));
//处理请求
try {
    while (true) {
        // 接收请求
        final SocketChannel sc = ssc.accept();
        Fiber.schedule(() -> {
            try {
                // 读 Socket
                ByteBuffer rb = ByteBuffer.allocateDirect(1024);
                sc.read(rb);
                //模拟处理请求
                LockSupport.parkNanos(2000 * 1000000);
                // 写 Socket
                ByteBuffer wb =
                    (ByteBuffer) rb.flip()
                sc.write(wb);
                // 关闭 Socket
                sc.close();
            } catch (Exception e) {
                throw new UncheckedIOException(e);
            }
        });
    }//while
} finally {
    ssc.close();
}
```

通过压测，可以发现协程方式相比与线程方式，会大大减少线程数。

## Worker Thread 模式：如何避免重复创建线程？

### Worker Thread 模式及其实现

Worker Thread 模式类似车间工人：有活大家一起干，没活就等着。Java 中的实现就是**线程池**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/a92e584c92ce450483a426c41d163aba.png)

这个模式，在 Java 中的方案就是线程池。下面是线程池实现的 echo 服务端：

```java
ExecutorService es = Executors.newFixedThreadPool(500);
final ServerSocketChannel ssc =
    ServerSocketChannel.open().bind(new InetSocketAddress(8080));
//处理请求
try {
    while (true) {
        // 接收请求
        SocketChannel sc = ssc.accept();
        // 将请求处理任务提交给线程池
        es.execute(() -> {
            try {
                // 读 Socket
                ByteBuffer rb = ByteBuffer.allocateDirect(1024);
                sc.read(rb);
                //模拟处理请求
                Thread.sleep(2000);
                // 写 Socket
                ByteBuffer wb = (ByteBuffer) rb.flip();
                sc.write(wb);
                // 关闭 Socket
                sc.close();
            } catch (Exception e) {
                throw new UncheckedIOException(e);
            }
        });
    }
} finally {
    ssc.close();
    es.shutdown();
}
```

### 正确地创建线程池

- **用有界队列**：避免无限制接收任务导致 OOM
- **明确拒绝策略**：结合业务场景制定
- **给线程赋予业务相关名字**：便于调试诊断

综合以上，创建线程池的示例：

```java
ExecutorService es = new ThreadPoolExecutor(50, 500, 60L, TimeUnit.SECONDS,
    //注意要创建有界队列
    new LinkedBlockingQueue<Runnable>(2000),
    //建议根据业务需求实现 ThreadFactory
    r -> {
        return new Thread(r, "echo-" + r.hashCode());
    },
    //建议根据业务需求实现 RejectedExecutionHandler
    new ThreadPoolExecutor.CallerRunsPolicy());
```

### 避免线程死锁

**提交到相同线程池的任务必须是相互独立的**。如果任务间有依赖关系，可能导致所有线程阻塞等待子任务，造成死锁。

**解决方案：为不同任务创建不同线程池**。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/eb9cf8c1c7c04d5b8ea2765bfbea2a9e.png)

当应用出现类似问题时，查看线程栈发现所有线程都阻塞在 `l2.await()`。原因：L1/L2 共用线程池，L1 等待 L2，但线程池已无空闲线程执行 L2。

**解决方案：为不同任务创建不同线程池**。

```java
//L1、L2 阶段共用的线程池
ExecutorService es = Executors.newFixedThreadPool(2);
//L1 阶段的闭锁
CountDownLatch l1 = new CountDownLatch(2);
for (int i = 0; i < 2; i++) {
    System.out.println("L1");
    //执行 L1 阶段任务
    es.execute(() -> {
        //L2 阶段的闭锁
        CountDownLatch l2 = new CountDownLatch(2);
        //执行 L2 阶段子任务
        for (int j = 0; j < 2; j++) {
            es.execute(() -> {
                System.out.println("L2");
                l2.countDown();
            });
        }
        //等待 L2 阶段任务执行完
        l2.await();
        l1.countDown();
    });
}
//等着 L1 阶段任务执行完
l1.await();
System.out.println("end");
```

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/248fe8c5fa71497bb542bf87bed591a5.png)

最后强调：**提交到相同线程池中的任务一定是相互独立的**。

## 两阶段终止模式：如何优雅地终止线程？

### 如何理解两阶段终止模式

**两阶段终止**：第一阶段发送终止指令，第二阶段响应终止指令。

终止指令包括：`interrupt()` + **线程终止标志位**。

### 用两阶段终止模式终止监控操作

监控代理需要优雅终止采集线程：

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/9fad5cc689134de5bf47724507e9d154.png)

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/3baf111ebb8c4084b08a3bf6283bb635.png)

```java
class Proxy {
  boolean started = false;
  //采集线程
  Thread rptThread;
  //启动采集功能
  synchronized void start(){
    //不允许同时启动多个采集线程
    if (started) {
      return;
    }
    started = true;
    rptThread = new Thread(()->{
      while (true) {
        //省略采集、回传实现
        report();
        //每隔两秒钟采集、回传一次数据
        try {
          Thread.sleep(2000);
        } catch (InterruptedException e) {
        }
      }
      //执行到此处说明线程马上终止
      started = false;
    });
    rptThread.start();
  }
  //终止采集功能
  synchronized void stop(){
    //如何实现？
  }
}
```

先调用 `rptThread.interrupt()` 使线程可运行，再用 `Thread.currentThread().isInterrupted()` 作为标志位。注意捕获 `sleep()` 中断异常后需重新设置中断状态：

```java
class Proxy {
  boolean started = false;
  //采集线程
  Thread rptThread;
  //启动采集功能
  synchronized void start(){
    //不允许同时启动多个采集线程
    if (started) {
      return;
    }
    started = true;
    rptThread = new Thread(()->{
      while (!Thread.currentThread().isInterrupted()){
        //省略采集、回传实现
        report();
        //每隔两秒钟采集、回传一次数据
        try {
          Thread.sleep(2000);
        } catch (InterruptedException e){
          //重新设置线程中断状态
          Thread.currentThread().interrupt();
        }
      }
      //执行到此处说明线程马上终止
      started = false;
    });
    rptThread.start();
  }
  //终止采集功能
  synchronized void stop(){
    rptThread.interrupt();
  }
}
```

**建议设置自定义线程终止标志位**（如 `volatile boolean terminated`），避免第三方库未正确处理中断异常：

```java
class Proxy {
  //线程终止标志位
  volatile boolean terminated = false;
  boolean started = false;
  //采集线程
  Thread rptThread;
  //启动采集功能
  synchronized void start(){
    //不允许同时启动多个采集线程
    if (started) {
      return;
    }
    started = true;
    terminated = false;
    rptThread = new Thread(()->{
      while (!terminated){
        //省略采集、回传实现
        report();
        //每隔两秒钟采集、回传一次数据
        try {
          Thread.sleep(2000);
        } catch (InterruptedException e){
          //重新设置线程中断状态
          Thread.currentThread().interrupt();
        }
      }
      //执行到此处说明线程马上终止
      started = false;
    });
    rptThread.start();
  }
  //终止采集功能
  synchronized void stop(){
    //设置中断标志位
    terminated = true;
    //中断线程 rptThread
    rptThread.interrupt();
  }
}
```

### 如何优雅地终止线程池

线程池提供两个关闭方法：

- **`shutdown()`**：保守——拒绝新任务，等待已提交任务执行完再关闭
- **`shutdownNow()`**：激进——拒绝新任务 + 中断正在执行的任务，返回未执行的任务列表

两者本质上也是两阶段终止模式，区别在于终止指令范围不同。

## 生产者-消费者模式：用流水线思想提高效率

### 生产者-消费者模式的优点

核心是**任务队列**，生产者生产任务入队，消费者从队列取任务执行。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/71ee08be87a04e4ba21d06c2b6699c22.png)

- **解耦**：生产者和消费者通过队列通信，无直接依赖
- **支持异步**，平衡生产者和消费者速度差异

### 支持批量执行以提升性能

监控数据存入数据库时，通过生产者-消费者模式实现批量 SQL 执行：生产者将数据入队，消费者批量取出并批量执行。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2024/09/48fd7011683f41ec9e34462e13136fae.png)

实现要点：`pollTasks()` 先阻塞获取一条（避免空循环），再非阻塞批量获取：

```java
//任务队列
BlockingQueue<Task> bq=new
  LinkedBlockingQueue<>(2000);
//启动 5 个消费者线程
//执行批量任务
void start() {
  ExecutorService es=executors
    .newFixedThreadPool(5);
  for (int i=0; i<5; i++) {
    es.execute(()->{
      try {
        while (true) {
          //获取批量任务
          List<Task> ts=pollTasks();
          //执行批量任务
          execTasks(ts);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }
}
//从任务队列中获取批量任务
List<Task> pollTasks()
    throws InterruptedException{
  List<Task> ts=new LinkedList<>();
  //阻塞式获取一条任务
  Task t = bq.take();
  while (t != null) {
    ts.add(t);
    //非阻塞式获取一条任务
    t = bq.poll();
  }
  return ts;
}
//批量执行任务
execTasks(List<Task> ts) {
  //省略具体代码无数
}
```

### 支持分阶段提交以提升性能

日志异步刷盘是典型的**分阶段提交**。生产者将日志任务入队，消费者按规则刷盘（ERROR 立即刷、批量达到阈值刷、超时刷）：

```java
class Logger {

    //任务队列
    final BlockingQueue<LogMsg> bq = new BlockingQueue<>();
    //flush 批量
    static final int batchSize = 500;
    //只需要一个线程写日志
    ExecutorService es = Executors.newFixedThreadPool(1);

    //启动写日志线程
    void start() {
        File file = File.createTempFile("foo", ".log");
        final FileWriter writer = new FileWriter(file);
        this.es.execute(() -> {
            try {
                //未刷盘日志数量
                int curIdx = 0;
                long preFT = System.currentTimeMillis();
                while (true) {
                    LogMsg log = bq.poll(5, TimeUnit.SECONDS);
                    //写日志
                    if (log != null) {
                        writer.write(log.toString());
                        ++curIdx;
                    }
                    //如果不存在未刷盘数据，则无需刷盘
                    if (curIdx <= 0) {
                        continue;
                    }
                    //根据规则刷盘
                    if (log != null && log.level == LEVEL.ERROR
                        || curIdx == batchSize
                        || System.currentTimeMillis() - preFT > 5000) {
                        writer.flush();
                        curIdx = 0;
                        preFT = System.currentTimeMillis();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try {
                    writer.flush();
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    //写 INFO 级别日志
    void info(String msg) {
        bq.put(new LogMsg(
            LEVEL.INFO, msg));
    }

    //写 ERROR 级别日志
    void error(String msg) {
        bq.put(new LogMsg(
            LEVEL.ERROR, msg));
    }

}

//日志级别
enum LEVEL {
    INFO,
    ERROR
}

class LogMsg {
    LEVEL level;
    String msg;

    //省略构造函数实现
    LogMsg(LEVEL lvl, String msg) { }

    //省略 toString() 实现
    String toString() { }
}
```

## 设计模式模块热点问题答疑

略

## 参考资料

- [极客时间教程 - Java 并发编程实战](https://time.geekbang.org/column/intro/100023901)
