import { Button } from "@/components/atoms/Button";
import * as S from "./loginBox.style";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import { useState } from "react";
import Link from "next/link";
interface LoginBoxProp {
  kakaoLogin: () => void;
  localLogin: (userId: string, password: string) => void;
  isLoading: boolean;
}
export const LoginBox = ({ kakaoLogin, localLogin, isLoading }: LoginBoxProp) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <S.LoginBox>
      <S.LoginTit>로그인</S.LoginTit>
      <S.LocalForm onSubmit={(e) => { e.preventDefault(); localLogin(userId.trim(), password); }}>
        <S.LoginInput placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <S.LoginInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" width="100%" height={48} color="primary" layout="solid" label={isLoading ? "로그인 중..." : "로그인"} disabled={isLoading || !userId.trim() || !password} />
      </S.LocalForm>
      <S.SignupLink><Link href="/auth/signup">일반 회원가입</Link></S.SignupLink>
      <S.Divider><span>또는</span></S.Divider>
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
