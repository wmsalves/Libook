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
