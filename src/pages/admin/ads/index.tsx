import { AdminAdsPage } from "@/components/templates/AdminAdsPage";
import {
  addAdsApi,
  deleteAllAdsApi,
  deleteOneAdsApi,
  getAdsData,
} from "@/apis/adsApi";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InputFile } from "@/components/atoms/Input/InputFile";
import useApiError from "@/lib/hooks/useApiError";
import { deletePreviewImagesAPI, uploadImagesAPI } from "@/apis/postsApi";

const AdminAds = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  // 빈 배열로 초기화 (기존 { totem: "" } 객체가 저장 시 문제 발생)
  const [imgPreview, setImgPreview] = useState<any[]>([]);
  // 업로드 진행 중인 배너 label 목록 (미리보기 로딩 인디케이터용)
  const [uploadingLabels, setUploadingLabels] = useState<string[]>([]);
  // 쿼리키를 배열 형식으로 통일 (invalidateQueries와 일치)
  const { data: adsData } = useQuery(["getAdsData"], getAdsData, {
    retry: 1,
    onError(error: any) {
      handleError(error);
    },
  });

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
      result.map((data: any) => (data.label = label));
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
    const validImages = imgPreview.filter(
      (item: any) => item && item.filename
    );

    if (validImages.length === 0) {
      alert("저장할 이미지가 없습니다.");
      return;
    }

    addAdsMutation.mutate(validImages, {
      onSuccess: () => {
        alert("저장이 완료되었습니다.");
        setImgPreview([]);
        queryClient.invalidateQueries(["getAdsData"]);
      },
      onError: () => {
        alert("저장 중 오류가 발생했습니다.");
      },
    });
  };

  /** 전체삭제 */
  const onDeleteAll = () => {
    deleteAllAdsMutaion.mutate();
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
      adsData={adsData}
      onChangeImages={onChangeImages}
      onDeleteOne={onDeleteOne}
      onSubmit={onSubmit}
      onRemovePreviewImage={onRemovePreviewImage}
      onDeleteAll={onDeleteAll}
    />
  );
};

export default AdminAds;
