import { useCallback, useState } from "react";
import { Button } from "..";
import IconCopy from "public/assets/svg/icon-copy.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface CopyProps {
  label: string;
  text: string;
}

export const CopyButton: React.FC<CopyProps> = ({ label, text }) => {
  const { message } = usePhilipLocale();
  const [copyMessage, setCopyMessage] = useState(label);

  const handleCopy = useCallback(
    (e: string) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(e)
          .then(() => {
            setCopyMessage(message.common.copied);
            // 1.5초 후 버튼 문구를 원래대로 복원
            setTimeout(() => {
              setCopyMessage(label);
            }, 1500);
          })
          .catch(() => {
            alert(message.common.copyRetry);
          });
      } else {
        if (!document.queryCommandSupported("copy")) {
          return alert(message.common.copyUnsupported);
        }

        const textarea = document.createElement("textarea");
        textarea.value = e;
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.position = "fixed";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        // 선택된 텍스트를 실제로 클립보드에 복사
        document.execCommand("copy");
        document.body.removeChild(textarea);

        setCopyMessage(message.common.copied);
        // 1.5초 후 버튼 문구를 원래대로 복원
        setTimeout(() => {
          setCopyMessage(label);
        }, 1500);
      }
    },
    [label, message.common]
  );

  return (
    <Button
      type="button"
      width="90px"
      height={30}
      color="func"
      layout="icon"
      label={copyMessage}
      onClick={() => handleCopy(text)}
    >
      <IconCopy />
    </Button>
  );
};
