const t=JSON.parse('{"key":"v-d5bda658","path":"/pages/26e4a88e/","title":"Spring 注解","lang":"zh-CN","frontmatter":{"title":"Spring 注解","date":"2022-12-23T09:08:15.000Z","order":28,"permalink":"/pages/26e4a88e/","category":["Java","框架","Spring","Spring核心"],"tag":["Java","框架","Spring"],"description":"Spring 注解 Spring 注解驱动编程发展历程 注解驱动启蒙时代：Spring Framework 1.x 注解驱动过渡时代：Spring Framework 2.x 注解驱动黄金时代：Spring Framework 3.x 注解驱动完善时代：Spring Framework 4.x 注解驱动当下时代：Spring Framework 5.x Spring 核心注解场景分类 Spring 模式注解 Spring 注解 场景说明 起始版本 @Repository 数据仓储模式注解 2.0 @Component 通用组件模式注解 2.5 @Service 服务模式注解 2.5 @Controller Web 控制器模式注解 2.5 @Configuration 配置类模式注解 3.0","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/26e4a88e/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Spring 注解"}],["meta",{"property":"og:description","content":"Spring 注解 Spring 注解驱动编程发展历程 注解驱动启蒙时代：Spring Framework 1.x 注解驱动过渡时代：Spring Framework 2.x 注解驱动黄金时代：Spring Framework 3.x 注解驱动完善时代：Spring Framework 4.x 注解驱动当下时代：Spring Framework 5.x Spring 核心注解场景分类 Spring 模式注解 Spring 注解 场景说明 起始版本 @Repository 数据仓储模式注解 2.0 @Component 通用组件模式注解 2.5 @Service 服务模式注解 2.5 @Controller Web 控制器模式注解 2.5 @Configuration 配置类模式注解 3.0"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"框架"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2022-12-23T09:08:15.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring 注解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-23T09:08:15.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"Spring 注解驱动编程发展历程","slug":"spring-注解驱动编程发展历程","link":"#spring-注解驱动编程发展历程","children":[]},{"level":2,"title":"Spring 核心注解场景分类","slug":"spring-核心注解场景分类","link":"#spring-核心注解场景分类","children":[]},{"level":2,"title":"Spring 注解编程模型","slug":"spring-注解编程模型","link":"#spring-注解编程模型","children":[]},{"level":2,"title":"Spring 元注解（Meta-Annotations）","slug":"spring-元注解-meta-annotations","link":"#spring-元注解-meta-annotations","children":[]},{"level":2,"title":"Spring 模式注解（Stereotype Annotations）","slug":"spring-模式注解-stereotype-annotations","link":"#spring-模式注解-stereotype-annotations","children":[]},{"level":2,"title":"Spring 组合注解（Composed Annotations）","slug":"spring-组合注解-composed-annotations","link":"#spring-组合注解-composed-annotations","children":[]},{"level":2,"title":"Spring 注解属性别名（Attribute Aliases）","slug":"spring-注解属性别名-attribute-aliases","link":"#spring-注解属性别名-attribute-aliases","children":[]},{"level":2,"title":"Spring 注解属性覆盖（Attribute Overrides）","slug":"spring-注解属性覆盖-attribute-overrides","link":"#spring-注解属性覆盖-attribute-overrides","children":[]},{"level":2,"title":"Spring @Enable 模块驱动","slug":"spring-enable-模块驱动","link":"#spring-enable-模块驱动","children":[]},{"level":2,"title":"Spring 条件注解","slug":"spring-条件注解","link":"#spring-条件注解","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697125600000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":2.48,"words":745},"filePathRelative":"01.Java/13.框架/01.Spring/01.Spring核心/28.Spring注解.md","localizedDate":"2022年12月23日","excerpt":"<h1> Spring 注解</h1>\\n<h2> Spring 注解驱动编程发展历程</h2>\\n<ul>\\n<li>注解驱动启蒙时代：Spring Framework 1.x</li>\\n<li>注解驱动过渡时代：Spring Framework 2.x</li>\\n<li>注解驱动黄金时代：Spring Framework 3.x</li>\\n<li>注解驱动完善时代：Spring Framework 4.x</li>\\n<li>注解驱动当下时代：Spring Framework 5.x</li>\\n</ul>\\n<h2> Spring 核心注解场景分类</h2>\\n<p>Spring 模式注解</p>\\n<table>\\n<thead>\\n<tr>\\n<th>Spring 注解</th>\\n<th>场景说明</th>\\n<th>起始版本</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>@Repository</td>\\n<td>数据仓储模式注解</td>\\n<td>2.0</td>\\n</tr>\\n<tr>\\n<td>@Component</td>\\n<td>通用组件模式注解</td>\\n<td>2.5</td>\\n</tr>\\n<tr>\\n<td>@Service</td>\\n<td>服务模式注解</td>\\n<td>2.5</td>\\n</tr>\\n<tr>\\n<td>@Controller</td>\\n<td>Web 控制器模式注解</td>\\n<td>2.5</td>\\n</tr>\\n<tr>\\n<td>@Configuration</td>\\n<td>配置类模式注解</td>\\n<td>3.0</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{t as data};