import { useForm } from "react-hook-form";

interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit = (data: LoginInputs): void => {
    console.log("Datos de inicio de sesión:", data);
  };

  return (
    <div className="flex bg-gray-900">
      <form
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event).catch((error: unknown) => {
            if (error instanceof Error) {
              console.error("Error durante el submit:", error.message);
            } else {
              console.error("Error durante el submit:", error);
            }
          });
        }}
        className="w-full max-w-md rounded-lg bg-gray-800 p-8 text-white shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-indigo-400">
          Login para Músicos Emergentes
        </h2>

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

        <button
          type="submit"
          className="w-full rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-700 focus:outline-none"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
