import { useAuth } from "../hooks/useAuth";
import { useBooks } from "../services/books";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router-dom"; // Importa o Link

export function HomePage() {
  const { user, logout } = useAuth();
  const { data: books, isLoading, isError } = useBooks();

  function renderContent() {
    if (isLoading) {
      return <p className="text-center text-gray-500">Carregando livros...</p>;
    }

    if (isError) {
      return (
        <p className="text-center text-red-500">
          Ocorreu um erro ao buscar os livros.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* O logo agora é um link para a página inicial */}
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Libook
          </Link>

          <div className="flex items-center space-x-4">
            {/* Novo link para a biblioteca pessoal */}
            <Link
              to="/my-library"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Minha Biblioteca
            </Link>

            <span className="text-gray-700 hidden sm:block">
              Olá, {user?.name}!
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6">{renderContent()}</main>
    </div>
  );
}
