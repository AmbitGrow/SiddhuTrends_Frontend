import axios from "axios";
import { appConfig } from "../config/runtimeConfig";

const API = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor for data unwrapping and error normalization
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Never intercept auth endpoints to prevent loops
    const excludedUrls = [
      "/auth/login",
      "/auth/signup",
      "/auth/refresh-token",
      "/auth/logout",
    ];

    const isExcluded = originalRequest?.url
      ? excludedUrls.some((url) => originalRequest.url.includes(url))
      : false;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isExcluded
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh-token endpoint
        await axios.post(
          `${API.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        processQueue(null);
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        
        // If refresh fails, clear auth state / redirect to login (if not on a public path)
        const publicPaths = ["/", "/products", "/cart", "/login", "/signup"];
        const isPublicPath =
          publicPaths.includes(window.location.pathname) ||
          window.location.pathname.startsWith("/products/");

        if (!isPublicPath) {
          window.location.href = `/login?from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        }
        
        const normalizedRefreshError = {
          message: refreshError.response?.data?.message || "Session expired",
          status: refreshError.response?.status || 401,
          originalError: refreshError,
        };
        return Promise.reject(normalizedRefreshError);
      } finally {
        isRefreshing = false;
      }
    }

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
