import styled from "styled-components";

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

export const AddressBox = styled.div`
  letter-spacing: 0;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

export const PhoneBox = styled.div`
  display: flex;
  letter-spacing: 0;
  align-items: center;
  gap: 20px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const MessengerLink = styled.a<{ $hasBackgroundImage: boolean }>`
  isolation: isolate;
  overflow: hidden;
  position: relative;
  display: grid;
  width: min(100%, 390px);
  min-height: 70px;
  margin-top: 8px;
  padding: 13px 14px;
  color: white;
  background: ${(props) =>
    props.$hasBackgroundImage
      ? "#07141f"
      : `linear-gradient(
          105deg,
          rgba(42, 171, 238, 0.2),
          rgba(7, 20, 31, 0.86) 62%
        )`};
  border: 1px solid rgba(103, 205, 255, 0.52);
  border-radius: 10px;
  grid-template-columns: ${(props) =>
    props.$hasBackgroundImage ? "1fr 28px" : "42px 1fr 28px"};
  text-decoration: none;
  align-items: center;
  gap: 11px;
  box-shadow: 0 8px 26px rgba(0, 107, 164, 0.15);
  transition: border-color 160ms ease, box-shadow 160ms ease,
    transform 160ms ease;

  &::before {
    position: absolute;
    z-index: 1;
    inset: 0;
    background: ${(props) =>
      props.$hasBackgroundImage
        ? "linear-gradient(90deg, rgba(3, 12, 20, 0.38) 0%, rgba(3, 12, 20, 0.18) 58%, rgba(3, 12, 20, 0.08) 100%)"
        : "transparent"};
    content: "";
    pointer-events: none;
  }

  &::after {
    position: absolute;
    z-index: 2;
    top: -50%;
    left: -35%;
    width: 24%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.24),
      transparent
    );
    content: "";
    transform: rotate(15deg);
    transition: left 420ms ease;
  }

  &:hover {
    color: white;
    border-color: #72d2ff;
    box-shadow: 0 10px 30px rgba(42, 171, 238, 0.25);
    transform: translateY(-2px);

    &::after {
      left: 112%;
    }

    > span:first-child img {
      transform: scale(1.04);
    }
  }

  &:focus-visible {
    outline: 2px solid #78d5ff;
    outline-offset: 3px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 6px;
  }
`;

export const MessengerBackground = styled.span`
  position: absolute;
  z-index: 0;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center;
    filter: saturate(1.12) contrast(1.05);
    transition: transform 320ms ease;
  }
`;

export const MessengerIcon = styled.span`
  position: relative;
  z-index: 3;
  overflow: hidden;
  display: flex;
  width: 42px;
  height: 42px;
  background: #2aabee;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessengerCopy = styled.span`
  position: relative;
  z-index: 3;
  display: grid;
  min-width: 0;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  gap: 1px 8px;

  small {
    grid-column: 1 / -1;
    color: #6fd2ff;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.13em;
  }

  strong {
    font-size: 1.45rem;
    font-weight: 700;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.72);
  }

  span {
    color: rgba(255, 255, 255, 0.66);
    font-size: 1.1rem;
  }
`;

export const MessengerArrow = styled.span`
  position: relative;
  z-index: 3;
  display: flex;
  width: 26px;
  height: 26px;
  color: #c7efff;
  background: rgba(42, 171, 238, 0.2);
  border: 1px solid rgba(124, 216, 255, 0.32);
  border-radius: 50%;
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
`;
