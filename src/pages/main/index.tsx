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
import {
  Category,
  CitySub,
  getCategoryChildrenApi,
  getCategoryNavApi,
  getCityListApi,
} from "@/apis/categoryApi";

const Main = () => {
  // ─────────────────────────────────────────────────────────────
  // Recoil 전역 상태
  // ─────────────────────────────────────────────────────────────
  const [category, setCategoryState] = useRecoilState(categoryState);
  const [city, setCityState] = useRecoilState(cityState);
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [cityOptions, setCityOptions] = useState<CitySub[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(0);

  // ─────────────────────────────────────────────────────────────
  // API 쿼리
  // ─────────────────────────────────────────────────────────────

  // 방문자 체크 (오늘 방문 기록) - 완료 후 카운트 조회
  const { isSuccess: visitChecked } = useQuery("checkTodayVisit", checkTodayVisit, {
    staleTime: Infinity, // 페이지 내에서 한 번만 실행
    retry: 1,
  });

  // 방문자 수 조회 (방문 체크 완료 후 실행)
  const { data: todayCount } = useQuery("getVisitCount", getVisitCount, {
    enabled: visitChecked, // 방문 체크 완료 후 조회
  });

  // 광고 데이터
  const { data: adsData } = useQuery("getAdsData", getAdsData);

  // 프로모션 목록 (도시 선택 시에만 조회)
  const { data: postItem } = useQuery(
    ["getPromtionListApi", city, category],
    getPromtionListApi,
    {
      enabled: !!city,
    }
  );

  // 전체 게시글 목록 (PostListBox에서 끌어올림)
  const { data: postListData, isLoading: isPostLoading } = useQuery(
    ["getPostsListApi", city, category, searchInput],
    getPostsListApi
  );

  // 카테고리 목록
  const { data: categoryItem } = useQuery(
    "getCategoryNavApi",
    getCategoryNavApi
  );

  // 선택 카테고리의 직계 하위 카테고리 — 있으면 목록을 하위 카테고리별 섹션으로 나눠 보여준다
  const { data: categoryChildren } = useQuery<Category[]>(
    ["getCategoryChildrenApi", category],
    getCategoryChildrenApi,
    {
      enabled: !!category && category !== categoryAll,
    }
  );

  // 도시 목록
  const { data: cityItem } = useQuery("getCityListApi", getCityListApi);

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
      setCategoryState(e.target.value);
    },
    [setCategoryState]
  );

  // ─────────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────────

  // 옵션 데이터 설정
  useEffect(() => {
    if (categoryItem) setCategoryOptions(categoryItem);
    if (cityItem) setCityOptions(cityItem);
  }, [categoryItem, cityItem]);

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
        <title>필립69 PHILIP69 | 필리핀 업체 검색</title>
        <meta
          name="description"
          content="필립, 필립69, PHILIP, PHILIP69에서 필리핀 지역과 카테고리별 업체를 검색해 보세요."
        />
        <meta
          name="keywords"
          content="필립, 필립69, philip, philip69"
        />
        <link rel="canonical" href="https://philip69.com/main" />
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
    </>
  );
};

export default Main;
