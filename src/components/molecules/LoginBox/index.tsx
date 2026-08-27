import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/Input/InputText";
import * as S from "./loginBox.style";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

/**
 * 소셜(카카오) 로그인 노출 여부.
 * 현재는 일반 로그인/회원가입만 사용하므로 false. 되살릴 때 true 로만 바꾸면 된다.
 * (카카오 콜백 pages/kakao.tsx 와 _app.tsx 의 SDK 로드는 기존 회원 토큰 유지를 위해 그대로 둔다)
 */
const ENABLE_SOCIAL_LOGIN = false;

interface LoginBoxProp {
  kakaoLogin: () => void;
  localLogin: (userId: string, password: string) => void;
  isLoading: boolean;
}
export const LoginBox = ({
  kakaoLogin,
  localLogin,
  isLoading,
}: LoginBoxProp) => {
  const router = useRouter();
  const { message } = usePhilipLocale();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.LoginBox>
      <S.LoginTit>{message.auth.loginTitle}</S.LoginTit>
      <S.LocalForm
        onSubmit={(e) => {
          e.preventDefault();
          localLogin(userId.trim(), password);
        }}
      >
        <S.FieldList>
          <InputText
            layout="row"
            size="lg"
            width="100%"
            placeholder={message.auth.userId}
            value={userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserId(e.target.value)
            }
          />
          <InputText
            layout="row"
            size="lg"
            width="100%"
            type="password"
            placeholder={message.auth.password}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </S.FieldList>
        <Button
          type="submit"
          width="100%"
          height={48}
          color="primary"
          layout="solid"
          label={message.auth.loginTitle}
          disabled={isLoading || !userId.trim() || !password}
          className={`${isLoading ? "spinner spinner-white spinner-right" : ""}`}
        />
      </S.LocalForm>

      <S.Divider>
        <span>{message.auth.or}</span>
      </S.Divider>

      <Button
        type="button"
        width="100%"
        height={48}
        color="callBg"
        layout="solid"
        label={message.auth.signUp}
        onClick={() => router.push("/auth/signup")}
      />

      {ENABLE_SOCIAL_LOGIN && (
        <Button
          type="button"
          width="100%"
          height={56}
          color="kakaoBg"
          layout="solid"
          label={message.auth.kakaoSignIn}
          onClick={kakaoLogin}
        >
          <IconKakao />
        </Button>
      )}
    </S.LoginBox>
  );
};
