// src/api/authService.js
import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:8200";

// Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // Only set Authorization if not uploading files using FormData
    // (Axios handles Content-Type for FormData automatically, but we still need the token)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Users APIs

export const requestRegistration = (data) =>
  API.post("/api/v1/users/requestRegistration", data);

export const confirmRegistration = (token) =>
  API.get(`/api/v1/users/confirmRegistration?token=${token}`);

export const loginUser = (data) =>
  API.post("/api/v1/users/loginUser", data);

export const updateUserProfile = (data) =>
  API.put("/api/v1/users/updateUserProfile", data);

export const changeUserPassword = (data) =>
  API.put("/api/v1/users/changePassword", data);

export const requestPasswordReset = (email) =>
  API.post("/api/v1/users/requestPasswordReset", { email });

export const resetUserPassword = (data) =>
  API.post("/api/v1/users/resetPassword", data);

// Question Paper APIs

export const uploadQuestionPaper = (formData) => {
  return API.post("/api/v1/questionPaper/uploadQuestionPaper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const approveQuestionPaper = (questionPaperId, remark) =>
  API.put(
    `/api/v1/questionPaper/approveQuestionPaper/${questionPaperId}`,
    { remark }
  );

export const rejectQuestionPaper = (questionPaperId, remark) =>
  API.put(
    `/api/v1/questionPaper/rejectQuestionPaper/${questionPaperId}`,
    { remark }
  );

export const getApprovedQuestionPapers = () =>
  API.get("/api/v1/questionPaper/getApprovedQuestionPapers");

export const getPendingQuestionPapers = () =>
  API.get("/api/v1/questionPaper/getPendingQuestionPapers");

export const getUserUploadedQuestionPapers = () =>
  API.get("/api/v1/questionPaper/getUserUploadedQuestionPapers");

// ----------------- Direct Backend Links for View / Download -----------------

export const viewQuestionPaper = (questionPaperId) =>
  `${BASE_URL}/api/v1/questionPaper/viewQuestionPaper/${questionPaperId}`;

export const downloadQuestionPaper = (questionPaperId) =>
  `${BASE_URL}/api/v1/questionPaper/downloadQuestionPaper/${questionPaperId}`;