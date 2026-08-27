import { Button } from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import * as S from "./footer.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const Footer = () => {
  const { message } = usePhilipLocale();

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
              label={message.contact.ads}
            />
            <Button
              type="button"
              color="clear"
              layout="icon"
              size="md"
              label={message.contact.vip}
            />
          </S.FooterBtnBox>
        </S.FooterLinkBox>
        <S.FooterCopySpan>Philip. 2023. All rights reserved.</S.FooterCopySpan>
      </S.FooterRow>
    </S.Footer>
  );
};

export default Footer;
