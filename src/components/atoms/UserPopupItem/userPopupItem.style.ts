import styled from "styled-components";

export const UserPopupItem = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-radius: 3px;
  font-size: 1.4rem;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.whiteHover};
  }

  a {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;
