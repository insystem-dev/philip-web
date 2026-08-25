import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  z-index: 1200;
  inset: 0;
  display: grid;
  padding: 20px;
  background: rgba(15, 21, 34, 0.62);
  place-items: center;
`;

export const Dialog = styled.div`
  overflow: hidden;
  width: min(100%, 520px);
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 24px 70px rgba(14, 23, 43, 0.24);
`;

export const Header = styled.header`
  display: flex;
  min-height: 76px;
  padding: 0 22px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.12em;
  }

  h2 {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.8rem;
  }

  button {
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 2.6rem;
    cursor: pointer;
  }
`;

export const Form = styled.form`
  display: flex;
  padding: 22px;
  flex-direction: column;
  gap: 16px;
`;

export const RoleNotice = styled.div`
  display: grid;
  min-height: 52px;
  padding: 10px 12px;
  border: 1px solid rgba(68, 98, 255, 0.18);
  border-radius: 6px;
  background: rgba(68, 98, 255, 0.05);
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 8px;

  strong {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
  }

  span {
    padding: 3px 8px;
    border-radius: 999px;
    color: #fff;
    background: ${(props) => props.theme.colors.primary};
    font-size: 1rem;
    font-weight: 800;
  }

  p {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.1rem;
  }
`;

export const Field = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;

  label {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.2rem;
    font-weight: 700;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 42px;
    padding: 0 11px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 5px;
    outline: 0;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: #fff;
    font-size: 1.3rem;

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(68, 98, 255, 0.08);
    }
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Error = styled.p`
  padding: 9px 11px;
  margin: 0;
  border-radius: 5px;
  color: #bd3434;
  background: #fff0f0;
  font-size: 1.15rem;
`;

export const Actions = styled.div`
  display: flex;
  padding-top: 2px;
  justify-content: flex-end;
  gap: 8px;

  button {
    height: 36px;
    padding: 0 14px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }

  button:last-child {
    border-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    background: ${(props) => props.theme.colors.primary};
  }

  button:disabled {
    opacity: 0.58;
    cursor: default;
  }
`;
