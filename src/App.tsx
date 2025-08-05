import { TipcDemo } from "@/demos/TipcDemo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import UpdateElectron from "@/components/update";
import { useState } from "react";
import logoElectron from "./assets/logo-electron.svg";
import logoVite from "./assets/logo-vite.svg";

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center space-x-4 mb-8">
						<img src={logoVite} className="h-16 w-16" alt="Vite logo" />
						<div className="text-2xl font-bold text-muted-foreground">+</div>
						<img src={logoElectron} className="h-16 w-16" alt="Electron logo" />
					</div>

					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Electron + Vite + React
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
						现代化的桌面应用开发框架，结合了 Electron 的强大功能和 Vite
						的快速开发体验
					</p>

					{/* Technology Stack Badges */}
					<div className="flex flex-wrap justify-center gap-2 mb-8">
						<Badge variant="secondary">Electron</Badge>
						<Badge variant="secondary">Vite</Badge>
						<Badge variant="secondary">React 19</Badge>
						<Badge variant="secondary">TypeScript</Badge>
						<Badge variant="secondary">Tailwind CSS</Badge>
						<Badge variant="secondary">shadcn/ui</Badge>
					</div>
				</div>

				{/* Main Content Card */}
				<Card className="mb-8">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">交互演示</CardTitle>
						<CardDescription>点击按钮测试热重载功能</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<div className="mb-6">
							<Button onClick={() => setCount((count) => count + 1)} size="lg">
								<span className="mr-2">🎯</span>
								点击次数: {count}
							</Button>
						</div>

						<div className="bg-muted rounded-lg p-4 mb-6">
							<p className="text-muted-foreground">
								编辑{" "}
								<code className="bg-background px-2 py-1 rounded text-sm font-mono">
									src/App.tsx
								</code>{" "}
								并保存以测试热重载
							</p>
						</div>

						<div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
							<span>点击 Electron + Vite 图标了解更多</span>
						</div>
					</CardContent>
				</Card>

				{/* Static Files Section */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">静态资源</CardTitle>
						<CardDescription>了解如何添加静态文件到项目中</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center space-x-4">
							<span className="text-muted-foreground">
								将静态文件放入{" "}
								<code className="bg-muted px-2 py-1 rounded text-sm font-mono">
									/public
								</code>{" "}
								文件夹
							</span>
							<img style={{ width: "3em" }} src="./node.svg" alt="Node logo" />
						</div>
					</CardContent>
				</Card>

				{/* TIPC Demo Component */}
				<div className="mt-8">
					<TipcDemo />
				</div>

				{/* Update Component */}
				<div className="mt-8 flex justify-center">
					<UpdateElectron />
				</div>
			</div>
		</div>
	);
}

export default App;
