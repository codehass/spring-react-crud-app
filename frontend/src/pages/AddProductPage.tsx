import { useState } from "react";
import { useNavigate } from "react-router";

interface NewProduct {
	name: string;
	price: number;
	description: string;
	quantity: number;
}

function AddProductPage() {
	const navigate = useNavigate();
	const [product, setProduct] = useState<NewProduct>({
		name: "",
		price: 0,
		description: "",
		quantity: 0,
	});
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: name === "price" || name === "quantity" ? Number(value) : value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch("http://localhost:8080/api/v1/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to create product: ${response.status} ${response.statusText}`
				);
			}

			const savedProduct = await response.json();
			navigate(`/products/${savedProduct.id}`, {
				state: { message: "Product created successfully" },
			});
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		navigate("/products");
	};

	return (
		<div>
			<header>
				<h1>Add New Product</h1>
			</header>

			<main>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							id="name"
							type="text"
							name="name"
							value={product.name}
							onChange={handleChange}
							required
							minLength={2}
						/>
					</div>

					<div>
						<label htmlFor="price">Price:</label>
						<input
							id="price"
							type="number"
							name="price"
							value={product.price || ""}
							onChange={handleChange}
							min="0"
							step="0.01"
							required
						/>
					</div>

					<div>
						<label htmlFor="quantity">Quantity:</label>
						<input
							id="quantity"
							type="number"
							name="quantity"
							value={product.quantity || ""}
							onChange={handleChange}
							min="0"
							required
						/>
					</div>

					<div>
						<label htmlFor="description">Description:</label>
						<textarea
							id="description"
							name="description"
							value={product.description}
							onChange={handleChange}
							rows={4}
						/>
					</div>

					<div>
						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Product"}
						</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>

				{error && <div>Error: {error}</div>}
			</main>
		</div>
	);
}

export default AddProductPage;
