import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthors, useCategories, useCreateBook } from "../../services/books";
import { useNavigate } from "react-router-dom";

// 1. CORREÇÃO NO SCHEMA DO ZOD
const bookFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  synopsis: z.string().optional(),
  // Aceita string ou number e transforma para number ou undefined
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

type BookFormInput = z.input<typeof bookFormSchema>;
type BookFormData = z.output<typeof bookFormSchema>;

export function AdminBookFormPage() {
  const navigate = useNavigate();
  const { data: authors = [] } = useAuthors();
  const { data: categories = [] } = useCategories();
  const { mutate: createBook, isPending } = useCreateBook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInput>({
    resolver: zodResolver(bookFormSchema),
  });

  function handleCreateBook(data: BookFormData) {
    createBook(data, {
      onSuccess: () => {
        navigate("/admin/books");
      },
    });
  }

  const inputClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const buttonClasses =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50";

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Novo Livro</h1>
      <form
        onSubmit={handleSubmit(
          handleCreateBook as SubmitHandler<BookFormInput>
        )}
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

        {/* 2. ADIÇÃO DO CAMPO DE CATEGORIAS */}
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

        <button type="submit" disabled={isPending} className={buttonClasses}>
          {isPending ? "Salvando..." : "Salvar Livro"}
        </button>
      </form>
    </div>
  );
}
