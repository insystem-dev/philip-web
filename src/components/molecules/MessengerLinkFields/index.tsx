import { InputFile } from "@/components/atoms/Input/InputFile";
import { InputText } from "@/components/atoms/Input/InputText";
import { MessengerIconKey } from "@/lib/messenger";
import IconTelegram from "public/assets/svg/icon-telegram.svg";
import * as S from "./messengerLinkFields.style";

interface MessengerLinkFieldsProps {
  register: any;
  errors?: any;
  iconKey: MessengerIconKey;
  onIconChange: (value: MessengerIconKey) => void;
  onChangeImages: (event: any) => void;
  onRemoveImage: (value: any, event: any) => void;
  onRemoveServerImage?: (value: any, event: any) => void;
  newMessengerImages: any[];
  messengerImages?: any[];
}

export const MessengerLinkFields = ({
  register,
  errors,
  iconKey,
  onIconChange,
  onChangeImages,
  onRemoveImage,
  onRemoveServerImage,
  newMessengerImages,
  messengerImages = [],
}: MessengerLinkFieldsProps) => (
  <S.Section>
    <S.Heading>
      <div>
        <span>GROUP CHAT</span>
        <strong>텔레그램 단체방 연결</strong>
      </div>
      <p>입력하지 않으면 사용자 화면에 표시되지 않습니다.</p>
    </S.Heading>

    <input type="hidden" {...register("messengerIconKey")} />
    <S.Label>사용자 화면에 표시할 아이콘</S.Label>
    <S.IconOptions role="radiogroup" aria-label="메신저 아이콘 선택">
      <S.IconOption
        type="button"
        role="radio"
        aria-checked={iconKey === "telegram"}
        $active={iconKey === "telegram"}
        onClick={() => onIconChange("telegram")}
      >
        <IconTelegram width={34} height={34} viewBox="0 0 24 24" />
        <span>
          <strong>Telegram</strong>
          <small>공식 기본 아이콘</small>
        </span>
        <i>{iconKey === "telegram" ? "✓" : ""}</i>
      </S.IconOption>
      <S.IconOption
        type="button"
        role="radio"
        aria-checked={iconKey === "custom"}
        $active={iconKey === "custom"}
        onClick={() => onIconChange("custom")}
      >
        <S.CustomGlyph aria-hidden="true">＋</S.CustomGlyph>
        <span>
          <strong>직접 이미지</strong>
          <small>단체방 전용 이미지 1장</small>
        </span>
        <i>{iconKey === "custom" ? "✓" : ""}</i>
      </S.IconOption>
    </S.IconOptions>

    {iconKey === "custom" && (
      <S.CustomUpload>
        <S.Label>단체방 아이콘 이미지</S.Label>
        <InputFile
          id="messenger"
          onChangeImages={onChangeImages}
          onRemoveImage={onRemoveImage}
          onRemoveServerImage={onRemoveServerImage}
          imgPreview={newMessengerImages}
          imageFromDB={messengerImages}
          maxCount={1}
        />
      </S.CustomUpload>
    )}

    <InputText
      label="텔레그램 단체방 주소"
      layout="column"
      themeType="admin"
      size="md"
      width="100%"
      placeholder="예: https://t.me/philip69 또는 @philip69"
      register={register("messengerLink")}
      errors={errors}
      name="messengerLink"
    />
    <S.Guide>
      <IconTelegram width={18} height={18} viewBox="0 0 24 24" />
      <span>
        공개방 주소, 초대 링크(t.me/+...), @아이디를 지원합니다. 저장 시 안전한
        HTTPS 링크로 변환됩니다.
      </span>
    </S.Guide>
  </S.Section>
);
