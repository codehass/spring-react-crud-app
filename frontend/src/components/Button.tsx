// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	isLoading = false,
	className,
	...props
}) => {
	const baseStyles =
		"px-4 py-2 rounded-md text-sm font-medium focus:outline-none transition";

	const variants = {
		primary: "bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50",
		secondary: "border border-gray-300 hover:bg-gray-100 text-gray-800",
	};

	return (
		<button
			className={clsx(baseStyles, variants[variant], className)}
			disabled={props.disabled || isLoading}
			{...props}
		>
			{isLoading ? "Loading..." : children}
		</button>
	);
};

export default Button;
