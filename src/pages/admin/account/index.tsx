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
import { useState, useCallback } from "react";

const AdminAccount = () => {
  const { handleError } = useApiError();

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [adminSearchKeyword, setAdminSearchKeyword] = useState("");
  const [accountModal, setAccountModal] = useState(false);
  const [account, setAccount] = useState<any>(null);

  // ─────────────────────────────────────────────────────────────
  // API 쿼리
  // ─────────────────────────────────────────────────────────────

  /** 관리자 목록 불러오기 */
  const { data: dataSource } = useQuery(
    ["getAdminList", adminSearchKeyword],
    getAdminList,
    {
      retry: 1,
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

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <AdminAccountPage
      setAdminSearchKeyword={setAdminSearchKeyword}
      dataSource={dataSource || []}
      openAccountModal={openAccountModal}
      accountModal={accountModal}
      account={account}
    />
  );
};

export default AdminAccount;
