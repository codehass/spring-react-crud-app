import { Package, Menu } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Mobile menu button */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 bg-violet-600 text-white p-2 rounded-md shadow-md"
				onClick={() => setIsOpen(!isOpen)}
			>
				<Menu />
			</button>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-md p-4 flex flex-col justify-between z-40 transition-transform transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:static md:flex`}
			>
				<div>
					<div className="text-2xl font-bold text-violet-700 mb-10 mt-12 md:mt-0">
						Dashboard
					</div>

					<nav className="flex flex-col gap-4 text-gray-700">
						<Link
							to="/products"
							className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-violet-50 hover:text-violet-700 transition"
							onClick={() => setIsOpen(false)}
						>
							<Package size={20} />
							<span>Products</span>
						</Link>
					</nav>
				</div>

				<div className="text-sm text-gray-400 text-center mt-10 hidden md:block">
					© {new Date().getFullYear()} Dashboard
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
