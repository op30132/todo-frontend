import {useEffect, useState } from "react";

function useDebounce<T>(initialValue: T, delay?: number): [T, T,React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, value, setValue];
}

export default useDebounce;