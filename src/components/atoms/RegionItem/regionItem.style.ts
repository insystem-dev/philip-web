import styled, { css } from "styled-components";
import ImgWeb01 from "public/assets/images/image-region-web-01.png";
import ImgWeb02 from "public/assets/images/image-region-web-02.png";
import ImgWeb03 from "public/assets/images/image-region-web-03.png";
import ImgWeb01Disabled from "public/assets/images/image-region-web-disabled01.png";
import ImgWeb02Disabled from "public/assets/images/image-region-web-disabled02.png";
import ImgWeb03Disabled from "public/assets/images/image-region-web-disabled03.png";
import ImgMob01 from "public/assets/images/image-region-mob-01.png";
import ImgMob02 from "public/assets/images/image-region-mob-02.png";
import ImgMob03 from "public/assets/images/image-region-mob-03.png";
import ImgMob01Disabled from "public/assets/images/image-region-mob-disabled01.png";
import ImgMob02Disabled from "public/assets/images/image-region-mob-disabled02.png";
import ImgMob03Disabled from "public/assets/images/image-region-mob-disabled03.png";

interface ItemProps {
  item: string;
  disabled: boolean;
}

export const RegionItem = styled.li<ItemProps>`
  position: relative;
  display: flex;
  width: 400px;
  height: 450px;
  padding: 40px;
  color: white;
  background-position: center;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  flex-direction: column;
  justify-content: flex-end;

  ${(props) =>
    props.disabled === false &&
    (props.item === "8d0fe970-c153-11ed-8fb3-59762efda8c3"
      ? css`
          background: url(${ImgWeb01?.src});
        `
      : props.item === "8733aaf0-c153-11ed-8fb3-59762efda8c3"
      ? css`
          background: url(${ImgWeb02?.src});
        `
      : props.item === "8f487450-c153-11ed-8fb3-59762efda8c3" &&
        css`
          background: url(${ImgWeb03?.src});
        `)}

  ${(props) =>
    props.disabled === true &&
    (props.item === "8d0fe970-c153-11ed-8fb3-59762efda8c3"
      ? css`
          background: url(${ImgWeb01Disabled?.src});
        `
      : props.item === "8733aaf0-c153-11ed-8fb3-59762efda8c3"
      ? css`
          background: url(${ImgWeb02Disabled?.src});
        `
      : props.item === "8f487450-c153-11ed-8fb3-59762efda8c3" &&
        css`
          background: url(${ImgWeb03Disabled?.src});
        `)}

  ${(props) =>
    props.disabled === true
      ? css`
          cursor: default;
        `
      : css`
          cursor: pointer;
        `}

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${(props) =>
      props.disabled === true
        ? css`
            background: ${(props) => props.theme.colors.black}b2;
          `
        : css`
            background: ${(props) => props.theme.gradient.dark};
          `}
  }

  &:hover {
    &::before {
      border: ${(props) =>
        props.disabled === false
          ? "8px solid" + props.theme.colors.primary
          : "none"};
      transition: all 0.1s ease-in-out;
    }
  }

  svg {
    display: none;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(100vw);
    height: calc(22vh);
    min-height: 150px;
    padding: 20px 30px;
    background-position: center;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    ${(props) =>
      props.disabled === false &&
      (props.item === "8d0fe970-c153-11ed-8fb3-59762efda8c3"
        ? css`
            background: url(${ImgMob01?.src});
          `
        : props.item === "8733aaf0-c153-11ed-8fb3-59762efda8c3"
        ? css`
            background: url(${ImgMob02?.src});
          `
        : props.item === "8f487450-c153-11ed-8fb3-59762efda8c3" &&
          css`
            background: url(${ImgMob03?.src});
          `)}

    ${(props) =>
      props.disabled === true &&
      (props.item === "8d0fe970-c153-11ed-8fb3-59762efda8c3"
        ? css`
            background: url(${ImgMob01Disabled?.src});
          `
        : props.item === "8733aaf0-c153-11ed-8fb3-59762efda8c3"
        ? css`
            background: url(${ImgMob02Disabled?.src});
          `
        : props.item === "8f487450-c153-11ed-8fb3-59762efda8c3" &&
          css`
            background: url(${ImgMob03Disabled?.src});
          `)}

    &::before {
      ${(props) =>
        props.disabled === true
          ? css`
              background: ${(props) => props.theme.colors.black}b2;
            `
          : css`
              background: ${(props) => props.theme.colors.black}66;
            `}
    }

    &:hover {
      &::before {
        border: none;
      }
    }

    &:active {
      &::before {
        ${(props) =>
          props.disabled === true
            ? css`
                background: ${(props) => props.theme.colors.black}b2;
              `
            : css`
                background: ${(props) => props.theme.colors.black}8c;
              `}
      }
    }

    svg {
      display: block;
      width: 34px;
      height: 34px;

      path {
        fill: white;
      }
    }
  }
`;

export const ItemTitBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
  }
`;

export const ItemKR = styled.div`
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: -0.1rem;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 3.4rem;
    font-weight: 600;
  }
`;

export const ItemEN = styled.div`
  font-size: 2.4rem;
  letter-spacing: -0.1rem;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    font-weight: 500;
  }
`;
