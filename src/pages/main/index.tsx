/**
 * Main Page
 * 메인 페이지 - 업체 목록, 검색, 필터링 기능
 *
 * 상태 관리:
 * - 모든 상태를 최상위에서 관리하여 하위 컴포넌트에 props로 전달
 * - Recoil atoms: city, category, search (전역 상태)
 * - 로컬 상태: options, count, postList 등
 */
import MainPage from "@/components/templates/MainPage";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAll, categoryState } from "@/recoil/category";
import { cityState } from "@/recoil/city";
import { useQuery } from "react-query";
import { getPostsListApi, getPromtionListApi } from "@/apis/postsApi";
import { getAdsData } from "@/apis/adsApi";
import { checkTodayVisit, getVisitCount } from "@/apis/visitApi";
import { searchState } from "@/recoil/search";
import { userTokenState } from "@/recoil/userToken";
import { CategoryLoginRequiredModal } from "@/components/molecules/CategoryLoginRequiredModal";
import { ActiveNoticePopups } from "@/components/molecules/ActiveNoticePopups";
import {
  Category,
  CitySub,
  getCategoryChildrenApi,
  getCategoryNavApi,
  getCityListApi,
} from "@/apis/categoryApi";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

const Main = () => {
  const { locale, message } = usePhilipLocale();
  // ─────────────────────────────────────────────────────────────
  // Recoil 전역 상태
  // ─────────────────────────────────────────────────────────────
  const [category, setCategoryState] = useRecoilState(categoryState);
  const [city, setCityState] = useRecoilState(cityState);
  const [searchInput, setSearchInput] = useRecoilState(searchState);
  const userToken = useRecoilValue(userTokenState);

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [cityOptions, setCityOptions] = useState<CitySub[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loginRequiredCategoryName, setLoginRequiredCategoryName] = useState<
    string | null
  >(null);

  // ─────────────────────────────────────────────────────────────
  // API 쿼리
  // ─────────────────────────────────────────────────────────────

  // 방문자 체크 (오늘 방문 기록) - 완료 후 카운트 조회
  const { isSuccess: visitChecked } = useQuery(
    "checkTodayVisit",
    checkTodayVisit,
    {
      staleTime: Infinity, // 페이지 내에서 한 번만 실행
      retry: 1,
    }
  );

  // 방문자 수 조회 (방문 체크 완료 후 실행)
  const { data: todayCount } = useQuery("getVisitCount", getVisitCount, {
    enabled: visitChecked, // 방문 체크 완료 후 조회
  });

  // 광고 데이터 (선택 지역 전용 배너만 조회)
  // 배너는 지역 전용이라 지역을 고르기 전에는 노출할 것이 없다 → 전체 목록을 헛되이 받지 않도록 막는다
  const { data: adsData } = useQuery(["getAdsData", city || null], getAdsData, {
    enabled: !!city,
  });

  // 프로모션 목록 (도시 선택 시에만 조회)
  const { data: postItem } = useQuery(
    ["getPromtionListApi", city, category, locale],
    getPromtionListApi,
    {
      enabled: !!city,
    }
  );

  // 전체 게시글 목록 (PostListBox에서 끌어올림)
  const { data: postListData, isLoading: isPostLoading } = useQuery(
    ["getPostsListApi", city, category, searchInput, locale],
    getPostsListApi,
    { keepPreviousData: true }
  );

  // 카테고리 목록 (선택 지역의 노출 설정 반영 — 미선택이면 cityCode 없이 전역 목록)
  const { data: categoryItem } = useQuery(
    ["getCategoryNavApi", city ?? null, locale],
    getCategoryNavApi
  );

  // 선택 카테고리의 직계 하위 카테고리 — 있으면 목록을 하위 카테고리별 섹션으로 나눠 보여준다
  const { data: categoryChildren } = useQuery<Category[]>(
    ["getCategoryChildrenApi", category, city ?? null, locale],
    getCategoryChildrenApi,
    {
      enabled: !!category && category !== categoryAll,
    }
  );

  // 도시 목록
  const { data: cityItem } = useQuery(
    ["getCityListApi", locale],
    getCityListApi
  );

  // ─────────────────────────────────────────────────────────────
  // 이벤트 핸들러
  // ─────────────────────────────────────────────────────────────

  /** 검색어 입력 핸들러 */
  const getValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    [setSearchInput]
  );

  /** 도시 선택 핸들러 */
  const getCityOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCityState(e.target.value);
      // 새로 고침 시 선택 city 유지
      localStorage.setItem("city", e.target.value);
    },
    [setCityState]
  );

  /** 카테고리 선택 핸들러 */
  const getCategoryOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextCategory = categoryOptions.find(
        (item) => item.oid === e.target.value
      );
      if (nextCategory?.loginRequired && !userToken) {
        setLoginRequiredCategoryName(nextCategory.name);
        return;
      }
      setCategoryState(e.target.value);
    },
    [categoryOptions, setCategoryState, userToken]
  );

  // ─────────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────────

  // 공개 옵션에는 활성 항목만 유지하고, 저장돼 있던 값이 비활성/삭제 상태면 즉시 유효값으로 보정한다.
  useEffect(() => {
    if (categoryItem) {
      const activeCategories = categoryItem.filter(
        (item) => item.useYn === "Y"
      );
      setCategoryOptions(activeCategories);
      const currentCategory = activeCategories.find(
        (item) => item.oid === category
      );
      if (
        activeCategories.length > 0 &&
        (!currentCategory || (!!currentCategory.loginRequired && !userToken))
      ) {
        const fallback =
          activeCategories.find((item) => item.oid === categoryAll) ??
          activeCategories.find((item) => !item.loginRequired) ??
          activeCategories[0];
        setCategoryState(fallback.oid);
      }
    }

    if (cityItem) {
      const activeCities = cityItem.filter((item) => !item.disabled);
      setCityOptions(activeCities);
      if (activeCities.length === 0) {
        setCityState(null);
        localStorage.removeItem("city");
      } else if (!city || !activeCities.some((item) => item.oid === city)) {
        setCityState(activeCities[0].oid);
        localStorage.setItem("city", activeCities[0].oid);
      }
    }
  }, [
    categoryItem,
    cityItem,
    category,
    city,
    userToken,
    setCategoryState,
    setCityState,
  ]);

  // 방문자 수 처리
  useEffect(() => {
    if (todayCount !== undefined) {
      setCount(todayCount);
    }
  }, [todayCount]);

  // 토큰 복원은 HeadersTokenProvider에서 전담 (만료 검증 포함)
  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>{message.main.title}</title>
        <meta name="description" content={message.main.description} />
        <meta name="keywords" content={message.main.keywords} />
        <link rel="canonical" href="https://philip69.com/main" />
        <link rel="alternate" hrefLang="ko" href="https://philip69.com/main" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://philip69.com/en/main"
        />
      </Head>
      <MainPage
        // 프로모션 데이터
        postItem={postItem ?? []}
        // 전체 게시글 데이터 (PostListBox용)
        postListData={postListData ?? []}
        isPostLoading={isPostLoading}
        // 선택 카테고리의 하위 카테고리 (하위 카테고리별 섹션 구분용)
        categoryChildren={categoryChildren ?? []}
        // 광고 데이터
        adsData={adsData || []}
        // 방문자 수
        count={count}
        // 도시 관련
        cityOptions={cityOptions}
        getCityOption={getCityOption}
        city={city}
        // 카테고리 관련
        categoryOptions={categoryOptions}
        getCategoryOption={getCategoryOption}
        category={category}
        // 검색 관련
        getValue={getValue}
      />
      <CategoryLoginRequiredModal
        open={!!loginRequiredCategoryName}
        categoryName={loginRequiredCategoryName ?? undefined}
        onClose={() => setLoginRequiredCategoryName(null)}
      />
      <ActiveNoticePopups categoryCode={category} />
    </>
  );
};

export default Main;
