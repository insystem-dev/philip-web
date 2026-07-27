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
    width: 100vw;
    padding: 0 16px;
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
    font-size: 1.8rem;
  }
`;

export const PriceImg = styled.div<{ $empty?: boolean }>`
  position: relative;
  overflow: hidden;
  grid-area: IMG;
  display: flex;
  width: 100%;
  min-height: 200px;
  height: auto;
  background: ${(props) => (props.$empty ? "rgba(255, 255, 255, 0.03)" : "#171717")};
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto !important;
    object-position: top;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    min-height: 160px;
  }
`;

export const PriceImgEmpty = styled.span`
  color: ${(props) => props.theme.colors.categorySubTxt};
  font-size: 1.5rem;
`;

export const PriceInfo = styled.div`
  grid-area: IF;
  padding: 0 10px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0 0 10px;
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
