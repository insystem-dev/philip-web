import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminUserBox } from "@/components/organisms/AdminUserBox";
import * as S from "./adminUserPage.style";

interface AdminUserPageProps {
  /** 검색어 설정 핸들러 */
  setUserSearchKeyword: (keyword: string) => void;
  /** 회원 목록 데이터 */
  dataSource: any[];
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 모달 열림 상태 */
  userModal: boolean;
  /** 선택된 회원 데이터 */
  user: any;
  /** 모달 토글 핸들러 */
  openUserModal: (data: any) => void;
}

export const AdminUserPage = ({
  setUserSearchKeyword,
  dataSource,
  isLoading,
  userModal,
  user,
  openUserModal,
}: AdminUserPageProps) => {
  return (
    <AdminLayout title="회원관리">
      <S.AdminUserPage>
        <AdminUserBox
          setUserSearchKeyword={setUserSearchKeyword}
          dataSource={dataSource}
          isLoading={isLoading}
          userModal={userModal}
          user={user}
          openUserModal={openUserModal}
        />
      </S.AdminUserPage>
    </AdminLayout>
  );
};
