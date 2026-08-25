/**
 * AdminAccountPage Template
 * 관리자 계정 관리 페이지 템플릿
 */
import { AdminAccountBox } from "@/components/organisms/AdminAccountBox";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminAccountPage.style";

interface AdminAccountPageProps {
  /** 검색어 설정 핸들러 */
  setAdminSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  /** 관리자 계정 목록 데이터 */
  dataSource: any[];
  /** 모달 열기 핸들러 */
  openAccountModal: (data: any) => void;
  /** 모달 열림 상태 */
  accountModal: boolean;
  /** 선택된 계정 데이터 */
  account: any;
  /** ADMIN 계정 생성 모달 열기 */
  onOpenCreate: () => void;
}

export const AdminAccountPage = ({
  setAdminSearchKeyword,
  dataSource,
  openAccountModal,
  accountModal,
  account,
  onOpenCreate,
}: AdminAccountPageProps) => {
  return (
    <AdminLayout
      title="관리자 계정 관리"
      titleActions={
        <S.CreateButton type="button" onClick={onOpenCreate}>
          + ADMIN 관리자 생성
        </S.CreateButton>
      }
    >
      <S.AdminAccountPage>
        <AdminAccountBox
          setAdminSearchKeyword={setAdminSearchKeyword}
          dataSource={dataSource}
          openAccountModal={openAccountModal}
          accountModal={accountModal}
          account={account}
        />
      </S.AdminAccountPage>
    </AdminLayout>
  );
};
