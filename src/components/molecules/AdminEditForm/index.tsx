import { InputText } from "@/components/atoms/Input/InputText";
import * as S from "./adminPostForm.style";
import { InputTextarea } from "@/components/atoms/Input/InputTextarea";
import { AdminInputSelect } from "@/components/atoms/Input/AdminInputSelect";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputFile } from "@/components/atoms/Input/InputFile";
import { useRouter } from "next/router";
import { AdminPostEditPageProps } from "@/components/templates/AdminPostEditPage";

export const AdminEditForm = ({
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
            onRemoveServerImage={onRemoveThumb}
            imgPreview={newThumbImages}
            imageFromDB={thumbImages}
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
            onRemoveServerImage={onRemoveDetail}
            imgPreview={newDetailImages}
            imageFromDB={detailImages}
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
            onRemoveServerImage={onRemoveMenu}
            imgPreview={newMenuImages}
            imageFromDB={menuImages}
          />
        </S.PostFormImgInput>
      </S.PostFormImgBox>
      <S.PostFormInfoBox>
        <S.PostFormBoxTit>업체정보 등록</S.PostFormBoxTit>
        <AdminInputSelect
          label="지역선택"
          layout="column"
          themeType="admin"
          size="md"
          options={cityOptions}
          register={register("cityOid")}
        />
        <AdminInputSelect
          label="카테고리 선택"
          layout="column"
          themeType="admin"
          size="md"
          options={categoryOptions}
          register={register("categoryOid")}
        />
        <InputText
          label="상호명"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("storeName")}
        />
        <InputText
          label="대표자명"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("ownerName")}
        />
        <InputText
          label="주소"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("address")}
        />
        <InputText
          label="대표 전화번호"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("phoneNumber")}
        />
        <InputTextarea
          label="요금 및 메뉴설명"
          layout="column"
          themeType="admin"
          size="lg"
          width="100%"
          placeholder="내용을 입력해 주세요."
          register={register("contents")}
        />
        <InputText
          label="비고"
          layout="column"
          themeType="admin"
          size="md"
          width="100%"
          placeholder="입력..."
          register={register("remark")}
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
            label="저장"
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
          <Button
            type="button"
            color="func"
            layout="solid"
            width="80px"
            height={40}
            label="삭제"
            onClick={postDelete}
          />
        </ButtonGroup>
      </S.PostFormBtnBox>
    </S.PostFormBox>
  );
};
