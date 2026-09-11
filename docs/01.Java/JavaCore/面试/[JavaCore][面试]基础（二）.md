---
title: Java 基础面试二
cover: https://raw.githubusercontent.com/dunwu/images/master/archive/2025/03/020ab2bf4af8401590e0291a34f873f8.jpg
date: 2024-07-03 07:44:02
order: 2
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
permalink: /pages/e04a6099/
---

# Java 基础面试二

## Java 面向对象

### 【简单】public、private、protected，以及无修饰符有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：面向对象 / 访问控制

#### 💎 关键结论

四个级别按可见范围从小到大：`private`（仅当前类）→ 无修饰符/包私有（同包）→ `protected`（同包 + 子类）→ `public`（任意类）。本质是封装：对外暴露越少，耦合越低、越易演进。

#### ⚡记忆卡片

- **口诀**：私（类）包（包）护（包+子类）公（全开）
- **关键词**：`private` ／ 包私有 ／ `protected` ／ `public`
- **链路**：当前类 → 同包类 → 跨包子类 → 全部可见

#### 📖 核心知识

1. **`private`**：仅当前类可访问，是封装的基石。
2. **无修饰符（default / 包私有）**：仅同一包内的类可访问。
3. **`protected`**：同一包内 + 跨包的子类可访问（跨包只能通过继承访问，不能通过包内实例随意访问）。
4. **`public`**：任意类与对象可访问，构成类的公开 API。
5. 设计原则：**成员可见性默认最小化**，只在确需对外时才逐级放开。

#### 🔬 扩展知识

::: details

- 【L3】访问控制以“类 + 包”为粒度，不精确到模块；JDK 9 模块系统（JPMS）在此之上增加了模块级封装，`public` 类未被模块 `exports` 时对外部模块仍不可见。
- 【L3】`private` 成员可被反射配合 `setAccessible(true)` 访问（受 JDK 9+ 模块系统限制），说明访问控制是编译期契约而非运行时绝对屏障。
- 【L4】对比 Kotlin：无 `protected` 包语义，默认可见性为 `public`，更依赖显式声明。
  :::

#### 🔀 发散问题

- **Q：为什么 `protected` 跨包只能通过子类访问？** → 为了让受保护的成员只在继承体系内流转，防止同包外的任意类借实例引用绕过封装。
- **Q：包私有与 JDK 9 模块的关系？** → 模块未 `exports` 的包，即使类是 `public`，对其他模块也不可见，模块封装严于包封装。

### 【简单】对象实体与对象引用有何不同？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：面向对象 / 内存模型

#### 💎 关键结论

对象实体是 `new` 出来、存在堆上的实例；对象引用是栈上（或局部变量表里）指向该实例的“遥控器”。一个引用最多指向 1 个对象，一个对象可被多个引用指向，赋值传递的永远是引用而非对象本身。

#### ⚡记忆卡片

- **口诀**：实体在堆，引用在栈；一绳一气球，多绳同一球
- **关键词**：堆内存 ／ 栈内存 ／ 引用指向
- **链路**：`new` 创建实体（堆） → 引用指向实体（栈） → 赋值复制引用

#### 📖 核心知识

1. **对象是用来描述客观事物的一个抽象**，由一组属性和对这组属性进行操作的一组服务组成。
2. **类是具有相同属性和方法的一组对象的集合**，为属于该类的所有对象提供统一的抽象描述，内部包括属性和方法两个主要部分。
3. `new` 创建对象实例（对象实例在**堆内存**中），对象引用指向对象实例（对象引用存放在**栈内存**中）。
4. 一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）。
5. 一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。

#### 🔬 扩展知识

::: details

- 【L3】对象实体在堆中包含对象头（Mark Word、类型指针）、实例数据与对齐填充；引用在 64 位 JVM 开启指针压缩（`-XX:+UseCompressedOops`，默认开启）时占 4 字节。
- 【L3】方法参数与赋值传递的均为引用副本（Java is pass-by-value of references），修改引用指向不影响调用方，但通过引用修改对象状态会影响调用方。
- 【L4】C++ 中对象可值语义（栈上直接构造），拷贝默认按值复制；Java 除基本类型外一律引用语义。
  :::

#### 🔀 发散问题

- **Q：两个引用指向同一对象，修改一个会影响另一个吗？** → 会。二者操作的是同一实体，这正是浅拷贝共享引用问题的根源，见本文档「深拷贝和浅拷贝有什么区别？」。
- **Q：引用可以为 null 意味着什么？** → 表示不指向任何对象，对其解引用（调用方法/访问字段）会抛 `NullPointerException`。

### 【简单】接口和抽象类有什么区别？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：面向对象 / 抽象机制

#### 💎 关键结论

接口是“行为契约”（What to do），支持多实现、只有常量；抽象类是“共性代码复用”（How + What），单继承、可持状态与构造器。Java 8 的 `default` 方法让接口也能提供实现，选型从“背区别”升级为“讲设计决策”：优先接口，需要状态/构造器/protected 时用抽象类。

#### ⚡记忆卡片

- **口诀**：接口定行为可多实现，抽象类提共性单继承
- **关键词**：行为契约 ／ 代码复用 ／ default 方法 ／ 二进制兼容
- **链路**：定义契约（接口） → 骨架实现（抽象类） → 具体实现（类）

#### 📖 核心知识

1. **基础对比**：

| **维度**           | **接口（Interface）**                   | **抽象类（Abstract Class）**      |
| ------------------ | --------------------------------------- | --------------------------------- |
| **本质**           | 行为契约（What to do）                  | 代码复用 + 行为契约（How + What） |
| **实例化**         | ❌ 不可                                 | ❌ 不可                           |
| **构造器**         | ❌ 无（无实例状态）                     | ✔️ 有（子类 `super()` 调用）      |
| **成员变量**       | 仅 `public static final` 常量           | 任意（private/protected/public）  |
| **方法（JDK 7-）** | 仅抽象方法                              | 抽象 + 具体方法                   |
| **方法（JDK 8+）** | 抽象 + `default` + `static`             | 同 JDK 7                          |
| **方法（JDK 9+）** | + `private` 方法（供 default 复用）     | 同 JDK 7                          |
| **继承/实现**      | 类可 `implements` 多个接口              | 类只能 `extends` 一个抽象类       |
| **访问修饰符**     | 方法默认 `public`（JDK 9 private 除外） | 任意                              |
| **设计目的**       | 定义**跨层次**的可选行为                | 提取**同一层次**的共性代码        |

2. **Java 8 引入 default 方法的根本原因是二进制兼容性**：要给 `Collection` 新增 `stream()`，但它有大量第三方实现，若新增抽象方法，所有未重新编译的旧代码运行时会抛 `AbstractMethodError`。

```java
// JDK 8 对 Collection 接口的改动
public interface Collection<E> extends Iterable<E> {
    // 旧接口中的抽象方法（实现类需自行实现）
    int size();
    boolean isEmpty();

    // JDK 8 新增 —— 必须用 default，否则破坏所有第三方实现
    default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }

    default Stream<E> parallelStream() {
        return StreamSupport.stream(spliterator(), true);
    }

    // 甚至可以在接口中提供 removeIf 的默认实现
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
}
```

> **📌 度量标准**：`AbstractMethodError` 是 JVM 层的致命错误——已编译的 `.class` 文件的 `invokevirtual` 指令指向不存在的方法，直接导致进程崩溃。这就是为什么“接口演进”在 JDK 8 前是 Java 生态的头号痛点。

3. **首选接口的三个理由**（《Effective Java》Item 20）：

   - **灵活性**：一个类可实现多个接口，但只能继承一个类，接口不消耗“唯一的继承位置”。
   - **可演进性**：`default` 方法允许接口持续演进而不破坏实现者。
   - **可组合性**：通过接口组合（`implements A, B, C`）组装能力，比继承层次更灵活。

4. **仍需抽象类的场景**：

| **场景**                                        | **为什么抽象类更好**                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| 需要**非 static 成员变量**时                    | 接口只能有常量。如 `AbstractMap` 持有 `size` 字段                    |
| 需要在**构造器中执行初始化逻辑**                | 接口无构造器。如 `AbstractList` 的 `modCount` 初始化                 |
| 需要 `protected` 成员（内部可访问、外部不可见） | 接口方法只能是 `public`（JDK 9+ 支持 private，但仍不支持 protected） |
| 骨架实现（Skeletal Implementation）             | 同时提供接口 + 抽象骨架类，如 `AbstractList` + `List` 接口           |

::: details 经典骨架实现模式

```java
// 接口定义契约
public interface List<E> extends Collection<E> { ... }

// 抽象骨架类提供通用实现（减小实现者的工作量）
public abstract class AbstractList<E> extends AbstractCollection<E> implements List<E> {
    // 提供了 iterator、size 以外的所有 List 方法实现
    // 子类只需实现 iterator() 和 size() 两个方法
}

// 用户自定义列表只需继承骨架类
class MyList<E> extends AbstractList<E> {
    // 只需实现 get() 和 size()，其他方法从 AbstractList 继承
}
```

:::

5. **default 方法冲突的解决规则**：类方法 > 子接口 > 父接口，无关接口冲突必须显式覆盖，详见本文档「接口的默认方法冲突如何解决？」。

#### 🔬 扩展知识

::: details

- 【L3】JDK 17 的 `sealed class`/`sealed interface`（permits 限定实现者）配合 JDK 21 的 Pattern Matching for switch，可实现代数数据类型（ADT），编译器可检查 switch 穷举性，取代 JDK 17 前的 Visitor 模式：

```java
// 密封接口 + record 实现类 = ADT
sealed interface Expr permits Const, Add, Mul {}
record Const(int val) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

// 编译器检查穷举性——遗漏任何一个子类型就报错
int eval(Expr e) {
    return switch (e) {
        case Const c -> c.val();
        case Add  a -> eval(a.left()) + eval(a.right());
        case Mul  m -> eval(m.left()) * eval(m.right());
        // 无需 default！编译器已穷举所有子类型
    };
}
```

这与 Kotlin 的 `sealed class` + `when`、Scala 的 `sealed trait` + `match`、Rust 的 `enum` + `match` 是同一模式。

- 【L4】跨语言对比：Scala trait 可以持有状态（`val` 成员），Java 接口不能：

```scala
// Scala trait — 可以拥有具体的 val 成员变量
trait Logger {
  val prefix: String = "[LOG]"      // ← Scala trait 有状态！
  def log(msg: String) = println(s"$prefix $msg")
}
```

这导致 Java 接口在某些设计场景下不得不退回到**抽象类 + 接口骨架**模式（如 `AbstractList`），而 Scala trait 可以直接承载一切。Java 设计者刻意不引入 trait 式的状态能力，是为了保持接口语义的纯粹性：**接口 = 行为契约，不应有实例状态**。这是哲学选择，不是技术限制。
:::

#### 🏭 实战场景

::: details

- JDK 8 正是借助 `default` 方法给 `Collection` 增加 `stream()`/`parallelStream()`/`removeIf()`，让 Guava、Apache Commons 等海量第三方集合实现无需重新编译即可平滑升级；若当年用抽象方法演进，整个生态会因 `AbstractMethodError` 崩溃。
- 典型微服务工程中，业务模块普遍采用“接口（SPI 契约）+ Abstract 骨架类 + 具体实现”三层结构（如 Spring 的 `List`/`AbstractList` 同款套路），一次接口新增方法可借助 default 做到零停机发布。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “接口只能有抽象方法” → JDK 8+ 支持 default/static 方法，JDK 9+ 支持 private 方法。
- ❌ “抽象类必须有抽象方法” → 可以所有方法都是具体的（如工具类模板）。
- ❌ “接口 = 纯抽象类” → JDK 8 以前相近，之后接口能力大幅增强，两者定位分化。
- ❌ “default 方法破坏单继承” → default 只影响行为继承，不影响状态继承（无成员变量），Java 仍是单继承。
  :::

#### 🔀 发散问题

- **Q：接口的 default 方法会破坏已有实现类吗？** → 不会，这正是 default 的设计目的（二进制兼容）；仅当多个接口出现同名 default 方法时，实现类才必须显式覆盖。
- **Q：为什么接口不能持有实例状态？** → 接口是多实现的可选能力契约，若携带实例字段，多实现时的状态归属会产生歧义；JDK 选择保持“接口 = 纯行为契约”。

### 【中等】什么是 Java 内部类？内部类有什么作用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：面向对象 / 内部类

#### 💎 关键结论

内部类是定义在另一个类内部的类，共四种：成员内部类、局部内部类、匿名内部类、静态嵌套类。核心价值是逻辑聚合、强化封装、回调实现与间接多重继承；非静态内部类还隐式持有外部类引用。

#### ⚡记忆卡片

- **口诀**：成员、局部、匿名、静态四类；封装、回调、多继承三用
- **关键词**：成员内部类 ／ 匿名内部类 ／ 静态嵌套类
- **链路**：定义在外部类内 → 访问外部私有成员 → 编译生成独立 `Outer$Inner.class`

#### 📖 核心知识

1. **定义**：内部类（Inner Class）是定义在另一个类内部的类，共四种类型：

   - **成员内部类**：作为外部类的成员存在。
   - **局部内部类**：定义在方法或作用域内的类。
   - **匿名内部类**：没有名字的局部内部类。
   - **静态嵌套类**：用 `static` 修饰的嵌套类。

2. **作用**：

   - **逻辑聚合**：当某个类只对另一个类有用时，可以将其嵌入使用它的类中，保持代码在一起。
   - **强化封装**：内部类可以访问外部类的私有成员，同时自身也可以对外部完全隐藏。
   - **间接实现多重继承**：通过内部类可以间接实现多重继承的效果。
   - **回调机制**：常用于事件处理和监听器实现。
   - **代码简化**：特别是匿名内部类可以减少代码量。

3. **特点**：

   - 内部类可以访问外部类的所有成员（包括 `private`）。
   - 外部类需要通过实例化内部类来访问其成员。
   - 内部类编译后会生成独立的 `.class` 文件（格式：`OuterClass$InnerClass.class`）。
   - 非静态内部类不能有静态成员（静态内部类可以）。
   - 内部类可以继承其他类或实现接口。

#### 🔬 扩展知识

::: details

- 【L3】非静态内部类能访问外部私有成员的原理：编译器为外部类生成访问器方法（如 `access$000`），内部类通过这些合成方法间接访问；JDK 11+ 引入 Nestmates（嵌套伙伴）机制，`NestHost`/`NestMembers` 属性让 JVM 原生支持嵌套类间私有访问，不再生成访问器。
- 【L3】非静态内部类字节码中隐含一个指向外部实例的字段（`this$0`），这是它不能有静态成员、且可能引发内存泄漏的根本原因。
- 【L4】Kotlin 的 `inner class` 对应 Java 非静态内部类，默认嵌套类则对应 Java 静态嵌套类，语义默认相反。
  :::

#### 🔀 发散问题

- **Q：静态嵌套类为什么不叫“静态内部类”？** → 严格来说它与外部实例无关，官方文档称 Static Nested Class，只有非 static 的才叫 Inner Class；见本文档「四种内部类有什么区别？」。
- **Q：Lambda 能完全替代匿名内部类吗？** → 仅函数式接口场景可以；需要继承类、多方法实现或访问 this 指向自身实例时仍须用匿名内部类。

### 【中等】四种内部类有什么区别？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：面向对象 / 内部类

#### 💎 关键结论

按声明位置与修饰符区分：成员内部类（类中非 static，持外部引用）、静态嵌套类（类中 static，无外部引用）、局部内部类（方法内）、匿名内部类（表达式中）。是否隐式持有外部类引用是最大分水岭，直接决定内存泄漏风险。

#### ⚡记忆卡片

- **口诀**：成员持引用，静态独立行；局部方法内，匿名表达式
- **关键词**：外部引用 ／ `outer.new Inner()` ／ effectively final
- **链路**：声明位置 → 是否 static → 是否持有外部引用 → 创建方式与泄漏风险

#### 📖 核心知识

1. **四类对比**：

| **类型**       | **声明位置**  | **static** | **访问外部成员**      | **创建方式**        | **典型用途**    |
| -------------- | ------------- | ---------- | --------------------- | ------------------- | --------------- |
| **成员内部类** | 类中成员位置  | 否         | 全部（含 private）    | `outer.new Inner()` | 关联外部实例    |
| **静态嵌套类** | 类中成员位置  | 是         | 仅静态成员            | `new Outer.Inner()` | Builder、工具类 |
| **局部内部类** | 方法/代码块中 | 否         | 全部 + final 局部变量 | 方法内 new          | 临时封装        |
| **匿名内部类** | 表达式中      | -          | 全部 + final 局部变量 | `new Type() {...}`  | 回调、监听      |

2. **非静态内部类隐式持有外部类引用**：可能导致内存泄漏（如 Android Handler 持有 Activity）。
3. **局部/匿名内部类访问的局部变量必须 final（或 effectively final）**：因局部变量在栈上，内部类对象生命周期可能超出方法。
4. **Lambda 可替代匿名内部类**：函数式接口场景优先用 Lambda。

#### 🔬 扩展知识

::: details

- 【L3】匿名内部类编译后生成 `Outer$1.class`、`Outer$2.class` 等编号类名；捕获的 effectively final 局部变量会被复制为构造器参数存入匿名类字段。
- 【L3】静态嵌套类不生成 `this$0` 字段，与外部类仅是命名空间关系，可被序列化、可定义静态成员（JDK 16 前成员/局部/匿名内部类不能定义 static 成员，JDK 16+ 放开）。
- 【L4】对比 Kotlin：嵌套类默认不持外部引用（等价 Java 静态嵌套类），需显式 `inner` 关键字才持有，从语言层面降低了泄漏风险。
  :::

#### 🔀 发散问题

- **Q：为什么 Android 中非静态 Handler 容易泄漏 Activity？** → 非静态内部类持有 Activity 引用，延迟消息未处理完时 Activity 无法被 GC 回收；应改为静态内部类 + `WeakReference`。
- **Q：effectively final 是什么？** → JDK 8 引入，变量未被重新赋值即视为 final，可被 Lambda/内部类捕获，免去显式 `final` 声明。

### 【简单】为什么 Java 不支持多重继承？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：面向对象 / 继承

#### 💎 关键结论

Java 类不支持多重继承，核心是为了避免菱形继承问题（Diamond Problem）带来的歧义与复杂度；转而用“单继承类 + 多实现接口”兼顾能力组合与安全，JDK 8 后接口 default 方法冲突通过强制重写解决。

#### ⚡记忆卡片

- **口诀**：类单继承避菱形，接口多实现补能力
- **关键词**：菱形继承 ／ 歧义 ／ 接口多实现
- **链路**：多父类同名方法 → 调用歧义 → 单继承 + 多接口 → default 冲突强制重写

#### 📖 核心知识

1. **歧义性**：如果类 C 继承自类 A 和类 B，而 A 和 B 都有同名方法 `method()`，调用 `C.method()` 时无法确定应该调用 A 还是 B 的版本。
2. **复杂度**：多重继承会显著增加编译器和 JVM 的实现复杂度，方法调用、构造函数调用顺序变得难以确定。
3. **Java 的替代方案**：类可以实现多个接口，接口提供多重继承的行为规范，但不包含具体实现（JDK 8 前）。
4. **default 方法的新问题**：JDK 8 后接口支持默认方法，菱形问题再现；Java 强制规定，如果多个接口存在相同的默认方法，子类必须重写这个方法，否则编译器报错。

#### 🔬 扩展知识

::: details

- 【L3】C++ 用虚继承（virtual inheritance）解决菱形问题，但引入虚基类指针与构造顺序复杂性；Python 用 C3 线性化算法确定多继承的 MRO（方法解析顺序）。
- 【L4】Java 接口 default 冲突规则（类优先、子接口优先、否则强制显式覆盖）相比 C++/Python 的隐式决议，把歧义暴露到编译期，是更安全的设计取舍。
  :::

#### 🔀 发散问题

- **Q：接口多实现算不算多重继承？** → 算行为层面的多重继承；由于 JDK 8 前接口无实现、无状态，不会产生菱形歧义。
- **Q：多个接口 default 方法冲突时编译器怎么处理？** → 直接编译报错，强制实现类显式覆盖，见本文档「接口的默认方法冲突如何解决？」。

### 【中等】深拷贝和浅拷贝有什么区别？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：面向对象 / 对象拷贝

#### 💎 关键结论

浅拷贝只复制对象本身：基本类型字段按值复制，引用类型字段复制引用（新旧对象共享）；深拷贝递归复制所有被引用子对象，修改完全隔离。`Object.clone()` 默认浅拷贝，对象含可变引用字段且需独立时必须深拷贝。

#### ⚡记忆卡片

- **口诀**：浅拷共享引用，深拷递归重建
- **关键词**：浅拷贝 ／ 深拷贝 ／ `Object.clone()`
- **链路**：克隆对象本身 → 引用字段复制方式 → 浅拷共享/深拷重建

#### 📖 核心知识

1. **两者对比**：

| **关键点**       | **浅拷贝**                           | **深拷贝**                       |
| :--------------- | :----------------------------------- | :------------------------------- |
| **复制对象**     | 只复制对象本身（基本类型值拷贝）     | 递归复制对象及其引用的所有子对象 |
| **引用类型字段** | 新旧对象共享同一引用（修改相互影响） | 创建全新引用对象（修改完全隔离） |
| **内存开销**     | 小（仅复制一层）                     | 大（递归复制所有关联对象）       |
| **实现方式**     | 默认`Object.clone()`                 | 需手动实现递归克隆/序列化/工具类 |
| **适用场景**     | 对象无可变引用字段                   | 对象含可变引用字段且需完全独立   |

2. **本质区别**：浅拷贝是“复制钥匙”，深拷贝是“复制钥匙+保险箱”。

3. **实现方式对比**：

| **方法**                     | **浅拷贝** | **深拷贝** | **说明**                      |
| :--------------------------- | :--------- | :--------- | :---------------------------- |
| `Object.clone()`             | ✓          | ✗          | 默认浅拷贝                    |
| **手动递归克隆**             | ✗          | ✓          | 需所有引用类型实现`Cloneable` |
| **序列化反序列化**           | ✗          | ✓          | 通过`ObjectOutputStream`实现  |
| **工具类（Apache Commons）** | ✗          | ✓          | `SerializationUtils.clone()`  |

4. **注意事项**：

   - 深拷贝需处理循环引用问题。
   - 推荐使用`SerializationUtils.clone()`或 JSON 序列化实现深拷贝。
   - 不可变对象（如 String）的浅拷贝是安全的。

::: code-tabs#深拷贝和浅拷贝实现示例

@tab 浅拷贝实现

```java
class Person implements Cloneable {
    String name;
    Address address; // 引用类型字段

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone(); // 默认浅拷贝
    }
}

// 测试
Person p1 = new Person("Alice", new Address("北京"));
Person p2 = (Person)p1.clone();
p2.address.city = "上海"; // p1.address.city 也会变成"上海"
```

@tab 深拷贝实现

```java
@Override
protected Object clone() throws CloneNotSupportedException {
    Person cloned = (Person)super.clone();
    cloned.address = (Address)address.clone(); // 手动复制引用对象
    return cloned;
}

// Address 类也需实现 Cloneable
class Address implements Cloneable {
    String city;
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

:::

#### 🔬 扩展知识

::: details

- 【L3】序列化式深拷贝要求引用图中所有对象实现 `Serializable`，`transient` 字段不会被复制；JSON 往返式深拷贝（如 Gson/Jackson 序列化再反序列化）无需 Serializable，但默认不支持循环引用，需自行处理或用带循环检测的库。
- 【L3】手动递归克隆要求每个引用类型都实现 `Cloneable` 并正确重写 `clone()`，链路长、易遗漏，这也是《Effective Java》建议改用拷贝构造器的原因。
- 【L4】对比 C++：拷贝构造/赋值运算符由开发者显式定义值语义；Java 的 `clone()` 依赖 `Cloneable` 标记接口改变父类方法行为，被公认为设计缺陷。
  :::

#### 🔀 发散问题

- **Q：为什么不可变对象不需要深拷贝？** → 状态不可变，共享引用等价于隔离，浅拷贝天然安全。
- **Q：深拷贝有哪些实现方式？** → 手动递归克隆、序列化反序列化、`SerializationUtils.clone()`、JSON 往返，各有性能与约束取舍。
- **Q：`Object#clone()` 与 `Cloneable` 具体怎么用？** → 见本文档「Object#clone() 方法和 Cloneable 接口如何使用？」。

### 【简单】面向对象和面向过程有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：面向对象 / 编程范式

#### 💎 关键结论

面向过程以“步骤”为中心，按功能流程拆函数，数据与函数独立；面向对象以“对象”为中心，把数据与行为封装成类，靠继承/多态扩展。小型简单任务面向过程直接高效，复杂、需长期维护的系统面向对象更易扩展维护。

#### ⚡记忆卡片

- **口诀**：面向过程看步骤，面向对象看实体
- **关键词**：步骤 ／ 对象 ／ 封装、继承、多态
- **链路**：需求 → 拆步骤（POP）或抽象实体（OOP） → 函数/类组织 → 扩展方式不同

#### 📖 核心知识

1. **两者对比**：

| 维度         | 面向对象（OOP）               | 面向过程（POP）          |
| ------------ | ----------------------------- | ------------------------ |
| **核心思想** | 以**对象**为中心              | 以**步骤**为中心         |
| **代码组织** | 按**现实实体**抽象为类        | 按**功能流程**拆分为函数 |
| **数据管理** | 数据与行为封装在对象中        | 数据与函数独立           |
| **扩展方式** | 通过继承/多态扩展（开闭原则） | 需修改函数逻辑           |
| **典型特性** | 封装、继承、多态三大特性      | 无三大特性               |
| **典型语言** | Java, Python, C++             | C, Pascal                |

2. **选型建议**：简单脚本、嵌入式底层等对性能与流程控制敏感的场景适合面向过程；业务复杂、多人协作、需要长期演进的系统适合面向对象。
3. 二者并非对立：Java 内部方法级实现仍带有面向过程色彩，实际工程是两种思想的混合。

### 【中等】面向对象三大特征和五大原则是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：面向对象 / 设计原则

#### 💎 关键结论

三大特征：封装隐藏细节保安全、继承复用代码、多态同一行为不同实现增扩展；五大原则即 SOLID：单一职责、开闭、里氏替换、接口隔离、依赖倒置。一句话：封装保证安全性，继承提高复用性，多态增强扩展性，SOLID 让代码更灵活、可维护、易扩展。

#### ⚡记忆卡片

- **口诀**：封继多三特征，单开里接依五原则
- **关键词**：封装、继承、多态 ／ SOLID
- **链路**：封装保安全 → 继承提复用 → 多态增扩展 → SOLID 指导设计

#### 📖 核心知识

1. **三大特征**：

   - **封装（Encapsulation）**：**隐藏内部细节，暴露安全接口**。用 `private` 保护数据，通过 `getter/setter` 控制访问；示例：`BankAccount` 类隐藏余额，提供 `deposit()`/`withdraw()` 方法。
   - **继承（Inheritance）**：**子类复用父类属性和方法**。通过 `extends` 实现（如 `Dog extends Animal`）；注意 Java 是单继承（一个子类只能有一个父类）。
   - **多态（Polymorphism）**：**同一行为的不同实现方式**。**编译时多态**：方法重载（`Overload`）；**运行时多态**：方法重写（`Override`）+ 向上转型（子类对象转为父类对象，如 `Animal a = new Dog(); a.sound();`）。

2. **五大原则（SOLID）**：

   - **单一职责原则（SRP）**：**一个类只负责一个功能**，避免职责过多导致代码臃肿。
   - **开闭原则（OCP）**：**对扩展开放，对修改关闭**。通过抽象和继承扩展功能，而非直接修改原有代码。
   - **里氏替换原则（LSP）**：**子类必须能替换父类**，确保继承关系不会破坏程序逻辑。
   - **接口隔离原则（ISP）**：**接口应当小而专**，避免臃肿接口强制实现不必要的方法。
   - **依赖倒置原则（DIP）**：**依赖抽象而非具体**，高层模块不直接依赖低层模块，而是通过接口或抽象类交互。

3. **总结**：三大特征是语言机制，SOLID 是运用这些机制的设计准则，目标都是让代码更灵活、可维护、易扩展。

#### 🔬 扩展知识

::: details

- 【L3】LSP 的严格表述是“子类型必须能替换其基类型而不破坏程序正确性”，实践中表现为：子类不应加强前置条件、不应削弱后置条件（契约式设计）；违反 LSP 的典型例子是 `Square extends Rectangle`。
- 【L3】DIP 的落地手段是依赖注入（DI），Spring 的 IoC 容器就是 DIP 的工程化实现。
- 【L4】SOLID 也有适用边界：过度拆分会导致类爆炸，简单 CRUD 脚本不必教条式套用；原则服务于可读性与变更成本，不是目的本身。
  :::

#### 🔀 发散问题

- **Q：多态的底层是如何实现的？** → 运行时多态基于虚方法表（vtable）动态分派，见本文档「Java 多态的实现原理是什么？」。
- **Q：开闭原则在 JDK 中怎么体现？** → 集合框架面向 `List`/`Map` 接口编程，新增实现类无需修改已有调用方代码。
- **Q：接口隔离与“接口尽量小”是一回事吗？** → 不完全是；ISP 强调的是不让实现者被迫依赖不需要的方法，粒度应以客户端需求为准，而非越小越好。

### 【简单】Java 中 final 关键字有什么用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：面向对象 / 关键字

#### 💎 关键结论

`final` 是不可变性约束：修饰类不可被继承、修饰方法不可被重写、修饰变量只能赋值一次。注意修饰引用时只是引用不可变，对象内容仍可变；JDK 5+ JMM 还赋予 final 字段安全发布语义。

#### ⚡记忆卡片

- **口诀**：类不可继、法不可覆、值不可改
- **关键词**：不可继承 ／ 不可重写 ／ 只赋值一次
- **链路**：final 修饰 → 类/方法/变量三种约束 → JMM 安全发布

#### 📖 核心知识

1. **三种用法**（`final` 表示**不可变性约束**，是 Java 设计“不可变”的基础）：

| **修饰目标** | **效果**                         | **典型示例**                     |
| ------------ | -------------------------------- | -------------------------------- |
| **类**       | 不能被继承（防止子类破坏不变性） | `String`、`Integer`、`LocalDate` |
| **方法**     | 不能被子类重写（防止行为被篡改） | `Object.getClass()`              |
| **变量**     | 只能赋值一次（常量）             | `static final int MAX = 100;`    |

2. **变量修饰的细节**：

   - **基本类型**：值不可变。
   - **引用类型**：**引用不可变，但对象内容可变**（易踩坑）。

```java
final List<String> list = new ArrayList<>();
list.add("A");      // ✔️ 合法，修改的是对象内容
list = new ArrayList<>();  // ❌ 编译错误，引用不可重新赋值
```

- **局部变量**：使用前必须赋值（可在声明后赋值一次）。
- **方法参数**：`final` 参数在方法内不可重新赋值（常用于匿名内部类捕获变量）。

3. **final 与 JVM 优化**：

   - **内存语义**：JDK 5+ 的 Java 内存模型（JMM）保证 `final` 字段的写操作在构造函数返回前完成，且对所有线程可见（**安全发布**）。
   - **内联优化**：JIT 编译器可对 `final` 方法进行更激进的**内联优化**（无需动态分派）。

4. **final vs finally vs finalize**：三者**毫无关联**，仅命名相似（详见异常章节）。

#### 🔬 扩展知识

::: details

- 【L3】JMM 的 final 语义是 `String`/包装类等不可变对象能安全共享的前提：构造完成后 final 字段对其他线程立即可见，无需同步。
- 【L3】`final` 方法的内联优势在现代 JIT（基于类型画像的投机内联）下已不明显，声明 final 的主要价值是设计约束而非性能。
- 【L4】不可变对象推荐组合拳：类 final + 字段 final + 不提供 setter + 防御性拷贝，JDK 14+ 的 `record` 天然满足前三条。
  :::

#### 🔀 发散问题

- **Q：final 引用的对象内容能改吗？** → 能，final 只锁住引用指向；要真正不可变需集合用 `List.of()`、对象设计为不可变类。
- **Q：final 类能实现接口吗？** → 能，final 只限制被继承，不影响实现接口；`String` 就实现了 `Comparable`、`CharSequence` 等接口。

### 【中等】`this` 和 `super` 关键字有什么用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：面向对象 / 关键字

#### 💎 关键结论

`this` 指向当前对象，用于区分同名字段、调本类构造器、返回自身；`super` 指向父类成员，用于调父类构造器、访问被遮蔽字段/方法。二者调用构造器时都必须在首行且不能共存。

#### ⚡记忆卡片

- **口诀**：this 指自己，super 指父；构造调用首行，两者不共存
- **关键词**：当前对象 ／ 父类成员 ／ 构造器首行
- **链路**：this/super → 成员访问或构造器调用 → 首行规则 → 隐式 `super()`

#### 📖 核心知识

1. **`this` 的用途**：

| **场景**                 | **示例**                  | **说明**                 |
| ------------------------ | ------------------------- | ------------------------ |
| 区分成员变量与局部变量   | `this.name = name;`       | 形参名与字段名相同时     |
| 调用本类其他构造器       | `this(args);`             | 必须在构造器首行         |
| 返回当前对象引用         | `return this;`            | 链式调用（Builder 模式） |
| 作为参数传递             | `service.register(this);` | 传递当前实例             |
| 访问外部类（内部类场景） | `Outer.this.field`        | 内部类引用外部类         |

2. **`super` 的用途**：

| **场景**             | **示例**          | **说明**             |
| -------------------- | ----------------- | -------------------- |
| 调用父类构造器       | `super(args);`    | 必须在子类构造器首行 |
| 访问父类被遮蔽的字段 | `super.field`     | 子类有同名字段时     |
| 调用父类被覆盖的方法 | `super.method();` | 显式调父类实现       |

3. **关键规则**：

```java
public class Animal {
    public Animal() { this("default"); }  // 调用另一个构造器
    public Animal(String name) { /* ... */ }
}

public class Dog extends Animal {
    public Dog() {
        super();  // ✔️ 显式调父类无参构造（必须在首行）
        // this(); // ❌ 与 super 冲突，不能同时存在
    }
}
```

4. **隐式调用规则**：子类构造器**默认第一行**调用 `super()`（无参），若父类无无参构造则编译错误；解决：父类显式声明无参构造，或子类用 `super(args)` 调用有参构造。

#### 🔬 扩展知识

::: details

- 【L3】字节码层面，实例方法的 `this` 存放在局部变量表的第 0 号槽位；`this()/super()` 构造器调用编译为 `invokespecial`，与普通虚方法调用的 `invokevirtual` 不同（构造器不参与动态分派）。
- 【L3】构造器中 `this` 逸出（如 `this` 传入线程/注册监听器）会发布未构造完成的对象，是并发安全隐患。
- 【L4】Kotlin 中用 `this` 与 `super` 同样语义，但主构造器参数直接声明字段，减少了 `this.name = name` 样板代码。
  :::

#### 🔀 发散问题

- **Q：`this()` 和 `super()` 为什么不能同时出现？** → 两者都要求占据构造器首行，且语义互斥（初始化当前类构造链 vs 父类构造链），同时存在无法确定初始化顺序。
- **Q：静态方法中能用 this/super 吗？** → 不能，静态方法不绑定实例，编译直接报错。

### 【中等】接口的默认方法冲突如何解决？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：面向对象 / 接口

#### 💎 关键结论

Java 8 多接口同名 default 方法冲突时，按“类方法 > 子接口 > 父接口”决议：父类有同名方法则类优先；无关接口冲突时编译器不做选择，强制实现类显式覆盖，可用 `接口名.super.method()` 指定调用来源。

#### ⚡记忆卡片

- **口诀**：类优先，子接胜，冲突必须显式覆
- **关键词**：default 冲突 ／ 类优先 ／ `A.super.hello()`
- **链路**：多接口同名 default → 类方法优先 → 子接口优先 → 否则强制覆盖

#### 📖 核心知识

Java 8 引入接口默认方法后，类实现多个接口时可能出现**默认方法冲突**（Diamond Problem 变种）。

1. **冲突场景一：两个接口有相同默认方法**：

```java
interface A {
    default void hello() { System.out.println("A"); }
}
interface B {
    default void hello() { System.out.println("B"); }
}

// ❌ 编译错误：必须覆盖解决冲突
class C implements A, B {}

// ✔️ 解决方案1：覆盖
class C implements A, B {
    @Override
    public void hello() { System.out.println("C"); }
}

// ✔️ 解决方案2：显式指定调用某个接口
class C implements A, B {
    @Override
    public void hello() {
        A.super.hello();  // 调用 A 的默认方法
    }
}
```

2. **冲突场景二：父类方法 vs 接口默认方法**：

```java
class Parent {
    public void hello() { System.out.println("Parent"); }
}
interface I {
    default void hello() { System.out.println("Interface"); }
}

class Child extends Parent implements I {}
new Child().hello();  // 输出 "Parent"（类方法优先于接口默认方法）
```

3. **核心规则（优先级）**：

   1. **类方法 > 接口默认方法**（类优先原则，保证向后兼容）。
   2. **子接口 > 父接口**（更具体的接口胜出）。
   3. **冲突时必须显式覆盖**（编译器不替你选择）。

#### 🔬 扩展知识

::: details

- 【L3】“类优先”是为了兼容 JDK 8 之前的代码：当年给 `Collection` 加 `removeIf()` default 方法时，`ArrayList` 等已有同名实现的类会自动沿用自身实现，避免行为突变。
- 【L3】显式调用语法是 `接口名.super.method()`（不能用 `this.super` 或单独的 `super`）；若冲突接口之间存在继承关系，则按子接口优先自动决议，无需覆盖。
  :::

#### 🔀 发散问题

- **Q：为什么编译器不自动选一个而要报错？** → 两个无关接口的 default 实现地位平等，隐式选择会把设计歧义埋进运行时；强制显式覆盖把决策权交给开发者。
- **Q：接口加 default 方法会影响已有实现类吗？** → 通常不会，除非实现类同时实现的另一个接口有同名 default，详见本文档「接口和抽象类有什么区别？」。

### 【中等】Java 多态的实现原理是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：面向对象 / 多态

#### 💎 关键结论

多态分编译时（重载，静态绑定）与运行时（重写 + 向上转型，动态绑定）。运行时多态由 JVM 的虚方法表（vtable）实现：类加载时为每个类建 vtable，`invokevirtual` 执行时按对象实际类型查表定位方法；字段与 static/final/private 方法不参与多态。

#### ⚡记忆卡片

- **口诀**：重载看编译，重写看运行；查表找方法，字段不参合
- **关键词**：动态分派 ／ vtable ／ `invokevirtual`
- **链路**：继承 + 重写 + 向上转型 → invokevirtual → 运行时查 vtable → 执行子类方法

#### 📖 核心知识

多态是 OOP 的核心特性之一，Java 通过**动态分派**实现运行时多态。

1. **多态分类**：

| **类型**       | **机制**                       | **示例**                           | **判定时机**   |
| -------------- | ------------------------------ | ---------------------------------- | -------------- |
| **编译时多态** | 方法重载（Overload）           | `print(int)` vs `print(String)`    | 编译期静态绑定 |
| **运行时多态** | 方法重写（Override）+ 向上转型 | `Animal a = new Dog(); a.sound();` | 运行期动态绑定 |

2. **运行时多态的三个前提**：继承关系（extends 或 implements）、方法重写（子类覆盖父类方法）、父类引用指向子类对象（向上转型）。

3. **底层实现原理（基于虚方法表 vtable）**：

```java
Animal a = new Dog();
a.sound();  // 实际调用 Dog.sound()
```

- **类加载时**：JVM 为每个类生成**虚方法表（vtable）**，存储该类所有虚方法的直接引用。
- **方法调用时**：通过对象的**运行时类型**查找其 vtable，定位实际方法。
- **非虚方法**：`static`、`final`、`private` 方法不进入 vtable（静态绑定）。

4. **字节码层面**：

```java
// 字节码使用 invokevirtual 指令
invokevirtual #16 // Method Animal.sound:()V
```

`invokevirtual` 在运行时根据对象的实际类型（`Dog`）查找 vtable，调用 `Dog.sound()`。

5. **字段不参与多态**：

```java
class Father { int num = 1; }
class Son extends Father { int num = 2; }

Father f = new Son();
System.out.println(f.num);  // 输出 1（字段访问基于编译时类型，静态绑定）
```

6. **多态的经典陷阱：构造器中的多态调用**：

```java
class Base {
    Base() { init(); }  // 构造器调用虚方法，危险！
    void init() { System.out.println("Base.init"); }
}
class Sub extends Base {
    void init() { System.out.println("Sub.init"); }
}

new Sub();  // 输出 "Sub.init"（父类构造器中调用了子类的 init）
```

**教训**：构造器中**避免调用可重写的方法**，可能导致子类字段尚未初始化就被访问。

#### 🔬 扩展知识

::: details

- 【L3】接口方法调用使用 `invokeinterface` 指令，通过接口方法表（itable）查找实现，比 vtable 多一层间接开销；JIT 会用内联缓存（Inline Cache）加速热点虚调用，类型不稳定时会去优化（deoptimize）回解释执行。
- 【L3】JIT 能识别“单态/双态调用点”做去虚化（devirtualization）：若运行时发现调用点几乎只有一种类型，会把虚调用直接内联成具体方法，性能接近静态调用。
- 【L4】对比 C++ 的虚函数表（vptr 指向 vtable）与 Java vtable：Java 的表随类元数据存放在方法区/元空间，对象头里存的是类型指针而非函数表指针。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “字段也支持多态” → 字段访问是静态绑定，看编译时声明类型；多态仅限实例方法。
- ❌ “重载也是运行时多态” → 重载在编译期根据实参类型选定方法签名，属于静态绑定。
- ❌ “向上转型后能调用子类新增方法” → 编译时类型决定可见方法集，需向下转型（并做 instanceof 检查）才能调用。
  :::

#### 🔀 发散问题

- **Q：为什么构造器里不要调可重写方法？** → 父类构造先于子类字段初始化执行，子类重写方法会读到未初始化的字段（默认值）。
- **Q：static 方法能被“重写”吗？** → 不能，同名 static 方法是隐藏（hiding）而非覆盖，调用取决于声明类型。

## Object

### 【简单】Object 类的常见方法有哪些？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Object / 根类方法

#### 💎 关键结论

Object 是所有类的根类，提供约 11 个方法，可归为四类：身份与比较（`getClass`/`equals`/`hashCode`/`toString`）、克隆（`clone`）、回收回调（`finalize`）、线程协作（`wait`×3 / `notify` / `notifyAll`）。重点是相等性比较与线程协作两组。

#### ⚡记忆卡片

- **口诀**：比较克隆加等待，唤醒通知 toString
- **关键词**：`equals` ／ `hashCode` ／ `wait`、`notify`
- **链路**：根类 Object → 通用能力（比较/克隆/线程） → 子类按需重写

#### 📖 核心知识

Object 类是一个特殊的类，是所有类的父类。它主要提供了以下 11 个方法：

| **方法签名**                         | **作用**                           | **默认行为**                                  |
| :----------------------------------- | :--------------------------------- | :-------------------------------------------- |
| `String toString()`                  | 返回对象的字符串表示               | `类名@十六进制哈希码`（如 `Person@1b6d3586`） |
| `boolean equals(Object obj)`         | 比较两个对象是否逻辑相等           | 比较内存地址（`==`）                          |
| `int hashCode()`                     | 返回对象的哈希码                   | 基于内存地址生成                              |
| `Class<?> getClass()`                | 返回对象的运行时类（`Class` 对象） | 由 JVM 提供                                   |
| `protected Object clone()`           | 创建并返回对象的副本               | 浅拷贝（需实现 `Cloneable` 接口）             |
| `protected void finalize()`          | 已废弃，对象被 GC 回收前调用       | 空实现（不推荐使用）                          |
| `void notify()`                      | 唤醒一个等待该对象监视器的线程     | 依赖 JVM 实现                                 |
| `void notifyAll()`                   | 唤醒所有等待该对象监视器的线程     | 依赖 JVM 实现                                 |
| `void wait()`                        | 让当前线程等待，直到被唤醒         | 必须在同步代码块中调用                        |
| `void wait(long timeout)`            | 让线程等待，最多 `timeout` 毫秒    | 超时后自动唤醒                                |
| `void wait(long timeout, int nanos)` | 更精确的等待（纳秒级）             | 实际精度依赖系统                              |

补充：`getClass()`、`notify()`、`notifyAll()`、`wait()` 系列均为 `final`，不可被重写；`equals`/`hashCode`/`toString` 是业务类最高频重写的方法；`finalize()` 已废弃，见本文档「finalize 有什么用？」。

#### 🔬 扩展知识

::: details

- 【L3】`wait/notify` 基于对象监视器（monitor）实现，必须在持有该对象锁的同步块内调用，否则抛 `IllegalMonitorStateException`；`wait` 会释放锁而 `sleep` 不会，这是二者最常考的区别。
- 【L3】JDK 5+ 推荐用 `java.util.concurrent` 的 `Lock` + `Condition`（`await/signal`）替代 `wait/notify`，可多等待队列、支持中断与超时。
- 【L4】对比 C# 的 `System.Object`：同样提供 `Equals/GetHashCode/ToString/GetType`，但无线程协作方法（用 `Monitor.Wait/Pulse`）；Kotlin 的 `Any` 直接复用 Java Object 这些方法。
  :::

#### 🔀 发散问题

- **Q：为什么 wait/notify 定义在 Object 而非 Thread？** → 锁与等待队列是“对象级监视器”的概念，任何对象都可当锁，线程围绕对象锁协作，故 API 放在 Object。
- **Q：toString 默认实现是什么？** → `getClass().getName() + '@' + Integer.toHexString(hashCode())`，日志可读性差，业务类建议重写。

### 【简单】== 和 equals() 有什么区别？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Object / 相等性比较

#### 💎 关键结论

`==` 对基本类型比较值、对引用类型比较内存地址，且行为固定不可重写；`equals()` 默认同 `==`，但可重写为逻辑比较。规则一句话：引用类型比较一律用 `equals()`，基本类型用 `==`；包装类型因缓存机制让 `==` 在 [-128, 127] 内“看起来能用”，最危险。

#### ⚡记忆卡片

- **口诀**：基本比值、引用比址，逻辑相等靠 equals
- **关键词**：内存地址 ／ 逻辑相等 ／ IntegerCache
- **链路**：`==` 看类型定语义 → `equals()` 可重写 → 重写需配套 `hashCode()`

#### 📖 核心知识

1. **两者对比**：

| **对比项**       | **`==`**                                     | **`equals()`**                                                        |
| :--------------- | :------------------------------------------- | :-------------------------------------------------------------------- |
| **基本类型比较** | 比较**值**                                   | 不能比较                                                              |
| **引用类型比较** | 比较**内存地址**                             | 默认比较**内存地址**（同 `==`），但可重写为逻辑比较（如内容是否相同） |
| **是否可重写**   | 否（运算符，行为固定）                       | 是（可自定义比较逻辑）                                                |
| **用途**         | 快速判断基本类型值相等或引用是否指向同一对象 | 判断对象逻辑是否相等（如内容、属性等）                                |

2. **包装类型与 `==` 的经典陷阱**：`==` 对包装类型比较的是引用地址，但自动装箱会触发**缓存机制**，导致反直觉的结果：

```java
// Integer 缓存 [-128, 127]，这个范围内的 == 返回 true！
Integer a = 127, b = 127;
System.out.println(a == b);  // true  ← 反直觉！因为走的是 IntegerCache

Integer c = 128, d = 128;
System.out.println(c == d);  // false ← 超出缓存范围，new 了两个对象

// 同理，String 常量池也会让 == "看起来能用"
String s1 = "hello";         // 指向常量池
String s2 = "hello";         // 复用常量池的同一对象
System.out.println(s1 == s2); // true  ← 但这是常量池的"假象"

String s3 = new String("hello");
System.out.println(s1 == s3); // false ← new 在堆上创建了新对象
```

> **📌 面试度量**：此题 ⭐⭐⭐⭐⭐ 不是因为难，而是因为"包装类型缓存"和"String 常量池"让 `==` 在特定场景下"看起来能用"，实际依赖它会导致上线后偶发 bug（比如某天用户 ID 超过 127 后缓存击穿）。**规则：引用类型比较一律用 `equals()`，基本类型用 `==`**。

#### 🔬 扩展知识

::: details

- 【L3】**JDK 16+ Value-Based 警告**：JDK 16 将 `Integer`、`Long` 等包装类标记为 **value-based**，并明确警告：

> "Use of identity-sensitive operations (such as `==`) on value-based classes may have unpredictable effects."

这意味着对包装类使用 `==` 不仅是不推荐的，在未来的 Valhalla 项目中（引入值类型后），`Integer` 可能会变成无引用地址的值类型，届时 `==` 的行为将彻底变化。所以现在养成习惯非常重要。

- 【L4】**跨语言视角：identity vs equality 的设计哲学**：

| 语言           | 身份比较               | 内容比较                   | 核心差异                                                           |
| :------------- | :--------------------- | :------------------------- | :----------------------------------------------------------------- |
| **Java**       | `==`（引用地址）       | `equals()`（可重写）       | 所有对象都有 identity，基本类型无 identity                         |
| **Python**     | `is`（对象 ID）        | `==`（`__eq__` 方法）      | Java 的 `==` ≈ Python 的 `is`；Python 的 `==` ≈ Java 的 `equals()` |
| **C#**         | `ReferenceEquals()`    | `==`（可重载）+ `Equals()` | struct（值类型）无 identity，`==` 默认比较内容                     |
| **Rust**       | `std::ptr::eq`（地址） | `==`（`PartialEq` trait）  | 所有权模型下"同一性"意义被弱化，默认只需内容比较                   |
| **JavaScript** | `===`（严格相等）      | `==`（带类型转换）         | 对象比较始终是引用比较，没有内置 deep equals                       |

**关键洞察**：Java 是唯一一个"`==` 在基本类型比较值、引用类型比较地址"的主流语言——这种设计源于 Java 的**对象-基本类型二元模型**。对比 C# 可以在 struct 上重载 `==` 使其比较内容，Java 的基本类型不使用 `equals()`、引用类型的 `==` 又不能重载，导致了永恒的心智负担。Valhalla 项目的终极目标之一就是消除这种不一致性。
:::

#### 🏭 实战场景

::: details

- 高频故障模式：用 `Long` 包装类型存订单 ID，测试阶段用 `==` 比较，ID ≤ 127 时全绿；上线后订单号超出 IntegerCache 范围，`==` 恒为 false，订单查重失效产生重复单据，回滚并全量改 `equals()` 后恢复。
- 工程规范：阿里巴巴《Java 开发手册》明确规定“所有包装类对象之间值的比较，全部使用 equals 方法”，并用 P3C 插件在 CI 中静态扫描 `==` 比较包装类型的代码。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “`==` 也能比较字符串内容” → 它比较的是引用地址，`"a"=="a"` 为 true 只是常量池复用的假象，`new String("a")=="a"` 为 false。
- ❌ “Integer 在 127 内 `==` 为 true，说明可以安全比较” → 一旦数值超出 [-128, 127] 缓存范围即为 false，行为随取值变化，绝不能依赖。
- ❌ “重写 equals 后 `==` 行为也会变” → `==` 是运算符不可重载，两者完全独立。
  :::

#### 🔀 发散问题

- **Q：为什么重写 equals 必须同时重写 hashCode？** → 哈希集合先用 hashCode 定位桶再用 equals 精筛，契约不一致会导致去重失效，见本文档「为什么重写 equals() 时必须重写 hashCode() 方法？」。
- **Q：`Objects.equals(a, b)` 有什么优势？** → 空指针安全，内部先判 null，语义等价 `a == b || (a != null && a.equals(b))`。
- **Q：包装类型的缓存范围能改吗？** → Integer 可用 `-XX:AutoBoxCacheMax=<size>` 或系统属性 `java.lang.Integer.IntegerCache.highChar` 调大上界，但不能取消缓存。

### 【简单】为什么重写 equals() 时必须重写 hashCode() 方法？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：Object / 哈希契约

#### 💎 关键结论

Java 契约：`equals()` 相等的两个对象，`hashCode()` 必须相同（反之不要求）。哈希集合先用 hashCode 定位桶、再用 equals 精筛；只重写 equals 不重写 hashCode，逻辑相等的对象会落进不同桶，造成“能 put 但 get 不到”。

#### ⚡记忆卡片

- **口诀**：等则同哈希，哈希同未必等
- **关键词**：hashCode 契约 ／ 桶定位 ／ `(n-1)&hash`
- **链路**：equals 相等 → hashCode 必同 → 集合先哈希后 equals → 违约则“能放找不到”

#### 📖 核心知识

1. **两方法分工**：`hashCode()` 方法返回对象的哈希值，常用于存储结构中快速比较对象是否相同；`equals()` 方法比较对象内容是否相同，需自行实现逻辑。

2. **契约**：Java 规定：**两个对象若`equals()`相等，它们的`hashCode()`必须相同**。反之不要求（哈希允许碰撞）。如果违背，则哈希集合（如 `HashMap`、`HashSet`）无法正确去重或查找。

3. **集合的查找流程**：`HashMap`/`HashSet` 先通过 `hashCode()` 快速定位数据，再用 `equals()` 精确匹配；若 `hashCode()` 不一致，即使 `equals()` 为 `true`，集合会误判为不同对象。

4. **HashMap 内部如何用 hashCode 定位元素**：

```java
// HashMap 的 put() 核心步骤
public V put(K key, V value) {
    int hash = hash(key);             // 1. 计算 hash 值
    int i = (n - 1) & hash;           // 2. 用位运算定位桶下标（等价于 hash % n）
    // 3. 在桶 i 中遍历链表/红黑树，用 equals() 比较 key
    for (Node<K,V> e = tab[i]; e != null; e = e.next) {
        if (e.hash == hash && (e.key == key || key.equals(e.key)))
            return e;  // 找到
    }
    return null;
}

// HashMap 的 hash() 扰动函数（JDK 8）
static final int hash(Object key) {
    int h;
    return key == null ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    // 高 16 位与低 16 位异或，让高位参与取模，减少碰撞
}
```

**关键洞察**：`(n - 1) & hash` 定位桶的位置（当 n 是 2 的幂次时等价于 `hash % n`，但快一个数量级）。**两个对象如果 `hashCode()` 不同，它们被分配到同一个桶的概率极低（≈ 1/n），HashMap 直接在另一个桶里找不到这个"逻辑相等"的对象**。

5. **违反契约的具体后果（可用代码演示）**：

```java
class BrokenKey {
    String id;
    BrokenKey(String id) { this.id = id; }

    @Override
    public boolean equals(Object o) {
        return o instanceof BrokenKey && this.id.equals(((BrokenKey) o).id);
    }
    // ❌ 没有重写 hashCode() → 继承 Object 的默认实现（基于地址）
}

Map<BrokenKey, String> map = new HashMap<>();
BrokenKey k1 = new BrokenKey("A");
BrokenKey k2 = new BrokenKey("A");

map.put(k1, "value");
System.out.println(k1.equals(k2));  // true  ← 逻辑相等
System.out.println(map.get(k2));    // null  ← HashMap 找不到！
// 原因：k1.hashCode() ≠ k2.hashCode() → 分到不同桶 → 找不到
```

> **📌 面试度量**：⭐⭐⭐⭐⭐ 的原因——几乎每个 Java 程序员都知道"重写 equals 要重写 hashCode"，但能讲清楚 **HashMap 桶定位公式 `(n-1) & hash`** 和 **扰动函数为何是高 16 位异或低 16 位** 的人不到 10%。这是区分"背过八股文"和"看过源码"的分水岭。

6. **如何正确重写 `hashCode()`**：

   - **`equals()`**：比较所有关键字段（如 `name`、`age`）。
   - **`hashCode()`**：用 `Objects.hash(字段1, 字段2)` 生成（确保与 `equals()` 字段一致）。

> **性能提示**：`Objects.hash()` 内部每次调用都会创建数组（`new Object[]{a, b, c}` + 数组遍历），对高频调用场景可用手动计算代替。Spring 的 `ObjectUtils.hash()` 和 Lombok `@EqualsAndHashCode` 对此做了优化。

#### 🔬 扩展知识

::: details

- 【L3】**Hash Flooding 攻击——为什么 HashMap 需要红黑树**：2011 年，安全研究人员发表了一篇著名论文，展示了对 Java Web 服务器发起 **Hash Flooding（哈希洪水）DDoS 攻击**的原理：

1. 构造一批精心挑选的字符串，使它们的 `hashCode()` 全部碰撞到同一个桶
2. 向服务器提交大量这类字符串作为 HTTP 参数名
3. 服务器将这些参数存入 `HashMap` → 所有 key 落在同一桶 → 链表从 O(1) 退化到 O(n)
4. 攻击者只需几万个精心构造的参数就能使服务器 CPU 100%，拒绝服务

**JDK 7 的临时修复**：`String.hashCode()` 引入随机种子（`-Djdk.map.althashing.threshold`），但治标不治本。

**JDK 8 的根本修复**：HashMap 在链表长度 ≥ 8 且桶数组长度 ≥ 64 时**自动将链表转为红黑树**，将最坏 O(n) 查找降为 O(log n)，彻底消除了 Hash Flooding 的攻击面。这条规则反过来催生了 hashCode/equals 契约的重要性：**如果 hashCode 设计糟糕（如始终返回常量 0），HashMap 会频繁触发树化，不仅浪费 O(n) 的 equals 遍历，还额外付出红黑树节点维护开销**。

- 【L4】**跨语言视角：Python 的 `__hash__` + `__eq__`**，哈希契约与 Java 惊人一致：

```python
class Person:
    def __eq__(self, other):
        return isinstance(other, Person) and self.id == other.id

    def __hash__(self):
        return hash(self.id)  # 必须与 __eq__ 一致的字段

# Python 会强制检查：如果重写 __eq__ 不重写 __hash__，对象不可哈希（TypeError）
```

与 Java 的关键差异：

- **Python 强制不可哈希**：重写 `__eq__` 不重写 `__hash__` → 类变为 `unhashable`（不能放入 `dict` 的 key），错误在运行时而不是像 Java 那样"能放但找不到"
- **Python 无哈希攻击问题**：CPython 3.3+ 对 `dict` 的 key 哈希值加了随机扰动（per-process hash seed），使得攻击者无法预测碰撞
- **Rust**：`Hash` trait 与 `Eq` trait 完全独立——不需要重写 `Hash` 就必须重写 `Eq`，但 HashMap 内部使用 `Eq`（而非 `==` / `equals`）来判断相等

> 📚 延伸阅读：[Java hashCode() 和 equals() 的若干问题解答](https://www.cnblogs.com/skywang12345/p/3324958.html)
> :::

#### 🏭 实战场景

::: details

- 典型事故：用自定义 POJO（含 userId/orderId）作 HashMap key 做请求去重缓存，只重写 equals 未重写 hashCode，重复请求全部穿透，高峰期缓存命中率接近 0、后端数据库被打满；补上 `Objects.hash(userId, orderId)` 后命中率恢复到 ~99%。
- 安全侧：对外 HTTP 接口若把客户端参数名直接存入 HashMap，可能被 Hash Flooding 拖到 CPU 100%；JDK 8 树化后最坏查找 O(log n)，但仍应限制单次请求参数数量（如 ≤ 1000）。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “hashCode 相等则 equals 必相等” → 方向反了，哈希允许碰撞，hashCode 相等不代表逻辑相等，最终仍靠 equals 判定。
- ❌ “只重写 hashCode 不重写 equals 也行” → 默认 equals 比较地址，逻辑相等的对象仍判不等，同样破坏契约。
- ❌ “hashCode 与 equals 可以用不同字段” → 二者必须基于同一组关键字段，否则 equals 相等而哈希不同，去重直接失效。
  :::

#### 🔀 发散问题

- **Q：为什么扰动函数用 `h ^ (h >>> 16)`？** → 让高 16 位参与低位运算，在桶数较小时减少高位被 `(n-1)&hash` 截断导致的碰撞。
- **Q：HashSet 底层如何依赖这套契约？** → HashSet 本质是 value 为固定占位对象的 HashMap，去重完全依赖 hashCode + equals。
- **Q：可变对象作 HashMap key 有什么风险？** → put 之后修改参与哈希的字段会使 hashCode 变化，之后再也 get 不到，应使用不可变字段作 key。

### 【简单】finalize 有什么用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Object / 资源清理

#### 💎 关键结论

`finalize` 原本用于对象销毁前的清理，但不保证执行、性能差（进入特殊 finalize 队列）、还有对象复活等安全隐患，Java 9+ 已弃用；现代 Java 应改用 `try-with-resources`（AutoCloseable）或 `Cleaner`。

#### ⚡记忆卡片

- **口诀**：finalize 不可靠，AutoCloseable 才是道
- **关键词**：已弃用 ／ 不保证执行 ／ `Cleaner`
- **链路**：对象不可达 → Finalizer 线程调 `finalize()` → 延迟回收 → 不可靠

#### 📖 核心知识

一言以概之，**`finalize` 可用于对象销毁前的清理，但不可靠且性能差，现代 Java 开发应避免使用，改用 `AutoCloseable` 或 `Cleaner`。**

1. **废弃现状**：**Java 9+ 已弃用 `finalize`**，推荐使用：

   - `try-with-resources`（实现 `AutoCloseable` 接口）
   - `Cleaner` 或 `PhantomReference`（更可控的清理机制）。

2. **`finalize` 的作用**：

   - **对象被垃圾回收前的清理**：在对象被 GC 回收前，`finalize()` 会被调用，可用于释放非内存资源（如文件句柄、数据库连接等）。
   - **最后的补救机会**：如果对象未被正确关闭，`finalize` 提供最后一次资源释放的机会。

3. **`finalize` 的问题**：

   - **不保证执行**：JVM 不保证 `finalize` 一定会执行（如程序突然终止时）。即使对象可达性失效，GC 可能延迟回收，导致 `finalize` 延迟调用。
   - **性能开销**：覆写 `finalize` 的对象会被 JVM 放入特殊队列，垃圾回收变慢。可能引发内存泄漏（如果 `finalize` 阻塞或执行过久）。
   - **安全问题**：在 `finalize` 中抛出异常会导致清理中断，且异常被忽略。可能被恶意代码利用（如通过重写 `finalize` 复活对象，干扰 GC）。

#### 🔬 扩展知识

::: details

- 【L3】执行机制：重写了 `finalize()` 的对象在创建时会被注册到 ReferenceQueue，由单线程的 Finalizer Thread 轮询执行；每个对象的 `finalize()` 最多被调用一次，在 `finalize()` 中重新让对象可达即可“复活”，但第二次回收不会再给机会。
- 【L3】版本演进：JDK 9 将 `finalize()` 标记 `@Deprecated`，JDK 18 进一步标记 `forRemoval = true`，并提供 `--finalization=disabled` 启动参数，官方方向是彻底移除。
- 【L4】C++ 析构函数随作用域结束确定性执行；Java 因 GC 时机不确定没有等价物，确定性清理只能靠显式 `close()` 纪律（try-with-resources）。
  :::

#### 🔀 发散问题

- **Q：Cleaner 相比 finalize 好在哪？** → Cleaner（JDK 9+）基于 `PhantomReference`，清理动作与对象本身解耦，无法复活对象，但回收时机依然不确定，只能作兜底而非主要清理手段。
- **Q：资源释放的标准姿势是什么？** → 实现 `AutoCloseable` + `try-with-resources`，作用域结束时确定性关闭，不依赖 GC。

### 【中等】Object#clone() 方法和 Cloneable 接口如何使用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Object / 对象克隆

#### 💎 关键结论

`Object#clone()` 是原生克隆机制：必须实现标记接口 `Cloneable`，否则抛 `CloneNotSupportedException`；默认浅拷贝，含可变引用字段需手动递归克隆。因设计坑点多，《Effective Java》建议改用拷贝构造器或拷贝工厂。

#### ⚡记忆卡片

- **口诀**：实现 Cloneable 才许克，默认浅拷要递归
- **关键词**：`Cloneable` ／ 浅拷贝 ／ 拷贝构造器
- **链路**：实现 `Cloneable` → 重写 `clone()` 调 `super.clone()` → 浅拷贝 → 引用字段递归克隆

#### 📖 核心知识

`Object#clone()` 是 Java 提供的**原生克隆机制**，但设计上有诸多坑点。

1. **基本用法**：

```java
public class Person implements Cloneable {  // 必须实现 Cloneable 接口
    private String name;
    private int age;

    @Override
    protected Person clone() throws CloneNotSupportedException {
        return (Person) super.clone();  // 浅拷贝
    }
}
```

2. **关键规则**：

   - **必须实现 `Cloneable` 接口**（标记接口，无方法），否则调用 `super.clone()` 抛出 `CloneNotSupportedException`。
   - **访问权限是 `protected`**：子类需重写为 `public` 才能被外部调用。
   - **默认是浅拷贝**：基本类型复制值，引用类型复制引用。

3. **浅拷贝的隐患**：

```java
Person p1 = new Person("Alice", 25, new Address("Beijing"));
Person p2 = p1.clone();
p2.getAddress().setCity("Shanghai");
System.out.println(p1.getAddress().getCity());  // Shanghai（被影响！）
```

4. **深拷贝的正确实现**：

```java
@Override
protected Person clone() throws CloneNotSupportedException {
    Person cloned = (Person) super.clone();
    cloned.address = address.clone();  // 递归克隆引用字段
    return cloned;
}
```

5. **《Effective Java》的建议**（Item 13：谨慎地覆盖 clone）：更好的替代方案是**提供拷贝构造器或拷贝工厂方法**：

```java
// 推荐替代方案：拷贝构造器
public Person(Person other) {
    this.name = other.name;
    this.age = other.age;
    this.address = new Address(other.address);  // 深拷贝
}
```

6. **clone 机制的问题总结**：

| **问题**                   | **说明**                                             |
| -------------------------- | ---------------------------------------------------- |
| **设计矛盾**               | `Cloneable` 接口无方法，却改变 `Object.clone()` 行为 |
| **浅拷贝陷阱**             | 默认浅拷贝易引发共享引用 bug                         |
| **final 字段无法重新赋值** | 深拷贝时 `final` 引用字段无法重新指向                |
| **不可用于单例**           | 反射调用 `clone()` 可破坏单例模式                    |

#### 🔬 扩展知识

::: details

- 【L3】数组是特例：数组类型可直接调用 `clone()` 且无需实现 `Cloneable`（如 `int[] copy = arr.clone()`），行为仍是浅拷贝。
- 【L3】`Cloneable` 是“改变父类方法行为”的标记接口：`Object.clone()` 运行时检查对象是否实现 `Cloneable`，未实现则抛 `CloneNotSupportedException`——接口无方法却决定方法合法性，这正是《Effective Java》批评的设计矛盾。
- 【L4】拷贝构造器优于 clone 的理由：无需强制类型转换、可接受接口类型参数、不受 final 字段与 `Cloneable` 约束、不会意外破坏单例。
  :::

#### 🔀 发散问题

- **Q：如何把 clone 变成深拷贝？** → 在 `clone()` 中对每个可变引用字段递归调用 `clone()`，或改用序列化，见本文档「深拷贝和浅拷贝有什么区别？」。
- **Q：为什么单例类要避免 clone？** → `clone()` 会另建实例破坏唯一性，单例类应不实现 `Cloneable` 或在 `clone()` 中抛异常。

## String

### 【简单】String、StringBuffer、StringBuilder 有什么区别？⭐⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：12 min ｜ 🏷 标签：String / 字符串三兄弟

#### 💎 关键结论

String 不可变，适合常量与共享；StringBuilder 可变、非线程安全、性能最高，单线程拼接首选；StringBuffer 可变、方法同步、线程安全但有锁开销。一句话：存常量用 String，拼接默认用 StringBuilder，只有共享可变缓冲区才考虑 StringBuffer。

#### ⚡记忆卡片

- **口诀**：String 不可变，Builder 快不防，Buffer 同步慢但稳
- **关键词**：不可变 ／ `synchronized` ／ 拼接性能
- **链路**：可变性 → 线程安全性 → 性能 → 选型（常量/单线程/多线程）

#### 📖 核心知识

1. **三者对比**：

| **特性**     | **String**                | **StringBuffer**    | **StringBuilder**            |
| :----------- | :------------------------ | :------------------ | :--------------------------- |
| **可变性**   | ❌ 不可变                 | ✔️ 可变             | ✔️ 可变                      |
| **线程安全** | ✔️（由于不可变）          | ✔️（同步方法）      | ❌（非线程安全）             |
| **性能**     | ⚠️ 最差（频繁创建新对象） | ⚠️ 中等（同步开销） | ✔️ 最高（无同步开销）        |
| **适用场景** | 常量、少量拼接            | 多线程字符串操作    | **单线程字符串操作（推荐）** |

2. **选型概括**：

   - **用 `String` 存储常量**，**用 `StringBuilder` 高效拼接（单线程）**，**用 `StringBuffer` 保证线程安全（多线程）**。
   - **优先选 `StringBuilder`**（90% 场景适用）。

#### 🔬 扩展知识

::: details

- 【L3】`StringBuffer` 的线程安全来自方法级 `synchronized`（如 `append`），只保证单次方法调用原子，复合操作（先读后写多步）仍非原子；`StringBuilder` 与它共享父类 `AbstractStringBuilder`，仅差同步。
- 【L4】**跨语言视角：不可变字符串 vs 可变字符串 vs 借用的世界**——Java 的 `String`（不可变）/ `StringBuilder`（可变）/ `StringBuffer`（可变+线程安全）三元模型在其他语言中有完全不同的表达：

| 语言       | 不可变                   | 可变              | 线程安全       | 核心差异                                   |
| :--------- | :----------------------- | :---------------- | :------------- | :----------------------------------------- |
| **Java**   | `String`                 | `StringBuilder`   | `StringBuffer` | 三种类型，手动选择                         |
| **Rust**   | `&str`（借用）           | `String`（拥有）  | 编译期保证     | 所有权系统消除运行时线程安全开销           |
| **Go**     | `string`（不可变）       | `strings.Builder` | 不保证         | 简洁优先，`strings.Builder` 零分配优化     |
| **Python** | `str`（不可变）          | `io.StringIO`     | GIL 保证       | `''.join(list)` 惯用模式替代 StringBuilder |
| **C++**    | `std::string_view`(视图) | `std::string`     | 不保证         | 拷贝语义 vs 移动语义，无 GC 关怀           |

**Rust 的激进方案**：Rust 不需要 `StringBuffer`——`String` 的可变引用在编译期就通过 `&mut` 借用规则保证了独占访问，不存在"多线程同时修改一个 String"的场景。如果确实需要共享，使用 `Arc<Mutex<String>>`，线程安全是显式的、零成本的（编译期检查）。

**Go 的简洁方案**：Go 的 `strings.Builder` 在内部使用 `unsafe.Pointer` 将 `[]byte` 直接转换为 `string` 而无需内存拷贝（零分配），这是 Java 做不到的——Java 的 `StringBuilder.toString()` 必然涉及 `new String(char[])` 的拷贝。

**Python 的反模式**：Python 初学者常用 `s += chunk` 拼接字符串，每次都是新建 `str` 对象（因为 str 不可变），性能极差。惯用方案是 `''.join(list)`——一次性分配最终大小。这与 Java 用 `new StringBuilder()` 循环 append 的动机相同，但语法更简洁。
:::

#### 🏭 实战场景

::: details

- 导出/日志拼接：循环拼接生成数十 MB 的 CSV 导出文件时，用 String `+` 拼接是 O(n²) 复杂度：10 万行记录在 4C8G 实例上要跑几十秒，并产生大量临时对象触发频繁 Young GC；改用预分配容量的 `StringBuilder` 后降到 1 秒内。
- 线程安全选型：多线程共享缓冲区场景下，`StringBuffer` 比 `StringBuilder` 慢（方法级锁开销，微基准中通常慢 2~3 倍）；更优解是每线程各持一个 `StringBuilder` 最后汇总，避免共享可变状态。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “StringBuffer 线程安全，多线程随便用都安全” → 只保证单次方法调用原子，复合操作（如“先 length 再 append”）仍需额外同步。
- ❌ “`+` 拼接一定低效必须禁用” → 常量拼接编译期折叠，JDK 9+ 用 `invokedynamic` + `makeConcatWithConstants` 优化，简单拼接无性能问题，只有循环拼接才需换 `StringBuilder`。
- ❌ “StringBuilder 可以完全替代 String” → String 不可变才能安全共享、做常量池复用、当 HashMap key，两者定位不同。
  :::

#### 🔀 发散问题

- **Q：StringBuilder 的扩容机制是什么？** → 默认容量 16，扩容为 2 倍 + 2，见本文档「String、StringBuilder、StringBuffer 的扩容机制？」。
- **Q：JDK 9 对 `+` 拼接做了什么优化？** → 改用 `invokedynamic` 调 `makeConcatWithConstants`，见本文档「字符串拼接用"+" 还是 StringBuilder?」。
- **Q：为什么 String 设计成不可变？** → 安全、hashCode 缓存、常量池复用等多重收益，见本文档「String 为什么是不可变的？」。

### 【简单】String 为什么是不可变的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 不可变设计

#### 💎 关键结论

String 不可变由实现与设计目的两层决定：实现上内部数组 `private final` 且不提供修改方法，类本身也是 final；目的上换来线程安全、类加载安全、hashCode 缓存与常量池复用。所有“修改”操作都返回新对象。

#### ⚡记忆卡片

- **口诀**：final 数组不给改，改完给你新对象
- **关键词**：`private final` ／ 常量池 ／ hashCode 缓存
- **链路**：final 存储数组 → 无修改方法 → 不可变 → 安全/缓存/常量池收益

#### 📖 核心知识

`String` 的不可变性是 Java 为安全、性能、线程安全做的核心设计。

1. **实现机制**：

   - **`final` 修饰的 `char[]` 数组**：Java 中 `String` 内部用 `private final char[]`（JDK 9+ 改为 `byte[]`）存储数据，数组引用和内容均不可修改。
   - **无修改内部状态的方法**：所有看似“修改”的方法（如 `concat()`、`substring()`）都返回**新 `String` 对象**，原对象不变。

2. **为什么 String 被设计为不可变/final**：

   - **安全**
     - **并发安全**：不可变天然线程安全，无需同步；
     - **类加载安全**：类加载时通常按类的全限定名字符串进行加载，不可变保证了其安全性。
   - **性能**
     - **hashCode 缓存**：`String` 的 `hashCode()` 计算结果可缓存（因内容不变），提升性能（如 `HashMap` 的键）。
     - **常量池**：如 `String s = "abc"` 会复用常量池中的相同字符串，减少内存开销。
   - **避免混淆**：避免子类覆写父类方法，导致意想不到的结果。

3. **示例验证不可变性**：

```java
String s1 = "Hello";
String s2 = s1.concat(" World");
System.out.println(s1); // 输出 "Hello"（原字符串未变）
System.out.println(s2); // 输出 "Hello World"（新对象）
```

#### 🔬 扩展知识

::: details

- 【L3】`String` 内部有 `hash` 字段缓存 `hashCode()` 结果（初值 0，计算一次后复用），这是它适合当 HashMap key 的前提。
- 【L3】JDK 6 中 `substring()` 直接共享原 `char[]` 引用，大字符串取小子串会导致整块数组无法回收（内存泄漏）；JDK 7+ 改为拷贝新数组修复。
- 【L4】跨语言对比：Kotlin 的 String 同为不可变（底层即 Java String）；Go 的 string 不可变；Rust 则把可变性交给类型系统（`String` 可变、`&str` 不可变视图）。
  :::

#### 🔀 发散问题

- **Q：不可变性与常量池有什么关系？** → 内容不变才能安全地被多方共享复用，见[虚拟机（一）「字符串常量池有什么用？」](./[JavaCore][面试]虚拟机（一）.md)。
- **Q：为什么 String 类本身是 final？** → 防止子类覆写方法破坏不可变契约（如恶意重写 `equals`/`hashCode`），保证类加载、常量池等依赖字符串的场景可靠。

### 【简单】字符串拼接用"+" 还是 StringBuilder？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 字符串拼接

#### 💎 关键结论

循环/动态拼接用 `StringBuilder`；简单常量拼接用 “+”（编译期优化）；多线程共享缓冲才用 `StringBuffer`（极少）。`StringBuilder` 是默认推荐选择，因为它直接改缓冲区，避免 “+” 频繁创建新对象。

#### ⚡记忆卡片

- **口诀**：常量加号随便用，循环必上 Builder
- **关键词**：`StringBuilder` ／ 编译期折叠 ／ `makeConcatWithConstants`
- **链路**：拼接场景 → 常量/变量/循环 → 折叠或 Builder → 性能与可读性兼顾

#### 📖 核心知识

1. **优先用 `StringBuilder`（大多数场景）**：适用于循环、动态拼接、大量字符串操作。原因：**高性能**（直接修改缓冲区，避免 `+` 频繁创建新对象）；**低内存开销**（减少临时对象和 GC 压力）。

2. **简单拼接可用 “+”（编译期优化）**：适用于少量**固定字符串**拼接（如 `"a" + "b"`）。原因：**代码简洁**可读性更好；**编译器优化**：JVM 自动合并为常量（如 `"ab"`），无性能损失。注意：通过“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的；在循环内使用“+”，会导致创建过多的 `StringBuilder` 对象。JDK9 中，优化了这个问题，字符串相加 “+” 改为了用动态方法 `makeConcatWithConstants()` 来实现，而不是大量的 `StringBuilder` 了。

3. **多线程拼接用 `StringBuffer`（极少需要）**：适用于多线程环境且需线程安全（通常局部变量仍可用 `StringBuilder`）。

#### 🔬 扩展知识

::: details

- 【L3】JDK 8 中，含变量的 `+` 拼接被编译为 `new StringBuilder().append(...).append(...).toString()`，每次表达式生成临时对象；循环内拼接等价于每轮新建一个 `StringBuilder`，是性能陷阱。
- 【L3】JDK 9+ 改用 `invokedynamic` 调用 `StringConcatFactory.makeConcatWithConstants`，由 JVM 按拼接配方选择最优实现，避免大量临时 `StringBuilder`。
  > 📚 延伸阅读：[StringBuilder？来重温一下字符串拼接吧](https://juejin.cn/post/7182872058743750715)
  > :::

#### 🔀 发散问题

- **Q：变量参与拼接时编译期还能优化吗？** → 不能折叠，会转为运行时拼接；但 `final` 局部常量仍会被当作常量参与折叠。
- **Q：循环拼接的正确写法？** → 循环外显式创建 `StringBuilder`，见本文档「String 类型的变量和常量做“+”运算时会发生什么？」。

### 【简单】String#equals() 和 Object#equals() 有何区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：6 min ｜ 🏷 标签：String / 相等性比较

#### 💎 关键结论

`Object#equals()` 默认比较内存地址（同 `==`），需子类重写才能逻辑相等；`String#equals()` 已重写为逐字符内容比较（先查引用、再查长度），是“重写 equals 实现内容相等”的标准范例。

#### ⚡记忆卡片

- **口诀**：Object 比地址，String 比内容
- **关键词**：默认 `==` ／ 逐字符比较 ／ 重写范例
- **链路**：Object 默认比地址 → String 重写 → 引用/长度预检 → 逐字符对比

#### 📖 核心知识

1. **两者对比**：

| **对比项**   | **`Object#equals()`**              | **`String#equals()`**                      |
| :----------- | :--------------------------------- | :----------------------------------------- |
| **默认行为** | 比较**内存地址**（`==`）           | 比较**字符串内容**（逐字符对比）           |
| **重写目的** | 需子类自行重写以实现逻辑相等       | 已优化为内容比较，满足字符串业务需求       |
| **性能影响** | 无额外开销                         | 需遍历字符数组，但优先检查地址和长度       |
| **使用场景** | 通用对象比较（默认不满足内容相等） | 字符串内容对比（如 `"abc".equals("abc")`） |

2. **本质**：`String#equals()` 是 `Object#equals()` 的重写实现，把“同一性比较”换成“内容比较”，也是业务类重写 equals 时应遵循的样板。

#### 🔬 扩展知识

::: details

- 【L3】`String#equals` 的完整链路：先 `==` 引用相等快返 → `instanceof` 类型检查 → 长度不等直接 false → 逐字符比较（JDK 9+ 基于 `byte[]` 与 coder 标识，且依赖 JIT 内联优化）；源码细节见本文档「String 的 equals 方法是如何实现的？」。
- 【L4】对比 Kotlin：`==` 默认调用 `equals()`（结构化相等），`===` 才是身份比较，与 Java 直觉正好相反。
  :::

#### 🔀 发散问题

- **Q：为什么不直接用 `==` 比较字符串？** → `==` 比的是地址，常量池复用会造成假象，见本文档「== 和 equals() 有什么区别？」。
- **Q：重写 equals 还要配套什么？** → 必须同时重写 `hashCode()`，见本文档「为什么重写 equals() 时必须重写 hashCode() 方法？」。

### 【简单】`String s = new String("abc")` 创建了几个字符串对象？⭐⭐⭐⭐

> 🎯 目标等级：L3-L4 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：String / 对象创建

#### 💎 关键结论

答案是 1 或 2 个：堆上的 `new String` 必定创建 1 个；字面量 `"abc"` 若常量池已存在则复用、不存在则再建 1 个。能讲到 `ldc` 指令与运行时常量池才算真正理解。

#### ⚡记忆卡片

- **口诀**：堆上一个跑不了，池里有无看 ldc
- **关键词**：运行时常量池 ／ `ldc` ／ `invokespecial`
- **链路**：`new` 建堆对象 → `ldc` 查/建池内字面量 → 构造器赋引用 → 共 1~2 个

#### 📖 核心知识

`new String("abc")` 可能创建 1~2 个对象（取决于常量池是否已存在"abc"），但堆中的新对象必定创建。

- **常量池已存在"abc"**：**1 个对象**（仅堆中的 `new String`）
- **常量池不存在"abc"**：**2 个对象**（常量池的"abc" + 堆中的 `new String`）

#### 字节码层面的验证

```java
// 源代码
String s = new String("abc");
```

编译后字节码：

```asm
 0: new #2          // ① 在堆上创建 String 对象（此时 value 尚未赋值）
 3: dup             // ② 复制栈顶引用（供 invokespecial 消耗一个）
 4: ldc #3          // ③ 从常量池加载字符串常量 "abc" → 若常量池无则创建
 6: invokespecial #4 // ④ 调用 String.<init>(String) 构造器
 9: astore_1        // ⑤ 将引用存入局部变量 s
```

**指令详解**：

| **指令**           | **操作**                                                             | **涉及内存区域**              | **是否创建对象**                                |
| ------------------ | -------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------- |
| `new #2`           | 在堆上分配 String 实例内存                                           | 堆                            | ✔️（1 个 String 对象，其 `value[]` 尚未初始化） |
| `ldc #3`           | 将常量池中的 `"abc"` 压栈，若不存在则在 **运行时常量池** 中创建      | 运行时常量池（JDK 7+ 在堆中） | 可能（若常量池尚未有此字面量）                  |
| `invokespecial #4` | 调用 `<init>(String)` 构造器，将 `ldc` 加载的常量赋值给 `this.value` | —                             | ❌（仅赋值引用）                                |

> **关键点**：`ldc` 指令在类加载的**解析阶段**将符号引用替换为直接引用，如果运行时常量池中不存在 `"abc"`，则在此阶段创建。这就是"可能创建 2 个对象"的字节码级根因。

#### 与 `String s = "abc"` 的对比

```java
String s = "abc";  // 字节码：仅 ldc #3 → astore_1
// 0 或 1 个对象：常量池有则 0（复用），无则 1 个（在常量池创建）
```

> **📌 面试度量**：⭐⭐⭐⭐ 的原因——初级回答是"1 个或 2 个"，能讲到 `ldc` 指令和运行时常量池的是中级，能**结合类加载的解析阶段、JDK 7 常量池移入堆、以及 `invokespecial` 构造器的 value 赋值时机**说明整个过程的才是高级。

#### 🔬 扩展知识

::: details

- 【L3】JDK 7 起字符串常量池从永久代移入堆内存；`ldc` 指令在类加载解析阶段将符号引用替换为直接引用，池中不存在时在运行时常量池（位于堆）中创建。
- 【L4】**跨语言视角：C/C++ 的字符串拷贝陷阱**：

```cpp
// C++ — std::string 默认是深拷贝（非引用语义）
std::string s1 = "abc";
std::string s2 = s1;              // 深拷贝！s1 和 s2 是两个独立对象
std::string s3 = std::move(s1);   // 移动语义：s1 的内容转移到 s3，s1 变为空

// Java — String 是引用语义
String s1 = "abc";
String s2 = s1;   // 浅拷贝！s1 和 s2 指向同一对象（不可变所以安全）
```

C++ 的 `std::string` 默认深拷贝，需要显式使用 `std::move` 或 `std::string_view` 来规避拷贝开销。Java 的 `String` 由于不可变性天然引用语义安全，不需要 `StringView` 概念。

Rust 则走向另一个极端：`String` 是唯一定义的"拥有者"，`s2 = s1` 会使 `s1` 失效（move semantics），编译器强制保证没有 use-after-move。三种语言对"字符串是谁的"这个问题给出了三种不同回答：C++（拷贝是我的）、Java（引用分享）、Rust（只有一个拥有者）。
:::

#### 🏭 实战场景

::: details

- 按 JOL 测量（JDK 8、开启指针压缩）：一个 String 对象自身占 24 B（对象头 16B + hash 4B + 引用 4B），一个 3 字符的 `char[]` 再占 24B；每多余一次 `new String("abc")` 就浪费约 48B。批量任务处理 1000 万条记录时若每条都 `new String(字段)`，相当于多产生约 480MB 重复对象，直接改引用常量池即可全部省下。
  :::

#### ⚠️ 常见误区

::: details
常见误区：

- ❌ “`new String("abc")` 一定创建 2 个对象” → 取决于字面量是否已入池，已存在时只新建堆上 1 个。
- ❌ “`String s = "abc"` 一定创建 1 个对象” → 常量池中已存在则直接复用，可能不新建任何对象。
  :::

#### 🔀 发散问题

- **Q：堆上新建的字符串如何入池？** → 调用 `intern()`，见本文档「String#intern 方法有什么用？」。
- **Q：常量池的存在前提是什么？** → String 不可变性保证复用安全，见[虚拟机（一）「字符串常量池有什么用？」](./[JavaCore][面试]虚拟机（一）.md)。

### 【简单】String#intern 方法有什么用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 常量池

#### 💎 关键结论

`intern()` 用于强制字符串入池：池中无等值字符串时登记并返回池中引用，保证相同内容的字符串始终共享同一内存地址。适合高频重复的静态字符串省内存，但滥用会导致池膨胀。

#### ⚡记忆卡片

- **口诀**：池中无则登记，有则返回旧引用
- **关键词**：`intern()` ／ StringTable ／ JDK 7 行为差异
- **链路**：调用 `intern()` → 查常量池 → 无则登记引用 → 返回池引用

#### 📖 核心知识

String#intern 方法的**作用**有：

1. **强制字符串入池**：将堆中的 `String` 对象添加到字符串常量池（若池中不存在）。
2. **返回池中引用**：保证相同内容的字符串始终返回同一内存地址。

**注意**

- **JDK7+ 优化**：常量池从方法区移至堆内存，减少内存溢出风险。
- **慎用场景**：
  - 避免对动态生成的短生命周期字符串使用（可能导致池膨胀）。
  - 优先用于高频使用的静态字符串（如配置键值）。

#### 🔬 扩展知识

::: details

- 【L3】版本行为差异：JDK 6 中 `intern()` 找不到同值时会把字符串拷贝进永久代再返回新引用；JDK 7+ 常量池在堆中，池中无同值时直接登记堆中对象的引用。经典例子：`new String("a") + new String("b")` 的结果调用 `intern()` 后与 `"ab"` 做 `==`，JDK 7+ 返回 true、JDK 6 返回 false。
- 【L3】池底层是固定大小的哈希表 StringTable（桶数随版本不同，JDK 8 为 60013，JDK 11+ 为 65536），可用 `-XX:StringTableSize` 调整；大量 `intern()` 时需关注查找开销与池内存压力。
  :::

#### 🔀 发散问题

- **Q：intern 与 `new String("abc")` 的对象数有什么关系？** → 字面量入池与否决定创建 1 还是 2 个对象，见本文档「`String s = new String("abc")` 创建了几个字符串对象？」。
- **Q：常量池本身有什么用？** → 复用省内存、加速比较，见[虚拟机（一）「字符串常量池有什么用？」](./[JavaCore][面试]虚拟机（一）.md)。

### 【简单】String 类型的变量和常量做“+”运算时会发生什么？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：String / 拼接优化

#### 💎 关键结论

常量相加编译期折叠（直接合并进常量池，零运行时开销）；变量相加隐式转 `StringBuilder`，每次运算生成临时对象；循环拼接必须显式用 `StringBuilder`，否则每轮都新建缓冲区。

#### ⚡记忆卡片

- **口诀**：常量折叠，变量 Builder，循环必须显式建
- **关键词**：常量折叠 ／ `StringBuilder` ／ 循环拼接
- **链路**：判断是否纯常量 → 编译期折叠或运行时 Builder → 循环显式 Builder

#### 📖 核心知识

**常量相加编译期优化，变量相加隐式转 `StringBuilder`，循环拼接必须显式使用 `StringBuilder` 避免性能损耗。**

1. **常量折叠（编译期优化）**：

   - **纯常量运算**（如 `"a"+"b"`）→ 直接合并为 `"ab"`，仅存于常量池。
   - **final 变量** 视为常量，同样触发优化。

2. **变量拼接（运行时行为）**：

   - **含变量的运算**（如 `str + "b"`）→ 隐式转换为 `StringBuilder` 操作：

```java
// 实际执行逻辑
new StringBuilder().append(str).append("b").toString()
```

- **每次运算** 生成临时 `StringBuilder` 和最终 `String` 对象。

3. **性能关键差异**：

| 场景           | 内存/性能表现                        | 优化建议                       |
| -------------- | ------------------------------------ | ------------------------------ |
| 常量+常量      | 零运行时开销                         | 无需处理                       |
| 单次变量+常量  | 1 次 `StringBuilder` 创建            | 可接受                         |
| **循环内拼接** | 多次创建 `StringBuilder`（性能陷阱） | **必须显式用 `StringBuilder`** |

4. **最佳实践**：简单拼接直接用 `+`（可读性优先）；循环/批量拼接：

```java
// ✔️ 正确写法
StringBuilder sb = new StringBuilder();
for (String str : list) sb.append(str);
String result = sb.toString();

// ❌ 错误写法（低效）
String s = "";
for (String str : list) s += str; // 每次循环隐式新建 StringBuilder
```

#### 🔬 扩展知识

::: details

- 【L3】JDK 8 中每次含变量的 “+” 表达式都编译为独立的 `new StringBuilder()`，循环 n 次就新建 n 个缓冲区；JDK 9+ 改用 `invokedynamic` + `makeConcatWithConstants`，对单表达式拼接更优，但循环场景仍应显式复用同一个 `StringBuilder`。
  :::

#### 🔀 发散问题

- **Q：“+” 和 StringBuilder 怎么选？** → 见本文档「字符串拼接用"+" 还是 StringBuilder?」。
- **Q：为什么不能靠 JDK 9 优化就随便循环拼接？** → `makeConcatWithConstants` 优化的是单次表达式，循环内仍会逐轮分配，只有显式复用缓冲区才能做到一次分配。

### 【中等】JDK 9 对 String 做了哪些优化（Compact Strings）？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：String / JDK 9 优化

#### 💎 关键结论

JDK 9 引入 Compact Strings：String 内部存储从 `char[]` 改为 `byte[]` + coder 标识，纯拉丁字符每字符只占 1 字节（省 50% 内存）、GC 压力显著下降；含非拉丁字符时自动升级为 UTF-16。

#### ⚡记忆卡片

- **口诀**：char 改 byte，拉丁省一半
- **关键词**：`byte[]` ／ coder ／ LATIN1
- **链路**：存储改 `byte[]` → coder 标识编码 → LATIN1 每字符 1B → 内存/GC 收益

#### 📖 核心知识

JDK 9 引入 **Compact Strings（紧凑字符串）** 优化，将 String 内部存储从 `char[]` 改为 `byte[]`，大幅降低内存占用。

1. **优化背景**：

   - **JDK 8 及之前**：`String` 内部用 `char[]` 存储，每个字符占 **2 字节**（UTF-16）。
   - **问题**：大多数应用场景的字符串是**拉丁字符（ASCII）**，1 字节即可表示，浪费一半内存。

2. **JDK 9+ 的改进**：

```java
// JDK 8: private final char[] value;
// JDK 9+:
private final byte[] value;     // 字节数组存储
private final byte coder;        // 编码标识（LATIN1=0, UTF16=1）
```

3. **编码策略**：

   - **LATIN1（ISO-8859-1）**：所有字符 ≤ 0xFF 时使用，每个字符 **1 字节**。
   - **UTF-16**：包含非拉丁字符时自动升级，每个字符 **2 字节**。

4. **性能影响**：

| **维度**     | **JDK 8（char[]）** | **JDK 9+（byte[]）**    |
| ------------ | ------------------- | ----------------------- |
| **内存占用** | 每字符 2 字节       | 拉丁字符 1 字节，省 50% |
| **GC 压力**  | 较大                | 显著降低                |
| **方法性能** | 直接操作 char       | 需根据 coder 分支处理   |

5. **观察与配套优化**：查看 String 对象内存布局推荐用 JOL（Java Object Layout）；使用 G1 GC 时还可开启字符串去重，让相同内容的 String 共享底层 byte[]：

```bash
-XX:+UseStringDeduplication             # 启用 G1 字符串去重
-XX:+PrintStringDeduplicationStatistics # 输出去重统计信息
```

#### 🔬 扩展知识

::: details

- 【L3】Compact Strings 可用 `-XX:-CompactStrings` 关闭（默认开启），方便对照压测；coder=UTF16 时方法需分支处理，个别操作略慢，但内存收益远大于开销。
- 【L3】G1 的 String Deduplication 只合并底层数组（对象引用身份不变），与常量池复用是两套机制。
- 【L4】`AbstractStringBuilder`（StringBuilder/StringBuffer 父类）在 JDK 9+ 也同步改为 `byte[]` 存储，拼接链路全程享受紧凑存储。
  :::

#### 🔀 发散问题

- **Q：中文字符串能享受到这个优化吗？** → 不能，含非拉丁字符即升级为 UTF-16（每字符 2 字节），纯拉丁字符串才省 50%。
- **Q：如何验证自己应用的收益？** → 用 JOL 对比升级前后 String 对象大小，或压测观察堆占用与 GC 频率变化。

### 【中等】StringJoiner 和 String.join 有什么用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 拼接 API

#### 💎 关键结论

Java 8 引入的“分隔符拼接”利器：`StringJoiner` 支持分隔符 + 前后缀的流式 add；`String.join` 是面向集合/可变参数的便捷静态方法；Stream 场景用 `Collectors.joining`。三者底层都是 StringBuilder。

#### ⚡记忆卡片

- **口诀**：join 连集合，Joiner 带前后缀，joining 随 Stream
- **关键词**：分隔符 ／ 前后缀 ／ `Collectors.joining`
- **链路**：分隔符拼接需求 → 选 join/Joiner/joining → 底层 StringBuilder 自动处理分隔符

#### 📖 核心知识

Java 8 引入 `StringJoiner` 和 `String.join()`，简化**分隔符拼接**场景。

1. **StringJoiner**：

```java
StringJoiner joiner = new StringJoiner(",", "[", "]");  // 分隔符、前缀、后缀
joiner.add("a").add("b").add("c");
System.out.println(joiner);  // [a,b,c]
```

2. **String.join（便捷方法）**：

```java
String result = String.join("-", "2024", "07", "03");  // 2024-07-03

List<String> list = Arrays.asList("a", "b", "c");
String joined = String.join(",", list);  // a,b,c
```

3. **Stream 配合 Collectors.joining**：

```java
String result = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.joining(", ", "{", "}"));  // {A, B, C}
```

4. **适用场景对比**：

| **方式**              | **适用场景**         | **特点**               |
| --------------------- | -------------------- | ---------------------- |
| `+` / `StringBuilder` | 简单拼接             | 灵活但需手动处理分隔符 |
| `String.join`         | 已有集合，简单分隔符 | 最简洁                 |
| `StringJoiner`        | 流式构建，需前后缀   | 支持 prefix/suffix     |
| `Collectors.joining`  | Stream 收集阶段      | 函数式风格             |

#### 🔬 扩展知识

::: details

- 【L3】实现链路：`StringJoiner` 内部就是 StringBuilder；`String.join` 源码内部委托 `StringJoiner`；`Collectors.joining` 返回的收集器也以 StringJoiner 为累加器，并行流时通过 combiner 合并。
- 【L3】它们自动处理“最后一个元素后不加分隔符”的经典麻烦，比手写 StringBuilder + 条件判断更不易出错。
  :::

#### 🔀 发散问题

- **Q：并行流中用 Collectors.joining 安全吗？** → 安全，收集器由框架分区累加再合并，无需自己同步；手动共享一个 StringBuilder 反而会出错。
- **Q：非 String 元素怎么 join？** → 先 `map(Object::toString)` 或 `map(String::valueOf)` 转字符串再 joining。

### 【简单】String 的 equals 方法是如何实现的？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 源码分析

#### 💎 关键结论

`String.equals()` 是四级漏斗：先 `==` 引用相等快返，再 `instanceof` 类型检查，长度不等直接 false，最后逐字符比较。最坏 O(n)，但因预检优化实际远快于理论值。

#### ⚡记忆卡片

- **口诀**：同引用直接返，长度不等 false，再逐字符比
- **关键词**：引用预检 ／ 长度预检 ／ 逐字符比较
- **链路**：`==` 快返 → `instanceof` → 长度 → 逐字符 O(n)

#### 📖 核心知识

`String.equals()` 是重写过的内容比较方法，包含多重优化：

```java
public boolean equals(Object anObject) {
    if (this == anObject) {        // 1. 引用相等，直接返回 true
        return true;
    }
    if (anObject instanceof String) {  // 2. 类型检查
        String anotherString = (String) anObject;
        int n = value.length;
        if (n == anotherString.value.length) {  // 3. 长度不同直接 false
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {                  // 4. 逐字符比较
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

**优化要点**：

1. **引用相等检查**：`==` 比较地址，相同对象直接返回，避免字符比较开销。
2. **长度预检**：长度不同直接返回 false，无需逐字符比较。
3. **直接访问数组**：避免方法调用开销。

**性能对比**：`equals` 平均 O(n)，但实际因优化远快于理论值。

#### 🔬 扩展知识

::: details

- 【L3】JDK 9+ 源码基于 `byte[]` 与 coder 标识比较，且 HotSpot 提供字符串比较的 intrinsic（可向量化批量对比），热点路径比手写循环快得多。
- 【L3】`equals` 契约五性质（自反、对称、传递、一致、非空性）在 String 实现中均为标准示例，重写业务 equals 时应逐条自查。
  :::

#### 🔀 发散问题

- **Q：与 `==` 的关系？** → equals 第一步就是 `==` 快返；两者区别见本文档「== 和 equals() 有什么区别？」。
- **Q：`equalsIgnoreCase` 与 equals 有何不同？** → 忽略大小写逐字符比较（含大小写映射逻辑），不复用 equals 实现，开销更高。

### 【中等】String、StringBuilder、StringBuffer 的扩容机制？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：String / 扩容机制

#### 💎 关键结论

String 不可变无扩容；StringBuilder/StringBuffer 共用 `AbstractStringBuilder`：默认初始容量 16，扩容公式为 2 倍 + 2（`(oldCapacity << 1) + 2`）。生产中预估长度用构造器预分配，可避免多次扩容拷贝。

#### ⚡记忆卡片

- **口诀**：初始十六，扩容二倍加二
- **关键词**：初始 16 ／ 2 倍 + 2 ／ 预分配
- **链路**：append 超容量 → newCapacity = 2x+2 → 拷贝新数组 → 继续写入

#### 📖 核心知识

1. **String**：不可变，无扩容概念，每次修改创建新对象。

2. **StringBuilder / StringBuffer**（继承自 `AbstractStringBuilder`）：

```java
// 默认初始容量
public StringBuilder() { super(16); }  // 容量 16

// 扩容核心逻辑
private int newCapacity(int minCapacity) {
    int oldCapacity = value.length;
    // 新容量 = (旧容量 + 2) * 2，相当于 2 倍 + 2
    int newCapacity = (oldCapacity << 1) + 2;
    if (newCapacity - minCapacity < 0) {
        newCapacity = minCapacity;
    }
    return (newCapacity <= 0 || MAX_ARRAY_SIZE - newCapacity < 0)
        ? hugeCapacity(minCapacity) : newCapacity;
}
```

3. **扩容策略**：`(oldCapacity * 2) + 2`，即 **2 倍 + 2**。

4. **与 ArrayList 的对比**：

| **容器**      | **初始容量** | **扩容倍数** |
| ------------- | ------------ | ------------ |
| ArrayList     | 10           | 1.5 倍       |
| StringBuilder | 16           | 2 倍 + 2     |

5. **预分配建议**：预估最终长度时，构造器指定初始容量，避免多次扩容。

```java
StringBuilder sb = new StringBuilder(1024);  // 预分配 1KB
```

#### 🔬 扩展知识

::: details

- 【L3】JDK 9+ 中 `AbstractStringBuilder` 的 value 也同步改为 `byte[]`（配合 Compact Strings），容量按字节计；扩容上限 `MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8`，超限走 `hugeCapacity` 处理，再超限抛 `OutOfMemoryError`。
- 【L4】与 ArrayList 1.5 倍扩容相比，字符串 2 倍+2 扩容更激进：大容量拼接时重分配次数更少，但短期内存峰值也更高，超大拼接场景预分配容量尤其重要。
  :::

#### 🔀 发散问题

- **Q：如何避免多次扩容？** → `new StringBuilder(预估长度)` 预分配；长度未知时可用 `String.join`/`Collectors.joining` 交给 JDK 处理。
- **Q：为什么默认初始容量是 16？** → 经验值：兼顾小字符串不浪费与一般拼接少扩容，实际工程中大拼接应显式指定。
