import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import type { Book, Review } from "../types/index";

interface CreateReviewPayload {
  rating: number;
  comment?: string;
}

// Função que busca os livros na API
async function fetchBooks(): Promise<Book[]> {
  const { data } = await apiClient.get("/books");
  return data;
}

// Hook customizado que usa o React Query
export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
}

// Função que busca um livro por ID
async function fetchBookById(id: string): Promise<Book> {
  const { data } = await apiClient.get(`/books/${id}`);
  return data;
}

export function useBook(id: string) {
  return useQuery({
    // A chave de cache agora inclui o ID para ser única por livro
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id, // A query só será executada se o ID existir
  });
}

// Função que busca as resenhas de um livro
async function fetchReviewsByBookId(bookId: string): Promise<Review[]> {
  const { data } = await apiClient.get(`/books/${bookId}/reviews`);
  return data;
}

// Hook que busca as resenhas
export function useReviews(bookId: string) {
  return useQuery({
    queryKey: ["reviews", bookId],
    queryFn: () => fetchReviewsByBookId(bookId),
    enabled: !!bookId,
  });
}

// Função que cria uma nova resenha
async function createReview(
  bookId: string,
  payload: CreateReviewPayload
): Promise<Review> {
  const { data } = await apiClient.post(`/books/${bookId}/reviews`, payload);
  return data;
}

// Hook de "mutação" para criar uma resenha
export function useCreateReview(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(bookId, payload),
    onSuccess: () => {
      // Invalida e busca novamente a lista de resenhas após o sucesso
      // para mostrar a nova resenha imediatamente.
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
    },
  });
}
