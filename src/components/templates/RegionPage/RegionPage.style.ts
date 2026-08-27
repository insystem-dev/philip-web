import styled from "styled-components";
import ImgSelectBG from "public/assets/images/bg-select.png";

export const RegionPage = styled.section`
  display: flex;
  height: calc(100vh - 80px);
  background: url(${ImgSelectBG?.src}) no-repeat;
  background-size: cover;
  background-position: bottom;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 46px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    background: none;
    justify-content: flex-start;
    gap: 28px;
  }
`;

export const RegionIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 22px;
    gap: 14px;
  }
`;

export const RegionTxtBox = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
