import styled, { css } from "styled-components";

export const LinkBox = styled.div<{ $stacked?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    display: flex;
    /* width:100%; padding으로 좌우 여백을 주면 position:fixed의 static position(조상 padding 영향)에
       따라 밀릴 수 있어, CounterBox(left:8px; width:calc(100% - 16px))와 동일하게
       뷰포트 기준 left/right로 직접 고정해 좌우 마진을 맞춘다. */
    left: 8px;
    right: 8px;
    width: auto;
    bottom: 8px;
    flex-direction: column;
    gap: 8px;

    ${(props) =>
      props.$stacked &&
      css`
        /* 같은 화면에 fixed로 떠 있는 CounterBox(오늘의 방문자수, bottom 8px)와 겹치지 않도록
           CounterBox 높이(72px = 40px 카운터 + 16px*2 패딩) + 8px 여백만큼 위에 띄운다. */
        bottom: 88px;
      `}
  }
`;
