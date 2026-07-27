import Image from "next/image";
import * as S from "./priceInfoBox.style";

export const PriceInfoBox = ({ post, title }: any) => {
  const filename = post?.menu?.[0]?.filename;
  const hasImage = Boolean(filename);
  const hasContents = Boolean(post?.contents?.trim());

  return (
    <S.PriceInfoBox>
      <S.PriceTit>{title}</S.PriceTit>
      <S.PriceImg $empty={!hasImage}>
        {hasImage ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${filename}`}
            alt="선택된 업체 이미지"
            width={800}
            height={100}
          />
        ) : (
          <S.PriceImgEmpty>등록된 이미지가 없습니다.</S.PriceImgEmpty>
        )}
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
