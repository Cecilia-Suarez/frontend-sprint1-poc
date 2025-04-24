import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";
import { AxiosError } from "axios";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const useRegister = () => {
  return useMutation<unknown, Error, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      try {
        const response = await api.post("/users", data);
        console.log("Response:", response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const message = error.response?.data
            ? (error.response.data as string)
            : "Unknown error during registration";
          throw new Error(message);
        } else {
          throw new Error("Unknown error during registration");
        }
      }
    },
    onSuccess: () => {
      console.log("Registration successful");
    },
    onError: (error) => {
      console.error("Error during registration: ", error.message);
    },
  });
};

export default useRegister;
