import { readAdminAccessToken } from "@/lib/accesToken";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 현재 보고 있는 화면 기준으로 토큰을 나눠 싣는다.
 * 예전처럼 admin 토큰을 무조건 우선 적용하면, 관리자 토큰만 가진 사람이
 * 유저 화면에서도 인증된 요청을 보내 비로그인 사용자가 로그인된 것처럼 보였다.
 * 관리자 화면(/admin)에서는 admin 토큰만, 그 외 유저 화면에서는 카카오 토큰만 사용한다.
 */
AxiosInstance.interceptors.request.use(
  async (config) => {
    // SSR(Next.js 서버 렌더링)에서는 localStorage가 없으므로 헤더 조작 없이 통과
    if (typeof window === "undefined") return config;

    try {
      if (window.location.pathname.startsWith("/admin")) {
        // 관리자 화면 — 카카오 토큰으로 폴백하지 않는다
        const adminToken = await readAdminAccessToken();
        if (adminToken?.accessToken) {
          config.headers.Authorization = `Bearer ${adminToken.accessToken}`;
        }
      } else {
        // 유저 화면 — admin 토큰이 있어도 무시한다
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
