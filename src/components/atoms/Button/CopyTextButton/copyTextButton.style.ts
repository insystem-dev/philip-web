import styled from "styled-components";

export const CopyTextButton = styled.button<{ $copied: boolean }>`
  flex: 0 0 auto;
  padding: 2px 0;
  color: ${(props) =>
    props.$copied ? props.theme.colors.white : "rgba(255, 255, 255, 0.45)"};
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;
