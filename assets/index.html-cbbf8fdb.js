const e=JSON.parse('{"key":"v-74fa8ad4","path":"/pages/56a038ac/","title":"Java 并发之无锁","lang":"zh-CN","frontmatter":{"title":"Java 并发之无锁","date":"2019-12-25T22:19:09.000Z","permalink":"/pages/56a038ac/","category":["Java","JavaCore","并发"],"tag":["Java","JavaCore","并发","CAS","原子类","ThreadLocal","Immutability","Copy-on-Write"],"description":"Java 并发之无锁 并发安全需要保证几个基本特性： 可见性 - 是一个线程修改了某个共享变量，其状态能够立即被其他线程知晓，通常被解释为将线程本地状态反映到主内存上，volatile 就是负责保证可见性的。 有序性 - 是保证线程内串行语义，避免指令重排等。 原子性 - 简单说就是相关操作不会中途被其他线程干扰，一般通过互斥机制（加锁：sychronized、Lock）实现。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/56a038ac/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Java 并发之无锁"}],["meta",{"property":"og:description","content":"Java 并发之无锁 并发安全需要保证几个基本特性： 可见性 - 是一个线程修改了某个共享变量，其状态能够立即被其他线程知晓，通常被解释为将线程本地状态反映到主内存上，volatile 就是负责保证可见性的。 有序性 - 是保证线程内串行语义，避免指令重排等。 原子性 - 简单说就是相关操作不会中途被其他线程干扰，一般通过互斥机制（加锁：sychronized、Lock）实现。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-10T23:22:13.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JavaCore"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:tag","content":"CAS"}],["meta",{"property":"article:tag","content":"原子类"}],["meta",{"property":"article:tag","content":"ThreadLocal"}],["meta",{"property":"article:tag","content":"Immutability"}],["meta",{"property":"article:tag","content":"Copy-on-Write"}],["meta",{"property":"article:published_time","content":"2019-12-25T22:19:09.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-10T23:22:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 并发之无锁\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-12-25T22:19:09.000Z\\",\\"dateModified\\":\\"2024-09-10T23:22:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"CAS","slug":"cas","link":"#cas","children":[{"level":3,"title":"CAS 的要点","slug":"cas-的要点","link":"#cas-的要点","children":[]},{"level":3,"title":"CAS 的应用","slug":"cas-的应用","link":"#cas-的应用","children":[]},{"level":3,"title":"CAS 的原理","slug":"cas-的原理","link":"#cas-的原理","children":[]},{"level":3,"title":"CAS 的问题","slug":"cas-的问题","link":"#cas-的问题","children":[]}]},{"level":2,"title":"原子类","slug":"原子类-1","link":"#原子类-1","children":[{"level":3,"title":"原子类简介","slug":"原子类简介","link":"#原子类简介","children":[]},{"level":3,"title":"原子类之基本数据类型","slug":"原子类之基本数据类型","link":"#原子类之基本数据类型","children":[]},{"level":3,"title":"原子类之引用数据类型","slug":"原子类之引用数据类型","link":"#原子类之引用数据类型","children":[]},{"level":3,"title":"原子类之数组数据类型","slug":"原子类之数组数据类型","link":"#原子类之数组数据类型","children":[]},{"level":3,"title":"原子类之属性更新器","slug":"原子类之属性更新器","link":"#原子类之属性更新器","children":[]},{"level":3,"title":"原子类之累加器","slug":"原子类之累加器","link":"#原子类之累加器","children":[]}]},{"level":2,"title":"ThreadLocal","slug":"threadlocal","link":"#threadlocal","children":[{"level":3,"title":"ThreadLocal 的应用","slug":"threadlocal-的应用","link":"#threadlocal-的应用","children":[]},{"level":3,"title":"ThreadLocal 的原理","slug":"threadlocal-的原理","link":"#threadlocal-的原理","children":[]},{"level":3,"title":"ThreadLocal 的误区","slug":"threadlocal-的误区","link":"#threadlocal-的误区","children":[]},{"level":3,"title":"InheritableThreadLocal","slug":"inheritablethreadlocal","link":"#inheritablethreadlocal","children":[]}]},{"level":2,"title":"Immutability 模式","slug":"immutability-模式","link":"#immutability-模式","children":[{"level":3,"title":"快速实现具备不可变性的类","slug":"快速实现具备不可变性的类","link":"#快速实现具备不可变性的类","children":[]},{"level":3,"title":"使用 Immutability 模式的注意事项","slug":"使用-immutability-模式的注意事项","link":"#使用-immutability-模式的注意事项","children":[]}]},{"level":2,"title":"Copy-on-Write 模式","slug":"copy-on-write-模式","link":"#copy-on-write-模式","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1726010533000,"updatedTime":1726010533000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":28.96,"words":8687},"filePathRelative":"01.Java/01.JavaCore/05.并发/Java并发之无锁.md","localizedDate":"2019年12月25日","excerpt":"<h1> Java 并发之无锁</h1>\\n<p>并发安全需要保证几个基本特性：</p>\\n<ul>\\n<li><strong>可见性</strong> - 是一个线程修改了某个共享变量，其状态能够立即被其他线程知晓，通常被解释为将线程本地状态反映到主内存上，<code>volatile</code> 就是负责保证可见性的。</li>\\n<li><strong>有序性</strong> - 是保证线程内串行语义，避免指令重排等。</li>\\n<li><strong>原子性</strong> - 简单说就是相关操作不会中途被其他线程干扰，一般通过互斥机制（加锁：<code>sychronized</code>、<code>Lock</code>）实现。</li>\\n</ul>","autoDesc":true}');export{e as data};