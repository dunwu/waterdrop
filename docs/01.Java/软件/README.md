---
title: Java 软件
date: 2022-02-18 08:53:11
categories:
  - Java
  - 软件
tags:
  - Java
permalink: /pages/050ef502/
hidden: true
index: false
---

# Java 软件

> 本部分内容主要是 Java 开发领域使用的一些 Java 软件，如构建工具、IDE、服务器、日志中心等等。

## 📖 内容

### 构建

> Java 项目需要通过 [**构建工具**](构建) 来管理项目依赖，完成编译、打包、发布、生成 JavaDoc 等任务。
>
> - 目前最主流的构建工具是 Maven，它的功能非常强大。
> - Gradle 号称是要替代 Maven 等构件工具，它的版本管理确实简洁，但是需要学习 Groovy，学习成本比 Maven 高。
> - Ant 功能比 Maven 和 Gradle 要弱，现代 Java 项目基本不用了，但也有一些传统的 Java 项目还在使用。

- [Maven](构建/Maven) 📚
  - [Maven 快速入门](构建/Maven/[Maven]快速入门.md) - 关键词：`Maven`、`pom.xml`、`依赖管理`、`生命周期`、`中央仓库`
  - [Maven 教程之 pom.xml 详解](构建/Maven/[Maven]pom详解.md) - 关键词：`Maven`、`pom.xml`、`Project Object Model`、`依赖配置`、`坐标`
  - [Maven 教程之 settings.xml 详解](构建/Maven/[Maven]settings详解.md) - 关键词：`Maven`、`settings.xml`、`全局配置`、`镜像`、`仓库认证`
  - [Maven 实战问题和最佳实践](构建/Maven/[Maven]最佳实践.md) - 关键词：`Maven`、`dependencyManagement`、`多模块`、`版本管理`、`最佳实践`
  - [Maven 教程之发布 jar 到私服或中央仓库](构建/Maven/[Maven]发布.md) - 关键词：`Maven`、`Sonatype`、`中央仓库`、`jar 发布`、`GPG 签名`
  - [Maven 插件之代码检查](构建/Maven/[Maven]插件.md) - 关键词：`Maven`、`插件`、`生命周期`、`Mojo`、`maven-compiler-plugin`
- [Ant 简易教程](构建/Ant.md) - 关键词：`Ant`、`build.xml`、`构建工具`、`自动化构建`、`Apache`

### IDE

> 自从有了 [**IDE**](IDE)，写代码从此就告别了刀耕火种的蛮荒时代。
>
> - [Eclipse](IDE/Eclipse.md) 是久负盛名的开源 Java IDE，我的学生时代一直使用它写 Java。 - 关键词：`Eclipse`、`IDE`、`代码提示`、`插件`、`Java 开发`
> - 曾经抗拒从转 [Intellij Idea](IDE/Intellij.md) ，但后来发现真香，不得不说，确实是目前最优秀的 Java IDE。 - 关键词：`IntelliJ IDEA`、`快捷键`、`IDE`、`代码重构`、`JetBrains`
> - 你可以在 [vscode](IDE/VsCode.md) 中写各种语言，只要安装相应插件即可。如果你的项目中使用了很多种编程语言，又懒得在多个 IDE 之间切换，那么就用 vscode 来一网打尽吧。 - 关键词：`VS Code`、`IDE`、`快捷键`、`命令面板`、`轻量编辑器`

- [Intellij Idea](IDE/Intellij.md) - 关键词：`IntelliJ IDEA`、`快捷键`、`IDE`、`代码重构`、`JetBrains`
- [Eclipse](IDE/Eclipse.md) - 关键词：`Eclipse`、`IDE`、`代码提示`、`插件`、`Java 开发`
- [vscode](IDE/VsCode.md) - 关键词：`VS Code`、`IDE`、`快捷键`、`命令面板`、`轻量编辑器`

### 监控诊断

> [监控/诊断](监控诊断) 工具主要用于 Java 应用的运维。通过采集、分析、存储、可视化应用的有效数据，帮助开发者、使用者快速定位问题，找到性能瓶颈。

- [监控工具对比](监控诊断/监控工具.md) - 关键词：`监控工具`、`APM`、`CAT`、`Zipkin`、`SkyWalking`
- [CAT](监控诊断/CAT.md) - 关键词：`CAT`、`分布式监控`、`实时告警`、`链路追踪`、`美团`
- [Zipkin](监控诊断/Zipkin.md) - 关键词：`Zipkin`、`分布式追踪`、`Dapper`、`链路分析`、`Twitter`
- [SkyWalking](监控诊断/Skywalking.md) - 关键词：`SkyWalking`、`APM`、`分布式追踪`、`微服务监控`、`服务网格`
- [Arthas](监控诊断/Arthas.md) - 关键词：`Arthas`、`Java 诊断`、`在线排查`、`JVM`、`Alibaba`

## 📚 资料

- **官网**
  - [Maven Github](https://github.com/apache/maven)
  - [Maven 官方文档](https://maven.apache.org/ref/current)
  - [Ant 官方手册](http://ant.apache.org/manual/index.html)
- **书籍**
  - [《Maven 实战》](https://book.douban.com/subject/5345682/)

## 🚪 传送

◾ 💧 [钝悟的 IT 知识图谱](https://dunwu.github.io/waterdrop/) ◾ 🎯 [钝悟的博客](https://dunwu.github.io/blog/) ◾
