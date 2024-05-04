"use client";
import axios from "axios";
const getToken = () => {
  return typeof window !== "undefined" && sessionStorage.getItem("token");
};
export const AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
AxiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
