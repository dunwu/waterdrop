const e=JSON.parse('{"key":"v-7d9b12c6","path":"/pages/be5227/","title":"数据库连接池","lang":"zh-CN","frontmatter":{"title":"数据库连接池","date":"2022-09-21T23:58:06.000Z","order":1,"permalink":"/pages/be5227/","category":["Java","中间件","其他"],"tag":["Java","中间件","数据库连接池"],"description":"数据库连接池 数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。这项技术能明显提高对数据库操作的性能。——摘自百度百科 什么是数据库连接池 数据库连接是一种关键的有限的昂贵的资源，这一点在多用户的网页应用程序中体现得尤为突出。 一个数据库连接对象均对应一个物理数据库连接，每次操作都打开一个物理连接，使用完都关闭连接，这样造成系统的 性能低下。 数据库连接池的解决方案是在应用程序启动时建立足够的数据库连接，并讲这些连接组成一个连接池(简单说：在一个“池”里放了好多半成品的数据库联接对象)，由应用程序动态地对池中的连接进行申请、使用和释放。对于多于连接池中连接数的并发请求，应该在请求队列中排队等待。并且应用程序可以根据池中连接的使用率，动态增加或减少池中的连接数。 连接池技术尽可能多地重用了消耗内存地资源，大大节省了内存，提高了服务器地服务效率，能够支持更多的客户服务。通过使用连接池，将大大提高程序运行效率，同时，我们可以通过其自身的管理机制来监视数据库连接的数量、使用情况等。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/be5227/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"数据库连接池"}],["meta",{"property":"og:description","content":"数据库连接池 数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。这项技术能明显提高对数据库操作的性能。——摘自百度百科 什么是数据库连接池 数据库连接是一种关键的有限的昂贵的资源，这一点在多用户的网页应用程序中体现得尤为突出。 一个数据库连接对象均对应一个物理数据库连接，每次操作都打开一个物理连接，使用完都关闭连接，这样造成系统的 性能低下。 数据库连接池的解决方案是在应用程序启动时建立足够的数据库连接，并讲这些连接组成一个连接池(简单说：在一个“池”里放了好多半成品的数据库联接对象)，由应用程序动态地对池中的连接进行申请、使用和释放。对于多于连接池中连接数的并发请求，应该在请求队列中排队等待。并且应用程序可以根据池中连接的使用率，动态增加或减少池中的连接数。 连接池技术尽可能多地重用了消耗内存地资源，大大节省了内存，提高了服务器地服务效率，能够支持更多的客户服务。通过使用连接池，将大大提高程序运行效率，同时，我们可以通过其自身的管理机制来监视数据库连接的数量、使用情况等。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-12T15:46:40.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"中间件"}],["meta",{"property":"article:tag","content":"数据库连接池"}],["meta",{"property":"article:published_time","content":"2022-09-21T23:58:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-12T15:46:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据库连接池\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-21T23:58:06.000Z\\",\\"dateModified\\":\\"2023-10-12T15:46:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"什么是数据库连接池","slug":"什么是数据库连接池","link":"#什么是数据库连接池","children":[]},{"level":2,"title":"为什么需要数据库连接池","slug":"为什么需要数据库连接池","link":"#为什么需要数据库连接池","children":[{"level":3,"title":"不使用数据库连接池","slug":"不使用数据库连接池","link":"#不使用数据库连接池","children":[]},{"level":3,"title":"使用数据库连接池","slug":"使用数据库连接池","link":"#使用数据库连接池","children":[]}]},{"level":2,"title":"数据库连接池如何工作","slug":"数据库连接池如何工作","link":"#数据库连接池如何工作","children":[]},{"level":2,"title":"数据库连接池的核心参数","slug":"数据库连接池的核心参数","link":"#数据库连接池的核心参数","children":[]},{"level":2,"title":"数据库连接池的问题","slug":"数据库连接池的问题","link":"#数据库连接池的问题","children":[]},{"level":2,"title":"数据库连接池技术选型","slug":"数据库连接池技术选型","link":"#数据库连接池技术选型","children":[]},{"level":2,"title":"HikariCP","slug":"hikaricp","link":"#hikaricp","children":[]},{"level":2,"title":"Druid","slug":"druid","link":"#druid","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697125600000,"updatedTime":1697125600000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":13.65,"words":4095},"filePathRelative":"01.Java/14.中间件/99.其他/01.数据库连接池.md","localizedDate":"2022年9月21日","excerpt":"<h1> 数据库连接池</h1>\\n<blockquote>\\n<p>数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。这项技术能明显提高对数据库操作的性能。——摘自百度百科</p>\\n</blockquote>\\n<h2> 什么是数据库连接池</h2>\\n<p>数据库连接是一种关键的有限的昂贵的资源，这一点在多用户的网页应用程序中体现得尤为突出。 一个数据库连接对象均对应一个物理数据库连接，每次操作都打开一个物理连接，使用完都关闭连接，这样造成系统的 性能低下。 数据库连接池的解决方案是在应用程序启动时建立足够的数据库连接，并讲这些连接组成一个连接池(简单说：在一个“池”里放了好多半成品的数据库联接对象)，由应用程序动态地对池中的连接进行申请、使用和释放。对于多于连接池中连接数的并发请求，应该在请求队列中排队等待。并且应用程序可以根据池中连接的使用率，动态增加或减少池中的连接数。 连接池技术尽可能多地重用了消耗内存地资源，大大节省了内存，提高了服务器地服务效率，能够支持更多的客户服务。通过使用连接池，将大大提高程序运行效率，同时，我们可以通过其自身的管理机制来监视数据库连接的数量、使用情况等。</p>","autoDesc":true}');export{e as data};