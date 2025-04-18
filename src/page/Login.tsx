import { useForm } from "react-hook-form";

interface LoginInputs {
  email: string;
  password: string;
}

  const Login = () => { 
    const { register, handleSubmit } = useForm<LoginInputs>();
    const onSubmit = (data: LoginInputs) => {
            console.log("Datos de inicio de sesión:", data);
    };

  return (
  <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="">Login para Músicos Emergentes</h2>

        <div className="mb-4">
          <label htmlFor="email" className="">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "El correo electrónico es obligatorio" })}
            className=""
          />
          {errors.email && <p className="">{errors.email.message}</p>}
        </div>

        <div className="">
          <label htmlFor="" className="">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className=""
          />
          {errors.password && <p className="t">{errors.password.message}</p>}
        </div>

        <button type="submit" className="">
          Iniciar Sesión
        </button>
      </form>
  </div>
  );
};

export default Login;

