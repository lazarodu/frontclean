import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (requireAdmin && currentUser.role !== "admin") {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
