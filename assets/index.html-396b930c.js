const l=JSON.parse('{"key":"v-abcce8b4","path":"/pages/abe5a720/","title":"《SQL 必知必会》笔记","lang":"zh-CN","frontmatter":{"title":"《SQL 必知必会》笔记","date":"2024-09-29T07:45:34.000Z","permalink":"/pages/abe5a720/","category":["笔记","数据库"],"tag":["数据库","关系型数据库"],"description":"《SQL 必知必会》笔记 第 1 课 了解 SQL 数据库基础 数据库（database） - 保存有组织的数据的容器（通常是一个文件或一组文件）。 表（table） - 某种特定类型数据的结构化清单。 模式 - 关于数据库和表的布局及特性的信息。 列（column） - 表中的一个字段。所有表都是由一个或多个列组成的。 数据类型 - 所允许的数据的类型。每个表列都有相应的数据类型，它限制（或允许）该列中存储的数据。 行（row） - 表中的一个记录。 主键（primary key） - 一列（或一组列），其值能够唯一标识表中每一行。表中的任何列都可以作为主键，只要它满足以下条件： 任意两行都不具有相同的主键值； 每一行都必须具有一个主键值（主键列不允许 NULL 值）； 主键列中的值不允许修改或更新； 主键值不能重用（如果某行从表中删除，它的主键不能赋给以后的新行）。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/abe5a720/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"《SQL 必知必会》笔记"}],["meta",{"property":"og:description","content":"《SQL 必知必会》笔记 第 1 课 了解 SQL 数据库基础 数据库（database） - 保存有组织的数据的容器（通常是一个文件或一组文件）。 表（table） - 某种特定类型数据的结构化清单。 模式 - 关于数据库和表的布局及特性的信息。 列（column） - 表中的一个字段。所有表都是由一个或多个列组成的。 数据类型 - 所允许的数据的类型。每个表列都有相应的数据类型，它限制（或允许）该列中存储的数据。 行（row） - 表中的一个记录。 主键（primary key） - 一列（或一组列），其值能够唯一标识表中每一行。表中的任何列都可以作为主键，只要它满足以下条件： 任意两行都不具有相同的主键值； 每一行都必须具有一个主键值（主键列不允许 NULL 值）； 主键列中的值不允许修改或更新； 主键值不能重用（如果某行从表中删除，它的主键不能赋给以后的新行）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-29T23:23:12.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"关系型数据库"}],["meta",{"property":"article:published_time","content":"2024-09-29T07:45:34.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-29T23:23:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"《SQL 必知必会》笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-29T07:45:34.000Z\\",\\"dateModified\\":\\"2024-09-29T23:23:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"第 1 课 了解 SQL","slug":"第-1-课-了解-sql","link":"#第-1-课-了解-sql","children":[{"level":3,"title":"数据库基础","slug":"数据库基础","link":"#数据库基础","children":[]},{"level":3,"title":"什么是 SQL","slug":"什么是-sql","link":"#什么是-sql","children":[]}]},{"level":2,"title":"第 2 课 检索数据","slug":"第-2-课-检索数据","link":"#第-2-课-检索数据","children":[]},{"level":2,"title":"第 3 课 排序检索数据","slug":"第-3-课-排序检索数据","link":"#第-3-课-排序检索数据","children":[]},{"level":2,"title":"第 4 课 过滤数据","slug":"第-4-课-过滤数据","link":"#第-4-课-过滤数据","children":[]},{"level":2,"title":"第 5 课 高级数据过滤","slug":"第-5-课-高级数据过滤","link":"#第-5-课-高级数据过滤","children":[{"level":3,"title":"组合 WHERE 子句","slug":"组合-where-子句","link":"#组合-where-子句","children":[]},{"level":3,"title":"IN 操作符","slug":"in-操作符","link":"#in-操作符","children":[]},{"level":3,"title":"NOT 操作符","slug":"not-操作符","link":"#not-操作符","children":[]}]},{"level":2,"title":"第 6 课 用通配符进行过滤","slug":"第-6-课-用通配符进行过滤","link":"#第-6-课-用通配符进行过滤","children":[{"level":3,"title":"百分号（%）通配符","slug":"百分号-通配符","link":"#百分号-通配符","children":[]},{"level":3,"title":"下划线（_）通配符","slug":"下划线-通配符","link":"#下划线-通配符","children":[]},{"level":3,"title":"方括号（[ ]）通配符","slug":"方括号-通配符","link":"#方括号-通配符","children":[]}]},{"level":2,"title":"第 7 课 创建计算字段","slug":"第-7-课-创建计算字段","link":"#第-7-课-创建计算字段","children":[{"level":3,"title":"拼接字段","slug":"拼接字段","link":"#拼接字段","children":[]},{"level":3,"title":"别名","slug":"别名","link":"#别名","children":[]},{"level":3,"title":"执行算术计算","slug":"执行算术计算","link":"#执行算术计算","children":[]}]},{"level":2,"title":"第 8 课 使用函数处理数据","slug":"第-8-课-使用函数处理数据","link":"#第-8-课-使用函数处理数据","children":[{"level":3,"title":"文本处理函数","slug":"文本处理函数","link":"#文本处理函数","children":[]},{"level":3,"title":"日期和时间处理函数","slug":"日期和时间处理函数","link":"#日期和时间处理函数","children":[]},{"level":3,"title":"数值处理函数","slug":"数值处理函数","link":"#数值处理函数","children":[]}]},{"level":2,"title":"第 9 课 汇总数据","slug":"第-9-课-汇总数据","link":"#第-9-课-汇总数据","children":[{"level":3,"title":"组合聚集函数","slug":"组合聚集函数","link":"#组合聚集函数","children":[]}]},{"level":2,"title":"第 10 课 分组数据","slug":"第-10-课-分组数据","link":"#第-10-课-分组数据","children":[]},{"level":2,"title":"第 11 课 使用子查询","slug":"第-11-课-使用子查询","link":"#第-11-课-使用子查询","children":[]},{"level":2,"title":"第 12 课 联结表","slug":"第-12-课-联结表","link":"#第-12-课-联结表","children":[]},{"level":2,"title":"第 13 课 创建高级联结","slug":"第-13-课-创建高级联结","link":"#第-13-课-创建高级联结","children":[]},{"level":2,"title":"第 14 课 组合查询","slug":"第-14-课-组合查询","link":"#第-14-课-组合查询","children":[]},{"level":2,"title":"第 15 课 插入数据","slug":"第-15-课-插入数据","link":"#第-15-课-插入数据","children":[]},{"level":2,"title":"第 16 课 更新和删除数据","slug":"第-16-课-更新和删除数据","link":"#第-16-课-更新和删除数据","children":[]},{"level":2,"title":"第 17 课 创建和操纵表","slug":"第-17-课-创建和操纵表","link":"#第-17-课-创建和操纵表","children":[{"level":3,"title":"更新表","slug":"更新表","link":"#更新表","children":[]},{"level":3,"title":"删除表","slug":"删除表","link":"#删除表","children":[]}]},{"level":2,"title":"第 18 课 使用视图","slug":"第-18-课-使用视图","link":"#第-18-课-使用视图","children":[]},{"level":2,"title":"第 19 课 使用存储过程","slug":"第-19-课-使用存储过程","link":"#第-19-课-使用存储过程","children":[]},{"level":2,"title":"第 20 课 管理事务处理","slug":"第-20-课-管理事务处理","link":"#第-20-课-管理事务处理","children":[]},{"level":2,"title":"第 21 课 使用游标","slug":"第-21-课-使用游标","link":"#第-21-课-使用游标","children":[]},{"level":2,"title":"第 22 课 高级 SQL 特性","slug":"第-22-课-高级-sql-特性","link":"#第-22-课-高级-sql-特性","children":[{"level":3,"title":"约束","slug":"约束","link":"#约束","children":[]},{"level":3,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":3,"title":"触发器","slug":"触发器","link":"#触发器","children":[]},{"level":3,"title":"数据库安全","slug":"数据库安全","link":"#数据库安全","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1727567361000,"updatedTime":1727652192000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":21.93,"words":6579},"filePathRelative":"99.笔记/12.数据库/SQL必知必会笔记.md","localizedDate":"2024年9月29日","excerpt":"<h1> 《SQL 必知必会》笔记</h1>\\n<h2> 第 1 课 了解 SQL</h2>\\n<h3> 数据库基础</h3>\\n<ul>\\n<li>数据库（database） - 保存有组织的数据的容器（通常是一个文件或一组文件）。</li>\\n<li>表（table） - 某种特定类型数据的结构化清单。</li>\\n<li>模式 - 关于数据库和表的布局及特性的信息。</li>\\n<li>列（column） - 表中的一个字段。所有表都是由一个或多个列组成的。</li>\\n<li>数据类型 - 所允许的数据的类型。每个表列都有相应的数据类型，它限制（或允许）该列中存储的数据。</li>\\n<li>行（row） - 表中的一个记录。</li>\\n<li>主键（primary key） - 一列（或一组列），其值能够唯一标识表中每一行。表中的任何列都可以作为主键，只要它满足以下条件：\\n<ul>\\n<li>任意两行都不具有相同的主键值；</li>\\n<li>每一行都必须具有一个主键值（主键列不允许 NULL 值）；</li>\\n<li>主键列中的值不允许修改或更新；</li>\\n<li>主键值不能重用（如果某行从表中删除，它的主键不能赋给以后的新行）。</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{l as data};