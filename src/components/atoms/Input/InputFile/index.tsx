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
}: any) => {
  return (
    <S.InputFile>
      <S.FileLabelBox>
        <label htmlFor={id || "input-img"}>
          이미지 등록
          <input
            type="file"
            id={id || "input-img"}
            multiple
            hidden
            onChange={onChangeImages}
          />
        </label>
      </S.FileLabelBox>
      <S.ImgPreviewList>
        {imgPreview?.length > 0 || imageFromDB?.length > 0 ? (
          ""
        ) : (
          <span className="empty-txt">등록된 이미지가 없습니다.</span>
        )}
        {imgPreview?.map((v: any, i: number) => (
          <>
            <S.ImgPreviewItem
              key={v?.filename}
              style={{ display: "inline-block" }}
            >
              <S.ImgPriviewImg>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${v?.filename}`}
                  alt={v}
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
          </>
        ))}
        {imageFromDB
          ? imageFromDB.map((img: any, id: number) => (
              <>
                <S.ImgPreviewItem key={id} style={{ display: "inline-block" }}>
                  <S.ImgPriviewImg>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${img?.filename}`}
                      alt={img}
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
              </>
            ))
          : ""}
      </S.ImgPreviewList>
    </S.InputFile>
  );
};
