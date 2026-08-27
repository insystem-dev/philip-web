import { CopyButton } from "@/components/atoms/Button/CopyButton";
import * as S from "./locationBox.style";
import Map from "../../atoms/Map";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const LocationBox = ({ post, title }: any) => {
  const { message } = usePhilipLocale();
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
            <CopyButton label={message.detail.copyAddress} text={post.address} />
          </S.LocationInfo>
        </>
      ) : (
        <S.LocationEmpty>{message.detail.noAddress}</S.LocationEmpty>
      )}
    </S.LocationBox>
  );
};
