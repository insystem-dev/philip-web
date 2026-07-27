import { useState } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import { Column, Paging, Scrolling, Sorting } from "devextreme-react/data-grid";
import * as S from "../adminGrid.style";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { Button } from "@/components/atoms/Button";

const position = { of: ".datagrid-wrap" };

/** 영문명 인라인 편집 — blur 시점에만 저장 요청을 보내기 위해 로컬 state로 관리 */
const NameEngCell = ({
  data,
  onChangeNameEng,
}: {
  data: any;
  onChangeNameEng?: (
    e: React.FocusEvent<HTMLInputElement>,
    data: any
  ) => void;
}) => {
  const [value, setValue] = useState(data.data.name_eng ?? "");

  return (
    <S.AdminCellBox>
      <S.NameEngInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onChangeNameEng?.(e, data)}
      />
    </S.AdminCellBox>
  );
};

interface CodeSubGridProps {
  dataSource: any[];
  /** 방금 추가된 행 key — 목록 밖에 추가된 새 행으로 자동 스크롤/포커스 */
  focusedRowKey?: string | null;
  isLoading: boolean;
  /** CITY 그룹일 때만 사용여부/영문명 컬럼을 추가로 보여준다 */
  showCityColumns?: boolean;
  sortOptions: any[];
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onToggleDisabled?: (data: any) => void;
  onChangeNameEng?: (
    e: React.FocusEvent<HTMLInputElement>,
    data: any
  ) => void;
  onDelete: (data: any) => void;
}

export const CodeSubGrid = ({
  dataSource,
  focusedRowKey,
  isLoading,
  showCityColumns,
  sortOptions,
  onChangeSort,
  onToggleDisabled,
  onChangeNameEng,
  onDelete,
}: CodeSubGridProps) => {
  return (
    <S.AdminGrid>
      <DataGrid
        className={"datagrid-wrap"}
        dataSource={dataSource}
        showRowLines={true}
        hoverStateEnabled={true}
        keyExpr="oid"
        focusedRowEnabled={!!focusedRowKey}
        focusedRowKey={focusedRowKey ?? undefined}
        autoNavigateToFocusedRow={true}
      >
        <Sorting mode="none" />
        <LoadPanel
          shadingColor="rgba(101, 101, 101, 0.4)"
          visible={isLoading}
          position={position}
        />
        <Paging defaultPageSize={20} />
        {/* virtual 모드는 dataSource 교체 시 뒤에 추가된 행을 렌더링하지 않는 문제가 있어 standard 사용 */}
        <Scrolling mode="standard" useNative={false} />
        <Column
          caption="No."
          cellRender={(e) => e.row.loadIndex + 1}
          width={50}
          alignment="center"
        />
        <Column caption="이름" dataField="name" minWidth={140} alignment="center" />
        {showCityColumns && (
          <Column
            caption="영문명"
            width={160}
            alignment="center"
            cellRender={(data) => (
              <NameEngCell data={data} onChangeNameEng={onChangeNameEng} />
            )}
          />
        )}
        <Column
          caption="순서"
          dataField="sort"
          width={90}
          alignment="center"
          cellRender={(data) => (
            <InputSelect
              options={sortOptions}
              layout="column"
              size="sm"
              width="70px"
              themeType="admin"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                onChangeSort(e, data);
              }}
              value={data.data.sort}
            />
          )}
        />
        {showCityColumns && (
          <Column
            caption="사용여부"
            width={80}
            alignment="center"
            cellRender={(data) => (
              <S.AdminCellBox>
                <InputCheckbox
                  value="1"
                  checked={!data.data.disabled}
                  themeType="admin"
                  layout="row"
                  onChange={() => onToggleDisabled?.(data)}
                />
              </S.AdminCellBox>
            )}
          />
        )}
        <Column
          caption="삭제"
          width={70}
          alignment="center"
          cellRender={(data) => (
            <Button
              type="button"
              color="func"
              layout="solid"
              width="60px"
              height={24}
              label="삭제"
              onClick={() => onDelete(data)}
            />
          )}
        />
      </DataGrid>
    </S.AdminGrid>
  );
};
