import axios from "axios";
import { getToken } from "../utils/auth";

const AI_API_BASE_URL = "http://localhost:8000";

const API = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRepeatedQuestions = async (paperCode) => {
  const sanitizedCode = paperCode.replace(/\s+/g, "").toUpperCase();
  const response = await API.post("/api/v1/repeated-questions", { paperCode: sanitizedCode });
  return response.data;
};

export const getTopicWeightage = async (paperCode) => {
  const sanitizedCode = paperCode.replace(/\s+/g, "").toUpperCase();
  const response = await API.post("/api/v1/topic-weightage", { paperCode: sanitizedCode });
  return response.data;
};

export const generateMockTest = async (paperCode, totalMarks = 100) => {
  const sanitizedCode = paperCode.replace(/\s+/g, "").toUpperCase();
  const response = await API.post("/api/v1/generate-mock-test", {
    paperCode: sanitizedCode,
    totalMarks,
  });
  return response.data;
};

export const getRevisionRanking = async (paperCode, availableHours = 4) => {
  const sanitizedCode = paperCode.replace(/\s+/g, "").toUpperCase();
  const response = await API.post("/api/v1/revision-ranking", {
    paperCode: sanitizedCode,
    availableHours,
  });
  return response.data;
};

export const getStudyNotes = async (paperCode) => {
  const sanitizedCode = paperCode.replace(/\s+/g, "").toUpperCase();
  const response = await API.post("/api/v1/study-notes", { paperCode: sanitizedCode });
  return response.data;
};