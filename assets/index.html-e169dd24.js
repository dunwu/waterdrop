const a=JSON.parse('{"key":"v-25c334c1","path":"/pages/2d948841/","title":"Java 基础语法特性","lang":"zh-CN","frontmatter":{"title":"Java 基础语法特性","date":"2022-01-25T07:31:16.000Z","order":1,"permalink":"/pages/2d948841/","category":["Java","JavaCore","基础特性"],"tag":["Java","JavaCore"],"description":"Java 基础语法特性 注释 空白行，或者注释的内容，都会被 Java 编译器忽略掉。 Java 支持多种注释方式，下面的示例展示了各种注释的使用方式： public class HelloWorld { /* * JavaDoc 注释 */ public static void main(String[] args) { // 单行注释 /* 多行注释： 1. 注意点a 2. 注意点b */ System.out.println(\\"Hello World\\"); } }","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/2d948841/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Java 基础语法特性"}],["meta",{"property":"og:description","content":"Java 基础语法特性 注释 空白行，或者注释的内容，都会被 Java 编译器忽略掉。 Java 支持多种注释方式，下面的示例展示了各种注释的使用方式： public class HelloWorld { /* * JavaDoc 注释 */ public static void main(String[] args) { // 单行注释 /* 多行注释： 1. 注意点a 2. 注意点b */ System.out.println(\\"Hello World\\"); } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-21T14:22:38.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaCore"}],["meta",{"property":"article:published_time","content":"2022-01-25T07:31:16.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-21T14:22:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 基础语法特性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-25T07:31:16.000Z\\",\\"dateModified\\":\\"2024-09-21T14:22:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"注释","slug":"注释","link":"#注释","children":[]},{"level":2,"title":"基本数据类型","slug":"基本数据类型","link":"#基本数据类型","children":[]},{"level":2,"title":"变量和常量","slug":"变量和常量","link":"#变量和常量","children":[]},{"level":2,"title":"数组","slug":"数组","link":"#数组","children":[]},{"level":2,"title":"枚举","slug":"枚举","link":"#枚举","children":[]},{"level":2,"title":"操作符","slug":"操作符","link":"#操作符","children":[]},{"level":2,"title":"方法","slug":"方法","link":"#方法","children":[]},{"level":2,"title":"控制语句","slug":"控制语句","link":"#控制语句","children":[]},{"level":2,"title":"异常","slug":"异常","link":"#异常","children":[]},{"level":2,"title":"泛型","slug":"泛型","link":"#泛型","children":[]},{"level":2,"title":"反射","slug":"反射","link":"#反射","children":[]},{"level":2,"title":"注解","slug":"注解","link":"#注解","children":[]},{"level":2,"title":"序列化","slug":"序列化","link":"#序列化","children":[]}],"git":{"createdTime":1726928558000,"updatedTime":1726928558000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":4.15,"words":1244},"filePathRelative":"01.Java/01.JavaCore/01.基础特性/Java基础语法.md","localizedDate":"2022年1月25日","excerpt":"<h1> Java 基础语法特性</h1>\\n<h2> 注释</h2>\\n<p>空白行，或者注释的内容，都会被 Java 编译器忽略掉。</p>\\n<p>Java 支持多种注释方式，下面的示例展示了各种注释的使用方式：</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">HelloWorld</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">/*\\n     * JavaDoc 注释\\n     */</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// 单行注释</span>\\n        <span class=\\"token comment\\">/* 多行注释：\\n           1. 注意点a\\n           2. 注意点b\\n         */</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Hello World\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{a as data};