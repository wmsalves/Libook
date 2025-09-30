import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import type {
  Book,
  LibraryBook,
  ReadingStatus,
  Review,
  UserStatuses,
} from "../types/index";

interface CreateReviewPayload {
  rating: number;
  comment?: string;
}

// Função que busca os livros na API
async function fetchBooks(sortBy: string): Promise<Book[]> {
  const { data } = await apiClient.get("/books", {
    params: { sortBy },
  });
  return data;
}

// Hook customizado que usa o React Query
export function useBooks(sortBy: string) {
  return useQuery({
    queryKey: ["books", sortBy],
    queryFn: () => fetchBooks(sortBy),
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

// Função que busca os status de leitura do usuário
async function fetchUserStatuses(): Promise<UserStatuses> {
  const { data } = await apiClient.get("/reading-lists/statuses");
  return data;
}

// Hook que busca os status
export function useUserStatuses() {
  return useQuery({
    queryKey: ["user-statuses"],
    queryFn: fetchUserStatuses,
  });
}

// Função que define o status de um livro
async function setBookStatus(
  bookId: string,
  status: ReadingStatus
): Promise<void> {
  await apiClient.put(`/reading-lists/books/${bookId}/status`, { status });
}

// Hook de mutação para definir o status
export function useSetBookStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookId,
      status,
    }: {
      bookId: string;
      status: ReadingStatus;
    }) => setBookStatus(bookId, status),
    onSuccess: () => {
      // Invalida a query de status para buscar os dados atualizados
      queryClient.invalidateQueries({ queryKey: ["user-statuses"] });
    },
  });
}

// Função que busca os livros da biblioteca do usuário
async function fetchMyLibrary(): Promise<LibraryBook[]> {
  const { data } = await apiClient.get("/reading-lists/my-library");
  return data;
}

// Hook que usa React Query para buscar a biblioteca
export function useMyLibrary() {
  return useQuery({
    queryKey: ["my-library"],
    queryFn: fetchMyLibrary,
  });
}
