import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Create the context
const UserContext = createContext(null);

// Default user state
const defaultUserState = {
  isAuthenticated: false,
  user: null,
  token: null
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserState);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('authToken');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser)

          setUserData({
            isAuthenticated: true,
            user: parsedUser,
            token: storedToken
          });
        } else {
          // Make sure we reset to default if no data in storage
          setUserData(defaultUserState);
        }
      } catch (error) {
        console.error('Error loading user data from localStorage:', error);
        // Clear potentially corrupt data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');

        setUserData(defaultUserState);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, [refreshTrigger]);

  // Force a refresh of user data from localStorage
  const refreshUserData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Login function
  const login = useCallback((user, token) => {
    // Clear any existing data first
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);

    // Store in state
    setUserData({
      isAuthenticated: true,
      user,
      token
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {    // Clear state
    setUserData(defaultUserState);
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }, []);

  // Update user function
  const updateUser = useCallback((updatedUser) => {

    setUserData(prev => {
      // Create the updated user object
      const newUserData = {
        ...prev,
        user: { ...prev.user, ...updatedUser }
      };

      // Update localStorage with the complete new user object
      localStorage.setItem('user', JSON.stringify(newUserData.user));

      return newUserData;
    });
  }, []);

  const contextValue = {
    ...userData,
    login,
    logout,
    updateUser,
    refreshUserData,
    loading
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;