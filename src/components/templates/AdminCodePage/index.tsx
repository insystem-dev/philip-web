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
  onSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
  sortOptions: any[];
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onToggleDisabled: (data: any) => void;
  onChangeNameEng: (e: React.FocusEvent<HTMLInputElement>, data: any) => void;
  onDelete: (data: any) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
  onSubmitContactPhone: (e: React.FormEvent<HTMLFormElement>) => void;
  isSavingContactPhone: boolean;
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
  onSubmitCreate,
  isCreating,
  sortOptions,
  onChangeSort,
  onToggleDisabled,
  onChangeNameEng,
  onDelete,
  contactPhone,
  setContactPhone,
  onSubmitContactPhone,
  isSavingContactPhone,
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
        ) : (
          <>
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
                label={isCreating ? "등록 중..." : "추가"}
                disabled={isCreating || !newName.trim()}
              />
            </S.CreateForm>

            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

            <CodeSubGrid
              dataSource={items}
              focusedRowKey={focusedRowKey}
              isLoading={isLoading}
              showCityColumns={activeGroup === "CITY"}
              sortOptions={sortOptions}
              onChangeSort={onChangeSort}
              onToggleDisabled={onToggleDisabled}
              onChangeNameEng={onChangeNameEng}
              onDelete={onDelete}
            />
          </>
        )}
      </S.AdminCodePage>
    </AdminLayout>
  );
};
