import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cityState } from "@/recoil/city";
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
    };
    changeUserRoleMutation.mutate(data);
  };

  return (
    <AdminModal title="회원설정">
      <S.ModalBody>
        <S.ModalItemBox>
          <S.ItemTitBox>이름</S.ItemTitBox>
          <span>{user?.name}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>회원등급</S.ItemTitBox>
          <InputSelect
            options={[
              {
                name: "COMMON",
              },
              {
                name: "VIP",
              },
            ]}
            layout="column"
            size="sm"
            themeType="admin"
            onChange={onChangeRole}
            value={role}
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
          <Button
            type="submit"
            layout="solid"
            width="60px"
            height={36}
            color="primary"
            label="저장"
            onClick={onClose}
          />
        </ButtonGroup>
      </S.ModalBody>
    </AdminModal>
  );
};
