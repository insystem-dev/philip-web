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
    const admin = JSON.parse(adminInfo);

    setToken();
    setAdmin(admin);

    if (router.pathname.includes("admin") && admin === null) {
      router.replace("/admin/login");
    }
  }, []);

  return <>{children}</>;
};

export default HeadersTokenProvider;
