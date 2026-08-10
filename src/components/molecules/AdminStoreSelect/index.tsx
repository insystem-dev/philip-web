/**
 * AdminStoreSelect Molecule
 * 배너에 연결할 등록 업체를 고르는 평면 리스트 셀렉트
 *
 * AdminCategoryDrilldown과 동일하게 컴포넌트 자체는 API를 호출하지 않는다.
 * 업체 목록은 부모가 props로 주입한다.
 */
import { useMemo, useState } from "react";
import * as S from "./adminStoreSelect.style";

interface Props {
  stores: any[];
  value?: string;
  onChange: (oid: string) => void;
  disabled?: boolean;
  label?: string;
}

export const AdminStoreSelect = ({
  stores,
  value,
  onChange,
  disabled,
  label,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const byOid = useMemo(
    () => new Map(stores.map((item) => [item.oid, item])),
    [stores]
  );
  const selected = value ? byOid.get(value) : undefined;
  const selectedLabel = selected?.store_name || "연결할 업체를 선택하세요";

  /** GET /posts/store 는 raw SQL 결과라 필드가 snake_case 다 */
  const textOf = (item: any) =>
    `${item.store_name ?? ""}${item.category ?? ""}${item.address ?? ""}`.toLowerCase();

  const searchResults = keyword.trim()
    ? stores.filter((item) => textOf(item).includes(keyword.trim().toLowerCase()))
    : stores;

  const choose = (oid: string) => {
    onChange(oid);
    setOpen(false);
    setKeyword("");
  };

  return (
    <S.Field>
      {label && <S.Label>{label}</S.Label>}
      <S.Wrap>
        <S.Trigger
          type="button"
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{selectedLabel}</span>
          <span>{open ? "▴" : "▾"}</span>
        </S.Trigger>
        {open && !disabled && (
          <S.Panel>
            <S.Header>
              <strong>연결 업체 선택</strong>
              <button type="button" onClick={() => setOpen(false)}>
                닫기 ×
              </button>
            </S.Header>
            <S.Search
              type="search"
              value={keyword}
              placeholder="업체명 · 카테고리 · 주소 검색"
              onChange={(event) => setKeyword(event.target.value)}
            />

            <S.List>
              <S.NoneItem type="button" onClick={() => choose("")}>
                <strong>연결 없음</strong>
                <span>배너를 눌러도 이동하지 않습니다</span>
              </S.NoneItem>

              {searchResults.length ? (
                searchResults.map((item) => (
                  <S.StoreItem
                    type="button"
                    key={item.oid}
                    onClick={() => choose(item.oid)}
                  >
                    <strong>{item.store_name}</strong>
                    <span>
                      {[item.category, item.address].filter(Boolean).join(" · ")}
                    </span>
                  </S.StoreItem>
                ))
              ) : (
                <S.Empty>검색 결과가 없습니다.</S.Empty>
              )}
            </S.List>
          </S.Panel>
        )}
      </S.Wrap>
    </S.Field>
  );
};
