import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetails from "./components/ProductList";
import AppLayout from "./components/AppLayout";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />

				<Route
					path="/products"
					element={
						<RequireAuth>
							<AppLayout />
						</RequireAuth>
					}
				>
					<Route index element={<ProductDetails />} />
					<Route path="new" element={<AddProductPage />} />
					<Route path=":productId" element={<ProductDetailsPage />} />
					<Route path=":productId/edit" element={<EditProductPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
