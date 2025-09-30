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
      <Route path="/login" element={<LoginPage />} />

      {/* Todas as rotas protegidas agora usam o MainLayout */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {" "}
          {/* Rota de Layout Aninhada */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/my-library" element={<MyLibraryPage />} />
          {/* Rota de placeholder para o link 'Avaliações' */}
          <Route path="/reviews" element={<div>Página de Avaliações</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
