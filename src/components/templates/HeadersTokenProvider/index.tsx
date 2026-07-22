import { setToken } from "@/apis";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import Loading from "../Loading";
import { useRecoilState } from "recoil";
import { adminState } from "@/recoil/adminToken";

// export interface adminType {
//   accessToken: string;
//   adminId: string;
//   oid: string;
//   role: string;
// }

const HeadersTokenProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [admin, setAdmin] = useRecoilState(adminState);
  const router = useRouter();

  useEffect(() => {
    const adminInfo: any = localStorage.getItem("admin");

    // 손상된 localStorage 값이 있어도 크래시 없이 null 처리
    let admin: any = null;
    try {
      admin = JSON.parse(adminInfo);
    } catch {
      admin = null;
    }

    setToken();
    setAdmin(admin);

    if (router.pathname.includes("admin") && admin === null) {
      router.replace("/admin/login");
    }
    // CSR 라우팅으로 /admin 진입 시에도 가드가 동작하도록 pathname 의존성 추가
  }, [router.pathname]);

  return <>{children}</>;
};

export default HeadersTokenProvider;
