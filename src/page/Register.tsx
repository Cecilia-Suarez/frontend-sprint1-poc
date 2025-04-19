import { useState } from "react";
import { useForm } from "react-hook-form";
import Notification from "../components/Notifications";

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
  genero?: string; // Opcional
  experience?: number; // Opcional
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();
  const [notification, setNotification] = useState({
    text: "",
    type: "error" as "success" | "error",
    show: false,
  });

  const onSubmit = (data: RegisterInputs): void => {
    if (data.email === "registrado@example.com") {
      setNotification({
        text: "Email ya registrado!!.",
        type: "error",
        show: true,
      });
    } else if (!data.name || !data.password || !data.email) {
      setNotification({
        text: "Revise los campos!!.",
        type: "error",
        show: true,
      });
    } else {
      setNotification({
        text: "Registrado con Ëxito!!.",
        type: "success",
        show: true,
      });
    }
  };

  return (
    <div className="flex bg-gray-900">
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event).catch((error: unknown) => {
            if (error instanceof Error) {
              console.error("Error durante el submit:", error.message);
            } else {
              console.error("Error durante el submit:", error);
            }
          });
        }}
        className="w-full max-w-lg rounded-lg bg-gray-800 p-8 text-white shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-indigo-400">
          Registrate y que el Mundo te Escuche!!
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-gray-300">
            Nombre Artístico
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "El nombre artístico es obligatorio" })}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-gray-300">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "El correo electrónico es obligatorio" })}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && <p className="mt-1 text-red-500">{errors.password.message}</p>}
        </div>

        {/* Campo opcional: Género Musical */}
        <div className="mb-4">
          <label htmlFor="genero" className="mb-2 block text-gray-300">
            Género Musical (Opcional)
          </label>
          <input
            type="text"
            id="genero"
            {...register("genero")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Campo opcional: Años de Experiencia */}
        <div className="mb-4">
          <label htmlFor="experience" className="mb-2 block text-gray-300">
            Años de Experiencia (Opcional)
          </label>
          <input
            type="number"
            id="experience"
            {...register("experience", { valueAsNumber: true })}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-700 focus:outline-none"
        >
          {isSubmitting ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      <Notification
        text={notification.text}
        type={notification.type}
        show={notification.show}
        onClose={() => {
          setNotification({ ...notification, show: false });
        }}
      />
    </div>
  );
};

export default Register;
