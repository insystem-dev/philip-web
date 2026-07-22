import { kakaoLoginAPI } from "@/apis/kakaoApi";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/userToken";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  const [, setUserToken] = useRecoilState(userTokenState);

  // 중복 호출 방지
  const isCalledRef = useRef(false);

  const mutation = useMutation("kakaoLoginAPI", kakaoLoginAPI, {
    onSuccess: (data) => {
      localStorage.setItem("kakaoSignKey", data.accessToken);
      setUserToken(data);
      document.location.href = "/main";
    },
    onError: (error: any) => {
      console.error("카카오 로그인 실패:", error);
      isCalledRef.current = false; // 에러 시 재시도 가능하게
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
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
      alert(`카카오 로그인 오류: ${kakaoServerError}`);
      router.push("/");
    }
  }, [router.isReady, authCode, kakaoServerError]);

  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;
