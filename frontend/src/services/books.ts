import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import {
  type Author,
  type Book,
  type Category,
  type LibraryBook,
  ReadingStatus,
  type Review,
  type UserStatuses,
} from "../types/index";

// --- PAYLOADS E TIPOS ESPECÍFICOS DE SERVIÇO ---

interface CreateReviewPayload {
  rating: number;
  comment?: string;
}

interface CreateBookPayload {
  title: string;
  synopsis?: string;
  publicationYear?: number;
  pageCount?: number;
  coverUrl?: string;
  authorIds: string[];
  categoryIds?: string[];
}

type UpdateBookPayload = Partial<CreateBookPayload>;

// --- FUNÇÕES E HOOKS ---

async function fetchBooks(sortBy: string): Promise<Book[]> {
  const { data } = await apiClient.get("/books", {
    params: { sortBy },
  });
  return data;
}

export function useBooks(sortBy: string) {
  return useQuery({
    queryKey: ["books", sortBy],
    queryFn: () => fetchBooks(sortBy),
  });
}

async function fetchBookById(id: string): Promise<Book> {
  const { data } = await apiClient.get(`/books/${id}`);
  return data;
}

export function useBook(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    // Usa a opção 'enabled' se fornecida, senão o padrão é verificar se o id existe
    enabled: options?.enabled ?? !!id,
  });
}

async function fetchReviewsByBookId(bookId: string): Promise<Review[]> {
  const { data } = await apiClient.get(`/books/${bookId}/reviews`);
  return data;
}

export function useReviews(bookId: string) {
  return useQuery({
    queryKey: ["reviews", bookId],
    queryFn: () => fetchReviewsByBookId(bookId),
    enabled: !!bookId,
  });
}

async function createReview(
  bookId: string,
  payload: CreateReviewPayload
): Promise<Review> {
  const { data } = await apiClient.post(`/books/${bookId}/reviews`, payload);
  return data;
}

export function useCreateReview(bookId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(bookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
    },
  });
}

async function fetchUserStatuses(): Promise<UserStatuses> {
  const { data } = await apiClient.get("/reading-lists/statuses");
  return data;
}

export function useUserStatuses() {
  return useQuery({
    queryKey: ["user-statuses"],
    queryFn: fetchUserStatuses,
  });
}

async function setBookStatus(
  bookId: string,
  status: ReadingStatus
): Promise<void> {
  await apiClient.put(`/reading-lists/books/${bookId}/status`, { status });
}

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
      queryClient.invalidateQueries({ queryKey: ["user-statuses"] });
    },
  });
}

async function fetchMyLibrary(): Promise<LibraryBook[]> {
  const { data } = await apiClient.get("/reading-lists/my-library");
  return data;
}

export function useMyLibrary() {
  return useQuery({
    queryKey: ["my-library"],
    queryFn: fetchMyLibrary,
  });
}

async function fetchAuthors(): Promise<Author[]> {
  const { data } = await apiClient.get("/authors");
  return data;
}

export function useAuthors() {
  return useQuery({ queryKey: ["authors"], queryFn: fetchAuthors });
}

async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get("/categories");
  return data;
}

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
}

async function createBook(payload: CreateBookPayload): Promise<Book> {
  const { data } = await apiClient.post("/books", payload);
  return data;
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

async function updateBook({
  bookId,
  payload,
}: {
  bookId: string;
  payload: UpdateBookPayload;
}): Promise<Book> {
  const { data } = await apiClient.patch(`/books/${bookId}`, payload);
  return data;
}

export function useUpdateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.setQueryData(["book", updatedBook.id], updatedBook);
    },
  });
}
