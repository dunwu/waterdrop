import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as i,c as l,a as e,b as a,d as r,e as t}from"./app-8e5f1cb5.js";const c={},o=t(`<h1 id="elasticsearch-优化" tabindex="-1"><a class="header-anchor" href="#elasticsearch-优化" aria-hidden="true">#</a> Elasticsearch 优化</h1><p>Elasticsearch 是当前流行的企业级搜索引擎，设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。作为一个开箱即用的产品，在生产环境上线之后，我们其实不一定能确保其的性能和稳定性。如何根据实际情况提高服务的性能，其实有很多技巧。这章我们分享从实战经验中总结出来的 elasticsearch 性能优化，主要从硬件配置优化、索引优化设置、查询方面优化、数据结构优化、集群架构优化等方面讲解。</p><h2 id="硬件配置优化" tabindex="-1"><a class="header-anchor" href="#硬件配置优化" aria-hidden="true">#</a> 硬件配置优化</h2><p>升级硬件设备配置一直都是提高服务能力最快速有效的手段，在系统层面能够影响应用性能的一般包括三个因素：CPU、内存和 IO，可以从这三方面进行 ES 的性能优化工作。</p><h3 id="cpu-配置" tabindex="-1"><a class="header-anchor" href="#cpu-配置" aria-hidden="true">#</a> CPU 配置</h3><p>一般说来，CPU 繁忙的原因有以下几个：</p><ol><li>线程中有无限空循环、无阻塞、正则匹配或者单纯的计算；</li><li>发生了频繁的 GC；</li><li>多线程的上下文切换；</li></ol><p>大多数 Elasticsearch 部署往往对 CPU 要求不高。因此，相对其它资源，具体配置多少个（CPU）不是那么关键。你应该选择具有多个内核的现代处理器，常见的集群使用 2 到 8 个核的机器。<strong>如果你要在更快的 CPUs 和更多的核数之间选择，选择更多的核数更好</strong>。多个内核提供的额外并发远胜过稍微快一点点的时钟频率。</p><h3 id="内存配置" tabindex="-1"><a class="header-anchor" href="#内存配置" aria-hidden="true">#</a> 内存配置</h3><p>如果有一种资源是最先被耗尽的，它可能是内存。排序和聚合都很耗内存，所以有足够的堆空间来应付它们是很重要的。即使堆空间是比较小的时候，也能为操作系统文件缓存提供额外的内存。因为 Lucene 使用的许多数据结构是基于磁盘的格式，Elasticsearch 利用操作系统缓存能产生很大效果。</p><p><strong>64 GB 内存的机器是非常理想的</strong>，但是 32 GB 和 16 GB 机器也是很常见的。少于 8 GB 会适得其反（你最终需要很多很多的小机器），大于 64 GB 的机器也会有问题。</p><p>由于 ES 构建基于 lucene，而 lucene 设计强大之处在于 lucene 能够很好的利用操作系统内存来缓存索引数据，以提供快速的查询性能。lucene 的索引文件 segements 是存储在单文件中的，并且不可变，对于 OS 来说，能够很友好地将索引文件保持在 cache 中，以便快速访问；因此，我们很有必要将一半的物理内存留给 lucene；另一半的物理内存留给 ES（JVM heap）。</p><h4 id="内存分配" tabindex="-1"><a class="header-anchor" href="#内存分配" aria-hidden="true">#</a> 内存分配</h4><p>当机器内存小于 64G 时，遵循通用的原则，50% 给 ES，50% 留给 lucene。</p><p>当机器内存大于 64G 时，遵循以下原则：</p><ul><li>如果主要的使用场景是全文检索，那么建议给 ES Heap 分配 4~32G 的内存即可；其它内存留给操作系统，供 lucene 使用（segments cache），以提供更快的查询性能。</li><li>如果主要的使用场景是聚合或排序，并且大多数是 numerics，dates，geo_points 以及 not_analyzed 的字符类型，建议分配给 ES Heap 分配 4~32G 的内存即可，其它内存留给操作系统，供 lucene 使用，提供快速的基于文档的聚类、排序性能。</li><li>如果使用场景是聚合或排序，并且都是基于 analyzed 字符数据，这时需要更多的 heap size，建议机器上运行多 ES 实例，每个实例保持不超过 50% 的 ES heap 设置（但不超过 32 G，堆内存设置 32 G 以下时，JVM 使用对象指标压缩技巧节省空间），50% 以上留给 lucene。</li></ul><h4 id="禁止-swap" tabindex="-1"><a class="header-anchor" href="#禁止-swap" aria-hidden="true">#</a> 禁止 swap</h4><p>禁止 swap，一旦允许内存与磁盘的交换，会引起致命的性能问题。可以通过在 elasticsearch.yml 中 <code>bootstrap.memory_lock: true</code>，以保持 JVM 锁定内存，保证 ES 的性能。</p><h4 id="gc-设置" tabindex="-1"><a class="header-anchor" href="#gc-设置" aria-hidden="true">#</a> GC 设置</h4><p>保持 GC 的现有设置，默认设置为：Concurrent-Mark and Sweep（CMS），别换成 G1 GC，因为目前 G1 还有很多 BUG。</p><p>保持线程池的现有设置，目前 ES 的线程池较 1.X 有了较多优化设置，保持现状即可；默认线程池大小等于 CPU 核心数。如果一定要改，按公式 ( ( CPU 核心数 * 3 ) / 2 ) + 1 设置；不能超过 CPU 核心数的 2 倍；但是不建议修改默认配置，否则会对 CPU 造成硬伤。</p><h3 id="磁盘" tabindex="-1"><a class="header-anchor" href="#磁盘" aria-hidden="true">#</a> 磁盘</h3><p>硬盘对所有的集群都很重要，对大量写入的集群更是加倍重要（例如那些存储日志数据的）。硬盘是服务器上最慢的子系统，这意味着那些写入量很大的集群很容易让硬盘饱和，使得它成为集群的瓶颈。</p><p><strong>在经济压力能承受的范围下，尽量使用固态硬盘（SSD）</strong>。固态硬盘相比于任何旋转介质（机械硬盘，磁带等），无论随机写还是顺序写，都会对 IO 有较大的提升。</p><blockquote><p>如果你正在使用 SSDs，确保你的系统 I/O 调度程序是配置正确的。当你向硬盘写数据，I/O 调度程序决定何时把数据实际发送到硬盘。大多数默认 *nix 发行版下的调度程序都叫做 cfq（完全公平队列）。</p><p>调度程序分配时间片到每个进程。并且优化这些到硬盘的众多队列的传递。但它是为旋转介质优化的：机械硬盘的固有特性意味着它写入数据到基于物理布局的硬盘会更高效。</p><p>这对 SSD 来说是低效的，尽管这里没有涉及到机械硬盘。但是，deadline 或者 noop 应该被使用。deadline 调度程序基于写入等待时间进行优化，noop 只是一个简单的 FIFO 队列。</p><p>这个简单的更改可以带来显著的影响。仅仅是使用正确的调度程序，我们看到了 500 倍的写入能力提升。</p></blockquote><p><strong>如果你使用旋转介质（如机械硬盘），尝试获取尽可能快的硬盘（高性能服务器硬盘，15k RPM 驱动器）</strong>。</p><p><strong>使用 RAID0 是提高硬盘速度的有效途径，对机械硬盘和 SSD 来说都是如此</strong>。没有必要使用镜像或其它 RAID 变体，因为 Elasticsearch 在自身层面通过副本，已经提供了备份的功能，所以不需要利用磁盘的备份功能，同时如果使用磁盘备份功能的话，对写入速度有较大的影响。</p><p><strong>最后，避免使用网络附加存储（NAS）</strong>。人们常声称他们的 NAS 解决方案比本地驱动器更快更可靠。除却这些声称，我们从没看到 NAS 能配得上它的大肆宣传。NAS 常常很慢，显露出更大的延时和更宽的平均延时方差，而且它是单点故障的。</p><h2 id="索引优化设置" tabindex="-1"><a class="header-anchor" href="#索引优化设置" aria-hidden="true">#</a> 索引优化设置</h2><p>索引优化主要是在 Elasticsearch 的插入层面优化，Elasticsearch 本身索引速度其实还是蛮快的，具体数据，我们可以参考官方的 benchmark 数据。我们可以根据不同的需求，针对索引优化。</p><h3 id="批量提交" tabindex="-1"><a class="header-anchor" href="#批量提交" aria-hidden="true">#</a> 批量提交</h3><p>当有大量数据提交的时候，建议采用批量提交（Bulk 操作）；此外使用 bulk 请求时，每个请求不超过几十 M，因为太大会导致内存使用过大。</p><p>比如在做 ELK 过程中，Logstash indexer 提交数据到 Elasticsearch 中，batch size 就可以作为一个优化功能点。但是优化 size 大小需要根据文档大小和服务器性能而定。</p><p>像 Logstash 中提交文档大小超过 20MB，Logstash 会将一个批量请求切分为多个批量请求。</p><p>如果在提交过程中，遇到 EsRejectedExecutionException 异常的话，则说明集群的索引性能已经达到极限了。这种情况，要么提高服务器集群的资源，要么根据业务规则，减少数据收集速度，比如只收集 Warn、Error 级别以上的日志。</p><h3 id="增加-refresh-时间间隔" tabindex="-1"><a class="header-anchor" href="#增加-refresh-时间间隔" aria-hidden="true">#</a> 增加 Refresh 时间间隔</h3><p>为了提高索引性能，Elasticsearch 在写入数据的时候，采用延迟写入的策略，即数据先写到内存中，当超过默认 1 秒（index.refresh_interval）会进行一次写入操作，就是将内存中 segment 数据刷新到磁盘中，此时我们才能将数据搜索出来，所以这就是为什么 Elasticsearch 提供的是近实时搜索功能，而不是实时搜索功能。</p><p>如果我们的系统对数据延迟要求不高的话，我们<strong>可以通过延长 refresh 时间间隔，可以有效地减少 segment 合并压力，提高索引速度</strong>。比如在做全链路跟踪的过程中，我们就将 <code>index.refresh_interval</code> 设置为 30s，减少 refresh 次数。再如，在进行全量索引时，可以将 refresh 次数临时关闭，即 <code>index.refresh_interval</code> 设置为-1，数据导入成功后再打开到正常模式，比如 30s。</p><blockquote><p>在加载大量数据时候可以暂时不用 refresh 和 repliccas，index.refresh_interval 设置为-1，index.number_of_replicas 设置为 0。</p></blockquote><h3 id="修改-index-buffer-size-的设置" tabindex="-1"><a class="header-anchor" href="#修改-index-buffer-size-的设置" aria-hidden="true">#</a> 修改 index_buffer_size 的设置</h3><p>索引缓冲的设置可以控制多少内存分配给索引进程。这是一个全局配置，会应用于一个节点上所有不同的分片上。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">indices.memory.index_buffer_size</span><span class="token punctuation">:</span> 10%
<span class="token key atrule">indices.memory.min_index_buffer_size</span><span class="token punctuation">:</span> 48mb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>indices.memory.index_buffer_size</code> 接受一个百分比或者一个表示字节大小的值。默认是 10%，意味着分配给节点的总内存的 10%用来做索引缓冲的大小。这个数值被分到不同的分片（shards）上。如果设置的是百分比，还可以设置 <code>min_index_buffer_size</code> （默认 48mb）和 <code>max_index_buffer_size</code>（默认没有上限）。</p><h3 id="修改-translog-相关的设置" tabindex="-1"><a class="header-anchor" href="#修改-translog-相关的设置" aria-hidden="true">#</a> 修改 translog 相关的设置</h3><p>一是控制数据从内存到硬盘的操作频率，以减少硬盘 IO。可将 sync_interval 的时间设置大一些。默认为 5s。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">index.translog.sync_interval</span><span class="token punctuation">:</span> 5s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以控制 tranlog 数据块的大小，达到 threshold 大小时，才会 flush 到 lucene 索引文件。默认为 512m。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">index.translog.flush_threshold_size</span><span class="token punctuation">:</span> 512mb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="注意-id-字段的使用" tabindex="-1"><a class="header-anchor" href="#注意-id-字段的使用" aria-hidden="true">#</a> 注意 _id 字段的使用</h3><p>_id 字段的使用，应尽可能避免自定义 _id，以避免针对 ID 的版本管理；建议使用 ES 的默认 ID 生成策略或使用数字类型 ID 做为主键。</p><h3 id="注意-all-字段及-source-字段的使用" tabindex="-1"><a class="header-anchor" href="#注意-all-字段及-source-字段的使用" aria-hidden="true">#</a> 注意 _all 字段及 _source 字段的使用</h3><p>**_**all 字段及 _source 字段的使用，应该注意场景和需要，_all 字段包含了所有的索引字段，方便做全文检索，如果无此需求，可以禁用；_source 存储了原始的 document 内容，如果没有获取原始文档数据的需求，可通过设置 includes、excludes 属性来定义放入 _source 的字段。</p><h3 id="合理的配置使用-index-属性" tabindex="-1"><a class="header-anchor" href="#合理的配置使用-index-属性" aria-hidden="true">#</a> 合理的配置使用 index 属性</h3><p>合理的配置使用 index 属性，analyzed 和 not_analyzed，根据业务需求来控制字段是否分词或不分词。只有 groupby 需求的字段，配置时就设置成 not_analyzed，以提高查询或聚类的效率。</p><h3 id="减少副本数量" tabindex="-1"><a class="header-anchor" href="#减少副本数量" aria-hidden="true">#</a> 减少副本数量</h3><p>Elasticsearch 默认副本数量为 3 个，虽然这样会提高集群的可用性，增加搜索的并发数，但是同时也会影响写入索引的效率。</p><p>在索引过程中，需要把更新的文档发到副本节点上，等副本节点生效后在进行返回结束。使用 Elasticsearch 做业务搜索的时候，建议副本数目还是设置为 3 个，但是像内部 ELK 日志系统、分布式跟踪系统中，完全可以将副本数目设置为 1 个。</p><h2 id="查询方面优化" tabindex="-1"><a class="header-anchor" href="#查询方面优化" aria-hidden="true">#</a> 查询方面优化</h2><p>Elasticsearch 作为业务搜索的近实时查询时，查询效率的优化显得尤为重要。</p><h3 id="路由优化" tabindex="-1"><a class="header-anchor" href="#路由优化" aria-hidden="true">#</a> 路由优化</h3><p>当我们查询文档的时候，Elasticsearch 如何知道一个文档应该存放到哪个分片中呢？它其实是通过下面这个公式来计算出来的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>shard = hash(routing) % number_of_primary_shards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>routing 默认值是文档的 id，也可以采用自定义值，比如用户 ID。</p><h4 id="不带-routing-查询" tabindex="-1"><a class="header-anchor" href="#不带-routing-查询" aria-hidden="true">#</a> 不带 routing 查询</h4><p>在查询的时候因为不知道要查询的数据具体在哪个分片上，所以整个过程分为 2 个步骤：</p><ol><li>分发：请求到达协调节点后，协调节点将查询请求分发到每个分片上。</li><li>聚合：协调节点搜集到每个分片上查询结果，再将查询的结果进行排序，之后给用户返回结果。</li></ol><h4 id="带-routing-查询" tabindex="-1"><a class="header-anchor" href="#带-routing-查询" aria-hidden="true">#</a> 带 routing 查询</h4><p>查询的时候，可以直接根据 routing 信息定位到某个分配查询，不需要查询所有的分配，经过协调节点排序。</p><p>向上面自定义的用户查询，如果 routing 设置为 userid 的话，就可以直接查询出数据来，效率提升很多。</p><h3 id="filter-vs-query" tabindex="-1"><a class="header-anchor" href="#filter-vs-query" aria-hidden="true">#</a> Filter VS Query</h3><p>尽可能使用过滤器上下文（Filter）替代查询上下文（Query）</p><ul><li>Query：此文档与此查询子句的匹配程度如何？</li><li>Filter：此文档和查询子句匹配吗？</li></ul><p>Elasticsearch 针对 Filter 查询只需要回答“是”或者“否”，不需要像 Query 查询一样计算相关性分数，同时 Filter 结果可以缓存。</p><h3 id="深度翻页" tabindex="-1"><a class="header-anchor" href="#深度翻页" aria-hidden="true">#</a> 深度翻页</h3><p>在使用 Elasticsearch 过程中，应尽量避免大翻页的出现。</p><p>正常翻页查询都是从 from 开始 size 条数据，这样就需要在每个分片中查询打分排名在前面的 from+size 条数据。协同节点收集每个分配的前 from+size 条数据。协同节点一共会受到 N*(from+size) 条数据，然后进行排序，再将其中 from 到 from+size 条数据返回出去。如果 from 或者 size 很大的话，导致参加排序的数量会同步扩大很多，最终会导致 CPU 资源消耗增大。</p><p>可以通过使用 Elasticsearch scroll 和 scroll-scan 高效滚动的方式来解决这样的问题。</p><p>也可以结合实际业务特点，文档 id 大小如果和文档创建时间是一致有序的，可以以文档 id 作为分页的偏移量，并将其作为分页查询的一个条件。</p><h3 id="脚本-script-合理使用" tabindex="-1"><a class="header-anchor" href="#脚本-script-合理使用" aria-hidden="true">#</a> 脚本（script）合理使用</h3>`,79),h={href:"https://www.knowledgedict.com/tutorial/elasticsearch-script.html",target:"_blank",rel:"noopener noreferrer"},p=t(`<h2 id="数据结构优化" tabindex="-1"><a class="header-anchor" href="#数据结构优化" aria-hidden="true">#</a> 数据结构优化</h2><p>基于 Elasticsearch 的使用场景，文档数据结构尽量和使用场景进行结合，去掉没用及不合理的数据。</p><h3 id="尽量减少不需要的字段" tabindex="-1"><a class="header-anchor" href="#尽量减少不需要的字段" aria-hidden="true">#</a> 尽量减少不需要的字段</h3><p>如果 Elasticsearch 用于业务搜索服务，一些不需要用于搜索的字段最好不存到 ES 中，这样即节省空间，同时在相同的数据量下，也能提高搜索性能。</p><p>避免使用动态值作字段，动态递增的 mapping，会导致集群崩溃；同样，也需要控制字段的数量，业务中不使用的字段，就不要索引。控制索引的字段数量、mapping 深度、索引字段的类型，对于 ES 的性能优化是重中之重。</p><p>以下是 ES 关于字段数、mapping 深度的一些默认设置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">index.mapping.nested_objects.limit</span><span class="token punctuation">:</span> <span class="token number">10000</span>
<span class="token key atrule">index.mapping.total_fields.limit</span><span class="token punctuation">:</span> <span class="token number">1000</span>
<span class="token key atrule">index.mapping.depth.limit</span><span class="token punctuation">:</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nested-object-vs-parent-child" tabindex="-1"><a class="header-anchor" href="#nested-object-vs-parent-child" aria-hidden="true">#</a> Nested Object vs Parent/Child</h3><p>尽量避免使用 nested 或 parent/child 的字段，能不用就不用；nested query 慢，parent/child query 更慢，比 nested query 慢上百倍；因此能在 mapping 设计阶段搞定的（大宽表设计或采用比较 smart 的数据结构），就不要用父子关系的 mapping。</p><p>如果一定要使用 nested fields，保证 nested fields 字段不能过多，目前 ES 默认限制是 50。因为针对 1 个 document，每一个 nested field，都会生成一个独立的 document，这将使 doc 数量剧增，影响查询效率，尤其是 JOIN 的效率。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">index.mapping.nested_fields.limit</span><span class="token punctuation">:</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><thead><tr><th style="text-align:left;">对比</th><th style="text-align:left;">Nested Object</th><th style="text-align:left;">Parent/Child</th></tr></thead><tbody><tr><td style="text-align:left;">优点</td><td style="text-align:left;">文档存储在一起，因此读取性高</td><td style="text-align:left;">父子文档可以独立更新，互不影响</td></tr><tr><td style="text-align:left;">缺点</td><td style="text-align:left;">更新父文档或子文档时需要更新整个文档</td><td style="text-align:left;">为了维护 join 关系，需要占用部分内存，读取性能较差</td></tr><tr><td style="text-align:left;">场景</td><td style="text-align:left;">子文档偶尔更新，查询频繁</td><td style="text-align:left;">子文档更新频繁</td></tr></tbody></table><h3 id="选择静态映射-非必需时-禁止动态映射" tabindex="-1"><a class="header-anchor" href="#选择静态映射-非必需时-禁止动态映射" aria-hidden="true">#</a> 选择静态映射，非必需时，禁止动态映射</h3><p>尽量避免使用动态映射，这样有可能会导致集群崩溃，此外，动态映射有可能会带来不可控制的数据类型，进而有可能导致在查询端出现相关异常，影响业务。</p><p>此外，Elasticsearch 作为搜索引擎时，主要承载 query 的匹配和排序的功能，那数据的存储类型基于这两种功能的用途分为两类，一是需要匹配的字段，用来建立倒排索引对 query 匹配用，另一类字段是用做粗排用到的特征字段，如 ctr、点击数、评论数等等。</p><h2 id="集群架构设计" tabindex="-1"><a class="header-anchor" href="#集群架构设计" aria-hidden="true">#</a> 集群架构设计</h2><p>合理的部署 Elasticsearch 有助于提高服务的整体可用性。</p><h3 id="主节点、数据节点和协调节点分离" tabindex="-1"><a class="header-anchor" href="#主节点、数据节点和协调节点分离" aria-hidden="true">#</a> 主节点、数据节点和协调节点分离</h3><p>Elasticsearch 集群在架构拓朴时，采用主节点、数据节点和负载均衡节点分离的架构，在 5.x 版本以后，又可将数据节点再细分为“Hot-Warm”的架构模式。</p><p>Elasticsearch 的配置文件中有 2 个参数，node.master 和 node.data。这两个参数搭配使用时，能够帮助提供服务器性能。</p><h4 id="主-master-节点" tabindex="-1"><a class="header-anchor" href="#主-master-节点" aria-hidden="true">#</a> 主（master）节点</h4><p>配置 <code>node.master:true</code> 和 <code>node.data:false</code>，该 node 服务器只作为一个主节点，但不存储任何索引数据。我们推荐每个集群运行 3 个专用的 master 节点来提供最好的弹性。使用时，你还需要将 <code>discovery.zen.minimum_master_nodes setting</code> 参数设置为 2，以免出现脑裂（split-brain）的情况。用 3 个专用的 master 节点，专门负责处理集群的管理以及加强状态的整体稳定性。因为这 3 个 master 节点不包含数据也不会实际参与搜索以及索引操作，在 JVM 上它们不用做相同的事，例如繁重的索引或者耗时，资源耗费很大的搜索。因此不太可能会因为垃圾回收而导致停顿。因此，master 节点的 CPU，内存以及磁盘配置可以比 data 节点少很多的。</p><h4 id="数据-data-节点" tabindex="-1"><a class="header-anchor" href="#数据-data-节点" aria-hidden="true">#</a> 数据（data）节点</h4><p>配置 <code>node.master:false</code> 和 <code>node.data:true</code>，该 node 服务器只作为一个数据节点，只用于存储索引数据，使该 node 服务器功能单一，只用于数据存储和数据查询，降低其资源消耗率。</p><p>在 Elasticsearch 5.x 版本之后，data 节点又可再细分为“Hot-Warm”架构，即分为热节点（hot node）和暖节点（warm node）。</p><p>hot 节点：</p><p>hot 节点主要是索引节点（写节点），同时会保存近期的一些频繁被查询的索引。由于进行索引非常耗费 CPU 和 IO，即属于 IO 和 CPU 密集型操作，建议使用 SSD 的磁盘类型，保持良好的写性能；我们推荐部署最小化的 3 个 hot 节点来保证高可用性。根据近期需要收集以及查询的数据量，可以增加服务器数量来获得想要的性能。</p><p>将节点设置为 hot 类型需要 elasticsearch.yml 如下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node.attr.box_type: hot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是针对指定的 index 操作，可以通过 settings 设置 <code>index.routing.allocation.require.box_type: hot</code> 将索引写入 hot 节点。</p><p>warm 节点：</p><p>这种类型的节点是为了处理大量的，而且不经常访问的只读索引而设计的。由于这些索引是只读的，warm 节点倾向于挂载大量磁盘（普通磁盘）来替代 SSD。内存、CPU 的配置跟 hot 节点保持一致即可；节点数量一般也是大于等于 3 个。</p><p>将节点设置为 warm 类型需要 elasticsearch.yml 如下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node.attr.box_type: warm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时，也可以在 elasticsearch.yml 中设置 <code>index.codec:best_compression</code> 保证 warm 节点的压缩配置。</p><p>当索引不再被频繁查询时，可通过 <code>index.routing.allocation.require.box_type:warm</code>，将索引标记为 warm，从而保证索引不写入 hot 节点，以便将 SSD 磁盘资源用在刀刃上。一旦设置这个属性，ES 会自动将索引合并到 warm 节点。</p><h4 id="协调-coordinating-节点" tabindex="-1"><a class="header-anchor" href="#协调-coordinating-节点" aria-hidden="true">#</a> 协调（coordinating）节点</h4><p>协调节点用于做分布式里的协调，将各分片或节点返回的数据整合后返回。该节点不会被选作主节点，也不会存储任何索引数据。该服务器主要用于查询负载均衡。在查询的时候，通常会涉及到从多个 node 服务器上查询数据，并将请求分发到多个指定的 node 服务器，并对各个 node 服务器返回的结果进行一个汇总处理，最终返回给客户端。在 ES 集群中，所有的节点都有可能是协调节点，但是，可以通过设置 <code>node.master</code>、<code>node.data</code>、<code>node.ingest</code> 都为 <code>false</code> 来设置专门的协调节点。需要较好的 CPU 和较高的内存。</p><ul><li>node.master:false 和 node.data:true，该 node 服务器只作为一个数据节点，只用于存储索引数据，使该 node 服务器功能单一，只用于数据存储和数据查询，降低其资源消耗率。</li><li>node.master:true 和 node.data:false，该 node 服务器只作为一个主节点，但不存储任何索引数据，该 node 服务器将使用自身空闲的资源，来协调各种创建索引请求或者查询请求，并将这些请求合理分发到相关的 node 服务器上。</li><li>node.master:false 和 node.data:false，该 node 服务器即不会被选作主节点，也不会存储任何索引数据。该服务器主要用于查询负载均衡。在查询的时候，通常会涉及到从多个 node 服务器上查询数据，并将请求分发到多个指定的 node 服务器，并对各个 node 服务器返回的结果进行一个汇总处理，最终返回给客户端。</li></ul><h3 id="关闭-data-节点服务器中的-http-功能" tabindex="-1"><a class="header-anchor" href="#关闭-data-节点服务器中的-http-功能" aria-hidden="true">#</a> 关闭 data 节点服务器中的 http 功能</h3><p>针对 Elasticsearch 集群中的所有数据节点，不用开启 http 服务。将其中的配置参数这样设置，<code>http.enabled:false</code>，同时也不要安装 head, bigdesk, marvel 等监控插件，这样保证 data 节点服务器只需处理创建/更新/删除/查询索引数据等操作。</p><p>http 功能可以在非数据节点服务器上开启，上述相关的监控插件也安装到这些服务器上，用于监控 Elasticsearch 集群状态等数据信息。这样做一来出于数据安全考虑，二来出于服务性能考虑。</p><h3 id="一台服务器上最好只部署一个-node" tabindex="-1"><a class="header-anchor" href="#一台服务器上最好只部署一个-node" aria-hidden="true">#</a> 一台服务器上最好只部署一个 node</h3><p>一台物理服务器上可以启动多个 node 服务器节点（通过设置不同的启动 port），但一台服务器上的 CPU、内存、硬盘等资源毕竟有限，从服务器性能考虑，不建议一台服务器上启动多个 node 节点。</p><h3 id="集群分片设置" tabindex="-1"><a class="header-anchor" href="#集群分片设置" aria-hidden="true">#</a> 集群分片设置</h3><p>ES 一旦创建好索引后，就无法调整分片的设置，而在 ES 中，一个分片实际上对应一个 lucene 索引，而 lucene 索引的读写会占用很多的系统资源，因此，分片数不能设置过大；所以，在创建索引时，合理配置分片数是非常重要的。一般来说，我们遵循一些原则：</p><ol><li>控制每个分片占用的硬盘容量不超过 ES 的最大 JVM 的堆空间设置（一般设置不超过 32 G，参考上面的 JVM 内存设置原则），因此，如果索引的总容量在 500 G 左右，那分片大小在 16 个左右即可；当然，最好同时考虑原则 2。</li><li>考虑一下 node 数量，一般一个节点有时候就是一台物理机，如果分片数过多，大大超过了节点数，很可能会导致一个节点上存在多个分片，一旦该节点故障，即使保持了 1 个以上的副本，同样有可能会导致数据丢失，集群无法恢复。所以，<strong>一般都设置分片数不超过节点数的 3 倍</strong>。</li></ol><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,48),u={href:"https://www.knowledgedict.com/tutorial/elasticsearch-intro.html",target:"_blank",rel:"noopener noreferrer"};function m(f,x){const n=d("ExternalLinkIcon");return i(),l("div",null,[o,e("p",null,[a("我们知道脚本使用主要有 3 种形式，内联动态编译方式、_script 索引库中存储和文件脚本存储的形式；一般脚本的使用场景是粗排，尽量用第二种方式先将脚本存储在 _script 索引库中，起到提前编译，然后通过引用脚本 id，并结合 params 参数使用，即可以达到模型（逻辑）和数据进行了分离，同时又便于脚本模块的扩展与维护。具体 ES 脚本的深入内容请参考 "),e("a",h,[a("Elasticsearch 脚本模块的详解"),r(n)]),a("。")]),p,e("ul",null,[e("li",null,[e("a",u,[a("Elasticsearch 教程"),r(n)])])])])}const _=s(c,[["render",m],["__file","index.html.vue"]]);export{_ as default};