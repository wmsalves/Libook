import { useAuth } from "../hooks/useAuth";

export function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Página Inicial</h1>
      {user ? <p>Bem-vindo ao Libook, {user.name}!</p> : <p>Carregando...</p>}
      <button onClick={logout}>Sair</button>
    </div>
  );
}
