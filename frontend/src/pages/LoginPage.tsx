import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const location = useLocation();
  const successMessage = location.state?.message;

  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(data: LoginFormData) {
    setLoginError(null);
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      setLoginError("Email ou senha inválidos. Tente novamente.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {successMessage && (
          <div className="mb-4 p-3 bg-secondary-200 text-secondary-900 rounded-md text-sm text-center">
            {successMessage}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center mb-6 text-text">
          Login no Libook
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-light"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              error={errors.email?.message}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-light"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              {...register("password")}
              error={errors.password?.message}
              autoComplete="current-password"
              size="md"
            />
          </div>

          {loginError && (
            <p className="text-sm text-red-600 text-center">{loginError}</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-text-400 mt-6">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary-600"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
