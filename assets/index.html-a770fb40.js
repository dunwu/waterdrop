import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c,a as n,b as s,d as e,f as i,e as p}from"./app-1c9286fd.js";const d={},r=n("h1",{id:"mysql-crud",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mysql-crud","aria-hidden":"true"},"#"),s(" MySQL CRUD")],-1),k={class:"hint-container info"},u=p('<p class="hint-container-title">概述</p><p><strong>CRUD</strong> 由英文单词 <strong>C</strong>reate, <strong>R</strong>ead, <strong>U</strong>pdate, <strong>D</strong>elete 的首字母组成，即<strong>增删改查</strong>。</p><p>本文通过介绍基本的 MySQL CRUD 方法，向读者呈现如何访问 MySQL 数据。</p>',3),v={href:"https://dunwu.github.io/waterdrop/pages/efff9009/",target:"_blank",rel:"noopener noreferrer"},m=p(`<h2 id="mysql-连接" tabindex="-1"><a class="header-anchor" href="#mysql-连接" aria-hidden="true">#</a> MySQL 连接</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql <span class="token operator">-</span>u <span class="token operator">&lt;</span><span class="token keyword">user</span><span class="token operator">&gt;</span> <span class="token operator">-</span>p
mysql <span class="token punctuation">[</span>db_name<span class="token punctuation">]</span>
mysql <span class="token operator">-</span>h <span class="token operator">&lt;</span>host<span class="token operator">&gt;</span> <span class="token operator">-</span>P <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span> <span class="token operator">-</span>u <span class="token operator">&lt;</span><span class="token keyword">user</span><span class="token operator">&gt;</span> <span class="token operator">-</span>p <span class="token punctuation">[</span>db_name<span class="token punctuation">]</span>
mysql <span class="token operator">-</span>h <span class="token operator">&lt;</span>host<span class="token operator">&gt;</span> <span class="token operator">-</span>u <span class="token operator">&lt;</span><span class="token keyword">user</span><span class="token operator">&gt;</span> <span class="token operator">-</span>p <span class="token punctuation">[</span>db_name<span class="token punctuation">]</span>

<span class="token comment">-- 退出 MySQL 会话</span>
<span class="token keyword">exit</span> 或 \\q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进程管理" tabindex="-1"><a class="header-anchor" href="#进程管理" aria-hidden="true">#</a> 进程管理</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 显示进程列表</span>
<span class="token keyword">show</span> processlist<span class="token punctuation">;</span>
<span class="token comment">-- 删除进程</span>
<span class="token keyword">kill</span> pid<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-备份恢复" tabindex="-1"><a class="header-anchor" href="#mysql-备份恢复" aria-hidden="true">#</a> MySQL 备份恢复</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- Create a backup</span>
mysqldump <span class="token operator">-</span>u <span class="token keyword">user</span> <span class="token operator">-</span>p db_name <span class="token operator">&gt;</span> db<span class="token punctuation">.</span><span class="token keyword">sql</span>

<span class="token comment">-- Export db without schema</span>
mysqldump <span class="token operator">-</span>u <span class="token keyword">user</span> <span class="token operator">-</span>p db_name <span class="token comment">--no-data=true --add-drop-table=false &gt; db.sql</span>

<span class="token comment">-- Restore a backup</span>
mysql <span class="token operator">-</span>u <span class="token keyword">user</span> <span class="token operator">-</span>p db_name <span class="token operator">&lt;</span> db<span class="token punctuation">.</span><span class="token keyword">sql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ddl" tabindex="-1"><a class="header-anchor" href="#ddl" aria-hidden="true">#</a> DDL</h2><h3 id="数据库管理" tabindex="-1"><a class="header-anchor" href="#数据库管理" aria-hidden="true">#</a> 数据库管理</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建数据库</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> db<span class="token punctuation">;</span>
<span class="token comment">-- 删除数据库</span>
<span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> db<span class="token punctuation">;</span>
<span class="token comment">-- 查看数据库</span>
<span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">;</span>
<span class="token comment">-- 切换数据库</span>
<span class="token keyword">USE</span> db<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="表管理" tabindex="-1"><a class="header-anchor" href="#表管理" aria-hidden="true">#</a> 表管理</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 显示当前数据库所有表</span>
<span class="token keyword">SHOW</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span>
<span class="token comment">-- 显示指定表的所有字段</span>
<span class="token keyword">SHOW</span> <span class="token keyword">FIELDS</span> <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>
<span class="token comment">-- 显示表结构</span>
<span class="token keyword">DESC</span> t<span class="token punctuation">;</span>
<span class="token comment">-- 显示创建表的 SQL</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">;</span>
<span class="token comment">-- 清空表数据</span>
<span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">;</span>

<span class="token comment">-- 创建表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t <span class="token punctuation">(</span>
     id    <span class="token keyword">INT</span><span class="token punctuation">,</span>
     name  <span class="token keyword">VARCHAR</span> <span class="token keyword">DEFAULT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
     price <span class="token keyword">INT</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span>
     <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">;</span>

<span class="token comment">-- 修改表</span>
<span class="token comment">-- 添加列</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t <span class="token keyword">ADD</span> <span class="token keyword">column</span><span class="token punctuation">;</span>
<span class="token comment">-- 删除列</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t <span class="token keyword">DROP</span> <span class="token keyword">COLUMN</span> c<span class="token punctuation">;</span>
<span class="token comment">-- 添加约束</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t <span class="token keyword">ADD</span> <span class="token keyword">constraint</span><span class="token punctuation">;</span>
<span class="token comment">-- 删除约束</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t <span class="token keyword">DROP</span> <span class="token keyword">constraint</span><span class="token punctuation">;</span>
<span class="token comment">-- 重命名表</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t1 <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> t2<span class="token punctuation">;</span>
<span class="token comment">-- 重命名列</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t1 <span class="token keyword">RENAME</span> c1 <span class="token keyword">TO</span> c2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="约束" tabindex="-1"><a class="header-anchor" href="#约束" aria-hidden="true">#</a> 约束</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 设置主键</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">(</span>
    c1 <span class="token keyword">INT</span><span class="token punctuation">,</span> c2 <span class="token keyword">INT</span><span class="token punctuation">,</span> c3 <span class="token keyword">VARCHAR</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>c1<span class="token punctuation">,</span>c2<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 设置外键</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t1<span class="token punctuation">(</span>
    c1 <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    c2 <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>c2<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> t2<span class="token punctuation">(</span>c2<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 设置唯一键</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">(</span>
    c1 <span class="token keyword">INT</span><span class="token punctuation">,</span> c1 <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span><span class="token punctuation">(</span>c2<span class="token punctuation">,</span>c3<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 设置字段取值范围</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">(</span>
  c1 <span class="token keyword">INT</span><span class="token punctuation">,</span> c2 <span class="token keyword">INT</span><span class="token punctuation">,</span>
  <span class="token keyword">CHECK</span><span class="token punctuation">(</span>c1<span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">AND</span> c1 <span class="token operator">&gt;=</span> c2<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 设置字段不为空</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> t<span class="token punctuation">(</span>
     c1 <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
     c2 <span class="token keyword">VARCHAR</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="索引管理" tabindex="-1"><a class="header-anchor" href="#索引管理" aria-hidden="true">#</a> 索引管理</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建索引</span>
<span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_name
<span class="token keyword">ON</span> t<span class="token punctuation">(</span>c1<span class="token punctuation">,</span>c2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建唯一索引</span>
<span class="token keyword">CREATE</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> idx_name
<span class="token keyword">ON</span> t<span class="token punctuation">(</span>c3<span class="token punctuation">,</span>c4<span class="token punctuation">)</span>

<span class="token comment">-- 删除索引</span>
<span class="token keyword">DROP</span> <span class="token keyword">INDEX</span> idx_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="增删改查" tabindex="-1"><a class="header-anchor" href="#增删改查" aria-hidden="true">#</a> 增删改查</h2><h3 id="插入" tabindex="-1"><a class="header-anchor" href="#插入" aria-hidden="true">#</a> 插入</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 插入一行记录</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> t<span class="token punctuation">(</span>column_list<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span><span class="token punctuation">(</span>value_list<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 插入多行记录</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> t<span class="token punctuation">(</span>column_list<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span>value_list<span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">(</span>value_list<span class="token punctuation">)</span><span class="token punctuation">,</span> …<span class="token punctuation">;</span>

<span class="token comment">-- 复制 t2 多行记录到 t1</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> t1<span class="token punctuation">(</span>column_list<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> column_list
<span class="token keyword">FROM</span> t2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新" tabindex="-1"><a class="header-anchor" href="#更新" aria-hidden="true">#</a> 更新</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 更新所有行记录</span>
<span class="token keyword">UPDATE</span> t
<span class="token keyword">SET</span> c1 <span class="token operator">=</span> new_value<span class="token punctuation">;</span>
<span class="token keyword">Update</span> <span class="token keyword">values</span> <span class="token operator">in</span> the <span class="token keyword">column</span> c1<span class="token punctuation">,</span> c2 that <span class="token keyword">match</span> the condition

<span class="token comment">-- 更新符合条件的行记录</span>
<span class="token keyword">UPDATE</span> t
<span class="token keyword">SET</span> c1 <span class="token operator">=</span> new_value<span class="token punctuation">,</span>
        c2 <span class="token operator">=</span> new_value
<span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 删除所有行记录</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>

<span class="token comment">-- 删除符合条件的行记录</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> t
<span class="token keyword">WHERE</span> condition<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询表的指定字段</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2 <span class="token keyword">FROM</span> t

<span class="token comment">-- 查询表的所有字段</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t

<span class="token comment">-- 查询匹配条件的指定字段</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2 <span class="token keyword">FROM</span> t
<span class="token keyword">WHERE</span> condition

<span class="token comment">-- 查询指定字段并去重</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> c1 <span class="token keyword">FROM</span> t
<span class="token keyword">WHERE</span> condition

<span class="token comment">-- 查询指定字段，并根据 c1 字段升序（降序）排序</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2 <span class="token keyword">FROM</span> t
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c1 <span class="token keyword">ASC</span> <span class="token punctuation">[</span><span class="token keyword">DESC</span><span class="token punctuation">]</span>
Skip <span class="token keyword">offset</span> <span class="token keyword">of</span> <span class="token keyword">rows</span> <span class="token operator">and</span> <span class="token keyword">return</span> the <span class="token keyword">next</span> n <span class="token keyword">rows</span>

<span class="token comment">-- 分页查询</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2 <span class="token keyword">FROM</span> t
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c1
<span class="token keyword">LIMIT</span> n <span class="token keyword">OFFSET</span> <span class="token keyword">offset</span>
<span class="token keyword">Group</span> <span class="token keyword">rows</span> <span class="token keyword">using</span> an aggregate <span class="token keyword">function</span>

<span class="token comment">-- 分组聚合查询</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> aggregate<span class="token punctuation">(</span>c2<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> t
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> c1

<span class="token comment">-- 含查询条件的分组聚合查询</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> aggregate<span class="token punctuation">(</span>c2<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> t
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> c1
<span class="token keyword">HAVING</span> condition
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,25),b={href:"https://book.douban.com/subject/23008813/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://time.geekbang.org/column/intro/139",target:"_blank",rel:"noopener noreferrer"},w={href:"https://book.douban.com/subject/35167240/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://quickref.me/mysql.html",target:"_blank",rel:"noopener noreferrer"};function E(g,T){const a=t("ExternalLinkIcon");return l(),c("div",null,[r,n("div",k,[u,n("p",null,[s("扩展阅读："),n("a",v,[s("SQL 语法必知必会"),e(a)])])]),i(" more "),m,n("ul",null,[n("li",null,[n("a",b,[s("《高性能 MySQL》"),e(a)])]),n("li",null,[n("a",y,[s("极客时间教程 - MySQL 实战 45 讲"),e(a)])]),n("li",null,[n("a",w,[s("《SQL 必知必会》"),e(a)])]),n("li",null,[n("a",h,[s("MySQL Cheat Sheet"),e(a)])])])])}const L=o(d,[["render",E],["__file","index.html.vue"]]);export{L as default};
