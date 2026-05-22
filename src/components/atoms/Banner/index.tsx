import Image from "next/image";
import * as S from "./banner.style";

interface BannerProps {
  order: string;
  ads?: any;
  admin?: boolean;
}

export const Banner: React.FC<BannerProps> = ({ order, ads, admin }) => {
  return (
    <S.Banner order={order} admin={admin}>
      <Image
        src={ads && `${process.env.NEXT_PUBLIC_API_URL}/${ads?.filename}`}
        layout="fill"
        alt="광고"
      />
    </S.Banner>
  );
};
