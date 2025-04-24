// import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../api/backend";
// import Notification from "../components/Notifications";

const loginSchema = z.object({
  email: z.string().email({ message: "Email no valido" }),
  password: z.string().min(8, { message: "Tu contraseña debe tener al menos 8 caracteres" }),
});

export type FormFields = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  // const [notification, setNotification] = useState({
  //   text: "",
  //   type: "error" as "success" | "error",
  //   show: false,
  // });

  const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
    // if (data.email === "test@example.com" && data.password === "password123") {
    //   setNotification({
    //     text: "Inicio de sesión exitoso.",
    //     type: "success",
    //     show: true,
    //   });
    // } else {
    //   setNotification({
    //     text: "Revise sus credenciales.",
    //     type: "error",
    //     show: true,
    //   });
    // }
    console.log("FORM VALUES --> ", formData);
    console.log("ENVIANDO AL SERVIDOR...");

    try {
      const { data, status } = await login(formData);
      console.log("DATA DEL SERVIDOR LOGINFORM --> ", data);
      console.log("STATUS DEL SERVIDOR LOGINFORM --> ", status);

      if (!data) {
        throw new Error("Error al intentar ingresar");
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        message: error as string,
      });
    }
  };

  return (
    <div className="bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg rounded-lg bg-gray-800 p-8 text-white shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-indigo-400">
          Login para Músicos Emergentes
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && <p className="mt-1 h-6 text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && <p className="mt-1 h-6 text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          {isSubmitting ? "Iniciando sesion..." : "Iniciar Sesión"}
          {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        </button>
      </form>

      {/* <Notification
        text={notification.text}
        type={notification.type}
        show={notification.show}
        onClose={() => {
          setNotification({ ...notification, show: false });
        }}
      /> */}
    </div>
  );
};

export default Login;
