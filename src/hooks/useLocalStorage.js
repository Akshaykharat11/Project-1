import { useState, useEffect } from "react";


export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}
