import React from "react";

const Progress: React.FC<
	React.PropsWithChildren<{
		percent?: number;
	}>
> = (props) => {
	const { percent = 0 } = props;

	return (
		<div className="flex items-center space-x-4">
			<div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
					style={{ width: `${Math.min(percent, 100)}%` }}
				/>
			</div>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-right">
				{Math.min(percent, 100).toFixed(1)}%
			</span>
		</div>
	);
};

export default Progress;
