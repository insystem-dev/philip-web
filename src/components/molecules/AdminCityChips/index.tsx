/**
 * AdminCityChips Molecule
 * 배너를 노출할 지역(city)을 고르는 칩 그룹
 *
 * 드롭다운이 아니라 칩으로 펼쳐 두는 이유:
 * - 지역은 공통코드 CITY 행 수만큼(대개 한두 줄)이라 전체 선택지와 현재 값을 항상 같이 보여줄 수 있다.
 * - 선택이 1클릭이다 (드롭다운은 열기 → 고르기 2클릭).
 * - 바로 아래 '노출 카테고리'는 계층형이라 드릴다운을 유지하는데, 형태가 달라야 두 축이 구분된다.
 *
 * AdminCategoryDrilldown / AdminStoreSelect 와 동일하게 컴포넌트 자체는 API를 호출하지 않는다.
 * 지역 목록은 부모가 props로 주입한다.
 */
import { useRef } from "react";
import { CitySub } from "@/apis/categoryApi";
import * as S from "./adminCityChips.style";

interface Props {
  cities: CitySub[];
  /** 선택된 지역 코드 (code_sub.code). 아직 고르지 못한 구간에서는 빈 문자열 */
  value: string;
  onChange: (code: string) => void;
  label?: string;
}

export const AdminCityChips = ({ cities, value, onChange, label }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const selectedIndex = cities.findIndex((city) => city.oid === value);
  /** 라디오 그룹은 Tab 으로 한 번에 들어오고 나간다 — 그룹 안에서 tabIndex 를 가지는 칩은 하나뿐이다 */
  const focusIndex = selectedIndex === -1 ? 0 : selectedIndex;

  /** 라디오 그룹 규약대로 방향키로 지역을 옮긴다 */
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
        ? -1
        : 0;
    if (!step) return;

    e.preventDefault();
    const next = (index + step + cities.length) % cities.length;
    onChange(cities[next].oid);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("[role='radio']")
      ?.[next]?.focus();
  };

  return (
    <S.Field>
      {label && <S.Label>{label}</S.Label>}
      {cities.length ? (
        <S.ChipList ref={listRef} role="radiogroup" aria-label="노출 지역">
          {cities.map((city, index) => (
            <S.Chip
              key={city.oid}
              type="button"
              role="radio"
              aria-checked={city.oid === value}
              $active={city.oid === value}
              $off={city.disabled}
              tabIndex={index === focusIndex ? 0 : -1}
              onClick={() => onChange(city.oid)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {city.name}
              {/* 비활성 지역도 관리자에겐 보이되 상태를 배지로 표시한다 */}
              {city.disabled && <S.OffBadge>비활성</S.OffBadge>}
            </S.Chip>
          ))}
        </S.ChipList>
      ) : (
        <S.Empty>
          등록된 지역이 없습니다. 공통코드 관리에서 지역을 먼저 추가하세요.
        </S.Empty>
      )}
    </S.Field>
  );
};
