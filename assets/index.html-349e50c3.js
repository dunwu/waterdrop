import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as p,a as n,b as a,d as e,e as o}from"./app-8e5f1cb5.js";const l={},d=o(`<h1 id="springboot-教程之处理异步请求" tabindex="-1"><a class="header-anchor" href="#springboot-教程之处理异步请求" aria-hidden="true">#</a> SpringBoot 教程之处理异步请求</h1><h2 id="enableasync-注解" tabindex="-1"><a class="header-anchor" href="#enableasync-注解" aria-hidden="true">#</a> <code>@EnableAsync</code> 注解</h2><p>要使用 <code>@Async</code>，首先需要使用 <code>@EnableAsync</code> 注解开启 Spring Boot 中的异步特性。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableAsync</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),r={href:"https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/AsyncConfigurer.html",target:"_blank",rel:"noopener noreferrer"},u=n("code",null,"AsyncConfigurer",-1),v=o(`<h2 id="async-注解" tabindex="-1"><a class="header-anchor" href="#async-注解" aria-hidden="true">#</a> <code>@Async</code> 注解</h2><h3 id="支持的用法" tabindex="-1"><a class="header-anchor" href="#支持的用法" aria-hidden="true">#</a> 支持的用法</h3><p>（1）<strong>无入参无返回值方法</strong></p><p>您可以用 <code>@Async</code> 注解修饰方法，这表明这个方法是异步方式调用。换句话说，程序在调用此方法时会立即返回，而方法的实际执行发生在已提交给 Spring <code>TaskExecutor</code> 的任务中。在最简单的情况下，您可以将注解应用于返回 void 的方法，如以下示例所示：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>
<span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this will be executed asynchronously</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）<strong>有入参无返回值方法</strong></p><p>与使用 <code>@Scheduled</code> 注释注释的方法不同，这些方法可以指定参数，因为它们在运行时由调用者以“正常”方式调用，而不是由容器管理的调度任务调用。例如，以下代码是 <code>@Async</code> 注解的合法应用：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>
<span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this will be executed asynchronously</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）<strong>有入参有返回值方法</strong></p><p>甚至可以异步调用返回值的方法。但是，这些方法需要具有 <code>Future</code> 类型的返回值。这仍然提供了异步执行的好处，以便调用者可以在调用 <code>Future</code> 上的 <code>get()</code> 之前执行其他任务。以下示例显示如何在返回值的方法上使用<code>@Async</code>：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>
<span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">returnSomething</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this will be executed asynchronously</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不支持的用法" tabindex="-1"><a class="header-anchor" href="#不支持的用法" aria-hidden="true">#</a> 不支持的用法</h3><p><code>@Async</code> 不能与生命周期回调一起使用，例如 <code>@PostConstruct</code>。</p><p>要异步初始化 Spring bean，必须使用单独的初始化 Spring bean，然后在目标上调用 <code>@Async</code> 带注释的方法，如以下示例所示：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SampleBeanImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SampleBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Async</span>
    <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SampleBeanInitializer</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">SampleBean</span> bean<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">SampleBeanInitializer</span><span class="token punctuation">(</span><span class="token class-name">SampleBean</span> bean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bean <span class="token operator">=</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bean<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="明确指定执行器" tabindex="-1"><a class="header-anchor" href="#明确指定执行器" aria-hidden="true">#</a> 明确指定执行器</h2><p>默认情况下，在方法上指定 <code>@Async</code> 时，使用的执行器是在启用异步支持时配置的执行器，即如果使用 XML 或 <code>AsyncConfigurer</code> 实现（如果有），则为 <code>annotation-driven</code> 元素。但是，如果需要指示在执行给定方法时应使用默认值以外的执行器，则可以使用 <code>@Async</code> 注解的 value 属性。以下示例显示了如何执行此操作：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span><span class="token punctuation">(</span><span class="token string">&quot;otherExecutor&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this will be executed asynchronously by &quot;otherExecutor&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，“otherExecutor”可以是 Spring 容器中任何 Executor bean 的名称，也可以是与任何 Executor 关联的限定符的名称（例如，使用 <code>&lt;qualifier&gt;</code> 元素或 Spring 的 <code>@Qualifier</code> 注释指定） ）。</p><h2 id="管理-async-的异常" tabindex="-1"><a class="header-anchor" href="#管理-async-的异常" aria-hidden="true">#</a> 管理 <code>@Async</code> 的异常</h2><p>当 <code>@Async</code> 方法的返回值类型为 <code>Future</code> 型时，很容易管理在方法执行期间抛出的异常，因为在调用 <code>get</code> 结果时会抛出此异常。但是，对于返回值类型为 void 型的方法，异常不会被捕获且无法传输。您可以提供 <code>AsyncUncaughtExceptionHandler</code> 来处理此类异常。以下示例显示了如何执行此操作：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAsyncUncaughtExceptionHandler</span> <span class="token keyword">implements</span> <span class="token class-name">AsyncUncaughtExceptionHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleUncaughtException</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// handle exception</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，仅记录异常。您可以使用 <code>AsyncConfigurer</code> 或 <code>&lt;task：annotation-driven /&gt;</code> XML 元素定义自定义 <code>AsyncUncaughtExceptionHandler</code>。</p><h2 id="示例源码" tabindex="-1"><a class="header-anchor" href="#示例源码" aria-hidden="true">#</a> 示例源码</h2>`,24),k={href:"https://github.com/dunwu/spring-boot-tutorial/tree/master/codes/spring-boot-async",target:"_blank",rel:"noopener noreferrer"},m=n("h2",{id:"参考资料",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考资料","aria-hidden":"true"},"#"),a(" 参考资料")],-1),b={href:"https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#scheduling-annotation-support",target:"_blank",rel:"noopener noreferrer"};function g(y,f){const s=t("ExternalLinkIcon");return i(),p("div",null,[d,n("p",null,[a("更详细的配置说明，可以参考："),n("a",r,[u,e(s)])]),v,n("blockquote",null,[n("p",null,[a("示例源码："),n("a",k,[a("spring-boot-async"),e(s)])])]),m,n("ul",null,[n("li",null,[n("a",b,[a("Spring Boot 官方文档之 boot-features-external-config"),e(s)])]),n("li",null,[n("a",h,[a("Spring Boot 官方文档之 scheduling-annotation-support"),e(s)])])])])}const w=c(l,[["render",g],["__file","index.html.vue"]]);export{w as default};