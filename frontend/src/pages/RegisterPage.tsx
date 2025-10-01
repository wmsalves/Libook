import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthLayout } from "../components/layout/AuthLayout";
import axios from "axios";

// Schema de validação com confirmação de senha
const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterPage() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(data: RegisterFormData) {
    setRegisterError(null);
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login", {
        state: { message: "Conta criada com sucesso! Faça o login." },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setRegisterError("Este email já está em uso.");
      } else {
        setRegisterError("Ocorreu um erro. Tente novamente.");
      }
      console.error(error);
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-text">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-light"
            >
              Nome
            </label>
            <Input
              id="name"
              placeholder="Seu nome"
              {...register("name")}
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
              placeholder="voce@email.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
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
              placeholder="Mínimo de 8 caracteres"
              {...register("password")}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-light"
            >
              Confirmar Senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              {...register("confirmPassword")}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {registerError && (
            <p className="text-sm text-red-600 text-center">{registerError}</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar conta"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary-600"
          >
            Faça o login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
