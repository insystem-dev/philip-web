import { LoginPage } from "@/components/templates/LoginPage";

export const Login = () => {
  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    });
  };

  return <LoginPage kakaoLogin={kakaoLogin} />;
};

export default Login;
