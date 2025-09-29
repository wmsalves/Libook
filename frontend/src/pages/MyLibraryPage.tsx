import { useMyLibrary } from "../services/books";
import { BookCard } from "../components/BookCard";
import { type LibraryBook, ReadingStatus } from "../types";
import { Link } from "react-router-dom";

function Bookshelf({ title, books }: { title: string; books: LibraryBook[] }) {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export function MyLibraryPage() {
  const { data: books = [], isLoading, isError } = useMyLibrary();

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Carregando sua biblioteca...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">
        Ocorreu um erro ao buscar sua biblioteca.
      </p>
    );
  }

  // Filtra e organiza os livros por status
  const wantToReadBooks = books.filter(
    (b) => b.ReadingList[0]?.status === ReadingStatus.WANT_TO_READ
  );
  const readingBooks = books.filter(
    (b) => b.ReadingList[0]?.status === ReadingStatus.READING
  );
  const readBooks = books.filter(
    (b) => b.ReadingList[0]?.status === ReadingStatus.READ
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Minha Biblioteca
      </h1>

      {books.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
          <p>Sua biblioteca está vazia.</p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Explore o catálogo e adicione alguns livros!
          </Link>
        </div>
      ) : (
        <>
          <Bookshelf title="Lendo Atualmente" books={readingBooks} />
          <Bookshelf title="Quero Ler" books={wantToReadBooks} />
          <Bookshelf title="Livros Lidos" books={readBooks} />
        </>
      )}
    </div>
  );
}
