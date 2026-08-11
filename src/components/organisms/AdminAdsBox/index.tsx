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
import { AdminCityChips } from "@/components/molecules/AdminCityChips";
import { AD_POSITION_LABELS } from "@/components/organisms/AdminAdsPreview";
import { Category, CitySub } from "@/apis/categoryApi";
import { AdsLink } from "@/apis/adsApi";
import { adCategoryOf, adCityOf } from "@/lib/adsMatch";

import * as S from "./adminAdsBox.style";

interface AmdinAdsBoxProps {
  scope: "main" | "category";
  adCategoryCode: string;
  categories: Category[];
  onChangeCategory: (code: string) => void;
  /** 선택된 노출 지역 (code_sub.code). 배너는 이 지역에서만 노출된다 */
  adCityCode: string;
  cities: CitySub[];
  onChangeCity: (code: string) => void;
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
  adCityCode,
  cities,
  onChangeCity,
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
  /**
   * 저장된 광고 이미지 (DB에서 불러온 데이터).
   * 등록 카드는 "지금 고른 조합에 실제로 저장된 행"만 다뤄야 하므로 폴백 없이 정확히 일치하는 것만 찾는다.
   * (미리보기는 유저 화면과 같은 폴백을 적용하지만, 여기서 폴백 행을 보여주면
   *  다른 조합의 배너를 이 조합의 것으로 착각해 삭제·교체하게 된다)
   */
  const mainAd = (label: string) =>
    adsData?.find(
      (ads: any) =>
        ads.label === label &&
        adCategoryOf(ads) === adCategoryCode &&
        adCityOf(ads) === adCityCode
    );
  const topAds = mainAd("topAds");
  const btm1 = mainAd("bottom1");
  const btm2 = mainAd("bottom2");
  const btm3 = mainAd("bottom3");

  const categoryAd = (label: string) =>
    adsData?.find(
      (ads: any) => ads.label === label && adCityOf(ads) === adCityCode
    );
  const categoryTopAds = categoryAd("categoryTopAds");
  const categoryBottomAds = categoryAd("categoryBottomAds");
  const categoryTopBottom1 = categoryAd("categoryTopBottom1");
  const categoryTopBottom2 = categoryAd("categoryTopBottom2");
  const categoryTopBottom3 = categoryAd("categoryTopBottom3");

  /**
   * 새로 업로드된 프리뷰 이미지 (아직 저장 안됨).
   * 업로드 시점의 카테고리·지역이 태깅돼 있으므로, 조합을 바꾸면 화면에서만 빠지고 값은 유지된다
   * (기존 카테고리 전환과 동일한 규칙).
   */
  const newMainAd = (label: string) =>
    imgPreview?.find(
      (ads: any) =>
        ads.label === label &&
        ads.adCategoryCode === adCategoryCode &&
        adCityOf(ads) === adCityCode
    );
  const newTopAds = newMainAd("topAds");
  const newBtm1 = newMainAd("bottom1");
  const newBtm2 = newMainAd("bottom2");
  const newBtm3 = newMainAd("bottom3");

  const newCategoryAd = (label: string) =>
    imgPreview?.find(
      (ads: any) => ads.label === label && adCityOf(ads) === adCityCode
    );
  const newCategoryTopAds = newCategoryAd("categoryTopAds");
  const newCategoryBottomAds = newCategoryAd("categoryBottomAds");
  const newCategoryTopBottom1 = newCategoryAd("categoryTopBottom1");
  const newCategoryTopBottom2 = newCategoryAd("categoryTopBottom2");
  const newCategoryTopBottom3 = newCategoryAd("categoryTopBottom3");

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
        {/* 지역은 메인·전체 카테고리 배너 양쪽 모두가 가지므로 탭과 무관하게 항상 노출한다 */}
        <S.CityScopeBox>
          <S.CityScopeLabel>
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            노출 지역
          </S.CityScopeLabel>
          <AdminCityChips
            cities={cities}
            value={adCityCode}
            onChange={onChangeCity}
          />
          <S.CityScopeHint>
            아래 배너들은 <strong>선택한 지역에서만</strong> 노출됩니다. 다른
            지역에는 대신 노출되는 배너가 없으니 지역마다 각각 등록하세요.
          </S.CityScopeHint>
        </S.CityScopeBox>
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
              key={`topAds:${adCategoryCode}:${adCityCode}`}
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
              key={`bottom1:${adCategoryCode}:${adCityCode}`}
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
              key={`bottom2:${adCategoryCode}:${adCityCode}`}
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
              key={`bottom3:${adCategoryCode}:${adCityCode}`}
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
              key={`categoryTopAds:${adCityCode}`}
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
              key={`categoryTopBottom1:${adCityCode}`}
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
              key={`categoryTopBottom2:${adCityCode}`}
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
              key={`categoryTopBottom3:${adCityCode}`}
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
              key={`categoryBottomAds:${adCityCode}`}
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
