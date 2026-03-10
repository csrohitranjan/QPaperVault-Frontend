import axios from "axios";

const AI_API_BASE_URL = "http://localhost:8000";

const API = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Note: No interceptor needed, tokens passed explicitly

export const getRepeatedQuestions = async (paperCode, token) => {
  const response = await API.post(
    "/api/v1/repeated-questions",
    { paperCode },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getTopicWeightage = async (paperCode, token) => {
  const response = await API.post(
    "/api/v1/topic-weightage",
    { paperCode },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const generateMockTest = async (paperCode, token) => {
  const response = await API.post(
    "/api/v1/generate-mock-test",
    { paperCode },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getRevisionRanking = async (paperCode, token) => {
  const response = await API.post(
    "/api/v1/revision-ranking",
    { paperCode },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getStudyNotes = async (paperCode, token) => {
  const response = await API.post(
    "/api/v1/study-notes",
    { paperCode },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};