---
title: Spring 国际化
date: 2022-12-22 11:44:54
order: 26
categories:
  - Java
  - 框架
  - Spring
  - Spring核心
tags:
  - Java
  - 框架
  - Spring
permalink: /pages/cc90e358/
---

# Spring 国际化

## Spring 国际化使用场景

- 普通国际化文案
- Bean Validation 校验国际化文案
- Web 站点页面渲染
- Web MVC 错误消息提示

## Spring 国际化接口

- 核心接口：`org.springframework.context.MessageSource`
- 主要概念
  - 文案模板编码（code）
  - 文案模板参数（args）
  - 区域（Locale）

## 层次性 MessageSource

- Spring 层次性接口回顾
  - `org.springframework.beans.factory.HierarchicalBeanFactory`
  - `org.springframework.context.ApplicationContext`
  - `org.springframework.beans.factory.config.BeanDefinition`
- Spring 层次性国际化接口
  - `org.springframework.context.HierarchicalMessageSource`

## Java 国际化标准实现

核心接口：

- 抽象实现 - `java.util.ResourceBundle`
- Properties 资源实现 - `java.util.PropertyResourceBundle`
- 例举实现 - `java.util.ListResourceBundle`

`ResourceBundle` 核心特性

- Key-Value 设计
- 层次性设计
- 缓存设计
- 字符编码控制 - `java.util.ResourceBundle.Control`（@since 1.6）
- Control SPI 扩展 - `java.util.spi.ResourceBundleControlProvider`（@since 1.8）

## Java 文本格式化

- 核心接口
  - java.text.MessageFormat
- 基本用法
  - 设置消息格式模式- new MessageFormat(...)
  - 格式化 - format(new Object[]{...})
- 消息格式模式
  - 格式元素：{ArgumentIndex (,FormatType,(FormatStyle))}
  - FormatType：消息格式类型，可选项，每种类型在 number、date、time 和 choice 类型选其一
  - FormatStyle：消息格式风格，可选项，包括：short、medium、long、full、integer、currency、
    percent
- 高级特性
  - 重置消息格式模式
  - 重置 java.util.Locale
  - 重置 java.text.Format

## MessageSource 开箱即用实现

- 基于 ResourceBundle + MessageFormat 组合 MessageSource 实现
- org.springframework.context.support.ResourceBundleMessageSource
- 可重载 Properties + MessageFormat 组合 MessageSource 实现
- org.springframework.context.support.ReloadableResourceBundleMessageSource

## MessageSource 內建依赖

- MessageSource 內建 Bean 可能来源
- 预注册 Bean 名称为：“messageSource”，类型为：MessageSource Bean
- 默认內建实现 - DelegatingMessageSource
- 层次性查找 MessageSource 对象

## 问题

**Spring Boot 为什么要新建 MessageSource Bean**？

- AbstractApplicationContext 的实现决定了 MessageSource 內建实现
- Spring Boot 通过外部化配置简化 MessageSource Bean 构建
- Spring Boot 基于 Bean Validation 校验非常普遍

**Spring 国际化接口有哪些**？

- 核心接口 - MessageSource
- 层次性接口 - `org.springframework.context.HierarchicalMessageSource`

**Spring 有哪些 MessageSource 內建实现**？

- `org.springframework.context.support.ResourceBundleMessageSource`
- `org.springframework.context.support.ReloadableResourceBundleMessageSource`
- `org.springframework.context.support.StaticMessageSource`
- `org.springframework.context.support.DelegatingMessageSource`

**如何实现配置自动更新 MessageSource**？

主要技术

- Java NIO 2：`java.nio.file.WatchService`
- Java Concurrency : `java.util.concurrent.ExecutorService`
- Spring：`org.springframework.context.support.AbstractMessageSource`

## 典型应用场景

- **多语言 Web 应用**：根据用户浏览器语言自动切换界面文本，如中英文站点切换。
- **错误消息国际化**：将校验错误提示、业务异常信息按语言组织到不同资源文件中。
- **邮件/短信模板**：根据用户语言偏好发送对应语言的邮件或短信通知。

## 最佳实践

- **统一使用 `MessageSource` 接口**：而非直接使用 `ResourceBundle`，保持与 Spring 生态的集成。
- **开发环境使用 `ReloadableResourceBundleMessageSource`**：支持热加载资源文件，无需重启应用。
- **生产环境使用 `ResourceBundleMessageSource`**：性能更优，资源文件只加载一次。
- **资源文件命名规范**：`messages_zh_CN.properties`、`messages_en_US.properties`，遵循 `{basename}_{locale}.properties` 规则。

## 常见问题

- **中文乱码如何解决？** 资源文件默认使用 ISO-8859-1 编码，中文需转为 Unicode 转义（`\uXXXX`），或在 `MessageSource` 中设置 `defaultEncoding = "UTF-8"`。
- **如何在运行时动态切换语言？** 通过 `LocaleResolver` 解析请求中的 `Accept-Language` 头或参数，动态设置当前线程的 `Locale`。

## 参考资料

- [Spring 官方文档之 Core Technologies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans)
- [《小马哥讲 Spring 核心编程思想》](https://time.geekbang.org/course/intro/265)
