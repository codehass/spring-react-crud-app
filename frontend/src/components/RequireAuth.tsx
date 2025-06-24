import { Navigate, useLocation } from "react-router";

import Spinner from "./Spinner";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

function RequireAuth({ children }: { children: JSX.Element }) {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Spinner />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;
