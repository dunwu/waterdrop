---
title: Java 基础面试
date: 2024-06-18 22:46:20
categories:
  - Java
  - JavaSE
  - 面试
tags:
  - Java
  - JavaSE
  - 面试
permalink: /pages/f1702b17/
---

# Java 基础面试

## 基础概念与常识

Java 语言有哪些特点?

Java SE vs Java EE

JVM vs JDK vs JRE

什么是字节码?采用字节码的好处是什么?

为什么说 Java 语言“编译与解释并存”？

AOT 有什么优点？为什么不全部使用 AOT 呢？

Oracle JDK vs OpenJDK

## 注释

### Java 有几种注释形式

注释用于在源代码中解释代码的作用，可以增强程序的可读性，可维护性。 空白行，或者注释的内容，都会被 Java 编译器忽略掉。

Java 注释主要有三种类型：

- 单行注释
- 多行注释
- 文档注释（JavaDoc）

```java
public class HelloWorld {
    /*
     * JavaDoc 注释
     */
    public static void main(String[] args) {
        // 单行注释
        /* 多行注释
           1. 注意点a
           2. 注意点b
         */
        System.out.println("Hello World");
    }
}
```

## 数据类型

### Java 有哪些值类型？

Java 中的数据类型有两类：

- 值类型（又叫内置数据类型，基本数据类型）
- 引用类型（除值类型以外，都是引用类型，包括 `String`、数组等）

Java 语言提供了 **8** 种基本类型，大致分为 **4** 类：布尔型、字符型、整数型、浮点型。

| 基本数据类型 | 分类       | 大小   | 默认值    | 取值范围                      | 包装类    | 说明                                        |
| ------------ | ---------- | ------ | --------- | ----------------------------- | --------- | ------------------------------------------- |
| `boolean`    | **布尔型** | -      | `false`   | {false, true}                 | Boolean   | `boolean` 的大小，是由具体的JVM实现来决定的 |
| `char`       | **字符型** | 16 bit | `'u0000'` | [0, $2^{16} - 1$]             | Character | 存储 Unicode 码，用单引号赋值               |
| `byte`       | **整数型** | 8 bit  | `0`       | [-$2^7$, $2^7 - 1$]           | Byte      |                                             |
| `short`      | **整数型** | 16 bit | `0`       | [-$2^{15}$, $2^{15} - 1$]     | Short     |                                             |
| `int`        | **整数型** | 32 bit | `0`       | [-$2^{31}$, $2^{31} - 1$]     | Integer   |                                             |
| `long`       | **整数型** | 64 bit | `0L`      | [-$2^{63}$, $2^{63} - 1$]     | Long      | 赋值时一般在数字后加上 `l` 或 `L`           |
| `float`      | **浮点型** | 32 bit | `0.0f`    | [$2^{-149}$, $2^{128} - 1$]   | Float     | 赋值时必须在数字后加上 `f` 或 `F`           |
| `double`     | **浮点型** | 64 bit | `0.0d`    | [$2^{-1074}$, $2^{1024} - 1$] | Double    | 赋值时一般在数字后加 `d` 或 `D`             |

### 什么是装箱、拆箱？

Java 中为每一种基本数据类型提供了相应的包装类，如下：

```
Byte <-> byte
Short <-> short
Integer <-> int
Long <-> long
Float <-> float
Double <-> double
Character <-> char
Boolean <-> boolean
```

**引入包装类的目的**就是：提供一种机制，使得**基本数据类型可以与引用类型互相转换**。

基本数据类型与包装类的转换被称为装箱和拆箱。

- **装箱（boxing）是将值类型转换为引用类型**。例如：`int` 转 `Integer`
  - 装箱过程是通过调用包装类的 `valueOf` 方法实现的。
- **拆箱（unboxing）是将引用类型转换为值类型**。例如：`Integer` 转 `int`
  - 拆箱过程是通过调用包装类的 `xxxValue` 方法实现的。（xxx 代表对应的基本数据类型）。

### 自动装箱与拆箱的原理是什么？

```java
Integer a = 10;  //装箱
int b = a;   //拆箱
```

上面这两行代码对应的字节码为：



```java
   L1

    LINENUMBER 8 L1

    ALOAD 0

    BIPUSH 10

    INVOKESTATIC java/lang/Integer.valueOf (I)Ljava/lang/Integer;

    PUTFIELD AutoBoxTest.i : Ljava/lang/Integer;

   L2

    LINENUMBER 9 L2

    ALOAD 0

    ALOAD 0

    GETFIELD AutoBoxTest.i : Ljava/lang/Integer;

    INVOKEVIRTUAL java/lang/Integer.intValue ()I

    PUTFIELD AutoBoxTest.n : I

    RETURN
```

通过字节码代码，不难发现，装箱其实就是调用了 包装类的 `valueOf()` 方法；而拆箱其实就是调用了 `xxxValue()` 方法。

因此，

- `Integer a = 10` 等价于 `Integer a = Integer.valueOf(10)`
- `int b = a` 等价于 `int b = a.intValue()`;

### 比较包装类型为什么不能用 ==？

Java 值类型的包装类大部分都使用了缓存机制来提升性能：

- `Byte`、`Short`、`Integer`、`Long` 这 4 种包装类，默认都创建了数值在 **[-128，127]** 范围之间的相应类型缓存数据；
- `Character` 创建了数值在 **[0,127]** 范围之间的缓存数据；
- `Boolean` 直接返回 `True` or `False`；

试图装箱的数值，如果超出缓存范围，则会创建新的对象。

以 `Long.valueOf` 方法为例：

```java
public static Long valueOf(long l) {
    final int offset = 128;
    if (l >= -128 && l <= 127) { // will cache
        return LongCache.cache[(int)l + offset];
    }
    return new Long(l);
}
```

### 为什么浮点数运算的时候会有精度丢失的风险？

### 如何解决浮点数运算的精度丢失问题？

### 超过 long 整型的数据应该如何表示？

## 变量

标识符和关键字的区别是什么？

成员变量与局部变量的区别？

为什么成员变量有默认值？

静态变量有什么作用？

字符型常量和字符串常量的区别?

## 操作符

如果移位的位数超过数值所占有的位数会怎样？

## 方法

什么是方法的返回值?

方法有哪几种类型？

静态方法为什么不能调用非静态成员?

静态方法和实例方法有何不同？

重载和覆写有什么区别？

什么是可变长参数？

## 面向对象

面向对象和面向过程的区别

创建一个对象用什么运算符?对象实体与对象引用有何不同?

对象的相等和引用相等的区别

如果一个类没有声明构造方法，该程序能正确执行吗?

构造方法有哪些特点？是否可被 override?

面向对象三大特征

接口和抽象类有什么共同点和区别？

深拷贝和浅拷贝区别了解吗？什么是引用拷贝？

## Object

Object 类的常见方法有哪些？

== 和 equals() 的区别

hashCode() 有什么用？

为什么重写 equals() 时必须重写 hashCode() 方法？

## String

String、StringBuffer、StringBuilder 的区别？

String 为什么是不可变的?

字符串拼接用“+” 还是 StringBuilder?

String#equals() 和 Object#equals() 有何区别？

字符串常量池的作用了解吗？

String s1 = new String("abc");这句话创建了几个字符串对象？

## 异常

Exception 和 Error 有什么区别？

Checked Exception 和 Unchecked Exception 有什么区别？

Throwable 类常用方法有哪些？

try-catch-finally 如何使用？

如何使用 try-with-resources 代替 try-catch-finally？

如何使用 try-with-resources 代替 try-catch-finally？

## 泛型

什么是泛型？有什么作用？

泛型的使用方式有哪几种？

## 反射

什么是反射

反射的优缺点

反射的应用场景

## 注解

什么是注解

注解有哪些解析方法

## SPI

什么是 SPI

SPI 和 API 有什么区别

## 序列化

什么是序列化？什么是反序列化？

如果有些字段不想进行序列化怎么办？

常见序列化协议有哪些？

为什么不推荐使用 JDK 自带的序列化？

## 工具类

### String

> String 类能被继承吗？
>
> String，StringBuffer，StringBuilder 的区别。

String 类不能被继承。因为其被 final 修饰，所以无法被继承。

StringBuffer，StringBuilder 拼接字符串，使用 append 比 String 效率高。因为 String 会隐式 new String 对象。

StringBuffer 主要方法都用 synchronized 修饰，是线程安全的；而 StringBuilder 不是。

## 面向对象

> 抽象类和接口的区别？
>
> 类可以继承多个类么？接口可以继承多个接口么？类可以实现多个接口么？

类只能继承一个类，但是可以实现多个接口。接口可以继承多个接口。

> 继承和聚合的区别在哪？

一般，能用聚合就别用继承。

## 反射

### ⭐ 创建实例

> 反射创建实例有几种方式？

通过反射来创建实例对象主要有两种方式：

- 用 `Class` 对象的 `newInstance` 方法。
- 用 `Constructor` 对象的 `newInstance` 方法。

### ⭐ 加载实例

> 加载实例有几种方式？
>
> Class.forName("className") 和 ClassLoader.laodClass("className") 有什么区别？

- `Class.forName("className")` 加载的是已经初始化到 JVM 中的类。
- `ClassLoader.loadClass("className")` 装载的是还没有初始化到 JVM 中的类。

### ⭐⭐ 动态代理

> 动态代理有几种实现方式？有什么特点？
>
> JDK 动态代理和 CGLIB 动态代理有什么区别？

（1）JDK 方式

代理类与委托类实现同一接口，主要是通过代理类实现 `InvocationHandler` 并重写 `invoke` 方法来进行动态代理的，在 `invoke` 方法中将对方法进行处理。

JDK 动态代理特点：

- 优点：相对于静态代理模式，不需要硬编码接口，代码复用率高。
- 缺点：强制要求代理类实现 `InvocationHandler` 接口。

（2）CGLIB

CGLIB 底层，其实是借助了 ASM 这个强大的 Java 字节码框架去进行字节码增强操作。

CGLIB 动态代理特点：

优点：使用字节码增强，比 JDK 动态代理方式性能高。可以在运行时对类或者是接口进行增强操作，且委托类无需实现接口。

缺点：不能对 `final` 类以及 `final` 方法进行代理。

## JDK8

## 其他

### ⭐ hashcode

> 有`==`运算符了，为什么还需要 equals 啊？
>
> 说一说你对 java.lang.Object 对象中 hashCode 和 equals 方法的理解。在什么场景下需
> 要重新实现这两个方法。
>
> 有没有可能 2 个不相等的对象有相同的 hashcode

（1）有`==`运算符了，为什么还需要 equals 啊？

equals 等价于`==`,而`==`运算符是判断两个对象是不是同一个对象，即他们的**地址是否相等**。而覆写 equals 更多的是追求两个对象在**逻辑上的相等**，你可以说是**值相等**，也可说是**内容相等**。

（2）说一说你对 java.lang.Object 对象中 hashCode 和 equals 方法的理解。在什么场景下需
要重新实现这两个方法。

在集合查找时，hashcode 能大大降低对象比较次数，提高查找效率！

（3）有没有可能 2 个不相等的对象有相同的 hashcode

有可能。

- 如果两个对象 equals，Java 运行时环境会认为他们的 hashcode 一定相等。
- 如果两个对象不 equals，他们的 hashcode 有可能相等。
- 如果两个对象 hashcode 相等，他们不一定 equals。
- 如果两个对象 hashcode 不相等，他们一定不 equals。

## 参考资料

- **书籍**
  - [《Java 并发编程实战》](https://book.douban.com/subject/10484692/)
  - [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
  - [《深入理解 Java 虚拟机》](https://book.douban.com/subject/34907497/)
- **文章**
  - [Java 线程面试题 Top 50](http://www.importnew.com/12773.html)
  - [Java 多线程和并发基础面试问答](http://ifeve.com/java-multi-threading-concurrency-interview-questions-with-answers/)
  - [进程和线程关系及区别](https://blog.csdn.net/yaosiming2011/article/details/44280797)
  - [JavaThread Methods and Thread States](https://www.w3resource.com/java-tutorial/java-threadclass-methods-and-threadstates.php)
  - [Java 线程的 5 种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
  - [Java 中守护线程的总结](https://blog.csdn.net/shimiso/article/details/8964414)
  - [Java 创建线程的三种方式及其对比](https://blog.csdn.net/longshengguoji/article/details/41126119)
  - [Java 线程的 5 种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
  - [Java 线程方法 join 的简单总结](https://www.cnblogs.com/lcplcpjava/p/6896904.html)
  - [Java 并发编程：线程间协作的两种方式：wait、notify、notifyAll 和 Condition](http://www.cnblogs.com/dolphin0520/p/3920385.html)
  - [Java 并发编程：volatile 关键字解析](http://www.cnblogs.com/dolphin0520/p/3920373.html)
  - [Java 并发编程：Callable、Future 和 FutureTask](http://www.cnblogs.com/dolphin0520/p/3949310.html)
  - [Java 并发编程：线程池的使用](http://www.cnblogs.com/dolphin0520/p/3932921.html)
  - [Java 并发编程](https://www.jianshu.com/p/0256c2995cec)