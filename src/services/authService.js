// src/services/authService.js
import axios from "axios";

const BASE_URL = "http://localhost:8200";

// Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Users APIs

export const requestRegistration = (data) =>
  API.post("/api/v1/users/requestRegistration", data);

export const confirmRegistration = (token) =>
  API.get(`/api/v1/users/confirmRegistration?token=${token}`);


export const loginUser = (data) =>
  API.post("/api/v1/users/loginUser", data);

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

// ----------------- Direct Backend Links for View / Download -----------------

export const viewQuestionPaper = (questionPaperId) =>
  `${BASE_URL}/api/v1/questionPaper/viewQuestionPaper/${questionPaperId}`;

export const downloadQuestionPaper = (questionPaperId) =>
  `${BASE_URL}/api/v1/questionPaper/downloadQuestionPaper/${questionPaperId}`;