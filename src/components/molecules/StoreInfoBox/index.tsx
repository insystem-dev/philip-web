import { ImageSlide } from "@/components/atoms/ImageSlide";
import { CopyButton } from "@/components/atoms/Button/CopyButton";
import * as S from "./storeInfoBox.style";
import IconPhone from "public/assets/svg/icon-phone.svg";
import IconView from "public/assets/svg/icon-view.svg";

export const StoreInfoBox = ({ post }: any) => {
  return (
    <S.StoreInfoBox>
      <ImageSlide items={post?.detail} />

      <S.StoreInfo>
        <S.StoreInfoTop>
          <S.StoreNameBox>
            {/* 스토어 네임 */}
            {post?.storeName}
            {/* 카테고리가 없을 수도 있어 옵셔널 체이닝으로 접근 */}
            <S.CategorySpan>{post?.category?.subNm}</S.CategorySpan>
          </S.StoreNameBox>
          <S.StoreViewBox>
            <IconView width={16} height={16} viewBox="0 0 24 24" />
            {post?.views}
          </S.StoreViewBox>
        </S.StoreInfoTop>
        <S.AddressBox>{post?.address}</S.AddressBox>
        <S.PhoneBox>
          <span>
            <IconPhone />
            {post?.phoneNumber}
          </span>
          <CopyButton label="번호복사" text={post?.phoneNumber} />
        </S.PhoneBox>
      </S.StoreInfo>
    </S.StoreInfoBox>
  );
};
