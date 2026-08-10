import styled, { keyframes } from "styled-components";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const Field = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
`;

export const Wrap = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: flex;
  width: 100%;
  min-width: 170px;
  height: 36px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.15s ease;

  span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span:last-child {
    color: ${(props) => props.theme.colors.adminLabelTxt};
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: ${(props) => props.theme.colors.adminInputBg};
    cursor: not-allowed;
  }
`;

export const Panel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  width: 100%;
  min-width: 320px;
  padding: 14px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
  animation: ${fadeSlide} 0.16s ease;
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
  }

  button {
    padding: 0;
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const Search = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  outline: none;
  font-size: 1.25rem;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const List = styled.div`
  overflow-y: auto;
  display: flex;
  max-height: 330px;
  flex-direction: column;
  gap: 6px;
`;

export const StoreItem = styled.button`
  display: flex;
  min-height: 48px;
  padding: 7px 11px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  text-align: left;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.adminInputBg};
  }

  strong {
    overflow: hidden;
    max-width: 100%;
    font-size: 1.3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    overflow: hidden;
    max-width: 100%;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const NoneItem = styled(StoreItem)`
  border-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.adminInputBg};
`;

export const Empty = styled.p`
  padding: 24px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  text-align: center;
`;
