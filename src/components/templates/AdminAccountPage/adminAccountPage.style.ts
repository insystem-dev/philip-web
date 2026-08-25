import styled from "styled-components";

export const AdminAccountPage = styled.div``;

export const CreateButton = styled.button`
  height: 32px;
  padding: 0 13px;
  border: 0;
  border-radius: 3px;
  color: #fff;
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 2px solid rgba(68, 98, 255, 0.3);
    outline-offset: 2px;
  }
`;
