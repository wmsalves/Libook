import { createContext, useState, useEffect, type ReactNode } from "react";
import { apiClient } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useUserStatuses } from "../services/books";
import type { UserStatuses } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userStatuses: UserStatuses;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  // <<-- BUSCA OS STATUS QUANDO O USUÁRIO ESTÁ AUTENTICADO -->>
  const { data: userStatuses = {} } = useUserStatuses();
  // <<-- useEffect -->>
  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem("libook.token");

      if (token) {
        try {
          // Define o token no cabeçalho do Axios para a verificação
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          // Busca o perfil para validar o token
          const profileResponse = await apiClient.get("/auth/profile");
          setUser(profileResponse.data);
        } catch (error) {
          console.error("Sessão inválida, limpando token:", error);
          // Se o token for inválido, limpa o storage
          localStorage.removeItem("libook.token");
        }
      }
    }

    loadUserFromToken();
  }, []); // O array vazio garante que isso rode apenas uma vez

  async function login(email: string, password: string) {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;

      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;

      const profileResponse = await apiClient.get("/auth/profile");
      setUser(profileResponse.data);

      localStorage.setItem("libook.token", access_token);
    } catch (error) {
      console.error("Falha no login:", error);
      throw error;
    }
  }

  // <<-- FUNÇÃO DE LOGOUT -->>
  function logout() {
    setUser(null);
    localStorage.removeItem("libook.token");
    // Remove o cabeçalho de autorização do Axios
    delete apiClient.defaults.headers.common["Authorization"];
    navigate("/login"); // Redireciona o usuário para a página de login
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, userStatuses }}
    >
      {children}
    </AuthContext.Provider>
  );
}
