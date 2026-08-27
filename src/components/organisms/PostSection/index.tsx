import { Button } from "@/components/atoms/Button";
import { StoreInfoBox } from "@/components/molecules/StoreInfoBox";
import { PriceInfoBox } from "@/components/molecules/PriceInfoBox";
import { LocationBox } from "@/components/molecules/LocationBox";
import * as S from "./postSection.style";
import IconBack from "public/assets/svg/icon-arrow-back.svg";
import { useRouter } from "next/router";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface PostSectionProp {
  detailItem: [];
}

export const PostSection = ({ detailItem }: PostSectionProp) => {
  const router = useRouter();
  const { message } = usePhilipLocale();

  return (
    <S.PostSection>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <Button
          type="button"
          height={36}
          color="clear"
          layout="icon"
          label={message.detail.backToList}
          onClick={() => router.back()}
        >
          <IconBack />
        </Button>
      </div>

      <StoreInfoBox post={detailItem} />
      <PriceInfoBox post={detailItem} title={message.detail.priceAndMenu} />
      <LocationBox post={detailItem} title={message.detail.directions} />
    </S.PostSection>
  );
};
