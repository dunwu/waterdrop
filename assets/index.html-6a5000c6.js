import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as u,a as n,b as e,d as s,e as a}from"./app-198b997f.js";const r={},v=a(`<h1 id="elasticsearch-聚合" tabindex="-1"><a class="header-anchor" href="#elasticsearch-聚合" aria-hidden="true">#</a> Elasticsearch 聚合</h1><p>Elasticsearch 是一个分布式的全文搜索引擎，索引和搜索是 Elasticsearch 的基本功能。事实上，Elasticsearch 的聚合（Aggregations）功能也十分强大，允许在数据上做复杂的分析统计。Elasticsearch 提供的聚合分析功能主要有<strong>指标聚合(metrics aggregations)</strong>、<strong>桶聚合(bucket aggregations)</strong>、<strong>管道聚合(pipeline aggregations)</strong> 和 <strong>矩阵聚合(matrix aggregations)</strong> 四大类，管道聚合和矩阵聚合官方说明是在试验阶段，后期会完全更改或者移除，这里不再对管道聚合和矩阵聚合进行讲解。</p><h2 id="聚合的具体结构" tabindex="-1"><a class="header-anchor" href="#聚合的具体结构" aria-hidden="true">#</a> 聚合的具体结构</h2><p>所有的聚合，无论它们是什么类型，都遵从以下的规则。</p><ul><li>使用查询中同样的 JSON 请求来定义它们，而且你是使用键 aggregations 或者是 aggs 来进行标记。需要给每个聚合起一个名字，指定它的类型以及和该类型相关的选项。</li><li>它们运行在查询的结果之上。和查询不匹配的文档不会计算在内，除非你使用 global 聚集将不匹配的文档囊括其中。</li><li>可以进一步过滤查询的结果，而不影响聚集。</li></ul><p>以下是聚合的基本结构：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;aggregations&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 最外层的聚合键，也可以缩写为 aggs --&gt;
    <span class="token property">&quot;&lt;aggregation_name&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 聚合的自定义名字 --&gt;
        <span class="token property">&quot;&lt;aggregation_type&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> &lt;!-- 聚合的类型，指标相关的，如 max、min、avg、sum，桶相关的 terms、filter 等 --&gt;
            &lt;aggregation_body&gt; &lt;!-- 聚合体：对哪些字段进行聚合，可以取字段的值，也可以是脚本计算的结果 --&gt;
        <span class="token punctuation">}</span>
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;meta&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token punctuation">[</span>&lt;meta_data_body&gt;<span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>? &lt;!-- 元 --&gt;
        <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;aggregations&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>&lt;sub_aggregation&gt;<span class="token punctuation">]</span>+ <span class="token punctuation">}</span> <span class="token punctuation">]</span>? &lt;!-- 在聚合里面在定义子聚合 --&gt;
    <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token property">&quot;&lt;aggregation_name_2&gt;&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span> <span class="token punctuation">]</span>* &lt;!-- 聚合的自定义名字 <span class="token number">2</span> --&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>在最上层有一个 aggregations 的键，可以缩写为 aggs</strong>。</li><li>在下面一层，需要为聚合指定一个名字。可以在请求的返回中看到这个名字。在同一个请求中使用多个聚合时，这一点非常有用，它让你可以很容易地理解每组结果的含义。</li><li>最后，必须要指定聚合的类型。</li></ul><blockquote><p>关于聚合分析的值来源，可以<strong>取字段的值</strong>，也可以是<strong>脚本计算的结果</strong>。</p><p>但是用脚本计算的结果时，需要注意脚本的性能和安全性；尽管多数聚集类型允许使用脚本，但是脚本使得聚集变得缓慢，因为脚本必须在每篇文档上运行。为了避免脚本的运行，可以在索引阶段进行计算。</p><p>此外，脚本也可以被人可能利用进行恶意代码攻击，尽量使用沙盒（sandbox）内的脚本语言。</p></blockquote><p>示例：查询所有球员的平均年龄是多少，并对球员的平均薪水加 188（也可以理解为每名球员加 188 后的平均薪水）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /player/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;avg_age&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;age&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;avg_salary_188&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;doc.salary.value + 188&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="指标聚合" tabindex="-1"><a class="header-anchor" href="#指标聚合" aria-hidden="true">#</a> 指标聚合</h2><p>指标聚合（又称度量聚合）主要从不同文档的分组中提取统计数据，或者，从来自其他聚合的文档桶来提取统计数据。</p><p>这些统计数据通常来自数值型字段，如最小或者平均价格。用户可以单独获取每项统计数据，或者也可以使用 stats 聚合来同时获取它们。更高级的统计数据，如平方和或者是标准差，可以通过 extended stats 聚合来获取。</p><h3 id="max-aggregation" tabindex="-1"><a class="header-anchor" href="#max-aggregation" aria-hidden="true">#</a> Max Aggregation</h3><p>Max Aggregation 用于最大值统计。例如，统计 sales 索引中价格最高的是哪本书，并且计算出对应的价格的 2 倍值，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /sales/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;max_price&quot; : {
      &quot;max&quot; : {
        &quot;field&quot; : &quot;price&quot;
      }
    },
    &quot;max_price_2&quot; : {
      &quot;max&quot; : {
        &quot;field&quot; : &quot;price&quot;,
        &quot;script&quot;: {
          &quot;source&quot;: &quot;_value * 2.0&quot;
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指定的 field，在脚本中可以用 _value 取字段的值</strong>。</p><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;max_price&quot;: {
      &quot;value&quot;: 188.0
    },
    &quot;max_price_2&quot;: {
      &quot;value&quot;: 376.0
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="min-aggregation" tabindex="-1"><a class="header-anchor" href="#min-aggregation" aria-hidden="true">#</a> Min Aggregation</h3><p>Min Aggregation 用于最小值统计。例如，统计 sales 索引中价格最低的是哪本书，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /sales/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;min_price&quot; : {
      &quot;min&quot; : {
        &quot;field&quot; : &quot;price&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;min_price&quot;: {
      &quot;value&quot;: 18.0
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="avg-aggregation" tabindex="-1"><a class="header-anchor" href="#avg-aggregation" aria-hidden="true">#</a> Avg Aggregation</h3><p>Avg Aggregation 用于计算平均值。例如，统计 exams 索引中考试的平均分数，如未存在分数，默认为 60 分，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /exams/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;avg_grade&quot; : {
      &quot;avg&quot; : {
        &quot;field&quot; : &quot;grade&quot;,
        &quot;missing&quot;: 60
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果指定字段没有值，可以通过 missing 指定默认值；若未指定默认值，缺失该字段值的文档将被忽略（计算）</strong>。</p><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;avg_grade&quot;: {
      &quot;value&quot;: 78.0
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),o={href:"https://www.knowledgedict.com/tutorial/elasticsearch-aggregations-metrics-weighted-avg-aggregation.html",target:"_blank",rel:"noopener noreferrer"},c=a(`<h3 id="sum-aggregation" tabindex="-1"><a class="header-anchor" href="#sum-aggregation" aria-hidden="true">#</a> Sum Aggregation</h3><p>Sum Aggregation 用于计算总和。例如，统计 sales 索引中 type 字段中匹配 hat 的价格总和，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /exams/_search?size=0
{
  &quot;query&quot; : {
    &quot;constant_score&quot; : {
      &quot;filter&quot; : {
        &quot;match&quot; : { &quot;type&quot; : &quot;hat&quot; }
      }
    }
  },
  &quot;aggs&quot; : {
    &quot;hat_prices&quot; : {
      &quot;sum&quot; : { &quot;field&quot; : &quot;price&quot; }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;hat_prices&quot;: {
      &quot;value&quot;: 567.0
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="value-count-aggregation" tabindex="-1"><a class="header-anchor" href="#value-count-aggregation" aria-hidden="true">#</a> Value Count Aggregation</h3><p>Value Count Aggregation 可按字段统计文档数量。例如，统计 books 索引中包含 author 字段的文档数量，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /books/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;doc_count&quot; : {
      &quot;value_count&quot; : { &quot;field&quot; : &quot;author&quot; }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;doc_count&quot;: {
      &quot;value&quot;: 5
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cardinality-aggregation" tabindex="-1"><a class="header-anchor" href="#cardinality-aggregation" aria-hidden="true">#</a> Cardinality Aggregation</h3><p>Cardinality Aggregation 用于基数统计，其作用是先执行类似 SQL 中的 distinct 操作，去掉集合中的重复项，然后统计去重后的集合长度。例如，在 books 索引中对 language 字段进行 cardinality 操作可以统计出编程语言的种类数，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /books/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;all_lan&quot; : {
      &quot;cardinality&quot; : { &quot;field&quot; : &quot;language&quot; }
    },
    &quot;title_cnt&quot; : {
      &quot;cardinality&quot; : { &quot;field&quot; : &quot;title.keyword&quot; }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>假设 title 字段为文本类型（text），去重时需要指定 keyword，表示把 title 作为整体去重，即不分词统计</strong>。</p><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;all_lan&quot;: {
      &quot;value&quot;: 8
    },
    &quot;title_cnt&quot;: {
      &quot;value&quot;: 18
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stats-aggregation" tabindex="-1"><a class="header-anchor" href="#stats-aggregation" aria-hidden="true">#</a> Stats Aggregation</h3><p>Stats Aggregation 用于基本统计，会一次返回 count、max、min、avg 和 sum 这 5 个指标。例如，在 exams 索引中对 grade 字段进行分数相关的基本统计，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /exams/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;grades_stats&quot; : {
      &quot;stats&quot; : { &quot;field&quot; : &quot;grade&quot; }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;grades_stats&quot;: {
      &quot;count&quot;: 2,
      &quot;min&quot;: 50.0,
      &quot;max&quot;: 100.0,
      &quot;avg&quot;: 75.0,
      &quot;sum&quot;: 150.0
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="extended-stats-aggregation" tabindex="-1"><a class="header-anchor" href="#extended-stats-aggregation" aria-hidden="true">#</a> Extended Stats Aggregation</h3><p>Extended Stats Aggregation 用于高级统计，和基本统计功能类似，但是会比基本统计多出以下几个统计结果，sum_of_squares（平方和）、variance（方差）、std_deviation（标准差）、std_deviation_bounds（平均值加/减两个标准差的区间）。在 exams 索引中对 grade 字段进行分数相关的高级统计，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /exams/_search?size=0
{
  &quot;aggs&quot; : {
    &quot;grades_stats&quot; : {
      &quot;extended_stats&quot; : { &quot;field&quot; : &quot;grade&quot; }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;grades_stats&quot;: {
      &quot;count&quot;: 2,
      &quot;min&quot;: 50.0,
      &quot;max&quot;: 100.0,
      &quot;avg&quot;: 75.0,
      &quot;sum&quot;: 150.0,
      &quot;sum_of_squares&quot;: 12500.0,
      &quot;variance&quot;: 625.0,
      &quot;std_deviation&quot;: 25.0,
      &quot;std_deviation_bounds&quot;: {
        &quot;upper&quot;: 125.0,
        &quot;lower&quot;: 25.0
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="percentiles-aggregation" tabindex="-1"><a class="header-anchor" href="#percentiles-aggregation" aria-hidden="true">#</a> Percentiles Aggregation</h3><p>Percentiles Aggregation 用于百分位统计。百分位数是一个统计学术语，如果将一组数据从大到小排序，并计算相应的累计百分位，某一百分位所对应数据的值就称为这一百分位的百分位数。默认情况下，累计百分位为 [ 1, 5, 25, 50, 75, 95, 99 ]。以下例子给出了在 latency 索引中对 load_time 字段进行加载时间的百分位统计，查询语句如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET latency/_search
{
  &quot;size&quot;: 0,
  &quot;aggs&quot; : {
    &quot;load_time_outlier&quot; : {
      &quot;percentiles&quot; : {
        &quot;field&quot; : &quot;load_time&quot;
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要注意的是，如上的 <code>load_time</code> 字段必须是数字类型</strong>。</p><p>聚合结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;load_time_outlier&quot;: {
      &quot;values&quot; : {
        &quot;1.0&quot;: 5.0,
        &quot;5.0&quot;: 25.0,
        &quot;25.0&quot;: 165.0,
        &quot;50.0&quot;: 445.0,
        &quot;75.0&quot;: 725.0,
        &quot;95.0&quot;: 945.0,
        &quot;99.0&quot;: 985.0
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>百分位的统计也可以指定 percents 参数指定百分位，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET latency/_search
{
  &quot;size&quot;: 0,
  &quot;aggs&quot; : {
    &quot;load_time_outlier&quot; : {
      &quot;percentiles&quot; : {
        &quot;field&quot; : &quot;load_time&quot;,
        &quot;percents&quot;: [60, 80, 95]
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="percentiles-ranks-aggregation" tabindex="-1"><a class="header-anchor" href="#percentiles-ranks-aggregation" aria-hidden="true">#</a> Percentiles Ranks Aggregation</h3><p>Percentiles Ranks Aggregation 与 Percentiles Aggregation 统计恰恰相反，就是想看当前数值处在什么范围内（百分位）， 假如你查一下当前值 500 和 600 所处的百分位，发现是 90.01 和 100，那么说明有 90.01 % 的数值都在 500 以内，100 % 的数值在 600 以内。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET latency/_search
{
  &quot;size&quot;: 0,
    &quot;aggs&quot; : {
      &quot;load_time_ranks&quot; : {
        &quot;percentile_ranks&quot; : {
          &quot;field&quot; : &quot;load_time&quot;,
          &quot;values&quot; : [500, 600]
        }
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>同样 load_time</code> 字段必须是数字类型</strong>。</p><p>返回结果大概类似如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;load_time_ranks&quot;: {
      &quot;values&quot; : {
        &quot;500.0&quot;: 90.01,
        &quot;600.0&quot;: 100.0
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以设置 <code>keyed</code> 参数为 <code>true</code>，将对应的 values 作为桶 key 一起返回，默认是 <code>false</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET latency/_search
{
  &quot;size&quot;: 0,
  &quot;aggs&quot;: {
    &quot;load_time_ranks&quot;: {
      &quot;percentile_ranks&quot;: {
        &quot;field&quot;: &quot;load_time&quot;,
        &quot;values&quot;: [500, 600],
        &quot;keyed&quot;: true
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;load_time_ranks&quot;: {
      &quot;values&quot;: [
        {
          &quot;key&quot;: 500.0,
          &quot;value&quot;: 90.01
        },
        {
          &quot;key&quot;: 600.0,
          &quot;value&quot;: 100.0
        }
      ]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="桶聚合" tabindex="-1"><a class="header-anchor" href="#桶聚合" aria-hidden="true">#</a> 桶聚合</h2><p>bucket 可以理解为一个桶，它会遍历文档中的内容，凡是符合某一要求的就放入一个桶中，分桶相当于 SQL 中的 group by。从另外一个角度，可以将指标聚合看成单桶聚合，即把所有文档放到一个桶中，而桶聚合是多桶型聚合，它根据相应的条件进行分组。</p><table><thead><tr><th style="text-align:left;">种类</th><th style="text-align:left;">描述/场景</th></tr></thead><tbody><tr><td style="text-align:left;">词项聚合（Terms Aggregation）</td><td style="text-align:left;">用于分组聚合，让用户得知文档中每个词项的频率，它返回每个词项出现的次数。</td></tr><tr><td style="text-align:left;">差异词项聚合（Significant Terms Aggregation）</td><td style="text-align:left;">它会返回某个词项在整个索引中和在查询结果中的词频差异，这有助于我们发现搜索场景中有意义的词。</td></tr><tr><td style="text-align:left;">过滤器聚合（Filter Aggregation）</td><td style="text-align:left;">指定过滤器匹配的所有文档到单个桶（bucket），通常这将用于将当前聚合上下文缩小到一组特定的文档。</td></tr><tr><td style="text-align:left;">多过滤器聚合（Filters Aggregation）</td><td style="text-align:left;">指定多个过滤器匹配所有文档到多个桶（bucket）。</td></tr><tr><td style="text-align:left;">范围聚合（Range Aggregation）</td><td style="text-align:left;">范围聚合，用于反映数据的分布情况。</td></tr><tr><td style="text-align:left;">日期范围聚合（Date Range Aggregation）</td><td style="text-align:left;">专门用于日期类型的范围聚合。</td></tr><tr><td style="text-align:left;">IP 范围聚合（IP Range Aggregation）</td><td style="text-align:left;">用于对 IP 类型数据范围聚合。</td></tr><tr><td style="text-align:left;">直方图聚合（Histogram Aggregation）</td><td style="text-align:left;">可能是数值，或者日期型，和范围聚集类似。</td></tr><tr><td style="text-align:left;">时间直方图聚合（Date Histogram Aggregation）</td><td style="text-align:left;">时间直方图聚合，常用于按照日期对文档进行统计并绘制条形图。</td></tr><tr><td style="text-align:left;">空值聚合（Missing Aggregation）</td><td style="text-align:left;">空值聚合，可以把文档集中所有缺失字段的文档分到一个桶中。</td></tr><tr><td style="text-align:left;">地理点范围聚合（Geo Distance Aggregation）</td><td style="text-align:left;">用于对地理点（geo point）做范围统计。</td></tr></tbody></table><h3 id="terms-aggregation" tabindex="-1"><a class="header-anchor" href="#terms-aggregation" aria-hidden="true">#</a> Terms Aggregation</h3><p>Terms Aggregation 用于词项的分组聚合。最为经典的用例是获取 X 中最频繁（top frequent）的项目，其中 X 是文档中的某个字段，如用户的名称、标签或分类。由于 terms 聚集统计的是每个词条，而不是整个字段值，因此通常需要在一个非分析型的字段上运行这种聚集。原因是, 你期望“big data”作为词组统计，而不是“big”单独统计一次，“data”再单独统计一次。</p><p>用户可以使用 terms 聚集，从分析型字段（如内容）中抽取最为频繁的词条。还可以使用这种信息来生成一个单词云。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;aggs&quot;: {
    &quot;profit_terms&quot;: {
      &quot;terms&quot;: { // terms 聚合 关键字
        &quot;field&quot;: &quot;profit&quot;,
        ......
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 terms 分桶的基础上，还可以对每个桶进行指标统计，也可以基于一些指标或字段值进行排序。示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;aggs&quot;: {
    &quot;item_terms&quot;: {
      &quot;terms&quot;: {
        &quot;field&quot;: &quot;item_id&quot;,
        &quot;size&quot;: 1000,
        &quot;order&quot;:[{
          &quot;gmv_stat&quot;: &quot;desc&quot;
        },{
          &quot;gmv_180d&quot;: &quot;desc&quot;
        }]
      },
      &quot;aggs&quot;: {
        &quot;gmv_stat&quot;: {
          &quot;sum&quot;: {
            &quot;field&quot;: &quot;gmv&quot;
          }
        },
        &quot;gmv_180d&quot;: {
          &quot;sum&quot;: {
            &quot;script&quot;: &quot;doc[&#39;gmv_90d&#39;].value*2&quot;
          }
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;hospital_id_agg&quot;: {
      &quot;doc_count_error_upper_bound&quot;: 0,
      &quot;sum_other_doc_count&quot;: 260,
      &quot;buckets&quot;: [
        {
          &quot;key&quot;: 23388,
          &quot;doc_count&quot;: 18,
          &quot;gmv_stat&quot;: {
            &quot;value&quot;: 176220
          },
          &quot;gmv_180d&quot;: {
            &quot;value&quot;: 89732
          }
        },
        {
          &quot;key&quot;: 96117,
          &quot;doc_count&quot;: 16,
          &quot;gmv_stat&quot;: {
            &quot;value&quot;: 129306
          },
          &quot;gmv_180d&quot;: {
            &quot;value&quot;: 56988
          }
        },
        ...
      ]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下返回按文档计数从高到低的前 10 个分组，可以通过 size 参数指定返回的分组数。</p><h3 id="filter-aggregation" tabindex="-1"><a class="header-anchor" href="#filter-aggregation" aria-hidden="true">#</a> Filter Aggregation</h3><p>Filter Aggregation 是过滤器聚合，可以把符合过滤器中的条件的文档分到一个桶中，即是单分组聚合。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;aggs&quot;: {
    &quot;age_terms&quot;: {
      &quot;filter&quot;: {&quot;match&quot;:{&quot;gender&quot;:&quot;F&quot;}},
      &quot;aggs&quot;: {
        &quot;avg_age&quot;: {
          &quot;avg&quot;: {
            &quot;field&quot;: &quot;age&quot;
          }
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filters-aggregation" tabindex="-1"><a class="header-anchor" href="#filters-aggregation" aria-hidden="true">#</a> Filters Aggregation</h3><p>Filters Aggregation 是多过滤器聚合，可以把符合多个过滤条件的文档分到不同的桶中，即每个分组关联一个过滤条件，并收集所有满足自身过滤条件的文档。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;size&quot;: 0,
  &quot;aggs&quot;: {
    &quot;messages&quot;: {
      &quot;filters&quot;: {
        &quot;filters&quot;: {
          &quot;errors&quot;: { &quot;match&quot;: { &quot;body&quot;: &quot;error&quot; } },
          &quot;warnings&quot;: { &quot;match&quot;: { &quot;body&quot;: &quot;warning&quot; } }
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子里，我们分析日志信息。聚合会创建两个关于日志数据的分组，一个收集包含错误信息的文档，另一个收集包含告警信息的文档。而且每个分组会按月份划分。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;messages&quot;: {
      &quot;buckets&quot;: {
        &quot;errors&quot;: {
          &quot;doc_count&quot;: 1
        },
        &quot;warnings&quot;: {
          &quot;doc_count&quot;: 2
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="range-aggregation" tabindex="-1"><a class="header-anchor" href="#range-aggregation" aria-hidden="true">#</a> Range Aggregation</h3><p>Range Aggregation 范围聚合是一个基于多组值来源的聚合，可以让用户定义一系列范围，每个范围代表一个分组。在聚合执行的过程中，从每个文档提取出来的值都会检查每个分组的范围，并且使相关的文档落入分组中。注意，范围聚合的每个范围内包含 from 值但是排除 to 值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;aggs&quot;: {
    &quot;age_range&quot;: {
      &quot;range&quot;: {
        &quot;field&quot;: &quot;age&quot;,
          &quot;ranges&quot;: [{
            &quot;to&quot;: 25
          },
          {
            &quot;from&quot;: 25,
            &quot;to&quot;: 35
          },
          {
            &quot;from&quot;: 35
          }]
        },
        &quot;aggs&quot;: {
          &quot;bmax&quot;: {
            &quot;max&quot;: {
              &quot;field&quot;: &quot;balance&quot;
            }
          }
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  ...
  &quot;aggregations&quot;: {
    &quot;age_range&quot;: {
      &quot;buckets&quot;: [{
        &quot;key&quot;: &quot;*-25.0&quot;,
        &quot;to&quot;: 25,
        &quot;doc_count&quot;: 225,
        &quot;bmax&quot;: {
          &quot;value&quot;: 49587
        }
      },
      {
        &quot;key&quot;: &quot;25.0-35.0&quot;,
        &quot;from&quot;: 25,
        &quot;to&quot;: 35,
        &quot;doc_count&quot;: 485,
        &quot;bmax&quot;: {
          &quot;value&quot;: 49795
        }
      },
      {
        &quot;key&quot;: &quot;35.0-*&quot;,
        &quot;from&quot;: 35,
        &quot;doc_count&quot;: 290,
        &quot;bmax&quot;: {
          &quot;value&quot;: 49989
        }
      }]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,70),m={href:"https://www.knowledgedict.com/tutorial/elasticsearch-intro.html",target:"_blank",rel:"noopener noreferrer"};function g(b,q){const i=l("ExternalLinkIcon");return d(),u("div",null,[v,n("p",null,[e("除了常规的平均值聚合计算外，elasticsearch 还提供了加权平均值的聚合计算，详情参见 "),n("a",o,[e("Elasticsearch 指标聚合之 Weighted Avg Aggregation"),s(i)]),e("。")]),c,n("ul",null,[n("li",null,[n("a",m,[e("Elasticsearch 教程"),s(i)])])])])}const h=t(r,[["render",g],["__file","index.html.vue"]]);export{h as default};
