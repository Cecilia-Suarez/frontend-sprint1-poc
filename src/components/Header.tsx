import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "./UserMenu";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 flex w-full items-center justify-around bg-gray-900 p-4 shadow">
      <Link to="/">
        <h1 className="text-white">Sprint 1</h1>
      </Link>
      <nav className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:underline">
              Registrarse
            </Link>
            <Link to="/MusicList" className="hover:underline">
              Lista de Músicos
            </Link>
            <Link to="/products" className="hover:underline">
              Productos
            </Link>
          </>
        ) : (
          <UserMenu />
        )}
      </nav>
    </header>
  );
};

export default Header;
