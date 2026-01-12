import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as o,a as n,d as a,b as s,w as r,e as i}from"./app-0e67a029.js";const d={},u=n("h1",{id:"nginx-快速入门",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx-快速入门","aria-hidden":"true"},"#"),s(" Nginx 快速入门")],-1),v=n("p",null,"本项目是一个 Nginx 极简教程，目的在于帮助新手快速入门 Nginx。",-1),k={href:"https://github.com/dunwu/nginx-tutorial/tree/master/examples",target:"_blank",rel:"noopener noreferrer"},m=n("strong",null,"examples",-1),b=i('<h2 id="nginx-简介" tabindex="-1"><a class="header-anchor" href="#nginx-简介" aria-hidden="true">#</a> Nginx 简介</h2><p><strong>什么是 Nginx?</strong></p><p><strong>Nginx (engine x)</strong> 是一款轻量级的 Web 服务器 、反向代理服务器及电子邮件（IMAP/POP3）代理服务器。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/nginx.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>什么是反向代理？</strong></p><p>反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/reverse-proxy.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="nginx-入门" tabindex="-1"><a class="header-anchor" href="#nginx-入门" aria-hidden="true">#</a> Nginx 入门</h2>',8),g=i(`<p>nginx 的使用比较简单，就是几条命令。</p><p>常用到的命令如下：</p><div class="language-batch line-numbers-mode" data-ext="batch"><pre class="language-batch"><code><span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-s</span> stop       快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-s</span> quit       平稳关闭Nginx，保存相关信息，有安排的结束web服务。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-s</span> reload     因改变了Nginx相关配置，需要重新加载配置而重载。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-s</span> reopen     重新打开日志文件。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-c</span> filename   为 Nginx 指定一个配置文件，来代替缺省的。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-t</span>            不运行，仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-v</span>            显示 nginx 的版本。</span>
<span class="token command"><span class="token keyword">nginx</span> <span class="token parameter attr-name">-V</span>            显示 nginx 的版本，编译器版本和配置参数。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不想每次都敲命令，可以在 nginx 安装目录下新添一个启动批处理文件<strong>startup.bat</strong>，双击即可运行。内容如下：</p><div class="language-batch line-numbers-mode" data-ext="batch"><pre class="language-batch"><code><span class="token operator">@</span><span class="token command"><span class="token keyword">echo</span> off</span>
<span class="token comment">rem 如果启动前已经启动nginx并记录下pid文件，会kill指定进程</span>
<span class="token command"><span class="token keyword">nginx</span>.exe <span class="token parameter attr-name">-s</span> stop</span>

<span class="token comment">rem 测试配置文件语法正确性</span>
<span class="token command"><span class="token keyword">nginx</span>.exe <span class="token parameter attr-name">-t</span> <span class="token parameter attr-name">-c</span> conf/nginx.conf</span>

<span class="token comment">rem 显示版本信息</span>
<span class="token command"><span class="token keyword">nginx</span>.exe <span class="token parameter attr-name">-v</span></span>

<span class="token comment">rem 按照指定配置去启动nginx</span>
<span class="token command"><span class="token keyword">nginx</span>.exe <span class="token parameter attr-name">-c</span> conf/nginx.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是运行在 Linux 下，写一个 shell 脚本，大同小异。</p><h2 id="nginx-实战" tabindex="-1"><a class="header-anchor" href="#nginx-实战" aria-hidden="true">#</a> Nginx 实战</h2><p>我始终认为，各种开发工具的配置还是结合实战来讲述，会让人更易理解。</p><h3 id="http-反向代理" tabindex="-1"><a class="header-anchor" href="#http-反向代理" aria-hidden="true">#</a> Http 反向代理</h3><p>我们先实现一个小目标：不考虑复杂的配置，仅仅是完成一个 http 反向代理。</p><p><code>nginx.conf</code> 配置文件如下：</p><blockquote><p><strong><em>注：<code>conf/nginx.conf</code> 是 nginx 的默认配置文件。你也可以使用 nginx -c 指定你的配置文件</em></strong></p></blockquote><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">#运行用户</span>
<span class="token comment">#user somebody;</span>

<span class="token comment">#启动进程,通常设置成和cpu的数量相等</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment">#全局错误日志</span>
<span class="token directive"><span class="token keyword">error_log</span>  D:/Tools/nginx-1.10.1/logs/error.log</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  D:/Tools/nginx-1.10.1/logs/notice.log  notice</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  D:/Tools/nginx-1.10.1/logs/info.log  info</span><span class="token punctuation">;</span>

<span class="token comment">#PID文件，记录当前启动的nginx的进程ID</span>
<span class="token directive"><span class="token keyword">pid</span>        D:/Tools/nginx-1.10.1/logs/nginx.pid</span><span class="token punctuation">;</span>

<span class="token comment">#工作模式及连接数上限</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>    <span class="token comment">#单个后台worker process进程的最大并发链接数</span>
<span class="token punctuation">}</span>

<span class="token comment">#设定http服务器，利用它的反向代理功能提供负载均衡支持</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#设定mime类型(邮件支持类型),类型由mime.types文件定义</span>
    <span class="token directive"><span class="token keyword">include</span>       D:/Tools/nginx-1.10.1/conf/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment">#设定日志</span>
	<span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;[<span class="token variable">$remote_addr]</span> - [<span class="token variable">$remote_user]</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>    D:/Tools/nginx-1.10.1/logs/access.log main</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">rewrite_log</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token comment">#sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，</span>
    <span class="token comment">#必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#连接超时时间</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">120</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">tcp_nodelay</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>

	<span class="token comment">#gzip压缩开关</span>
	<span class="token comment">#gzip  on;</span>

    <span class="token comment">#设定实际的服务器列表</span>
    <span class="token directive"><span class="token keyword">upstream</span> zp_server1</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8089</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">#HTTP服务器</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment">#监听80端口，80端口是知名端口号，用于HTTP协议</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>

        <span class="token comment">#定义使用www.xx.com访问</span>
        <span class="token directive"><span class="token keyword">server_name</span>  www.helloworld.com</span><span class="token punctuation">;</span>

		<span class="token comment">#首页</span>
		<span class="token directive"><span class="token keyword">index</span> index.html

		<span class="token comment">#指向webapp的目录</span>
		root D:\\01_Workspace\\Project\\github\\zp\\SpringNotes\\spring-security\\spring-shiro\\src\\main\\webapp</span><span class="token punctuation">;</span>

		<span class="token comment">#编码格式</span>
		<span class="token directive"><span class="token keyword">charset</span> utf-8</span><span class="token punctuation">;</span>

		<span class="token comment">#代理配置参数</span>
        <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>

        <span class="token comment">#反向代理的路径（和upstream绑定），location 后面设置映射的路径</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://zp_server1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#静态文件，nginx自己处理</span>
        <span class="token directive"><span class="token keyword">location</span> ~ ^/(images|javascript|js|css|flash|media|static)/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span> D:\\01_Workspace\\Project\\github\\zp\\SpringNotes\\spring-security\\spring-shiro\\src\\main\\webapp\\views</span><span class="token punctuation">;</span>
            <span class="token comment">#过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。</span>
            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#设定查看Nginx状态的地址</span>
        <span class="token directive"><span class="token keyword">location</span> /NginxStatus</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">stub_status</span>           <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">access_log</span>            <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">auth_basic</span>            <span class="token string">&quot;NginxStatus&quot;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">auth_basic_user_file</span>  conf/htpasswd</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#禁止访问 .htxxx 文件</span>
        <span class="token directive"><span class="token keyword">location</span> ~ /\\.ht</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

		<span class="token comment">#错误处理页面（可选择性配置）</span>
		<span class="token comment">#error_page   404              /404.html;</span>
		<span class="token comment">#error_page   500 502 503 504  /50x.html;</span>
        <span class="token comment">#location = /50x.html {</span>
        <span class="token comment">#    root   html;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，让我们来试试吧：</p><ol><li>启动 webapp，注意启动绑定的端口要和 nginx 中的 <code>upstream</code> 设置的端口保持一致。</li><li>更改 host：在 C:\\Windows\\System32\\drivers\\etc 目录下的 host 文件中添加一条 DNS 记录</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1 www.helloworld.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16),w={start:"3"},h=n("li",null,"启动前文中 startup.bat 的命令",-1),x={href:"http://www.helloworld.com",target:"_blank",rel:"noopener noreferrer"},_=i(`<h3 id="https-反向代理" tabindex="-1"><a class="header-anchor" href="#https-反向代理" aria-hidden="true">#</a> Https 反向代理</h3><p>一些对安全性要求比较高的站点，可能会使用 HTTPS（一种使用 ssl 通信标准的安全 HTTP 协议）。</p><p>这里不科普 HTTP 协议和 SSL 标准。但是，使用 nginx 配置 https 需要知道几点：</p><ul><li>HTTPS 的固定端口号是 443，不同于 HTTP 的 80 端口</li><li>SSL 标准需要引入安全证书，所以在 nginx.conf 中你需要指定证书和它对应的 key</li></ul><p>其他和 http 反向代理基本一样，只是在 <code>Server</code> 部分配置有些不同。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>  <span class="token comment">#HTTP服务器</span>
  <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
      <span class="token comment">#监听443端口。443为知名端口号，主要用于HTTPS协议</span>
      <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>

      <span class="token comment">#定义使用www.xx.com访问</span>
      <span class="token directive"><span class="token keyword">server_name</span>  www.helloworld.com</span><span class="token punctuation">;</span>

      <span class="token comment">#ssl证书文件位置(常见证书文件格式为：crt/pem)</span>
      <span class="token directive"><span class="token keyword">ssl_certificate</span>      cert.pem</span><span class="token punctuation">;</span>
      <span class="token comment">#ssl证书key位置</span>
      <span class="token directive"><span class="token keyword">ssl_certificate_key</span>  cert.key</span><span class="token punctuation">;</span>

      <span class="token comment">#ssl配置参数（选择性配置）</span>
      <span class="token directive"><span class="token keyword">ssl_session_cache</span>    shared:SSL:1m</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">ssl_session_timeout</span>  <span class="token number">5m</span></span><span class="token punctuation">;</span>
      <span class="token comment">#数字签名，此处使用MD5</span>
      <span class="token directive"><span class="token keyword">ssl_ciphers</span>  HIGH:!aNULL:!MD5</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span>

      <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">root</span>   /root</span><span class="token punctuation">;</span>
          <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><p>前面的例子中，代理仅仅指向一个服务器。</p><p>但是，网站在实际运营过程中，大部分都是以集群的方式运行，这时需要使用负载均衡来分流。</p><p>nginx 也可以实现简单的负载均衡功能。</p><figure><img src="https://raw.githubusercontent.com/dunwu/images/master/cs/web/nginx/nginx-load-balance.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,11),y={href:"http://www.helloworld.com",target:"_blank",rel:"noopener noreferrer"},f=i(`<p>nginx.conf 配置如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
     <span class="token comment">#设定mime类型,类型由mime.type文件定义</span>
    <span class="token directive"><span class="token keyword">include</span>       /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token comment">#设定日志格式</span>
    <span class="token directive"><span class="token keyword">access_log</span>    /var/log/nginx/access.log</span><span class="token punctuation">;</span>

    <span class="token comment">#设定负载均衡的服务器列表</span>
    <span class="token directive"><span class="token keyword">upstream</span> load_balance_server</span> <span class="token punctuation">{</span>
        <span class="token comment">#weigth参数表示权值，权值越高被分配到的几率越大</span>
        <span class="token directive"><span class="token keyword">server</span> 192.168.1.11:80   weight=5</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 192.168.1.12:80   weight=1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 192.168.1.13:80   weight=6</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token comment">#HTTP服务器</span>
   <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment">#侦听80端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>

        <span class="token comment">#定义使用www.xx.com访问</span>
        <span class="token directive"><span class="token keyword">server_name</span>  www.helloworld.com</span><span class="token punctuation">;</span>

        <span class="token comment">#对所有请求进行负载均衡请求</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>        /root</span><span class="token punctuation">;</span>                 <span class="token comment">#定义服务器的默认网站根目录位置</span>
            <span class="token directive"><span class="token keyword">index</span>       index.html index.htm</span><span class="token punctuation">;</span>  <span class="token comment">#定义首页索引文件的名称</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span>  http://load_balance_server</span> <span class="token punctuation">;</span><span class="token comment">#请求转向load_balance_server 定义的服务器列表</span>

            <span class="token comment">#以下是一些反向代理的配置(可选择性配置)</span>
            <span class="token comment">#proxy_redirect off;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token comment">#后端的Web服务器可以通过X-Forwarded-For获取用户真实IP</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span>          <span class="token comment">#nginx跟后端服务器连接超时时间(代理连接超时)</span>
            <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span>             <span class="token comment">#后端服务器数据回传时间(代理发送超时)</span>
            <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">90</span></span><span class="token punctuation">;</span>             <span class="token comment">#连接成功后，后端服务器响应时间(代理接收超时)</span>
            <span class="token directive"><span class="token keyword">proxy_buffer_size</span> <span class="token number">4k</span></span><span class="token punctuation">;</span>              <span class="token comment">#设置代理服务器（nginx）保存用户头信息的缓冲区大小</span>
            <span class="token directive"><span class="token keyword">proxy_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>               <span class="token comment">#proxy_buffers缓冲区，网页平均在32k以下的话，这样设置</span>
            <span class="token directive"><span class="token keyword">proxy_busy_buffers_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>       <span class="token comment">#高负荷下缓冲大小（proxy_buffers*2）</span>
            <span class="token directive"><span class="token keyword">proxy_temp_file_write_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>    <span class="token comment">#设定缓存文件夹大小，大于这个值，将从upstream服务器传</span>

            <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">10m</span></span><span class="token punctuation">;</span>          <span class="token comment">#允许客户端请求的最大单文件字节数</span>
            <span class="token directive"><span class="token keyword">client_body_buffer_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span>      <span class="token comment">#缓冲区代理缓冲用户端请求的最大字节数</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="负载均衡策略" tabindex="-1"><a class="header-anchor" href="#负载均衡策略" aria-hidden="true">#</a> 负载均衡策略</h4><p>Nginx 提供了多种负载均衡策略，让我们来一一了解一下：</p>`,4),T={href:"https://dunwu.github.io/blog/pages/98a1c1/",target:"_blank",rel:"noopener noreferrer"},q=i(`<h5 id="轮询" tabindex="-1"><a class="header-anchor" href="#轮询" aria-hidden="true">#</a> 轮询</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  <span class="token comment"># 默认所有服务器权重为 1</span>
  server 192.168.250.220:8080
  server 192.168.250.221:8080
  server 192.168.250.222:8080
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="加权轮询" tabindex="-1"><a class="header-anchor" href="#加权轮询" aria-hidden="true">#</a> 加权轮询</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  server 192.168.250.220:8080   weight=3
  server 192.168.250.221:8080              <span class="token comment"># default weight=1</span>
  server 192.168.250.222:8080              <span class="token comment"># default weight=1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="最少连接" tabindex="-1"><a class="header-anchor" href="#最少连接" aria-hidden="true">#</a> 最少连接</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">least_conn</span></span><span class="token punctuation">;</span>

  <span class="token comment"># with default weight for all (weight=1)</span>
  server 192.168.250.220:8080
  server 192.168.250.221:8080
  server 192.168.250.222:8080
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="加权最少连接" tabindex="-1"><a class="header-anchor" href="#加权最少连接" aria-hidden="true">#</a> 加权最少连接</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">least_conn</span></span><span class="token punctuation">;</span>

  server 192.168.250.220:8080   weight=3
  server 192.168.250.221:8080              <span class="token comment"># default weight=1</span>
  server 192.168.250.222:8080              <span class="token comment"># default weight=1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="ip-hash" tabindex="-1"><a class="header-anchor" href="#ip-hash" aria-hidden="true">#</a> IP Hash</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>

  <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>

  <span class="token comment"># with default weight for all (weight=1)</span>
  server 192.168.250.220:8080
  server 192.168.250.221:8080
  server 192.168.250.222:8080

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="普通-hash" tabindex="-1"><a class="header-anchor" href="#普通-hash" aria-hidden="true">#</a> 普通 Hash</h5><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>

  <span class="token directive"><span class="token keyword">hash</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>

  <span class="token comment"># with default weight for all (weight=1)</span>
  server 192.168.250.220:8080
  server 192.168.250.221:8080
  server 192.168.250.222:8080

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网站有多个-webapp-的配置" tabindex="-1"><a class="header-anchor" href="#网站有多个-webapp-的配置" aria-hidden="true">#</a> 网站有多个 webapp 的配置</h3><p>当一个网站功能越来越丰富时，往往需要将一些功能相对独立的模块剥离出来，独立维护。这样的话，通常，会有多个 webapp。</p>`,14),N={href:"http://www.helloworld.com",target:"_blank",rel:"noopener noreferrer"},$={href:"http://www.helloworld.com/finance/",target:"_blank",rel:"noopener noreferrer"},P={href:"http://www.helloworld.com/product/",target:"_blank",rel:"noopener noreferrer"},z={href:"http://www.helloworld.com/admin/",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,"我们知道，http 的默认端口号是 80，如果在一台服务器上同时启动这 3 个 webapp 应用，都用 80 端口，肯定是不成的。所以，这三个应用需要分别绑定不同的端口号。",-1),H={href:"http://www.helloworld.com",target:"_blank",rel:"noopener noreferrer"},A=i(`<p>配置也不难，来看看怎么做吧：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#此处省略一些基本配置</span>

	<span class="token directive"><span class="token keyword">upstream</span> product_server</span><span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">server</span> www.helloworld.com:8081</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token directive"><span class="token keyword">upstream</span> admin_server</span><span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">server</span> www.helloworld.com:8082</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token directive"><span class="token keyword">upstream</span> finance_server</span><span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">server</span> www.helloworld.com:8083</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
		<span class="token comment">#此处省略一些基本配置</span>
		<span class="token comment">#默认指向product的server</span>
		<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
			<span class="token directive"><span class="token keyword">proxy_pass</span> http://product_server</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token directive"><span class="token keyword">location</span> /product/</span><span class="token punctuation">{</span>
			<span class="token directive"><span class="token keyword">proxy_pass</span> http://product_server</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token directive"><span class="token keyword">location</span> /admin/</span> <span class="token punctuation">{</span>
			<span class="token directive"><span class="token keyword">proxy_pass</span> http://admin_server</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token directive"><span class="token keyword">location</span> /finance/</span> <span class="token punctuation">{</span>
			<span class="token directive"><span class="token keyword">proxy_pass</span> http://finance_server</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态站点" tabindex="-1"><a class="header-anchor" href="#静态站点" aria-hidden="true">#</a> 静态站点</h3><p>有时候，我们需要配置静态站点(即 html 文件和一堆静态资源)。</p><p>举例来说：如果所有的静态资源都放在了 <code>/app/dist</code> 目录下，我们只需要在 <code>nginx.conf</code> 中指定首页以及这个站点的 host 即可。</p><p>配置如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">gzip_types</span> text/plain application/x-javascript text/css application/xml text/javascript application/javascript image/jpeg image/gif image/png</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">server_name</span>  static.zp.cn</span><span class="token punctuation">;</span>

		<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
			<span class="token directive"><span class="token keyword">root</span> /app/dist</span><span class="token punctuation">;</span>
			<span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
			<span class="token comment">#转发任何请求到 index.html</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，添加 HOST：</p>`,8),I={href:"http://static.zp.cn",target:"_blank",rel:"noopener noreferrer"},O={href:"http://static.zp.cn",target:"_blank",rel:"noopener noreferrer"},C=i(`<h3 id="搭建文件服务器" tabindex="-1"><a class="header-anchor" href="#搭建文件服务器" aria-hidden="true">#</a> 搭建文件服务器</h3><p>有时候，团队需要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个简易的文件服务。</p><p>Nginx 中的配置要点：</p><ul><li>将 autoindex 开启可以显示目录，默认不开启。</li><li>将 autoindex_exact_size 开启可以显示文件的大小。</li><li>将 autoindex_localtime 开启可以显示文件的修改时间。</li><li>root 用来设置开放为文件服务的根路径。</li><li>charset 设置为 <code>charset utf-8,gbk;</code>，可以避免中文乱码问题（windows 服务器下设置后，依然乱码，本人暂时没有找到解决方法）。</li></ul><p>一个最简化的配置如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span><span class="token comment"># 显示目录</span>
<span class="token directive"><span class="token keyword">autoindex_exact_size</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span><span class="token comment"># 显示文件大小</span>
<span class="token directive"><span class="token keyword">autoindex_localtime</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span><span class="token comment"># 显示文件时间</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">charset</span>      utf-8,gbk</span><span class="token punctuation">;</span> <span class="token comment"># windows 服务器下设置后，依然乱码，暂时无解</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">9050</span> default_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:9050 default_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  _</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">root</span>         /share/fs</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决跨域" tabindex="-1"><a class="header-anchor" href="#解决跨域" aria-hidden="true">#</a> 解决跨域</h3><p>web 领域开发中，经常采用前后端分离模式。这种模式下，前端和后端分别是独立的 web 应用程序，例如：后端是 Java 程序，前端是 React 或 Vue 应用。</p><p>各自独立的 web app 在互相访问时，势必存在跨域问题。解决跨域问题一般有两种思路：</p><ol><li><strong>CORS</strong></li></ol><p>在后端服务器设置 HTTP 响应头，把你需要允许访问的域名加入 <code>Access-Control-Allow-Origin</code> 中。</p><ol start="2"><li><strong>jsonp</strong></li></ol><p>把后端根据请求，构造 json 数据，并返回，前端用 jsonp 跨域。</p><p>这两种思路，本文不展开讨论。</p><p>需要说明的是，nginx 根据第一种思路，也提供了一种解决跨域的解决方案。</p>`,15),D={href:"http://www.helloworld.com",target:"_blank",rel:"noopener noreferrer"},j=i(`<p>前端和后端如果使用 http 进行交互时，请求会被拒绝，因为存在跨域问题。来看看，nginx 是怎么解决的吧：</p><p>首先，在 enable-cors.conf 文件中设置 cors ：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># allow origin list</span>
<span class="token directive"><span class="token keyword">set</span> <span class="token variable">$ACAO</span> <span class="token string">&#39;*&#39;</span></span><span class="token punctuation">;</span>

<span class="token comment"># set single origin</span>
<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$http_origin</span> ~* (www.helloworld.com)$)</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$ACAO</span> <span class="token variable">$http_origin</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$cors</span> = <span class="token string">&quot;trueget&quot;</span>)</span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Origin&#39;</span> <span class="token string">&quot;<span class="token variable">$http_origin</span>&quot;</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Credentials&#39;</span> <span class="token string">&#39;true&#39;</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Methods&#39;</span> <span class="token string">&#39;GET, POST, OPTIONS&#39;</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">add_header</span> <span class="token string">&#39;Access-Control-Allow-Headers&#39;</span> <span class="token string">&#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type&#39;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = <span class="token string">&#39;OPTIONS&#39;</span>)</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$cors</span> <span class="token string">&quot;<span class="token variable">\${cors}</span>options&quot;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = <span class="token string">&#39;GET&#39;</span>)</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$cors</span> <span class="token string">&quot;<span class="token variable">\${cors}</span>get&quot;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_method</span> = <span class="token string">&#39;POST&#39;</span>)</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$cors</span> <span class="token string">&quot;<span class="token variable">\${cors}</span>post&quot;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，在你的服务器中 <code>include enable-cors.conf</code> 来引入跨域配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># ----------------------------------------------------</span>
<span class="token comment"># 此文件为项目 nginx 配置片段</span>
<span class="token comment"># 可以直接在 nginx config 中 include（推荐）</span>
<span class="token comment"># 或者 copy 到现有 nginx 中，自行配置</span>
<span class="token comment"># www.helloworld.com 域名需配合 dns hosts 进行配置</span>
<span class="token comment"># 其中，api 开启了 cors，需配合本目录下另一份配置文件</span>
<span class="token comment"># ----------------------------------------------------</span>
<span class="token directive"><span class="token keyword">upstream</span> front_server</span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">server</span> www.helloworld.com:9000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">upstream</span> api_server</span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">server</span> www.helloworld.com:8080</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  www.helloworld.com</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> ~ ^/api/</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span> enable-cors.conf</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://api_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">rewrite</span> <span class="token string">&quot;^/api/(.*)$&quot;</span> /<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">location</span> ~ ^/</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://front_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此，就完成了。</p><h2 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h2>`,7),L={href:"http://tool.oschina.net/apidocs/apidoc?api=nginx-zh",target:"_blank",rel:"noopener noreferrer"},R={href:"http://tengine.taobao.org/book/index.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://github.com/trimstray/nginx-admins-handbook",target:"_blank",rel:"noopener noreferrer"},F={href:"https://nginxconfig.io/",target:"_blank",rel:"noopener noreferrer"};function M(V,W){const e=t("ExternalLinkIcon"),p=t("RouterLink");return c(),o("div",null,[u,n("blockquote",null,[v,n("p",null,[n("a",k,[m,a(e)]),s(" 目录中的示例模拟了工作中的一些常用实战场景，并且都可以通过脚本一键式启动，让您可以快速看到演示效果。")])]),b,n("blockquote",null,[n("p",null,[s("详细安装方法请参考："),a(p,{to:"/04.DevOps/%E5%B7%A5%E5%85%B7/Nginx/docs/nginx-install.html"},{default:r(()=>[s("Nginx 运维")]),_:1})])]),g,n("ol",w,[h,n("li",null,[s("在浏览器中访问 "),n("a",x,[s("www.helloworld.com"),a(e)]),s("，不出意外，已经可以访问了。")])]),_,n("p",null,[s("假设这样一个应用场景：将应用部署在 192.168.1.11:80、192.168.1.12:80、192.168.1.13:80 三台 linux 环境的服务器上。网站域名叫 "),n("a",y,[s("www.helloworld.com"),a(e)]),s("，公网 IP 为 192.168.1.11。在公网 IP 所在的服务器上部署 nginx，对所有请求做负载均衡处理（下面例子中使用的是加权轮询策略）。")]),f,n("p",null,[s("负载均衡策略在各种分布式系统中基本上原理一致，对于原理有兴趣，不妨参考 "),n("a",T,[s("负载均衡"),a(e)])]),q,n("p",null,[s("举个例子：假如 "),n("a",N,[s("www.helloworld.com"),a(e)]),s(" 站点有好几个 webapp，finance（金融）、product（产品）、admin（用户中心）。访问这些应用的方式通过上下文(context)来进行区分:")]),n("p",null,[n("a",$,[s("www.helloworld.com/finance/"),a(e)])]),n("p",null,[n("a",P,[s("www.helloworld.com/product/"),a(e)])]),n("p",null,[n("a",z,[s("www.helloworld.com/admin/"),a(e)])]),S,n("p",null,[s("那么，问题来了，用户在实际访问 "),n("a",H,[s("www.helloworld.com"),a(e)]),s(" 站点时，访问不同 webapp，总不会还带着对应的端口号去访问吧。所以，你再次需要用到反向代理来做处理。")]),A,n("p",null,[s("127.0.0.1 "),n("a",I,[s("static.zp.cn"),a(e)])]),n("p",null,[s("此时，在本地浏览器访问 "),n("a",O,[s("static.zp.cn"),a(e)]),s(" ，就可以访问静态站点了。")]),C,n("p",null,[s("举例："),n("a",D,[s("www.helloworld.com"),a(e)]),s(" 网站是由一个前端 app ，一个后端 app 组成的。前端端口号为 9000， 后端端口号为 8080。")]),j,n("ul",null,[n("li",null,[n("a",L,[s("Nginx 的中文维基"),a(e)])]),n("li",null,[n("a",R,[s("Nginx 开发从入门到精通"),a(e)])]),n("li",null,[n("a",E,[s("nginx-admins-handbook"),a(e)])]),n("li",null,[n("a",F,[s("nginxconfig.io"),a(e)]),s(" - 一款 Nginx 配置生成器")])])])}const G=l(d,[["render",M],["__file","index.html.vue"]]);export{G as default};
