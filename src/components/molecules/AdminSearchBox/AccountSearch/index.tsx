import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/Input/InputText";
import * as S from "../adminSearchBox.style";

interface AccountSearchProps {
  setAdminSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountSearch = ({
  setAdminSearchKeyword,
}: AccountSearchProps) => {
  return (
    <S.AdminSearchBox>
      <S.AdminsearchItemBox>
        <S.AdminSearchTit>관리자명</S.AdminSearchTit>
        <InputText
          layout="adminRow"
          size="sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAdminSearchKeyword(e.target.value)
          }
        />
      </S.AdminsearchItemBox>
    </S.AdminSearchBox>
  );
};
