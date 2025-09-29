import { useReviews } from "../services/books";

interface ReviewsListProps {
  bookId: string;
}

export function ReviewsList({ bookId }: ReviewsListProps) {
  const { data: reviews, isLoading, isError } = useReviews(bookId);

  if (isLoading)
    return <p className="text-gray-500">Carregando avaliações...</p>;
  if (isError)
    return (
      <p className="text-red-500">Não foi possível carregar as avaliações.</p>
    );

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-gray-500">
        Este livro ainda não tem avaliações. Seja o primeiro!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Avaliações de Leitores
      </h3>
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-800">{review.user.name}</p>
            <p className="text-sm text-gray-500">
              Nota:{" "}
              <span className="font-bold text-yellow-500">
                {review.rating}/5
              </span>
            </p>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
          <p className="mt-2 text-xs text-gray-400 text-right">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
