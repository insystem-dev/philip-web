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
    });
  }, []);

  return [value, setValue, onRemove];
};

export default useImage;
