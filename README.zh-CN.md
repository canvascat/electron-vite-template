# electron-vite-template

![GitHub stars](https://img.shields.io/github/stars/canvascat/electron-vite-template?color=fa6470)
![GitHub issues](https://img.shields.io/github/issues/canvascat/electron-vite-template?color=d8b22d)
![GitHub license](https://img.shields.io/github/license/canvascat/electron-vite-template)
[![Required Node.JS >= 18.0.0](https://img.shields.io/static/v1?label=node&message=%3E=18.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

[English](README.md) | 简体中文

## 概述

📦 **开箱即用** - 现代化的 Electron + Vite + React + TypeScript 模板  
🎯 **基于最新技术栈** - React 19, Vite 7, Electron 37, Tailwind CSS 4  
🌱 **易于扩展** - 结构清晰，可塑性强的架构  
💪 **类型安全开发** - 完整的 TypeScript 支持，严格模式  
🔩 **现代化工具链** - Oxlint, Prettier, Vitest, Playwright  
🎨 **美观的 UI** - shadcn/ui 组件库配合 Tailwind CSS  
🖥 **多窗口支持** - 轻松实现多窗口应用  
🔄 **自动更新** - 内置 electron-updater 集成

## 快速开始

```sh
# clone the project
git clone https://github.com/canvascat/electron-vite-template.git

# enter the project directory
cd electron-vite-template

# install dependency
pnpm install

# develop
pnpm dev
```

## 调试

![electron-vite-react-debug.gif](/electron-vite-react-debug.gif)

## 🚀 特性

- **React 19** - 最新的 React，支持并发特性
- **Vite 7** - 超快的构建工具，使用 Rolldown
- **Electron 37** - 最新的 Electron，安全改进
- **TypeScript 5.9** - 完整的类型安全和智能提示
- **Tailwind CSS 4** - 现代化的实用优先 CSS 框架
- **shadcn/ui** - 美观且可访问的组件库
- **Oxlint** - 快速的 JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化，使用 OXC 插件
- **Vitest** - 快速的单元测试框架
- **Playwright** - 端到端测试
- **自动更新** - 内置 electron-updater 集成

## 目录结构

熟悉的 React 应用结构，集成 Electron：

```tree
├── electron                                 Electron 相关代码
│   ├── main                                 主进程源码
│   └── preload                              预加载脚本源码
│
├── release                                  生产构建后生成的目录
│   └── {version}
│       ├── {os}-{os_arch}                   未打包的应用可执行文件
│       └── {app_name}_{version}.{ext}       应用安装文件
│
├── public                                   静态资源
└── src                                      渲染进程源码，React 应用
    ├── components/                          React 组件
    │   ├── ui/                             shadcn/ui 组件
    │   └── update/                         自动更新组件
    ├── assets/                             静态资源
    ├── lib/                                工具函数
    ├── type/                               TypeScript 类型定义
    └── demos/                              示例代码
```

<!--
## 🚨 这需要留神

默认情况下，该模板在渲染进程中集成了 Node.js，如果你不需要它，你只需要删除下面的选项. [因为它会修改 Vite 默认的配置](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

export default {
  plugins: [
    ...
-   // Use Node.js API in the Renderer-process
-   renderer({
-     nodeIntegration: true,
-   }),
    ...
  ],
}
```
-->

## 🔧 开发

```sh
# 开发环境
pnpm dev

# 生产构建
pnpm build

# 预览生产构建
pnpm preview

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 🎨 UI 组件

本模板包含 [shadcn/ui](https://ui.shadcn.com/) 组件：

- **Button** - 多功能按钮组件，支持多种变体
- **Card** - 内容容器，包含头部、内容和底部
- **Dialog** - 模态对话框组件
- **Progress** - 进度指示器
- **Alert** - 通知提醒组件
- **Badge** - 状态指示徽章组件

添加更多组件：

```sh
pnpm dlx shadcn@latest add [component-name]
```

## 🔄 自动更新

使用 `electron-updater` 的内置自动更新功能。详情请参阅[更新文档](src/components/update/README.zh-CN.md)。

## 🧪 测试

- **单元测试**: Vitest 快速单元测试
- **端到端测试**: Playwright 端到端测试
- **组件测试**: React Testing Library 集成

## 📦 包管理

本项目使用 **pnpm** 进行更快、更高效的包管理：

```sh
# 安装依赖
pnpm install

# 添加新依赖
pnpm add [package-name]

# 添加开发依赖
pnpm add -D [package-name]
```

## 🔧 配置文件

- **vite.config.ts** - Vite 配置，包含 Electron 插件
- **electron-builder.json** - Electron Builder 配置
- **tsconfig.json** - TypeScript 配置
- **components.json** - shadcn/ui 配置
- **prettier.config.js** - Prettier 配置
- **.oxlintrc.json** - Oxlint 配置

## 🚨 安全考虑

本模板遵循 **Electron 安全最佳实践**，默认在渲染进程中禁用了 Node.js API。 。

## ❔ 常见问题

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 📚 文档

- [Development Guide](DEVELOPMENT.en.md) - 详细的英文开发指南
- [开发指南](DEVELOPMENT.md) - 详细的中文开发指南
- [自动更新文档](src/components/update/README.zh-CN.md) - 自动更新功能文档

## 📄 许可证

[MIT](LICENSE) © [canvascat](https://github.com/canvascat)
