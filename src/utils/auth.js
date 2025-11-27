// src/utils/auth.js

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

/**
 * Dispatch a global event so components (like Navbar)
 * can react to login/logout instantly.
 */
const dispatchAuthChange = () => {
  window.dispatchEvent(new Event("authChange"));
};

/**
 * Save auth token + user object into localStorage.
 * Called after successful login.
 */
export const setAuthData = (token, user) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Error saving auth data:", err);
  }

  dispatchAuthChange();
};

/**
 * Get stored token
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

/**
 * Get stored user object (parsed safely)
 */
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.warn("Invalid user JSON in localStorage. Resetting user.");
    clearAuthData(); // optional but prevents broken state
    return null;
  }
};

/**
 * Clear token + user
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error("Error clearing auth data:", err);
  }

  dispatchAuthChange();
};

/**
 * Logout user
 */
export const logoutUser = () => {
  clearAuthData();
};

/**
 * Check if token exists (user is logged in)
 */
export const isLoggedIn = () => !!getToken();
