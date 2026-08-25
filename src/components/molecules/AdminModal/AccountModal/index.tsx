import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AdminModal } from "..";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { changeAdminPasswordAPI, changeAdminRoleAPI } from "@/apis/adminApi";
import * as S from "../adminModal.style";

export const AccountModal = ({ onClose, account }: any) => {
  const [role, setRole] = useState<string>(account?.role);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const passwordMutation = useMutation(
    (data: { password: string; passwordConfirm: string }) =>
      changeAdminPasswordAPI(account.oid, data),
    {
      onSuccess() {
        setPassword("");
        setPasswordConfirm("");
        setPasswordError("");
        setPasswordMessage("비밀번호가 변경되었습니다.");
      },
      onError(error: any) {
        const message = error?.response?.data?.message;
        setPasswordMessage("");
        setPasswordError(
          Array.isArray(message)
            ? message.join(" ")
            : message || "비밀번호를 변경하지 못했습니다."
        );
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

  const onChangePassword = () => {
    setPasswordMessage("");
    setPasswordError("");
    if (!password) {
      return setPasswordError("비밀번호를 입력해 주세요.");
    }
    if (password !== passwordConfirm) {
      return setPasswordError("비밀번호가 일치하지 않습니다.");
    }
    passwordMutation.mutate({ password, passwordConfirm });
  };

  return (
    <AdminModal title="관리자 계정 설정">
      <S.ModalBody>
        <S.ModalItemBox>
          <S.ItemTitBox>관리자명</S.ItemTitBox>
          <span>{account?.name}</span>
        </S.ModalItemBox>
        <S.ModalItemBox>
          <S.ItemTitBox>권한등급</S.ItemTitBox>
          {/* option value가 undefined가 되지 않도록 oid 추가 (전달값은 기존과 동일) */}
          <InputSelect
            options={[
              {
                oid: "SUPER",
                name: "SUPER",
              },
              {
                oid: "ADMIN",
                name: "ADMIN",
              },
              {
                oid: "SUB",
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

        {role === "ADMIN" && (
          <S.PasswordSection>
            <S.PasswordHeading>
              <strong>비밀번호 변경</strong>
              <span>ADMIN 계정의 새 비밀번호를 지정합니다.</span>
            </S.PasswordHeading>
            <S.PasswordField>
              <label htmlFor="adminNewPassword">새 비밀번호</label>
              <input
                id="adminNewPassword"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                  setPasswordMessage("");
                }}
                placeholder="새 비밀번호 입력"
              />
            </S.PasswordField>
            <S.PasswordField>
              <label htmlFor="adminNewPasswordConfirm">새 비밀번호 확인</label>
              <input
                id="adminNewPasswordConfirm"
                type="password"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                  setPasswordError("");
                  setPasswordMessage("");
                }}
                placeholder="한 번 더 입력"
              />
            </S.PasswordField>
            {passwordError && <S.PasswordError>{passwordError}</S.PasswordError>}
            {passwordMessage && (
              <S.PasswordSuccess>{passwordMessage}</S.PasswordSuccess>
            )}
            <S.PasswordButton
              type="button"
              onClick={onChangePassword}
              disabled={passwordMutation.isLoading}
            >
              {passwordMutation.isLoading ? "변경 중..." : "비밀번호 변경"}
            </S.PasswordButton>
          </S.PasswordSection>
        )}

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
          <Button
            type="button"
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
