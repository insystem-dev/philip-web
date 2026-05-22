import styled from "styled-components";

export const AdminNavItem = styled.li`
  font-size: 1.5rem;
  cursor: pointer;

  a {
    display: flex;
    height: 36px;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
  }

  &:hover,
  &.active {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.whiteHover};

    svg {
      path {
        fill: ${(props) => props.theme.colors.primary};
      }
    }
  }

  &.active {
    font-weight: 500;
  }
`;
