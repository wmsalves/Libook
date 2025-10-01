import { FunnelIcon } from "@heroicons/react/24/outline";

const sortOptions = [
  { id: "relevance", name: "Relevância" },
  { id: "most_rated", name: "Mais Avaliados" },
  { id: "most_recent", name: "Mais Recentes" },
  { id: "title_asc", name: "Título A-Z" },
];

interface FilterBarProps {
  bookCount: number;
  activeSort: string;
  setActiveSort: (id: string) => void;
}

export function FilterBar({
  bookCount,
  activeSort,
  setActiveSort,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
      {/* Esquerda: Filtros + contagem */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 border border-text-200 rounded-md text-sm font-medium text-text hover:bg-secondary-100 transition-colors">
          <FunnelIcon className="h-5 w-5 text-text-400" />
          <span>Filtros</span>
        </button>
        <span className="text-sm text-text-400">
          {bookCount} livros encontrados
        </span>
      </div>

      {/* Direita: Ordenação */}
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <span className="text-sm text-text-400">Ordenar por:</span>
        <div className="flex items-center bg-secondary-100 rounded-md p-1">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeSort === option.id
                  ? "bg-primary text-white shadow"
                  : "text-text hover:text-primary"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
