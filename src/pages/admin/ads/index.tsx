import { AdminAdsPage } from "@/components/templates/AdminAdsPage";
import {
  AdsLink,
  addAdsApi,
  deleteAllAdsApi,
  deleteOneAdsApi,
  getAdsData,
  updateAdsLinkApi,
} from "@/apis/adsApi";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InputFile } from "@/components/atoms/Input/InputFile";
import useApiError from "@/lib/hooks/useApiError";
import {
  deletePreviewImagesAPI,
  getAdminStorePosts,
  uploadImagesAPI,
} from "@/apis/postsApi";
import { Category, getCategoryTreeApi } from "@/apis/categoryApi";

const MAIN_LABELS = ["topAds", "bottom1", "bottom2", "bottom3"];
const CATEGORY_LABELS = ["categoryTopAds", "categoryTopBottom1", "categoryTopBottom2", "categoryTopBottom3", "categoryBottomAds"];

const EMPTY_LINK: AdsLink = { postOid: null, url: "", isExternal: false };

/**
 * 링크 드래프트 key
 * 메인 배너는 같은 label 이 카테고리별로 다른 행이라 카테고리까지 키에 넣는다.
 * 저장된 행의 adCategoryCode 는 전체 카테고리일 때 null 로 오므로 "CATEGORY-ALL" 로 정규화한다
 * (AdminAdsBox / AdminAdsPreview 의 매칭 규칙과 동일).
 * 전체 카테고리 배너(CATEGORY_LABELS)는 카테고리 구분이 없으므로 "-" 로 고정한다.
 */
const linkKey = (label: string, adCategoryCode?: string | null) =>
  MAIN_LABELS.includes(label)
    ? `${label}::${adCategoryCode || "CATEGORY-ALL"}`
    : `${label}::-`;

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
  const [selectedCategory, setSelectedCategory] = useState("CATEGORY-ALL");
  const { data: categories = [] } = useQuery<Category[]>(
    ["getCategoryTreeApi"], getCategoryTreeApi
  );
  // 쿼리키를 배열 형식으로 통일 (invalidateQueries와 일치)
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
        const key = linkKey(ads.label, ads.adCategoryCode);
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

  /** 현재 탭/카테고리 기준 label 의 연결 대상 입력값 */
  const getLink = (label: string) =>
    linkDrafts[linkKey(label, selectedCategory)] ?? EMPTY_LINK;

  const onChangeLink = (label: string, next: AdsLink) => {
    setLinkDrafts((prev) => ({
      ...prev,
      [linkKey(label, selectedCategory)]: next,
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

    // 유효한 이미지만 필터링 (filename이 있는 항목만)
    const labels = activeTab === "main" ? MAIN_LABELS : CATEGORY_LABELS;
    const validImages = imgPreview.filter(
      (item: any) => item && item.filename && labels.includes(item.label) &&
        (activeTab !== "main" || item.adCategoryCode === selectedCategory)
    );

    // 새로 저장할 이미지에 해당 키의 링크 값을 주입
    const imagesToSave = validImages.map((item: any) => ({
      ...item,
      ...toLinkPayload(linkDrafts[linkKey(item.label, item.adCategoryCode)]),
    }));

    /**
     * 이미 저장된 광고 중 링크만 바뀐 행.
     * 이 경로가 없으면 링크만 교체할 때도 이미지를 지웠다 다시 올려야 한다.
     * 같은 키로 새 이미지를 올린 경우는 위 생성 요청이 링크를 함께 보내므로 제외한다.
     */
    const uploadedKeys = validImages.map((item: any) =>
      linkKey(item.label, item.adCategoryCode)
    );
    const changedLinks = (adsData ?? [])
      .filter(
        (ads: any) =>
          labels.includes(ads.label) &&
          (activeTab !== "main" ||
            (ads.adCategoryCode || "CATEGORY-ALL") === selectedCategory)
      )
      .map((ads: any) => {
        const key = linkKey(ads.label, ads.adCategoryCode);
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
        key: linkKey(item.label, item.adCategoryCode),
      })),
      ...changedLinks.map((row: any) => ({ label: row.ads.label, key: row.key })),
    ];
    if (targets.some(({ label, key }) => !validateLink(label, linkDrafts[key]))) {
      return;
    }

    const saveLinks = () =>
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
      saveLinks().then(onDone).catch(onFail);
      return;
    }

    addAdsMutation.mutate(imagesToSave, {
      onSuccess: () => {
        saveLinks().then(onDone).catch(onFail);
      },
      onError: onFail,
    });
  };

  /** 전체삭제 */
  const onDeleteAll = () => {
    deleteAllAdsMutaion.mutate({
      scope: activeTab,
      ...(activeTab === "main" && { categoryCode: selectedCategory }),
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
