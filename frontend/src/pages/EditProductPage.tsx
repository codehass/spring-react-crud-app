import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	quantity: number;
}

function EditProductPage() {
	const { productId } = useParams<{ productId: string }>();
	const navigate = useNavigate();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
						`Failed to load product: ${response.status} ${response.statusText}`
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product) return;

		setIsSubmitting(true);

		try {
			const response = await fetch(
				`http://localhost:8080/api/v1/products/${product.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(product),
				}
			);

			if (!response.ok) {
				throw new Error(
					`Update failed: ${response.status} ${response.statusText}`
				);
			}

			navigate(`/products/${product.id}`, {
				state: { message: "Product updated successfully" },
			});
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Failed to update product");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!product) return;

		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: name === "price" || name === "quantity" ? Number(value) : value,
		});
	};

	const handleCancel = () => {
		navigate(`/products/${productId}`);
	};

	if (loading) {
		return <div>Loading product details...</div>;
	}

	if (error) {
		return <div style={{ color: "red" }}>Error: {error}</div>;
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div>
			<header>
				<h1>Edit Product</h1>
			</header>

			<main>
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "1rem" }}>
						<label
							htmlFor="name"
							style={{ display: "block", marginBottom: "0.5rem" }}
						>
							Name:
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={product.name}
							onChange={handleChange}
							required
							style={{ width: "100%", padding: "0.5rem" }}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							htmlFor="price"
							style={{ display: "block", marginBottom: "0.5rem" }}
						>
							Price:
						</label>
						<input
							id="price"
							type="number"
							name="price"
							value={product.price}
							onChange={handleChange}
							min="0"
							step="0.01"
							required
							style={{ width: "100%", padding: "0.5rem" }}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							htmlFor="quantity"
							style={{ display: "block", marginBottom: "0.5rem" }}
						>
							Quantity:
						</label>
						<input
							id="quantity"
							type="number"
							name="quantity"
							value={product.quantity}
							onChange={handleChange}
							min="0"
							required
							style={{ width: "100%", padding: "0.5rem" }}
						/>
					</div>

					<div style={{ marginBottom: "1rem" }}>
						<label
							htmlFor="description"
							style={{ display: "block", marginBottom: "0.5rem" }}
						>
							Description:
						</label>
						<textarea
							id="description"
							name="description"
							value={product.description}
							onChange={handleChange}
							rows={4}
							style={{ width: "100%", padding: "0.5rem" }}
						/>
					</div>

					<div style={{ display: "flex", gap: "1rem" }}>
						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save"}
						</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default EditProductPage;
