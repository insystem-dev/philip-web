import { BannerSection } from "@/components/organisms/BannerSection";
import { PostSection } from "@/components/organisms/PostSection";
import * as S from "./postPage.style";

interface PostPageProp {
  detailItem: [];
  adsData: [];
  /** 선택된 지역 (배너 지역별 노출용) */
  cityCode?: string | null;
}

export const PostPage = ({ detailItem, adsData, cityCode }: PostPageProp) => {
  return (
    <S.PostLayout>
      <BannerSection adsData={adsData} cityCode={cityCode} />
      <PostSection detailItem={detailItem} />
    </S.PostLayout>
  );
};
