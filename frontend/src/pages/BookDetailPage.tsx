import { useParams, Link } from "react-router-dom";
import { useBook } from "../services/books";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewsList } from "../components/ReviewsList";
import { BookStatusSelector } from "../components/BookStatusSelector"; // Importa o seletor
import { useAuth } from "../hooks/useAuth";

export function BookDetailPage() {
  const { isAuthenticated } = useAuth();
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
          {/* ... (SVG e texto do link "Voltar") ... */}
          Voltar para o catálogo
        </Link>

        {/* --- DETALHES DO LIVRO --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex mb-8">
          <div className="md:w-1/3 flex-shrink-0">
            {/* ... (imagem do livro) ... */}
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="mt-2 text-lg text-gray-600 italic">
              por {authorNames}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Categorias:</strong> {categoryNames}
            </p>

            {/* 3. Renderiza o seletor APENAS se o usuário estiver autenticado */}
            {isAuthenticated && (
              <div className="mt-6 max-w-xs">
                <BookStatusSelector bookId={bookId} />
              </div>
            )}

            <div className="mt-8">{/* ... (Sinopse) ... */}</div>
          </div>
        </div>

        {/* --- SEÇÃO DE AVALIAÇÕES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* A lista de avaliações é pública e visível para todos */}
            <ReviewsList bookId={bookId} />
          </div>
          <div>
            {/* 4. Renderiza o formulário APENAS se o usuário estiver autenticado */}
            {isAuthenticated ? (
              <ReviewForm bookId={bookId} />
            ) : (
              // Mensagem para visitantes
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">
                  <Link
                    to="/login"
                    className="text-indigo-600 font-semibold hover:underline"
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
