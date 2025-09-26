import axios from "axios";

export const apiClient = axios.create({
  // URL da API
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});
