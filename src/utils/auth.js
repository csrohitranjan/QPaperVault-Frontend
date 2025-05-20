// src/utils/auth.js

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

// Save user + token
export const setAuthData = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Get token and user
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Clear auth info
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Logout function (alias for clearAuthData)
export const logoutUser = () => {
  clearAuthData();
};

// Check if logged in
export const isLoggedIn = () => !!getToken();
