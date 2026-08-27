import { getActivePopupsApi, PopupItem } from "@/apis/popupApi";
import { NoticePopupModal } from "@/components/molecules/NoticePopupModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface ActiveNoticePopupsProps {
  /** 미지정하면 /select/category용 팝업, 지정하면 해당 카테고리용 팝업 */
  categoryCode?: string;
}

const getToday = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

/** 노출 위치별 활성 팝업을 순서대로 표시하고 오늘 하루 숨김을 공통 처리한다. */
export const ActiveNoticePopups = ({
  categoryCode,
}: ActiveNoticePopupsProps) => {
  const scope = categoryCode || "CATEGORY_SELECTION";
  const { locale } = usePhilipLocale();
  const [popupQueue, setPopupQueue] = useState<PopupItem[]>([]);
  const [popupTotal, setPopupTotal] = useState(0);
  const initializedScopes = useRef(new Set<string>());

  const { data: activePopups, isSuccess } = useQuery(
    ["activePopups", scope, locale],
    () => getActivePopupsApi(categoryCode, locale),
    { staleTime: 60_000 }
  );

  useEffect(() => {
    setPopupQueue([]);
    setPopupTotal(0);
  }, [scope, locale]);

  useEffect(() => {
    const localizedScope = `${scope}:${locale}`;
    if (!isSuccess || initializedScopes.current.has(localizedScope)) return;
    initializedScopes.current.add(localizedScope);

    const today = getToday();
    const visible = (activePopups || []).filter(
      (popup) =>
        popup.showTodayHideYn === "N" ||
        localStorage.getItem(`philip:popup:hidden:${popup.oid}`) !== today
    );
    setPopupQueue(visible);
    setPopupTotal(visible.length);
  }, [activePopups, isSuccess, locale, scope]);

  const closeCurrentPopup = useCallback(() => {
    setPopupQueue((current) => current.slice(1));
  }, []);

  const hideCurrentPopupToday = useCallback(() => {
    setPopupQueue((current) => {
      const popup = current[0];
      if (popup) {
        localStorage.setItem(`philip:popup:hidden:${popup.oid}`, getToday());
      }
      return current.slice(1);
    });
  }, []);

  if (!popupQueue[0] || typeof document === "undefined") return null;

  return createPortal(
    <NoticePopupModal
      popup={popupQueue[0]}
      current={popupTotal - popupQueue.length + 1}
      total={popupTotal}
      onClose={closeCurrentPopup}
      onHideToday={hideCurrentPopupToday}
    />,
    document.body
  );
};
