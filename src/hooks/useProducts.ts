import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const apiProducts = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const useFetch = <T>(key: string, endpoint: string): UseQueryResult<T> => {
  const fetchData = async (): Promise<T> => {
    try {
      const { data } = await apiProducts.get<T>(endpoint);

      if (!data) {
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
    queryKey: [key],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useFetch;
