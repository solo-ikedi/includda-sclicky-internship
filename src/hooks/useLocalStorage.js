// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

// This hook helps your app remember things in the browser's local storage.
// It's like a little notepad for your app!
function useLocalStorage(key, initialValue) {
  // We use 'useState' to keep track of the value, just like regular React state.
  // The function inside useState tries to load the value from local storage first.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get the item from local storage using its 'key' (name).
      const item = window.localStorage.getItem(key);
      // If it's there, we parse it from text back into a JavaScript object.
      // If not, we use the 'initialValue' you provided.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If something goes wrong (like local storage is full), we'll see an error.
      console.error("Error reading from localStorage:", error);
      return initialValue; // Fallback to initial value if there's an error.
    }
  });

  // 'useEffect' makes sure that whenever our 'storedValue' changes,
  // we save the new value back into local storage.
  useEffect(() => {
    try {
      // Convert the JavaScript object back into text (JSON string) to save it.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Log any errors if saving fails.
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]); // This effect runs whenever 'key' or 'storedValue' changes.

  // We return the value and a way to update it, just like useState.
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
