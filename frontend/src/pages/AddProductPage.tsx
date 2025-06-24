import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import type { NewProduct } from "../types/product";
import { endpoints } from "../lib/api";

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
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	// Handle input changes.
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: name === "price" || name === "quantity" ? Number(value) : value,
		});
	};

	// Handle form submission. It sends a POST request to the API to create a new product.
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		setFieldErrors({});

		try {
			const response = await fetch(endpoints.products.base, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product),
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();

				if (response.status === 400 && Array.isArray(errorData.errors)) {
					// Map field-specific errors
					const errors: Record<string, string> = {};
					for (const err of errorData.errors) {
						errors[err.field] = err.message;
					}
					setFieldErrors(errors);
				} else {
					throw new Error(errorData.title || "Something went wrong");
				}

				return;
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
		<div className="max-w-xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Add New Product</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				<Input
					label="Name"
					type="text"
					name="name"
					value={product.name}
					handleChange={handleChange}
					error={fieldErrors.name}
				/>

				<Input
					label="Price"
					type="number"
					name="price"
					value={product.price}
					handleChange={handleChange}
					error={fieldErrors.price}
				/>

				<Input
					label="Quantity"
					type="number"
					name="quantity"
					value={product.quantity}
					handleChange={handleChange}
					error={fieldErrors.quantity}
				/>

				<Textarea
					id="description"
					label="Description"
					name="description"
					value={product.description}
					handleChange={handleChange}
					error={fieldErrors.description}
					rows={4}
				/>

				{error && (
					<p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
				)}

				<div className="flex gap-4">
					<Button type="submit" isLoading={isSubmitting}>
						Create Product
					</Button>

					<Button
						type="button"
						onClick={handleCancel}
						variant="secondary"
						disabled={isSubmitting}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddProductPage;
