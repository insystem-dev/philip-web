import { Button } from "..";
import IconCopy from "public/assets/svg/icon-copy.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import useCopyText from "@/lib/hooks/useCopyText";

interface CopyProps {
  label: string;
  text: string;
}

export const CopyButton: React.FC<CopyProps> = ({ label, text }) => {
  const { message } = usePhilipLocale();
  const { copied, copy } = useCopyText();

  return (
    <Button
      type="button"
      width="90px"
      height={30}
      color="func"
      layout="icon"
      label={copied ? message.common.copied : label}
      onClick={() => copy(text)}
    >
      <IconCopy />
    </Button>
  );
};
