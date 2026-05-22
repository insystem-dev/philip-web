import { useRouter } from "next/router";
import { Button, ButtonGroup } from "@/components/atoms/Button";
import * as S from "./adminContentSection.style";

export const AdminContentSection = ({
  title,
  link,
  linkLabel,
  onClick,
  clickLabel,
  children,
}: any) => {
  const router = useRouter();

  const goPost = () => {
    router.push(`${link}`);
  };

  return (
    <S.AdminContentSection>
      <S.AdminContentTit>
        {title}
        <ButtonGroup width="50%" justifyContent="flex-end">
          {link && (
            <Button
              type="button"
              width="80px"
              height={32}
              color="primary"
              layout="solid"
              label={linkLabel}
              onClick={goPost}
            />
          )}
          {onClick && (
            <Button
              type="button"
              width="80px"
              height={32}
              color="secondary"
              layout="solid"
              label={clickLabel}
              onClick={onClick}
            />
          )}
        </ButtonGroup>
      </S.AdminContentTit>
      <S.AdminContentBox>{children}</S.AdminContentBox>
    </S.AdminContentSection>
  );
};
