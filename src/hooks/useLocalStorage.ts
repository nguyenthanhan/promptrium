import { useState, useEffect, useRef } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

// Helper function to detect plain objects
function isPlainObject(value: any): value is Record<string, any> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);
  const initialValueRef = useRef(initialValue);

  // Update ref when key or initialValue changes
  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [key, initialValue]);

  // Initialize from localStorage after component mounts
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Only merge if both parsed and initialValue are plain objects
        if (isPlainObject(parsed) && isPlainObject(initialValueRef.current)) {
          setStoredValue({ ...initialValueRef.current, ...parsed });
        } else {
          // Use parsed value directly for non-objects or when initialValue isn't an object
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      // Set mounted flag only after load completes to avoid extra render with defaults
      setMounted(true);
    }
  }, [key]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (mounted && typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Return initialValue until mounted to prevent hydration mismatch
  return [mounted ? storedValue : initialValue, setValue];
}
