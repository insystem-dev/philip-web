import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AdminModal } from "..";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { changeAdminRoleAPI } from "@/apis/adminApi";
import * as S from "../adminModal.style";

export const AccountModal = ({ onClose, account }: any) => {
  const [role, setRole] = useState<string>(account?.role);
  const queryClient = useQueryClient();

  const changeUserRoleMutation = useMutation(
    ["changeAdminRoleAPI"],
    changeAdminRoleAPI,
    {
      onSuccess() {
        queryClient.refetchQueries(["getAdminList"]);
      },
    }
  );

  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    const data = {
      oid: account.oid,
      role: e.target.value,
    };
    changeUserRoleMutation.mutate(data);
  };

  return (
    <AdminModal title="관리자 등급설정">
      <S.ModalBody>
        <S.ModalItemBox>
          <S.ItemTitBox>관리자명</S.ItemTitBox>
          <span>{account?.name}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>권한등급</S.ItemTitBox>
          <InputSelect
            options={[
              {
                name: "SUPER",
              },
              {
                name: "ADMIN",
              },
              {
                name: "SUB",
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
