// src/services/authService.js
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "https://qpapervault-backend-2te2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


// Users APIs
export const loginUser = (data) =>
  API.post("/api/v1/users/loginUser", data);

export const registerUser = (data) =>
  API.post("/api/v1/users/registerUser", data);


export const updateUserProfile = (data, token) =>
  API.put("/api/v1/users/updateUserProfile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const changeUserPassword = (data, token) =>
  API.put("/api/v1/users/changePassword", data, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const requestPasswordReset = (email) =>
  API.post("/api/v1/users/requestPasswordReset", { email });


export const resetUserPassword = (data) =>
  API.post("/api/v1/users/resetPassword", data);

// Question Paper APIs

export const uploadQuestionPaper = (formData, token) => {
  return API.post("/api/v1/questionPaper/uploadQuestionPaper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};



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


export const getApprovedQuestionPapers = () =>
  API.get("/api/v1/questionPaper/getApprovedQuestionPapers");


export const getPendingQuestionPapers = (token) =>
  API.get("/api/v1/questionPaper/getPendingQuestionPapers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const getUserUploadedQuestionPapers = (token) =>
  API.get("/api/v1/questionPaper/getUserUploadedQuestionPapers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });