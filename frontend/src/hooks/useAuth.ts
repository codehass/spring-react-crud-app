import { useEffect, useState } from "react";
import { endpoints } from "../lib/api";

export function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch the current user on mount
	useEffect(() => {
		fetch(endpoints.auth.currentUser, {
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw new Error("Not logged in");
				return res.json();
			})
			.then(setUser)
			.catch(() => setUser(null))
			.finally(() => setLoading(false));
	}, []);

	return { user, loading };
}
