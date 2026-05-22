import { Button } from "@/components/atoms/Button";
import * as S from "./success.style";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import { useRouter } from "next/router";

export const SuccessBox = () => {
  const router = useRouter();
  return (
    <S.SuccessBox>
      <div>체크아이콘</div>
      <S.SuccessTit>회원가입 완료</S.SuccessTit>
      <p>회원가입이 성공적으로 완료되었습니다!</p>
      <Button
        type="button"
        width="100%"
        height={56}
        color="primary"
        layout="solid"
        label="로그인페이지로"
        onClick={() => {
          router.replace("/admin/login");
        }}
      />
    </S.SuccessBox>
  );
};
