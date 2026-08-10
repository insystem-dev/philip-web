import { AxiosError } from "axios";
import { useCallback } from "react";

const useApiError = () => {
  const handleError = useCallback((axiosError: AxiosError) => {
    const errorResponse = axiosError.response?.data as any;
    // HTTP 응답 status 기준으로 판정 (body의 statusCode는 보조로만 사용)
    const status = axiosError.response?.status ?? errorResponse?.statusCode;

    switch (status) {
      // 관리자 인증 에러
      case 401:
        localStorage.removeItem("admin");
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요");
        window.location.href = "/admin/login";
        break;
      default:
        break;
    }
  }, []);
  return { handleError } as const;
};

export default useApiError;
