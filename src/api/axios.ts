import axios from "axios";
import { token } from "../storage/token";
import { authEvents } from "./auth";

const api = axios.create({
  baseURL: "https://backend-production-4df9.up.railway.app",
});

// Attach access token to every request
api.interceptors.request.use(
  async (config) => {
    const accessToken = await token.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle API responses
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    // Access token expired/invalid
    if (error.response?.status === 401) {
      // Remove access and refresh tokens
      await token.clearTokens();

      // Tell AuthContext to logout
      authEvents.logout();
    }

    return Promise.reject(error);
  },
);

export default api;
