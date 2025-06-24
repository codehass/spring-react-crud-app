import { LogOut, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { useAuth } from "../hooks/useAuth";
import type { AuthUser } from "./types/product";

function AppLayout() {
	const navigate = useNavigate();
	const { user } = useAuth() as {
		user: AuthUser | null;
	};

	const firstName = user?.name ? user.name.split(" ")[0] : "User";

	const handleLogout = async () => {
		try {
			await fetch("http://localhost:8080/logout", {
				method: "POST",
				credentials: "include",
			});
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			navigate("/login");
		}
	};

	return (
		<div className="flex flex-col md:flex-row h-screen w-full bg-gray-200">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Top navbar */}
				<header className="flex items-center justify-end bg-white h-16 px-4 md:px-6 shadow">
					<div className="flex items-center gap-3">
						<p>hi, {firstName}</p>

						{user?.avatar ? (
							<img
								src={user.avatar}
								className="w-10 h-10 rounded-full object-cover"
								alt="User Avatar"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-violet-700">
								<User />
							</div>
						)}

						<button
							onClick={handleLogout}
							className="p-2 rounded hover:bg-gray-100 transition"
							aria-label="Logout"
						>
							<LogOut size={20} color="#7F00FF" />
						</button>
					</div>
				</header>

				{/* Page content */}
				<main className="flex-1 overflow-y-auto m-4 sm:m-6 rounded-md border border-gray-300 bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
