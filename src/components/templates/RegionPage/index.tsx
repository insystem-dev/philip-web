import { RegionList } from "@/components/molecules/RegionList";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import * as S from "./RegionPage.style";

export const RegionPage = () => {
  const { message } = usePhilipLocale();

  return (
    <S.RegionPage aria-labelledby="region-page-title">
      <S.RegionIntro>
        <LanguageSwitcher />
        <S.RegionTxtBox id="region-page-title">
          {message.home.selectRegion}
        </S.RegionTxtBox>
      </S.RegionIntro>
      <RegionList />
    </S.RegionPage>
  );
};

export default RegionPage;
