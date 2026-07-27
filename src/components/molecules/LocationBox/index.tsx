import { CopyButton } from "@/components/atoms/Button/CopyButton";
import * as S from "./locationBox.style";
import Map from "../../atoms/Map";

export const LocationBox = ({ post, title }: any) => {
  const hasAddress = Boolean(post?.address?.trim());

  return (
    <S.LocationBox blur={hasAddress}>
      <S.LocationTit>{title}</S.LocationTit>
      {hasAddress ? (
        <>
          <S.LocationMap>
            <Map address={post.address} />
          </S.LocationMap>
          <S.LocationInfo>
            {post.address}
            <CopyButton label="주소복사" text={post.address} />
          </S.LocationInfo>
        </>
      ) : (
        <S.LocationEmpty>등록된 주소 정보가 없습니다.</S.LocationEmpty>
      )}
    </S.LocationBox>
  );
};
