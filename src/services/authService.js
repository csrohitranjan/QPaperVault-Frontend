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
  API.get("/api/v1/questionPaper/getApprovedQuestionPapers");

export const uploadQuestionPaper = (formData, token) => {
  return API.post("/api/v1/questionPaper/uploadQuestionPaper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPendingQuestionPapers = (token) =>
  API.get("/api/v1/questionPaper/getPendingQuestionPapers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveQuestionPaper = (questionPaperId, remark, token) =>
  API.put(
    `/api/v1/questionPaper/approveQuestionPaper/${questionPaperId}`,
    { remark },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const rejectQuestionPaper = (questionPaperId, remark, token) =>
  API.put(
    `/api/v1/questionPaper/rejectQuestionPaper/${questionPaperId}`,
    { remark },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


export const getUserUploadedQuestionPapers = (token) =>
  API.get("/api/v1/questionPaper/getUserUploadedQuestionPapers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });