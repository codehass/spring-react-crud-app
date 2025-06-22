import { Eye, Image, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
		return <div>Loading products...</div>;
	}

	if (error) {
		return <div style={{ color: "red" }}>Error: {error}</div>;
	}

	if (products.length === 0) {
		return <div>No products available</div>;
	}

	return (
		<>
			{" "}
			<header className="flex justify-between items-center m-4">
				<h2 className="text-lg font-semibold">Product Catalog</h2>
				<Link to="/products/new">
					<button className="flex gap-2 bg-violet-700 text-white px-3 py-2 rounded hover:bg-violet-500">
						<Plus />
						Add New Product
					</button>
				</Link>
			</header>
			<ul>
				<div className="grid grid-cols-5 gap-4 font-medium text-gray-600 mb-2 p-2 border border-gray-200">
					<p>Name</p>
					<p>Price</p>
					<p>Quantity</p>
					<p>Description</p>
					<p>Actions</p>
				</div>

				{products.map((product) => (
					<li
						key={product.id}
						className="bg-white py-4 px-7 rounded shadow flex items-center justify-between hover:bg-gray-50 transition border-b border-gray-200"
					>
						{/* Product Details */}
						<div className="flex-1 grid grid-cols-5 gap-4">
							<div className="flex items-center gap-4">
								<Image color="gray" />
								<p className="font-medium">{product.name}</p>
							</div>
							<p>${product.price.toFixed(2)}</p>
							<p>{product.quantity}</p>
							<p className="text-gray-500 truncate">{product.description}</p>
							{/* Action Buttons */}
							<div className="flex justify-end gap-4">
								<Link
									to={`/products/${product.id}`}
									className="text-blue-600 hover:text-blue-800"
									title="View"
								>
									<Eye size={20} />
								</Link>
								<Link
									to={`/products/${product.id}/edit`}
									className="text-green-600 hover:text-green-800"
									title="Edit"
								>
									<Pencil size={20} />
								</Link>
								<button
									// onClick={() => handleDelete(product.id)}
									className="text-red-600 hover:text-red-800"
									title="Delete"
								>
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default ProductDetails;
