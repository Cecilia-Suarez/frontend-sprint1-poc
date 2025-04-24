import api from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../context/AuthContext";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const useLogin = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      try {
        const response = await api.post<string>("/auth/login", payload);
        const token = response.data;
        localStorage.setItem("token", token);
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
        console.log("Usuario logueado");
        return { token };
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const message = error.response?.data
            ? (error.response.data as string)
            : "Unknown error during login";
          throw new Error(message);
        } else {
          throw new Error("Unknown error during login");
        }
      }
    },
  });
};

export default useLogin;
