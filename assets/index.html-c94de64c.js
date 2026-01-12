import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c,a as n,b as s,d as e,e as t}from"./app-0e67a029.js";const u={},r=n("h1",{id:"elasticsearch-搜索-下",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch-搜索-下","aria-hidden":"true"},"#"),s(" Elasticsearch 搜索（下）")],-1),p=n("p",null,"Elasticsearch 提供了基于 JSON 的 DSL（Domain Specific Language）来定义查询。",-1),d=n("p",null,"可以将 DSL 视为查询的 AST（抽象语法树），由两种类型的子句组成：",-1),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"match",-1),k={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"term",-1),h={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"range",-1),q={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"bool",-1),f={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html",target:"_blank",rel:"noopener noreferrer"},y=n("code",null,"dis_max",-1),w={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html",target:"_blank",rel:"noopener noreferrer"},x=n("code",null,"constant_score",-1),E=t("<p>查询子句的行为会有所不同，具体取决于它们是在 query content 还是 filter context 中使用。</p><ul><li><code>query</code> context - <strong>有相关性计算</strong>，采用相关性算法，计算文档与查询关键词之间的相关度，并根据评分（<code>_score</code>）大小排序。</li><li><code>filter</code> context - <strong>无相关性计算</strong>，可以利用缓存，性能更好。</li></ul><p>从用法角度，Elasticsearch 查询分类大致分为：</p>",3),T={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/joining-queries.html",target:"_blank",rel:"noopener noreferrer"},F={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/specialized-queries.html",target:"_blank",rel:"noopener noreferrer"},P={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html",target:"_blank",rel:"noopener noreferrer"},L={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/span-queries.html",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/vector-queries.html",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/shape-queries.html",target:"_blank",rel:"noopener noreferrer"},N=n("h2",{id:"全文查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#全文查询","aria-hidden":"true"},"#"),s(" 全文查询")],-1),j={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html",target:"_blank",rel:"noopener noreferrer"},D=n("p",null,"在 ES 中，支持以下全文搜索方式：",-1),U={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-intervals-query.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},I=n("strong",null,"匹配查询",-1),O={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-bool-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},M=n("code",null,"prefix",-1),Q=n("code",null,"term",-1),R={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},H=n("strong",null,"短语匹配查询",-1),J={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html",target:"_blank",rel:"noopener noreferrer"},V=n("code",null,"match_phrase",-1),W={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html",target:"_blank",rel:"noopener noreferrer"},X={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-combined-fields-query.html",target:"_blank",rel:"noopener noreferrer"},K={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.16/query-dsl-query-string-query.html#query-string-syntax",target:"_blank",rel:"noopener noreferrer"},Z=n("code",null,"AND|OR|NOT",-1),$={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html",target:"_blank",rel:"noopener noreferrer"},nn=n("code",null,"query_string",-1),sn=n("h3",{id:"match-匹配查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-匹配查询","aria-hidden":"true"},"#"),s(" match（匹配查询）")],-1),an={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html",target:"_blank",rel:"noopener noreferrer"},en=n("strong",null,[n("code",null,"match")],-1),tn=t(`<details class="hint-container details"><summary>match 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;George Hubbard&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">891</span><span class="token punctuation">,</span> <span class="token comment">// 查询使用的毫秒数</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否有分片超时，也就是说是否只返回了部分结果</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 总分片数、响应成功/失败数量信息</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 搜索结果</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 匹配的总记录数</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">82</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token number">10.018585</span><span class="token punctuation">,</span> <span class="token comment">// 所有匹配文档中的最大相关性分值</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 匹配文档列表</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;kibana_sample_data_ecommerce&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文档所属索引</span>
        <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文档所属 type</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2ZUtBX4BU8KXl1YJRBrH&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文档的唯一性标识</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">10.018585</span><span class="token punctuation">,</span> <span class="token comment">// 文档的相关性分值</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// 文档的原始 JSON 对象</span>
          <span class="token comment">// 略</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 省略多条记录</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>可以通过组合 <code>&lt;field&gt;</code> 和 <code>query</code> 参数来简化匹配查询语法。下面是一个简单的示例。</p><details class="hint-container details"><summary>match 简写示例</summary><p>下面的查询等价于前面的匹配查询示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;George Hubbard&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在进行全文本字段检索的时候， match API 提供了 operator 和 minimum_should_match 参数：</p>`,4),ln=n("li",null,[n("strong",null,"operator"),s(" 参数值可以为 “or” 或者 “and” 来控制检索词项间的关系，默认值为 “or”。所以上面例子中，只要书名中含有 “linux” 或者 “architecture” 的文档都可以匹配上。")],-1),on={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-minimum-should-match.html",target:"_blank",rel:"noopener noreferrer"},cn=t(`<details class="hint-container details"><summary>minimum_should_match 示例</summary><p>至少有 50% 的词项匹配的文档才会被返回：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;category&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Women Clothing Accessories&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;or&quot;</span>,
        <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;50%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,1),un=n("strong",null,"fuzziness",-1),rn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness",target:"_blank",rel:"noopener noreferrer"},pn=t(`<p>在这种情况下可以设置 <code>prefix_length</code> 和 <code>max_expansions</code> 来控制模糊匹配。如果设置了模糊选项，查询将使用 <code>top_terms_blended_freqs_\${max_expansions}</code> 作为其重写方法，<code>fuzzy_rewrite</code> 参数允许控制查询将如何被重写。</p><p>默认情况下允许模糊倒转 (<code>ab</code> → <code>ba</code>)，但可以通过将 <code>fuzzy_transpositions</code> 设置为 <code>false</code> 来禁用。</p><details class="hint-container details"><summary>fuzziness 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_first_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Gearge&quot;</span>,
        <span class="token string">&quot;fuzziness&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;AUTO&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>如果使用的分析器像 stop 过滤器一样删除查询中的所有标记，则默认行为是不匹配任何文档。可以使用 <code>zero_terms_query</code> 选项来改变默认行为，它接受 <code>none</code>（默认）和 <code>all</code> （相当于 <code>match_all</code> 查询）。</p><details class="hint-container details"><summary>zero_terms_query 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_logs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Mozilla Linux&quot;</span>,
        <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;and&quot;</span>,
        <span class="token string">&quot;zero_terms_query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;all&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="match-phrase-短语匹配查询" tabindex="-1"><a class="header-anchor" href="#match-phrase-短语匹配查询" aria-hidden="true">#</a> match_phrase（短语匹配查询）</h3>`,6),dn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},mn=n("strong",null,[n("code",null,"match_phrase")],-1),vn=t(`<ol><li><strong>分词后所有词项都要出现在该字段中（相当于 and 操作）</strong>。</li><li><strong>字段中的词项顺序要一致</strong>。</li></ol><details class="hint-container details"><summary>match_phrase 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_logs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
       <span class="token string">&quot;agent&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Linux x86_64&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="match-phrase-prefix-短语前缀匹配查询" tabindex="-1"><a class="header-anchor" href="#match-phrase-prefix-短语前缀匹配查询" aria-hidden="true">#</a> match_phrase_prefix（短语前缀匹配查询）</h3>`,3),kn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html",target:"_blank",rel:"noopener noreferrer"},bn=n("strong",null,[n("code",null,"match_phrase")],-1),hn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html",target:"_blank",rel:"noopener noreferrer"},gn=n("strong",null,[n("code",null,"match_phrase_prefix")],-1),qn=t(`<details class="hint-container details"><summary>match_phrase_prefix 示例</summary><p>匹配以 <code>https://www.elastic.co/download</code> 开头的短语</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_logs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_phrase_prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;url&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;https://www.elastic.co/download&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="multi-match-多字段匹配查询" tabindex="-1"><a class="header-anchor" href="#multi-match-多字段匹配查询" aria-hidden="true">#</a> multi_match（多字段匹配查询）</h3>`,2),_n={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html",target:"_blank",rel:"noopener noreferrer"},fn=n("strong",null,[n("code",null,"multi_match")],-1),yn=n("p",null,[n("code",null,"multi_match"),s(" 查询在内部执行的方式取决于 type 参数，可以设置为：")],-1),wn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-best-fields",target:"_blank",rel:"noopener noreferrer"},xn=n("code",null,"best_fields",-1),En={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-most-fields",target:"_blank",rel:"noopener noreferrer"},Tn=n("code",null,"most_fields",-1),Sn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-cross-fields",target:"_blank",rel:"noopener noreferrer"},zn=n("code",null,"cross_fields",-1),Gn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-phrase",target:"_blank",rel:"noopener noreferrer"},Fn=n("code",null,"phrase",-1),Pn=n("code",null,"match_phrase",-1),Ln={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-phrase",target:"_blank",rel:"noopener noreferrer"},Cn=n("code",null,"phrase_prefix",-1),An=n("code",null,"match_phrase_prefix",-1),Nn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-bool-prefix",target:"_blank",rel:"noopener noreferrer"},jn=n("code",null,"bool_prefix",-1),Dn={href:"https://link.juejin.cn/?target=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Felasticsearch%2Freference%2F7.13%2Fquery-dsl-match-bool-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},Un=t(`<details class="hint-container details"><summary>multi_match 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;multi_match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token number">34.98</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;taxful_total_price&quot;</span>,
        <span class="token string">&quot;taxless_total_*&quot;</span> <span class="token comment"># 可以使用通配符</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="词项级别查询" tabindex="-1"><a class="header-anchor" href="#词项级别查询" aria-hidden="true">#</a> 词项级别查询</h2><p><strong><code>Term</code>（词项）是表达语意的最小单位</strong>。搜索和利用统计语言模型进行自然语言处理都需要处理 Term。</p><p>全文查询在执行查询之前会分析查询字符串。与全文查询不同，<strong>词项级别查询不会分词</strong>，而是将输入作为一个整体，在倒排索引中查找准确的词项。并且使用相关度计算公式为每个包含该词项的文档进行相关度计算。一言以概之：<strong>词项查询是对词项进行精确匹配</strong>。词项查询通常用于结构化数据，如数字、日期和枚举类型。</p><p>词项查询有以下类型：</p>`,5),Bn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html",target:"_blank",rel:"noopener noreferrer"},In={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html",target:"_blank",rel:"noopener noreferrer"},On={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html",target:"_blank",rel:"noopener noreferrer"},Mn=n("code",null,"_id",-1),Qn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html",target:"_blank",rel:"noopener noreferrer"},Rn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},Hn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},Jn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Vn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html",target:"_blank",rel:"noopener noreferrer"},Wn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Xn=n("strong",null,[n("code",null,"term")],-1),Kn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html",target:"_blank",rel:"noopener noreferrer"},Yn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Zn=n("strong",null,[n("code",null,"term")],-1),$n={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},ns=n("h3",{id:"exists-字段不为空查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#exists-字段不为空查询","aria-hidden":"true"},"#"),s(" exists（字段不为空查询）")],-1),ss={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html",target:"_blank",rel:"noopener noreferrer"},as=n("strong",null,[n("code",null,"exists")],-1),es=t(`<p>由于多种原因，文档字段可能不存在索引值：</p><ul><li>JSON 中的字段为 <code>null</code> 或 <code>[]</code></li><li>该字段在 mapping 中配置了 <code>&quot;index&quot; : false</code></li><li>字段值的长度超过了 mapping 中的 <code>ignore_above</code> 设置</li><li>字段值格式错误，并且在 mapping 中定义了 <code>ignore_malformed</code></li></ul><details class="hint-container details"><summary>exists 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;exists&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;email&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="fuzzy-模糊查询" tabindex="-1"><a class="header-anchor" href="#fuzzy-模糊查询" aria-hidden="true">#</a> fuzzy（模糊查询）</h3>`,4),ts={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html",target:"_blank",rel:"noopener noreferrer"},ls=n("strong",null,[n("code",null,"fuzzy")],-1),is={href:"https://en.wikipedia.org/wiki/Levenshtein_distance",target:"_blank",rel:"noopener noreferrer"},os=t("<p>编辑距离是将一个术语转换为另一个术语所需的单个字符更改的数量。这些变化可能包括：</p><ul><li>改变一个字符：（<strong>b</strong>ox -&gt; <strong>f</strong>ox）</li><li>删除一个字符：（<strong>b</strong>lack -&gt; lack）</li><li>插入一个字符：（sic -&gt; sic<strong>k</strong>）</li><li>反转两个相邻字符：（<strong>ac</strong>t → <strong>ca</strong>t）</li></ul><p>为了找到相似的词条，fuzzy query 会在指定的编辑距离内创建搜索词条的所有可能变体或扩展集。然后返回完全匹配任意扩展的文档。</p>",3),cs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},us=n("code",null,"search.allow_expensive_queries",-1),rs=t(`<details class="hint-container details"><summary>fuzzy 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;fuzzy&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="prefix-前缀查询" tabindex="-1"><a class="header-anchor" href="#prefix-前缀查询" aria-hidden="true">#</a> prefix（前缀查询）</h3>`,2),ps={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html#prefix-query-ex-request",target:"_blank",rel:"noopener noreferrer"},ds=n("strong",null,[n("code",null,"prefix")],-1),ms=t(`<p>比如查询 <code>user.id</code> 中含有以 <code>ki</code> 为前缀的关键词的文档，那么含有 <code>kind</code>、<code>kid</code> 等所有以 <code>ki</code> 开头关键词的文档都会被匹配。</p><details class="hint-container details"><summary>prefix 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;customer_full_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mar&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="range-范围查询" tabindex="-1"><a class="header-anchor" href="#range-范围查询" aria-hidden="true">#</a> range（范围查询）</h3>`,3),vs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html",target:"_blank",rel:"noopener noreferrer"},ks=n("strong",null,[n("code",null,"range")],-1),bs=n("strong",null,"使用 range 查询只能查询一个字段，不能作用在多个字段上",-1),hs=t(`<p><code>range</code> 查询支持的参数有以下几种：</p><ul><li><strong><code>gt</code></strong> - 大于</li><li><strong><code>gte</code></strong> - 大于等于</li><li><strong><code>lt</code></strong> - 小于</li><li><strong><code>lte</code></strong> - 小于等于</li><li><strong><code>format</code></strong> - 如果字段是 Date 类型，可以设置日期格式化</li><li><strong><code>time_zone</code></strong> - 时区</li><li><strong><code>relation</code></strong> - 指示范围查询如何匹配范围字段的值。 <ul><li><strong><code>INTERSECTS</code> (Default)</strong> - 匹配与查询字段值范围相交的文档。</li><li><strong><code>CONTAINS</code></strong> - 匹配完全包含查询字段值的文档。</li><li><strong><code>WITHIN</code></strong> - 匹配具有完全在查询范围内的范围字段值的文档。</li></ul></li></ul><details class="hint-container details"><summary>range 示例</summary><p>数值范围查询示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日期范围查询示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="regexp-正则匹配查询" tabindex="-1"><a class="header-anchor" href="#regexp-正则匹配查询" aria-hidden="true">#</a> regexp（正则匹配查询）</h3>`,4),gs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},qs=n("strong",null,[n("code",null,"regexp")],-1),_s={href:"https://zh.wikipedia.org/zh-hans/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},fs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},ys=n("code",null,"search.allow_expensive_queries",-1),ws={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html",target:"_blank",rel:"noopener noreferrer"},xs=n("strong",null,[n("code",null,"regexp query")],-1),Es=t(`<details class="hint-container details"><summary>regexp 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;regexp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;email&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;.*@.*-family.zzz&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="term-词项匹配查询" tabindex="-1"><a class="header-anchor" href="#term-词项匹配查询" aria-hidden="true">#</a> term（词项匹配查询）</h3>`,2),Ts={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Ss=n("strong",null,[n("code",null,"term")],-1),zs=t(`<blockquote><p>注意：<strong>应避免 term 查询对 text 字段使用查询</strong>。默认情况下，Elasticsearch 针对 text 字段的值进行解析分词，这会使查找 text 字段值的精确匹配变得困难。要搜索 text 字段值，需改用 match 查询。</p></blockquote><details class="hint-container details"><summary>term 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建一个索引</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️ 注意：应避免 term 查询对 text 字段使用查询。</p><p>默认情况下，Elasticsearch 针对 text 字段的值进行解析分词，这会使查找 text 字段值的精确匹配变得困难。</p><p>要搜索 text 字段值，需改用 match 查询。</p></blockquote></details><h3 id="terms-多词项匹配查询" tabindex="-1"><a class="header-anchor" href="#terms-多词项匹配查询" aria-hidden="true">#</a> terms（多词项匹配查询）</h3>`,3),Gs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html",target:"_blank",rel:"noopener noreferrer"},Fs=n("strong",null,[n("code",null,"terms")],-1),Ps={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html",target:"_blank",rel:"noopener noreferrer"},Ls=n("strong",null,[n("code",null,"term")],-1),Cs=t(`<p>terms query 查询参数：</p><ul><li><strong><code>index</code></strong>：索引名</li><li><strong><code>id</code></strong>：文档 ID</li><li><strong><code>path</code></strong>：要从中获取字段值的字段的名称，即搜索关键字</li><li><strong><code>routing</code></strong>（选填）：要从中获取 term 值的文档的自定义路由值。如果在索引文档时提供了自定义路由值，则此参数是必需的。</li></ul><details class="hint-container details"><summary>terms 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建一个索引</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="wildcard-通配符查询" tabindex="-1"><a class="header-anchor" href="#wildcard-通配符查询" aria-hidden="true">#</a> wildcard（通配符查询）</h3>`,4),As={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},Ns=n("strong",null,[n("code",null,"wildcard")],-1),js=n("p",null,[n("code",null,"?"),s(" 用来匹配一个任意字符，"),n("code",null,"*"),s(" 用来匹配零个或者多个字符。")],-1),Ds={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html#query-dsl-allow-expensive-queries",target:"_blank",rel:"noopener noreferrer"},Us=n("code",null,"search.allow_expensive_queries",-1),Bs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html",target:"_blank",rel:"noopener noreferrer"},Is=n("strong",null,[n("code",null,"wildcard query")],-1),Os=t(`<details class="hint-container details"><summary>wildcard 示例</summary><p>示例：以下搜索返回 <code>user.id</code> 字段包含以 <code>ki</code> 开头并以 <code>y</code> 结尾的术语的文档。这些匹配项可以包括 <code>kiy</code>、<code>kity</code> 或 <code>kimchy</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;wildcard&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;email&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;*@underwood-family.zzz&quot;</span>,
        <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">&quot;rewrite&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;constant_score&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="复合查询" tabindex="-1"><a class="header-anchor" href="#复合查询" aria-hidden="true">#</a> 复合查询</h2><p>复合查询就是把一些简单查询组合在一起实现更复杂的查询需求，除此之外，复合查询还可以控制另外一个查询的行为。</p><p>复合查询有以下类型：</p>`,4),Ms={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html",target:"_blank",rel:"noopener noreferrer"},Qs=n("code",null,"bool",-1),Rs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html",target:"_blank",rel:"noopener noreferrer"},Hs=n("code",null,"boosting",-1),Js=n("code",null,"positive",-1),Vs=n("code",null,"negative",-1),Ws={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html",target:"_blank",rel:"noopener noreferrer"},Xs=n("code",null,"constant_score",-1),Ks=n("code",null,"constant_score",-1),Ys=n("code",null,"query",-1),Zs=n("code",null,"filter",-1),$s={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html",target:"_blank",rel:"noopener noreferrer"},na=n("code",null,"dis_max",-1),sa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html",target:"_blank",rel:"noopener noreferrer"},aa=n("code",null,"function_score",-1),ea=n("h3",{id:"bool-布尔查询",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#bool-布尔查询","aria-hidden":"true"},"#"),s(" bool （布尔查询）")],-1),ta={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html",target:"_blank",rel:"noopener noreferrer"},la=n("code",null,"bool",-1),ia=n("code",null,"must",-1),oa=n("code",null,"should",-1),ca=n("code",null,"must_not",-1),ua=n("code",null,"filter",-1),ra=t(`<ul><li><code>must</code> - 文档必须匹配 must 选项下的查询条件，相当于逻辑运算的 AND，且参与文档相关度的评分。</li><li><code>should</code> - 文档可以匹配 should 选项下的查询条件也可以不匹配，相当于逻辑运算的 OR，且参与文档相关度的评分。</li><li><code>must_not</code> - 与 must 相反，匹配该选项下的查询条件的文档不会被返回；需要注意的是，<strong>must_not 语句不会影响评分，它的作用只是将不相关的文档排除</strong>。</li><li><code>filter</code> - 和 must 一样，匹配 filter 选项下的查询条件的文档才会被返回，<strong>但是 filter 不评分，只起到过滤功能，与 must_not 相反</strong>。</li></ul><details class="hint-container details"><summary>bool 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;order&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;must_not&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;range&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;taxful_total_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;gte&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;should&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Sunday&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;category&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Clothing&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;minimum_should_match&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="boosting" tabindex="-1"><a class="header-anchor" href="#boosting" aria-hidden="true">#</a> boosting</h3>`,3),pa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html",target:"_blank",rel:"noopener noreferrer"},da=t(`<p>boosting 查询包括 <code>positive</code>、<code>negative</code> 和 <code>negative_boost</code> 三个部分。<code>positive</code> 中的查询评分保持不变；<code>negative</code> 中的查询会降低文档评分；相关性算分降低的程度将由 <code>negative_boost</code> 参数决定，其取值范围为：<code>[0.0, 1.0]</code>。</p><details class="hint-container details"><summary>boosting 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;boosting&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;positive&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Monday&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;negative&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;range&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;taxful_total_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;gte&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;30&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;negative_boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="constant-score" tabindex="-1"><a class="header-anchor" href="#constant-score" aria-hidden="true">#</a> constant_score</h3>`,3),ma={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html",target:"_blank",rel:"noopener noreferrer"},va=n("code",null,"constant_score",-1),ka=n("code",null,"query",-1),ba=n("code",null,"filter",-1),ha=t(`<details class="hint-container details"><summary>constant_score 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Monday&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="dis-max" tabindex="-1"><a class="header-anchor" href="#dis-max" aria-hidden="true">#</a> dis_max</h3>`,2),ga={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html",target:"_blank",rel:"noopener noreferrer"},qa=n("code",null,"dis_max",-1),_a=n("code",null,"bool",-1),fa=n("code",null,"dis_max",-1),ya=t(`<details class="hint-container details"><summary>dis_max 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;dis_max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;queries&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;currency&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;EUR&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Sunday&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;tie_breaker&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.7</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="function-score" tabindex="-1"><a class="header-anchor" href="#function-score" aria-hidden="true">#</a> function_score</h3>`,2),wa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html",target:"_blank",rel:"noopener noreferrer"},xa=n("p",null,[s("使用 "),n("code",null,"function_score"),s(" 查询，用户需要定义一个查询和一至多个评分函数，评分函数会对查询到的每个文档分别计算得分。")],-1),Ea=n("p",null,[n("code",null,"function_score"),s(" 查询提供了以下几种算分函数：")],-1),Ta={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-script-score",target:"_blank",rel:"noopener noreferrer"},Sa=n("strong",null,[n("code",null,"script_score")],-1),za={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-weight",target:"_blank",rel:"noopener noreferrer"},Ga=n("strong",null,[n("code",null,"weight")],-1),Fa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-random",target:"_blank",rel:"noopener noreferrer"},Pa=n("strong",null,[n("code",null,"random_score")],-1),La={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-field-value-factor",target:"_blank",rel:"noopener noreferrer"},Ca=n("strong",null,[n("code",null,"field_value_factor")],-1),Aa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-decay",target:"_blank",rel:"noopener noreferrer"},Na=n("strong",null,[n("code",null,"decay functions")],-1),ja=t(`<details class="hint-container details"><summary>function_score 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;function_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>,
      <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;5&quot;</span>,
      <span class="token string">&quot;functions&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Sunday&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
          <span class="token string">&quot;random_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
          <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token number">23</span>
        <span class="token punctuation">}</span>,
        <span class="token punctuation">{</span>
          <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Monday&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>,
          <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token number">42</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>,
      <span class="token string">&quot;max_boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">42</span>,
      <span class="token string">&quot;score_mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;max&quot;</span>,
      <span class="token string">&quot;boost_mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;multiply&quot;</span>,
      <span class="token string">&quot;min_score&quot;</span><span class="token builtin class-name">:</span> <span class="token number">42</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="推荐搜索" tabindex="-1"><a class="header-anchor" href="#推荐搜索" aria-hidden="true">#</a> 推荐搜索</h2>`,2),Da={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html",target:"_blank",rel:"noopener noreferrer"},Ua=n("strong",null,[n("code",null,"Suggester")],-1),Ba=t(`<p>根据使用场景的不同，ES 提供了以下 4 种 Suggester：</p><ul><li><strong>Term Suggester</strong> - 基于词项的纠错补全。</li><li><strong>Phrase Suggester</strong> - 基于短语的纠错补全。</li><li><strong>Completion Suggester</strong> - 自动补全单词，输入词语的前半部分，自动补全单词。</li><li><strong>Context Suggester</strong> - 基于上下文的补全提示，可以实现上下文感知推荐。</li></ul><h3 id="term-suggester" tabindex="-1"><a class="header-anchor" href="#term-suggester" aria-hidden="true">#</a> Term Suggester</h3><p>Term Suggester <strong>提供了基于单词的纠错、补全功能，其工作原理是基于编辑距离（edit distance）来运作的，编辑距离的核心思想是一个词需要改变多少个字符就可以和另一个词一致</strong>。所以如果一个词转化为原词所需要改动的字符数越少，它越有可能是最佳匹配。</p><details class="hint-container details"><summary>term suggester 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_ecommerce/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Sund&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;my_suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Sund&quot;</span>,
      <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;suggest_mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;missing&quot;</span>,
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;day_of_week&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 略</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;suggest&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;my_suggest&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sund&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;offset&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;length&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
        <span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Sunday&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;score&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
            <span class="token property">&quot;freq&quot;</span><span class="token operator">:</span> <span class="token number">614</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Term Suggester API 有很多参数，比较常用的有以下几个：</p><ul><li><strong>text</strong> - 指定了需要产生建议的文本，一般是用户的输入内容。</li><li><strong>field</strong> - 指定从文档的哪个字段中获取建议。</li><li><strong>suggest_mode</strong> - 设置建议的模式。其值有以下几个选项： <ul><li><code>missing</code> - 如果索引中存在就不进行建议，默认的选项。</li><li><code>popular</code> - 推荐出现频率更高的词。</li><li><code>always</code> - 不管是否存在，都进行建议。</li></ul></li><li><strong>analyzer</strong> - 指定分词器来对输入文本进行分词，默认与 field 指定的字段设置的分词器一致。</li><li><strong>size</strong> - 为每个单词提供的最大建议数量。</li><li><strong>sort</strong> - 建议结果排序的方式，有以下两个选项 - <ul><li><code>score</code> - 先按相似性得分排序，然后按文档频率排序，最后按词项本身（字母顺序的等）排序。</li><li><code>frequency</code> - 先按文档频率排序，然后按相似性得分排序，最后按词项本身排序。</li></ul></li></ul><h3 id="phrase-suggester" tabindex="-1"><a class="header-anchor" href="#phrase-suggester" aria-hidden="true">#</a> Phrase Suggester</h3><p><strong>Phrase Suggester 在 Term Suggester 的基础上增加了一些额外的逻辑，因为是短语形式的建议，所以会考量多个 term 间的关系，比如相邻的程度、词频等</strong>。</p><details class="hint-container details"><summary>phrase suggester 示例</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET kibana_sample_data_logs/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Firefix&quot;</span>,
    <span class="token string">&quot;simple_phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;phrase&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;agent&quot;</span>,
        <span class="token string">&quot;direct_generator&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;agent&quot;</span>,
          <span class="token string">&quot;suggest_mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;always&quot;</span>
        <span class="token punctuation">}</span> <span class="token punctuation">]</span>,
        <span class="token string">&quot;highlight&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;pre_tag&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&lt;em&gt;&quot;</span>,
          <span class="token string">&quot;post_tag&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&lt;/em&gt;&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token comment">// 略</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token comment">// 略</span>
  <span class="token property">&quot;suggest&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;simple_phrase&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;text&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Firefix&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;offset&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;length&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
        <span class="token property">&quot;options&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;text&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;firefox&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;highlighted&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&lt;em&gt;firefox&lt;/em&gt;&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;score&quot;</span> <span class="token operator">:</span> <span class="token number">0.2000096</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Phrase Suggester 可用的参数也是比较多的，下面介绍几个用得比较多的参数选项 -</p><ul><li><code>max_error</code> - 指定最多可以拼写错误的词语的个数。</li><li><code>confidence</code> - 其作用是用来控制返回结果条数的。如果用户输入的数据（短语）得分为 N，那么返回结果的得分需要大于 <code>N * confidence</code>。<code>confidence</code> 默认值为 1.0。</li><li><code>highlight</code> - 高亮被修改后的词语。</li></ul><h3 id="completion-suggester" tabindex="-1"><a class="header-anchor" href="#completion-suggester" aria-hidden="true">#</a> Completion Suggester</h3><p><strong>Completion Suggester 提供了自动补全的功能</strong>。</p>`,14),Ia=n("strong",null,"Completion Suggester 在实现的时候会将 analyze（将文本分词，并且去除没用的词语，例如 is、at 这样的词语） 后的数据进行编码，构建为 FST 并且和索引存放在一起",-1),Oa={href:"https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFinite-state_transducer",target:"_blank",rel:"noopener noreferrer"},Ma=t(`<p>在使用 Completion Suggester 前需要定义 Mapping，对应的字段需要使用 “completion” type。</p><details class="hint-container details"><summary>completion suggester 示例</summary><p>构造用于自动补全的测试数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先删除原来的索引</span>
DELETE music

<span class="token comment"># 新增 type 字段，类型为 completion，用于自动补全测试</span>
PUT music
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;completion&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 添加推荐</span>
PUT music/_doc/1?refresh
<span class="token punctuation">{</span>
  <span class="token string">&quot;suggest&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;input&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;Nevermind&quot;</span>, <span class="token string">&quot;Nirvana&quot;</span> <span class="token punctuation">]</span>,
    <span class="token string">&quot;weight&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">34</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
PUT music/_doc/1?refresh
<span class="token punctuation">{</span>
  <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;input&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nevermind&quot;</span>,
      <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">&quot;input&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nirvana&quot;</span>,
      <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取推荐：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST music/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;song-suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;nir&quot;</span>,
      <span class="token string">&quot;completion&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;suggest&quot;</span>,
        <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
        <span class="token string">&quot;skip_duplicates&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="context-suggester" tabindex="-1"><a class="header-anchor" href="#context-suggester" aria-hidden="true">#</a> Context Suggester</h3><p><strong>Context Suggester 是 Completion Suggester 的扩展，可以实现上下文感知推荐</strong>。</p><p>ES 支持两种类型的上下文：</p><ul><li><strong>Category</strong>：任意字符串的分类。</li><li><strong>Geo</strong>：地理位置信息。</li></ul><p>在使用 Context Suggester 前需要定义 Mapping，然后在数据中加入相关的 Context 信息。</p><details class="hint-container details"><summary>context suggester 示例</summary><p>构造用于 Context Suggester 的测试数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除原来的索引</span>
DELETE books_context

<span class="token comment"># 创建用于测试 Context Suggester 的索引</span>
PUT books_context
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	<span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;book_id&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
		  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;standard&quot;</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;name_completion&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;completion&quot;</span>,
		  <span class="token string">&quot;contexts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			<span class="token punctuation">{</span>
			  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;book_type&quot;</span>,
			  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;category&quot;</span>
			<span class="token punctuation">}</span>
		  <span class="token punctuation">]</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;author&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;intro&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;double&quot;</span>
		<span class="token punctuation">}</span>,
		<span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		  <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
		<span class="token punctuation">}</span>
	  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	<span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,
	<span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 导入测试数据</span>
PUT books_context/_doc/4
<span class="token punctuation">{</span>
  <span class="token string">&quot;book_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4ee82465&quot;</span>,
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Linux Programming&quot;</span>,
  <span class="token string">&quot;name_completion&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	<span class="token string">&quot;input&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Linux Programming&quot;</span><span class="token punctuation">]</span>,
	<span class="token string">&quot;contexts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	  <span class="token string">&quot;book_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;program&quot;</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;author&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Richard Stones&quot;</span>,
  <span class="token string">&quot;intro&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Happy to Linux Programming&quot;</span>,
  <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10.9</span>,
  <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-06-01&quot;</span>
<span class="token punctuation">}</span>
PUT books_context/_doc/5
<span class="token punctuation">{</span>
  <span class="token string">&quot;book_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4ee82466&quot;</span>,
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Linus Autobiography&quot;</span>,
  <span class="token string">&quot;name_completion&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	<span class="token string">&quot;input&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Linus Autobiography&quot;</span><span class="token punctuation">]</span>,
	<span class="token string">&quot;contexts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
	  <span class="token string">&quot;book_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;autobiography&quot;</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;author&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Linus&quot;</span>,
  <span class="token string">&quot;intro&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Linus Autobiography&quot;</span>,
  <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">14.9</span>,
  <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2012-06-01&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 Context Suggester 查询：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST books_context/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;my_suggest&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;linu&quot;</span>,
      <span class="token string">&quot;completion&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;name_completion&quot;</span>,
        <span class="token string">&quot;contexts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;book_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;autobiography&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,9),Qa={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"},Ra={href:"https://www.itshujia.com/read/elasticsearch/344.html",target:"_blank",rel:"noopener noreferrer"},Ha={href:"https://www.itshujia.com/read/elasticsearch/345.html",target:"_blank",rel:"noopener noreferrer"},Ja={href:"https://www.itshujia.com/read/elasticsearch/346.html",target:"_blank",rel:"noopener noreferrer"},Va={href:"https://www.itshujia.com/read/elasticsearch/347.html",target:"_blank",rel:"noopener noreferrer"},Wa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html",target:"_blank",rel:"noopener noreferrer"},Xa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/term-level-queries.html",target:"_blank",rel:"noopener noreferrer"},Ka={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html",target:"_blank",rel:"noopener noreferrer"},Ya={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html",target:"_blank",rel:"noopener noreferrer"},Za={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html",target:"_blank",rel:"noopener noreferrer"};function $a(ne,se){const a=i("ExternalLinkIcon");return o(),c("div",null,[r,p,d,n("ul",null,[n("li",null,[s("叶子查询 - 在指定字段中查找特定值，例如："),n("a",m,[v,e(a)]),s("、"),n("a",k,[b,e(a)]),s(" 和 "),n("a",h,[g,e(a)]),s("。")]),n("li",null,[s("组合查询 - 组合其他叶子查询或组合查询，用于以逻辑方式组合多个查询（例如： "),n("a",q,[_,e(a)]),s("、"),n("a",f,[y,e(a)]),s("），或更改它们的行为（例如："),n("a",w,[x,e(a)]),s("）。")])]),E,n("ul",null,[n("li",null,[n("a",T,[s("Compound（组合查询）"),e(a)])]),n("li",null,[n("a",S,[s("Term-level（词项查询）"),e(a)])]),n("li",null,[n("a",z,[s("Full text（全文查询）"),e(a)])]),n("li",null,[n("a",G,[s("Joining（联结查询）"),e(a)])]),n("li",null,[n("a",F,[s("Specialized（专用查询）"),e(a)])]),n("li",null,[n("a",P,[s("Geo（地理位置查询）"),e(a)])]),n("li",null,[n("a",L,[s("Span（跨度查询）"),e(a)])]),n("li",null,[n("a",C,[s("Vector（向量查询）"),e(a)])]),n("li",null,[n("a",A,[s("Shape（形状查询）"),e(a)])])]),N,n("p",null,[n("a",j,[s("Full Text Search（全文搜索）"),e(a)]),s(" 支持在非结构化文本数据中搜索与查询关键字最匹配的数据。")]),D,n("ul",null,[n("li",null,[n("a",U,[s("intervals"),e(a)]),s(" - 根据匹配词的顺序和近似度返回文档。")]),n("li",null,[n("a",B,[s("match"),e(a)]),s(" - "),I,s("，用于执行全文搜索的标准查询，包括模糊匹配和短语或邻近查询。")]),n("li",null,[n("a",O,[s("match_bool_prefix"),e(a)]),s(" - 对检索文本分词，并根据这些分词构造一个布尔查询。除了最后一个分词之外的每个分词都进行 term 查询。最后一个分词用于 "),M,s(" 查询；其他分词都进行 "),Q,s(" 查询。")]),n("li",null,[n("a",R,[s("match_phrase"),e(a)]),s(" - "),H,s("，短语匹配会将检索内容分词，这些词语必须全部出现在被检索内容中，并且顺序必须一致，默认情况下这些词都必须连续。")]),n("li",null,[n("a",J,[s("match_phrase_prefix"),e(a)]),s(" - 与 "),V,s(" 查询类似，但对最后一个单词执行通配符搜索。")]),n("li",null,[n("a",W,[s("multi_match"),e(a)]),s(" 支持多字段 match 查询")]),n("li",null,[n("a",X,[s("combined_fields"),e(a)]),s(" - 匹配多个字段，就像它们已索引到一个组合字段中一样。")]),n("li",null,[n("a",K,[s("query_string"),e(a)]),s(" - 支持紧凑的 Lucene "),n("a",Y,[s("query string（查询字符串）语法"),e(a)]),s("，允许指定 "),Z,s(" 条件和单个查询字符串中的多字段搜索。仅适用于专家用户。")]),n("li",null,[n("a",$,[s("simple_query_string"),e(a)]),s(" - 更简单、更健壮的 "),nn,s(" 语法版本，适合直接向用户公开。")])]),sn,n("p",null,[n("a",an,[en,e(a)]),s(" 查询用于搜索单个字段。首先，会针对检索文本进行解析（分词），分词后的任何一个词项只要被匹配，文档就会被搜到。默认情况下，相当于对分词后词项进行 or 匹配操作。")]),tn,n("ul",null,[ln,n("li",null,[n("strong",null,[n("a",on,[s("minimum_should_match"),e(a)])]),s(" 可以指定词项的最少匹配个数，其值可以指定为某个具体的数字，但因为我们无法预估检索内容的词项数量，一般将其设置为一个百分比。")])]),cn,n("p",null,[s("match 查询提供了 fuzziness 参数，"),un,s(" 允许基于被查询字段的类型进行模糊匹配。请参阅 "),n("a",rn,[s("Fuzziness"),e(a)]),s(" 的配置。")]),pn,n("p",null,[n("a",dn,[mn,e(a)]),s(" 查询首先会对检索内容进行分词，分词器可以自定义，同时文档还要满足以下两个条件才会被搜索到：")]),vn,n("p",null,[s("查询和 "),n("a",kn,[bn,e(a)]),s(" 查询类似，只不过 "),n("a",hn,[gn,e(a)]),s(" 最后一个 term 会被作为前缀匹配。")]),qn,n("p",null,[n("a",_n,[fn,e(a)]),s(" 查询允许对多个字段执行相同的匹配查询。")]),yn,n("ul",null,[n("li",null,[n("a",wn,[xn,e(a)]),s(" -（默认）将所有与查询匹配的文档作为结果返回，但是只使用评分最高的字段的评分来作为评分结果返回。")]),n("li",null,[n("a",En,[Tn,e(a)]),s(" - 将所有与查询匹配的文档作为结果返回，并将所有匹配字段的评分累加起来作为评分结果。")]),n("li",null,[n("a",Sn,[zn,e(a)]),s(" - 将具有相同分析器的字段视为一个大字段。在每个字段中查找每个单词。例如当需要查询英文人名的时候，可以将 first_name 和 last_name 两个字段组合起来当作 full_name 来查询。")]),n("li",null,[n("a",Gn,[Fn,e(a)]),s(" - 对每个字段运行 "),Pn,s(" 查询，并将最佳匹配字段的评分作为结果返回。")]),n("li",null,[n("a",Ln,[Cn,e(a)]),s(" - 对每个字段运行 "),An,s(" 查询，并将最佳匹配字段的评分作为结果返回。")]),n("li",null,[n("a",Nn,[jn,e(a)]),s(" - 在每个字段上创建一个 "),n("a",Dn,[s("match_bool_prefix"),e(a)]),s(" 查询，并且合并每个字段的评分作为评分结果。")])]),Un,n("ul",null,[n("li",null,[n("strong",null,[n("a",Bn,[s("exists"),e(a)])]),s(" - 返回在指定字段上有值的文档。")]),n("li",null,[n("strong",null,[n("a",In,[s("fuzzy"),e(a)])]),s(" - 模糊查询，返回包含与搜索词相似的词的文档。")]),n("li",null,[n("strong",null,[n("a",On,[s("ids"),e(a)])]),s(" - 根据 ID 返回文档。此查询使用存储在 "),Mn,s(" 字段中的文档 ID。")]),n("li",null,[n("strong",null,[n("a",Qn,[s("prefix"),e(a)])]),s(" - 前缀查询，用于查询某个字段中包含指定前缀的文档。")]),n("li",null,[n("strong",null,[n("a",Rn,[s("range"),e(a)])]),s(" - 范围查询，用于匹配在某一范围内的数值型、日期类型或者字符串型字段的文档。")]),n("li",null,[n("strong",null,[n("a",Hn,[s("regexp"),e(a)])]),s(" - 正则匹配查询，返回与正则表达式相匹配的词项所属的文档。")]),n("li",null,[n("strong",null,[n("a",Jn,[s("term"),e(a)])]),s(" - 用来查找指定字段中包含给定单词的文档。")]),n("li",null,[n("strong",null,[n("a",Vn,[s("terms"),e(a)])]),s(" - 与 "),n("a",Wn,[Xn,e(a)]),s(" 相似，但可以搜索多个值。")]),n("li",null,[n("strong",null,[n("a",Kn,[s("terms set"),e(a)])]),s(" - 与 "),n("a",Yn,[Zn,e(a)]),s(" 相似，但可以定义返回文档所需的匹配词数。")]),n("li",null,[n("strong",null,[n("a",$n,[s("wildcard"),e(a)])]),s(" - 通配符查询，返回与通配符模式匹配的文档。")])]),ns,n("p",null,[n("a",ss,[as,e(a)]),s(" 返回在指定字段上有值的文档。")]),es,n("p",null,[n("a",ts,[ls,e(a)]),s(" 返回包含与搜索词相似的词的文档。ES 使用 "),n("a",is,[s("Levenshtein edit distance（Levenshtein 编辑距离）"),e(a)]),s(" 测量相似度或模糊度。")]),os,n("p",null,[s("注意：如果配置了 "),n("a",cs,[us,e(a)]),s(" ，则 fuzzy query 不能执行。")]),rs,n("p",null,[n("a",ps,[ds,e(a)]),s(" 用于查询某个字段中包含指定前缀的文档。")]),ms,n("p",null,[n("a",vs,[ks,e(a)]),s(" 用于匹配在某一范围内的数值型、日期类型或者字符串型字段的文档。比如搜索哪些书籍的价格在 50 到 100 之间、哪些书籍的出版时间在 2015 年到 2019 年之间。"),bs,s("。")]),hs,n("p",null,[n("a",gs,[qs,e(a)]),s(" 返回与正则表达式相匹配的词项所属的文档。"),n("a",_s,[s("正则表达式"),e(a)]),s(" 是一种使用占位符字符匹配数据模式的方法，称为运算符。")]),n("p",null,[s("注意：如果配置了 "),n("a",fs,[ys,e(a)]),s(" ，则 "),n("a",ws,[xs,e(a)]),s(" 会被禁用。")]),Es,n("p",null,[n("a",Ts,[Ss,e(a)]),s(" 用来查找指定字段中包含给定单词的文档，term 查询不被解析，只有查询词和文档中的词精确匹配才会被搜索到，应用场景为查询人名、地名等需要精准匹配的需求。")]),zs,n("p",null,[n("a",Gs,[Fs,e(a)]),s(" 与 "),n("a",Ps,[Ls,e(a)]),s(" 相同，但可以搜索多个值。")]),Cs,n("p",null,[n("a",As,[Ns,e(a)]),s(" 即通配符查询，返回与通配符模式匹配的文档。")]),js,n("p",null,[s("注意：如果配置了 "),n("a",Ds,[Us,e(a)]),s(" ，则 "),n("a",Bs,[Is,e(a)]),s(" 会被禁用。")]),Os,n("ul",null,[n("li",null,[n("a",Ms,[Qs,e(a)]),s(" - 布尔查询，可以组合多个过滤语句来过滤文档。")]),n("li",null,[n("a",Rs,[Hs,e(a)]),s(" - 提供调整相关性打分的能力，在 "),Js,s(" 块中指定匹配文档的语句，同时降低在 "),Vs,s(" 块中也匹配的文档的得分。")]),n("li",null,[n("a",Ws,[Xs,e(a)]),s(" - 使用 "),Ks,s(" 可以将 "),Ys,s(" 转化为 "),Zs,s("，filter 可以忽略相关性算分的环节，并且 filter 可以有效利用缓存，从而提高查询的性能。")]),n("li",null,[n("a",$s,[na,e(a)]),s(" - 返回匹配了一个或者多个查询语句的文档，但只将最佳匹配的评分作为相关性算分返回。")]),n("li",null,[n("a",sa,[aa,e(a)]),s(" - 支持使用函数来修改查询返回的分数。")])]),ea,n("p",null,[n("a",ta,[la,e(a)]),s(" 查询可以把任意多个简单查询组合在一起，使用 "),ia,s("、"),oa,s("、"),ca,s("、"),ua,s(" 选项来表示简单查询之间的逻辑，每个选项都可以出现 0 次到多次，它们的含义如下：")]),ra,n("p",null,[n("a",pa,[s("boosting"),e(a)]),s(" 提供了调整相关性打分的能力。")]),da,n("p",null,[s("使用 "),n("a",ma,[va,e(a)]),s(" 可以将 "),ka,s(" 转化为 "),ba,s("，可以忽略相关性算分的环节，并且 filter 可以有效利用缓存，从而提高查询的性能。")]),ha,n("p",null,[n("a",ga,[s("dis_max"),e(a)]),s(" 查询与 bool 查询有一定联系也有一定区别，"),qa,s(" 查询支持多并发查询，可返回与任意查询条件子句匹配的任何文档类型。与 "),_a,s(" 查询可以将所有匹配查询的分数相结合使用的方式不同，"),fa,s(" 查询只使用最佳匹配查询条件的分数。")]),ya,n("p",null,[n("a",wa,[s("function_score"),e(a)]),s(" 查询可以修改查询的文档得分，这个查询在有些情况下非常有用，比如通过评分函数计算文档得分代价较高，可以改用过滤器加自定义评分函数的方式来取代传统的评分方式。")]),xa,Ea,n("ul",null,[n("li",null,[n("a",Ta,[Sa,e(a)]),s(" - 利用自定义脚本完全控制算分逻辑。")]),n("li",null,[n("a",za,[Ga,e(a)]),s(" - 为每一个文档设置一个简单且不会被规范化的权重。")]),n("li",null,[n("a",Fa,[Pa,e(a)]),s(" - 为每个用户提供一个不同的随机算分，对结果进行排序。")]),n("li",null,[n("a",La,[Ca,e(a)]),s(" - 使用文档字段的值来影响算分，例如将好评数量这个字段作为考虑因数。")]),n("li",null,[n("a",Aa,[Na,e(a)]),s(" - 衰减函数，以某个字段的值为标准，距离指定值越近，算分就越高。例如我想让书本价格越接近 10 元，算分越高排序越靠前。")])]),ja,n("p",null,[s("ES 通过 "),n("a",Da,[Ua,e(a)]),s(" 提供了推荐搜索能力，可以用于文本纠错，文本自动补全等场景。")]),Ba,n("p",null,[Ia,s("。FST（"),n("strong",null,[n("a",Oa,[s("finite-state transducer"),e(a)])]),s("）是一种高效的前缀查询索引。由于 FST 天生为前缀查询而生，所以其非常适合实现自动补全的功能。ES 会将整个 FST 加载到内存中，所以在使用 FST 进行前缀查询的时候效率是非常高效的。")]),Ma,n("ul",null,[n("li",null,[n("a",Qa,[s("极客时间教程 - Elasticsearch 核心技术与实战"),e(a)])]),n("li",null,[n("a",Ra,[s("Elasticsearch 从入门到实践之全文搜索 API 实践"),e(a)])]),n("li",null,[n("a",Ha,[s("Elasticsearch 从入门到实践之 Term Query API 实践"),e(a)])]),n("li",null,[n("a",Ja,[s("Elasticsearch 从入门到实践之组合查询"),e(a)])]),n("li",null,[n("a",Va,[s("Elasticsearch 从入门到实践之 Suggesters API"),e(a)])]),n("li",null,[n("a",Wa,[s("Elasticsearch 官方文档之全文查询"),e(a)])]),n("li",null,[n("a",Xa,[s("Elasticsearch 官方文档之词项查询"),e(a)])]),n("li",null,[n("a",Ka,[s("Elasticsearch 官方文档之组合查询"),e(a)])]),n("li",null,[n("a",Ya,[s("Elasticsearch 官方文档之推荐查询"),e(a)])]),n("li",null,[n("a",Za,[s("Elasticsearch 官方文档之查询和过滤上下文"),e(a)])])])])}const te=l(u,[["render",$a],["__file","index.html.vue"]]);export{te as default};
