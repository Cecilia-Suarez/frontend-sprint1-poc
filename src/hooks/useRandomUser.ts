import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import apiRandomUser from "@/api/apiRandomUser";
import { AxiosResponse } from "axios";

export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface ApiResponse {
  results: RandomUser[];
  info: Info;
}

const useRandomUser = <T>(key: string, page: number): UseQueryResult<T> => {
  const fetchData = async (): Promise<ApiResponse> => {
    try {
      const { data, status }: AxiosResponse<ApiResponse> = await apiRandomUser.get<ApiResponse>(
        "",
        { params: { results: 3, page, seed: "reactquery" } },
      );

      if (status !== 200) {
        throw new Error("No data was received from the API");
      }

      console.log("Data received:", data);

      return data;
    } catch (error) {
      console.error("Request error:", error);
      throw new Error("Error fetching the data");
    }
  };

  return useQuery({
    queryKey: [key, page],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useRandomUser;
