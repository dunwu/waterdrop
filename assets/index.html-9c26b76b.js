import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as s,a as e,b as r,d as t,e as o}from"./app-2461c513.js";const h={},d=o('<h1 id="网络技术之-cdn" tabindex="-1"><a class="header-anchor" href="#网络技术之-cdn" aria-hidden="true">#</a> 网络技术之 CDN</h1><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/1559138689425.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><h3 id="cdn-是什么" tabindex="-1"><a class="header-anchor" href="#cdn-是什么" aria-hidden="true">#</a> CDN 是什么</h3><p>CDN(<strong>Content Delivery Network</strong>)，即<strong>内容分发网络</strong>。</p><p>CDN 是一个全球性的代理服务器分布式网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。它从靠近用户的位置提供内容。通常，HTML/CSS/JS，图片和视频等静态内容由 CDN 提供。CDN 的 DNS 解析会告知客户端连接哪台服务器。CDN 的关键技术主要有内容存储和分发技术。</p><h3 id="cdn-的优缺点" tabindex="-1"><a class="header-anchor" href="#cdn-的优缺点" aria-hidden="true">#</a> CDN 的优缺点</h3><ul><li>优点 <ul><li><strong>访问加速</strong> - 由于 CDN 就近服务，大大降低了网络传播时延，所以自然提高了访问速度。</li><li><strong>降低负载</strong> - 如果 CDN 已经能获取数据，那么就不必请求源站，这自然降低了源站（服务器）的负载。</li></ul></li><li>缺点 <ul><li>CDN 成本可能因流量而异，可能在权衡之后你将不会使用 CDN。</li><li>如果在 TTL 过期之前更新内容，CDN 缓存内容可能会过时。</li><li>CDN 需要更改静态内容的 URL 地址以指向 CDN。</li></ul></li></ul><h2 id="cdn-原理" tabindex="-1"><a class="header-anchor" href="#cdn-原理" aria-hidden="true">#</a> CDN 原理</h2><p>CDN 的基本原理是：</p><ul><li>广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中；</li><li>在用户访问网站时，实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息来选择最佳缓存服务器；</li><li>然后，将用户的请求重新导向最佳的缓存服务器上，由缓存服务器直接响应用户请求。</li></ul><p>CDN 网络架构主要由两大部分，分为<strong>中心</strong>和<strong>边缘</strong>两部分：</p><ul><li>中心指 CDN 网管中心和 DNS 重定向解析中心，负责全局负载均衡，设备系统安装在管理中心机房；</li><li>边缘主要指异地节点，CDN 分发的载体，主要由 Cache 和负载均衡器等组成。</li></ul><p>CDN 是一个策略性部署的整体系统，包括<strong>分布式存储</strong>、<strong>负载均衡</strong>、<strong>内容管理</strong>和<strong>网络请求的重定向</strong>４个要件。</p><h3 id="分布式存储" tabindex="-1"><a class="header-anchor" href="#分布式存储" aria-hidden="true">#</a> 分布式存储</h3><p>CDN 网络将存储资源分布到各个地理位置、各个网段。存储系统作为 CDN 系统密不可分的一部分，将 CDN 分发的文件和数据库表记录内容存储起来，提供持续服务。存储系统采用三级存储架构，包括核心存储、CDN 服务节点分布式缓存和终端本地缓存。任意一个点的存储崩溃或失效，并不影响系统服务的可用性。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/1559140068433.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如 CDN 系统在 5 大运营商（中国电信、中国网通、中国铁通、中国移动、中国联通）以及 2 大专有网络（中国教育和科研计算机网、中国科技网）都布有 CDN 节点。<strong>这样就消除了不同运营商之间互联的瓶颈造成的影响，实现了跨运营商的网络加速，保证不同网络中的用户都能得到良好的访问质量。</strong></p><h3 id="内容管理" tabindex="-1"><a class="header-anchor" href="#内容管理" aria-hidden="true">#</a> 内容管理</h3><p>内容管理和全局的网络流量管理(Traffic Management)是 CDN 的核心所在。<strong>通过用户就近性和服务器负载的判断，CDN 确保内容以一种极为高效的方式为用户的请求提供服务</strong>。总的来说，内容服务基于<strong>缓存服务器</strong>，也称作<strong>代理缓存(Surrogate)</strong>，它位于网络的边缘，距用户仅有&quot;一跳&quot;(Single Hop)之遥。同时，代理缓存是内容提供商源服务器（通常位于 CDN 服务提供商的数据中心）的一个透明镜像。这样的架构使得 CDN 服务提供商能够代表他们客户，即内容供应商，向最终用户提供尽可能好的体验，而这些用户是不能容忍请求响应时间有任何延迟的。据统计，采用 CDN 技术，能处理整个网站页面的 70%～ 95％的内容访问量，减轻服务器的压力，提升了网站的性能和可扩展性。</p><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><p>CDN 负载均衡系统实现 CDN 的<strong>内容路由功能</strong>。它的作用是将用户的请求导向整个 CDN 网络中的最佳节点。最佳节点的选定可以根据多种策略，例如<strong>距离最近</strong>、<strong>节点负载最轻</strong>等。负载均衡系统是整个 CDN 的核心，负载均衡的准确性和效率直接决定了整个 CDN 的效率和性能。通常负载均衡可以分为两个层次：<strong>全局负载均衡（GSLB）<strong>和</strong>本地负载均衡（SLB）</strong>。</p><h3 id="网络请求的重定向" tabindex="-1"><a class="header-anchor" href="#网络请求的重定向" aria-hidden="true">#</a> 网络请求的重定向</h3><p>当用户访问了使用 CDN 服务的资源时，DNS 域名服务器通过 CNAME 方式将最终域名请求重定向到 CDN 系统中的智能 DNS 负载均衡系统。<strong>智能 DNS 负载均衡系统通过一组预先定义好的策略（如内容类型、地理区域、网络负载状况等），将当时能够最快响应用户的节点地址提供给用户，使用户可以得到快速的服务</strong>。</p><p>同时，它还与分布在不同地点的所有 CDN 节点保持通信，搜集各节点的健康状态，确保不将用户的请求分配到任何一个已经不可用的节点上。</p>',25),c=e("p",null,"参考：",-1),p={href:"https://www.cnblogs.com/skynet/archive/2012/12/18/2824141.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://zhuanlan.zhihu.com/p/39028766",target:"_blank",rel:"noopener noreferrer"},u=o('<h2 id="cdn-访问流程" tabindex="-1"><a class="header-anchor" href="#cdn-访问流程" aria-hidden="true">#</a> CDN 访问流程</h2><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/1559126750010.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ol><li>用户在浏览器中访问域名，域名解析的请求被发往网站的 DNS 域名解析服务器；</li><li>由于网站的 DNS 域名解析服务器对此域名的解析设置了 CNAME，请求被指向 CDN 网络中的智能 DNS 负载均衡系统；</li><li>智能 DNS 负载均衡系统对域名进行智能解析，将响应速度最快的节点 IP 返回给用户；浏览器在得到速度最快节点的 IP 地址以后，向 CDN 节点发出访问请求；</li><li>由于是第一次访问，CDN 节点将回到源站取用户请求的数据并发给用户；</li><li>当有其他用户再次访问同样内容时，CDN 将直接将数据返回给客户，完成请求/服务过程。</li></ol><p>同时，它还与分布在不同地点的所有 CDN 节点保持通信，搜集各节点的健康状态，确保不将用户的请求分配到任何一个已经不可用的节点上。</p>',4),N=e("p",null,"参考：",-1),D={href:"https://www.cnblogs.com/skynet/archive/2012/12/18/2824141.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://zhuanlan.zhihu.com/p/39028766",target:"_blank",rel:"noopener noreferrer"},C=o('<h2 id="推送和拉取" tabindex="-1"><a class="header-anchor" href="#推送和拉取" aria-hidden="true">#</a> 推送和拉取</h2><p>CDN 服务有推送和拉取两种方式：</p><h3 id="cdn-推送" tabindex="-1"><a class="header-anchor" href="#cdn-推送" aria-hidden="true">#</a> CDN 推送</h3><p>当你服务器上内容发生变动时，推送 CDN 接受新内容。直接推送给 CDN 并重写 URL 地址以指向你的内容的 CDN 地址。你可以配置内容到期时间及何时更新。内容只有在更改或新增是才推送，流量最小化，但储存最大化。</p><p>优点在于节省源站带宽，提前将要分发的内容放到 CDN 节点上了，当某个流量高峰来临时，不会把你的源站带宽占满（源站还要留点带宽提供动态 HTML 啊）。</p><p>缺点是需要针对 CDN 做接口开发，在被分发内容生成时主动上传给 CDN。</p><h3 id="cdn-拉取" tabindex="-1"><a class="header-anchor" href="#cdn-拉取" aria-hidden="true">#</a> CDN 拉取</h3><p>CDN 拉取是当第一个用户请求该资源时，从服务器上拉取资源。你将内容留在自己的服务器上并重写 URL 指向 CDN 地址。直到内容被缓存在 CDN 上为止，这样请求只会更慢，</p>',8),f={href:"https://en.wikipedia.org/wiki/Time_to_live",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"高流量站点使用 CDN 拉取效果不错，因为只有最近请求的内容保存在 CDN 中，流量才能更平衡地分散。",-1),b=e("p",null,"优点在于实现简单。",-1),k={href:"https://segmentfault.com/q/1010000000119794",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"资源",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#资源","aria-hidden":"true"},"#"),r(" 资源")],-1),w={href:"https://en.wikipedia.org/wiki/Content_delivery_network",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.cnblogs.com/skynet/archive/2012/12/18/2824141.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://zhuanlan.zhihu.com/p/39028766",target:"_blank",rel:"noopener noreferrer"},L={href:"https://www.cnblogs.com/losbyday/p/5843960.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://segmentfault.com/q/1010000000119794",target:"_blank",rel:"noopener noreferrer"},z={href:"https://staticfile.org/",target:"_blank",rel:"noopener noreferrer"},T={href:"https://unpkg.com/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://cdnjs.com/",target:"_blank",rel:"noopener noreferrer"},j={href:"https://github.com/ossrs/srs",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/jsdelivr/jsdelivr",target:"_blank",rel:"noopener noreferrer"};function E(M,I){const n=l("ExternalLinkIcon");return i(),s("div",null,[d,e("blockquote",null,[c,e("ul",null,[e("li",null,[e("a",p,[r("CDN-内容推送网络"),t(n)])]),e("li",null,[e("a",g,[r("闲话 CDN"),t(n)])])])]),u,e("blockquote",null,[N,e("ul",null,[e("li",null,[e("a",D,[r("CDN-内容推送网络"),t(n)])]),e("li",null,[e("a",_,[r("闲话 CDN"),t(n)])])])]),C,e("p",null,[e("a",f,[r("存活时间（TTL）"),t(n)]),r("决定缓存多久时间。CDN 拉取方式最小化 CDN 上的储存空间，但如果过期文件并在实际更改之前被拉取，则会导致冗余的流量。")]),m,b,e("blockquote",null,[e("p",null,[r("参考："),e("a",k,[r("推送式与拉取式 CDN 服务的优劣问题"),t(n)])])]),x,e("ul",null,[e("li",null,[r("文章 "),e("ul",null,[e("li",null,[e("a",w,[r("Wikipedia - CDN"),t(n)])]),e("li",null,[e("a",S,[r("CDN-内容推送网络"),t(n)])]),e("li",null,[e("a",v,[r("闲话 CDN"),t(n)])]),e("li",null,[e("a",L,[r("CDN 技术详解"),t(n)])]),e("li",null,[e("a",y,[r("推送式与拉取式 CDN 服务的优劣问题"),t(n)])])])]),e("li",null,[r("CDN 资源 "),e("ul",null,[e("li",null,[e("a",z,[r("https://staticfile.org/"),t(n)])]),e("li",null,[e("a",T,[r("https://unpkg.com/"),t(n)])]),e("li",null,[e("a",q,[r("https://cdnjs.com/"),t(n)])]),e("li",null,[e("a",j,[r("https://github.com/ossrs/srs"),t(n)])]),e("li",null,[e("a",B,[r("https://github.com/jsdelivr/jsdelivr"),t(n)])])])])])])}const R=a(h,[["render",E],["__file","index.html.vue"]]);export{R as default};