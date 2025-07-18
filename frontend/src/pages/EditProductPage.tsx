import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import PageHeader from "../components/PageHeader";
import ErrorMessage from "../components/ErrorMessage";
import type { Product } from "../types/product";
import { endpoints } from "../lib/api";

function EditProductPage() {
	const { productId } = useParams<{ productId: string }>();
	const navigate = useNavigate();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	// Fetch product details. It runs when the component mounts or when productId changes.
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

	// Handle form submission. It sends a PUT request to the API to update the product.
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product) return;

		setIsSubmitting(true);
		setError(null);
		setFieldErrors({});

		try {
			const response = await fetch(endpoints.products.update(product.id), {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product),
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();
				if (response.status === 400 && Array.isArray(errorData.errors)) {
					const errors: Record<string, string> = {};
					for (const err of errorData.errors) {
						errors[err.field] = err.message;
					}
					setFieldErrors(errors);
				} else {
					throw new Error(errorData.title || "Update failed");
				}
				return;
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

	// Handle input changes. It updates the product state with the new values.
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

	// Show loading spinner while fetching data
	if (loading) {
		return (
			<div className="flex justify-center items-center h-full w-full py-20">
				<Spinner />
			</div>
		);
	}

	// Show error message if there was an error while fetching the product
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

	// Render the edit product form
	return (
		<div className="max-w-xl mx-auto p-6">
			<PageHeader title="Edit Product" />
			<main>
				<form onSubmit={handleSubmit} noValidate>
					<Input
						id="name"
						label="Name"
						name="name"
						type="text"
						value={product?.name}
						handleChange={handleChange}
						error={fieldErrors.name}
						required
						minLength={2}
						placeholder="Enter product name"
					/>

					<Input
						id="price"
						label="Price"
						name="price"
						type="number"
						value={product?.price}
						handleChange={handleChange}
						error={fieldErrors.price}
						required
						min={0}
						step={0.01}
						placeholder="Enter price"
					/>

					<Input
						id="quantity"
						label="Quantity"
						name="quantity"
						type="number"
						value={product?.quantity}
						handleChange={handleChange}
						error={fieldErrors.quantity}
						required
						min={0}
						placeholder="Enter quantity"
					/>

					<Textarea
						id="description"
						label="Description"
						name="description"
						value={product?.description}
						handleChange={handleChange}
						error={fieldErrors.description}
						rows={4}
						placeholder="Write a short description..."
					/>

					<div className="flex gap-4">
						<Button type="submit" isLoading={isSubmitting}>
							Save
						</Button>
						<Button
							type="button"
							variant="secondary"
							disabled={isSubmitting}
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default EditProductPage;
