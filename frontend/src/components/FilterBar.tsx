import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

const sortOptions = [
  { id: "relevance", name: "Relevância" },
  { id: "most_rated", name: "Mais Avaliados" },
  { id: "most_recent", name: "Mais Recentes" },
  { id: "title_asc", name: "Título A-Z" },
];

interface FilterBarProps {
  bookCount: number;
}

export function FilterBar({ bookCount }: FilterBarProps) {
  const [activeSort, setActiveSort] = useState("relevance");

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
      {/* Lado Esquerdo: Filtros e Contagem */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-brand-dark hover:bg-gray-100">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span>Filtros</span>
        </button>
        <span className="text-sm text-gray-600">
          {bookCount} livros encontrados
        </span>
      </div>

      {/* Lado Direito: Ordenação */}
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <span className="text-sm text-gray-600">Ordenar por:</span>
        <div className="flex items-center bg-gray-200/80 rounded-md p-1">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveSort(option.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeSort === option.id
                  ? "bg-white text-brand-green shadow"
                  : "text-gray-600 hover:text-brand-dark"
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
