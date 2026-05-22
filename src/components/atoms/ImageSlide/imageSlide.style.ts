import styled from "styled-components";

export const ImageSlide = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto 85px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const ImageSelected = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  width: 505px;
  height: 390px;
  border-radius: 4px;
  align-items: center;

  button {
    position: relative;
    z-index: 10;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 280px;
    border-radius: 0;
  }
`;

export const ImageSlideList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 0 16px;
    flex-direction: row;
    gap: 12px;
  }
`;

export const ImageSlideItem = styled.li`
  overflow: hidden;
  width: 85px;
  height: 62px;
  border-radius: 4px;
  cursor: pointer;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(20vw - 12px);
    border-radius: 0;
  }
`;
