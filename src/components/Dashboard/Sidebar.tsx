import useAuth from "@/hooks/useAuth";
import React from "react";

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const { user } = useAuth();

  const ROLE_USER = "ROLE_USER";
  const ROLE_ADMIN = "ROLE_ADMIN";

  return (
    <div className="h-screen w-64 flex-col bg-gray-900 p-4">
      <h2 className="mb-6 text-xl font-bold">Dashboard</h2>
      <ul className="space-y-4">
        {user?.role === ROLE_USER && (
          <>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect("books");
                }}
                className="w-full text-left hover:underline"
              >
                Libros
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect("profile");
                }}
                className="w-full text-left hover:underline"
              >
                Perfil
              </button>
            </li>
          </>
        )}

        {user?.role === ROLE_ADMIN && (
          <>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect("books");
                }}
                className="w-full text-left hover:underline"
              >
                Libros
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect("users");
                }}
                className="w-full text-left hover:underline"
              >
                Usuarios
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect("profile");
                }}
                className="w-full text-left hover:underline"
              >
                Perfil
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
