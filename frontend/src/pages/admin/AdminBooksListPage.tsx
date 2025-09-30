import { useBooks } from "../../services/books";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export function AdminBooksListPage() {
  const { data: books, isLoading, isError } = useBooks("title_asc"); // Ordena por título

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
          to="/admin/books/new" // Rota para criar novo livro (faremos a seguir)
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
            {books?.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.authors.map((a) => a.author.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
