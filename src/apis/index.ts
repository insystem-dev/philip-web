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
    try {
      // admin 토큰이 있을 때만 Authorization 헤더 설정 (없거나 파싱 실패 시 기존 헤더 유지)
      const accessToken = await readAdminAccessToken();
      if (accessToken?.accessToken) {
        config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
      }
    } catch (err) {
      // localStorage "admin" 값 파싱 실패 시 헤더를 덮어쓰지 않고 요청 계속 진행
      console.error(err);
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
