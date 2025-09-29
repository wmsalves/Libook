import { Link } from "react-router-dom";
import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const authorNames = book.authors.map((a) => a.author.name).join(", ");

  return (
    <Link
      to={`/books/${book.id}`}
      className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={book.coverUrl || "https://via.placeholder.com/400x580"}
          alt={`Capa do livro ${book.title}`}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white">
        <h3
          className="text-lg font-bold text-gray-800 truncate"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 truncate" title={authorNames}>
          {authorNames}
        </p>
      </div>
    </Link>
  );
}
