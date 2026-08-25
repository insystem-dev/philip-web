import styled from "styled-components";

export const AdminModalBG = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) => props.theme.colors.black}b1;
  align-items: center;
  justify-content: center;
`;

export const AdminModal = styled.div`
  display: flex;
  width: 280px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.shadow.admin};
  flex-direction: column;
`;

export const ModalHead = styled.div`
  padding: 20px 20px 0;
  font-size: 1.6rem;
`;

export const ModalBody = styled.form`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 15px;
`;

export const ModalItemBox = styled.div`
  display: grid;
  font-size: 1.3rem;
  grid-template-columns: 80px 1fr;
`;

export const ItemTitBox = styled.div`
  color: ${(props) => props.theme.colors.dark};
  font-weight: 300;
`;

export const PasswordSection = styled.section`
  display: flex;
  padding-top: 14px;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  flex-direction: column;
  gap: 10px;
`;

export const PasswordHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.3rem;
  }

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1rem;
    line-height: 1.4;
  }
`;

export const PasswordField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0 9px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 4px;
    outline: 0;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.2rem;

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const PasswordError = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.05rem;
  line-height: 1.35;
`;

export const PasswordSuccess = styled.p`
  margin: 0;
  color: #23844d;
  font-size: 1.05rem;
`;

export const PasswordButton = styled.button`
  height: 34px;
  border: 0;
  border-radius: 3px;
  color: #fff;
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.15rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.58;
    cursor: default;
  }
`;
