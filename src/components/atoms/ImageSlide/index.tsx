import Image from "next/image";
import { useState } from "react";
import { Button, ButtonGroup } from "../Button";
import IconArrowPrev from "public/assets/svg/icon-arrow-prev-lg.svg";
import IconArrowNext from "public/assets/svg/icon-arrow-next-lg.svg";
import * as S from "./imageSlide.style";

export const ImageSlide = ({ items }: any) => {
  const [selectedId, setSelectedId] = useState(0);

  const onSelectImage = (e: any) => {
    setSelectedId(e);
  };

  const onPrevImage = () => {
    if (selectedId > 0) {
      setSelectedId(selectedId - 1);
    }
  };

  const onNextImage = () => {
    if (selectedId < items.length) {
      setSelectedId(selectedId + 1);
    }
  };

  return (
    <S.ImageSlide>
      <S.ImageSelected>
        <Image
          src={
            items
              ? `${process.env.NEXT_PUBLIC_API_URL}/${items[selectedId]?.filename}`
              : ""
          }
          layout="fill"
          alt="선택된 업체 이미지"
        />
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
                alt="업체 이미지"
              />
            </S.ImageSlideItem>
          );
        })}
      </S.ImageSlideList>
    </S.ImageSlide>
  );
};
