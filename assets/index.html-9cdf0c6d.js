const t=JSON.parse('{"key":"v-3dccae9c","path":"/pages/568352/","title":"SpringBoot 之安全快速入门","lang":"zh-CN","frontmatter":{"title":"SpringBoot 之安全快速入门","date":"2021-05-13T18:21:56.000Z","order":1,"permalink":"/pages/568352/","category":["Java","框架","Spring","Spring安全"],"tag":["Java","框架","Spring","SpringBoot","安全"],"description":"SpringBoot 之安全快速入门 QuickStart （1）添加依赖 \\t\\t&lt;dependency&gt; \\t\\t\\t&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; \\t\\t\\t&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt; \\t\\t&lt;/dependency&gt; \\t\\t&lt;dependency&gt; \\t\\t\\t&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; \\t\\t\\t&lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt; \\t\\t&lt;/dependency&gt;","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/pages/568352/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"SpringBoot 之安全快速入门"}],["meta",{"property":"og:description","content":"SpringBoot 之安全快速入门 QuickStart （1）添加依赖 \\t\\t&lt;dependency&gt; \\t\\t\\t&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; \\t\\t\\t&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt; \\t\\t&lt;/dependency&gt; \\t\\t&lt;dependency&gt; \\t\\t\\t&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt; \\t\\t\\t&lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt; \\t\\t&lt;/dependency&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-12T15:46:40.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"框架"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"SpringBoot"}],["meta",{"property":"article:tag","content":"安全"}],["meta",{"property":"article:published_time","content":"2021-05-13T18:21:56.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-12T15:46:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot 之安全快速入门\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-05-13T18:21:56.000Z\\",\\"dateModified\\":\\"2023-10-12T15:46:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"QuickStart","slug":"quickstart","link":"#quickstart","children":[]}],"git":{"createdTime":1697125600000,"updatedTime":1697125600000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":1}]},"readingTime":{"minutes":0.46,"words":138},"filePathRelative":"01.Java/13.框架/01.Spring/10.Spring安全/01.SpringBoot之安全快速入门.md","localizedDate":"2021年5月13日","excerpt":"<h1> SpringBoot 之安全快速入门</h1>\\n<h2> QuickStart</h2>\\n<p>（1）添加依赖</p>\\n<div class=\\"language-xml line-numbers-mode\\" data-ext=\\"xml\\"><pre class=\\"language-xml\\"><code>\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>org.springframework.boot<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>spring-boot-starter-web<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>org.springframework.boot<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>spring-boot-starter-security<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\t\\t<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};