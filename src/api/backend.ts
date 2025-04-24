import axios, { isAxiosError } from "axios";
import { FormFields as RegisterFormFields } from "../page/Register";
import { FormFields as LoginFormFields } from "../page/Login";

export const backend = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// const rejectWithError = (err: unknown) =>
//   Promise.reject(err instanceof Error ? err : new Error(String(err)));

// //Interceptor de requests: agrega el token
// backend.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, rejectWithError);

// //Interceptor de responses: maneja errores globales (como 401)
// backend.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       console.warn("Token inválido o expirado. Redirigiendo al login...");

//       localStorage.removeItem("token"); //limpieza del token
//       window.location.href = "/login"; //redirección (ajustá la ruta según tu app)
//     }

//     return rejectWithError(error);
//   },
// );

export const register = (data: RegisterFormFields) => backend.post<string>("/auth/register", data);

export const login = (data: LoginFormFields) => backend.post<string>("/auth/login", data);

// export const login = async (data: LoginFormFields) => {
//   try {
//     const response = await backend.post<string>("/auth/login", data);
//     // Devolvemos tanto los datos como el status, en caso de que lo necesites
//     return response;
//   } catch (error: unknown) {
//     // Capturamos y manejamos el error tipado de Axios
//     if (isAxiosError(error)) {
//       // Si el backend respondió
//       if (error.response) {
//         // Supongamos que el backend envía { message: string } en el error
//         const errorMessage =
//           (error.response.data as { message?: string }).message ?? "Error al iniciar sesión";
//         // Propagamos el error para que el componente lo capture
//         throw new Error(errorMessage);
//       }
//       // Si el request se hizo pero no hubo respuesta
//       else if (error.request) {
//         throw new Error("No se pudo conectar con el servidor");
//       } else {
//         throw new Error("Error inesperado");
//       }
//     } else {
//       // Error que no proviene de Axios
//       throw new Error("Error desconocido");
//     }
//   }
// };
