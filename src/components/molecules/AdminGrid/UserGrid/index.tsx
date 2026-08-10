/**
 * UserGrid Molecule
 * 회원 목록 그리드
 *
 * 변경사항:
 * - API 호출을 상위 컴포넌트로 이동 (props로 데이터 전달받음)
 * - 모달 상태를 상위 컴포넌트로 이동 (props로 핸들러 전달받음)
 */
import { DataGrid } from "devextreme-react";
import * as S from "../adminGrid.style";
import { Column } from "devextreme-react/data-grid";
import { Button } from "@/components/atoms/Button";
import { UserModal } from "../../AdminModal/UserModal";

interface UserGridProps {
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

export const UserGrid = ({
  dataSource,
  isLoading,
  userModal,
  user,
  openUserModal,
}: UserGridProps) => {
  if (isLoading) {
    return (
      <S.AdminGrid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            color: "#666",
          }}
        >
          로딩 중...
        </div>
      </S.AdminGrid>
    );
  }

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
            caption="이름"
            dataField="name"
            width={100}
            alignment="center"
          />
          <Column
            caption="아이디"
            width={120}
            alignment="center"
            cellRender={(e) => e.data.user_id || "-"}
          />
          <Column
            caption="이메일"
            dataField="email"
            minWidth={180}
            alignment="center"
            cellRender={(e) => e.value || "-"}
          />
          <Column
            caption="연락처"
            dataField="phone_number"
            alignment="center"
            cellRender={(e) => e.value || "-"}
          />
          <Column
            caption="회원등급"
            dataField="role"
            width={100}
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
                onClick={() => openUserModal(e.data)}
              />
            )}
          />
        </DataGrid>
      </S.AdminGrid>
      {userModal && <UserModal onClose={openUserModal} user={user} />}
    </>
  );
};
