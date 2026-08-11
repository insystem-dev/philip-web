import Image from "next/image";
import * as S from "./banner.style";

interface BannerProps {
  order: string;
  ads?: any;
  admin?: boolean;
  loading?: boolean;
  /** 노출 위치 태그 (관리자 미리보기 전용 — 미전달 시 렌더하지 않는다) */
  positionLabel?: string;
  /** 노출 범위 태그 (관리자 미리보기 전용 — 지역 폴백으로 잡힌 배너 구분용) */
  scopeLabel?: string;
  /** 연결 대상이 있는 배너의 클릭 핸들러 (관리자 미리보기에는 넘기지 않는다) */
  onAdClick?: (ads: any) => void;
}

export const Banner: React.FC<BannerProps> = ({
  order,
  ads,
  admin,
  loading,
  positionLabel,
  scopeLabel,
  onAdClick,
}) => {
  /** 연결 대상과 핸들러가 모두 있을 때만 클릭 가능 */
  const clickable = !!onAdClick && !!(ads?.adLinkPostOid || ads?.adLinkUrl);

  return (
    <S.Banner
      order={order}
      admin={admin}
      $clickable={clickable}
      onClick={clickable ? () => onAdClick?.(ads) : undefined}
    >
      {positionLabel && (
        <S.BannerPositionTag>{positionLabel}</S.BannerPositionTag>
      )}
      {scopeLabel && <S.BannerScopeTag>{scopeLabel}</S.BannerScopeTag>}
      {ads?.filename && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${ads.filename}`}
          layout="fill"
          alt="광고"
        />
      )}
      {loading && (
        <S.BannerLoadingOverlay>
          <S.BannerLoader />
        </S.BannerLoadingOverlay>
      )}
    </S.Banner>
  );
};
