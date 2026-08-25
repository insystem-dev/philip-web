import { AdminPostEditPage } from "@/components/templates/AdminPostEditPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Category,
  CitySub,
  getCategoryTreeApi,
  getCityListApi,
} from "@/apis/categoryApi";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteImageAPI,
  deletePostAPI,
  deletePreviewImagesAPI,
  editPostAPI,
  getOnePostInfoApi,
  updatePostViewsApi,
  uploadImagesAPI,
} from "@/apis/postsApi";
import { isMessengerLinkInput, MessengerIconKey } from "@/lib/messenger";

const AdminPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 업체 상세정보 불러오기 */
  const queryFn = () => getOnePostInfoApi(router.query.id);
  const { data: detailItem, isError } = useQuery(
    ["detailItem", router.query.id],
    queryFn,
    // 라우터 준비 후에만 조회 (/posts/undefined 요청 방지)
    { enabled: router.isReady }
  );

  const [cityOptions, setCityOptions] = useState<CitySub[]>();
  const [categoryOptions, setCategoryOptions] = useState<Category[]>();

  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const [newThumbImages, setNewThumbImages] = useState<[]>([]);
  const [newDetailImages, setNewDetailImages] = useState<[]>([]);
  const [newMenuImages, setNewMenuImages] = useState<[]>([]);
  const [newMessengerImages, setNewMessengerImages] = useState<[]>([]);

  const [thumbImages, setThumbImages] = useState<string[]>(detailItem?.thumb);
  const [detailImages, setDetailImages] = useState<string[]>(
    detailItem?.detail
  );
  const [menuImages, setMenuImages] = useState<string[]>(detailItem?.menu);
  const [messengerImages, setMessengerImages] = useState<any[]>(
    detailItem?.messengerImage ? [detailItem.messengerImage] : []
  );
  const [viewsMode, setViewsMode] = useState<"actual" | "manual">("actual");
  const [viewsManualCount, setViewsManualCount] = useState("0");
  const [viewsError, setViewsError] = useState("");

  const updateViewsMutation = useMutation(updatePostViewsApi, {
    onSuccess: (savedPost) => {
      setViewsMode(savedPost.mode);
      setViewsManualCount(String(savedPost.manualCount));
      setViewsError("");
      queryClient.setQueryData(
        ["detailItem", router.query.id],
        (current: any) => ({
          ...current,
          viewsMode: savedPost.mode,
          viewsManualCount: savedPost.manualCount,
        })
      );
      queryClient.invalidateQueries(["getAdminStorePosts"]);
      alert("조회수가 저장되었습니다.");
    },
    onError: (error: any) => {
      setViewsError(
        error?.response?.data?.message ?? "조회수 저장에 실패했습니다."
      );
    },
  });

  const saveViews = () => {
    setViewsError("");
    if (viewsMode === "manual") {
      const parsed = Number(viewsManualCount);
      if (
        viewsManualCount.trim() === "" ||
        !Number.isSafeInteger(parsed) ||
        parsed < 0 ||
        parsed > 2_147_483_647
      ) {
        setViewsError(
          "추가 조회수는 0 이상 2,147,483,647 이하의 정수로 입력해주세요."
        );
        return;
      }
      updateViewsMutation.mutate({
        oid: String(router.query.id),
        mode: viewsMode,
        count: parsed,
      });
      return;
    }
    updateViewsMutation.mutate({ oid: String(router.query.id), mode: viewsMode });
  };

  /** 수정 저장 api */
  const mutation = useMutation("editPostAPI", editPostAPI, {
    onSuccess() {
      reset();
      setImagePaths([]);
      // 스토어 목록 갱신 (실제 목록 쿼리키와 일치시킴)
      queryClient.invalidateQueries(["getAdminStorePosts"]);
      router.replace("/admin/store");
    },
  });

  /** 업체 삭제 api */
  const deleteMutation = useMutation("deletePostAPI", deletePostAPI, {
    onSuccess: () => {
      // 스토어 목록 갱신 (실제 목록 쿼리키와 일치시킴)
      queryClient.invalidateQueries(["getAdminStorePosts"]);
      // 삭제 완료 후 navigation (기존: mutation 전 navigation 실행되어 버그 발생)
      router.back();
    },
  });

  const postDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(detailItem.oid);
    }
  };

  /** 카테고리 select 목록 불러오기 */
  const { data: categoryItem } = useQuery(
    "getCategoryTreeApi",
    getCategoryTreeApi
  );
  /** 시티 select 목록 불러오기 */
  const { data: cityItem } = useQuery("getCityListApi", getCityListApi);

  const schema = yup
    .object({
      storeName: yup.string().nullable().required("제목을 입력해 선택해주세요"),
      address: yup.string().nullable().required("주소를 입력해주세요"),
      phoneNumber: yup.string().nullable().required("전화번호를 등록해주세요"),
      contents: yup.string().nullable().required("상세 설명을 입력해주세요"),
      categoryOid: yup.string().required("카테고리를 선택하세요"),
      cityOid: yup.string().required("도시를 선택하세요"),
      ownerName: yup.string().required("대표자명을 입력해주세요"),
      remark: yup.string(),
      messengerIconKey: yup
        .mixed<MessengerIconKey>()
        .oneOf(["telegram", "discord", "custom"])
        .default("telegram"),
      messengerLink: yup
        .string()
        .max(500, "메신저 주소는 500자 이하로 입력해주세요")
        .test(
          "messenger-link",
          "선택한 메신저 형식에 맞는 주소를 입력해주세요",
          function (value) {
            return isMessengerLinkInput(
              value,
              this.parent.messengerIconKey as MessengerIconKey
            );
          }
        ),
    })
    .required();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: detailItem,
    resolver: yupResolver(schema),
  });

  /** 수정 저장  */
  const onSubmit = (data: any) => {
    if (
      data.messengerLink?.trim() &&
      data.messengerIconKey === "custom" &&
      newMessengerImages.length + messengerImages.length === 0
    ) {
      alert("직접 이미지를 선택한 경우 메신저 배너 이미지 1장을 등록해주세요.");
      return;
    }
    const datas = {
      files: imagePaths,
      content: data,
    };
    mutation.mutate(datas);
  };

  /** 이미지 id값에 따라 label 저장 */
  const onChangeImages = (e: any) => {
    e.preventDefault();
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f: any) => {
      imageFormData.append("files", f);
    });
    uploadImagesAPI(imageFormData).then((result) => {
      // taeget.id 따라 label 구분해서 서버로 전송
      result.map((data: any) => (data.label = e.target.id));
      if (e.target.id === "thumb") {
        setNewThumbImages((prev: any) => prev.concat(result));
        setImagePaths((prev) => prev.concat(result));
      } else if (e.target.id === "detail") {
        setNewDetailImages((prev: any) => prev.concat(result));
        setImagePaths((prev) => prev.concat(result));
      } else if (e.target.id === "menu") {
        setNewMenuImages((prev: any) => prev.concat(result));
        setImagePaths((prev) => prev.concat(result));
      } else if (e.target.id === "messenger") {
        setNewMessengerImages((prev: any) => prev.concat(result));
        setImagePaths((prev) => prev.concat(result));
      }
    }).catch((err) => {
      // 이미지 업로드 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  };

  /** Thumb 이미지 삭제 */
  const onRemoveThumb = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setThumbImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
    }).catch((err) => {
      // 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  /** Detail 이미지 삭제 */
  const onRemoveDetail = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setDetailImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
    }).catch((err) => {
      // 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  /** Menu 이미지 삭제 */
  const onRemoveMenu = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setMenuImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
    }).catch((err) => {
      // 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  /** 저장된 단체방 아이콘 이미지 삭제 */
  const onRemoveMessenger = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then(() => {
      setMessengerImages((images) =>
        images.filter((image: any) => image.oid !== v.oid)
      );
    }).catch((err) => {
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  /** 새로운 이미지 추가 된후 삭제버튼 preview 이미지 삭제 */
  const onRemoveImage = useCallback((v: any, e: any) => {
    e.preventDefault();
    deletePreviewImagesAPI(v.filename).then((result) => {
      if (v.label === "thumb") {
        setNewThumbImages((imges: any) => {
          return imges.filter((img: any) => img.filename !== v.filename);
        });
      } else if (v.label === "detail") {
        setNewDetailImages((imges: any) => {
          return imges.filter((img: any) => img.filename !== v.filename);
        });
      } else if (v.label === "menu") {
        setNewMenuImages((imges: any) => {
          return imges.filter((img: any) => img.filename !== v.filename);
        });
      } else if (v.label === "messenger") {
        setNewMessengerImages((images: any) =>
          images.filter((image: any) => image.filename !== v.filename)
        );
      }
      setImagePaths((paths) =>
        paths.filter((image: any) => image.filename !== v.filename)
      );
    }).catch((err) => {
      // preview 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  useEffect(() => {
    setCategoryOptions(categoryItem);
    setCityOptions(cityItem);
    // 상세 데이터가 로드된 경우에만 폼 초기화 (undefined로 reset 방지)
    if (detailItem) {
      reset({
        ...detailItem,
        messengerIconKey: detailItem.messengerIconKey || "telegram",
        messengerLink: detailItem.messengerLink || "",
      });
      setThumbImages(detailItem.thumb);
      setDetailImages(detailItem.detail);
      setMenuImages(detailItem.menu);
      setMessengerImages(
        detailItem.messengerImage ? [detailItem.messengerImage] : []
      );
      setViewsMode(detailItem.viewsMode ?? "actual");
      setViewsManualCount(String(detailItem.viewsManualCount ?? 0));
    }
  }, [categoryItem, cityItem, detailItem]);

  return (
    <AdminPostEditPage
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onChangeImages={onChangeImages}
      onRemoveImage={onRemoveImage}
      onRemoveThumb={onRemoveThumb}
      newThumbImages={newThumbImages}
      thumbImages={thumbImages}
      onRemoveDetail={onRemoveDetail}
      newDetailImages={newDetailImages}
      detailImages={detailImages}
      onRemoveMenu={onRemoveMenu}
      newMenuImages={newMenuImages}
      menuImages={menuImages}
      cityOptions={cityOptions}
      categoryOptions={categoryOptions}
      register={register}
      postDelete={postDelete}
      viewsMode={viewsMode}
      setViewsMode={setViewsMode}
      viewsManualCount={viewsManualCount}
      setViewsManualCount={setViewsManualCount}
      viewsError={viewsError}
      saveViews={saveViews}
      isSavingViews={updateViewsMutation.isLoading}
      actualViews={Number(detailItem?.views ?? 0)}
      categoryValue={watch("categoryOid")}
      onCategoryChange={(value) =>
        setValue("categoryOid", value, { shouldValidate: true })
      }
      errors={errors}
      messengerIconKey={(watch("messengerIconKey") ||
        "telegram") as MessengerIconKey}
      onMessengerIconChange={(value) =>
        setValue("messengerIconKey", value, { shouldValidate: true })
      }
      newMessengerImages={newMessengerImages}
      messengerImages={messengerImages}
      onRemoveMessenger={onRemoveMessenger}
    />
  );
};

export default AdminPost;
