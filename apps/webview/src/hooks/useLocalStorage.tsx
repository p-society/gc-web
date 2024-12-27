import { useState } from "react";

type SetValue<T> = T | ((prevalue: T) => T);

export function useLocalStorage<T> (keyName: string, defaultValue: T){
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.warn(`Error reading then localStorage "${keyName}":`, err);
      return defaultValue;
    }
  });
  const setValue = (newValue: SetValue<T>) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue

      setStoredValue(valueToStore)

      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {

      console.log(`Error setting localStorage key "${keyName}":`, err);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(keyName);
      setStoredValue(defaultValue);
    } catch (err) {
      console.log(`Error clearing localStorage key "${keyName}":`, err);
    }
  }
  return [storedValue, setValue, clearValue] as const;
};
