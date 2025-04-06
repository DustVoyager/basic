// src/api/auth.ts
import axiosInstance from "./axiosInstance";

interface LoginPayload {
  userId: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  return response.data;
};
