import styled from "styled-components";

export const Picker = styled.div<{ $compact: boolean; $disabled: boolean }>`
  display: inline-flex;
  width: ${(props) => (props.$compact ? "46px" : "54px")};
  height: ${(props) => (props.$compact ? "32px" : "36px")};
  flex: none;
  opacity: ${(props) => (props.$disabled ? 0.55 : 1)};
`;

export const Trigger = styled.button`
  display: inline-flex;
  width: 100%;
  height: 100%;
  padding: 0 7px 0 8px;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.whiteHover};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 0;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(68, 98, 255, 0.13);
  }

  &:disabled {
    cursor: default;
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;

export const Chevron = styled.span`
  width: 0;
  height: 0;
  border-top: 4px solid ${(props) => props.theme.colors.adminLabelTxt};
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: 10000;
  inset: 0;
  display: grid;
  padding: 20px;
  background: rgba(23, 23, 23, 0.2);
  place-items: center;
`;

export const Dialog = styled.div`
  width: min(440px, 100%);
  padding: 22px;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 12px;
  box-shadow: 0 22px 60px rgba(23, 23, 23, 0.2);
`;

export const DialogHeader = styled.header`
  display: flex;
  margin-bottom: 18px;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DialogEyebrow = styled.p`
  margin: 0 0 4px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

export const DialogTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.dark};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

export const CloseButton = styled.button`
  display: inline-grid;
  width: 32px;
  height: 32px;
  padding: 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 2.2rem;
  line-height: 1;
  background: ${(props) => props.theme.colors.adminInputBg};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  place-items: center;

  &:hover {
    color: ${(props) => props.theme.colors.dark};
    background: ${(props) => props.theme.colors.adminDivider};
  }
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 9px;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const IconOption = styled.button<{ $selected: boolean }>`
  position: relative;
  display: grid;
  min-width: 0;
  aspect-ratio: 1;
  padding: 10px;
  background: ${(props) =>
    props.$selected ? "rgba(68, 98, 255, 0.08)" : props.theme.colors.white};
  border: 1px solid
    ${(props) =>
      props.$selected
        ? props.theme.colors.primary
        : props.theme.colors.adminInputBorder};
  border-radius: 9px;
  cursor: pointer;
  place-items: center;
  transition: transform 0.14s ease, border-color 0.14s ease,
    background 0.14s ease, box-shadow 0.14s ease;

  &:hover {
    z-index: 1;
    background: ${(props) => props.theme.colors.whiteHover};
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 6px 18px rgba(68, 98, 255, 0.12);
    transform: translateY(-2px);
  }

  &:focus-visible {
    z-index: 1;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(68, 98, 255, 0.15);
  }

  img {
    width: 31px;
    height: 31px;
    object-fit: contain;
  }
`;

export const SelectedMark = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  display: grid;
  width: 17px;
  height: 17px;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  font-weight: 800;
  line-height: 1;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  place-items: center;
`;

export const InheritArea = styled.div`
  display: flex;
  min-height: 38px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  gap: 12px;
`;

export const InheritButton = styled.button`
  display: inline-flex;
  height: 34px;
  padding: 0 12px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 700;
  background: rgba(68, 98, 255, 0.07);
  border: 1px solid rgba(68, 98, 255, 0.22);
  border-radius: 5px;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(68, 98, 255, 0.12);
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.adminPlaceholder};
    background: ${(props) => props.theme.colors.adminInputBg};
    border-color: ${(props) => props.theme.colors.adminInputBorder};
    cursor: default;
  }
`;

export const InheritState = styled.span`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.1rem;
  line-height: 1.4;
`;

export const DialogHint = styled.p`
  margin: 16px 0 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  line-height: 1.55;
`;
