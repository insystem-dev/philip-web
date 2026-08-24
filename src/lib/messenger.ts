export type MessengerIconKey = "telegram" | "custom";

/** 서버가 허용하는 입력 형식과 같은 범위로 관리자 폼에서 먼저 안내한다. */
export const isTelegramLinkInput = (value?: string | null) => {
  const input = value?.trim();
  if (!input) return true;
  if (input.length > 500) return false;
  return (
    /^@?[A-Za-z0-9_]{5,32}$/.test(input) ||
    /^tg:(?:\/\/)?(?:resolve|join)\?/i.test(input) ||
    /^(?:https?:\/\/)?(?:t\.me|telegram\.me|telegram\.dog)\/[^\s/]+/i.test(
      input
    )
  );
};
