import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../components/Spinner";
import PageHeader from "../components/PageHeader";
import { Pencil } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";
import type { Product } from "../types/product";
import { endpoints } from "../lib/api";

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
				const response = await fetch(endpoints.products.getById(productId), {
					credentials: "include",
				});

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

	return (
		<div className="max-w-2xl mx-auto p-6">
			<PageHeader title={`Product: ${product?.name}`} />

			<div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
				<h2 className="text-xl font-semibold text-violet-700 mb-4">
					Product Information
				</h2>

				<div className="space-y-3 text-gray-700">
					<div>
						<span className="font-semibold">Name:</span>{" "}
						<span>{product?.name}</span>
					</div>
					<div>
						<span className="font-semibold">Description:</span>{" "}
						<span>{product?.description || "N/A"}</span>
					</div>
					<div>
						<span className="font-semibold">Price:</span>{" "}
						<span>${product?.price.toFixed(2)}</span>
					</div>
					<div>
						<span className="font-semibold">Quantity in stock:</span>{" "}
						<span>{product?.quantity}</span>
					</div>
				</div>

				<div className="mt-6 flex gap-4">
					<Link
						to={`/products/${product?.id}/edit`}
						className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
					>
						<Pencil size={16} />
						Edit
					</Link>
					<Link
						to="/products"
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-700"
					>
						Back to Products
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailsPage;
