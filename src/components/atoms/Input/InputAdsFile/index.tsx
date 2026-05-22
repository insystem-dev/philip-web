/**
 * InputAdsFile Atom
 * 광고 이미지 파일 입력 컴포넌트
 *
 * 상태에 따른 표시:
 * - isAds (저장된 광고): 파일명 + 삭제 버튼
 * - isPreview (프리뷰 이미지): 파일명 + 삭제 버튼
 * - 둘 다 없음: 이미지 등록 버튼
 */
import * as S from "./inputAdsFile.style";

interface InputAdsFileProps {
  id: string;
  label: string;
  file: any;
  isAds?: any;
  isPreview?: any;
  onChangeImages: (e: any) => void;
  onDelete: (id: string) => void;
  onRemovePreviewImage: (file: any) => void;
}

export const InputAdsFile = ({
  id,
  onChangeImages,
  label,
  isAds,
  isPreview,
  onDelete,
  onRemovePreviewImage,
  file,
}: InputAdsFileProps) => {
  // 파일명 표시 (originalname 또는 filename 사용)
  const displayName = file?.originalname || file?.filename || "";

  // 저장된 광고가 있는 경우 (DB에서 불러온 데이터)
  if (isAds) {
    return (
      <S.InputFile>
        <S.FileLabelBox>
          <S.FileTitBox>{label}</S.FileTitBox>
          <S.FileNameBox>
            <span>{displayName}</span>
          </S.FileNameBox>
          <label htmlFor={`delete-${id}`}>
            삭제
            <input
              type="button"
              id={`delete-${id}`}
              hidden
              onClick={() => onDelete(isAds.oid)}
            />
          </label>
        </S.FileLabelBox>
      </S.InputFile>
    );
  }

  // 프리뷰 이미지가 있는 경우 (업로드했지만 아직 저장 안됨)
  if (isPreview) {
    return (
      <S.InputFile>
        <S.FileLabelBox>
          <S.FileTitBox>{label}</S.FileTitBox>
          <S.FileNameBox>
            <span>{displayName}</span>
          </S.FileNameBox>
          <label htmlFor={`remove-${id}`}>
            취소
            <input
              type="button"
              id={`remove-${id}`}
              hidden
              onClick={() => onRemovePreviewImage(isPreview)}
            />
          </label>
        </S.FileLabelBox>
      </S.InputFile>
    );
  }

  // 이미지가 없는 경우 (새로 등록)
  return (
    <S.InputFile>
      <S.FileLabelBox>
        <S.FileTitBox>{label}</S.FileTitBox>
        <S.FileNameBox>
          <span></span>
        </S.FileNameBox>
        <label htmlFor={id}>
          이미지 등록
          <input
            type="file"
            id={id}
            accept="image/*"
            hidden
            onChange={onChangeImages}
          />
        </label>
      </S.FileLabelBox>
    </S.InputFile>
  );
};
