const e=JSON.parse('{"key":"v-72c36404","path":"/pages/5c4df258/","title":"HBase Java API 其他高级特性","lang":"zh-CN","frontmatter":{"title":"HBase Java API 其他高级特性","date":"2023-03-31T16:20:27.000Z","order":13,"permalink":"/pages/5c4df258/","category":["数据库","列式数据库","HBase"],"tag":["大数据","HBase","API"],"description":"HBase Java API 其他高级特性 计数器 HBase 提供了一种高级功能：计数器（counter）。HBase 计数器可以用于实时统计，无需延时较高的批量处理操作。HBase 有一种机制可以将列当作计数器：即读取并修改（其实就是一种 CAS 模式），其保证了在一次操作中的原子性。否则，用户需要对一行数据加锁，然后读取数据，再对当前数据做加法，最后写回 HBase 并释放行锁，这一系列操作会引起大量的资源竞争问题。 早期的 HBase 版本会在每次计数器更新操作调用一次 RPC 请求，新版本中可以在一次 RPC 请求中完成多个计数器的更新操作，但是多个计数器必须在同一行。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/5c4df258/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"HBase Java API 其他高级特性"}],["meta",{"property":"og:description","content":"HBase Java API 其他高级特性 计数器 HBase 提供了一种高级功能：计数器（counter）。HBase 计数器可以用于实时统计，无需延时较高的批量处理操作。HBase 有一种机制可以将列当作计数器：即读取并修改（其实就是一种 CAS 模式），其保证了在一次操作中的原子性。否则，用户需要对一行数据加锁，然后读取数据，再对当前数据做加法，最后写回 HBase 并释放行锁，这一系列操作会引起大量的资源竞争问题。 早期的 HBase 版本会在每次计数器更新操作调用一次 RPC 请求，新版本中可以在一次 RPC 请求中完成多个计数器的更新操作，但是多个计数器必须在同一行。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"大数据"}],["meta",{"property":"article:tag","content":"HBase"}],["meta",{"property":"article:tag","content":"API"}],["meta",{"property":"article:published_time","content":"2023-03-31T16:20:27.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HBase Java API 其他高级特性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-31T16:20:27.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"计数器","slug":"计数器","link":"#计数器","children":[{"level":3,"title":"计数器使用 Shell 命令行","slug":"计数器使用-shell-命令行","link":"#计数器使用-shell-命令行","children":[]},{"level":3,"title":"单计数器","slug":"单计数器","link":"#单计数器","children":[]},{"level":3,"title":"多计数器","slug":"多计数器","link":"#多计数器","children":[]}]},{"level":2,"title":"连接管理","slug":"连接管理","link":"#连接管理","children":[{"level":3,"title":"连接管理简介","slug":"连接管理简介","link":"#连接管理简介","children":[]},{"level":3,"title":"连接池","slug":"连接池","link":"#连接池","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697125600000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":3.88,"words":1165},"filePathRelative":"12.数据库/06.列式数据库/01.HBase/13.HBaseJavaApi其他高级特性.md","localizedDate":"2023年3月31日","excerpt":"<h1> HBase Java API 其他高级特性</h1>\\n<h2> 计数器</h2>\\n<p>HBase 提供了一种高级功能：计数器（counter）。<strong>HBase 计数器可以用于实时统计，无需延时较高的批量处理操作</strong>。HBase 有一种机制可以将列当作计数器：即读取并修改（其实就是一种 CAS 模式），其保证了在一次操作中的原子性。否则，用户需要对一行数据加锁，然后读取数据，再对当前数据做加法，最后写回 HBase 并释放行锁，这一系列操作会引起大量的资源竞争问题。</p>\\n<p>早期的 HBase 版本会在每次计数器更新操作调用一次 RPC 请求，新版本中可以在一次 RPC 请求中完成多个计数器的更新操作，但是多个计数器必须在同一行。</p>","autoDesc":true}');export{e as data};