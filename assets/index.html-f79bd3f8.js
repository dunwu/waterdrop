const e=JSON.parse('{"key":"v-b61b108e","path":"/pages/587898a0/","title":"Java 虚拟机之垃圾收集","lang":"zh-CN","frontmatter":{"title":"Java 虚拟机之垃圾收集","date":"2020-06-07T09:21:16.000Z","order":3,"permalink":"/pages/587898a0/","category":["Java","JavaCore","JVM"],"tag":["Java","JavaCore","JVM","GC"],"description":"Java 虚拟机之垃圾收集 程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后也会消失，因此不需要对这三个区域进行垃圾回收。垃圾回收主要是针对 Java 堆和方法区进行。 对象是否回收 引用计数算法 引用计数算法（Reference Counting）的原理是：在对象中添加一个引用计数器，每当有一个地方 引用它时，计数器值就加一；当引用失效时，计数器值就减一；任何时刻计数器为零的对象就是不可能再被使用的。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/587898a0/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Java 虚拟机之垃圾收集"}],["meta",{"property":"og:description","content":"Java 虚拟机之垃圾收集 程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后也会消失，因此不需要对这三个区域进行垃圾回收。垃圾回收主要是针对 Java 堆和方法区进行。 对象是否回收 引用计数算法 引用计数算法（Reference Counting）的原理是：在对象中添加一个引用计数器，每当有一个地方 引用它时，计数器值就加一；当引用失效时，计数器值就减一；任何时刻计数器为零的对象就是不可能再被使用的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-20T14:31:13.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaCore"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"GC"}],["meta",{"property":"article:published_time","content":"2020-06-07T09:21:16.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-20T14:31:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 虚拟机之垃圾收集\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-07T09:21:16.000Z\\",\\"dateModified\\":\\"2024-08-20T14:31:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"对象是否回收","slug":"对象是否回收","link":"#对象是否回收","children":[{"level":3,"title":"引用计数算法","slug":"引用计数算法","link":"#引用计数算法","children":[]},{"level":3,"title":"可达性分析算法","slug":"可达性分析算法","link":"#可达性分析算法","children":[]},{"level":3,"title":"引用类型","slug":"引用类型","link":"#引用类型","children":[]},{"level":3,"title":"方法区的回收","slug":"方法区的回收","link":"#方法区的回收","children":[]},{"level":3,"title":"finalize()","slug":"finalize","link":"#finalize","children":[]}]},{"level":2,"title":"垃圾收集算法","slug":"垃圾收集算法","link":"#垃圾收集算法","children":[{"level":3,"title":"垃圾收集性能","slug":"垃圾收集性能","link":"#垃圾收集性能","children":[]},{"level":3,"title":"标记 - 清除（Mark-Sweep）","slug":"标记-清除-mark-sweep","link":"#标记-清除-mark-sweep","children":[]},{"level":3,"title":"标记 - 整理（Mark-Compact）","slug":"标记-整理-mark-compact","link":"#标记-整理-mark-compact","children":[]},{"level":3,"title":"标记 - 复制（Copying）","slug":"标记-复制-copying","link":"#标记-复制-copying","children":[]},{"level":3,"title":"分代收集","slug":"分代收集","link":"#分代收集","children":[]}]},{"level":2,"title":"垃圾收集器","slug":"垃圾收集器","link":"#垃圾收集器","children":[{"level":3,"title":"串行收集器","slug":"串行收集器","link":"#串行收集器","children":[]},{"level":3,"title":"并行收集器","slug":"并行收集器","link":"#并行收集器","children":[]},{"level":3,"title":"并发标记清除收集器","slug":"并发标记清除收集器","link":"#并发标记清除收集器","children":[]},{"level":3,"title":"G1 收集器","slug":"g1-收集器","link":"#g1-收集器","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]},{"level":2,"title":"内存分配与回收策略","slug":"内存分配与回收策略","link":"#内存分配与回收策略","children":[{"level":3,"title":"Minor GC","slug":"minor-gc","link":"#minor-gc","children":[]},{"level":3,"title":"Full GC","slug":"full-gc","link":"#full-gc","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1724112553000,"updatedTime":1724164273000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":30.56,"words":9168},"filePathRelative":"01.Java/01.JavaCore/06.JVM/Java虚拟机之垃圾收集.md","localizedDate":"2020年6月7日","excerpt":"<h1> Java 虚拟机之垃圾收集</h1>\\n<blockquote>\\n<p>程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后也会消失，因此不需要对这三个区域进行垃圾回收。<strong>垃圾回收主要是针对 Java 堆和方法区进行</strong>。</p>\\n</blockquote>\\n<h2> 对象是否回收</h2>\\n<h3> 引用计数算法</h3>\\n<p>引用计数算法（Reference Counting）的原理是：在对象中添加一个引用计数器，每当有一个地方 引用它时，计数器值就加一；当引用失效时，计数器值就减一；任何时刻计数器为零的对象就是不可能再被使用的。</p>","autoDesc":true}');export{e as data};