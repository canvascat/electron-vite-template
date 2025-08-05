import { BrowserWindow } from "electron";
import { BehaviorSubject } from "rxjs";
import { procedure } from "../tipc";

// 定义数据状态
const counter$ = new BehaviorSubject(0);

// 定义API路由
const functions = {
	// 窗口管理
	window: {
		// 打开新窗口
		open: procedure.handle(async (arg: string) => {
			const childWindow = new BrowserWindow({
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
				},
			});

			// 这里需要根据实际环境加载URL
			// 简化处理，实际使用时需要根据开发/生产环境调整
			childWindow.loadURL(`http://localhost:7777/#${arg}`);
			return { success: true, windowId: childWindow.id };
		}),

		// 获取窗口信息
		getInfo: procedure.handle(function () {
			const window = BrowserWindow.fromId(this.senderId);
			return {
				id: this.senderId,
				bounds: window?.getBounds(),
				isMaximized: window?.isMaximized(),
				isMinimized: window?.isMinimized(),
			};
		}),

		// 最大化窗口
		maximize: procedure.on(function () {
			const window = BrowserWindow.fromId(this.senderId);
			window?.maximize();
		}),

		// 最小化窗口
		minimize: procedure.on(function () {
			const window = BrowserWindow.fromId(this.senderId);
			window?.minimize();
		}),

		// 关闭窗口
		close: procedure.on(function () {
			const window = BrowserWindow.fromId(this.senderId);
			window?.close();
		}),
	},

	// 日志功能
	logger: {
		info: procedure.on((message: string) => {
			console.log(`[INFO] ${message}`);
		}),

		error: procedure.on((error: string) => {
			console.error(`[ERROR] ${error}`);
		}),

		warn: procedure.on((warning: string) => {
			console.warn(`[WARN] ${warning}`);
		}),
	},

	// 计数器示例（实时数据流）
	counter: {
		// 订阅计数器变化
		subscribe: procedure.subscription(() => counter$),

		// 获取当前值
		get: procedure.handle(() => {
			return counter$.value;
		}),

		// 增加计数器
		increment: procedure.handle(() => {
			const current = counter$.value;
			counter$.next(current + 1);
			return current + 1;
		}),

		// 减少计数器
		decrement: procedure.handle(() => {
			const current = counter$.value;
			counter$.next(current - 1);
			return current - 1;
		}),

		// 重置计数器
		reset: procedure.on(() => {
			counter$.next(0);
		}),

		// 设置计数器值
		set: procedure.handle((value: number) => {
			counter$.next(value);
			return value;
		}),
	},

	// 系统信息
	system: {
		// 获取系统信息
		getInfo: procedure.handle(async () => {
			const os = await import("node:os");
			return {
				platform: os.platform(),
				arch: os.arch(),
				version: os.release(),
				cpus: os.cpus().length,
				memory: {
					total: os.totalmem(),
					free: os.freemem(),
				},
			};
		}),

		// 获取应用信息
		getAppInfo: procedure.handle(() => {
			const { app } = require("electron");
			return {
				name: app.getName(),
				version: app.getVersion(),
				path: app.getAppPath(),
			};
		}),
	},
};

export type Functions = typeof functions;

export default functions;
