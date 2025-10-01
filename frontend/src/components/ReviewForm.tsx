import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReview } from "../services/books";
// Se quiser, use seu Button:
// import { Button } from "@/components/ui/Button";

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
      onSuccess: () => reset(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateReview)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-lg font-semibold text-text">Deixe sua avaliação</h3>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-text-light"
        >
          Nota (1 a 5)
        </label>
        <input
          id="rating"
          type="number"
          min={1}
          max={5}
          step={1}
          aria-invalid={!!errors.rating || undefined}
          aria-describedby={errors.rating ? "rating-error" : undefined}
          {...register("rating")}
          className="mt-1 block w-full px-3 py-2 rounded-md border border-text-200 shadow-sm
                     placeholder-text-300 bg-white text-text
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.rating && (
          <p id="rating-error" className="mt-1 text-sm text-red-600">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-text-light"
        >
          Comentário (opcional)
        </label>
        <textarea
          id="comment"
          rows={3}
          placeholder="Compartilhe sua experiência com o livro..."
          {...register("comment")}
          className="mt-1 block w-full px-3 py-2 rounded-md border border-text-200 shadow-sm
                     placeholder-text-300 bg-white text-text
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm
                   text-sm font-medium text-white
                   bg-primary hover:bg-primary-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                   disabled:opacity-50 transition-colors"
      >
        {isPending ? "Enviando..." : "Enviar Avaliação"}
      </button>
      {/* Se preferir usar seu componente:
      <Button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar Avaliação"}
      </Button> */}
    </form>
  );
}
