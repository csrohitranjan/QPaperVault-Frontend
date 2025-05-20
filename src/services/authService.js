// src/services/authService.js
import axios from "axios";

// Set up Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:8200",
  headers: {
    "Content-Type": "application/json",
  },
});

// Login API
export const loginUser = (data) => {
  return API.post("/api/v1/users/loginUser", data);
};

// Signup API
export const registerUser = (data) => {
  return API.post("/api/v1/users/registerUser", data);
};
