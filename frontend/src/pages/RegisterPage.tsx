import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

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
    path: ["confirmPassword"], // Indica qual campo receberá o erro
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
      // Redireciona para o login com uma mensagem de sucesso (opcional)
      navigate("/login", {
        state: { message: "Conta criada com sucesso! Faça o login." },
      });
    } catch (error: unknown) {
      // O backend retorna 409 Conflict se o email já existir
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setRegisterError("Este email já está em uso.");
      } else {
        setRegisterError("Ocorreu um erro. Tente novamente.");
      }
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              {...register("name")}
              className="mt-1 block w-full ..."
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full ..."
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full ..."
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="mt-1 block w-full ..."
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {registerError && (
            <p className="text-sm text-red-600 text-center">{registerError}</p>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full ...">
            {isSubmitting ? "Criando..." : "Criar conta"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}
