import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { logoutUser } from '../utils/auth'; // Adjust import path as needed

// Define types for user and context
interface User {
  id?: string | number;
  name?: string;
  email: string;
  role?: string;
  // Add any other user properties your application uses
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => { },
  logout: async () => { },
  updateUser: () => { },
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for token
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
          setIsLoading(false);
          return;
        }

        // Get user data if token exists
        const userDataString = localStorage.getItem('user');

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken' && !event.newValue) {
        // Token was removed in another tab
        setUser(null);
      } else if (event.key === 'user') {
        if (event.newValue) {
          setUser(JSON.parse(event.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function
  const login = (token: string, userData: User) => {
    // Store token
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe) {
      localStorage.setItem('authToken', token);
    } else {
      sessionStorage.setItem('authToken', token);
    }

    // Store user data
    localStorage.setItem('user', JSON.stringify(userData));

    // Update state
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      // Get the auth token for the API call
      // const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      // Call logout API if available
      // if (token) {
      //   try {
      //     await fetch('http://localhost:8000/api/auth/logout', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${token}`
      //       }
      //     });
      //   } catch (error) {
      //     console.warn('Error calling logout API:', error);
      //     // Continue with local logout
      //   }
      // }

      // Clear all auth data
      logoutUser();

      // Update state
      setUser(null);

      // Dispatch storage event for other tabs
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Logout error:', error);
      // Ensure we still clear local data
      logoutUser();
      setUser(null);
    }
  };

  // Update user information
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };

    // Update in storage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update state
    setUser(updatedUser);
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};