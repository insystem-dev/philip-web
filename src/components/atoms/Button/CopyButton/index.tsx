import { useCallback, useState } from "react";
import { Button } from "..";
import IconCopy from "public/assets/svg/icon-copy.svg";

interface CopyProps {
  label: string;
  text: string;
}

export const CopyButton: React.FC<CopyProps> = ({ label, text }) => {
  const [copyMessage, setCopyMessage] = useState(label);

  const handleCopy = useCallback(
    (e: string) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(e)
          .then(() => {
            setCopyMessage("Copyed!!");
            const tick = setTimeout(() => {
              setCopyMessage(label);
            }, 1500);
            return () => clearTimeout(tick);
          })
          .catch(() => {
            alert("복사를 다시 시도해주세요.");
          });
      } else {
        if (!document.queryCommandSupported("copy")) {
          return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }

        const textarea = document.createElement("textarea");
        textarea.value = e;
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.position = "fixed";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.body.removeChild(textarea);

        setCopyMessage("Copyed!!");
        const tick = setTimeout(() => {
          setCopyMessage(label);
        }, 1500);
        return () => clearTimeout(tick);
      }
    },
    [text]
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
