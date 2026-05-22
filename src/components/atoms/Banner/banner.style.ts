import styled, { css } from "styled-components";
import BannerEmpty from "public/assets/images/img-banner-empty.png";
import BannerEmptySM from "public/assets/images/img-banner-empty-sm.png";
import BannerEmptyMobile from "public/assets/images/img-banner-empty-mobile.png";
import BannerEmptySMMobile from "public/assets/images/img-banner-empty-sm-mobile.png";

interface BannerProps {
  order: string;
  admin?: boolean;
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
