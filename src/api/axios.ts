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

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log("TOKEN EXISTS:", !!accessToken);

    console.log(
      "TOKEN PREVIEW:",
      accessToken ? `${accessToken.substring(0, 60)}...` : "NO TOKEN"
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
        ? "Bearer token attached"
        : "NO AUTH HEADER"
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle API responses
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("API ERROR:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Access token expired/invalid
    if (error.response?.status === 401) {
      console.log("TOKEN EXPIRED OR UNAUTHORIZED");

      // Remove access and refresh tokens
      await token.clearTokens();

      // Tell AuthContext to logout
      authEvents.logout();
    }

    return Promise.reject(error);
  }
);

export default api;