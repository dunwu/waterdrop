import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c,a as n,b as s,d as e,f as o,e as t}from"./app-1c9286fd.js";const u={},r=n("h1",{id:"《极客时间教程-elasticsearch-核心技术与实战》笔记一",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#《极客时间教程-elasticsearch-核心技术与实战》笔记一","aria-hidden":"true"},"#"),s(" 《极客时间教程 - Elasticsearch 核心技术与实战》笔记一")],-1),d={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"},v=t(`<h2 id="第一章-概述" tabindex="-1"><a class="header-anchor" href="#第一章-概述" aria-hidden="true">#</a> 第一章：概述</h2><h3 id="课程介绍-略" tabindex="-1"><a class="header-anchor" href="#课程介绍-略" aria-hidden="true">#</a> 课程介绍（略）</h3><h3 id="课程综述及学习建议-略" tabindex="-1"><a class="header-anchor" href="#课程综述及学习建议-略" aria-hidden="true">#</a> 课程综述及学习建议（略）</h3><h3 id="elasticsearch-概述及其发展历史" tabindex="-1"><a class="header-anchor" href="#elasticsearch-概述及其发展历史" aria-hidden="true">#</a> Elasticsearch 概述及其发展历史</h3><p>Elasticsearch 是一款基于 Lucene 的开源分布式搜索引擎。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202411060749487.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>1.0（2014 年 1 月）</li><li>5.0（2016 年 10 月） <ul><li>Lucene 6.x</li><li>默认打分机制从 TD-IDF 改为 BM 25</li><li>支持 Keyword 类型</li></ul></li><li>6.0（2017 年 10 月） <ul><li>Lucene 7.x</li><li>跨集群复制</li><li>索引生命周期管理</li><li>SQL 的支持</li></ul></li><li>7.0（2019 年 4 月） <ul><li>Lucene 7.x</li><li>移除 Type</li><li>ECK （用于支持 K8S）</li><li>集群协调</li><li>High Level Rest Client</li><li>Script Score 查询</li></ul></li></ul><h3 id="elastic-stack-家族成员及其应用场景" tabindex="-1"><a class="header-anchor" href="#elastic-stack-家族成员及其应用场景" aria-hidden="true">#</a> Elastic Stack 家族成员及其应用场景</h3><p>Elasticsearch、Logstash、Kibana</p><p>Beats - 各种采集器</p><p>X-Pack - 商业化套件</p><h2 id="第二章-安装上手" tabindex="-1"><a class="header-anchor" href="#第二章-安装上手" aria-hidden="true">#</a> 第二章：安装上手</h2><h3 id="elasticsearch-的安装与简单配置" tabindex="-1"><a class="header-anchor" href="#elasticsearch-的安装与简单配置" aria-hidden="true">#</a> Elasticsearch 的安装与简单配置</h3><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动单节点</span>
bin/Elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node0 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node0_data

<span class="token comment">#安装插件</span>
bin/Elasticsearch-plugin <span class="token function">install</span> analysis-icu

<span class="token comment">#查看插件</span>
bin/Elasticsearch-plugin list
<span class="token comment">#查看安装的插件</span>
GET http://localhost:9200/_cat/plugins?v

<span class="token comment">#start multi-nodes Cluster</span>
bin/Elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node0 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node0_data
bin/Elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node1 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node1_data
bin/Elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node2 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node2_data
bin/Elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node3 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node3_data

<span class="token comment">#查看集群</span>
GET http://localhost:9200
<span class="token comment">#查看 nodes</span>
GET _cat/nodes
GET _cluster/health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html",target:"_blank",rel:"noopener noreferrer"},k=t(`<h3 id="kibana-的安装与界面快速浏览" tabindex="-1"><a class="header-anchor" href="#kibana-的安装与界面快速浏览" aria-hidden="true">#</a> Kibana 的安装与界面快速浏览</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动 kibana</span>
bin/kibana

<span class="token comment">#查看插件</span>
bin/kibana-plugin list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>资料：</p>`,3),b={href:"https://www.elastic.co/guide/en/kibana/current/setup.html",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.elastic.co/guide/en/kibana/current/known-plugins.html",target:"_blank",rel:"noopener noreferrer"},g=n("h3",{id:"在-docker-容器中运行-elasticsearch-kibana-和-cerebro",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在-docker-容器中运行-elasticsearch-kibana-和-cerebro","aria-hidden":"true"},"#"),s(" 在 Docker 容器中运行 Elasticsearch,Kibana 和 Cerebro")],-1),h=n("h3",{id:"logstash-安装与导入数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#logstash-安装与导入数据","aria-hidden":"true"},"#"),s(" Logstash 安装与导入数据")],-1),_={href:"https://www.elastic.co/cn/downloads/logstash",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.elastic.co/guide/en/logstash/current/index.html",target:"_blank",rel:"noopener noreferrer"},y=t(`<h2 id="elasticsearch-入门" tabindex="-1"><a class="header-anchor" href="#elasticsearch-入门" aria-hidden="true">#</a> Elasticsearch 入门</h2><h3 id="基本概念-1-索引文档和-restapi" tabindex="-1"><a class="header-anchor" href="#基本概念-1-索引文档和-restapi" aria-hidden="true">#</a> 基本概念 1 索引文档和 RESTAPI</h3><p>基本概念：</p><ul><li><strong>Document</strong><ul><li>Elasticsearch 是面向文档的，文档是所有可搜索数据的最小单位。</li><li>Elasticsearch 中，文档会被序列化成 JSON 格式保存。无模式。</li><li>每个文档都有一个唯一性 ID，如果没有指定，ES 会自动生成。</li></ul></li><li><strong>Field</strong> - 文档包含一组字段。每个字段有对应类型（字符串、数值、布尔、日期、二进制、范围） <ul><li>元数据（内置字段） - 以 <code>_</code> 开头 <ul><li><code>_index</code> - 文档所属索引</li><li><code>_type</code> - 文档所属类型</li><li><code>_id</code> - 文档的唯一 ID</li><li><code>_source</code> - 文档的原始数据（JSON）</li><li><code>_all</code> - 整合所有字段内容到该字段，已废弃</li><li><code>_version</code> - 文档版本</li><li><code>_score</code> - 相关性打分</li></ul></li></ul></li><li><strong>Index</strong> - Document 的容器。 <ul><li><strong>Mapping</strong> - 定义文档字段类型</li><li><strong>Setting</strong> - 定义不同数据分布</li></ul></li><li><strong>Type</strong> - 7.0 移除 Type，每个 Index 只有一个名为 <code>_doc</code> 的 Type。</li><li>Node</li><li>Shard</li><li>Cluster</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看索引相关信息</span>
GET kibana_sample_data_ecommerce

<span class="token comment">#查看索引的文档总数</span>
GET kibana_sample_data_ecommerce/_count

<span class="token comment">#查看前 10 条文档，了解文档格式</span>
POST kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">#_cat indices API</span>
<span class="token comment">#查看 indices</span>
GET /_cat/indices/kibana*?v<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>index

<span class="token comment">#查看状态为绿的索引</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">health</span><span class="token operator">=</span>green

<span class="token comment">#按照文档个数排序</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>docs.count:desc

<span class="token comment">#查看具体的字段</span>
GET /_cat/indices/kibana*?pri<span class="token operator">&amp;</span><span class="token function">v</span><span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>health,index,pri,rep,docs.count,mt

<span class="token comment">#How much memory is used per index?</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>i,tm<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>tm:desc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本概念-2-集群、节点、分片、副本" tabindex="-1"><a class="header-anchor" href="#基本概念-2-集群、节点、分片、副本" aria-hidden="true">#</a> 基本概念 2 - 集群、节点、分片、副本</h3><p>集群的作用：高可用、可扩展</p><p>ES 集群通过集群名来区分。集群名通过配置文件或 <code>-E cluster.name=xxx</code> 来指定。</p><p>ES 节点通过配置文件或 <code>-E node.name=xxx</code> 指定。</p><p>每个 ES 节点启动后，会分配一个 UID，保存在 <code>data</code> 目录下</p><h4 id="master-候选节点和-master-节点" tabindex="-1"><a class="header-anchor" href="#master-候选节点和-master-节点" aria-hidden="true">#</a> master 候选节点和 master 节点</h4><p>每个节点启动后，默认就是一个 master 候选节点。候选节点可以通过选举，成为 master 节点。</p><p>集群中第一个节点启动时，会将自己选举为 master 节点。</p><p>每个节点上都保存了集群的状态，只有 master 节点才能修改集群的状态信息（通过集中式管理，保证数据一致性）。</p><p>集群状态信息：</p><ul><li>所有的节点信息</li><li>所有的索引和相关 mapping、setting 信息</li><li>分片的路由信息</li></ul><h4 id="data-node-和-coordinating-node" tabindex="-1"><a class="header-anchor" href="#data-node-和-coordinating-node" aria-hidden="true">#</a> data node 和 coordinating node</h4><ul><li>data node - 保存数据的节点，叫做 data node。负责保存分片数据。</li><li>coordinating node - 负责接受 client 请求，将请求分发到合适节点，最终把结果汇聚到一起。每个节点默认都有 coordinating node 的职责。</li></ul><h4 id="其他节点类型" tabindex="-1"><a class="header-anchor" href="#其他节点类型" aria-hidden="true">#</a> 其他节点类型</h4><p>hot &amp; warm 节点 - 不同硬件配置的 data node，用来实现 hot &amp; warm 架构，降低集群部署成本。</p><p>机器学习节点 - 负责跑机器学习的 Job，用来做异常检测</p><p>tribe 节点 - 连接到不同的 ES 集群</p><h4 id="分片" tabindex="-1"><a class="header-anchor" href="#分片" aria-hidden="true">#</a> 分片</h4><p>主分片 - 用于水平扩展，以提升系统可承载的总数据量以及吞吐量。</p><ul><li>一个分片是一个运行 Lucene 实例</li><li>主分片数在索引创建时指定，后续不允许修改，除非 reindex</li></ul><p>副分片（副本） - 用于冗余，解决高可用的问题。</p><ul><li>副本数，可以动态调整</li><li>增加副本数，可以在一定程度上提高服务的可用性，以及查询的吞吐量。</li></ul><p>生产环境的分片数，需要提前规划：</p><p>分片数过小：</p><ul><li>无法通过增加节点实现水平扩展</li><li>单个分片的数据量太大，导致数据重新分配耗时</li></ul><p>分片数过大：</p><ul><li>影响搜索结果的相关性打分，影响统计结果的准确性</li><li>单个节点上过多的分片，会导致资源浪费，同时也会影响性能</li><li>7.0 开始，默认主分片数设置为 1， 解决了 over-sharding 的问题</li></ul><h4 id="查看集群健康状态" tabindex="-1"><a class="header-anchor" href="#查看集群健康状态" aria-hidden="true">#</a> 查看集群健康状态</h4><p><code>GET _cluster/health</code> 有三种结果：</p><ul><li>Green - 主分片和副本都正常分配</li><li>Yellow - 主分片全部正常分配，有副本分片未能正常分配</li><li>Red - 有主分片未能分配</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>get _cat/nodes?v
GET /_nodes/es7_01,es7_02
GET /_cat/nodes?v
GET /_cat/nodes?v<span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>id,ip,port,v,m

GET _cluster/health
GET _cluster/health?level<span class="token operator">=</span>shards
GET /_cluster/health/kibana_sample_data_ecommerce,kibana_sample_data_flights
GET /_cluster/health/kibana_sample_data_flights?level<span class="token operator">=</span>shards

<span class="token comment">#### cluster state</span>
The cluster state API allows access to metadata representing the state of the whole cluster. This includes information such as
GET /_cluster/state

<span class="token comment">#cluster get settings</span>
GET /_cluster/settings
GET /_cluster/settings?include_defaults<span class="token operator">=</span>true

GET _cat/shards
GET _cat/shards?h<span class="token operator">=</span>index,shard,prirep,state,unassigned.reason
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档的基本-crud-和批量操作" tabindex="-1"><a class="header-anchor" href="#文档的基本-crud-和批量操作" aria-hidden="true">#</a> 文档的基本 CRUD 和批量操作</h3><h4 id="文档的-crud" tabindex="-1"><a class="header-anchor" href="#文档的-crud" aria-hidden="true">#</a> 文档的 CRUD</h4><ul><li>create - 创建文档，如果 ID 已存在，会失败</li><li>update - 增量更新文档，且文档必须已存在</li><li>index - 若文档不存在，则创建新文档；若文档存在，则删除现有文档，再创建新文档，同时 version+1</li><li>delete - DELETE <code>&lt;index&gt;/_doc/1</code></li><li>read</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># create document. 自动生成 _id</span>
POST users/_doc
<span class="token punctuation">{</span>
 	<span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Mike&quot;</span>,
    <span class="token string">&quot;post_date&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2019-04-15T14:12:12&quot;</span>,
    <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Kibana&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#create document. 指定 Id。如果 id 已经存在，报错</span>
PUT users/_doc/1?op_type<span class="token operator">=</span>create
<span class="token punctuation">{</span>
    <span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Jack&quot;</span>,
    <span class="token string">&quot;post_date&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2019-05-15T14:12:12&quot;</span>,
    <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Elasticsearch&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#create document. 指定 ID 如果已经存在，就报错</span>
PUT users/_create/1
<span class="token punctuation">{</span>
     <span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Jack&quot;</span>,
    <span class="token string">&quot;post_date&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2019-05-15T14:12:12&quot;</span>,
    <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Elasticsearch&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">### Get Document by ID</span>
<span class="token comment">#Get the document by ID</span>
GET users/_doc/1

<span class="token comment">###  Index &amp; Update</span>
<span class="token comment">#Update 指定 ID  （先删除，在写入）</span>
GET users/_doc/1

PUT users/_doc/1
<span class="token punctuation">{</span>
	<span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Mike&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#GET users/_doc/1</span>
<span class="token comment">#在原文档上增加字段</span>
POST users/_update/1/
<span class="token punctuation">{</span>
  <span class="token string">&quot;doc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;post_date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2019-05-15T14:12:12&quot;</span>,
    <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Elasticsearch&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">### Delete by Id</span>
<span class="token comment"># 删除文档</span>
DELETE users/_doc/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="批量写" tabindex="-1"><a class="header-anchor" href="#批量写" aria-hidden="true">#</a> 批量写</h4><p>bulk API 支持四种类型：</p><ul><li>index</li><li>create</li><li>update</li><li>delete</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### Bulk 操作</span>
<span class="token comment">#执行两次，查看每次的结果</span>

<span class="token comment">#执行第 1 次</span>
POST _bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value1&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;delete&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;create&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test2&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;update&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>, <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field2&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>

<span class="token comment">#执行第 2 次</span>
POST _bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value1&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;delete&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;create&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test2&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;update&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>, <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field2&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="批量读" tabindex="-1"><a class="header-anchor" href="#批量读" aria-hidden="true">#</a> 批量读</h4><ul><li><p>mget</p></li><li><p>msearch</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### mget 操作</span>
GET /_mget
<span class="token punctuation">{</span>
  <span class="token string">&quot;docs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#URI 中指定 index</span>
GET /test/_mget
<span class="token punctuation">{</span>
  <span class="token string">&quot;docs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

GET /_mget
<span class="token punctuation">{</span>
  <span class="token string">&quot;docs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>,
      <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>,
      <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;field3&quot;</span>,
        <span class="token string">&quot;field4&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
      <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span>,
      <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;include&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;user&quot;</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;exclude&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;user.location&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">### msearch 操作</span>
POST kibana_sample_data_ecommerce/_msearch
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:1<span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;kibana_sample_data_flights&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:2<span class="token punctuation">}</span>

<span class="token comment">### 清除测试数据</span>
<span class="token comment">#清除数据</span>
DELETE <span class="token function">users</span>
DELETE <span class="token builtin class-name">test</span>
DELETE test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="倒排索引入门" tabindex="-1"><a class="header-anchor" href="#倒排索引入门" aria-hidden="true">#</a> 倒排索引入门</h3><p>什么是正排，什么是倒排？</p><ul><li>** 正排 **：文档 ID 到文档内容和单词的关联</li><li>** 倒排 **：单词到文档 ID 的关系</li></ul><p>倒排索引含两个部分</p><ul><li>** 单词词典 ** - 记录所有文档的单词，记录单词到倒排列表的关联关系</li><li>** 倒排列表 ** - 记录了单词对应的文档结合，由倒排索引项组成。</li></ul><p>倒排索引项：</p><ul><li>文档 ID</li><li>词频 TF - 单词在文档中出现的次数，用于相关性评分</li><li>位置 - 单词文档中分词的位置。用于语句搜索</li><li>偏移 - 记录单词的开始结束位置，实现高亮显示</li></ul><p>要点：</p><ul><li>文档中每个字段都有自己的倒排索引</li><li>可以指定某些字段不做索引</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mastering Elasticsearch&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Elasticsearch Server&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Elasticsearch Essentials&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过分析器进行分词" tabindex="-1"><a class="header-anchor" href="#通过分析器进行分词" aria-hidden="true">#</a> 通过分析器进行分词</h3><p>** 分词 **：文本分析是把全文本转换一系列单词（term / token）的过程。</p><p>分析组件由如下三部分组成，它的执行顺序如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Character Filters -&gt; Tokenizer -&gt; Token Filters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明：</p><ul><li>Character Filters（字符过滤器） - 针对原始文本处理， 例如去除特殊字符、过了 html 标签</li><li>Tokenizer（分词器） - 按照策略将文本切分为单词</li><li>Token Filters（分词过滤器） - 对切分的单词进行加工，如：转为小写、删除 stop word、增加同义词等</li></ul><p>ES 内置分析器：</p>`,68),T={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-simple-analyzer.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-analyzer.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-analyzer.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-analyzer.html",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-analyzer.html",target:"_blank",rel:"noopener noreferrer"},G=n("code",null,"\\W+",-1),S={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html",target:"_blank",rel:"noopener noreferrer"},D={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-fingerprint-analyzer.html",target:"_blank",rel:"noopener noreferrer"},N=t(`<p>中文分词</p><p>elasticsearch-analysis-ik</p><p>elasticsearch-thulac-plugin</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看不同的 analyzer 的效果</span>
<span class="token comment">#standard</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#simpe</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;simple&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;stop&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#stop</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;whitespace&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#keyword</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;pattern&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#english</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;english&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2 running Quick brown-foxes leap over lazy dogs in the summer evening.&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;icu_analyzer&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;他说的确实在理”&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;他说的确实在理”&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;icu_analyzer&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;这个苹果不大好吃&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="searchapi-概览" tabindex="-1"><a class="header-anchor" href="#searchapi-概览" aria-hidden="true">#</a> SearchAPI 概览</h3><p>ES Search 有两种类型：</p><ul><li>URI 查询 - 在 URL 中使用查询</li><li>Request Body 查询 - 基于 JSON 格式的 DSL</li></ul><table><thead><tr><th>语法</th><th>范围</th></tr></thead><tbody><tr><td><code>/_search</code></td><td>集群上的所有索引</td></tr><tr><td><code>/index1/_search</code></td><td>index1</td></tr><tr><td><code>/index1,index2/_search</code></td><td>index1 和 index2</td></tr><tr><td><code>/index*/_search</code></td><td>以 index 开头的索引</td></tr></tbody></table><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#URI Query</span>
GET kibana_sample_data_ecommerce/_search?q<span class="token operator">=</span>customer_first_name:Eddie
GET kibana*/_search?q<span class="token operator">=</span>customer_first_name:Eddie
GET /_all/_search?q<span class="token operator">=</span>customer_first_name:Eddie

<span class="token comment">#REQUEST Body</span>
POST kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> true,
	<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="urisearch-详解" tabindex="-1"><a class="header-anchor" href="#urisearch-详解" aria-hidden="true">#</a> URISearch 详解</h3><p>使用 <code>q</code> 指定查询字符串（query string）</p><ul><li><code>q</code> - 指定查询语句，使用 Query String 语义</li><li><code>df</code> - 默认字段</li><li><code>sort</code> - 排序</li><li><code>from/size</code> - 分页</li><li><code>profile</code> - 显示查询是如何被执行的</li></ul><p>指定字段 vs. 泛查询</p><ul><li>q=title:2012 / q=2012</li></ul><p>Term vs. Phrase</p><ul><li>Beautiful Mind，等效于 Beautiful Or Mind</li><li>&quot;Beautiful Mind&quot;，等效于 Beautiful And Mind</li></ul><p>分组与引号</p><ul><li>title:(Beautiful And Mind)</li><li>title=&quot;Beautiful Mind&quot;</li></ul><p>布尔操作</p><ul><li>AND / OR / NOT 或 <code>&amp;&amp;</code> / <code>||</code> / <code>!</code></li><li>必须大写</li><li><code>title:(matrix NOT reloaded)</code></li></ul><p>分组</p><ul><li><code>+</code> 表示 must</li><li><code>-</code> 表示 must_not</li><li><code>title:(+matrix -reloaded)</code></li></ul><p>范围查询</p><p>区间表示：[] 闭区间，{} 开区间</p><ul><li><code>year:{2019 TO 2018}</code></li><li><code>year:{* TO 2018}</code></li></ul><p>算数符号</p><ul><li><code>year:&gt;2010</code></li><li><code>year:(&gt;2010 &amp;&amp; &lt;=2018)</code></li><li><code>year:(+&gt;2010 +&lt;=2018)</code></li></ul><p>通配符查询（通配符查询效率低，占用内存大，不建议使用。特别是放在最前面）</p><p><code>?</code> 表示 1 个字符；<code>*</code> 表示任意个字符</p><ul><li><code>title:mi?d</code></li><li><code>title:be*</code></li></ul><p>正则表达式</p><ul><li><code>title:[bt]oy</code></li></ul><p>模糊匹配与近似查询</p><ul><li><code>title:befutifl~1</code></li><li><code>title:&quot;lord rings&quot;~2</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment">#基本查询</span>
GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span><span class="token operator">&amp;</span><span class="token assign-left variable">df</span><span class="token operator">=</span>title<span class="token operator">&amp;</span><span class="token assign-left variable">sort</span><span class="token operator">=</span>year:desc<span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">0</span><span class="token operator">&amp;</span><span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">10</span><span class="token operator">&amp;</span><span class="token assign-left variable">timeout</span><span class="token operator">=</span>1s

<span class="token comment">#带 profile</span>
GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span><span class="token operator">&amp;</span><span class="token assign-left variable">df</span><span class="token operator">=</span>title
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#泛查询，正对 _all, 所有字段</span>
GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#指定字段</span>
GET /movies/_search?q<span class="token operator">=</span>title:2012<span class="token operator">&amp;</span><span class="token assign-left variable">sort</span><span class="token operator">=</span>year:desc<span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">0</span><span class="token operator">&amp;</span><span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">10</span><span class="token operator">&amp;</span><span class="token assign-left variable">timeout</span><span class="token operator">=</span>1s
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 查找美丽心灵，Mind 为泛查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:Beautiful Mind
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 泛查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:2012
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#使用引号，Phrase 查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token string">&quot;Beautiful Mind&quot;</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#分组，Bool 查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful Mind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#布尔操作符</span>
<span class="token comment"># 查找美丽心灵</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful AND Mind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 查找美丽心灵</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful NOT Mind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 查找美丽心灵</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful %2BMind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#范围查询 , 区间写法</span>
GET /movies/_search?q<span class="token operator">=</span>title:beautiful AND year:<span class="token punctuation">[</span><span class="token number">2002</span> TO <span class="token number">2018</span>%7D
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#通配符查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:b*
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

// 模糊匹配 <span class="token operator">&amp;</span> 近似度匹配
GET /movies/_search?q<span class="token operator">=</span>title:beautifl~1
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET /movies/_search?q<span class="token operator">=</span>title:<span class="token string">&quot;Lord Rings&quot;</span>~2
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requestbody-与-querydsl-简介" tabindex="-1"><a class="header-anchor" href="#requestbody-与-querydsl-简介" aria-hidden="true">#</a> RequestBody 与 QueryDSL 简介</h3><ul><li>DSL</li><li>from / size（分页）</li><li>sort（排序）</li><li>_source（原文本查询）</li><li>script_fields（脚本）</li><li>match</li><li>match_phrase</li><li>simple_query_string</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://localhost:9200/kibana_sample_data_ecommerce/_search&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  }
}&#39;</span>

<span class="token comment">#ignore_unavailable=true，可以忽略尝试访问不存在的索引“404_idx”导致的报错</span>
<span class="token comment">#查询 movies 分页</span>
POST /movies,404_idx/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> true,
	<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;from&quot;</span>:10,
  <span class="token string">&quot;size&quot;</span>:20,
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#对日期排序</span>
POST kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;sort&quot;</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">#source filtering</span>
POST kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;_source&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;order_date&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#脚本字段</span>
GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;script_fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;new_field&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;lang&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;painless&quot;</span>,
        <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;doc[&#39;order_date&#39;].value+&#39;hello&#39;&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;last christmas&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;last christmas&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;one love&quot;</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;one love&quot;</span>,
        <span class="token string">&quot;slop&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="querystring-simplequerystring-查询" tabindex="-1"><a class="header-anchor" href="#querystring-simplequerystring-查询" aria-hidden="true">#</a> QueryString&amp;SimpleQueryString 查询</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Ruan Yiming&quot;</span>,
  <span class="token string">&quot;about&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;java, golang, node, swift, elasticsearch&quot;</span>
<span class="token punctuation">}</span>

PUT /users/_doc/2
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Li Yiming&quot;</span>,
  <span class="token string">&quot;about&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Hadoop&quot;</span>
<span class="token punctuation">}</span>

POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;default_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;name&quot;</span>,
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Ruan AND Yiming&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;fields&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span>,<span class="token string">&quot;about&quot;</span><span class="token punctuation">]</span>,
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;(Ruan AND Yiming) OR (Java AND Elasticsearch)&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Simple Query 默认的 operator 是 Or</span>
POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Ruan AND Yiming&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Ruan Yiming&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>,
      <span class="token string">&quot;default_operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AND&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /movies/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> true,
	<span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;query_string&quot;</span>:<span class="token punctuation">{</span>
			<span class="token string">&quot;default_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;title&quot;</span>,
			<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Beafiful AND Mind&quot;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 多 fields</span>
GET /movies/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> true,
	<span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;query_string&quot;</span>:<span class="token punctuation">{</span>
			<span class="token string">&quot;fields&quot;</span>:<span class="token punctuation">[</span>
				<span class="token string">&quot;title&quot;</span>,
				<span class="token string">&quot;year&quot;</span>
			<span class="token punctuation">]</span>,
			<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2012&quot;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /movies/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span>:true,
	<span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;simple_query_string&quot;</span>:<span class="token punctuation">{</span>
			<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Beautiful +mind&quot;</span>,
			<span class="token string">&quot;fields&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dynamicmapping-和常见字段类型" tabindex="-1"><a class="header-anchor" href="#dynamicmapping-和常见字段类型" aria-hidden="true">#</a> DynamicMapping 和常见字段类型</h3><h4 id="什么是-mapping" tabindex="-1"><a class="header-anchor" href="#什么是-mapping" aria-hidden="true">#</a> 什么是 Mapping</h4><p>Mapping 类似数据库中 schema 的定义</p><p>Mapping 会将 JSON 文档映射成 Lucene 所需要的数据格式</p><p>一个 Mapping 属于一个索引的 Type</p><h4 id="字段数据类型" tabindex="-1"><a class="header-anchor" href="#字段数据类型" aria-hidden="true">#</a> 字段数据类型</h4><ul><li>简单类型</li><li>Text / Keyword</li><li>Date</li><li>Integer / Floating</li><li>Boolean</li><li>Ipv4 / Ipv6</li><li>复杂类型</li><li>对象类型 / 嵌套类型</li><li>特殊类型</li><li>get_point &amp; geo_shape / percolator</li></ul><h4 id="什么是-dynamic-mapping" tabindex="-1"><a class="header-anchor" href="#什么是-dynamic-mapping" aria-hidden="true">#</a> 什么是 Dynamic Mapping</h4><p>在写入文档时，如果索引不存在，会自动创建索引</p><p>ES 会根据文档信息，自动推算出字段的类型</p><p>有时候，推算可能会不准确，当类型设置错误时，可能会导致一些功能无法正常运行。例如范围查询</p><h4 id="能否更改-mapping-的字段类型" tabindex="-1"><a class="header-anchor" href="#能否更改-mapping-的字段类型" aria-hidden="true">#</a> 能否更改 Mapping 的字段类型</h4><p>Dynamic 设为 true 时，一旦有新增字段的文档写入，Mapping 也同时被更新</p><p>Dynamic 设为 false 时，Mapping 不会被更新，新增字段的数据无法被索引，但是信息会出现在 _source 中。</p><p>Dynamic 设为 stric 时，文档写入失败</p><p>对已有字段，一旦有数据写入，就不再支持修改字段的定义</p><p>如果希望改变字段类型，必须 reindex API，重建索引</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#写入文档，查看 Mapping</span>
PUT mapping_test/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Chan&quot;</span>,
  <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Jackie&quot;</span>,
  <span class="token string">&quot;loginDate&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2018-07-24T10:29:48.103Z&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#查看 Mapping 文件</span>
GET mapping_test/_mapping

<span class="token comment">#Delete index</span>
DELETE mapping_test

<span class="token comment">#dynamic mapping，推断字段的类型</span>
PUT mapping_test/_doc/1
<span class="token punctuation">{</span>
    <span class="token string">&quot;uid&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;123&quot;</span>,
    <span class="token string">&quot;isVip&quot;</span> <span class="token builtin class-name">:</span> false,
    <span class="token string">&quot;isAdmin&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
    <span class="token string">&quot;age&quot;</span>:19,
    <span class="token string">&quot;heigh&quot;</span>:180
<span class="token punctuation">}</span>

<span class="token comment">#查看 Dynamic</span>
GET mapping_test/_mapping

<span class="token comment">#默认 Mapping 支持 dynamic，写入的文档中加入新的字段</span>
PUT dynamic_mapping_test/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;newField&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;someValue&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#该字段可以被搜索，数据也在 _source 中出现</span>
POST dynamic_mapping_test/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;newField&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;someValue&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#修改为 dynamic false</span>
PUT dynamic_mapping_test/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">#新增 anotherField</span>
PUT dynamic_mapping_test/_doc/10
<span class="token punctuation">{</span>
  <span class="token string">&quot;anotherField&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;someValue&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#该字段不可以被搜索，因为 dynamic 已经被设置为 false</span>
POST dynamic_mapping_test/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;anotherField&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;someValue&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

get dynamic_mapping_test/_doc/10

<span class="token comment">#修改为 strict</span>
PUT dynamic_mapping_test/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;strict&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#写入数据出错，HTTP Code 400</span>
PUT dynamic_mapping_test/_doc/12
<span class="token punctuation">{</span>
  <span class="token string">&quot;lastField&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;value&quot;</span>
<span class="token punctuation">}</span>

DELETE dynamic_mapping_test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="显式-mapping-设置与常见参数介绍" tabindex="-1"><a class="header-anchor" href="#显式-mapping-设置与常见参数介绍" aria-hidden="true">#</a> 显式 Mapping 设置与常见参数介绍</h3><ul><li>index - 控制当前字段是否被索引</li><li>index_options - 控制倒排索引记录的内容 <ul><li>docs - 记录 doc id</li><li>freqs - 记录 doc id 和 term freqencies</li><li>positions - 记录 doc id 和 term freqencies、term position</li><li>offsets - 记录 doc id 和 term freqencies、term position、char offsets</li></ul></li><li>null_value - 对 null 值实现搜索，只有 keyword 类型支持</li><li>copy_to - _all 在 ES 7.X 被 copy_to 替代</li></ul><p>ES 不提供专门的数组类型。但是任何字段 ，都可以包含多个相同类型的数值。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#设置 index 为 false</span>
DELETE <span class="token function">users</span>
PUT <span class="token function">users</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Ruan&quot;</span>,
  <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Yiming&quot;</span>,
  <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;12345678&quot;</span>
<span class="token punctuation">}</span>

POST /users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;12345678&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#设定 Null_value</span>
DELETE <span class="token function">users</span>
PUT <span class="token function">users</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
        <span class="token string">&quot;null_value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NULL&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Ruan&quot;</span>,
  <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Yiming&quot;</span>,
  <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span> null
<span class="token punctuation">}</span>

PUT users/_doc/2
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Ruan2&quot;</span>,
  <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Yiming2&quot;</span>
<span class="token punctuation">}</span>

GET users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;mobile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NULL&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#设置 Copy to</span>
DELETE <span class="token function">users</span>
PUT <span class="token function">users</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;copy_to&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;fullName&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;copy_to&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;fullName&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Zhang&quot;</span>,
  <span class="token string">&quot;lastName&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Peng&quot;</span>
<span class="token punctuation">}</span>

GET users/_search?q<span class="token operator">=</span>fullName:<span class="token punctuation">(</span>Zhang Peng<span class="token punctuation">)</span>

POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;fullName&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Zhang Peng&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#数组类型</span>
PUT users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;onebird&quot;</span>,
  <span class="token string">&quot;interests&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;reading&quot;</span>
<span class="token punctuation">}</span>

PUT users/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;twobirds&quot;</span>,
  <span class="token string">&quot;interests&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;reading&quot;</span>,<span class="token string">&quot;music&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

POST users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET users/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多字段特性及-mapping-中配置自定义-analyzer" tabindex="-1"><a class="header-anchor" href="#多字段特性及-mapping-中配置自定义-analyzer" aria-hidden="true">#</a> 多字段特性及 Mapping 中配置自定义 Analyzer</h3><p>ES 内置的分析器无法满足需求时，可以自定义分析器，通过组合不同组件来进行定制：</p><ul><li>Character Filter - html strip、mapping、pattern replace</li><li>Tokenizer - whitespace、standard、uax_url_email、pattern、keyword、path hierarchy</li><li>Token Filter - lowercase、stop、synonym</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT logs/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;level&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;DEBUG&quot;</span>
<span class="token punctuation">}</span>

GET /logs/_mapping

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;keyword&quot;</span>,
  <span class="token string">&quot;char_filter&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;html_strip&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&lt;b&gt;hello world&lt;/b&gt;&quot;</span>
<span class="token punctuation">}</span>

POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;path_hierarchy&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;/user/ymruan/a/b/c/d/e&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#使用 char filter 进行替换</span>
POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;char_filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;mapping&quot;</span>,
        <span class="token string">&quot;mappings&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;- =&gt; _&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;123-456, I-test! test-990 650-555-1234&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># char filter 替换表情符号</span>
POST _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;char_filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;mapping&quot;</span>,
        <span class="token string">&quot;mappings&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;:) =&gt; happy&quot;</span>, <span class="token string">&quot;:( =&gt; sad&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>,
    <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;I am felling :)&quot;</span>, <span class="token string">&quot;Feeling :( today&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># white space and snowball</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;whitespace&quot;</span>,
  <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;stop&quot;</span>,<span class="token string">&quot;snowball&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;The gilrs in China are playing this game!&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># whitespace 与 stop</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;whitespace&quot;</span>,
  <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;stop&quot;</span>,<span class="token string">&quot;snowball&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;The rain in Spain falls mainly on the plain.&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># remove 加入 lowercase 后，The 被当成 stopword 删除</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;whitespace&quot;</span>,
  <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;lowercase&quot;</span>,<span class="token string">&quot;stop&quot;</span>,<span class="token string">&quot;snowball&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;The gilrs in China are playing this game!&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 正则表达式</span>
GET _analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokenizer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;char_filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;pattern_replace&quot;</span>,
      <span class="token string">&quot;pattern&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;http://(.*)&quot;</span>,
      <span class="token string">&quot;replacement&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;http://www.elastic.co&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="indextemplate-和-dynamictemplate" tabindex="-1"><a class="header-anchor" href="#indextemplate-和-dynamictemplate" aria-hidden="true">#</a> IndexTemplate 和 DynamicTemplate</h3><p>集群上的索引会越来越多，可以根据时间周期性创建索引，例如：log-yyyyMMdd</p><p>index template - 帮助设定 mapping 和 setting，并按照一定规则，自动匹配到新创建的索引上。</p><ul><li>模板仅在一个索引被新建时，才会起作用。修改模板不会影响已创建的索引。</li><li>可以设定多个索引模板，这些设置会被 merge 在一起</li><li>可以指定 order，以控制模板合并过程</li></ul><p>什么是 Dynamic Template</p><p>根据 ES 识别的数据类型，结合字段名称，来动态设定字段类型</p><ul><li>所有的字符串类型都设定成 keyword，或关闭 keyword 字段</li><li>is 开头的字段都设置成 boolean</li><li>long_ 开头的都设置成 long 类型</li></ul><p>Dynamic Template 要点</p><ul><li>Dynamic Template 是定义在某索引的 mapping 中</li><li>Template 有一个名称</li><li>匹配规则是一个数组</li><li>为匹配到字段设置 mapping</li><li>match_mapping_type - 匹配自动识别的字段类型，如 string、boolean 等</li><li>match、unmatch - 匹配字段名</li><li>path_match、path_unmatch</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#数字字符串被映射成 text，日期字符串被映射成日期</span>
PUT ttemplate/_doc/1
<span class="token punctuation">{</span>
	<span class="token string">&quot;someNumber&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;1&quot;</span>,
	<span class="token string">&quot;someDate&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2019/01/01&quot;</span>
<span class="token punctuation">}</span>
GET ttemplate/_mapping

<span class="token comment">#Create a default template</span>
PUT _template/template_default
<span class="token punctuation">{</span>
  <span class="token string">&quot;index_patterns&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;order&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;version&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;number_of_replicas&quot;</span>:1
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /_template/template_test
<span class="token punctuation">{</span>
    <span class="token string">&quot;index_patterns&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;test*&quot;</span><span class="token punctuation">]</span>,
    <span class="token string">&quot;order&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;settings&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    	<span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">&quot;number_of_replicas&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    	<span class="token string">&quot;date_detection&quot;</span><span class="token builtin class-name">:</span> false,
    	<span class="token string">&quot;numeric_detection&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#查看 template 信息</span>
GET /_template/template_default
GET /_template/temp*

<span class="token comment">#写入新的数据，index 以 test 开头</span>
PUT testtemplate/_doc/1
<span class="token punctuation">{</span>
	<span class="token string">&quot;someNumber&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;1&quot;</span>,
	<span class="token string">&quot;someDate&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2019/01/01&quot;</span>
<span class="token punctuation">}</span>
GET testtemplate/_mapping
get testtemplate/_settings

PUT testmy
<span class="token punctuation">{</span>
	<span class="token string">&quot;settings&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;number_of_replicas&quot;</span>:5
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

put testmy/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;value&quot;</span>
<span class="token punctuation">}</span>

get testmy/_settings
DELETE testmy
DELETE /_template/template_default
DELETE /_template/template_test

<span class="token comment">#Dynaminc Mapping 根据类型和字段名</span>
DELETE my_index

PUT my_index/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;firstName&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Ruan&quot;</span>,
  <span class="token string">&quot;isVIP&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET my_index/_mapping
DELETE my_index
PUT my_index
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;dynamic_templates&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
        <span class="token string">&quot;strings_as_boolean&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;match_mapping_type&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;string&quot;</span>,
          <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;is*&quot;</span>,
          <span class="token string">&quot;mapping&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;boolean&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>
        <span class="token string">&quot;strings_as_keywords&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;match_mapping_type&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;string&quot;</span>,
          <span class="token string">&quot;mapping&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE my_index
<span class="token comment">#结合路径</span>
PUT my_index
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;dynamic_templates&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string">&quot;full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;path_match&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;name.*&quot;</span>,
          <span class="token string">&quot;path_unmatch&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;*.middle&quot;</span>,
          <span class="token string">&quot;mapping&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span>       <span class="token string">&quot;text&quot;</span>,
            <span class="token string">&quot;copy_to&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;full_name&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT my_index/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;first&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;John&quot;</span>,
    <span class="token string">&quot;middle&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Winston&quot;</span>,
    <span class="token string">&quot;last&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;Lennon&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET my_index/_search?q<span class="token operator">=</span>full_name:John
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="elasticsearch-聚合分析简介" tabindex="-1"><a class="header-anchor" href="#elasticsearch-聚合分析简介" aria-hidden="true">#</a> Elasticsearch 聚合分析简介</h3><p>聚合分类：</p><ul><li><strong>Bucket</strong> - 一些字段满足特定条件的文档的集合（分组）</li><li><strong>Metric</strong> - 一些数学运算，可以对文档字段进行统计分析</li><li><strong>Pipeline</strong> - 对其他的聚合结果进行二次聚合</li><li><strong>Matrix</strong> - 支持对多个字段的操作并提供一个结果矩阵</li></ul><p>聚合支持嵌套</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 按照目的地进行分桶统计</span>
GET kibana_sample_data_flights/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
	<span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;flight_dest&quot;</span>:<span class="token punctuation">{</span>
			<span class="token string">&quot;terms&quot;</span>:<span class="token punctuation">{</span>
				<span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;DestCountry&quot;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#查看航班目的地的统计信息，增加平均，最高最低价格</span>
GET kibana_sample_data_flights/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
	<span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
		<span class="token string">&quot;flight_dest&quot;</span>:<span class="token punctuation">{</span>
			<span class="token string">&quot;terms&quot;</span>:<span class="token punctuation">{</span>
				<span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;DestCountry&quot;</span>
			<span class="token punctuation">}</span>,
			<span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
				<span class="token string">&quot;avg_price&quot;</span>:<span class="token punctuation">{</span>
					<span class="token string">&quot;avg&quot;</span>:<span class="token punctuation">{</span>
						<span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;AvgTicketPrice&quot;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>,
				<span class="token string">&quot;max_price&quot;</span>:<span class="token punctuation">{</span>
					<span class="token string">&quot;max&quot;</span>:<span class="token punctuation">{</span>
						<span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;AvgTicketPrice&quot;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>,
				<span class="token string">&quot;min_price&quot;</span>:<span class="token punctuation">{</span>
					<span class="token string">&quot;min&quot;</span>:<span class="token punctuation">{</span>
						<span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;AvgTicketPrice&quot;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#价格统计信息 + 天气信息</span>
GET kibana_sample_data_flights/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;flight_dest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;DestCountry&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;stats_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AvgTicketPrice&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;weather&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;DestWeather&quot;</span>,
            <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,88),O={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"};function U(L,M){const a=l("ExternalLinkIcon");return p(),c("div",null,[r,n("p",null,[n("a",d,[s("极客时间教程 - Elasticsearch 核心技术与实战"),e(a)]),s(" 学习笔记")]),o(" more "),v,n("ul",null,[n("li",null,[n("a",m,[s("ES 安装指南"),e(a)])])]),k,n("ul",null,[n("li",null,[n("a",b,[s("Kibana 安装"),e(a)])]),n("li",null,[n("a",q,[s("Kibana 相关插件"),e(a)])])]),g,h,n("ul",null,[n("li",null,[n("a",_,[s("Logstash 下载"),e(a)])]),n("li",null,[n("a",f,[s("Logstash 参考文档"),e(a)])])]),y,n("ul",null,[n("li",null,[n("strong",null,[n("a",T,[s("Standard Analyzer"),e(a)])]),s(" - 默认分词器，按词切分，小写处理。")]),n("li",null,[n("strong",null,[n("a",E,[s("Simple Analyzer"),e(a)])]),s(" - 按非字母切分（过滤符号），小写处理。")]),n("li",null,[n("strong",null,[n("a",x,[s("Whitespace Analyzer"),e(a)])]),s(" - 按空格切分，不转小写。")]),n("li",null,[n("strong",null,[n("a",w,[s("Stop Analyzer"),e(a)])]),s(" - 小写处理，停用词过滤。")]),n("li",null,[n("strong",null,[n("a",z,[s("Keyword Analyzer"),e(a)])]),s(" - 不分词，直接将输入当做输出。")]),n("li",null,[n("strong",null,[n("a",P,[s("Pattern Analyzer"),e(a)])]),s(" - 按正则分词，默认正则为 "),G,s("。")]),n("li",null,[n("strong",null,[n("a",S,[s("Language Analyzers"),e(a)])]),s(" - 提供 30 多种常见语言的分词器。")]),n("li",null,[n("strong",null,[n("a",D,[s("Fingerprint Analyzer"),e(a)])]),s(" - 可用于重复检测的指纹。")])]),N,n("ul",null,[n("li",null,[n("a",O,[s("极客时间教程 - Elasticsearch 核心技术与实战"),e(a)])])])])}const B=i(u,[["render",U],["__file","index.html.vue"]]);export{B as default};
