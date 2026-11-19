import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./useAuth";

export default function RequireAuth() {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <p>Checking for user</p>
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}