---
title: Java 容器面试三
date: 2024-07-03 07:44:02
order: 6
categories:
  - Java
  - JavaCore
  - 面试
tags:
  - Java
  - JavaCore
  - 面试
  - 容器
permalink: /pages/ed0f8b4b/
---

# Java 容器面试三

## Stream API

### 【中等】Stream API 的中间操作和终端操作有什么区别？⭐⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Stream API / 执行模型

#### 💎 关键结论

Stream 操作分两类：**中间操作**惰性求值、返回 Stream，只记录流水线不执行；**终端操作**才触发实际执行并返回结果。没有终端操作，中间操作永远不执行。

#### ⚡记忆卡片

- **口诀**：中间惰性可链式，终端触发才出结果
- **关键词**：惰性求值 ／ 流水线 ／ 短路
- **链路**：中间操作记录流水线 → 终端操作触发执行 → 元素逐个流经各阶段

#### 📖 核心知识

1. **两类操作定义**：Stream 操作分为**中间操作**（返回 Stream，可链式）和**终端操作**（触发执行，返回结果）。

| **维度** | **中间操作** | **终端操作** |
| -------- | ------------ | ------------ |
| **返回类型** | `Stream<T>` | 非 Stream（值/集合/void） |
| **执行时机** | 惰性（不触发执行） | 立即触发整个流水线 |
| **链式调用** | 可继续接操作 | 流终止，不可再操作 |
| **短路** | 部分支持（如 `limit`） | 部分支持（如 `findFirst`） |

2. **常见中间操作**：

| **操作** | **说明** | **示例** |
| -------- | -------- | -------- |
| `filter` | 过滤 | `.filter(s -> s.length() > 3)` |
| `map` | 转换 | `.map(String::toUpperCase)` |
| `flatMap` | 扁平化 | `.flatMap(list -> list.stream())` |
| `distinct` | 去重 | `.distinct()` |
| `sorted` | 排序 | `.sorted(Comparator.reverseOrder())` |
| `limit` | 取前 N 个 | `.limit(10)` |
| `skip` | 跳过前 N 个 | `.skip(5)` |
| `peek` | 查看（调试用） | `.peek(System.out::println)` |

3. **常见终端操作**：

| **操作** | **说明** | **示例** |
| -------- | -------- | -------- |
| `collect` | 收集为集合 | `.collect(Collectors.toList())` |
| `forEach` | 遍历 | `.forEach(System.out::println)` |
| `reduce` | 归约 | `.reduce(0, Integer::sum)` |
| `count` | 计数 | `.count()` |
| `min`/`max` | 最值 | `.max(Comparator.naturalOrder())` |
| `anyMatch`/`allMatch`/`noneMatch` | 匹配 | `.anyMatch(s -> s.startsWith("a"))` |
| `findFirst`/`findAny` | 查找 | `.findFirst()` |
| `toArray` | 转数组 | `.toArray(String[]::new)` |

4. **惰性求值示例**：

```java
// 中间操作不执行，直到终端操作触发
Stream<String> stream = list.stream()
    .filter(s -> s.length() > 3)  // 未执行
    .map(String::toUpperCase);    // 未执行

stream.forEach(System.out::println);  // 此刻才执行全部流水线
```

#### 🔬 扩展知识

::: details

- 【L3】惰性求值实现原理：`filter`/`map` 等中间操作是 `AbstractPipeline` 的子类（无状态操作 StatelessOp / 有状态操作 StatefulOp），调用时只是把自己链入流水线并记录流标志位；只有终端操作从最后一个阶段起调用 `opWrapSink` 组装出 Sink 链后，数据才真正逐元素流动。
- 【L3】纵向融合：流水线按“单个元素流经所有阶段”执行，而非“每个阶段处理全部元素”，一次遍历即可完成 filter + map + collect，避免中间集合与多次遍历。
- 【L4】版本演进：Java 9 新增 `takeWhile` / `dropWhile` / `ofNullable`；Java 16 新增 `Stream.toList()`，返回不可修改 List，与 `Collectors.toList()` 返回可变 ArrayList 不等价。

:::

#### 🔀 发散问题

- **Q：同一个 Stream 能调用两次终端操作吗？** → 不能，会抛 `IllegalStateException`。流是一次性的，被终端操作消费后不可复用，需重新 `collection.stream()` 生成新流。
- **Q：peek 一定会执行吗？** → 不保证。`peek` 是调试用中间操作，没有终端操作触发时不执行，且官方文档说明某些情况下可能被实现优化掉，不要用它承载业务逻辑。

### 【中等】什么是短路操作？⭐⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：5 min ｜ 🏷 标签：Stream API / 短路操作

#### 💎 关键结论

短路操作无需处理所有元素即可返回结果，一旦条件命中就立即终止流水线，显著降低遍历成本。典型代表是 `findFirst` / `anyMatch` / `limit`。

#### ⚡记忆卡片

- **口诀**：find 遇一即停，any/all/none 见微知著，limit 到数就停
- **关键词**：短路 ／ find ／ match
- **链路**：元素流经流水线 → 谓词命中 → 短路信号向上游传播 → 流水线停止

#### 📖 核心知识

1. **定义**：**短路操作**指无需处理所有元素即可返回结果，提升性能。
2. **短路中间操作**：
   - `limit(n)`：取到 n 个后停止。
   - `skip(n)` 虽不短路，但配合 `limit` 可实现“分页”。
3. **短路终端操作**：

| **操作** | **短路条件** |
| -------- | ------------ |
| `findFirst()` | 找到第一个即停止 |
| `findAny()` | 找到任一个即停止（并行流更快） |
| `anyMatch()` | 遇到 true 即停止，返回 true |
| `allMatch()` | 遇到 false 即停止，返回 false |
| `noneMatch()` | 遇到 true 即停止，返回 false |

4. **示例**：

```java
// 1. findFirst 短路：只处理到第一个匹配元素
Optional<String> first = list.stream()
    .filter(s -> s.length() > 3)
    .findFirst();  // 找到第一个就停

// 2. anyMatch 短路
boolean hasLong = list.stream()
    .peek(s -> System.out.println("检查: " + s))  // 仅打印到匹配为止
    .anyMatch(s -> s.length() > 10);
```

#### 🔀 发散问题

- **Q：findFirst 和 findAny 有什么区别？** → 串行流下结果一致；并行流中 `findAny` 可率先返回任一分区结果，通常更快；不关心顺序时应优先用 `findAny`。
- **Q：limit 能截断无限流吗？** → 可以。`Stream.iterate` / `generate` 产生的无限流必须搭配 `limit(n)` 使用，取够 n 个即截断，这是短路机制的经典用法。

### 【中等】并行流（Parallel Stream）的原理和注意事项？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：15 min ｜ 🏷 标签：Stream API / 并行流

#### 💎 关键结论

并行流基于 `ForkJoinPool.commonPool()` 分治拆分数据并行计算，适合**数据量大、纯计算、无共享可变状态**的场景；小数据、阻塞操作、有副作用时使用反而更慢甚至出错。

#### ⚡记忆卡片

- **口诀**：大数据、纯计算、无共享才并行；小数据、阻塞、副作用勿用
- **关键词**：ForkJoinPool ／ 分治 ／ commonPool
- **链路**：parallel() 标记流水线 → Spliterator 拆分数据 → ForkJoin 任务并行计算 → 结果合并

#### 📖 核心知识

1. **使用方式**：

```java
// 串行流
list.stream().filter(...).collect(...);

// 并行流
list.parallelStream().filter(...).collect(...);
list.stream().parallel().filter(...).collect(...);

// 切换回串行
stream.sequential();
```

2. **底层原理**：

- 基于 `ForkJoinPool.commonPool()`，默认线程数 = CPU 核心数 - 1。
- 使用**分治策略**：将源数据分割，并行处理，最后合并结果。
- 源数据需支持**高效分割**（如 `ArrayList` 支持，`LinkedList` 不支持）。

3. **适用场景**：

| **适合并行** | **不适合并行** |
| ------------ | -------------- |
| 数据量大（>1万） | 数据量小 |
| 元素处理耗时 | 元素处理简单 |
| 无顺序要求 | 严格顺序要求 |
| 无共享可变状态 | 有副作用（修改共享变量） |
| 源支持分割（ArrayList） | 源不支持分割（LinkedList） |

4. **常见陷阱**：

```java
// ❌ 陷阱1：线程安全问题（共享可变状态）
List<Integer> results = new ArrayList<>();
list.parallelStream().forEach(results::add);  // ArrayList 非线程安全

// ✔️ 解决：用 collect
List<Integer> results = list.parallelStream().collect(Collectors.toList());

// ❌ 陷阱2：顺序依赖操作
list.parallelStream()
    .limit(10)  // limit 在并行流中开销大
    .collect(Collectors.toList());

// ❌ 陷阱3：阻塞操作占用公共线程池
list.parallelStream().forEach(item -> {
    Thread.sleep(1000);  // 占用 commonPool，影响其他并行流
});
```

5. **性能对比**：

```java
// 数据量大时，并行流更快
long count = IntStream.range(0, 10_000_000)
    .parallel()
    .filter(x -> x % 2 == 0)
    .count();  // 并行更快
```

#### 🔬 扩展知识

::: details

- 【L3】线程数控制：commonPool 并行度默认为 `Runtime.getRuntime().availableProcessors() - 1`，可用 JVM 参数 `-Djava.util.concurrent.ForkJoinPool.common.parallelism` 调整；发起调用的当前线程也会参与计算。
- 【L3】拆分质量决定加速比：`ArrayList` 的 Spliterator 可 O(1) 均匀二分；`LinkedList`、IO 流拆分质量差；`sorted` 是有状态操作，并行下需汇聚全部数据再排序，开销显著。
- 【L4】隔离方案：任务含阻塞调用时，可将并行流提交到自建 `ForkJoinPool` 执行（Java 8 起该行为成立），避免污染全局 commonPool；IO 密集型并发更推荐 `CompletableFuture` + 自定义线程池。

:::

#### 🏭 实战场景

::: details

某风控服务内存中对千万级订单记录做 `filter + summingLong` 聚合：8 核机器上串行流耗时约 1.2s，`parallelStream` 降至约 0.25s（加速比约 4~5 倍，未达线性主因拆分合并开销与尾任务不均，具体数值以实际压测为准）。另一案例：批处理中误将含 100ms RPC 调用的逻辑放入并行流，commonPool 的 7 个工作线程全部阻塞，导致同 JVM 内其他接口的并行流任务排队劣化为准串行，后改为自定义线程池 + `CompletableFuture` 修复。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “并行流一定比串行快” → 并行有拆分、合并与线程调度开销，数据量小（数千以内）或元素处理简单时串行往往更快。
- ❌ “parallelStream 天然线程安全” → 流水线本身线程安全，但 lambda 中若捕获共享可变状态（如 `ArrayList::add`）会发生竞态丢数据，应改用 `collect` 收集结果。
- ❌ “parallel() 和 sequential() 可分段混合生效” → 并行/串行标志是整条流水线的状态，以最后一次调用为准，并非分段执行。

:::

#### 🔀 发散问题

- **Q：并行流中 forEach 顺序为什么不稳定？** → 各分区并行处理，遍历顺序不可预期，且共享副作用存在竞态；需要有序消费用 `forEachOrdered`，需要结果用 `collect`。
- **Q：IO 密集型并发该用什么？** → 不适合并行流，阻塞会耗尽 commonPool；推荐 `CompletableFuture` + 自定义线程池，或 Java 21+ 的虚拟线程。

### 【中等】Collectors 工具类有哪些常用方法？⭐⭐⭐

> 🎯 目标等级：L2-L3 ｜ ⏱ 建议用时：10 min ｜ 🏷 标签：Stream API / 收集器

#### 💎 关键结论

`Collectors` 是 Stream 的汇聚工具箱：`toList`/`toMap`/`toCollection` 转集合，`groupingBy`/`partitioningBy` 分组分区，`summingInt`/`summarizingInt` 归约统计；`toMap` 需特别注意 key 冲突与 value 为 null 的 NPE。

#### ⚡记忆卡片

- **口诀**：to 系转集合，grouping 分组 partitioning 分区，summing 统计归约
- **关键词**：toMap ／ groupingBy ／ partitioningBy
- **链路**：stream.collect → Collector 供应容器 → 逐元素累积 → 并行合并出结果

#### 📖 核心知识

1. **收集为集合**：`Collectors` 提供丰富的收集器，是 Stream API 的核心工具。

| **收集器** | **作用** | **示例** |
| ---------- | -------- | -------- |
| `toList()` | 收集为 List | `.collect(Collectors.toList())` |
| `toSet()` | 收集为 Set（去重） | `.collect(Collectors.toSet())` |
| `toMap(k, v)` | 收集为 Map | `.collect(Collectors.toMap(User::getId, User::getName))` |
| `toCollection()` | 收集为指定集合 | `.collect(Collectors.toCollection(LinkedList::new))` |
| `joining()` | 拼接字符串 | `.collect(Collectors.joining(", "))` |

2. **分组分区**：

```java
// 分组（groupingBy）
Map<Department, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// 多级分组
Map<Dept, Map<String, List<Employee>>> byDeptAndLevel = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.groupingBy(Employee::getLevel)));

// 分区（partitioningBy，key 为 boolean）
Map<Boolean, List<Integer>> parts = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n > 0));  // 正数/非正数

// 分组后计数
Map<Dept, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDept, Collectors.counting()));

// 分组后求和
Map<Dept, Integer> sumByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDept, Collectors.summingInt(Employee::getSalary)));
```

3. **归约统计**：

```java
// 求和
int sum = list.stream().collect(Collectors.summingInt(Integer::intValue));

// 平均值
double avg = list.stream().collect(Collectors.averagingInt(Integer::intValue));

// 统计摘要（count/sum/min/avg/max）
IntSummaryStatistics stats = list.stream()
    .collect(Collectors.summarizingInt(Integer::intValue));

// 归约
Optional<Integer> max = list.stream()
    .collect(Collectors.maxBy(Comparator.naturalOrder()));
```

4. **toMap 的常见坑（key 冲突）**：

```java
// ❌ key 重复时抛 IllegalStateException
Map<Long, String> map = users.stream()
    .collect(Collectors.toMap(User::getId, User::getName));
// 若有两个用户 id 相同，抛异常

// ✔️ 指定 merge 函数处理冲突
Map<Long, String> map = users.stream()
    .collect(Collectors.toMap(
        User::getId,
        User::getName,
        (existing, replacement) -> existing));  // 保留旧值

// ✔️ 指定 Map 实现
Map<Long, String> map = users.stream()
    .collect(Collectors.toMap(
        User::getId, User::getName, (a, b) -> a, LinkedHashMap::new));
```

#### 🔬 扩展知识

::: details

- 【L3】Collector 四要素：`supplier` 创建结果容器、`accumulator` 逐元素累积、`combiner` 合并并行分片结果、`finisher` 做最终转换；`characteristics`（CONCURRENT / UNORDERED / IDENTITY_FINISH）决定并行归并策略。
- 【L3】toMap 双参版累加器走 `Map.merge`，value 为 null 时会抛 NPE，需换三参/四参重载或 forEach 手动 put，详见本文档「集合转 Map」。
- 【L4】版本演进：Java 12 新增 `Collectors.teeing` 可同时跑两个收集器并合并结果；Java 16 的 `Stream.toList()` 可替代 `Collectors.toList()`（返回不可修改 List）。

:::

#### ⚠️ 常见误区

::: details

常见误区：

- ❌ “toMap 遇到重复 key 会保留后值” → 双参版直接抛 `IllegalStateException`，需显式传入 merge 函数决定取舍。
- ❌ “`toList()` 返回的 List 不可变” → `Collectors.toList()` 返回可变 ArrayList，只是规范不保证具体实现；需要不可变语义用 Java 16 的 `Stream.toList()` 或 `toUnmodifiableList()`（Java 10+）。
- ❌ “partitioningBy 就是 groupingBy” → 前者是布尔条件的特例，结果 Map 保证同时包含 true/false 两个 key，后者分组键可为任意类型。

:::

#### 🔀 发散问题

- **Q：groupingBy 如何一次算出多指标？** → 下游收集器用 `Collectors.teeing`（Java 12+）或分别收集；也可用 `summarizingInt` 一次得到 count/sum/min/avg/max 摘要。
- **Q：Stream.reduce 和 Collectors.reducing 有什么区别？** → `Stream.reduce` 是终端操作，返回累积值或 Optional；`Collectors.reducing` 是收集器，可作为 `groupingBy` 的下游，分组后逐组归约更方便。

## Java 容器工具类

**`Collections` 工具类常用方法**:

- 排序
- 查找，替换操作
- 同步控制（不推荐，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合）

### 【简单】排序操作⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：3 min ｜ 🏷 标签：Collections 工具类 / 排序操作

#### 💎 关键结论

`Collections` 提供 `reverse`/`shuffle`/`sort`/`swap`/`rotate` 等静态方法对 List 重排，`sort` 支持自定义 `Comparator`，均为原地修改、不产生新集合。

#### ⚡记忆卡片

- **口诀**：reverse 反转 shuffle 乱，sort 排序 swap 换，rotate 旋转整体搬
- **关键词**：sort ／ Comparator ／ 原地修改
- **链路**：静态方法接收 List → 直接修改原集合 → 返回 void（无新集合）

#### 📖 核心知识

`Collections` 的排序类方法均作用于 `List`，常用如下：

```java
void reverse(List list)//反转
void shuffle(List list)//随机排序
void sort(List list)//按自然排序的升序排序
void sort(List list, Comparator c)//定制排序，由 Comparator 控制排序逻辑
void swap(List list, int i , int j)//交换两个索引位置的元素
void rotate(List list, int distance)//旋转。当 distance 为正数时，将 list 后 distance 个元素整体移到前面。当 distance 为负数时，将 list 的前 distance 个元素整体移到后面
```

### 【简单】查找，替换操作⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：3 min ｜ 🏷 标签：Collections 工具类 / 查找替换

#### 💎 关键结论

`Collections` 提供 `binarySearch`/`max`/`min`/`fill`/`frequency`/`replaceAll` 等静态方法；注意 `binarySearch` 前提是 List 已有序，否则结果不可预期。

#### ⚡记忆卡片

- **口诀**：二分查找先有序，最值可配 Comparator，fill 全替 frequency 计数
- **关键词**：binarySearch ／ frequency ／ replaceAll
- **链路**：前置有序 → 查找（二分/最值/子列表）→ 替换（fill/replaceAll）

#### 📖 核心知识

查找与替换类静态方法常用如下：

```java
int binarySearch(List list, Object key)//对 List 进行二分查找，返回索引，注意 List 必须是有序的
int max(Collection coll)//根据元素的自然顺序，返回最大的元素。 类比 int min(Collection coll)
int max(Collection coll, Comparator c)//根据定制排序，返回最大元素，排序规则由 Comparatator 类控制。类比 int min(Collection coll, Comparator c)
void fill(List list, Object obj)//用指定的元素代替指定 list 中的所有元素
int frequency(Collection c, Object o)//统计元素出现次数
int indexOfSubList(List list, List target)//统计 target 在 list 中第一次出现的索引，找不到则返回-1，类比 int lastIndexOfSubList(List source, list target)
boolean replaceAll(List list, Object oldVal, Object newVal)//用新元素替换旧元素
```

### 【简单】同步控制⭐

> 🎯 目标等级：L2 ｜ ⏱ 建议用时：3 min ｜ 🏷 标签：Collections 工具类 / 同步控制

#### 💎 关键结论

`synchronizedXxx` 用互斥锁把集合包装成同步集合，粗粒度且效率低；需要线程安全时应优先选 JUC 并发集合，如 `ConcurrentHashMap`、`CopyOnWriteArrayList`。

#### ⚡记忆卡片

- **口诀**：同步包装是粗锁，效率太低不推荐；并发集合找 JUC
- **关键词**：synchronizedXxx ／ 互斥锁 ／ JUC
- **链路**：普通集合经 synchronizedXxx 包装 → 方法级加锁 → 高竞争下性能差 → 改用 JUC 并发集合

#### 📖 核心知识

1. **作用**：`Collections` 提供了多个 `synchronizedXxx()` 方法，可以将指定集合包装成线程同步的集合，从而解决多线程并发访问集合时的线程安全问题。

2. **包装对象**：`HashSet`、`TreeSet`、`ArrayList`、`LinkedList`、`HashMap`、`TreeMap` 都是线程不安全的，`Collections` 提供了多个静态方法可以把他们包装成线程同步的集合。

3. **不推荐使用**：最好不要用下面这些方法，效率非常低，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合。

```java
synchronizedCollection(Collection<T>  c) //返回指定 collection 支持的同步（线程安全的）collection。
synchronizedList(List<T> list)//返回指定列表支持的同步（线程安全的）List。
synchronizedMap(Map<K,V> m) //返回由指定映射支持的同步（线程安全的）Map。
synchronizedSet(Set<T> s) //返回指定 set 支持的同步（线程安全的）set。
```

## 集合判空

《阿里巴巴 Java 开发手册》的描述如下：

> **判断所有集合内部的元素是否为空，使用 `isEmpty()` 方法，而不是 `size()==0` 的方式。**

这是因为 `isEmpty()` 方法的可读性更好，并且时间复杂度为 O(1)。

绝大部分我们使用的集合的 `size()` 方法的时间复杂度也是 O(1)，不过，也有很多复杂度不是 O(1) 的，比如 `java.util.concurrent` 包下的某些集合（`ConcurrentLinkedQueue`、`ConcurrentHashMap`...）。

下面是 `ConcurrentHashMap` 的 `size()` 方法和 `isEmpty()` 方法的源码。

```
public int size() {
    long n = sumCount();
    return ((n < 0L) ? 0 :
            (n > (long)Integer.MAX_VALUE) ? Integer.MAX_VALUE :
            (int)n);
}
final long sumCount() {
    CounterCell[] as = counterCells; CounterCell a;
    long sum = baseCount;
    if (as != null) {
        for (int i = 0; i < as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;
        }
    }
    return sum;
}
public boolean isEmpty() {
    return sumCount() <= 0L; // ignore transient negative values
}
```

## 集合转 Map

《阿里巴巴 Java 开发手册》的描述如下：

> **在使用 `java.util.stream.Collectors` 类的 `toMap()` 方法转为 `Map` 集合时，一定要注意当 value 为 null 时会抛 NPE 异常。**

```
class Person {
    private String name;
    private String phoneNumber;
     // getters and setters
}

List<Person> bookList = new ArrayList<>();
bookList.add(new Person("jack","18163138123"));
bookList.add(new Person("martin",null));
// 空指针异常
bookList.stream().collect(Collectors.toMap(Person::getName, Person::getPhoneNumber));
```

下面我们来解释一下原因。

首先，我们来看 `java.util.stream.Collectors` 类的 `toMap()` 方法 ，可以看到其内部调用了 `Map` 接口的 `merge()` 方法。

```
public static <T, K, U, M extends Map<K, U>>
Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper,
                            Function<? super T, ? extends U> valueMapper,
                            BinaryOperator<U> mergeFunction,
                            Supplier<M> mapSupplier) {
    BiConsumer<M, T> accumulator
            = (map, element) -> map.merge(keyMapper.apply(element),
                                          valueMapper.apply(element), mergeFunction);
    return new CollectorImpl<>(mapSupplier, accumulator, mapMerger(mergeFunction), CH_ID);
}
```

`Map` 接口的 `merge()` 方法如下，这个方法是接口中的默认实现。

> 如果你还不了解 Java 8 新特性的话，请看这篇文章：[《Java8 新特性总结》](https://mp.weixin.qq.com/s/ojyl7B6PiHaTWADqmUq2rw) 。

```
default V merge(K key, V value,
        BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
    Objects.requireNonNull(remappingFunction);
    Objects.requireNonNull(value);
    V oldValue = get(key);
    V newValue = (oldValue == null) ? value :
               remappingFunction.apply(oldValue, value);
    if(newValue == null) {
        remove(key);
    } else {
        put(key, newValue);
    }
    return newValue;
}
```

`merge()` 方法会先调用 `Objects.requireNonNull()` 方法判断 value 是否为空。

```
public static <T> T requireNonNull(T obj) {
    if (obj == null)
        throw new NullPointerException();
    return obj;
}
```

## 集合遍历

《阿里巴巴 Java 开发手册》的描述如下：

> **不要在 foreach 循环里进行元素的 `remove/add` 操作。remove 元素请使用 `Iterator` 方式，如果并发操作，需要对 `Iterator` 对象加锁。**

通过反编译你会发现 foreach 语法底层其实还是依赖 `Iterator` 。不过， `remove/add` 操作直接调用的是集合自己的方法，而不是 `Iterator` 的 `remove/add`方法

这就导致 `Iterator` 莫名其妙地发现自己有元素被 `remove/add` ，然后，它就会抛出一个 `ConcurrentModificationException` 来提示用户发生了并发修改异常。这就是单线程状态下产生的 **fail-fast 机制**。

> **fail-fast 机制**：多个线程对 fail-fast 集合进行修改的时候，可能会抛出`ConcurrentModificationException`。 即使是单线程下也有可能会出现这种情况，上面已经提到过。
>
> 相关阅读：[什么是 fail-fast](https://www.cnblogs.com/54chensongxia/p/12470446.html) 。

Java8 开始，可以使用 `Collection#removeIf()`方法删除满足特定条件的元素，如

```
List<Integer> list = new ArrayList<>();
for (int i = 1; i <= 10; ++i) {
    list.add(i);
}
list.removeIf(filter -> filter % 2 == 0); /* 删除 list 中的所有偶数 */
System.out.println(list); /* [1, 3, 5, 7, 9] */
```

除了上面介绍的直接使用 `Iterator` 进行遍历操作之外，你还可以：

- 使用普通的 for 循环
- 使用 fail-safe 的集合类。`java.util`包下面的所有的集合类都是 fail-fast 的，而`java.util.concurrent`包下面的所有的类都是 fail-safe 的。
- ……

## 集合去重

《阿里巴巴 Java 开发手册》的描述如下：

> **可以利用 `Set` 元素唯一的特性，可以快速对一个集合进行去重操作，避免使用 `List` 的 `contains()` 进行遍历去重或者判断包含操作。**

这里我们以 `HashSet` 和 `ArrayList` 为例说明。

```
// Set 去重代码示例
public static <T> Set<T> removeDuplicateBySet(List<T> data) {

    if (CollectionUtils.isEmpty(data)) {
        return new HashSet<>();
    }
    return new HashSet<>(data);
}

// List 去重代码示例
public static <T> List<T> removeDuplicateByList(List<T> data) {

    if (CollectionUtils.isEmpty(data)) {
        return new ArrayList<>();

    }
    List<T> result = new ArrayList<>(data.size());
    for (T current : data) {
        if (!result.contains(current)) {
            result.add(current);
        }
    }
    return result;
}
```

两者的核心差别在于 `contains()` 方法的实现。

`HashSet` 的 `contains()` 方法底部依赖的 `HashMap` 的 `containsKey()` 方法，时间复杂度接近于 O（1）（没有出现哈希冲突的时候为 O（1））。

```
private transient HashMap<E,Object> map;
public boolean contains(Object o) {
    return map.containsKey(o);
}
```

我们有 N 个元素插入进 Set 中，那时间复杂度就接近是 O (n)。

`ArrayList` 的 `contains()` 方法是通过遍历所有元素的方法来做的，时间复杂度接近是 O(n)。

```
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

## 集合转数组

《阿里巴巴 Java 开发手册》的描述如下：

> **使用集合转数组的方法，必须使用集合的 `toArray(T[] array)`，传入的是类型完全一致、长度为 0 的空数组。**

`toArray(T[] array)` 方法的参数是一个泛型数组，如果 `toArray` 方法中没有传递任何参数的话返回的是 `Object`类 型数组。

```java
String [] s= new String[]{
    "dog", "lazy", "a", "over", "jumps", "fox", "brown", "quick", "A"
};
List<String> list = Arrays.asList(s);
Collections.reverse(list);
//没有指定类型的话会报错
s=list.toArray(new String[0]);
```

由于 JVM 优化，`new String[0]`作为`Collection.toArray()`方法的参数现在使用更好，`new String[0]`就是起一个模板的作用，指定了返回数组的类型，0 是为了节省空间，因为它只是为了说明返回的类型。详见：https://shipilev.net/blog/2016/arrays-wisdom-ancients/

## 使用 Arrays.asList 有什么注意点？

《阿里巴巴 Java 开发手册》的描述如下：

> **使用工具类 `Arrays.asList()` 把数组转换成集合时，不能使用其修改集合相关的方法， 它的 `add/remove/clear` 方法会抛出 `UnsupportedOperationException` 异常。**

**不能直接使用 Arrays.asList 来转换基本类型数组**

```java
// ❌ 错误：基本类型数组会被视为单个元素
int[] intArray = {1, 2, 3};
List<int[]> wrongList = Arrays.asList(intArray);  // List<int[]> 不是 List<Integer>
System.out.println(wrongList.size());  // 输出 1（整个数组作为一个元素）

// ✔️ 正确：使用包装类型或流
Integer[] integerArray = {1, 2, 3};
List<Integer> correctList = Arrays.asList(integerArray);  // 正常：3个元素

// ✔️ Java 8+ 替代方案
List<Integer> streamList = Arrays.stream(intArray)
                                  .boxed()
                                  .collect(Collectors.toList());
```

**使用集合的修改方法：add()、remove()、clear()会抛出异常**

Arrays.asList 返回的 List 并不是我们期望的 java.util.ArrayList，而是 Arrays 的内部类。

这个内部类继承自 AbstractList 类，但没有覆写父类的 add、remove、clear 方法，而父类中的这几个方法默认会抛出 UnsupportedOperationException。

```java
// ❌ 不是真正的 ArrayList
List<String> list = Arrays.asList("A", "B", "C");
list.add("D");  // 抛出 UnsupportedOperationException
list.remove(0); // 同样抛出异常
```

正确做法是：

【示例】使用 `new ArrayList<>(Arrays.asList(...))`

```java
// ✔️ 正确模式：创建真正的可变列表
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
list.add("D");  // 正常执行
```

【示例】使用 Java8 的 Stream

```
// ✔️ 正确模式（Java8+）：Stream
Integer [] myArray = { 1, 2, 3 };
List myList = Arrays.stream(myArray).collect(Collectors.toList());
// 基本类型也可以实现转换（依赖 boxed 的装箱操作）
int [] myArray2 = { 1, 2, 3 };
List myList = Arrays.stream(myArray2).boxed().collect(Collectors.toList());
```

【示例】使用 Lists.newArrayList

对于可变集合，你可以使用 [`Lists`](https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/Lists.java) 类及其 [`newArrayList()`](https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/Lists.java#L87) 工厂方法：

```java
List<String> l1 = Lists.newArrayList(anotherListOrCollection);    // from collection
List<String> l2 = Lists.newArrayList(aStringArray);               // from array
List<String> l3 = Lists.newArrayList("or", "string", "elements"); // from varargs
```

【示例】使用 Java9 的 `List.of()`方法

```java
Integer[] array = {1, 2, 3};
List<Integer> list = List.of(array);
```

【示例】使用 Guava

对于不可变集合，你可以使用 [`ImmutableList`](https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java) 类及其 [`of()`](https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java#L101) 与 [`copyOf()`](https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java#L225) 工厂方法：（参数不能为空）

```java
List<String> il = ImmutableList.of("string", "elements");  // from varargs
List<String> il = ImmutableList.copyOf(aStringArray);      // from array
```

【示例】使用 Apache Commons Collections

```java
List<String> list = new ArrayList<String>();
CollectionUtils.addAll(list, str);
```

## 使用 List.subList 有什么注意点？

**List.subList 使用陷阱**

`List.subList` 返回的子 List 不是一个普通的 ArrayList，即**不是副本，是视图**。

子 List 和原 List 共享底层数据，会和原始 List 相互影响。如果不注意，很可能会因此产生 OOM 问题。

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
List<String> sub = list.subList(1, 3);  // [B, C]
// ❌ 常见误解：创建了独立副本
// ✔️ 实际：sub 是 list 的"视图窗口"，共享底层数据
```

【示例】结构修改异常（ConcurrentModificationException）

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
List<String> sub = list.subList(0, 2);

list.add("D");  // 🔴 修改原列表结构
System.out.println(sub.get(0));  // 立即抛出 ConcurrentModificationException
```

【示例】作用范围陷阱

```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
List<String> sub = list.subList(1, 3);  // sub: [B, C]

sub.add("X");
// sub: [B, C, X]
// list: [A, B, C, X, D]

sub.remove(0);
// sub: [C, X]
// list: [A, C, X, D]
```

**List.subList 正确使用模式**

```java
// 需要长期持有或独立修改
List<String> independentCopy = new ArrayList<>(list.subList(100, 200));

// 或使用流（Java 8+）
List<String> streamCopy = list.stream()
                               .skip(100)
                               .limit(100)
                               .collect(Collectors.toList());
```

