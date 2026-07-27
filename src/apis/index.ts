import { readAdminAccessToken } from "@/lib/accesToken";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // admin 토큰 우선, 없으면 카카오 사용자 토큰 사용
      const adminToken = await readAdminAccessToken();
      if (adminToken?.accessToken) {
        config.headers.Authorization = `Bearer ${adminToken.accessToken}`;
      } else {
        const kakaoToken = localStorage.getItem("kakaoSignKey");
        if (kakaoToken) {
          config.headers.Authorization = `Bearer ${kakaoToken}`;
        }
      }
    } catch (err) {
      console.error(err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** 점검 모드 차단(503 + code: MAINTENANCE) 감지 시 발행되는 전역 이벤트명 */
export const MAINTENANCE_BLOCKED_EVENT = "maintenance-blocked";

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "object" && "success" in response.data) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    // 점검 모드로 차단된 요청 — AdminLayout이 이 이벤트를 받아 점검 안내 모달을 띄운다
    if (
      typeof window !== "undefined" &&
      error?.response?.status === 503 &&
      error?.response?.data?.code === "MAINTENANCE"
    ) {
      window.dispatchEvent(new CustomEvent(MAINTENANCE_BLOCKED_EVENT));
    }
    return Promise.reject(error);
  }
);

// 하위 호환을 위해 유지 (admin 로그인 페이지에서 호출)
export const setToken = () => {};

export default AxiosInstance;
