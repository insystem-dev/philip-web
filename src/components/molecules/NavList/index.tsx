import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { NavItem } from "@/components/atoms/NavItem";
import * as S from "./navList.style";
import IconArrowPrev from "public/assets/svg/icon-arrow-prev.svg";
import IconArrowNext from "public/assets/svg/icon-arrow-next.svg";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { getCategoryNavApi } from "@/apis/categoryApi";
import { cityState } from "@/recoil/city";

export const NavList = () => {
  const MENU_PER_SLIDE = 12;

  /** 선택된 지역 — 미선택이면 cityCode 없이 호출해 전역 목록으로 폴백한다 */
  const city = useRecoilValue(cityState);

  const { data: categoryItem } = useQuery(
    ["getCategoryNavApi", city ?? null],
    getCategoryNavApi
  );

  const [lastSlide, setLastSlide] = useState(0);
  const [firstSlide, setFirstSlide] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState<any | null>(null);

  useEffect(() => {
    const last = currentPage * MENU_PER_SLIDE;
    const first = last - MENU_PER_SLIDE;
    setLastSlide(last);
    setFirstSlide(first);
    setCurrentSlide(categoryItem?.slice(first, last));
  }, [categoryItem, currentPage, MENU_PER_SLIDE]);

  const onPrevSlide = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onNextSlide = () => {
    if ((categoryItem?.length ?? 0) / MENU_PER_SLIDE > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Button
        type="button"
        width="20px"
        color="clear"
        layout="icon"
        onClick={onPrevSlide}
        disabled={currentPage === 1}
      >
        <IconArrowPrev />
      </Button>
      <S.NavList>
        {currentSlide?.map((item: any) => (
          <NavItem item={item} key={item.oid} />
        ))}
      </S.NavList>
      <Button
        type="button"
        width="20px"
        color="clear"
        layout="icon"
        onClick={onNextSlide}
        disabled={(categoryItem?.length ?? 0) / MENU_PER_SLIDE <= currentPage}
      >
        <IconArrowNext />
      </Button>
    </>
  );
};
