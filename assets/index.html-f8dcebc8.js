import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,e as a}from"./app-1c9286fd.js";const i={},t=a(`<h1 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h1><h2 id="错误的分类" tabindex="-1"><a class="header-anchor" href="#错误的分类" aria-hidden="true">#</a> 错误的分类</h2><h4 id="资源的错误" tabindex="-1"><a class="header-anchor" href="#资源的错误" aria-hidden="true">#</a> 资源的错误</h4><p>当我们的代码去请求一些资源时导致的错误，比如打开一个没有权限的文件，写文件时出现的写错误，发送文件到网络端发现网络故障的错误，等等。<strong>这一类错误属于程序运行环境的问题。对于这类错误，有的我们可以处理，有的我们则无法处理。比如，内存耗尽、栈溢出或是一些程序运行时关键性资源不能满足等等这些情况，我们只能停止运行，甚至退出整个程序。</strong></p><h4 id="程序的错误" tabindex="-1"><a class="header-anchor" href="#程序的错误" aria-hidden="true">#</a> 程序的错误</h4><p>比如：空指针、非法参数等。<strong>这类是我们自己程序的错误，我们要记录下来，写入日志，最好触发监控系统报警</strong>。</p><h4 id="用户的错误" tabindex="-1"><a class="header-anchor" href="#用户的错误" aria-hidden="true">#</a> 用户的错误</h4><p>比如：Bad Request、Bad Format 等这类由用户不合法输入带来的错误。<strong>这类错误基本上是在用户的 API 层上出现的问题</strong>。比如，解析一个 XML 或 JSON 文件，或是用户输入的字段不合法之类的。</p><p><strong>对于这类问题，我们需要向用户端报错，让用户自己处理修正他们的输入或操作。然后，我们正常执行，但是需要做统计，统计相应的错误率，这样有利于我们改善软件或是侦测是否有恶意的用户请求。</strong></p><h2 id="错误返回码和异常捕捉" tabindex="-1"><a class="header-anchor" href="#错误返回码和异常捕捉" aria-hidden="true">#</a> 错误返回码和异常捕捉</h2><p>错误处理一般有两种方式：错误返回码和异常捕捉。</p><ul><li>对于我们并不期望会发生的事，我们可以使用异常捕捉；</li><li>对于我们觉得可能会发生的事，使用返回码。</li></ul><h2 id="异步编程的错误处理" tabindex="-1"><a class="header-anchor" href="#异步编程的错误处理" aria-hidden="true">#</a> 异步编程的错误处理</h2><ul><li><strong>无法使用返回码</strong>。因为函数在“被”异步运行中，所谓的返回只是把处理权交给下一条指令，而不是把函数运行完的结果返回。<strong>所以，函数返回的语义完全变了，返回码也没有用了</strong>。</li><li><strong>无法使用抛异常的方式</strong>。因为除了上述的函数立马返回的原因之外，抛出的异常也在另外一个线程中，不同线程中的栈是完全不一样的，所以主线程的 <code>catch</code> 完全看不到另外一个线程中的异常。</li></ul><h3 id="callback-错误处理" tabindex="-1"><a class="header-anchor" href="#callback-错误处理" aria-hidden="true">#</a> callback 错误处理</h3><p>异步编程中，最常用的错误处理方式就是 <code>callback</code> 方式。在做异步请求的时候，注册几个 <code>OnSuccess()</code>、 <code>OnFailure()</code> 这样的函数，让在另一个线程中运行的异步代码来回调过来。</p><p>【示例】JavaScript 异步编程的错误处理</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">successCallback</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;It succeeded with &#39;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">failureCallback</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;It failed with &#39;</span> <span class="token operator">+</span> error<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">doSomething</span><span class="token punctuation">(</span>successCallback<span class="token punctuation">,</span> failureCallback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是， 如果我们需要把几个异步函数顺序执行的话（异步程序中，程序执行的顺序是不可预测的、也是不确定的，而有时候，函数被调用的上下文是有相互依赖的，所以，我们希望它们能按一定的顺序处理），就会出现了所谓的 Callback Hell 的问题。如下所示：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">doSomethingElse</span><span class="token punctuation">(</span>
    result<span class="token punctuation">,</span>
    <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newResult</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">doThirdThing</span><span class="token punctuation">(</span>
        newResult<span class="token punctuation">,</span>
        <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">finalResult</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Got the final result: &#39;</span> <span class="token operator">+</span> finalResult<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        failureCallback
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    failureCallback
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> failureCallback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而这样层层嵌套中需要注册的错误处理函数也有可能是完全不一样的，而且会导致代码非常混乱，难以阅读和维护。</p><h3 id="javascript-的-promise-错误处理" tabindex="-1"><a class="header-anchor" href="#javascript-的-promise-错误处理" aria-hidden="true">#</a> JavaScript 的 Promise 错误处理</h3><p>在异步编程的实践里，使用 Promise 模式来处理更为优雅。</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>doSomething()
.then(result =&gt; doSomethingElse(result))
.then(newResult =&gt; doThirdThing(newResult))
.then(finalResult =&gt; {
  console.log(\`Got the final result: \${finalResult}\`);
}).catch(failureCallback);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的 <code>then()</code> 和 <code>catch()</code> 方法就是 Promise 对象的方法，<code>then()</code>方法可以把各个异步的函数给串联起来，而<code>catch()</code> 方法则是出错的处理。</p><p>看到上面的那个级联式的调用方式，这就要我们的 <code>doSomething()</code> 函数返回 Promise 对象，下面是这个函数的相关代码示例：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>function doSomething() {
	let promise = new Promise();
	let xhr = new XMLHttpRequest();
	xhr.open(&#39;GET&#39;, &#39;http://coolshell.cn/....&#39;, true);

	xhr.onload = function (e) {
        if (this.status === 200) {
            results = JSON.parse(this.responseText);
            promise.resolve(results); // 成功时，调用 resolve() 方法
        }
    };

    xhr.onerror = function (e) {
        promise.reject(e); // 失败时，调用 reject() 方法
    };

    xhr.send();
    return promise;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码示例中，我们可以看到，如果成功了，要调用<br><code>Promise.resolve()</code> 方法，这样 Promise 对象会继续调用下一个 <code>then()</code>。如果出错了就调用 <code>Promise.reject()</code> 方法，这样就会忽略后面的 <code>then()</code> 直到 <code>catch()</code> 方法。</p><p>我们可以看到 <code>Promise.reject()</code> 就像是抛异常一样。这个编程模式让我们的代码组织方便了很多。</p><p>另外，多说一句，Promise 还可以同时等待两个不同的异步方法。比如下面的代码所展示的方式：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>promise1 = doSomething();
promise2 = doSomethingElse();
Promise.when(promise1, promise2).then( function (result1, result2) {
	... // 处理 result1 和 result2 的代码
}, handleError);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 ECMAScript 2017 的标准中，我们可以使用<code>async</code>/<code>await</code> 这两个关键字来取代 Promise 对象，这样可以让我们的代码更易读。</p><p>比如下面的代码示例：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>async function foo() {
  try {
    let result = await doSomething();
    let newResult = await doSomethingElse(result);
    let finalResult = await doThirdThing(newResult);
    console.log(\`Got the final result: \${finalResult}\`);
  } catch(error) {
    failureCallback(error);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在函数定义之前使用了 <code>async</code> 关键字，就可以在函数内使用 <code>await</code>。 当在 <code>await</code> 某个 <code>Promise</code> 时，函数暂停执行，直至该 <code>Promise</code> 产生结果，并且暂停不会阻塞主线程。 如果 <code>Promise</code> resolve，则会返回值。 如果 <code>Promise</code> reject，则会抛出拒绝的值。</p><h3 id="java-的-promise-模式" tabindex="-1"><a class="header-anchor" href="#java-的-promise-模式" aria-hidden="true">#</a> Java 的 Promise 模式</h3><p>在 JDK 1.8 里也引入了类似 JavaScript 的玩法 —— <code>CompletableFuture</code>。这个类提供了大量的异步编程中 Promise 的各种方式。</p><p>链式处理：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>CompletableFuture.supplyAsync(this::findReceiver)
                 .thenApply(this::sendMsg)
                 .thenAccept(this::notify);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的这个链式处理和 JavaScript 中的<code>then()</code>方法很像，其中的<br><code>supplyAsync()</code> 表示执行一个异步方法，而 <code>thenApply()</code> 表示执行成功后再串联另外一个异步方法，最后是 <code>thenAccept()</code> 来处理最终结果。</p><p>下面这个例子是要合并两个异步函数的结果：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>String result = CompletableFuture.supplyAsync(() -&gt; {
         return &quot;hello&quot;;
     }).thenCombine(CompletableFuture.supplyAsync(() -&gt; {
         return &quot;world&quot;;
     }), (s1, s2) -&gt; s1 + &quot; &quot; + s2).join());
System.out.println(result);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们再来看一下，Java 这个类相关的异常处理：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>CompletableFuture.supplyAsync(Integer::parseInt) // 输入: &quot;ILLEGAL&quot;
			     .thenApply(r -&gt; r * 2 * Math.PI)
			     .thenApply(s -&gt; &quot;apply&gt;&gt; &quot; + s)
			     .exceptionally(ex -&gt; &quot;Error: &quot; + ex.getMessage());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要注意到上面代码里的 <code>exceptionally()</code> 方法，这个和 JavaScript Promise 中的 <code>catch()</code> 方法相似。</p><p>运行上面的代码，会出现如下输出：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>Error: java.lang.NumberFormatException: For input string: &quot;ILLEGAL&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以这样：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>CompletableFuture.supplyAsync(Integer::parseInt) // 输入: &quot;ILLEGAL&quot;
				 .thenApply(r -&gt; r * 2 * Math.PI)
				 .thenApply(s -&gt; &quot;apply&gt;&gt; &quot; + s)
				 .handle((result, ex) -&gt; {
				 	if (result != null) {
				 		return result;
				 	} else {
				 		return &quot;Error handling: &quot; + ex.getMessage();
				 	}
				 });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，你可以看到，其使用了 <code>handle()</code> 方法来处理最终的结果，其中包含了异步函数中的错误处理。</p><h2 id="错误处理的最佳实践" tabindex="-1"><a class="header-anchor" href="#错误处理的最佳实践" aria-hidden="true">#</a> 错误处理的最佳实践</h2><ul><li><strong>统一分类的错误字典</strong>。无论你是使用错误码还是异常捕捉，都需要认真并统一地做好错误的分类。最好是在一个地方定义相关的错误。比如，HTTP 的 4XX 表示客户端有问题，5XX 则表示服务端有问题。也就是说，你要建立一个错误字典。</li><li><strong>同类错误的定义最好是可以扩展的</strong>。这一点非常重要，而对于这一点，通过面向对象的继承或是像 Go 语言那样的接口多态可以很好地做到。这样可以方便地重用已有的代码。</li><li><strong>定义错误的严重程度</strong>。比如，Fatal 表示重大错误，Error 表示资源或需求得不到满足，Warning 表示并不一定是个错误但还是需要引起注意，Info 表示不是错误只是一个信息，Debug 表示这是给内部开发人员用于调试程序的。</li><li><strong>错误日志的输出最好使用错误码，而不是错误信息</strong>。打印错误日志的时候，应该使用统一的格式。但最好不要用错误信息，而应使用相应的错误码，错误码不一定是数字，也可以是一个能从错误字典里找到的一个唯一的可以让人读懂的关键字。这样，会非常有利于日志分析软件进行自动化监控，而不是要从错误信息中做语义分析。比如：HTTP 的日志中就会有 HTTP 的返回码，如：<code>404</code>。但我更推荐使用像<code>PageNotFound</code>这样的标识，这样人和机器都很容易处理。</li><li><strong>忽略错误最好有日志</strong>。不然会给维护带来很大的麻烦。</li><li><strong>对于同一个地方不停的报错，最好不要都打到日志里</strong>。不然这样会导致其它日志被淹没了，也会导致日志文件太大。最好的实践是，打出一个错误以及出现的次数。</li><li><strong>不要用错误处理逻辑来处理业务逻辑</strong>。也就是说，不要使用异常捕捉这样的方式来处理业务逻辑，而是应该用条件判断。如果一个逻辑控制可以用 if - else 清楚地表达，那就不建议使用异常方式处理。异常捕捉是用来处理不期望发生的事情，而错误码则用来处理可能会发生的事。</li><li><strong>对于同类的错误处理，用一样的模式</strong>。比如，对于<code>null</code>对象的错误，要么都用返回 null，加上条件检查的模式，要么都用抛 NullPointerException 的方式处理。不要混用，这样有助于代码规范。</li><li><strong>尽可能在错误发生的地方处理错误</strong>。因为这样会让调用者变得更简单。</li><li><strong>向上尽可能地返回原始的错误</strong>。如果一定要把错误返回到更高层去处理，那么，应该返回原始的错误，而不是重新发明一个错误。</li><li><strong>处理错误时，总是要清理已分配的资源</strong>。这点非常关键，使用 RAII 技术，或是 try-catch-finally，或是 Go 的 defer 都可以容易地做到。</li><li><strong>不推荐在循环体里处理错误</strong>。这里说的是 try-catch，绝大多数的情况你不需要这样做。最好把整个循环体外放在 try 语句块内，而在外面做 catch。</li><li><strong>不要把大量的代码都放在一个 try 语句块内</strong>。一个 try 语句块内的语句应该是完成一个简单单一的事情。</li><li><strong>为你的错误定义提供清楚的文档以及每种错误的代码示例</strong>。如果你是做 RESTful API 方面的，使用 Swagger 会帮你很容易搞定这个事。</li><li><strong>对于异步的方式，推荐使用 Promise 模式处理错误</strong>。对于这一点，JavaScript 中有很好的实践。</li><li><strong>对于分布式的系统，推荐使用 APM 相关的软件</strong>。尤其是使用 Zipkin 这样的服务调用跟踪的分析来关联错误。</li></ul>`,52),l=[t];function c(r,o){return e(),s("div",null,l)}const p=n(i,[["render",c],["__file","index.html.vue"]]);export{p as default};
