const e=JSON.parse('{"key":"v-04891fbe","path":"/pages/f8fab8f0/","title":"Elasticsearch DSL","lang":"zh-CN","frontmatter":{"icon":"logos:elasticsearch","title":"Elasticsearch DSL","date":"2022-01-18T08:01:08.000Z","permalink":"/pages/f8fab8f0/","category":["数据库","搜索引擎数据库","Elasticsearch"],"tag":["数据库","搜索引擎数据库","Elasticsearch","查询","DSL"],"description":"Elasticsearch DSL Elasticsearch 提供了基于 JSON 的 DSL（Domain Specific Language）来定义查询。 可以将 DSL 视为查询的 AST（抽象语法树），由两种类型的子句组成： 叶子查询 - 在指定字段中查找特定值，例如：match、term 和 range。 组合查询 - 组合其他叶子查询或组合查询，用于以逻辑方式组合多个查询（例如： bool、dis_max），或更改它们的行为（例如：constant_score）。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/f8fab8f0/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"Elasticsearch DSL"}],["meta",{"property":"og:description","content":"Elasticsearch DSL Elasticsearch 提供了基于 JSON 的 DSL（Domain Specific Language）来定义查询。 可以将 DSL 视为查询的 AST（抽象语法树），由两种类型的子句组成： 叶子查询 - 在指定字段中查找特定值，例如：match、term 和 range。 组合查询 - 组合其他叶子查询或组合查询，用于以逻辑方式组合多个查询（例如： bool、dis_max），或更改它们的行为（例如：constant_score）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-23T02:22:45.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"搜索引擎数据库"}],["meta",{"property":"article:tag","content":"Elasticsearch"}],["meta",{"property":"article:tag","content":"查询"}],["meta",{"property":"article:tag","content":"DSL"}],["meta",{"property":"article:published_time","content":"2022-01-18T08:01:08.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-23T02:22:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch DSL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-18T08:01:08.000Z\\",\\"dateModified\\":\\"2024-11-23T02:22:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"全文查询","slug":"全文查询","link":"#全文查询","children":[{"level":3,"title":"intervals query","slug":"intervals-query","link":"#intervals-query","children":[]},{"level":3,"title":"match query","slug":"match-query","link":"#match-query","children":[]},{"level":3,"title":"match_bool_prefix query","slug":"match-bool-prefix-query","link":"#match-bool-prefix-query","children":[]},{"level":3,"title":"match_phrase query","slug":"match-phrase-query","link":"#match-phrase-query","children":[]},{"level":3,"title":"match_phrase_prefix query","slug":"match-phrase-prefix-query","link":"#match-phrase-prefix-query","children":[]},{"level":3,"title":"multi_match query","slug":"multi-match-query","link":"#multi-match-query","children":[]},{"level":3,"title":"combined_fields query","slug":"combined-fields-query","link":"#combined-fields-query","children":[]},{"level":3,"title":"common_terms query","slug":"common-terms-query","link":"#common-terms-query","children":[]},{"level":3,"title":"query_string query","slug":"query-string-query","link":"#query-string-query","children":[]},{"level":3,"title":"simple_query_string query","slug":"simple-query-string-query","link":"#simple-query-string-query","children":[]},{"level":3,"title":"全文查询完整示例","slug":"全文查询完整示例","link":"#全文查询完整示例","children":[]}]},{"level":2,"title":"词项查询","slug":"词项查询","link":"#词项查询","children":[{"level":3,"title":"exists query","slug":"exists-query","link":"#exists-query","children":[]},{"level":3,"title":"fuzzy query","slug":"fuzzy-query","link":"#fuzzy-query","children":[]},{"level":3,"title":"ids query","slug":"ids-query","link":"#ids-query","children":[]},{"level":3,"title":"prefix query","slug":"prefix-query","link":"#prefix-query","children":[]},{"level":3,"title":"range query","slug":"range-query","link":"#range-query","children":[]},{"level":3,"title":"regexp query","slug":"regexp-query","link":"#regexp-query","children":[]},{"level":3,"title":"term query","slug":"term-query","link":"#term-query","children":[]},{"level":3,"title":"terms query","slug":"terms-query","link":"#terms-query","children":[]},{"level":3,"title":"type query","slug":"type-query","link":"#type-query","children":[]},{"level":3,"title":"wildcard query","slug":"wildcard-query","link":"#wildcard-query","children":[]},{"level":3,"title":"词项查询完整示例","slug":"词项查询完整示例","link":"#词项查询完整示例","children":[]}]},{"level":2,"title":"复合查询","slug":"复合查询","link":"#复合查询","children":[{"level":3,"title":"bool query","slug":"bool-query","link":"#bool-query","children":[]},{"level":3,"title":"boosting query","slug":"boosting-query","link":"#boosting-query","children":[]},{"level":3,"title":"constant_score query","slug":"constant-score-query","link":"#constant-score-query","children":[]},{"level":3,"title":"dis_max query","slug":"dis-max-query","link":"#dis-max-query","children":[]},{"level":3,"title":"function_score query","slug":"function-score-query","link":"#function-score-query","children":[]},{"level":3,"title":"indices query","slug":"indices-query","link":"#indices-query","children":[]}]},{"level":2,"title":"嵌套查询","slug":"嵌套查询","link":"#嵌套查询","children":[{"level":3,"title":"nested query","slug":"nested-query","link":"#nested-query","children":[]},{"level":3,"title":"has_child query","slug":"has-child-query","link":"#has-child-query","children":[]},{"level":3,"title":"has_parent query","slug":"has-parent-query","link":"#has-parent-query","children":[]}]},{"level":2,"title":"位置查询","slug":"位置查询","link":"#位置查询","children":[{"level":3,"title":"geo_distance query","slug":"geo-distance-query","link":"#geo-distance-query","children":[]},{"level":3,"title":"geo_bounding_box query","slug":"geo-bounding-box-query","link":"#geo-bounding-box-query","children":[]},{"level":3,"title":"geo_polygon query","slug":"geo-polygon-query","link":"#geo-polygon-query","children":[]},{"level":3,"title":"geo_shape query","slug":"geo-shape-query","link":"#geo-shape-query","children":[]}]},{"level":2,"title":"特殊查询","slug":"特殊查询","link":"#特殊查询","children":[{"level":3,"title":"more_like_this query","slug":"more-like-this-query","link":"#more-like-this-query","children":[]},{"level":3,"title":"script query","slug":"script-query","link":"#script-query","children":[]},{"level":3,"title":"percolate query","slug":"percolate-query","link":"#percolate-query","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1732232266000,"updatedTime":1732328565000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":27.88,"words":8365},"filePathRelative":"12.数据库/07.搜索引擎数据库/01.Elasticsearch/Elasticsearch_DSL.md","localizedDate":"2022年1月18日","excerpt":"<h1> Elasticsearch DSL</h1>\\n<p>Elasticsearch 提供了基于 JSON 的 DSL（Domain Specific Language）来定义查询。</p>\\n<p>可以将 DSL 视为查询的 AST（抽象语法树），由两种类型的子句组成：</p>\\n<ul>\\n<li>叶子查询 - 在指定字段中查找特定值，例如：<a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>match</code></a>、<a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>term</code></a> 和 <a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>range</code></a>。</li>\\n<li>组合查询 - 组合其他叶子查询或组合查询，用于以逻辑方式组合多个查询（例如： <a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>bool</code></a>、<a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>dis_max</code></a>），或更改它们的行为（例如：<a href=\\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"><code>constant_score</code></a>）。</li>\\n</ul>","autoDesc":true}');export{e as data};