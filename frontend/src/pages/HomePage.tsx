import { useBooks } from "../services/books";
import { BookCard } from "../components/BookCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Importa o ícone de busca

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
    <div className="container mx-auto px-4 sm:px-6">
      {/* --- SEÇÃO HERO --- */}
      <section className="text-center py-16 sm:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green tracking-tight">
          Descubra Seu Próximo Livro Favorito
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-dark">
          Explore milhares de livros, compartilhe avaliações e organize suas
          listas de leitura. Sua biblioteca pessoal nunca foi tão inteligente.
        </p>

        {/* Barra de Busca */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar livros, autores, gêneros..."
            />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">{renderContent()}</section>
    </div>
  );
}
