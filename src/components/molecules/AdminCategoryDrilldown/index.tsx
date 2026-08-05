import { useMemo, useState } from "react";
import { Category } from "@/apis/categoryApi";
import * as S from "./adminCategoryDrilldown.style";

interface Props {
  categories: Category[];
  value?: string;
  onChange: (value: string) => void;
  allowAll?: boolean;
  label?: string;
  error?: string;
}

export const AdminCategoryDrilldown = ({
  categories,
  value,
  onChange,
  allowAll = false,
  label,
  error,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [parentCode, setParentCode] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  const byCode = useMemo(
    () => new Map(categories.map((item) => [item.oid, item])),
    [categories]
  );
  const currentParent = parentCode ? byCode.get(parentCode) : undefined;
  const currentItems = categories.filter(
    (item) => item.parentOid === parentCode && item.oid !== "CATEGORY-ALL"
  );
  const selected = value ? byCode.get(value) : undefined;

  const pathOf = (item?: Category) => {
    const path: Category[] = [];
    let current = item;
    while (current) {
      path.unshift(current);
      current = current.parentOid ? byCode.get(current.parentOid) : undefined;
    }
    return path;
  };

  const currentPath = pathOf(currentParent);
  const selectedLabel =
    value === "CATEGORY-ALL"
      ? "전체"
      : pathOf(selected)
          .map((item) => item.name)
          .join(" > ") || "카테고리를 선택하세요";

  const searchResults = keyword.trim()
    ? categories.filter(
        (item) =>
          item.oid !== "CATEGORY-ALL" &&
          pathOf(item)
            .map((node) => node.name)
            .join(" > ")
            .toLowerCase()
            .includes(keyword.trim().toLowerCase())
      )
    : [];

  const choose = (code: string) => {
    onChange(code);
    setOpen(false);
    setKeyword("");
  };

  return (
    <S.Field>
      {label && <S.Label>{label}</S.Label>}
      <S.Wrap>
        <S.Trigger type="button" aria-haspopup="listbox" onClick={() => setOpen((current) => !current)}>
          <span>{selectedLabel}</span>
          <span>{open ? "▴" : "▾"}</span>
        </S.Trigger>
        {open && (
          <S.Panel>
            <S.Header>
              <strong>카테고리 선택</strong>
              <button type="button" onClick={() => setOpen(false)}>
                닫기 ×
              </button>
            </S.Header>
            <S.Search
              type="search"
              value={keyword}
              placeholder="카테고리명 또는 경로 검색"
              onChange={(event) => setKeyword(event.target.value)}
            />

            {keyword.trim() ? (
              <S.List>
                {searchResults.length ? (
                  searchResults.map((item) => (
                    <S.SearchResult
                      type="button"
                      key={item.oid}
                      onClick={() => choose(item.oid)}
                    >
                      {pathOf(item)
                        .map((node) => node.name)
                        .join(" > ")}
                    </S.SearchResult>
                  ))
                ) : (
                  <S.Empty>검색 결과가 없습니다.</S.Empty>
                )}
              </S.List>
            ) : (
              <>
                <S.Breadcrumb>
                  <button type="button" onClick={() => setParentCode(null)}>
                    처음
                  </button>
                  {currentPath.map((item) => (
                    <button
                      type="button"
                      key={item.oid}
                      onClick={() => setParentCode(item.oid)}
                    >
                      <span>›</span> {item.name}
                    </button>
                  ))}
                </S.Breadcrumb>
                <S.List>
                  {parentCode ? (
                    <S.BackButton
                      type="button"
                      onClick={() =>
                        setParentCode(currentParent?.parentOid ?? null)
                      }
                    >
                      ← 이전 단계
                    </S.BackButton>
                  ) : allowAll ? (
                    <S.SelectCurrent
                      type="button"
                      onClick={() => choose("CATEGORY-ALL")}
                    >
                      <strong>전체 업체 조회</strong>
                      <span>카테고리 조건을 적용하지 않습니다</span>
                    </S.SelectCurrent>
                  ) : null}

                  {currentParent && (
                    <S.SelectCurrent
                      type="button"
                      onClick={() => choose(currentParent.oid)}
                    >
                      <strong>{currentParent.name} 선택</strong>
                      <span>
                        {allowAll
                          ? "현재 카테고리와 모든 하위를 조회합니다"
                          : "이 카테고리로 업체를 등록합니다"}
                      </span>
                    </S.SelectCurrent>
                  )}

                  {currentItems.map((item) => {
                    const hasChildren = categories.some(
                      (candidate) => candidate.parentOid === item.oid
                    );
                    return (
                      <S.LevelItem
                        type="button"
                        key={item.oid}
                        onClick={() =>
                          hasChildren
                            ? setParentCode(item.oid)
                            : choose(item.oid)
                        }
                      >
                        <span>{item.name}</span>
                        <small>{hasChildren ? "다음 단계 ›" : "선택"}</small>
                      </S.LevelItem>
                    );
                  })}
                </S.List>
              </>
            )}
          </S.Panel>
        )}
      </S.Wrap>
      {error && <S.Error>{error}</S.Error>}
    </S.Field>
  );
};
