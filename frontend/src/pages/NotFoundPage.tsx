import { Link } from "react-router";

function NotFoundPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
			<h1 className="text-6xl font-extrabold text-violet-600 mb-4">404</h1>
			<h2 className="text-2xl font-semibold mb-2 text-gray-800">
				Page Not Found
			</h2>
			<p className="text-gray-600 mb-6 max-w-md">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Link
				to="/"
				className="inline-block px-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
			>
				Go back to Homepage
			</Link>
		</div>
	);
}

export default NotFoundPage;
