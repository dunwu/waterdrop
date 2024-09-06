import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as i,c as t,a as n,b as c,d as l,e as o}from"./app-198b997f.js";const p={},d=o(`<h1 id="redis-事件" tabindex="-1"><a class="header-anchor" href="#redis-事件" aria-hidden="true">#</a> Redis 事件</h1><blockquote><p>Redis 服务器是一个事件驱动程序，服务器需要处理两类事件：</p><ul><li><strong><code>文件事件（file event）</code></strong> - Redis 服务器通过套接字（Socket）与客户端或者其它服务器进行通信，文件事件就是对套接字操作的抽象。服务器与客户端（或其他的服务器）的通信会产生文件事件，而服务器通过监听并处理这些事件来完成一系列网络通信操作。</li><li><strong><code>时间事件（time event）</code></strong> - Redis 服务器有一些操作需要在给定的时间点执行，时间事件是对这类定时操作的抽象。</li></ul><p>关键词：<code>文件事件</code>、<code>时间事件</code></p></blockquote><h2 id="文件事件" tabindex="-1"><a class="header-anchor" href="#文件事件" aria-hidden="true">#</a> 文件事件</h2><p>Redis 基于 Reactor 模式开发了自己的网络时间处理器。</p><ul><li>Redis 文件事件处理器使用 I/O 多路复用程序来同时监听多个套接字，并根据套接字目前执行的任务来为套接字关联不同的事件处理器。</li><li>当被监听的套接字准备好执行连接应答、读取、写入、关闭操作时，与操作相对应的文件事件就会产生，这时文件事件处理器就会调用套接字之前关联好的事件处理器来处理这些事件。</li></ul><p>虽然文件事件处理器以单线程方式运行，但通过使用 I/O 多路复用程序来监听多个套接字，文件事件处理器实现了高性能的网络通信模型。</p><p>文件事件处理器有四个组成部分：套接字、I/O 多路复用程序、文件事件分派器、事件处理器。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20200130172525.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="时间事件" tabindex="-1"><a class="header-anchor" href="#时间事件" aria-hidden="true">#</a> 时间事件</h2><p>时间事件又分为：</p><ul><li><strong>定时事件</strong>：是让一段程序在指定的时间之内执行一次；</li><li><strong>周期性事件</strong>：是让一段程序每隔指定时间就执行一次。</li></ul><p>Redis 将所有时间事件都放在一个无序链表中，每当时间事件执行器运行时，通过遍历整个链表查找出已到达的时间事件，并调用响应的事件处理器。</p><h2 id="事件的调度与执行" tabindex="-1"><a class="header-anchor" href="#事件的调度与执行" aria-hidden="true">#</a> 事件的调度与执行</h2><p>服务器需要不断监听文件事件的套接字才能得到待处理的文件事件，但是不能一直监听，否则时间事件无法在规定的时间内执行，因此监听时间应该根据距离现在最近的时间事件来决定。</p><p>事件调度与执行由 aeProcessEvents 函数负责，伪代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">aeProcessEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token comment">## 获取到达时间离当前时间最接近的时间事件</span>
    time_event <span class="token operator">=</span> aeSearchNearestTimer<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 计算最接近的时间事件距离到达还有多少毫秒</span>
    remaind_ms <span class="token operator">=</span> time_event<span class="token punctuation">.</span>when <span class="token operator">-</span> unix_ts_now<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 如果事件已到达，那么 remaind_ms 的值可能为负数，将它设为 0</span>
    <span class="token keyword">if</span> remaind_ms <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
        remaind_ms <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment">## 根据 remaind_ms 的值，创建 timeval</span>
    timeval <span class="token operator">=</span> create_timeval_with_ms<span class="token punctuation">(</span>remaind_ms<span class="token punctuation">)</span>

    <span class="token comment">## 阻塞并等待文件事件产生，最大阻塞时间由传入的 timeval 决定</span>
    aeApiPoll<span class="token punctuation">(</span>timeval<span class="token punctuation">)</span>

    <span class="token comment">## 处理所有已产生的文件事件</span>
    procesFileEvents<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 处理所有已到达的时间事件</span>
    processTimeEvents<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 aeProcessEvents 函数置于一个循环里面，加上初始化和清理函数，就构成了 Redis 服务器的主函数，伪代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token comment">## 初始化服务器</span>
    init_server<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 一直处理事件，直到服务器关闭为止</span>
    <span class="token keyword">while</span> server_is_not_shutdown<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        aeProcessEvents<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 服务器关闭，执行清理操作</span>
    clean_server<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从事件处理的角度来看，服务器运行流程如下：</p><div align="center"><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/database/redis/redis-event.png"></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,21),r={href:"https://item.jd.com/11486101.html",target:"_blank",rel:"noopener noreferrer"};function u(m,v){const s=e("ExternalLinkIcon");return i(),t("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[c("《Redis 设计与实现》"),l(s)])])])])}const h=a(p,[["render",u],["__file","index.html.vue"]]);export{h as default};
