import { createContext, useState, type ReactNode } from "react";
import { apiClient } from "../lib/axios";

// Definindo os tipos
interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function login(email: string, password: string) {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;

      // Armazena o token no cabeçalho de todas as futuras requisições do axios
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;

      // Busca os dados do perfil do usuário com o novo token
      const profileResponse = await apiClient.get("/auth/profile");
      setUser(profileResponse.data);

      // Armazena o token no localStorage para persistir o login
      localStorage.setItem("libook.token", access_token);
    } catch (error) {
      console.error("Falha no login:", error);
      // Lança o erro para que o componente de login possa tratá-lo
      throw error;
    }
  }

  function logout() {
    // Implementação futura
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
