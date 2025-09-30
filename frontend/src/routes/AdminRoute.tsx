import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AdminRoute() {
  const { user, isAuthenticated } = useAuth();

  // Verifica se está autenticado E se a role é ADMIN
  const isAdmin = isAuthenticated && user?.role === "ADMIN";

  // Se for admin, renderiza a página. Se não, redireciona para a home.
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
