import { ImageSlide } from "@/components/atoms/ImageSlide";
import { CopyButton } from "@/components/atoms/Button/CopyButton";
import * as S from "./storeInfoBox.style";
import IconPhone from "public/assets/svg/icon-phone.svg";
import IconTelegram from "public/assets/svg/icon-telegram.svg";
import IconDiscord from "public/assets/svg/icon-discord.svg";
import Image from "next/image";
// 조회수 임시 미노출로 아이콘도 함께 주석처리 (복구 시 아래 StoreViewBox 블록과 같이 해제)
// import IconView from "public/assets/svg/icon-view.svg";

export const StoreInfoBox = ({ post }: any) => {
  const messengerHref =
    typeof post?.messengerLink === "string" &&
    /^https:\/\/(?:t\.me|discord\.gg)\//i.test(post.messengerLink)
      ? post.messengerLink
      : null;
  const messengerType =
    post?.messengerIconKey === "discord" ||
    /^https:\/\/discord\.gg\//i.test(messengerHref || "")
      ? "discord"
      : "telegram";
  const messengerLabel = messengerType === "discord" ? "디스코드" : "텔레그램";
  const messengerImage = Array.isArray(post?.messengerImage)
    ? post.messengerImage[0]
    : post?.messengerImage;
  const hasMessengerBanner =
    post?.messengerIconKey === "custom" && !!messengerImage?.filename;

  return (
    <S.StoreInfoBox>
      <ImageSlide items={post?.detail} />

      <S.StoreInfo>
        <S.StoreInfoTop>
          <S.StoreNameBox>
            {/* 스토어 네임 */}
            {post?.storeName}
            {/* 카테고리가 없을 수도 있어 옵셔널 체이닝으로 접근 */}
            <S.CategorySpan>{post?.category?.subNm}</S.CategorySpan>
          </S.StoreNameBox>
          {/* 조회수 임시 미노출 (요청에 따라 주석처리 — 복구 시 상단 IconView import 도 함께 해제)
          <S.StoreViewBox>
            <IconView width={16} height={16} viewBox="0 0 24 24" />
            {post?.views}
          </S.StoreViewBox>
          */}
        </S.StoreInfoTop>
        <S.AddressBox>{post?.address}</S.AddressBox>
        <S.PhoneBox>
          <span>
            <IconPhone />
            {post?.phoneNumber}
          </span>
          <CopyButton label="번호복사" text={post?.phoneNumber} />
        </S.PhoneBox>
        {messengerHref && (
          <S.MessengerLink
            href={messengerHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={`${post?.storeName || "업체"} ${messengerLabel} 열기`}
            $hasBackgroundImage={hasMessengerBanner}
          >
            {hasMessengerBanner && (
              <S.MessengerBackground aria-hidden="true">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${messengerImage.filename}`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) calc(100vw - 32px), 390px"
                />
              </S.MessengerBackground>
            )}
            {!hasMessengerBanner && (
              <S.MessengerIcon $variant={messengerType}>
                {messengerType === "discord" ? (
                  <IconDiscord width={42} height={42} viewBox="0 0 24 24" />
                ) : (
                  <IconTelegram width={42} height={42} viewBox="0 0 24 24" />
                )}
              </S.MessengerIcon>
            )}
            <S.MessengerCopy>
              <small>OFFICIAL GROUP CHAT</small>
              <strong>{messengerLabel}</strong>
              <span>앱에서 바로 열기</span>
            </S.MessengerCopy>
            <S.MessengerArrow aria-hidden="true">↗</S.MessengerArrow>
          </S.MessengerLink>
        )}
      </S.StoreInfo>
    </S.StoreInfoBox>
  );
};
