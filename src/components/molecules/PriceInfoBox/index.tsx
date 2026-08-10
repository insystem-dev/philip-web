import { ImageSlide } from "@/components/atoms/ImageSlide";
import * as S from "./priceInfoBox.style";

export const PriceInfoBox = ({ post, title }: any) => {
  const hasContents = Boolean(post?.contents?.trim());

  return (
    <S.PriceInfoBox>
      <S.PriceTit>{title}</S.PriceTit>
      <S.PriceImg>
        {/* 메뉴 이미지는 여러 장이므로 슬라이드로 노출 (빈 배열 안내는 ImageSlide 가 처리) */}
        <ImageSlide items={post?.menu} />
      </S.PriceImg>
      <S.PriceInfo>
        {hasContents ? (
          post.contents.split("\n").map((line: string, idx: number) => (
            <S.InfoLine key={idx}>
              {line}
              <br />
            </S.InfoLine>
          ))
        ) : (
          <S.PriceEmpty>등록된 요금 및 메뉴 안내가 없습니다.</S.PriceEmpty>
        )}
      </S.PriceInfo>
    </S.PriceInfoBox>
  );
};
