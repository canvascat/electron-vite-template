import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalTemplate: React.FC<
	React.PropsWithChildren<{
		title?: ReactNode;
		footer?: ReactNode;
		cancelText?: string;
		okText?: string;
		onCancel?: () => void;
		onOk?: () => void;
		width?: number;
	}>
> = (props) => {
	const {
		title,
		children,
		footer,
		cancelText = "取消",
		okText = "确定",
		onCancel,
		onOk,
		width = 530,
	} = props;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
			
			{/* Modal */}
			<div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-lg w-full mx-4" style={{ width }}>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="text-lg font-semibold text-gray-900 dark:text-white">
						{title || "更新检查"}
					</div>
					<button
						onClick={onCancel}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
								fill="currentColor"
							></path>
						</svg>
					</button>
				</div>
				
				{/* Body */}
				<div className="p-6">
					{children}
				</div>
				
				{/* Footer */}
				{typeof footer !== "undefined" ? (
					<div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
						<button
							onClick={onCancel}
							className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
						>
							{cancelText}
						</button>
						<button
							onClick={onOk}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
						>
							{okText}
						</button>
					</div>
				) : (
					footer
				)}
			</div>
		</div>
	);
};

const Modal = (
	props: Parameters<typeof ModalTemplate>[0] & { open: boolean },
) => {
	const { open, ...omit } = props;

	return createPortal(open ? ModalTemplate(omit) : null, document.body);
};

export default Modal;
