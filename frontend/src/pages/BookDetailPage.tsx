import { useParams, Link } from "react-router-dom";
import { useBook } from "../services/books";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { BookStatusSelector } from "../components/BookStatusSelector";
import { useAuth } from "../hooks/useAuth";

export function BookDetailPage() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const bookId = id!;
  const { data: book, isLoading, isError } = useBook(bookId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-text-400">Carregando detalhes do livro...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">
          Erro ao carregar o livro ou livro não encontrado.
        </p>
      </div>
    );
  }

  const authorNames = book.authors.map((a) => a.author.name).join(", ");
  const categoryNames = book.categories.map((c) => c.category.name).join(", ");

  return (
    // o body já tem bg/background e text-base definidos no index.css (v4)
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary-600 transition-colors mb-6"
        >
          {/* seta voltar com a cor herdada */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para o catálogo
        </Link>

        {/* --- DETALHES DO LIVRO --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex mb-8">
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={book.coverUrl || "https://via.placeholder.com/400x580"}
              alt={`Capa de ${book.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold text-text">{book.title}</h1>

            <p className="mt-2 text-lg text-text-light italic">
              por {authorNames}
            </p>

            <p className="mt-4 text-sm text-text-400">
              <strong className="text-text">Categorias:</strong> {categoryNames}
            </p>

            {isAuthenticated && (
              <div className="mt-6 max-w-xs">
                <BookStatusSelector bookId={bookId} />
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-text border-b border-text-100 pb-2">
                Sinopse
              </h2>
              <p className="mt-4 text-text leading-relaxed">
                {book.synopsis || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </div>

        {/* --- SEÇÃO DE AVALIAÇÕES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReviewsList bookId={bookId} />
          </div>

          <div>
            {isAuthenticated ? (
              <ReviewForm bookId={bookId} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-text-400">
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:text-primary-600"
                  >
                    Entre
                  </Link>{" "}
                  para deixar sua avaliação.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
