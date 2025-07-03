import { useEffect } from 'react';

export const useErrorHandler = (error: string | null, clearError: () => void) => {
  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);
};