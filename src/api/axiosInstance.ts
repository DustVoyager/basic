// src/api/axiosInstance.ts
import axios from "axios";
import { getAccessToken } from "../utils/tokenStorage";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
