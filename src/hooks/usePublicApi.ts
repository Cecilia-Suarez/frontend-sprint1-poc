import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const publicApiInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const usePublicApi = <T>(
  queryKey: string[],
  endpoint: string,
  options?: AxiosRequestConfig,
): UseQueryResult<T> => {
  const fetchData = async (): Promise<T> => {
    try {
      const response = await publicApiInstance.get<T>(endpoint, options);

      if (!response.data) {
        throw new Error("No data was received from the API");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching the data");
    }
  };
  return useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export default usePublicApi;
