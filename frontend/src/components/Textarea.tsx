import clsx from "clsx";
import React from "react";
import type { TextareaProps } from "../types/product";

const Textarea: React.FC<TextareaProps> = ({
	label,
	error,
	handleChange,
	id,
	className,
	...rest
}) => {
	return (
		<div className="mb-6">
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label}
			</label>
			<textarea
				id={id}
				onChange={handleChange}
				className={clsx(
					"mt-1 block w-full rounded-md px-3 py-2 shadow-sm border focus:outline-none focus:ring-1",
					error
						? "border-red-500 focus:border-red-500 focus:ring-red-500"
						: "border-gray-300 focus:border-violet-500 focus:ring-violet-500",
					className
				)}
				{...rest}
			/>
			{error && <p className="text-sm text-red-600 mt-1">{error}</p>}
		</div>
	);
};

export default Textarea;
