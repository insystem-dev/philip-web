import { LoginBox } from "@/components/molecules/LoginBox";
import * as S from "./loginPage.style";

interface LoginPageProp {
  kakaoLogin: () => void;
  localLogin: (userId: string, password: string) => void;
  isLoading: boolean;
}
export const LoginPage = ({ kakaoLogin, localLogin, isLoading }: LoginPageProp) => {
  return (
    <S.LoginPage>
      <LoginBox kakaoLogin={kakaoLogin} localLogin={localLogin} isLoading={isLoading} />
    </S.LoginPage>
  );
};
