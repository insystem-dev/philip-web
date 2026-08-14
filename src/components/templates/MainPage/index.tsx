import { AsideSection } from "@/components/organisms/AsideSection";
import { BannerSection } from "@/components/organisms/BannerSection";
import { ContentSection } from "@/components/organisms/ContentSection";

import * as S from "./mainPage.style";

interface MainPageProp {
  /** 프로모션 데이터 */
  postItem: any[];
  /** 전체 게시글 데이터 (PostListBox용) */
  postListData: any[];
  /** 게시글 로딩 상태 */
  isPostLoading: boolean;
  /** 선택 카테고리의 직계 하위 카테고리 (있으면 하위 카테고리별 섹션으로 표시) */
  categoryChildren: any[];
  /** 광고 데이터 */
  adsData: any[];
  /** 방문자 수 */
  count: number;
  /** 도시 옵션 */
  cityOptions: any[];
  /** 도시 선택 핸들러 */
  getCityOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** 선택된 도시 */
  city: string | null;
  /** 카테고리 옵션 */
  categoryOptions: any[];
  /** 카테고리 선택 핸들러 */
  getCategoryOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** 선택된 카테고리 */
  category: string;
  /** 검색어 입력 핸들러 */
  getValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainPage = ({
  postItem,
  postListData,
  isPostLoading,
  categoryChildren,
  adsData,
  count,
  cityOptions,
  getCityOption,
  city,
  categoryOptions,
  getCategoryOption,
  category,
  getValue,
}: MainPageProp) => {
  return (
    <S.MainLayout>
      <S.FlagBackdrop aria-hidden="true">
        <S.FlagSurface>
          <S.FlagSun>☀</S.FlagSun>
          <S.FlagStar $position="left">★</S.FlagStar>
          <S.FlagStar $position="right">★</S.FlagStar>
          <S.FlagStar $position="bottom">★</S.FlagStar>
          <S.FlagFold $index={1} />
          <S.FlagFold $index={2} />
          <S.FlagFold $index={3} />
        </S.FlagSurface>
      </S.FlagBackdrop>
      <BannerSection adsData={adsData} categoryCode={category} cityCode={city} />
      <AsideSection
        count={count}
        cityOptions={cityOptions}
        getCityOption={getCityOption}
        city={city}
        categoryOptions={categoryOptions}
        getCategoryOption={getCategoryOption}
        category={category}
        getValue={getValue}
      />
      <ContentSection
        postItem={postItem}
        postListData={postListData}
        isPostLoading={isPostLoading}
        categoryChildren={categoryChildren}
      />
    </S.MainLayout>
  );
};

export default MainPage;
