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

export interface MessengerLinkInfo {
  type: "telegram" | "discord";
  href: string;
  /** 화면 표시 문구 — 공개 텔레그램 아이디 링크는 @아이디, 초대 링크 등은 주소 */
  label: string;
  /** 복사할 값 — @아이디 또는 전체 주소 */
  copyText: string;
}

/**
 * 서버가 정규화해 저장한 메신저 링크를 상세 화면 표시용으로 해석한다.
 * 공식 https 주소(t.me, discord.gg)가 아니면 링크로 쓰지 않는다.
 */
export const parseMessengerLink = (
  link?: string | null
): MessengerLinkInfo | null => {
  if (typeof link !== "string") return null;
  const match = link.match(/^https:\/\/(t\.me|discord\.gg)\/([^?#]+)/i);
  if (!match) return null;

  const host = match[1].toLowerCase();
  const path = match[2].replace(/\/+$/, "");
  const type = host === "discord.gg" ? "discord" : "telegram";
  if (type === "telegram" && /^[A-Za-z0-9_]{5,32}$/.test(path)) {
    return { type, href: link, label: `@${path}`, copyText: `@${path}` };
  }
  return { type, href: link, label: `${host}/${path}`, copyText: link };
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
