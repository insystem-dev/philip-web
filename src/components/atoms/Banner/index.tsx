import Image from "next/image";
import * as S from "./banner.style";

interface BannerProps {
  order: string;
  ads?: any;
  admin?: boolean;
}

export const Banner: React.FC<BannerProps> = ({ order, ads, admin }) => {
  // 광고 데이터가 없으면 렌더하지 않음 (src=undefined 크래시 방지)
  if (!ads) return null;

  return (
    <S.Banner order={order} admin={admin}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${ads?.filename}`}
        layout="fill"
        alt="광고"
      />
    </S.Banner>
  );
};
