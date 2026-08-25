export type MessengerIconKey = "telegram" | "discord" | "custom";

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

export const isDiscordLinkInput = (value?: string | null) => {
  const input = value?.trim();
  if (!input) return true;
  if (input.length > 500) return false;
  return /^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/[A-Za-z0-9-]+|discord\.com\/invite\/[A-Za-z0-9-]+)(?:[/?#].*)?$/i.test(
    input
  );
};

/** 선택한 메신저에 맞는 링크인지 저장 전에 확인한다. */
export const isMessengerLinkInput = (
  value: string | null | undefined,
  iconKey: MessengerIconKey = "telegram"
) => {
  if (iconKey === "discord") return isDiscordLinkInput(value);
  if (iconKey === "custom") {
    return isTelegramLinkInput(value) || isDiscordLinkInput(value);
  }
  return isTelegramLinkInput(value);
};
