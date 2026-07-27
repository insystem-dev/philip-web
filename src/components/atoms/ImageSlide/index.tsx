import Image from "next/image";
import { useState } from "react";
import { Button, ButtonGroup } from "../Button";
import IconArrowPrev from "public/assets/svg/icon-arrow-prev-lg.svg";
import IconArrowNext from "public/assets/svg/icon-arrow-next-lg.svg";
import * as S from "./imageSlide.style";

export const ImageSlide = ({ items }: any) => {
  const [selectedId, setSelectedId] = useState(0);
  const hasImages = Boolean(items?.length);

  if (!hasImages) {
    return (
      <S.ImageSlide>
        <S.ImageEmpty>등록된 이미지가 없습니다.</S.ImageEmpty>
      </S.ImageSlide>
    );
  }

  const onSelectImage = (e: any) => {
    setSelectedId(e);
  };

  const onPrevImage = () => {
    if (selectedId > 0) {
      setSelectedId(selectedId - 1);
    }
  };

  const onNextImage = () => {
    // items 로딩 전 undefined 가드 + 마지막 이미지에서 범위 초과 방지
    if (items && selectedId < items.length - 1) {
      setSelectedId(selectedId + 1);
    }
  };

  return (
    <S.ImageSlide>
      <S.ImageSelected>
        {/* 이미지가 없으면 빈 src 대신 렌더하지 않음 */}
        {items?.[selectedId]?.filename && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${items[selectedId].filename}`}
            layout="fill"
            sizes="(max-width: 768px) 100vw, 505px"
            priority={selectedId === 0}
            alt="선택된 업체 이미지"
          />
        )}
        <ButtonGroup justifyContent="space-between">
          <Button
            type="button"
            width="30px"
            height={50}
            color="func"
            layout="function"
            onClick={onPrevImage}
            disabled={selectedId === 0 ? true : false}
          >
            <IconArrowPrev />
          </Button>
          <Button
            type="button"
            width="30px"
            height={50}
            color="func"
            layout="function"
            onClick={onNextImage}
            disabled={selectedId === items?.length - 1 ? true : false}
          >
            <IconArrowNext />
          </Button>
        </ButtonGroup>
      </S.ImageSelected>

      <S.ImageSlideList>
        {items?.map((item: any, idx: number) => {
          return (
            <S.ImageSlideItem key={idx} onClick={() => onSelectImage(idx)}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.filename}`}
                width={85}
                height={62}
                sizes="85px"
                alt="업체 이미지"
              />
            </S.ImageSlideItem>
          );
        })}
      </S.ImageSlideList>
    </S.ImageSlide>
  );
};
