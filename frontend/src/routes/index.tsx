import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { BookDetailPage } from "../pages/BookDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas Privadas */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
      </Route>
    </Routes>
  );
}
