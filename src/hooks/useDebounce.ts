import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on unmount)
      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}