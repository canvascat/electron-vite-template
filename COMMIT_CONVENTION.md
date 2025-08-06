# Commit Message 规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来标准化提交信息。

## 提交信息格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型 (Type)

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响代码逻辑）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 测试相关
- **build**: 构建系统或外部依赖变更
- **ci**: CI/CD 配置变更
- **chore**: 其他杂项变更
- **revert**: 回滚之前的提交
- **wip**: 工作进行中（临时提交）

### 作用域 (Scope)

可选的作用域，用于指定变更影响的范围：

- **ui**: 用户界面相关
- **electron**: Electron 相关
- **vite**: Vite 构建相关
- **typescript**: TypeScript 类型相关
- **deps**: 依赖包相关
- **config**: 配置文件相关

### 描述 (Description)

- 使用小写字母
- 不超过 72 个字符
- 以动词开头
- 不使用句号结尾

### 正文 (Body)

- 可选
- 详细描述变更原因和影响
- 每行不超过 100 个字符

### 页脚 (Footer)

- 可选
- 用于引用相关 issue
- 格式：`Closes #123` 或 `Fixes #456`

## 示例

### 新功能

```
feat(ui): 添加深色模式切换按钮

添加了一个新的切换按钮，允许用户在浅色和深色模式之间切换。
按钮位于应用设置页面中。

Closes #123
```

### 修复 bug

```
fix(electron): 修复 IPC 通信超时问题

在长时间运行的操作中，IPC 通信可能会超时。
添加了重试机制和更好的错误处理。

Fixes #456
```

### 文档更新

```
docs: 更新 README 安装说明

添加了详细的安装步骤和依赖要求说明。
```

### 代码重构

```
refactor(typescript): 重构类型定义结构

将分散的类型定义整合到统一的类型文件中，
提高代码的可维护性和类型安全性。
```

### 性能优化

```
perf(vite): 优化构建速度

通过并行处理和缓存优化，将构建时间减少了 30%。
```

### 测试相关

```
test: 添加组件单元测试

为 Button 和 Dialog 组件添加了完整的单元测试，
覆盖率达到 90% 以上。
```

## 工具支持

### 安装依赖

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional husky
```

### 初始化 Husky

```bash
npx husky install
```

### 添加 Git Hooks

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
npx husky add .husky/pre-commit 'pnpm lint && pnpm test'
```

## 自动化工具

### VS Code 扩展推荐

- **Conventional Commits**: 提供 commit message 模板和验证
- **GitLens**: 增强的 Git 功能
- **Git Graph**: 可视化 Git 历史

### 命令行工具

```bash
# 使用 commitizen 进行交互式提交
pnpm add -D commitizen cz-conventional-changelog

# 在 package.json 中添加
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

## 常见错误

### ❌ 错误的提交信息

```
update readme
修复了bug
添加新功能
```

### ✅ 正确的提交信息

```
docs: 更新 README 文档
fix(ui): 修复按钮点击无响应问题
feat(electron): 添加自动更新功能
```

## 最佳实践

1. **每次提交只做一件事**: 避免在一个提交中包含多个不相关的变更
2. **使用现在时态**: 描述提交做了什么，而不是做了什么
3. **提供足够的上下文**: 在正文中详细说明变更原因
4. **引用相关 issue**: 使用 footer 引用相关的 issue 或 PR
5. **定期提交**: 避免长时间不提交，保持提交历史的清晰

## 团队协作

- 所有团队成员都应该遵循这个规范
- 在 PR 描述中使用相同的格式
- 使用自动化工具确保规范执行
- 定期审查提交历史，保持一致性
