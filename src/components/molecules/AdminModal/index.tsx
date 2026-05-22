import * as S from "./adminModal.style";

export const AdminModal = ({ title, children }: any) => {
  return (
    <>
      <S.AdminModalBG>
        <S.AdminModal>
          {title && <S.ModalHead>{title}</S.ModalHead>}

          {children}
        </S.AdminModal>
      </S.AdminModalBG>
    </>
  );
};
