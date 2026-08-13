import axios from "axios";
import { token } from "../storage/token";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: 'https://backend-production-4df9.up.railway.app',
});

api.interceptors.request.use(async (config) => {
  const accessToken = await token.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
