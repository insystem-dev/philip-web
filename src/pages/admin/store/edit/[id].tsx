import { AdminPostEditPage } from "@/components/templates/AdminPostEditPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getCategoryNavApi, getCityListApi } from "@/apis/categoryApi";
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
  uploadImagesAPI,
} from "@/apis/postsApi";

const AdminPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 업체 상세정보 불러오기 */
  const queryFn = () => getOnePostInfoApi(router.query.id);
  const { data: detailItem, isError } = useQuery(
    ["detailItem", router.query.id],
    queryFn
  );

  const [cityOptions, setCityOptions] = useState<[]>();
  const [categoryOptions, setCategoryOptions] = useState<[]>();

  const [imagePaths, setImagePaths] = useState<string[]>([]);

  const [newThumbImages, setNewThumbImages] = useState<[]>([]);
  const [newDetailImages, setNewDetailImages] = useState<[]>([]);
  const [newMenuImages, setNewMenuImages] = useState<[]>([]);

  const [thumbImages, setThumbImages] = useState<string[]>(detailItem?.thumb);
  const [detailImages, setDetailImages] = useState<string[]>(
    detailItem?.detail
  );
  const [menuImages, setMenuImages] = useState<string[]>(detailItem?.menu);

  /** 수정 저장 api */
  const mutation = useMutation("editPostAPI", editPostAPI, {
    onSuccess() {
      reset();
      setImagePaths([]);
      // 스토어 목록 갱신
      queryClient.invalidateQueries(["getStoreListApi"]);
      router.replace("/admin/store");
    },
  });

  /** 업체 삭제 api */
  const deleteMutation = useMutation("deletePostAPI", deletePostAPI, {
    onSuccess: () => {
      // 스토어 목록 갱신
      queryClient.invalidateQueries(["getStoreListApi"]);
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
    "getCategoryNavApi",
    getCategoryNavApi
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
    })
    .required();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: detailItem,
    resolver: yupResolver(schema),
  });

  /** 수정 저장  */
  const onSubmit = (data: any) => {
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
      } else {
        setNewMenuImages((prev: any) => prev.concat(result));
        setImagePaths((prev) => prev.concat(result));
      }
    });
  };

  /** Thumb 이미지 삭제 */
  const onRemoveThumb = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setThumbImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
    });
  }, []);

  /** Detail 이미지 삭제 */
  const onRemoveDetail = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setDetailImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
    });
  }, []);

  /** Menu 이미지 삭제 */
  const onRemoveMenu = useCallback((v: any, e: any) => {
    e.preventDefault();
    deleteImageAPI(v.oid).then((result) => {
      setMenuImages((imges) => {
        return imges.filter((img: any) => img.oid !== v.oid);
      });
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
      } else {
        setNewMenuImages((imges: any) => {
          return imges.filter((img: any) => img.filename !== v.filename);
        });
      }
    });
  }, []);

  useEffect(() => {
    setCategoryOptions(categoryItem);
    setCityOptions(cityItem);
    reset(detailItem);

    setThumbImages(detailItem?.thumb);
    setDetailImages(detailItem?.detail);
    setMenuImages(detailItem?.menu);
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
    />
  );
};

export default AdminPost;
