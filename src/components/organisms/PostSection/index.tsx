import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { StoreInfoBox } from "@/components/molecules/StoreInfoBox";
import { PriceInfoBox } from "@/components/molecules/PriceInfoBox";
import { LocationBox } from "@/components/molecules/LocationBox";
import * as S from "./postSection.style";
import IconBack from "public/assets/svg/icon-arrow-back.svg";
import { useRouter } from "next/router";

interface PostSectionProp {
  detailItem: [];
}

export const PostSection = ({ detailItem }: PostSectionProp) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <S.PostSection>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <Button
          type="button"
          height={36}
          color="clear"
          layout="icon"
          label="목록으로"
          onClick={() => router.back()}
        >
          <IconBack />
        </Button>
      </div>

      <StoreInfoBox post={detailItem} />
      <PriceInfoBox
        post={detailItem}
        openHandler={openHandler}
        open={isOpen}
        title="요금 및 메뉴 안내"
      />
      <LocationBox post={detailItem} title="오시는 길" />
    </S.PostSection>
  );
};
