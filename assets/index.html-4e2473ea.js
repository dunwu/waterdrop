const e=JSON.parse('{"key":"v-9df85958","path":"/pages/943670/","title":"系统扩展性架构","lang":"zh-CN","frontmatter":{"title":"系统扩展性架构","date":"2018-07-05T15:11:00.000Z","order":6,"permalink":"/pages/943670/","category":["设计","架构","综合"],"tag":["架构","扩展性"],"description":"系统扩展性架构 扩展性和伸缩性是不同的概念： 扩展性（Extensibility） - 指对现有系统影响最小的情况下，系统功能可持续扩展或提升的能力。表现在系统基础设施稳定不需要经常变更，应用之间较少依赖和耦合，对需求变更可以敏捷响应。它是系统架构设计层面的开闭原则（对扩展开放、对修改关闭），架构设计考虑未来功能扩展，当系统增加新功能时，不需要对现有系统的结构和代码进行修改。 伸缩性（Scalability） - 指系统能够通过增加减少自身资源规模的方式增减自己计算处理事务的能力。如果这种增减是成比例的，就被称作线性伸缩性。在网站架构中 ，通常指利用集群的方式增加服务器数量、提高系统的整体事务吞吐能力。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/943670/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"系统扩展性架构"}],["meta",{"property":"og:description","content":"系统扩展性架构 扩展性和伸缩性是不同的概念： 扩展性（Extensibility） - 指对现有系统影响最小的情况下，系统功能可持续扩展或提升的能力。表现在系统基础设施稳定不需要经常变更，应用之间较少依赖和耦合，对需求变更可以敏捷响应。它是系统架构设计层面的开闭原则（对扩展开放、对修改关闭），架构设计考虑未来功能扩展，当系统增加新功能时，不需要对现有系统的结构和代码进行修改。 伸缩性（Scalability） - 指系统能够通过增加减少自身资源规模的方式增减自己计算处理事务的能力。如果这种增减是成比例的，就被称作线性伸缩性。在网站架构中 ，通常指利用集群的方式增加服务器数量、提高系统的整体事务吞吐能力。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-12T15:46:40.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"架构"}],["meta",{"property":"article:tag","content":"扩展性"}],["meta",{"property":"article:published_time","content":"2018-07-05T15:11:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-12T15:46:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统扩展性架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-07-05T15:11:00.000Z\\",\\"dateModified\\":\\"2023-10-12T15:46:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"可扩展的基本思想","slug":"可扩展的基本思想","link":"#可扩展的基本思想","children":[]},{"level":2,"title":"可扩展方式","slug":"可扩展方式","link":"#可扩展方式","children":[{"level":3,"title":"分层架构","slug":"分层架构","link":"#分层架构","children":[]},{"level":3,"title":"SOA","slug":"soa","link":"#soa","children":[]},{"level":3,"title":"微服务","slug":"微服务","link":"#微服务","children":[]},{"level":3,"title":"微内核","slug":"微内核","link":"#微内核","children":[]}]},{"level":2,"title":"易扩展的系统架构","slug":"易扩展的系统架构","link":"#易扩展的系统架构","children":[]},{"level":2,"title":"利用分布式消息队列降低系统耦合性","slug":"利用分布式消息队列降低系统耦合性","link":"#利用分布式消息队列降低系统耦合性","children":[{"level":3,"title":"事件驱动架构","slug":"事件驱动架构","link":"#事件驱动架构","children":[]},{"level":3,"title":"分布式消息队列","slug":"分布式消息队列","link":"#分布式消息队列","children":[]}]},{"level":2,"title":"利用分布式服务打造可复用的业务平台","slug":"利用分布式服务打造可复用的业务平台","link":"#利用分布式服务打造可复用的业务平台","children":[]},{"level":2,"title":"可扩展的数据结构","slug":"可扩展的数据结构","link":"#可扩展的数据结构","children":[]},{"level":2,"title":"开放平台","slug":"开放平台","link":"#开放平台","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1654694926000,"updatedTime":1697125600000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":9.98,"words":2995},"filePathRelative":"03.设计/01.架构/00.综合/06.系统扩展性架构.md","localizedDate":"2018年7月5日","excerpt":"<h1> 系统扩展性架构</h1>\\n<blockquote>\\n<p>扩展性和伸缩性是不同的概念：</p>\\n<ul>\\n<li><strong>扩展性（Extensibility）</strong> - 指对现有系统影响最小的情况下，系统功能可持续扩展或提升的能力。表现在系统基础设施稳定不需要经常变更，应用之间较少依赖和耦合，对需求变更可以敏捷响应。它是系统架构设计层面的开闭原则（对扩展开放、对修改关闭），架构设计考虑未来功能扩展，当系统增加新功能时，不需要对现有系统的结构和代码进行修改。</li>\\n<li><strong>伸缩性（Scalability）</strong> - 指系统能够通过增加减少自身资源规模的方式增减自己计算处理事务的能力。如果这种增减是成比例的，就被称作线性伸缩性。在网站架构中 ，通常指利用集群的方式增加服务器数量、提高系统的整体事务吞吐能力。</li>\\n</ul>\\n</blockquote>","autoDesc":true}');export{e as data};