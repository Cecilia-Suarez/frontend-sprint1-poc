import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    handleLogout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleMenu}
        className="rounded-lg px-3 py-2 text-sm font-medium capitalize transition"
      >
        {user.name} ▼
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 shadow-lg">
          <button
            type="button"
            onClick={() => {
              void navigate("/dashboard");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-center text-sm"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogOut}
            type="button"
            className="block w-full px-4 py-2 text-center text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
