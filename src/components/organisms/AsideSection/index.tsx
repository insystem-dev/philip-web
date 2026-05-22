import { CounterBox } from "@/components/molecules/CounterBox";
import { LinkBox } from "@/components/molecules/LinkBox";
import { SearchBox } from "@/components/molecules/SearchBox";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import * as S from "./asideSection.style";

interface AsideSectionProp {
  count: any;
  cityOptions: any[];
  getCityOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  city: any;
  categoryOptions: any[];
  getCategoryOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  category: any;
  getValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AsideSection = ({
  count,
  cityOptions,
  getCityOption,
  city,
  categoryOptions,
  getCategoryOption,
  category,
  getValue,
}: AsideSectionProp) => {
  const isWindowWidth = useWindowWidth();
  return (
    <S.AsideSection>
      <CounterBox count={count} />
      <SearchBox
        cityOptions={cityOptions}
        getCityOption={getCityOption}
        city={city}
        categoryOptions={categoryOptions}
        getCategoryOption={getCategoryOption}
        category={category}
        getValue={getValue}
      />
      {isWindowWidth >= 769 && <LinkBox />}
    </S.AsideSection>
  );
};
