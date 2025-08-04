import UpdateElectron from "@/components/update";
import { useState } from "react";
import logoElectron from "./assets/logo-electron.svg";
import logoVite from "./assets/logo-vite.svg";

function App() {
	const [count, setCount] = useState(0);
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="relative inline-block mb-8">
						<div className="flex items-center justify-center space-x-4">
							<div className="relative group">
								<img
									src={logoVite}
									className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
									alt="Vite logo"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
							</div>
							<div className="text-2xl font-bold text-gray-400">+</div>
							<div className="relative group">
								<img
									src={logoElectron}
									className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-spin-slow"
									alt="Electron logo"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
							</div>
						</div>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
						Electron + Vite + React
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						现代化的桌面应用开发框架，结合了 Electron 的强大功能和 Vite 的快速开发体验
					</p>
				</div>

				{/* Main Content Card */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
					<div className="text-center">
						<div className="mb-6">
							<button
								onClick={() => setCount((count) => count + 1)}
								className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
							>
								<span className="mr-2">🎯</span>
								点击次数: {count}
							</button>
						</div>

						<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
							<p className="text-gray-700 dark:text-gray-300">
								编辑{" "}
								<code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
									src/App.tsx
								</code>{" "}
								并保存以测试热重载
							</p>
						</div>

						<div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
							<span>点击 Electron + Vite 图标了解更多</span>
						</div>
					</div>
				</div>

				{/* Static Files Section */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
					<div className="flex items-center justify-center space-x-4">
						<span className="text-gray-600 dark:text-gray-300">
							将静态文件放入{" "}
							<code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm font-mono">
								/public
							</code>{" "}
							文件夹
						</span>
						<img
							style={{ width: "3em" }}
							src="./node.svg"
							alt="Node logo"
							className="transition-transform hover:scale-110"
						/>
					</div>
				</div>

				{/* Update Component */}
				<div className="mt-8">
					<UpdateElectron />
				</div>
			</div>
		</div>
	);
}

export default App;
