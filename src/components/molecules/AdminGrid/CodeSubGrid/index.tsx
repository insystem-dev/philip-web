import { useCallback, useMemo, useState } from "react";
import TreeList, {
  Column,
  Scrolling,
  Sorting,
} from "devextreme-react/tree-list";
import * as S from "../adminGrid.style";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { Button } from "@/components/atoms/Button";

/** 편집모드에서 상위가 들고 있는 이름/영문명 입력값 (oid 기준) */
export type CodeNameDraft = Record<string, { name: string; name_eng: string }>;

/**
 * 이름 셀 — 읽기 모드는 텍스트로만 보여주고, 편집 모드에서만 입력으로 바뀐다.
 * 입력값은 상위 draft 가 들고 있어 저장 버튼을 누를 때까지 서버로 나가지 않는다.
 * 하위 코드는 양쪽 모드 모두 └ 가이드로 상위-하위 관계를 표시한다.
 */
const NameCell = ({
  data,
  isEditMode,
  draftName,
  onChangeName,
}: {
  data: any;
  isEditMode?: boolean;
  draftName?: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}) => {
  const name = data.data.name ?? "";
  const isChild = !!data.data.parentOid;

  return (
    <S.CodeNameCell>
      {isChild && <S.ChildGuide aria-hidden />}
      {isEditMode ? (
        <S.CodeNameInput
          type="text"
          value={draftName ?? name}
          aria-label={`${name} 이름`}
          onChange={(e) => onChangeName(e, data)}
        />
      ) : (
        <S.CodeNameText title={name}>{name}</S.CodeNameText>
      )}
    </S.CodeNameCell>
  );
};

/** 영문명 셀 — 이름 셀과 같은 방식으로 편집 모드에서만 입력을 연다 */
const NameEngCell = ({
  data,
  isEditMode,
  draftNameEng,
  onChangeNameEng,
}: {
  data: any;
  isEditMode?: boolean;
  draftNameEng?: string;
  onChangeNameEng?: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}) => {
  const nameEng = data.data.name_eng ?? "";

  return (
    <S.AdminCellBox>
      {isEditMode ? (
        <S.NameEngInput
          type="text"
          value={draftNameEng ?? nameEng}
          aria-label={`${data.data.name ?? ""} 영문명`}
          onChange={(e) => onChangeNameEng?.(e, data)}
        />
      ) : (
        <S.CodeNameText title={nameEng}>{nameEng}</S.CodeNameText>
      )}
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
  /** 이름·영문명 편집 모드 — 즉시 반영 컬럼(순서/사용여부/하위 추가/삭제)은 잠긴다 */
  isEditMode?: boolean;
  /** 편집 모드에서 표시할 이름/영문명 입력값 */
  nameDraft?: CodeNameDraft;
  getSortOptions: (parentOid: string | null) => any[];
  onAddChild: (data: any) => void;
  /** 이름 입력 — 상위 draft 갱신용 (저장은 저장 버튼에서) */
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onToggleDisabled?: (data: any) => void;
  onChangeNameEng?: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  onDelete: (data: any) => void;
}

export const CodeSubGrid = ({
  dataSource,
  focusedRowKey,
  isLoading,
  showCityColumns,
  allowAddChild,
  isEditMode,
  nameDraft,
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

  /**
   * 최상위 행 강조 클래스.
   * 인라인 함수로 넘기면 편집 draft 리렌더마다 함수 identity 가 바뀌고,
   * DevExtreme 이 onRowPrepared 옵션 변경으로 행 전체를 다시 그려
   * 이름 입력 포커스가 한 글자마다 끊긴다 → useCallback 으로 고정한다.
   */
  const handleRowPrepared = useCallback((e: any) => {
    if (e.rowType === "data" && !e.data?.parentOid) {
      e.rowElement.classList.add("code-row-root");
    }
  }, []);

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
          onRowPrepared={handleRowPrepared}
        >
        <Sorting mode="none" />
        <Scrolling mode="standard" useNative={false} showScrollbar="always" />
        <Column
          caption="이름"
          dataField="name"
          minWidth={180}
          cellRender={(data) => (
            <NameCell
              data={data}
              isEditMode={isEditMode}
              draftName={nameDraft?.[data.data.oid]?.name}
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
              <NameEngCell
                data={data}
                isEditMode={isEditMode}
                draftNameEng={nameDraft?.[data.data.oid]?.name_eng}
                onChangeNameEng={onChangeNameEng}
              />
            )}
          />
        )}
        {/* 아래 컬럼들은 즉시 반영(=리패치)이라 편집 중에는 잠근다. 열어두면 draft 가 날아간다 */}
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
              disabled={isEditMode}
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
                  disabled={isEditMode}
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
                disabled={isEditMode}
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
              disabled={isEditMode}
              onClick={() => onDelete(data)}
            />
          )}
        />
        </TreeList>
      </S.TreeListArea>
    </S.AdminGrid>
  );
};
