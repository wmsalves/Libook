import { useAuth } from "../hooks/useAuth";
import { useBooks } from "../services/books";
import { BookCard } from "../components/BookCard";

export function HomePage() {
  const { user, logout } = useAuth();
  const { data: books, isLoading, isError } = useBooks();

  function renderContent() {
    if (isLoading) {
      return <p>Carregando livros...</p>;
    }

    if (isError) {
      return (
        <p style={{ color: "red" }}>Ocorreu um erro ao buscar os livros.</p>
      );
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Catálogo de Livros</h1>
        <div>
          <span>Olá, {user?.name}!</span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>
            Sair
          </button>
        </div>
      </header>

      <main>{renderContent()}</main>
    </div>
  );
}
