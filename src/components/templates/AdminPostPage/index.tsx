import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminPostForm } from "@/components/molecules/AdminPostForm";
import * as S from "./adminPostPage.style";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form/dist/types";

export interface AdminPostPageProps {
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  onChangeImages: (e: any) => void;
  onRemoveImage: (v: any, e: any) => void;
  newThumbImages: [];
  newDetailImages: [];
  newMenuImages: [];
  cityOptions: any;
  categoryOptions: any;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const AdminPostPage = ({
  handleSubmit,
  onSubmit,
  onChangeImages,
  onRemoveImage,
  newThumbImages,
  newDetailImages,
  newMenuImages,
  cityOptions,
  categoryOptions,
  register,
  errors,
}: AdminPostPageProps) => {
  return (
    <AdminLayout title="업체 신규등록">
      <S.adminPostPage>
        <AdminPostForm
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
        />
      </S.adminPostPage>
    </AdminLayout>
  );
};
