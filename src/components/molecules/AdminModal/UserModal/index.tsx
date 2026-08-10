import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AdminModal } from "..";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { changeUserRoleAPI } from "@/apis/kakaoApi";
import * as S from "../adminModal.style";

export const UserModal = ({ onClose, user }: any) => {
  const [role, setRole] = useState<string>(user?.role);
  const queryClient = useQueryClient();

  const changeUserRoleMutation = useMutation(
    "changeUserRoleAPI",
    changeUserRoleAPI,
    {
      onSuccess() {
        queryClient.refetchQueries("getKakaoUsers");
      },
    }
  );

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    const data = {
      oid: user.oid,
      role: e.target.value,
      /** 카카오/일반 회원이 각각 다른 테이블이라 서버가 대상 구분에 사용 */
      userType: user?.user_type,
    };
    changeUserRoleMutation.mutate(data);
  };

  return (
    <AdminModal title="회원설정">
      <S.ModalBody>
        <S.ModalItemBox>
          <S.ItemTitBox>이름</S.ItemTitBox>
          <span>{user?.name || "-"}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>가입구분</S.ItemTitBox>
          <span>{user?.user_type === "KAKAO" ? "카카오" : "일반"}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>아이디</S.ItemTitBox>
          <span>{user?.user_id || user?.kakao_id || "-"}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>이메일</S.ItemTitBox>
          <span>{user?.email || "-"}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>연락처</S.ItemTitBox>
          <span>{user?.phone_number || "-"}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>회원등급</S.ItemTitBox>
          {/* option value가 undefined가 되지 않도록 oid 추가 (전달값은 기존과 동일) */}
          {/* value 가 비면 InputSelect 가 localStorage 의 city 로 폴백하므로 기본값을 넘긴다 */}
          <InputSelect
            options={[
              {
                oid: "COMMON",
                name: "COMMON",
              },
              {
                oid: "VIP",
                name: "VIP",
              },
            ]}
            layout="column"
            size="sm"
            themeType="admin"
            onChange={onChangeRole}
            value={role || "COMMON"}
          />
        </S.ModalItemBox>
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
          {/* form submit으로 인한 페이지 리로드 방지 */}
          {/* 등급 변경은 select onChange 에서 이미 저장되므로 라벨은 "확인" */}
          <Button
            type="button"
            layout="solid"
            width="60px"
            height={36}
            color="primary"
            label="확인"
            onClick={onClose}
          />
        </ButtonGroup>
      </S.ModalBody>
    </AdminModal>
  );
};
