import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as i,c as l,a as e,b as t,d as n,e as a}from"./app-4c198a3a.js";const c={},h=a('<h1 id="cap-和-base" tabindex="-1"><a class="header-anchor" href="#cap-和-base" aria-hidden="true">#</a> CAP 和 BASE</h1><h2 id="一致性" tabindex="-1"><a class="header-anchor" href="#一致性" aria-hidden="true">#</a> 一致性</h2><p>一致性（Consistency）指的是<strong>多个数据副本是否能保持一致</strong>的特性。</p><p>在一致性的条件下，分布式系统在执行写操作成功后，如果所有用户都能够读取到最新的值，该系统就被认为具有强一致性。</p><p>数据一致性又可以分为以下几点：</p><ul><li><strong>强一致性</strong> - 数据更新操作结果和操作响应总是一致的，即操作响应通知更新失败，那么数据一定没有被更新，而不是处于不确定状态。</li><li><strong>弱一致性</strong> - 系统在写入数据成功后，不承诺立即能读到最新的值，也不承诺什么时候能读到，但是过一段时间之后用户可以看到更新后的值。那么用户读不到最新数据的这段时间被称为“不一致窗口时间”。</li><li><strong>最终一致性</strong> - 最终一致性作为弱一致性中的特例，强调的是所有数据副本，在经过一段时间的同步后，最终能够到达一致的状态，不需要实时保证系统数据的强一致性。</li></ul><h2 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h2><p>ACID 是数据库事务正确执行的四个基本要素的单词缩写：</p><ul><li><strong>原子性（Atomicity）</strong><ul><li>原子是指不可分解为更小粒度的东西。事务的原子性意味着：<strong>事务中的所有操作要么全部成功，要么全部失败</strong>。</li><li>回滚可以用日志来实现，日志记录着事务所执行的修改操作，在回滚时反向执行这些修改操作即可。</li></ul></li><li><strong>一致性（Consistency）</strong><ul><li>数据库在事务执行前后都保持一致性状态。</li><li>在一致性状态下，所有事务对一个数据的读取结果都是相同的。</li></ul></li><li><strong>隔离性（Isolation）</strong><ul><li>同时运行的事务互不干扰。换句话说，一个事务所做的修改在最终提交以前，对其它事务是不可见的。</li></ul></li><li><strong>持久性（Durability）</strong><ul><li>一旦事务提交，则其所做的修改将会永远保存到数据库中。即使系统发生崩溃，事务执行的结果也不能丢失。</li><li>可以通过数据库备份和恢复来实现，在系统发生奔溃时，使用备份的数据库进行数据恢复。</li></ul></li></ul><p>一个支持事务（Transaction）中的数据库系统，必需要具有这四种特性，否则在事务过程（Transaction processing）当中无法保证数据的正确性。</p><ul><li>只有满足一致性，事务的执行结果才是正确的。</li><li>在无并发的情况下，事务串行执行，隔离性一定能够满足。此时只要能满足原子性，就一定能满足一致性。</li><li>在并发的情况下，多个事务并行执行，事务不仅要满足原子性，还需要满足隔离性，才能满足一致性。</li><li>事务满足持久化是为了能应对系统崩溃的情况。</li></ul><h2 id="cap-定理" tabindex="-1"><a class="header-anchor" href="#cap-定理" aria-hidden="true">#</a> CAP 定理</h2><h3 id="cap-简介" tabindex="-1"><a class="header-anchor" href="#cap-简介" aria-hidden="true">#</a> CAP 简介</h3><p>1998 年，Brewer 提出了分布式系统领域大名鼎鼎的 CAP 定理。</p><p>CAP 定理提出：分布式系统有三个指标，这三个指标不能同时做到：</p><ul><li><strong>一致性（Consistency）</strong> - 在任何给定时间，网络中的所有节点都具有完全相同（最近）的值。</li><li><strong>可用性（Availability）</strong> - 对网络的每个请求都会收到响应，但不能保证返回的数据是最新的。</li><li><strong>分区容错性（Partition Tolerance）</strong> - 即使任意数量的节点出现故障，网络仍会继续运行。</li></ul><p>CAP 就是取 Consistency、Availability、Partition Tolerance 的首字母而命名。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/202405160639643.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在分布式系统中，分区容错性是一个既定的事实：因为分布式系统总会出现各种各样的问题，如由于网络原因而导致节点失联；发生机器故障；机器重启或升级等等。因此，<strong>CAP 定理实际上是要在可用性（A）和一致性（C）之间做权衡</strong>。</p><h3 id="ap-模式" tabindex="-1"><a class="header-anchor" href="#ap-模式" aria-hidden="true">#</a> AP 模式</h3><p>对网络的每个请求都会收到响应，即使由于网络分区（故障节点）而无法保证数据一定是最新的。</p><p>选择 <strong>AP 模式</strong>，偏向于保证服务的高可用性。用户访问系统的时候，都能得到响应数据，不会出现响应错误；但是，当出现分区故障时，相同的读操作，访问不同的节点，得到响应数据可能不一样。</p><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20211102191819.png" style="width:500px;"><h3 id="cp-模式" tabindex="-1"><a class="header-anchor" href="#cp-模式" aria-hidden="true">#</a> CP 模式</h3><p>如果由于网络分区（故障节点）而无法保证特定信息是最新的，则系统将返回错误或超时。</p><p>选择 <strong>CP 模式</strong>，一旦因为消息丢失、延迟过高发生了网络分区，就会影响用户的体验和业务的可用性。因为为了防止数据不一致，系统将拒绝新数据的写入。</p><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20211102191820.png" style="width:500px;"><h3 id="cap-定理的应用" tabindex="-1"><a class="header-anchor" href="#cap-定理的应用" aria-hidden="true">#</a> CAP 定理的应用</h3><p>CAP 定理在分布式系统设计中，可以被应用与哪些方面？</p><p>一个最具代表性的问题是：服务注册中心应该选择 AP 还是 CP？</p><p>在微服务架构下，服务注册和服务发现机制中主要有三种角色：</p><ul><li><strong>服务提供者</strong>（RPC Server / Provider）</li><li><strong>服务消费者</strong>（RPC Client / Consumer）</li><li><strong>服务注册中心</strong>（Registry）</li></ul><p><strong>注册中心</strong>负责协调服务注册和服务发现，显然它是核心中的核心。主流的注册中心有很多，如：ZooKeeper、Nacos、Eureka、Consul、etcd 等。在针对注册中心进行技术选型时，其 CAP 设计也是一个比较的维度。</p><ul><li>CP 模型 - 代表有：ZooKeeper、etcd。系统强调数据的一致性，当数据一致性无法保证时（如：正在选举主节点），系统拒绝请求。</li><li>AP 模型 - 代表有：Nacos、Eureka。系统强调可用性，牺牲一定的一致性（即服务节点上的数据不保证是最新的），来保证整体服务可用。</li></ul><p>对于服务注册中心而言，即使不同节点保存的服务注册信息存在差异，也不会造成灾难性的后果，仅仅是信息滞后而已。但是，如果为了追求数据一致性，使得服务发现短时间内不可用，负面影响更严重。</p><p>所以，对于服务注册中心而言，可用性比一致性更重要，所以应该选择 AP 模型。</p><h3 id="cap-定理的误导" tabindex="-1"><a class="header-anchor" href="#cap-定理的误导" aria-hidden="true">#</a> CAP 定理的误导</h3><p>CAP 定理在分布式系统领域大名鼎鼎，以至于被很多人视为了真理。然而，CAP 定理真的正确吗？</p><p>网络分区是一种故障，不管喜欢还是不喜欢，它都可能发生，所以无法选择或逃避分区的问题。在网络正常的时候，系统可以同时保证一致性（线性化）和可用性。而一旦发生了网络故障，必须要么选择一致性，要么选择可用性。因此，对 CAP 更准确的理解应该是：<strong>当发生网络分区（P）的情况下，可用性（A）和一致性（C）二者只能选其一</strong>。</p><p>CAP 定理所描述的模型实际上局限性很大，它只考虑了一种一致性模型和一种故障（网络分区故障），而没有考虑网络延迟、节点失效等情况。因此，它对于指导一个具体的分布式系统设计来说，没有太大的实际价值。</p>',40),d={href:"https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/",target:"_blank",rel:"noopener noreferrer"},p=e("strong",null,"CAP Twelve Years Later: How the “Rules” Have Changed",-1),g=a('<h2 id="base-定理" tabindex="-1"><a class="header-anchor" href="#base-定理" aria-hidden="true">#</a> BASE 定理</h2><p>BASE 是 <strong><code>基本可用（Basically Available）</code></strong>、<strong><code>软状态（Soft State）</code></strong> 和 <strong><code>最终一致性（Eventually Consistent）</code></strong> 三个短语的缩写。BASE 定理是对 CAP 定理中可用性（A）和一致性（C）权衡的结果。</p><p>BASE 定理的核心思想是：即使无法做到强一致性，但每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。</p><ul><li><strong>基本可用（Basically Available）</strong> - 分布式系统在出现故障的时候，<strong>保证核心可用，允许损失部分可用性</strong>。例如，电商在做促销时，为了保证购物系统的稳定性，部分消费者可能会被引导到一个降级的页面。</li><li><strong>软状态（Soft State）</strong> - 指允许系统中的数据存在中间状态，并认为该中间状态不会影响系统整体可用性，即<strong>允许系统不同节点的数据副本之间进行同步的过程存在延时</strong>。</li><li><strong>最终一致性（Eventually Consistent）</strong> - 强调的是所有数据副本，<strong>在经过一段时间的同步后，最终能够到达一致的状态</strong>，不需要实时保证系统数据的强一致性。</li></ul><h2 id="base-vs-acid" tabindex="-1"><a class="header-anchor" href="#base-vs-acid" aria-hidden="true">#</a> BASE vs. ACID</h2><p>BASE 定理的<strong>核心思想</strong>是：即使无法做到强一致性，但每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。</p><p>ACID 要求强一致性，通常运用在传统的数据库系统上。而 BASE 要求最终一致性，通过<strong>牺牲强一致性来达到可用性</strong>，通常运用在大型分布式系统中。</p><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20211102192406.png" style="width:640px;"><p>在实际的分布式场景中，不同业务单元和组件对一致性的要求是不同的，因此 ACID 和 BASE 往往会结合在一起使用。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',10),u={href:"https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf",target:"_blank",rel:"noopener noreferrer"},A=e("strong",null,"Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services",-1),C={href:"https://juejin.cn/post/6844903936718012430",target:"_blank",rel:"noopener noreferrer"},_=e("strong",null,"解读",-1),b={href:"https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"CAP Twelve Years Later: How the “Rules” Have Changed",-1),w={href:"https://www.zhihu.com/question/64778723/answer/224266038",target:"_blank",rel:"noopener noreferrer"},P=e("strong",null,"解读",-1),m={href:"https://www.semanticscholar.org/paper/BASE%3A-An-Acid-Alternative-Pritchett/2e72e6c022dd33115304ecfcb6dad7ea609534a4",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"BASE: An Acid Alternative",-1),x={href:"https://www.cnblogs.com/savorboard/p/base-an-acid-alternative.html",target:"_blank",rel:"noopener noreferrer"},y=e("strong",null,"译文",-1);function B(S,E){const r=o("ExternalLinkIcon");return i(),l("div",null,[h,e("p",null,[t("值得一提的是，在 CAP 定理提出十二年之后，其提出者也发表了一篇文章 "),e("a",d,[p,n(r)]),t("，来阐述 CAP 定理的局限性。")]),g,e("ul",null,[e("li",null,[e("a",u,[A,n(r)]),t("，"),e("a",C,[_,n(r)]),t(" - 经典的 CAP 定理，即：在一个分布式系统中，当发生网络分区时，那么强一致性和可用性只能二选一。")]),e("li",null,[e("a",b,[f,n(r)]),t(", "),e("a",w,[P,n(r)]),t(" - CAP 定理的新解读，并阐述 CAP 定理的一些常见误区。")]),e("li",null,[e("a",m,[v,n(r)]),t("，"),e("a",x,[y,n(r)]),t(" - BASE 定理是对 CAP 中一致性和可用性的权衡，提出采用适当的方式来使系统达到最终一致性。")])])])}const T=s(c,[["render",B],["__file","index.html.vue"]]);export{T as default};