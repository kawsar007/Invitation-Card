// auth.js or auth.ts - Create this file in your utils folder
/**
 * Auth utility functions for handling authentication-related functionality
 */

// Function to check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return !!token;
}

// Function to get authentication token
export const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Function to get user data
export const getUserData = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Function to handle user logout
export const logoutUser = () => {
  // Clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');

  // Clear sessionStorage
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');

  // You can add additional clean-up here if needed
};