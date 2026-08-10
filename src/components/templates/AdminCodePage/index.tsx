import { useEffect, useRef } from "react";
import * as S from "./adminCodePage.style";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { CodeSubGrid } from "@/components/molecules/AdminGrid/CodeSubGrid";
import { InputText } from "@/components/atoms/Input/InputText";
import { Button } from "@/components/atoms/Button";

export type CodeGroup = "CATEGORY" | "CITY" | "CONTACT";

const GROUP_TABS: { key: CodeGroup; label: string }[] = [
  { key: "CATEGORY", label: "카테고리" },
  { key: "CITY", label: "지역" },
  { key: "CONTACT", label: "문의처 설정" },
];

export interface AdminCodePageProps {
  activeGroup: CodeGroup;
  setActiveGroup: (group: CodeGroup) => void;
  items: any[];
  focusedRowKey: string | null;
  isLoading: boolean;
  error: string;
  newName: string;
  setNewName: (value: string) => void;
  selectedParent: any | null;
  clearSelectedParent: () => void;
  onSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
  getSortOptions: (parentOid: string | null) => any[];
  onAddChild: (data: any) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onToggleDisabled: (data: any) => void;
  /** 그리드 인라인 이름 수정 (blur 시 저장) */
  onChangeName: (e: React.FocusEvent<HTMLInputElement>, data: any) => void;
  onChangeNameEng: (e: React.FocusEvent<HTMLInputElement>, data: any) => void;
  onDelete: (data: any) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
  onSubmitContactPhone: (e: React.FormEvent<HTMLFormElement>) => void;
  isSavingContactPhone: boolean;
  contactKakao: string;
  setContactKakao: (value: string) => void;
  onSubmitContactKakao: (e: React.FormEvent<HTMLFormElement>) => void;
  isSavingContactKakao: boolean;
}

export const AdminCodePage = ({
  activeGroup,
  setActiveGroup,
  items,
  focusedRowKey,
  isLoading,
  error,
  newName,
  setNewName,
  selectedParent,
  clearSelectedParent,
  onSubmitCreate,
  isCreating,
  getSortOptions,
  onAddChild,
  onChangeSort,
  onToggleDisabled,
  onChangeName,
  onChangeNameEng,
  onDelete,
  contactPhone,
  setContactPhone,
  onSubmitContactPhone,
  isSavingContactPhone,
  contactKakao,
  setContactKakao,
  onSubmitContactKakao,
  isSavingContactKakao,
}: AdminCodePageProps) => {
  const nameFieldRef = useRef<HTMLDivElement | null>(null);

  /** 행의 '하위 추가'를 누르면 이름 입력으로 바로 포커스를 옮긴다 */
  useEffect(() => {
    if (!selectedParent) return;
    nameFieldRef.current?.querySelector("input")?.focus();
  }, [selectedParent]);

  const groupLabel = activeGroup === "CATEGORY" ? "카테고리" : "지역";

  return (
    <AdminLayout title="공통코드 관리">
      <S.AdminCodePage>
        <S.GroupTabs role="tablist" aria-label="공통코드 구분">
          {GROUP_TABS.map((tab) => (
            <S.GroupTab
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeGroup === tab.key}
              $active={activeGroup === tab.key}
              onClick={() => setActiveGroup(tab.key)}
            >
              {tab.label}
            </S.GroupTab>
          ))}
        </S.GroupTabs>

        {activeGroup === "CONTACT" ? (
          <S.ContactCards>
            <S.ContactCard>
              <S.ContactLabel>1:1 문의 전화번호</S.ContactLabel>
              <form onSubmit={onSubmitContactPhone}>
                <S.ContactInputRow>
                  <InputText
                    layout="column"
                    themeType="admin"
                    size="md"
                    width="240px"
                    placeholder="전화번호 입력 (예: 010-1234-5678)"
                    value={contactPhone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactPhone(e.target.value)
                    }
                  />
                  <Button
                    type="submit"
                    color="primary"
                    layout="solid"
                    width="90px"
                    height={32}
                    label={isSavingContactPhone ? "저장 중..." : "저장"}
                    disabled={isSavingContactPhone || !contactPhone.trim()}
                  />
                </S.ContactInputRow>
              </form>
            </S.ContactCard>
            <S.ContactCard>
              <S.ContactLabel>카카오톡 문의 아이디</S.ContactLabel>
              <form onSubmit={onSubmitContactKakao}>
                <S.ContactInputRow>
                  <InputText
                    layout="column"
                    themeType="admin"
                    size="md"
                    width="240px"
                    placeholder="카카오톡 아이디"
                    value={contactKakao}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContactKakao(e.target.value)
                    }
                  />
                  <Button
                    type="submit"
                    color="primary"
                    layout="solid"
                    width="90px"
                    height={32}
                    label={isSavingContactKakao ? "저장 중..." : "저장"}
                    disabled={isSavingContactKakao || !contactKakao.trim()}
                  />
                </S.ContactInputRow>
              </form>
            </S.ContactCard>
          </S.ContactCards>
        ) : (
          <>
            <S.CreateBar
              onSubmit={onSubmitCreate}
              $childMode={!!selectedParent}
            >
              <S.CreateLabel>{groupLabel} 추가</S.CreateLabel>

              {selectedParent ? (
                <S.TargetChip $child>
                  <strong>{selectedParent.name}</strong> 하위
                  <button
                    type="button"
                    onClick={clearSelectedParent}
                    aria-label="최상위로 변경"
                    title="최상위로 변경"
                  >
                    ×
                  </button>
                </S.TargetChip>
              ) : (
                <S.TargetChip>최상위</S.TargetChip>
              )}

              <S.NameField ref={nameFieldRef}>
                <input
                  type="text"
                  placeholder={`${groupLabel}명 입력`}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </S.NameField>
              <Button
                type="submit"
                color="primary"
                layout="solid"
                width="90px"
                height={32}
                label={isCreating ? "처리 중..." : "추가"}
                disabled={isCreating || !newName.trim()}
              />

              <S.BarHint>
                {activeGroup === "CATEGORY"
                  ? "이름은 표에서 바로 수정, 하위 코드는 각 행의 ‘하위 추가’로 등록합니다."
                  : "이름·영문명은 표에서 바로 수정됩니다."}
              </S.BarHint>
            </S.CreateBar>

            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

            <S.GridArea>
              <CodeSubGrid
                dataSource={items}
                focusedRowKey={focusedRowKey}
                isLoading={isLoading}
                showCityColumns={activeGroup === "CITY"}
                allowAddChild={activeGroup === "CATEGORY"}
                getSortOptions={getSortOptions}
                onAddChild={onAddChild}
                onChangeName={onChangeName}
                onChangeSort={onChangeSort}
                onToggleDisabled={onToggleDisabled}
                onChangeNameEng={onChangeNameEng}
                onDelete={onDelete}
              />
            </S.GridArea>
          </>
        )}
      </S.AdminCodePage>
    </AdminLayout>
  );
};
