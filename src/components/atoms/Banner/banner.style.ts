import styled, { css } from "styled-components";
import BannerEmpty from "public/assets/images/img-banner-empty.png";
import BannerEmptySM from "public/assets/images/img-banner-empty-sm.png";
import BannerEmptyMobile from "public/assets/images/img-banner-empty-mobile.png";
import BannerEmptySMMobile from "public/assets/images/img-banner-empty-sm-mobile.png";

interface BannerProps {
  order: string;
  admin?: boolean;
  /** 연결 대상이 있어 클릭 이동이 가능한 배너 */
  $clickable?: boolean;
}

export const Banner = styled.div<BannerProps>`
  position: relative;
  grid-area: ${(props) => props.order};
  display: flex;
  height: ${(props) => (props.order === "LG" ? "180px" : "120px")};
  color: white;
  font-size: 1.7rem;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.order === "LG"
      ? css`
          background: url(${BannerEmpty?.src});
        `
      : css`
          background: url(${BannerEmptySM?.src});
        `}

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  ${(props) =>
    props.admin &&
    css`
      height: ${props.order === "LG" ? "89px" : "58px"} !important;
    `}

  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;
    `}

  //업로드 중 로딩 오버레이가 배너 영역을 덮도록 함
  overflow: hidden;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    ${(props) =>
      props.order === "LG"
        ? css`
            background: url(${BannerEmptyMobile?.src});
          `
        : css`
            background: url(${BannerEmptySMMobile?.src});
          `}

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

/** 관리자 미리보기용 노출 위치 태그 (좌상단 오버레이) — 등록 카드의 위치 태그와 같은 룩 */
export const BannerPositionTag = styled.span`
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 3;
  display: inline-flex;
  height: 20px;
  padding: 0 8px;
  border-radius: 4px;
  color: white;
  background: rgba(0, 0, 0, 0.62);
  font-size: 1.05rem;
  font-weight: 600;
  align-items: center;
  pointer-events: none;
`;

/**
 * 관리자 미리보기용 노출 범위 태그 (우상단 오버레이)
 * 이 지역 전용 배너가 아니라 "전 지역 공통" 배너가 폴백으로 잡혔을 때만 표시한다.
 * 위치 태그와 겹치지 않도록 반대편에 두고, 경고 톤(앰버)으로 구분한다.
 */
export const BannerScopeTag = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 3;
  display: inline-flex;
  height: 20px;
  padding: 0 8px;
  border-radius: 4px;
  color: #3a2a00;
  background: rgba(255, 196, 61, 0.92);
  font-size: 1.05rem;
  font-weight: 700;
  align-items: center;
  pointer-events: none;
`;

export const BannerLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

export const BannerLoader = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-top: 3px solid rgba(255, 255, 255, 0.5);
  border-right: 3px solid rgba(255, 255, 255, 0.5);
  border-bottom: 3px solid rgba(255, 255, 255, 0.5);
  border-left: 3px solid rgba(255, 255, 255, 1);
  animation: banner-loader 1s cubic-bezier(0.41, 0.25, 0.32, 0.83) infinite;

  @keyframes banner-loader {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }
`;
