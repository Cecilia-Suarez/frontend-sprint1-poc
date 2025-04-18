import api from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      try {
        const { data } = await api.post<LoginResponse>("/auth/login", payload);
        localStorage.setItem("token", data.token);
        console.log(data);
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
