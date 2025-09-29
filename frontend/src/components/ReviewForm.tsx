import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReview } from "../services/books";

const reviewSchema = z.object({
  rating: z.coerce.number().min(1, "Nota é obrigatória").max(5),
  comment: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  bookId: string;
}

export function ReviewForm({ bookId }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const { mutate: createReview, isPending } = useCreateReview(bookId);

  function handleCreateReview(data: ReviewFormData) {
    createReview(data, {
      onSuccess: () => {
        reset(); // Limpa o formulário após o envio
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateReview)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Deixe sua avaliação
      </h3>
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Nota (1 a 5)
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          {...register("rating")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comentário (opcional)
        </label>
        <textarea
          id="comment"
          rows={3}
          {...register("comment")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar Avaliação"}
      </button>
    </form>
  );
}
