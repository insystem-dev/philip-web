import { useEffect, useState } from "react";
import Image from "next/image";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import * as S from "./introPage.style";
import LogoWeb from "public/assets/images/img-logo-web.png";
import LogoMobile from "public/assets/images/img-logo-mobile.png";

export const IntroPage = () => {
  const [fadeItem, setFadeItem] = useState("fade-element");
  const isWindowWidth = useWindowWidth();

  useEffect(() => {
    setTimeout(() => setFadeItem("fade-element delayed"), 2500);
  }, []);

  return (
    <S.IntroPage className={fadeItem} window={isWindowWidth}>
      <Image
        src={isWindowWidth < 769 ? LogoMobile : LogoWeb}
        alt="필립 로고"
        width={isWindowWidth < 769 ? 196 : 413}
        height={isWindowWidth < 769 ? 56 : 55}
      />
    </S.IntroPage>
  );
};

export default IntroPage;
