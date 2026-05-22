import styled from "styled-components";
import ImgSelectBG from "public/assets/images/bg-select.png";

export const CategoryPage = styled.section`
  display: flex;
  height: calc(100vh - 64px);
  background: url(${ImgSelectBG?.src}) no-repeat;
  background-size: conver;
  background-position: bottom;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 68px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    background: none;
    justify-content: flex-start;
    gap: 40px;
  }
`;

export const CategoryTxtBox = styled.div`
  color: white;
  font-size: 2rem;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    margin-top: 40px;
    font-size: 1.6rem;
  }
`;
