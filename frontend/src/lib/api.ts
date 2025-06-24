const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
	auth: {
		loginWithProvider: (provider: string) =>
			`${BASE_URL}/oauth2/authorization/${provider}`,
		logout: `${BASE_URL}/logout`,
		currentUser: `${API_URL}/me`,
	},
	products: {
		base: `${API_URL}/products`,
		getById: (id: number | string) => `${API_URL}/products/${id}`,
		update: (id: number | string) => `${API_URL}/products/${id}`,
		delete: (id: number | string) => `${API_URL}/products/${id}`,
		create: `${API_URL}/products`,
	},
};
