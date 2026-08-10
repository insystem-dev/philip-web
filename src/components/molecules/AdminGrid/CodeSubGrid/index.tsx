import { useMemo, useRef, useState } from "react";
import TreeList, {
  Column,
  Scrolling,
  Sorting,
} from "devextreme-react/tree-list";
import * as S from "../adminGrid.style";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { Button } from "@/components/atoms/Button";

const PencilIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

/**
 * 이름 인라인 편집 — blur 시점에 값이 바뀐 경우에만 저장 요청을 보낸다.
 * Enter 는 저장(blur), Escape 는 원래 값으로 되돌린다.
 * 하위 코드는 └ 가이드로 상위-하위 관계를 표시하고,
 * 연필 버튼으로 "클릭해서 수정"이 가능함을 드러낸다.
 */
const NameCell = ({
  data,
  onChangeName,
}: {
  data: any;
  onChangeName: (e: React.FocusEvent<HTMLInputElement>, data: any) => void;
}) => {
  const original = data.data.name ?? "";
  const [value, setValue] = useState(original);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isChild = !!data.data.parentOid;

  return (
    <S.CodeNameCell>
      {isChild && <S.ChildGuide aria-hidden />}
      <S.CodeNameInput
        ref={inputRef}
        type="text"
        value={value}
        title="클릭해서 이름 수정"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") {
            setValue(original);
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          const next = e.target.value.trim();
          if (!next || next === original) {
            setValue(original);
            return;
          }
          onChangeName(e, data);
        }}
      />
      <S.NameEditButton
        type="button"
        title="이름 수정"
        aria-label={`${original} 이름 수정`}
        onClick={() => inputRef.current?.focus()}
      >
        <PencilIcon />
      </S.NameEditButton>
    </S.CodeNameCell>
  );
};

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
  /** 하위 추가 컬럼 노출 여부 (CATEGORY 그룹에서만 사용) */
  allowAddChild?: boolean;
  getSortOptions: (parentOid: string | null) => any[];
  onAddChild: (data: any) => void;
  /** 이름 인라인 수정 (blur 시 저장) */
  onChangeName: (e: React.FocusEvent<HTMLInputElement>, data: any) => void;
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
  allowAddChild,
  getSortOptions,
  onAddChild,
  onChangeName,
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
          // 최상위 행에 클래스를 달아 배경 틴트/굵은 이름으로 계층을 구분한다
          onRowPrepared={(e: any) => {
            if (e.rowType === "data" && !e.data?.parentOid) {
              e.rowElement.classList.add("code-row-root");
            }
          }}
        >
        <Sorting mode="none" />
        <Scrolling mode="standard" useNative={false} showScrollbar="always" />
        <Column
          caption="이름"
          dataField="name"
          minWidth={180}
          cellRender={(data) => (
            <NameCell
              key={`${data.data.oid}:${data.data.name}`}
              data={data}
              onChangeName={onChangeName}
            />
          )}
        />
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
        {allowAddChild && (
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
        </TreeList>
      </S.TreeListArea>
    </S.AdminGrid>
  );
};
