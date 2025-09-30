import { Link, NavLink } from "react-router-dom";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();

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
        </ul>

        {/* Ícones e Usuário (Direita) */}
        <div className="flex items-center space-x-5">
          <button className="text-brand-dark hover:text-brand-green transition-colors">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="text-brand-dark hover:text-brand-green transition-colors">
                <UserIcon className="h-6 w-6" />
              </button>
              {/* Dropdown de Usuário */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block ring-1 ring-black ring-opacity-5">
                <p className="px-4 py-2 text-sm text-gray-700 font-medium">
                  Olá, {user?.name}
                </p>
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
            <Link
              to="/login"
              className="text-brand-dark hover:text-brand-green transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
