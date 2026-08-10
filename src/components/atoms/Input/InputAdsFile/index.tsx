/**
 * InputAdsFile Atom
 * 광고 배너 1개 = 카드 1장 (이미지 등록 + 클릭 시 이동 연결)
 *
 * 파일 영역의 상태에 따른 표시:
 * - isAds (저장된 광고): 파일명 + 삭제 버튼
 * - isPreview (프리뷰 이미지): 파일명 + 취소 버튼
 * - 둘 다 없음: 이미지 등록 버튼
 *
 * 연결 대상은 세그먼트(연결 없음 / 등록 업체 / 외부 URL)로 하나만 고른다.
 * 모드를 바꾸면 반대편 값을 함께 정리하므로 업체·URL 동시 지정이 나올 수 없다.
 * 카드 헤더의 칩이 현재 연결 상태와 저장 필요 여부를 보여준다.
 */
import { useMemo, useState } from "react";
import { AdsLink } from "@/apis/adsApi";
import { AdminStoreSelect } from "@/components/molecules/AdminStoreSelect";
import * as S from "./inputAdsFile.style";

type LinkMode = "none" | "store" | "url";

interface InputAdsFileProps {
  id: string;
  /** 카드 제목 — 미리보기 오버레이의 위치 태그와 동일한 문구를 쓴다 (예: "왼쪽 하단") */
  label: string;
  file: any;
  isAds?: any;
  isPreview?: any;
  onChangeImages: (e: any) => void;
  onDelete: (id: string) => void;
  onRemovePreviewImage: (file: any) => void;
  /** 연결할 업체 목록 (부모가 조회해서 주입) */
  stores?: any[];
  /** 이 배너의 연결 대상 입력값 */
  link?: AdsLink;
  /** 연결 대상 변경 핸들러 (없으면 링크 UI를 렌더하지 않는다) */
  onChangeLink?: (next: AdsLink) => void;
}

const EMPTY_LINK: AdsLink = { postOid: null, url: "", isExternal: false };

const MODE_TABS: { key: LinkMode; label: string }[] = [
  { key: "none", label: "연결 없음" },
  { key: "store", label: "등록 업체" },
  { key: "url", label: "외부 URL" },
];

const LinkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ImageIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

export const InputAdsFile = ({
  id,
  onChangeImages,
  label,
  isAds,
  isPreview,
  onDelete,
  onRemovePreviewImage,
  file,
  stores = [],
  link,
  onChangeLink,
}: InputAdsFileProps) => {
  // 파일명 표시 (originalname 또는 filename 사용)
  const displayName = file?.originalname || file?.filename || "";
  const current = link ?? EMPTY_LINK;

  /**
   * 세그먼트에서 고른 모드.
   * null 이면 입력값에서 유추한다 — 서버 값 하이드레이션이 끝나면 자동으로 해당 모드가 열린다.
   * "등록 업체"를 눌러 놓고 아직 업체를 고르지 않은 상태를 유지하기 위해 값과 별도로 둔다.
   */
  const [pickedMode, setPickedMode] = useState<LinkMode | null>(null);
  const valueMode: LinkMode = current.isExternal
    ? "url"
    : current.postOid
    ? "store"
    : "none";
  const mode = pickedMode ?? valueMode;

  const selectMode = (next: LinkMode) => {
    if (!onChangeLink) return;
    setPickedMode(next);
    // 모드 전환 시 반대편 값을 정리해 업체·URL 동시 지정을 차단
    if (next === "none") {
      onChangeLink({ postOid: null, url: "", isExternal: false });
    } else if (next === "store") {
      onChangeLink({ ...current, isExternal: false });
    } else {
      onChangeLink({ postOid: null, url: current.url, isExternal: true });
    }
  };

  const storeByOid = useMemo(
    () => new Map(stores.map((item: any) => [item.oid, item])),
    [stores]
  );
  const linkedStore =
    !current.isExternal && current.postOid
      ? storeByOid.get(current.postOid)
      : undefined;

  const trimmedUrl = current.url.trim();
  const urlInvalid =
    current.isExternal && !!trimmedUrl && !/^https?:\/\//i.test(trimmedUrl);

  /** 저장 시 서버로 나갈 값 (컨테이너 toLinkPayload 와 동일한 규칙) */
  const draftPostOid = !current.isExternal ? current.postOid || null : null;
  const draftUrl = current.isExternal ? trimmedUrl || null : null;
  const isLinked = !!(draftPostOid || draftUrl);

  /** 저장 버튼을 눌러야 반영되는 상태인지 (새 이미지 or 저장값과 다른 링크) */
  const needsSave = isPreview
    ? true
    : isAds
    ? (isAds.adLinkPostOid ?? null) !== draftPostOid ||
      (isAds.adLinkUrl ?? null) !== draftUrl
    : false;

  /** 이미지가 없는 슬롯은 링크만 설정해도 저장되지 않는다 → 안내 */
  const linkWithoutImage = !isAds && !isPreview && isLinked;

  const urlHost = useMemo(() => {
    if (!draftUrl) return null;
    try {
      return new URL(draftUrl).host;
    } catch {
      return null;
    }
  }, [draftUrl]);

  const statusLabel = draftUrl
    ? urlHost ?? "외부 URL"
    : draftPostOid
    ? linkedStore?.store_name ?? "업체 연결됨"
    : "연결 없음";

  /** 파일 영역 (저장됨 / 업로드됨 / 미등록) */
  const renderFileRow = () => {
    // 저장된 광고가 있는 경우 (DB에서 불러온 데이터)
    if (isAds) {
      return (
        <S.FileRow>
          <S.FileName title={displayName}>
            <ImageIcon />
            <span>{displayName}</span>
          </S.FileName>
          <S.GhostButton type="button" $danger onClick={() => onDelete(isAds.oid)}>
            삭제
          </S.GhostButton>
        </S.FileRow>
      );
    }

    // 프리뷰 이미지가 있는 경우 (업로드했지만 아직 저장 안됨)
    if (isPreview) {
      return (
        <S.FileRow>
          <S.FileName title={displayName}>
            <ImageIcon />
            <span>{displayName}</span>
          </S.FileName>
          <S.GhostButton type="button" onClick={() => onRemovePreviewImage(isPreview)}>
            취소
          </S.GhostButton>
        </S.FileRow>
      );
    }

    // 이미지가 없는 경우 (새로 등록)
    return (
      <S.FileRow>
        <S.FileName $empty>
          <ImageIcon />
          <span>등록된 이미지가 없습니다</span>
        </S.FileName>
        <S.UploadLabel htmlFor={id}>
          이미지 등록
          <input
            type="file"
            id={id}
            accept="image/*"
            hidden
            onChange={onChangeImages}
          />
        </S.UploadLabel>
      </S.FileRow>
    );
  };

  return (
    <S.InputFile>
      <S.CardHead>
        <S.CardTitle title={label}>{label}</S.CardTitle>
        {needsSave && (
          <S.StatusChip $tone="dirty">
            <span>저장 필요</span>
          </S.StatusChip>
        )}
        <S.StatusChip
          $tone={isLinked ? "linked" : "none"}
          title={draftUrl ?? statusLabel}
        >
          <span>{statusLabel}</span>
        </S.StatusChip>
      </S.CardHead>

      <S.CardBody>
        {renderFileRow()}

        {onChangeLink && (
          <S.LinkSection>
            <S.LinkCaption>
              <LinkIcon />
              클릭 시 이동
            </S.LinkCaption>

            <S.SegmentTrack role="radiogroup" aria-label={`${label} 연결 방식`}>
              {MODE_TABS.map((tab) => (
                <S.SegmentButton
                  key={tab.key}
                  type="button"
                  role="radio"
                  aria-checked={mode === tab.key}
                  $active={mode === tab.key}
                  onClick={() => selectMode(tab.key)}
                >
                  {tab.label}
                </S.SegmentButton>
              ))}
            </S.SegmentTrack>

            {mode === "store" && (
              <S.ModePane>
                <AdminStoreSelect
                  stores={stores}
                  value={current.postOid ?? ""}
                  onChange={(oid) =>
                    onChangeLink({
                      ...current,
                      postOid: oid || null,
                      isExternal: false,
                    })
                  }
                />
              </S.ModePane>
            )}

            {mode === "url" && (
              <S.ModePane>
                <S.LinkUrlInput
                  type="text"
                  placeholder="https://example.com"
                  value={current.url}
                  onChange={(e) =>
                    onChangeLink({
                      postOid: null,
                      url: e.target.value,
                      isExternal: true,
                    })
                  }
                />
                {urlInvalid && (
                  <S.UrlError>
                    http:// 또는 https:// 로 시작해야 합니다.
                  </S.UrlError>
                )}
              </S.ModePane>
            )}

            {linkWithoutImage && (
              <S.LinkWarn>
                이미지가 없는 배너는 연결이 저장되지 않습니다. 이미지를 먼저
                등록해 주세요.
              </S.LinkWarn>
            )}
          </S.LinkSection>
        )}
      </S.CardBody>
    </S.InputFile>
  );
};
