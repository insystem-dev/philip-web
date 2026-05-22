import { InputText } from "@/components/atoms/Input/InputText";
import React from "react";
import * as S from "./adminPostForm.style";
import { InputTextarea } from "@/components/atoms/Input/InputTextarea";
import { AdminInputSelect } from "@/components/atoms/Input/AdminInputSelect";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputFile } from "@/components/atoms/Input/InputFile";
import { useRouter } from "next/router";
import { AdminPostPageProps } from "@/components/templates/AdminPostPage";

export const AdminPostForm = ({
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
  const router = useRouter();

  return (
    <S.PostFormBox
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <S.PostFormImgBox>
        <S.PostFormBoxTit>
          대표이미지 등록
          <span>(최대 1장 등록)</span>
        </S.PostFormBoxTit>
        {/* 메인페이지 대표 이미지 등록 */}
        <S.PostFormImgInput>
          <InputFile
            id="thumb"
            onChangeImages={onChangeImages}
            onRemoveImage={onRemoveImage}
            imgPreview={newThumbImages}
          />
        </S.PostFormImgInput>
        <S.PostFormBoxTit>
          상세이미지 등록
          <span>(최대 5장 등록)</span>
        </S.PostFormBoxTit>
        {/* 상세이미지 등록 */}
        <S.PostFormImgInput>
          <InputFile
            id="detail"
            onChangeImages={onChangeImages}
            onRemoveImage={onRemoveImage}
            imgPreview={newDetailImages}
          />
        </S.PostFormImgInput>
        <S.PostFormBoxTit>
          메뉴이미지 등록
          <span>(최대 1장 등록)</span>
        </S.PostFormBoxTit>
        {/* 메뉴이미지 등록 */}
        <S.PostFormImgInput>
          <InputFile
            id="menu"
            onChangeImages={onChangeImages}
            onRemoveImage={onRemoveImage}
            imgPreview={newMenuImages}
          />
        </S.PostFormImgInput>
      </S.PostFormImgBox>
      <S.PostFormInfoBox>
        <S.PostFormBoxTit>업체정보 등록</S.PostFormBoxTit>
        {/* 임시 상세이미지 버튼 (feat. 동주) */}
        <AdminInputSelect
          label="지역선택"
          layout="column"
          themeType="admin"
          size="md"
          options={cityOptions}
          register={register("cityOid")}
          errors={errors}
          name="cityOid"
        />
        <AdminInputSelect
          label="카테고리 선택"
          layout="column"
          themeType="admin"
          size="md"
          options={categoryOptions}
          register={register("categoryOid")}
          errors={errors}
          name="categoryOid"
        />
        <InputText
          label="상호명"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("storeName")}
          errors={errors}
          name="storeName"
        />
        <InputText
          label="대표자명"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("ownerName")}
          errors={errors}
          name="ownerName"
        />
        <InputText
          label="주소"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("address")}
          errors={errors}
          name="address"
        />
        <InputText
          label="대표 전화번호"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("phoneNumber")}
          errors={errors}
          name="phoneNumber"
        />
        <InputTextarea
          label="요금 및 메뉴설명"
          layout="column"
          themeType="admin"
          size="lg"
          width="100%"
          placeholder="내용을 입력해 주세요."
          register={register("contents")}
          errors={errors}
          name="contents"
        />
        <InputText
          label="비고"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("remark")}
          errors={errors}
          name="remark"
        />
      </S.PostFormInfoBox>

      <S.PostFormBtnBox>
        <ButtonGroup>
          <Button
            type="submit"
            color="primary"
            layout="solid"
            width="80px"
            height={40}
            label="등록"
          />
          <Button
            type="button"
            color="func"
            layout="solid"
            width="80px"
            height={40}
            label="취소"
            onClick={() => router.back()}
          />
        </ButtonGroup>
      </S.PostFormBtnBox>
    </S.PostFormBox>
  );
};
