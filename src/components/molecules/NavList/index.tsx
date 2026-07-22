import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { NavItem } from "@/components/atoms/NavItem";
import * as S from "./navList.style";
import IconArrowPrev from "public/assets/svg/icon-arrow-prev.svg";
import IconArrowNext from "public/assets/svg/icon-arrow-next.svg";
import { useQuery } from "react-query";
import { getCategoryNavApi } from "@/apis/categoryApi";

export const NavList = () => {
  const MENU_PER_SLIDE = 12;

  /** Nav 카테고리 가져오기*/
  const { data: categoryItem, isLoading } = useQuery(
    ["getCategoryNavApi"],
    getCategoryNavApi
  );

  const [lastSlide, setLastSlide] = useState(0);
  const [firstSlide, setFirstSlide] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // 마운트 시점에는 categoryItem이 undefined이므로 로드 후 useEffect에서 세팅
  const [currentSlide, setCurrentSlide] = useState<any | null>(null);

  useEffect(() => {
    // 현재 페이지 기준 slice 범위 계산 (1페이지 = slice(0, 12))
    const last = currentPage * MENU_PER_SLIDE;
    const first = last - MENU_PER_SLIDE;
    setLastSlide(last);
    setFirstSlide(first);
    setCurrentSlide(categoryItem?.slice(first, last));
  }, [categoryItem, currentPage, MENU_PER_SLIDE]);

  const onPrevSlide = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextSlide = () => {
    // 카테고리 로딩 전 undefined 가드
    if ((categoryItem?.length ?? 0) / 12 > currentPage) {
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
        disabled={currentPage === 1 ? true : false}
      >
        <IconArrowPrev />
      </Button>
      <S.NavList>
        {currentSlide?.map((item: any, idx: number) => {
          return <NavItem item={item} key={idx} />;
        })}
      </S.NavList>
      {/* 더미 데이터가 아닌 실제 카테고리 개수 기준으로 다음 버튼 비활성 판정 */}
      <Button
        type="button"
        width="20px"
        color="clear"
        layout="icon"
        onClick={onNextSlide}
        disabled={(categoryItem?.length ?? 0) / 12 <= currentPage ? true : false}
      >
        <IconArrowNext />
      </Button>
    </>
  );
};
