import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as r,a as s,b as e,d as n,w as c,e as i}from"./app-3113b888.js";const p={},u=s("h1",{id:"systemd-应用",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#systemd-应用","aria-hidden":"true"},"#"),e(" Systemd 应用")],-1),m={href:"http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html",target:"_blank",rel:"noopener noreferrer"},b={href:"http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html",target:"_blank",rel:"noopener noreferrer"},h=s("h2",{id:"由来",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#由来","aria-hidden":"true"},"#"),e(" 由来")],-1),k={href:"http://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://en.wikipedia.org/wiki/Init",target:"_blank",rel:"noopener noreferrer"},y=s("code",null,"init",-1),f=i(`<p>下面的命令用来启动服务。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> /etc/init.d/apache2 start
<span class="token comment"># 或者</span>
$ <span class="token function">service</span> apache2 start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法有两个缺点。</p><p>一是启动时间长。<code>init</code>进程是串行启动，只有前一个进程启动完，才会启动下一个进程。</p><p>二是启动脚本复杂。<code>init</code>进程只是执行启动脚本，不管其他事情。脚本需要自己处理各种<br> 情况，这往往使得脚本变得很长。</p><h2 id="systemd-概述" tabindex="-1"><a class="header-anchor" href="#systemd-概述" aria-hidden="true">#</a> Systemd 概述</h2><p>Systemd 就是为了解决这些问题而诞生的。它的设计目标是，为系统的启动和管理提供一套<br> 完整的解决方案。</p><p>根据 Linux 惯例，字母<code>d</code>是守护进程（daemon）的缩写。 Systemd 这个名字的含义，就<br> 是它要守护整个系统。</p><p>使用了 Systemd，就不需要再用<code>init</code>了。Systemd 取代了<code>initd</code>，成为系统的第一个进<br> 程（PID 等于 1），其他进程都是它的子进程。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的命令查看 Systemd 的版本。</p>`,11),x=s("br",null,null,-1),S=s("br",null,null,-1),$=s("br",null,null,-1),U={href:"http://www.ruanyifeng.com/blog/2009/06/unix_philosophy.html",target:"_blank",rel:"noopener noreferrer"},_=i(`<figure><img src="http://www.ruanyifeng.com/blogimg/asset/2016/bg2016030703.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>（上图为 Systemd 架构图）</p><h2 id="系统管理" tabindex="-1"><a class="header-anchor" href="#系统管理" aria-hidden="true">#</a> 系统管理</h2><p>Systemd 并不是一个命令，而是一组命令，涉及到系统管理的方方面面。</p><h3 id="systemctl" tabindex="-1"><a class="header-anchor" href="#systemctl" aria-hidden="true">#</a> systemctl</h3><p><code>systemctl</code>是 Systemd 的主命令，用于管理系统。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启系统</span>
$ <span class="token function">sudo</span> systemctl <span class="token function">reboot</span>

<span class="token comment"># 关闭系统，切断电源</span>
$ <span class="token function">sudo</span> systemctl poweroff

<span class="token comment"># CPU停止工作</span>
$ <span class="token function">sudo</span> systemctl <span class="token function">halt</span>

<span class="token comment"># 暂停系统</span>
$ <span class="token function">sudo</span> systemctl <span class="token function">suspend</span>

<span class="token comment"># 让系统进入冬眠状态</span>
$ <span class="token function">sudo</span> systemctl hibernate

<span class="token comment"># 让系统进入交互式休眠状态</span>
$ <span class="token function">sudo</span> systemctl hybrid-sleep

<span class="token comment"># 启动进入救援状态（单用户状态）</span>
$ <span class="token function">sudo</span> systemctl rescue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="systemd-analyze" tabindex="-1"><a class="header-anchor" href="#systemd-analyze" aria-hidden="true">#</a> systemd-analyze</h3><p><code>systemd-analyze</code>命令用于查看启动耗时。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看启动耗时</span>
$ systemd-analyze

<span class="token comment"># 查看每个服务的启动耗时</span>
$ systemd-analyze blame

<span class="token comment"># 显示瀑布状的启动过程流</span>
$ systemd-analyze critical-chain

<span class="token comment"># 显示指定服务的启动流</span>
$ systemd-analyze critical-chain atd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hostnamectl" tabindex="-1"><a class="header-anchor" href="#hostnamectl" aria-hidden="true">#</a> hostnamectl</h3><p><code>hostnamectl</code>命令用于查看当前主机的信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示当前主机的信息</span>
$ hostnamectl

<span class="token comment"># 设置主机名。</span>
$ <span class="token function">sudo</span> hostnamectl set-hostname rhel7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="localectl" tabindex="-1"><a class="header-anchor" href="#localectl" aria-hidden="true">#</a> localectl</h3><p><code>localectl</code>命令用于查看本地化设置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看本地化设置</span>
$ localectl

<span class="token comment"># 设置本地化参数。</span>
$ <span class="token function">sudo</span> localectl set-locale <span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_GB.utf8
$ <span class="token function">sudo</span> localectl set-keymap en_GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="timedatectl" tabindex="-1"><a class="header-anchor" href="#timedatectl" aria-hidden="true">#</a> timedatectl</h3><p><code>timedatectl</code>命令用于查看当前时区设置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看当前时区设置</span>
$ timedatectl

<span class="token comment"># 显示所有可用的时区</span>
$ timedatectl list-timezones

<span class="token comment"># 设置当前时区</span>
$ <span class="token function">sudo</span> timedatectl set-timezone America/New_York
$ <span class="token function">sudo</span> timedatectl set-time YYYY-MM-DD
$ <span class="token function">sudo</span> timedatectl set-time HH:MM:SS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loginctl" tabindex="-1"><a class="header-anchor" href="#loginctl" aria-hidden="true">#</a> loginctl</h3><p><code>loginctl</code>命令用于查看当前登录的用户。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出当前session</span>
$ loginctl list-sessions

<span class="token comment"># 列出当前登录用户</span>
$ loginctl list-users

<span class="token comment"># 列出显示指定用户的信息</span>
$ loginctl show-user ruanyf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="unit" tabindex="-1"><a class="header-anchor" href="#unit" aria-hidden="true">#</a> Unit</h2><h3 id="含义" tabindex="-1"><a class="header-anchor" href="#含义" aria-hidden="true">#</a> 含义</h3><p>Systemd 可以管理所有系统资源。不同的资源统称为 Unit（单位）。</p><p>Unit 一共分成 12 种。</p><ul><li>Service unit：系统服务</li><li>Target unit：多个 Unit 构成的一个组</li><li>Device Unit：硬件设备</li><li>Mount Unit：文件系统的挂载点</li><li>Automount Unit：自动挂载点</li><li>Path Unit：文件或路径</li><li>Scope Unit：不是由 Systemd 启动的外部进程</li><li>Slice Unit：进程组</li><li>Snapshot Unit：Systemd 快照，可以切回某个快照</li><li>Socket Unit：进程间通信的 socket</li><li>Swap Unit：swap 文件</li><li>Timer Unit：定时器</li></ul><p><code>systemctl list-units</code>命令可以查看当前系统的所有 Unit 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出正在运行的 Unit</span>
$ systemctl list-units

<span class="token comment"># 列出所有Unit，包括没有找到配置文件的或者启动失败的</span>
$ systemctl list-units <span class="token parameter variable">--all</span>

<span class="token comment"># 列出所有没有运行的 Unit</span>
$ systemctl list-units <span class="token parameter variable">--all</span> <span class="token parameter variable">--state</span><span class="token operator">=</span>inactive

<span class="token comment"># 列出所有加载失败的 Unit</span>
$ systemctl list-units <span class="token parameter variable">--failed</span>

<span class="token comment"># 列出所有正在运行的、类型为 service 的 Unit</span>
$ systemctl list-units <span class="token parameter variable">--type</span><span class="token operator">=</span>service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unit-的状态" tabindex="-1"><a class="header-anchor" href="#unit-的状态" aria-hidden="true">#</a> Unit 的状态</h3><p><code>systemctl status</code>命令用于查看系统状态和单个 Unit 的状态。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示系统状态</span>
$ systemctl status

<span class="token comment"># 显示单个 Unit 的状态</span>
$ sysystemctl status bluetooth.service

<span class="token comment"># 显示远程主机的某个 Unit 的状态</span>
$ systemctl <span class="token parameter variable">-H</span> root@rhel7.example.com status httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了<code>status</code>命令，<code>systemctl</code>还提供了三个查询状态的简单方法，主要供脚本内部的判<br> 断语句使用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示某个 Unit 是否正在运行</span>
$ systemctl is-active application.service

<span class="token comment"># 显示某个 Unit 是否处于启动失败状态</span>
$ systemctl is-failed application.service

<span class="token comment"># 显示某个 Unit 服务是否建立了启动链接</span>
$ systemctl is-enabled application.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unit-管理" tabindex="-1"><a class="header-anchor" href="#unit-管理" aria-hidden="true">#</a> Unit 管理</h3><p>对于用户来说，最常用的是下面这些命令，用于启动和停止 Unit（主要是 service）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 立即启动一个服务</span>
$ <span class="token function">sudo</span> systemctl start apache.service

<span class="token comment"># 立即停止一个服务</span>
$ <span class="token function">sudo</span> systemctl stop apache.service

<span class="token comment"># 重启一个服务</span>
$ <span class="token function">sudo</span> systemctl restart apache.service

<span class="token comment"># 杀死一个服务的所有子进程</span>
$ <span class="token function">sudo</span> systemctl <span class="token function">kill</span> apache.service

<span class="token comment"># 重新加载一个服务的配置文件</span>
$ <span class="token function">sudo</span> systemctl reload apache.service

<span class="token comment"># 重载所有修改过的配置文件</span>
$ <span class="token function">sudo</span> systemctl daemon-reload

<span class="token comment"># 显示某个 Unit 的所有底层参数</span>
$ systemctl show httpd.service

<span class="token comment"># 显示某个 Unit 的指定属性的值</span>
$ systemctl show <span class="token parameter variable">-p</span> CPUShares httpd.service

<span class="token comment"># 设置某个 Unit 的指定属性</span>
$ <span class="token function">sudo</span> systemctl set-property httpd.service <span class="token assign-left variable">CPUShares</span><span class="token operator">=</span><span class="token number">500</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="依赖关系" tabindex="-1"><a class="header-anchor" href="#依赖关系" aria-hidden="true">#</a> 依赖关系</h3><p>Unit 之间存在依赖关系：A 依赖于 B，就意味着 Systemd 在启动 A 的时候，同时会去启<br> 动 B。</p><p><code>systemctl list-dependencies</code>命令列出一个 Unit 的所有依赖。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl list-dependencies nginx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令的输出结果之中，有些依赖是 Target 类型（详见下文），默认不会展开显示。如<br> 果要展开 Target，就需要使用<code>--all</code>参数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl list-dependencies <span class="token parameter variable">--all</span> nginx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="unit-的配置文件" tabindex="-1"><a class="header-anchor" href="#unit-的配置文件" aria-hidden="true">#</a> Unit 的配置文件</h2><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3><p>每一个 Unit 都有一个配置文件，告诉 Systemd 怎么启动这个 Unit 。</p><p>Systemd 默认从目录<code>/etc/systemd/system/</code>读取配置文件。但是，里面存放的大部分文件<br> 都是符号链接，指向目录<code>/usr/lib/systemd/system/</code>，真正的配置文件存放在那个目录。</p><p><code>systemctl enable</code>命令用于在上面两个目录之间，建立符号链接关系。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> clamd@scan.service
<span class="token comment"># 等同于</span>
$ <span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> <span class="token string">&#39;/usr/lib/systemd/system/clamd@scan.service&#39;</span> <span class="token string">&#39;/etc/systemd/system/multi-user.target.wants/clamd@scan.service&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果配置文件里面设置了开机启动，<code>systemctl enable</code>命令相当于激活开机启动。</p><p>与之对应的，<code>systemctl disable</code>命令用于在两个目录之间，撤销符号链接关系，相当于<br> 撤销开机启动。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl disable clamd@scan.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件的后缀名，就是该 Unit 的种类，比如<code>sshd.socket</code>。如果省略，Systemd 默认<br> 后缀名为<code>.service</code>，所以<code>sshd</code>会被理解成<code>sshd.service</code>。</p><h3 id="配置文件的状态" tabindex="-1"><a class="header-anchor" href="#配置文件的状态" aria-hidden="true">#</a> 配置文件的状态</h3><p><code>systemctl list-unit-files</code>命令用于列出所有配置文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有配置文件</span>
$ systemctl list-unit-files

<span class="token comment"># 列出指定类型的配置文件</span>
$ systemctl list-unit-files <span class="token parameter variable">--type</span><span class="token operator">=</span>service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个命令会输出一个列表。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl list-unit-files

UNIT FILE              STATE
chronyd.service        enabled
clamd@.service         static
clamd@scan.service     disabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个列表显示每个配置文件的状态，一共有四种。</p><ul><li>enabled：已建立启动链接</li><li>disabled：没建立启动链接</li><li>static：该配置文件没有<code>[Install]</code>部分（无法执行），只能作为其他配置文件的依赖</li><li>masked：该配置文件被禁止建立启动链接</li></ul><p>注意，从配置文件的状态无法看出，该 Unit 是否正在运行。这必须执行前面提到<br> 的<code>systemctl status</code>命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl status bluetooth.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦修改配置文件，就要让 SystemD 重新加载配置文件，然后重新启动，否则修改不会生<br> 效。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl restart httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置文件的格式" tabindex="-1"><a class="header-anchor" href="#配置文件的格式" aria-hidden="true">#</a> 配置文件的格式</h3><p>配置文件就是普通的文本文件，可以用文本编辑器打开。</p><p><code>systemctl cat</code>命令可以查看配置文件的内容。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl <span class="token function">cat</span> atd.service

<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>ATD daemon

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>forking
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/atd

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的输出可以看到，配置文件分成几个区块。每个区块的第一行，是用方括号表示的区<br> 别名，比如<code>[Unit]</code>。注意，配置文件的区块名和字段名，都是大小写敏感的。</p><p>每个区块内部是一些等号连接的键值对。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Section<span class="token punctuation">]</span>
<span class="token assign-left variable">Directive1</span><span class="token operator">=</span>value
<span class="token assign-left variable">Directive2</span><span class="token operator">=</span>value

<span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，键值对的等号两侧不能有空格。</p><h3 id="配置文件的区块" tabindex="-1"><a class="header-anchor" href="#配置文件的区块" aria-hidden="true">#</a> 配置文件的区块</h3><p><code>[Unit]</code>区块通常是配置文件的第一个区块，用来定义 Unit 的元数据，以及配置与其他<br> Unit 的关系。它的主要字段如下。</p><ul><li><code>Description</code>：简短描述</li><li><code>Documentation</code>：文档地址</li><li><code>Requires</code>：当前 Unit 依赖的其他 Unit，如果它们没有运行，当前 Unit 会启动失败</li><li><code>Wants</code>：与当前 Unit 配合的其他 Unit，如果它们没有运行，当前 Unit 不会启动失败</li><li><code>BindsTo</code>：与<code>Requires</code>类似，它指定的 Unit 如果退出，会导致当前 Unit 停止运行</li><li><code>Before</code>：如果该字段指定的 Unit 也要启动，那么必须在当前 Unit 之后启动</li><li><code>After</code>：如果该字段指定的 Unit 也要启动，那么必须在当前 Unit 之前启动</li><li><code>Conflicts</code>：这里指定的 Unit 不能与当前 Unit 同时运行</li><li><code>Condition...</code>：当前 Unit 运行必须满足的条件，否则不会运行</li><li><code>Assert...</code>：当前 Unit 运行必须满足的条件，否则会报启动失败</li></ul><p><code>[Install]</code>通常是配置文件的最后一个区块，用来定义如何启动，以及是否开机启动。它<br> 的主要字段如下。</p><ul><li><code>WantedBy</code>：它的值是一个或多个 Target，当前 Unit 激活时（enable）符号链接会放<br> 入<code>/etc/systemd/system</code>目录下面以 Target 名 + <code>.wants</code>后缀构成的子目录中</li><li><code>RequiredBy</code>：它的值是一个或多个 Target，当前 Unit 激活时，符号链接会放<br> 入<code>/etc/systemd/system</code>目录下面以 Target 名 + <code>.required</code>后缀构成的子目录中</li><li><code>Alias</code>：当前 Unit 可用于启动的别名</li><li><code>Also</code>：当前 Unit 激活（enable）时，会被同时激活的其他 Unit</li></ul><p><code>[Service]</code>区块用来 Service 的配置，只有 Service 类型的 Unit 才有这个区块。它的<br> 主要字段如下。</p><ul><li><code>Type</code>：定义启动时的进程行为。它有以下几种值。</li><li><code>Type=simple</code>：默认值，执行<code>ExecStart</code>指定的命令，启动主进程</li><li><code>Type=forking</code>：以 fork 方式从父进程创建子进程，创建后父进程会立即退出</li><li><code>Type=oneshot</code>：一次性进程，Systemd 会等当前服务退出，再继续往下执行</li><li><code>Type=dbus</code>：当前服务通过 D-Bus 启动</li><li><code>Type=notify</code>：当前服务启动完毕，会通知<code>Systemd</code>，再继续往下执行</li><li><code>Type=idle</code>：若有其他任务执行完毕，当前服务才会运行</li><li><code>ExecStart</code>：启动当前服务的命令</li><li><code>ExecStartPre</code>：启动当前服务之前执行的命令</li><li><code>ExecStartPost</code>：启动当前服务之后执行的命令</li><li><code>ExecReload</code>：重启当前服务时执行的命令</li><li><code>ExecStop</code>：停止当前服务时执行的命令</li><li><code>ExecStopPost</code>：停止当其服务之后执行的命令</li><li><code>RestartSec</code>：自动重启当前服务间隔的秒数</li><li><code>Restart</code>：定义何种情况 Systemd 会自动重启当前服务，可能的值包括<code>always</code>（总是<br> 重启）、<code>on-success</code>、<code>on-failure</code>、<code>on-abnormal</code>、<code>on-abort</code>、<code>on-watchdog</code></li><li><code>TimeoutSec</code>：定义 Systemd 停止当前服务之前等待的秒数</li><li><code>Environment</code>：指定环境变量</li></ul>`,79),T=s("br",null,null,-1),w={href:"https://www.freedesktop.org/software/systemd/man/systemd.unit.html",target:"_blank",rel:"noopener noreferrer"},E=i(`<h2 id="target" tabindex="-1"><a class="header-anchor" href="#target" aria-hidden="true">#</a> Target</h2><p>启动计算机的时候，需要启动大量的 Unit。如果每一次启动，都要一一写明本次启动需要<br> 哪些 Unit，显然非常不方便。Systemd 的解决方案就是 Target。</p><p>简单说，Target 就是一个 Unit 组，包含许多相关的 Unit 。启动某个 Target 的时候<br> ，Systemd 就会启动里面所有的 Unit。从这个意义上说，Target 这个概念类似于&quot;状态点<br> &quot;，启动某个 Target 就好比启动到某种状态。</p><p>传统的<code>init</code>启动模式里面，有 RunLevel 的概念，跟 Target 的作用很类似。不同的是<br> ，RunLevel 是互斥的，不可能多个 RunLevel 同时启动，但是多个 Target 可以同时启动<br> 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看当前系统的所有 Target</span>
$ systemctl list-unit-files <span class="token parameter variable">--type</span><span class="token operator">=</span>target

<span class="token comment"># 查看一个 Target 包含的所有 Unit</span>
$ systemctl list-dependencies multi-user.target

<span class="token comment"># 查看启动时的默认 Target</span>
$ systemctl get-default

<span class="token comment"># 设置启动时的默认 Target</span>
$ <span class="token function">sudo</span> systemctl set-default multi-user.target

<span class="token comment"># 切换 Target 时，默认不关闭前一个 Target 启动的进程，</span>
<span class="token comment"># systemctl isolate 命令改变这种行为，</span>
<span class="token comment"># 关闭前一个 Target 里面所有不属于后一个 Target 的进程</span>
$ <span class="token function">sudo</span> systemctl isolate multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Target 与 传统 RunLevel 的对应关系如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Traditional runlevel      New target name     Symbolically linked to<span class="token punctuation">..</span>.

Runlevel <span class="token number">0</span>           <span class="token operator">|</span>    runlevel0.target -<span class="token operator">&gt;</span> poweroff.target
Runlevel <span class="token number">1</span>           <span class="token operator">|</span>    runlevel1.target -<span class="token operator">&gt;</span> rescue.target
Runlevel <span class="token number">2</span>           <span class="token operator">|</span>    runlevel2.target -<span class="token operator">&gt;</span> multi-user.target
Runlevel <span class="token number">3</span>           <span class="token operator">|</span>    runlevel3.target -<span class="token operator">&gt;</span> multi-user.target
Runlevel <span class="token number">4</span>           <span class="token operator">|</span>    runlevel4.target -<span class="token operator">&gt;</span> multi-user.target
Runlevel <span class="token number">5</span>           <span class="token operator">|</span>    runlevel5.target -<span class="token operator">&gt;</span> graphical.target
Runlevel <span class="token number">6</span>           <span class="token operator">|</span>    runlevel6.target -<span class="token operator">&gt;</span> reboot.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它与<code>init</code>进程的主要差别如下。</p><p><strong>（1）默认的 RunLevel</strong>（在<code>/etc/inittab</code>文件设置）现在被默认的 Target 取代，<br> 位置是<code>/etc/systemd/system/default.target</code>，通常符号链接到<code>graphical.target</code>（<br> 图形界面）或者<code>multi-user.target</code>（多用户命令行）。</p><p><strong>（2）启动脚本的位置</strong>，以前是<code>/etc/init.d</code>目录，符号链接到不同的 RunLevel 目<br> 录 （比如<code>/etc/rc3.d</code>、<code>/etc/rc5.d</code>等），现在则存放<br> 在<code>/lib/systemd/system</code>和<code>/etc/systemd/system</code>目录。</p><p><strong>（3）配置文件的位置</strong>，以前<code>init</code>进程的配置文件是<code>/etc/inittab</code>，各种服务的<br> 配置文件存放在<code>/etc/sysconfig</code>目录。现在的配置文件主要存放在<code>/lib/systemd</code>目录<br> ，在<code>/etc/systemd</code>目录里面的修改可以覆盖原始设置。</p><h2 id="日志管理" tabindex="-1"><a class="header-anchor" href="#日志管理" aria-hidden="true">#</a> 日志管理</h2><p>Systemd 统一管理所有 Unit 的启动日志。带来的好处就是，可以只用<code>journalctl</code>一个命<br> 令，查看所有日志（内核日志和应用日志）。日志的配置文件<br> 是<code>/etc/systemd/journald.conf</code>。</p><p><code>journalctl</code>功能强大，用法非常多。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有日志（默认情况下 ，只保存本次启动的日志）</span>
$ <span class="token function">sudo</span> journalctl

<span class="token comment"># 查看内核日志（不显示应用日志）</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-k</span>

<span class="token comment"># 查看系统本次启动的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-0</span>

<span class="token comment"># 查看上一次启动的日志（需更改设置）</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-1</span>

<span class="token comment"># 查看指定时间的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2012-10-30 18:17:16&quot;</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> <span class="token string">&quot;20 min ago&quot;</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> yesterday
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> <span class="token string">&quot;2015-01-10&quot;</span> <span class="token parameter variable">--until</span> <span class="token string">&quot;2015-01-11 03:00&quot;</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">--since</span> 09:00 <span class="token parameter variable">--until</span> <span class="token string">&quot;1 hour ago&quot;</span>

<span class="token comment"># 显示尾部的最新10行日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-n</span>

<span class="token comment"># 显示尾部指定行数的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-n</span> <span class="token number">20</span>

<span class="token comment"># 实时滚动显示最新日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-f</span>

<span class="token comment"># 查看指定服务的日志</span>
$ <span class="token function">sudo</span> journalctl /usr/lib/systemd/systemd

<span class="token comment"># 查看指定进程的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token assign-left variable">_PID</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 查看某个路径的脚本的日志</span>
$ <span class="token function">sudo</span> journalctl /usr/bin/bash

<span class="token comment"># 查看指定用户的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token assign-left variable">_UID</span><span class="token operator">=</span><span class="token number">33</span> <span class="token parameter variable">--since</span> today

<span class="token comment"># 查看某个 Unit 的日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">--since</span> today

<span class="token comment"># 实时滚动显示某个 Unit 的最新日志</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-f</span>

<span class="token comment"># 合并显示多个 Unit 的日志</span>
$ journalctl <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-u</span> php-fpm.service <span class="token parameter variable">--since</span> today

<span class="token comment"># 查看指定优先级（及其以上级别）的日志，共有8级</span>
<span class="token comment"># 0: emerg</span>
<span class="token comment"># 1: alert</span>
<span class="token comment"># 2: crit</span>
<span class="token comment"># 3: err</span>
<span class="token comment"># 4: warning</span>
<span class="token comment"># 5: notice</span>
<span class="token comment"># 6: info</span>
<span class="token comment"># 7: debug</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-p</span> err <span class="token parameter variable">-b</span>

<span class="token comment"># 日志默认分页输出，--no-pager 改为正常的标准输出</span>
$ <span class="token function">sudo</span> journalctl --no-pager

<span class="token comment"># 以 JSON 格式（单行）输出</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> nginx.service <span class="token parameter variable">-o</span> json

<span class="token comment"># 以 JSON 格式（多行）输出，可读性更好</span>
$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> nginx.serviceqq
 <span class="token parameter variable">-o</span> json-pretty

<span class="token comment"># 显示日志占据的硬盘空间</span>
$ <span class="token function">sudo</span> journalctl --disk-usage

<span class="token comment"># 指定日志文件占据的最大空间</span>
$ <span class="token function">sudo</span> journalctl --vacuum-size<span class="token operator">=</span>1G

<span class="token comment"># 指定日志文件保存多久</span>
$ <span class="token function">sudo</span> journalctl --vacuum-time<span class="token operator">=</span>1years
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><h3 id="开机启动" tabindex="-1"><a class="header-anchor" href="#开机启动" aria-hidden="true">#</a> 开机启动</h3><p>对于那些支持 Systemd 的软件，安装的时候，会自动在<code>/usr/lib/systemd/system</code>目录添<br> 加一个配置文件。</p><p>如果你想让该软件开机启动，就执行下面的命令（以<code>httpd.service</code>为例）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的命令相当于在<code>/etc/systemd/system</code>目录添加一个符号链接，指<br> 向<code>/usr/lib/systemd/system</code>里面的<code>httpd.service</code>文件。</p><p>这是因为开机时，<code>Systemd</code>只执行<code>/etc/systemd/system</code>目录里面的配置文件。这也意味<br> 着，如果把修改后的配置文件放在该目录，就可以达到覆盖原始配置的效果。</p><h3 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务" aria-hidden="true">#</a> 启动服务</h3><p>设置开机启动以后，软件并不会立即启动，必须等到下一次开机。如果想现在就运行该软件<br> ，那么要执行<code>systemctl start</code>命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl start httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上面的命令以后，有可能启动失败，因此要用<code>systemctl status</code>命令查看一下该服务<br> 的状态。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl status httpd

httpd.service - The Apache HTTP Server
Loaded: loaded <span class="token punctuation">(</span>/usr/lib/systemd/system/httpd.service<span class="token punctuation">;</span> enabled<span class="token punctuation">)</span>
Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since 金 <span class="token number">2014</span>-12-05 <span class="token number">12</span>:18:22 JST<span class="token punctuation">;</span> 7min ago
Main PID: <span class="token number">4349</span> <span class="token punctuation">(</span>httpd<span class="token punctuation">)</span>
Status: <span class="token string">&quot;Total requests: 1; Current requests/sec: 0; Current traffic:   0 B/sec&quot;</span>
CGroup: /system.slice/httpd.service
        ├─4349 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>
        ├─4350 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>
        ├─4351 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>
        ├─4352 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>
        ├─4353 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>
        └─4354 /usr/sbin/httpd <span class="token parameter variable">-DFOREGROUND</span>

<span class="token number">12</span>月 05 <span class="token number">12</span>:18:22 localhost.localdomain systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Starting The Apache HTTP Server<span class="token punctuation">..</span>.
<span class="token number">12</span>月 05 <span class="token number">12</span>:18:22 localhost.localdomain systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started The Apache HTTP Server.
<span class="token number">12</span>月 05 <span class="token number">12</span>:22:40 localhost.localdomain systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started The Apache HTTP Server.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的输出结果含义如下。</p><ul><li><code>Loaded</code>行：配置文件的位置，是否设为开机启动</li><li><code>Active</code>行：表示正在运行</li><li><code>Main PID</code>行：主进程 ID</li><li><code>Status</code>行：由应用本身（这里是 httpd ）提供的软件当前状态</li><li><code>CGroup</code>块：应用的所有子进程</li><li>日志块：应用的日志</li></ul><h3 id="停止服务" tabindex="-1"><a class="header-anchor" href="#停止服务" aria-hidden="true">#</a> 停止服务</h3><p>终止正在运行的服务，需要执行<code>systemctl stop</code>命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有时候，该命令可能没有响应，服务停不下来。这时候就不得不&quot;杀进程&quot;了，向正在运行的<br> 进程发出<code>kill</code>信号。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl <span class="token function">kill</span> httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，重启服务要执行<code>systemctl restart</code>命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl restart httpd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="读懂配置文件" tabindex="-1"><a class="header-anchor" href="#读懂配置文件" aria-hidden="true">#</a> 读懂配置文件</h3><p>一个服务怎么启动，完全由它的配置文件决定。下面就来看，配置文件有些什么内容。</p><p>前面说过，配置文件主要放在<code>/usr/lib/systemd/system</code>目录，也可能<br> 在<code>/etc/systemd/system</code>目录。找到配置文件以后，使用文本编辑器打开即可。</p><p><code>systemctl cat</code>命令可以用来查看配置文件，下面以<code>sshd.service</code>文件为例，它的作用<br> 是启动一个 SSH 服务器，供其他用户以 SSH 方式登录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ systemctl cat sshd.service

[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.service
Wants=sshd-keygen.service

[Service]
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
Type=simple
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，配置文件分成几个区块，每个区块包含若干条键值对。</p><p>下面依次解释每个区块的内容。</p><h3 id="unit-区块-启动顺序与依赖关系。" tabindex="-1"><a class="header-anchor" href="#unit-区块-启动顺序与依赖关系。" aria-hidden="true">#</a> [Unit] 区块：启动顺序与依赖关系。</h3><p><code>Unit</code>区块的<code>Description</code>字段给出当前服务的简单描述，<code>Documentation</code>字段给出文档<br> 位置。</p><p>接下来的设置是启动顺序和依赖关系，这个比较重要。</p><blockquote><p><code>After</code>字段：表示如果<code>network.target</code>或<code>sshd-keygen.service</code>需要启动，那<br> 么<code>sshd.service</code>应该在它们之后启动。</p></blockquote><p>相应地，还有一个<code>Before</code>字段，定义<code>sshd.service</code>应该在哪些服务之前启动。</p><p>注意，<code>After</code>和<code>Before</code>字段只涉及启动顺序，不涉及依赖关系。</p><p>举例来说，某 Web 应用需要 postgresql 数据库储存数据。在配置文件中，它只定义要在<br> postgresql 之后启动，而没有定义依赖 postgresql 。上线后，由于某种原因<br> ，postgresql 需要重新启动，在停止服务期间，该 Web 应用就会无法建立数据库连接。</p><p>设置依赖关系，需要使用<code>Wants</code>字段和<code>Requires</code>字段。</p><blockquote><p><code>Wants</code>字段：表示<code>sshd.service</code>与<code>sshd-keygen.service</code>之间存在&quot;弱依赖&quot;关系，即<br> 如果&quot;sshd-keygen.service&quot;启动失败或停止运行，不影响<code>sshd.service</code>继续执行。</p></blockquote><p><code>Requires</code>字段则表示&quot;强依赖&quot;关系，即如果该服务启动失败或异常退出，那<br> 么<code>sshd.service</code>也必须退出。</p><p>注意，<code>Wants</code>字段与<code>Requires</code>字段只涉及依赖关系，与启动顺序无关，默认情况下是同<br> 时启动的。</p><h3 id="service-区块-启动行为" tabindex="-1"><a class="header-anchor" href="#service-区块-启动行为" aria-hidden="true">#</a> [Service] 区块：启动行为</h3><p><code>Service</code>区块定义如何启动当前服务。</p><h4 id="启动命令" tabindex="-1"><a class="header-anchor" href="#启动命令" aria-hidden="true">#</a> 启动命令</h4><p>许多软件都有自己的环境参数文件，该文件可以用<code>EnvironmentFile</code>字段读取。</p><blockquote><p><code>EnvironmentFile</code>字段：指定当前服务的环境参数文件。该文件内部的<code>key=value</code>键值<br> 对，可以用<code>$key</code>的形式，在当前配置文件中获取。</p></blockquote><p>上面的例子中，sshd 的环境参数文件是<code>/etc/sysconfig/sshd</code>。</p><p>配置文件里面最重要的字段是<code>ExecStart</code>。</p><blockquote><p><code>ExecStart</code>字段：定义启动进程时执行的命令。</p></blockquote><p>上面的例子中，启动<code>sshd</code>，执行的命令是<code>/usr/sbin/sshd -D $OPTIONS</code>，其中的变<br> 量<code>$OPTIONS</code>就来自<code>EnvironmentFile</code>字段指定的环境参数文件。</p><p>与之作用相似的，还有如下这些字段。</p><ul><li><code>ExecReload</code>字段：重启服务时执行的命令</li><li><code>ExecStop</code>字段：停止服务时执行的命令</li><li><code>ExecStartPre</code>字段：启动服务之前执行的命令</li><li><code>ExecStartPost</code>字段：启动服务之后执行的命令</li><li><code>ExecStopPost</code>字段：停止服务之后执行的命令</li></ul><p>请看下面的例子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Service]
ExecStart=/bin/echo execstart1
ExecStart=
ExecStart=/bin/echo execstart2
ExecStartPost=/bin/echo post1
ExecStartPost=/bin/echo post2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个配置文件，第二行<code>ExecStart</code>设为空值，等于取消了第一行的设置，运行结果如<br> 下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>execstart2
post1
post2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有的启动设置之前，都可以加上一个连词号（<code>-</code>），表示&quot;抑制错误&quot;，即发生错误的时<br> 候，不影响其他命令的执行。比如，<code>EnvironmentFile=-/etc/sysconfig/sshd</code>（注意等号<br> 后面的那个连词号），就表示即使<code>/etc/sysconfig/sshd</code>文件不存在，也不会抛出错误。</p><h4 id="启动类型" tabindex="-1"><a class="header-anchor" href="#启动类型" aria-hidden="true">#</a> 启动类型</h4><p><code>Type</code>字段定义启动类型。它可以设置的值如下。</p><ul><li>simple（默认值）：<code>ExecStart</code>字段启动的进程为主进程</li><li>forking：<code>ExecStart</code>字段将以<code>fork()</code>方式启动，此时父进程将会退出，子进程将成<br> 为主进程</li><li>oneshot：类似于<code>simple</code>，但只执行一次，Systemd 会等它执行完，才启动其他服务</li><li>dbus：类似于<code>simple</code>，但会等待 D-Bus 信号后启动</li><li>notify：类似于<code>simple</code>，启动结束后会发出通知信号，然后 Systemd 再启动其他服<br> 务</li><li>idle：类似于<code>simple</code>，但是要等到其他任务都执行完，才会启动该服务。一种使用场<br> 合是为让该服务的输出，不与其他服务的输出相混合</li></ul><p>下面是一个<code>oneshot</code>的例子，笔记本电脑启动时，要把触摸板关掉，配置文件可以这样写<br> 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Unit]
Description=Switch-off Touchpad

[Service]
Type=oneshot
ExecStart=/usr/bin/touchpad-off

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的配置文件，启动类型设为<code>oneshot</code>，就表明这个服务只要运行一次就够了，不需要<br> 长期运行。</p><p>如果关闭以后，将来某个时候还想打开，配置文件修改如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Unit]
Description=Switch-off Touchpad

[Service]
Type=oneshot
ExecStart=/usr/bin/touchpad-off start
ExecStop=/usr/bin/touchpad-off stop
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面配置文件中，<code>RemainAfterExit</code>字段设为<code>yes</code>，表示进程退出以后，服务仍然保持执<br> 行。这样的话，一旦使用<code>systemctl stop</code>命令停止服务，<code>ExecStop</code>指定的命令就会执行<br> ，从而重新开启触摸板。</p><h4 id="重启行为" tabindex="-1"><a class="header-anchor" href="#重启行为" aria-hidden="true">#</a> 重启行为</h4><p><code>Service</code>区块有一些字段，定义了重启行为。</p><blockquote><p><code>KillMode</code>字段：定义 Systemd 如何停止 sshd 服务。</p></blockquote><p>上面这个例子中，将<code>KillMode</code>设为<code>process</code>，表示只停止主进程，不停止任何 sshd 子<br> 进程，即子进程打开的 SSH session 仍然保持连接。这个设置不太常见，但对 sshd 很重<br> 要，否则你停止服务的时候，会连自己打开的 SSH session 一起杀掉。</p><p><code>KillMode</code>字段可以设置的值如下。</p><ul><li>control-group（默认值）：当前控制组里面的所有子进程，都会被杀掉</li><li>process：只杀主进程</li><li>mixed：主进程将收到 SIGTERM 信号，子进程收到 SIGKILL 信号</li><li>none：没有进程会被杀掉，只是执行服务的 stop 命令。</li></ul><p>接下来是<code>Restart</code>字段。</p><blockquote><p><code>Restart</code>字段：定义了 sshd 退出后，Systemd 的重启方式。</p></blockquote><p>上面的例子中，<code>Restart</code>设为<code>on-failure</code>，表示任何意外的失败，就将重启 sshd。如果<br> sshd 正常停止（比如执行<code>systemctl stop</code>命令），它就不会重启。</p><p><code>Restart</code>字段可以设置的值如下。</p><ul><li>no（默认值）：退出后不会重启</li><li>on-success：只有正常退出时（退出状态码为 0），才会重启</li><li>on-failure：非正常退出时（退出状态码非 0），包括被信号终止和超时，才会重启</li><li>on-abnormal：只有被信号终止和超时，才会重启</li><li>on-abort：只有在收到没有捕捉到的信号终止时，才会重启</li><li>on-watchdog：超时退出，才会重启</li><li>always：不管是什么退出原因，总是重启</li></ul><p>对于守护进程，推荐设为<code>on-failure</code>。对于那些允许发生错误退出的服务，可以设<br> 为<code>on-abnormal</code>。</p><p>最后是<code>RestartSec</code>字段。</p><blockquote><p><code>RestartSec</code>字段：表示 Systemd 重启服务之前，需要等待的秒数。上面的例子设为等<br> 待 42 秒。</p></blockquote><h3 id="install-区块" tabindex="-1"><a class="header-anchor" href="#install-区块" aria-hidden="true">#</a> [Install] 区块</h3><p><code>Install</code>区块，定义如何安装这个配置文件，即怎样做到开机启动。</p><p><code>WantedBy</code>字段：表示该服务所在的 Target。</p><p><code>Target</code>的含义是服务组，表示一组服务。<code>WantedBy=multi-user.target</code>指的是，sshd<br> 所在的 Target 是<code>multi-user.target</code>。</p><p>这个设置非常重要，因为执行<code>systemctl enable sshd.service</code>命令时<br> ，<code>sshd.service</code>的一个符号链接，就会放在<code>/etc/systemd/system</code>目录下面<br> 的<code>multi-user.target.wants</code>子目录之中。</p><p>Systemd 有默认的启动 Target。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl get-default
multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的结果表示，默认的启动 Target 是<code>multi-user.target</code>。在这个组里的所有服务，<br> 都将开机启动。这就是为什么<code>systemctl enable</code>命令能设置开机启动的原因。</p><p>使用 Target 的时候，<code>systemctl list-dependencies</code>命令和<code>systemctl isolate</code>命令也<br> 很有用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看 multi-user.target 包含的所有服务</span>
$ systemctl list-dependencies multi-user.target

<span class="token comment"># 切换到另一个 target</span>
<span class="token comment"># shutdown.target 就是关机状态</span>
$ <span class="token function">sudo</span> systemctl isolate shutdown.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,103),q=s("code",null,"multi-user.target",-1),R=s("br",null,null,-1),D=s("code",null,"graphical.target",-1),B=s("code",null,"multi-user.target",-1),j=s("br",null,null,-1),A=s("br",null,null,-1),I={href:"https://www.freedesktop.org/software/systemd/man/bootup.html#System%20Manager%20Bootup",target:"_blank",rel:"noopener noreferrer"},P=i(`<h3 id="target-的配置文件" tabindex="-1"><a class="header-anchor" href="#target-的配置文件" aria-hidden="true">#</a> Target 的配置文件</h3><p>Target 也有自己的配置文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl <span class="token function">cat</span> multi-user.target

<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Multi-User System
<span class="token assign-left variable">Documentation</span><span class="token operator">=</span>man:systemd.special<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
<span class="token assign-left variable">Requires</span><span class="token operator">=</span>basic.target
<span class="token assign-left variable">Conflicts</span><span class="token operator">=</span>rescue.service rescue.target
<span class="token assign-left variable">After</span><span class="token operator">=</span>basic.target rescue.service rescue.target
<span class="token assign-left variable">AllowIsolate</span><span class="token operator">=</span>yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，Target 配置文件里面没有启动命令。</p><p>上面输出结果中，主要字段含义如下。</p><ul><li><code>Requires</code>字段：要求<code>basic.target</code>一起运行。</li><li><code>Conflicts</code>字段：冲突字段。如果<code>rescue.service</code>或<code>rescue.target</code>正在运行<br> ，<code>multi-user.target</code>就不能运行，反之亦然。</li><li><code>After</code>：表示<code>multi-user.target</code>在<code>basic.target</code> 、 <code>rescue.service</code>、<br><code>rescue.target</code>之后启动，如果它们有启动的话。</li><li><code>AllowIsolate</code>：允许使用<code>systemctl isolate</code>命令切换到<code>multi-user.target</code>。</li></ul><h3 id="修改配置文件后重启" tabindex="-1"><a class="header-anchor" href="#修改配置文件后重启" aria-hidden="true">#</a> 修改配置文件后重启</h3><p>修改配置文件以后，需要重新加载配置文件，然后重新启动相关服务。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重新加载配置文件</span>
$ <span class="token function">sudo</span> systemctl daemon-reload

<span class="token comment"># 重启相关服务</span>
$ <span class="token function">sudo</span> systemctl restart foobar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,10),L={href:"http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html",target:"_blank",rel:"noopener noreferrer"};function O(N,C){const a=t("ExternalLinkIcon"),l=t("RouterLink");return o(),r("div",null,[u,s("blockquote",null,[s("p",null,[e("搬运自："),s("a",m,[e("Systemd 入门教程：命令篇"),n(a)]),e("、"),n(l,{to:"/14.%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/Linux/%E5%B7%A5%E5%85%B7/hhttp:/www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html"},{default:c(()=>[e("Systemd 入门教程：实战篇")]),_:1})])]),s("p",null,[e("Systemd 是 Linux 系统工具，用来启动"),s("a",v,[e("守护进程"),n(a)]),e("，已成为大多数发行版的标准配置。")]),s("p",null,[e("本文介绍它的基本用法，分为上下两篇。今天介绍它的主要命令，"),s("a",b,[e("下一篇"),n(a)]),e("介绍如何用于实战。")]),h,s("p",null,[e("历史上，"),s("a",k,[e("Linux 的启动"),n(a)]),e("一直采用"),s("a",g,[y,n(a)]),e("进程。")]),f,s("p",null,[e("Systemd 的优点是功能强大，使用方便，缺点是体系庞大，非常复杂。事实上，现在还有很"),x,e(' 多人反对使用 Systemd，理由就是它过于复杂，与操作系统的其他部分强耦合，违反"keep'),S,e(' simple, keep stupid"'),$,e(" 的"),s("a",U,[e("Unix 哲学"),n(a)]),e("。")]),_,s("p",null,[e("Unit 配置文件的完整字段清单，请参"),T,e(" 考"),s("a",w,[e("官方文档"),n(a)]),e("。")]),E,s("p",null,[e("一般来说，常用的 Target 有两个：一个是"),q,e("，表示多用户命令行状态"),R,e(" ；另一个是"),D,e("，表示图形用户状态，它依赖于"),B,e("。官"),j,e(" 方文档有一张非常清晰的"),A,s("a",I,[e("Target 依赖关系图"),n(a)]),e("。")]),P,s("ul",null,[s("li",null,[s("a",L,[e("Systemd 入门教程：命令篇"),n(a)])]),s("li",null,[n(l,{to:"/14.%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/Linux/%E5%B7%A5%E5%85%B7/hhttp:/www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html"},{default:c(()=>[e("Systemd 入门教程：实战篇")]),_:1})])])])}const G=d(p,[["render",O],["__file","index.html.vue"]]);export{G as default};
