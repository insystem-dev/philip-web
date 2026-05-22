import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminPostForm } from "@/components/molecules/AdminPostForm";
import * as S from "./adminPostPage.style";
import { AdminEditForm } from "@/components/molecules/AdminEditForm";
import { getOnePostInfoApi } from "@/apis/postsApi";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types";

export interface AdminPostEditPageProps {
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  onChangeImages: (e: any) => void;
  onRemoveImage: (v: any, e: any) => void;
  onRemoveThumb: (v: any, e: any) => void;
  newThumbImages: [];
  thumbImages: any;
  onRemoveDetail: (v: any, e: any) => void;
  newDetailImages: [];
  detailImages: any;
  onRemoveMenu: (v: any, e: any) => void;
  newMenuImages: [];
  menuImages: any;
  cityOptions: any;
  categoryOptions: any;
  register: UseFormRegister<any>;
  postDelete: () => void;
}

export const AdminPostEditPage = ({
  handleSubmit,
  onSubmit,
  onChangeImages,
  onRemoveImage,
  onRemoveThumb,
  newThumbImages,
  thumbImages,
  onRemoveDetail,
  newDetailImages,
  detailImages,
  onRemoveMenu,
  newMenuImages,
  menuImages,
  cityOptions,
  categoryOptions,
  register,
  postDelete,
}: AdminPostEditPageProps) => {
  return (
    <AdminLayout title="업체 정보수정">
      <S.adminPostPage>
        <AdminEditForm
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
      </S.adminPostPage>
    </AdminLayout>
  );
};
