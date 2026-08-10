import Image from "next/image";
import { Button } from "../../Button";
import * as S from "./inputFile.style";
import IconCancel from "public/assets/svg/icon-cancel.svg";

export const InputFile = ({
  id,
  onChangeImages,
  onRemoveImage,
  onRemoveServerImage,
  imgPreview,
  imageFromDB,
  maxCount,
}: any) => {
  // maxCount 를 넘기지 않으면 기존과 동일하게 개수 제한 없이 동작한다
  const hasMaxCount = typeof maxCount === "number";
  const totalCount = (imgPreview?.length ?? 0) + (imageFromDB?.length ?? 0);
  const isMaxReached = hasMaxCount && totalCount >= maxCount;

  /** 남은 장수보다 많이 선택하면 업로드 자체를 막는다 (maxCount 지정 시에만 동작) */
  const onSelectFiles = (e: any) => {
    if (hasMaxCount && e.target.files?.length > maxCount - totalCount) {
      alert(`이미지는 최대 ${maxCount}장까지 등록할 수 있습니다.`);
      e.target.value = "";
      return;
    }
    onChangeImages(e);
  };

  return (
    <S.InputFile>
      <S.FileLabelBox>
        {isMaxReached ? (
          <S.FileLabelDisabled>이미지 등록</S.FileLabelDisabled>
        ) : (
          <label htmlFor={id || "input-img"}>
            이미지 등록
            <input
              type="file"
              id={id || "input-img"}
              multiple
              hidden
              onChange={onSelectFiles}
            />
          </label>
        )}
        {hasMaxCount && (
          <S.FileLimitTxt>
            {isMaxReached
              ? `최대 ${maxCount}장까지 등록할 수 있습니다.`
              : `${totalCount}/${maxCount}장`}
          </S.FileLimitTxt>
        )}
      </S.FileLabelBox>
      <S.ImgPreviewList>
        {imgPreview?.length > 0 || imageFromDB?.length > 0 ? (
          ""
        ) : (
          <span className="empty-txt">등록된 이미지가 없습니다.</span>
        )}
        {/* key는 최상위 요소에 부여, alt는 문자열로 전달 */}
        {imgPreview?.map((v: any, i: number) => (
          <S.ImgPreviewItem
            key={v?.filename}
            style={{ display: "inline-block" }}
          >
            <S.ImgPriviewImg>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${v?.filename}`}
                alt={v?.filename || "미리보기 이미지"}
                width={200}
                height={120}
              />
            </S.ImgPriviewImg>
            <Button
              type="button"
              color="white"
              layout="icon"
              width="18px"
              height={18}
              onClick={(e: any) => onRemoveImage(v, e)}
            >
              <IconCancel viewBox="0 0 24 24" />
            </Button>
          </S.ImgPreviewItem>
        ))}
        {imageFromDB
          ? imageFromDB.map((img: any, id: number) => (
              <S.ImgPreviewItem key={id} style={{ display: "inline-block" }}>
                <S.ImgPriviewImg>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${img?.filename}`}
                    alt={img?.filename || "업체 이미지"}
                    width={200}
                    height={120}
                  />
                </S.ImgPriviewImg>
                <Button
                  type="button"
                  color="white"
                  layout="icon"
                  width="20px"
                  height={20}
                  onClick={(e: any) => onRemoveServerImage(img, e)}
                >
                  <IconCancel width={16} height={16} viewBox="0 0 24 24" />
                </Button>
              </S.ImgPreviewItem>
            ))
          : ""}
      </S.ImgPreviewList>
    </S.InputFile>
  );
};
