import { Button } from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import * as S from "./footer.style";

export const Footer = () => {
  return (
    <S.Footer>
      <S.FooterRow>
        <S.FooterLinkBox>
          <Logo footer={true} />
          <S.FooterBtnBox>
            <Button
              type="button"
              color="clear"
              layout="icon"
              size="md"
              label="광고문의"
            />
            <Button
              type="button"
              color="clear"
              layout="icon"
              size="md"
              label="VIP 이용안내"
            />
          </S.FooterBtnBox>
        </S.FooterLinkBox>
        <S.FooterCopySpan>Philip. 2023. All rights reserved.</S.FooterCopySpan>
      </S.FooterRow>
    </S.Footer>
  );
};

export default Footer;
