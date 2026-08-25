/**
 * Admin Account Page
 * 관리자 계정 관리 페이지 - 계정 목록 조회, 검색, 상세보기
 *
 * 상태 관리:
 * - 모든 상태를 최상위에서 관리하여 하위 컴포넌트에 props로 전달
 */
import { AdminAccountPage } from "@/components/templates/AdminAccountPage";
import { useQuery } from "react-query";
import { getAdminList } from "@/apis/adminApi";
import useApiError from "@/lib/hooks/useApiError";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { adminState } from "@/recoil/adminToken";
import { AdminCreateAccountModal } from "@/components/molecules/AdminModal/AdminCreateAccountModal";

const AdminAccount = () => {
  const { handleError } = useApiError();
  const router = useRouter();
  const admin = useRecoilValue(adminState) as { role?: string } | null;

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [adminSearchKeyword, setAdminSearchKeyword] = useState("");
  const [accountModal, setAccountModal] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    if (admin && admin.role !== "SUPER") {
      router.replace("/admin/store");
    }
  }, [admin, router]);

  // ─────────────────────────────────────────────────────────────
  // API 쿼리
  // ─────────────────────────────────────────────────────────────

  /** 관리자 목록 불러오기 */
  const { data: dataSource, refetch } = useQuery(
    ["getAdminList", adminSearchKeyword],
    getAdminList,
    {
      retry: 1,
      enabled: admin?.role === "SUPER",
      onError(error: any) {
        handleError(error);
      },
    }
  );

  // ─────────────────────────────────────────────────────────────
  // 이벤트 핸들러
  // ─────────────────────────────────────────────────────────────

  /** 모달 열기/닫기 핸들러 */
  const openAccountModal = useCallback((data: any) => {
    setAccount(data);
    setAccountModal((prev) => !prev);
  }, []);

  if (!admin || admin.role !== "SUPER") return null;

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <AdminAccountPage
        setAdminSearchKeyword={setAdminSearchKeyword}
        dataSource={dataSource || []}
        openAccountModal={openAccountModal}
        accountModal={accountModal}
        account={account}
        onOpenCreate={() => setCreateModal(true)}
      />
      {createModal && (
        <AdminCreateAccountModal
          onClose={() => setCreateModal(false)}
          onCreated={() => {
            setCreateModal(false);
            refetch();
          }}
        />
      )}
    </>
  );
};

export default AdminAccount;
