const t=JSON.parse('{"key":"v-796767e8","path":"/pages/e1046e/","title":"分库分表基本原理","lang":"zh-CN","frontmatter":{"title":"分库分表基本原理","date":"2019-10-16T20:54:00.000Z","order":3,"permalink":"/pages/e1046e/","category":["分布式","分布式存储"],"tag":["分布式","数据调度","分库分表"],"description":"分库分表基本原理 1. 为何要分库分表 分库分表主要基于以下理由： 并发连接 - 单库超过每秒 2000 个并发时，而一个健康的单库最好保持在每秒 1000 个并发左右，不要太大。 磁盘容量 - 磁盘容量占满，会导致服务器不可用。 SQL 性能 - 单表数据量过大，会导致 SQL 执行效率低下。一般，单表超过 1000 万条数据，就可以考虑分表了。 # 分库分表前 分库分表后 并发支撑情况 MySQL 单机部署，扛不住高并发 MySQL 从单机到多机，能承受的并发增加了多倍 磁盘使用情况 MySQL 单机磁盘容量几乎撑满 拆分为多个库，数据库服务器磁盘使用率大大降低 SQL 执行性能 单表数据量太大，SQL 越跑越慢 单表数据量减少，SQL 执行效率明显提升","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/e1046e/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"分库分表基本原理"}],["meta",{"property":"og:description","content":"分库分表基本原理 1. 为何要分库分表 分库分表主要基于以下理由： 并发连接 - 单库超过每秒 2000 个并发时，而一个健康的单库最好保持在每秒 1000 个并发左右，不要太大。 磁盘容量 - 磁盘容量占满，会导致服务器不可用。 SQL 性能 - 单表数据量过大，会导致 SQL 执行效率低下。一般，单表超过 1000 万条数据，就可以考虑分表了。 # 分库分表前 分库分表后 并发支撑情况 MySQL 单机部署，扛不住高并发 MySQL 从单机到多机，能承受的并发增加了多倍 磁盘使用情况 MySQL 单机磁盘容量几乎撑满 拆分为多个库，数据库服务器磁盘使用率大大降低 SQL 执行性能 单表数据量太大，SQL 越跑越慢 单表数据量减少，SQL 执行效率明显提升"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-12T15:46:40.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"分布式"}],["meta",{"property":"article:tag","content":"数据调度"}],["meta",{"property":"article:tag","content":"分库分表"}],["meta",{"property":"article:published_time","content":"2019-10-16T20:54:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-12T15:46:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分库分表基本原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-16T20:54:00.000Z\\",\\"dateModified\\":\\"2023-10-12T15:46:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"1. 为何要分库分表","slug":"_1-为何要分库分表","link":"#_1-为何要分库分表","children":[]},{"level":2,"title":"2. 分库分表原理","slug":"_2-分库分表原理","link":"#_2-分库分表原理","children":[{"level":3,"title":"2.1. 垂直分片","slug":"_2-1-垂直分片","link":"#_2-1-垂直分片","children":[]},{"level":3,"title":"2.2. 水平分片","slug":"_2-2-水平分片","link":"#_2-2-水平分片","children":[]},{"level":3,"title":"2.3. 分库分表策略","slug":"_2-3-分库分表策略","link":"#_2-3-分库分表策略","children":[]}]},{"level":2,"title":"3. 迁移和扩容","slug":"_3-迁移和扩容","link":"#_3-迁移和扩容","children":[{"level":3,"title":"3.1. 停机迁移/扩容（不推荐）","slug":"_3-1-停机迁移-扩容-不推荐","link":"#_3-1-停机迁移-扩容-不推荐","children":[]},{"level":3,"title":"3.2. 双写迁移","slug":"_3-2-双写迁移","link":"#_3-2-双写迁移","children":[]},{"level":3,"title":"3.3. 主从升级","slug":"_3-3-主从升级","link":"#_3-3-主从升级","children":[]}]},{"level":2,"title":"4. 分库分表的问题","slug":"_4-分库分表的问题","link":"#_4-分库分表的问题","children":[{"level":3,"title":"4.1. 分布式 ID 问题","slug":"_4-1-分布式-id-问题","link":"#_4-1-分布式-id-问题","children":[]},{"level":3,"title":"4.2. 分布式事务问题","slug":"_4-2-分布式事务问题","link":"#_4-2-分布式事务问题","children":[]},{"level":3,"title":"4.3. 跨节点 Join 和聚合","slug":"_4-3-跨节点-join-和聚合","link":"#_4-3-跨节点-join-和聚合","children":[]},{"level":3,"title":"4.4. 跨分片的排序分页","slug":"_4-4-跨分片的排序分页","link":"#_4-4-跨分片的排序分页","children":[]}]},{"level":2,"title":"5. 中间件","slug":"_5-中间件","link":"#_5-中间件","children":[]},{"level":2,"title":"6. 参考资料","slug":"_6-参考资料","link":"#_6-参考资料","children":[]}],"git":{"createdTime":1655247928000,"updatedTime":1697125600000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":18.44,"words":5533},"filePathRelative":"15.分布式/22.分布式存储/03.分库分表.md","localizedDate":"2019年10月16日","excerpt":"<h1> 分库分表基本原理</h1>\\n<h2> 1. 为何要分库分表</h2>\\n<p>分库分表主要基于以下理由：</p>\\n<ul>\\n<li><strong>并发连接</strong> - 单库超过每秒 2000 个并发时，而一个健康的单库最好保持在每秒 1000 个并发左右，不要太大。</li>\\n<li><strong>磁盘容量</strong> - 磁盘容量占满，会导致服务器不可用。</li>\\n<li><strong>SQL 性能</strong> - 单表数据量过大，会导致 SQL 执行效率低下。一般，单表超过 1000 万条数据，就可以考虑分表了。</li>\\n</ul>\\n<table>\\n<thead>\\n<tr>\\n<th>#</th>\\n<th>分库分表前</th>\\n<th>分库分表后</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>并发支撑情况</td>\\n<td>MySQL 单机部署，扛不住高并发</td>\\n<td>MySQL 从单机到多机，能承受的并发增加了多倍</td>\\n</tr>\\n<tr>\\n<td>磁盘使用情况</td>\\n<td>MySQL 单机磁盘容量几乎撑满</td>\\n<td>拆分为多个库，数据库服务器磁盘使用率大大降低</td>\\n</tr>\\n<tr>\\n<td>SQL 执行性能</td>\\n<td>单表数据量太大，SQL 越跑越慢</td>\\n<td>单表数据量减少，SQL 执行效率明显提升</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{t as data};