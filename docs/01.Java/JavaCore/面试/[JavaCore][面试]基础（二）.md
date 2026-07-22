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

### 【简单】public、private、protected，以及无修饰符有什么区别？⭐⭐

- `private` 只允许当前类可以访问。
- 无修饰只允许同一个包中的类访问。
- `protected` 只允许当前类、子类和同一个包中的类访问。
- `public` 允许任意类和对象访问。

### 【简单】对象实体与对象引用有何不同？⭐⭐

（1）**对象是用来描述客观事物的一个抽象**。一个对象由一组属性和对这组属性进行操作的一组服务组成。

（2）**类是具有相同属性和方法的一组对象的集合**，它为属于该类的所有对象提供了统一的抽象描述，其内部包括属性和方法两个主要部分。

（3）对象实体与对象引用的不同之处在于：

- `new` 创建对象实例（对象实例在堆内存中），对象引用指向对象实例（对象引用存放在栈内存中）
- 一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）；
- 一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。

### 【简单】接口和抽象类有什么区别？⭐⭐

（1）接口是对行为的抽象，它是抽象方法的集合，利用接口可以达到 API 定义和实现分离的目的。

接口的主要特性有：

- 接口不能实例化。
- 接口不能包含任何非常量成员，任何字段都隐式的被 `public static final` 修饰。
- 接口中没有非静态方法，也就是说要么是抽象方法，要么是静态方法。
- 从 Java8 开始，接口增加了 `default` 方法特性，可以定义方法的默认实现；Java 9 以后，甚至可以定义私有的 `default` 方法。

（2）抽象类是不能实例化的类，用 abstract 关键字修饰 class，其目的主要是代码重用。除了不能实例化，形式上和一般的 Java 类并没有太大区别，可以有一个或者多个抽象方法，也可以没有抽象方法。抽象类大多用于抽取相关 Java 类的共用方法实现或者是共同成员变量，然后通过继承的方式达到代码复用的目的。

（3）接口和抽象类有什么相同点和不同点？

Java 中的类可以实现多个接口。

（4）与 C++ 等语言不一样，Java 类不支持多继承。这意味着，Java 不能通过继承多个抽象类来重用逻辑。那么，如何来实现重用呢？Java 的解决方案是：接口支持多继承，准确的说，接口支持扩展多个接口，而接口也支持实现多个接口。

### 【中等】什么是 Java 内部类？内部类有什么作用？⭐⭐

::: info 什么是内部类？
:::

内部类 (Inner Class) 是定义在另一个类内部的类 .java 中有四种类型的内部类：

- **成员内部类**：作为外部类的成员存在
- **局部内部类**：定义在方法或作用域内的类
- **匿名内部类**：没有名字的局部内部类
- **静态嵌套类**：用 static 修饰的嵌套类

::: info 内部类有什么作用？
:::

- **逻辑聚合**：当某个类只对另一个类有用时，可以将其嵌入使用它的类中，保持代码在一起
- **强化封装**：内部类可以访问外部类的私有成员，同时自身也可以对外部完全隐藏
- **间接实现多重继承**：通过内部类可以间接实现多重继承的效果
- **回调机制**：常用于事件处理和监听器实现
- **代码简化**：特别是匿名内部类可以减少代码量

::: info 内部类有哪些特点？
:::

- 内部类可以访问外部类的所有成员（包括 private)
- 外部类需要通过实例化内部类来访问其成员
- 内部类编译后会生成独立的 .class 文件（格式：`OuterClass$InnerClass.class`)
- 非静态内部类不能有静态成员（静态内部类可以）
- 内部类可以继承其他类或实现接口

### 【中等】四种内部类有什么区别？⭐

| **类型** | **声明位置** | **static** | **访问外部成员** | **创建方式** | **典型用途** |
| -------- | ------------ | ---------- | ---------------- | ------------ | ------------ |
| **成员内部类** | 类中成员位置 | 否 | 全部（含 private） | `outer.new Inner()` | 关联外部实例 |
| **静态嵌套类** | 类中成员位置 | 是 | 仅静态成员 | `new Outer.Inner()` | Builder、工具类 |
| **局部内部类** | 方法/代码块中 | 否 | 全部 + final 局部变量 | 方法内 new | 临时封装 |
| **匿名内部类** | 表达式中 | - | 全部 + final 局部变量 | `new Type() {...}` | 回调、监听 |

**关键细节**：

- **非静态内部类隐式持有外部类引用**：可能导致内存泄漏（如 Android Handler 持有 Activity）。
- **局部/匿名内部类访问的局部变量必须 final（或 effectively final）**：因局部变量在栈上，内部类对象生命周期可能超出方法。
- **Lambda 可替代匿名内部类**：函数式接口场景优先用 Lambda。

### 【简单】为什么 Java 不支持多重继承？⭐⭐

Java 不支持多重继承的核心原因是**为了避免【菱形继承问题（Diamond Problem）】**。

::: info 什么是菱形继承问题？
:::

菱形继承存在歧义性：

- 如果类 C 继承自类 A 和类 B，而 A 和 B 都有同名方法 `method()`
- 调用 `C.method()` 时无法确定应该调用 A 还是 B 的版本

由于菱形继承歧义性而引发的复杂性增加问题：

- 多重继承会显著增加编译器和 JVM 的实现复杂度
- 方法调用、构造函数调用顺序变得难以确定

::: info Java 如何解决多重继承？
:::

在 Java 中，类可以实现多个接口。接口提供多重继承的行为规范，但不包含具体实现。

JDK8 之后，接口支持默认方法（default），是不是又出现了菱形继承问题？

为了规避这个问题，Java 强制规定，如果多个接口存在相同的默认方法，子类必须重写这个方法。否则，编译器会报错。

### 【中等】深拷贝和浅拷贝有什么区别？⭐⭐

::: info 深拷贝和浅拷贝有什么区别？
:::

| **关键点**       | **浅拷贝**                           | **深拷贝**                       |
| :--------------- | :----------------------------------- | :------------------------------- |
| **复制对象**     | 只复制对象本身（基本类型值拷贝）     | 递归复制对象及其引用的所有子对象 |
| **引用类型字段** | 新旧对象共享同一引用（修改相互影响） | 创建全新引用对象（修改完全隔离） |
| **内存开销**     | 小（仅复制一层）                     | 大（递归复制所有关联对象）       |
| **实现方式**     | 默认`Object.clone()`                 | 需手动实现递归克隆/序列化/工具类 |
| **适用场景**     | 对象无可变引用字段                   | 对象含可变引用字段且需完全独立   |

**本质区别**：浅拷贝是"复制钥匙"，深拷贝是"复制钥匙+保险箱"。

**注意事项**：

- 深拷贝需处理循环引用问题
- 推荐使用`SerializationUtils.clone()`或 JSON 序列化实现深拷贝
- 不可变对象（如 String）的浅拷贝是安全的

::: info 深拷贝和浅拷贝实现方式有什么区别？
:::

**实现方式对比**

| **方法**                     | **浅拷贝** | **深拷贝** | **说明**                      |
| :--------------------------- | :--------- | :--------- | :---------------------------- |
| `Object.clone()`             | ✓          | ✗          | 默认浅拷贝                    |
| **手动递归克隆**             | ✗          | ✓          | 需所有引用类型实现`Cloneable` |
| **序列化反序列化**           | ✗          | ✓          | 通过`ObjectOutputStream`实现  |
| **工具类（Apache Commons）** | ✗          | ✓          | `SerializationUtils.clone()`  |

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

### 【简单】面向对象和面向过程有什么区别？⭐⭐

面向对象和面向过程的主要区别：

| 维度         | 面向对象（OOP）               | 面向过程（POP）          |
| ------------ | ----------------------------- | ------------------------ |
| **核心思想** | 以**对象**为中心              | 以**步骤**为中心         |
| **代码组织** | 按**现实实体**抽象为类        | 按**功能流程**拆分为函数 |
| **数据管理** | 数据与行为封装在对象中        | 数据与函数独立           |
| **扩展方式** | 通过继承/多态扩展（开闭原则） | 需修改函数逻辑           |
| **典型特性** | 封装、继承、多态三大特性      | 无三大特性               |
| **典型语言** | Java, Python, C++             | C, Pascal                |

### 【中等】面向对象三大特征和五大原则是什么？⭐⭐

::: info 面向对象三大特征是什么？
:::

**面向对象三大特征：**

- **封装（Encapsulation）** ：**隐藏内部细节，暴露安全接口**。

  - 用 `private` 保护数据，通过 `getter/setter` 控制访问
  - 示例：`BankAccount` 类隐藏余额，提供 `deposit()`/`withdraw()` 方法

- **继承（Inheritance）** ：**子类复用父类属性和方法**。

  - 通过 `extends` 实现（如 `Dog extends Animal`）
  - 注意：Java 是单继承（一个子类只能有一个父类）

- **多态（Polymorphism）** ：**同一行为的不同实现方式**。
  - **编译时多态**：方法重载（`Overload`）
  - **运行时多态**：方法重写（`Override`）+ 向上转型（子类对象转为父类对象，如 `Animal a = new Dog(); a.sound();`）

**一言以概之**：**封装保证安全性，继承提高复用性，多态增强扩展性**。

::: info 面向对象的五大原则是什么？
:::

面向对象的五大原则是 **SOLID** 原则：

- **单一职责原则 (SRP)**：**一个类只负责一个功能**，避免职责过多导致代码臃肿。
- **开闭原则 (OCP)**：**对扩展开放，对修改关闭**。通过抽象和继承扩展功能，而非直接修改原有代码。
- **里氏替换原则 (LSP)**：**子类必须能替换父类**，确保继承关系不会破坏程序逻辑。
- **接口隔离原则 (ISP)**：**接口应当小而专**，避免臃肿接口强制实现不必要的方法。
- **依赖倒置原则 (DIP)**：**依赖抽象而非具体**，高层模块不直接依赖低层模块，而是通过接口或抽象类交互。

**一言以概之**：SOLID 原则让代码更灵活、可维护、易扩展。

### 【简单】Java 中 final 关键字有什么用？⭐

`final` 关键字表示**不可变性约束**，可修饰类、方法、变量，是 Java 设计"不可变"的基础。

**三种用法详解**：

| **修饰目标** | **效果** | **典型示例** |
| ------------ | -------- | ------------ |
| **类** | 不能被继承（防止子类破坏不变性） | `String`、`Integer`、`LocalDate` |
| **方法** | 不能被子类重写（防止行为被篡改） | `Object.getClass()` |
| **变量** | 只能赋值一次（常量） | `static final int MAX = 100;` |

**变量修饰的细节**：

- **基本类型**：值不可变。
- **引用类型**：**引用不可变，但对象内容可变**（易踩坑）。

```java
final List<String> list = new ArrayList<>();
list.add("A");      // ✔️ 合法，修改的是对象内容
list = new ArrayList<>();  // ❌ 编译错误，引用不可重新赋值
```

- **局部变量**：使用前必须赋值（可在声明后赋值一次）。
- **方法参数**：`final` 参数在方法内不可重新赋值（常用于匿名内部类捕获变量）。

**final 与 JVM 优化**：

- **内存语义**：JDK 5+ 的 Java 内存模型（JMM）保证 `final` 字段的写操作在构造函数返回前完成，且对所有线程可见（**安全发布**）。
- **内联优化**：JIT 编译器可对 `final` 方法进行更激进的**内联优化**（无需动态分派）。

**final vs finally vs finalize**：三者**毫无关联**，仅命名相似。详见异常章节。

### 【中等】`this` 和 `super` 关键字有什么用？⭐

`this` 和 `super` 是 Java 用于**引用当前对象**和**父类成员**的关键字。

**`this` 的用途**：

| **场景** | **示例** | **说明** |
| -------- | -------- | -------- |
| 区分成员变量与局部变量 | `this.name = name;` | 形参名与字段名相同时 |
| 调用本类其他构造器 | `this(args);` | 必须在构造器首行 |
| 返回当前对象引用 | `return this;` | 链式调用（Builder 模式） |
| 作为参数传递 | `service.register(this);` | 传递当前实例 |
| 访问外部类（内部类场景） | `Outer.this.field` | 内部类引用外部类 |

**`super` 的用途**：

| **场景** | **示例** | **说明** |
| -------- | -------- | -------- |
| 调用父类构造器 | `super(args);` | 必须在子类构造器首行 |
| 访问父类被遮蔽的字段 | `super.field` | 子类有同名字段时 |
| 调用父类被覆盖的方法 | `super.method();` | 显式调父类实现 |

**关键规则**：

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

**隐式调用规则**：

- 子类构造器**默认第一行**调用 `super()`（无参），若父类无无参构造则编译错误。
- 解决：父类必须显式声明无参构造，或子类用 `super(args)` 调用有参构造。

### 【中等】接口的默认方法冲突如何解决？⭐

Java 8 引入接口默认方法后，类实现多个接口时可能出现**默认方法冲突**（Diamond Problem 变种）。

**冲突场景一：两个接口有相同默认方法**

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

**冲突场景二：父类方法 vs 接口默认方法**

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

**核心规则（优先级）**：

1. **类方法 > 接口默认方法**（类优先原则，保证向后兼容）。
2. **子接口 > 父接口**（更具体的接口胜出）。
3. **冲突时必须显式覆盖**（编译器不替你选择）。

### 【中等】Java 多态的实现原理是什么？⭐

多态是 OOP 的核心特性之一，Java 通过**动态分派**实现运行时多态。

**多态分类**：

| **类型** | **机制** | **示例** | **判定时机** |
| -------- | -------- | -------- | ------------ |
| **编译时多态** | 方法重载（Overload） | `print(int)` vs `print(String)` | 编译期静态绑定 |
| **运行时多态** | 方法重写（Override）+ 向上转型 | `Animal a = new Dog(); a.sound();` | 运行期动态绑定 |

**运行时多态的三个前提**：

1. **继承关系**（extends 或 implements）。
2. **方法重写**（子类覆盖父类方法）。
3. **父类引用指向子类对象**（向上转型）。

**底层实现原理（基于虚方法表 vtable）**：

```java
Animal a = new Dog();
a.sound();  // 实际调用 Dog.sound()
```

JVM 实现动态分派的机制：

- **类加载时**：JVM 为每个类生成**虚方法表（vtable）**，存储该类所有虚方法的直接引用。
- **方法调用时**：通过对象的**运行时类型**查找其 vtable，定位实际方法。
- **非虚方法**：`static`、`final`、`private` 方法不进入 vtable（静态绑定）。

**字节码层面**：

```java
// 字节码使用 invokevirtual 指令
invokevirtual #16 // Method Animal.sound:()V
```

`invokevirtual` 在运行时根据对象的实际类型（`Dog`）查找 vtable，调用 `Dog.sound()`。

**字段不参与多态**：

```java
class Father { int num = 1; }
class Son extends Father { int num = 2; }

Father f = new Son();
System.out.println(f.num);  // 输出 1（字段访问基于编译时类型，静态绑定）
```

**多态的经典陷阱：构造器中的多态调用**

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

## Object

### 【简单】Object 类的常见方法有哪些？⭐⭐

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

### 【简单】== 和 equals() 有什么区别？⭐⭐

| **对比项**       | **`==`**                                     | **`equals()`**                                                        |
| :--------------- | :------------------------------------------- | :-------------------------------------------------------------------- |
| **基本类型比较** | 比较**值**                                   | 不能比较                                                              |
| **引用类型比较** | 比较**内存地址**                             | 默认比较**内存地址**（同 `==`），但可重写为逻辑比较（如内容是否相同） |
| **是否可重写**   | 否（运算符，行为固定）                       | 是（可自定义比较逻辑）                                                |
| **用途**         | 快速判断基本类型值相等或引用是否指向同一对象 | 判断对象逻辑是否相等（如内容、属性等）                                |

### 【简单】为什么重写 equals() 时必须重写 hashCode() 方法？⭐⭐

- `hashCode()` 方法返回对象的哈希值，常用于存储结构中快速比较对象是否相同。
- `equals()` 方法比较对象内容是否相同，需自行实现逻辑。

Java 规定：**两个对象若`equals()`相等，它们的`hashCode()`必须相同**。如果违背，则哈希集合（如 `HashMap`、`HashSet`）无法正确去重或查找。

- `HashMap`/`HashSet` 先通过 `hashCode()` 快速定位数据，再用 `equals()` 精确匹配。
- 若 `hashCode()` 不一致，即使 `equals()` 为 `true`，集合会误判为不同对象。

::: info 如何正确重写 `hashCode()`？
:::

- **`equals()`**：比较所有关键字段（如 `name`、`age`）。
- **`hashCode()`**：用 `Objects.hash(字段1, 字段2)` 生成（确保与 `equals()` 字段一致）。

::: tip 扩展

[Java hashCode() 和 equals() 的若干问题解答](https://www.cnblogs.com/skywang12345/p/3324958.html)

:::

### 【简单】finalize 有什么用？⭐⭐

一言以概之，**`finalize` 可用于对象销毁前的清理，但不可靠且性能差，现代 Java 开发应避免使用，改用 `AutoCloseable` 或 `Cleaner`。**

**Java 9+ 已弃用 `finalize`**，推荐使用：

- `try-with-resources`（实现 `AutoCloseable` 接口）
- `Cleaner` 或 `PhantomReference`（更可控的清理机制）。

**`finalize` 的作用（Java）** ：

- **对象被垃圾回收前的清理**：在对象被 GC 回收前，`finalize()` 会被调用，可用于释放非内存资源（如文件句柄、数据库连接等）。
- **最后的补救机会**：如果对象未被正确关闭，`finalize` 提供最后一次资源释放的机会。

**`finalize` 的问题** ：

- **不保证执行**：JVM 不保证 `finalize` 一定会执行（如程序突然终止时）。即使对象可达性失效，GC 可能延迟回收，导致 `finalize` 延迟调用。
- **性能开销**：覆写 `finalize` 的对象会被 JVM 放入特殊队列，垃圾回收变慢。可能引发内存泄漏（如果 `finalize` 阻塞或执行过久）。
- **安全问题**：在 `finalize` 中抛出异常会导致清理中断，且异常被忽略。可能被恶意代码利用（如通过重写 `finalize` 复活对象，干扰 GC）。

### 【中等】Object#clone() 方法和 Cloneable 接口如何使用？⭐

`Object#clone()` 是 Java 提供的**原生克隆机制**，但设计上有诸多坑点。

**基本用法**：

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

**关键规则**：

- **必须实现 `Cloneable` 接口**（标记接口，无方法），否则调用 `super.clone()` 抛出 `CloneNotSupportedException`。
- **访问权限是 `protected`**：子类需重写为 `public` 才能被外部调用。
- **默认是浅拷贝**：基本类型复制值，引用类型复制引用。

**浅拷贝的隐患**：

```java
Person p1 = new Person("Alice", 25, new Address("Beijing"));
Person p2 = p1.clone();
p2.getAddress().setCity("Shanghai");
System.out.println(p1.getAddress().getCity());  // Shanghai（被影响！）
```

**深拷贝的正确实现**：

```java
@Override
protected Person clone() throws CloneNotSupportedException {
    Person cloned = (Person) super.clone();
    cloned.address = address.clone();  // 递归克隆引用字段
    return cloned;
}
```

**《Effective Java》的建议**：

> **Item 13：谨慎地覆盖 clone**。更好的替代方案是**提供拷贝构造器或拷贝工厂方法**。

```java
// 推荐替代方案：拷贝构造器
public Person(Person other) {
    this.name = other.name;
    this.age = other.age;
    this.address = new Address(other.address);  // 深拷贝
}
```

**clone 机制的问题总结**：

| **问题** | **说明** |
| -------- | -------- |
| **设计矛盾** | `Cloneable` 接口无方法，却改变 `Object.clone()` 行为 |
| **浅拷贝陷阱** | 默认浅拷贝易引发共享引用 bug |
| **final 字段无法重新赋值** | 深拷贝时 `final` 引用字段无法重新指向 |
| **不可用于单例** | 反射调用 `clone()` 可破坏单例模式 |

## String

### 【简单】String、StringBuffer、StringBuilder 有什么区别？⭐⭐

| **特性**     | **String**                | **StringBuffer**    | **StringBuilder**            |
| :----------- | :------------------------ | :------------------ | :--------------------------- |
| **可变性**   | ❌ 不可变                 | ✔️ 可变             | ✔️ 可变                      |
| **线程安全** | ✔️（由于不可变）          | ✔️（同步方法）      | ❌（非线程安全）             |
| **性能**     | ⚠️ 最差（频繁创建新对象） | ⚠️ 中等（同步开销） | ✔️ 最高（无同步开销）        |
| **适用场景** | 常量、少量拼接            | 多线程字符串操作    | **单线程字符串操作（推荐）** |

**概括**

- **用 `String` 存储常量**，**用 `StringBuilder` 高效拼接（单线程）**，**用 `StringBuffer` 保证线程安全（多线程）**。
- **优先选 `StringBuilder`**（90%场景适用）。

### 【简单】String 为什么是不可变的？⭐⭐

`String` 的不可变性是 Java 为安全、性能、线程安全做的核心设计。

**String 不可变的核心原因**：

- **`final` 修饰的 `char[]` 数组**：Java 中 `String` 内部用 `private final char[]`（JDK 9+ 改为 `byte[]`）存储数据，数组引用和内容均不可修改。
- **无修改内部状态的方法**：所有看似“修改”的方法（如 `concat()`、`substring()`）都返回**新 `String` 对象**，原对象不变。

**为什么 String 被设计为 final？**

- **安全**
  - **并发安全**：不可变天然线程安全，无需同步；
  - **类加载安全**：类加载时通常按类的全限定名字符串进行加载，不可变保证了其安全性。
- **性能**
  - **hashCode 缓存**：`String` 的 `hashCode()` 计算结果可缓存（因内容不变），提升性能（如 `HashMap` 的键）。
  - **常量池**：如 `String s = "abc"` 会复用常量池中的相同字符串，减少内存开销。
- **避免混淆**：避免子类覆写父类方法，导致意想不到的结果。

**示例验证不可变性**：

```java
String s1 = "Hello";
String s2 = s1.concat(" World");
System.out.println(s1); // 输出 "Hello"（原字符串未变）
System.out.println(s2); // 输出 "Hello World"（新对象）
```

### 【简单】字符串拼接用“+” 还是 StringBuilder?⭐⭐

**循环/动态拼接 → `StringBuilder`；简单常量拼接 → "+"；多线程 → `StringBuffer`（极少用）。**  
**`StringBuilder` 是默认推荐选择！**

**优先用 `StringBuilder`（大多数场景）**

- **适用情况**：循环、动态拼接、大量字符串操作。
- **原因**：
  - **高性能**：直接修改缓冲区，避免 `+` 频繁创建新对象。
  - **低内存开销**：减少临时对象和 GC 压力。

**简单拼接可用 "+"（编译期优化）**

- **适用情况**：少量**固定字符串**拼接（如 `"a" + "b"`）。
- **原因**：
  - **代码简洁**：可读性更好。
  - **编译器优化**：JVM 自动合并为常量（如 `"ab"`），无性能损失。
  - 通过“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的。
  - 在循环内使用“+”，会导致创建过多的 `StringBuilder` 对象。JDK9 中，优化了这个问题，字符串相加 “+” 改为了用动态方法 `makeConcatWithConstants()` 来实现，而不是大量的 `StringBuilder` 了。

**多线程拼接用 `StringBuffer`（极少需要）**

- **适用情况**：多线程环境且需线程安全（通常局部变量仍可用 `StringBuilder`）。

::: tip 扩展

[StringBuilder？来重温一下字符串拼接吧](https://juejin.cn/post/7182872058743750715) 。

:::

### 【简单】String#equals() 和 Object#equals() 有何区别？⭐⭐

| **对比项**   | **`Object#equals()`**              | **`String#equals()`**                      |
| :----------- | :--------------------------------- | :----------------------------------------- |
| **默认行为** | 比较**内存地址**（`==`）           | 比较**字符串内容**（逐字符对比）           |
| **重写目的** | 需子类自行重写以实现逻辑相等       | 已优化为内容比较，满足字符串业务需求       |
| **性能影响** | 无额外开销                         | 需遍历字符数组，但优先检查地址和长度       |
| **使用场景** | 通用对象比较（默认不满足内容相等） | 字符串内容对比（如 `"abc".equals("abc")`） |

### 【简单】字符串常量池有什么用？⭐⭐

字符串常量池是 JVM 的特殊内存区域，用于存储字符串字面量（如 `"abc"`），确保相同内容的字符串只存一份。

**字符串常量池通过复用相同字符串，节省内存并提升性能，直接赋值（`"abc"`）优先使用池，`new String()` 强制创建新对象。**

字符串常量池的作用有：

**节省内存**：相同字符串复用，避免重复创建（如 `String s1 = "hello"` 和 `String s2 = "hello"` 指向同一对象）。

**提升性能**：

- **快速比较**：直接通过 `==` 判断地址是否相同（比 `equals()` 更快）。
- **哈希优化**：如 `HashMap` 的键可复用缓存的 `hashCode`。

**实现规则**

- **直接赋值**（`String s = "abc"`）→ **优先从常量池引用**。
- **`new String("abc")`** → **强制在堆中创建新对象**（不推荐，除非需隔离实例）。
- **`intern()` 方法** → 将堆中的字符串对象添加到常量池（若池中不存在）。

**注意事项**

- **避免滥用 `new String()`**：无特殊需求时，直接用字面量赋值。
- **`intern()` 慎用**：可能增加常量池内存压力，需权衡性能。

### 【简单】`String s = new String("abc")` 创建了几个字符串对象？⭐⭐

`new String("abc")` 可能创建 1~2 个对象（取决于常量池是否已存在"abc"），但堆中的新对象必定创建。

- **常量池已存在"abc"**：**1 个对象**（仅堆中的 `new String`）
- **常量池不存在"abc"**：**2 个对象**（常量池的"abc" + 堆中的 `new String`）

### 【简单】String#intern 方法有什么用？⭐⭐

String#intern 方法的**作用**有：

- **强制字符串入池**：将堆中的 `String` 对象添加到字符串常量池（若池中不存在）
- **返回池中引用**：保证相同内容的字符串始终返回同一内存地址

**注意**

- **JDK7+ 优化**：常量池从方法区移至堆内存，减少内存溢出风险。
- **慎用场景**：
  - 避免对动态生成的短生命周期字符串使用（可能导致池膨胀）
  - 优先用于高频使用的静态字符串（如配置键值）

### 【简单】String 类型的变量和常量做“+”运算时会发生什么？⭐⭐

**常量相加编译期优化，变量相加隐式转 `StringBuilder`，循环拼接必须显式使用 `StringBuilder` 避免性能损耗。**

**常量折叠（编译期优化）**

- **纯常量运算**（如 `"a"+"b"`）→ 直接合并为 `"ab"`，仅存于常量池
- **final 变量** 视为常量，同样触发优化

**变量拼接（运行时行为）**

- **含变量的运算**（如 `str + "b"`）→ 隐式转换为 `StringBuilder` 操作
  ```java
  // 实际执行逻辑
  new StringBuilder().append(str).append("b").toString()
  ```
- **每次运算** 生成临时 `StringBuilder` 和最终 `String` 对象

**性能关键差异**

| 场景           | 内存/性能表现                        | 优化建议                       |
| -------------- | ------------------------------------ | ------------------------------ |
| 常量+常量      | 零运行时开销                         | 无需处理                       |
| 单次变量+常量  | 1 次 `StringBuilder` 创建            | 可接受                         |
| **循环内拼接** | 多次创建 `StringBuilder`（性能陷阱） | **必须显式用 `StringBuilder`** |

**最佳实践**

- **简单拼接**：直接使用 `+`（可读性优先）
- **循环/批量拼接**：

  ```java
  // ✔️ 正确写法
  StringBuilder sb = new StringBuilder();
  for (String str : list) sb.append(str);
  String result = sb.toString();

  // ❌ 错误写法（低效）
  String s = "";
  for (String str : list) s += str; // 每次循环隐式新建 StringBuilder
  ```

### 【中等】JDK 9 对 String 做了哪些优化（Compact Strings）？⭐

JDK 9 引入 **Compact Strings（紧凑字符串）** 优化，将 String 内部存储从 `char[]` 改为 `byte[]`，大幅降低内存占用。

**优化背景**：

- **JDK 8 及之前**：`String` 内部用 `char[]` 存储，每个字符占 **2 字节**（UTF-16）。
- **问题**：大多数应用场景的字符串是**拉丁字符（ASCII）**，1 字节即可表示，浪费一半内存。

**JDK 9+ 的改进**：

```java
// JDK 8: private final char[] value;
// JDK 9+: 
private final byte[] value;     // 字节数组存储
private final byte coder;        // 编码标识（LATIN1=0, UTF16=1）
```

**编码策略**：

- **LATIN1（ISO-8859-1）**：所有字符 ≤ 0xFF 时使用，每个字符 **1 字节**。
- **UTF-16**：包含非拉丁字符时自动升级，每个字符 **2 字节**。

**性能影响**：

| **维度** | **JDK 8（char[]）** | **JDK 9+（byte[]）** |
| -------- | ------------------- | -------------------- |
| **内存占用** | 每字符 2 字节 | 拉丁字符 1 字节，省 50% |
| **GC 压力** | 较大 | 显著降低 |
| **方法性能** | 直接操作 char | 需根据 coder 分支处理 |

**验证方法**：

```bash
# 查看 String 对象的内存布局
java -XX:+UnlockDiagnosticVMOptions -XX:+PrintStringDeduplicationStatistics
```

**配套优化：String Deduplication（G1 GC）**

```bash
-XX:+UseStringDeduplication  # 启用 G1 字符串去重，相同内容字符串共享底层 byte[]
```

### 【中等】StringJoiner 和 String.join 有什么用？⭐

Java 8 引入 `StringJoiner` 和 `String.join()`，简化**分隔符拼接**场景。

**StringJoiner**：

```java
StringJoiner joiner = new StringJoiner(",", "[", "]");  // 分隔符、前缀、后缀
joiner.add("a").add("b").add("c");
System.out.println(joiner);  // [a,b,c]
```

**String.join（便捷方法）**：

```java
String result = String.join("-", "2024", "07", "03");  // 2024-07-03

List<String> list = Arrays.asList("a", "b", "c");
String joined = String.join(",", list);  // a,b,c
```

**Stream 配合 Collectors.joining**：

```java
String result = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.joining(", ", "{", "}"));  // {A, B, C}
```

**适用场景对比**：

| **方式** | **适用场景** | **特点** |
| -------- | ------------ | -------- |
| `+` / `StringBuilder` | 简单拼接 | 灵活但需手动处理分隔符 |
| `String.join` | 已有集合，简单分隔符 | 最简洁 |
| `StringJoiner` | 流式构建，需前后缀 | 支持 prefix/suffix |
| `Collectors.joining` | Stream 收集阶段 | 函数式风格 |

### 【简单】String 的 equals 方法是如何实现的？⭐

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

### 【中等】String、StringBuilder、StringBuffer 的扩容机制？⭐

**String**：不可变，无扩容概念，每次修改创建新对象。

**StringBuilder / StringBuffer**（继承自 `AbstractStringBuilder`）：

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

**扩容策略**：`(oldCapacity * 2) + 2`，即**2 倍 + 2**。

**与 ArrayList 的对比**：

| **容器** | **初始容量** | **扩容倍数** |
| -------- | ------------ | ------------ |
| ArrayList | 10 | 1.5 倍 |
| StringBuilder | 16 | 2 倍 + 2 |

**预分配建议**：预估最终长度时，构造器指定初始容量，避免多次扩容。

```java
StringBuilder sb = new StringBuilder(1024);  // 预分配 1KB
```
