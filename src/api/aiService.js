import axios from "axios";

const AI_API_BASE_URL = "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRepeatedQuestions = async (paperCode) => {
  const response = await API.post("/api/v1/repeated-questions", {
    paperCode,
  });

  return response.data;
};


export const getTopicWeightage = async (paperCode) => {
  const response = await API.post("/api/v1/topic-weightage", {
    paperCode,
  });

  return response.data;
};

export const generateMockTest = async (paperCode) => {
  const response = await API.post("/api/v1/generate-mock-test", {
    paperCode,
  });

  return response.data;
};

export const getRevisionRanking = async (paperCode) => {

  const response = await API.post("/api/v1/revision-ranking", {
    paperCode,
  });

  return response.data;
};

export const getStudyNotes = async (paperCode) => {

  const response = await API.post("/api/v1/study-notes", {
    paperCode,
  });

  return response.data;

};