import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import {
  type Author,
  type Book,
  type Category,
  type LibraryBook,
  type PaginatedResponse,
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

interface SearchResult {
  hits: Book[];
}

// --- LIVROS E CATÁLOGO PÚBLICO ---

async function fetchBooks(options: {
  sortBy: string;
  page: number;
}): Promise<PaginatedResponse<Book>> {
  const { sortBy, page } = options;
  const { data } = await apiClient.get("/books", {
    params: { sortBy, page, limit: 12 },
  });
  return data;
}

export function useBooks(options: { sortBy: string; page: number }) {
  const { sortBy, page } = options;
  return useQuery({
    queryKey: ["books", { sortBy, page }],
    queryFn: () => fetchBooks({ sortBy, page }),
    // Mantém os dados da página anterior visíveis enquanto a nova carrega
    staleTime: 0,
    placeholderData: (prevData) => prevData,
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
    enabled: options?.enabled ?? !!id,
  });
}

// --- BUSCA ---

async function searchBooks(query: string): Promise<SearchResult> {
  const { data } = await apiClient.get("/search", {
    params: { q: query },
  });
  return data;
}

export function useSearchBooks(query: string) {
  return useQuery({
    queryKey: ["search-books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query && query.length > 1,
  });
}

// --- AVALIAÇÕES (REVIEWS) ---

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

// --- LISTAS DE LEITURA (STATUS) ---

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
      // Também invalida a "Minha Biblioteca" para refletir a mudança
      queryClient.invalidateQueries({ queryKey: ["my-library"] });
    },
  });
}

// --- MINHA BIBLIOTECA ---

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

// --- PAINEL DE ADMIN ---

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

async function deleteBook(bookId: string): Promise<void> {
  await apiClient.delete(`/books/${bookId}`);
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
