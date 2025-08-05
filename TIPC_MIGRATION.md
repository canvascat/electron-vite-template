# tipc-electron 迁移指南

本项目已成功从传统的 Electron IPC 通信迁移到类型安全的 `tipc-electron`。

## 迁移内容

### 1. 主进程配置

**文件**: `electron/main/tipc.ts`

- 创建了 tipc-electron 的初始化配置

**文件**: `electron/main/functions/index.ts`

- 定义了类型安全的 API 路由
- 包含窗口管理、日志、计数器、系统信息等功能

**文件**: `electron/main/index.ts`

- 集成了 tipc-electron 服务器
- 移除了传统的 `ipcMain` 处理程序

### 2. 渲染进程配置

**文件**: `src/lib/tipc.ts`

- 创建了类型安全的客户端
- 提供了完整的 TypeScript 类型支持

**文件**: `electron/preload/index.ts`

- 简化了预加载脚本
- 直接暴露 `ipcRenderer` 给渲染进程

### 3. 演示组件

**文件**: `src/demos/ipc.ts`

- 展示了 tipc-electron 的各种功能
- 包含实时数据订阅、窗口控制、系统信息等示例

## 主要特性

### 🔒 完全类型安全

- 端到端的 TypeScript 类型推断
- 编译时错误检查
- 自动补全支持

### 🚀 直观的 API 设计

```typescript
// 请求-响应模式
const userInfo = await tipc.user.getInfo.invoke("123");

// 事件发射模式
tipc.logger.info.emit("应用启动成功");

// 实时订阅模式
const unsubscribe = tipc.counter.subscribe.subscribe((count) => {
	console.log(`当前计数: ${count}`);
});
```

### 📡 多种通信模式

- **handle**: 异步请求-响应
- **on**: 事件发射（单向通信）
- **subscription**: 实时数据流订阅

### 🌊 响应式编程

- 基于 RxJS Observable 的订阅机制
- 自动管理和清理订阅
- 支持复杂的数据流操作

## API 路由结构

```typescript
export const appRouter = {
	window: {
		open: procedure.handle(async (arg: string) => {
			/* ... */
		}),
		getInfo: procedure.handle(function () {
			/* ... */
		}),
		maximize: procedure.on(function () {
			/* ... */
		}),
		minimize: procedure.on(function () {
			/* ... */
		}),
		close: procedure.on(function () {
			/* ... */
		}),
	},
	logger: {
		info: procedure.on((message: string) => {
			/* ... */
		}),
		error: procedure.on((error: string) => {
			/* ... */
		}),
		warn: procedure.on((warning: string) => {
			/* ... */
		}),
	},
	counter: {
		subscribe: procedure.subscription(() => counter$),
		get: procedure.handle(() => {
			/* ... */
		}),
		increment: procedure.handle(() => {
			/* ... */
		}),
		decrement: procedure.handle(() => {
			/* ... */
		}),
		reset: procedure.on(() => {
			/* ... */
		}),
		set: procedure.handle((value: number) => {
			/* ... */
		}),
	},
	system: {
		getInfo: procedure.handle(async () => {
			/* ... */
		}),
		getAppInfo: procedure.handle(() => {
			/* ... */
		}),
	},
};
```

## 使用示例

### 1. 基本调用

```typescript
import tipc from "@/lib/tipc";

// 获取系统信息
const systemInfo = await tipc.system.getInfo.invoke();
console.log(systemInfo);

// 发送日志
tipc.logger.info.emit("操作成功");
```

### 2. 实时订阅

```typescript
// 订阅计数器变化
const unsubscribe = tipc.counter.subscribe.subscribe((count) => {
	setCounter(count);
});

// 操作计数器
await tipc.counter.increment.invoke();
tipc.counter.reset.emit();

// 清理订阅
unsubscribe();
```

### 3. 窗口控制

```typescript
// 获取窗口信息
const windowInfo = await tipc.window.getInfo.invoke();

// 窗口操作
tipc.window.maximize.emit();
tipc.window.minimize.emit();
tipc.window.close.emit();
```

## 最佳实践

### 1. 错误处理

```typescript
try {
	const result = await tipc.system.getInfo.invoke();
} catch (error) {
	console.error("获取系统信息失败:", error);
	tipc.logger.error.emit(`错误: ${error.message}`);
}
```

### 2. 订阅清理

```typescript
useEffect(() => {
	const unsubscribe = tipc.counter.subscribe.subscribe(setCounter);
	return () => unsubscribe();
}, []);
```

### 3. 类型安全

```typescript
// 自动类型推断
const userInfo = await tipc.user.getInfo.invoke("123");
// userInfo 的类型会自动推断为 UserInfo
```

## 迁移优势

1. **类型安全**: 编译时错误检查，避免运行时错误
2. **开发体验**: 更好的 IDE 支持和自动补全
3. **代码质量**: 更清晰的 API 结构和错误处理
4. **维护性**: 更容易重构和维护
5. **性能**: 基于 RxJS 的高效数据流处理

## 注意事项

1. **序列化限制**: 传输的数据必须是可序列化的（JSON 安全）
2. **内存管理**: 记得取消未使用的订阅以避免内存泄漏
3. **错误处理**: 主进程中的错误会自动传播到渲染进程
4. **安全性**: 确保在生产环境中禁用 Node.js 集成
5. **上下文访问**: 在过程中使用 `this` 关键字访问上下文

## 下一步

- 根据项目需求添加更多 API 路由
- 实现更复杂的数据流操作
- 添加自定义上下文支持
- 优化性能和错误处理
