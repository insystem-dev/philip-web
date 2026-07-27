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

export const ImageEmpty = styled.div`
  display: flex;
  overflow: hidden;
  grid-column: 1 / 3;
  width: 100%;
  height: 390px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.categorySubTxt};
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;

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
