import useAuth from "@/hooks/useAuth";
import avatar from "@/assets/avatar.svg";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center text-gray-500">Cargando usuario...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative w-full max-w-md rounded-xl bg-gray-800 p-8 pt-16 shadow-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <img src={avatar} alt="avatar" className="h-24 w-24 rounded-full bg-gray-900 shadow-md" />
        </div>

        <div className="mt-6 space-y-4 text-center">
          <h2 className="text-xl font-bold text-white">{user.name}</h2>

          <div>
            <p className="label-text">Correo electrónico</p>
            <p className="value-text">{user.email || "No disponible"}</p>
          </div>

          <div>
            <p className="label-text">Rol</p>
            <p className="value-text capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
