import { useCallback, useEffect, useRef, useState } from "react";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

/** 텍스트를 클립보드에 복사하고, 성공하면 1.5초 동안 copied 를 true 로 둔다 */
const useCopyText = () => {
  const { message } = usePhilipLocale();
  const [copied, setCopied] = useState(false);

  // 복원 타이머를 ref에 보관 (연속 클릭 시 이전 타이머 정리)
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const markCopied = useCallback(() => {
    setCopied(true);
    clearTimeout(timerRef.current);
    // 1.5초 후 문구를 원래대로 복원
    timerRef.current = setTimeout(() => setCopied(false), 1500);
  }, []);

  const copy = useCallback(
    (text: string) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(markCopied)
          .catch(() => {
            alert(message.common.copyRetry);
          });
        return;
      }

      if (!document.queryCommandSupported("copy")) {
        alert(message.common.copyUnsupported);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      // 선택된 텍스트를 실제로 클립보드에 복사
      document.execCommand("copy");
      document.body.removeChild(textarea);
      markCopied();
    },
    [markCopied, message.common]
  );

  return { copied, copy };
};

export default useCopyText;
