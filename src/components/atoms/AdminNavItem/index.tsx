import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./adminNavItem.style";
import IconArrow from "public/assets/svg/icon-circlearrow.svg";

export const AdminNavItem = ({ data }: any) => {
  const router = useRouter();

  return (
    <S.AdminNavItem
      className={`${router.pathname.includes(data.path) ? "active" : "false"}`}
    >
      <Link href={data.path}>
        {data.name}
        <IconArrow />
      </Link>
    </S.AdminNavItem>
  );
};
