import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	quantity: number;
}

function ProductsListPage() {
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
		<div>
			<header>
				<h1>Product Catalog</h1>
				<Link to="/products/new">
					<button>Add New Product</button>
				</Link>
			</header>

			<main>
				<ul style={{ listStyle: "none", padding: 0 }}>
					{products.map((product) => (
						<li key={product.id} style={{ marginBottom: "1rem" }}>
							<h2>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h2>
							<p>Price: ${product.price.toFixed(2)}</p>
							<p>Stock: {product.quantity}</p>
							<p>{product.description}</p>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export default ProductsListPage;
