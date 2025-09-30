import { useState } from "react";
import { useBooks } from "../services/books";
import { BookCard } from "../components/BookCard";
import { StatCard } from "../components/StatCard";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  UsersIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export function HomePage() {
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1); // Estado para controlar a página atual

  // O hook agora recebe um objeto com 'sortBy' e 'page'
  const {
    data: paginatedBooks,
    isLoading,
    isError,
  } = useBooks({ sortBy, page });

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

    // Verifica se existem dados de livros dentro do objeto de paginação
    if (!paginatedBooks || paginatedBooks.data.length === 0) {
      return (
        <p className="text-center text-gray-500 py-10">
          Nenhum livro encontrado no catálogo.
        </p>
      );
    }

    // Mapeia sobre 'paginatedBooks.data' em vez de 'books'
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {paginatedBooks.data.map((book) => (
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

      {/* --- SEÇÃO DE MÉTRICAS --- */}
      <section className="pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<BookOpenIcon className="h-8 w-8" />}
            value={
              paginatedBooks?.meta.totalItems.toLocaleString("pt-BR") || "0"
            }
            title="Livros no Catálogo"
            description="Explore nossa coleção"
          />
          <StatCard
            icon={<UsersIcon className="h-8 w-8" />}
            value="2.341"
            title="Leitores Ativos"
            description="Usuários cadastrados"
          />
          <StatCard
            icon={<StarIcon className="h-8 w-8" />}
            value="45.2K"
            title="Avaliações"
            description="Média de 4.3 estrelas"
          />
          <StatCard
            icon={<ArrowTrendingUpIcon className="h-8 w-8" />}
            value="1.823"
            title="Leituras Ativas"
            description="Livros sendo lidos agora"
          />
        </div>
      </section>

      {/* --- SEÇÃO DO CATÁLOGO DE LIVROS --- */}
      <section className="pb-16 sm:pb-20">
        <h2 className="text-3xl font-bold text-brand-dark mb-8">
          Navegar pelo Catálogo
        </h2>
        <FilterBar
          bookCount={paginatedBooks?.meta.totalItems || 0}
          activeSort={sortBy}
          setActiveSort={setSortBy}
        />
        {renderContent()}

        {/* Componente de Paginação */}
        {paginatedBooks && paginatedBooks.meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination meta={paginatedBooks.meta} onPageChange={setPage} />
          </div>
        )}
      </section>
    </div>
  );
}
