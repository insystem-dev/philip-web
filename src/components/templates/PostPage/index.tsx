import { BannerSection } from "@/components/organisms/BannerSection";
import { PostSection } from "@/components/organisms/PostSection";
import * as S from "./postPage.style";

interface PostPageProp {
  detailItem: [];
  adsData: [];
}

export const PostPage = ({ detailItem, adsData }: PostPageProp) => {
  return (
    <S.PostLayout>
      <BannerSection adsData={adsData} />
      <PostSection detailItem={detailItem} />
    </S.PostLayout>
  );
};
