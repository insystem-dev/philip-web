import { LoginBox } from "@/components/molecules/LoginBox";
import * as S from "./loginPage.style";

interface LoginPageProp {
  kakaoLogin: () => void;
  localLogin: (userId: string, password: string) => void;
  isLoading: boolean;
  onSignup?: () => void;
}
export const LoginPage = ({
  kakaoLogin,
  localLogin,
  isLoading,
  onSignup,
}: LoginPageProp) => {
  return (
    <S.LoginPage>
      <LoginBox
        kakaoLogin={kakaoLogin}
        localLogin={localLogin}
        isLoading={isLoading}
        onSignup={onSignup}
      />
    </S.LoginPage>
  );
};
