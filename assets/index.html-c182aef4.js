import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as p,c as u,a as s,b as n,d as t,f as c,e}from"./app-0e67a029.js";const o={},r=s("h1",{id:"《极客时间教程-elasticsearch-核心技术与实战》笔记二",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#《极客时间教程-elasticsearch-核心技术与实战》笔记二","aria-hidden":"true"},"#"),n(" 《极客时间教程 - Elasticsearch 核心技术与实战》笔记二")],-1),d={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"},k=e(`<h2 id="第四章-深入搜索" tabindex="-1"><a class="header-anchor" href="#第四章-深入搜索" aria-hidden="true">#</a> 第四章：深入搜索</h2><h3 id="基于词项和基于全文的搜索" tabindex="-1"><a class="header-anchor" href="#基于词项和基于全文的搜索" aria-hidden="true">#</a> 基于词项和基于全文的搜索</h3><h4 id="基于词项的查询" tabindex="-1"><a class="header-anchor" href="#基于词项的查询" aria-hidden="true">#</a> 基于词项的查询</h4><p>Term 是表达语意的最小单位。搜索和利用统计语言模型进行自然语言处理都需要处理 Term</p><p>Term 级别查询：Term / Range / Exists / Prefix / Wildcard</p><p>在 ES 中，Term 查询，对输入不做分词。会将输入作为一个整体，在倒排索引中查找准确的词项，并且使用相关度计算公式为每个包含该词项的文档进行相关度计算。</p><p>可以通过 Constant Score 将查询转换成一个 Filtering，避免算法，并利用缓存，提高性能。</p><h4 id="基于文本的查询" tabindex="-1"><a class="header-anchor" href="#基于文本的查询" aria-hidden="true">#</a> 基于文本的查询</h4><p>文本查询：match、match_phrase、query_string</p><p>索引和搜索时都会进行分词，查询字符串先传递到一个合适的分词器，然后生成一个供查询的词项列表。</p><p>查询时，会先对输入的查询进行分词，然后每个词项柱哥进行底层的查询，最终将结果进行合并，并为每个文档计算一个相关度分值。</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE products
PUT products
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /products/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>,<span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;iPhone&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;KDKE-B-9947-#kL5&quot;</span>,<span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;iPad&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span>,<span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;MBP&quot;</span> <span class="token punctuation">}</span>

GET /products

POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        //<span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;iPhone&quot;</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;iphone&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;desc.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        //<span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;iPhone&quot;</span>
        //<span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;iphone&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;productID&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /products/_search
<span class="token punctuation">{</span>
  //<span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#设置 position_increment_gap</span>
DELETE <span class="token function">groups</span>
PUT <span class="token function">groups</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;names&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;position_increment_gap&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET groups/_mapping

POST groups/_doc
<span class="token punctuation">{</span>
  <span class="token string">&quot;names&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;John Water&quot;</span>, <span class="token string">&quot;Water Smith&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

POST groups/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;names&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Water Water&quot;</span>,
        <span class="token string">&quot;slop&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST groups/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;names&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Water Smith&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构化搜索" tabindex="-1"><a class="header-anchor" href="#结构化搜索" aria-hidden="true">#</a> 结构化搜索</h3><p>结构化搜索是指对结构化数据的搜索。</p><p>日期、布尔、和数字类型都是结构化的。它们都有精确的格式，可以根据这些格式进行逻辑操作，如：比较范围、判定大小。</p><p>文本也可以是结构化的。结构化的文本可以精确匹配（term）或部分匹配（prefix）</p><p>结构化结果只有是或否两个选项。</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#结构化搜索，精确匹配</span>
DELETE products
POST /products/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2018-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">20</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2019-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;KDKE-B-9947-#kL5&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:true, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:false, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;QQPX-R-3956-#aD8&quot;</span> <span class="token punctuation">}</span>

GET products/_mapping

<span class="token comment">#对布尔值 match 查询，有算分</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#对布尔值，通过 constant score 转成 filtering，没有算分</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#数字类型 Term</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#数字类型 terms</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;20&quot;</span>,
            <span class="token string">&quot;30&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#数字 Range 查询</span>
GET products/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;constant_score&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;filter&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;range&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                        <span class="token string">&quot;gte&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">20</span>,
                        <span class="token string">&quot;lte&quot;</span>  <span class="token builtin class-name">:</span> <span class="token number">30</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 日期 range</span>
POST products/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;constant_score&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;filter&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;range&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;date&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                      <span class="token string">&quot;gte&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;now-1y&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#exists 查询</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;exists&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#处理多值字段</span>
POST /movies/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Father of the Bridge Part II&quot;</span>,<span class="token string">&quot;year&quot;</span>:1995, <span class="token string">&quot;genre&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Comedy&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Dave&quot;</span>,<span class="token string">&quot;year&quot;</span>:1993,<span class="token string">&quot;genre&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;Comedy&quot;</span>,<span class="token string">&quot;Romance&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>

<span class="token comment">#处理多值字段，term 查询是包含，而不是等于</span>
POST movies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;genre.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Comedy&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#字符类型 terms</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;QQPX-R-3956-#aD8&quot;</span>,
            <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2019-01-01&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2019-01-01&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#对布尔数值</span>
POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;false&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;false&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;20&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;profile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;20&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;must_not&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;exists&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="搜索的相关性算分" tabindex="-1"><a class="header-anchor" href="#搜索的相关性算分" aria-hidden="true">#</a> 搜索的相关性算分</h3><p>搜索的相关性打分，描述了一个文档和查询语句匹配的程度。ES 会对每个匹配查询条件的结果进行算分（_score）。</p><p>ES5 之前，默认的相关性算法是 TD-IDF；ES5 后，采用 BM25。</p><p>词频（Term Frequency，TF） - 检索词在一篇文档中出现的频率</p><p>逆文档频率（Inverse Document Frequency，IDF） - log（全部文档数/检索词出现过的文档总数），用以表示检索词在所有文档中出现的频率。</p><p>Stop Word - 词项出现频率岁高，但对相关度几乎没有用户，例如：的、the、a 之类的词。</p><p>TF-IDF 本质上就是将 TF 求和变成了加权求和。</p><p>和 TF-IDF 相比，当 TF 无限增加时， BM 25 分支会趋于一个平稳值。</p><p>Boosting 是控制相关度的一种手段。</p><ul><li>boost &gt; 1，打分的权重提升；</li><li>0 &lt; boost &lt; 1，打分的权重降低</li><li>boost &lt; 0，贡献负分</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT testscore
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT testscore/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;we use Elasticsearch to power the search&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;we like elasticsearch&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;The scoring of documents is caculated by the scoring formula&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;you know, for search&quot;</span> <span class="token punctuation">}</span>

POST /testscore/_search
<span class="token punctuation">{</span>
  //<span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;you&quot;</span>
      //<span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;elasticsearch&quot;</span>
      //<span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;the&quot;</span>
      //<span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;the elasticsearch&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST testscore/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;boosting&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;positive&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;content&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;elasticsearch&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;negative&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                 <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                     <span class="token string">&quot;content&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;like&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;negative_boost&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0.2</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST tmdb/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;title&quot;</span>,
    <span class="token string">&quot;overview&quot;</span>
  <span class="token punctuation">]</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;more_like_this&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;title^10&quot;</span>,
        <span class="token string">&quot;overview&quot;</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;like&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;14191&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;min_term_freq&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
      <span class="token string">&quot;max_query_terms&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="query-filtering-实现多字符串多字段查询" tabindex="-1"><a class="header-anchor" href="#query-filtering-实现多字符串多字段查询" aria-hidden="true">#</a> Query &amp; Filtering 实现多字符串多字段查询</h3><p>ES 中，有 Query 和 Filter 两种不同的 Context</p><ul><li>Query - 有相关性计算</li><li>Filter - 没有相关性计算，可以利用缓存，性能更好</li></ul><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /products/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2018-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">20</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2019-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;KDKE-B-9947-#kL5&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:true, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:false, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;QQPX-R-3956-#aD8&quot;</span> <span class="token punctuation">}</span>

<span class="token comment">#基本语法</span>
POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;30&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;avaliable&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;must_not&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;range&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;lte&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;should&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;productID.keyword&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;productID.keyword&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span> :1
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#改变数据模型，增加字段。解决数组包含而不是精确匹配的问题</span>
POST /newmovies/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Father of the Bridge Part II&quot;</span>,<span class="token string">&quot;year&quot;</span>:1995, <span class="token string">&quot;genre&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Comedy&quot;</span>,<span class="token string">&quot;genre_count&quot;</span>:1 <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;Dave&quot;</span>,<span class="token string">&quot;year&quot;</span>:1993,<span class="token string">&quot;genre&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;Comedy&quot;</span>,<span class="token string">&quot;Romance&quot;</span><span class="token punctuation">]</span>,<span class="token string">&quot;genre_count&quot;</span>:2 <span class="token punctuation">}</span>

<span class="token comment">#must，有算分</span>
POST /newmovies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;genre.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Comedy&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span><span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;genre_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Filter。不参与算分，结果的 score 是 0</span>
POST /newmovies/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;genre.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Comedy&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span><span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;genre_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">]</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Filtering Context</span>
POST _search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;avaliable&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;must_not&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;range&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;lte&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Query Context</span>
POST /products/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2018-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">20</span>,<span class="token string">&quot;avaliable&quot;</span>:true,<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;2019-01-01&quot;</span>, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;KDKE-B-9947-#kL5&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:true, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">30</span>,<span class="token string">&quot;avaliable&quot;</span>:false, <span class="token string">&quot;productID&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;QQPX-R-3956-#aD8&quot;</span> <span class="token punctuation">}</span>

POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;productID.keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span><span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> true<span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#嵌套，实现了 should not 逻辑</span>
POST /products/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;30&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;must_not&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;avaliable&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;false&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Controll the Precision</span>
POST _search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;30&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;avaliable&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;must_not&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;range&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;price&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;lte&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">10</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;should&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;productID.keyword&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;JODL-X-1937-#pV7&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;productID.keyword&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;XHDK-A-1293-#fJ3&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span> :2
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /animals/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;red&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span>   <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dog&quot;</span>   <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /animals/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;dog&quot;</span>   <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;bool&quot;</span>:<span class="token punctuation">{</span>
            <span class="token string">&quot;should&quot;</span>:<span class="token punctuation">[</span>
               <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
                 <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE blogs
POST /blogs/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple iPad&quot;</span>, <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple iPad,Apple iPad&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple iPad,Apple iPad&quot;</span>, <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple iPad&quot;</span> <span class="token punctuation">}</span>

POST blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;apple,ipad&quot;</span>,
            <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.1</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>,

        <span class="token punctuation">{</span><span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;apple,ipad&quot;</span>,
            <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE news
POST /news/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple Mac&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple iPad&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Apple employee like Apple Pie and Apple Juice&quot;</span> <span class="token punctuation">}</span>

POST news/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST news/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;must_not&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;pie&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST news/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;boosting&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;positive&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;apple&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;negative&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;pie&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;negative_boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.5</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单字符串多字段查询-dismaxquery" tabindex="-1"><a class="header-anchor" href="#单字符串多字段查询-dismaxquery" aria-hidden="true">#</a> 单字符串多字段查询 - DisMaxQuery</h3><p>Disjunction Max Query - 将评分最高的字符评分作为结果返回，满足多个字段是竞争关系的场景</p><p>对最佳字段查询进行调优：通过控制 tie_breaker 参数，引入其他字段对计算的一些影响</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /blogs/_doc/1
<span class="token punctuation">{</span>
    <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick brown rabbits&quot;</span>,
    <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Brown rabbits are commonly seen.&quot;</span>
<span class="token punctuation">}</span>

PUT /blogs/_doc/2
<span class="token punctuation">{</span>
    <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Keeping pets healthy&quot;</span>,
    <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;My quick brown fox eats rabbits on a regular basis.&quot;</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Brown fox&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST blogs/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;dis_max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;queries&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;dis_max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;queries&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick pets&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick pets&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;tie_breaker&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单字符串多字段查询-multi-match" tabindex="-1"><a class="header-anchor" href="#单字符串多字段查询-multi-match" aria-hidden="true">#</a> 单字符串多字段查询 - Multi Match</h3><p>场景：最佳字段、多数字段、混合字段</p><p>multi_match</p><p>best_fields 是默认类型，可以不指定</p><p>minimum_should_match 等参数可以传递到生成的 query 中</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST blogs/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;dis_max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;queries&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
                <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Quick pets&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;tie_breaker&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.2</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;best_fields&quot;</span>,
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick pets&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;title&quot;</span>,<span class="token string">&quot;body&quot;</span><span class="token punctuation">]</span>,
      <span class="token string">&quot;tie_breaker&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.2</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;20%&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST books/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Quick brown fox&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;*_title&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST books/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;Quick brown fox&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;*_title&quot;</span>, <span class="token string">&quot;chapter_title^2&quot;</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE /titles
PUT /titles
<span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;my_type&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span>     <span class="token string">&quot;string&quot;</span>,
                    <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;english&quot;</span>,
                    <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                        <span class="token string">&quot;std&quot;</span><span class="token builtin class-name">:</span>   <span class="token punctuation">{</span>
                            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span>     <span class="token string">&quot;string&quot;</span>,
                            <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /titles
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;english&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST titles/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;My dog barks&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;I see a lot of barking dogs on the road &quot;</span> <span class="token punctuation">}</span>

GET titles/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;barking dogs&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE /titles
PUT /titles
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;english&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;std&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,<span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST titles/_bulk
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;My dog barks&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;I see a lot of barking dogs on the road &quot;</span> <span class="token punctuation">}</span>

GET /titles/_search
<span class="token punctuation">{</span>
   <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>  <span class="token string">&quot;barking dogs&quot;</span>,
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;most_fields&quot;</span>,
            <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;title.std&quot;</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET /titles/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;barking dogs&quot;</span>,
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;most_fields&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;title^10&quot;</span>,
        <span class="token string">&quot;title.std&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多语言及中文分词与检索" tabindex="-1"><a class="header-anchor" href="#多语言及中文分词与检索" aria-hidden="true">#</a> 多语言及中文分词与检索</h3><p>自然语言与查询 recall</p><p>处理人类自然语言时，有些情况下，尽管搜索和原文不完全匹配，但希望搜到一些内容。</p><p>可采取的优化：</p><ul><li>归一化词元</li><li>抽取词根</li><li>包含同义词</li><li>拼写错误</li></ul><p>混合语言、中文的分词都存在一些挑战</p><ul><li>词干提取</li><li>不正确的文档频率</li><li>语言识别</li><li>歧义</li></ul><p>中文分析器</p><ul><li>elasticsearch-analysis-hanlp</li><li>elasticsearch-analysis-ik</li><li>elasticsearch-analysis-pinyin</li></ul><h3 id="spacejam-一个全文搜索的实例" tabindex="-1"><a class="header-anchor" href="#spacejam-一个全文搜索的实例" aria-hidden="true">#</a> SpaceJam 一个全文搜索的实例</h3><h3 id="使用-searchtemplate-和-indexalias-进行查询" tabindex="-1"><a class="header-anchor" href="#使用-searchtemplate-和-indexalias-进行查询" aria-hidden="true">#</a> 使用 SearchTemplate 和 IndexAlias 进行查询</h3><h3 id="综合排序-function-score-query-优化算分" tabindex="-1"><a class="header-anchor" href="#综合排序-function-score-query-优化算分" aria-hidden="true">#</a> 综合排序：Function Score Query 优化算分</h3><p>ES 默认会以文档的相关度算分进行排序</p><p>可以指定一个或多个字段进行排序</p><p>使用相关度算分排序，不能满足某些特定条件</p><p>function_score 可以在查询结束后，对每一个匹配的文档进行一系列的重新算分，根据新生成的分数进行排序。提供了几种默认的计算分值的函数：</p><ul><li>weight - 为每一个文档设置一个简单而不被规范化的权重</li><li>field_value_factor - 使用该数值来修改 <code>_score</code></li><li>random_score - 为每一个用户使用一个不同的，随机算分结果</li><li>衰减函数 - 以某个字段的值为标准，距离某个值越近，得分越高</li><li>script_score - 自定义脚本完全控制所需逻辑</li></ul><p>Boost Mode</p><ul><li>multiply</li><li>sum</li><li>min / max</li><li>replace</li></ul><p>Max Boost 可以将算分控制在一个最大值</p><p>【示例】</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE blogs
PUT /blogs/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;About popularity&quot;</span>,
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;In this post we will talk about...&quot;</span>,
  <span class="token string">&quot;votes&quot;</span><span class="token builtin class-name">:</span>   <span class="token number">0</span>
<span class="token punctuation">}</span>

PUT /blogs/_doc/2
<span class="token punctuation">{</span>
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;About popularity&quot;</span>,
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;In this post we will talk about...&quot;</span>,
  <span class="token string">&quot;votes&quot;</span><span class="token builtin class-name">:</span>   <span class="token number">100</span>
<span class="token punctuation">}</span>

PUT /blogs/_doc/3
<span class="token punctuation">{</span>
  <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;About popularity&quot;</span>,
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;In this post we will talk about...&quot;</span>,
  <span class="token string">&quot;votes&quot;</span><span class="token builtin class-name">:</span>   <span class="token number">1000000</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;popularity&quot;</span>,
          <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;content&quot;</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;field_value_factor&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;votes&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;popularity&quot;</span>,
          <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;content&quot;</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;field_value_factor&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;votes&quot;</span>,
        <span class="token string">&quot;modifier&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;log1p&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;popularity&quot;</span>,
          <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;content&quot;</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;field_value_factor&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;votes&quot;</span>,
        <span class="token string">&quot;modifier&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;log1p&quot;</span> ,
        <span class="token string">&quot;factor&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>    <span class="token string">&quot;popularity&quot;</span>,
          <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;content&quot;</span> <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;field_value_factor&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;votes&quot;</span>,
        <span class="token string">&quot;modifier&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;log1p&quot;</span> ,
        <span class="token string">&quot;factor&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.1</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;boost_mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;sum&quot;</span>,
      <span class="token string">&quot;max_boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /blogs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;random_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;seed&quot;</span><span class="token builtin class-name">:</span> <span class="token number">911119</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="term-phrasesuggester" tabindex="-1"><a class="header-anchor" href="#term-phrasesuggester" aria-hidden="true">#</a> Term&amp;PhraseSuggester</h3><h3 id="自动补全与基于上下文的提示" tabindex="-1"><a class="header-anchor" href="#自动补全与基于上下文的提示" aria-hidden="true">#</a> 自动补全与基于上下文的提示</h3><p>Completion Suggester，对性能要求比较苛刻。采用了不同的数据结构，并非通过倒排索引来完成。而是将 Analyze 的数据编码成 FST 和索引一起存放。FST 会被 ES 整个加载进内存，速度很快。</p><p>精准度：completion &gt; Phrase &gt; Term</p><p>召回率：Term &gt; Phrase &gt; Completion</p><p>性能：Completion &gt; Phrase &gt; Term</p><h3 id="跨集群搜索" tabindex="-1"><a class="header-anchor" href="#跨集群搜索" aria-hidden="true">#</a> 跨集群搜索</h3><p>早期版本，通过 Tribe Node 可以实现多集群访问的需求，但是还存在一定的问题，现已废弃。</p><p>ES 5.3 引入了跨集群搜索的功能。</p><ul><li>允许任何节点扮演 federated 节点，以轻量的方式，将搜索请求进行代理</li><li>不需要以 Client Node 形式加入其他集群</li></ul><h2 id="第五章-分布式特性及分布式搜索的机制" tabindex="-1"><a class="header-anchor" href="#第五章-分布式特性及分布式搜索的机制" aria-hidden="true">#</a> 第五章：分布式特性及分布式搜索的机制</h2><h3 id="集群分布式模型及选主与脑裂问题" tabindex="-1"><a class="header-anchor" href="#集群分布式模型及选主与脑裂问题" aria-hidden="true">#</a> 集群分布式模型及选主与脑裂问题</h3><p>分布式特性：高可用、易扩展（水平扩展，支持 PB 级数据）</p><p>ES 集群名称可以通过配置或 -E cluster.name=xxx 来设定。</p><p>ES 节点本质上就是一个 JAVA 进程。一台机器上可以运行多个 ES 进程。</p><p>每个 ES 节点都有名字，可以通过配置文件或 -E node.name=xxx 来设定。</p><p>每个 ES 节点在启动后，会分片一个 UID，保存在 data 目录下。</p><ul><li>Coordinating Node - 处理请求的节点，叫 Coordinating Node（协调节点），每个节点默认都是协调节点。</li><li>Data Node - 保存分片数据的节点。默认就是 data node，可以设置 <code>node.data: false</code> 禁止成为数据节点。</li><li>Master Node - 负责处理创建、删除索引等请求；决定分片被分配到哪个节点；负责索引的创建与删除；维护并更新集群状态。 <ul><li>节点启动后，默认为主节点的候选节点，可以在必要时参与选主，成为 master node。可以设置 node.master: false 禁止成为主节点候选节点。</li></ul></li><li>集群状态 <ul><li>所有的节点信息</li><li>所有的索引和其相关的 mapping、setting</li><li>分片的路由信息</li><li>每个节点上都保存了集群的状态信息</li><li>只有 master 节点才能修改集群的状态信息，并负责同步给其他节点</li></ul></li></ul><h4 id="选主过程" tabindex="-1"><a class="header-anchor" href="#选主过程" aria-hidden="true">#</a> 选主过程</h4><p>集群中的节点互 ping，node id 最小的会成为被选举的节点。</p><p>其他节点会加入集群，但是不承担 master 节点的角色，一旦发现被选中的主节点丢失，就会选举出新的 master。</p><h4 id="避免脑裂" tabindex="-1"><a class="header-anchor" href="#避免脑裂" aria-hidden="true">#</a> 避免脑裂</h4><p>7.0 之前，minimum_master_nodes 设为 N / 2 + 1</p><p>7.0 开始，ES 自动选择以形成仲裁的节点。</p><h3 id="分片与集群的故障转移" tabindex="-1"><a class="header-anchor" href="#分片与集群的故障转移" aria-hidden="true">#</a> 分片与集群的故障转移</h3><p>主分片 - 水平扩展</p><p>副本分片 - 高可用：冗余、故障转移</p><p>分片数过小：无法通过增加节点实现扩展；分片数过大：使得单个分片容量很小，导致一个节点上有过多分片，影响性能。</p><h3 id="文档分布式存储" tabindex="-1"><a class="header-anchor" href="#文档分布式存储" aria-hidden="true">#</a> 文档分布式存储</h3><p>文档到分配的路由</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>shard = hash(_routing) % number_of_primary_shards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>hash 算法确保离散</p><p>默认的 _routing 值是文档 id，可以定制 routing 数值</p><p>这也是设置 setting 中主分片数后，不能随意修改的根本原因。</p><h3 id="分片及其生命周期" tabindex="-1"><a class="header-anchor" href="#分片及其生命周期" aria-hidden="true">#</a> 分片及其生命周期</h3><p>分片是 ES 中的最小工作单元。分片是一个 Lucene 的索引。</p><h4 id="倒排索引不可变性" tabindex="-1"><a class="header-anchor" href="#倒排索引不可变性" aria-hidden="true">#</a> 倒排索引不可变性</h4><p>无需考虑并发写文件的问题，避免了锁机制带来的性能问题</p><p>一旦读入内核的文件系统缓存，便留在哪里。只要文件系统存有足够的空间，大部分请求就会直接请求内存，不会命中磁盘，提升了很大的性能</p><p>如果需要让一个新的文档可以被搜索，需要重建整个索引。</p><h4 id="lucene-index" tabindex="-1"><a class="header-anchor" href="#lucene-index" aria-hidden="true">#</a> Lucene Index</h4><p>在 Lucene 中，单个倒排索引文件被称为 Segment。Segment 是自包闭的，不可变更的。多个 Segment 汇总在一起，称为 Lucene 的 Index，其对应的就是 ES 中的 shard</p><p>当有新文档写入时，会生成新 Segment，查询时会同时查询所有 Segment，并且对结果汇总。Lucene 中有一个文件，用来记录所有 Segment 信息，叫做 Commit Point。</p><p>删除的文档信息，保存在 .del 文件中。</p><h4 id="什么是-refresh" tabindex="-1"><a class="header-anchor" href="#什么是-refresh" aria-hidden="true">#</a> 什么是 Refresh</h4><p>将 Index buffer 写入 Segment 的过程叫 refresh。refresh 不执行 fsync 操作。</p><p>refresh 默认 1 秒发生一次，refresh 后，数据就可以被搜索到了。</p><p>如果系统有大量的数据写入，就会产生很多的 Segment</p><p>index buffer 被占满时，会触发 refresh，默认是 JVM 的 10%</p><h4 id="什么是事务日志" tabindex="-1"><a class="header-anchor" href="#什么是事务日志" aria-hidden="true">#</a> 什么是事务日志</h4><p>segment 写入磁盘的过程相对耗时，借助文件系统缓存，refresh 时，现将 segment 写入缓存以开放查询</p><p>为了保证数据不丢失，所以在 index 文档时，同时写事务日志，高版本开始，事务日志默认落盘。每个分片有一个事务日志。</p><p>在 ES refresh 时，index buffer 被清空，事务日志不会清空</p><h4 id="什么是-flush" tabindex="-1"><a class="header-anchor" href="#什么是-flush" aria-hidden="true">#</a> 什么是 flush</h4><p>调用 refresh，index buffer 清空并 refresh</p><p>调用 fsync，将缓存中的 segments 写入磁盘</p><p>清空事务日志</p><p>默认 30 分钟调用一次</p><p>事务日志满（512MB）</p><h4 id="merge" tabindex="-1"><a class="header-anchor" href="#merge" aria-hidden="true">#</a> Merge</h4><p>Segment 很多，需要被定期合并</p><p>ES 和 Lucene 会自动进行 Merge 操作</p><h3 id="剖析分布式查询及相关性评分" tabindex="-1"><a class="header-anchor" href="#剖析分布式查询及相关性评分" aria-hidden="true">#</a> 剖析分布式查询及相关性评分</h3><p>ES 搜索分为两阶段：</p><ol><li>Query</li><li>Fetch</li></ol><h4 id="query-阶段" tabindex="-1"><a class="header-anchor" href="#query-阶段" aria-hidden="true">#</a> Query 阶段</h4><p>用户发出搜索请求到 ES 节点。节点收到请求后，会以协调节点的身份，在所有主副本分片中随机选择主分片数个分片，发送查询请求。</p><p>被选中的分片执行查询，进行排序。然后，每个分片都会返回 from +size 个排序后的文档 id 和排序值给协调节点。</p><h4 id="fetch-阶段" tabindex="-1"><a class="header-anchor" href="#fetch-阶段" aria-hidden="true">#</a> Fetch 阶段</h4><p>协调节点会将 Query 阶段从每个分片获取的排序后的文档 id 列表，进行重排序，选取 from 到 from +size 个文档的 id</p><p>以 multi get 请求的方式，到相应的分片获取详细的文档数据</p><h4 id="潜在问题" tabindex="-1"><a class="header-anchor" href="#潜在问题" aria-hidden="true">#</a> 潜在问题</h4><p>性能问题</p><ul><li>每个分片上需要查的文档数 = from + size</li><li>最终协调节点需要处理 = 主分片数 * ( from + size)</li><li>深度分页</li></ul><p>相关性算分</p><p>每个分片都要基于自己分片上的数据进行相关度计算。这会导致打分偏离的情况，尤其是数据量很少时。当文档总数很少的情况下，主分片数越多，相关性计算会越不准。</p><p>解决算分不准的方法</p><p>将主分片数设为 1；</p><p>使用 <code>_search?search_type=dfs_query_then_fetch</code>，消耗更多 CPU 和内存，执行性能低下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE message
PUT message
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">20</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET message

POST message/_doc?routing<span class="token operator">=</span><span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;good&quot;</span>
<span class="token punctuation">}</span>

POST message/_doc?routing<span class="token operator">=</span><span class="token number">2</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;good morning&quot;</span>
<span class="token punctuation">}</span>

POST message/_doc?routing<span class="token operator">=</span><span class="token number">3</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;good morning everyone&quot;</span>
<span class="token punctuation">}</span>

POST message/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST message/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;explain&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;good&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST message/_search?search_type<span class="token operator">=</span>dfs_query_then_fetch
<span class="token punctuation">{</span>

  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;content&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;good&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序及-docvalues-fielddata" tabindex="-1"><a class="header-anchor" href="#排序及-docvalues-fielddata" aria-hidden="true">#</a> 排序及 DocValues&amp;Fielddata</h3><p>默认采用相关性算分对结果进行降序排序</p><p>可以通过设定 sorting 参数，自行设定排序</p><p>如果不指定 _score，算分为 null</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#单字段排序</span>
POST /kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#多字段排序</span>
POST /kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,
    <span class="token punctuation">{</span><span class="token string">&quot;_doc&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;asc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,
    <span class="token punctuation">{</span><span class="token string">&quot;_score&quot;</span>:<span class="token punctuation">{</span> <span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

GET kibana_sample_data_ecommerce/_mapping

<span class="token comment">#对 text 字段进行排序。默认会报错，需打开 fielddata</span>
POST /kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#打开 text 的 fielddata</span>
PUT kibana_sample_data_ecommerce/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;customer_full_name&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
          <span class="token string">&quot;fielddata&quot;</span><span class="token builtin class-name">:</span> true,
          <span class="token string">&quot;fields&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;keyword&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;type&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
              <span class="token string">&quot;ignore_above&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#关闭 keyword 的 doc values</span>
PUT test_keyword
PUT test_keyword/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;user_name&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
      <span class="token string">&quot;doc_values&quot;</span>:false
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE test_keyword

PUT test_text
PUT test_text/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;intro&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;doc_values&quot;</span>:true
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE test_text

DELETE temp_users
PUT temp_users
PUT temp_users/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,<span class="token string">&quot;fielddata&quot;</span><span class="token builtin class-name">:</span> true<span class="token punctuation">}</span>,
    <span class="token string">&quot;desc&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,<span class="token string">&quot;fielddata&quot;</span><span class="token builtin class-name">:</span> true<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Post temp_users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Jack&quot;</span>,<span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Jack is a good boy!&quot;</span>,<span class="token string">&quot;age&quot;</span>:10<span class="token punctuation">}</span>

<span class="token comment">#打开 fielddata 后，查看 docvalue_fields 数据</span>
POST  temp_users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;docvalue_fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;name&quot;</span>,<span class="token string">&quot;desc&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#查看整型字段的 docvalues</span>
POST  temp_users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;docvalue_fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;age&quot;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页与遍历-fromsize-searchafter-scrollapi" tabindex="-1"><a class="header-anchor" href="#分页与遍历-fromsize-searchafter-scrollapi" aria-hidden="true">#</a> 分页与遍历-FromSize&amp;SearchAfter&amp;ScrollAPI</h3><h4 id="from-size" tabindex="-1"><a class="header-anchor" href="#from-size" aria-hidden="true">#</a> from + size</h4><p>当一个查询：from = 990, size = 10，会在每个分片上先获取 1000 个文档。然后，通过协调节点聚合所有结果。最后，再通过排序选取前 1000 个文档。</p><p>页数越深，占用内存越多。为了避免深分页问题，ES 默认限定到 10000 个文档。</p><h4 id="search-after" tabindex="-1"><a class="header-anchor" href="#search-after" aria-hidden="true">#</a> search after</h4><p>实时获取下一页文档信息，不支持指定页数，只能向下翻页。</p><p>需要指定 sort，并保证值是唯一的</p><p>然后，可以反复使用上次结果中最后一个文档的 sort 值进行查询</p><h4 id="scroll" tabindex="-1"><a class="header-anchor" href="#scroll" aria-hidden="true">#</a> scroll</h4><p>创建一个快照，有新的数据写入以后，无法被查到。</p><p>每次持续后，输入上一次的 scroll id</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST tmdb/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10000</span>,
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#Scroll API</span>
DELETE <span class="token function">users</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user1&quot;</span>,<span class="token string">&quot;age&quot;</span>:10<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user2&quot;</span>,<span class="token string">&quot;age&quot;</span>:11<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user2&quot;</span>,<span class="token string">&quot;age&quot;</span>:12<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user2&quot;</span>,<span class="token string">&quot;age&quot;</span>:13<span class="token punctuation">}</span>

POST users/_count

POST users/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span> ,
        <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;asc&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

POST users/_search
<span class="token punctuation">{</span>
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;search_after&quot;</span><span class="token builtin class-name">:</span>
        <span class="token punctuation">[</span>
          <span class="token number">10</span>,
          <span class="token string">&quot;ZQ0vYGsBrR8X3IP75QqX&quot;</span><span class="token punctuation">]</span>,
    <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span> ,
        <span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;asc&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#Scroll API</span>
DELETE <span class="token function">users</span>
POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user1&quot;</span>,<span class="token string">&quot;age&quot;</span>:10<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user2&quot;</span>,<span class="token string">&quot;age&quot;</span>:20<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user3&quot;</span>,<span class="token string">&quot;age&quot;</span>:30<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user4&quot;</span>,<span class="token string">&quot;age&quot;</span>:40<span class="token punctuation">}</span>

POST /users/_search?scroll<span class="token operator">=</span>5m
<span class="token punctuation">{</span>
    <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match_all&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST users/_doc
<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;user5&quot;</span>,<span class="token string">&quot;age&quot;</span>:50<span class="token punctuation">}</span>
POST /_search/scroll
<span class="token punctuation">{</span>
    <span class="token string">&quot;scroll&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;1m&quot;</span>,
    <span class="token string">&quot;scroll_id&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAWAWbWdoQXR2d3ZUd2kzSThwVTh4bVE0QQ==&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="处理并发读写" tabindex="-1"><a class="header-anchor" href="#处理并发读写" aria-hidden="true">#</a> 处理并发读写</h3><p>采用乐观锁机制</p><p>内部版本控制：<code>_seq_no</code> + <code>primary_term</code></p><p>外部版本控制：<code>version</code> + <code>version_type=external</code></p><h2 id="第六章-深入聚合分析" tabindex="-1"><a class="header-anchor" href="#第六章-深入聚合分析" aria-hidden="true">#</a> 第六章：深入聚合分析</h2><h3 id="bucket-metric聚合分析及嵌套聚合" tabindex="-1"><a class="header-anchor" href="#bucket-metric聚合分析及嵌套聚合" aria-hidden="true">#</a> Bucket&amp;Metric聚合分析及嵌套聚合</h3><p>Metric（统计） - 统计计算</p><p>Bucket（分组） - 按一定规则，将文档分配到不同的桶中。</p><p>Metric 聚合</p><ul><li><strong>单值聚合</strong> - 只输出一个分析结果 <ul><li>min、max、avg、sum、cardinality</li></ul></li><li><strong>多值聚合</strong> - 输出多个分析结果 <ul><li>stats、extended_stats、percentile、percentile_rank、top_hits</li></ul></li></ul><h3 id="pipeline聚合分析" tabindex="-1"><a class="header-anchor" href="#pipeline聚合分析" aria-hidden="true">#</a> Pipeline聚合分析</h3><p>Pipeline聚合支持对聚合分析的结果，进行再次聚合分析。</p><p>Pipeline 聚合的分析结果会输出到原结果中，根据位置的不同，分为两类：</p>`,181),v=s("strong",null,"sibling",-1),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-max-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-min-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-sum-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-extended-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},y=s("strong",null,"parent",-1),x={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html",target:"_blank",rel:"noopener noreferrer"},S=e('<h3 id="聚合的作用范围及排序" tabindex="-1"><a class="header-anchor" href="#聚合的作用范围及排序" aria-hidden="true">#</a> 聚合的作用范围及排序</h3><p>ES 聚合分析的默认作用范围是 query 的查询结果集。</p><p>同时 ES 还支持以下方式改变聚合的作用范围：</p><ul><li>filter</li><li>post_filter</li><li>global</li></ul><p>指定 order，按照 <code>_count</code> 和 <code>_key</code> 进行排序。</p><h3 id="聚合分析的原理及精准度问题" tabindex="-1"><a class="header-anchor" href="#聚合分析的原理及精准度问题" aria-hidden="true">#</a> 聚合分析的原理及精准度问题</h3><p>ES 在进行聚合分析时，协调节点会在每个分片的主分片、副分片中选一个，然后在不同分片上分别进行聚合计算，然后将每个分片的聚合结果进行汇总，返回最终结果。</p><p>由于，并非基于全量数据进行计算，所以聚合结果并非完全准确。</p><p>要解决聚合准确性问题，有两个解决方案：</p>',9),O=s("li",null,"解决方案 1：当数据量不大时，设置 Primary Shard 为 1，这意味着在数据全集上进行聚合。",-1),E={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#search-aggregations-bucket-terms-aggregation-shard-size",target:"_blank",rel:"noopener noreferrer"},w=s("code",null,"shard_size",-1),D=s("strong",null,"整体性能变低，精准度变高",-1),I=s("code",null,"size * 1.5 + 10",-1),A=e('<h2 id="第七章-数据建模-略" tabindex="-1"><a class="header-anchor" href="#第七章-数据建模-略" aria-hidden="true">#</a> 第七章：数据建模（略）</h2><h2 id="第八章-保护你的数据-略" tabindex="-1"><a class="header-anchor" href="#第八章-保护你的数据-略" aria-hidden="true">#</a> 第八章：保护你的数据（略）</h2><h2 id="第九章-水平扩展-elasticsearch-集群" tabindex="-1"><a class="header-anchor" href="#第九章-水平扩展-elasticsearch-集群" aria-hidden="true">#</a> 第九章：水平扩展 Elasticsearch 集群</h2><h2 id="第十章-生产环境中的集群运维-略" tabindex="-1"><a class="header-anchor" href="#第十章-生产环境中的集群运维-略" aria-hidden="true">#</a> 第十章：生产环境中的集群运维（略）</h2><h2 id="第十一章-索引生命周期管理-略" tabindex="-1"><a class="header-anchor" href="#第十一章-索引生命周期管理-略" aria-hidden="true">#</a> 第十一章：索引生命周期管理（略）</h2><h2 id="第十二章-用logstash和beats构建数据管道-略" tabindex="-1"><a class="header-anchor" href="#第十二章-用logstash和beats构建数据管道-略" aria-hidden="true">#</a> 第十二章：用Logstash和Beats构建数据管道（略）</h2><h2 id="第十三章-用kibana进行数据可视化分析-略" tabindex="-1"><a class="header-anchor" href="#第十三章-用kibana进行数据可视化分析-略" aria-hidden="true">#</a> 第十三章：用Kibana进行数据可视化分析（略）</h2><h2 id="第十四章-探索x-pack套件-略" tabindex="-1"><a class="header-anchor" href="#第十四章-探索x-pack套件-略" aria-hidden="true">#</a> 第十四章：探索X-Pack套件（略）</h2><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',9),L={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"};function Q(z,X){const a=l("ExternalLinkIcon");return p(),u("div",null,[r,s("p",null,[s("a",d,[n("极客时间教程 - Elasticsearch 核心技术与实战"),t(a)]),n(" 学习笔记")]),c(" more "),k,s("ul",null,[s("li",null,[v,n(" - 结果和现有分析结果同级。例如："),s("a",m,[n("max_bucket"),t(a)]),n("、"),s("a",b,[n("min_bucket"),t(a)]),n("、"),s("a",q,[n("avg_bucket"),t(a)]),n("、"),s("a",g,[n("sum_bucket"),t(a)]),n("、"),s("a",h,[n("stats_bucket"),t(a)]),n("、"),s("a",_,[n("extended_stats_bucket"),t(a)]),n("、"),s("a",f,[n("percentiles_bucket"),t(a)]),n("。")]),s("li",null,[y,n(" - 结果内嵌到现有的聚合分析结果中。例如："),s("a",x,[n("derivative"),t(a)]),n("、"),s("a",T,[n("cumulative_sum"),t(a)]),n("、"),s("a",P,[n("moving_function"),t(a)]),n("。")])]),S,s("ul",null,[O,s("li",null,[n("解决方案 2：设置 "),s("a",E,[w,t(a)]),n(" 参数，将计算数据范围变大，进而使得 ES 的"),D,n("。shard_size 值的默认值是 "),I,n("。")])]),A,s("ul",null,[s("li",null,[s("a",L,[n("极客时间教程 - Elasticsearch 核心技术与实战"),t(a)])])])])}const B=i(o,[["render",Q],["__file","index.html.vue"]]);export{B as default};
