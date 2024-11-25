import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as u,c as o,a as n,b as s,d as a,e as t}from"./app-468d4d79.js";const c={},r=n("h1",{id:"elasticsearch-dsl",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch-dsl","aria-hidden":"true"},"#"),s(" Elasticsearch DSL")],-1),d=n("p",null,"Elasticsearch 提供了基于 JSON 的 DSL（Domain Specific Language）来定义查询。",-1),p=n("p",null,"可以将 DSL 视为查询的 AST（抽象语法树），由两种类型的子句组成：",-1),v={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"match",-1),q={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"term",-1),h={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},k=n("code",null,"range",-1),g={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"bool",-1),y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"dis_max",-1),x={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html",target:"_blank",rel:"noopener noreferrer"},w=n("code",null,"constant_score",-1),T=t("<p>查询子句的行为会有所不同，具体取决于它们是在 query content 还是 filter context 中使用。</p><ul><li><code>query</code> context - <strong>有相关性计算</strong>，采用相关性算法，计算文档与查询关键词之间的相关度，并根据评分（<code>_score</code>）大小排序。</li><li><code>filter</code> context - <strong>无相关性计算</strong>，可以利用缓存，性能更好。</li></ul><p>从用法角度，Elasticsearch 查询分类大致分为：</p>",3),E={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/joining-queries.html",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/specialized-queries.html",target:"_blank",rel:"noopener noreferrer"},D={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html",target:"_blank",rel:"noopener noreferrer"},L={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/span-queries.html",target:"_blank",rel:"noopener noreferrer"},O={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/vector-queries.html",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/shape-queries.html",target:"_blank",rel:"noopener noreferrer"},U=n("h2",{id:"全文查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#全文查询","aria-hidden":"true"},"#"),s(" 全文查询")],-1),N=n("p",null,"ES 全文查询主要用于在全文字段上，主要考虑查询词与文档的相关性（Relevance）。",-1),H=n("p",null,"ES 查询支持以下类型：",-1),I={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},j={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-bool-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},F={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},J={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html",target:"_blank",rel:"noopener noreferrer"},K={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-combined-fields-query.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html",target:"_blank",rel:"noopener noreferrer"},W={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Q=n("h3",{id:"intervals-query",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#intervals-query","aria-hidden":"true"},"#"),s(" intervals query")],-1),V={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html",target:"_blank",rel:"noopener noreferrer"},X=n("strong",null,[n("code",null,"intervals query")],-1),M=t(`<p>intervals query 使用<strong>匹配规则</strong>，这些规则应用于指定字段中的 term。</p><p>示例：下面示例搜索 <code>query</code> 字段，搜索值是 <code>my favorite food</code>，没有任何间隙；然后是 <code>my_text</code> 字段搜索匹配 <code>hot water</code>、<code>cold porridge</code> 的 term。</p><p>当 my_text 中的值为 <code>my favorite food is cold porridge</code> 时，会匹配成功，但是 <code>when it&#39;s cold my favorite food is porridge</code> 则匹配失败</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST _search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;my_text&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;all_of&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;ordered&quot;</span> <span class="token builtin class-name">:</span> true,
          <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;my favorite food&quot;</span>,
                <span class="token string">&quot;max_gaps&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">0</span>,
                <span class="token string">&quot;ordered&quot;</span> <span class="token builtin class-name">:</span> <span class="token boolean">true</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
              <span class="token string">&quot;any_of&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;intervals&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;hot water&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
                  <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;query&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;cold porridge&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="match-query" tabindex="-1"><a class="header-anchor" href="#match-query" aria-hidden="true">#</a> match query</h3>`,5),$={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},Y=n("strong",null,[n("code",null,"match query")],-1),Z=n("strong",null,"用于搜索单个字段",-1),nn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},sn=n("strong",null,[n("code",null,"match query")],-1),en=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;George Hubbard&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等同于 <code>or</code> 匹配操作，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;George Hubbard&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;or&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="match-query-简写" tabindex="-1"><a class="header-anchor" href="#match-query-简写" aria-hidden="true">#</a> match query 简写</h4><p>可以通过组合 <code>&lt;field&gt;</code> 和 <code>query</code> 参数来简化匹配查询语法。</p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;this is a test&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="match-query-如何工作" tabindex="-1"><a class="header-anchor" href="#match-query-如何工作" aria-hidden="true">#</a> match query 如何工作</h4>`,8),an=n("code",null,"operator",-1),tn=n("code",null,"or",-1),ln=n("code",null,"and",-1),un=n("code",null,"or",-1),on={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html",target:"_blank",rel:"noopener noreferrer"},cn=n("code",null,"minimum_should_match",-1),rn=n("code",null,"should",-1),dn=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;George Hubbard&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以设置 <code>analyzer</code> 来控制哪个分析器将对文本执行分析过程。它默认为字段显式映射定义或默认搜索分析器。</p><p><code>lenient</code> 参数可以设置为 <code>true</code> 以忽略由数据类型不匹配导致的异常，例如尝试使用文本查询字符串查询数字字段。默认为 <code>false</code>。</p><h4 id="match-query-的模糊查询" tabindex="-1"><a class="header-anchor" href="#match-query-的模糊查询" aria-hidden="true">#</a> match query 的模糊查询</h4>`,4),pn=n("code",null,"fuzziness",-1),vn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness",target:"_blank",rel:"noopener noreferrer"},mn=t(`<p>在这种情况下可以设置 <code>prefix_length</code> 和 <code>max_expansions</code> 来控制模糊匹配。如果设置了模糊选项，查询将使用 <code>top_terms_blended_freqs_\${max_expansions}</code> 作为其重写方法，<code>fuzzy_rewrite</code> 参数允许控制查询将如何被重写。</p><p>默认情况下允许模糊倒转 (<code>ab</code> → <code>ba</code>)，但可以通过将 <code>fuzzy_transpositions</code> 设置为 <code>false</code> 来禁用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;this is a testt&quot;</span>,
        <span class="token string">&quot;fuzziness&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AUTO&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="zero-terms-查询" tabindex="-1"><a class="header-anchor" href="#zero-terms-查询" aria-hidden="true">#</a> zero terms 查询</h4><p>如果使用的分析器像 stop 过滤器一样删除查询中的所有标记，则默认行为是不匹配任何文档。可以使用 <code>zero_terms_query</code> 选项来改变默认行为，它接受 <code>none</code>（默认）和 <code>all</code> （相当于 <code>match_all</code> 查询）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;to be or not to be&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>,
        <span class="token string">&quot;zero_terms_query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;all&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="match-bool-prefix-query" tabindex="-1"><a class="header-anchor" href="#match-bool-prefix-query" aria-hidden="true">#</a> match_bool_prefix query</h3>`,7),qn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-bool-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},bn=n("strong",null,[n("code",null,"match_bool_prefix query")],-1),hn=n("code",null,"prefix query",-1),kn=t(`<p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_bool_prefix&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;message&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;quick brown f&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等价于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;quick&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;brown&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>,
        <span class="token punctuation">{</span> <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>match_bool_prefix query</code> 和 <code>match_phrase_prefix query</code> 之间的一个重要区别是：<code>match_phrase_prefix query</code> 将其 term 匹配为短语，但 <code>match_bool_prefix query</code> 可以在任何位置匹配其 term。</p><p>上面的示例 <code>match_bool_prefix query</code> 查询可以匹配包含 <code>quick brown fox</code> 的字段，但它也可以快速匹配 <code>brown fox</code>。它还可以匹配包含 <code>quick</code>、<code>brown</code> 和以 <code>f</code> 开头的字段，出现在任何位置。</p><h3 id="match-phrase-query" tabindex="-1"><a class="header-anchor" href="#match-phrase-query" aria-hidden="true">#</a> match_phrase query</h3>`,7),gn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},_n=n("strong",null,[n("code",null,"match_phrase query")],-1),yn=t(`<ol><li><strong>分词后所有词项都要出现在该字段中（相当于 and 操作）</strong>。</li><li><strong>字段中的词项顺序要一致</strong>。</li></ol><p>例如，有以下 3 个文档，使用 <strong><code>match_phrase</code></strong> 查询 &quot;How are you&quot;，只有前两个文档会被匹配：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT demo/_create/1
<span class="token punctuation">{</span> <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;How are you&quot;</span> <span class="token punctuation">}</span>

PUT demo/_create/2
<span class="token punctuation">{</span> <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;How are you, Jack?&quot;</span><span class="token punctuation">}</span>

PUT demo/_create/3
<span class="token punctuation">{</span> <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;are you&quot;</span><span class="token punctuation">}</span>

GET demo/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;How are you&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>说明：</p><p>一个被认定为和短语 How are you 匹配的文档，必须满足以下这些要求：</p><ul><li>How、 are 和 you 需要全部出现在域中。</li><li>are 的位置应该比 How 的位置大 1 。</li><li>you 的位置应该比 How 的位置大 2 。</li></ul></blockquote><h3 id="match-phrase-prefix-query" tabindex="-1"><a class="header-anchor" href="#match-phrase-prefix-query" aria-hidden="true">#</a> match_phrase_prefix query</h3>`,5),fn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html",target:"_blank",rel:"noopener noreferrer"},xn=n("strong",null,[n("code",null,"match_phrase_prefix query")],-1),wn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},Tn=n("strong",null,[n("code",null,"match_phrase query")],-1),En={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html",target:"_blank",rel:"noopener noreferrer"},Gn=n("strong",null,[n("code",null,"match_phrase_prefix query")],-1),zn=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET demo/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase_prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;desc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;are yo&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="multi-match-query" tabindex="-1"><a class="header-anchor" href="#multi-match-query" aria-hidden="true">#</a> multi_match query</h3>`,2),Sn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html",target:"_blank",rel:"noopener noreferrer"},Pn=n("strong",null,[n("code",null,"multi_match query")],-1),Dn=n("strong",null,[n("code",null,"match query")],-1),Ln=n("strong",null,"用于搜索多个字段",-1),On=t(`<p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token number">34.98</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;taxful_total_price&quot;</span>,
        <span class="token string">&quot;taxless_total_price&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>multi_match query</code></strong> 的搜索字段可以使用通配符指定，示例如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token number">34.98</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;taxful_*&quot;</span>,
        <span class="token string">&quot;taxless_total_price&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，也可以用<strong>指数符指定搜索字段的权重</strong>。</p><p>示例：指定 taxful_total_price 字段的权重是 taxless_total_price 字段的 3 倍，命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token number">34.98</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;taxful_total_price^3&quot;</span>,
        <span class="token string">&quot;taxless_total_price&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="combined-fields-query" tabindex="-1"><a class="header-anchor" href="#combined-fields-query" aria-hidden="true">#</a> combined_fields query</h3>`,8),An={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-combined-fields-query.html",target:"_blank",rel:"noopener noreferrer"},Un=n("strong",null,[n("code",null,"combined_fields query")],-1),Nn=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;combined_fields&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span>      <span class="token string">&quot;database systems&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span>     <span class="token punctuation">[</span> <span class="token string">&quot;title&quot;</span>, <span class="token string">&quot;abstract&quot;</span>, <span class="token string">&quot;body&quot;</span><span class="token punctuation">]</span>,
      <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span>   <span class="token string">&quot;and&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="字段前缀权重" tabindex="-1"><a class="header-anchor" href="#字段前缀权重" aria-hidden="true">#</a> 字段前缀权重</h4><p>字段前缀权重根据组合字段模型进行计算。例如，如果 title 字段的权重为 2，则匹配度打分时会将 title 中的每个 term 形成的组合字段，按出现两次进行打分。</p><h3 id="common-terms-query" tabindex="-1"><a class="header-anchor" href="#common-terms-query" aria-hidden="true">#</a> common_terms query</h3><blockquote><p>7.3.0 废弃</p></blockquote>`,5),Hn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html",target:"_blank",rel:"noopener noreferrer"},In=n("strong",null,[n("code",null,"common_terms query")],-1),Bn=t(`<p>查询中的每个词项都有一定的代价，以搜索“The brown fox”为例，query 会被解析成三个词项“the”“brown”和“fox”，每个词项都会到索引中执行一次查询。很显然包含“the”的文档非常多，相比其他词项，“the”的重要性会低很多。传统的解决方案是把“the”当作停用词处理，去除停用词之后可以减少索引大小，同时在搜索时减少对停用词的收缩。</p><p>虽然停用词对文档评分影响不大，但是当停用词仍然有重要意义的时候，去除停用词就不是完美的解决方案了。如果去除停用词，就无法区分“happy”和“not happy”, “The”“To be or not to be”就不会在索引中存在，搜索的准确率和召回率就会降低。</p><p>common_terms query 提供了一种解决方案，它把 query 分词后的词项分成重要词项（低频词项）和不重要的词项（高频词，也就是之前的停用词）。在搜索的时候，首先搜索和重要词项匹配的文档，这些文档是词项出现较少并且词项对其评分影响较大的文档。然后执行第二次查询，搜索对评分影响较小的高频词项，但是不计算所有文档的评分，而是只计算第一次查询已经匹配的文档得分。如果一个查询中只包含高频词，那么会通过 and 连接符执行一个单独的查询，换言之，会搜索所有的词项。</p><p>词项是高频词还是低频词是通过 cutoff frequency 来设置阀值的，取值可以是绝对频率（频率大于 1）或者相对频率（0 ～ 1）。common_terms query 最有趣之处在于它能自适应特定领域的停用词，例如，在视频托管网站上，诸如“clip”或“video”之类的高频词项将自动表现为停用词，无须保留手动列表。</p><p>例如，文档频率高于 0.1% 的词项将会被当作高频词项，词频之间可以用 low_freq_operator、high_freq_operator 参数连接。设置低频词操作符为“and”使所有的低频词都是必须搜索的，示例代码如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET books/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;common&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
				<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;nelly the elephant as a cartoon&quot;</span>,
				<span class="token string">&quot;cutoff_frequency&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.001</span>,
				<span class="token string">&quot;low_freq_operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述操作等价于：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET books/_search
<span class="token punctuation">{</span>
	<span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
			<span class="token string">&quot;must&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;nelly&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;elephant&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;cartoon&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
			<span class="token punctuation">]</span>,
			<span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;the&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;as&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
			  <span class="token punctuation">{</span> <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;body&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;a&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
			<span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="query-string-query" tabindex="-1"><a class="header-anchor" href="#query-string-query" aria-hidden="true">#</a> query_string query</h3>`,9),jn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Fn=n("strong",null,[n("code",null,"query_string query")],-1),Jn=t(`<p>用户可以使用 query_string query 来创建包含通配符、跨多个字段的搜索等复杂搜索。虽然通用，但查询是严格的，如果查询字符串包含任何无效语法，则会返回错误。</p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;query_string&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;(new york city) OR (big apple)&quot;</span>,
      <span class="token string">&quot;default_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;content&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="simple-query-string-query" tabindex="-1"><a class="header-anchor" href="#simple-query-string-query" aria-hidden="true">#</a> simple_query_string query</h3>`,4),Kn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Rn=n("strong",null,[n("code",null,"simple_query_string query")],-1),Wn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Cn=n("strong",null,[n("code",null,"query_string query")],-1),Qn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Vn=n("strong",null,[n("code",null,"simple_query_string query")],-1),Xn=t(`<p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;simple_query_string&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>fried eggs<span class="token entity" title="\\&quot;">\\&quot;</span> +(eggplant | potato) -frittata&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;title^5&quot;</span>, <span class="token string">&quot;body&quot;</span><span class="token punctuation">]</span>,
        <span class="token string">&quot;default_operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="simple-query-string-语义" tabindex="-1"><a class="header-anchor" href="#simple-query-string-语义" aria-hidden="true">#</a> simple_query_string 语义</h4><ul><li><code>+</code>：等价于 AND 操作</li><li><code>|</code>：等价于 OR 操作</li><li><code>-</code>：相当于 NOT 操作</li><li><code>&quot;</code>：包装一些标记以表示用于搜索的短语</li><li><code>*</code>：词尾表示前缀查询</li><li><code>(</code> and <code>)</code>：表示优先级</li><li><code>~N</code>：词尾表示表示编辑距离（模糊性）</li><li><code>~N</code>：在一个短语之后表示溢出量</li></ul><p>注意：要使用上面的字符，请使用反斜杠 <code>/</code> 对其进行转义。</p><h3 id="全文查询完整示例" tabindex="-1"><a class="header-anchor" href="#全文查询完整示例" aria-hidden="true">#</a> 全文查询完整示例</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#设置 position_increment_gap</span>
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

DELETE <span class="token function">groups</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="词项查询" tabindex="-1"><a class="header-anchor" href="#词项查询" aria-hidden="true">#</a> 词项查询</h2><p><strong><code>Term</code>（词项）是表达语意的最小单位</strong>。搜索和利用统计语言模型进行自然语言处理都需要处理 Term。</p><p>全文查询在执行查询之前会分析查询字符串。</p><p>与全文查询不同，词项查询不会分词，而是将输入作为一个整体，在倒排索引中查找准确的词项。并且使用相关度计算公式为每个包含该词项的文档进行相关度计算。一言以概之：<strong>词项查询是对词项进行精确匹配</strong>。词项查询通常用于结构化数据，如数字、日期和枚举类型。</p><p>词项查询有以下类型：</p>`,12),Mn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html",target:"_blank",rel:"noopener noreferrer"},$n={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html",target:"_blank",rel:"noopener noreferrer"},Yn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html",target:"_blank",rel:"noopener noreferrer"},Zn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},ns={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},ss={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},es={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},as={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html",target:"_blank",rel:"noopener noreferrer"},ts={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html",target:"_blank",rel:"noopener noreferrer"},is={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},ls=n("h3",{id:"exists-query",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#exists-query","aria-hidden":"true"},"#"),s(" exists query")],-1),us={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html",target:"_blank",rel:"noopener noreferrer"},os=n("strong",null,[n("code",null,"exists query")],-1),cs=t(`<p>由于多种原因，文档字段可能不存在索引值：</p><ul><li>JSON 中的字段为 <code>null</code> 或 <code>[]</code></li><li>该字段在 mapping 中配置了 <code>&quot;index&quot; : false</code></li><li>字段值的长度超过了 mapping 中的 <code>ignore_above</code> 设置</li><li>字段值格式错误，并且在 mapping 中定义了 <code>ignore_malformed</code></li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;exists&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;email&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下文档会匹配上面的查询：</p><ul><li><code>{ &quot;user&quot; : &quot;jane&quot; }</code> 有 user 字段，且不为空。</li><li><code>{ &quot;user&quot; : &quot;&quot; }</code> 有 user 字段，值为空字符串。</li><li><code>{ &quot;user&quot; : &quot;-&quot; }</code> 有 user 字段，值不为空。</li><li><code>{ &quot;user&quot; : [ &quot;jane&quot; ] }</code> 有 user 字段，值不为空。</li><li><code>{ &quot;user&quot; : [ &quot;jane&quot;, null ] }</code> 有 user 字段，至少一个值不为空即可。</li></ul><p>下面的文档都不会被匹配：</p><ul><li><code>{ &quot;user&quot; : null }</code> 虽然有 user 字段，但是值为空。</li><li><code>{ &quot;user&quot; : [] }</code> 虽然有 user 字段，但是值为空。</li><li><code>{ &quot;user&quot; : [null] }</code> 虽然有 user 字段，但是值为空。</li><li><code>{ &quot;foo&quot; : &quot;bar&quot; }</code> 没有 user 字段。</li></ul><h3 id="fuzzy-query" tabindex="-1"><a class="header-anchor" href="#fuzzy-query" aria-hidden="true">#</a> fuzzy query</h3>`,9),rs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html",target:"_blank",rel:"noopener noreferrer"},ds=n("strong",null,[n("code",null,"fuzzy query")],-1),ps={href:"https://en.wikipedia.org/wiki/Levenshtein_distance",target:"_blank",rel:"noopener noreferrer"},vs=t(`<p>编辑距离是将一个术语转换为另一个术语所需的单个字符更改的数量。这些变化可能包括：</p><ul><li>改变一个字符：（<strong>b</strong>ox -&gt; <strong>f</strong>ox）</li><li>删除一个字符：（<strong>b</strong>lack -&gt; lack）</li><li>插入一个字符：（sic -&gt; sic<strong>k</strong>）</li><li>反转两个相邻字符：（<strong>ac</strong>t → <strong>ca</strong>t）</li></ul><p>为了找到相似的词条，fuzzy query 会在指定的编辑距离内创建搜索词条的所有可能变体或扩展集。然后返回完全匹配任意扩展的文档。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET books/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;fuzzy&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;user.id&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ki&quot;</span>,
        <span class="token string">&quot;fuzziness&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AUTO&quot;</span>,
        <span class="token string">&quot;max_expansions&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
        <span class="token string">&quot;prefix_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;transpositions&quot;</span><span class="token builtin class-name">:</span> true,
        <span class="token string">&quot;rewrite&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;constant_score&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),ms={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},qs=n("code",null,"search.allow_expensive_queries",-1),bs=n("h3",{id:"ids-query",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ids-query","aria-hidden":"true"},"#"),s(" ids query")],-1),hs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html",target:"_blank",rel:"noopener noreferrer"},ks=n("strong",null,[n("code",null,"ids query")],-1),gs=n("code",null,"_id",-1),_s=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ids&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;values&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span>, <span class="token string">&quot;4&quot;</span>, <span class="token string">&quot;100&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prefix-query" tabindex="-1"><a class="header-anchor" href="#prefix-query" aria-hidden="true">#</a> prefix query</h3>`,2),ys={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html#prefix-query-ex-request",target:"_blank",rel:"noopener noreferrer"},fs=n("strong",null,[n("code",null,"prefix query")],-1),xs=t(`<p>比如查询 <code>user.id</code> 中含有以 <code>ki</code> 为前缀的关键词的文档，那么含有 <code>kind</code>、<code>kid</code> 等所有以 <code>ki</code> 开头关键词的文档都会被匹配。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;user.id&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ki&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="range-query" tabindex="-1"><a class="header-anchor" href="#range-query" aria-hidden="true">#</a> range query</h3>`,3),ws={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},Ts=n("strong",null,[n("code",null,"range query")],-1),Es=n("strong",null,"使用 range 查询只能查询一个字段，不能作用在多个字段上",-1),Gs=t(`<p>range 查询支持的参数有以下几种：</p><ul><li><p><strong><code>gt</code></strong>：大于</p></li><li><p><strong><code>gte</code></strong>：大于等于</p></li><li><p><strong><code>lt</code></strong>：小于</p></li><li><p><strong><code>lte</code></strong>：小于等于</p></li><li><p><strong><code>format</code></strong>：如果字段是 Date 类型，可以设置日期格式化</p></li><li><p><strong><code>time_zone</code></strong>：时区</p></li><li><p><strong><code>relation</code></strong>：指示范围查询如何匹配范围字段的值。</p><ul><li><strong><code>INTERSECTS</code> (Default)</strong>：匹配与查询字段值范围相交的文档。</li><li><strong><code>CONTAINS</code></strong>：匹配完全包含查询字段值的文档。</li><li><strong><code>WITHIN</code></strong>：匹配具有完全在查询范围内的范围字段值的文档。</li></ul></li></ul><p>示例：数值范围查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;range&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;taxful_total_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;gt&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>,
        <span class="token string">&quot;lte&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：日期范围查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;range&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;order_date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;time_zone&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;+00:00&quot;</span>,
        <span class="token string">&quot;gte&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2018-01-01T00:00:00&quot;</span>,
        <span class="token string">&quot;lte&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;now&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="regexp-query" tabindex="-1"><a class="header-anchor" href="#regexp-query" aria-hidden="true">#</a> regexp query</h3>`,7),zs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},Ss=n("strong",null,[n("code",null,"regexp query")],-1),Ps={href:"https://zh.wikipedia.org/zh-hans/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},Ds=t(`<p>示例：以下搜索返回 <code>user.id</code> 字段包含任何以 <code>k</code> 开头并以 <code>y</code> 结尾的文档。 <code>.*</code> 运算符匹配任何长度的任何字符，包括无字符。匹配项可以包括 <code>ky</code>、<code>kay</code> 和 <code>kimchy</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;regexp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;user.id&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;k.*y&quot;</span>,
        <span class="token string">&quot;flags&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ALL&quot;</span>,
        <span class="token string">&quot;case_insensitive&quot;</span><span class="token builtin class-name">:</span> true,
        <span class="token string">&quot;max_determinized_states&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10000</span>,
        <span class="token string">&quot;rewrite&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;constant_score&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ls={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},Os=n("code",null,"search.allow_expensive_queries",-1),As={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},Us=n("strong",null,[n("code",null,"regexp query")],-1),Ns=n("h3",{id:"term-query",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#term-query","aria-hidden":"true"},"#"),s(" term query")],-1),Hs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Is=n("strong",null,[n("code",null,"term query")],-1),Bs=t(`<p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建一个索引</span>
DELETE my-index-000001
PUT my-index-000001
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;full_text&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 2. 使用 &quot;Quick Brown Foxes!&quot; 关键字查 &quot;full_text&quot; 字段</span>
PUT my-index-000001/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;full_text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick Brown Foxes!&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 3. 使用 term 查询</span>
GET my-index-000001/_search?pretty
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;full_text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick Brown Foxes!&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 因为 full_text 字段不再包含确切的 Term —— &quot;Quick Brown Foxes!&quot;，所以 term query 搜索不到任何结果</span>

<span class="token comment"># 4. 使用 match 查询</span>
GET my-index-000001/_search?pretty
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;full_text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Quick Brown Foxes!&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE my-index-000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️ 注意：应避免 term 查询对 text 字段使用查询。</p><p>默认情况下，Elasticsearch 针对 text 字段的值进行解析分词，这会使查找 text 字段值的精确匹配变得困难。</p><p>要搜索 text 字段值，需改用 match 查询。</p></blockquote><h3 id="terms-query" tabindex="-1"><a class="header-anchor" href="#terms-query" aria-hidden="true">#</a> terms query</h3>`,4),js={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html",target:"_blank",rel:"noopener noreferrer"},Fs=n("strong",null,[n("code",null,"terms query")],-1),Js={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Ks=n("strong",null,[n("code",null,"term query")],-1),Rs=t(`<p>terms query 查询参数：</p><ul><li><strong><code>index</code></strong>：索引名</li><li><strong><code>id</code></strong>：文档 ID</li><li><strong><code>path</code></strong>：要从中获取字段值的字段的名称，即搜索关键字</li><li><strong><code>routing</code></strong>（选填）：要从中获取 term 值的文档的自定义路由值。如果在索引文档时提供了自定义路由值，则此参数是必需的。</li></ul><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建一个索引</span>
DELETE my-index-000001
PUT my-index-000001
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;color&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 2. 写入一个文档</span>
PUT my-index-000001/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;color&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;blue&quot;</span>,
    <span class="token string">&quot;green&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 3. 写入另一个文档</span>
PUT my-index-000001/_doc/2
<span class="token punctuation">{</span>
  <span class="token string">&quot;color&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;blue&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 3. 使用 terms query</span>
GET my-index-000001/_search?pretty
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;color&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my-index-000001&quot;</span>,
        <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2&quot;</span>,
        <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;color&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

DELETE my-index-000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="type-query" tabindex="-1"><a class="header-anchor" href="#type-query" aria-hidden="true">#</a> type query</h3><blockquote><p>7.0.0 后废弃</p></blockquote>`,6),Ws={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html",target:"_blank",rel:"noopener noreferrer"},Cs=n("strong",null,[n("code",null,"type query")],-1),Qs=t(`<p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;_doc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wildcard-query" tabindex="-1"><a class="header-anchor" href="#wildcard-query" aria-hidden="true">#</a> wildcard query</h3>`,3),Vs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},Xs=n("strong",null,[n("code",null,"wildcard query")],-1),Ms=t(`<p><code>?</code> 用来匹配一个任意字符，<code>*</code> 用来匹配零个或者多个字符。</p><p>示例：以下搜索返回 <code>user.id</code> 字段包含以 <code>ki</code> 开头并以 <code>y</code> 结尾的术语的文档。这些匹配项可以包括 <code>kiy</code>、<code>kity</code> 或 <code>kimchy</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;wildcard&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;user.id&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ki*y&quot;</span>,
        <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
        <span class="token string">&quot;rewrite&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;constant_score&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),$s={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},Ys=n("code",null,"search.allow_expensive_queries",-1),Zs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},ne=n("strong",null,[n("code",null,"wildcard query")],-1),se=t(`<h3 id="词项查询完整示例" tabindex="-1"><a class="header-anchor" href="#词项查询完整示例" aria-hidden="true">#</a> 词项查询完整示例</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE products
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复合查询" tabindex="-1"><a class="header-anchor" href="#复合查询" aria-hidden="true">#</a> 复合查询</h2><p>复合查询就是把一些简单查询组合在一起实现更复杂的查询需求，除此之外，复合查询还可以控制另外一个查询的行为。</p><h3 id="bool-query" tabindex="-1"><a class="header-anchor" href="#bool-query" aria-hidden="true">#</a> bool query</h3><p>bool 查询可以把任意多个简单查询组合在一起，使用 must、should、must_not、filter 选项来表示简单查询之间的逻辑，每个选项都可以出现 0 次到多次，它们的含义如下：</p><ul><li>must 文档必须匹配 must 选项下的查询条件，相当于逻辑运算的 AND，且参与文档相关度的评分。</li><li>should 文档可以匹配 should 选项下的查询条件也可以不匹配，相当于逻辑运算的 OR，且参与文档相关度的评分。</li><li>must_not 与 must 相反，匹配该选项下的查询条件的文档不会被返回；需要注意的是，<strong>must_not 语句不会影响评分，它的作用只是将不相关的文档排除</strong>。</li><li>filter 和 must 一样，匹配 filter 选项下的查询条件的文档才会被返回，<strong>但是 filter 不评分，只起到过滤功能，与 must_not 相反</strong>。</li></ul><p>假设要查询 title 中包含关键词 java，并且 price 不能高于 70，description 可以包含也可以不包含虚拟机的书籍，构造 bool 查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;filter&quot;: {
        &quot;term&quot;: {
          &quot;status&quot;: 1
        }
      },
      &quot;must_not&quot;: {
        &quot;range&quot;: {
          &quot;price&quot;: {
            &quot;gte&quot;: 70
          }
        }
      },
      &quot;must&quot;: {
        &quot;match&quot;: {
          &quot;title&quot;: &quot;java&quot;
        }
      },
      &quot;should&quot;: [
        {
          &quot;match&quot;: {
            &quot;description&quot;: &quot;虚拟机&quot;
          }
        }
      ],
      &quot;minimum_should_match&quot;: 1
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),ee={href:"https://www.knowledgedict.com/tutorial/elasticsearch-query-bool.html",target:"_blank",rel:"noopener noreferrer"},ae=t(`<h3 id="boosting-query" tabindex="-1"><a class="header-anchor" href="#boosting-query" aria-hidden="true">#</a> boosting query</h3><p>boosting 查询用于需要对两个查询的评分进行调整的场景，boosting 查询会把两个查询封装在一起并降低其中一个查询的评分。</p><p>boosting 查询包括 positive、negative 和 negative_boost 三个部分，positive 中的查询评分保持不变，negative 中的查询会降低文档评分，negative_boost 指明 negative 中降低的权值。如果我们想对 2015 年之前出版的书降低评分，可以构造一个 boosting 查询，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
	&quot;query&quot;: {
		&quot;boosting&quot;: {
			&quot;positive&quot;: {
				&quot;match&quot;: {
					&quot;title&quot;: &quot;python&quot;
				}
			},
			&quot;negative&quot;: {
				&quot;range&quot;: {
					&quot;publish_time&quot;: {
						&quot;lte&quot;: &quot;2015-01-01&quot;
					}
				}
			},
			&quot;negative_boost&quot;: 0.2
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>boosting 查询中指定了抑制因子为 0.2，publish_time 的值在 2015-01-01 之后的文档得分不变，publish_time 的值在 2015-01-01 之前的文档得分为原得分的 0.2 倍。</p><h3 id="constant-score-query" tabindex="-1"><a class="header-anchor" href="#constant-score-query" aria-hidden="true">#</a> constant_score query</h3><p>constant<em>score query 包装一个 filter query，并返回匹配过滤器查询条件的文档，且它们的相关性评分都等于 _boost</em> 参数值（可以理解为原有的基于 tf-idf 或 bm25 的相关分固定为 1.0，所以最终评分为 <em>1.0 * boost</em>，即等于 <em>boost</em> 参数值）。下面的查询语句会返回 title 字段中含有关键词 <em>elasticsearch</em> 的文档，所有文档的评分都是 1.8：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
  &quot;query&quot;: {
    &quot;constant_score&quot;: {
      &quot;filter&quot;: {
        &quot;term&quot;: {
          &quot;title&quot;: &quot;elasticsearch&quot;
        }
      },
      &quot;boost&quot;: 1.8
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dis-max-query" tabindex="-1"><a class="header-anchor" href="#dis-max-query" aria-hidden="true">#</a> dis_max query</h3><p>dis_max query 与 bool query 有一定联系也有一定区别，dis_max query 支持多并发查询，可返回与任意查询条件子句匹配的任何文档类型。与 bool 查询可以将所有匹配查询的分数相结合使用的方式不同，dis_max 查询只使用最佳匹配查询条件的分数。请看下面的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
	&quot;query&quot;: {
		&quot;dis_max&quot;: {
			&quot;tie_breaker&quot;: 0.7,
			&quot;boost&quot;: 1.2,
			&quot;queries&quot;: [{
					&quot;term&quot;: {
						&quot;age&quot;: 34
					}
				},
				{
					&quot;term&quot;: {
						&quot;age&quot;: 35
					}
				}
			]
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function-score-query" tabindex="-1"><a class="header-anchor" href="#function-score-query" aria-hidden="true">#</a> function_score query</h3><p>function_score query 可以修改查询的文档得分，这个查询在有些情况下非常有用，比如通过评分函数计算文档得分代价较高，可以改用过滤器加自定义评分函数的方式来取代传统的评分方式。</p><p>使用 function_score query，用户需要定义一个查询和一至多个评分函数，评分函数会对查询到的每个文档分别计算得分。</p><p>下面这条查询语句会返回 books 索引中的所有文档，文档的最大得分为 5，每个文档的得分随机生成，权重的计算模式为相乘模式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
  &quot;query&quot;: {
    &quot;function_score&quot;: {
      &quot;query&quot;: {
        &quot;match all&quot;: {}
      },
      &quot;boost&quot;: &quot;5&quot;,
      &quot;random_score&quot;: {},
      &quot;boost_mode&quot;: &quot;multiply&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用脚本自定义评分公式，这里把 price 值的十分之一开方作为每个文档的得分，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
  &quot;query&quot;: {
    &quot;function_score&quot;: {
      &quot;query&quot;: {
        &quot;match&quot;: {
          &quot;title&quot;: &quot;java&quot;
        }
      },
      &quot;script_score&quot;: {
        &quot;inline&quot;: &quot;Math.sqrt(doc[&#39;price&#39;].value/10)&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),te={href:"https://www.knowledgedict.com/tutorial/elasticsearch-function_score.html",target:"_blank",rel:"noopener noreferrer"},ie=t(`<h3 id="indices-query" tabindex="-1"><a class="header-anchor" href="#indices-query" aria-hidden="true">#</a> indices query</h3><p>indices query 适用于需要在多个索引之间进行查询的场景，它允许指定一个索引名字列表和内部查询。indices query 中有 query 和 no_match_query 两部分，query 中用于搜索指定索引列表中的文档，no_match_query 中的查询条件用于搜索指定索引列表之外的文档。下面的查询语句实现了搜索索引 books、books2 中 title 字段包含关键字 javascript，其他索引中 title 字段包含 basketball 的文档，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
	&quot;query&quot;: {
		&quot;indices&quot;: {
			&quot;indices&quot;: [&quot;books&quot;, &quot;books2&quot;],
			&quot;query&quot;: {
				&quot;match&quot;: {
					&quot;title&quot;: &quot;javascript&quot;
				}
			},
			&quot;no_match_query&quot;: {
				&quot;term&quot;: {
					&quot;title&quot;: &quot;basketball&quot;
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套查询" tabindex="-1"><a class="header-anchor" href="#嵌套查询" aria-hidden="true">#</a> 嵌套查询</h2><p>在 Elasticsearch 这样的分布式系统中执行全 SQL 风格的连接查询代价昂贵，是不可行的。相应地，为了实现水平规模地扩展，Elasticsearch 提供了以下两种形式的 join：</p><ul><li><p>nested query（嵌套查询）</p><p>文档中可能包含嵌套类型的字段，这些字段用来索引一些数组对象，每个对象都可以作为一条独立的文档被查询出来。</p></li><li><p>has_child query（有子查询）和 has_parent query（有父查询）</p><p>父子关系可以存在单个的索引的两个类型的文档之间。has_child 查询将返回其子文档能满足特定查询的父文档，而 has_parent 则返回其父文档能满足特定查询的子文档。</p></li></ul><h3 id="nested-query" tabindex="-1"><a class="header-anchor" href="#nested-query" aria-hidden="true">#</a> nested query</h3><p>文档中可能包含嵌套类型的字段，这些字段用来索引一些数组对象，每个对象都可以作为一条独立的文档被查询出来（用嵌套查询）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /my_index
{
	&quot;mappings&quot;: {
		&quot;type1&quot;: {
			&quot;properties&quot;: {
				&quot;obj1&quot;: {
					&quot;type&quot;: &quot;nested&quot;
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="has-child-query" tabindex="-1"><a class="header-anchor" href="#has-child-query" aria-hidden="true">#</a> has_child query</h3><p>文档的父子关系创建索引时在映射中声明，这里以员工（employee）和工作城市（branch）为例，它们属于不同的类型，相当于数据库中的两张表，如果想把员工和他们工作的城市关联起来，需要告诉 Elasticsearch 文档之间的父子关系，这里 employee 是 child type，branch 是 parent type，在映射中声明，执行命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /company
{
	&quot;mappings&quot;: {
		&quot;branch&quot;: {},
		&quot;employee&quot;: {
			&quot;parent&quot;: { &quot;type&quot;: &quot;branch&quot; }
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 bulk api 索引 branch 类型下的文档，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST company/branch/_bulk
{ &quot;index&quot;: { &quot;_id&quot;: &quot;london&quot; }}
{ &quot;name&quot;: &quot;London Westminster&quot;,&quot;city&quot;: &quot;London&quot;,&quot;country&quot;: &quot;UK&quot; }
{ &quot;index&quot;: { &quot;_id&quot;: &quot;liverpool&quot; }}
{ &quot;name&quot;: &quot;Liverpool Central&quot;,&quot;city&quot;: &quot;Liverpool&quot;,&quot;country&quot;: &quot;UK&quot; }
{ &quot;index&quot;: { &quot;_id&quot;: &quot;paris&quot; }}
{ &quot;name&quot;: &quot;Champs Elysees&quot;,&quot;city&quot;: &quot;Paris&quot;,&quot;country&quot;: &quot;France&quot; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加员工数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST company/employee/_bulk
{ &quot;index&quot;: { &quot;_id&quot;: 1,&quot;parent&quot;:&quot;london&quot; }}
{ &quot;name&quot;: &quot;Alice Smith&quot;,&quot;dob&quot;: &quot;1970-10-24&quot;,&quot;hobby&quot;: &quot;hiking&quot; }
{ &quot;index&quot;: { &quot;_id&quot;: 2,&quot;parent&quot;:&quot;london&quot; }}
{ &quot;name&quot;: &quot;Mark Tomas&quot;,&quot;dob&quot;: &quot;1982-05-16&quot;,&quot;hobby&quot;: &quot;diving&quot; }
{ &quot;index&quot;: { &quot;_id&quot;: 3,&quot;parent&quot;:&quot;liverpool&quot; }}
{ &quot;name&quot;: &quot;Barry Smith&quot;,&quot;dob&quot;: &quot;1979-04-01&quot;,&quot;hobby&quot;: &quot;hiking&quot; }
{ &quot;index&quot;: { &quot;_id&quot;: 4,&quot;parent&quot;:&quot;paris&quot; }}
{ &quot;name&quot;: &quot;Adrien Grand&quot;,&quot;dob&quot;: &quot;1987-05-11&quot;,&quot;hobby&quot;: &quot;horses&quot; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过子文档查询父文档要使用 has_child 查询。例如，搜索 1980 年以后出生的员工所在的分支机构，employee 中 1980 年以后出生的有 Mark Thomas 和 Adrien Grand，他们分别在 london 和 paris，执行以下查询命令进行验证：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET company/branch/_search
{
	&quot;query&quot;: {
		&quot;has_child&quot;: {
			&quot;type&quot;: &quot;employee&quot;,
			&quot;query&quot;: {
				&quot;range&quot;: { &quot;dob&quot;: { &quot;gte&quot;: &quot;1980-01-01&quot; } }
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>搜索哪些机构中有名为 “Alice Smith” 的员工，因为使用 match 查询，会解析为 “Alice” 和 “Smith”，所以 Alice Smith 和 Barry Smith 所在的机构会被匹配，执行以下查询命令进行验证：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET company/branch/_search
{
	&quot;query&quot;: {
		&quot;has_child&quot;: {
			&quot;type&quot;: &quot;employee&quot;,
			&quot;score_mode&quot;: &quot;max&quot;,
			&quot;query&quot;: {
				&quot;match&quot;: { &quot;name&quot;: &quot;Alice Smith&quot; }
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 min_children 指定子文档的最小个数。例如，搜索最少含有两个 employee 的机构，查询命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET company/branch/_search?pretty
{
	&quot;query&quot;: {
		&quot;has_child&quot;: {
			&quot;type&quot;: &quot;employee&quot;,
			&quot;min_children&quot;: 2,
			&quot;query&quot;: {
				&quot;match_all&quot;: {}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="has-parent-query" tabindex="-1"><a class="header-anchor" href="#has-parent-query" aria-hidden="true">#</a> has_parent query</h3><p>通过父文档查询子文档使用 has_parent 查询。比如，搜索哪些 employee 工作在 UK，查询命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET company/employee/_search
{
	&quot;query&quot;: {
		&quot;has_parent&quot;: {
			&quot;parent_type&quot;: &quot;branch&quot;,
			&quot;query&quot;: {
				&quot;match&quot;: { &quot;country&quot;: &quot;UK }
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="位置查询" tabindex="-1"><a class="header-anchor" href="#位置查询" aria-hidden="true">#</a> 位置查询</h2><p>Elasticsearch 可以对地理位置点 geo_point 类型和地理位置形状 geo_shape 类型的数据进行搜索。为了学习方便，这里准备一些城市的地理坐标作为测试数据，每一条文档都包含城市名称和地理坐标这两个字段，这里的坐标点取的是各个城市中心的一个位置。首先把下面的内容保存到 geo.json 文件中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;:&quot;1&quot; }}
{&quot;name&quot;:&quot;北京&quot;,&quot;location&quot;:&quot;39.9088145109,116.3973999023&quot;}
{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;: &quot;2&quot; }}
{&quot;name&quot;:&quot;乌鲁木齐&quot;,&quot;location&quot;:&quot;43.8266300000,87.6168800000&quot;}
{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;:&quot;3&quot; }}
{&quot;name&quot;:&quot;西安&quot;,&quot;location&quot;:&quot;34.3412700000,108.9398400000&quot;}
{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;:&quot;4&quot; }}
{&quot;name&quot;:&quot;郑州&quot;,&quot;location&quot;:&quot;34.7447157466,113.6587142944&quot;}
{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;:&quot;5&quot; }}
{&quot;name&quot;:&quot;杭州&quot;,&quot;location&quot;:&quot;30.2294080260,120.1492309570&quot;}
{&quot;index&quot;:{ &quot;_index&quot;:&quot;geo&quot;,&quot;_type&quot;:&quot;city&quot;,&quot;_id&quot;:&quot;6&quot; }}
{&quot;name&quot;:&quot;济南&quot;,&quot;location&quot;:&quot;36.6518400000,117.1200900000&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个索引并设置映射：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT geo
{
	&quot;mappings&quot;: {
		&quot;city&quot;: {
			&quot;properties&quot;: {
				&quot;name&quot;: {
					&quot;type&quot;: &quot;keyword&quot;
				},
				&quot;location&quot;: {
					&quot;type&quot;: &quot;geo_point&quot;
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行批量导入命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -XPOST &quot;http://localhost:9200/_bulk?pretty&quot; --data-binary @geo.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="geo-distance-query" tabindex="-1"><a class="header-anchor" href="#geo-distance-query" aria-hidden="true">#</a> geo_distance query</h3><p>geo_distance query 可以查找在一个中心点指定范围内的地理点文档。例如，查找距离天津 200km 以内的城市，搜索结果中会返回北京，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET geo/_search
{
	&quot;query&quot;: {
		&quot;bool&quot;: {
			&quot;must&quot;: {
				&quot;match_all&quot;: {}
			},
			&quot;filter&quot;: {
				&quot;geo_distance&quot;: {
					&quot;distance&quot;: &quot;200km&quot;,
					&quot;location&quot;: {
						&quot;lat&quot;: 39.0851000000,
						&quot;lon&quot;: 117.1993700000
					}
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按各城市离北京的距离排序：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET geo/_search
{
  &quot;query&quot;: {
    &quot;match_all&quot;: {}
  },
  &quot;sort&quot;: [{
    &quot;_geo_distance&quot;: {
      &quot;location&quot;: &quot;39.9088145109,116.3973999023&quot;,
      &quot;unit&quot;: &quot;km&quot;,
      &quot;order&quot;: &quot;asc&quot;,
      &quot;distance_type&quot;: &quot;plane&quot;
    }
  }]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 location 对应的经纬度字段；unit 为 <code>km</code> 表示将距离以 <code>km</code> 为单位写入到每个返回结果的 sort 键中；distance_type 为 <code>plane</code> 表示使用快速但精度略差的 <code>plane</code> 计算方式。</p><h3 id="geo-bounding-box-query" tabindex="-1"><a class="header-anchor" href="#geo-bounding-box-query" aria-hidden="true">#</a> geo_bounding_box query</h3><p>geo_bounding_box query 用于查找落入指定的矩形内的地理坐标。查询中由两个点确定一个矩形，然后在矩形区域内查询匹配的文档。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET geo/_search
{
	&quot;query&quot;: {
		&quot;bool&quot;: {
			&quot;must&quot;: {
				&quot;match_all&quot;: {}
			},
			&quot;filter&quot;: {
				&quot;geo_bounding_box&quot;: {
					&quot;location&quot;: {
						&quot;top_left&quot;: {
							&quot;lat&quot;: 38.4864400000,
							&quot;lon&quot;: 106.2324800000
						},
						&quot;bottom_right&quot;: {
							&quot;lat&quot;: 28.6820200000,
							&quot;lon&quot;: 115.8579400000
						}
					}
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="geo-polygon-query" tabindex="-1"><a class="header-anchor" href="#geo-polygon-query" aria-hidden="true">#</a> geo_polygon query</h3><p>geo_polygon query 用于查找在指定<strong>多边形</strong>内的地理点。例如，呼和浩特、重庆、上海三地组成一个三角形，查询位置在该三角形区域内的城市，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET geo/_search
{
	&quot;query&quot;: {
		&quot;bool&quot;: {
			&quot;must&quot;: {
				&quot;match_all&quot;: {}
			}
		},
		&quot;filter&quot;: {
			&quot;geo_polygon&quot;: {
				&quot;location&quot;: {
					&quot;points&quot;: [{
						&quot;lat&quot;: 40.8414900000,
						&quot;lon&quot;: 111.7519900000
					}, {
						&quot;lat&quot;: 29.5647100000,
						&quot;lon&quot;: 106.5507300000
					}, {
						&quot;lat&quot;: 31.2303700000,
						&quot;lon&quot;: 121.4737000000
					}]
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="geo-shape-query" tabindex="-1"><a class="header-anchor" href="#geo-shape-query" aria-hidden="true">#</a> geo_shape query</h3><p>geo_shape query 用于查询 geo_shape 类型的地理数据，地理形状之间的关系有相交、包含、不相交三种。创建一个新的索引用于测试，其中 location 字段的类型设为 geo_shape 类型。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT geoshape
{
	&quot;mappings&quot;: {
		&quot;city&quot;: {
			&quot;properties&quot;: {
				&quot;name&quot;: {
					&quot;type&quot;: &quot;keyword&quot;
				},
				&quot;location&quot;: {
					&quot;type&quot;: &quot;geo_shape&quot;
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于经纬度的顺序这里做一个说明，geo_point 类型的字段纬度在前经度在后，但是对于 geo_shape 类型中的点，是经度在前纬度在后，这一点需要特别注意。</p><p>把西安和郑州连成的线写入索引：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST geoshape/city/1
{
	&quot;name&quot;: &quot;西安-郑州&quot;,
	&quot;location&quot;: {
		&quot;type&quot;: &quot;linestring&quot;,
		&quot;coordinates&quot;: [
			[108.9398400000, 34.3412700000],
			[113.6587142944, 34.7447157466]
		]
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询包含在由银川和南昌作为对角线上的点组成的矩形的地理形状，由于西安和郑州组成的直线落在该矩形区域内，因此可以被查询到。命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET geoshape/_search
{
	&quot;query&quot;: {
		&quot;bool&quot;: {
			&quot;must&quot;: {
				&quot;match_all&quot;: {}
			},
			&quot;filter&quot;: {
				&quot;geo_shape&quot;: {
					&quot;location&quot;: {
						&quot;shape&quot;: {
							&quot;type&quot;: &quot;envelope&quot;,
							&quot;coordinates&quot;: [
								[106.23248, 38.48644],
								[115.85794, 28.68202]
							]
						},
						&quot;relation&quot;: &quot;within&quot;
					}
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="特殊查询" tabindex="-1"><a class="header-anchor" href="#特殊查询" aria-hidden="true">#</a> 特殊查询</h2><h3 id="more-like-this-query" tabindex="-1"><a class="header-anchor" href="#more-like-this-query" aria-hidden="true">#</a> more_like_this query</h3><p>more_like_this query 可以查询和提供文本类似的文档，通常用于近似文本的推荐等场景。查询命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
	&quot;query&quot;: {
		&quot;more_like_ this&quot;: {
			&quot;fields&quot;: [&quot;title&quot;, &quot;description&quot;],
			&quot;like&quot;: &quot;java virtual machine&quot;,
			&quot;min_term_freq&quot;: 1,
			&quot;max_query_terms&quot;: 12
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可选的参数及取值说明如下：</p><ul><li>fields 要匹配的字段，默认是 _all 字段。</li><li>like 要匹配的文本。</li><li>min_term_freq 文档中词项的最低频率，默认是 2，低于此频率的文档会被忽略。</li><li>max_query_terms query 中能包含的最大词项数目，默认为 25。</li><li>min_doc_freq 最小的文档频率，默认为 5。</li><li>max_doc_freq 最大文档频率。</li><li>min_word length 单词的最小长度。</li><li>max_word length 单词的最大长度。</li><li>stop_words 停用词列表。</li><li>analyzer 分词器。</li><li>minimum_should_match 文档应匹配的最小词项数，默认为 query 分词后词项数的 30%。</li><li>boost terms 词项的权重。</li><li>include 是否把输入文档作为结果返回。</li><li>boost 整个 query 的权重，默认为 1.0。</li></ul><h3 id="script-query" tabindex="-1"><a class="header-anchor" href="#script-query" aria-hidden="true">#</a> script query</h3><p>Elasticsearch 支持使用脚本进行查询。例如，查询价格大于 180 的文档，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET books/_search
{
  &quot;query&quot;: {
    &quot;script&quot;: {
      &quot;script&quot;: {
        &quot;inline&quot;: &quot;doc[&#39;price&#39;].value &gt; 180&quot;,
        &quot;lang&quot;: &quot;painless&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="percolate-query" tabindex="-1"><a class="header-anchor" href="#percolate-query" aria-hidden="true">#</a> percolate query</h3><p>一般情况下，我们是先把文档写入到 Elasticsearch 中，通过查询语句对文档进行搜索。percolate query 则是反其道而行之的做法，它会先注册查询条件，根据文档来查询 query。例如，在 my-index 索引中有一个 laptop 类型，文档有 price 和 name 两个字段，在映射中声明一个 percolator 类型的 query，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT my-index
{
	&quot;mappings&quot;: {
		&quot;laptop&quot;: {
			&quot;properties&quot;: {
				&quot;price&quot;: { &quot;type&quot;: &quot;long&quot; },
				&quot;name&quot;: { &quot;type&quot;: &quot;text&quot; }
			},
			&quot;queries&quot;: {
				&quot;properties&quot;: {
					&quot;query&quot;: { &quot;type&quot;: &quot;percolator&quot; }
				}
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注册一个 bool query，bool query 中包含一个 range query，要求 price 字段的取值小于等于 10000，并且 name 字段中含有关键词 macbook：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /my-index/queries/1?refresh
{
	&quot;query&quot;: {
		&quot;bool&quot;: {
			&quot;must&quot;: [{
				&quot;range&quot;: { &quot;price&quot;: { &quot;lte&quot;: 10000 } }
			}, {
				&quot;match&quot;: { &quot;name&quot;: &quot;macbook&quot; }
			}]
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过文档查询 query：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /my-index/_search
{
	&quot;query&quot;: {
		&quot;percolate&quot;: {
			&quot;field&quot;: &quot;query&quot;,
			&quot;document_type&quot;: &quot;laptop&quot;,
			&quot;document&quot;: {
				&quot;price&quot;: 9999,
				&quot;name&quot;: &quot;macbook pro on sale&quot;
			}
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文档符合 query 中的条件，返回结果中可以查到上文中注册的 bool query。percolate query 的这种特性适用于数据分类、数据路由、事件监控和预警等场景。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,70),le={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"};function ue(oe,ce){const e=l("ExternalLinkIcon");return u(),o("div",null,[r,d,p,n("ul",null,[n("li",null,[s("叶子查询 - 在指定字段中查找特定值，例如："),n("a",v,[m,a(e)]),s("、"),n("a",q,[b,a(e)]),s(" 和 "),n("a",h,[k,a(e)]),s("。")]),n("li",null,[s("组合查询 - 组合其他叶子查询或组合查询，用于以逻辑方式组合多个查询（例如： "),n("a",g,[_,a(e)]),s("、"),n("a",y,[f,a(e)]),s("），或更改它们的行为（例如："),n("a",x,[w,a(e)]),s("）。")])]),T,n("ul",null,[n("li",null,[n("a",E,[s("Compound（组合查询）"),a(e)])]),n("li",null,[n("a",G,[s("Term-level（词项查询）"),a(e)])]),n("li",null,[n("a",z,[s("Full text（全文查询）"),a(e)])]),n("li",null,[n("a",S,[s("Joining（联结查询）"),a(e)])]),n("li",null,[n("a",P,[s("Specialized（专用查询）"),a(e)])]),n("li",null,[n("a",D,[s("Geo（地理位置查询）"),a(e)])]),n("li",null,[n("a",L,[s("Span（跨度查询）"),a(e)])]),n("li",null,[n("a",O,[s("Vector（向量查询）"),a(e)])]),n("li",null,[n("a",A,[s("Shape（形状查询）"),a(e)])])]),U,N,H,n("ul",null,[n("li",null,[n("a",I,[s("intervals"),a(e)])]),n("li",null,[n("a",B,[s("match"),a(e)])]),n("li",null,[n("a",j,[s("match_bool_prefix"),a(e)])]),n("li",null,[n("a",F,[s("match_phrase"),a(e)])]),n("li",null,[n("a",J,[s("match_phrase_prefix"),a(e)])]),n("li",null,[n("a",K,[s("combined_fields"),a(e)])]),n("li",null,[n("a",R,[s("multi_match"),a(e)])]),n("li",null,[n("a",W,[s("query_string"),a(e)])]),n("li",null,[n("a",C,[s("simple_query_string"),a(e)])])]),Q,n("p",null,[n("a",V,[X,a(e)]),s(" 根据匹配词的顺序和近似度返回文档。")]),M,n("p",null,[n("a",$,[Y,a(e)]),s(),Z,s("，首先会针对查询语句进行解析（经过 analyzer），主要是对查询语句进行分词，分词后查询语句的任何一个词项被匹配，文档就会被搜到，默认情况下相当于对分词后词项进行 or 匹配操作。")]),n("p",null,[n("a",nn,[sn,a(e)]),s(" 是执行全文搜索的标准查询，包括模糊匹配选项。")]),en,n("p",null,[s("匹配查询是布尔类型。这意味着会对提供的文本进行分析，分析过程从提供的文本构造一个布尔查询。 "),an,s(" 参数可以设置为 "),tn,s(" 或 "),ln,s(" 来控制布尔子句（默认为 "),un,s("）。可以使用 "),n("a",on,[cn,a(e)]),s(" 参数设置要匹配的可选 "),rn,s(" 子句的最小数量。")]),dn,n("p",null,[pn,s(" 允许基于被查询字段的类型进行模糊匹配。请参阅 "),n("a",vn,[s("Fuzziness"),a(e)]),s(" 的配置。")]),mn,n("p",null,[n("a",qn,[bn,a(e)]),s(" 分析其输入并根据这些词构造一个布尔查询。除了最后一个术语之外的每个术语都用于术语查询。最后一个词用于 "),hn,s("。")]),kn,n("p",null,[n("a",gn,[_n,a(e)]),s(" 即短语匹配，首先会把 query 内容分词，分词器可以自定义，同时文档还要满足以下两个条件才会被搜索到：")]),yn,n("p",null,[n("a",fn,[xn,a(e)]),s(" 和 "),n("a",wn,[Tn,a(e)]),s(" 类似，只不过 "),n("a",En,[Gn,a(e)]),s(" 最后一个 term 会被作为前缀匹配。")]),zn,n("p",null,[n("a",Sn,[Pn,a(e)]),s(" 是 "),Dn,s(" 的升级，"),Ln,s("。")]),On,n("p",null,[n("a",An,[Un,a(e)]),s(" 支持搜索多个文本字段，就好像它们的内容已被索引到一个组合字段中一样。该查询会生成以 term 为中心的输入字符串视图：首先它将查询字符串解析为独立的 term，然后在所有字段中查找每个 term。当匹配结果可能跨越多个文本字段时，此查询特别有用，例如文章的标题、摘要和正文：")]),Nn,n("p",null,[n("a",Hn,[In,a(e)]),s(" 是一种在不牺牲性能的情况下替代停用词提高搜索准确率和召回率的方案。")]),Bn,n("p",null,[n("a",jn,[Fn,a(e)]),s(" 是与 Lucene 查询语句的语法结合非常紧密的一种查询，允许在一个查询语句中使用多个特殊条件关键字（如：AND | OR | NOT）对多个字段进行查询，建议熟悉 Lucene 查询语法的用户去使用。")]),Jn,n("p",null,[n("a",Kn,[Rn,a(e)]),s(" 是一种适合直接暴露给用户，并且具有非常完善的查询语法的查询语句，接受 Lucene 查询语法，解析过程中发生错误不会抛出异常。")]),n("p",null,[s("虽然语法比 "),n("a",Wn,[Cn,a(e)]),s(" 更严格，但 "),n("a",Qn,[Vn,a(e)]),s(" 不会返回无效语法的错误。相反，它会忽略查询字符串的任何无效部分。")]),Xn,n("ul",null,[n("li",null,[n("strong",null,[n("a",Mn,[s("Exists"),a(e)])])]),n("li",null,[n("strong",null,[n("a",$n,[s("Fuzzy"),a(e)])])]),n("li",null,[n("strong",null,[n("a",Yn,[s("IDs"),a(e)])])]),n("li",null,[n("strong",null,[n("a",Zn,[s("Prefix"),a(e)])])]),n("li",null,[n("strong",null,[n("a",ns,[s("Range"),a(e)])])]),n("li",null,[n("strong",null,[n("a",ss,[s("Regexp"),a(e)])])]),n("li",null,[n("strong",null,[n("a",es,[s("Term"),a(e)])])]),n("li",null,[n("strong",null,[n("a",as,[s("Terms"),a(e)])])]),n("li",null,[n("strong",null,[n("a",ts,[s("Terms set"),a(e)])])]),n("li",null,[n("strong",null,[n("a",is,[s("Wildcard"),a(e)])])])]),ls,n("p",null,[n("a",us,[os,a(e)]),s(" 会返回字段中至少有一个非空值的文档。")]),cs,n("p",null,[n("a",rs,[ds,s("（模糊查询）"),a(e)]),s("返回包含与搜索词相似的词的文档。ES 使用 "),n("a",ps,[s("Levenshtein edit distance（Levenshtein 编辑距离）"),a(e)]),s("测量相似度或模糊度。")]),vs,n("p",null,[s("注意：如果配置了 "),n("a",ms,[qs,a(e)]),s(" ，则 fuzzy query 不能执行。")]),bs,n("p",null,[n("a",hs,[ks,a(e)]),s(" 根据 ID 返回文档。 此查询使用存储在 "),gs,s(" 字段中的文档 ID。")]),_s,n("p",null,[n("a",ys,[fs,a(e)]),s(" 用于查询某个字段中包含指定前缀的文档。")]),xs,n("p",null,[n("a",ws,[Ts,a(e)]),s(" 即范围查询，用于匹配在某一范围内的数值型、日期类型或者字符串型字段的文档。比如搜索哪些书籍的价格在 50 到 100 之间、哪些书籍的出版时间在 2015 年到 2019 年之间。"),Es,s("。")]),Gs,n("p",null,[n("a",zs,[Ss,a(e)]),s(" 返回与正则表达式相匹配的 term 所属的文档。")]),n("p",null,[n("a",Ps,[s("正则表达式"),a(e)]),s("是一种使用占位符字符匹配数据模式的方法，称为运算符。")]),Ds,n("blockquote",null,[n("p",null,[s("注意：如果配置了"),n("a",Ls,[Os,a(e)]),s(" ，则 "),n("a",As,[Us,a(e)]),s(" 会被禁用。")])]),Ns,n("p",null,[n("a",Hs,[Is,a(e)]),s(" 用来查找指定字段中包含给定单词的文档，term 查询不被解析，只有查询词和文档中的词精确匹配才会被搜索到，应用场景为查询人名、地名等需要精准匹配的需求。")]),Bs,n("p",null,[n("a",js,[Fs,a(e)]),s(" 与 "),n("a",Js,[Ks,a(e)]),s(" 相同，但可以搜索多个值。")]),Rs,n("p",null,[n("a",Ws,[Cs,a(e)]),s(" 用于查询具有指定类型的文档。")]),Qs,n("p",null,[n("a",Vs,[Xs,a(e)]),s(" 即通配符查询，返回与通配符模式匹配的文档。")]),Ms,n("blockquote",null,[n("p",null,[s("注意：如果配置了"),n("a",$s,[Ys,a(e)]),s(" ，则"),n("a",Zs,[ne,a(e)]),s(" 会被禁用。")])]),se,n("p",null,[s("有关布尔查询更详细的信息参考 "),n("a",ee,[s("bool query（组合查询）详解"),a(e)]),s("。")]),ae,n("p",null,[s("关于 function_score 的更多详细内容请查看 "),n("a",te,[s("Elasticsearch function_score 查询最强详解"),a(e)]),s("。")]),ie,n("ul",null,[n("li",null,[n("a",le,[s("极客时间教程 - Elasticsearch 核心技术与实战"),a(e)])])])])}const pe=i(c,[["render",ue],["__file","index.html.vue"]]);export{pe as default};
