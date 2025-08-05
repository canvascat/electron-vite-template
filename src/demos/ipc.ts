import tipc from "@/lib/tipc";

// 示例：使用tipc-electron进行IPC通信
export async function demoIPC() {
	try {
		// 1. 获取系统信息
		const systemInfo = await tipc.system.getInfo.invoke();
		console.log("系统信息:", systemInfo);

		// 2. 获取应用信息
		const appInfo = await tipc.system.getAppInfo.invoke();
		console.log("应用信息:", appInfo);

		// 3. 获取窗口信息
		const windowInfo = await tipc.window.getInfo.invoke();
		console.log("窗口信息:", windowInfo);

		// 4. 日志功能
		tipc.logger.info.emit("应用启动成功");
		tipc.logger.warn.emit("这是一个警告消息");

		// 5. 计数器功能
		const currentCount = await tipc.counter.get.invoke();
		console.log("当前计数器值:", currentCount);

		// 6. 订阅计数器变化
		const unsubscribe = tipc.counter.subscribe.subscribe((count) => {
			console.log("计数器变化:", count);
		});

		// 7. 操作计数器
		await tipc.counter.increment.invoke();
		await tipc.counter.increment.invoke();
		await tipc.counter.decrement.invoke();

		// 8. 重置计数器
		tipc.counter.reset.emit();

		// 清理订阅
		setTimeout(() => {
			unsubscribe();
			console.log("已取消订阅");
		}, 5000);
	} catch (error) {
		console.error("IPC通信错误:", error);
		tipc.logger.error.emit(`IPC通信错误: ${error}`);
	}
}

// 窗口控制示例
export async function demoWindowControl() {
	try {
		// 获取窗口信息
		const info = await tipc.window.getInfo.invoke();
		console.log("当前窗口信息:", info);

		// 最大化窗口
		tipc.window.maximize.emit();

		// 等待一秒后最小化
		setTimeout(() => {
			tipc.window.minimize.emit();
		}, 1000);
	} catch (error) {
		console.error("窗口控制错误:", error);
	}
}
