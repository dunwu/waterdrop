const n=JSON.parse('{"key":"v-7472a656","path":"/pages/33a820/","title":"深入理解 Java 泛型","lang":"zh-CN","frontmatter":{"title":"深入理解 Java 泛型","date":"2020-10-17T19:13:25.000Z","order":"09","permalink":"/pages/33a820/","category":["Java","JavaSE","基础特性"],"tag":["Java","JavaSE","泛型"],"description":"深入理解 Java 泛型 什么是泛型 Java 泛型（generics）是 JDK 5 中引入的特性。 为什么要引入泛型机制呢？ 回答这个问题前，先让我们来看一个示例。 public class NoGenericsDemo { public static void main(String[] args) { List list = new ArrayList&lt;&gt;(); list.add(\\"abc\\"); list.add(18); list.add(new double[] {1.0, 2.0}); Object obj1 = list.get(0); Object obj2 = list.get(1); Object obj3 = list.get(2); System.out.println(\\"obj1 = [\\" + obj1 + \\"]\\"); System.out.println(\\"obj2 = [\\" + obj2 + \\"]\\"); System.out.println(\\"obj3 = [\\" + obj3 + \\"]\\"); int num1 = (int)list.get(0); int num2 = (int)list.get(1); int num3 = (int)list.get(2); System.out.println(\\"num1 = [\\" + num1 + \\"]\\"); System.out.println(\\"num2 = [\\" + num2 + \\"]\\"); System.out.println(\\"num3 = [\\" + num3 + \\"]\\"); } } // Output: // obj1 = [abc] // obj2 = [18] // obj3 = [[D@47089e5f] // Exception in thread \\"main\\" java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer // at io.github.dunwu.javacore.generics.NoGenericsDemo.main(NoGenericsDemo.java:23)","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/33a820/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"深入理解 Java 泛型"}],["meta",{"property":"og:description","content":"深入理解 Java 泛型 什么是泛型 Java 泛型（generics）是 JDK 5 中引入的特性。 为什么要引入泛型机制呢？ 回答这个问题前，先让我们来看一个示例。 public class NoGenericsDemo { public static void main(String[] args) { List list = new ArrayList&lt;&gt;(); list.add(\\"abc\\"); list.add(18); list.add(new double[] {1.0, 2.0}); Object obj1 = list.get(0); Object obj2 = list.get(1); Object obj3 = list.get(2); System.out.println(\\"obj1 = [\\" + obj1 + \\"]\\"); System.out.println(\\"obj2 = [\\" + obj2 + \\"]\\"); System.out.println(\\"obj3 = [\\" + obj3 + \\"]\\"); int num1 = (int)list.get(0); int num2 = (int)list.get(1); int num3 = (int)list.get(2); System.out.println(\\"num1 = [\\" + num1 + \\"]\\"); System.out.println(\\"num2 = [\\" + num2 + \\"]\\"); System.out.println(\\"num3 = [\\" + num3 + \\"]\\"); } } // Output: // obj1 = [abc] // obj2 = [18] // obj3 = [[D@47089e5f] // Exception in thread \\"main\\" java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer // at io.github.dunwu.javacore.generics.NoGenericsDemo.main(NoGenericsDemo.java:23)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-25T23:14:52.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaSE"}],["meta",{"property":"article:tag","content":"泛型"}],["meta",{"property":"article:published_time","content":"2020-10-17T19:13:25.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-25T23:14:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入理解 Java 泛型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-10-17T19:13:25.000Z\\",\\"dateModified\\":\\"2023-10-25T23:14:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"什么是泛型","slug":"什么是泛型","link":"#什么是泛型","children":[]},{"level":2,"title":"泛型声明","slug":"泛型声明","link":"#泛型声明","children":[{"level":3,"title":"泛型类","slug":"泛型类","link":"#泛型类","children":[]},{"level":3,"title":"泛型接口","slug":"泛型接口","link":"#泛型接口","children":[]},{"level":3,"title":"泛型方法","slug":"泛型方法","link":"#泛型方法","children":[]}]},{"level":2,"title":"泛型要点","slug":"泛型要点","link":"#泛型要点","children":[{"level":3,"title":"类型擦除","slug":"类型擦除","link":"#类型擦除","children":[]},{"level":3,"title":"泛型和继承","slug":"泛型和继承","link":"#泛型和继承","children":[]},{"level":3,"title":"类型边界","slug":"类型边界","link":"#类型边界","children":[]}]},{"level":2,"title":"类型通配符","slug":"类型通配符","link":"#类型通配符","children":[{"level":3,"title":"上界通配符","slug":"上界通配符","link":"#上界通配符","children":[]},{"level":3,"title":"下界通配符","slug":"下界通配符","link":"#下界通配符","children":[]},{"level":3,"title":"无界通配符","slug":"无界通配符","link":"#无界通配符","children":[]},{"level":3,"title":"通配符和向上转型","slug":"通配符和向上转型","link":"#通配符和向上转型","children":[]}]},{"level":2,"title":"泛型的约束","slug":"泛型的约束","link":"#泛型的约束","children":[]},{"level":2,"title":"泛型最佳实践","slug":"泛型最佳实践","link":"#泛型最佳实践","children":[{"level":3,"title":"泛型命名","slug":"泛型命名","link":"#泛型命名","children":[]},{"level":3,"title":"使用泛型的建议","slug":"使用泛型的建议","link":"#使用泛型的建议","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1655247928000,"updatedTime":1698275692000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":4}]},"readingTime":{"minutes":12.3,"words":3691},"filePathRelative":"01.Java/01.JavaSE/01.基础特性/09.Java泛型.md","localizedDate":"2020年10月17日","excerpt":"<h1> 深入理解 Java 泛型</h1>\\n<h2> 什么是泛型</h2>\\n<p><strong>Java 泛型（generics）是 JDK 5 中引入的特性</strong>。</p>\\n<p>为什么要引入泛型机制呢？</p>\\n<p>回答这个问题前，先让我们来看一个示例。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">NoGenericsDemo</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> args<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">List</span> list <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"abc\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">18</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token keyword\\">double</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token punctuation\\">{</span><span class=\\"token number\\">1.0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2.0</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Object</span> obj1 <span class=\\"token operator\\">=</span> list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Object</span> obj2 <span class=\\"token operator\\">=</span> list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Object</span> obj3 <span class=\\"token operator\\">=</span> list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"obj1 = [\\"</span> <span class=\\"token operator\\">+</span> obj1 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"obj2 = [\\"</span> <span class=\\"token operator\\">+</span> obj2 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"obj3 = [\\"</span> <span class=\\"token operator\\">+</span> obj3 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token keyword\\">int</span> num1 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span>list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> num2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span>list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">int</span> num3 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span>list<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"num1 = [\\"</span> <span class=\\"token operator\\">+</span> num1 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"num2 = [\\"</span> <span class=\\"token operator\\">+</span> num2 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">System</span><span class=\\"token punctuation\\">.</span>out<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"num3 = [\\"</span> <span class=\\"token operator\\">+</span> num3 <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\\"]\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token comment\\">// Output:</span>\\n<span class=\\"token comment\\">// obj1 = [abc]</span>\\n<span class=\\"token comment\\">// obj2 = [18]</span>\\n<span class=\\"token comment\\">// obj3 = [[D@47089e5f]</span>\\n<span class=\\"token comment\\">// Exception in thread \\"main\\" java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Integer</span>\\n<span class=\\"token comment\\">// at io.github.dunwu.javacore.generics.NoGenericsDemo.main(NoGenericsDemo.java:23)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};