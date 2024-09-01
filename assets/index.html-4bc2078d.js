import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-e28e8a51.js";const t={},e=p(`<h1 id="《java-并发编程实战》笔记三" tabindex="-1"><a class="header-anchor" href="#《java-并发编程实战》笔记三" aria-hidden="true">#</a> 《Java 并发编程实战》笔记三</h1><h2 id="immutability-模式-如何利用不变性解决并发问题" tabindex="-1"><a class="header-anchor" href="#immutability-模式-如何利用不变性解决并发问题" aria-hidden="true">#</a> Immutability 模式：如何利用不变性解决并发问题？</h2><p>解决并发问题，其实最简单的办法就是让共享变量只有读操作，而没有写操作。这个办法如此重要，以至于被上升到了一种解决并发问题的设计模式：<strong>不变性（Immutability）模式</strong>。所谓<strong>不变性，简单来讲，就是对象一旦被创建之后，状态就不再发生变化</strong>。换句话说，就是变量一旦被赋值，就不允许修改了（没有写操作）；没有修改操作，也就是保持了不变性。</p><h3 id="快速实现具备不可变性的类" tabindex="-1"><a class="header-anchor" href="#快速实现具备不可变性的类" aria-hidden="true">#</a> 快速实现具备不可变性的类</h3><p><strong>将一个类所有的属性都设置成 final 的，并且只允许存在只读方法，那么这个类基本上就具备不可变性了</strong>。更严格的做法是<strong>这个类本身也是 final 的</strong>，也就是不允许继承。因为子类可以覆盖父类的方法，有可能改变不可变性。</p><p>经常用到的 String 和 Long、Integer、Double 等基础类型的包装类都具备不可变性，这些对象的线程安全性都是靠不可变性来保证的。它们都严格遵守不可变类的三点要求：<strong>类和属性都是 final 的，所有方法均是只读的</strong>。</p><p>Java 的 String 方法也有类似字符替换操作，怎么能说所有方法都是只读的呢？下面的示例代码源自 Java 1.8 SDK，仅保留了关键属性 value[] 和 replace() 方法，你会发现：String 这个类以及它的属性 value[] 都是 final 的；而 replace() 方法的实现，就的确没有修改 value[]，而是将替换后的字符串作为返回值返回了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">String</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">char</span> value<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 字符替换</span>
  <span class="token class-name">String</span> <span class="token function">replace</span><span class="token punctuation">(</span><span class="token keyword">char</span> oldChar<span class="token punctuation">,</span>
      <span class="token keyword">char</span> newChar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//无需替换，直接返回 this</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldChar <span class="token operator">==</span> newChar<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> len <span class="token operator">=</span> value<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">/* avoid getfield opcode */</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> val <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token comment">//定位到需要替换的字符位置</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">++</span>i <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>val<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> oldChar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//未找到 oldChar，无需替换</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//创建一个 buf[]，这是关键</span>
    <span class="token comment">//用来保存替换后的字符串</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>len<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      buf<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">char</span> c <span class="token operator">=</span> val<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      buf<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> oldChar<span class="token punctuation">)</span> <span class="token operator">?</span>
        newChar <span class="token operator">:</span> c<span class="token punctuation">;</span>
      i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//创建一个新的字符串返回</span>
    <span class="token comment">//原字符串不会发生任何变化</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="利用享元模式避免创建重复对象" tabindex="-1"><a class="header-anchor" href="#利用享元模式避免创建重复对象" aria-hidden="true">#</a> 利用享元模式避免创建重复对象</h3><p>**享元模式（Flyweight Pattern）可以减少创建对象的数量，从而减少内存占用。**Java 语言里面 Long、Integer、Short、Byte 等这些基本数据类型的包装类都用到了享元模式。</p><p>享元模式本质上其实就是一个<strong>对象池</strong>，利用享元模式创建对象的逻辑也很简单：创建之前，首先去对象池里看看是不是存在；如果已经存在，就利用对象池里的对象；如果不存在，就会新创建一个对象，并且把这个新创建出来的对象放进对象池里。</p><p>Long 这个类并没有照搬享元模式，Long 内部维护了一个静态的对象池，仅缓存了 [-128,127] 之间的数字，这个对象池在 JVM 启动的时候就创建好了，而且这个对象池一直都不会变化，也就是说它是静态的。之所以采用这样的设计，是因为 Long 这个对象的状态共有 2^64 种，实在太多，不宜全部缓存，而 [-128,127] 之间的数字利用率最高。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Long</span> <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token keyword">long</span> l<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> offset <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
  <span class="token comment">// [-128,127] 直接的数字做了缓存</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">&gt;=</span> <span class="token operator">-</span><span class="token number">128</span> <span class="token operator">&amp;&amp;</span> l <span class="token operator">&lt;=</span> <span class="token number">127</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">LongCache</span>
      <span class="token punctuation">.</span>cache<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>l <span class="token operator">+</span> offset<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//缓存，等价于对象池</span>
<span class="token comment">//仅缓存 [-128,127] 直接的数字</span>
<span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LongCache</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Long</span> cache<span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">128</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">127</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>cache<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
      cache<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Long</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本上所有的基础类型的包装类都不适合做锁，因为它们内部用到了享元模式，这会导致看上去私有的锁，其实是共有的。例如在下面代码中，本意是 A 用锁 al，B 用锁 bl，各自管理各自的，互不影响。但实际上 al 和 bl 是一个对象，结果 A 和 B 共用的是一把锁。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token class-name">Long</span> al<span class="token operator">=</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>al<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//省略代码无数</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span>
  <span class="token class-name">Long</span> bl<span class="token operator">=</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setBY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>bl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//省略代码无数</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-immutability-式的注意事项" tabindex="-1"><a class="header-anchor" href="#使用-immutability-式的注意事项" aria-hidden="true">#</a> 使用 Immutability 式的注意事项</h3><p>在使用 Immutability 模式的时候，需要注意以下两点：</p><ol><li>对象的所有属性都是 final 的，并不能保证不可变性；</li><li>不可变对象也需要正确发布。</li></ol><p>在 Java 语言中，final 修饰的属性一旦被赋值，就不可以再修改，但是如果属性的类型是普通对象，那么这个普通对象的属性是可以被修改的。例如下面的代码中，Bar 的属性 foo 虽然是 final 的，依然可以通过 setAge() 方法来设置 foo 的属性 age。所以，<strong>在使用 Immutability 模式的时候一定要确认保持不变性的边界在哪里，是否要求属性对象也具备不可变性</strong>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span><span class="token punctuation">{</span>
  <span class="token keyword">int</span> age<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> name<span class="token operator">=</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Bar</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">Foo</span> foo<span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span><span class="token punctuation">{</span>
    foo<span class="token punctuation">.</span>age<span class="token operator">=</span>a<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们再看看如何正确地发布不可变对象。不可变对象虽然是线程安全的，但是并不意味着引用这些不可变对象的对象就是线程安全的。例如在下面的代码中，Foo 具备不可变性，线程安全，但是类 Bar 并不是线程安全的，类 Bar 中持有对 Foo 的引用 foo，对 foo 这个引用的修改在多线程中并不能保证可见性和原子性。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//Foo 线程安全</span>
<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Foo</span><span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> name<span class="token operator">=</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//Bar 线程不安全</span>
<span class="token keyword">class</span> <span class="token class-name">Bar</span> <span class="token punctuation">{</span>
  <span class="token class-name">Foo</span> foo<span class="token punctuation">;</span>
  <span class="token keyword">void</span> <span class="token function">setFoo</span><span class="token punctuation">(</span><span class="token class-name">Foo</span> f<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>foo<span class="token operator">=</span>f<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你的程序仅仅需要 foo 保持可见性，无需保证原子性，那么可以将 foo 声明为 volatile 变量，这样就能保证可见性。如果你的程序需要保证原子性，那么可以通过原子类来实现。下面的示例代码是合理库存的原子化实现，你应该很熟悉了，其中就是用原子类解决了不可变对象引用的原子性问题。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SafeWM</span> <span class="token punctuation">{</span>
  <span class="token keyword">class</span> <span class="token class-name">WMRange</span><span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> upper<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> lower<span class="token punctuation">;</span>
    <span class="token class-name">WMRange</span><span class="token punctuation">(</span><span class="token keyword">int</span> upper<span class="token punctuation">,</span><span class="token keyword">int</span> lower<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//省略构造函数实现</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">final</span> <span class="token class-name">AtomicReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">WMRange</span><span class="token punctuation">&gt;</span></span>
    rf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>
      <span class="token keyword">new</span> <span class="token class-name">WMRange</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 设置库存上限</span>
  <span class="token keyword">void</span> <span class="token function">setUpper</span><span class="token punctuation">(</span><span class="token keyword">int</span> v<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">WMRange</span> or <span class="token operator">=</span> rf<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 检查参数合法性</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>v <span class="token operator">&lt;</span> or<span class="token punctuation">.</span>lower<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token class-name">WMRange</span> nr <span class="token operator">=</span> <span class="token keyword">new</span>
          <span class="token class-name">WMRange</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> or<span class="token punctuation">.</span>lower<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>rf<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>or<span class="token punctuation">,</span> nr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>利用 Immutability 模式解决并发问题，也许你觉得有点陌生，其实你天天都在享受它的战果。Java 语言里面的 String 和 Long、Integer、Double 等基础类型的包装类都具备不可变性，这些对象的线程安全性都是靠不可变性来保证的。Immutability 模式是最简单的解决并发问题的方法，建议当你试图解决一个并发问题时，可以首先尝试一下 Immutability 模式，看是否能够快速解决。</p><p>具备不变性的对象，只有一种状态，这个状态由对象内部所有的不变属性共同决定。其实还有一种更简单的不变性对象，那就是<strong>无状态</strong>。无状态对象内部没有属性，只有方法。除了无状态的对象，你可能还听说过无状态的服务、无状态的协议等等。无状态有很多好处，最核心的一点就是性能。在多线程领域，无状态对象没有线程安全问题，无需同步处理，自然性能很好；在分布式领域，无状态意味着可以无限地水平扩展，所以分布式领域里面性能的瓶颈一定不是出在无状态的服务节点上。</p><h2 id="copy-on-write-模式-不是延时策略的-cow" tabindex="-1"><a class="header-anchor" href="#copy-on-write-模式-不是延时策略的-cow" aria-hidden="true">#</a> Copy-on-Write 模式：不是延时策略的 COW</h2><p>Copy-on-Write，经常被缩写为 COW 或者 CoW，顾名思义就是<strong>写时复制</strong>。</p><h3 id="copy-on-write-模式的应用领域" tabindex="-1"><a class="header-anchor" href="#copy-on-write-模式的应用领域" aria-hidden="true">#</a> Copy-on-Write 模式的应用领域</h3><p>CopyOnWriteArrayList 和 CopyOnWriteArraySet 这两个 Copy-on-Write 容器，它们背后的设计思想就是 Copy-on-Write；通过 Copy-on-Write 这两个容器实现的读操作是无锁的，由于无锁，所以将读操作的性能发挥到了极致。</p><p><strong>Copy-on-Write 最大的应用领域还是在函数式编程领域</strong>。函数式编程的基础是不可变性（Immutability），所以函数式编程里面所有的修改操作都需要 Copy-on-Write 来解决。</p><h3 id="一个真实案例" tabindex="-1"><a class="header-anchor" href="#一个真实案例" aria-hidden="true">#</a> 一个真实案例</h3><p>Router 的实现代码如下所示，是一种典型 Immutability 模式的实现，需要你注意的是我们重写了 equals 方法，这样 CopyOnWriteArraySet 的 add() 和 remove() 方法才能正常工作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//路由信息</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Router</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span>  ip<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> port<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span>  iface<span class="token punctuation">;</span>
  <span class="token comment">//构造函数</span>
  <span class="token keyword">public</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token class-name">String</span> ip<span class="token punctuation">,</span>
      <span class="token class-name">Integer</span> port<span class="token punctuation">,</span> <span class="token class-name">String</span> iface<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>ip <span class="token operator">=</span> ip<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>port <span class="token operator">=</span> port<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>iface <span class="token operator">=</span> iface<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//重写 equals 方法</span>
  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Router</span> r <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Router</span><span class="token punctuation">)</span>obj<span class="token punctuation">;</span>
      <span class="token keyword">return</span> iface<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>iface<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
             ip<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>ip<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
             port<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//省略 hashCode 相关代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//路由表信息</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RouterTable</span> <span class="token punctuation">{</span>
  <span class="token comment">//Key: 接口名</span>
  <span class="token comment">//Value: 路由集合</span>
  <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">CopyOnWriteArraySet</span><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span>
    rt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//根据接口名获取路由表</span>
  <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span></span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> iface<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> rt<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>iface<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//删除路由</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Router</span> router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span></span> set<span class="token operator">=</span>rt<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>router<span class="token punctuation">.</span>iface<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>set <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      set<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//增加路由</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Router</span> router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span></span> set <span class="token operator">=</span> rt<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>
      route<span class="token punctuation">.</span>iface<span class="token punctuation">,</span> r <span class="token operator">-&gt;</span>
        <span class="token keyword">new</span> <span class="token class-name">CopyOnWriteArraySet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="线程本地存储模式-没有共享-就没有伤害" tabindex="-1"><a class="header-anchor" href="#线程本地存储模式-没有共享-就没有伤害" aria-hidden="true">#</a> 线程本地存储模式：没有共享，就没有伤害</h2><p><strong>线程封闭</strong>，其本质上就是避免共享。没有共享，自然也就没有并发安全问题。</p><p>Java 中，ThreadLocal 就可以做到线程封闭。</p><h3 id="threadlocal-的使用方法" tabindex="-1"><a class="header-anchor" href="#threadlocal-的使用方法" aria-hidden="true">#</a> ThreadLocal 的使用方法</h3><p>SimpleDateFormat 不是线程安全的，如果要保证并发安全，可以使用 ThreadLocal 来解决。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SafeDateFormat</span> <span class="token punctuation">{</span>
  <span class="token comment">//定义 ThreadLocal 变量</span>
  <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DateFormat</span><span class="token punctuation">&gt;</span></span>
  tl<span class="token operator">=</span><span class="token class-name">ThreadLocal</span><span class="token punctuation">.</span><span class="token function">withInitial</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">SimpleDateFormat</span><span class="token punctuation">(</span>
      <span class="token string">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">static</span> <span class="token class-name">DateFormat</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> tl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//不同线程执行下面代码</span>
<span class="token comment">//返回的 df 是不同的</span>
<span class="token class-name">DateFormat</span> df <span class="token operator">=</span> <span class="token class-name">SafeDateFormat</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="threadlocal-的工作原理" tabindex="-1"><a class="header-anchor" href="#threadlocal-的工作原理" aria-hidden="true">#</a> ThreadLocal 的工作原理</h3><p>ThreadLocal 的目标是让不同的线程有不同的变量 V，那最直接的方法就是创建一个 Map，它的 Key 是线程，Value 是每个线程拥有的变量 V，ThreadLocal 内部持有这样的一个 Map 就可以了。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202409010704287.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MyThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Thread</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> locals <span class="token operator">=</span>
    <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//获取线程变量</span>
  <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> locals<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>
      <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//设置线程变量</span>
  <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    locals<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>
      <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java 的实现里面也有一个 Map，叫做 ThreadLocalMap，不过持有 ThreadLocalMap 的不是 ThreadLocal，而是 Thread。Thread 这个类内部有一个私有属性 threadLocals，其类型就是 ThreadLocalMap，ThreadLocalMap 的 Key 是 ThreadLocal。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202409010705524.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Thread 持有 ThreadLocalMap 的示意图</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
  <span class="token comment">//内部持有 ThreadLocalMap</span>
  <span class="token class-name">ThreadLocal<span class="token punctuation">.</span>ThreadLocalMap</span>
    threadLocals<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//首先获取线程持有的</span>
    <span class="token comment">//ThreadLocalMap</span>
    <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span>
      <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>threadLocals<span class="token punctuation">;</span>
    <span class="token comment">//在 ThreadLocalMap 中</span>
    <span class="token comment">//查找变量</span>
    <span class="token class-name">Entry</span> e <span class="token operator">=</span>
      map<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">{</span>
    <span class="token comment">//内部是数组而不是 Map</span>
    <span class="token class-name">Entry</span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>
    <span class="token comment">//根据 ThreadLocal 查找 Entry</span>
    <span class="token class-name">Entry</span> <span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocal</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//省略查找逻辑</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//Entry 定义</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Entry</span> <span class="token keyword">extends</span>
    <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ThreadLocal</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
      <span class="token class-name">Object</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Java 的实现方案里面，ThreadLocal 仅仅是一个代理工具类，内部并不持有任何与线程相关的数据，所有和线程相关的数据都存储在 Thread 里面，这样的设计容易理解。</p><p>当然还有一个更加深层次的原因，那就是<strong>不容易产生内存泄露</strong>。在我们的设计方案中，ThreadLocal 持有的 Map 会持有 Thread 对象的引用，这就意味着，只要 ThreadLocal 对象存在，那么 Map 中的 Thread 对象就永远不会被回收。ThreadLocal 的生命周期往往都比线程要长，所以这种设计方案很容易导致内存泄露。而 Java 的实现中 Thread 持有 ThreadLocalMap，而且 ThreadLocalMap 里对 ThreadLocal 的引用还是弱引用（WeakReference），所以只要 Thread 对象可以被回收，那么 ThreadLocalMap 就能被回收。Java 的这种实现方案虽然看上去复杂一些，但是更加安全。</p><h3 id="threadlocal-与内存泄露" tabindex="-1"><a class="header-anchor" href="#threadlocal-与内存泄露" aria-hidden="true">#</a> ThreadLocal 与内存泄露</h3><p>在线程池中使用 ThreadLocal 为什么可能导致内存泄露呢？原因就出在线程池中线程的存活时间太长，往往都是和程序同生共死的，这就意味着 Thread 持有的 ThreadLocalMap 一直都不会被回收，再加上 ThreadLocalMap 中的 Entry 对 ThreadLocal 是弱引用（WeakReference），所以只要 ThreadLocal 结束了自己的生命周期是可以被回收掉的。但是 Entry 中的 Value 却是被 Entry 强引用的，所以即便 Value 的生命周期结束了，Value 也是无法被回收的，从而导致内存泄露。</p><p>那在线程池中，我们该如何正确使用 ThreadLocal 呢？其实很简单，既然 JVM 不能做到自动释放对 Value 的强引用，那我们手动释放就可以了。如何能做到手动释放呢？估计你马上想到** try{}finally{}方案<strong>了，这个简直就是</strong>手动释放资源的利器**。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ExecutorService</span> es<span class="token punctuation">;</span>
<span class="token class-name">ThreadLocal</span> tl<span class="token punctuation">;</span>
es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">//ThreadLocal 增加变量</span>
  tl<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略业务逻辑代码</span>
  <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">//手动清理 ThreadLocal</span>
    tl<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="inheritablethreadlocal-与继承性" tabindex="-1"><a class="header-anchor" href="#inheritablethreadlocal-与继承性" aria-hidden="true">#</a> InheritableThreadLocal 与继承性</h2><p>通过 ThreadLocal 创建的线程变量，其子线程是无法继承的。也就是说你在线程中通过 ThreadLocal 创建了线程变量 V，而后该线程创建了子线程，你在子线程中是无法通过 ThreadLocal 来访问父线程的线程变量 V 的。</p><p>如果你需要子线程继承父线程的线程变量，那该怎么办呢？其实很简单，Java 提供了 InheritableThreadLocal 来支持这种特性，InheritableThreadLocal 是 ThreadLocal 子类，所以用法和 ThreadLocal 相同。</p><p>不过，完全不建议你在线程池中使用 InheritableThreadLocal，不仅仅是因为它具有 ThreadLocal 相同的缺点——可能导致内存泄露，更重要的原因是：线程池中线程的创建是动态的，很容易导致继承关系错乱，如果你的业务逻辑依赖 InheritableThreadLocal，那么很可能导致业务逻辑计算错误，而这个错误往往比内存泄露更要命。</p><h2 id="guarded-suspension-模式-等待唤醒机制的规范实现" tabindex="-1"><a class="header-anchor" href="#guarded-suspension-模式-等待唤醒机制的规范实现" aria-hidden="true">#</a> Guarded Suspension 模式：等待唤醒机制的规范实现</h2><p>消息队列在互联网大厂中用的非常多，主要用作流量削峰和系统解耦。在这种接入方式中，发送消息和消费结果这两个操作之间是异步的。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202409010706341.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Message</span><span class="token punctuation">{</span>
  <span class="token class-name">String</span> id<span class="token punctuation">;</span>
  <span class="token class-name">String</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//该方法可以发送消息</span>
<span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//省略相关代码</span>
<span class="token punctuation">}</span>
<span class="token comment">//MQ 消息返回后会调用该方法</span>
<span class="token comment">//该方法的执行线程不同于</span>
<span class="token comment">//发送消息的线程</span>
<span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//省略相关代码</span>
<span class="token punctuation">}</span>
<span class="token comment">//处理浏览器发来的请求</span>
<span class="token class-name">Respond</span> <span class="token function">handleWebReq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//创建一消息</span>
  <span class="token class-name">Message</span> msg1 <span class="token operator">=</span> <span class="token keyword">new</span>
    <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;{...}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//发送消息</span>
  <span class="token function">send</span><span class="token punctuation">(</span>msg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//如何等待 MQ 返回的消息呢？</span>
  <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="guarded-suspension-模式" tabindex="-1"><a class="header-anchor" href="#guarded-suspension-模式" aria-hidden="true">#</a> Guarded Suspension 模式</h3><p><strong>Guarded Suspension</strong> 模式就是“保护性地暂停”。</p><p>一个对象 GuardedObject，内部有一个成员变量——受保护的对象，以及两个成员方法——<code>get(Predicate&lt;T&gt; p)</code>和<code>onChanged(T obj)</code>方法。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202409010706780.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>GuardedObject 的内部实现非常简单，是管程的一个经典用法，核心是：get() 方法通过条件变量的 await() 方法实现等待，onChanged() 方法通过条件变量的 signalAll() 方法实现唤醒功能。逻辑还是很简单的，所以这里就不再详细介绍了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">GuardedObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
  <span class="token comment">//受保护的对象</span>
  <span class="token class-name">T</span> obj<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span>
    <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">Condition</span> done <span class="token operator">=</span>
    lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> timeout<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">//获取受保护对象</span>
  <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">//MESA 管程推荐写法</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        done<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span>
          <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
      lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//返回非空的受保护对象</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//事件通知方法</span>
  <span class="token keyword">void</span> <span class="token function">onChanged</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>obj <span class="token operator">=</span> obj<span class="token punctuation">;</span>
      done<span class="token punctuation">.</span><span class="token function">signalAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展-guarded-suspension-模式" tabindex="-1"><a class="header-anchor" href="#扩展-guarded-suspension-模式" aria-hidden="true">#</a> 扩展 Guarded Suspension 模式</h3><p>Guarded Suspension 模式里 GuardedObject 有两个核心方法，一个是 get() 方法，一个是 onChanged() 方法。很显然，在处理 Web 请求的方法 handleWebReq() 中，可以调用 GuardedObject 的 get() 方法来实现等待；在 MQ 消息的消费方法 onMessage() 中，可以调用 GuardedObject 的 onChanged() 方法来实现唤醒。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//处理浏览器发来的请求</span>
<span class="token class-name">Respond</span> <span class="token function">handleWebReq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//创建一消息</span>
  <span class="token class-name">Message</span> msg1 <span class="token operator">=</span> <span class="token keyword">new</span>
    <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;{...}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//发送消息</span>
  <span class="token function">send</span><span class="token punctuation">(</span>msg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//利用 GuardedObject 实现等待</span>
  <span class="token class-name">GuardedObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Message</span><span class="token punctuation">&gt;</span></span> go
    <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">GuardObjec</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Message</span> r <span class="token operator">=</span> go<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>
    t<span class="token operator">-&gt;</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//如何找到匹配的 go？</span>
  <span class="token class-name">GuardedObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Message</span><span class="token punctuation">&gt;</span></span> go<span class="token operator">=</span><span class="token operator">?</span><span class="token operator">?</span><span class="token operator">?</span>
  go<span class="token punctuation">.</span><span class="token function">onChanged</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>handleWebReq() 里面创建了 GuardedObject 对象的实例 go，并调用其 get() 方等待结果，那在 onMessage() 方法中，如何才能够找到匹配的 GuardedObject 对象呢？</p><p>可以扩展一下 Guarded Suspension 模式，从而使它能够很方便地解决小灰同学的问题。在小灰的程序中，每个发送到 MQ 的消息，都有一个唯一性的属性 id，所以我们可以维护一个 MQ 消息 id 和 GuardedObject 对象实例的关系。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">GuardedObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
  <span class="token comment">//受保护的对象</span>
  <span class="token class-name">T</span> obj<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span>
    <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">Condition</span> done <span class="token operator">=</span>
    lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">//保存所有 GuardedObject</span>
  <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">GuardedObject</span><span class="token punctuation">&gt;</span></span>
  gos<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//静态方法创建 GuardedObject</span>
  <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">GuardedObject</span>
      <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">GuardedObject</span> go<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">GuardedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    gos<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> go<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> go<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">void</span>
      <span class="token function">fireEvent</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">T</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">GuardedObject</span> go<span class="token operator">=</span>gos<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>go <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      go<span class="token punctuation">.</span><span class="token function">onChanged</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//获取受保护对象</span>
  <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">//MESA 管程推荐写法</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        done<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span>
          <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
      lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//返回非空的受保护对象</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//事件通知方法</span>
  <span class="token keyword">void</span> <span class="token function">onChanged</span><span class="token punctuation">(</span><span class="token class-name">T</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>obj <span class="token operator">=</span> obj<span class="token punctuation">;</span>
      done<span class="token punctuation">.</span><span class="token function">signalAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端代码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//处理浏览器发来的请求</span>
<span class="token class-name">Respond</span> <span class="token function">handleWebReq</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">int</span> id<span class="token operator">=</span>序号生成器。<span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//创建一消息</span>
  <span class="token class-name">Message</span> msg1 <span class="token operator">=</span> <span class="token keyword">new</span>
    <span class="token class-name">Message</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span><span class="token string">&quot;{...}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//创建 GuardedObject 实例</span>
  <span class="token class-name">GuardedObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Message</span><span class="token punctuation">&gt;</span></span> go<span class="token operator">=</span>
    <span class="token class-name">GuardedObject</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//发送消息</span>
  <span class="token function">send</span><span class="token punctuation">(</span>msg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//等待 MQ 消息</span>
  <span class="token class-name">Message</span> r <span class="token operator">=</span> go<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>
    t<span class="token operator">-&gt;</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//唤醒等待的线程</span>
  <span class="token class-name">GuardedObject</span><span class="token punctuation">.</span><span class="token function">fireEvent</span><span class="token punctuation">(</span>
    msg<span class="token punctuation">.</span>id<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h3><p>Guarded Suspension 模式本质上是一种等待唤醒机制的实现，只不过 Guarded Suspension 模式将其规范化了。规范化的好处是你无需重头思考如何实现，也无需担心实现程序的可理解性问题，同时也能避免一不小心写出个 Bug 来。但 Guarded Suspension 模式在解决实际问题的时候，往往还是需要扩展的，扩展的方式有很多，本篇文章就直接对 GuardedObject 的功能进行了增强，Dubbo 中 DefaultFuture 这个类也是采用的这种方式，你可以对比着来看，相信对 DefaultFuture 的实现原理会理解得更透彻。当然，你也可以创建新的类来实现对 Guarded Suspension 模式的扩展。</p><p>Guarded Suspension 模式也常被称作 Guarded Wait 模式、Spin Lock 模式（因为使用了 while 循环去等待），这些名字都很形象，不过它还有一个更形象的非官方名字：多线程版本的 if。单线程场景中，if 语句是不需要等待的，因为在只有一个线程的条件下，如果这个线程被阻塞，那就没有其他活动线程了，这意味着 if 判断条件的结果也不会发生变化了。但是多线程场景中，等待就变得有意义了，这种场景下，if 判断条件的结果是可能发生变化的。所以，用“多线程版本的 if”来理解这个模式会更简单。</p><h2 id="balking-模式-再谈线程安全的单例模式" tabindex="-1"><a class="header-anchor" href="#balking-模式-再谈线程安全的单例模式" aria-hidden="true">#</a> Balking 模式：再谈线程安全的单例模式</h2><p>需要快速放弃的一个最常见的例子是各种编辑器提供的自动保存功能。自动保存功能的实现逻辑一般都是隔一定时间自动执行存盘操作，存盘操作的前提是文件做过修改，如果文件没有执行过修改操作，就需要快速放弃存盘操作。下面的示例代码将自动保存功能代码化了，很显然 AutoSaveEditor 这个类不是线程安全的，因为对共享变量 changed 的读写没有使用同步，那如何保证 AutoSaveEditor 的线程安全性呢？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">AutoSaveEditor</span> <span class="token punctuation">{</span>

    <span class="token comment">//文件是否被修改过</span>
    <span class="token keyword">boolean</span> changed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">//定时任务线程池</span>
    <span class="token class-name">ScheduledExecutorService</span> ses <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadScheduledExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//定时执行自动保存</span>
    <span class="token keyword">void</span> <span class="token function">startAutoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ses<span class="token punctuation">.</span><span class="token function">scheduleWithFixedDelay</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span> <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//自动存盘操作</span>
    <span class="token keyword">void</span> <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>changed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        changed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token comment">//执行存盘操作</span>
        <span class="token comment">//省略且实现</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//编辑操作</span>
    <span class="token keyword">void</span> <span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//省略编辑逻辑</span>
        changed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决这个问题相信你一定手到擒来了：读写共享变量 changed 的方法 autoSave() 和 edit() 都加互斥锁就可以了。这样做虽然简单，但是性能很差，原因是锁的范围太大了。那我们可以将锁的范围缩小，只在读写共享变量 changed 的地方加锁，实现代码如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//自动存盘操作</span>
<span class="token keyword">void</span> <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>changed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        changed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//执行存盘操作</span>
    <span class="token comment">//省略且实现</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//编辑操作</span>
<span class="token keyword">void</span> <span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//省略编辑逻辑</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        changed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="balking-模式的经典实现" tabindex="-1"><a class="header-anchor" href="#balking-模式的经典实现" aria-hidden="true">#</a> Balking 模式的经典实现</h3><p>Balking 模式本质上是一种规范化地解决“多线程版本的 if”的方案，对于上面自动保存的例子，使用 Balking 模式规范化之后的写法如下所示，你会发现仅仅是将 edit() 方法中对共享变量 changed 的赋值操作抽取到了 change() 中，这样的好处是将并发处理逻辑和业务逻辑分开。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">boolean</span> changed<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token comment">//自动存盘操作</span>
<span class="token keyword">void</span> <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>changed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    changed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//执行存盘操作</span>
  <span class="token comment">//省略且实现</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//编辑操作</span>
<span class="token keyword">void</span> <span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//省略编辑逻辑</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//改变状态</span>
<span class="token keyword">void</span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    changed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用-volatile-实现-balking-模式" tabindex="-1"><a class="header-anchor" href="#用-volatile-实现-balking-模式" aria-hidden="true">#</a> 用 volatile 实现 Balking 模式</h3><p>前面我们用 synchronized 实现了 Balking 模式，这种实现方式最为稳妥，建议你实际工作中也使用这个方案。不过在某些特定场景下，也可以使用 volatile 来实现，但<strong>使用 volatile 的前提是对原子性没有要求</strong>。</p><p>在 RPC 框架中，本地路由表是要和注册中心进行信息同步的，应用启动的时候，会将应用依赖服务的路由表从注册中心同步到本地路由表中，如果应用重启的时候注册中心宕机，那么会导致该应用依赖的服务均不可用，因为找不到依赖服务的路由表。为了防止这种极端情况出现，RPC 框架可以将本地路由表自动保存到本地文件中，如果重启的时候注册中心宕机，那么就从本地文件中恢复重启前的路由表。这其实也是一种降级的方案。</p><p>自动保存路由表和前面介绍的编辑器自动保存原理是一样的，也可以用 Balking 模式实现，不过我们这里采用 volatile 来实现，实现的代码如下所示。之所以可以采用 volatile 来实现，是因为对共享变量 changed 和 rt 的写操作不存在原子性的要求，而且采用 scheduleWithFixedDelay() 这种调度方式能保证同一时刻只有一个线程执行 autoSave() 方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//路由表信息</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RouterTable</span> <span class="token punctuation">{</span>
  <span class="token comment">//Key: 接口名</span>
  <span class="token comment">//Value: 路由集合</span>
  <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">CopyOnWriteArraySet</span><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span>
    rt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//路由表是否发生变化</span>
  <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> changed<span class="token punctuation">;</span>
  <span class="token comment">//将路由表写入本地文件的线程池</span>
  <span class="token class-name">ScheduledExecutorService</span> ses<span class="token operator">=</span>
    <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadScheduledExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//启动定时任务</span>
  <span class="token comment">//将变更后的路由表写入本地文件</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">startLocalSaver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    ses<span class="token punctuation">.</span><span class="token function">scheduleWithFixedDelay</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
      <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//保存路由表到本地文件</span>
  <span class="token keyword">void</span> <span class="token function">autoSave</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>changed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    changed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">//将路由表写入本地文件</span>
    <span class="token comment">//省略其方法实现</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">save2Local</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//删除路由</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Router</span> router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span></span> set<span class="token operator">=</span>rt<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>router<span class="token punctuation">.</span>iface<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>set <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      set<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//路由表已发生变化</span>
      changed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//增加路由</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Router</span> router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span><span class="token punctuation">&gt;</span></span> set <span class="token operator">=</span> rt<span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>
      route<span class="token punctuation">.</span>iface<span class="token punctuation">,</span> r <span class="token operator">-&gt;</span>
        <span class="token keyword">new</span> <span class="token class-name">CopyOnWriteArraySet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//路由表已发生变化</span>
    changed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

<span class="token class-name">Balking</span> 模式有一个非常典型的应用场景就是单次初始化，下面的示例代码是它的实现。这个实现方案中，我们将 <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 声明为一个同步方法，这样同一个时刻就只有一个线程能够执行 <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法；<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法在第一次执行完时会将 inited 设置为 <span class="token boolean">true</span>，这样后续执行 <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法的线程就不会再执行 <span class="token function">doInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 了。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">InitTest</span><span class="token punctuation">{</span>
  <span class="token keyword">boolean</span> inited <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>inited<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//省略 doInit 的实现</span>
    <span class="token function">doInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    inited<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

线程安全的单例模式本质上其实也是单次初始化，所以可以用 <span class="token class-name">Balking</span> 模式来实现线程安全的单例模式，下面的示例代码是其实现。这个实现虽然功能上没有问题，但是性能却很差，因为互斥锁 <span class="token keyword">synchronized</span> 将 <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法串行化了，那有没有办法可以优化一下它的性能呢？

\`\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span>
    <span class="token class-name">Singleton</span> singleton<span class="token punctuation">;</span>
  <span class="token comment">//构造方法私有化</span>
  <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">//获取实例（单例）</span>
  <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">static</span>
  <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>singleton <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      singleton<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> singleton<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

办法当然是有的，那就是经典的<span class="token operator">*</span><span class="token operator">*</span>双重检查<span class="token operator">*</span><span class="token operator">*</span>（<span class="token class-name">Double</span> <span class="token class-name">Check</span>）方案，下面的示例代码是其详细实现。在双重检查方案中，一旦 <span class="token class-name">Singleton</span> 对象被成功创建之后，就不会执行 <span class="token keyword">synchronized</span><span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>相关的代码，也就是说，此时 <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法的执行路径是无锁的，从而解决了性能问题。不过需要你注意的是，这个方案中使用了 <span class="token keyword">volatile</span> 来禁止编译优化。至于获取锁后的二次检查，则是出于对安全性负责。

\`\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span>
    <span class="token class-name">Singleton</span> singleton<span class="token punctuation">;</span>
  <span class="token comment">//构造方法私有化</span>
  <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">//获取实例（单例）</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span>
  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//第一次检查</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>singleton<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token function">synchronize</span><span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//获取锁后二次检查</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>singleton<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          singleton<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> singleton<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

### 总结

<span class="token class-name">Balking</span> 模式和 <span class="token class-name">Guarded</span> <span class="token class-name">Suspension</span> 模式从实现上看似乎没有多大的关系，<span class="token class-name">Balking</span> 模式只需要用互斥锁就能解决，而 <span class="token class-name">Guarded</span> <span class="token class-name">Suspension</span> 模式则要用到管程这种高级的并发原语；但是从应用的角度来看，它们解决的都是“线程安全的 <span class="token keyword">if</span>”语义，不同之处在于，<span class="token class-name">Guarded</span> <span class="token class-name">Suspension</span> 模式会等待 <span class="token keyword">if</span> 条件为真，而 <span class="token class-name">Balking</span> 模式不会等待。

<span class="token class-name">Balking</span> 模式的经典实现是使用互斥锁，你可以使用 <span class="token class-name">Java</span> 语言内置 <span class="token keyword">synchronized</span>，也可以使用 <span class="token constant">SDK</span> 提供 <span class="token class-name">Lock</span>；如果你对互斥锁的性能不满意，可以尝试采用 <span class="token keyword">volatile</span> 方案，不过使用 <span class="token keyword">volatile</span> 方案需要你更加谨慎。

## <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式：最简单实用的分工方法

并发编程领域里，解决分工问题也有一系列的设计模式，比较常用的主要有 <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式、<span class="token class-name">Worker</span> <span class="token class-name">Thread</span> 模式、生产者<span class="token operator">-</span>消费者模式等等。

### 如何理解 <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式

现实世界里，很多事情我们都需要委托他人办理，委托他人代办有一个非常大的好处，那就是可以专心做自己的事了。

在编程领域也有很多类似的需求，比如写一个 <span class="token constant">HTTP</span> <span class="token class-name">Server</span>，创建一个子线程，委托子线程去处理 <span class="token constant">HTTP</span> 请求。

这种委托他人办理的方式，在并发编程领域被总结为一种设计模式，叫做<span class="token operator">*</span><span class="token operator">*</span> <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式<span class="token operator">*</span><span class="token operator">*</span>，简言之就是为每个任务分配一个独立的线程。

### 用 <span class="token class-name">Thread</span> 实现 <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式

<span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式的一个最经典的应用场景是<span class="token operator">*</span><span class="token operator">*</span>网络编程里服务端的实现<span class="token operator">*</span><span class="token operator">*</span>，服务端为每个客户端请求创建一个独立的线程，当线程处理完请求后，自动销毁，这是一种最简单的并发处理网络请求的方法。

网络编程里最简单的程序当数 echo 程序了，echo 程序的服务端会原封不动地将客户端的请求发送回客户端。例如，客户端发送 <span class="token constant">TCP</span> 请求”<span class="token class-name">Hello</span> <span class="token class-name">World</span>”，那么服务端也会返回”<span class="token class-name">Hello</span> <span class="token class-name">World</span>”。

\`\`\`java
<span class="token keyword">final</span> <span class="token class-name">ServerSocketChannel</span> ssc <span class="token operator">=</span>
  <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//处理请求</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 接收请求</span>
        <span class="token class-name">SocketChannel</span> sc <span class="token operator">=</span> ssc<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 每个请求都创建一个线程</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 读 Socket</span>
                <span class="token class-name">ByteBuffer</span> rb <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocateDirect</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sc<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>rb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//模拟处理请求</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 写 Socket</span>
                <span class="token class-name">ByteBuffer</span> wb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ByteBuffer</span><span class="token punctuation">)</span> rb<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sc<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>wb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 关闭 Socket</span>
                sc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UncheckedIOException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    ssc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
\`\`\`

上面这个 echo 服务的实现方案是不具备可行性的。原因在于 <span class="token class-name">Java</span> 中的线程是一个重量级的对象，创建成本很高，一方面创建线程比较耗时，另一方面线程占用的内存也比较大。所以，为每个请求创建一个新的线程并不适合高并发场景。

<span class="token class-name">Java</span> 语言里，<span class="token class-name">Java</span> 线程是和操作系统线程一一对应的，这种做法本质上是将 <span class="token class-name">Java</span> 线程的调度权完全委托给操作系统，而操作系统在这方面非常成熟，所以这种做法的好处是稳定、可靠，但是也继承了操作系统线程的缺点：创建成本高。为了解决这个缺点，<span class="token class-name">Java</span> 并发包里提供了线程池等工具类。这个思路在很长一段时间里都是很稳妥的方案，但是这个方案并不是唯一的方案。

业界还有另外一种方案，叫做<span class="token operator">*</span><span class="token operator">*</span>轻量级线程<span class="token operator">*</span><span class="token operator">*</span>。这个方案在 <span class="token class-name">Java</span> 领域知名度并不高，但是在其他编程语言里却叫得很响，例如 <span class="token class-name">Go</span> 语言、<span class="token class-name">Lua</span> 语言里的协程，本质上就是一种轻量级的线程。轻量级的线程，创建的成本很低，基本上和创建一个普通对象的成本相似；并且创建的速度和内存占用相比操作系统线程至少有一个数量级的提升，所以基于轻量级线程实现 <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式就完全没有问题了。

<span class="token class-name">Java</span> 语言目前也已经意识到轻量级线程的重要性了，<span class="token class-name">OpenJDK</span> 有个 <span class="token class-name">Loom</span> 项目，就是要解决 <span class="token class-name">Java</span> 语言的轻量级线程问题，在这个项目中，轻量级线程被叫做<span class="token operator">*</span><span class="token operator">*</span> <span class="token class-name">Fiber</span><span class="token operator">*</span><span class="token operator">*</span>。

### 用 <span class="token class-name">Fiber</span> 实现 <span class="token class-name">Thread</span><span class="token operator">-</span><span class="token class-name">Per</span><span class="token operator">-</span><span class="token class-name">Message</span> 模式

<span class="token class-name">Loom</span> 项目在设计轻量级线程时，充分考量了当前 <span class="token class-name">Java</span> 线程的使用方式，采取的是尽量兼容的态度，所以使用上还是挺简单的。用 <span class="token class-name">Fiber</span> 实现 echo 服务的示例代码如下所示，对比 <span class="token class-name">Thread</span> 的实现，你会发现改动量非常小，只需要把 \`<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>…<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 换成 \`<span class="token class-name">Fiber</span><span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\` 就可以了。

\`\`\`java
<span class="token keyword">final</span> <span class="token class-name">ServerSocketChannel</span> ssc <span class="token operator">=</span>
    <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//处理请求</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 接收请求</span>
        <span class="token keyword">final</span> <span class="token class-name">SocketChannel</span> sc <span class="token operator">=</span> ssc<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Fiber</span><span class="token punctuation">.</span><span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 读 Socket</span>
                <span class="token class-name">ByteBuffer</span> rb <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocateDirect</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sc<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>rb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//模拟处理请求</span>
                <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token number">2000</span> <span class="token operator">*</span> <span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 写 Socket</span>
                <span class="token class-name">ByteBuffer</span> wb <span class="token operator">=</span>
                    <span class="token punctuation">(</span><span class="token class-name">ByteBuffer</span><span class="token punctuation">)</span> rb<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                sc<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>wb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 关闭 Socket</span>
                sc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UncheckedIOException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token comment">//while</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    ssc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
\`\`\`

通过压测，可以发现协程方式相比与线程方式，会大大减少线程数。

## <span class="token class-name">Worker</span> <span class="token class-name">Thread</span> 模式：如何避免重复创建线程？

### <span class="token class-name">Worker</span> <span class="token class-name">Thread</span> 模式及其实现

<span class="token class-name">Worker</span> <span class="token class-name">Thread</span> 模式可以类比现实世界里车间的工作模式：车间里的工人，有活儿了，大家一起干，没活儿了就聊聊天等着。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010734563.</span>png<span class="token punctuation">)</span>

这个模式，在 <span class="token class-name">Java</span> 中的方案就是线程池。

下面的示例代码是用线程池实现的 echo 服务端。

\`\`\`java
<span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token class-name">ServerSocketChannel</span> ssc <span class="token operator">=</span>
    <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//处理请求</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 接收请求</span>
        <span class="token class-name">SocketChannel</span> sc <span class="token operator">=</span> ssc<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 将请求处理任务提交给线程池</span>
        es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 读 Socket</span>
                <span class="token class-name">ByteBuffer</span> rb <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocateDirect</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sc<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>rb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//模拟处理请求</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 写 Socket</span>
                <span class="token class-name">ByteBuffer</span> wb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ByteBuffer</span><span class="token punctuation">)</span> rb<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sc<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>wb<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 关闭 Socket</span>
                sc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UncheckedIOException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    ssc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    es<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
\`\`\`

### 正确地创建线程池

<span class="token class-name">Java</span> 的线程池既能够避免无限制地<span class="token operator">*</span><span class="token operator">*</span>创建线程<span class="token operator">*</span><span class="token operator">*</span>导致 <span class="token constant">OOM</span>，也能避免无限制地<span class="token operator">*</span><span class="token operator">*</span>接收任务<span class="token operator">*</span><span class="token operator">*</span>导致 <span class="token constant">OOM</span>。只不过后者经常容易被我们忽略，例如在上面的实现中，就被我们忽略了。所以强烈建议你<span class="token operator">*</span><span class="token operator">*</span>用创建有界的队列来接收任务<span class="token operator">*</span><span class="token operator">*</span>。

当请求量大于有界队列的容量时，就需要合理地拒绝请求。如何合理地拒绝呢？这需要你结合具体的业务场景来制定，即便线程池默认的拒绝策略能够满足你的需求，也同样建议你<span class="token operator">*</span><span class="token operator">*</span>在创建线程池时，清晰地指明拒绝策略<span class="token operator">*</span><span class="token operator">*</span>。

同时，为了便于调试和诊断问题，我也强烈建议你<span class="token operator">*</span><span class="token operator">*</span>在实际工作中给线程赋予一个业务相关的名字<span class="token operator">*</span><span class="token operator">*</span>。

综合以上，创建线程池的示例：

\`\`\`java
<span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">60L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span>
    <span class="token comment">//注意要创建有界队列</span>
    <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">//建议根据业务需求实现 ThreadFactory</span>
    r <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token string">&quot;echo-&quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//建议根据业务需求实现 RejectedExecutionHandler</span>
    <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor<span class="token punctuation">.</span>CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
\`\`\`

### 避免线程死锁

使用线程池过程中，还要注意一种<span class="token operator">*</span><span class="token operator">*</span>线程死锁<span class="token operator">*</span><span class="token operator">*</span>的场景。如果提交到相同线程池的任务不是相互独立的，而是有依赖关系的，那么就有可能导致线程死锁。具体现象是<span class="token operator">*</span><span class="token operator">*</span>应用每运行一段时间偶尔就会处于无响应的状态，监控数据看上去一切都正常，但是实际上已经不能正常工作了<span class="token operator">*</span><span class="token operator">*</span>。

这个出问题的应用，相关的逻辑精简之后，如下图所示，该应用将一个大型的计算任务分成两个阶段，第一个阶段的任务会等待第二阶段的子任务完成。在这个应用里，每一个阶段都使用了线程池，而且两个阶段使用的还是同一个线程池。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010741505.</span>png<span class="token punctuation">)</span>

我们可以用下面的示例代码来模拟该应用，如果你执行下面的这段代码，会发现它永远执行不到最后一行。执行过程中没有任何异常，但是应用已经停止响应了。

\`\`\`java
<span class="token comment">//L1、L2 阶段共用的线程池</span>
<span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//L1 阶段的闭锁</span>
<span class="token class-name">CountDownLatch</span> l1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;L1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//执行 L1 阶段任务</span>
    es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//L2 阶段的闭锁</span>
        <span class="token class-name">CountDownLatch</span> l2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//执行 L2 阶段子任务</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;L2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                l2<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//等待 L2 阶段任务执行完</span>
        l2<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        l1<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//等着 L1 阶段任务执行完</span>
l1<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
\`\`\`

当应用出现类似问题时，首选的诊断方法是查看线程栈。下图是上面示例代码停止响应后的线程栈，你会发现线程池中的两个线程全部都阻塞在 \`l2<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\` 这行代码上了，也就是说，线程池里所有的线程都在等待 <span class="token constant">L2</span> 阶段的任务执行完，那 <span class="token constant">L2</span> 阶段的子任务什么时候能够执行完呢？永远都没那一天了，为什么呢？因为线程池里的线程都阻塞了，没有空闲的线程执行 <span class="token constant">L2</span> 阶段的任务了。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010743782.</span>png<span class="token punctuation">)</span>

原因找到了，那如何解决就简单了，最简单粗暴的办法就是将线程池的最大线程数调大，如果能够确定任务的数量不是非常多的话，这个办法也是可行的，否则这个办法就行不通了。其实<span class="token operator">*</span><span class="token operator">*</span>这种问题通用的解决方案是为不同的任务创建不同的线程池<span class="token operator">*</span><span class="token operator">*</span>。对于上面的这个应用，<span class="token constant">L1</span> 阶段的任务和 <span class="token constant">L2</span> 阶段的任务如果各自都有自己的线程池，就不会出现这种问题了。

最后再次强调一下：<span class="token operator">*</span><span class="token operator">*</span>提交到相同线程池中的任务一定是相互独立的，否则就一定要慎重<span class="token operator">*</span><span class="token operator">*</span>。

## 两阶段终止模式：如何优雅地终止线程？

### 如何理解两阶段终止模式

<span class="token operator">*</span><span class="token operator">*</span>两阶段终止模式<span class="token operator">*</span><span class="token operator">*</span>，顾名思义，就是将终止过程分成两个阶段：第一个阶段主要是线程 <span class="token constant">T1</span> 向线程 <span class="token constant">T2</span> <span class="token operator">*</span><span class="token operator">*</span>发送终止指令<span class="token operator">*</span><span class="token operator">*</span>，而第二阶段则是线程 <span class="token constant">T2</span> <span class="token operator">*</span><span class="token operator">*</span>响应终止指令<span class="token operator">*</span><span class="token operator">*</span>。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010920384.</span>png<span class="token punctuation">)</span>

终止指令，其实包括两方面内容：<span class="token operator">*</span><span class="token operator">*</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法<span class="token operator">*</span><span class="token operator">*</span>和<span class="token operator">*</span><span class="token operator">*</span>线程终止的标志位<span class="token operator">*</span><span class="token operator">*</span>。

### 用两阶段终止模式终止监控操作

实际工作中，有些监控系统需要动态地采集一些数据，一般都是监控系统发送采集指令给被监控系统的监控代理，监控代理接收到指令之后，从监控目标收集数据，然后回传给监控系统，详细过程如下图所示。出于对性能的考虑（有些监控项对系统性能影响很大，所以不能一直持续监控），动态采集功能一般都会有终止操作。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010923997.</span>png<span class="token punctuation">)</span>

下面的示例代码是<span class="token operator">*</span><span class="token operator">*</span>监控代理<span class="token operator">*</span><span class="token operator">*</span>简化之后的实现，<span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法会启动一个新的线程 rptThread 来执行监控数据采集和回传的功能，<span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法需要优雅地终止线程 rptThread，那 <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 相关功能该如何实现呢？

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token punctuation">{</span>
  <span class="token keyword">boolean</span> started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token comment">//采集线程</span>
  <span class="token class-name">Thread</span> rptThread<span class="token punctuation">;</span>
  <span class="token comment">//启动采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//不允许同时启动多个采集线程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>started<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    started <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    rptThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//省略采集、回传实现</span>
        <span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//每隔两秒钟采集、回传一次数据</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//执行到此处说明线程马上终止</span>
      started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rptThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//终止采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//如何实现？</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

按照两阶段终止模式，我们首先需要做的就是将线程 rptThread 状态转换到 <span class="token constant">RUNNABLE</span>，做法很简单，只需要在调用 \`rptThread<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 就可以了。线程 rptThread 的状态转换到 <span class="token constant">RUNNABLE</span> 之后，如何优雅地终止呢？下面的示例代码中，我们选择的标志位是线程的中断状态：\`<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` ，需要注意的是，我们在捕获 <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 的中断异常之后，通过 \`<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 重新设置了线程的中断状态，因为 <span class="token constant">JVM</span> 的异常处理会清除线程的中断状态。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token punctuation">{</span>
  <span class="token keyword">boolean</span> started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token comment">//采集线程</span>
  <span class="token class-name">Thread</span> rptThread<span class="token punctuation">;</span>
  <span class="token comment">//启动采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//不允许同时启动多个采集线程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>started<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    started <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    rptThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//省略采集、回传实现</span>
        <span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//每隔两秒钟采集、回传一次数据</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">//重新设置线程中断状态</span>
          <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//执行到此处说明线程马上终止</span>
      started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rptThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//终止采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    rptThread<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

上面的示例代码的确能够解决当前的问题，但是建议你在实际工作中谨慎使用。原因在于我们很可能在线程的 <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法中调用第三方类库提供的方法，而我们没有办法保证第三方类库正确处理了线程的中断异常，例如第三方类库在捕获到 <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法抛出的中断异常后，没有重新设置线程的中断状态，那么就会导致线程不能够正常终止。所以强烈建议你<span class="token operator">*</span><span class="token operator">*</span>设置自己的线程终止标志位<span class="token operator">*</span><span class="token operator">*</span>，例如在下面的代码中，使用 isTerminated 作为线程终止标志位，此时无论是否正确处理了线程的中断异常，都不会影响线程优雅地终止。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token punctuation">{</span>
  <span class="token comment">//线程终止标志位</span>
  <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> terminated <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">boolean</span> started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token comment">//采集线程</span>
  <span class="token class-name">Thread</span> rptThread<span class="token punctuation">;</span>
  <span class="token comment">//启动采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//不允许同时启动多个采集线程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>started<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    started <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    terminated <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    rptThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>terminated<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//省略采集、回传实现</span>
        <span class="token function">report</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//每隔两秒钟采集、回传一次数据</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">//重新设置线程中断状态</span>
          <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//执行到此处说明线程马上终止</span>
      started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rptThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//终止采集功能</span>
  <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//设置中断标志位</span>
    terminated <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">//中断线程 rptThread</span>
    rptThread<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

### 如何优雅地终止线程池

<span class="token class-name">Java</span> 领域用的最多的还是线程池，而不是手动地创建线程。那我们该如何优雅地终止线程池呢？

线程池提供了两个方法：<span class="token operator">*</span><span class="token operator">*</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span><span class="token operator">*</span>和<span class="token operator">*</span><span class="token operator">*</span> <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token operator">*</span>。这两个方法有什么区别呢？要了解它们的区别，就先需要了解线程池的实现原理。

我们曾经讲过，<span class="token class-name">Java</span> 线程池是生产者<span class="token operator">-</span>消费者模式的一种实现，提交给线程池的任务，首先是进入一个阻塞队列中，之后线程池中的线程从阻塞队列中取出任务执行。

<span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法是一种很保守的关闭线程池的方法。线程池执行 <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 后，就会拒绝接收新的任务，但是会等待线程池中正在执行的任务和已经进入阻塞队列的任务都执行完之后才最终关闭线程池。

而 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法，相对就激进一些了，线程池执行 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 后，会拒绝接收新的任务，同时还会中断线程池中正在执行的任务，已经进入阻塞队列的任务也被剥夺了执行的机会，不过这些被剥夺执行机会的任务会作为 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法的返回值返回。因为 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法会中断正在执行的线程，所以提交到线程池的任务，如果需要优雅地结束，就需要正确地处理线程中断。

如果提交到线程池的任务不允许取消，那就不能使用 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法终止线程池。不过，如果提交到线程池的任务允许后续以补偿的方式重新执行，也是可以使用 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法终止线程池的。<span class="token punctuation">[</span>《<span class="token class-name">Java</span> 并发编程实战》<span class="token punctuation">]</span><span class="token punctuation">(</span>time<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>mall<span class="token operator">?</span>url<span class="token operator">=</span>https<span class="token operator">%</span><span class="token number">3</span>A<span class="token operator">%</span><span class="token number">2F</span><span class="token operator">%</span><span class="token number">2F</span>h5<span class="token punctuation">.</span>youzan<span class="token punctuation">.</span>com<span class="token operator">%</span><span class="token number">2F</span>v2<span class="token operator">%</span><span class="token number">2F</span>goods<span class="token operator">%</span><span class="token number">2F</span><span class="token number">2758</span>xqdzr6uuw<span class="token punctuation">)</span> 这本书第 <span class="token number">7</span> 章《取消与关闭》的“shutdownNow 的局限性”一节中，提到一种将已提交但尚未开始执行的任务以及已经取消的正在执行的任务保存起来，以便后续重新执行的方案。

其实分析完 <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法你会发现，它们实质上使用的也是两阶段终止模式，只是终止指令的范围不同而已，前者只影响阻塞队列接收任务，后者范围扩大到线程池中所有的任务。

## 生产者<span class="token operator">-</span>消费者模式：用流水线思想提高效率

### 生产者<span class="token operator">-</span>消费者模式的优点

生产者<span class="token operator">-</span>消费者模式的核心是一个<span class="token operator">*</span><span class="token operator">*</span>任务队列<span class="token operator">*</span><span class="token operator">*</span>，生产者线程生产任务，并将任务添加到任务队列中，而消费者线程从任务队列中获取任务并执行。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010930317.</span>png<span class="token punctuation">)</span>

生产者和消费者没有任何依赖关系，它们彼此之间的通信只能通过任务队列，所以<span class="token operator">*</span><span class="token operator">*</span>生产者<span class="token operator">-</span>消费者模式是一个不错的解耦方案<span class="token operator">*</span><span class="token operator">*</span>。

生产者<span class="token operator">-</span>消费者模式<span class="token operator">*</span><span class="token operator">*</span>支持异步，并且能够平衡生产者和消费者的速度差异<span class="token operator">*</span><span class="token operator">*</span>。

### 支持批量执行以提升性能

监控系统动态采集的案例，其实最终回传的监控数据还是要存入数据库的（如下图）。但被监控系统往往有很多，如果每一条回传数据都直接 <span class="token constant">INSERT</span> 到数据库，那么这个方案就是上面提到的第一种方案：每个线程 <span class="token constant">INSERT</span> 一条数据。很显然，更好的方案是批量执行 <span class="token constant">SQL</span>，那如何实现呢？这就要用到生产者<span class="token operator">-</span>消费者模式了。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010933833.</span>png<span class="token punctuation">)</span>

利用生产者<span class="token operator">-</span>消费者模式实现批量执行 <span class="token constant">SQL</span> 非常简单：将原来直接 <span class="token constant">INSERT</span> 数据到数据库的线程作为生产者线程，生产者线程只需将数据添加到任务队列，然后消费者线程负责将任务从任务队列中批量取出并批量执行。

在下面的示例代码中，我们创建了 <span class="token number">5</span> 个消费者线程负责批量执行 <span class="token constant">SQL</span>，这 <span class="token number">5</span> 个消费者线程以 \`<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\` 循环方式批量地获取任务并批量地执行。需要注意的是，从任务队列中获取批量任务的方法 <span class="token function">pollTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 中，首先是以阻塞方式获取任务队列中的一条任务，而后则是以非阻塞的方式获取任务；之所以首先采用阻塞方式，是因为如果任务队列中没有任务，这样的方式能够避免无谓的循环。

\`\`\`java
<span class="token comment">//任务队列</span>
<span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span> bq<span class="token operator">=</span><span class="token keyword">new</span>
  <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//启动 5 个消费者线程</span>
<span class="token comment">//执行批量任务</span>
<span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">ExecutorService</span> es<span class="token operator">=</span>executors
    <span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//获取批量任务</span>
          <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span> ts<span class="token operator">=</span><span class="token function">pollTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">//执行批量任务</span>
          <span class="token function">execTasks</span><span class="token punctuation">(</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//从任务队列中获取批量任务</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span> <span class="token function">pollTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">{</span>
  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span> ts<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//阻塞式获取一条任务</span>
  <span class="token class-name">Task</span> t <span class="token operator">=</span> bq<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>t <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ts<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//非阻塞式获取一条任务</span>
    t <span class="token operator">=</span> bq<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ts<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//批量执行任务</span>
<span class="token function">execTasks</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Task</span><span class="token punctuation">&gt;</span></span> ts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//省略具体代码无数</span>
<span class="token punctuation">}</span>
\`\`\`

### 支持分阶段提交以提升性能

利用生产者<span class="token operator">-</span>消费者模式还可以轻松地支持一种分阶段提交的应用场景。我们知道写文件如果同步刷盘性能会很慢，所以对于不是很重要的数据，我们往往采用异步刷盘的方式。

这个日志组件的异步刷盘操作本质上其实就是一种<span class="token operator">*</span><span class="token operator">*</span>分阶段提交<span class="token operator">*</span><span class="token operator">*</span>。下面我们具体看看用生产者<span class="token operator">-</span>消费者模式如何实现。在下面的示例代码中，可以通过调用 \`<span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\`和\`<span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 方法写入日志，这两个方法都是创建了一个日志任务 <span class="token class-name">LogMsg</span>，并添加到阻塞队列中，调用 \`<span class="token function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\`和\`<span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 方法的线程是生产者；而真正将日志写入文件的是消费者线程，在 <span class="token class-name">Logger</span> 这个类中，我们只创建了 <span class="token number">1</span> 个消费者线程，在这个消费者线程中，会根据刷盘规则执行刷盘操作，逻辑很简单，这里就不赘述了。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span>

    <span class="token comment">//任务队列</span>
    <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LogMsg</span><span class="token punctuation">&gt;</span></span> bq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//flush 批量</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> batchSize <span class="token operator">=</span> <span class="token number">500</span><span class="token punctuation">;</span>
    <span class="token comment">//只需要一个线程写日志</span>
    <span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//启动写日志线程</span>
    <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token class-name">File</span><span class="token punctuation">.</span><span class="token function">createTempFile</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.log&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">FileWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">//未刷盘日志数量</span>
                <span class="token keyword">int</span> curIdx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">long</span> preFT <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">LogMsg</span> log <span class="token operator">=</span> bq<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//写日志</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>log <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        writer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token operator">++</span>curIdx<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">//如果不存在未刷盘数据，则无需刷盘</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>curIdx <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">//根据规则刷盘</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>log <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> log<span class="token punctuation">.</span>level <span class="token operator">==</span> <span class="token constant">LEVEL</span><span class="token punctuation">.</span><span class="token constant">ERROR</span>
                        <span class="token operator">||</span> curIdx <span class="token operator">==</span> batchSize
                        <span class="token operator">||</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> preFT <span class="token operator">&gt;</span> <span class="token number">5000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        writer<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        curIdx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                        preFT <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    writer<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    writer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//写 INFO 级别日志</span>
    <span class="token keyword">void</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bq<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LogMsg</span><span class="token punctuation">(</span>
            <span class="token constant">LEVEL</span><span class="token punctuation">.</span><span class="token constant">INFO</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//写 ERROR 级别日志</span>
    <span class="token keyword">void</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bq<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LogMsg</span><span class="token punctuation">(</span>
            <span class="token constant">LEVEL</span><span class="token punctuation">.</span><span class="token constant">ERROR</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">//日志级别</span>
<span class="token keyword">enum</span> <span class="token class-name">LEVEL</span> <span class="token punctuation">{</span>
    <span class="token constant">INFO</span><span class="token punctuation">,</span>
    <span class="token constant">ERROR</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">LogMsg</span> <span class="token punctuation">{</span>
    <span class="token class-name">LEVEL</span> level<span class="token punctuation">;</span>
    <span class="token class-name">String</span> msg<span class="token punctuation">;</span>

    <span class="token comment">//省略构造函数实现</span>
    <span class="token class-name">LogMsg</span><span class="token punctuation">(</span><span class="token class-name">LEVEL</span> lvl<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token comment">//省略 toString() 实现</span>
    <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

## 设计模式模块热点问题答疑

略

## 案例分析（一）：高性能限流器 <span class="token class-name">Guava</span> <span class="token class-name">RateLimiter</span>

<span class="token class-name">Guava</span> 是 <span class="token class-name">Google</span> 开源的 <span class="token class-name">Java</span> 类库，提供了一个工具类 <span class="token class-name">RateLimiter</span>。

【示例】使用 <span class="token class-name">RateLimiter</span> 限流

\`\`\`java
<span class="token comment">//限流器流速：2 个请求/秒</span>
<span class="token class-name">RateLimiter</span> limiter <span class="token operator">=</span> <span class="token class-name">RateLimiter</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//执行任务的线程池</span>
<span class="token class-name">ExecutorService</span> es <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//记录上一次执行时间</span>
prev <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//测试执行 20 次</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//限流器限流</span>
    limiter<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//提交任务异步执行</span>
    es<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> cur <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打印时间间隔：毫秒</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span>cur <span class="token operator">-</span> prev<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        prev <span class="token operator">=</span> cur<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果：</span>
<span class="token comment">// ...</span>
<span class="token comment">// 500</span>
<span class="token comment">// 499</span>
<span class="token comment">// 500</span>
<span class="token comment">// 499</span>
\`\`\`

### 经典限流算法：令牌桶算法

<span class="token class-name">Guava</span> 限流算法采用<span class="token operator">*</span><span class="token operator">*</span>令牌桶算法<span class="token operator">*</span><span class="token operator">*</span>，其<span class="token operator">*</span><span class="token operator">*</span>核心是要想通过限流器，必须拿到令牌<span class="token operator">*</span><span class="token operator">*</span>。也就是说，只要我们能够限制发放令牌的速率，那么就能控制流速了。令牌桶算法的详细描述如下：

<span class="token number">1.</span> 令牌以固定的速率添加到令牌桶中，假设限流的速率是 r<span class="token operator">/</span>秒，则令牌每 <span class="token number">1</span><span class="token operator">/</span>r 秒会添加一个；
<span class="token number">2.</span> 假设令牌桶的容量是 b ，如果令牌桶已满，则新的令牌会被丢弃；
<span class="token number">3.</span> 请求能够通过限流器的前提是令牌桶中有令牌。

这个算法中，限流的速率 r 还是比较容易理解的，但令牌桶的容量 b 该怎么理解呢？b 其实是 burst 的简写，意义是<span class="token operator">*</span><span class="token operator">*</span>限流器允许的最大突发流量<span class="token operator">*</span><span class="token operator">*</span>。比如 b<span class="token operator">=</span><span class="token number">10</span>，而且令牌桶中的令牌已满，此时限流器允许 <span class="token number">10</span> 个请求同时通过限流器，当然只是突发流量而已，这 <span class="token number">10</span> 个请求会带走 <span class="token number">10</span> 个令牌，所以后续的流量只能按照速率 r 通过限流器。

### <span class="token class-name">Guava</span> 如何实现令牌桶算法

<span class="token class-name">Guava</span> 实现令牌桶算法，其关键是<span class="token operator">*</span><span class="token operator">*</span>记录并动态计算下一令牌发放的时间<span class="token operator">*</span><span class="token operator">*</span>。

假设令牌桶的容量为 b<span class="token operator">=</span><span class="token number">1</span>，限流速率 r <span class="token operator">=</span> <span class="token number">1</span> 个请求<span class="token operator">/</span>秒，如下图所示，如果当前令牌桶中没有令牌，下一个令牌的发放时间是在第 <span class="token number">3</span> 秒，而在第 <span class="token number">2</span> 秒的时候有一个线程 <span class="token constant">T1</span> 请求令牌，此时该如何处理呢？

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010943737.</span>png<span class="token punctuation">)</span>

对于这个请求令牌的线程而言，很显然需要等待 <span class="token number">1</span> 秒，因为 <span class="token number">1</span> 秒以后（第 <span class="token number">3</span> 秒）它就能拿到令牌了。此时需要注意的是，下一个令牌发放的时间也要增加 <span class="token number">1</span> 秒，为什么呢？因为第 <span class="token number">3</span> 秒发放的令牌已经被线程 <span class="token constant">T1</span> 预占了。处理之后如下图所示。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010944198.</span>png<span class="token punctuation">)</span>

假设 <span class="token constant">T1</span> 在预占了第 <span class="token number">3</span> 秒的令牌之后，马上又有一个线程 <span class="token constant">T2</span> 请求令牌，如下图所示。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010945560.</span>png<span class="token punctuation">)</span>

很显然，由于下一个令牌产生的时间是第 <span class="token number">4</span> 秒，所以线程 <span class="token constant">T2</span> 要等待两秒的时间，才能获取到令牌，同时由于 <span class="token constant">T2</span> 预占了第 <span class="token number">4</span> 秒的令牌，所以下一令牌产生时间还要增加 <span class="token number">1</span> 秒，完全处理之后，如下图所示。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010946590.</span>png<span class="token punctuation">)</span>

上面线程 <span class="token constant">T1</span>、<span class="token constant">T2</span> 都是在<span class="token operator">*</span><span class="token operator">*</span>下一令牌产生时间之前<span class="token operator">*</span><span class="token operator">*</span>请求令牌，如果线程在<span class="token operator">*</span><span class="token operator">*</span>下一令牌产生时间之后<span class="token operator">*</span><span class="token operator">*</span>请求令牌会如何呢？假设在线程 <span class="token constant">T1</span> 请求令牌之后的 <span class="token number">5</span> 秒，也就是第 <span class="token number">7</span> 秒，线程 <span class="token constant">T3</span> 请求令牌，如下图所示。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010947529.</span>png<span class="token punctuation">)</span>

由于在第 <span class="token number">5</span> 秒已经产生了一个令牌，所以此时线程 <span class="token constant">T3</span> 可以直接拿到令牌，而无需等待。在第 <span class="token number">7</span> 秒，实际上限流器能够产生 <span class="token number">3</span> 个令牌，第 <span class="token number">5</span>、<span class="token number">6</span>、<span class="token number">7</span> 秒各产生一个令牌。由于我们假设令牌桶的容量是 <span class="token number">1</span>，所以第 <span class="token number">6</span>、<span class="token number">7</span> 秒产生的令牌就丢弃了，其实等价地你也可以认为是保留的第 <span class="token number">7</span> 秒的令牌，丢弃的第 <span class="token number">5</span>、<span class="token number">6</span> 秒的令牌，也就是说第 <span class="token number">7</span> 秒的令牌被线程 <span class="token constant">T3</span> 占有了，于是下一令牌的的产生时间应该是第 <span class="token number">8</span> 秒，如下图所示。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010947885.</span>png<span class="token punctuation">)</span>

通过上面简要地分析们<span class="token operator">*</span><span class="token operator">*</span>只需要记录一个下一令牌产生的时间，并动态更新它，就能够轻松完成限流功能<span class="token operator">*</span><span class="token operator">*</span>。我们可以将上面的这个算法代码化，示例代码如下所示，依然假设令牌桶的容量是 <span class="token number">1</span>。关键是<span class="token operator">*</span><span class="token operator">*</span> <span class="token function">reserve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法<span class="token operator">*</span><span class="token operator">*</span>，这个方法会为请求令牌的线程预分配令牌，同时返回该线程能够获取令牌的时间。其实现逻辑就是上面提到的：如果线程请求令牌的时间在下一令牌产生时间之后，那么该线程立刻就能够获取令牌；反之，如果请求时间在下一令牌产生时间之前，那么该线程是在下一令牌产生的时间获取令牌。由于此时下一令牌已经被该线程预占，所以下一令牌产生的时间需要加上 <span class="token number">1</span> 秒。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">SimpleLimiter</span> <span class="token punctuation">{</span>

    <span class="token comment">//下一令牌产生时间</span>
    <span class="token keyword">long</span> next <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//发放令牌间隔：纳秒</span>
    <span class="token keyword">long</span> interval <span class="token operator">=</span> <span class="token number">1000_000_000</span><span class="token punctuation">;</span>

    <span class="token comment">//预占令牌，返回能够获取令牌的时间</span>
    <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">reserve</span><span class="token punctuation">(</span><span class="token keyword">long</span> now<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//请求时间在下一令牌产生时间之后</span>
        <span class="token comment">//重新计算下一令牌产生时间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">&gt;</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//将下一令牌产生时间重置为当前时间</span>
            next <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//能够获取令牌的时间</span>
        <span class="token keyword">long</span> at <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token comment">//设置下一令牌产生时间</span>
        next <span class="token operator">+=</span> interval<span class="token punctuation">;</span>
        <span class="token comment">//返回线程需要等待的时间</span>
        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>at<span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//申请令牌</span>
    <span class="token keyword">void</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//申请令牌时的时间</span>
        <span class="token keyword">long</span> now <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//预占令牌</span>
        <span class="token keyword">long</span> at <span class="token operator">=</span> <span class="token function">reserve</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> waitTime <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>at <span class="token operator">-</span> now<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//按照条件等待</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>waitTime <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

如果令牌桶的容量大于 <span class="token number">1</span>，又该如何处理呢？按照令牌桶算法，令牌要首先从令牌桶中出，所以我们需要按需计算令牌桶中的数量，当有线程请求令牌时，先从令牌桶中出。具体的代码实现如下所示。我们增加了一个<span class="token operator">*</span><span class="token operator">*</span> <span class="token function">resync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法<span class="token operator">*</span><span class="token operator">*</span>，在这个方法中，如果线程请求令牌的时间在下一令牌产生时间之后，会重新计算令牌桶中的令牌数，<span class="token operator">*</span><span class="token operator">*</span>新产生的令牌的计算公式是：<span class="token punctuation">(</span>now<span class="token operator">-</span>next<span class="token punctuation">)</span><span class="token operator">/</span>interval<span class="token operator">*</span><span class="token operator">*</span>，你可对照上面的示意图来理解。<span class="token function">reserve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法中，则增加了先从令牌桶中出令牌的逻辑，不过需要注意的是，如果令牌是从令牌桶中出的，那么 next 就无需增加一个 interval 了。

\`\`\`java
<span class="token keyword">class</span> <span class="token class-name">SimpleLimiter</span> <span class="token punctuation">{</span>

    <span class="token comment">//当前令牌桶中的令牌数量</span>
    <span class="token keyword">long</span> storedPermits <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">//令牌桶的容量</span>
    <span class="token keyword">long</span> maxPermits <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token comment">//下一令牌产生时间</span>
    <span class="token keyword">long</span> next <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//发放令牌间隔：纳秒</span>
    <span class="token keyword">long</span> interval <span class="token operator">=</span> <span class="token number">1000_000_000</span><span class="token punctuation">;</span>

    <span class="token comment">//请求时间在下一令牌产生时间之后，则</span>
    <span class="token comment">// 1. 重新计算令牌桶中的令牌数</span>
    <span class="token comment">// 2. 将下一个令牌发放时间重置为当前时间</span>
    <span class="token keyword">void</span> <span class="token function">resync</span><span class="token punctuation">(</span><span class="token keyword">long</span> now<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">&gt;</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//新产生的令牌数</span>
            <span class="token keyword">long</span> newPermits <span class="token operator">=</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> next<span class="token punctuation">)</span> <span class="token operator">/</span> interval<span class="token punctuation">;</span>
            <span class="token comment">//新令牌增加到令牌桶</span>
            storedPermits <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span>maxPermits<span class="token punctuation">,</span> storedPermits <span class="token operator">+</span> newPermits<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将下一个令牌发放时间重置为当前时间</span>
            next <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//预占令牌，返回能够获取令牌的时间</span>
    <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">reserve</span><span class="token punctuation">(</span><span class="token keyword">long</span> now<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resync</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//能够获取令牌的时间</span>
        <span class="token keyword">long</span> at <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token comment">//令牌桶中能提供的令牌</span>
        <span class="token keyword">long</span> fb <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> storedPermits<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//令牌净需求：首先减掉令牌桶中的令牌</span>
        <span class="token keyword">long</span> nr <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">-</span> fb<span class="token punctuation">;</span>
        <span class="token comment">//重新计算下一令牌产生时间</span>
        next <span class="token operator">=</span> next <span class="token operator">+</span> nr <span class="token operator">*</span> interval<span class="token punctuation">;</span>
        <span class="token comment">//重新计算令牌桶中的令牌</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>storedPermits <span class="token operator">-=</span> fb<span class="token punctuation">;</span>
        <span class="token keyword">return</span> at<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//申请令牌</span>
    <span class="token keyword">void</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//申请令牌时的时间</span>
        <span class="token keyword">long</span> now <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//预占令牌</span>
        <span class="token keyword">long</span> at <span class="token operator">=</span> <span class="token function">reserve</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> waitTime <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>at <span class="token operator">-</span> now<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//按照条件等待</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>waitTime <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

### 总结

经典的限流算法有两个，一个是<span class="token operator">*</span><span class="token operator">*</span>令牌桶算法（<span class="token class-name">Token</span> <span class="token class-name">Bucket</span>）<span class="token operator">*</span><span class="token operator">*</span>，另一个是<span class="token operator">*</span><span class="token operator">*</span>漏桶算法（<span class="token class-name">Leaky</span> <span class="token class-name">Bucket</span>）<span class="token operator">*</span><span class="token operator">*</span>。令牌桶算法是定时向令牌桶发送令牌，请求能够从令牌桶中拿到令牌，然后才能通过限流器；而漏桶算法里，请求就像水一样注入漏桶，漏桶会按照一定的速率自动将水漏掉，只有漏桶里还能注入水的时候，请求才能通过限流器。令牌桶算法和漏桶算法很像一个硬币的正反面，所以你可以参考令牌桶算法的实现来实现漏桶算法。

## 案例分析（二）：高性能网络应用框架 <span class="token class-name">Netty</span>

### 网络编程性能的瓶颈

<span class="token constant">BIO</span> 模型里，所有 <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 操作和 <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 操作都会阻塞当前线程的，如果客户端已经和服务端建立了一个连接，而迟迟不发送数据，那么服务端的 <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 操作会一直阻塞，所以<span class="token operator">*</span><span class="token operator">*</span>使用 <span class="token constant">BIO</span> 模型，一般都会为每个 socket 分配一个独立的线程<span class="token operator">*</span><span class="token operator">*</span>，这样就不会因为线程阻塞在一个 socket 上而影响对其他 socket 的读写。<span class="token constant">BIO</span> 的线程模型如下图所示，每一个 socket 都对应一个独立的线程；为了避免频繁创建、消耗线程，可以采用线程池，但是 socket 和线程之间的对应关系并不会变化。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010957084.</span>png<span class="token punctuation">)</span>

<span class="token constant">BIO</span> 这种线程模型适用于 socket 连接不是很多的场景；但是现在的互联网场景，往往需要服务器能够支撑十万甚至百万连接，而创建十万甚至上百万个线程显然并不现实，所以 <span class="token constant">BIO</span> 线程模型无法解决百万连接的问题。如果仔细观察，你会发现互联网场景中，虽然连接多，但是每个连接上的请求并不频繁，所以线程大部分时间都在等待 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 就绪。也就是说线程大部分时间都阻塞在那里，这完全是浪费，如果我们能够解决这个问题，那就不需要这么多线程了。

可以用一个线程来处理多个连接，这样线程的利用率就上来了，同时所需的线程数量也跟着降下来了。这个思路很好，可是使用 <span class="token constant">BIO</span> 相关的 <span class="token constant">API</span> 是无法实现的，这是为什么呢？因为 <span class="token constant">BIO</span> 相关的 socket 读写操作都是阻塞式的，而一旦调用了阻塞式 <span class="token constant">API</span>，在 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 就绪前，调用线程会一直阻塞，也就无法处理其他的 socket 连接了。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409010959294.</span>png<span class="token punctuation">)</span>

### <span class="token class-name">Reactor</span> 模式

下面是 <span class="token class-name">Reactor</span> 模式的类结构图，其中 <span class="token class-name">Handle</span> 指的是 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 句柄，在 <span class="token class-name">Java</span> 网络编程里，它本质上就是一个网络连接。<span class="token class-name">Event</span> <span class="token class-name">Handler</span> 很容易理解，就是一个事件处理器，其中 <span class="token function">handle_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法处理 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 事件，也就是每个 <span class="token class-name">Event</span> <span class="token class-name">Handler</span> 处理一个 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> <span class="token class-name">Handle</span>；<span class="token function">get_handle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法可以返回这个 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 的 <span class="token class-name">Handle</span>。<span class="token class-name">Synchronous</span> <span class="token class-name">Event</span> <span class="token class-name">Demultiplexer</span> 可以理解为操作系统提供的 <span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span> 多路复用 <span class="token constant">API</span>，例如 <span class="token constant">POSIX</span> 标准里的 <span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 以及 <span class="token class-name">Linux</span> 里面的 <span class="token function">epoll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409011000910.</span>png<span class="token punctuation">)</span>

<span class="token class-name">Reactor</span> 模式的核心自然是 <span class="token operator">*</span><span class="token operator">*</span><span class="token class-name">Reactor</span> 这个类<span class="token operator">*</span><span class="token operator">*</span>，其中 <span class="token function">register_handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 和 <span class="token function">remove_handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 这两个方法可以注册和删除一个事件处理器；<span class="token operator">*</span><span class="token operator">*</span><span class="token function">handle_events</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方式是核心<span class="token operator">*</span><span class="token operator">*</span>，也是 <span class="token class-name">Reactor</span> 模式的发动机，这个方法的核心逻辑如下：首先通过同步事件多路选择器提供的 <span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法监听网络事件，当有网络事件就绪后，就遍历事件处理器来处理该网络事件。由于网络事件是源源不断的，所以在主程序中启动 <span class="token class-name">Reactor</span> 模式，需要以 \`<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>\` 的方式调用 <span class="token function">handle_events</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法。

\`\`\`java
<span class="token keyword">void</span> <span class="token class-name">Reactor</span><span class="token operator">::</span><span class="token function">handle_events</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//通过同步事件多路选择器提供的</span>
  <span class="token comment">//select() 方法监听网络事件</span>
  <span class="token function">select</span><span class="token punctuation">(</span>handlers<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//处理网络事件</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span>h in handlers<span class="token punctuation">)</span><span class="token punctuation">{</span>
    h<span class="token punctuation">.</span><span class="token function">handle_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 在主程序中启动事件循环</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handle_events</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
\`\`\`

### <span class="token class-name">Netty</span> 中的线程模型

<span class="token operator">*</span><span class="token operator">*</span><span class="token class-name">Netty</span> 中最核心的概念是事件循环（<span class="token class-name">EventLoop</span>）<span class="token operator">*</span><span class="token operator">*</span>，其实也就是 <span class="token class-name">Reactor</span> 模式中的 <span class="token class-name">Reactor</span>，<span class="token operator">*</span><span class="token operator">*</span>负责监听网络事件并调用事件处理器进行处理<span class="token operator">*</span><span class="token operator">*</span>。在 <span class="token number">4.</span>x 版本的 <span class="token class-name">Netty</span> 中，网络连接和 <span class="token class-name">EventLoop</span> 是稳定的多对 <span class="token number">1</span> 关系，而 <span class="token class-name">EventLoop</span> 和 <span class="token class-name">Java</span> 线程是 <span class="token number">1</span> 对 <span class="token number">1</span> 关系，这里的稳定指的是关系一旦确定就不再发生变化。也就是说一个网络连接只会对应唯一的一个 <span class="token class-name">EventLoop</span>，而一个 <span class="token class-name">EventLoop</span> 也只会对应到一个 <span class="token class-name">Java</span> 线程，所以<span class="token operator">*</span><span class="token operator">*</span>一个网络连接只会对应到一个 <span class="token class-name">Java</span> 线程<span class="token operator">*</span><span class="token operator">*</span>。

一个网络连接对应到一个 <span class="token class-name">Java</span> 线程上，最大的好处就是对于一个网络连接的事件处理是单线程的，这样就<span class="token operator">*</span><span class="token operator">*</span>避免了各种并发问题<span class="token operator">*</span><span class="token operator">*</span>。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409011004870.</span>png<span class="token punctuation">)</span>

<span class="token class-name">Netty</span> 中还有一个核心概念是<span class="token operator">*</span><span class="token operator">*</span> <span class="token class-name">EventLoopGroup</span><span class="token operator">*</span><span class="token operator">*</span>，顾名思义，一个 <span class="token class-name">EventLoopGroup</span> 由一组 <span class="token class-name">EventLoop</span> 组成。实际使用中，一般都会创建两个 <span class="token class-name">EventLoopGroup</span>，一个称为 bossGroup，一个称为 workerGroup。

这个和 socket 处理网络请求的机制有关，socket 处理 <span class="token constant">TCP</span> 网络连接请求，是在一个独立的 socket 中，每当有一个 <span class="token constant">TCP</span> 连接成功建立，都会创建一个新的 socket，之后对 <span class="token constant">TCP</span> 连接的读写都是由新创建处理的 socket 完成的。也就是说<span class="token operator">*</span><span class="token operator">*</span>处理 <span class="token constant">TCP</span> 连接请求和读写请求是通过两个不同的 socket 完成的<span class="token operator">*</span><span class="token operator">*</span>。

<span class="token operator">*</span><span class="token operator">*</span>在 <span class="token class-name">Netty</span> 中，bossGroup 就用来处理连接请求的，而 workerGroup 是用来处理读写请求的<span class="token operator">*</span><span class="token operator">*</span>。bossGroup 处理完连接请求后，会将这个连接提交给 workerGroup 来处理， workerGroup 里面有多个 <span class="token class-name">EventLoop</span>，那新的连接会交给哪个 <span class="token class-name">EventLoop</span> 来处理呢？这就需要一个负载均衡算法，<span class="token class-name">Netty</span> 中目前使用的是<span class="token operator">*</span><span class="token operator">*</span>轮询算法<span class="token operator">*</span><span class="token operator">*</span>。

### 用 <span class="token class-name">Netty</span> 实现 <span class="token class-name">Echo</span> 程序服务端

第一个，如果 <span class="token class-name">NettybossGroup</span> 只监听一个端口，那 bossGroup 只需要 <span class="token number">1</span> 个 <span class="token class-name">EventLoop</span> 就可以了，多了纯属浪费。

第二个，默认情况下，<span class="token class-name">Netty</span> 会创建“<span class="token number">2</span><span class="token operator">*</span><span class="token constant">CPU</span> 核数”个 <span class="token class-name">EventLoop</span>，由于网络连接与 <span class="token class-name">EventLoop</span> 有稳定的关系，所以事件处理器在处理网络事件的时候是不能有阻塞操作的，否则很容易导致请求大面积超时。如果实在无法避免使用阻塞操作，那可以通过线程池来异步处理。

\`\`\`java
<span class="token comment">//事件处理器</span>
<span class="token keyword">final</span> <span class="token class-name">EchoServerHandler</span> serverHandler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EchoServerHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//boss 线程组</span>
<span class="token class-name">EventLoopGroup</span> bossGroup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NioEventLoopGroup</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//worker 线程组</span>
<span class="token class-name">EventLoopGroup</span> workerGroup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NioEventLoopGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">ServerBootstrap</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerBootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span>bossGroup<span class="token punctuation">,</span> workerGroup<span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token class-name">NioServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">childHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ChannelInitializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SocketChannel</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token annotation punctuation">@Override</span>
         <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initChannel</span><span class="token punctuation">(</span><span class="token class-name">SocketChannel</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
             ch<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>serverHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//bind 服务端端口</span>
    <span class="token class-name">ChannelFuture</span> f <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token number">9090</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    f<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">closeFuture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">//终止工作线程组</span>
    workerGroup<span class="token punctuation">.</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//终止 boss 线程组</span>
    bossGroup<span class="token punctuation">.</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//socket 连接处理器</span>
<span class="token keyword">class</span> <span class="token class-name">EchoServerHandler</span> <span class="token keyword">extends</span> <span class="token class-name">ChannelInboundHandlerAdapter</span> <span class="token punctuation">{</span>

    <span class="token comment">//处理读事件</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">channelRead</span><span class="token punctuation">(</span><span class="token class-name">ChannelHandlerContext</span> ctx<span class="token punctuation">,</span> <span class="token class-name">Object</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//处理读完成事件</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">channelReadComplete</span><span class="token punctuation">(</span><span class="token class-name">ChannelHandlerContext</span> ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//处理异常事件</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">exceptionCaught</span><span class="token punctuation">(</span><span class="token class-name">ChannelHandlerContext</span> ctx<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> cause<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cause<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

### 总结

<span class="token class-name">Netty</span> 是一个款优秀的网络编程框架，性能非常好，为了实现高性能的目标，<span class="token class-name">Netty</span> 做了很多优化，例如优化了 <span class="token class-name">ByteBuffer</span>、支持零拷贝等等，和并发编程相关的就是它的线程模型了。<span class="token class-name">Netty</span> 的线程模型设计得很精巧，每个网络连接都关联到了一个线程上，这样做的好处是：对于一个网络连接，读写操作都是单线程执行的，从而避免了并发程序的各种问题。

## 案例分析（三）：高性能队列 <span class="token class-name">Disruptor</span>

<span class="token operator">*</span><span class="token operator">*</span><span class="token class-name">Disruptor</span> 是一款高性能的有界内存队列<span class="token operator">*</span><span class="token operator">*</span>，目前应用非常广泛，<span class="token class-name">Log4j2</span>、<span class="token class-name">Spring</span> <span class="token class-name">Messaging</span>、<span class="token class-name">HBase</span>、<span class="token class-name">Storm</span> 都用到了 <span class="token class-name">Disruptor</span>，那 <span class="token class-name">Disruptor</span> 的性能为什么这么高呢？<span class="token class-name">Disruptor</span> 项目团队曾经写过一篇论文，详细解释了其原因，可以总结为如下：

<span class="token number">1.</span> 内存分配更加合理，使用 <span class="token class-name">RingBuffer</span> 数据结构，数组元素在初始化时一次性全部创建，提升缓存命中率；对象循环利用，避免频繁 <span class="token constant">GC</span>。
<span class="token number">2.</span> 能够避免伪共享，提升缓存利用率。
<span class="token number">3.</span> 采用无锁算法，避免频繁加锁、解锁的性能消耗。
<span class="token number">4.</span> 支持批量消费，消费者可以无锁方式消费多个消息。

<span class="token class-name">Disruptor</span> 的使用比 <span class="token class-name">Java</span> <span class="token constant">SDK</span> 提供 <span class="token class-name">BlockingQueue</span> 要复杂一些，但是总体思路还是一致的，其大致情况如下：

<span class="token operator">-</span> 在 <span class="token class-name">Disruptor</span> 中，生产者生产的对象（也就是消费者消费的对象）称为 <span class="token class-name">Event</span>，使用 <span class="token class-name">Disruptor</span> 必须自定义 <span class="token class-name">Event</span>，例如示例代码的自定义 <span class="token class-name">Event</span> 是 <span class="token class-name">LongEvent</span>；

<span class="token operator">-</span> 构建 <span class="token class-name">Disruptor</span> 对象除了要指定队列大小外，还需要传入一个 <span class="token class-name">EventFactory</span>，示例代码中传入的是\`<span class="token class-name">LongEvent</span><span class="token operator">::</span><span class="token keyword">new</span>\`；

<span class="token operator">-</span> 消费 <span class="token class-name">Disruptor</span> 中的 <span class="token class-name">Event</span> 需要通过 <span class="token function">handleEventsWith</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法注册一个事件处理器，发布 <span class="token class-name">Event</span> 则需要通过 <span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法。

  \`\`\`java
  <span class="token comment">// 自定义 Event</span>
  <span class="token keyword">class</span> <span class="token class-name">LongEvent</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> value<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">long</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 指定 RingBuffer 大小，</span>
  <span class="token comment">// 必须是 2 的 N 次方</span>
  <span class="token keyword">int</span> bufferSize <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>

  <span class="token comment">// 构建 Disruptor</span>
  <span class="token class-name">Disruptor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongEvent</span><span class="token punctuation">&gt;</span></span> disruptor
    <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Disruptor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>
      <span class="token class-name">LongEvent</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">,</span>
      bufferSize<span class="token punctuation">,</span>
      <span class="token class-name">DaemonThreadFactory</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 注册事件处理器</span>
  disruptor<span class="token punctuation">.</span><span class="token function">handleEventsWith</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span>event<span class="token punctuation">,</span> sequence<span class="token punctuation">,</span> endOfBatch<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;E: &quot;</span><span class="token operator">+</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 启动 Disruptor</span>
  disruptor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 获取 RingBuffer</span>
  <span class="token class-name">RingBuffer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongEvent</span><span class="token punctuation">&gt;</span></span> ringBuffer
    <span class="token operator">=</span> disruptor<span class="token punctuation">.</span><span class="token function">getRingBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 生产 Event</span>
  <span class="token class-name">ByteBuffer</span> bb <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">long</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token boolean">true</span><span class="token punctuation">;</span> l<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    bb<span class="token punctuation">.</span><span class="token function">putLong</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> l<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 生产者生产消息</span>
    ringBuffer<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>event<span class="token punctuation">,</span> sequence<span class="token punctuation">,</span> buffer<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
        event<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">getLong</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  \`\`\`

### <span class="token class-name">RingBuffer</span> 如何提升性能

<span class="token class-name">Java</span> <span class="token constant">SDK</span> 中 <span class="token class-name">ArrayBlockingQueue</span> 使用<span class="token operator">*</span><span class="token operator">*</span>数组<span class="token operator">*</span><span class="token operator">*</span>作为底层的数据存储，而 <span class="token class-name">Disruptor</span> 是使用<span class="token operator">*</span><span class="token operator">*</span> <span class="token class-name">RingBuffer</span> <span class="token operator">*</span><span class="token operator">*</span>作为数据存储。<span class="token class-name">RingBuffer</span> 本质上也是数组。

生产者线程向 <span class="token class-name">ArrayBlockingQueue</span> 增加一个元素，每次增加元素 <span class="token class-name">E</span> 之前，都需要创建一个对象 <span class="token class-name">E</span>，如下图所示，<span class="token class-name">ArrayBlockingQueue</span> 内部有 <span class="token number">6</span> 个元素，这 <span class="token number">6</span> 个元素都是由生产者线程创建的，由于创建这些元素的时间基本上是离散的，所以这些元素的内存地址大概率也不是连续的。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409020709300.</span>png<span class="token punctuation">)</span>

<span class="token class-name">Disruptor</span> 内部的 <span class="token class-name">RingBuffer</span> 也是用数组实现的，但是这个数组中的所有元素在初始化时是一次性全部创建的，所以这些元素的内存地址大概率是连续的，相关的代码如下所示。

\`\`\`java
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>bufferSize<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//entries[] 就是 RingBuffer 内部的数组</span>
  <span class="token comment">//eventFactory 就是前面示例代码中传入的 LongEvent::new</span>
  entries<span class="token punctuation">[</span><span class="token constant">BUFFER_PAD</span> <span class="token operator">+</span> i<span class="token punctuation">]</span>
    <span class="token operator">=</span> eventFactory<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
\`\`\`

数组中所有元素内存地址连续能提升性能。因为消费者线程在消费的时候，是遵循空间局部性原理的，消费完第 <span class="token number">1</span> 个元素，很快就会消费第 <span class="token number">2</span> 个元素；当消费第 <span class="token number">1</span> 个元素 <span class="token constant">E1</span> 的时候，<span class="token constant">CPU</span> 会把内存中 <span class="token constant">E1</span> 后面的数据也加载进 <span class="token class-name">Cache</span>，如果 <span class="token constant">E1</span> 和 <span class="token constant">E2</span> 在内存中的地址是连续的，那么 <span class="token constant">E2</span> 也就会被加载进 <span class="token class-name">Cache</span> 中，然后当消费第 <span class="token number">2</span> 个元素的时候，由于 <span class="token constant">E2</span> 已经在 <span class="token class-name">Cache</span> 中了，所以就不需要从内存中加载了，这样就能大大提升性能。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409020712580.</span>png<span class="token punctuation">)</span>

除此之外，在 <span class="token class-name">Disruptor</span> 中，生产者线程通过 <span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 发布 <span class="token class-name">Event</span> 的时候，并不是创建一个新的 <span class="token class-name">Event</span>，而是通过 event<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法修改 <span class="token class-name">Event</span>， 也就是说 <span class="token class-name">RingBuffer</span> 创建的 <span class="token class-name">Event</span> 是可以循环利用的，这样还能避免频繁创建、删除 <span class="token class-name">Event</span> 导致的频繁 <span class="token constant">GC</span> 问题。

### 如何避免“伪共享”

<span class="token operator">*</span><span class="token operator">*</span>伪共享指的是由于共享缓存行导致缓存无效的场景<span class="token operator">*</span><span class="token operator">*</span>。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409020714249.</span>png<span class="token punctuation">)</span>

避免伪共享的方法是：

<span class="token operator">*</span><span class="token operator">*</span>每个变量独占一个缓存行、不共享缓存行<span class="token operator">*</span><span class="token operator">*</span>就可以了，具体技术是<span class="token operator">*</span><span class="token operator">*</span>缓存行填充<span class="token operator">*</span><span class="token operator">*</span>。比如想让 takeIndex 独占一个缓存行，可以在 takeIndex 的前后各填充 <span class="token number">56</span> 个字节，这样就一定能保证 takeIndex 独占一个缓存行。下面的示例代码出自 <span class="token class-name">Disruptor</span>，<span class="token class-name">Sequence</span> 对象中的 value 属性就能避免伪共享，因为这个属性前后都填充了 <span class="token number">56</span> 个字节。<span class="token class-name">Disruptor</span> 中很多对象，例如 <span class="token class-name">RingBuffer</span>、<span class="token class-name">RingBuffer</span> 内部的数组都用到了这种填充技术来避免伪共享。

\`\`\`java
<span class="token comment">//前：填充 56 字节</span>
<span class="token keyword">class</span> <span class="token class-name">LhsPadding</span><span class="token punctuation">{</span>
    <span class="token keyword">long</span> p1<span class="token punctuation">,</span> p2<span class="token punctuation">,</span> p3<span class="token punctuation">,</span> p4<span class="token punctuation">,</span> p5<span class="token punctuation">,</span> p6<span class="token punctuation">,</span> p7<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Value</span> <span class="token keyword">extends</span> <span class="token class-name">LhsPadding</span><span class="token punctuation">{</span>
    <span class="token keyword">volatile</span> <span class="token keyword">long</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//后：填充 56 字节</span>
<span class="token keyword">class</span> <span class="token class-name">RhsPadding</span> <span class="token keyword">extends</span> <span class="token class-name">Value</span><span class="token punctuation">{</span>
    <span class="token keyword">long</span> p9<span class="token punctuation">,</span> p10<span class="token punctuation">,</span> p11<span class="token punctuation">,</span> p12<span class="token punctuation">,</span> p13<span class="token punctuation">,</span> p14<span class="token punctuation">,</span> p15<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Sequence</span> <span class="token keyword">extends</span> <span class="token class-name">RhsPadding</span><span class="token punctuation">{</span>
  <span class="token comment">//省略实现</span>
<span class="token punctuation">}</span>
\`\`\`

### <span class="token class-name">Disruptor</span> 中的无锁算法

<span class="token class-name">Disruptor</span> 中最复杂的是入队操作，所以我们重点来看看入队操作是如何实现的。

对于入队操作，最关键的要求是不能覆盖没有消费的元素；对于出队操作，最关键的要求是不能读取没有写入的元素，所以 <span class="token class-name">Disruptor</span> 中也一定会维护类似出队索引和入队索引这样两个关键变量。<span class="token class-name">Disruptor</span> 中的 <span class="token class-name">RingBuffer</span> 维护了入队索引，但是并没有维护出队索引，这是因为在 <span class="token class-name">Disruptor</span> 中多个消费者可以同时消费，每个消费者都会有一个出队索引，所以 <span class="token class-name">RingBuffer</span> 的出队索引是所有消费者里面最小的那一个。

下面是 <span class="token class-name">Disruptor</span> 生产者入队操作的核心代码，看上去很复杂，其实逻辑很简单：如果没有足够的空余位置，就出让 <span class="token constant">CPU</span> 使用权，然后重新计算；反之则用 <span class="token constant">CAS</span> 设置入队索引。

\`\`\`java
<span class="token comment">//生产者获取 n 个写入位置</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token comment">//cursor 类似于入队索引，指的是上次生产到这里</span>
  current <span class="token operator">=</span> cursor<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//目标是在生产 n 个</span>
  next <span class="token operator">=</span> current <span class="token operator">+</span> n<span class="token punctuation">;</span>
  <span class="token comment">//减掉一个循环</span>
  <span class="token keyword">long</span> wrapPoint <span class="token operator">=</span> next <span class="token operator">-</span> bufferSize<span class="token punctuation">;</span>
  <span class="token comment">//获取上一次的最小消费位置</span>
  <span class="token keyword">long</span> cachedGatingSequence <span class="token operator">=</span> gatingSequenceCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//没有足够的空余位置</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>wrapPoint<span class="token operator">&gt;</span>cachedGatingSequence <span class="token operator">||</span> cachedGatingSequence<span class="token operator">&gt;</span>current<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//重新计算所有消费者里面的最小值位置</span>
    <span class="token keyword">long</span> gatingSequence <span class="token operator">=</span> <span class="token class-name">Util</span><span class="token punctuation">.</span><span class="token function">getMinimumSequence</span><span class="token punctuation">(</span>
        gatingSequences<span class="token punctuation">,</span> current<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//仍然没有足够的空余位置，出让 CPU 使用权，重新执行下一循环</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>wrapPoint <span class="token operator">&gt;</span> gatingSequence<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//从新设置上一次的最小消费位置</span>
    gatingSequenceCache<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>gatingSequence<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//获取写入位置成功，跳出循环</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
\`\`\`

## 案例分析（四）：高性能数据库连接池 <span class="token class-name">HiKariCP</span>

业界知名的数据库连接池有不少，例如 c3p0、<span class="token constant">DBCP</span>、<span class="token class-name">Tomcat</span> <span class="token constant">JDBC</span> <span class="token class-name">Connection</span> <span class="token class-name">Pool</span>、<span class="token class-name">Druid</span> 等，不过最近最火的是 <span class="token class-name">HiKariCP</span>。

<span class="token operator">*</span><span class="token operator">*</span><span class="token class-name">HiKariCP</span> 号称是业界跑得最快的数据库连接池<span class="token operator">*</span><span class="token operator">*</span>，这两年发展得顺风顺水，尤其是 <span class="token class-name">Springboot</span> <span class="token number">2.0</span> 将其作为<span class="token operator">*</span><span class="token operator">*</span>默认数据库连接池<span class="token operator">*</span><span class="token operator">*</span>。

### 什么是数据库连接池

数据库连接池和线程池一样，都属于池化资源，作用都是避免重量级资源的频繁创建和销毁，对于数据库连接池来说，也就是避免数据库连接频繁创建和销毁。如下图所示，服务端会在运行期持有一定数量的数据库连接，当需要执行 <span class="token constant">SQL</span> 时，并不是直接创建一个数据库连接，而是从连接池中获取一个；当 <span class="token constant">SQL</span> 执行完，也并不是将数据库连接真的关掉，而是将其归还到连接池中。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409020725868.</span>png<span class="token punctuation">)</span>

执行数据库操作基本上是一系列规范化的步骤：

<span class="token number">1.</span> 通过数据源获取一个数据库连接；
<span class="token number">2.</span> 创建 <span class="token class-name">Statement</span>；
<span class="token number">3.</span> 执行 <span class="token constant">SQL</span>；
<span class="token number">4.</span> 通过 <span class="token class-name">ResultSet</span> 获取 <span class="token constant">SQL</span> 执行结果；
<span class="token number">5.</span> 释放 <span class="token class-name">ResultSet</span>；
<span class="token number">6.</span> 释放 <span class="token class-name">Statement</span>；
<span class="token number">7.</span> 释放数据库连接。

下面的示例代码，通过 \`ds<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 获取一个数据库连接时，其实是向数据库连接池申请一个数据库连接，而不是创建一个新的数据库连接。同样，通过 \`conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 释放一个数据库连接时，也不是直接将连接关闭，而是将连接归还给数据库连接池。

\`\`\`java
<span class="token comment">//数据库连接池配置</span>
<span class="token class-name">HikariConfig</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HikariConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span><span class="token function">setMinimumIdle</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span><span class="token function">setMaximumPoolSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span><span class="token function">setConnectionTestQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span><span class="token function">setDataSourceClassName</span><span class="token punctuation">(</span><span class="token string">&quot;org.h2.jdbcx.JdbcDataSource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span><span class="token function">addDataSourceProperty</span><span class="token punctuation">(</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;jdbc:h2:mem:test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建数据源</span>
<span class="token class-name">DataSource</span> ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HikariDataSource</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">Statement</span> stmt <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token class-name">ResultSet</span> rs <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取数据库连接</span>
  conn <span class="token operator">=</span> ds<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建 Statement</span>
  stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 执行 SQL</span>
  rs <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token string">&quot;select * from abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取结果</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>rs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> id <span class="token operator">=</span> rs<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
  <span class="token comment">//关闭 ResultSet</span>
  <span class="token function">close</span><span class="token punctuation">(</span>rs<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//关闭 Statement</span>
  <span class="token function">close</span><span class="token punctuation">(</span>stmt<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//关闭 Connection</span>
  <span class="token function">close</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//关闭资源</span>
<span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token class-name">AutoCloseable</span> rs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>rs <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      rs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

<span class="token punctuation">[</span><span class="token class-name">HiKariCP</span> 官方网站<span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>brettwooldridge<span class="token operator">/</span><span class="token class-name">HikariCP</span><span class="token operator">/</span>wiki<span class="token operator">/</span><span class="token class-name">Down</span><span class="token operator">-</span>the<span class="token operator">-</span><span class="token class-name">Rabbit</span><span class="token operator">-</span><span class="token class-name">Hole</span><span class="token punctuation">)</span> 解释了其性能之所以如此之高的秘密。微观上 <span class="token class-name">HiKariCP</span> 程序编译出的字节码执行效率更高，站在字节码的角度去优化 <span class="token class-name">Java</span> 代码，<span class="token class-name">HiKariCP</span> 的作者对性能的执着可见一斑，不过遗憾的是他并没有详细解释都做了哪些优化。而宏观上主要是和两个数据结构有关，一个是 <span class="token class-name">FastList</span>，另一个是 <span class="token class-name">ConcurrentBag</span>。下面我们来看看它们是如何提升 <span class="token class-name">HiKariCP</span> 的性能的。

### <span class="token class-name">FastList</span> 解决了哪些性能问题

按照规范步骤，执行完数据库操作之后，需要依次关闭 <span class="token class-name">ResultSet</span>、<span class="token class-name">Statement</span>、<span class="token class-name">Connection</span>，但是总有粗心的同学只是关闭了 <span class="token class-name">Connection</span>，而忘了关闭 <span class="token class-name">ResultSet</span> 和 <span class="token class-name">Statement</span>。为了解决这种问题，最好的办法是当关闭 <span class="token class-name">Connection</span> 时，能够自动关闭 <span class="token class-name">Statement</span>。为了达到这个目标，<span class="token class-name">Connection</span> 就需要跟踪创建的 <span class="token class-name">Statement</span>，最简单的办法就是将创建的 <span class="token class-name">Statement</span> 保存在数组 <span class="token class-name">ArrayList</span> 里，这样当关闭 <span class="token class-name">Connection</span> 的时候，就可以依次将数组中的所有 <span class="token class-name">Statement</span> 关闭。

<span class="token class-name">HiKariCP</span> 觉得用 <span class="token class-name">ArrayList</span> 还是太慢，当通过 \`conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 创建一个 <span class="token class-name">Statement</span> 时，需要调用 <span class="token class-name">ArrayList</span> 的 <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法加入到 <span class="token class-name">ArrayList</span> 中，这个是没有问题的；但是当通过 \`stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\` 关闭 <span class="token class-name">Statement</span> 的时候，需要调用 <span class="token class-name">ArrayList</span> 的 <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法来将其从 <span class="token class-name">ArrayList</span> 中删除，这里是有优化余地的。

假设一个 <span class="token class-name">Connection</span> 依次创建 <span class="token number">6</span> 个 <span class="token class-name">Statement</span>，分别是 <span class="token constant">S1</span>、<span class="token constant">S2</span>、<span class="token constant">S3</span>、<span class="token constant">S4</span>、<span class="token constant">S5</span>、<span class="token constant">S6</span>，按照正常的编码习惯，关闭 <span class="token class-name">Statement</span> 的顺序一般是逆序的，关闭的顺序是：<span class="token constant">S6</span>、<span class="token constant">S5</span>、<span class="token constant">S4</span>、<span class="token constant">S3</span>、<span class="token constant">S2</span>、<span class="token constant">S1</span>，而 <span class="token class-name">ArrayList</span> 的 <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> 方法是顺序遍历查找，逆序删除而顺序查找，这样的查找效率就太慢了。如何优化呢？很简单，优化成逆序查找就可以了。

<span class="token operator">!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>dunwu<span class="token operator">/</span>images<span class="token operator">/</span>master<span class="token operator">/</span>snap<span class="token operator">/</span><span class="token number">202409020729492.</span>png<span class="token punctuation">)</span>

<span class="token class-name">HiKariCP</span> 中的 <span class="token class-name">FastList</span> 相对于 <span class="token class-name">ArrayList</span> 的一个优化点就是将 \`<span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> element<span class="token punctuation">)</span>\` 方法的<span class="token operator">*</span><span class="token operator">*</span>查找顺序变成了逆序查找<span class="token operator">*</span><span class="token operator">*</span>。除此之外，<span class="token class-name">FastList</span> 还有另一个优化点，是 \`<span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span>\` 方法没有对 index 参数进行越界检查，<span class="token class-name">HiKariCP</span> 能保证不会越界，所以不用每次都进行越界检查。

### <span class="token class-name">ConcurrentBag</span> 解决了哪些性能问题

如果让我们自己来实现一个数据库连接池，最简单的办法就是用两个阻塞队列来实现，一个用于保存空闲数据库连接的队列 idle，另一个用于保存忙碌数据库连接的队列 busy；获取连接时将空闲的数据库连接从 idle 队列移动到 busy 队列，而关闭连接时将数据库连接从 busy 移动到 idle。这种方案将并发问题委托给了阻塞队列，实现简单，但是性能并不是很理想。因为 <span class="token class-name">Java</span> <span class="token constant">SDK</span> 中的阻塞队列是用锁实现的，而高并发场景下锁的争用对性能影响很大。

\`\`\`java
<span class="token comment">//忙碌队列</span>
<span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Connection</span><span class="token punctuation">&gt;</span></span> busy<span class="token punctuation">;</span>
<span class="token comment">//空闲队列</span>
<span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Connection</span><span class="token punctuation">&gt;</span></span> idle<span class="token punctuation">;</span>
\`\`\`

<span class="token class-name">HiKariCP</span> 并没有使用 <span class="token class-name">Java</span> <span class="token constant">SDK</span> 中的阻塞队列，而是自己实现了一个叫做 <span class="token class-name">ConcurrentBag</span> 的并发容器。<span class="token class-name">ConcurrentBag</span> 的设计最初源自 <span class="token class-name">C</span>#，它的一个核心设计是使用 <span class="token class-name">ThreadLocal</span> 避免部分并发问题，不过 <span class="token class-name">HiKariCP</span> 中的 <span class="token class-name">ConcurrentBag</span> 并没有完全参考 <span class="token class-name">C</span>#的实现，下面我们来看看它是如何实现的。

<span class="token class-name">ConcurrentBag</span> 中最关键的属性有 <span class="token number">4</span> 个，分别是：用于存储所有的数据库连接的共享队列 sharedList、线程本地存储 threadList、等待数据库连接的线程数 waiters 以及分配数据库连接的工具 handoffQueue。其中，handoffQueue 用的是 <span class="token class-name">Java</span> <span class="token constant">SDK</span> 提供的 <span class="token class-name">SynchronousQueue</span>，<span class="token class-name">SynchronousQueue</span> 主要用于线程之间传递数据。

\`\`\`java
<span class="token comment">//用于存储所有的数据库连接</span>
<span class="token class-name">CopyOnWriteArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> sharedList<span class="token punctuation">;</span>
<span class="token comment">//线程本地存储中的数据库连接</span>
<span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> threadList<span class="token punctuation">;</span>
<span class="token comment">//等待数据库连接的线程数</span>
<span class="token class-name">AtomicInteger</span> waiters<span class="token punctuation">;</span>
<span class="token comment">//分配数据库连接的工具</span>
<span class="token class-name">SynchronousQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> handoffQueue<span class="token punctuation">;</span>
\`\`\`

当线程池创建了一个数据库连接时，通过调用 <span class="token class-name">ConcurrentBag</span> 的 <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法加入到 <span class="token class-name">ConcurrentBag</span> 中，下面是 <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法的具体实现，逻辑很简单，就是将这个连接加入到共享队列 sharedList 中，如果此时有线程在等待数据库连接，那么就通过 handoffQueue 将这个连接分配给等待的线程。

\`\`\`java
<span class="token comment">//将空闲连接添加到队列</span>
<span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">T</span> bagEntry<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//加入共享队列</span>
  sharedList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>bagEntry<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//如果有等待连接的线程，</span>
  <span class="token comment">//则通过 handoffQueue 直接分配给等待的线程</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>waiters<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token operator">&amp;&amp;</span> bagEntry<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">STATE_NOT_IN_USE</span>
    <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>handoffQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>bagEntry<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

通过 <span class="token class-name">ConcurrentBag</span> 提供的 <span class="token function">borrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法，可以获取一个空闲的数据库连接，<span class="token function">borrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 的主要逻辑是：

<span class="token number">1.</span> 首先查看线程本地存储是否有空闲连接，如果有，则返回一个空闲的连接；
<span class="token number">2.</span> 如果线程本地存储中无空闲连接，则从共享队列中获取。
<span class="token number">3.</span> 如果共享队列中也没有空闲的连接，则请求线程需要等待。

需要注意的是，线程本地存储中的连接是可以被其他线程窃取的，所以需要用 <span class="token constant">CAS</span> 方法防止重复分配。在共享队列中获取空闲连接，也采用了 <span class="token constant">CAS</span> 方法防止重复分配。

\`\`\`java
<span class="token class-name">T</span> <span class="token function">borrow</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">TimeUnit</span> timeUnit<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 先查看线程本地存储是否有空闲连接</span>
  <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> threadList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">Object</span> entry <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">T</span> bagEntry <span class="token operator">=</span> weakThreadLocals
      <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> entry<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span> entry<span class="token punctuation">;</span>
    <span class="token comment">//线程本地存储中的连接也可以被窃取，</span>
    <span class="token comment">//所以需要用 CAS 方法防止重复分配</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bagEntry <span class="token operator">!=</span> <span class="token keyword">null</span>
      <span class="token operator">&amp;&amp;</span> bagEntry<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token constant">STATE_NOT_IN_USE</span><span class="token punctuation">,</span> <span class="token constant">STATE_IN_USE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> bagEntry<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 线程本地存储中无空闲连接，则从共享队列中获取</span>
  <span class="token keyword">final</span> <span class="token keyword">int</span> waiting <span class="token operator">=</span> waiters<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">T</span> bagEntry <span class="token operator">:</span> sharedList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//如果共享队列中有空闲连接，则返回</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bagEntry<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token constant">STATE_NOT_IN_USE</span><span class="token punctuation">,</span> <span class="token constant">STATE_IN_USE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> bagEntry<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//共享队列中没有连接，则需要等待</span>
    timeout <span class="token operator">=</span> timeUnit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
      <span class="token keyword">final</span> <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token function">currentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">final</span> <span class="token class-name">T</span> bagEntry <span class="token operator">=</span> handoffQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> <span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bagEntry <span class="token operator">==</span> <span class="token keyword">null</span>
        <span class="token operator">||</span> bagEntry<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token constant">STATE_NOT_IN_USE</span><span class="token punctuation">,</span> <span class="token constant">STATE_IN_USE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> bagEntry<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">//重新计算等待时间</span>
      timeout <span class="token operator">-=</span> <span class="token function">elapsedNanos</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>timeout <span class="token operator">&gt;</span> <span class="token number">10_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//超时没有获取到连接，返回 null</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    waiters<span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

释放连接需要调用 <span class="token class-name">ConcurrentBag</span> 提供的 <span class="token function">requite</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法，该方法的逻辑很简单，首先将数据库连接状态更改为 <span class="token constant">STATE_NOT_IN_USE</span>，之后查看是否存在等待线程，如果有，则分配给等待线程；如果没有，则将该数据库连接保存到线程本地存储里。

\`\`\`java
<span class="token comment">//释放连接</span>
<span class="token keyword">void</span> <span class="token function">requite</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">T</span> bagEntry<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//更新连接状态</span>
  bagEntry<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token constant">STATE_NOT_IN_USE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//如果有等待的线程，则直接分配给线程，无需进入任何队列</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> waiters<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bagEntry<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token constant">STATE_NOT_IN_USE</span>
      <span class="token operator">||</span> handoffQueue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>bagEntry<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0xff</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token constant">MICROSECONDS</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//如果没有等待的线程，则进入线程本地存储</span>
  <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> threadLocalList <span class="token operator">=</span> threadList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>threadLocalList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    threadLocalList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>weakThreadLocals
      <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>bagEntry<span class="token punctuation">)</span>
      <span class="token operator">:</span> bagEntry<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`

## <span class="token class-name">Actor</span> 模型：面向对象原生的并发模型

## 软件事务内存：借鉴数据库的并发经验

## 协程：更轻量级的线程

## <span class="token constant">CSP</span> 模型：<span class="token class-name">Golang</span> 的主力队员

## 结束语 十年之后，初心依旧

## 参考资料

<span class="token operator">-</span> <span class="token punctuation">[</span>极客时间教程 <span class="token operator">-</span> <span class="token class-name">Java</span> 并发编程实战<span class="token punctuation">]</span><span class="token punctuation">(</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>time<span class="token punctuation">.</span>geekbang<span class="token punctuation">.</span>org<span class="token operator">/</span>column<span class="token operator">/</span>intro<span class="token operator">/</span><span class="token number">100023901</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,93),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","index.html.vue"]]);export{r as default};
