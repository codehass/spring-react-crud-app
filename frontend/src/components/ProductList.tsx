import { Image, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "./Spinner";
import ProductActions from "./ProductActions";
import ErrorMessage from "./ErrorMessage";
import ConfirmationModal from "./Confirmation";
import type { Product } from "../types/product";
import { endpoints } from "../lib/api";

function ProductDetails() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [deletingProductId, setDeletingProductId] = useState<number | null>(
		null
	);

	// Function to handle delete action
	const handleDelete = async (id: number) => {
		setDeletingProductId(id);
	};

	const confirmDelete = async () => {
		if (deletingProductId === null) return;
		try {
			const res = await fetch(endpoints.products.delete(deletingProductId), {
				method: "DELETE",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Failed to delete");
			setProducts((prev) => prev.filter((p) => p.id !== deletingProductId));
		} catch (err) {
			console.error(err);
		} finally {
			setDeletingProductId(null);
		}
	};

	// fetch products from the API, handle loading and error states
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(endpoints.products.base, {
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch products: ${response.status} ${response.statusText}`
					);
				}

				const data: Product[] = await response.json();
				setProducts(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Render loading spinner
	if (loading) {
		return (
			<div className="flex justify-center items-center h-full w-full py-20">
				<Spinner />
			</div>
		);
	}

	// Render error message
	if (error) {
		return (
			<ErrorMessage
				message={
					error.includes("404")
						? "The product you're looking for was not found."
						: error
				}
				actionText="Back to Products"
				actionLink="/products"
			/>
		);
	}

	//Render empty state if no product is available
	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center text-center py-16 px-4">
				<h2 className="text-2xl font-semibold text-gray-800 mb-2">
					No Products Yet
				</h2>
				<p className="text-gray-600 mb-6">You haven't added any products.</p>
				<Link
					to="/products/new"
					className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
				>
					Add Your First Product
				</Link>
			</div>
		);
	}

	// Render product list
	return (
		<div className="flex flex-col justify-center items-stretch w-full">
			{" "}
			<header className="flex justify-between items-center m-4">
				<h2 className="text-lg font-semibold">Product Catalog</h2>
				<Link to="/products/new">
					<button className="flex gap-2 bg-violet-700 text-white px-3 py-2 rounded hover:bg-violet-500">
						<Plus />
						Add Product
					</button>
				</Link>
			</header>
			{/* Render product as table */}
			<div className="px-4">
				<table className="text-sm w-full">
					<thead className="text-gray-400 text-left">
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr
								key={product.id}
								className="bg-white hover:bg-gray-50 border-b"
							>
								<td className="flex items-center gap-2 py-4">
									<Image size={18} color="gray" />
									{product.name}
								</td>
								<td>${product.price.toFixed(2)}</td>
								<td>{product.quantity}</td>
								<td className="truncate max-w-xs">{product.description}</td>
								<td className="pr-4">
									{/* Render product actions, view, edit and delete */}
									<ProductActions id={product.id} onDelete={handleDelete} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Render confirmation modal for delete action */}
			<ConfirmationModal
				open={deletingProductId !== null}
				onConfirm={confirmDelete}
				onCancel={() => setDeletingProductId(null)}
			/>
		</div>
	);
}

export default ProductDetails;
