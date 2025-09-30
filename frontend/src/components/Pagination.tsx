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
        className="px-4 py-2 text-sm font-medium bg-white border rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="px-4 py-2 text-sm font-medium bg-white border rounded-md disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  );
}
