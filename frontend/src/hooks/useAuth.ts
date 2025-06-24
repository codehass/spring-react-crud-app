import { useEffect, useState } from "react";

export function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	console.log("User:", user);
	console.log("Loading:", loading);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/me", {
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
