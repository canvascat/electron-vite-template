import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import tipc from "@/lib/tipc";
import { useCallback, useEffect, useState } from "react";

export function TipcDemo() {
	const [counter, setCounter] = useState(0);
	const [systemInfo, setSystemInfo] = useState<any>(null);
	const [windowInfo, setWindowInfo] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	// 获取系统信息
	const getSystemInfo = useCallback(async () => {
		try {
			setLoading(true);
			const info = await tipc.system.getInfo.invoke();
			setSystemInfo(info);
			tipc.logger.info.emit("成功获取系统信息");
		} catch (error) {
			console.error("获取系统信息失败:", error);
			tipc.logger.error.emit(`获取系统信息失败: ${error}`);
		} finally {
			setLoading(false);
		}
	}, []);

	// 获取窗口信息
	const getWindowInfo = useCallback(async () => {
		try {
			const info = await tipc.window.getInfo.invoke();
			setWindowInfo(info);
		} catch (error) {
			console.error("获取窗口信息失败:", error);
		}
	}, []);

	// 窗口控制
	const handleMaximize = useCallback(() => {
		tipc.window.maximize.emit();
	}, []);

	const handleMinimize = useCallback(() => {
		tipc.window.minimize.emit();
	}, []);

	// 计数器操作
	const handleIncrement = useCallback(async () => {
		try {
			const newValue = await tipc.counter.increment.invoke();
			setCounter(newValue);
		} catch (error) {
			console.error("增加计数器失败:", error);
		}
	}, []);

	const handleDecrement = useCallback(async () => {
		try {
			const newValue = await tipc.counter.decrement.invoke();
			setCounter(newValue);
		} catch (error) {
			console.error("减少计数器失败:", error);
		}
	}, []);

	const handleReset = useCallback(() => {
		tipc.counter.reset.emit();
		setCounter(0);
	}, []);

	// 订阅计数器变化
	useEffect(() => {
		const unsubscribe = tipc.counter.subscribe.subscribe((count) => {
			setCounter(count);
		});

		// 获取初始值
		tipc.counter.get.invoke().then(setCounter);

		return () => {
			unsubscribe();
		};
	}, []);

	// 组件挂载时获取信息
	useEffect(() => {
		getSystemInfo();
		getWindowInfo();
	}, [getSystemInfo, getWindowInfo]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>tipc-electron 演示</CardTitle>
				<CardDescription>展示类型安全的IPC通信功能</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* 计数器部分 */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">实时计数器</h3>
					<div className="flex items-center gap-4">
						<Badge variant="secondary" className="text-lg">
							当前值: {counter}
						</Badge>
						<div className="flex gap-2">
							<Button onClick={handleIncrement} size="sm">
								增加
							</Button>
							<Button onClick={handleDecrement} size="sm">
								减少
							</Button>
							<Button onClick={handleReset} variant="outline" size="sm">
								重置
							</Button>
						</div>
					</div>
				</div>

				{/* 窗口控制部分 */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">窗口控制</h3>
					<div className="flex gap-2">
						<Button onClick={handleMaximize} size="sm">
							最大化
						</Button>
						<Button onClick={handleMinimize} size="sm">
							最小化
						</Button>
						<Button
							onClick={() => tipc.window.close.emit()}
							variant="destructive"
							size="sm"
						>
							关闭窗口
						</Button>
					</div>
				</div>

				{/* 系统信息部分 */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">系统信息</h3>
					<Button onClick={getSystemInfo} disabled={loading} size="sm">
						{loading ? "加载中..." : "刷新系统信息"}
					</Button>
					{systemInfo && (
						<div className="text-sm space-y-1">
							<p>平台: {systemInfo.platform}</p>
							<p>架构: {systemInfo.arch}</p>
							<p>版本: {systemInfo.version}</p>
							<p>CPU核心数: {systemInfo.cpus}</p>
							<p>
								内存: {Math.round(systemInfo.memory.free / 1024 / 1024 / 1024)}
								GB / {Math.round(systemInfo.memory.total / 1024 / 1024 / 1024)}
								GB
							</p>
						</div>
					)}
				</div>

				{/* 窗口信息部分 */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">窗口信息</h3>
					<Button onClick={getWindowInfo} size="sm">
						刷新窗口信息
					</Button>
					{windowInfo && (
						<div className="text-sm space-y-1">
							<p>窗口ID: {windowInfo.id}</p>
							<p>
								位置: ({windowInfo.bounds?.x}, {windowInfo.bounds?.y})
							</p>
							<p>
								大小: {windowInfo.bounds?.width} x {windowInfo.bounds?.height}
							</p>
							<p>最大化: {windowInfo.isMaximized ? "是" : "否"}</p>
							<p>最小化: {windowInfo.isMinimized ? "是" : "否"}</p>
						</div>
					)}
				</div>

				{/* 日志测试部分 */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">日志测试</h3>
					<div className="flex gap-2">
						<Button
							onClick={() => tipc.logger.info.emit("这是一条信息日志")}
							size="sm"
						>
							信息日志
						</Button>
						<Button
							onClick={() => tipc.logger.warn.emit("这是一条警告日志")}
							variant="outline"
							size="sm"
						>
							警告日志
						</Button>
						<Button
							onClick={() => tipc.logger.error.emit("这是一条错误日志")}
							variant="destructive"
							size="sm"
						>
							错误日志
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
