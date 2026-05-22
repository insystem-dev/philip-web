import { Props } from "google-map-react";
import styled from "styled-components";

export const PriceInfoBox = styled.div<{ isOpen: string }>`
  display: ${(props) => (props.isOpen ? "grid" : "grid")};
  grid-template-areas:
    "TT TT"
    "IMG IF"
    "BT BT";
  width: 100%;
  color: white;
  font-size: 1.6rem;
  font-weight: 300;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 24px auto 24px;
  grid-gap: 20px;
  height: ${(props) => (props.isOpen ? "100%" : "200px")};
  transition: 0.5s ease-in;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 0 16px;
    grid-template-areas:
      "TT"
      "IF"
      "IMG"
      "BT";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto;
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

export const PriceImg = styled.div`
  position: relative;
  overflow: hidden;
  grid-area: IMG;
  display: flex;
  width: 100%;
  height: auto;
  background: #171717;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto !important;
    object-position: top;
  }
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
