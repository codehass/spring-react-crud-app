import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function PageHeader({ title }: { title: string }) {
	const navigate = useNavigate();

	return (
		<header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
			<button
				onClick={() => navigate("/products")}
				className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition"
			>
				<ArrowLeft size={16} />
				<span>Back</span>
			</button>

			<h2 className="text-2xl font-bold text-gray-800">{title}</h2>
		</header>
	);
}

export default PageHeader;
