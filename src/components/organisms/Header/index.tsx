import Logo from "@/components/atoms/Logo";
import { HeaderMenu } from "@/components/molecules/HeaderMenu";
import * as S from "./header.style";

export const Header = () => {
  return (
    <S.Header>
      <S.HeaderRow>
        <Logo main={true} />
        <HeaderMenu />
      </S.HeaderRow>
    </S.Header>
  );
};

export default Header;
