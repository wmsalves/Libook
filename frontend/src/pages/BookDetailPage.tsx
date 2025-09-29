import { useParams, Link } from "react-router-dom";
import { useBook } from "../services/books";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const bookId = id!;
  const { data: book, isLoading, isError } = useBook(bookId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Carregando detalhes do livro...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Erro ao carregar o livro ou livro não encontrado.
        </p>
      </div>
    );
  }

  const authorNames = book.authors.map((a) => a.author.name).join(", ");
  const categoryNames = book.categories.map((c) => c.category.name).join(", ");

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6"
        >
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
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="mt-2 text-lg text-gray-600 italic">
              por {authorNames}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Categorias:</strong> {categoryNames}
            </p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Sinopse
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
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
            <ReviewForm bookId={bookId} />
          </div>
        </div>
      </div>
    </div>
  );
}
