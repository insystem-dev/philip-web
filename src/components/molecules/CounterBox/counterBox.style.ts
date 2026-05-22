import styled from "styled-components";

export const CounterBox = styled.div`
  display: flex;
  padding: 30px;
  background: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  gap: 15px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    position: fixed;
    width: calc(100% - 16px);
    left: 8px;
    bottom: 8px;
    padding: 16px 0;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    z-index: 10;
  }
`;

export const CounterLabelSpan = styled.span`
  color: white;
  font-size: 1.8rem;
  font-weight: 500;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
