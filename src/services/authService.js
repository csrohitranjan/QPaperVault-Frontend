// src/services/authService.js
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:8200",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const loginUser = (data) => API.post("/api/v1/users/loginUser", data);
export const registerUser = (data) => API.post("/api/v1/users/registerUser", data);

// Question Paper APIs
export const getApprovedQuestionPapers = () =>
  API.get("/api/v1/users/getApprovedQuestionPapers");
