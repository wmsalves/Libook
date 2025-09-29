import { useParams, Link } from "react-router-dom";
import { useBook } from "../services/books";

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBook(id!);

  if (isLoading) {
    return <p>Carregando detalhes do livro...</p>;
  }

  if (isError || !book) {
    return (
      <p style={{ color: "red" }}>
        Erro ao carregar o livro ou livro não encontrado.
      </p>
    );
  }

  const authorNames = book.authors.map((a) => a.author.name).join(", ");
  const categoryNames = book.categories.map((c) => c.category.name).join(", ");

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">&larr; Voltar para o catálogo</Link>
      <div style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}>
        <img
          src={book.coverUrl || "https://via.placeholder.com/250x370"}
          alt={`Capa de ${book.title}`}
          style={{ width: "250px", borderRadius: "8px" }}
        />
        <div>
          <h1>{book.title}</h1>
          <p style={{ fontStyle: "italic", color: "#555" }}>
            por {authorNames}
          </p>
          <p style={{ marginTop: "1rem" }}>
            <strong>Categorias:</strong> {categoryNames}
          </p>
          <h3 style={{ marginTop: "2rem" }}>Sinopse</h3>
          <p>{book.synopsis || "Sinopse não disponível."}</p>
        </div>
      </div>
    </div>
  );
}
