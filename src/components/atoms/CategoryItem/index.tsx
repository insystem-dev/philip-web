import { categoryState } from "@/recoil/category";
import { searchState } from "@/recoil/search";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import * as S from "./categoryItem.style";

export const CategoryItem = ({ item }: any) => {
  const router = useRouter();
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  const onClick = () => {
    setCategory(item.oid);
    setSearchInput("");

    // 디테일 페이지에서 nav 클릭시 메인으로 이동
    if (router.pathname === "/main/post/[id]" || "/admin") {
      router.push("/main");
    }
  };

  return <S.CategoryItem onClick={onClick}>{item.name}</S.CategoryItem>;
};
