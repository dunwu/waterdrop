import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o,c as p,a as n,b as t,d as c,e as l}from"./app-7c7efa3d.js";const i={},d=l(`<h1 id="python-控制语句" tabindex="-1"><a class="header-anchor" href="#python-控制语句" aria-hidden="true">#</a> Python 控制语句</h1><h2 id="选择语句" tabindex="-1"><a class="header-anchor" href="#选择语句" aria-hidden="true">#</a> 选择语句</h2><p>Python 的选择语句的语法格式为：<code>if...elif...else</code> 语句。</p><ul><li><code>if</code> 语句至多有 1 个 <code>else</code> 语句，<code>else</code> 语句在所有的 <code>elif</code> 语句之后。</li><li><code>if</code> 语句可以有若干个 <code>elif</code> 语句，它们必须在 <code>else</code> 语句之前。</li><li>一旦其中一个 <code>elif</code> 语句检测为 <code>true</code>，其他的 <code>elif</code> 以及 <code>else</code> 语句都将跳过执行。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>code <span class="token operator">=</span> <span class="token number">3</span>
<span class="token keyword">if</span> code <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;code == 0&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">elif</span> code <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;code == 1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;code != 0 &amp;&amp; code != 1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># code != 0 &amp;&amp; code != 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句" aria-hidden="true">#</a> 循环语句</h2><h3 id="while-循环" tabindex="-1"><a class="header-anchor" href="#while-循环" aria-hidden="true">#</a> while 循环</h3><p>只要布尔表达式为 <code>true</code>，<code>while</code> 循环体会一直执行下去。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>count <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>count <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;count = &#39;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
  count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span>
<span class="token comment"># 输出</span>
<span class="token comment"># count =  1</span>
<span class="token comment"># count =  2</span>
<span class="token comment"># count =  3</span>
<span class="token comment"># count =  4</span>
<span class="token comment"># count =  5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for-循环" tabindex="-1"><a class="header-anchor" href="#for-循环" aria-hidden="true">#</a> for 循环</h3><p>for 循环可以遍历任何的序列对象或可迭代对象。</p><p>【示例】遍历字符串字符</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> letter <span class="token keyword">in</span> <span class="token string">&#39;python&#39;</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;char: %s&quot;</span> <span class="token operator">%</span> letter<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># char: p</span>
<span class="token comment"># char: y</span>
<span class="token comment"># char: t</span>
<span class="token comment"># char: h</span>
<span class="token comment"># char: o</span>
<span class="token comment"># char: n</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【示例】遍历数组</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;yellow&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;blue&#39;</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> color <span class="token keyword">in</span> colors<span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;color: %s&#39;</span> <span class="token operator">%</span> color<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># color: red</span>
<span class="token comment"># color: yellow</span>
<span class="token comment"># color: blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【示例】遍历指定整数范围</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;num = &#39;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># num =  2</span>
<span class="token comment"># num =  4</span>
<span class="token comment"># num =  6</span>
<span class="token comment"># num =  8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中断语句" tabindex="-1"><a class="header-anchor" href="#中断语句" aria-hidden="true">#</a> 中断语句</h2><h3 id="break-语句" tabindex="-1"><a class="header-anchor" href="#break-语句" aria-hidden="true">#</a> break 语句</h3><p><code>break</code> 语句用来终止循环语句，即循环条件没有 False 条件或者序列还没被完全递归完，也会停止执行循环语句。</p><p><code>break</code> 语句用在 <code>while</code> 和 <code>for</code> 循环中。</p><p>【示例】遍历字符串，找到指定字母的位置后退出</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pos <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">for</span> letter <span class="token keyword">in</span> <span class="token string">&#39;python&#39;</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> letter <span class="token operator">==</span> <span class="token string">&#39;h&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;h pos: &#39;</span><span class="token punctuation">,</span> pos<span class="token punctuation">)</span>
    <span class="token keyword">break</span>
  <span class="token keyword">else</span><span class="token punctuation">:</span>
    pos <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token comment"># 输出</span>
<span class="token comment"># h pos:  3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="continue-语句" tabindex="-1"><a class="header-anchor" href="#continue-语句" aria-hidden="true">#</a> continue 语句</h3><p>使用 <code>continue</code> 语句意味着跳过当前循环的剩余语句，然后继续进行下一轮循环。</p><p><code>continue</code> 语句用在 <code>while</code> 和 <code>for</code> 循环中。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>num <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">if</span> num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
    <span class="token keyword">continue</span>
  <span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;num = </span><span class="token interpolation"><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># num = 1</span>
<span class="token comment"># num = 3</span>
<span class="token comment"># num = 5</span>
<span class="token comment"># num = 7</span>
<span class="token comment"># num = 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pass-语句" tabindex="-1"><a class="header-anchor" href="#pass-语句" aria-hidden="true">#</a> pass 语句</h3><p>Python pass 是空语句，是为了保持程序结构的完整性。</p><p><code>pass</code> 不做任何事情，一般用做占位语句。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># pass 语句</span>
age <span class="token operator">=</span> <span class="token number">65</span>
<span class="token keyword">if</span> age <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;未成年&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">elif</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span> <span class="token keyword">and</span> age <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;成年人&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">elif</span> age <span class="token operator">&gt;=</span> <span class="token number">30</span> <span class="token keyword">and</span> age <span class="token operator">&lt;</span> <span class="token number">65</span><span class="token punctuation">:</span>
  <span class="token keyword">pass</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;老年人&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,32),r={href:"https://www.runoob.com/python/python-tutorial.html",target:"_blank",rel:"noopener noreferrer"};function u(k,m){const s=e("ExternalLinkIcon");return o(),p("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[t("菜鸟-基础教程"),c(s)])])])])}const h=a(i,[["render",u],["__file","index.html.vue"]]);export{h as default};
