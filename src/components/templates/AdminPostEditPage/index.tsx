import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminPostPage.style";
import { AdminEditForm } from "@/components/molecules/AdminEditForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types";
import { MessengerIconKey } from "@/lib/messenger";

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
  viewsMode: "actual" | "manual";
  setViewsMode: (value: "actual" | "manual") => void;
  viewsManualCount: string;
  setViewsManualCount: (value: string) => void;
  viewsError: string;
  saveViews: () => void;
  isSavingViews: boolean;
  actualViews: number;
  categoryValue?: string;
  onCategoryChange: (value: string) => void;
  errors: FieldErrors;
  messengerIconKey: MessengerIconKey;
  onMessengerIconChange: (value: MessengerIconKey) => void;
  newMessengerImages: any[];
  messengerImages: any[];
  onRemoveMessenger: (value: any, event: any) => void;
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
  viewsMode,
  setViewsMode,
  viewsManualCount,
  setViewsManualCount,
  viewsError,
  saveViews,
  isSavingViews,
  actualViews,
  categoryValue,
  onCategoryChange,
  errors,
  messengerIconKey,
  onMessengerIconChange,
  newMessengerImages,
  messengerImages,
  onRemoveMessenger,
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
          viewsMode={viewsMode}
          setViewsMode={setViewsMode}
          viewsManualCount={viewsManualCount}
          setViewsManualCount={setViewsManualCount}
          viewsError={viewsError}
          saveViews={saveViews}
          isSavingViews={isSavingViews}
          actualViews={actualViews}
          categoryValue={categoryValue}
          onCategoryChange={onCategoryChange}
          errors={errors}
          messengerIconKey={messengerIconKey}
          onMessengerIconChange={onMessengerIconChange}
          newMessengerImages={newMessengerImages}
          messengerImages={messengerImages}
          onRemoveMessenger={onRemoveMessenger}
        />
      </S.adminPostPage>
    </AdminLayout>
  );
};
