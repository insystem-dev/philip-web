import styled, { css } from "styled-components";

export const LinkBox = styled.div<{ $stacked?: boolean; $inline?: boolean }>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
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
        /* 메인화면 사이드 영역(AsideSection)의 문의 버튼은 모바일에서 fixed로 떠 있으면
           CounterBox(오늘의 방문자수)와 겹쳐 화면 하단을 가리므로 모바일에서만 숨긴다.
           769px 이상 데스크탑 사이드바에서는 이 미디어쿼리 밖 기본 스타일로 그대로 노출된다. */
        display: none;
      `}

    ${(props) =>
      props.$inline &&
      css`
        position: static;
        width: min(920px, calc(100% - 32px));
        flex-direction: row;
        justify-content: space-between;
      `}
  }
`;
