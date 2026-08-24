import { SignUpDto } from "../utils/types";
import api from "./axios";

type LogoutListener = () => void;

let logoutListener: LogoutListener | null = null;

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}

interface VerifyCodePayload {
  email: string;
  resetCode: string;
}
interface ResetPasswordPayload {
  token: string;
  password: string;
}

export const login = async (payload: LoginDto): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);

  return data;
};

export const register = async (payload: SignUpDto) => {
  const { data } = await api.post("/auth/register/individual", payload);

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/users/me");

  return data;
};

export const getCurrentUserId = async () => {
  const { data } = await api.get("/users/me");

  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout-all");

  return data;
};

export const refreshToken = async (refreshToken: string) => {
  const { data } = await api.post("/auth/refresh", {
    refreshToken,
  });

  return data;
};

export const forgetPassword = async (email: string) => {
  const { data } = await api.post("/auth/forgot-password", {
    email,
  });

  return data;
};

export const verifyCode = async (payload: VerifyCodePayload) => {
  const { data } = await api.post("/auth/verify-reset-code", payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};

export const authEvents = {
  setLogoutListener(listener: LogoutListener) {
    logoutListener = listener;

    return () => {
      logoutListener = null;
    };
  },

  logout() {
    logoutListener?.();
  },
};
