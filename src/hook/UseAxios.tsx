
import { useState, useEffect } from "react";

type ApiState<T> = {
  response: T | null;
  error: string;
  loading: boolean
};

export function useApi<T>(requestParams: Promise<T>): ApiState<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = async (request: Promise<T>) => {
    try {
      console.log(111);
      const result = await request;
      setResponse(result);
    } catch(error) {
      setError(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData(requestParams);
  }, []);

  return { response, error, loading };
}
