import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress as ProgressUI } from "@/components/ui/progress";
import type { ProgressInfo } from "electron-updater";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const Update = () => {
	const [checking, setChecking] = useState(false);
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [versionInfo, setVersionInfo] = useState<VersionInfo>();
	const [updateError, setUpdateError] = useState<ErrorType>();
	const [progressInfo, setProgressInfo] = useState<Partial<ProgressInfo>>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const checkUpdate = async () => {
		setChecking(true);
		/**
		 * @type {import('electron-updater').UpdateCheckResult | null | { message: string, error: Error }}
		 */
		const result = await window.electron.ipcRenderer.invoke("check-update");
		setProgressInfo({ percent: 0 });
		setChecking(false);
		setModalOpen(true);
		if (result?.error) {
			setUpdateAvailable(false);
			setUpdateError(result?.error);
		}
	};

	const onUpdateCanAvailable = useCallback(
		(_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
			setVersionInfo(arg1);
			setUpdateError(undefined);
			// Can be update
			if (arg1.update) {
				setUpdateAvailable(true);
			} else {
				setUpdateAvailable(false);
			}
		},
		[],
	);

	const onUpdateError = useCallback(
		(_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
			setUpdateAvailable(false);
			setUpdateError(arg1);
		},
		[],
	);

	const onDownloadProgress = useCallback(
		(_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
			setProgressInfo(arg1);
		},
		[],
	);

	const onUpdateDownloaded = useCallback(
		(_event: Electron.IpcRendererEvent, ...args: any[]) => {
			setProgressInfo({ percent: 100 });
		},
		[],
	);

	useEffect(() => {
		// Get version information and whether to update
		window.electron.ipcRenderer.on(
			"update-can-available",
			onUpdateCanAvailable,
		);
		window.electron.ipcRenderer.on("update-error", onUpdateError);
		window.electron.ipcRenderer.on("download-progress", onDownloadProgress);
		window.electron.ipcRenderer.on("update-downloaded", onUpdateDownloaded);

		return () => {
			window.electron.ipcRenderer.off(
				"update-can-available",
				onUpdateCanAvailable,
			);
			window.electron.ipcRenderer.off("update-error", onUpdateError);
			window.electron.ipcRenderer.off("download-progress", onDownloadProgress);
			window.electron.ipcRenderer.off("update-downloaded", onUpdateDownloaded);
		};
	}, []);

	const handleStartDownload = () => {
		window.electron.ipcRenderer.invoke("start-download");
	};

	const handleInstallNow = () => {
		window.electron.ipcRenderer.invoke("quit-and-install");
	};

	return (
		<>
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>更新检查</DialogTitle>
						<DialogDescription>
							{updateError
								? "检查更新时发生错误"
								: updateAvailable
									? "发现新版本可用"
									: "当前已是最新版本"}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						{updateError ? (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{updateError.message}</AlertDescription>
							</Alert>
						) : updateAvailable ? (
							<div className="space-y-4">
								<Alert>
									<CheckCircle className="h-4 w-4" />
									<AlertDescription>
										最新版本: v{versionInfo?.newVersion}
									</AlertDescription>
								</Alert>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>版本更新</span>
										<span className="text-muted-foreground">
											v{versionInfo?.version} → v{versionInfo?.newVersion}
										</span>
									</div>
									<ProgressUI
										value={progressInfo?.percent}
										className="w-full"
									/>
									<div className="text-right text-sm text-muted-foreground">
										{Math.min(progressInfo?.percent || 0, 100).toFixed(1)}%
									</div>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<Alert>
									<Info className="h-4 w-4" />
									<AlertDescription>当前已是最新版本</AlertDescription>
								</Alert>

								<div className="bg-muted rounded-lg p-4">
									<pre className="text-xs overflow-auto">
										{JSON.stringify(versionInfo ?? {}, null, 2)}
									</pre>
								</div>
							</div>
						)}
					</div>

					<DialogFooter>
						{updateAvailable ? (
							<>
								<Button variant="outline" onClick={() => setModalOpen(false)}>
									取消
								</Button>
								{progressInfo?.percent === 100 ? (
									<Button onClick={handleInstallNow}>立即安装</Button>
								) : (
									<Button onClick={handleStartDownload}>开始更新</Button>
								)}
							</>
						) : (
							<Button onClick={() => setModalOpen(false)}>确定</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Button
				disabled={checking}
				onClick={checkUpdate}
				variant="default"
				size="lg"
				className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
			>
				{checking ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						检查中...
					</>
				) : (
					<>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						检查更新
					</>
				)}
			</Button>
		</>
	);
};

export default Update;
