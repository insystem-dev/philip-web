import styled from "styled-components";
import ImgSelectBG from "public/assets/images/bg-select.png";

export const CategoryPage = styled.section`
  display: flex;
  min-height: calc(100vh - 64px);
  padding: 32px 20px 48px;
  background: url(${ImgSelectBG?.src}) no-repeat;
  background-size: cover;
  background-position: bottom;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 16px 0 170px;
    background: none;
    justify-content: flex-start;
    gap: 24px;
  }
`;

export const CategoryContent = styled.div`
  display: flex;
  width: min(1240px, 100%);
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

export const TopBanner = styled.section`
  overflow: hidden;
  display: grid;
  width: 100%;
  grid-template-areas:
    "LG LG LG"
    "SM1 SM2 SM3";
  grid-template-rows: 180px 120px;
  gap: 8px;
  border-radius: 6px;

  > div {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 180px 120px;
    gap: 2px;
    border-radius: 0;
  }
`;

export const CategoryArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

export const BottomBanners = styled.section`
  display: block;
  overflow: hidden;
  width: min(1240px, 100%);
  border-radius: 6px;

  > div {
    width: 100%;
    border-radius: 6px;
  }

  @media screen and (max-width: 768px) {
    > div {
      border-radius: 0;
    }
  }
`;

export const ContactArea = styled.div`
  display: flex;
  width: min(1240px, 100%);
  justify-content: center;
`;

export const CategoryTxtBox = styled.div`
  color: white;
  font-size: 2rem;

  @media screen and (min-width: 769px) {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
