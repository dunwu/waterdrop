const n=JSON.parse('{"key":"v-77ec88bb","path":"/pages/37ccdcd1/","title":"《极客时间教程 - Java 并发编程实战》笔记四","lang":"zh-CN","frontmatter":{"title":"《极客时间教程 - Java 并发编程实战》笔记四","date":"2024-08-30T08:02:52.000Z","permalink":"/pages/37ccdcd1/","category":["笔记","Java"],"tag":["Java","并发"],"description":"《极客时间教程 - Java 并发编程实战》笔记四 案例分析（一）：高性能限流器 Guava RateLimiter Guava 是 Google 开源的 Java 类库，提供了一个工具类 RateLimiter。 【示例】使用 RateLimiter 限流 //限流器流速：2 个请求/秒 RateLimiter limiter = RateLimiter.create(2.0); //执行任务的线程池 ExecutorService es = Executors.newFixedThreadPool(1); //记录上一次执行时间 prev = System.nanoTime(); //测试执行 20 次 for (int i = 0; i &lt; 20; i++) { //限流器限流 limiter.acquire(); //提交任务异步执行 es.execute(() -&gt; { long cur = System.nanoTime(); //打印时间间隔：毫秒 System.out.println((cur - prev) / 1000_000); prev = cur; }); } // 输出结果： // ... // 500 // 499 // 500 // 499","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/37ccdcd1/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"《极客时间教程 - Java 并发编程实战》笔记四"}],["meta",{"property":"og:description","content":"《极客时间教程 - Java 并发编程实战》笔记四 案例分析（一）：高性能限流器 Guava RateLimiter Guava 是 Google 开源的 Java 类库，提供了一个工具类 RateLimiter。 【示例】使用 RateLimiter 限流 //限流器流速：2 个请求/秒 RateLimiter limiter = RateLimiter.create(2.0); //执行任务的线程池 ExecutorService es = Executors.newFixedThreadPool(1); //记录上一次执行时间 prev = System.nanoTime(); //测试执行 20 次 for (int i = 0; i &lt; 20; i++) { //限流器限流 limiter.acquire(); //提交任务异步执行 es.execute(() -&gt; { long cur = System.nanoTime(); //打印时间间隔：毫秒 System.out.println((cur - prev) / 1000_000); prev = cur; }); } // 输出结果： // ... // 500 // 499 // 500 // 499"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-21T14:22:38.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:published_time","content":"2024-08-30T08:02:52.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-21T14:22:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"《极客时间教程 - Java 并发编程实战》笔记四\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-30T08:02:52.000Z\\",\\"dateModified\\":\\"2024-09-21T14:22:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"案例分析（一）：高性能限流器 Guava RateLimiter","slug":"案例分析-一-高性能限流器-guava-ratelimiter","link":"#案例分析-一-高性能限流器-guava-ratelimiter","children":[{"level":3,"title":"经典限流算法：令牌桶算法","slug":"经典限流算法-令牌桶算法","link":"#经典限流算法-令牌桶算法","children":[]},{"level":3,"title":"Guava 如何实现令牌桶算法","slug":"guava-如何实现令牌桶算法","link":"#guava-如何实现令牌桶算法","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]},{"level":2,"title":"案例分析（二）：高性能网络应用框架 Netty","slug":"案例分析-二-高性能网络应用框架-netty","link":"#案例分析-二-高性能网络应用框架-netty","children":[{"level":3,"title":"网络编程性能的瓶颈","slug":"网络编程性能的瓶颈","link":"#网络编程性能的瓶颈","children":[]},{"level":3,"title":"Reactor 模式","slug":"reactor-模式","link":"#reactor-模式","children":[]},{"level":3,"title":"Netty 中的线程模型","slug":"netty-中的线程模型","link":"#netty-中的线程模型","children":[]},{"level":3,"title":"用 Netty 实现 Echo 程序服务端","slug":"用-netty-实现-echo-程序服务端","link":"#用-netty-实现-echo-程序服务端","children":[]},{"level":3,"title":"总结","slug":"总结-1","link":"#总结-1","children":[]}]},{"level":2,"title":"案例分析（三）：高性能队列 Disruptor","slug":"案例分析-三-高性能队列-disruptor","link":"#案例分析-三-高性能队列-disruptor","children":[{"level":3,"title":"RingBuffer 如何提升性能","slug":"ringbuffer-如何提升性能","link":"#ringbuffer-如何提升性能","children":[]},{"level":3,"title":"如何避免“伪共享”","slug":"如何避免-伪共享","link":"#如何避免-伪共享","children":[]},{"level":3,"title":"Disruptor 中的无锁算法","slug":"disruptor-中的无锁算法","link":"#disruptor-中的无锁算法","children":[]}]},{"level":2,"title":"案例分析（四）：高性能数据库连接池 HiKariCP","slug":"案例分析-四-高性能数据库连接池-hikaricp","link":"#案例分析-四-高性能数据库连接池-hikaricp","children":[{"level":3,"title":"什么是数据库连接池","slug":"什么是数据库连接池","link":"#什么是数据库连接池","children":[]},{"level":3,"title":"FastList 解决了哪些性能问题","slug":"fastlist-解决了哪些性能问题","link":"#fastlist-解决了哪些性能问题","children":[]},{"level":3,"title":"ConcurrentBag 解决了哪些性能问题","slug":"concurrentbag-解决了哪些性能问题","link":"#concurrentbag-解决了哪些性能问题","children":[]}]},{"level":2,"title":"Actor 模型：面向对象原生的并发模型","slug":"actor-模型-面向对象原生的并发模型","link":"#actor-模型-面向对象原生的并发模型","children":[{"level":3,"title":"Hello Actor 模型","slug":"hello-actor-模型","link":"#hello-actor-模型","children":[]},{"level":3,"title":"消息和对象方法的区别","slug":"消息和对象方法的区别","link":"#消息和对象方法的区别","children":[]},{"level":3,"title":"Actor 的规范化定义","slug":"actor-的规范化定义","link":"#actor-的规范化定义","children":[]},{"level":3,"title":"用 Actor 实现累加器","slug":"用-actor-实现累加器","link":"#用-actor-实现累加器","children":[]}]},{"level":2,"title":"软件事务内存：借鉴数据库的并发经验","slug":"软件事务内存-借鉴数据库的并发经验","link":"#软件事务内存-借鉴数据库的并发经验","children":[{"level":3,"title":"用 STM 实现转账","slug":"用-stm-实现转账","link":"#用-stm-实现转账","children":[]}]},{"level":2,"title":"自己实现 STM","slug":"自己实现-stm","link":"#自己实现-stm","children":[]},{"level":2,"title":"协程：更轻量级的线程","slug":"协程-更轻量级的线程","link":"#协程-更轻量级的线程","children":[]},{"level":2,"title":"CSP 模型：Golang 的主力队员","slug":"csp-模型-golang-的主力队员","link":"#csp-模型-golang-的主力队员","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1725319385000,"updatedTime":1726928558000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":38,"words":11399},"filePathRelative":"99.笔记/01.Java/极客时间教程-Java并发编程实战笔记四.md","localizedDate":"2024年8月30日","excerpt":"<h1> 《极客时间教程 - Java 并发编程实战》笔记四</h1>\\n<h2> 案例分析（一）：高性能限流器 Guava RateLimiter</h2>\\n<p>Guava 是 Google 开源的 Java 类库，提供了一个工具类 RateLimiter。</p>\\n<p>【示例】使用 RateLimiter 限流</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token comment\\">//限流器流速：2 个请求/秒</span>\\n<span class=\\"token class-name\\">RateLimiter</span> limiter <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">RateLimiter</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">create</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2.0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//执行任务的线程池</span>\\n<span class=\\"token class-name\\">ExecutorService</span> es <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Executors</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newFixedThreadPool</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//记录上一次执行时间</span>\\nprev <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nanoTime</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">//测试执行 20 次</span>\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">//限流器限流</span>\\n    limiter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">acquire</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//提交任务异步执行</span>\\n    es<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">execute</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-&gt;</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">long</span> cur <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">nanoTime</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">//打印时间间隔：毫秒</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span>cur <span class=\\"token operator\\">-</span> prev<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">/</span> <span class=\\"token number\\">1000_000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        prev <span class=\\"token operator\\">=</span> cur<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">// 输出结果：</span>\\n<span class=\\"token comment\\">// ...</span>\\n<span class=\\"token comment\\">// 500</span>\\n<span class=\\"token comment\\">// 499</span>\\n<span class=\\"token comment\\">// 500</span>\\n<span class=\\"token comment\\">// 499</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};