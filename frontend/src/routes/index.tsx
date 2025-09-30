import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { BookDetailPage } from "../pages/BookDetailPage";
import { MyLibraryPage } from "../pages/MyLibraryPage";
import { MainLayout } from "../components/layout/MainLayout";

export function AppRoutes() {
  return (
    <Routes>
      {/* O MainLayout agora envolve TODAS as páginas para um visual consistente */}
      <Route element={<MainLayout />}>
        {/* Rotas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />

        {/* Rotas Privadas aninhadas dentro do ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-library" element={<MyLibraryPage />} />
          {/* Todas as outras rotas que exigem login virão aqui */}
        </Route>
      </Route>
    </Routes>
  );
}
