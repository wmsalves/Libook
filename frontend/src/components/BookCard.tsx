import { Link } from "react-router-dom";
import type { Book } from "../types";
import { BookStatusSelector } from "./BookStatusSelector";
import { useAuth } from "../hooks/useAuth";
import { BookOpenIcon } from "@heroicons/react/24/solid";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { isAuthenticated } = useAuth();
  const authorNames = book.authors.map((a) => a.author.name).join(", ");

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link
        to={`/books/${book.id}`}
        className="group relative block aspect-[2/3] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder para livros sem capa
          <div className="w-full h-full bg-secondary-100 flex items-center justify-center">
            <BookOpenIcon className="h-16 w-16 text-text-300" />
          </div>
        )}

        {/* Sobreposição no hover (usa a cor de texto com opacidade) */}
        <div className="absolute inset-0 bg-text/0 group-hover:bg-text/80 transition-all duration-300 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100">
          <h3 className="font-bold text-lg drop-shadow-md line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm drop-shadow-md line-clamp-1">{authorNames}</p>
        </div>
      </Link>

      {/* Seletor de Status */}
      {isAuthenticated && (
        <div className="p-2 border-t border-text-100">
          <BookStatusSelector bookId={book.id} />
        </div>
      )}
    </div>
  );
}
