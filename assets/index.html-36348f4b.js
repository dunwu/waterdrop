const e=JSON.parse('{"key":"v-1d7048d0","path":"/pages/558eafab/","title":"MongoDB 建模","lang":"zh-CN","frontmatter":{"title":"MongoDB 建模","date":"2020-09-09T20:47:14.000Z","order":5,"permalink":"/pages/558eafab/","category":["数据库","文档数据库","MongoDB"],"tag":["数据库","文档数据库","MongoDB","建模"],"description":"MongoDB 建模 MongoDB 的数据模式是一种灵活模式，关系型数据库要求你在插入数据之前必须先定义好一个表的模式结构，而 MongoDB 的集合则并不限制 document 结构。这种灵活性让对象和数据库文档之间的映射变得很容易。即使数据记录之间有很大的变化，每个文档也可以很好的映射到各条不同的记录。 当然在实际使用中，同一个集合中的文档往往都有一个比较类似的结构。 数据模型设计中最具挑战性的是在应用程序需求，数据库引擎性能要求和数据读写模式之间做权衡考量。当设计数据模型的时候，一定要考虑应用程序对数据的使用模式（如查询，更新和处理）以及数据本身的天然结构。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/558eafab/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"MongoDB 建模"}],["meta",{"property":"og:description","content":"MongoDB 建模 MongoDB 的数据模式是一种灵活模式，关系型数据库要求你在插入数据之前必须先定义好一个表的模式结构，而 MongoDB 的集合则并不限制 document 结构。这种灵活性让对象和数据库文档之间的映射变得很容易。即使数据记录之间有很大的变化，每个文档也可以很好的映射到各条不同的记录。 当然在实际使用中，同一个集合中的文档往往都有一个比较类似的结构。 数据模型设计中最具挑战性的是在应用程序需求，数据库引擎性能要求和数据读写模式之间做权衡考量。当设计数据模型的时候，一定要考虑应用程序对数据的使用模式（如查询，更新和处理）以及数据本身的天然结构。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-14T00:27:42.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"文档数据库"}],["meta",{"property":"article:tag","content":"MongoDB"}],["meta",{"property":"article:tag","content":"建模"}],["meta",{"property":"article:published_time","content":"2020-09-09T20:47:14.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-14T00:27:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB 建模\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-09-09T20:47:14.000Z\\",\\"dateModified\\":\\"2024-10-14T00:27:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"MongoDB 数据建模入门","slug":"mongodb-数据建模入门","link":"#mongodb-数据建模入门","children":[{"level":3,"title":"（一）定义数据集","slug":"一-定义数据集","link":"#一-定义数据集","children":[]},{"level":3,"title":"（二）思考 JSON 结构","slug":"二-思考-json-结构","link":"#二-思考-json-结构","children":[]},{"level":3,"title":"（三）确定哪些字段作为嵌入式数据","slug":"三-确定哪些字段作为嵌入式数据","link":"#三-确定哪些字段作为嵌入式数据","children":[]}]},{"level":2,"title":"数据模型简介","slug":"数据模型简介","link":"#数据模型简介","children":[{"level":3,"title":"灵活的 Schema","slug":"灵活的-schema","link":"#灵活的-schema","children":[]},{"level":3,"title":"Document 结构","slug":"document-结构","link":"#document-结构","children":[]},{"level":3,"title":"原子写操作","slug":"原子写操作","link":"#原子写操作","children":[]},{"level":3,"title":"数据使用和性能","slug":"数据使用和性能","link":"#数据使用和性能","children":[]}]},{"level":2,"title":"Schema 校验","slug":"schema-校验","link":"#schema-校验","children":[{"level":3,"title":"指定校验规则","slug":"指定校验规则","link":"#指定校验规则","children":[]},{"level":3,"title":"JSON Schema","slug":"json-schema","link":"#json-schema","children":[]},{"level":3,"title":"其它查询表达式","slug":"其它查询表达式","link":"#其它查询表达式","children":[]},{"level":3,"title":"行为","slug":"行为","link":"#行为","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1728865662000,"updatedTime":1728865662000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":10.23,"words":3069},"filePathRelative":"12.数据库/04.文档数据库/01.MongoDB/MongoDB建模.md","localizedDate":"2020年9月9日","excerpt":"<h1> MongoDB 建模</h1>\\n<p>MongoDB 的数据模式是一种灵活模式，关系型数据库要求你在插入数据之前必须先定义好一个表的模式结构，而 MongoDB 的集合则并不限制 document 结构。这种灵活性让对象和数据库文档之间的映射变得很容易。即使数据记录之间有很大的变化，每个文档也可以很好的映射到各条不同的记录。 当然在实际使用中，同一个集合中的文档往往都有一个比较类似的结构。</p>\\n<p>数据模型设计中最具挑战性的是在应用程序需求，数据库引擎性能要求和数据读写模式之间做权衡考量。当设计数据模型的时候，一定要考虑应用程序对数据的使用模式（如查询，更新和处理）以及数据本身的天然结构。</p>","autoDesc":true}');export{e as data};