---
title: Java 容器面试一
date: 2024-07-03 07:44:02
order: 4
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
  - 容器
permalink: /pages/640f919f/
---

# Java 容器面试一

## Java 容器简介

### 【简单】Java 中有哪些集合类？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：容器 / 集合体系

#### 💎 关键结论

Java 容器位于 `java.util`，分 **Collection**（List/Set/Queue）和 **Map** 两大体系。选型口诀：要顺序可重复用 List，要唯一用 Set，要排队用 Queue，要键值用 Map；并发场景选 `java.util.concurrent`。

#### ⚡记忆卡片
- **口诀**：List 有序可重，Set 唯一无序，Queue 排队进出，Map 键值成对
- **关键词**：Collection／Map／并发包
- **链路**：Collection → List/Set/Queue → ArrayList/HashSet/ArrayDeque；Map → HashMap/TreeMap/ConcurrentHashMap

#### 📖 核心知识

![](https://raw.githubusercontent.com/dunwu/images/master/cs/java/javacore/container/java-container-structure.png)

1. **Collection 与 Map 两大体系**：Collection 存储独立元素，Map 存储键值对。
2. **List（有序、可重复）**：
   - **ArrayList**：基于 `Object[]` 动态数组，查询快，增删慢
   - **LinkedList**：基于**双链表**（JDK 1.6 前是循环链表，1.7 取消循环），增删快，查询慢
   - **Vector**：线程安全的 `Object[]` 动态数组（已过时，推荐 `ArrayList` + `Collections.synchronizedList`）
3. **Set（无序、不可重复）**：
   - **HashSet**：基于 `HashMap` 实现，不保证顺序
   - **LinkedHashSet**：基于 `LinkedHashMap`，维护**插入顺序**
   - **TreeSet**：基于 `TreeMap`，支持**自然排序**或**自定义 `Comparator`**
4. **Queue（队列，FIFO 或优先级）**：
   - **ArrayDeque**：基于动态数组，实现**栈和队列**
   - **PriorityQueue**：基于堆，**优先级队列**（按 `Comparator` 排序）
   - **LinkedList**：也可作为队列/双端队列
5. **Map（键值对存储）**：
   - **HashMap**：基于哈希表，**无序**，查找高效（最常用）
   - **LinkedHashMap**：继承 `HashMap`，额外维护**双向链表**，保持**插入顺序**或**访问顺序**
   - **TreeMap**：基于红黑树，**键有序**（自然排序或 `Comparator`）
   - **Hashtable**：线程安全（`synchronized` 修饰方法），但性能差，已被 `ConcurrentHashMap` 取代
   - **ConcurrentHashMap**：分段锁（JDK 7）或 CAS + `synchronized`（JDK 8+），高并发优化

::: details 工具类与线程安全分类

- **Collections**：提供集合操作（排序、查找、同步化等）
- **Arrays**：提供数组操作（排序、二分查找等）
- **Stream（Java 8+）**：支持函数式编程的流式处理

**关键区别**：

| 类型      | 特点           | 主要实现类                            |
| --------- | -------------- | ------------------------------------- |
| **List**  | 有序、可重复   | `ArrayList`、`LinkedList`             |
| **Set**   | 无序、不可重复 | `HashSet`、`LinkedHashSet`、`TreeSet` |
| **Queue** | 队列/栈        | `ArrayDeque`、`PriorityQueue`         |
| **Map**   | 键值对         | `HashMap`、`LinkedHashMap`、`TreeMap` |

**线程安全**：

- 单线程：`ArrayList`、`HashMap`
- 多线程：`ConcurrentHashMap`、`CopyOnWriteArrayList`
- 包装同步：`Collections.synchronizedList/synchronizedMap`
:::

#### 🔬 扩展知识
::: details
- 【L3】不可变集合：`Collections.unmodifiableList` 只是原集合的只读**视图**（原集合变更会反映到视图）；Java 9 的 `List.of`/`List.copyOf` 才是真正不可变的独立集合（拷贝后与原集合无关）。
- 【L4】版本演进：JDK 1.0 的 Vector/Hashtable → JDK 1.2 集合框架（Collections Framework，引入 Iterator 体系）→ Java 8 Stream 集成 → Java 9 不可变集合工厂 → JDK 21 Sequenced Collections。
:::

#### 🔀 发散问题
- **Q：为什么 Map 不继承 Collection？** → Map 是键值对语义，无法自然融入元素级迭代模型；两者通过 `entrySet()`/`keySet()`/`values()` 桥接，`values()` 返回的 Collection 视图与 Map 联动。
- **Q：Vector 和 ArrayList 如何选？** → 一律优先 ArrayList；需要线程安全时用 `Collections.synchronizedList` 或 `CopyOnWriteArrayList`，Vector 方法级 `synchronized` 锁粒度太粗。

### 【中等】什么是序列集合（Sequenced Collections）？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：容器 / Sequenced Collections

#### 💎 关键结论

序列集合是 **JDK 21** 引入的接口体系（SequencedCollection/SequencedSet/SequencedMap），为有明确顺序的集合统一了首尾访问 API（`first()`/`last()`/`addFirst()`/`reversed()` 等），消除了不同集合取首尾元素方式不一致的问题。

#### ⚡记忆卡片
- **口诀**：21 序列三接口，首尾增删全统一，reversed 视图逆序看
- **关键词**：JDK 21／first-last／reversed
- **链路**：SequencedCollection → SequencedSet / Deque；SequencedMap 独立成支

#### 📖 核心知识

1. **问题背景**：JDK 21 之前，获取集合"第一个/最后一个"元素没有统一方式：

```java
// JDK 21 之前：不同集合获取最后一个元素的方式各不相同
list.get(list.size() - 1);           // List
treeSet.last();                       // TreeSet
linkedHashSet.stream().skip(n-1);     // LinkedHashSet（无直接方法）
deque.getLast();                      // Deque
```

2. **JDK 21 新增三个接口**：

| 接口                     | 继承关系                           | 说明                       |
| :----------------------- | :--------------------------------- | :------------------------- |
| `SequencedCollection<E>` | `Collection<E>`                    | 有序集合基类，提供首尾访问 |
| `SequencedSet<E>`        | `Set<E>`, `SequencedCollection<E>` | 有序集合（不重复）         |
| `SequencedMap<K,V>`      | `Map<K,V>`                         | 有序 Map                   |

3. **核心统一方法**：

```java
// SequencedCollection 统一接口
E first();                    // 获取第一个元素
E last();                     // 获取最后一个元素
SequencedCollection<E> reversed();  // 返回逆序视图
void addFirst(E e);           // 添加到头部
void addLast(E e);            // 添加到尾部
E removeFirst();              // 删除第一个
E removeLast();               // 删除最后一个

// 实际使用
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
list.first();    // "A"
list.last();     // "C"
list.reversed(); // ["C", "B", "A"]（逆序视图，非拷贝）
```

4. **实现类支持**：

| 集合类型                   | 实现接口              |
| :------------------------- | :-------------------- |
| `ArrayList`、`LinkedList`  | `SequencedCollection` |
| `LinkedHashSet`、`TreeSet` | `SequencedSet`        |
| `LinkedHashMap`、`TreeMap` | `SequencedMap`        |
| `ArrayDeque`               | `SequencedCollection` |

5. **设计意义**：统一了 `List`、`Set`、`Deque`、`Map` 等有序集合的首尾访问 API，消除了因集合类型不同而导致的 API 不一致问题。

#### 🔬 扩展知识
::: details
- 【L3】`reversed()` 返回的是逆序**视图**而非拷贝，修改视图会反映到原集合，且视图可再次 `reversed()` 还原。
- 【L3】`Deque` 被改造为继承 `SequencedCollection`，`SortedSet`/`SortedMap` 被改造为继承 `SequencedSet`/`SequencedMap`，`TreeSet.first()` 等方法即来源于此体系。
- 【L4】版本演进：JDK 1.2 引入 SortedSet.last() → JDK 6 LinkedHashSet 仍无尾元素访问 → JDK 21（JEP 431）以 Sequenced Collections 统一。注意 JDK 21 是正式特性（非预览）。
:::

#### 🔀 发散问题
- **Q：HashSet/HashMap 能用 first() 吗？** → 不能。它们无序，未实现 Sequenced 接口；只有 LinkedHashSet、TreeSet、LinkedHashMap、TreeMap 等有序实现支持。
- **Q：`List.of()` 返回的不可变 List 支持这些方法吗？** → 支持 `first()`/`last()`/`reversed()`，但 `addFirst()`/`removeLast()` 等写操作会抛 `UnsupportedOperationException`。

### 【简单】Comparable 和 Comparator 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：容器 / 排序

#### 💎 关键结论

Comparable 是类自己实现的"自然排序"（内部 `compareTo`），Comparator 是外部提供的"比较策略"（`compare(o1, o2)`）。类有唯一自然顺序且可改源码用 Comparable；多排序维度或不可改源码时用 Comparator。

#### ⚡记忆卡片
- **口诀**：Comparable 自己比，Comparator 别人比
- **关键词**：自然排序／外部比较器／java.lang vs java.util
- **链路**：Comparable.compareTo → Collections.sort(list)；Comparator.compare → Collections.sort(list, c)

#### 📖 核心知识

`Comparable` 和 `Comparator` 都是 Java 中用于排序的接口，通常配合使用，为对象提供灵活多样的排序能力：

- **Comparable** → "我能比较"（类自己实现的比较能力）
- **Comparator** → "比较器"（外部提供的比较工具）

1. **核心对比**：

| 特性             | Comparable               | Comparator                           |
| ---------------- | ------------------------ | ------------------------------------ |
| **包位置**       | java.lang                | java.util                            |
| **接口方法**     | compareTo(T o)           | compare(T o1, T o2)                  |
| **排序逻辑位置** | 定义在要排序的类内部     | 定义在单独的类或匿名类中             |
| **使用场景**     | 类的"自然排序"           | 多种排序方式或无法修改类时的排序     |
| **调用方式**     | `Collections.sort(list)` | `Collections.sort(list, comparator)` |
| **影响范围**     | 修改类的原始定义         | 不修改原有类                         |

2. **Comparable 实现**：需修改类本身，实现 `compareTo()`（如 String 按字母顺序、Integer 按数值大小是自然排序）：

```java
class Person implements Comparable<Person> {
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age); // 用 Integer.compare 避免减法溢出
    }
}
```

3. **Comparator 实现**：独立实现，通常用匿名类或 lambda：

```java
Comparator<Person> byName = (p1, p2) -> p1.getName().compareTo(p2.getName());
```

4. **选型**：类有明确自然排序标准、能改源码、只需一种主要排序 → Comparable；需要多种排序方式、不能改源码（第三方类）或临时规则 → Comparator。

5. **Java 8+ 便利方法**：

```java
// 多级排序
Comparator<Person> comparator =
    Comparator.comparing(Person::getLastName)
              .thenComparing(Person::getFirstName);

// 逆序排序
Comparator<Person> reverseAge =
    Comparator.comparingInt(Person::getAge).reversed();
```

#### 🔬 扩展知识
::: details
- 【L3】约定：`compareTo` 结果应与 `equals` 一致（`(a.compareTo(b) == 0) == a.equals(b)`），否则 TreeSet/TreeMap 行为会偏离 Set/Map 契约（Javadoc 称之为 "strongly recommended"）。
- 【L3】`return a - b` 式比较器在数值接近 int 边界时会溢出（如 `Integer.MIN_VALUE` 参与比较），应使用 `Integer.compare(a, b)`。
- 【L4】Java 16 的 record 会自动按组件声明顺序实现 Comparable；Comparator 还提供 `nullsFirst`/`nullsLast` 处理含 null 的排序。
:::

#### 🔀 发散问题
- **Q：TreeSet 排序时用的是哪个？** → 优先用构造器传入的 Comparator；没有则要求元素实现 Comparable，否则抛 `ClassCastException`。
- **Q：compareTo 返回值的含义？** → 负数表示当前对象小于参数对象，0 表示相等，正数表示大于；具体数值大小无意义，只看符号。

### 【中等】什么是 ConcurrentModificationException？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：容器 / 迭代器

#### 💎 关键结论

ConcurrentModificationException 是用迭代器遍历集合时，检测到集合被结构性修改（增删）抛出的运行时异常，是 fail-fast 机制的体现。底层靠迭代器的 `expectedModCount` 与集合 `modCount` 比对，不一致立即抛出。

#### ⚡记忆卡片
- **口诀**：边遍历边改结构，modCount 对不上就抛
- **关键词**：modCount／expectedModCount／fail-fast
- **链路**：集合修改 modCount++ → 迭代器 next() 检查 → 不一致抛 CME

#### 📖 核心知识

1. **是什么**：使用**迭代器**遍历集合时，检测到集合被**意外修改**而抛出的运行时异常。
2. **底层机制**：迭代器内部维护计数器 **`expectedModCount`**（期望修改次数），与集合的 **`modCount`**（实际修改次数）比较。每次结构性修改集合时 `modCount++`，迭代器每次操作检查两者是否一致，不一致立即抛出异常。
3. **什么时候发生**：迭代器创建后，集合被**非迭代器方式**修改结构（增删）：

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

// 错误示例 1：遍历时直接修改集合
for (String item : list) {  // 底层使用迭代器
    if ("B".equals(item)) {
        list.remove(item); // 抛出 ConcurrentModificationException
    }
}

// 错误示例 2：迭代器创建后通过其他方式修改
Iterator<String> it = list.iterator();
list.add("D");  // 结构被修改
it.next();      // 此处抛出异常
```

4. **如何避免**：单线程优先使用 `removeIf()` 或 `Iterator.remove()`；多线程必须使用并发集合或显式同步。

::: details 示例：用迭代器删除元素（标准方式）

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    if ("B".equals(item) || "C".equals(item)) {
        iterator.remove(); // ✔️ 通过迭代器安全删除
    }
}
// list = ["A", "D"]
```
:::

::: details 示例：Java 8+ 的 removeIf（最简洁）

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
// 单行完成过滤
list.removeIf(item -> item.startsWith("B") || item.equals("C")); // ✔️
// list = ["A", "D"]
```
:::

#### 🔬 扩展知识
::: details
- 【L3】`ArrayList` 迭代器 `remove()` 内部会同步更新 `expectedModCount = modCount`，因此通过迭代器删除不会触发 fail-fast。
- 【L3】`modCount` 只在结构性修改（add/remove/clear）时递增，`set()` 替换元素不改变 `modCount`，因此遍历中 `set` 不会抛 CME。
- 【L4】fail-fast 是**尽力检测**而非同步机制：`checkForComodification` 没有内存屏障，多核下不保证一定能检测到并发修改；`ConcurrentHashMap` 等并发容器的迭代器是弱一致的，不抛 CME。
:::

#### 🔀 发散问题
- **Q：增强 for 循环中删除元素为什么会抛异常？** → 增强 for 底层就是迭代器，直接调用 `list.remove()` 改变了 `modCount`，下次 `next()` 检查即抛 CME；可用 `iterator.remove()` 或 `removeIf` 代替。
- **Q：Map 遍历中删除怎么办？** → 用 `map.entrySet().removeIf(...)` 或 entrySet 迭代器的 `remove()`。

## List

### 【简单】ArrayList 可以添加 null 值吗？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：List / ArrayList

#### 💎 关键结论

可以。ArrayList 底层是 `Object[]`，允许添加任意个 `null`（含重复）。但取值时要判空防 NPE，且 HashSet 只允许 1 个 null、TreeSet 自然排序下加 null 会抛 NPE、Hashtable 禁止 null 键值。

#### ⚡记忆卡片
- **口诀**：ArrayList 随便放 null，TreeSet 自然排序不放，Hashtable 键值都不放
- **关键词**：Object[]／NullPointerException／容器 null 策略
- **链路**：add(null) 存入 elementData → get(i) 可能为 null → 调用方法前判空

#### 📖 核心知识

1. **支持 null**：`ArrayList` 底层基于 `Object[]` 数组，天然支持 `null`，可添加任意数量（含重复）。
2. **风险：NullPointerException**：`list.get(0).length()` 之类直接调用会报错；`contains(null)` 或遍历时需注意判空。
3. **慎用场景**：数据库映射（ORM）、JSON 序列化工具可能对 `null` 有特殊限制。
4. **与其他容器对比**：

| 容器             | null 策略                                            |
| ---------------- | ---------------------------------------------------- |
| `ArrayList`      | 允许任意个 null                                      |
| `HashSet`        | 允许 1 个 null                                       |
| `TreeSet`        | 自然排序下添加 null 抛 `NullPointerException`        |
| `HashMap`        | 允许 null 键和值                                     |
| `Hashtable`      | 禁止 null 键和值                                     |
| `ConcurrentHashMap` | 禁止 null 键和值（避免二义性）                    |

5. **建议**：明确是否需要 `null`，避免滥用；必要时用 `Optional` 或默认值替代。

### 【简单】ArrayList 如何扩容？⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：List / ArrayList

#### 💎 关键结论

元素数达到容量时触发 `grow()` 扩容：新容量 = 旧容量 + 旧容量一半（**1.5 倍**），再用 `Arrays.copyOf` 拷贝。单次 add 最坏 O(n)，摊还 O(1)。1.5 倍是空间浪费（约 33%）与扩容次数的经验折中。

#### ⚡记忆卡片
- **口诀**：满则扩，一倍半，copyOf 搬迁，摊还 O(1)
- **关键词**：grow()／1.5×／Arrays.copyOf
- **链路**：add → ensureCapacityInternal → grow → newCapacity = old + old >> 1 → Arrays.copyOf

#### 📖 核心知识

1. **扩容时机与幅度**：ArrayList 默认初始容量为 10（JDK 8+ 懒初始化，首次 add 时分配），元素数达到容量时触发扩容，每次扩容为原容量的 1.5 倍。
2. **扩容关键代码**：

```java
private void grow(int minCapacity) { // minCapacity = 当前size + 1
    int oldCapacity = elementData.length;

    // 关键：新容量 = 旧容量 + 旧容量的一半（1.5倍扩容）
    int newCapacity = oldCapacity + (oldCapacity >> 1);

    // 特殊情况处理
    if (newCapacity - minCapacity < 0)  // 新容量仍不够
        newCapacity = minCapacity;       // 直接使用所需容量
    if (newCapacity - MAX_ARRAY_SIZE > 0)  // 超过最大限制
        newCapacity = hugeCapacity(minCapacity);

    // 核心：创建新数组并拷贝数据
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

3. **为什么扩容因子是 1.5 倍 —— 空间与时间的博弈**：

**（1）摊还分析：`add()` 为什么是 O(1）？**

单次 `add(E)` 最坏情况下触发扩容，需要 `Arrays.copyOf` 拷贝整个数组（O(n)），但**摊还**复杂度是 O(1)：

- 假设初始容量为 1，每次扩容 k 倍（k > 1），连续添加 n 个元素
- 扩容次数 ≈ logₖ(n)，第 i 次扩容拷贝元素数 ≈ kⁱ
- 总拷贝次数：\(1 + k + k^2 + \dots + n = \frac{k \cdot n - 1}{k - 1} \approx O(n)\)
- 摊还到每个元素：\(O(1)\)

所以面试中「ArrayList add 时间复杂度」的标准答案是：**最坏 O(n），摊还 O(1）**。

**（2）1.5 倍 vs 2 倍：空间浪费的定量分析**

| 扩容因子 | 最坏空间浪费 | 典型实现    | 扩容次数（n=100 万） |
| :------- | :----------- | :---------- | :------------------- |
| 2.0×     | 50%          | Vector      | ≈ 20 次              |
| 1.5×     | ~33%         | ArrayList   | ≈ 34 次              |
| 1.2×     | ~17%         | Python list | ≈ 76 次              |

**Vector 用 2× 的问题**：等比数列 `1 + 2 + 4 + ... + n/2 ≈ n`，意味着之前所有已释放的旧数组空间之和 ≈ 刚扩容的大小，旧空间无法被新数组复用以容纳新容量——对内存分配器压力大，容易产生碎片。

**ArrayList 用 1.5× 的优势**：旧数组释放后可以被复用（\(1 + 1.5 + 1.5^2 + 1.5^3 \approx 8.1\)，下一次扩容需要 \(1.5^4 \approx 5.1\)，可以 fit 进之前释放的总空间），更有利于内存分配器重用堆空间，减少碎片。

**（3）经验权衡的本质**

- **2×**：扩容次数少，但单次拷贝量大 + 空间利用率低（最坏浪费 50%）
- **1.2×**：空间利用率高，但扩容频繁（log₁.₂(100 万) ≈ 76 次拷贝，对 GC 不友好）
- **1.5×**：类比 HashMap 的 0.75 load factor 设计哲学——空间浪费控制在 33% 以内，扩容次数在可接受范围，是经验上 Pareto 最优的折中

4. **实践建议**：为避免频繁扩容，根据实际情况预分配容量：

```java
ArrayList<String> list = new ArrayList<>(10000);
```

#### 🔬 扩展知识
::: details
- 【L3】源码细节：`grow()` 中 `oldCapacity >> 1` 即旧容量的一半；`MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8`，预留 8 字节给部分 JVM 的数组头（VM 实现差异）。
- 【L3】JDK 8+ `elementData` 初始为共享空数组 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`，首次 add 才分配容量 10（懒初始化）；`transient` 修饰 elementData，序列化走 `writeObject` 只写有效元素。
- 【L4】跨语言对比：Go slice 扩容策略的演变

| 版本               | 扩容策略                                                                 | 设计考量                                                   |
| :----------------- | :----------------------------------------------------------------------- | :--------------------------------------------------------- |
| **Go 1.17 及之前** | 容量 < 1024 → 2×；≥ 1024 → 1.25×                                         | 小容量激进扩展减少拷贝，大容量保守扩展控制浪费             |
| **Go 1.18+**       | 容量 < 256 → 2×；≥ 256 → (oldCap + 3×256) / 4（≈ 1.25×~1.63×，平滑过渡） | 新公式在过渡区（256~512）更平滑，避免从 2× 到 1.25× 的陡降 |
| **Java ArrayList** | 始终 1.5×                                                                | 简单恒定，无容量阈值切换                                   |

Go 的策略比 Java 更激进：小容量时用 2×（快速逼近目标，减少拷贝次数），大容量时用约 1.25×~1.63×（更保守控制内存）。Java 的 1.5× 恒定策略更简单，但在小容量场景（如默认容量 10 到元素数 100）扩容次数更多。差异根因：Go 的 slice 本质上是一个 **(ptr, len, cap)** 三元组，扩容时需要新分配内存 + `memmove` 拷贝底层数组。Go 没有 JVM 的 GC 优化（TLAB、对象池），每次 `make` 都是直接的 `mallocgc` 调用，所以减少拷贝次数对 Go 的收益比 Java 更大——Java 的 `Arrays.copyOf` 可以受益于 JIT 生成的高效 memcpy 实现。
:::

#### 🔀 发散问题
- **Q：ArrayList 扩容会缩容吗？** → 不会。删除大量元素后容量不变，需手动 `trimToSize()` 收缩到当前 size。
- **Q：为什么默认初始容量是 10？** → JDK 8+ 采用懒初始化，空 ArrayList 不占 elementData 内存，首次 add 才分配 10；10 是历史沿袭的经验值。

### 【简单】ArrayList 和数组有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：List / ArrayList

#### 💎 关键结论

两者都是连续内存、O(1) 索引访问；区别在于：数组定长、可存基本类型、无泛型；ArrayList 动态扩容、只存引用类型、有泛型和丰富 API。大多数业务场景选 ArrayList，极致性能/固定长度/基本类型选数组。

#### ⚡记忆卡片
- **口诀**：数组定长存原始，ArrayList 动态带泛型
- **关键词**：固定长度／装箱／泛型
- **链路**：容量需求未知 → ArrayList → 扩容 1.5×；容量固定/基本类型 → 原生数组

#### 📖 核心知识

1. **核心对比**：

| **对比点**     | **数组 (Array)**                                   | **ArrayList**                                                                                  |
| -------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **长度可变性** | 固定长度，创建后无法调整大小                       | 动态扩容（默认扩容 1.5 倍）                                                                    |
| **存储类型**   | 支持基本类型（`int[]`）和对象类型                  | 仅支持引用类型（基本类型需装箱，如 `Integer`）                                                 |
| **内存占用**   | 更紧凑（无额外对象开销）                           | 有额外内存开销（记录大小、扩容预留空间等）                                                     |
| **访问方式**   | 通过索引直接访问（`arr[0]`）                       | 通过 `get(index)`/`set(index)` 方法访问                                                        |
| **操作效率**   | - 查询：O(1)（极快）<br>- 增删：O(n)（需移动元素） | - 查询：O(1)（底层是数组）<br>- 增删：<br> - 尾部操作：O(1)<br> - 中间操作：O(n)（需移动元素） |
| **功能方法**   | 功能简单（依赖 `Arrays` 工具类）                   | 提供丰富方法（`add()`、`remove()`、`contains()` 等）                                           |
| **线程安全**   | 非线程安全                                         | 非线程安全（需用 `Collections.synchronizedList` 包装）                                         |
| **泛型支持**   | 不支持泛型（类型检查在运行时）                     | 支持泛型（编译时类型安全）                                                                     |

2. **小结**：
   - **动态性**：`ArrayList` 自动扩容，数组长度固定。
   - **类型支持**：数组可直接存基本类型，`ArrayList` 需包装类。
   - **性能**：数组的随机访问稍快（少一次方法调用）；`ArrayList` 的尾部插入高效，但中间插入/删除需移动元素。
   - **功能**：`ArrayList` 提供更多便捷方法（如迭代、搜索）。
   - **内存**：数组更节省内存，`ArrayList` 有额外结构开销。
3. **选型**：需极致性能、固定长度或存储基本类型时（如数学计算）选数组；需要动态大小、便捷操作或泛型安全时（大多数业务场景）选 ArrayList。

#### 🔀 发散问题
- **Q：数组和 ArrayList 的协变性有何不同？** → 数组是协变的（`Integer[]` 是 `Object[]` 的子类型），向 `Object[]` 写入错误类型在运行时抛 `ArrayStoreException`；ArrayList 的泛型是编译期检查，类型不匹配直接编译失败。
- **Q：为什么基本类型集合会有装箱开销？** → ArrayList 只能存引用类型，`int` 需装箱为 Integer；JDK 提供 IntStream/LongStream/DoubleStream 等原始类型特化来规避装箱。

### 【简单】ArrayList 和 LinkedList 有什么区别？⭐⭐⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：List / ArrayList / LinkedList

#### 💎 关键结论

ArrayList 基于动态数组，随机访问 O(1)、缓存友好，绝大多数场景更优；LinkedList 基于双向链表，仅头尾操作 O(1)，中间操作仍需 O(n) 定位。除非频繁头插删或需要 Deque 语义，否则一律选 ArrayList。

#### ⚡记忆卡片
- **口诀**：数组快在连续内存，链表输在指针跳转
- **关键词**：O(1) 随机访问／Cache Line／Deque
- **链路**：结构（数组 vs 双链表）→ 访问 O(1) vs O(n) → 缓存局部性差异 → 性能数量级差距

#### 📖 核心知识

1. **核心对比**：

| **对比维度**      | **ArrayList**                                                         | **LinkedList**                                                   |
| ----------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **底层数据结构**  | 动态数组（`Object[]`）                                                | 双向链表（`Node` 节点）                                          |
| **内存占用**      | 更紧凑（连续内存）                                                    | 更高（每个元素需额外存储前后节点指针）                           |
| **随机访问性能**  | ⚡ **O(1)**（通过索引直接访问）                                       | 🐢 **O(n)**（需遍历链表）                                        |
| **插入/删除性能** | - 尾部操作：⚡ **O(1)**<br>- 中间/头部操作：🐢 **O(n)**（需移动元素） | - 头尾操作：⚡ **O(1)**<br>- 中间操作：🐢 **O(n)**（需遍历定位） |
| **适用场景**      | - 频繁随机访问<br>- 数据量稳定或尾部操作多                            | - 频繁头尾插入/删除<br>- 数据动态性强                            |
| **额外功能**      | 仅基础列表操作                                                        | 实现了 `Deque` 接口（可作队列/栈使用）                           |
| **空间局部性**    | ✔️ 更好（CPU 缓存友好）                                               | ❌ 较差（节点分散存储）                                           |

2. **对比小结**：
   - **访问速度**：`ArrayList` 随机访问极快（数组索引 O(1)），`LinkedList` 需遍历链表（O(n)）。
   - **增删效率**：`ArrayList` 尾部插入快，中间/头部插入慢（需移动元素）；`LinkedList` 头尾插入快（O(1)），中间插入仍需遍历定位（O(n)）。
   - **内存开销**：`LinkedList` 每个元素多消耗 2 个指针空间（前驱+后继）。
   - **功能扩展**：`LinkedList` 支持队列/栈操作（如 `addFirst()`、`pollLast()`）。
3. **选型建议**：优先用 **`ArrayList`**（大多数场景性能更优）；仅当需要频繁在**头部/中间插入删除**，或需要**队列/栈功能**时选 `LinkedList`（队列场景更推荐 ArrayDeque）。

::: details 硬件视角：CPU Cache Line 如何让 ArrayList 比 LinkedList 快一个数量级

**（1）Cache Line 与空间局部性**

现代 x86 CPU 的 Cache Line 为 **64 字节**。CPU 预取器（Prefetcher）在访问一个内存地址时，会将包含该地址的整个 Cache Line 加载到 L1/L2 缓存中。

```
ArrayList 内存布局（连续数组）：
[obj0][obj1][obj2][obj3][obj4][obj5][obj6][obj7]...
← 一次 Cache Line 加载 64 字节 →
  一次加载可以预取 4~8 个引用（取决于是否压缩指针）

LinkedList 内存布局（分散节点）：
[Node0 @ 0x1000]  [Node1 @ 0x8000]  [Node2 @ 0x3500]...
每个 Node 包含 item(引用) + prev(引用) + next(引用) = 24 字节（压缩指针）/ 40 字节（非压缩）
每个 Node 访问都可能触发 Cache Miss（L1 miss ≈ 10 cycles, L3 miss ≈ 40 cycles, RAM ≈ 100+ cycles）
```

**（2）量化性能差异**

| 操作         | ArrayList                                | LinkedList                                    | 性能比                          |
| :----------- | :--------------------------------------- | :-------------------------------------------- | :------------------------------ |
| **顺序遍历** | 每个元素约 0.5 ns（Cache Line 预取命中） | 每个元素 5~20 ns（节点分散，Cache Miss 频繁） | **10~40×**                      |
| **随机访问** | O(1)，约 0.5 ns                          | O(n)，约 n × (5~20) ns                        | **n × 10~40×**                  |
| **中间插入** | O(n)，批量 memmove                       | O(n)，逐个节点遍历                            | **1~3×**（memmove 受益于 SIMD） |

> **关键洞察**：顺序遍历 ArrayList 比 LinkedList 快 10~50 倍，这不是 Java 的问题，而是**所有语言的数组 vs 链表都遵循的硬件定律**。即使是 C++ 中精心实现的 `std::list`，在顺序遍历场景下性能也被 `std::vector` 碾压。这就是为什么 Java 面试中"LinkedList 增删快"的说法在大多数场景下是**错误**的——定位到插入位置需要 O(n) 遍历，而遍历本身就是瓶颈。

**（3）Memory Bandwidth 饱和度**

ArrayList 的连续内存访问能充分利用 CPU 的 Memory Bandwidth（现代 DDR5 约 50 GB/s），一次 Cache Line 加载可预取多个元素。LinkedList 的随机跳转使得 CPU 预取器失效，Memory Bandwidth 利用率极低（大量带宽浪费在只加载一个 Node 就丢弃整个 Cache Line 上）。

**一句话总结**：`ArrayList` vs `LinkedList` 的选择不是"差不多"，而是**数量级的性能差异**。只有当你确实需要在头部频繁插入/删除且不需要随机访问时，才考虑 LinkedList。

> 💡 **Java 实践提示**：
>
> - 默认情况下，`Collections.synchronizedList` 包装的 `ArrayList` 比 `LinkedList` 线程安全开销更低。
> - Java 8+ 的 `Stream` 操作在 `ArrayList` 上效率更高。
:::

#### 🔬 扩展知识
::: details
- 【L3】`LinkedList.get(i)` 由内部 `node(int index)` 定位：从离 index 更近的一端（头或尾）开始遍历，最坏仍是 O(n/2) ≈ O(n)。
- 【L3】JDK 1.6 的 LinkedList 是循环双向链表（first.prev == last），JDK 1.7 改为非循环，减少边界判断、降低内存占用。
- 【L4】栈/队列场景的现代替代：JDK 官方推荐用 `ArrayDeque` 替代 LinkedList 作栈/队列（无节点分配开销，缓存更友好）。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "LinkedList 增删一定比 ArrayList 快" → 只有已知节点位置（如迭代器持有位置）时删除才是 O(1)；实际按索引操作需先 O(n) 定位，整体仍是 O(n)。
- ❌ "两者性能差不多，随便选" → 顺序遍历 ArrayList 可快 10 倍以上（Cache Line 局部性差异），大多数基准测试中 ArrayList 全面占优。
:::

#### 🔀 发散问题
- **Q：为什么教科书说 LinkedList 适合频繁增删？** → 前提是"已持有迭代器位置"时插入删除为 O(1)；若每次都要先按索引定位，O(n) 定位就是瓶颈。
- **Q：作为栈使用选谁？** → 优先 `ArrayDeque`（见本文档「ArrayDeque 与 LinkedList 有什么区别？」），其次 LinkedList，不要用 Stack。

### 【中等】CopyOnWriteArrayList 的原理是什么？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：并发 / CopyOnWriteArrayList

#### 💎 关键结论

CopyOnWriteArrayList 用"写时复制"（CoW）实现线程安全：读无锁（volatile 数组保证可见性），写时加 ReentrantLock、拷贝新数组、在新数组修改后替换引用。读完全不受写阻塞，适合**读多写少**的并发场景。

#### ⚡记忆卡片
- **口诀**：读无锁，写复制，volatile 保可见，读多写少才划算
- **关键词**：CoW／volatile／ReentrantLock
- **链路**：写请求 → 加锁 → Arrays.copyOf 复制 → 修改新数组 → 替换 array 引用（volatile 写）

#### 📖 核心知识

1. **核心思想**："写时复制"（Copy-On-Write，CoW），适用于【读多写少】的高并发场景。
2. **内部结构**：维护一个 `volatile` Object 数组（`Object[] array`），`volatile` 保证并发可见性。
3. **读操作**：直接读 volatile 数组，无需加锁，可见性由 volatile 保证。
4. **写操作**（add/set/remove）核心步骤：
   1. 加锁（`ReentrantLock`）
   2. `Arrays.copyOf` 复制新数组（长度 ±1）
   3. 在新数组上修改
   4. 替换原数组引用

::: details 案例：监听器/配置缓存场景

注册中心监听器列表、页面配置缓存这类读远多于写的结构，读操作完全无锁、无 CAS 开销；每次写（注册/更新监听器）低频发生，复制数组的代价可以忽略，吞吐量显著高于 `Collections.synchronizedList`。
:::

#### 🔬 扩展知识
::: details
- 【L3】迭代器创建时持有当前数组快照引用，遍历期间其他线程的修改对遍历不可见，因此迭代器**不会抛 ConcurrentModificationException**，且不支持 `remove()`（抛 `UnsupportedOperationException`）。
- 【L3】写操作复制整个数组，写开销 O(n) + 双倍内存峰值；`volatile` 只保证引用替换的可见性，复合操作仍靠锁保证原子性。
- 【L4】与 `Collections.synchronizedList` 对比：后者读写都加锁，读多写少场景吞吐低于 CoW；写多场景 CoW 频繁复制反而更慢。与 `ReadWriteLock` 方案对比：CoW 读零开销但牺牲一致性（快照读）。
:::

#### 🏭 实战场景
::: details

典型生产用法是配置/监听器缓存：服务 QPS 数万、配置推送每分钟仅 1~2 次的场景，读路径完全无锁（单次读仅一次 volatile 引用读取），P99 读延迟可稳定在微秒级；若改用 synchronizedList，每次读都要获取对象锁，高并发下锁竞争会使读延迟上升数倍。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "CopyOnWriteArrayList 是万能的并发 List" → 写频繁时每次写都复制整个数组且加锁，开销高于 synchronizedList；写多场景应考虑其他方案。
- ❌ "读能拿到最新数据" → 迭代器读的是快照，不保证看到其他线程的最新写入（弱一致性），需实时一致性时要额外协调。
:::

#### 🔀 发散问题
- **Q：什么场景不适合 CopyOnWriteArrayList？** → 写多读少（复制开销大）、对内存敏感（写时双份数组）、要求读到最新数据的强一致场景。
- **Q：和 ConcurrentHashMap 的设计哲学差异？** → CHM 用 CAS + synchronized 细粒度锁做原地更新（强一致、读写均衡）；CoW 用整体复制换读无锁（快照读、读多写少）。

### 【中等】RandomAccess 接口有什么用？⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：List / RandomAccess

#### 💎 关键结论

RandomAccess 是无方法的**标记接口**，标识集合支持 O(1) 快速随机访问，供泛型算法选择遍历策略：实现它（如 ArrayList）用索引遍历，未实现（如 LinkedList）用迭代器遍历，避免 O(n²) 级别的性能陷阱。

#### ⚡记忆卡片
- **口诀**：标记接口无方法，随机访问看它判断
- **关键词**：标记接口／instanceof／遍历策略
- **链路**：泛型算法 → instanceof RandomAccess → 索引遍历 or 迭代器遍历

#### 📖 核心知识

1. **定位**：`RandomAccess` 是一个**标记接口**（无方法），用于标识实现类支持**快速随机访问**。
2. **核心作用**：
   - **算法优化提示**：泛型算法可根据是否实现该接口选择不同遍历策略。
   - **不强制约束**：纯标记，编译器不检查，由开发者自觉遵守。
3. **常见实现类**：

| **实现 RandomAccess**                     | **未实现**                                       |
| ----------------------------------------- | ------------------------------------------------ |
| `ArrayList`                               | `LinkedList`                                     |
| `Vector`                                  | `LinkedList`（链表）                             |
| `Arrays.asList` 返回的 `Arrays$ArrayList` | `CopyOnWriteArrayList`（实际上是数组，但未标记） |

4. **最佳实践**：

```java
// 根据 RandomAccess 选择遍历方式
public <T> void process(List<T> list) {
    if (list instanceof RandomAccess) {
        // 索引遍历（O(1) 随机访问）
        for (int i = 0; i < list.size(); i++) {
            handle(list.get(i));
        }
    } else {
        // 迭代器遍历（避免 O(n) 的 get(i)）
        for (T item : list) {
            handle(item);
        }
    }
}
```

5. **性能对比**：

```java
// ArrayList：索引遍历快（直接数组访问）
for (int i = 0; i < arrayList.size(); i++) { arrayList.get(i); }  // 快

// LinkedList：索引遍历极慢（每次 get(i) 需遍历到 i）
for (int i = 0; i < linkedList.size(); i++) { linkedList.get(i); }  // O(n²)，慢 100 倍
```

#### 🔬 扩展知识
::: details
- 【L3】JDK 的 `Collections.binarySearch`/`sort` 等算法内部就用 `instanceof RandomAccess` 分流：随机访问列表用索引二分，链表则用迭代器顺序扫描。
- 【L4】标记接口是 JDK 的经典模式（同类还有 Serializable、Cloneable），用类型本身携带元信息；现代设计更倾向用注解替代，但 JDK 为兼容保留。
:::

#### 🔀 发散问题
- **Q：为什么 CopyOnWriteArrayList 不实现 RandomAccess？** → 它底层确实是数组、get(i) 也是 O(1)，但 JDK 未标记，官方注释无明确解释；实践中若算法依赖该标记分流，对其会退化为迭代器遍历（结果仍然正确）。

### 【中等】Iterator 和 Iterable 有什么区别？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：容器 / 迭代器

#### 💎 关键结论

Iterable 表示"可被迭代"的容器，提供 `iterator()` 返回迭代器，是 foreach 的前提；Iterator 是迭代器本身，用 `hasNext()/next()` 遍历并记录当前位置。每次调用 Iterable 的 `iterator()` 都应返回新的独立迭代器。

#### ⚡记忆卡片
- **口诀**：Iterable 能遍历，Iterator 在遍历
- **关键词**：foreach／iterator()／hasNext-next
- **链路**：foreach → Iterable.iterator() → Iterator.hasNext()/next()

#### 📖 核心知识

1. **接口定义**：

```java
// Iterable：可迭代的能力（foreach 支持）
public interface Iterable<T> {
    Iterator<T> iterator();           // 返回迭代器
    default void forEach(Consumer<? super T> action) { ... }  // Java 8+
    default Spliterator<T> spliterator() { ... }               // Java 8+
}

// Iterator：迭代器本身（遍历能力）
public interface Iterator<E> {
    boolean hasNext();
    E next();
    default void remove() { throw new UnsupportedOperationException(); }
    default void forEachRemaining(Consumer<? super E> action) { ... }
}
```

2. **核心区别**：

| **维度**    | **Iterable**                      | **Iterator**                    |
| ----------- | --------------------------------- | ------------------------------- |
| **职责**    | 可迭代的容器                      | 迭代器（遍历工具）              |
| **方法**    | `iterator()` 返回迭代器           | `hasNext()`/`next()`/`remove()` |
| **关系**    | 依赖 Iterator                     | 被 Iterable 创建                |
| **foreach** | 实现此接口才能用 foreach          | 不能直接用于 foreach            |
| **状态**    | 无状态（每次调用产生新 Iterator） | 有状态（记录当前位置）          |

3. **foreach 语法糖**：

```java
// 编译前
for (String s : list) { System.out.println(s); }

// 编译后（Iterable 实现类）
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    System.out.println(s);
}
```

4. **自定义可迭代类**：

```java
public class MyCollection<T> implements Iterable<T> {
    private Object[] items;

    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private int index = 0;
            public boolean hasNext() { return index < items.length; }
            @SuppressWarnings("unchecked")
            public T next() { return (T) items[index++]; }
        };
    }
}
```

#### 🔬 扩展知识
::: details
- 【L3】Java 8 起 Iterable 增加 `forEach()`、`spliterator()` 默认方法；Spliterator（可分割迭代器）是 parallelStream 并行遍历的底层支撑。
- 【L4】设计视角：Iterable 是"迭代器工厂"——每次 `iterator()` 返回新迭代器，多个遍历互不干扰；若让集合直接实现 Iterator，只能维护一个游标，无法并发多路遍历。
:::

#### 🔀 发散问题
- **Q：只实现 Iterator 能用 foreach 吗？** → 不能，foreach 只接受数组或 Iterable 实现类；Iterator 需手动 while 循环消费。
- **Q：Spliterator 和 Iterator 的区别？** → Spliterator 支持 `trySplit()` 分割成多段并行遍历，并携带大小估计与特征值（SIZED/ORDERED 等），服务于并行流。

### 【中等】fail-fast 和 fail-safe 机制有什么区别？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：容器 / 迭代器

#### 💎 关键结论

fail-fast 用 modCount/expectedModCount 比对，遍历中检测到结构性修改立即抛 ConcurrentModificationException（java.util 系）；fail-safe 基于副本/快照遍历，不抛异常但弱一致（java.util.concurrent 系）。fail-fast 只是检测手段，不能当同步机制。

#### ⚡记忆卡片
- **口诀**：fast 比对 modCount 抛异常，safe 遍历副本看快照
- **关键词**：modCount／快照／弱一致
- **链路**：结构性修改 → modCount ≠ expectedModCount → 抛 CME；写时复制 → 迭代器持快照 → 不抛异常

#### 📖 核心知识

1. **定义**：
   - **fail-fast（快速失败）**：遍历集合时，若检测到**结构性修改**（增删），立即抛出 `ConcurrentModificationException`。
   - **fail-safe（安全失败）**：遍历时基于**集合的副本**，修改原集合不影响遍历，但可能看不到最新数据。
2. **机制对比**：

| **维度**       | **fail-fast**                            | **fail-safe**                                                            |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| **实现原理**   | 比对 `modCount` 与 `expectedModCount`    | 遍历副本/快照                                                            |
| **异常**       | 抛 `ConcurrentModificationException`     | 不抛异常                                                                 |
| **数据一致性** | 强一致（但抛异常）                       | 弱一致（可能看到旧数据）                                                 |
| **内存开销**   | 无额外开销                               | 需复制副本                                                               |
| **典型容器**   | `ArrayList`、`HashMap` 等 `java.util` 下 | `CopyOnWriteArrayList`、`ConcurrentHashMap` 等 `java.util.concurrent` 下 |

3. **fail-fast 原理**：

```java
// ArrayList 的迭代器
private class Itr implements Iterator<E> {
    int expectedModCount = modCount;  // 创建时记录

    public E next() {
        checkForComodification();  // 每次调用检查
        // ...
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

4. **fail-safe 示例**：

```java
// CopyOnWriteArrayList 遍历的是数组快照
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>(Arrays.asList("A", "B"));
Iterator<String> it = list.iterator();
list.add("C");  // 修改不影响遍历
while (it.hasNext()) {
    System.out.println(it.next());  // 输出 A, B（不含 C）
}
```

5. **注意事项**：
   - **fail-fast 不保证并发安全**：仅是**尽力检测**，不能作为同步机制。
   - **fail-safe 的代价**：内存开销大（如 `CopyOnWriteArrayList` 每次写都复制数组）。
   - **迭代器 remove**：`fail-fast` 集合的迭代器 `remove()` 会同步更新 `expectedModCount`，安全。

#### 🔬 扩展知识
::: details
- 【L3】`ConcurrentLinkedQueue`、`ConcurrentHashMap` 的迭代器并不基于副本，而是"弱一致性"（weakly consistent）：遍历期间可感知部分修改且不抛 CME，与 CopyOnWriteArrayList 的真快照略有区别。
- 【L4】fail-safe 的内存代价量化：CopyOnWriteArrayList 每次写复制整个数组，写多场景内存峰值可达 2 倍、写吞吐显著下降；而弱一致性容器无复制开销。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "fail-fast 能检测所有并发修改" → 它只比对 modCount，检查点之间发生的修改可能漏检，不能替代同步。
- ❌ "fail-safe 迭代器能看到最新数据" → 快照类迭代器（如 CopyOnWriteArrayList）遍历的是创建时的副本，期间的修改不可见。
:::

#### 🔀 发散问题
- **Q：增强 for 循环中删除元素会触发 fail-fast 吗？** → 会。增强 for 底层是迭代器，直接调集合 remove 会使 modCount 不一致而抛 CME（见本文档「什么是 ConcurrentModificationException？」）。
- **Q：java.util.concurrent 下哪些容器是 fail-safe？** → CopyOnWriteArrayList/CopyOnWriteArraySet（快照型）；ConcurrentHashMap、ConcurrentLinkedQueue 属弱一致性迭代器，同样不抛 CME。

## Set

### 【简单】HashSet、LinkedHashSet 和 TreeSet 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Set / HashSet / TreeSet

#### 💎 关键结论

三者都保证元素唯一：HashSet 基于 HashMap、无序、O(1)；LinkedHashSet 额外维护双向链表保持插入顺序；TreeSet 基于红黑树、自动排序、O(log n)。选型：只要唯一选 HashSet，要插入顺序选 LinkedHashSet，要排序/范围查询选 TreeSet。

#### ⚡记忆卡片
- **口诀**：Hash 快无序，Linked 保插入，Tree 自排序
- **关键词**：HashMap 打底／双向链表／红黑树
- **链路**：唯一性判断（equals/hashCode 或 compare）→ 底层结构决定顺序 → 复杂度 O(1) vs O(log n)

#### 📖 核心知识

1. **核心对比**：

| 特性               | HashSet              | LinkedHashSet             | TreeSet                              |
| ------------------ | -------------------- | ------------------------- | ------------------------------------ |
| **底层实现**       | 哈希表 (HashMap)     | 哈希表 + 链表             | 红黑树                               |
| **排序保证**       | 无顺序               | 插入顺序                  | 自然顺序/自定义排序                  |
| **时间复杂度**     | 添加/删除/查找：O(1) | 添加/删除/查找：O(1)      | 添加/删除/查找：O(log n)             |
| **允许 null 元素** | 允许 1 个 null       | 允许 1 个 null            | 不允许（除非自定义 Comparator 允许） |
| **线程安全**       | 非线程安全           | 非线程安全                | 非线程安全                           |
| **性能特点**       | 最快的基础操作       | 比 HashSet 稍慢但保持顺序 | 最慢但自动排序                       |
| **使用场景**       | 只需唯一性不关心顺序 | 需要保持插入顺序          | 需要排序的集合                       |

2. **实现原理**：
   - `HashSet`：基于 HashMap 实现，元素作键，只使用键
   - `LinkedHashSet`：继承 HashSet，通过链表维护插入顺序
   - `TreeSet`：基于 TreeMap 实现（红黑树结构）
3. **顺序与性能**：HashSet 完全不保证顺序（基于哈希值存储）；LinkedHashSet 迭代时按插入顺序返回；TreeSet 按自然顺序或 Comparator 排序。操作速度：HashSet ≈ LinkedHashSet > TreeSet；内存占用：LinkedHashSet > HashSet > TreeSet；迭代性能 LinkedHashSet 最优（顺序访问快）。
4. **构造方式**：

```java
// HashSet
Set<String> hashSet = new HashSet<>();

// LinkedHashSet
Set<String> linkedHashSet = new LinkedHashSet<>();

// TreeSet - 自然排序
Set<String> treeSet = new TreeSet<>();

// TreeSet - 自定义排序
Set<String> customTreeSet = new TreeSet<>(Comparator.reverseOrder());
```

5. **使用建议**：需要**最快查询**且不关心顺序 → HashSet；需要**保持插入顺序**或**频繁迭代** → LinkedHashSet；需要**自动排序**或**范围查询** → TreeSet。

::: details 特殊注意事项

- **相等性判断**：
  - 三者都使用`equals()`方法判断元素是否相同
  - TreeSet 同时会使用`compareTo()`或`compare()`方法（必须与 equals 逻辑一致）

- **TreeSet 排序规则**：
  - 元素必须实现`Comparable`接口，或在构造时提供`Comparator`
  - 否则会抛出`ClassCastException`

- **线程安全替代方案**：
  ```java
  Set<String> syncSet = Collections.synchronizedSet(new HashSet<>());
  Set<String> syncTreeSet = Collections.synchronizedSet(new TreeSet<>());
  ```

选择哪种 Set 实现取决于你的具体需求：要速度（HashSet）、要插入顺序（LinkedHashSet）还是要自动排序（TreeSet）。
:::

#### 🔬 扩展知识
::: details
- 【L3】HashSet 判重依赖 `hashCode()` + `equals()`：重写 equals 必须同步重写 hashCode，否则同一逻辑对象会被视为不同元素。
- 【L3】LinkedHashSet 继承 HashSet，构造时调用 HashSet 的受保护构造器创建 LinkedHashMap，靠节点的 before/after 指针维护插入顺序，因此迭代性能优于 HashSet（无需扫描哈希桶）。
- 【L4】TreeSet 支持 `subSet`/`headSet`/`tailSet` 范围视图（ backed by 同一棵红黑树），这是 HashSet 系不具备的能力；SortedSet 的 first()/last() 在 JDK 21 后归入 SequencedSet 体系。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "HashSet 的遍历顺序是随机的" → 严格说不是随机，而是由元素哈希值与桶容量决定；容量/扩容变化时顺序可能改变，代码不应依赖该顺序。
- ❌ "TreeSet 用 equals 判重" → TreeSet 用 compareTo/compare 判断相等，比较逻辑与 equals 不一致时会偏离 Set 契约（JDK 文档明确提示）。
:::

#### 🔀 发散问题
- **Q：TreeSet 能做范围查询吗？** → 可以，`subSet(from, to)` 等返回原树的范围视图，配合 NavigableSet 还能取 `ceiling()`/`floor()`。
- **Q：HashSet 的迭代顺序稳定吗？** → 同一 JVM 同一容量下稳定，但扩容（rehash）后可能变化，不应依赖；需稳定顺序用 LinkedHashSet。

## Queue

### 【简单】Queue 与 Deque 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：Queue / Deque

#### 💎 关键结论

Queue 是单端 FIFO 队列（队尾入队、队首出队）；Deque 继承 Queue，两端都可进出，既能当队列也能当栈（push/pop）。标准 FIFO 用 Queue 语义，两端操作或栈功能用 Deque。

#### ⚡记忆卡片
- **口诀**：Queue 一头进出，Deque 两头通吃
- **关键词**：FIFO／双端／push-pop
- **链路**：Queue（offer/poll）→ Deque 继承扩展 → First/Last 双端 API → 可作栈

#### 📖 核心知识

1. **接口对比**：

| 特性         | Queue （队列）                               | Deque （双端队列）            |
| ------------ | -------------------------------------------- | ----------------------------- |
| **进出原则** | 先进先出 (FIFO)                              | 两端都可进出 (FIFO + LIFO)    |
| **主要操作** | 队尾入队 (add/offer)，队首出队 (remove/poll) | 支持队首/队尾的入队和出队操作 |
| **继承关系** | 基础接口                                     | 继承自 Queue 接口             |
| **代表子类** | LinkedList, PriorityQueue                    | ArrayDeque, LinkedList        |
| **特殊功能** | -                                            | 支持栈操作 (push/pop/peek)    |

2. **基本操作对比**：

::: code-tabs#重载和重写的示例

@tab **Queue 操作**

```java
queue.offer(e);  // 队尾添加（推荐）
queue.add(e);    // 队尾添加（可能抛异常）
queue.poll();    // 队首移除并返回（推荐）
queue.remove();  // 队首移除并返回（可能抛异常）
queue.peek();    // 查看队首（不移除）
queue.element(); // 查看队首（可能抛异常）
```

@tab **Deque 扩展操作**

```java
// 队首操作
deque.offerFirst(e);  deque.addFirst(e);
deque.pollFirst();    deque.removeFirst();
deque.peekFirst();    deque.getFirst();

// 队尾操作
deque.offerLast(e);   deque.addLast(e);
deque.pollLast();     deque.removeLast();
deque.peekLast();     deque.getLast();

// 栈操作
deque.push(e);        // = addFirst(e)
deque.pop();          // = removeFirst()
```

:::

3. **使用场景差异**：
   - **Queue 适用场景（标准的先进先出场景）**：任务调度系统（先来先服务）、消息队列（生产者-消费者模型）、广度优先搜索（BFS）。
   - **Deque 适用场景（需要两端操作的场景）**：撤销操作历史（两端添加，一端移除）、滑动窗口算法、可同时作为队列和栈使用、工作窃取算法（如 ForkJoinPool 使用 Deque）、高效头尾操作（ArrayDeque 比 LinkedList 更高效）。

> 小结：
>
> - 需要**标准队列行为** → 选择 Queue
> - 需要**两端操作**或**栈功能** → 选择 Deque
> - 需要**优先级排序** → 使用 PriorityQueue（Queue 实现）
> - 追求**高性能** → 优先考虑 ArrayDeque（优于 LinkedList）

::: details 性能特点与线程安全

- `ArrayDeque`（Deque 实现）比`LinkedList`：
  - 内存更紧凑（数组实现）
  - 大多数操作更高效（O(1) 时间）
  - 但不适合频繁的中间插入/删除
- `PriorityQueue`（Queue 实现）：
  - 基于堆结构
  - 保证每次取出的都是优先级最高的元素（O(log n) 时间）

**线程安全注意**

- 两者主要实现类（LinkedList/ArrayDeque）都**非线程安全**
- 线程安全替代方案：
  ```java
  Queue<String> safeQueue = new ConcurrentLinkedQueue<>();
  Deque<String> safeDeque = new ConcurrentLinkedDeque<>();
  ```
:::

#### 🔀 发散问题
- **Q：为什么 offer/poll 比 add/remove 更推荐？** → add/remove/element 在容量受限或队列为空时抛异常，offer/poll/peek 返回 false/null，更适合容错处理；BlockingQueue 体系在此基础上再加阻塞语义。
- **Q：BlockingQueue 属于 Queue 吗？** → 是，BlockingQueue 继承 Queue，ArrayBlockingQueue/LinkedBlockingQueue 都可当普通 Queue 使用。

### 【简单】ArrayDeque 与 LinkedList 有什么区别？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Queue / ArrayDeque

#### 💎 关键结论

ArrayDeque 基于循环数组，内存紧凑、头尾操作常数更小，队列/栈场景性能更优，是首选；LinkedList 基于双向链表，额外实现了 List，支持中间操作和索引访问。纯双端队列场景一律选 ArrayDeque。

#### ⚡记忆卡片
- **口诀**：栈和队列 ArrayDeque，中间操作才 LinkedList
- **关键词**：循环数组／双向链表／Deque
- **链路**：双端需求 → ArrayDeque（数组、无节点开销）；需要 List 能力 → LinkedList

#### 📖 核心知识

1. **选型结论**：
   - **性能优先选 `ArrayDeque`**：队列/栈场景，追求更高吞吐和更低内存。
   - **功能灵活选 `LinkedList`**：需要中间操作、随机访问或混合数据结构时。
2. **核心对比**：

| **对比项**        | **ArrayDeque**                          | **LinkedList**                                 |
| ----------------- | --------------------------------------- | ---------------------------------------------- |
| **底层数据结构**  | 动态数组（循环数组）                    | 双向链表                                       |
| **内存占用**      | 更低（连续存储，无节点开销）            | 更高（每个元素需存储前后节点引用）             |
| **头部/尾部操作** | `O(1)`，常数时间更优                    | `O(1)`，但实际更慢（需操作节点）               |
| **中间插入/删除** | `O(n)`（需移动元素）                    | `O(1)`（已知位置时）                           |
| **随机访问**      | 理论上 `O(1)`，但通常不支持直接索引操作 | `O(n)`（需遍历链表）                           |
| **扩容机制**      | 动态扩容（默认翻倍），扩容时有开销      | 无扩容概念，按需分配节点                       |
| **功能支持**      | 仅双端队列操作（`Deque`）               | 同时实现 `List` 和 `Deque`，支持索引和中间操作 |
| **线程安全**      | 非线程安全                              | 非线程安全                                     |
| **迭代效率**      | 更高（连续内存访问）                    | 较低（非连续内存访问）                         |
| **适用场景**      | 高频双端操作（如栈、队列）              | 需要中间操作或混合 `List/Deque` 需求的场景     |

#### 🔀 发散问题
- **Q：ArrayDeque 的循环数组如何工作？** → 用 head/tail 两个指针在数组上环形移动，头尾相接避免移动元素；容量满时翻倍扩容并整体搬迁（摊还仍是 O(1)）。不支持中间随机插入。
- **Q：LinkedList 既然实现了 List，get(i) 是 O(1) 吗？** → 不是，仍需从最近端遍历到 index，随机访问仍是 O(n)，索引遍历会退化成 O(n²)。

### 【简单】PriorityQueue 有什么用？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Queue / PriorityQueue

#### 💎 关键结论

PriorityQueue 是基于二叉堆（默认小顶堆）的无界优先级队列：入队/出队 O(log n)、peek O(1)，poll 总返回优先级最高的元素。常用于 Top K、Dijkstra、任务调度；非线程安全，多线程用 PriorityBlockingQueue。

#### ⚡记忆卡片
- **口诀**：堆上排队，小的先出；要大的，Comparator 反转
- **关键词**：小顶堆／O(log n)／Top K
- **链路**：offer → siftUp 上浮；poll → 取堆顶 + siftDown 下沉

#### 📖 核心知识

1. **基本特性**：
   - **基于堆（默认小顶堆）**，元素按优先级出队（最小/最大值先出）。
   - **无界队列**（自动扩容），但初始容量为 `11`。
   - **不允许 `null`**，且元素需实现 `Comparable` 或提供 `Comparator`。
2. **关键操作**：

| 方法                      | 时间复杂度 | 说明                           |
| ------------------------- | ---------- | ------------------------------ |
| `add(E e)` / `offer(E e)` | O(log n)   | 插入元素，触发堆调整。         |
| `poll()`                  | O(log n)   | 移除并返回队首（优先级最高）。 |
| `peek()`                  | O(1)       | 查看队首但不移除。             |
| `remove(Object o)`        | O(n)       | 删除指定元素（需遍历堆）。     |

3. **排序规则**：默认自然排序（元素需实现 `Comparable`）；自定义排序通过 `Comparator` 指定（如大顶堆）：

  ```java
  PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
  ```

4. **使用场景**：任务调度（按优先级执行）、Top K 问题（维护前 K 个最大/最小值）、Dijkstra 算法（优先处理最短路径）。
5. **注意事项**：
   - **非线程安全**：多线程需用 `PriorityBlockingQueue`。
   - **迭代无序**：遍历顺序不等于优先级顺序。
   - **性能权衡**：插入/删除 O(log n)，但查找 O(n)。

#### 🔀 发散问题
- **Q：迭代 PriorityQueue 是按优先级顺序吗？** → 不是。迭代器按底层数组顺序输出，只有连续 poll 才保证优先级顺序。
- **Q：Top K 问题为什么用堆？** → 维护大小为 K 的堆，时间复杂度 O(n log K)，优于全排序的 O(n log n)，适合海量数据流式处理。

### 【简单】BlockingQueue 有什么用？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：并发 / BlockingQueue

#### 💎 关键结论

BlockingQueue 是线程安全的阻塞队列：队列满时 put 阻塞、空时 take 阻塞，是生产者-消费者模型的标准组件。核心是 put()/take() 两个阻塞方法，按场景选实现类：固定容量 ArrayBlockingQueue、高吞吐 LinkedBlockingQueue、直接传递 SynchronousQueue。

#### ⚡记忆卡片
- **口诀**：满则阻塞 put，空则阻塞 take
- **关键词**：生产者-消费者／put-take／容量控制
- **链路**：生产者 put → 队满阻塞等待 → 消费者 take 唤醒；线程池任务队列即 BlockingQueue

#### 📖 核心知识

1. **定位**：BlockingQueue 是**线程安全的队列**，支持阻塞操作（队列满时阻塞插入，空时阻塞取出），主要用于**生产者-消费者模型**，协调多线程数据交换。
2. **关键方法**：

| 方法         | 说明                                            |
| ------------ | ----------------------------------------------- |
| `put(E e)`   | 队列满时**阻塞**，直到有空间插入。              |
| `take()`     | 队列空时**阻塞**，直到有元素可取。              |
| `offer(E e)` | 非阻塞插入，成功返回 `true`，失败返回 `false`。 |
| `poll()`     | 非阻塞取出，有元素返回元素，无元素返回 `null`。 |
| `peek()`     | 查看队首元素但不移除（无元素返回 `null`）。     |

3. **常见实现类**：
   - **`ArrayBlockingQueue`**：固定大小数组，单锁，适合低并发。
   - **`LinkedBlockingQueue`**：链表，双锁（高并发），默认几乎无界。
   - **`PriorityBlockingQueue`**：优先级队列（堆实现），无界。
   - **`SynchronousQueue`**：不存储元素，直接传递任务（一对一通信）。
4. **适用场景**：任务调度（线程池任务队列）、数据缓冲（生产者-消费者模型）、流量控制（通过固定容量限制并发）。
5. **注意事项**：
   - **线程安全**：所有实现均线程安全，但需注意 `peek()` 和 `poll()` 的竞态条件。
   - **阻塞策略**：`put()`/`take()` 会阻塞，`offer()`/`poll()` 可设置超时。
   - **无界队列风险**：`LinkedBlockingQueue` 默认无界，可能导致 `OOM`，建议设置容量。

**一句话总结**：多线程间安全传递数据的阻塞队列，核心方法是 `put()`（阻塞插入）和 `take()`（阻塞取出），按场景选实现类。

#### 🔬 扩展知识
::: details
- 【L3】四组操作方法语义：抛异常（add/remove/element）、返回特殊值（offer/poll/peek）、无限阻塞（put/take）、超时（offer(e, time, unit)/poll(time, unit)）。
- 【L3】源码要点：ArrayBlockingQueue 用单个 ReentrantLock + notEmpty/notFull 两个 Condition；LinkedBlockingQueue 用 putLock/takeLock 双锁 + AtomicInteger count 协调容量。
- 【L4】版本演进：JDK 5 引入 BlockingQueue 及 Array/Linked/Priority/Synchronous 实现；JDK 6 增加 DelayQueue、LinkedBlockingDeque；JDK 7 增加 LinkedTransferQueue。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "BlockingQueue 一切操作都阻塞" → 只有 put/take 阻塞，offer/poll 是非阻塞的，另有带超时的重载。
- ❌ "无界队列更方便" → LinkedBlockingQueue 默认容量 Integer.MAX_VALUE，生产快消费慢时会积压任务导致 OOM，生产环境应显式指定容量并搭配拒绝策略。
:::

#### 🔀 发散问题
- **Q：offer 超时版有什么用途？** → `offer(e, timeout, unit)` 在限时内尝试入队，失败返回 false，适合需要降级或监控背压的生产者。
- **Q：SynchronousQueue 容量为 0 怎么用？** → put 必须等到有线程 take 才完成，用于直接交接任务，如 Executors.newCachedThreadPool 的工作队列。

### 【中等】ArrayBlockingQueue 和 LinkedBlockingQueue 有什么区别？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：并发 / BlockingQueue

#### 💎 关键结论

两者都是线程安全的阻塞队列：ArrayBlockingQueue 数组实现、必须指定固定容量、单锁，内存紧凑、防 OOM；LinkedBlockingQueue 链表实现、putLock/takeLock 双锁分离，高并发吞吐更高，但默认容量 Integer.MAX_VALUE 需防无界积压。

#### ⚡记忆卡片
- **口诀**：Array 定容单锁稳，Linked 双锁吞吐高
- **关键词**：单锁 vs 双锁／固定容量／OOM 风险
- **链路**：结构（数组 vs 链表）→ 容量（必指定 vs 默认无界）→ 锁（单锁 vs 双锁）→ 选型（防 OOM vs 高吞吐）

#### 📖 核心知识

1. **定位**：两者都是 `java.util.concurrent` 中的**线程安全阻塞队列**，在底层实现、性能和适用场景上有显著区别：
   - **`ArrayBlockingQueue`**：固定容量，单锁，适合低并发或内存敏感场景。
   - **`LinkedBlockingQueue`**：动态扩容，双锁，适合高并发和高吞吐场景。
   - **避免 `OOM`**：如果使用 `LinkedBlockingQueue`，建议设置合理容量（默认 `MAX_VALUE` 可能导致内存问题）。
2. **核心对比**：

| **对比项**       | **ArrayBlockingQueue**             | **LinkedBlockingQueue**                  |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| **底层数据结构** | **固定大小的数组**（循环队列）     | **链表**（可动态扩容）                   |
| **初始化容量**   | **必须指定容量**（无默认构造方法） | 可选指定容量（默认 `Integer.MAX_VALUE`） |
| **内存占用**     | 更紧凑（连续存储）                 | 稍高（每个节点存储前后指针）             |
| **锁机制**       | **单锁（入队和出队共用同一把锁）** | **双锁（入队和出队分离锁，减少竞争）**   |
| **吞吐量**       | 较低（锁竞争更激烈）               | 较高（读写分离，并发性能更好）           |
| **适用场景**     | 固定大小队列，避免 OOM             | 高并发、动态扩容场景                     |

3. **锁机制**：
   - **ArrayBlockingQueue**：使用**单锁**（`ReentrantLock`），入队和出队操作共用同一把锁，竞争较激烈；适合**低并发**或**容量固定**的场景。
   - **LinkedBlockingQueue**：采用**双锁**（`putLock` 和 `takeLock`），入队和出队操作互不阻塞；**高并发**下吞吐量更高（如生产者-消费者模型）。
4. **性能对比**：

| **操作**           | **ArrayBlockingQueue** | **LinkedBlockingQueue** |
| ------------------ | ---------------------- | ----------------------- |
| **入队（`put`）**  | 较慢（单锁竞争）       | 更快（双锁分离）        |
| **出队（`take`）** | 较慢（单锁竞争）       | 更快（双锁分离）        |
| **内存占用**       | 更紧凑                 | 稍高（链表节点开销）    |

5. **选型建议**：
   - 选 **ArrayBlockingQueue**：✔️ **队列大小固定**，防止内存耗尽（如任务队列有严格上限）；✔️ **低/中并发**，且对内存占用敏感。
   - 选 **LinkedBlockingQueue**：✔️ **高并发**（生产者-消费者模型）；✔️ **队列大小不固定**（默认几乎无界，但可手动指定容量）；✔️ **需要更高的吞吐量**（双锁机制减少竞争）。

#### 🔬 扩展知识
::: details
- 【L3】源码细节：ArrayBlockingQueue 用循环数组 + count 计数，靠 count == capacity / count == 0 判断满/空；LinkedBlockingQueue 使用哨兵节点 head，put 时若 count 为 0 会同时拿 putLock 与 head 锁，双锁下仍通过 AtomicInteger count 保证容量一致性。
- 【L4】版本与替代：两者均为 JDK 5 引入；更高吞吐可评估 LinkedTransferQueue（JDK 7，CAS 无锁结构）；需要双端阻塞语义用 LinkedBlockingDeque（JDK 6）。
:::

#### 🏭 实战场景
::: details

订单异步处理线程池：生产者 8 线程、消费者 16 线程，任务队列用 ArrayBlockingQueue(2000) + 拒绝策略 CallerRunsPolicy，高峰期队列打满时生产者被自然反压，避免 OOM，P99 处理延迟稳定在 200ms 内；同类服务若误用默认无界的 LinkedBlockingQueue，高峰期曾出现 10 分钟积压 50 万任务、堆内存打满触发 Full GC 的故障。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "LinkedBlockingQueue 双锁所以更快，一律选它" → 无界默认容量有 OOM 风险，且低并发下双锁并无收益；内存敏感/需背压场景应选有界 ArrayBlockingQueue。
- ❌ "ArrayBlockingQueue 可以扩容" → 数组容量构造时固定，队列满时 put 阻塞而非扩容，这正是它防 OOM 的原因。
:::

#### 🔀 发散问题
- **Q：双锁为什么能提升吞吐？** → putLock 与 takeLock 分离后，入队与出队可并行执行，锁竞争从两方变一方，高并发下吞吐更高；代价是用 AtomicInteger count 在双锁间协调容量。
- **Q：线程池任务队列一般选哪个？** → Executors.newFixedThreadPool 默认 LinkedBlockingQueue（无界，有 OOM 风险）；生产建议手动 new ThreadPoolExecutor + 有界 ArrayBlockingQueue。

### 【中等】Vector 和 Stack 为什么被弃用？⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：8 min ｜ 🏷 标签：List / Vector

#### 💎 关键结论

Vector 是 JDK 1.0 产物，所有方法 synchronized 锁粒度过粗、性能差；Stack 继承 Vector 违反组合优于继承，接口被污染。现代替代：List 用 ArrayList + 同步包装或 CopyOnWriteArrayList，栈用 ArrayDeque。

#### ⚡记忆卡片
- **口诀**：Vector 锁太粗，Stack 继承错，栈用 ArrayDeque
- **关键词**：方法级 synchronized／继承 Vector／ArrayDeque
- **链路**：JDK 1.0 Vector → 方法级锁性能差 → 集合框架出现更优替代 → 弃用

#### 📖 核心知识

1. **背景**：`Vector` 和 `Stack` 是 Java 早期提供的**线程安全**容器，但现代 Java 开发中已不推荐使用。
2. **Vector 弃用原因**：

| **问题**         | **说明**                                                                 |
| ---------------- | ------------------------------------------------------------------------ |
| **锁粒度过粗**   | 每个方法都用 `synchronized` 修饰，锁住整个对象，并发性能差               |
| **设计过时**     | JDK 1.0 产物，早于集合框架（JDK 1.2）                                    |
| **扩容低效**     | 默认扩容 2 倍（ArrayList 扩 1.5 倍，更省内存）                           |
| **替代方案完善** | `ArrayList` + `Collections.synchronizedList()` 或 `CopyOnWriteArrayList` |

3. **Stack 弃用原因**：
   - **继承 Vector**：违反"组合优于继承"原则，导致 Stack 拥有不相关的 `add(index, e)` 等方法。
   - **性能差**：所有方法同步，单线程场景也有锁开销。
   - **替代方案**：`ArrayDeque`（实现 `Deque` 接口，性能更好）。

```java
// ❌ 不推荐
Stack<String> stack = new Stack<>();
stack.push("a");
String top = stack.pop();

// ✔️ 推荐：ArrayDeque 作为栈
Deque<String> stack = new ArrayDeque<>();
stack.push("a");
String top = stack.pop();

// ✔️ 推荐：线程安全栈
Deque<String> stack = new ConcurrentLinkedDeque<>();
```

::: details 线程安全容器选型指南

| **场景**                | **推荐**                                          |
| ----------------------- | ------------------------------------------------- |
| 单线程 List             | `ArrayList`                                       |
| 多线程 List（读多写少） | `CopyOnWriteArrayList`                            |
| 多线程 List（读写均衡） | `Collections.synchronizedList(new ArrayList<>())` |
| 单线程 Map              | `HashMap`                                         |
| 多线程 Map              | `ConcurrentHashMap`                               |
| 单线程栈/队列           | `ArrayDeque`                                      |
| 多线程队列              | `ConcurrentLinkedQueue` / `LinkedBlockingQueue`   |
:::

#### 🔬 扩展知识
::: details
- 【L3】Vector 的 `synchronized` 修饰在方法级，锁对象是 Vector 实例本身；即使单线程调用也要承担 monitorenter/monitorexit 的开销，且复合操作（先检查再操作）仍需外部加锁，方法级同步并不能保证组合操作原子性。
- 【L4】版本演进：JDK 1.0 Vector/Stack/Hashtable（非集合框架）→ JDK 1.2 集合框架引入 ArrayList/ArrayDeque 等 → 官方文档不再推荐但保持兼容（deprecated by convention 与移除不同，它们并未标记 @Deprecated，只是"不推荐"）。
:::

#### ⚠️ 常见误区
::: details
常见误区：
- ❌ "Vector 线程安全所以比 ArrayList 好" → 方法级锁粒度粗，性能差且复合操作仍不安全；需要同步时应用 Collections.synchronizedList 或 CopyOnWriteArrayList，单线程直接用 ArrayList。
- ❌ "Stack 是线程安全栈的最佳选择" → Stack 继承 Vector 接口被污染（暴露 get(i)、indexOf 等与栈语义无关的方法），推荐 ArrayDeque；并发栈可用 ConcurrentLinkedDeque。
:::

#### 🔀 发散问题
- **Q：Hashtable 为什么也被 ConcurrentHashMap 取代？** → 同样是方法级 synchronized，锁住整张表，读写互斥；ConcurrentHashMap 用分段锁（JDK 7）/CAS + synchronized（JDK 8+）细粒度并发。
- **Q：ArrayDeque 比 Stack 快在哪？** → 无同步开销、无 Vector 继承带来的多余方法，且数组连续内存对缓存友好，官方文档明确推荐用它替代 Stack。
