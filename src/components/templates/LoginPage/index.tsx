import { LoginBox } from "@/components/molecules/LoginBox";
import * as S from "./loginPage.style";

interface LoginPageProp {
  kakaoLogin: () => void;
}
export const LoginPage = ({ kakaoLogin }: LoginPageProp) => {
  return (
    <S.LoginPage>
      <LoginBox kakaoLogin={kakaoLogin} />
    </S.LoginPage>
  );
};
