import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c,a,b as n,d as e,e as t}from"./app-3113b888.js";const o={},r=t(`<h1 id="samba-应用" tabindex="-1"><a class="header-anchor" href="#samba-应用" aria-hidden="true">#</a> Samba 应用</h1><blockquote><p>samba 是在 Linux 和 UNIX 系统上实现 SMB 协议的一个免费软件。</p><p>samba 提供了在不同计算机（即使操作系统不同）上共享服务的能力。</p><p>关键词：<code>samba</code>, <code>selinux</code></p></blockquote><h2 id="安装配置-samba" tabindex="-1"><a class="header-anchor" href="#安装配置-samba" aria-hidden="true">#</a> 安装配置 samba</h2><p>本文将以一个完整的示例来展示如何配置 samba 来实现 Linux 和 Windows 的文件共享。</p><p>目标：假设希望共享 Linux 服务器上的 /share/fs 目录。</p><h3 id="查看是否已经安装-samba" tabindex="-1"><a class="header-anchor" href="#查看是否已经安装-samba" aria-hidden="true">#</a> 查看是否已经安装 samba</h3><ul><li>CentOS：<code>rpm -qa | grep samba</code></li><li>Ubuntu：<code>dpkg -l | grep samba</code></li></ul><h3 id="安装-samba-工具" tabindex="-1"><a class="header-anchor" href="#安装-samba-工具" aria-hidden="true">#</a> 安装 samba 工具</h3><ul><li>CentOS：<code>yum install -y samba samba-client samba-common</code></li><li>Ubuntu：<code>sudo apt-get install -y samba samba-client</code></li></ul><h3 id="配置-samba" tabindex="-1"><a class="header-anchor" href="#配置-samba" aria-hidden="true">#</a> 配置 samba</h3><p>samba 服务的配置文件是 <code>/etc/samba/smb.conf</code>，如果没有则 samba 无法启动。</p><p>执行以下命令，编辑配置文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/samba/smb.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置如下：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">SAMBA</span>
        <span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">user</span>

        <span class="token key attr-name">passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">tdbsam</span>

        <span class="token key attr-name">printing</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
        <span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
        <span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">cups options</span> <span class="token punctuation">=</span> <span class="token value attr-value">raw</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">homes</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Home Directories</span>
        <span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">%S, %D%w%S</span>
        <span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
        <span class="token key attr-name">read only</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
        <span class="token key attr-name">inherit acls</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">printers</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">All Printers</span>
        <span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/tmp</span>
        <span class="token key attr-name">printable</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>
        <span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0600</span>
        <span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">print$</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Printer Drivers</span>
        <span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/lib/samba/drivers</span>
        <span class="token key attr-name">write list</span> <span class="token punctuation">=</span> <span class="token value attr-value">@printadmin root</span>
        <span class="token key attr-name">force group</span> <span class="token punctuation">=</span> <span class="token value attr-value">@printadmin</span>
        <span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0664</span>
        <span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0775</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">fs</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">share folder</span>
        <span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/share/fs</span>
        <span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">read only</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
        <span class="token key attr-name">guest ok</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
        <span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
        <span class="token key attr-name">public</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>说明：</p><ul><li>我在这里添加了一个 <strong>[fs]</strong> 标签，这就是共享区域的配置。</li><li>这里设置 <code>path</code> 属性为 <code>/share/fs</code>，意味着准备共享 <code>/share/fs</code> 目录，需要根据实际需要设置路径。<code>/share/fs</code> 目录的权限要设置为 <strong>777</strong>：<code>chmod 777 /share/fs</code>。</li><li><code>browseable</code>、<code>writable</code> 等属性就比较容易理解了，即配置共享目录的访问权限。</li><li><code>valid users</code> 属性指定允许访问的用户，需要注意的是指定的用户必须是 Linux 机器上实际存在的用户。</li></ul></blockquote><h3 id="创建-samba-用户" tabindex="-1"><a class="header-anchor" href="#创建-samba-用户" aria-hidden="true">#</a> 创建 samba 用户</h3><p>创建的 samba 用户必须是 Linux 机器上实际存在的用户。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> smbpasswd <span class="token parameter variable">-a</span> root
New SMB password:
Retype new SMB password:
Added user root.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据提示输入 samba 用户的密码。当 samba 服务成功安装、启动后，通过 Windows 系统访问机器共享目录时，就要输入这里配置的用户名、密码。</p><ul><li>查看 samba 服务器中已拥有哪些用户 - <code>pdbedit -L</code></li><li>删除 samba 服务中的某个用户 - <code>smbpasswd -x 用户名</code></li></ul><h3 id="启动-samba-服务" tabindex="-1"><a class="header-anchor" href="#启动-samba-服务" aria-hidden="true">#</a> 启动 samba 服务</h3><p>CentOS 6</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">service</span> samba restart  <span class="token comment"># 重启 samba</span>
$ <span class="token function">sudo</span> <span class="token function">service</span> smb restart    <span class="token comment"># 重启 samba</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>CentOS 7</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl start smb.service     <span class="token comment"># 启动 samba</span>
$ <span class="token function">sudo</span> systemctl restart smb.service   <span class="token comment"># 重启 samba</span>
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> smb.service    <span class="token comment"># 设置开机自动启动</span>
$ <span class="token function">sudo</span> systemctl status smb.service    <span class="token comment"># 查询 samba 状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ubuntu 16.04.3</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ sudo service smbd restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="为-samba-添加防火墙规则" tabindex="-1"><a class="header-anchor" href="#为-samba-添加防火墙规则" aria-hidden="true">#</a> 为 samba 添加防火墙规则</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ sudo firewall-cmd --permanent --zone=public --add-service=samba
$ sudo firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试-samba-服务" tabindex="-1"><a class="header-anchor" href="#测试-samba-服务" aria-hidden="true">#</a> 测试 samba 服务</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ smbclient //localhost/fs -U root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入 samba 用户的密码，如果成功，就会进入 <code>smb: \\&gt;</code>。</p><h3 id="访问-samba-服务共享的目录" tabindex="-1"><a class="header-anchor" href="#访问-samba-服务共享的目录" aria-hidden="true">#</a> 访问 samba 服务共享的目录</h3><p>Windows：</p><p>访问：<code>\\\\&lt;你的ip&gt;\\&lt;你的共享路径&gt;</code> ：</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/snap/20180920180928161334.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Mac：</p><p>与 Windows 类似，直接在 Finder 中访问 <code>smb://&lt;你的ip&gt;/&lt;你的共享路径&gt;</code> 即可。</p><h2 id="配置详解" tabindex="-1"><a class="header-anchor" href="#配置详解" aria-hidden="true">#</a> 配置详解</h2><h3 id="samba-默认配置" tabindex="-1"><a class="header-anchor" href="#samba-默认配置" aria-hidden="true">#</a> samba 默认配置</h3>`,41),u={href:"https://git.samba.org/samba.git/?p=samba.git;a=blob_plain;f=examples/smb.conf.default;hb=HEAD",target:"_blank",rel:"noopener noreferrer"},d=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
$ wget &quot;https://git.samba.org/samba.git/?p=samba.git;a=blob_plain;f=examples/smb.conf.default;hb=HEAD&quot; -O /etc/samba/smb.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>smb.conf 默认内容如下：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">SAMBA</span>
        <span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">user</span>

        <span class="token key attr-name">passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">tdbsam</span>

        <span class="token key attr-name">printing</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
        <span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
        <span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
        <span class="token key attr-name">cups options</span> <span class="token punctuation">=</span> <span class="token value attr-value">raw</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">homes</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Home Directories</span>
        <span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">%S, %D%w%S</span>
        <span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
        <span class="token key attr-name">read only</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
        <span class="token key attr-name">inherit acls</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">printers</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">All Printers</span>
        <span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/tmp</span>
        <span class="token key attr-name">printable</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>
        <span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0600</span>
        <span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">print$</span><span class="token punctuation">]</span></span>
        <span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Printer Drivers</span>
        <span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/lib/samba/drivers</span>
        <span class="token key attr-name">write list</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
        <span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0664</span>
        <span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0775</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局参数-global" tabindex="-1"><a class="header-anchor" href="#全局参数-global" aria-hidden="true">#</a> 全局参数 [global]</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>

<span class="token key attr-name">config file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/local/samba/lib/smb.conf.%m</span>
<span class="token key attr-name">说明：config file可以让你使用另一个配置文件来覆盖缺省的配置文件。如果文件 不存在，则该项无效。这个参数很有用，可以使得samba配置更灵活，可以让一台samba服务器模拟多台不同配置的服务器。比如，你想让PC1（主机名）这台电脑在访问Samba Server时使用它自己的配置文件，那么先在/etc/samba/host/下为PC1配置一个名为smb.conf.pc1的文件，然后在smb.conf中加入：config file</span><span class="token punctuation">=</span><span class="token value attr-value">/etc/samba/host/smb.conf.%m。这样当PC1请求连接Samba Server时，smb.conf.%m就被替换成smb.conf.pc1。这样，对于PC1来说，它所使用的Samba服务就是由smb.conf.pc1定义的，而其他机器访问Samba Server则还是应用smb.conf。</span>

<span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">WORKGROUP</span>
说明：设定 Samba Server 所要加入的工作组或者域。

<span class="token key attr-name">server string</span> <span class="token punctuation">=</span> <span class="token value attr-value">Samba Server Version %v</span>
说明：设定 Samba Server 的注释，可以是任何字符串，也可以不填。宏%v表示显示Samba的版本号。

<span class="token key attr-name">netbios name</span> <span class="token punctuation">=</span> <span class="token value attr-value">smbserver</span>
说明：设置Samba Server的NetBIOS名称。如果不填，则默认会使用该服务器的DNS名称的第一部分。netbios name和workgroup名字不要设置成一样了。

<span class="token key attr-name">interfaces</span> <span class="token punctuation">=</span> <span class="token value attr-value">lo eth0 192.168.12.2/24 192.168.13.2/24</span>
说明：设置Samba Server监听哪些网卡，可以写网卡名，也可以写该网卡的IP地址。

<span class="token key attr-name">hosts allow</span> <span class="token punctuation">=</span> <span class="token value attr-value">127.192.168.1 192.168.10.1</span>
说明：表示允许连接到Samba Server的客户端，多个参数以空格隔开。可以用一个IP表示，也可以用一个网段表示。hosts deny 与hosts allow 刚好相反。
例如：
<span class="token comment"># 表示容许来自172.17.2.*.*的主机连接，但排除172.17.2.50</span>
<span class="token key attr-name">hosts allow</span><span class="token punctuation">=</span><span class="token value attr-value">172.17.2.EXCEPT172.17.2.50</span>
<span class="token comment"># 表示容许来自172.17.2.0/255.255.0.0子网中的所有主机连接</span>
<span class="token key attr-name">hosts allow</span><span class="token punctuation">=</span><span class="token value attr-value">172.17.2.0/255.255.0.0</span>
<span class="token comment"># 表示容许来自M1和M2两台计算机连接</span>
<span class="token key attr-name">hosts allow</span><span class="token punctuation">=</span><span class="token value attr-value">M1，M2</span>
<span class="token comment"># 表示容许来自SC域的所有计算机连接</span>
<span class="token key attr-name">hosts allow</span><span class="token punctuation">=</span><span class="token value attr-value">@SC</span>
<span class="token key attr-name">max connections</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
说明：max connections用来指定连接Samba Server的最大连接数目。如果超出连接数目，则新的连接请求将被拒绝。0表示不限制。

<span class="token key attr-name">deadtime</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
说明：deadtime用来设置断掉一个没有打开任何文件的连接的时间。单位是分钟，0代表Samba Server不自动切断任何连接。

<span class="token key attr-name">time server</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：time server用来设置让nmdb成为windows客户端的时间服务器。

<span class="token key attr-name">log file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/samba/log.%m</span>
说明：设置Samba Server日志文件的存储位置以及日志文件名称。在文件名后加个宏%m（主机名），表示对每台访问Samba Server的机器都单独记录一个日志文件。如果pc1、pc2访问过Samba Server，就会在/var/log/samba目录下留下log.pc1和log.pc2两个日志文件。

<span class="token key attr-name">max log size</span> <span class="token punctuation">=</span> <span class="token value attr-value">50</span>
说明：设置Samba Server日志文件的最大容量，单位为kB，0代表不限制。

<span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">user</span>
说明：设置用户访问Samba Server的验证方式，一共有四种验证方式。
1. share：用户访问Samba Server不需要提供用户名和口令, 安全性能较低。
2. user：Samba Server共享目录只能被授权的用户访问,由Samba Server负责检查账号和密码的正确性。账号和密码要在本Samba Server中建立。
3. server：依靠其他Windows NT/2000或Samba Server来验证用户的账号和密码,是一种代理验证。此种安全模式下,系统管理员可以把所有的Windows用户和口令集中到一个NT系统上,使用Windows NT进行Samba认证, 远程服务器可以自动认证全部用户和口令,如果认证失败,Samba将使用用户级安全模式作为替代的方式。
4. domain：域安全级别,使用主域控制器(PDC)来完成认证。

<span class="token key attr-name">passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">tdbsam</span>
说明：passdb backend就是用户后台的意思。目前有三种后台：smbpasswd、tdbsam和ldapsam。sam应该是security account manager（安全账户管理）的简写。

smbpasswd：该方式是使用smb自己的工具smbpasswd来给系统用户（真实
用户或者虚拟用户）设置一个Samba密码，客户端就用这个密码来访问Samba的资源。
1. smbpasswd文件默认在/etc/samba目录下，不过有时候要手工建立该文件。
2. tdbsam：该方式则是使用一个数据库文件来建立用户数据库。数据库文件叫passdb.tdb，默认在/etc/samba目录下。passdb.tdb用户数据库可以使用smbpasswd –a来建立Samba用户，不过要建立的Samba用户必须先是系统用户。我们也可以使用pdbedit命令来建立Samba账户。pdbedit命令的参数很多，我们列出几个主要的。
  pdbedit –a username：新建Samba账户。
  pdbedit –x username：删除Samba账户。
  pdbedit –L：列出Samba用户列表，读取passdb.tdb数据库文件。
  pdbedit –Lv：列出Samba用户列表的详细信息。
  pdbedit –c “[D]” –u username：暂停该Samba用户的账号。
  pdbedit –c “[]” –u username：恢复该Samba用户的账号。
<span class="token key attr-name">3. ldapsam：该方式则是基于LDAP的账户管理方式来验证用户。首先要建立LDAP服务，然后设置“passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">ldapsam:ldap://LDAP Server”</span>

<span class="token key attr-name">encrypt passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：是否将认证密码加密。因为现在windows操作系统都是使用加密密码，所以一般要开启此项。不过配置文件默认已开启。

<span class="token key attr-name">smb passwd file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/samba/smbpasswd</span>
说明：用来定义samba用户的密码文件。smbpasswd文件如果没有那就要手工新建。

<span class="token key attr-name">username map</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/samba/smbusers</span>
<span class="token key attr-name">说明：用来定义用户名映射，比如可以将root换成administrator、admin等。不过要事先在smbusers文件中定义好。比如：root</span> <span class="token punctuation">=</span> <span class="token value attr-value">administrator admin，这样就可以用administrator或admin这两个用户来代替root登陆Samba Server，更贴近windows用户的习惯。</span>

<span class="token key attr-name">guest account</span> <span class="token punctuation">=</span> <span class="token value attr-value">nobody</span>
说明：用来设置guest用户名。

<span class="token key attr-name">socket options</span> <span class="token punctuation">=</span> <span class="token value attr-value">TCP_NODELAY SO_RCVBUF=8192 SO_SNDBUF=8192</span>
说明：用来设置服务器和客户端之间会话的Socket选项，可以优化传输速度。

<span class="token key attr-name">domain master</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置Samba服务器是否要成为网域主浏览器，网域主浏览器可以管理跨子网域的浏览服务。

<span class="token key attr-name">local master</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：local master用来指定Samba Server是否试图成为本地网域主浏览器。如果设为no，则永远不会成为本地网域主浏览器。但是即使设置为yes，也不等于该Samba Server就能成为主浏览器，还需要参加选举。

<span class="token key attr-name">preferred master</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置Samba Server一开机就强迫进行主浏览器选举，可以提高Samba Server成为本地网域主浏览器的机会。如果该参数指定为yes时，最好把domain master也指定为yes。使用该参数时要注意：如果在本Samba Server所在的子网有其他的机器（不论是windows NT还是其他Samba Server）也指定为首要主浏览器时，那么这些机器将会因为争夺主浏览器而在网络上大发广播，影响网络性能。如果同一个区域内有多台Samba Server，将上面三个参数设定在一台即可。

<span class="token key attr-name">os level</span> <span class="token punctuation">=</span> <span class="token value attr-value">200</span>
说明：设置samba服务器的os level。该参数决定Samba Server是否有机会成为本地网域的主浏览器。os level从0到255，winNT的os level是32，win95/98的os level是1。Windows 2000的os level是64。如果设置为0，则意味着Samba Server将失去浏览选择。如果想让Samba Server成为PDC，那么将它的os level值设大些。

<span class="token key attr-name">domain logons</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置Samba Server是否要做为本地域控制器。主域控制器和备份域控制器都需要开启此项。

<span class="token key attr-name">logon .</span> <span class="token punctuation">=</span> <span class="token value attr-value">%u.bat</span>
说明：当使用者用windows客户端登陆，那么Samba将提供一个登陆档。如果设置成%u.bat，那么就要为每个用户提供一个登陆档。如果人比较多，那就比较麻烦。可以设置成一个具体的文件名，比如start.bat，那么用户登陆后都会去执行start.bat，而不用为每个用户设定一个登陆档了。这个文件要放置在[netlogon]的path设置的目录路径下。

<span class="token key attr-name">wins support</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置samba服务器是否提供wins服务。

<span class="token key attr-name">wins server</span> <span class="token punctuation">=</span> <span class="token value attr-value">wins服务器IP地址</span>
说明：设置Samba Server是否使用别的wins服务器提供wins服务。

<span class="token key attr-name">wins proxy</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置Samba Server是否开启wins代理服务。

<span class="token key attr-name">dns proxy</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置Samba Server是否开启dns代理服务。

<span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：设置是否在启动Samba时就共享打印机。

<span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
说明：设置共享打印机的配置文件。

<span class="token key attr-name">printing</span> <span class="token punctuation">=</span> <span class="token value attr-value">cups</span>
说明：设置Samba共享打印机的类型。现在支持的打印系统有：bsd, sysv, plp, lprng, aix, hpux, qnx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="共享参数-共享名" tabindex="-1"><a class="header-anchor" href="#共享参数-共享名" aria-hidden="true">#</a> 共享参数 [共享名]</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">共享名</span><span class="token punctuation">]</span></span>

<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">任意字符串</span>
说明：comment是对该共享的描述，可以是任意字符串。

<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">共享目录路径</span>
<span class="token key attr-name">说明：path用来指定共享目录的路径。可以用%u、%m这样的宏来代替路径里的unix用户和客户机的Netbios名，用宏表示主要用于[homes]共享域。例如：如果我们不打算用home段做为客户的共享，而是在/home/share/下为每个Linux用户以他的用户名建个目录，作为他的共享目录，这样path就可以写成：path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/home/share/%u; 。用户在连接到这共享时具体的路径会被他的用户名代替，要注意这个用户名路径一定要存在，否则，客户机在访问时会找不到网络路径。同样，如果我们不是以用户来划分目录，而是以客户机来划分目录，为网络上每台可以访问samba的机器都各自建个以它的netbios名的路径，作为不同机器的共享资源，就可以这样写：path = /home/share/%m 。</span>

<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：browseable用来指定该共享是否可以浏览。

<span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：writable用来指定该共享路径是否可写。

<span class="token key attr-name">available</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：available用来指定该共享资源是否可用。

<span class="token key attr-name">admin users</span> <span class="token punctuation">=</span> <span class="token value attr-value">该共享的管理者</span>
<span class="token key attr-name">说明：admin users用来指定该共享的管理员（对该共享具有完全控制权限）。在samba 3.0中，如果用户验证方式设置成“security</span><span class="token punctuation">=</span><span class="token value attr-value">share”时，此项无效。</span>
<span class="token key attr-name">例如：admin users</span> <span class="token punctuation">=</span><span class="token value attr-value">bobyuan，jane（多个用户中间用逗号隔开）。</span>

<span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">允许访问该共享的用户</span>
说明：valid users用来指定允许访问该共享资源的用户。
<span class="token key attr-name">例如：valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">bobyuan，@bob，@tech（多个用户或者组中间用逗号隔开，如果要加入一个组就用“@+组名”表示。）</span>

<span class="token key attr-name">invalid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">禁止访问该共享的用户</span>
说明：invalid users用来指定不允许访问该共享资源的用户。
<span class="token key attr-name">例如：invalid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">root，@bob（多个用户或者组中间用逗号隔开。）</span>

<span class="token key attr-name">write list</span> <span class="token punctuation">=</span> <span class="token value attr-value">允许写入该共享的用户</span>
说明：write list用来指定可以在该共享下写入文件的用户。
<span class="token key attr-name">例如：write list</span> <span class="token punctuation">=</span> <span class="token value attr-value">bobyuan，@bob</span>

<span class="token key attr-name">public</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：public用来指定该共享是否允许guest账户访问。

<span class="token key attr-name">guest ok</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes/no</span>
说明：意义同“public”。

几个特殊共享：
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">homes</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Home Directories</span>
<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">%S</span>
<span class="token comment">; valid users = MYDOMAIN\\%S</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">printers</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">All Printers</span>
<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/spool/samba</span>
<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">guest ok</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">printable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">netlogon</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Network Logon Service</span>
<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/lib/samba/netlogon</span>
<span class="token key attr-name">guest ok</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">share modes</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Profiles</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/lib/samba/profiles</span>
<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">guest ok</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2><h3 id="你可能没有权限访问网络资源" tabindex="-1"><a class="header-anchor" href="#你可能没有权限访问网络资源" aria-hidden="true">#</a> 你可能没有权限访问网络资源</h3><p>问题现象：</p><ul><li>出现 <strong>NT_STATUS_ACCESS_DENIED</strong> 错误</li><li>Windows 下成功登陆 samba 后，点击共享目录仍然提示——你可能没有权限访问网络资源。</li></ul><p>解决步骤：</p><ol><li>检查是否配置了防火墙规则</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 一种方法是强行关闭防火墙</span>
$ <span class="token function">sudo</span> <span class="token function">service</span> iptables stop

<span class="token comment"># 另一种方法是配置防火墙规则</span>
$ <span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-service<span class="token operator">=</span>samba
$ <span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>关闭 selinux</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将 /etc/selinux/config 文件中的 SELINUX 设为 disabled</span>
$ <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/&#39;</span> /etc/selinux/config

<span class="token comment"># 重启生效</span>
$ <span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="window-下对-samba-的清理操作" tabindex="-1"><a class="header-anchor" href="#window-下对-samba-的清理操作" aria-hidden="true">#</a> window 下对 samba 的清理操作</h3><ol><li>windows 清除访问 samba 局域网密码缓存 <ul><li>在 dos 窗口中输入 <code>control userpasswords2</code> 或者 <code>control keymgr.dll</code>，然后【高级】/【密码管理】，删掉保存的该机器密码。</li></ul></li><li>windows 清除连接的 linux 的 samba 服务缓存 <ol><li>打开 win 的命令行。</li><li>输入 net use，就会打印出当前缓存的连接上列表。</li><li>根据列表，一个个删除连接： net use 远程连接名称 /del；或者一次性全部删除：<code>net use * /del</code>。</li></ol></li></ol><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,19),v={href:"http://blog.51cto.com/yuanbin/115761",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.jianshu.com/p/750be209a6f0",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/Samba.md",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/lan120576664/article/details/50396511",target:"_blank",rel:"noopener noreferrer"};function h(y,g){const s=i("ExternalLinkIcon");return p(),c("div",null,[r,a("p",null,[n("你可以从 "),a("a",u,[n("这里"),e(s)]),n(" 获取到默认配置文件：")]),d,a("ul",null,[a("li",null,[a("a",v,[n("http://blog.51cto.com/yuanbin/115761"),e(s)])]),a("li",null,[a("a",m,[n("https://www.jianshu.com/p/750be209a6f0"),e(s)])]),a("li",null,[a("a",b,[n("https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/Samba.md"),e(s)])]),a("li",null,[a("a",k,[n("https://blog.csdn.net/lan120576664/article/details/50396511"),e(s)])])])])}const w=l(o,[["render",h],["__file","index.html.vue"]]);export{w as default};
