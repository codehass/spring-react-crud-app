import { Image, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "./Spinner";
import ProductActions from "./ProductActions";
import ErrorMessage from "./ErrorMessage";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	quantity: number;
}

function ProductDetails() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/v1/products");

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

	if (loading) {
		return (
			<div className="flex justify-center items-center h-full w-full py-20">
				<Spinner />
			</div>
		);
	}

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
									<ProductActions id={product.id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ProductDetails;
