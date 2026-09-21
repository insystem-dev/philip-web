import styled, { css } from "styled-components";

export const StoreInfoBox = styled.div`
  display: grid;
  width: 100%;
  color: white;
  font-size: 1.6rem;
  font-weight: 300;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0;
  }
`;

export const StoreInfo = styled.div`
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  gap: 10px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0 16px;
    margin-top: 30px;
  }
`;

export const StoreInfoTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StoreNameBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 2.8rem;
  font-weight: 500;
  flex-direction: column;
  gap: 5px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

export const CategorySpan = styled.div`
  font-size: 1.8rem;
  font-weight: 400;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    color: ${(props) => props.theme.colors.categorySubTxt};
    font-size: 1.8rem;
  }
`;

export const StoreViewBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  gap: 3px;

  svg {
    path:nth-child(2) {
      fill: ${(props) => props.theme.colors.white};
    }
  }
`;

export const ContactList = styled.ul`
  // 주소 한 줄 말줄임(nowrap)이 상위 grid 최소 너비를 밀어 가로 스크롤이 생기지 않도록
  // 목록 자체의 고유 너비는 0으로 보고, 실제 너비는 부모(stretch)를 따른다
  contain: inline-size;
  display: flex;
  font-size: 1.5rem;
  letter-spacing: 0;
  flex-direction: column;
  gap: 12px;
`;

export const ContactItem = styled.li`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
`;

export const ContactIcon = styled.span<{ $variant?: "kakao" }>`
  display: flex;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.6);
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$variant === "kakao" &&
    css`
      background: ${props.theme.colors.kakaoBg};
      border-radius: 5px;
    `}
`;

const contactText = css`
  min-width: 0;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const ContactValue = styled.span<{ $ellipsis?: boolean }>`
  ${contactText}

  ${(props) =>
    props.$ellipsis &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
`;

export const ContactLink = styled.a<{ $noShrink?: boolean }>`
  ${contactText}
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.35);
  text-underline-offset: 3px;
  transition: color 0.1s ease-in-out, text-decoration-color 0.1s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    text-decoration-color: currentColor;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  ${(props) =>
    props.$noShrink &&
    css`
      flex: 0 0 auto;
      white-space: nowrap;
    `}
`;
