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
