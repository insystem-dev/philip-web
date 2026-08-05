import { LoginPage } from "@/components/templates/LoginPage";
import { localSigninAPI } from "@/apis/kakaoApi";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userTokenState } from "@/recoil/userToken";

export const Login = () => {
  const router = useRouter();
  const setUserToken = useSetRecoilState(userTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const kakaoLogin = () => {
    // 카카오 SDK 미로드 상태 방어
    if (!window.Kakao) {
      alert("카카오 로그인 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    });
  };

  const localLogin = async (userId: string, password: string) => {
    try {
      setIsLoading(true);
      const data = await localSigninAPI({ userId, password });
      localStorage.setItem("kakaoSignKey", data.accessToken);
      setUserToken(data.accessToken);
      router.replace("/main");
    } catch (error: any) {
      alert(error?.response?.data?.message || "로그인에 실패했습니다.");
    } finally { setIsLoading(false); }
  };

  return <LoginPage kakaoLogin={kakaoLogin} localLogin={localLogin} isLoading={isLoading} />;
};

export default Login;
