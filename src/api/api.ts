import axios from "axios";
import { FormFields as RegisterFormFields } from "@/page/Register";
import { FormFields as LoginFormFields } from "@/page/Login";

const api = axios.create({
  baseURL: "https://ftl-equipo-22-noche-13.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

const rejectWithError = (err: unknown) =>
  Promise.reject(err instanceof Error ? err : new Error(String(err)));

//Interceptor de requests: agrega el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token enviado:", config.headers.Authorization);
  }

  return config;
}, rejectWithError);

export const register = (data: RegisterFormFields) => api.post<string>("/auth/register", data);

export const login = (data: LoginFormFields) => api.post<string>("/auth/login", data);
