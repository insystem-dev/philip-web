import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminPostPage.style";
import { AdminEditForm } from "@/components/molecules/AdminEditForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types";
import { MessengerIconKey } from "@/lib/messenger";
import { ReactNode, useState } from "react";
import { AdminPostTranslationEditor } from "@/components/molecules/AdminPostTranslationEditor";

export interface AdminPostEditPageProps {
  postOid: string;
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
  versionSwitch?: ReactNode;
}

export const AdminPostEditPage = ({
  postOid,
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
  const [activeVersion, setActiveVersion] = useState<"ko" | "en">("ko");
  const versionSwitch = (
    <S.VersionSwitch role="tablist" aria-label="업체정보 언어 버전">
      <button
        type="button"
        role="tab"
        aria-selected={activeVersion === "ko"}
        className={activeVersion === "ko" ? "active" : ""}
        onClick={() => setActiveVersion("ko")}
      >
        한국어 원본
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeVersion === "en"}
        className={activeVersion === "en" ? "active" : ""}
        onClick={() => setActiveVersion("en")}
      >
        English 번역
      </button>
    </S.VersionSwitch>
  );
  const editorToolbar = (
    <S.EditorToolbar>
      {postOid && (
        <S.DetailPreviewLink
          href={`/main/post/${encodeURIComponent(postOid)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="업체 상세화면 새 탭으로 열기"
        >
          업체 상세보기
          <span aria-hidden="true">↗</span>
        </S.DetailPreviewLink>
      )}
      {versionSwitch}
    </S.EditorToolbar>
  );

  return (
    <AdminLayout title="업체 정보수정">
      <S.adminPostPage>
        <S.EditorBody role="tabpanel">
          {activeVersion === "ko" ? (
            <AdminEditForm
              postOid={postOid}
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
              versionSwitch={editorToolbar}
            />
          ) : (
            <AdminPostTranslationEditor
              postOid={postOid}
              versionSwitch={editorToolbar}
            />
          )}
        </S.EditorBody>
      </S.adminPostPage>
    </AdminLayout>
  );
};
