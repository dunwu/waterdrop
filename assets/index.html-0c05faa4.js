const e=JSON.parse('{"key":"v-cc56e638","path":"/pages/f648b115/","title":"Elasticsearch 架构","lang":"zh-CN","frontmatter":{"icon":"logos:elasticsearch","title":"Elasticsearch 架构","date":"2024-11-25T07:42:18.000Z","permalink":"/pages/f648b115/","category":["数据库","搜索引擎数据库","Elasticsearch"],"tag":["数据库","搜索引擎数据库","Elasticsearch","存储","索引"],"description":"Elasticsearch 架构 存储流程 ES 存储数据的流程可以从三个角度来阐述： 从集群的角度来看，数据写入会先路由到主分片，在主分片上写入成功后，会并发写副本分片，最后响应给客户端。 从分片的角度来看，数据到达分片后需要对内容进行格式校验、分词处理然后再索引数据。 从节点的角度来看，ES 数据持久化的步骤可归纳为：Refresh、写 Translog、Flush、Merge。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/f648b115/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Elasticsearch 架构"}],["meta",{"property":"og:description","content":"Elasticsearch 架构 存储流程 ES 存储数据的流程可以从三个角度来阐述： 从集群的角度来看，数据写入会先路由到主分片，在主分片上写入成功后，会并发写副本分片，最后响应给客户端。 从分片的角度来看，数据到达分片后需要对内容进行格式校验、分词处理然后再索引数据。 从节点的角度来看，ES 数据持久化的步骤可归纳为：Refresh、写 Translog、Flush、Merge。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-06T00:06:27.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"搜索引擎数据库"}],["meta",{"property":"article:tag","content":"Elasticsearch"}],["meta",{"property":"article:tag","content":"存储"}],["meta",{"property":"article:tag","content":"索引"}],["meta",{"property":"article:published_time","content":"2024-11-25T07:42:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-06T00:06:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch 架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-25T07:42:18.000Z\\",\\"dateModified\\":\\"2024-12-06T00:06:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"存储流程","slug":"存储流程","link":"#存储流程","children":[{"level":3,"title":"文档分布式存储流程","slug":"文档分布式存储流程","link":"#文档分布式存储流程","children":[]},{"level":3,"title":"数据索引流程","slug":"数据索引流程","link":"#数据索引流程","children":[]},{"level":3,"title":"数据持久化流程","slug":"数据持久化流程","link":"#数据持久化流程","children":[]}]},{"level":2,"title":"搜索流程","slug":"搜索流程","link":"#搜索流程","children":[{"level":3,"title":"Query 阶段","slug":"query-阶段","link":"#query-阶段","children":[]},{"level":3,"title":"Fetch 阶段","slug":"fetch-阶段","link":"#fetch-阶段","children":[]},{"level":3,"title":"深度分页问题","slug":"深度分页问题","link":"#深度分页问题","children":[]},{"level":3,"title":"计算偏差","slug":"计算偏差","link":"#计算偏差","children":[]},{"level":3,"title":"数据路由","slug":"数据路由","link":"#数据路由","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1732491963000,"updatedTime":1733443587000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":13.27,"words":3982},"filePathRelative":"12.数据库/07.搜索引擎数据库/01.Elasticsearch/Elasticsearch_架构.md","localizedDate":"2024年11月25日","excerpt":"<h1> Elasticsearch 架构</h1>\\n<h2> 存储流程</h2>\\n<p>ES 存储数据的流程可以从三个角度来阐述：</p>\\n<ul>\\n<li>从<strong>集群</strong>的角度来看，数据写入会先路由到主分片，在主分片上写入成功后，会并发写副本分片，最后响应给客户端。</li>\\n<li>从<strong>分片</strong>的角度来看，数据到达分片后需要对内容进行格式校验、分词处理然后再索引数据。</li>\\n<li>从<strong>节点</strong>的角度来看，ES 数据持久化的步骤可归纳为：<strong>Refresh、写 Translog、Flush、Merge。</strong></li>\\n</ul>","autoDesc":true}');export{e as data};