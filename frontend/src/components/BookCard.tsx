import type { Book } from "../types";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  // Extrai os nomes dos autores para uma string
  const authorNames = book.authors.map((a) => a.author.name).join(", ");

  return (
    // Envolve todo o card com o Link, apontando para /books/id-do-livro
    <Link
      to={`/books/${book.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <img
          src={book.coverUrl || "https://via.placeholder.com/150x220"}
          alt={`Capa do livro ${book.title}`}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
        <h3 style={{ marginTop: "12px", fontSize: "1.1rem" }}>{book.title}</h3>
        <p style={{ color: "#555", fontSize: "0.9rem" }}>{authorNames}</p>
      </div>
    </Link>
  );
}
