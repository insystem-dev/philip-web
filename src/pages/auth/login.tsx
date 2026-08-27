import { LoginPage } from "@/components/templates/LoginPage";
import { localSigninAPI } from "@/apis/kakaoApi";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userTokenState } from "@/recoil/userToken";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const Login = () => {
  const router = useRouter();
  const { locale, message } = usePhilipLocale();
  const setUserToken = useSetRecoilState(userTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const kakaoLogin = () => {
    // 카카오 SDK 미로드 상태 방어
    if (!window.Kakao) {
      alert(message.auth.kakaoPreparing);
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
      alert(
        locale === "ko"
          ? error?.response?.data?.message || message.auth.loginFailed
          : message.auth.loginFailed
      );
    } finally { setIsLoading(false); }
  };

  return <LoginPage kakaoLogin={kakaoLogin} localLogin={localLogin} isLoading={isLoading} />;
};

export default Login;
