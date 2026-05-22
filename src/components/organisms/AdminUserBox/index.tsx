/**
 * AdminUserBox Organism
 * 회원 관리 박스 - 검색과 그리드를 포함
 *
 * 변경사항:
 * - 상태를 상위 컴포넌트(페이지)로 이동
 * - props로 데이터와 핸들러를 전달받음
 */
import { UserGrid } from "@/components/molecules/AdminGrid/UserGrid";
import { UserSearch } from "@/components/molecules/AdminSearchBox/UserSearch";
import * as S from "./adminUserBox.style";

interface AdminUserBoxProps {
  /** 검색어 설정 핸들러 */
  setUserSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
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

export const AdminUserBox = ({
  setUserSearchKeyword,
  dataSource,
  isLoading,
  userModal,
  user,
  openUserModal,
}: AdminUserBoxProps) => {
  return (
    <S.AdminUserBox>
      <UserSearch setUserSearchKeyword={setUserSearchKeyword} />
      <UserGrid
        dataSource={dataSource}
        isLoading={isLoading}
        userModal={userModal}
        user={user}
        openUserModal={openUserModal}
      />
    </S.AdminUserBox>
  );
};
