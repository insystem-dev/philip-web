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
import { userTokenState } from "@/recoil/userToken";
import { useEffect, useState, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState } from "@/recoil/category";
import { cityState } from "@/recoil/city";
import { useQuery } from "react-query";
import { getPostsListApi, getPromtionListApi } from "@/apis/postsApi";
import { getAdsData } from "@/apis/adsApi";
import { checkTodayVisit, getVisitCount } from "@/apis/visitApi";
import { searchState } from "@/recoil/search";
import { getCategoryNavApi, getCityListApi } from "@/apis/categoryApi";

const Main = () => {
  // ─────────────────────────────────────────────────────────────
  // Recoil 전역 상태
  // ─────────────────────────────────────────────────────────────
  const [userToken, setUserToken]: any = useRecoilState(userTokenState);
  const [category, setCategoryState] = useRecoilState(categoryState);
  const [city, setCityState] = useRecoilState(cityState);
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  // ─────────────────────────────────────────────────────────────
  // 로컬 상태
  // ─────────────────────────────────────────────────────────────
  const [cityOptions, setCityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [count, setCount] = useState<number[]>([]);

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
      const str = String(todayCount);
      const newArr = Array.from(str, (char) => Number(char));
      setCount(newArr);
    }
  }, [todayCount]);

  // 사용자 토큰 복원
  useEffect(() => {
    const userInfo = localStorage.getItem("kakaoSignKey");
    if (userInfo) {
      setUserToken(userInfo);
    }
  }, [setUserToken]);
  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <MainPage
      // 프로모션 데이터
      postItem={postItem ?? []}
      // 전체 게시글 데이터 (PostListBox용)
      postListData={postListData ?? []}
      isPostLoading={isPostLoading}
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
  );
};

export default Main;
