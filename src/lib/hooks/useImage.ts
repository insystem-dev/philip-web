import { deleteImageAPI, deletePreviewImagesAPI } from "@/apis/postsApi";
import { useCallback, useEffect, useState } from "react";

const useImage = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const onRemove = useCallback((v: any, e: any) => {
    e.preventDefault();
    deletePreviewImagesAPI(v.filename).then((result) => {
      setValue((imges: any) => {
        return imges.filter((img: any) => img.filename !== v.filename);
      });
    }).catch((err: any) => {
      // preview 이미지 삭제 실패 처리
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다");
    });
  }, []);

  return [value, setValue, onRemove];
};

export default useImage;
