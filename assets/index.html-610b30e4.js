const e=JSON.parse('{"key":"v-09098140","path":"/pages/4ce1fe4e/","title":"分布式共识","lang":"zh-CN","frontmatter":{"title":"分布式共识","date":"2024-05-07T06:34:08.000Z","permalink":"/pages/4ce1fe4e/","category":["分布式","分布式协同","分布式协同综合"],"tag":["分布式","协同","共识","广播","epoch","quorum"],"description":"分布式共识 什么是分布式共识 分布式系统最重要的抽象之一就是共识（consensus）：所有的节点就某一项提议达成一致。 共识问题通常形式化如下：一个或多个节点可以提议（propose） 某些值，而集群中的所有有效节点根据共识算法进行协商，最终决议（decides） 采纳某个节点的提议。 而共识算法必须满足以下性质： 达成一致（Uniform agreement） - 没有两个节点的决定不同。 完整性（Integrity） - 每个节点最多决议一次。 有效性（Validity） - 如果一个节点决定了值 v ，则 v 由某个节点所提议。 终止（Termination） - 由所有未崩溃的节点来最终决议。","head":[["meta",{"property":"og:url","content":"https://dunwu.github.io/waterdrop/waterdrop/pages/4ce1fe4e/"}],["meta",{"property":"og:site_name","content":"钝悟"}],["meta",{"property":"og:title","content":"分布式共识"}],["meta",{"property":"og:description","content":"分布式共识 什么是分布式共识 分布式系统最重要的抽象之一就是共识（consensus）：所有的节点就某一项提议达成一致。 共识问题通常形式化如下：一个或多个节点可以提议（propose） 某些值，而集群中的所有有效节点根据共识算法进行协商，最终决议（decides） 采纳某个节点的提议。 而共识算法必须满足以下性质： 达成一致（Uniform agreement） - 没有两个节点的决定不同。 完整性（Integrity） - 每个节点最多决议一次。 有效性（Validity） - 如果一个节点决定了值 v ，则 v 由某个节点所提议。 终止（Termination） - 由所有未崩溃的节点来最终决议。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-29T23:17:22.000Z"}],["meta",{"property":"article:author","content":"钝悟"}],["meta",{"property":"article:tag","content":"分布式"}],["meta",{"property":"article:tag","content":"协同"}],["meta",{"property":"article:tag","content":"共识"}],["meta",{"property":"article:tag","content":"广播"}],["meta",{"property":"article:tag","content":"epoch"}],["meta",{"property":"article:tag","content":"quorum"}],["meta",{"property":"article:published_time","content":"2024-05-07T06:34:08.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-29T23:17:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式共识\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-07T06:34:08.000Z\\",\\"dateModified\\":\\"2024-12-29T23:17:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"钝悟\\",\\"url\\":\\"https://dunwu.github.io/waterdrop\\"}]}"]]},"headers":[{"level":2,"title":"什么是分布式共识","slug":"什么是分布式共识","link":"#什么是分布式共识","children":[]},{"level":2,"title":"为什么需要分布式共识","slug":"为什么需要分布式共识","link":"#为什么需要分布式共识","children":[]},{"level":2,"title":"一致性保证","slug":"一致性保证","link":"#一致性保证","children":[]},{"level":2,"title":"线性化","slug":"线性化","link":"#线性化","children":[]},{"level":2,"title":"顺序保证","slug":"顺序保证","link":"#顺序保证","children":[]},{"level":2,"title":"分布式共识能否达成","slug":"分布式共识能否达成","link":"#分布式共识能否达成","children":[]},{"level":2,"title":"分布式共识算法","slug":"分布式共识算法","link":"#分布式共识算法","children":[{"level":3,"title":"全序广播","slug":"全序广播","link":"#全序广播","children":[]},{"level":3,"title":"主从复制和共识","slug":"主从复制和共识","link":"#主从复制和共识","children":[]},{"level":3,"title":"纪元和法定人数","slug":"纪元和法定人数","link":"#纪元和法定人数","children":[]},{"level":3,"title":"共识的局限性","slug":"共识的局限性","link":"#共识的局限性","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1734395124000,"updatedTime":1735514242000,"contributors":[{"name":"dunwu","email":"forbreak@163.com","commits":2}]},"readingTime":{"minutes":10.78,"words":3235},"filePathRelative":"15.分布式/11.分布式协同/01.分布式协同综合/分布式共识.md","localizedDate":"2024年5月7日","excerpt":"<h1> 分布式共识</h1>\\n<h2> 什么是分布式共识</h2>\\n<p>分布式系统最重要的抽象之一就是<strong>共识（consensus）：所有的节点就某一项提议达成一致</strong>。</p>\\n<p>共识问题通常形式化如下：一个或多个节点可以<strong>提议（propose）</strong> 某些值，而集群中的所有有效节点根据共识算法进行协商，最终<strong>决议（decides）</strong> 采纳某个节点的提议。</p>\\n<p>而共识算法必须满足以下性质：</p>\\n<ol>\\n<li>达成一致（Uniform agreement） - 没有两个节点的决定不同。</li>\\n<li>完整性（Integrity） - 每个节点最多决议一次。</li>\\n<li>有效性（Validity） - 如果一个节点决定了值 <code>v</code> ，则 <code>v</code> 由某个节点所提议。</li>\\n<li>终止（Termination） - 由所有未崩溃的节点来最终决议。</li>\\n</ol>","autoDesc":true}');export{e as data};