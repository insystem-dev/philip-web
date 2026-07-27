import { CheckBox, DataGrid, LoadPanel } from "devextreme-react";
import { Column, Pager, Paging } from "devextreme-react/data-grid";
import * as S from "../adminGrid.style";
import { Button } from "@/components/atoms/Button";

import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { InputSelect } from "@/components/atoms/Input/InputSelect";

const position = { of: ".datagrid-wrap" };

interface StoreGridProps {
  dataSource: [];
  isLoading: boolean;
  error: string;
  promotionHandler: (data: any) => void;
  orderOptions: any[];
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  goEdit: (e: any) => void;
}

export const StoreGrid = ({
  dataSource,
  isLoading,
  error,
  promotionHandler,
  orderOptions,
  onChangeOrder,
  goEdit,
}: StoreGridProps) => {
  return (
    <>
      <S.AdminGrid>
        {error && <S.ErrorMsg>[errored] {error}</S.ErrorMsg>}

        <DataGrid
          className={"datagrid-wrap"}
          dataSource={dataSource}
          showRowLines={true}
          hoverStateEnabled={true}
          allowColumnReordering={true}
          focusedRowEnabled={true}
          keyExpr="oid"
        >
          <LoadPanel
            shadingColor="rgba(101, 101, 101, 0.4)"
            visible={isLoading}
            position={position}
          />
          {/* 로컬 배열(전체 데이터가 이미 메모리에 있음) + 소규모(수십~수백건) 데이터라
              virtual scroll 대신 표준 페이징으로 전환 — 스크롤 시 다음 페이지가
              로딩 스켈레톤에서 멈춰버리던 문제(virtual scroll이 로컬 배열과 맞물려
              다음 페이지를 못 불러오는 현상)를 근본적으로 피한다 */}
          <Paging defaultPageSize={20} />
          <Pager
            visible={true}
            showPageSizeSelector={true}
            allowedPageSizes={[10, 20, 50]}
            showInfo={true}
            showNavigationButtons={true}
          />
          <Column
            caption="No."
            cellRender={(e) => e.row.loadIndex + 1}
            width={40}
            alignment="center"
          />
          <Column
            caption="업체명"
            dataField="store_name"
            width={140}
            alignment="center"
          />
          <Column
            caption="업종"
            dataField="category"
            width={100}
            alignment="center"
          />
          <Column
            caption="대표자명"
            dataField="owner_name"
            width={100}
            alignment="center"
          />
          <Column
            caption="전화번호"
            dataField="phone_number"
            width={140}
            alignment="center"
          />
          <Column
            caption="지역"
            dataField="city"
            width={80}
            alignment="center"
          />
          <Column
            caption="주소"
            dataField="address"
            minWidth={80}
            hidingPriority={2}
          />
          <Column
            caption="프로모션"
            dataField="promotion"
            width={64}
            alignment="center"
            cellRender={(data) => (
              <S.AdminCellBox>
                <InputCheckbox
                  value="1"
                  checked={data.data.promotion}
                  themeType="admin"
                  layout="row"
                  onChange={() => {
                    promotionHandler(data);
                  }}
                />
              </S.AdminCellBox>
            )}
          />
          <Column
            caption="순서"
            dataField="order"
            width={60}
            alignment="center"
            cellRender={(data) => (
              // 스타일 분기에 존재하는 값("column")으로 오타 수정
              <InputSelect
                options={orderOptions}
                layout="column"
                size="sm"
                width="50px"
                themeType="admin"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  onChangeOrder(e, data);
                }}
                value={data.data.order}
              />
            )}
          />
          <Column
            caption="등록일"
            dataField="created_at"
            dataType="date"
            format="yyyy-MM-dd"
            width={90}
            alignment="center"
            hidingPriority={1}
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
                onClick={() => goEdit(e.data)}
              />
            )}
          />
        </DataGrid>
      </S.AdminGrid>
      {/* {storeModal && <StoreModal onClose={openStoreModal} store={store} />} */}
    </>
  );
};
