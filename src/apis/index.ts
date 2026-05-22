import { readAdminAccessToken } from "@/lib/accesToken";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await readAdminAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setToken = () => {
  AxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("kakaoSignKey")}`;
};

export default AxiosInstance;
