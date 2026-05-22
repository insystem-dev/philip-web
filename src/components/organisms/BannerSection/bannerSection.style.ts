import styled from "styled-components";

export const BannerSection = styled.section`
  grid-area: BN;
  display: grid;
  width: 1240px;
  grid-template-areas:
    "LG LG LG"
    "SM1 SM2 SM3";
  grid-template-rows: 180px 120px;
  grid-gap: 8px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(100vw);
    grid-template-rows: 180px 120px;
    grid-gap: 2px;
  }
`;
