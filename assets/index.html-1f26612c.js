const e=JSON.parse('{"key":"v-76fa7eee","path":"/pages/264d3a22/","title":"Spring MVC 之视图技术","lang":"zh-CN","frontmatter":{"title":"Spring MVC 之视图技术","date":"2023-02-17T11:21:25.000Z","order":6,"permalink":"/pages/264d3a22/","category":["Java","框架","Spring","SpringWeb"],"tag":["Java","框架","Spring","Web","View"],"description":"Spring MVC 之视图技术 Spring MVC 中视图技术的使用是可插拔的。无论决定使用 Thymeleaf、Groovy 等模板引擎、JSP 还是其他技术，都可以通过配置来更改。 Spring MVC 的视图位于该应用程序的内部信任边界内。 视图可以访问应用程序上下文的所有 bean。 因此，不建议在模板可由外部源编辑的应用程序中使用 Spring MVC 的模板支持，因为这可能会产生安全隐患。 Thymeleaf Thymeleaf 是一个现代服务器端 Java 模板引擎，它强调自然的 HTML 模板，可以通过双击在浏览器中预览，而无需运行服务器，这对于 UI 模板的独立工作（例如，由设计师）非常有帮助。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/264d3a22/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Spring MVC 之视图技术"}],["meta",{"property":"og:description","content":"Spring MVC 之视图技术 Spring MVC 中视图技术的使用是可插拔的。无论决定使用 Thymeleaf、Groovy 等模板引擎、JSP 还是其他技术，都可以通过配置来更改。 Spring MVC 的视图位于该应用程序的内部信任边界内。 视图可以访问应用程序上下文的所有 bean。 因此，不建议在模板可由外部源编辑的应用程序中使用 Spring MVC 的模板支持，因为这可能会产生安全隐患。 Thymeleaf Thymeleaf 是一个现代服务器端 Java 模板引擎，它强调自然的 HTML 模板，可以通过双击在浏览器中预览，而无需运行服务器，这对于 UI 模板的独立工作（例如，由设计师）非常有帮助。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"框架"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Web"}],["meta",{"property":"article:tag","content":"View"}],["meta",{"property":"article:published_time","content":"2023-02-17T11:21:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring MVC 之视图技术\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-17T11:21:25.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"Thymeleaf","slug":"thymeleaf","link":"#thymeleaf","children":[]},{"level":2,"title":"FreeMarker","slug":"freemarker","link":"#freemarker","children":[{"level":3,"title":"视图配置","slug":"视图配置","link":"#视图配置","children":[]},{"level":3,"title":"FreeMarker 配置","slug":"freemarker-配置","link":"#freemarker-配置","children":[]},{"level":3,"title":"表单处理","slug":"表单处理","link":"#表单处理","children":[]}]},{"level":2,"title":"Groovy","slug":"groovy","link":"#groovy","children":[{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}]},{"level":2,"title":"脚本视图","slug":"脚本视图","link":"#脚本视图","children":[{"level":3,"title":"要求","slug":"要求","link":"#要求","children":[]},{"level":3,"title":"脚本模板","slug":"脚本模板","link":"#脚本模板","children":[]}]},{"level":2,"title":"JSP 和 JSTL","slug":"jsp-和-jstl","link":"#jsp-和-jstl","children":[]},{"level":2,"title":"RSS and Atom","slug":"rss-and-atom","link":"#rss-and-atom","children":[]},{"level":2,"title":"PDF and Excel","slug":"pdf-and-excel","link":"#pdf-and-excel","children":[{"level":3,"title":"文档视图简介","slug":"文档视图简介","link":"#文档视图简介","children":[]},{"level":3,"title":"PDF 视图","slug":"pdf-视图","link":"#pdf-视图","children":[]},{"level":3,"title":"Excel 视图","slug":"excel-视图","link":"#excel-视图","children":[]}]},{"level":2,"title":"Jackson","slug":"jackson","link":"#jackson","children":[{"level":3,"title":"基于 Jackson 的 JSON MVC 视图","slug":"基于-jackson-的-json-mvc-视图","link":"#基于-jackson-的-json-mvc-视图","children":[]},{"level":3,"title":"基于 Jackson 的 XML 视图","slug":"基于-jackson-的-xml-视图","link":"#基于-jackson-的-xml-视图","children":[]}]},{"level":2,"title":"XML","slug":"xml","link":"#xml","children":[]},{"level":2,"title":"XSLT","slug":"xslt","link":"#xslt","children":[{"level":3,"title":"Beans","slug":"beans","link":"#beans","children":[]},{"level":3,"title":"Controller","slug":"controller","link":"#controller","children":[]},{"level":3,"title":"Transformation","slug":"transformation","link":"#transformation","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1706541180000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":19.63,"words":5890},"filePathRelative":"01.Java/13.框架/01.Spring/03.SpringWeb/06.Spring视图.md","localizedDate":"2023年2月17日","excerpt":"<h1> Spring MVC 之视图技术</h1>\\n<p>Spring MVC 中视图技术的使用是可插拔的。无论决定使用 Thymeleaf、Groovy 等模板引擎、JSP 还是其他技术，都可以通过配置来更改。</p>\\n<p>Spring MVC 的视图位于该应用程序的内部信任边界内。 视图可以访问应用程序上下文的所有 bean。 因此，不建议在模板可由外部源编辑的应用程序中使用 Spring MVC 的模板支持，因为这可能会产生安全隐患。</p>\\n<h2> Thymeleaf</h2>\\n<p><a href=\\"https://www.thymeleaf.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Thymeleaf</a> 是一个现代服务器端 Java 模板引擎，它强调自然的 HTML 模板，可以通过双击在浏览器中预览，而无需运行服务器，这对于 UI 模板的独立工作（例如，由设计师）非常有帮助。</p>","autoDesc":true}');export{e as data};