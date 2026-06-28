---
title: Linux 典型运维应用
date: 2018-09-30 18:05:00
order: 01
categories:
  - 操作系统
  - Linux
  - 工具
tags:
  - 操作系统
  - Linux
  - 工具
  - 网络
permalink: /pages/3acae39b/
---

# Linux 典型运维应用

> 💡 如果没有特殊说明，本文的案例都是针对 Centos 发行版本。

## 网络操作

### 无法访问外网域名

（1）在 hosts 中添加本机实际 IP 和本机实际域名的映射

```shell
echo "192.168.0.1 hostname" >> /etc/hosts
```

如果不知道本机域名，使用 `hostname` 命令查一下；如果不知道本机实际 IP，使用 `ifconfig` 查一下。

（2）配置信赖的 DNS 服务器

执行 `vi /etc/resolv.conf` ，添加以下内容：

```shell
nameserver 114.114.114.114
nameserver 8.8.8.8
```

> 114.114.114.114 是国内老牌 DNS
>
> 8.8.8.8 是 Google DNS
>
> :point_right: 参考：[公共 DNS 哪家强](https://www.zhihu.com/question/32229915)

（3）测试一下能否 ping 通 www.baidu.com

### 配置网卡

使用 root 权限编辑 `/etc/sysconfig/network-scripts/ifcfg-eno16777736X` 文件

参考以下进行配置：

```properties
TYPE=Ethernet                        # 网络类型：Ethernet以太网
BOOTPROTO=none                       # 引导协议：自动获取、static静态、none不指定
DEFROUTE=yes                         # 启动默认路由
IPV4_FAILURE_FATAL=no                # 不启用IPV4错误检测功能
IPV6INIT=yes                         # 启用IPV6协议
IPV6_AUTOCONF=yes                    # 自动配置IPV6地址
IPV6_DEFROUTE=yes                    # 启用IPV6默认路由
IPV6_FAILURE_FATAL=no                # 不启用IPV6错误检测功能
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_PRIVACY="no"

NAME=eno16777736                     # 网卡设备的别名（需要和文件名同名）
UUID=90528772-9967-46da-b401-f82b64b4acbc  # 网卡设备的UUID唯一标识号
DEVICE=eno16777736                   # 网卡的设备名称
ONBOOT=yes                           # 开机自动激活网卡
IPADDR=192.168.1.199                 # 网卡的固定IP地址
PREFIX=24                            # 子网掩码
GATEWAY=192.168.1.1                  # 默认网关IP地址
DNS1=8.8.8.8                         # DNS域名解析服务器的IP地址
```

修改完后，执行 `systemctl restart network.service` 重启网卡服务。

## 自动化脚本

### Linux 开机自启动脚本

（1）在 `/etc/rc.local` 文件中添加命令

如果不想将脚本粘来粘去，或创建链接，可以在 `/etc/rc.local` 文件中添加启动命令

1. 先修改好脚本，使其所有模块都能在任意目录启动时正常执行;
2. 再在 `/etc/rc.local` 的末尾添加一行以绝对路径启动脚本的行;

例：

执行 `vim /etc/rc.local` 命令，输入以下内容：

```shell
#!/bin/sh
#
# This script will be executed *after* all the other init scripts.
# You can put your own initialization stuff in here if you don't
# want to do the full Sys V style init stuff.

touch /var/lock/subsys/local
/opt/pjt_test/test.pl
```

（2）在 `/etc/rc.d/init.d` 目录下添加自启动脚本

Linux 在 `/etc/rc.d/init.d` 下有很多的文件，每个文件都是可以看到内容的，其实都是一些 shell 脚本或者可执行二进制文件。

Linux 开机的时候，会加载运行 `/etc/rc.d/init.d` 目录下的程序，因此我们可以把想要自动运行的脚本放到这个目录下即可。系统服务的启动就是通过这种方式实现的。

（3）运行级别设置

简单的说，运行级就是操作系统当前正在运行的功能级别。

```shell
不同的运行级定义如下:
# 0 - 停机（千万不能把initdefault 设置为0 ）
# 1 - 单用户模式       　　进入方法#init s = init 1
# 2 - 多用户，没有 NFS
# 3 - 完全多用户模式(标准的运行级)
# 4 - 没有用到
# 5 - X11 多用户图形模式（xwindow)
# 6 - 重新启动 （千万不要把initdefault 设置为6 ）
```

这些级别在 `/etc/inittab` 文件里指定，这个文件是 init 程序寻找的主要文件，最先运行的服务是放在/etc/rc.d 目录下的文件。

在 `/etc` 目录下面有这么几个目录值得注意：rcS.d rc0.d rc1.d ... rc6.d (0，1... 6 代表启动级别 0 代表停止，1 代表单用户模式，2-5 代表多用户模式，6 代表重启) 它们的作用就相当于 redhat 下的 rc.d ，你可以把脚本放到 rcS.d，然后修改文件名，给它一个启动序号，如: S88mysql

不过，最好的办法是放到相应的启动级别下面。具体作法:

（1）先把脚本 mysql 放到 /etc/init.d 目录下

（2）查看当前系统的启动级别

```shell
$ runlevel
N 3
```

（3）设定启动级别

```shell
#  98 为启动序号
#  2 是系统的运行级别，可自己调整，注意不要忘了结尾的句点
$ update-rc.d MySQL start 98 2 .
```

现在我们到 /etc/rc2.d 下，就多了一个 S98mysql 这样的符号链接。

（4）重启系统，验证设置是否有效。

（5）移除符号链接

当你需要移除这个符号连接时，方法有三种：

1. 直接到 `/etc/rc2.d` 下删掉相应的链接，当然不是最好的方法；

2. 推荐做法：`update-rc.d -f s10 remove`
3. 如果 update-rc.d 命令你不熟悉，还可以试试看 rcconf 这个命令，也很方便。

> :point_right: 参考：
>
> - [linux 添加开机自启动脚本示例详解](https://blog.csdn.net/linuxshine/article/details/50717272)
> - [linux 设置开机自启动](https://www.cnblogs.com/ssooking/p/6094740.html)

### 定时执行脚本

## 配置

### 设置 Linux 启动模式

1. 停机(记得不要把 initdefault 配置为 0，因为这样会使 Linux 不能启动)
2. 单用户模式，就像 Win9X 下的安全模式
3. 多用户，但是没有 NFS
4. 完全多用户模式，准则的运行级
5. 通常不用，在一些特殊情况下可以用它来做一些事情
6. X11，即进到 X-Window 系统
7. 重新启动 (记得不要把 initdefault 配置为 6，因为这样会使 Linux 不断地重新启动)

设置方法：

```shell
sed -i 's/id:5:initdefault:/id:3:initdefault:/' /etc/inittab
```

## 参考资料

- [CentOS7 使用 firewalld 打开关闭防火墙与端口](https://www.cnblogs.com/moxiaoan/p/5683743.html)
- [linux 定时执行脚本](https://blog.csdn.net/z_yong_cool/article/details/79288397)
