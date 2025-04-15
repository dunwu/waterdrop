import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as l,a as n,d as e,b as s,e as t}from"./app-70dbecd6.js";const p={},u=t(`<h1 id="java-并发面试三" tabindex="-1"><a class="header-anchor" href="#java-并发面试三" aria-hidden="true">#</a> Java 并发面试三</h1><h2 id="java-线程池" tabindex="-1"><a class="header-anchor" href="#java-线程池" aria-hidden="true">#</a> Java 线程池</h2><p>【中等】你了解 Java 线程池的原理吗？<br> 【中等】如何合理地设置 Java 线程池的线程数？<br> 【中等】Java 线程池有哪些拒绝策略？<br> 【中等】Java 并发库中提供了哪些线程池实现？它们有什么区别？<br> 【困难】Java 线程池核心线程数在运行过程中能修改吗？如何修改？<br> 【中等】Java 线程池中 shutdown 与 shutdownNow 的区别是什么？<br> 【中等】Java 线程池内部任务出异常后，如何知道是哪个线程出了异常？<br> 【中等】Java 中的 DelayQueue 和 ScheduledThreadPool 有什么区别？<br> 【中等】Java 线程池内部任务出异常后，如何知道是哪个线程出了异常？<br> 【中等】Java 线程池中 shutdown 与 shutdownNow 的区别是什么？<br> 【困难】Java 线程池核心线程数在运行过程中能修改吗？如何修改？<br> 【简单】Java 创建线程池有哪些方式？</p><h3 id="什么是线程池" tabindex="-1"><a class="header-anchor" href="#什么是线程池" aria-hidden="true">#</a> 什么是线程池？</h3><p>顾名思义，线程池就是管理一系列线程的资源池。当有任务要处理时，直接从线程池中获取线程来处理，处理完之后线程并不会立即被销毁，而是等待下一个任务。</p><h3 id="为什么要用线程池" tabindex="-1"><a class="header-anchor" href="#为什么要用线程池" aria-hidden="true">#</a> 为什么要用线程池？</h3><p>池化技术想必大家已经屡见不鲜了，线程池、数据库连接池、HTTP 连接池等等都是对这个思想的应用。池化技术的思想主要是为了减少每次获取资源的消耗，提高对资源的利用率。</p><p><strong>线程池</strong>提供了一种限制和管理资源（包括执行一个任务）的方式。 每个<strong>线程池</strong>还维护一些基本统计信息，例如已完成任务的数量。</p><p>这里借用《Java 并发编程的艺术》提到的来说一下<strong>使用线程池的好处</strong>：</p><ul><li><strong>降低资源消耗</strong>。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。</li><li><strong>提高响应速度</strong>。当任务到达时，任务可以不需要等到线程创建就能立即执行。</li><li><strong>提高线程的可管理性</strong>。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。</li></ul><h3 id="【简单】java-创建线程池有哪些方式" tabindex="-1"><a class="header-anchor" href="#【简单】java-创建线程池有哪些方式" aria-hidden="true">#</a> 【简单】Java 创建线程池有哪些方式？</h3><h3 id="为什么不推荐使用内置线程池" tabindex="-1"><a class="header-anchor" href="#为什么不推荐使用内置线程池" aria-hidden="true">#</a> 为什么不推荐使用内置线程池？</h3><p>在《阿里巴巴 Java 开发手册》“并发处理”这一章节，明确指出线程资源必须通过线程池提供，不允许在应用中自行显式创建线程。</p><p><strong>为什么呢？</strong></p><blockquote><p>使用线程池的好处是减少在创建和销毁线程上所消耗的时间以及系统资源开销，解决资源不足的问题。如果不使用线程池，有可能会造成系统创建大量同类线程而导致消耗完内存或者“过度切换”的问题。</p></blockquote><p>另外，《阿里巴巴 Java 开发手册》中强制线程池不允许使用 <code>Executors</code> 去创建，而是通过 <code>ThreadPoolExecutor</code> 构造函数的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险</p><p><code>Executors</code> 返回线程池对象的弊端如下：</p><ul><li><code>FixedThreadPool</code> 和 <code>SingleThreadExecutor</code>: 使用的是有界阻塞队列是 <code>LinkedBlockingQueue</code> ，其任务队列的最大长度为 <code>Integer.MAX_VALUE</code> ，可能堆积大量的请求，从而导致 OOM。</li><li><code>CachedThreadPool</code>: 使用的是同步队列 <code>SynchronousQueue</code>, 允许创建的线程数量为 <code>Integer.MAX_VALUE</code> ，如果任务数量过多且执行速度较慢，可能会创建大量的线程，从而导致 OOM。</li><li><code>ScheduledThreadPool</code> 和 <code>SingleThreadScheduledExecutor</code> : 使用的无界的延迟阻塞队列 <code>DelayedWorkQueue</code> ，任务队列最大长度为 <code>Integer.MAX_VALUE</code> ，可能堆积大量的请求，从而导致 OOM。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 有界队列 LinkedBlockingQueue
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ThreadPoolExecutor</code> 3 个最重要的参数：</p><ul><li><code>corePoolSize</code> : 任务队列未达到队列容量时，最大可以同时运行的线程数量。</li><li><code>maximumPoolSize</code> : 任务队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。</li><li><code>workQueue</code>: 新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</li></ul><p><code>ThreadPoolExecutor</code>其他常见参数 :</p><ul><li><code>keepAliveTime</code>: 线程池中的线程数量大于 <code>corePoolSize</code> 的时候，如果这时没有新的任务提交，核心线程外的线程不会立即销毁，而是会等待，直到等待的时间超过了 <code>keepAliveTime</code>才会被回收销毁。</li><li><code>unit</code> : <code>keepAliveTime</code> 参数的时间单位。</li><li><code>threadFactory</code> :executor 创建新线程的时候会用到。</li><li><code>handler</code> : 拒绝策略（后面会单独详细介绍一下）。</li></ul><p>下面这张图可以加深你对线程池中各个参数的相互关系的理解（图片来源：《Java 性能调优实战》）：</p>`,26),d={href:"https://camo.githubusercontent.com/5defc281ae4c3f7786c0dd58b398ddd7a1193f436ce3e3b6502a50f0b2df9b7b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f72656c6174696f6e736869702d6265747765656e2d7468726561642d706f6f6c2d706172616d65746572732e706e67",target:"_blank",rel:"noopener noreferrer"},r=n("img",{src:"https://camo.githubusercontent.com/5defc281ae4c3f7786c0dd58b398ddd7a1193f436ce3e3b6502a50f0b2df9b7b/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f72656c6174696f6e736869702d6265747765656e2d7468726561642d706f6f6c2d706172616d65746572732e706e67",alt:"线程池各个参数的关系",tabindex:"0",loading:"lazy"},null,-1),v=n("figcaption",null,"线程池各个参数的关系",-1),k=t(`<h3 id="线程池的核心线程会被回收吗" tabindex="-1"><a class="header-anchor" href="#线程池的核心线程会被回收吗" aria-hidden="true">#</a> 线程池的核心线程会被回收吗？</h3><p><code>ThreadPoolExecutor</code> 默认不会回收核心线程，即使它们已经空闲了。这是为了减少创建线程的开销，因为核心线程通常是要长期保持活跃的。但是，如果线程池是被用于周期性使用的场景，且频率不高（周期之间有明显的空闲时间），可以考虑将 <code>allowCoreThreadTimeOut(boolean value)</code> 方法的参数设置为 <code>true</code>，这样就会回收空闲（时间间隔由 <code>keepAliveTime</code> 指定）的核心线程了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(4, 6, 6, TimeUnit.SECONDS, new SynchronousQueue&lt;&gt;());
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出结果可以看出，因为<code>CallerRunsPolicy</code>这个拒绝策略，导致耗时的任务用了主线程执行，导致线程池阻塞，进而导致后续任务无法及时执行，严重的情况下很可能导致 OOM。</p><p>我们从问题的本质入手，调用者采用<code>CallerRunsPolicy</code>是希望所有的任务都能够被执行，暂时无法处理的任务又被保存在阻塞队列<code>BlockingQueue</code>中。这样的话，在内存允许的情况下，我们可以增加阻塞队列<code>BlockingQueue</code>的大小并调整堆内存以容纳更多的任务，确保任务能够被准确执行。</p><p>为了充分利用 CPU，我们还可以调整线程池的<code>maximumPoolSize</code> （最大线程数）参数，这样可以提高任务处理速度，避免累计在 <code>BlockingQueue</code>的任务过多导致内存用完。</p>`,23),m={href:"https://camo.githubusercontent.com/2b37716a74a10dfa6c633720c4d9238b3bace9563fbc6a7c9a7f8131e6b0c080/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30312e706e67",target:"_blank",rel:"noopener noreferrer"},b=n("img",{src:"https://camo.githubusercontent.com/2b37716a74a10dfa6c633720c4d9238b3bace9563fbc6a7c9a7f8131e6b0c080/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30312e706e67",alt:"调整阻塞队列大小和最大线程数",tabindex:"0",loading:"lazy"},null,-1),h=n("figcaption",null,"调整阻塞队列大小和最大线程数",-1),f=t("<p>如果服务器资源以达到可利用的极限，这就意味我们要在设计策略上改变线程池的调度了，我们都知道，导致主线程卡死的本质就是因为我们不希望任何一个任务被丢弃。换个思路，有没有办法既能保证任务不被丢弃且在服务器有余力时及时处理呢？</p><p>这里提供的一种<strong>任务持久化</strong>的思路，这里所谓的任务持久化，包括但不限于：</p><ol><li>设计一张任务表将任务存储到 MySQL 数据库中。</li><li>Redis 缓存任务。</li><li>将任务提交到消息队列中。</li></ol><p>这里以方案一为例，简单介绍一下实现逻辑：</p><ol><li>实现<code>RejectedExecutionHandler</code>接口自定义拒绝策略，自定义拒绝策略负责将线程池暂时无法处理（此时阻塞队列已满）的任务入库（保存到 MySQL 中）。注意：线程池暂时无法处理的任务会先被放在阻塞队列中，阻塞队列满了才会触发拒绝策略。</li><li>继承<code>BlockingQueue</code>实现一个混合式阻塞队列，该队列包含 JDK 自带的<code>ArrayBlockingQueue</code>。另外，该混合式阻塞队列需要修改取任务处理的逻辑，也就是重写<code>take()</code>方法，取任务时优先从数据库中读取最早的任务，数据库中无任务时再从 <code>ArrayBlockingQueue</code>中去取任务。</li></ol>",5),g={href:"https://camo.githubusercontent.com/41dfd7d44a77e0bd8153fc4b1f4deedf77349625f6f58e401bbcaf1caf6d9f0a/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30322e706e67",target:"_blank",rel:"noopener noreferrer"},x=n("img",{src:"https://camo.githubusercontent.com/41dfd7d44a77e0bd8153fc4b1f4deedf77349625f6f58e401bbcaf1caf6d9f0a/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c2d72656a6563742d322d746872656164706f6f6c2d72656a6563742d30322e706e67",alt:"将一部分任务保存到 MySQL 中",tabindex:"0",loading:"lazy"},null,-1),w=n("figcaption",null,"将一部分任务保存到 MySQL 中",-1),y=t(`<p>整个实现逻辑还是比较简单的，核心在于自定义拒绝策略和阻塞队列。如此一来，一旦我们的线程池中线程以达到满载时，我们就可以通过拒绝策略将最新任务持久化到 MySQL 数据库中，等到线程池有了有余力处理所有任务时，让其优先处理数据库中的任务以避免&quot;饥饿&quot;问题。</p><p>当然，对于这个问题，我们也可以参考其他主流框架的做法，以 Netty 为例，它的拒绝策略则是直接创建一个线程池以外的线程处理这些任务，为了保证任务的实时处理，这种做法可能需要良好的硬件设备且临时创建的线程无法做到准确的监控：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static final class NewThreadRunsPolicy implements RejectedExecutionHandler {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="线程池常用的阻塞队列有哪些" tabindex="-1"><a class="header-anchor" href="#线程池常用的阻塞队列有哪些" aria-hidden="true">#</a> 线程池常用的阻塞队列有哪些？</h3><p>新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</p><p>不同的线程池会选用不同的阻塞队列，我们可以结合内置线程池来分析。</p><ul><li>容量为 <code>Integer.MAX_VALUE</code> 的 <code>LinkedBlockingQueue</code>（有界阻塞队列）：<code>FixedThreadPool</code> 和 <code>SingleThreadExecutor</code> 。<code>FixedThreadPool</code>最多只能创建核心线程数的线程（核心线程数和最大线程数相等），<code>SingleThreadExecutor</code>只能创建一个线程（核心线程数和最大线程数都是 1），二者的任务队列永远不会被放满。</li><li><code>SynchronousQueue</code>（同步队列）：<code>CachedThreadPool</code> 。<code>SynchronousQueue</code> 没有容量，不存储元素，目的是保证对于提交的任务，如果有空闲线程，则使用空闲线程来处理；否则新建一个线程来处理任务。也就是说，<code>CachedThreadPool</code> 的最大线程数是 <code>Integer.MAX_VALUE</code> ，可以理解为线程数是可以无限扩展的，可能会创建大量线程，从而导致 OOM。</li><li><code>DelayedWorkQueue</code>（延迟队列）：<code>ScheduledThreadPool</code> 和 <code>SingleThreadScheduledExecutor</code> 。<code>DelayedWorkQueue</code> 的内部元素并不是按照放入的时间排序，而是会按照延迟的时间长短对任务进行排序，内部采用的是“堆”的数据结构，可以保证每次出队的任务都是当前队列中执行时间最靠前的。<code>DelayedWorkQueue</code> 添加元素满了之后会自动扩容，增加原来容量的 50%，即永远不会阻塞，最大扩容可达 <code>Integer.MAX_VALUE</code>，所以最多只能创建核心线程数的线程。</li><li><code>ArrayBlockingQueue</code>（有界阻塞队列）：底层由数组实现，容量一旦创建，就不能修改。</li></ul><h3 id="线程池处理任务的流程了解吗" tabindex="-1"><a class="header-anchor" href="#线程池处理任务的流程了解吗" aria-hidden="true">#</a> 线程池处理任务的流程了解吗？</h3>`,10),T={href:"https://camo.githubusercontent.com/4cac69de4a9742c9357feacd6ad9cbe10afebd668ff9f7d2e86e13de65cac1a9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d706f6f6c2d7072696e6369706c652e706e67",target:"_blank",rel:"noopener noreferrer"},P=n("img",{src:"https://camo.githubusercontent.com/4cac69de4a9742c9357feacd6ad9cbe10afebd668ff9f7d2e86e13de65cac1a9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f7468726561642d706f6f6c2d7072696e6369706c652e706e67",alt:"图解线程池实现原理",tabindex:"0",loading:"lazy"},null,-1),E=n("figcaption",null,"图解线程池实现原理",-1),_=t('<ol><li>如果当前运行的线程数小于核心线程数，那么就会新建一个线程来执行任务。</li><li>如果当前运行的线程数等于或大于核心线程数，但是小于最大线程数，那么就把该任务放入到任务队列里等待执行。</li><li>如果向任务队列投放任务失败（任务队列已经满了），但是当前运行的线程数是小于最大线程数的，就新建一个线程来执行任务。</li><li>如果当前运行的线程数已经等同于最大线程数了，新建线程将会使当前运行的线程超出最大线程数，那么当前任务会被拒绝，拒绝策略会调用<code>RejectedExecutionHandler.rejectedExecution()</code>方法。</li></ol><p>再提一个有意思的小问题：<strong>线程池在提交任务前，可以提前创建线程吗？</strong></p><p>答案是可以的！<code>ThreadPoolExecutor</code> 提供了两个方法帮助我们在提交任务之前，完成核心线程的创建，从而实现线程池预热的效果：</p><ul><li><code>prestartCoreThread()</code>: 启动一个线程，等待任务，如果已达到核心线程数，这个方法返回 false，否则返回 true；</li><li><code>prestartAllCoreThreads()</code>: 启动所有的核心线程，并返回启动成功的核心线程数。</li></ul><h3 id="线程池中线程异常后-销毁还是复用" tabindex="-1"><a class="header-anchor" href="#线程池中线程异常后-销毁还是复用" aria-hidden="true">#</a> 线程池中线程异常后，销毁还是复用？</h3><p>直接说结论，需要分两种情况：</p><ul><li><strong>使用<code>execute()</code>提交任务</strong>：当任务通过<code>execute()</code>提交到线程池并在执行过程中抛出异常时，如果这个异常没有在任务内被捕获，那么该异常会导致当前线程终止，并且异常会被打印到控制台或日志文件中。线程池会检测到这种线程终止，并创建一个新线程来替换它，从而保持配置的线程数不变。</li><li><strong>使用<code>submit()</code>提交任务</strong>：对于通过<code>submit()</code>提交的任务，如果在任务执行中发生异常，这个异常不会直接打印出来。相反，异常会被封装在由<code>submit()</code>返回的<code>Future</code>对象中。当调用<code>Future.get()</code>方法时，可以捕获到一个<code>ExecutionException</code>。在这种情况下，线程不会因为异常而终止，它会继续存在于线程池中，准备执行后续的任务。</li></ul><p>简单来说：使用<code>execute()</code>时，未捕获异常导致线程终止，线程池创建新线程替代；使用<code>submit()</code>时，异常被封装在<code>Future</code>中，线程继续复用。</p><p>这种设计允许<code>submit()</code>提供更灵活的错误处理机制，因为它允许调用者决定如何处理异常，而<code>execute()</code>则适用于那些不需要关注执行结果的场景。</p>',9),S={href:"https://mp.weixin.qq.com/s/9ODjdUU-EwQFF5PrnzOGfw",target:"_blank",rel:"noopener noreferrer"},C=t(`<h3 id="如何给线程池命名" tabindex="-1"><a class="header-anchor" href="#如何给线程池命名" aria-hidden="true">#</a> 如何给线程池命名？</h3><p>初始化线程池的时候需要显示命名（设置线程池名称前缀），有利于定位问题。</p><p>默认情况下创建的线程名字类似 <code>pool-1-thread-n</code> 这样的，没有业务含义，不利于我们定位问题。</p><p>给线程池里的线程命名通常有下面两种方式：</p><p><strong>1、利用 guava 的 <code>ThreadFactoryBuilder</code></strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ThreadFactory threadFactory = new ThreadFactoryBuilder()
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何设定线程池的大小" tabindex="-1"><a class="header-anchor" href="#如何设定线程池的大小" aria-hidden="true">#</a> 如何设定线程池的大小？</h3><p>很多人甚至可能都会觉得把线程池配置过大一点比较好！我觉得这明显是有问题的。就拿我们生活中非常常见的一例子来说：<strong>并不是人多就能把事情做好，增加了沟通交流成本。你本来一件事情只需要 3 个人做，你硬是拉来了 6 个人，会提升做事效率嘛？我想并不会。</strong> 线程数量过多的影响也是和我们分配多少人做事情一样，对于多线程这个场景来说主要是增加了<strong>上下文切换</strong>成本。不清楚什么是上下文切换的话，可以看我下面的介绍。</p><blockquote><p>上下文切换：</p><p>多线程编程中一般线程的个数都大于 CPU 核心的个数，而一个 CPU 核心在任意时刻只能被一个线程使用，为了让这些线程都能得到有效执行，CPU 采取的策略是为每个线程分配时间片并轮转的形式。当一个线程的时间片用完的时候就会重新处于就绪状态让给其他线程使用，这个过程就属于一次上下文切换。概括来说就是：当前任务在执行完 CPU 时间片切换到另一个任务之前会先保存自己的状态，以便下次再切换回这个任务时，可以再加载这个任务的状态。<strong>任务从保存到再加载的过程就是一次上下文切换</strong>。</p><p>上下文切换通常是计算密集型的。也就是说，它需要相当可观的处理器时间，在每秒几十上百次的切换中，每次切换都需要纳秒量级的时间。所以，上下文切换对系统来说意味着消耗大量的 CPU 时间，事实上，可能是操作系统中时间消耗最大的操作。</p><p>Linux 相比与其他操作系统（包括其他类 Unix 系统）有很多的优点，其中有一项就是，其上下文切换和模式切换的时间消耗非常少。</p></blockquote><p>类比于实现世界中的人类通过合作做某件事情，我们可以肯定的一点是线程池大小设置过大或者过小都会有问题，合适的才是最好。</p><ul><li>如果我们设置的线程池数量太小的话，如果同一时间有大量任务/请求需要处理，可能会导致大量的请求/任务在任务队列中排队等待执行，甚至会出现任务队列满了之后任务/请求无法处理的情况，或者大量任务堆积在任务队列导致 OOM。这样很明显是有问题的，CPU 根本没有得到充分利用。</li><li>如果我们设置线程数量太大，大量线程可能会同时在争取 CPU 资源，这样会导致大量的上下文切换，从而增加线程的执行时间，影响了整体执行效率。</li></ul><p>有一个简单并且适用面比较广的公式：</p><ul><li><strong>CPU 密集型任务 (N+1)：</strong> 这种任务消耗的主要是 CPU 资源，可以将线程数设置为 N（CPU 核心数）+1。比 CPU 核心数多出来的一个线程是为了防止线程偶发的缺页中断，或者其它原因导致的任务暂停而带来的影响。一旦任务暂停，CPU 就会处于空闲状态，而在这种情况下多出来的一个线程就可以充分利用 CPU 的空闲时间。</li><li><strong>I/O 密集型任务 (2N)：</strong> 这种任务应用起来，系统会用大部分的时间来处理 I/O 交互，而线程在处理 I/O 的时间段内不会占用 CPU 来处理，这时就可以将 CPU 交出给其它线程使用。因此在 I/O 密集型任务的应用中，我们可以多配置一些线程，具体的计算方法是 2N。</li></ul><p><strong>如何判断是 CPU 密集任务还是 IO 密集任务？</strong></p><p>CPU 密集型简单理解就是利用 CPU 计算能力的任务比如你在内存中对大量数据进行排序。但凡涉及到网络读取，文件读取这类都是 IO 密集型，这类任务的特点是 CPU 计算耗费时间相比于等待 IO 操作完成的时间来说很少，大部分时间都花在了等待 IO 操作完成上。</p>`,17),q={href:"https://github.com/Snailclimb/JavaGuide/issues/1737",target:"_blank",rel:"noopener noreferrer"},F=t("<p>线程数更严谨的计算的方法应该是：<code>最佳线程数 = N（CPU 核心数）∗（1+WT（线程等待时间）/ST（线程计算时间））</code>，其中 <code>WT（线程等待时间）=线程运行总时间 - ST（线程计算时间）</code>。</p><p>线程等待时间所占比例越高，需要越多线程。线程计算时间所占比例越高，需要越少线程。</p><p>我们可以通过 JDK 自带的工具 VisualVM 来查看 <code>WT/ST</code> 比例。</p><p>CPU 密集型任务的 <code>WT/ST</code> 接近或者等于 0，因此， 线程数可以设置为 N（CPU 核心数）∗（1+0）= N，和我们上面说的 N（CPU 核心数）+1 差不多。</p><p>IO 密集型任务下，几乎全是线程等待时间，从理论上来说，你就可以将线程数设置为 2N（按道理来说，WT/ST 的结果应该比较大，这里选择 2N 的原因应该是为了避免创建过多线程吧）。</p>",5),L=n("p",null,"公式也只是参考，具体还是要根据项目实际线上运行情况来动态调整。我在后面介绍的美团的线程池参数动态配置这种方案就非常不错，很实用！",-1),Q=n("h3",{id:"如何动态修改线程池的参数",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#如何动态修改线程池的参数","aria-hidden":"true"},"#"),s(" 如何动态修改线程池的参数？")],-1),A={href:"https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html",target:"_blank",rel:"noopener noreferrer"},B=t("<p>美团技术团队的思路是主要对线程池的核心参数实现自定义可配置。这三个核心参数是：</p><ul><li><strong><code>corePoolSize</code> :</strong> 核心线程数线程数定义了最小可以同时运行的线程数量。</li><li><strong><code>maximumPoolSize</code> :</strong> 当队列中存放的任务达到队列容量的时候，当前可以同时运行的线程数量变为最大线程数。</li><li><strong><code>workQueue</code>:</strong> 当新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列中。</li></ul><p><strong>为什么是这三个参数？</strong></p>",3),I={href:"https://javaguide.cn/java/concurrent/java-thread-pool-summary.html",target:"_blank",rel:"noopener noreferrer"},R=n("code",null,"ThreadPoolExecutor",-1),O=n("p",null,[n("strong",null,"如何支持参数动态配置？"),s(" 且看 "),n("code",null,"ThreadPoolExecutor"),s(" 提供的下面这些方法。")],-1),j={href:"https://camo.githubusercontent.com/f80ed7e3dd54a0c6ffaaedeaa37d2232e08f978ead597081df116ed3d6fb7f88/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c6578656375746f722d6d6574686f64732e706e67",target:"_blank",rel:"noopener noreferrer"},U=n("img",{src:"https://camo.githubusercontent.com/f80ed7e3dd54a0c6ffaaedeaa37d2232e08f978ead597081df116ed3d6fb7f88/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f746872656164706f6f6c6578656375746f722d6d6574686f64732e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),N=n("figcaption",null,"img",-1),z=t("<p>格外需要注意的是<code>corePoolSize</code>， 程序运行期间的时候，我们调用 <code>setCorePoolSize()</code>这个方法的话，线程池会首先判断当前工作线程数是否大于<code>corePoolSize</code>，如果大于的话就会回收工作线程。</p><p>另外，你也看到了上面并没有动态指定队列长度的方法，美团的方式是自定义了一个叫做 <code>ResizableCapacityLinkedBlockIngQueue</code> 的队列（主要就是把<code>LinkedBlockingQueue</code>的 capacity 字段的 final 关键字修饰给去掉了，让它变为可变的）。</p><p>最终实现的可动态修改线程池参数效果如下。👏👏👏</p>",3),D={href:"https://camo.githubusercontent.com/11c8c4dbdde74f94079c90663efa9758932f9b12834b06ef1c7c6fb1dcf23c12/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6d65697475616e2d64796e616d6963616c6c792d636f6e6669677572696e672d7468726561642d706f6f6c2d706172616d65746572732e706e67",target:"_blank",rel:"noopener noreferrer"},M=n("img",{src:"https://camo.githubusercontent.com/11c8c4dbdde74f94079c90663efa9758932f9b12834b06ef1c7c6fb1dcf23c12/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f6d65697475616e2d64796e616d6963616c6c792d636f6e6669677572696e672d7468726561642d706f6f6c2d706172616d65746572732e706e67",alt:"动态配置线程池参数最终效果",tabindex:"0",loading:"lazy"},null,-1),J=n("figcaption",null,"动态配置线程池参数最终效果",-1),V={href:"https://mp.weixin.qq.com/s/9HLuPcoWmTqAeFKa1kj-_A",target:"_blank",rel:"noopener noreferrer"},W=n("p",null,"如果我们的项目也想要实现这种效果的话，可以借助现成的开源项目：",-1),H={href:"https://github.com/opengoofy/hippo4j",target:"_blank",rel:"noopener noreferrer"},X={href:"https://github.com/dromara/dynamic-tp",target:"_blank",rel:"noopener noreferrer"},G=t('<h3 id="如何设计一个能够根据任务的优先级来执行的线程池" tabindex="-1"><a class="header-anchor" href="#如何设计一个能够根据任务的优先级来执行的线程池" aria-hidden="true">#</a> 如何设计一个能够根据任务的优先级来执行的线程池？</h3><p>这是一个常见的面试问题，本质其实还是在考察求职者对于线程池以及阻塞队列的掌握。</p><p>我们上面也提到了，不同的线程池会选用不同的阻塞队列作为任务队列，比如<code>FixedThreadPool</code> 使用的是<code>LinkedBlockingQueue</code>（有界队列），默认构造器初始的队列长度为 <code>Integer.MAX_VALUE</code> ，由于队列永远不会被放满，因此<code>FixedThreadPool</code>最多只能创建核心线程数的线程。</p><p>假如我们需要实现一个优先级任务线程池的话，那可以考虑使用 <code>PriorityBlockingQueue</code> （优先级阻塞队列）作为任务队列（<code>ThreadPoolExecutor</code> 的构造函数有一个 <code>workQueue</code> 参数可以传入任务队列）。</p>',4),K={href:"https://camo.githubusercontent.com/1ceea00af5184731f66b95e568be54e6b95d1759d43183ba68562b2dbd371ed1/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d6d6f6e2d706172616d65746572732d6f662d746872656164706f6f6c2d776f726b71756575652e6a7067",target:"_blank",rel:"noopener noreferrer"},Z=n("img",{src:"https://camo.githubusercontent.com/1ceea00af5184731f66b95e568be54e6b95d1759d43183ba68562b2dbd371ed1/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d6d6f6e2d706172616d65746572732d6f662d746872656164706f6f6c2d776f726b71756575652e6a7067",alt:"ThreadPoolExecutor 构造函数",tabindex:"0",loading:"lazy"},null,-1),Y=n("figcaption",null,"ThreadPoolExecutor 构造函数",-1),$=t(`<p><code>PriorityBlockingQueue</code> 是一个支持优先级的无界阻塞队列，可以看作是线程安全的 <code>PriorityQueue</code>，两者底层都是使用小顶堆形式的二叉堆，即值最小的元素优先出队。不过，<code>PriorityQueue</code> 不支持阻塞操作。</p><p>要想让 <code>PriorityBlockingQueue</code> 实现对任务的排序，传入其中的任务必须是具备排序能力的，方式有两种：</p><ol><li>提交到线程池的任务实现 <code>Comparable</code> 接口，并重写 <code>compareTo</code> 方法来指定任务之间的优先级比较规则。</li><li>创建 <code>PriorityBlockingQueue</code> 时传入一个 <code>Comparator</code> 对象来指定任务之间的排序规则（推荐）。</li></ol><p>不过，这存在一些风险和问题，比如：</p><ul><li><code>PriorityBlockingQueue</code> 是无界的，可能堆积大量的请求，从而导致 OOM。</li><li>可能会导致饥饿问题，即低优先级的任务长时间得不到执行。</li><li>由于需要对队列中的元素进行排序操作以及保证线程安全（并发控制采用的是可重入锁 <code>ReentrantLock</code>），因此会降低性能。</li></ul><p>对于 OOM 这个问题的解决比较简单粗暴，就是继承<code>PriorityBlockingQueue</code> 并重写一下 <code>offer</code> 方法（入队）的逻辑，当插入的元素数量超过指定值就返回 false 。</p><p>饥饿问题这个可以通过优化设计来解决（比较麻烦），比如等待时间过长的任务会被移除并重新添加到队列中，但是优先级会被提升。</p><p>对于性能方面的影响，是没办法避免的，毕竟需要对任务进行排序操作。并且，对于大部分业务场景来说，这点性能影响是可以接受的。</p><h2 id="future" tabindex="-1"><a class="header-anchor" href="#future" aria-hidden="true">#</a> Future</h2><h3 id="future-类有什么用" tabindex="-1"><a class="header-anchor" href="#future-类有什么用" aria-hidden="true">#</a> Future 类有什么用？</h3><p><code>Future</code> 类是异步思想的典型运用，主要用在一些需要执行耗时任务的场景，避免程序一直原地等待耗时任务执行完成，执行效率太低。具体来说是这样的：当我们执行某一耗时的任务时，可以将这个耗时任务交给一个子线程去异步执行，同时我们可以干点其他事情，不用傻傻等待耗时任务执行完成。等我们的事情干完后，我们再通过 <code>Future</code> 类获取到耗时任务的执行结果。这样一来，程序的执行效率就明显提高了。</p><p>这其实就是多线程中经典的 <strong>Future 模式</strong>，你可以将其看作是一种设计模式，核心思想是异步调用，主要用在多线程领域，并非 Java 语言独有。</p><p>在 Java 中，<code>Future</code> 类只是一个泛型接口，位于 <code>java.util.concurrent</code> 包下，其中定义了 5 个方法，主要包括下面这 4 个功能：</p><ul><li>取消任务；</li><li>判断任务是否被取消；</li><li>判断任务是否已经执行完成；</li><li>获取任务执行结果。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// V 代表了 Future 执行的任务返回值的类型
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>FutureTask</code> 不光实现了 <code>Future</code>接口，还实现了<code>Runnable</code> 接口，因此可以作为任务直接被线程执行。</p>`,21),nn={href:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",target:"_blank",rel:"noopener noreferrer"},sn=n("img",{src:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",alt:"img",tabindex:"0",loading:"lazy"},null,-1),an=n("figcaption",null,"img",-1),en=t(`<p><code>FutureTask</code> 有两个构造函数，可传入 <code>Callable</code> 或者 <code>Runnable</code> 对象。实际上，传入 <code>Runnable</code> 对象也会在方法内部转换为<code>Callable</code> 对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public FutureTask(Callable&lt;V&gt; callable) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code>CompletableFuture</code> 同时实现了 <code>Future</code> 和 <code>CompletionStage</code> 接口。</p>`,9),tn={href:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",target:"_blank",rel:"noopener noreferrer"},cn=n("img",{src:"https://camo.githubusercontent.com/11ad130bc21f74bdc678cfb34a8626983cfc186a1a0467137a6f3406dcde715e/68747470733a2f2f6f73732e6a61766167756964652e636e2f6769746875622f6a61766167756964652f6a6176612f636f6e63757272656e742f636f6d706c657461626c656675747572652d636c6173732d6469616772616d2e6a7067",alt:"img",tabindex:"0",loading:"lazy"},null,-1),on=n("figcaption",null,"img",-1),ln=n("p",null,[n("code",null,"CompletionStage"),s(" 接口描述了一个异步计算的阶段。很多计算可以分成多个阶段或步骤，此时可以通过它将所有步骤组合起来，形成异步计算的流水线。")],-1),pn=n("p",null,[n("code",null,"CompletionStage"),s(" 接口中的方法比较多，"),n("code",null,"CompletableFuture"),s(" 的函数式能力就是这个接口赋予的。从这个接口的方法参数你就可以发现其大量使用了 Java8 引入的函数式编程。")],-1),un={href:"https://camo.githubusercontent.com/bae81809cbfbee278ea8553cb9f67f0a656e8ca3c71b21050d5ac13b0d3a89c9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6a61766167756964652f696d6167652d32303231303930323039333032363035392e706e67",target:"_blank",rel:"noopener noreferrer"},dn=n("img",{src:"https://camo.githubusercontent.com/bae81809cbfbee278ea8553cb9f67f0a656e8ca3c71b21050d5ac13b0d3a89c9/68747470733a2f2f6f73732e6a61766167756964652e636e2f6a61766167756964652f696d6167652d32303231303930323039333032363035392e706e67",alt:"img",tabindex:"0",loading:"lazy"},null,-1),rn=n("figcaption",null,"img",-1),vn=t(`<h2 id="java-并发工具" tabindex="-1"><a class="header-anchor" href="#java-并发工具" aria-hidden="true">#</a> Java 并发工具</h2><p>【中等】你使用过哪些 Java 并发工具类？<br> 【中等】什么是 Java 的 Semaphore？<br> 【困难】什么是 Java 的 CyclicBarrier？</p><h3 id="semaphore-有什么用" tabindex="-1"><a class="header-anchor" href="#semaphore-有什么用" aria-hidden="true">#</a> Semaphore 有什么用？</h3><p><code>synchronized</code> 和 <code>ReentrantLock</code> 都是一次只允许一个线程访问某个资源，而<code>Semaphore</code>（信号量）可以用来控制同时访问特定资源的线程数量。</p><p>Semaphore 的使用简单，我们这里假设有 N(N&gt;5) 个线程来获取 <code>Semaphore</code> 中的共享资源，下面的代码表示同一时刻 N 个线程中只有 5 个线程能获取到共享资源，其他线程都会阻塞，只有获取到共享资源的线程才能执行。等到有线程释放了共享资源，其他阻塞的线程才能获取到。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 初始共享资源数量
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2><h3 id="生产者消费者模式" tabindex="-1"><a class="header-anchor" href="#生产者消费者模式" aria-hidden="true">#</a> 生产者消费者模式</h3><p><strong>经典问题</strong></p><p>（1）什么是生产者消费者模式</p><p>（2）Java 中如何实现生产者消费者模式</p><p><strong>知识点</strong></p><p>（1）什么是生产者消费者模式</p><p>生产者消费者模式是一个经典的并发设计模式。在这个模型中，有一个共享缓冲区；有两个线程，一个负责向缓冲区推数据，另一个负责向缓冲区拉数据。要让两个线程更好的配合，就需要一个阻塞队列作为媒介来进行调度，由此便诞生了生产者消费者模式。</p><figure><img src="https://learn.lianglianglee.com/专栏/Java 并发编程 78 讲-完/assets/CgotOV3OJ3iAGcaiAAFrcv5xk9U160.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>（2）Java 中如何实现生产者消费者模式</p><p>在 Java 中，实现生产者消费者模式有 3 种具有代表性的方式：</p><ul><li>基于 BlockingQueue 实现</li><li>基于 Condition 实现</li><li>基于 wait/notify 实现</li></ul><p>【示例】基于 BlockingQueue 实现生产者消费者模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerConsumerDemo01</span> <span class="token punctuation">{</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,68);function kn(mn,bn){const a=c("ExternalLinkIcon");return o(),l("div",null,[u,n("figure",null,[n("a",d,[r,e(a)]),v]),k,n("figure",null,[n("a",m,[b,e(a)]),h]),f,n("figure",null,[n("a",g,[x,e(a)]),w]),y,n("figure",null,[n("a",T,[P,e(a)]),E]),_,n("p",null,[s("具体的源码分析可以参考这篇："),n("a",S,[s("线程池中线程异常后：销毁还是复用？ - 京东技术"),e(a)]),s("。")]),C,n("blockquote",null,[n("p",null,[s("🌈 拓展一下（参见："),n("a",q,[s("issue#1737"),e(a)]),s("）：")]),F]),L,Q,n("p",null,[s("美团技术团队在 "),n("a",A,[s("《Java 线程池实现原理及其在美团业务中的实践》"),e(a)]),s(" 这篇文章中介绍到对线程池参数实现可自定义配置的思路和方法。")]),B,n("p",null,[s("我在 "),n("a",I,[s("Java 线程池详解"),e(a)]),s(" 这篇文章中就说过这三个参数是 "),R,s(" 最重要的参数，它们基本决定了线程池对于任务的处理策略。")]),O,n("figure",null,[n("a",j,[U,e(a)]),N]),z,n("figure",null,[n("a",D,[M,e(a)]),J]),n("p",null,[s("还没看够？推荐 why 神的 "),n("a",V,[s("如何设置线程池参数？美团给出了一个让面试官虎躯一震的回答。"),e(a)]),s(" 这篇文章，深度剖析，很不错哦！")]),W,n("ul",null,[n("li",null,[n("strong",null,[n("a",H,[s("Hippo4j"),e(a)])]),s("：异步线程池框架，支持线程池动态变更&监控&报警，无需修改代码轻松引入。支持多种使用模式，轻松引入，致力于提高系统运行保障能力。")]),n("li",null,[n("strong",null,[n("a",X,[s("Dynamic TP"),e(a)])]),s("：轻量级动态线程池，内置监控告警功能，集成三方中间件线程池管理，基于主流配置中心（已支持 Nacos、Apollo，Zookeeper、Consul、Etcd，可通过 SPI 自定义实现）。")])]),G,n("figure",null,[n("a",K,[Z,e(a)]),Y]),$,n("figure",null,[n("a",nn,[sn,e(a)]),an]),en,n("figure",null,[n("a",tn,[cn,e(a)]),on]),ln,pn,n("figure",null,[n("a",un,[dn,e(a)]),rn]),vn])}const gn=i(p,[["render",kn],["__file","index.html.vue"]]);export{gn as default};
