import styled from "styled-components";

interface LocationBoxProps {
  blur?: boolean;
}

export const LocationBox = styled.div<LocationBoxProps>`
  display: grid;
  grid-template-areas:
    "BT BT"
    "TT TT"
    "MAP IF";
  width: 100%;
  color: white;
  font-size: 1.6rem;
  font-weight: 300;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 20px;
  background-color: #212121;
  mask-image: ${(props) =>
    props.blur ? "linear-gradient(to top, #212121 95%, transparent 100%)" : ""};

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0 16px;
    grid-template-areas:
      "BT"
      "TT"
      "MAP"
      "IF";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
  }
`;

export const LocationTit = styled.div`
  grid-area: TT;
  font-size: 2rem;
  font-weight: 500;
`;

export const LocationMap = styled.div`
  grid-area: MAP;
`;

export const LocationInfo = styled.div`
  grid-area: IF;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  align-items: left;
  flex-wrap: wrap;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 10px 0 0;
    line-height: 2rem;
  }
`;
