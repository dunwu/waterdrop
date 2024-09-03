---
title: Java 并发之 ThreadLocal
date: 2019-12-25 22:19:09
categories:
  - Java
  - JavaCore
  - 并发
tags:
  - Java
  - JavaCore
  - 并发
permalink: /pages/99b2c78d/
---

# Java 并发之 ThreadLocal

> **`ThreadLocal` 是一个存储线程本地副本的工具类**。
>
> 要保证线程安全，不一定非要进行同步。同步只是保证共享数据争用时的正确性，如果一个方法本来就不涉及共享数据，那么自然无须同步。
>
> Java 中的 **无同步方案** 有：
>
> - **可重入代码** - 也叫纯代码。如果一个方法，它的 **返回结果是可以预测的**，即只要输入了相同的数据，就能返回相同的结果，那它就满足可重入性，当然也是线程安全的。
> - **线程本地存储** - 使用 **`ThreadLocal` 为共享变量在每个线程中都创建了一个本地副本**，这个副本只能被当前线程访问，其他线程无法访问，那么自然是线程安全的。

## ThreadLocal 的应用

`ThreadLocal` 的方法：

```java
public class ThreadLocal<T> {
    public T get() {}
    public void set(T value) {}
    public void remove() {}
    public static <S> ThreadLocal<S> withInitial(Supplier<? extends S> supplier) {}
}
```

> 说明：
>
> - `get` - 用于获取 `ThreadLocal` 在当前线程中保存的变量副本。
> - `set` - 用于设置当前线程中变量的副本。
> - `remove` - 用于删除当前线程中变量的副本。如果此线程局部变量随后被当前线程读取，则其值将通过调用其 `initialValue` 方法重新初始化，除非其值由中间线程中的当前线程设置。 这可能会导致当前线程中多次调用 `initialValue` 方法。
> - `initialValue` - 为 ThreadLocal 设置默认的 `get` 初始值，需要重写 `initialValue` 方法 。

`ThreadLocal` 常用于防止对可变的单例（Singleton）变量或全局变量进行共享。典型应用场景有：管理数据库连接、Session。

【示例】数据库连接

```java
private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>() {
    @Override
    public Connection initialValue() {
        return DriverManager.getConnection(DB_URL);
    }
};

public static Connection getConnection() {
    return connectionHolder.get();
}
```

【示例】Session 管理

```java
private static final ThreadLocal<Session> sessionHolder = new ThreadLocal<>();

public static Session getSession() {
    Session session = (Session) sessionHolder.get();
    try {
        if (session == null) {
            session = createSession();
            sessionHolder.set(session);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return session;
}
```

【示例】完整使用 `ThreadLocal` 示例

```java
public class ThreadLocalDemo {

    private static ThreadLocal<Integer> threadLocal = new ThreadLocal<Integer>() {
        @Override
        protected Integer initialValue() {
            return 0;
        }
    };

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 10; i++) {
            executorService.execute(new MyThread());
        }
        executorService.shutdown();
    }

    static class MyThread implements Runnable {

        @Override
        public void run() {
            int count = threadLocal.get();
            for (int i = 0; i < 10; i++) {
                try {
                    count++;
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            threadLocal.set(count);
            threadLocal.remove();
            System.out.println(Thread.currentThread().getName() + " : " + count);
        }

    }

}
```

全部输出 count = 10

## ThreadLocal 的原理

### 存储结构

**`Thread` 类中维护着一个 `ThreadLocal.ThreadLocalMap` 类型的成员** `threadLocals`。这个成员就是用来存储当前线程独占的变量副本。

`ThreadLocalMap` 是 `ThreadLocal` 的内部类，它维护着一个 `Entry` 数组，**`Entry` 继承了 `WeakReference`** ，所以是弱引用。 `Entry` 用于保存键值对，其中：

- `key` 是 `ThreadLocal` 对象；
- `value` 是传递进来的对象（变量副本）。

```java
public class Thread implements Runnable {
    // ...
    ThreadLocal.ThreadLocalMap threadLocals = null;
    // ...
}

static class ThreadLocalMap {
    // ...
    static class Entry extends WeakReference<ThreadLocal<?>> {
        /** The value associated with this ThreadLocal. */
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }
    // ...
}
```

### 如何解决 Hash 冲突

`ThreadLocalMap` 虽然是类似 `Map` 结构的数据结构，但它并没有实现 `Map` 接口。它不支持 `Map` 接口中的 `next` 方法，这意味着 `ThreadLocalMap` 中解决 Hash 冲突的方式并非 **拉链表** 方式。

实际上，**`ThreadLocalMap` 采用线性探测的方式来解决 Hash 冲突**。所谓线性探测，就是根据初始 key 的 hashcode 值确定元素在 table 数组中的位置，如果发现这个位置上已经被其他的 key 值占用，则利用固定的算法寻找一定步长的下个位置，依次判断，直至找到能够存放的位置。

### 内存泄漏问题

`ThreadLocalMap` 的 `Entry` 继承了 `WeakReference`，所以它的 **key （`ThreadLocal` 对象）是弱引用，而 value （变量副本）是强引用**。

- 如果 `ThreadLocal` 对象没有外部强引用来引用它，那么 `ThreadLocal` 对象会在下次 GC 时被回收。
- 此时，`Entry` 中的 key 已经被回收，但是 value 由于是强引用不会被垃圾收集器回收。如果创建 `ThreadLocal` 的线程一直持续运行，那么 value 就会一直得不到回收，产生**内存泄露**。

那么如何避免内存泄漏呢？方法就是：**使用 `ThreadLocal` 的 `set` 方法后，显示的调用 `remove` 方法** 。

```java
ThreadLocal<String> threadLocal = new ThreadLocal();
try {
    threadLocal.set("xxx");
    // ...
} finally {
    threadLocal.remove();
}
```

## ThreadLocal 的误区

> 示例摘自：[极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701)

ThreadLocal 适用于变量在线程间隔离，而在方法或类间共享的场景。

前文提到，ThreadLocal 是线程隔离的，那么是不是使用 ThreadLocal 就一定高枕无忧呢？

### ThreadLocal 错误案例

使用 Spring Boot 创建一个 Web 应用程序，使用 ThreadLocal 存放一个 Integer 的值，来暂且代表需要在线程中保存的用户信息，这个值初始是 null。

```java
    private ThreadLocal<Integer> currentUser = ThreadLocal.withInitial(() -> null);

    @GetMapping("wrong")
    public Map<String, String> wrong(@RequestParam("id") Integer userId) {
        //设置用户信息之前先查询一次ThreadLocal中的用户信息
        String before = Thread.currentThread().getName() + ":" + currentUser.get();
        //设置用户信息到ThreadLocal
        currentUser.set(userId);
        //设置用户信息之后再查询一次ThreadLocal中的用户信息
        String after = Thread.currentThread().getName() + ":" + currentUser.get();
        //汇总输出两次查询结果
        Map<String, String> result = new HashMap<>();
        result.put("before", before);
        result.put("after", after);
        return result;
    }
```

【预期】从代码逻辑来看，我们预期第一次获取的值始终应该是 null。

【实际】

为了方便复现，将 Tomcat 工作线程设为 1：

```
server.tomcat.max-threads=1
```

当访问 id = 1 时，符合预期

![img](https://raw.githubusercontent.com/dunwu/images/master/snap/20200731111854.png)

当访问 id = 2 时，before 的应答不是 null，而是 1，不符合预期。

【分析】实际情况和预期存在偏差。Spring Boot 程序运行在 Tomcat 中，执行程序的线程是 Tomcat 的工作线程，而 Tomcat 的工作线程是基于线程池的。**线程池会重用固定的几个线程，一旦线程重用，那么很可能首次从**
**ThreadLocal 获取的值是之前其他用户的请求遗留的值。这时，ThreadLocal 中的用户信息就是其他用户的信息**。

**并不能认为没有显式开启多线程就不会有线程安全问题**。使用类似 ThreadLocal 工具来存放一些数据时，需要特别注意在代码运行完后，显式地去清空设置的数据。

### ThreadLocal 错误案例修正

```java
    @GetMapping("right")
    public Map<String, String> right(@RequestParam("id") Integer userId) {
        String before = Thread.currentThread().getName() + ":" + currentUser.get();
        currentUser.set(userId);
        try {
            String after = Thread.currentThread().getName() + ":" + currentUser.get();
            Map<String, String> result = new HashMap<>();
            result.put("before", before);
            result.put("after", after);
            return result;
        } finally {
            //在finally代码块中删除ThreadLocal中的数据，确保数据不串
            currentUser.remove();
        }
    }
```

## InheritableThreadLocal

`InheritableThreadLocal` 类是 `ThreadLocal` 类的子类。

`ThreadLocal` 中每个线程拥有它自己独占的数据。与 `ThreadLocal` 不同的是，`InheritableThreadLocal` 允许一个线程以及该线程创建的所有子线程都可以访问它保存的数据。

> 原理参考：[Java 多线程：InheritableThreadLocal 实现原理](https://blog.csdn.net/ni357103403/article/details/51970748)

# 参考资料

- [《Java 并发编程实战》](https://book.douban.com/subject/10484692/)
- [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
- [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/)
- [极客时间教程 - Java 业务开发常见错误 100 例](https://time.geekbang.org/column/intro/100047701)
- [ThreadLocal 终极篇](https://juejin.im/post/5a64a581f265da3e3b7aa02d)
