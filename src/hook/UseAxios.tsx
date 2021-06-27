
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type ApiState<Type> = [
  Type | null,
  string,
  boolean
];

function useApi<Type>(requestParams: () => Promise<AxiosResponse<Type>>): ApiState<Type> {
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = async (request: () => Promise<AxiosResponse<Type>>) => {
    try {
      const result = await request();
      setData(result.data);
    } catch(error) {
      console.log(error);
      setError(error);
      return null;
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData(requestParams);
  }, []);

  return [data, error, loading];
}

export default useApi;