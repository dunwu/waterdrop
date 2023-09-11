---
title: Java 软件
date: 2022-02-18 08:53:11
categories:
  - Java
  - 软件
tags:
  - Java
permalink: /pages/2cb045/
hidden: true
index: false
---

# Java 软件

> 本部分内容主要是 Java 开发领域使用的一些 Java 软件，如构建工具、IDE、服务器、日志中心等等。

## 📖 内容

### 构建

> Java 项目需要通过 [**构建工具**](01.构建) 来管理项目依赖，完成编译、打包、发布、生成 JavaDoc 等任务。
>
> - 目前最主流的构建工具是 Maven，它的功能非常强大。
> - Gradle 号称是要替代 Maven 等构件工具，它的版本管理确实简洁，但是需要学习 Groovy，学习成本比 Maven 高。
> - Ant 功能比 Maven 和 Gradle 要弱，现代 Java 项目基本不用了，但也有一些传统的 Java 项目还在使用。

- [Maven](01.构建/01.Maven) 📚
  - [Maven 快速入门](01.构建/01.Maven/01.Maven快速入门.md)
  - [Maven 教程之 pom.xml 详解](01.构建/01.Maven/02.Maven教程之pom.xml详解.md)
  - [Maven 教程之 settings.xml 详解](01.构建/01.Maven/03.Maven教程之settings.xml详解.md)
  - [Maven 实战问题和最佳实践](01.构建/01.Maven/04.Maven实战问题和最佳实践.md)
  - [Maven 教程之发布 jar 到私服或中央仓库](01.构建/01.Maven/05.Maven教程之发布jar到私服或中央仓库.md)
  - [Maven 插件之代码检查](01.构建/01.Maven/06.Maven插件之代码检查.md)
- [Ant 简易教程](01.构建/02.Ant.md)

### IDE

> 自从有了 [**IDE**](02.IDE)，写代码从此就告别了刀耕火种的蛮荒时代。
>
> - [Eclipse](02.IDE/02.Eclipse.md) 是久负盛名的开源 Java IDE，我的学生时代一直使用它写 Java。
> - 曾经抗拒从转 [Intellij Idea](02.IDE/01.Intellij.md) ，但后来发现真香，不得不说，确实是目前最优秀的 Java IDE。
> - 你可以在 [vscode](02.IDE/03.VsCode.md) 中写各种语言，只要安装相应插件即可。如果你的项目中使用了很多种编程语言，又懒得在多个 IDE 之间切换，那么就用 vscode 来一网打尽吧。

- [Intellij Idea](02.IDE/01.Intellij.md)
- [Eclipse](02.IDE/02.Eclipse.md)
- [vscode](02.IDE/03.VsCode.md)

### 监控诊断

> [监控/诊断](03.监控诊断) 工具主要用于 Java 应用的运维。通过采集、分析、存储、可视化应用的有效数据，帮助开发者、使用者快速定位问题，找到性能瓶颈。

- [监控工具对比](03.监控诊断/01.监控工具对比.md)
- [CAT](03.监控诊断/02.CAT.md)
- [Zipkin](03.监控诊断/03.Zipkin.md)
- [SkyWalking](03.监控诊断/04.Skywalking.md)
- [Arthas](03.监控诊断/05.Arthas.md)

## 📚 资料

- **官网**
  - [Maven Github](https://github.com/apache/maven)
  - [Maven 官方文档](https://maven.apache.org/ref/current)
  - [Ant 官方手册](http://ant.apache.org/manual/index.html)
- **书籍**
  - [《Maven 实战》](https://book.douban.com/subject/5345682/)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾