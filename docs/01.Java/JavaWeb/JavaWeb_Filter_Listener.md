---
title: JavaWeb 之 Filter 和 Listener
date: 2020-08-24 19:41:46
order: 03
categories:
  - Java
  - JavaWeb
tags:
  - Java
  - JavaWeb
  - Filter
  - Listener
permalink: /pages/150d4cfd/
---

# JavaWeb 之 Filter 和 Listener

引入了 Servlet 规范后，你不需要关心 Socket 网络通信、不需要关心 HTTP 协议，也不需要关心你的业务类是如何被实例化和调用的，因为这些都被 Servlet 规范标准化了，你只要关心怎么实现的你的业务逻辑。这对于程序员来说是件好事，但也有不方便的一面。所谓规范就是说大家都要遵守，就会千篇一律，但是如果这个规范不能满足你的业务的个性化需求，就有问题了，因此设计一个规范或者一个中间件，要充分考虑到可扩展性。Servlet 规范提供了两种扩展机制：**Filter**和**Listener**。

## Filter

**Filter 是过滤器，这个接口允许你对请求和响应做一些统一的定制化处理**。

Filter 提供了过滤链（Filter Chain）的概念，一个过滤链包括多个 Filter。客户端请求 request 在抵达 Servlet 之前会经过过滤链的所有 Filter，服务器响应 response 从 Servlet 抵达客户端浏览器之前也会经过过滤链的所有 FIlter。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2019/05/00cfbefd5a2144a09b38e76100f779d4.png)

### 过滤器方法

Filter 接口有三个方法：

- `init`：初始化 `Filter`
- `destroy`：销毁 `Filter`
- `doFilter`：将请求传给下个 `Filter` 或 `Servlet`

`init` 和 `destroy` 方法只会被调用一次；`doFilter` 每次有客户端请求都会被调用一次。

```java
public interface Filter {

	/**
	 * web 程序启动时调用此方法, 用于初始化该 Filter
	 * @param config
	 *            可以从该参数中获取初始化参数以及ServletContext信息等
	 * @throws ServletException
	 */
	public void init(FilterConfig config) throws ServletException;

	/**
	 * 客户请求服务器时会经过
	 *
	 * @param request
	 *            客户请求
	 * @param response
	 *            服务器响应
	 * @param chain
	 *            过滤链, 通过 chain.doFilter(request, response) 将请求传给下个 Filter 或
	 *            Servlet
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws ServletException, IOException;

	/**
	 * web 程序关闭时调用此方法, 用于销毁一些资源
	 */
	public void destroy();

}
```

### 过滤器配置

`Filter` 需要配置在 `web.xml` 中才能生效。一个 `Filter` 需要配置 `<filter>` 与 `<filter-mapping>` 标签。

- `<filter>` 配置 Filter 名称，实现类以及初始化参数。
- `<filter-mapping>` 配置什么规则下使用该 Filter。
- `<filter>` 的 filterName 与 `<filter-mapping>` 的 filterName 必须匹配。
- `<url-pattern>` 配置 URL 的规则，可以配置多个，可以使用通配符（`*`）。
- `<dispatcher>` 配置到达 Servlet 的方式，有 4 种取值：REQUEST、FORWARD、INCLUDE、ERROR。可以同时配置多个 `<dispatcher>`。如果没有配置任何 `<dispatcher>`，默认为 REQUEST。
  - REQUEST - 表示仅当直接请求 Servlet 时才生效。
  - FORWARD - 表示仅当某 Servlet 通过 FORWARD 到该 Servlet 时才生效。
  - INCLUDE - JSP 中可以通过 `<jsp:include>` 请求某 Servlet。仅在这种情况表有效。
  - ERROR - JSP 中可以通过 `<%@ page errorPage="error.jsp" %>` 指定错误处理页面。仅在这种情况表有效。

## Listener

监听器（`Listener`）用于监听 web 应用程序中的`ServletContext`, `HttpSession`和 `ServletRequest`等域对象的创建与销毁事件，以及监听这些域对象中的属性发生修改的事件。

使用 `Listener` 不需要关注该类事件时怎样触发或者怎么调用相应的 `Listener`，只要记住该类事件触发时一定会调用相应的 `Listener`，遵循 Servlet 规范的服务器会自动完成相应工作。

### 监听器的分类

在 Servlet 规范中定义了多种类型的监听器，它们用于监听的事件源分别为`ServletContext`，`HttpSession`和`ServletRequest`这三个域对象
Servlet 规范针对这三个对象上的操作，又把多种类型的监听器划分为三种类型：

1. 监听域对象自身的创建和销毁的事件监听器。
2. 监听域对象中的属性的增加和删除的事件监听器。
3. 监听绑定到 HttpSession 域中的某个对象的状态的事件监听器。

### 监听对象的创建和销毁

#### HttpSessionListener

**`HttpSessionListener` 接口用于监听 `HttpSession` 对象的创建和销毁。**

- 创建一个 `Session` 时，激发 `sessionCreated (HttpSessionEvent se)` 方法
- 销毁一个 `Session` 时，激发 `sessionDestroyed (HttpSessionEvent se)` 方法。

#### ServletContextListener

**`ServletContextListener` 接口用于监听 `ServletContext` 对象的创建和销毁事件。**

实现了 `ServletContextListener` 接口的类都可以对 `ServletContext` 对象的创建和销毁进行监听。

- 当 `ServletContext` 对象被创建时，激发 `contextInitialized (ServletContextEvent sce)` 方法。
- 当 `ServletContext` 对象被销毁时，激发 `contextDestroyed(ServletContextEvent sce)` 方法。

`ServletContext` 域对象创建和销毁时机：

- 创建：服务器启动针对每一个 Web 应用创建 `ServletContext`
- 销毁：服务器关闭前先关闭代表每一个 web 应用的 `ServletContext`

#### ServletRequestListener

**`ServletRequestListener` 接口用于监听 `ServletRequest` 对象的创建和销毁。**

- `Request` 对象被创建时，监听器的 `requestInitialized(ServletRequestEvent sre)` 方法将会被调用
- `Request` 对象被销毁时，监听器的 `requestDestroyed(ServletRequestEvent sre)` 方法将会被调用

`ServletRequest` 域对象创建和销毁时机：

- 创建：用户每一次访问都会创建 request 对象
- 销毁：当前访问结束，request 对象就会销毁

### 监听对象的属性变化

域对象中属性的变更的事件监听器就是用来监听 `ServletContext`、`HttpSession`、`HttpServletRequest` 这三个对象中的属性变更信息事件的监听器。
这三个监听器接口分别是 `ServletContextAttributeListener`、`HttpSessionAttributeListener` `和 ServletRequestAttributeListener`，这三个接口中都定义了三个方法来处理被监听对象中的属性的增加，删除和替换的事件，同一个事件在这三个接口中对应的方法名称完全相同，只是接受的参数类型不同。

#### attributeAdded 方法

当向被监听对象中增加一个属性时，web 容器就调用事件监听器的 `attributeAdded` 方法进行响应，这个方法接收一个事件类型的参数，监听器可以通过这个参数来获得正在增加属性的域对象和被保存到域中的属性对象
各个域属性监听器中的完整语法定义为：

```java
public void attributeAdded(ServletContextAttributeEvent scae)
public void attributeReplaced(HttpSessionBindingEvent hsbe)
public void attributeRmoved(ServletRequestAttributeEvent srae)
```

#### attributeRemoved 方法

当删除被监听对象中的一个属性时，web 容器调用事件监听器的 `attributeRemoved` 方法进行响应
各个域属性监听器中的完整语法定义为：

```java
public void attributeRemoved(ServletContextAttributeEvent scae)
public void attributeRemoved(HttpSessionBindingEvent hsbe)
public void attributeRemoved(ServletRequestAttributeEvent srae)
```

#### attributeReplaced 方法

当监听器的域对象中的某个属性被替换时，web 容器调用事件监听器的 `attributeReplaced` 方法进行响应
各个域属性监听器中的完整语法定义为：

```java
public void attributeReplaced(ServletContextAttributeEvent scae)
public void attributeReplaced(HttpSessionBindingEvent hsbe)
public void attributeReplaced(ServletRequestAttributeEvent srae)
```

### 监听 Session 内的对象

保存在 Session 域中的对象可以有多种状态：

- 绑定（`session.setAttribute("bean",Object)`）到 `Session` 中；
- 从 `Session` 域中解除绑定（`session.removeAttribute("bean")`）；
- 随 `Session` 对象持久化到一个存储设备中；
- 随 `Session` 对象从一个存储设备中恢复。

Servlet 规范中定义了两个特殊的监听器接口 `HttpSessionBindingListener` 和`HttpSessionActivationListener` 来帮助 JavaBean 对象了解自己在 Session 域中的这些状态。

实现这两个接口的类不需要 `web.xml` 文件中进行注册。

#### HttpSessionBindingListener

`HttpSessionBindingListener` 接口的 JavaBean 对象可以感知自己被绑定或解绑定到 `Session` 中的事件。

- 当对象被绑定到 `HttpSession` 对象中时，web 服务器调用该对象的 `valueBound(HttpSessionBindingEvent event)` 方法。
- 当对象从 `HttpSession` 对象中解除绑定时，web 服务器调用该对象的 `valueUnbound(HttpSessionBindingEvent event)` 方法。

#### HttpSessionActivationListener

实现了 `HttpSessionActivationListener` 接口的 JavaBean 对象可以感知自己被活化(反序列化)和钝化(序列化)的事件。

- 当绑定到 `HttpSession` 对象中的 JavaBean 对象将要随 `HttpSession` 对象被序列化之前，web 服务器调用该 JavaBean 对象的 `sessionWillPassivate(HttpSessionEvent event)` 方法。这样 JavaBean 对象就可以知道自己将要和 `HttpSession` 对象一起被序列化到硬盘中.
- 当绑定到 `HttpSession` 对象中的 JavaBean 对象将要随 `HttpSession` 对象被反序列化之后，web 服务器调用该 JavaBean 对象的 `sessionDidActive(HttpSessionEvent event)` 方法。这样 JavaBean 对象就可以知道自己将要和 `HttpSession` 对象一起被反序列化回到内存中

## Filter 和 Listener

Filter 和 Listener 的本质区别：

- **Filter 是干预过程的**，它是过程的一部分，是基于过程行为的。
- **Listener 是基于状态的**，任何行为改变同一个状态，触发的事件是一致的。

## 示例代码

- `Filter` 的示例源码：[源码](https://github.com/dunwu/javatech/tree/master/codes/javaee-tutorial/javaee-tutorial-filter)
- `Listener` 的示例源码：[源码](https://github.com/dunwu/javatech/tree/master/codes/javaee-tutorial/javaee-tutorial-listener)

## 典型应用场景

- **统一编码过滤器**：通过 Filter 统一设置请求和响应的字符编码（如 UTF-8），解决中文乱码问题。
- **权限认证过滤器**：在请求到达 Servlet 前检查用户是否已登录、是否有访问权限，未登录则重定向到登录页。
- **跨域处理过滤器**：统一设置 CORS 响应头，允许前端跨域访问后端 API。
- **请求日志记录**：通过 Listener 监听应用启动/关闭事件，通过 Filter 记录每个请求的处理时间、URI、参数等信息。
- **在线用户统计**：通过 HttpSessionListener 监听 Session 创建和销毁，实时统计在线用户数。

## 最佳实践

- **Filter 执行顺序明确**：多个 Filter 按 `<filter-mapping>` 在 web.xml 中的声明顺序执行，或使用 `@Order` 注解明确顺序。
- **及时释放资源**：Filter 的 `doFilter` 方法中必须调用 `chain.doFilter()` 或返回响应，否则请求会挂起。
- **避免在 Filter 中处理业务逻辑**：Filter 仅做通用的横切关注点（编码、权限、日志），业务逻辑应放在 Servlet/Controller 中。
- **Listener 初始化资源**：在 `ServletContextListener.contextInitialized()` 中初始化全局资源（如连接池、缓存），在 `contextDestroyed()` 中释放。
- **注意 Filter 和 Interceptor 的区别**：Filter 是 Servlet 规范，在 Servlet 容器层执行；Interceptor 是 Spring MVC 概念，在 DispatcherServlet 内部执行，可访问 Spring 上下文。

## 常见问题

**Filter、Interceptor 和 AOP 有什么区别？**

Filter 是 Servlet 规范组件，在 Servlet 容器层拦截请求；Interceptor 是 Spring MVC 组件，可访问 Spring 上下文和 Handler 信息；AOP 是 Spring 的切面编程，可以拦截任意 Bean 方法。执行顺序：Filter → Interceptor → AOP → Controller。

**为什么 Filter 中不能使用 Spring Bean？**

Filter 在 Servlet 容器中注册，生命周期由容器管理，不受 Spring 管理。可通过 `DelegatingFilterProxy` 或 `FilterRegistrationBean` 将 Filter 注册为 Spring Bean，从而注入依赖。

**Listener 和 Filter 的执行顺序是怎样的？**

应用启动时：`ServletContextListener.contextInitialized()` 最先执行，然后 Filter 初始化。请求处理时：Filter 链先执行，然后是 Servlet。应用关闭时：Filter 先销毁，最后 `ServletContextListener.contextDestroyed()` 执行。

## 参考资料

- [深入拆解 Tomcat & Jetty](https://time.geekbang.org/column/intro/100027701)
- [Java Web 整合开发王者归来](https://book.douban.com/subject/4189495/)
