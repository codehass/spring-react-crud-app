import { Link } from "react-router";
import type { ErrorMessageProps } from "../types/product";

function ErrorMessage({ message, actionText, actionLink }: ErrorMessageProps) {
	return (
		<div className="flex flex-col items-center justify-center text-center py-16 px-4">
			<h2 className="text-3xl font-semibold text-red-600 mb-4">Error</h2>
			<p className="text-gray-700 mb-6 max-w-md">{message}</p>
			<Link
				to={actionLink}
				className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
			>
				{actionText}
			</Link>
		</div>
	);
}

export default ErrorMessage;
