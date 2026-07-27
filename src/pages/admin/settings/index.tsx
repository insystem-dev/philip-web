import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { adminState } from "@/recoil/adminToken";
import { AdminSettingsPage } from "@/components/templates/AdminSettingsPage";

/** 환경설정 (SUPER 전용) — 다른 권한은 업체관리로 돌려보낸다 */
const AdminSettings = () => {
  const router = useRouter();
  const admin = useRecoilValue(adminState) as { role?: string } | null;

  useEffect(() => {
    // adminState는 HeadersTokenProvider가 localStorage에서 복원 (null이면 아직 복원 전이거나 미로그인)
    if (admin && admin.role !== "SUPER") {
      router.replace("/admin/store");
    }
  }, [admin, router]);

  if (!admin || admin.role !== "SUPER") return null;

  return <AdminSettingsPage />;
};

export default AdminSettings;
