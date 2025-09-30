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
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <Link to={`/books/${book.id}`} className="group block relative flex-grow">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder para livros sem capa
          <div className="w-full h-full bg-brand-light flex items-center justify-center">
            <BookOpenIcon className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Sobreposição que aparece no hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100">
          <h3 className="font-bold text-lg drop-shadow-md">{book.title}</h3>
          <p className="text-sm drop-shadow-md">{authorNames}</p>
        </div>
      </Link>

      {/* Seletor de Status */}
      {isAuthenticated && (
        <div className="p-2 border-t border-gray-100">
          <BookStatusSelector bookId={book.id} />
        </div>
      )}
    </div>
  );
}
