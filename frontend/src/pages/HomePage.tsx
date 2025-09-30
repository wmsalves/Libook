import { useBooks } from "../services/books";
import { BookCard } from "../components/BookCard";

export function HomePage() {
  const { data: books, isLoading, isError } = useBooks();

  function renderContent() {
    if (isLoading) {
      return (
        <p className="text-center text-gray-500 py-10">Carregando livros...</p>
      );
    }

    if (isError) {
      return (
        <p className="text-center text-red-500 py-10">
          Ocorreu um erro ao buscar os livros.
        </p>
      );
    }

    if (!books || books.length === 0) {
      return (
        <p className="text-center text-gray-500 py-10">
          Nenhum livro encontrado no catálogo.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 sm:p-6">
      <div className="pt-8 pb-12">{renderContent()}</div>
    </main>
  );
}
