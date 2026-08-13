import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./mobileHeader.style";
import IconBack from "public/assets/svg/icon-arrow-back.svg";
import IconUser from "public/assets/svg/icon-user.svg";
import { Button } from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/userToken";

export const MobileHeader = () => {
  const router = useRouter();
  const isCategorySelect = router.pathname === "/select/category";
  /** 사용자 로그인 체크 */
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const goBack = () => {
    router.back();
  };

  const goUser = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("kakaoSignKey");
    setUserToken(null);
    document.location.href = "/main";
  };

  // 메뉴 바깥을 클릭하거나 ESC를 누르면 닫는다
  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <S.MobileHeader $overlay={isCategorySelect}>
      <Button
        type="button"
        width="64px"
        height={64}
        color="clear"
        layout="icon"
        onClick={goBack}
      >
        <IconBack width="28px" height="28px" viewBox="0 0 24 24" />
      </Button>
      {!isCategorySelect && <Logo main={true} mobile={true} />}
      {userToken ? (
        <S.UserMenu ref={menuRef}>
          <Button
            type="button"
            width="64px"
            height={64}
            color="clear"
            layout="icon"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <IconUser width="18px" height="18px" viewBox="0 0 12 12" />
          </Button>
          <S.UserMenuPanel role="menu" $open={isMenuOpen}>
            <S.UserMenuItem
              type="button"
              role="menuitem"
              onClick={handleLogout}
            >
              로그아웃
            </S.UserMenuItem>
          </S.UserMenuPanel>
        </S.UserMenu>
      ) : (
        <Button
          type="button"
          width="64px"
          height={64}
          color="clear"
          layout="icon"
          onClick={goUser}
        >
          <IconUser width="18px" height="18px" viewBox="0 0 12 12" />
        </Button>
      )}
    </S.MobileHeader>
  );
};

export default MobileHeader;
