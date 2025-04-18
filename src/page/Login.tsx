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
        className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Login para Músicos Emergentes
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "El correo electrónico es obligatorio" })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className="w-full border border-gray-700 p-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 rounded text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;

