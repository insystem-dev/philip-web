import { CheckBox, DataGrid, LoadPanel } from "devextreme-react";
import { Column, Paging, Scrolling } from "devextreme-react/data-grid";
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
          <Paging defaultPageSize={10} />
          <Scrolling mode="virtual" useNative={false} />
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
              <InputSelect
                options={orderOptions}
                layout="colums"
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
