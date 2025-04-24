import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "@/api/api";

const useFetch = <T>(
  key: string,
  endpoint: string,
  page?: number,
  size?: number,
): UseQueryResult<T> => {
  const fetchData = async (): Promise<T> => {
    try {
      const { data } = await api.get<T>(endpoint, { params: { page, size } });

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
    queryKey: [key, page],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useFetch;
