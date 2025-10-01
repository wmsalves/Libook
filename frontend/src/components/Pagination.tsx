import type { PaginationMeta } from "../types";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const { currentPage, totalPages } = meta;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="px-4 py-2 text-sm font-medium rounded-md border border-text-200 
                   bg-white text-text hover:bg-secondary-100 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <span className="text-sm text-text-400">
        Página <span className="font-medium text-text">{currentPage}</span> de{" "}
        {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="px-4 py-2 text-sm font-medium rounded-md border border-text-200 
                   bg-white text-text hover:bg-secondary-100 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próximo
      </button>
    </div>
  );
}
