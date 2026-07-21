---
title: Freemark 快速入门
date: 2022-02-17 22:34:30
order: 01
categories:
  - Java
  - 工具
  - 模板引擎
tags:
  - Java
  - 模板引擎
  - Freemark
permalink: /pages/763ed67a/
---

# Freemark 快速入门

> FreeMarker 是一款模板引擎： 即一种基于模板和要改变的数据， 并用来生成输出文本(HTML 网页，电子邮件，配置文件，源代码等)的通用工具。 它不是面向最终用户的，而是一个 Java 类库，是一款程序员可以嵌入他们所开发产品的组件。

## Freemark 简介

Freemark 模板编写为 FreeMarker Template Language (FTL)。它是简单的，专用的语言， _不是_ 像 PHP 那样成熟的编程语言。在模板中，你可以专注于如何展现数据， 而在模板之外可以专注于要展示什么数据。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/779ab2cfdb394093bd851b966c30457f.png)

这种方式通常被称为 [MVC (模型 视图 控制器) 模式](http://freemarker.foofun.cn/gloss.html#gloss.MVC)，对于动态网页来说，是一种特别流行的模式。 它帮助从开发人员(Java 程序员)中分离出网页设计师(HTML 设计师)。设计师无需面对模板中的复杂逻辑， 在没有程序员来修改或重新编译代码时，也可以修改页面的样式。

Freemark 模板一句话概括就是：**_`模板 + 数据模型 = 输出`_**

## 总体结构

- **文本**：文本会照着原样来输出。
- **插值**：这部分的输出会被计算的值来替换。插值由 `${` and `}` 所分隔(或者 `#{` and `}`，这种风格已经不建议再使用了；[点击查看更多](http://freemarker.foofun.cn/ref_depr_numerical_interpolation.html))。
- **FTL 标签**：FTL 标签和 HTML 标签很相似，但是它们却是给 FreeMarker 的指示， 而且不会打印在输出内容中。
- **注释**：注释和 HTML 的注释也很相似，但它们是由 `<#--` 和 `-->`来分隔的。注释会被 FreeMarker 直接忽略， 更不会在输出内容中显示。

![](https://raw.githubusercontent.com/dunwu/images/master/archive/2026/02/ad629536efd0fde75c0502a0b6f5e478.png)

> 🔔 注意：
>
> - FTL 是区分大小写的。
> - `插值` 仅仅可以在 `文本` 中使用。
> - `FTL 标签` 不可以在其他 `FTL 标签` 和 `插值` 中使用。
> - `注释` 可以放在 `FTL 标签` 和 `插值` 中。

### 指令

FTL 指令有两种类型： [预定义指令](http://freemarker.foofun.cn/gloss.html#gloss.predefinedDirective) 和 [用户自定义指令](http://freemarker.foofun.cn/gloss.html#gloss.userDefinedDirective)。 对于用户自定义的指令使用 `@` 来代替 `#`。

> 🔔 注意：
>
> - FreeMarker 仅仅关心 FTL 标签的嵌套而不关心 HTML 标签的嵌套。 它只会把 HTML 看做是文本，不会来解释 HTML。
> - 如果你尝试使用一个不存在的指令(比如，输错了指令的名称)， FreeMarker 就会拒绝执行模板，同时抛出错误信息。
> - FreeMarker 会忽略 FTL 标签中多余的 [空白标记](http://freemarker.foofun.cn/gloss.html#gloss.whiteSpace)。

### 表达式

以下为快速浏览清单，如果需要了解更多细节，请参考[**这里**](http://freemarker.foofun.cn/dgui_template_exp.html)。

- [直接指定值](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct)
  - [字符串](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_string)： `"Foo"` 或者 `'Foo'` 或者 `"It's \"quoted\""` 或者 `'It\'s "quoted"'` 或者 `r"C:\raw\string"`
  - [数字](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_number)： `123.45`
  - [布尔值](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_boolean)： `true`， `false`
  - [序列](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_seuqence)： `["foo", "bar", 123.45]`； 值域： `0..9`, `0..<10` (或 `0..!10`), `0..`
  - [哈希表](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_hash)： `{"name":"green mouse", "price":150}`
- [检索变量](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_var)
  - [顶层变量](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_var_toplevel)： `user`
  - [从哈希表中检索数据](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_var_hash)： `user.name`， `user["name"]`
  - [从序列中检索数据](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_var_sequence)： `products[5]`
  - [特殊变量](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_var_special)： `.main`
- [字符串操作](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_stringop)
  - [插值(或连接)](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_stringop_interpolation)： `"Hello ${user}!"` (或 `"Hello " + user + "!"`)
  - [获取一个字符](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_get_character)： `name[0]`
  - [字符串切分：](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_stringop_slice) 包含结尾： `name[0..4]`，不包含结尾： `name[0..<5]`，基于长度(宽容处理)： `name[0..*5]`，去除开头：`name[5..]`
- [序列操作](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_sequenceop)
  - [连接](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_sequenceop_cat)： `users + ["guest"]`
  - [序列切分](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_seqenceop_slice)：包含结尾： `products[20..29]`， 不包含结尾： `products[20..<30]`，基于长度(宽容处理)：`products[20..*10]`，去除开头： `products[20..]`
- [哈希表操作](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_hashop)
  - [连接](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_hashop_cat)： `passwords + { "joe": "secret42" }`
- [算术运算](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_arit)： `(x * 1.5 + 10) / 2 - y % 100`
- [比较运算](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_comparison)： `x == y`， `x != y`， `x < y`， `x > y`， `x >= y`， `x <= y`， `x lt y`， `x lte y`， `x gt y`， `x gte y`， 等等。。。。。。
- [逻辑操作](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_logicalop)： `!registered && (firstVisit || fromEurope)`
- [内建函数](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_builtin)： `name?upper_case`, `path?ensure_starts_with('/')`
- [方法调用](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_methodcall)： `repeat("What", 3)`
- [处理不存在的值](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_missing)
  - [默认值](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_missing_default)： `name!"unknown"` 或者 `(user.name)!"unknown"` 或者 `name!` 或者 `(user.name)!`
  - [检测不存在的值](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_missing_test)： `name??` 或者 `(user.name)??`
- [赋值操作](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_assignment)： `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `++`, `--`

### 变量

注意：变量 _仅仅_ 在 [文本区](http://freemarker.foofun.cn/dgui_template_overallstructure.html) (比如 `<h1>Hello ${name}!</h1>`) 和 [字符串](http://freemarker.foofun.cn/dgui_template_exp.html#dgui_template_exp_direct_string) 中起作用。

正确示例：

```
<#include "/footer/${company}.html">
<#if big>...</#if>
```

错误示例：

```
<#if ${big}>...</#if>
<#if "${big}">...</#if>
```

## 数据类型

Freemark 支持的类型有：

### 标量

字符串

```
${"Hello ${user}"}
${"I can escape with \\ ${user}"}
${r"Now I can read dollar signs $"}
```

输出：

```
Hello deister
I can escape with \ deister
Now I can read dollar signs $
```

数字

布尔值

日期/时间 (日期，时间或日期时间)

### 容器

- 哈希表
- 序列
- 集合

### 子程序

- [方法和函数](http://freemarker.foofun.cn/dgui_datamodel_types.html#dgui_datamodel_method)
- [用户自定义指令](http://freemarker.foofun.cn/dgui_datamodel_types.html#dgui_datamodel_userdefdir)

### 其它

- [结点](http://freemarker.foofun.cn/dgui_datamodel_types.html#dgui_datamodel_node)

## 转义符

FTL 支持的所有转义字符：

| 转义序列 | 含义                                                                                                                                           |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `\"`     | 引号 (u0022)                                                                                                                                   |
| `\'`     | 单引号(又称为撇号) (u0027)                                                                                                                     |
| `\{`     | 起始花括号：`{`                                                                                                                                |
| `\\`     | 反斜杠 (u005C)                                                                                                                                 |
| `\n`     | 换行符 (u000A)                                                                                                                                 |
| `\r`     | 回车 (u000D)                                                                                                                                   |
| `\t`     | 水平制表符(又称为 tab) (u0009)                                                                                                                 |
| `\b`     | 退格 (u0008)                                                                                                                                   |
| `\f`     | 换页 (u000C)                                                                                                                                   |
| `\l`     | 小于号：`<`                                                                                                                                    |
| `\g`     | 大于号：`>`                                                                                                                                    |
| `\a`     | &符：`&`                                                                                                                                       |
| `\xCode` | 字符的 16 进制 [Unicode](http://freemarker.foofun.cn/gloss.html#gloss.unicode) 码 ([UCS](http://freemarker.foofun.cn/gloss.html#gloss.UCS) 码) |

## 典型应用场景

- **动态网页生成**：在 Spring MVC 中使用 FreeMarker 作为视图层，将数据模型渲染为 HTML 页面。
- **邮件模板渲染**：将订单确认、密码重置等邮件内容用 FTL 模板生成，支持变量替换和条件判断。
- **代码生成器**：在 MyBatis Generator、JHipster 等工具中，使用 FreeMarker 模板生成 Java 类、配置文件、前端代码。
- **静态站点生成**：结合数据模型批量生成静态 HTML 页面，用于文档站点、博客等。

## 最佳实践

- **避免在模板中写复杂逻辑**：模板只负责展示，复杂业务逻辑应放在 Java 代码中处理后通过数据模型传入。
- **使用 `??` 判断变量存在性**：通过 `<#if var??>` 判断变量是否存在，避免模板渲染时因空值报错。
- **配置模板缓存**：生产环境开启模板缓存（`template_update_delay=60000`），避免每次请求都重新加载模板。
- **自定义指令封装复用逻辑**：将重复的展示逻辑封装为 `<#macro>` 自定义指令，提高模板复用性。

## 常见问题

**FreeMarker 和 Thymeleaf 如何选择？**

SpringBoot 官方推荐 Thymeleaf，与 Spring 集成更紧密，支持自然模板（可直接浏览器打开）。FreeMarker 功能更强大，适合非 Web 场景（代码生成、邮件模板）。

**模板渲染报 TemplateNotFoundException？**

检查：1）模板文件路径是否正确；2）模板后缀是否为 `.ftl`；3）Configuration 中的 `setDirectoryForTemplateLoading` 或 `setClassForTemplateLoading` 是否指向正确目录。

**如何处理模板中的空值？**

使用 `!` 运算符提供默认值：`${user.name!"\u672a\u77e5"}`；或使用 `<#if user.name??>` 判断存在性后再使用。

## 参考资料

- [Freemark Github](https://github.com/apache/freemarker)
- [Freemark 中文教程](http://freemarker.foofun.cn/)
- [在线 Freemark 工具](https://try.freemarker.apache.org/)
