import { useMemo, useState } from "react";
import TreeList, {
  Column,
  Scrolling,
  Sorting,
} from "devextreme-react/tree-list";
import * as S from "../adminGrid.style";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { Button } from "@/components/atoms/Button";

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
  getSortOptions: (parentOid: string | null) => any[];
  onAddChild: (data: any) => void;
  onSelectEdit: (data: any) => void;
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
  getSortOptions,
  onAddChild,
  onSelectEdit,
  onChangeSort,
  onToggleDisabled,
  onChangeNameEng,
  onDelete,
}: CodeSubGridProps) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const expandableRowKeys = useMemo(
    () =>
      Array.from(
        new Set(
          dataSource
            .map((item) => item.parentOid)
            .filter((parentOid): parentOid is string => Boolean(parentOid))
        )
      ),
    [dataSource]
  );
  const orderedDataSource = useMemo(
    () =>
      [...dataSource].sort(
        (a, b) =>
          Number(a.sort ?? 0) - Number(b.sort ?? 0) ||
          String(a.subCd ?? "").localeCompare(String(b.subCd ?? ""))
      ),
    [dataSource]
  );

  if (isLoading) {
    return <S.GridLoading>공통코드를 불러오는 중입니다.</S.GridLoading>;
  }

  return (
    <S.AdminGrid>
      <S.TreeToolbar>
        <S.TreeControlButton
          type="button"
          onClick={() => setExpandedRowKeys(expandableRowKeys)}
        >
          전체 펼치기
        </S.TreeControlButton>
        <S.TreeControlButton type="button" onClick={() => setExpandedRowKeys([])}>
          전체 접기
        </S.TreeControlButton>
      </S.TreeToolbar>
      <S.TreeListArea>
        <TreeList
          className={"datagrid-wrap"}
          height="100%"
          dataSource={orderedDataSource}
          showRowLines={true}
          hoverStateEnabled={true}
          keyExpr="oid"
          parentIdExpr="parentOid"
          rootValue={null}
          dataStructure="plain"
          expandedRowKeys={expandedRowKeys}
          onExpandedRowKeysChange={setExpandedRowKeys}
          focusedRowEnabled={!!focusedRowKey}
          focusedRowKey={focusedRowKey ?? undefined}
          autoNavigateToFocusedRow={true}
        >
        <Sorting mode="none" />
        <Scrolling mode="standard" useNative={false} showScrollbar="always" />
        <Column
          caption="이름"
          dataField="name"
          minWidth={180}
          cellRender={(data) => (
            <button type="button" onClick={() => onSelectEdit(data)}
              style={{ border: 0, background: "none", padding: 0, color: "#2554c7", cursor: "pointer", textDecoration: "underline" }}>
              {data.data.name}
            </button>
          )}
        />
        <Column caption="코드" dataField="oid" minWidth={180} width={240} />
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
              options={getSortOptions(data.data.parentOid)}
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
          caption="하위 추가"
          width={90}
          alignment="center"
          cellRender={(data) => (
            <Button
              type="button"
              color="primary"
              layout="solid"
              width="76px"
              height={24}
              label="하위 추가"
              onClick={() => onAddChild(data)}
            />
          )}
        />
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
        </TreeList>
      </S.TreeListArea>
    </S.AdminGrid>
  );
};
