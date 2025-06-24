// src/types/product.ts
export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	quantity: number;
}

export interface NewProduct {
	name: string;
	price: number;
	description: string;
	quantity: number;
}

export interface AuthUser {
	avatar?: string;
	name?: string;
}

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	isLoading?: boolean;
}

export interface ErrorMessageProps {
	message: string;
	actionText: string;
	actionLink: string;
}

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	error?: string;
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
