const e=JSON.parse('{"key":"v-6857db36","path":"/pages/c8cfeb/","title":"HBase 数据模型","lang":"zh-CN","frontmatter":{"title":"HBase 数据模型","date":"2023-03-16T15:58:10.000Z","order":2,"permalink":"/pages/c8cfeb/","category":["数据库","列式数据库","HBase"],"tag":["数据库","列式数据库","大数据","HBase"],"description":"HBase 数据模型 HBase 是一个面向 列 的数据库管理系统，这里更为确切的而说，HBase 是一个面向 列族 的数据库管理系统。表 schema 仅定义列族，表具有多个列族，每个列族可以包含任意数量的列，列由多个单元格（cell）组成，单元格可以存储多个版本的数据，多个版本数据以时间戳进行区分。 HBase 逻辑存储结构 Table：Table 由 Row 和 Column 组成。 Row：Row 是列族（Column Family）的集合。 Row Key：Row Key 是用来检索记录的主键。 Row Key 是未解释的字节数组，所以理论上，任何数据都可以通过序列化表示成字符串或二进制，从而存为 HBase 的键值。 表中的行，是按照 Row Key 的字典序进行排序。这里需要注意以下两点： 因为字典序对 Int 排序的结果是 1,10,100,11,12,13,14,15,16,17,18,19,2,20,21,…,9,91,92,93,94,95,96,97,98,99。如果你使用整型的字符串作为行键，那么为了保持整型的自然序，行键必须用 0 作左填充。 行的一次读写操作是原子性的 (不论一次读写多少列)。 所有对表的访问都要通过 Row Key，有以下三种方式： 通过指定的 Row Key 进行访问； 通过 Row Key 的 range 进行访问，即访问指定范围内的行； 进行全表扫描。 Column Family：即列族。HBase 表中的每个列，都归属于某个列族。列族是表的 Schema 的一部分，所以列族需要在创建表时进行定义。 一个表的列族必须作为表模式定义的一部分预先给出，但是新的列族成员可以随后按需加入。 同一个列族的所有成员具有相同的前缀，例如 info:format，info:geo 都属于 info 这个列族。 Column Qualifier：列限定符。可以理解为是具体的列名，例如 info:format，info:geo 都属于 info 这个列族，它们的列限定符分别是 format 和 geo。列族和列限定符之间始终以冒号分隔。需要注意的是列限定符不是表 Schema 的一部分，你可以在插入数据的过程中动态创建列。 Column：HBase 中的列由列族和列限定符组成，由 :(冒号) 进行分隔，即一个完整的列名应该表述为 列族名 ：列限定符。 Cell：Cell 是行，列族和列限定符的组合，并包含值和时间戳。HBase 中通过 row key 和 column 确定的为一个存储单元称为 Cell，你可以等价理解为关系型数据库中由指定行和指定列确定的一个单元格，但不同的是 HBase 中的一个单元格是由多个版本的数据组成的，每个版本的数据用时间戳进行区分。 Cell 由行和列的坐标交叉决定，是有版本的。默认情况下，版本号是自动分配的，为 HBase 插入 Cell 时的时间戳。Cell 的内容是未解释的字节数组。 Timestamp：Cell 的版本通过时间戳来索引，时间戳的类型是 64 位整型，时间戳可以由 HBase 在数据写入时自动赋值，也可以由客户显式指定。每个 Cell 中，不同版本的数据按照时间戳倒序排列，即最新的数据排在最前面。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/c8cfeb/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"HBase 数据模型"}],["meta",{"property":"og:description","content":"HBase 数据模型 HBase 是一个面向 列 的数据库管理系统，这里更为确切的而说，HBase 是一个面向 列族 的数据库管理系统。表 schema 仅定义列族，表具有多个列族，每个列族可以包含任意数量的列，列由多个单元格（cell）组成，单元格可以存储多个版本的数据，多个版本数据以时间戳进行区分。 HBase 逻辑存储结构 Table：Table 由 Row 和 Column 组成。 Row：Row 是列族（Column Family）的集合。 Row Key：Row Key 是用来检索记录的主键。 Row Key 是未解释的字节数组，所以理论上，任何数据都可以通过序列化表示成字符串或二进制，从而存为 HBase 的键值。 表中的行，是按照 Row Key 的字典序进行排序。这里需要注意以下两点： 因为字典序对 Int 排序的结果是 1,10,100,11,12,13,14,15,16,17,18,19,2,20,21,…,9,91,92,93,94,95,96,97,98,99。如果你使用整型的字符串作为行键，那么为了保持整型的自然序，行键必须用 0 作左填充。 行的一次读写操作是原子性的 (不论一次读写多少列)。 所有对表的访问都要通过 Row Key，有以下三种方式： 通过指定的 Row Key 进行访问； 通过 Row Key 的 range 进行访问，即访问指定范围内的行； 进行全表扫描。 Column Family：即列族。HBase 表中的每个列，都归属于某个列族。列族是表的 Schema 的一部分，所以列族需要在创建表时进行定义。 一个表的列族必须作为表模式定义的一部分预先给出，但是新的列族成员可以随后按需加入。 同一个列族的所有成员具有相同的前缀，例如 info:format，info:geo 都属于 info 这个列族。 Column Qualifier：列限定符。可以理解为是具体的列名，例如 info:format，info:geo 都属于 info 这个列族，它们的列限定符分别是 format 和 geo。列族和列限定符之间始终以冒号分隔。需要注意的是列限定符不是表 Schema 的一部分，你可以在插入数据的过程中动态创建列。 Column：HBase 中的列由列族和列限定符组成，由 :(冒号) 进行分隔，即一个完整的列名应该表述为 列族名 ：列限定符。 Cell：Cell 是行，列族和列限定符的组合，并包含值和时间戳。HBase 中通过 row key 和 column 确定的为一个存储单元称为 Cell，你可以等价理解为关系型数据库中由指定行和指定列确定的一个单元格，但不同的是 HBase 中的一个单元格是由多个版本的数据组成的，每个版本的数据用时间戳进行区分。 Cell 由行和列的坐标交叉决定，是有版本的。默认情况下，版本号是自动分配的，为 HBase 插入 Cell 时的时间戳。Cell 的内容是未解释的字节数组。 Timestamp：Cell 的版本通过时间戳来索引，时间戳的类型是 64 位整型，时间戳可以由 HBase 在数据写入时自动赋值，也可以由客户显式指定。每个 Cell 中，不同版本的数据按照时间戳倒序排列，即最新的数据排在最前面。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-12T15:46:40.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"列式数据库"}],["meta",{"property":"article:tag","content":"大数据"}],["meta",{"property":"article:tag","content":"HBase"}],["meta",{"property":"article:published_time","content":"2023-03-16T15:58:10.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-12T15:46:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HBase 数据模型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-16T15:58:10.000Z\\",\\"dateModified\\":\\"2023-10-12T15:46:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"HBase 逻辑存储结构","slug":"hbase-逻辑存储结构","link":"#hbase-逻辑存储结构","children":[]},{"level":2,"title":"HBase 物理存储结构","slug":"hbase-物理存储结构","link":"#hbase-物理存储结构","children":[]},{"level":2,"title":"HBase 数据模型示例","slug":"hbase-数据模型示例","link":"#hbase-数据模型示例","children":[]},{"level":2,"title":"HBase 表特性","slug":"hbase-表特性","link":"#hbase-表特性","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697125600000,"updatedTime":1697125600000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":4.73,"words":1419},"filePathRelative":"12.数据库/06.列式数据库/01.HBase/02.HBase数据模型.md","localizedDate":"2023年3月16日","excerpt":"<h1> HBase 数据模型</h1>\\n<p>HBase 是一个面向 <code>列</code> 的数据库管理系统，这里更为确切的而说，HBase 是一个面向 <code>列族</code> 的数据库管理系统。表 schema 仅定义列族，表具有多个列族，每个列族可以包含任意数量的列，列由多个单元格（cell）组成，单元格可以存储多个版本的数据，多个版本数据以时间戳进行区分。</p>\\n<h2> HBase 逻辑存储结构</h2>\\n<ul>\\n<li><strong><code>Table</code></strong>：Table 由 Row 和 Column 组成。</li>\\n<li><strong><code>Row</code></strong>：Row 是列族（Column Family）的集合。</li>\\n<li><strong><code>Row Key</code></strong>：<strong><code>Row Key</code> 是用来检索记录的主键</strong>。\\n<ul>\\n<li><code>Row Key</code> 是未解释的字节数组，所以理论上，任何数据都可以通过序列化表示成字符串或二进制，从而存为 HBase 的键值。</li>\\n<li>表中的行，是按照 <code>Row Key</code> 的字典序进行排序。这里需要注意以下两点：\\n<ul>\\n<li>因为字典序对 Int 排序的结果是 1,10,100,11,12,13,14,15,16,17,18,19,2,20,21,…,9,91,92,93,94,95,96,97,98,99。如果你使用整型的字符串作为行键，那么为了保持整型的自然序，行键必须用 0 作左填充。</li>\\n<li>行的一次读写操作是原子性的 (不论一次读写多少列)。</li>\\n</ul>\\n</li>\\n<li>所有对表的访问都要通过 Row Key，有以下三种方式：\\n<ul>\\n<li>通过指定的 <code>Row Key</code> 进行访问；</li>\\n<li>通过 <code>Row Key</code> 的 range 进行访问，即访问指定范围内的行；</li>\\n<li>进行全表扫描。</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li><strong><code>Column Family</code></strong>：即列族。HBase 表中的每个列，都归属于某个列族。列族是表的 Schema 的一部分，所以列族需要在创建表时进行定义。\\n<ul>\\n<li>一个表的列族必须作为表模式定义的一部分预先给出，但是新的列族成员可以随后按需加入。</li>\\n<li>同一个列族的所有成员具有相同的前缀，例如 <code>info:format</code>，<code>info:geo</code> 都属于 <code>info</code> 这个列族。</li>\\n</ul>\\n</li>\\n<li><strong><code>Column Qualifier</code></strong>：列限定符。可以理解为是具体的列名，例如 <code>info:format</code>，<code>info:geo</code> 都属于 <code>info</code> 这个列族，它们的列限定符分别是 <code>format</code> 和 <code>geo</code>。列族和列限定符之间始终以冒号分隔。需要注意的是列限定符不是表 Schema 的一部分，你可以在插入数据的过程中动态创建列。</li>\\n<li><strong><code>Column</code></strong>：HBase 中的列由列族和列限定符组成，由 <code>:</code>(冒号) 进行分隔，即一个完整的列名应该表述为 <code>列族名 ：列限定符</code>。</li>\\n<li><strong><code>Cell</code></strong>：<code>Cell</code> 是行，列族和列限定符的组合，并包含值和时间戳。HBase 中通过 <code>row key</code> 和 <code>column</code> 确定的为一个存储单元称为 <code>Cell</code>，你可以等价理解为关系型数据库中由指定行和指定列确定的一个单元格，但不同的是 HBase 中的一个单元格是由多个版本的数据组成的，每个版本的数据用时间戳进行区分。\\n<ul>\\n<li><code>Cell</code> 由行和列的坐标交叉决定，是有版本的。默认情况下，版本号是自动分配的，为 HBase 插入 <code>Cell</code> 时的时间戳。<code>Cell</code> 的内容是未解释的字节数组。</li>\\n<li></li>\\n</ul>\\n</li>\\n<li><strong><code>Timestamp</code></strong>：<code>Cell</code> 的版本通过时间戳来索引，时间戳的类型是 64 位整型，时间戳可以由 HBase 在数据写入时自动赋值，也可以由客户显式指定。每个 <code>Cell</code> 中，不同版本的数据按照时间戳倒序排列，即最新的数据排在最前面。</li>\\n</ul>","autoDesc":true}');export{e as data};