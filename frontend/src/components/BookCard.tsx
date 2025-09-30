import { Link } from "react-router-dom";
import type { Book } from "../types";
import { BookStatusSelector } from "./BookStatusSelector";
import { useAuth } from "../hooks/useAuth";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { isAuthenticated } = useAuth();
  const authorNames = book.authors.map((a) => a.author.name).join(", ");

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/books/${book.id}`} className="group block flex-grow">
        <div className="relative">
          <img
            src={book.coverUrl || "https://via.placeholder.com/400x580"}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3
            className="text-lg font-bold text-gray-800 truncate"
            title={book.title}
          >
            {book.title}
          </h3>
          <p
            className="mt-1 text-sm text-gray-600 truncate"
            title={authorNames}
          >
            {authorNames}
          </p>
        </div>
      </Link>

      {/* 3. Renderize o seletor de status APENAS se o usuário estiver autenticado */}
      {isAuthenticated && (
        <div className="p-4 pt-0">
          <BookStatusSelector bookId={book.id} />
        </div>
      )}
    </div>
  );
}
