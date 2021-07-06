
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type ApiState<Type> = [
  Type | null,
  string,
  boolean,
  React.Dispatch<React.SetStateAction<Record<string, never>>>
];

function useApi<Type>(requestParams: () => Promise<AxiosResponse<Type>>): ApiState<Type> {
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const [shouldRefetch, refetch] = useState({});
  const fetchData = async (request: () => Promise<AxiosResponse<Type>>) => {
    try {
      const result = await request();
      setData(result.data);
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData(requestParams);
  }, [shouldRefetch]);

  return [data, error, loading, refetch];
}

export default useApi;