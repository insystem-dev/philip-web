import { ImageSlide } from "@/components/atoms/ImageSlide";
import { CopyTextButton } from "@/components/atoms/Button/CopyTextButton";
import * as S from "./storeInfoBox.style";
import IconPhone from "public/assets/svg/icon-phone-line.svg";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import IconTelegram from "public/assets/svg/icon-telegram.svg";
import IconDiscord from "public/assets/svg/icon-discord.svg";
import IconLocation from "public/assets/svg/icon-location.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import { parseMessengerLink } from "@/lib/messenger";
// 조회수 임시 미노출로 아이콘도 함께 주석처리 (복구 시 아래 StoreViewBox 블록과 같이 해제)
// import IconView from "public/assets/svg/icon-view.svg";

const toText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const StoreInfoBox = ({ post }: any) => {
  const { message } = usePhilipLocale();
  const phoneNumber = toText(post?.phoneNumber);
  const kakaoId = toText(post?.kakaoId);
  const telegramId = toText(post?.telegramId);
  const address = toText(post?.address);
  const messenger = parseMessengerLink(post?.messengerLink);
  const telegramLink = messenger?.type === "telegram" ? messenger : null;
  const discordLink = messenger?.type === "discord" ? messenger : null;
  // 텔레그램 아이디를 따로 입력하지 않았으면 단체방 링크의 @아이디(또는 주소)를 대신 보여준다
  const telegramText = telegramId || telegramLink?.label || "";
  const telegramCopyText = telegramId || telegramLink?.copyText || "";
  const hasContact = Boolean(
    phoneNumber || kakaoId || telegramText || discordLink || address
  );

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

        {/* 연락처 목록 — 값이 있는 항목만 "아이콘 + 값 + (복사)" 한 줄씩 노출 */}
        {hasContact && (
          <S.ContactList>
            {phoneNumber && (
              <S.ContactItem>
                <S.ContactIcon role="img" aria-label={message.detail.phoneNumber}>
                  <IconPhone width={18} height={18} viewBox="0 0 16 16" />
                </S.ContactIcon>
                <S.ContactValue>{phoneNumber}</S.ContactValue>
                <CopyTextButton
                  text={phoneNumber}
                  label={message.detail.copyPhone}
                />
              </S.ContactItem>
            )}
            {kakaoId && (
              <S.ContactItem>
                <S.ContactIcon
                  role="img"
                  aria-label={message.detail.kakaoTalk}
                  $variant="kakao"
                >
                  <IconKakao width={12} height={12} viewBox="0 0 24 24" />
                </S.ContactIcon>
                <S.ContactValue>{kakaoId}</S.ContactValue>
                <CopyTextButton
                  text={kakaoId}
                  label={message.detail.copyKakao}
                />
              </S.ContactItem>
            )}
            {telegramText && (
              <S.ContactItem>
                <S.ContactIcon role="img" aria-label={message.detail.telegram}>
                  <IconTelegram width={18} height={18} viewBox="0 0 24 24" />
                </S.ContactIcon>
                {/* 단체방 링크가 있으면 아이디를 눌러 텔레그램으로 바로 이동 */}
                {telegramLink ? (
                  <S.ContactLink
                    href={telegramLink.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {telegramText}
                  </S.ContactLink>
                ) : (
                  <S.ContactValue>{telegramText}</S.ContactValue>
                )}
                <CopyTextButton
                  text={telegramCopyText}
                  label={message.detail.copyTelegram}
                />
              </S.ContactItem>
            )}
            {discordLink && (
              <S.ContactItem>
                <S.ContactIcon role="img" aria-label={message.detail.discord}>
                  <IconDiscord width={18} height={18} viewBox="0 0 24 24" />
                </S.ContactIcon>
                <S.ContactLink
                  href={discordLink.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {discordLink.label}
                </S.ContactLink>
                <CopyTextButton
                  text={discordLink.copyText}
                  label={message.detail.copyDiscord}
                />
              </S.ContactItem>
            )}
            {address && (
              <S.ContactItem>
                <S.ContactIcon role="img" aria-label={message.detail.location}>
                  <IconLocation width={18} height={18} viewBox="0 0 16 16" />
                </S.ContactIcon>
                <S.ContactLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={message.detail.viewLocationAria}
                  $noShrink
                >
                  {message.detail.viewLocation}
                </S.ContactLink>
                {/* 주소는 한 줄 말줄임 — 전체 주소는 아래 '오시는 길'과 복사로 확인 */}
                <S.ContactValue title={address} $ellipsis>
                  {address}
                </S.ContactValue>
                <CopyTextButton
                  text={address}
                  label={message.detail.copyAddress}
                />
              </S.ContactItem>
            )}
          </S.ContactList>
        )}
      </S.StoreInfo>
    </S.StoreInfoBox>
  );
};
