import styled from "styled-components";

export const PriceInfoBox = styled.div`
  display: grid;
  grid-template-areas:
    "TT TT"
    "IMG IF";
  width: 100%;
  color: white;
  font-size: 1.6rem;
  font-weight: 300;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    /* ImageSlide 가 모바일에서 100vw 를 쓰므로 컨테이너에는 좌우 여백을 주지 않는다 */
    width: 100vw;
    grid-template-areas:
      "TT"
      "IMG"
      "IF";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
  }
`;

export const PriceTit = styled.div`
  grid-area: TT;
  font-size: 2rem;
  font-weight: 500;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0 16px;
    font-size: 1.8rem;
  }
`;

export const PriceImg = styled.div`
  grid-area: IMG;
  /* ImageSlide(메인 505px + 썸네일 85px) 가 그리드 컬럼을 넘기지 않도록 */
  width: 100%;
  min-width: 0;
`;

export const PriceInfo = styled.div`
  grid-area: IF;
  padding: 0 10px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0 16px 10px;
    font-size: 1.5rem;
  }
`;

export const InfoLine = styled.span`
  font-size: 100%;
  line-height: 25px;
`;

export const PriceEmpty = styled.p`
  color: ${(props) => props.theme.colors.categorySubTxt};
  font-size: 1.5rem;
`;
