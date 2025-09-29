import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { BookDetailPage } from "../pages/BookDetailPage";
import { MyLibraryPage } from "../pages/MyLibraryPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/my-library" element={<MyLibraryPage />} />{" "}
      </Route>
    </Routes>
  );
}
