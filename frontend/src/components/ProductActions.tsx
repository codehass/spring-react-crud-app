import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

function ProductActions({
	id,
	onDelete,
}: {
	id: number;
	onDelete: (id: number) => void;
}) {
	return (
		<>
			<div className="flex justify-end gap-2">
				<Link
					to={`/products/${id}`}
					className="group p-2 rounded-md bg-gray-100 hover:bg-blue-100 transition"
					title="View"
				>
					<Eye
						size={18}
						className="text-blue-600 group-hover:text-blue-800 transition"
					/>
				</Link>
				<Link
					to={`/products/${id}/edit`}
					className="group p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
					title="Edit"
				>
					<Pencil
						size={18}
						className="text-gray-600 group-hover:text-gray-800 transition"
					/>
				</Link>
				<button
					onClick={() => onDelete(id)}
					className="group p-2 rounded-md bg-gray-100 hover:bg-red-100 transition"
					title="Delete"
				>
					<Trash2
						size={18}
						className="text-red-500 group-hover:text-red-700 transition"
					/>
				</button>
			</div>
		</>
	);
}

export default ProductActions;
