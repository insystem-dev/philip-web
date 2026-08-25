import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { createAdminAccountAPI } from "@/apis/adminApi";
import * as S from "./adminCreateAccountModal.style";

interface AdminCreateAccountModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const EMPTY_FORM = {
  adminId: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

export const AdminCreateAccountModal = ({
  onClose,
  onCreated,
}: AdminCreateAccountModalProps) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [validation, setValidation] = useState("");
  const mutation = useMutation(createAdminAccountAPI, {
    onSuccess: () => onCreated(),
    onError: (error: any) => {
      const message = error?.response?.data?.message;
      setValidation(
        Array.isArray(message)
          ? message.join(" ")
          : message || "관리자 계정을 생성하지 못했습니다."
      );
    },
  });

  const setValue = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setValidation("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const adminId = form.adminId.trim();
    const name = form.name.trim();
    if (!/^[A-Za-z0-9_.-]{4,50}$/.test(adminId)) {
      return setValidation(
        "아이디는 영문, 숫자, _, -, . 조합으로 4~50자를 입력해 주세요."
      );
    }
    if (name.length < 2 || name.length > 50) {
      return setValidation("관리자 이름은 2~50자로 입력해 주세요.");
    }
    if (form.password.length < 8 || form.password.length > 50) {
      return setValidation("비밀번호는 8~50자로 입력해 주세요.");
    }
    if (form.password !== form.passwordConfirm) {
      return setValidation("비밀번호가 일치하지 않습니다.");
    }
    mutation.mutate({ ...form, adminId, name });
  };

  return (
    <S.Backdrop
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !mutation.isLoading) {
          onClose();
        }
      }}
    >
      <S.Dialog role="dialog" aria-modal="true" aria-labelledby="create-admin-title">
        <S.Header>
          <div>
            <span>SUPER ONLY</span>
            <h2 id="create-admin-title">ADMIN 관리자 생성</h2>
          </div>
          <button type="button" aria-label="닫기" onClick={onClose}>
            ×
          </button>
        </S.Header>
        <S.Form onSubmit={onSubmit}>
          <S.RoleNotice>
            <strong>생성 권한</strong>
            <span>ADMIN</span>
            <p>새 계정은 ADMIN 권한으로만 생성됩니다.</p>
          </S.RoleNotice>
          <S.Field>
            <label htmlFor="newAdminId">관리자 아이디</label>
            <input
              id="newAdminId"
              autoComplete="off"
              maxLength={50}
              value={form.adminId}
              onChange={(event) => setValue("adminId", event.target.value)}
              placeholder="영문·숫자 4~50자"
            />
          </S.Field>
          <S.Field>
            <label htmlFor="newAdminName">관리자 이름</label>
            <input
              id="newAdminName"
              maxLength={50}
              value={form.name}
              onChange={(event) => setValue("name", event.target.value)}
              placeholder="관리자 이름"
            />
          </S.Field>
          <S.FieldRow>
            <S.Field>
              <label htmlFor="newAdminPassword">비밀번호</label>
              <input
                id="newAdminPassword"
                type="password"
                autoComplete="new-password"
                maxLength={50}
                value={form.password}
                onChange={(event) => setValue("password", event.target.value)}
                placeholder="8~50자"
              />
            </S.Field>
            <S.Field>
              <label htmlFor="newAdminPasswordConfirm">비밀번호 확인</label>
              <input
                id="newAdminPasswordConfirm"
                type="password"
                autoComplete="new-password"
                maxLength={50}
                value={form.passwordConfirm}
                onChange={(event) =>
                  setValue("passwordConfirm", event.target.value)
                }
                placeholder="한 번 더 입력"
              />
            </S.Field>
          </S.FieldRow>
          {validation && <S.Error role="alert">{validation}</S.Error>}
          <S.Actions>
            <button type="button" onClick={onClose} disabled={mutation.isLoading}>
              취소
            </button>
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "생성 중..." : "ADMIN 계정 생성"}
            </button>
          </S.Actions>
        </S.Form>
      </S.Dialog>
    </S.Backdrop>
  );
};
