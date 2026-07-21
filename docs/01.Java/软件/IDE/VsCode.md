---
title: Vscode 快速入门
date: 2019-05-14 14:57:33
order: 03
categories:
  - Java
  - 软件
  - IDE
tags:
  - Java
  - IDE
permalink: /pages/9aade3d2/
---

# Vscode 快速入门

## 快捷键

### 命令面板（Command Palette）

根据您当前的上下文访问所有可用命令。

> Mac: cmd+shift+p or f1
> Windows / Linux: ctrl+shift+p or f1

### 快速打开文件（Quick Open）

> Mac: cmd+p
> Windows / Linux: ctrl+p

### Status Bar

> Mac: shift+cmd+m
> Windows / Linux: ctrl+shift+m

### 改变语言模式

> Mac: cmd+k m
> Windows / Linux: ctrl+k m

### 设置

> Mac: cmd+,
> Windows / Linux: **File** > **Preferences** > **Settings** or ctrl+,

## 插件

- Chinese (Simplified) Language Pack for Visual Studio Code
- Prettier - Code formatter
- IntelliJ IDEA Keybindings
- EditorConfig for VS Code
- Git History

## 典型应用场景

- **全栈开发**：VSCode 轻量级且插件丰富，可同时用于前端（React/Vue）和后端（Java/Node.js/Python）开发。
- **远程开发**：通过 Remote-SSH 插件连接远程服务器开发，体验与本地开发一致。
- **多语言混合项目**：在一个工作区中同时处理多种语言的项目，无需切换 IDE。
- **轻量级脚本编辑**：编写 Shell、Python、SQL 等脚本文件时，VSCode 启动速度快，体验流畅。

## 最佳实践

- **必备插件**：Java Extension Pack、Lombok Support、GitLens、EditorConfig、Prettier 是 Java 全栈开发的必备插件。
- **配置 settings.json**：通过 `settings.json` 统一管理格式化规则、保存时自动格式化等配置，并与团队共享。
- **使用工作区配置**：通过 `.vscode/settings.json` 配置项目级别的编辑器设置，避免全局配置影响其他项目。
- **利用 Multi-root Workspace**：将多个相关项目（如前后端）放在同一工作区中管理。

## 常见问题

**VSCode 做 Java 开发体验不如 IDEA？**

VSCode 的 Java 支持通过 Language Server 实现，索引速度和重构功能确实不如 IDEA。适合轻量级 Java 项目或全栈开发，大型 Java 项目仍推荐 IDEA。

**如何配置 Java 开发环境？**

安装 Java Extension Pack（包含 Language Support、Debugger、Test Runner、Maven、Gradle、Project Manager），即可支持代码提示、调试、测试等核心功能。

## 更多内容

- 官方
  - https://github.com/Microsoft/vscode
  - https://github.com/Microsoft/vscode-docs
  - https://github.com/Microsoft/vscode-tips-and-tricks
- 更多资源
  - https://github.com/viatsko/awesome-vscode
