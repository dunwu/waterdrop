import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as n,b as e,d as a,e as i}from"./app-7c7efa3d.js";const d={},r=i(`<h1 id="java-容器面试三" tabindex="-1"><a class="header-anchor" href="#java-容器面试三" aria-hidden="true">#</a> Java 容器面试三</h1><h2 id="java-容器工具类" tabindex="-1"><a class="header-anchor" href="#java-容器工具类" aria-hidden="true">#</a> Java 容器工具类</h2><p><strong><code>Collections</code> 工具类常用方法</strong>:</p><ul><li>排序</li><li>查找，替换操作</li><li>同步控制（不推荐，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合）</li></ul><h3 id="排序操作" tabindex="-1"><a class="header-anchor" href="#排序操作" aria-hidden="true">#</a> 排序操作</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void reverse(List list)//反转
void shuffle(List list)//随机排序
void sort(List list)//按自然排序的升序排序
void sort(List list, Comparator c)//定制排序，由 Comparator 控制排序逻辑
void swap(List list, int i , int j)//交换两个索引位置的元素
void rotate(List list, int distance)//旋转。当 distance 为正数时，将 list 后 distance 个元素整体移到前面。当 distance 为负数时，将 list 的前 distance 个元素整体移到后面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查找-替换操作" tabindex="-1"><a class="header-anchor" href="#查找-替换操作" aria-hidden="true">#</a> 查找，替换操作</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int binarySearch(List list, Object key)//对 List 进行二分查找，返回索引，注意 List 必须是有序的
int max(Collection coll)//根据元素的自然顺序，返回最大的元素。 类比 int min(Collection coll)
int max(Collection coll, Comparator c)//根据定制排序，返回最大元素，排序规则由 Comparatator 类控制。类比 int min(Collection coll, Comparator c)
void fill(List list, Object obj)//用指定的元素代替指定 list 中的所有元素
int frequency(Collection c, Object o)//统计元素出现次数
int indexOfSubList(List list, List target)//统计 target 在 list 中第一次出现的索引，找不到则返回-1，类比 int lastIndexOfSubList(List source, list target)
boolean replaceAll(List list, Object oldVal, Object newVal)//用新元素替换旧元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同步控制" tabindex="-1"><a class="header-anchor" href="#同步控制" aria-hidden="true">#</a> 同步控制</h3><p><code>Collections</code> 提供了多个<code>synchronizedXxx()</code>方法·，该方法可以将指定集合包装成线程同步的集合，从而解决多线程并发访问集合时的线程安全问题。</p><p>我们知道 <code>HashSet</code>，<code>TreeSet</code>，<code>ArrayList</code>,<code>LinkedList</code>,<code>HashMap</code>,<code>TreeMap</code> 都是线程不安全的。<code>Collections</code> 提供了多个静态方法可以把他们包装成线程同步的集合。</p><p><strong>最好不要用下面这些方法，效率非常低，需要线程安全的集合类型时请考虑使用 JUC 包下的并发集合。</strong></p><p>方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>synchronizedCollection(Collection&lt;T&gt;  c) //返回指定 collection 支持的同步（线程安全的）collection。
synchronizedList(List&lt;T&gt; list)//返回指定列表支持的同步（线程安全的）List。
synchronizedMap(Map&lt;K,V&gt; m) //返回由指定映射支持的同步（线程安全的）Map。
synchronizedSet(Set&lt;T&gt; s) //返回指定 set 支持的同步（线程安全的）set。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集合判空" tabindex="-1"><a class="header-anchor" href="#集合判空" aria-hidden="true">#</a> 集合判空</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>判断所有集合内部的元素是否为空，使用 <code>isEmpty()</code> 方法，而不是 <code>size()==0</code> 的方式。</strong></p></blockquote><p>这是因为 <code>isEmpty()</code> 方法的可读性更好，并且时间复杂度为 O(1)。</p><p>绝大部分我们使用的集合的 <code>size()</code> 方法的时间复杂度也是 O(1)，不过，也有很多复杂度不是 O(1) 的，比如 <code>java.util.concurrent</code> 包下的某些集合（<code>ConcurrentLinkedQueue</code>、<code>ConcurrentHashMap</code>...）。</p><p>下面是 <code>ConcurrentHashMap</code> 的 <code>size()</code> 方法和 <code>isEmpty()</code> 方法的源码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int size() {
    long n = sumCount();
    return ((n &lt; 0L) ? 0 :
            (n &gt; (long)Integer.MAX_VALUE) ? Integer.MAX_VALUE :
            (int)n);
}
final long sumCount() {
    CounterCell[] as = counterCells; CounterCell a;
    long sum = baseCount;
    if (as != null) {
        for (int i = 0; i &lt; as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;
        }
    }
    return sum;
}
public boolean isEmpty() {
    return sumCount() &lt;= 0L; // ignore transient negative values
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集合转-map" tabindex="-1"><a class="header-anchor" href="#集合转-map" aria-hidden="true">#</a> 集合转 Map</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>在使用 <code>java.util.stream.Collectors</code> 类的 <code>toMap()</code> 方法转为 <code>Map</code> 集合时，一定要注意当 value 为 null 时会抛 NPE 异常。</strong></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Person {
    private String name;
    private String phoneNumber;
     // getters and setters
}

List&lt;Person&gt; bookList = new ArrayList&lt;&gt;();
bookList.add(new Person(&quot;jack&quot;,&quot;18163138123&quot;));
bookList.add(new Person(&quot;martin&quot;,null));
// 空指针异常
bookList.stream().collect(Collectors.toMap(Person::getName, Person::getPhoneNumber));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们来解释一下原因。</p><p>首先，我们来看 <code>java.util.stream.Collectors</code> 类的 <code>toMap()</code> 方法 ，可以看到其内部调用了 <code>Map</code> 接口的 <code>merge()</code> 方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static &lt;T, K, U, M extends Map&lt;K, U&gt;&gt;
Collector&lt;T, ?, M&gt; toMap(Function&lt;? super T, ? extends K&gt; keyMapper,
                            Function&lt;? super T, ? extends U&gt; valueMapper,
                            BinaryOperator&lt;U&gt; mergeFunction,
                            Supplier&lt;M&gt; mapSupplier) {
    BiConsumer&lt;M, T&gt; accumulator
            = (map, element) -&gt; map.merge(keyMapper.apply(element),
                                          valueMapper.apply(element), mergeFunction);
    return new CollectorImpl&lt;&gt;(mapSupplier, accumulator, mapMerger(mergeFunction), CH_ID);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Map</code> 接口的 <code>merge()</code> 方法如下，这个方法是接口中的默认实现。</p>`,29),u={href:"https://mp.weixin.qq.com/s/ojyl7B6PiHaTWADqmUq2rw",target:"_blank",rel:"noopener noreferrer"},p=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>default V merge(K key, V value,
        BiFunction&lt;? super V, ? super V, ? extends V&gt; remappingFunction) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>merge()</code> 方法会先调用 <code>Objects.requireNonNull()</code> 方法判断 value 是否为空。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static &lt;T&gt; T requireNonNull(T obj) {
    if (obj == null)
        throw new NullPointerException();
    return obj;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集合遍历" tabindex="-1"><a class="header-anchor" href="#集合遍历" aria-hidden="true">#</a> 集合遍历</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>不要在 foreach 循环里进行元素的 <code>remove/add</code> 操作。remove 元素请使用 <code>Iterator</code> 方式，如果并发操作，需要对 <code>Iterator</code> 对象加锁。</strong></p></blockquote><p>通过反编译你会发现 foreach 语法底层其实还是依赖 <code>Iterator</code> 。不过， <code>remove/add</code> 操作直接调用的是集合自己的方法，而不是 <code>Iterator</code> 的 <code>remove/add</code>方法</p><p>这就导致 <code>Iterator</code> 莫名其妙地发现自己有元素被 <code>remove/add</code> ，然后，它就会抛出一个 <code>ConcurrentModificationException</code> 来提示用户发生了并发修改异常。这就是单线程状态下产生的 <strong>fail-fast 机制</strong>。</p>`,8),v=n("p",null,[n("strong",null,"fail-fast 机制"),e("：多个线程对 fail-fast 集合进行修改的时候，可能会抛出"),n("code",null,"ConcurrentModificationException"),e("。 即使是单线程下也有可能会出现这种情况，上面已经提到过。")],-1),m={href:"https://www.cnblogs.com/54chensongxia/p/12470446.html",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>Java8 开始，可以使用 <code>Collection#removeIf()</code>方法删除满足特定条件的元素，如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;Integer&gt; list = new ArrayList&lt;&gt;();
for (int i = 1; i &lt;= 10; ++i) {
    list.add(i);
}
list.removeIf(filter -&gt; filter % 2 == 0); /* 删除 list 中的所有偶数 */
System.out.println(list); /* [1, 3, 5, 7, 9] */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了上面介绍的直接使用 <code>Iterator</code> 进行遍历操作之外，你还可以：</p><ul><li>使用普通的 for 循环</li><li>使用 fail-safe 的集合类。<code>java.util</code>包下面的所有的集合类都是 fail-fast 的，而<code>java.util.concurrent</code>包下面的所有的类都是 fail-safe 的。</li><li>……</li></ul><h2 id="集合去重" tabindex="-1"><a class="header-anchor" href="#集合去重" aria-hidden="true">#</a> 集合去重</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>可以利用 <code>Set</code> 元素唯一的特性，可以快速对一个集合进行去重操作，避免使用 <code>List</code> 的 <code>contains()</code> 进行遍历去重或者判断包含操作。</strong></p></blockquote><p>这里我们以 <code>HashSet</code> 和 <code>ArrayList</code> 为例说明。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Set 去重代码示例
public static &lt;T&gt; Set&lt;T&gt; removeDuplicateBySet(List&lt;T&gt; data) {

    if (CollectionUtils.isEmpty(data)) {
        return new HashSet&lt;&gt;();
    }
    return new HashSet&lt;&gt;(data);
}

// List 去重代码示例
public static &lt;T&gt; List&lt;T&gt; removeDuplicateByList(List&lt;T&gt; data) {

    if (CollectionUtils.isEmpty(data)) {
        return new ArrayList&lt;&gt;();

    }
    List&lt;T&gt; result = new ArrayList&lt;&gt;(data.size());
    for (T current : data) {
        if (!result.contains(current)) {
            result.add(current);
        }
    }
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两者的核心差别在于 <code>contains()</code> 方法的实现。</p><p><code>HashSet</code> 的 <code>contains()</code> 方法底部依赖的 <code>HashMap</code> 的 <code>containsKey()</code> 方法，时间复杂度接近于 O（1）（没有出现哈希冲突的时候为 O（1））。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private transient HashMap&lt;E,Object&gt; map;
public boolean contains(Object o) {
    return map.containsKey(o);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有 N 个元素插入进 Set 中，那时间复杂度就接近是 O (n)。</p><p><code>ArrayList</code> 的 <code>contains()</code> 方法是通过遍历所有元素的方法来做的，时间复杂度接近是 O(n)。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public boolean contains(Object o) {
    return indexOf(o) &gt;= 0;
}
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i &lt; size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i &lt; size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集合转数组" tabindex="-1"><a class="header-anchor" href="#集合转数组" aria-hidden="true">#</a> 集合转数组</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>使用集合转数组的方法，必须使用集合的 <code>toArray(T[] array)</code>，传入的是类型完全一致、长度为 0 的空数组。</strong></p></blockquote><p><code>toArray(T[] array)</code> 方法的参数是一个泛型数组，如果 <code>toArray</code> 方法中没有传递任何参数的话返回的是 <code>Object</code>类 型数组。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String [] s= new String[]{
    &quot;dog&quot;, &quot;lazy&quot;, &quot;a&quot;, &quot;over&quot;, &quot;jumps&quot;, &quot;fox&quot;, &quot;brown&quot;, &quot;quick&quot;, &quot;A&quot;
};
List&lt;String&gt; list = Arrays.asList(s);
Collections.reverse(list);
//没有指定类型的话会报错
s=list.toArray(new String[0]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),g=n("code",null,"new String[0]",-1),k=n("code",null,"Collection.toArray()",-1),h=n("code",null,"new String[0]",-1),x={href:"https://shipilev.net/blog/2016/arrays-wisdom-ancients/",target:"_blank",rel:"noopener noreferrer"},L=i(`<h2 id="数组转集合" tabindex="-1"><a class="header-anchor" href="#数组转集合" aria-hidden="true">#</a> 数组转集合</h2><p>《阿里巴巴 Java 开发手册》的描述如下：</p><blockquote><p><strong>使用工具类 <code>Arrays.asList()</code> 把数组转换成集合时，不能使用其修改集合相关的方法， 它的 <code>add/remove/clear</code> 方法会抛出 <code>UnsupportedOperationException</code> 异常。</strong></p></blockquote><p>我在之前的一个项目中就遇到一个类似的坑。</p><p><code>Arrays.asList()</code>在平时开发中还是比较常见的，我们可以使用它将一个数组转换为一个 <code>List</code> 集合。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String[] myArray = {&quot;Apple&quot;, &quot;Banana&quot;, &quot;Orange&quot;};
List&lt;String&gt; myList = Arrays.asList(myArray);
//上面两个语句等价于下面一条语句
List&lt;String&gt; myList = Arrays.asList(&quot;Apple&quot;,&quot;Banana&quot;, &quot;Orange&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JDK 源码对于这个方法的说明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
  *返回由指定数组支持的固定大小的列表。此方法作为基于数组和基于集合的 API 之间的桥梁，
  * 与 Collection.toArray() 结合使用。返回的 List 是可序列化并实现 RandomAccess 接口。
  */
public static &lt;T&gt; List&lt;T&gt; asList(T... a) {
    return new ArrayList&lt;&gt;(a);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们来总结一下使用注意事项。</p><p><strong>问题一、不能直接使用 Arrays.asList 来转换基本类型数组</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">List</span> list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;list:{} size:{} class:{}&quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，通过 <code>Arrays.asList</code> 将 <code>int[]</code> 数组初始化为 <code>List</code> 后。这个<code>List</code> 包含的其实是一个 <code>int</code> 数组，整个 <code>List</code> 的元素个数是 1，元素类型是整数数组。</p><p>其原因是，只能是把 int 装箱为 Integer，不可能把 int 数组装箱为 Integer 数组。我们知 道，Arrays.asList 方法传入的是一个泛型 T 类型可变参数，最终 int 数组整体作为了一个 对象成为了泛型类型 T</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">asList</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接遍历这样的 List 必然会出现 Bug。</p><p><strong>问题二、使用集合的修改方法：<code>add()</code>、<code>remove()</code>、<code>clear()</code>会抛出异常。</strong></p><p>Arrays.asList 返回的 List 并不是我们期望的 java.util.ArrayList，而是 Arrays 的内部类。这个内部类继承自 AbstractList 类，但没有覆写父类的 add、remove、clear 方法，而父类中的这几个方法默认会抛出 UnsupportedOperationException。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">List</span> list <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//运行时报错：UnsupportedOperationException</span>
list<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//运行时报错：UnsupportedOperationException</span>
list<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//运行时报错：UnsupportedOperationException</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下图是 <code>java.util.Arrays$ArrayList</code> 的简易源码，我们可以看到这个类重写的方法有哪些。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  private static class ArrayList&lt;E&gt; extends AbstractList&lt;E&gt;
        implements RandomAccess, java.io.Serializable
    {
        ...

        @Override
        public E get(int index) {
          ...
        }

        @Override
        public E set(int index, E element) {
          ...
        }

        @Override
        public int indexOf(Object o) {
          ...
        }

        @Override
        public boolean contains(Object o) {
           ...
        }

        @Override
        public void forEach(Consumer&lt;? super E&gt; action) {
          ...
        }

        @Override
        public void replaceAll(UnaryOperator&lt;E&gt; operator) {
          ...
        }

        @Override
        public void sort(Comparator&lt;? super E&gt; c) {
          ...
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再看一下<code>java.util.AbstractList</code>的 <code>add/remove/clear</code> 方法就知道为什么会抛出 <code>UnsupportedOperationException</code> 了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public E remove(int index) {
    throw new UnsupportedOperationException();
}
public boolean add(E e) {
    add(size(), e);
    return true;
}
public void add(int index, E element) {
    throw new UnsupportedOperationException();
}

public void clear() {
    removeRange(0, size());
}
protected void removeRange(int fromIndex, int toIndex) {
    ListIterator&lt;E&gt; it = listIterator(fromIndex);
    for (int i=0, n=toIndex-fromIndex; i&lt;n; i++) {
        it.next();
        it.remove();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>那我们如何正确的将数组转换为 <code>ArrayList</code> ?</strong></p><p>1、手动实现工具类</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//JDK1.5+
static &lt;T&gt; List&lt;T&gt; arrayToList(final T[] array) {
  final List&lt;T&gt; l = new ArrayList&lt;T&gt;(array.length);

  for (final T s : array) {
    l.add(s);
  }
  return l;
}

Integer [] myArray = { 1, 2, 3 };
System.out.println(arrayToList(myArray).getClass());//class java.util.ArrayList
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、最简便的方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List list = new ArrayList&lt;&gt;(Arrays.asList(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、使用 Java8 的 <code>Stream</code>（推荐）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Integer [] myArray = { 1, 2, 3 };
List myList = Arrays.stream(myArray).collect(Collectors.toList());
//基本类型也可以实现转换（依赖 boxed 的装箱操作）
int [] myArray2 = { 1, 2, 3 };
List myList = Arrays.stream(myArray2).boxed().collect(Collectors.toList());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、使用 Guava</p>`,30),y={href:"https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"ImmutableList",-1),q={href:"https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java#L101",target:"_blank",rel:"noopener noreferrer"},A=n("code",null,"of()",-1),_={href:"https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/ImmutableList.java#L225",target:"_blank",rel:"noopener noreferrer"},w=n("code",null,"copyOf()",-1),C=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;String&gt; il = ImmutableList.of(&quot;string&quot;, &quot;elements&quot;);  // from varargs
List&lt;String&gt; il = ImmutableList.copyOf(aStringArray);      // from array
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),O={href:"https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/Lists.java",target:"_blank",rel:"noopener noreferrer"},j=n("code",null,"Lists",-1),S={href:"https://github.com/google/guava/blob/master/guava/src/com/google/common/collect/Lists.java#L87",target:"_blank",rel:"noopener noreferrer"},I=n("code",null,"newArrayList()",-1),T=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;String&gt; l1 = Lists.newArrayList(anotherListOrCollection);    // from collection
List&lt;String&gt; l2 = Lists.newArrayList(aStringArray);               // from array
List&lt;String&gt; l3 = Lists.newArrayList(&quot;or&quot;, &quot;string&quot;, &quot;elements&quot;); // from varargs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、使用 Apache Commons Collections</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;String&gt; list = new ArrayList&lt;String&gt;();
CollectionUtils.addAll(list, str);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>6、 使用 Java9 的 <code>List.of()</code>方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Integer[] array = {1, 2, 3};
List&lt;Integer&gt; list = List.of(array);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-list-sublist-进行切片操作居然会导致-oom" tabindex="-1"><a class="header-anchor" href="#使用-list-sublist-进行切片操作居然会导致-oom" aria-hidden="true">#</a> 使用 List.subList 进行切片操作居然会导致 OOM</h2><p>List.subList 返回的子 List 不是一个普通的 ArrayList。这个子 List 可以认为是原始 List 的视图，会和原始 List 相互影响。如果不注意，很可能会因此产生 OOM 问题。</p><p>如下代码所示，定义一个名为 data 的静态 List 来存放 Integer 的 List，[也就是说 data 的成员本身是包含了多个数字的 List。循环 1000 次，每次都从一个具有 10 万个 Integer 的 List 中，使用 subList 方法获得一个只包含一个数字的子 List，并把这个子 List 加入 data 变量：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">oom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> rawList <span class="token operator">=</span> <span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">rangeClosed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">boxed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        data<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>rawList<span class="token punctuation">.</span><span class="token function">subList</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出现 OOM 的原因是，循环中的 1000 个具有 10 万个元素的 List 始终得不到回收，因为它始终被 subList 方法返回的 List 强引用。</p>`,10);function E(M,V){const s=l("ExternalLinkIcon");return c(),o("div",null,[r,n("blockquote",null,[n("p",null,[e("如果你还不了解 Java 8 新特性的话，请看这篇文章："),n("a",u,[e("《Java8 新特性总结》"),a(s)]),e(" 。")])]),p,n("blockquote",null,[v,n("p",null,[e("相关阅读："),n("a",m,[e("什么是 fail-fast"),a(s)]),e(" 。")])]),b,n("p",null,[e("由于 JVM 优化，"),g,e("作为"),k,e("方法的参数现在使用更好，"),h,e("就是起一个模板的作用，指定了返回数组的类型，0 是为了节省空间，因为它只是为了说明返回的类型。详见："),n("a",x,[e("https://shipilev.net/blog/2016/arrays-wisdom-ancients/"),a(s)])]),L,n("p",null,[e("对于不可变集合，你可以使用 "),n("a",y,[f,a(s)]),e(" 类及其 "),n("a",q,[A,a(s)]),e(" 与 "),n("a",_,[w,a(s)]),e(" 工厂方法：（参数不能为空）")]),C,n("p",null,[e("对于可变集合，你可以使用 "),n("a",O,[j,a(s)]),e(" 类及其 "),n("a",S,[I,a(s)]),e(" 工厂方法：")]),T])}const J=t(d,[["render",E],["__file","index.html.vue"]]);export{J as default};
