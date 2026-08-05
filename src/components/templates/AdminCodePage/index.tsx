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
  editingItem: any | null;
  clearSelectedParent: () => void;
  onStartCreate: () => void;
  onSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
  getSortOptions: (parentOid: string | null) => any[];
  onAddChild: (data: any) => void;
  onSelectEdit: (data: any) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onToggleDisabled: (data: any) => void;
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
  editingItem,
  clearSelectedParent,
  onStartCreate,
  onSubmitCreate,
  isCreating,
  getSortOptions,
  onAddChild,
  onSelectEdit,
  onChangeSort,
  onToggleDisabled,
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
  return (
    <AdminLayout title="공통코드 관리">
      <S.AdminCodePage>
        <S.GroupTabs>
          {GROUP_TABS.map((tab) => (
            <S.GroupTab
              key={tab.key}
              type="button"
              active={activeGroup === tab.key}
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
                    size="lg"
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
                    width="120px"
                    height={44}
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
                    size="lg"
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
                    width="120px"
                    height={44}
                    label={isSavingContactKakao ? "저장 중..." : "저장"}
                    disabled={isSavingContactKakao || !contactKakao.trim()}
                  />
                </S.ContactInputRow>
              </form>
            </S.ContactCard>
          </S.ContactCards>
        ) : (
          <>
            <S.CreateSection>
              <S.ParentGuide>
                {editingItem ? (
                  <><strong>{editingItem.name}</strong> 이름을 수정합니다.</>
                ) : selectedParent ? (
                  <>
                    <strong>{selectedParent.name}</strong> 하위에 추가합니다.
                    <S.ClearParentButton type="button" onClick={clearSelectedParent}>
                      최상위로 변경
                    </S.ClearParentButton>
                  </>
                ) : (
                  "최상위 코드를 추가합니다. 각 행의 ‘하위 추가’를 누르면 하위 코드를 등록할 수 있습니다."
                )}
              </S.ParentGuide>
              <S.CreateForm onSubmit={onSubmitCreate}>
              <InputText
                label={activeGroup === "CATEGORY" ? "카테고리명" : "지역명"}
                layout="column"
                themeType="admin"
                size="lg"
                width="240px"
                placeholder="이름 입력"
                value={newName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewName(e.target.value)
                }
                />
              <Button
                type="submit"
                color="primary"
                layout="solid"
                width="140px"
                height={44}
                label={isCreating ? "처리 중..." : editingItem ? "저장" : "추가"}
                disabled={isCreating || !newName.trim()}
                />
              {editingItem && (
                <Button type="button" color="func" layout="solid" width="140px" height={44}
                  label="추가" onClick={onStartCreate} />
              )}
              </S.CreateForm>
            </S.CreateSection>

            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

            <S.GridArea>
              <CodeSubGrid
                dataSource={items}
                focusedRowKey={focusedRowKey}
                isLoading={isLoading}
                showCityColumns={activeGroup === "CITY"}
                getSortOptions={getSortOptions}
                onAddChild={onAddChild}
                onSelectEdit={onSelectEdit}
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
