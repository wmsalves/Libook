import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./../hooks/useAuth";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-serif text-brand-green">
          Libook
        </Link>

        {/* Links de Navegação (Centro) */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-brand-green font-semibold"
                    : "text-brand-dark hover:text-brand-green"
                }`
              }
            >
              Catálogo
            </NavLink>
          </li>

          {isAuthenticated && (
            <li>
              <NavLink
                to="/my-library"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-brand-green font-semibold"
                      : "text-brand-dark hover:text-brand-green"
                  }`
                }
              >
                Minhas Listas
              </NavLink>
            </li>
          )}
        </ul>

        {/* Ícones e Ações do Usuário (Direita) */}
        <div className="flex items-center space-x-5">
          <button className="text-brand-dark hover:text-brand-green transition-colors">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {isAuthenticated ? (
            // Menu para usuário LOGADO
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-dark hover:text-brand-green transition-colors"
              >
                <span className="sr-only">Menu do usuário</span>
                <UserCircleIcon className="h-7 w-7" />
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <p className="px-4 py-2 text-sm text-gray-700 font-medium">
                  Olá, {user?.name}
                </p>

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/books"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                  >
                    Painel de Admin
                  </Link>
                )}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </a>
              </div>
            </div>
          ) : (
            // Botão para usuário DESLOGADO
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
