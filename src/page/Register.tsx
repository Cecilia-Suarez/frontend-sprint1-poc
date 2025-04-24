// import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as authRegister } from "@/api/backend";
// import Notification from "../components/Notifications";

const registerSchema = z.object({
  name: z.string().min(3, { message: "Nombre obligatorio" }),
  lastName: z.string().min(3, { message: "Apellido obligatorio" }),
  email: z.string().email({ message: "Email no valido" }),
  password: z.string().min(8, { message: "Tu contraseña debe tener al menos 8 caracteres" }),
  role: z.enum(["ROLE_USER", "ROLE_ADMIN"]),
});

export type FormFields = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
  });

  // const [notification, setNotification] = useState({
  //   text: "",
  //   type: "error" as "success" | "error",
  //   show: false,
  // });

  const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
    // if (data.email === "registrado@example.com") {
    //   setNotification({
    //     text: "Email ya registrado!!.",
    //     type: "error",
    //     show: true,
    //   });
    // } else if (!data.name || !data.password || !data.email) {
    //   setNotification({
    //     text: "Revise los campos!!.",
    //     type: "error",
    //     show: true,
    //   });
    // } else {
    //   setNotification({
    //     text: "Registrado con Ëxito!!.",
    //     type: "success",
    //     show: true,cls

    //   });
    // }
    console.log("FORM VALUES --> ", formData);
    console.log("ENVIANDO AL SERVIDOR...");

    try {
      const { data, status } = await authRegister(formData);
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
          Registrate y que el Mundo te Escuche!!
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.name && <p className="mt-1 h-6 text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-gray-300">
            Apellido
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.lastName && <p className="mt-1 h-6 text-red-500">{errors.lastName.message}</p>}
        </div>

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
            {...register("password")}
            className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && <p className="mt-1 h-6 text-red-500">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-gray-300">
            Rol
          </label>
          <select {...register("role")}>
            <option value="ROLE_USER">Usuario</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          {errors.role && <p className="mt-1 h-1 text-red-500">{errors.role.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-700 focus:outline-none"
        >
          {isSubmitting ? "Registrandose..." : "Registrarse"}
        </button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
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

export default Register;
