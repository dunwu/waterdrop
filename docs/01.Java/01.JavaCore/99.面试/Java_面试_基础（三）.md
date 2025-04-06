---
title: Java 基础面试三
date: 2024-07-12 08:18:58
cover: https://raw.githubusercontent.com/dunwu/images/master/snap/202503110803916.jpg
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
permalink: /pages/2fad4724/
---

# Java 基础面试三

## 泛型

### 【中等】Java 泛型的作用是什么？

::: info Java 泛型是什么？

:::

泛型允许在**类、接口、方法**上使用**类型参数（如 `<T>`）**，使代码能适应多种数据类型，同时保证类型安全。

::: info Java 泛型有什么用？

:::

- **类型安全**：编译时检查类型，避免运行时 `ClassCastException`。
- **代码复用**：同一套逻辑可处理不同数据类型（如 `List<String>` 和 `List<Integer>`）。
- **消除强制转换**：直接使用泛型类型，无需手动转换（如 `(String) list.get(0)`）。

::: info Java 泛型有什么特性？

:::

- **类型擦除**：泛型仅在编译时有效，运行时类型信息会被擦除（`List<String>` 运行时变成 `List`）。
- **通配符 `<?>`**：表示未知类型（如 `List<?>` 可接受任意类型的 `List`）。
- **界限限定**：
  - `T extends Class`（限定类型范围，如 `<T extends Number>`）。
  - `<? super T>`（支持父类类型）。

**简单示例**

```java
// 泛型类
class Box<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

// 使用
Box<String> box = new Box<>();
box.set("Hello");
String value = box.get(); // 无需强制转换
```

**一句话总结**：泛型让代码更灵活、安全，减少冗余和运行时错误。

### 【中等】什么是 Java 泛型的上下界限定符？

Java 泛型的上下界限定符用于**限制泛型类型参数的范围**，确保类型安全，提供更灵活的类型约束。

::: info Java 什么是上界限定符？有什么用？

:::

**上界限定符（`<? extends T>`）**限定泛型类型必须是 `T` **或其子类**（`T` 可以是类或接口）。

**特点**：

- **只读安全**：能安全读取数据（因为元素至少是 `T` 类型）。
- **不能写入**：无法确定具体子类型，防止类型污染。

**示例**：

```java
// 接受 Number 或其子类（如 Integer, Double）
void printList(List<? extends Number> list) {
    for (Number num : list) {  // 安全读取
        System.out.println(num);
    }
    // list.add(1);  // 编译错误！无法安全写入
}
```

::: info Java 什么是下界限定符？有什么用？

:::

下界限定符（`<? super T>`）限定泛型类型必须是 `T` **或其父类**。

**特点**：

- **可写入**：能安全添加 `T` 及其子类的对象。
- **读取受限**：只能以 `Object` 类型读取（因为父类型不确定）。

**示例**：

```java
// 接受 Integer 或其父类（如 Number, Object）
void addNumbers(List<? super Integer> list) {
    list.add(1);     // 安全写入 Integer
    list.add(2);
    // Integer num = list.get(0);  // 编译错误！需强制转换
    Object obj = list.get(0);      // 只能以 Object 读取
}
```

**通配符限定对比**

| 类型 | 语法          | 读取          | 写入            | 应用           |
| :--- | :------------ | :------------ | :-------------- | :------------- |
| 上界 | `? extends T` | 安全（作为T） | 禁止            | 生产者场景     |
| 下界 | `? super T`   | 需转Object    | 安全（T及子类） | 消费者场景     |
| 无界 | `?`           | 作为Object    | 禁止            | 完全不确定类型 |

**小结**

- **`extends T`**：安全读取，限制类型上界。如遍历 `List<? extends Number>`。
- **`super T`**：安全写入，限制类型下界。如 `Collections.copy(dest<? super T>, src<? extends T>)`。
- **PECS 原则**（Producer-Extends, Consumer-Super）指导何时用哪种限定符。
  - **生产者（Producer）** 用 `extends`（输出数据）。
  - **消费者（Consumer）** 用 `super`（输入数据）。

### 【中等】泛型擦除的作用是什么？

泛型擦除是 Java 在**编译时检查类型安全**、**运行时丢弃类型信息**的折中设计，平衡了兼容性、性能和类型安全，但牺牲了部分运行时灵活性。

**泛型擦除**是 Java 泛型的实现机制：

- **编译时**：泛型类型（如 `<T>`、`List<String>`）会被检查，确保类型安全。
- **运行时**：所有泛型类型信息会被擦除，替换为**原始类型（Raw Type）**或**边界类型（如 `Object`/`extends` 上限）**。

**泛型擦除规则**

| 泛型定义                           | 擦除后类型           | 示例                             |
| ---------------------------------- | -------------------- | -------------------------------- |
| **无界限 `<T>`**                   | `Object`             | `List<T>` → `List`               |
| **有界限 `<T extends Number>`**    | `Number`（边界类型） | `Box<T>` → `Box<Number>`         |
| **通配符 `<?>` / `<? extends T>`** | 边界类型             | `List<?>` → `List`               |
| **`<? super T>`**                  | `Object`             | `List<? super Integer>` → `List` |

**泛型擦除作用**

- **兼容性**：确保泛型代码能与旧版 Java（非泛型）字节码兼容。
- **运行时效率**：避免为每个泛型类型生成新类，减少 JVM 负担。
- **简化设计**：统一类型系统，避免 C++ 模板的复杂性。

**泛型擦除的问题**

- **类型信息丢失**：运行时无法获取泛型参数（如 `List<String>` 和 `List<Integer>` 运行时都是 `List`）。

  ```java
  List<String> list = new ArrayList<>();
  System.out.println(list.getClass());  // 输出 ArrayList，而非 ArrayList<String>
  ```

- **强制类型转换**：编译器自动插入类型转换代码。

  ```java
  List<String> list = new ArrayList<>();
  String s = list.get(0);  // 编译后实际为：(String) list.get(0)
  ```

- **不支持原生类型**：不能直接使用 `List<int>`，必须用包装类（如 `List<Integer>`）。

**绕过擦除的限制**

- **显式传递 `Class<T>`**：通过反射保留类型信息。

  ```java
  <T> void create(Class<T> clazz) {
      T instance = clazz.newInstance();  // 运行时知道具体类型
  }
  ```

- **类型令牌（Type Token）**：利用匿名子类捕获泛型类型。
  ```java
  new TypeToken<List<String>>() {};  // Guava 提供的方案
  ```

**典型问题与解决方案**

| 问题场景                                                                 | 解决方案                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------- |
| 需要运行时获取泛型类型                                                   | 传递 `Class<T>` 参数或使用 Type Token             |
| 泛型数组创建（`new T[]`）                                                | 使用 `Object[]` 转换或反射（`Array.newInstance`） |
| 方法重载冲突（如 `void foo(List<String>)` 和 `void foo(List<Integer>)`） | 编译报错（擦除后方法签名相同）                    |

## 反射

### 【简单】什么是反射？反射有什么作用？

**反射（Reflection）是 Java 提供的动态机制**，允许程序在**运行时**：

- **获取类的信息**（类名、方法、字段、注解等） 
- **操作类的成员**（调用方法、访问/修改字段、创建对象等） 
- **绕过访问控制**（如调用私有方法）

**反射核心类**：

- `Class<T>`：表示类或接口
- `Method`：表示类的方法
- `Field`：表示类的字段
- `Constructor`：表示类的构造方法

**反射的主要用途**

- **动态加载类**（如插件化开发）
- **框架设计**（如 Spring 的依赖注入、Hibernate 的 ORM 映射）
- **测试工具**（如 Mockito 模拟对象）
- **绕过访问限制**（调试或特殊场景）

**如何使用反射？**

::: code-tabs#反射使用示例

@tab **获取 `Class` 对象**

```java
// 方式1：通过类名.class
Class<String> strClass = String.class;

// 方式2：通过对象.getClass()
String s = "Hello";
Class<?> strClass2 = s.getClass();

// 方式3：通过Class.forName("全限定类名")
Class<?> strClass3 = Class.forName("java.lang.String");  // 需处理ClassNotFoundException
```

@tab **创建对象**

```java
// 方式1：直接调用无参构造（需强制类型转换）
Class<?> clazz = Class.forName("com.example.User");
User user = (User) clazz.newInstance();  // 已过时，推荐用 getConstructor()

// 方式2：调用带参构造
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
User user = (User) constructor.newInstance("Alice", 25);
```

@tab **调用方法**

```java
// 获取方法（需方法名 + 参数类型）
Method method = clazz.getMethod("setName", String.class);

// 调用方法（需对象实例 + 参数值）
method.invoke(user, "Bob");  // 相当于 user.setName("Bob")

// 调用静态方法
Method staticMethod = clazz.getMethod("staticMethod");
staticMethod.invoke(null);  // 静态方法传 null
```

@tab **访问/修改字段**

```java
// 获取字段（包括私有字段）
Field field = clazz.getDeclaredField("name");

// 允许访问私有字段
field.setAccessible(true);  // 关闭访问检查

// 读取字段值
String name = (String) field.get(user);  // 相当于 user.name

// 修改字段值
field.set(user, "Charlie");  // 相当于 user.name = "Charlie"
```

@tab **获取注解信息**

```java
// 获取类/方法/字段上的注解
Annotation[] annotations = clazz.getAnnotations();
if (clazz.isAnnotationPresent(MyAnnotation.class)) {
    MyAnnotation anno = clazz.getAnnotation(MyAnnotation.class);
}
```

:::

### 【简单】反射有什么优缺点？

| **优点**                   | **缺点**                 |
| -------------------------- | ------------------------ |
| 动态性高（运行时决定行为） | 性能较差（比直接调用慢） |
| 可访问私有成员（突破封装） | 代码可读性降低           |
| 支持泛型擦除后的类型操作   | 安全隐患（如破坏单例）   |

**性能优化建议**：

- **缓存 `Class`/`Method`/`Field` 对象**：避免重复反射调用。
- **优先使用 `getDeclaredXXX`**：比 `getXXX` 更高效（不检查继承链）。
- **限制 `setAccessible(true)`**：频繁调用影响性能。

**注意事项**：

- **反射可以破坏封装性**（如修改 `final` 字段、调用私有方法）。
- **慎用 `setAccessible(true)`**：可能导致安全漏洞（如绕过权限检查）。

::: tip 扩展

[Java Reflection: Why is it so slow?](https://stackoverflow.com/questions/1392351/java-reflection-why-is-it-so-slow) 。

:::

### 【中等】什么是 Java 中的动态代理？

动态代理是一种在**运行时**动态创建代理对象的技术，允许在不修改原始类代码的情况下，**增强或拦截**目标对象的方法调用。

Java 动态代理通过 `Proxy` 和 `InvocationHandler` 在运行时生成接口代理对象，**非侵入式**地实现方法拦截和功能增强，是 AOP 和框架设计的核心技术。

- **`java.lang.reflect.Proxy`**：提供静态方法创建代理对象（核心方法：`Proxy.newProxyInstance()`）。
- **`java.lang.reflect.InvocationHandler`**：接口，实现代理逻辑（核心方法：`invoke()`）。

**动态代理的特点**

- **运行时生成**：代理类在运行时动态生成，无需手动编写。
- **基于接口**：只能代理接口（不能代理普通类）。
- **非侵入性**：无需修改原始代码即可增强功能。  

**应用场景**

- **AOP（面向切面编程）**：如日志、事务管理（Spring AOP 基于动态代理）。  
- **远程方法调用（RPC）**：如 Dubbo 的消费者代理。  
- **权限控制**：拦截方法调用检查权限。  

**动态代理 vs 静态代理**

| **对比项**   | **动态代理**           | **静态代理**             |
| ------------ | ---------------------- | ------------------------ |
| **生成时机** | 运行时动态生成         | 编译时手动编写           |
| **维护成本** | 低（自动适配接口）     | 高（需为每个类编写代理） |
| **灵活性**   | 高（通用逻辑集中处理） | 低（逻辑分散）           |

**局限性**

- **仅支持接口代理**：不能代理普通类（CGLIB 可弥补此问题）。  
- **性能开销**：反射调用比直接调用略慢（现代 JVM 已优化）。  

**扩展：CGLIB 动态代理**

- **原理**：通过字节码技术生成目标类的子类代理。  
- **特点**：可代理普通类，但无法代理 `final` 类/方法。  

### 【中等】JDK 动态代理和 CGLIB 动态代理有什么区别？

JDK 动态代理 vs. CGLIB 动态代理：

| **代理类型**   | **JDK 动态代理**                            | **CGLIB 代理**                 |
| -------------- | ------------------------------------------- | ------------------------------ |
| **实现机制**   | 基于**接口**，运行时生成代理类（`$Proxy0`） | 基于**继承**，生成目标类的子类 |
| **技术依赖**   | Java 反射 API（`Proxy`类）                  | ASM 字节码操作库               |
| **限制条件**   | 目标类必须实现接口                          | 无法代理 `final` 类/方法       |
| **可代理目标** | 只能代理**接口**                            | 可代理**普通类**和接口         |

**性能对比**

| **维度**     | **JDK 动态代理** | **CGLIB 代理**       |
| ------------ | ---------------- | -------------------- |
| **生成速度** | 较快（反射生成） | 较慢（需操作字节码） |
| **调用速度** | 反射调用，略慢   | 直接方法调用，更快   |
| **内存占用** | 较小             | 较大（生成子类）     |

> **注**：现代 JVM 对反射做了优化，JDK 代理性能差距已不明显。

**使用示例**

::: code-tabs#反射使用示例

@tab **JDK 动态代理**

```java
// 要求：目标类必须实现接口
public interface UserService {
    void save();
}

// 代理逻辑
InvocationHandler handler = (proxy, method, args) -> {
    System.out.println("JDK 代理前置处理");
    Object result = method.invoke(target, args);
    System.out.println("JDK 代理后置处理");
    return result;
};

UserService proxy = (UserService) Proxy.newProxyInstance(
    target.getClass().getClassLoader(),
    target.getClass().getInterfaces(),  // 关键：需传入接口
    handler
);
```

@tab **CGLIB 代理**

```java
// 目标类无需实现接口
public class UserService {
    public void save() { System.out.println("保存用户"); }
}

// 代理逻辑
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(UserService.class);
enhancer.setCallback((MethodInterceptor) (obj, method, args, proxy) -> {
    System.out.println("CGLIB 代理前置处理");
    Object result = proxy.invokeSuper(obj, args);  // 直接调用父类方法
    System.out.println("CGLIB 代理后置处理");
    return result;
});

UserService proxy = (UserService) enhancer.create();  // 生成子类对象
```

:::

**如何选择？**

| **场景**                 | **推荐代理** | **理由**                  |
| ------------------------ | ------------ | ------------------------- |
| 目标对象实现了接口       | JDK 动态代理 | 轻量级，标准库支持        |
| 目标对象无接口           | CGLIB        | 唯一选择                  |
| 需要代理 `final` 方法    | JDK 动态代理 | CGLIB 无法代理 final 方法 |
| 高性能要求（如高频调用） | CGLIB        | 直接方法调用更快          |
| 避免额外依赖             | JDK 动态代理 | CGLIB 需引入第三方库      |

**主流框架的选择**

- **Spring AOP**：
  - 默认使用 **JDK 动态代理**（如果目标有接口）  
  - 无接口时自动切换为 **CGLIB**  
  - 可通过 `@EnableAspectJAutoProxy(proxyTargetClass=true)` 强制使用 CGLIB  
- **MyBatis**：Mapper 接口代理使用 **JDK 动态代理** 

**一句话总结**

- **JDK 动态代理**：基于接口，反射实现，轻量但功能有限。  
- **CGLIB**：基于继承，字节码增强，功能强但有 `final` 限制。  
- **选择依据**：目标是否有接口、性能需求、是否允许第三方依赖。

## 注解

### 【中等】Java 中的注解原理是什么？

**注解通过编译期处理（APT）或运行时反射实现元数据编程，其本质是特殊接口，由 JVM 或工具库按生命周期策略处理。**

**注解本质**

- **元数据标签**：注解本质是继承自 `java.lang.annotation.Annotation` 的接口
- **编译后保留策略**：通过 `@Retention` 指定生命周期
  - `SOURCE`：仅保留在源码（如 `@Override`）
  - `CLASS`：保留到字节码（默认）
  - `RUNTIME`：运行时可通过反射读取（如 `@SpringBootApplication`）

**核心处理机制**

- **编译期处理**：
  - **APT（Annotation Processing Tool）**：在编译时生成代码（如 Lombok）
  - **编译器检查**：如 `@Override` 验证方法重写
- **运行时处理**：
  - **反射读取**：通过 `getAnnotation()` 获取注解信息（如 Spring 扫描 `@Component`）
  - **动态代理**：结合 AOP 实现功能增强（如 `@Transactional`）

**关键技术点**

- **元注解**：修饰注解的注解（如 `@Target` 指定作用目标）
- **注解属性**：本质是接口方法（需编译时常量值）
- **字节码操作**：ASM 等工具可直接修改字节码中的注解信息

**应用场景**

- **框架配置**：Spring 的 `@Autowired`、`@RequestMapping`
- **代码生成**：Lombok 的 `@Data`
- **静态检查**：`@Nullable`、`@Deprecated`

## SPI

### 【中级】什么是 SPI，有什么用

SPI 通过`接口+配置文件`实现**运行时服务发现**，是解耦和扩展的利器，JDBC/日志等经典框架均基于此机制。

SPI 是 Java 提供的**服务发现机制**，通过**接口与实现分离**，实现：
- **运行时动态加载实现类**
- **解耦接口与实现**
- **可插拔式扩展**

**核心组成**

| 组件         | 作用         | 示例                             |
| ------------ | ------------ | -------------------------------- |
| **接口**     | 定义服务标准 | `java.sql.Driver`                |
| **实现类**   | 提供具体功能 | `com.mysql.cj.jdbc.Driver`       |
| **配置文件** | 声明实现类   | `META-INF/services/接口全限定名` |

**工作原理**

- 在`META-INF/services/`下创建以**接口全限定名**命名的文件
- 文件中写入**实现类全限定名**（每行一个）
- 通过`ServiceLoader`动态加载实现类

**主要应用场景**

- **JDBC 驱动加载**（`DriverManager`）
- **日志门面实现**（SLF4J → Logback/Log4j）
- **Spring Boot 自动配置**
- **Dubbo 扩展点机制**

**优势与局限**

| **优势**       | **局限**                                |
| -------------- | --------------------------------------- |
| 实现热插拔     | 配置文件需严格规范                      |
| 解耦接口与实现 | 原生SPI会加载所有实现类（可能浪费资源） |
| 扩展性强       | 无默认实现筛选机制                      |

**与API的区别**

| **维度** | **SPI**                  | **API**                  |
| -------- | ------------------------ | ------------------------ |
| 调用方向 | 由实现方提供，调用方选择 | 由提供方定义，调用方使用 |
| 控制权   | 调用方控制               | 提供方控制               |
| 典型场景 | JDBC驱动、日志实现       | Java标准库               |

**改进方案**

- **Dubbo SPI**：增加按需加载、扩展点缓存等优化
- **Spring Factories**：`META-INF/spring.factories`机制

## 序列化

### 【简单】什么是序列化？什么是反序列化？

**基本概念**

- **序列化**：将对象转换为**字节流**（用于存储/传输）
- **反序列化**：将字节流恢复为对象

**核心用途**

- **持久化存储**（如保存到文件/数据库）
- **网络传输**（如RPC调用）
- **深拷贝实现**（通过序列化+反序列化）

**Java实现方式**

| 方式                            | 特点                     | 示例                                   |
| ------------------------------- | ------------------------ | -------------------------------------- |
| **`Serializable`接口**          | 标记接口，默认Java序列化 | `class User implements Serializable`   |
| **`Externalizable`接口**        | 需手动实现读写逻辑       | 覆盖`writeExternal()`/`readExternal()` |
| **第三方库**（JSON/Protobuf等） | 跨语言、高效             | Gson、Jackson、Protobuf                |

**关键注意事项**

- **`serialVersionUID`**：显式声明版本号，避免反序列化失败
  
  ```java
  private static final long serialVersionUID = 1L;
  ```
- **敏感字段处理**：用`transient`跳过序列化
  
  ```java
  private transient String password;  // 不会被序列化
  ```
- **性能优化**：
  
  - 避免序列化大对象
  - 第三方库（如Protobuf）比Java原生序列化更快

**常见序列化协议对比**

| 协议         | 语言支持 | 可读性 | 性能 | 典型应用 |
| ------------ | -------- | ------ | ---- | -------- |
| **Java原生** | 仅Java   | 差     | 低   | Java RMI |
| **JSON**     | 多语言   | 好     | 中   | Web API  |
| **Protobuf** | 多语言   | 差     | 高   | gRPC     |
| **Hessian**  | 多语言   | 差     | 中   | Dubbo    |

**安全风险**

- **反序列化漏洞**：恶意字节流可触发代码执行（需校验数据来源）
- **解决方案**：
  - 使用白名单控制反序列化类
  - 替换为JSON等文本协议

## IO

### Java 提供了哪些 IO 方式？

- **BIO** - 优点是代码比较简单、直观；缺点则是 IO 效率和扩展性存在局限性，容易成为应用性能的瓶颈。
  - 传统的 java.io 包，它基于流模型实现，提供了我们最熟知的一些 IO 功能，如：字节流（InputStream/OutputStream）、字符流（Reader/Writer）、File、RandomAccessFile 等。交互方式是同步、阻塞的方式，也就是说，在读取输入流或者写入输出流时，在读、写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的线性顺序。
  - 很多时候，人们也把 java.net 下面提供的部分网络 API，比如 Socket、ServerSocket、HttpURLConnection 也归类到同步阻塞 IO 类库，因为网络通信同样是 IO 行为。
  - BufferedOutputStream 等带缓冲区的实现，可以避免频繁的磁盘读写，进而提高 IO 处理效率。这种设计利用了缓冲区，将批量数据进行一次操作，但在使用中千万别忘了 flush。
  - 很多 IO 工具类都实现了 Closeable 接口，因为需要进行资源的释放。需要利用 try-with-resources、 try-finally 等机制保证资源被明确关闭，否则将导致资源无法被释放。
- **NIO** - java.nio 包，提供了 Channel、Selector、Buffer 等新的抽象，可以构建多路复用的、同步非阻塞 IO 程序，同时提供了更接近操作系统底层的高性能数据操作方式。
  - Buffer，高效的数据容器，除了布尔类型，所有原始数据类型都有相应的 Buffer 实现。
  - Channel，类似在 Linux 之类操作系统上看到的文件描述符，是 NIO 中被用来支持批量式 IO 操作的一种抽象。
    - File 或者 Socket，通常被认为是比较高层次的抽象，而 Channel 则是更加底层的一种抽象，这也使得 NIO 得以充分利用现代操作系统底层机制，获得特定场景的性能优化，例如，DMA（Direct Memory Access）等。不同层次的抽象是相互关联的，我们可以通过 Socket 获取 Channel，反之亦然。
  - Selector，是 NIO 实现多路复用的基础，它提供了一种高效的机制，可以检测到注册在 Selector 上的多个 Channel 中，是否有 Channel 处于就绪状态，进而实现了单线程对多 Channel 的高效管理。Selector 同样是基于底层操作系统机制，不同模式、不同版本都存在区别。Linux 上依赖于 [epoll](http://hg.openjdk.java.net/jdk/jdk/file/d8327f838b88/src/java.base/linux/classes/sun/nio/ch/EPollSelectorImpl.java)，Windows 上 NIO2（AIO）模式则是依赖于 [iocp](http://hg.openjdk.java.net/jdk/jdk/file/d8327f838b88/src/java.base/windows/classes/sun/nio/ch/Iocp.java)。
- **AIO** - 在 Java 7 中，NIO 有了进一步的改进，也就是 NIO 2，引入了异步非阻塞 IO 方式，也有很多人叫它 AIO（Asynchronous IO）。异步 IO 操作基于事件和回调机制，可以简单理解为，应用操作直接返回，而不会阻塞在那里，当后台处理完成，操作系统会通知相应线程进行后续工作。

### NIO 如何实现多路复用？

```java
    public class NIOServer extends Thread {
        public void run() {
            try (Selector selector = Selector.open();
                 ServerSocketChannel serverSocket = ServerSocketChannel.open();) {// 创建 Selector 和 Channel
                serverSocket.bind(new InetSocketAddress(InetAddress.getLocalHost(), 8888));
                serverSocket.configureBlocking(false);
                // 注册到 Selector，并说明关注点
                serverSocket.register(selector, SelectionKey.OP_ACCEPT);
                while (true) {
                    selector.select();// 阻塞等待就绪的 Channel，这是关键点之一
                    Set<SelectionKey> selectedKeys = selector.selectedKeys();
                    Iterator<SelectionKey> iter = selectedKeys.iterator();
                    while (iter.hasNext()) {
                        SelectionKey key = iter.next();
                       // 生产系统中一般会额外进行就绪状态检查
                        sayHelloWorld((ServerSocketChannel) key.channel());
                        iter.remove();
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        private void sayHelloWorld(ServerSocketChannel server) throws IOException {
            try (SocketChannel client = server.accept();) {          client.write(Charset.defaultCharset().encode("Hello world!"));
            }
        }
       // 省略了与前面类似的 main
    }
```

这个非常精简的样例掀开了 NIO 多路复用的流程

- 首先，通过 Selector.open() 创建一个 Selector，作为类似调度员的角色。
- 然后，创建一个 ServerSocketChannel，并且向 Selector 注册，通过指定 SelectionKey.OP_ACCEPT，告诉调度员，它关注的是新的连接请求。
  - **注意**，为什么我们要明确配置非阻塞模式呢？这是因为阻塞模式下，注册操作是不允许的，会抛出 IllegalBlockingModeException 异常。
- Selector 阻塞在 select 操作，当有 Channel 发生接入请求，就会被唤醒。
- 在 sayHelloWorld 方法中，通过 SocketChannel 和 Buffer 进行数据操作，在本例中是发送了一段字符串。

## 语法糖

### 什么是语法糖？

**语法糖（Syntactic sugar）** 代指的是编程语言为了方便程序员开发程序而设计的一种特殊语法，这种语法对编程语言的功能并没有影响。实现相同的功能，基于语法糖写出来的代码往往更简单简洁且更易阅读。

举个例子，Java 中的 `for-each` 就是一个常用的语法糖，其原理其实就是基于普通的 for 循环和迭代器。

```java
String[] strs = {"JavaGuide", "公众号：JavaGuide", "博客：https://javaguide.cn/"};
for (String s : strs) {
    System.out.println(s);
}
```

不过，JVM 其实并不能识别语法糖，Java 语法糖要想被正确执行，需要先通过编译器进行解糖，也就是在程序编译阶段将其转换成 JVM 认识的基本语法。这也侧面说明，Java 中真正支持语法糖的是 Java 编译器而不是 JVM。如果你去看`com.sun.tools.javac.main.JavaCompiler`的源码，你会发现在`compile()`中有一个步骤就是调用`desugar()`，这个方法就是负责解语法糖的实现的。

### Java 中有哪些常见的语法糖？

Java 中最常用的语法糖主要有泛型、自动拆装箱、变长参数、枚举、内部类、增强 for 循环、try-with-resources 语法、lambda 表达式等。
