import { useForm } from "react-hook-form";

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
    formState: { errors }
  } = useForm<RegisterInputs>();

  const onSubmit = (data: RegisterInputs) => {
    console.log("Datos del músico registrado:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h2 className="">Registro para Músicos Emergentes</h2>

      <div className="">
        <label htmlFor="name" className="">
          Nombre Artístico
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "El nombre artístico es obligatorio" })}
          className=""
        />
        {errors.name && <p className="">{errors.name.message}</p>}
      </div>

      <div className="">
        <label htmlFor="email" className="">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "El email es obligatorio" })}
          className=""
        />
        {errors.email && <p className="">{errors.email.message}</p>}
      </div>

      <div className="">
        <label htmlFor="password" className="">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "La contraseña es obligatoria" })}
          className=""
        />
        {errors.password && <p className="">{errors.password.message}</p>}
      </div>

      <div className="">
        <label htmlFor="genero" className="">
          Género Musical (Opcional)
        </label>
        <input
          type="text"
          id="genero"
          {...register("genero")}
          className=""
        />
      </div>

      <div className="">
        <label htmlFor="experience" className="">
          Años de Experiencia (Opcional)
        </label>
        <input
          type="number"
          id="experience"
          {...register("experience", { valueAsNumber: true })}
          className=""
        />
      </div>

      <button type="submit" className="">
        Registrarse
      </button>
    </form>
  );
};

export default Register;