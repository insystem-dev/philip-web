import { useEffect, useState } from "react";
import Image from "next/image";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import * as S from "./introPage.style";
import LogoWeb from "public/assets/images/img-logo-web.png";
import LogoMobile from "public/assets/images/img-logo-mobile.png";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const IntroPage = () => {
  const { message } = usePhilipLocale();
  const [fadeItem, setFadeItem] = useState("fade-element");
  const isWindowWidth = useWindowWidth();

  useEffect(() => {
    const tick = setTimeout(() => setFadeItem("fade-element delayed"), 2500);
    // 언마운트 시 타이머 정리
    return () => clearTimeout(tick);
  }, []);

  return (
    <S.IntroPage className={fadeItem} window={isWindowWidth}>
      <Image
        src={isWindowWidth < 769 ? LogoMobile : LogoWeb}
        alt={message.common.logoAlt}
        width={isWindowWidth < 769 ? 196 : 413}
        height={isWindowWidth < 769 ? 56 : 55}
      />
    </S.IntroPage>
  );
};

export default IntroPage;
