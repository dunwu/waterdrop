import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as d,a as e,b as n,d as l,e as s}from"./app-82865e7f.js";const o={},c=s(`<h1 id="hbase-java-api-高级特性之过滤器" tabindex="-1"><a class="header-anchor" href="#hbase-java-api-高级特性之过滤器" aria-hidden="true">#</a> HBase Java API 高级特性之过滤器</h1><p>HBase 中两种主要的数据读取方法是 <code>get()</code> 和 <code>scan()</code>，它们都支持直接访问数据和通过指定起止 row key 访问数据。此外，可以指定列族、列、时间戳和版本号来进行条件查询。它们的缺点是不支持细粒度的筛选功能。为了弥补这种不足，<code>Get</code> 和 <code>Scan</code> 支持通过过滤器（<code>Filter</code>）对 row key、列或列值进行过滤。</p><p>HBase 提供了一些内置过滤器，也允许用户通过继承 <code>Filter</code> 类来自定义过滤器。所有的过滤器都在服务端生效，称为 <strong>谓词下推</strong>。这样可以保证被过滤掉的数据不会被传到客户端。</p><figure><img src="https://www.oreilly.com/api/v2/epubs/9781449314682/files/httpatomoreillycomsourceoreillyimages889252.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><em>图片来自 HBase 权威指南</em></p><p>HBase 过滤器层次结构的最底层是 <code>Filter</code> 接口和 <code>FilterBase</code> 抽象类。大部分过滤器都直接继承自 <code>FilterBase</code>。</p><h2 id="比较过滤器" tabindex="-1"><a class="header-anchor" href="#比较过滤器" aria-hidden="true">#</a> 比较过滤器</h2><p>所有比较过滤器均继承自 <code>CompareFilter</code>。<code>CompareFilter</code> 比 <code>FilterBase</code> 多了一个 <code>compare()</code> 方法，它需要传入参数定义比较操作的过程：比较运算符和比较器。</p><p>创建一个比较过滤器需要两个参数，分别是<strong>比较运算符</strong>和<strong>比较器实例</strong>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public CompareFilter(final CompareOp compareOp,final ByteArrayComparable comparator) {
    this.compareOp = compareOp;
    this.comparator = comparator;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符" aria-hidden="true">#</a> 比较运算符</h3><ul><li>LESS (&lt;)</li><li>LESS_OR_EQUAL (&lt;=)</li><li>EQUAL (=)</li><li>NOT_EQUAL (!=)</li><li>GREATER_OR_EQUAL (&gt;=)</li><li>GREATER (&gt;)</li><li>NO_OP (排除所有符合条件的值)</li></ul><p>比较运算符均定义在枚举类 <code>CompareOperator</code> 中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@InterfaceAudience.Public
public enum CompareOperator {
  LESS,
  LESS_OR_EQUAL,
  EQUAL,
  NOT_EQUAL,
  GREATER_OR_EQUAL,
  GREATER,
  NO_OP,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：在 1.x 版本的 HBase 中，比较运算符定义在 <code>CompareFilter.CompareOp</code> 枚举类中，但在 2.0 之后这个类就被标识为 @deprecated ，并会在 3.0 移除。所以 2.0 之后版本的 HBase 需要使用 <code>CompareOperator</code> 这个枚举类。</p></blockquote><h3 id="比较器" tabindex="-1"><a class="header-anchor" href="#比较器" aria-hidden="true">#</a> 比较器</h3><p>所有比较器均继承自 <code>ByteArrayComparable</code> 抽象类，常用的有以下几种：</p><ul><li><strong>BinaryComparator</strong> : 使用 <code>Bytes.compareTo(byte []，byte [])</code> 按字典序比较指定的字节数组。</li><li><strong>BinaryPrefixComparator</strong> : 按字典序与指定的字节数组进行比较，但只比较到这个字节数组的长度。</li><li><strong>RegexStringComparator</strong> : 使用给定的正则表达式与指定的字节数组进行比较。仅支持 <code>EQUAL</code> 和 <code>NOT_EQUAL</code> 操作。</li><li><strong>SubStringComparator</strong> : 测试给定的子字符串是否出现在指定的字节数组中，比较不区分大小写。仅支持 <code>EQUAL</code> 和 <code>NOT_EQUAL</code> 操作。</li><li><strong>NullComparator</strong> ：判断给定的值是否为空。</li><li><strong>BitComparator</strong> ：按位进行比较。</li></ul><p><code>BinaryPrefixComparator</code> 和 <code>BinaryComparator</code> 的区别不是很好理解，这里举例说明一下：</p><p>在进行 <code>EQUAL</code> 的比较时，如果比较器传入的是 <code>abcd</code> 的字节数组，但是待比较数据是 <code>abcdefgh</code>：</p><ul><li>如果使用的是 <code>BinaryPrefixComparator</code> 比较器，则比较以 <code>abcd</code> 字节数组的长度为准，即 <code>efgh</code> 不会参与比较，这时候认为 <code>abcd</code> 与 <code>abcdefgh</code> 是满足 <code>EQUAL</code> 条件的；</li><li>如果使用的是 <code>BinaryComparator</code> 比较器，则认为其是不相等的。</li></ul><h3 id="比较过滤器种类" tabindex="-1"><a class="header-anchor" href="#比较过滤器种类" aria-hidden="true">#</a> 比较过滤器种类</h3><p>比较过滤器共有五个（Hbase 1.x 版本和 2.x 版本相同）：</p><ul><li><strong>RowFilter</strong> ：基于行键来过滤数据；</li><li><strong>FamilyFilterr</strong> ：基于列族来过滤数据；</li><li><strong>QualifierFilterr</strong> ：基于列限定符（列名）来过滤数据；</li><li><strong>ValueFilterr</strong> ：基于单元格 (cell) 的值来过滤数据；</li><li><strong>DependentColumnFilter</strong> ：指定一个参考列来过滤其他列的过滤器，过滤的原则是基于参考列的时间戳来进行筛选 。</li></ul><p>前四种过滤器的使用方法相同，均只要传递比较运算符和运算器实例即可构建，然后通过 <code>setFilter</code> 方法传递给 <code>scan</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> Filter filter  = new RowFilter(CompareOperator.LESS_OR_EQUAL,
                                new BinaryComparator(Bytes.toBytes(&quot;xxx&quot;)));
  scan.setFilter(filter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>DependentColumnFilter</code> 的使用稍微复杂一点，这里单独做下说明。</p><h3 id="dependentcolumnfilter" tabindex="-1"><a class="header-anchor" href="#dependentcolumnfilter" aria-hidden="true">#</a> DependentColumnFilter</h3><p>可以把 <code>DependentColumnFilter</code> 理解为<strong>一个 valueFilter 和一个时间戳过滤器的组合</strong>。<code>DependentColumnFilter</code> 有三个带参构造器，这里选择一个参数最全的进行说明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DependentColumnFilter(final byte [] family, final byte[] qualifier,
                               final boolean dropDependentColumn, final CompareOperator op,
                               final ByteArrayComparable valueComparator)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>family</strong> ：列族</li><li><strong>qualifier</strong> ：列限定符（列名）</li><li><strong>dropDependentColumn</strong> ：决定参考列是否被包含在返回结果内，为 true 时表示参考列被返回，为 false 时表示被丢弃</li><li><strong>op</strong> ：比较运算符</li><li><strong>valueComparator</strong> ：比较器</li></ul><p>这里举例进行说明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DependentColumnFilter dependentColumnFilter = new DependentColumnFilter(
    Bytes.toBytes(&quot;student&quot;),
    Bytes.toBytes(&quot;name&quot;),
    false,
    CompareOperator.EQUAL,
    new BinaryPrefixComparator(Bytes.toBytes(&quot;xiaolan&quot;)));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先会去查找 <code>student:name</code> 中值以 <code>xiaolan</code> 开头的所有数据获得 <code>参考数据集</code>，这一步等同于 valueFilter 过滤器；</li><li>其次再用参考数据集中所有数据的时间戳去检索其他列，获得时间戳相同的其他列的数据作为 <code>结果数据集</code>，这一步等同于时间戳过滤器；</li><li>最后如果 <code>dropDependentColumn</code> 为 true，则返回 <code>参考数据集</code>+<code>结果数据集</code>，若为 false，则抛弃参考数据集，只返回 <code>结果数据集</code>。</li></ul><h2 id="专用过滤器" tabindex="-1"><a class="header-anchor" href="#专用过滤器" aria-hidden="true">#</a> 专用过滤器</h2><p>专用过滤器通常直接继承自 <code>FilterBase</code>，用于更特定的场景。</p><h3 id="单列列值过滤器-singlecolumnvaluefilter" tabindex="-1"><a class="header-anchor" href="#单列列值过滤器-singlecolumnvaluefilter" aria-hidden="true">#</a> 单列列值过滤器 (SingleColumnValueFilter)</h3><p>基于某列（参考列）的值决定某行数据是否被过滤。其实例有以下方法：</p><ul><li><strong>setFilterIfMissing(boolean filterIfMissing)</strong> ：默认值为 false，即如果该行数据不包含参考列，其依然被包含在最后的结果中；设置为 true 时，则不包含；</li><li><strong>setLatestVersionOnly(boolean latestVersionOnly)</strong> ：默认为 true，即只检索参考列的最新版本数据；设置为 false，则检索所有版本数据。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SingleColumnValueFilter singleColumnValueFilter = new SingleColumnValueFilter(
                &quot;student&quot;.getBytes(),
                &quot;name&quot;.getBytes(),
                CompareOperator.EQUAL,
                new SubstringComparator(&quot;xiaolan&quot;));
singleColumnValueFilter.setFilterIfMissing(true);
scan.setFilter(singleColumnValueFilter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单列列值排除器-singlecolumnvalueexcludefilter" tabindex="-1"><a class="header-anchor" href="#单列列值排除器-singlecolumnvalueexcludefilter" aria-hidden="true">#</a> 单列列值排除器 (SingleColumnValueExcludeFilter)</h3><p><code>SingleColumnValueExcludeFilter</code> 继承自上面的 <code>SingleColumnValueFilter</code>，过滤行为与其相反。</p><h3 id="行键前缀过滤器-prefixfilter" tabindex="-1"><a class="header-anchor" href="#行键前缀过滤器-prefixfilter" aria-hidden="true">#</a> 行键前缀过滤器 (PrefixFilter)</h3><p>基于 RowKey 值决定某行数据是否被过滤。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PrefixFilter prefixFilter = new PrefixFilter(Bytes.toBytes(&quot;xxx&quot;));
scan.setFilter(prefixFilter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="列名前缀过滤器-columnprefixfilter" tabindex="-1"><a class="header-anchor" href="#列名前缀过滤器-columnprefixfilter" aria-hidden="true">#</a> 列名前缀过滤器 (ColumnPrefixFilter)</h3><p>基于列限定符（列名）决定某行数据是否被过滤。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ColumnPrefixFilter columnPrefixFilter = new ColumnPrefixFilter(Bytes.toBytes(&quot;xxx&quot;));
 scan.setFilter(columnPrefixFilter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页过滤器-pagefilter" tabindex="-1"><a class="header-anchor" href="#分页过滤器-pagefilter" aria-hidden="true">#</a> 分页过滤器 (PageFilter)</h3><p>可以使用这个过滤器实现对结果按行进行分页，创建 PageFilter 实例的时候需要传入每页的行数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public PageFilter(final long pageSize) {
    Preconditions.checkArgument(pageSize &gt;= 0, &quot;must be positive %s&quot;, pageSize);
    this.pageSize = pageSize;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的代码体现了客户端实现分页查询的主要逻辑，这里对其进行一下解释说明：</p><p>客户端进行分页查询，需要传递 <code>startRow</code>(起始 RowKey)，知道起始 <code>startRow</code> 后，就可以返回对应的 pageSize 行数据。这里唯一的问题就是，对于第一次查询，显然 <code>startRow</code> 就是表格的第一行数据，但是之后第二次、第三次查询我们并不知道 <code>startRow</code>，只能知道上一次查询的最后一条数据的 RowKey（简单称之为 <code>lastRow</code>）。</p><p>我们不能将 <code>lastRow</code> 作为新一次查询的 <code>startRow</code> 传入，因为 scan 的查询区间是[startRow，endRow) ，即前开后闭区间，这样 <code>startRow</code> 在新的查询也会被返回，这条数据就重复了。</p><p>同时在不使用第三方数据库存储 RowKey 的情况下，我们是无法通过知道 <code>lastRow</code> 的下一个 RowKey 的，因为 RowKey 的设计可能是连续的也有可能是不连续的。</p><p>由于 Hbase 的 RowKey 是按照字典序进行排序的。这种情况下，就可以在 <code>lastRow</code> 后面加上 <code>0</code> ，作为 <code>startRow</code> 传入，因为按照字典序的规则，某个值加上 <code>0</code> 后的新值，在字典序上一定是这个值的下一个值，对于 HBase 来说下一个 RowKey 在字典序上一定也是等于或者大于这个新值的。</p><p>所以最后传入 <code>lastRow</code>+<code>0</code>，如果等于这个值的 RowKey 存在就从这个值开始 scan,否则从字典序的下一个 RowKey 开始 scan。</p><blockquote><p>25 个字母以及数字字符，字典排序如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;0&#39; &lt; &#39;1&#39; &lt; &#39;2&#39; &lt; ... &lt; &#39;9&#39; &lt; &#39;a&#39; &lt; &#39;b&#39; &lt; ... &lt; &#39;z&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>分页查询主要实现逻辑：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>byte[] POSTFIX = new byte[] { 0x00 };
Filter filter = new PageFilter(15);

int totalRows = 0;
byte[] lastRow = null;
while (true) {
    Scan scan = new Scan();
    scan.setFilter(filter);
    if (lastRow != null) {
        // 如果不是首行 则 lastRow + 0
        byte[] startRow = Bytes.add(lastRow, POSTFIX);
        System.out.println(&quot;start row: &quot; +
                           Bytes.toStringBinary(startRow));
        scan.withStartRow(startRow);
    }
    ResultScanner scanner = table.getScanner(scan);
    int localRows = 0;
    Result result;
    while ((result = scanner.next()) != null) {
        System.out.println(localRows++ + &quot;: &quot; + result);
        totalRows++;
        lastRow = result.getRow();
    }
    scanner.close();
    //最后一页，查询结束
    if (localRows == 0) break;
}
System.out.println(&quot;total rows: &quot; + totalRows);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是在多台 Regin Services 上执行分页过滤的时候，由于并行执行的过滤器不能共享它们的状态和边界，所以有可能每个过滤器都会在完成扫描前获取了 PageCount 行的结果，这种情况下会返回比分页条数更多的数据，分页过滤器就有失效的可能。</p></blockquote><h3 id="时间戳过滤器-timestampsfilter" tabindex="-1"><a class="header-anchor" href="#时间戳过滤器-timestampsfilter" aria-hidden="true">#</a> 时间戳过滤器 (TimestampsFilter)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;Long&gt; list = new ArrayList&lt;&gt;();
list.add(1554975573000L);
TimestampsFilter timestampsFilter = new TimestampsFilter(list);
scan.setFilter(timestampsFilter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="首次行键过滤器-firstkeyonlyfilter" tabindex="-1"><a class="header-anchor" href="#首次行键过滤器-firstkeyonlyfilter" aria-hidden="true">#</a> 首次行键过滤器 (FirstKeyOnlyFilter)</h3><p><code>FirstKeyOnlyFilter</code> 只扫描每行的第一列，扫描完第一列后就结束对当前行的扫描，并跳转到下一行。相比于全表扫描，其性能更好，通常用于行数统计的场景，因为如果某一行存在，则行中必然至少有一列。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FirstKeyOnlyFilter firstKeyOnlyFilter = new FirstKeyOnlyFilter();
scan.set(firstKeyOnlyFilter);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="包装过滤器" tabindex="-1"><a class="header-anchor" href="#包装过滤器" aria-hidden="true">#</a> 包装过滤器</h2><p>包装过滤器就是通过包装其他过滤器以实现某些拓展的功能。</p><h3 id="skipfilter-过滤器" tabindex="-1"><a class="header-anchor" href="#skipfilter-过滤器" aria-hidden="true">#</a> SkipFilter 过滤器</h3><p><code>SkipFilter</code> 包装一个过滤器，当被包装的过滤器遇到一个需要过滤的 KeyValue 实例时，则拓展过滤整行数据。下面是一个使用示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 定义 ValueFilter 过滤器
Filter filter1 = new ValueFilter(CompareOperator.NOT_EQUAL,
      new BinaryComparator(Bytes.toBytes(&quot;xxx&quot;)));
// 使用 SkipFilter 进行包装
Filter filter2 = new SkipFilter(filter1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="whilematchfilter-过滤器" tabindex="-1"><a class="header-anchor" href="#whilematchfilter-过滤器" aria-hidden="true">#</a> WhileMatchFilter 过滤器</h3><p><code>WhileMatchFilter</code> 包装一个过滤器，当被包装的过滤器遇到一个需要过滤的 KeyValue 实例时，<code>WhileMatchFilter</code> 则结束本次扫描，返回已经扫描到的结果。下面是其使用示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Filter filter1 = new RowFilter(CompareOperator.NOT_EQUAL,
                               new BinaryComparator(Bytes.toBytes(&quot;rowKey4&quot;)));

Scan scan = new Scan();
scan.setFilter(filter1);
ResultScanner scanner1 = table.getScanner(scan);
for (Result result : scanner1) {
    for (Cell cell : result.listCells()) {
        System.out.println(cell);
    }
}
scanner1.close();

System.out.println(&quot;--------------------&quot;);

// 使用 WhileMatchFilter 进行包装
Filter filter2 = new WhileMatchFilter(filter1);

scan.setFilter(filter2);
ResultScanner scanner2 = table.getScanner(scan);
for (Result result : scanner1) {
    for (Cell cell : result.listCells()) {
        System.out.println(cell);
    }
}
scanner2.close();
rowKey0/student:name/1555035006994/Put/vlen=8/seqid=0
rowKey1/student:name/1555035007019/Put/vlen=8/seqid=0
rowKey2/student:name/1555035007025/Put/vlen=8/seqid=0
rowKey3/student:name/1555035007037/Put/vlen=8/seqid=0
rowKey5/student:name/1555035007051/Put/vlen=8/seqid=0
rowKey6/student:name/1555035007057/Put/vlen=8/seqid=0
rowKey7/student:name/1555035007062/Put/vlen=8/seqid=0
rowKey8/student:name/1555035007068/Put/vlen=8/seqid=0
rowKey9/student:name/1555035007073/Put/vlen=8/seqid=0
--------------------
rowKey0/student:name/1555035006994/Put/vlen=8/seqid=0
rowKey1/student:name/1555035007019/Put/vlen=8/seqid=0
rowKey2/student:name/1555035007025/Put/vlen=8/seqid=0
rowKey3/student:name/1555035007037/Put/vlen=8/seqid=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到被包装后，只返回了 <code>rowKey4</code> 之前的数据。</p><h2 id="filterlist" tabindex="-1"><a class="header-anchor" href="#filterlist" aria-hidden="true">#</a> FilterList</h2><p>以上都是讲解单个过滤器的作用，当需要多个过滤器共同作用于一次查询的时候，就需要使用 <code>FilterList</code>。<code>FilterList</code> 支持通过构造器或者 <code>addFilter</code> 方法传入多个过滤器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 构造器传入
public FilterList(final Operator operator, final List&lt;Filter&gt; filters)
public FilterList(final List&lt;Filter&gt; filters)
public FilterList(final Filter... filters)

// 方法传入
 public void addFilter(List&lt;Filter&gt; filters)
 public void addFilter(Filter filter)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多个过滤器组合的结果由 <code>operator</code> 参数定义 ，其可选参数定义在 <code>Operator</code> 枚举类中。只有 <code>MUST_PASS_ALL</code> 和 <code>MUST_PASS_ONE</code> 两个可选的值：</p><ul><li><strong>MUST_PASS_ALL</strong> ：相当于 AND，必须所有的过滤器都通过才认为通过；</li><li><strong>MUST_PASS_ONE</strong> ：相当于 OR，只有要一个过滤器通过则认为通过。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@InterfaceAudience.Public
  public enum Operator {
    /** !AND */
    MUST_PASS_ALL,
    /** !OR */
    MUST_PASS_ONE
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;Filter&gt; filters = new ArrayList&lt;Filter&gt;();

Filter filter1 = new RowFilter(CompareOperator.GREATER_OR_EQUAL,
                               new BinaryComparator(Bytes.toBytes(&quot;XXX&quot;)));
filters.add(filter1);

Filter filter2 = new RowFilter(CompareOperator.LESS_OR_EQUAL,
                               new BinaryComparator(Bytes.toBytes(&quot;YYY&quot;)));
filters.add(filter2);

Filter filter3 = new QualifierFilter(CompareOperator.EQUAL,
                                     new RegexStringComparator(&quot;ZZZ&quot;));
filters.add(filter3);

FilterList filterList = new FilterList(filters);

Scan scan = new Scan();
scan.setFilter(filterList);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,84),u={href:"https://item.jd.com/11321037.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/larsgeorge/hbase-book",target:"_blank",rel:"noopener noreferrer"};function m(p,b){const i=r("ExternalLinkIcon");return t(),d("div",null,[c,e("ul",null,[e("li",null,[e("a",u,[n("《HBase 权威指南》"),l(i)])]),e("li",null,[e("a",v,[n("《HBase 权威指南》官方源码"),l(i)])])])])}const f=a(o,[["render",m],["__file","index.html.vue"]]);export{f as default};
