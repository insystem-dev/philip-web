import { categoryState } from "@/recoil/category";
import { searchState } from "@/recoil/search";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import * as S from "./categoryItem.style";

const CategoryGlyph = ({ name }: { name: string }) => {
  const value = name.replace(/\s/g, "").toLowerCase();
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7 };

  if (value.includes("전체"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M4 15.5 16 6l12 9.5M7.5 14v12h17V14M13 26v-7h6v7"
        />
      </svg>
    );
  if (value.includes("호텔"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M6 27V6h20v21M10 10h3m6 0h3m-12 5h3m6 0h3m-12 5h3m6 0h3M4 27h24"
        />
      </svg>
    );
  if (value.includes("음식") || value.includes("식당"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M8 5v9m4-9v9M6 9h8m-4 5v13M22 5c-3 4-3 9 0 11v11m0-22v11h4V5"
        />
      </svg>
    );
  if (value.includes("ktv") || value.includes("jtv") || value.includes("노래"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect {...common} x="5" y="7" width="22" height="17" rx="3" />
        <path {...common} d="m14 12 7 4-7 4v-8ZM12 28h8M16 24v4" />
      </svg>
    );
  if (value.includes("렌트") || value.includes("자동차"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="m6 19 2.5-7h15l2.5 7v6H6v-6Zm3-7 2-4h10l2 4M9 21h3m8 0h3M9 25v2m14-2v2"
        />
      </svg>
    );
  if (value.includes("풀빌라") || value.includes("빌라"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M5 17 16 8l11 9M9 15v8m14-8v8M4 23c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2M4 27c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2"
        />
      </svg>
    );
  if (value.includes("카지노"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="m7 8 14-3 4 18-14 3L7 8Zm-2 5 4 14 13-4M14 12l2-3 2 3-2 3-2-3Zm3 8 2-3 2 3-2 3-2-3Z"
        />
      </svg>
    );
  if (value.includes("골프"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M10 28 18 5v15m0-15 8 4-8 4M7 28h19M22 24c4 0 6 1 6 2s-3 2-8 2"
        />
      </svg>
    );
  if (value.includes("여행") || value.includes("환전"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="m5 17 10-3 7-8 3 1-4 9 6 3-1.5 2.5-8-1-4 7-2-.5 1-8-7-1Z"
        />
        <circle {...common} cx="25" cy="7" r="4" />
      </svg>
    );
  if (value.includes("미용") || value.includes("뷰티"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="m11 15 15-9M11 17l15 9M14 13 9 8a3 3 0 1 0-2 5l4 2m3 4-5 5a3 3 0 1 1-2-5l4-2"
        />
      </svg>
    );
  if (value.includes("카페") || value.includes("마트"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M5 8h4l2 12h13l3-9H10M13 24a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM18 5v5m-3-2h6"
        />
      </svg>
    );
  if (value.includes("병원") || value.includes("약국"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M11 5h10v6h6v10h-6v6H11v-6H5V11h6V5Z" />
      </svg>
    );
  if (value.includes("추천"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="m16 4 3.7 7.6 8.3 1.2-6 5.8 1.4 8.2-7.4-3.9-7.4 3.9 1.4-8.2-6-5.8 8.3-1.2L16 4Z"
        />
      </svg>
    );
  if (value.includes("로컬"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle {...common} cx="16" cy="16" r="12" />
        <path {...common} d="m20.5 11.5-3 6-6 3 3-6 6-3Z" />
      </svg>
    );
  if (value.includes("bar") || value.includes("클럽") || value.includes("주점"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path {...common} d="M6 7h20L16 18 6 7Zm10 11v8m-6 1h12M21 4l-3 7" />
      </svg>
    );
  if (value.includes("마사지"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          {...common}
          d="M5 22c4-1 6-6 9-6 2 0 2 2 0 3l-2 2 10-5c4-2 6 3 2 5l-8 5H6l-1-4Zm17-14v6m-3-3h6"
        />
      </svg>
    );
  if (value.includes("기타") || value.includes("etc"))
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle {...common} cx="16" cy="16" r="5" />
        <path
          {...common}
          d="m16 3 2 4 4-1 1 4 4 2-2 4 2 4-4 2-1 4-4-1-2 4-2-4-4 1-1-4-4-2 2-4-2-4 4-2 1-4 4 1 2-4Z"
        />
      </svg>
    );

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle {...common} cx="16" cy="16" r="11" />
      <path {...common} d="M11 16h10M16 11v10" />
    </svg>
  );
};

export const CategoryItem = ({ item, index = 0 }: any) => {
  const router = useRouter();
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  const onClick = () => {
    setCategory(item.oid);
    setSearchInput("");

    if (router.pathname === "/select/category") {
      router.push("/main");
      return;
    }

    // 디테일/어드민 페이지에서 nav 클릭시 메인으로 이동 (항상 참이던 조건 수정)
    if (
      router.pathname === "/main/post/[id]" ||
      router.pathname.startsWith("/admin")
    ) {
      router.push("/main");
    }
  };

  // 카테고리 선택 화면은 아직 선택 전 단계이므로 저장된 카테고리를
  // 활성 상태로 표시하지 않는다. 메인 화면의 카테고리 메뉴에서만 유지한다.
  const isActive =
    router.pathname !== "/select/category" && category === item.oid;

  return (
    <S.CategoryItem $index={index} $active={isActive}>
      <S.CategoryButton type="button" onClick={onClick} aria-pressed={isActive}>
        <S.CategoryIcon>
          <CategoryGlyph name={item.name} />
        </S.CategoryIcon>
        <S.CategoryName>{item.name}</S.CategoryName>
        <S.HoverShine aria-hidden="true" />
      </S.CategoryButton>
    </S.CategoryItem>
  );
};
