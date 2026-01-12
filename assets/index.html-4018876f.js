import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c as o,a as s,b as n,d as e,e as t}from"./app-0e67a029.js";const c={},u=s("h1",{id:"elasticsearch-api",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#elasticsearch-api","aria-hidden":"true"},"#"),n(" ElasticSearch API")],-1),r={href:"https://github.com/elastic/elasticsearch",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/elastic/elasticsearch",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/apache/lucene-solr",target:"_blank",rel:"noopener noreferrer"},k=s("p",null,[s("em",null,"以下简称 ES"),n("。")],-1),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html",target:"_blank",rel:"noopener noreferrer"},b=s("h2",{id:"elasticsearch-api-简介",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#elasticsearch-api-简介","aria-hidden":"true"},"#"),n(" ElasticSearch API 简介")],-1),q=s("p",null,"Elasticsearch 官方提供了很多版本的 Java 客户端，包含但不限于：",-1),g={href:"https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/transport-client.html",target:"_blank",rel:"noopener noreferrer"},h=s("li",null,"Java REST 客户端",-1),_={href:"https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/current/index.html",target:"_blank",rel:"noopener noreferrer"},f=t(`<p>如果当前是：8.X 版本，推荐 Elasticsearch <code>Java API</code>客户端。</p><p>如果当前是：7.X 版本且不考虑升级，推荐 <code>High Level REST</code>客户端。</p><p>如果当前是：5.X、6.X 版本，推荐尽早升级集群版本。</p><h3 id="elasticsearch-java-api-client-快速入门" tabindex="-1"><a class="header-anchor" href="#elasticsearch-java-api-client-快速入门" aria-hidden="true">#</a> Elasticsearch Java API Client 快速入门</h3><p>:::detail 示例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//创建一个低级的客户端</span>
<span class="token keyword">final</span> <span class="token class-name">RestClient</span> restClient <span class="token operator">=</span> <span class="token class-name">RestClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HttpHost</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">9200</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//创建 JSON 对象映射器</span>
<span class="token keyword">final</span> <span class="token class-name">RestClientTransport</span> transport <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestClientTransport</span><span class="token punctuation">(</span>restClient<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">JacksonJsonpMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//创建 API 客户端</span>
<span class="token keyword">final</span> <span class="token class-name">ElasticsearchClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ElasticsearchClient</span><span class="token punctuation">(</span>transport<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//查询所有索引-------------------------------------------------------------------------------------</span>
<span class="token keyword">final</span> <span class="token class-name">GetIndexResponse</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">indices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>query <span class="token operator">-&gt;</span> query<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token string">&quot;_all&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">final</span> <span class="token class-name">IndexState</span> products <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;products&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>products<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//关闭</span>
client<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
transport<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
restClient<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><h3 id="transport-client-快速入门" tabindex="-1"><a class="header-anchor" href="#transport-client-快速入门" aria-hidden="true">#</a> Transport Client 快速入门</h3><p><code>TransportClient</code> 使用 <code>transport</code> 模块远程连接到 Elasticsearch 集群。它不会加入集群，而只是获取一个或多个初始传输地址，并以轮询方式与它们通信。</p>`,9),x={href:"https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/transport-client.html",target:"_blank",rel:"noopener noreferrer"},y=t(`<p>:::detail 示例</p><p>启动客户端：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 启动</span>
<span class="token class-name">TransportClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PreBuiltTransportClient</span><span class="token punctuation">(</span><span class="token class-name">Settings</span><span class="token punctuation">.</span><span class="token constant">EMPTY</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addTransportAddress</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TransportAddress</span><span class="token punctuation">(</span><span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string">&quot;host1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">9300</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addTransportAddress</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TransportAddress</span><span class="token punctuation">(</span><span class="token class-name">InetAddress</span><span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string">&quot;host2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">9300</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭</span>
client<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置集群名称</p><p>注意，如果使用的集群名称与 “elasticsearch” 不同，则必须设置集群名称。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Settings</span> settings <span class="token operator">=</span> <span class="token class-name">Settings</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;cluster.name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;myClusterName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TransportClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PreBuiltTransportClient</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Add transport addresses and do something with the client...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启用 sniffing</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Settings</span> settings <span class="token operator">=</span> <span class="token class-name">Settings</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;client.transport.sniff&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TransportClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PreBuiltTransportClient</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><h2 id="elasticsearch-rest" tabindex="-1"><a class="header-anchor" href="#elasticsearch-rest" aria-hidden="true">#</a> ElasticSearch Rest</h2><h3 id="elasticsearch-rest-api-语法格式" tabindex="-1"><a class="header-anchor" href="#elasticsearch-rest-api-语法格式" aria-hidden="true">#</a> ElasticSearch Rest API 语法格式</h3><p>向 Elasticsearch 发出的请求的组成部分与其它普通的 HTTP 请求是一样的：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> -X<span class="token operator">&lt;</span>VERB<span class="token operator">&gt;</span> <span class="token string">&#39;&lt;PROTOCOL&gt;://&lt;HOST&gt;:&lt;PORT&gt;/&lt;PATH&gt;?&lt;QUERY_STRING&gt;&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;&lt;BODY&gt;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>VERB</code>：HTTP 方法，支持：<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>HEAD</code>, <code>DELETE</code></li><li><code>PROTOCOL</code>：http 或者 https 协议（只有在 Elasticsearch 前面有 https 代理的时候可用）</li><li><code>HOST</code>：Elasticsearch 集群中的任何一个节点的主机名，如果是在本地的节点，那么就叫 localhost</li><li><code>PORT</code>：Elasticsearch HTTP 服务所在的端口，默认为 9200 PATH API 路径（例如、_count 将返回集群中文档的数量），</li><li><code>PATH</code>：可以包含多个组件，例如 <code>_cluster/stats</code> 或者 <code>_nodes/stats/jvm</code></li><li><code>QUERY_STRING</code>：一些可选的查询请求参数，例如？pretty 参数将使请求返回更加美观易读的 JSON 数据</li><li><code>BODY</code>：一个 JSON 格式的请求主体（如果请求需要的话）</li></ul><p>ElasticSearch Rest API 分为两种：</p><ul><li><strong>URI Search</strong>：在 URL 中使用查询参数</li><li><strong>Request Body Search</strong>：基于 JSON 格式的、更加完备的 DSL</li></ul><p>URI Search 示例：</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20220530072511.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Request Body Search 示例：</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20220530072654.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="索引-api" tabindex="-1"><a class="header-anchor" href="#索引-api" aria-hidden="true">#</a> 索引 API</h3>`,21),T={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-indices.html",target:"_blank",rel:"noopener noreferrer"},E=t(`<h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3><p>新建 Index，可以直接向 ES 服务器发出 <code>PUT</code> 请求。</p><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /my_index
<span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">..</span>. any settings <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type_one&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">..</span>. any mappings <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
        <span class="token string">&quot;type_two&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">..</span>. any mappings <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
        <span class="token punctuation">..</span>.
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /user
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,
      <span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器返回一个 JSON 对象，里面的 <code>acknowledged</code> 字段表示操作成功。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span><span class="token string-property property">&quot;acknowledged&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token string-property property">&quot;shards_acknowledged&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token string-property property">&quot;index&quot;</span><span class="token operator">:</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你想禁止自动创建索引，可以通过在 <code>config/elasticsearch.yml</code> 的每个节点下添加下面的配置：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>action<span class="token punctuation">.</span>auto_create_index<span class="token operator">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引" aria-hidden="true">#</a> 删除索引</h3><p>然后，我们可以通过发送 <code>DELETE</code> 请求，删除这个 Index。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE /user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除多个索引</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token constant">DELETE</span> <span class="token operator">/</span>index_one<span class="token punctuation">,</span>index_two
<span class="token constant">DELETE</span> <span class="token operator">/</span>index_<span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h3><p>可以通过 GET 请求查看索引信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看索引相关信息</span>
GET kibana_sample_data_ecommerce

<span class="token comment"># 查看索引的文档总数</span>
GET kibana_sample_data_ecommerce/_count

<span class="token comment"># 查看前 10 条文档，了解文档格式</span>
GET kibana_sample_data_ecommerce/_search

<span class="token comment"># _cat indices API</span>
<span class="token comment"># 查看 indices</span>
GET /_cat/indices/kibana*?v<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>index

<span class="token comment"># 查看状态为绿的索引</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">health</span><span class="token operator">=</span>green

<span class="token comment"># 按照文档个数排序</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>docs.count:desc

<span class="token comment"># 查看具体的字段</span>
GET /_cat/indices/kibana*?pri<span class="token operator">&amp;</span><span class="token function">v</span><span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>health,index,pri,rep,docs.count,mt

<span class="token comment"># 查看索引占用的内存</span>
GET /_cat/indices?v<span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>i,tm<span class="token operator">&amp;</span><span class="token assign-left variable">s</span><span class="token operator">=</span>tm:desc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="索引别名" tabindex="-1"><a class="header-anchor" href="#索引别名" aria-hidden="true">#</a> 索引别名</h3><p>ES 的索引别名就是给一个索引或者多个索引起的另一个名字，典型的应用场景是针对索引使用的平滑切换。</p><p>首先，创建索引 my_index，然后将别名 my_alias 指向它，示例如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /my_index
PUT /my_index/_alias/my_alias
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以通过如下形式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_aliases
<span class="token punctuation">{</span>
  <span class="token string">&quot;actions&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token string">&quot;add&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_index&quot;</span>, <span class="token string">&quot;alias&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_alias&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以在一次请求中增加别名和移除别名混合使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_aliases
<span class="token punctuation">{</span>
  <span class="token string">&quot;actions&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token string">&quot;remove&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_index&quot;</span>, <span class="token string">&quot;alias&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_alias&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span> <span class="token string">&quot;add&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_index_v2&quot;</span>, <span class="token string">&quot;alias&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_alias&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是，如果别名与索引是一对一的，使用别名索引文档或者查询文档是可以的，但是如果别名和索引是一对多的，使用别名会发生错误，因为 ES 不知道把文档写入哪个索引中去或者从哪个索引中读取文档。</p></blockquote>`,27),P={href:"https://www.knowledgedict.com/tutorial/elasticsearch-index-smooth-shift.html",target:"_blank",rel:"noopener noreferrer"},w=t(`<h3 id="打开-关闭索引" tabindex="-1"><a class="header-anchor" href="#打开-关闭索引" aria-hidden="true">#</a> 打开/关闭索引</h3><p>通过在 <code>POST</code> 中添加 <code>_close</code> 或 <code>_open</code> 可以打开、关闭索引。</p><p>打开索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开索引</span>
POST kibana_sample_data_ecommerce/_open
<span class="token comment"># 关闭索引</span>
POST kibana_sample_data_ecommerce/_close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">############Create Document############</span>
<span class="token comment">#create document. 自动生成 _id</span>
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
    <span class="token string">&quot;doc&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;post_date&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2019-05-15T14:12:12&quot;</span>,
        <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;trying out Elasticsearch&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">### Delete by Id</span>
<span class="token comment"># 删除文档</span>
DELETE users/_doc/1

<span class="token comment">### Bulk 操作</span>
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

<span class="token comment">### mget 操作</span>
GET /_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#URI 中指定 index</span>
GET /test/_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>

            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>

            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

GET /_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;field3&quot;</span>, <span class="token string">&quot;field4&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;include&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">]</span>,
                <span class="token string">&quot;exclude&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;user.location&quot;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">### msearch 操作</span>
POST kibana_sample_data_ecommerce/_msearch
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:1<span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;kibana_sample_data_flights&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:2<span class="token punctuation">}</span>

<span class="token comment">### 清除测试数据</span>
<span class="token comment">#清除数据</span>
DELETE <span class="token function">users</span>
DELETE <span class="token builtin class-name">test</span>
DELETE test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建文档" tabindex="-1"><a class="header-anchor" href="#创建文档" aria-hidden="true">#</a> 创建文档</h3><h4 id="指定-id" tabindex="-1"><a class="header-anchor" href="#指定-id" aria-hidden="true">#</a> 指定 ID</h4><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /_index/_type/_create/_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /user/_doc/_create/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;张三&quot;</span>,
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;工程师&quot;</span>,
  <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;数据库管理&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：指定 Id，如果 id 已经存在，则报错</p></blockquote><h4 id="自动生成-id" tabindex="-1"><a class="header-anchor" href="#自动生成-id" aria-hidden="true">#</a> 自动生成 ID</h4><p>新增记录的时候，也可以不指定 Id，这时要改成 POST 请求。</p><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_index/_type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /user/_doc
<span class="token punctuation">{</span>
  <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;张三&quot;</span>,
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;工程师&quot;</span>,
  <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;超级管理员&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档" aria-hidden="true">#</a> 删除文档</h3><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE /_index/_doc/_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE /user/_doc/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="更新文档" tabindex="-1"><a class="header-anchor" href="#更新文档" aria-hidden="true">#</a> 更新文档</h3><h4 id="先删除-再写入" tabindex="-1"><a class="header-anchor" href="#先删除-再写入" aria-hidden="true">#</a> 先删除，再写入</h4><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /_index/_type/_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /user/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;李四&quot;</span>,
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;工程师&quot;</span>,
  <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;超级管理员&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在原文档上增加字段" tabindex="-1"><a class="header-anchor" href="#在原文档上增加字段" aria-hidden="true">#</a> 在原文档上增加字段</h4><p>语法格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_index/_update/_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /user/_update/1
<span class="token punctuation">{</span>
    <span class="token string">&quot;doc&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;age&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;30&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询文档" tabindex="-1"><a class="header-anchor" href="#查询文档" aria-hidden="true">#</a> 查询文档</h3><h4 id="指定-id-查询" tabindex="-1"><a class="header-anchor" href="#指定-id-查询" aria-hidden="true">#</a> 指定 ID 查询</h4><p>语法格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /_index/_type/_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /user/_doc/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span><span class="token operator">:</span> <span class="token number">536248</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;found&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;user&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;工程师&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;数据库管理&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的数据中，<code>found</code> 字段表示查询成功，<code>_source</code> 字段返回原始记录。</p><p>如果 id 不正确，就查不到数据，<code>found</code> 字段就是 <code>false</code></p><h4 id="查询所有记录" tabindex="-1"><a class="header-anchor" href="#查询所有记录" aria-hidden="true">#</a> 查询所有记录</h4><p>使用 <code>GET</code> 方法，直接请求 <code>/index/type/_search</code>，就会返回所有记录。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/user/admin/_search?pretty&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;took&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;timed_out&quot;</span> <span class="token builtin class-name">:</span> false,
  <span class="token string">&quot;_shards&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;total&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">3</span>,
    <span class="token string">&quot;successful&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">3</span>,
    <span class="token string">&quot;skipped&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
    <span class="token string">&quot;failed&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;hits&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;total&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">2</span>,
    <span class="token string">&quot;max_score&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
    <span class="token string">&quot;hits&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;user&quot;</span>,
        <span class="token string">&quot;_type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;admin&quot;</span>,
        <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;WWuoDG8BHwECs7SiYn93&quot;</span>,
        <span class="token string">&quot;_score&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
        <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;李四&quot;</span>,
          <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;工程师&quot;</span>,
          <span class="token string">&quot;desc&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;系统管理&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>
        <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;user&quot;</span>,
        <span class="token string">&quot;_type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;admin&quot;</span>,
        <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>,
        <span class="token string">&quot;_score&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
        <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;user&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;张三&quot;</span>,
          <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;工程师&quot;</span>,
          <span class="token string">&quot;desc&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;超级管理员&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，返回结果的 <code>took</code>字段表示该操作的耗时（单位为毫秒），<code>timed_out</code>字段表示是否超时，<code>hits</code>字段表示命中的记录，里面子字段的含义如下。</p><ul><li><code>total</code>：返回记录数，本例是 2 条。</li><li><code>max_score</code>：最高的匹配程度，本例是<code>1.0</code>。</li><li><code>hits</code>：返回的记录组成的数组。</li></ul><p>返回的记录中，每条记录都有一个<code>_score</code>字段，表示匹配的程序，默认是按照这个字段降序排列。</p><h3 id="全文搜索" tabindex="-1"><a class="header-anchor" href="#全文搜索" aria-hidden="true">#</a> 全文搜索</h3>`,52),G={href:"https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl.html",target:"_blank",rel:"noopener noreferrer"},S=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token string">&#39;localhost:9200/user/admin/_search?pretty&#39;</span>  <span class="token parameter variable">-d</span> <span class="token string">&#39;
{
&quot;query&quot; : { &quot;match&quot; : { &quot;desc&quot; : &quot;管理&quot; }}
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),I={href:"https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},A=s("code",null,"desc",-1),O=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.38200712</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;WWuoDG8BHwECs7SiYn93&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.38200712</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&quot;user&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token string-property property">&quot;title&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;工程师&quot;</span><span class="token punctuation">,</span>
          <span class="token string-property property">&quot;desc&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;系统管理&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.3487891</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&quot;user&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token string-property property">&quot;title&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;工程师&quot;</span><span class="token punctuation">,</span>
          <span class="token string-property property">&quot;desc&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;超级管理员&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Elastic 默认一次返回 10 条结果，可以通过<code>size</code>字段改变这个设置，还可以通过<code>from</code>字段，指定位移。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/user/admin/_search&#39;</span>  <span class="token parameter variable">-d</span> <span class="token string">&#39;
{
  &quot;query&quot; : { &quot;match&quot; : { &quot;desc&quot; : &quot;管理&quot; }},
  &quot;from&quot;: 1,
  &quot;size&quot;: 1
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码指定，从位置 1 开始（默认是从位置 0 开始），只返回一条结果。</p><h3 id="逻辑运算" tabindex="-1"><a class="header-anchor" href="#逻辑运算" aria-hidden="true">#</a> 逻辑运算</h3><p>如果有多个搜索关键字， Elastic 认为它们是<code>or</code>关系。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/user/admin/_search&#39;</span>  <span class="token parameter variable">-d</span> <span class="token string">&#39;
{
&quot;query&quot; : { &quot;match&quot; : { &quot;desc&quot; : &quot;软件 系统&quot; }}
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码搜索的是<code>软件 or 系统</code>。</p>`,8),R=s("code",null,"and",-1),D={href:"https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl-bool-query.html",target:"_blank",rel:"noopener noreferrer"},j=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token string">&#39;localhost:9200/user/admin/_search?pretty&#39;</span>  <span class="token parameter variable">-d</span> <span class="token string">&#39;
{
 &quot;query&quot;: {
  &quot;bool&quot;: {
   &quot;must&quot;: [
    { &quot;match&quot;: { &quot;desc&quot;: &quot;管理&quot; } },
    { &quot;match&quot;: { &quot;desc&quot;: &quot;超级&quot; } }
   ]
  }
 }
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="批量执行" tabindex="-1"><a class="header-anchor" href="#批量执行" aria-hidden="true">#</a> 批量执行</h3><p>支持在一次 API 调用中，对不同的索引进行操作</p><p>支持四种类型操作</p><ul><li>index</li><li>create</li><li>update</li><li>delete</li></ul><p>操作中单条操作失败，并不会影响其他操作。</p><p>返回结果包括了每一条操作执行的结果。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST _bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value1&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;delete&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;create&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test2&quot;</span>, <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;field1&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;update&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>, <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;doc&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field2&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>说明：上面的示例如果执行多次，执行结果都不一样。</p></blockquote><h3 id="批量读取" tabindex="-1"><a class="header-anchor" href="#批量读取" aria-hidden="true">#</a> 批量读取</h3><p>读多个索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>读一个索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /test/_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>

            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>

            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

GET /_mget
<span class="token punctuation">{</span>
    <span class="token string">&quot;docs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;field3&quot;</span>, <span class="token string">&quot;field4&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
            <span class="token string">&quot;_index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;test&quot;</span>,
            <span class="token string">&quot;_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;3&quot;</span>,
            <span class="token string">&quot;_source&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;include&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">]</span>,
                <span class="token string">&quot;exclude&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;user.location&quot;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="批量查询" tabindex="-1"><a class="header-anchor" href="#批量查询" aria-hidden="true">#</a> 批量查询</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST kibana_sample_data_ecommerce/_msearch
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:1<span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;kibana_sample_data_flights&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">&quot;size&quot;</span>:2<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uri-search-查询语义" tabindex="-1"><a class="header-anchor" href="#uri-search-查询语义" aria-hidden="true">#</a> URI Search 查询语义</h3><p>Elasticsearch URI Search 遵循 QueryString 查询语义，其形式如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search?q<span class="token operator">=</span><span class="token number">2012</span><span class="token operator">&amp;</span><span class="token assign-left variable">df</span><span class="token operator">=</span>title<span class="token operator">&amp;</span><span class="token assign-left variable">sort</span><span class="token operator">=</span>year:desc<span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">0</span><span class="token operator">&amp;</span><span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">10</span><span class="token operator">&amp;</span><span class="token assign-left variable">timeout</span><span class="token operator">=</span>1s
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong><code>q</code></strong> 指定查询语句，使用 QueryString 语义</li><li><strong><code>df</code></strong> 默认字段，不指定时</li><li><strong><code>sort</code></strong> 排序：from 和 size 用于分页</li><li><strong><code>profile</code></strong> 可以查看查询时如何被执行的</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search?q<span class="token operator">=</span>title:2012<span class="token operator">&amp;</span><span class="token assign-left variable">sort</span><span class="token operator">=</span>year:desc<span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">0</span><span class="token operator">&amp;</span><span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">10</span><span class="token operator">&amp;</span><span class="token assign-left variable">timeout</span><span class="token operator">=</span>1s
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="term-和-phrase" tabindex="-1"><a class="header-anchor" href="#term-和-phrase" aria-hidden="true">#</a> Term 和 Phrase</h4><p>Beautiful Mind 等效于 Beautiful OR Mind</p><p>&quot;Beautiful Mind&quot; 等效于 Beautiful AND Mind</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Term 查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:Beautiful Mind
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 使用引号，Phrase 查询</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token string">&quot;Beautiful Mind&quot;</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分组与引号" tabindex="-1"><a class="header-anchor" href="#分组与引号" aria-hidden="true">#</a> 分组与引号</h4><p>title:(Beautiful AND Mind)</p><p>title=&quot;Beautiful Mind&quot;</p><h4 id="and、or、not-或者-、-、" tabindex="-1"><a class="header-anchor" href="#and、or、not-或者-、-、" aria-hidden="true">#</a> AND、OR、NOT 或者 &amp;&amp;、||、!</h4><blockquote><p>注意：AND、OR、NOT 必须大写</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 布尔操作符</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful AND Mind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET /movies/_search?q<span class="token operator">=</span>title:<span class="token punctuation">(</span>Beautiful NOT Mind<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h4><ul><li><code>[]</code> 表示闭区间</li><li><code>{}</code> 表示开区间</li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 范围查询 , 区间写法</span>
GET /movies/_search?q<span class="token operator">=</span>title:beautiful AND year:<span class="token punctuation">{</span><span class="token number">2010</span> TO <span class="token number">2018</span>%7D
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET /movies/_search?q<span class="token operator">=</span>title:beautiful AND year:<span class="token punctuation">[</span>* TO <span class="token number">2018</span><span class="token punctuation">]</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="算数符号" tabindex="-1"><a class="header-anchor" href="#算数符号" aria-hidden="true">#</a> 算数符号</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 2010 年以后的记录</span>
GET /movies/_search?q<span class="token operator">=</span>year:<span class="token operator">&gt;</span><span class="token number">2010</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 2010 年到 2018 年的记录</span>
GET /movies/_search?q<span class="token operator">=</span>year:<span class="token punctuation">(</span><span class="token operator">&gt;</span><span class="token number">2010</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">&lt;=</span><span class="token number">2018</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 2010 年到 2018 年的记录</span>
GET /movies/_search?q<span class="token operator">=</span>year:<span class="token punctuation">(</span>+<span class="token operator">&gt;</span><span class="token number">2010</span> +<span class="token operator">&lt;=</span><span class="token number">2018</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通配符查询" tabindex="-1"><a class="header-anchor" href="#通配符查询" aria-hidden="true">#</a> 通配符查询</h4><ul><li><code>?</code> 代表 1 个字符</li><li><code>*</code> 代表 0 或多个字符</li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /movies/_search?q<span class="token operator">=</span>title:mi?d
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

GET /movies/_search?q<span class="token operator">=</span>title:b*
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h4><p>title:[bt]oy</p><h4 id="模糊匹配与近似查询" tabindex="-1"><a class="header-anchor" href="#模糊匹配与近似查询" aria-hidden="true">#</a> 模糊匹配与近似查询</h4><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 相似度在 1 个字符以内</span>
GET /movies/_search?q<span class="token operator">=</span>title:beautifl~1
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 相似度在 2 个字符以内</span>
GET /movies/_search?q<span class="token operator">=</span>title:<span class="token string">&quot;Lord Rings&quot;</span>~2
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="request-body-dsl" tabindex="-1"><a class="header-anchor" href="#request-body-dsl" aria-hidden="true">#</a> Request Body &amp; DSL</h3><p>Elasticsearch 除了 URI Search 查询方式，还支持将查询语句通过 Http Request Body 发起查询。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /kibana_sample_data_ecommerce/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
	<span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>,
	<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	  <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分页" tabindex="-1"><a class="header-anchor" href="#分页" aria-hidden="true">#</a> 分页</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /kibana_sample_data_ecommerce/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h4><p>最好在数字型或日期型字段上排序</p><p>因为对于多值类型或分析过的字段排序，系统会选一个值，无法得知该值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /kibana_sample_data_ecommerce/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="source-过滤" tabindex="-1"><a class="header-anchor" href="#source-过滤" aria-hidden="true">#</a> _source 过滤</h4><p>如果 <code>_source</code> 没有存储，那就只返回匹配的文档的元数据</p><p><code>_source</code> 支持使用通配符，如：<code>_source[&quot;name*&quot;, &quot;desc*&quot;]</code></p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /kibana_sample_data_ecommerce/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;order_date&quot;</span>,
    <span class="token string">&quot;category.keyword&quot;</span>
  <span class="token punctuation">]</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="脚本字段" tabindex="-1"><a class="header-anchor" href="#脚本字段" aria-hidden="true">#</a> 脚本字段</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /kibana_sample_data_ecommerce/_search?ignore_unavailable<span class="token operator">=</span>true
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;script_fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;new_field&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;lang&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;painless&quot;</span>,
        <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;doc[&#39;order_date&#39;].value+&#39; hello&#39;&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用查询表达式-match" tabindex="-1"><a class="header-anchor" href="#使用查询表达式-match" aria-hidden="true">#</a> 使用查询表达式 - Match</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST movies/_search
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="短语搜索-match-phrase" tabindex="-1"><a class="header-anchor" href="#短语搜索-match-phrase" aria-hidden="true">#</a> 短语搜索 - Match Phrase</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;last christmas&quot;</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群-api" tabindex="-1"><a class="header-anchor" href="#集群-api" aria-hidden="true">#</a> 集群 API</h3>`,67),C={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster.html",target:"_blank",rel:"noopener noreferrer"},B=t(`<p>一些集群级别的 API 可能会在节点的子集上运行，这些节点可以用节点过滤器指定。例如，任务管理、节点统计和节点信息 API 都可以报告来自一组过滤节点而不是所有节点的结果。</p><p>节点过滤器以逗号分隔的单个过滤器列表的形式编写，每个过滤器从所选子集中添加或删除节点。每个过滤器可以是以下之一：</p><ul><li><code>_all</code>：将所有节点添加到子集</li><li><code>_local</code>：将本地节点添加到子集</li><li><code>_master</code>：将当前主节点添加到子集</li><li>根据节点 ID 或节点名将匹配节点添加到子集</li><li>根据 IP 地址或主机名将匹配节点添加到子集</li><li>使用通配符，将节点名、地址名或主机名匹配的节点添加到子集</li><li><code>master:true</code>, <code>data:true</code>, <code>ingest:true</code>, <code>voting_only:true</code>, <code>ml:true</code> 或 <code>coordinating_only:true</code>, 分别意味着将所有主节点、所有数据节点、所有摄取节点、所有仅投票节点、所有机器学习节点和所有协调节点添加到子集中。</li><li><code>master:false</code>, <code>data:false</code>, <code>ingest:false</code>, <code>voting_only:true</code>, <code>ml:false</code> 或 <code>coordinating_only:false</code>, 分别意味着将所有主节点、所有数据节点、所有摄取节点、所有仅投票节点、所有机器学习节点和所有协调节点排除在子集外。</li><li>配对模式，使用 <code>*</code> 通配符，格式为 <code>attrname:attrvalue</code>，将所有具有自定义节点属性的节点添加到子集中，其名称和值与相应的模式匹配。自定义节点属性是通过 <code>node.attr.attrname: attrvalue</code> 形式在配置文件中设置的。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果没有给出过滤器，默认是查询所有节点</span>
GET /_nodes
<span class="token comment"># 查询所有节点</span>
GET /_nodes/_all
<span class="token comment"># 查询本地节点</span>
GET /_nodes/_local
<span class="token comment"># 查询主节点</span>
GET /_nodes/_master
<span class="token comment"># 根据名称查询节点（支持通配符）</span>
GET /_nodes/node_name_goes_here
GET /_nodes/node_name_goes_*
<span class="token comment"># 根据地址查询节点（支持通配符）</span>
GET /_nodes/10.0.0.3,10.0.0.4
GET /_nodes/10.0.0.*
<span class="token comment"># 根据规则查询节点</span>
GET /_nodes/_all,master:false
GET /_nodes/data:true,ingest:true
GET /_nodes/coordinating_only:true
GET /_nodes/master:true,voting_only:false
<span class="token comment"># 根据自定义属性查询节点（如：查询配置文件中含 node.attr.rack:2 属性的节点）</span>
GET /_nodes/rack:2
GET /_nodes/ra*:2
GET /_nodes/ra*:2*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群健康-api" tabindex="-1"><a class="header-anchor" href="#集群健康-api" aria-hidden="true">#</a> 集群健康 API</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cluster/health
GET /_cluster/health?level<span class="token operator">=</span>shards
GET /_cluster/health/kibana_sample_data_ecommerce,kibana_sample_data_flights
GET /_cluster/health/kibana_sample_data_flights?level<span class="token operator">=</span>shards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群状态-api" tabindex="-1"><a class="header-anchor" href="#集群状态-api" aria-hidden="true">#</a> 集群状态 API</h3><p>集群状态 API 返回表示整个集群状态的元数据。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cluster/state
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="节点-api" tabindex="-1"><a class="header-anchor" href="#节点-api" aria-hidden="true">#</a> 节点 API</h3>`,10),N={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-nodes.html",target:"_blank",rel:"noopener noreferrer"},U=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看默认的字段</span>
GET /_cat/nodes?v<span class="token operator">=</span>true
<span class="token comment"># 查看指定的字段</span>
GET /_cat/nodes?v<span class="token operator">=</span>true<span class="token operator">&amp;</span><span class="token assign-left variable">h</span><span class="token operator">=</span>id,ip,port,v,m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分片-api" tabindex="-1"><a class="header-anchor" href="#分片-api" aria-hidden="true">#</a> 分片 API</h3>`,2),L={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-shards.html",target:"_blank",rel:"noopener noreferrer"},H=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看默认的字段</span>
GET /_cat/shards
<span class="token comment"># 根据名称查询分片（支持通配符）</span>
GET /_cat/shards/my-index-*
<span class="token comment"># 查看指定的字段</span>
GET /_cat/shards?h<span class="token operator">=</span>index,shard,prirep,state,unassigned.reason
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监控-api" tabindex="-1"><a class="header-anchor" href="#监控-api" aria-hidden="true">#</a> 监控 API</h3><p>Elasticsearch 中集群相关的健康、统计等相关的信息都是围绕着 <code>cat</code> API 进行的。</p><p>通过 GET 请求发送 cat，下面列出了所有可用的 API：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cat

<span class="token operator">=</span>^.^<span class="token operator">=</span>
/_cat/allocation
/_cat/shards
/_cat/shards/<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
/_cat/master
/_cat/nodes
/_cat/tasks
/_cat/indices
/_cat/indices/<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
/_cat/segments
/_cat/segments/<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
/_cat/count
/_cat/count/<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
/_cat/recovery
/_cat/recovery/<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
/_cat/health
/_cat/pending_tasks
/_cat/aliases
/_cat/aliases/<span class="token punctuation">{</span>alias<span class="token punctuation">}</span>
/_cat/thread_pool
/_cat/thread_pool/<span class="token punctuation">{</span>thread_pools<span class="token punctuation">}</span>
/_cat/plugins
/_cat/fielddata
/_cat/fielddata/<span class="token punctuation">{</span>fields<span class="token punctuation">}</span>
/_cat/nodeattrs
/_cat/repositories
/_cat/snapshots/<span class="token punctuation">{</span>repository<span class="token punctuation">}</span>
/_cat/templates
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,6),M={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#elasticsearch.clients",target:"_blank",rel:"noopener noreferrer"};function J(Y,V){const a=l("ExternalLinkIcon");return p(),o("div",null,[u,s("blockquote",null,[s("p",null,[s("strong",null,[s("a",r,[n("Elasticsearch"),e(a)]),n(" 是一个分布式、RESTful 风格的搜索和数据分析引擎")]),n("，能够解决不断涌现出的各种用例。 作为 Elastic Stack 的核心，它集中存储您的数据，帮助您发现意料之中以及意料之外的情况。")]),s("p",null,[s("a",d,[n("Elasticsearch"),e(a)]),n(" 基于搜索库 "),s("a",v,[n("Lucene"),e(a)]),n(" 开发。ElasticSearch 隐藏了 Lucene 的复杂性，提供了简单易用的 REST API / Java API 接口（另外还有其他语言的 API 接口）。")]),k,s("p",null,[n("REST API 最详尽的文档应该参考："),s("a",m,[n("ES 官方 REST API"),e(a)])])]),b,q,s("ul",null,[s("li",null,[s("a",g,[n("Transport Client"),e(a)]),n(" - 7.0 废弃，8.0 移除。")]),h,s("li",null,[s("a",_,[n("Elasticsearch Java API Client"),e(a)]),n(" -")])]),f,s("blockquote",null,[s("p",null,[n("扩展："),s("a",x,[n("https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/transport-client.html"),e(a)])])]),y,s("blockquote",null,[s("p",null,[n("参考资料："),s("a",T,[n("Elasticsearch 官方之 cat 索引 API"),e(a)])])]),E,s("p",null,[n("ES 索引别名有个典型的应用场景是平滑切换，更多细节可以查看 "),s("a",P,[n("Elasticsearch（ES）索引零停机（无需重启）无缝平滑切换的方法"),e(a)]),n("。")]),w,s("p",null,[n("ES 的查询非常特别，使用自己的 "),s("a",G,[n("查询语法"),e(a)]),n("，要求 GET 请求带有数据体。")]),S,s("p",null,[n("上面代码使用 "),s("a",I,[n("Match 查询"),e(a)]),n("，指定的匹配条件是"),A,n('字段里面包含"软件"这个词。返回结果如下。')]),O,s("p",null,[n("如果要执行多个关键词的"),R,n("搜索，必须使用 "),s("a",D,[n("布尔查询"),e(a)]),n("。")]),j,s("blockquote",null,[s("p",null,[s("a",C,[n("Elasticsearch 官方之 Cluster API"),e(a)])])]),B,s("blockquote",null,[s("p",null,[s("a",N,[n("Elasticsearch 官方之 cat Nodes API"),e(a)]),n("——返回有关集群节点的信息。")])]),U,s("blockquote",null,[s("p",null,[s("a",L,[n("Elasticsearch 官方之 cat Shards API"),e(a)]),n("——shards 命令是哪些节点包含哪些分片的详细视图。它会告诉你它是主还是副本、文档数量、它在磁盘上占用的字节数以及它所在的节点。")])]),H,s("ul",null,[s("li",null,[s("a",M,[n("Elasticsearch 官方文档"),e(a)])]),s("li",null,[s("a",z,[n("https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#elasticsearch.clients"),e(a)])])])])}const Q=i(c,[["render",J],["__file","index.html.vue"]]);export{Q as default};
