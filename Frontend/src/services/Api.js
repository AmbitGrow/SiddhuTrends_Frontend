import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// Response interceptor for data unwrapping and error normalization
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const normalizedError = {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status || 500,
      originalError: error,
    };
    console.error("[API Error]", normalizedError.message);
    return Promise.reject(normalizedError);
  }
);

export default API;