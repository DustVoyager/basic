// src/api/axiosInstance.ts
import axios, { AxiosInstance, AxiosError } from "axios";
import { ApiError, ApiConfig } from "../types/api";

interface AxiosErrorResponse {
  message?: string;
  code?: string;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<AxiosErrorResponse>) => {
        const apiError: ApiError = {
          message:
            error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
          status: error.response?.status || 500,
          code: error.response?.data?.code,
        };
        return Promise.reject(apiError);
      }
    );
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.instance.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.instance.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.instance.delete<T>(url);
    return response.data;
  }
}

const apiConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
};

export const apiClient = new ApiClient(apiConfig);
