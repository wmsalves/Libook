import { useReviews } from "../services/books";
import { Star } from "lucide-react";

interface ReviewsListProps {
  bookId: string;
}

export function ReviewsList({ bookId }: ReviewsListProps) {
  const { data: reviews, isLoading, isError } = useReviews(bookId);

  if (isLoading) {
    return <p className="text-text-400">Carregando avaliações...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600">Não foi possível carregar as avaliações.</p>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-text-400">
        Este livro ainda não tem avaliações. Seja o primeiro!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-text border-b border-text-100 pb-2">
        Avaliações de Leitores
      </h3>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-secondary-100 p-4 rounded-lg border border-text-100"
        >
          <div className="flex justify-between items-center">
            <p className="font-bold text-text">{review.user.name}</p>

            {/* ⭐ Avaliação em estrelas */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "fill-primary text-primary"
                      : "text-text-200"
                  }
                />
              ))}
            </div>
          </div>

          {review.comment && <p className="mt-2 text-text">{review.comment}</p>}

          <p className="mt-2 text-xs text-text-300 text-right">
            {new Date(review.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      ))}
    </div>
  );
}
