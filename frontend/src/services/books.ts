import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import type { Book } from "../types/index";

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
