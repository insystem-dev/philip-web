/**
 * AdminAccountBox Organism
 * 관리자 계정 관리 박스 - 검색과 그리드를 포함
 */
import { AccountGrid } from "@/components/molecules/AdminGrid/AccountGrid";
import { AccountSearch } from "@/components/molecules/AdminSearchBox/AccountSearch";
import * as S from "./adminAccountBox.style";

interface AdminAccountBoxProps {
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
}

export const AdminAccountBox = ({
  setAdminSearchKeyword,
  dataSource,
  openAccountModal,
  accountModal,
  account,
}: AdminAccountBoxProps) => {
  return (
    <S.AdminAccountBox>
      <AccountSearch setAdminSearchKeyword={setAdminSearchKeyword} />
      <AccountGrid
        dataSource={dataSource}
        openAccountModal={openAccountModal}
        accountModal={accountModal}
        account={account}
      />
    </S.AdminAccountBox>
  );
};
