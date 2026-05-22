import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/Input/InputText";
import * as S from "../adminSearchBox.style";

interface UserSearchProps {
  setUserSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export const UserSearch = ({ setUserSearchKeyword }: UserSearchProps) => {
  return (
    <S.AdminSearchBox>
      <S.AdminsearchItemBox>
        <S.AdminSearchTit>검색</S.AdminSearchTit>
        <InputText
          layout="adminRow"
          size="sm"
          width="200px"
          placeholder="이름/카카오ID/연락처"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserSearchKeyword(e.target.value)
          }
        />
      </S.AdminsearchItemBox>
    </S.AdminSearchBox>
  );
};
