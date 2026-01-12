import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as r,a as n,b as e,d as s,e as i}from"./app-0e67a029.js";const d={},o=i(`<h1 id="flink-运维" tabindex="-1"><a class="header-anchor" href="#flink-运维" aria-hidden="true">#</a> Flink 运维</h1><h2 id="docker-安装-flink" tabindex="-1"><a class="header-anchor" href="#docker-安装-flink" aria-hidden="true">#</a> docker 安装 flink</h2><p>（1）使用 docker 命令拉取镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull Flink
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（2）编写 <code>docker-compose.yml</code>，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;2.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">jobmanager</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> flink
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;6123&#39;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;8081:8081&#39;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> jobmanager
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JOB_MANAGER_RPC_ADDRESS=jobmanager

  <span class="token key atrule">taskmanager</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> flink
    <span class="token key atrule">expose</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;6121&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;6122&#39;</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> jobmanager
    <span class="token key atrule">command</span><span class="token punctuation">:</span> taskmanager
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;jobmanager:jobmanager&#39;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> JOB_MANAGER_RPC_ADDRESS=jobmanager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）执行 docker-compose，命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),p={href:"http://127.0.0.1:8081",target:"_blank",rel:"noopener noreferrer"},m=i(`<h2 id="flink-配置" tabindex="-1"><a class="header-anchor" href="#flink-配置" aria-hidden="true">#</a> Flink 配置</h2><h3 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># jobManager 的IP地址</span>
<span class="token key atrule">jobmanager.rpc.address</span><span class="token punctuation">:</span> localhost

<span class="token comment"># JobManager 的端口号</span>
<span class="token key atrule">jobmanager.rpc.port</span><span class="token punctuation">:</span> <span class="token number">6123</span>

<span class="token comment"># JobManager JVM heap 内存大小</span>
<span class="token key atrule">jobmanager.heap.size</span><span class="token punctuation">:</span> 1024m

<span class="token comment"># TaskManager JVM heap 内存大小</span>
<span class="token key atrule">taskmanager.heap.size</span><span class="token punctuation">:</span> 1024m

<span class="token comment"># 每个 TaskManager 提供的任务 slots 数量大小</span>
<span class="token key atrule">taskmanager.numberOfTaskSlots</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token comment"># 程序默认并行计算的个数</span>
<span class="token key atrule">parallelism.default</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token comment"># 文件系统来源</span>
<span class="token comment"># fs.default-scheme</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高可用配置" tabindex="-1"><a class="header-anchor" href="#高可用配置" aria-hidden="true">#</a> 高可用配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 可以选择 &#39;NONE&#39; 或者 &#39;zookeeper&#39;.</span>
<span class="token comment"># high-availability: zookeeper</span>

<span class="token comment"># 文件系统路径，让 Flink 在高可用性设置中持久保存元数据</span>
<span class="token comment"># high-availability.storageDir: hdfs:///Flink/ha/</span>

<span class="token comment"># zookeeper 集群中仲裁者的机器 ip 和 port 端口号</span>
<span class="token comment"># high-availability.zookeeper.quorum: localhost:2181</span>

<span class="token comment"># 默认是 open，如果 zookeeper security 启用了该值会更改成 creator</span>
<span class="token comment"># high-availability.zookeeper.client.acl: open</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容错和-checkpoint-配置" tabindex="-1"><a class="header-anchor" href="#容错和-checkpoint-配置" aria-hidden="true">#</a> 容错和 checkpoint 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 用于存储和检查点状态</span>
<span class="token comment"># state.backend: filesystem</span>

<span class="token comment"># 存储检查点的数据文件和元数据的默认目录</span>
<span class="token comment"># state.checkpoints.dir: hdfs://namenode-host:port/Flink-checkpoints</span>

<span class="token comment"># savepoints 的默认目标目录(可选)</span>
<span class="token comment"># state.savepoints.dir: hdfs://namenode-host:port/Flink-checkpoints</span>

<span class="token comment"># 用于启用/禁用增量 checkpoints 的标志</span>
<span class="token comment"># state.backend.incremental: false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="web-ui-配置" tabindex="-1"><a class="header-anchor" href="#web-ui-配置" aria-hidden="true">#</a> Web UI 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 基于 Web 的运行时监视器侦听的地址.</span>
<span class="token comment">#jobmanager.web.address: 0.0.0.0</span>

<span class="token comment">#  Web 的运行时监视器端口</span>
<span class="token key atrule">rest.port</span><span class="token punctuation">:</span> <span class="token number">8081</span>
<span class="token comment"># 是否从基于 Web 的 jobmanager 启用作业提交</span>
<span class="token comment"># jobmanager.web.submit.enable: false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高级配置" tabindex="-1"><a class="header-anchor" href="#高级配置" aria-hidden="true">#</a> 高级配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># io.tmp.dirs: /tmp</span>

<span class="token comment"># 是否应在 TaskManager 启动时预先分配 TaskManager 管理的内存</span>
<span class="token comment"># taskmanager.memory.preallocate: false</span>

<span class="token comment"># 类加载解析顺序，是先检查用户代码 jar（“child-first”）还是应用程序类路径（“parent-first”）。 默认设置指示首先从用户代码 jar 加载类</span>
<span class="token comment"># classloader.resolve-order: child-first</span>

<span class="token comment"># 用于网络缓冲区的 JVM 内存的分数。 这决定了 TaskManager 可以同时拥有多少流数据交换通道以及通道缓冲的程度。 如果作业被拒绝或者您收到系统没有足够缓冲区的警告，请增加此值或下面的最小/最大值。 另请注意，“taskmanager.network.memory.min”和“taskmanager.network.memory.max”可能会覆盖此分数</span>

<span class="token comment"># taskmanager.network.memory.fraction: 0.1</span>
<span class="token comment"># taskmanager.network.memory.min: 67108864</span>
<span class="token comment"># taskmanager.network.memory.max: 1073741824</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flink-集群安全配置" tabindex="-1"><a class="header-anchor" href="#flink-集群安全配置" aria-hidden="true">#</a> Flink 集群安全配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 指示是否从 Kerberos ticket 缓存中读取
# security.kerberos.login.use-ticket-cache: true

# 包含用户凭据的 Kerberos 密钥表文件的绝对路径
# security.kerberos.login.keytab: /path/to/kerberos/keytab

# 与 keytab 关联的 Kerberos 主体名称
# security.kerberos.login.principal: flink-user

# 以逗号分隔的登录上下文列表，用于提供 Kerberos 凭据（例如，\`Client，KafkaClient\`使用凭证进行 ZooKeeper 身份验证和 Kafka 身份验证）
# security.kerberos.login.contexts: Client,KafkaClient
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zookeeper-安全配置" tabindex="-1"><a class="header-anchor" href="#zookeeper-安全配置" aria-hidden="true">#</a> Zookeeper 安全配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 覆盖以下配置以提供自定义 ZK 服务名称</span>
<span class="token comment"># zookeeper.sasl.service-name: zookeeper</span>

<span class="token comment"># 该配置必须匹配 &quot;security.kerberos.login.contexts&quot; 中的列表（含有一个）</span>
<span class="token comment"># zookeeper.sasl.login-context-name: Client</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,16),u={href:"https://ci.apache.org/projects/flink/flink-docs-stable/ops/config.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/apache/flink-docker",target:"_blank",rel:"noopener noreferrer"},k={href:"https://zhuanlan.zhihu.com/p/176855301",target:"_blank",rel:"noopener noreferrer"};function b(h,g){const a=t("ExternalLinkIcon");return c(),r("div",null,[o,n("p",null,[e("（4）打开浏览器，访问 "),n("a",p,[e("http://127.0.0.1:8081"),s(a)])]),m,n("ul",null,[n("li",null,[n("a",u,[e("Flink 官方配置文档"),s(a)])]),n("li",null,[n("a",v,[e("Apache Flink Docker Github"),s(a)])]),n("li",null,[n("a",k,[e("借助 Docker 学习大数据：Flink"),s(a)])])])])}const x=l(d,[["render",b],["__file","index.html.vue"]]);export{x as default};
