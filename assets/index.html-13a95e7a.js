import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c as o,a as s,b as n,d as e,e as t}from"./app-6ed3f423.js";const c={},d=s("h1",{id:"一篇文章让你彻底掌握-shell",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#一篇文章让你彻底掌握-shell","aria-hidden":"true"},"#"),n(" 一篇文章让你彻底掌握 Shell")],-1),r=s("p",null,"由于 bash 是 Linux 标准默认的 shell 解释器，可以说 bash 是 shell 编程的基础。",-1),u=s("p",null,[s("em",null,"本文主要介绍 bash 的语法，对于 linux 指令不做任何介绍"),n("。")],-1),v={href:"https://github.com/dunwu/linux-tutorial/tree/master/codes/shell/demos",target:"_blank",rel:"noopener noreferrer"},k=s("strong",null,[s("em",null,"linux-tutorial")],-1),b=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>███████╗██╗  ██╗███████╗██╗     ██╗
██╔════╝██║  ██║██╔════╝██║     ██║
███████╗███████║█████╗  ██║     ██║
╚════██║██╔══██║██╔══╝  ██║     ██║
███████║██║  ██║███████╗███████╗███████╗
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><h3 id="什么是-shell" tabindex="-1"><a class="header-anchor" href="#什么是-shell" aria-hidden="true">#</a> 什么是 shell</h3><ul><li>Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。</li><li>Shell 既是一种命令语言，又是一种程序设计语言。</li><li>Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问 Linux 内核的服务。</li></ul><p>Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell。</p><h3 id="什么是-shell-脚本" tabindex="-1"><a class="header-anchor" href="#什么是-shell-脚本" aria-hidden="true">#</a> 什么是 shell 脚本</h3><p>Shell 脚本（shell script），是一种为 shell 编写的脚本程序，一般文件后缀为 <code>.sh</code>。</p><p>业界所说的 shell 通常都是指 shell 脚本，但 shell 和 shell script 是两个不同的概念。</p><h3 id="shell-环境" tabindex="-1"><a class="header-anchor" href="#shell-环境" aria-hidden="true">#</a> Shell 环境</h3><p>Shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。</p><p>Shell 的解释器种类众多，常见的有：</p>`,11),m={href:"https://www.gnu.org/software/bash/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.gnu.org/software/bash/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://fishshell.com/",target:"_blank",rel:"noopener noreferrer"},f={href:"http://xiki.org/",target:"_blank",rel:"noopener noreferrer"},q={href:"http://www.zsh.org/",target:"_blank",rel:"noopener noreferrer"},y=s("h4",{id:"指定脚本解释器",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#指定脚本解释器","aria-hidden":"true"},"#"),n(" 指定脚本解释器")],-1),$=s("code",null,"#!",-1),x=s("code",null,"#!",-1),w={href:"https://zh.wikipedia.org/wiki/Shebang",target:"_blank",rel:"noopener noreferrer"},_=t(`<p>所以，你应该会在 shell 中，见到诸如以下的注释：</p><ul><li>指定 sh 解释器</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>指定 bash 解释器</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p><strong>注意</strong></p><p>上面的指定解释器的方式是比较常见的，但有时候，你可能也会看到下面的方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样做的好处是，系统会自动在 <code>PATH</code> 环境变量中查找你指定的程序（本例中的<code>bash</code>）。相比第一种写法，你应该尽量用这种写法，因为程序的路径是不确定的。这样写还有一个好处，操作系统的<code>PATH</code>变量有可能被配置为指向程序的另一个版本。比如，安装完新版本的<code>bash</code>，我们可能将其路径添加到<code>PATH</code>中，来“隐藏”老版本。如果直接用<code>#!/bin/bash</code>，那么系统会选择老版本的<code>bash</code>来执行脚本，如果用<code>#!/usr/bin/env bash</code>，则会使用新版本。</p></blockquote><h3 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h3><p>shell 有交互和非交互两种模式。</p><h4 id="交互模式" tabindex="-1"><a class="header-anchor" href="#交互模式" aria-hidden="true">#</a> 交互模式</h4><blockquote><p>简单来说，你可以将 shell 的交互模式理解为执行命令行。</p></blockquote><p>看到形如下面的东西，说明 shell 处于交互模式下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user@host:~$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，便可以输入一系列 Linux 命令，比如 <code>ls</code>，<code>grep</code>，<code>cd</code>，<code>mkdir</code>，<code>rm</code> 等等。</p><h4 id="非交互模式" tabindex="-1"><a class="header-anchor" href="#非交互模式" aria-hidden="true">#</a> 非交互模式</h4><blockquote><p>简单来说，你可以将 shell 的非交互模式理解为执行 shell 脚本。</p></blockquote><p>在非交互模式下，shell 从文件或者管道中读取命令并执行。</p><p>当 shell 解释器执行完文件中的最后一个命令，shell 进程终止，并回到父进程。</p><p>可以使用下面的命令让 shell 以非交互模式运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> /path/to/script.sh
<span class="token function">bash</span> /path/to/script.sh
<span class="token builtin class-name">source</span> /path/to/script.sh
./path/to/script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，<code>script.sh</code>是一个包含 shell 解释器可以识别并执行的命令的普通文本文件，<code>sh</code>和<code>bash</code>是 shell 解释器程序。你可以使用任何喜欢的编辑器创建<code>script.sh</code>（vim，nano，Sublime Text, Atom 等等）。</p><p>其中，<code>source /path/to/script.sh</code> 和 <code>./path/to/script.sh</code> 是等价的。</p><p>除此之外，你还可以通过<code>chmod</code>命令给文件添加可执行的权限，来直接执行脚本文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /path/to/script.sh <span class="token comment">#使脚本具有执行权限</span>
/path/to/test.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式要求脚本文件的第一行必须指明运行该脚本的程序，比如：</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello, world!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，我们使用了一个很有用的命令<code>echo</code>来输出字符串到屏幕上。</p><h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2><h3 id="解释器" tabindex="-1"><a class="header-anchor" href="#解释器" aria-hidden="true">#</a> 解释器</h3><p>前面虽然两次提到了<code>#!</code> ，但是本着重要的事情说三遍的精神，这里再强调一遍：</p>`,30),O=s("code",null,"#!",-1),E=s("code",null,"#!",-1),S={href:"https://zh.wikipedia.org/wiki/Shebang",target:"_blank",rel:"noopener noreferrer"},N=t(`<p><code>#!</code> 决定了脚本可以像一个独立的可执行文件一样执行，而不用在终端之前输入<code>sh</code>, <code>bash</code>, <code>python</code>, <code>php</code>等。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以下两种方式都可以指定 shell 解释器为 bash，第二种方式更好</span>
<span class="token comment">#!/bin/bash</span>
<span class="token comment">#!/usr/bin/env bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><p>注释可以说明你的代码是什么作用，以及为什么这样写。</p><p>shell 语法中，注释是特殊的语句，会被 shell 解释器忽略。</p><ul><li>单行注释 - 以 <code>#</code> 开头，到行尾结束。</li><li>多行注释 - 以 <code>:&lt;&lt;EOF</code> 开头，到 <code>EOF</code> 结束。</li></ul><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#--------------------------------------------</span>
<span class="token comment"># shell 注释示例</span>
<span class="token comment"># author：zp</span>
<span class="token comment">#--------------------------------------------</span>

<span class="token comment"># echo &#39;这是单行注释&#39;</span>

<span class="token comment">########## 这是分割线 ##########</span>

:<span class="token operator">&lt;&lt;</span><span class="token string">EOF
echo &#39;这是多行注释&#39;
echo &#39;这是多行注释&#39;
echo &#39;这是多行注释&#39;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="echo" tabindex="-1"><a class="header-anchor" href="#echo" aria-hidden="true">#</a> echo</h3><p>echo 用于字符串的输出。</p><p>输出普通字符串：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, world&quot;</span>
<span class="token comment"># Output: hello, world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出含变量的字符串：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, <span class="token entity" title="\\&quot;">\\&quot;</span>zp<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>
<span class="token comment"># Output: hello, &quot;zp&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出含变量的字符串：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">name</span><span class="token operator">=</span>zp
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">\${name}</span><span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>
<span class="token comment"># Output: hello, &quot;zp&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出含换行符的字符串：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 输出含换行符的字符串</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;YES<span class="token entity" title="\\n">\\n</span>NO&quot;</span>
<span class="token comment">#  Output: YES\\nNO</span>

<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;YES<span class="token entity" title="\\n">\\n</span>NO&quot;</span> <span class="token comment"># -e 开启转义</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YES</span>
<span class="token comment">#  NO</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出含不换行符的字符串：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;YES&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NO&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YES</span>
<span class="token comment">#  NO</span>

<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;YES<span class="token entity" title="\\c">\\c</span>&quot;</span> <span class="token comment"># -e 开启转义 \\c 不换行</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NO&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YESNO</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出重定向至文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;test&quot;</span> <span class="token operator">&gt;</span> test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出执行结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
<span class="token comment">#  Output:(当前目录路径)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment"># 输出普通字符串</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, world&quot;</span>
<span class="token comment">#  Output: hello, world</span>

<span class="token comment"># 输出含变量的字符串</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, <span class="token entity" title="\\&quot;">\\&quot;</span>zp<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>
<span class="token comment">#  Output: hello, &quot;zp&quot;</span>

<span class="token comment"># 输出含变量的字符串</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>zp
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello, <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">\${name}</span><span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>
<span class="token comment">#  Output: hello, &quot;zp&quot;</span>

<span class="token comment"># 输出含换行符的字符串</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;YES<span class="token entity" title="\\n">\\n</span>NO&quot;</span>
<span class="token comment">#  Output: YES\\nNO</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;YES<span class="token entity" title="\\n">\\n</span>NO&quot;</span> <span class="token comment"># -e 开启转义</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YES</span>
<span class="token comment">#  NO</span>

<span class="token comment"># 输出含不换行符的字符串</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;YES&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NO&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YES</span>
<span class="token comment">#  NO</span>

<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;YES<span class="token entity" title="\\c">\\c</span>&quot;</span> <span class="token comment"># -e 开启转义 \\c 不换行</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NO&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  YESNO</span>

<span class="token comment"># 输出内容定向至文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;test&quot;</span> <span class="token operator">&gt;</span> test.txt

<span class="token comment"># 输出执行结果</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
<span class="token comment">#  Output:(当前目录路径)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="printf" tabindex="-1"><a class="header-anchor" href="#printf" aria-hidden="true">#</a> printf</h3><p>printf 用于格式化输出字符串。</p><p>默认，printf 不会像 echo 一样自动添加换行符，如果需要换行可以手动添加 <code>\\n</code>。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 单引号</span>
<span class="token builtin class-name">printf</span> <span class="token string">&#39;%d %s\\n&#39;</span> <span class="token number">1</span> <span class="token string">&quot;abc&quot;</span>
<span class="token comment">#  Output:1 abc</span>

<span class="token comment"># 双引号</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%d %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token number">1</span> <span class="token string">&quot;abc&quot;</span>
<span class="token comment">#  Output:1 abc</span>

<span class="token comment"># 无引号</span>
<span class="token builtin class-name">printf</span> %s abcdef
<span class="token comment">#  Output: abcdef(并不会换行)</span>

<span class="token comment"># 格式只指定了一个参数，但多出的参数仍然会按照该格式输出</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%s<span class="token entity" title="\\n">\\n</span>&quot;</span> abc def
<span class="token comment">#  Output:</span>
<span class="token comment">#  abc</span>
<span class="token comment">#  def</span>

<span class="token builtin class-name">printf</span> <span class="token string">&quot;%s %s %s<span class="token entity" title="\\n">\\n</span>&quot;</span> a b c d e f g h i j
<span class="token comment">#  Output:</span>
<span class="token comment">#  a b c</span>
<span class="token comment">#  d e f</span>
<span class="token comment">#  g h i</span>
<span class="token comment">#  j</span>

<span class="token comment"># 如果没有参数，那么 %s 用 NULL 代替，%d 用 0 代替</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%s and %d <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#   and 0</span>

<span class="token comment"># 格式化输出</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-10s %-8s %-4s<span class="token entity" title="\\n">\\n</span>&quot;</span> 姓名 性别 体重kg
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-10s %-8s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> 郭靖 男 <span class="token number">66.1234</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-10s %-8s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> 杨过 男 <span class="token number">48.6543</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-10s %-8s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> 郭芙 女 <span class="token number">47.9876</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  姓名     性别   体重kg</span>
<span class="token comment">#  郭靖     男      66.12</span>
<span class="token comment">#  杨过     男      48.65</span>
<span class="token comment">#  郭芙     女      47.99</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="printf-的转义符" tabindex="-1"><a class="header-anchor" href="#printf-的转义符" aria-hidden="true">#</a> printf 的转义符</h4><table><thead><tr><th>序列</th><th>说明</th></tr></thead><tbody><tr><td><code>\\a</code></td><td>警告字符，通常为 ASCII 的 BEL 字符</td></tr><tr><td><code>\\b</code></td><td>后退</td></tr><tr><td><code>\\c</code></td><td>抑制（不显示）输出结果中任何结尾的换行字符（只在%b 格式指示符控制下的参数字符串中有效），而且，任何留在参数里的字符、任何接下来的参数以及任何留在格式字符串中的字符，都被忽略</td></tr><tr><td><code>\\f</code></td><td>换页（formfeed）</td></tr><tr><td><code>\\n</code></td><td>换行</td></tr><tr><td><code>\\r</code></td><td>回车（Carriage return）</td></tr><tr><td><code>\\t</code></td><td>水平制表符</td></tr><tr><td><code>\\v</code></td><td>垂直制表符</td></tr><tr><td><code>\\\\</code></td><td>一个字面上的反斜杠字符</td></tr><tr><td><code>\\ddd</code></td><td>表示 1 到 3 位数八进制值的字符。仅在格式字符串中有效</td></tr><tr><td><code>\\0ddd</code></td><td>表示 1 到 3 位的八进制值字符</td></tr></tbody></table><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><p>跟许多程序设计语言一样，你可以在 bash 中创建变量。</p><p>Bash 中没有数据类型，bash 中的变量可以保存一个数字、一个字符、一个字符串等等。同时无需提前声明变量，给变量赋值会直接创建变量。</p><h3 id="变量命名原则" tabindex="-1"><a class="header-anchor" href="#变量命名原则" aria-hidden="true">#</a> 变量命名原则</h3><ul><li>命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。</li><li>中间不能有空格，可以使用下划线（_）。</li><li>不能使用标点符号。</li><li>不能使用 bash 里的关键字（可用 help 命令查看保留关键字）。</li></ul><h3 id="声明变量" tabindex="-1"><a class="header-anchor" href="#声明变量" aria-hidden="true">#</a> 声明变量</h3><p>访问变量的语法形式为：<code>\${var}</code> 和 <code>$var</code> 。</p><p>变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，所以推荐加花括号。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">word</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${word}</span>
<span class="token comment"># Output: hello</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="只读变量" tabindex="-1"><a class="header-anchor" href="#只读变量" aria-hidden="true">#</a> 只读变量</h3><p>使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">rword</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${rword}</span>
<span class="token builtin class-name">readonly</span> rword
<span class="token comment"># rword=&quot;bye&quot;  # 如果放开注释，执行时会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除变量" tabindex="-1"><a class="header-anchor" href="#删除变量" aria-hidden="true">#</a> 删除变量</h3><p>使用 unset 命令可以删除变量。变量被删除后不能再次使用。unset 命令不能删除只读变量。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">dword</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>  <span class="token comment"># 声明变量</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${dword}</span>  <span class="token comment"># 输出变量值</span>
<span class="token comment"># Output: hello</span>

<span class="token builtin class-name">unset</span> dword    <span class="token comment"># 删除变量</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${dword}</span>
<span class="token comment"># Output: （空）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量类型" tabindex="-1"><a class="header-anchor" href="#变量类型" aria-hidden="true">#</a> 变量类型</h3><ul><li><strong>局部变量</strong> - 局部变量是仅在某个脚本内部有效的变量。它们不能被其他的程序和脚本访问。</li><li><strong>环境变量</strong> - 环境变量是对当前 shell 会话内所有的程序或脚本都可见的变量。创建它们跟创建局部变量类似，但使用的是 <code>export</code> 关键字，shell 脚本也可以定义环境变量。</li></ul><p>常见的环境变量：</p><table><thead><tr><th>变量</th><th>描述</th></tr></thead><tbody><tr><td><code>$HOME</code></td><td>当前用户的用户目录</td></tr><tr><td><code>$PATH</code></td><td>用分号分隔的目录列表，shell 会到这些目录中查找命令</td></tr><tr><td><code>$PWD</code></td><td>当前工作目录</td></tr><tr><td><code>$RANDOM</code></td><td>0 到 32767 之间的整数</td></tr><tr><td><code>$UID</code></td><td>数值类型，当前用户的用户 ID</td></tr><tr><td><code>$PS1</code></td><td>主要系统输入提示符</td></tr><tr><td><code>$PS2</code></td><td>次要系统输入提示符</td></tr></tbody></table>`,52),A={href:"http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html###sect_03_02_04",target:"_blank",rel:"noopener noreferrer"},I=t(`<p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment">################### 声明变量 ###################</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;world&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello <span class="token variable">\${name}</span>&quot;</span>
<span class="token comment"># Output: hello world</span>

<span class="token comment">################### 输出变量 ###################</span>
<span class="token assign-left variable">folder</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;current path: <span class="token variable">\${folder}</span>&quot;</span>

<span class="token comment">################### 只读变量 ###################</span>
<span class="token assign-left variable">rword</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${rword}</span>
<span class="token comment"># Output: hello</span>
<span class="token builtin class-name">readonly</span> rword
<span class="token comment"># rword=&quot;bye&quot;  # 如果放开注释，执行时会报错</span>

<span class="token comment">################### 删除变量 ###################</span>
<span class="token assign-left variable">dword</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span> <span class="token comment"># 声明变量</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${dword}</span> <span class="token comment"># 输出变量值</span>
<span class="token comment"># Output: hello</span>

<span class="token builtin class-name">unset</span> dword <span class="token comment"># 删除变量</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${dword}</span>
<span class="token comment"># Output: （空）</span>

<span class="token comment">################### 系统变量 ###################</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;UID:<span class="token environment constant">$UID</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">LOGNAME</span><span class="token builtin class-name">:</span><span class="token environment constant">$LOGNAME</span>
<span class="token builtin class-name">echo</span> User:<span class="token environment constant">$USER</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">HOME</span><span class="token builtin class-name">:</span><span class="token environment constant">$HOME</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">PATH</span><span class="token builtin class-name">:</span><span class="token environment constant">$PATH</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">HOSTNAME</span><span class="token builtin class-name">:</span><span class="token environment constant">$HOSTNAME</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">SHELL</span><span class="token builtin class-name">:</span><span class="token environment constant">$SHELL</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">LANG</span><span class="token builtin class-name">:</span><span class="token environment constant">$LANG</span>

<span class="token comment">################### 自定义变量 ###################</span>
<span class="token assign-left variable">days</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&quot;admin&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> logged in <span class="token variable">$days</span> days age&quot;</span>
<span class="token assign-left variable">days</span><span class="token operator">=</span><span class="token number">5</span>
<span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&quot;root&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> logged in <span class="token variable">$days</span> days age&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># admin logged in 10 days age</span>
<span class="token comment"># root logged in 5 days age</span>

<span class="token comment">################### 从变量读取列表 ###################</span>
<span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token string">&quot;Red Yellow Blue&quot;</span>
<span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token variable">$colors</span><span class="token string">&quot; White Black&quot;</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">color</span> <span class="token keyword">in</span> <span class="token variable">$colors</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot; <span class="token variable">$color</span>&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h2><h3 id="单引号和双引号" tabindex="-1"><a class="header-anchor" href="#单引号和双引号" aria-hidden="true">#</a> 单引号和双引号</h3><p>shell 字符串可以用单引号 <code>&#39;&#39;</code>，也可以用双引号 <code>“”</code>，也可以不用引号。</p><ul><li>单引号的特点 <ul><li>单引号里不识别变量</li><li>单引号里不能出现单独的单引号（使用转义符也不行），但可成对出现，作为字符串拼接使用。</li></ul></li><li>双引号的特点 <ul><li>双引号里识别变量</li><li>双引号里可以出现转义字符</li></ul></li></ul><p>综上，推荐使用双引号。</p><h3 id="拼接字符串" tabindex="-1"><a class="header-anchor" href="#拼接字符串" aria-hidden="true">#</a> 拼接字符串</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用单引号拼接</span>
<span class="token assign-left variable">name1</span><span class="token operator">=</span><span class="token string">&#39;white&#39;</span>
<span class="token assign-left variable">str1</span><span class="token operator">=</span><span class="token string">&#39;hello, &#39;</span><span class="token variable">\${name1}</span><span class="token string">&#39;&#39;</span>
<span class="token assign-left variable">str2</span><span class="token operator">=</span><span class="token string">&#39;hello, \${name1}&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${str1}</span>_<span class="token variable">\${str2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># hello, white_hello, \${name1}</span>

<span class="token comment"># 使用双引号拼接</span>
<span class="token assign-left variable">name2</span><span class="token operator">=</span><span class="token string">&quot;black&quot;</span>
<span class="token assign-left variable">str3</span><span class="token operator">=</span><span class="token string">&quot;hello, &quot;</span><span class="token variable">\${name2}</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">str4</span><span class="token operator">=</span><span class="token string">&quot;hello, <span class="token variable">\${name2}</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${str3}</span>_<span class="token variable">\${str4}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># hello, black_hello, black</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取字符串长度" tabindex="-1"><a class="header-anchor" href="#获取字符串长度" aria-hidden="true">#</a> 获取字符串长度</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;12345&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>text}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="截取子字符串" tabindex="-1"><a class="header-anchor" href="#截取子字符串" aria-hidden="true">#</a> 截取子字符串</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;12345&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${text<span class="token operator">:</span>2<span class="token operator">:</span>2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 34</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从第 3 个字符开始，截取 2 个字符</p><h3 id="查找子字符串" tabindex="-1"><a class="header-anchor" href="#查找子字符串" aria-hidden="true">#</a> 查找子字符串</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> index <span class="token string">&quot;<span class="token variable">\${text}</span>&quot;</span> ll<span class="token variable">\`</span></span>

<span class="token comment"># Execute: ./str-demo5.sh</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查找 <code>ll</code> 子字符在 <code>hello</code> 字符串中的起始位置。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment">################### 使用单引号拼接字符串 ###################</span>
<span class="token assign-left variable">name1</span><span class="token operator">=</span><span class="token string">&#39;white&#39;</span>
<span class="token assign-left variable">str1</span><span class="token operator">=</span><span class="token string">&#39;hello, &#39;</span><span class="token variable">\${name1}</span><span class="token string">&#39;&#39;</span>
<span class="token assign-left variable">str2</span><span class="token operator">=</span><span class="token string">&#39;hello, \${name1}&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${str1}</span>_<span class="token variable">\${str2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># hello, white_hello, \${name1}</span>

<span class="token comment">################### 使用双引号拼接字符串 ###################</span>
<span class="token assign-left variable">name2</span><span class="token operator">=</span><span class="token string">&quot;black&quot;</span>
<span class="token assign-left variable">str3</span><span class="token operator">=</span><span class="token string">&quot;hello, &quot;</span><span class="token variable">\${name2}</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">str4</span><span class="token operator">=</span><span class="token string">&quot;hello, <span class="token variable">\${name2}</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${str3}</span>_<span class="token variable">\${str4}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># hello, black_hello, black</span>

<span class="token comment">################### 获取字符串长度 ###################</span>
<span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;12345&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${text}</span> length is: <span class="token variable">\${<span class="token operator">#</span>text}</span>&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 12345 length is: 5</span>

<span class="token comment"># 获取子字符串</span>
<span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;12345&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${text<span class="token operator">:</span>2<span class="token operator">:</span>2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 34</span>

<span class="token comment">################### 查找子字符串 ###################</span>
<span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;hello&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> index <span class="token string">&quot;<span class="token variable">\${text}</span>&quot;</span> ll<span class="token variable">\`</span></span>
<span class="token comment"># Output:</span>
<span class="token comment"># 3</span>

<span class="token comment">################### 判断字符串中是否包含子字符串 ###################</span>
<span class="token assign-left variable">result</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${str}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;feature/&quot;</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$result</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;feature/ 是 <span class="token variable">\${str}</span> 的子字符串&quot;</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;feature/ 不是 <span class="token variable">\${str}</span> 的子字符串&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">################### 截取关键字左边内容 ###################</span>
<span class="token assign-left variable">full_branch</span><span class="token operator">=</span><span class="token string">&quot;feature/1.0.0&quot;</span>
<span class="token assign-left variable">branch</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>full_branch<span class="token comment">#feature/}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;branch is <span class="token variable">\${branch}</span>&quot;</span>

<span class="token comment">################### 截取关键字右边内容 ###################</span>
<span class="token assign-left variable">full_version</span><span class="token operator">=</span><span class="token string">&quot;0.0.1-SNAPSHOT&quot;</span>
<span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>full_version%-SNAPSHOT<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;version is <span class="token variable">\${version}</span>&quot;</span>

<span class="token comment">################### 字符串分割成数组 ###################</span>
<span class="token assign-left variable">str</span><span class="token operator">=</span><span class="token string">&quot;0.0.0.1&quot;</span>
<span class="token assign-left variable">OLD_IFS</span><span class="token operator">=</span><span class="token string">&quot;<span class="token environment constant">$IFS</span>&quot;</span>
<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&quot;.&quot;</span>
<span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token variable">\${str}</span> <span class="token punctuation">)</span>
<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$OLD_IFS</span>&quot;</span>
<span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token assign-left variable">lastIndex</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>size<span class="token punctuation">}</span> - <span class="token number">1</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;数组长度：<span class="token variable">\${size}</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;最后一个数组元素：<span class="token variable">\${array<span class="token punctuation">[</span>\${lastIndex}</span>]}&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> <span class="token variable">\${array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$item</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token comment">################### 判断字符串是否为空 ###################</span>
<span class="token comment">#-n 判断长度是否非零</span>
<span class="token comment">#-z 判断长度是否为零</span>

<span class="token assign-left variable">str</span><span class="token operator">=</span>testing
<span class="token assign-left variable">str2</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$str</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;The string <span class="token variable">$str</span> is not empty&quot;</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;The string <span class="token variable">$str</span> is empty&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$str2</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;The string <span class="token variable">$str2</span> is not empty&quot;</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;The string <span class="token variable">$str2</span> is empty&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#	Output:</span>
<span class="token comment">#	The string testing is not empty</span>
<span class="token comment">#	The string  is empty</span>

<span class="token comment">################### 字符串比较 ###################</span>
<span class="token assign-left variable">str</span><span class="token operator">=</span>hello
<span class="token assign-left variable">str2</span><span class="token operator">=</span>world
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$str</span> <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;str equals hello&quot;</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;str not equals hello&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$str2</span> <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;str2 equals hello&quot;</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;str2 not equals hello&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><p>bash 只支持一维数组。</p><p>数组下标从 0 开始，下标可以是整数或算术表达式，其值应大于或等于 0。</p><h3 id="创建数组" tabindex="-1"><a class="header-anchor" href="#创建数组" aria-hidden="true">#</a> 创建数组</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建数组的不同方式</span>
<span class="token assign-left variable">nums</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">2</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token punctuation">(</span>red yellow <span class="token string">&quot;dark blue&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="访问数组元素" tabindex="-1"><a class="header-anchor" href="#访问数组元素" aria-hidden="true">#</a> 访问数组元素</h3><ul><li><strong>访问数组的单个元素：</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>访问数组的所有元素：</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: red yellow dark blue</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: red yellow dark blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两行有很重要（也很微妙）的区别：</p><p>为了将数组中每个元素单独一行输出，我们用 <code>printf</code> 命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red</span>
<span class="token comment"># + yellow</span>
<span class="token comment"># + dark</span>
<span class="token comment"># + blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么<code>dark</code>和<code>blue</code>各占了一行？尝试用引号包起来：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red yellow dark blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在所有的元素都在一行输出 —— 这不是我们想要的！让我们试试<code>\${colors[@]}</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red</span>
<span class="token comment"># + yellow</span>
<span class="token comment"># + dark blue</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在引号内，<code>\${colors[@]}</code>将数组中的每个元素扩展为一个单独的参数；数组元素中的空格得以保留。</p><ul><li><strong>访问数组的部分元素：</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>@<span class="token punctuation">]</span><span class="token operator">:</span>0<span class="token operator">:</span>2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 0 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>\${array[@]}</code> 扩展为整个数组，<code>:0:2</code>取出了数组中从 0 开始，长度为 2 的元素。</p><h3 id="访问数组长度" tabindex="-1"><a class="header-anchor" href="#访问数组长度" aria-hidden="true">#</a> 访问数组长度</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>nums<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="向数组中添加元素" tabindex="-1"><a class="header-anchor" href="#向数组中添加元素" aria-hidden="true">#</a> 向数组中添加元素</h3><p>向数组中添加元素也非常简单：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token punctuation">(</span>white <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span> green black<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># white red yellow dark blue green black</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中，<code>\${colors[@]}</code> 扩展为整个数组，并被置换到复合赋值语句中，接着，对数组<code>colors</code>的赋值覆盖了它原来的值。</p><h3 id="从数组中删除元素" tabindex="-1"><a class="header-anchor" href="#从数组中删除元素" aria-hidden="true">#</a> 从数组中删除元素</h3><p>用<code>unset</code>命令来从数组中删除一个元素：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">unset</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment">################### 创建数组 ###################</span>
<span class="token assign-left variable">nums</span><span class="token operator">=</span><span class="token punctuation">(</span> <span class="token punctuation">[</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">[</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">[</span> <span class="token number">1</span> <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">)</span>
<span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token punctuation">(</span> red yellow <span class="token string">&quot;dark blue&quot;</span> <span class="token punctuation">)</span>

<span class="token comment">################### 访问数组的单个元素 ###################</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: 1</span>

<span class="token comment">################### 访问数组的所有元素 ###################</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: red yellow dark blue</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output: red yellow dark blue</span>

<span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red</span>
<span class="token comment"># + yellow</span>
<span class="token comment"># + dark</span>
<span class="token comment"># + blue</span>

<span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red yellow dark blue</span>

<span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span>
<span class="token comment"># Output:</span>
<span class="token comment"># + red</span>
<span class="token comment"># + yellow</span>
<span class="token comment"># + dark blue</span>

<span class="token comment">################### 访问数组的部分元素 ###################</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>@<span class="token punctuation">]</span><span class="token operator">:</span>0<span class="token operator">:</span>2}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 0 1</span>

<span class="token comment">################### 获取数组长度 ###################</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>nums<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 3</span>

<span class="token comment">################### 向数组中添加元素 ###################</span>
<span class="token assign-left variable">colors</span><span class="token operator">=</span><span class="token punctuation">(</span> white <span class="token string">&quot;<span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span> green black <span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${colors<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># white red yellow dark blue green black</span>

<span class="token comment">################### 从数组中删除元素 ###################</span>
<span class="token builtin class-name">unset</span> nums<span class="token punctuation">[</span> <span class="token number">0</span> <span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${nums<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment"># Output:</span>
<span class="token comment"># 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><h3 id="算术运算符" tabindex="-1"><a class="header-anchor" href="#算术运算符" aria-hidden="true">#</a> 算术运算符</h3><p>下表列出了常用的算术运算符，假定变量 x 为 10，变量 y 为 20：</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td>+</td><td>加法</td><td><code>expr $x + $y</code> 结果为 30。</td></tr><tr><td>-</td><td>减法</td><td><code>expr $x - $y</code> 结果为 -10。</td></tr><tr><td>*</td><td>乘法</td><td><code>expr $x * $y</code> 结果为 200。</td></tr><tr><td>/</td><td>除法</td><td><code>expr $y / $x</code> 结果为 2。</td></tr><tr><td>%</td><td>取余</td><td><code>expr $y % $x</code> 结果为 0。</td></tr><tr><td>=</td><td>赋值</td><td><code>x=$y</code> 将把变量 y 的值赋给 x。</td></tr><tr><td>==</td><td>相等。用于比较两个数字，相同则返回 true。</td><td><code>[ $x == $y ]</code> 返回 false。</td></tr><tr><td>!=</td><td>不相等。用于比较两个数字，不相同则返回 true。</td><td><code>[ $x != $y ]</code> 返回 true。</td></tr></tbody></table><p>**注意：**条件表达式要放在方括号之间，并且要有空格，例如: <code>[$x==$y]</code> 是错误的，必须写成 <code>[ $x == $y ]</code>。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">20</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;x=<span class="token variable">\${x}</span>, y=<span class="token variable">\${y}</span>&quot;</span>

<span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> + $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> + <span class="token variable">\${y}</span> = <span class="token variable">$val</span>&quot;</span>

<span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> - $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> - <span class="token variable">\${y}</span> = <span class="token variable">$val</span>&quot;</span>

<span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> <span class="token punctuation">\\</span>* $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> * <span class="token variable">\${y}</span> = <span class="token variable">$val</span>&quot;</span>

<span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>y<span class="token punctuation">}</span> / $<span class="token punctuation">{</span>x<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${y}</span> / <span class="token variable">\${x}</span> = <span class="token variable">$val</span>&quot;</span>

<span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>y<span class="token punctuation">}</span> % $<span class="token punctuation">{</span>x<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${y}</span> % <span class="token variable">\${x}</span> = <span class="token variable">$val</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">==</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> = <span class="token variable">\${y}</span>&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">!=</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> != <span class="token variable">\${y}</span>&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:</span>
<span class="token comment">#  x=10, y=20</span>
<span class="token comment">#  10 + 20 = 30</span>
<span class="token comment">#  10 - 20 = -10</span>
<span class="token comment">#  10 * 20 = 200</span>
<span class="token comment">#  20 / 10 = 2</span>
<span class="token comment">#  20 % 10 = 0</span>
<span class="token comment">#  10 != 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关系运算符" tabindex="-1"><a class="header-anchor" href="#关系运算符" aria-hidden="true">#</a> 关系运算符</h3><p>关系运算符只支持数字，不支持字符串，除非字符串的值是数字。</p><p>下表列出了常用的关系运算符，假定变量 x 为 10，变量 y 为 20：</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td><code>-eq</code></td><td>检测两个数是否相等，相等返回 true。</td><td><code>[ $a -eq $b ]</code>返回 false。</td></tr><tr><td><code>-ne</code></td><td>检测两个数是否相等，不相等返回 true。</td><td><code>[ $a -ne $b ]</code> 返回 true。</td></tr><tr><td><code>-gt</code></td><td>检测左边的数是否大于右边的，如果是，则返回 true。</td><td><code>[ $a -gt $b ]</code> 返回 false。</td></tr><tr><td><code>-lt</code></td><td>检测左边的数是否小于右边的，如果是，则返回 true。</td><td><code>[ $a -lt $b ]</code> 返回 true。</td></tr><tr><td><code>-ge</code></td><td>检测左边的数是否大于等于右边的，如果是，则返回 true。</td><td><code>[ $a -ge $b ]</code> 返回 false。</td></tr><tr><td><code>-le</code></td><td>检测左边的数是否小于等于右边的，如果是，则返回 true。</td><td><code>[ $a -le $b ]</code>返回 true。</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">20</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;x=<span class="token variable">\${x}</span>, y=<span class="token variable">\${y}</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-eq</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -eq <span class="token variable">\${y}</span> : x 等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -eq <span class="token variable">\${y}</span>: x 不等于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-ne</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -ne <span class="token variable">\${y}</span>: x 不等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -ne <span class="token variable">\${y}</span>: x 等于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-gt</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -gt <span class="token variable">\${y}</span>: x 大于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -gt <span class="token variable">\${y}</span>: x 不大于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt <span class="token variable">\${y}</span>: x 小于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt <span class="token variable">\${y}</span>: x 不小于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-ge</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -ge <span class="token variable">\${y}</span>: x 大于或等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -ge <span class="token variable">\${y}</span>: x 小于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-le</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -le <span class="token variable">\${y}</span>: x 小于或等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -le <span class="token variable">\${y}</span>: x 大于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:</span>
<span class="token comment">#  x=10, y=20</span>
<span class="token comment">#  10 -eq 20: x 不等于 y</span>
<span class="token comment">#  10 -ne 20: x 不等于 y</span>
<span class="token comment">#  10 -gt 20: x 不大于 y</span>
<span class="token comment">#  10 -lt 20: x 小于 y</span>
<span class="token comment">#  10 -ge 20: x 小于 y</span>
<span class="token comment">#  10 -le 20: x 小于或等于 y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="布尔运算符" tabindex="-1"><a class="header-anchor" href="#布尔运算符" aria-hidden="true">#</a> 布尔运算符</h3><p>下表列出了常用的布尔运算符，假定变量 x 为 10，变量 y 为 20：</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td><code>!</code></td><td>非运算，表达式为 true 则返回 false，否则返回 true。</td><td><code>[ ! false ]</code> 返回 true。</td></tr><tr><td><code>-o</code></td><td>或运算，有一个表达式为 true 则返回 true。</td><td><code>[ $a -lt 20 -o $b -gt 100 ]</code> 返回 true。</td></tr><tr><td><code>-a</code></td><td>与运算，两个表达式都为 true 才返回 true。</td><td><code>[ $a -lt 20 -a $b -gt 100 ]</code> 返回 false。</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">20</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;x=<span class="token variable">\${x}</span>, y=<span class="token variable">\${y}</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">!=</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> != <span class="token variable">\${y}</span> : x 不等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> != <span class="token variable">\${y}</span>: x 等于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">\${y}</span> <span class="token parameter variable">-gt</span> <span class="token number">15</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 100 且 <span class="token variable">\${y}</span> 大于 15 : 返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 100 且 <span class="token variable">\${y}</span> 大于 15 : 返回 false&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">100</span> <span class="token operator">||</span> <span class="token variable">\${y}</span> <span class="token parameter variable">-gt</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 100 或 <span class="token variable">\${y}</span> 大于 100 : 返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 100 或 <span class="token variable">\${y}</span> 大于 100 : 返回 false&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">5</span> <span class="token operator">||</span> <span class="token variable">\${y}</span> <span class="token parameter variable">-gt</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 5 或 <span class="token variable">\${y}</span> 大于 100 : 返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> 小于 5 或 <span class="token variable">\${y}</span> 大于 100 : 返回 false&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:</span>
<span class="token comment">#  x=10, y=20</span>
<span class="token comment">#  10 != 20 : x 不等于 y</span>
<span class="token comment">#  10 小于 100 且 20 大于 15 : 返回 true</span>
<span class="token comment">#  10 小于 100 或 20 大于 100 : 返回 true</span>
<span class="token comment">#  10 小于 5 或 20 大于 100 : 返回 false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符" aria-hidden="true">#</a> 逻辑运算符</h3><p>以下介绍 Shell 的逻辑运算符，假定变量 x 为 10，变量 y 为 20:</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td><code>&amp;&amp;</code></td><td>逻辑的 AND</td><td><code>[[ \${x} -lt 100 &amp;&amp; \${y} -gt 100 ]]</code> 返回 false</td></tr><tr><td>\`</td><td></td><td>\`</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">20</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;x=<span class="token variable">\${x}</span>, y=<span class="token variable">\${y}</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">\${y}</span> <span class="token parameter variable">-gt</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt 100 &amp;&amp; <span class="token variable">\${y}</span> -gt 100 返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt 100 &amp;&amp; <span class="token variable">\${y}</span> -gt 100 返回 false&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">100</span> <span class="token operator">||</span> <span class="token variable">\${y}</span> <span class="token parameter variable">-gt</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt 100 || <span class="token variable">\${y}</span> -gt 100 返回 true&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> -lt 100 || <span class="token variable">\${y}</span> -gt 100 返回 false&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:</span>
<span class="token comment">#  x=10, y=20</span>
<span class="token comment">#  10 -lt 100 &amp;&amp; 20 -gt 100 返回 false</span>
<span class="token comment">#  10 -lt 100 || 20 -gt 100 返回 true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串运算符" tabindex="-1"><a class="header-anchor" href="#字符串运算符" aria-hidden="true">#</a> 字符串运算符</h3><p>下表列出了常用的字符串运算符，假定变量 a 为 &quot;abc&quot;，变量 b 为 &quot;efg&quot;：</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td><code>=</code></td><td>检测两个字符串是否相等，相等返回 true。</td><td><code>[ $a = $b ]</code> 返回 false。</td></tr><tr><td><code>!=</code></td><td>检测两个字符串是否相等，不相等返回 true。</td><td><code>[ $a != $b ]</code> 返回 true。</td></tr><tr><td><code>-z</code></td><td>检测字符串长度是否为 0，为 0 返回 true。</td><td><code>[ -z $a ]</code> 返回 false。</td></tr><tr><td><code>-n</code></td><td>检测字符串长度是否为 0，不为 0 返回 true。</td><td><code>[ -n $a ]</code> 返回 true。</td></tr><tr><td><code>str</code></td><td>检测字符串是否为空，不为空返回 true。</td><td><code>[ $a ]</code> 返回 true。</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token string">&quot;abc&quot;</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token string">&quot;xyz&quot;</span>


<span class="token builtin class-name">echo</span> <span class="token string">&quot;x=<span class="token variable">\${x}</span>, y=<span class="token variable">\${y}</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">=</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> = <span class="token variable">\${y}</span> : x 等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> = <span class="token variable">\${y}</span>: x 不等于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">!=</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> != <span class="token variable">\${y}</span> : x 不等于 y&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> != <span class="token variable">\${y}</span>: x 等于 y&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">\${x}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-z <span class="token variable">\${x}</span> : 字符串长度为 0&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-z <span class="token variable">\${x}</span> : 字符串长度不为 0&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${x}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-n <span class="token variable">\${x}</span> : 字符串长度不为 0&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;-n <span class="token variable">\${x}</span> : 字符串长度为 0&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> : 字符串不为空&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> : 字符串为空&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:</span>
<span class="token comment">#  x=abc, y=xyz</span>
<span class="token comment">#  abc = xyz: x 不等于 y</span>
<span class="token comment">#  abc != xyz : x 不等于 y</span>
<span class="token comment">#  -z abc : 字符串长度不为 0</span>
<span class="token comment">#  -n abc : 字符串长度不为 0</span>
<span class="token comment">#  abc : 字符串不为空</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件测试运算符" tabindex="-1"><a class="header-anchor" href="#文件测试运算符" aria-hidden="true">#</a> 文件测试运算符</h3><p>文件测试运算符用于检测 Unix 文件的各种属性。</p><p>属性检测描述如下：</p><table><thead><tr><th>操作符</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td>-b file</td><td>检测文件是否是块设备文件，如果是，则返回 true。</td><td><code>[ -b $file ]</code> 返回 false。</td></tr><tr><td>-c file</td><td>检测文件是否是字符设备文件，如果是，则返回 true。</td><td><code>[ -c $file ]</code> 返回 false。</td></tr><tr><td>-d file</td><td>检测文件是否是目录，如果是，则返回 true。</td><td><code>[ -d $file ]</code> 返回 false。</td></tr><tr><td>-f file</td><td>检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。</td><td><code>[ -f $file ]</code> 返回 true。</td></tr><tr><td>-g file</td><td>检测文件是否设置了 SGID 位，如果是，则返回 true。</td><td><code>[ -g $file ]</code> 返回 false。</td></tr><tr><td>-k file</td><td>检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。</td><td><code>[ -k $file ]</code>返回 false。</td></tr><tr><td>-p file</td><td>检测文件是否是有名管道，如果是，则返回 true。</td><td><code>[ -p $file ]</code> 返回 false。</td></tr><tr><td>-u file</td><td>检测文件是否设置了 SUID 位，如果是，则返回 true。</td><td><code>[ -u $file ]</code> 返回 false。</td></tr><tr><td>-r file</td><td>检测文件是否可读，如果是，则返回 true。</td><td><code>[ -r $file ]</code> 返回 true。</td></tr><tr><td>-w file</td><td>检测文件是否可写，如果是，则返回 true。</td><td><code>[ -w $file ]</code> 返回 true。</td></tr><tr><td>-x file</td><td>检测文件是否可执行，如果是，则返回 true。</td><td><code>[ -x $file ]</code> 返回 true。</td></tr><tr><td>-s file</td><td>检测文件是否为空（文件大小是否大于 0），不为空返回 true。</td><td><code>[ -s $file ]</code> 返回 true。</td></tr><tr><td>-e file</td><td>检测文件（包括目录）是否存在，如果是，则返回 true。</td><td><code>[ -e $file ]</code> 返回 true。</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">file</span><span class="token operator">=</span><span class="token string">&quot;/etc/hosts&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-r</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件可读&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不可读&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-w</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件可写&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不可写&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件可执行&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不可执行&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件为普通文件&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件为特殊文件&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件是个目录&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不是个目录&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不为空&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件为空&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">\${file}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件存在&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${file}</span> 文件不存在&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#  Output:(根据文件的实际情况，输出结果可能不同)</span>
<span class="token comment">#  /etc/hosts 文件可读</span>
<span class="token comment">#  /etc/hosts 文件可写</span>
<span class="token comment">#  /etc/hosts 文件不可执行</span>
<span class="token comment">#  /etc/hosts 文件为普通文件</span>
<span class="token comment">#  /etc/hosts 文件不是个目录</span>
<span class="token comment">#  /etc/hosts 文件不为空</span>
<span class="token comment">#  /etc/hosts 文件存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制语句" tabindex="-1"><a class="header-anchor" href="#控制语句" aria-hidden="true">#</a> 控制语句</h2><h3 id="条件语句" tabindex="-1"><a class="header-anchor" href="#条件语句" aria-hidden="true">#</a> 条件语句</h3><p>跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在<code>[[ ]]</code>里的表达式。</p>`,88),z=s("code",null,"[[ ]]",-1),T=s("code",null,"sh",-1),L=s("code",null,"[ ]",-1),B=s("strong",null,"检测命令",-1),D=s("strong",null,"基元",-1),F={href:"http://serverfault.com/a/52050",target:"_blank",rel:"noopener noreferrer"},P=t(`<p>共有两个不同的条件表达式：<code>if</code>和<code>case</code>。</p><h4 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> <code>if</code></h4><p>（1）<code>if</code> 语句</p><p><code>if</code>在使用上跟其它语言相同。如果中括号里的表达式为真，那么<code>then</code>和<code>fi</code>之间的代码会被执行。<code>fi</code>标志着条件代码块的结束。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 写成一行</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">1</span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;1 -eq 1 result is: true&quot;</span><span class="token punctuation">;</span> <span class="token keyword">fi</span>
<span class="token comment"># Output: 1 -eq 1 result is: true</span>

<span class="token comment"># 写成多行</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;abc&quot;</span> <span class="token parameter variable">-eq</span> <span class="token string">&quot;abc&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>abc<span class="token string">&quot; -eq &quot;</span>abc<span class="token string">&quot; result is: true&quot;</span>
<span class="token keyword">fi</span>
<span class="token comment"># Output: abc -eq abc result is: true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）<code>if else</code> 语句</p><p>同样，我们可以使用<code>if..else</code>语句，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">2</span> <span class="token parameter variable">-ne</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;true&quot;</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;false&quot;</span>
<span class="token keyword">fi</span>
<span class="token comment"># Output: true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）<code>if elif else</code> 语句</p><p>有些时候，<code>if..else</code>不能满足我们的要求。别忘了<code>if..elif..else</code>，使用起来也很方便。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">20</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">&gt;</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> &gt; <span class="token variable">\${y}</span>&quot;</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token operator">&lt;</span> <span class="token variable">\${y}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> &lt; <span class="token variable">\${y}</span>&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> = <span class="token variable">\${y}</span>&quot;</span>
<span class="token keyword">fi</span>
<span class="token comment"># Output: 10 &lt; 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="case" tabindex="-1"><a class="header-anchor" href="#case" aria-hidden="true">#</a> <code>case</code></h4><p>如果你需要面对很多情况，分别要采取不同的措施，那么使用<code>case</code>会比嵌套的<code>if</code>更有用。使用<code>case</code>来解决复杂的条件判断，看起来像下面这样：</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">exec</span>
<span class="token keyword">case</span> <span class="token variable">\${oper}</span> <span class="token keyword">in</span>
  <span class="token string">&quot;+&quot;</span><span class="token punctuation">)</span>
    <span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> + $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> + <span class="token variable">\${y}</span> = <span class="token variable">\${val}</span>&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span>
    <span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> - $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> - <span class="token variable">\${y}</span> = <span class="token variable">\${val}</span>&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span>
    <span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> <span class="token punctuation">\\</span>* $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> * <span class="token variable">\${y}</span> = <span class="token variable">\${val}</span>&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
    <span class="token assign-left variable">val</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> / $<span class="token punctuation">{</span>y<span class="token punctuation">}</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${x}</span> / <span class="token variable">\${y}</span> = <span class="token variable">\${val}</span>&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  *<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Unknown oper!&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每种情况都是匹配了某个模式的表达式。<code>|</code>用来分割多个模式，<code>)</code>用来结束一个模式序列。第一个匹配上的模式对应的命令将会被执行。<code>*</code>代表任何不匹配以上给定模式的模式。命令块儿之间要用<code>;;</code>分隔。</p><h3 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句" aria-hidden="true">#</a> 循环语句</h3><p>循环其实不足为奇。跟其它程序设计语言一样，bash 中的循环也是只要控制条件为真就一直迭代执行的代码块。</p><p>Bash 中有四种循环：<code>for</code>，<code>while</code>，<code>until</code>和<code>select</code>。</p><h4 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> <code>for</code>循环</h4><p><code>for</code>与它在 C 语言中的姊妹非常像。看起来是这样：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> elem1 elem2 <span class="token punctuation">..</span>. elemN
<span class="token keyword">do</span>
  <span class="token comment">### 语句</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),H=s("code",null,"arg",-1),Y=s("code",null,"elem1",-1),C=s("code",null,"elemN",-1),U={href:"https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%A4%A7%E6%8B%AC%E5%8F%B7%E6%89%A9%E5%B1%95",target:"_blank",rel:"noopener noreferrer"},M=t(`<p>当然，我们还可以把<code>for</code>循环写在一行，但这要求<code>do</code>之前要有一个分号，就像下面这样：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还有，如果你觉得<code>for..in..do</code>对你来说有点奇怪，那么你也可以像 C 语言那样使用<code>for</code>，比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们想对一个目录下的所有文件做同样的操作时，<code>for</code>就很方便了。举个例子，如果我们想把所有的<code>.bash</code>文件移动到<code>script</code>文件夹中，并给它们可执行权限，我们的脚本可以这样写：</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">DIR</span><span class="token operator">=</span>/home/zp
<span class="token keyword">for</span> <span class="token for-or-select variable">FILE</span> <span class="token keyword">in</span> <span class="token variable">\${DIR}</span>/*.sh<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token function">mv</span> <span class="token string">&quot;<span class="token variable">$FILE</span>&quot;</span> <span class="token string">&quot;<span class="token variable">\${DIR}</span>/scripts&quot;</span>
<span class="token keyword">done</span>
<span class="token comment"># 将 /home/zp 目录下所有 sh 文件拷贝到 /home/zp/scripts</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> <code>while</code>循环</h4>`,8),G=s("code",null,"while",-1),R=s("em",null,"真",-1),K=s("code",null,"if..then",-1),V={href:"https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%9F%BA%E5%85%83%E5%92%8C%E7%BB%84%E5%90%88%E8%A1%A8%E8%BE%BE%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},j=s("code",null,"while",-1),W=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> condition <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">do</span>
  <span class="token comment">### 语句</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跟<code>for</code>循环一样，如果我们把<code>do</code>和被检测的条件写到一行，那么必须要在<code>do</code>之前加一个分号。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 0到9之间每个数的平方</span>
<span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-lt</span> <span class="token number">10</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span>x <span class="token operator">*</span> x<span class="token variable">))</span></span>
  <span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>x <span class="token operator">+</span> <span class="token number">1</span><span class="token variable">))</span></span>
<span class="token keyword">done</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  0</span>
<span class="token comment">#  1</span>
<span class="token comment">#  4</span>
<span class="token comment">#  9</span>
<span class="token comment">#  16</span>
<span class="token comment">#  25</span>
<span class="token comment">#  36</span>
<span class="token comment">#  49</span>
<span class="token comment">#  64</span>
<span class="token comment">#  81</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="until循环" tabindex="-1"><a class="header-anchor" href="#until循环" aria-hidden="true">#</a> <code>until</code>循环</h4><p><code>until</code>循环跟<code>while</code>循环正好相反。它跟<code>while</code>一样也需要检测一个测试条件，但不同的是，只要该条件为 <em>假</em> 就一直执行循环：</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">until</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${x}</span> <span class="token parameter variable">-ge</span> <span class="token number">5</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">\${x}</span>
  <span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>x<span class="token punctuation">}</span> + <span class="token number">1</span><span class="token variable">\`</span></span>
<span class="token keyword">done</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  0</span>
<span class="token comment">#  1</span>
<span class="token comment">#  2</span>
<span class="token comment">#  3</span>
<span class="token comment">#  4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="select循环" tabindex="-1"><a class="header-anchor" href="#select循环" aria-hidden="true">#</a> <code>select</code>循环</h4><p><code>select</code>循环帮助我们组织一个用户菜单。它的语法几乎跟<code>for</code>循环一致：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">select</span> <span class="token for-or-select variable">answer</span> <span class="token keyword">in</span> elem1 elem2 <span class="token punctuation">..</span>. elemN
<span class="token keyword">do</span>
  <span class="token comment">### 语句</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>select</code>会打印<code>elem1..elemN</code>以及它们的序列号到屏幕上，之后会提示用户输入。通常看到的是<code>$?</code>（<code>PS3</code>变量）。用户的选择结果会被保存到<code>answer</code>中。如果<code>answer</code>是一个在<code>1..N</code>之间的数字，那么<code>语句</code>会被执行，紧接着会进行下一次迭代 —— 如果不想这样的话我们可以使用<code>break</code>语句。</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable"><span class="token environment constant">PS3</span></span><span class="token operator">=</span><span class="token string">&quot;Choose the package manager: &quot;</span>
<span class="token keyword">select</span> <span class="token for-or-select variable">ITEM</span> <span class="token keyword">in</span> bower <span class="token function">npm</span> gem pip
<span class="token keyword">do</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;Enter the package name: &quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">read</span> PACKAGE
<span class="token keyword">case</span> <span class="token variable">\${ITEM}</span> <span class="token keyword">in</span>
  bower<span class="token punctuation">)</span> bower <span class="token function">install</span> <span class="token variable">\${PACKAGE}</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token function">npm</span><span class="token punctuation">)</span> <span class="token function">npm</span> <span class="token function">install</span> <span class="token variable">\${PACKAGE}</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
  gem<span class="token punctuation">)</span> gem <span class="token function">install</span> <span class="token variable">\${PACKAGE}</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
  pip<span class="token punctuation">)</span> pip <span class="token function">install</span> <span class="token variable">\${PACKAGE}</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
<span class="token builtin class-name">break</span> <span class="token comment"># 避免无限循环</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子，先询问用户他想使用什么包管理器。接着，又询问了想安装什么包，最后执行安装操作。</p><p>运行这个脚本，会得到如下输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./my_script
<span class="token number">1</span><span class="token punctuation">)</span> bower
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token function">npm</span>
<span class="token number">3</span><span class="token punctuation">)</span> gem
<span class="token number">4</span><span class="token punctuation">)</span> pip
Choose the package manager: <span class="token number">2</span>
Enter the package name: gitbook-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="break-和-continue" tabindex="-1"><a class="header-anchor" href="#break-和-continue" aria-hidden="true">#</a> <code>break</code> 和 <code>continue</code></h4><p>如果想提前结束一个循环或跳过某次循环执行，可以使用 shell 的<code>break</code>和<code>continue</code>语句来实现。它们可以在任何循环中使用。</p><blockquote><p><code>break</code>语句用来提前结束当前循环。</p><p><code>continue</code>语句用来跳过某次迭代。</p></blockquote><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查找 10 以内第一个能整除 2 和 3 的正整数</span>
<span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">\${i}</span> <span class="token parameter variable">-lt</span> <span class="token number">10</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>i <span class="token operator">%</span> <span class="token number">3</span><span class="token variable">))</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>i <span class="token operator">%</span> <span class="token number">2</span><span class="token variable">))</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">\${i}</span>
    <span class="token builtin class-name">break</span><span class="token punctuation">;</span>
  <span class="token keyword">fi</span>
  <span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $<span class="token punctuation">{</span>i<span class="token punctuation">}</span> + <span class="token number">1</span><span class="token variable">\`</span></span>
<span class="token keyword">done</span>
<span class="token comment"># Output: 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打印10以内的奇数</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i <span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$((</span>i <span class="token operator">%</span> <span class="token number">2</span><span class="token variable">))</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">continue</span><span class="token punctuation">;</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">\${i}</span>
<span class="token keyword">done</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  1</span>
<span class="token comment">#  3</span>
<span class="token comment">#  5</span>
<span class="token comment">#  7</span>
<span class="token comment">#  9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p>bash 函数定义语法如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span> <span class="token keyword">function</span> <span class="token punctuation">]</span> funname <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    action<span class="token punctuation">;</span>
    <span class="token punctuation">[</span>return int<span class="token punctuation">;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>💡 说明：</p><ol><li>函数定义时，<code>function</code> 关键字可有可无。</li><li>函数返回值 - return 返回函数返回值，返回值类型只能为整数（0-255）。如果不加 return 语句，shell 默认将以最后一条命令的运行结果，作为函数返回值。</li><li>函数返回值在调用该函数后通过 <code>$?</code> 来获得。</li><li>所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。</li></ol></blockquote><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token function-name function">calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token assign-left variable"><span class="token environment constant">PS3</span></span><span class="token operator">=</span><span class="token string">&quot;choose the oper: &quot;</span>
  <span class="token keyword">select</span> <span class="token for-or-select variable">oper</span> <span class="token keyword">in</span> + - <span class="token punctuation">\\</span>* / <span class="token comment"># 生成操作符选择菜单</span>
  <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;enter first num: &quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">read</span> x <span class="token comment"># 读取输入参数</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;enter second num: &quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">read</span> y <span class="token comment"># 读取输入参数</span>
  <span class="token builtin class-name">exec</span>
  <span class="token keyword">case</span> <span class="token variable">\${oper}</span> <span class="token keyword">in</span>
    <span class="token string">&quot;+&quot;</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>\${x} <span class="token operator">+</span> \${y}<span class="token variable">))</span></span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>\${x} <span class="token operator">-</span> \${y}<span class="token variable">))</span></span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>\${x} <span class="token operator">*</span> \${y}<span class="token variable">))</span></span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>\${x} <span class="token operator">/</span> \${y}<span class="token variable">))</span></span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${oper}</span> is not support!&quot;</span>
      <span class="token builtin class-name">return</span> <span class="token number">0</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
  <span class="token builtin class-name">break</span>
  <span class="token keyword">done</span>
<span class="token punctuation">}</span>
calc
<span class="token builtin class-name">echo</span> <span class="token string">&quot;the result is: <span class="token variable">$?</span>&quot;</span> <span class="token comment"># $? 获取 calc 函数返回值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./function-demo.sh
<span class="token number">1</span><span class="token punctuation">)</span> +
<span class="token number">2</span><span class="token punctuation">)</span> -
<span class="token number">3</span><span class="token punctuation">)</span> *
<span class="token number">4</span><span class="token punctuation">)</span> /
choose the oper: <span class="token number">3</span>
enter first num: <span class="token number">10</span>
enter second num: <span class="token number">10</span>
the result is: <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="位置参数" tabindex="-1"><a class="header-anchor" href="#位置参数" aria-hidden="true">#</a> 位置参数</h3><p><strong>位置参数</strong>是在调用一个函数并传给它参数时创建的变量。</p><p>位置参数变量表：</p><table><thead><tr><th>变量</th><th>描述</th></tr></thead><tbody><tr><td><code>$0</code></td><td>脚本名称</td></tr><tr><td><code>$1 … $9</code></td><td>第 1 个到第 9 个参数列表</td></tr><tr><td><code>\${10} … \${N}</code></td><td>第 10 个到 N 个参数列表</td></tr><tr><td><code>$*</code> or <code>$@</code></td><td>除了<code>$0</code>外的所有位置参数</td></tr><tr><td><code>$#</code></td><td>不包括<code>$0</code>在内的位置参数的个数</td></tr><tr><td><code>$FUNCNAME</code></td><td>函数名称（仅在函数内部有值）</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;第一个参数为：<span class="token variable">$1</span>&quot;</span>
  <span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;第一个参数为空&quot;</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">$2</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;第二个参数为：<span class="token variable">$2</span>&quot;</span>
  <span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token variable">$2</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;第二个参数为空&quot;</span>
<span class="token keyword">fi</span>

<span class="token function-name function">paramsFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数第一个入参：<span class="token variable">$1</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数第二个入参：<span class="token variable">$2</span>&quot;</span>
<span class="token punctuation">}</span>
paramsFunction <span class="token variable">\${x}</span> <span class="token variable">\${y}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./function-demo2.sh
第一个参数为空
第二个参数为空
函数第一个入参：0
函数第二个入参：0

$ ./function-demo2.sh <span class="token number">10</span> <span class="token number">20</span>
第一个参数为：10
第二个参数为：20
函数第一个入参：10
函数第二个入参：20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>./variable-demo4.sh hello world</code> ，然后在脚本中通过 <code>$1</code>、<code>$2</code> ... 读取第 1 个参数、第 2 个参数。。。</p><h3 id="函数处理参数" tabindex="-1"><a class="header-anchor" href="#函数处理参数" aria-hidden="true">#</a> 函数处理参数</h3><p>另外，还有几个特殊字符用来处理参数：</p><table><thead><tr><th>参数处理</th><th>说明</th></tr></thead><tbody><tr><td><code>$#</code></td><td>返回参数个数</td></tr><tr><td><code>$*</code></td><td>返回所有参数</td></tr><tr><td><code>$$</code></td><td>脚本运行的当前进程 ID 号</td></tr><tr><td><code>$!</code></td><td>后台运行的最后一个进程的 ID 号</td></tr><tr><td><code>$@</code></td><td>返回所有参数</td></tr><tr><td><code>$-</code></td><td>返回 Shell 使用的当前选项，与 set 命令功能相同。</td></tr><tr><td><code>$?</code></td><td>函数返回值</td></tr></tbody></table><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function-name function">runner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">name</span><span class="token operator">=</span>zp
<span class="token function-name function">paramsFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数第一个入参：<span class="token variable">$1</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数第二个入参：<span class="token variable">$2</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;传递到脚本的参数个数：<span class="token variable">$#</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;所有参数：&quot;</span>
  <span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;脚本运行的当前进程 ID 号：<span class="token variable">$$</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;后台运行的最后一个进程的 ID 号：<span class="token variable">$!</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;所有参数：&quot;</span>
  <span class="token builtin class-name">printf</span> <span class="token string">&quot;+ %s<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Shell 使用的当前选项：$-&quot;</span>
  runner
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;runner 函数的返回值：<span class="token variable">$?</span>&quot;</span>
<span class="token punctuation">}</span>
paramsFunction <span class="token number">1</span> <span class="token string">&quot;abc&quot;</span> <span class="token string">&quot;hello, <span class="token entity" title="\\&quot;">\\&quot;</span>zp<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>
<span class="token comment">#  Output:</span>
<span class="token comment">#  函数第一个入参：1</span>
<span class="token comment">#  函数第二个入参：abc</span>
<span class="token comment">#  传递到脚本的参数个数：3</span>
<span class="token comment">#  所有参数：</span>
<span class="token comment">#  + 1 abc hello, &quot;zp&quot;</span>
<span class="token comment">#  脚本运行的当前进程 ID 号：26400</span>
<span class="token comment">#  后台运行的最后一个进程的 ID 号：</span>
<span class="token comment">#  所有参数：</span>
<span class="token comment">#  + 1</span>
<span class="token comment">#  + abc</span>
<span class="token comment">#  + hello, &quot;zp&quot;</span>
<span class="token comment">#  Shell 使用的当前选项：hB</span>
<span class="token comment">#  runner 函数的返回值：0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell-扩展" tabindex="-1"><a class="header-anchor" href="#shell-扩展" aria-hidden="true">#</a> Shell 扩展</h2><p><em>扩展</em> 发生在一行命令被分成一个个的 <em>记号（tokens）</em> 之后。换言之，扩展是一种执行数学运算的机制，还可以用来保存命令的执行结果，等等。</p>`,48),J={href:"https://www.gnu.org/software/bash/manual/bash.html###Shell-Expansions",target:"_blank",rel:"noopener noreferrer"},Q=t(`<h4 id="大括号扩展" tabindex="-1"><a class="header-anchor" href="#大括号扩展" aria-hidden="true">#</a> 大括号扩展</h4><p>大括号扩展让生成任意的字符串成为可能。它跟 <em>文件名扩展</em> 很类似，举个例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> beg<span class="token punctuation">{</span>i,a,u<span class="token punctuation">}</span>n <span class="token comment">### begin began begun</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>大括号扩展还可以用来创建一个可被循环迭代的区间。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">5</span><span class="token punctuation">}</span> <span class="token comment">### 0 1 2 3 4 5</span>
<span class="token builtin class-name">echo</span> <span class="token punctuation">{</span>00<span class="token punctuation">..</span><span class="token number">8</span><span class="token punctuation">..</span><span class="token number">2</span><span class="token punctuation">}</span> <span class="token comment">### 00 02 04 06 08</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="命令置换" tabindex="-1"><a class="header-anchor" href="#命令置换" aria-hidden="true">#</a> 命令置换</h4><p>命令置换允许我们对一个命令求值，并将其值置换到另一个命令或者变量赋值表达式中。当一个命令被\`\`或<code>$()</code>包围时，命令置换将会执行。举个例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">now</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%T<span class="token variable">\`</span></span>
<span class="token comment">### or</span>
<span class="token assign-left variable">now</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%T<span class="token variable">)</span></span>

<span class="token builtin class-name">echo</span> <span class="token variable">$now</span> <span class="token comment">### 19:08:26</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="算数扩展" tabindex="-1"><a class="header-anchor" href="#算数扩展" aria-hidden="true">#</a> 算数扩展</h4><p>在 bash 中，执行算数运算是非常方便的。算数表达式必须包在<code>$(( ))</code>中。算数扩展的格式为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">result</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span> <span class="token punctuation">((</span><span class="token number">10</span> <span class="token operator">+</span> <span class="token number">5</span><span class="token operator">*</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">7</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span> <span class="token variable">))</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$result</span> <span class="token comment">### 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在算数表达式中，使用变量无需带上<code>$</code>前缀：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">7</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span> x <span class="token operator">+</span> y <span class="token variable">))</span></span>     <span class="token comment">### 11</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span> <span class="token operator">++</span>x <span class="token operator">+</span> y<span class="token operator">++</span> <span class="token variable">))</span></span> <span class="token comment">### 12</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span> x <span class="token operator">+</span> y <span class="token variable">))</span></span>     <span class="token comment">### 13</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="单引号和双引号-1" tabindex="-1"><a class="header-anchor" href="#单引号和双引号-1" aria-hidden="true">#</a> 单引号和双引号</h4><p>单引号和双引号之间有很重要的区别。在双引号中，变量引用或者命令置换是会被展开的。在单引号中是不会的。举个例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;Your home: <span class="token environment constant">$HOME</span>&quot;</span> <span class="token comment">### Your home: /Users/&lt;username&gt;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;Your home: $HOME&#39;</span> <span class="token comment">### Your home: $HOME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当局部变量和环境变量包含空格时，它们在引号中的扩展要格外注意。随便举个例子，假如我们用<code>echo</code>来输出用户的输入：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">INPUT</span><span class="token operator">=</span><span class="token string">&quot;A string  with   strange    whitespace.&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$INPUT</span>   <span class="token comment">### A string with strange whitespace.</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$INPUT</span>&quot;</span> <span class="token comment">### A string  with   strange    whitespace.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用第一个<code>echo</code>时给了它 5 个单独的参数 —— <code>$INPUT</code> 被分成了单独的词，<code>echo</code>在每个词之间打印了一个空格。第二种情况，调用<code>echo</code>时只给了它一个参数（整个$INPUT 的值，包括其中的空格）。</p><p>来看一个更严肃的例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">FILE</span><span class="token operator">=</span><span class="token string">&quot;Favorite Things.txt&quot;</span>
<span class="token function">cat</span> <span class="token variable">$FILE</span>   <span class="token comment">### 尝试输出两个文件: \`Favorite\` 和 \`Things.txt\`</span>
<span class="token function">cat</span> <span class="token string">&quot;<span class="token variable">$FILE</span>&quot;</span> <span class="token comment">### 输出一个文件: \`Favorite Things.txt\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管这个问题可以通过把 FILE 重命名成<code>Favorite-Things.txt</code>来解决，但是，假如这个值来自某个环境变量，来自一个位置参数，或者来自其它命令（<code>find</code>, <code>cat</code>, 等等）呢。因此，如果输入 <em>可能</em> 包含空格，务必要用引号把表达式包起来。</p><h2 id="流和重定向" tabindex="-1"><a class="header-anchor" href="#流和重定向" aria-hidden="true">#</a> 流和重定向</h2><p>Bash 有很强大的工具来处理程序之间的协同工作。使用流，我们能将一个程序的输出发送到另一个程序或文件，因此，我们能方便地记录日志或做一些其它我们想做的事。</p><p>管道给了我们创建传送带的机会，控制程序的执行成为可能。</p><p>学习如何使用这些强大的、高级的工具是非常非常重要的。</p><h3 id="输入、输出流" tabindex="-1"><a class="header-anchor" href="#输入、输出流" aria-hidden="true">#</a> 输入、输出流</h3><p>Bash 接收输入，并以字符序列或 <strong>字符流</strong> 的形式产生输出。这些流能被重定向到文件或另一个流中。</p><p>有三个文件描述符：</p><table><thead><tr><th>代码</th><th>描述符</th><th>描述</th></tr></thead><tbody><tr><td><code>0</code></td><td><code>stdin</code></td><td>标准输入</td></tr><tr><td><code>1</code></td><td><code>stdout</code></td><td>标准输出</td></tr><tr><td><code>2</code></td><td><code>stderr</code></td><td>标准错误输出</td></tr></tbody></table><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3><p>重定向让我们可以控制一个命令的输入来自哪里，输出结果到什么地方。这些运算符在控制流的重定向时会被用到：</p>`,32),X=s("thead",null,[s("tr",null,[s("th",null,"Operator"),s("th",null,"Description")])],-1),Z=s("tr",null,[s("td",null,[s("code",null,">")]),s("td",null,"重定向输出")],-1),ss=s("tr",null,[s("td",null,[s("code",null,"&>")]),s("td",null,"重定向输出和错误输出")],-1),ns=s("tr",null,[s("td",null,[s("code",null,"&>>")]),s("td",null,"以附加的形式重定向输出和错误输出")],-1),as=s("tr",null,[s("td",null,[s("code",null,"<")]),s("td",null,"重定向输入")],-1),es=s("td",null,[s("code",null,"<<")],-1),ts={href:"http://tldp.org/LDP/abs/html/here-docs.html",target:"_blank",rel:"noopener noreferrer"},ls=s("td",null,[s("code",null,"<<<")],-1),is={href:"http://www.tldp.org/LDP/abs/html/x17837.html",target:"_blank",rel:"noopener noreferrer"},ps=t(`<p>以下是一些使用重定向的例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### ls的结果将会被写到list.txt中</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span> <span class="token operator">&gt;</span> list.txt

<span class="token comment">### 将输出附加到list.txt中</span>
<span class="token function">ls</span> <span class="token parameter variable">-a</span> <span class="token operator">&gt;&gt;</span> list.txt

<span class="token comment">### 所有的错误信息会被写到errors.txt中</span>
<span class="token function">grep</span> da * <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> errors.txt

<span class="token comment">### 从errors.txt中读取输入</span>
<span class="token function">less</span> <span class="token operator">&lt;</span> errors.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dev-null-文件" tabindex="-1"><a class="header-anchor" href="#dev-null-文件" aria-hidden="true">#</a> <code>/dev/null</code> 文件</h3><p>如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">command</span> <span class="token operator">&gt;</span> /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到&quot;禁止输出&quot;的效果。</p><p>如果希望屏蔽 stdout 和 stderr，可以这样写：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">command</span> <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="debug" tabindex="-1"><a class="header-anchor" href="#debug" aria-hidden="true">#</a> Debug</h2><p>shell 提供了用于 debug 脚本的工具。</p><p>如果想采用 debug 模式运行某脚本，可以在其 shebang 中使用一个特殊的选项：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash options
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>options 是一些可以改变 shell 行为的选项。下表是一些可能对你有用的选项：</p><table><thead><tr><th>Short</th><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>-f</code></td><td>noglob</td><td>禁止文件名展开（globbing）</td></tr><tr><td><code>-i</code></td><td>interactive</td><td>让脚本以 <em>交互</em> 模式运行</td></tr><tr><td><code>-n</code></td><td>noexec</td><td>读取命令，但不执行（语法检查）</td></tr><tr><td><code>-t</code></td><td>—</td><td>执行完第一条命令后退出</td></tr><tr><td><code>-v</code></td><td>verbose</td><td>在执行每条命令前，向<code>stderr</code>输出该命令</td></tr><tr><td><code>-x</code></td><td>xtrace</td><td>在执行每条命令前，向<code>stderr</code>输出该命令以及该命令的扩展参数</td></tr></tbody></table><p>举个例子，如果我们在脚本中指定了<code>-x</code>例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash -x</span>

<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这会向<code>stdout</code>打印出变量的值和一些其它有用的信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./my_script
+ <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">))</span></span>
+ <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">))</span></span>
+ <span class="token builtin class-name">echo</span> <span class="token number">0</span>
<span class="token number">0</span>
+ <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">++</span>  <span class="token punctuation">))</span></span>
+ <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">))</span></span>
+ <span class="token builtin class-name">echo</span> <span class="token number">1</span>
<span class="token number">1</span>
+ <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">++</span>  <span class="token punctuation">))</span></span>
+ <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">))</span></span>
+ <span class="token builtin class-name">echo</span> <span class="token number">2</span>
<span class="token number">2</span>
+ <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">++</span>  <span class="token punctuation">))</span></span>
+ <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">))</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时我们值需要 debug 脚本的一部分。这种情况下，使用<code>set</code>命令会很方便。这个命令可以启用或禁用选项。使用<code>-</code>启用选项，<code>+</code>禁用选项：</p><p><strong>💻 “示例源码”</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开启 debug</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">printf</span> <span class="token variable">\${i}</span>
<span class="token keyword">done</span>
<span class="token comment"># 关闭 debug</span>
<span class="token builtin class-name">set</span> +x
<span class="token comment">#  Output:</span>
<span class="token comment">#  + (( i = 0 ))</span>
<span class="token comment">#  + (( i &lt; 3 ))</span>
<span class="token comment">#  + printf 0</span>
<span class="token comment">#  0+ (( i++  ))</span>
<span class="token comment">#  + (( i &lt; 3 ))</span>
<span class="token comment">#  + printf 1</span>
<span class="token comment">#  1+ (( i++  ))</span>
<span class="token comment">#  + (( i &lt; 3 ))</span>
<span class="token comment">#  + printf 2</span>
<span class="token comment">#  2+ (( i++  ))</span>
<span class="token comment">#  + (( i &lt; 3 ))</span>
<span class="token comment">#  + set +x</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">printf</span> <span class="token variable">\${i}</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token comment">#  Output: 12345</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,22),os={href:"https://github.com/alebcay/awesome-shell",target:"_blank",rel:"noopener noreferrer"},cs={href:"https://github.com/awesome-lists/awesome-bash",target:"_blank",rel:"noopener noreferrer"},ds={href:"https://github.com/denysdovhan/bash-handbook",target:"_blank",rel:"noopener noreferrer"},rs={href:"https://github.com/vuuihc/bash-guide",target:"_blank",rel:"noopener noreferrer"},us={href:"https://github.com/Bash-it/bash-it",target:"_blank",rel:"noopener noreferrer"},vs={href:"http://dotfiles.github.io/",target:"_blank",rel:"noopener noreferrer"},ks={href:"http://www.runoob.com/linux/linux-shell.html",target:"_blank",rel:"noopener noreferrer"},bs={href:"https://github.com/koalaman/shellcheck",target:"_blank",rel:"noopener noreferrer"},ms={href:"https://stackoverflow.com/questions/tagged/bash",target:"_blank",rel:"noopener noreferrer"};function hs(gs,fs){const a=i("ExternalLinkIcon");return p(),o("div",null,[d,s("blockquote",null,[r,u,s("p",null,[n("💻 本文的源码已归档到“ "),s("a",v,[k,e(a)]),n("”")])]),b,s("ul",null,[s("li",null,[s("a",m,[n("sh"),e(a)]),n(" - 即 Bourne Shell。sh 是 Unix 标准默认的 shell。")]),s("li",null,[s("a",h,[n("bash"),e(a)]),n(" - 即 Bourne Again Shell。bash 是 Linux 标准默认的 shell。")]),s("li",null,[s("a",g,[n("fish"),e(a)]),n(" - 智能和用户友好的命令行 shell。")]),s("li",null,[s("a",f,[n("xiki"),e(a)]),n(" - 使 shell 控制台更友好，更强大。")]),s("li",null,[s("a",q,[n("zsh"),e(a)]),n(" - 功能强大的 shell 与脚本语言。")])]),y,s("p",null,[n("在 shell 脚本，"),$,n(" 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 解释器。"),x,n(" 被称作"),s("a",w,[n("shebang（也称为 Hashbang ）"),e(a)]),n("。")]),_,s("p",null,[n("在 shell 脚本，"),O,n(" 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 解释器。"),E,n(" 被称作"),s("a",S,[n("shebang（也称为 Hashbang ）"),e(a)]),n("。")]),N,s("p",null,[s("a",A,[n("这里"),e(a)]),n(" 有一张更全面的 Bash 环境变量列表。")]),I,s("p",null,[n("由"),z,n("（"),T,n("中是"),L,n("）包起来的表达式被称作 "),B,n(" 或 "),D,n("。这些表达式帮助我们检测一个条件的结果。这里可以找到有关"),s("a",F,[n("bash 中单双中括号区别"),e(a)]),n("的答案。")]),P,s("p",null,[n("在每次循环的过程中，"),H,n("依次被赋值为从"),Y,n("到"),C,n("。这些值还可以是通配符或者"),s("a",U,[n("大括号扩展"),e(a)]),n("。")]),M,s("p",null,[G,n("循环检测一个条件，只要这个条件为 "),R,n("，就执行一段命令。被检测的条件跟"),K,n("中使用的"),s("a",V,[n("基元"),e(a)]),n("并无二异。因此一个"),j,n("循环看起来会是这样：")]),W,s("p",null,[n("感兴趣的话可以阅读"),s("a",J,[n("关于 shell 扩展的更多细节"),e(a)]),n("。")]),Q,s("table",null,[X,s("tbody",null,[Z,ss,ns,as,s("tr",null,[es,s("td",null,[s("a",ts,[n("Here 文档"),e(a)]),n(" 语法")])]),s("tr",null,[ls,s("td",null,[s("a",is,[n("Here 字符串"),e(a)])])])])]),ps,s("ul",null,[s("li",null,[s("a",os,[n("awesome-shell"),e(a)]),n(" - shell 资源列表")]),s("li",null,[s("a",cs,[n("awesome-bash"),e(a)]),n(" - bash 资源列表")]),s("li",null,[s("a",ds,[n("bash-handbook"),e(a)])]),s("li",null,[s("a",rs,[n("bash-guide"),e(a)]),n(" - bash 基本用法指南")]),s("li",null,[s("a",us,[n("bash-it"),e(a)]),n(" - 为你日常使用、开发以及维护 shell 脚本和自定义命令提供了一个可靠的框架")]),s("li",null,[s("a",vs,[n("dotfiles.github.io"),e(a)]),n(" - 上面有 bash 和其它 shell 的各种 dotfiles 集合以及 shell 框架的链接")]),s("li",null,[s("a",ks,[n("Runoob Shell 教程"),e(a)])]),s("li",null,[s("a",bs,[n("shellcheck"),e(a)]),n(" - 一个静态 shell 脚本分析工具，本质上是 bash／sh／zsh 的 lint。")])]),s("p",null,[n("最后，Stack Overflow 上 "),s("a",ms,[n("bash 标签下"),e(a)]),n("有很多你可以学习的问题，当你遇到问题时，也是一个提问的好地方。")])])}const $s=l(c,[["render",hs],["__file","index.html.vue"]]);export{$s as default};
