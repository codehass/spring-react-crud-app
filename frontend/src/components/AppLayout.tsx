import { LogOut, Moon, User } from "lucide-react";
import { Link, Outlet } from "react-router";
import Sidebar from "./Sidebar";

function AppLayout() {
	const user = {
		avatar: "",
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
						{user.avatar ? (
							<img
								src={user.avatar}
								className="w-10 h-10 rounded-full object-cover"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-violet-700">
								<User />
							</div>
						)}
						<Link to="/logout">
							<Moon size={20} color="#7F00FF" />
						</Link>
						<Link to="/logout">
							<LogOut size={20} color="#7F00FF" />
						</Link>
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
