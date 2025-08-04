# 开发指南

## 项目概述

这是一个现代化的 Electron + Vite + React + TypeScript 桌面应用开发模板，集成了最新的技术栈和开发工具。

## 技术栈

### 核心框架

- **React 19** - 最新的 React 框架，支持并发特性
- **Vite 7** - 超快的构建工具，使用 Rolldown 引擎
- **Electron 37** - 最新的 Electron 框架，安全改进
- **TypeScript 5.9** - 完整的类型安全和智能提示

### 样式和 UI

- **Tailwind CSS 4** - 现代化的实用优先 CSS 框架
- **shadcn/ui** - 美观且可访问的组件库
- **Lucide React** - 现代化的图标库

### 开发工具

- **Oxlint** - 快速的 JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化，使用 OXC 插件
- **Vitest** - 快速的单元测试框架
- **Playwright** - 端到端测试

### 包管理

- **pnpm** - 更快、更高效的包管理器

## 项目结构

```
electron-vite-template/
├── electron/                    # Electron 相关代码
│   ├── main/                   # 主进程源码
│   │   ├── index.ts           # 主进程入口
│   │   └── update.ts          # 自动更新逻辑
│   └── preload/               # 预加载脚本源码
│       └── index.ts           # 预加载脚本
├── src/                       # 渲染进程源码
│   ├── components/            # React 组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   │   ├── alert.tsx     # 警告组件
│   │   │   ├── badge.tsx     # 徽章组件
│   │   │   ├── button.tsx    # 按钮组件
│   │   │   ├── card.tsx      # 卡片组件
│   │   │   ├── dialog.tsx    # 对话框组件
│   │   │   └── progress.tsx  # 进度条组件
│   │   └── update/           # 自动更新组件
│   │       └── index.tsx     # 更新界面
│   ├── assets/               # 静态资源
│   ├── demos/                # 示例代码
│   ├── lib/                  # 工具函数
│   │   └── utils.ts          # 通用工具函数
│   ├── type/                 # TypeScript 类型定义
│   ├── App.tsx               # 主应用组件
│   ├── index.css             # 全局样式
│   └── main.tsx              # 渲染进程入口
├── public/                   # 静态资源
├── test/                     # 测试文件
├── build/                    # 构建输出
├── release/                  # 发布文件
└── 配置文件
    ├── package.json          # 项目配置
    ├── vite.config.ts        # Vite 配置
    ├── electron-builder.json # Electron Builder 配置
    ├── tsconfig.json         # TypeScript 配置
    ├── components.json       # shadcn/ui 配置
    ├── prettier.config.js    # Prettier 配置
    └── .oxlintrc.json       # Oxlint 配置
```

## 开发环境设置

### 1. 安装依赖

```sh
# 使用 pnpm 安装依赖
pnpm install
```

### 2. 开发模式

```sh
# 启动开发服务器
pnpm dev
```

这将启动：

- Vite 开发服务器 (http://localhost:7777)
- Electron 主进程
- 热重载支持

### 3. 构建应用

```sh
# 构建生产版本
pnpm build
```

构建过程包括：

- TypeScript 编译
- Vite 构建
- Electron Builder 打包

### 4. 预览构建

```sh
# 预览生产构建
pnpm preview
```

## 开发规范

### 代码风格

项目使用以下工具确保代码质量：

- **Oxlint** - 快速代码检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

```sh
# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 组件开发

#### shadcn/ui 组件

项目使用 shadcn/ui 组件库，所有组件位于 `src/components/ui/` 目录。

添加新组件：

```sh
pnpm dlx shadcn@latest add [component-name]
```

#### 自定义组件

创建自定义组件时，遵循以下规范：

1. 使用 TypeScript 严格模式
2. 使用函数组件和 Hooks
3. 使用 Tailwind CSS 进行样式
4. 支持深色模式
5. 使用 `cn()` 函数合并类名

```tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
	className?: string;
	children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
	return <div className={cn("base-classes", className)}>{children}</div>;
}
```

### 样式规范

#### Tailwind CSS

- 使用 Tailwind CSS 4.x
- 支持深色模式：`dark:bg-gray-800`
- 使用响应式设计：`md:text-lg`
- 动画使用 Tailwind 类：`transition-all duration-200`

#### 深色模式

项目支持深色模式，使用 `dark:` 前缀：

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">内容</div>
```

### TypeScript 规范

- 严格使用 TypeScript，避免 `any` 类型
- 为所有函数参数和返回值定义类型
- 使用接口定义复杂对象类型
- 优先使用 `const` 和 `let`，避免 `var`

### Electron 开发

#### IPC 通信

使用类型安全的 IPC 通信：

```typescript
// 发送消息
await window.electron.ipcRenderer.invoke("channel-name", data);

// 监听消息
window.electron.ipcRenderer.on("channel-name", callback);
```

#### 主进程开发

主进程代码位于 `electron/main/` 目录：

- `index.ts` - 主进程入口
- `update.ts` - 自动更新逻辑

#### 预加载脚本

预加载脚本位于 `electron/preload/` 目录，用于安全地暴露 API 给渲染进程。

## 测试

### 单元测试

使用 Vitest 进行单元测试：

```sh
# 运行测试
pnpm test

# 运行测试并监听变化
pnpm test --watch
```

### 端到端测试

使用 Playwright 进行端到端测试：

```sh
# 运行 E2E 测试
pnpm test:e2e
```

## 自动更新

项目集成了 `electron-updater` 实现自动更新功能。

### 配置

在 `electron-builder.json` 中配置发布信息：

```json
{
	"publish": {
		"provider": "generic",
		"channel": "latest",
		"url": "https://your-update-server.com/"
	}
}
```

### 使用

更新组件位于 `src/components/update/` 目录，提供了完整的更新界面和逻辑。

## 发布

### 构建发布版本

```sh
# 构建所有平台
pnpm build

# 构建特定平台
pnpm build --win
pnpm build --mac
pnpm build --linux
```

### 发布文件

构建完成后，发布文件位于 `release/` 目录：

- 未打包的应用可执行文件
- 应用安装程序

## 常见问题

### 1. 依赖安装问题

如果遇到依赖安装问题，尝试：

```sh
# 清除缓存
pnpm store prune

# 重新安装
pnpm install
```

### 2. 构建失败

检查：

- Node.js 版本 >= 18.0.0
- 所有依赖是否正确安装
- TypeScript 配置是否正确

### 3. 开发服务器问题

如果开发服务器无法启动：

```sh
# 检查端口占用
lsof -i :7777

# 使用不同端口
pnpm dev --port 3000
```

### 4. Electron 安全

默认情况下，项目在渲染进程中集成了 Node.js API。如需遵循 Electron 安全最佳实践，可以移除 `vite.config.ts` 中的渲染器插件配置。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

[MIT](LICENSE) © [canvascat](https://github.com/canvascat)
