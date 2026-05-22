import { CopyButton } from "@/components/atoms/Button/CopyButton";
import * as S from "./locationBox.style";
import Map from "../../atoms/Map";

export const LocationBox = ({ post, title }: any) => {
  return (
    <S.LocationBox blur={true}>
      <S.LocationTit>{title}</S.LocationTit>
      <S.LocationMap>
        <Map address={post?.address} />
      </S.LocationMap>
      <S.LocationInfo>
        {post?.address}
        <CopyButton label="주소복사" text={post?.address} />
      </S.LocationInfo>
    </S.LocationBox>
  );
};
