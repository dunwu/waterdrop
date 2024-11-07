import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as p,a as n,b as s,d as e,e as t}from"./app-501e9f04.js";const c={},r=t(`<h1 id="《极客时间教程-elasticsearch-核心技术与实战》笔记" tabindex="-1"><a class="header-anchor" href="#《极客时间教程-elasticsearch-核心技术与实战》笔记" aria-hidden="true">#</a> 《极客时间教程 - Elasticsearch 核心技术与实战》笔记</h1><h2 id="elasticsearch-核心技术与实战课程简介" tabindex="-1"><a class="header-anchor" href="#elasticsearch-核心技术与实战课程简介" aria-hidden="true">#</a> Elasticsearch 核心技术与实战课程简介</h2><h3 id="课程介绍-略" tabindex="-1"><a class="header-anchor" href="#课程介绍-略" aria-hidden="true">#</a> 课程介绍（略）</h3><h3 id="课程综述及学习建议-略" tabindex="-1"><a class="header-anchor" href="#课程综述及学习建议-略" aria-hidden="true">#</a> 课程综述及学习建议（略）</h3><h3 id="elasticsearch-概述及其发展历史" tabindex="-1"><a class="header-anchor" href="#elasticsearch-概述及其发展历史" aria-hidden="true">#</a> Elasticsearch 概述及其发展历史</h3><p>Elasticsearch 是一款基于 Lucene 的开源分布式搜索引擎。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202411060749487.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>1.0（2014 年 1 月）</li><li>5.0（2016 年 10 月） <ul><li>Lucene 6.x</li><li>默认打分机制从 TD-IDF 改为 BM 25</li><li>支持 Keyword 类型</li></ul></li><li>6.0（2017 年 10 月） <ul><li>Lucene 7.x</li><li>跨集群复制</li><li>索引生命周期管理</li><li>SQL 的支持</li></ul></li><li>7.0（2019 年 4 月） <ul><li>Lucene 7.x</li><li>移除 Type</li><li>ECK （用于支持 K8S）</li><li>集群协调</li><li>High Level Rest Client</li><li>Script Score 查询</li></ul></li></ul><h3 id="elastic-stack-家族成员及其应用场景" tabindex="-1"><a class="header-anchor" href="#elastic-stack-家族成员及其应用场景" aria-hidden="true">#</a> Elastic Stack 家族成员及其应用场景</h3><p>Elasticsearch、Logstash、Kibana</p><p>Beats - 各种采集器</p><p>X-Pack - 商业化套件</p><h2 id="elasticsearch-安装部署" tabindex="-1"><a class="header-anchor" href="#elasticsearch-安装部署" aria-hidden="true">#</a> Elasticsearch 安装部署</h2><h3 id="elasticsearch-的安装与简单配置" tabindex="-1"><a class="header-anchor" href="#elasticsearch-的安装与简单配置" aria-hidden="true">#</a> Elasticsearch 的安装与简单配置</h3><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动单节点</span>
bin/elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node0 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node0_data

<span class="token comment">#安装插件</span>
bin/elasticsearch-plugin <span class="token function">install</span> analysis-icu

<span class="token comment">#查看插件</span>
bin/elasticsearch-plugin list
<span class="token comment">#查看安装的插件</span>
GET http://localhost:9200/_cat/plugins?v

<span class="token comment">#start multi-nodes Cluster</span>
bin/elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node0 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node0_data
bin/elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node1 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node1_data
bin/elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node2 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node2_data
bin/elasticsearch <span class="token parameter variable">-E</span> <span class="token assign-left variable">node.name</span><span class="token operator">=</span>node3 <span class="token parameter variable">-E</span> <span class="token assign-left variable">cluster.name</span><span class="token operator">=</span>geektime <span class="token parameter variable">-E</span> <span class="token assign-left variable">path.data</span><span class="token operator">=</span>node3_data

<span class="token comment">#查看集群</span>
GET http://localhost:9200
<span class="token comment">#查看 nodes</span>
GET _cat/nodes
GET _cluster/health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),u={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html",target:"_blank",rel:"noopener noreferrer"},d=t(`<h3 id="kibana-的安装与界面快速浏览" tabindex="-1"><a class="header-anchor" href="#kibana-的安装与界面快速浏览" aria-hidden="true">#</a> Kibana 的安装与界面快速浏览</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启动 kibana</span>
bin/kibana

<span class="token comment">#查看插件</span>
bin/kibana-plugin list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>资料：</p>`,3),v={href:"https://www.elastic.co/guide/en/kibana/current/setup.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.elastic.co/guide/en/kibana/current/known-plugins.html",target:"_blank",rel:"noopener noreferrer"},k=n("h3",{id:"在-docker-容器中运行-elasticsearch-kibana-和-cerebro",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在-docker-容器中运行-elasticsearch-kibana-和-cerebro","aria-hidden":"true"},"#"),s(" 在 Docker 容器中运行 Elasticsearch,Kibana 和 Cerebro")],-1),b=n("h3",{id:"logstash-安装与导入数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#logstash-安装与导入数据","aria-hidden":"true"},"#"),s(" Logstash 安装与导入数据")],-1),h={href:"https://www.elastic.co/cn/downloads/logstash",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.elastic.co/guide/en/logstash/current/index.html",target:"_blank",rel:"noopener noreferrer"},g=t(`<h2 id="elasticsearch-基础用法" tabindex="-1"><a class="header-anchor" href="#elasticsearch-基础用法" aria-hidden="true">#</a> Elasticsearch 基础用法</h2><h3 id="基本概念-1-索引文档和-restapi" tabindex="-1"><a class="header-anchor" href="#基本概念-1-索引文档和-restapi" aria-hidden="true">#</a> 基本概念 1 索引文档和 RESTAPI</h3><p>基本概念：</p><ul><li><strong>Document</strong><ul><li>Elasticsearch 是面向文档的，文档是所有可搜索数据的最小单位。</li><li>Elasticsearch 中，文档会被序列化成 JSON 格式保存。无模式。</li><li>每个文档都有一个唯一性 ID，如果没有指定，ES 会自动生成。</li></ul></li><li><strong>Field</strong> - 文档包含一组字段。每个字段有对应类型（字符串、数值、布尔、日期、二进制、范围） <ul><li>元数据（内置字段） - 以 <code>_</code> 开头 <ul><li><code>_index</code> -文档所属索引</li><li><code>_type</code> - 文档所属类型</li><li><code>_id</code> - 文档的唯一 ID</li><li><code>_source</code> - 文档的原始数据（JSON）</li><li><code>_all</code> - 整合所有字段内容到该字段，已废弃</li><li><code>_version</code> - 文档版本</li><li><code>_score</code> - 相关性打分</li></ul></li></ul></li><li><strong>Index</strong> - Document 的容器。 <ul><li><strong>Mapping</strong> - 定义文档字段类型</li><li><strong>Setting</strong> - 定义不同数据分布</li></ul></li><li><strong>Type</strong> - 7.0 移除 Type，每个 Index 只有一个名为 <code>_doc</code> 的 Type。</li><li>Node</li><li>Shard</li><li>Cluster</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看索引相关信息</span>
GET kibana_sample_data_ecommerce

<span class="token comment">#查看索引的文档总数</span>
GET kibana_sample_data_ecommerce/_count

<span class="token comment">#查看前10条文档，了解文档格式</span>
POST kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">#_cat indices API</span>
<span class="token comment">#查看indices</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档的基本-crud-和批量操作" tabindex="-1"><a class="header-anchor" href="#文档的基本-crud-和批量操作" aria-hidden="true">#</a> 文档的基本 CRUD 和批量操作</h3><h4 id="文档的-crud" tabindex="-1"><a class="header-anchor" href="#文档的-crud" aria-hidden="true">#</a> 文档的 CRUD</h4><ul><li>create - 创建文档，如果 ID 已存在，会失败</li><li>update - 增量更新文档，且文档必须已存在</li><li>index - 若文档不存在，则创建新文档；若文档存在，则删除现有文档，再创建新文档，同时version+1</li><li>delete - DELETE <code>&lt;index&gt;/_doc/1</code></li><li>read</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># create document. 自动生成 _id</span>
POST users/_doc
<span class="token punctuation">{</span>
 	<span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Mike&quot;</span>,
    <span class="token string">&quot;post_date&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2019-04-15T14:12:12&quot;</span>,
    <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Kibana&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#create document. 指定Id。如果id已经存在，报错</span>
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
<span class="token comment">#Update 指定 ID  (先删除，在写入)</span>
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

<span class="token comment">#执行第1次</span>
POST _bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value1&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;delete&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;create&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test2&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;update&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>, <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field2&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>

<span class="token comment">#执行第2次</span>
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

<span class="token comment">#URI中指定index</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="倒排索引入门" tabindex="-1"><a class="header-anchor" href="#倒排索引入门" aria-hidden="true">#</a> 倒排索引入门</h3><p>什么是正排，什么是倒排？</p><ul><li><strong>正排</strong>：文档 ID 到文档内容和单词的关联</li><li><strong>倒排</strong>：单词到文档 ID 的关系</li></ul><p>倒排索引含两个部分</p><ul><li><strong>单词词典</strong> - 记录所有文档的单词，记录单词到倒排列表的关联关系</li><li><strong>倒排列表</strong> - 记录了单词对应的文档结合，由倒排索引项组成。</li></ul><p>倒排索引项：</p><ul><li>文档 ID</li><li>词频 TF - 单词在文档中出现的次数，用于相关性评分</li><li>位置 - 单词文档中分词的位置。用于语句搜索</li><li>偏移 - 记录单词的开始结束位置，实现高亮显示</li></ul><p>要点：</p><ul><li>文档中每个字段都有自己的倒排索引</li><li>可以指定某些字段不做索引</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST _analyze
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过分析器进行分词" tabindex="-1"><a class="header-anchor" href="#通过分析器进行分词" aria-hidden="true">#</a> 通过分析器进行分词</h3><p><strong>分词</strong>：文本分析是把全文本转换一系列单词（term / token）的过程。</p><p>分析组件由如下三部分组成，它的执行顺序如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Character Filters -&gt; Tokenizer -&gt; Token Filters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明：</p><ul><li>Character Filters（字符过滤器） - 针对原始文本处理， 例如去除特殊字符、过了 html 标签</li><li>Tokenizer（分词器） - 按照策略将文本切分为单词</li><li>Token Filters（分词过滤器） - 对切分的单词进行加工，如：转为小写、删除 stop word、增加同义词等</li></ul><p>ES 内置分析器：</p>`,68),_={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-simple-analyzer.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-analyzer.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-analyzer.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-analyzer.html",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-analyzer.html",target:"_blank",rel:"noopener noreferrer"},w=n("code",null,"\\W+",-1),z={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-fingerprint-analyzer.html",target:"_blank",rel:"noopener noreferrer"},S=t(`<p>中文分词</p><p>elasticsearch-analysis-ik</p><p>elasticsearch-thulac-plugin</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看不同的analyzer的效果</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="searchapi-概览" tabindex="-1"><a class="header-anchor" href="#searchapi-概览" aria-hidden="true">#</a> SearchAPI 概览</h3><p>ES Search 有两种类型：</p><ul><li>URI 查询 - 在 URL 中使用查询</li><li>Request Body 查询 - 基于 JSON 格式的 DSL</li></ul><table><thead><tr><th>语法</th><th>范围</th></tr></thead><tbody><tr><td><code>/_search</code></td><td>集群上的所有索引</td></tr><tr><td><code>/index1/_search</code></td><td>index1</td></tr><tr><td><code>/index1,index2/_search</code></td><td>index1 和 index2</td></tr><tr><td><code>/index*/_search</code></td><td>以 index 开头的索引</td></tr></tbody></table><h3 id="urisearch-详解" tabindex="-1"><a class="header-anchor" href="#urisearch-详解" aria-hidden="true">#</a> URISearch 详解</h3><p>使用 <code>q</code> 指定查询字符串（query string）</p><p>【示例】URI 完整查询示例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://localhost:9200/kibana_sample_data_ecommerce/_search?q=customer_first_name:Eddie&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>【示例】URI 缩写查询示例（可以在 Kibana 控制台执行）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search?q<span class="token operator">=</span>customer_first_name:Eddie
GET kibana*/_search?q<span class="token operator">=</span>customer_first_name:Eddie
GET /_all/_search?q<span class="token operator">=</span>customer_first_name:Eddie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requestbody-与-querydsl-简介" tabindex="-1"><a class="header-anchor" href="#requestbody-与-querydsl-简介" aria-hidden="true">#</a> RequestBody 与 QueryDSL 简介</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://localhost:9200/kibana_sample_data_ecommerce/_search&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  }
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="querystring-simplequerystring-查询" tabindex="-1"><a class="header-anchor" href="#querystring-simplequerystring-查询" aria-hidden="true">#</a> QueryString&amp;SimpleQueryString 查询</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 花费时间</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 分片信息</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">// 匹配条件的总文档数</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token number">4.016948</span><span class="token punctuation">,</span> <span class="token comment">// 最高相关性评分</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 结果集</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;kibana_sample_data_ecommerce&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yZUtBX4BU8KXl1YJRBrH&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">4.016948</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// 略</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 略</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dynamicmapping-和常见字段类型" tabindex="-1"><a class="header-anchor" href="#dynamicmapping-和常见字段类型" aria-hidden="true">#</a> DynamicMapping 和常见字段类型</h3><h3 id="显式-mapping-设置与常见参数介绍" tabindex="-1"><a class="header-anchor" href="#显式-mapping-设置与常见参数介绍" aria-hidden="true">#</a> 显式 Mapping 设置与常见参数介绍</h3><h3 id="多字段特性及-mapping-中配置自定义-analyzer" tabindex="-1"><a class="header-anchor" href="#多字段特性及-mapping-中配置自定义-analyzer" aria-hidden="true">#</a> 多字段特性及 Mapping 中配置自定义 Analyzer</h3><h3 id="indextemplate-和-dynamictemplate" tabindex="-1"><a class="header-anchor" href="#indextemplate-和-dynamictemplate" aria-hidden="true">#</a> IndexTemplate 和 DynamicTemplate</h3><h3 id="elasticsearch-聚合分析简介" tabindex="-1"><a class="header-anchor" href="#elasticsearch-聚合分析简介" aria-hidden="true">#</a> Elasticsearch 聚合分析简介</h3><h2 id="uri-search-详解" tabindex="-1"><a class="header-anchor" href="#uri-search-详解" aria-hidden="true">#</a> URI Search 详解</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 基本查询</span>
GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span><span class="token operator">&amp;</span><span class="token assign-left variable">df</span><span class="token operator">=</span>title<span class="token operator">&amp;</span><span class="token assign-left variable">sort</span><span class="token operator">=</span>year:desc<span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">0</span><span class="token operator">&amp;</span><span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">10</span><span class="token operator">&amp;</span><span class="token assign-left variable">timeout</span><span class="token operator">=</span>1s

<span class="token comment"># profile 查询</span>
GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span><span class="token operator">&amp;</span><span class="token assign-left variable">df</span><span class="token operator">=</span>title
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#泛查询，正对_all, 所有字段</span>
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

<span class="token comment"># 模糊匹配&amp;近似度匹配</span>
GET /movies/_search?q<span class="token operator">=</span>title:beautifl~1
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET /movies/_search?q<span class="token operator">=</span>title:<span class="token string">&quot;Lord Rings&quot;</span>~2
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>q</code> - 指定查询语句，使用 Query String 语义</li><li><code>df</code> - 默认字段</li><li><code>sort</code> - 排序</li><li><code>from/size</code> - 分页</li><li><code>profile</code> - 显示查询是如何被执行的</li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,28),D={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"};function I(L,P){const a=l("ExternalLinkIcon");return o(),p("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("ES 安装指南"),e(a)])])]),d,n("ul",null,[n("li",null,[n("a",v,[s("Kibana 安装"),e(a)])]),n("li",null,[n("a",m,[s("Kibana 相关插件"),e(a)])])]),k,b,n("ul",null,[n("li",null,[n("a",h,[s("Logstash 下载"),e(a)])]),n("li",null,[n("a",q,[s("Logstash 参考文档"),e(a)])])]),g,n("ul",null,[n("li",null,[n("strong",null,[n("a",_,[s("Standard Analyzer"),e(a)])]),s(" - 默认分词器，按词切分，小写处理。")]),n("li",null,[n("strong",null,[n("a",f,[s("Simple Analyzer"),e(a)])]),s(" - 按非字母切分（过滤符号），小写处理。")]),n("li",null,[n("strong",null,[n("a",y,[s("Whitespace Analyzer"),e(a)])]),s(" - 按空格切分，不转小写。")]),n("li",null,[n("strong",null,[n("a",x,[s("Stop Analyzer"),e(a)])]),s(" - 小写处理，停用词过滤。")]),n("li",null,[n("strong",null,[n("a",E,[s("Keyword Analyzer"),e(a)])]),s(" - 不分词，直接将输入当做输出。")]),n("li",null,[n("strong",null,[n("a",T,[s("Pattern Analyzer"),e(a)])]),s(" - 按正则分词，默认正则为 "),w,s("。")]),n("li",null,[n("strong",null,[n("a",z,[s("Language Analyzers"),e(a)])]),s(" - 提供 30 多种常见语言的分词器。")]),n("li",null,[n("strong",null,[n("a",G,[s("Fingerprint Analyzer"),e(a)])]),s(" - 可用于重复检测的指纹。")])]),S,n("ul",null,[n("li",null,[n("a",D,[s("极客时间教程 - Elasticsearch 核心技术与实战"),e(a)])])])])}const U=i(c,[["render",I],["__file","极客时间教程-Elasticsearch核心技术与实战笔记.html.vue"]]);export{U as default};
