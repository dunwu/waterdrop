const l=JSON.parse('{"key":"v-5bfbdfdc","path":"/pages/02c18ea3/","title":"javalib-log","lang":"zh-CN","frontmatter":{"title":"javalib-log","date":"2022-02-17T22:34:30.000Z","order":1,"permalink":"/pages/02c18ea3/","category":["Java","工具","其他"],"tag":["Java","日志"],"description":"细说 Java 主流日志工具库 在项目开发中，为了跟踪代码的运行情况，常常要使用日志来记录信息。 在 Java 世界，有很多的日志工具库来实现日志功能，避免了我们重复造轮子。 我们先来逐一了解一下主流日志工具。 日志框架 java.util.logging (JUL) JDK1.4 开始，通过 java.util.logging 提供日志功能。 它能满足基本的日志需要，但是功能没有 Log4j 强大，而且使用范围也没有 Log4j 广泛。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/02c18ea3/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"javalib-log"}],["meta",{"property":"og:description","content":"细说 Java 主流日志工具库 在项目开发中，为了跟踪代码的运行情况，常常要使用日志来记录信息。 在 Java 世界，有很多的日志工具库来实现日志功能，避免了我们重复造轮子。 我们先来逐一了解一下主流日志工具。 日志框架 java.util.logging (JUL) JDK1.4 开始，通过 java.util.logging 提供日志功能。 它能满足基本的日志需要，但是功能没有 Log4j 强大，而且使用范围也没有 Log4j 广泛。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-18T15:46:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"日志"}],["meta",{"property":"article:published_time","content":"2022-02-17T22:34:30.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-18T15:46:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"javalib-log\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-17T22:34:30.000Z\\",\\"dateModified\\":\\"2024-06-18T15:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"日志框架","slug":"日志框架","link":"#日志框架","children":[{"level":3,"title":"java.util.logging (JUL)","slug":"java-util-logging-jul","link":"#java-util-logging-jul","children":[]},{"level":3,"title":"Log4j","slug":"log4j","link":"#log4j","children":[]},{"level":3,"title":"Logback","slug":"logback","link":"#logback","children":[]},{"level":3,"title":"Log4j2","slug":"log4j2","link":"#log4j2","children":[]},{"level":3,"title":"Log4j vs Logback vs Log4j2","slug":"log4j-vs-logback-vs-log4j2","link":"#log4j-vs-logback-vs-log4j2","children":[]}]},{"level":2,"title":"日志门面","slug":"日志门面","link":"#日志门面","children":[{"level":3,"title":"common-logging","slug":"common-logging","link":"#common-logging","children":[]},{"level":3,"title":"slf4j","slug":"slf4j","link":"#slf4j","children":[]},{"level":3,"title":"common-logging vs slf4j","slug":"common-logging-vs-slf4j","link":"#common-logging-vs-slf4j","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]},{"level":2,"title":"实施日志解决方案","slug":"实施日志解决方案","link":"#实施日志解决方案","children":[{"level":3,"title":"引入 jar 包","slug":"引入-jar-包","link":"#引入-jar-包","children":[]},{"level":3,"title":"使用 API","slug":"使用-api","link":"#使用-api","children":[]}]},{"level":2,"title":"log4j2 配置","slug":"log4j2-配置","link":"#log4j2-配置","children":[]},{"level":2,"title":"logback 配置","slug":"logback-配置","link":"#logback-配置","children":[{"level":3,"title":"<configuration>","slug":"configuration","link":"#configuration","children":[]},{"level":3,"title":"<appender>","slug":"appender","link":"#appender","children":[]},{"level":3,"title":"<logger>","slug":"logger","link":"#logger","children":[]},{"level":3,"title":"<root>","slug":"root","link":"#root","children":[]},{"level":3,"title":"完整的 logback.xml 参考示例","slug":"完整的-logback-xml-参考示例","link":"#完整的-logback-xml-参考示例","children":[]}]},{"level":2,"title":"log4j 配置","slug":"log4j-配置","link":"#log4j-配置","children":[{"level":3,"title":"完整的 log4j.xml 参考示例","slug":"完整的-log4j-xml-参考示例","link":"#完整的-log4j-xml-参考示例","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1655247928000,"updatedTime":1718725582000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":3}]},"readingTime":{"minutes":13.32,"words":3996},"filePathRelative":"01.Java/12.工具/99.其他/01.Java日志.md","localizedDate":"2022年2月17日","excerpt":"<h1> 细说 Java 主流日志工具库</h1>\\n<blockquote>\\n<p>在项目开发中，为了跟踪代码的运行情况，常常要使用日志来记录信息。</p>\\n<p>在 Java 世界，有很多的日志工具库来实现日志功能，避免了我们重复造轮子。</p>\\n<p>我们先来逐一了解一下主流日志工具。</p>\\n</blockquote>\\n<h2> 日志框架</h2>\\n<h3> java.util.logging (JUL)</h3>\\n<p>JDK1.4 开始，通过 <code>java.util.logging</code> 提供日志功能。</p>\\n<p>它能满足基本的日志需要，但是功能没有 Log4j 强大，而且使用范围也没有 Log4j 广泛。</p>","autoDesc":true}');export{l as data};