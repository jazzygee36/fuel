import axios from "axios";
import { token } from "../storage/token";

const api = axios.create({
  baseURL: "https://backend-production-4df9.up.railway.app",
});

api.interceptors.request.use(async (config) => {
  const accessToken = await token.getAccessToken();

  console.log("API REQUEST:", config.method?.toUpperCase(), config.url);
  console.log("TOKEN EXISTS:", !!accessToken);
  console.log(
    "TOKEN PREVIEW:",
    accessToken ? `${accessToken.substring(0, 20)}...` : "NO TOKEN"
  );

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log(
    "AUTH HEADER:",
    config.headers.Authorization ? "Bearer token attached" : "NO AUTH HEADER"
  );

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default api;