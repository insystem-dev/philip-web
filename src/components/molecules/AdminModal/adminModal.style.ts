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
