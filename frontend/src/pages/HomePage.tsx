import { useState } from "react";
import { useBooks, useSearchBooks } from "../services/books";
import { BookCard } from "../components/BookCard";
import { StatCard } from "../components/StatCard";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  UsersIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import type { Book } from "../types";

export function HomePage() {
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: paginatedBooks, isLoading: isLoadingBooks } = useBooks({
    sortBy,
    page,
  });
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchBooks(debouncedSearchTerm);

  const isLoading = isLoadingBooks || isLoadingSearch;
  const isSearchActive = debouncedSearchTerm.length > 1;

  function renderContent() {
    if (isLoading && isSearchActive) {
      return <p className="text-center text-text-400 py-10">Buscando...</p>;
    }
    if (isLoading) {
      return <p className="text-center text-text-400 py-10">Carregando...</p>;
    }

    let booksToDisplay: Book[] | undefined = isSearchActive
      ? searchResults?.hits
      : paginatedBooks?.data;

    if (!booksToDisplay || booksToDisplay.length === 0) {
      return (
        <p className="text-center text-text-400 py-10">
          Nenhum livro encontrado.
        </p>
      );
    }

    // Normaliza os dados quando for busca
    if (isSearchActive) {
      booksToDisplay = booksToDisplay.map((book) => ({
        ...book,
        authors: (book.authors as unknown as string[]).map((name) => ({
          author: { name, id: "" },
        })),
        categories: (book.categories as unknown as string[]).map((name) => ({
          category: { name, id: "" },
        })),
      }));
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {booksToDisplay.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6">
      {/* --- HERO --- */}
      <section className="text-center py-16 sm:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-text tracking-tight">
          Descubra Seu Próximo Livro Favorito
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-400">
          Explore milhares de livros, compartilhe avaliações e organize suas
          listas de leitura. Sua biblioteca pessoal nunca foi tão inteligente.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-text-300" />
            </div>
            <input
              type="search"
              placeholder="Buscar livros, autores, gêneros..."
              className="block w-full pl-10 pr-3 py-3 rounded-full leading-5
                         bg-white border border-text-200
                         placeholder-text-300
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                         sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* --- MÉTRICAS --- */}
      <section className="pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<BookOpenIcon className="h-8 w-8 text-primary" />}
            value={
              paginatedBooks?.meta.totalItems.toLocaleString("pt-BR") || "0"
            }
            title="Livros no Catálogo"
            description="Explore nossa coleção"
          />
          <StatCard
            icon={<UsersIcon className="h-8 w-8 text-primary" />}
            value="2.341"
            title="Leitores Ativos"
            description="Usuários cadastrados"
          />
          <StatCard
            icon={<StarIcon className="h-8 w-8 text-primary" />}
            value="45.2K"
            title="Avaliações"
            description="Média de 4.3 estrelas"
          />
          <StatCard
            icon={<ArrowTrendingUpIcon className="h-8 w-8 text-primary" />}
            value="1.823"
            title="Leituras Ativas"
            description="Livros sendo lidos agora"
          />
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section className="pb-16 sm:pb-20">
        <h2 className="text-3xl font-bold text-text mb-8">
          {isSearchActive
            ? `Resultados para "${debouncedSearchTerm}"`
            : "Navegar pelo Catálogo"}
        </h2>

        {!isSearchActive ? (
          <>
            <FilterBar
              bookCount={paginatedBooks?.meta.totalItems || 0}
              activeSort={sortBy}
              setActiveSort={setSortBy}
            />
            {renderContent()}
            {paginatedBooks && paginatedBooks.meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination meta={paginatedBooks.meta} onPageChange={setPage} />
              </div>
            )}
          </>
        ) : (
          renderContent()
        )}
      </section>
    </div>
  );
}
