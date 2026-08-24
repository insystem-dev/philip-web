import { categoryState } from "@/recoil/category";
import { searchState } from "@/recoil/search";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import * as S from "./categoryItem.style";

const getIconUrl = (iconKey?: string) => {
  const apiBase = String(process.env.NEXT_PUBLIC_API_URL ?? "").replace(
    /\/$/,
    ""
  );
  // ?v= 는 아이콘 SVG 교체 시 브라우저 캐시 무효화용 — 백엔드 CATEGORY_ICON_VERSION과 함께 올린다
  return `${apiBase}/category-icons/${encodeURIComponent(iconKey || "plus")}.svg?v=2`;
};

export const CategoryItem = ({ item, index = 0 }: any) => {
  const router = useRouter();
  const [category, setCategory] = useRecoilState(categoryState);
  const [, setSearchInput] = useRecoilState(searchState);

  const onClick = () => {
    setCategory(item.oid);
    setSearchInput("");

    if (router.pathname === "/select/category") {
      router.push("/main");
      return;
    }

    if (
      router.pathname === "/main/post/[id]" ||
      router.pathname.startsWith("/admin")
    ) {
      router.push("/main");
    }
  };

  // 카테고리 선택 화면은 아직 선택 전 단계이므로 저장된 카테고리를 활성 표시하지 않는다.
  const isActive =
    router.pathname !== "/select/category" && category === item.oid;

  return (
    <S.CategoryItem $index={index} $active={isActive}>
      <S.CategoryButton type="button" onClick={onClick} aria-pressed={isActive}>
        <S.CategoryIcon>
          <img
            src={getIconUrl(item.iconKey)}
            alt=""
            aria-hidden="true"
            onError={(event) => {
              if (event.currentTarget.dataset.fallback === "true") return;
              event.currentTarget.dataset.fallback = "true";
              event.currentTarget.src = getIconUrl("plus");
            }}
          />
        </S.CategoryIcon>
        <S.CategoryName>{item.name}</S.CategoryName>
        <S.HoverShine aria-hidden="true" />
      </S.CategoryButton>
    </S.CategoryItem>
  );
};
