import { LogOut, Moon, Package, User } from "lucide-react";
import { Link, Outlet } from "react-router";

function AppLayout() {
	const user = {
		avatar: "",
	};

	return (
		<div className="flex h-screen w-full bg-gray-200">
			{/* Sidebar */}
			<aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
				<div>
					<div className="text-2xl font-bold mb-8">Logo</div>

					<nav className="flex flex-col gap-4">
						<Link
							to="/products"
							className="flex items-center gap-3 hover:text-gray-300"
						>
							<Package size={20} />
							<span>Products</span>
						</Link>
					</nav>
				</div>
			</aside>

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Top navbar */}
				<header className="flex gap-4 items-center justify-end bg-white h-16 px-6 shadow">
					{user && user.avatar ? (
						<img
							src={user.avatar}
							alt="User avatar"
							className="w-10 h-10 rounded-full object-cover"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-violet-700">
							<User />
						</div>
					)}
					<Link to="/logout">
						<Moon size={20} color="	#7F00FF" />
					</Link>
					<Link to="/logout">
						<LogOut size={20} color="	#7F00FF" />
					</Link>
				</header>

				{/* Page content */}
				<main className="flex-1 overflow-y-auto m-6 rounded-md border border-gray-300 bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
