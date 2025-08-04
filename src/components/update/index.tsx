import Modal from "@/components/update/Modal";
import Progress from "@/components/update/Progress";
import type { ProgressInfo } from "electron-updater";
import { useCallback, useEffect, useState } from "react";

const Update = () => {
	const [checking, setChecking] = useState(false);
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [versionInfo, setVersionInfo] = useState<VersionInfo>();
	const [updateError, setUpdateError] = useState<ErrorType>();
	const [progressInfo, setProgressInfo] = useState<Partial<ProgressInfo>>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalBtn, setModalBtn] = useState<{
		cancelText?: string;
		okText?: string;
		onCancel?: () => void;
		onOk?: () => void;
	}>({
		onCancel: () => setModalOpen(false),
		onOk: () => window.electron.ipcRenderer.invoke("start-download"),
	});

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
				setModalBtn((state) => ({
					...state,
					cancelText: "取消",
					okText: "更新",
					onOk: () => window.electron.ipcRenderer.invoke("start-download"),
				}));
				setUpdateAvailable(true);
			} else {
				setUpdateAvailable(false);
			}
		},
		[],
	);

	const onUpdateError = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
		setUpdateAvailable(false);
		setUpdateError(arg1);
	}, []);

	const onDownloadProgress = useCallback(
		(_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
			setProgressInfo(arg1);
		},
		[],
	);

	const onUpdateDownloaded = useCallback((_event: Electron.IpcRendererEvent, ...args: any[]) => {
		setProgressInfo({ percent: 100 });
		setModalBtn((state) => ({
			...state,
			cancelText: "稍后",
			okText: "立即安装",
			onOk: () => window.electron.ipcRenderer.invoke("quit-and-install"),
		}));
	}, []);

	useEffect(() => {
		// Get version information and whether to update
		window.electron.ipcRenderer.on("update-can-available", onUpdateCanAvailable);
		window.electron.ipcRenderer.on("update-error", onUpdateError);
		window.electron.ipcRenderer.on("download-progress", onDownloadProgress);
		window.electron.ipcRenderer.on("update-downloaded", onUpdateDownloaded);

		return () => {
			window.electron.ipcRenderer.off("update-can-available", onUpdateCanAvailable);
			window.electron.ipcRenderer.off("update-error", onUpdateError);
			window.electron.ipcRenderer.off("download-progress", onDownloadProgress);
			window.electron.ipcRenderer.off("update-downloaded", onUpdateDownloaded);
		};
	}, []);

	return (
		<>
			<Modal
				open={modalOpen}
				cancelText={modalBtn?.cancelText}
				okText={modalBtn?.okText}
				onCancel={modalBtn?.onCancel}
				onOk={modalBtn?.onOk}
				footer={updateAvailable ? /* hide footer */ null : undefined}
			>
				<div className="space-y-6">
					{updateError ? (
						<div className="text-center">
							<div className="mb-4">
								<div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-red-600 dark:text-red-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									下载最新版本时出错
								</h3>
								<p className="text-red-600 dark:text-red-400 text-sm">{updateError.message}</p>
							</div>
						</div>
					) : updateAvailable ? (
						<div className="space-y-6">
							<div className="text-center">
								<div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-green-600 dark:text-green-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									发现新版本
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									最新版本: v{versionInfo?.newVersion}
								</p>
							</div>

							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										版本更新
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										v{versionInfo?.version} → v{versionInfo?.newVersion}
									</span>
								</div>
								<Progress percent={progressInfo?.percent} />
							</div>
						</div>
					) : (
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								当前已是最新版本
							</h3>
							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-left">
								<pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto">
									{JSON.stringify(versionInfo ?? {}, null, 2)}
								</pre>
							</div>
						</div>
					)}
				</div>
			</Modal>
			<button
				disabled={checking}
				onClick={checkUpdate}
				className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
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
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
			</button>
		</>
	);
};

export default Update;
