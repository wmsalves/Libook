import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useAuthors,
  useCategories,
  useCreateBook,
  useUpdateBook,
  useBook,
} from "../../services/books";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Schema de validação com Zod para os dados do formulário
const bookFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  synopsis: z.string().optional(),
  publicationYear: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) =>
      val === undefined || val === "" ? undefined : Number(val)
    )
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Deve ser um número",
    }),
  pageCount: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) =>
      val === undefined || val === "" ? undefined : Number(val)
    )
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Deve ser um número",
    }),
  coverUrl: z.string().url("URL da capa inválida").optional().or(z.literal("")),
  authorIds: z.array(z.string()).min(1, "Selecione pelo menos um autor"),
  categoryIds: z.array(z.string()).optional(),
});

// Tipos inferidos do schema para entrada (antes da transformação) e saída (depois da transformação)
type BookFormInput = z.input<typeof bookFormSchema>;
type BookFormData = z.output<typeof bookFormSchema>;

export function AdminBookFormPage() {
  const { id: bookId } = useParams<{ id: string }>();
  const isEditMode = !!bookId;

  const navigate = useNavigate();
  const { data: authors = [] } = useAuthors();
  const { data: categories = [] } = useCategories();
  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();
  const { data: bookData } = useBook(bookId!, { enabled: isEditMode });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInput>({
    resolver: zodResolver(bookFormSchema),
  });

  // Efeito que preenche o formulário com os dados do livro no modo de edição
  useEffect(() => {
    if (bookData) {
      // Prepara os dados da API para o formulário, convertendo null para '' ou undefined
      const formData = {
        ...bookData,
        synopsis: bookData.synopsis ?? "",
        coverUrl: bookData.coverUrl ?? "",
        publicationYear: bookData.publicationYear ?? undefined,
        pageCount: bookData.pageCount ?? undefined,
        authorIds: bookData.authors.map((a) => a.author.id),
        categoryIds: bookData.categories.map((c) => c.category.id),
      };
      reset(formData);
    }
  }, [bookData, reset]);

  // Função de submissão unificada que lida com criação e atualização
  const onSubmit: SubmitHandler<BookFormData> = (data) => {
    if (isEditMode) {
      updateBook(
        { bookId: bookId!, payload: data },
        {
          onSuccess: () => navigate("/admin/books"),
        }
      );
    } else {
      createBook(data, {
        onSuccess: () => navigate("/admin/books"),
      });
    }
  };

  const isPending = isCreating || isUpdating;
  const inputClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const buttonClasses =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50";

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">
        {isEditMode ? "Editar Livro" : "Novo Livro"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<BookFormInput>)}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto space-y-6"
      >
        {/* Título */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input id="title" {...register("title")} className={inputClasses} />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Sinopse */}
        <div>
          <label
            htmlFor="synopsis"
            className="block text-sm font-medium text-gray-700"
          >
            Sinopse
          </label>
          <textarea
            id="synopsis"
            {...register("synopsis")}
            className={inputClasses}
            rows={4}
          />
          {errors.synopsis && (
            <p className="text-red-600 text-sm mt-1">
              {errors.synopsis.message}
            </p>
          )}
        </div>

        {/* Autores */}
        <div>
          <label
            htmlFor="authorIds"
            className="block text-sm font-medium text-gray-700"
          >
            Autores
          </label>
          <select
            id="authorIds"
            {...register("authorIds")}
            multiple
            className={`${inputClasses} h-32`}
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.authorIds && (
            <p className="text-red-600 text-sm mt-1">
              {errors.authorIds.message}
            </p>
          )}
        </div>

        {/* Categorias */}
        <div>
          <label
            htmlFor="categoryIds"
            className="block text-sm font-medium text-gray-700"
          >
            Categorias (opcional)
          </label>
          <select
            id="categoryIds"
            {...register("categoryIds")}
            multiple
            className={`${inputClasses} h-32`}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryIds && (
            <p className="text-red-600 text-sm mt-1">
              {errors.categoryIds.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Ano de Publicação */}
          <div>
            <label
              htmlFor="publicationYear"
              className="block text-sm font-medium text-gray-700"
            >
              Ano de Publicação
            </label>
            <input
              id="publicationYear"
              type="number"
              {...register("publicationYear")}
              className={inputClasses}
            />
            {errors.publicationYear && (
              <p className="text-red-600 text-sm mt-1">
                {errors.publicationYear.message}
              </p>
            )}
          </div>
          {/* Número de Páginas */}
          <div>
            <label
              htmlFor="pageCount"
              className="block text-sm font-medium text-gray-700"
            >
              Nº de Páginas
            </label>
            <input
              id="pageCount"
              type="number"
              {...register("pageCount")}
              className={inputClasses}
            />
            {errors.pageCount && (
              <p className="text-red-600 text-sm mt-1">
                {errors.pageCount.message}
              </p>
            )}
          </div>
        </div>

        {/* URL da Capa */}
        <div>
          <label
            htmlFor="coverUrl"
            className="block text-sm font-medium text-gray-700"
          >
            URL da Capa
          </label>
          <input
            id="coverUrl"
            {...register("coverUrl")}
            className={inputClasses}
          />
          {errors.coverUrl && (
            <p className="text-red-600 text-sm mt-1">
              {errors.coverUrl.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isPending} className={buttonClasses}>
          {isPending
            ? "Salvando..."
            : isEditMode
            ? "Salvar Alterações"
            : "Salvar Livro"}
        </button>
      </form>
    </div>
  );
}
