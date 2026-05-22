import { Button } from "@/components/atoms/Button";
import * as S from "./loginBox.style";
import IconKakao from "public/assets/svg/icon-kakao.svg";
interface LoginBoxProp {
  kakaoLogin: () => void;
}
export const LoginBox = ({ kakaoLogin }: LoginBoxProp) => {
  return (
    <S.LoginBox>
      <S.LoginTit>간편 로그인</S.LoginTit>
      <Button
        type="button"
        width="100%"
        height={56}
        color="kakaoBg"
        layout="solid"
        label="카카오톡으로 로그인하기"
        onClick={kakaoLogin}
      >
        <IconKakao />
      </Button>
    </S.LoginBox>
  );
};
