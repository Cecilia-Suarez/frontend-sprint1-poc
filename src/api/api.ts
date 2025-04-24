import axios from "axios";
import { FormFields as RegisterFormFields } from "@/page/Register";
import { FormFields as LoginFormFields } from "@/page/Login";

const api = axios.create({
  baseURL: "https://ftl-equipo-22-noche-13.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const register = (data: RegisterFormFields) => api.post<string>("/auth/register", data);

export const login = (data: LoginFormFields) => api.post<string>("/auth/login", data);
