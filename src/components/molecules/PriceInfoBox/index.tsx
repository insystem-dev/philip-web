import Image from "next/image";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import * as S from "./priceInfoBox.style";
import IconDown from "public/assets/svg/icon-arrow-down.svg";

export const PriceInfoBox = ({ post, title, openHandler, open }: any) => {
  return (
    <>
      <S.PriceInfoBox isOpen={open}>
        <S.PriceTit>{title}</S.PriceTit>
        <S.PriceImg>
          <Image
            src={
              post
                ? // 메뉴 배열이 없을 수도 있어 옵셔널 체이닝으로 접근
                  `${process.env.NEXT_PUBLIC_API_URL}/${post?.menu?.[0]?.filename}`
                : ""
            }
            alt="선택된 업체 이미지"
            width={800}
            height={100}
          />
        </S.PriceImg>
        <S.PriceInfo>
          {/* contents가 null/undefined여도 크래시 없도록 존재 가드 후 줄바꿈 분리 */}
          {post?.contents && post.contents.includes(`\n`) ? (
            post.contents.split("\n").map((line: any, idx: any) => {
              //this.props.data.content: 내용
              return (
                <S.InfoLine key={idx}>
                  {line}
                  <br />
                </S.InfoLine>
              );
            })
          ) : (
            <S.InfoLine>
              {post?.contents}
              <br />
            </S.InfoLine>
          )}
        </S.PriceInfo>
        <ButtonGroup height={24}>
          <Button
            type="button"
            size="sm"
            color="clear"
            layout="icon"
            onClick={openHandler}
            rotate={open}
          >
            <IconDown />
          </Button>
        </ButtonGroup>
      </S.PriceInfoBox>
    </>
  );
};
