---
title: Java 基础面试三
cover: https://raw.githubusercontent.com/dunwu/images/master/archive/2025/03/020ab2bf4af8401590e0291a34f873f8.jpg
date: 2024-07-12 08:18:58
order: 3
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
permalink: /pages/7704a3fb/
---

# Java 基础面试三

## Java 泛型

### 【中等】Java 泛型的作用是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 泛型 / 基础概念

#### 💎 关键结论

泛型通过类型参数把类型检查提前到编译期：既保证类型安全、避免运行时 `ClassCastException`，又消除强制转换、实现代码复用。代价是类型擦除——泛型信息只在编译期有效。

#### ⚡记忆卡片

- **口诀**：类型作参数，编译保安全，运行被擦除，转换全免掉
- **关键词**：类型参数 ／ 类型安全 ／ 类型擦除
- **链路**：类型参数 `<T>` → 编译期类型检查 → 运行时擦除为原始类型 → 编译器自动插入强转

#### 📖 核心知识

1. **是什么**：泛型允许在**类、接口、方法**上使用**类型参数（如 `<T>`）**，使代码能适应多种数据类型，同时保证类型安全。
2. **类型安全**：编译时检查类型，避免运行时 `ClassCastException`。
3. **代码复用**：同一套逻辑可处理不同数据类型（如 `List<String>` 和 `List<Integer>`）。
4. **消除强制转换**：直接使用泛型类型，无需手动转换（`(String) list.get(0)` 变为直接 `list.get(0)`）。
5. **相关语法**：
   - **类型擦除**：泛型仅在编译时有效，运行时类型信息会被擦除（`List<String>` 运行时变成 `List`）。
   - **通配符 `<?>`**：表示未知类型（如 `List<?>` 可接受任意类型的 `List`）。
   - **界限限定**：`T extends Class` 限定类型范围（如 `<T extends Number>`）；`<? super T>` 支持父类类型。

::: details 泛型类简单示例

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

:::

**一句话总结**：泛型让代码更灵活、安全，减少冗余和运行时错误。

#### 🔬 扩展知识

::: details

- 【L3】泛型只是编译期机制：`List<String>` 和 `List<Integer>` 擦除后都是 `List`，运行时 `getClass()` 结果相同，详见本文档「泛型擦除的作用是什么？」。
- 【L4】与 C++ 模板对比：C++ 模板对每个实例化类型做代码展开（可能代码膨胀），Java 泛型通过擦除共享同一份字节码；Rust/Kotlin 的泛型则走单态化路线，更接近 C++。

:::

#### 🔀 发散问题

- **Q：泛型为什么不支持基本类型？** → 擦除后类型参数被替换为 `Object`，基本类型不是 `Object` 的子类，只能用包装类（如 `List<Integer>`）。
- **Q：`List<String>` 是 `List<Object>` 的子类型吗？** → 不是，泛型是**不变的（invariant）**；需要协变读取时使用 `List<? extends Object>`。

### 【中等】什么是 Java 泛型的上下界限定符？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 泛型 / 通配符与 PECS

#### 💎 关键结论

上下界限定符用于限制泛型类型参数的范围：`? extends T`（上界）只读不写，`? super T`（下界）可写难读，遵循 PECS 原则——生产者用 `extends`、消费者用 `super`。

#### ⚡记忆卡片

- **口诀**：上界只读，下界只写，生产 extends，消费 super
- **关键词**：上界限定 ／ 下界限定 ／ PECS
- **链路**：`? extends T`（读）→ PECS 判断角色 → `? super T`（写）

#### 📖 核心知识

Java 泛型的上下界限定符用于**限制泛型类型参数的范围**，确保类型安全，提供更灵活的类型约束。

**1. 上界限定符（`<? extends T>`）**：限定泛型类型必须是 `T` **或其子类**（`T` 可以是类或接口）。

- **只读安全**：能安全读取数据（因为元素至少是 `T` 类型）。
- **不能写入**：无法确定具体子类型，防止类型污染。

```java
// 接受 Number 或其子类（如 Integer, Double）
void printList(List<? extends Number> list) {
    for (Number num : list) {  // 安全读取
        System.out.println(num);
    }
    // list.add(1);  // 编译错误！无法安全写入
}
```

**2. 下界限定符（`<? super T>`）**：限定泛型类型必须是 `T` **或其父类**。

- **可写入**：能安全添加 `T` 及其子类的对象。
- **读取受限**：只能以 `Object` 类型读取（因为父类型不确定）。

```java
// 接受 Integer 或其父类（如 Number, Object）
void addNumbers(List<? super Integer> list) {
    list.add(1);     // 安全写入 Integer
    list.add(2);
    // Integer num = list.get(0);  // 编译错误！需强制转换
    Object obj = list.get(0);      // 只能以 Object 读取
}
```

**3. 通配符限定对比**

| 类型 | 语法          | 读取           | 写入             | 应用           |
| :--- | :------------ | :------------- | :--------------- | :------------- |
| 上界 | `? extends T` | 安全（作为 T） | 禁止             | 生产者场景     |
| 下界 | `? super T`   | 需转 Object    | 安全（T 及子类） | 消费者场景     |
| 无界 | `?`           | 作为 Object    | 禁止             | 完全不确定类型 |

**4. PECS 原则**（Producer-Extends, Consumer-Super）指导何时用哪种限定符：

- **生产者（Producer）** 用 `extends`（输出数据），如遍历 `List<? extends Number>`。
- **消费者（Consumer）** 用 `super`（输入数据），如 `Collections.copy(dest<? super T>, src<? extends T>)`。

#### 🔬 扩展知识

::: details

- 【L3】上界集合禁止写入的根因：`List<? extends Number>` 实际可能是 `List<Integer>` 或 `List<Double>`，编译器无法确定具体子类型，任何写入都可能破坏类型安全；唯一例外是写入 `null`。
- 【L4】`Collections.copy(List<? super T> dest, List<? extends T> src)` 是 PECS 的经典签名范例；`Collection.addAll(Collection<? extends E> c)` 同理。

:::

#### 🔀 发散问题

- **Q：为什么 `List<? extends Number>` 不能 `add(Integer)`？** → 它的实际类型可能是 `List<Double>`，写入 `Integer` 会破坏类型安全，编译器一律禁止。
- **Q：无界通配符 `List<?>` 和 `List<Object>` 有何区别？** → `List<?>` 可接受任意类型的 List（只读）；`List<Object>` 是具体类型，`List<String>` 不能赋值给它。

### 【中等】泛型擦除的作用是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 泛型 / 类型擦除

#### 💎 关键结论

泛型擦除是 Java 泛型的实现机制：编译期检查类型安全，运行时丢弃类型参数（替换为原始类型或边界类型），以此兼容旧版字节码、避免为每个泛型实例生成新类，代价是运行时拿不到泛型参数。

#### ⚡记忆卡片

- **口诀**：编译期检查，运行期擦除，无界变 Object，有界变边界
- **关键词**：原始类型 ／ 桥接转换 ／ Class 令牌
- **链路**：编译期类型检查 → 擦除为原始类型 → 编译器插入强转 → 需要时显式传 `Class<T>` 补回类型

#### 📖 核心知识

泛型擦除是 Java 在**编译时检查类型安全**、**运行时丢弃类型信息**的折中设计，平衡了兼容性、性能和类型安全，但牺牲了部分运行时灵活性。

1. **机制**：编译时泛型类型（如 `<T>`、`List<String>`）会被检查；运行时所有泛型信息被擦除，替换为**原始类型（Raw Type）**或**边界类型（如 `Object`/`extends` 上限）**。

2. **擦除规则**：

| 泛型定义                           | 擦除后类型           | 示例                             |
| ---------------------------------- | -------------------- | -------------------------------- |
| **无界限 `<T>`**                   | `Object`             | `List<T>` → `List`               |
| **有界限 `<T extends Number>`**    | `Number`（边界类型） | `Box<T>` → `Box<Number>`         |
| **通配符 `<?>` / `<? extends T>`** | 边界类型             | `List<?>` → `List`               |
| **`<? super T>`**                  | `Object`             | `List<? super Integer>` → `List` |

3. **擦除的作用**：
   - **兼容性**：确保泛型代码能与旧版 Java（非泛型）字节码兼容。
   - **运行时效率**：避免为每个泛型类型生成新类，减少 JVM 负担。
   - **简化设计**：统一类型系统，避免 C++ 模板的复杂性。

4. **擦除带来的问题**：
   - **类型信息丢失**：运行时无法获取泛型参数（`List<String>` 和 `List<Integer>` 运行时都是 `List`）。

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

#### 🔬 扩展知识

::: details

- 【L3】绕过擦除的两种方式：**显式传递 `Class<T>`**（通过反射保留类型信息）和**类型令牌（Type Token）**——利用匿名子类捕获泛型类型，原理是子类会在字节码签名（Signature 属性）中保留父类的实际类型参数，可通过 `getGenericSuperclass()` 读回。

  ```java
  <T> void create(Class<T> clazz) {
      T instance = clazz.newInstance();  // 运行时知道具体类型
  }

  new TypeToken<List<String>>() {};  // Guava 提供的方案
  ```

- 【L3】典型问题与解决方案：

  | 问题场景                                                                 | 解决方案                                          |
  | ------------------------------------------------------------------------ | ------------------------------------------------- |
  | 需要运行时获取泛型类型                                                   | 传递 `Class<T>` 参数或使用 Type Token             |
  | 泛型数组创建（`new T[]`）                                                | 使用 `Object[]` 转换或反射（`Array.newInstance`） |
  | 方法重载冲突（如 `void foo(List<String>)` 和 `void foo(List<Integer>)`） | 编译报错（擦除后方法签名相同）                    |

- 【L4】擦除的兼容代价：泛型字节码与非泛型字节码二进制兼容，因此 Java 5 引入泛型时未破坏存量代码；而 C++ 模板每个实例化生成独立代码，无此兼容红利但保留了完整类型信息。

:::

#### 🔀 发散问题

- **Q：`new T[]` 为什么非法？** → 擦除后运行时不知道 `T` 的实际类型，无法确定数组元素类型；需用 `Array.newInstance(clazz, size)` 配合 `Class<T>` 创建。
- **Q：泛型能用于 static 字段吗？** → 不能，静态成员属于类而非某个参数化实例，无法引用类型参数 `T`。

## Java 反射

### 【简单】什么是反射？反射有什么作用？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 反射 / 核心概念

#### 💎 关键结论

反射是 Java 在运行时获取并操作类信息（构造对象、调用方法、访问字段、读注解）的动态机制，是 Spring、ORM、动态代理等框架的基石，代价是性能开销和安全封装的破坏。

#### ⚡记忆卡片

- **口诀**：运行取类信，动态造调改，框架全靠它，慢在检查装箱
- **关键词**：Class ／ Method.invoke ／ setAccessible
- **链路**：获取 `Class` 对象 → 拿 `Method`/`Field`/`Constructor` → `newInstance`/`invoke`/`get/set`

#### 📖 核心知识

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

- **动态代理**（如插件化开发）
- **依赖注入**（如 Spring 的依赖注入）
- **ORM**（Hibernate 的 ORM 映射）
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

#### 🔬 扩展知识

::: details

**【L3】反射为什么慢？——性能开销的定量分析**

`Method.invoke()` 比直接调用慢 **10~100 倍**（热点代码 JIT 优化后可缩小到 2~5 倍）。性能开销来自三个层面：

**1. 方法访问检查（Access Check）**

```java
// Method.invoke() 内部每次调用都需要：
// ① 检查方法修饰符（public/protected/private）
// ② 检查调用者是否有权限访问（Reflection.getCallerClass()）
// ③ 检查参数类型和数量是否匹配
```

**2. 参数装箱/拆箱（Auto-boxing）**

```java
// invoke() 的参数和返回值都是 Object 数组，每个基本类型参数都要装箱
method.invoke(target, 42, true);  // int→Integer, boolean→Boolean
// 返回 Object，调用方需要拆箱
int result = (int) method.invoke(target, 42);  // Integer→int
```

**3. JIT 内联困难**

```java
// 直接调用：JIT 可以轻松内联
target.setName("Bob");  // HotSpot 将方法体直接嵌入调用点

// 反射调用：JIT 无法内联（因为 invoke() 的目标在编译时不确定）
method.invoke(target, "Bob");  // 必须在运行时查找 MethodAccessor
```

#### 🔬 反射的 Inflation 优化机制

JDK 对反射做了 **Inflation**（膨胀）优化，让频繁调用的反射方法越来越快：

```
调用次数    →    访问器类型       →    性能
────────────────────────────────────────────
0~15 次    →    NativeMethodAccessor（JNI）   慢（每次跨 JNI 边界）
16+ 次     →    GeneratedMethodAccessor（字节码） 快（接近直接调用）
            （通过 ASM 动态生成一个 accessor 类，直接用 invokespecial 调用目标方法）
```

可通过 `-Dsun.reflect.inflationThreshold=0` 跳过 JNI 阶段，直接使用字节码 accessor。

**【L4】跨语言视角：反射的三种设计哲学**

| 语言       | 反射机制                                              | 核心差异                                                |
| :--------- | :---------------------------------------------------- | :------------------------------------------------------ |
| **Java**   | `java.lang.reflect` + `MethodHandle`（JDK 7+）        | 编译期类型擦除 → 反射是恢复类型信息的唯一途径           |
| **Go**     | `reflect` 包                                          | 无继承/多态，反射主要用于序列化、ORM 等框架层           |
| **Python** | `getattr`/`setattr`/`hasattr`（内置）+ `inspect` 模块 | 动态类型语言，"反射"概念被弱化为普通操作                |
| **Rust**   | 无运行时反射                                          | 通过 `#[derive]` + trait + 宏在编译期生成，零运行时开销 |

**Go 的反思**：Go 有 `reflect` 但设计者 Rob Pike 曾公开表示"反射永远不应该是你代码的核心"——因为 Go 没有 Java 的 JIT 优化，每次 `reflect.Value.Call()` 都是纯解释执行，性能差距可达 100 倍以上。Java 的 Inflation 优化（JNI → 字节码 accessor）正是 Go 缺乏的。

**Rust 的零成本替代**：Rust 选择"编译期反射"——通过 `proc macro` 在编译时展开代码，完全消除运行时开销。代价是：任何反射需求必须在编译时声明（`#[derive(Serialize)]` 等）。这是一种哲学取舍：**Java 选择运行时灵活性，Rust 选择编译期安全性**。

**【L4】GraalVM Native Image 对反射的限制**

GraalVM 将 Java 编译为**原生可执行文件**时，采用的是 **closed-world assumption**（闭世界假设）——只有通过静态分析可达的代码才会被编译。反射的 `Class.forName("动态类名")` 在编译期无法确定目标类，导致：

1. 默认**不支持运行时反射**（运行时调用 `Class.forName` 会抛出异常）
2. 必须通过 `reflect-config.json` 预注册所有需要通过反射访问的类、方法、字段
3. 动态代理、CGLIB 等运行时生成字节码的技术在 Native Image 中**不可用**

这意味着：Spring 应用迁移到 GraalVM Native Image 时，所有 `@Autowired`、AOP 代理、MyBatis Mapper 代理等依赖反射/动态代理的功能，都必须在编译期通过 AOT 处理或配置注册——这是 Java 生态从“动态运行时”向“静态编译”转型的最大挑战。

:::

#### 🔀 发散问题

- **Q：获取 `Class` 对象有哪几种方式？** → 三种：`类名.class`、`对象.getClass()`、`Class.forName("全限定类名")`（需处理 `ClassNotFoundException`）。
- **Q：反射为什么能破坏单例？** → 可通过 `getDeclaredConstructor()` + `setAccessible(true)` 调用私有构造器创建新实例；枚举单例因 JVM 在 `newInstance` 中强制拦截而免疫。

### 【简单】反射有什么优缺点？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 反射 / 优缺点与优化

#### 💎 关键结论

反射的优点是高动态性、可访问私有成员、支持泛型擦除后的类型操作；缺点是性能较差、可读性下降、有安全隐患。工程中通过缓存反射对象和限制 `setAccessible` 来扬长避短。

#### ⚡记忆卡片

- **口诀**：动态破封装，慢且不直观，缓存反射件，慎用 accessible
- **关键词**：动态性 ／ 性能开销 ／ 破坏封装
- **链路**：优点（动态/私有/擦除后操作）→ 缺点（慢/可读性/安全）→ 优化（缓存/getDeclaredXXX）

#### 📖 核心知识

1. **优点与缺点对比**：

| **优点**                   | **缺点**                 |
| -------------------------- | ------------------------ |
| 动态性高（运行时决定行为） | 性能较差（比直接调用慢） |
| 可访问私有成员（突破封装） | 代码可读性降低           |
| 支持泛型擦除后的类型操作   | 安全隐患（如破坏单例）   |

2. **性能优化建议**：
   - **缓存 `Class`/`Method`/`Field` 对象**：避免重复反射调用。
   - **优先使用 `getDeclaredXXX`**：比 `getXXX` 更高效（不检查继承链）。
   - **限制 `setAccessible(true)`**：频繁调用影响性能。

3. **注意事项**：
   - **反射可以破坏封装性**（如修改 `final` 字段、调用私有方法）。
   - **慎用 `setAccessible(true)`**：可能导致安全漏洞（如绕过权限检查）。

#### 🔬 扩展知识

::: details

- 【L3】反射慢的量化：`Method.invoke()` 比直接调用慢 10~100 倍，开销来自访问检查、参数装箱、JIT 内联困难三层；JIT 优化与 Inflation 机制可显著缩小差距，详见本文档「什么是反射？反射有什么作用？」。
- 【L4】JDK 9+ 模块系统下，跨模块反射访问未 `opens` 的包会被拒绝，`setAccessible(true)` 不再万能，需加 `--add-opens` 参数。

> 📚 延伸阅读：[Java Reflection: Why is it so slow?](https://stackoverflow.com/questions/1392351/java-reflection-why-is-it-so-slow)

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “反射性能很差，绝对不能在循环里用” → 慢的是重复查找与调用，缓存 `Method`/`Field` 对象并配合 JIT 优化后，热点反射可接近直接调用的数量级；框架（Spring/MyBatis）大量使用反射依然高性能。
- ❌ “`setAccessible(true)` 只是跳过一次检查，无副作用” → 它会长期关闭访问控制，既破坏封装又可能引入安全漏洞，在模块系统下还可能直接报错。

:::

#### 🔀 发散问题

- **Q：反射能修改 final 字段吗？** → 低版本 JDK 可通过反射修改普通 final 字段，但 JDK 12+ 已禁止通过反射修改 final 字段（抛 `IllegalAccessException`）。
- **Q：什么时候该避免反射？** → 能用接口/多态解决的场景不用反射；反射适合框架层（依赖注入、ORM、代理），业务代码应尽量直接调用。

### 【中等】什么是 Java 中的动态代理？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 反射 / 动态代理

#### 💎 关键结论

动态代理通过 `Proxy` + `InvocationHandler` 在运行时生成接口代理对象，不修改原代码即可拦截和增强方法调用，是 Spring AOP、RPC 框架的核心技术；局限是只能代理接口。

#### ⚡记忆卡片

- **口诀**：接口生成代理，invoke 统一拦截，非侵入增强，AOP 靠它实现
- **关键词**：Proxy ／ InvocationHandler ／ 基于接口
- **链路**：`Proxy.newProxyInstance()` 生成代理 → 调用转发到 `invoke()` → 增强后 `method.invoke()` 真实对象

#### 📖 核心知识

动态代理是一种在**运行时**动态创建代理对象的技术，允许在不修改原始类代码的情况下，**增强或拦截**目标对象的方法调用。

Java 动态代理通过 `Proxy` 和 `InvocationHandler` 在运行时生成接口代理对象，**非侵入式**地实现方法拦截和功能增强，是 AOP 和框架设计的核心技术。

- **`java.lang.reflect.Proxy`**：提供静态方法创建代理对象（核心方法：`Proxy.newProxyInstance()`）。
- **`java.lang.reflect.InvocationHandler`**：接口，实现代理逻辑（核心方法：`invoke()`）。

【示例】动态代理示例

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 1. 定义接口
interface Hello {
    void sayHello();
}

// 2. 实现接口
class HelloImpl implements Hello {
    public void sayHello() {
        System.out.println("Hello World!");
    }
}

public class SimpleProxyDemo {
    public static void main(String[] args) {
        // 3. 创建实际对象
        Hello realHello = new HelloImpl();

        // 4. 创建代理对象
        Hello proxyHello = (Hello) Proxy.newProxyInstance(
            Hello.class.getClassLoader(), // 类加载器
            new Class<?>[] { Hello.class }, // 代理的接口
            new InvocationHandler() { // 调用处理器
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    System.out.println("Before method call");
                    Object result = method.invoke(realHello, args); // 调用真实对象的方法
                    System.out.println("After method call");
                    return result;
                }
            });

        // 5. 通过代理对象调用方法
        proxyHello.sayHello();
    }
}
```

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

#### 🔬 扩展知识

::: details

**【L4】跨语言视角：代理模式的三种实现**

| 语言/环境      | 代理机制                      | 核心差异                                                             |
| :------------- | :---------------------------- | :------------------------------------------------------------------- |
| **Java**       | `Proxy` + `InvocationHandler` | 基于接口 + 反射，运行时动态生成                                      |
| **JavaScript** | `new Proxy(target, handler)`  | 原生语言支持，可拦截任意操作（属性访问、函数调用、构造器），无需接口 |
| **Python**     | `@decorator` 或 `__getattr__` | 装饰器是语法糖（函数级代理），`__getattr__` 是对象级代理             |
| **Go**         | 无原生动态代理                | 通过 `interface{}` + type assertion 实现，编译期类型检查强           |

JavaScript 的 `Proxy` 是最强大的实现——它能拦截 13 种操作（get、set、has、construct、apply 等），远超 Java 只能拦截方法调用。Vue 3 的响应式系统就是用 `Proxy` 替代了 Vue 2 的 `Object.defineProperty`。Python 的装饰器则更轻量——它是一个函数，接收函数返回新函数，常用于日志、权限、缓存等场景，比 Java 的代理更直观简洁。

**【L3】扩展：CGLIB 动态代理**

- **原理**：通过字节码技术生成目标类的子类代理。
- **特点**：可代理普通类，但无法代理 `final` 类/方法。

:::

#### 🔀 发散问题

- **Q：JDK 动态代理为什么只能代理接口？** → `Proxy.newProxyInstance()` 生成的代理类 `$Proxy0` 已继承 `java.lang.reflect.Proxy`，Java 单继承限制下只能再实现接口；代理普通类需用 CGLIB（继承方式）。
- **Q：Spring AOP 是如何选择代理方式的？** → 目标类有接口默认用 JDK 动态代理，无接口自动切换 CGLIB；可用 `@EnableAspectJAutoProxy(proxyTargetClass=true)` 强制 CGLIB，详见本文档「JDK 动态代理和 CGLIB 动态代理有什么区别？」。

### 【中等】JDK 动态代理和 CGLIB 动态代理有什么区别？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 反射 / 代理实现对比

#### 💎 关键结论

JDK 动态代理基于接口、用反射实现，轻量但要求目标有接口；CGLIB 基于继承、用 ASM 生成子类，可代理普通类但无法代理 final 类/方法。现代 JVM 下两者性能差距已不明显。

#### ⚡记忆卡片

- **口诀**：JDK 靠接口，CGLIB 靠继承，final 拦 CGLIB，无接口选 CGLIB
- **关键词**：基于接口 ／ 基于继承 ／ ASM 字节码
- **链路**：看目标有无接口 → 有接口选 JDK 代理 → 无接口/高频调用选 CGLIB

#### 📖 核心知识

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

#### 🔬 扩展知识

::: details

**【L4】CGLIB 的现状与 ByteBuddy 的崛起**

CGLIB 曾是 Java 生态中字节码增强的事实标准，但近年来已被 **ByteBuddy** 逐步取代：

| 对比            | CGLIB                                  | ByteBuddy                                  |
| :-------------- | :------------------------------------- | :----------------------------------------- |
| **活跃度**      | 2015 年后几乎停更                      | 持续活跃维护（最新版本 2024+）             |
| **API 易用性**  | 低（`Enhancer` + `MethodInterceptor`） | 高（流式 API + 类型安全）                  |
| **JDK 兼容性**  | JDK 17+ 反射限制导致报错               | 完美支持 JDK 8~21+                         |
| **Spring 选择** | Spring 4.x 之前默认                    | Spring 5+ / Spring Boot 3+ 转向 ByteBuddy  |
| **Hibernate**   | —                                      | Hibernate 5+ 使用 ByteBuddy 替代 Javassist |
| **Mockito**     | —                                      | Mockito 2+ 放弃 CGLIB，全面迁移 ByteBuddy  |

面试中如果能说出“Spring Boot 3.x 已经默认使用 ByteBuddy 而非 CGLIB”，表明你关注生态演进，而非停留在历史答案。

:::

#### 🔀 发散问题

- **Q：为什么 CGLIB 不能代理 final 类/方法？** → CGLIB 靠生成子类实现代理，final 类不能被继承、final 方法不能被重写，因此无法增强。
- **Q：Spring Boot 3 时代还需要背 CGLIB 吗？** → 原理仍需理解（面试高频），但要知道生态现状：Mockito 2+、Hibernate 5+ 已迁往 ByteBuddy，Spring Boot 3.x 也默认 ByteBuddy。

## Java 注解

### 【中等】Java 中的注解原理是什么？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 注解 / 原理

#### 💎 关键结论

注解本质是继承 `java.lang.annotation.Annotation` 的特殊接口，通过 `@Retention` 决定生命周期：编译期由 APT/编译器处理，运行时由反射读取，从而实现元数据编程。

#### ⚡记忆卡片

- **口诀**：注解即接口，保留看 Retention，编译 APT，运行靠反射
- **关键词**：元数据 ／ RetentionPolicy ／ APT
- **链路**：定义注解（元注解约束）→ 编译期处理（APT/检查）→ 运行时反射读取 → 框架增强（AOP）

#### 📖 核心知识

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

### 【中等】如何自定义注解并使用注解处理器？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 注解 / 自定义与 APT

#### 💎 关键结论

自定义注解用 `@interface` 声明，由元注解（`@Target`/`@Retention` 等）约束行为；运行时注解用反射读取，编译期注解通过继承 `AbstractProcessor` 的注解处理器（APT）生成代码，Lombok/MapStruct 都是这个原理。

#### ⚡记忆卡片

- **口诀**：@interface 定义，元注解约束，运行反射读，编译 APT 生成
- **关键词**：@Target ／ AbstractProcessor ／ META-INF 注册
- **链路**：定义注解 → 标注使用 → 反射读取或 APT 处理 → 生成代码/增强行为

#### 📖 核心知识

**自定义注解**：

```java
@Target(ElementType.METHOD)           // 作用目标
@Retention(RetentionPolicy.RUNTIME)   // 保留策略
@Documented
public @interface MyAnnotation {
    String value() default "";
    int priority() default 0;
}
```

**元注解详解**：

| **元注解**    | **作用**                                   |
| ------------- | ------------------------------------------ |
| `@Target`     | 作用目标（TYPE/FIELD/METHOD/PARAMETER 等） |
| `@Retention`  | 保留策略（SOURCE/CLASS/RUNTIME）           |
| `@Documented` | Javadoc 包含                               |
| `@Inherited`  | 子类继承（仅类级别）                       |
| `@Repeatable` | 可重复（Java 8+）                          |

**使用与读取**：

```java
@MyAnnotation(value = "test", priority = 1)
public void process() { ... }

// 反射读取
Method method = clazz.getMethod("process");
MyAnnotation anno = method.getAnnotation(MyAnnotation.class);
```

**注解处理器（Annotation Processor）**：编译期处理注解，生成代码（如 Lombok）。

```java
@SupportedAnnotationTypes("com.example.MyAnnotation")
public class MyProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations,
                           RoundEnvironment roundEnv) {
        for (Element e : roundEnv.getElementsAnnotatedWith(MyAnnotation.class)) {
            // 用 Filer 生成源文件
        }
        return true;
    }
}
```

注册：`META-INF/services/javax.annotation.processing.Processor` 写入全限定名。

**典型应用**：Lombok、ButterKnife、MapStruct、Dagger。

## Java 枚举

### 【中等】Java 枚举的原理是什么？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 枚举 / 原理

#### 💎 关键结论

枚举是 JDK 5 引入的语法，本质是继承 `java.lang.Enum` 的 final 类，每个枚举常量是类加载时创建的单例实例；JVM 保证其唯一性，反射也无法创建新枚举实例。

#### ⚡记忆卡片

- **口诀**：枚举即 final 类，常量即单例，反射造不出，序列化不破坏
- **关键词**：java.lang.Enum ／ ordinal ／ 单例
- **链路**：编译为继承 `Enum` 的 final 类 → 静态常量实例化 → switch 按 ordinal 比较

#### 📖 核心知识

Java 枚举（`enum`）从 JDK 5 引入，**本质是继承自 `java.lang.Enum` 的 final 类**，每个枚举常量是类的单例实例。

**编译前**：

```java
public enum Color {
    RED, GREEN, BLUE;
}
```

**编译后等价于**（伪代码）：

```java
public final class Color extends java.lang.Enum<Color> {
    public static final Color RED = new Color("RED", 0);
    public static final Color GREEN = new Color("GREEN", 1);
    public static final Color BLUE = new Color("BLUE", 2);

    private Color(String name, int ordinal) { super(name, ordinal); }

    public static Color[] values() { /* 返回所有常量 */ }
    public static Color valueOf(String name) { /* 按名称查找 */ }
}
```

**枚举的核心特性**：

| **特性**        | **说明**                                    |
| --------------- | ------------------------------------------- |
| **继承关系**    | 隐式继承 `java.lang.Enum`，无法再继承其他类 |
| **final 修饰**  | 枚举类不可被继承（防止破坏单例）            |
| **实例唯一性**  | 每个常量是 JVM 级别的单例（类加载时创建）   |
| **可定义成员**  | 字段、方法、构造器（仅 private 包访问）     |
| **可实现接口**  | 弥补无法继承的限制                          |
| **支持 switch** | 编译器优化为 `ordinal` 比较                 |

**带属性和方法的枚举**：

```java
public enum OrderStatus {
    PENDING(0, "待支付"),
    PAID(1, "已支付"),
    SHIPPED(2, "已发货"),
    COMPLETED(3, "已完成");

    private final int code;
    private final String desc;

    OrderStatus(int code, String desc) {  // 构造器默认 private
        this.code = code;
        this.desc = desc;
    }

    public int getCode() { return code; }
    public String getDesc() { return desc; }

    // 实现接口方法或抽象方法
    public boolean canCancel() {
        return this == PENDING;
    }
}
```

**枚举与反射**：

- `Constructor.newInstance()` **禁止创建枚举对象**（源码有强制检查）。
- `Enum.valueOf()` 是获取枚举实例的安全方式。

### 【中等】为什么说枚举是实现单例的最佳方式？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 枚举 / 单例

#### 💎 关键结论

枚举单例由 JVM 从三个层面保证安全：类加载机制保证线程安全、`newInstance` 强制拦截反射攻击、序列化仅存名称防止反序列化创建新实例，是《Effective Java》推荐的写法。

#### ⚡记忆卡片

- **口诀**：一行枚举即单例，加载安全防反射，序列化只存名
- **关键词**：clinit ／ 反射拦截 ／ readResolve 免疫
- **链路**：类加载 `<clinit>` 创建实例 → 反射 `newInstance` 拦截 → 序列化仅写名称、`valueOf` 返回已有实例

#### 📖 核心知识

《Effective Java》Item 3 明确推荐：**单元素的枚举类型是实现 Singleton 的最佳方法**。

**枚举单例的优势**：

```java
public enum Singleton {
    INSTANCE;

    public void doSomething() { /* ... */ }
}

// 使用
Singleton.INSTANCE.doSomething();
```

| **对比维度**     | **枚举单例** | **饿汉式**        | **懒汉式（DCL）**        | **静态内部类**    |
| ---------------- | ------------ | ----------------- | ------------------------ | ----------------- |
| **线程安全**     | ✔️ JVM 保证  | ✔️ 类加载保证     | ✔️ volatile+synchronized | ✔️ 类加载保证     |
| **防反射攻击**   | ✔️ 强制禁止  | ❌ 可破坏         | ❌ 可破坏                | ❌ 可破坏         |
| **防序列化破坏** | ✔️ 自动处理  | ❌ 需 readResolve | ❌ 需 readResolve        | ❌ 需 readResolve |
| **懒加载**       | ❌ 否        | ❌ 否             | ✔️ 是                    | ✔️ 是             |
| **代码简洁**     | ⭐ 最简洁    | 简单              | 复杂                     | 较简单            |

**枚举单例的底层保证**：

1. **类加载线程安全**：枚举实例在类加载的 `<clinit>` 阶段创建，JVM 保证原子性。
2. **反射防御**：`Constructor.newInstance()` 源码中检查 `Enum`，直接抛异常。
3. **序列化特殊处理**：枚举的序列化/反序列化由 JVM 特殊处理，仅写入名称，反序列化时通过 `valueOf` 返回已有实例。

**枚举单例的局限**：

- **无法懒加载**：枚举类加载时即创建实例。
- **无法继承其他类**（枚举已继承 `Enum`）。

### 【简单】EnumMap 和 EnumSet 有什么用？⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java 枚举 / 专用容器

#### 💎 关键结论

EnumMap 和 EnumSet 是专为枚举优化的容器：EnumMap 用 ordinal 作数组下标，EnumSet 用 long 位图，O(1) 操作且内存极小，应替代以枚举为键/元素的 HashMap/HashSet。

#### ⚡记忆卡片

- **口诀**：枚举当键用 EnumMap，枚举集合用 EnumSet，数组位图快又省
- **关键词**：ordinal 数组 ／ 位图 ／ O(1)
- **链路**：枚举键 → `ordinal()` 定位 → 数组/位图直接存取

#### 📖 核心知识

`EnumMap` 和 `EnumSet` 是专为枚举优化的高性能容器，**基于序号（ordinal）的数组实现**。

**EnumMap**：

```java
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

EnumMap<Day, String> schedule = new EnumMap<>(Day.class);
schedule.put(Day.MON, "开会");
schedule.put(Day.FRI, "周报");

// 内部实现：Object[] values = new Object[Day.values().length]
// 索引 = key.ordinal()
```

**EnumSet**：

```java
EnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);
EnumSet<Day> workdays = EnumSet.range(Day.MON, Day.FRI);
EnumSet<Day> all = EnumSet.allOf(Day.class);

// 内部实现：当枚举数 ≤ 64 时用 RegularEnumSet（一个 long 位图）
// 否则用 JumboEnumSet（long[] 位图）
```

**性能对比**：

| **容器** | **底层**             | **时间复杂度** | **内存占用**         |
| -------- | -------------------- | -------------- | -------------------- |
| EnumMap  | 数组（索引=ordinal） | O(1)           | 极小（固定长度数组） |
| EnumSet  | 位图（bitmask）      | O(1)           | 极小（1 个 long）    |
| HashMap  | 哈希表               | O(1) 平均      | 较大（节点+桶）      |
| HashSet  | HashMap              | O(1) 平均      | 较大                 |

**适用场景**：

- 枚举作为键的 Map → 用 `EnumMap` 替代 `HashMap`。
- 枚举集合操作（权限、状态组合）→ 用 `EnumSet` 替代 `HashSet`。

## Java SPI

### 【中等】什么是 SPI，有什么用？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java SPI / 服务发现

#### 💎 关键结论

SPI 通过“接口 + `META-INF/services` 配置文件”实现运行时服务发现，让接口与实现解耦、支持可插拔扩展；JDBC 驱动、SLF4J 日志实现都靠它，局限是会一次性加载所有实现。

#### ⚡记忆卡片

- **口诀**：接口定标准，文件写实现，ServiceLoader 加载，即插即用
- **关键词**：META-INF/services ／ ServiceLoader ／ 可插拔
- **链路**：定义接口 → `META-INF/services/接口全限定名` 写实现类 → `ServiceLoader.load()` 加载

#### 📖 核心知识

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

| **优势**       | **局限**                                  |
| -------------- | ----------------------------------------- |
| 实现热插拔     | 配置文件需严格规范                        |
| 解耦接口与实现 | 原生 SPI 会加载所有实现类（可能浪费资源） |
| 扩展性强       | 无默认实现筛选机制                        |

**与 API 的区别**

| **维度** | **SPI**                  | **API**                  |
| -------- | ------------------------ | ------------------------ |
| 调用方向 | 由实现方提供，调用方选择 | 由提供方定义，调用方使用 |
| 控制权   | 调用方控制               | 提供方控制               |
| 典型场景 | JDBC 驱动、日志实现      | Java 标准库              |

#### 🔬 扩展知识

::: details

- 【L3】`ServiceLoader` 的加载行为：通过 `iterator()` 懒加载，但实践中常遍历全部实现；原生 SPI 无按需加载、无默认实现筛选，配置文件格式错误直接抛 `ServiceConfigurationError`。
- 【L3】改进方案：
  - **Dubbo SPI**：增加按需加载（扩展点 key-value 配置）、扩展点缓存、IOC/AOP 等优化。
  - **Spring Factories**：`META-INF/spring.factories` 机制（Spring Boot 3 后迁移到 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`）。
- 【L4】Java 9 模块化后，SPI 可用 `module-info.java` 的 `uses`/`provides` 声明，替代配置文件写法。

:::

#### 🔀 发散问题

- **Q：JDBC 是如何用 SPI 加载驱动的？** → 驱动 jar 的 `META-INF/services/java.sql.Driver` 声明实现类，`DriverManager` 静态块用 `ServiceLoader` 加载并注册，因此无需显式 `Class.forName`。
- **Q：SPI 和 API 的方向为什么相反？** → API 是调用方使用提供方定义的方法；SPI 是调用方（框架）定义接口，由实现方提供实现并被框架回调，控制权在框架侧（可参考本文档 SPI 与 API 对比表）。

## Java IO

### 【简单】什么是序列化？什么是反序列化？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Java IO / 序列化

#### 💎 关键结论

序列化是把对象转为字节流以便存储/传输，反序列化是还原为对象；工程上需显式声明 `serialVersionUID`、用 `transient` 跳过敏感字段，并警惕反序列化漏洞。

#### ⚡记忆卡片

- **口诀**：对象变字节，传输好存储，UID 防失败，transient 保安全
- **关键词**：Serializable ／ serialVersionUID ／ transient
- **链路**：对象 → `ObjectOutputStream` 写字节流 → 传输/存储 → `ObjectInputStream` 还原对象

#### 📖 核心知识

**基本概念**

- **序列化**：将对象转换为**字节流**（用于存储/传输）
- **反序列化**：将字节流恢复为对象

**核心用途**

- **持久化存储**（如保存到文件/数据库）
- **网络传输**（如 RPC 调用）
- **深拷贝实现**（通过序列化+反序列化）

**Java 实现方式**

| 方式                             | 特点                       | 示例                                   |
| -------------------------------- | -------------------------- | -------------------------------------- |
| **`Serializable`接口**           | 标记接口，默认 Java 序列化 | `class User implements Serializable`   |
| **`Externalizable`接口**         | 需手动实现读写逻辑         | 覆盖`writeExternal()`/`readExternal()` |
| **第三方库**（JSON/Protobuf 等） | 跨语言、高效               | Gson、Jackson、Protobuf                |

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
  - 第三方库（如 Protobuf）比 Java 原生序列化更快

**常见序列化协议对比**

| 协议          | 语言支持 | 可读性 | 性能 | 典型应用 |
| ------------- | -------- | ------ | ---- | -------- |
| **Java 原生** | 仅 Java  | 差     | 低   | Java RMI |
| **JSON**      | 多语言   | 好     | 中   | Web API  |
| **Protobuf**  | 多语言   | 差     | 高   | gRPC     |
| **Hessian**   | 多语言   | 差     | 中   | Dubbo    |

**安全风险**

- **反序列化漏洞**：恶意字节流可触发代码执行（需校验数据来源）
- **解决方案**：
  - 使用白名单控制反序列化类
  - 替换为 JSON 等文本协议

#### 🔬 扩展知识

::: details

- 【L3】`serialVersionUID` 机制：反序列化时会比对流中 UID 与当前类计算的 UID，不一致抛 `InvalidClassException`；不显式声明时由编译器根据类结构自动计算，类一改动就可能失配，因此必须显式声明（如 `1L`）。
- 【L3】反序列化漏洞原理：恶意构造的字节流在 `readObject` 过程中可触发目标类的方法调用链（Gadget Chain），如 Commons Collections 系列漏洞；Java 9+ 可用 `ObjectInputFilter` 做白名单过滤。
- 【L4】选型经验：跨语言/高性能选 Protobuf（gRPC 默认），可读性优先选 JSON（Jackson/Gson），Java 原生序列化体积大、速度慢且仅限 Java，仅遗留系统（如 RMI）使用。

:::

#### 🔀 发散问题

- **Q：`transient` 字段反序列化后是什么值？** → 对象字段为对应类型的默认值（对象引用为 `null`、int 为 0）；若实现 `Externalizable` 可在 `readExternal` 中自行恢复。
- **Q：序列化会调用构造方法吗？** → 不会（针对实现 `Serializable` 的类），反序列化直接按流中数据填充字段；这也是反序列化攻击能绕过构造器校验的原因。

### 【中等】Java 提供了哪些 IO 方式？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java IO / BIO、NIO、AIO

#### 💎 关键结论

Java IO 分三大类：BIO 同步阻塞（流 API，适合低并发）、NIO 同步非阻塞（Channel/Buffer/Selector，适合高并发，Netty 底层）、AIO 异步非阻塞（回调/Future，实际使用较少）。

#### ⚡记忆卡片

- **口诀**：BIO 一线程一连接，NIO 选择器多路复用，AIO 回调真异步
- **关键词**：流 ／ Channel+Buffer+Selector ／ CompletionHandler
- **链路**：低并发用 BIO → 高并发网络用 NIO → 真异步需求用 AIO

#### 📖 核心知识

Java 提供了多种 I/O（输入输出）方式，主要分为 **传统 I/O（BIO）、NIO（New I/O）、AIO（异步 I/O）** 三大类，并支持 **文件操作、网络通信、序列化** 等场景。以下是主要 I/O 方式的概述及要点：

**1. BIO（Blocking I/O）**

传统 I/O（BIO，Blocking I/O）是同步阻塞式 I/O，适用于连接数较少、延迟不敏感的场景。

**核心类**：

- **字节流**：`InputStream` / `OutputStream`（如 `FileInputStream`、`FileOutputStream`）
- **字符流**：`Reader` / `Writer`（如 `FileReader`、`FileWriter`）
- **缓冲流**：`BufferedReader`、`BufferedWriter`（提升性能）
- **标准 I/O**：`System.in`（输入）、`System.out`（输出）

**示例**：

```java
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

**缺点**：每个连接需要独立的线程，高并发时资源消耗大。

**2. NIO（Non-blocking I/O）**

NIO（New I/O，Non-blocking I/O）是同步非阻塞 I/O，基于 **通道（Channel）** 和 **缓冲区（Buffer）**，支持多路复用（Selector）。

**核心类**：

- **Buffer**：`ByteBuffer`、`CharBuffer`（数据存储）
- **Channel**：`FileChannel`、`SocketChannel`、`ServerSocketChannel`（数据传输）
- **Selector**：监听多个通道的事件（如连接、读、写）

**示例（NIO 文件复制）**：

```java
try (FileChannel src = FileChannel.open(Paths.get("src.txt"));
     FileChannel dest = FileChannel.open(Paths.get("dest.txt"), StandardOpenOption.CREATE, StandardOpenOption.WRITE)) {
    src.transferTo(0, src.size(), dest);
}
```

- **优点**：单线程可处理多个连接，适合高并发（如 Netty 框架底层）。
- **缺点**：编程复杂度较高。

**3. AIO（Asynchronous I/O）**

AIO（Asynchronous I/O）是异步非阻塞 I/O，基于回调或 Future 机制，适用于高吞吐场景。

**核心类**：

- `AsynchronousFileChannel`（文件操作）
- `AsynchronousSocketChannel`（网络通信）
- `CompletionHandler`（回调接口）

**示例（AIO 文件读取）**：

```java
AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(Paths.get("file.txt"));
ByteBuffer buffer = ByteBuffer.allocate(1024);
fileChannel.read(buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {
    @Override
    public void completed(Integer result, ByteBuffer attachment) {
        System.out.println("Read " + result + " bytes");
    }
    @Override
    public void failed(Throwable exc, ByteBuffer attachment) {
        exc.printStackTrace();
    }
});
```

- **优点**：真正异步，适合长连接、高吞吐场景（如大文件传输）。
- **缺点**：JDK 实现较少，Linux 支持有限（底层依赖 epoll）。

**4. 常见的 IO 工具**

- **序列化**：`ObjectInputStream` / `ObjectOutputStream`（Java 原生序列化）
- **压缩流**：`GZIPInputStream`、`ZipOutputStream`
- **内存映射文件**：`MappedByteBuffer`（NIO 高性能文件访问）
- **Files 工具类**（Java 7+）：
  ```java
  Files.readAllLines(Paths.get("file.txt")); // 快速读取文件
  ```

**5. BIO vs. NIO vs. AIO**

| 类型 | 模型       | 适用场景           | 典型框架          |
| ---- | ---------- | ------------------ | ----------------- |
| BIO  | 同步阻塞   | 低并发、简单 I/O   | Java Socket       |
| NIO  | 同步非阻塞 | 高并发、网络通信   | Netty、Tomcat NIO |
| AIO  | 异步非阻塞 | 高吞吐、大文件操作 | 较少使用          |

**选择建议**：

- **BIO**：简单文件操作或低并发场景。
- **NIO**：高并发网络编程（如 Netty）。
- **AIO**：需要真正异步 I/O 的场景（但实际使用较少）。

如果需要更高层次的封装，可以考虑 **Apache Commons IO**、**Guava** 等工具库。

#### 🔬 扩展知识

::: details

- 【L3】BIO 的瓶颈：每个连接需要一个独立线程，线程数 ≈ 连接数，千级连接时线程上下文切换和栈内存（默认 1MB/线程）开销不可接受；NIO 用 Selector 多路复用，单线程可管理成千上万连接。
- 【L3】AIO 的现实处境：Linux 下 JDK 的 AIO 底层仍依赖 epoll 模拟，并非真正内核级异步，性能优势不明显，因此 Netty 曾支持后又移除 AIO 传输，生态主流是 NIO。
- 【L4】Reactor 模式：NIO 多路复用是 Reactor 模型的基石，Netty 的主从 Reactor（Boss/Worker EventLoopGroup）即基于 Selector 实现，详见本文档「NIO 如何实现多路复用？」。

:::

#### 🔀 发散问题

- **Q：为什么高并发服务器选 NIO 而不是 AIO？** → NIO 生态成熟（Netty）、跨平台行为一致；AIO 在 Linux 实现不彻底、编程模型复杂，收益有限。
- **Q：FileChannel 能用 Selector 吗？** → 不能，文件 I/O 不支持多路复用，Selector 只适用于网络 Channel（`SocketChannel`/`ServerSocketChannel`/`DatagramChannel`）。

### 【困难】NIO 如何实现多路复用？⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Java IO / NIO 多路复用

#### 💎 关键结论

NIO 多路复用的核心是 Selector 轮询事件 + 非阻塞 Channel + Buffer 数据交换，单线程即可管理数千连接的 I/O 事件，底层依赖 epoll/IOCP，是 Netty 等高性能框架的底层原理。

#### ⚡记忆卡片

- **口诀**：非阻塞通道，选择器轮询，就绪才处理，单线程万连
- **关键词**：Selector ／ SelectionKey ／ epoll
- **链路**：Channel 设非阻塞 → 注册到 Selector → `select()` 返回就绪键 → 按事件类型处理 → `remove()` 已处理键

#### 📖 核心知识

Java NIO 多路复用的核心是通过 **Selector 轮询事件** + **非阻塞 Channel** + **Buffer 数据交换**，允许单线程管理多个通道的 I/O 操作。这是构建高性能网络应用的基础，也是 Netty 等框架的底层原理。

**Java NIO 核心组件**

- **Selector（选择器）**：核心多路复用器，可监控多个 `Channel` 的 I/O 事件（如连接、读、写）
  - 通过 `Selector.open()` 创建
  - 一个 `Selector` 可绑定多个 `Channel`
- **Channel（通道）**：非阻塞 I/O 操作的抽象，支持读写。主要类型：
  - `SocketChannel`：TCP 网络通信
  - `ServerSocketChannel`：监听 TCP 连接
  - `FileChannel`：文件 I/O（不支持 Selector）
- **Buffer（缓冲区）**：数据容器（如 `ByteBuffer`），`Channel` 通过 `Buffer` 读写数据。

**多路复用实现步骤**

**(1) 创建 Selector 并注册 Channel**

```java
Selector selector = Selector.open();
ServerSocketChannel serverChannel = ServerSocketChannel.open();
serverChannel.configureBlocking(false); // 必须设为非阻塞
serverChannel.register(selector, SelectionKey.OP_ACCEPT); // 注册监听事件
```

**(2) 事件类型**

- `SelectionKey.OP_ACCEPT`：接受连接（`ServerSocketChannel`）
- `SelectionKey.OP_CONNECT`：连接就绪（`SocketChannel`）
- `SelectionKey.OP_READ`：数据可读
- `SelectionKey.OP_WRITE`：数据可写

**(3) 事件轮询**

```java
while (true) {
    int readyChannels = selector.select(); // 阻塞直到有事件就绪
    if (readyChannels == 0) continue;

    Set<SelectionKey> selectedKeys = selector.selectedKeys();
    Iterator<SelectionKey> keyIterator = selectedKeys.iterator();

    while (keyIterator.hasNext()) {
        SelectionKey key = keyIterator.next();

        if (key.isAcceptable()) {
            // 处理新连接
        } else if (key.isReadable()) {
            // 处理读事件
        } else if (key.isWritable()) {
            // 处理写事件
        }

        keyIterator.remove(); // 必须移除已处理的键
    }
}
```

**关键机制**

**(1) 非阻塞模式**

- Channel 必须设置为非阻塞：`channel.configureBlocking(false)`
- 避免单线程因 I/O 操作阻塞

**(2) 事件驱动**

- Selector 通过操作系统级轮询（如 Linux 的 `epoll`）监听事件
- 仅处理活跃的 `Channel`，避免无效遍历

**(3) SelectionKey**

- 绑定 Channel 与 Selector 的关系
- 可通过 `key.attachment()` 附加自定义对象（如会话状态）

**NIO 优点**

- 单线程管理多连接，资源消耗低
- 高并发支持（如 Netty 框架底层依赖 NIO）
- 避免线程上下文切换开销

**NIO 适用场景**

- 高并发网络服务（如聊天服务器、API 网关）
- 需要长连接的应用（如 WebSocket）
- 大数据量、低延迟的 I/O 操作

#### 🔬 扩展知识

::: details

- 【L3】底层实现：**Linux** 基于 `epoll`（高效监控大量文件描述符）；**Windows** 基于 `IOCP`（完成端口）。相比传统 BIO 的线程池模型，NIO 单线程可处理数千连接。
- 【L3】select/poll/epoll 演进：`select` 有 1024 个 fd 上限且每次需拷贝 fd 集合进内核；`poll` 取消数量上限但仍线性扫描；`epoll` 用红黑树管理 fd + 就绪链表回调，活跃连接少时接近 O(1)，且支持边沿触发（ET）减少重复通知。
- 【L4】Netty 对 NIO 的工程化包装：主从 Reactor 线程模型、解决 JDK epoll 空轮询 bug（计数后重建 Selector）、`CompositeByteBuf` 零拷贝，生产环境一般不直接用裸 NIO。

:::

#### 🏭 实战场景

::: details

示例场景：某 IM 长连接网关早期用 BIO（一线程一连接），单机 8 核只能承载约 2000 连接，CPU 大量消耗在线程上下文切换；迁移到 Netty NIO 后采用主从 Reactor（2 个 Boss 线程 accept + 16 个 Worker 线程处理读写），单机稳定承载 10 万级长连接，线程数从数千降到 18，内存开销（线程栈）从 GB 级降到几十 MB，消息 P99 延迟从数百毫秒降到数十毫秒。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “NIO 就是异步 I/O” → NIO 是**同步非阻塞**：`select()` 仍需要线程主动轮询，只是不阻塞在单个连接上；真正的异步是 AIO（完成端口/回调）。
- ❌ “处理完 SelectionKey 不用移除” → `selectedKeys()` 返回的是累积集合，不 `remove()` 已处理的键会导致同一事件被重复处理。
- ❌ “注册后一直监听 OP_WRITE” → 写事件在未就绪时会持续触发空转，正确做法是写不完时才临时注册 OP_WRITE，写完后取消。

:::

#### 🔀 发散问题

- **Q：为什么注册到 Selector 的 Channel 必须非阻塞？** → 若 Channel 阻塞，事件就绪后实际读写仍可能挂起，整个 Selector 线程被卡死，多路复用失效；这也是 `FileChannel`（无法设非阻塞）不能注册 Selector 的原因。
- **Q：JDK NIO 的 epoll 空轮询 bug 是什么？** → 某些情况下 `select()` 在没有就绪事件时立即返回（触发条件与连接异常关闭有关），导致 CPU 100%；Netty 通过统计空轮询次数，超阈值后重建 Selector 规避。

### 【困难】Java 写入文件到磁盘会经历哪些过程？⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Java IO / 写盘流程与页缓存

#### 💎 关键结论

Java 写盘经历“用户缓冲区 → 内核页缓存 → 磁盘缓存 → 物理介质”四级流水：`write` 返回只表示数据进了页缓存，`fsync` 才算落盘；零拷贝可省去用户空间拷贝。

#### ⚡记忆卡片

- **口诀**：write 入缓存，fsync 才落盘，脏页定时刷，transferTo 零拷贝
- **关键词**：页缓存 ／ 脏页 ／ fsync
- **链路**：JVM 缓冲区 → `write()` 系统调用 → 内核页缓存（脏页）→ 回写线程/`fsync` → 磁盘控制器 → 物理介质

#### 📖 核心知识

**要点总览**

- **四级流水**：用户缓冲区 → 内核页缓存 → 磁盘缓存 → 物理介质。
- **两次复制**：默认路径下数据在用户和内核空间之间有一份拷贝。
- **持久化分水岭**：`write` 返回仅入内核缓存，`fsync` 才落盘。
- **零拷贝**：`transferTo` 消除用户空间拷贝，但数据仍可能在内核缓存停留。
- **刷盘策略**：异步定时 + 内存压力 + 显式同步。

**总体流程**

```
[Java 代码] → [JVM 堆缓冲区] → [系统调用] → [内核页缓存] → [磁盘控制器] → [物理介质]
```

**应用层写入**

- **直接写入**：调用 `FileOutputStream.write(byte[])`，通过 JNI 进入 native 方法。
- **缓冲写入**：使用 `BufferedOutputStream`，数据先写入 JVM 堆内缓冲区（默认 8KB），满缓冲区时才触发系统调用，以减少频繁的上下文切换。

**系统调用与用户态→内核态切换**

- JVM 发起 `write()` 系统调用，CPU 从用户态切换到内核态。
- 数据从 JVM 堆内存（用户空间）复制到内核空间的 **页缓存**（Page Cache）。此复制是必须的，因为内核不能直接访问用户进程内存。

**内核页缓存管理**

- 写入的数据暂存在 Page Cache 中，对应内存页被标记为 **脏页**（Dirty）。
- **读优化**：后续读可直接命中缓存，避免磁盘 I/O。
- **刷盘触发时机**：
  - **定时回写**：内核线程（如 pdflush）周期性扫描脏页，默认 30 秒刷盘。
  - **内存压力**：可用内存低于阈值时强制刷盘。
  - **显式同步**：应用程序调用 `fsync()` 或 `fdatasync()`，立即将指定文件的脏页刷入磁盘。
  - **文件关闭**：`close()` 会隐含刷新，但不保证物理落盘（依赖于文件系统实现）。

**硬件层写入**

- 内核通过设备驱动程序向磁盘控制器发送指令。
- **磁盘缓存**：若磁盘启用了写缓存，数据可能先写入磁盘的易失性缓存，随后才真正写入盘片。此时系统调用返回成功，但数据仍未持久化。
- **物理写入**：最终数据磁化到机械盘片或写入闪存单元。

#### 🔬 扩展知识

::: details

**【L3】数据持久化保证**

- **`write()` 返回**：仅表示数据已复制到内核页缓存，**不保证落盘**。若系统崩溃，数据可能丢失。
- **`flush()` 作用**：仅刷新 JVM 用户缓冲区到内核，不触发 `fsync`，因此仍不能保证落盘。
- **强制落盘 API**：
  - `FileDescriptor.sync()`：调用 `fsync()`，同步文件数据和元数据。
  - `FileChannel.force(boolean metaData)`：参数为 `true` 时同时刷新文件元数据。

**【L4】零拷贝**

- **`FileChannel.transferTo()`**：数据直接从内核页缓存发送到目标通道（如 Socket），**避免一次用户空间拷贝**，显著提升性能。
- **内存映射文件 `MappedByteBuffer`**：将文件区域映射到进程地址空间，通过内存操作读写，缺页时由内核加载，修改后的数据由内核异步刷盘。

**【L4】直接 I/O 与标准 I/O**

- **标准 I/O**：通过页缓存，适合大多数应用。
- **直接 I/O**：绕过页缓存，直接与磁盘交互（需文件系统支持，如 Linux `O_DIRECT` 标志），适用于数据库等自管理缓存的系统，但要求用户缓冲区对齐。

**【L3】写放大与随机小写**

- 每次写入可能引发整个页（通常 4KB）的“读-修改-写”操作，称为写放大。小写入应尽量合并（如使用 BufferedOutputStream）。

**【L3】内核参数调优（Linux）**

- `/proc/sys/vm/dirty_ratio`：脏页占用内存百分比上限，触发刷盘。
- `/proc/sys/vm/dirty_expire_centisecs`：脏页最长存活时间（默认 30 秒）。
- `/proc/sys/vm/dirty_writeback_centisecs`：内核回写线程唤醒间隔。

:::

#### 🔀 发散问题

- **Q：`flush()` 能保证数据落盘吗？** → 不能。`flush()` 只把 JVM 用户缓冲区刷到内核页缓存，要真正落盘需 `FileDescriptor.sync()` 或 `FileChannel.force(true)`。
- **Q：数据库（如 MySQL/Kafka）为什么自己管理刷盘？** → 它们用页缓存提升吞吐，再通过 redo log 顺序写 + 定时/显式 `fsync` 控制持久化时机，在性能与可靠性间取平衡；Kafka 甚至依赖操作系统页缓存 + 副本机制而非单机 fsync。

## Java 语法糖

### 【中等】Java 中有哪些常见的语法糖？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Java 语法糖 / 脱糖机制

#### 💎 关键结论

语法糖是不增加语言能力、只提升书写体验的便捷语法，编译期都会被“脱糖”为基础结构（可用 `javap -c` 验证）；常见的有自动装箱、增强 for、变长参数、lambda、try-with-resources 等。

#### ⚡记忆卡片

- **口诀**：写着甜，编完淡，脱糖之后是基础，javap 可验证
- **关键词**：脱糖 ／ 编译器转换 ／ 可读性
- **链路**：源码语法糖 → 编译器脱糖 → 基础字节码结构 → 运行时无特殊支持

#### 📖 核心知识

**语法糖（Syntactic sugar）** 代指的是编程语言为了方便程序员开发程序而设计的一种特殊语法，这种语法对编程语言的功能并没有影响。实现相同的功能，基于语法糖写出来的代码往往更简单简洁且更易阅读。

Java 中最常用的语法糖主要有泛型、自动拆装箱、变长参数、枚举、内部类、增强 for 循环、try-with-resources 语法、lambda 表达式等。所有这些语法糖在编译阶段都会被"脱糖"(desugar)，即转换为更基础的 Java 语法结构。可以使用`javap -c`命令查看字节码来验证这一点。语法糖虽然不增加语言功能，但能显著提高代码的可读性和编写效率，是 Java 语言不断演进的重要组成部分。

**自动装箱与拆箱 (Autoboxing/Unboxing)**

```java
// 自动装箱
Integer i = 10;  // 实际编译为 Integer.valueOf(10)

// 自动拆箱
int n = i;      // 实际编译为 i.intValue()
```

**增强 for 循环 (foreach)**

```java
List<String> list = Arrays.asList("a", "b", "c");
// 语法糖形式
for (String s : list) {
    System.out.println(s);
}
// 实际编译为迭代器模式
for (Iterator<String> it = list.iterator(); it.hasNext();) {
    String s = it.next();
    System.out.println(s);
}
```

**变长参数 (Varargs)**

```java
public void print(String... args) {
    for (String arg : args) {
        System.out.println(arg);
    }
}
// 实际编译为数组参数
public void print(String[] args) { ... }
```

**数值字面量下划线**

```java
int million = 1_000_000;  // 编译后等同于 1000000
```

**字符串拼接**

```java
String s = "a" + "b" + "c";
// 编译优化为
String s = "abc";

// 变量拼接会转为 StringBuilder
String a = "a", b = "b";
String result = a + b;
// 编译为
String result = new StringBuilder().append(a).append(b).toString();
```

**switch 支持字符串 (Java 7+)**

```java
String fruit = "apple";
switch (fruit) {
    case "apple":
        System.out.println("It's an apple");
        break;
    // 实际编译为基于 hashCode() 和 equals() 的比较
}
```

**默认构造方法**

```java
public class Person {}
// 如果没有显式定义构造方法，编译器会自动添加无参构造方法
```

**枚举类 (Java 5+)**

```java
enum Color { RED, GREEN, BLUE }
// 实际编译为继承 java.lang.Enum 的类
```

**内部类访问外部类成员**

```java
class Outer {
    private int x = 10;
    class Inner {
        void print() {
            System.out.println(x);  // 实际通过 Outer.this.x 访问
        }
    }
}
```

**方法引用 (Java 8+)**

```java
List<String> list = Arrays.asList("a", "b", "c");
list.forEach(System.out::println);
// 编译为 lambda 表达式
list.forEach(s -> System.out.println(s));
```

**钻石操作符 (Diamond Operator, Java 7+)**

```java
List<String> list = new ArrayList<>();  // 类型推断
// Java 7 之前需要
List<String> list = new ArrayList<String>();
```

**集合字面量 (Java 9+ 的 List.of 等）**

```java
List<String> list = List.of("a", "b", "c");
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("a", 1, "b", 2);
```

**Lambda 表达式 (Java 8+)**

```java
// Lambda 表达式
Runnable r = () -> System.out.println("Hello");
// 实际生成实现 Runnable 的匿名类
```

**try-with-resources (Java 7+)**

```java
try (InputStream is = new FileInputStream("file.txt")) {
    // 使用资源
}  // 自动调用 close()
// 编译为 try-finally 块
```

**接口中的默认方法和静态方法 (Java 8+)**

```java
interface MyInterface {
    default void defaultMethod() {
        System.out.println("Default method");
    }

    static void staticMethod() {
        System.out.println("Static method");
    }
}
```

**记录类 (Record, Java 14 预览 / Java 16 正式版)**

```java
record Point(int x, int y) {}
// 编译后自动生成：
// - 私有 final 字段 x 和 y
// - 公共构造方法
// - 访问器方法 x() 和 y()
// - equals(), hashCode(), toString()
```

**`instanceof` 模式匹配**

```java
if (obj instanceof String s) {
    // 可以直接使用 s
    System.out.println(s.length());
}
```

**文本块 (Text Blocks, Java 15 正式版)**

```java
String html = """
    <html>
        <body>
            <p>Hello, world</p>
        </body>
    </html>
    """;
```

## Java 新特性

### 【中等】Java 8 的 Optional 的正确使用方式？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 8 新特性 / Optional

#### 💎 关键结论

`Optional` 是 Java 8 引入的容器对象，用于优雅表达“值可能为空”：只应作为返回类型，配合 `map`/`orElse`/`orElseGet` 链式处理；不要作字段、参数，更不要裸调 `get()`。

#### ⚡记忆卡片

- **口诀**：返回值可空，链式 map 取，orElse 兼底，裸 get 是错
- **关键词**：ofNullable ／ map ／ orElseGet
- **链路**：`ofNullable` 包装 → `map`/`filter` 链式转换 → `orElse`/`orElseThrow` 收尾

#### 📖 核心知识

`Optional` 是 Java 8 引入的**容器对象**，优雅处理可能为 `null` 的值。

**核心方法**：

| **方法**                     | **说明**                       |
| ---------------------------- | ------------------------------ |
| `of(T)`                      | 非 null 创建（null 抛 NPE）    |
| `ofNullable(T)`              | 允许 null                      |
| `isPresent()` / `isEmpty()`  | 是否有值（Java 11+ `isEmpty`） |
| `orElse(T)`                  | 无值返回默认                   |
| `orElseGet(Supplier)`        | 懒加载默认                     |
| `orElseThrow()`              | 无值抛异常                     |
| `map` / `flatMap` / `filter` | 链式转换                       |

**正确用法**：

```java
String name = Optional.ofNullable(user)
    .map(User::getProfile)
    .map(Profile::getName)
    .orElse("unknown");

// 方法返回类型
public Optional<Address> findAddress(String userId) { ... }
```

**反模式（应避免）**：

```java
// ❌ 字段类型（Optional 不可序列化）
private Optional<String> name;

// ❌ 方法参数
public void process(Optional<String> input) { ... }

// ❌ 直接 get
String s = optional.get();  // 可能 NPE
```

#### 🔬 扩展知识

::: details

- 【L3】`orElse(T)` vs `orElseGet(Supplier)`：前者无论有无值都会立即计算默认值，后者懒加载；当默认值创建开销大或有副作用时务必用 `orElseGet`。
- 【L3】`Optional` 内部用私有字段持值，空实例为静态单例 `Optional.EMPTY`；`Optional` 未实现 `Serializable`，这是它不适合作为字段类型的重要原因。
- 【L4】版本演进：Java 9 新增 `ifPresentOrElse()`/`or()`/`stream()`；Java 10 新增无参 `orElseThrow()`；Java 11 新增 `isEmpty()`。

:::

#### 🔀 发散问题

- **Q：为什么不建议把 Optional 作为方法参数？** → 会迫使调用方包装值、增加噪声且无类型收益；它的设计定位仅是返回类型，用于显式告知“可能为空”。
- **Q：`orElseThrow()` 和 `get()` 有什么区别？** → 语义相同（无值抛 `NoSuchElementException`），但 `orElseThrow()` 名字明确表达异常意图，是 Java 10 后的推荐写法。

### 【中等】Java 8 的 Lambda 表达式和函数式接口是什么？⭐⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 8 新特性 / Lambda 与函数式接口

#### 💎 关键结论

Lambda 是 Java 8 引入的匿名函数，把行为作为参数传递，必须匹配只有一个抽象方法的函数式接口；其底层不是匿名内部类，而是通过 `invokedynamic` + `LambdaMetafactory` 在运行期动态链接。

#### ⚡记忆卡片

- **口诀**：参数箭头体，接口单方法，运行 invokedynamic，无捕获可单例
- **关键词**：`->` ／ @FunctionalInterface ／ invokedynamic
- **链路**：Lambda 表达式 → 目标类型推断到函数式接口 → `invokedynamic` 引导 → `LambdaMetafactory` 生成实现类

#### 📖 核心知识

**Lambda 表达式**是 Java 8 引入的**匿名函数**，将行为作为参数传递，简化函数式编程。

```java
// 传统匿名类
Collections.sort(list, new Comparator<String>() {
    public int compare(String a, String b) { return a.length() - b.length(); }
});

// Lambda 表达式
Collections.sort(list, (a, b) -> a.length() - b.length());
// 方法引用
list.sort(Comparator.comparingInt(String::length));
```

**核心语法**：`(参数列表) -> { 方法体 }`

| 形式               | 示例                                     |
| :----------------- | :--------------------------------------- |
| 无参               | `() -> System.out.println("hello")`      |
| 单参（可省略括号） | `s -> s.length()`                        |
| 多参               | `(a, b) -> a + b`                        |
| 方法引用           | `String::valueOf`、`System.out::println` |

**函数式接口**：只有**一个抽象方法**的接口，用 `@FunctionalInterface` 注解。Lambda 本质是函数式接口的实例。

| 函数式接口          | 方法                | 用途                  |
| :------------------ | :------------------ | :-------------------- |
| `Function<T,R>`     | `R apply(T t)`      | 输入 T 输出 R（转换） |
| `Consumer<T>`       | `void accept(T t)`  | 消费 T（无返回）      |
| `Supplier<T>`       | `T get()`           | 生产 T（无输入）      |
| `Predicate<T>`      | `boolean test(T t)` | 判断 T（返回布尔）    |
| `BiFunction<T,U,R>` | `R apply(T t, U u)` | 双输入单输出          |

#### 🔬 扩展知识

::: details

**【L3】Lambda 的底层实现：invokedynamic（关键区分）**

**常见误区**：Lambda 是匿名内部类的语法糖。

**真相**：Lambda 和匿名内部类在 JVM 层面**完全不同**。匿名内部类在**编译期**生成 `ClassName$1.class` 文件（每次 `new` 创建一个新对象）；Lambda 在**运行期**通过 `invokedynamic` 指令动态链接，由 `LambdaMetafactory` 生成方法句柄，**不生成 `.class` 文件，也不保证每次创建新对象**。

```asm
; 匿名内部类字节码：编译期生成独立类
 0: new #7       // 编译期确定: new AnonymousClass$1
 3: dup
 4: invokespecial #9  // 调用 AnonymousClass$1.<init>

; Lambda 字节码：运行时动态链接
invokedynamic #14  // BootstrapMethod: LambdaMetafactory.metafactory()
                   // 静态参数: ()V, 函数式接口方法, lambda body 实现
```

**`invokedynamic` 的工作流程**：

```
1. JVM 首次遇到 invokedynamic 指令
   → 调用 Bootstrap Method: LambdaMetafactory.metafactory()

2. LambdaMetafactory 在运行时生成一个实现函数式接口的类
   → 通过 ASM 直接生成字节码
   → 通过 Unsafe.defineAnonymousClass 加载（不生成 .class 文件）

3. 返回一个 CallSite（调用点），后续调用直接使用该 CallSite
   → 返回的可能是一个新对象，也可能是缓存的单例（取决于是否捕获外部变量）
```

**Lambda 是否每次创建新对象？**

```java
// 不捕获外部变量 → JVM 可能复用同一个实例（单例）
Supplier<String> s1 = () -> "hello";
Supplier<String> s2 = () -> "hello";
System.out.println(s1 == s2);  // 可能为 true！（JVM 优化为常量）

// 捕获外部变量 → 每次创建新对象
String prefix = "msg: ";
Supplier<String> s3 = () -> prefix + "hello";  // 每次 new 一个对象

// 匿名内部类 → 每次一定 new 新对象
Supplier<String> s4 = new Supplier<>() {  // 每个 new 都是不同对象
    public String get() { return "hello"; }
};
```

**记忆点**：Lambda = "行为参数化"，函数式接口 = "只有一个抽象方法的接口"，底层 = `invokedynamic` + `LambdaMetafactory`（区别于匿名内部类的编译期类生成）。

**【L4】跨语言视角：Lambda/Closure 的四种实现策略**

| 语言       | 实现策略                            | 核心差异                                                      |
| :--------- | :---------------------------------- | :------------------------------------------------------------ |
| **Java**   | `invokedynamic` + 运行时生成 SAM 类 | 编译期不产生 `.class`，运行时动态链接                         |
| **C++**    | 编译期生成匿名仿函数类              | 零运行时开销，但每个 lambda 产生**不同**类型（即使签名相同）  |
| **Rust**   | 编译期生成匿名结构体 + trait impl   | `Fn`/`FnMut`/`FnOnce` 三种 trait 区分捕获方式，所有权融入闭包 |
| **Python** | 运行时创建 `function` 对象          | 简单但慢——每次 `def` 或 `lambda` 都是对象创建，无 JIT 优化    |

C++ lambda 的 `[]` 捕获列表（`[=]` 按值、`[&]` 按引用、`[this]` 等）是对**按值捕获 vs 按引用捕获**最精细的控制，而 Java lambda 默认是 **effectively final 变量的隐式按值捕获**。Rust 更进一步，将所有权模型带入闭包——`move` 关键字将变量所有权移入闭包，编译器保证 use-after-move 在编译期捕获。

**一个有趣的事实**：C++ 每个 lambda 产生**不同的类型**（即使签名完全一致），这使得两个签名相同的 lambda 不能互相赋值。Java 采用**目标类型推断**——lambda 的类型取决于赋值的函数式接口，不同 lambda 只要匹配同一接口就可以互换。这是 Java "更灵活"的思路 vs C++ "更静态安全" 思路的典型体现。

:::

#### 🔀 发散问题

- **Q：Lambda 捕获的变量为什么必须是 effectively final？** → Lambda 捕获的是变量的副本而非变量本身，若变量可变，副本与原值语义会不一致，编译器直接禁止。
- **Q：方法引用和 Lambda 有什么关系？** → 方法引用（如 `String::length`）是 Lambda 的语法简写，编译后同样走 `invokedynamic` + `LambdaMetafactory`（使用不同的引导方法变体）。

### 【困难】Java 8 的 Stream API 的核心操作有哪些？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：JDK 8 新特性 / Stream API

#### 💎 关键结论

Stream 提供声明式、链式、可并行的集合处理：“数据源 → 中间操作（懒执行）→ 终端操作（触发计算）”；中间操作构建管道不执行，终端操作才遍历元素，短路操作可提前终止。

#### ⚡记忆卡片

- **口诀**：中间懒执行，终端才触发，短路能提前，并行看拆分
- **关键词**：中间操作 ／ 终端操作 ／ Spliterator
- **链路**：数据源 `stream()` → filter/map 等中间操作建管道 → collect/reduce 触发 → 并行流由 Spliterator 拆分给 ForkJoinPool

#### 📖 核心知识

**Stream API（Java 8）**提供对集合的**声明式、链式、并行化**数据处理能力。

**核心流程**：`数据源 → 中间操作（链式） → 终端操作（触发执行）`

```java
List<String> names = users.stream()           // 数据源
    .filter(u -> u.getAge() > 18)              // 中间操作：过滤
    .sorted(Comparator.comparing(User::getName)) // 中间操作：排序
    .map(User::getName)                        // 中间操作：映射
    .distinct()                                // 中间操作：去重
    .limit(10)                                 // 中间操作：截断
    .collect(Collectors.toList());              // 终端操作：收集
```

**中间操作 vs 终端操作**：

| 类型         | 特点                              | 常见操作                                                                   |
| :----------- | :-------------------------------- | :------------------------------------------------------------------------- |
| **中间操作** | 返回 Stream，**懒执行**，链式调用 | `filter`、`map`、`flatMap`、`sorted`、`distinct`、`limit`、`skip`、`peek`  |
| **终端操作** | 触发实际计算，返回结果或副作用    | `collect`、`forEach`、`reduce`、`count`、`findFirst`、`anyMatch`、`toList` |

**reduce vs collect**：

```java
// reduce：元素归约为单个值
int sum = list.stream().reduce(0, Integer::sum);

// collect：元素收集到容器
Map<String, List<User>> groupByCity = users.stream()
    .collect(Collectors.groupingBy(User::getCity));
```

**并行流**：

```java
long count = list.parallelStream()  // 利用多核 CPU 并行处理
    .filter(x -> x > 0)
    .count();
```

**注意事项**：

- 并行流不适用于小数据集（线程开销 > 计算收益）
- 避免在并行流中使用有副作用的操作
- `findFirst` 在并行流中代价高（需全局同步），优先用 `findAny`

#### 🔬 扩展知识

::: details

**【L3】Stream 的惰性求值机制：Sink 链**

Stream 中间操作**不会立即执行**，而是构建一条 **Sink 链**（责任链模式），直到终端操作才触发整条链的执行：

```
数据源 → filter Sink → map Sink → sorted Sink → 终端 Sink
         ↑ 每个中间操作返回一个新的 Sink 包装前一个 Sink
```

```java
// 这段代码不会执行任何操作（无终端操作）
users.stream()
    .filter(u -> { System.out.println("filter"); return true; });  // 不打印！

// 只有加了终端操作，filter 才会被调用
users.stream()
    .filter(u -> { System.out.println("filter"); return true; })
    .collect(Collectors.toList());  // 此时才打印 "filter"
```

**短路操作**会提前终止遍历——终端操作 `findFirst()` 与中间操作 `limit()` 配合，找到第一个匹配元素后立即停止：

```java
// 只需找到第一个 > 18 的用户，不会遍历整个集合
users.stream()
    .filter(u -> u.getAge() > 18)
    .findFirst();  // 短路终端操作
```

> **关键原则**：`filter` 放在 `sorted` 前面（先减数据量再排序），`limit` 放在 `peek` 前面（先截断再调试）。操作顺序直接影响性能。

**【L3】并行流的拆分原理：Spliterator**

并行流的底层依赖 **Spliterator**（Splittable Iterator），它定义了如何**递归拆分**数据源给多个线程：

```
原始数据 [1,2,3,4,5,6,7,8]
    trySplit() → [1,2,3,4] + [5,6,7,8]
    trySplit() → [1,2] + [3,4] + [5,6] + [7,8]
    4 个线程并行处理 4 个子流
```

**拆分效率**：ArrayList 的 `ArrayListSpliterator` 基于数组索引拆分（O(1)），LinkedList 的拆分需要先遍历到中点（O(n)），因此 LinkedList 并行流性能很差——需要 `collect(toList())` 转换为 ArrayList 后再并行。

**【L4】跨语言视角：惰性集合处理的设计谱系**

| 语言/框架       | 惰性集合机制                                     | 核心差异                                                                       |
| :-------------- | :----------------------------------------------- | :----------------------------------------------------------------------------- |
| **Java Stream** | Sink 链 + 终端触发                               | push-based，按元素驱动（每个元素走完整条链）                                   |
| **C# LINQ**     | `IEnumerable<T>` + 迭代器                        | pull-based，按需拉取（类似生成器模式）                                         |
| **Python**      | 生成器 `yield` / 列表推导式                      | 生成器是 pull-based，边计算边产出；推导式是 eager 的                           |
| **Rust**        | `Iterator` trait + `map`/`filter`/`collect`      | 编译期单态化，零抽象成本——`map().filter().collect()` 展开后等价于手写 for 循环 |
| **Kotlin**      | `Sequence`（惰性） vs `Collection` 扩展（eager） | 与 Java Stream 几乎一样的设计：`asSequence()` 开启惰性，终端操作触发           |

**Java Stream 的 push-based 设计**：每个元素"被推入"整条 Sink 链的处理管道。这意味着 `sorted()` 这样的操作必须先收集所有元素才能排序——它是**有状态中间操作**，在管道中形成了一个"屏障"。相比之下，C# LINQ 的 pull-based 迭代器天然是惰性的，不需要显式的"终端操作"概念。

**Rust 的零成本迭代器**：Rust 的迭代器链（`iter().filter().map().sum()`）在编译后展开为等价的手写循环。因为 Rust 没有运行时反射和 GC，编译器可以在编译期完成内联和优化，运行时没有任何虚函数调用开销。这是 Java Stream 做不到的——Java 的每个 filter/map 操作至少经过一次接口方法分派。

:::

#### 🏭 实战场景

::: details

示例场景：某风控系统离线特征计算需对 1000 万条交易日志做过滤+聚合：串行 for 循环约 45s，改用 `parallelStream()` 在 8 核机器上降到约 8s（接近核数倍加速）；后将并行流提交到自定义 `ForkJoinPool`（避免与公共池争抢），并先把 LinkedList 数据源换成 ArrayList（Spliterator 拆分 O(1)），整体批处理耗时再降约 30%。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “Stream 可以重复使用” → 流只能消费一次，终端操作后再次使用会抛 `IllegalStateException`；需要复用时应重新从数据源 `stream()`。
- ❌ “并行流一定更快” → 小数据集（线程调度开销 > 计算）、LinkedList（拆分 O(n)）、装箱元素或有状态/非线程安全操作时，并行流反而更慢甚至出错。
- ❌ “`peek` 可以用来修改元素” → `peek` 仅用于调试副作用，不改变流元素；且当结果不被使用时 JVM 可能直接跳过 `peek` 执行。

:::

#### 🔀 发散问题

- **Q：`map` 和 `flatMap` 的区别？** → `map` 是一对一转换（每个元素映射为一个新元素）；`flatMap` 是一对多，把每个元素映射为一个流再压平合并，常用于展开嵌套集合。
- **Q：并行流底层用什么线程池？** → 默认使用 `ForkJoinPool.commonPool()`（线程数约为 CPU 核数 - 1），可用自定义 ForkJoinPool 提交隔离；`findFirst` 在并行流中需全局同步保序，代价高，优先用 `findAny`。

### 【中等】Java 8 的接口的默认方法和静态方法是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 8 新特性 / 接口演化

#### 💎 关键结论

Java 8 允许接口定义 `default` 方法和静态方法，在不破坏存量实现类的前提下给接口新增能力（接口演化）；冲突时遵循“类优先、同名默认方法必须显式重写”规则。

#### ⚡记忆卡片

- **口诀**：default 带实现，接口可演化，类优先，冲突必重写
- **关键词**：default ／ 类优先 ／ B.super
- **链路**：接口新增 default 方法 → 实现类可选重写 → 冲突按“类优先/显式重写”解决

#### 📖 核心知识

Java 8 允许接口定义**默认方法（`default`）**和**静态方法**，解决了接口演化问题。

```java
public interface Logger {
    void log(String msg);  // 抽象方法

    // 默认方法：提供默认实现，实现类可选择重写
    default void info(String msg) {
        log("[INFO] " + msg);
    }

    // 静态方法：通过接口名直接调用
    static Logger of(String name) {
        return msg -> System.out.println(name + ": " + msg);
    }
}
```

**默认方法的菱形冲突规则**：

| 场景                     | 规则                                        |
| :----------------------- | :------------------------------------------ |
| 类方法 vs 接口默认方法   | **类优先**：类的实例方法始终胜出            |
| 两个接口有同名默认方法   | **编译报错**，必须在子接口/实现类中显式重写 |
| 子接口重写父接口默认方法 | 子接口的版本生效                            |

```java
// 菱形冲突解决
interface A { default void hello() { System.out.println("A"); } }
interface B extends A { default void hello() { System.out.println("B"); } }
class C implements A, B {
    // 必须显式指定
    public void hello() { B.super.hello(); }  // 选择 B 的实现
}
```

#### 🔬 扩展知识

::: details

- 【L3】典型动机：Java 8 要给 `Collection` 新增 `stream()`/`forEach()` 方法，若用抽象方法会破坏所有第三方实现类，default 方法让 JDK 在不破坏兼容性的前提下扩展老接口。
- 【L3】字节码层面：default 方法编译后就是接口中的普通方法，实现类未重写时通过 `invokeinterface` 直接调用接口中的实现；冲突解决在编译期完成，运行时无额外开销。
- 【L4】横向对比：接口的静态方法不能通过实现类调用（只能 `接口名.方法名`）；C# 8 也引入了默认接口方法，Kotlin 则用扩展函数 + 抽象类解决类似问题。

:::

#### 🔀 发散问题

- **Q：接口能有字段吗？** → 可以，但隐式为 `public static final` 常量，不能作实例状态；Java 8 的私有方法要等 Java 9 才支持（`private` 接口方法）。
- **Q：抽象类和接口怎么选？** → 需要状态/构造器/非 public 成员选抽象类；需要多实现、默认行为组合选接口，Java 8 后接口已能覆盖大多数“可插拔能力”场景。

### 【中等】Java 8 的 java.time API 解决了什么问题？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 8 新特性 / java.time

#### 💎 关键结论

`java.time`（JSR-310）解决了 `Date`/`Calendar` 的三大痛点：非线程安全、设计混乱（月份从 0 开始）、时区处理复杂；新 API 不可变、线程安全、语义清晰。

#### ⚡记忆卡片

- **口诀**：日期无时区，时刻用 Instant，加减用 plus，格式化线程安全
- **关键词**：LocalDateTime ／ ZonedDateTime ／ DateTimeFormatter
- **链路**：选对类型（日期/时间/时刻/时区）→ `plus`/`minus`/`with` 运算 → `DateTimeFormatter` 格式化

#### 📖 核心知识

`java.time`（JSR-310）解决了 `java.util.Date`/`Calendar` 的三大痛点：**非线程安全、设计混乱、时区处理复杂**。

| 类              | 用途                   | 示例                                            |
| :-------------- | :--------------------- | :---------------------------------------------- |
| `LocalDate`     | 日期（无时间、无时区） | `LocalDate.of(2024, 1, 1)`                      |
| `LocalTime`     | 时间（无日期、无时区） | `LocalTime.of(14, 30)`                          |
| `LocalDateTime` | 日期 + 时间（无时区）  | `LocalDateTime.now()`                           |
| `ZonedDateTime` | 日期 + 时间 + 时区     | `ZonedDateTime.now(ZoneId.of("Asia/Shanghai"))` |
| `Instant`       | 时间戳（UTC）          | `Instant.now()`                                 |
| `Duration`      | 时间间隔（时分秒）     | `Duration.between(t1, t2)`                      |
| `Period`        | 日期间隔（年月日）     | `Period.between(d1, d2)`                        |

**核心优势**：

- **不可变且线程安全**：所有类都是 `final` + `immutable`
- **API 设计清晰**：`plus`/`minus`/`with` 语义明确
- **时区支持完善**：`ZoneId` + `ZonedDateTime`

```java
// 计算两个日期之间的天数
long days = ChronoUnit.DAYS.between(startDate, endDate);

// 格式化
String formatted = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
```

#### 🔬 扩展知识

::: details

- 【L3】线程安全原理：`java.time` 所有类都是 `final` + 不可变对象，运算返回新实例，`DateTimeFormatter` 也因此线程安全、可声明为静态常量；而 `SimpleDateFormat` 内部持有可变的 `Calendar`，并发下会解析错乱。
- 【L3】老类迁移：`Date` ↔ `LocalDateTime` 需经 `Instant` + `ZoneId` 中转（`date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()`）；`Calendar` 可用 `ZonedDateTime.from()` 转换。
- 【L4】`Instant` 是 UTC 时间戳，适合存储和跨系统传输；展示给用户时再转 `ZonedDateTime`；跨时区运算必须用 `ZonedDateTime` 而非 `LocalDateTime`（后者无时区概念）。

:::

#### 🔀 发散问题

- **Q：`LocalDateTime` 和 `Instant` 怎么选？** → 需要时区语义（存储、传输、跨时区比较）用 `Instant`；仅表示本地日历时间（如“每天 09:00 开会”）用 `LocalDateTime`。
- **Q：`SimpleDateFormat` 为什么不线程安全？** → 它内部共享可变的 `Calendar` 实例做解析/格式化，多线程并发时字段被互相覆盖，需每次新建、`ThreadLocal` 包装或改用 `DateTimeFormatter`。

### 【中等】Java 9 引入的模块化系统（JPMS）有什么用？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 9 新特性 / 模块化 JPMS

#### 💎 关键结论

JPMS（Project Jigsaw）用 `module-info.java` 声明模块依赖与导出包，解决 JAR 地狱和封装不足：强封装（未导出包反射也不可访）、可靠依赖检查、`jlink` 定制精简 JRE。

#### ⚡记忆卡片

- **口诀**：requires 声明依赖，exports 控制可见，opens 留给反射，jlink 瘦身
- **关键词**：module-info ／ exports ／ jlink
- **链路**：声明模块 → requires 依赖检查 → exports/opens 控制可见性 → jlink 打包定制 JRE

#### 📖 核心知识

Java 9 引入**Java 平台模块系统（JPMS，Project Jigsaw）**，解决长期以来的**JAR 地狱**和**封装不足**问题。

**核心目标**：

- **强封装**：模块可显式声明哪些包对外暴露，**非导出包无法被反射访问**（即使 `setAccessible(true)`）。
- **可靠配置**：编译期和启动期检查模块依赖，提前发现缺失。
- **精简 JRE**：`jlink` 可打包**仅含所需模块**的定制 JRE，体积大幅缩小。

**模块定义示例**（`module-info.java`）：

```java
module com.example.app {
    requires java.sql;              // 依赖 java.sql 模块
    requires transitive java.base;  // 传递依赖
    exports com.example.api;        // 导出包，对外可见
    // com.example.internal 不导出，外部无法访问
    opens com.example.pojo to jackson;  // 仅对 jackson 反射开放
}
```

**关键关键字**：

| **关键字**            | **作用**                                    |
| --------------------- | ------------------------------------------- |
| `requires`            | 声明依赖                                    |
| `requires transitive` | 传递依赖（下游模块自动可用）                |
| `exports`             | 导出包（编译期+运行时可见）                 |
| `opens`               | 仅运行时反射开放（给框架如 Spring/Jackson） |
| `uses` / `provides`   | 服务接口与实现（SPI）                       |

**实际影响**：

- **库开发者**：可真正隐藏内部实现，反射也访问不了。
- **应用开发者**：依赖更清晰，但升级到 Java 9+ 时需处理未命名模块兼容性问题。
- **JDK 自身**：JDK 本身被拆分为约 90 个模块（`java.base`、`java.sql` 等）。

#### 🔬 扩展知识

::: details

- 【L3】封装的强制力：未导出包在编译期和运行时都被拒绝访问，反射 `setAccessible(true)` 也无效（除非 `opens` 或启动参数 `--add-opens`），这比 `private` 更强。
- 【L3】与类路径的关系：未模块化的 jar 全部进入“未命名模块”，可读一切导出包，这是存量代码升级 Java 9+ 的主要兼容问题来源；Spring 等主流框架自身仍未全面模块化。
- 【L4】`jlink` 定制 JRE 可将运行环境从数百 MB 缩小到几十 MB，是 GraalVM Native Image 之外的一种轻量化方案。

:::

#### 🔀 发散问题

- **Q：为什么很多项目至今不用 JPMS？** → 生态库模块化不彻底、`--add-opens` 兼容参数繁琐，收益（封装/jlink）对普通业务应用吸引力有限；但在 CLI 工具和云原生镜像瘦身场景仍有价值。

### 【中等】Java 11 的 var 局部变量类型推断怎么用？有什么限制？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 10-11 新特性 / var 类型推断

#### 💎 关键结论

`var`（JDK 10 引入、JDK 11 扩展到 Lambda 参数）让编译器从初始化表达式推断局部变量类型，仅是编译期语法糖，运行时类型不变；只能用于有初始化值的局部变量，不能用于字段、参数、返回值。

#### ⚡记忆卡片

- **口诀**：局部可推断，字段参数不行，null 无初始化不能用
- **关键词**：局部变量 ／ 编译期推断 ／ JDK 10
- **链路**：`var` + 初始化表达式 → 编译器推断静态类型 → 字节码中仍是具体类型

#### 📖 核心知识

**`var`**（JDK 10 引入，JDK 11 扩展）让编译器自动推断局部变量类型，减少冗余代码。

```java
// JDK 8：冗长的类型声明
Map<String, List<String>> map = new HashMap<String, List<String>>();

// var：编译器自动推断
var map = new HashMap<String, List<String>>();  // 类型仍然是 Map<String, List<String>>

// JDK 11 扩展：Lambda 参数上使用 var（可加注解）
list.stream().filter((@NotNull var s) -> s.length() > 5);
```

**使用限制**：

| 场景               | 是否支持 | 示例                                         |
| :----------------- | :------- | :------------------------------------------- |
| 局部变量           | ✔️       | `var list = new ArrayList<String>();`        |
| for 循环           | ✔️       | `for (var item : collection)`                |
| try-with-resources | ✔️       | `try (var reader = new BufferedReader(...))` |
| 方法参数           | ❌       | `void method(var x)` — 不允许                |
| 返回值             | ❌       | `var method()` — 不允许                      |
| 字段               | ❌       | `private var name;` — 不允许                 |
| 无初始化           | ❌       | `var x;` — 不允许，无法推断                  |
| 赋 null            | ❌       | `var x = null;` — 不允许，无法推断           |

**最佳实践**：仅在类型明显时（如构造器右侧）使用 `var`，避免降低代码可读性。

#### 🔬 扩展知识

::: details

- 【L3】`var` 是纯编译期机制：推断结果取初始化表达式的静态类型，字节码中与显式声明完全一致，反射/泛型擦除行为不变；`var x = null` 或无初始化因无法推断直接编译报错。
- 【L4】横向对比：C# 的 `var`、Kotlin 的全面类型推断思路相同；Java 刻意限制在局部变量，是为了保护公共 API 签名（字段/参数/返回值）的可读性。

:::

#### 🔀 发散问题

- **Q：`var` 能用于方法返回值吗？** → 不能，方法签名是 API 契约，隐藏返回类型会损害可读性；局部变量作用域小，推断风险可控。

### 【中等】Java 11 的 HTTP Client API 有什么特点？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 11 新特性 / HTTP Client

#### 💎 关键结论

`java.net.http.HttpClient`（JDK 11 正式版）是 Java 原生 HTTP 客户端：支持同步/异步（`CompletableFuture`）、默认 HTTP/2 多路复用、内置 WebSocket，用于替代老旧的 `HttpURLConnection`。

#### ⚡记忆卡片

- **口诀**：send 同步，sendAsync 异步，HTTP/2 默认开，客户端要复用
- **关键词**：HttpClient ／ sendAsync ／ HTTP/2
- **链路**：`HttpClient.newHttpClient()` → `HttpRequest.newBuilder()` 构建请求 → `send`/`sendAsync` → `BodyHandlers` 解析响应

#### 📖 核心知识

**`java.net.http.HttpClient`**（JDK 11 正式版）是 Java 原生异步 HTTP 客户端，替代老旧的 `HttpURLConnection`。

```java
HttpClient client = HttpClient.newHttpClient();

// 同步请求
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString("{\"name\":\"Tom\"}"))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

// 异步请求（返回 CompletableFuture）
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);
```

**核心特点**：

| 特性             | 说明                                                           |
| :--------------- | :------------------------------------------------------------- |
| **同步 + 异步**  | `send()` 同步、`sendAsync()` 异步（返回 `CompletableFuture`）  |
| **HTTP/2**       | 默认支持 HTTP/2（多路复用、头部压缩）                          |
| **WebSocket**    | 内置 WebSocket 客户端支持                                      |
| **BodyHandlers** | 灵活处理响应体：`ofString`、`ofFile`、`ofByteArray`、`ofLines` |

#### 🔬 扩展知识

::: details

- 【L3】`HttpClient` 实例不可变且线程安全，内部维护连接池与 HTTP/2 多路复用，应全局单例复用而非每次请求新建；超时通过 `connectTimeout` 与 `HttpRequest.timeout()` 分别控制。
- 【L4】与 Apache HttpClient/OkHttp 对比：原生客户端零依赖、支持 HTTP/2，但连接池参数、代理、拦截器等生态能力不如成熟第三方库，复杂场景仍多选 OkHttp。

:::

#### 🔀 发散问题

- **Q：`HttpURLConnection` 为什么被弃用？** → API 古老难用（只支持 HTTP/1.1、同步阻塞、异常处理别扭），JDK 11 后有原生 HttpClient 替代。

### 【中等】Java 11 的字符串 API 有哪些增强？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 11 新特性 / String API

#### 💎 关键结论

Java 11 为 `String` 新增 `isBlank`/`strip` 系列/`lines`/`repeat` 等实用方法；其中 `strip()` 基于 `Character.isWhitespace()` 支持 Unicode 空白，是 `trim()` 的现代替代。

#### ⚡记忆卡片

- **口诀**：strip 认 Unicode，isBlank 看空白，lines 出流，repeat 拼接
- **关键词**：strip ／ isBlank ／ repeat
- **链路**：去空白用 `strip` 系列 → 判空用 `isBlank` → 分行用 `lines` → 重复用 `repeat`

#### 📖 核心知识

Java 11 为 `String` 类新增了多个实用方法：

| 方法              | 说明                         | 示例                              |
| :---------------- | :--------------------------- | :-------------------------------- |
| `isBlank()`       | 是否为空或纯空白字符         | `" ".isBlank()` → `true`          |
| `strip()`         | 去除首尾空白（支持 Unicode） | `" hello ".strip()` → `"hello"`   |
| `stripLeading()`  | 去除前导空白                 |                                   |
| `stripTrailing()` | 去除尾部空白                 |                                   |
| `lines()`         | 按行分割返回 Stream          | `"a\nb\nc".lines().count()` → `3` |
| `repeat(int)`     | 重复拼接                     | `"ab".repeat(3)` → `"ababab"`     |

**`strip()` vs `trim()`**：`strip()` 基于 `Character.isWhitespace()`，支持 Unicode 空白字符；`trim()` 仅处理 ASCII ≤ 32 的字符。

#### 🔬 扩展知识

::: details

- 【L3】`trim()` 只清除码点 ≤ U+0020 的字符，对全角空格（U+3000）等 Unicode 空白无效；`strip()` 按 `Character.isWhitespace()` 判断，能正确处理这些字符，新代码应一律用 `strip()`。
- 【L3】`lines()` 返回懒加载 Stream，按 `\n`、`\r`、`\r\n` 分行，适合处理大文本；`isBlank()` 与 `isEmpty()` 的区别在于前者把纯空白串也视为“空”。

:::

#### 🔀 发散问题

- **Q：`isBlank()` 和 `isEmpty()` 有什么区别？** → `"".isEmpty()` 和 `" ".isEmpty()` 前者 true 后者 false；而 `" ".isBlank()` 为 true，即 `isBlank` = 空串或仅含空白字符。

### 【中等】Java 11 对 GC 有哪些重要更新？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 11 新特性 / GC 演进

#### 💎 关键结论

JDK 11 是 GC 里程碑：引入低延迟的 ZGC（实验）与 Epsilon；同期 G1 已是默认 GC（JDK 9 起），CMS 被废弃并于 JDK 14 移除，ZGC 在 Java 15 达到生产可用。

#### ⚡记忆卡片

- **口诀**：ZGC 亚毫秒，Epsilon 不回收，G1 是默认，CMS 被移除
- **关键词**：ZGC ／ G1 ／ Epsilon
- **链路**：JDK 9 默认 G1 → JDK 11 ZGC 实验 → Java 15 ZGC 生产可用 → Java 21 分代 ZGC

#### 📖 核心知识

JDK 11 是 GC 领域的重要里程碑，引入了两个新一代垃圾收集器：

| 收集器          | JDK 版本 | 核心特点                                                 |
| :-------------- | :------- | :------------------------------------------------------- |
| **ZGC**（实验） | JDK 11   | 亚毫秒停顿（<10ms），支持 TB 级堆，基于着色指针 + 读屏障 |
| **Shenandoah**  | JDK 12   | 低延迟（与 ZGC 竞争），基于转发指针，Red Hat 开发        |

**其他 GC 变更**：

- **G1 成为默认 GC**（JDK 9 起）
- **CMS 被标记为废弃**（JDK 9），JDK 14 正式移除
- **Epsilon GC**（JDK 11）：不做任何回收，仅用于性能测试基准

启用示例：

```bash
# JDK 11 启用 ZGC
java -XX:+UseZGC -Xmx4g YourApplication

# JDK 11 启用 Epsilon（不做 GC，堆满即 OOM）
java -XX:+UseEpsilonGC -Xmx256m YourApplication
```

#### 🔬 扩展知识

::: details

- 【L3】ZGC 演进：JDK 11 为实验特性，Java 15（JEP 377）正式生产可用，停顿时间不超过 10ms 且不随堆大小增长（支持 8MB~16TB）；Java 21（JEP 439）引入分代 ZGC，吞吐进一步提升。
- 【L3】技术路线对比：ZGC 用**着色指针 + 读屏障**实现并发整理，Shenandoah 用**转发指针 + 读屏障**，目标都是亚毫秒/毫秒级停顿；G1 则面向吞吐与停顿的均衡（可预测停顿模型）。
- 【L4】选型经验：大堆（数十 GB+）且延迟敏感选 ZGC；通用服务默认 G1；压测基准/短任务可用 Epsilon 排除 GC 干扰。

:::

#### 🔀 发散问题

- **Q：为什么 CMS 被移除？** → CMS 并发标记产生内存碎片、需回退到串行 Full GC、代码维护成本高，自 JDK 9 废弃后于 JDK 14 正式移除，由 G1/ZGC 接替。

### 【中等】Java 14 对 switch 有哪些增强？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 12-14 新特性 / switch 表达式

#### 💎 关键结论

JDK 14 正式标准化 switch 表达式：箭头语法默认无穿透、多值标签一行合并、`yield` 返回分支结果，switch 从语句升级为可赋值、必须穷尽的表达式。

#### ⚡记忆卡片

- **口诀**：箭头不穿透，多值逗号连，块中用 yield，表达式必穷尽
- **关键词**：`->` ／ yield ／ 穷尽检查
- **链路**：switch 作表达式 → 箭头/多值分支 → 代码块用 `yield` 返回 → 编译器检查穷尽

#### 📖 核心知识

JDK 14 引入**标准化的 switch 表达式**，支持**箭头语法**、**多值标签**、**yield 返回值**，大幅提升表达力。

**传统 switch 痛点**：

- 容易遗忘 `break` 导致**穿透（fall-through）**。
- 无法直接返回值（需借助中间变量）。
- 重复的 `case` 标签冗长。

**新特性对比**：

```java
// 旧写法
String result;
switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        result = "休息日";
        break;
    case TUESDAY:
        result = "工作日";
        break;
    default:
        result = "未知";
}
```

```java
// JDK 14+ 新写法（箭头语法 + 多值 + 直接返回）
String result = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> "休息日";  // 多值，无穿透
    case TUESDAY -> "工作日";
    default -> {
        // 复杂逻辑用 yield 返回
        log("未知日期: " + day);
        yield "未知";
    }
};
```

**核心改进**：

| **特性**     | **传统 switch**           | **JDK 14+ switch 表达式**              |
| ------------ | ------------------------- | -------------------------------------- |
| **穿透**     | 默认穿透，需 `break` 阻止 | 默认**无穿透**，每个分支独立           |
| **返回值**   | 不支持                    | 支持（`yield` 或箭头返回）             |
| **多值标签** | 需多个 `case`             | `case A, B, C ->` 一行搞定             |
| **default**  | 可选                      | 表达式形式**必须**穷尽（强制 default） |

#### 🔬 扩展知识

::: details

- 【L3】版本演进：switch 表达式 JDK 12 预览（JEP 325）→ JDK 13 二次预览引入 `yield`（JEP 354）→ JDK 14 正式（JEP 361）；同一 switch 中箭头与冒号标签不能混用。
- 【L4】演进方向：JDK 14 只解决“表达式化”，Java 21 进一步引入类型模式、`when` 守卫和 `case null`，详见本文档「Java 21 的 switch 模式匹配有什么增强？」。

:::

#### 🔀 发散问题

- **Q：`yield` 和 `return` 有什么区别？** → `return` 从方法返回；`yield` 仅从 switch 表达式中产出一个值，方法继续执行后面的代码。

### 【中等】Java 16 的 Record（记录类）有什么用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 16 新特性 / Record

#### 💎 关键结论

Record（Java 16 正式版）是不可变数据载体：一行声明自动生成构造器、访问器、`equals`/`hashCode`/`toString`，是 Lombok `@Data` 的官方替代品，适合 DTO/值对象等纯数据场景。

#### ⚡记忆卡片

- **口诀**：一行定数据，字段全 final，访问器无 get，紧凑构造器做校验
- **关键词**：record ／ 不可变 ／ 紧凑构造器
- **链路**：`record` 声明组件 → 自动生成构造器/访问器/equals/hashCode/toString → 紧凑构造器参数校验

#### 📖 核心知识

`Record` 是 Java 16 引入的**不可变数据载体**，自动生成样板代码，是 Lombok `@Data` 的官方替代品。

**核心特点**：

- **不可变**：所有字段 `final`，无 setter。
- **自动生成**：构造方法、`getter`（无 `get` 前缀）、`equals()`、`hashCode()`、`toString()`。
- **可扩展**：可添加方法、实现接口、添加静态成员。

**定义与使用**：

```java
// 一行定义
public record Point(int x, int y) {}

// 等价的传统 Java 类需 60+ 行
public final class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }   // 注意：无 get 前缀
    public int y() { return y; }
    // equals, hashCode, toString 省略...
}

// 使用
Point p = new Point(3, 4);
System.out.println(p.x());          // 3
System.out.println(p);              // Point[x=3, y=4]
System.out.println(p.equals(new Point(3, 4)));  // true
```

**紧凑构造器（Compact Constructor）**：用于参数校验

```java
public record Range(int start, int end) {
    public Range {  // 紧凑构造器
        if (start > end) {
            throw new IllegalArgumentException("start 不能大于 end");
        }
    }
}
```

**Record 的限制**：

- **不能继承**其他类（隐式继承 `java.lang.Record`）。
- 字段**不可变**（无法修改）。
- 不能声明 `native` 方法。

**适用场景**：DTO、值对象、配置项、API 响应等"纯数据"场景。不适合需要可变状态或复杂继承的领域模型。

#### 🔬 扩展知识

::: details

- 【L3】编译产物：record 编译为 `final` 类，隐式继承 `java.lang.Record`，组件对应 `private final` 字段，访问器方法名与组件同名（无 `get` 前缀）；Java 16 起还支持在方法内声明局部 record。
- 【L4】横向对比：Kotlin `data class` 允许 `var` 与 `copy()`，更灵活但牺牲不可变保证；Lombok `@Data` 靠注解处理器生成代码，record 是语言级原生支持，反射、序列化框架对其支持更规范。

:::

#### 🔀 发散问题

- **Q：Record 适合做 JPA 实体吗？** → 不适合：JPA 实体需要无参构造器、setter 和可变状态，而 record 全字段 final；record 更适合查询结果的 DTO 投影。
- **Q：record 能实现接口吗？** → 可以，也可以添加实例方法、静态成员，但不能继承类、不能声明实例字段（组件之外）。

### 【中等】Java 17 的 Sealed Classes（密封类）是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 17 新特性 / 密封类

#### 💎 关键结论

密封类用 `sealed` + `permits` 显式声明允许的子类，在开放继承与 `final` 之间提供“有界继承”第三种选择；配合 switch 穷尽检查，是类型安全领域建模（ADT）的利器。

#### ⚡记忆卡片

- **口诀**：sealed 定边界，permits 列子类，子类三选一，switch 能穷尽
- **关键词**：sealed ／ permits ／ final/sealed/non-sealed
- **链路**：`sealed` + `permits` 声明子类白名单 → 子类标注 final/sealed/non-sealed → switch 编译器穷尽检查

#### 📖 核心知识

**密封类**通过 `sealed` + `permits` 显式声明允许的子类，**精确控制继承层级**。

**核心价值**：在开放继承（普通类）和禁止继承（`final`）之间提供**第三种选择**——**有界继承**。

**定义示例**：

```java
// 密封类：明确指定允许的子类
public sealed class Shape permits Circle, Square, Triangle {}

// 子类必须是 final、sealed 或 non-sealed 之一
public final class Circle extends Shape { ... }       // 不再可继承
public final class Square extends Shape { ... }       // 不再可继承
public non-sealed class Triangle extends Shape { ... }  // 恢复开放继承
```

**与 Pattern Matching 结合（领域建模利器）**：

```java
public double area(Shape shape) {
    return switch (shape) {  // 编译器检查所有子类，无需 default
        case Circle c -> Math.PI * c.r() * c.r();
        case Square s -> s.side() * s.side();
        case Triangle t -> 0.5 * t.base() * t.height();
    };
}
```

**适用场景**：

- **领域建模**：限定业务概念的取值范围（如订单状态、支付方式）。
- **类型安全的代数数据类型（ADT）**：函数式编程中的和类型。
- **API 设计**：明确告知调用方“我有这几个实现”，配合 switch 穷尽检查。

#### 🔬 扩展知识

::: details

- 【L3】版本与规则：密封类 Java 15 预览、Java 17 正式（JEP 409）；直接子类必须显式声明为 `final`、`sealed`（继续限定）或 `non-sealed`（恢复开放继承）三者之一，且需与父类在同一模块/包中可见。
- 【L4】横向对比：对应 Kotlin 的 `sealed class`、Scala 的 ADT；在 Java 中与 record（积类型的分量）组合，即可在 JVM 上实现函数式语言风格的代数数据类型。

:::

#### 🔀 发散问题

- **Q：`non-sealed` 有什么意义？** → 密封链可以在某个子类处“放开”：该子类之后允许任意类继承，而密封类对其他分支的约束仍然生效。
- **Q：密封类和枚举怎么选？** → 取值固定且无需携带不同字段结构用枚举；每个分支需要不同数据字段（如不同形状参数）时用密封类 + record。

### 【中等】Java 17 的 Record（记录类）是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 16-17 新特性 / Record

#### 💎 关键结论

Record（JDK 16 正式版）用一行声明不可变数据类，自动生成构造器、访问器与 `equals`/`hashCode`/`toString`；紧凑构造器用于参数校验，限制是不能继承类、字段不可变、无 native 方法。

#### ⚡记忆卡片

- **口诀**：record 不可变，访问器无 get，校验写紧凑构造器
- **关键词**：record ／ 紧凑构造器 ／ java.lang.Record
- **链路**：声明组件 → 自动生成样板代码 → 紧凑构造器校验 → 不可变使用

#### 📖 核心知识

**Record（JDK 16 正式版）**是 Java 的**不可变数据载体**，自动生成样板代码，是 Lombok `@Data` 的官方替代品。

```java
// 一行定义
public record Point(int x, int y) {}

// 等价的传统 Java 类需 60+ 行（构造器、getter、equals、hashCode、toString）

// 使用
Point p = new Point(3, 4);
System.out.println(p.x());          // 3（注意：无 get 前缀）
System.out.println(p);              // Point[x=3, y=4]
```

**紧凑构造器**：用于参数校验

```java
public record Range(int start, int end) {
    public Range {  // 紧凑构造器
        if (start > end) throw new IllegalArgumentException("start > end");
    }
}
```

**Record 的限制**：

- **不能继承**其他类（隐式继承 `java.lang.Record`）
- 字段**不可变**（`final`）
- 不能声明 `native` 方法

#### 🔬 扩展知识

::: details

- 【L4】版本演进：Record 在 Java 14 首次预览（JEP 359）、Java 15 二次预览（JEP 384）、Java 16 正式发布（JEP 395）；Java 17 是 LTS，因此在生产中广泛落地，后续与 record 模式（Java 21）配合解构。
- 【L3】与 Lombok 对比：record 无需注解处理器、无字节码魔法，反射与序列化框架可直接识别；但 Lombok 可生成可变对象、builder、setter，两者适用面不同。

:::

#### 🔀 发散问题

- **Q：Record 的完整特性（定义、限制、场景）？** → 见本文档「Java 16 的 Record（记录类）有什么用？」。
- **Q：record 能自定义访问器吗？** → 可以，重写与组件同名的访问器方法即可（如返回前加校验/格式化），字段赋值逻辑仍由编译器生成。

### 【中等】Java 17 的文本块（Text Blocks）是什么？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 15-17 新特性 / 文本块

#### 💎 关键结论

文本块（JDK 15 正式版）用 `"""` 定义多行字符串，自动去除公共缩进、统一换行符，解决 JSON/SQL/HTML 拼接的可读性问题，可用 `.formatted()` 插值。

#### ⚡记忆卡片

- **口诀**：三引号包多行，缩进自动去，\s 留空格，formatted 插值
- **关键词**：`"""` ／ 自动缩进 ／ formatted
- **链路**：`"""` 开写多行内容 → 编译器按闭合位置去公共缩进 → 得到普通 String

#### 📖 核心知识

**文本块**（Text Blocks，JDK 15 正式版）用 `"""` 定义多行字符串，解决传统字符串拼接的可读性问题。

```java
// JDK 8：冗长的字符串拼接
String json = "{\n" +
    "  \"name\": \"Tom\",\n" +
    "  \"age\": 18\n" +
    "}";

// 文本块：清晰的多行格式
String json = """
    {
      "name": "Tom",
      "age": 18
    }
    """;
```

**特性**：

| 特性                   | 说明                                          |
| :--------------------- | :-------------------------------------------- |
| **自动缩进**           | 以公共缩进为基准，自动去除多余缩进            |
| **换行符**             | 统一为 `\n`（跨平台一致）                     |
| **转义字符**           | 支持 `\s`（保留尾部空格）、`\\`（行尾不换行） |
| **String.formatted()** | JDK 15+ 支持 `"""...""".formatted(args)`      |

```java
// 格式化文本块
String sql = """
    SELECT *
    FROM users
    WHERE age > %d AND city = '%s'
    """.formatted(18, "北京");
```

#### 🔬 扩展知识

::: details

- 【L3】处理规则：闭合 `"""` 的位置决定“偶然缩进”的去除量；`\s` 显式保留行尾空格，行尾 `\` 可续行不换行；文本块本质仍是 `String`，编译期完成所有处理，运行时无额外开销。
- 【L4】版本与对比：Java 13/14 预览、Java 15 正式（JEP 378）；Kotlin 原生支持 `"""` 原生字符串但无自动缩进，Python 的三引号也不做缩进处理。

:::

#### 🔀 发散问题

- **Q：文本块和 `String.join`/StringBuilder 拼接怎么选？** → 静态多行内容用文本块；需要运行时动态拼接仍用 StringBuilder/格式化，两者不冲突。

### 【中等】Java 17 的 instanceof 模式匹配是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 16-17 新特性 / instanceof 模式匹配

#### 💎 关键结论

instanceof 模式匹配（JDK 16 正式版）把类型检查与变量绑定合二为一：`obj instanceof String s` 匹配成功即可直接用 `s`，消除显式强转；绑定变量只在匹配为真的分支内有效。

#### ⚡记忆卡片

- **口诀**：匹配即绑定，免强转，作用域只看真分支
- **关键词**：instanceof 绑定 ／ 作用域 ／ 确定赋值
- **链路**：`instanceof 类型 变量` → 匹配成功绑定变量 → 条件真分支内直接使用

#### 📖 核心知识

**instanceof 模式匹配**（JDK 16 正式版）将类型检查和变量绑定合二为一，消除显式强制转换。

```java
// JDK 8：需要显式转换
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 17：模式匹配，直接绑定变量
if (obj instanceof String s) {
    System.out.println(s.length());  // 无需转换
}

// 支持在条件中组合
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

**作用域规则**：绑定变量的作用域仅限于模式匹配为 `true` 的分支。

```java
if (!(obj instanceof String s)) {
    return;  // s 不可用
}
// s 在此处可用（因为只有匹配成功才能执行到这里）
System.out.println(s.length());
```

#### 🔬 扩展知识

::: details

- 【L3】版本与作用域分析：Java 14 预览、Java 16 正式（JEP 394）；绑定变量的可见性由编译器的“确定赋值”分析决定，`if (!(obj instanceof String s)) return;` 之后 `s` 可用，但 `if (obj instanceof String s) {} else {}` 的 else 分支内不可用。
- 【L4】横向对比：Kotlin 的智能转换（smart cast）无需声明变量，C# 的 `is var`/`as` 模式类似；Java 的 instanceof 模式后续演化为 switch 类型模式（Java 21）与记录模式。

:::

#### 🔀 发散问题

- **Q：`if (obj instanceof String s || other)` 后能用 `s` 吗？** → 不能，`||` 右侧与整个表达式为真时不能保证匹配成功；只有 `&&` 后续条件与取反提前返回等能确定匹配的上下文才可用。

### 【中等】Java 17 的 switch 表达式增强是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 14-17 新特性 / switch 表达式

#### 💎 关键结论

switch 表达式（JDK 14 正式版）引入箭头语法与 `yield`，使 switch 可赋值、默认不穿透、必须穷尽所有分支，从根源上消除忘写 `break` 的穿透 bug。

#### ⚡记忆卡片

- **口诀**：箭头不穿透，多值一行写，块中 yield 返回，分支必穷尽
- **关键词**：箭头语法 ／ yield ／ 穷尽检查
- **链路**：switch 赋值给变量 → 箭头/多值分支 → 代码块 `yield` → 编译器穷尽校验

#### 📖 核心知识

**switch 表达式**（JDK 14 正式版）引入了 `->` 箭头语法和 `yield` 返回值，使 switch 可作为表达式使用。

```java
// JDK 8：传统 switch（需要 break，容易遗漏）
int days;
switch (month) {
    case JANUARY: case MARCH: case MAY: days = 31; break;
    case FEBRUARY: days = 28; break;
    default: days = 30;
}

// Java 17：switch 表达式（箭头语法，无需 break）
int days = switch (month) {
    case JANUARY, MARCH, MAY -> 31;
    case FEBRUARY -> 28;
    default -> 30;
};

// 多行代码块用 yield 返回值
String result = switch (code) {
    case 200 -> "OK";
    case 404 -> "Not Found";
    default -> {
        String msg = "Unknown: " + code;
        yield msg;  // 代码块中用 yield 返回值
    }
};
```

**核心优势**：

| 特性          | 传统 switch          | Java 17 switch 表达式  |
| :------------ | :------------------- | :--------------------- |
| **返回值**    | 不支持               | 可直接赋值给变量       |
| **case 穿透** | 需 `break`（易遗漏） | `->` 自动不穿透        |
| **多值合并**  | 每个 case 一行       | `case A, B, C ->`      |
| **穷尽检查**  | 无强制               | 表达式必须穷尽所有分支 |

#### 🔬 扩展知识

::: details

- 【L3】穷尽性检查：switch 作为表达式时编译器要求覆盖所有可能输入（否则编译错误），枚举可省略 default，其他类型需 default 兑底；箭头与冒号标签不可混用。
- 【L4】演进链路：JDK 14 表达式化 → Java 17 稳定普及 → Java 21 叠加类型模式/when 守卫，完整演进见本文档「Java 14 对 switch 有哪些增强？」和「Java 21 的 switch 模式匹配有什么增强？」。

:::

#### 🔀 发散问题

- **Q：switch 语句和 switch 表达式能混用语法吗？** → 不能：同一个 switch 要么全是冒号标签（语句，可穿透），要么全是箭头标签（表达式，不穿透）。

### 【中等】Java 21 的 switch 模式匹配有什么增强？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 21 新特性 / switch 模式匹配

#### 💎 关键结论

Java 21 正式版把 switch 从“值匹配”升级为模式匹配：支持任意类型模式、`when` 守卫条件、显式 `case null`，配合密封类实现编译器穷尽检查，无需 default。

#### ⚡记忆卡片

- **口诀**：类型可匹配，when 加条件，null 显式接，密封能穷尽
- **关键词**：类型模式 ／ when ／ case null
- **链路**：switch(任意对象) → 类型模式绑定变量 → `when` 细化 → 密封类穷尽检查

#### 📖 核心知识

**switch 模式匹配**（Java 21 正式版）将 `switch` 从“值匹配”升级为“类型匹配 + 守卫条件 + null 处理”的强大模式匹配工具。

**核心增强**：

```java
// 1. 类型模式 + 守卫条件
Object obj = getShape();
String result = switch (obj) {
    case Circle c when c.radius() > 10 -> "大圆";
    case Circle c                       -> "小圆";
    case Square s                       -> "正方形，边长=" + s.side();
    case null                           -> "null 值";  // 显式处理 null
    default                             -> "其他";
};

// 2. 与密封类结合——编译器穷尽检查
sealed interface Shape permits Circle, Square {}
record Circle(double radius) implements Shape {}
record Square(double side) implements Shape {}

double area(Shape shape) {
    return switch (shape) {  // 无需 default，编译器确保穷尽
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Square s -> s.side() * s.side();
    };
}
```

**与传统 switch 的区别**：

| 特性          | 传统 switch                     | Java 21 switch 模式匹配 |
| :------------ | :------------------------------ | :---------------------- |
| **匹配对象**  | 仅值（`int`、`String`、`enum`） | 任意类型 + 模式         |
| **null 处理** | 抛 NPE                          | `case null` 显式处理    |
| **守卫条件**  | 不支持                          | `when` 子句添加额外条件 |
| **穷尽检查**  | 仅 enum                         | 密封类 + enum 均可      |

#### 🔬 扩展知识

::: details

- 【L3】实现要点：模式匹配 switch 在 Java 21 正式（JEP 441）；分支按书写顺序匹配，`when` 守卫不满足时会继续尝试后续 case；`case null` 必须显式声明，否则传入 null 仍抛 NPE。
- 【L4】横向对比：能力对齐 Scala 的 match 表达式与 Kotlin 的 when（类型判断分支）；与密封类 + record 组合即 Java 版 ADT 模式匹配，详见本文档「Java 17 的 Sealed Classes（密封类）是什么？」。

:::

#### 🔀 发散问题

- **Q：为什么有了模式匹配还要保留 default？** → 非密封的开放类型无法穷尽，仍需 default 兑底；只有密封类/枚举能让编译器验证穷尽性。
- **Q：`when` 守卫和 `if` 嵌套有什么区别？** → `when` 是模式的一部分，守卫失败会回退到后续 case 继续匹配；分支内 `if` 则不会回退，语义更清晰且穷尽性可检查。

### 【中等】Java 21 的记录模式（Record Patterns）是什么？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 21 新特性 / 记录模式

#### 💎 关键结论

记录模式（Java 21 正式版）允许在 `instanceof` 和 `switch` 中直接解构 record 的字段，支持嵌套与 `var` 推断，使 Java 具备类似 Scala/Kotlin 的解构能力。

#### ⚡记忆卡片

- **口诀**：括号写组件，解构出字段，嵌套可递归，var 省类型
- **关键词**：解构 ／ 嵌套模式 ／ Record Patterns
- **链路**：`case Point(int x, int y)` → 自动调用访问器取值 → 绑定局部变量 → 支持嵌套与 `when` 守卫

#### 📖 核心知识

**记录模式（Record Patterns，Java 21 正式版）**允许在 `instanceof` 和 `switch` 中**解构 Record 的字段**，实现模式组合。

```java
record Point(int x, int y) {}
record Line(Point start, Point end) {}

// 1. instanceof 中解构
Object obj = new Point(3, 4);
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);  // 直接访问解构字段
}

// 2. 嵌套解构
Object obj2 = new Line(new Point(0, 0), new Point(5, 5));
if (obj2 instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
    double length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// 3. switch 中解构
String describe(Object obj) {
    return switch (obj) {
        case Point(int x, int y) when x == 0 && y == 0 -> "原点";
        case Point(int x, int y)                        -> "点(" + x + "," + y + ")";
        case Line(Point s, Point e)                     -> "线段";
        default                                          -> "未知";
    };
}
```

**核心价值**：实现了**代数数据类型的完整模式匹配**，使 Java 具备了类似 Scala/Kotlin 的解构能力。

#### 🔬 扩展知识

::: details

- 【L3】实现与规则：记录模式 Java 19/20 预览、Java 21 正式（JEP 440）；解构时实际调用 record 的访问器方法，因此重写访问器会影响解构结果；模式内可用 `var` 推断组件类型。
- 【L4】横向对比：对应 Scala case class 的 `unapply` 解构、Kotlin 的解构声明（componentN）；Java 的优势是解构与 switch 穷尽检查、`when` 守卫完整打通。

:::

#### 🔀 发散问题

- **Q：记录模式能用于普通类吗？** → 不能，仅适用于 record；普通类的模式匹配只能绑定整个对象（类型模式），字段级解构需要 record。

### 【中等】Java 21 的未命名变量（Unnamed Variables）是什么？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 21 新特性 / 未命名变量

#### 💎 关键结论

未命名变量用 `_` 表示“声明但不使用”的变量（Java 21 预览，Java 22 正式），可重复出现在同一作用域，明确表达“故意不用”的意图，消除 IDE 警告。

#### ⚡记忆卡片

- **口诀**：不用就下划线，catch 参数可省，同作用域可重复
- **关键词**：`_` ／ 未命名变量 ／ 意图表达
- **链路**：声明处写 `_` → 编译器忽略引用 → 同一作用域可多次使用

#### 📖 核心知识

**未命名变量**（Unnamed Variables，Java 21 预览）用 `_` 表示“声明但不使用”的变量，提升代码可读性。

```java
// 1. 忽略不需要的变量
var _ = someExpensiveComputation();  // 只关心副作用，不用返回值

// 2. try-with-resources 中忽略资源
try (var _ = acquireLock()) {
    // 只关心锁的作用域，不使用锁对象
    doWork();
}

// 3. for 循环中忽略循环变量
for (var _ : collection) {
    count++;  // 只关心元素个数
}

// 4. catch 中忽略异常
try {
    riskyOperation();
} catch (Exception _) {  // 不关心异常对象
    log("操作失败");
}

// 5. switch 中忽略模式变量
switch (shape) {
    case Circle _ -> "这是一个圆";  // 不需要访问圆的字段
    case Square _ -> "这是一个正方形";
}
```

**核心价值**：明确表示“这个变量是故意不用的”，避免 IDE 警告，提升代码意图表达。

#### 🔬 扩展知识

::: details

- 【L3】版本历史：Java 21 预览（JEP 443）、Java 22 正式（JEP 456）；`_` 可在同一作用域重复声明（普通变量不允许）；历史上 Java 9 曾把 `_` 从合法标识符改为关键字，为此特性铺路。
- 【L3】适用位置：局部变量、try-with-resources 资源、for 循环变量、catch 参数、Lambda 参数、switch 模式变量，覆盖所有“必须声明但不会读”的场景。

:::

#### 🔀 发散问题

- **Q：为什么不用空标识符而要用 `_`？** → 很多场景（catch 参数、Lambda 参数）语法上必须声明变量，`_` 既满足语法又明确表达“不用”，比随便取名或加 @SuppressWarnings 更清晰。

### 【中等】Java 21 的 Scoped Values 是什么？与 ThreadLocal 有什么区别？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：JDK 21 新特性 / ScopedValue 与虚拟线程

#### 💎 关键结论

ScopedValue（Java 21 预览，JEP 446）是不可变、作用域自动回收的线程上下文传递方案，无泄漏风险且对百万级虚拟线程友好，是 ThreadLocal 在高并发场景的替代者。

#### ⚡记忆卡片

- **口诀**：绑定一次只读，作用域结束自动失效，虚拟线程随便开
- **关键词**：ScopedValue ／ 不可变 ／ 虚拟线程
- **链路**：`ScopedValue.where(K, v).run(...)` 绑定 → 任意深度 `get()` 读取 → 作用域结束自动失效

#### 📖 核心知识

**Scoped Values（Java 21 预览，JEP 446）** 是比 `ThreadLocal` 更安全、更高效的线程上下文传递方案，专为**虚拟线程**设计。

| 维度             | ThreadLocal                       | Scoped Values                  |
| :--------------- | :-------------------------------- | :----------------------------- |
| **可变性**       | 可任意修改（`set`/`remove`）      | **不可变**，作用域内只读       |
| **生命周期**     | 线程生命周期，需手动清理          | 作用域结束自动失效，无泄漏风险 |
| **虚拟线程友好** | 百万虚拟线程时内存开销巨大        | 轻量级，专为虚拟线程优化       |
| **继承性**       | InheritableThreadLocal 有性能问题 | 支持结构化并发中的安全传递     |

```java
// Scoped Values 用法
private static final ScopedValue<String> USER = ScopedValue.newInstance();

// 在作用域内绑定值
ScopedValue.where(USER, "admin").run(() -> {
    processRequest();  // 内部可读取 USER
});

// 在任意深度读取
void processRequest() {
    String user = USER.get();  // "admin"，无需参数传递
}
```

**适用场景**：HTTP 请求上下文、用户身份、分布式追踪 ID 等“请求级”上下文传递，替代 Spring 中常见的 `ThreadLocal` 方案。

#### 🔬 扩展知识

::: details

- 【L3】性能原理：`ThreadLocal` 每线程维护一张可变映射表，百万虚拟线程时内存与拷贝开销巨大；ScopedValue 的值随调用栈绑定、多个作用域值可共享存储，不可变设计使其无需防御性拷贝与手动清理。
- 【L3】版本状态：ScopedValue 自 Java 21（JEP 446）起多轮预览，与结构化并发（StructuredTaskScope，子任务自动继承作用域值）配套演进；生产引入前需确认所用 JDK 版本的支持状态。
- 【L4】迁移考量：现有基于 `ThreadLocal` 的框架集成（如 MDC、事务上下文）需等待生态适配；只读上下文的场景（用户身份、traceId）迁移收益最大。

:::

#### 🔀 发散问题

- **Q：虚拟线程时代 ThreadLocal 还能用吗？** → 能用但昂贵：每个虚拟线程都会持有一份副本，百万级虚拟线程下内存压力显著；平台线程场景 ThreadLocal 仍是标准方案。
- **Q：ScopedValue 如何传递到子任务？** → 配合结构化并发的 `StructuredTaskScope`，fork 出的子任务自动继承父作用域绑定的值，无需手动传递。
