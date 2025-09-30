import { useState } from "react";
import { useBooks, useDeleteBook } from "../../services/books";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Pagination } from "../../components/Pagination";

export function AdminBooksListPage() {
  const [page, setPage] = useState(1);

  const {
    data: paginatedBooks,
    isLoading,
    isError,
  } = useBooks({ sortBy: "title_asc", page });

  const { mutate: deleteBook } = useDeleteBook();

  function handleDeleteBook(bookId: string, bookTitle: string) {
    if (
      window.confirm(
        `Você tem certeza que deseja apagar o livro "${bookTitle}"?`
      )
    ) {
      deleteBook(bookId);
    }
  }

  if (isLoading) return <p className="text-center p-8">Carregando livros...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 p-8">Erro ao carregar livros.</p>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Gerenciar Livros</h1>
        <Link
          to="/admin/books/new"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Novo Livro
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autores
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedBooks?.data.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.authors.map((a) => a.author.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <Link
                    to={`/admin/books/edit/${book.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Editar"
                  >
                    <PencilIcon className="h-5 w-5 inline-block" />
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id, book.title)}
                    className="text-red-600 hover:text-red-900"
                    title="Apagar"
                  >
                    <TrashIcon className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedBooks && paginatedBooks.meta.totalPages > 1 && (
        <div className="mt-8">
          <Pagination meta={paginatedBooks.meta} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
