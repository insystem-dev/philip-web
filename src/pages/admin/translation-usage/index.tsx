import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { adminState } from "@/recoil/adminToken";
import { AdminTranslationUsagePage } from "@/components/templates/AdminTranslationUsagePage";

/** 번역 비용·무료 한도 현황 (SUPER 전용) */
const AdminTranslationUsage = () => {
  const router = useRouter();
  const admin = useRecoilValue(adminState) as { role?: string } | null;

  useEffect(() => {
    if (admin && admin.role !== "SUPER") {
      router.replace("/admin/store");
    }
  }, [admin, router]);

  if (!admin || admin.role !== "SUPER") return null;

  return <AdminTranslationUsagePage />;
};

export default AdminTranslationUsage;
