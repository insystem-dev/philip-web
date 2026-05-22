import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";

import Data from "@/data/dummy";
import * as S from "../adminGrid.style";
import { Button } from "@/components/atoms/Button";
import { AccountModal } from "../../AdminModal/AccountModal";

/**
 * AccountGrid Molecule
 * 관리자 계정 목록 그리드
 *
 * 변경사항:
 * - 사용하지 않는 adminSearchKeyword prop 제거
 */
interface AccountGridProps {
  /** 관리자 계정 목록 데이터 */
  dataSource: any[];
  /** 모달 열기 핸들러 */
  openAccountModal: (data: any) => void;
  /** 모달 열림 상태 */
  accountModal: boolean;
  /** 선택된 계정 데이터 */
  account: any;
}

export const AccountGrid = ({
  dataSource,
  openAccountModal,
  accountModal,
  account,
}: AccountGridProps) => {
  return (
    <>
      <S.AdminGrid>
        <DataGrid dataSource={dataSource} keyExpr="oid">
          <Column
            caption="No."
            cellRender={(e) => e.row.loadIndex + 1}
            width={40}
            alignment="center"
          />
          <Column
            caption="ID"
            dataField="admin_id"
            width={100}
            alignment="center"
          />
          <Column
            caption="이름"
            dataField="name"
            width={100}
            alignment="center"
          />
          <Column
            caption="담당부서"
            dataField="department"
            width={100}
            alignment="center"
          />
          <Column
            caption="담당지역"
            dataField="region"
            width={100}
            alignment="center"
          />
          <Column
            caption="관리자 권한등급"
            dataField="role"
            width={100}
            alignment="center"
          />
          <Column caption="비고" dataField="note" alignment="center" />
          <Column
            caption="계정생성일"
            dataField="created_at"
            dataType="date"
            format="yyyy-MM-dd"
            width={120}
            alignment="center"
          />
          <Column
            caption="상세보기"
            width={70}
            alignment="center"
            cellRender={(e) => (
              <Button
                type="button"
                color="func"
                layout="solid"
                width="60px"
                height={24}
                label="보기"
                onClick={() => openAccountModal(e.data)}
              />
            )}
          />
        </DataGrid>
      </S.AdminGrid>
      {accountModal && (
        <AccountModal onClose={openAccountModal} account={account} />
      )}
    </>
  );
};
