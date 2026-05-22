import { useRouter } from "next/router";
import { AdminModal } from "..";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import * as S from "../adminModal.style";

export const StoreModal = ({ onClose, store }: any) => {
  const router = useRouter();
  const goEdit = (e: any) => {
    // if (userToken || admin?.user) router.push(`/main/post/${item.oid}`);
    // else alert("로그인이 필요한 서비스 입니다.");
    router.push(`/admin/store/edit/${store.oid}`);
  };
  return (
    <AdminModal title="업체정보">
      <S.ModalBody>
        {/* <div>{store.oid}</div> */}
        <S.ModalItemBox>
          <S.ItemTitBox>업체명</S.ItemTitBox>
          <span>{store.store_name}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>업종</S.ItemTitBox>
          <span>{store.category}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>지역</S.ItemTitBox>
          <span>{store.city}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>주소</S.ItemTitBox>
          <span>{store.address}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>대표번호</S.ItemTitBox>
          <span>{store.phone_number}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>대표자명</S.ItemTitBox>
          <span>{store.owner_name}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>비고</S.ItemTitBox>
          <span>{store.contents}</span>
        </S.ModalItemBox>
        {/* <div>{store.etc}</div> */}

        <ButtonGroup marginTop={10}>
          <Button
            type="button"
            layout="solid"
            width="60px"
            height={36}
            color="func"
            label="닫기"
            onClick={onClose}
          />
          <Button
            type="button"
            width="60px"
            height={36}
            color="primary"
            layout="solid"
            label="수정"
            onClick={goEdit}
          />
        </ButtonGroup>
      </S.ModalBody>
    </AdminModal>
  );
};
