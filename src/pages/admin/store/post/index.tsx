import { AdminPostPage } from "@/components/templates/AdminPostPage";
import { addPostApi, uploadImagesAPI } from "@/apis/postsApi";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Category,
  CitySub,
  getCategoryTreeApi,
  getCityListApi,
} from "@/apis/categoryApi";

import { useRouter } from "next/router";
import useImage from "@/lib/hooks/useImage";
import { isTelegramLinkInput, MessengerIconKey } from "@/lib/messenger";

const AdminPost = () => {
  const [cityOptions, setCityOptions] = useState<CitySub[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const router = useRouter();

  const [newThumbImages, setNewThumbImages, onRemoveThumb] = useImage([]);
  const [newDetailImages, setNewDetailImages, onRemoveDetail] = useImage([]);
  const [newMenuImages, setNewMenuImages, onRemoveMenu] = useImage([]);
  const [newMessengerImages, setNewMessengerImages, onRemoveMessenger] =
    useImage([]);

  const mutation = useMutation("addPostApi", addPostApi, {
    onSuccess() {
      reset();
      setImagePaths([]);
      queryClient.refetchQueries("addPostApi");
      router.replace("/admin/store");
    },
    onSettled() {
      setLoading(false);
    },
  });

  /** 카테고리 select 목록 불러오기 */
  const { data: categoryItem } = useQuery(
    "getCategoryTreeApi",
    getCategoryTreeApi
  );
  /** 시티 select 목록 불러오기 */
  const { data: cityItem } = useQuery("getCityListApi", getCityListApi);

  /** useForm 유효성 */
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
        .oneOf(["telegram", "custom"])
        .default("telegram"),
      messengerLink: yup
        .string()
        .max(500, "단체방 주소는 500자 이하로 입력해주세요")
        .test(
          "telegram-link",
          "t.me 단체방 주소, 초대 링크 또는 @아이디를 입력해주세요",
          (value) => isTelegramLinkInput(value)
        ),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
    watch,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      messengerIconKey: "telegram",
      messengerLink: "",
    },
  });

  const onSubmit = (data: any) => {
    if (
      data.messengerLink?.trim() &&
      data.messengerIconKey === "custom" &&
      newMessengerImages.length === 0
    ) {
      alert("직접 이미지를 선택한 경우 단체방 아이콘 이미지 1장을 등록해주세요.");
      return;
    }
    //방문자수 0 초기화
    data.views = 0;
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

  /** preview 이미지 삭제 */
  const onRemoveImage = useCallback((v: any, e: any) => {
    e.preventDefault();
    switch (v.label) {
      case "thumb":
        onRemoveThumb(v, e);
        break;
      case "detail":
        onRemoveDetail(v, e);
        break;
      case "menu":
        onRemoveMenu(v, e);
        break;
      case "messenger":
        onRemoveMessenger(v, e);
        break;
      default:
        break;
    }
    setImagePaths((prev) => {
      return prev.filter((item: any) => item.filename !== v.filename);
    });
  }, [onRemoveDetail, onRemoveMenu, onRemoveMessenger, onRemoveThumb]);

  // 옵션 데이터가 로드된 경우에만 설정 (undefined 세팅 방지)
  useEffect(() => {
    if (categoryItem) setCategoryOptions(categoryItem);
    if (cityItem) setCityOptions(cityItem);
  }, [categoryItem, cityItem]);

  // 지역선택 디폴트: 앙헬레스 (목록에 없으면 첫 번째 지역)
  // option이 DOM에 렌더링된 뒤에 setValue 해야 select에 반영되므로 cityOptions 기준으로 실행
  useEffect(() => {
    if (cityOptions.length > 0 && !watch("cityOid")) {
      const defaultCity =
        cityOptions.find((city) => city.name === "앙헬레스") ?? cityOptions[0];
      setValue("cityOid", defaultCity.oid);
    }
  }, [cityOptions]);

  return (
    <AdminPostPage
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onChangeImages={onChangeImages}
      onRemoveImage={onRemoveImage}
      newThumbImages={newThumbImages}
      newDetailImages={newDetailImages}
      newMenuImages={newMenuImages}
      cityOptions={cityOptions}
      categoryOptions={categoryOptions}
      register={register}
      errors={errors}
      categoryValue={watch("categoryOid")}
      onCategoryChange={(value) =>
        setValue("categoryOid", value, { shouldValidate: true })
      }
      messengerIconKey={(watch("messengerIconKey") ||
        "telegram") as MessengerIconKey}
      onMessengerIconChange={(value) =>
        setValue("messengerIconKey", value, { shouldValidate: true })
      }
      newMessengerImages={newMessengerImages}
    />
  );
};

export default AdminPost;
