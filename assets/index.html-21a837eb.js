import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,d as a,b as t,e}from"./app-eb4989bc.js";const i={},u=e('<h1 id="java-国际化" tabindex="-1"><a class="header-anchor" href="#java-国际化" aria-hidden="true">#</a> Java 国际化</h1><h2 id="背景知识" tabindex="-1"><a class="header-anchor" href="#背景知识" aria-hidden="true">#</a> 背景知识</h2><p>通讯的发达，使得世界各地交流越来越紧密。许多的软件产品也要面向世界上不同国家的用户。其中，语言障碍显然是产品在不同语种用户中进行推广的一个重要问题。</p><p>本文围绕国际化这一主题，先介绍国际标准的语言编码，然后讲解在 Java 应用中如何去实现国际化。</p><h3 id="语言编码、国家-地区编码" tabindex="-1"><a class="header-anchor" href="#语言编码、国家-地区编码" aria-hidden="true">#</a> 语言编码、国家/地区编码</h3><p>做 web 开发的朋友可能多多少少接触过类似 <strong>zh-cn</strong>, <strong>en-us</strong> 这样的编码字样。</p><p>这些编码是用来表示指定的国家地区的语言类型的。那么，这些含有特殊含义的编码是如何产生的呢？</p>',7),d={href:"http://www.loc.gov/standards/iso639-2/php/English_list.php",target:"_blank",rel:"noopener noreferrer"},r=n("strong",null,"ISO-639",-1),k={href:"https://www.iso.org/obp/ui/#iso:std:iso:3166:-2:ed-3:v1:en,fr",target:"_blank",rel:"noopener noreferrer"},m=n("strong",null,"ISO-3166",-1),v=e(`<p>下表列举了一些常见国家、地区的语言编码：</p><table><thead><tr><th>国家/地区</th><th>语言编码</th><th>国家/地区</th><th>语言编码</th></tr></thead><tbody><tr><td>简体中文(中国)</td><td>zh-cn</td><td>繁体中文(台湾地区)</td><td>zh-tw</td></tr><tr><td>繁体中文(香港)</td><td>zh-hk</td><td>英语(香港)</td><td>en-hk</td></tr><tr><td>英语(美国)</td><td>en-us</td><td>英语(英国)</td><td>en-gb</td></tr><tr><td>英语(全球)</td><td>en-ww</td><td>英语(加拿大)</td><td>en-ca</td></tr><tr><td>英语(澳大利亚)</td><td>en-au</td><td>英语(爱尔兰)</td><td>en-ie</td></tr><tr><td>英语(芬兰)</td><td>en-fi</td><td>芬兰语(芬兰)</td><td>fi-fi</td></tr><tr><td>英语(丹麦)</td><td>en-dk</td><td>丹麦语(丹麦)</td><td>da-dk</td></tr><tr><td>英语(以色列)</td><td>en-il</td><td>希伯来语(以色列)</td><td>he-il</td></tr><tr><td>英语(南非)</td><td>en-za</td><td>英语(印度)</td><td>en-in</td></tr><tr><td>英语(挪威)</td><td>en-no</td><td>英语(新加坡)</td><td>en-sg</td></tr><tr><td>英语(新西兰)</td><td>en-nz</td><td>英语(印度尼西亚)</td><td>en-id</td></tr><tr><td>英语(菲律宾)</td><td>en-ph</td><td>英语(泰国)</td><td>en-th</td></tr><tr><td>英语(马来西亚)</td><td>en-my</td><td>英语(阿拉伯)</td><td>en-xa</td></tr><tr><td>韩文(韩国)</td><td>ko-kr</td><td>日语(日本)</td><td>ja-jp</td></tr><tr><td>荷兰语(荷兰)</td><td>nl-nl</td><td>荷兰语(比利时)</td><td>nl-be</td></tr><tr><td>葡萄牙语(葡萄牙)</td><td>pt-pt</td><td>葡萄牙语(巴西)</td><td>pt-br</td></tr><tr><td>法语(法国)</td><td>fr-fr</td><td>法语(卢森堡)</td><td>fr-lu</td></tr><tr><td>法语(瑞士)</td><td>fr-ch</td><td>法语(比利时)</td><td>fr-be</td></tr><tr><td>法语(加拿大)</td><td>fr-ca</td><td>西班牙语(拉丁美洲)</td><td>es-la</td></tr><tr><td>西班牙语(西班牙)</td><td>es-es</td><td>西班牙语(阿根廷)</td><td>es-ar</td></tr><tr><td>西班牙语(美国)</td><td>es-us</td><td>西班牙语(墨西哥)</td><td>es-mx</td></tr><tr><td>西班牙语(哥伦比亚)</td><td>es-co</td><td>西班牙语(波多黎各)</td><td>es-pr</td></tr><tr><td>德语(德国)</td><td>de-de</td><td>德语(奥地利)</td><td>de-at</td></tr><tr><td>德语(瑞士)</td><td>de-ch</td><td>俄语(俄罗斯)</td><td>ru-ru</td></tr><tr><td>意大利语(意大利)</td><td>it-it</td><td>希腊语(希腊)</td><td>el-gr</td></tr><tr><td>挪威语(挪威)</td><td>no-no</td><td>匈牙利语(匈牙利)</td><td>hu-hu</td></tr><tr><td>土耳其语(土耳其)</td><td>tr-tr</td><td>捷克语(捷克共和国)</td><td>cs-cz</td></tr><tr><td>斯洛文尼亚语</td><td>sl-sl</td><td>波兰语(波兰)</td><td>pl-pl</td></tr><tr><td>瑞典语(瑞典)</td><td>sv-se</td><td></td><td></td></tr></tbody></table><p><strong>注：由表中可以看出语言、国家/地区编码一般都是英文单词的缩写。</strong></p><h3 id="字符编码" tabindex="-1"><a class="header-anchor" href="#字符编码" aria-hidden="true">#</a> 字符编码</h3><p>在此处，引申一下字符编码的概念。</p><p><strong>是不是有了语言、国家/地区编码，计算机就可以识别各种语言了？</strong></p><p>答案是否。作为程序员，相信每个人都会遇到过这样的情况：期望打印中文，结果输出的却是乱码。</p><p>这种情况，往往是因为字符编码的问题。</p><p>计算机在设计之初，并没有考虑多个国家，多种不同语言的应用场景。当时定义一种<code>ASCII</code>码，将字母、数字和其他符号编号用 7 比特的二进制数来表示。后来，计算机在世界开始普及，为了适应多种文字，出现了多种编码格式，例如中文汉字一般使用的编码格式为<code>GB2312</code>、<code>GBK</code>。</p><p>由此，又产生了一个问题，<strong>不同字符编码之间互相无法识别</strong>。于是，为了一统江湖，出现了 <code>unicode</code> 编码。它为每种语言的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台的文本转换需求。</p><p>有人不禁要问，既然 <code>Unicode</code> 可以支持所有语言的字符，那还要其他字符编码做什么？</p><p><code>Unicode</code> 有一个缺点：为了支持所有语言的字符，所以它需要用更多位数去表示，比如 <code>ASCII</code> 表示一个英文字符只需要一个字节，而 <code>Unicode</code> 则需要两个字节。很明显，如果字符数多，这样的效率会很低。</p><p>为了解决这个问题，有出现了一些中间格式的字符编码：如 <code>UTF-8</code>、<code>UTF-16</code>、<code>UTF-32</code> 等（中国的程序员一般使用<strong>UTF-8</strong>编码）。</p><h2 id="java-中实现国际化" tabindex="-1"><a class="header-anchor" href="#java-中实现国际化" aria-hidden="true">#</a> Java 中实现国际化</h2><p>国际化的实现原理很简单：</p><ol><li>先定义好不同语种的模板；</li><li>选择语种；</li><li>加载指定语种的模板。</li></ol><p>接下来，本文会按照步骤逐一讲解实现国际化的具体步骤</p><h3 id="定义不同语种的模板" tabindex="-1"><a class="header-anchor" href="#定义不同语种的模板" aria-hidden="true">#</a> 定义不同语种的模板</h3><p><strong>Java 中将多语言文本存储在格式为 <code>properties</code> 的资源文件中。</strong></p><p>它必须遵照以下的命名规范：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;资源名&gt;_&lt;语言代码&gt;_&lt;国家/地区编码&gt;.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，语言编码和国家/地区编码都是可选的。</p><p>注：<code>&lt;资源名&gt;.properties</code> 命名的国际化资源文件是<strong>默认的资源文件</strong>，即某个国际化类型在系统中找不到对应的资源文件，就采用这个默认的资源文件。</p><h4 id="定义-properties-文件" tabindex="-1"><a class="header-anchor" href="#定义-properties-文件" aria-hidden="true">#</a> 定义 properties 文件</h4><p>在<code>src/main/resources/locales</code> 路径下定义名为 content 的不同语种资源文件：</p><p><strong>content_en_US.properties</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helloWorld = HelloWorld!
time = The current time is %s.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>content_zh_CN.properties</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helloWorld = \\u4e16\\u754c\\uff0c\\u4f60\\u597d\\uff01
time = \\u5f53\\u524d\\u65f6\\u95f4\\u662f\\u0025\\u0073\\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到：几个资源文件中，定义的 Key 完全一致，只是 Value 是对应语言的字符串。</p><p>虽然属性值各不相同，但属性名却是相同的，这样应用程序就可以通过 Locale 对象和属性名精确调用到某个具体的属性值了。</p><h4 id="unicode-转换工具" tabindex="-1"><a class="header-anchor" href="#unicode-转换工具" aria-hidden="true">#</a> Unicode 转换工具</h4><p>上一节中，我们定义的中文资源文件中的属性值都是以\\u 开头的四位 16 进制数。其实，这表示的是一个 Unicode 编码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helloWorld = \\u4e16\\u754c\\uff0c\\u4f60\\u597d\\uff01
time = \\u5f53\\u524d\\u65f6\\u95f4\\u662f\\u0025\\u0073\\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>本文的字符编码中提到了，为了达到跨编码也正常显示的目的，有必要将非 <code>ASCII</code> 字符转为 <code>Unicode</code> 编码。上面的中文资源文件就是中文转为 <code>Unicode</code> 的结果。</p><p>怎么将非 <code>ASCII</code> 字符转为 <code>Unicode</code> 编码呢？</p><p>JDK 在 bin 目录下为我们提供了一个转换工具：<strong>native2ascii</strong>。</p><p>它可以将中文字符的资源文件转换为 <code>Unicode</code> 代码格式的文件，命令格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>native2ascii [-reverse] [-encoding 编码] [输入文件 [输出文件]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设<strong>content_zh_CN.properties</strong> 在 <code>d:\\</code> 目录。执行以下命令可以新建一个名为 <strong>content_zh_CN_new.properties</strong> 的文件，其中的内容就中文字符转为 <code>UTF-8</code> 编码格式的结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>native2ascii -encoding utf-8 d:\\content_zh_CN.properties d:\\content_zh_CN_new.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="选择语种" tabindex="-1"><a class="header-anchor" href="#选择语种" aria-hidden="true">#</a> 选择语种</h3><p>定义了多语言资源文件，第二步就是根据本地语种选择模板文件了。</p><h4 id="locale" tabindex="-1"><a class="header-anchor" href="#locale" aria-hidden="true">#</a> Locale</h4><p>在 Java 中，一个 <code>java.util.Locale</code> 对象表示了特定的地理、政治和文化地区。需要 Locale 来执行其任务的操作称为语言环境敏感的操作，它使用 Locale 为用户量身定制本地信息。</p><p>它有三个构造方法</p><p><code>Locale(String language)</code> ：根据语言编码初始化<br><code>Locale(String language, String country)</code> ：根据语言编码、国家编码初始化<br><code>Locale(String language, String country, String variant)</code> ：根据语言编码、国家编码、变体初始化</p><p>此外，Locale 定义了一些常用的 Locale 常量：<code>Locale.ENGLISH</code>、<code>Locale.CHINESE</code> 等。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 初始化一个通用英语的locale.</span>
<span class="token class-name">Locale</span> locale1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 初始化一个加拿大英语的locale.</span>
<span class="token class-name">Locale</span> locale2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 初始化一个美式英语变种硅谷英语的locale</span>
<span class="token class-name">Locale</span> locale3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;US&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SiliconValley&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 根据Locale常量初始化一个简体中文</span>
<span class="token class-name">Locale</span> locale4 <span class="token operator">=</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加载指定语种的模板" tabindex="-1"><a class="header-anchor" href="#加载指定语种的模板" aria-hidden="true">#</a> 加载指定语种的模板</h3><h4 id="resourceboundle" tabindex="-1"><a class="header-anchor" href="#resourceboundle" aria-hidden="true">#</a> ResourceBoundle</h4><p>Java 为我们提供了用于加载国际化资源文件的工具类：<code>java.util.ResourceBoundle</code>。</p><p><code>ResourceBoundle</code> 提供了多个名为 <code>getBundle</code> 的静态重载方法，这些方法的作用是用来根据资源名、Locale 选择指定语种的资源文件。需要说明的是： <code>getBundle</code> 方法的第一个参数一般都是<code>baseName</code> ，这个参数表示资源文件名。</p><p><code>ResourceBoundle</code> 还提供了名为 <code>getString</code> 的方法，用来获取资源文件中 key 对应的 value。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Locale</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ResourceBundle</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResourceBundleDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据语言+地区编码初始化</span>
        <span class="token class-name">ResourceBundle</span> rbUS <span class="token operator">=</span> <span class="token class-name">ResourceBundle</span><span class="token punctuation">.</span><span class="token function">getBundle</span><span class="token punctuation">(</span><span class="token string">&quot;locales.content&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Locale</span><span class="token punctuation">(</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;US&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 根据Locale常量初始化</span>
        <span class="token class-name">ResourceBundle</span> rbZhCN <span class="token operator">=</span> <span class="token class-name">ResourceBundle</span><span class="token punctuation">.</span><span class="token function">getBundle</span><span class="token punctuation">(</span><span class="token string">&quot;locales.content&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取本地系统默认的Locale初始化</span>
        <span class="token class-name">ResourceBundle</span> rbDefault <span class="token operator">=</span> <span class="token class-name">ResourceBundle</span><span class="token punctuation">.</span><span class="token function">getBundle</span><span class="token punctuation">(</span><span class="token string">&quot;locales.content&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ResourceBundle rbDefault =ResourceBundle.getBundle(&quot;locales.content&quot;, Locale.getDefault()); // 与上行代码等价</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;en-US:&quot;</span> <span class="token operator">+</span> rbUS<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;helloWorld&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;en-US:&quot;</span> <span class="token operator">+</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>rbUS<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;time&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;08:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;zh-CN：&quot;</span> <span class="token operator">+</span> rbZhCN<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;helloWorld&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;zh-CN：&quot;</span> <span class="token operator">+</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>rbZhCN<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;time&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;08:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;default：&quot;</span> <span class="token operator">+</span> rbDefault<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;helloWorld&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;default：&quot;</span> <span class="token operator">+</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>rbDefault<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;time&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;08:00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// en-US:HelloWorld!</span>
<span class="token comment">// en-US:The current time is 08:00.</span>
<span class="token comment">// zh-CN：世界，你好！</span>
<span class="token comment">// zh-CN：当前时间是08:00。</span>
<span class="token comment">// default：世界，你好！</span>
<span class="token comment">// default：当前时间是08:00。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：在加载资源时，如果指定的国际化资源文件不存在，它会尝试按下面的顺序加载其他的资源：本地系统默认国际化对象对应的资源 -&gt; 默认的资源。如果指定错误，Java 会提示找不到资源文件。</p><h2 id="支持国际化的工具类" tabindex="-1"><a class="header-anchor" href="#支持国际化的工具类" aria-hidden="true">#</a> 支持国际化的工具类</h2><p>Java 中也提供了几个支持国际化的格式化工具类。例如：<code>NumberFormat</code>、<code>DateFormat</code>、<code>MessageFormat</code></p><h3 id="numberformat" tabindex="-1"><a class="header-anchor" href="#numberformat" aria-hidden="true">#</a> NumberFormat</h3><p><code>NumberFormat</code> 是所有数字格式类的基类。它提供格式化和解析数字的接口。它也提供了决定数字所属语言类型的方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>text<span class="token punctuation">.</span></span><span class="token class-name">NumberFormat</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Locale</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NumberFormatDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> num <span class="token operator">=</span> <span class="token number">123456.78</span><span class="token punctuation">;</span>
        <span class="token class-name">NumberFormat</span> format <span class="token operator">=</span> <span class="token class-name">NumberFormat</span><span class="token punctuation">.</span><span class="token function">getCurrencyInstance</span><span class="token punctuation">(</span><span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%f 的国际化（%s）结果: %s\\n&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">,</span> format<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// 123456.780000 的国际化（zh_CN）结果: ￥123,456.78</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dateformat" tabindex="-1"><a class="header-anchor" href="#dateformat" aria-hidden="true">#</a> DateFormat</h3><p><code>DateFormat</code> 是日期、时间格式化类的抽象类。它支持基于语言习惯的日期、时间格式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>text<span class="token punctuation">.</span></span><span class="token class-name">DateFormat</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Locale</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DateFormatDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Date</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DateFormat</span> df <span class="token operator">=</span> <span class="token class-name">DateFormat</span><span class="token punctuation">.</span><span class="token function">getDateInstance</span><span class="token punctuation">(</span><span class="token class-name">DateFormat</span><span class="token punctuation">.</span><span class="token constant">MEDIUM</span><span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">ENGLISH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DateFormat</span> df2 <span class="token operator">=</span> <span class="token class-name">DateFormat</span><span class="token punctuation">.</span><span class="token function">getDateInstance</span><span class="token punctuation">(</span><span class="token class-name">DateFormat</span><span class="token punctuation">.</span><span class="token constant">MEDIUM</span><span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s 的国际化（%s）结果: %s\\n&quot;</span><span class="token punctuation">,</span> date<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">ENGLISH</span><span class="token punctuation">,</span> df<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s 的国际化（%s）结果: %s\\n&quot;</span><span class="token punctuation">,</span> date<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">SIMPLIFIED_CHINESE</span><span class="token punctuation">,</span> df2<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 输出</span>
<span class="token comment">// Fri Dec 23 11:14:45 CST 2022 的国际化（en）结果: Dec 23, 2022</span>
<span class="token comment">// Fri Dec 23 11:14:45 CST 2022 的国际化（zh_CN）结果: 2022-12-23</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="messageformat" tabindex="-1"><a class="header-anchor" href="#messageformat" aria-hidden="true">#</a> MessageFormat</h3><p><code>Messageformat</code> 提供一种与语言无关的拼接消息的方式。通过这种拼接方式，将最终呈现返回给使用者。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>text<span class="token punctuation">.</span></span><span class="token class-name">MessageFormat</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">GregorianCalendar</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Locale</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageFormatDemo</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> pattern1 <span class="token operator">=</span> <span class="token string">&quot;{0}，你好！你于 {1} 消费 {2} 元。&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> pattern2 <span class="token operator">=</span> <span class="token string">&quot;At {1,time,short} On {1,date,long}，{0} paid {2,number, currency}.&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> params <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;Jack&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">GregorianCalendar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">8888</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> msg1 <span class="token operator">=</span> <span class="token class-name">MessageFormat</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>pattern1<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MessageFormat</span> mf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MessageFormat</span><span class="token punctuation">(</span>pattern2<span class="token punctuation">,</span> <span class="token class-name">Locale</span><span class="token punctuation">.</span><span class="token constant">US</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> msg2 <span class="token operator">=</span> mf<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>msg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 输出：</span>
<span class="token comment">// Jack，你好！你于 22-12-23 上午11:05 消费 8,888 元。</span>
<span class="token comment">// At 11:05 AM On December 23, 2022，Jack paid $8,888.00.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,67);function b(g,h){const s=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[n("a",d,[r,a(s)]),t(" 标准使用编码定义了国际上常见的语言，每一种语言由两个小写字母表示。")]),n("p",null,[n("a",k,[m,a(s)]),t(" 标准使用编码定义了国家/地区，每个国家/地区由两个大写字母表示。")]),v])}const q=p(i,[["render",b],["__file","index.html.vue"]]);export{q as default};