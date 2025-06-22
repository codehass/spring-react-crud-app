import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Button from "../components/Button";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	quantity: number;
}

function ProductDetailsPage() {
	const { productId } = useParams<{ productId: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!productId) {
			setError("Product ID is missing");
			setLoading(false);
			return;
		}

		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/products/${productId}`
				);

				if (!response.ok) {
					throw new Error(
						`Failed to fetch product: ${response.status} ${response.statusText}`
					);
				}

				const data: Product = await response.json();
				setProduct(data);
			} catch (err: unknown) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (loading) {
		return <div>Loading product details...</div>;
	}

	if (error) {
		return <div className="text-red-600">Error: {error}</div>;
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="max-w-xl mx-auto p-6">
			<header className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">{product.name}</h1>
				<Link to={`/products/${product.id}/edit`}>
					<Button>Edit Product</Button>
				</Link>
			</header>

			<main className="space-y-4">
				<section>
					<h2 className="text-xl font-semibold mb-2">Product Information</h2>
					<p>
						<strong>Description:</strong> {product.description || "N/A"}
					</p>
					<p>
						<strong>Price:</strong> ${product.price.toFixed(2)}
					</p>
					<p>
						<strong>In Stock:</strong> {product.quantity}
					</p>
				</section>
			</main>

			<footer className="mt-6">
				<Link to="/products" className="text-violet-600 hover:underline">
					Back to Products
				</Link>
			</footer>
		</div>
	);
}

export default ProductDetailsPage;
