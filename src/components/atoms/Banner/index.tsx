import Image from "next/image";
import * as S from "./banner.style";

interface BannerProps {
  order: string;
  ads?: any;
  admin?: boolean;
  loading?: boolean;
}

export const Banner: React.FC<BannerProps> = ({
  order,
  ads,
  admin,
  loading,
}) => {
  return (
    <S.Banner order={order} admin={admin}>
      {ads?.filename && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${ads.filename}`}
          layout="fill"
          alt="광고"
        />
      )}
      {loading && (
        <S.BannerLoadingOverlay>
          <S.BannerLoader />
        </S.BannerLoadingOverlay>
      )}
    </S.Banner>
  );
};
