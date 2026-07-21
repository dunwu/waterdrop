---
title: javalib-util
date: 2022-02-17 22:34:30
order: 02
categories:
  - Java
  - 工具
  - 其他
tags:
  - Java
  - 工具包
permalink: /pages/c336f7f4/
---

# 细说 Java 主流工具包

- apache.commons
  - [commons-lang](https://github.com/apache/commons-lang)
  - [commons-collections](https://github.com/apache/commons-collections)
  - [common-io](https://github.com/apache/commons-io)
- [guava](https://github.com/google/guava)

## 典型应用场景

- **字符串处理**：使用 `StringUtils` (commons-lang) 或 `Strings` (Guava) 进行空值判断、拼接、截取等操作，替代手写判空逻辑。
- **集合操作增强**：使用 Guava 的 `Lists` / `Maps` / `Sets` 工具类和 `ImmutableList` / `ImmutableMap` 创建不可变集合，简化集合初始化。
- **IO 操作简化**：使用 `IOUtils` / `FileUtils` (commons-io) 简化文件读写、流关闭、目录复制等常见 IO 操作。
- **类型转换与解析**：使用 `NumberUtils`、`BooleanUtils`、`DateUtils` 等工具类简化类型转换和解析逻辑。

## 最佳实践

- **优先使用 Guava**：Guava 由 Google 维护，API 设计更现代，功能更全面，新项目中优先选择 Guava 而非 commons 系列。
- **避免重复造轮子**：在写工具方法前先检查工具库是否已提供，如 `Preconditions.checkNotNull`、`Joiner`/`Splitter` 等。
- **引入不可变集合**：在不需要修改的场景下，使用 Guava 的 `ImmutableList.of()` 替代 `Collections.unmodifiableList()`，更安全且性能更好。
- **注意版本兼容性**：commons-lang 已升级为 commons-lang3，旧版 `org.apache.commons.lang` 不再维护，迁移时注意包名变更。

## 常见问题

**commons-lang 和 commons-lang3 的区别？**

commons-lang3 是 commons-lang 的重写版本，包名从 `org.apache.commons.lang` 变为 `org.apache.commons.lang3`，API 更现代且支持 Java 5+ 特性。新项目应直接使用 commons-lang3。

**Guava 和 Apache Commons 应该选哪个？**

两者可以共存。Guava 在集合、缓存、并发方面更强；Commons 在字符串、IO、反射等方面更丰富。实际项目中通常两者都会引入。

## 参考资料

- [Apache Commons Lang](https://commons.apache.org/proper/commons-lang/)
- [Apache Commons IO](https://commons.apache.org/proper/commons-io/)
- [Guava Github](https://github.com/google/guava)
