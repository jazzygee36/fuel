import api from "./axios";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export const login = async (payload: LoginDto): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);

  return data;
};

export const register = async (payload: RegisterDto) => {
  const { data } = await api.post("/auth/register", payload);

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/users/me");

  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");

  return data;
};

export const refreshToken = async (refreshToken: string) => {
  const { data } = await api.post("/auth/refresh", {
    refreshToken,
  });

  return data;
};
