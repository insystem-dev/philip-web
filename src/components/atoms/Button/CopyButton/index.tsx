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
            setCopyMessage("Copied!!");
            // 1.5초 후 버튼 문구를 원래대로 복원
            setTimeout(() => {
              setCopyMessage(label);
            }, 1500);
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
        // 선택된 텍스트를 실제로 클립보드에 복사
        document.execCommand("copy");
        document.body.removeChild(textarea);

        setCopyMessage("Copied!!");
        // 1.5초 후 버튼 문구를 원래대로 복원
        setTimeout(() => {
          setCopyMessage(label);
        }, 1500);
      }
    },
    [label]
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
