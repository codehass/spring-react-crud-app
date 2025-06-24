import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

function HomePage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && user) {
			navigate("/products");
		}
	}, [user, loading, navigate]);

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-violet-100 px-4 text-center">
			<div className="max-w-xl">
				<h1 className="text-4xl md:text-5xl font-extrabold text-violet-700 mb-4">
					Welcome to ProductPilot
				</h1>
				<p className="text-gray-600 text-lg mb-8">
					Track, manage, and grow your product inventory with ease.
				</p>
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
					<p className="text-gray-700 text-lg">Login to see the content</p>
					<a
						href="/login"
						className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-6 rounded shadow transition duration-300"
					>
						Go to Login
					</a>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
