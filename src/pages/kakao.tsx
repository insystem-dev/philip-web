import { kakaoLoginAPI } from "@/apis/kakaoApi";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/userToken";
import { KakaoLoginPage } from "@/components/templates/KakaoLoginPage";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  const [, setUserToken] = useRecoilState(userTokenState);
  const { message } = usePhilipLocale();

  // 중복 호출 방지
  const isCalledRef = useRef(false);

  const mutation = useMutation("kakaoLoginAPI", kakaoLoginAPI, {
    onSuccess: (data) => {
      localStorage.setItem("kakaoSignKey", data.accessToken);
      // recoil 상태도 localStorage와 동일하게 토큰 문자열로 저장 (새로고침 시 HeadersTokenProvider가 세팅하는 값과 타입 일치)
      setUserToken(data.accessToken);
      document.location.href = "/main";
    },
    onError: (error: any) => {
      console.error("카카오 로그인 실패:", error);
      isCalledRef.current = false; // 에러 시 재시도 가능하게
      alert(message.auth.kakaoLoginFailed);
      router.push("/");
    },
  });

  useEffect(() => {
    // router.isReady가 true일 때만 query 파라미터가 준비됨
    if (!router.isReady) return;

    // authCode가 있고, 아직 호출하지 않았을 때만 실행
    if (authCode && typeof authCode === "string" && !isCalledRef.current) {
      isCalledRef.current = true;
      mutation.mutate(authCode);
    } else if (kakaoServerError) {
      // 카카오 서버에서 에러가 온 경우
      alert(message.auth.kakaoLoginError(String(kakaoServerError)));
      router.push("/");
    }
  }, [router.isReady, authCode, kakaoServerError]);

  return <KakaoLoginPage />;
};

export default Kakao;
