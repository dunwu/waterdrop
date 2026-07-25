---
icon: logos:nginx
title: Nginx 配置
date: 2020-02-02 17:54:00
order: 03
categories:
  - DevOps
  - 工具
  - Nginx
tags:
  - DevOps
  - Nginx
permalink: /pages/4e005db8/
---

# Nginx 配置

> Nginx 的默认配置文件为 `nginx.conf`。
>
> - `nginx -c xxx.conf` - 以指定的文件作为配置文件，启动 Nginx。

## 配置文件实例

以下为一个 `nginx.conf` 配置文件实例：

```nginx
#定义 nginx 运行的用户和用户组
user www www;

#nginx 进程数，建议设置为等于 CPU 总核心数。
worker_processes 8;

#nginx 默认没有开启利用多核 CPU, 通过增加 worker_cpu_affinity 配置参数来充分利用多核 CPU 以下是 8 核的配置参数
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;

#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
error_log /var/log/nginx/error.log info;

#进程文件
pid /var/run/nginx.pid;

#一个 nginx 进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值 ulimit -n）与 nginx 进程数相除，但是 nginx 分配请求并不均匀，所以建议与 ulimit -n 的值保持一致。
worker_rlimit_nofile 65535;

#工作模式与连接数上限
events
{
    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll 模型是 Linux 2.6 以上版本内核中的高性能网络 I/O 模型，如果跑在 FreeBSD 上面，就用 kqueue 模型。
    #epoll 是多路复用 IO(I/O Multiplexing) 中的一种方式，但是仅用于 linux2.6 以上内核，可以大大提高 nginx 的性能
    use epoll;

    ############################################################################
    #单个后台 worker process 进程的最大并发链接数
    #事件模块指令，定义 nginx 每个进程最大连接数，默认 1024。最大客户连接数由 worker_processes 和 worker_connections 决定
    #即 max_client=worker_processes*worker_connections, 在作为反向代理时：max_client=worker_processes*worker_connections / 4
    worker_connections 65535;
    ############################################################################
}

#设定 http 服务器
http {
    include mime.types; #文件扩展名与文件类型映射表
    default_type application/octet-stream; #默认文件类型
    #charset utf-8; #默认编码

    server_names_hash_bucket_size 128; #服务器名字的 hash 表大小
    client_header_buffer_size 32k; #上传文件大小限制
    large_client_header_buffers 4 64k; #设定请求缓
    client_max_body_size 8m; #设定请求缓
    sendfile on; #开启高效文件传输模式，sendfile 指令指定 nginx 是否调用 sendfile 函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘 IO 重负载应用，可设置为 off，以平衡磁盘与网络 I/O 处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成 off。
    autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。
    tcp_nopush on; #防止网络阻塞
    tcp_nodelay on; #防止网络阻塞

    ##连接客户端超时时间各种参数设置##
    keepalive_timeout  120;          #单位是秒，客户端连接时时间，超时之后服务器端自动关闭该连接 如果 nginx 守护进程在这个等待的时间里，一直没有收到浏览发过来 http 请求，则关闭这个 http 连接
    client_header_timeout 10;        #客户端请求头的超时时间
    client_body_timeout 10;          #客户端请求主体超时时间
    reset_timedout_connection on;    #告诉 nginx 关闭不响应的客户端连接。这将会释放那个客户端所占有的内存空间
    send_timeout 10;                 #客户端响应超时时间，在两次客户端读取操作之间。如果在这段时间内，客户端没有读取任何数据，nginx 就会关闭连接
    ################################

    #FastCGI 相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

    ###作为代理缓存服务器设置#######
    ###先写到 temp 再移动到 cache
    #proxy_cache_path /var/tmp/nginx/proxy_cache levels=1:2 keys_zone=cache_one:512m inactive=10m max_size=64m;
    ###以上 proxy_temp 和 proxy_cache 需要在同一个分区中
    ###levels=1:2 表示缓存级别，表示缓存目录的第一级目录是 1 个字符，第二级目录是 2 个字符 keys_zone=cache_one:128m 缓存空间起名为 cache_one 大小为 512m
    ###max_size=64m 表示单个文件超过 128m 就不缓存了  inactive=10m 表示缓存的数据，10 分钟内没有被访问过就删除
    #########end####################

    #####对传输文件压缩###########
    #gzip 模块设置
    gzip on; #开启 gzip 压缩输出
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers 4 16k; #压缩缓冲区
    gzip_http_version 1.0; #压缩版本（默认 1.1，前端如果是 squid2.5 请使用 1.0）
    gzip_comp_level 2; #压缩等级，gzip 压缩比，1 为最小，处理最快；9 为压缩比最大，处理最慢，传输速度最快，也最消耗 CPU；
    gzip_types text/plain application/x-javascript text/css application/xml;
    #压缩类型，默认就已经包含 text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个 warn。
    gzip_vary on;
    ##############################

    #limit_zone crawler $binary_remote_addr 10m; #开启限制 IP 连接数的时候需要使用

    upstream blog.ha97.com {
        #upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。
        server 192.168.80.121:80 weight=3;
        server 192.168.80.122:80 weight=2;
        server 192.168.80.123:80 weight=3;
    }

    #虚拟主机的配置
    server {
        #监听端口
        listen 80;

        #############https##################
        #listen 443 ssl;
        #ssl_certificate /opt/https/xxxxxx.crt;
        #ssl_certificate_key /opt/https/xxxxxx.key;
        #ssl_protocols SSLv3 TLSv1;
        #ssl_ciphers HIGH:!ADH:!EXPORT57:RC4+RSA:+MEDIUM;
        #ssl_prefer_server_ciphers on;
        #ssl_session_cache shared:SSL:2m;
        #ssl_session_timeout 5m;
        ####################################end

        #域名可以有多个，用空格隔开
        server_name www.ha97.com ha97.com;
        index index.html index.htm index.php;
        root /data/www/ha97;
        location ~ .*.(php|php5)?$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
        }

        #图片缓存时间设置
        location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$ {
            expires 10d;
        }

        #JS 和 CSS 缓存时间设置
        location ~ .*.(js|css)?$ {
            expires 1h;
        }

        #日志格式设定
        log_format access '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" $http_x_forwarded_for';

        #定义本虚拟主机的访问日志
        access_log /var/log/nginx/ha97access.log access;

        #对 "/" 启用反向代理
        location / {
            proxy_pass http://127.0.0.1:88;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的 Web 服务器可以通过 X-Forwarded-For 获取用户真实 IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;
            client_max_body_size 10m; #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，

            ##代理设置 以下设置是 nginx 和后端服务器之间通讯的设置##
            proxy_connect_timeout 90; #nginx 跟后端服务器连接超时时间（代理连接超时）
            proxy_send_timeout 90; #后端服务器数据回传时间（代理发送超时）
            proxy_read_timeout 90; #连接成功后，后端服务器响应时间（代理接收超时）
            proxy_buffering on;    #该指令开启从后端被代理服务器的响应内容缓冲 此参数开启后 proxy_buffers 和 proxy_busy_buffers_size 参数才会起作用
            proxy_buffer_size 4k;  #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k;   #proxy_buffers 缓冲区，网页平均在 32k 以下的设置
            proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
            proxy_max_temp_file_size 2048m; #默认 1024m, 该指令用于设置当网页内容大于 proxy_buffers 时，临时文件大小的最大值。如果文件大于这个值，它将从 upstream 服务器同步地传递请求，而不是缓冲到磁盘
            proxy_temp_file_write_size 512k; 这是当被代理服务器的响应过大时 nginx 一次性写入临时文件的数据量。
            proxy_temp_path  /var/tmp/nginx/proxy_temp;    ##定义缓冲存储目录，之前必须要先手动创建此目录
            proxy_headers_hash_max_size 51200;
            proxy_headers_hash_bucket_size 6400;
            #######################################################
        }

        #设定查看 nginx 状态的地址
        location /nginxStatus {
            stub_status on;
            access_log on;
            auth_basic "nginxStatus";
            auth_basic_user_file conf/htpasswd;
            #htpasswd 文件的内容可以用 apache 提供的 htpasswd 工具来产生。
        }

        #本地动静分离反向代理配置
        #所有 jsp 的页面均交由 tomcat 或 resin 处理
        location ~ .(jsp|jspx|do)?$ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://127.0.0.1:8080;
        }

        #所有静态文件由 nginx 直接读取不经过 tomcat 或 resin
        location ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$
        { expires 15d; }

        location ~ .*.(js|css)?$
        { expires 1h; }
    }
}
```

## 基本规则

### 管理 Nginx 配置

> 随着 Nginx 配置的增长，您有必要组织、管理配置内容。
>
> 当您的 Nginx 配置增加时，组织配置的需求也会增加。 井井有条的代码是：
>
> - 易于理解
> - 易于维护
> - 易于使用

> 使用 `include` 指令可将常用服务器配置移动到单独的文件中，并将特定代码附加到全局配置，上下文等中。

> 我总是尝试在配置树的根目录中保留多个目录。 这些目录存储所有附加到主文件的配置文件。 我更喜欢以下结构：
>
> - `html` - 用于默认静态文件，例如 全局 5xx 错误页面
> - `master` - 用于主要配置，例如 ACL，侦听指令和域
>   - `_acls` - 用于访问控制列表，例如 地理或地图模块
>   - `_basic` - 用于速率限制规则，重定向映射或代理参数
>   - `_listen` - 用于所有侦听指令； 还存储 SSL 配置
>   - `_server` - 用于域（localhost）配置； 还存储所有后端定义
> - `modules` - 用于动态加载到 Nginx 中的模块
> - `snippets` - 用于 Nginx 别名，配置模板
>
> 如果有必要，我会将其中一些附加到具有 `server` 指令的文件中。

示例：

```nginx
## Store this configuration in https.conf for example:
listen 10.240.20.2:443 ssl;

ssl_certificate /etc/nginx/master/_server/example.com/certs/nginx_example.com_bundle.crt;
ssl_certificate_key /etc/nginx/master/_server/example.com/certs/example.com.key;

## Include this file to the server section:
server {

  include /etc/nginx/master/_listen/10.240.20.2/https.conf;

  ## And other:
  include /etc/nginx/master/_static/errors.conf;
  include /etc/nginx/master/_server/_helpers/global.conf;

  ...

  server_name domain.com www.domain.com;

  ...
```

### 重加载 Nginx 配置

示例：

```bash
## 1)
systemctl reload nginx

## 2)
service nginx reload

## 3)
/etc/init.d/nginx reload

## 4)
/usr/sbin/nginx -s reload

## 5)
kill -HUP $(cat /var/run/nginx.pid)
## or
kill -HUP $(pgrep -f "nginx: master")

## 6)
/usr/sbin/nginx -g 'daemon on; master_process on;' -s reload
```

### 监听 80 和 443 端口

> 如果您使用完全相同的配置为 HTTP 和 HTTPS 提供服务（单个服务器同时处理 HTTP 和 HTTPS 请求），Nginx 足够智能，可以忽略通过端口 80 加载的 SSL 指令。
>
> Nginx 的最佳实践是使用单独的服务器进行这样的重定向（不与您的主要配置的服务器共享），对所有内容进行硬编码，并且完全不使用正则表达式。
>
> 我不喜欢复制规则，但是单独的监听指令无疑可以帮助您维护和修改配置。
>
> 如果将多个域固定到一个 IP 地址，则很有用。 这使您可以将一个侦听指令（例如，如果将其保留在配置文件中）附加到多个域配置。
>
> 如果您使用的是 HTTPS，则可能还需要对域进行硬编码，因为您必须预先知道要提供的证书。

示例：

```nginx
## For HTTP:
server {

  listen 10.240.20.2:80;

  ...

}

## For HTTPS:
server {

  listen 10.240.20.2:443 ssl;

  ...

}
```

### 显示指定监听的地址和端口

Nginx 的 listen 指令用于监听指定的 IP 地址和端口号，配置形式为：`listen <address>:<port>`。若 IP 地址或端口缺失，Nginx 会以默认值来替换。

而且，仅当需要区分与 listen 指令中的同一级别匹配的服务器块时，才会评估 server_name 指令。

示例：

```nginx
server {

  ## This block will be processed:
  listen 192.168.252.10;  ## --> 192.168.252.10:80

  ...

}

server {

  listen 80;  ## --> *:80 --> 0.0.0.0:80
  server_name api.random.com;

  ...

}
```

### 防止使用未定义的服务器名称处理请求

> Nginx 应该阻止使用未定义的服务器名称（也使用 IP 地址）处理请求。它可以防止配置错误，例如流量转发到不正确的后端。通过创建默认虚拟虚拟主机可以轻松解决该问题，该虚拟虚拟主机可以捕获带有无法识别的主机标头的所有请求。
>
> 如果没有一个 listen 指令具有 default_server 参数，则具有 address：port 对的第一台服务器将是该对的默认服务器（这意味着 Nginx 始终具有默认服务器）。
>
> 如果有人使用 IP 地址而不是服务器名称发出请求，则主机请求标头字段将包含 IP 地址，并且可以使用 IP 地址作为服务器名称来处理请求。
>
> 在现代版本的 Nginx 中，不需要服务器名称\_。如果找不到具有匹配的 listen 和 server_name 的服务器，Nginx 将使用默认服务器。如果您的配置分散在多个文件中，则评估顺序将不明确，因此您需要显式标记默认服务器。
>
> Nginx 使用 Host 标头进行 server_name 匹配。它不使用 TLS SNI。这意味着对于 SSL 服务器，Nginx 必须能够接受 SSL 连接，这归结为具有证书/密钥。证书/密钥可以是任意值，例如自签名。

示例：

```nginx
## Place it at the beginning of the configuration file to prevent mistakes:
server {

  ## For ssl option remember about SSL parameters (private key, certs, cipher suites, etc.);
  ## add default_server to your listen directive in the server that you want to act as the default:
  listen 10.240.20.2:443 default_server ssl;

  ## We catch:
  ##   - invalid domain names
  ##   - requests without the "Host" header
  ##   - and all others (also due to the above setting)
  ##   - default_server in server_name directive is not required - I add this for a better understanding and I think it's an unwritten standard
  ## ...but you should know that it's irrelevant, really, you can put in everything there.
  server_name _ "" default_server;

  ...

  return 444;

  ## We can also serve:
  ## location / {

    ## static file (error page):
    ##   root /etc/nginx/error-pages/404;
    ## or redirect:
    ##   return 301 https://badssl.com;

    ## return 444;

  ## }

}

server {

  listen 10.240.20.2:443 ssl;

  server_name domain.com;

  ...

}

server {

  listen 10.240.20.2:443 ssl;

  server_name domain.org;

  ...

}
```

### 不要在 listen 或 upstream 中使用 hostname

> 通常，在 listen 或上游指令中使用主机名是一种不好的做法。
>
> 在最坏的情况下，Nginx 将无法绑定到所需的 TCP 套接字，这将完全阻止 Nginx 启动。
>
> 最好和更安全的方法是知道需要绑定的 IP 地址，并使用该地址代替主机名。 这也可以防止 Nginx 查找地址并消除对外部和内部解析器的依赖。
>
> 在 server_name 指令中使用\$ hostname（计算机的主机名）变量也是不当行为的示例（类似于使用主机名标签）。
>
> 我认为也有必要设置 IP 地址和端口号对，以防止可能难以调试的软错误。

示例：

❌ 错误配置

```nginx
upstream {

  server http://x-9s-web01-prod:8080;

}

server {

  listen rev-proxy-prod:80;

  ...

}
```

⭕ 正确配置

```nginx
upstream {

  server http://192.168.252.200:8080;

}

server {

  listen 10.10.100.20:80;

  ...

}
```

### 指令中只配置一个 SSL

> 此规则使调试和维护更加容易。
>
> 请记住，无论 SSL 参数如何，您都可以在同一监听指令（IP 地址）上使用多个 SSL 证书。
>
> 我认为要在多个 HTTPS 服务器之间共享一个 IP 地址，您应该使用一个 SSL 配置（例如协议，密码，曲线）。这是为了防止错误和配置不匹配。
>
> 还请记住有关默认服务器的配置。这很重要，因为如果所有 listen 指令都没有 default_server 参数，则配置中的第一台服务器将是默认服务器。因此，您应该只使用一个 SSL 设置，并且在同一 IP 地址上使用多个名称。
>
> 从 Nginx 文档中：
>
> 这是由 SSL 协议行为引起的。在浏览器发送 HTTP 请求之前，已建立 SSL 连接，nginx 不知道所请求服务器的名称。因此，它可能仅提供默认服务器的证书。
>
> 还要看看这个：
>
> TLS 服务器名称指示扩展名（SNI，RFC 6066）是在单个 IP 地址上运行多个 HTTPS 服务器的更通用的解决方案，它允许浏览器在 SSL 握手期间传递请求的服务器名称，因此，服务器将知道哪个用于连接的证书。
>
> 另一个好主意是将常用服务器设置移到单独的文件（即 common / example.com.conf）中，然后将其包含在单独的服务器块中。

示例：

```nginx
## Store this configuration in e.g. https.conf:
listen 192.168.252.10:443 default_server ssl http2;

ssl_protocols TLSv1.2;
ssl_ciphers "ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384";

ssl_prefer_server_ciphers on;

ssl_ecdh_curve secp521r1:secp384r1;

...

## Include this file to the server context (attach domain-a.com for specific listen directive):
server {

  include             /etc/nginx/https.conf;

  server_name         domain-a.com;

  ssl_certificate     domain-a.com.crt;
  ssl_certificate_key domain-a.com.key;

  ...

}

## Include this file to the server context (attach domain-b.com for specific listen directive):
server {

  include             /etc/nginx/https.conf;

  server_name         domain-b.com;

  ssl_certificate     domain-b.com.crt;
  ssl_certificate_key domain-b.com.key;

  ...

}
```

### 使用 geo/map 模块替代 allow/deny

> 使用地图或地理模块（其中之一）可以防止用户滥用您的服务器。这样就可以创建变量，其值取决于客户端 IP 地址。
>
> 由于仅在使用变量时才对其进行求值，因此甚至仅存在大量已声明的变量。地理位置变量不会为请求处理带来任何额外费用。
>
> 这些指令提供了阻止无效访问者的完美方法，例如使用 ngx_http_geoip_module。例如，geo 模块非常适合有条件地允许或拒绝 IP。
>
> geo 模块（注意：不要将此模块误认为是 GeoIP）在加载配置时会构建内存基数树。这与路由中使用的数据结构相同，并且查找速度非常快。如果每个网络有许多唯一值，那么较长的加载时间是由在数组中搜索数据重复项引起的。否则，可能是由于插入基数树引起的。
>
> 我将两个模块都用于大型列表。您应该考虑一下，因为此规则要求使用多个 if 条件。我认为，对于简单的列表，毕竟允许/拒绝指令是更好的解决方案。看下面的例子：

```nginx
## Allow/deny:
location /internal {

  include acls/internal.conf;
  allow   192.168.240.0/24;
  deny    all;

  ...

## vs geo/map:
location /internal {

  if ($globals_internal_map_acl) {
    set $pass 1;
  }

  if ($pass = 1) {
    proxy_pass http://localhost:80;
  }

  if ($pass != 1) {
    return 403;
  }

  ...

}
```

示例：

```nginx
## Map module:
map $remote_addr $globals_internal_map_acl {

  ## Status code:
  ##  - 0 = false
  ##  - 1 = true
  default 0;

  ### INTERNAL ###
  10.255.10.0/24 1;
  10.255.20.0/24 1;
  10.255.30.0/24 1;
  192.168.0.0/16 1;

}

## Geo module:
geo $globals_internal_geo_acl {

  ## Status code:
  ##  - 0 = false
  ##  - 1 = true
  default 0;

  ### INTERNAL ###
  10.255.10.0/24 1;
  10.255.20.0/24 1;
  10.255.30.0/24 1;
  192.168.0.0/16 1;

}
```

### Map 所有事物

> 使用地图管理大量重定向，并使用它们来自定义键/值对。
>
> map 指令可映射字符串，因此可以表示例如 192.168.144.0/24 作为正则表达式，并继续使用 map 指令。
>
> Map 模块提供了一种更优雅的解决方案，用于清晰地解析大量正则表达式，例如 用户代理，引荐来源。
>
> 您还可以对地图使用 include 指令，这样配置文件看起来会很漂亮。

示例：

```nginx
map $http_user_agent $device_redirect {

  default "desktop";

  ~(?i)ip(hone|od) "mobile";
  ~(?i)android.*(mobile|mini) "mobile";
  ~Mobile.+Firefox "mobile";
  ~^HTC "mobile";
  ~Fennec "mobile";
  ~IEMobile "mobile";
  ~BB10 "mobile";
  ~SymbianOS.*AppleWebKit "mobile";
  ~Opera\sMobi "mobile";

}

## Turn on in a specific context (e.g. location):
if ($device_redirect = "mobile") {

  return 301 https://m.domain.com$request_uri;

}
```

### 为所有未匹配的路径设置根路径

> 为请求设置服务器指令内部的全局根路径。 它为未定义的位置指定根路径。
>
> 根据官方文档：
>
> 如果您在每个位置块中添加一个根路径，则不匹配的位置块将没有根路径。因此，重要的是，根指令必须在您的位置块之前发生，然后根目录指令可以在需要时覆盖该指令。

示例：

```nginx
server {

  server_name domain.com;

  root /var/www/domain.com/public;

  location / {

    ...

  }

  location /api {

    ...

  }

  location /static {

    root /var/www/domain.com/static;

    ...

  }

}
```

### 使用 return 指令进行 URL 重定向（301、302）

> 这是一个简单的规则。 您应该使用服务器块和 return 语句，因为它们比评估 RegEx 更快。
>
> 因为 Nginx 停止处理请求（而不必处理正则表达式），所以它更加简单快捷。

示例

```nginx
server {

  server_name www.example.com;

  ## return    301 https://$host$request_uri;
  return      301 $scheme://www.example.com$request_uri;

}
```

### 配置日志轮换策略

> 日志文件为您提供有关服务器活动和性能以及可能出现的任何问题的反馈。 它们记录了有关请求和 Nginx 内部的详细信息。 不幸的是，日志使用了更多的磁盘空间。
>
> 您应该定义一个过程，该过程将定期存档当前日志文件并启动一个新日志文件，重命名并有选择地压缩当前日志文件，删除旧日志文件，并强制日志记录系统开始使用新日志文件。
>
> 我认为最好的工具是 logrotate。 如果我想自动管理日志，也想睡个好觉，那么我会在任何地方使用它。 这是一个旋转日志的简单程序，使用 crontab 可以工作。 它是计划的工作，而不是守护程序，因此无需重新加载其配置。

示例：

- 手动旋转

  ```bash
  ## Check manually (all log files):
  logrotate -dv /etc/logrotate.conf

  ## Check manually with force rotation (specific log file):
  logrotate -dv --force /etc/logrotate.d/nginx
  ```

- 自动旋转

  ```bash
  cat > /etc/logrotate.d/nginx << __EOF__
  /var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 nginx nginx
    sharedscripts
    prerotate
      if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
        run-parts /etc/logrotate.d/httpd-prerotate; \
      fi \
    endscript
    postrotate
      ## test ! -f /var/run/nginx.pid || kill -USR1 `cat /var/run/nginx.pid`
      invoke-rc.d nginx reload >/dev/null 2>&1
    endscript
  }

  /var/log/nginx/localhost/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 nginx nginx
    sharedscripts
    prerotate
      if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
        run-parts /etc/logrotate.d/httpd-prerotate; \
      fi \
    endscript
    postrotate
      ## test ! -f /var/run/nginx.pid || kill -USR1 `cat /var/run/nginx.pid`
      invoke-rc.d nginx reload >/dev/null 2>&1
    endscript
  }

  /var/log/nginx/domains/example.com/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 nginx nginx
    sharedscripts
    prerotate
      if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
        run-parts /etc/logrotate.d/httpd-prerotate; \
      fi \
    endscript
    postrotate
      ## test ! -f /var/run/nginx.pid || kill -USR1 `cat /var/run/nginx.pid`
      invoke-rc.d nginx reload >/dev/null 2>&1
    endscript
  }
  __EOF__
  ```

### 不要重复索引指令，只能在 http 块中使用

> 一次使用 index 指令。 它只需要在您的 http 上下文中发生，并将在下面继承。
>
> 我认为我们在复制相同规则时应格外小心。 但是，当然，规则的重复有时是可以的，或者不一定是大麻烦。

示例：

❌ 错误配置

```nginx
http {

  ...

  index index.php index.htm index.html;

  server {

    server_name www.example.com;

    location / {

      index index.php index.html index.$geo.html;

      ...

    }

  }

  server {

    server_name www.example.com;

    location / {

      index index.php index.htm index.html;

      ...

    }

    location /data {

      index index.php;

      ...

    }

    ...

}
```

⭕ 正确配置

```nginx
http {

  ...

  index index.php index.htm index.html index.$geo.html;

  server {

    server_name www.example.com;

    location / {

      ...

    }

  }

  server {

    server_name www.example.com;

    location / {

      ...

    }

    location /data {

      ...

    }

    ...

}
```

## Debugging

### 使用自定义日志格式

> 您可以在 Nginx 配置中作为变量访问的任何内容都可以记录，包括非标准的 HTTP 标头等。因此，这是一种针对特定情况创建自己的日志格式的简单方法。
>
> 这对于调试特定的 `location` 指令非常有帮助。

示例：

```nginx
## Default main log format from the Nginx repository:
log_format main
                '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

## Extended main log format:
log_format main-level-0
                '$remote_addr - $remote_user [$time_local] '
                '"$request_method $scheme://$host$request_uri '
                '$server_protocol" $status $body_bytes_sent '
                '"$http_referer" "$http_user_agent" '
                '$request_time';

## Debug log formats:
log_format debug-level-0
                '$remote_addr - $remote_user [$time_local] '
                '"$request_method $scheme://$host$request_uri '
                '$server_protocol" $status $body_bytes_sent '
                '$request_id $pid $msec $request_time '
                '$upstream_connect_time $upstream_header_time '
                '$upstream_response_time "$request_filename" '
                '$request_completion';
```

### 使用调试模式来跟踪意外行为

> 通常，`error_log` 指令是在 `main` 中指定的，但是也可以在 `server` 或 `location` 块中指定，全局设置将被覆盖，并且这个 `error_log` 指令将设置其自己的日志文件路径和日志记录级别。
>
> 如果要记录 `ngx_http_rewrite_module` (at the notice level) ，应该在 `http`、`server` 或 `location` 块中开启 `rewrite_log on;`。
>
> 注意：
>
> - 永远不要将调试日志记录留在生产环境中的文件上
> - 不要忘记在流量非常高的站点上恢复 `error_log` 的调试级别
> - 必须使用日志回滚政策

示例：

- 将 debug 信息写入文件

```nginx
## Turn on in a specific context, e.g.:
##   - global    - for global logging
##   - http      - for http and all locations logging
##   - location  - for specific location
error_log /var/log/nginx/error-debug.log debug;
```

- 将 debug 信息写入内存

```nginx
error_log memory:32m debug;
```

- IP 地址/范围的调试日志：

```nginx
events {

  debug_connection    192.168.252.15/32;
  debug_connection    10.10.10.0/24;

}
```

- 为不同服务器设置不同 Debug 配置

```nginx
error_log /var/log/nginx/debug.log debug;

...

http {

  server {

    ## To enable debugging:
    error_log /var/log/nginx/domain.com/domain.com-debug.log debug;
    ## To disable debugging:
    error_log /var/log/nginx/domain.com/domain.com-debug.log;

    ...

  }

}
```

### 核心转储

> 核心转储基本上是程序崩溃时内存的快照。
>
> Nginx 是一个非常稳定的守护程序，但是有时可能会发生正在运行的 Nginx 进程独特终止的情况。
>
> 如果要保存内存转储，它可以确保应启用两个重要的指令，但是，为了正确处理内存转储，需要做一些事情。 有关它的完整信息，请参见转储进程的内存（来自本手册）。
>
> 当您的 Nginx 实例收到意外错误或崩溃时，应始终启用核心转储。

示例：

```nginx
worker_rlimit_core    500m;
worker_rlimit_nofile  65535;
working_directory     /var/dump/nginx;
```

## 性能

### 工作进程数

> `worker_processes` - 用于设置 Nginx 的工作进程数。

- worker_processes 的默认值为 1。
- 设置 worker_processes 的安全做法是将其设为 auto，则启动 Nginx 时会自动分配工作进程数。当然，也可以显示的设置一个工作进程数值。
- 一般一个进程足够了，你可以把连接数设得很大。（worker_processes: 1，worker_connections: 10,000）如果有 SSL、gzip 这些比较消耗 CPU 的工作，而且是多核 CPU 的话，可以设为和 CPU 的数量一样。或者要处理很多很多的小文件，而且文件总大小比内存大很多的时候，也可以把进程数增加，以充分利用 IO 带宽（主要似乎是 IO 操作有 block）

示例：

```nginx
## The safest way:
worker_processes auto;

## VCPU = 4 , expr $(nproc --all) - 1
worker_processes 3;
```

### 最大连接数

> `worker_connections` - 单个 Nginx 工作进程允许同时建立的外部连接的数量。数字越大，能同时处理的连接越多。

`worker_connections` 不是随便设置的，而是与两个指标有重要关联：

- 内存
  - 每个连接数分别对应一个 read_event、一个 write_event 事件，一个连接数大概占用 232 字节，2 个事件总占用 96 字节，那么一个连接总共占用 328 字节，通过数学公式可以算出 100000 个连接数大概会占用 31M = 100000 \* 328 / 1024 / 1024，当然这只是 nginx 启动时，worker_connections 连接数所占用的 nginx。
- 操作系统级别”进程最大可打开文件数“。
  - 进程最大可打开文件数受限于操作系统，可通过 `ulimit -n` 命令查询，以前是 1024，现在是 65535。
  - nginx 提供了 worker_rlimit_nofile 指令，这是除了 ulimit 的一种设置可用的描述符的方式。 该指令与使用 ulimit 对用户的设置是同样的效果。此指令的值将覆盖 ulimit 的值，如：worker_rlimit_nofile 20960; 设置 ulimits：ulimit -SHn 65535

### 使用 HTTP/2

> HTTP / 2 将使我们的应用程序更快，更简单且更可靠。 HTTP / 2 的主要目标是通过启用完整的请求和响应多路复用来减少延迟，通过有效压缩 HTTP 标头字段来最小化协议开销，并增加对请求优先级和服务器推送的支持。
>
> HTTP / 2 与 HTTP / 1.1 向后兼容，因此有可能完全忽略它，并且一切都会像以前一样继续工作，因为如果不支持 HTTP / 2 的客户端永远不会向服务器请求 HTTP / 2 通讯升级：它们之间的通讯将完全是 HTTP1 / 1。
>
> 请注意，HTTP / 2 在单个 TCP 连接中多路复用许多请求。 通常，当使用 HTTP / 2 时，将与服务器建立单个 TCP 连接。
>
> 您还应该包括 ssl 参数，这是必需的，因为浏览器不支持未经加密的 HTTP / 2。
>
> HTTP / 2 对旧的和不安全的密码有一个非常大的黑名单，因此您应该避免使用它们。

示例：

```nginx
server {

  listen 10.240.20.2:443 ssl http2;

  ...
```

### 维护 SSL 会话

> 客户端每次发出请求时都进行新的 SSL 握手的需求。默认情况下，内置会话缓存并不是最佳选择，因为它只能由一个工作进程使用，并且可能导致内存碎片，最好使用共享缓存。
>
> 使用 `ssl_session_cache` 时，通过 SSL 保持连接的性能可能会大大提高。10M 的值是一个很好的起点（1MB 共享缓存可以容纳大约 4,000 个会话）。通过共享，所有工作进程之间共享一个缓存（可以在多个虚拟服务器中使用相同名称的缓存）。
>
> 但是，大多数服务器不清除会话或票证密钥，因此增加了服务器受到损害将泄漏先前（和将来）连接中的数据的风险。

示例：

```nginx
ssl_session_cache   shared:NGX_SSL_CACHE:10m;
ssl_session_timeout 12h;
ssl_session_tickets off;
ssl_buffer_size     1400;
```

#### 尽可能在 server_name 指令中使用确切名称

> 确切名称，以星号开头的通配符名称和以星号结尾的通配符名称存储在绑定到侦听端口的三个哈希表中。
>
> 首先搜索确切名称哈希表。 如果未找到名称，则搜索具有以星号开头的通配符名称的哈希表。 如果未在此处找到名称，则搜索带有通配符名称以星号结尾的哈希表。 搜索通配符名称哈希表比搜索精确名称哈希表要慢，因为名称是按域部分搜索的。
>
> 正则表达式是按顺序测试的，因此是最慢的方法，并且不可缩放。由于这些原因，最好在可能的地方使用确切的名称。

示例：

```nginx
## It is more efficient to define them explicitly:
server {

    listen       192.168.252.10:80;

    server_name  example.org  www.example.org  *.example.org;

    ...

}

## Than to use the simplified form:
server {

    listen       192.168.252.10:80;

    server_name  .example.org;

    ...

}
```

### 避免使用 `if` 检查 `server_name`

> 当 Nginx 收到请求时，无论请求的是哪个子域，无论是 www.example.com 还是普通的 example.com，如果始终对 if 指令进行评估。 由于您是在请求 Nginx 检查每个请求的 Host 标头。 效率极低。
>
> 而是使用两个服务器指令，如下面的示例。 这种方法降低了 Nginx 的处理要求。

示例：

❌ 错误配置

```nginx
server {

  server_name                 domain.com www.domain.com;

  if ($host = www.domain.com) {

    return                    301 https://domain.com$request_uri;

  }

  server_name                 domain.com;

  ...

}
```

⭕ 正确配置

```nginx
server {

    server_name               www.domain.com;

    return                    301 $scheme://domain.com$request_uri;

    ## If you force your web traffic to use HTTPS:
    ##                         301 https://domain.com$request_uri;

    ...

}

server {

    listen                    192.168.252.10:80;

    server_name               domain.com;

    ...

}
```

### 使用 `$request_uri` 来避免使用正则表达式

> 使用内置变量 `$request_uri`，我们可以完全避免进行任何捕获或匹配。默认情况下，正则表达式的代价较高，并且会降低性能。
>
> 此规则用于解决将 URL 不变地传递到新主机，确保仅通过现有 URI 进行返回的效率更高。

示例：

❌ 错误配置

```nginx
## 1)
rewrite ^/(.*)$ https://example.com/$1 permanent;

## 2)
rewrite ^ https://example.com$request_uri? permanent;
```

⭕ 正确配置

```nginx
return 301 https://example.com$request_uri;
```

### 使用 `try_files` 指令确认文件是否存在

> `try_files` is definitely a very useful thing. You can use `try_files` directive to check a file exists in a specified order.

> You should use `try_files` instead of `if` directive. It's definitely better way than using `if` for this action because `if` directive is extremely inefficient since it is evaluated every time for every request.

> The advantage of using `try_files` is that the behavior switches immediately with one command. I think the code is more readable also.

> `try_files` allows you:
>
> - to check if the file exists from a predefined list
> - to check if the file exists from a specified directory
> - to use an internal redirect if none of the files are found

示例：

❌ 错误配置

```nginx

  ...

  root /var/www/example.com;

  location /images {

    if (-f $request_filename) {

      expires 30d;
      break;

    }

  ...

}
```

⭕ 正确配置

```nginx

  ...

  root /var/www/example.com;

  location /images {

    try_files $uri =404;

  ...

}
```

### 使用 return 代替 rewrite 来做重定向

> 您应该使用服务器块和 return 语句，因为它们比通过位置块评估 RegEx 更简单，更快捷。 该指令停止处理，并将指定的代码返回给客户端。

示例：

❌ 错误配置

```nginx
server {

  ...

  if ($host = api.domain.com) {

    rewrite     ^/(.*)$ http://example.com/$1 permanent;

  }

  ...
```

⭕ 正确配置

```nginx
server {

  ...

  if ($host = api.domain.com) {

    return      403;

    ## or other examples:
    ##   return    301 https://domain.com$request_uri;
    ##   return    301 $scheme://$host$request_uri;

  }

  ...
```

### 开启 PCRE JIT 来加速正则表达式处理

> 允许使用 JIT 的正则表达式来加速他们的处理。
>
> 通过与 PCRE 库编译 Nginx 的，你可以用你的 location 块进行复杂的操作和使用功能强大的 return 和 rewrite。
>
> PCRE JIT 可以显著加快正则表达式的处理。 Nginx 的与 pcre_jit 比没有更快的幅度。
>
> 如果你试图在使用 pcre_jit;没有可用的 JIT，或者 Nginx 的与现有 JIT，但当前加载 PCRE 库编译不支持 JIT，将配置解析时发出警告。
>
> 当您编译使用 NGNIX 配置 PCRE 库时，才需要--with-PCRE-JIT 时（./configure --with-PCRE =）。当使用系统 PCRE 库 JIT 是否被支持依赖于库是如何被编译。
>
> 从 Nginx 的文档：
>
> JIT 正在从与--enable-JIT 配置参数内置 8.20 版本开始 PCRE 库提供。当 PCRE 库与 nginx 的内置（--with-PCRE =）时，JIT 支持经由--with-PCRE-JIT 配置参数使能。

示例：

```nginx
## In global context:
pcre_jit on;
```

#### 进行精确的位置匹配以加快选择过程

> 精确的位置匹配通常用于通过立即结束算法的执行来加快选择过程。

示例：

```nginx
## Matches the query / only and stops searching:
location = / {

  ...

}

## Matches the query /v9 only and stops searching:
location = /v9 {

  ...

}

...

## Matches any query due to the fact that all queries begin at /,
## but regular expressions and any longer conventional blocks will be matched at first place:
location / {

  ...

}
```

#### 使用 `limit_conn` 改善对下载速度的限制

> Nginx provides two directives to limiting download speed:
>
> Nginx 提供了两个指令来限制下载速度：
>
> - `limit_rate_after` - 设置 limit_rate 指令生效之前传输的数据量
> - `limit_rate` - 允许您限制单个客户端连接的传输速率

> 此解决方案限制了每个连接的 Nginx 下载速度，因此，如果一个用户打开多个（例如） 视频文件，则可以下载 `X * 连接到视频文件的次数` 。

示例：

```nginx
## Create limit connection zone:
limit_conn_zone $binary_remote_addr zone=conn_for_remote_addr:1m;

## Add rules to limiting the download speed:
limit_rate_after 1m;  ## run at maximum speed for the first 1 megabyte
limit_rate 250k;      ## and set rate limit after 1 megabyte

## Enable queue:
location /videos {

  ## Max amount of data by one client: 10 megabytes (limit_rate_after * 10)
  limit_conn conn_for_remote_addr 10;

  ...
```

## 负载均衡

负载平衡是一种有用的机制，可将传入的流量分布在几个有能力的服务器之间。

### 健康检查

> 健康监控对于所有类型的负载平衡都非常重要，主要是为了业务连续性。 被动检查会按照客户端的请求监视通过 Nginx 的连接失败或超时。
>
> 默认情况下启用此功能，但是此处提到的参数允许您调整其行为。 默认值为：`max_fails = 1` 和 `fail_timeout = 10s`。

示例：

```nginx
upstream backend {

  server bk01_node:80 max_fails=3 fail_timeout=5s;
  server bk02_node:80 max_fails=3 fail_timeout=5s;

}
```

### down 参数

> 有时我们需要关闭后端，例如 在维护时。 我认为良好的解决方案是使用 down 参数将服务器标记为永久不可用，即使停机时间很短也是如此。
>
> 如果您使用 IP 哈希负载平衡技术，那也很重要。 如果其中一台服务器需要临时删除，则应使用此参数进行标记，以保留客户端 IP 地址的当前哈希值。
>
> 注释对于真正永久禁用服务器或要出于历史目的而保留信息非常有用。
>
> Nginx 还提供了一个备份参数，将该服务器标记为备份服务器。 当主服务器不可用时，将传递请求。 仅当我确定后端将在维护时正常工作时，我才很少将此选项用于上述目的。

#### 示例

```nginx
upstream backend {

  server bk01_node:80 max_fails=3 fail_timeout=5s down;
  server bk02_node:80 max_fails=3 fail_timeout=5s;

}
```

## 安全

### 防盗链

```nginx
location ~* \.(gif|jpg|png)$ {
    # 只允许 192.168.0.1 请求资源
    valid_referers none blocked 192.168.0.1;
    if ($invalid_referer) {
       rewrite ^/ http://$host/logo.png;
    }
}
```

## 参考资料

- [nginx 这一篇就够了](https://juejin.im/post/5d81906c518825300a3ec7ca)
