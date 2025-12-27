import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as r,a as n,d as t,f as c,b as s,e}from"./app-7c7efa3d.js";const i={},u=n("h1",{id:"elasticsearch-聚合",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#elasticsearch-聚合","aria-hidden":"true"},"#"),s(" Elasticsearch 聚合")],-1),d={class:"hint-container info"},k=n("p",{class:"hint-container-title"},"概述",-1),v=n("p",null,"在数据库中，聚合是指将数据进行分组统计，得到一个汇总的结果。例如，计算总和、平均值、最大值或最小值等操作。",-1),m=n("p",null,"Elasticsearch 将聚合分为三类：",-1),g=n("thead",null,[n("tr",null,[n("th",null,"类型"),n("th",null,"说明")])],-1),q={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html",target:"_blank",rel:"noopener noreferrer"},b=n("strong",null,"Metric（指标聚合）",-1),h=n("td",null,[s("根据字段值进行"),n("strong",null,"统计"),s("计算")],-1),_={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html",target:"_blank",rel:"noopener noreferrer"},y=n("strong",null,"Bucket（桶聚合）",-1),f=n("td",null,[s("根据字段值、范围或其他条件进行"),n("strong",null,"分组")],-1),w={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html",target:"_blank",rel:"noopener noreferrer"},j=n("strong",null,"Pipeline（管道聚合）",-1),x=n("td",null,[s("对其他聚合输出的结果进行"),n("strong",null,"再次聚合")],-1),P=n("p",null,"本文将逐一介绍这几种聚合方式的用法和特性。",-1),z=e(`<h2 id="聚合的用法" tabindex="-1"><a class="header-anchor" href="#聚合的用法" aria-hidden="true">#</a> 聚合的用法</h2><p>所有的聚合，无论它们是什么类型，都遵从以下的规则。</p><ul><li>通过 JSON 来定义聚合计算，使用 <code>aggregations</code> 或 <code>aggs</code> 来标记聚合计算。需要给每个聚合起一个名字，指定它的类型以及和该类型相关的选项。</li><li>它们运行在查询的结果之上。和查询不匹配的文档不会计算在内，除非你使用 global 聚集将不匹配的文档囊括其中。</li><li>可以进一步过滤查询的结果，而不影响聚集。</li></ul><p>以下是聚合的基本结构：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;aggregations&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 最外层的聚合键，也可以缩写为 aggs --&gt;
    <span class="token property">&quot;&lt;aggregation_name&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 聚合的自定义名字 --&gt;
        <span class="token property">&quot;&lt;aggregation_type&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 聚合的类型，指标相关的，如 max、min、avg、sum，桶相关的 terms、filter 等 --&gt;
            &lt;aggregation_body&gt; &lt;!-- 聚合体：对哪些字段进行聚合，可以取字段的值，也可以是脚本计算的结果 --&gt;
        <span class="token punctuation">}</span>
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;meta&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token punctuation">[</span>&lt;meta_data_body&gt;<span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>? &lt;!-- 元 --&gt;
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;aggregations&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>&lt;sub_aggregation&gt;<span class="token punctuation">]</span>+ <span class="token punctuation">}</span> <span class="token punctuation">]</span>? &lt;!-- 在聚合里面在定义子聚合 --&gt;
    <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;&lt;aggregation_name_2&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span> <span class="token punctuation">]</span>* &lt;!-- 聚合的自定义名字 <span class="token number">2</span> --&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>在最上层有一个 aggregations 的键，可以缩写为 aggs</strong>。</li><li>在下面一层，需要为聚合指定一个名字。可以在请求的返回中看到这个名字。在同一个请求中使用多个聚合时，这一点非常有用，它让你可以很容易地理解每组结果的含义。</li><li>最后，必须要指定聚合的类型。</li></ul><blockquote><p>关于聚合分析的值来源，可以<strong>取字段的值</strong>，也可以是<strong>脚本计算的结果</strong>。</p><p>但是用脚本计算的结果时，需要注意脚本的性能和安全性；尽管多数聚集类型允许使用脚本，但是脚本使得聚集变得缓慢，因为脚本必须在每篇文档上运行。为了避免脚本的运行，可以在索引阶段进行计算。</p><p>此外，脚本也可以被人可能利用进行恶意代码攻击，尽量使用沙盒（sandbox）内的脚本语言。</p></blockquote><details class="hint-container details"><summary>【示例】根据 my-field 字段进行 terms 聚合计算</summary><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /my-index<span class="token number">-000001</span>/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;my-agg-name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-field&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应结果：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">78</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;my-agg-name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// my-agg-name 聚合计算的结果</span>
      <span class="token property">&quot;doc_count_error_upper_bound&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sum_other_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;buckets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>用于测试的数据</summary><p>为 <code>/employees</code> 索引添加测试数据：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE /employees
PUT /employees/
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;gender&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;job&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span> <span class="token operator">:</span> <span class="token number">50</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;salary&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /employees/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Emma&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Product Manager&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">35000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Underwood&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">41</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Dev Manager&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">50000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Tran&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Web Designer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">18000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;4&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Rivera&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">26</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Web Designer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">22000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;5&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Rose&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">18000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;6&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Lucy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">31</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">25000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;7&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Byrd&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">27</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">20000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;8&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Foster&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">27</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">20000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;9&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Gregory&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">22000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Bryant&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">9000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;11&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Jenny&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">36</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">38000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;12&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Mcdonald&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">31</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">32000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;13&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Jonthna&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">30000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;14&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Marshall&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">32</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">25000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;15&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;King&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">33</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">28000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;16&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Mccarthy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">16000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;17&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Goodwin&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">16000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;18&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Catherine&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">20000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;19&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Boone&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;DBA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;male&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">30000</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;20&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Kathy&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">29</span><span class="token punctuation">,</span><span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token string">&quot;DBA&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;gender&quot;</span><span class="token operator">:</span><span class="token string">&quot;female&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;salary&quot;</span><span class="token operator">:</span><span class="token number">20000</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="限定数据范围" tabindex="-1"><a class="header-anchor" href="#限定数据范围" aria-hidden="true">#</a> 限定数据范围</h3><p>ES 聚合分析的默认作用范围是 <code>query</code> 的查询结果集。</p><p>同时 ES 还支持以下方式改变聚合的作用范围：</p><ul><li><code>filter</code> - 只对当前子聚合语句生效</li><li><code>post_filter</code> - 对聚合分析后的文档进行再次过滤</li><li><code>global</code> - 无视 query，对全部文档进行统计</li></ul><details class="hint-container details"><summary>【示例】使用 query 限定聚合数据的范围</summary><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">20</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>【示例】使用 filter 限定聚合数据的范围</summary><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;older_person&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;range&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">35</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
         <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
           <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;all_jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="控制返回聚合结果" tabindex="-1"><a class="header-anchor" href="#控制返回聚合结果" aria-hidden="true">#</a> 控制返回聚合结果</h3><details class="hint-container details"><summary>【示例】仅返回聚合结果</summary><p>使用 <code>field</code> 限定聚合返回的展示字段：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 找出所有的 job 类型，还能找到聚合后符合条件的结果</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;post_filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;job.keyword&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Dev Manager&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，包含聚合的搜索会同时返回搜索命中和聚合结果。要仅返回聚合结果，请将 <code>size</code> 设置为 <code>0</code>：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="聚合结果排序" tabindex="-1"><a class="header-anchor" href="#聚合结果排序" aria-hidden="true">#</a> 聚合结果排序</h3><details class="hint-container details"><summary>【示例】聚合结果排序</summary><p>指定 <code>order</code>，按照 <code>_count</code> 和 <code>_key</code> 进行排序。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">20</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;_count&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;stats_salary.min&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;stats_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="运行多个聚合" tabindex="-1"><a class="header-anchor" href="#运行多个聚合" aria-hidden="true">#</a> 运行多个聚合</h3><details class="hint-container details"><summary>【示例】运行多个聚合</summary><p>可以在同一请求中指定多个聚合：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">40</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>

      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token property">&quot;all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;global&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;salary_avg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="运行子聚合" tabindex="-1"><a class="header-anchor" href="#运行子聚合" aria-hidden="true">#</a> 运行子聚合</h3>`,22),T={class:"hint-container details"},S=n("summary",null,"【示例】运行子聚合",-1),O={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html",target:"_blank",rel:"noopener noreferrer"},E=e(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;min_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应将子聚合结果嵌套在其父聚合下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;doc_count_error_upper_bound&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;sum_other_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
      <span class="token property">&quot;buckets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Java Programmer&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
          <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">25571.428571428572</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
          <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">19250.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;QA&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
          <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">21000.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary_by_job&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">19250.0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;keys&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Javascript Programmer&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),J=n("h2",{id:"metric-指标聚合",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#metric-指标聚合","aria-hidden":"true"},"#"),s(" Metric（指标聚合）")],-1),M=n("p",null,"指标聚合主要从不同文档的分组中提取统计数据，或者，从来自其他聚合的文档桶来提取统计数据。",-1),B=n("p",null,"这些统计数据通常来自数值型字段，如最小或者平均价格。用户可以单独获取每项统计数据，或者也可以使用 stats 聚合来同时获取它们。更高级的统计数据，如平方和或者是标准差，可以通过 extended stats 聚合来获取。",-1),L=n("p",null,"ES 支持的指标聚合类型：",-1),A=n("thead",null,[n("tr",null,[n("th",null,"类型"),n("th",null,"说明")])],-1),D={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html",target:"_blank",rel:"noopener noreferrer"},N=n("td",null,"平均值聚合",-1),Q={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-boxplot-aggregation.html",target:"_blank",rel:"noopener noreferrer"},V=n("td",null,"箱线图聚合",-1),C={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html",target:"_blank",rel:"noopener noreferrer"},F=n("td",null,"近似计算非重复值",-1),I={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-extendedstats-aggregation.html",target:"_blank",rel:"noopener noreferrer"},U=n("td",null,"扩展统计聚合",-1),G={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html",target:"_blank",rel:"noopener noreferrer"},H=n("td",null,"地理边界聚合",-1),R={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html",target:"_blank",rel:"noopener noreferrer"},K=n("td",null,"根据* geo *字段的所有坐标值计算加权质心",-1),W={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geo-line.html",target:"_blank",rel:"noopener noreferrer"},X=n("td",null,"根据地理数据生成可用于线性几何图形展示的数据",-1),Y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cartesian-bounds-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Z=n("td",null,"笛卡尔积边界聚合",-1),$={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cartesian-centroid-aggregation.html",target:"_blank",rel:"noopener noreferrer"},nn=n("td",null,"计算所有坐标值加权质心",-1),sn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-matrix-stats-aggregation.html",target:"_blank",rel:"noopener noreferrer"},an=n("td",null,"矩阵统计聚合",-1),tn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html",target:"_blank",rel:"noopener noreferrer"},en=n("td",null,"最大值聚合",-1),on={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-median-absolute-deviation-aggregation.html",target:"_blank",rel:"noopener noreferrer"},pn=n("td",null,"中位数绝对偏差聚合",-1),ln={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html",target:"_blank",rel:"noopener noreferrer"},rn=n("td",null,"最小值聚合",-1),cn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html",target:"_blank",rel:"noopener noreferrer"},un=n("td",null,"百分位排名聚合",-1),dn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html",target:"_blank",rel:"noopener noreferrer"},kn=n("td",null,"百分位聚合",-1),vn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-rate-aggregation.html",target:"_blank",rel:"noopener noreferrer"},mn=n("td",null,"频率聚合",-1),gn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html",target:"_blank",rel:"noopener noreferrer"},qn=n("td",null,"脚本化指标聚合",-1),bn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html",target:"_blank",rel:"noopener noreferrer"},hn=n("td",null,"统计聚合",-1),_n={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-string-stats-aggregation.html",target:"_blank",rel:"noopener noreferrer"},yn=n("td",null,"字符串统计聚合",-1),fn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html",target:"_blank",rel:"noopener noreferrer"},wn=n("td",null,"求和聚合",-1),jn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-ttest-aggregation.html",target:"_blank",rel:"noopener noreferrer"},xn=n("td",null,"校验聚合",-1),Pn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html",target:"_blank",rel:"noopener noreferrer"},zn=n("td",null,"热门点击统计",-1),Tn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-metrics.html",target:"_blank",rel:"noopener noreferrer"},Sn=n("td",null,"热门指标聚合",-1),On={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html",target:"_blank",rel:"noopener noreferrer"},En=n("td",null,"值统计聚合",-1),Jn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-weight-avg-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Mn=n("td",null,"加权平均值聚合",-1),Bn=e(`<details class="hint-container details"><summary>【示例】指标聚合示例</summary><p>Metric 聚合测试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// Metric 聚合，找到最低的工资</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;min_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Metric 聚合，找到最高的工资</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;max_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 多个 Metric 聚合，找到最低最高和平均工资</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;max_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 一个聚合，输出多值</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;stats_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="bucket-桶聚合" tabindex="-1"><a class="header-anchor" href="#bucket-桶聚合" aria-hidden="true">#</a> Bucket（桶聚合）</h2><p>桶聚合不会像指标聚合那样计算字段的指标，而是创建文档桶。每个桶都与一个标准（取决于聚合类型）相关联，该标准确定当前上下文中的文档是否“落入”其中。换句话说，桶有效地定义了文档集。除了桶本身之外，<code>桶</code>聚合还计算并返回“落入”每个桶的文档数。</p><p>与<code>指标</code>聚合相反，桶聚合可以保存子聚合。这些子聚合将针对其 “父” 桶聚合创建的桶进行聚合。</p><p>Elasticsearch 中支持的桶聚合类型：</p>`,5),Ln=n("thead",null,[n("tr",null,[n("th",null,"类型"),n("th",null,"说明")])],-1),An={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-adjacency-matrix-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Dn=n("td",null,"邻接矩阵聚合",-1),Nn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-autodatehistogram-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Qn=n("td",null,"自动间隔日期直方图聚合",-1),Vn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-categorize-text-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Cn=n("td",null,"对文本进行分类聚合",-1),Fn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html",target:"_blank",rel:"noopener noreferrer"},In=n("td",null,"子文档聚合",-1),Un={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Gn=n("td",null,"组合聚合",-1),Hn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Rn=n("td",null,"日期直方图聚合",-1),Kn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Wn=n("td",null,"日期范围聚合",-1),Xn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Yn=n("td",null,"多种采样器聚合",-1),Zn={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html",target:"_blank",rel:"noopener noreferrer"},$n=n("td",null,"过滤器聚合",-1),ns={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filters-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ss=n("td",null,"多过滤器聚合",-1),as={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ts=n("td",null,"地理距离聚合",-1),es={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html",target:"_blank",rel:"noopener noreferrer"},os=n("td",null,"geohash 网格",-1),ps={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohexgrid-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ls=n("td",null,"geohex 网格",-1),rs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html",target:"_blank",rel:"noopener noreferrer"},cs=n("td",null,"geotile 网格",-1),is={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html",target:"_blank",rel:"noopener noreferrer"},us=n("td",null,"全局聚合",-1),ds={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ks=n("td",null,"直方图聚合",-1),vs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-ipprefix-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ms=n("td",null,"IP 前缀聚合",-1),gs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-iprange-aggregation.html",target:"_blank",rel:"noopener noreferrer"},qs=n("td",null,"IP 范围聚合",-1),bs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html",target:"_blank",rel:"noopener noreferrer"},hs=n("td",null,"空值聚合",-1),_s={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-multi-terms-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ys=n("td",null,"多词项分组聚合",-1),fs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ws=n("td",null,"嵌套聚合",-1),js={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-parent-aggregation.html",target:"_blank",rel:"noopener noreferrer"},xs=n("td",null,"父文档聚合",-1),Ps={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-random-sampler-aggregation.html",target:"_blank",rel:"noopener noreferrer"},zs=n("td",null,"随机采样器聚合",-1),Ts={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ss=n("td",null,"范围聚合",-1),Os={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-rare-terms-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Es=n("td",null,"稀有多词项聚合",-1),Js={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ms=n("td",null,"反向嵌套聚合",-1),Bs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-sampler-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ls=n("td",null,"采样器聚合",-1),As={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ds=n("td",null,"重要词项聚合",-1),Ns={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significanttext-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Qs=n("td",null,"重要文本聚合",-1),Vs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Cs=n("td",null,"词项分组聚合",-1),Fs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-time-series-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Is=n("td",null,"时间序列聚合",-1),Us={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-variablewidthhistogram-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Gs=n("td",null,"可变宽度直方图聚合",-1),Hs=e(`<details class="hint-container details"><summary>【示例】terms 聚合查询</summary><p>默认，ES 不允许对 Text 字段进行 terms 聚合查询</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 对 keword 进行聚合</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对 Text 字段进行 terms 聚合查询，失败</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对 Text 字段打开 fielddata，支持 terms aggregation</span>
PUT employees/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
       <span class="token property">&quot;type&quot;</span><span class="token operator">:</span>     <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
       <span class="token property">&quot;fielddata&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对 Text 字段进行 terms 分词。分词后的 terms</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>【示例】更多 Bucket 聚合示例</summary><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 对 job 进行近似去重统计</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cardinate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;cardinality&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对 gender 进行聚合</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;gender&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;gender&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 指定 bucket 的 size</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ages_5&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">3</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 指定 size，不同工种中，年纪最大的 3 个员工的具体信息</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;old_employee&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;top_hits&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
            <span class="token property">&quot;size&quot;</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
                  <span class="token property">&quot;order&quot;</span><span class="token operator">:</span><span class="token string">&quot;desc&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Salary Ranges 分桶，可以自己定义 key</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;salary_range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ranges&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span><span class="token number">10000</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">10000</span><span class="token punctuation">,</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span><span class="token number">20000</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;key&quot;</span><span class="token operator">:</span><span class="token string">&quot;&gt;20000&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span><span class="token number">20000</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Salary Histogram, 工资 0 到 10 万，以 5000 一个区间进行分桶</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;salary_histrogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span><span class="token string">&quot;salary&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span><span class="token number">5000</span><span class="token punctuation">,</span>
        <span class="token property">&quot;extended_bounds&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;min&quot;</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token property">&quot;max&quot;</span><span class="token operator">:</span><span class="token number">100000</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 嵌套聚合 1，按照工作类型分桶，并统计工资信息</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Job_salary_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 多次嵌套。根据工作类型分桶，然后按照性别分桶，计算工资的统计信息</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;Job_gender_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gender_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;gender&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;salary_stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;stats&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="pipeline-管道聚合" tabindex="-1"><a class="header-anchor" href="#pipeline-管道聚合" aria-hidden="true">#</a> Pipeline（管道聚合）</h2><p>管道聚合处理从其他聚合而不是文档集生成的输出，从而将信息添加到输出树中。</p><p>Pipeline 聚合的分析结果会输出到原结果中，根据位置的不同，分为两类：</p>`,5),Rs=n("strong",null,"sibling",-1),Ks={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-max-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ws={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-min-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Xs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ys={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-sum-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Zs={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},$s={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-extended-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},na={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},sa=n("strong",null,"parent",-1),aa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ta={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ea={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html",target:"_blank",rel:"noopener noreferrer"},oa=n("p",null,[s("管道聚合可以通过使用 "),n("code",null,"buckets_path"),s(" 参数来指示所需指标的路径，从而引用执行计算所需的聚合。管道聚合不能具有子聚合，但根据类型，它可以引用"),n("code",null,"buckets_path"),s("中的另一个管道，从而允许链接管道聚合。")],-1),pa=n("p",null,"以下为 Elasticsearch 支持的管道聚合类型：",-1),la=n("thead",null,[n("tr",null,[n("th",null,"类型"),n("th",null,"说明")])],-1),ra={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ca=n("td",null,"平均桶",-1),ia={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ua=n("td",null,"桶脚本",-1),da={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-count-ks-test-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ka=n("td",null,"桶数 k-s 测试",-1),va={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-correlation-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ma=n("td",null,"桶关联",-1),ga={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-selector-aggregation.html",target:"_blank",rel:"noopener noreferrer"},qa=n("td",null,"桶选择器",-1),ba={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ha=n("td",null,"桶排序",-1),_a={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-change-point-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ya=n("td",null,"更改点",-1),fa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-cardinality-aggregation.html",target:"_blank",rel:"noopener noreferrer"},wa=n("td",null,"累积基数",-1),ja={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html",target:"_blank",rel:"noopener noreferrer"},xa=n("td",null,"累计总和",-1),Pa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html",target:"_blank",rel:"noopener noreferrer"},za=n("td",null,"导数",-1),Ta={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-extended-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Sa=n("td",null,"扩展的统计信息桶",-1),Oa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-inference-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ea=n("td",null,"推理桶",-1),Ja={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-max-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ma=n("td",null,"最大桶",-1),Ba={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-min-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},La=n("td",null,"最小桶",-1),Aa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Da=n("td",null,"移动功能",-1),Na={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-moving-percentiles-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Qa=n("td",null,"移动百分位数",-1),Va={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-normalize-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ca=n("td",null,"正常化",-1),Fa={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ia=n("td",null,"百分位数桶",-1),Ua={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ga=n("td",null,"序列差分",-1),Ha={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Ra=n("td",null,"统计桶",-1),Ka={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-sum-bucket-aggregation.html",target:"_blank",rel:"noopener noreferrer"},Wa=n("td",null,"总和桶",-1),Xa=e(`<details class="hint-container details"><summary>【示例】Pipeline 聚合示例</summary><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 平均工资最低的工作类型</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;min_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;min_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 平均工资最高的工作类型</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;max_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 平均工资的平均工资</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avg_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;avg_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 平均工资的统计分析</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stats_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;stats_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 平均工资的百分位数</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;jobs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;job.keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;percentiles_salary_by_job&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;percentiles_bucket&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jobs&gt;avg_salary&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 按照年龄对平均工资求导</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;min_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;derivative_avg_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;derivative&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avg_salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Cumulative_sum</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;min_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;cumulative_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;cumulative_sum&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avg_salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Moving Function</span>
POST /employees/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;min_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;avg_salary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;salary&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;moving_avg_salary&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token property">&quot;moving_fn&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;buckets_path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avg_salary&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;window&quot;</span><span class="token operator">:</span><span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MovingFunctions.min(values)&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="聚合的执行流程" tabindex="-1"><a class="header-anchor" href="#聚合的执行流程" aria-hidden="true">#</a> 聚合的执行流程</h2><p>在 ES 中，不仅仅是普通搜索，相关性计算（评分）和聚合计算也是先在每个 shard 的本地进行计算，再由 coordinate node 进行汇总。由于分片的本地计算是独立的，只能基于数据子集来进行计算，所以难免出现数据偏差。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202412012144894.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202412012145912.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>要解决聚合准确性问题，有两个解决方案：</p>`,6),Ya=n("li",null,[s("解决方案 1：当数据量不大的情况下，"),n("strong",null,"设置主分片数为 1"),s("，这意味着在数据全集上进行聚合。但这种方案不太现实。")],-1),Za={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html#search-aggregations-bucket-terms-aggregation-shard-size",target:"_blank",rel:"noopener noreferrer"},$a=n("code",null,"shard_size",-1),nt=n("strong",null,"牺牲整体性能，提高精准度",-1),st=n("code",null,"size * 1.5 + 10",-1),at=n("h2",{id:"faq",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#faq","aria-hidden":"true"},"#"),s(" FAQ")],-1),tt=n("h3",{id:"如何对海量数据-过亿-进行聚合计算",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#如何对海量数据-过亿-进行聚合计算","aria-hidden":"true"},"#"),s(" 如何对海量数据（过亿）进行聚合计算？")],-1),et={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html",target:"_blank",rel:"noopener noreferrer"},ot=n("code",null,"cardinality",-1),pt=n("h2",{id:"参考资料",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考资料","aria-hidden":"true"},"#"),s(" 参考资料")],-1),lt={href:"https://time.geekbang.org/course/detail/100030501-102659",target:"_blank",rel:"noopener noreferrer"},rt={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html",target:"_blank",rel:"noopener noreferrer"},ct={href:"https://www.itshujia.com/read/elasticsearch/348.html",target:"_blank",rel:"noopener noreferrer"};function it(ut,dt){const a=p("ExternalLinkIcon");return l(),r("div",null,[u,n("div",d,[k,v,m,n("table",null,[g,n("tbody",null,[n("tr",null,[n("td",null,[n("a",q,[b,t(a)])]),h]),n("tr",null,[n("td",null,[n("a",_,[y,t(a)])]),f]),n("tr",null,[n("td",null,[n("a",w,[j,t(a)])]),x])])]),P]),c(" more "),z,n("details",T,[S,n("p",null,[s("Bucket 聚合支持 Bucket 或 Metric 子聚合。例如，具有 "),n("a",O,[s("avg"),t(a)]),s(" 子聚合的 terms 聚合会计算每个桶中文档的平均值。嵌套子聚合没有级别或深度限制。")]),E]),J,M,B,L,n("table",null,[A,n("tbody",null,[n("tr",null,[n("td",null,[n("a",D,[s("avg"),t(a)])]),N]),n("tr",null,[n("td",null,[n("a",Q,[s("boxplot"),t(a)])]),V]),n("tr",null,[n("td",null,[n("a",C,[s("cardinality"),t(a)])]),F]),n("tr",null,[n("td",null,[n("a",I,[s("extended_stats"),t(a)])]),U]),n("tr",null,[n("td",null,[n("a",G,[s("geo_bounds"),t(a)])]),H]),n("tr",null,[n("td",null,[n("a",R,[s("geo_centroid"),t(a)])]),K]),n("tr",null,[n("td",null,[n("a",W,[s("geo_line_geo_line"),t(a)])]),X]),n("tr",null,[n("td",null,[n("a",Y,[s("cartesian_bounds"),t(a)])]),Z]),n("tr",null,[n("td",null,[n("a",$,[s("cartesian_centroid"),t(a)])]),nn]),n("tr",null,[n("td",null,[n("a",sn,[s("matrix_stats"),t(a)])]),an]),n("tr",null,[n("td",null,[n("a",tn,[s("max"),t(a)])]),en]),n("tr",null,[n("td",null,[n("a",on,[s("median_absolute_deviation"),t(a)])]),pn]),n("tr",null,[n("td",null,[n("a",ln,[s("min"),t(a)])]),rn]),n("tr",null,[n("td",null,[n("a",cn,[s("percentile_ranks"),t(a)])]),un]),n("tr",null,[n("td",null,[n("a",dn,[s("percentiles"),t(a)])]),kn]),n("tr",null,[n("td",null,[n("a",vn,[s("rate"),t(a)])]),mn]),n("tr",null,[n("td",null,[n("a",gn,[s("scripted_metric"),t(a)])]),qn]),n("tr",null,[n("td",null,[n("a",bn,[s("stats"),t(a)])]),hn]),n("tr",null,[n("td",null,[n("a",_n,[s("string_stats"),t(a)])]),yn]),n("tr",null,[n("td",null,[n("a",fn,[s("sum"),t(a)])]),wn]),n("tr",null,[n("td",null,[n("a",jn,[s("t_test"),t(a)])]),xn]),n("tr",null,[n("td",null,[n("a",Pn,[s("top_hits"),t(a)])]),zn]),n("tr",null,[n("td",null,[n("a",Tn,[s("top_metrics"),t(a)])]),Sn]),n("tr",null,[n("td",null,[n("a",On,[s("value_count"),t(a)])]),En]),n("tr",null,[n("td",null,[n("a",Jn,[s("weighted_avg"),t(a)])]),Mn])])]),Bn,n("table",null,[Ln,n("tbody",null,[n("tr",null,[n("td",null,[n("a",An,[s("adjacency_matrix"),t(a)])]),Dn]),n("tr",null,[n("td",null,[n("a",Nn,[s("auto_interval_date_histogram"),t(a)])]),Qn]),n("tr",null,[n("td",null,[n("a",Vn,[s("categorize_text"),t(a)])]),Cn]),n("tr",null,[n("td",null,[n("a",Fn,[s("children"),t(a)])]),In]),n("tr",null,[n("td",null,[n("a",Un,[s("composite"),t(a)])]),Gn]),n("tr",null,[n("td",null,[n("a",Hn,[s("date_histogram"),t(a)])]),Rn]),n("tr",null,[n("td",null,[n("a",Kn,[s("date_range"),t(a)])]),Wn]),n("tr",null,[n("td",null,[n("a",Xn,[s("diversified_sampler"),t(a)])]),Yn]),n("tr",null,[n("td",null,[n("a",Zn,[s("filter"),t(a)])]),$n]),n("tr",null,[n("td",null,[n("a",ns,[s("filters"),t(a)])]),ss]),n("tr",null,[n("td",null,[n("a",as,[s("geo_distance"),t(a)])]),ts]),n("tr",null,[n("td",null,[n("a",es,[s("geohash_grid"),t(a)])]),os]),n("tr",null,[n("td",null,[n("a",ps,[s("geohex_grid"),t(a)])]),ls]),n("tr",null,[n("td",null,[n("a",rs,[s("geotile_grid"),t(a)])]),cs]),n("tr",null,[n("td",null,[n("a",is,[s("global"),t(a)])]),us]),n("tr",null,[n("td",null,[n("a",ds,[s("histogram"),t(a)])]),ks]),n("tr",null,[n("td",null,[n("a",vs,[s("ip_prefix"),t(a)])]),ms]),n("tr",null,[n("td",null,[n("a",gs,[s("ip_range"),t(a)])]),qs]),n("tr",null,[n("td",null,[n("a",bs,[s("missing"),t(a)])]),hs]),n("tr",null,[n("td",null,[n("a",_s,[s("multi_terms"),t(a)])]),ys]),n("tr",null,[n("td",null,[n("a",fs,[s("nested"),t(a)])]),ws]),n("tr",null,[n("td",null,[n("a",js,[s("parent"),t(a)])]),xs]),n("tr",null,[n("td",null,[n("a",Ps,[s("random_sampler"),t(a)])]),zs]),n("tr",null,[n("td",null,[n("a",Ts,[s("range"),t(a)])]),Ss]),n("tr",null,[n("td",null,[n("a",Os,[s("rare_terms"),t(a)])]),Es]),n("tr",null,[n("td",null,[n("a",Js,[s("reverse_nested"),t(a)])]),Ms]),n("tr",null,[n("td",null,[n("a",Bs,[s("sampler"),t(a)])]),Ls]),n("tr",null,[n("td",null,[n("a",As,[s("significant_terms"),t(a)])]),Ds]),n("tr",null,[n("td",null,[n("a",Ns,[s("significant_text"),t(a)])]),Qs]),n("tr",null,[n("td",null,[n("a",Vs,[s("terms"),t(a)])]),Cs]),n("tr",null,[n("td",null,[n("a",Fs,[s("time_series"),t(a)])]),Is]),n("tr",null,[n("td",null,[n("a",Us,[s("variable_width_histogram"),t(a)])]),Gs])])]),Hs,n("ul",null,[n("li",null,[Rs,s(" - 结果和现有分析结果同级。例如："),n("a",Ks,[s("max_bucket"),t(a)]),s("、"),n("a",Ws,[s("min_bucket"),t(a)]),s("、"),n("a",Xs,[s("avg_bucket"),t(a)]),s("、"),n("a",Ys,[s("sum_bucket"),t(a)]),s("、"),n("a",Zs,[s("stats_bucket"),t(a)]),s("、"),n("a",$s,[s("extended_stats_bucket"),t(a)]),s("、"),n("a",na,[s("percentiles_bucket"),t(a)]),s("。")]),n("li",null,[sa,s(" - 结果内嵌到现有的聚合分析结果中。例如："),n("a",aa,[s("derivative"),t(a)]),s("、"),n("a",ta,[s("cumulative_sum"),t(a)]),s("、"),n("a",ea,[s("moving_function"),t(a)]),s("。")])]),oa,pa,n("table",null,[la,n("tbody",null,[n("tr",null,[n("td",null,[n("a",ra,[s("avg_bucket"),t(a)])]),ca]),n("tr",null,[n("td",null,[n("a",ia,[s("bucket_script"),t(a)])]),ua]),n("tr",null,[n("td",null,[n("a",da,[s("bucket_count_ks_test"),t(a)])]),ka]),n("tr",null,[n("td",null,[n("a",va,[s("bucket_correlation"),t(a)])]),ma]),n("tr",null,[n("td",null,[n("a",ga,[s("bucket_selector"),t(a)])]),qa]),n("tr",null,[n("td",null,[n("a",ba,[s("bucket_sort"),t(a)])]),ha]),n("tr",null,[n("td",null,[n("a",_a,[s("change_point"),t(a)])]),ya]),n("tr",null,[n("td",null,[n("a",fa,[s("cumulative_cardinality"),t(a)])]),wa]),n("tr",null,[n("td",null,[n("a",ja,[s("cumulative_sum"),t(a)])]),xa]),n("tr",null,[n("td",null,[n("a",Pa,[s("derivative"),t(a)])]),za]),n("tr",null,[n("td",null,[n("a",Ta,[s("extended_stats_bucket"),t(a)])]),Sa]),n("tr",null,[n("td",null,[n("a",Oa,[s("inference_bucket"),t(a)])]),Ea]),n("tr",null,[n("td",null,[n("a",Ja,[s("max_bucket"),t(a)])]),Ma]),n("tr",null,[n("td",null,[n("a",Ba,[s("min_bucket"),t(a)])]),La]),n("tr",null,[n("td",null,[n("a",Aa,[s("moving_function"),t(a)])]),Da]),n("tr",null,[n("td",null,[n("a",Na,[s("moving_percentiles"),t(a)])]),Qa]),n("tr",null,[n("td",null,[n("a",Va,[s("normalize"),t(a)])]),Ca]),n("tr",null,[n("td",null,[n("a",Fa,[s("percentiles_bucket"),t(a)])]),Ia]),n("tr",null,[n("td",null,[n("a",Ua,[s("serial_differencing"),t(a)])]),Ga]),n("tr",null,[n("td",null,[n("a",Ha,[s("stats_bucket"),t(a)])]),Ra]),n("tr",null,[n("td",null,[n("a",Ka,[s("sum_bucket"),t(a)])]),Wa])])]),Xa,n("ul",null,[Ya,n("li",null,[s("解决方案 2："),n("strong",null,[s("设置 "),n("a",Za,[$a,t(a)]),s(" 参数")]),s("，将计算数据范围变大，"),nt,s("。shard_size 的默认值是 "),st,s("。")])]),at,tt,n("p",null,[s("Elasticsearch 支持 "),n("a",et,[ot,s("（近似计算非重复值）"),t(a)]),s(" 。它提供一个字段的基数，即该字段的 distinct 或者 unique 值的数目。它是基于 HLL 算法的。HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。")]),pt,n("ul",null,[n("li",null,[n("a",lt,[s("极客时间教程 - Elasticsearch 核心技术与实战"),t(a)])]),n("li",null,[n("a",rt,[s("Elasticsearch 官方文档之聚合"),t(a)])]),n("li",null,[n("a",ct,[s("Elasticsearch 从入门到实践之聚合"),t(a)])])])])}const mt=o(i,[["render",it],["__file","index.html.vue"]]);export{mt as default};
