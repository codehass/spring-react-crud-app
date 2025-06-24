import GitHubIcon from "../components/icons/GitHubIcon";
import GoogleIcon from "../components/icons/GoogleIcon";

const LoginPage = () => {
	const redirectTo = (provider: "github" | "google") => {
		window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white px-4">
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-violet-600">
				<h2 className="text-3xl font-bold text-violet-600 mb-8 text-center">
					Login
				</h2>

				<button
					onClick={() => redirectTo("github")}
					className="w-full mb-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition flex items-center justify-center gap-2"
					aria-label="Login with GitHub"
				>
					<GitHubIcon />
					Login with GitHub
				</button>

				<button
					onClick={() => redirectTo("google")}
					className="w-full py-3 bg-white border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 transition flex items-center justify-center gap-2"
					aria-label="Login with Google"
				>
					<GoogleIcon />
					Login with Google
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
