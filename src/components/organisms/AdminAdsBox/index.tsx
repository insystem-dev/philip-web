/**
 * AdminAdsBox Organism
 * 광고 배너 등록 박스
 *
 * 변경사항:
 * - adsState(recoil) 대신 adsData(API 응답)를 직접 사용
 * - isAds: 저장된 광고가 있으면 해당 객체, 없으면 undefined
 */
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputAdsFile } from "@/components/atoms/Input/InputAdsFile";
import { AdminCategoryDrilldown } from "@/components/molecules/AdminCategoryDrilldown";
import { AD_POSITION_LABELS } from "@/components/organisms/AdminAdsPreview";
import { Category } from "@/apis/categoryApi";
import { AdsLink } from "@/apis/adsApi";

import * as S from "./adminAdsBox.style";

interface AmdinAdsBoxProps {
  scope: "main" | "category";
  adCategoryCode: string;
  categories: Category[];
  onChangeCategory: (code: string) => void;
  imgPreview: any[];
  setImgPreview: React.Dispatch<React.SetStateAction<any>>;
  adsData: any[];
  onChangeImages: (e: any) => void;
  onDeleteOne: (id: string) => void;
  onSubmit: (e: Event) => void;
  onRemovePreviewImage: (isAds: any) => void;
  onDeleteAll: () => void;
  /** 배너 연결 대상으로 고를 수 있는 등록 업체 목록 */
  stores: any[];
  /** label별 연결 대상 입력값 조회 */
  getLink: (label: string) => AdsLink;
  /** label별 연결 대상 변경 */
  onChangeLink: (label: string, next: AdsLink) => void;
}

export const AmdinAdsBox = ({
  scope,
  adCategoryCode,
  categories,
  onChangeCategory,
  imgPreview,
  onDeleteOne,
  onSubmit,
  onRemovePreviewImage,
  onDeleteAll,
  adsData,
  onChangeImages,
  stores,
  getLink,
  onChangeLink,
}: AmdinAdsBoxProps) => {
  /** 저장된 광고 이미지 (DB에서 불러온 데이터) */
  const mainAd = (label: string) => adsData?.find((ads: any) =>
    ads.label === label && (ads.adCategoryCode || "CATEGORY-ALL") === adCategoryCode);
  const topAds = mainAd("topAds");
  const btm1 = mainAd("bottom1");
  const btm2 = mainAd("bottom2");
  const btm3 = mainAd("bottom3");
  const categoryTopAds = adsData?.find(
    (ads: any) => ads.label === "categoryTopAds"
  );
  const categoryBottomAds = adsData?.find(
    (ads: any) => ads.label === "categoryBottomAds"
  );
  const categoryTopBottom1 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom1"
  );
  const categoryTopBottom2 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom2"
  );
  const categoryTopBottom3 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom3"
  );

  /** 새로 업로드된 프리뷰 이미지 (아직 저장 안됨) */
  const newMainAd = (label: string) => imgPreview?.find((ads: any) =>
    ads.label === label && ads.adCategoryCode === adCategoryCode);
  const newTopAds = newMainAd("topAds");
  const newBtm1 = newMainAd("bottom1");
  const newBtm2 = newMainAd("bottom2");
  const newBtm3 = newMainAd("bottom3");
  const newCategoryTopAds = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopAds"
  );
  const newCategoryBottomAds = imgPreview?.find(
    (ads: any) => ads.label === "categoryBottomAds"
  );
  const newCategoryTopBottom1 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom1"
  );
  const newCategoryTopBottom2 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom2"
  );
  const newCategoryTopBottom3 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom3"
  );

  return (
    <S.AdminAdsBox>
      <S.AdminAdsTit>
        {scope === "main" ? "메인 페이지 배너 등록" : "전체 카테고리 배너 등록"}
      </S.AdminAdsTit>
      <S.AdminAdsDesc>
        배너 이미지를 등록하고 클릭 시 이동할 대상을 연결하세요. 변경 사항은{" "}
        <strong>저장</strong>을 눌러야 반영됩니다.
      </S.AdminAdsDesc>
      <S.AdminAdsInput>
        {scope === "main" ? (
          <>
            <S.CategoryScopeBox>
              <S.CategoryScopeLabel>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                노출 카테고리
              </S.CategoryScopeLabel>
              <S.CategoryScopeControl>
                <AdminCategoryDrilldown
                  categories={categories}
                  value={adCategoryCode}
                  onChange={onChangeCategory}
                  allowAll
                />
              </S.CategoryScopeControl>
              <S.CategoryScopeHint>
                아래 배너들은 여기서 선택한 카테고리의 메인 페이지에
                노출됩니다. 카테고리를 바꾸면 해당 카테고리의 배너 목록으로
                전환됩니다.
              </S.CategoryScopeHint>
            </S.CategoryScopeBox>
            <InputAdsFile
              key={`topAds:${adCategoryCode}`}
              label={AD_POSITION_LABELS.topAds}
              id="topAds"
              onChangeImages={onChangeImages}
              isAds={topAds}
              isPreview={newTopAds}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={topAds || newTopAds}
              stores={stores}
              link={getLink("topAds")}
              onChangeLink={(next) => onChangeLink("topAds", next)}
            />
            <InputAdsFile
              key={`bottom1:${adCategoryCode}`}
              label={AD_POSITION_LABELS.bottom1}
              id="bottom1"
              onChangeImages={onChangeImages}
              isAds={btm1}
              isPreview={newBtm1}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={btm1 || newBtm1}
              stores={stores}
              link={getLink("bottom1")}
              onChangeLink={(next) => onChangeLink("bottom1", next)}
            />
            <InputAdsFile
              key={`bottom2:${adCategoryCode}`}
              label={AD_POSITION_LABELS.bottom2}
              id="bottom2"
              onChangeImages={onChangeImages}
              isAds={btm2}
              isPreview={newBtm2}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={btm2 || newBtm2}
              stores={stores}
              link={getLink("bottom2")}
              onChangeLink={(next) => onChangeLink("bottom2", next)}
            />
            <InputAdsFile
              key={`bottom3:${adCategoryCode}`}
              label={AD_POSITION_LABELS.bottom3}
              id="bottom3"
              onChangeImages={onChangeImages}
              isAds={btm3}
              isPreview={newBtm3}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={btm3 || newBtm3}
              stores={stores}
              link={getLink("bottom3")}
              onChangeLink={(next) => onChangeLink("bottom3", next)}
            />
          </>
        ) : (
          <>
            <InputAdsFile
              key="categoryTopAds"
              label={AD_POSITION_LABELS.categoryTopAds}
              id="categoryTopAds"
              onChangeImages={onChangeImages}
              isAds={categoryTopAds}
              isPreview={newCategoryTopAds}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={categoryTopAds || newCategoryTopAds}
              stores={stores}
              link={getLink("categoryTopAds")}
              onChangeLink={(next) => onChangeLink("categoryTopAds", next)}
            />
            <InputAdsFile
              key="categoryTopBottom1"
              label={AD_POSITION_LABELS.categoryTopBottom1}
              id="categoryTopBottom1"
              onChangeImages={onChangeImages}
              isAds={categoryTopBottom1}
              isPreview={newCategoryTopBottom1}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={categoryTopBottom1 || newCategoryTopBottom1}
              stores={stores}
              link={getLink("categoryTopBottom1")}
              onChangeLink={(next) => onChangeLink("categoryTopBottom1", next)}
            />
            <InputAdsFile
              key="categoryTopBottom2"
              label={AD_POSITION_LABELS.categoryTopBottom2}
              id="categoryTopBottom2"
              onChangeImages={onChangeImages}
              isAds={categoryTopBottom2}
              isPreview={newCategoryTopBottom2}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={categoryTopBottom2 || newCategoryTopBottom2}
              stores={stores}
              link={getLink("categoryTopBottom2")}
              onChangeLink={(next) => onChangeLink("categoryTopBottom2", next)}
            />
            <InputAdsFile
              key="categoryTopBottom3"
              label={AD_POSITION_LABELS.categoryTopBottom3}
              id="categoryTopBottom3"
              onChangeImages={onChangeImages}
              isAds={categoryTopBottom3}
              isPreview={newCategoryTopBottom3}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={categoryTopBottom3 || newCategoryTopBottom3}
              stores={stores}
              link={getLink("categoryTopBottom3")}
              onChangeLink={(next) => onChangeLink("categoryTopBottom3", next)}
            />
            <InputAdsFile
              key="categoryBottomAds"
              label={AD_POSITION_LABELS.categoryBottomAds}
              id="categoryBottomAds"
              onChangeImages={onChangeImages}
              isAds={categoryBottomAds}
              isPreview={newCategoryBottomAds}
              onDelete={onDeleteOne}
              onRemovePreviewImage={onRemovePreviewImage}
              file={categoryBottomAds || newCategoryBottomAds}
              stores={stores}
              link={getLink("categoryBottomAds")}
              onChangeLink={(next) => onChangeLink("categoryBottomAds", next)}
            />
          </>
        )}
        <ButtonGroup marginTop={20}>
          <Button
            type="submit"
            color="primary"
            layout="solid"
            width="90px"
            height={38}
            label="저장"
            onClick={(e: Event) => onSubmit(e)}
          />
          {/* 전체삭제는 form submit이 아니므로 button 타입으로 리로드 방지 */}
          <Button
            type="button"
            color="func"
            layout="solid"
            width="90px"
            height={38}
            label="전체삭제"
            onClick={onDeleteAll}
          />
        </ButtonGroup>
      </S.AdminAdsInput>
    </S.AdminAdsBox>
  );
};
