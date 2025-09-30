import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
