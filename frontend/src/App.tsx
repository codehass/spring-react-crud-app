import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetails from "./components/ProductsDetails";
import AppLayout from "./components/AppLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<ProductDetails />} />
					<Route path="products" element={<ProductDetails />} />
					<Route path="products/new" element={<AddProductPage />} />
					<Route path="products/:productId" element={<ProductDetailsPage />} />
					<Route
						path="products/:productId/edit"
						element={<EditProductPage />}
					/>
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
