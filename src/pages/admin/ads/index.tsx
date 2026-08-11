import { AdminAdsPage } from "@/components/templates/AdminAdsPage";
import {
  AdsLink,
  addAdsApi,
  deleteAllAdsApi,
  deleteOneAdsApi,
  getAdsData,
  updateAdsLinkApi,
} from "@/apis/adsApi";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InputFile } from "@/components/atoms/Input/InputFile";
import useApiError from "@/lib/hooks/useApiError";
import {
  deletePreviewImagesAPI,
  getAdminStorePosts,
  uploadImagesAPI,
} from "@/apis/postsApi";
import {
  Category,
  CitySub,
  getCategoryTreeApi,
  getCityListApi,
} from "@/apis/categoryApi";
import { CATEGORY_ALL, CITY_ALL } from "@/lib/adsMatch";

const MAIN_LABELS = ["topAds", "bottom1", "bottom2", "bottom3"];
const CATEGORY_LABELS = ["categoryTopAds", "categoryTopBottom1", "categoryTopBottom2", "categoryTopBottom3", "categoryBottomAds"];

const EMPTY_LINK: AdsLink = { postOid: null, url: "", isExternal: false };

/**
 * 링크 드래프트 key
 * 메인 배너는 같은 label 이 카테고리·지역별로 다른 행이라 두 축을 모두 키에 넣는다.
 * 카테고리는 전체일 때 null 로 오므로 "CATEGORY-ALL" 로 정규화하고(AdminAdsBox / AdminAdsPreview 와 동일),
 * 지역은 정규화 없이 그대로 쓴다 — 지역이 비어 있는 행은 어느 지역에서도 다루지 않는다.
 * 전체 카테고리 배너(CATEGORY_LABELS)는 카테고리 구분이 없으므로 "-" 로 고정하고 지역만 붙인다.
 */
const linkKey = (
  label: string,
  adCategoryCode?: string | null,
  adCityCode?: string | null
) =>
  MAIN_LABELS.includes(label)
    ? `${label}::${adCategoryCode || CATEGORY_ALL}::${adCityCode || "-"}`
    : `${label}::-::${adCityCode || "-"}`;

/** 링크 드래프트 → 서버 전송 값. 외부 URL 체크 여부로 둘 중 하나만 보낸다 */
const toLinkPayload = (draft?: AdsLink) => ({
  adLinkPostOid: draft && !draft.isExternal ? draft.postOid || null : null,
  adLinkUrl: draft && draft.isExternal ? draft.url.trim() || null : null,
});

/**
 * 저장 전 링크 검증
 * - 업체 연결과 외부 URL 동시 지정 금지
 * - 외부 URL 은 http:// 또는 https:// 로만 시작 → javascript:, data: 스킴 차단
 */
const validateLink = (label: string, draft?: AdsLink) => {
  if (!draft) return true;
  const url = draft.url.trim();
  if (!draft.isExternal || !url) return true;

  if (draft.postOid) {
    alert(`[${label}] 연결 업체와 외부 URL 은 함께 지정할 수 없습니다.`);
    return false;
  }
  if (!/^https?:\/\//i.test(url)) {
    alert(`[${label}] 외부 URL 은 http:// 또는 https:// 로 시작해야 합니다.`);
    return false;
  }
  return true;
};

const AdminAds = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  // 빈 배열로 초기화 (기존 { totem: "" } 객체가 저장 시 문제 발생)
  const [imgPreview, setImgPreview] = useState<any[]>([]);
  // 업로드 진행 중인 배너 label 목록 (미리보기 로딩 인디케이터용)
  const [uploadingLabels, setUploadingLabels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"main" | "category">("main");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);
  /**
   * 선택된 노출 지역.
   * 지역 축에는 폴백이 없어 지역을 고르기 전에는 다룰 배너 자체가 없다 → 목록이 오면 첫 지역을 자동 선택한다.
   */
  const [selectedCity, setSelectedCity] = useState("");
  const { data: categories = [] } = useQuery<Category[]>(
    ["getCategoryTreeApi"], getCategoryTreeApi
  );
  const { data: cityList = [] } = useQuery<CitySub[]>(
    ["getCityListApi"], getCityListApi
  );

  // 폐지된 전 지역 공통(CITY-ALL)이 공통코드에 남아 있어도 배너 지역 선택지로는 보이지 않게 거른다
  const cities = useMemo(
    () => cityList.filter((city) => city.oid !== CITY_ALL),
    [cityList]
  );

  // 첫 진입 시 첫 활성 지역을 자동 선택 (활성 지역이 없으면 첫 지역)
  useEffect(() => {
    if (selectedCity || cities.length === 0) return;
    setSelectedCity((cities.find((city) => !city.disabled) ?? cities[0]).oid);
  }, [cities, selectedCity]);
  // 쿼리키를 배열 형식으로 통일 (invalidateQueries와 일치)
  // 관리자 화면은 지역 필터 없이 전체를 받아 클라이언트에서 거른다
  // (지역 전환 시 재요청 없이 즉시 전환되고, 어느 지역에 무엇이 걸려 있는지 파악하기 쉽다)
  const { data: adsData } = useQuery(["getAdsData"], getAdsData, {
    retry: 1,
    onError(error: any) {
      handleError(error);
    },
  });

  /** 배너 연결 대상으로 고를 업체 목록 (페이징 없이 전체를 반환 → 검색은 클라이언트 필터) */
  const { data: stores = [] } = useQuery(
    ["getAdminStorePosts", "", "CATEGORY-ALL", "false"],
    getAdminStorePosts,
    {
      onError(error: any) {
        handleError(error);
      },
    }
  );

  /** label+카테고리별 연결 대상 입력값 */
  const [linkDrafts, setLinkDrafts] = useState<Record<string, AdsLink>>({});

  /**
   * 저장된 광고의 링크 값을 드래프트로 하이드레이트한다.
   * 이미 드래프트가 있는 키는 건드리지 않는다 — refetchOnWindowFocus 로 목록이
   * 다시 들어올 때 편집 중이던 값이 서버 값으로 되돌아가는 것을 막기 위함.
   */
  useEffect(() => {
    if (!adsData) return;
    setLinkDrafts((prev) => {
      const next = { ...prev };
      adsData.forEach((ads: any) => {
        const key = linkKey(ads.label, ads.adCategoryCode, ads.adCityCode);
        if (next[key]) return;
        next[key] = {
          postOid: ads.adLinkPostOid ?? null,
          url: ads.adLinkUrl ?? "",
          isExternal: !!ads.adLinkUrl,
        };
      });
      return next;
    });
  }, [adsData]);

  /** 현재 탭/카테고리/지역 기준 label 의 연결 대상 입력값 */
  const getLink = (label: string) =>
    linkDrafts[linkKey(label, selectedCategory, selectedCity)] ?? EMPTY_LINK;

  const onChangeLink = (label: string, next: AdsLink) => {
    setLinkDrafts((prev) => ({
      ...prev,
      [linkKey(label, selectedCategory, selectedCity)]: next,
    }));
  };

  const addAdsMutation = useMutation("addAdsApi", addAdsApi);
  /** 이미지 전체 삭제 */
  const deleteAllAdsMutaion = useMutation("deleteAllAdsApi", deleteAllAdsApi, {
    onSuccess: () => {
      // ✋ 삭제가 성공하면 리스트를 다시 get
      queryClient.invalidateQueries(["getAdsData"]);
    },
  });
  /** 이미지 개별 삭제 */
  const deleteOneAdsMutation = useMutation("deleteOneAdsApi", deleteOneAdsApi, {
    onSuccess: () => {
      // ✋ 삭제가 성공하면 리스트를 다시 get
      queryClient.invalidateQueries(["getAdsData"]);
    },
  });

  /** 이미지 id값에 따라 label 저장 */
  const onChangeImages = (e: any) => {
    e.preventDefault();
    const label = e.target.id;
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f: any) => {
      imageFormData.append("files", f);
    });
    setUploadingLabels((prev) => prev.concat(label));
    uploadImagesAPI(imageFormData).then((result) => {
      // taeget.id 따라 label 구분해서 서버로 전송
      result.forEach((data: any) => {
        data.label = label;
        data.adCategoryCode = activeTab === "main" ? selectedCategory : null;
        // 지역은 카테고리와 달리 메인/전체 카테고리 배너 양쪽 모두가 가진다
        data.adCityCode = selectedCity;
      });
      setImgPreview((prev: any) => prev.concat(result));
    }).catch((err) => {
      // 이미지 업로드 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    }).finally(() => {
      setUploadingLabels((prev) => prev.filter((l) => l !== label));
    });
  };

  /** 광고 저장  */
  const onSubmit = (e: Event) => {
    e.preventDefault();

    // 지역은 필수다 — 서버가 지역 없는 배너를 400 으로 막는다
    if (!selectedCity) {
      alert("노출 지역을 먼저 선택해주세요.");
      return;
    }

    // 유효한 이미지만 필터링 (filename이 있는 항목만)
    const labels = activeTab === "main" ? MAIN_LABELS : CATEGORY_LABELS;
    const validImages = imgPreview.filter(
      (item: any) => item && item.filename && labels.includes(item.label) &&
        (activeTab !== "main" || item.adCategoryCode === selectedCategory) &&
        item.adCityCode === selectedCity
    );

    // 새로 저장할 이미지에 해당 키의 링크 값을 주입
    // (아직 oid 가 없어 PUT 을 쓸 수 없는 칸은 이렇게 등록 페이로드에 실어 보낸다)
    const imagesToSave = validImages.map((item: any) => ({
      ...item,
      ...toLinkPayload(
        linkDrafts[linkKey(item.label, item.adCategoryCode, item.adCityCode)]
      ),
    }));

    /**
     * 이미 저장된 광고 중 링크만 바뀐 행.
     * 이 경로가 없으면 링크만 교체할 때도 이미지를 지웠다 다시 올려야 한다.
     * 같은 키로 새 이미지를 올린 경우는 위 생성 요청이 링크를 함께 보내므로 제외한다.
     */
    const uploadedKeys = validImages.map((item: any) =>
      linkKey(item.label, item.adCategoryCode, item.adCityCode)
    );
    /** 지금 보고 있는 (탭, 카테고리, 지역) 조합에 이미 저장돼 있는 배너 행 */
    const scopedAds = (adsData ?? []).filter(
      (ads: any) =>
        labels.includes(ads.label) &&
        (activeTab !== "main" ||
          (ads.adCategoryCode || CATEGORY_ALL) === selectedCategory) &&
        ads.adCityCode === selectedCity
    );

    const changedLinks = scopedAds
      .map((ads: any) => {
        const key = linkKey(ads.label, ads.adCategoryCode, ads.adCityCode);
        return { ads, key, draft: linkDrafts[key] };
      })
      .filter((row: any) => row.draft && !uploadedKeys.includes(row.key))
      .map((row: any) => ({ ...row, payload: toLinkPayload(row.draft) }))
      .filter(
        (row: any) =>
          (row.ads.adLinkPostOid ?? null) !== row.payload.adLinkPostOid ||
          (row.ads.adLinkUrl ?? null) !== row.payload.adLinkUrl
      );

    if (imagesToSave.length === 0 && changedLinks.length === 0) {
      alert("저장할 변경 내용이 없습니다.");
      return;
    }

    // 링크 검증 (동시 지정 금지 / http(s) 스킴만 허용)
    const targets = [
      ...validImages.map((item: any) => ({
        label: item.label,
        key: linkKey(item.label, item.adCategoryCode, item.adCityCode),
      })),
      ...changedLinks.map((row: any) => ({ label: row.ads.label, key: row.key })),
    ];
    if (targets.some(({ label, key }) => !validateLink(label, linkDrafts[key]))) {
      return;
    }

    /** 이미 저장된 행의 링크 변경분을 한 번에 반영 */
    const saveRowChanges = () =>
      Promise.all(
        changedLinks.map((row: any) => updateAdsLinkApi(row.ads.oid, row.payload))
      );
    const onDone = () => {
      alert("저장이 완료되었습니다.");
      setImgPreview([]);
      queryClient.invalidateQueries(["getAdsData"]);
    };
    const onFail = () => {
      alert("저장 중 오류가 발생했습니다.");
    };

    // 이미지 변경 없이 링크만 바꾸는 경우
    if (imagesToSave.length === 0) {
      saveRowChanges().then(onDone).catch(onFail);
      return;
    }

    addAdsMutation.mutate(imagesToSave, {
      onSuccess: () => {
        saveRowChanges().then(onDone).catch(onFail);
      },
      onError: onFail,
    });
  };

  /** 전체삭제 — 지금 보고 있는 (탭, 카테고리, 지역) 조합만 지운다 */
  const onDeleteAll = () => {
    // cityCode 없이 보내면 서버가 400 으로 막는다 (범위 삭제는 항상 한 지역 안에서만)
    if (!selectedCity) return;
    deleteAllAdsMutaion.mutate({
      scope: activeTab,
      ...(activeTab === "main" && { categoryCode: selectedCategory }),
      cityCode: selectedCity,
    });
  };

  /** 개별 삭제 */
  const onDeleteOne = (id: string) => {
    deleteOneAdsMutation.mutate(id);
  };

  /** 미리보기 이미지 삭제 */
  const onRemovePreviewImage = (isAds: any) => {
    deletePreviewImagesAPI(isAds.filename).then(() => {
      // 올바른 functional setState 사용
      setImgPreview((prev: any[]) =>
        prev.filter((item: any) => item.filename !== isAds.filename)
      );
    }).catch((err) => {
      // 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  };

  return (
    <AdminAdsPage
      imgPreview={imgPreview}
      setImgPreview={setImgPreview}
      uploadingLabels={uploadingLabels}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      cities={cities}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      adsData={adsData}
      onChangeImages={onChangeImages}
      onDeleteOne={onDeleteOne}
      onSubmit={onSubmit}
      onRemovePreviewImage={onRemovePreviewImage}
      onDeleteAll={onDeleteAll}
      stores={stores}
      getLink={getLink}
      onChangeLink={onChangeLink}
    />
  );
};

export default AdminAds;
