import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as l,a as n,d as s,b as e,e as t}from"./app-abdf62ea.js";const d={},u=t(`<h1 id="java-并发面试三" tabindex="-1"><a class="header-anchor" href="#java-并发面试三" aria-hidden="true">#</a> Java 并发面试三</h1><h2 id="threadlocal" tabindex="-1"><a class="header-anchor" href="#threadlocal" aria-hidden="true">#</a> ThreadLocal</h2><h3 id="threadlocal-有什么用" tabindex="-1"><a class="header-anchor" href="#threadlocal-有什么用" aria-hidden="true">#</a> ThreadLocal 有什么用？</h3><p>通常情况下，我们创建的变量是可以被任何一个线程访问并修改的。<strong>如果想实现每一个线程都有自己的专属本地变量该如何解决呢？</strong></p><p>JDK 中自带的<code>ThreadLocal</code>类正是为了解决这样的问题。 <strong><code>ThreadLocal</code>类主要解决的就是让每个线程绑定自己的值，可以将<code>ThreadLocal</code>类形象的比喻成存放数据的盒子，盒子中可以存储每个线程的私有数据。</strong></p><p>如果你创建了一个<code>ThreadLocal</code>变量，那么访问这个变量的每个线程都会有这个变量的本地副本，这也是<code>ThreadLocal</code>变量名的由来。他们可以使用 <code>get()</code> 和 <code>set()</code> 方法来获取默认值或将其值更改为当前线程所存的副本的值，从而避免了线程安全问题。</p><p>再举个简单的例子：两个人去宝屋收集宝物，这两个共用一个袋子的话肯定会产生争执，但是给他们两个人每个人分配一个袋子的话就不会出现这样的问题。如果把这两个人比作线程的话，那么 ThreadLocal 就是用来避免这两个线程竞争的。</p><h3 id="如何使用-threadlocal" tabindex="-1"><a class="header-anchor" href="#如何使用-threadlocal" aria-hidden="true">#</a> 如何使用 ThreadLocal？</h3><p>相信看了上面的解释，大家已经搞懂 <code>ThreadLocal</code> 类是个什么东西了。下面简单演示一下如何在项目中实际使用 <code>ThreadLocal</code> 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import java.text.SimpleDateFormat;
import java.util.Random;

public class ThreadLocalExample implements Runnable{

     // SimpleDateFormat 不是线程安全的，所以每个线程都要有自己独立的副本
    private static final ThreadLocal&lt;SimpleDateFormat&gt; formatter = ThreadLocal.withInitial(() -&gt; new SimpleDateFormat(&quot;yyyyMMdd HHmm&quot;));

    public static void main(String[] args) throws InterruptedException {
        ThreadLocalExample obj = new ThreadLocalExample();
        for(int i=0 ; i&lt;10; i++){
            Thread t = new Thread(obj, &quot;&quot;+i);
            Thread.sleep(new Random().nextInt(1000));
            t.start();
        }
    }

    @Override
    public void run() {
        System.out.println(&quot;Thread Name= &quot;+Thread.currentThread().getName()+&quot; default Formatter = &quot;+formatter.get().toPattern());
        try {
            Thread.sleep(new Random().nextInt(1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //formatter pattern is changed here by thread, but it won&#39;t reflect to other threads
        formatter.set(new SimpleDateFormat());

        System.out.println(&quot;Thread Name= &quot;+Thread.currentThread().getName()+&quot; formatter = &quot;+formatter.get().toPattern());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果 :</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Thread Name= 0 default Formatter = yyyyMMdd HHmm
Thread Name= 0 formatter = yy-M-d ah:mm
Thread Name= 1 default Formatter = yyyyMMdd HHmm
Thread Name= 2 default Formatter = yyyyMMdd HHmm
Thread Name= 1 formatter = yy-M-d ah:mm
Thread Name= 3 default Formatter = yyyyMMdd HHmm
Thread Name= 2 formatter = yy-M-d ah:mm
Thread Name= 4 default Formatter = yyyyMMdd HHmm
Thread Name= 3 formatter = yy-M-d ah:mm
Thread Name= 4 formatter = yy-M-d ah:mm
Thread Name= 5 default Formatter = yyyyMMdd HHmm
Thread Name= 5 formatter = yy-M-d ah:mm
Thread Name= 6 default Formatter = yyyyMMdd HHmm
Thread Name= 6 formatter = yy-M-d ah:mm
Thread Name= 7 default Formatter = yyyyMMdd HHmm
Thread Name= 7 formatter = yy-M-d ah:mm
Thread Name= 8 default Formatter = yyyyMMdd HHmm
Thread Name= 9 default Formatter = yyyyMMdd HHmm
Thread Name= 8 formatter = yy-M-d ah:mm
Thread Name= 9 formatter = yy-M-d ah:mm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中可以看出，虽然 <code>Thread-0</code> 已经改变了 <code>formatter</code> 的值，但 <code>Thread-1</code> 默认格式化值与初始化值相同，其他线程也一样。</p><p>上面有一段代码用到了创建 <code>ThreadLocal</code> 变量的那段代码用到了 Java8 的知识，它等于下面这段代码，如果你写了下面这段代码的话，IDEA 会提示你转换为 Java8 的格式 (IDEA 真的不错！)。因为 ThreadLocal 类在 Java 8 中扩展，使用一个新的方法<code>withInitial()</code>，将 Supplier 功能接口作为参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static final ThreadLocal&lt;SimpleDateFormat&gt; formatter = new ThreadLocal&lt;SimpleDateFormat&gt;(){
    @Override
    protected SimpleDateFormat initialValue(){
        return new SimpleDateFormat(&quot;yyyyMMdd HHmm&quot;);
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="threadlocal-原理了解吗" tabindex="-1"><a class="header-anchor" href="#threadlocal-原理了解吗" aria-hidden="true">#</a> ThreadLocal 原理了解吗？</h3><p>从 <code>Thread</code>类源代码入手。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Thread implements Runnable {
    //......
    //与此线程有关的 ThreadLocal 值。由 ThreadLocal 类维护
    ThreadLocal.ThreadLocalMap threadLocals = null;

    //与此线程有关的 InheritableThreadLocal 值。由 InheritableThreadLocal 类维护
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
    //......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面<code>Thread</code>类 源代码可以看出<code>Thread</code> 类中有一个 <code>threadLocals</code> 和 一个 <code>inheritableThreadLocals</code> 变量，它们都是 <code>ThreadLocalMap</code> 类型的变量，我们可以把 <code>ThreadLocalMap</code> 理解为<code>ThreadLocal</code> 类实现的定制化的 <code>HashMap</code>。默认情况下这两个变量都是 null，只有当前线程调用 <code>ThreadLocal</code> 类的 <code>set</code>或<code>get</code>方法时才创建它们，实际上调用这两个方法的时候，我们调用的是<code>ThreadLocalMap</code>类对应的 <code>get()</code>、<code>set()</code>方法。</p><p><code>ThreadLocal</code>类的<code>set()</code>方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void set(T value) {
    //获取当前请求的线程
    Thread t = Thread.currentThread();
    //取出 Thread 类内部的 threadLocals 变量（哈希表结构）
    ThreadLocalMap map = getMap(t);
    if (map != null)
        // 将需要存储的值放入到这个哈希表中
        map.set(this, value);
    else
        createMap(t, value);
}
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面这些内容，我们足以通过猜测得出结论：<strong>最终的变量是放在了当前线程的 <code>ThreadLocalMap</code> 中，并不是存在 <code>ThreadLocal</code> 上，<code>ThreadLocal</code> 可以理解为只是<code>ThreadLocalMap</code>的封装，传递了变量值。</strong> <code>ThrealLocal</code> 类中可以通过<code>Thread.currentThread()</code>获取到当前线程对象后，直接通过<code>getMap(Thread t)</code>可以访问到该线程的<code>ThreadLocalMap</code>对象。</p><p><strong>每个<code>Thread</code>中都具备一个<code>ThreadLocalMap</code>，而<code>ThreadLocalMap</code>可以存储以<code>ThreadLocal</code>为 key ，Object 对象为 value 的键值对。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ThreadLocalMap(ThreadLocal&lt;?&gt; firstKey, Object firstValue) {
    //......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如我们在同一个线程中声明了两个 <code>ThreadLocal</code> 对象的话， <code>Thread</code>内部都是使用仅有的那个<code>ThreadLocalMap</code> 存放数据的，<code>ThreadLocalMap</code>的 key 就是 <code>ThreadLocal</code>对象，value 就是 <code>ThreadLocal</code> 对象调用<code>set</code>方法设置的值。</p><p><code>ThreadLocal</code> 数据结构如下图所示：</p>`,26),p={href:"https://camo.githubusercontent.com/1819d183385b93268378cf890d4b70cbc31c12bbe8e153deb4f3f8337bc0ebd7/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561646c6f63616c2d646174612d7374727563747572652e706e67",target:"_blank",rel:"noopener noreferrer"},r=n("img",{src:"https://camo.githubusercontent.com/1819d183385b93268378cf890d4b70cbc31c12bbe8e153deb4f3f8337bc0ebd7/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561646c6f63616c2d646174612d7374727563747572652e706e67",alt:"ThreadLocal 数据结构",tabindex:"0",loading:"lazy"},null,-1),v=n("figcaption",null,"ThreadLocal 数据结构",-1),m=n("p",null,[n("code",null,"ThreadLocalMap"),e("是"),n("code",null,"ThreadLocal"),e("的静态内部类。")],-1),b={href:"https://camo.githubusercontent.com/c8e18827ce59c5dfed521f3c5a1d7fcacf559da6b472b4f782013b362c513795/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d6c6f63616c2d696e6e65722d636c6173732e706e67",target:"_blank",rel:"noopener noreferrer"},k=n("img",{src:"https://camo.githubusercontent.com/c8e18827ce59c5dfed521f3c5a1d7fcacf559da6b472b4f782013b362c513795/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d6c6f63616c2d696e6e65722d636c6173732e706e67",alt:"ThreadLocal 内部类",tabindex:"0",loading:"lazy"},null,-1),h=n("figcaption",null,"ThreadLocal 内部类",-1),f=t(`<h3 id="threadlocal-内存泄露问题是怎么导致的" tabindex="-1"><a class="header-anchor" href="#threadlocal-内存泄露问题是怎么导致的" aria-hidden="true">#</a> ThreadLocal 内存泄露问题是怎么导致的？</h3><p><code>ThreadLocalMap</code> 中使用的 key 为 <code>ThreadLocal</code> 的弱引用，而 value 是强引用。所以，如果 <code>ThreadLocal</code> 没有被外部强引用的情况下，在垃圾回收的时候，key 会被清理掉，而 value 不会被清理掉。</p><p>这样一来，<code>ThreadLocalMap</code> 中就会出现 key 为 null 的 Entry。假如我们不做任何措施的话，value 永远无法被 GC 回收，这个时候就可能会产生内存泄露。<code>ThreadLocalMap</code> 实现中已经考虑了这种情况，在调用 <code>set()</code>、<code>get()</code>、<code>remove()</code> 方法的时候，会清理掉 key 为 null 的记录。使用完 <code>ThreadLocal</code>方法后最好手动调用<code>remove()</code>方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static class Entry extends WeakReference&lt;ThreadLocal&lt;?&gt;&gt; {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal&lt;?&gt; k, Object v) {
        super(k);
        value = v;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>弱引用介绍：</strong></p><blockquote><p>如果一个对象只具有弱引用，那就类似于<strong>可有可无的生活用品</strong>。弱引用与软引用的区别在于：只具有弱引用的对象拥有更短暂的生命周期。在垃圾回收器线程扫描它 所管辖的内存区域的过程中，一旦发现了只具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。不过，由于垃圾回收器是一个优先级很低的线程， 因此不一定会很快发现那些只具有弱引用的对象。</p><p>弱引用可以和一个引用队列（ReferenceQueue）联合使用，如果弱引用所引用的对象被垃圾回收，Java 虚拟机就会把这个弱引用加入到与之关联的引用队列中。</p></blockquote><h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2><h3 id="什么是线程池" tabindex="-1"><a class="header-anchor" href="#什么是线程池" aria-hidden="true">#</a> 什么是线程池？</h3><p>顾名思义，线程池就是管理一系列线程的资源池。当有任务要处理时，直接从线程池中获取线程来处理，处理完之后线程并不会立即被销毁，而是等待下一个任务。</p><h3 id="为什么要用线程池" tabindex="-1"><a class="header-anchor" href="#为什么要用线程池" aria-hidden="true">#</a> 为什么要用线程池？</h3><p>池化技术想必大家已经屡见不鲜了，线程池、数据库连接池、HTTP 连接池等等都是对这个思想的应用。池化技术的思想主要是为了减少每次获取资源的消耗，提高对资源的利用率。</p><p><strong>线程池</strong>提供了一种限制和管理资源（包括执行一个任务）的方式。 每个<strong>线程池</strong>还维护一些基本统计信息，例如已完成任务的数量。</p><p>这里借用《Java 并发编程的艺术》提到的来说一下<strong>使用线程池的好处</strong>：</p><ul><li><strong>降低资源消耗</strong>。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。</li><li><strong>提高响应速度</strong>。当任务到达时，任务可以不需要等到线程创建就能立即执行。</li><li><strong>提高线程的可管理性</strong>。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。</li></ul><h3 id="如何创建线程池" tabindex="-1"><a class="header-anchor" href="#如何创建线程池" aria-hidden="true">#</a> 如何创建线程池？</h3><p><strong>方式一：通过<code>ThreadPoolExecutor</code>构造函数来创建（推荐）。</strong></p>`,16),g=n("img",{src:"https://github.com/Snailclimb/JavaGuide/raw/main/docs/java/concurrent/images/java-thread-pool-summary/threadpoolexecutor构造函数.png",alt:"通过构造方法实现",loading:"lazy"},null,-1),x={href:"https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/concurrent/images/java-thread-pool-summary/threadpoolexecutor",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,[n("strong",null,[e("方式二：通过 "),n("code",null,"Executor"),e(" 框架的工具类 "),n("code",null,"Executors"),e(" 来创建。")])],-1),w=n("p",null,[n("code",null,"Executors"),e("工具类提供的创建线程池的方法如下图所示：")],-1),T={href:"https://camo.githubusercontent.com/bdfb503aac4225d5cf902e997970b57cdacf3fbce9a2b0d3d111870046fff376/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6578656375746f72732d6e65772d7468726561642d706f6f6c2d6d6574686f64732e706e67",target:"_blank",rel:"noopener noreferrer"},_=n("img",{src:"https://camo.githubusercontent.com/bdfb503aac4225d5cf902e997970b57cdacf3fbce9a2b0d3d111870046fff376/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6578656375746f72732d6e65772d7468726561642d706f6f6c2d6d6574686f64732e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),S=n("figcaption",null,"img",-1),E=t(`<p>可以看出，通过<code>Executors</code>工具类可以创建多种类型的线程池，包括：</p><ul><li><code>FixedThreadPool</code>：固定线程数量的线程池。该线程池中的线程数量始终不变。当有一个新的任务提交时，线程池中若有空闲线程，则立即执行。若没有，则新的任务会被暂存在一个任务队列中，待有线程空闲时，便处理在任务队列中的任务。</li><li><code>SingleThreadExecutor</code>： 只有一个线程的线程池。若多余一个任务被提交到该线程池，任务会被保存在一个任务队列中，待线程空闲，按先入先出的顺序执行队列中的任务。</li><li><code>CachedThreadPool</code>： 可根据实际情况调整线程数量的线程池。线程池的线程数量不确定，但若有空闲线程可以复用，则会优先使用可复用的线程。若所有线程均在工作，又有新的任务提交，则会创建新的线程处理任务。所有线程在当前任务执行完毕后，将返回线程池进行复用。</li><li><code>ScheduledThreadPool</code>：给定的延迟后运行任务或者定期执行任务的线程池。</li></ul><h3 id="为什么不推荐使用内置线程池" tabindex="-1"><a class="header-anchor" href="#为什么不推荐使用内置线程池" aria-hidden="true">#</a> 为什么不推荐使用内置线程池？</h3><p>在《阿里巴巴 Java 开发手册》“并发处理”这一章节，明确指出线程资源必须通过线程池提供，不允许在应用中自行显式创建线程。</p><p><strong>为什么呢？</strong></p><blockquote><p>使用线程池的好处是减少在创建和销毁线程上所消耗的时间以及系统资源开销，解决资源不足的问题。如果不使用线程池，有可能会造成系统创建大量同类线程而导致消耗完内存或者“过度切换”的问题。</p></blockquote><p>另外，《阿里巴巴 Java 开发手册》中强制线程池不允许使用 <code>Executors</code> 去创建，而是通过 <code>ThreadPoolExecutor</code> 构造函数的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险</p><p><code>Executors</code> 返回线程池对象的弊端如下：</p><ul><li><code>FixedThreadPool</code> 和 <code>SingleThreadExecutor</code>: 使用的是有界阻塞队列是 <code>LinkedBlockingQueue</code> ，其任务队列的最大长度为 <code>Integer.MAX_VALUE</code> ，可能堆积大量的请求，从而导致 OOM。</li><li><code>CachedThreadPool</code>: 使用的是同步队列 <code>SynchronousQueue</code>, 允许创建的线程数量为 <code>Integer.MAX_VALUE</code> ，如果任务数量过多且执行速度较慢，可能会创建大量的线程，从而导致 OOM。</li><li><code>ScheduledThreadPool</code> 和 <code>SingleThreadScheduledExecutor</code> : 使用的无界的延迟阻塞队列 <code>DelayedWorkQueue</code> ，任务队列最大长度为 <code>Integer.MAX_VALUE</code> ，可能堆积大量的请求，从而导致 OOM。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 有界队列 LinkedBlockingQueue
public static ExecutorService newFixedThreadPool(int nThreads) {

    return new ThreadPoolExecutor(nThreads, nThreads,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue&lt;Runnable&gt;());

}

// 无界队列 LinkedBlockingQueue
public static ExecutorService newSingleThreadExecutor() {

    return new FinalizableDelegatedExecutorService (new ThreadPoolExecutor(1, 1,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue&lt;Runnable&gt;()));

}

// 同步队列 SynchronousQueue，没有容量，最大线程数是 Integer.MAX_VALUE\`
public static ExecutorService newCachedThreadPool() {

    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,60L, TimeUnit.SECONDS,new SynchronousQueue&lt;Runnable&gt;());

}

// DelayedWorkQueue（延迟阻塞队列）
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="线程池常见参数有哪些-如何解释" tabindex="-1"><a class="header-anchor" href="#线程池常见参数有哪些-如何解释" aria-hidden="true">#</a> 线程池常见参数有哪些？如何解释？</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    /**
     * 用给定的初始参数创建一个新的 ThreadPoolExecutor。
     */
    public ThreadPoolExecutor(int corePoolSize,//线程池的核心线程数量
                              int maximumPoolSize,//线程池的最大线程数
                              long keepAliveTime,//当线程数大于核心线程数时，多余的空闲线程存活的最长时间
                              TimeUnit unit,//时间单位
                              BlockingQueue&lt;Runnable&gt; workQueue,//任务队列，用来储存等待执行任务的队列
                              ThreadFactory threadFactory,//线程工厂，用来创建线程，一般默认即可
                              RejectedExecutionHandler handler//拒绝策略，当提交的任务过多而不能及时处理时，我们可以定制策略来处理任务
                               ) {
        if (corePoolSize &lt; 0 ||
            maximumPoolSize &lt;= 0 ||
            maximumPoolSize &lt; corePoolSize ||
            keepAliveTime &lt; 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ThreadPoolExecutor</code> 3 个最重要的参数：</p><ul><li><code>corePoolSize</code> : 任务队列未达到队列容量时，最大可以同时运行的线程数量。</li><li><code>maximumPoolSize</code> : 任务队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。</li><li><code>workQueue</code>: 新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</li></ul><p><code>ThreadPoolExecutor</code>其他常见参数 :</p><ul><li><code>keepAliveTime</code>: 线程池中的线程数量大于 <code>corePoolSize</code> 的时候，如果这时没有新的任务提交，核心线程外的线程不会立即销毁，而是会等待，直到等待的时间超过了 <code>keepAliveTime</code>才会被回收销毁。</li><li><code>unit</code> : <code>keepAliveTime</code> 参数的时间单位。</li><li><code>threadFactory</code> :executor 创建新线程的时候会用到。</li><li><code>handler</code> : 拒绝策略（后面会单独详细介绍一下）。</li></ul><p>下面这张图可以加深你对线程池中各个参数的相互关系的理解（图片来源：《Java 性能调优实战》）：</p>`,17),P={href:"https://camo.githubusercontent.com/5defc281ae4c3f7786c0dd58b398ddd7a1193f436ce3e3b6502a50f0b2df9b7b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f72656c6174696f6e736869702d6265747765656e2d7468726561642d706f6f6c2d706172616d65746572732e706e67",target:"_blank",rel:"noopener noreferrer"},L=n("img",{src:"https://camo.githubusercontent.com/5defc281ae4c3f7786c0dd58b398ddd7a1193f436ce3e3b6502a50f0b2df9b7b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f72656c6174696f6e736869702d6265747765656e2d7468726561642d706f6f6c2d706172616d65746572732e706e67",alt:"线程池各个参数的关系",tabindex:"0",loading:"lazy"},null,-1),C=n("figcaption",null,"线程池各个参数的关系",-1),q=t(`<h3 id="线程池的核心线程会被回收吗" tabindex="-1"><a class="header-anchor" href="#线程池的核心线程会被回收吗" aria-hidden="true">#</a> 线程池的核心线程会被回收吗？</h3><p><code>ThreadPoolExecutor</code> 默认不会回收核心线程，即使它们已经空闲了。这是为了减少创建线程的开销，因为核心线程通常是要长期保持活跃的。但是，如果线程池是被用于周期性使用的场景，且频率不高（周期之间有明显的空闲时间），可以考虑将 <code>allowCoreThreadTimeOut(boolean value)</code> 方法的参数设置为 <code>true</code>，这样就会回收空闲（时间间隔由 <code>keepAliveTime</code> 指定）的核心线程了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(4, 6, 6, TimeUnit.SECONDS, new SynchronousQueue&lt;&gt;());
        threadPoolExecutor.allowCoreThreadTimeOut(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="线程池的拒绝策略有哪些" tabindex="-1"><a class="header-anchor" href="#线程池的拒绝策略有哪些" aria-hidden="true">#</a> 线程池的拒绝策略有哪些？</h3><p>如果当前同时运行的线程数量达到最大线程数量并且队列也已经被放满了任务时，<code>ThreadPoolExecutor</code> 定义一些策略：</p><ul><li><code>ThreadPoolExecutor.AbortPolicy</code>：抛出 <code>RejectedExecutionException</code>来拒绝新任务的处理。</li><li><code>ThreadPoolExecutor.CallerRunsPolicy</code>：调用执行自己的线程运行任务，也就是直接在调用<code>execute</code>方法的线程中运行 (<code>run</code>) 被拒绝的任务，如果执行程序已关闭，则会丢弃该任务。因此这种策略会降低对于新任务提交速度，影响程序的整体性能。如果你的应用程序可以承受此延迟并且你要求任何一个任务请求都要被执行的话，你可以选择这个策略。</li><li><code>ThreadPoolExecutor.DiscardPolicy</code>：不处理新任务，直接丢弃掉。</li><li><code>ThreadPoolExecutor.DiscardOldestPolicy</code>：此策略将丢弃最早的未处理的任务请求。</li></ul><p>举个例子：Spring 通过 <code>ThreadPoolTaskExecutor</code> 或者我们直接通过 <code>ThreadPoolExecutor</code> 的构造函数创建线程池的时候，当我们不指定 <code>RejectedExecutionHandler</code> 拒绝策略来配置线程池的时候，默认使用的是 <code>AbortPolicy</code>。在这种拒绝策略下，如果队列满了，<code>ThreadPoolExecutor</code> 将抛出 <code>RejectedExecutionException</code> 异常来拒绝新来的任务 ，这代表你将丢失对这个任务的处理。如果不想丢弃任务的话，可以使用<code>CallerRunsPolicy</code>。<code>CallerRunsPolicy</code> 和其他的几个策略不同，它既不会抛弃任务，也不会抛出异常，而是将任务回退给调用者，使用调用者的线程来执行任务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static class CallerRunsPolicy implements RejectedExecutionHandler {

        public CallerRunsPolicy() { }

        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
            if (!e.isShutdown()) {
                // 直接主线程执行，而不是线程池中的线程执行
                r.run();
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果不允许丢弃任务任务-应该选择哪个拒绝策略" tabindex="-1"><a class="header-anchor" href="#如果不允许丢弃任务任务-应该选择哪个拒绝策略" aria-hidden="true">#</a> 如果不允许丢弃任务任务，应该选择哪个拒绝策略？</h3><p>根据上面对线程池拒绝策略的介绍，相信大家很容易能够得出答案是：<code>CallerRunsPolicy</code> 。</p><p>这里我们再来结合<code>CallerRunsPolicy</code> 的源码来看看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static class CallerRunsPolicy implements RejectedExecutionHandler {

        public CallerRunsPolicy() { }

        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
            //只要当前程序没有关闭，就用执行 execute 方法的线程执行该任务
            if (!e.isShutdown()) {

                r.run();
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从源码可以看出，只要当前程序不关闭就会使用执行<code>execute</code>方法的线程执行该任务。</p><h3 id="callerrunspolicy-拒绝策略有什么风险-如何解决" tabindex="-1"><a class="header-anchor" href="#callerrunspolicy-拒绝策略有什么风险-如何解决" aria-hidden="true">#</a> CallerRunsPolicy 拒绝策略有什么风险？如何解决？</h3><p>我们上面也提到了：如果想要保证任何一个任务请求都要被执行的话，那选择 <code>CallerRunsPolicy</code> 拒绝策略更合适一些。</p><p>不过，如果走到<code>CallerRunsPolicy</code>的任务是个非常耗时的任务，且处理提交任务的线程是主线程，可能会导致主线程阻塞，影响程序的正常运行。</p><p>这里简单举一个例子，该线程池限定了最大线程数为 2，阻塞队列大小为 1（这意味着第 4 个任务就会走到拒绝策略），<code>ThreadUtil</code>为 Hutool 提供的工具类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ThreadPoolTest {

    private static final Logger log = LoggerFactory.getLogger(ThreadPoolTest.class);

    public static void main(String[] args) {
        // 创建一个线程池，核心线程数为 1，最大线程数为 2
        // 当线程数大于核心线程数时，多余的空闲线程存活的最长时间为 60 秒，
        // 任务队列为容量为 1 的 ArrayBlockingQueue，饱和策略为 CallerRunsPolicy。
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1,
                2,
                60,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue&lt;&gt;(1),
                new ThreadPoolExecutor.CallerRunsPolicy());

        // 提交第一个任务，由核心线程执行
        threadPoolExecutor.execute(() -&gt; {
            log.info(&quot;核心线程执行第一个任务&quot;);
            ThreadUtil.sleep(1, TimeUnit.MINUTES);
        });

        // 提交第二个任务，由于核心线程被占用，任务将进入队列等待
        threadPoolExecutor.execute(() -&gt; {
            log.info(&quot;非核心线程处理入队的第二个任务&quot;);
            ThreadUtil.sleep(1, TimeUnit.MINUTES);
        });

        // 提交第三个任务，由于核心线程被占用且队列已满，创建非核心线程处理
        threadPoolExecutor.execute(() -&gt; {
            log.info(&quot;非核心线程处理第三个任务&quot;);
            ThreadUtil.sleep(1, TimeUnit.MINUTES);
        });

        // 提交第四个任务，由于核心线程和非核心线程都被占用，队列也满了，根据 CallerRunsPolicy 策略，任务将由提交任务的线程（即主线程）来执行
        threadPoolExecutor.execute(() -&gt; {
            log.info(&quot;主线程处理第四个任务&quot;);
            ThreadUtil.sleep(2, TimeUnit.MINUTES);
        });

        // 提交第五个任务，主线程被第四个任务卡住，该任务必须等到主线程执行完才能提交
        threadPoolExecutor.execute(() -&gt; {
            log.info(&quot;核心线程执行第五个任务&quot;);
        });

        // 关闭线程池
        threadPoolExecutor.shutdown();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>18:19:48.203 INFO  [pool-1-thread-1] c.j.concurrent.ThreadPoolTest - 核心线程执行第一个任务
18:19:48.203 INFO  [pool-1-thread-2] c.j.concurrent.ThreadPoolTest - 非核心线程处理第三个任务
18:19:48.203 INFO  [main] c.j.concurrent.ThreadPoolTest - 主线程处理第四个任务
18:20:48.212 INFO  [pool-1-thread-2] c.j.concurrent.ThreadPoolTest - 非核心线程处理入队的第二个任务
18:21:48.219 INFO  [pool-1-thread-2] c.j.concurrent.ThreadPoolTest - 核心线程执行第五个任务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出结果可以看出，因为<code>CallerRunsPolicy</code>这个拒绝策略，导致耗时的任务用了主线程执行，导致线程池阻塞，进而导致后续任务无法及时执行，严重的情况下很可能导致 OOM。</p><p>我们从问题的本质入手，调用者采用<code>CallerRunsPolicy</code>是希望所有的任务都能够被执行，暂时无法处理的任务又被保存在阻塞队列<code>BlockingQueue</code>中。这样的话，在内存允许的情况下，我们可以增加阻塞队列<code>BlockingQueue</code>的大小并调整堆内存以容纳更多的任务，确保任务能够被准确执行。</p><p>为了充分利用 CPU，我们还可以调整线程池的<code>maximumPoolSize</code> （最大线程数）参数，这样可以提高任务处理速度，避免累计在 <code>BlockingQueue</code>的任务过多导致内存用完。</p>`,23),F={href:"https://camo.githubusercontent.com/2b37716a74a10dfa6c633720c4d9238b3bace9563fbc6a7c9a7f8131e6b0c080/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30312e706e67",target:"_blank",rel:"noopener noreferrer"},A=n("img",{src:"https://camo.githubusercontent.com/2b37716a74a10dfa6c633720c4d9238b3bace9563fbc6a7c9a7f8131e6b0c080/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30312e706e67",alt:"调整阻塞队列大小和最大线程数",tabindex:"0",loading:"lazy"},null,-1),M=n("figcaption",null,"调整阻塞队列大小和最大线程数",-1),Q=t("<p>如果服务器资源以达到可利用的极限，这就意味我们要在设计策略上改变线程池的调度了，我们都知道，导致主线程卡死的本质就是因为我们不希望任何一个任务被丢弃。换个思路，有没有办法既能保证任务不被丢弃且在服务器有余力时及时处理呢？</p><p>这里提供的一种<strong>任务持久化</strong>的思路，这里所谓的任务持久化，包括但不限于：</p><ol><li>设计一张任务表将任务存储到 MySQL 数据库中。</li><li>Redis 缓存任务。</li><li>将任务提交到消息队列中。</li></ol><p>这里以方案一为例，简单介绍一下实现逻辑：</p><ol><li>实现<code>RejectedExecutionHandler</code>接口自定义拒绝策略，自定义拒绝策略负责将线程池暂时无法处理（此时阻塞队列已满）的任务入库（保存到 MySQL 中）。注意：线程池暂时无法处理的任务会先被放在阻塞队列中，阻塞队列满了才会触发拒绝策略。</li><li>继承<code>BlockingQueue</code>实现一个混合式阻塞队列，该队列包含 JDK 自带的<code>ArrayBlockingQueue</code>。另外，该混合式阻塞队列需要修改取任务处理的逻辑，也就是重写<code>take()</code>方法，取任务时优先从数据库中读取最早的任务，数据库中无任务时再从 <code>ArrayBlockingQueue</code>中去取任务。</li></ol>",5),N={href:"https://camo.githubusercontent.com/41dfd7d44a77e0bd8153fc4b1f4deedf77349625f6f58e401bbcaf1caf6d9f0a/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30322e706e67",target:"_blank",rel:"noopener noreferrer"},I=n("img",{src:"https://camo.githubusercontent.com/41dfd7d44a77e0bd8153fc4b1f4deedf77349625f6f58e401bbcaf1caf6d9f0a/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30322e706e67",alt:"将一部分任务保存到 MySQL 中",tabindex:"0",loading:"lazy"},null,-1),R=n("figcaption",null,"将一部分任务保存到 MySQL 中",-1),j=t(`<p>整个实现逻辑还是比较简单的，核心在于自定义拒绝策略和阻塞队列。如此一来，一旦我们的线程池中线程以达到满载时，我们就可以通过拒绝策略将最新任务持久化到 MySQL 数据库中，等到线程池有了有余力处理所有任务时，让其优先处理数据库中的任务以避免&quot;饥饿&quot;问题。</p><p>当然，对于这个问题，我们也可以参考其他主流框架的做法，以 Netty 为例，它的拒绝策略则是直接创建一个线程池以外的线程处理这些任务，为了保证任务的实时处理，这种做法可能需要良好的硬件设备且临时创建的线程无法做到准确的监控：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static final class NewThreadRunsPolicy implements RejectedExecutionHandler {
    NewThreadRunsPolicy() {
        super();
    }
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        try {
            //创建一个临时线程处理任务
            final Thread t = new Thread(r, &quot;Temporary task executor&quot;);
            t.start();
        } catch (Throwable e) {
            throw new RejectedExecutionException(
                    &quot;Failed to start a new thread&quot;, e);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ActiveMQ 则是尝试在指定的时效内尽可能的争取将任务入队，以保证最大交付：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new RejectedExecutionHandler() {
                @Override
                public void rejectedExecution(final Runnable r, final ThreadPoolExecutor executor) {
                    try {
                        //限时阻塞等待，实现尽可能交付
                        executor.getQueue().offer(r, 60, TimeUnit.SECONDS);
                    } catch (InterruptedException e) {
                        throw new RejectedExecutionException(&quot;Interrupted waiting for BrokerService.worker&quot;);
                    }
                    throw new RejectedExecutionException(&quot;Timed Out while attempting to enqueue Task.&quot;);
                }
            });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="线程池常用的阻塞队列有哪些" tabindex="-1"><a class="header-anchor" href="#线程池常用的阻塞队列有哪些" aria-hidden="true">#</a> 线程池常用的阻塞队列有哪些？</h3><p>新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</p><p>不同的线程池会选用不同的阻塞队列，我们可以结合内置线程池来分析。</p><ul><li>容量为 <code>Integer.MAX_VALUE</code> 的 <code>LinkedBlockingQueue</code>（有界阻塞队列）：<code>FixedThreadPool</code> 和 <code>SingleThreadExecutor</code> 。<code>FixedThreadPool</code>最多只能创建核心线程数的线程（核心线程数和最大线程数相等），<code>SingleThreadExecutor</code>只能创建一个线程（核心线程数和最大线程数都是 1），二者的任务队列永远不会被放满。</li><li><code>SynchronousQueue</code>（同步队列）：<code>CachedThreadPool</code> 。<code>SynchronousQueue</code> 没有容量，不存储元素，目的是保证对于提交的任务，如果有空闲线程，则使用空闲线程来处理；否则新建一个线程来处理任务。也就是说，<code>CachedThreadPool</code> 的最大线程数是 <code>Integer.MAX_VALUE</code> ，可以理解为线程数是可以无限扩展的，可能会创建大量线程，从而导致 OOM。</li><li><code>DelayedWorkQueue</code>（延迟队列）：<code>ScheduledThreadPool</code> 和 <code>SingleThreadScheduledExecutor</code> 。<code>DelayedWorkQueue</code> 的内部元素并不是按照放入的时间排序，而是会按照延迟的时间长短对任务进行排序，内部采用的是“堆”的数据结构，可以保证每次出队的任务都是当前队列中执行时间最靠前的。<code>DelayedWorkQueue</code> 添加元素满了之后会自动扩容，增加原来容量的 50%，即永远不会阻塞，最大扩容可达 <code>Integer.MAX_VALUE</code>，所以最多只能创建核心线程数的线程。</li><li><code>ArrayBlockingQueue</code>（有界阻塞队列）：底层由数组实现，容量一旦创建，就不能修改。</li></ul><h3 id="线程池处理任务的流程了解吗" tabindex="-1"><a class="header-anchor" href="#线程池处理任务的流程了解吗" aria-hidden="true">#</a> 线程池处理任务的流程了解吗？</h3>`,10),B={href:"https://camo.githubusercontent.com/4cac69de4a9742c9357feacd6ad9cbe10afebd668ff9f7d2e86e13de65cac1a9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d706f6f6c2d7072696e6369706c652e706e67",target:"_blank",rel:"noopener noreferrer"},O=n("img",{src:"https://camo.githubusercontent.com/4cac69de4a9742c9357feacd6ad9cbe10afebd668ff9f7d2e86e13de65cac1a9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d706f6f6c2d7072696e6369706c652e706e67",alt:"图解线程池实现原理",tabindex:"0",loading:"lazy"},null,-1),z=n("figcaption",null,"图解线程池实现原理",-1),D=t('<ol><li>如果当前运行的线程数小于核心线程数，那么就会新建一个线程来执行任务。</li><li>如果当前运行的线程数等于或大于核心线程数，但是小于最大线程数，那么就把该任务放入到任务队列里等待执行。</li><li>如果向任务队列投放任务失败（任务队列已经满了），但是当前运行的线程数是小于最大线程数的，就新建一个线程来执行任务。</li><li>如果当前运行的线程数已经等同于最大线程数了，新建线程将会使当前运行的线程超出最大线程数，那么当前任务会被拒绝，拒绝策略会调用<code>RejectedExecutionHandler.rejectedExecution()</code>方法。</li></ol><p>再提一个有意思的小问题：<strong>线程池在提交任务前，可以提前创建线程吗？</strong></p><p>答案是可以的！<code>ThreadPoolExecutor</code> 提供了两个方法帮助我们在提交任务之前，完成核心线程的创建，从而实现线程池预热的效果：</p><ul><li><code>prestartCoreThread()</code>: 启动一个线程，等待任务，如果已达到核心线程数，这个方法返回 false，否则返回 true；</li><li><code>prestartAllCoreThreads()</code>: 启动所有的核心线程，并返回启动成功的核心线程数。</li></ul><h3 id="线程池中线程异常后-销毁还是复用" tabindex="-1"><a class="header-anchor" href="#线程池中线程异常后-销毁还是复用" aria-hidden="true">#</a> 线程池中线程异常后，销毁还是复用？</h3><p>直接说结论，需要分两种情况：</p><ul><li><strong>使用<code>execute()</code>提交任务</strong>：当任务通过<code>execute()</code>提交到线程池并在执行过程中抛出异常时，如果这个异常没有在任务内被捕获，那么该异常会导致当前线程终止，并且异常会被打印到控制台或日志文件中。线程池会检测到这种线程终止，并创建一个新线程来替换它，从而保持配置的线程数不变。</li><li><strong>使用<code>submit()</code>提交任务</strong>：对于通过<code>submit()</code>提交的任务，如果在任务执行中发生异常，这个异常不会直接打印出来。相反，异常会被封装在由<code>submit()</code>返回的<code>Future</code>对象中。当调用<code>Future.get()</code>方法时，可以捕获到一个<code>ExecutionException</code>。在这种情况下，线程不会因为异常而终止，它会继续存在于线程池中，准备执行后续的任务。</li></ul><p>简单来说：使用<code>execute()</code>时，未捕获异常导致线程终止，线程池创建新线程替代；使用<code>submit()</code>时，异常被封装在<code>Future</code>中，线程继续复用。</p><p>这种设计允许<code>submit()</code>提供更灵活的错误处理机制，因为它允许调用者决定如何处理异常，而<code>execute()</code>则适用于那些不需要关注执行结果的场景。</p>',9),U={href:"https://mp.weixin.qq.com/s/9ODjdUU-EwQFF5PrnzOGfw",target:"_blank",rel:"noopener noreferrer"},H=t(`<h3 id="如何给线程池命名" tabindex="-1"><a class="header-anchor" href="#如何给线程池命名" aria-hidden="true">#</a> 如何给线程池命名？</h3><p>初始化线程池的时候需要显示命名（设置线程池名称前缀），有利于定位问题。</p><p>默认情况下创建的线程名字类似 <code>pool-1-thread-n</code> 这样的，没有业务含义，不利于我们定位问题。</p><p>给线程池里的线程命名通常有下面两种方式：</p><p><strong>1、利用 guava 的 <code>ThreadFactoryBuilder</code></strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ThreadFactory threadFactory = new ThreadFactoryBuilder()
                        .setNameFormat(threadNamePrefix + &quot;-%d&quot;)
                        .setDaemon(true).build();
ExecutorService threadPool = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, TimeUnit.MINUTES, workQueue, threadFactory);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、自己实现 <code>ThreadFactory</code>。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 线程工厂，它设置线程名称，有利于我们定位问题。
 */
public final class NamingThreadFactory implements ThreadFactory {

    private final AtomicInteger threadNum = new AtomicInteger();
    private final String name;

    /**
     * 创建一个带名字的线程池生产工厂
     */
    public NamingThreadFactory(String name) {
        this.name = name;
    }

    @Override
    public Thread newThread(Runnable r) {
        Thread t = new Thread(r);
        t.setName(name + &quot; [#&quot; + threadNum.incrementAndGet() + &quot;]&quot;);
        return t;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何设定线程池的大小" tabindex="-1"><a class="header-anchor" href="#如何设定线程池的大小" aria-hidden="true">#</a> 如何设定线程池的大小？</h3><p>很多人甚至可能都会觉得把线程池配置过大一点比较好！我觉得这明显是有问题的。就拿我们生活中非常常见的一例子来说：<strong>并不是人多就能把事情做好，增加了沟通交流成本。你本来一件事情只需要 3 个人做，你硬是拉来了 6 个人，会提升做事效率嘛？我想并不会。</strong> 线程数量过多的影响也是和我们分配多少人做事情一样，对于多线程这个场景来说主要是增加了<strong>上下文切换</strong>成本。不清楚什么是上下文切换的话，可以看我下面的介绍。</p><blockquote><p>上下文切换：</p><p>多线程编程中一般线程的个数都大于 CPU 核心的个数，而一个 CPU 核心在任意时刻只能被一个线程使用，为了让这些线程都能得到有效执行，CPU 采取的策略是为每个线程分配时间片并轮转的形式。当一个线程的时间片用完的时候就会重新处于就绪状态让给其他线程使用，这个过程就属于一次上下文切换。概括来说就是：当前任务在执行完 CPU 时间片切换到另一个任务之前会先保存自己的状态，以便下次再切换回这个任务时，可以再加载这个任务的状态。<strong>任务从保存到再加载的过程就是一次上下文切换</strong>。</p><p>上下文切换通常是计算密集型的。也就是说，它需要相当可观的处理器时间，在每秒几十上百次的切换中，每次切换都需要纳秒量级的时间。所以，上下文切换对系统来说意味着消耗大量的 CPU 时间，事实上，可能是操作系统中时间消耗最大的操作。</p><p>Linux 相比与其他操作系统（包括其他类 Unix 系统）有很多的优点，其中有一项就是，其上下文切换和模式切换的时间消耗非常少。</p></blockquote><p>类比于实现世界中的人类通过合作做某件事情，我们可以肯定的一点是线程池大小设置过大或者过小都会有问题，合适的才是最好。</p><ul><li>如果我们设置的线程池数量太小的话，如果同一时间有大量任务/请求需要处理，可能会导致大量的请求/任务在任务队列中排队等待执行，甚至会出现任务队列满了之后任务/请求无法处理的情况，或者大量任务堆积在任务队列导致 OOM。这样很明显是有问题的，CPU 根本没有得到充分利用。</li><li>如果我们设置线程数量太大，大量线程可能会同时在争取 CPU 资源，这样会导致大量的上下文切换，从而增加线程的执行时间，影响了整体执行效率。</li></ul><p>有一个简单并且适用面比较广的公式：</p><ul><li><strong>CPU 密集型任务 (N+1)：</strong> 这种任务消耗的主要是 CPU 资源，可以将线程数设置为 N（CPU 核心数）+1。比 CPU 核心数多出来的一个线程是为了防止线程偶发的缺页中断，或者其它原因导致的任务暂停而带来的影响。一旦任务暂停，CPU 就会处于空闲状态，而在这种情况下多出来的一个线程就可以充分利用 CPU 的空闲时间。</li><li><strong>I/O 密集型任务 (2N)：</strong> 这种任务应用起来，系统会用大部分的时间来处理 I/O 交互，而线程在处理 I/O 的时间段内不会占用 CPU 来处理，这时就可以将 CPU 交出给其它线程使用。因此在 I/O 密集型任务的应用中，我们可以多配置一些线程，具体的计算方法是 2N。</li></ul><p><strong>如何判断是 CPU 密集任务还是 IO 密集任务？</strong></p><p>CPU 密集型简单理解就是利用 CPU 计算能力的任务比如你在内存中对大量数据进行排序。但凡涉及到网络读取，文件读取这类都是 IO 密集型，这类任务的特点是 CPU 计算耗费时间相比于等待 IO 操作完成的时间来说很少，大部分时间都花在了等待 IO 操作完成上。</p>`,17),J={href:"https://github.com/Snailclimb/JavaGuide/issues/1737",target:"_blank",rel:"noopener noreferrer"},V=t("<p>线程数更严谨的计算的方法应该是：<code>最佳线程数 = N（CPU 核心数）∗（1+WT（线程等待时间）/ST（线程计算时间））</code>，其中 <code>WT（线程等待时间）=线程运行总时间 - ST（线程计算时间）</code>。</p><p>线程等待时间所占比例越高，需要越多线程。线程计算时间所占比例越高，需要越少线程。</p><p>我们可以通过 JDK 自带的工具 VisualVM 来查看 <code>WT/ST</code> 比例。</p><p>CPU 密集型任务的 <code>WT/ST</code> 接近或者等于 0，因此， 线程数可以设置为 N（CPU 核心数）∗（1+0）= N，和我们上面说的 N（CPU 核心数）+1 差不多。</p><p>IO 密集型任务下，几乎全是线程等待时间，从理论上来说，你就可以将线程数设置为 2N（按道理来说，WT/ST 的结果应该比较大，这里选择 2N 的原因应该是为了避免创建过多线程吧）。</p>",5),W=n("p",null,"公式也只是参考，具体还是要根据项目实际线上运行情况来动态调整。我在后面介绍的美团的线程池参数动态配置这种方案就非常不错，很实用！",-1),G=n("h3",{id:"如何动态修改线程池的参数",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#如何动态修改线程池的参数","aria-hidden":"true"},"#"),e(" 如何动态修改线程池的参数？")],-1),X={href:"https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html",target:"_blank",rel:"noopener noreferrer"},K=t("<p>美团技术团队的思路是主要对线程池的核心参数实现自定义可配置。这三个核心参数是：</p><ul><li><strong><code>corePoolSize</code> :</strong> 核心线程数线程数定义了最小可以同时运行的线程数量。</li><li><strong><code>maximumPoolSize</code> :</strong> 当队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。</li><li><strong><code>workQueue</code>:</strong> 当新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</li></ul><p><strong>为什么是这三个参数？</strong></p>",3),Z={href:"https://javaguide.cn/java/concurrent/java-thread-pool-summary.html",target:"_blank",rel:"noopener noreferrer"},Y=n("code",null,"ThreadPoolExecutor",-1),$=n("p",null,[n("strong",null,"如何支持参数动态配置？"),e(" 且看 "),n("code",null,"ThreadPoolExecutor"),e(" 提供的下面这些方法。")],-1),nn={href:"https://camo.githubusercontent.com/f80ed7e3dd54a0c6ffaaedeaa37d2232e08f978ead597081df116ed3d6fb7f88/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c6578656375746f722d6d6574686f64732e706e67",target:"_blank",rel:"noopener noreferrer"},en=n("img",{src:"https://camo.githubusercontent.com/f80ed7e3dd54a0c6ffaaedeaa37d2232e08f978ead597081df116ed3d6fb7f88/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c6578656375746f722d6d6574686f64732e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),an=n("figcaption",null,"img",-1),sn=t("<p>格外需要注意的是<code>corePoolSize</code>， 程序运行期间的时候，我们调用 <code>setCorePoolSize()</code>这个方法的话，线程池会首先判断当前工作线程数是否大于<code>corePoolSize</code>，如果大于的话就会回收工作线程。</p><p>另外，你也看到了上面并没有动态指定队列长度的方法，美团的方式是自定义了一个叫做 <code>ResizableCapacityLinkedBlockIngQueue</code> 的队列（主要就是把<code>LinkedBlockingQueue</code>的 capacity 字段的 final 关键字修饰给去掉了，让它变为可变的）。</p><p>最终实现的可动态修改线程池参数效果如下。👏👏👏</p>",3),tn={href:"https://camo.githubusercontent.com/11c8c4dbdde74f94079c90663efa9758932f9b12834b06ef1c7c6fb1dcf23c12/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6d65697475616e2d64796e616d6963616c6c792d636f6e6669677572696e672d7468726561642d706f6f6c2d706172616d65746572732e706e67",target:"_blank",rel:"noopener noreferrer"},cn=n("img",{src:"https://camo.githubusercontent.com/11c8c4dbdde74f94079c90663efa9758932f9b12834b06ef1c7c6fb1dcf23c12/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6d65697475616e2d64796e616d6963616c6c792d636f6e6669677572696e672d7468726561642d706f6f6c2d706172616d65746572732e706e67",alt:"动态配置线程池参数最终效果",tabindex:"0",loading:"lazy"},null,-1),on=n("figcaption",null,"动态配置线程池参数最终效果",-1),ln={href:"https://mp.weixin.qq.com/s/9HLuPcoWmTqAeFKa1kj-_A",target:"_blank",rel:"noopener noreferrer"},dn=n("p",null,"如果我们的项目也想要实现这种效果的话，可以借助现成的开源项目：",-1),un={href:"https://github.com/opengoofy/hippo4j",target:"_blank",rel:"noopener noreferrer"},pn={href:"https://github.com/dromara/dynamic-tp",target:"_blank",rel:"noopener noreferrer"},rn=t('<h3 id="如何设计一个能够根据任务的优先级来执行的线程池" tabindex="-1"><a class="header-anchor" href="#如何设计一个能够根据任务的优先级来执行的线程池" aria-hidden="true">#</a> 如何设计一个能够根据任务的优先级来执行的线程池？</h3><p>这是一个常见的面试问题，本质其实还是在考察求职者对于线程池以及阻塞队列的掌握。</p><p>我们上面也提到了，不同的线程池会选用不同的阻塞队列作为任务队列，比如<code>FixedThreadPool</code> 使用的是<code>LinkedBlockingQueue</code>（有界队列），默认构造器初始的队列长度为 <code>Integer.MAX_VALUE</code> ，由于队列永远不会被放满，因此<code>FixedThreadPool</code>最多只能创建核心线程数的线程。</p><p>假如我们需要实现一个优先级任务线程池的话，那可以考虑使用 <code>PriorityBlockingQueue</code> （优先级阻塞队列）作为任务队列（<code>ThreadPoolExecutor</code> 的构造函数有一个 <code>workQueue</code> 参数可以传入任务队列）。</p>',4),vn={href:"https://camo.githubusercontent.com/1ceea00af5184731f66b95e568be54e6b95d1759d43183ba68562b2dbd371ed1/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d6d6f6e2d706172616d65746572732d6f662d746872656164706f6f6c2d776f726b71756575652e6a7067",target:"_blank",rel:"noopener noreferrer"},mn=n("img",{src:"https://camo.githubusercontent.com/1ceea00af5184731f66b95e568be54e6b95d1759d43183ba68562b2dbd371ed1/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d6d6f6e2d706172616d65746572732d6f662d746872656164706f6f6c2d776f726b71756575652e6a7067",alt:"ThreadPoolExecutor 构造函数",tabindex:"0",loading:"lazy"},null,-1),bn=n("figcaption",null,"ThreadPoolExecutor 构造函数",-1),kn=t(`<p><code>PriorityBlockingQueue</code> 是一个支持优先级的无界阻塞队列，可以看作是线程安全的 <code>PriorityQueue</code>，两者底层都是使用小顶堆形式的二叉堆，即值最小的元素优先出队。不过，<code>PriorityQueue</code> 不支持阻塞操作。</p><p>要想让 <code>PriorityBlockingQueue</code> 实现对任务的排序，传入其中的任务必须是具备排序能力的，方式有两种：</p><ol><li>提交到线程池的任务实现 <code>Comparable</code> 接口，并重写 <code>compareTo</code> 方法来指定任务之间的优先级比较规则。</li><li>创建 <code>PriorityBlockingQueue</code> 时传入一个 <code>Comparator</code> 对象来指定任务之间的排序规则（推荐）。</li></ol><p>不过，这存在一些风险和问题，比如：</p><ul><li><code>PriorityBlockingQueue</code> 是无界的，可能堆积大量的请求，从而导致 OOM。</li><li>可能会导致饥饿问题，即低优先级的任务长时间得不到执行。</li><li>由于需要对队列中的元素进行排序操作以及保证线程安全（并发控制采用的是可重入锁 <code>ReentrantLock</code>），因此会降低性能。</li></ul><p>对于 OOM 这个问题的解决比较简单粗暴，就是继承<code>PriorityBlockingQueue</code> 并重写一下 <code>offer</code> 方法（入队）的逻辑，当插入的元素数量超过指定值就返回 false 。</p><p>饥饿问题这个可以通过优化设计来解决（比较麻烦），比如等待时间过长的任务会被移除并重新添加到队列中，但是优先级会被提升。</p><p>对于性能方面的影响，是没办法避免的，毕竟需要对任务进行排序操作。并且，对于大部分业务场景来说，这点性能影响是可以接受的。</p><h2 id="future" tabindex="-1"><a class="header-anchor" href="#future" aria-hidden="true">#</a> Future</h2><h3 id="future-类有什么用" tabindex="-1"><a class="header-anchor" href="#future-类有什么用" aria-hidden="true">#</a> Future 类有什么用？</h3><p><code>Future</code> 类是异步思想的典型运用，主要用在一些需要执行耗时任务的场景，避免程序一直原地等待耗时任务执行完成，执行效率太低。具体来说是这样的：当我们执行某一耗时的任务时，可以将这个耗时任务交给一个子线程去异步执行，同时我们可以干点其他事情，不用傻傻等待耗时任务执行完成。等我们的事情干完后，我们再通过 <code>Future</code> 类获取到耗时任务的执行结果。这样一来，程序的执行效率就明显提高了。</p><p>这其实就是多线程中经典的 <strong>Future 模式</strong>，你可以将其看作是一种设计模式，核心思想是异步调用，主要用在多线程领域，并非 Java 语言独有。</p><p>在 Java 中，<code>Future</code> 类只是一个泛型接口，位于 <code>java.util.concurrent</code> 包下，其中定义了 5 个方法，主要包括下面这 4 个功能：</p><ul><li>取消任务；</li><li>判断任务是否被取消；</li><li>判断任务是否已经执行完成；</li><li>获取任务执行结果。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// V 代表了 Future 执行的任务返回值的类型
public interface Future&lt;V&gt; {
    // 取消任务执行
    // 成功取消返回 true，否则返回 false
    boolean cancel(boolean mayInterruptIfRunning);
    // 判断任务是否被取消
    boolean isCancelled();
    // 判断任务是否已经执行完成
    boolean isDone();
    // 获取任务执行结果
    V get() throws InterruptedException, ExecutionException;
    // 指定时间内没有返回计算结果就抛出 TimeOutException 异常
    V get(long timeout, TimeUnit unit)

        throws InterruptedException, ExecutionException, TimeoutExceptio

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单理解就是：我有一个任务，提交给了 <code>Future</code> 来处理。任务执行期间我自己可以去做任何想做的事情。并且，在这期间我还可以取消任务以及获取任务的执行状态。一段时间之后，我就可以 <code>Future</code> 那里直接取出任务执行结果。</p><h3 id="callable-和-future-有什么关系" tabindex="-1"><a class="header-anchor" href="#callable-和-future-有什么关系" aria-hidden="true">#</a> Callable 和 Future 有什么关系？</h3><p>我们可以通过 <code>FutureTask</code> 来理解 <code>Callable</code> 和 <code>Future</code> 之间的关系。</p><p><code>FutureTask</code> 提供了 <code>Future</code> 接口的基本实现，常用来封装 <code>Callable</code> 和 <code>Runnable</code>，具有取消任务、查看任务是否执行完成以及获取任务执行结果的方法。<code>ExecutorService.submit()</code> 方法返回的其实就是 <code>Future</code> 的实现类 <code>FutureTask</code> 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;T&gt; Future&lt;T&gt; submit(Callable&lt;T&gt; task);
Future&lt;?&gt; submit(Runnable task);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FutureTask</code> 不光实现了 <code>Future</code>接口，还实现了<code>Runnable</code> 接口，因此可以作为任务直接被线程执行。</p>`,21),hn={href:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",target:"_blank",rel:"noopener noreferrer"},fn=n("img",{src:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",alt:"img",tabindex:"0",loading:"lazy"},null,-1),gn=n("figcaption",null,"img",-1),xn=t(`<p><code>FutureTask</code> 有两个构造函数，可传入 <code>Callable</code> 或者 <code>Runnable</code> 对象。实际上，传入 <code>Runnable</code> 对象也会在方法内部转换为<code>Callable</code> 对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public FutureTask(Callable&lt;V&gt; callable) {
    if (callable == null)
        throw new NullPointerException();
    this.callable = callable;
    this.state = NEW;
}
public FutureTask(Runnable runnable, V result) {
    // 通过适配器 RunnableAdapter 来将 Runnable 对象 runnable 转换成 Callable 对象
    this.callable = Executors.callable(runnable, result);
    this.state = NEW;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FutureTask</code>相当于对<code>Callable</code> 进行了封装，管理着任务执行的情况，存储了 <code>Callable</code> 的 <code>call</code> 方法的任务执行结果。</p><h3 id="completablefuture-类有什么用" tabindex="-1"><a class="header-anchor" href="#completablefuture-类有什么用" aria-hidden="true">#</a> CompletableFuture 类有什么用？</h3><p><code>Future</code> 在实际使用过程中存在一些局限性比如不支持异步任务的编排组合、获取计算结果的 <code>get()</code> 方法为阻塞调用。</p><p>Java 8 才被引入<code>CompletableFuture</code> 类可以解决<code>Future</code> 的这些缺陷。<code>CompletableFuture</code> 除了提供了更为好用和强大的 <code>Future</code> 特性之外，还提供了函数式编程、异步任务编排组合（可以将多个异步任务串联起来，组成一个完整的链式调用）等能力。</p><p>下面我们来简单看看 <code>CompletableFuture</code> 类的定义。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CompletableFuture&lt;T&gt; implements Future&lt;T&gt;, CompletionStage&lt;T&gt; {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code>CompletableFuture</code> 同时实现了 <code>Future</code> 和 <code>CompletionStage</code> 接口。</p>`,9),yn={href:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",target:"_blank",rel:"noopener noreferrer"},wn=n("img",{src:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",alt:"img",tabindex:"0",loading:"lazy"},null,-1),Tn=n("figcaption",null,"img",-1),_n=n("p",null,[n("code",null,"CompletionStage"),e(" 接口描述了一个异步计算的阶段。很多计算可以分成多个阶段或步骤，此时可以通过它将所有步骤组合起来，形成异步计算的流水线。")],-1),Sn=n("p",null,[n("code",null,"CompletionStage"),e(" 接口中的方法比较多，"),n("code",null,"CompletableFuture"),e(" 的函数式能力就是这个接口赋予的。从这个接口的方法参数你就可以发现其大量使用了 Java8 引入的函数式编程。")],-1),En={href:"https://camo.githubusercontent.com/bae81809cbfbee278ea8553cb9f67f0a656e8ca3c71b21050d5ac13b0d3a89c9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6a61766167756964652f696d6167652d32303231303930323039333032363035392e706e67",target:"_blank",rel:"noopener noreferrer"},Pn=n("img",{src:"https://camo.githubusercontent.com/bae81809cbfbee278ea8553cb9f67f0a656e8ca3c71b21050d5ac13b0d3a89c9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6a61766167756964652f696d6167652d32303231303930323039333032363035392e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),Ln=n("figcaption",null,"img",-1),Cn=n("h2",{id:"aqs",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#aqs","aria-hidden":"true"},"#"),e(" AQS")],-1),qn=n("h3",{id:"aqs-是什么",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#aqs-是什么","aria-hidden":"true"},"#"),e(" AQS 是什么？")],-1),Fn=n("p",null,[e("AQS 的全称为 "),n("code",null,"AbstractQueuedSynchronizer"),e(" ，翻译过来的意思就是抽象队列同步器。这个类在 "),n("code",null,"java.util.concurrent.locks"),e(" 包下面。")],-1),An={href:"https://camo.githubusercontent.com/f005531c065284d60ab560110b41e0d91de345807cfd658e7539602b2a8e916c/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f4151532e706e67",target:"_blank",rel:"noopener noreferrer"},Mn=n("img",{src:"https://camo.githubusercontent.com/f005531c065284d60ab560110b41e0d91de345807cfd658e7539602b2a8e916c/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f4151532e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),Qn=n("figcaption",null,"img",-1),Nn=t(`<p>AQS 就是一个抽象类，主要用来构建锁和同步器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class AbstractQueuedSynchronizer extends AbstractOwnableSynchronizer implements java.io.Serializable {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>AQS 为构建锁和同步器提供了一些通用功能的实现，因此，使用 AQS 能简单且高效地构造出应用广泛的大量的同步器，比如我们提到的 <code>ReentrantLock</code>，<code>Semaphore</code>，其他的诸如 <code>ReentrantReadWriteLock</code>，<code>SynchronousQueue</code>等等皆是基于 AQS 的。</p><h3 id="aqs-的原理是什么" tabindex="-1"><a class="header-anchor" href="#aqs-的原理是什么" aria-hidden="true">#</a> AQS 的原理是什么？</h3><p>AQS 核心思想是，如果被请求的共享资源空闲，则将当前请求资源的线程设置为有效的工作线程，并且将共享资源设置为锁定状态。如果被请求的共享资源被占用，那么就需要一套线程阻塞等待以及被唤醒时锁分配的机制，这个机制 AQS 是用 <strong>CLH 队列锁</strong> 实现的，即将暂时获取不到锁的线程加入到队列中。</p><p>CLH(Craig,Landin,and Hagersten) 队列是一个虚拟的双向队列（虚拟的双向队列即不存在队列实例，仅存在结点之间的关联关系）。AQS 是将每条请求共享资源的线程封装成一个 CLH 锁队列的一个结点（Node）来实现锁的分配。在 CLH 同步队列中，一个节点表示一个线程，它保存着线程的引用（thread）、 当前节点在队列中的状态（waitStatus）、前驱节点（prev）、后继节点（next）。</p><p>CLH 队列结构如下图所示：</p>`,7),In={href:"https://camo.githubusercontent.com/889c9071ff9311e4692e51259330c5aa977cbe8920e2b3f83b7fcb99e0c6c120/68747470733a2f2f6f73732e6a61766167756964652e636e2f70332d6a75656a696e2f34306362393332613634363934323632393933393037656264613661306266657e74706c762d6b3375316662706663702d7a6f6f6d2d312e706e67",target:"_blank",rel:"noopener noreferrer"},Rn=n("img",{src:"https://camo.githubusercontent.com/889c9071ff9311e4692e51259330c5aa977cbe8920e2b3f83b7fcb99e0c6c120/68747470733a2f2f6f73732e6a61766167756964652e636e2f70332d6a75656a696e2f34306362393332613634363934323632393933393037656264613661306266657e74706c762d6b3375316662706663702d7a6f6f6d2d312e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),jn=n("figcaption",null,"img",-1),Bn=n("code",null,"AbstractQueuedSynchronizer",-1),On={href:"https://www.cnblogs.com/waterystone/p/4920797.html",target:"_blank",rel:"noopener noreferrer"},zn={href:"https://camo.githubusercontent.com/fc9871754fb4d8fec38abcba2837d12765c800432241be11fc8892e5b9f2fe50/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f434c482e706e67",target:"_blank",rel:"noopener noreferrer"},Dn=n("img",{src:"https://camo.githubusercontent.com/fc9871754fb4d8fec38abcba2837d12765c800432241be11fc8892e5b9f2fe50/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f434c482e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),Un=n("figcaption",null,"img",-1),Hn=t(`<p>AQS 使用 <strong>int 成员变量 <code>state</code> 表示同步状态</strong>，通过内置的 <strong>线程等待队列</strong> 来完成获取资源线程的排队工作。</p><p><code>state</code> 变量由 <code>volatile</code> 修饰，用于展示当前临界资源的获锁情况。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 共享变量，使用 volatile 修饰保证线程可见性
private volatile int state;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，状态信息 <code>state</code> 可以通过 <code>protected</code> 类型的<code>getState()</code>、<code>setState()</code>和<code>compareAndSetState()</code> 进行操作。并且，这几个方法都是 <code>final</code> 修饰的，在子类中无法被重写。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//返回同步状态的当前值
protected final int getState() {
     return state;
}
 // 设置同步状态的值
protected final void setState(int newState) {
     state = newState;
}
//原子地（CAS 操作）将同步状态值设置为给定值 update 如果当前同步状态的值等于 expect（期望值）
protected final boolean compareAndSetState(int expect, int update) {
      return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以 <code>ReentrantLock</code> 为例，<code>state</code> 初始值为 0，表示未锁定状态。A 线程 <code>lock()</code> 时，会调用 <code>tryAcquire()</code> 独占该锁并将 <code>state+1</code> 。此后，其他线程再 <code>tryAcquire()</code> 时就会失败，直到 A 线程 <code>unlock()</code> 到 <code>state=</code>0（即释放锁）为止，其它线程才有机会获取该锁。当然，释放锁之前，A 线程自己是可以重复获取此锁的（<code>state</code> 会累加），这就是可重入的概念。但要注意，获取多少次就要释放多少次，这样才能保证 state 是能回到零态的。</p><p>再以 <code>CountDownLatch</code> 以例，任务分为 N 个子线程去执行，<code>state</code> 也初始化为 N（注意 N 要与线程个数一致）。这 N 个子线程是并行执行的，每个子线程执行完后<code>countDown()</code> 一次，state 会 CAS(Compare and Swap) 减 1。等到所有子线程都执行完后（即 <code>state=0</code> )，会 <code>unpark()</code> 主调用线程，然后主调用线程就会从 <code>await()</code> 函数返回，继续后余动作。</p><h3 id="semaphore-有什么用" tabindex="-1"><a class="header-anchor" href="#semaphore-有什么用" aria-hidden="true">#</a> Semaphore 有什么用？</h3><p><code>synchronized</code> 和 <code>ReentrantLock</code> 都是一次只允许一个线程访问某个资源，而<code>Semaphore</code>（信号量）可以用来控制同时访问特定资源的线程数量。</p><p>Semaphore 的使用简单，我们这里假设有 N(N&gt;5) 个线程来获取 <code>Semaphore</code> 中的共享资源，下面的代码表示同一时刻 N 个线程中只有 5 个线程能获取到共享资源，其他线程都会阻塞，只有获取到共享资源的线程才能执行。等到有线程释放了共享资源，其他阻塞的线程才能获取到。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 初始共享资源数量
final Semaphore semaphore = new Semaphore(5);
// 获取 1 个许可
semaphore.acquire();
// 释放 1 个许可
semaphore.release();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当初始的资源个数为 1 的时候，<code>Semaphore</code> 退化为排他锁。</p><p><code>Semaphore</code> 有两种模式：。</p><ul><li><strong>公平模式：</strong> 调用 <code>acquire()</code> 方法的顺序就是获取许可证的顺序，遵循 FIFO；</li><li><strong>非公平模式：</strong> 抢占式的。</li></ul><p><code>Semaphore</code> 对应的两个构造方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public Semaphore(int permits) {
    sync = new NonfairSync(permits);
}

public Semaphore(int permits, boolean fair) {
    sync = fair ? new FairSync(permits) : new NonfairSync(permits);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这两个构造方法，都必须提供许可的数量，第二个构造方法可以指定是公平模式还是非公平模式，默认非公平模式。</strong></p><p><code>Semaphore</code> 通常用于那些资源有明确访问数量限制的场景比如限流（仅限于单机模式，实际项目中推荐使用 Redis +Lua 来做限流）。</p><h3 id="semaphore-的原理是什么" tabindex="-1"><a class="header-anchor" href="#semaphore-的原理是什么" aria-hidden="true">#</a> Semaphore 的原理是什么？</h3><p><code>Semaphore</code> 是共享锁的一种实现，它默认构造 AQS 的 <code>state</code> 值为 <code>permits</code>，你可以将 <code>permits</code> 的值理解为许可证的数量，只有拿到许可证的线程才能执行。</p><p>调用<code>semaphore.acquire()</code> ，线程尝试获取许可证，如果 <code>state &gt;= 0</code> 的话，则表示可以获取成功。如果获取成功的话，使用 CAS 操作去修改 <code>state</code> 的值 <code>state=state-1</code>。如果 <code>state&lt;0</code> 的话，则表示许可证数量不足。此时会创建一个 Node 节点加入阻塞队列，挂起当前线程。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 *  获取 1 个许可证
 */
public void acquire() throws InterruptedException {
    sync.acquireSharedInterruptibly(1);
}
/**
 * 共享模式下获取许可证，获取成功则返回，失败则加入阻塞队列，挂起线程
 */
public final void acquireSharedInterruptibly(int arg)
    throws InterruptedException {
    if (Thread.interrupted())
      throw new InterruptedException();
        // 尝试获取许可证，arg 为获取许可证个数，当可用许可证数减当前获取的许可证数结果小于 0, 则创建一个节点加入阻塞队列，挂起当前线程。
    if (tryAcquireShared(arg) &lt; 0)
      doAcquireSharedInterruptibly(arg);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用<code>semaphore.release();</code> ，线程尝试释放许可证，并使用 CAS 操作去修改 <code>state</code> 的值 <code>state=state+1</code>。释放许可证成功之后，同时会唤醒同步队列中的一个线程。被唤醒的线程会重新尝试去修改 <code>state</code> 的值 <code>state=state-1</code> ，如果 <code>state&gt;=0</code> 则获取令牌成功，否则重新进入阻塞队列，挂起线程。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 释放一个许可证
public void release() {
    sync.releaseShared(1);
}

// 释放共享锁，同时会唤醒同步队列中的一个线程。
public final boolean releaseShared(int arg) {
    //释放共享锁
    if (tryReleaseShared(arg)) {
      //唤醒同步队列中的一个线程
      doReleaseShared();
      return true;
    }
    return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="countdownlatch-有什么用" tabindex="-1"><a class="header-anchor" href="#countdownlatch-有什么用" aria-hidden="true">#</a> CountDownLatch 有什么用？</h3><p><code>CountDownLatch</code> 允许 <code>count</code> 个线程阻塞在一个地方，直至所有线程的任务都执行完毕。</p><p><code>CountDownLatch</code> 是一次性的，计数器的值只能在构造方法中初始化一次，之后没有任何机制再次对其设置值，当 <code>CountDownLatch</code> 使用完毕后，它不能再次被使用。</p><h3 id="countdownlatch-的原理是什么" tabindex="-1"><a class="header-anchor" href="#countdownlatch-的原理是什么" aria-hidden="true">#</a> CountDownLatch 的原理是什么？</h3><p><code>CountDownLatch</code> 是共享锁的一种实现，它默认构造 AQS 的 <code>state</code> 值为 <code>count</code>。当线程使用 <code>countDown()</code> 方法时，其实使用了<code>tryReleaseShared</code>方法以 CAS 的操作来减少 <code>state</code>, 直至 <code>state</code> 为 0 。当调用 <code>await()</code> 方法的时候，如果 <code>state</code> 不为 0，那就证明任务还没有执行完毕，<code>await()</code> 方法就会一直阻塞，也就是说 <code>await()</code> 方法之后的语句不会被执行。直到<code>count</code> 个线程调用了<code>countDown()</code>使 state 值被减为 0，或者调用<code>await()</code>的线程被中断，该线程才会从阻塞中被唤醒，<code>await()</code> 方法之后的语句得到执行。</p><h3 id="用过-countdownlatch-么-什么场景下用的" tabindex="-1"><a class="header-anchor" href="#用过-countdownlatch-么-什么场景下用的" aria-hidden="true">#</a> 用过 CountDownLatch 么？什么场景下用的？</h3><p><code>CountDownLatch</code> 的作用就是 允许 count 个线程阻塞在一个地方，直至所有线程的任务都执行完毕。之前在项目中，有一个使用多线程读取多个文件处理的场景，我用到了 <code>CountDownLatch</code> 。具体场景是下面这样的：</p><p>我们要读取处理 6 个文件，这 6 个任务都是没有执行顺序依赖的任务，但是我们需要返回给用户的时候将这几个文件的处理的结果进行统计整理。</p><p>为此我们定义了一个线程池和 count 为 6 的<code>CountDownLatch</code>对象 。使用线程池处理读取任务，每一个线程处理完之后就将 count-1，调用<code>CountDownLatch</code>对象的 <code>await()</code>方法，直到所有文件读取完之后，才会接着执行后面的逻辑。</p><p>伪代码是下面这样的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CountDownLatchExample1 {
    // 处理文件的数量
    private static final int threadCount = 6;

    public static void main(String[] args) throws InterruptedException {
        // 创建一个具有固定线程数量的线程池对象（推荐使用构造方法创建）
        ExecutorService threadPool = Executors.newFixedThreadPool(10);
        final CountDownLatch countDownLatch = new CountDownLatch(threadCount);
        for (int i = 0; i &lt; threadCount; i++) {
            final int threadnum = i;
            threadPool.execute(() -&gt; {
                try {
                    //处理文件的业务操作
                    //......
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    //表示一个文件已经被完成
                    countDownLatch.countDown();
                }

            });
        }
        countDownLatch.await();
        threadPool.shutdown();
        System.out.println(&quot;finish&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有没有可以改进的地方呢？</strong></p><p>可以使用 <code>CompletableFuture</code> 类来改进！Java8 的 <code>CompletableFuture</code> 提供了很多对多线程友好的方法，使用它可以很方便地为我们编写多线程程序，什么异步、串行、并行或者等待所有线程执行完任务什么的都非常方便。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CompletableFuture&lt;Void&gt; task1 =
    CompletableFuture.supplyAsync(()-&gt;{
        //自定义业务操作
    });
......
CompletableFuture&lt;Void&gt; task6 =
    CompletableFuture.supplyAsync(()-&gt;{
    //自定义业务操作
    });
......
CompletableFuture&lt;Void&gt; headerFuture=CompletableFuture.allOf(task1,.....,task6);

try {
    headerFuture.join();
} catch (Exception ex) {
    //......
}
System.out.println(&quot;all done. &quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码还可以继续优化，当任务过多的时候，把每一个 task 都列出来不太现实，可以考虑通过循环来添加任务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//文件夹位置
List&lt;String&gt; filePaths = Arrays.asList(...)
// 异步处理所有文件
List&lt;CompletableFuture&lt;String&gt;&gt; fileFutures = filePaths.stream()
    .map(filePath -&gt; doSomeThing(filePath))
    .collect(Collectors.toList());
// 将他们合并起来
CompletableFuture&lt;Void&gt; allFutures = CompletableFuture.allOf(
    fileFutures.toArray(new CompletableFuture[fileFutures.size()])
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cyclicbarrier-有什么用" tabindex="-1"><a class="header-anchor" href="#cyclicbarrier-有什么用" aria-hidden="true">#</a> CyclicBarrier 有什么用？</h3><p><code>CyclicBarrier</code> 和 <code>CountDownLatch</code> 非常类似，它也可以实现线程间的技术等待，但是它的功能比 <code>CountDownLatch</code> 更加复杂和强大。主要应用场景和 <code>CountDownLatch</code> 类似。</p><blockquote><p><code>CountDownLatch</code> 的实现是基于 AQS 的，而 <code>CycliBarrier</code> 是基于 <code>ReentrantLock</code>(<code>ReentrantLock</code> 也属于 AQS 同步器）和 <code>Condition</code> 的。</p></blockquote><p><code>CyclicBarrier</code> 的字面意思是可循环使用（Cyclic）的屏障（Barrier）。它要做的事情是：让一组线程到达一个屏障（也可以叫同步点）时被阻塞，直到最后一个线程到达屏障时，屏障才会开门，所有被屏障拦截的线程才会继续干活。</p><h3 id="cyclicbarrier-的原理是什么" tabindex="-1"><a class="header-anchor" href="#cyclicbarrier-的原理是什么" aria-hidden="true">#</a> CyclicBarrier 的原理是什么？</h3><p><code>CyclicBarrier</code> 内部通过一个 <code>count</code> 变量作为计数器，<code>count</code> 的初始值为 <code>parties</code> 属性的初始化值，每当一个线程到了栅栏这里了，那么就将计数器减 1。如果 count 值为 0 了，表示这是这一代最后一个线程到达栅栏，就尝试执行我们构造方法中输入的任务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//每次拦截的线程数
private final int parties;
//计数器
private int count;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们结合源码来简单看看。</p><p>1、<code>CyclicBarrier</code> 默认的构造方法是 <code>CyclicBarrier(int parties)</code>，其参数表示屏障拦截的线程数量，每个线程调用 <code>await()</code> 方法告诉 <code>CyclicBarrier</code> 我已经到达了屏障，然后当前线程被阻塞。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public CyclicBarrier(int parties) {
    this(parties, null);
}

public CyclicBarrier(int parties, Runnable barrierAction) {
    if (parties &lt;= 0) throw new IllegalArgumentException();
    this.parties = parties;
    this.count = parties;
    this.barrierCommand = barrierAction;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code>parties</code> 就代表了有拦截的线程的数量，当拦截的线程数量达到这个值的时候就打开栅栏，让所有线程通过。</p><p>2、当调用 <code>CyclicBarrier</code> 对象调用 <code>await()</code> 方法时，实际上调用的是 <code>dowait(false, 0L)</code>方法。 <code>await()</code> 方法就像树立起一个栅栏的行为一样，将线程挡住了，当拦住的线程数量达到 <code>parties</code> 的值时，栅栏才会打开，线程才得以通过执行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int await() throws InterruptedException, BrokenBarrierException {
  try {
      return dowait(false, 0L);
  } catch (TimeoutException toe) {
      throw new Error(toe); // cannot happen
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dowait(false, 0L)</code>方法源码分析如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    // 当线程数量或者请求数量达到 count 时 await 之后的方法才会被执行。上面的示例中 count 的值就为 5。
    private int count;
    /**
     * Main barrier code, covering the various policies.
     */
    private int dowait(boolean timed, long nanos)
        throws InterruptedException, BrokenBarrierException,
               TimeoutException {
        final ReentrantLock lock = this.lock;
        // 锁住
        lock.lock();
        try {
            final Generation g = generation;

            if (g.broken)
                throw new BrokenBarrierException();

            // 如果线程中断了，抛出异常
            if (Thread.interrupted()) {
                breakBarrier();
                throw new InterruptedException();
            }
            // cout 减 1
            int index = --count;
            // 当 count 数量减为 0 之后说明最后一个线程已经到达栅栏了，也就是达到了可以执行 await 方法之后的条件
            if (index == 0) {  // tripped
                boolean ranAction = false;
                try {
                    final Runnable command = barrierCommand;
                    if (command != null)
                        command.run();
                    ranAction = true;
                    // 将 count 重置为 parties 属性的初始化值
                    // 唤醒之前等待的线程
                    // 下一波执行开始
                    nextGeneration();
                    return 0;
                } finally {
                    if (!ranAction)
                        breakBarrier();
                }
            }

            // loop until tripped, broken, interrupted, or timed out
            for (;;) {
                try {
                    if (!timed)
                        trip.await();
                    else if (nanos &gt; 0L)
                        nanos = trip.awaitNanos(nanos);
                } catch (InterruptedException ie) {
                    if (g == generation &amp;&amp; ! g.broken) {
                        breakBarrier();
                        throw ie;
                    } else {
                        // We&#39;re about to finish waiting even if we had not
                        // been interrupted, so this interrupt is deemed to
                        // &quot;belong&quot; to subsequent execution.
                        Thread.currentThread().interrupt();
                    }
                }

                if (g.broken)
                    throw new BrokenBarrierException();

                if (g != generation)
                    return index;

                if (timed &amp;&amp; nanos &lt;= 0L) {
                    breakBarrier();
                    throw new TimeoutException();
                }
            }
        } finally {
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="虚拟线程" tabindex="-1"><a class="header-anchor" href="#虚拟线程" aria-hidden="true">#</a> 虚拟线程</h2><p>虚拟线程在 Java 21 正式发布，这是一项重量级的更新。</p>`,57),Jn={href:"https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/concurrent/virtual-thread.md",target:"_blank",rel:"noopener noreferrer"},Vn=t(`<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2><h3 id="生产者消费者模式" tabindex="-1"><a class="header-anchor" href="#生产者消费者模式" aria-hidden="true">#</a> 生产者消费者模式</h3><p><strong>经典问题</strong></p><p>（1）什么是生产者消费者模式</p><p>（2）Java 中如何实现生产者消费者模式</p><p><strong>知识点</strong></p><p>（1）什么是生产者消费者模式</p><p>生产者消费者模式是一个经典的并发设计模式。在这个模型中，有一个共享缓冲区；有两个线程，一个负责向缓冲区推数据，另一个负责向缓冲区拉数据。要让两个线程更好的配合，就需要一个阻塞队列作为媒介来进行调度，由此便诞生了生产者消费者模式。</p><figure><img src="https://learn.lianglianglee.com/专栏/Java 并发编程 78 讲-完/assets/CgotOV3OJ3iAGcaiAAFrcv5xk9U160.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>（2）Java 中如何实现生产者消费者模式</p><p>在 Java 中，实现生产者消费者模式有 3 种具有代表性的方式：</p><ul><li>基于 BlockingQueue 实现</li><li>基于 Condition 实现</li><li>基于 wait/notify 实现</li></ul><p>【示例】基于 BlockingQueue 实现生产者消费者模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerConsumerDemo01</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> producer1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;producer1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> producer2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;producer2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> consumer1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;consumer1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> consumer2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;consumer2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        producer1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        producer2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        consumer1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        consumer2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span><span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> queue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count <span class="token operator">&lt;</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; 生产1条数据，已生产数据量：&quot;</span> <span class="token operator">+</span> <span class="token operator">++</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span><span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> queue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>count <span class="token operator">&lt;</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; 消费1条数据，已消费数据量：&quot;</span> <span class="token operator">+</span> <span class="token operator">++</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【示例】基于 Condition 实现生产者消费者模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerConsumerDemo02</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Runnable</span> producer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;生产1条数据，总数据量：&quot;</span> <span class="token operator">+</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>producer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>producer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Runnable</span> consumer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;消费1条数据，总数据量：&quot;</span> <span class="token operator">+</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>consumer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>consumer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> max<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notEmpty <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notFull <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">MyBlockingQueue</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">=</span> size<span class="token punctuation">;</span>
            queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">T</span> o<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    notFull<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
                notEmpty<span class="token punctuation">.</span><span class="token function">signalAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    notEmpty<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">T</span> o <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                notFull<span class="token punctuation">.</span><span class="token function">signalAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> o<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【示例】基于 wait/notify 实现生产者消费者模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerConsumerDemo03</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Runnable</span> producer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;生产1条数据，总数据量：&quot;</span> <span class="token operator">+</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>producer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>producer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Runnable</span> consumer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    queue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;消费1条数据，总数据量：&quot;</span> <span class="token operator">+</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>consumer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>consumer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> max<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> queue<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">MyBlockingQueue</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max <span class="token operator">=</span> size<span class="token punctuation">;</span>
            queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">T</span> o<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">notifyAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">T</span> <span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">T</span> o <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">notifyAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> o<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function Wn(Gn,Xn){const a=i("ExternalLinkIcon");return o(),l("div",null,[u,n("figure",null,[n("a",p,[r,s(a)]),v]),m,n("figure",null,[n("a",b,[k,s(a)]),h]),f,n("p",null,[e("["),g,e("]("),n("a",x,[e("https://github.com/Snailclimb/JavaGuide/blob/main/docs/java/concurrent/images/java-thread-pool-summary/threadpoolexecutor"),s(a)]),e(" 构造函数。png)")]),y,w,n("figure",null,[n("a",T,[_,s(a)]),S]),E,n("figure",null,[n("a",P,[L,s(a)]),C]),q,n("figure",null,[n("a",F,[A,s(a)]),M]),Q,n("figure",null,[n("a",N,[I,s(a)]),R]),j,n("figure",null,[n("a",B,[O,s(a)]),z]),D,n("p",null,[e("具体的源码分析可以参考这篇："),n("a",U,[e("线程池中线程异常后：销毁还是复用？ - 京东技术"),s(a)]),e("。")]),H,n("blockquote",null,[n("p",null,[e("🌈 拓展一下（参见："),n("a",J,[e("issue#1737"),s(a)]),e("）：")]),V]),W,G,n("p",null,[e("美团技术团队在 "),n("a",X,[e("《Java 线程池实现原理及其在美团业务中的实践》"),s(a)]),e(" 这篇文章中介绍到对线程池参数实现可自定义配置的思路和方法。")]),K,n("p",null,[e("我在 "),n("a",Z,[e("Java 线程池详解"),s(a)]),e(" 这篇文章中就说过这三个参数是 "),Y,e(" 最重要的参数，它们基本决定了线程池对于任务的处理策略。")]),$,n("figure",null,[n("a",nn,[en,s(a)]),an]),sn,n("figure",null,[n("a",tn,[cn,s(a)]),on]),n("p",null,[e("还没看够？推荐 why 神的 "),n("a",ln,[e("如何设置线程池参数？美团给出了一个让面试官虎躯一震的回答。"),s(a)]),e(" 这篇文章，深度剖析，很不错哦！")]),dn,n("ul",null,[n("li",null,[n("strong",null,[n("a",un,[e("Hippo4j"),s(a)])]),e("：异步线程池框架，支持线程池动态变更&监控&报警，无需修改代码轻松引入。支持多种使用模式，轻松引入，致力于提高系统运行保障能力。")]),n("li",null,[n("strong",null,[n("a",pn,[e("Dynamic TP"),s(a)])]),e("：轻量级动态线程池，内置监控告警功能，集成三方中间件线程池管理，基于主流配置中心（已支持 Nacos、Apollo，Zookeeper、Consul、Etcd，可通过 SPI 自定义实现）。")])]),rn,n("figure",null,[n("a",vn,[mn,s(a)]),bn]),kn,n("figure",null,[n("a",hn,[fn,s(a)]),gn]),xn,n("figure",null,[n("a",yn,[wn,s(a)]),Tn]),_n,Sn,n("figure",null,[n("a",En,[Pn,s(a)]),Ln]),Cn,qn,Fn,n("figure",null,[n("a",An,[Mn,s(a)]),Qn]),Nn,n("figure",null,[n("a",In,[Rn,s(a)]),jn]),n("p",null,[e("AQS("),Bn,e(") 的核心原理图（图源 "),n("a",On,[e("Java 并发之 AQS 详解"),s(a)]),e("）如下：")]),n("figure",null,[n("a",zn,[Dn,s(a)]),Un]),Hn,n("p",null,[e("虽然目前面试中问的不多，但还是建议大家去简单了解一下，具体可以阅读这篇文章："),n("a",Jn,[e("虚拟线程极简入门"),s(a)]),e(" 。重点搞清楚虚拟线程和平台线程的关系以及虚拟线程的优势即可。")]),Vn])}const Yn=c(d,[["render",Wn],["__file","index.html.vue"]]);export{Yn as default};
