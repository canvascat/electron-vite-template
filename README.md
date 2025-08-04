# electron-vite-template

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub stars](https://img.shields.io/github/stars/canvascat/electron-vite-template?color=fa6470)
![GitHub issues](https://img.shields.io/github/issues/canvascat/electron-vite-template?color=d8b22d)
![GitHub license](https://img.shields.io/github/license/canvascat/electron-vite-template)
[![Required Node.JS >= 18.0.0](https://img.shields.io/static/v1?label=node&message=%3E=18.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

English | [简体中文](README.zh-CN.md)

## 👀 Overview

📦 **Ready out of the box** - Modern Electron + Vite + React + TypeScript template  
🎯 **Based on the latest tech stack** - React 19, Vite 7, Electron 37, Tailwind CSS 4  
🌱 **Easily extendable** - Well-structured and customizable architecture  
💪 **Type-safe development** - Full TypeScript support with strict mode  
🔩 **Modern tooling** - Oxlint, Prettier, Vitest, Playwright  
🎨 **Beautiful UI** - shadcn/ui components with Tailwind CSS  
🖥 **Multi-window support** - Easy to implement multiple windows  
🔄 **Auto-update** - Built-in electron-updater integration

## 🛫 Quick Setup

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

## 🐞 Debug

![electron-vite-react-debug.gif](/electron-vite-react-debug.gif)

## 🚀 Features

- **React 19** - Latest React with concurrent features
- **Vite 7** - Ultra-fast build tool with Rolldown
- **Electron 37** - Latest Electron with security improvements
- **TypeScript 5.9** - Full type safety and IntelliSense
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library
- **Oxlint** - Fast JavaScript/TypeScript linter
- **Prettier** - Code formatting with OXC plugin
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing
- **Auto-update** - Built-in electron-updater integration

## 📂 Directory structure

Familiar React application structure with Electron integration:

```tree
├── electron                                 Electron-related code
│   ├── main                                 Main-process source code
│   └── preload                              Preload-scripts source code
│
├── release                                  Generated after production build
│   └── {version}
│       ├── {os}-{os_arch}                   Unpacked application executable
│       └── {app_name}_{version}.{ext}       Installer for the application
│
├── public                                   Static assets
└── src                                      Renderer source code, React application
    ├── components/                          React components
    │   ├── ui/                             shadcn/ui components
    │   └── update/                         Auto-update components
    ├── assets/                             Static assets
    ├── lib/                                Utility functions
    ├── type/                               TypeScript type definitions
    └── demos/                              Example code
```

<!--
## 🚨 Be aware

This template integrates Node.js API to the renderer process by default. If you want to follow **Electron Security Concerns** you might want to disable this feature. You will have to expose needed API by yourself.

To get started, remove the option as shown below. This will [modify the Vite configuration and disable this feature](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

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

## 🔧 Development

```sh
# Development
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🎨 UI Components

This template includes [shadcn/ui](https://ui.shadcn.com/) components:

- **Button** - Versatile button component with variants
- **Card** - Content container with header, content, and footer
- **Dialog** - Modal dialog component
- **Progress** - Progress indicator
- **Alert** - Alert component for notifications
- **Badge** - Badge component for status indicators

To add more components:

```sh
pnpm dlx shadcn@latest add [component-name]
```

## 🔄 Auto Update

Built-in auto-update functionality using `electron-updater`. See [update documentation](src/components/update/README.md) for details.

## 🧪 Testing

- **Unit Tests**: Vitest for fast unit testing
- **E2E Tests**: Playwright for end-to-end testing
- **Component Tests**: React Testing Library integration

## 📦 Package Management

This project uses **pnpm** for faster, more efficient package management:

```sh
# Install dependencies
pnpm install

# Add new dependency
pnpm add [package-name]

# Add development dependency
pnpm add -D [package-name]
```

## 🔧 Configuration Files

- **vite.config.ts** - Vite configuration with Electron plugin
- **electron-builder.json** - Electron Builder configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **components.json** - shadcn/ui configuration
- **prettier.config.js** - Prettier configuration
- **.oxlintrc.json** - Oxlint configuration

## 🚨 Security Considerations

This template integrates Node.js API in the renderer process by default. If you want to follow **Electron Security Best Practices**, you can disable this feature by removing the renderer plugin configuration in `vite.config.ts`.

## ❔ FAQ

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📚 Documentation

- [Development Guide](DEVELOPMENT.en.md) - Detailed development guide
- [开发指南](DEVELOPMENT.md) - 详细的中文开发指南
- [Auto Update Documentation](src/components/update/README.md) - Auto-update feature documentation

## 📄 License

[MIT](LICENSE) © [canvascat](https://github.com/canvascat)
