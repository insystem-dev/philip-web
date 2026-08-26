import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  from { background-position: 120% 0; }
  to { background-position: -120% 0; }
`;

export const ExchangeCard = styled.section`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  padding: 18px 18px 15px;
  color: ${(props) => props.theme.colors.white};
  background:
    radial-gradient(circle at 92% 0, rgba(230, 207, 140, 0.15), transparent 42%),
    linear-gradient(145deg, rgba(35, 43, 55, 0.96), rgba(13, 20, 31, 0.98));
  border: 1px solid rgba(230, 207, 140, 0.28);
  border-radius: 8px;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.24);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 18px;
    left: 18px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e6cf8c, transparent);
  }

  @media screen and (max-width: 768px) {
    padding: 8px 10px 7px;
    border-radius: 7px;
    box-shadow: 0 9px 22px rgba(0, 0, 0, 0.2);

    &::before {
      right: 10px;
      left: 10px;
    }
  }
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media screen and (max-width: 768px) {
    align-items: center;
    gap: 8px;
  }
`;

export const Eyebrow = styled.p`
  margin-bottom: 3px;
  color: #d6bd70;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  letter-spacing: 0.17em;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h2`
  color: rgba(255, 255, 255, 0.96);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.04em;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
`;

export const RefreshButton = styled.button<{ $loading: boolean }>`
  display: grid;
  width: 30px;
  height: 30px;
  padding: 0 0 2px;
  color: rgba(255, 255, 255, 0.64);
  font-size: 2rem;
  line-height: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    color: #f1da96;
    border-color: rgba(230, 207, 140, 0.5);
    outline: none;
  }

  ${(props) =>
    props.$loading &&
    css`
      animation: ${spin} 0.8s linear infinite;
    `}

  &:disabled {
    cursor: wait;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media screen and (max-width: 768px) {
    width: 22px;
    height: 22px;
    padding-bottom: 1px;
    font-size: 1.45rem;
  }
`;

export const RateMeta = styled.div`
  display: flex;
  min-height: 22px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.46);
  font-size: 1.1rem;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  @media screen and (max-width: 768px) {
    min-height: 12px;
    margin-top: 1px;
    font-size: 0.82rem;
    line-height: 1.2;
  }
`;

export const StaleBadge = styled.span`
  padding: 3px 7px;
  color: #e6cf8c;
  background: rgba(230, 207, 140, 0.1);
  border: 1px solid rgba(230, 207, 140, 0.22);
  border-radius: 999px;
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    padding: 1px 5px;
    font-size: 0.78rem;
  }
`;

export const RateList = styled.ul`
  display: flex;
  margin-top: 7px;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: grid;
    margin-top: 4px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const RateRow = styled.li`
  display: grid;
  min-height: 56px;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.075);

  &:last-child {
    border-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    min-width: 0;
    min-height: 38px;
    padding: 1px 7px;
    grid-template-columns: 20px minmax(0, 1fr);
    grid-template-rows: 16px 18px;
    align-content: center;
    gap: 0 5px;
    border-right: 1px solid rgba(255, 255, 255, 0.075);
    border-bottom: 0;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
      border-right: 0;
    }
  }
`;

export const CurrencyMark = styled.span<{
  $tone: "usd" | "php" | "usdt";
}>`
  display: grid;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${(props) =>
    props.$tone === "php"
      ? "#172338"
      : props.$tone === "usdt"
      ? "#b8f1df"
      : "#d8e7ff"};
  background: ${(props) =>
    props.$tone === "php"
      ? "linear-gradient(145deg, #f0dc9c, #b99a42)"
      : props.$tone === "usdt"
      ? "rgba(38, 161, 123, 0.2)"
      : "rgba(77, 130, 214, 0.2)"};
  border: 1px solid
    ${(props) =>
      props.$tone === "php"
        ? "rgba(255, 239, 186, 0.5)"
        : props.$tone === "usdt"
        ? "rgba(38, 161, 123, 0.42)"
        : "rgba(100, 151, 229, 0.38)"};
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.65rem;
  font-weight: 700;
  place-items: center;

  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
    grid-row: 1 / 3;
    font-size: 1.1rem;
  }
`;

export const CurrencyName = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;

  strong {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.3rem;
    font-weight: 600;
  }

  span {
    color: rgba(255, 255, 255, 0.38);
    font-size: 1rem;
    letter-spacing: 0.05em;
  }

  @media screen and (max-width: 768px) {
    gap: 0;

    strong {
      overflow: hidden;
      font-size: 1rem;
      line-height: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      display: none;
    }
  }
`;

export const RateValue = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 4px;
  font-variant-numeric: tabular-nums;

  strong {
    color: #f7f2e3;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  span {
    color: rgba(255, 255, 255, 0.46);
    font-size: 1.05rem;
  }

  @media screen and (max-width: 768px) {
    grid-column: 2;
    justify-content: flex-start;
    gap: 2px;
    line-height: 18px;

    strong {
      overflow: hidden;
      max-width: 100%;
      font-size: 1.18rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      font-size: 0.75rem;
    }
  }
`;

export const SourceNote = styled.p`
  display: flex;
  margin-top: 9px;
  color: rgba(255, 255, 255, 0.34);
  font-size: 0.95rem;
  line-height: 1.45;
  flex-direction: column;
  gap: 1px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SkeletonRow = styled.li`
  display: grid;
  min-height: 56px;
  grid-template-columns: 32px 1fr 76px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  span {
    height: 12px;
    background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.04) 15%,
      rgba(255, 255, 255, 0.11) 38%,
      rgba(255, 255, 255, 0.04) 62%
    );
    background-size: 220% 100%;
    border-radius: 8px;
    animation: ${shimmer} 1.2s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    &:first-child {
      height: 32px;
      border-radius: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    min-width: 0;
    min-height: 38px;
    padding: 1px 7px;
    grid-template-columns: 20px minmax(0, 1fr);
    grid-template-rows: repeat(2, 9px);
    align-content: center;
    gap: 4px 5px;
    border-right: 1px solid rgba(255, 255, 255, 0.075);
    border-bottom: 0;

    span:first-child {
      height: 20px;
      grid-row: 1 / 3;
    }

    span:last-child {
      grid-column: 2;
    }

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
      border-right: 0;
    }
  }
`;

export const ErrorState = styled.div`
  display: flex;
  min-height: 170px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 768px) {
    min-height: 64px;
    font-size: 0.95rem;
  }

  strong {
    color: rgba(255, 255, 255, 0.82);
    font-size: 1.3rem;

    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

export const RetryButton = styled.button`
  height: 30px;
  padding: 0 12px;
  margin-top: 8px;
  color: #e6cf8c;
  background: rgba(230, 207, 140, 0.08);
  border: 1px solid rgba(230, 207, 140, 0.3);
  border-radius: 999px;
  font-size: 1.05rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(230, 207, 140, 0.15);
    outline: none;
  }
`;
