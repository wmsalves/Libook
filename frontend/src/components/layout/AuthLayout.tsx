import type { ReactNode } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-primary to-background">
      {/* Coluna da Esquerda (Branding e Funcionalidades) */}
      <div className="hidden lg:flex w-1/2 flex-col items-start justify-center text-cream p-12 lg:p-24">
        <h2 className="font-serif text-4xl font-bold mb-6">
          Sua jornada literária começa aqui.
        </h2>
        <p className="mb-8 text-lg text-cream/80">
          Descubra, organize e avalie os livros que marcam sua vida.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
            <span>Explore um catálogo vasto e diversificado.</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
            <span>Crie listas personalizadas: Quero Ler, Lendo e Lido.</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
            <span>Compartilhe suas opiniões com avaliações e resenhas.</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
            <span>
              Encontre seu próximo livro favorito com nossa busca inteligente.
            </span>
          </li>
        </ul>
      </div>

      {/* Coluna da Direita (Formulário) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
