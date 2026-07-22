import { LoginPage } from "@/components/templates/LoginPage";

export const Login = () => {
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

  return <LoginPage kakaoLogin={kakaoLogin} />;
};

export default Login;
