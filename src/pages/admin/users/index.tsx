/**
 * Admin Users Page
 * 회원 관리 페이지 - 회원 목록 조회, 검색, 상세보기
 *
 * 상태 관리:
 * - 모든 상태를 최상위에서 관리하여 하위 컴포넌트에 props로 전달
 */
import { AdminUserPage } from "@/components/templates/AdminUserPage";
import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { getKakaoUserList } from "@/apis/kakaoApi";
import useApiError from "@/lib/hooks/useApiError";

const AdminUsers = () => {
  const { handleError } = useApiError();

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [userSearchKeyword, setUserSearchKeyword] = useState("");
  const [userModal, setUserModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // ─────────────────────────────────────────────────────────────
  // API 쿼리
  // ─────────────────────────────────────────────────────────────

  /** 회원 목록 불러오기 */
  const { data: dataSource, isLoading } = useQuery(
    ["getKakaoUsers", userSearchKeyword],
    getKakaoUserList,
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
  const openUserModal = useCallback((data: any) => {
    setUser(data);
    setUserModal((prev) => !prev);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <AdminUserPage
      setUserSearchKeyword={setUserSearchKeyword}
      dataSource={dataSource || []}
      isLoading={isLoading}
      userModal={userModal}
      user={user}
      openUserModal={openUserModal}
    />
  );
};

export default AdminUsers;
