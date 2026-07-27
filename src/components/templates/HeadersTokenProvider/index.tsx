import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminState } from "@/recoil/adminToken";
import { userTokenState } from "@/recoil/userToken";
import { AlertModal } from "@/components/molecules/AlertModal";

/** JWT payload의 exp 필드로 만료 여부만 확인 (서명 검증 없음) */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const HeadersTokenProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [admin, setAdmin] = useRecoilState(adminState);
  const [, setUserToken] = useRecoilState(userTokenState);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ── 관리자 토큰 복원 ──
    let adminData: any = null;
    try {
      adminData = JSON.parse(localStorage.getItem("admin")!);
    } catch {
      adminData = null;
    }
    setAdmin(adminData);

    if (router.pathname.includes("admin") && adminData === null) {
      router.replace("/admin/login");
    }

    // ── 카카오 사용자 토큰 복원 및 만료 검증 (1개월 유지, 만료 시 자동 로그아웃) ──
    const kakaoToken = localStorage.getItem("kakaoSignKey");
    if (kakaoToken) {
      if (isTokenExpired(kakaoToken)) {
        // 토큰은 조용히 제거하되(= UI가 "로그인됨"으로 남는 버그 방지), 사용자에게는 모달로 안내
        localStorage.removeItem("kakaoSignKey");
        setUserToken(null);
        setIsSessionExpired(true);
      } else {
        setUserToken(kakaoToken);
      }
    }
  }, [router.pathname]);

  return (
    <>
      {children}
      {isSessionExpired && (
        <AlertModal
          title="로그인이 만료되었습니다"
          message={`카카오 로그인은 1개월간 유지됩니다.\n다시 로그인해 주세요.`}
          confirmLabel="로그인하기"
          onConfirm={() => {
            setIsSessionExpired(false);
            router.push("/auth/login");
          }}
        />
      )}
    </>
  );
};

export default HeadersTokenProvider;
