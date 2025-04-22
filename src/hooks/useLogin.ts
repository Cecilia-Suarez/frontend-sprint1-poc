import api from "../api/apiAuthAndProducts";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../context/AuthContext";

interface LoginPayload {
  username: string;
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
        const { data } = await api.post<LoginResponse>("/auth/login", payload);

        localStorage.setItem("token", data.token);

        const decoded = jwtDecode<DecodedToken>(data.token);
        setUser(decoded);

        console.log("Usuario logueado");
        return data;
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
