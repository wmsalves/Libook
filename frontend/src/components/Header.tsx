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
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-text-100">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold font-serif text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        >
          Libook
        </Link>

        {/* Links de Navegação (Centro) */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-text hover:text-primary"
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
                  `transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-text hover:text-primary"
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
          <button
            className="text-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
            aria-label="Buscar"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {isAuthenticated ? (
            // Menu para usuário LOGADO
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="text-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-0.5"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                aria-controls="user-menu"
              >
                <span className="sr-only">Menu do usuário</span>
                <UserCircleIcon className="h-7 w-7" />
              </button>

              <div
                id="user-menu"
                role="menu"
                aria-hidden={!isMenuOpen}
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-text-100 transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <p className="px-4 py-2 text-sm text-text-600 font-medium">
                  Olá, {user?.name}
                </p>

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/books"
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-secondary-100"
                    role="menuitem"
                  >
                    Painel de Admin
                  </Link>
                )}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-secondary-100"
                  role="menuitem"
                >
                  Sair
                </a>
              </div>
            </div>
          ) : (
            // Botão para usuário DESLOGADO
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
