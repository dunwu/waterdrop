import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as r,c as n,a as l,b as e,d as a,e as u}from"./app-4c198a3a.js";const c={},s=u('<h1 id="java-编程规范" tabindex="-1"><a class="header-anchor" href="#java-编程规范" aria-hidden="true">#</a> Java 编程规范</h1><blockquote><p>编程规范就是 Java 开发的最佳实践。帮助开发人员少走弯路。</p></blockquote><h2 id="effective-java" tabindex="-1"><a class="header-anchor" href="#effective-java" aria-hidden="true">#</a> Effective Java</h2><ul><li>第 2 章 创建、销毁对象 <ul><li>第 1 条：考虑用静态工厂方法代替构造器</li><li>第 2 条：遇到多个构造器参数时要考虑用构建器</li><li>第 3 条：用私有构造器或者枚举类型强化 Singleton 属性</li><li>第 4 条：通过私有构造器强化不可实例化的能力</li><li>第 5 条：避免创建不必要的对象</li><li>第 6 条：消除过期的对象引用</li><li>第 7 条：避免使用终结方法</li></ul></li><li>第 3 章 对于所有对象都通用的方法 <ul><li>第 8 条：覆盖 equals 时请遵守通用约定</li><li>第 9 条：覆盖 equals 时总要覆盖 hashCode</li><li>第 10 条：始终要覆盖 toString</li><li>第 11 条：谨慎地覆盖 clone</li><li>第 12 条：考虑实现 Comparable 接口</li></ul></li><li>第 4 章 类和接口 <ul><li>第 13 条：使类和成员的可访问性最小化</li><li>第 14 条：在公有类中使用访问方法而非公有域</li><li>第 15 条：使可变性最小化</li><li>第 16 条：复合优先于继承</li><li>第 17 条：要么为继承而设计，并提供文档说明，要么就禁止继承</li><li>第 18 条：接口优于抽象类</li><li>第 19 条：接口只用于定义类型</li><li>第 20 条：类层次优于标签类</li><li>第 21 条：用函数对象表示策略</li><li>第 22 条：优先考虑静态成员类</li></ul></li><li>第 5 章 泛型 <ul><li>第 23 条：请不要在新代码中使用原生态类型</li><li>第 24 条：消除非受检警告</li><li>第 25 条：列表优先于数组</li><li>第 26 条：优先考虑泛型</li><li>第 27 条：优先考虑泛型方法</li><li>第 28 条：利用有限制通配符来提升 API 的灵活性</li><li>第 29 条：优先考虑类型安全的异构容器</li></ul></li><li>第 6 章 枚举和注解 <ul><li>第 30 条：用 enum 代替 int 常量</li><li>第 31 条：用实例域代替序数</li><li>第 32 条：用 EnumSet 代替位域</li><li>第 33 条：用 EnumMap 代替序数索引</li><li>第 34 条：用接口模拟可伸缩的枚举</li><li>第 35 条：注解优先于命名模式</li><li>第 36 条：坚持使用 Override 注解</li><li>第 37 条：用标记接口定义类型</li></ul></li><li>第 7 章 方法 <ul><li>第 38 条：检查参数的有效性</li><li>第 39 条：必要时进行保护性拷贝</li><li>第 40 条：谨慎设计方法签名</li><li>第 41 条：慎用重载</li><li>第 42 条：慎用可变参数</li><li>第 43 条：返回零长度的数组或者集合，而不是：null</li><li>第 44 条：为所有导出的 API 元素编写文档注释</li></ul></li><li>第 8 章 通用程序设计 <ul><li>第 45 条：将局部变量的作用域最小化</li><li>第 46 条：for-each 循环优先于传统的 for 循环</li><li>第 47 条：了解和使用类库</li><li>第 48 条：如果需要精确的答案，请避免使用 float 和 double</li><li>第 49 条：基本类型优先于装箱基本类型</li><li>第 50 条：如果其他类型更适合，则尽量避免使用字符串</li><li>第 51 条：当心字符串连接的性能</li><li>第 52 条：通过接口引用对象</li><li>第 53 条：接口优先于反射机制</li><li>第 54 条：谨慎地使用本地方法</li><li>第 55 条：谨慎地进行优化</li><li>第 56 条：遵守普遍接受的命名惯例</li></ul></li><li>第 9 章 异常 <ul><li>第 57 条：只针对异常的情况才使用异常</li><li>第 58 条：对可恢复的情况使用受检异常，对编程错误使用运行时异常</li><li>第 59 条：避免不必要地使用受检的异常</li><li>第 60 条：优先使用标准的异常</li><li>第 61 条：抛出与抽象相对应的异常</li><li>第 62 条：每个方法抛出的异常都要有文档</li><li>第 63 条：在细节消息中包含能捕获失败的信息</li><li>第 64 条：努力使失败保持原子性</li><li>第 65 条：不要忽略异常</li></ul></li><li>第 10 章 并发 <ul><li>第 66 条：同步访问共享的可变数据</li><li>第 67 条：避免过度同步</li><li>第 68 条：executor 和 task 优先干线程</li><li>第 69 条：并发工具优先于 wait 和 notify</li><li>第 70 条：线程安全性的文档化</li><li>第 71 条：慎用延迟初始化</li><li>第 72 条：不要依赖于线程调度器</li><li>第 73 条：避免使用线程组</li></ul></li><li>第 11 章 序列化 <ul><li>第 74 条：谨慎地实现 Serializable 接口</li><li>第 75 条：考虑使用自定义的序列化形式</li><li>第 76 条：保护性地编写 readObject 方法</li><li>第 77 条：对于实例控制，枚举类型优先于 readResolve</li><li>第 78 条：考虑用序列化代理代替序列化实例</li></ul></li></ul><h2 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h2>',5),d={href:"https://book.douban.com/subject/3360807/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/alibaba/p3c/blob/master/%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C%EF%BC%88%E8%AF%A6%E5%B0%BD%E7%89%88%EF%BC%89.pdf",target:"_blank",rel:"noopener noreferrer"},f={href:"https://google.github.io/styleguide/javaguide.html",target:"_blank",rel:"noopener noreferrer"};function _(b,v){const i=o("ExternalLinkIcon");return r(),n("div",null,[s,l("ul",null,[l("li",null,[l("a",d,[e("Effective Java"),a(i)])]),l("li",null,[l("a",h,[e("阿里巴巴 Java 开发手册"),a(i)])]),l("li",null,[l("a",f,[e("Google Java 编程指南"),a(i)])])])])}const m=t(c,[["render",_],["__file","index.html.vue"]]);export{m as default};