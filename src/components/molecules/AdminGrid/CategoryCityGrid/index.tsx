import { useMemo } from "react";
import TreeList, {
  Column,
  Scrolling,
  Sorting,
} from "devextreme-react/tree-list";
import * as S from "../adminGrid.style";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { CategoryCitySetting } from "@/apis/categoryApi";

interface CategoryCityGridProps {
  dataSource: CategoryCitySetting[];
  isLoading: boolean;
  /**
   * 전역 공통코드에서 숨김(use_yn='N')인 카테고리 코드.
   * 이 지역 설정 응답에는 전역 값이 없어 상위(페이지)에서 카테고리 트리와 대조해 넘겨준다.
   */
  globalHiddenCodes: Set<string>;
  /** 편집 모드 — 읽기 모드에서는 이름·사용여부·순서를 모두 잠근다 */
  isEditMode?: boolean;
  /** 펼칠 수 있는 행(= 하위를 가진 행) key — 수정모드 진입 시 전체 펼치기에 쓴다 */
  expandableRowKeys: string[];
  /** 펼쳐진 행 key — 수정모드 진입 시 상위가 전체를 펼쳐야 해서 상위가 들고 있다 */
  expandedRowKeys: string[];
  onChangeExpandedRowKeys: (keys: string[]) => void;
  /** 형제 그룹 내에서 고를 수 있는 순서 옵션 */
  getSortOptions: (parentCode: string | null) => any[];
  /** 이름 입력 — 상위 draft 갱신용 (저장은 타이틀의 저장 버튼에서) */
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  onToggleUse: (data: any) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
}

/**
 * 지역별 카테고리 노출·순서 그리드
 * CodeSubGrid 와 같은 TreeList 구조를 쓰되, 여기서는 삭제를 다루지 않고
 * 그 지역에서의 노출 여부(useYn)와 순서(sort), 그리고 카테고리 이름만 편집한다.
 * 값은 즉시 저장되지 않고 화면 상태로만 바뀌며, 저장 버튼에서 한 번에 전송된다.
 */
export const CategoryCityGrid = ({
  dataSource,
  isLoading,
  globalHiddenCodes,
  isEditMode,
  expandableRowKeys,
  expandedRowKeys,
  onChangeExpandedRowKeys,
  getSortOptions,
  onChangeName,
  onToggleUse,
  onChangeSort,
}: CategoryCityGridProps) => {
  /** 이름은 입력 한 글자마다 바뀌므로 행 데이터가 아니라 이 맵에서 꺼내 그린다 */
  const nameByCode = useMemo(
    () => new Map(dataSource.map((item) => [item.categoryCode, item.name])),
    [dataSource]
  );

  /**
   * 이름을 제외한 행 구조 서명.
   * TreeList 에 넘기는 배열의 정체성이 바뀌면 그리드가 통째로 다시 그려져
   * 이름 입력의 포커스가 한 글자마다 끊긴다. 이름은 nameByCode 로 따로 그리므로
   * 구조가 그대로면 같은 배열을 유지한다.
   */
  const structureKey = useMemo(
    () =>
      dataSource
        .map(
          (item) =>
            `${item.categoryCode}:${item.parentCode ?? ""}:${item.sort}:${
              item.useYn
            }:${item.overridden ? "1" : "0"}`
        )
        .join("|"),
    [dataSource]
  );

  const orderedDataSource = useMemo(
    () =>
      [...dataSource].sort(
        (a, b) =>
          Number(a.sort ?? 0) - Number(b.sort ?? 0) ||
          String(a.categoryCode ?? "").localeCompare(String(b.categoryCode ?? ""))
      ),
    // 이름만 바뀐 리렌더에서는 배열을 새로 만들지 않는다 (위 structureKey 주석 참고)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [structureKey]
  );

  if (isLoading) {
    return <S.GridLoading>카테고리를 불러오는 중입니다.</S.GridLoading>;
  }

  return (
    <S.AdminGrid>
      <S.TreeToolbar>
        <S.TreeControlButton
          type="button"
          onClick={() => onChangeExpandedRowKeys(expandableRowKeys)}
        >
          전체 펼치기
        </S.TreeControlButton>
        <S.TreeControlButton
          type="button"
          onClick={() => onChangeExpandedRowKeys([])}
        >
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
          keyExpr="categoryCode"
          parentIdExpr="parentCode"
          rootValue={null}
          dataStructure="plain"
          expandedRowKeys={expandedRowKeys}
          onExpandedRowKeysChange={onChangeExpandedRowKeys}
          // 최상위 행에 클래스를 달아 배경 틴트로 계층을 구분한다 (CodeSubGrid 와 동일)
          onRowPrepared={(e: any) => {
            if (e.rowType === "data" && !e.data?.parentCode) {
              e.rowElement.classList.add("code-row-root");
            }
          }}
        >
          <Sorting mode="none" />
          <Scrolling mode="standard" useNative={false} showScrollbar="always" />
          <Column
            caption="카테고리"
            dataField="name"
            minWidth={180}
            cellRender={(data) => {
              const name =
                nameByCode.get(data.data.categoryCode) ?? data.data.name ?? "";
              return (
                <S.CodeNameCell>
                  {!!data.data.parentCode && <S.ChildGuide aria-hidden />}
                  {isEditMode ? (
                    <S.CodeNameInput
                      type="text"
                      value={name}
                      aria-label={`${data.data.name ?? ""} 이름`}
                      onChange={(e) => onChangeName(e, data)}
                    />
                  ) : (
                    <S.CodeNameText title={name}>{name}</S.CodeNameText>
                  )}
                </S.CodeNameCell>
              );
            }}
          />
          {/* 아래 두 컬럼은 편집 모드에서만 연다 — 읽기 모드에서 실수로 값이 바뀌지 않게 잠근다 */}
          <Column
            caption="사용여부"
            width={70}
            alignment="center"
            cellRender={(data) => (
              <S.AdminCellBox>
                <InputCheckbox
                  value="1"
                  checked={data.data.useYn === "Y"}
                  themeType="admin"
                  layout="row"
                  disabled={!isEditMode}
                  onChange={() => onToggleUse(data)}
                />
              </S.AdminCellBox>
            )}
          />
          <Column
            caption="순서"
            dataField="sort"
            width={90}
            alignment="center"
            cellRender={(data) => (
              <InputSelect
                options={getSortOptions(data.data.parentCode)}
                layout="column"
                size="sm"
                width="70px"
                themeType="admin"
                disabled={!isEditMode}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  onChangeSort(e, data);
                }}
                // sort 0 은 falsy 라 그대로 넘기면 InputSelect 가 localStorage 의 city 로 폴백한다
                value={String(data.data.sort)}
              />
            )}
          />
          <Column
            caption="설정"
            width={130}
            alignment="center"
            cellRender={(data) => {
              // 전역 숨김 + 이 지역만 노출 = 이 지역에만 존재하는 카테고리
              const globalHidden = globalHiddenCodes.has(
                data.data.categoryCode
              );
              const cityOnly = globalHidden && data.data.useYn === "Y";
              return (
                <S.AdminCellBox>
                  <S.OverrideBadge
                    $on={cityOnly || (!globalHidden && !!data.data.overridden)}
                    title={
                      cityOnly
                        ? "전역 공통코드에서는 숨김이고 이 지역에서만 노출되는 카테고리입니다."
                        : globalHidden
                        ? "전역 공통코드에서 숨김 상태라 지금은 어디에도 보이지 않습니다."
                        : data.data.overridden
                        ? "이 지역 전용 설정이 저장돼 있습니다."
                        : "전역 공통코드 설정을 그대로 따릅니다."
                    }
                  >
                    {cityOnly
                      ? "이 지역 전용"
                      : globalHidden
                      ? "전역 숨김"
                      : data.data.overridden
                      ? "지역 설정"
                      : "전역"}
                  </S.OverrideBadge>
                </S.AdminCellBox>
              );
            }}
          />
        </TreeList>
      </S.TreeListArea>
    </S.AdminGrid>
  );
};
