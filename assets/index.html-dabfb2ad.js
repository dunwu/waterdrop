import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r,o,c,a as n,b as s,d as a,e as t}from"./app-0cb71135.js";const l={},i=t('<h1 id="时间服务器-ntp" tabindex="-1"><a class="header-anchor" href="#时间服务器-ntp" aria-hidden="true">#</a> 时间服务器 - NTP</h1><h2 id="ntp-简介" tabindex="-1"><a class="header-anchor" href="#ntp-简介" aria-hidden="true">#</a> NTP 简介</h2><p>网络时间协议（英语：Network Time Protocol，缩写：NTP）是在数据网络潜伏时间可变的计算机系统之间通过分组交换进行时钟同步的一个网络协议，位于 OSI 模型的应用层。自 1985 年以来，NTP 是目前仍在使用的最古老的互联网协议之一。NTP 由特拉华大学的 David L. Mills（英语：David L. Mills）设计。</p><p><strong>NTP 意图将所有参与计算机的协调世界时（UTC）时间同步到几毫秒的误差内</strong>。</p><p>NTP 要点：</p><ul><li>地球共有 24 个时区，而以格林威治时间 (GMT) 为标准时间；</li><li>中国本地时间为 GMT +8 小时；</li><li>最准确的时间为使用原子钟 (Atomic clock) 所计算的，例如 UTC (Coordinated Universal Time) 就是一例；</li><li>Linux 系统本来就有两种时间，一种是 Linux 以 <code>1970/01/01</code> 开始计数的系统时间，一种则是 BIOS 记载的硬件时间；</li><li>Linux 可以透过网络校时，最常见的网络校时为使用 NTP 服务器，这个服务启动在 <code>udp port 123</code>；</li><li>时区档案主要放置于 <code>/usr/share/zoneinfo/</code> 目录下，而本地时区则参考 <code>/etc/localtime</code>；</li><li>NTP 服务器为一种阶层式的服务，所以 NTP 服务器本来就会与上层时间服务器作时间的同步化， 因此 <code>nptd</code> 与 <code>ntpdate</code> 两个指令不可同时使用；</li><li>NTP 服务器的联机状态可以使用 <code>ntpstat</code> 及 <code>ntpq -p</code> 来查询；</li><li>NTP 提供的客户端软件为 <code>ntpdate</code> 这个指令；</li><li>在 Linux 下想要手动处理时间时，需以 <code>date</code> 设定时间后，以 <code>hwclock -w</code> 来写入 BIOS 所记录的时间。</li><li>NTP 服务器之间的时间误差不可超过 1000 秒，否则 NTP 服务会自动关闭。</li></ul>',6),d={href:"http://cn.linux.vbird.org/linux_server/0440ntp.php",target:"_blank",rel:"noopener noreferrer"},m=t(`<h2 id="ntpd-服务" tabindex="-1"><a class="header-anchor" href="#ntpd-服务" aria-hidden="true">#</a> ntpd 服务</h2><blockquote><p>环境：CentOS</p></blockquote><h3 id="yum-安装" tabindex="-1"><a class="header-anchor" href="#yum-安装" aria-hidden="true">#</a> yum 安装</h3><p>CentOS 安装 NTP 很简单，执行以下命令即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ntpd-配置" tabindex="-1"><a class="header-anchor" href="#ntpd-配置" aria-hidden="true">#</a> ntpd 配置</h3><p>ntp 的配置文件路径为： <code>/etc/ntp.conf</code> ，参考配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 先处理权限方面的问题，包括放行上层服务器以及开放区网用户来源：</span>
<span class="token comment"># restrict default kod nomodify notrap nopeer noquery     # 拒绝 IPv4 的用户</span>
<span class="token comment"># restrict -6 default kod nomodify notrap nopeer noquery  # 拒绝 IPv6 的用户</span>
restrict default nomodify notrap nopeer noquery
<span class="token comment">#restrict 192.168.100.0 mask 255.255.255.0 nomodify # 放行同局域网来源（根据网关和子网掩码决定）</span>
restrict <span class="token number">127.0</span>.0.1   <span class="token comment"># 默认值，放行本机 IPv4 来源</span>
restrict ::1         <span class="token comment"># 默认值，放行本机 IPv6 来源</span>

<span class="token comment"># 2. 设定 NTP 主机来源</span>
<span class="token comment"># 注释掉默认 NTP 来源</span>
<span class="token comment"># server 0.centos.pool.ntp.org iburst</span>
<span class="token comment"># server 1.centos.pool.ntp.org iburst</span>
<span class="token comment"># server 2.centos.pool.ntp.org iburst</span>
<span class="token comment"># server 3.centos.pool.ntp.org iburst</span>
<span class="token comment"># 设置国内 NTP 来源</span>
server cn.pool.ntp.org prefer <span class="token comment"># 以这个主机为优先</span>
server ntp1.aliyun.com
server ntp.sjtu.edu.cn

<span class="token comment"># 3. 预设时间差异分析档案与暂不用到的 keys 等，不需要更改它：</span>
driftfile /var/lib/ntp/drift
keys /etc/ntp/keys
includefile /etc/ntp/crypto/pw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：如果更改配置，必须重启 NTP 服务（<code>systemctl restart ntpd</code>）才能生效。</p></blockquote><h3 id="放开防火墙限制" tabindex="-1"><a class="header-anchor" href="#放开防火墙限制" aria-hidden="true">#</a> 放开防火墙限制</h3><p>NTP 服务的端口是 <code>123</code>，使用的是 udp 协议，所以 NTP 服务器的防火墙必须对外开放 udp 123 这个端口。</p><p>如果防火墙使用 <strong><code>iptables</code></strong>，执行以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> UDP <span class="token parameter variable">-i</span> eth0 <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.0.0/24 <span class="token parameter variable">--dport</span> <span class="token number">123</span> <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果防火墙使用 <strong><code>firewalld</code></strong>，执行以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">123</span>/udp <span class="token parameter variable">--permanent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ntpd-服务命令" tabindex="-1"><a class="header-anchor" href="#ntpd-服务命令" aria-hidden="true">#</a> ntpd 服务命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> ntpd.service  <span class="token comment"># 开启服务（开机自动启动服务）</span>
systemctl disable ntpd.service <span class="token comment"># 关闭服务（开机不会自动启动服务）</span>
systemctl start ntpd.service   <span class="token comment"># 启动服务</span>
systemctl stop ntpd.service    <span class="token comment"># 停止服务</span>
systemctl restart ntpd.service <span class="token comment"># 重启服务</span>
systemctl reload ntpd.service  <span class="token comment"># 重新载入配置</span>
systemctl status ntpd.service  <span class="token comment"># 查看服务状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看-ntp-服务状态" tabindex="-1"><a class="header-anchor" href="#查看-ntp-服务状态" aria-hidden="true">#</a> 查看 ntp 服务状态</h3><h4 id="验证-ntp-服务正常工作" tabindex="-1"><a class="header-anchor" href="#验证-ntp-服务正常工作" aria-hidden="true">#</a> 验证 NTP 服务正常工作</h4><p>执行 <code>ntpstat</code> 可以查看 ntp 服务器有无和上层 ntp 连通，，如果成功，可以看到类似以下的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ntpstat
synchronised to NTP server <span class="token punctuation">(</span><span class="token number">5.79</span>.108.34<span class="token punctuation">)</span> at stratum <span class="token number">3</span>
   <span class="token function">time</span> correct to within <span class="token number">1129</span> ms
   polling server every <span class="token number">64</span> s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看-ntp-服务器与上层-ntp-的状态" tabindex="-1"><a class="header-anchor" href="#查看-ntp-服务器与上层-ntp-的状态" aria-hidden="true">#</a> 查看 ntp 服务器与上层 ntp 的状态</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ntpq <span class="token parameter variable">-p</span>
     remote           refid      st t when poll reach   delay   offset  jitter
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
*ntp1.ams1.nl.le <span class="token number">130.133</span>.1.10     <span class="token number">2</span> u   <span class="token number">36</span>   <span class="token number">64</span>  <span class="token number">367</span>  <span class="token number">230.801</span>    <span class="token number">5.271</span>   <span class="token number">2.791</span>
 <span class="token number">120.25</span>.115.20   <span class="token number">10.137</span>.53.7      <span class="token number">2</span> u   <span class="token number">33</span>   <span class="token number">64</span>  <span class="token number">377</span>   <span class="token number">25.930</span>   <span class="token number">15.908</span>   <span class="token number">3.168</span>
 time.cloudflare <span class="token number">10.21</span>.8.251      <span class="token number">3</span> u   <span class="token number">31</span>   <span class="token number">64</span>  <span class="token number">367</span>  <span class="token number">251.109</span>   <span class="token number">16.976</span>   <span class="token number">3.264</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ntpdate-命令" tabindex="-1"><a class="header-anchor" href="#ntpdate-命令" aria-hidden="true">#</a> ntpdate 命令</h2><blockquote><p>注意：NTP 服务器为一种阶层式的服务，所以 NTP 服务器本来就会与上层时间服务器作时间的同步化， 因此 <code>nptd</code> 与 <code>ntpdate</code> 两个指令不可同时使用。</p></blockquote><h3 id="手动执行时间同步" tabindex="-1"><a class="header-anchor" href="#手动执行时间同步" aria-hidden="true">#</a> 手动执行时间同步</h3><p><code>ntpdate</code> 命令是 NTP 的客户端软件，它可以用于请求时间同步。</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/usr/sbin/ntpdate <span class="token operator">&lt;</span>ntp_server<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ntp_server</code> 可以从 [国内 NTP 服务器](#国内 NTP 服务器) 中选择。</p><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ntpdate cn.pool.ntp.org
<span class="token number">11</span> Feb <span class="token number">10</span>:47:12 ntpdate<span class="token punctuation">[</span><span class="token number">30423</span><span class="token punctuation">]</span>: step <span class="token function">time</span> server <span class="token number">84.16</span>.73.33 offset <span class="token parameter variable">-49.894774</span> sec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动定时同步时间" tabindex="-1"><a class="header-anchor" href="#自动定时同步时间" aria-hidden="true">#</a> 自动定时同步时间</h3><p>如果需要自动定时同步时间，可以利用 <a href="#crontab">Crontab</a> 工具。本质就是用 crontab 定时执行一次手动时间同步命令 ntp。</p><p>示例：执行如下命令，就可以在每天凌晨 3 点同步系统时间：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;0 3 * * * /usr/sbin/ntpdate cn.pool.ntp.org&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/crontab <span class="token comment"># 修改 crond 服务配置</span>
systemctl restart crond <span class="token comment"># 重启 crond 服务以生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、国内-ntp-服务器" tabindex="-1"><a class="header-anchor" href="#四、国内-ntp-服务器" aria-hidden="true">#</a> 四、国内 NTP 服务器</h2><p>以下 NTP 服务器搜集自网络：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cn.pool.ntp.org  <span class="token comment"># 最常用的国内NTP服务器，参考：https://www.ntppool.org/zh/use.html</span>
cn.ntp.org.cn    <span class="token comment"># 中国</span>
edu.ntp.org.cn   <span class="token comment"># 中国教育网</span>
ntp1.aliyun.com  <span class="token comment"># 阿里云</span>
ntp2.aliyun.com  <span class="token comment"># 阿里云</span>
ntp.sjtu.edu.cn  <span class="token comment"># 上海交通大学</span>
s1a.time.edu.cn  <span class="token comment"># 北京邮电大学</span>
s1b.time.edu.cn  <span class="token comment"># 清华大学</span>
s1c.time.edu.cn  <span class="token comment"># 北京大学</span>
s1d.time.edu.cn  <span class="token comment"># 东南大学</span>
s1e.time.edu.cn  <span class="token comment"># 清华大学</span>
s2a.time.edu.cn  <span class="token comment"># 清华大学</span>
s2b.time.edu.cn  <span class="token comment"># 清华大学</span>
s2c.time.edu.cn  <span class="token comment"># 北京邮电大学</span>
s2d.time.edu.cn  <span class="token comment"># 西南地区网络中心</span>
s2e.time.edu.cn  <span class="token comment"># 西北地区网络中心</span>
s2f.time.edu.cn  <span class="token comment"># 东北地区网络中心</span>
s2g.time.edu.cn  <span class="token comment"># 华东南地区网络中心</span>
s2h.time.edu.cn  <span class="token comment"># 四川大学网络管理中心</span>
s2j.time.edu.cn  <span class="token comment"># 大连理工大学网络中心</span>
s2k.time.edu.cn  <span class="token comment"># CERNET桂林主节点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,40),u={href:"http://cn.linux.vbird.org/linux_server/0440ntp.php",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.cnblogs.com/quchunhui/p/7658853.html",target:"_blank",rel:"noopener noreferrer"};function b(k,h){const e=r("ExternalLinkIcon");return o(),c("div",null,[i,n("blockquote",null,[n("p",null,[s("更多 NTP 详情可以参考："),n("a",d,[s("鸟哥的 Linux 私房菜-- NTP 时间服务器"),a(e)])])]),m,n("ul",null,[n("li",null,[n("a",u,[s("鸟哥的 Linux 私房菜-- NTP 时间服务器"),a(e)])]),n("li",null,[n("a",v,[s("Linux 配置 ntp 时间服务器"),a(e)])])])])}const x=p(l,[["render",b],["__file","index.html.vue"]]);export{x as default};