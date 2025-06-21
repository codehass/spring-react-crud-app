import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ProductsListPage />} />
				<Route path="/products" element={<ProductsListPage />} />
				<Route path="/products/new" element={<AddProductPage />} />
				<Route path="/products/:productId" element={<ProductDetailsPage />} />
				<Route path="/products/:productId/edit" element={<EditProductPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
